import { useState, useEffect } from 'react';
import axios from 'axios';
import BaseUrl from '../../../Utilities/BaseUrl';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeDoctors: 0,
    activePharmacists: 0,
    inactiveDoctors: 0,
    inactivePharmacists: 0,
    totalPatients: 0,
    totalCertificatesDay: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/user/admindashboard`);

      setStats({
        totalUsers: data.totalUsers || 0,
        activeDoctors: data.activeDoctors || 0,
        activePharmacists: data.activePharmacists || 0,
        inactiveDoctors: data.inactiveDoctors || 0,
        inactivePharmacists: data.inactivePharmacists || 0,
        totalPatients: data.totalPatients || 0,
        totalCertificatesDay: data.totalCertificatesDay || 0,
      });

      setRecentActivity(data.recentPatients || []);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header>
          <div className="px-8 py-6">
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm">
              Monitor and manage users, patients, and certificates
            </p>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard label="Total Users" value={stats.totalUsers} icon="ri-team-fill" iconColor="text-purple-600" bg="bg-purple-100" />
            <StatCard label="Active Doctors" value={stats.activeDoctors} icon="ri-user-heart-fill" iconColor="text-emerald-600" bg="bg-emerald-100" />
            <StatCard label="Active Pharmacists" value={stats.activePharmacists} icon="ri-user-smile-fill" iconColor="text-blue-600" bg="bg-blue-100" />
            <StatCard label="Inactive Doctors" value={stats.inactiveDoctors} icon="ri-user-unfollow-fill" iconColor="text-red-600" bg="bg-red-100" />
            <StatCard label="Inactive Pharmacists" value={stats.inactivePharmacists} icon="ri-user-unfollow-line" iconColor="text-orange-600" bg="bg-orange-100" />
            <StatCard label="Total Patients" value={stats.totalPatients} icon="ri-article-fill" iconColor="text-slate-600" bg="bg-slate-100" />
            <StatCard label="Certificates (Today)" value={stats.totalCertificatesDay} icon="ri-file-text-fill" iconColor="text-indigo-600" bg="bg-indigo-100" />
          </div>

          {/* Recent Patients */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900">Recent Patients</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.length === 0 ? (
                  <p className="text-center text-gray-500">No recent patients</p>
                ) : (
                  recentActivity.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-start justify-between p-5 bg-blue-50 border border-blue-100 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">
                          {patient.full_name}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          <span className="font-medium">Reason:</span> {patient.reason_for_leave}
                        </p>
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Certificate Day:</span> {patient.certificate_day}
                        </p>
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Status:</span> {patient.verify_certificate}
                        </p>
                      </div>
                      <span className="text-sm text-slate-500 ml-4 whitespace-nowrap">
                        {new Date(patient.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Stat Card
function StatCard({ label, value, icon, iconColor, bg }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{label}</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center`}>
          <i className={`${icon} text-xl ${iconColor}`}></i>
        </div>
      </div>
    </div>
  );
}
