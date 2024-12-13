import React, { useState } from 'react';
import PharmacyClearence from './phormacyclearencepopup';

const PharmacyClearanceTable = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Dummy data based on PharmacyClearance fields
  const data = [
    {
      pharmacyClearanceId: 1,
      patientClearanceDues: 'Yes',
      noReturns: 'No',
      implant: 'Yes',
      status: 'Pending',
    },
    {
      pharmacyClearanceId: 2,
      patientClearanceDues: 'No',
      noReturns: 'Yes',
      implant: 'No',
      status: 'Completed',
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
    <div className="pharmacyClearanceTable">
      <h2>Pharmacy Clearance Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Clearance Dues</th>
            <th>No Returns</th>
            <th>Implant</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.pharmacyClearanceId}>
              <td>{row.pharmacyClearanceId}</td>
              <td>{row.patientClearanceDues}</td>
              <td>{row.noReturns}</td>
              <td>{row.implant}</td>
              <td>{row.status}</td>
              <td>
                <button
                  className="pharmacy-action-btn"
                  onClick={() => openPopup(row)}
                >
                  Action
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <PharmacyClearence
          rowData={selectedRow}
          onClose={closePopup}
        />
      )}
    </div>
  );
};



export default PharmacyClearanceTable;
