import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function AnalyticsReports() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeReport, setActiveReport] = useState('revenue');
  const [dateRange, setDateRange] = useState('month');
  const [analyticsRange, setAnalyticsRange] = useState('30'); 
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfOptions, setPdfOptions] = useState({
    includeCharts: true,
    includeDetailedData: true,
    includeComparisons: true,
    format: 'detailed',
    orientation: 'portrait'
  });
  
  const reportData = {
    revenue: {
      total: 78940,
      growth: 18.2,
      certificates: 1247,
      avgValue: 63.25
    },
    certificates: {
      approved: 1184,
      pending: 23,
      declined: 40,
      approvalRate: 94.2
    },
    practitioners: {
      active: 156,
      newThisMonth: 8,
      topPerformer: 'Dr. Sarah Johnson',
      avgResponseTime: 15
    }
  };
  
  const recentReports = [
    {
      id: 'RPT-2024-001',
      name: 'Monthly Revenue Report - January',
      type: 'Revenue',
      generated: '2024-01-31 23:59',
      size: '2.4 MB',
      format: 'PDF'
    },
    {
      id: 'RPT-2024-002',
      name: 'Certificate Audit Trail - Q4 2023',
      type: 'Compliance',
      generated: '2024-01-01 09:00',
      size: '18.7 MB',
      format: 'Excel'
    },
    {
      id: 'RPT-2024-003',
      name: 'Practitioner Performance Summary',
      type: 'Performance',
      generated: '2024-01-15 14:30',
      size: '1.2 MB',
      format: 'PDF'
    }
  ];
  
  const handleGeneratePdf = () => {
    try {
      console.log('Generating PDF report:', {
        reportType: activeReport,
        dateRange: dateRange,
        options: pdfOptions
      });
      const reportName = `${activeReport}-report-${dateRange}-${new Date().toISOString().split('T')[0]}.pdf`;
      setShowPdfModal(false);
      alert(`PDF report "${reportName}" is being generated! You will receive a download link via email once processing is complete.`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF report. Please try again.');
    }
  };
  
  const getReportTitle = () => {
    switch (activeReport) {
      case 'revenue':
        return 'Revenue Analytics Report';
      case 'certificates':
        return 'Certificate Performance Report';
      case 'practitioners':
        return 'Practitioner Performance Report';
      case 'compliance':
        return 'Compliance Audit Report';
      default:
        return 'Analytics Report';
    }
  };
  
  const handleAnalyticsRangeChange = (range) => {
    setAnalyticsRange(range);
    console.log(`Analytics data updated for last ${range} days`);
    const rangeText = range === '30' ? '30 days' : '90 days';
    setTimeout(() => {
      console.log(`Analytics chart refreshed with ${rangeText} of data`);
    }, 500);
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">  
      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Reports & Analytics</h1>
                <p className="text-sm sm:text-base text-slate-600 mt-1">Comprehensive business intelligence and data insights</p>
              </div>
            </div>
          </div>
        </header>
        
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600">${reportData.revenue.total.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-dollar-circle-fill text-lg sm:text-xl text-emerald-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">+{reportData.revenue.growth}%</span>
                <span className="text-slate-500 ml-2">growth</span>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Certificates Issued</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">{reportData.revenue.certificates}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-file-text-fill text-lg sm:text-xl text-blue-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">{reportData.certificates.approvalRate}%</span>
                <span className="text-slate-500 ml-2">approval rate</span>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Active Practitioners</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">{reportData.practitioners.active}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-user-heart-fill text-lg sm:text-xl text-purple-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded">+{reportData.practitioners.newThisMonth}</span>
                <span className="text-slate-500 ml-2">new this month</span>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Avg Response Time</p>
                  <p className="text-2xl sm:text-3xl font-bold text-orange-600">{reportData.practitioners.avgResponseTime} min</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-time-fill text-lg sm:text-xl text-orange-600"></i>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded">-3 min</span>
                <span className="text-slate-500 ml-2">improvement</span>
              </div>
            </div>
          </div>
          
          {/* grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 */}
          
          <div className="">
            {/* Report Generation */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Generate Report</h2>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full sm:w-auto"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="6-monthly">6-Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveReport('revenue')}
                    className={`p-4 sm:p-6 border-2 rounded-xl transition-all cursor-pointer text-left ${
                      activeReport === 'revenue'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                      <i className="ri-money-dollar-circle-line text-lg sm:text-xl text-emerald-600"></i>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1 sm:mb-2">Revenue Report</h3>
                    <p className="text-xs sm:text-sm text-slate-600">Comprehensive financial analytics and payment trends</p>
                  </button>
                  
                  <button
                    onClick={() => setActiveReport('certificates')}
                    className={`p-4 sm:p-6 border-2 rounded-xl transition-all cursor-pointer text-left ${
                      activeReport === 'certificates'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                      <i className="ri-file-text-line text-lg sm:text-xl text-blue-600"></i>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1 sm:mb-2">Certificate Analytics</h3>
                    <p className="text-xs sm:text-sm text-slate-600">Approval rates, processing times, and compliance data</p>
                  </button>
                  
                  <button
                    onClick={() => setActiveReport('practitioners')}
                    className={`p-4 sm:p-6 border-2 rounded-xl transition-all cursor-pointer text-left ${
                      activeReport === 'practitioners'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                      <i className="ri-user-heart-line text-lg sm:text-xl text-purple-600"></i>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1 sm:mb-2">Practitioner Performance</h3>
                    <p className="text-xs sm:text-sm text-slate-600">Individual performance metrics and rankings</p>
                  </button>
                  
                  <button
                    onClick={() => setActiveReport('compliance')}
                    className={`p-4 sm:p-6 border-2 rounded-xl transition-all cursor-pointer text-left ${
                      activeReport === 'compliance'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                      <i className="ri-shield-check-line text-lg sm:text-xl text-orange-600"></i>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1 sm:mb-2">Compliance Audit</h3>
                    <p className="text-xs sm:text-sm text-slate-600">Full audit trail and regulatory compliance report</p>
                  </button>
                </div>
                
                <div className="mt-4 sm:mt-6 p-4 bg-slate-50 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h4 className="font-medium text-slate-900">
                        {activeReport === 'revenue' && 'Revenue Analytics Report'}
                        {activeReport === 'certificates' && 'Certificate Performance Report'}
                        {activeReport === 'practitioners' && 'Practitioner Performance Report'}
                        {activeReport === 'compliance' && 'Compliance Audit Report'}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        Data for {dateRange === 'week' ? 'this week' : dateRange === 'month' ? 'this month' : dateRange === 'quarter' ? 'this quarter' : 'this year'}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowPdfModal(true)}
                      className="bg-slate-700 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap text-sm"
                    >
                      <i className="ri-download-line mr-2"></i>
                      Generate PDF
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Analytics Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Analytics Overview</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAnalyticsRangeChange('30')}
                      className={`px-3 py-2 text-sm rounded-lg cursor-pointer whitespace-nowrap transition-colors ${
                        analyticsRange === '30'
                          ? 'bg-slate-700 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Last 30 Days
                    </button>
                    <button
                      onClick={() => handleAnalyticsRangeChange('90')}
                      className={`px-3 py-2 text-sm rounded-lg cursor-pointer whitespace-nowrap transition-colors ${
                        analyticsRange === '90'
                          ? 'bg-slate-700 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Last 90 Days
                    </button>
                  </div>
                </div>
                
                <div className="h-64 sm:h-80 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-center px-4">
                    <i className="ri-bar-chart-2-line text-4xl sm:text-6xl text-slate-300 mb-3 sm:mb-4"></i>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1 sm:mb-2">Advanced Analytics Chart</h3>
                    <p className="text-sm text-slate-500">
                      {analyticsRange === '30' ? 'Last 30 days' : 'Last 90 days'} - Revenue trends, certificate volumes, and performance metrics
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400 mt-2">Chart integration with real-time data visualization</p>
                    <div className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 bg-blue-50 text-blue-700 rounded-lg inline-block text-sm">
                      <i className="ri-refresh-line mr-2"></i>
                      Showing {analyticsRange === '30' ? '30' : '90'} days of data
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Reports & Export Options */}
            {/* <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">Recent Reports</h2>
                <div className="space-y-3 sm:space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="p-3 sm:p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900 mb-1 text-sm sm:text-base">{report.name}</h3>
                          <p className="text-xs sm:text-sm text-slate-500 mb-1 sm:mb-2">{report.type} • {report.format}</p>
                          <div className="flex items-center text-xs text-slate-400">
                            <span>{report.generated}</span>
                            <span className="mx-2">•</span>
                            <span>{report.size}</span>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 cursor-pointer ml-2 sm:ml-3">
                          <i className="ri-download-line"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">Quick Export</h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <i className="ri-file-excel-line text-emerald-600 mr-3"></i>
                      <span className="font-medium text-emerald-800 text-sm">Export to Excel</span>
                    </div>
                    <i className="ri-download-line text-emerald-600"></i>
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <i className="ri-file-pdf-line text-red-600 mr-3"></i>
                      <span className="font-medium text-red-800 text-sm">Export to PDF</span>
                    </div>
                    <i className="ri-download-line text-red-600"></i>
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <i className="ri-file-text-line text-blue-600 mr-3"></i>
                      <span className="font-medium text-blue-800 text-sm">Export to CSV</span>
                    </div>
                    <i className="ri-download-line text-blue-600"></i>
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">Scheduled Reports</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">Monthly Revenue</p>
                      <p className="text-sm text-slate-500">Every 1st of month</p>
                    </div>
                    <button className="text-slate-600 hover:text-slate-800 cursor-pointer">
                      <i className="ri-settings-line"></i>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">Weekly Summary</p>
                      <p className="text-sm text-slate-500">Every Monday 9 AM</p>
                    </div>
                    <button className="text-slate-600 hover:text-slate-800 cursor-pointer">
                      <i className="ri-settings-line"></i>
                    </button>
                  </div>
                  
                  <button className="w-full p-3 border border-dashed border-slate-300 rounded-lg text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors cursor-pointer text-sm">
                    <i className="ri-add-line mr-2"></i>
                    Add Scheduled Report
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}