import React, { useState } from 'react';
// import './nurseClearanceTable.css';
import NurseClearanceFormPopUp from './nurseclearencepopupform';


const NurseClearanceTable = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const data = [
    {
      id: 1,
      medicinesReturnedPharmacy: 'Yes',
      dischargeMedicinesIndented: 'No',
      roomInventoryChecked: 'Yes',
      idBandRemoved: 'Yes',
      status: 'Completed',
    },
    {
      id: 2,
      medicinesReturnedPharmacy: 'No',
      dischargeMedicinesIndented: 'Yes',
      roomInventoryChecked: 'No',
      idBandRemoved: 'Yes',
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
    <div className="nurseClearanceTable">
      <h2>Nurse Clearance Table</h2>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Medicines Returned</th>
            <th>Medicines Indented</th>
            <th>Room Inventory</th>
            <th>ID Band Removed</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.medicinesReturnedPharmacy}</td>
              <td>{row.dischargeMedicinesIndented}</td>
              <td>{row.roomInventoryChecked}</td>
              <td>{row.idBandRemoved}</td>
              <td>{row.status}</td>
              <td>
                <button className='discharge-nurseaction' onClick={() => openPopup(row)}>Action</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <NurseClearanceFormPopUp rowData={selectedRow} onClose={closePopup} />
      )}
    </div>
  );
};

export default NurseClearanceTable;
