import React from "react";
import { useNavigate } from "react-router-dom";
import "./ERClinicalEntries.css";
import { useLocation } from "react-router-dom";

const ERClinicalEntries = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const erPatient = location.state?.receipt;

  const cards = [
    { id: "DC", label: "Diabetic Chart" },
    { id: "IR", label: "Incident Report" },
    { id: "WC", label: "Wound Certificate" },
    { id: "CR", label: "CPR Records New" },
    { id: "GS", label: "GCS Sheet" },
    { id: "CF", label: "Chart For Estimating Severity" },
    { id: "AR", label: "Accident Report" },
    // { id: 'CR2', label: 'CPR Record' },
    { id: "PCR", label: "Patient Care Report" },
    { id: "ND", label: "Narcotic Drugs Dispensed" },
    { id: "CR3", label: "CPR Review" },
  ];

  const handleCardClick = (cardId) => {
    const routeState = { receipt: erPatient }; // Pass erPatient as state

    switch (cardId) {
      case "DC":
        navigate("/emergency/diabetic-chart", { state: routeState });

        break;
      case "WC":
        navigate("/emergency/wound-certificate", { state: routeState });
        break;
      case "AR":
        navigate("/emergency/accident-report", { state: routeState });
        break;
      case "IR":
        navigate("/emergency/incident-report", { state: routeState });
        break;
      case "CR3":
        navigate("/emergency/cpr-review", { state: routeState });
        break;
      case "GS":
        navigate("/emergency/gcs-sheet", { state: routeState });
        break;
      case "CF":
        navigate("/emergency/estimation-service-burn-wound", {
          state: routeState,
        });
        break;
      case "ND":
        navigate("/emergency/narcotic-drugs-dispensed", { state: routeState });
        break;
      case "CR":
        navigate("/emergency/cpr-record-new", { state: routeState });
        break;
      case "PCR":
        navigate("/emergency/patientCareReport", { state: routeState });
        break;
      default:
        break;
    }
  };
  const handleBack = () => navigate("/emergency/finalizedpatients");

  return (
    <div className="er-clinical-entries-container">
      <div className="er-initial-assessment-com-section">
        <button
          className="er-initial-assessment-com-section-back"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
      <div className="er-clinical-entries-container-sub-header">
        ER Clinical Entries
      </div>
      <div className="er-clinical-entries-container-card-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className="er-clinical-entries-container-card"
            onClick={() => handleCardClick(card.id)}
          >
            <div className="er-clinical-entries-container-card-id">
              {card.id}
            </div>
            <div className="er-clinical-entries-container-card-label">
              {card.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ERClinicalEntries;
