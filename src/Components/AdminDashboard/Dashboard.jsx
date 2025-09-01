

import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function AdminDashboard() {
  const [stats] = useState({
    totalCertificates: 1247,
    pendingApprovals: 23,
    activePractitioners: 156,
    totalRevenue: 78940,
    todayApplications: 45,
    approvalRate: 94.2
  });

  const [showAddPractitioner, setShowAddPractitioner] = useState(false);
  const [showExportReports, setShowExportReports] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'Certificate Pending Review',
      message: 'MC-2024-0156 has been waiting for approval for 4 hours',
      time: '4 hours ago',
      read: false,
      action: 'Review Certificate',
      actionLink: '/admin/certificates'
    },
    {
      id: 2,
      type: 'warning',
      title: 'System Backup Completed',
      message: 'Daily backup completed successfully at 3:00 AM',
      time: '12 hours ago',
      read: false,
      action: null,
      actionLink: null
    },
    {
      id: 3,
      type: 'info',
      title: 'New Practitioner Registration',
      message: 'Dr. Michael Chen completed verification process',
      time: '1 day ago',
      read: true,
      action: 'View Profile',
      actionLink: '/admin/users'
    },
    {
      id: 4,
      type: 'success',
      title: 'Monthly Revenue Target Achieved',
      message: 'Revenue exceeded target by 12% this month',
      time: '2 days ago',
      read: true,
      action: 'View Report',
      actionLink: '/admin/reports'
    },
    {
      id: 5,
      type: 'info',
      title: 'Security Update Available',
      message: 'A new security update is available for the platform',
      time: '3 days ago',
      read: false,
      action: 'Update System',
      actionLink: '/admin/settings'
    }
  ]);

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

  const handleAddPractitioner = () => {
    try {
      console.log('Adding practitioner:', practitionerForm);
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
      console.error('Error adding practitioner:', error);
      alert('Failed to add practitioner. Please try again.');
    }
  };

  const handleExportReport = () => {
    try {
      console.log('Exporting report:', exportForm);
      setShowExportReports(false);
      alert('Report export started! You will receive download link via email.');
    } catch (error) {
      console.error('Error exporting report:', error);
      alert('Failed to start report export. Please try again.');
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'urgent':
        return 'ri-alarm-warning-line text-red-600';
      case 'warning':
        return 'ri-alert-line text-orange-600';
      case 'success':
        return 'ri-check-double-line text-emerald-600';
      case 'info':
        return 'ri-information-line text-blue-600';
      default:
        return 'ri-notification-3-line text-slate-600';
    }
  };

  const getNotificationBg = (type, read) => {
    const baseColor = read ? 'bg-slate-50' : 'bg-white';
    const borderColor = type === 'urgent' ? 'border-red-200' : 'border-slate-200';
    return `${baseColor} ${borderColor}`;
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
              <header className="">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                 <h1 className="text-xl md:text-2xl font-bold text-slate-900">Admin Dashboard</h1>
      <p className="text-slate-500 text-sm">Monitor and manage users, payments, and system settings</p>
              </div>
             
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Total Certificates</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stats.totalCertificates.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-file-text-fill text-xl text-blue-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">+12%</span>
                <span className="text-slate-500 ml-2">from last month</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Pending Review</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.pendingApprovals}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-time-fill text-xl text-orange-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded">Urgent</span>
                <span className="text-slate-500 ml-2">requires attention</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Active Practitioners</p>
                  <p className="text-3xl font-bold text-emerald-600">{stats.activePractitioners}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <i className="ri-user-heart-fill text-xl text-emerald-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">+8</span>
                <span className="text-slate-500 ml-2">new this week</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-slate-900">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-dollar-circle-fill text-xl text-slate-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">+18%</span>
                <span className="text-slate-500 ml-2">growth rate</span>
              </div>
            </div>
          </div>

          {/* Management Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            <Link
              to={"/admin/usermanagement"}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                  <i className="ri-team-fill text-xl text-blue-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">User Management</h3>
              </div>
              <p className="text-slate-600 mb-4 leading-relaxed">Manage patient, practitioner, and administrator accounts</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded">156 Users</span>
                <i className="ri-arrow-right-circle-line text-xl text-slate-300 group-hover:text-blue-500 transition-colors"></i>
              </div>
            </Link>

            <Link
              to={"/admin/certificateaudittrail"}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-emerald-200 transition-colors">
                  <i className="ri-shield-check-fill text-xl text-emerald-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Certificate Audit</h3>
              </div>
              <p className="text-slate-600 mb-4 leading-relaxed">Complete audit trail with search and verification tools</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded">1,247 Records</span>
                <i className="ri-arrow-right-circle-line text-xl text-slate-300 group-hover:text-emerald-500 transition-colors"></i>
              </div>
            </Link>

            <Link
              to={"/admin/paymentmanagement"}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                  <i className="ri-wallet-3-fill text-xl text-purple-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Payment Hub</h3>
              </div>
              <p className="text-slate-600 mb-4 leading-relaxed">Transaction monitoring and revenue reporting</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded">$78,940</span>
                <i className="ri-arrow-right-circle-line text-xl text-slate-300 group-hover:text-purple-500 transition-colors"></i>
              </div>
            </Link>

            {/* <Link
              to={"/admin/discountmanagement"}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-200 transition-colors">
                  <i className="ri-coupon-3-fill text-xl text-orange-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Discount Engine</h3>
              </div>
              <p className="text-slate-600 mb-4 leading-relaxed">Smart discount rules and promotional campaigns</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-orange-600 font-medium bg-orange-50 px-3 py-1 rounded">12 Rules</span>
                <i className="ri-arrow-right-circle-line text-xl text-slate-300 group-hover:text-orange-500 transition-colors"></i>
              </div>
            </Link> */}

            <Link
              to={"/admin/analyticsreports"}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-indigo-200 transition-colors">
                  <i className="ri-line-chart-fill text-xl text-indigo-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Analytics Center</h3>
              </div>
              <p className="text-slate-600 mb-4 leading-relaxed">Advanced reporting and business insights</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded">94.2% Rate</span>
                <i className="ri-arrow-right-circle-line text-xl text-slate-300 group-hover:text-indigo-500 transition-colors"></i>
              </div>
            </Link>

            <Link
              to={"/admin/systemsettings"}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-slate-200 transition-colors">
                  <i className="ri-settings-4-fill text-xl text-slate-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">System Control</h3>
              </div>
              <p className="text-slate-600 mb-4 leading-relaxed">Platform configuration and security settings</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 font-medium bg-slate-100 px-3 py-1 rounded">Ready</span>
                <i className="ri-arrow-right-circle-line text-xl text-slate-300 group-hover:text-slate-500 transition-colors"></i>
              </div>
            </Link>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>
                <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-refresh-line mr-2"></i>
                  Refresh
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <i className="ri-check-double-line text-emerald-600 text-lg"></i>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium text-slate-900">Certificate #MC-2024-0156 approved</p>
                    <p className="text-sm text-slate-600">Dr. Sarah Johnson approved patient request</p>
                  </div>
                  <span className="text-sm text-slate-500">2 min ago</span>
                </div>

                <div className="flex items-center p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-star-line text-blue-600 text-lg"></i>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium text-slate-900">New practitioner verified</p>
                    <p className="text-sm text-slate-600">Dr. Michael Chen completed verification</p>
                  </div>
                  <span className="text-sm text-slate-500">15 min ago</span>
                </div>

                <div className="flex items-center p-4 bg-purple-50 border border-purple-100 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-secure-payment-line text-purple-600 text-lg"></i>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium text-slate-900">Payment processed: $79.00</p>
                    <p className="text-sm text-slate-600">Patient ID: P-2024-0892</p>
                  </div>
                  <span className="text-sm text-slate-500">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
