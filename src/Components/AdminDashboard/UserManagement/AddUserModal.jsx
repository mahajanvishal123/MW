import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseUrl from "../../../Utilities/BaseUrl";

const AddUserModal = ({ isOpen, onClose, onSave, user }) => {
  const [newUserForm, setNewUserForm] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ahpraNumber: "",
    password: "",
    confirmPassword: "",
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (isOpen && user) {
      setNewUserForm({
        userType: user.user_type || "",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        ahpraNumber: user.ahpr_registration_number || "",
        password: "",
        confirmPassword: "",
      });
    } else if (isOpen) {
      setNewUserForm({
        userType: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        ahpraNumber: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [isOpen, user]);

  const handleSubmit = async () => {
    if (!newUserForm.firstName || !newUserForm.lastName || !newUserForm.email) {
      toast.error("Please fill all required fields");
      return;
    }

    // Edit mode: PATCH
    if (user) {
      try {
        const payload = {
          first_name: newUserForm.firstName,
          last_name: newUserForm.lastName,
          email: newUserForm.email,
          phone: newUserForm.phone,
          user_type: newUserForm.userType,
          ahpr_registration_number: newUserForm.ahpraNumber,
        };

        await axios.put(`${BaseUrl}/users/${user.id}`, payload);
        toast.success("User updated successfully!");
        if (onSave) onSave();
        onClose();
      } catch (err) {
        console.error(err);
        toast.error(err?.response?.data?.message || "Failed to update user");
      }
      return;
    }

    // Add mode: POST
    if (newUserForm.password !== newUserForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = {
      first_name: newUserForm.firstName,
      last_name: newUserForm.lastName,
      email: newUserForm.email,
      phone: newUserForm.phone,
      password: newUserForm.password,
      user_type: newUserForm.userType,
      ahpr_registration_number: newUserForm.ahpraNumber,
    };

    try {
      await axios.post(`${BaseUrl}/auth/register`, payload);
      toast.success("User successfully registered!");
      if (onSave) onSave();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to register user");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 border-b border-slate-200 flex justify-between">
           <h2 className="text-xl font-bold text-slate-900">{user ? "Edit User" : "Add New User"}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={newUserForm.firstName}
                onChange={(e) =>
                  setNewUserForm({ ...newUserForm, firstName: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={newUserForm.lastName}
                onChange={(e) =>
                  setNewUserForm({ ...newUserForm, lastName: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={newUserForm.email}
                onChange={(e) =>
                  setNewUserForm({ ...newUserForm, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                value={newUserForm.phone}
                onChange={(e) =>
                  setNewUserForm({ ...newUserForm, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              AHPRA Registration Number *
            </label>
            <input
              type="text"
              value={newUserForm.ahpraNumber}
              onChange={(e) =>
                setNewUserForm({ ...newUserForm, ahpraNumber: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Specialization (User Type) *
            </label>
            <select
              value={newUserForm.specialization}
              onChange={(e) =>
                setNewUserForm({
                  ...newUserForm,
                  specialization: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            >
              <option value="">Select specialization</option>
              <option value="doctor">Doctor</option>
              <option value="pharmacist">Pharmacist</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                value={newUserForm.password}
                onChange={(e) =>
                  setNewUserForm({ ...newUserForm, password: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                value={newUserForm.confirmPassword}
                onChange={(e) =>
                  setNewUserForm({
                    ...newUserForm,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>

         <div className="p-4 border-t border-slate-200 flex gap-4">
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">{user ? "Save Changes" : "Register User"}</button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
