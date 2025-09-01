import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroA from "../../assets/WebsiteImage/heroA.jpg";
import { Modal, Button } from "react-bootstrap";import React from 'react'

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200" >
        <div className="p-1 px-5 me-3 ms-3 mx-auto">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            
            <div className="flex-shrink-0">
                <Link to={"/"}>
                <img
                src="https://static.readdy.ai/image/d02d88b0d280feb932d3d4db548036a1/e03fc4111da8fa0a9a095e83112fcc2c.jfif"
                alt="Medical Certificate Platform"
                className="h-14 sm:h-16 w-auto"
                style={{ width: "200px", height: "auto" }}
              />
                </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium text-sm sm:text-base">
              <Link
                to="/SickLeave"
                className="hover:text-indigo-600 transition duration-300"
              >
                Sick Leave
              </Link>
              <Link
                to="/CarersLeave"
                className="hover:text-indigo-600 transition duration-300"
              >
                Carer's Leave
              </Link>
              <Link
                to="/MedicalCertificates"
                className="hover:text-indigo-600 transition duration-300"
              >
                Medical Certificates
              </Link>
              <Link
                to="/Login"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Start Now
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center text-gray-700 focus:outline-none"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <div className="md:hidden flex flex-col gap-4 mt-4 pb-4 text-gray-700 font-medium text-base border-t pt-4">
              <Link
                to="/SickLeave"
                className="hover:text-indigo-600 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Sick Leave
              </Link>
              <Link
                to="/CarersLeave"
                className="hover:text-indigo-600 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Carer's Leave
              </Link>
              <Link
                to="/MedicalCertificates"
                className="hover:text-indigo-600 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Medical Certificates
              </Link>
              <Link
                to="/Login"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Start Now
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

export default Navbar