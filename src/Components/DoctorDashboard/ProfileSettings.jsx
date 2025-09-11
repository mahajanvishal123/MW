import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function ProfileSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

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

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    weeklyReports: true
  });

  const [preferences, setPreferences] = useState({
    timezone: 'Australia/Sydney',
    dateFormat: 'DD/MM/YYYY',
    currency: 'AUD',
    language: 'English',
    autoApprove: false,
    reminderTime: '2 hours'
  });

  const validatePassword = (password) => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      matches: password === passwordForm.confirmPassword && password !== ''
    };
  };

  const handlePasswordChange = (field, value) => {
    const updated = { ...passwordForm, [field]: value };
    setPasswordForm(updated);

    if (field === 'newPassword' || field === 'confirmPassword') {
      const validation = validatePassword(field === 'newPassword' ? value : updated.newPassword);
      validation.matches = updated.newPassword === updated.confirmPassword && updated.newPassword !== '';
      setPasswordValidation(validation);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getPasswordStrength = () => {
    const { minLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar } = passwordValidation;
    const score = [minLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar].filter(Boolean).length;

    if (score === 0) return { level: 'none', color: 'bg-slate-200', text: 'Enter password' };
    if (score <= 2) return { level: 'weak', color: 'bg-red-500', text: 'Weak' };
    if (score <= 3) return { level: 'fair', color: 'bg-orange-500', text: 'Fair' };
    if (score <= 4) return { level: 'good', color: 'bg-yellow-500', text: 'Good' };
    return { level: 'strong', color: 'bg-emerald-500', text: 'Strong' };
  };

  const isPasswordFormValid = () => {
    const { minLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar, matches } = passwordValidation;
    return passwordForm.currentPassword &&
      minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar && matches;
  };

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

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleSecurityToggle = (setting) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handlePreferenceChange = (setting, value) => {
    setPreferences(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="p-5">
      <div className="flex-1 flex flex-col">
        <header>
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mr-6">
                <h1 className="text-2xl font-semibold text-slate-900">Profile & Settings</h1>
                <p className="text-slate-600 mt-1">Manage your account and preferences</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 mt-5 overflow-y-auto">
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
            <div className="border-b border-slate-200">
              <nav className="flex flex-col sm:flex-row">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === 'profile'
                    ? 'border-slate-500 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                >
                  <i className="ri-user-line mr-2"></i>
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === 'security'
                    ? 'border-slate-500 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                >
                  <i className="ri-shield-line mr-2"></i>
                  Security & Notifications
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === 'preferences'
                    ? 'border-slate-500 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                >
                  <i className="ri-settings-line mr-2"></i>
                  Preferences
                </button>
              </nav>
            </div>

            {/* Profile Information Tab */}
            {activeTab === 'profile' && (
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

            {/* Security & Notifications Tab */}
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

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-900">System Preferences</h3>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
                      <select
                        value={preferences.timezone}
                        onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                        className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                      >
                        <option value="Australia/Sydney">Australia/Sydney</option>
                        <option value="Australia/Melbourne">Australia/Melbourne</option>
                        <option value="Australia/Brisbane">Australia/Brisbane</option>
                        <option value="Australia/Perth">Australia/Perth</option>
                        <option value="Australia/Adelaide">Australia/Adelaide</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Date Format</label>
                      <select
                        value={preferences.dateFormat}
                        onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                        className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                      <select
                        value={preferences.currency}
                        onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                        className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                      >
                        <option value="AUD">AUD - Australian Dollar</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                      <select
                        value={preferences.language}
                        onChange={(e) => handlePreferenceChange('language', e.target.value)}
                        className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                      >
                        <option value="English">English</option>
                        <option value="Mandarin">Mandarin Chinese</option>
                        <option value="French">French</option>
                        <option value="Spanish">Spanish</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-900">Certificate Preferences</h3>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-center sm:text-left">
                        <h4 className="font-medium text-slate-900">Auto-approve Simple Requests</h4>
                        <p className="text-sm text-slate-600">
                          Automatically approve standard sick leave requests
                        </p>
                      </div>
                      <label className="relative inline-flex items-start cursor-pointer self-start sm:self-auto">
                        <input
                          type="checkbox"
                          checked={preferences.autoApprove}
                          onChange={(e) =>
                            handlePreferenceChange("autoApprove", e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full 
                    peer peer-checked:after:translate-x-full peer-checked:after:border-white 
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                    after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
                    peer-checked:bg-emerald-600">
                        </div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Reminder Time</label>
                      <select
                        value={preferences.reminderTime}
                        onChange={(e) => handlePreferenceChange('reminderTime', e.target.value)}
                        className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                      >
                        <option value="30 minutes">30 minutes before deadline</option>
                        <option value="1 hour">1 hour before deadline</option>
                        <option value="2 hours">2 hours before deadline</option>
                        <option value="4 hours">4 hours before deadline</option>
                      </select>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex">
                        <div className="w-6 h-6 flex items-center justify-center">
                          <i className="ri-information-line text-amber-600"></i>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-amber-800">Account Verification Status</h4>
                          <p className="text-sm text-amber-700 mt-1">
                            Your AHPRA credentials are verified and up to date. Next verification due: March 2024.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-check-line mr-2"></i>
                    Save Preferences
                  </button>
                  <button className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap">
                    Reset to Defaults
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
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