import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import "./FinalBillCancellation.css";

const FinalBillCancellation = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    cancelNo: "",
    billNo: "",
    ipNo: "",
    patientName: "",
    sex: "",
    doa: "",
    doat: "",
    type: "",
    billDate: "",
    billTime: "",
    totalAmt: "",
    discAmt: "",
    netAmt: "",
    reasons: "",
    approvedBy: "",
    retentionAmt: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data before sending it
  const validateFormData = () => {
    const requiredFields = [
      "billNo", "ipNo", "patientName", "sex", "doa", "doat", "type", "totalAmt", "reasons", "approvedBy"
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`${field} is required.`);
        return false;
      }
    }
    return true;
  };

  // Handle save button click
  const handleSave = async () => {
    // Validate required fields
    if (!validateFormData()) return;

    // Sanitize the form data
    const sanitizedData = {
      ...formData,
      totalAmt: parseFloat(formData.totalAmt) || 0, // Ensure totalAmt is a number
      discAmt: parseFloat(formData.discAmt) || 0,
      netAmt: parseFloat(formData.netAmt) || 0,
      retentionAmt: parseFloat(formData.retentionAmt) || 0,
    };

    console.log("Data being sent:", sanitizedData); // Log the data for debugging

    try {
      const response = await axios.post("http://localhost:7678/api/bill-cancellations", sanitizedData);
      if (response.status === 201 || response.status === 200) {
        alert("Data saved successfully!");
      }
    } catch (error) {
      console.error("Error saving data:", error.response ? error.response.data : error);
      setShowPopup(true);
    }
  };

  // Handle delete button click
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:7678/api/bill-cancellations/1`); // Adjust ID dynamically if needed
      if (response.status === 200) {
        alert("Data deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="Final-Bill-Cancellation container">
      <div className="Final-Bill-Cancellation header">
        <h2>Final Bill Cancellation</h2>
      </div>

      <div className="Final-Bill-Cancellation form-container">
        <div className="Final-Bill-Cancellation left-column">
          <div className="Final-Bill-Cancellation field">
            <label>Cancel No:</label>
            <input type="text" name="cancelNo" value={formData.cancelNo} onChange={handleChange} />
          </div>
          <div className="Final-Bill-Cancellation field">
            <label>Bill No: *</label>
            <input type="text" name="billNo" value={formData.billNo} onChange={handleChange} />
            <button className="Final-Bill-Cancellation search-button">
              <FaSearch />
            </button>
          </div>
          <div className="Final-Bill-Cancellation field">
            <label>IP No: *</label>
            <input type="text" name="ipNo" value={formData.ipNo} onChange={handleChange} />
            <button className="Final-Bill-Cancellation search-button">
              <FaSearch />
            </button>
          </div>
          <div className="Final-Bill-Cancellation field">
            <label>Patient Name: *</label>
            <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} />
          </div>
          <div className="Final-Bill-Cancellation field">
            <label>Sex: *</label>
            <input type="text" name="sex" value={formData.sex} onChange={handleChange} />
          </div>
          <div className="Final-Bill-Cancellation field">
            <label>DOA: *</label>
            <input type="date" name="doa" value={formData.doa} onChange={handleChange} />
          </div>
          <div className="Final-Bill-Cancellation field">
            <label>DOAT: *</label>
            <input type="date" name="doat" value={formData.doat} onChange={handleChange} />
          </div>
        </div>

        <div className="Final-Bill-Cancellation right-column">
          <div className="Final-Bill-Cancellation field">
            <label>Type: *</label>
            <input type="text" name="type" value={formData.type} onChange={handleChange} />
          </div>
          <div className="Final-Bill-Cancellation field">
            <label>Bill Date:</label>
            <input type="date" name="billDate" value={formData.billDate} onChange={handleChange} />
          </div>
          <div className="Final-Bill-Cancellation field">
            <label>Bill Time:</label>
            <input type="time" name="billTime" value={formData.billTime} onChange={handleChange} />
          </div>
          <div className="Final-Bill-Cancellation field">
            <label>Total Amt: *</label>
            <input type="text" name="totalAmt" value={formData.totalAmt} onChange={handleChange} />
          </div>
          <div className="Final-Bill-Cancellation field">
            <label>DiscAmt:</label>
            <input type="text" name="discAmt" value={formData.discAmt} onChange={handleChange} />
          </div>
          <div className="Final-Bill-Cancellation field">
            <label>Net Amt:</label>
            <input type="text" name="netAmt" value={formData.netAmt} onChange={handleChange} />
          </div>
          <div className="Final-Bill-Cancellation field">
            <label>Reasons: *</label>
            <textarea
              className="Final-Bill-Cancellation"
              name="reasons"
              value={formData.reasons}
              onChange={handleChange}
            />
          </div>


          <div className="Final-Bill-Cancellation field">
  <label>Approved By: *</label>
  <input
    type="text"
    name="approvedBy"
    value={formData.approvedBy}
    onChange={(e) =>
      setFormData({
        ...formData,
        [e.target.name]: e.target.value.toUpperCase(),
      })
    }
  />
  <button className="Final-Bill-Cancellation search-button">
    <FaSearch />
  </button>
</div>
        </div>

        <div className="Final-Bill-Cancellation rightmost-column">
          <div className="Final-Bill-Cancellation field">
            <label>Retention Amount:</label>
            <input type="text" name="retentionAmt" value={formData.retentionAmt} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Save and Delete buttons */}
      <div className="savedeletebutton">
        <div className="Final-Bill-Cancellation save-button-container">
          <button className="Final-Bill-Cancellation save-button" onClick={handleSave}>
            Save
          </button>
        </div>

        <div className="Final-Bill-Cancellation save-button-container">
          <button className="Final-Bill-Cancellation delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {/* Popup Overlay */}
      {showPopup && <div className="Final-Bill-Cancellation popup-overlay"></div>}

      {/* Popup */}
      {showPopup && (
        <div className="Final-Bill-Cancellation popup">
          <div className="Final-Bill-Cancellation popup-content">
            <span
              className="Final-Bill-Cancellation popup-close"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </span>
            <p className="Final-Bill-Cancellation popup-message">
              You cannot cancel this bill since a receipt has already been generated after the bill.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalBillCancellation;
