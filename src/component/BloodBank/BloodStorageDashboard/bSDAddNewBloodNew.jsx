import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./bSDAddNewBloodNew.css";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingSelect } from "../../../FloatingInputs";
import { toast } from 'react-toastify';
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
        const response = await fetch(`${API_BASE_URL}/blood-testing/get-all-tests`);
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
        testId: parseInt(testId, 10),
      },
      storagedate: storagedate ? new Date(storagedate).toISOString() : null,
      bloodgroup,
      volume,
      expirydate: expirydate ? new Date(expirydate).toISOString() : null,
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
      toast.success('Proposal saved successfully!');

      refreshData();
      onClose(); // Close the modal (if applicable)

    } catch (error) {
      console.error("Error saving data:", error);
      toast.error('Failed to save proposal. Please try again.');

    }
  };

  return (
    <div className="BSDAddNewBloodNew-modal-modal-container">
      <h3>Add/Edit Blood Storage Entry</h3>

      <div className="BSDAddNewBloodNew-modal-form-group">
        <div className="BSDAddNewBloodNew-feild">
          <FloatingSelect
            label="Test ID"
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
            placeholder="Select Test ID"
            options={[
              { value: "", label: "Select Test ID" },
              ...(Array.isArray(testOptions)
                ? testOptions.map((test) => ({
                    value: test.testId,
                    label: test.testName || `Test ID: ${test.testId}`,
                  }))
                : []),
            ]}
          />
        </div>
        <div className="BSDAddNewBloodNew-feild">
          <FloatingInput
            label="Storage Date"
            type="date"
            id="storageDate"
            name="storageDate"
            value={storagedate ? storagedate.toISOString().split("T")[0] : ""}
            onChange={(e) => setstoragedate(new Date(e.target.value))}
            placeholder="Select Storage Date"
          />
        </div>
      </div>

      <div className="BSDAddNewBloodNew-modal-form-group">
        <div className="BSDAddNewBloodNew-feild">
          <FloatingSelect
            label="Blood Group"
            id="bloodgroup"
            name="bloodgroup"
            value={bloodgroup}
            onChange={(e) => setbloodgroup(e.target.value)}
            required
            options={[
              { value: "", label: "Select Blood Group" },
              { value: "A+", label: "A+" },
              { value: "B-", label: "B-" },
              { value: "AB+", label: "AB+" },
              { value: "O+", label: "O+" },
              { value: "O-", label: "O-" },
            ]}
          />
        </div>
        <div className="BSDAddNewBloodNew-feild">
          <FloatingInput
            label="Volume (ml)"
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
          <FloatingInput
            label="Expiry Date"
            type="date"
            id="expirydate"
            name="expirydate"
            value={expirydate ? expirydate.toISOString().split("T")[0] : ""}
            onChange={(e) => setexpirydate(new Date(e.target.value))}
            placeholder="Select Expiry Date"
          />
        </div>
        <div className="BSDAddNewBloodNew-feild">
          <FloatingInput
            label="Storage Location"
            type="text"
            value={storagelocation}
            onChange={(e) => setstoragelocation(e.target.value)}
            placeholder="Enter Storage Location"
          />
        </div>
      </div>

      <div className="BSDAddNewBloodNew-status">
        <FloatingSelect
          label="Status"
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          options={[
            { value: "", label: "Select a state" },
            { value: "Stored", label: "Stored" },
            { value: "Discarded", label: "Discarded" },
          ]}
        />
      </div>

      <div className="BSDAddNewBloodNew-modal-modal-actions">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default BSDAddNewBloodNew;
