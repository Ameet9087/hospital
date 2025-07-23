/* Dhanashree_StaffForm_26/09_Starts */

import React from 'react';
import './StaffForm.css';

const StaffForm = () => {
  const handleBroadcast = () => {
    alert('Broadcast to Doctor’s Staff Successful!');
  };

  return (
    <div className="StaffFormPage-staff-form">
      <h3>Staff under Doctor</h3>
      <select className="StaffFormPage-select">
        <option value="staff1">Staff 1</option>
        <option value="staff2">Staff 2</option>
        <option value="staff3">Staff 3</option>
      </select>
      <button className="StaffFormPage-button" onClick={handleBroadcast}>Broadcast to Staff</button>
    </div>
  );
};

export default StaffForm;

/* Dhanashree_StaffForm_26/09_Ends */
