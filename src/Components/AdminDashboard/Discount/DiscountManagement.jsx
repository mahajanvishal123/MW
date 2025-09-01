'use client';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function DiscountManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    type: '',
    discount: 0,
    discountType: 'percentage',
    status: 'Active',
    used: 0,
    limit: 'Unlimited',
    expires: '',
    created: ''
  });
  
  const discountRules = [
    {
      id: 'STUDENT20',
      name: 'Student Discount',
      type: 'Student Verification',
      discount: 20,
      discountType: 'percentage',
      status: 'Active',
      used: 45,
      limit: 'Unlimited',
      expires: '2024-12-31',
      created: '2024-01-15'
    },
    {
      id: 'FRONTLINE15',
      name: 'Frontline Worker Discount',
      type: 'Healthcare Worker',
      discount: 15,
      discountType: 'percentage',
      status: 'Active',
      used: 28,
      limit: 'Unlimited',
      expires: '2024-12-31',
      created: '2024-01-10'
    },
    {
      id: 'NEWUSER10',
      name: 'First Time User',
      type: 'New Customer',
      discount: 10,
      discountType: 'fixed',
      status: 'Active',
      used: 156,
      limit: 200,
      expires: '2024-06-30',
      created: '2024-01-01'
    },
    {
      id: 'BULK50',
      name: 'Bulk Certificate Discount',
      type: 'Volume Discount',
      discount: 50,
      discountType: 'fixed',
      status: 'Paused',
      used: 12,
      limit: 100,
      expires: '2024-03-31',
      created: '2024-02-01'
    }
  ];

  // Handle opening the edit modal with selected discount data
  const handleEditDiscount = (discount) => {
    setSelectedDiscount(discount);
    setEditFormData({
      id: discount.id,
      name: discount.name,
      type: discount.type,
      discount: discount.discount,
      discountType: discount.discountType,
      status: discount.status,
      used: discount.used,
      limit: discount.limit,
      expires: discount.expires,
      created: discount.created
    });
    setShowEditModal(true);
  };

  // Handle form changes in edit modal
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: name === 'discount' || name === 'used' || name === 'limit' 
        ? (value === 'Unlimited' ? value : Number(value))
        : value
    }));
  };

  // Handle saving the edited discount
  const handleSaveDiscount = () => {
    // In a real app, you would make an API call here
    console.log('Saving discount:', editFormData);
    
    // Show success message
    alert('Discount updated successfully!');
    
    // Close the modal
    setShowEditModal(false);
  };

  // Handle pausing a discount
  const handlePauseDiscount = (discount) => {
    // In a real app, you would make an API call here
    console.log('Pausing discount:', discount.id);
    
    // Show success message
    alert(`Discount ${discount.id} has been paused.`);
  };

  // Handle reactivating a discount
  const handleReactivateDiscount = (discount) => {
    // In a real app, you would make an API call here
    console.log('Reactivating discount:', discount.id);
    
    // Show success message
    alert(`Discount ${discount.id} has been reactivated.`);
  };

  // Handle deleting a discount
  const handleDeleteDiscount = (discount) => {
    // In a real app, you would make an API call here
    if (window.confirm(`Are you sure you want to delete the discount ${discount.id}?`)) {
      console.log('Deleting discount:', discount.id);
      
      // Show success message
      alert(`Discount ${discount.id} has been deleted.`);
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Discount Management</h1>
                <p className="text-sm sm:text-base text-slate-600 mt-1">Create and manage promotional discount rules</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap text-sm"
                >
                  <i className="ri-add-line mr-2"></i>
                  Create Discount
                </button>
                <Link href="/admin/dashboard" className="text-slate-600 hover:text-slate-900 cursor-pointer text-sm flex items-center">
                  <i className="ri-arrow-left-line mr-1"></i>
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </header>
        
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Active Discounts</p>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600">12</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <i className="ri-coupon-3-fill text-lg sm:text-xl text-emerald-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">+2</span>
                <span className="text-slate-500 ml-2">new this month</span>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Total Savings</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">$4,250</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-dollar-circle-fill text-lg sm:text-xl text-blue-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">241</span>
                <span className="text-slate-500 ml-2">uses this month</span>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Conversion Rate</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">18.5%</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-bar-chart-fill text-lg sm:text-xl text-purple-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded">+3.2%</span>
                <span className="text-slate-500 ml-2">vs last month</span>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Avg Discount</p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">$17.60</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <i className="ri-percent-fill text-lg sm:text-xl text-slate-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-slate-600 font-medium bg-slate-100 px-2 py-1 rounded">15%</span>
                <span className="text-slate-500 ml-2">average value</span>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 sm:mb-8">
            <div className="border-b border-slate-200">
              <nav className="flex overflow-x-auto px-4 sm:px-6 hide-scrollbar">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                    activeTab === 'active'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <i className="ri-check-line mr-2"></i>
                  Active Discounts
                </button>
                
                <button
                  onClick={() => setActiveTab('expired')}
                  className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                    activeTab === 'expired'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <i className="ri-time-line mr-2"></i>
                  Expired / Paused
                </button>
                
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                    activeTab === 'analytics'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <i className="ri-bar-chart-line mr-2"></i>
                  Performance Analytics
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-4 sm:p-6">
              {activeTab === 'active' && (
                <div className="space-y-4 sm:space-y-6">
                  {/* Discount Rules Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Code</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Type</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Discount</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Usage</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">Expires</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      
                      <tbody className="divide-y divide-slate-200">
                        {discountRules.filter(rule => rule.status === 'Active').map((rule) => (
                          <tr key={rule.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 sm:px-6 sm:py-4">
                              <div className="text-sm font-medium text-blue-600">{rule.id}</div>
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900">{rule.name}</td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 hidden sm:table-cell">
                              <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-slate-100 text-slate-800">
                                {rule.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900">
                              {rule.discountType === 'percentage' ? `${rule.discount}%` : `$${rule.discount}`}
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900 hidden md:table-cell">
                              {rule.used} / {rule.limit === 'Unlimited' ? '∞' : rule.limit}
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(rule.status)}`}>
                                {rule.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900 hidden lg:table-cell">{rule.expires}</td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4">
                              <div className="flex space-x-2">
                                <button 
                                  className="text-blue-600 hover:text-blue-700 cursor-pointer" 
                                  title="Edit"
                                  onClick={() => handleEditDiscount(rule)}
                                >
                                  <i className="ri-edit-line"></i>
                                </button>
                                <button 
                                  className="text-yellow-600 hover:text-yellow-700 cursor-pointer" 
                                  title="Pause"
                                  onClick={() => handlePauseDiscount(rule)}
                                >
                                  <i className="ri-pause-line"></i>
                                </button>
                                <button 
                                  className="text-red-600 hover:text-red-700 cursor-pointer" 
                                  title="Delete"
                                  onClick={() => handleDeleteDiscount(rule)}
                                >
                                  <i className="ri-delete-bin-line"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'expired' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Code</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Total Usage</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Total Savings</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      
                      <tbody className="divide-y divide-slate-200">
                        {discountRules.filter(rule => rule.status !== 'Active').map((rule) => (
                          <tr key={rule.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 sm:px-6 sm:py-4">
                              <div className="text-sm font-medium text-slate-600">{rule.id}</div>
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900">{rule.name}</td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900 hidden sm:table-cell">{rule.used}</td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900 hidden md:table-cell">
                              ${(rule.used * (rule.discountType === 'percentage' ? 
                                (79 * rule.discount / 100) : rule.discount)).toFixed(2)}
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(rule.status)}`}>
                                {rule.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4">
                              <div className="flex space-x-2">
                                <button 
                                  className="text-emerald-600 hover:text-emerald-700 cursor-pointer" 
                                  title="Reactivate"
                                  onClick={() => handleReactivateDiscount(rule)}
                                >
                                  <i className="ri-play-line"></i>
                                </button>
                                <button 
                                  className="text-red-600 hover:text-red-700 cursor-pointer" 
                                  title="Delete"
                                  onClick={() => handleDeleteDiscount(rule)}
                                >
                                  <i className="ri-delete-bin-line"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'analytics' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-slate-50 rounded-lg p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Discount Performance</h3>
                      <div className="h-64 flex items-center justify-center bg-white rounded-lg border border-slate-200">
                        <div className="text-center">
                          <i className="ri-pie-chart-line text-4xl text-slate-300 mb-4"></i>
                          <p className="text-slate-500">Usage by discount type</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Trends</h3>
                      <div className="h-64 flex items-center justify-center bg-white rounded-lg border border-slate-200">
                        <div className="text-center">
                          <i className="ri-line-chart-line text-4xl text-slate-300 mb-4"></i>
                          <p className="text-slate-500">Discount usage trends</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Top Performing Discounts */}
                  <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Performing Discounts</h3>
                    <div className="space-y-4">
                      {discountRules.slice(0, 3).map((rule, index) => (
                        <div key={rule.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-lg gap-3">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 ${
                              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-slate-400' : 'bg-orange-500'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{rule.name}</p>
                              <p className="text-sm text-slate-500">{rule.id}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-slate-900">{rule.used} uses</p>
                            <p className="text-sm text-slate-500">
                              ${(rule.used * (rule.discountType === 'percentage' ? 
                                (79 * rule.discount / 100) : rule.discount)).toFixed(2)} saved
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Create Discount Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Create New Discount</h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Discount Code</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="e.g., SUMMER25"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Discount Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Summer Special Offer"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                  <select className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                    <option>Percentage</option>
                    <option>Fixed Amount</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Value</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="25"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
            
            <div className="p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row sm:justify-end sm:space-x-3 gap-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap text-sm"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap text-sm">
                Create Discount
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Discount Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Edit Discount</h3>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Discount Code</label>
                <input
                  type="text"
                  name="id"
                  value={editFormData.id}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Discount Name</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                <input
                  type="text"
                  name="type"
                  value={editFormData.type}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Discount Type</label>
                  <select 
                    name="discountType"
                    value={editFormData.discountType}
                    onChange={handleEditFormChange}
                    className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Value</label>
                  <input
                    type="number"
                    name="discount"
                    value={editFormData.discount}
                    onChange={handleEditFormChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Usage Limit</label>
                  <select 
                    name="limit"
                    value={editFormData.limit}
                    onChange={handleEditFormChange}
                    className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="Unlimited">Unlimited</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="500">500</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                  <select 
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditFormChange}
                    className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
                <input
                  type="date"
                  name="expires"
                  value={editFormData.expires}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <i className="ri-information-line text-blue-600"></i>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">Usage Information</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      This discount has been used {editFormData.used} times since {editFormData.created}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row sm:justify-end sm:space-x-3 gap-3">
              <button 
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveDiscount}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  );
}