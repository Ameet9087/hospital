import React, { useState, useEffect } from "react";
import "./addResultFrom.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Lab1 = () => {
  const [components, setComponents] = useState([]); // Store all components
  const [error, setError] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]); // Track selected tests
  const location = useLocation();
  const { test } = location.state || {};

  // Set components based on test.labTests
  useEffect(() => {
    if (test?.labTests) {
      const initialComponents = test.labTests.flatMap((item) =>
        item.labComponentDTOS // Ensure testComponents exists
          ? item.labComponentDTOS.map((component) => ({
              labTestId: item.labTestSettingId,
              labTestName: item.labTestName,
              componentId: component.labComponentId,
              componentName: component.componentName,
              value: "",
              unit: component.unit,
              range: component.componentRange,
              completed: false, // Set initial completion state
            }))
          : []
      );
      setComponents(initialComponents);
      setSelectedTests(new Array(test.labTests.length).fill(false)); // Initialize selected tests
    }

  }, [test]);

  // Handle changes in component inputs
  const handleInputChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const newComponents = [...components];
    newComponents[index][name] = type === "checkbox" ? checked : value;
    setComponents(newComponents);
  };

  // Handle test selection
  const handleTestSelectChange = (index) => {
    const newSelectedTests = [...selectedTests];
    newSelectedTests[index] = !newSelectedTests[index]; // Toggle selected state
    setSelectedTests(newSelectedTests);
  };

  // Handle component addition
  const handleAddComponent = (labTestId) => {
    const newComponent = {
      labTestId: labTestId,
      labTestName: "", // Update as necessary
      componentId: 0,
      componentName: "",
      value: "",
      unit: "",
      range: "",
      completed: false,
    };
    setComponents((prevComponents) => [...prevComponents, newComponent]);
  };

  const navigate = useNavigate();

  const handleBackToGrid = () => {
    navigate("/add-results"); // Replace with actual path
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.put(
      `http://localhost:1415/api/lab-requests/update-status/${test.labRequestId}`
    );

    const labResultData = {
      labRequestDTO: {
        labRequestId: test.labRequestId,
      },
      labResultCreatedDate: new Date().toISOString().split("T")[0],
      labResultCreatedTime: new Date()
        .toISOString()
        .split("T")[1]
        .split(".")[0],
      isPrinted: "No",
      componentsJson: "",
      isVerified: "No",
      verifyBy: null,
      verifyById: null,
    };
    labResultData.componentsJson = JSON.stringify(components); // Convert to JSON only after filtering

    try {
      const response = await axios.post(
        "http://localhost:1415/api/lab-result/save",
        labResultData
      );
      console.log("Lab result saved:", response.data);
      navigate("/labResult", {
        state: { labRequestId: test.labRequestId },
      }); // Navigate to the results page after saving
    } catch (error) {
      console.error("Error saving lab result:", error);
      setError("Failed to save lab result. Please try again.");
    }
  };

  return (
    <div className="lab-addResult-page1">
      <button className="lab-addResult-back-button" onClick={handleBackToGrid}>
        ← Back To Grid
      </button>
      <div className="lab-addResult-header">
        <div className="lab-addResult-container">
          <div className="lab-addResult-ward">Ward: Outpatient</div>
          <div className="lab-addResult-prescribed-by">
            Prescribed By:{" "}
            {test?.prescriber
              ? `${test.prescriber.salutation} ${test.prescriber.firstName} ${test.prescriber.lastName}`
              : "SELF"}
          </div>
          <div className="lab-addResult-left">
            <button
              className="lab-addResult-save-button"
              onClick={handleSubmit}
            >
              Save Result 💾
            </button>
          </div>
        </div>
      </div>
      {error && <div className="lab-addResult-error">{error}</div>}
      <div className="lab-addResult-content">
        <div className="lab-addResult-bio">{test?.labTestCategory}</div>
        <div className="lab-addResult-row1">
          <div className="lab-addResult-component">Component</div>
          <div className="lab-addResult-value">Value</div>
          <div className="lab-addResult-unit">Unit</div>
          <div className="lab-addResult-range">Range</div>
          <div className="lab-addResult-completed">Completed</div>
        </div>
        {test?.labTests &&
          test?.labTests.map((item, index) => (
            <React.Fragment key={index}>
              <div className="lab-addResult-row2">
                <div className="lab-addResult-testing">
                  <input
                    type="checkbox"
                    checked={selectedTests[index]}
                    onChange={() => handleTestSelectChange(index)}
                  />
                  {index + 1}. {item.labTestName}
                </div>
                <div className="lab-addResult-requested">
                  Requested On: {test.requisitionDate}
                </div>
                <div className="lab-addResult-collected">
                  Sample Collected By: admin admin
                </div>
              </div>

              <div className="lab-addResult-form">
                {/* Render components related to the specific lab test */}
                {components
                  .filter(
                    (component) => component.labTestId === item.labTestSettingId
                  )
                  .map((component, idx) => (
                    <section className="lab-addResult-row" key={idx}>
                      <div className="lab-addResult-row1">
                        <input
                          type="text"
                          name="componentName"
                          placeholder="Component Name"
                          value={component.componentName}
                          onChange={(event) => handleInputChange(idx, event)}
                          required
                        />
                        <input
                          type="text"
                          name="value"
                          placeholder="Enter Value"
                          value={component.value}
                          onChange={(event) => handleInputChange(idx, event)}
                        />
                        <input
                          type="text"
                          name="unit"
                          placeholder="Unit"
                          value={component.unit}
                          onChange={(event) => handleInputChange(idx, event)}
                        />
                        <input
                          type="text"
                          name="range"
                          placeholder="Range"
                          value={component.range}
                          onChange={(event) => handleInputChange(idx, event)}
                        />
                        <input
                          type="checkbox"
                          name="completed"
                          value={true}
                          checked={component.completed}
                          onChange={(event) => handleInputChange(idx, event)}
                        />
                      </div>
                    </section>
                  ))}

                {/* Add Row button for the specific lab test */}
                <button
                  type="button"
                  className="lab-addResult-add-btn"
                  onClick={() => handleAddComponent(item.labTestSettingId)}
                >
                  Add Row ➕
                </button>
              </div>
            </React.Fragment>
          ))}

        <div className="lab-addResult-form-actions">
          <button
            type="button"
            className="lab-addResult-save-btn"
            onClick={handleSubmit}
          >
            Save Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lab1;
