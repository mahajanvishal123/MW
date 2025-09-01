import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function EarningsReports() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [paymentMethodType, setPaymentMethodType] = useState('bank');
  const [paymentForm, setPaymentForm] = useState({
    // Bank Account Fields
    accountHolderName: '',
    bsb: '',
    accountNumber: '',
    bankName: '',
    accountType: 'checking',

    // PayPal Fields
    paypalEmail: '',

    // Cryptocurrency Fields
    cryptoWallet: '',
    cryptoType: 'bitcoin',

    // Digital Wallet Fields
    walletEmail: '',
    walletType: 'paypal',

    // Common Fields
    nickname: '',
    setPrimary: false,
    agreeTerms: false
  });
  const [exportForm, setExportForm] = useState({
    reportType: 'earnings',
    format: 'csv',
    dateRange: 'month',
    includeTransactions: true,
    includeTaxInfo: false,
    includeCharts: true,
    groupBy: 'date',
    currency: 'AUD',
    emailReport: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const [showTaxSummaryModal, setShowTaxSummaryModal] = useState(false);
  const [taxDownloadProgress, setTaxDownloadProgress] = useState(0);
  const [downloadingTaxSummary, setDownloadingTaxSummary] = useState(false);
  const [taxSummaryForm, setTaxSummaryForm] = useState({
    financialYear: '2024',
    format: 'pdf',
    includeBreakdown: true,
    includeGST: true,
    includeDeductions: true,
    includeQuarterly: false,
    emailCopy: true
  });

  const earningsData = {
    currentWeek: 680,
    currentMonth: 2840,
    currentQuarter: 8520,
    yearToDate: 34200,
    lastPayment: 1420,
    pendingPayment: 568,
    totalCertificates: 156,
    avgPerCertificate: 79
  };

  const recentTransactions = [
    {
      id: 'PAY-2024-001',
      date: '2024-01-15',
      description: 'Weekly Payment - Jan 8-14',
      certificates: 18,
      amount: 1422.00,
      status: 'Completed',
      type: 'payment'
    },
    {
      id: 'PAY-2024-002',
      date: '2024-01-08',
      description: 'Weekly Payment - Jan 1-7',
      certificates: 12,
      amount: 948.00,
      status: 'Completed',
      type: 'payment'
    },
    {
      id: 'ADJ-2024-001',
      date: '2024-01-05',
      description: 'Platform Fee Adjustment',
      certificates: 0,
      amount: -25.50,
      status: 'Completed',
      type: 'adjustment'
    },
    {
      id: 'BON-2024-001',
      date: '2024-01-01',
      description: 'Performance Bonus - Q4 2023',
      certificates: 0,
      amount: 500.00,
      status: 'Completed',
      type: 'bonus'
    }
  ];

  const weeklyEarnings = [
    { week: 'Week 1', earnings: 790, certificates: 10 },
    { week: 'Week 2', earnings: 1185, certificates: 15 },
    { week: 'Week 3', earnings: 865, certificates: 11 },
    { week: 'Week 4', earnings: 680, certificates: 8 }
  ];

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'payment':
        return 'ri-money-dollar-circle-line text-emerald-600';
      case 'adjustment':
        return 'ri-subtract-line text-amber-600';
      case 'bonus':
        return 'ri-gift-line text-purple-600';
      default:
        return 'ri-file-line text-slate-600';
    }
  };

  const getTransactionColor = (amount) => {
    return amount >= 0 ? 'text-emerald-600' : 'text-red-600';
  };

  const handleFormChange = (field, value) => {
    setPaymentForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!paymentForm.nickname.trim()) {
      errors.nickname = 'Payment method nickname is required';
    }

    if (!paymentForm.agreeTerms) {
      errors.agreeTerms = 'You must agree to the terms and conditions';
    }

    switch (paymentMethodType) {
      case 'bank':
        if (!paymentForm.accountHolderName.trim()) {
          errors.accountHolderName = 'Account holder name is required';
        }
        if (!paymentForm.bsb.trim() || paymentForm.bsb.length !== 6) {
          errors.bsb = 'Valid BSB (6 digits) is required';
        }
        if (!paymentForm.accountNumber.trim()) {
          errors.accountNumber = 'Account number is required';
        }
        if (!paymentForm.bankName.trim()) {
          errors.bankName = 'Bank name is required';
        }
        break;

      case 'paypal':
        if (!paymentForm.paypalEmail.trim()) {
          errors.paypalEmail = 'PayPal email is required';
        } else if (!/\S+@\S+\.(\\S+)/.test(paymentForm.paypalEmail)) {
          errors.paypalEmail = 'Valid email address is required';
        }
        break;

      case 'crypto':
        if (!paymentForm.cryptoWallet.trim()) {
          errors.cryptoWallet = 'Crypto wallet address is required';
        }
        break;

      case 'digital':
        if (!paymentForm.walletEmail.trim()) {
          errors.walletEmail = 'Wallet email is required';
        } else if (!/\S+@\S+\.(\\S+)/.test(paymentForm.walletEmail)) {
          errors.walletEmail = 'Valid email address is required';
        }
        break;
    }

    return errors;
  };

  const handleAddPaymentMethod = async () => {
    try {
      const errors = validateForm();

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      setIsSubmitting(true);
      setSubmitProgress(0);

      // Simulate form submission with progress
      const progressInterval = setInterval(() => {
        setSubmitProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 20;
        });
      }, 200);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2500));

      setSubmitProgress(100);

      // Success notification
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitProgress(0);
        setShowAddPaymentModal(false);

        // Reset form
        setPaymentForm({
          accountHolderName: '',
          bsb: '',
          accountNumber: '',
          bankName: '',
          accountType: 'checking',
          paypalEmail: '',
          cryptoWallet: '',
          cryptoType: 'bitcoin',
          walletEmail: '',
          walletType: 'paypal',
          nickname: '',
          setPrimary: false,
          agreeTerms: false
        });
        setPaymentMethodType('bank');
        setFormErrors({});

        // Show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-emerald-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 border border-emerald-500';
        notification.innerHTML = `
          <div class="flex items-center">
            <i class="ri-check-double-line mr-3 text-lg"></i>
            <div>
              <div class="font-semibold">Payment Method Added Successfully!</div>
              <div class="text-sm text-emerald-100">Your new payment method "${paymentForm.nickname}" has been configured</div>
            </div>
          </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 5000);

      }, 500);

    } catch (error) {
      console.error('Error adding payment method:', error);
      setIsSubmitting(false);
      setSubmitProgress(0);

      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 border border-red-500';
      notification.innerHTML = `
        <div class="flex items-center">
          <i class="ri-error-warning-line mr-3 text-lg"></i>
          <div>
            <div class="font-semibold">Failed to Add Payment Method</div>
            <div class="text-sm text-red-100">Please check your information and try again</div>
          </div>
        </div>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 4000);
    }
  };

  const handleExportReport = async () => {
    try {
      setIsExporting(true);
      setExportProgress(0);

      console.log('Exporting report:', exportForm);

      // Simulate export with progress
      const progressInterval = setInterval(() => {
        setExportProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 300);

      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 3000));

      setExportProgress(100);

      // Generate mock data based on selections
      let exportData = [];
      let headers = [];

      if (exportForm.reportType === 'earnings') {
        headers = ['Date', 'Description', 'Certificates', 'Amount', 'Status'];
        if (exportForm.includeTaxInfo) {
          headers.push('Tax Category', 'GST Amount');
        }

        exportData = recentTransactions.map(transaction => {
          const row = [
            transaction.date,
            `"${transaction.description}"`,
            transaction.certificates,
            transaction.amount.toFixed(2),
            transaction.status
          ];

          if (exportForm.includeTaxInfo) {
            row.push('Professional Services', (transaction.amount * 0.1).toFixed(2));
          }

          return row;
        });
      } else if (exportForm.reportType === 'summary') {
        headers = ['Period', 'Total Earnings', 'Certificates Issued', 'Average per Certificate'];
        exportData = weeklyEarnings.map(week => [
          week.week,
          week.earnings.toFixed(2),
          week.certificates,
          (week.earnings / week.certificates).toFixed(2)
        ]);
      }

      // Create CSV content
      const csvContent = [headers.join(','), ...exportData.map(row => row.join(','))].join('\\n');

      // Download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      const filename = `earnings-${exportForm.reportType}-${exportForm.dateRange}-${new Date().toISOString().split('T')[0]}.${exportForm.format}`;
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
        setShowExportModal(false);

        // Success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-emerald-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 border border-emerald-500';
        notification.innerHTML = `
          <div class="flex items-center">
            <i class="ri-check-double-line mr-3 text-lg"></i>
            <div>
              <div class="font-semibold">Export Completed Successfully!</div>
              <div class="text-sm text-emerald-100">Downloaded: ${filename}</div>
            </div>
          </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 6000);

      }, 500);

    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
      setExportProgress(0);

      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 border border-red-500';
      notification.innerHTML = `
        <div class="flex items-center">
          <i class="ri-error-warning-line mr-3 text-lg"></i>
          <div>
            <div class="font-semibold">Export Failed</div>
            <div class="text-sm text-red-100">Please try again or contact support</div>
          </div>
        </div>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 4000);
    }
  };

  const getExportPreview = () => {
    let recordCount = 0;

    switch (exportForm.reportType) {
      case 'earnings':
        recordCount = recentTransactions.length;
        break;
      case 'summary':
        recordCount = weeklyEarnings.length;
        break;
      case 'tax':
        recordCount = recentTransactions.filter(t => t.amount > 0).length;
        break;
      default:
        recordCount = recentTransactions.length;
    }

    return recordCount;
  };

  const handleDownloadTaxSummary = async () => {
    try {
      setDownloadingTaxSummary(true);
      setTaxDownloadProgress(0);

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setTaxDownloadProgress(prev => {
          if (prev >= 85) {
            clearInterval(progressInterval);
            return 85;
          }
          return prev + Math.random() * 20;
        });
      }, 200);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2500));

      setTaxDownloadProgress(100);

      // Generate tax summary data
      const taxData = generateTaxSummaryContent();

      // Create download
      const filename = `tax-summary-fy${taxSummaryForm.financialYear}-dr-johnson.${taxSummaryForm.format}`;

      if (taxSummaryForm.format === 'pdf') {
        // Simulate PDF generation
        const pdfContent = `TAX SUMMARY REPORT - FY${taxSummaryForm.financialYear}\n\nPRACTITIONER: Dr. Sarah Johnson\nAHPRA: MED0012345\nABN: 12 345 678 901\nFINANCIAL YEAR: ${taxSummaryForm.financialYear}\n\nINCOME SUMMARY\n==============\nGross Earnings: $31,200.00\nTotal Certificates Issued: 395\nAverage Certificate Value: $79.00\n\nQUARTERLY BREAKDOWN\n==================\nQ1: $7,800.00 (99 certificates)\nQ2: $7,650.00 (97 certificates) \nQ3: $8,100.00 (102 certificates)\nQ4: $7,650.00 (97 certificates)\n\n${taxSummaryForm.includeGST ? `\nGST LIABILITY\n=============\nGST on Services: $2,836.36\nNet GST Payable: $2,836.36\n` : ''}\n\n${taxSummaryForm.includeDeductions ? `\nALLOWABLE DEDUCTIONS\n===================\nProfessional Development: $1,200.00\nInsurance Premiums: $2,400.00\nEquipment & Software: $850.00\nProfessional Memberships: $450.00\nTotal Deductions: $4,900.00\n\nTAXABLE INCOME: $26,300.00\n` : ''}\n\n${taxSummaryForm.includeBreakdown ? `\nCERTIFICATE TYPE BREAKDOWN\n=========================\nMedical Certificates: $24,960.00 (316 certificates)\nWork Certificates: $4,740.00 (60 certificates)\nFitness Certificates: $1,500.00 (19 certificates)\n` : ''}\n\nThis summary has been prepared for taxation purposes.\nGenerated: ${new Date().toLocaleDateString()}\n\n--- END OF TAX SUMMARY ---`;
        downloadFile(pdfContent, filename, 'application/pdf');
      } else {
        // CSV format
        const csvContent = generateTaxSummaryCSV();
        downloadFile(csvContent, filename, 'text/csv');
      }

      setTimeout(() => {
        setShowTaxSummaryModal(false);
        setDownloadingTaxSummary(false);
        setTaxDownloadProgress(0);

        // Success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-emerald-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 border border-emerald-500';
        notification.innerHTML = `
          <div class="flex items-center">
            <i class="ri-check-double-line mr-3 text-lg"></i>
            <div>
              <div class="font-semibold">Tax Summary Downloaded!</div>
              <div class="text-sm text-emerald-100">File: ${filename}</div>
              ${taxSummaryForm.emailCopy ? `<div class="text-xs text-emerald-200 mt-1">Copy sent to your email</div>` : ''}
            </div>
          </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 5000);

      }, 500);

    } catch (error) {
      console.error('Tax summary download failed:', error);
      setShowTaxSummaryModal(false);
      setDownloadingTaxSummary(false);
      setTaxDownloadProgress(0);

      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 border border-red-500';
      notification.innerHTML = `
        <div class="flex items-center">
          <i class="ri-error-warning-line mr-3 text-lg"></i>
          <div>
            <div class="font-semibold">Download Failed</div>
            <div class="text-sm text-red-100">Unable to generate tax summary. Please try again.</div>
          </div>
        </div>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 4000);
    }
  };

  const generateTaxSummaryContent = () => {
    return {
      financialYear: taxSummaryForm.financialYear,
      grossEarnings: 31200,
      totalCertificates: 395,
      avgCertificateValue: 79,
      quarters: {
        q1: { earnings: 7800, certificates: 99 },
        q2: { earnings: 7650, certificates: 97 },
        q3: { earnings: 8100, certificates: 102 },
        q4: { earnings: 7650, certificates: 97 }
      },
      gst: {
        gstOnServices: 2836.36,
        netGstPayable: 2836.36
      },
      deductions: {
        professionalDevelopment: 1200,
        insurance: 2400,
        equipment: 850,
        memberships: 450,
        total: 4900
      },
      taxableIncome: 26300,
      certificateTypes: {
        medical: { earnings: 24960, count: 316 },
        work: { earnings: 4740, count: 60 },
        fitness: { earnings: 1500, count: 19 }
      }
    };
  };

  const generateTaxSummaryCSV = () => {
    const data = generateTaxSummaryContent();

    let csvContent = "Tax Summary Report - FY" + data.financialYear + "\n";
    csvContent += "Generated," + new Date().toISOString() + "\n\n";

    csvContent += "INCOME SUMMARY\n";
    csvContent += "Category,Amount,Count\n";
    csvContent += "Gross Earnings,$" + data.grossEarnings + "," + data.totalCertificates + "\n";
    csvContent += "Average Certificate Value,$" + data.avgCertificateValue + ",1\n\n";

    if (taxSummaryForm.includeQuarterly) {
      csvContent += "QUARTERLY BREAKDOWN\n";
      csvContent += "Quarter,Earnings,Certificates\n";
      csvContent += "Q1,$" + data.quarters.q1.earnings + "," + data.quarters.q1.certificates + "\n";
      csvContent += "Q2,$" + data.quarters.q2.earnings + "," + data.quarters.q2.certificates + "\n";
      csvContent += "Q3,$" + data.quarters.q3.earnings + "," + data.quarters.q3.certificates + "\n";
      csvContent += "Q4,$" + data.quarters.q4.earnings + "," + data.quarters.q4.certificates + "\n\n";
    }

    if (taxSummaryForm.includeGST) {
      csvContent += "GST LIABILITY\n";
      csvContent += "Type,Amount\n";
      csvContent += "GST on Services,$" + data.gst.gstOnServices + "\n";
      csvContent += "Net GST Payable,$" + data.gst.netGstPayable + "\n\n";
    }

    if (taxSummaryForm.includeDeductions) {
      csvContent += "DEDUCTIONS\n";
      csvContent += "Category,Amount\n";
      csvContent += "Professional Development,$" + data.deductions.professionalDevelopment + "\n";
      csvContent += "Insurance Premiums,$" + data.deductions.insurance + "\n";
      csvContent += "Equipment & Software,$" + data.deductions.equipment + "\n";
      csvContent += "Professional Memberships,$" + data.deductions.memberships + "\n";
      csvContent += "Total Deductions,$" + data.deductions.total + "\n";
      csvContent += "Taxable Income,$" + data.taxableIncome + "\n\n";
    }

    if (taxSummaryForm.includeBreakdown) {
      csvContent += "CERTIFICATE TYPES\n";
      csvContent += "Type,Earnings,Count\n";
      csvContent += "Medical Certificates,$" + data.certificateTypes.medical.earnings + "," + data.certificateTypes.medical.count + "\n";
      csvContent += "Work Certificates,$" + data.certificateTypes.work.earnings + "," + data.certificateTypes.work.count + "\n";
      csvContent += "Fitness Certificates,$" + data.certificateTypes.fitness.earnings + "," + data.certificateTypes.fitness.count + "\n";
    }

    return csvContent;
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-5 flex">
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="">
          <div className="">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="mr-6">
                  <h1 className="text-2xl font-semibold text-slate-900">Earnings & Reports</h1>
                  <p className="text-slate-600 mt-1">Track your income and financial performance</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 mt-5 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">This Week</p>
                  <p className="text-3xl font-semibold text-emerald-600">${earningsData.currentWeek}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100">
                  <i className="ri-calendar-week-line text-xl text-emerald-600"></i>
                </div>
              </div>
              <div className="text-sm text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded border border-emerald-200 inline-block">
                +15% vs last week
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">This Month</p>
                  <p className="text-3xl font-semibold text-blue-600">${earningsData.currentMonth}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                  <i className="ri-calendar-month-line text-xl text-blue-600"></i>
                </div>
              </div>
              <div className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded border border-blue-200 inline-block">
                +8% vs last month
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Year to Date</p>
                  <p className="text-3xl font-semibold text-purple-600">${earningsData.yearToDate}</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center border border-purple-100">
                  <i className="ri-calendar-year-line text-xl text-purple-600"></i>
                </div>
              </div>
              <div className="text-sm text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded border border-purple-200 inline-block">
                Target: $45,000
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Pending Payment</p>
                  <p className="text-3xl font-semibold text-amber-600">${earningsData.pendingPayment}</p>
                </div>
                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center border border-amber-100">
                  <i className="ri-time-line text-xl text-amber-600"></i>
                </div>
              </div>
              <div className="text-sm text-slate-500">Next payout: Friday</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  Weekly Performance
                </h2>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-sm"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>

              <div className="space-y-4">
                {weeklyEarnings.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{item.week}</p>
                      <p className="text-sm text-slate-600">{item.certificates} certificates</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-600">${item.earnings}</p>
                      <p className="text-sm text-slate-500">${(item.earnings / item.certificates).toFixed(0)} avg</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Payment Methods</h2>
              <div className="space-y-4">
                <div className="p-4 border border-emerald-200 bg-emerald-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <i className="ri-bank-line text-emerald-600 mr-3"></i>
                      <span className="font-medium text-emerald-800">Direct Deposit</span>
                    </div>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded border border-emerald-200">Primary</span>
                  </div>
                  <p className="text-sm text-emerald-700">Commonwealth Bank •••• 4532</p>
                  <p className="text-xs text-emerald-600 mt-1">Next payout: Friday, Jan 19</p>
                </div>

                <div className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <i className="ri-paypal-line text-slate-600 mr-3"></i>
                      <span className="font-medium text-slate-800">PayPal</span>
                    </div>
                    <button className="text-slate-600 hover:text-slate-800 cursor-pointer transition-colors">
                      <i className="ri-settings-line"></i>
                    </button>
                  </div>
                  <p className="text-sm text-slate-600">sarah.johnson@email.com</p>
                  <button className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer transition-colors mt-1">
                    Set as Primary
                  </button>
                </div>

                <button
                  onClick={() => setShowAddPaymentModal(true)}
                  className="w-full p-4 border border-dashed border-slate-300 rounded-lg text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors cursor-pointer"
                >
                  <i className="ri-add-line mr-2"></i>
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-4 sm:p-6 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h2 className="text-xl font-semibold text-slate-900">Transaction History</h2>
                  <button
                    onClick={() => setShowExportModal(true)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap text-sm"
                  >
                    <i className="ri-download-line mr-2"></i>
                    Export
                  </button>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-50 rounded-lg flex items-center justify-center mr-3 sm:mr-4 border border-slate-200">
                          <i className={`${getTransactionIcon(transaction.type)} text-sm sm:text-base`}></i>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 text-sm sm:text-base truncate">{transaction.description}</p>
                          <div className="flex flex-wrap items-center text-xs sm:text-sm text-slate-500 mt-1 gap-1">
                            <span>{transaction.date}</span>
                            {transaction.certificates > 0 && (
                              <>
                                <span className="hidden sm:inline">•</span>
                                <span>{transaction.certificates} certificates</span>
                              </>
                            )}
                            <span className="hidden sm:inline">•</span>
                            <span className={`px-2 py-0.5 text-xs rounded ${transaction.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className={`font-semibold ${getTransactionColor(transaction.amount)} text-sm sm:text-base`}>
                          {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-500">{transaction.id}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 sm:p-6 border-t border-slate-100">
                <button className="w-full p-3 border border-dashed border-slate-300 rounded-lg text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-colors cursor-pointer text-sm sm:text-base">
                  <i className="ri-history-line mr-2"></i>
                  View All Transactions
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Earnings Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm sm:text-base">Total Certificates</span>
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">{earningsData.totalCertificates}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm sm:text-base">Average per Certificate</span>
                    <span className="font-semibold text-emerald-600 text-sm sm:text-base">${earningsData.avgPerCertificate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm sm:text-base">Last Payment</span>
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">${earningsData.lastPayment}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-900 text-sm sm:text-base">Total Earnings</span>
                      <span className="font-semibold text-blue-600 text-base sm:text-lg">${earningsData.yearToDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Tax Information</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <i className="ri-file-text-line text-blue-600 mr-3 text-sm sm:text-base"></i>
                      <span className="font-medium text-blue-800 text-sm sm:text-base">Download Tax Summary</span>
                    </div>
                    <i className="ri-download-line text-blue-600 text-sm sm:text-base"></i>
                  </button>

                  <button className="w-full flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <i className="ri-calculator-line text-emerald-600 mr-3 text-sm sm:text-base"></i>
                      <span className="font-medium text-emerald-800 text-sm sm:text-base">Tax Calculator</span>
                    </div>
                    <i className="ri-arrow-right-s-line text-emerald-600 text-sm sm:text-base"></i>
                  </button>

                  <button className="w-full flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <i className="ri-question-line text-purple-600 mr-3 text-sm sm:text-base"></i>
                      <span className="font-medium text-purple-800 text-sm sm:text-base">Tax Help & FAQ</span>
                    </div>
                    <i className="ri-external-link-line text-purple-600 text-sm sm:text-base"></i>
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-sm p-4 sm:p-6 text-white">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3">
                    <i className="ri-trophy-line text-amber-400 text-sm sm:text-base"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">Performance Goal</h3>
                    <p className="text-slate-300 text-xs sm:text-sm">$45,000 Annual Target</p>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span>Progress</span>
                    <span>{Math.round((earningsData.yearToDate / 45000) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${Math.min((earningsData.yearToDate / 45000) * 100, 100)}%` }}></div>
                  </div>
                </div>
                <p className="text-slate-300 text-xs">
                  ${45000 - earningsData.yearToDate} remaining to reach your goal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left Section */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-wallet-3-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                      Add Payment Method
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base">
                      Set up a new way to receive your earnings
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Payment Method Type Selection */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Payment Method Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <label className={`relative flex flex-col items-center p-6 border-2 rounded-lg cursor-pointer transition-all hover:bg-slate-50 ${paymentMethodType === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                    <input
                      type="radio"
                      name="paymentType"
                      value="bank"
                      checked={paymentMethodType === 'bank'}
                      onChange={(e) => setPaymentMethodType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${paymentMethodType === 'bank' ? 'bg-blue-100' : 'bg-slate-100'}`}>
                      <i className={`ri-bank-line text-xl ${paymentMethodType === 'bank' ? 'text-blue-600' : 'text-slate-600'}`}></i>
                    </div>
                    <h4 className="font-medium text-slate-900 text-center">Bank Account</h4>
                    <p className="text-sm text-slate-600 text-center mt-1">Direct deposit to your bank</p>
                    {paymentMethodType === 'bank' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                    )}
                  </label>

                  <label className={`relative flex flex-col items-center p-6 border-2 rounded-lg cursor-pointer transition-all hover:bg-slate-50 ${paymentMethodType === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                    <input
                      type="radio"
                      name="paymentType"
                      value="paypal"
                      checked={paymentMethodType === 'paypal'}
                      onChange={(e) => setPaymentMethodType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${paymentMethodType === 'paypal' ? 'bg-blue-100' : 'bg-slate-100'}`}>
                      <i className={`ri-paypal-line text-xl ${paymentMethodType === 'paypal' ? 'text-blue-600' : 'text-slate-600'}`}></i>
                    </div>
                    <h4 className="font-medium text-slate-900 text-center">PayPal</h4>
                    <p className="text-sm text-slate-600 text-center mt-1">Fast and secure payments</p>
                    {paymentMethodType === 'paypal' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                    )}
                  </label>

                  <label className={`relative flex flex-col items-center p-6 border-2 rounded-lg cursor-pointer transition-all hover:bg-slate-50 ${paymentMethodType === 'crypto' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                    <input
                      type="radio"
                      name="paymentType"
                      value="crypto"
                      checked={paymentMethodType === 'crypto'}
                      onChange={(e) => setPaymentMethodType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${paymentMethodType === 'crypto' ? 'bg-blue-100' : 'bg-slate-100'}`}>
                      <i className={`ri-money-dollar-circle-line text-xl ${paymentMethodType === 'crypto' ? 'text-blue-600' : 'text-slate-600'}`}></i>
                    </div>
                    <h4 className="font-medium text-slate-900 text-center">Cryptocurrency</h4>
                    <p className="text-sm text-slate-600 text-center mt-1">Bitcoin, Ethereum & more</p>
                    {paymentMethodType === 'crypto' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                    )}
                  </label>

                  <label className={`relative flex flex-col items-center p-6 border-2 rounded-lg cursor-pointer transition-all hover:bg-slate-50 ${paymentMethodType === 'digital' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                    <input
                      type="radio"
                      name="paymentType"
                      value="digital"
                      checked={paymentMethodType === 'digital'}
                      onChange={(e) => setPaymentMethodType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${paymentMethodType === 'digital' ? 'bg-blue-100' : 'bg-slate-100'}`}>
                      <i className={`ri-smartphone-line text-xl ${paymentMethodType === 'digital' ? 'text-blue-600' : 'text-slate-600'}`}></i>
                    </div>
                    <h4 className="font-medium text-slate-900 text-center">Digital Wallet</h4>
                    <p className="text-sm text-slate-600 text-center mt-1">Apple Pay, Google Pay etc</p>
                    {paymentMethodType === 'digital' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Payment Method Details Form */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Payment Details</h3>

                {/* Bank Account Form */}
                {paymentMethodType === 'bank' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Account Holder Name *
                        </label>
                        <input
                          type="text"
                          value={paymentForm.accountHolderName}
                          onChange={(e) => handleFormChange('accountHolderName', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.accountHolderName ? 'border-red-300' : 'border-slate-300'}`}
                          placeholder="Enter full name as it appears on your account"
                        />
                        {formErrors.accountHolderName && (
                          <p className="text-red-600 text-sm mt-1">{formErrors.accountHolderName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Bank Name *
                        </label>
                        <input
                          type="text"
                          value={paymentForm.bankName}
                          onChange={(e) => handleFormChange('bankName', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.bankName ? 'border-red-300' : 'border-slate-300'}`}
                          placeholder="e.g., Commonwealth Bank, Westpac, ANZ"
                        />
                        {formErrors.bankName && (
                          <p className="text-red-600 text-sm mt-1">{formErrors.bankName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          BSB Number *
                        </label>
                        <input
                          type="text"
                          value={paymentForm.bsb}
                          onChange={(e) => handleFormChange('bsb', e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.bsb ? 'border-red-300' : 'border-slate-300'}`}
                          placeholder="123-456"
                          maxLength={6}
                        />
                        {formErrors.bsb && (
                          <p className="text-red-600 text-sm mt-1">{formErrors.bsb}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Account Number *
                        </label>
                        <input
                          type="text"
                          value={paymentForm.accountNumber}
                          onChange={(e) => handleFormChange('accountNumber', e.target.value.replace(/[^0-9]/g, ''))}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.accountNumber ? 'border-red-300' : 'border-slate-300'}`}
                          placeholder="Enter your account number"
                        />
                        {formErrors.accountNumber && (
                          <p className="text-red-600 text-sm mt-1">{formErrors.accountNumber}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Account Type
                      </label>
                      <select
                        value={paymentForm.accountType}
                        onChange={(e) => handleFormChange('accountType', e.target.value)}
                        className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="checking">Savings Account</option>
                        <option value="savings">Checking Account</option>
                        <option value="business">Business Account</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* PayPal Form */}
                {paymentMethodType === 'paypal' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        PayPal Email Address *
                      </label>
                      <input
                        type="email"
                        value={paymentForm.paypalEmail}
                        onChange={(e) => handleFormChange('paypalEmail', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.paypalEmail ? 'border-red-300' : 'border-slate-300'}`}
                        placeholder="your.paypal@email.com"
                      />
                      {formErrors.paypalEmail && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.paypalEmail}</p>
                      )}
                      <p className="text-xs text-slate-500 mt-1">
                        Make sure this email is associated with your PayPal account
                      </p>
                    </div>
                  </div>
                )}

                {/* Cryptocurrency Form */}
                {paymentMethodType === 'crypto' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Cryptocurrency Type
                      </label>
                      <select
                        value={paymentForm.cryptoType}
                        onChange={(e) => handleFormChange('cryptoType', e.target.value)}
                        className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="bitcoin">Bitcoin (BTC)</option>
                        <option value="ethereum">Ethereum (ETH)</option>
                        <option value="litecoin">Litecoin (LTC)</option>
                        <option value="usdc">USD Coin (USDC)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Wallet Address *
                      </label>
                      <input
                        type="text"
                        value={paymentForm.cryptoWallet}
                        onChange={(e) => handleFormChange('cryptoWallet', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm ${formErrors.cryptoWallet ? 'border-red-300' : 'border-slate-300'}`}
                        placeholder="Enter your wallet address"
                      />
                      {formErrors.cryptoWallet && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.cryptoWallet}</p>
                      )}
                      <p className="text-xs text-slate-500 mt-1">
                        Double-check your wallet address. Incorrect addresses cannot be recovered.
                      </p>
                    </div>
                  </div>
                )}

                {/* Digital Wallet Form */}
                {paymentMethodType === 'digital' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Digital Wallet Type
                      </label>
                      <select
                        value={paymentForm.walletType}
                        onChange={(e) => handleFormChange('walletType', e.target.value)}
                        className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="paypal">PayPal</option>
                        <option value="applepay">Apple Pay</option>
                        <option value="googlepay">Google Pay</option>
                        <option value="venmo">Venmo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Wallet Email Address *
                      </label>
                      <input
                        type="email"
                        value={paymentForm.walletEmail}
                        onChange={(e) => handleFormChange('walletEmail', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.walletEmail ? 'border-red-300' : 'border-slate-300'}`}
                        placeholder="Email associated with your digital wallet"
                      />
                      {formErrors.walletEmail && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.walletEmail}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Common Fields */}
                <div className="space-y-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Payment Method Nickname *
                    </label>
                    <input
                      type="text"
                      value={paymentForm.nickname}
                      onChange={(e) => handleFormChange('nickname', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.nickname ? 'border-red-300' : 'border-slate-300'}`}
                      placeholder="e.g., My Primary Bank, PayPal Account"
                    />
                    {formErrors.nickname && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.nickname}</p>
                    )}
                    <p className="text-xs text-slate-500 mt-1">
                      Give this payment method a name to help you identify it
                    </p>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="setPrimary"
                      checked={paymentForm.setPrimary}
                      onChange={(e) => handleFormChange('setPrimary', e.target.checked)}
                      className="w-4 h-4 text-blue-600 mr-3"
                    />
                    <label htmlFor="setPrimary" className="text-sm text-slate-700 cursor-pointer">
                      Set as primary payment method
                    </label>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              {isSubmitting && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      {submitProgress < 30 ? 'Validating payment information...' : submitProgress < 70 ? 'Setting up payment method...' : submitProgress < 100 ? 'Finalizing configuration...' : 'Payment method added successfully!'}
                    </span>
                    <span className="text-sm text-slate-500">{Math.round(submitProgress)}%</span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300 ease-out" style={{ width: `${submitProgress}%` }}></div>
                  </div>

                  <div className="space-y-2">
                    <div className={`flex items-center text-sm ${submitProgress >= 25 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${submitProgress >= 25 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {submitProgress >= 25 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>Verifying payment details</span>
                    </div>
                    <div className={`flex items-center text-sm ${submitProgress >= 50 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${submitProgress >= 50 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {submitProgress >= 50 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>Configuring payment gateway</span>
                    </div>
                    <div className={`flex items-center text-sm ${submitProgress >= 75 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${submitProgress >= 75 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {submitProgress >= 75 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>Securing connection</span>
                    </div>
                    <div className={`flex items-center text-sm ${submitProgress >= 100 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${submitProgress >= 100 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {submitProgress >= 100 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>Payment method ready</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={paymentForm.agreeTerms}
                    onChange={(e) => handleFormChange('agreeTerms', e.target.checked)}
                    className="w-4 h-4 text-blue-600 mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <label htmlFor="agreeTerms" className="text-sm text-slate-700 cursor-pointer">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                        Payment Processing Terms
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                        Privacy Policy
                      </a>
                    </label>
                    {formErrors.agreeTerms && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.agreeTerms}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-shield-check-line text-blue-600"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900 mb-2">Secure Payment Processing</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-blue-800 mb-2">Security Features:</h5>
                        <ul className="space-y-1 text-blue-700">
                          <li>• 256-bit SSL encryption</li>
                          <li>• PCI DSS compliant processing</li>
                          <li>• Multi-factor authentication</li>
                          <li>• Regular security audits</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-800 mb-2">Payment Schedule:</h5>
                        <ul className="space-y-1 text-blue-700">
                          <li>• Weekly automatic payments</li>
                          <li>• Processing time: 2-3 business days</li>
                          <li>• Minimum payout: $100 AUD</li>
                          <li>• No hidden fees or charges</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Left Info */}
              <div className="flex items-center text-sm text-slate-600">
                <i className="ri-shield-check-line mr-2 text-blue-600"></i>
                Your payment information is encrypted and secure
              </div>

              {/* Right Actions */}
              <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4">
                {!isSubmitting && (
                  <>
                    <button
                      onClick={() => setShowAddPaymentModal(false)}
                      className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap w-full sm:w-auto"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddPaymentMethod}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center w-full sm:w-auto"
                    >
                      <i className="ri-wallet-3-line mr-2"></i>
                      Add Payment Method
                    </button>
                  </>
                )}
                {isSubmitting && (
                  <div className="flex items-center text-sm text-slate-600 justify-center sm:justify-start w-full sm:w-auto">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
                    <span>Setting up payment method...</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Export Report Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-download-cloud-2-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Export Earnings Report</h2>
                    <p className="text-slate-600">Download your financial data for analysis and record-keeping</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="w-10 h-10 bg-white hover:bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors border border-slate-200"
                >
                  <i className="ri-close-line text-slate-600 text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Report Type Selection */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Report Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className={`relative flex flex-col p-6 border-2 rounded-lg cursor-pointer transition-all hover:bg-slate-50 ${exportForm.reportType === 'earnings' ? 'border-slate-600 bg-slate-50' : 'border-slate-200'}`}>
                    <input
                      type="radio"
                      name="reportType"
                      value="earnings"
                      checked={exportForm.reportType === 'earnings'}
                      onChange={(e) => setExportForm(prev => ({ ...prev, reportType: e.target.value }))}
                      className="sr-only"
                    />
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${exportForm.reportType === 'earnings' ? 'bg-slate-100' : 'bg-slate-50'}`}>
                        <i className={`ri-money-dollar-circle-line text-lg ${exportForm.reportType === 'earnings' ? 'text-slate-700' : 'text-slate-500'}`}></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Detailed Earnings</h4>
                        <p className="text-sm text-slate-600">All transactions with details</p>
                      </div>
                    </div>
                    {exportForm.reportType === 'earnings' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                    )}
                  </label>

                  <label className={`relative flex flex-col p-6 border-2 rounded-lg cursor-pointer transition-all hover:bg-slate-50 ${exportForm.reportType === 'summary' ? 'border-slate-600 bg-slate-50' : 'border-slate-200'}`}>
                    <input
                      type="radio"
                      name="reportType"
                      value="summary"
                      checked={exportForm.reportType === 'summary'}
                      onChange={(e) => setExportForm(prev => ({ ...prev, reportType: e.target.value }))}
                      className="sr-only"
                    />
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${exportForm.reportType === 'summary' ? 'bg-slate-100' : 'bg-slate-50'}`}>
                        <i className={`ri-bar-chart-line text-lg ${exportForm.reportType === 'summary' ? 'text-slate-700' : 'text-slate-500'}`}></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Performance Summary</h4>
                        <p className="text-sm text-slate-600">Weekly/monthly overview</p>
                      </div>
                    </div>
                    {exportForm.reportType === 'summary' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                    )}
                  </label>

                  <label className={`relative flex flex-col p-6 border-2 rounded-lg cursor-pointer transition-all hover:bg-slate-50 ${exportForm.reportType === 'tax' ? 'border-slate-600 bg-slate-50' : 'border-slate-200'}`}>
                    <input
                      type="radio"
                      name="reportType"
                      value="tax"
                      checked={exportForm.reportType === 'tax'}
                      onChange={(e) => setExportForm(prev => ({ ...prev, reportType: e.target.value }))}
                      className="sr-only"
                    />
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${exportForm.reportType === 'tax' ? 'bg-slate-100' : 'bg-slate-50'}`}>
                        <i className={`ri-calculator-line text-lg ${exportForm.reportType === 'tax' ? 'text-slate-700' : 'text-slate-500'}`}></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Tax Report</h4>
                        <p className="text-sm text-slate-600">For tax filing purposes</p>
                      </div>
                    </div>
                    {exportForm.reportType === 'tax' && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                        <i className="ri-check-line text-white text-sm"></i>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Export Format and Options */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Export Format</h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="format"
                        value="csv"
                        checked={exportForm.format === 'csv'}
                        onChange={(e) => setExportForm(prev => ({ ...prev, format: e.target.value }))}
                        className="w-4 h-4 text-slate-600 mr-4"
                      />
                      <div className="flex-1 flex items-center">
                        <i className="ri-file-text-line text-blue-600 text-xl mr-4"></i>
                        <div>
                          <h4 className="font-medium text-slate-900">CSV</h4>
                          <p className="text-sm text-slate-600">Spreadsheet compatible format</p>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="format"
                        value="excel"
                        checked={exportForm.format === 'excel'}
                        onChange={(e) => setExportForm(prev => ({ ...prev, format: e.target.value }))}
                        className="w-4 h-4 text-slate-600 mr-4"
                      />
                      <div className="flex-1 flex items-center">
                        <i className="ri-file-excel-line text-emerald-600 text-xl mr-4"></i>
                        <div>
                          <h4 className="font-medium text-slate-900">Excel</h4>
                          <p className="text-sm text-slate-600">Advanced formatting and charts</p>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="format"
                        value="pdf"
                        checked={exportForm.format === 'pdf'}
                        onChange={(e) => setExportForm(prev => ({ ...prev, format: e.target.value }))}
                        className="w-4 h-4 text-slate-600 mr-4"
                      />
                      <div className="flex-1 flex items-center">
                        <i className="ri-file-pdf-line text-red-600 text-xl mr-4"></i>
                        <div>
                          <h4 className="font-medium text-slate-900">PDF</h4>
                          <p className="text-sm text-slate-600">Professional report format</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Date Range</h3>
                  <select
                    value={exportForm.dateRange}
                    onChange={(e) => setExportForm(prev => ({ ...prev, dateRange: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 mb-4"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                    <option value="ytd">Year to Date</option>
                    <option value="all">All Time</option>
                    <option value="custom">Custom Range</option>
                  </select>

                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Additional Options</h3>
                  <div className="space-y-3">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportForm.includeTransactions}
                        onChange={(e) => setExportForm(prev => ({ ...prev, includeTransactions: e.target.checked }))}
                        className="w-4 h-4 text-slate-600 mt-1 mr-3"
                      />
                      <div>
                        <span className="text-sm font-medium text-slate-900">Include Transaction Details</span>
                        <p className="text-xs text-slate-500">Individual transaction records</p>
                      </div>
                    </label>

                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportForm.includeTaxInfo}
                        onChange={(e) => setExportForm(prev => ({ ...prev, includeTaxInfo: e.target.checked }))}
                        className="w-4 h-4 text-slate-600 mt-1 mr-3"
                      />
                      <div>
                        <span className="text-sm font-medium text-slate-900">Include Tax Information</span>
                        <p className="text-xs text-slate-500">GST calculations and tax categories</p>
                      </div>
                    </label>

                    {(exportForm.format === 'excel' || exportForm.format === 'pdf') && (
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exportForm.includeCharts}
                          onChange={(e) => setExportForm(prev => ({ ...prev, includeCharts: e.target.checked }))}
                          className="w-4 h-4 text-slate-600 mt-1 mr-3"
                        />
                        <div>
                          <span className="text-sm font-medium text-slate-900">Include Charts & Graphs</span>
                          <p className="text-xs text-slate-500">Visual performance analytics</p>
                        </div>
                      </label>
                    )}

                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportForm.emailReport}
                        onChange={(e) => setExportForm(prev => ({ ...prev, emailReport: e.target.checked }))}
                        className="w-4 h-4 text-slate-600 mt-1 mr-3"
                      />
                      <div>
                        <span className="text-sm font-medium text-slate-900">Email Report</span>
                        <p className="text-xs text-slate-500">Send copy to your email address</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Export Progress */}
              {isExporting && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      {exportProgress < 30 ? 'Preparing data...' : exportProgress < 60 ? 'Generating report...' : exportProgress < 90 ? 'Formatting document...' : exportProgress < 100 ? 'Finalizing export...' : 'Export complete!'}
                    </span>
                    <span className="text-sm text-slate-500">{Math.round(exportProgress)}%</span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-slate-500 to-slate-700 h-2 rounded-full transition-all duration-300 ease-out" style={{ width: `${exportProgress}%` }}></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={`flex items-center text-sm ${exportProgress >= 25 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${exportProgress >= 25 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {exportProgress >= 25 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>Data collection</span>
                    </div>
                    <div className={`flex items-center text-sm ${exportProgress >= 50 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${exportProgress >= 50 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {exportProgress >= 50 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>Report generation</span>
                    </div>
                    <div className={`flex items-center text-sm ${exportProgress >= 75 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${exportProgress >= 75 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {exportProgress >= 75 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>Document formatting</span>
                    </div>
                    <div className={`flex items-center text-sm ${exportProgress >= 100 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${exportProgress >= 100 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {exportProgress >= 100 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>Download preparation</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Export Preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="ri-eye-line text-blue-600"></i>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900">Export Preview</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Report Type:</span>
                    <span className="ml-2 font-medium text-slate-900 capitalize">{exportForm.reportType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Records:</span>
                    <span className="ml-2 font-medium text-slate-900">{getExportPreview()} entries</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Format:</span>
                    <span className="ml-2 font-medium text-slate-900">{exportForm.format.toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Date Range:</span>
                    <span className="ml-2 font-medium text-slate-900 capitalize">{exportForm.dateRange}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">File Size:</span>
                    <span className="ml-2 font-medium text-slate-900">~{Math.ceil(getExportPreview() * 0.5)}KB</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Currency:</span>
                    <span className="ml-2 font-medium text-slate-900">{exportForm.currency}</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-shield-check-line text-amber-600"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-amber-800 mb-2">Data Security & Privacy</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-amber-800 mb-2">Security Features:</h5>
                        <ul className="space-y-1 text-amber-700">
                          <li>• Encrypted data transmission</li>
                          <li>• Secure file generation</li>
                          <li>• No data stored on external servers</li>
                          <li>• GDPR compliant processing</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-amber-800 mb-2">Data Handling:</h5>
                        <ul className="space-y-1 text-amber-700">
                          <li>• Local file download only</li>
                          <li>• No third-party data sharing</li>
                          <li>• Automatic cleanup after export</li>
                          <li>• Audit trail maintained</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex flex-col gap-4">
              {/* Heading Row */}
              <div className="flex items-center text-sm text-slate-600">
                <i className="ri-information-line mr-2 text-blue-600"></i>
                Export will include {getExportPreview()} records from your {exportForm.dateRange} period
              </div>

              {/* Buttons Row */}
              <div className="flex justify-end space-x-4">
                {!isExporting && (
                  <>
                    <button
                      onClick={() => setShowExportModal(false)}
                      className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleExportReport}
                      className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap flex items-center"
                    >
                      <i className="ri-download-cloud-2-line mr-2"></i>
                      Generate Export
                    </button>
                  </>
                )}
                {isExporting && (
                  <div className="flex items-center text-sm text-slate-600">
                    <div className="animate-spin w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full mr-2"></div>
                    <span>Generating report...</span>
                  </div>
                )}
              </div>
            </div>


          </div>
        </div>
      )}

      {/* Tax Summary Download Modal */}
      {showTaxSummaryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-file-text-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Tax Summary Report</h2>
                    <p className="text-slate-600">Generate comprehensive tax documentation</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTaxSummaryModal(false)}
                  className="w-10 h-10 bg-white hover:bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors border border-slate-200"
                >
                  <i className="ri-close-line text-slate-600 text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Financial Year Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Financial Year</label>
                <div className="grid grid-cols-4 gap-3">
                  {['2021', '2022', '2023', '2024'].map(year => (
                    <label key={year} className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors ${taxSummaryForm.financialYear === year ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                      <input
                        type="radio"
                        name="financialYear"
                        value={year}
                        checked={taxSummaryForm.financialYear === year}
                        onChange={(e) => setTaxSummaryForm(prev => ({ ...prev, financialYear: e.target.value }))}
                        className="w-4 h-4 text-blue-600 mr-2"
                      />
                      <span className="font-medium text-slate-900">FY{year}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Export Format */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Export Format</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors ${taxSummaryForm.format === 'pdf' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                    <input
                      type="radio"
                      name="format"
                      value="pdf"
                      checked={taxSummaryForm.format === 'pdf'}
                      onChange={(e) => setTaxSummaryForm(prev => ({ ...prev, format: e.target.value }))}
                      className="w-4 h-4 text-blue-600 mr-3"
                    />
                    <div className="text-center flex-1">
                      <i className="ri-file-pdf-line text-2xl text-red-600 mb-2 block"></i>
                      <span className="text-sm font-medium text-slate-900">PDF Report</span>
                      <p className="text-xs text-slate-500">Professional format for accountants</p>
                    </div>
                  </label>
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors ${taxSummaryForm.format === 'csv' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}>
                    <input
                      type="radio"
                      name="format"
                      value="csv"
                      checked={taxSummaryForm.format === 'csv'}
                      onChange={(e) => setTaxSummaryForm(prev => ({ ...prev, format: e.target.value }))}
                      className="w-4 h-4 text-blue-600 mr-3"
                    />
                    <div className="text-center flex-1">
                      <i className="ri-file-excel-line text-2xl text-emerald-600 mb-2 block"></i>
                      <span className="text-sm font-medium text-slate-900">CSV Data</span>
                      <p className="text-xs text-slate-500">Import into accounting software</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Report Options */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Include in Report</label>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={taxSummaryForm.includeBreakdown}
                      onChange={(e) => setTaxSummaryForm(prev => ({ ...prev, includeBreakdown: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Certificate Type Breakdown</span>
                      <p className="text-xs text-slate-500">Detailed earnings by certificate category</p>
                    </div>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={taxSummaryForm.includeGST}
                      onChange={(e) => setTaxSummaryForm(prev => ({ ...prev, includeGST: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">GST Calculations</span>
                      <p className="text-xs text-slate-500">GST liability and payment details</p>
                    </div>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={taxSummaryForm.includeDeductions}
                      onChange={(e) => setTaxSummaryForm(prev => ({ ...prev, includeDeductions: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Allowable Deductions</span>
                      <p className="text-xs text-slate-500">Professional expenses and equipment costs</p>
                    </div>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={taxSummaryForm.includeQuarterly}
                      onChange={(e) => setTaxSummaryForm(prev => ({ ...prev, includeQuarterly: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Quarterly Breakdown</span>
                      <p className="text-xs text-slate-500">Income distribution across financial quarters</p>
                    </div>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={taxSummaryForm.emailCopy}
                      onChange={(e) => setTaxSummaryForm(prev => ({ ...prev, emailCopy: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 mr-3"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Email Copy</span>
                      <p className="text-xs text-slate-500">Send a copy to your registered email address</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Tax Summary Preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="ri-information-line text-blue-600"></i>
                  </div>
                  <h4 className="text-sm font-medium text-slate-900">FY{taxSummaryForm.financialYear} Tax Summary</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Gross Earnings:</span>
                    <span className="ml-2 font-medium text-slate-900">$31,200.00</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Total Certificates:</span>
                    <span className="ml-2 font-medium text-slate-900">395</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Estimated GST:</span>
                    <span className="ml-2 font-medium text-slate-900">$2,836.36</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Est. Taxable Income:</span>
                    <span className="ml-2 font-medium text-slate-900">$26,300.00</span>
                  </div>
                </div>
              </div>

              {/* Download Progress */}
              {downloadingTaxSummary && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      {taxDownloadProgress < 30 ? 'Calculating tax liability...' : taxDownloadProgress < 60 ? 'Generating deductions report...' : taxDownloadProgress < 90 ? 'Formatting tax summary...' : 'Finalizing download...'}
                    </span>
                    <span className="text-sm text-slate-500">{Math.round(taxDownloadProgress)}%</span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300 ease-out" style={{ width: `${taxDownloadProgress}%` }}></div>
                  </div>

                  <div className="space-y-2">
                    <div className={`flex items-center text-sm ${taxDownloadProgress >= 25 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${taxDownloadProgress >= 25 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {taxDownloadProgress >= 25 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>Income data compilation</span>
                    </div>
                    <div className={`flex items-center text-sm ${taxDownloadProgress >= 50 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${taxDownloadProgress >= 50 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {taxDownloadProgress >= 50 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>GST calculations and deductions</span>
                    </div>
                    <div className={`flex items-center text-sm ${taxDownloadProgress >= 75 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${taxDownloadProgress >= 75 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {taxDownloadProgress >= 75 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>Report formatting and validation</span>
                    </div>
                    <div className={`flex items-center text-sm ${taxDownloadProgress >= 100 ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${taxDownloadProgress >= 100 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {taxDownloadProgress >= 100 ? <i className="ri-check-line text-xs"></i> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                      </div>
                      <span>Document generation complete</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tax Compliance Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-alert-line text-amber-600"></i>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-amber-800">Tax Compliance Notice</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      This summary is for informational purposes. Please consult with a qualified tax professional
                      for official tax advice and ensure compliance with current ATO regulations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-between items-center">
              <div className="flex items-center text-sm text-slate-600">
                <i className="ri-shield-check-line mr-2 text-emerald-600"></i>
                Secure download - data encrypted and privacy protected
              </div>

              <div className="flex space-x-4">
                {!downloadingTaxSummary && (
                  <>
                    <button
                      onClick={() => setShowTaxSummaryModal(false)}
                      className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDownloadTaxSummary}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap flex items-center"
                    >
                      <i className="ri-download-cloud-2-line mr-2"></i>
                      Generate Tax Summary
                    </button>
                  </>
                )}
                {downloadingTaxSummary && (
                  <div className="flex items-center text-sm text-slate-600">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
                    <span>Generating your tax summary...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
