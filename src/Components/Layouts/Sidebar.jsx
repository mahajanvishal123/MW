import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../../App.css";

// Sidebar menu configuration for roles
const adminMenu = [
  { to: "/admin/dashboard", icon: "ri-dashboard-3-line", label: "Dashboard" },
  { to: "/admin/usermanagement", icon: "ri-team-line", label: "Users" },
  { to: "/admin/certificateaudittrail", icon: "ri-shield-check-line", label: "Certificates" },
  { to: "/admin/daycertificates", icon: "ri-coupon-3-line", label: "Day Certificates" },
  { to: "/admin/paymentmanagement", icon: "ri-wallet-3-line", label: "Payments" },
  { to: "/admin/analyticsreports", icon: "ri-line-chart-line", label: "Analytics" },
  { to: "/admin/systemsettings", icon: "ri-settings-4-line", label: "Settings" },
];

const doctorMenu = [
  { to: "/doctor/doctorDashboard", icon: "ri-dashboard-3-line", label: "Dashboard" },
  { to: "/doctor/mycertificates", icon: "ri-file-text-line", label: "Certificates" },
  { to: "/doctor/ScheduleManagement", icon: "ri-calendar-line", label: "Schedule" },
  { to: "/doctor/profilesettings", icon: "ri-user-settings-line", label: "Profile & Settings" },
];

function Sidebar({ sidebarOpen }) {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");
  const menuItems = isAdminPath ? adminMenu : doctorMenu;

  const userProfile = isAdminPath
    ? { name: " Admin", role: "admin" }
    : { name: "Dr. Sarah Johnson", role: "General Practitioner" };

  return (
    <div
      className={`
        fixed top-2 left-0 z-50 bg-slate-800 shadow-2xl border-r border-slate-700 h-screen overflow-y-auto hide-scrollbar
        transition-all duration-300
        ${sidebarOpen ? "md:w-72" : "md:w-20"}
        md:translate-x-0
      `}
      style={{ marginTop: "65px" }}
    >
      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                isActive
                  ? "bg-slate-700 text-white shadow-sm border border-slate-600"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`
            }
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className={`${item.icon} text-lg`}></i>
            </div>
            {sidebarOpen && <span className="ml-4 font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Profile Section */}
      {sidebarOpen && (
        <div className="mt-auto p-4">
          <div className="bg-slate-700/50 backdrop-blur-sm p-4 rounded-lg text-white border border-slate-600">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center mr-3">
                <i className="ri-user-fill text-slate-300"></i>
              </div>
              <div>
                <div className="text-sm font-semibold">{userProfile.name}</div>
                <div className="text-xs text-slate-400">{userProfile.role}</div>
              </div>
            </div>
            <div className="text-xs text-slate-400 mb-3">Last login: Today 2:30 PM</div>
            <NavLink
              to="/"
              className="text-xs text-slate-300 hover:text-white cursor-pointer flex items-center"
            >
              <i className="ri-home-line mr-1"></i>
              Return to Main Site
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
