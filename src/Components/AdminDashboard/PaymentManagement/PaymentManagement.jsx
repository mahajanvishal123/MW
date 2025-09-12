import React, { useState } from "react";

const PaymentManagement = () => {
  const [selectedTxn, setSelectedTxn] = useState(null);

  const recentTransactions = [
    {
      id: "TXN-2024-0156",
      patient: "John Smith",
      practitioner: "Dr. Sarah Johnson",
      amount: 79.0,
      type: "Doctor Certificate",
      status: "Completed",
      method: "Credit Card",
      date: "2024-01-15 14:30",
      certificateId: "MC-2024-0156",
    },
    {
      id: "TXN-2024-0155",
      patient: "Alice Brown",
      practitioner: "Emma Wilson",
      amount: 39.2,
      type: "Pharmacist Certificate",
      status: "Completed",
      method: "PayPal",
      date: "2024-01-15 12:15",
      certificateId: "MC-2024-0155",
    },
    {
      id: "TXN-2024-0154",
      patient: "Robert Davis",
      practitioner: "Dr. Michael Chen",
      amount: 79.0,
      type: "Doctor Certificate",
      status: "Pending",
      method: "Bank Transfer",
      date: "2024-01-15 11:45",
      certificateId: "MC-2024-0154",
    },
    {
      id: "TXN-2024-0153",
      patient: "Maria Garcia",
      practitioner: "Dr. James Miller",
      amount: 79.0,
      type: "Doctor Certificate",
      status: "Failed",
      method: "Credit Card",
      date: "2024-01-15 09:20",
      certificateId: "MC-2024-0153",
    },
    {
      id: "TXN-2024-0152",
      patient: "David Wilson",
      practitioner: "Lisa Thompson",
      amount: 63.2,
      type: "Pharmacist Certificate",
      status: "Refunded",
      method: "Credit Card",
      date: "2024-01-14 16:30",
      certificateId: "MC-2024-0152",
    },
  ];

  // Status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      case "Refunded":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          💰 Payment Transactions
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Track all recent payments from patients to practitioners
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {[
                "Transaction",
                "Patient",
                "Practitioner",
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
            {recentTransactions.map((txn) => (
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
                <td className="px-6 py-4 text-slate-800">{txn.patient}</td>
                <td className="px-6 py-4 text-slate-800 hidden sm:table-cell">
                  {txn.practitioner}
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
                    <button className="text-blue-600 hover:text-blue-700">
                      <i className="ri-eye-line text-lg"></i>
                    </button>
                    <button className="text-emerald-600 hover:text-emerald-700">
                      <i className="ri-download-line text-lg"></i>
                    </button>
                    {txn.status === "Completed" && (
                      <button className="text-red-600 hover:text-red-700">
                        <i className="ri-refund-line text-lg"></i>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagement;
