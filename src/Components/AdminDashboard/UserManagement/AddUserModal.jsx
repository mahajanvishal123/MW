import React, { useState, useEffect } from 'react';

const AddUserModal = ({ isOpen, onClose, user, onSave }) => {
    const [newUserForm, setNewUserForm] = useState({
        userType: 'patient',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        ahpraNumber: '',
        specialization: '',
        qualification: '',
        password: '',
        confirmPassword: '',
        sendWelcomeEmail: true,
        requireVerification: true
    });

    const [showTwoFactorVerification, setShowTwoFactorVerification] = useState(false);
    const [twoFactorCode, setTwoFactorCode] = useState("");
    const [twoFactorError, setTwoFactorError] = useState("");

    // Reset form when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setNewUserForm({
                userType: 'patient',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                ahpraNumber: '',
                specialization: '',
                qualification: '',
                password: '',
                confirmPassword: '',
                sendWelcomeEmail: true,
                requireVerification: true
            });
            setShowTwoFactorVerification(false);
            setTwoFactorCode("");
            setTwoFactorError("");
        }
    }, [isOpen]);

    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setNewUserForm(prev => ({ ...prev, password: password, confirmPassword: password }));
    };

    const handleProceedTo2FA = (e) => {
        e.preventDefault();

        // Validate form
        if (!newUserForm.firstName || !newUserForm.lastName || !newUserForm.email || !newUserForm.phone || !newUserForm.password || !newUserForm.confirmPassword) {
            setTwoFactorError("Please fill in all required fields");
            return;
        }

        if (newUserForm.password !== newUserForm.confirmPassword) {
            setTwoFactorError("Passwords do not match");
            return;
        }

        if (newUserForm.userType === 'practitioner' && (!newUserForm.ahpraNumber || !newUserForm.specialization)) {
            setTwoFactorError("Please fill in all practitioner fields");
            return;
        }

        // Clear any previous errors and show 2FA verification
        setTwoFactorError("");
        setShowTwoFactorVerification(true);
    };

    const handleVerifyAndCreateUser = () => {
        // Verify 2FA code
        if (twoFactorCode !== "123456") {
            setTwoFactorError("Invalid 2FA code. Please try again.");
            return;
        }

        // If 2FA is valid, proceed with creating the user
        handleAddUser();
    };

    const handleAddUser = () => {
        console.log('Adding new user:', newUserForm);

        // Call the onSave prop if provided
        if (onSave) {
            onSave(newUserForm);
        }

        // Close the modal
        onClose();

        alert(`${newUserForm.userType === 'practitioner' ? 'Practitioner' : 'Patient'} successfully added to the system!`);
    };

    // Don't render if modal is not open
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 sm:p-6 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                            {showTwoFactorVerification ? "Verify User Creation" : "Add New User"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                        >
                            <i className="ri-close-line text-slate-600 text-lg sm:text-xl"></i>
                        </button>
                    </div>
                </div>

                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {showTwoFactorVerification ? (
                        // 2FA Verification Section
                        <div className="space-y-4">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i className="ri-shield-check-line text-blue-600 text-2xl"></i>
                                </div>
                                <h3 className="text-lg font-medium text-slate-900 mb-2">Two-Factor Verification</h3>
                                <p className="text-slate-600 mb-6">Please enter the 6-digit code sent to your administrator email to confirm user creation.</p>
                            </div>

                            <div className="max-w-xs mx-auto">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Verification Code</label>
                                <input
                                    type="text"
                                    value={twoFactorCode}
                                    onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    className="w-full px-4 py-3 text-center text-lg border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="000000"
                                    maxLength={6}
                                />
                                {twoFactorError && (
                                    <p className="text-red-600 text-sm mt-2">{twoFactorError}</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        // User Form Section
                        <>
                            {/* User Type Selection */}

                            {/* Basic Information */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={newUserForm.firstName}
                                        onChange={(e) => setNewUserForm(prev => ({ ...prev, firstName: e.target.value }))}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter first name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={newUserForm.lastName}
                                        onChange={(e) => setNewUserForm(prev => ({ ...prev, lastName: e.target.value }))}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter last name"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        required
                                        value={newUserForm.email}
                                        onChange={(e) => setNewUserForm(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="user@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={newUserForm.phone}
                                        onChange={(e) => setNewUserForm(prev => ({ ...prev, phone: e.target.value }))}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="+61 400 000 000"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">AHPRA Registration Number *</label>
                                    <input
                                        type="text"
                                        required
                                        value={newUserForm.ahpraNumber}
                                        onChange={(e) => setNewUserForm(prev => ({ ...prev, ahpraNumber: e.target.value }))}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="MED0001234567"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Specialization *</label>
                                    <select
                                        required
                                        value={newUserForm.specialization}
                                        onChange={(e) => setNewUserForm(prev => ({ ...prev, specialization: e.target.value }))}
                                        className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select specialization</option>
                                        <option value="Specialist Doctor">Doctor</option>
                                        <option value="Pharmacist">Pharmacist</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Qualification</label>
                                    <input
                                        type="text"
                                        value={newUserForm.qualification}
                                        onChange={(e) => setNewUserForm(prev => ({ ...prev, qualification: e.target.value }))}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="MBBS, FRACGP, BPharm, etc."
                                    />
                                </div>

                            </div>
                            {/* Password Section */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Password *</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            required
                                            value={newUserForm.password}
                                            onChange={(e) => setNewUserForm(prev => ({ ...prev, password: e.target.value }))}
                                            className="w-full px-3 py-2 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter password"
                                        />
                                        <button
                                            type="button"
                                            onClick={generatePassword}
                                            className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                            title="Generate Password"
                                        >
                                            <i className="ri-refresh-line text-lg"></i>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password *</label>
                                    <input
                                        type="password"
                                        required
                                        value={newUserForm.confirmPassword}
                                        onChange={(e) => setNewUserForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Confirm password"
                                    />
                                </div>
                            </div>

                            {/* Options */}
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="sendWelcomeEmail"
                                        checked={newUserForm.sendWelcomeEmail}
                                        onChange={(e) => setNewUserForm(prev => ({ ...prev, sendWelcomeEmail: e.target.checked }))}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <label htmlFor="sendWelcomeEmail" className="ml-3 text-sm text-slate-700 cursor-pointer">
                                        Send welcome email with login credentials
                                    </label>
                                </div>

                                {newUserForm.userType === 'practitioner' && (
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="requireVerification"
                                            checked={newUserForm.requireVerification}
                                            onChange={(e) => setNewUserForm(prev => ({ ...prev, requireVerification: e.target.checked }))}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <label htmlFor="requireVerification" className="ml-3 text-sm text-slate-700 cursor-pointer">
                                            Require AHPRA verification before activation
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Info Box */}
                            <div className={`border rounded-lg p-4 ${newUserForm.userType === 'practitioner' ? 'bg-blue-50 border-blue-200' : 'bg-purple-50 border-purple-200'}`}>
                                <div className="flex">
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <i className={`ri-information-line ${newUserForm.userType === 'practitioner' ? 'text-blue-600' : 'text-purple-600'}`}></i>
                                    </div>
                                    <div className="ml-3">
                                        <h4 className={`text-sm font-medium ${newUserForm.userType === 'practitioner' ? 'text-blue-800' : 'text-purple-800'}`}>
                                            {newUserForm.userType === 'practitioner' ? 'Practitioner Account Setup' : 'Patient Account Setup'}
                                        </h4>
                                        <p className={`text-sm mt-1 ${newUserForm.userType === 'practitioner' ? 'text-blue-700' : 'text-purple-700'}`}>
                                            {newUserForm.userType === 'practitioner'
                                                ? 'AHPRA registration will be automatically verified. User will receive login credentials and setup instructions via email.'
                                                : 'User will receive login credentials via email and can immediately start requesting medical certificates.'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="p-4 sm:p-6 border-t border-slate-200 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                    {showTwoFactorVerification ? (
                        <>
                            <button
                                onClick={() => setShowTwoFactorVerification(false)}
                                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                            >
                                <i className="ri-arrow-left-line mr-2"></i>
                                Back
                            </button>
                            <button
                                onClick={handleVerifyAndCreateUser}
                                disabled={twoFactorCode.length !== 6}
                                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap ${twoFactorCode.length !== 6 ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                <i className="ri-shield-check-line mr-2"></i>
                                Verify & Create User
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleProceedTo2FA}
                                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap ${newUserForm.userType === 'practitioner' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                            >
                                <i className="ri-user-add-line mr-2"></i>
                                Continue to Verification
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;