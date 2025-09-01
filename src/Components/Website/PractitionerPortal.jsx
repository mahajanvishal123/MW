'use client';

import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function PractitionerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [practitionerType, setPractitionerType] = useState('doctor');

  const handleLogin = () => {
    e.preventDefault();
    // Login logic will be implemented with Supabase
    console.log('Practitioner login:', { email, password, practitionerType });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center cursor-pointer">
              <img 
                src="https://static.readdy.ai/image/d02d88b0d280feb932d3d4db548036a1/e03fc4111da8fa0a9a095e83112fcc2c.jfif"
                alt="MediWish Global"
                className="h-8 w-auto mr-3"
              />
              <span className="text-xl font-['Pacifico'] text-indigo-600">MediWish Global</span>
            </Link>
            <nav className="flex space-x-8">
              <Link to={"/"} className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer">
                Home
              </Link>
              <Link to={"/patient/login"} className="text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer">
                Patient Portal
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-heart-line text-3xl text-emerald-600"></i>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Practitioner Portal</h1>
              <p className="text-gray-600">Sign in to review and approve certificates</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Practitioner Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="doctor"
                      checked={practitionerType === 'doctor'}
                      onChange={(e) => setPractitionerType(e.target.value)}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Doctor</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="pharmacist"
                      checked={practitionerType === 'pharmacist'}
                      onChange={(e) => setPractitionerType(e.target.value)}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Pharmacist</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  AHPRA Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  placeholder="practitioner@clinic.com.au"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Sign In to Portal
              </button>
            </form>

            <div className="mt-8 space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-shield-check-line text-emerald-600"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-emerald-700">
                      <strong>AHPRA Verified:</strong> Only registered practitioners with valid AHPRA numbers can access this portal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Need to register as a practitioner?{' '}
                  <Link href="/practitioner/register" className="text-emerald-600 hover:text-emerald-500 font-medium cursor-pointer">
                    Apply Here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Practitioner Benefits */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-money-dollar-circle-line text-emerald-600"></i>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Earn Income</h3>
              <p className="text-xs text-gray-600">Competitive rates per certificate reviewed</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-time-line text-blue-600"></i>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Flexible Hours</h3>
              <p className="text-xs text-gray-600">Work on your own schedule</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-shield-line text-purple-600"></i>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Full Compliance</h3>
              <p className="text-xs text-gray-600">AHPRA guidelines followed</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-heart-line text-orange-600"></i>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Help Community</h3>
              <p className="text-xs text-gray-600">Support accessible healthcare</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}