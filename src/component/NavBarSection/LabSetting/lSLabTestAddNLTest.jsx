import React, { useEffect, useState } from "react";
// import './AddLabTest.css';
import "../LabSetting/lSLabTestAddNLTest.css";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../api/api";
import RadiologyPopupTable from "../../Employee/Radiology/RadiologyPopupTable";
import axios from "axios";
const LSLabTestAddNLTest = ({ onClose, intialData, isDataUpdate }) => {
  const [labCategories, setLabCategories] = useState([]);
  const [labComponents, setLabComponents] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [activePopup, setActivePopup] = useState("");
  const [selectedServiceDetails, setSelectedServiceDetails] = useState();
  const [labTestData, setLabTestData] = useState({
    labTestName: "",
    labTestCode: "",
    reportingName: "",
    serviceDepartment: "",
    selectedSpecimen: "",
    runNoType: "normal",
    displaySequence: 0,
    isSmsApplicable: false,
    isLisApplicable: false,
    isValidForReporting: false,
    isOutsourcedTest: false,
    taxApplicable: false,
    hasNegativeResults: false,
    interpretation: "",
    components: [],
  });
  useEffect(() => {
    fetchServiceDetails();
  }, []);

  useEffect(() => {
    console.log(intialData);

    if (isDataUpdate && intialData) {
      setLabTestData({
        labTestName: intialData.labTestName || "",
        labTestCode: intialData.labTestCode || "",
        reportingName: intialData.reportingName || "",
        serviceDepartment: intialData.serviceDepartment || "",
        selectedSpecimen: intialData.selectedSpecimen || "",
        runNoType: intialData.runNoType || "normal",
        displaySequence: intialData.displaySequence || 0,
        isSmsApplicable: intialData.isSmsApplicable || false,
        isLisApplicable: intialData.isLisApplicable || false,
        isValidForReporting: intialData.isValidForReporting || false,
        isOutsourcedTest: intialData.isOutsourcedTest || false,
        taxApplicable: intialData.taxApplicable || false,
        hasNegativeResults: intialData.hasNegativeResults || false,
        interpretation: intialData.interpretation || "",
        components: intialData.labComponents || [],
      });
    }
  }, [isDataUpdate, intialData]);

  useEffect(() => {
    const fetchLabCategories = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/lab-test-categories/getAll-testCategory`
        );
        if (response.ok) {
          const data = await response.json();
          setLabCategories(data);
        } else {
          console.error("Failed to fetch lab categories:", response.statusText);
          alert("Error fetching lab categories");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchLabComponents = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/lab-components/getAllComponents`
        );
        if (response.ok) {
          const data = await response.json();
          setLabComponents(data);
        } else {
          console.error("Failed to fetch lab components:", response.statusText);
          alert("Error occurred while fetching lab components.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLabComponents();
    fetchLabCategories();
  }, []); // Run once on component mount

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLabTestData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const fetchServiceDetails = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/service-details/service?typeName=Lab`
    );
    setServiceDetails(response.data);
  };
  const getPopupData = () => {
    if (activePopup === "labTestName") {
      return {
        columns: ["serviceDetailsId", "serviceName", "serviceTypeName"],
        data: serviceDetails,
      };
    } else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();

  const handleSelect = (data) => {
    if (activePopup === "labTestName") {
      setLabTestData((prevData) => ({
        ...prevData,
        labTestName: data.serviceName, // Update the labTestName property with the selected data
      }));
      setSelectedServiceDetails(data); // Assuming this sets some additional selected service details
    }
  };

  const handleComponentChange = (index, e) => {
    const { value } = e.target;
    const selectedComponent = labComponents.find(
      (comp) => comp.componentName === value
    );
    // Update the specific component data based on the selected component
    setLabTestData((prevData) => {
      const newComponents = [...prevData.components];
      newComponents[index] = {
        id: selectedComponent ? selectedComponent.componentId : null, // Store only the ID
        componentName: value,
        unit: selectedComponent ? selectedComponent.unit : "",
        valueType: selectedComponent ? selectedComponent.valueType : "",
        range: selectedComponent ? selectedComponent.componentRange : "",
        displaySequence: selectedComponent ? selectedComponent.displayName : "",
      };
      return { ...prevData, components: newComponents };
    });
  };

  const addNewComponent = () => {
    setLabTestData((prevData) => ({
      ...prevData,
      components: [
        ...prevData.components,
        {
          id: null, // Initialize ID as null for new components
          componentName: "",
          unit: "",
          valueType: "",
          range: "",
          displaySequence: "",
        },
      ],
    }));
  };

  const saveLabTestData = async () => {
    const dataToSend = {
      labTestCode: labTestData.labTestCode,
      labTestName: labTestData.labTestName,
      labTestSpecimen: labTestData.selectedSpecimen,
      hasNegativeResults: labTestData.hasNegativeResults ? "Yes" : "No",
      negativeResultText: labTestData.hasNegativeResults
        ? labTestData.interpretation
        : "",
      isValidForReporting: labTestData.isValidForReporting ? "Yes" : "No",
      displaySequence: labTestData.displaySequence,
      reportingName: labTestData.reportingName,
      interpretation: labTestData.interpretation,
      runNumberType: labTestData.runNoType,
      labTestCategoryId: labCategories?.id || null,
      isOutsourceTest: labTestData.isOutsourcedTest ? "Yes" : "No",
      smsApplicable: labTestData.isSmsApplicable ? "Yes" : "No",
      isLISApplicable: labTestData.isLisApplicable ? "Yes" : "No",
      labComponentIds: labTestData.components
        .map((comp) => comp.id)
        .filter(Boolean), // Only get IDs that are defined
    };

    console.log(dataToSend);

    try {
      const response = await fetch(`${API_BASE_URL}/labTestSetting/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Lab test data saved successfully:", result);
        onClose(); // Close the form after saving
      } else {
        console.error("Failed to save lab test data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateLabTest = async (id) => {
    const dataToSend = {
      labTestCode: labTestData.labTestCode,
      labTestName: labTestData.labTestName,
      labTestSpecimen: labTestData.selectedSpecimen,
      hasNegativeResults: labTestData.hasNegativeResults ? "Yes" : "No",
      negativeResultText: labTestData.hasNegativeResults
        ? labTestData.interpretation
        : "",
      isValidForReporting: labTestData.isValidForReporting ? "Yes" : "No",
      displaySequence: labTestData.displaySequence,
      reportingName: labTestData.reportingName,
      interpretation: labTestData.interpretation,
      runNumberType: labTestData.runNoType,
      labTestCategoryId: labCategories?.id || null,
      isOutsourceTest: labTestData.isOutsourcedTest ? "Yes" : "No",
      smsApplicable: labTestData.isSmsApplicable ? "Yes" : "No",
      isLISApplicable: labTestData.isLisApplicable ? "Yes" : "No",
      labComponentIds: labTestData.components
        .map((comp) => comp.id)
        .filter(Boolean), // Only get IDs that are defined
    };

    try {
      const response = await axios.put(
        `${API_BASE_URL}/labTestSetting/update/${id}`,
        dataToSend
      );
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lSLabTestAddNLTest-container">
      <div className="lSLabTestAddNLTest-header">
        <h4>Add Lab Test</h4>
        <button className="lSLabTestAddNLTest-close-btn" onClick={onClose}>
          X
        </button>
      </div>

      <div className="lSLabTestAddNLTest-form">
        <div className="lSLabTestAddNLTest-form-row">
          <div className="lSLabTestAddNLTest-form-group-1row">
            <div className="lSLabTestAddNLTest-form-group">
              <label>
                Lab Test Name<span>*</span>
              </label>
              <input
                type="text"
                name="labTestName"
                placeholder="Lab Test Name"
                value={labTestData.labTestName}
                onChange={handleInputChange}
              />
              <i
                onClick={() => setActivePopup("labTestName")}
                className="fa-solid fa-magnifying-glass"
              ></i>
            </div>
            <div className="lSLabTestAddNLTest-form-group">
              <label>
                Lab Test Code<span>*</span>
              </label>
              <input
                type="text"
                name="labTestCode"
                placeholder="Lab Test Code"
                value={labTestData.labTestCode}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="lSLabTestAddNLTest-form-group-1row">
            <div className="lSLabTestAddNLTest-form-group">
              <label>Reporting Name</label>
              <input
                type="text"
                name="reportingName"
                placeholder="Lab Test Reporting Name"
                value={labTestData.reportingName}
                onChange={handleInputChange}
              />
            </div>
            <div className="lSLabTestAddNLTest-form-group">
              <label>
                Report Template Name<span>*</span>
              </label>
              <input
                type="text"
                name="reportTemplateName"
                placeholder="Select Report Template Short Name"
                // value={labTestData.reportTemplateName}
                // onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="lSLabTestAddNLTest-form-group-1row">
            <div className="lSLabTestAddNLTest-form-group">
              <label>
                Lab Category<span>*</span>
              </label>
              <select
                name="labCategory"
                value={labTestData.labCategory}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Lab Category</option>
                {labCategories.map((category) => (
                  <option
                    key={category.labTestCategoryId}
                    value={category.labTestCategoryId}
                  >
                    {category.labTestCategoryName}
                  </option> // Adjust based on your API response structure
                ))}
              </select>
            </div>
            <div className="lSLabTestAddNLTest-form-group">
              <label>
                Service Department<span>*</span>
              </label>
              <input
                type="text"
                name="serviceDepartment"
                placeholder="Select Service Department Name"
                value={labTestData.serviceDepartment}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="lSLabTestAddNLTest-form-group-1row">
            <div className="lSLabTestAddNLTest-form-group">
              <label>
                Select Specimen(s)<span>*</span>
              </label>
              <select
                name="selectedSpecimen"
                value={labTestData.selectedSpecimen}
                onChange={handleInputChange}
              >
                <option value="">--Select Specimens--</option>
                <option value="Blood">Blood</option>
                <option value="Urine">Urine</option>
                <option value="Saliva">Saliva</option>
                <option value="Tissue">Tissue</option>
                <option value="Sputum">Sputum</option>
                <option value="CSF">CSF (Cerebrospinal Fluid)</option>
                <option value="Serum">Serum</option>
                <option value="Plasma">Plasma</option>
                <option value="Bone Marrow">Bone Marrow</option>
                <option value="Nasal Swab">Nasal Swab</option>
                <option value="Throat Swab">Throat Swab</option>
                <option value="Stool">Stool</option>
              </select>
            </div>

            <div className="lSLabTestAddNLTest-form-group-sub">
              <div className="lSLabTestAddNLTest-form-group">
                <label>Run No. Type</label>
                <select
                  name="runNoType"
                  value={labTestData.runNoType}
                  onChange={handleInputChange}
                >
                  <option value="normal">Normal</option>
                  {/* Add other options here */}
                </select>
              </div>

              <div className="lSLabTestAddNLTest-form-group">
                <label>Display Sequence</label>
                <input
                  type="number"
                  name="displaySequence"
                  value={labTestData.displaySequence}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="lSLabTestAddNLTest-AddNew">
          <a href="#" className="add-new-specimen">
            Add New Specimen
          </a>
        </div>

        <div className="lSLabTestAddNLTest-checkbox-N-form-group">
          <div className="lSLabTestAddNLTest-checkbox-row">
            <label>
              <input
                type="checkbox"
                name="isSmsApplicable"
                checked={labTestData.isSmsApplicable}
                onChange={handleInputChange}
              />{" "}
              Is SMS Applicable?
            </label>
            <label>
              <input
                type="checkbox"
                name="isLisApplicable"
                checked={labTestData.isLisApplicable}
                onChange={handleInputChange}
              />{" "}
              Is LIS Applicable?
            </label>
            <label>
              <input
                type="checkbox"
                name="isValidForReporting"
                checked={labTestData.isValidForReporting}
                onChange={handleInputChange}
              />{" "}
              Is Valid for Reporting
            </label>
            <label>
              <input
                type="checkbox"
                name="isOutsourcedTest"
                checked={labTestData.isOutsourcedTest}
                onChange={handleInputChange}
              />{" "}
              Is Outsourced Test?
            </label>
            <label>
              <input
                type="checkbox"
                name="taxApplicable"
                checked={labTestData.taxApplicable}
                onChange={handleInputChange}
              />{" "}
              Tax Applicable
            </label>
            <label>
              <input
                type="checkbox"
                name="hasNegativeResults"
                checked={labTestData.hasNegativeResults}
                onChange={handleInputChange}
              />{" "}
              Has Negative Results
            </label>
          </div>

          <div className="lSLabTestAddNLTest-form-group lSLabTestAddNLTest-full-width">
            <label>Interpretation</label>
            <textarea
              name="interpretation"
              value={labTestData.interpretation}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="lSLabTestAddNLTest-select-components-section">
        <h4>Select Components For this Lab Test</h4>
        <table>
          <thead>
            <tr>
              <th>Component Name</th>
              <th>Unit</th>
              <th>Value Type</th>
              <th>Range</th>
              <th>Disp. Sequence</th>
            </tr>
          </thead>
          <tbody>
            {labTestData.components.map((component, index) => (
              <tr key={index}>
                <td>
                  <select
                    name="componentName"
                    value={component.componentName}
                    onChange={(e) => handleComponentChange(index, e)}
                    className="lSLabTestAddNLTest-component-input"
                  >
                    <option value="">Select Component</option>
                    {labComponents.map((labComponent) => (
                      <option
                        key={labComponent.componentId}
                        value={labComponent.componentName}
                      >
                        {labComponent.componentName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input type="text" value={component.unit} readOnly />
                </td>
                <td>
                  <input type="text" value={component.valueType} readOnly />
                </td>
                <td>
                  <input type="text" value={component.range} readOnly />
                </td>
                <td>
                  <input
                    type="text"
                    value={component.displaySequence}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addNewComponent}
          className="lSLabTestAddNLTest-add-new-component-btn"
        >
          Add New Component
        </button>
        <Link
          to="/labTestComponent"
          className="lSLabTestAddNLTest-create-new-component"
        >
          Create New Component?
        </Link>
      </div>

      <div className="lSLabTestAddNLTest-form-actions">
        {isDataUpdate ? (
          <button
            onClick={() => handleUpdateLabTest(intialData?.labTestId)}
            className="lSLabTestAddNLTest-add-btn"
          >
            Update
          </button>
        ) : (
          <button
            className="lSLabTestAddNLTest-add-btn"
            onClick={saveLabTestData}
          >
            Add
          </button>
        )}
        <button className="lSLabTestAddNLTest-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
      {activePopup && (
        <RadiologyPopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  );
};

export default LSLabTestAddNLTest;
