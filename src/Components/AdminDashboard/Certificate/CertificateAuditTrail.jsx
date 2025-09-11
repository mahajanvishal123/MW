import { useState } from 'react';
import ViewCertificateModal from "./ViewCertificateModal";

export default function CertificateAuditTrail() {
  const [activeTab, setActiveTab] = useState('auditTrail');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [exportForm, setExportForm] = useState({
    format: 'csv',
    dateRange: 'all',
    includeDeclined: true,
    includePatientInfo: true,
    includePractitionerInfo: true,
    includeQrCodes: true
  });

  // State for assignment feature
  const [assignments, setAssignments] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [selectedPractitioner, setSelectedPractitioner] = useState('');

  const certificates = [
    {
      id: 'MC-2024-0156',
      patient: 'John Smith',
      practitioner: 'Dr. Sarah Johnson',
      type: 'Doctor Certificate',
      duration: '3 days',
      status: 'Approved',
      created: '2024-01-15 14:30',
      amount: '$79.00',
      qrCode: 'QR123456789'
    },
    {
      id: 'MC-2024-0155',
      patient: 'Alice Brown',
      practitioner: 'Emma Wilson',
      type: 'Pharmacist Certificate',
      duration: '2 days',
      status: 'Approved',
      created: '2024-01-15 12:15',
      amount: '$49.00',
      qrCode: 'QR123456788'
    },
    {
      id: 'MC-2024-0154',
      patient: 'Robert Davis',
      practitioner: 'Dr. Michael Chen',
      type: 'Doctor Certificate',
      duration: '5 days',
      status: 'Pending',
      created: '2024-01-15 11:45',
      amount: '$79.00',
      qrCode: 'QR123456787'
    },
    {
      id: 'MC-2024-0153',
      patient: 'Maria Garcia',
      practitioner: 'Dr. James Miller',
      type: 'Doctor Certificate',
      duration: '1 day',
      status: 'Declined',
      created: '2024-01-15 09:20',
      amount: '$79.00',
      qrCode: 'QR123456786'
    },
    {
      id: 'MC-2024-0152',
      patient: 'David Wilson',
      practitioner: 'Lisa Thompson',
      type: 'Pharmacist Certificate',
      duration: '3 days',
      status: 'Approved',
      created: '2024-01-14 16:30',
      amount: '$39.20',
      qrCode: 'QR123456785'
    }
  ];

  // Sample unassigned certificates with detailed information
  const unassignedCertificates = [
    {
      id: 'MC-2024-0160',
      patient: 'Emily Johnson',
      type: 'Sick Leave Certificate',
      duration: '2 days',
      created: '2024-01-16 10:30',
      amount: '$11.99',
      certificateType: 'Sick Leave Certificate',
      purpose: 'For workplace or educational absence',
      personalInfo: {
        fullName: 'Emily Johnson',
        email: 'emily.j@example.com',
        birthDate: '1990-05-15',
        guardianName: 'Robert Johnson',
        address: '123 Main Street, Apartment 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      },
      certificateDetails: {
        organizationName: 'Tech Solutions Inc.',
        organizationLocation: 'IN India',
        reasonForLeave: 'Flu with fever',
        height: '165 cm',
        weight: '62 kg',
        medicalConditions: 'Mild asthma'
      }
    },
    {
      id: 'MC-2024-0159',
      patient: 'Michael Brown',
      type: 'Carers Leave Certificate',
      duration: '1 day',
      created: '2024-01-16 09:15',
      amount: '$11.99',
      certificateType: 'Carers Leave Certificate',
      purpose: 'Government-recognized format',
      personalInfo: {
        fullName: 'Michael Brown',
        email: 'michael.b@example.com',
        birthDate: '1985-11-22',
        guardianName: 'James Brown',
        address: '456 Oak Avenue',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001'
      },
      certificateDetails: {
        organizationName: 'Global University',
        organizationLocation: 'IN India',
        reasonForLeave: 'Caring for sick family member',
        height: '178 cm',
        weight: '75 kg',
        medicalConditions: 'None'
      }
    },
    {
      id: 'MC-2024-0158',
      patient: 'Sarah Williams',
      type: 'Student Sick Leave Certificate',
      duration: '4 days',
      created: '2024-01-15 17:20',
      amount: '$11.99',
      certificateType: 'Student Sick Leave Certificate',
      purpose: 'For employment or education purposes',
      personalInfo: {
        fullName: 'Sarah Williams',
        email: 'sarah.w@example.com',
        birthDate: '1998-03-08',
        guardianName: 'Thomas Williams',
        address: '789 Pine Road',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001'
      },
      certificateDetails: {
        organizationName: 'City College',
        organizationLocation: 'IN India',
        reasonForLeave: 'Severe migraine',
        height: '160 cm',
        weight: '55 kg',
        medicalConditions: 'Migraine headaches'
      }
    },
    {
      id: 'MC-2024-0157',
      patient: 'Thomas Davis',
      type: 'Sick Leave Certificate',
      duration: '3 days',
      created: '2024-01-15 15:45',
      amount: '$11.99',
      certificateType: 'Sick Leave Certificate',
      purpose: 'For workplace or educational absence',
      personalInfo: {
        fullName: 'Thomas Davis',
        email: 'thomas.d@example.com',
        birthDate: '1992-07-30',
        guardianName: 'Richard Davis',
        address: '321 Elm Street',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600001'
      },
      certificateDetails: {
        organizationName: 'SalesCorp International',
        organizationLocation: 'Outside India',
        reasonForLeave: 'Back pain',
        height: '182 cm',
        weight: '80 kg',
        medicalConditions: 'Previous back injury'
      }
    }
  ];

  const practitioners = [
    { id: '1', name: 'Dr. Sarah Johnson', type: 'Doctor' },
    { id: '2', name: 'Emma Wilson', type: 'Pharmacist' },
    { id: '3', name: 'Dr. Michael Chen', type: 'Doctor' },
    { id: '4', name: 'Dr. James Miller', type: 'Doctor' },
    { id: '5', name: 'Lisa Thompson', type: 'Pharmacist' },
    { id: '6', name: 'Dr. Robert Taylor', type: 'Doctor' },
    { id: '7', name: 'Jennifer Lee', type: 'Pharmacist' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-100 text-emerald-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Declined': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const handleExportCsv = () => {
    try {
      console.log('Exporting certificates:', exportForm);
      let filteredData = certificates;
      if (!exportForm.includeDeclined) {
        filteredData = filteredData.filter(cert => cert.status !== 'Declined');
      }
      const headers = ['Certificate ID', 'Status', 'Created Date', 'Duration', 'Amount'];
      if (exportForm.includePatientInfo) headers.push('Patient Name');
      if (exportForm.includePractitionerInfo) headers.push('Practitioner', 'Certificate Type');
      if (exportForm.includeQrCodes) headers.push('QR Code');
      const csvContent = [
        headers.join(','),
        ...filteredData.map(cert => {
          const row = [cert.id, cert.status, cert.created, cert.duration, cert.amount];
          if (exportForm.includePatientInfo) row.push(`"${cert.patient}"`);
          if (exportForm.includePractitionerInfo) row.push(`"${cert.practitioner}"`, `"${cert.type}"`);
          if (exportForm.includeQrCodes) row.push(cert.qrCode);
          return row.join(',');
        })
      ].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificates-export-${new Date().toISOString().split('T')[0]}.${exportForm.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setShowExportModal(false);
      alert(`Certificate data exported successfully! File: certificates-export-${new Date().toISOString().split('T')[0]}.${exportForm.format}`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  // Function to handle certificate assignment
  const handleAssignCertificate = () => {
    if (!selectedCertificate || !selectedPractitioner) {
      alert('Please select both a certificate and a practitioner');
      return;
    }
    const practitioner = practitioners.find(p => p.id === selectedPractitioner);
    const cert = unassignedCertificates.find(c => c.id === selectedCertificate);

    const assignment = {
      certificateId: selectedCertificate,
      patientName: cert.patient,
      certificateType: cert.certificateType,
      practitionerId: selectedPractitioner,
      practitionerName: practitioner.name,
      assignedAt: new Date().toLocaleString(),
      status: 'Assigned'
    };

    setAssignments([...assignments, assignment]);
    setSelectedCertificate(null);
    setSelectedPractitioner('');

    alert(`Certificate ${selectedCertificate} assigned to ${practitioner.name} successfully!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Certificate Management</h1>
                <p className="text-sm sm:text-base text-slate-600 mt-1">Monitor, assign and search all certificate records</p>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="px-4 sm:px-6 pt-4">
          <div className="flex border-b border-slate-200">
            <button
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'auditTrail' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setActiveTab('auditTrail')}
            >
              <i className="ri-file-list-line mr-2"></i>
              Certificate Audit Trail
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${activeTab === 'assignRequests' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setActiveTab('assignRequests')}
            >
              <i className="ri-user-add-line mr-2"></i>
              Assign Requests to Practitioners
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'auditTrail' ? (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <i className="ri-check-line text-lg sm:text-xl text-emerald-600"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-slate-500">Approved</p>
                      <p className="text-xl sm:text-2xl font-bold text-emerald-600">1,184</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <i className="ri-time-line text-lg sm:text-xl text-yellow-600"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-slate-500">Pending</p>
                      <p className="text-xl sm:text-2xl font-bold text-yellow-600">23</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <i className="ri-close-line text-lg sm:text-xl text-red-600"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-slate-500">Declined</p>
                      <p className="text-xl sm:text-2xl font-bold text-red-600">40</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-file-text-line text-lg sm:text-xl text-blue-600"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-slate-500">Total</p>
                      <p className="text-xl sm:text-2xl font-bold text-blue-600">1,247</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="ri-search-line text-slate-400"></i>
                      </div>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Certificate ID, Patient, QR Code..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Doctor</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="all">All Doctor</option>
                      <option>Dr. Sarah Johnson</option>
                      <option>Emma Wilson	</option>
                      <option>Dr. Michael Chen	</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="declined">Declined</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => setShowExportModal(true)}
                      className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-download-line mr-2"></i>
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Certificate Table */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Certificate ID</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Practitioner</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Type</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:table-cell">Duration</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Created</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">Amount</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {certificates.map((cert) => (
                        <tr key={cert.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 sm:px-6 sm:py-4">
                            <div className="text-sm font-medium text-blue-600">{cert.id}</div>
                            <div className="text-xs text-slate-500">QR: {cert.qrCode}</div>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900">{cert.patient}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900 hidden sm:table-cell">{cert.practitioner}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 hidden md:table-cell">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${cert.type.includes('Doctor') ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                              }`}>
                              {cert.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900 hidden lg:table-cell">{cert.duration}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(cert.status)}`}>
                              {cert.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900 hidden sm:table-cell">{cert.created}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900 hidden md:table-cell">{cert.amount}</td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4">
                            <div className="flex space-x-2">
                              <button onClick={() => {
                                setSelectedCert(cert);
                                setShowViewModal(true);
                              }} className="text-blue-600 hover:text-blue-700 cursor-pointer" title="View Details">
                                <i className="ri-eye-line"></i>
                              </button>
                              <button className="text-emerald-600 hover:text-emerald-700 cursor-pointer" title="Verify QR">
                                <i className="ri-qr-code-line"></i>
                              </button>
                              <button className="text-slate-600 hover:text-slate-700 cursor-pointer" title="Download PDF">
                                <i className="ri-download-line"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:py-4 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-sm text-slate-700">
                      Showing 1 to 5 of 1,247 certificates
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 cursor-pointer">
                        Previous
                      </button>
                      <button className="px-3 py-2 bg-slate-700 text-white rounded-lg text-sm cursor-pointer">1</button>
                      <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 cursor-pointer">2</button>
                      <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 cursor-pointer">3</button>
                      <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 cursor-pointer">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Assignment Section */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
                  Assign Certificates to Practitioners
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        {[
                          "Certificate ID",
                          "Patient",
                          "Created",
                          "Duration",
                          "Amount",
                          "Purpose",
                          "Organization",
                          "Reason",
                          "Practitioner",
                          "Action",
                        ].map((header) => (
                          <th
                            key={header}
                            className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                      {unassignedCertificates.map((cert) => (
                        <tr key={cert.id} className="hover:bg-slate-50 transition">
                          <td className="px-5 py-3 text-sm font-medium text-slate-900 text-nowrap">
                            {cert.id}
                          </td>
                          <td className="px-5 py-3 text-sm text-slate-700 text-nowrap">{cert.patient}</td>
                          <td className="px-5 py-3 text-sm text-slate-700 text-nowrap">{cert.created}</td>
                          <td className="px-5 py-3 text-sm text-slate-700">{cert.duration}</td>
                          <td className="px-5 py-3 text-sm text-slate-700">{cert.amount}</td>
                          <td className="px-5 py-3 text-sm text-slate-700">{cert.purpose}</td>
                          <td className="px-5 py-3 text-sm text-slate-700">
                            {cert.certificateDetails.organizationName}
                          </td>
                          <td className="px-5 py-3 text-sm text-slate-700">
                            {cert.certificateDetails.reasonForLeave}
                          </td>

                          {/* Practitioner Dropdown */}
                          <td className="px-5 py-3 text-sm">
                            <select
                              onChange={(e) => handleSelectChange(cert.id, e.target.value)}
                              className=" px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                              <option value="">Select Practitioner</option>
                              <optgroup label="Doctors">
                                {practitioners
                                  .filter((p) => p.type === "Doctor")
                                  .map((p) => (
                                    <option key={p.id} value={p.id}>
                                      {p.name}
                                    </option>
                                  ))}
                              </optgroup>
                              <optgroup label="Pharmacists">
                                {practitioners
                                  .filter((p) => p.type === "Pharmacist")
                                  .map((p) => (
                                    <option key={p.id} value={p.id}>
                                      {p.name}
                                    </option>
                                  ))}
                              </optgroup>
                            </select>
                          </td>

                          {/* Action Button */}
                          <td className="px-5 py-3 text-sm">
                            <button
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
                            >
                              Assign
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>


              {/* Assignment History */}
              {/* <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-slate-200">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">Assignment History</h2>
                  <p className="text-sm text-slate-600 mt-1">Recent certificate assignments to practitioners</p>
                </div>

                {assignments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Certificate ID</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Certificate Type</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Practitioner</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assigned At</th>
                          <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {assignments.map((assignment, index) => (
                          <tr key={index} className="hover:bg-slate-50">
                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm font-medium text-slate-900">{assignment.certificateId}</td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900">{assignment.patientName}</td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900">{assignment.certificateType}</td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900">{assignment.practitionerName}</td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900">{assignment.assignedAt}</td>
                            <td className="px-4 py-3 sm:px-6 sm:py-4">
                              <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                                {assignment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 flex items-center justify-center bg-slate-100 rounded-full mb-4">
                      <i className="ri-inbox-line text-2xl text-slate-400"></i>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-1">No assignments yet</h3>
                    <p className="text-sm text-slate-500">Assign certificates to practitioners to see the history here.</p>
                  </div>
                )}
              </div> */}
            </>
          )}
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Export Certificate Data</h2>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                >
                  <i className="ri-close-line text-slate-600 text-lg sm:text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Export Format */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Export Format</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="radio"
                      name="format"
                      value="csv"
                      checked={exportForm.format === 'csv'}
                      onChange={(e) => setExportForm(prev => ({ ...prev, format: e.target.value }))}
                      className="w-4 h-4 text-slate-600 mr-3"
                    />
                    <div className="text-center">
                      <i className="ri-file-text-line text-2xl text-blue-600 mb-2 block"></i>
                      <span className="text-sm font-medium text-slate-900">CSV</span>
                      <p className="text-xs text-slate-500">Spreadsheet format</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="radio"
                      name="format"
                      value="excel"
                      checked={exportForm.format === 'excel'}
                      onChange={(e) => setExportForm(prev => ({ ...prev, format: e.target.value }))}
                      className="w-4 h-4 text-slate-600 mr-3"
                    />
                    <div className="text-center">
                      <i className="ri-file-excel-line text-2xl text-emerald-600 mb-2 block"></i>
                      <span className="text-sm font-medium text-slate-900">Excel</span>
                      <p className="text-xs text-slate-500">Advanced formatting</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="radio"
                      name="format"
                      value="pdf"
                      checked={exportForm.format === 'pdf'}
                      onChange={(e) => setExportForm(prev => ({ ...prev, format: e.target.value }))}
                      className="w-4 h-4 text-slate-600 mr-3"
                    />
                    <div className="text-center">
                      <i className="ri-file-pdf-line text-2xl text-red-600 mb-2 block"></i>
                      <span className="text-sm font-medium text-slate-900">PDF</span>
                      <p className="text-xs text-slate-500">Print-ready report</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
                <select
                  value={exportForm.dateRange}
                  onChange={(e) => setExportForm(prev => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {/* Data Options */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Include in Export</label>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportForm.includePatientInfo}
                      onChange={(e) => setExportForm(prev => ({ ...prev, includePatientInfo: e.target.checked }))}
                      className="w-4 h-4 text-slate-600 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Patient Information</span>
                      <p className="text-xs text-slate-500">Names and contact details</p>
                    </div>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportForm.includePractitionerInfo}
                      onChange={(e) => setExportForm(prev => ({ ...prev, includePractitionerInfo: e.target.checked }))}
                      className="w-4 h-4 text-slate-600 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Practitioner Details</span>
                      <p className="text-xs text-slate-500">Names and certificate types</p>
                    </div>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportForm.includeQrCodes}
                      onChange={(e) => setExportForm(prev => ({ ...prev, includeQrCodes: e.target.checked }))}
                      className="w-4 h-4 text-slate-600 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">QR Codes</span>
                      <p className="text-xs text-slate-500">Verification codes for certificates</p>
                    </div>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportForm.includeDeclined}
                      onChange={(e) => setExportForm(prev => ({ ...prev, includeDeclined: e.target.checked }))}
                      className="w-4 h-4 text-slate-600 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Declined Certificates</span>
                      <p className="text-xs text-slate-500">Include rejected applications</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Export Preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="ri-information-line text-blue-600"></i>
                  </div>
                  <h4 className="text-sm font-medium text-slate-900">Export Preview</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Records to export:</span>
                    <span className="ml-2 font-medium text-slate-900">
                      {exportForm.includeDeclined ? certificates.length : certificates.filter(c => c.status !== 'Declined').length} certificates
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Estimated file size:</span>
                    <span className="ml-2 font-medium text-slate-900">~{Math.ceil(certificates.length * 0.1)}KB</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-shield-check-line text-yellow-600"></i>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-yellow-800">Data Security Notice</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      This export contains sensitive medical information. Ensure secure handling and compliance with privacy regulations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleExportCsv}
                className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-download-cloud-2-line mr-2"></i>
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      <ViewCertificateModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        certificate={selectedCert}
      />
    </div>
  );
}