import React, { useEffect, useState } from "react";
import BaseUrl from "../../../Utilities/BaseUrl";

const AuditTrail = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch(
          `${BaseUrl}/auth/GetallaAprovedCertififcte`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setCertificates(data);
        } else {
          setCertificates([]); // fallback if API not returning array
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
        setCertificates([]); // error case bhi empty rakhna
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">Loading certificates...</div>
    );

  return (
    <div className="p-1">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Approved Certificates
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Certificate
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Practitioner
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {certificates.length > 0 ? (
              certificates.map((cert, index) => (
                <tr
                  key={cert.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-800">
                      {cert.patient_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {cert.certificate_day} Day(s)
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">
                      {cert.patient_email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {cert.mobile_No}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-800">
                      {cert.certificate_type}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-800">
                      {cert.practitioner_first_name}{" "}
                      {cert.practitioner_last_name}
                    </div>
                   
                  </td>

                  <td className="px-6 py-4 text-center">
                    <a
                      href={cert.approved_certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No approved certificates found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditTrail;
