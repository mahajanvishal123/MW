import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TodaySchedule from './TodaySchedule';
import { Modal, Button } from "react-bootstrap";
export default function ScheduleManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showMoreMenu, setShowMoreMenu] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [rescheduleRequest, setRescheduleRequest] = useState(null);
  const [cancelRequest, setCancelRequest] = useState(null);
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarAppointments, setCalendarAppointments] = useState([]);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalAppointment, setModalAppointment] = useState({ open: false, type: '', appointment: null });
  const [editForm, setEditForm] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = (type, appointment = null) => {
    setModalAppointment({ open: true, type, appointment });
    if (type === 'edit' && appointment) {
      setEditForm(appointment);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // 👇 Yaha delete API call ya logic likh sakte ho
    console.log("Appointment Deleted ✅");
    setShowDeleteModal(false);
  };

  const handleSaveAppointment = () => {
    // In a real app, you would update the appointment in your state or database
    console.log('Saving appointment:', editForm);
    setModalAppointment({ open: false });
  };

  // New state for Manage Availability
  const [showManageAvailability, setShowManageAvailability] = useState(false);
  const [availabilitySettings, setAvailabilitySettings] = useState({
    status: 'available',
    workingHours: {
      monday: { enabled: true, start: '09:00', end: '17:00', breaks: [{ start: '12:00', end: '13:00' }] },
      tuesday: { enabled: true, start: '09:00', end: '17:00', breaks: [{ start: '12:00', end: '13:00' }] },
      wednesday: { enabled: true, start: '09:00', end: '17:00', breaks: [{ start: '12:00', end: '13:00' }] },
      thursday: { enabled: true, start: '09:00', end: '17:00', breaks: [{ start: '12:00', end: '13:00' }] },
      friday: { enabled: true, start: '09:00', end: '17:00', breaks: [{ start: '12:00', end: '13:00' }] },
      saturday: { enabled: false, start: '09:00', end: '13:00', breaks: [] },
      sunday: { enabled: false, start: '09:00', end: '13:00', breaks: [] }
    },
    appointmentDuration: 30,
    bufferTime: 15,
    maxAdvanceBooking: 30,
    autoAcceptBookings: false,
    weekendAvailability: false,
    emergencySlots: true,
    timezone: 'Australia/Melbourne',
    unavailablePeriods: [
      {
        id: 1,
        title: 'Annual Leave',
        startDate: '2024-02-15',
        endDate: '2024-02-25',
        reason: 'vacation',
        recurring: false
      }
    ]
  });
  const [tempAvailability, setTempAvailability] = useState({});
  const [showUnavailablePeriod, setShowUnavailablePeriod] = useState(false);
  const [newUnavailablePeriod, setNewUnavailablePeriod] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    reason: 'personal',
    recurring: false,
    notes: ''
  });

  const appointmentRequests = [
    {
      id: 'AR-2024-001',
      patient: 'Sarah Wilson',
      type: 'Medical Certificate Consultation',
      requestedDate: '2024-01-16',
      requestedTime: '10:00 AM',
      status: 'Pending',
      priority: 'Standard',
      notes: 'Patient requesting certificate for sick leave due to flu symptoms',
      contact: '+61 412 345 678',
      email: 'sarah.wilson@email.com',
      condition: 'Upper Respiratory Infection',
      duration: '2-3 days',
      submitted: '2 hours ago'
    },
    {
      id: 'AR-2024-002',
      patient: 'Michael Johnson',
      type: 'Follow-up Consultation',
      requestedDate: '2024-01-16',
      requestedTime: '2:30 PM',
      status: 'Confirmed',
      priority: 'Standard',
      notes: 'Follow-up for previous back strain injury assessment',
      contact: '+61 423 456 789',
      email: 'michael.johnson@email.com',
      condition: 'Back Strain Recovery',
      duration: 'Assessment needed',
      submitted: '1 day ago'
    },
    {
      id: 'AR-2024-003',
      patient: 'Emma Davis',
      type: 'Urgent Medical Assessment',
      requestedDate: '2024-01-15',
      requestedTime: '4:00 PM',
      status: 'Pending',
      priority: 'Urgent',
      notes: 'Severe migraine symptoms, unable to work',
      contact: '+61 434 567 890',
      email: 'emma.davis@email.com',
      condition: 'Acute Migraine',
      duration: '1-2 days',
      submitted: '3 hours ago'
    }
  ];

  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    email: '',
    phone: '',
    appointmentType: 'consultation',
    date: '',
    time: '',
    notes: '',
    priority: 'standard'
  });

  const [rescheduleForm, setRescheduleForm] = useState({
    newDate: '',
    newTime: '',
    reason: '',
    notifyPatient: true
  });

  const [cancelForm, setCancelForm] = useState({
    reason: '',
    notes: '',
    refundRequired: false
  });

  // Initialize calendar appointments
  useEffect(() => {
    setCalendarAppointments(generateCalendarAppointments());
  }, []);

  const generateCalendarAppointments = () => {
    const appointments = [];
    const today = new Date();

    for (let i = -10; i < 20; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayAppointments = Math.floor(Math.random() * 4);

      for (let j = 0; j < dayAppointments; j++) {
        const times = ['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM', '4:45 PM'];
        const patients = ['John Smith', 'Lisa Chen', 'David Brown', 'Sarah Wilson', 'Michael Taylor'];
        const types = ['Medical Certificate', 'Consultation', 'Follow-up', 'Assessment'];
        const statuses = ['confirmed', 'pending'];

        appointments.push({
          id: `APT-${date.toISOString().split('T')[0]}-${j}`,
          date: date.toISOString().split('T')[0],
          time: times[Math.floor(Math.random() * times.length)],
          patient: patients[Math.floor(Math.random() * patients.length)],
          type: types[Math.floor(Math.random() * types.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          notes: 'Standard consultation appointment',
          contact: '+61 400 000 000'
        });
      }
    }

    return appointments;
  };

  // Availability Management Functions
  const handleManageAvailability = () => {
    setTempAvailability(JSON.parse(JSON.stringify(availabilitySettings)));
    setShowManageAvailability(true);
  };

  const handleAvailabilityChange = (field, value) => {
    setTempAvailability(prev => ({ ...prev, [field]: value }));
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setTempAvailability(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value
        }
      }
    }));
  };

  const addBreakTime = (day) => {
    setTempAvailability(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          breaks: [...prev.workingHours[day].breaks, { start: '12:00', end: '13:00' }]
        }
      }
    }));
  };

  const removeBreakTime = (day, breakIndex) => {
    setTempAvailability(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          breaks: prev.workingHours[day].breaks.filter((_, index) => index !== breakIndex)
        }
      }
    }));
  };

  const updateBreakTime = (day, breakIndex, field, value) => {
    setTempAvailability(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          breaks: prev.workingHours[day].breaks.map((breakTime, index) =>
            index === breakIndex ? { ...breakTime, [field]: value } : breakTime
          )
        }
      }
    }));
  };

  const handleSaveAvailability = () => {
    try {
      setAvailabilitySettings(tempAvailability);
      setShowManageAvailability(false);

      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-emerald-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 border border-emerald-500';
      notification.innerHTML = `
        <div class="flex items-center">
          <i class="ri-check-double-line mr-3 text-lg"></i>
          <div>
            <div class="font-semibold">Availability Updated Successfully!</div>
            <div class="text-sm text-emerald-100">Your schedule settings have been saved</div>
          </div>
        </div>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 4000);

      console.log('Availability settings saved:', tempAvailability);
    } catch (error) {
      console.error('Error saving availability:', error);
      alert('Failed to save availability settings. Please try again.');
    }
  };

  const handleAddUnavailablePeriod = () => {
    if (!newUnavailablePeriod.title || !newUnavailablePeriod.startDate) {
      alert('Please fill in the required fields: Title and Start Date.');
      return;
    }

    const newPeriod = {
      id: Date.now(),
      ...newUnavailablePeriod
    };

    setTempAvailability(prev => ({
      ...prev,
      unavailablePeriods: [...prev.unavailablePeriods, newPeriod]
    }));

    setNewUnavailablePeriod({
      title: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      reason: 'personal',
      recurring: false,
      notes: ''
    });

    setShowUnavailablePeriod(false);
  };

  const removeUnavailablePeriod = (periodId) => {
    setTempAvailability(prev => ({
      ...prev,
      unavailablePeriods: prev.unavailablePeriods.filter(period => period.id !== periodId)
    }));
  };

  const copyDaySchedule = (fromDay, toDay) => {
    const fromSchedule = tempAvailability.workingHours[fromDay];
    setTempAvailability(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [toDay]: {
          ...fromSchedule,
          breaks: [...fromSchedule.breaks]
        }
      }
    }));
  };

  const getCalendarDays = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dayAppointments = calendarAppointments.filter(apt =>
        apt.date === currentDate.toISOString().split('T')[0]
      );

      days.push({
        date: new Date(currentDate),
        appointments: dayAppointments,
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.toDateString() === new Date().toDateString()
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const handleApproveRequest = (requestId) => {
    console.log('Approving request:', requestId);
    alert(`Request ${requestId} has been approved and scheduled.`);
    setShowMoreMenu(null);
  };

  const handleReschedule = (request) => {
    setRescheduleRequest(request);
    setRescheduleForm({
      newDate: '',
      newTime: '',
      reason: '',
      notifyPatient: true
    });
    setShowRescheduleModal(true);
    setShowMoreMenu(null);
  };

  const handleCancelRequest = (request) => {
    setCancelRequest(request);
    setCancelForm({
      reason: '',
      notes: '',
      refundRequired: false
    });
    setShowCancelModal(true);
    setShowMoreMenu(null);
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowRequestDetails(true);
    setShowMoreMenu(null);
  };

  const handleRescheduleConfirm = () => {
    if (!rescheduleForm.newDate || !rescheduleForm.newTime) {
      alert('Please select both new date and time.');
      return;
    }

    console.log('Rescheduling appointment:', {
      request: rescheduleRequest,
      newSchedule: rescheduleForm
    });

    alert(`Appointment ${rescheduleRequest.id} has been rescheduled to ${rescheduleForm.newDate} at ${rescheduleForm.newTime}.`);
    setShowRescheduleModal(false);
    setRescheduleRequest(null);
  };

  const handleCancelConfirm = () => {
    if (!cancelForm.reason) {
      alert('Please select a cancellation reason.');
      return;
    }

    console.log('Cancelling appointment:', {
      request: cancelRequest,
      cancellation: cancelForm
    });

    alert(`Appointment ${cancelRequest.id} has been cancelled. ${cancelForm.refundRequired ? 'Refund will be processed.' : ''}`);
    setShowCancelModal(false);
    setCancelRequest(null);
  };

  const handleAddAppointment = () => {
    if (!newAppointment.patientName || !newAppointment.date || !newAppointment.time) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Adding new appointment:', newAppointment);
    alert('New appointment has been scheduled successfully!');

    setNewAppointment({
      patientName: '',
      email: '',
      phone: '',
      appointmentType: 'consultation',
      date: '',
      time: '',
      notes: '',
      priority: 'standard'
    });
    setShowAddAppointment(false);
  };

  const handleCalendarDateClick = (day) => {
    setSelectedCalendarDate(day.date);
    if (day.appointments.length > 0) {
      setSelectedAppointment(day.appointments[0]);
      setShowAppointmentDetails(true);
    }
  };


  // Handle calling patient
  const handleCallPatient = (phone) => {
    // In a real app, this would initiate a phone call
    console.log('Calling:', phone);
    alert(`Calling ${phone}`);
  };

  const navigateCalendar = (direction) => {
    const newDate = new Date(calendarDate);
    newDate.setMonth(calendarDate.getMonth() + direction);
    setCalendarDate(newDate);
  };

  const goToToday = () => {
    setCalendarDate(new Date());
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getPriorityColor = (priority) => {
    return priority === 'Urgent'
      ? 'bg-red-100 text-red-800 border-red-200'
      : 'bg-blue-100 text-blue-800 border-blue-200';
  };

  return (
    <div className="p-5 flex">
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="w-full">
          <div className="ms-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

              {/* Title Section */}
              <div className="">
                <h1 className="text-xl sm:text-2xl font-semibold">
                  Schedule Management
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mt-1">
                  Manage your appointments and availability
                </p>
              </div>

              {/* Button Section */}
              <div className="flex justify-center sm:justify-end">
                <button
                  onClick={() => setShowAddAppointment(true)}
                  className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap w-full sm:w-auto"
                >
                  <i className="ri-add-line mr-2"></i>
                  Add Appointment
                </button>
              </div>

            </div>
          </div>
        </header>

        <div className="flex-1 mt-5 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* Today's Schedule Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <TodaySchedule />

                <button
                  onClick={() => setShowFullCalendar(true)}
                  className="w-full mt-4 p-3 border border-dashed border-slate-300 rounded-lg text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <i className="ri-calendar-line mr-2"></i>
                  View Full Calendar
                </button>
              </div>

              {/* Appointment Requests Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-900 mb-2 sm:mb-0">Appointment Requests</h2>
                  <div className="text-sm text-slate-600">
                    <span className="font-medium text-amber-600">{appointmentRequests.filter(r => r.status === 'Pending').length}</span> pending requests
                  </div>
                </div>

                <div className="space-y-4">
                  {appointmentRequests.map((request) => (
                    <div key={request.id} className="p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-all">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <div className="mb-3 md:mb-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-xs md:text-sm font-medium text-slate-700">{request.id}</span>
                            <span className={`px-2.5 py-1 text-xs font-medium rounded border ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                            {request.priority === 'Urgent' && (
                              <span className={`px-2.5 py-1 text-xs font-medium rounded border ${getPriorityColor(request.priority)}`}>
                                {request.priority}
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-slate-900 text-sm md:text-base">{request.patient}</h3>
                          <p className="text-xs md:text-sm text-slate-600">{request.type}</p>
                        </div>
                        <div className="text-left md:text-right">
                          <p className="text-sm text-slate-900 font-medium">{request.requestedDate}</p>
                          <p className="text-sm text-slate-600">{request.requestedTime}</p>
                          <p className="text-xs text-slate-500">{request.submitted}</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-3">
                        <p className="text-xs md:text-sm text-slate-700">{request.notes}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-slate-600 mb-3 sm:mb-0">
                          <span><i className="ri-phone-line mr-1"></i>{request.contact}</span>
                          <span><i className="ri-user-heart-line mr-1"></i>{request.condition}</span>
                        </div>
                        <div className="flex items-center justify-end space-x-2 relative">
                          {/* <button className="text-blue-600 hover:text-blue-700 cursor-pointer" title="Call Patient">
                            <i className="ri-phone-line text-base md:text-lg"></i>
                          </button>
                          <button className="text-emerald-600 hover:text-emerald-700 cursor-pointer" title="Message Patient">
                            <i className="ri-message-3-line text-base md:text-lg"></i>
                          </button> */}
                          <button
                            onClick={() => setShowMoreMenu(showMoreMenu === request.id ? null : request.id)}
                            className="text-slate-600 hover:text-slate-700 cursor-pointer"
                            title="More Options"
                          >
                            <i className="ri-more-2-line text-base md:text-lg"></i>
                          </button>

                          {showMoreMenu === request.id && (
                            <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                              <div className="p-2">
                                <button
                                  onClick={() => handleViewDetails(request)}
                                  className="w-full flex items-center px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded cursor-pointer"
                                >
                                  <i className="ri-eye-line mr-3"></i>
                                  View Details
                                </button>
                                <button
                                  onClick={() => handleApproveRequest(request.id)}
                                  className="w-full flex items-center px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 rounded cursor-pointer"
                                >
                                  <i className="ri-check-line mr-3"></i>
                                  Approve Request
                                </button>
                                <button
                                  onClick={() => handleReschedule(request)}
                                  className="w-full flex items-center px-3 py-2 text-sm text-blue-700 hover:bg-blue-50 rounded cursor-pointer"
                                >
                                  <i className="ri-calendar-event-line mr-3"></i>
                                  Reschedule
                                </button>
                                <button
                                  onClick={() => handleCancelRequest(request)}
                                  className="w-full flex items-center px-3 py-2 text-sm text-red-700 hover:bg-red-50 rounded cursor-pointer"
                                >
                                  <i className="ri-close-line mr-3"></i>
                                  Cancel Request
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-calendar-check-line text-emerald-600 text-sm sm:text-base"></i>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-slate-500">Today</p>
                        <p className="font-semibold text-slate-900 text-sm sm:text-base">3 Appointments</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-time-line text-amber-600 text-sm sm:text-base"></i>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-slate-500">Pending</p>
                        <p className="font-semibold text-slate-900 text-sm sm:text-base">2 Requests</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-calendar-line text-blue-600 text-sm sm:text-base"></i>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-slate-500">This Week</p>
                        <p className="font-semibold text-slate-900 text-sm sm:text-base">18 Appointments</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability Settings Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Availability Settings</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-slate-700">Status</span>
                    <span className={`px-2.5 py-1 text-xs font-medium rounded border ${availabilitySettings.status === 'available' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                      {availabilitySettings.status === 'available' ? 'Available' : 'Unavailable'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-slate-700">Today's Hours</span>
                    <span className="text-xs sm:text-sm text-slate-900 font-medium">
                      {availabilitySettings.workingHours.tuesday.enabled
                        ? `${availabilitySettings.workingHours.tuesday.start} - ${availabilitySettings.workingHours.tuesday.end}`
                        : 'Not available'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-slate-700">Next Available</span>
                    <span className="text-xs sm:text-sm text-slate-900 font-medium">4:00 PM Today</span>
                  </div>
                </div>

                <button
                  onClick={handleManageAvailability}
                  className="w-full mt-4 bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap text-sm sm:text-base"
                >
                  <i className="ri-settings-3-line mr-2"></i>
                  Manage Availability
                </button>
              </div>

              {/* Recent Activity Card */}
              {/* <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-emerald-600 text-xs sm:text-sm"></i>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-900 font-medium">Appointment confirmed</p>
                      <p className="text-xs text-slate-500">Sarah Wilson - 2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-calendar-event-line text-blue-600 text-xs sm:text-sm"></i>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-900 font-medium">New request received</p>
                      <p className="text-xs text-slate-500">Emma Davis - 3 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-calendar-check-line text-orange-600 text-xs sm:text-sm"></i>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-900 font-medium">Appointment rescheduled</p>
                      <p className="text-xs text-slate-500">Michael Johnson - 1 day ago</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal edit */}
      {modalAppointment.open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                {modalAppointment.type === "create" && "Create New Appointment"}
                {modalAppointment.type === "edit" && "Edit Appointment"}
                {modalAppointment.type === "view" && "Appointment Details"}
              </h2>
              <button
                onClick={() => setModalAppointment({ open: false })}
                className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer"
              >
                <i className="ri-close-line text-slate-600 text-xl"></i>
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              {(modalAppointment.type === "create" ||
                modalAppointment.type === "edit") ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      name="patient"
                      value={editForm.patient || ""}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Appointment Type
                    </label>
                    <input
                      type="text"
                      name="type"
                      value={editForm.type || ""}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter appointment type"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone || ""}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={editForm.notes || ""}
                      onChange={handleFormChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Additional notes"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="flex">
                    <strong className="w-1/3 text-slate-700">Patient:</strong>
                    <span className="w-2/3">
                      {modalAppointment.appointment?.patient}
                    </span>
                  </div>
                  <div className="flex">
                    <strong className="w-1/3 text-slate-700">Type:</strong>
                    <span className="w-2/3">
                      {modalAppointment.appointment?.type}
                    </span>
                  </div>
                  <div className="flex">
                    <strong className="w-1/3 text-slate-700">Time:</strong>
                    <span className="w-2/3">
                      {modalAppointment.appointment?.time}
                    </span>
                  </div>
                  <div className="flex">
                    <strong className="w-1/3 text-slate-700">Phone:</strong>
                    <span className="w-2/3">
                      {modalAppointment.appointment?.phone}
                    </span>
                  </div>
                  <div className="flex">
                    <strong className="w-1/3 text-slate-700">Status:</strong>
                    <span className="w-2/3">
                      {modalAppointment.appointment?.status}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-slate-700 mb-1">Notes:</strong>
                    <p className="text-slate-600 text-sm">
                      {modalAppointment.appointment?.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end space-x-3">
              {modalAppointment.type !== "view" && (
                <button
                  onClick={handleSaveAppointment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  {modalAppointment.type === "create"
                    ? "Create Appointment"
                    : "Save Changes"}
                </button>
              )}

              <button
                onClick={() => setModalAppointment({ open: false })}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {modalAppointment.type === "view" ? "Close" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {showRequestDetails && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Appointment Request Details</h2>
                  <p className="text-slate-600 text-sm sm:text-base">{selectedRequest.id}</p>
                </div>
                <button
                  onClick={() => setShowRequestDetails(false)}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-slate-600 text-lg sm:text-xl"></i>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Patient Name</label>
                  <p className="text-slate-900 font-semibold">{selectedRequest.patient}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Request Status</label>
                  <span
                    className={`inline-block px-2.5 py-1 text-xs font-medium rounded border ${getStatusColor(
                      selectedRequest.status
                    )}`}
                  >
                    {selectedRequest.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Requested Date</label>
                  <p className="text-slate-900">{selectedRequest.requestedDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Requested Time</label>
                  <p className="text-slate-900">{selectedRequest.requestedTime}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Contact Phone</label>
                  <p className="text-slate-900">{selectedRequest.contact}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Email</label>
                  <p className="text-slate-900">{selectedRequest.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Medical Condition</label>
                  <p className="text-slate-900">{selectedRequest.condition}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Duration Needed</label>
                  <p className="text-slate-900">{selectedRequest.duration}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Request Notes</label>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <p className="text-slate-900">{selectedRequest.notes}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 flex flex-col sm:flex-row sm:justify-between gap-3">
              <button
                onClick={() => setShowRequestDetails(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap w-full sm:w-auto"
              >
                Close
              </button>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleReschedule(selectedRequest)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap w-full sm:w-auto"
                >
                  <i className="ri-calendar-event-line mr-2"></i>
                  Reschedule
                </button>
                <button
                  onClick={() => handleApproveRequest(selectedRequest.id)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap w-full sm:w-auto"
                >
                  <i className="ri-check-line mr-2"></i>
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && rescheduleRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Reschedule Appointment</h2>
                  <p className="text-slate-600">{rescheduleRequest.patient}</p>
                </div>
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-slate-600"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">New Date</label>
                <input
                  type="date"
                  value={rescheduleForm.newDate}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, newDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">New Time</label>
                <select
                  value={rescheduleForm.newTime}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, newTime: e.target.value })}
                  className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select time slot</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="9:30 AM">9:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="2:30 PM">2:30 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="3:30 PM">3:30 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="4:30 PM">4:30 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Reason for Rescheduling</label>
                <textarea
                  value={rescheduleForm.reason}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, reason: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Optional reason for patient notification"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifyPatient"
                  checked={rescheduleForm.notifyPatient}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, notifyPatient: e.target.checked })}
                  className="w-4 h-4 text-blue-600 mr-3"
                />
                <label htmlFor="notifyPatient" className="text-sm text-slate-700 cursor-pointer">
                  Send notification to patient
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-between">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleRescheduleConfirm}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-check-line mr-2"></i>
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && cancelRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">Cancel Appointment Request</h2>
                  <p className="text-slate-600 text-sm sm:text-base">{cancelRequest.patient}</p>
                </div>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-slate-600 text-lg"></i>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Warning Box */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <i className="ri-alert-line text-red-600 text-xl"></i>
                  <div>
                    <h4 className="text-red-800 font-medium">Confirm Cancellation</h4>
                    <p className="text-red-700 text-sm">
                      This action will cancel the appointment request and notify the patient.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Cancellation Reason</label>
                <select
                  value={cancelForm.reason}
                  onChange={(e) => setCancelForm({ ...cancelForm, reason: e.target.value })}
                  className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                >
                  <option value="">Select reason</option>
                  <option value="schedule-conflict">Schedule Conflict</option>
                  <option value="medical-unavailable">Medical Unavailability</option>
                  <option value="insufficient-info">Insufficient Information</option>
                  <option value="outside-scope">Outside Scope of Practice</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes for Patient</label>
                <textarea
                  value={cancelForm.notes}
                  onChange={(e) => setCancelForm({ ...cancelForm, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  rows={3}
                  placeholder="Optional message for the patient"
                />
              </div>

              {/* Refund */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="refundRequired"
                  checked={cancelForm.refundRequired}
                  onChange={(e) => setCancelForm({ ...cancelForm, refundRequired: e.target.checked })}
                  className="w-4 h-4 text-red-600 mr-3"
                />
                <label htmlFor="refundRequired" className="text-sm text-slate-700 cursor-pointer">
                  Process refund (if payment was made)
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap w-full sm:w-auto"
              >
                Keep Appointment
              </button>
              <button
                onClick={handleCancelConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap w-full sm:w-auto"
              >
                <i className="ri-close-line mr-2"></i>
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {showAddAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Add New Appointment</h2>
                  <p className="text-slate-600">Schedule a new patient appointment</p>
                </div>
                <button
                  onClick={() => setShowAddAppointment(false)}
                  className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-slate-600 text-xl"></i>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Patient Name *</label>
                  <input
                    type="text"
                    value={newAppointment.patientName}
                    onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter patient full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newAppointment.email}
                    onChange={(e) => setNewAppointment({ ...newAppointment, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="patient@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newAppointment.phone}
                    onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+61 400 000 000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Appointment Type</label>
                  <select
                    value={newAppointment.appointmentType}
                    onChange={(e) => setNewAppointment({ ...newAppointment, appointmentType: e.target.value })}
                    className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="consultation">Medical Consultation</option>
                    <option value="certificate">Certificate Request</option>
                    <option value="followup">Follow-up Appointment</option>
                    <option value="assessment">Medical Assessment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Time *</label>
                  <select
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                    className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="9:30 AM">9:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="2:30 PM">2:30 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="3:30 PM">3:30 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="4:30 PM">4:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Priority Level</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input
                      type="radio"
                      name="priority"
                      value="standard"
                      checked={newAppointment.priority === 'standard'}
                      onChange={(e) => setNewAppointment({ ...newAppointment, priority: e.target.value })}
                      className="w-4 h-4 text-blue-600 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Standard</span>
                      <p className="text-xs text-slate-500">Regular appointment</p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input
                      type="radio"
                      name="priority"
                      value="urgent"
                      checked={newAppointment.priority === 'urgent'}
                      onChange={(e) => setNewAppointment({ ...newAppointment, priority: e.target.value })}
                      className="w-4 h-4 text-red-600 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Urgent</span>
                      <p className="text-xs text-slate-500">Priority scheduling</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Appointment Notes</label>
                <textarea
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Any additional notes or patient requirements..."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between gap-3">
              <button
                onClick={() => setShowAddAppointment(false)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAppointment}
                className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"
              >
                <i className="ri-calendar-check-line mr-2"></i>
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Calendar Modal */}
      {showFullCalendar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-y-auto">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Title & Icon */}
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <i className="ri-calendar-line text-white text-lg sm:text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Full Calendar View</h2>
                    <p className="text-slate-600 text-sm sm:text-base">Manage your complete schedule</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 sm:space-x-3 self-end sm:self-auto">
                  <button
                    onClick={() => setShowAddAppointment(true)}
                    className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-sm sm:text-base"
                  >
                    <i className="ri-add-line mr-1 sm:mr-2"></i>
                    Add Appointment
                  </button>
                  <button
                    onClick={() => setShowFullCalendar(false)}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-white hover:bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors border border-slate-200"
                  >
                    <i className="ri-close-line text-slate-600 text-lg sm:text-xl"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              {/* Calendar Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <button
                    onClick={() => navigateCalendar(-1)}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <i className="ri-arrow-left-line text-slate-600"></i>
                  </button>
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-900">
                    {calendarDate.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={() => navigateCalendar(1)}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <i className="ri-arrow-right-line text-slate-600"></i>
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:space-x-3 text-xs sm:text-sm">
                  <button
                    onClick={goToToday}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Today
                  </button>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full mr-1.5 sm:mr-2"></div>
                      <span className="text-slate-600">Confirmed</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-500 rounded-full mr-1.5 sm:mr-2"></div>
                      <span className="text-slate-600">Pending</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
                {/* Day Headers */}
                <div className="grid grid-cols-7 min-w-[700px] bg-slate-50 border-b border-slate-200">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div
                      key={day}
                      className="p-2 sm:p-4 text-center text-xs sm:text-sm font-medium text-slate-600 border-r border-slate-200 last:border-r-0"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 min-w-[700px]">
                  {getCalendarDays().map((day, index) => (
                    <div
                      key={index}
                      onClick={() => handleCalendarDateClick(day)}
                      className={`min-h-[100px] sm:min-h-[120px] border-r border-b border-slate-200 last:border-r-0 p-1.5 sm:p-2 cursor-pointer hover:bg-slate-50 transition-colors 
                ${!day.isCurrentMonth ? 'bg-slate-50/50 text-slate-400' : ''} 
                ${day.isToday ? 'bg-blue-50 border-blue-200' : ''}`}
                    >
                      <div
                        className={`text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${day.isToday ? 'text-blue-700' : day.isCurrentMonth ? 'text-slate-900' : 'text-slate-400'}`}
                      >
                        {day.date.getDate()}
                      </div>

                      <div className="space-y-1">
                        {day.appointments.slice(0, 2).map((appointment, aptIndex) => (
                          <div
                            key={aptIndex}
                            className={`text-[10px] sm:text-xs p-1.5 rounded text-white truncate ${appointment.status === 'confirmed' ? 'bg-emerald-500' : 'bg-amber-500'
                              }`}
                            title={`${appointment.time} - ${appointment.patient} (${appointment.type})`}
                          >
                            <div className="font-medium">{appointment.time}</div>
                            <div className="truncate">{appointment.patient}</div>
                          </div>
                        ))}
                        {day.appointments.length > 2 && (
                          <div className="text-[10px] sm:text-xs text-slate-500 font-medium">
                            +{day.appointments.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Date Details */}
              {selectedCalendarDate && (
                <div className="mt-4 sm:mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <h4 className="text-base sm:text-lg font-semibold text-slate-900">
                      Appointments for{" "}
                      {selectedCalendarDate.toLocaleDateString("en-AU", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h4>
                    <button
                      onClick={() => setShowAddAppointment(true)}
                      className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-sm"
                    >
                      <i className="ri-add-line mr-1 sm:mr-2"></i>
                      Add Appointment
                    </button>
                  </div>

                  {/* No Appointment Case */}
                  {(() => {
                    const dayAppointments = calendarAppointments.filter(
                      (apt) => apt.date === selectedCalendarDate.toISOString().split("T")[0]
                    );

                    if (dayAppointments.length === 0) {
                      return (
                        <div className="text-center py-6 sm:py-8">
                          <i className="ri-calendar-line text-3xl sm:text-4xl text-slate-400 mb-2 sm:mb-3 block"></i>
                          <p className="text-slate-600 mb-3 sm:mb-4 text-sm sm:text-base">
                            No appointments scheduled for this date
                          </p>
                          <button
                            onClick={() => setShowAddAppointment(true)}
                            className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap text-sm sm:text-base"
                          >
                            Schedule Appointment
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-3">
                        {dayAppointments.map((appointment, index) => (
                          <div
                            key={index}
                            className="bg-white border border-slate-200 rounded-lg p-3 sm:p-4 hover:shadow-sm transition-all"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div className="flex items-start sm:items-center">
                                <div
                                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2 sm:mr-3 ${appointment.status === "confirmed" ? "bg-emerald-500" : "bg-amber-500"
                                    }`}
                                ></div>
                                <div>
                                  <h5 className="font-semibold text-slate-900 text-sm sm:text-base">
                                    {appointment.patient}
                                  </h5>
                                  <p className="text-xs sm:text-sm text-slate-600">{appointment.type}</p>
                                  <div className="flex flex-wrap items-center mt-1 text-[10px] sm:text-xs text-slate-500 gap-1">
                                    <i className="ri-time-line"></i>
                                    <span>{appointment.time}</span>
                                    <span>•</span>
                                    <span
                                      className={`capitalize ${appointment.status === "confirmed"
                                        ? "text-emerald-600"
                                        : "text-amber-600"
                                        }`}
                                    >
                                      {appointment.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <button
                                  onClick={() => handleCallPatient('+61 412 345 678')}
                                  className="text-blue-600 hover:text-blue-700 cursor-pointer"
                                  title="Call Patient"
                                >
                                  <i className="ri-phone-line text-base sm:text-lg"></i>
                                </button>
                                <button
                                  onClick={() => handleOpenModal('edit')}
                                  // onClick={() => setModalAppointment({ open: true })}
                                  className="text-slate-600 hover:text-slate-700 cursor-pointer"
                                  title="Edit Appointment"
                                >
                                  <i className="ri-edit-line text-base sm:text-lg"></i>
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-700 cursor-pointer"
                                  title="Cancel Appointment"
                                  onClick={handleDeleteClick}
                                >
                                  <i className="ri-delete-bin-line text-base sm:text-lg"></i>
                                </button>

                               
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {showAppointmentDetails && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Appointment Details</h2>
                  <p className="text-slate-600">{selectedAppointment.patient}</p>
                </div>
                <button
                  onClick={() => setShowAppointmentDetails(false)}
                  className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-slate-600"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Date</label>
                  <p className="text-slate-900">{selectedAppointment.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Time</label>
                  <p className="text-slate-900">{selectedAppointment.time}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Type</label>
                  <p className="text-slate-900">{selectedAppointment.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Status</label>
                  <span
                    className={`inline-block px-2.5 py-1 text-xs font-medium rounded border capitalize ${selectedAppointment.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}
                  >
                    {selectedAppointment.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Contact</label>
                  <p className="text-slate-900">{selectedAppointment.contact}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Notes</label>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <p className="text-slate-900">{selectedAppointment.notes}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-between">
              <button
                onClick={() => setShowAppointmentDetails(false)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Close
              </button>
              <div className="flex space-x-3">
                {/* <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-phone-line mr-2"></i>
                  Call Patient
                </button> */}
                <button className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap" onClick={() => handleOpenModal('edit')}>
                  <i className="ri-edit-line mr-2"></i>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close more menu */}
      {showMoreMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowMoreMenu(null)}></div>
      )}

      {/* Manage Availability Modal */}
      {showManageAvailability && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-700 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <i className="ri-settings-3-line text-white text-lg sm:text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Manage Availability</h2>
                    <p className="text-slate-600 text-sm sm:text-base">Configure your working hours and availability settings</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowManageAvailability(false)}
                  className="w-10 h-10 bg-white hover:bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors border border-slate-200 self-end sm:self-auto"
                >
                  <i className="ri-close-line text-slate-600 text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
              {/* General Settings */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="ri-toggle-line text-emerald-600"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">General Availability Settings</h3>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Current Status</label>
                      <select
                        value={tempAvailability.status || 'available'}
                        onChange={(e) => handleAvailabilityChange('status', e.target.value)}
                        className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                      >
                        <option value="available">Available</option>
                        <option value="busy">Busy</option>
                        <option value="unavailable">Temporarily Unavailable</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Appointment Duration (min)</label>
                      <input
                        type="number"
                        value={tempAvailability.appointmentDuration || 30}
                        onChange={(e) => handleAvailabilityChange('appointmentDuration', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                        min="15"
                        max="120"
                        step="15"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Buffer Time (min)</label>
                      <input
                        type="number"
                        value={tempAvailability.bufferTime || 15}
                        onChange={(e) => handleAvailabilityChange('bufferTime', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                        min="0"
                        max="60"
                        step="5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Max Advance Booking (days)</label>
                      <input
                        type="number"
                        value={tempAvailability.maxAdvanceBooking || 30}
                        onChange={(e) => handleAvailabilityChange('maxAdvanceBooking', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                        min="1"
                        max="365"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Time Zone</label>
                      <select
                        value={tempAvailability.timezone || 'Australia/Melbourne'}
                        onChange={(e) => handleAvailabilityChange('timezone', e.target.value)}
                        className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                      >
                        <option value="Australia/Melbourne">Melbourne (AEDT)</option>
                        <option value="Australia/Sydney">Sydney (AEDT)</option>
                        <option value="Australia/Brisbane">Brisbane (AEST)</option>
                        <option value="Australia/Perth">Perth (AWST)</option>
                        <option value="Australia/Adelaide">Adelaide (ACDT)</option>
                      </select>
                    </div>

                    <div className="flex flex-col space-y-3">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempAvailability.autoAcceptBookings || false}
                          onChange={(e) => handleAvailabilityChange('autoAcceptBookings', e.target.checked)}
                          className="w-4 h-4 text-slate-600 mr-3"
                        />
                        <span className="text-sm text-slate-700">Auto-accept bookings</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempAvailability.emergencySlots || false}
                          onChange={(e) => handleAvailabilityChange('emergencySlots', e.target.checked)}
                          className="w-4 h-4 text-slate-600 mr-3"
                        />
                        <span className="text-sm text-slate-700">Allow emergency slots</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempAvailability.weekendAvailability || false}
                          onChange={(e) => handleAvailabilityChange('weekendAvailability', e.target.checked)}
                          className="w-4 h-4 text-slate-600 mr-3"
                        />
                        <span className="text-sm text-slate-700">Weekend availability</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Schedule */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div className="flex items-center mb-3 sm:mb-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-calendar-week-line text-blue-600"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Weekly Working Hours</h3>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <i className="ri-information-line mr-1"></i>
                    <span className="hidden xs:inline">Configure your availability for each day</span>
                    <span className="xs:hidden">Configure daily availability</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(tempAvailability.workingHours || {}).map(([day, schedule]) => (
                    <div key={day} className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                        <div className="flex items-center mb-3 sm:mb-0">
                          <label className="flex items-center cursor-pointer mr-4">
                            <input
                              type="checkbox"
                              checked={schedule.enabled || false}
                              onChange={(e) => handleWorkingHoursChange(day, 'enabled', e.target.checked)}
                              className="w-4 h-4 text-slate-600 mr-3"
                            />
                            <span className="text-lg font-medium text-slate-900 capitalize">{day}</span>
                          </label>
                          {!schedule.enabled && (
                            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded border border-slate-200">
                              Closed
                            </span>
                          )}
                        </div>
                        {schedule.enabled && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => copyDaySchedule('monday', day)}
                              className="text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                              title="Copy Monday's schedule"
                            >
                              Copy Monday
                            </button>
                            <span className="text-slate-300">|</span>
                            <button
                              onClick={() => handleWorkingHoursChange(day, 'enabled', false)}
                              className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                              title="Close this day"
                            >
                              Close Day
                            </button>
                          </div>
                        )}
                      </div>

                      {schedule.enabled && (
                        <div className="space-y-4">
                          {/* Working Hours */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">Start Time</label>
                              <input
                                type="time"
                                value={schedule.start || '09:00'}
                                onChange={(e) => handleWorkingHoursChange(day, 'start', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">End Time</label>
                              <input
                                type="time"
                                value={schedule.end || '17:00'}
                                onChange={(e) => handleWorkingHoursChange(day, 'end', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>

                          {/* Break Times */}
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <label className="text-sm font-medium text-slate-700">Break Times</label>
                              <button
                                onClick={() => addBreakTime(day)}
                                className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer flex items-center"
                              >
                                <i className="ri-add-line mr-1"></i>
                                Add Break
                              </button>
                            </div>

                            {schedule.breaks && schedule.breaks.length > 0 ? (
                              <div className="space-y-2">
                                {schedule.breaks.map((breakTime, index) => (
                                  <div key={index} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 bg-slate-50 border border-slate-200 rounded-lg p-3">
                                    <input
                                      type="time"
                                      value={breakTime.start || '12:00'}
                                      onChange={(e) => updateBreakTime(day, index, 'start', e.target.value)}
                                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <span className="text-slate-500 hidden sm:block">to</span>
                                    <span className="text-slate-500 sm:hidden text-center">-</span>
                                    <input
                                      type="time"
                                      value={breakTime.end || '13:00'}
                                      onChange={(e) => updateBreakTime(day, index, 'end', e.target.value)}
                                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <button
                                      onClick={() => removeBreakTime(day, index)}
                                      className="text-red-500 hover:text-red-700 cursor-pointer mt-2 sm:mt-0 self-end sm:self-auto"
                                      title="Remove break"
                                    >
                                      <i className="ri-delete-bin-line"></i>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                                No breaks scheduled. Click "Add Break" to add break times.
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Unavailable Periods */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div className="flex items-center mb-3 sm:mb-0">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-calendar-close-line text-red-600"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Unavailable Periods</h3>
                  </div>
                  <button
                    onClick={() => setShowUnavailablePeriod(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap text-sm self-start sm:self-auto"
                  >
                    <i className="ri-add-line mr-2"></i>
                    Add Period
                  </button>
                </div>

                <div className="space-y-3">
                  {tempAvailability.unavailablePeriods && tempAvailability.unavailablePeriods.length > 0 ? (
                    tempAvailability.unavailablePeriods.map((period) => (
                      <div key={period.id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div className="flex-1 mb-3 sm:mb-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h4 className="font-medium text-red-900">{period.title}</h4>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded ${period.reason === 'vacation' ? 'bg-blue-100 text-blue-800' : period.reason === 'medical' ? 'bg-yellow-100 text-yellow-800' : period.reason === 'conference' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-800'}`}
                              >
                                {period.reason}
                              </span>
                              {period.recurring && (
                                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                                  Recurring
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-red-700">
                              <span>
                                <i className="ri-calendar-line mr-1"></i>
                                {period.startDate}
                              </span>
                              {period.endDate && (
                                <>
                                  <span className="hidden sm:inline">→</span>
                                  <span>{period.endDate}</span>
                                </>
                              )}
                              {period.startTime && (
                                <span>
                                  <i className="ri-time-line mr-1"></i>
                                  {period.startTime} - {period.endTime}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => removeUnavailablePeriod(period.id)}
                            className="text-red-500 hover:text-red-700 cursor-pointer self-end sm:self-auto"
                            title="Remove period"
                          >
                            <i className="ri-delete-bin-line text-lg"></i>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-slate-50 border border-slate-200 rounded-lg">
                      <i className="ri-calendar-check-line text-4xl text-slate-400 mb-3 block"></i>
                      <p className="text-slate-600 mb-4">No unavailable periods scheduled</p>
                      <button
                        onClick={() => setShowUnavailablePeriod(true)}
                        className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Add Unavailable Period
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Preview Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mb-3 sm:mb-0">
                    <i className="ri-eye-line text-blue-600"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-blue-900 mb-3">Availability Preview</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-blue-800 mb-2">Current Settings:</h5>
                        <ul className="text-blue-700 space-y-1">
                          <li>• Status: {tempAvailability.status === 'available' ? 'Available' : 'Unavailable'}</li>
                          <li>• Appointment Duration: {tempAvailability.appointmentDuration || 30} minutes</li>
                          <li>• Buffer Time: {tempAvailability.bufferTime || 15} minutes</li>
                          <li>• Auto-Accept: {tempAvailability.autoAcceptBookings ? 'Enabled' : 'Disabled'}</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-800 mb-2">Weekly Schedule:</h5>
                        <ul className="text-blue-700 space-y-1">
                          {Object.entries(tempAvailability.workingHours || {}).map(([day, schedule]) => (
                            <li key={day} className="capitalize">
                              • {day}: {schedule.enabled ? `${schedule.start} - ${schedule.end}` : 'Closed'}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center text-sm text-slate-600">
                <i className="ri-save-line mr-2 text-slate-500"></i>
                Changes will be saved immediately
              </div>

              <div className="flex flex-col-reverse xs:flex-row space-y-reverse space-y-4 xs:space-y-0 xs:space-x-3 w-full xs:w-auto">
                <button
                  onClick={() => setShowManageAvailability(false)}
                  className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap w-full xs:w-auto text-center"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAvailability}
                  className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center w-full xs:w-auto"
                >
                  <i className="ri-save-line mr-2"></i>
                  Save Availability Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Unavailable Period Modal */}
      {showUnavailablePeriod && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 bg-gradient-to-r from-red-50 to-orange-50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4 shrink-0">
                    <i className="ri-calendar-close-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Add Unavailable Period</h2>
                    <p className="text-slate-600 text-sm sm:text-base">
                      Block time when you're not available for appointments
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUnavailablePeriod(false)}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-white hover:bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors border border-slate-200"
                >
                  <i className="ri-close-line text-slate-600 text-lg sm:text-xl"></i>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={newUnavailablePeriod.title}
                  onChange={(e) => setNewUnavailablePeriod({ ...newUnavailablePeriod, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                  placeholder="e.g., Annual Leave, Conference, Medical Appointment"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={newUnavailablePeriod.startDate}
                    onChange={(e) => setNewUnavailablePeriod({ ...newUnavailablePeriod, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={newUnavailablePeriod.endDate}
                    onChange={(e) => setNewUnavailablePeriod({ ...newUnavailablePeriod, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                    min={newUnavailablePeriod.startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Times */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Start Time (Optional)</label>
                  <input
                    type="time"
                    value={newUnavailablePeriod.startTime}
                    onChange={(e) => setNewUnavailablePeriod({ ...newUnavailablePeriod, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">End Time (Optional)</label>
                  <input
                    type="time"
                    value={newUnavailablePeriod.endTime}
                    onChange={(e) => setNewUnavailablePeriod({ ...newUnavailablePeriod, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Reason</label>
                <select
                  value={newUnavailablePeriod.reason}
                  onChange={(e) => setNewUnavailablePeriod({ ...newUnavailablePeriod, reason: e.target.value })}
                  className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                >
                  <option value="personal">Personal</option>
                  <option value="vacation">Vacation</option>
                  <option value="medical">Medical Appointment</option>
                  <option value="conference">Conference/Training</option>
                  <option value="emergency">Emergency</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes</label>
                <textarea
                  value={newUnavailablePeriod.notes}
                  onChange={(e) => setNewUnavailablePeriod({ ...newUnavailablePeriod, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm sm:text-base"
                  rows={3}
                  placeholder="Optional notes about this unavailable period"
                />
              </div>

              {/* Recurring */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={newUnavailablePeriod.recurring}
                  onChange={(e) => setNewUnavailablePeriod({ ...newUnavailablePeriod, recurring: e.target.checked })}
                  className="w-4 h-4 text-red-600 mr-2"
                />
                <label htmlFor="recurring" className="text-sm text-slate-700 cursor-pointer">
                  Recurring period (repeat weekly/monthly)
                </label>
              </div>

              {/* Notes Section */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start">
                  <i className="ri-information-line text-orange-600 mt-0.5 mr-3"></i>
                  <div className="text-sm">
                    <p className="text-orange-800 font-medium mb-1">Important Notes:</p>
                    <ul className="text-orange-700 space-y-1 list-disc pl-4">
                      <li>Existing appointments during this period will need to be rescheduled manually</li>
                      <li>Patients will not be able to book appointments during unavailable periods</li>
                      <li>If no end date is specified, this will be a single day period</li>
                      <li>Time slots are optional - leave blank to block the entire day(s)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row justify-end sm:justify-between gap-3">
              <button
                onClick={() => setShowUnavailablePeriod(false)}
                className="px-5 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUnavailablePeriod}
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center text-sm sm:text-base"
              >
                <i className="ri-calendar-close-line mr-2"></i>
                Add Unavailable Period
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
