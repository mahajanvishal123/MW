  import React, { useState } from 'react';
  import { NavLink, useLocation } from 'react-router-dom';
  import "../../App.css";

  // Menu configurations for different roles
  const adminMenu = [
    { to: "/admin/dashboard", icon: "ri-dashboard-3-line", label: "Dashboard" },
    { to: "/admin/usermanagement", icon: "ri-team-line", label: "Users" },
    { to: "/admin/certificateaudittrail", icon: "ri-shield-check-line", label: "Certificates" },
    { to: "/admin/paymentmanagement", icon: "ri-wallet-3-line", label: "Payments" },
    // { to: "/admin/discountmanagement", icon: "ri-coupon-3-line", label: "Discounts" },
    { to: "/admin/analyticsreports", icon: "ri-line-chart-line", label: "Analytics" },
    { to: "/admin/systemsettings", icon: "ri-settings-4-line", label: "Settings" },
  ];

  const doctorMenu = [
    { to: "/doctor/doctorDashboard", icon: "ri-dashboard-3-line", label: "Dashboard" },
    { to: "/doctor/mycertificates", icon: "ri-file-text-line", label: "Certificates" },
    { to: "/doctor/ScheduleManagement", icon: "ri-calendar-line", label: "Schedule" },
    { to: "/doctor/earningsreports", icon: "ri-wallet-3-line", label: "Earnings & Reports" },
    { to: "/doctor/profilesettings", icon: "ri-user-settings-line", label: "Profile & Settings" },
  ];

  // Action configurations for different roles
  const adminActions = [
    { label: "Add Practitioner", icon: "ri-user-add-line", onClick: "addPractitioner" },
    { label: "Export Reports", icon: "ri-download-cloud-2-line", onClick: "exportReports" },
  ];

  const doctorActions = [
    { label: "Approve Certificate", icon: "ri-check-double-line", onClick: "quickApproval" },
    { label: "Set Unavailable", icon: "ri-calendar-close-line", onClick: null },
  ];

  function Sidebar({ sidebarOpen }) {
    const [showAddPractitioner, setShowAddPractitioner] = useState(false);
    const [showExportReports, setShowExportReports] = useState(false);
    const [showQuickApproval, setShowQuickApproval] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const location = useLocation();

    // Determine user role based on current path
    const isAdminPath = location.pathname.startsWith('/admin');
    const userRole = isAdminPath ? 'admin' : 'doctor';
    
    // Determine which menu and actions to use based on role
    const menuItems = userRole === 'admin' ? adminMenu : doctorMenu;
    const actionItems = userRole === 'admin' ? adminActions : doctorActions;
    
    // User profile information based on role
    const userProfile = userRole === 'admin' 
      ? { name: "Super Admin", role: "Administrator", status: "", verified: false }
      : { name: "Dr. Sarah Johnson", role: "General Practitioner", status: "AHPRA Verified", verified: true };

    const [practitionerForm, setPractitionerForm] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      ahpraNumber: '',
      specialization: '',
      qualification: ''
    });

    const [exportForm, setExportForm] = useState({
      reportType: 'revenue',
      dateRange: 'month',
      format: 'pdf',
      includeCharts: true
    });

    // Dummy requests for doctor modal
    const recentRequests = [
      { id: 'MC-2024-0156', patient: 'John Smith', condition: 'Common Cold', duration: '3 days', status: 'Pending', submitted: '2 hours ago', urgent: false },
      { id: 'MC-2024-0157', patient: 'Sarah Johnson', condition: 'Migraine', duration: '1 day', status: 'Pending', submitted: '4 hours ago', urgent: true },
    ];

    const handleAddPractitioner = () => {
      try {
        setShowAddPractitioner(false);
        setPractitionerForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          ahpraNumber: '',
          specialization: '',
          qualification: ''
        });
        alert('Practitioner successfully added to the system!');
      } catch (error) {
        alert('Failed to add practitioner. Please try again.');
      }
    };

    const handleExportReport = () => {
      try {
        setShowExportReports(false);
        alert('Report export started! You will receive download link via email.');
      } catch (error) {
        alert('Failed to start report export. Please try again.');
      }
    };

    const handleActionClick = (action) => {
      if (action.onClick === "addPractitioner") setShowAddPractitioner(true);
      if (action.onClick === "exportReports") setShowExportReports(true);
      if (action.onClick === "quickApproval") setShowQuickApproval(true);
    };

    return (
      <>
        <div
          className={`
            fixed top-2 left-0 z-50 bg-slate-800 shadow-2xl border-r border-slate-700 h-screen overflow-y-auto hide-scrollbar
            transition-all duration-300
            ${sidebarOpen ? "md:w-72" : "md:w-20"}
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            w-72
          `}
          style={{ marginTop: '65px' }}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                 onClick={() => {
    if (window.innerWidth < 768) {
      // Close sidebar on mobile
      document.querySelector('body').click(); // Optional: close any open modals too
      setSidebarOpen(false);
    }
  }}
                className={({ isActive }) =>
                  `flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                    isActive
                      ? 'bg-slate-700 text-white shadow-sm border border-slate-600'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`
                }
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className={`${item.icon} text-lg`}></i>
                </div>
                {sidebarOpen && <span className="ml-4 font-medium">{item.label}</span>}
              </NavLink>
            ))}

            {sidebarOpen && (
              <div className="pt-6 mt-6 border-t border-slate-700">
                <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Quick Actions
                </div>
                {actionItems.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleActionClick(action)}
                    className="w-full flex items-center p-3 text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-all cursor-pointer group"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className={`${action.icon} text-lg group-hover:scale-105 transition-transform`}></i>
                    </div>
                    <span className="ml-3 font-medium text-sm">{action.label}</span>
                  </button>
                ))}
              </div>
            )}
          </nav>

          {sidebarOpen && (
            <div className="mt-auto p-4">
              <div className="bg-slate-700/50 backdrop-blur-sm p-4 rounded-lg text-white border border-slate-600">
                <div className="flex items-center mb-3">
                  <div className={`${userRole === 'admin' ? 'w-8 h-8' : 'w-10 h-10'} bg-slate-600 rounded-lg flex items-center justify-center mr-3`}>
                    <i className={`${userRole === 'admin' ? 'ri-admin-fill text-slate-300 text-sm' : 'ri-user-heart-fill text-slate-300'}`}></i>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{userProfile.name}</div>
                    <div className="text-xs text-slate-400">{userProfile.role}</div>
                  </div>
                </div>
                {userProfile.status && (
                  <div className="flex items-center text-xs text-emerald-400 mb-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                    {userProfile.status}
                  </div>
                )}
                <div className="text-xs text-slate-400 mb-3">Last login: Today 2:30 PM</div>
                <NavLink
                  to="/"
                  className="text-xs text-slate-300 hover:text-white cursor-pointer flex items-center group"
                >
                  <i className="ri-home-line mr-1 group-hover:-translate-x-1 transition-transform"></i>
                  Return to Main Site
                </NavLink>
              </div>
            </div>
          )}
        </div>

        {/* Modals placed outside the sidebar as siblings */}
        {/* Add Practitioner Modal (Admin only) */}
        {showAddPractitioner && userRole === 'admin' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">Add New Practitioner</h2>
                  <button
                    onClick={() => setShowAddPractitioner(false)}
                    className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <i className="ri-close-line text-slate-600 text-xl"></i>
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      value={practitionerForm.firstName}
                      onChange={(e) =>
                        setPractitionerForm((prev) => ({
                          ...prev,
                          firstName: e.target.value
                        }))
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={practitionerForm.lastName}
                      onChange={(e) =>
                        setPractitionerForm((prev) => ({
                          ...prev,
                          lastName: e.target.value
                        }))
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={practitionerForm.email}
                    onChange={(e) =>
                      setPractitionerForm((prev) => ({
                        ...prev,
                        email: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="practitioner@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={practitionerForm.phone}
                    onChange={(e) =>
                      setPractitionerForm((prev) => ({
                        ...prev,
                        phone: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="+61 400 000 000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">AHPRA Registration Number *</label>
                  <input
                    type="text"
                    required
                    value={practitionerForm.ahpraNumber}
                    onChange={(e) =>
                      setPractitionerForm((prev) => ({
                        ...prev,
                        ahpraNumber: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="MED0001234567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Specialization *</label>
                  <select
                    required
                    value={practitionerForm.specialization}
                    onChange={(e) =>
                      setPractitionerForm((prev) => ({
                        ...prev,
                        specialization: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select specialization</option>
                    <option value="General Practitioner">General Practitioner</option>
                    <option value="Pharmacist">Pharmacist</option>
                    <option value="Nurse Practitioner">Nurse Practitioner</option>
                    <option value="Specialist Doctor">Specialist Doctor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Qualification</label>
                  <input
                    type="text"
                    value={practitionerForm.qualification}
                    onChange={(e) =>
                      setPractitionerForm((prev) => ({
                        ...prev,
                        qualification: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="MBBS, FRACGP, etc."
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className="ri-information-line text-blue-600"></i>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-blue-800">Verification Process</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        AHPRA registration will be automatically verified. Practitioner will receive login credentials via email.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-slate-200 flex space-x-4">
                <button
                  onClick={() => setShowAddPractitioner(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPractitioner}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-user-add-line mr-2"></i>
                  Add Practitioner
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Export Reports Modal (Admin only) */}
        {showExportReports && userRole === 'admin' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">Export Reports</h2>
                  <button
                    onClick={() => setShowExportReports(false)}
                    className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <i className="ri-close-line text-slate-600 text-xl"></i>
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Report Type</label>
                  <select
                    value={exportForm.reportType}
                    onChange={(e) =>
                      setExportForm((prev) => ({
                        ...prev,
                        reportType: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-5"
                  >
                    <option value="revenue">Revenue Analytics</option>
                    <option value="certificates">Certificate Performance</option>
                    <option value="practitioners">Practitioner Performance</option>
                    <option value="compliance">Compliance Audit</option>
                    <option value="users">User Management</option>
                    <option value="payments">Payment Transactions</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
                  <select
                    value={exportForm.dateRange}
                    onChange={(e) =>
                      setExportForm((prev) => ({
                        ...prev,
                        dateRange: e.target.value
                      }))
                    }
                    className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-5"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Export Format</label>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        value="pdf"
                        checked={exportForm.format === 'pdf'}
                        onChange={(e) =>
                          setExportForm((prev) => ({
                            ...prev,
                            format: e.target.value
                          }))
                        }
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 text-sm text-slate-700">
                        <i className="ri-file-pdf-line text-red-500 mr-2"></i>
                        PDF Report
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        value="excel"
                        checked={exportForm.format === 'excel'}
                        onChange={(e) =>
                          setExportForm((prev) => ({
                            ...prev,
                            format: e.target.value
                          }))
                        }
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 text-sm text-slate-700">
                        <i className="ri-file-excel-line text-emerald-500 mr-2"></i>
                        Excel Spreadsheet
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        value="csv"
                        checked={exportForm.format === 'csv'}
                        onChange={(e) =>
                          setExportForm((prev) => ({
                            ...prev,
                            format: e.target.value
                          }))
                        }
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 text-sm text-slate-700">
                        <i className="ri-file-text-line text-blue-500 mr-2"></i>
                        CSV Data
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeCharts"
                    checked={exportForm.includeCharts}
                    onChange={(e) =>
                      setExportForm((prev) => ({
                        ...prev,
                        includeCharts: e.target.checked
                      }))
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="includeCharts" className="ml-3 text-sm text-slate-700 cursor-pointer">
                    Include charts and visualizations (PDF only)
                  </label>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className="ri-time-line text-yellow-600"></i>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-yellow-800">Processing Time</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Large reports may take 2-5 minutes to generate. Download link will be sent to your email.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-slate-200 flex space-x-4">
                <button
                  onClick={() => setShowExportReports(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExportReport}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-download-cloud-2-line mr-2"></i>
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Approval Modal (Doctor only) */}
        {showQuickApproval && userRole === 'doctor' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Quick Certificate Approval</h2>
                <button
                  onClick={() => setShowQuickApproval(false)}
                  className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-slate-600 text-xl"></i>
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Pending Requests</h3>
                <div className="space-y-4">
                  {recentRequests.map(request => (
                    <div key={request.id} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-700">{request.id}</span>
                        {request.urgent && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">Urgent</span>
                        )}
                      </div>
                      <div className="text-sm text-slate-700 mb-2">{request.patient} - {request.condition}</div>
                      <div className="flex space-x-2">
                        <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer">
                          <i className="ri-check-line mr-2"></i>
                          Approve
                        </button>
                        <button className="flex-1 px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors cursor-pointer">
                          <i className="ri-eye-line mr-2"></i>
                          Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setShowQuickApproval(false)}
                  className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {(showProfileMenu || showNotifications) && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setShowProfileMenu(false);
              setShowNotifications(false);
            }}
          ></div>
        )}
      </>
    );
  }

  export default Sidebar;