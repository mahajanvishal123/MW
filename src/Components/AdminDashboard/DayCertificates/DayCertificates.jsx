import React, { useState } from 'react';

const DayCertificates = () => {
    // Sample initial data
    const [plans, setPlans] = useState([
        {
            id: 1,
            price: '$11.99',
            days: '1',
            description: 'Single-Day Certificate - AHPRA Registered Practitioners'
        },
        {
            id: 2,
            price: '$29.99',
            days: '7',
            description: 'Weekly Certificate - AHPRA Registered Practitioners'
        },
        {
            id: 3,
            price: '$49.99',
            days: '30',
            description: 'Monthly Certificate - AHPRA Registered Practitioners'
        }
    ]);

    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPlan, setNewPlan] = useState({
        price: '',
        days: '',
        description: ''
    });
    const [errors, setErrors] = useState({});

    // Open modal
    const openModal = () => {
        setIsModalOpen(true);
        setNewPlan({ price: '', days: '', description: '' });
        setErrors({});
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPlan({
            ...newPlan,
            [name]: value
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!newPlan.price) newErrors.price = 'Price is required';
        else if (!/^\$?[0-9]+(\.[0-9]{2})?$/.test(newPlan.price)) {
            newErrors.price = 'Please enter a valid price (e.g., 11.99 or $11.99)';
        }

        if (!newPlan.days) newErrors.days = 'Days is required';
        else if (!/^[0-9]+$/.test(newPlan.days)) newErrors.days = 'Please enter a valid number of days';

        if (!newPlan.description) newErrors.description = 'Description is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Add new plan
    const addPlan = () => {
        if (!validateForm()) return;

        const plan = {
            id: plans.length > 0 ? Math.max(...plans.map(p => p.id)) + 1 : 1,
            price: newPlan.price.includes('$') ? newPlan.price : `$${newPlan.price}`,
            days: newPlan.days,
            description: newPlan.description
        };

        setPlans([...plans, plan]);
        closeModal();
    };

    // Delete plan
    const deletePlan = (id) => {
        if (window.confirm('Are you sure you want to delete this plan?')) {
            setPlans(plans.filter(plan => plan.id !== id));
        }
    };

    return (
        <div className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Pricing Plans</h2>
                <button
                    onClick={openModal}
                    className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors"
                >
                    <i className="ri-add-line mr-2"></i>
                    Add New Plan
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
                <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Days</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {plans.map(plan => (
                            <tr key={plan.id} className="hover:bg-slate-50">
                                <td className="px-4 py-3 text-sm font-medium text-slate-900 whitespace-nowrap">{plan.price}</td>
                                <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{plan.days} day(s)</td>
                                <td className="px-4 py-3 text-sm text-slate-600">{plan.description}</td>
                                <td className="px-4 py-3 text-sm whitespace-nowrap">
                                    <button
                                        onClick={() => deletePlan(plan.id)}
                                        className="text-red-600 hover:text-red-800 transition-colors"
                                    >
                                        <i className="ri-delete-bin-line"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {plans.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                        No pricing plans found. Click "Add New Plan" to create one.
                    </div>
                )}
            </div>

            {/* Add Plan Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                        <div className="p-4 sm:p-6 border-b border-slate-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-slate-900">Add New Plan</h2>
                                <button
                                    onClick={closeModal}
                                    className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                                >
                                    <i className="ri-close-line text-slate-600"></i>
                                </button>
                            </div>
                        </div>

                        <div className="p-4 sm:p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Price *</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={newPlan.price}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.price ? 'border-red-500' : 'border-slate-300'
                                        }`}
                                    placeholder="$11.99"
                                />
                                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Days *</label>
                                <input
                                    type="number"
                                    name="days"
                                    value={newPlan.days}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.days ? 'border-red-500' : 'border-slate-300'
                                        }`}
                                    placeholder="1"
                                    min="1"
                                />
                                {errors.days && <p className="text-red-500 text-xs mt-1">{errors.days}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
                                <textarea
                                    name="description"
                                    value={newPlan.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.description ? 'border-red-500' : 'border-slate-300'
                                        }`}
                                    placeholder="Single-Day Certificate - AHPRA Registered Practitioners"
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>
                        </div>

                        <div className="p-4 sm:p-6 border-t border-slate-200 flex space-x-4">
                            <button
                                onClick={closeModal}
                                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addPlan}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Add Plan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DayCertificates;