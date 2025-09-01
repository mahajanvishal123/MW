import React, { useState } from 'react';

function TodaySchedule() {
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [modalAppointment, setModalAppointment] = useState({ open: false, type: '', appointment: null });
  const [editForm, setEditForm] = useState({});
  
  // Sample appointments data
  const appointments = [
    {
      id: 1,
      patient: 'Sarah Wilson',
      type: 'Medical Certificate Consultation',
      time: '10:00 AM - 10:30 AM',
      phone: '+61 412 345 678',
      status: 'Confirmed',
      notes: 'Patient needs medical certificate for work absence due to illness.'
    },
    {
      id: 2,
      patient: 'Michael Johnson',
      type: 'Follow-up Consultation',
      time: '2:30 PM - 3:00 PM',
      phone: '+61 423 456 789',
      status: 'Confirmed',
      notes: 'Follow-up on previous back injury treatment progress.'
    }
  ];

  // Handle opening modal
  const handleOpenModal = (type, appointment = null) => {
    setModalAppointment({ open: true, type, appointment });
    if (type === 'edit' && appointment) {
      setEditForm(appointment);
    }
  };

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle saving edited appointment
  const handleSaveAppointment = () => {
    // In a real app, you would update the appointment in your state or database
    console.log('Saving appointment:', editForm);
    setModalAppointment({ open: false });
  };

  // Handle calling patient
  const handleCallPatient = (phone) => {
    // In a real app, this would initiate a phone call
    console.log('Calling:', phone);
    alert(`Calling ${phone}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-xl font-semibold text-slate-900">Today's Schedule</h2>
          <p className="text-slate-600 mt-1">Tuesday, January 16, 2024</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-slate-600">
            <span className="font-medium text-emerald-600">{appointments.length}</span> appointments scheduled
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Appointment 1 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-center mb-3 sm:mb-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
              <i className="ri-user-heart-line text-emerald-600 text-base sm:text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Sarah Wilson</h3>
              <p className="text-xs sm:text-sm text-slate-600">Medical Certificate Consultation</p>
              <div className="flex flex-wrap items-center mt-1 text-xs text-slate-500">
                <i className="ri-time-line mr-1"></i>
                <span>10:00 AM - 10:30 AM</span>
                <span className="mx-2 hidden sm:inline">•</span>
                <span className="w-full sm:w-auto mt-1 sm:mt-0">+61 412 345 678</span>
              </div>
            </div>
          </div>
          <div className="text-left sm:text-right flex sm:block justify-between items-center">
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded border border-emerald-200">
              Confirmed
            </span>
            <div className="flex items-center sm:mt-2 space-x-2">
              <button 
                className="text-blue-600 hover:text-blue-700 cursor-pointer" 
                title="Call Patient"
                onClick={() => handleCallPatient('+61 412 345 678')}
              >
                <i className="ri-phone-line text-base sm:text-lg"></i>
              </button>
              <button 
                className="text-slate-600 hover:text-slate-700 cursor-pointer" 
                title="Edit Appointment"
                onClick={() => handleOpenModal('edit', appointments[0])}
              >
                <i className="ri-edit-line text-base sm:text-lg"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Appointment 2 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="flex items-center mb-3 sm:mb-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-200 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
              <i className="ri-user-line text-slate-600 text-base sm:text-lg"></i>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Michael Johnson</h3>
              <p className="text-xs sm:text-sm text-slate-600">Follow-up Consultation</p>
              <div className="flex flex-wrap items-center mt-1 text-xs text-slate-500">
                <i className="ri-time-line mr-1"></i>
                <span>2:30 PM - 3:00 PM</span>
                <span className="mx-2 hidden sm:inline">•</span>
                <span className="w-full sm:w-auto mt-1 sm:mt-0">+61 423 456 789</span>
              </div>
            </div>
          </div>
          <div className="text-left sm:text-right flex sm:block justify-between items-center">
            <span className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded border border-slate-200">
              Confirmed
            </span>
            <div className="flex items-center sm:mt-2 space-x-2">
              <button 
                className="text-blue-600 hover:text-blue-700 cursor-pointer" 
                title="Call Patient"
                onClick={() => handleCallPatient('+61 423 456 789')}
              >
                <i className="ri-phone-line text-base sm:text-lg"></i>
              </button>
              <button 
                className="text-slate-600 hover:text-slate-700 cursor-pointer" 
                title="Edit Appointment"
                onClick={() => handleOpenModal('edit', appointments[1])}
              >
                <i className="ri-edit-line text-base sm:text-lg"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Available Time Slot */}
        <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg text-center cursor-pointer"
             onClick={() => handleOpenModal('create')}>
          <div className="text-slate-500">
            <i className="ri-calendar-line text-xl sm:text-2xl mb-2 block"></i>
            <p className="font-medium text-sm sm:text-base">Available Time Slot</p>
            <p className="text-xs sm:text-sm">4:00 PM - 5:00 PM</p>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      {modalAppointment.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                {modalAppointment.type === 'create' && 'Create New Appointment'}
                {modalAppointment.type === 'edit' && 'Edit Appointment'}
                {modalAppointment.type === 'view' && 'Appointment Details'}
              </h2>
              <button
                onClick={() => setModalAppointment({ open: false })}
                className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer"
              >
                <i className="ri-close-line text-slate-600 text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              {(modalAppointment.type === 'create' || modalAppointment.type === 'edit') ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                    <input
                      type="text"
                      name="patient"
                      value={editForm.patient || ''}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Appointment Type</label>
                    <input
                      type="text"
                      name="type"
                      value={editForm.type || ''}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter appointment type"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                      <input
                        type="date"
                        name="date"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                      <input
                        type="time"
                        name="time"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone || ''}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                    <textarea
                      name="notes"
                      value={editForm.notes || ''}
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
                    <span className="w-2/3">{modalAppointment.appointment?.patient}</span>
                  </div>
                  <div className="flex">
                    <strong className="w-1/3 text-slate-700">Type:</strong>
                    <span className="w-2/3">{modalAppointment.appointment?.type}</span>
                  </div>
                  <div className="flex">
                    <strong className="w-1/3 text-slate-700">Time:</strong>
                    <span className="w-2/3">{modalAppointment.appointment?.time}</span>
                  </div>
                  <div className="flex">
                    <strong className="w-1/3 text-slate-700">Phone:</strong>
                    <span className="w-2/3">{modalAppointment.appointment?.phone}</span>
                  </div>
                  <div className="flex">
                    <strong className="w-1/3 text-slate-700">Status:</strong>
                    <span className="w-2/3">{modalAppointment.appointment?.status}</span>
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-slate-700 mb-1">Notes:</strong>
                    <p className="text-slate-600 text-sm">{modalAppointment.appointment?.notes}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              {modalAppointment.type !== 'view' && (
                <button
                  onClick={handleSaveAppointment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  {modalAppointment.type === 'create' ? 'Create Appointment' : 'Save Changes'}
                </button>
              )}
              
              <button
                onClick={() => setModalAppointment({ open: false })}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {modalAppointment.type === 'view' ? 'Close' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default TodaySchedule;