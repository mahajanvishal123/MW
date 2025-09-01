import { Link } from 'react-router-dom';
import { useState } from 'react';
import CertificateManagementModal from './CertificateManagementModal';

// import { usePathname } from 'next/navigation';

export default function Dasbord() {
  const [modalAction, setModalAction] = useState({ open: false });
  const [quickApproveModal, setQuickApproveModal] = useState({ open: false, cert: null });
  const [declineReason, setDeclineReason] = useState('');
  const [declineReasonType, setDeclineReasonType] = useState(''); // dropdown or textbox

  const [statsState, setStatsState] = useState({
    totalCertificates: 127,
    pendingRequests: 8,
    monthlyEarnings: 2450,
    patientRating: 4.9,
    todayAppointments: 12,
    approvalRate: 98.5
  });

  const [showQuickApproval, setShowQuickApproval] = useState(false);
  const [showNewCertificate, setShowNewCertificate] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPatientReviews, setShowPatientReviews] = useState(false);
  const [showCertificateOverview, setShowCertificateOverview] = useState(false);
  const [showGrowthAnalytics, setShowGrowthAnalytics] = useState(false);

  const [patientReviews] = useState([
    {
      id: 1,
      patient: 'Sarah M.',
      rating: 5,
      date: '2024-01-15',
      review: 'Dr. Johnson was very thorough and professional. The certificate process was quick and efficient. Highly recommended!',
      certificateType: 'Medical Certificate',
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      patient: 'Michael T.',
      rating: 5,
      date: '2024-01-14',
      review: 'Excellent service! Dr. Johnson explained everything clearly and the online consultation was very convenient.',
      certificateType: 'Work Certificate',
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      patient: 'Emma L.',
      rating: 4,
      date: '2024-01-13',
      review: 'Very professional and understanding. The certificate was issued promptly. Thank you for the great service.',
      certificateType: 'Medical Certificate',
      helpful: 6,
      verified: true
    },
    {
      id: 4,
      patient: 'James R.',
      rating: 5,
      date: '2024-01-12',
      review: 'Outstanding practitioner! Dr. Johnson was very empathetic and provided excellent care. The process was seamless.',
      certificateType: 'Medical Certificate',
      helpful: 15,
      verified: true
    },
    {
      id: 5,
      patient: 'Lisa K.',
      rating: 5,
      date: '2024-01-11',
      review: 'Amazing experience! Quick response time and very professional approach. Would definitely recommend to others.',
      certificateType: 'Fitness Certificate',
      helpful: 9,
      verified: true
    },
    {
      id: 6,
      patient: 'David W.',
      rating: 4,
      date: '2024-01-10',
      review: 'Good service overall. Dr. Johnson was thorough in the assessment and the certificate was processed quickly.',
      certificateType: 'Medical Certificate',
      helpful: 4,
      verified: true
    }
  ]);

  const [reviewsFilter, setReviewsFilter] = useState('all');
  const [certificatesFilter, setCertificatesFilter] = useState('all');

  const [newCertificateForm, setNewCertificateForm] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    patientDOB: '',
    condition: '',
    symptoms: '',
    diagnosis: '',
    startDate: '',
    endDate: '',
    duration: '',
    restrictions: '',
    followUpRequired: false,
    medicationPrescribed: '',
    additionalNotes: '',
    certificateType: 'medical-certificate',
    urgency: 'normal'
  });

  const [recentRequests, setRecentRequests] = useState([
    {
      id: 'MC-2024-0156',
      patient: 'John Smith',
      condition: 'Common Cold',
      duration: '3 days',
      status: 'Pending',
      submitted: '2 hours ago',
      urgent: false
    },
    {
      id: 'MC-2024-0157',
      patient: 'Sarah Johnson',
      condition: 'Migraine',
      duration: '1 day',
      status: 'Pending',
      submitted: '4 hours ago',
      urgent: true
    },
    {
      id: 'MC-2024-0158',
      patient: 'Mike Brown',
      condition: 'Back Strain',
      duration: '5 days',
      status: 'Approved',
      submitted: '1 day ago',
      urgent: false
    }
  ]);

  const [notifications] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'New Certificate Request',
      message: 'Patient Sarah Wilson submitted urgent certificate request',
      time: '5 minutes ago',
      read: false,
      action: 'Review Request',
      actionLink: '/admin/practitioner-certificates'
    },
    {
      id: 2,
      type: 'success',
      title: 'Certificate Approved',
      message: 'MC-2024-0234 has been successfully processed',
      time: '2 hours ago',
      read: false,
      action: 'View Certificate',
      actionLink: '/admin/practitioner-certificates'
    },
    {
      id: 3,
      type: 'info',
      title: 'Schedule Update',
      message: 'Your availability for tomorrow has been confirmed',
      time: '4 hours ago',
      read: true,
      action: 'View Schedule',
      actionLink: '/admin/practitioner-schedule'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Payment Processed',
      message: 'Monthly earnings of $2,450 have been processed',
      time: '1 day ago',
      read: true,
      action: 'View Earnings',
      actionLink: '/admin/practitioner-earnings'
    },
    {
      id: 5,
      type: 'info',
      title: 'Profile Updated',
      message: 'Your practitioner profile information has been updated',
      time: '2 days ago',
      read: true,
      action: null,
      actionLink: null
    }
  ]);

  const [certificateData] = useState([
    {
      id: 'MC-2024-0156',
      patient: 'John Smith',
      type: 'Medical Certificate',
      condition: 'Upper Respiratory Infection',
      duration: '3 days',
      status: 'Approved',
      created: '2024-01-15 14:30',
      amount: '$79.00',
      priority: 'Normal',
      followUp: false
    },
    {
      id: 'MC-2024-0155',
      patient: 'Sarah Wilson',
      type: 'Work Certificate',
      condition: 'Migraine',
      duration: '1 day',
      status: 'Approved',
      created: '2024-01-15 12:15',
      amount: '$79.00',
      priority: 'Urgent',
      followUp: true
    },
    {
      id: 'MC-2024-0154',
      patient: 'Michael Brown',
      type: 'Medical Certificate',
      condition: 'Back Strain',
      duration: '5 days',
      status: 'Pending Review',
      created: '2024-01-15 11:45',
      amount: '$79.00',
      priority: 'Normal',
      followUp: false
    },
    {
      id: 'MC-2024-0153',
      patient: 'Emma Davis',
      type: 'Fitness Certificate',
      condition: 'Post-Surgery Recovery',
      duration: '14 days',
      status: 'Approved',
      created: '2024-01-14 16:20',
      amount: '$79.00',
      priority: 'Normal',
      followUp: true
    },
    {
      id: 'MC-2024-0152',
      patient: 'Robert Taylor',
      type: 'Medical Certificate',
      condition: 'Anxiety Management',
      duration: '2 days',
      status: 'Approved',
      created: '2024-01-14 14:10',
      amount: '$79.00',
      priority: 'Normal',
      followUp: false
    },
    {
      id: 'MC-2024-0151',
      patient: 'Lisa Anderson',
      type: 'Work Certificate',
      condition: 'Gastroenteritis',
      duration: '4 days',
      status: 'Approved',
      created: '2024-01-13 09:30',
      amount: '$79.00',
      priority: 'Normal',
      followUp: false
    },
    {
      id: 'MC-2024-0150',
      patient: 'David Wilson',
      type: 'Medical Certificate',
      condition: 'Minor Injury',
      duration: '7 days',
      status: 'Approved',
      created: '2024-01-12 15:45',
      amount: '$79.00',
      priority: 'Normal',
      followUp: true
    },
    {
      id: 'MC-2024-0149',
      patient: 'Jennifer Clark',
      type: 'Return to Work',
      condition: 'Recovery Assessment',
      duration: '1 day',
      status: 'Approved',
      created: '2024-01-11 11:20',
      amount: '$79.00',
      priority: 'Normal',
      followUp: false
    }
  ]);

  const handleQuickApproval = () => setShowQuickApproval(true);
  const handleNewCertificate = () => setShowNewCertificate(true);

  const handleTotalCertificatesClick = () => {
    setShowCertificateOverview(true);
  };

  const handleGrowthRateClick = () => {
    setShowGrowthAnalytics(true);
  };

  const calculateEndDate = (startDate, duration) => {
    if (!startDate || !duration) return '';
    const start = new Date(startDate);
    const days = parseInt(duration);
    if (isNaN(days)) return '';
    const end = new Date(start);
    end.setDate(end.getDate() + days - 1);
    return end.toISOString().split('T')[0];
  };

  const handleFormChange = (field, value) => {
    setNewCertificateForm(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'startDate' || field === 'duration') {
        const endDate = calculateEndDate(
          field === 'startDate' ? value : updated.startDate,
          field === 'duration' ? value : updated.duration
        );
        updated.endDate = endDate;
      }
      return updated;
    });
  };

  const handleApproveRequest = (requestId) => {
    try {
      console.log('Approving request:', requestId);
      setRecentRequests(prev =>
        prev.map(req => (req.id === requestId ? { ...req, status: 'Approved' } : req))
      );

      setStatsState(prev => ({
        ...prev,
        pendingRequests: Math.max(0, prev.pendingRequests - 1),
        totalCertificates: prev.totalCertificates + 1
      }));

      alert(`Certificate ${requestId} has been approved successfully!`);
      if (showQuickApproval) setShowQuickApproval(false);
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Failed to approve the request. Please try again.');
    }
  };

  const handleReviewRequest = (requestId) => {
    try {
      const request = recentRequests.find(r => r.id === requestId);
      if (!request) {
        alert('Request not found. Please refresh and try again.');
        return;
      }
      const proceed = confirm(
        `Review Certificate Request: ${requestId}\n\n` +
        `Patient: ${request.patient}\n` +
        `Condition: ${request.condition}\n` +
        `Duration: ${request.duration}\n\n` +
        `OK → approve now\nCancel → see full details`
      );
      if (proceed) {
        handleApproveRequest(requestId);
      } else {
        window.location.href = `/admin/practitioner-certificates?highlight=${requestId}`;
      }
    } catch (error) {
      console.error('Error reviewing request:', error);
      alert('Failed to open review. Please try again.');
    }
  };

  const handleCreateCertificate = async () => {
    try {
      if (!newCertificateForm.patientName || !newCertificateForm.condition || !newCertificateForm.startDate) {
        alert('Please fill in all required fields: Patient Name, Condition, and Start Date.');
        return;
      }

      // Simulated async operation
      await new Promise(res => setTimeout(res, 1500));

      const certificateId = `MC-${new Date().getFullYear()}-${Math.floor(
        Math.random() * 10000
      )
        .toString()
        .padStart(4, '0')}`;

      alert(
        `Medical Certificate ${certificateId} has been created successfully! Patient will receive email notification.`
      );

      setNewCertificateForm({
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        patientDOB: '',
        condition: '',
        symptoms: '',
        diagnosis: '',
        startDate: '',
        endDate: '',
        duration: '',
        restrictions: '',
        followUpRequired: false,
        medicationPrescribed: '',
        additionalNotes: '',
        certificateType: 'medical-certificate',
        urgency: 'normal'
      });
      setShowNewCertificate(false);
    } catch (error) {
      console.error('Error creating certificate:', error);
      alert('Failed to create certificate. Please try again.');
    }
  };


  const unreadCount = notifications.filter(n => !n.read).length;

  const handlePatientRatingClick = () => {
    setShowPatientReviews(true);
  };

  const getFilteredReviews = () => {
    if (reviewsFilter === 'all') return patientReviews;
    if (reviewsFilter === 'recent') return patientReviews.slice(0, 10);
    if (reviewsFilter === '5-star') return patientReviews.filter(r => r.rating === 5);
    if (reviewsFilter === '4-star') return patientReviews.filter(r => r.rating === 4);
    return patientReviews;
  };

  const getFilteredCertificates = () => {
    if (certificatesFilter === 'all') return certificateData;
    if (certificatesFilter === 'approved') return certificateData.filter(c => c.status === 'Approved');
    if (certificatesFilter === 'pending') return certificateData.filter(c => c.status === 'Pending Review');
    if (certificatesFilter === 'urgent') return certificateData.filter(c => c.priority === 'Urgent');
    if (certificatesFilter === 'followup') return certificateData.filter(c => c.followUp);
    return certificateData;
  };



  const getReviewStats = () => {
    const total = patientReviews.length;
    const ratings = patientReviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {});

    const average = patientReviews.reduce((sum, review) => sum + review.rating, 0) / total;

    return {
      total,
      average: Math.round(average * 10) / 10,
      ratings,
      distribution: {
        5: Math.round((ratings[5] || 0) / total * 100),
        4: Math.round((ratings[4] || 0) / total * 100),
        3: Math.round((ratings[3] || 0) / total * 100),
        2: Math.round((ratings[2] || 0) / total * 100),
        1: Math.round((ratings[1] || 0) / total * 100)
      }
    };
  };


  const getCertificateStats = () => {
    const total = certificateData.length;
    const approved = certificateData.filter(c => c.status === 'Approved').length;
    const pending = certificateData.filter(c => c.status === 'Pending Review').length;
    const urgent = certificateData.filter(c => c.priority === 'Urgent').length;
    const followUp = certificateData.filter(c => c.followUp).length;

    const typeDistribution = certificateData.reduce((acc, cert) => {
      acc[cert.type] = (acc[cert.type] || 0) + 1;
      return acc;
    }, {});

    const thisWeek = certificateData.filter(c => {
      const certDate = new Date(c.created);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return certDate > weekAgo;
    }).length;

    const thisMonth = certificateData.filter(c => {
      const certDate = new Date(c.created);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return certDate > monthAgo;
    }).length;

    return {
      total,
      approved,
      pending,
      urgent,
      followUp,
      typeDistribution,
      thisWeek,
      thisMonth,
      approvalRate: Math.round((approved / total) * 100)
    };
  };

  const reviewStats = getReviewStats();
  const certificateStats = getCertificateStats();

  // Simulate user role (replace with actual role logic)
  const userRole = 'doctor'; // 'doctor' or 'pharmacist'

  // Certificate day options based on role
  const getDayOptions = () => {
    if (userRole === 'pharmacist') return [{ value: '1', label: '1 day' }];
    if (userRole === 'doctor') return [
      { value: '1', label: '1 day' },
      { value: '2', label: '2 days (Phone Verification Required)' }
    ];
    return [];
  };

  // Red-flag logic for 3-day certificate
  const isRedFlag = cert =>
    cert.duration === '3 days' ||
    (userRole === 'doctor' && cert.duration === '3 days');

  // Quick Approve handler
  const handleQuickApproveClick = cert => {
    setQuickApproveModal({ open: true, cert });
    setDeclineReason('');
    setDeclineReasonType('');
  };

  // Approve logic
  const handleApproveCertificate = cert => {
    // Phone verification for 2-day doctor certificate
    if (userRole === 'doctor' && cert.duration === '2 days') {
      alert('Phone verification required for 2-day certificate!');
      // Add phone verification logic here
      return;
    }
    // Red-flag for 3-day
    if (isRedFlag(cert)) {
      alert('3-day certificate is not allowed. Please refer to GP.');
      setQuickApproveModal({ open: false, cert: null });
      return;
    }
    // Approve
    alert(`Certificate ${cert.id} approved!`);
    setQuickApproveModal({ open: false, cert: null });
    // ...update state as needed...
  };

  // Decline logic
  const handleDeclineCertificate = cert => {
    if (!declineReason) {
      alert('Please provide a decline reason.');
      return;
    }
    alert(`Certificate ${cert.id} declined for reason: ${declineReason}`);
    setQuickApproveModal({ open: false, cert: null });
    // TODO: Send auto-email to patient with reason
  };

  return (
    <div className="p-5 flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="">
          <div className="">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="">
                  <h1 className="text-2xl font-semibold mb-5">Dashboard</h1>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div
              onClick={handleTotalCertificatesClick}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Total Certificates</p>
                  <p className="text-3xl font-bold text-slate-900">{statsState.totalCertificates}</p>
                </div>
                <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center group-hover:bg-slate-300 transition-colors">
                  <i className="ri-file-text-fill text-xl text-slate-700 group-hover:scale-110 transition-transform"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-emerald-700 font-medium bg-emerald-100 px-2 py-1 rounded">+12</span>
                <span className="text-slate-600 ml-2">this month</span>
              </div>
            </div>

            <Link to={"/doctor/mycertificates"} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Pending Requests</p>
                  <p className="text-3xl font-bold text-orange-700">{statsState.pendingRequests}</p>
                </div>
                <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                  <i className="ri-time-fill text-xl text-orange-700"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-orange-700 font-medium bg-orange-100 px-2 py-1 rounded">2 urgent</span>
                <span className="text-slate-600 ml-2">require attention</span>
              </div>
            </Link>

            {/* <div
              onClick={handleGrowthRateClick}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Monthly Earnings</p>
                  <p className="text-3xl font-bold text-emerald-700">${statsState.monthlyEarnings}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-200 rounded-lg flex items-center justify-center">
                  <i className="ri-money-dollar-circle-fill text-xl text-emerald-700"></i>
                </div>
              </div>
              <div
                className="flex items-center text-sm cursor-pointer hover:bg-slate-50 rounded p-1 -m-1 transition-colors"
              >
                <span className="text-emerald-700 font-medium bg-emerald-100 px-2 py-1 rounded hover:bg-emerald-200 transition-colors">+18%</span>
                <span className="text-slate-600 ml-2">vs last month</span>
              </div>
            </div> */}

            <div
              onClick={handlePatientRatingClick}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Patient Rating</p>
                  <p className="text-3xl font-bold text-blue-700">{statsState.patientRating}</p>
                </div>
                <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center group-hover:bg-blue-300 transition-colors">
                  <i className="ri-star-fill text-xl text-blue-700 group-hover:scale-110 transition-transform"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <div className="flex text-yellow-500 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-xs"></i>
                  ))}
                </div>
                <span className="text-slate-600">{reviewStats.total} reviews</span>
              </div>
            </div>

            <Link to={"/doctor/ScheduleManagement"}>  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Today's Schedule</p>
                  <p className="text-3xl font-bold text-purple-700">{statsState.todayAppointments}</p>
                </div>
                <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                  <i className="ri-calendar-check-fill text-xl text-purple-700"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-purple-700 font-medium bg-purple-100 px-2 py-1 rounded">3 upcoming</span>
                <span className="text-slate-600 ml-2">appointments</span>
              </div>
            </div></Link>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Approval Rate</p>
                  <p className="text-3xl font-bold text-slate-900">{statsState.approvalRate}%</p>
                </div>
                <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                  <i className="ri-check-double-fill text-xl text-slate-700"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-emerald-700 font-medium bg-emerald-100 px-2 py-1 rounded">Excellent</span>
                <span className="text-slate-600 ml-2">performance</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <button
              onClick={handleNewCertificate}
              className="bg-slate-800 hover:bg-slate-900 text-white p-4 rounded-lg transition-colors cursor-pointer whitespace-nowrap group"
            >
              <div className="flex items-center justify-center">
                <i className="ri-add-circle-line text-lg mr-2 group-hover:scale-110 transition-transform"></i>
                New Certificate
              </div>
            </button>

            <button
              onClick={handleQuickApproval}
              className="bg-emerald-700 hover:bg-emerald-800 text-white p-4 rounded-lg transition-colors cursor-pointer whitespace-nowrap group"
            >
              <div className="flex items-center justify-center">
                <i className="ri-check-double-line text-lg mr-2 group-hover:scale-110 transition-transform"></i>
                Quick Approve
              </div>
            </button>

            <Link
              to={"/doctor/ScheduleManagement"}
              className="bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-lg transition-colors cursor-pointer whitespace-nowrap group"
            >
              <div className="flex items-center justify-center">
                <i className="ri-calendar-schedule-line text-lg mr-2 group-hover:scale-110 transition-transform"></i>
                Schedule
              </div>
            </Link>

            {/* <button className="bg-orange-700 hover:bg-orange-800 text-white p-4 rounded-lg transition-colors cursor-pointer whitespace-nowrap group">
              <Link to={"/doctor/earningsreports"}>
                <div className="flex items-center justify-center">
                  <i className="ri-bar-chart-2-line text-lg mr-2 group-hover:scale-110 transition-transform"></i>
                  Reports
                </div></Link>
            </button> */}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Recent Requests */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-4 sm:p-6 border-b border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                    Recent Certificate Requests
                  </h2>
                  <Link
                    to="/doctor/mycertificates"
                    className="text-slate-700 hover:text-slate-900 text-sm cursor-pointer"
                  >
                    View All →
                  </Link>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-all"
                    >
                      {/* Header row */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                        <div>
                          <div className="flex items-center flex-wrap gap-2">
                            <span className="text-sm font-medium text-slate-700">
                              {request.id}
                            </span>
                            {request.urgent && (
                              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                                Urgent
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-slate-900">{request.patient}</h3>
                        </div>
                        <span className="text-xs text-slate-500">{request.submitted}</span>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 mb-4">
                        <div>
                          <span className="text-slate-500">Condition:</span>{" "}
                          {request.condition}
                        </div>
                        <div>
                          <span className="text-slate-500">Duration:</span>{" "}
                          {request.duration}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <span className="text-xs text-slate-500">{request.submitted}</span>
                        {request.status === "Pending" && (
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => handleApproveRequest(request.id)}
                              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer text-sm whitespace-nowrap"
                            >
                              Approve
                            </button>
                            <button
                            
                              className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors cursor-pointer text-sm whitespace-nowrap"
                            >
                              Review
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile & Performance */}
            <div className="space-y-6">
              {/* Profile Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-3">
                    <i className="ri-user-heart-fill text-2xl text-slate-700"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Dr. Sarah Johnson</h3>
                    <p className="text-slate-600 text-sm">General Practitioner</p>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                      <span className="text-xs text-emerald-700 font-medium">
                        AHPRA Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Specialization:</span>
                    <span className="text-slate-900 font-medium">General Medicine</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Years of Experience:</span>
                    <span className="text-slate-900 font-medium">8 years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Registration:</span>
                    <span className="text-slate-900 font-medium">MED0012345</span>
                  </div>
                </div>

                <Link
                  to={"/doctor/profilesettings"}
                  className="w-full mt-4 block bg-slate-800 hover:bg-slate-900 text-white py-2 rounded-lg text-center transition-colors cursor-pointer text-sm"
                >
                  <i className="ri-edit-line mr-2"></i> Edit Profile
                </Link>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-4">
                  This Month's Performance
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Certificate Completion</span>
                      <span className="text-slate-900 font-medium">98.5%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full"
                        style={{ width: "98.5%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Response Time</span>
                      <span className="text-slate-900 font-medium">2.3 hours avg</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Patient Satisfaction</span>
                      <span className="text-slate-900 font-medium">4.9/5.0</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: "98%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-emerald-700">
                        {statsState.totalCertificates}
                      </p>
                      <p className="text-xs text-slate-600">Total Certificates</p>
                    </div>
                    {/* <div>
                      <p className="text-xl sm:text-2xl font-bold text-blue-700">
                        ${statsState.monthlyEarnings}
                      </p>
                      <p className="text-xs text-slate-600">Monthly Earnings</p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Certificate Modal */}
          {showNewCertificate && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mr-4">
                        <i className="ri-file-add-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Create New Medical Certificate</h2>
                        <p className="text-slate-600">Issue a new certificate for patient</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowNewCertificate(false)}
                      className="w-10 h-10 bg-white hover:bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors border border-slate-200"
                    >
                      <i className="ri-close-line text-slate-600 text-xl"></i>
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  {/* Patient Information */}
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-user-line text-blue-600"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Patient Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Patient Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newCertificateForm.patientName}
                          onChange={e => handleFormChange('patientName', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter full patient name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={newCertificateForm.patientDOB}
                          onChange={e => handleFormChange('patientDOB', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={newCertificateForm.patientEmail}
                          onChange={e => handleFormChange('patientEmail', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="patient@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={newCertificateForm.patientPhone}
                          onChange={e => handleFormChange('patientPhone', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+61 400 000 000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Medical Details */}
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-stethoscope-line text-emerald-600"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Medical Assessment</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Primary Condition *
                        </label>
                        <select
                          required
                          value={newCertificateForm.condition}
                          onChange={e => handleFormChange('condition', e.target.value)}
                          className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select condition</option>
                          <option value="Upper Respiratory Infection">Upper Respiratory Infection</option>
                          <option value="Gastroenteritis">Gastroenteritis</option>
                          <option value="Migraine">Migraine</option>
                          <option value="Back Strain">Back Strain</option>
                          <option value="Anxiety/Stress">Anxiety/Stress</option>
                          <option value="Minor Injury">Minor Injury</option>
                          <option value="Post-Surgical Recovery">Post-Surgical Recovery</option>
                          <option value="Other">Other (specify in diagnosis)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Certificate Type
                        </label>
                        <select
                          value={newCertificateForm.certificateType}
                          onChange={e => handleFormChange('certificateType', e.target.value)}
                          className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="medical-certificate">Standard Medical Certificate</option>
                          <option value="fitness-for-work">Fitness for Work Assessment</option>
                          <option value="return-to-work">Return to Work Certificate</option>
                          <option value="specialist-referral">Specialist Referral Required</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Symptoms Presented
                        </label>
                        <textarea
                          value={newCertificateForm.symptoms}
                          onChange={e => handleFormChange('symptoms', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={3}
                          placeholder="Describe patient's presenting symptoms..."
                          maxLength={"500"}
                        />
                        <p className="text-xs text-slate-500 mt-1">{newCertificateForm.symptoms.length}/500 characters</p>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Clinical Diagnosis
                        </label>
                        <textarea
                          value={newCertificateForm.diagnosis}
                          onChange={e => handleFormChange('diagnosis', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={3}
                          placeholder="Detailed diagnosis and assessment..."
                          maxLength={"500"}
                        />
                        <p className="text-xs text-slate-500 mt-1">{newCertificateForm.diagnosis.length}/500 characters</p>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Duration */}
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-calendar-line text-orange-600"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Certificate Duration</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={newCertificateForm.startDate}
                          onChange={e => handleFormChange('startDate', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Duration (Days)
                        </label>
                        <select
                          value={newCertificateForm.duration}
                          onChange={e => handleFormChange('duration', e.target.value)}
                          className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select duration</option>
                          <option value="1">1 day</option>
                          <option value="2">2 days</option>
                          <option value="3">3 days</option>
                          <option value="5">5 days</option>
                          <option value="7">1 week</option>
                          <option value="14">2 weeks</option>
                          <option value="custom">Custom duration</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={newCertificateForm.endDate}
                          readOnly
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Work Restrictions & Treatment */}
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-shield-line text-purple-600"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Work Restrictions & Treatment</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Work Restrictions
                        </label>
                        <textarea
                          value={newCertificateForm.restrictions}
                          onChange={e => handleFormChange('restrictions', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={3}
                          placeholder="Specify any work limitations or restrictions..."
                          maxLength={"500"}
                        />
                        <p className="text-xs text-slate-500 mt-1">{newCertificateForm.restrictions.length}/500 characters</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Medication Prescribed
                        </label>
                        <input
                          type="text"
                          value={newCertificateForm.medicationPrescribed}
                          onChange={e => handleFormChange('medicationPrescribed', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="List any prescribed medications..."
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="followUpRequired"
                          checked={newCertificateForm.followUpRequired}
                          onChange={e => handleFormChange('followUpRequired', e.target.checked)}
                          className="w-4 h-4 text-blue-600 mr-3"
                        />
                        <label htmlFor="followUpRequired" className="text-sm text-slate-700 cursor-pointer">
                          Follow-up appointment recommended
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Additional Notes
                        </label>
                        <textarea
                          value={newCertificateForm.additionalNotes}
                          onChange={e => handleFormChange('additionalNotes', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={3}
                          placeholder="Any additional notes or recommendations..."
                          maxLength={"500"}
                        />
                        <p className="text-xs text-slate-500 mt-1">{newCertificateForm.additionalNotes.length}/500 characters</p>
                      </div>
                    </div>
                  </div>

                  {/* Priority */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-alert-line text-red-600"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">Certificate Priority</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Priority Level
                        </label>
                        <select
                          value={newCertificateForm.urgency}
                          onChange={e => handleFormChange('urgency', e.target.value)}
                          className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="normal">Normal Priority</option>
                          <option value="urgent">Urgent - Same Day</option>
                          <option value="routine">Routine Follow-up</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm text-slate-600 mb-1">Estimated Processing</div>
                          <div className="text-lg font-semibold text-emerald-600">
                            {newCertificateForm.urgency === 'urgent'
                              ? 'Immediate'
                              : newCertificateForm.urgency === 'routine'
                                ? '24-48 hours'
                                : '2-4 hours'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Summary */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <i className="ri-information-line text-blue-600"></i>
                      </div>
                      <div className="flex-1 ml-3">
                        <h4 className="text-sm font-medium text-blue-800 mb-2">Certificate Summary</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-blue-600">Patient:</span>
                            <span className="ml-2 text-blue-900 font-medium">
                              {newCertificateForm.patientName || 'Not specified'}
                            </span>
                          </div>
                          <div>
                            <span className="text-blue-600">Condition:</span>
                            <span className="ml-2 text-blue-900 font-medium">
                              {newCertificateForm.condition || 'Not specified'}
                            </span>
                          </div>
                          <div>
                            <span className="text-blue-600">Duration:</span>
                            <span className="ml-2 text-blue-900 font-medium">
                              {newCertificateForm.startDate && newCertificateForm.endDate
                                ? `${newCertificateForm.startDate} to ${newCertificateForm.endDate}`
                                : 'Not specified'}
                            </span>
                          </div>
                          <div>
                            <span className="text-blue-600">Type:</span>
                            <span className="ml-2 text-blue-900 font-medium">
                              {newCertificateForm.certificateType.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-200 flex flex-col gap-4">
                  {/* Top Row - Info */}
                  <div className="flex items-center text-sm text-slate-600">
                    <i className="ri-shield-check-line mr-2 text-emerald-600"></i>
                    Certificate will be digitally signed and verifiable via QR code
                  </div>

                  {/* Bottom Row - Buttons */}
                  <div className="flex space-x-4 justify-end">
                    <button
                      onClick={() => setShowNewCertificate(false)}
                      className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateCertificate}
                      className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap flex items-center"
                    >
                      <i className="ri-file-add-line mr-2"></i>
                      Create Certificate
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Quick Approval Modal */}
          {quickApproveModal.open && quickApproveModal.cert && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Certificate Preview</h2>
                  <button
                    onClick={() => setQuickApproveModal({ open: false, cert: null })}
                    className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer"
                  >
                    <i className="ri-close-line text-slate-600 text-xl"></i>
                  </button>
                </div>
                {/* Preview Details */}
                <div className="space-y-2 text-sm text-slate-700 mb-4">
                  <div><strong>Patient:</strong> {quickApproveModal.cert.patient}</div>
                  <div><strong>Certificate ID:</strong> {quickApproveModal.cert.id}</div>
                  <div><strong>Condition:</strong> {quickApproveModal.cert.condition}</div>
                  <div><strong>Duration:</strong> {quickApproveModal.cert.duration}</div>
                  <div><strong>Status:</strong> {quickApproveModal.cert.status}</div>
                  <div><strong>Practitioner:</strong> Dr. Sarah Johnson</div>
                  <div><strong>AHPRA Reg. No.:</strong> MED0001234567</div>
                  <div>
                    <strong>QR Code:</strong>
                    <div className="mt-2">
                      {/* Dummy QR code */}
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=MC-2024-0156" alt="QR" />
                    </div>
                  </div>
                </div>
                {/* Red-flag Blocker */}
                {isRedFlag(quickApproveModal.cert) && (
                  <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    <strong>3-day certificate is not allowed.</strong> Please refer to GP.
                  </div>
                )}
                {/* Day Options (role-based) */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Certificate Duration</label>
                  <select
                    value={quickApproveModal.cert.duration}
                    disabled
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50"
                  >
                    {getDayOptions().map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                {/* Approve/Decline Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                    onClick={() => handleApproveCertificate(quickApproveModal.cert)}
                    disabled={isRedFlag(quickApproveModal.cert)}
                  >
                    Approve
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                    onClick={() => setDeclineReasonType('dropdown')}
                  >
                    Decline
                  </button>
                  {/* Decline Reason Dropdown/Textbox */}
                  {declineReasonType && (
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Decline Reason</label>
                      <select
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-2"
                        value={declineReason}
                        onChange={e => setDeclineReason(e.target.value)}
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
                          value={declineReason}
                          onChange={e => setDeclineReason(e.target.value)}
                        />
                      )}
                      <button
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                        onClick={() => handleDeclineCertificate(quickApproveModal.cert)}
                      >
                        Submit Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Patient Reviews Modal */}
          {showPatientReviews && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                        <i className="ri-star-fill text-white text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Patient Reviews & Ratings</h2>
                        <p className="text-slate-600">View feedback from your patients</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPatientReviews(false)}
                      className="w-10 h-10 bg-white hover:bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors border border-slate-200"
                    >
                      <i className="ri-close-line text-slate-600 text-xl"></i>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Rating Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Overall Rating */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 text-center">
                      <div className="text-5xl font-bold text-blue-700 mb-2">{reviewStats.average}</div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`ri-star-fill text-xl ${i < Math.floor(reviewStats.average) ? 'text-yellow-500' : 'text-slate-300'}`}
                          ></i>
                        ))}
                      </div>
                      <p className="text-slate-600 font-medium">Overall Rating</p>
                      <p className="text-sm text-slate-500">{reviewStats.total} total reviews</p>
                    </div>

                    {/* Rating Distribution */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Rating Distribution</h3>
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map(rating => (
                          <div key={rating} className="flex items-center">
                            <span className="text-sm text-slate-600 w-8">{rating}★</span>
                            <div className="flex-1 mx-3 bg-slate-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${rating === 5 ? 'bg-emerald-500' : rating === 4 ? 'bg-blue-500' : rating === 3 ? 'bg-yellow-500' : rating === 2 ? 'bg-orange-500' : 'bg-red-500'
                                  }`}
                                style={{ width: `${reviewStats.distribution[rating] || 0}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-slate-600 w-10">{reviewStats.distribution[rating] || 0}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Review Statistics</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-slate-600">5-Star Reviews:</span>
                          <span className="font-semibold text-emerald-600">{reviewStats.ratings[5] || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">4-Star Reviews:</span>
                          <span className="font-semibold text-blue-600">{reviewStats.ratings[4] || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Recent Reviews:</span>
                          <span className="font-semibold text-purple-600">6 this week</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Response Rate:</span>
                          <span className="text-slate-900 font-medium">24%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                    {/* Filter Buttons */}
                    <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0">
                      <button
                        onClick={() => setReviewsFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${reviewsFilter === 'all'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                      >
                        All Reviews ({reviewStats.total})
                      </button>
                      <button
                        onClick={() => setReviewsFilter('recent')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${reviewsFilter === 'recent'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                      >
                        Recent
                      </button>
                      <button
                        onClick={() => setReviewsFilter('5-star')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${reviewsFilter === '5-star'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                      >
                        5-Star ({reviewStats.ratings[5] || 0})
                      </button>
                      <button
                        onClick={() => setReviewsFilter('4-star')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${reviewsFilter === '4-star'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                      >
                        4-Star ({reviewStats.ratings[4] || 0})
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 text-sm text-slate-600 space-y-2 sm:space-y-0">
                      <div>
                        <span className="font-medium text-emerald-600">
                          {Math.round(((reviewStats.ratings[5] || 0) / reviewStats.total) * 100)}%
                        </span>{" "}
                        of patients rated 5 stars
                      </div>
                      <div>
                        Average response time: <span className="font-medium">2.3 hours</span>
                      </div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {getFilteredReviews().map((review) => (
                      <div
                        key={review.id}
                        className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6 hover:shadow-sm transition-all"
                      >
                        {/* Header: Patient + Rating + Info */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                          {/* Left: Avatar + Patient Info */}
                          <div className="flex items-start">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-200 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                              <i className="ri-user-3-fill text-slate-600 text-lg"></i>
                            </div>
                            <div>
                              <div className="flex flex-col sm:flex-row sm:items-center">
                                <h4 className="font-semibold text-slate-900 sm:mr-3">{review.patient}</h4>
                                {review.verified && (
                                  <div className="flex items-center bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-medium mt-1 sm:mt-0">
                                    <i className="ri-verified-badge-fill mr-1"></i>
                                    Verified
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center mt-1 text-xs sm:text-sm">
                                <div className="flex mr-3">
                                  {[...Array(5)].map((_, i) => (
                                    <i
                                      key={i}
                                      className={`ri-star-fill ${i < review.rating ? 'text-yellow-500' : 'text-slate-300'}`}
                                    ></i>
                                  ))}
                                </div>
                                <span className="text-slate-500">{review.date}</span>
                              </div>
                            </div>
                          </div>

                          {/* Right: Certificate + Helpful Count */}
                          <div className="text-right text-xs sm:text-sm">
                            <div className="text-slate-500 mb-1">{review.certificateType}</div>
                            <div className="flex items-center justify-end text-slate-400">
                              <i className="ri-thumb-up-line mr-1"></i>
                              {review.helpful} helpful
                            </div>
                          </div>
                        </div>

                        {/* Review Text */}
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 sm:p-4 mb-4">
                          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{review.review}</p>
                        </div>

                        {/* Footer: Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                          <div className="flex space-x-4">
                            <button className="flex items-center text-sm text-slate-600 hover:text-emerald-600 cursor-pointer transition-colors">
                              <i className="ri-thumb-up-line mr-1"></i>
                              Helpful
                            </button>
                            <button className="flex items-center text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors">
                              <i className="ri-reply-line mr-1"></i>
                              Reply
                            </button>
                          </div>

                          <div className="flex space-x-2 justify-end">
                            <button className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
                              <i className="ri-share-line"></i>
                            </button>
                            <button className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
                              <i className="ri-more-line"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Response Guidelines */}
                  <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="ri-lightbulb-line text-blue-600"></i>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-3">Review Response Guidelines</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-medium text-blue-800 mb-2">Best Practices:</h5>
                            <ul className="space-y-1 text-blue-700">
                              <li>• Respond professionally and courteously</li>
                              <li>• Thank patients for their feedback</li>
                              <li>• Address specific concerns mentioned</li>
                              <li>• Keep responses concise and helpful</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-blue-800 mb-2">Privacy Reminders:</h5>
                            <ul className="space-y-1 text-blue-700">
                              <li>• Never discuss specific medical details</li>
                              <li>• Maintain patient confidentiality</li>
                              <li>• Use general, supportive language</li>
                              <li>• Refer complex issues to private consultation</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-200 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                  {/* Stats Section */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                    <div className="text-sm text-slate-600">
                      <span className="font-medium text-slate-900">{certificateStats.total}</span> total certificates managed
                    </div>
                    <div className="text-sm text-slate-600">
                      <span className="font-medium text-emerald-600">{certificateStats.approvalRate}%</span> approval rate
                    </div>
                    <div className="text-sm text-slate-600">
                      Average processing: <span className="font-medium">2.3 hours</span>
                    </div>
                  </div>

                  {/* Buttons Section */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowCertificateOverview(false)}
                      className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Close
                    </button>
                    <Link
                      to="/admin/practitioner-certificates"
                      className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap flex items-center"
                    >
                      <i className="ri-external-link-line mr-2"></i>
                      Manage Certificate
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Growth Analytics Modal */}
          {showGrowthAnalytics && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-green-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mr-4">
                        <i className="ri-line-chart-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Earnings Growth Analytics</h2>
                        <p className="text-slate-600">Detailed breakdown of your earnings performance</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowGrowthAnalytics(false)}
                      className="w-10 h-10 bg-white hover:bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors border border-slate-200"
                    >
                      <i className="ri-close-line text-slate-600 text-xl"></i>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Growth Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6 text-center">
                      <div className="text-4xl font-bold text-emerald-700 mb-2">+18%</div>
                      <p className="text-emerald-600 font-medium">Growth Rate</p>
                      <p className="text-sm text-emerald-500 mt-1">vs last month</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 text-center">
                      <div className="text-4xl font-bold text-blue-700 mb-2">$2,450</div>
                      <p className="text-blue-600 font-medium">This Month</p>
                      <p className="text-sm text-blue-500 mt-1">January 2024</p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6 text-center">
                      <div className="text-4xl font-bold text-slate-700 mb-2">$2,076</div>
                      <p className="text-slate-600 font-medium">Last Month</p>
                      <p className="text-sm text-slate-500 mt-1">December 2023</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 text-center">
                      <div className="text-4xl font-bold text-purple-700 mb-2">$374</div>
                      <p className="text-purple-600 font-medium">Increase</p>
                      <p className="text-sm text-purple-500 mt-1">Monthly difference</p>
                    </div>
                  </div>

                  {/* Performance Breakdown */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Comparison</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                              <i className="ri-calendar-line text-emerald-600"></i>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">January 2024</p>
                              <p className="text-sm text-slate-600">Current month</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-emerald-700">$2,450</p>
                            <p className="text-sm text-emerald-600">31 certificates</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                              <i className="ri-calendar-line text-slate-600"></i>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">December 2023</p>
                              <p className="text-sm text-slate-600">Previous month</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-slate-700">$2,076</p>
                            <p className="text-sm text-slate-600">26 certificates</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-100 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                              <i className="ri-trending-up-line text-purple-600"></i>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">Growth</p>
                              <p className="text-sm text-slate-600">Month-over-month</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-purple-700">+$374</p>
                            <p className="text-sm text-purple-600">+5 certificates</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Growth Factors</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-emerald-500 rounded-full mr-3"></div>
                            <span className="text-slate-700">Certificate Volume</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-900 font-bold">+19%</span>
                            <p className="text-xs text-slate-500">5 more certificates</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                            <span className="text-slate-700">Average Value</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-900 font-bold">$79.03</span>
                            <p className="text-xs text-slate-500">vs $79.85 last month</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-purple-500 rounded-full mr-3"></div>
                            <span className="text-slate-700">Patient Retention</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-900 font-bold">+12%</span>
                            <p className="text-xs text-slate-500">Returning patients</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                            <span className="text-slate-700">Response Time</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-900 font-bold">2.1h avg</span>
                            <p className="text-xs text-slate-500">15% faster</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                            <span className="text-slate-700">Patient Rating</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-900 font-bold">4.9★</span>
                            <p className="text-xs text-slate-500">+0.2 improvement</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 6-Month Trend */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      6-Month Earnings Trend
                    </h3>

                    {/* Responsive Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      {[
                        { month: "Aug 2023", amount: 1840, certificates: 23, growth: "+8%" },
                        { month: "Sep 2023", amount: 1925, certificates: 24, growth: "+5%" },
                        { month: "Oct 2023", amount: 2156, certificates: 27, growth: "+12%" },
                        { month: "Nov 2023", amount: 1987, certificates: 25, growth: "-8%" },
                        { month: "Dec 2023", amount: 2076, certificates: 26, growth: "+4%" },
                        { month: "Jan 2024", amount: 2450, certificates: 31, growth: "+18%" },
                      ].map((data, index) => (
                        <div
                          key={index}
                          className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200"
                        >
                          <p className="text-xs text-slate-500 mb-2">{data.month}</p>
                          <p className="text-lg font-bold text-slate-900 mb-1">${data.amount}</p>
                          <p className="text-xs text-slate-600 mb-2">
                            {data.certificates} certs
                          </p>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded ${data.growth.startsWith("+")
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                              }`}
                          >
                            {data.growth}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Insights */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Performance Drivers</h3>
                      <div className="space-y-4">
                        <div className="flex items-center p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                            <i className="ri-time-line text-emerald-600"></i>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">Faster Response Time</p>
                            <p className="text-sm text-slate-600">Average 2.1 hours (15% improvement)</p>
                          </div>
                          <div className="text-emerald-600 font-bold">+$127</div>
                        </div>

                        <div className="flex items-center p-3 bg-blue-50 border border-blue-100 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <i className="ri-user-heart-line text-blue-600"></i>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">Patient Satisfaction</p>
                            <p className="text-sm text-slate-600">4.9★ rating (0.2 point increase)</p>
                          </div>
                          <div className="text-blue-600 font-bold">+$98</div>
                        </div>

                        <div className="flex items-center p-3 bg-purple-50 border border-purple-100 rounded-lg">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                            <i className="ri-repeat-line text-purple-600"></i>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">Returning Patients</p>
                            <p className="text-sm text-slate-600">12% increase in repeat consultations</p>
                          </div>
                          <div className="text-purple-600 font-bold">+$149</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Growth Projections</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-slate-900">February 2024 Forecast</p>
                            <span className="text-emerald-700 font-bold">$2,695</span>
                          </div>
                          <div className="flex items-center text-sm text-slate-600">
                            <i className="ri-trending-up-line text-emerald-600 mr-2"></i>
                            <span>+10% projected growth</span>
                          </div>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-slate-900">Q1 2024 Target</p>
                            <span className="text-blue-700 font-bold">$7,500</span>
                          </div>
                          <div className="flex items-center text-sm text-slate-600">
                            <i className="ri-target-line text-blue-600 mr-2"></i>
                            <span>67% progress to quarterly goal</span>
                          </div>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-slate-900">Annual Projection</p>
                            <span className="text-purple-700 font-bold">$31,200</span>
                          </div>
                          <div className="flex items-center text-sm text-slate-600">
                            <i className="ri-calendar-check-line text-purple-600 mr-2"></i>
                            <span>Based on current growth rate</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actionable Insights */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <i className="ri-lightbulb-line text-blue-600"></i>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-3">Growth Optimization Recommendations</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-medium text-blue-800 mb-2">Immediate Actions:</h5>
                            <ul className="space-y-1 text-blue-700">
                              <li>• Maintain current response time under 2.5 hours</li>
                              <li>• Continue engaging with patient feedback</li>
                              <li>• Promote follow-up consultations when appropriate</li>
                              <li>• Expand availability during peak demand times</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-blue-800 mb-2">Strategic Opportunities:</h5>
                            <ul className="space-y-1 text-blue-700">
                              <li>• Consider weekend availability for urgent cases</li>
                              <li>• Develop patient education resources</li>
                              <li>• Implement patient reminder systems</li>
                              <li>• Explore specialized certificate types</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-200">
                  {/* First Row - Heading Texts */}
                  <div className="flex flex-wrap items-center gap-6 mb-4">
                    <div className="text-sm text-slate-600">
                      <span className="font-medium text-emerald-600">+18%</span> growth this month
                    </div>
                    <div className="text-sm text-slate-600">
                      Projected: <span className="font-medium">$2,695</span> next month
                    </div>
                    <div className="text-sm text-slate-600">
                      Annual target: <span className="font-medium">$31,200</span>
                    </div>
                  </div>

                  {/* Second Row - Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowGrowthAnalytics(false)}
                      className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Close
                    </button>
                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap flex items-center">
                      <i className="ri-download-cloud-2-line mr-2"></i>
                      Export Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}