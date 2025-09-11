import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';

const PersonalDetailsForm = ({ onContinue, onBack, selectedCertificate, certificates, formData, setFormData }) => {
  // Find the selected certificate object
  const certificate = certificates.find(cert => cert.id === selectedCertificate);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Personal Details Submitted:', formData);
    onContinue();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 space-y-6 bg-gray-50 rounded-b-xl">
        {/* Certificate Header - Now Dynamic */}
        {certificate && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center">
            <div className={`w-8 h-8 rounded-md flex items-center justify-center mr-3 ${certificate.id === 1 ? 'bg-emerald-100' :
              certificate.id === 2 ? 'bg-indigo-100' :
                'bg-amber-100'
              }`}>
              {certificate.id === 1 && <i className="ri-file-text-line text-2xl text-emerald-600"></i>}
              {certificate.id === 2 && <i className="ri-parent-line text-2xl text-indigo-600"></i>}
              {certificate.id === 3 && <i className="ri-graduation-cap-line text-2xl text-amber-600"></i>}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{certificate.title}</h2>
              <p className="text-sm text-gray-600">{certificate.subtitle}</p>
            </div>
          </div>
        )}
        {/* Personal Information Section */}
        <div className="bg-white p-5 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
          <p className="text-sm text-gray-600 mb-4">
            Please provide your personal details as per official documents
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8a2 2 0 11-4 0 2 2 0 014 0zM11 15a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Birth Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 000 2h8a1 1 0 100-2H6zM3 6a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6zm3 2a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            {/* Guardian's Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guardian's Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your guardian's name"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Address Information Section */}
        <div className="bg-white p-5 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Address Information</h3>
          <p className="text-sm text-gray-600 mb-4">Please provide your address as per official documents</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address (as per Govt ID proof) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your address"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your city"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
             <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your state "
                />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your pincode"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-blue-800">
              Your personal information is secure and will only be used for certificate generation. All details will be verified by a registered medical practitioner.
            </p>
          </div>
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center text-blue-700 border border-blue-500 px-4 py-2.5 rounded-lg hover:bg-blue-50 transition"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition"
          >
            Continue →
          </button>
        </div>
      </div>
    </form>
  );
};

// Certificate Details Form Component (Matches Screenshot)
const CertificateDetailsForm = ({ onBack, formData, setFormData, handleSubmit, apiResponse, isSubmitting }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, organizationLocation: value }));
  };

  const handleSubmitLocal = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-b-xl">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-lg flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1z" />
        </svg>
        <h2 className="font-semibold">Certificate Details</h2>
      </div>
      <form onSubmit={handleSubmitLocal} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter organization name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization Location <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="location"
                  value="inIndia"
                  checked={formData.organizationLocation === 'inIndia'}
                  onChange={() => handleRadioChange('inIndia')}
                  className="mr-1"
                />
                <span className="text-sm">IN India</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="location"
                  value="outsideIndia"
                  checked={formData.organizationLocation === 'outsideIndia'}
                  onChange={() => handleRadioChange('outsideIndia')}
                  className="mr-1"
                />
                <span className="text-sm">Outside India</span>
              </label>
            </div>
          </div>
        </div>
        {/* Medical Fitness Details */}
        <div className="border-t pt-6">
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="font-semibold text-blue-800">Medical Fitness Details</h3>
          </div>
          {/* Dropdown for Reason */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Leave <span className="text-red-500">*</span>
            </label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select reason</option>
              <option value="Fever">Fever</option>
              <option value="Cold and Cough">Cold and Cough</option>
              <option value="Stomach Infection">Stomach Infection</option>
              <option value="Migraine">Migraine</option>
              <option value="Injury/Accident">Injury/Accident</option>
              <option value="Surgery/Post-operative Care">Surgery/Post-operative Care</option>
              <option value="Mental Health">Mental Health</option>
              <option value="Other">Other (Please specify)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                placeholder="Enter height in centimeters"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="Enter weight in kilograms"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Any Medical Conditions to Note (Optional)
            </label>
            <textarea
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleInputChange}
              placeholder="List any medical conditions that should be noted (e.g., asthma, allergies)"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              This information will be used by the doctor for assessment. Leave blank if none.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-blue-800">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2H9.414l1-1H10a1 1 0 000-2H9z"
                  clipRule="evenodd"
                />
              </svg>
              Please note that we may require additional information during the verification
              process to ensure the fitness certificate meets your specific requirements.
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center text-blue-700 border border-blue-500 px-4 py-2.5 rounded-lg hover:bg-blue-50 transition"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-70"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
        
        {/* API Response Message */}
        {apiResponse && (
          <div className={`mt-4 p-4 rounded-lg ${apiResponse.error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 mt-0.5 ${apiResponse.error ? 'text-red-500' : 'text-green-500'}`} viewBox="0 0 20 20" fill="currentColor">
                {apiResponse.error ? (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                )}
              </svg>
              <div>
                <h3 className={`font-medium ${apiResponse.error ? 'text-red-800' : 'text-green-800'}`}>
                  {apiResponse.error ? 'Error' : 'Success'}
                </h3>
                <p className={`text-sm ${apiResponse.error ? 'text-red-700' : 'text-green-700'}`}>
                  {apiResponse.error || 'Your certificate has been submitted successfully!'}
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

// Main SickLeavePage Component
const SickLeavePage = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [activeStep, setActiveStep] = useState('certificate'); // 'certificate', 'personal', 'details'
  const [sliderPosition, setSliderPosition] = useState(0);
  const [apiResponse, setApiResponse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Combined form data state
  const [formData, setFormData] = useState({
    // Personal details
    fullName: '',
    email: '',
    birthDate: '',
    guardianName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    // Certificate details
    organizationName: '',
    organizationLocation: 'inIndia',
    reason: '',
    height: '',
    weight: '',
    medicalConditions: '',
  });

  const tabRefs = [useRef(null), useRef(null), useRef(null)];
  
  const certificates = [
    {
      id: 1,
      title: 'Sick Leave Certificate',
      subtitle: 'For workplace or educational absence',
      price: '$11.99',
    },
    {
      id: 2,
      title: 'Carers Leave Certificate',
      subtitle: 'Government-recognized format',
      price: ' $11.99',
    },
    {
      id: 3,
      title: 'Student Sick Leave Certificate',
      subtitle: 'For employment or education purposes',
      price: '$11.99',
    },
  ];

  useEffect(() => {
    const updateSlider = () => {
      const activeIndex = activeStep === 'certificate' ? 0 : 
                         activeStep === 'personal' ? 1 : 2;
      if (tabRefs[activeIndex].current) {
        const { offsetLeft, offsetWidth } = tabRefs[activeIndex].current;
        setSliderPosition(offsetLeft);
        document.documentElement.style.setProperty('--slider-width', `${offsetWidth}px`);
      }
    };
    updateSlider();
    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, [activeStep]);

  const handleSelect = (id) => {
    setSelectedCertificate(id);
    setActiveStep('personal');
  };

  const handleTabChange = (step) => {
    if (step === 'personal' && !selectedCertificate) {
      alert('Please select a certificate first!');
      return;
    }
    if (step === 'details' && activeStep !== 'personal') {
      alert('Please complete personal details first!');
      return;
    }
    setActiveStep(step);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setApiResponse(null); // Reset previous response
    
    try {
      // Get additional data from localStorage
      const certificate_day = localStorage.getItem('certificateId') || '1';
      const mobile_No = localStorage.getItem('whatsappNumber') || '9876543210';
      
      // Find the selected certificate
      const certificate = certificates.find(cert => cert.id === selectedCertificate);
      
      // Prepare the payload
      const payload = {
        certificate_type: certificate ? certificate.title : '',
        full_name: formData.fullName,
        email_address: formData.email,
        birth_date: formData.birthDate,
        guardian_name: formData.guardianName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        organization_name: formData.organizationName,
        organization_location: formData.organizationLocation === 'inIndia' ? 'Mumbai Office' : 'Outside India',
        reason_for_leave: formData.reason,
        height: parseInt(formData.height) || 0,
        weight: parseInt(formData.weight) || 0,
        medical_conditions: formData.medicalConditions,
        certificate_day: parseInt(certificate_day),
        mobile_No: mobile_No
      };

      const response = await fetch('https://ssknf82q-4001.inc1.devtunnels.ms/api/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      setApiResponse(result);
    } catch (error) {
      setApiResponse({ error: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex justify-center items-start pt-8 pb-6 px-4">
          <div className="w-full max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 text-center">
              <div className="text-2xl mb-2"></div>
              <h1 className="text-2xl font-bold">Apply for Medical Certificate</h1>
              <p className="text-blue-100 text-sm mt-1">
                Complete the following steps to receive your medical certificate issued by registered Indian doctors
              </p>
            </div>
            {/* Progress Steps */}
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
              <div className="flex flex-col items-center w-1/3">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium ${activeStep === 'certificate'
                    ? 'border-blue-500 bg-blue-100 text-blue-700'
                    : 'border-gray-300 text-gray-500'
                    }`}
                >
                  1
                </div>
                <span
                  className={`text-xs mt-1 text-center ${activeStep === 'certificate' ? 'text-blue-700' : 'text-gray-400'
                    }`}
                >
                  Choose Certificate
                </span>
              </div>
              <div className="flex-1 h-px bg-gray-300 mx-2"></div>
              <div className="flex flex-col items-center w-1/3">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium ${activeStep === 'personal'
                    ? 'border-blue-500 bg-blue-100 text-blue-700'
                    : 'border-gray-300 text-gray-500'
                    }`}
                >
                  2
                </div>
                <span
                  className={`text-xs mt-1 text-center ${activeStep === 'personal' ? 'text-blue-700' : 'text-gray-400'
                    }`}
                >
                  Personal Details
                </span>
              </div>
              <div className="flex-1 h-px bg-gray-300 mx-2"></div>
              <div className="flex flex-col items-center w-1/3">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium ${activeStep === 'details'
                    ? 'border-blue-500 bg-blue-100 text-blue-700'
                    : 'border-gray-300 text-gray-500'
                    }`}
                >
                  3
                </div>
                <span
                  className={`text-xs mt-1 text-center ${activeStep === 'details' ? 'text-blue-700' : 'text-gray-400'
                    }`}
                >
                  Certificate Details
                </span>
              </div>
            </div>
            {/* Tab Navigation with Slider */}
            <div className="px-6 py-3 flex border-b border-gray-200 relative">
              {/* Slider element */}
              <div
                className="absolute bottom-0 h-1 bg-blue-500 transition-all duration-300 rounded-t-md"
                style={{
                  left: `${sliderPosition}px`,
                  width: 'var(--slider-width, 0px)'
                }}
              ></div>
              <button
                ref={tabRefs[0]}
                className={`flex-1 flex items-center justify-center py-2 px-4 font-medium rounded-t-lg relative z-10 ${activeStep === 'certificate'
                  ? 'text-blue-700'
                  : 'text-gray-600 hover:text-gray-800'
                  }`}
                onClick={() => handleTabChange('certificate')}
              >
                Choose Certificate
              </button>
              <button
                ref={tabRefs[1]}
                className={`flex-1 flex items-center justify-center py-2 px-4 font-medium rounded-t-lg relative z-10 ${activeStep === 'personal'
                  ? 'text-blue-700'
                  : selectedCertificate
                    ? 'text-gray-600 hover:text-gray-800'
                    : 'text-gray-400 cursor-not-allowed'
                  }`}
                onClick={() => handleTabChange('personal')}
                disabled={!selectedCertificate}
              >
                Personal Details
              </button>
              <button
                ref={tabRefs[2]}
                className={`flex-1 flex items-center justify-center py-2 px-4 font-medium rounded-t-lg relative z-10 ${activeStep === 'details'
                  ? 'text-blue-700'
                  : activeStep === 'personal'
                    ? 'text-gray-600 hover:text-gray-800'
                    : 'text-gray-400 cursor-not-allowed'
                  }`}
                onClick={() => handleTabChange('details')}
                disabled={activeStep !== 'personal'}
              >
                Certificate Details
              </button>
            </div>
            {/* Conditional Rendering */}
            {activeStep === 'certificate' ? (
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-blue-700">Select Your Medical Certificate</h2>
                  <p className="text-gray-600 mt-1">Choose the type of certificate you need from our verified medical professionals</p>
                </div>
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className={`border rounded-xl p-5 transition-all cursor-pointer ${selectedCertificate === cert.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                    onClick={() => handleSelect(cert.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`rounded-lg w-10 h-10 flex items-center justify-center ${cert.id === 1 ? 'bg-emerald-50' : cert.id === 2 ? 'bg-indigo-50' : 'bg-amber-50'
                            }`}
                        >
                          {cert.id === 1 && <i className="ri-file-text-line text-2xl text-emerald-600"></i>}
                          {cert.id === 2 && <i className="ri-parent-line text-2xl text-indigo-600"></i>}
                          {cert.id === 3 && <i className="ri-graduation-cap-line text-2xl text-amber-600"></i>}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{cert.title}</h3>
                          <p className="text-gray-600 text-sm">{cert.subtitle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-700">{cert.price}</span>
                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full border ${selectedCertificate === cert.id
                              ? 'border-blue-500 text-blue-700 bg-blue-50'
                              : 'border-blue-300 text-blue-700'
                              }`}
                          >
                            {selectedCertificate === cert.id ? 'Selected' : 'Select'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Important Information */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start">
                    <div className="text-blue-600 mr-2 mt-0.5">✅</div>
                    <div>
                      <h4 className="font-medium text-blue-800">Important Information</h4>
                      <ul className="text-sm text-blue-700 mt-1 space-y-1">
                        <li>• All certificates are issued by registered Indian doctors</li>
                        <li>• Digital certificates are delivered within 30-60 minutes*</li>
                        <li>• Certificates comply with NMC & WHO standards</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Continue Button */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => handleTabChange('personal')}
                    disabled={!selectedCertificate}
                    className={`px-6 py-3 rounded-lg transition ${selectedCertificate
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            ) : activeStep === 'personal' ? (
              <PersonalDetailsForm
                onContinue={() => handleTabChange('details')}
                onBack={() => handleTabChange('certificate')}
                selectedCertificate={selectedCertificate}
                certificates={certificates}
                formData={formData}
                setFormData={setFormData}
              />
            ) : (
              <CertificateDetailsForm 
                onBack={() => handleTabChange('personal')} 
                formData={formData} 
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                apiResponse={apiResponse}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SickLeavePage;