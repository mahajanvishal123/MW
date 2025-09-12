import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BaseUrl from "../../../Utilities/BaseUrl";
import axiosInstance from "../../../Utilities/axiosInstance";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [statsState, setStatsState] = useState({
    totalCertificates: 0,
    pendingRequests: 0,
    approvalRate: 0,
    todayAppointments: 0,
    patientRating: 0,
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  // localStorage se user object nikalna
  const storedUser = localStorage.getItem("user");
  let userId = null;
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      userId = parsedUser?.id || null;
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
    }
  }

  console.log("User ID:", userId);

  useEffect(() => {
    if (!userId) {
      setError("User ID not found");
      setLoading(false);
      return;
    }

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axiosInstance.get(
          `${BaseUrl}/practioner/practionerDashboardMain/${userId}`,
          { timeout: 10000 } // optional timeout
        );

        const data = res?.data;
        if (!data || typeof data !== "object") {
          throw new Error("Invalid response format");
        }

        setStatsState({
          totalCertificates: data?.certificates?.totalCertificates || 0,
          pendingRequests: data?.certificates?.pendingCertificates || 0,
          approvalRate:
            Number(data?.certificates?.approvedCertificates || 0) +
              Number(data?.certificates?.declinedCertificates || 0) >
            0
              ? Math.round(
                  (Number(data?.certificates?.approvedCertificates || 0) /
                    (Number(data?.certificates?.approvedCertificates || 0) +
                      Number(data?.certificates?.declinedCertificates || 0))) *
                    100
                )
              : 0,
          todayAppointments: 0,
          patientRating: 4.7,
        });

        setRecentRequests(Array.isArray(data?.recentRequest) ? data.recentRequest : []);
        setProfile(data?.profile || null);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        if (err.response) {
          setError(`Server error: ${err.response.status} ${err.response.statusText}`);
        } else if (err.request) {
          setError("Network error: No response from server");
        } else {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [userId]);

  if (loading) {
    return (
      <div className="p-5">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-5 flex">
      <div className="flex-1 flex flex-col min-h-screen">
        <header>
          <h1 className="text-2xl font-semibold mb-5">Dashboard</h1>
        </header>

        <div className="flex-1 overflow-y-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-600 font-medium">Total Certificates</p>
              <p className="text-3xl font-bold text-slate-900">
                {statsState.totalCertificates}
              </p>
            </div>

            <Link
              to={"/doctor/mycertificates"}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
            >
              <p className="text-sm text-slate-600 font-medium">Pending Requests</p>
              <p className="text-3xl font-bold text-orange-700">
                {statsState.pendingRequests}
              </p>
            </Link>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-600 font-medium">Approval Rate</p>
              <p className="text-3xl font-bold text-slate-900">
                {statsState.approvalRate}%
              </p>
            </div>
          </div>

          {/* Recent Requests */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-4 border-b border-slate-200 flex justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Recent Certificate Requests
                </h2>
                <Link
                  to="/doctor/mycertificates"
                  className="text-slate-700 hover:text-slate-900 text-sm"
                >
                  View All →
                </Link>
              </div>

              <div className="p-4 space-y-4">
                {recentRequests.length === 0 && (
                  <p className="text-slate-500 text-sm">No recent requests</p>
                )}

                {recentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-all"
                  >
                    <div className="flex justify-between mb-2">
                      <h3 className="font-semibold text-slate-900">
                        {request.full_name}
                      </h3>
                      <span className="text-xs text-slate-500">
                        {new Date(request.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">
                      Reason: {request.reason_for_leave}
                    </p>
                    <p className="text-sm text-slate-700">
                      Days: {request.certificate_day}
                    </p>
                    <p className="text-sm text-slate-700">
                      Status: {request.verify_certificate}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              {profile ? (
                <>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mr-3">
                      <i className="ri-user-heart-fill text-2xl text-slate-700"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {profile.full_name}
                      </h3>
                      <p className="text-slate-600 text-sm">{profile.user_type}</p>
                      <p className="text-xs text-emerald-700 font-medium">
                        {profile.status}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">AHPRA No:</span>
                      <span className="text-slate-900">
                        {profile.ahpr_registration_number}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Email:</span>
                      <span className="text-slate-900">{profile.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Phone:</span>
                      <span className="text-slate-900">{profile.phone}</span>
                    </div>
                  </div>

                
                </>
              ) : (
                <p className="text-slate-500">No profile data</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
