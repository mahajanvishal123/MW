import { Link } from 'react-router-dom';
;

export default function Dasbord() {
  

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
                      {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
                      </div> */}
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
            
            </div>
          </div>

          {/* Quick Approval Modal */}
          {/* Quick Approval Modal */}
       
       

     
      

      
        </div>
      </div>
    </div>
  );
}