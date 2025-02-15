import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SampleTableEdit.css";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingSelect } from "../../../FloatingInputs";
import { toast } from 'react-toastify';
const SampleTestCard = ({ testData, onClose }) => {
  const [testId, setTestId] = useState("");
  const [testType, setTestType] = useState("");
  const [result, setResult] = useState("");
  const [remark, setRemark] = useState("");
  const [testedBy, setTestedBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('====================================');
  console.log(testData);
  console.log('====================================');

  useEffect(() => {
    if (testData) {
      console.log("Received testData:", testData);
      setTestId(testData.testId || testData.id);
      setTestType(testData.testType);
      setResult(testData.result);
      setRemark(testData.remarks);
      setTestedBy(testData.testedBy);
    }
  }, [testData]);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);

    if (!testId) {
      setError("Test ID is missing. Cannot update.");
      setLoading(false);
      return;
    }

    const updatedData = {
      test_type: testType,
      result: result,
      remarks: remark,
      tested_by: testedBy,
    };

    console.log("Updating test with ID:", testId);
    console.log(updatedData);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/blood-testing/update-test/${testId}`,
        updatedData
      );
      console.log("API Response:", response);

      if (response.status === 200) {
        console.log("Updated successfully:", updatedData);
        toast.success('Updated successfully!');

        onClose();
      } else {
        throw new Error(`Update failed with status ${response.status}`);
        toast.error('Failed to Updated. Please try again.');

      }
    } catch (err) {
      setError("Failed to update the test. Please try again.");
      console.error("Error updating data:", err);
      toast.error('Failed to Updated. Please try again.');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SampleTestCard-card">
      <div className="SampleTestCard-card-header">
        <h2>Test Information</h2>
      </div>
      <div className="SampleTestCard-card-body">
        <div className="SampleTestCard-info">
          <div className="SampleTestCard-field">
            <FloatingInput
              label={"Test Type"}
              type="text"
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
            />

           
          </div>
          <div className="SampleTestCard-field">
          <FloatingInput
              label={"Result"}
              type="text"
              value={result}
                onChange={(e) => setResult(e.target.value)}
            />
           
          </div>
        </div>
        <div className="SampleTestCard-info">
          <div className="SampleTestCard-field">
          <FloatingInput
              label={"Remark"}
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          
          </div>
          <div className="SampleTestCard-field">
          <FloatingInput
              label={"Tested By"}
              type="text"
              value={testedBy}
              onChange={(e) => setTestedBy(e.target.value)}
            />
          
          </div>
        </div>
      </div>
      <div className="SampleTestCard-footer">
        {loading ? (
          <button className="SampleTestCard-update-button" disabled>
            Updating...
          </button>
        ) : (
          <button
            className="SampleTestCard-update-button"
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
      </div>
      {error && <div className="SampleTestCard-error-message">{error}</div>}
    </div>
  );
};

export default SampleTestCard;
