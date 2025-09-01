
'use client';

import { Link } from 'react-router-dom';
import { useState } from 'react';
// import PractitionerSidebar from '../../../components/PractitionerSidebar';

export default function MyCertificates() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCertificateDetails, setShowCertificateDetails] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadingCertId, setDownloadingCertId] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvingCertId, setApprovingCertId] = useState('');
  const [approvalProgress, setApprovalProgress] = useState(0);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineCertId, setDeclineCertId] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [declineReasonType, setDeclineReasonType] = useState('dropdown'); // or 'text'
  const [approvalForm, setApprovalForm] = useState({
    startDate: '',
    endDate: '',
    duration: '',
    restrictions: '',
    followUpRequired: false,
    followUpDate: '',
    additionalNotes: '',
    urgentProcessing: false
  });
  const [exportForm, setExportForm] = useState({
    format: 'csv',
    dateRange: 'all',
    includeDeclined: true,
    includePatientInfo: true,
    includeMedicalDetails: false,
    includeTimestamps: true,
    columns: {
      certificateId: true,
      patientName: true,
      certificateType: true,
      duration: true,
      status: true,
      createdDate: true,
      amount: true,
      priority: false,
      medicalCondition: false,
      symptoms: false,
      treatment: false
    }
  });

  const handleApprove = async (certificateId) => {
    try {
      const certificate = certificates.find(cert => cert.id === certificateId);

      if (!certificate) {
        alert('Certificate not found');
        return;
      }

      if (certificate.status !== 'Pending') {
        alert('Only pending certificates can be approved');
        return;
      }

      // Set up the approval form with certificate data
      const startDate = new Date().toISOString().split('T')[0];
      const endDate = new Date(Date.now() + (certificate.duration === '1 day' ? 1 : certificate.duration === '2 days' ? 2 : certificate.duration === '3 days' ? 3 : certificate.duration === '5 days' ? 5 : 7) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      setApprovalForm({
        startDate,
        endDate,
        duration: certificate.duration,
        restrictions: certificate.restrictions || 'Rest as medically advised. Avoid strenuous activities.',
        followUpRequired: certificate.followUpRequired || false,
        followUpDate: certificate.followUpDate || '',
        additionalNotes: '',
        urgentProcessing: certificate.priority === 'Urgent'
      });

      setApprovingCertId(certificateId);
      setShowApprovalModal(true);
      setApprovalProgress(0);

    } catch (error) {
      console.error('Error initiating approval:', error);
      alert('Failed to start approval process. Please try again.');
    }
  };

  const handleApprovalConfirm = async () => {
    try {
      if (!approvalForm.startDate || !approvalForm.endDate) {
        alert('Please provide both start and end dates for the certificate.');
        return;
      }

      const certificate = certificates.find(cert => cert.id === approvingCertId);
      if (!certificate) {
        alert('Certificate not found');
        return;
      }

      setApprovalProgress(10);

      // Simulate approval process with progress updates
      const progressInterval = setInterval(() => {
        setApprovalProgress(prev => {
          if (prev >= 85) {
            clearInterval(progressInterval);
            return 85;
          }
          return prev + Math.random() * 20;
        });
      }, 300);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      setApprovalProgress(100);

      // Generate certificate details
      const approvedCertificate = {
        ...certificate,
        status: 'Approved',
        startDate: approvalForm.startDate,
        endDate: approvalForm.endDate,
        restrictions: approvalForm.restrictions,
        followUpRequired: approvalForm.followUpRequired,
        followUpDate: approvalForm.followUpDate,
        additionalNotes: approvalForm.additionalNotes,
        approvedDate: new Date().toLocaleString(),
        certificateNumber: `CERT-2024-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
        practitionerSignature: 'Electronically signed by Dr. Sarah Johnson',
        qrCode: `QR${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`
      };

      // Show success notification
      setTimeout(() => {
        setShowApprovalModal(false);
        setApprovingCertId('');
        setApprovalProgress(0);

        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-emerald-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 border border-emerald-500';
        notification.innerHTML = `
          <div class="flex items-center">
            <i class="ri-check-double-line mr-3 text-lg"></i>
            <div>
              <div class="font-semibold">Certificate Approved Successfully!</div>
              <div class="text-sm text-emerald-100">Certificate ${certificate.id} has been approved and issued</div>
              <div class="text-xs text-emerald-200 mt-1">Certificate Number: ${approvedCertificate.certificateNumber}</div>
            </div>
          </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 6000);

        // Auto-redirect to certificate details
        setTimeout(() => {
          setSelectedCertificate(approvedCertificate);
          setShowCertificateDetails(true);
        }, 2000);

      }, 1000);

      console.log('Certificate approved:', approvedCertificate);

    } catch (error) {
      console.error('Approval failed:', error);
      setShowApprovalModal(false);
      setApprovingCertId('');
      setApprovalProgress(0);

      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 border border-red-500';
      notification.innerHTML = `
        <div class="flex items-center">
          <i class="ri-error-warning-line mr-3 text-lg"></i>
          <div>
            <div class="font-semibold">Approval Failed</div>
            <div class="text-sm text-red-100">Unable to approve certificate. Please try again.</div>
          </div>
        </div>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 4000);
    }
  };

  const calculateEndDate = (startDate, duration) => {
    if (!startDate) return '';
    const start = new Date(startDate);
    const days = duration === '1 day' ? 1 : duration === '2 days' ? 2 : duration === '3 days' ? 3 : duration === '5 days' ? 5 : parseInt(duration) || 1;
    const end = new Date(start);
    end.setDate(end.getDate() + days - 1);
    return end.toISOString().split('T')[0];
  };

  const handleApprovalFormChange = (field, value) => {
    setApprovalForm(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'startDate' && updated.duration) {
        updated.endDate = calculateEndDate(value, updated.duration);
      }
      return updated;
    });
  };

  const handleDownloadPDF = async (certificateId) => {
    try {
      const certificate = certificates.find(cert => cert.id === certificateId);

      if (!certificate) {
        alert('Certificate not found');
        return;
      }

      if (certificate.status !== 'Approved') {
        alert('Only approved certificates can be downloaded');
        return;
      }

      setDownloadingCertId(certificateId);
      setShowDownloadModal(true);
      setDownloadProgress(0);

      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      await new Promise(resolve => setTimeout(resolve, 2000));

      setDownloadProgress(100);

      const certificateContent = generateCertificateContent(certificate);

      if (downloadFormat === 'pdf') {
        const pdfContent = `Medical Certificate - ${certificate.id}\n\nPatient: ${certificate.patient}\nPractitioner: ${certificate.issuedBy}\nCertificate Type: ${certificate.type}\nDuration: ${certificate.duration}\nStart Date: ${certificate.startDate}\nEnd Date: ${certificate.endDate}\n\nMedical Assessment:\nCondition: ${certificate.condition}\nDiagnosis: ${certificate.diagnosis}\nTreatment: ${certificate.treatment}\n\nCertificate Details:\nCertificate Number: ${certificate.certificateNumber}\nAHPRA Registration: ${certificate.ahpraNumber}\nQR Code: ${certificate.qrCode}\nIssue Date: ${certificate.created}\n\nThis is a legally binding medical certificate issued under AHPRA guidelines.\nDigital signature: ${certificate.practitionerSignature}\n\n--- End of Certificate ---`;
        downloadFile(pdfContent, `${certificate.id}_medical_certificate.pdf`, 'application/pdf');
      } else {
        downloadFile(certificateContent, `${certificate.id}_certificate.txt`, 'text/plain');
      }

      setTimeout(() => {
        setShowDownloadModal(false);
        setDownloadingCertId('');
        setDownloadProgress(0);

        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-emerald-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 border border-emerald-500';
        notification.innerHTML = `
          <div class="flex items-center">
            <i class="ri-check-double-line mr-3 text-lg"></i>
            <div>
              <div class="font-semibold">Certificate Downloaded Successfully!</div>
              <div class="text-sm text-emerald-100">Certificate ${certificate.id} has been downloaded as ${downloadFormat.toUpperCase()}</div>
            </div>
          </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 5000);
      }, 500);
    } catch (error) {
      console.error('Download failed:', error);
      setShowDownloadModal(false);
      setDownloadingCertId('');
      setDownloadProgress(0);

      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 border border-red-500';
      notification.innerHTML = `
        <div class="flex items-center">
          <i class="ri-error-warning-line mr-3 text-lg"></i>
          <div>
            <div class="font-semibold">Download Failed</div>
            <div class="text-sm text-red-100">Unable to download certificate. Please try again.</div>
          </div>
        </div>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 4000);
    }
  };

  const generateCertificateContent = (certificate) => {
    return `
MEDICAL CERTIFICATE
===================

Certificate ID: ${certificate.id}
Certificate Number: ${certificate.certificateNumber}
Issue Date: ${certificate.created}

PATIENT INFORMATION
-------------------
Name: ${certificate.patient}
Date of Birth: ${certificate.patientDOB}
Email: ${certificate.patientEmail}
Phone: ${certificate.patientPhone}
Address: ${certificate.patientAddress}
Emergency Contact: ${certificate.emergencyContact}

MEDICAL ASSESSMENT
------------------
Primary Condition: ${certificate.condition}
Presenting Symptoms: ${certificate.symptoms}
Clinical Diagnosis: ${certificate.diagnosis}
Vital Signs: ${certificate.vitalSigns}
Risk Factors: ${certificate.riskFactors}
Previous History: ${certificate.previousHistory}

TREATMENT & MANAGEMENT
----------------------
Treatment Plan: ${certificate.treatment}
Medication Prescribed: ${certificate.medicationPrescribed}
Work Restrictions: ${certificate.restrictions}
Follow-up Required: ${certificate.followUpRequired ? 'Yes - ' + certificate.followUpDate : 'No'}
  
CERTIFICATE DETAILS
-------------------
Certificate Type: ${certificate.type}
Start Date: ${certificate.startDate}
End Date: ${certificate.endDate}
Duration: ${certificate.duration}
Consultation Type: ${certificate.consultationType}

PRACTITIONER INFORMATION
------------------------
Issued By: ${certificate.issuedBy}
AHPRA Registration: ${certificate.ahpraNumber}
Digital Signature: ${certificate.practitionerSignature}
QR Verification Code: ${certificate.qrCode}

CONSULTATION NOTES
------------------
${certificate.consultationNotes}

LEGAL NOTICE
------------
This medical certificate has been issued in accordance with the Medical Board of Australia guidelines and AHPRA requirements. It is legally binding and digitally signed by a registered medical practitioner.

Certificate Status: ${certificate.status}
Amount Charged: ${certificate.amount}

For verification, scan the QR code: ${certificate.qrCode}

--- END OF CERTIFICATE ---
Generated: ${new Date().toLocaleString()}
    `.trim();
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const certificates = [
    {
      id: 'MC-2024-0234',
      patient: 'Sarah Wilson',
      patientEmail: 'sarah.wilson@email.com',
      patientPhone: '+61 412 345 678',
      patientDOB: '1985-03-15',
      patientAddress: '123 Collins Street, Melbourne VIC 3000',
      type: 'Sick Leave',
      duration: '2 days',
      status: 'Approved',
      created: '2024-01-15 14:30',
      startDate: '2024-01-16',
      endDate: '2024-01-17',
      amount: '$79.00',
      priority: 'Standard',
      condition: 'Upper Respiratory Infection',
      symptoms: 'Cough, fever, fatigue, sore throat. Patient reports symptoms started 2 days ago with gradual worsening.',
      diagnosis: 'Acute upper respiratory tract infection, likely viral in origin. No signs of bacterial complications.',
      treatment: 'Rest, fluids, paracetamol for fever and pain relief. Throat lozenges for comfort. Return if symptoms worsen.',
      restrictions: 'No heavy lifting or strenuous activity. Work from home if possible to prevent spread.',
      followUpRequired: true,
      followUpDate: '2024-01-20',
      medicationPrescribed: 'Paracetamol 500mg, 2 tablets every 6 hours as needed',
      consultationType: 'Video Consultation',
      consultationNotes: 'Patient appeared unwell but alert. Clear speech, no respiratory distress. Advised isolation until fever-free for 24 hours.',
      riskFactors: 'None identified',
      previousHistory: 'No recent similar episodes',
      vitalSigns: 'Temperature: 38.2°C, Pulse: 88 bpm, BP: 120/80 mmHg',
      certificateNumber: 'CERT-2024-15634',
      issuedBy: 'Dr. Sarah Johnson',
      ahpraNumber: 'MED0012345',
      practitionerSignature: 'Electronically signed',
      qrCode: 'QR123456789',
      emergencyContact: 'John Wilson (Husband) - +61 412 987 654'
    },
    {
      id: 'MC-2024-0235',
      patient: 'Michael Johnson',
      patientEmail: 'michael.johnson@email.com',
      patientPhone: '+61 423 456 789',
      patientDOB: '1978-11-22',
      patientAddress: '456 Chapel Street, South Yarra VIC 3141',
      type: "Carer's Leave",
      duration: '3 days',
      status: 'Pending',
      created: '2024-01-15 12:15',
      startDate: '2024-01-16',
      endDate: '2024-01-18',
      amount: '$79.00',
      priority: 'Urgent',
      condition: 'Family Care Required',
      symptoms: 'N/A - Patient required to provide care for elderly parent with acute medical condition requiring hospitalization.',
      diagnosis: "Certificate for carer's leave to provide essential family care during medical emergency.",
      treatment: 'N/A - This is a carer\'s certificate',
      restrictions: 'Must be available for family care responsibilities',
      followUpRequired: false,
      followUpDate: null,
      medicationPrescribed: 'None',
      consultationType: 'Phone Consultation',
      consultationNotes: 'Patient explained family situation. Elderly parent hospitalized with pneumonia requiring family support.',
      riskFactors: 'N/A',
      previousHistory: 'Previous carer\'s leave taken 6 months ago',
      vitalSigns: 'N/A - No medical examination required',
      certificateNumber: 'CERT-2024-15635',
      issuedBy: 'Dr. Sarah Johnson',
      ahpraNumber: 'MED0012345',
      practitionerSignature: 'Electronically signed',
      qrCode: 'QR123456788',
      emergencyContact: 'Lisa Johnson (Wife) - +61 423 111 222'
    },
    {
      id: 'MC-2024-0236',
      patient: 'Emma Davis',
      patientEmail: 'emma.davis@email.com',
      patientPhone: '+61 434 567 890',
      patientDOB: '1990-07-08',
      patientAddress: '789 Burke Road, Camberwell VIC 3124',
      type: 'Sick Leave',
      duration: '1 day',
      status: 'Approved',
      created: '2024-01-15 11:45',
      startDate: '2024-01-15',
      endDate: '2024-01-15',
      amount: '$79.00',
      priority: 'Standard',
      condition: 'Migraine',
      symptoms: 'Severe throbbing headache, nausea, photophobia, phonophobia. Episode started early morning, typical pattern for patient.',
      diagnosis: "Acute migraine attack, consistent with patient\'s established migraine pattern.",
      treatment: 'Rest in dark, quiet environment. Triptan medication as prescribed. Cold compress to head/neck.',
      restrictions: 'Avoid bright lights, loud noises, computer screens. No driving during acute episode.',
      followUpRequired: false,
      followUpDate: null,
      medicationPrescribed: 'Sumatriptan 50mg as needed for acute episodes',
      consultationType: 'Video Consultation',
      consultationNotes: 'Patient in obvious discomfort, squinting due to light sensitivity. Consistent with migraine presentation.',
      riskFactors: 'Family history of migraines, stress-related triggers',
      previousHistory: 'Established migraine sufferer, similar episodes monthly',
      vitalSigns: 'BP: 110/70 mmHg (self-reported normal range)',
      certificateNumber: 'CERT-2024-15636',
      issuedBy: 'Dr. Sarah Johnson',
      ahpraNumber: 'MED0012345',
      practitionerSignature: 'Electronically signed',
      qrCode: 'QR123456787',
      emergencyContact: 'David Davis (Partner) - +61 434 777 888'
    },
    {
      id: 'MC-2024-0237',
      patient: 'James Brown',
      patientEmail: 'james.brown@email.com',
      patientPhone: '+61 445 678 901',
      patientDOB: '1995-12-03',
      patientAddress: '321 High Street, Prahran VIC 3181',
      type: 'Student Leave',
      duration: '4 days',
      status: 'Declined',
      created: '2024-01-15 09:20',
      startDate: null,
      endDate: null,
      amount: '$79.00',
      priority: 'Standard',
      condition: 'Insufficient Medical Evidence',
      symptoms: 'General unwellness, fatigue - insufficient detail provided for assessment',
      diagnosis: 'Certificate declined - insufficient medical evidence to support leave request',
      treatment: 'Advised to provide more specific symptom information or seek face-to-face consultation',
      restrictions: 'N/A - Certificate not issued',
      followUpRequired: true,
      followUpDate: '2024-01-18',
      medicationPrescribed: 'None',
      consultationType: 'Text Consultation',
      consultationNotes: 'Insufficient information provided. Patient advised to book video consultation for proper assessment.',
      riskFactors: 'Unable to assess due to insufficient information',
      previousHistory: 'No previous consultations on record',
      vitalSigns: 'Not assessed',
      certificateNumber: 'N/A',
      issuedBy: 'Dr. Sarah Johnson',
      ahpraNumber: 'MED0012345',
      practitionerSignature: 'N/A',
      qrCode: 'N/A',
      emergencyContact: 'Susan Brown (Mother) - +61 445 222 333'
    },
    {
      id: 'MC-2024-0238',
      patient: 'Lisa Thompson',
      patientEmail: 'lisa.thompson@email.com',
      patientPhone: '+61 456 789 012',
      patientDOB: '1982-09-14',
      patientAddress: '654 Toorak Road, Toorak VIC 3142',
      type: 'Sick Leave',
      duration: '5 days',
      status: 'Approved',
      created: '2024-01-14 16:20',
      startDate: '2024-01-14',
      endDate: '2024-01-18',
      amount: '$79.00',
      priority: 'Standard',
      condition: 'Gastroenteritis',
      symptoms: 'Nausea, vomiting (x4 episodes), abdominal cramps, loose stools, mild fever. Symptoms began yesterday evening.',
      diagnosis: 'Acute gastroenteritis, likely infectious. No signs of dehydration at present.',
      treatment: 'Clear fluids, electrolyte replacement, BRAT diet when tolerated. Gradual return to normal diet.',
      restrictions: 'No food handling, avoid public contact until symptom-free for 24 hours',
      followUpRequired: false,
      followUpDate: null,
      medicationPrescribed: 'Oral rehydration solution, ondansetron 4mg if severe nausea',
      consultationType: 'Video Consultation',
      consultationNotes: 'Patient appears mildly unwell but hydrated. No severe abdominal pain or blood in stool reported.',
      riskFactors: 'Recent dining out - possible food-related',
      previousHistory: 'No recent similar episodes',
      vitalSigns: 'Temperature: 37.8°C, appears well-hydrated',
      certificateNumber: 'CERT-2024-15637',
      issuedBy: 'Dr. Sarah Johnson',
      ahpraNumber: 'MED0012345',
      practitionerSignature: 'Electronically signed',
      qrCode: 'QR123456785',
      emergencyContact: 'Mark Thompson (Husband) - +61 456 444 555'
    },
    {
      id: 'MC-2024-0239',
      patient: 'David Wilson',
      patientEmail: 'david.wilson@email.com',
      patientPhone: '+61 467 890 123',
      patientDOB: '1975-04-27',
      patientAddress: '987 St Kilda Road, Melbourne VIC 3004',
      type: 'Work Injury',
      duration: '7 days',
      status: 'Approved',
      created: '2024-01-14 14:10',
      startDate: '2024-01-14',
      endDate: '2024-01-20',
      amount: '$79.00',
      priority: 'Urgent',
      condition: 'Lower Back Strain',
      symptoms: 'Acute lower back pain, muscle spasms, limited mobility. Pain onset during heavy lifting at work yesterday.',
      diagnosis: 'Acute lumbar strain with muscle spasm. Work-related injury during manual handling.',
      treatment: 'Rest, ice/heat therapy, gentle stretching, physiotherapy referral. Graduated return to work program.',
      restrictions: 'No heavy lifting >5kg, no prolonged standing/sitting, modified duties required',
      followUpRequired: true,
      followUpDate: '2024-01-21',
      medicationPrescribed: 'Ibuprofen 400mg TDS, paracetamol 1g QID PRN',
      consultationType: 'Face-to-face Consultation',
      consultationNotes: 'Obvious discomfort with movement. Positive straight leg raise test. No neurological deficits.',
      riskFactors: 'Occupational - manual handling, previous back injury 2019',
      previousHistory: 'Similar episode 5 years ago, resolved with conservative management',
      vitalSigns: 'BP: 140/85 mmHg (elevated due to pain)',
      certificateNumber: 'CERT-2024-15638',
      issuedBy: 'Dr. Sarah Johnson',
      ahpraNumber: 'MED0012345',
      practitionerSignature: 'Electronically signed',
      qrCode: 'QR123456784',
      emergencyContact: 'Rachel Wilson (Wife) - +61 467 666 777'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Declined':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handleViewDetails = (certificateId) => {
    const certificate = certificates.find(cert => cert.id === certificateId);
    if (certificate) {
      setSelectedCertificate(certificate);
      setShowCertificateDetails(true);
    }
  };

  const handleExportCsv = async () => {
    try {
      console.log('Starting certificate export with options:', exportForm);

      let filteredData = certificates;

      if (!exportForm.includeDeclined) {
        filteredData = filteredData.filter(cert => cert.status !== 'Declined');
      }

      if (exportForm.dateRange !== 'all') {
        const now = new Date();
        let cutoffDate = new Date();

        switch (exportForm.dateRange) {
          case 'today':
            cutoffDate.setHours(0, 0, 0, 0);
            break;
          case 'week':
            cutoffDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            cutoffDate.setMonth(now.getMonth() - 1);
            break;
          case 'quarter':
            cutoffDate.setMonth(now.getMonth() - 3);
            break;
        }

        filteredData = filteredData.filter(cert => {
          const certDate = new Date(cert.created);
          return certDate >= cutoffDate;
        });
      }

      const headers = [];
      if (exportForm.columns.certificateId) headers.push('Certificate ID');
      if (exportForm.columns.patientName && exportForm.includePatientInfo) headers.push('Patient Name');
      if (exportForm.columns.certificateType) headers.push('Certificate Type');
      if (exportForm.columns.duration) headers.push('Duration');
      if (exportForm.columns.status) headers.push('Status');
      if (exportForm.columns.createdDate && exportForm.includeTimestamps) headers.push('Created Date');
      if (exportForm.columns.amount) headers.push('Amount');
      if (exportForm.columns.priority) headers.push('Priority');
      if (exportForm.columns.medicalCondition && exportForm.includeMedicalDetails) headers.push('Medical Condition');
      if (exportForm.columns.symptoms && exportForm.includeMedicalDetails) headers.push('Symptoms');
      if (exportForm.columns.treatment && exportForm.includeMedicalDetails) headers.push('Treatment');

      const csvRows = [headers.join(',')];

      filteredData.forEach(cert => {
        const row = [];
        if (exportForm.columns.certificateId) row.push(`"${cert.id}"`);
        if (exportForm.columns.patientName && exportForm.includePatientInfo) row.push(`"${cert.patient}"`);
        if (exportForm.columns.certificateType) row.push(`"${cert.type}"`);
        if (exportForm.columns.duration) row.push(`"${cert.duration}"`);
        if (exportForm.columns.status) row.push(`"${cert.status}"`);
        if (exportForm.columns.createdDate && exportForm.includeTimestamps) row.push(`"${cert.created}"`);
        if (exportForm.columns.amount) row.push(`"${cert.amount}"`);
        if (exportForm.columns.priority) row.push(`"${cert.priority}"`);
        if (exportForm.columns.medicalCondition && exportForm.includeMedicalDetails) row.push(`"${cert.condition}"`);
        if (exportForm.columns.symptoms && exportForm.includeMedicalDetails) row.push(`"${cert.symptoms}"`);
        if (exportForm.columns.treatment && exportForm.includeMedicalDetails) row.push(`"${cert.treatment}"`);

        csvRows.push(row.join(','));
      });

      const csvContent = csvRows.join('\\\\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      const filename = `practitioner-certificates-${new Date().toISOString().split('T')[0]}.${exportForm.format}`;
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setShowExportModal(false);

      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      notification.innerHTML = `
        <div class="flex items-center">
          <i class="ri-check-line mr-2"></i>
          <span>Export completed successfully! Downloaded: ${filename}</span>
        </div>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 4000);
    } catch (error) {
      console.error('Export failed:', error);

      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      notification.innerHTML = `
        <div class="flex items-center">
          <i class="ri-error-warning-line mr-2"></i>
          <span>Export failed. Please try again.</span>
        </div>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 4000);
    }
  };

  const getFilteredCertificates = () => {
    let filtered = certificates;

    if (searchTerm) {
      filtered = filtered.filter(cert =>
        cert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(cert => cert.status.toLowerCase() === statusFilter);
    }

    return filtered;
  };

  const getExportPreview = () => {
    let count = certificates.length;
    if (!exportForm.includeDeclined) {
      count = certificates.filter(c => c.status !== 'Declined').length;
    }
    return count;
  };

  return (
    <div className="p-5">
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="w-full">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

              {/* Title & Subtitle */}
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
                  My Certificates
                </h1>
                <p className="text-slate-600 mt-1 text-sm sm:text-base">
                  Manage and review all your certificate requests
                </p>
              </div>

              {/* Button Section */}
              <div className="flex items-center sm:justify-end">
                <button
                  onClick={() => setShowExportModal(true)}
                  className="w-full sm:w-auto bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap text-sm sm:text-base"
                >
                  <i className="ri-download-line mr-2"></i>
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 mt-5 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mr-4">
                  <i className="ri-check-line text-xl text-emerald-600"></i>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Approved</p>
                  <p className="text-2xl font-semibold text-emerald-600">124</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mr-4">
                  <i className="ri-time-line text-xl text-amber-600"></i>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Pending</p>
                  <p className="text-2xl font-semibold text-amber-600">12</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mr-4">
                  <i className="ri-close-line text-xl text-red-600"></i>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Declined</p>
                  <p className="text-2xl font-semibold text-red-600">8</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4">
                  <i className="ri-file-text-line text-xl text-blue-600"></i>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="text-2xl font-semibold text-blue-600">144</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    className="pl-10 w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm"
                    placeholder="Certificate ID, Patient..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm"
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
                  className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm"
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
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Certificate History</h2>
            </div>

            {/* Certificate List */}
            <div className="divide-y divide-slate-100">
              {getFilteredCertificates().map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 sm:p-6 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Left Section */}
                    <div className="flex items-start sm:items-center">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 shrink-0 ${cert.priority === "Urgent"
                          ? "bg-red-50 border border-red-200"
                          : "bg-blue-50 border border-blue-200"
                          }`}
                      >
                        <i
                          className={`text-lg ${cert.priority === "Urgent"
                            ? "ri-alarm-warning-line text-red-600"
                            : "ri-file-text-line text-blue-600"
                            }`}
                        ></i>
                      </div>

                      {/* Certificate Info */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-base font-medium text-slate-900">{cert.id}</h3>
                          <span
                            className={`px-2.5 py-1 text-xs font-medium rounded border ${getStatusColor(
                              cert.status
                            )}`}
                          >
                            {cert.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-1">
                          {cert.patient} • {cert.type}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                          <span>Duration: {cert.duration}</span>
                          <span>Created: {cert.created}</span>
                          <span>Amount: {cert.amount}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Section (Actions) */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 justify-end">
                      <button
                        onClick={() => handleViewDetails(cert.id)}
                        className="text-slate-600 hover:text-slate-700 cursor-pointer transition-colors"
                        title="View Details"
                      >
                        <i className="ri-eye-line text-lg"></i>
                      </button>

                      {cert.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(cert.id)}
                            className="px-3 sm:px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap text-sm"
                          >
                            <i className="ri-check-line mr-1.5"></i>
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              setDeclineCertId(cert.id);
                              setDeclineReason('');
                              setShowDeclineModal(true);
                            }}
                            className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap text-sm"
                          >
                            <i className="ri-close-line mr-1.5"></i>
                            Decline
                          </button>
                        </>
                      )}

                      {cert.status === "Approved" && (
                        <button
                          onClick={() => handleDownloadPDF(cert.id)}
                          className="text-blue-600 hover:text-blue-700 cursor-pointer transition-colors"
                          title="Download PDF"
                        >
                          <i className="ri-download-line text-lg"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {showDeclineModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">
                  <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-red-700">Decline Certificate</h2>
                      <button
                        onClick={() => setShowDeclineModal(false)}
                        className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer"
                      >
                        <i className="ri-close-line text-slate-600 text-xl"></i>
                      </button>
                    </div>
                    <div className="mb-4 text-sm text-slate-700">
                      Please select or enter a reason for declining certificate <span className="font-semibold">{declineCertId}</span>. The patient will be notified via email.
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Decline Reason</label>
                      <select
                        value={declineReason}
                        onChange={e => setDeclineReason(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-2"
                      >
                        <option value="">Select reason</option>
                        <option value="Incomplete patient info">Incomplete patient info</option>
                        <option value="Medical condition not verified">Medical condition not verified</option>
                        <option value="Duration not allowed">Duration not allowed</option>
                        <option value="Other">Other (specify below)</option>
                      </select>
                      {declineReason === 'Other' && (
                        <textarea
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                          rows={2}
                          placeholder="Enter reason..."
                          value={declineReasonType === 'text' ? declineReason : ''}
                          onChange={e => setDeclineReason(e.target.value)}
                        />
                      )}
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setShowDeclineModal(false)}
                        className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={!declineReason}
                        onClick={() => {
                          // TODO: Send auto-email to patient here
                          alert(`Certificate ${declineCertId} declined for reason: ${declineReason}`);
                          setShowDeclineModal(false);
                        }}
                        className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer ${!declineReason ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Submit Decline
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="bg-slate-50 px-4 sm:px-6 py-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-slate-700 text-center sm:text-left">
                  Showing 1 to {getFilteredCertificates().length} of 144 certificates
                </div>

                <div className="flex justify-center sm:justify-end flex-wrap gap-2">
                  <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 cursor-pointer transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-2 bg-slate-700 text-white rounded-lg text-sm cursor-pointer">
                    1
                  </button>
                  <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 cursor-pointer transition-colors">
                    2
                  </button>
                  <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 cursor-pointer transition-colors">
                    3
                  </button>
                  <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 cursor-pointer transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {showDownloadModal && downloadingCertId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <i className="ri-download-cloud-2-line text-white text-xl"></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Downloading Certificate</h2>
                  <p className="text-slate-600">{downloadingCertId}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Download Format</label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <input
                      type="radio"
                      name="downloadFormat"
                      value="pdf"
                      checked={downloadFormat === 'pdf'}
                      onChange={(e) => setDownloadFormat(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <i className="ri-file-pdf-line text-red-600 text-lg mr-3"></i>
                        <div>
                          <span className="text-sm font-medium text-slate-900">PDF Certificate</span>
                          <p className="text-xs text-slate-500">Official format with digital signature</p>
                        </div>
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <input
                      type="radio"
                      name="downloadFormat"
                      value="text"
                      checked={downloadFormat === 'text'}
                      onChange={(e) => setDownloadFormat(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <i className="ri-file-text-line text-blue-600 text-lg mr-3"></i>
                        <div>
                          <span className="text-sm font-medium text-slate-900">Text Format</span>
                          <p className="text-xs text-slate-500">Detailed text version with all information</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {downloadProgress < 30 ? 'Preparing certificate...' : downloadProgress < 70 ? 'Generating document...' : downloadProgress < 100 ? 'Finalizing download...' : 'Download complete!'}
                  </span>
                  <span className="text-sm text-slate-500">{Math.round(downloadProgress)}%</span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300 ease-out" style={{ width: `${downloadProgress}%` }}></div>
                </div>

                <div className="space-y-2">
                  <div className={`flex items-center text-sm ${downloadProgress >= 25 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${downloadProgress >= 25 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                      {downloadProgress >= 25 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                    </div>
                    <span>Validating certificate data</span>
                  </div>
                  <div className={`flex items-center text-sm ${downloadProgress >= 50 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${downloadProgress >= 50 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                      {downloadProgress >= 50 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                    </div>
                    <span>Applying digital signature</span>
                  </div>
                  <div className={`flex items-center text-sm ${downloadProgress >= 75 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${downloadProgress >= 75 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                      {downloadProgress >= 75 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                    </div>
                    <span>Formatting document</span>
                  </div>
                  <div className={`flex items-center text-sm ${downloadProgress >= 100 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${downloadProgress >= 100 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                      {downloadProgress >= 100 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                    </div>
                    <span>Download ready</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <i className="ri-file-check-line text-blue-600 mr-2"></i>
                  <h4 className="text-sm font-medium text-slate-900">Certificate Information</h4>
                </div>
                <div className="space-y-1 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Certificate ID:</span>
                    <span className="font-medium">{downloadingCertId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-medium">{downloadFormat.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>File Size:</span>
                    <span className="font-medium">~{downloadFormat === 'pdf' ? '2.1' : '0.8'} MB</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-shield-check-line text-amber-600"></i>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-amber-800">Security Notice</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      This certificate contains sensitive medical information. Store securely and handle according to privacy regulations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {downloadProgress < 100 && (
              <div className="p-6 border-t border-slate-200 flex justify-center">
                <div className="flex items-center text-sm text-slate-600">
                  <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
                  <span>Please wait while we prepare your certificate...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showCertificateDetails && selectedCertificate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-file-text-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Medical Certificate Details</h2>
                    <p className="text-slate-600">{selectedCertificate.id} • {selectedCertificate.patient}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCertificateDetails(false)}
                  className="w-10 h-10 bg-white hover:bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors border border-slate-200"
                >
                  <i className="ri-close-line text-slate-600 text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className={`mb-6 p-4 rounded-lg border-l-4 ${selectedCertificate.status === 'Approved' ? 'bg-emerald-50 border-emerald-500 border-l-emerald-500' : selectedCertificate.status === 'Pending' ? 'bg-amber-50 border-amber-500 border-l-amber-500' : 'bg-red-50 border-red-500 border-l-red-500'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${selectedCertificate.status === 'Approved' ? 'bg-emerald-100' : selectedCertificate.status === 'Pending' ? 'bg-amber-100' : 'bg-red-100'}`}>
                      <i className={`${selectedCertificate.status === 'Approved' ? 'ri-check-double-line text-emerald-600' : selectedCertificate.status === 'Pending' ? 'ri-time-line text-amber-600' : 'ri-close-line text-red-600'}`}></i>
                    </div>
                    <div>
                      <h3 className={`font-semibold ${selectedCertificate.status === 'Approved' ? 'text-emerald-800' : selectedCertificate.status === 'Pending' ? 'text-amber-800' : 'text-red-800'}`}>
                        Certificate {selectedCertificate.status}
                      </h3>
                      <p className={`${selectedCertificate.status === 'Approved' ? 'text-emerald-700' : selectedCertificate.status === 'Pending' ? 'text-amber-700' : 'text-red-700'}`}>
                        {selectedCertificate.status === 'Approved' && 'Certificate has been issued and is valid'}
                        {selectedCertificate.status === 'Pending' && 'Awaiting final review and approval'}
                        {selectedCertificate.status === 'Declined' && 'Certificate was not issued - see notes below'}
                      </p>
                    </div>
                  </div>
                  {selectedCertificate.priority === 'Urgent' && (
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded border border-red-200">
                      <i className="ri-alarm-warning-line mr-1"></i>
                      Urgent Priority
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-user-heart-line text-blue-600"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Patient Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Full Name</label>
                        <p className="text-slate-900 font-medium">{selectedCertificate.patient}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Date of Birth</label>
                        <p className="text-slate-900">{selectedCertificate.patientDOB}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Email Address</label>
                        <p className="text-slate-900">{selectedCertificate.patientEmail}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Phone Number</label>
                        <p className="text-slate-900">{selectedCertificate.patientPhone}</p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-500 mb-1">Address</label>
                        <p className="text-slate-900">{selectedCertificate.patientAddress}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Emergency Contact</label>
                        <p className="text-slate-900">{selectedCertificate.emergencyContact}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-stethoscope-line text-emerald-600"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Medical Assessment</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Primary Condition</label>
                        <p className="text-slate-900 font-medium">{selectedCertificate.condition}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Presenting Symptoms</label>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                          <p className="text-slate-900 leading-relaxed">{selectedCertificate.symptoms}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Clinical Diagnosis</label>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                          <p className="text-slate-900 leading-relaxed">{selectedCertificate.diagnosis}</p>
                        </div>
                      </div>

                      {selectedCertificate.vitalSigns !== 'N/A' && selectedCertificate.vitalSigns !== 'Not assessed' && (
                        <div>
                          <label className="block text-sm font-medium text-slate-500 mb-1">Vital Signs</label>
                          <p className="text-slate-900">{selectedCertificate.vitalSigns}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-500 mb-1">Risk Factors</label>
                          <p className="text-slate-900">{selectedCertificate.riskFactors}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-500 mb-1">Previous History</label>
                          <p className="text-slate-900">{selectedCertificate.previousHistory}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-medicine-bottle-line text-purple-600"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Treatment & Management</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Treatment Plan</label>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                          <p className="text-slate-900 leading-relaxed">{selectedCertificate.treatment}</p>
                        </div>
                      </div>

                      {selectedCertificate.medicationPrescribed !== 'None' && (
                        <div>
                          <label className="block text-sm font-medium text-slate-500 mb-1">Medication Prescribed</label>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-blue-900 font-medium">{selectedCertificate.medicationPrescribed}</p>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Work Restrictions</label>
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                          <p className="text-orange-900">{selectedCertificate.restrictions}</p>
                        </div>
                      </div>

                      {selectedCertificate.followUpRequired && (
                        <div>
                          <label className="block text-sm font-medium text-slate-500 mb-1">Follow-up Required</label>
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center">
                            <i className="ri-calendar-check-line text-yellow-600 mr-2"></i>
                            <p className="text-yellow-900 font-medium">
                              Yes - Recommended date: {selectedCertificate.followUpDate}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-file-text-line text-slate-600"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Consultation Notes</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Consultation Type</label>
                        <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded border border-blue-200">
                          {selectedCertificate.consultationType}
                        </span>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Clinical Notes</label>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                          <p className="text-slate-900 leading-relaxed">{selectedCertificate.consultationNotes}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <i className="ri-award-line text-white"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Certificate Summary</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-600 mb-1">Certificate ID</label>
                        <p className="text-blue-900 font-mono text-lg">{selectedCertificate.id}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-blue-600 mb-1">Certificate Type</label>
                        <p className="text-blue-900 font-medium">{selectedCertificate.type}</p>
                      </div>

                      {selectedCertificate.status === 'Approved' && (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-blue-600 mb-1">Start Date</label>
                              <p className="text-blue-900 font-medium">{selectedCertificate.startDate}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-blue-600 mb-1">End Date</label>
                              <p className="text-blue-900 font-medium">{selectedCertificate.endDate}</p>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Duration</label>
                            <p className="text-blue-900 font-medium text-lg">{selectedCertificate.duration}</p>
                          </div>
                        </>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-blue-600 mb-1">Amount Charged</label>
                        <p className="text-blue-900 font-bold text-xl">{selectedCertificate.amount}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-blue-600 mb-1">Created Date</label>
                        <p className="text-blue-900">{selectedCertificate.created}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-user-heart-line text-emerald-600"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Practitioner Details</h3>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Issued By</label>
                        <p className="text-slate-900 font-medium">{selectedCertificate.issuedBy}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">AHPRA Registration</label>
                        <p className="text-slate-900 font-mono">{selectedCertificate.ahpraNumber}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-1">Digital Signature</label>
                        <div className="flex items-center">
                          <i className="ri-shield-check-line text-emerald-600 mr-2"></i>
                          <p className="text-emerald-700 font-medium">{selectedCertificate.practitionerSignature}</p>
                        </div>
                      </div>

                      {selectedCertificate.certificateNumber !== 'N/A' && (
                        <div>
                          <label className="block text-sm font-medium text-slate-500 mb-1">Certificate Number</label>
                          <p className="text-slate-900 font-mono text-sm">{selectedCertificate.certificateNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedCertificate.status === 'Approved' && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-4">
                          <i className="ri-qr-code-line text-white"></i>
                        </div>
                        <h3 className="text-lg font-semibold text-emerald-900">Verification</h3>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-emerald-700 mb-1">QR Verification Code</label>
                          <p className="text-emerald-900 font-mono text-lg">{selectedCertificate.qrCode}</p>
                        </div>

                        <div className="bg-white border border-emerald-300 rounded-lg p-3">
                          <div className="flex items-start">
                            <i className="ri-information-line text-blue-600 mt-0.5 mr-3"></i>
                            <div className="text-sm">
                              <p className="text-emerald-800 font-medium mb-1">Certificate Verification</p>
                              <p className="text-emerald-700 mt-1">
                                This certificate can be verified using the QR code above.
                                Scan to confirm authenticity and validity.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>

                    <div className="space-y-3">
                      {selectedCertificate.status === 'Approved' && (
                        <>
                          <button
                            onClick={() => handleDownloadPDF(selectedCertificate.id)}
                            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <i className="ri-download-line mr-2"></i>
                            Download PDF Certificate
                          </button>

                          <button className="w-full flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap">
                            <i className="ri-mail-send-line mr-2"></i>
                            Email to Patient
                          </button>
                        </>
                      )}

                      {selectedCertificate.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(selectedCertificate.id)}
                            className="w-full flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap text-sm"
                          >
                            <i className="ri-check-double-line mr-2"></i>
                            Approve Certificate
                          </button>

                          <button onClick={() => {

                            setShowDeclineModal(true);
                          }}
                            className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap text-sm">
                            <i className="ri-close-line mr-2"></i>
                            Decline Certificate
                          </button>
                        </>
                      )}

                      {/* <button className="w-full flex items-center justify-center px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-edit-line mr-2"></i>
                        Edit Certificate
                      </button> */}

                      <button className="w-full flex items-center justify-center px-4 py-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-printer-line mr-2"></i>
                        Print Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-shield-check-line text-blue-600"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900 mb-2">Professional Compliance Notice</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-blue-800 mb-2">AHPRA Requirements:</h5>
                        <ul className="space-y-1 text-blue-700">
                          <li>• Certificate issued under AHPRA registration MED0012345</li>
                          <li>• Compliant with Medical Board of Australia guidelines</li>
                          <li>• Digital signature legally binding and verifiable</li>
                          <li>• Patient information handled according to Privacy Act 1988</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-800 mb-2">Medical Record Keeping:</h5>
                        <ul className="space-y-1 text-blue-700">
                          <li>• Complete consultation notes documented</li>
                          <li>• Clinical assessment recorded appropriately</li>
                          <li>• Certificate details stored securely for 7 years</li>
                          <li>• Audit trail maintained for verification purposes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                {/* Row 1 - Certificate Details */}
                <div className="flex flex-wrap items-center space-x-6">
                  <div className="text-sm text-slate-600">
                    Certificate ID:{" "}
                    <span className="font-medium text-slate-900">
                      {selectedCertificate.id}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">
                    Status:{" "}
                    <span
                      className={`font-medium ${selectedCertificate.status === "Approved"
                        ? "text-emerald-600"
                        : selectedCertificate.status === "Pending"
                          ? "text-amber-600"
                          : "text-red-600"
                        }`}
                    >
                      {selectedCertificate.status}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">
                    Created:{" "}
                    <span className="font-medium text-slate-900">
                      {selectedCertificate.created}
                    </span>
                  </div>
                </div>

                {/* Row 2 - Buttons */}
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={() => setShowCertificateDetails(false)}
                    className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Close
                  </button>
                  {selectedCertificate.status === "Approved" && (
                    <button
                      onClick={() => handleDownloadPDF(selectedCertificate.id)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap flex items-center"
                    >
                      <i className="ri-download-line mr-2"></i>
                      Download Certificate
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-download-cloud-2-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Export Certificate Data</h2>
                    <p className="text-slate-600">Export your certificate data for analysis and record-keeping</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="w-10 h-10 bg-white hover:bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors border border-slate-200"
                >
                  <i className="ri-close-line text-slate-600 text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Export Format</label>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {/* CSV Option */}
                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors ${exportForm.format === 'csv' ? 'border-slate-600 bg-slate-50' : 'border-slate-200'
                      }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value="csv"
                      checked={exportForm.format === 'csv'}
                      onChange={(e) => setExportForm(prev => ({ ...prev, format: e.target.value }))}
                      className="w-4 h-4 text-slate-600 mr-3"
                    />
                    <div className="text-center flex-1">
                      <i className="ri-file-text-line text-2xl text-blue-600 mb-2 block"></i>
                      <span className="text-sm font-medium text-slate-900">CSV</span>
                      <p className="text-xs text-slate-500">Spreadsheet format</p>
                    </div>
                  </label>

                  {/* Excel Option */}
                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors ${exportForm.format === 'excel' ? 'border-slate-600 bg-slate-50' : 'border-slate-200'
                      }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value="excel"
                      checked={exportForm.format === 'excel'}
                      onChange={(e) => setExportForm(prev => ({ ...prev, format: e.target.value }))}
                      className="w-4 h-4 text-slate-600 mr-3"
                    />
                    <div className="text-center flex-1">
                      <i className="ri-file-excel-line text-2xl text-emerald-600 mb-2 block"></i>
                      <span className="text-sm font-medium text-slate-900">Excel</span>
                      <p className="text-xs text-slate-500">Advanced formatting</p>
                    </div>
                  </label>

                  {/* PDF Option */}
                  <label
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors ${exportForm.format === 'pdf' ? 'border-slate-600 bg-slate-50' : 'border-slate-200'
                      }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value="pdf"
                      checked={exportForm.format === 'pdf'}
                      onChange={(e) => setExportForm(prev => ({ ...prev, format: e.target.value }))}
                      className="w-4 h-4 text-slate-600 mr-3"
                    />
                    <div className="text-center flex-1">
                      <i className="ri-file-pdf-line text-2xl text-red-600 mb-2 block"></i>
                      <span className="text-sm font-medium text-slate-900">PDF</span>
                      <p className="text-xs text-slate-500">Print-ready report</p>
                    </div>
                  </label>
                </div>
              </div>


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
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Data Privacy Settings</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportForm.includePatientInfo}
                      onChange={(e) => setExportForm(prev => ({ ...prev, includePatientInfo: e.target.checked }))}
                      className="w-4 h-4 text-slate-600 mt-1 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Patient Information</span>
                      <p className="text-xs text-slate-500">Names and contact details</p>
                    </div>
                  </label>

                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportForm.includeMedicalDetails}
                      onChange={(e) => setExportForm(prev => ({ ...prev, includeMedicalDetails: e.target.checked }))}
                      className="w-4 h-4 text-slate-600 mt-1 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Medical Details</span>
                      <p className="text-xs text-slate-500">Conditions, symptoms, treatment</p>
                    </div>
                  </label>

                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportForm.includeTimestamps}
                      onChange={(e) => setExportForm(prev => ({ ...prev, includeTimestamps: e.target.checked }))}
                      className="w-4 h-4 text-slate-600 mt-1 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Timestamps</span>
                      <p className="text-xs text-slate-500">Creation and modification dates</p>
                    </div>
                  </label>

                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportForm.includeDeclined}
                      onChange={(e) => setExportForm(prev => ({ ...prev, includeDeclined: e.target.checked }))}
                      className="w-4 h-4 text-slate-600 mt-1 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Declined Certificates</span>
                      <p className="text-xs text-slate-500">Include rejected applications</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Select Columns to Export</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-slate-600">Basic Information</h4>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportForm.columns.certificateId}
                        onChange={(e) => setExportForm(prev => ({ ...prev, columns: { ...prev.columns, certificateId: e.target.checked } }))}
                        className="w-4 h-4 text-slate-600 mr-3"
                      />
                      <span className="text-sm text-slate-700">Certificate ID</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportForm.columns.patientName}
                        disabled={!exportForm.includePatientInfo}
                        onChange={(e) => setExportForm(prev => ({ ...prev, columns: { ...prev.columns, patientName: e.target.checked } }))}
                        className="w-4 h-4 text-slate-600 mr-3"
                      />
                      <span className={`${!exportForm.includePatientInfo ? 'text-slate-400' : 'text-slate-700'}`}>Patient Name</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportForm.columns.certificateType}
                        onChange={(e) => setExportForm(prev => ({ ...prev, columns: { ...prev.columns, certificateType: e.target.checked } }))}
                        className="w-4 h-4 text-slate-600 mr-3"
                      />
                      <span className="text-sm text-slate-700">Certificate Type</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportForm.columns.duration}
                        onChange={(e) => setExportForm(prev => ({ ...prev, columns: { ...prev.columns, duration: e.target.checked } }))}
                        className="w-4 h-4 text-slate-600 mr-3"
                      />
                      <span className="text-sm text-slate-700">Duration</span>
                    </label>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-slate-600">Status & Dates</h4>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportForm.columns.status}
                        onChange={(e) => setExportForm(prev => ({ ...prev, columns: { ...prev.columns, status: e.target.checked } }))}
                        className="w-4 h-4 text-slate-600 mr-3"
                      />
                      <span className="text-sm text-slate-700">Status</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportForm.columns.createdDate}
                        disabled={!exportForm.includeTimestamps}
                        onChange={(e) => setExportForm(prev => ({ ...prev, columns: { ...prev.columns, createdDate: e.target.checked } }))}
                        className="w-4 h-4 text-slate-600 mr-3"
                      />
                      <span className={`${!exportForm.includeTimestamps ? 'text-slate-400' : 'text-slate-700'}`}>Created Date</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportForm.columns.amount}
                        onChange={(e) => setExportForm(prev => ({ ...prev, columns: { ...prev.columns, amount: e.target.checked } }))}
                        className="w-4 h-4 text-slate-600 mr-3"
                      />
                      <span className="text-sm text-slate-700">Amount</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportForm.columns.priority}
                        onChange={(e) => setExportForm(prev => ({ ...prev, columns: { ...prev.columns, priority: e.target.checked } }))}
                        className="w-4 h-4 text-slate-600 mr-3"
                      />
                      <span className="text-sm text-slate-700">Priority</span>
                    </label>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-slate-600">Medical Details</h4>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportForm.columns.medicalCondition}
                        disabled={!exportForm.includeMedicalDetails}
                        onChange={(e) => setExportForm(prev => ({ ...prev, columns: { ...prev.columns, medicalCondition: e.target.checked } }))}
                        className="w-4 h-4 text-slate-600 mr-3"
                      />
                      <span className={`${!exportForm.includeMedicalDetails ? 'text-slate-400' : 'text-slate-700'}`}>Medical Condition</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportForm.columns.symptoms}
                        disabled={!exportForm.includeMedicalDetails}
                        onChange={(e) => setExportForm(prev => ({ ...prev, columns: { ...prev.columns, symptoms: e.target.checked } }))}
                        className="w-4 h-4 text-slate-600 mr-3"
                      />
                      <span className={`${!exportForm.includeMedicalDetails ? 'text-slate-400' : 'text-slate-700'}`}>Symptoms</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportForm.columns.treatment}
                        disabled={!exportForm.includeMedicalDetails}
                        onChange={(e) => setExportForm(prev => ({ ...prev, columns: { ...prev.columns, treatment: e.target.checked } }))}
                        className="w-4 h-4 text-slate-600 mr-3"
                      />
                      <span className={`${!exportForm.includeMedicalDetails ? 'text-slate-400' : 'text-slate-700'}`}>Treatment</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="ri-information-line text-blue-600"></i>
                  </div>
                  <h4 className="text-sm font-medium text-slate-900">Export Preview</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Records to export:</span>
                    <span className="ml-2 font-medium text-slate-900">{getExportPreview()} certificates</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Format:</span>
                    <span className="ml-2 font-medium text-slate-900">{exportForm.format.toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Date range:</span>
                    <span className="ml-2 font-medium text-slate-900">{exportForm.dateRange === 'all' ? 'All time' : exportForm.dateRange}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-shield-check-line text-yellow-600"></i>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-yellow-800">Privacy & Security Notice</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      This export contains sensitive medical information. Ensure secure handling and compliance with AHPRA guidelines and privacy regulations. The exported data should be stored securely and access should be restricted to authorized personnel only.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex flex-col gap-4">
              {/* Row 1: Heading */}
              <div className="flex items-center space-x-4">
                <div className="text-sm text-slate-600">
                  <span className="font-medium text-slate-900">{getExportPreview()}</span> certificates ready for export
                </div>
                <div className="text-sm text-slate-600">
                  Format: <span className="font-medium">{exportForm.format.toUpperCase()}</span>
                </div>
              </div>

              {/* Row 2: Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExportCsv}
                  className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap flex items-center"
                >
                  <i className="ri-download-cloud-2-line mr-2"></i>
                  Export Data
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {showApprovalModal && approvingCertId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-green-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-check-double-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Approve Medical Certificate</h2>
                    <p className="text-slate-600">Certificate ID: {approvingCertId}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="w-10 h-10 bg-white hover:bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors border border-slate-200"
                >
                  <i className="ri-close-line text-slate-600 text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Patient Information Review */}
              {(() => {
                const certificate = certificates.find(cert => cert.id === approvingCertId);
                if (!certificate) return null;

                return (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-user-heart-line text-blue-600"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Patient Information Review</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-700 mb-1">Patient Name</label>
                        <p className="text-blue-900 font-medium">{certificate.patient}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-700 mb-1">Medical Condition</label>
                        <p className="text-blue-900">{certificate.condition}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-700 mb-1">Requested Duration</label>
                        <p className="text-blue-900 font-medium">{certificate.duration}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-700 mb-1">Priority Level</label>
                        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded ${certificate.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'}`}>
                          {certificate.priority}
                        </span>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-blue-700 mb-1">Symptoms Reported</label>
                        <div className="bg-white border border-blue-200 rounded-lg p-3">
                          <p className="text-blue-900 text-sm leading-relaxed">{certificate.symptoms}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Certificate Details Configuration */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="ri-calendar-check-line text-emerald-600"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Certificate Configuration</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={approvalForm.startDate}
                      onChange={(e) => handleApprovalFormChange('startDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Duration
                    </label>
                    <select
                      value={approvalForm.duration}
                      onChange={(e) => handleApprovalFormChange('duration', e.target.value)}
                      className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="1 day">1 day</option>
                      <option value="2 days">2 days</option>
                      <option value="3 days">3 days</option>
                      <option value="5 days">5 days</option>
                      <option value="7 days">1 week</option>
                      <option value="14 days">2 weeks</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={approvalForm.endDate}
                      onChange={(e) => handleApprovalFormChange('endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Work Restrictions */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="ri-shield-line text-orange-600"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Work Restrictions & Medical Advice</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Work Restrictions & Medical Instructions
                    </label>
                    <textarea
                      value={approvalForm.restrictions}
                      onChange={(e) => handleApprovalFormChange('restrictions', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      rows={4}
                      placeholder="Specify work limitations and medical recommendations..."
                      maxLength={500}
                    />
                    <p className="text-xs text-slate-500 mt-1">{approvalForm.restrictions.length}/500 characters</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="followUpRequired"
                        checked={approvalForm.followUpRequired}
                        onChange={(e) => handleApprovalFormChange('followUpRequired', e.target.checked)}
                        className="w-4 h-4 text-emerald-600 mr-3"
                      />
                      <label htmlFor="followUpRequired" className="text-sm text-slate-700 cursor-pointer font-medium">
                        Follow-up appointment recommended
                      </label>
                    </div>

                    {approvalForm.followUpRequired && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Recommended Follow-up Date
                        </label>
                        <input
                          type="date"
                          value={approvalForm.followUpDate}
                          onChange={(e) => handleApprovalFormChange('followUpDate', e.target.value)}
                          min={approvalForm.endDate || new Date().toISOString().split('T')[0]}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Additional Practitioner Notes
                    </label>
                    <textarea
                      value={approvalForm.additionalNotes}
                      onChange={(e) => handleApprovalFormChange('additionalNotes', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      rows={3}
                      placeholder="Any additional medical notes or recommendations..."
                      maxLength={500}
                    />
                    <p className="text-xs text-slate-500 mt-1">{approvalForm.additionalNotes.length}/500 characters</p>
                  </div>
                </div>
              </div>

              {/* Processing Options */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="ri-settings-3-line text-slate-600"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Processing Options</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="urgentProcessing"
                      checked={approvalForm.urgentProcessing}
                      onChange={(e) => handleApprovalFormChange('urgentProcessing', e.target.checked)}
                      className="w-4 h-4 text-emerald-600 mr-3"
                    />
                    <label htmlFor="urgentProcessing" className="text-sm text-slate-700 cursor-pointer font-medium">
                      Priority processing (immediate issuance)
                    </label>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <i className="ri-information-line text-blue-600 mt-0.5 mr-3"></i>
                      <div className="text-sm">
                        <p className="text-slate-800 font-medium mb-1">Certificate Issuance Information</p>
                        <ul className="text-slate-600 space-y-1">
                          <li>• Certificate will be digitally signed with AHPRA registration MED0012345</li>
                          <li>• Patient will receive email notification with secure download link</li>
                          <li>• QR code verification will be generated for authenticity</li>
                          <li>• All details will be logged for audit and compliance purposes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Approval Progress */}
              {approvalProgress > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      {approvalProgress < 25 ? 'Validating certificate data...' : approvalProgress < 50 ? 'Applying digital signature...' : approvalProgress < 75 ? 'Generating QR verification...' : approvalProgress < 100 ? 'Finalizing certificate...' : 'Certificate approved successfully!'}
                    </span>
                    <span className="text-sm text-slate-500">{Math.round(approvalProgress)}%</span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-300 ease-out" style={{ width: `${approvalProgress}%` }}></div>
                  </div>

                  <div className="space-y-2">
                    <div className={`flex items-center text-sm ${approvalProgress >= 25 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${approvalProgress >= 25 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {approvalProgress >= 25 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>Medical assessment validation</span>
                    </div>
                    <div className={`flex items-center text-sm ${approvalProgress >= 50 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${approvalProgress >= 50 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {approvalProgress >= 50 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>AHPRA digital signature application</span>
                    </div>
                    <div className={`flex items-center text-sm ${approvalProgress >= 75 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${approvalProgress >= 75 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {approvalProgress >= 75 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>QR verification code generation</span>
                    </div>
                    <div className={`flex items-center text-sm ${approvalProgress >= 100 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${approvalProgress >= 100 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {approvalProgress >= 100 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>Patient notification and certificate delivery</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Professional Compliance Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-shield-check-line text-blue-600"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900 mb-2">Professional Compliance Checklist</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-blue-800 mb-2">Medical Assessment:</h5>
                        <ul className="space-y-1 text-blue-700">
                          <li>✓ Patient symptoms reviewed and documented</li>
                          <li>✓ Medical condition properly diagnosed</li>
                          <li>✓ Certificate duration medically justified</li>
                          <li>✓ Work restrictions appropriately specified</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-800 mb-2">Legal Compliance:</h5>
                        <ul className="space-y-1 text-blue-700">
                          <li>✓ AHPRA registration verification completed</li>
                          <li>✓ Digital signature and authentication applied</li>
                          <li>✓ Patient privacy and confidentiality maintained</li>
                          <li>✓ Medical record keeping standards followed</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-between items-center">
              <div className="flex items-center text-sm text-slate-600">
                <i className="ri-shield-check-line mr-2 text-emerald-600"></i>
                Certificate will be legally binding and digitally verifiable
              </div>

              <div className="flex space-x-4">
                {approvalProgress === 0 && (
                  <>
                    <button
                      onClick={() => setShowApprovalModal(false)}
                      className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleApprovalConfirm}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap flex items-center"
                    >
                      <i className="ri-check-double-line mr-2"></i>
                      Approve & Issue Certificate
                    </button>
                  </>
                )}
                {approvalProgress > 0 && approvalProgress < 100 && (
                  <div className="flex items-center text-sm text-slate-600">
                    <div className="animate-spin w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full mr-2"></div>
                    <span>Processing approval...</span>
                  </div>
                )}
                {approvalProgress === 100 && (
                  <button
                    onClick={() => setShowApprovalModal(false)}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap flex items-center"
                  >
                    <i className="ri-check-line mr-2"></i>
                    Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
