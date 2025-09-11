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


  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });


  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

    const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    matches: false
  });

    const handlePasswordSubmit = async () => {
    try {
      if (!isPasswordFormValid()) {
        alert('Please ensure all password requirements are met.');
        return;
      }

      // Simulate password change API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Reset form and close modal
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordValidation({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
        matches: false
      });
      setShowPasswordModal(false);

      // Success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-emerald-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 border border-emerald-500';
      notification.innerHTML = `
        <div class="flex items-center">
          <i class="ri-check-double-line mr-3 text-lg"></i>
          <div>
            <div class="font-semibold">Password Updated Successfully!</div>
            <div class="text-sm text-emerald-100">Your account password has been changed</div>
          </div>
        </div>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 5000);

    } catch (error) {
      console.error('Password change failed:', error);
      alert('Failed to update password. Please try again.');
    }
  };

    const isPasswordFormValid = () => {
    const { minLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar, matches } = passwordValidation;
    return passwordForm.currentPassword &&
      minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar && matches;
  };

  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+61 412 345 678',
    ahpraNumber: 'MED0001234567',
    specialization: 'General Practitioner',
    qualification: 'MBBS, FRACGP',
    clinicName: 'Sydney Medical Centre',
    clinicAddress: '123 Health Street, Sydney NSW 2000',
    yearsExperience: '12',
    languages: ['English', 'Mandarin'],
    availability: 'Monday to Friday, 9 AM - 5 PM'
  });





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
                  <span className="truncate">Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center ${activeTab === 'security' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <i className="ri-shield-line mr-3"></i>
                  <span className="truncate">Change Password</span>
                </button>
                {/* <button
                  onClick={() => setActiveTab('system')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center ${activeTab === 'system' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  <i className="ri-settings-line mr-3"></i>
                  <span className="truncate">System Configuration</span>
                </button> */}
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
                <div className="p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center mr-6 border border-slate-200">
                        <i className="ri-user-heart-fill text-slate-600 text-3xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                          Dr. {profileData.firstName} {profileData.lastName}
                        </h2>
                        <p className="text-slate-600 mt-1">{profileData.specialization}</p>
                        <p className="text-sm text-slate-500 mt-1">AHPRA: {profileData.ahpraNumber}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className={`${isEditing ? 'ri-close-line' : 'ri-edit-line'} mr-2`}></i>
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg ${isEditing
                            ? 'border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500'
                            : 'border-slate-200 bg-slate-50 text-slate-500'
                            }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg ${isEditing
                            ? 'border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500'
                            : 'border-slate-200 bg-slate-50 text-slate-500'
                            }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg ${isEditing
                            ? 'border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500'
                            : 'border-slate-200 bg-slate-50 text-slate-500'
                            }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg ${isEditing
                            ? 'border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500'
                            : 'border-slate-200 bg-slate-50 text-slate-500'
                            }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">AHPRA Registration Number</label>
                        <input
                          type="text"
                          value={profileData.ahpraNumber}
                          disabled={true}
                          className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg"
                        />
                        <p className="text-xs text-slate-500 mt-1">AHPRA number cannot be changed. Contact support if needed.</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Specialization</label>
                        <select
                          value={profileData.specialization}
                          onChange={(e) => setProfileData(prev => ({ ...prev, specialization: e.target.value }))}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 pr-8 border rounded-lg ${isEditing
                            ? 'border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500'
                            : 'border-slate-200 bg-slate-50 text-slate-500'
                            }`}
                        >
                          <option value="General Practitioner">General Practitioner</option>
                          <option value="Specialist">Specialist</option>
                          <option value="Nurse Practitioner">Nurse Practitioner</option>
                          <option value="Pharmacist">Pharmacist</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Qualifications</label>
                        <input
                          type="text"
                          value={profileData.qualification}
                          onChange={(e) => setProfileData(prev => ({ ...prev, qualification: e.target.value }))}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg ${isEditing
                            ? 'border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500'
                            : 'border-slate-200 bg-slate-50 text-slate-500'
                            }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Clinic Name</label>
                        <input
                          type="text"
                          value={profileData.clinicName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, clinicName: e.target.value }))}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg ${isEditing
                            ? 'border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500'
                            : 'border-slate-200 bg-slate-50 text-slate-500'
                            }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Clinic Address</label>
                        <textarea
                          value={profileData.clinicAddress}
                          onChange={(e) => setProfileData(prev => ({ ...prev, clinicAddress: e.target.value }))}
                          disabled={!isEditing}
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-lg ${isEditing
                            ? 'border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500'
                            : 'border-slate-200 bg-slate-50 text-slate-500'
                            }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Years of Experience</label>
                        <input
                          type="number"
                          value={profileData.yearsExperience}
                          onChange={(e) => setProfileData(prev => ({ ...prev, yearsExperience: e.target.value }))}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg ${isEditing
                            ? 'border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500'
                            : 'border-slate-200 bg-slate-50 text-slate-500'
                            }`}
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-check-line mr-2"></i>
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="p-8">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Security Settings</h3>
                      <div className="space-y-4">
                        {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900">Two-Factor Authentication</h4>
                          <p className="text-sm text-slate-600">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
                          <input
                            type="checkbox"
                            checked={securitySettings.twoFactorEnabled}
                            onChange={() => handleSecurityToggle('twoFactorEnabled')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white 
    after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div> */}

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-900">Change Password</h4>
                            <p className="text-sm text-slate-600">Update your account password regularly</p>
                          </div>
                          <button
                            onClick={() => setShowPasswordModal(true)}
                            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap w-full sm:w-auto"
                          >
                            Change Password
                          </button>
                        </div>

                      </div>
                    </div>

                    {/* <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                    
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900">Email Notifications</h4>
                          <p className="text-sm text-slate-600">Receive notifications about certificate requests</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
                          <input
                            type="checkbox"
                            checked={securitySettings.emailNotifications}
                            onChange={() => handleSecurityToggle('emailNotifications')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>

                   
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900">SMS Notifications</h4>
                          <p className="text-sm text-slate-600">Get urgent notifications via text message</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
                          <input
                            type="checkbox"
                            checked={securitySettings.smsNotifications}
                            onChange={() => handleSecurityToggle('smsNotifications')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>

                   
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900">Weekly Reports</h4>
                          <p className="text-sm text-slate-600">Receive weekly performance summaries</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
                          <input
                            type="checkbox"
                            checked={securitySettings.weeklyReports}
                            onChange={() => handleSecurityToggle('weeklyReports')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>

                 
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900">Marketing Emails</h4>
                          <p className="text-sm text-slate-600">Receive updates about new features and tips</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer self-start sm:self-center">
                          <input
                            type="checkbox"
                            checked={securitySettings.marketingEmails}
                            onChange={() => handleSecurityToggle('marketingEmails')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                    </div>
                  </div> */}

                  </div>
                </div>
              )}

              {/* System Settings */}
              {/* {activeTab === 'system' && (
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
              )} */}

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
                  {/* <button
                    onClick={() => setShowExportReports(true)}
                    className="flex items-center justify-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-download-cloud-2-line mr-2"></i>
                    Export Settings
                  </button> */}

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

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-lock-password-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Change Password</h2>
                    <p className="text-slate-600">Update your account password for enhanced security</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="w-10 h-10 bg-white hover:bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer transition-colors border border-slate-200"
                >
                  <i className="ri-close-line text-slate-600 text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Password *
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <i className={showPasswords.current ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password *
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <i className={showPasswords.new ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {passwordForm.newPassword && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Password Strength</span>
                      <span
                        className={`text-sm font-medium ${getPasswordStrength().level === 'strong' ? 'text-emerald-600' :
                          getPasswordStrength().level === 'good' ? 'text-yellow-600' :
                            getPasswordStrength().level === 'fair' ? 'text-orange-600' : 'text-red-600'
                          }`}
                      >
                        {getPasswordStrength().text}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrength().color}`}
                        style={{
                          width: `${getPasswordStrength().level === 'strong' ? '100' :
                            getPasswordStrength().level === 'good' ? '75' :
                              getPasswordStrength().level === 'fair' ? '50' :
                                getPasswordStrength().level === 'weak' ? '25' : '0'
                            }%`
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm New Password *
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-slate-500 ${passwordForm.confirmPassword && !passwordValidation.matches
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-slate-300 focus:border-slate-500'
                      }`}
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <i className={showPasswords.confirm ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                  </button>
                </div>
                {passwordForm.confirmPassword && !passwordValidation.matches && (
                  <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Password Requirements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className={`flex items-center text-sm ${passwordValidation.minLength ? 'text-emerald-600' : 'text-slate-500'}`}>
                    <i className={`${passwordValidation.minLength ? 'ri-check-line' : 'ri-close-line'} mr-2`}></i>
                    At least 8 characters
                  </div>
                  <div className={`flex items-center text-sm ${passwordValidation.hasUppercase ? 'text-emerald-600' : 'text-slate-500'}`}>
                    <i className={`${passwordValidation.hasUppercase ? 'ri-check-line' : 'ri-close-line'} mr-2`}></i>
                    One uppercase letter
                  </div>
                  <div className={`flex items-center text-sm ${passwordValidation.hasLowercase ? 'text-emerald-600' : 'text-slate-500'}`}>
                    <i className={`${passwordValidation.hasLowercase ? 'ri-check-line' : 'ri-close-line'} mr-2`}></i>
                    One lowercase letter
                  </div>
                  <div className={`flex items-center text-sm ${passwordValidation.hasNumber ? 'text-emerald-600' : 'text-slate-500'}`}>
                    <i className={`${passwordValidation.hasNumber ? 'ri-check-line' : 'ri-close-line'} mr-2`}></i>
                    One number
                  </div>
                  <div className={`flex items-center text-sm ${passwordValidation.hasSpecialChar ? 'text-emerald-600' : 'text-slate-500'}`}>
                    <i className={`${passwordValidation.hasSpecialChar ? 'ri-check-line' : 'ri-close-line'} mr-2`}></i>
                    One special character
                  </div>
                  <div className={`flex items-center text-sm ${passwordValidation.matches ? 'text-emerald-600' : 'text-slate-500'}`}>
                    <i className={`${passwordValidation.matches ? 'ri-check-line' : 'ri-close-line'} mr-2`}></i>
                    Passwords match
                  </div>
                </div>
              </div>

              {/* Security Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-shield-check-line text-blue-600"></i>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">Security Best Practices</h4>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                      <li>• Use a unique password that you don't use elsewhere</li>
                      <li>• Consider using a password manager for better security</li>
                      <li>• Update your password regularly</li>
                      <li>• Never share your password with anyone</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-between items-center">
              <div className="flex items-center text-sm text-slate-600">
                <i className="ri-lock-line mr-2 text-emerald-600"></i>
                Your password is encrypted and secure
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordSubmit}
                  disabled={!isPasswordFormValid()}
                  className={`px-6 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center ${isPasswordFormValid()
                    ? 'bg-slate-700 text-white hover:bg-slate-800'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                >
                  <i className="ri-shield-check-line mr-2"></i>
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}