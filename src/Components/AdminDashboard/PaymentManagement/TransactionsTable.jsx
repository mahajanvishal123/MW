import React, { useState } from "react";

const TransactionsTable = () => {
  const [selectedTxn, setSelectedTxn] = useState(null);

  const recentTransactions = [
    {
      id: 'TXN-2024-0156',
      patient: 'John Smith',
      practitioner: 'Dr. Sarah Johnson',
      amount: 79.00,
      type: 'Doctor Certificate',
      status: 'Completed',
      method: 'Credit Card',
      date: '2024-01-15 14:30',
      certificateId: 'MC-2024-0156'
    },
    {
      id: 'TXN-2024-0155',
      patient: 'Alice Brown',
      practitioner: 'Emma Wilson',
      amount: 39.20,
      type: 'Pharmacist Certificate',
      status: 'Completed',
      method: 'PayPal',
      date: '2024-01-15 12:15',
      certificateId: 'MC-2024-0155'
    },
    {
      id: 'TXN-2024-0154',
      patient: 'Robert Davis',
      practitioner: 'Dr. Michael Chen',
      amount: 79.00,
      type: 'Doctor Certificate',
      status: 'Pending',
      method: 'Bank Transfer',
      date: '2024-01-15 11:45',
      certificateId: 'MC-2024-0154'
    },
    {
      id: 'TXN-2024-0153',
      patient: 'Maria Garcia',
      practitioner: 'Dr. James Miller',
      amount: 79.00,
      type: 'Doctor Certificate',
      status: 'Failed',
      method: 'Credit Card',
      date: '2024-01-15 09:20',
      certificateId: 'MC-2024-0153'
    },
    {
      id: 'TXN-2024-0152',
      patient: 'David Wilson',
      practitioner: 'Lisa Thompson',
      amount: 63.20,
      type: 'Pharmacist Certificate',
      status: 'Refunded',
      method: 'Credit Card',
      date: '2024-01-14 16:30',
      certificateId: 'MC-2024-0152'
    }
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
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                Practitioner
              </th>
              <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">
                Method
              </th>
              <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                Date
              </th>
              <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {recentTransactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <div className="text-sm font-medium text-blue-600">
                    {txn.id}
                  </div>
                  <div className="text-xs text-slate-500">
                    {txn.certificateId}
                  </div>
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900">
                  {txn.patient}
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900 hidden sm:table-cell">
                  {txn.practitioner}
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm font-medium text-slate-900">
                  ${txn.amount.toFixed(2)}
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 hidden md:table-cell">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-slate-100 text-slate-800">
                    {txn.method}
                  </span>
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                      txn.status
                    )}`}
                  >
                    {txn.status}
                  </span>
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900 hidden sm:table-cell">
                  {txn.date}
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                    <button
                      className="text-emerald-600 hover:text-emerald-700 cursor-pointer"
                    >
                      <i className="ri-download-line"></i>
                    </button>
                    {txn.status === "Completed" && (
                      <button
                        className="text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        <i className="ri-refund-line"></i>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionsTable;