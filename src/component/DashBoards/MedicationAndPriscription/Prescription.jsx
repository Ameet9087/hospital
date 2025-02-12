import React, { useEffect, useState, useRef } from "react";
import "./Prescription.css";

const Prescription = ({ handleClose, selectedDate }) => {
  const [medications, setMedications] = useState([]);
  const printRef = useRef();

  useEffect(() => {
    const fetchMedications = async () => {
      const endpoint = `http://192.168.1.70:4096/api/medications/by-opd-id?opdPatientId=48`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log("Fetched Medications:", data);

        // Filter medications based on selectedDate
        const filteredData = selectedDate
          ? data.filter((med) => med.medicationDate === selectedDate)
          : data;

        setMedications(filteredData);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, [selectedDate]);

  // Print Function
  const handlePrint = () => {
    window.print();
  };

  // Export to CSV
  const handleExport = () => {
    const csvData = [
      ["S.N.", "Medicine", "Dose", "Route", "Frequency", "Last Taken", "Medication Date", "Comments"],
      ...medications.map((med, index) => [
        index + 1,
        med.medicationName,
        med.dose,
        med.route,
        med.frequency,
        med.lastTaken,
        med.medicationDate,
        med.comments,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `medications_${selectedDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="prescription-container">
      <div className="button-container">
        <button className="prescription-close-button" onClick={handleClose}>Back</button>
        <button onClick={handleExport}>Export to CSV</button>
        <button onClick={handlePrint}>Print</button>
      </div>

      <div ref={printRef} className="prescription-content">
        <h2>HIMS Prescription</h2>
        <p><strong>Selected Date:</strong> {selectedDate}</p>

        {medications.length > 0 ? (
          <div className="patient-form">
            <div className="form-group">
              <label>Name:</label>
              <span>{medications[0].newPatientVisitDTO.patient.firstName} {medications[0].newPatientVisitDTO.patient.lastName}</span>
            </div>
            <div className="form-group">
              <label>UHID:</label>
              <span>{medications[0].newPatientVisitDTO.patient.uhid}</span>
            </div>
            <div className="form-group">
              <label>Age:</label>
              <span>{medications[0].newPatientVisitDTO.patient.age}</span>
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <span>{medications[0].newPatientVisitDTO.patient.gender}</span>
            </div>
            <div className="form-group">
              <label>Address:</label>
              <span>{medications[0].newPatientVisitDTO.patient.address}</span>
            </div>
            <div className="form-group">
              <label>Contact:</label>
              <span>{medications[0].newPatientVisitDTO.patient.contactNumber}</span>
            </div>
            <div className="form-group">
              <label>Medications:</label>
              <span>{medications.map(med => med.medicationName).join(", ")}</span>
            </div>
            <div className="form-group">
              <label>Dose:</label>
              <span>{medications.map(med => med.dose).join(", ")}</span>
            </div>
            <div className="form-group">
              <label>Frequency:</label>
              <span>{medications.map(med => med.frequency).join(", ")}</span>
            </div>
            <div className="form-group">
              <label>Last Taken:</label>
              <span>{medications.map(med => med.lastTaken).join(", ")}</span>
            </div>
          </div>
        ) : (
          <p>No medications found for {selectedDate}</p>
        )}
      </div>
    </div>
  );
};

export default Prescription;
