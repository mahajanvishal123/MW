import React, { useState, useEffect } from "react";
import axios from "axios";
import BaseUrl from "../../../Utilities/BaseUrl";

const PaymentManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-100 text-emerald-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      case "refunded":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${BaseUrl}/payments`);
        const data = Array.isArray(res.data) ? res.data : [];

        const mapped = data.map((item, i) => {
          const safeId = item?.id ?? i + 1;
          const safeAmount = parseFloat(item?.amount) || 0;

          return {
            id: item?.transaction_id || `TXN-${i + 1}`,
            patient: item?.patient_name || `Patient #${item?.patient_id || "-"}`,
            patientEmail: item?.patient_email || "N/A",
            practitioner: item?.practitioner_id
              ? `Practitioner #${item.practitioner_id}`
              : "N/A",
            amount: safeAmount,
            method:
              item?.payment_method
                ?.replace(/_/g, " ")
                ?.replace(/\b\w/g, (c) => c.toUpperCase()) || "Unknown",
            status: item?.status
              ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
              : "Unknown",
            date: item?.payment_date
              ? new Date(item.payment_date).toLocaleString()
              : "N/A",
            certificateId: `MC-${safeId.toString().padStart(4, "0")}`,
          };
        });

        setTransactions(mapped);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError("Unable to fetch payments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Payment Transactions
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Track all recent payments from patients to practitioners
        </p>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="text-center py-6 text-slate-500">Loading...</div>
      )}
      {error && (
        <div className="text-center py-6 text-red-500">{error}</div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {[
                  "Transaction",
                  "Patient",
                  "Amount",
                  "Method",
                  "Status",
                  "Date",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {transactions.length > 0 ? (
                transactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className="hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-blue-600">
                        {txn.id}
                      </div>
                      <div className="text-xs text-slate-500">
                        {txn.certificateId}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-800">
                      <div className="font-medium">{txn.patient}</div>
                      <div className="text-xs text-slate-500">
                        {txn.patientEmail}
                      </div>
                    </td>

                   

                    <td className="px-6 py-4 font-semibold text-slate-900">
                      ${txn.amount.toFixed(2)}
                    </td>

                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-800">
                        {txn.method}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          txn.status
                        )}`}
                      >
                        {txn.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-800 hidden sm:table-cell">
                      {txn.date}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <button className="text-red-600 hover:text-red-700">
                          <i className="ri-delete-bin-line text-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-6 text-slate-500 text-sm"
                  >
                    No payment records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
