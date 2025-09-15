import React, { useEffect, useState } from "react";
import BaseUrl from "../../../Utilities/BaseUrl";

const ScheduleManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: "",
    appointment_date: "",
    status: "Scheduled",
    notes: "",
    reason: "",
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const doctorId = user?.id ?? null;

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date)) return "";
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const fetchPatients = async () => {
    if (!doctorId) return;
    try {
      const res = await fetch(`${BaseUrl}/patient/ByPractitionerid/${doctorId}`);
      const data = await res.json();
      setPatients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setPatients([]);
    }
  };

  const fetchAppointments = async () => {
    if (!doctorId) return;
    try {
      const res = await fetch(`${BaseUrl}/appointments/${doctorId}`);
      const data = await res.json();
      setAppointments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
    }
  };

  const fetchAppointmentById = async (id) => {
    if (!id) return;
    try {
      const res = await fetch(`${BaseUrl}/appointments/${id}`);
      const data = await res.json();
      if (!data) return;

      setSelectedAppointment(data);
      setFormData({
        patient_id: data?.patient_id || "",
        appointment_date: data?.appointment_date?.slice(0, 16) || "",
        status: data?.status || "Scheduled",
        notes: data?.notes || "",
        reason: data?.reason || "",
      });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching appointment by ID:", error);
    }
  };

  const createAppointment = async () => {
    try {
      await fetch(`${BaseUrl}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: formData.patient_id,
          doctor_id: doctorId,
          appointment_date: formData.appointment_date,
          status: formData.status,
          notes: formData.notes,
          reason: formData.reason,
        }),
      });
      fetchAppointments();
      closeModal();
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  const updateAppointment = async () => {
    if (!selectedAppointment?.id) return;
    try {
      await fetch(`${BaseUrl}/appointments/${selectedAppointment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: formData.patient_id,
          doctor_id: doctorId,
          appointment_date: formData.appointment_date,
          status: formData.status,
          notes: formData.notes,
          reason: formData.reason,
        }),
      });
      fetchAppointments();
      closeModal();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const deleteAppointment = async (id) => {
    if (!id) return;
    try {
      await fetch(`${BaseUrl}/appointments/${id}`, { method: "DELETE" });
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setFormData({
      patient_id: "",
      appointment_date: "",
      status: "Scheduled",
      notes: "",
      reason: "",
    });
    setShowModal(false);
  };

  useEffect(() => {
    if (doctorId) {
      fetchPatients();
      fetchAppointments();
    }
  }, [doctorId]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Schedule Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          + Add Appointment
        </button>
      </div>

      {/* Appointments Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="w-full text-left border-collapse" style={{ whiteSpace: "nowrap" }}>
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 border">ID</th>
              <th className="p-4 border">Patient Name</th>
              <th className="p-4 border">Mobile Number</th>
              <th className="p-4 border">Date & Time</th>
              <th className="p-4 border">Status</th>
              <th className="p-4 border">Notes</th>
              <th className="p-4 border">Reason</th>
              <th className="p-4 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.length > 0 ? (
              appointments.map((appt, i) => (
                <tr
                  key={appt?.id || i}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-4 border">{appt?.id || "-"}</td>
                  <td className="p-4 border">{appt?.patient_name || "-"}</td>
                  <td className="p-4 border">{appt?.patient_mobile || "-"}</td>
                  <td className="p-4 border">{formatDateTime(appt?.appointment_date)}</td>
                  <td className="p-4 border">{appt?.status || "-"}</td>
                  <td className="p-4 border">{appt?.notes || "-"}</td>
                  <td className="p-4 border">{appt?.reason || "-"}</td>
                  <td className="p-4 border text-center space-x-2">
                    <button
                      onClick={() => deleteAppointment(appt?.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => fetchAppointmentById(appt?.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-6 text-gray-500 italic">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-3xl p-8 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                {selectedAppointment ? "Edit Appointment" : "Add Appointment"}
              </h3>
              <button onClick={closeModal} className="text-gray-500 text-2xl">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <select
                className="border p-3 w-full rounded"
                value={formData.patient_id}
                onChange={(e) =>
                  setFormData({ ...formData, patient_id: e.target.value })
                }
              >
                <option value="">Select Patient</option>
                {patients?.map((p) => (
                  <option key={p?.id} value={p?.id}>
                    {p?.full_name || "Unnamed"}
                  </option>
                ))}
              </select>

              <input
                type="datetime-local"
                className="border p-3 w-full rounded"
                value={formData.appointment_date}
                onChange={(e) =>
                  setFormData({ ...formData, appointment_date: e.target.value })
                }
              />

              <select
                className="border p-3 w-full rounded"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <textarea
                className="border p-3 w-full rounded"
                placeholder="Notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />

              <textarea
                className="border p-3 w-full rounded"
                placeholder="Reason"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={closeModal}
                className="px-5 py-3 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              {selectedAppointment ? (
                <button
                  onClick={updateAppointment}
                  className="px-5 py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={createAppointment}
                  className="px-5 py-3 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Create
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManagement;
