import React, { useState, useEffect } from "react";
import "./addResultFrom.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import LabPopupTable from "./LabPopupTable";
import { toast } from "react-toastify";
import { FloatingInput } from "../../FloatingInputs";

const Lab1 = () => {
  const [components, setComponents] = useState([]);
  const [displayedComponents, setDisplayedComponents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const location = useLocation();
  const [allComponents, setAllComponents] = useState([]);
  const { test } = location.state || {};
  const [activePopup, setActivePopup] = useState(false);

  const fetchAllComponents = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/lab-components/getAllComponents`
    );
    setAllComponents(response.data);
  };

  useEffect(() => {
    fetchAllComponents();
  }, []);

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
              completed: false,
            }))
          : []
      );
      setComponents(initialComponents);
      setSelectedTests(new Array(test.labTests.length).fill(false)); // Initialize selected tests
    }
  }, [test]);

  const handleInputChange = (labTestId, index, event) => {
    const { name, value } = event.target;
    setDisplayedComponents((prev) => {
      const updatedComponents = { ...prev };
      updatedComponents[labTestId] = updatedComponents[labTestId].map(
        (component, idx) =>
          idx === index ? { ...component, [name]: value } : component
      );
      return updatedComponents;
    });
  };

  const handleTestSelectChange = async (index) => {
    const newSelectedTests = [...selectedTests];
    newSelectedTests[index] = !newSelectedTests[index];
    setSelectedTests(newSelectedTests);

    if (newSelectedTests[index]) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/labTestSetting/${test.labTests[index].labTestSettingId}`
        );
        console.log(response.data);

        // Parse lab components from the response
        const fetchedComponents = response.data.labComponents.map(
          (component) => ({
            labTestId: response.data.labTestId,
            componentId: component.componentId,
            componentName: component.componentName,
            value: "",
            unit: component.unit,
            range: component.componentRange,
            completed: false,
          })
        );

        // Update displayedComponents for this specific test
        setDisplayedComponents((prev) => ({
          ...prev,
          [response.data.labTestId]: fetchedComponents,
        }));
      } catch (error) {
        toast.error("Error fetching components:", error);
      }
    } else {
      // Remove components if the test is deselected
      const labTestId = test.labTests[index].labTestSettingId;
      setDisplayedComponents((prev) => {
        const updated = { ...prev };
        delete updated[labTestId];
        return updated;
      });
    }
  };

  const handleAddComponent = (labTestId) => {
    const hasEmptyRow = displayedComponents[labTestId]?.some(
      (component) => !component.componentName
    );

    if (hasEmptyRow) {
      toast.error("Please fill the existing empty row before adding another.");
      return;
    }

    const newComponent = {
      labTestId: labTestId,
      labTestName: "",
      componentId: 0, // Default value for a new component
      componentName: "",
      value: "",
      unit: "",
      range: "",
      completed: false,
    };

    setDisplayedComponents((prev) => ({
      ...prev,
      [labTestId]: [...(prev[labTestId] || []), newComponent],
    }));
  };

  const handleRemoveComponent = (labTestId, index) => {
    setDisplayedComponents((prev) => {
      const updatedComponents = prev[labTestId].filter(
        (_, idx) => idx !== index
      );

      if (updatedComponents.length === 0) {
        toast.error(
          "At least one component must be present for each selected test."
        );
        return prev;
      }

      return {
        ...prev,
        [labTestId]: updatedComponents,
      };
    });
  };

  const navigate = useNavigate();

  const handleBackToGrid = () => {
    navigate("/laboratory/addresults");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all selected tests have at least one component
    const hasEmptyTests = test.labTests.some((labTest, index) => {
      const labTestId = labTest.labTestSettingId;
      return (
        selectedTests[index] &&
        (!displayedComponents[labTestId] ||
          displayedComponents[labTestId].length === 0)
      );
    });

    if (hasEmptyTests) {
      toast.error(
        "Please add components for all selected tests before submitting."
      );
      return;
    }

    const testComponentMappings = test.labTests.map((labTest) => {
      const labTestComponents =
        displayedComponents[labTest.labTestSettingId] || [];
      return {
        labTest: {
          labTestId: labTest.labTestSettingId,
        },
        labResultComponentResults: labTestComponents.map((component) => ({
          labComponent: {
            componentId: component.componentId,
          },
          resultValue: component.value || "",
        })),
      };
    });

    const labResultData = {
      testComponentMappings,
      approvalStatus: "Active",
    };

    console.log(labResultData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/lab-result/${test.labRequestId}`,
        labResultData
      );
      toast.success("Saving Lab Result Successfully");
      navigate("/laboratory/addresults", {
        state: { labRequestId: test.labRequestId },
      });
    } catch (error) {
      toast.error("Error saving lab result:", error);
      setError("Failed to save lab result. Please try again.");
    }
  };

  const getPopupData = () => {
    if (activePopup) {
      return {
        columns: ["componentId", "componentName", "unit"],
        data: allComponents,
      };
    } else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();

  const handleSelect = (selectedComponent) => {
    if (activePopup) {
      // Find the labTestId with an empty row to edit
      const labTestId = Object.keys(displayedComponents).find((key) =>
        displayedComponents[key].some(
          (component) => component.componentName === "" // Target rows with no component selected
        )
      );

      if (labTestId) {
        setDisplayedComponents((prev) => ({
          ...prev,
          [labTestId]: prev[labTestId].map((component) =>
            component.componentName === ""
              ? {
                  ...component,
                  componentId: selectedComponent.componentId,
                  componentName: selectedComponent.componentName,
                  unit: selectedComponent.unit,
                  range: selectedComponent.range,
                }
              : component
          ),
        }));
        setActivePopup(false); // Close the popup after selection
      }
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
              ? `${test?.prescriber?.salutation} ${test?.prescriber?.doctorName} ${test?.prescriber?.lastName}`
              : "SELF"}
          </div>
        </div>
      </div>
      {error && <div className="lab-addResult-error">{error}</div>}
      <div className="lab-addResult-content">
        <div className="lab-addResult-bio">{test?.labTestCategory}</div>
        <div className="lab-addResult-row">
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
                  <FloatingInput
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

              {/* Render components for the selected lab test */}
              {selectedTests[index] &&
                displayedComponents[item.labTestSettingId] && (
                  <div className="lab-addResult-form">
                    {displayedComponents[item.labTestSettingId].map(
                      (component, idx) => (
                        <div className="lab-addResult-row" key={idx}>
                          
                            <FloatingInput
                              type="search"
                              name="componentName"
                              label={"Component Name"}
                              value={component.componentName}
                              onIconClick={
                                !component.componentName
                                  ? () => setActivePopup(true)
                                  : undefined
                              }
                            />
                          <FloatingInput
                          type="text"
                          name="value"
                          label={"Enter Value"}
                          value={component.value}
                          onChange={(event) =>
                            handleInputChange(
                              item.labTestSettingId,
                              idx,
                              event
                            )
                          }
                          />
                         <FloatingInput
                         type="text"
                         name="unit"
                         label={"Unit"}
                         value={component.unit}
                         readOnly
                         />
                         <FloatingInput
                         type="text"
                         name="range"
                         label={"Range"}
                         value={component.range}
                         readOnly
                         />
                          <button
                            type="button"
                            className="lab-addResult-remove-btn"
                            onClick={() =>
                              handleRemoveComponent(item.labTestSettingId, idx)
                            }
                          >
                            &#10005;{" "}
                          </button>
                        </div>
                      )
                    )}

                    {/* Add Row button for the specific lab test */}
                    <button
                      type="button"
                      className="lab-addResult-add-btn"
                      onClick={() => handleAddComponent(item.labTestSettingId)}
                    >
                      Add Row ➕
                    </button>
                  </div>
                )}
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
      {activePopup && (
        <LabPopupTable
          columns={columns}
          data={data}
          onClose={() => setActivePopup(false)}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

export default Lab1;
