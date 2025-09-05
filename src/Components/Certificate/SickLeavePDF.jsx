import React, { useRef, useImperativeHandle, forwardRef } from "react";
import html2pdf from "html2pdf.js";

const SickLeavePDF = forwardRef((props, ref) => {
    const certificateRef = useRef();

    // Function to download PDF
    function downloadCertificate(e) {
        const element = certificateRef.current;
        const opt = {
            margin: 0.5,
            filename: "Medical_Certificate_Sarah_Wilson.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
            },
            jsPDF: {
                unit: "in",
                format: "a4",
                orientation: "portrait",
            },
        };

        let btn;
        if (e) {
            btn = e.target;
            const originalText = btn.innerHTML;
            btn.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
            btn.disabled = true;

            html2pdf()
                .set(opt)
                .from(element)
                .save()
                .then(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                })
                .catch((error) => {
                    console.error("PDF generation failed:", error);
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    alert("PDF generation failed. Please try again.");
                });
        } else {
            html2pdf().set(opt).from(element).save();
        }
    }

    // Expose function to parent via ref
    useImperativeHandle(ref, () => ({
        downloadCertificate,
    }));

    return (
        <div>
            <div
                className="certificate-container"
                id="certificate"
                ref={certificateRef}
                style={{
                    position: "relative",
                    padding: "40px",
                    maxWidth: "800px",
                    margin: "0 auto",
                    backgroundColor: "white",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    fontFamily: "Arial, sans-serif",
                    lineHeight: "1.5",
                    color: "#333",
                }}
            >
                {/* Hospital Section */}
                <div
                    className="hospital-section"
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
                    }}
                >
                    <div className="hospital-info">
                        <h6 style={{ margin: "0", fontSize: "18px", fontWeight: "bold" }}>
                            Liserta Hospital
                        </h6>
                        <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
                            123 Anywhere St, Any City
                        </p>
                    </div>
                </div>

                {/* Certificate Title */}
                <div
                    className="certificate-title"
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            margin: "0",
                            letterSpacing: "1px",
                        }}
                    >
                        MEDICAL CERTIFICATE
                    </h1>
                    <h2
                        style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            margin: "5px 0 0 0",
                        }}
                    >
                        FOR SICK LEAVE
                    </h2>
                </div>

                {/* Certificate Body */}
                <div className="certificate-body">
                    <div
                        className="certificate-text"
                        style={{ marginBottom: "20px", textAlign: "justify" }}
                    >
                        This is to certify that the individual known as{" "}
                        <strong>Sarah Wilson</strong>, also known as employee number{" "}
                        <strong>12457900</strong> at <strong>Lincare, Inc.</strong>, has
                        undergone medical examination conducted at{" "}
                        <strong>123 Anywhere St, Any City</strong> on{" "}
                        <strong>25 June 2050 by Dr. Sarah Johnson</strong>, is currently
                        suffering from <strong>upper respiratory tract infection</strong>.
                    </div>
                    <div
                        className="certificate-text"
                        style={{ marginBottom: "30px", textAlign: "justify" }}
                    >
                        The examiner has advised that she should be allowed absence from her
                        company duties for a period of <strong>5 days</strong>.
                    </div>

                    {/* Patient Details */}
                    {/* <div
                        className="patient-details"
                        style={{
                            border: "1px solid #ddd",
                            padding: "20px",
                            borderRadius: "5px",
                            marginBottom: "30px",
                        }}
                    >
                        <h5
                            style={{
                                color: "#20b2aa",
                                marginBottom: "20px",
                                borderBottom: "1px solid #eee",
                                paddingBottom: "10px",
                            }}
                        >
                            Patient Information
                        </h5>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "15px",
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Full Name:
                                </div>
                                <div>Sarah Wilson</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Date of Birth:
                                </div>
                                <div>1985-03-15</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Email Address:
                                </div>
                                <div>sarah.wilson@email.com</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Phone Number:
                                </div>
                                <div>+61 412 345 678</div>
                            </div>
                            <div style={{ gridColumn: "span 2" }}>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Address:
                                </div>
                                <div>123 Collins Street, Melbourne VIC 3000</div>
                            </div>
                            <div style={{ gridColumn: "span 2" }}>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Emergency Contact:
                                </div>
                                <div>John Wilson (Husband) - +61 412 987 654</div>
                            </div>
                        </div>
                    </div> */}

                    {/* Medical Assessment */}
                    {/* <div
                        className="medical-assessment"
                        style={{
                            border: "1px solid #ddd",
                            padding: "20px",
                            borderRadius: "5px",
                            marginBottom: "30px",
                        }}
                    >
                        <h5
                            style={{
                                color: "#20b2aa",
                                marginBottom: "20px",
                                borderBottom: "1px solid #eee",
                                paddingBottom: "10px",
                            }}
                        >
                            Medical Assessment
                        </h5>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "15px",
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Primary Condition:
                                </div>
                                <div>Upper Respiratory Infection</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Vital Signs:
                                </div>
                                <div>Temperature: 38.2°C, Pulse: 88 bpm, BP: 120/80 mmHg</div>
                            </div>
                            <div style={{ gridColumn: "span 2" }}>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Presenting Symptoms:
                                </div>
                                <div>
                                    Cough, fever, fatigue, sore throat. Patient reports symptoms
                                    started 2 days ago with gradual worsening.
                                </div>
                            </div>
                            <div style={{ gridColumn: "span 2" }}>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Clinical Diagnosis:
                                </div>
                                <div>
                                    Acute upper respiratory tract infection, likely viral in
                                    origin. No signs of bacterial complications.
                                </div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Risk Factors:
                                </div>
                                <div>None identified</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Previous History:
                                </div>
                                <div>No recent similar episodes</div>
                            </div>
                        </div>
                    </div> */}

                    {/* Treatment & Management */}
                    {/* <div
                        className="treatment-management"
                        style={{
                            border: "1px solid #ddd",
                            padding: "20px",
                            borderRadius: "5px",
                            marginBottom: "30px",
                        }}
                    >
                        <h5
                            style={{
                                color: "#20b2aa",
                                marginBottom: "20px",
                                borderBottom: "1px solid #eee",
                                paddingBottom: "10px",
                            }}
                        >
                            Treatment & Management
                        </h5>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "15px",
                            }}
                        >
                            <div style={{ gridColumn: "span 2" }}>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Treatment Plan:
                                </div>
                                <div>
                                    Rest, fluids, paracetamol for fever and pain relief. Throat
                                    lozenges for comfort. Return if symptoms worsen.
                                </div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Medication Prescribed:
                                </div>
                                <div>Paracetamol 500mg, 2 tablets every 6 hours as needed</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Work Restrictions:
                                </div>
                                <div>
                                    No heavy lifting or strenuous activity. Work from home if
                                    possible to prevent spread.
                                </div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Follow-up Required:
                                </div>
                                <div>Yes - Recommended date: 2024-01-20</div>
                            </div>
                            <div style={{ gridColumn: "span 2" }}>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Consultation Notes:
                                </div>
                                <div>
                                    <div>Consultation Type: Video Consultation</div>
                                    <div>
                                        Clinical Notes: Patient appeared unwell but alert. Clear
                                        speech, no respiratory distress. Advised isolation until
                                        fever-free for 24 hours.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Certificate Summary */}
                    {/* <div
                        className="certificate-summary"
                        style={{
                            border: "1px solid #ddd",
                            padding: "20px",
                            borderRadius: "5px",
                            marginBottom: "30px",
                        }}
                    >
                        <h5
                            style={{
                                color: "#20b2aa",
                                marginBottom: "20px",
                                borderBottom: "1px solid #eee",
                                paddingBottom: "10px",
                            }}
                        >
                            Certificate Summary
                        </h5>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "15px",
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Certificate ID:
                                </div>
                                <div>MC-2024-0234</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Certificate Type:
                                </div>
                                <div>Sick Leave</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Start Date:
                                </div>
                                <div>2024-01-16</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    End Date:
                                </div>
                                <div>2024-01-17</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Duration:
                                </div>
                                <div>2 days</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Amount Charged:
                                </div>
                                <div>$79.00</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Created Date:
                                </div>
                                <div>2024-01-15 14:30</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Certificate Number:
                                </div>
                                <div>CERT-2024-15634</div>
                            </div>
                        </div>
                    </div> */}

                    {/* Practitioner Details */}
                    {/* <div
                        className="practitioner-details"
                        style={{
                            border: "1px solid #ddd",
                            padding: "20px",
                            borderRadius: "5px",
                            marginBottom: "30px",
                        }}
                    >
                        <h5
                            style={{
                                color: "#20b2aa",
                                marginBottom: "20px",
                                borderBottom: "1px solid #eee",
                                paddingBottom: "10px",
                            }}
                        >
                            Practitioner Details
                        </h5>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "15px",
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Issued By:
                                </div>
                                <div>Dr. Sarah Johnson</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    AHPRA Registration:
                                </div>
                                <div>MED0012345</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Digital Signature:
                                </div>
                                <div>Electronically signed</div>
                            </div>
                        </div>
                    </div> */}

                    {/* Verification */}
                    {/* <div
                        className="verification"
                        style={{
                            border: "1px solid #ddd",
                            padding: "20px",
                            borderRadius: "5px",
                            marginBottom: "30px",
                            textAlign: "center",
                        }}
                    >
                        <h5
                            style={{
                                color: "#20b2aa",
                                marginBottom: "20px",
                                borderBottom: "1px solid #eee",
                                paddingBottom: "10px",
                            }}
                        >
                            Verification
                        </h5>
                        <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
                            QR Verification Code: QR123456789
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <div
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    border: "1px solid #ddd",
                                    margin: "0 auto",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                QR Code
                            </div>
                        </div>
                        <div style={{ fontStyle: "italic", marginBottom: "15px" }}>
                            This certificate can be verified using the QR code above. Scan to
                            confirm authenticity and validity.
                        </div>
                    </div> */}

                    {/* Professional Compliance Notice */}
                    <div
                        className="compliance-notice"
                        style={{
                            border: "1px solid #ddd",
                            padding: "20px",
                            borderRadius: "5px",
                            marginBottom: "30px",
                            fontSize: "12px",
                        }}
                    >
                        <h5
                            style={{
                                color: "#20b2aa",
                                marginBottom: "15px",
                                borderBottom: "1px solid #eee",
                                paddingBottom: "10px",
                            }}
                        >
                            Professional Compliance Notice
                        </h5>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "15px",
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    AHPRA Requirements:
                                </div>
                                <ul style={{ paddingLeft: "15px", margin: 0 }}>
                                    <li>
                                        Certificate issued under AHPRA registration MED0012345
                                    </li>
                                    <li>
                                        Compliant with Medical Board of Australia guidelines
                                    </li>
                                    <li>Digital signature legally binding and verifiable</li>
                                    <li>
                                        Patient information handled according to Privacy Act 1988
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                    Medical Record Keeping:
                                </div>
                                <ul style={{ paddingLeft: "15px", margin: 0 }}>
                                    <li>Complete consultation notes documented</li>
                                    <li>Clinical assessment recorded appropriately</li>
                                    <li>Certificate details stored securely for 7 years</li>
                                    <li>Audit trail maintained for verification purposes</li>
                                </ul>
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: "15px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <span style={{ fontWeight: "bold" }}>Certificate ID:</span> MC-2024-0234
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold" }}>Status:</span> Approved
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold" }}>Created:</span> 2024-01-15 14:30
                            </div>
                        </div>
                    </div>

                    {/* Signature Section */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginTop: "50px",
                        }}
                    >
                        {/* Left Side - QR Verification */}
                        <div
                            className="verification"
                            style={{
                                // textAlign: "center",
                            }}
                        >
                            <h5
                                style={{
                                    color: "#20b2aa",
                                    marginBottom: "20px",
                                    borderBottom: "1px solid #eee",
                                    // paddingBottom: "10px",
                                }}
                            >
                                Verification
                            </h5>
                            <div
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    border: "1px solid #ddd",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#f9f9f9",
                                    margin: "0 auto 8px",
                                }}
                            >
                                QR
                            </div>
                            <div style={{ fontSize: "12px", fontWeight: "bold" }}>
                                QR123456789
                            </div>
                        </div>

                        {/* Right Side - Signature Section */}
                        <div
                            className="signature-section"
                            style={{
                                textAlign: "right",
                            }}
                        >
                            <div className="signature-right">
                                <div
                                    className="signature-line"
                                    style={{
                                        borderBottom: "1px solid #333",
                                        width: "250px",
                                        marginLeft: "auto",
                                        marginBottom: "5px",
                                    }}
                                />
                                <div
                                    className="doctor-signature"
                                    style={{ fontWeight: "bold", fontSize: "16px" }}
                                >
                                    Issued By: Dr. Sarah Johnson
                                </div>
                                <div
                                    className="doctor-info"
                                    style={{ fontSize: "14px", marginTop: "5px", lineHeight: "1.6" }}
                                >
                                    Digital Signature:{" "}
                                    <span style={{ fontWeight: "500" }}>Electronically signed</span>
                                    <br />
                                    AHPRA Registration:{" "}
                                    <span style={{ fontWeight: "500" }}>MED0012345</span>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            {/* Local Download Button */}
            <div
                className="download-section"
                style={{ textAlign: "center", marginTop: "30px" }}
            >
                <button
                    className="download-btn"
                    onClick={downloadCertificate}
                    style={{
                        backgroundColor: "#20b2aa",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginRight: "10px",
                    }}
                >
                    <i className="fas fa-download" /> Download PDF Certificate
                </button>
                <button
                    style={{
                        backgroundColor: "#6c757d",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginRight: "10px",
                    }}
                >
                    <i className="fas fa-envelope" /> Email to Patient
                </button>
                <button
                    style={{
                        backgroundColor: "#17a2b8",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                    }}
                >
                    <i className="fas fa-print" /> Print Details
                </button>
                <div style={{ marginTop: "15px" }}>
                    <small style={{ color: "#6c757d" }}>
                        <i className="fas fa-shield-check" /> Official Medical Certificate -
                        Digitally Generated
                    </small>
                </div>
            </div>
        </div>
    );
});

export default SickLeavePDF;



// import React, { useRef, useImperativeHandle, forwardRef } from "react";
// import html2pdf from "html2pdf.js";

// const SickLeavePDF = forwardRef((props, ref) => {
//   const certificateRef = useRef();

//   // Function to download PDF0
//   function downloadCertificate(e) {
//     const element = certificateRef.current;
//     const opt = {
//       margin: 0.5,
//       filename: "Medical_Certificate_Sarah_Wilson.pdf",
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: {
//         scale: 2,
//         useCORS: true,
//         letterRendering: true,
//       },
//       jsPDF: {
//         unit: "in",
//         format: "a4",
//         orientation: "portrait",
//       },
//     };

//     let btn;
//     if (e) {
//       btn = e.target;
//       const originalText = btn.innerHTML;
//       btn.innerHTML =
//         '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
//       btn.disabled = true;

//       html2pdf()
//         .set(opt)
//         .from(element)
//         .save()
//         .then(() => {
//           btn.innerHTML = originalText;
//           btn.disabled = false;
//         })
//         .catch((error) => {
//           console.error("PDF generation failed:", error);
//           btn.innerHTML = originalText;
//           btn.disabled = false;
//           alert("PDF generation failed. Please try again.");
//         });
//     } else {
//       html2pdf().set(opt).from(element).save();
//     }
//   }

//   // Expose function to parent via ref
//   useImperativeHandle(ref, () => ({
//     downloadCertificate,
//   }));

//   return (
//     <div>
//       <div
//         className="certificate-container"
//         id="certificate"
//         ref={certificateRef}
//         style={{
//           position: "relative",
//           padding: "40px",
//           maxWidth: "800px",
//           margin: "0 auto",
//           backgroundColor: "white",
//           boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//           fontFamily: "Arial, sans-serif",
//           lineHeight: "1.5",
//           color: "#333",
//         }}
//       >
//         {/* Hospital Section */}
//         <div
//           className="hospital-section"
//           style={{
//             textAlign: "center",
//             marginBottom: "30px",
//           }}
//         >
//           <div className="hospital-info">
//             <h6 style={{ margin: "0", fontSize: "18px", fontWeight: "bold" }}>
//               Liserta Hospital
//             </h6>
//             <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
//               123 Anywhere St, Any City
//             </p>
//           </div>
//         </div>

//         {/* Certificate Title */}
//         <div
//           className="certificate-title"
//           style={{
//             textAlign: "center",
//             marginBottom: "30px",
//           }}
//         >
//           <h1
//             style={{
//               fontSize: "24px",
//               fontWeight: "bold",
//               textTransform: "uppercase",
//               margin: "0",
//               letterSpacing: "1px",
//             }}
//           >
//             MEDICAL CERTIFICATE
//           </h1>
//           <h2
//             style={{
//               fontSize: "18px",
//               fontWeight: "bold",
//               textTransform: "uppercase",
//               margin: "5px 0 0 0",
//             }}
//           >
//             FOR SICK LEAVE
//           </h2>
//         </div>

//         {/* Certificate Body */}
//         <div className="certificate-body">
//           <div
//             className="certificate-text"
//             style={{ marginBottom: "20px", textAlign: "justify" }}
//           >
//             This is to certify that the individual known as{" "}
//             <strong>Sarah Wilson</strong>, also known as employee number{" "}
//             <strong>12457900</strong> at <strong>Lincare, Inc.</strong>, has
//             undergone medical examination conducted at{" "}
//             <strong>123 Anywhere St, Any City</strong> on{" "}
//             <strong>25 June 2050 by Dr. Sarah Johnson</strong>, is currently
//             suffering from <strong>upper respiratory tract infection</strong>.
//           </div>
//           <div
//             className="certificate-text"
//             style={{ marginBottom: "30px", textAlign: "justify" }}
//           >
//             The examiner has advised that she should be allowed absence from her
//             company duties for a period of <strong>5 days</strong>.
//           </div>

//           {/* Patient Details */}
//           <div
//             className="patient-details"
//             style={{
//               border: "1px solid #ddd",
//               padding: "20px",
//               borderRadius: "5px",
//               marginBottom: "30px",
//             }}
//           >
//             <h5
//               style={{
//                 color: "#20b2aa",
//                 marginBottom: "20px",
//                 borderBottom: "1px solid #eee",
//                 paddingBottom: "10px",
//               }}
//             >
//               Patient Information
//             </h5>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "15px",
//               }}
//             >
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Full Name:
//                 </div>
//                 <div>Sarah Wilson</div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Date of Birth:
//                 </div>
//                 <div>1985-03-15</div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Email Address:
//                 </div>
//                 <div>sarah.wilson@email.com</div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Phone Number:
//                 </div>
//                 <div>+61 412 345 678</div>
//               </div>
//               <div style={{ gridColumn: "span 2" }}>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Address:
//                 </div>
//                 <div>123 Collins Street, Melbourne VIC 3000</div>
//               </div>
//               <div style={{ gridColumn: "span 2" }}>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Emergency Contact:
//                 </div>
//                 <div>John Wilson (Husband) - +61 412 987 654</div>
//               </div>
//             </div>
//           </div>

//           {/* Medical Assessment */}
//           <div
//             className="medical-assessment"
//             style={{
//               border: "1px solid #ddd",
//               padding: "20px",
//               borderRadius: "5px",
//               marginBottom: "30px",
//             }}
//           >
//             <h5
//               style={{
//                 color: "#20b2aa",
//                 marginBottom: "20px",
//                 borderBottom: "1px solid #eee",
//                 paddingBottom: "10px",
//               }}
//             >
//               Medical Assessment
//             </h5>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "15px",
//               }}
//             >
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Primary Condition:
//                 </div>
//                 <div>Upper Respiratory Infection</div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Vital Signs:
//                 </div>
//                 <div>Temperature: 38.2°C, Pulse: 88 bpm, BP: 120/80 mmHg</div>
//               </div>
//               <div style={{ gridColumn: "span 2" }}>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Presenting Symptoms:
//                 </div>
//                 <div>
//                   Cough, fever, fatigue, sore throat. Patient reports symptoms
//                   started 2 days ago with gradual worsening.
//                 </div>
//               </div>
//               <div style={{ gridColumn: "span 2" }}>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Clinical Diagnosis:
//                 </div>
//                 <div>
//                   Acute upper respiratory tract infection, likely viral in
//                   origin. No signs of bacterial complications.
//                 </div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Risk Factors:
//                 </div>
//                 <div>None identified</div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Previous History:
//                 </div>
//                 <div>No recent similar episodes</div>
//               </div>
//             </div>
//           </div>

//           {/* Treatment & Management */}
//           <div
//             className="treatment-management"
//             style={{
//               border: "1px solid #ddd",
//               padding: "20px",
//               borderRadius: "5px",
//               marginBottom: "30px",
//             }}
//           >
//             <h5
//               style={{
//                 color: "#20b2aa",
//                 marginBottom: "20px",
//                 borderBottom: "1px solid #eee",
//                 paddingBottom: "10px",
//               }}
//             >
//               Treatment & Management
//             </h5>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "15px",
//               }}
//             >
//               <div style={{ gridColumn: "span 2" }}>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Treatment Plan:
//                 </div>
//                 <div>
//                   Rest, fluids, paracetamol for fever and pain relief. Throat
//                   lozenges for comfort. Return if symptoms worsen.
//                 </div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Medication Prescribed:
//                 </div>
//                 <div>Paracetamol 500mg, 2 tablets every 6 hours as needed</div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Work Restrictions:
//                 </div>
//                 <div>
//                   No heavy lifting or strenuous activity. Work from home if
//                   possible to prevent spread.
//                 </div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Follow-up Required:
//                 </div>
//                 <div>Yes - Recommended date: 2024-01-20</div>
//               </div>
//               <div style={{ gridColumn: "span 2" }}>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Consultation Notes:
//                 </div>
//                 <div>
//                   <div>Consultation Type: Video Consultation</div>
//                   <div>
//                     Clinical Notes: Patient appeared unwell but alert. Clear
//                     speech, no respiratory distress. Advised isolation until
//                     fever-free for 24 hours.
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Certificate Summary */}
//           <div
//             className="certificate-summary"
//             style={{
//               border: "1px solid #ddd",
//               padding: "20px",
//               borderRadius: "5px",
//               marginBottom: "30px",
//             }}
//           >
//             <h5
//               style={{
//                 color: "#20b2aa",
//                 marginBottom: "20px",
//                 borderBottom: "1px solid #eee",
//                 paddingBottom: "10px",
//               }}
//             >
//               Certificate Summary
//             </h5>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "15px",
//               }}
//             >
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Certificate ID:
//                 </div>
//                 <div>MC-2024-0234</div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Certificate Type:
//                 </div>
//                 <div>Sick Leave</div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Start Date:
//                 </div>
//                 <div>2024-01-16</div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   End Date:
//                 </div>
//                 <div>2024-01-17</div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Duration:
//                 </div>
//                 <div>2 days</div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Amount Charged:
//                 </div>
//                 <div>$79.00</div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Created Date:
//                 </div>
//                 <div>2024-01-15 14:30</div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Certificate Number:
//                 </div>
//                 <div>CERT-2024-15634</div>
//               </div>
//             </div>
//           </div>

//           {/* Practitioner Details */}
//           <div
//             className="practitioner-details"
//             style={{
//               border: "1px solid #ddd",
//               padding: "20px",
//               borderRadius: "5px",
//               marginBottom: "30px",
//             }}
//           >
//             <h5
//               style={{
//                 color: "#20b2aa",
//                 marginBottom: "20px",
//                 borderBottom: "1px solid #eee",
//                 paddingBottom: "10px",
//               }}
//             >
//               Practitioner Details
//             </h5>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "15px",
//               }}
//             >
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Issued By:
//                 </div>
//                 <div>Dr. Sarah Johnson</div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   AHPRA Registration:
//                 </div>
//                 <div>MED0012345</div>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Digital Signature:
//                 </div>
//                 <div>Electronically signed</div>
//               </div>
//             </div>
//           </div>

//           {/* Verification */}
//           <div
//             className="verification"
//             style={{
//               border: "1px solid #ddd",
//               padding: "20px",
//               borderRadius: "5px",
//               marginBottom: "30px",
//               textAlign: "center",
//             }}
//           >
//             <h5
//               style={{
//                 color: "#20b2aa",
//                 marginBottom: "20px",
//                 borderBottom: "1px solid #eee",
//                 paddingBottom: "10px",
//               }}
//             >
//               Verification
//             </h5>
//             <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
//               QR Verification Code: QR123456789
//             </div>
//             <div style={{ marginBottom: "15px" }}>
//               <div
//                 style={{
//                   width: "100px",
//                   height: "100px",
//                   border: "1px solid #ddd",
//                   margin: "0 auto",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   backgroundColor: "#f9f9f9",
//                 }}
//               >
//                 QR Code
//               </div>
//             </div>
//             <div style={{ fontStyle: "italic", marginBottom: "15px" }}>
//               This certificate can be verified using the QR code above. Scan to
//               confirm authenticity and validity.
//             </div>
//           </div>

//           {/* Professional Compliance Notice */}
//           <div
//             className="compliance-notice"
//             style={{
//               border: "1px solid #ddd",
//               padding: "20px",
//               borderRadius: "5px",
//               marginBottom: "30px",
//               fontSize: "12px",
//             }}
//           >
//             <h5
//               style={{
//                 color: "#20b2aa",
//                 marginBottom: "15px",
//                 borderBottom: "1px solid #eee",
//                 paddingBottom: "10px",
//               }}
//             >
//               Professional Compliance Notice
//             </h5>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: "15px",
//               }}
//             >
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   AHPRA Requirements:
//                 </div>
//                 <ul style={{ paddingLeft: "15px", margin: 0 }}>
//                   <li>
//                     Certificate issued under AHPRA registration MED0012345
//                   </li>
//                   <li>
//                     Compliant with Medical Board of Australia guidelines
//                   </li>
//                   <li>Digital signature legally binding and verifiable</li>
//                   <li>
//                     Patient information handled according to Privacy Act 1988
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                   Medical Record Keeping:
//                 </div>
//                 <ul style={{ paddingLeft: "15px", margin: 0 }}>
//                   <li>Complete consultation notes documented</li>
//                   <li>Clinical assessment recorded appropriately</li>
//                   <li>Certificate details stored securely for 7 years</li>
//                   <li>Audit trail maintained for verification purposes</li>
//                 </ul>
//               </div>
//             </div>
//             <div
//               style={{
//                 marginTop: "15px",
//                 display: "flex",
//                 justifyContent: "space-between",
//               }}
//             >
//               <div>
//                 <span style={{ fontWeight: "bold" }}>Certificate ID:</span> MC-2024-0234
//               </div>
//               <div>
//                 <span style={{ fontWeight: "bold" }}>Status:</span> Approved
//               </div>
//               <div>
//                 <span style={{ fontWeight: "bold" }}>Created:</span> 2024-01-15 14:30
//               </div>
//             </div>
//           </div>

//           {/* Signature Section */}
//           <div
//             className="signature-section"
//             style={{
//               marginTop: "60px",
//               textAlign: "right",
//             }}
//           >
//             <div className="signature-right">
//               <div
//                 className="signature-line"
//                 style={{
//                   borderBottom: "1px solid #333",
//                   width: "250px",
//                   marginLeft: "auto",
//                   marginBottom: "5px",
//                 }}
//               />
//               <div
//                 className="doctor-signature"
//                 style={{ fontWeight: "bold", fontSize: "16px" }}
//               >
//                 Dr. Sarah Johnson
//               </div>
//               <div
//                 className="doctor-info"
//                 style={{ fontSize: "14px", marginTop: "5px" }}
//               >
//                 Licensed Doctor
//                 <br />
//                 Liberty Hospital
//                 <br />
//                 125-456-9780
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Local Download Button */}
//       <div
//         className="download-section"
//         style={{ textAlign: "center", marginTop: "30px" }}
//       >
//         <button
//           className="download-btn"
//           onClick={downloadCertificate}
//           style={{
//             backgroundColor: "#20b2aa",
//             color: "white",
//             border: "none",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             cursor: "pointer",
//             fontSize: "16px",
//             fontWeight: "bold",
//             marginRight: "10px",
//           }}
//         >
//           <i className="fas fa-download" /> Download PDF Certificate
//         </button>
//         <button
//           style={{
//             backgroundColor: "#6c757d",
//             color: "white",
//             border: "none",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             cursor: "pointer",
//             fontSize: "16px",
//             fontWeight: "bold",
//             marginRight: "10px",
//           }}
//         >
//           <i className="fas fa-envelope" /> Email to Patient
//         </button>
//         <button
//           style={{
//             backgroundColor: "#17a2b8",
//             color: "white",
//             border: "none",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             cursor: "pointer",
//             fontSize: "16px",
//             fontWeight: "bold",
//           }}
//         >
//           <i className="fas fa-print" /> Print Details
//         </button>
//         <div style={{ marginTop: "15px" }}>
//           <small style={{ color: "#6c757d" }}>
//             <i className="fas fa-shield-check" /> Official Medical Certificate -
//             Digitally Generated
//           </small>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default SickLeavePDF;