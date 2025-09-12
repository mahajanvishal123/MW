import { useEffect, useState } from "react";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import BaseUrl from "../../../Utilities/BaseUrl";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    ahpr_registration_number: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // Fetch user data
  useEffect(() => {
    if (userId) {
      axios
        .get(`${BaseUrl}/users/${userId}`)
        .then((res) => {
          const data = res.data;
          setProfileData({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            email: data.email || "",
            phone: data.phone || "",
            ahpr_registration_number: data.ahpr_registration_number || "",
          });
        })
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [userId]);

  // Save updated data
  const handleSaveProfile = () => {
    axios
      .put(
        `${BaseUrl}/users/${userId}`,
        profileData,
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        setIsEditing(false);
        alert("Profile updated successfully!");
      })
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-slate-900 mb-1">
        Profile & Settings
      </h1>
      <p className="text-slate-600 mb-6">
        Manage your account and preferences
      </p>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        {/* Tabs */}
        <div className="border-b border-slate-200 flex">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-4 text-sm font-medium border-b-2 ${
              activeTab === "profile"
                ? "border-slate-500 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <i className="ri-user-line mr-2"></i> Profile
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-6 py-4 text-sm font-medium border-b-2 ${
              activeTab === "security"
                ? "border-slate-500 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <i className="ri-shield-line mr-2"></i> Change Password
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="p-6 space-y-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                  <i className="ri-user-heart-fill text-slate-600 text-3xl"></i>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">
                    {profileData.first_name} {profileData.last_name}
                  </p>
                  <p className="text-slate-500 text-sm">{profileData.email}</p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-5 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
              >
                <i
                  className={`${
                    isEditing ? "ri-close-line" : "ri-edit-line"
                  } mr-2`}
                ></i>
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={profileData.first_name}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfileData({ ...profileData, first_name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profileData.last_name}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfileData({ ...profileData, last_name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="w-full px-3 py-2 border rounded-lg bg-slate-50 text-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Phone</label>
                <input
                  type="text"
                  value={profileData.phone}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  AHPR Registration No.
                </label>
                <input
                  type="text"
                  value={profileData.ahpr_registration_number}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      ahpr_registration_number: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            {isEditing && (
              <div className="pt-4">
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  <i className="ri-check-line mr-2"></i> Save Changes
                </button>
              </div>
            )}
          </div>
        )}

        {/* Change Password Tab */}
        {activeTab === "security" && <ChangePassword />}
      </div>
    </div>
  );
}
