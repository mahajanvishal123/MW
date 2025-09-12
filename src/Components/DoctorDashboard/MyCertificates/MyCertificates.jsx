import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BaseUrl from "../../../Utilities/BaseUrl";
import MyCertificateHeader from "./MyCertificateHeader";

const MyCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [medicalInstructions, setMedicalInstructions] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState("1 day");

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser)?.id : null;

  useEffect(() => {
    if (!userId) return;
    const fetchCertificates = async () => {
      try {
        const res = await axios.get(
          `${BaseUrl}/patient/ByPractitionerid/${userId}`
        );
        setCertificates(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, [userId]);

  const openModal = (cert) => {
    setSelectedCert(cert);
    setShowModal(true);
    setMedicalInstructions("");
    setAdditionalNotes("");
    setStartDate("");
    setEndDate("");
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCert(null);
  };

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleClearSignature = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleSubmit = async (status) => {
    try {
      const signature = canvasRef.current.toDataURL();
      await axios.patch(
        `${BaseUrl}/patient/certificate_verified/${selectedCert.id}`,
        {
          verify_certificate: status,
          work_restrictions: medicalInstructions,
          additional_notes: additionalNotes,
          signature,
         
        }
      );
      alert(`Certificate ${status} successfully`);
      setCertificates((prev) =>
        prev.map((c) =>
          c.id === selectedCert.id
            ? { ...c, verify_certificate: status }
            : c
        )
      );
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error updating certificate");
    }
  };

  if (loading) return <p className="p-4">Loading certificates...</p>;

  return (
    <div className="space-y-4 px-4">
      <MyCertificateHeader/>
     <h1 className="text-2xl font-bold text-slate-800 mb-6 mt-4">
  Certificate History
</h1>

<div className="space-y-4">
  {certificates.map((c) => (
    <div
      key={c.id}
      className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Left: Info */}
      <div className="space-y-1">
        <p className="font-semibold text-slate-800">
          MC-{String(c.id).padStart(4, "0")}{" "}
          <span
            className={`ml-2 text-xs px-2 py-1 rounded-full ${
              c.verify_certificate === "Approve"
                ? "bg-green-100 text-green-700"
                : c.verify_certificate === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {c.verify_certificate}
          </span>
        </p>

        <p className="text-sm text-slate-600">
          {c.full_name} • {c.certificate_type}
        </p>

        <p className="text-xs text-slate-500">
          Duration: {c.certificate_type} 
           <br />  {new Date(c.created_at).toLocaleString()}
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => openModal(c)}
          className="text-blue-600 text-sm underline"
        >
          View
        </button>
  <p className="font-semibold text-slate-800">
        
          <span
            className={`ml-2 text-xs px-2 py-1 rounded-full ${
              c.verify_certificate === "Approve"
                ? "bg-green-100 text-green-700"
                : c.verify_certificate === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {c.verify_certificate}
          </span>
        </p>
        {c.verify_certificate === "Pending" && (
          <>
            <button
              onClick={() => openModal(c)}
              className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700"
            >
              Approve
            </button>
            <button
              onClick={() => handleSubmit("Declined")}
              className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700"
            >
              Decline
            </button>
          </>
        )}
      </div>
    </div>
  ))}
</div>

{showModal && selectedCert && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h2 className="text-2xl font-bold text-slate-800">
          Medical Certificate — MC-{String(selectedCert.id).padStart(4, "0")}
        </h2>
        <button
          onClick={closeModal}
          className="text-slate-600 hover:text-black text-2xl"
        >
          ✕
        </button>
      </div>

      <div className="space-y-8">

        {/* Part 1 — Patient Details */}
        <section className="border border-slate-200 rounded-lg p-6 bg-slate-50">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            🧍‍♂️ Patient Details
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <p><strong>Full Name:</strong> {selectedCert.full_name}</p>
            <p><strong>Email:</strong> {selectedCert.email_address}</p>
            <p><strong>Mobile:</strong> {selectedCert.mobile_No}</p>
            <p><strong>DOB:</strong> {new Date(selectedCert.birth_date).toLocaleDateString()}</p>
            <p><strong>Guardian:</strong> {selectedCert.guardian_name}</p>
            <p><strong>Certificate Name:</strong> {selectedCert.certificate_name}</p>
            <p><strong>Address:</strong> {selectedCert.address}</p>
            <p><strong>City:</strong> {selectedCert.city}</p>
            <p><strong>State:</strong> {selectedCert.state}</p>
            <p><strong>Pincode:</strong> {selectedCert.pincode}</p>
            <p><strong>Organization:</strong> {selectedCert.organization_name}</p>
            <p><strong>Location:</strong> {selectedCert.organization_location}</p>
            <p><strong>Reason for Leave:</strong> {selectedCert.reason_for_leave}</p>
            <p><strong>Medical Conditions:</strong> {selectedCert.medical_conditions}</p>
            <p><strong>Height:</strong> {selectedCert.height} cm</p>
            <p><strong>Weight:</strong> {selectedCert.weight} kg</p>
          </div>
        </section>

        {/* Part 2 — Medical Instructions */}
        <section className="border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            💊 Medical Instructions & Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Medical Instructions
              </label>
              <textarea
                value={medicalInstructions}
                onChange={(e) => setMedicalInstructions(e.target.value)}
                className="border rounded-md p-3 w-full"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Additional Notes
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="border rounded-md p-3 w-full"
                rows={4}
              />
            </div>
          </div>
        </section>

        {/* Part 3 — Digital Signature */}
        <section className="border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            ✍️ Doctor’s Digital Signature
          </h3>
          <canvas
            ref={canvasRef}
            width={600}
            height={150}
            className="border rounded-md w-full"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          <button
            onClick={handleClearSignature}
            className="px-3 py-1 mt-3 text-sm rounded bg-slate-200 hover:bg-slate-300"
          >
            Clear Signature
          </button>
        </section>

        {/* Part 4 — Action Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <button
            onClick={() => handleSubmit("Approve")}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            Approve
          </button>
          <button
            onClick={() => handleSubmit("Declined")}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
          >
            Decline
          </button>
        </div>

      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default MyCertificates;
