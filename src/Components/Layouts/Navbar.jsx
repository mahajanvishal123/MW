import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar({ sidebarOpen, setSidebarOpen, userRole }) {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    // Add to your component state
    const [activeTab, setActiveTab] = useState('notifications');
    const [notificationTypes, setNotificationTypes] = useState([
        {
            id: 'urgent',
            name: 'Urgent Alerts',
            icon: 'ri-alert-line',
            settings: {
                email: true,
                sms: true
            },
            recipients: 'all'
        },
        {
            id: 'system',
            name: 'System Updates',
            icon: 'ri-settings-3-line',
            settings: {
                email: true,
                sms: false
            },
            recipients: 'admins'
        },
        {
            id: 'reminder',
            name: 'Reminders',
            icon: 'ri-calendar-check-line',
            settings: {
                email: true,
                sms: false
            },
            recipients: 'all'
        }
    ]);

    // Add these functions to your component
    const toggleNotificationSetting = (typeId, setting) => {
        setNotificationTypes(prev =>
            prev.map(type =>
                type.id === typeId
                    ? { ...type, settings: { ...type.settings, [setting]: !type.settings[setting] } }
                    : type
            )
        );
    };

    const updateNotificationRecipients = (typeId, recipients) => {
        setNotificationTypes(prev =>
            prev.map(type =>
                type.id === typeId
                    ? { ...type, recipients }
                    : type
            )
        );
    };

    const saveNotificationSettings = () => {
        // Here you would typically save the settings to your backend
        console.log('Saving notification settings:', notificationTypes);
        // Show success message
        alert('Notification settings saved successfully!');
        setActiveTab('notifications');
    };

    // ✅ Notifications only for Admin (example)
    const [notifications] = useState([
        {
            id: 1,
            type: 'urgent',
            title: 'New Certificate Request',
            message: 'Patient Sarah Wilson submitted urgent certificate request',
            time: '5 minutes ago',
            read: false,
            actionLink: '/admin/practitioner-certificates'
        },
        {
            id: 2,
            type: 'success',
            title: 'Certificate Approved',
            message: 'MC-2024-0234 has been successfully processed',
            time: '2 hours ago',
            read: false,
            actionLink: '/admin/practitioner-certificates'
        },
    ]);

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'urgent': return 'ri-alarm-warning-line text-red-600';
            case 'warning': return 'ri-alert-line text-orange-600';
            case 'success': return 'ri-check-double-line text-emerald-600';
            case 'info': return 'ri-information-line text-blue-600';
            default: return 'ri-notification-3-line text-slate-600';
        }
    };

    const getNotificationBg = (type, read) => {
        const base = read ? 'bg-slate-50' : 'bg-white';
        const border = type === 'urgent' ? 'border-red-200' : 'border-slate-200';
        return `${base} ${border}`;
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
            <div className="px-8 py-4">
                <div className="flex justify-between items-center">

                    {/* Logo and Sidebar Toggle */}
                    <div className="flex items-center">
                        <Link
                            to={userRole === 'admin' ? "/admin/dashboard" : "/doctor/doctorDashboard"}
                            className="flex items-center cursor-pointer group mr-6"
                        >
                            <img
                                src="https://static.readdy.ai/image/d02d88b0d280feb932d3d4db548036a1/e03fc4111da8fa0a9a095e83112fcc2c.jfif"
                                alt="Medical Certificate Platform"
                                className="h-10 w-auto group-hover:scale-105 transition-transform"
                                style={{ width: '160px', height: 'auto' }}
                            />
                        </Link>

                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-slate-100 rounded-lg cursor-pointer text-slate-600 hover:text-slate-900 transition-all"
                        >
                            <i className={`${sidebarOpen ? 'ri-menu-fold-line' : 'ri-menu-unfold-line'} text-xl`}></i>
                        </button>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">

                        {/* Status & Time (common for both) */}
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="px-3 py-2 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-medium border border-emerald-200">
                                <i className="ri-pulse-line mr-2"></i>Online
                            </div>
                            <div suppressHydrationWarning className="text-sm text-slate-500">
                                Updated: {new Date().toLocaleTimeString()}
                            </div>
                        </div>

                        {/* 🔔 Notifications => Only for Admin */}
                        {userRole === "admin" && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="relative w-10 h-10 bg-slate-200 hover:bg-slate-300 rounded-lg flex items-center justify-center cursor-pointer group transition-all"
                                >
                                    <i className="ri-notification-3-line text-slate-700 text-lg group-hover:scale-105 transition-transform"></i>
                                    {unreadCount > 0 && (
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                                    )}
                                </button>

                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 max-h-96 overflow-y-auto no-scrollbar">
                                        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 flex justify-between">
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg">
                                                    {activeTab === 'notifications' ? 'Notifications' : 'Notification Settings'}
                                                </h3>
                                                <p className="text-slate-600 text-sm">
                                                    {activeTab === 'notifications'
                                                        ? `${unreadCount} unread`
                                                        : 'Configure notification preferences'}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setShowNotifications(false)}
                                                className="w-8 h-8 bg-white hover:bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors border border-slate-200"
                                            >
                                                <i className="ri-close-line text-slate-600 text-lg"></i>
                                            </button>
                                        </div>

                                        {/* Tab Navigation */}
                                        <div className="flex border-b border-slate-200">
                                            <button
                                                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'notifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                                                onClick={() => setActiveTab('notifications')}
                                            >
                                                Notifications
                                            </button>
                                            <button
                                                className={`flex-1 py-3 text-sm font-medium ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                                                onClick={() => setActiveTab('settings')}
                                            >
                                                Settings
                                            </button>
                                        </div>

                                        {/* Tab Content */}
                                        {activeTab === 'notifications' ? (
                                            // Notifications List (original content)
                                            <>
                                                {notifications.map(notification => (
                                                    <div
                                                        key={notification.id}
                                                        className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${getNotificationBg(
                                                            notification.type,
                                                            notification.read
                                                        )}`}
                                                    >
                                                        <div className="flex items-start">
                                                            <div
                                                                className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${notification.type === 'urgent'
                                                                    ? 'bg-red-50 border border-red-200'
                                                                    : 'bg-blue-50 border border-blue-200'
                                                                    }`}
                                                            >
                                                                <i className={`${getNotificationIcon(notification.type)} text-sm`}></i>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="text-sm font-semibold text-slate-900 truncate">
                                                                    {notification.title}
                                                                </h4>
                                                                <p className="text-sm text-slate-600">{notification.message}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            // Notification Settings (new content)
                                            <div className="p-4">
                                                <div className="mb-6">
                                                    <h4 className="font-medium text-slate-900 mb-3">Notification Types</h4>

                                                    {notificationTypes.map(type => (
                                                        <div key={type.id} className="mb-4 p-3 border border-slate-200 rounded-lg">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <div className="flex items-center">
                                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-2 ${type.id === 'urgent' ? 'bg-red-50' : 'bg-blue-50'}`}>
                                                                        <i className={`${type.icon} text-sm`}></i>
                                                                    </div>
                                                                    <span className="font-medium text-slate-900">{type.name}</span>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-2 mb-2">
                                                                <div className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`email-${type.id}`}
                                                                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                                                                        checked={type.settings.email}
                                                                        onChange={() => toggleNotificationSetting(type.id, 'email')}
                                                                    />
                                                                    <label htmlFor={`email-${type.id}`} className="ml-2 text-sm text-slate-700">
                                                                        Email
                                                                    </label>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`sms-${type.id}`}
                                                                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                                                                        checked={type.settings.sms}
                                                                        onChange={() => toggleNotificationSetting(type.id, 'sms')}
                                                                    />
                                                                    <label htmlFor={`sms-${type.id}`} className="ml-2 text-sm text-slate-700">
                                                                        SMS
                                                                    </label>
                                                                </div>
                                                            </div>

                                                            <div className="mt-2">
                                                                <label className="text-xs text-slate-600 block mb-1">Recipients:</label>
                                                                <select
                                                                    className="w-full text-sm border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                    value={type.recipients}
                                                                    onChange={(e) => updateNotificationRecipients(type.id, e.target.value)}
                                                                >
                                                                    <option value="all">All Users</option>
                                                                    <option value="admins">Admins Only</option>
                                                                    <option value="managers">Managers Only</option>
                                                                    <option value="custom">Custom Selection</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
                                                    <button
                                                        className="px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                                                        onClick={() => setActiveTab('notifications')}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
                                                        onClick={saveNotificationSettings}
                                                    >
                                                        Save Settings
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 👤 Profile Menu => Different for Admin & Doctor */}
                        <div className="relative">
                            <div
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="w-10 h-10 bg-slate-200 hover:bg-slate-300 rounded-lg flex items-center justify-center cursor-pointer group transition-all"
                            >
                                <i className="ri-user-3-line text-slate-700 text-lg group-hover:scale-105 transition-transform"></i>
                            </div>

                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 max-h-96 overflow-y-auto no-scrollbar">
                                    <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                                        <div className="flex items-center">
                                            <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center mr-4">
                                                <i className="ri-user-heart-fill text-white text-2xl"></i>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg">
                                                    {userRole === "admin" ? "Admin User" : "Dr. Sarah Johnson"}
                                                </h3>
                                                <p className="text-slate-600 text-sm">
                                                    {userRole === "admin" ? "admin@medicert.com" : "sarah.johnson@medicert.com.au"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Role-based Menu */}
                                    <div className="p-2">
                                        {userRole === "admin" ? (
                                            <>
                                                <Link to="/admin/systemsettings" className="flex items-center p-3 hover:bg-slate-50 rounded-lg">
                                                    <i className="ri-user-settings-line mr-3"></i> Settings
                                                </Link>
                                                <Link to="/admin/certificateaudittrail" className="flex items-center p-3 hover:bg-slate-50 rounded-lg">
                                                    <i className="ri-calendar-schedule-line mr-3"></i> Certificates
                                                </Link>
                                                <Link to="/admin/analyticsreports" className="flex items-center p-3 hover:bg-slate-50 rounded-lg">
                                                    <i className="ri-wallet-3-line mr-3"></i> Analytics & Reports
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link to="/doctor/profilesettings" className="flex items-center p-3 hover:bg-slate-50 rounded-lg">
                                                    <i className="ri-user-settings-line mr-3"></i> Profile Settings
                                                </Link>
                                                <Link to="/doctor/ScheduleManagement" className="flex items-center p-3 hover:bg-slate-50 rounded-lg">
                                                    <i className="ri-calendar-schedule-line mr-3"></i> Schedule Management
                                                </Link>
                                                {/* <Link to="/doctor/earningsreports" className="flex items-center p-3 hover:bg-slate-50 rounded-lg">
                                                    <i className="ri-wallet-3-line mr-3"></i> Earnings & Reports
                                                </Link> */}
                                            </>
                                        )}
                                    </div>

                                    {/* Logout */}
                                    <div className="p-4 border-t border-slate-200 bg-slate-50">
                                        <div className="flex space-x-2">
                                            <Link to="/" className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg text-center">Main Site</Link>
                                            <Link to="/login" className="flex-1 bg-slate-700 text-white py-2 rounded-lg text-center">Sign Out</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
