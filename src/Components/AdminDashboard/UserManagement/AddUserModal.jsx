import React, { useState } from "react";
import axios from "axios";

const AddUserModal = ({ isOpen, onClose, onSave }) => {
  const [userType, setUserType] = useState("patient");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    ahpr_registration_number: "",
    specialization: "",
    profile_image: "",
  });
  const [preview, setPreview] = useState("");
  const [sendWelcome, setSendWelcome] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFormData({ ...formData, profile_image: url });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "https://ssknf82q-4001.inc1.devtunnels.ms/api/auth/register",
        {
          ...formData,
          user_type: userType,
        }
      );
      onSave?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Add New User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-lg">
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* User Type */}
          <div>
            <label className="block text-sm font-medium mb-2">User Type *</label>
            <div className="flex gap-4">
              {["patient", "practitioner"].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setUserType(type)}
                  className={`flex-1 border rounded-lg p-4 text-center transition 
                    ${userType === type
                      ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                      : "border-gray-300 hover:border-indigo-400"}`}
                >
                  <div className="font-semibold capitalize">{type}</div>
                  <div className="text-xs text-gray-500">
                    {type === "patient"
                      ? "Individual seeking medical certificates"
                      : "Healthcare provider issuing certificates"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">First Name *</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name *</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
          </div>

          {/* Email / Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                placeholder="user@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                placeholder="Enter phone"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Confirm Password *</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                required
              />
            </div>
          </div>

          {/* Practitioner fields */}
          {userType === "practitioner" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">AHPRA Registration Number</label>
                <input
                  type="text"
                  name="ahpr_registration_number"
                  value={formData.ahpr_registration_number}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Specialization *</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                  required
                >
                  <option value="">Select Specialization</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Practitioner">Practitioner</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                </select>
              </div>
            </div>
          )}

          {/* Profile Image */}
          <div>
            <label className="block text-sm mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border rounded-lg p-2 w-full"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-16 h-16 rounded-full object-cover border"
              />
            )}
          </div>

          {/* Welcome checkbox */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={sendWelcome}
              onChange={() => setSendWelcome(!sendWelcome)}
            />
            Send welcome email with login credentials
          </label>

          {/* Info box */}
          {userType === "patient" && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-xs text-purple-800">
              <strong>Patient Account Setup</strong> — User will receive login credentials via
              email and can immediately start requesting medical certificates.
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg w-full hover:bg-indigo-700"
          >
            {loading ? "Saving..." : "Save User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
