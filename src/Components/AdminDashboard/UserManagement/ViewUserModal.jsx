import React from "react";

const ViewUserModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
   <div className="fixed inset-0 bg-black/50  transition-opacity duration-300 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-slate-800">View User Details</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <span className="font-medium text-slate-600">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-medium text-slate-600">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-medium text-slate-600">User ID:</span> {user.id}
          </div>
          <div>
            <span className="font-medium text-slate-600">Type:</span> {user.type}
          </div>
          <div>
            <span className="font-medium text-slate-600">Role:</span> {user.role}
          </div>
          <div>
            <span className="font-medium text-slate-600">Status:</span> {user.status}
          </div>
          <div>
            <span className="font-medium text-slate-600">Certificates:</span> {user.certificates}
          </div>
          <div>
            <span className="font-medium text-slate-600">Last Login:</span> {user.lastLogin}
          </div>
          <div>
            <span className="font-medium text-slate-600">Join Date:</span> {user.joinDate}
          </div>
          {user.ahpra && (
            <div>
              <span className="font-medium text-slate-600">AHPRA:</span> {user.ahpra}
            </div>
          )}
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
