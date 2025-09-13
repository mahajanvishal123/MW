import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BaseUrl from "../../../Utilities/BaseUrl";
import MyCertificateHeader from "./MyCertificateHeader";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import SignatureCanvas from 'react-signature-canvas';

const MyCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [medicalInstructions, setMedicalInstructions] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isSending, setIsSending] = useState(false);
  const sigCanvasRef = useRef({});
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser)?.id : null;

  useEffect(() => {
    if (!userId) return;
    
    const fetchCertificates = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/patient/ByPractitionerid/${userId}`);
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
    setMedicalInstructions(cert.work_restrictions || "");
    setAdditionalNotes(cert.additional_notes || "");
    
    // Clear signature canvas
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
      
      // Load existing signature if available
      if (cert.signature) {
        const img = new Image();
        img.onload = () => {
          const canvas = sigCanvasRef.current.getCanvas();
          const ctx = canvas.getContext("2d");
          // Clear canvas with white background
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
        img.src = cert.signature.startsWith('data:image') 
          ? cert.signature 
          : `data:image/png;base64,${cert.signature}`;
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCert(null);
  };

  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleSubmit = async (status) => {
    try {
      // Check if signature is empty
      if (sigCanvasRef.current && !sigCanvasRef.current.isEmpty()) {
        // Use getCanvas() instead of getTrimmedCanvas()
        const canvas = sigCanvasRef.current.getCanvas();
        const signature = canvas.toDataURL("image/png");
        
        // Create FormData to send binary data
        const formData = new FormData();
        formData.append('verify_certificate', status);
        formData.append('work_restrictions', medicalInstructions);
        formData.append('additional_notes', additionalNotes);
        
        // Convert signature data URL to blob and append to FormData
        const signatureBlob = dataURLtoBlob(signature);
        formData.append('signature', signatureBlob, 'signature.png');
        
        await axios.patch(
          `${BaseUrl}/patient/certificate_verified/${selectedCert.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        
        alert(`Certificate ${status} successfully`);
        
        // Update the certificate in state with the new data
        setCertificates((prev) =>
          prev.map((c) =>
            c.id === selectedCert.id
              ? { 
                  ...c, 
                  verify_certificate: status,
                  work_restrictions: medicalInstructions,
                  additional_notes: additionalNotes,
                  signature: signature
                }
              : c
          )
        );
        
        closeModal();
      } else {
        alert("Please provide a signature before submitting");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating certificate");
    }
  };
const generateCertificatePDF = async (cert) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let y = 20;

  // HEADER
  pdf.setLineWidth(1);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);
  pdf.setFillColor(33, 64, 154);
  pdf.rect(10, 10, pageWidth - 20, 25, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20).setFont('helvetica', 'bold');
  pdf.text('MEDICAL CERTIFICATE', pageWidth / 2, 27, { align: 'center' });
  pdf.setFontSize(12).setFont('helvetica', 'normal');
  pdf.text(`ID: MC-${String(cert.id).padStart(4, "0")}`, 20, 27);
  pdf.text(`Status: ${cert.verify_certificate}`, pageWidth - 20, 27, { align: 'right' });
  pdf.setTextColor(0, 0, 0);
  y = 50;

  const drawSectionHeader = (title) => {
    pdf.setFontSize(14).setFont('helvetica', 'bold');
    pdf.text(title, 20, y);
    y += 5;
    pdf.setLineWidth(0.3);
    pdf.line(20, y, pageWidth - 20, y);
    y += 8;
    pdf.setFontSize(12).setFont('helvetica', 'normal');
  };

  // PATIENT DETAILS
  drawSectionHeader('PATIENT DETAILS');

  const patientDetails = [
    ['Full Name:', cert.full_name, 'Email:', cert.email_address],
    ['Mobile:', cert.mobile_No, 'Date of Birth:', new Date(cert.birth_date).toLocaleDateString()],
    ['Reason for Leave:', cert.reason_for_leave, 'Medical Conditions:', cert.medical_conditions],
    [`Height:`, `${cert.height} cm`, `Weight:`, `${cert.weight} kg`]
  ];

patientDetails.forEach((row) => {
  const leftLabelX = 20;
  const leftValueX = 55;
  const rightLabelX = pageWidth / 2 + 5;
  const rightValueX = pageWidth / 2 + 35;

  pdf.setFont('helvetica', 'bold');
  pdf.text(row[0], leftLabelX, y);
  pdf.setFont('helvetica', 'normal');
  const leftLines = pdf.splitTextToSize(row[1] || '-', 60);
  pdf.text(leftLines, leftValueX, y);

  pdf.setFont('helvetica', 'bold');
  pdf.text(row[2], rightLabelX, y);
  pdf.setFont('helvetica', 'normal');
  const rightLines = pdf.splitTextToSize(row[3] || '-', 60);
  pdf.text(rightLines, rightValueX, y);

  // calculate how tall this row became
  const leftHeight = leftLines.length * 6;
  const rightHeight = rightLines.length * 6;
  const rowHeight = Math.max(leftHeight, rightHeight);

  y += rowHeight + 4; // move down for next row
});
y += 5;



  // DOCTOR DETAILS
  drawSectionHeader('DOCTOR DETAILS');

  const docDetails = [
    ['Name:', `Dr. ${cert.doctor_first_name} ${cert.doctor_last_name}`],
    ['Email:', cert.doctor_email],
    ['Phone:', cert.doctor_phone],
    ['Description:', cert.description],
    ['Price:', `$${cert.price}`]
  ];

  docDetails.forEach(([label, value]) => {
    pdf.setFont('helvetica', 'bold');
    pdf.text(label, 20, y);
    pdf.setFont('helvetica', 'normal');
    pdf.text(value || '-', 55, y);
    y += 7;
  });
  y += 5;

  // MEDICAL INSTRUCTIONS
  drawSectionHeader('MEDICAL INSTRUCTIONS & NOTES');

  pdf.setFont('helvetica', 'bold');
  pdf.text('Work Restrictions:', 20, y);
  y += 6;
  pdf.setFont('helvetica', 'normal');
  const wr = pdf.splitTextToSize(cert.work_restrictions || "• No heavy lifting\n• Adequate rest\n• Avoid standing too long", pageWidth - 40);
  pdf.text(wr, 25, y);
  y += wr.length * 6 + 6;

  pdf.setFont('helvetica', 'bold');
  pdf.text('Additional Notes:', 20, y);
  y += 6;
  pdf.setFont('helvetica', 'normal');
  const an = pdf.splitTextToSize(cert.additional_notes || "• Follow up in 10 days\n• Contact doctor if symptoms worsen", pageWidth - 40);
  pdf.text(an, 25, y);
  y += an.length * 6 + 10;

  // SIGNATURE
  drawSectionHeader("DOCTOR'S SIGNATURE");

  pdf.rect(20, y, 80, 40);
  if (cert.signature) {
    try {
      let sig = cert.signature;
      if (sig.startsWith('http')) {
        const response = await fetch(sig);
        const blob = await response.blob();
        const reader = new FileReader();
        sig = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      } else if (!sig.startsWith('data:image')) {
        sig = 'data:image/png;base64,' + sig;
      }
      pdf.addImage(sig, 'PNG', 25, y + 5, 70, 30);
    } catch (e) {
      pdf.setFont('helvetica', 'italic');
      pdf.text('Signature not available', 25, y + 20);
    }
  } else {
    pdf.setFont('helvetica', 'italic');
    pdf.text('Signature not available', 25, y + 20);
  }
  y += 50;

  pdf.setFontSize(12);
  pdf.text(`Date of Issue: ${new Date().toLocaleDateString()}`, pageWidth - 20, y, { align: 'right' });

  return pdf;
};



const downloadCertificate = async () => {
  if (!selectedCert) return;
  
  try {
    const pdf = await generateCertificatePDF(selectedCert);
    pdf.save(`Medical-Certificate-MC-${String(selectedCert.id).padStart(4, "0")}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating certificate PDF. Please try again.');
  }
};

const sendCertificate = async () => {
  if (!selectedCert) return;
  
  setIsSending(true);
  
  try {
    // Generate PDF using the same function as download
    const pdf = await generateCertificatePDF(selectedCert);
    
    // Get PDF as blob
    const pdfBlob = pdf.output('blob');
    
    // Create FormData and append the PDF
    const formData = new FormData();
    formData.append('certificateName', selectedCert.certificate_type);
    formData.append('certificate', pdfBlob, 'certificate.pdf');
    
    // Send the certificate
    await axios.post(`${BaseUrl}/patient/sendCertificate/${selectedCert.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    alert('Certificate sent successfully!');
  } catch (error) {
    console.error('Error sending certificate:', error);
    alert('Error sending certificate. Please try again.');
  } finally {
    setIsSending(false);
  }
};

  if (loading) return <p className="p-4">Loading certificates...</p>;

  return (
    <div className="space-y-4 px-4">
      <MyCertificateHeader />
      <h1 className="text-2xl font-bold text-slate-800 mb-6 mt-4">
        Certificate History
      </h1>
      
      <div className="space-y-4">
        {certificates.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow"
          >
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
                <br /> {new Date(c.created_at).toLocaleString()}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => openModal(c)}
                className="text-blue-600 text-sm underline"
              >
                View
              </button>
              
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
              
              {c.verify_certificate === "Approve" && (
                <>
                  <button
                    onClick={() => {
                      openModal(c);
                      setTimeout(downloadCertificate, 500);
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => {
                      openModal(c);
                      setTimeout(() => sendCertificate(), 500);
                    }}
                    className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700"
                  >
                    Send
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
            
            <div id="certificate-content" className="space-y-8">
              {/* Patient Details */}
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
              
              {/* Doctor Details */}
              <section className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  👨‍⚕️ Doctor Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <p><strong>Name:</strong> Dr. {selectedCert.doctor_first_name} {selectedCert.doctor_last_name}</p>
                  <p><strong>Email:</strong> {selectedCert.doctor_email}</p>
                  <p><strong>Phone:</strong> {selectedCert.doctor_phone}</p>
                  <p><strong>Description:</strong> {selectedCert.description}</p>
                  <p><strong>Price:</strong> ${selectedCert.price}</p>
                </div>
              </section>
              
              {/* Medical Instructions */}
              <section className="border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  💊 Medical Instructions & Notes
                </h3>
                
                {selectedCert.verify_certificate === "Pending" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Work Restrictions
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
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium mb-1">Work Restrictions:</p>
                      <p className="border rounded-md p-3 bg-slate-50 min-h-[100px]">
                        {selectedCert.work_restrictions || "None specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Additional Notes:</p>
                      <p className="border rounded-md p-3 bg-slate-50 min-h-[100px]">
                        {selectedCert.additional_notes || "None specified"}
                      </p>
                    </div>
                  </div>
                )}
              </section>
              
              {/* Digital Signature */}
              <section className="border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  ✍️ Doctor’s Digital Signature
                </h3>
                
                {selectedCert.verify_certificate === "Pending" ? (
                  <>
                    <div className="border rounded-md bg-white">
                      <SignatureCanvas
                        ref={sigCanvasRef}
                        canvasProps={{
                          width: 600,
                          height: 150,
                          className: 'w-full cursor-crosshair bg-white',
                          style: { backgroundColor: 'white' }
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-3">
                      <button
                        onClick={() => {
                          if (sigCanvasRef.current) {
                            sigCanvasRef.current.clear();
                            // Ensure white background after clearing
                            const canvas = sigCanvasRef.current.getCanvas();
                            const ctx = canvas.getContext("2d");
                            ctx.fillStyle = "white";
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                          }
                        }}
                        className="px-3 py-1 text-sm rounded bg-slate-200 hover:bg-slate-300"
                      >
                        Clear Signature
                      </button>
                      <p className="text-sm text-slate-500 italic">Sign in the box above</p>
                    </div>
                  </>
                ) : (
                  <div className="border rounded-md p-4 bg-slate-50 flex justify-center">
                    {selectedCert.signature ? (
                      <img 
                        src={selectedCert.signature  } 
                        alt="Doctor's Signature" 
                        className="max-h-32"
                      />
                    ) : (
                      <p className="text-slate-500 italic">No signature available</p>
                    )}
                  </div>
                )}
              </section>
              
              {/* Action Buttons */}
              <div className="flex justify-between gap-4 pt-4 border-t">
                {selectedCert.verify_certificate === "Pending" ? (
                  <div className="flex gap-4">
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
                ) : (
                  <div className="flex gap-4">
                    <button
                      onClick={downloadCertificate}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download Certificate
                    </button>
                    <button
                      onClick={sendCertificate}
                      disabled={isSending}
                      className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 flex items-center disabled:opacity-50"
                    >
                      {isSending ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                          Send Certificate
                        </>
                      )}
                    </button>
                  </div>
                )}
                
                <button
                  onClick={closeModal}
                  className="px-5 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100"
                >
                  Close
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