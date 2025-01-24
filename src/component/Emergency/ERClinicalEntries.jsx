import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ERClinicalEntries.css';

const ERClinicalEntries = () => {
  const navigate = useNavigate();

  const cards = [
    { id: 'DC', label: 'Diabetic Chart' },
    { id: 'IR', label: 'Incident Report' },
    { id: 'WC', label: 'Wound Certificate' },
    { id: 'CR', label: 'CPR Records New' },
    { id: 'GS', label: 'GCS Sheet' },
    { id: 'CF', label: 'Chart For Estimating Severity' },
    { id: 'AR', label: 'Accident Report' },
    { id: 'CR2', label: 'CPR Record' },
    { id: 'PCR', label: 'Patient Care Report' },
    { id: 'ND', label: 'Narcotic Drugs Dispensed' },
    { id: 'CR3', label: 'CPR Review' },
  ];

  const handleCardClick = (cardId) => {
    if (cardId === 'DC') {
      navigate('/emergency/diabetic-chart');
    } else if (cardId === 'WC') {
      navigate('/emergency/wound-certificate');
    } else if (cardId === 'AR') {
      navigate('/emergency/accident-report');
    } else if (cardId === 'IR') {
      navigate('/emergency/incident-report');
    } else if (cardId === 'CR3') {
      navigate('/emergency/cpr-review');
    } else if (cardId === 'GS') {
      navigate('/emergency/gcs-sheet');
    } else if (cardId === 'CF') {
      navigate('/emergency/estimation-service-burn-wound');
    } else if (cardId === 'ND') {
      navigate('/emergency/narcotic-drugs-dispensed');
    }
    else if (cardId === 'CR') {
      navigate('/emergency/cpr-record-new');
    }
    else if (cardId === 'PCR') {
      navigate('/emergency/patientCareReport');
    }
  };


  return (
    <div className="er-clinical-entries-container">
      <div className="er-clinical-entries-container-sub-header">ER Clinical Entries</div>
      <div className="er-clinical-entries-container-card-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className="er-clinical-entries-container-card"
            onClick={() => handleCardClick(card.id)}
          >
            <div className="er-clinical-entries-container-card-id">{card.id}</div>
            <div className="er-clinical-entries-container-card-label">{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ERClinicalEntries;
