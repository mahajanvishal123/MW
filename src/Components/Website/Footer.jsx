import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>
    <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center mb-8">
                <img
                  src="https://static.readdy.ai/image/d02d88b0d280feb932d3d4db548036a1/e03fc4111da8fa0a9a095e83112fcc2c.jfif"
                  alt="Medical Certificate Platform"
                  className="h-16 w-auto mr-3"
                  style={{ width: "300px", height: "auto" }}
                />
                {/* <span className="text-2xl font-['Pacifico'] text-white">Medical Certificate Platform</span> */}
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Australia's most affordable medical certificate platform.
                Available Australia-wide with registered practitioners
                delivering secure, compliant healthcare solutions.
              </p>
              <div className="flex space-x-4">
                <button className="w-12 h-12 bg-gray-700 hover:bg-indigo-600 rounded-xl flex items-center justify-center transition-colors cursor-pointer">
                  <i className="ri-facebook-line text-white"></i>
                </button>
                <button className="w-12 h-12 bg-gray-700 hover:bg-indigo-600 rounded-xl flex items-center justify-center transition-colors cursor-pointer">
                  <i className="ri-twitter-line text-white"></i>
                </button>
                <button className="w-12 h-12 bg-gray-700 hover:bg-indigo-600 rounded-xl flex items-center justify-center transition-colors cursor-pointer">
                  <i className="ri-linkedin-line text-white"></i>
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8 text-white">
                Certificate Types
              </h4>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <Link
                    to="/SickLeave"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Sick Leave Certificate
                  </Link>
                </li>
                <li>
                  <Link
                    to="/CarersLeave"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Carer's Leave Certificate
                  </Link>
                </li>
                <li>
                  <Link
                    href="/student-certificate"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Medical Certificates
                  </Link>
                </li>
                <li>
                  {/* <Link
                    href="/verify"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Verify Certificate
                  </Link> */}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8 text-white">
                Support & Info
              </h4>
              <ul className="space-y-4 text-gray-400">
                {/* <li>
                  <Link
                    href="/faq"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    FAQ & Support
                  </Link>
                </li> */}
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Pricing
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="/how-it-works"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    How It Works
                  </Link>
                </li> */}
                <li>
                 <Link
                    to="/ContactSupport"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                   Contact Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-8 text-white">
                Legal & Compliance
              </h4>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Terms of Service
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="/practitioners"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    For Practitioners
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    href="/security"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Data Security
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-lg">
              &copy; 2024 Medical Certificate Platform. Available Australia-wide
              medical certification platform.
            </p>
            <p className="text-gray-500 mt-3">
              ABN: 12 345 678 901 | Supporting cancer research with every
              certificate
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer