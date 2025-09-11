import { Link } from 'react-router-dom';
import { useState } from 'react';
import ViewUserModal from "./ViewUserModal";
import EditUserModal from "./EditUserModal";
import UserManagementCards from './UserManagementCards';

export default function UserManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showTwoFactorVerification, setShowTwoFactorVerification] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorError, setTwoFactorError] = useState("");
  const [activeTab, setActiveTab] = useState("Practitioners"); // 👈 Default Practitioners
  const [newUserForm, setNewUserForm] = useState({
    userType: 'patient',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ahpraNumber: '',
    specialization: '',
    qualification: '',
    password: '',
    confirmPassword: '',
    sendWelcomeEmail: true,
    requireVerification: true
  });
  const [exportForm, setExportForm] = useState({
    exportType: 'all',
    format: 'csv',
    includeDetails: true,
    dateRange: 'all'
  });

  const users = [
    {
      id: 'U-2024-001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@medicert.com.au',
      type: 'Practitioner',
      role: 'Doctor',
      status: 'Active',
      verified: true,
      certificates: 156,
      lastLogin: '2024-01-15 14:30',
      joinDate: '2023-06-15',
      ahpra: 'MED0001234567'
    },
    {
      id: 'U-2024-002',
      name: 'John Smith',
      email: 'john.smith@email.com',
      type: 'Patient',
      role: 'Patient',
      status: 'Active',
      verified: true,
      certificates: 3,
      lastLogin: '2024-01-15 12:45',
      joinDate: '2024-01-10',
      ahpra: null
    },
    {
      id: 'U-2024-003',
      name: 'Emma Wilson',
      email: 'emma.wilson@pharmacy.com.au',
      type: 'Practitioner',
      role: 'Pharmacist',
      status: 'Active',
      verified: true,
      certificates: 89,
      lastLogin: '2024-01-15 11:20',
      joinDate: '2023-09-22',
      ahpra: 'PHA0002345678'
    },
    {
      id: 'U-2024-004',
      name: 'Michael Chen',
      email: 'michael.chen@medicert.com.au',
      type: 'Practitioner',
      role: 'Doctor',
      status: 'Pending',
      verified: false,
      certificates: 0,
      lastLogin: 'Never',
      joinDate: '2024-01-14',
      ahpra: 'MED0003456789'
    },
    {
      id: 'U-2024-005',
      name: 'Alice Brown',
      email: 'alice.brown@email.com',
      type: 'Patient',
      role: 'Patient',
      status: 'Suspended',
      verified: true,
      certificates: 8,
      lastLogin: '2024-01-10 16:15',
      joinDate: '2023-11-05',
      ahpra: null
    }
  ];


  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Inactive': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Practitioner': return 'bg-blue-100 text-blue-800';
      case 'Patient': return 'bg-purple-100 text-purple-800';
      case 'Admin': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = userFilter === 'all' ||
      (userFilter === 'practitioners' && user.type === 'Practitioner') ||
      (userFilter === 'patients' && user.type === 'Patient') ||
      (userFilter === 'pending' && user.status === 'Pending');
    return matchesSearch && matchesFilter;
  });

  const handleAddUser = () => {
    console.log('Adding new user:', newUserForm);
    setShowAddUser(false);
    setNewUserForm({
      userType: 'patient',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      ahpraNumber: '',
      specialization: '',
      qualification: '',
      password: '',
      confirmPassword: '',
      sendWelcomeEmail: true,
      requireVerification: true
    });
    alert(`${newUserForm.userType === 'practitioner' ? 'Practitioner' : 'Patient'} successfully added to the system!`);
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewUserForm(prev => ({ ...prev, password: password, confirmPassword: password }));
  };

  const handleExportUsers = () => {
    try {
      console.log('Exporting users:', exportForm);
      // Simulate CSV generation
      const headers = ['User ID', 'Name', 'Email', 'Type', 'Status', 'Join Date', 'Last Login'];
      const csvContent = [
        headers.join(','),
        ...filteredUsers.map(user => [
          user.id,
          `"${user.name}"`,
          user.email,
          user.type,
          user.status,
          user.joinDate,
          user.lastLogin
        ].join(','))
      ].join('\n');
      // Create download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `users_export_${new Date().toISOString().split('T')[0]}.${exportForm.format}`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShowExportModal(false);
      alert(`User list exported successfully as ${exportForm.format.toUpperCase()}!`);
    } catch (error) {
      console.error('Error exporting users:', error);
      alert('Failed to export user list. Please try again.');
    }
  };


  const handleView = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleSave = (updatedUser) => {
    console.log("Updated User:", updatedUser);
    // Update logic here (API call or state update)
  };


  const handleProceedTo2FA = (e) => {
    e.preventDefault();

    // Validate form
    if (!newUserForm.firstName || !newUserForm.lastName || !newUserForm.email || !newUserForm.phone || !newUserForm.password || !newUserForm.confirmPassword) {
      setTwoFactorError("Please fill in all required fields");
      return;
    }

    if (newUserForm.password !== newUserForm.confirmPassword) {
      setTwoFactorError("Passwords do not match");
      return;
    }

    if (newUserForm.userType === 'practitioner' && (!newUserForm.ahpraNumber || !newUserForm.specialization)) {
      setTwoFactorError("Please fill in all practitioner fields");
      return;
    }

    // Clear any previous errors and show 2FA verification
    setTwoFactorError("");
    setShowTwoFactorVerification(true);
  };

  const handleVerifyAndCreateUser = () => {
    // Verify 2FA code
    if (twoFactorCode !== "123456") {
      setTwoFactorError("Invalid 2FA code. Please try again.");
      return;
    }

    // If 2FA is valid, proceed with creating the user
    // Call your existing handleAddUser function here
    handleAddUser();

    // Reset states
    setShowTwoFactorVerification(false);
    setTwoFactorCode("");
    setTwoFactorError("");
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">User Management</h1>
                <p className="text-sm sm:text-base text-slate-600 mt-1">Manage patients, practitioners, and administrators</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowAddUser(true)}
                  className="w-full sm:w-auto bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-user-add-line mr-2"></i>
                  <span>Add User</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">

          <UserManagementCards />

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Search Users</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-search-line text-slate-400"></i>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Name, email, ID..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">User Type</label>
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="all">All Users</option>
                  <option value="practitioners">Practitioners</option>
                  <option value="patients">Patients</option>
                  <option value="pending">Pending Approval</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 sm:mb-8">
            <div className="border-b border-slate-200">
              <button
                className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${activeTab === 'Practitioners'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
              >
                <i className="ri-dashboard-line mr-2"></i>
                Practitioners
              </button>

            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                      <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Certificates</th>
                      <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Last Login</th>
                      <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Join Date</th>
                      <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredUsers
                      .filter((user) => user.type === "Practitioner") // 👈 yaha filter lagaya
                      .map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 sm:px-6 sm:py-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                                <i className={`ri-${user.type === 'Practitioner' ? 'user-heart' : 'user'}-line text-slate-600`}></i>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-slate-900 flex items-center">
                                  {user.name}
                                  {user.verified && (
                                    <i className="ri-verified-badge-fill text-blue-500 ml-2" title="Verified"></i>
                                  )}
                                </div>
                                <div className="text-sm text-slate-500">{user.email}</div>
                                <div className="text-xs text-slate-400">{user.id}</div>
                                {user.ahpra && (
                                  <div className="text-xs text-blue-600 font-mono">AHPRA: {user.ahpra}</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4">
                            <div>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getTypeColor(user.type)}`}>
                                {user.type}
                              </span>
                              {user.role !== user.type && (
                                <div className="text-xs text-slate-500 mt-1">{user.role}</div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900">{user.certificates}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900 hidden sm:table-cell">{user.lastLogin}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900 hidden md:table-cell">{user.joinDate}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4">
                            <div className="flex space-x-2">
                              <button onClick={() => handleView(user)} className="text-blue-600 hover:text-blue-700 cursor-pointer" title="View Profile">
                                <i className="ri-eye-line"></i>
                              </button>
                              <button onClick={() => handleEdit(user)} className="text-emerald-600 hover:text-emerald-700 cursor-pointer" title="Edit User">
                                <i className="ri-edit-line"></i>
                              </button>
                              <button className="text-red-600 hover:text-red-700 cursor-pointer" title="Delete">
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>


              <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:py-4 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-sm text-slate-700">
                    Showing {filteredUsers.length} of {users.length} users
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 cursor-pointer">
                      Previous
                    </button>
                    <button className="px-3 py-2 bg-slate-700 text-white rounded-lg text-sm cursor-pointer">1</button>
                    <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 cursor-pointer">2</button>
                    <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 cursor-pointer">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {showTwoFactorVerification ? "Verify User Creation" : "Add New User"}
                </h2>
                <button
                  onClick={() => {
                    setShowAddUser(false);
                    setShowTwoFactorVerification(false);
                    setTwoFactorCode("");
                  }}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                >
                  <i className="ri-close-line text-slate-600 text-lg sm:text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    value={newUserForm.firstName}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={newUserForm.lastName}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="user@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newUserForm.phone}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+61 400 000 000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">AHPRA Registration Number *</label>
                  <input
                    type="text"
                    required
                    value={newUserForm.ahpraNumber}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, ahpraNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="MED0001234567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Specialization *</label>
                  <select
                    required
                    value={newUserForm.specialization}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, specialization: e.target.value }))}
                    className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select specialization</option>
                      <option value="Specialist Doctor"> Doctor</option>
                    {/* <option value="General Practitioner">General Practitioner</option> */}
                    <option value="Pharmacist">Pharmacist</option>
                    {/* <option value="Nurse Practitioner">Nurse Practitioner</option> */}
                    {/* <option value="Physiotherapist">Physiotherapist</option> */}
                    {/* <option value="Psychologist">Psychologist</option> */}
                    {/* <option value="Dentist">Dentist</option> */}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Qualification</label>
                <input
                  type="text"
                  value={newUserForm.qualification}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, qualification: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="MBBS, FRACGP, BPharm, etc."
                />
              </div>
              {/* Password Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Password *</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={newUserForm.password}
                      onChange={(e) => setNewUserForm(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-3 py-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      title="Generate Password"
                    >
                      <i className="ri-refresh-line text-lg"></i>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    required
                    value={newUserForm.confirmPassword}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sendWelcomeEmail"
                    checked={newUserForm.sendWelcomeEmail}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, sendWelcomeEmail: e.target.checked }))}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="sendWelcomeEmail" className="ml-3 text-sm text-slate-700 cursor-pointer">
                    Send welcome email with login credentials
                  </label>
                </div>

                {newUserForm.userType === 'practitioner' && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="requireVerification"
                      checked={newUserForm.requireVerification}
                      onChange={(e) => setNewUserForm(prev => ({ ...prev, requireVerification: e.target.checked }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="requireVerification" className="ml-3 text-sm text-slate-700 cursor-pointer">
                      Require AHPRA verification before activation
                    </label>
                  </div>
                )}
              </div>

              {/* Info Box */}
              <div className={`border rounded-lg p-4 ${newUserForm.userType === 'practitioner' ? 'bg-blue-50 border-blue-200' : 'bg-purple-50 border-purple-200'}`}>
                <div className="flex">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className={`ri-information-line ${newUserForm.userType === 'practitioner' ? 'text-blue-600' : 'text-purple-600'}`}></i>
                  </div>
                  <div className="ml-3">
                    <h4 className={`text-sm font-medium ${newUserForm.userType === 'practitioner' ? 'text-blue-800' : 'text-purple-800'}`}>
                      {newUserForm.userType === 'practitioner' ? 'Practitioner Account Setup' : 'Patient Account Setup'}
                    </h4>
                    <p className={`text-sm mt-1 ${newUserForm.userType === 'practitioner' ? 'text-blue-700' : 'text-purple-700'}`}>
                      {newUserForm.userType === 'practitioner'
                        ? 'AHPRA registration will be automatically verified. User will receive login credentials and setup instructions via email.'
                        : 'User will receive login credentials via email and can immediately start requesting medical certificates.'
                      }
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
              {showTwoFactorVerification ? (
                <>
                  <button
                    onClick={() => setShowTwoFactorVerification(false)}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Back
                  </button>
                  <button
                    onClick={handleVerifyAndCreateUser}
                    disabled={twoFactorCode.length !== 6}
                    className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap ${twoFactorCode.length !== 6 ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    <i className="ri-shield-check-line mr-2"></i>
                    Verify & Create User
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowAddUser(false)}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProceedTo2FA}
                    className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap ${newUserForm.userType === 'practitioner' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                  >
                    <i className="ri-user-add-line mr-2"></i>
                    Continue to Verification
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Modals */}
      <ViewUserModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        user={selectedUser}
      />
      <EditUserModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={selectedUser}
        onSave={handleSave}
      />

    </div>
  );
}