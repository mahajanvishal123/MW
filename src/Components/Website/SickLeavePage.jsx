// SickLeavePage.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SickLeavePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    employer: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert("Your sick leave request has been submitted successfully!");
  };

  // ✅ स्क्रॉल टॉप: पेज खुलते ही स्क्रॉल को ऊपर ले जाए
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-xl shadow-lg max-w-lg text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Submitted!</h2>
          <p className="text-gray-600">
            Your sick leave request has been sent. A medical certificate will be emailed to you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* max-w-7xl for wider layout */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-10 px-12">
            <h1 className="text-4xl font-bold">Apply for Sick Leave</h1>
            <p className="text-blue-100 mt-3 text-lg">
              Fill the form below to request a sick leave with a valid medical certificate.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-12 space-y-8">
            {/* Personal Info - 3 column on large screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employer / School Name</label>
                <input
                  type="text"
                  name="employer"
                  value={formData.employer}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Sick Leave</label>
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a reason</option>
                  <option value="Fever">Fever</option>
                  <option value="Cold/Cough">Cold / Cough</option>
                  <option value="Migraine">Migraine</option>
                  <option value="Stomach Issue">Stomach Issue</option>
                  <option value="Other">Other (Specify)</option>
                </select>
              </div>
            </div>

            {/* Leave Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Upload Certificate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Medical Certificate (Optional)
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={handleFileChange}
                className="w-full text-gray-500 mt-2"
              />
              {file && (
                <p className="text-sm text-green-600 mt-1">✅ {file.name} uploaded successfully.</p>
              )}
            </div>

            {/* Doctor Consultation Button */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium text-lg">
                Don’t have a certificate? Book an online consultation with our doctor.
              </p>
              <button
                type="button"
                className="mt-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                onClick={() => alert("Redirecting to doctor consultation booking...")}
              >
                Book Doctor Consultation
              </button>
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-600 transition transform hover:scale-105"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SickLeavePage;