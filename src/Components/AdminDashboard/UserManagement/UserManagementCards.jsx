import React, { useEffect, useState } from 'react';
import BaseUrl from '../../../Utilities/BaseUrl';

const UserManagementCards = () => {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    activeDoctors: 0,
    activePharmacists: 0
  });

  // Fetch dashboard stats
  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${BaseUrl}/user/dashboard`);
      const data = await res.json();
      setDashboard({
        totalUsers: data.totalUsers || 0,
        activeDoctors: data.activeDoctors || 0,
        activePharmacists: data.activePharmacists || 0
      });
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Total Users */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Users</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-900">{dashboard.totalUsers}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center">
              <i className="ri-team-fill text-lg sm:text-xl text-slate-600"></i>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">+12</span>
            <span className="text-slate-500 ml-2">this month</span>
          </div>
        </div>

        {/* Active Practitioners */}
       

        {/* Active Doctors */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-500 font-medium">Active Doctors</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">{dashboard.activeDoctors}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-heart-fill text-lg sm:text-xl text-blue-600"></i>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">Verified</span>
            <span className="text-slate-500 ml-2">Doctors</span>
          </div>
        </div>

        {/* Active Pharmacists */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-500 font-medium">Active Pharmacists</p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">{dashboard.activePharmacists}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-fill text-lg sm:text-xl text-purple-600"></i>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded">+8</span>
            <span className="text-slate-500 ml-2">new this week</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementCards;
