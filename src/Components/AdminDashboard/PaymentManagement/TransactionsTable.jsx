import React, { useState } from "react";

const TransactionsTable = ({ recentTransactions }) => {
  const [selectedTxn, setSelectedTxn] = useState(null);

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
                      title="View Details"
                      data-bs-toggle="modal"
                      data-bs-target="#txnModal"
                      onClick={() => setSelectedTxn(txn)}
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                    <button
                      className="text-emerald-600 hover:text-emerald-700 cursor-pointer"
                      title="Download Receipt"
                    >
                      <i className="ri-download-line"></i>
                    </button>
                    {txn.status === "Completed" && (
                      <button
                        className="text-red-600 hover:text-red-700 cursor-pointer"
                        title="Refund"
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

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="txnModal"
        tabIndex="-1"
        aria-labelledby="txnModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="txnModalLabel">
                Transaction Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedTxn ? (
                <div className="space-y-2">
                  <p>
                    <strong>ID:</strong> {selectedTxn.id}
                  </p>
                  <p>
                    <strong>Patient:</strong> {selectedTxn.patient}
                  </p>
                  <p>
                    <strong>Practitioner:</strong> {selectedTxn.practitioner}
                  </p>
                  <p>
                    <strong>Amount:</strong> ${selectedTxn.amount.toFixed(2)}
                  </p>
                  <p>
                    <strong>Method:</strong> {selectedTxn.method}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedTxn.status}
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedTxn.date}
                  </p>
                  <p>
                    <strong>Certificate ID:</strong> {selectedTxn.certificateId}
                  </p>
                </div>
              ) : (
                <p>No transaction selected.</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionsTable;