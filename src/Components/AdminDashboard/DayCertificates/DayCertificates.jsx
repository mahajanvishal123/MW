import React, { useState, useEffect } from "react";
import axios from "axios";
import BaseUrl from "../../../Utilities/BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pencil, Trash2, Plus } from "lucide-react";

const DayCertificates = () => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newPlan, setNewPlan] = useState({
    certificate_name: "",
    description: "",
    price: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/certificateprice`);
      setPlans(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch plans");
      console.error(err);
    }
  };

  const openModal = (plan = null) => {
    if (plan) {
      setEditingId(plan.id);
      setNewPlan({
        certificate_name: plan.certificate_name,
        description: plan.description,
        price: plan.price,
      });
    } else {
      setEditingId(null);
      setNewPlan({ certificate_name: "", description: "", price: "" });
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan({ ...newPlan, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newPlan.certificate_name)
      newErrors.certificate_name = "Certificate name is required";
    if (!newPlan.description) newErrors.description = "Description is required";
    if (!newPlan.price) newErrors.price = "Price is required";
    else if (!/^\d+(\.\d{1,2})?$/.test(newPlan.price))
      newErrors.price = "Enter valid price (like 10.00)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const savePlan = async () => {
    if (!validateForm()) return;
    try {
      if (editingId) {
        await axios.put(`${BaseUrl}/certificateprice/${editingId}`, newPlan);
        toast.success("Plan updated successfully 🎉");
      } else {
        await axios.post(`${BaseUrl}/certificateprice`, newPlan);
        toast.success("Plan added successfully 🎉");
      }
      await fetchPlans();
      closeModal();
    } catch (err) {
      toast.error("Failed to save plan");
      console.error(err);
    }
  };

  const deletePlan = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    try {
      await axios.delete(`${BaseUrl}/certificateprice/${id}`);
      setPlans(plans.filter((p) => p.id !== id));
      toast.success("Plan deleted ✅");
    } catch (err) {
      toast.error("Failed to delete plan");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Certificate Pricing Plans
        </h2>
        <button
          onClick={() => openModal()}
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
        >
          <Plus size={18} /> Add Plan
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm py-5 overflow-x-auto">
        <table className="w-full border border-slate-200 rounded-lg">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {plans.map((plan) => (
              <tr key={plan.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">
                  {plan.certificate_name}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  $ {plan.price}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {plan.description}
                </td>
                <td className="px-4 py-3 text-sm flex gap-3">
                  <button
                    onClick={() => openModal(plan)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deletePlan(plan.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {plans.length === 0 && (
          <div className="text-center py-10 text-slate-500">
            No pricing plans found. Click "Add Plan" to create one.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">
                {editingId ? "Edit Plan" : "Add New Plan"}
              </h2>
              <button
                onClick={closeModal}
                className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Certificate Name *
                </label>
                <input
                  type="text"
                  name="certificate_name"
                  value={newPlan.certificate_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.certificate_name
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
                />
                {errors.certificate_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.certificate_name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Price *
                </label>
                <input
                  type="text"
                  name="price"
                  value={newPlan.price}
                  onChange={handleInputChange}
                  placeholder="11.99"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.price ? "border-red-500" : "border-slate-300"
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={newPlan.description}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.description
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            <div className="p-5 border-t border-slate-200 flex gap-4">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={savePlan}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingId ? "Update Plan" : "Add Plan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default DayCertificates;
