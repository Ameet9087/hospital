// import React, { useRef, useEffect, useState } from "react";
// import "./MaternityANCPopUp.css";
// import { CiSearch } from "react-icons/ci";
// import { Link } from "react-router-dom";
// import { FaSearch } from "react-icons/fa"; // Using react-icons
// import { startResizing } from "../TableHeadingResizing/resizableColumns";

// const MaternityANCPopUp = ({ onClose }) => {
//   const [selectedTab, setSelectedTab] = useState("itemDetails");
//   const [columnWidths, setColumnWidths] = useState({});
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const tableRef = useRef(null);
//   // ===================================================================
//   return (
//     <div className="MaternityANCPopUp-container">
//       <div className="MaternityANCPopUp-header">
//         <h4>Maternity ANC</h4>
//         {/* <button className="MaternityANCPopUp-close-btn" onClick={onClose}>
//           X
//         </button> */}
//       </div>
//       <div className="MaternityANCPopUp-form">
//         <div className="MaternityANCPopUp-form-row">
//           <div className="MaternityANCPopUp-form-row-section-1">
//             <div className="MaternityANCPopUp-form-group-1row">
//               <div className="MaternityANCPopUp-form-group">
//                 <label htmlFor="actual-sale-no">Name:</label>
//                 <input
//                   id="actual-sale-no"
//                   type="text"
//                   placeholder="Enter Actual Sale No"
//                 />
//               </div>
//               <div className="MaternityANCPopUp-form-group">
//                 <label htmlFor="manual-sale-no">Hospital:</label>
//                 <input
//                   id="manual-sale-no"
//                   type="text"
//                   placeholder="Enter Manual Sale No"
//                 />
//               </div>
//               <div className="MaternityANCPopUp-form-group">
//                 <label htmlFor="actual-sale-date">Age/Sex:</label>
//                 <input id="actual-sale-date" type="text" />
//               </div>
//             </div>
//             <div className="MaternityANCPopUp-form-group-1row">
//               <div className="MaternityANCPopUp-form-group">
//                 <label htmlFor="provisional-sale-no">Date of Birth:</label>
//                 <input
//                   id="provisional-sale-no"
//                   type="date"
//                   placeholder="Enter Provisional Sale No"
//                 />
//               </div>
//               <div className="MaternityANCPopUp-form-group">
//                 <label htmlFor="condemnation-date">Address:</label>
//                 <input id="condemnation-date" type="date" />
//               </div>
//               <div className="MaternityANCPopUp-form-group">
//                 <label htmlFor="equipment-name">Contact No:</label>
//                 <input
//                   id="equipment-name"
//                   type="text"
//                   placeholder="Enter Equipment Name"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* ----------------------------------------------------------------------------- */}

//           <div className="MaternityANCPopUp-form-group-1row">
//             <div className="MaternityANCPopUp-form-group">
//               <label htmlFor="asset-no">Date:</label>
//               <input id="asset-no" type="date" />
//             </div>
//             <div className="MaternityANCPopUp-form-group">
//               <label htmlFor="cost">Time:</label>
//               <input id="cost" type="time" />
//             </div>
//             <div className="MaternityANCPopUp-form-group">
//               <label htmlFor="quantity">Select ANC Visit:</label>
//               {/* <input id="quantity" type="number" placeholder="Enter Quantity" /> */}
//               <select name="" id="">
//                 <option value="">--select--</option>
//                 <option value=""></option>
//               </select>
//             </div>
//           </div>

//           <div className="MaternityANCPopUp-form-group-1row">
//             <div className="MaternityANCPopUp-form-group">
//               <label htmlFor="serial-no">Condition of ANC:</label>
//               <input
//                 id="serial-no"
//                 type="text"
//                 placeholder="Enter Condition of ANC"
//               />
//             </div>
//             <div className="MaternityANCPopUp-form-group">
//               <label htmlFor="model-no">Pregnancy Period(in weeks):</label>
//               <input id="model-no" type="text" placeholder="Pregnancy Period" />
//             </div>
//             <div className="MaternityANCPopUp-form-group">
//               <label htmlFor="category">Place Of ANC:</label>
//               <input id="category" type="text" placeholder="Place Of ANC" />
//             </div>
//           </div>
//           <div className="MaternityANCPopUp-form-group-1row">
//             <div className="MaternityANCPopUp-form-group">
//               <label htmlFor="category">Weight(in kg):</label>
//               <input id="category" type="text" placeholder="Weight(in kg)" />
//             </div>
//           </div>

//           <div className="MaternityANCPopUp-form-actions">
//             <button className="MaternityANCPopUp-add-btn" onClick={""}>
//               Add
//             </button>
//             <button className="MaternityANCPopUp-add-btn" onClick={""}>
//               Reset
//             </button>
//           </div>

//           <div className="MaternityANCPopUp-form-row-section-1">
//             <h4 className="MaternityANCPopUp-noANCListh4">No ANC List</h4>
//           </div>
//         </div>
//       </div>

//       <div className="MaternityANCPopUp-form-actions">
//         <button className="MaternityANCPopUp-add-btn" onClick={""}>
//           Print
//         </button>
//         <button className="MaternityANCPopUp-close-btn" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MaternityANCPopUp;





import React, { useRef, useState } from "react";
import "./MaternityANCPopUp.css";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Using react-icons
import { API_BASE_URL } from "../../api/api";

const MaternityANCPopUp = ({ onClose, patientData }) => {
  const [formData, setFormData] = useState({
    visitDate: "",
    // gestationalAge: "",
    conditionOfAnatenatal: "",
    placeOfAnc: "",
    selectAncVisit: "",
    pregnancyPeriod: "",
    weight: "",
    inPatientDTO: {
      inPatientId: patientData?.inPatientDTO?.inPatientId,
    }
  });
  const [uploadMessage, setUploadMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/antenatal-care/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setUploadMessage("Data saved successfully!");
        alert("Data saved successfully!")
      } else {
        setUploadMessage("Failed to save data.");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      setUploadMessage("An error occurred while saving data.");
      console.error("Error:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      visitDate: "",
      // gestationalAge: "",
      conditionOfAnatenatal: "",
      placeOfAnc: "",
      selectAncVisit: "",
      pregnancyPeriod: "",
      weight: "",
      inPatientId: 1,
    });
  };

  return (
    <div className="MaternityANCPopUp-container">
      <div className="MaternityANCPopUp-header">
        <h4>Maternity ANC</h4>
      </div>
      <div className="MaternityANCPopUp-form">
        <div className="MaternityANCPopUp-form-row">
          <div className="MaternityANCPopUp-form-row-section-1">
            <div className="MaternityANCPopUp-form-group-1row">
              <div className="MaternityANCPopUp-form-group">
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={`${patientData?.inPatientDTO?.firstName} ${patientData?.inPatientDTO?.lastName}`}

                  placeholder="Enter Name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="MaternityANCPopUp-form-group">
                <label htmlFor="contactNo">Contact No:</label>
                <input
                  id="contactNo"
                  type="text"
                  name="contactNo"
                  value={patientData?.inPatientDTO?.phoneNumber}

                  placeholder="Enter Contact No"
                  onChange={handleInputChange}
                />
              </div>
              <div className="MaternityANCPopUp-form-group">
                <label htmlFor="age-sex">Age/Sex:</label>
                <input
                  id="age-sex"
                  type="text"
                  name="ageSex"
                  value={`${patientData?.inPatientDTO?.age}/${patientData?.inPatientDTO?.gender}`}
                  placeholder="Enter Age/Sex"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="MaternityANCPopUp-form-group-1row">
              <div className="MaternityANCPopUp-form-group">
                <label htmlFor="visitDate">Date of Birth:</label>
                <input
                  id="visitDate"
                  type="date"
                  name="visitDate"
                  value={patientData?.inPatientDTO?.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
              <div className="MaternityANCPopUp-form-group">
                <label htmlFor="address">Address:</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={patientData?.inPatientDTO?.addressDTO?.city}

                  placeholder="Enter Address"
                  onChange={handleInputChange}
                />
              </div>
              <div className="MaternityANCPopUp-form-group">
              </div>


            </div>

          </div>

          <div className="MaternityANCPopUp-form-group-1row">
            <div className="MaternityANCPopUp-form-group">
              <label htmlFor="asset-no">Visit Date:</label>
              <input
                id="visitDate"
                name="visitDate"
                type="date"
                onChange={handleInputChange}
              />
            </div>

            <div className="MaternityANCPopUp-form-group">
              <label htmlFor="selectAncVisit">Select ANC Visit:</label>
              <select
                id="selectAncVisit"
                name="selectAncVisit"
                onChange={handleInputChange}
              >
                <option value="">--Select--</option>
                <option value="First Visit">First Visit</option>
                <option value="Second Visit">Second Visit</option>
              </select>
            </div>
            <div className="MaternityANCPopUp-form-group">
              <label htmlFor="conditionOfAnatenatal">Condition of ANC:</label>
              <input
                id="conditionOfAnatenatal"
                type="text"
                name="conditionOfAnatenatal"
                placeholder="Enter Condition of ANC"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="MaternityANCPopUp-form-group-1row">
            <div className="MaternityANCPopUp-form-group">
              <label htmlFor="pregnancyPeriod">Pregnancy Period:</label>
              <input
                id="pregnancyPeriod"
                type="text"
                name="pregnancyPeriod"
                placeholder="Enter Pregnancy Period"
                onChange={handleInputChange}
              />
            </div>
            <div className="MaternityANCPopUp-form-group">
              <label htmlFor="placeOfAnc">Place Of ANC:</label>
              <input
                id="placeOfAnc"
                type="text"
                name="placeOfAnc"
                placeholder="Enter Place Of ANC"
                onChange={handleInputChange}
              />
            </div>
            <div className="MaternityANCPopUp-form-group">
              <label htmlFor="weight">Weight (in kg):</label>
              <input
                id="weight"
                type="number"
                name="weight"
                placeholder="Enter Weight"
                onChange={handleInputChange}
              />
            </div>
          </div>


          <div className="MaternityANCPopUp-form-actions">
            <button className="MaternityANCPopUp-add-btn" onClick={handleSubmit}>
              Add
            </button>
            <button className="MaternityANCPopUp-add-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="MaternityANCPopUp-form-actions">
        <button className="MaternityANCPopUp-add-btn" onClick={() => window.print()}>
          Print
        </button>
        <button className="MaternityANCPopUp-close-btn" onClick={onClose}>
          Close
        </button>
      </div>

      {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
    </div>
  );
};

export default MaternityANCPopUp;


// import React, { useRef, useState, useEffect } from "react";
// import "./MaternityANCPopUp.css";
// import { CiSearch } from "react-icons/ci";
// import { Link } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";

// const MaternityANCPopUp = ({ onClose, patientData }) => {
//   const [formData, setFormData] = useState({
//     visitDate: "",
//     conditionOfAnatenatal: "",
//     placeOfAnc: "",
//     selectAncVisit: "",
//     pregnancyPeriod: "",
//     weight: "",
//     inPatientDTO: {
//       inPatientId: patientData?.id || 1,
//     }
//   });
//   const [uploadMessage, setUploadMessage] = useState("");

//   useEffect(() => {
//     if (patientData) {
//       setFormData(prevState => ({
//         ...prevState,
//         name: `${patientData.firstName} ${patientData.middleName} ${patientData.lastName}`,
//         age: patientData.age,
//         address: patientData.address,
//         contactNo: patientData.contactNumber,
//         weight: patientData.patientWeight,
//         inPatientDTO: {
//           inPatientId: patientData.id
//         }
//       }));
//     }
//   }, [patientData]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch("http://192.168.0.118:4069/api/antenatal-care/save", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setUploadMessage("Data saved successfully!");
//         console.log("Success:", result);
//       } else {
//         setUploadMessage("Failed to save data.");
//         console.error("Error:", response.statusText);
//       }
//     } catch (error) {
//       setUploadMessage("An error occurred while saving data.");
//       console.error("Error:", error);
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       visitDate: "",
//       conditionOfAnatenatal: "",
//       placeOfAnc: "",
//       selectAncVisit: "",
//       pregnancyPeriod: "",
//       weight: patientData?.patientWeight || "",
//       inPatientDTO: {
//         inPatientId: patientData?.id || 1,
//       }
//     });
//   };

//   return (
//     <div className="MaternityANCPopUp-container">
//       <div className="MaternityANCPopUp-header">
//         <h4>Maternity ANC</h4>
//       </div>
//       <div className="MaternityANCPopUp-form">
//         <div className="MaternityANCPopUp-form-row">
//           <div className="MaternityANCPopUp-form-row-section-1">
//             <div className="MaternityANCPopUp-form-group-1row">
//               <div className="MaternityANCPopUp-form-group">
//                 <label htmlFor="name">Name:</label>
//                 <input
//                   id="name"
//                   type="text"
//                   name="name"
//                   value={formData.name || ''}
//                   readOnly
//                 />
//               </div>
//               <div className="MaternityANCPopUp-form-group">
//                 <label htmlFor="age-sex">Age/Sex:</label>
//                 <input
//                   id="age-sex"
//                   type="text"
//                   name="ageSex"
//                   value={formData.age || ''}
//                   readOnly
//                 />
//               </div>
//               <div className="MaternityANCPopUp-form-group">
//                 <label htmlFor="contactNo">Contact No:</label>
//                 <input
//                   id="contactNo"
//                   type="text"
//                   name="contactNo"
//                   value={formData.contactNo || ''}
//                   readOnly
//                 />
//               </div>
//             </div>

//             <div className="MaternityANCPopUp-form-group-1row">
//               <div className="MaternityANCPopUp-form-group">
//                 <label htmlFor="address">Address:</label>
//                 <input
//                   id="address"
//                   type="text"
//                   name="address"
//                   value={formData.address || ''}
//                   readOnly
//                 />
//               </div>
//               <div className="MaternityANCPopUp-form-group">
//                 <label htmlFor="visitDate">Visit Date:</label>
//                 <input
//                   id="visitDate"
//                   type="date"
//                   name="visitDate"
//                   value={formData.visitDate}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="MaternityANCPopUp-form-group">
//                 <label htmlFor="selectAncVisit">Select ANC Visit:</label>
//                 <select
//                   id="selectAncVisit"
//                   name="selectAncVisit"
//                   value={formData.selectAncVisit}
//                   onChange={handleInputChange}
//                 >
//                   <option value="">--Select--</option>
//                   <option value="First Visit">First Visit</option>
//                   <option value="Second Visit">Second Visit</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="MaternityANCPopUp-form-group-1row">
//             <div className="MaternityANCPopUp-form-group">
//               <label htmlFor="conditionOfAnatenatal">Condition of ANC:</label>
//               <input
//                 id="conditionOfAnatenatal"
//                 type="text"
//                 name="conditionOfAnatenatal"
//                 value={formData.conditionOfAnatenatal}
//                 onChange={handleInputChange}
//                 placeholder="Enter Condition of ANC"
//               />
//             </div>
//             <div className="MaternityANCPopUp-form-group">
//               <label htmlFor="pregnancyPeriod">Pregnancy Period:</label>
//               <input
//                 id="pregnancyPeriod"
//                 type="text"
//                 name="pregnancyPeriod"
//                 value={formData.pregnancyPeriod}
//                 onChange={handleInputChange}
//                 placeholder="Enter Pregnancy Period"
//               />
//             </div>
//             <div className="MaternityANCPopUp-form-group">
//               <label htmlFor="placeOfAnc">Place Of ANC:</label>
//               <input
//                 id="placeOfAnc"
//                 type="text"
//                 name="placeOfAnc"
//                 value={formData.placeOfAnc}
//                 onChange={handleInputChange}
//                 placeholder="Enter Place Of ANC"
//               />
//             </div>
//           </div>

//           <div className="MaternityANCPopUp-form-group-1row">
//             <div className="MaternityANCPopUp-form-group">
//               <label htmlFor="weight">Weight (in kg):</label>
//               <input
//                 id="weight"
//                 type="number"
//                 name="weight"
//                 value={formData.weight}
//                 onChange={handleInputChange}
//                 placeholder="Enter Weight"
//               />
//             </div>
//           </div>

//           <div className="MaternityANCPopUp-form-actions">
//             <button className="MaternityANCPopUp-add-btn" onClick={handleSubmit}>
//               Add
//             </button>
//             <button className="MaternityANCPopUp-add-btn" onClick={handleReset}>
//               Reset
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="MaternityANCPopUp-form-actions">
//         <button className="MaternityANCPopUp-add-btn" onClick={() => window.print()}>
//           Print
//         </button>
//         <button className="MaternityANCPopUp-close-btn" onClick={onClose}>
//           Close
//         </button>
//       </div>

//       {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
//     </div>
//   );
// };

// export default MaternityANCPopUp;