// ContactSupportPage.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ContactSupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert("Your message has been sent! We'll get back to you soon.");
  };

  // ✅ स्क्रॉल टॉप: पेज लोड होते ही स्क्रॉल ऊपर जाए
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-xl shadow-lg max-w-lg text-center">
          <div className="text-6xl mb-4">📬</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h2>
          <p className="text-gray-600">
            Thank you for contacting us. Our support team will get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-10 px-12">
            <h1 className="text-4xl font-bold">Contact Support</h1>
            <p className="text-blue-100 mt-3 text-lg">
              Have questions or need help? Our support team is here for you 24/7.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-12 space-y-8">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Briefly describe your issue"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tell us how we can help you..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Support Info */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Need Immediate Help?</h3>
              <ul className="text-blue-700 space-y-1">
                <li>📞 <strong>Call Us:</strong> +1 (800) 123-4567</li>
                <li>✉️ <strong>Email:</strong> support@mediwishglobal.com</li>
                <li>🕒 <strong>Hours:</strong> 24/7 Support Available</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-600 transition transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactSupportPage;