import React, { useEffect, useState, useRef } from "react";
import "./Prescription.css";
import { API_BASE_URL } from "../api/api";

const Prescription = ({ patient, handleClose }) => {
  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const printRef = useRef(); // Create a ref for the printing content

  useEffect(() => {
    const fetchMedications = async () => {
      let endpoint = "";
      if (patient.outPatientId) {
        endpoint = `${API_BASE_URL}/medications/by-opd-id?opdPatientId=${patient?.outPatientId}`;
      } else if (patient.admissionId) {
        endpoint = `${API_BASE_URL}/medications/by-ipd-id?ipdPatientId=${
          patient.patient?.inPatientId || patient?.patientId
        }`;
      }
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setMedications(data);
        console.log(data);

        // Get today's date in MM/DD/YYYY format
        const today = new Date();
        const todayStr = `${
          today.getMonth() + 1
        }/${today.getDate()}/${today.getFullYear()}`; // MM/DD/YYYY

        // Function to convert YYYY-MM-DD to MM/DD/YYYY
        const formatMedicationDate = (medicationDateStr) => {
          const [year, month, day] = medicationDateStr.split("-");
          return `${parseInt(month)}/${parseInt(day)}/${year}`; // Convert to MM/DD/YYYY
        };

        // Filtering medications with today's date (MM/DD/YYYY)
        const filteredData = data.filter((medication) => {
          const medicationDateStr = medication.medicationDate; // Format is YYYY-MM-DD
          const formattedMedicationDate =
            formatMedicationDate(medicationDateStr); // Convert to MM/DD/YYYY
          return formattedMedicationDate === todayStr; // Compare with today's date
        });

        // Sorting medication by date if necessary
        if (filteredData.length > 0) {
          setFilteredMedications(
            filteredData.sort(
              (a, b) => new Date(b.medicationDate) - new Date(a.medicationDate)
            )
          );
        }
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, [patient.outPatientId, patient?.inPatientId]);

  // Custom print function using a ref
  const handlePrint = () => {
    const printContent = printRef.current.innerHTML; // Get the content inside the ref
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none"; // Hide the iframe

    document.body.appendChild(iframe); // Add the iframe to the body

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Print Prescription</title>
          <style>
            /* Add your custom print styles here */
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            h2 {
              text-align: center;
            }
            .prescription-table {
              width: 100%;
              border-collapse: collapse;
            }
            .prescription-table th, .prescription-table td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
            }
            .prescription-footer {
              margin-top: 20px;
            }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    doc.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    document.body.removeChild(iframe); // Clean up the iframe
  };

  return (
    <div className="prescription-container">
      <button className="prescription-close-button" onClick={handleClose}>
        X
      </button>
      <div ref={printRef} className="prescription-content">
        {" "}
        <div className="prescription-header">
          <div className="prescription-header-title">
            <h2>HIMS</h2>
          </div>
          <div className="prescription-header-title">
            <p>
              {patient?.employeeDTO?.salutation ||
                patient?.admittedDoctorDTO?.salutation ||
                patient?.doctorSalutationName}{" "}
              {patient?.employeeDTO?.firstName ||
                patient?.admittedDoctorDTO?.firstName ||
                patient?.doctorFirstName}{" "}
              {patient?.employeeDTO?.lastName ||
                patient?.admittedDoctorDTO?.lastName ||
                patient?.doctorLastName}
            </p>
            <p>
              {patient?.admittedDoctorDTO?.contactNumber ||
                patient?.doctorContactNumber}
            </p>
          </div>
        </div>
        <div className="patient-info">
          <p>
            <strong>Name:</strong>{" "}
            {patient?.patient?.firstName ||
              patient.firstName ||
              patient?.patientFirstName}{" "}
            {patient.patient?.lastName ||
              patient?.lastName ||
              patient?.patientLastName}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {patient.patient?.address || patient?.address}
          </p>
          <p>
            <strong>Contact Number:</strong>{" "}
            {patient?.patient?.phoneNumber || patient.phoneNumber}
          </p>
          <p>
            <strong>Age/Sex:</strong>{" "}
            {patient.patient?.age || patient?.age || patient?.patientAge}{" "}
            {patient.patient?.ageUnit || patient?.age || patient?.ageUnit} /{" "}
            {patient.patient?.gender || patient?.patientGender}
          </p>
        </div>
        <table className="prescription-table">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Medicine</th>
              <th>Dose</th>
              <th>Frequency</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedications.length > 0 ? (
              filteredMedications.map((medication, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{medication.medicationName}</td>
                  <td>{medication.dose}</td>
                  <td>{medication.frequency}</td>
                  <td>{medication.lastTaken}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No medications available</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="prescription-footer">
          <p className="rx">Rx</p>
          <p className="doctor-signature">Doctor Signature</p>
        </div>
      </div>

      <button className="prescription-print-btn" onClick={handlePrint}>
        Print
      </button>
    </div>
  );
};

export default Prescription;
