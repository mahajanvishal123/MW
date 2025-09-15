import React, { useState, useEffect, useRef } from 'react';
import BaseUrl from '../../../Utilities/BaseUrl';
const AssignCertificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [practitioners, setPractitioners] = useState({ doctor: [], pharmacist: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPractitioners, setSelectedPractitioners] = useState({});
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [viewCertificate, setViewCertificate] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const dropdownRefs = useRef({});
  
  // Fetch certificates and practitioners on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch certificates
        const certResponse = await fetch(`${BaseUrl}/patient`);
        if (!certResponse.ok) throw new Error('Failed to fetch certificates');
        const certData = await certResponse.json();
        setCertificates(certData);
        
        // Fetch practitioners
        const pracResponse = await fetch(`${BaseUrl}/auth/getUsersList`);
        if (!pracResponse.ok) throw new Error('Failed to fetch practitioners');
        const pracData = await pracResponse.json();
        setPractitioners(pracData);
        
        // Initialize selected practitioners state
        const initialSelections = {};
        certData.forEach(cert => {
          initialSelections[cert.id] = cert.practitioner_id || '';
        });
        setSelectedPractitioners(initialSelections);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdownId && dropdownRefs.current[openDropdownId] && 
          !dropdownRefs.current[openDropdownId].contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]);
  
  // Handle practitioner assignment
  const handleAssignPractitioner = async (certificateId) => {
    const practitionerId = selectedPractitioners[certificateId];
    if (!practitionerId) return;
    
    try {
      const response = await fetch(`${BaseUrl}/patient/assignpractitioner/${certificateId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ practitioner_id: practitionerId }),
      });
      
      if (!response.ok) throw new Error('Failed to assign practitioner');
      
      // Update the certificate in the local state
      setCertificates(prev => prev.map(cert => 
        cert.id === certificateId 
          ? { ...cert, practitioner_id: practitionerId, verify_certificate: 'Approve' } 
          : cert
      ));
      
      // Close the dropdown
      setOpenDropdownId(null);
      
    } catch (err) {
      setError(err.message);
    }
  };
  
  // Handle certificate deletion
  const handleDeleteCertificate = async (certificateId) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    
    try {
      const response = await fetch(`${BaseUrl}/patient/${certificateId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete certificate');
      
      // Remove the certificate from the local state
      setCertificates(prev => prev.filter(cert => cert.id !== certificateId));
      
    } catch (err) {
      setError(err.message);
    }
  };
  
  // Toggle dropdown visibility
  const toggleDropdown = (certificateId) => {
    // If already assigned, don't open dropdown
    const certificate = certificates.find(cert => cert.id === certificateId);
    if (certificate && certificate.practitioner_id) return;
    
    // Toggle the dropdown for this certificate
    setOpenDropdownId(openDropdownId === certificateId ? null : certificateId);
  };
  
  // Handle practitioner selection
  const handlePractitionerChange = (certificateId, practitionerId) => {
    setSelectedPractitioners(prev => ({ ...prev, [certificateId]: practitionerId }));
  };
  
  // Handle view certificate
  const handleViewCertificate = (certificate) => {
    setViewCertificate(certificate);
    setShowViewModal(true);
  };
  
  // Close view modal
  const closeViewModal = () => {
    setShowViewModal(false);
    setViewCertificate(null);
  };
  
  // Get practitioner name by ID
  const getPractitionerName = (practitionerId) => {
    if (!practitionerId) return '';
    
    // Check in doctors
    const doctor = practitioners.doctor.find(doc => doc.id === parseInt(practitionerId));
    if (doctor) return `Dr. ${doctor.first_name} ${doctor.last_name}`;
    
    // Check in pharmacists
    const pharmacist = practitioners.pharmacist.find(pharm => pharm.id === parseInt(practitionerId));
    if (pharmacist) return `${pharmacist.first_name} ${pharmacist.last_name}`;
    
    return '';
  };
  
  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-3xl mx-auto mt-10">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">
            <span className="font-medium">Error:</span> {error}
          </p>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Assign Certificates</h1>
        <div className="text-sm text-gray-500">
          {certificates.length} certificate{certificates.length !== 1 ? 's' : ''} found
        </div>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Responsive table container */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certificates.map((certificate) => (
                <tr key={certificate.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{certificate.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{certificate.certificate_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{certificate.full_name}</div>
                    <div className="text-sm text-gray-500">{certificate.mobile_No}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{certificate.email_address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{certificate.certificate_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      certificate.verify_certificate === 'Approve' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {certificate.verify_certificate}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {certificate.practitioner_id ? getPractitionerName(certificate.practitioner_id) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewCertificate(certificate)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center"
                        title="View Details"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span className="hidden sm:inline">View</span>
                      </button>
                      
                      {certificate.practitioner_id ? (
                        <span className="text-green-600 flex items-center" title="Already Assigned">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="hidden sm:inline">Assigned</span>
                        </span>
                      ) : (
                        <div className="relative" ref={el => dropdownRefs.current[certificate.id] = el}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(certificate.id);
                            }}
                            className="text-indigo-600 hover:text-indigo-900 flex items-center"
                            title="Assign Practitioner"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            <span className="hidden sm:inline">Assign</span>
                          </button>
                          
                          {openDropdownId === certificate.id && (
                            <div className="absolute right-0 z-50 mt-2 w-64 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                              <div className="px-4 py-2">
                                <select
                                  value={selectedPractitioners[certificate.id] || ''}
                                  onChange={(e) => handlePractitionerChange(certificate.id, e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                  <option value="">Select a practitioner</option>
                                  <optgroup label="Doctors">
                                    {practitioners.doctor.map((doc) => (
                                      <option key={doc.id} value={doc.id}>
                                        Dr. {doc.first_name} {doc.last_name}
                                      </option>
                                    ))}
                                  </optgroup>
                                  <optgroup label="Pharmacists">
                                    {practitioners.pharmacist.map((pharm) => (
                                      <option key={pharm.id} value={pharm.id}>
                                        {pharm.first_name} {pharm.last_name}
                                      </option>
                                    ))}
                                  </optgroup>
                                </select>
                              </div>
                              <div className="px-4 py-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAssignPractitioner(certificate.id);
                                  }}
                                  className="w-full bg-indigo-600 text-white py-1 px-3 rounded-md text-sm hover:bg-indigo-700 flex items-center justify-center"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  Assign
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <button
                        onClick={() => handleDeleteCertificate(certificate.id)}
                        className="text-red-600 hover:text-red-900 flex items-center"
                        title="Delete Certificate"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {certificates.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No certificates found</h3>
          <p className="mt-1 text-sm text-gray-500">There are no certificates to display.</p>
        </div>
      )}
      
      {/* View Certificate Modal */}
      {showViewModal && viewCertificate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center pb-3 border-b">
                <h3 className="text-2xl font-semibold text-gray-900">Certificate Details</h3>
                <button
                  onClick={closeViewModal}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                  <div className="space-y-3">
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Full Name:</span>
                      <span className="w-2/3 font-medium">{viewCertificate.full_name}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Email:</span>
                      <span className="w-2/3">{viewCertificate.email_address}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Birth Date:</span>
                      <span className="w-2/3">{new Date(viewCertificate.birth_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Guardian:</span>
                      <span className="w-2/3">{viewCertificate.guardian_name}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Mobile:</span>
                      <span className="w-2/3">{viewCertificate.mobile_No}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Address Information</h4>
                  <div className="space-y-3">
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Address:</span>
                      <span className="w-2/3">{viewCertificate.address}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">City:</span>
                      <span className="w-2/3">{viewCertificate.city}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">State:</span>
                      <span className="w-2/3">{viewCertificate.state}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Pincode:</span>
                      <span className="w-2/3">{viewCertificate.pincode}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Certificate Information</h4>
                  <div className="space-y-3">
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Certificate ID:</span>
                      <span className="w-2/3 font-medium">{viewCertificate.id}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Name:</span>
                      <span className="w-2/3">{viewCertificate.certificate_name}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Type:</span>
                      <span className="w-2/3">{viewCertificate.certificate_type}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Days:</span>
                      <span className="w-2/3">{viewCertificate.certificate_day}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Price:</span>
                      <span className="w-2/3">${viewCertificate.price}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Status:</span>
                      <span className={`w-2/3 ${
                        viewCertificate.verify_certificate === 'Approve' 
                          ? 'text-green-600 font-medium' 
                          : 'text-yellow-600 font-medium'
                      }`}>
                        {viewCertificate.verify_certificate}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h4>
                  <div className="space-y-3">
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Organization:</span>
                      <span className="w-2/3">{viewCertificate.organization_name}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Location:</span>
                      <span className="w-2/3">{viewCertificate.organization_location}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Reason:</span>
                      <span className="w-2/3">{viewCertificate.reason_for_leave}</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Height:</span>
                      <span className="w-2/3">{viewCertificate.height} cm</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Weight:</span>
                      <span className="w-2/3">{viewCertificate.weight} kg</span>
                    </div>
                    <div className="flex">
                      <span className="w-1/3 text-gray-500">Conditions:</span>
                      <span className="w-2/3">{viewCertificate.medical_conditions || 'None'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500">
                  <div>
                    Created: {new Date(viewCertificate.created_at).toLocaleString()}
                  </div>
                  <div>
                    Updated: {new Date(viewCertificate.updated_at).toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeViewModal}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default AssignCertificate;