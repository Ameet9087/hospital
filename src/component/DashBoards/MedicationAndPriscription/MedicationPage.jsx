import React, { useEffect, useState } from "react";
import Prescription from "./Prescription"; // Import Prescription Component
import "./MedicationPage.css"; // Import CSS file

const MedicationPage = () => {
  const [medicationData, setMedicationData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPrescription, setShowPrescription] = useState(false);
  const [selectedMedications, setSelectedMedications] = useState([]);

  useEffect(() => {
    const fetchMedicationData = async () => {
      try {
        const response = await fetch("http://192.168.1.70:4096/api/medications/by-opd-id?opdPatientId=48");
        const data = await response.json();

        // Group medications by date
        const groupedData = data.reduce((acc, med) => {
          if (!acc[med.medicationDate]) {
            acc[med.medicationDate] = {
              date: med.medicationDate,
              patientName: `${med.newPatientVisitDTO.patient.firstName} ${med.newPatientVisitDTO.patient.lastName}`,
              medications: [],
            };
          }
          acc[med.medicationDate].medications.push(med);
          return acc;
        }, {});

        setMedicationData(Object.values(groupedData));
      } catch (error) {
        console.error("Error fetching medication data:", error);
      }
    };

    fetchMedicationData();
  }, []);

  const handleButtonClick = (date, medications) => {
    setSelectedDate(date);
    setSelectedMedications(medications);
    setShowPrescription(true);
  };

  return (
    <div className="medication-page">
      {!showPrescription ? (
        <>
          <h2>Select a Date to View Medications</h2>
          {medicationData.length > 0 ? (
            <div className="button-container">
              {medicationData.map((item, index) => (
                <button 
                  key={index} 
                  className="medication-button" 
                  onClick={() => handleButtonClick(item.date, item.medications)}
                >
                  <div>
                    <strong>{item.date}</strong>
                    <p><strong>Patient Name :</strong>{item.patientName}</p>
                    <p><strong>Medications :</strong> {item.medications.length}</p>
                    <p><strong>Doses :</strong> {item.medications.map(m => m.dose).join(", ")}</p>
                    <p><strong>Frequency :</strong> {item.medications.map(m => m.frequency).join(", ")}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p>No medication records found.</p>
          )}
        </>
      ) : (
        <Prescription 
          selectedDate={selectedDate} 
          medications={selectedMedications} 
          handleClose={() => setShowPrescription(false)} 
        />
      )}
    </div>
  );
};

export default MedicationPage;
