import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState("");
  const [dashboardType, setDashboardType] = useState("admin");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // First Step: Verify credentials
    if (!showTwoFactor) {
      // Simple validation
      if (!email || !password) {
        setError("Please enter both email and password");
        setIsSubmitting(false);
        return;
      }

      // Simulate API call with timeout
      setTimeout(() => {
        if (dashboardType === "admin" && email === "admin@gmail.com" && password === "123") {
          // Successful admin login - show 2FA
          setShowTwoFactor(true);
          setError("");
        } else if (dashboardType === "practitioner" && email === "doctor@gmail.com" && password === "123") {
          // Successful doctor login - show 2FA
          setShowTwoFactor(true);
          setError("");
        } else {
          setError("Invalid credentials. Please try again.");
        }
        setIsSubmitting(false);
      }, 1000);
    } else {
      // Second Step: Verify 2FA
      if (twoFactor.length !== 6) {
        setError("Please enter a valid 6-digit code");
        setIsSubmitting(false);
        return;
      }

      // Simulate 2FA verification with timeout
      setTimeout(() => {
        if (twoFactor === "123456") {
          // Successful 2FA verification
          if (dashboardType === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/doctor/doctorDashboard");
          }
        } else {
          setError("Invalid 2FA code. Please try again.");
        }
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handleBackToCredentials = () => {
    setShowTwoFactor(false);
    setTwoFactor("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Medical Certificate Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Secure access for authorized personnel only
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Dashboard Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDashboardType('admin')}
                  disabled={showTwoFactor || isSubmitting}
                  className={`p-3 border rounded-md text-center transition-colors ${
                    dashboardType === 'admin'
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  } disabled:opacity-50`}
                >
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm font-medium">Admin</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setDashboardType('practitioner')}
                  disabled={showTwoFactor || isSubmitting}
                  className={`p-3 border rounded-md text-center transition-colors ${
                    dashboardType === 'practitioner'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  } disabled:opacity-50`}
                >
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm font-medium">Practitioner</span>
                  </div>
                </button>
              </div>
            </div>
            
            {!showTwoFactor ? (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder={dashboardType === 'admin' ? 'admin@gmail.com' : 'doctor@gmail.com'}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter password"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label htmlFor="twoFactor" className="block text-sm font-medium text-gray-700 mb-2">
                  Two-Factor Authentication Code
                </label>
                <input
                  id="twoFactor"
                  name="two_factor_code"
                  type="text"
                  value={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                  autoFocus
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>
            )}
            
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting || (showTwoFactor && twoFactor.length !== 6)}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {showTwoFactor ? 'Verifying...' : 'Signing in...'}
                  </>
                ) : (
                  showTwoFactor ? `Access ${dashboardType === 'admin' ? 'Admin' : 'Practitioner'} Dashboard` : 'Continue to 2FA'
                )}
              </button>
            </div>
          </form>
          
          {showTwoFactor && !isSubmitting && (
            <div className="mt-6 text-center">
              <button
                onClick={handleBackToCredentials}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Back to credentials
              </button>
            </div>
          )}
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Demo Credentials
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-center">
                <h3 className="text-sm font-medium text-blue-800">Admin</h3>
                <p className="text-xs text-blue-600">admin@gmail.com</p>
                <p className="text-xs text-blue-600">Password: 123</p>
                <p className="text-xs text-blue-600 mt-1">2FA Code: 123456</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-md p-3 text-center">
                <h3 className="text-sm font-medium text-green-800">Practitioner</h3>
                <p className="text-xs text-green-600">doctor@gmail.com</p>
                <p className="text-xs text-green-600">Password: 123</p>
                <p className="text-xs text-green-600 mt-1">2FA Code: 123456</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}