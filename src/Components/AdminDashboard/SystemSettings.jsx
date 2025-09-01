'use client';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState('payment');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddPractitioner, setShowAddPractitioner] = useState(false);
  const [showExportReports, setShowExportReports] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  //   const [saveStatus, setSaveStatus] = useState <'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveStatus, setSaveStatus] = useState('idle');
  const [settings, setSettings] = useState({
    doctorFee: 79,
    pharmacistFee: 49,
    donationAmount: 0,
    studentDiscount: 20,
    frontlineDiscount: 15,
    stripePublicKey: 'pk_test_...',
    stripeSecretKey: '••••••••••••',
    smsProvider: 'NetCode',
    smsApiKey: '••••••••••••',
    emailProvider: 'SendGrid',
    emailApiKey: '••••••••••••',
    backupFrequency: 'daily',
    dataRetention: 7,
    maintenanceMode: false,
    twoFactorRequired: true,
    sessionTimeout: 30,
  });
  const [practitionerForm, setPractitionerForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ahpraNumber: '',
    specialization: '',
    qualification: '',
  });
  const [exportForm, setExportForm] = useState({
    reportType: 'revenue',
    dateRange: 'month',
    format: 'pdf',
    includeCharts: true,
  });

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    // Reset save status when settings change
    setSaveStatus('idle');
  };

  const handleSaveConfiguration = async () => {
    try {
      setIsSaving(true);
      setSaveStatus('saving');
      // Simulate API call to save settings
      console.log('Saving settings configuration:', settings);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Validate required fields
      if (!settings.stripePublicKey || !settings.emailApiKey || !settings.smsApiKey) {
        throw new Error('Please fill in all required API keys');
      }
      // Success state
      setSaveStatus('success');
      // Show success message temporarily
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error saving configuration:', error);
      setSaveStatus('error');
      // Reset error state after 3 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddPractitioner = () => {
    // Practitioner add करने की functionality यहां होगी
    console.log('Adding practitioner:', practitionerForm);
    setShowAddPractitioner(false);
    setPractitionerForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      ahpraNumber: '',
      specialization: '',
      qualification: '',
    });
    // Success message show करें
    alert('Practitioner successfully added to the system!');
  };

  // ------------------------------------------------------------------------
  // New: Export report handler (was missing, caused a compile error)
  // ------------------------------------------------------------------------
  const handleExportReport = async () => {
    try {
      console.log('Exporting report:', exportForm);
      // Simulate a short delay for the export process
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowExportReports(false);
      alert('Report export started! You will receive download link via email.');
    } catch (err) {
      console.error('Error exporting report:', err);
      alert('Failed to start export. Please try again.');
    }
  };
  // ------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">System Settings</h1>
                <p className="text-slate-600 mt-1 text-sm sm:text-base">Configure platform settings and compliance</p>
              </div>
            </div>
          </div>
        </header>
        
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Settings Navigation */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1">
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center ${activeTab === 'payment' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <i className="ri-bank-card-line mr-3"></i>
                  <span className="truncate">Payment Settings</span>
                </button>
                <button
                  onClick={() => setActiveTab('email')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center ${activeTab === 'email' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <i className="ri-mail-line mr-3"></i>
                  <span className="truncate">Email & SMS</span>
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center ${activeTab === 'security' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <i className="ri-shield-line mr-3"></i>
                  <span className="truncate">Security & Compliance</span>
                </button>
                <button
                  onClick={() => setActiveTab('system')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center ${activeTab === 'system' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <i className="ri-settings-line mr-3"></i>
                  <span className="truncate">System Configuration</span>
                </button>
              </div>
            </div>
            
            {/* Settings Content */}
            <div className="flex-1">
              {/* Payment Settings */}
              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">Certificate Pricing</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Doctor Certificate Fee ($)</label>
                        <input
                          type="number"
                          value={settings.doctorFee}
                          onChange={(e) => handleSettingChange('doctorFee', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Pharmacist Certificate Fee ($)</label>
                        <input
                          type="number"
                          value={settings.pharmacistFee}
                          onChange={(e) => handleSettingChange('pharmacistFee', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Charity Donation Amount ($)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={settings.donationAmount}
                          onChange={(e) => handleSettingChange('donationAmount', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">Discount Settings</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Student Discount (%)</label>
                        <input
                          type="number"
                          value={settings.studentDiscount}
                          onChange={(e) => handleSettingChange('studentDiscount', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Frontline Worker Discount (%)</label>
                        <input
                          type="number"
                          value={settings.frontlineDiscount}
                          onChange={(e) => handleSettingChange('frontlineDiscount', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">Stripe Configuration</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Stripe Public Key</label>
                        <input
                          type="text"
                          value={settings.stripePublicKey}
                          onChange={(e) => handleSettingChange('stripePublicKey', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Stripe Secret Key</label>
                        <input
                          type="password"
                          value={settings.stripeSecretKey}
                          onChange={(e) => handleSettingChange('stripeSecretKey', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
              )}
              
              {/* Email & SMS Settings */}
              {activeTab === 'email' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">SMS Configuration (NetCode API)</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">SMS Provider</label>
                        <select
                          value={settings.smsProvider}
                          onChange={(e) => handleSettingChange('smsProvider', e.target.value)}
                          className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="NetCode">NetCode SMS</option>
                          <option value="Twilio">Twilio</option>
                          <option value="MessageBird">MessageBird</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">SMS API Key</label>
                        <input
                          type="password"
                          value={settings.smsApiKey}
                          onChange={(e) => handleSettingChange('smsApiKey', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">Email Configuration</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email Provider</label>
                        <select
                          value={settings.emailProvider}
                          onChange={(e) => handleSettingChange('emailProvider', e.target.value)}
                          className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="SendGrid">SendGrid</option>
                          <option value="AWS SES">AWS SES</option>
                          <option value="Mailgun">Mailgun</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email API Key</label>
                        <input
                          type="password"
                          value={settings.emailApiKey}
                          onChange={(e) => handleSettingChange('emailApiKey', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">Email Templates</h2>
                    <div className="space-y-4">
                      <button className="w-full text-left p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-slate-900">Certificate Approval Notification</h3>
                            <p className="text-sm text-slate-500">Email sent when certificate is approved</p>
                          </div>
                          <i className="ri-edit-line text-slate-400"></i>
                        </div>
                      </button>
                      <button className="w-full text-left p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-slate-900">OTP Verification</h3>
                            <p className="text-sm text-slate-500">SMS template for OTP codes</p>
                          </div>
                          <i className="ri-edit-line text-slate-400"></i>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">Authentication & Access</h2>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-medium text-slate-900">Two-Factor Authentication Required</h3>
                          <p className="text-sm text-slate-500">Require 2FA for all admin accounts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.twoFactorRequired}
                            onChange={(e) => handleSettingChange('twoFactorRequired', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Session Timeout (minutes)</label>
                        <input
                          type="number"
                          value={settings.sessionTimeout}
                          onChange={(e) => handleSettingChange('sessionTimeout', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">Data Compliance</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Data Retention Period (years)</label>
                        <select
                          value={settings.dataRetention}
                          onChange={(e) => handleSettingChange('dataRetention', Number(e.target.value))}
                          className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value={3}>3 years</option>
                          <option value={5}>5 years</option>
                          <option value={7}>7 years (Recommended)</option>
                          <option value={10}>10 years</option>
                        </select>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex">
                          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                            <i className="ri-information-line text-blue-600"></i>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">Australian Privacy Compliance</h3>
                            <p className="text-sm text-blue-700 mt-1">
                              Data is hosted in Australia and complies with the Privacy Act 1988 and Australian health data regulations.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">Audit & Logging</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <i className="ri-check-line text-green-600"></i>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-green-800">Login Attempts</p>
                              <p className="text-sm text-green-600">Enabled</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <i className="ri-check-line text-green-600"></i>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-green-800">Certificate Actions</p>
                              <p className="text-sm text-green-600">Enabled</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* System Settings */}
              {activeTab === 'system' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">System Maintenance</h2>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-medium text-slate-900">Maintenance Mode</h3>
                          <p className="text-sm text-slate-500">Temporarily disable public access for maintenance</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.maintenanceMode}
                            onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Backup Frequency</label>
                        <select
                          value={settings.backupFrequency}
                          onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                          className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="hourly">Hourly</option>
                          <option value="daily">Daily (Recommended)</option>
                          <option value="weekly">Weekly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">Symptom Triage Rules</h2>
                    <div className="space-y-4">
                      <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                        <div className="flex">
                          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                            <i className="ri-error-warning-line text-red-600"></i>
                          </div>
                          <div className="ml-3 flex-1">
                            <h3 className="text-sm font-medium text-red-800">Emergency Symptoms</h3>
                            <p className="text-sm text-red-700 mt-1">
                              Chest pain, difficulty breathing, severe injuries → Immediate "Call 000" redirect
                            </p>
                            <button className="mt-2 text-sm text-red-600 hover:text-red-700 cursor-pointer">
                              Edit Rules →
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                        <div className="flex">
                          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                            <i className="ri-alert-line text-yellow-600"></i>
                          </div>
                          <div className="ml-3 flex-1">
                            <h3 className="text-sm font-medium text-yellow-800">Doctor Required Symptoms</h3>
                            <p className="text-sm text-yellow-700 mt-1">
                              Complex conditions requiring doctor assessment → Route to doctor only
                            </p>
                            <button className="mt-2 text-sm text-yellow-600 hover:text-yellow-700 cursor-pointer">
                              Edit Rules →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Save Button */}
              <div className="mt-8">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={handleSaveConfiguration}
                    disabled={isSaving}
                    className={`px-6 py-3 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center justify-center ${isSaving
                        ? 'bg-slate-400 text-white cursor-not-allowed'
                        : saveStatus === 'success'
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : saveStatus === 'error'
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-slate-700 text-white hover:bg-slate-800'
                      }`}
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving Configuration...
                      </>
                    ) : saveStatus === 'success' ? (
                      <>
                        <i className="ri-check-double-line mr-2"></i>
                        Configuration Saved Successfully!
                      </>
                    ) : saveStatus === 'error' ? (
                      <>
                        <i className="ri-error-warning-line mr-2"></i>
                        Save Failed - Retry
                      </>
                    ) : (
                      <>
                        <i className="ri-save-line mr-2"></i>
                        Save Configuration
                      </>
                    )}
                  </button>
                  {saveStatus === 'success' && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
                      <div className="flex items-center">
                        <i className="ri-check-line text-emerald-600 mr-2"></i>
                        <span className="text-sm text-emerald-800 font-medium">
                          All settings have been updated successfully
                        </span>
                      </div>
                    </div>
                  )}
                  {saveStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                      <div className="flex items-center">
                        <i className="ri-error-warning-line text-red-600 mr-2"></i>
                        <span className="text-sm text-red-800 font-medium">
                          Failed to save settings. Please check required fields.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Settings Summary */}
                <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Configuration Summary</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Doctor Fee:</span>
                      <span className="ml-2 font-medium text-slate-900">${settings.doctorFee}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Pharmacist Fee:</span>
                      <span className="ml-2 font-medium text-slate-900">${settings.pharmacistFee}</span>
                    </div>
                    {/* <div>
                      <span className="text-slate-500">Student Discount:</span>
                      <span className="ml-2 font-medium text-slate-900">{settings.studentDiscount}%</span>
                    </div> */}
                    <div>
                      <span className="text-slate-500">Data Retention:</span>
                      <span className="ml-2 font-medium text-slate-900">{settings.dataRetention} years</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Backup:</span>
                      <span className="ml-2 font-medium text-slate-900">{settings.backupFrequency}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">2FA Required:</span>
                      <span className={`ml-2 font-medium ${settings.twoFactorRequired ? 'text-emerald-600' : 'text-red-600'}`}>
                        {settings.twoFactorRequired ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Maintenance:</span>
                      <span className={`ml-2 font-medium ${settings.maintenanceMode ? 'text-red-600' : 'text-emerald-600'}`}>
                        {settings.maintenanceMode ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Session Timeout:</span>
                      <span className="ml-2 font-medium text-slate-900">{settings.sessionTimeout}min</span>
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-refresh-line mr-2"></i>
                    Reset to Defaults
                  </button>
                  <button
                    onClick={() => setShowExportReports(true)}
                    className="flex items-center justify-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-download-cloud-2-line mr-2"></i>
                    Export Settings
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Practitioner Modal */}
      {showAddPractitioner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Add New Practitioner</h2>
                <button
                  onClick={() => setShowAddPractitioner(false)}
                  className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                >
                  <i className="ri-close-line text-slate-600 text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    value={practitionerForm.firstName}
                    onChange={(e) => setPractitionerForm((prev) => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={practitionerForm.lastName}
                    onChange={(e) => setPractitionerForm((prev) => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={practitionerForm.email}
                  onChange={(e) => setPractitionerForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="practitioner@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={practitionerForm.phone}
                  onChange={(e) => setPractitionerForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="+61 400 000 000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">AHPRA Registration Number *</label>
                <input
                  type="text"
                  required
                  value={practitionerForm.ahpraNumber}
                  onChange={(e) => setPractitionerForm((prev) => ({ ...prev, ahpraNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="MED0001234567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Specialization *</label>
                <select
                  required
                  value={practitionerForm.specialization}
                  onChange={(e) => setPractitionerForm((prev) => ({ ...prev, specialization: e.target.value }))}
                  className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select specialization</option>
                  <option value="General Practitioner">General Practitioner</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Nurse Practitioner">Nurse Practitioner</option>
                  <option value="Specialist Doctor">Specialist Doctor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Qualification</label>
                <input
                  type="text"
                  value={practitionerForm.qualification}
                  onChange={(e) => setPractitionerForm((prev) => ({ ...prev, qualification: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="MBBS, FRACGP, etc."
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <i className="ri-information-line text-blue-600"></i>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">Verification Process</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      AHPRA registration will be automatically verified. Practitioner will receive login credentials via
                      email.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowAddPractitioner(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPractitioner}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-user-add-line mr-2"></i>
                Add Practitioner
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Export Reports Modal */}
      {showExportReports && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="p-4 sm:p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Export Reports</h2>
                <button
                  onClick={() => setShowExportReports(false)}
                  className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                >
                  <i className="ri-close-line text-slate-600 text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Report Type</label>
                <select
                  value={exportForm.reportType}
                  onChange={(e) => setExportForm((prev) => ({ ...prev, reportType: e.target.value }))}
                  className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="revenue">Revenue Analytics</option>
                  <option value="certificates">Certificate Performance</option>
                  <option value="practitioners">Practitioner Performance</option>
                  <option value="compliance">Compliance Audit</option>
                  <option value="users">User Management</option>
                  <option value="payments">Payment Transactions</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
                <select
                  value={exportForm.dateRange}
                  onChange={(e) => setExportForm((prev) => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Export Format</label>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="pdf"
                      checked={exportForm.format === 'pdf'}
                      onChange={(e) => setExportForm((prev) => ({ ...prev, format: e.target.value }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 text-sm text-slate-700">
                      <i className="ri-file-pdf-line text-red-500 mr-2"></i>
                      PDF Report
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="excel"
                      checked={exportForm.format === 'excel'}
                      onChange={(e) => setExportForm((prev) => ({ ...prev, format: e.target.value }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 text-sm text-slate-700">
                      <i className="ri-file-excel-line text-emerald-500 mr-2"></i>
                      Excel Spreadsheet
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="csv"
                      checked={exportForm.format === 'csv'}
                      onChange={(e) => setExportForm((prev) => ({ ...prev, format: e.target.value }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 text-sm text-slate-700">
                      <i className="ri-file-text-line text-blue-500 mr-2"></i>
                      CSV Data
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeCharts"
                  checked={exportForm.includeCharts}
                  onChange={(e) => setExportForm((prev) => ({ ...prev, includeCharts: e.target.checked }))}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="includeCharts" className="ml-3 text-sm text-slate-700 cursor-pointer">
                  Include charts and visualizations (PDF only)
                </label>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-yellow-600"></i>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-yellow-800">Processing Time</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Large reports may take 2-5 minutes to generate. Download link will be sent to your email.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowExportReports(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleExportReport}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-download-cloud-2-line mr-2"></i>
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}