import React, { useState } from 'react';
import './EncounterHistory.css';
import VisitSummary from './EncounterHistoryViewSummary'; // Import the VisitSummary component

const VisitTable = ({patientId,newPatientVisitId}) => {
  const [showSummary, setShowSummary] = useState(false);

  const visits = [
    { visitType: 'outpatient', visitCode: 'V2400103', visitDate: '2024-06-18', visitTime: '08:26 AM', providerName: '', comments: '', referredByProvider: '' },
    { visitType: 'inpatient', visitCode: 'H2400014', visitDate: '2024-06-18', visitTime: '12:16 PM', providerName: '', comments: '', referredByProvider: '' },
  ];

  // Function to handle showing the summary
  const handleViewSummary = () => {
    setShowSummary(true);
  };

  // Function to handle closing the summary
  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  return (
    <div className="Encounter-visit-table-container">
      {showSummary ? (
        <VisitSummary onClose={handleCloseSummary} />
      ) : (
        <table className="Encounter-visit-table">
          <thead>
            <tr>
              <th>VisitType</th>
              <th>VisitCode</th>
              <th>Visit Date</th>
              <th>Visit Time</th>
              <th>Provider Name</th>
              <th>Comments</th>
              {/* <th>Referred By Provider</th> */}
            </tr>
          </thead>
          <tbody>
            {visits.map((visit, index) => (
              <tr key={index}>
                <td>{visit.visitType}</td>
                <td>{visit.visitCode}</td>
                <td>{visit.visitDate}</td>
                <td>{visit.visitTime}</td>
                <td>{visit.providerName}</td>
                <td>{visit.comments}</td>
                {/* <td>
                  <a href="#" className="Encounter-view-summary" onClick={handleViewSummary}>
                    View Summary
                  </a>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VisitTable;
