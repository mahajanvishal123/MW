import React, { useState, useEffect } from 'react';
// import './App.css';

function CertificateManagementModal() {
  // Sample data for certificates
  const [certificates, setCertificates] = useState([
    {
      id: 'MC-001',
      patient: 'John Doe',
      type: 'Medical Certificate',
      condition: 'Influenza with fever',
      duration: '5 days',
      status: 'Approved',
      created: '2023-10-15',
      priority: 'Normal',
      followUp: false,
      details: 'Patient presented with high fever, body aches, and respiratory symptoms. Recommended rest and hydration.'
    },
    {
      id: 'MC-002',
      patient: 'Jane Smith',
      type: 'Work Certificate',
      condition: 'Lower back pain',
      duration: '14 days',
      status: 'Pending Review',
      created: '2023-10-18',
      priority: 'Urgent',
      followUp: true,
      details: 'Patient has severe lower back pain from work-related injury. Requires physical therapy evaluation.'
    },
    {
      id: 'MC-003',
      patient: 'Robert Johnson',
      type: 'Fitness Certificate',
      condition: 'Recovered from surgery',
      duration: '30 days',
      status: 'Approved',
      created: '2023-10-20',
      priority: 'Normal',
      followUp: true,
      details: 'Patient has fully recovered from appendectomy and is cleared for physical activities.'
    }
  ]);

  const [filteredCertificates, setFilteredCertificates] = useState(certificates);
  const [modalAction, setModalAction] = useState({ open: false, type: '', cert: null });
  const [editForm, setEditForm] = useState({});
  const [followUpForm, setFollowUpForm] = useState({ date: '', time: '', notes: '' });
  const [certificateStats] = useState({ total: 3 });
  const [searchTerm, setSearchTerm] = useState('');

  // Filter certificates based on search term
  useEffect(() => {
    const filtered = certificates.filter(cert => 
      cert.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCertificates(filtered);
  }, [searchTerm, certificates]);

  // Initialize edit form when modal opens
  useEffect(() => {
    if (modalAction.type === 'edit' && modalAction.cert) {
      setEditForm(modalAction.cert);
    }
  }, [modalAction]);

  // Handle input changes for edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle input changes for follow-up form
  const handleFollowUpChange = (e) => {
    const { name, value } = e.target;
    setFollowUpForm(prev => ({ ...prev, [name]: value }));
  };

  // Save edited certificate
  const handleSaveEdit = () => {
    const updatedCertificates = certificates.map(cert => 
      cert.id === editForm.id ? editForm : cert
    );
    setCertificates(updatedCertificates);
    setModalAction({ open: false });
  };

  // Delete a certificate
  const handleDelete = () => {
    const updatedCertificates = certificates.filter(cert => cert.id !== modalAction.cert.id);
    setCertificates(updatedCertificates);
    setModalAction({ open: false });
  };

  // Schedule a follow-up
  const handleScheduleFollowUp = () => {
    alert(`Follow-up scheduled for ${followUpForm.date} at ${followUpForm.time}`);
    setModalAction({ open: false });
    setFollowUpForm({ date: '', time: '', notes: '' });
  };

  // Download PDF (simulated)
  const handleDownloadPDF = () => {
    alert(`Downloading PDF for ${modalAction.cert.id}`);
    setModalAction({ open: false });
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Medical Certificate Management</h1>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search certificates..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Status</option>
                <option>Approved</option>
                <option>Pending Review</option>
              </select>
              <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Types</option>
                <option>Medical Certificate</option>
                <option>Work Certificate</option>
                <option>Fitness Certificate</option>
              </select>
            </div>
          </div>
        </div>

        {/* Certificates Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Certificate ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Condition</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredCertificates.map(cert => (
                  <tr key={cert.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-blue-600">{cert.id}</div>
                      {cert.priority === 'Urgent' && (
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded mt-1">
                          Urgent
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900 font-medium">{cert.patient}</div>
                      {cert.followUp && (
                        <div className="text-xs text-orange-600 flex items-center mt-1">
                          <i className="ri-calendar-check-line mr-1"></i>
                          Follow-up required
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded ${cert.type === 'Medical Certificate'
                          ? 'bg-blue-100 text-blue-800'
                          : cert.type === 'Work Certificate'
                            ? 'bg-emerald-100 text-emerald-800'
                            : cert.type === 'Fitness Certificate'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                      >
                        {cert.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">{cert.condition}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{cert.duration}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded ${cert.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : cert.status === 'Pending Review'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-slate-100 text-slate-800'
                          }`}
                      >
                        {cert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">{cert.created}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-700 cursor-pointer"
                          title="View Details"
                          onClick={() => setModalAction({ open: true, type: 'view', cert })}
                        >
                          <i className="ri-eye-line"></i>
                        </button>
                        <button
                          className="text-emerald-600 hover:text-emerald-700 cursor-pointer"
                          title="Edit Certificate"
                          onClick={() => setModalAction({ open: true, type: 'edit', cert })}
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-700 cursor-pointer"
                          title="Delete Certificate"
                          onClick={() => setModalAction({ open: true, type: 'delete', cert })}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                        <button
                          className="text-slate-600 hover:text-slate-700 cursor-pointer"
                          title="Download PDF"
                          onClick={() => setModalAction({ open: true, type: 'download', cert })}
                        >
                          <i className="ri-download-line"></i>
                        </button>
                        {cert.followUp && (
                          <button
                            className="text-orange-600 hover:text-orange-700 cursor-pointer"
                            title="Schedule Follow-up"
                            onClick={() => setModalAction({ open: true, type: 'followup', cert })}
                          >
                            <i className="ri-calendar-event-line"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
            <div className="flex flex-col gap-3 items-center sm:items-start">
              <div className="text-sm text-slate-700">
                Showing 1 to {filteredCertificates.length} of {certificateStats.total} certificates
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 cursor-pointer">
                  Previous
                </button>
                <button className="px-3 py-2 bg-slate-700 text-white rounded-lg text-sm cursor-pointer">1</button>
                <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 cursor-pointer">
                  2
                </button>
                <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 cursor-pointer">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Modal for Actions */}
          {modalAction?.open && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900">
                    {modalAction.type === 'view' && 'Certificate Details'}
                    {modalAction.type === 'edit' && 'Edit Certificate'}
                    {modalAction.type === 'delete' && 'Delete Certificate'}
                    {modalAction.type === 'download' && 'Download PDF'}
                    {modalAction.type === 'followup' && 'Schedule Follow-up'}
                  </h2>
                  <button
                    onClick={() => setModalAction({ open: false })}
                    className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer"
                  >
                    <i className="ri-close-line text-slate-600 text-xl"></i>
                  </button>
                </div>
                
                {/* Modal Content */}
                <div>
                  {modalAction.type === 'view' && (
                    <div className="space-y-3">
                      <div className="flex">
                        <strong className="w-1/3 text-slate-700">ID:</strong>
                        <span className="w-2/3">{modalAction.cert.id}</span>
                      </div>
                      <div className="flex">
                        <strong className="w-1/3 text-slate-700">Patient:</strong>
                        <span className="w-2/3">{modalAction.cert.patient}</span>
                      </div>
                      <div className="flex">
                        <strong className="w-1/3 text-slate-700">Type:</strong>
                        <span className="w-2/3">{modalAction.cert.type}</span>
                      </div>
                      <div className="flex">
                        <strong className="w-1/3 text-slate-700">Condition:</strong>
                        <span className="w-2/3">{modalAction.cert.condition}</span>
                      </div>
                      <div className="flex">
                        <strong className="w-1/3 text-slate-700">Duration:</strong>
                        <span className="w-2/3">{modalAction.cert.duration}</span>
                      </div>
                      <div className="flex">
                        <strong className="w-1/3 text-slate-700">Status:</strong>
                        <span className="w-2/3">{modalAction.cert.status}</span>
                      </div>
                      <div className="flex">
                        <strong className="w-1/3 text-slate-700">Created:</strong>
                        <span className="w-2/3">{modalAction.cert.created}</span>
                      </div>
                      <div className="flex flex-col">
                        <strong className="text-slate-700 mb-1">Details:</strong>
                        <p className="text-slate-600 text-sm">{modalAction.cert.details}</p>
                      </div>
                    </div>
                  )}
                  
                  {modalAction.type === 'edit' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                        <input
                          type="text"
                          name="patient"
                          value={editForm.patient || ''}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Condition</label>
                        <input
                          type="text"
                          name="condition"
                          value={editForm.condition || ''}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                        <input
                          type="text"
                          name="duration"
                          value={editForm.duration || ''}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                        <select
                          name="status"
                          value={editForm.status || ''}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Approved">Approved</option>
                          <option value="Pending Review">Pending Review</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Details</label>
                        <textarea
                          name="details"
                          value={editForm.details || ''}
                          onChange={handleEditChange}
                          rows="3"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                  
                  {modalAction.type === 'delete' && (
                    <div>
                      <p className="text-slate-700 mb-4">
                        Are you sure you want to delete the certificate for <strong>{modalAction.cert.patient}</strong>? This action cannot be undone.
                      </p>
                    </div>
                  )}
                  
                  {modalAction.type === 'download' && (
                    <div>
                      <p className="text-slate-700 mb-4">
                        Download PDF certificate for <strong>{modalAction.cert.patient}</strong>?
                      </p>
                      <div className="flex items-center mb-2">
                        <input type="checkbox" id="includeWatermark" className="mr-2" />
                        <label htmlFor="includeWatermark" className="text-sm text-slate-700">Include official watermark</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="includeSignature" className="mr-2" defaultChecked />
                        <label htmlFor="includeSignature" className="text-sm text-slate-700">Include doctor's signature</label>
                      </div>
                    </div>
                  )}
                  
                  {modalAction.type === 'followup' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Follow-up Date</label>
                        <input
                          type="date"
                          name="date"
                          value={followUpForm.date}
                          onChange={handleFollowUpChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                        <input
                          type="time"
                          name="time"
                          value={followUpForm.time}
                          onChange={handleFollowUpChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                        <textarea
                          name="notes"
                          value={followUpForm.notes}
                          onChange={handleFollowUpChange}
                          rows="3"
                          placeholder="Additional notes for the follow-up appointment"
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  {modalAction.type === 'delete' && (
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  )}
                  
                  {(modalAction.type === 'edit' || modalAction.type === 'download' || modalAction.type === 'followup') && (
                    <button
                      onClick={
                        modalAction.type === 'edit' ? handleSaveEdit :
                        modalAction.type === 'download' ? handleDownloadPDF :
                        handleScheduleFollowUp
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      {modalAction.type === 'edit' ? 'Save Changes' :
                       modalAction.type === 'download' ? 'Download PDF' :
                       'Schedule Follow-up'}
                    </button>
                  )}
                  
                  <button
                    onClick={() => setModalAction({ open: false })}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {modalAction.type === 'delete' ? 'Cancel' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CertificateManagementModal;