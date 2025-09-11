import React from 'react'

const UserManagementCards = () => {

    const users = [
        {
            id: 'U-2024-001',
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@medicert.com.au',
            type: 'Practitioner',
            role: 'Doctor',
            status: 'Active',
            verified: true,
            certificates: 156,
            lastLogin: '2024-01-15 14:30',
            joinDate: '2023-06-15',
            ahpra: 'MED0001234567'
        },
        {
            id: 'U-2024-002',
            name: 'John Smith',
            email: 'john.smith@email.com',
            type: 'Patient',
            role: 'Patient',
            status: 'Active',
            verified: true,
            certificates: 3,
            lastLogin: '2024-01-15 12:45',
            joinDate: '2024-01-10',
            ahpra: null
        },
        {
            id: 'U-2024-003',
            name: 'Emma Wilson',
            email: 'emma.wilson@pharmacy.com.au',
            type: 'Practitioner',
            role: 'Pharmacist',
            status: 'Active',
            verified: true,
            certificates: 89,
            lastLogin: '2024-01-15 11:20',
            joinDate: '2023-09-22',
            ahpra: 'PHA0002345678'
        },
        {
            id: 'U-2024-004',
            name: 'Michael Chen',
            email: 'michael.chen@medicert.com.au',
            type: 'Practitioner',
            role: 'Doctor',
            status: 'Pending',
            verified: false,
            certificates: 0,
            lastLogin: 'Never',
            joinDate: '2024-01-14',
            ahpra: 'MED0003456789'
        },
        {
            id: 'U-2024-005',
            name: 'Alice Brown',
            email: 'alice.brown@email.com',
            type: 'Patient',
            role: 'Patient',
            status: 'Suspended',
            verified: true,
            certificates: 8,
            lastLogin: '2024-01-10 16:15',
            joinDate: '2023-11-05',
            ahpra: null
        }
    ];

    return (
        <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total Users</p>
                            <p className="text-2xl sm:text-3xl font-bold text-slate-900">{users.length}</p>
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                            <i className="ri-team-fill text-lg sm:text-xl text-slate-600"></i>
                        </div>
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">+12</span>
                        <span className="text-slate-500 ml-2">this month</span>
                    </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Active Practitioners</p>
                            <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                                {users.filter(u => u.type === 'Practitioner' && u.status === 'Active').length}
                            </p>
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i className="ri-user-heart-fill text-lg sm:text-xl text-blue-600"></i>
                        </div>
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">Verified</span>
                        <span className="text-slate-500 ml-2">and active</span>
                    </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Registered Patients</p>
                            <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                                {users.filter(u => u.type === 'Patient').length}
                            </p>
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <i className="ri-user-fill text-lg sm:text-xl text-purple-600"></i>
                        </div>
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded">+8</span>
                        <span className="text-slate-500 ml-2">new this week</span>
                    </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Pending Approvals</p>
                            <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
                                {users.filter(u => u.status === 'Pending').length}
                            </p>
                        </div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <i className="ri-time-fill text-lg sm:text-xl text-yellow-600"></i>
                        </div>
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-yellow-600 font-medium bg-yellow-50 px-2 py-1 rounded">Review</span>
                        <span className="text-slate-500 ml-2">required</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserManagementCards