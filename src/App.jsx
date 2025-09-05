import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Website Pages
import PatientPortal from "./Components/Website/PatientPortal";
import PractitionerPortal from "./Components/Website/PractitionerPortal";
import Login from "./Auth/Login";
import SickLeavePage from "./Components/Website/SickLeavePage";
import CarersLeavePage from "./Components/Website/CarersLeavePage";
import ContactSupportPage from "./Components/Website/ContactSupportPage";

// Admin Dashboard
import Dashboard from "./Components/AdminDashboard/Dashboard";
import UserManagement from "./Components/AdminDashboard/UserManagement/UserManagement";
import CertificateAuditTrail from "./Components/AdminDashboard/Certificate/CertificateAuditTrail";
import DiscountManagement from "./Components/AdminDashboard/Discount/DiscountManagement";
import AnalyticsReports from "./Components/AdminDashboard/AnalyticsReports";
import SystemSettings from "./Components/AdminDashboard/SystemSettings";

// Doctor Dashboard
import Dasbord from "./Components/DoctorDashboard/Dashboard/Dasbord";
import MyCertificates from "./Components/DoctorDashboard/MyCertificates";
import ScheduleManagement from "./Components/DoctorDashboard/ScheduleManagement/ScheduleManagement";
import EarningsReports from "./Components/DoctorDashboard/EarningsReports";
import ProfileSettings from "./Components/DoctorDashboard/ProfileSettings";

// Common
import ScrollToTop from "./Components/ScrollToTop";
import Sidebar from "./Components/Layouts/Sidebar";
import Navbar from "./Components/Layouts/Navbar";
import HeroSection from "./Components/Website/HeroSection";
import PaymentManagement from "./Components/AdminDashboard/PaymentManagement/PaymentManagement";

function AppContent() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768); // md breakpoint

  const [userRole, setUserRole] = useState("admin"); // Or doctor, handle dynamically

  // ✅ Check if current route is dashboard (admin or doctor)
  const isDashboard =
    location.pathname.startsWith("/admin") || location.pathname.startsWith("/doctor");


    useEffect(() => {
  const handleResize = () => {
    setSidebarOpen(window.innerWidth >= 768);
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


  return (
    <>
      <ScrollToTop />

      {/* If it's dashboard => show layout with sidebar + navbar */}
      {isDashboard ? (
        <div className="flex flex-col h-screen">
          {/* Navbar */}
          <Navbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            userRole={userRole}
          />

          {/* Sidebar + Main content */}
          <div className="flex flex-1 overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} />
            <main
              className={`flex-1 overflow-y-auto bg-slate-100 transition-all duration-300
    ${sidebarOpen ? "md:ml-[288px]" : "md:ml-[80px]"} ml-0
  `}
            >
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/usermanagement" element={<UserManagement />} />
                <Route path="/admin/certificateaudittrail" element={<CertificateAuditTrail />} />
                <Route path="/admin/paymentmanagement" element={<PaymentManagement />} />
                <Route path="/admin/discountmanagement" element={<DiscountManagement />} />
                <Route path="/admin/analyticsreports" element={<AnalyticsReports />} />
                <Route path="/admin/systemsettings" element={<SystemSettings />} />

                {/* Doctor Routes */}
                <Route path="/doctor/doctorDashboard" element={<Dasbord />} />
                <Route path="/doctor/mycertificates" element={<MyCertificates />} />
                <Route path="/doctor/schedulemanagement" element={<ScheduleManagement />} />
                <Route path="/doctor/earningsreports" element={<EarningsReports />} />
                <Route path="/doctor/profilesettings" element={<ProfileSettings />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        // ✅ If it's not dashboard => show website pages without layout
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/PatientPortal" element={<PatientPortal />} />
          <Route path="/PractitionerPortal" element={<PractitionerPortal />} />
          <Route path="/patient/login" element={<PatientPortal />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SickLeave" element={<SickLeavePage />} />
          <Route path="/CarersLeave" element={<CarersLeavePage />} />
          <Route path="/ContactSupport" element={<ContactSupportPage />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
