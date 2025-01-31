// import React, { useEffect, useState } from "react";
// // import { API_BASE_URL } from "../api/api";
// import "./assetCategoryMasterPopUp.css";
// import { Link } from "react-router-dom";
// import { API_BASE_URL } from "../../../api/api";
// const AssetCategoryMasterPopUp = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     assetCategory: "",
//     underCategory: "",
//     depreciation: "",
//     salvage: "",
//     status: "Active",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleClear = () => {
//     setFormData({
//       assetCategory: "",
//       underCategory: "",
//       depreciation: "",
//       salvage: "",
//       status: "Active", // Reset to default
//     });
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch(`${ API_BASE_URL }/asset-categories`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const textResponse = await response.text(); // Get raw text response

//       if (response.ok) {
//         try {
//           const jsonResponse = JSON.parse(textResponse);
//           alert("Form Data Saved Successfully!");
       
//           handleClear();
//         } catch {
//           alert("Form Data Saved Successfully (non-JSON response)!");
          
//         }
//       } else {
//         alert(`Failed to save data: ${textResponse}`);
//       }
//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("An error occurred while saving the data.");
//     }
//   };

//   const handleSearch = () => {
//     if (formData.assetCategory) {
//       alert(`Searching for: ${formData.assetCategory}`);
//       console.log("Search Data:", formData);
//     } else {
//       alert("Please enter an Asset Category to search.");
//     }
//   };

//   const handleClose = () => {
//     alert("Form Closed!");
//     handleClear();
//   };

//   const handleDelete = () => {
//     alert("Delete functionality not implemented yet.");
//   };

//   const handleTracking = () => {
//     alert("Tracking functionality not implemented yet.");
//   };

//   const handlePrint = () => {
//     alert("Print functionality not implemented yet.");
//   };

//   const handleVersionComparison = () => {
//     alert("Version Comparison functionality not implemented yet.");
//   };

//   const handleSDC = () => {
//     alert("SDC functionality not implemented yet.");
//   };

//   const handleTesting = () => {
//     alert("Testing functionality not implemented yet.");
//   };

//   const handleInfo = () => {
//     alert("Info functionality not implemented yet.");
//   };
//   // ===================================================================

//   const [labCategories, setLabCategories] = useState([]);
//   const [labComponents, setLabComponents] = useState([]);
//   const [labTestData, setLabTestData] = useState({
//     labTestName: "",
//     labTestCode: "",
//     reportingName: "",
//     serviceDepartment: "",
//     selectedSpecimen: "",
//     runNoType: "normal",
//     displaySequence: 1000,
//     isSmsApplicable: false,
//     isLisApplicable: false,
//     isValidForReporting: false,
//     isOutsourcedTest: false,
//     taxApplicable: false,
//     hasNegativeResults: false,
//     interpretation: "",
//     components: [],
//   });

//   useEffect(() => {
//     const fetchLabCategories = async () => {
//       try {
//         const response = await fetch(
//           `/lab-test-categories/getAll-testCategory`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setLabCategories(data);
//         } else {
//           console.error("Failed to fetch lab categories:", response.statusText);
//           alert("Error fetching lab categories");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     const fetchLabComponents = async () => {
//       try {
//         const response = await fetch(
//           `/lab-components/getAllComponents`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setLabComponents(data);
//         } else {
//           console.error("Failed to fetch lab components:", response.statusText);
//           alert("Error occurred while fetching lab components.");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchLabComponents();
//     fetchLabCategories();
//   }, []); // Run once on component mount

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setLabTestData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleComponentChange = (index, e) => {
//     const { value } = e.target;
//     const selectedComponent = labComponents.find(
//       (comp) => comp.componentName === value
//     );

//     // Update the specific component data based on the selected component
//     setLabTestData((prevData) => {
//       const newComponents = [...prevData.components];
//       newComponents[index] = {
//         id: selectedComponent ? selectedComponent.componentId : null, // Store only the ID
//         componentName: value,
//         unit: selectedComponent ? selectedComponent.unit : "",
//         valueType: selectedComponent ? selectedComponent.valueType : "",
//         range: selectedComponent ? selectedComponent.componentRange : "",
//         displaySequence: selectedComponent ? selectedComponent.displayName : "",
//       };
//       return { ...prevData, components: newComponents };
//     });
//   };

//   const addNewComponent = () => {
//     setLabTestData((prevData) => ({
//       ...prevData,
//       components: [
//         ...prevData.components,
//         {
//           id: null, // Initialize ID as null for new components
//           componentName: "",
//           unit: "",
//           valueType: "",
//           range: "",
//           displaySequence: "",
//         },
//       ],
//     }));
//   };

//   const saveLabTestData = async () => {
//     const dataToSend = {
//       labTestCode: labTestData.labTestCode,
//       labTestName: labTestData.labTestName,
//       labTestSpecimen: labTestData.selectedSpecimen,
//       hasNegativeResults: labTestData.hasNegativeResults ? "Yes" : "No",
//       negativeResultText: labTestData.hasNegativeResults
//         ? labTestData.interpretation
//         : "",
//       isValidForReporting: labTestData.isValidForReporting ? "Yes" : "No",
//       displaySequence: labTestData.displaySequence,
//       reportingName: labTestData.reportingName,
//       interpretation: labTestData.interpretation,
//       runNumberType: labTestData.runNoType,
//       labTestCategoryId: labCategories[0]?.id || null,
//       isOutsourceTest: labTestData.isOutsourcedTest ? "Yes" : "No",
//       smsApplicable: labTestData.isSmsApplicable ? "Yes" : "No",
//       isLISApplicable: labTestData.isLisApplicable ? "Yes" : "No",
//       labComponentIds: labTestData.components
//         .map((comp) => comp.id)
//         .filter(Boolean), // Only get IDs that are defined
//     };

//     console.log(dataToSend);

//     try {
//       const response = await fetch(`/labTestSetting/create`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(dataToSend),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log("Lab test data saved successfully:", result);
//         onClose(); // Close the form after saving
//       } else {
//         console.error("Failed to save lab test data:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   return (
//     <div 
//     className="assetCategoryMasterPopUp-container"
//     >
//       <div className="assetCategoryMasterPopUp-header">
//         <h4>Asset Category Master</h4>
//         {/* <button className="assetCategoryMasterPopUp-close-btn" onClick={onClose}>
//           X
//         </button> */}
//       </div>

//       <div className="assetCategoryMasterPopUp-form">
//         <div className="assetCategoryMasterPopUp-form-row">
//           <div className="assetCategoryMasterPopUp-form-group-1row">
//             <div className="assetCategoryMasterPopUp-form-group">
//             <label htmlFor="assetCategory">Asset Category: *</label>
//           <input
//             type="text"
//             id="assetCategory"
//             name="assetCategory"
//             placeholder="Enter Asset Category"
//             value={formData.assetCategory}
//             onChange={handleChange}
//             required
//           />
//             </div>
//             <div className="assetCategoryMasterPopUp-form-group">
//             <label htmlFor="underCategory">Under Category: *</label>
//             <input
//               type="text"
//               id="underCategory"
//               name="underCategory"
//               placeholder="Enter Under Category"
//               value={formData.underCategory}
//               onChange={handleChange}
//               required
//             />
//             </div>
//           </div>

//           <div className="assetCategoryMasterPopUp-form-group-1row">
//             <div className="assetCategoryMasterPopUp-form-group">
//             <label htmlFor="depreciation">Depreciation (%):</label>
//           <input
//             type="text"
//             id="depreciation"
//             name="depreciation"
//             placeholder="Enter Depreciation (%)"
//             value={formData.depreciation}
//             onChange={handleChange}
//             />
//             </div>
//             <div className="assetCategoryMasterPopUp-form-group">
//             <label htmlFor="salvage">Salvage (%):</label>
//           <input
//             type="text"
//             id="salvage"
//             name="salvage"
//             placeholder="Enter Salvage (%)"
//             value={formData.salvage}
//             onChange={handleChange}
//           />
//             </div>
            
//           </div>
//           <div className="assetCategoryMasterPopUp-form-group-1row">
//             <div className="assetCategoryMasterPopUp-form-group">
//             <label htmlFor="depreciation">Status::</label>
//             <label>
//               <input
//                 type="radio"
//                 name="status"
//                 value="Active"
//                 checked={formData.status === "Active"}
//                 onChange={handleChange}
//               />
//               Active
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="status"
//                 value="Inactive"
//                 checked={formData.status === "Inactive"}
//                 onChange={handleChange}
//               />
//               Inactive
//             </label>
//             </div>
            
            
//           </div>
        
//         </div>

//       </div>

     

//       <div className="assetCategoryMasterPopUp-form-actions">
//         <button
//           className="assetCategoryMasterPopUp-add-btn"
//           onClick={handleSave}
//         >
//           Add
//         </button>
//         {/* <button className="assetCategoryMasterPopUp-close-btn">Close</button> */}
//       </div>
//     </div>
//   );
// };

// export default AssetCategoryMasterPopUp;
import React, { useState } from "react";
import { API_BASE_URL } from "../../../api/api";
import "./assetCategoryMasterPopUp.css";

const AssetCategoryMasterPopUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    assetCategory: "",
    underCategory: "",
    depreciation: "",
    salvage: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the value is numeric and not negative for depreciation and salvage
    if (
      (name === "depreciation" || name === "salvage" || name === "underCategory" || name === "assetCategory") &&
      (isNaN(value) || parseFloat(value) < 0)
    ) {
      return; // Don't update the state if the value is negative or not a number
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      assetCategory: "",
      underCategory: "",
      depreciation: "",
      salvage: "",
      status: "Active",
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/asset-categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const textResponse = await response.text();

      if (response.ok) {
        try {
          const jsonResponse = JSON.parse(textResponse);
          alert("Form Data Saved Successfully!");
          handleClear();
        } catch {
          alert("Form Data Saved Successfully (non-JSON response)!");
        }
      } else {
        alert(`Failed to save data: ${textResponse}`);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("An error occurred while saving the data.");
    }
  };

  const handleSearch = () => {
    if (formData.assetCategory) {
      alert(`Searching for: ${formData.assetCategory}`);
      console.log("Search Data:", formData);
    } else {
      alert("Please enter an Asset Category to search.");
    }
  };

  const handleClose = () => {
    alert("Form Closed!");
    handleClear();
  };

  const handleDelete = () => {
    alert("Delete functionality not implemented yet.");
  };

  const handleTracking = () => {
    alert("Tracking functionality not implemented yet.");
  };

  const handlePrint = () => {
    alert("Print functionality not implemented yet.");
  };

  const handleVersionComparison = () => {
    alert("Version Comparison functionality not implemented yet.");
  };

  const handleSDC = () => {
    alert("SDC functionality not implemented yet.");
  };

  const handleTesting = () => {
    alert("Testing functionality not implemented yet.");
  };

  const handleInfo = () => {
    alert("Info functionality not implemented yet.");
  };

  return (
    <div className="assetCategoryMasterPopUp-container">
      <div className="assetCategoryMasterPopUp-header">
        <h4>Asset Category Master</h4>
      </div>

      <div className="assetCategoryMasterPopUp-form">
        <div className="assetCategoryMasterPopUp-form-row">
          <div className="assetCategoryMasterPopUp-form-group-1row">
            <div className="assetCategoryMasterPopUp-form-group">
              <label htmlFor="assetCategory">Asset Category: *</label>
              <input
                type="text"
                id="assetCategory"
                name="assetCategory"
                placeholder="Enter Asset Category"
                value={formData.assetCategory}
                onChange={handleChange}
                required
              />
            </div>
            <div className="assetCategoryMasterPopUp-form-group">
              <label htmlFor="underCategory">Under Category: *</label>
              <input
                type="text"
                id="underCategory"
                name="underCategory"
                placeholder="Enter Under Category"
                value={formData.underCategory}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="assetCategoryMasterPopUp-form-group-1row">
            <div className="assetCategoryMasterPopUp-form-group">
              <label htmlFor="depreciation">Depreciation (%):</label>
              <input
                type="text"
                id="depreciation"
                name="depreciation"
                placeholder="Enter Depreciation (%)"
                value={formData.depreciation}
                onChange={handleChange}
              />
            </div>
            <div className="assetCategoryMasterPopUp-form-group">
              <label htmlFor="salvage">Salvage (%):</label>
              <input
                type="text"
                id="salvage"
                name="salvage"
                placeholder="Enter Salvage (%)"
                value={formData.salvage}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="assetCategoryMasterPopUp-form-group-1row">
            <div className="assetCategoryMasterPopUp-form-group">
              <label htmlFor="status">Status:</label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={formData.status === "Active"}
                  onChange={handleChange}
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === "Inactive"}
                  onChange={handleChange}
                />
                Inactive
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="assetCategoryMasterPopUp-form-actions">
        <button
          className="assetCategoryMasterPopUp-add-btn"
          onClick={handleSave}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AssetCategoryMasterPopUp;
