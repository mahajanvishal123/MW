import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar({ sidebarOpen, setSidebarOpen, userRole }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (err) {
        console.error('Invalid user data in localStorage');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();            // clear everything (or just remove 'user')
    navigate('/login');              // redirect to login
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
      <div className="px-8 py-4">
        <div className="flex justify-between items-center">

          {/* Logo + Sidebar Toggle */}
          <div className="flex items-center">
          
              <img
                src="https://static.readdy.ai/image/d02d88b0d280feb932d3d4db548036a1/e03fc4111da8fa0a9a095e83112fcc2c.jfif"
                alt="Medical Certificate Platform"
                className="h-10 w-auto group-hover:scale-105 transition-transform"
                style={{ width: '160px', height: 'auto' }}
              />
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg cursor-pointer text-slate-600 hover:text-slate-900 transition-all"
            >
              <i className={`${sidebarOpen ? 'ri-menu-fold-line' : 'ri-menu-unfold-line'} text-xl`}></i>
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Profile Menu */}
            <div className="relative">
              <div
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 bg-slate-200 hover:bg-slate-300 rounded-lg flex items-center justify-center cursor-pointer group transition-all"
              >
                <i className="ri-user-3-line text-slate-700 text-lg group-hover:scale-105 transition-transform"></i>
              </div>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 max-h-96 overflow-y-auto no-scrollbar">
                  
                  {/* Profile Header */}
                  <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center mr-4">
                        <i className="ri-user-heart-fill text-white text-2xl"></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">
                          {userData?.first_name || "williom"}
                        </h3>
                        <p className="text-slate-600 text-sm">
                          {userData?.email || "williom@gmail.com"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Role-based Menu */}
                  <div className="p-2">
                    {userData?.user_type === "admin" ? (
                      <>
                       
                        <Link to="/admin/certificateaudittrail" className="flex items-center p-3 hover:bg-slate-50 rounded-lg">
                          <i className="ri-calendar-schedule-line mr-3"></i> Certificates
                        </Link>
                        <Link to="/admin/analyticsreports" className="flex items-center p-3 hover:bg-slate-50 rounded-lg">
                          <i className="ri-wallet-3-line mr-3"></i> Analytics & Reports
                        </Link>
                         <Link to="/admin/systemsettings" className="flex items-center p-3 hover:bg-slate-50 rounded-lg">
                          <i className="ri-user-settings-line mr-3"></i> Settings
                        </Link>
                      </>
                    ) : (
                      <>
                          <Link to="/doctor/mycertificates" className="flex items-center p-3 hover:bg-slate-50 rounded-lg">
                          <i className="ri-calendar-schedule-line mr-3"></i> Certificates
                        </Link>
                        <Link to="/doctor/profilesettings" className="flex items-center p-3 hover:bg-slate-50 rounded-lg">
                          <i className="ri-user-settings-line mr-3"></i> Profile Settings
                        </Link>
                     
                      </>
                    )}
                  </div>

                  {/* Logout */}
                  <div className="p-4 border-t border-slate-200 bg-slate-50">
                    <div className="flex space-x-2">
                      <Link to="/" className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg text-center">Main Site</Link>
                      <button
                        onClick={handleLogout}
                        className="flex-1 bg-slate-700 text-white py-2 rounded-lg text-center"
                      >
                        Sign Out
                      </button>
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
