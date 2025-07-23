import React, { useState, useEffect } from "react";
import "./DischargePatient.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";

export default function DischargeTrack() {
  const [selectedDate, setSelectedDate] = useState("");
  const [isDischarging, setIsDischarging] = useState(false);

  // Redux: Fetch patient data from state
  const patientData = useSelector((state) => state.patient?.patientData || {});

  // Log patientData to the console for debugging
  useEffect(() => {
    console.log("Patient Data:", patientData);
  }, [patientData]);

  // Handle date change for filtering
  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
  };

  const remainingAmount =
    patientData?.financialDetails?.totalAmount -
    patientData?.financialDetails?.paidAmount;

  // Function to handle discharge button click
  const handleDischargeClick = async () => {
    if (remainingAmount > 0) {
      alert("Please pay the remaining amount before discharge.");
    } else {
      try {
        setIsDischarging(true); // Set the discharging state to true (for loading state)
        
        // API Call to discharge patient
        const response = await axios.post(
          `${API_BASE_URL}/ip-admissions/discharge/${patientData?.ipAdmmissionId}`
         
        );

        if (response.status === 200) {
          alert("Patient discharged successfully.");
          // Handle post-discharge actions, such as navigating away or clearing data
        } else {
          alert("There was an error discharging the patient.");
        }
      } catch (error) {
        console.error("Error discharging patient:", error);
        alert("An error occurred while discharging the patient.");
      } finally {
        setIsDischarging(false); // Reset the discharging state
      }
    }
  };

  return (
    <div className="dischargetrack-container">
      <div className="dischargetrack-upper-bar">DISCHARGE PATIENT</div>

      <div className="dischargetrack-type-container">
        <label htmlFor="type" className="dischargetrack-label">Type:</label>
        <select id="type" className="dischargetrack-select">
          <option value="">All</option>
          <option value="first">First</option>
          <option value="second">Second</option>
        </select>

        <label htmlFor="date" className="dischargetrack-label">Date:</label>
        <input
          type="date"
          id="date"
          className="dischargetrack-input"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="dischargetrack-table-bar">Discharge Patient Details</div>

      <div className="patient-info-container">
        {patientData?.patient ? (
          <div className="patient-info">
            <div className="patient-info-column">
              <p><strong>SN:</strong> 1</p>
              <p><strong>UHID:</strong> {patientData?.patient?.uhid}</p>
              <p><strong>Name:</strong> {`${patientData?.patient?.firstName} ${patientData?.patient?.middleName || ""} ${patientData?.patient?.lastName}`}</p>
              <p><strong>IP No:</strong> {patientData?.ipAdmmissionId}</p>
              <p><strong>Admission Date:</strong> {patientData?.admissionDate}</p>
            </div>

            <div className="patient-info-column">
              <p><strong>Doctor:</strong> {patientData?.admissionUnderDoctorDetail?.consultantDoctor?.name || "N/A"}</p>
              <p><strong>Organisation:</strong> {patientData?.organisationDetail?.type || "N/A"}</p>
              <p><strong>Total Amount:</strong> {patientData?.financialDetails?.totalAmount || 0}</p>
              <p><strong>Paid Amount:</strong> {patientData?.financialDetails?.paidAmount || 0}</p>
              <p><strong>Remaining Amount:</strong> 
                <span
                  style={{
                    color: remainingAmount > 0 ? "red" : "inherit",
                  }}
                >
                  {remainingAmount}
                </span>
              </p>
            </div>

            <div className="patient-action">
              <button
                className="dischargetrack-button"
                style={{
                  backgroundColor: remainingAmount > 0 ? "red" : "var(--button-bg-color)",
                }}
                disabled={remainingAmount > 0 || isDischarging}
                onClick={handleDischargeClick}
              >
                {isDischarging ? "Discharging..." : "Discharge"}
              </button>
            </div>
          </div>
        ) : (
          <div className="dischargetrack-no-data">
            <p>No Records Found</p>
          </div>
        )}
      </div>
    </div>
  );
}
