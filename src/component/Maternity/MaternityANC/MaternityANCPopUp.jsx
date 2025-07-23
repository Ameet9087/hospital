import React, { useRef, useState } from "react";
import "./MaternityANCPopUp.css";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Using react-icons
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingSelect } from "../../../FloatingInputs";
import { toast } from 'react-toastify';
const MaternityANCPopUp = ({ onClose, patientData }) => {
  const printRef = useRef(null);

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
    },
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
        toast.success('Proposal saved successfully!');
      

      } else {
       
        console.error("Error:", response.statusText);
        toast.error('Failed to save proposal. Please try again.');

      }
    } catch (error) {
      toast.error('Failed to save proposal. Please try again.');
      console.error("Error:", error);

    }
  };

  // const handleReset = () => {
  //   setFormData({
  //     visitDate: "",
  //     conditionOfAnatenatal: "",
  //     placeOfAnc: "",
  //     selectAncVisit: "",
  //     pregnancyPeriod: "",
  //     weight: "",
  //     inPatientDTO: {
  //       inPatientId: patientData?.inPatientDTO?.inPatientId,
  //     },
  //   });
  // };

  const handlePrint = () => {
    if (!printRef.current) {
      console.error("Print reference is not available.");
      return;
    }

    // Prepare the data to be printed
    const {
      weight,
      placeOfAnc,
      pregnancyPeriod,
      conditionOfAnatenatal,
      selectAncVisit,
      visitDate,
    } = formData;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Maternity ANC</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px; 
              line-height: 1.6;
            }
            .MaternityANCPopUp-print-area { 
              border: 1px solid #ccc; 
              padding: 20px; 
              width: 90%;
              margin: auto;
              background-color: #fff;
            }
            label {
              font-weight: bold;
              display: block;
              margin-bottom: 8px; /* Adjusted gap */
            }
            input, select {
              border: none;
              outline: none;
              width: 100%;
              font-size: 16px;
              background: transparent;
              padding: 5px 0;
            }
            input:focus, select:focus {
              outline: none;
            }
            .MaternityANCPopUp-form-actions {
              display: none;
            }
            /* Hide date picker icon */
            input[type="date"]::-webkit-calendar-picker-indicator {
              display: none !important;
            }
            /* Hide select dropdown icon */
            select::-webkit-appearance: none !important;
            select:-moz-appearance: none !important;
            select:-ms-appearance: none !important;
            
            /* Ensure select dropdown value is shown properly */
            select {
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
              padding-right: 20px; /* Adjust padding to prevent text overlap */
            }
  
            /* Ensuring uniform gap between the sections */
            .MaternityANCPopUp-print-area p {
              margin-bottom: 15px; /* Consistent margin between paragraphs */
            }
  
          </style>
        </head>
        <body>
          <div class="print-title" style="text-align: center; font-size: 20px; font-weight: bold; margin-bottom: 20px;">Maternity ANC Report</div>
          <div class="MaternityANCPopUp-print-area">
            <div>
              <p><strong>Visit Date:</strong> ${visitDate}</p>
              <p><strong>Weight:</strong> ${weight} kg</p>
              <p><strong>Place of ANC:</strong> ${placeOfAnc}</p>
              <p><strong>Pregnancy Period:</strong> ${pregnancyPeriod}</p>
              <p><strong>Condition of ANC:</strong> ${conditionOfAnatenatal}</p>
              <p><strong>ANC Visit:</strong> ${selectAncVisit}</p>
            </div>
            <div>
              <p><strong>Name:</strong> ${patientData?.inPatientDTO?.patient?.firstName} ${patientData?.inPatientDTO?.patient?.lastName}</p>
              <p><strong>Contact No:</strong> ${patientData?.inPatientDTO?.patient?.contactNumber}</p>
              <p><strong>Age/Sex:</strong> ${patientData?.inPatientDTO?.patient?.age}/${patientData?.inPatientDTO?.patient?.gender}</p>
              <p><strong>Date of Birth:</strong> ${patientData?.inPatientDTO?.patient?.dateOfBirth}</p>
              <p><strong>Address:</strong> ${patientData?.inPatientDTO?.patient?.address}</p>
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="MaternityANCPopUp-container">
      <div className="MaternityANCPopUp-header">
        <h4>Maternity ANC</h4>
      </div>
      <div ref={printRef} className="MaternityANCPopUp-print-area">
        <div className="MaternityANCPopUp-form">
          <div className="MaternityANCPopUp-form-row">
            <div className="MaternityANCPopUp-form-row-section-1">
              <div className="MaternityANCPopUp-form-group-1row">
                <div className="MaternityANCPopUp-form-group">
                  <FloatingInput
                    label={"Name"}
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={`${patientData?.inPatientDTO?.patient?.firstName} ${patientData?.inPatientDTO?.patient?.lastName}`}
                    onChange={handleInputChange}
                    restrictions={{ char: true }}
                  />
                </div>
                <div className="MaternityANCPopUp-form-group">
                  <FloatingInput
                    label={"Contact No"}
                    type="text"
                    name="contactNo"
                    value={patientData?.inPatientDTO?.patient?.contactNumber}
                    placeholder="Enter Contact No"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="MaternityANCPopUp-form-group">
                  <FloatingInput
                    label={"Age/Sex"}
                    type="text"
                    name="ageSex"
                    value={`${patientData?.inPatientDTO?.patient?.age}/${patientData?.inPatientDTO?.patient?.gender}`}
                    placeholder="Enter Age/Sex"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="MaternityANCPopUp-form-group-1row">
                <div className="MaternityANCPopUp-form-group">
                  <FloatingInput
                    label={"Date of Birth"}
                    type="date"
                    name="dateOfBirth"
                    value={patientData?.inPatientDTO?.patient?.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="MaternityANCPopUp-form-group">
                  <FloatingInput
                    label={"Address"}
                    type="text"
                    name="address"
                    value={patientData?.inPatientDTO?.patient?.address}
                    placeholder="Enter Address"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="MaternityANCPopUp-form-group"></div>
              </div>
            </div>

            <div className="MaternityANCPopUp-form-group-1row">
              <div className="MaternityANCPopUp-form-group">
                <FloatingInput
                  label={"Visit Date"}
                  type="date"
                  name="visitDate"
                  value={formData.visitDate || ""}
                  onChange={(e) =>
                    handleInputChange("visitDate", e.target.value)
                  }
                />
              </div>

              <div className="MaternityANCPopUp-form-group">
                <FloatingSelect
                  label={"Select ANC Visit"}
                  name="selectAncVisit"
                  onChange={handleInputChange}
                  options={[
                    { value: "", label: "Select" },
                    { value: "First Visit", label: "First Visit" },
                    { value: "Second Visit", label: "Second Visit" },
                  ]}
                />
              </div>
              <div className="MaternityANCPopUp-form-group">
                <FloatingInput
                  label={"Condition of ANC"}
                  type="text"
                  name="conditionOfAnatenatal"
                  value=""
                  placeholder="Enter Condition of ANC"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="MaternityANCPopUp-form-group-1row">
              <div className="MaternityANCPopUp-form-group">
                <FloatingInput
                  label={"Pregnancy Period"}
                  type="text"
                  name="pregnancyPeriod"
                  value=""
                  placeholder="Enter Pregnancy Period"
                  onChange={handleInputChange}
                />
              </div>
              <div className="MaternityANCPopUp-form-group">
                <FloatingInput
                  label={"Place Of ANC"}
                  type="text"
                  name="placeOfAnc"
                  value=""
                  placeholder="Enter Place Of ANC"
                  onChange={handleInputChange}
                />
              </div>
              <div className="MaternityANCPopUp-form-group">
                <FloatingInput
                  label={"Weight (in kg)"}
                  type="number"
                  name="weight"
                  value=""
                  placeholder="Enter Weight"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="MaternityANCPopUp-form-actions">
             
              <button
                className="MaternityANCPopUp-add-btn"
                onClick={handlePrint}>
                Print
              </button>
              <button
                className="MaternityANCPopUp-add-btn"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
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
