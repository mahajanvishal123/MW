import React, { useState } from "react";
import axios from "axios";
import BaseUrl from "../../../Utilities/BaseUrl";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      alert("New password and confirm password do not match!");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${BaseUrl}/auth/change-password/${userId}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Password changed successfully!");
      setFormData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err) {
      console.error("Password change failed:", err);
      alert(err.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-xl font-semibold text-slate-800">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Current Password
          </label>
          <input
            type="password"
            name="current_password"
            value={formData.current_password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">
            New Password
          </label>
          <input
            type="password"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
