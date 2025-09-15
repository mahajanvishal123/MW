import { useEffect, useState } from 'react';
import ViewUserModal from "./ViewUserModal";
import AddUserModal from './AddUserModal';
import UserManagementCards from './UserManagementCards';
import BaseUrl from '../../../Utilities/BaseUrl';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [users, setUsers] = useState([]);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // ===== GET Users =====
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${BaseUrl}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ===== DELETE User =====
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`${BaseUrl}/users/${id}`, { method: "DELETE" });
      fetchUsers(); // refresh after delete
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  // ===== PATCH Status =====
  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`${BaseUrl}/users/status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      fetchUsers(); // refresh after status change
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'doctor':
      case 'practitioner': return 'bg-blue-100 text-blue-800';
      case 'patient': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  // ===== Modal Handlers =====
  const handleView = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setAddModalOpen(true);
  };

  const handleSave = () => {
  fetchUsers(); // immediately refresh table
  setAddModalOpen(false);
};

const handleEdit = (user) => {
  setSelectedUser(user);
  setAddModalOpen(true); // open AddUserModal for edit
};


  // ===== Filter + Search =====
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
    const search = searchTerm?.toLowerCase();
    const matchesSearch = fullName?.includes(search) || user?.email?.toLowerCase()?.includes(search) || user?.id?.toString()?.includes(search);
    const matchesType =
      userFilter === 'all' ? true : user?.user_type?.toLowerCase() === userFilter.toLowerCase();

    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6 sm:py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">User Management</h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1">Manage patients, practitioners, and administrators</p>
            </div>
            <button
              onClick={handleAdd}
              className="w-full sm:w-auto bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-user-add-line mr-2"></i> Add User
            </button>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <UserManagementCards />

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Search Users</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-search-line text-slate-400"></i>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Name, email, ID..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">User Type</label>
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="w-full px-3 py-2 pr-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="all">All Users</option>
                  <option value="doctor">doctor</option>
                  <option value="pharmacist">pharmacist</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 sm:mb-8 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Specialization</th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                          <i className={`ri-user-line text-slate-600`}></i>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900 flex items-center">{user.first_name} {user.last_name}</div>
                          <div className="text-sm text-slate-500">{user.email}</div>
                          {user?.ahpr_registration_number && (
                            <div className="text-xs text-blue-600 font-mono">AHPRA: {user.ahpr_registration_number}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getTypeColor(user.user_type)}`}>
                        {user?.user_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(user.status)}`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        
                      </select>
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-slate-900 hidden sm:table-cell">{user.email}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <div className="flex space-x-2">
                        <button onClick={() => handleView(user)} className="text-blue-600 hover:text-blue-700 cursor-pointer" title="View Profile">
                          <i className="ri-eye-line"></i>
                        </button>
                        <button onClick={() => handleEdit(user)} className="text-emerald-600 hover:text-emerald-700 cursor-pointer" title="Edit User">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-700 cursor-pointer" title="Delete">
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddUserModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        user={selectedUser}
        onSave={handleSave}
      />
      <ViewUserModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}
