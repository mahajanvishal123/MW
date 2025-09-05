'use client';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import TransactionsTable from './TransactionsTable';

export default function PaymentManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showExportModal, setShowExportModal] = useState(false);
  
  const paymentStats = {
    totalRevenue: 78940,
    monthlyRevenue: 15680,
    pendingPayments: 2450,
    refundRequests: 340,
    transactionCount: 1247,
    avgTransactionValue: 63.25
  };
  
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
  
  const exportOptions = {
    format: 'csv',
    dataType: 'transactions',
    dateRange: 'month',
    includeRefunds: true,
    includeDetails: true,
    customStart: '',
    customEnd: ''
  };
  
  const handleExport = () => {
    try {
      console.log('Exporting payment data:', exportOptions);
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `payments-${exportOptions.dataType}-${timestamp}.${exportOptions.format}`;
      let exportData = [];
      
      if (exportOptions.dataType === 'transactions') {
        exportData = recentTransactions.map(txn => ({
          'Transaction ID': txn.id,
          'Certificate ID': txn.certificateId,
          'Patient Name': txn.patient,
          'Practitioner Name': txn.practitioner,
          'Amount': `$${txn.amount.toFixed(2)}`,
          'Payment Method': txn.method,
          'Status': txn.status,
          'Date': txn.date,
          'Service Type': txn.type
        }));
      } else if (exportOptions.dataType === 'revenue') {
        exportData = [
          {
            'Period': 'January 2024',
            'Total Revenue': `$${paymentStats.monthlyRevenue}`,
            'Transaction Count': paymentStats.transactionCount,
            'Average Transaction': `$${paymentStats.avgTransactionValue}`,
            'Growth Rate': '+12%'
          }
        ];
      }
      
      const dataStr = exportOptions.format === 'json'
        ? JSON.stringify(exportData, null, 2)
        : convertToCSV(exportData);
        
      const dataUri = 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = filename;
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      setShowExportModal(false);
      alert(`Payment data exported successfully as ${filename}!`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };
  
  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');
    return csvContent;
  };
  
  const getFilteredTransactionCount = () => {
    let count = recentTransactions.length;
    if (exportOptions.dateRange === 'week') count = Math.floor(count * 0.3);
    if (exportOptions.dateRange === 'today') count = Math.floor(count * 0.1);
    return count;
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Payment Management</h1>
                <p className="text-sm sm:text-base text-slate-600 mt-1">Monitor transactions and revenue analytics</p>
              </div>
            </div>
          </div>
        </header>
        
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600">${paymentStats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-dollar-circle-fill text-lg sm:text-xl text-emerald-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">+18.2%</span>
                <span className="text-slate-500 ml-2">from last month</span>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">This Month</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">${paymentStats.monthlyRevenue.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-calendar-line text-lg sm:text-xl text-blue-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">+12%</span>
                <span className="text-slate-500 ml-2">growth</span>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Pending</p>
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-600">${paymentStats.pendingPayments.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="ri-time-line text-lg sm:text-xl text-yellow-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-yellow-600 font-medium bg-yellow-50 px-2 py-1 rounded">8 txns</span>
                <span className="text-slate-500 ml-2">awaiting</span>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Avg Transaction</p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">${paymentStats.avgTransactionValue}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <i className="ri-bar-chart-fill text-lg sm:text-xl text-slate-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">+5.2%</span>
                <span className="text-slate-500 ml-2">increase</span>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 sm:mb-8">
            <div className="border-b border-slate-200">
              <nav className="flex overflow-x-auto px-4 sm:px-6 hide-scrollbar">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <i className="ri-dashboard-line mr-2"></i>
                  Overview
                </button>
                
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                    activeTab === 'transactions'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <i className="ri-list-check mr-2"></i>
                  Transactions
                </button>
                
                <button
                  onClick={() => setActiveTab('refunds')}
                  className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                    activeTab === 'refunds'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <i className="ri-refund-line mr-2"></i>
                  Refunds
                </button>
                
                {/* <button
                  onClick={() => setActiveTab('reports')}
                  className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                    activeTab === 'reports'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <i className="ri-file-chart-line mr-2"></i>
                  Reports
                </button> */}
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-4 sm:p-6">
              {activeTab === 'overview' && (
                <div className="space-y-4 sm:space-y-6">
                  {/* Revenue Chart */}
                  <div className="bg-slate-50 rounded-lg p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Revenue Trend</h3>
                    <div className="h-64 flex items-center justify-center bg-white rounded-lg border border-slate-200">
                      <div className="text-center">
                        <i className="ri-bar-chart-2-line text-4xl text-slate-300 mb-4"></i>
                        <p className="text-slate-500">Revenue chart will be displayed here</p>
                        <p className="text-sm text-slate-400">Integration with charting library needed</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Methods */}
                  {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <i className="ri-bank-card-line text-blue-600"></i>
                        </div>
                        <span className="text-sm text-slate-500">65%</span>
                      </div>
                      <h4 className="font-semibold text-slate-900">Credit Cards</h4>
                      <p className="text-xl sm:text-2xl font-bold text-slate-900">$51,311</p>
                    </div>
                    
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <i className="ri-paypal-line text-orange-600"></i>
                        </div>
                        <span className="text-sm text-slate-500">25%</span>
                      </div>
                      <h4 className="font-semibold text-slate-900">PayPal</h4>
                      <p className="text-xl sm:text-2xl font-bold text-slate-900">$19,735</p>
                    </div>
                    
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <i className="ri-bank-line text-green-600"></i>
                        </div>
                        <span className="text-sm text-slate-500">10%</span>
                      </div>
                      <h4 className="font-semibold text-slate-900">Bank Transfer</h4>
                      <p className="text-xl sm:text-2xl font-bold text-slate-900">$7,894</p>
                    </div>
                  </div> */}
                </div>
              )}
              
              {activeTab === 'transactions' && (
                <div className="space-y-4 sm:space-y-6">
                  {/* Filter Controls */}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="flex-1">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="ri-search-line text-slate-400"></i>
                        </div>
                        <input
                          type="text"
                          className="pl-10 w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Search transactions..."
                        />
                      </div>
                    </div>
                    
                    <select className="px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                      <option>All Status</option>
                      <option>Completed</option>
                      <option>Pending</option>
                      <option>Failed</option>
                    </select>
                    
                    <button
                      onClick={() => setShowExportModal(true)}
                      className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap text-sm"
                    >
                      <i className="ri-download-line mr-2"></i>
                      Export
                    </button>
                  </div>
                  
                  {/* Transactions Table */}
                  <div className="overflow-x-auto">
                  <TransactionsTable recentTransactions={recentTransactions} />
                  </div>
                </div>
              )}
              
              {activeTab === 'refunds' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-white border border-red-200 rounded-lg p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-slate-500 font-medium">Pending Refunds</p>
                          <p className="text-2xl sm:text-3xl font-bold text-red-600">4</p>
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <i className="ri-refund-line text-lg sm:text-xl text-red-600"></i>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">Total: $316.00</p>
                    </div>
                    
                    <div className="bg-white border border-green-200 rounded-lg p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-slate-500 font-medium">Processed</p>
                          <p className="text-2xl sm:text-3xl font-bold text-green-600">28</p>
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <i className="ri-check-double-line text-lg sm:text-xl text-green-600"></i>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">Total: $2,184.50</p>
                    </div>
                    
                    <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-slate-500 font-medium">Refund Rate</p>
                          <p className="text-2xl sm:text-3xl font-bold text-slate-900">2.8%</p>
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                          <i className="ri-percent-line text-lg sm:text-xl text-slate-600"></i>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">Industry avg: 3.2%</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-4 sm:p-6 text-center">
                    <i className="ri-refund-2-line text-4xl text-slate-300 mb-4"></i>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Refund Management</h3>
                    <p className="text-slate-600">Detailed refund tracking and processing tools will be displayed here</p>
                  </div>
                </div>
              )}
              
              {/* {activeTab === 'reports' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-all cursor-pointer">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <i className="ri-line-chart-line text-xl text-blue-600"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Revenue Report</h3>
                      <p className="text-slate-600 text-sm mb-4">Monthly and annual revenue analytics</p>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">
                        Generate Report →
                      </button>
                    </div>
                    
                    <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-all cursor-pointer">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                        <i className="ri-pie-chart-line text-xl text-emerald-600"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Payment Methods</h3>
                      <p className="text-slate-600 text-sm mb-4">Breakdown by payment type and performance</p>
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium cursor-pointer">
                        Generate Report →
                      </button>
                    </div>
                    
                    <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-all cursor-pointer">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <i className="ri-user-heart-line text-xl text-purple-600"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Practitioner Earnings</h3>
                      <p className="text-slate-600 text-sm mb-4">Individual practitioner revenue breakdown</p>
                      <button className="text-purple-600 hover:text-purple-700 text-sm font-medium cursor-pointer">
                        Generate Report →
                      </button>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Export Payment Data</h2>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                >
                  <i className="ri-close-line text-slate-600 text-lg sm:text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Data Type Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Data Type</label>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="dataType"
                      value="transactions"
                      checked={exportOptions.dataType === 'transactions'}
                      onChange={(e) => setExportOptions((prev) => ({ ...prev, dataType: e.target.value }))}
                      className="w-4 h-4 text-slate-600"
                    />
                    <span className="ml-3 text-sm text-slate-700">
                      <i className="ri-list-check text-slate-500 mr-2"></i>
                      Transaction Details - Individual payment records with full details
                    </span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="dataType"
                      value="revenue"
                      checked={exportOptions.dataType === 'revenue'}
                      onChange={(e) => setExportOptions((prev) => ({ ...prev, dataType: e.target.value }))}
                      className="w-4 h-4 text-slate-600"
                    />
                    <span className="ml-3 text-sm text-slate-700">
                      <i className="ri-line-chart-line text-slate-500 mr-2"></i>
                      Revenue Summary - Aggregated financial data and analytics
                    </span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="dataType"
                      value="practitioners"
                      checked={exportOptions.dataType === 'practitioners'}
                      onChange={(e) => setExportOptions((prev) => ({ ...prev, dataType: e.target.value }))}
                      className="w-4 h-4 text-slate-600"
                    />
                    <span className="ml-3 text-sm text-slate-700">
                      <i className="ri-user-heart-line text-slate-500 mr-2"></i>
                      Practitioner Earnings - Revenue breakdown by healthcare provider
                    </span>
                  </label>
                </div>
              </div>
              
              {/* Date Range Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
                <select
                  value={exportOptions.dateRange}
                  onChange={(e) => setExportOptions((prev) => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                  <option value="all">All Time</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              
              {/* Custom Date Range */}
              {exportOptions.dateRange === 'custom' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={exportOptions.customStart}
                      onChange={(e) => setExportOptions((prev) => ({ ...prev, customStart: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={exportOptions.customEnd}
                      onChange={(e) => setExportOptions((prev) => ({ ...prev, customEnd: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm"
                    />
                  </div>
                </div>
              )}
              
              {/* Export Format */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Export Format</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex flex-col items-center p-4 border border-slate-300 rounded-lg cursor-pointer hover:border-slate-400 transition-colors">
                    <input
                      type="radio"
                      name="format"
                      value="csv"
                      checked={exportOptions.format === 'csv'}
                      onChange={(e) => setExportOptions((prev) => ({ ...prev, format: e.target.value }))}
                      className="w-4 h-4 text-slate-600 mb-2"
                    />
                    <i className="ri-file-text-line text-2xl text-blue-600 mb-2"></i>
                    <span className="text-sm font-medium text-slate-700">CSV</span>
                    <span className="text-xs text-slate-500 text-center">Spreadsheet compatible</span>
                  </label>
                  
                  <label className="flex flex-col items-center p-4 border border-slate-300 rounded-lg cursor-pointer hover:border-slate-400 transition-colors">
                    <input
                      type="radio"
                      name="format"
                      value="excel"
                      checked={exportOptions.format === 'excel'}
                      onChange={(e) => setExportOptions((prev) => ({ ...prev, format: e.target.value }))}
                      className="w-4 h-4 text-slate-600 mb-2"
                    />
                    <i className="ri-file-excel-line text-2xl text-emerald-600 mb-2"></i>
                    <span className="text-sm font-medium text-slate-700">Excel</span>
                    <span className="text-xs text-slate-500 text-center">Advanced formatting</span>
                  </label>
                  
                  <label className="flex flex-col items-center p-4 border border-slate-300 rounded-lg cursor-pointer hover:border-slate-400 transition-colors">
                    <input
                      type="radio"
                      name="format"
                      value="pdf"
                      checked={exportOptions.format === 'pdf'}
                      onChange={(e) => setExportOptions((prev) => ({ ...prev, format: e.target.value }))}
                      className="w-4 h-4 text-slate-600 mb-2"
                    />
                    <i className="ri-file-pdf-line text-2xl text-red-600 mb-2"></i>
                    <span className="text-sm font-medium text-slate-700">PDF</span>
                    <span className="text-xs text-slate-500 text-center">Printable report</span>
                  </label>
                </div>
              </div>
              
              {/* Additional Options */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Include Additional Data</label>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeRefunds}
                      onChange={(e) => setExportOptions((prev) => ({ ...prev, includeRefunds: e.target.checked }))}
                      className="w-4 h-4 text-slate-600"
                    />
                    <span className="ml-3 text-sm text-slate-700">Include refund transactions</span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeDetails}
                      onChange={(e) => setExportOptions((prev) => ({ ...prev, includeDetails: e.target.checked }))}
                      className="w-4 h-4 text-slate-600"
                    />
                    <span className="ml-3 text-slate-700">Include detailed payment information (method, fees, etc.)</span>
                  </label>
                </div>
              </div>
              
              {/* Export Preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <i className="ri-information-line text-slate-600 mr-2"></i>
                  <h4 className="text-sm font-medium text-slate-700">Export Preview</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Records to export:</span>
                    <span className="ml-2 font-medium text-slate-900">{getFilteredTransactionCount()} transactions</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Estimated file size:</span>
                    <span className="ml-2 font-medium text-slate-900">~{Math.round(getFilteredTransactionCount() * 0.5)}KB</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Format:</span>
                    <span className="ml-2 font-medium text-slate-900">{exportOptions.format.toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Date range:</span>
                    <span className="ml-2 font-medium text-slate-900">{exportOptions.dateRange}</span>
                  </div>
                </div>
              </div>
              
              {/* Security Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-shield-check-line text-amber-600"></i>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-amber-800">Security & Compliance</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Exported data contains sensitive financial information. Handle according to your organization's data protection policies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-download-line mr-2"></i>
                Export Payment Data
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  );
}