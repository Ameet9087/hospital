import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './socMaster.css';
import useCustomAlert from '../../../alerts/useCustomAlert';


function SocMaster() {

  const { success, warning, error, CustomAlerts } = useCustomAlert();
  const today = new Date().toISOString().split("T")[0];

  const [socName, setSocName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);
  const [opRegFees, setOpRegFees] = useState("");
  const [status, setStatus] = useState("Active");

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const socData = {
      socName,
      remarks,
      dateFrom,
      dateTo,
      opRegFees: parseFloat(opRegFees),
      status,
    };

    try {
    
      const response = await axios.post('http://192.168.0.101:8086/api/socmasters', socData);
      success('SOC Master saved:');
      
      // Optionally, add success message or reset form
    } catch (error) {
      console.error('Error saving SOC Master:', error);
    }
  };

  return (
    <div className="soc-master">
      <CustomAlerts></CustomAlerts>
      {/* Header */}
      <div className="soc-master__header">
        <h3>SOC Master</h3>
      </div>

      <form onSubmit={handleSubmit} className="soc-master__form-container">
        <div className="soc-master__form-group">
          <label>SOC Name: *</label>
          <input
            type="text"
            value={socName}
            onChange={(e) => setSocName(e.target.value)}
            required
          />
        </div>
        <div className="soc-master__form-group">
          <label>Remarks: *</label>
          <input
            type="text"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            required
          />
        </div>
        <div className="soc-master__form-group">
          <label>From: *</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            required
          />
        </div>
        <div className="soc-master__form-group">
          <label>To: *</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            required
          />
        </div>
        <div className="soc-master__form-group">
          <label>OP Reg Fees: *</label>
          <input
            type="number"
            value={opRegFees}
            onChange={(e) => setOpRegFees(e.target.value)}
            required
          />
        </div>
        <div className="soc-master__form-group">
          <label>Status:</label>
          <div className="soc-master__radio-group">
            <label>
              <input
                type="radio"
                value="Active"
                checked={status === "Active"}
                onChange={handleStatusChange}
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                value="Inactive"
                checked={status === "Inactive"}
                onChange={handleStatusChange}
              />
              Inactive
            </label>
          </div>
        </div>
        <button type="submit" className="socMaster-submit-btn">Save SOC Master</button>
      </form>
    </div>
  );
}

export default SocMaster;
