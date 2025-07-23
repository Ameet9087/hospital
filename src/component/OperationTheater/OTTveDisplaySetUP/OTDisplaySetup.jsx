import React, { useState } from 'react';
import './OTDisplaySetup.css';

const OTDisplaySetup = () => {
  const [tatValues, setTatValues] = useState({
    managerTAT: '',
    adminTAT: '',
    ceoTAT: '',
  });

  const handleInputChange = (e, section) => {
    setTatValues({
      ...tatValues,
      [section]: e.target.value, // Update with the value directly without setting it to 0
    });
  };

  return (
    <div className="ot_display_setup-container">
      <h3 className="ot_display_setup-header ">OT Nurse Notes</h3>


<div className="ot_display_setup ">
      {/* Operation Register Not Entered Section */}
      
      <div className="ot_section">
        <h3 className="ot_section_title">Operation Register Not Entered</h3>
        <div className="ot_tat_row">
          <label className="ot_tat_label">Manager TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.managerTAT}
            onChange={(e) => handleInputChange(e, 'managerTAT')}
            className="ot_tat_input"
          />
        </div>
        <div className="ot_tat_row">
          <label className="ot_tat_label">Administrator TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.adminTAT}
            onChange={(e) => handleInputChange(e, 'adminTAT')}
            className="ot_tat_input"
          />
        </div>
        <div className="ot_tat_row">
          <label className="ot_tat_label">CEO TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.ceoTAT}
            onChange={(e) => handleInputChange(e, 'ceoTAT')}
            className="ot_tat_input"
          />
        </div>
      </div>

      {/* Surgery Event Done Without OT Schedule Section */}
      <div className="ot_section">
        <h3 className="ot_section_title">Surgery Event Done Without OT Schedule</h3>
        <div className="ot_tat_row">
          <label className="ot_tat_label">Manager TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.managerTAT}
            onChange={(e) => handleInputChange(e, 'managerTAT')}
            className="ot_tat_input"
          />
        </div>
        <div className="ot_tat_row">
          <label className="ot_tat_label">Administrator TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.adminTAT}
            onChange={(e) => handleInputChange(e, 'adminTAT')}
            className="ot_tat_input"
          />
        </div>
        <div className="ot_tat_row">
          <label className="ot_tat_label">CEO TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.ceoTAT}
            onChange={(e) => handleInputChange(e, 'ceoTAT')}
            className="ot_tat_input"
          />
        </div>
      </div>

      {/* OT Notes Not Entered Section */}
      <div className="ot_section">
        <h3 className="ot_section_title">OT Notes Not Entered</h3>
        <div className="ot_tat_row">
          <label className="ot_tat_label">Manager TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.managerTAT}
            onChange={(e) => handleInputChange(e, 'managerTAT')}
            className="ot_tat_input"
          />
        </div>
        <div className="ot_tat_row">
          <label className="ot_tat_label">Administrator TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.adminTAT}
            onChange={(e) => handleInputChange(e, 'adminTAT')}
            className="ot_tat_input"
          />
        </div>
        <div className="ot_tat_row">
          <label className="ot_tat_label">CEO TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.ceoTAT}
            onChange={(e) => handleInputChange(e, 'ceoTAT')}
            className="ot_tat_input"
          />
        </div>
      </div>

      {/* OT Billing Entry Not Done Section */}
      <div className="ot_section">
        <h3 className="ot_section_title">OT Billing Entry Not Done</h3>
        <div className="ot_tat_row">
          <label className="ot_tat_label">Manager TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.managerTAT}
            onChange={(e) => handleInputChange(e, 'managerTAT')}
            className="ot_tat_input"
          />
        </div>
        <div className="ot_tat_row">
          <label className="ot_tat_label">Administrator TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.adminTAT}
            onChange={(e) => handleInputChange(e, 'adminTAT')}
            className="ot_tat_input"
          />
        </div>
        <div className="ot_tat_row">
          <label className="ot_tat_label">CEO TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.ceoTAT}
            onChange={(e) => handleInputChange(e, 'ceoTAT')}
            className="ot_tat_input"
          />
        </div>
      </div>

      {/* Surgeries Completed Section */}
      <div className="ot_section">
        <h3 className="ot_section_title">Surgeries Completed</h3>
        <div className="ot_tat_row">
          <label className="ot_tat_label">Manager TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.managerTAT}
            onChange={(e) => handleInputChange(e, 'managerTAT')}
            className="ot_tat_input"
          />
        </div>
        <div className="ot_tat_row">
          <label className="ot_tat_label">Administrator TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.adminTAT}
            onChange={(e) => handleInputChange(e, 'adminTAT')}
            className="ot_tat_input"
          />
        </div>
        <div className="ot_tat_row">
          <label className="ot_tat_label">CEO TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.ceoTAT}
            onChange={(e) => handleInputChange(e, 'ceoTAT')}
            className="ot_tat_input"
          />
        </div>
      </div>

      {/* Indent Raised From OT/Labour Room Section */}
      <div className="ot_section">
        <h3 className="ot_section_title">Indent Raised From OT/Labour Room</h3>
        <div className="ot_tat_row">
          <label className="ot_tat_label">Manager TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.managerTAT}
            onChange={(e) => handleInputChange(e, 'managerTAT')}
            className="ot_tat_input"
          />
        </div>
        <div className="ot_tat_row">
          <label className="ot_tat_label">Administrator TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.adminTAT}
            onChange={(e) => handleInputChange(e, 'adminTAT')}
            className="ot_tat_input"
          />
        </div>
        <div className="ot_tat_row">
          <label className="ot_tat_label">CEO TAT in MIN:</label>
          <input
            type="number"
            value={tatValues.ceoTAT}
            onChange={(e) => handleInputChange(e, 'ceoTAT')}
            className="ot_tat_input"
          />
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default OTDisplaySetup;
