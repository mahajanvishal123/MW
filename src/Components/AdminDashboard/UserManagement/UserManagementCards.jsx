import React, { useEffect, useState } from 'react';
import BaseUrl from '../../../Utilities/BaseUrl';

const UserManagementCards = () => {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    activeDoctors: 0,
    inactiveDoctors: 0,
    activePharmacists: 0,
    inactivePharmacists: 0
  });

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${BaseUrl}/user/dashboard`);
      const data = await res.json();
      setDashboard({
        totalUsers: data.totalUsers || 0,
        activeDoctors: data.activeDoctors || 0,
        inactiveDoctors: data.inactiveDoctors || 0,
        activePharmacists: data.activePharmacists || 0,
        inactivePharmacists: data.inactivePharmacists || 0,
      });
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* Total Users */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-sm text-slate-500 font-medium">Total Users</p>
        <p className="text-2xl sm:text-3xl font-bold text-slate-900">{dashboard.totalUsers}</p>
      </div>

      {/* Active Doctors */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-sm text-slate-500 font-medium">Active Doctors</p>
        <p className="text-2xl sm:text-3xl font-bold text-blue-600">{dashboard.activeDoctors}</p>
      </div>

      {/* Inactive Doctors */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-sm text-slate-500 font-medium">Inactive Doctors</p>
        <p className="text-2xl sm:text-3xl font-bold text-gray-600">{dashboard.inactiveDoctors}</p>
      </div>

      {/* Active Pharmacists */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-sm text-slate-500 font-medium">Active Pharmacists</p>
        <p className="text-2xl sm:text-3xl font-bold text-purple-600">{dashboard.activePharmacists}</p>
      </div>

      {/* Inactive Pharmacists */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-sm text-slate-500 font-medium">Inactive Pharmacists</p>
        <p className="text-2xl sm:text-3xl font-bold text-gray-600">{dashboard.inactivePharmacists}</p>
      </div>
    </div>
  );
};

export default UserManagementCards;
