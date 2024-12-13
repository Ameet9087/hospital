import React, { useState } from 'react';
// import './receptionClearanceTable.css'; // Uncomment and add custom CSS if needed
 import ReceptionClearance from './reeptionclearencepop';

const ReceptionClearanceTable = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Dummy data based on ReceptionClearance fields
  const data = [
    {
      receptionClearanceId: 1,
      billHasPrepared: 'Yes',
      billHasSettled: 'No',
      ipBlocked: 'No',
      status: 'Pending',
    },
    {
      receptionClearanceId: 2,
      billHasPrepared: 'Yes',
      billHasSettled: 'Yes',
      ipBlocked: 'Yes',
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
    <div className="receptionClearanceTable">
      <h2>Reception Clearance Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Bill Prepared</th>
            <th>Bill Settled</th>
            <th>IP Blocked</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.receptionClearanceId}>
              <td>{row.receptionClearanceId}</td>
              <td>{row.billHasPrepared}</td>
              <td>{row.billHasSettled}</td>
              <td>{row.ipBlocked}</td>
              <td>{row.status}</td>
              <td>
                <button
                  className="reception-action-btn"
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
        <ReceptionClearance
          rowData={selectedRow}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default ReceptionClearanceTable;
