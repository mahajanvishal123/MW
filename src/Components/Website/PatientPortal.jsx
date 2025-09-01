'use client';

import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function PatientLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isGuest, setIsGuest] = useState(false);

  const handleLogin = () => {
    e.preventDefault();
    // Login logic will be implemented with Supabase
    console.log('Patient login:', { email, password });
  };

  const handleGuestCheckout = () => {
    // Redirect to application form as guest
    window.location.href = '/certificate/apply';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center cursor-pointer">
              <img 
                src="https://static.readdy.ai/image/d02d88b0d280feb932d3d4db548036a1/e03fc4111da8fa0a9a095e83112fcc2c.jfif"
                alt="Medical Certificate Platform"
                className="h-12 w-auto mr-3"
                style={{ width: '250px', height: 'auto' }}
              />
            </Link>
            <nav className="flex space-x-8">
              <Link to={"/"} className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer">
                Home
              </Link>
              <Link href="/verify" className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer">
                Verify Certificate
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Portal</h1>
              <p className="text-gray-600">Sign in to your account or continue as guest</p>
            </div>

            {/* Tab Switcher */}
            <div className="flex mb-8 bg-gray-100 rounded-full p-1">
              <button 
                onClick={() => setIsGuest(false)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  !isGuest 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setIsGuest(true)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isGuest 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Guest Checkout
              </button>
            </div>

            {!isGuest ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link href="/patient/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Sign In
                </button>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-user-line text-2xl text-blue-600"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Continue as Guest</h3>
                  <p className="text-gray-600 mb-4">
                    Apply for your medical certificate without creating an account. 
                    You'll receive your certificate via email.
                  </p>
                  <button
                    onClick={handleGuestCheckout}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Apply for Certificate
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/patient/signup" className="text-indigo-600 hover:text-indigo-500 font-medium cursor-pointer">
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="ri-shield-check-line text-green-600"></i>
              </div>
              <p className="text-sm text-gray-600">Secure & Compliant</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="ri-time-line text-blue-600"></i>
              </div>
              <p className="text-sm text-gray-600">Instant Delivery</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <i className="ri-verified-badge-line text-purple-600"></i>
              </div>
              <p className="text-sm text-gray-600">AHPRA Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}