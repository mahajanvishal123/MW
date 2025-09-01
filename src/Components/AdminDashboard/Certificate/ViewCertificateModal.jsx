import React from "react";

const ViewCertificateModal = ({ isOpen, onClose, certificate }) => {
  if (!isOpen || !certificate) return null;

  return (
   <div className="fixed inset-0 bg-black/50  transition-opacity duration-300 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Certificate Details</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center"
          >
            <i className="ri-close-line text-slate-600 text-xl"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-sm">
          <div>
            <span className="font-medium text-slate-600">Certificate ID:</span> {certificate.id}
          </div>
          <div>
            <span className="font-medium text-slate-600">QR Code:</span> {certificate.qrCode}
          </div>
          <div>
            <span className="font-medium text-slate-600">Patient:</span> {certificate.patient}
          </div>
          <div>
            <span className="font-medium text-slate-600">Practitioner:</span> {certificate.practitioner}
          </div>
          <div>
            <span className="font-medium text-slate-600">Type:</span> {certificate.type}
          </div>
          <div>
            <span className="font-medium text-slate-600">Duration:</span> {certificate.duration}
          </div>
          <div>
            <span className="font-medium text-slate-600">Status:</span> {certificate.status}
          </div>
          <div>
            <span className="font-medium text-slate-600">Created:</span> {certificate.created}
          </div>
          <div>
            <span className="font-medium text-slate-600">Amount:</span> {certificate.amount}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
          >
            <i className="ri-download-line mr-2"></i> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCertificateModal;
