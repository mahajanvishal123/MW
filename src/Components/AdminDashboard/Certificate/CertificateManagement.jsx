import { useState } from 'react';
import AsignCertificate from './AsignCertificate';
import AuditTrail from './AuditTrail';

export default function CertificateManagement() {
  const [activeTab, setActiveTab] = useState('assignRequests');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-4 py-4 sm:px-6 sm:py-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Certificate Management
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Monitor and assign certificates
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-4 sm:px-6 pt-4">
        <div className="flex border-b border-slate-200">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'assignRequests'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('assignRequests')}
          >
            Assign Certificates
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'auditTrail'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setActiveTab('auditTrail')}
          >
        Completed Certificates
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6 lg:p-8 flex-1">
        {activeTab === 'assignRequests' ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 ">
           <AsignCertificate/>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
         <AuditTrail/>
          </div>
        )}
      </div>
    </div>
  );
}
