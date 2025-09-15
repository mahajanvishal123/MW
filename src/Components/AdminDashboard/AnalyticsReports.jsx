import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import BaseUrl from "../../Utilities/BaseUrl";

export default function AnalyticsReports() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${BaseUrl}/auth/getreports`);
        const data = await res.json();
        setReportData(data || {});
      } catch (err) {
        console.error("Failed to load reports:", err);
        setReportData({});
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const stats = {
    totalRevenue: reportData?.totalRevenue || 0,
    totalDoctors: reportData?.totalDoctors || 0,
    totalPatients: reportData?.totalPatients || 0,
    totalcertificte: reportData?.totalcertificte || 0,
  };

  // new chart data from actual stats
  const chartData = [
    { name: "Revenue", value: Number(stats.totalRevenue) },
    { name: "Certificates", value: Number(stats.totalcertificte) },
    { name: "Doctors", value: Number(stats.totalDoctors) },
    { name: "Patients", value: Number(stats.totalPatients) },
  ];

  if (loading) {
    return <div className="p-8 text-center text-slate-600">Loading reports...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-6">
            <h1 className="text-2xl font-bold text-slate-900">
              Reports & Analytics
            </h1>
            <p className="text-slate-600 text-sm">
              Business intelligence and data insights
            </p>
          </div>
        </header>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              label="Total Revenue"
              value={`$${stats.totalRevenue}`}
              icon="ri-money-dollar-circle-fill"
              color="emerald"
            />
            <StatCard
              label="Certificates Issued"
              value={stats.totalcertificte}
              icon="ri-file-text-fill"
              color="blue"
            />
            <StatCard
              label="Total Doctors"
              value={stats.totalDoctors}
              icon="ri-user-heart-fill"
              color="purple"
            />
            <StatCard
              label="Total Patients"
              value={stats.totalPatients}
              icon="ri-user-2-fill"
              color="orange"
            />
          </div>

          {/* New Graph Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Overall Metrics
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1d293d" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <i className={`${icon} text-xl text-${color}-600`}></i>
        </div>
      </div>
    </div>
  );
}
