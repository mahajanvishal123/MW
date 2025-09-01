import React, { useState, useEffect } from "react";

const EditUserModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50  transition-opacity duration-300 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-slate-800">Edit User Details</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border rounded-lg px-4 py-2 text-slate-700"
          />
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 text-slate-700"
          />
          <input
            type="text"
            name="role"
            value={formData.role || ""}
            onChange={handleChange}
            placeholder="Role"
            className="w-full border rounded-lg px-4 py-2 text-slate-700"
          />
          <select
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 text-slate-700"
          >
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>
          <input
            type="text"
            name="certificates"
            value={formData.certificates || ""}
            onChange={handleChange}
            placeholder="Certificates"
            className="w-full border rounded-lg px-4 py-2 text-slate-700"
          />
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
