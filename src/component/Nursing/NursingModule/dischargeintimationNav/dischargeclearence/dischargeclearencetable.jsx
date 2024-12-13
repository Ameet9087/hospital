import React, { useState } from 'react';
import './DischargeClearanceTable.css';
import DischargeClearance from './DischargeClearanceFormPopUp';

const DischargeClearanceTable = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Sample data for the discharge clearance table
  const data = [
    {
      id: 1,
      dischargeSummary: 'Discharge completed with no issues',
      status: 'Completed',
    },
    {
      id: 2,
      dischargeSummary: 'Pending review of discharge summary',
      status: 'Pending',
    },
  ];

  const openPopup = (row) => {
    setSelectedRow(row);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedRow(null);
    setShowPopup(false);
  };

  return (
    <div className="dischargeclearence-table">
      <h2>Discharge Clearance Table</h2>

      <table className="dischargeclearence-table__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Discharge Summary</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.dischargeSummary}</td>
              <td>{row.status}</td>
              <td>
                <button
                  className="dischargeclearence-table__action-btn"
                  onClick={() => openPopup(row)}
                >
                  Action
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Form Component */}
      {showPopup && (
        <DischargeClearance rowData={selectedRow} onClose={closePopup} />
      )}
    </div>
  );
};

export default DischargeClearanceTable;
