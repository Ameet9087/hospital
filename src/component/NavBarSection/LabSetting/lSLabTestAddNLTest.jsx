import React, { useEffect, useState } from "react";
// import './AddLabTest.css';
import "../LabSetting/lSLabTestAddNLTest.css";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../api/api";
import RadiologyPopupTable from "../../Employee/Radiology/RadiologyPopupTable";
import axios from "axios";
import { FloatingInput, FloatingSelect, FloatingTextarea } from "../../../FloatingInputs";
import { toast } from "react-toastify";
const LSLabTestAddNLTest = ({ onClose, intialData, isDataUpdate }) => {
  const [labCategories, setLabCategories] = useState([]);
  const [labComponents, setLabComponents] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [activePopup, setActivePopup] = useState("");
  const [showPopup, setShowPopup] = useState(false);
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
          toast.error("Error fetching lab categories");
        }
      } catch (error) {
        toast.error("Error:", error);
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
          toast.error("Error occurred while fetching lab components.");
        }
      } catch (error) {
        toast.error("Error:", error);
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

  const handleAddNewLabTestClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
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
        toast.success("Lab test data saved successfully:", result);
        onClose(); // Close the form after saving
      } else {
        toast.error("Failed to save lab test data:", response.statusText);
      }
    } catch (error) {
      toast.error("Error:", error);
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
      toast.success("Lab Test Updated Successfully")
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
              <FloatingInput
                label={"Lab Test Name"}
                type="search"
                name="labTestName"
                placeholder="Lab Test Name"
                value={labTestData.labTestName}
                onChange={handleInputChange}
                onIconClick={() => setActivePopup("labTestName")}
              />
            </div>
            <div className="lSLabTestAddNLTest-form-group">
              <FloatingInput
                label={"Lab Test Code"}
                type="text"
                name="labTestCode"
                placeholder="Lab Test Code"
                value={labTestData.labTestCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="lSLabTestAddNLTest-form-group">
              <FloatingInput
                label={"Reporting Name"}
                type="text"
                name="reportingName"
                placeholder="Lab Test Reporting Name"
                value={labTestData.reportingName}
                onChange={handleInputChange}
              />
            </div>
            <div className="lSLabTestAddNLTest-form-group">
              <FloatingSelect
                label={"Lab Category"}
                name="labCategory"
                value={labTestData.labCategory}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "" },
                  ...(Array.isArray(labCategories)
                    ? labCategories.map((category) => ({
                        value: category.labTestCategoryId,
                        label: category.labTestCategoryName,
                      }))
                    : []),
                ]}
              />
            </div>
          </div>
          <div className="lSLabTestAddNLTest-form-group-1row">
            <div className="lSLabTestAddNLTest-form-group">
              <FloatingInput
                label={"Service Department"}
                type="text"
                name="serviceDepartment"
                placeholder="Select Service Department Name"
                value={labTestData.serviceDepartment}
                onChange={handleInputChange}
              />
            </div>
            <div className="lSLabTestAddNLTest-form-group">
              <FloatingSelect
              label={"Select Specimen"}
                name="selectedSpecimen"
                value={labTestData.selectedSpecimen}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "--Select Specimens--" },
                  { value: "Blood", label: "Blood" },
                  { value: "Urine", label: "Urine" },
                  { value: "Saliva", label: "Saliva" },
                  { value: "Tissue", label: "Tissue" },
                  { value: "Sputum", label: "Sputum" },
                  { value: "CSF", label: "CSF (Cerebrospinal Fluid)" },
                  { value: "Serum", label: "Serum" },
                  { value: "Plasma", label: "Plasma" },
                  { value: "Bone Marrow", label: "Bone Marrow" },
                  { value: "Nasal Swab", label: "Nasal Swab" },
                  { value: "Throat Swab", label: "Throat Swab" },
                  { value: "Stool", label: "Stool" },
                ]}
              />
            </div>
            <div className="lSLabTestAddNLTest-form-group">
              <FloatingSelect
              label={"Run No.Type"}
               name="runNoType"
               value={labTestData.runNoType}
               onChange={handleInputChange}
               options={[
                {value:"",label:""},
                {value:"normal",label:"Normal"}
               ]}
              />
            </div>
            <div className="lSLabTestAddNLTest-form-group">
              <FloatingInput
              label={"Display Sequence"}
              type="number"
              name="displaySequence"
              value={labTestData.displaySequence}
              onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        {/* <div className="lSLabTestAddNLTest-AddNew">
          <a href="#" className="add-new-specimen">
            Add New Specimen
          </a>
        </div> */}

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
            <div className="lSLabTestAddNLTest-form-group lSLabTestAddNLTest-full-width">
              <FloatingTextarea
              label={"Interpretation"}
               name="interpretation"
               value={labTestData.interpretation}
               onChange={handleInputChange}
              />
          </div>
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
                  <FloatingSelect
                  label={"Component Name"}
                  name="componentName"
                  value={component.componentName}
                  onChange={(e) => handleComponentChange(index, e)}
                  options={[
                    {value:"",label:""},
                    ...(Array.isArray(labComponents)?labComponents.map((labComponent)=>({
                      value:labComponent.componentName,
                      label:labComponent.componentName
                    })):[])
                  ]}
                  />

                </td>
                <td>
                  <FloatingInput
                  label={"Unit"}
                  type="text" value={component.unit} readOnly
                  />
                </td>
                <td>
                  <FloatingInput
                  label={"Value Type"}
                  type="text" value={component.valueType} readOnly
                  />
                </td>
                <td>
                  <FloatingInput
                  label={"Range"}
                   type="text" value={component.range} readOnly/>
                </td>
                <td>
                  <FloatingInput
                  label={"Display Sequence"}
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
        {/* <Link
          onClick={handleAddNewLabTestClick}
          className="lSLabTestAddNLTest-create-new-component"
        >
          Create New Component?
        </Link> */}
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
