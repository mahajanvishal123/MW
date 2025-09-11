import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const WhatsAppLogin = () => {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [country, setCountry] = useState('IN');
  const [isChecked, setIsChecked] = useState(false);

  // Prefill number if saved in localStorage
  useEffect(() => {
    const savedNumber = localStorage.getItem('whatsappNumber');
    if (savedNumber) {
      // Split country code and phone number
      const match = savedNumber.match(/^(\+\d+)(\d+)$/);
      if (match) {
        setCountryCode(match[1]);
        setPhoneNumber(match[2]);
      }
    }
  }, []);

  const countryOptions = [
    { code: 'IN', name: 'India', dialCode: '+91' },
    { code: 'US', name: 'United States', dialCode: '+1' },
    { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
    { code: 'CA', name: 'Canada', dialCode: '+1' },
    { code: 'AU', name: 'Australia', dialCode: '+61' },
    { code: 'DE', name: 'Germany', dialCode: '+49' },
    { code: 'FR', name: 'France', dialCode: '+33' },
    { code: 'BR', name: 'Brazil', dialCode: '+55' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) return;

    const fullNumber = `${countryCode}${phoneNumber}`;
    localStorage.setItem('whatsappNumber', fullNumber);
    console.log('Saved WhatsApp number:', fullNumber);

    navigate('/SickLeave'); // navigate to next page
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10" style={{ minHeight: '500px' }}>
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="bg-green-600 rounded-full p-3">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.49"/>
                </svg>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-center text-2xl font-bold text-gray-900 mb-2">
              Register / Sign In
            </h1>

            <p className="text-center text-gray-600 text-sm mb-6">
              Enter your WhatsApp number to continue
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Country Code</span>
                <span className="text-sm font-medium text-gray-700">WhatsApp Number</span>
              </div>

              <div className="flex space-x-2">
                <div className="w-2/5">
                  <select
                    value={`${country} ${countryCode}`}
                    onChange={(e) => {
                      const selectedOption = countryOptions.find(option => `${option.code} ${option.dialCode}` === e.target.value);
                      if (selectedOption) {
                        setCountry(selectedOption.code);
                        setCountryCode(selectedOption.dialCode);
                      }
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {countryOptions.map((option) => (
                      <option key={option.code} value={`${option.code} ${option.dialCode}`}>
                        {option.code} {option.dialCode}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-3/5">
                  <input
                    type="tel"
                    placeholder="e.g., 9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                    minLength="10"
                    maxLength="15"
                  />
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                You will receive a verification code via WhatsApp
              </p>

              <div>
                <button
                  type="submit"
                  disabled={!phoneNumber || phoneNumber.length < 10}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </form>

            <div className="mt-6 flex items-center">
              <input
                id="secure"
                name="secure"
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="secure" className="ml-2 block text-xs text-gray-700">
                Your information is secure & encrypted
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsAppLogin;
