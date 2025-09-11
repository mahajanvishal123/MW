import React, { useState } from 'react';

const AssignCertificate = () => {
  // Sample data
  const [unassignedCertificates, setUnassignedCertificates] = useState([
    {
      id: 'CERT-001',
      patient: 'John Doe',
      type: 'Doctor Certificate',
      created: '2023-10-15',
      amount: '$150',
      duration: '30 days',
      purpose: 'Medical leave',
      personalInfo: {
        fullName: 'John Doe',
        city: 'New York',
        state: 'NY'
      },
      certificateDetails: {
        organizationName: 'City Hospital',
        reasonForLeave: 'Surgery recovery'
      }
    },
    {
      id: 'CERT-002',
      patient: 'Jane Smith',
      type: 'Pharmacist Certificate',
      created: '2023-10-18',
      amount: '$85',
      duration: '14 days',
      purpose: 'Pharmacy consultation',
      personalInfo: {
        fullName: 'Jane Smith',
        city: 'Boston',
        state: 'MA'
      },
      certificateDetails: {
        organizationName: 'Community Pharmacy',
        reasonForLeave: 'Medication review'
      }
    },
    {
      id: 'CERT-003',
      patient: 'Robert Johnson',
      type: 'Doctor Certificate',
      created: '2023-10-20',
      amount: '$200',
      duration: '45 days',
      purpose: 'Extended medical treatment',
      personalInfo: {
        fullName: 'Robert Johnson',
        city: 'Chicago',
        state: 'IL'
      },
      certificateDetails: {
        organizationName: 'General Hospital',
        reasonForLeave: 'Physical therapy'
      }
    }
  ]);

  const [practitioners] = useState([
    { id: 'doc-1', name: 'Dr. Sarah Johnson', type: 'Doctor' },
    { id: 'doc-2', name: 'Dr. Michael Chen', type: 'Doctor' },
    { id: 'doc-3', name: 'Dr. Emily Williams', type: 'Doctor' },
    { id: 'pharm-1', name: 'Pharmacist Amy Wong', type: 'Pharmacist' },
    { id: 'pharm-2', name: 'Pharmacist David Miller', type: 'Pharmacist' },
    { id: 'pharm-3', name: 'Pharmacist Jessica Brown', type: 'Pharmacist' }
  ]);

  const [assignments, setAssignments] = useState({});

  const handleSelectChange = (certId, practitionerId) => {
    setAssignments({
      ...assignments,
      [certId]: practitionerId
    });
  };

  const handleAssign = (certId) => {
    if (assignments[certId]) {
      const practitioner = practitioners.find(p => p.id === assignments[certId]);
      alert(`Certificate ${certId} assigned to ${practitioner.name}`);

      // Remove the assigned certificate
      setUnassignedCertificates(unassignedCertificates.filter(cert => cert.id !== certId));

      // Remove the assignment record
      const newAssignments = { ...assignments };
      delete newAssignments[certId];
      setAssignments(newAssignments);
    } else {
      alert('Please select a practitioner first');
    }
  };

  return (
    <div>


      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
          Assign Certificates to Practitioners
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Certificate ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Purpose
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[200px]">
                  Practitioner
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {unassignedCertificates.map(cert => (
                <tr key={cert.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900 whitespace-nowrap">{cert.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{cert.patient}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{cert.created}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{cert.duration}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{cert.amount}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{cert.purpose}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{cert.certificateDetails.organizationName}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{cert.certificateDetails.reasonForLeave}</td>

                  {/* Practitioner Select Dropdown */}
                  <td className="px-4 py-3 text-sm">
                    <select
                      value={assignments[cert.id] || ''}
                      onChange={(e) => handleSelectChange(cert.id, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                      <option value="">Select Practitioner</option>
                      <optgroup label="Doctors">
                        {practitioners.filter(p => p.type === "Doctor").map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Pharmacists">
                        {practitioners.filter(p => p.type === "Pharmacist").map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </optgroup>
                    </select>
                  </td>

                  {/* Action Button */}
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <button
                      onClick={() => handleAssign(cert.id)}
                      disabled={!assignments[cert.id]}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed w-full"
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {unassignedCertificates.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              All certificates have been assigned.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignCertificate;