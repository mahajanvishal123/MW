import React, { useEffect, useState } from "react";
import BaseUrl from "../../../Utilities/BaseUrl";

const ScheduleManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({
    appointment_date: "",
    status: "Scheduled",
    notes: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id; // <-- user ki id yahan se aayegi

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${BaseUrl}/appointments/doctor/${userId}`);
      const data = await res.json();
      setAppointments(data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Fetch appointment by ID
  const fetchAppointmentById = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/${id}`);
      const data = await res.json();
      setSelectedAppointment(data);
      setFormData({
        appointment_date: data.appointment_date,
        status: data.status,
        notes: data.notes,
      });
    } catch (error) {
      console.error("Error fetching appointment by ID:", error);
    }
  };

  // Create appointment
  const createAppointment = async () => {
    try {
      await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: 5,
          doctor_id: 7,
          appointment_date: formData.appointment_date,
          status: formData.status,
          notes: formData.notes,
        }),
      });
      fetchAppointments();
      resetForm();
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  // Update appointment
  const updateAppointment = async () => {
    try {
      await fetch(`${baseUrl}/${selectedAppointment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: 5,
          doctor_id: 7,
          appointment_date: formData.appointment_date,
          status: formData.status,
          notes: formData.notes,
        }),
      });
      fetchAppointments();
      resetForm();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  // Delete appointment
  const deleteAppointment = async (id) => {
    try {
      await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  // Reset form
  const resetForm = () => {
    setSelectedAppointment(null);
    setFormData({ appointment_date: "", status: "Scheduled", notes: "" });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Schedule Management</h2>

      {/* Form (Modal type UI) */}
      <div className="mb-6 space-y-3 border p-4 rounded">
        <input
          type="datetime-local"
          className="border p-2 w-full"
          value={formData.appointment_date}
          onChange={(e) =>
            setFormData({ ...formData, appointment_date: e.target.value })
          }
        />
        <select
          className="border p-2 w-full"
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
          className="border p-2 w-full"
          placeholder="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />

        {selectedAppointment ? (
          <button
            onClick={updateAppointment}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Appointment
          </button>
        ) : (
          <button
            onClick={createAppointment}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Create Appointment
          </button>
        )}
      </div>

      {/* Appointment List */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Notes</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id}>
              <td className="border p-2">{appt.id}</td>
              <td className="border p-2">{appt.appointment_date}</td>
              <td className="border p-2">{appt.status}</td>
              <td className="border p-2">{appt.notes}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => fetchAppointmentById(appt.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteAppointment(appt.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleManagement;
