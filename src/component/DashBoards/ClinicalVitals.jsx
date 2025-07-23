import React, { useState } from "react";
import "./ClinicalVitals.css";
import AllergyList from "../DashBoards/ClinicalAllergy";
import ClinicalMedication from "../DashBoards/ClinicalMedication";
import ClinicalBloodSugarMonitoring from "../DashBoards/ClinicalBloodSugarMonitoring";
import AddVitalsForm from "../DashBoards/AddVitals"; // Import the AddVitalsForm component
import Allergy from "../DashBoards/ClinicalAllergy";

const VitalsPage = ({ patientId, outPatientId, Type, onClose }) => {
  const [activeTab, setActiveTab] = useState("vitals");
  const [showAddVitalsForm, setShowAddVitalsForm] = useState(false); // State to manage form visibility

  const renderContent = () => {
    if (showAddVitalsForm) {
      return (
        <AddVitalsForm patientId={patientId} outPatientId={outPatientId} />
      );
    }
    if (activeTab === "allergy") {
      return <Allergy patientId={patientId} outPatientId={outPatientId} />;
    }
    if (activeTab === "medication") {
      return (
        <ClinicalMedication patientId={patientId} outPatientId={outPatientId} />
      );
    }
    if (activeTab === "bloodsugar") {
      return (
        <ClinicalBloodSugarMonitoring
          patientId={patientId}
          outPatientId={outPatientId}
        />
      );
    }
    return (
      <>
        <AddVitalsForm patientId={patientId} outPatientId={outPatientId} />
      </>
      // <div className="vitals-list">
      //   <h2>Vitals List</h2>
      //   <button className="new-vitals-btn" onClick={() => setShowAddVitalsForm(true)}>
      //     + New Vitals
      //   </button>
      //   <ul>
      //     <li>Recorded On</li>
      //     <li>Taken On</li>
      //     <li>Height</li>
      //     <li>Weight</li>
      //     <li>BMI</li>
      //     <li>Temperature</li>
      //     <li>Pulse</li>
      //     <li>Blood Pressure</li>
      //     <li>Respiratory Rate</li>
      //     <li>SpO2</li>
      //     <li>O₂ Delivery Method</li>
      //     <li>Body Pain Data</li>
      //     <li>Action</li>
      //   </ul>
      // </div>
    );
  };

  return (
    <div className="vitals-page">
      <nav className="vitals-page-tab-navigation">
        <div className="vitals-page-tab-navigation-navTab">
          <button
            className={`vitals-page-tab ${
              activeTab === "vitals" ? "active" : ""
            }`}
            onClick={() => setActiveTab("vitals")}
          >
            Vitals
          </button>
          <button
            className={`vitals-page-tab ${
              activeTab === "allergy" ? "active" : ""
            }`}
            onClick={() => setActiveTab("allergy")}
          >
            Allergy
          </button>
          <button
            className={`vitals-page-tab ${
              activeTab === "medication" ? "active" : ""
            }`}
            onClick={() => setActiveTab("medication")}
          >
            Medication
          </button>
          <button
            className={`vitals-page-tab ${
              activeTab === "bloodsugar" ? "active" : ""
            }`}
            onClick={() => setActiveTab("bloodsugar")}
          >
            Blood Sugar Monitoring
          </button>
        </div>
        {Type && <button onClick={onClose}>Back</button>}
      </nav>

      <div className="vitals-page-content-area">{renderContent()}</div>

      {/* {showAddVitalsForm && (
        <button className="vitals-page-close-btn" onClick={() => setShowAddVitalsForm(false)}>×</button>
      )} */}
    </div>
  );
};

export default VitalsPage;
