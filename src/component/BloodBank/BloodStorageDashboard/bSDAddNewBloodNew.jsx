import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./bSDAddNewBloodNew.css";
import { API_BASE_URL } from "../../api/api";

const BSDAddNewBloodNew = ({ onClose, refreshData }) => {
  const [testId, setTestId] = useState("");
  const [storagedate, setstoragedate] = useState(null);
  const [bloodgroup, setbloodgroup] = useState("");
  const [volume, setvolume] = useState("");
  const [expirydate, setexpirydate] = useState(null);
  const [storagelocation, setstoragelocation] = useState("");
  const [status, setStatus] = useState("");
  const [testOptions, setTestOptions] = useState([]);

  useEffect(() => {
    const fetchTestOptions = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/blood-testing/get-all-tests`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch test IDs");
        }
        const data = await response.json();
        setTestOptions(data);
      } catch (error) {
        console.error("Error fetching test IDs:", error);
      }
    };

    fetchTestOptions();
  }, []);

  const handleSave = async () => {
    const data = {
      bloodTestingDTO: {
        testId: parseInt(testId, 10), // Convert to integer
      },
      storagedate: storagedate ? storagedate.toISOString() : null,
      bloodgroup,
      volume,
      expirydate: expirydate ? expirydate.toISOString() : null,
      storagelocation,
      status,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/bloodstorage/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const result = await response.json();
      console.log("Data saved successfully:", result);
      refreshData(); // Call refreshData to update the main component
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data: " + error.message);
    }
  };

  return (
    <div className="BSDAddNewBloodNew-modal-modal-container">
      <h3>Add/Edit Blood Storage Entry</h3>

      <div className="BSDAddNewBloodNew-modal-form-group">
        <div className="BSDAddNewBloodNew-feild">
          <label>Test ID:</label>
          <select
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
            placeholder="Select Test ID"
          >
            <option value="">Select Test ID</option>
            {testOptions.map((test) => (
              <option key={test.testId} value={test.testId}>
                {test.testName || `Test ID: ${test.testId}`}
              </option>
            ))}
          </select>
        </div>
        <div className="BSDAddNewBloodNew-feild">
          <label>Storage Date:</label>
          <DatePicker
            selected={storagedate}
            onChange={(date) => setstoragedate(date)}
            placeholderText="Select Storage Date"
          />
        </div>
      </div>

      <div className="BSDAddNewBloodNew-modal-form-group">
        <div className="BSDAddNewBloodNew-feild">
          <label>Blood Group:</label>
          <select
            value={bloodgroup}
            onChange={(e) => setbloodgroup(e.target.value)}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div className="BSDAddNewBloodNew-feild">
          <label>Volume (ml):</label>
          <input
            type="number"
            value={volume}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value) && value >= 0) {
                setvolume(value);
              } else if (e.target.value === "") {
                setvolume("");
              }
            }}
            placeholder="Enter volume in ml"
            min="0" 
          />
        </div>
      </div>

      <div className="BSDAddNewBloodNew-modal-form-group">
        <div className="BSDAddNewBloodNew-feild">
          <label>Expiry Date:</label>
          <DatePicker
            selected={expirydate}
            onChange={(date) => setexpirydate(date)}
            placeholderText="Select Expiry Date"
          />
        </div>
        <div className="BSDAddNewBloodNew-feild">
          <label>Storage Location:</label>
          <input
            type="text"
            value={storagelocation}
            onChange={(e) => setstoragelocation(e.target.value)}
            placeholder="Enter Storage Location"
          />
        </div>
      </div>

      <div className="BSDAddNewBloodNew-status">
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Stored">Stored</option>
          <option value="Discarded">Discarded</option>
        </select>
      </div>

      <div className="BSDAddNewBloodNew-modal-modal-actions">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default BSDAddNewBloodNew;
