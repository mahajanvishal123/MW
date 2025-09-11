import { useState } from "react";

export default function Patientstable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Dummy Users
  const users = [
    {
      id: "U-2024-001",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@medicert.com.au",
      type: "Practitioner",
      role: "Doctor",
      status: "Active",
      verified: true,
      certificates: 156,
      lastLogin: "2024-01-15 14:30",
      joinDate: "2023-06-15",
    },
    {
      id: "U-2024-002",
      name: "John Smith",
      email: "john.smith@email.com",
      type: "Patient",
      role: "Patient",
      status: "Active",
      verified: true,
      certificates: 3,
      lastLogin: "2024-01-15 12:45",
      joinDate: "2024-01-10",
    },
    {
      id: "U-2024-005",
      name: "Alice Brown",
      email: "alice.brown@email.com",
      type: "Patient",
      role: "Patient",
      status: "Suspended",
      verified: true,
      certificates: 8,
      lastLogin: "2024-01-10 16:15",
      joinDate: "2023-11-05",
    },
  ];

  // Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      case "Inactive":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  // Type colors
  const getTypeColor = (type) => {
    switch (type) {
      case "Practitioner":
        return "bg-blue-100 text-blue-800";
      case "Patient":
        return "bg-purple-100 text-purple-800";
      case "Admin":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  // Filtering
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      userFilter === "all" ||
      (userFilter === "practitioners" && user.type === "Practitioner") ||
      (userFilter === "patients" && user.type === "Patient") ||
      (userFilter === "pending" && user.status === "Pending");

    return matchesSearch && matchesFilter;
  });

  // Actions
  const handleView = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleSave = (updatedUser) => {
    console.log("Updated User:", updatedUser);
    // TODO: Update logic (API call / state update)
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-5">
     <h2 className="text-xl font-semibold text-slate-900 p-4">Patients</h2>
     <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Certificates
            </th>
            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell">
              Last Login
            </th>
            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell">
              Join Date
            </th>
            <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {filteredUsers
            .filter((user) => user.type === "Patient")
            .map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                {/* User details */}
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-user-line text-slate-600"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </td>

                {/* Type */}
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getTypeColor(
                      user.type
                    )}`}
                  >
                    {user.type}
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Certificates */}
                <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm">
                  {user.certificates}
                </td>

                {/* Last Login */}
                <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm hidden sm:table-cell">
                  {user.lastLogin}
                </td>

                {/* Join Date */}
                <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm hidden md:table-cell">
                  {user.joinDate}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(user)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <i className="ri-eye-line"></i>
                    </button>
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modals */}
      {viewModalOpen && (
        <ViewUserModal
          user={selectedUser}
          onClose={() => setViewModalOpen(false)}
        />
      )}
      {editModalOpen && (
        <EditUserModal
          user={selectedUser}
          onSave={handleSave}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
   </div>
  );
}
