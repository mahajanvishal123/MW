import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Utilities/axiosInstance";
import BaseUrl from "../../../Utilities/BaseUrl";
import { RiCheckboxCircleFill, RiTimeFill, RiCloseCircleFill, RiFileTextFill } from "react-icons/ri";

const MyCertificateHeader = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    approved: 0,
    pending: 0,
    declined: 0,
    total: 0,
  });

  // Get user ID from localStorage
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

  useEffect(() => {
    if (!userId) {
      setError("User ID not found");
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axiosInstance.get(
          `${BaseUrl}/practioner/practionerCertificateDashboard/${userId}`
        );

        const data = res?.data;
        if (!data || typeof data !== "object") {
          throw new Error("Invalid response format");
        }

        setStats({
          approved: Number(data.approved) || 0,
          pending: Number(data.pending) || 0,
          declined: Number(data.declined) || 0,
          total: Number(data.total) || 0,
        });
      } catch (err) {
        console.error("Error fetching certificate stats:", err);
        if (err.response) setError(`Server error: ${err.response.status}`);
        else if (err.request) setError("Network error: No response from server");
        else setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  if (loading) return <p className="p-4">Loading certificate stats...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  const cards = [
    {
      label: "Total",
      value: stats.total,
      icon: <RiFileTextFill size={24} className="text-blue-600" />,
      bg: "bg-blue-100",
      text: "text-slate-900",
    },
    {
      label: "Approved",
      value: stats.approved,
      icon: <RiCheckboxCircleFill size={24} className="text-emerald-600" />,
      bg: "bg-emerald-100",
      text: "text-emerald-700",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: <RiTimeFill size={24} className="text-orange-600" />,
      bg: "bg-orange-100",
      text: "text-orange-700",
    },
    {
      label: "Declined",
      value: stats.declined,
      icon: <RiCloseCircleFill size={24} className="text-red-600" />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-slate-500 font-medium">{card.label}</p>
            <p className={`text-3xl font-bold ${card.text}`}>{card.value}</p>
          </div>
          <div className={`${card.bg} w-12 h-12 rounded-lg flex items-center justify-center`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCertificateHeader;
