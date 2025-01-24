// import React, { useEffect, useState,useRef } from "react";
// import "./NacoticDrugdispensed.css";
// import { startResizing } from "../TableHeadingResizing/resizableColumns";
// const NacoticDrugdispensed = ({ onClose }) => {
//     const [columnWidths, setColumnWidths] = useState({});
//     const [packageTableRows, setPackageTableRows] = useState([
//       { sn: 1, drug: "", dose: "", route: "", remarks: "" },
//     ]);
//     const tableRef = useRef(null);
  
//     const [formData, setFormData] = useState({
//       mrNo: "",
//       patientName: "",
//       age: "",
//       regDate: "",
//       gender: "",
//       address: "",
//       aadharNo: "",
//       consultant: "",
//       roomNoBedNo: "",
//       desOfIllness: "",
//       whetherRes: "",
//       registeredRem: "",
//     });
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     };
  
//     const handleAddRow = () => {
//       setPackageTableRows([
//         ...packageTableRows,
//         { sn: packageTableRows.length + 1, drug: "", dose: "", route: "", remarks: "" },
//       ]);
//     };
  
//     const handleDeleteRow = (index) => {
//       const newRows = packageTableRows.filter((_, i) => i !== index);
//       setPackageTableRows(newRows);
//     };
  
 
//   return (
//     <div 
//     className="nacotic-drug-dispensed-com-container"
//     >
//       <div className="nacotic-drug-dispensed-com-header">
//       <h4>Narcotic Drugs Dispensed</h4>
       
//       </div>

//       <div className="nacotic-drug-dispensed-com-form">



//         <div className="nacotic-drug-dispensed-com-form-row">
//           <div className="nacotic-drug-dispensed-com-form-group-1row">
//             <div className="nacotic-drug-dispensed-com-form-group">
//             <label>MR No:</label>
//             <input
//               type="text"
//               name="type"
            
//             />
//             </div>
//             <div className="nacotic-drug-dispensed-com-form-group">
//             <label>Patient Name</label>
//             <input
//               type="text"
//               name="patientName"
             
//             />
//             </div>
//             <div className="nacotic-drug-dispensed-com-form-group">
//             <label>Age:</label>
//             <input
//               type="text"
//               name="age"
           
//             />
//             </div>
//           </div>

          
//           <div className="nacotic-drug-dispensed-com-form-group-1row">
            
//             <div className="nacotic-drug-dispensed-com-form-group">
//             <label>Reg Date:</label>
//             <input
//               type="date"
//               name="regDate"
            
//             />
//             </div>
//             <div className="nacotic-drug-dispensed-com-form-group">
//             <label>Gender:</label>
//             <input
//               type="text"
//               name="gender"
             
//             />
//             </div>
//             <div className="nacotic-drug-dispensed-com-form-group">
//             <label>Address:</label>
//             <input
//               type="text"
//               name="address"
             
//             />
//             </div>
//           </div>
          
//           <div className="nacotic-drug-dispensed-com-form-group-1row">
//             <div className="nacotic-drug-dispensed-com-form-group">
//             <label>AADHAR No:</label>
//             <input
//               type="text"
//               name="aadharNo"
             
//             />
//             </div>
//             <div className="nacotic-drug-dispensed-com-form-group">
//             <label>Consultant:</label>
//             <input
//               type="text"
//               name="consultant"
           
//             />
//             </div>
       

            
//             <div className="nacotic-drug-dispensed-com-form-group">
//             <label>Room No / Bed No:</label>
//             <input
//               type="text"
//               name="roomNoBedNo"
             
//             />
//             </div>
//           </div>
        

//           <div className="nacotic-drug-dispensed-com-form-group-1row">
//             <div className="nacotic-drug-dispensed-com-form-group">
//             <label>Description Of Illness:</label>
//             <input
//               type="text"
//               name="desOfIllness"
              
//             />
//             </div>
//             <div className="nacotic-drug-dispensed-com-form-group">
//             <label>Whether Registered With Any Other Registered Medical:</label>
//   <select
//     name="whetherRes"
   
//   >
//     <option value="">Select</option>
//     <option value="Yes">Yes</option>
//     <option value="No">No</option>
//   </select>
//             </div>
//             <div className="nacotic-drug-dispensed-com-form-group">
//   <label>Regstered Remæks:</label>
//   <input
//               type="text"
//               name="registeredRem"
              
//             />
// </div>

//           </div>
        
//           </div>
//           </div>
      
         

//       <div className="nacotic-drug-dispensed-com-form-actions">
//         <button
//           className="nacotic-drug-dispensed-com-add-btn"
         
//         >
//           Add
//         </button>
       
//       </div>
//     <div className="table-container">
//     <table ref={tableRef}>
//         <thead>
//           <tr>
//             {["Actions", "SN", "Drug", "Dose", "Route", "Remarks"].map((header, index) => (
//               <th
//                 key={index}
//                 style={{ width: columnWidths[index] }}
//                 className="resizable-th"
//               >
//                 <div className="header-content">
//                   <span>{header}</span>
//                   <div
//                     className="resizer"
//                     onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
//                   ></div>
//                 </div>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {packageTableRows.map((row, index) => (
//             <tr key={index}>
//               <td>
//                 <div className="diabetic-chart-add-btn-table-actions">
//                   <button
//                     className="diabetic-chart-add-btn"
//                     onClick={handleAddRow}
//                   >
//                     Add
//                   </button>
//                   <button
//                     className="diabetic-chart-add-btn-del-btn"
//                     onClick={() => handleDeleteRow(index)}
//                     disabled={packageTableRows.length <= 1}
//                   >
//                     Del
//                   </button>
//                 </div>
//               </td>
//               <td>{row.sn}</td>
//               <td>{row.drug}</td>
//               <td>{row.dose}</td>
//               <td>{row.route}</td>
//               <td>{row.remarks}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   );
// };

// export default NacoticDrugdispensed;



// import React, { useState, useRef, useEffect } from "react";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns"; 
// import PopupTable from "../popup";
// import axios from "axios";
// import './NacoticDrugdispensed.css'
// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);
//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };
//   return (
//     <div className={`nacotic-drug-dispensed-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <input
//         type={type}
//         className="nacotic-drug-dispensed-form-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="nacotic-drug-dispensed-form-floating-label">{label}</label>
//     </div>
//   );
// };
// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);
//   return (
//     <div className={`nacotic-drug-dispensed-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <select
//         className="nacotic-drug-dispensed-form-floating-select"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value !== '');
//         }}
//         onChange={(e) => setHasValue(e.target.value !== '')}
//         {...props}
//       >
//         <option value="">{}</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>{option.label}</option>
//         ))}
//       </select>
//       <label className="nacotic-drug-dispensed-form-floating-label">{label}</label>
//     </div>
//   );
// };
// const NarcoticDrugDispensedForm = () => {
//   const [mrNoData, setMrNoData] = useState([]);
//         const [activePopup, setActivePopup] = useState(null);
//         const [formData, setFormData] = useState({
//           uhid: "",
//           ipNo: "",
//           patientName: "",
//           age: "",
//           sex: "",
//           admissionDate: "",
//           consultant: "",
//           roomBedNo: "",
//           eyesOpen: "",
//           eyeClosedBy: "",
//           bestVerbalResponse: "",
//           ettubeOfTrochosTubeT: "",
//           bestMotorResponse: "",
//           usuallyRecordBestArmResponse: "",
//           totalScore: "",
//           bpSystolic: "",
//           bpDiastolic: "",
//           pulse: "",
//           respiratoryRate: "",
//           rightSizeReaction: "",
//           leftSizeReaction: "",
//           arms: "",
//           legs: "",
//         });
//         useEffect(() => {
//           if (activePopup === "MrNo") {
//               fetchMrno();
//            }
//         }, [activePopup]);
//         const handleSubmit = async (e) => {
//           e.preventDefault();
//           console.log("Form Submitted:", formData);
//           try {
//             const response = await fetch("http://192.168.4.223:4069/api/gcs-sheets", { 
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(formData),
//             });
//             if (!response.ok) {
//               throw new Error("Failed to submit form data");
//             }
//             const result = await response.json();
//             console.log("Form submission success:", result);
//             alert("Form submitted successfully!");
//           } catch (error) {
//             console.error("Error submitting form data:", error);
//             alert("Failed to submit form.");
//           }
//         };
//     const handleChange = (e) => {
//       const { name, value, type, checked } = e.target;
//       const fieldValue = type === "checkbox" ? checked : value;
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: fieldValue,
//       }));
//     }
//     const fetchMrno = async () => {
//       try {
//           const response = await axios.get(`http://192.168.242.223:4068/api/ip-admissions`);
//           setMrNoData(response.data);
//           console.log(mrNoData);
//           console.log(data)
//       } catch (error) {
//           console.error("Error fetching data:", error);
//       }
//   };
//   const handleSelect = (data) => {
//     console.log(data ,"selected data");
//     if (activePopup === "MrNo") {
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             uhid: data.uhid,
//             firstName: data.firstName,
//             lastName: data.lastName,
//             age:data?.age,
//             gender: data?.realobj?.patient?.patient?.gender,
//             address: data?.realobj?.patient?.patient?.address,
//             adharCardId: data?.realobj?.patient?.patient?.adharCardId,
//             ipNo: data?.realobj?.patient?.inPatientId,
//             admissionDate: data?.realobj?.admissionDate,
//             consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
//             roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
//             bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
//         }));
//     }
//     setActivePopup(null);
//   };
//   const getPopupData = () => {
//     if (activePopup === "MrNo") {
//       const popupData = {
//         columns: ["uhid", "firstName", "lastName"],
//         data: Array.isArray(mrNoData)
//           ? mrNoData.map((user) => ({
//               uhid: user?.patient?.patient?.uhid,
//               ipNo: user?.patient?.patient?.ipNo,
//               firstName: user?.patient?.patient?.firstName,
//               lastName: user?.patient?.patient?.lastName,
//               age: user?.patient?.patient?.age,
//               sex:user?.sex,
//               roomNumber:user?.patient?.roomNumber,
//               realobj:user
//             }))
//           : [],
//       };
//       console.log("Popup Data:", popupData);
//       return popupData;
//     }
//     return { columns: [], data: [] };
//   };
//   const { columns, data } = getPopupData();
//   const [rows, setRows] = useState([
//     { sn: 1, drug: "", dose: "", route: "", remarks: "" }
//   ]); // Added initial dummy data
//     const tableRef = useRef(null);
//   const handleAddRow = () => {
//     setRows((prevRows) => [
//       ...prevRows,
//       { sn: prevRows.length + 1, drug: "", dose: "", route: "", remarks: "" }
//     ]);
//   };
//   const handleDeleteRow = (index) => {
//     setRows((prevRows) => prevRows.filter((_, i) => i !== index));
//   };
//   return (
//     <>
//     <div className="nacotic-drug-dispensed-form-container">
//       <div className="nacotic-drug-dispensed-form-section">
//       </div>
//       <div className="nacotic-drug-dispensed-form-section">
//         <div className="nacotic-drug-dispensed-form-header">Narcotic Drugs Dispensed</div>
//         <div className="nacotic-drug-dispensed-form-grid">
//           <div className="nacotic-drug-dispensed-form-search-field">
//             <FloatingInput label="MRNO" type="text" name="mrno" 
//             value={formData.uhid}
//             />
//             <button className="nacotic-drug-dispensed-form-search-icon" 
//             onClick={() => setActivePopup("MrNo")}
//             >
//               <svg viewBox="0 0 24 24" width="16" height="16">
//                 <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//               </svg>
//             </button>
//             </div>
//           <FloatingInput label="Patient Name" value={`${formData.firstName} ${formData.lastName}`} />
//           <FloatingInput label="Age" value={formData.age}/>
//           <FloatingInput label="Reg Date" type='date' value={formData.admissionDate} />
//           <FloatingInput 
//             label="Gender" 
//             value={formData.gender} 
             
//           />
//           <FloatingInput label="Address" value={formData.address}  />
//           <FloatingInput label="Aadhar No" value={formData.adharCardId}/>
//           <FloatingInput label="Consultant" value={formData.consultant} />
//           <FloatingInput label="Room No/ Bed No"  value={`${formData.roomNumber} / ${formData.bedNo}`}/>
//          <FloatingInput label="Description Of lliness" />
//           <div className="nacotic-drug-dispensed-form-search-field">
//           <FloatingSelect 
//             label="Whether Registered With Any Other Registered Medical:"
//             options={[
//               { value: 'yes', label: 'Yes' },
//               { value: 'no', label: 'No' },
//             ]}
//           />
//           </div>
//           <div className="nacotic-drug-dispensed-form-search-field">
//           <FloatingInput label="Regstered Remarks:" />
//           </div>
//         </div>
//       </div>
//       {activePopup && (
//               <PopupTable
//               columns={columns}
//               data={data}
//               onSelect={handleSelect}
//                onClose={() => setActivePopup(null)}
//               />
//                       )}
//     </div>
//     <table ref={tableRef} className="nacotic-drug-dispensed-form-table">
//         <thead>
//           <tr>
//             <th>Actions</th>
//             <th>SN</th>
//             <th>Drug</th>
//             <th>Dose</th>
//             <th>Route</th>
//             <th>Remarks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, index) => (
//             <tr key={index}>
//               <td>
//                 <button
//                   className="nacotic-drug-dispensed-form-add-btn"
//                   onClick={handleAddRow}
//                 >
//                   Add
//                 </button>
//                 <button
//                   className="nacotic-drug-dispensed-form-del-btn"
//                   onClick={() => handleDeleteRow(index)}
//                   disabled={rows.length <= 1}
//                 >
//                   Del
//                 </button>
//               </td>
//               <td>{row.sn}</td>
//               <td><input type="text"  /></td>
//               <td><input type="text" /></td>
//               <td><input type="text"  /></td>
//               <td><input type="text"  /></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//           <div className="nacotic-drug-dispensed-form-buttons">
//               <button className="btn-blue" >Save</button>
//             </div>
//             </>
//   );
// };
// export default NarcoticDrugDispensedForm;

// import React, { useState, useRef, useEffect } from "react";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns"; 
// import PopupTable from "../popup";
// import axios from "axios";
// import './NacoticDrugdispensed.css'

// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);
  
//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };

//   return (
//     <div className={`nacotic-drug-dispensed-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <input
//         type={type}
//         className="nacotic-drug-dispensed-form-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="nacotic-drug-dispensed-form-floating-label">{label}</label>
//     </div>
//   );
// };

// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   return (
//     <div className={`nacotic-drug-dispensed-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <select
//         className="nacotic-drug-dispensed-form-floating-select"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value !== '');
//         }}
//         onChange={(e) => {
//           setHasValue(e.target.value !== '');
//           if (props.onChange) props.onChange(e);
//         }}
//         {...props}
//       >
//         <option value="">{}</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>{option.label}</option>
//         ))}
//       </select>
//       <label className="nacotic-drug-dispensed-form-floating-label">{label}</label>
//     </div>
//   );
// };

// const NarcoticDrugDispensedForm = () => {
//   const [mrNoData, setMrNoData] = useState([]);
//   const [activePopup, setActivePopup] = useState(null);
//   const [formData, setFormData] = useState({
//     uhid: "",
//     ipNo: "",
//     firstName: "",
//     lastName: "",
//     age: "",
//     gender: "",
//     admissionDate: "",
//     consultant: "",
//     roomNumber: "",
//     bedNo: "",
//     address: "",
//     adharCardId: "",
//     illness: "",
//     otherMedical: "",
//     registeredRemarks: "",
//   });

//   const [rows, setRows] = useState([
//     { id: 1, drug: "", doses: "", route: "", remark: "" }
//   ]);

//   useEffect(() => {
//     if (activePopup === "MrNo") {
//       fetchMrno();
//     }
//   }, [activePopup]);

//   const fetchMrno = async () => {
//     try {
//       const response = await axios.get(`http://192.168.242.223:4068/api/ip-admissions`);
//       setMrNoData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSelect = (data) => {
//     if (activePopup === "MrNo") {
//       setFormData({
//         ...formData,
//         uhid: data.uhid,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         age: data?.age,
//         gender: data?.realobj?.patient?.patient?.gender,
//         address: data?.realobj?.patient?.patient?.address,
//         adharCardId: data?.realobj?.patient?.patient?.adharCardId,
//         ipNo: data?.realobj?.patient?.inPatientId,
//         admissionDate: data?.realobj?.admissionDate,
//         consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
//         roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
//         bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
//       });
//     }
//     setActivePopup(null);
//   };

//   const handleSave = async () => {
//     try {
//       const payload = {
//         otherMedical: formData.otherMedical,
//         remark: formData.registeredRemarks,
//         illness: formData.illness,
//         ipAdmissionDTO: {
//           ipAdmmissionId: formData.ipNo
//         },
//         addItems: rows.map(row => ({
//           addItemId: row.id,
//           doses: row.doses,
//           route: row.route,
//           remark: row.remark
//         }))
//       };

//       const response = await axios.post(
//         'http://192.168.242.223:4068/api/narcotic-drug-dispensed',
//         payload
//       );

//       if (response.status === 200 || response.status === 201) {
//         alert('Data saved successfully!');
//       }
//     } catch (error) {
//       console.error('Error saving data:', error);
//       alert('Failed to save data. Please try again.');
//     }
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleRowChange = (index, field, value) => {
//     setRows(prev => prev.map((row, i) => 
//       i === index ? { ...row, [field]: value } : row
//     ));
//   };

//   const handleAddRow = () => {
//     setRows(prev => [...prev, { 
//       id: prev.length + 1,
//       drug: "",
//       doses: "",
//       route: "",
//       remark: ""
//     }]);
//   };

//   const handleDeleteRow = (index) => {
//     setRows(prev => prev.filter((_, i) => i !== index));
//   };

//   const getPopupData = () => {
//     if (activePopup === "MrNo") {
//       return {
//         columns: ["uhid", "firstName", "lastName"],
//         data: Array.isArray(mrNoData)
//           ? mrNoData.map((user) => ({
//               uhid: user?.patient?.patient?.uhid,
//               ipNo: user?.patient?.patient?.ipNo,
//               firstName: user?.patient?.patient?.firstName,
//               lastName: user?.patient?.patient?.lastName,
//               age: user?.patient?.patient?.age,
//               sex: user?.sex,
//               roomNumber: user?.patient?.roomNumber,
//               realobj: user
//             }))
//           : [],
//       };
//     }
//     return { columns: [], data: [] };
//   };

//   const { columns, data } = getPopupData();
//   const tableRef = useRef(null);

//   return (
//     <>
//       <div className="nacotic-drug-dispensed-form-container">
//         <div className="nacotic-drug-dispensed-form-section">
//           <div className="nacotic-drug-dispensed-form-header">Narcotic Drugs Dispensed</div>
//           <div className="nacotic-drug-dispensed-form-grid">
//             <div className="nacotic-drug-dispensed-form-search-field">
//               <FloatingInput 
//                 label="MRNO" 
//                 name="uhid"
//                 value={formData.uhid}
//                 readOnly
//               />
//               <button 
//                 className="nacotic-drug-dispensed-form-search-icon"
//                 onClick={() => setActivePopup("MrNo")}
//               >
//                 <svg viewBox="0 0 24 24" width="16" height="16">
//                   <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//                 </svg>
//               </button>
//             </div>
//             <FloatingInput 
//               label="Patient Name" 
//               value={`${formData.firstName} ${formData.lastName}`} 
//               readOnly
//             />
//             <FloatingInput 
//               label="Age" 
//               value={formData.age}
//               readOnly
//             />
//             <FloatingInput 
//               label="Reg Date" 
//               type="date" 
//               value={formData.admissionDate}
//               readOnly
//             />
//             <FloatingInput 
//               label="Gender" 
//               value={formData.gender}
//               readOnly
//             />
//             <FloatingInput 
//               label="Address" 
//               value={formData.address}
//               readOnly
//             />
//             <FloatingInput 
//               label="Aadhar No" 
//               value={formData.adharCardId}
//               readOnly
//             />
//             <FloatingInput 
//               label="Consultant" 
//               value={formData.consultant}
//               readOnly
//             />
//             <FloatingInput 
//               label="Room No/ Bed No"
//               value={`${formData.roomNumber} / ${formData.bedNo}`}
//               readOnly
//             />
//             <FloatingInput 
//               label="Description Of lliness"
//               name="illness"
//               value={formData.illness}
//               onChange={handleFormChange}
//             />
//             <div className="nacotic-drug-dispensed-form-search-field">
//               <FloatingSelect 
//                 label="Whether Registered With Any Other Registered Medical:"
//                 name="otherMedical"
//                 value={formData.otherMedical}
//                 onChange={handleFormChange}
//                 options={[
//                   { value: 'yes', label: 'Yes' },
//                   { value: 'no', label: 'No' },
//                 ]}
//               />
//             </div>
//             <div className="nacotic-drug-dispensed-form-search-field">
//               <FloatingInput 
//                 label="Registered Remarks:"
//                 name="registeredRemarks"
//                 value={formData.registeredRemarks}
//                 onChange={handleFormChange}
//               />
//             </div>
//           </div>
//         </div>

//         {activePopup && (
//           <PopupTable
//             columns={columns}
//             data={data}
//             onSelect={handleSelect}
//             onClose={() => setActivePopup(null)}
//           />
//         )}
//       </div>

//       <table ref={tableRef} className="nacotic-drug-dispensed-form-table">
//         <thead>
//           <tr>
//             <th>Actions</th>
//             <th>SN</th>
//             <th>Drug</th>
//             <th>Dose</th>
//             <th>Route</th>
//             <th>Remarks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, index) => (
//             <tr key={index}>
//               <td>
//                 <button
//                   className="nacotic-drug-dispensed-form-add-btn"
//                   onClick={handleAddRow}
//                 >
//                   Add
//                 </button>
//                 <button
//                   className="nacotic-drug-dispensed-form-del-btn"
//                   onClick={() => handleDeleteRow(index)}
//                   disabled={rows.length <= 1}
//                 >
//                   Del
//                 </button>
//               </td>
//               <td>{row.id}</td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.drug}
//                   onChange={(e) => handleRowChange(index, 'drug', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.doses}
//                   onChange={(e) => handleRowChange(index, 'doses', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.route}
//                   onChange={(e) => handleRowChange(index, 'route', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.remark}
//                   onChange={(e) => handleRowChange(index, 'remark', e.target.value)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="nacotic-drug-dispensed-form-buttons">
//         <button className="btn-blue" onClick={handleSave}>Save</button>
//       </div>
//     </>
//   );
// };

// export default NarcoticDrugDispensedForm;


// import React, { useState, useRef, useEffect } from "react";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns"; 
// import PopupTable from "../popup";
// import axios from "axios";
// import './NacoticDrugdispensed.css'

// const FloatingInput = ({ label, type = "text", value, ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(!!value);

//   useEffect(() => {
//     setHasValue(!!value);
//   }, [value]);

//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };

//   return (
//     <div className={`nacotic-drug-dispensed-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <input
//         type={type}
//         className="nacotic-drug-dispensed-form-floating-input"
//         value={value}
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="nacotic-drug-dispensed-form-floating-label">{label}</label>
//     </div>
//   );
// };

// // FloatingSelect component remains exactly the same
// const FloatingSelect = ({ label, options = [], value, ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(!!value);

//   useEffect(() => {
//     setHasValue(!!value);
//   }, [value]);

//   return (
//     <div className={`nacotic-drug-dispensed-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <select
//         className="nacotic-drug-dispensed-form-floating-select"
//         value={value}
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value !== '');
//         }}
//         onChange={(e) => {
//           setHasValue(e.target.value !== '');
//           if (props.onChange) props.onChange(e);
//         }}
//         {...props}
//       >
//         <option value="">{}</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>{option.label}</option>
//         ))}
//       </select>
//       <label className="nacotic-drug-dispensed-form-floating-label">{label}</label>
//     </div>
//   );
// };

// const NarcoticDrugDispensedForm = () => {
//   const [mrNoData, setMrNoData] = useState([]);
//   const [activePopup, setActivePopup] = useState(null);
//   const [formData, setFormData] = useState({
//     uhid: "",
//     ipNo: "",
//     firstName: "",
//     lastName: "",
//     age: "",
//     gender: "",
//     admissionDate: "",
//     consultant: "",
//     roomNumber: "",
//     bedNo: "",
//     address: "",
//     adharCardId: "",
//     illness: "",
//     otherMedical: "",
//     registeredRemarks: "",
//     ipAdmmissionId:""
//   });

//   const [rows, setRows] = useState([
//     { id: 21, drug: "", doses: "", route: "", remark: "" }
//   ]);

//   useEffect(() => {
//     if (activePopup === "MrNo") {
//       fetchMrno();
//     }
//   }, [activePopup]);

//   const fetchMrno = async () => {
//     try {
//       const response = await axios.get(`http://192.168.1.46:4096/api/ip-admissions`);
//       setMrNoData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSelect = (data) => {
//     console.log("Received data:", data); // Log the full object for debugging
  
//     if (activePopup === "MrNo") {
//       setFormData({
//         ...formData,
//         ipAdmmissionId: data?.ipAdmmissionId, // Fallback in case the field is missing
//         uhid: data?.uhid,
//         firstName: data?.firstName,
//         lastName: data?.lastName,
//         age: data?.age,
//         gender: data?.realobj?.patient?.patient?.gender, // Check nested object structure
//         address: data?.realobj?.patient?.patient?.address, // Validate structure
//         adharCardId: data?.realobj?.patient?.patient?.adharCardId , // Fallback for undefined fields
//         ipNo: data?.realobj?.patient?.inPatientId, // Corrected structure
//         admissionDate: data?.realobj?.admissionDate,
//         consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName, // Nested object check
//         roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber, // Validate roomDetails structure
//         bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo, // Ensure bedDTO exists
//       });
  
//       console.log("FormData after update:", formData.ipAdmmissionId);
//     }
//     setActivePopup(null);
//   };
  

//   const handleSave = async () => {
//     try {
//       const payload = {
//         otherMedical: formData.otherMedical,
//         remark: formData.registeredRemarks,
//         illness: formData.illness,
//         ipAdmissionDTO: {
//           ipAdmmissionId: formData.ipAdmmissionId
//         },
//         addItems: rows.map(row => ({
//           addItemId: row.id,
//           doses: row.doses,
//           route: row.route,
//           remark: row.remark
//         }))
//       };
//       console.log(payload+"pppppppp");
      
//       const response = await axios.post(
//         'http://192.168.1.46:4096/api/narcotic-drug-dispensed',
//         payload
//       );

//       if (response.status === 200 || response.status === 201) {
//         alert('Data saved successfully!');
//       }
//     } catch (error) {
//       console.error('Error saving data:', error);
//       alert('Failed to save data. Please try again.');
//     }
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleRowChange = (index, field, value) => {
//     setRows(prev => prev.map((row, i) => 
//       i === index ? { ...row, [field]: value } : row
//     ));
//   };

//   const handleAddRow = () => {
//     setRows(prev => [...prev, { 
//       id: prev.length + 1,
//       drug: "",
//       doses: "",
//       route: "",
//       remark: ""
//     }]);
//   };

//   const handleDeleteRow = (index) => {
//     setRows(prev => prev.filter((_, i) => i !== index));
//   };

//   const getPopupData = () => {
//     if (activePopup === "MrNo") {
//       return {
//         columns: ["uhid", "firstName", "lastName"],
//         data: Array.isArray(mrNoData)
//           ? mrNoData.map((user) => ({
//               uhid: user?.patient?.patient?.uhid,
//               ipNo: user?.patient?.patient?.ipNo,
//               firstName: user?.patient?.patient?.firstName,
//               lastName: user?.patient?.patient?.lastName,
//               age: user?.patient?.patient?.age,
//               sex: user?.sex,
//               roomNumber: user?.patient?.roomNumber,
//               ipAdmmissionId:user?.ipAdmmissionId,
//               realobj: user
//             }))
//           : [],
//       };
//     }
//     return { columns: [], data: [] };
//   };

//   const { columns, data } = getPopupData();
//   const tableRef = useRef(null);

//   return (
//     <>
//       <div className="nacotic-drug-dispensed-form-container">
//         <div className="nacotic-drug-dispensed-form-section">
//           <div className="nacotic-drug-dispensed-form-header">Narcotic Drugs Dispensed</div>
//           <div className="nacotic-drug-dispensed-form-grid">
//             <div className="nacotic-drug-dispensed-form-search-field">
//               <FloatingInput 
//                 label="MRNO" 
//                 name="uhid"
//                 value={formData.uhid}
//                 readOnly
//               />
//               <button 
//                 className="nacotic-drug-dispensed-form-search-icon"
//                 onClick={() => setActivePopup("MrNo")}
//               >
//                 <svg viewBox="0 0 24 24" width="16" height="16">
//                   <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//                 </svg>
//               </button>
//             </div>
//             <FloatingInput 
//               label="Patient Name" 
//               value={`${formData.firstName} ${formData.lastName}`} 
//               readOnly
//             />
//             <FloatingInput 
//               label="Age" 
//               value={formData.age}
//               readOnly
//             />
//             <FloatingInput 
//               label="Reg Date" 
//               type="date" 
//               value={formData.admissionDate}
//               readOnly
//             />
//             <FloatingInput 
//               label="Gender" 
//               value={formData.gender}
//               readOnly
//             />
//             <FloatingInput 
//               label="Address" 
//               value={formData.address}
//               readOnly
//             />
//             <FloatingInput 
//               label="Aadhar No" 
//               value={formData.adharCardId}
//               readOnly
//             />
//             <FloatingInput 
//               label="Consultant" 
//               value={formData.consultant}
//               readOnly
//             />
//             <FloatingInput 
//               label="Room No/ Bed No"
//               value={`${formData.roomNumber} / ${formData.bedNo}`}
//               readOnly
//             />
//             <FloatingInput 
//               label="Description Of lliness"
//               name="illness"
//               value={formData.illness}
//               onChange={handleFormChange}
//             />
//             <div className="nacotic-drug-dispensed-form-search-field">
//               <FloatingSelect 
//                 label="Whether Registered With Any Other Registered Medical:"
//                 name="otherMedical"
//                 value={formData.otherMedical}
//                 onChange={handleFormChange}
//                 options={[
//                   { value: 'yes', label: 'Yes' },
//                   { value: 'no', label: 'No' },
//                 ]}
//               />
//             </div>
//             <div className="nacotic-drug-dispensed-form-search-field">
//               <FloatingInput 
//                 label="Registered Remarks:"
//                 name="registeredRemarks"
//                 value={formData.registeredRemarks}
//                 onChange={handleFormChange}
//               />
//             </div>
//           </div>
//         </div>

//         {activePopup && (
//           <PopupTable
//             columns={columns}
//             data={data}
//             onSelect={handleSelect}
//             onClose={() => setActivePopup(null)}
//           />
//         )}
//       </div>

//       <table ref={tableRef} className="nacotic-drug-dispensed-form-table">
//         <thead>
//           <tr>
//             <th>Actions</th>
//             <th>SN</th>
//             <th>Drug</th>
//             <th>Dose</th>
//             <th>Route</th>
//             <th>Remarks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, index) => (
//             <tr key={index}>
//               <td>
//                 <button
//                   className="nacotic-drug-dispensed-form-add-btn"
//                   onClick={handleAddRow}
//                 >
//                   Add
//                 </button>
//                 <button
//                   className="nacotic-drug-dispensed-form-del-btn"
//                   onClick={() => handleDeleteRow(index)}
//                   disabled={rows.length <= 1}
//                 >
//                   Del
//                 </button>
//               </td>
//               <td>{row.id}</td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.drug}
//                   onChange={(e) => handleRowChange(index, 'drug', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.doses}
//                   onChange={(e) => handleRowChange(index, 'doses', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.route}
//                   onChange={(e) => handleRowChange(index, 'route', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={row.remark}
//                   onChange={(e) => handleRowChange(index, 'remark', e.target.value)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="nacotic-drug-dispensed-form-buttons">
//         <button className="btn-blue" onClick={handleSave}>Save</button>
//       </div>
//     </>
//   );
// };

// export default NarcoticDrugDispensedForm;


import React, { useState, useRef, useEffect } from "react";
import { startResizing } from "../../TableHeadingResizing/resizableColumns"; 
import PopupTable from "../popup";
import axios from "axios";
import './NacoticDrugdispensed.css'

const FloatingInput = ({ label, type = "text", value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className={`nacotic-drug-dispensed-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <input
        type={type}
        className="nacotic-drug-dispensed-form-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="nacotic-drug-dispensed-form-floating-label">{label}</label>
    </div>
  );
};

// FloatingSelect component remains exactly the same
const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div className={`nacotic-drug-dispensed-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <select
        className="nacotic-drug-dispensed-form-floating-select"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== '');
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== '');
          if (props.onChange) props.onChange(e);
        }}
        {...props}
      >
        <option value="">{}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      <label className="nacotic-drug-dispensed-form-floating-label">{label}</label>
    </div>
  );
};

const NarcoticDrugDispensedForm = () => {
  const [mrNoData, setMrNoData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({
    uhid: "",
    ipNo: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    admissionDate: "",
    consultant: "",
    roomNumber: "",
    bedNo: "",
    address: "",
    adharCardId: "",
    illness: "",
    otherMedical: "",
    registeredRemarks: "",
    ipAdmmissionId:""
  });

  const [rows, setRows] = useState([
    { id: 21, drug: "", doses: "", route: "", remark: "" }
  ]);

  useEffect(() => {
    if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);

  const fetchMrno = async () => {
    try {
      const response = await axios.get(`http://192.168.1.46:4096/api/ip-admissions`);
      setMrNoData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelect = (data) => {
    console.log("Received data:", data); // Log the full object for debugging
  
    if (activePopup === "MrNo") {
      setFormData({
        ...formData,
        ipAdmmissionId: data?.ipAdmmissionId, // Fallback in case the field is missing
        uhid: data?.uhid,
        firstName: data?.firstName,
        lastName: data?.lastName,
        age: data?.age,
        gender: data?.realobj?.patient?.patient?.gender, // Check nested object structure
        address: data?.realobj?.patient?.patient?.address, // Validate structure
        adharCardId: data?.realobj?.patient?.patient?.adharCardId , // Fallback for undefined fields
        ipNo: data?.realobj?.patient?.inPatientId, // Corrected structure
        admissionDate: data?.realobj?.admissionDate,
        consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName, // Nested object check
        roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber, // Validate roomDetails structure
        bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo, // Ensure bedDTO exists
      });
  
      console.log("FormData after update:", formData.ipAdmmissionId);
    }
    setActivePopup(null);
  };
  

  const handleSave = async () => {
    try {
      const payload = {
        otherMedical: formData.otherMedical,
        remark: formData.registeredRemarks,
        illness: formData.illness,
        ipAdmissionDTO: {
          ipAdmmissionId: formData.ipAdmmissionId
        },
        addItems: rows.map(row => ({
          addItemId: row.id,
          doses: row.doses,
          route: row.route,
          remark: row.remark
        }))
      };
      console.log(payload+"pppppppp");
      
      const response = await axios.post(
        'http://192.168.1.46:4096/api/narcotic-drug-dispensed',
        payload
      );

      if (response.status === 200 || response.status === 201) {
        alert('Data saved successfully!');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data. Please try again.');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRowChange = (index, field, value) => {
    setRows(prev => prev.map((row, i) => 
      i === index ? { ...row, [field]: value } : row
    ));
  };

  const handleAddRow = () => {
    setRows(prev => [...prev, { 
      id: prev.length + 1,
      drug: "",
      doses: "",
      route: "",
      remark: ""
    }]);
  };

  const handleDeleteRow = (index) => {
    setRows(prev => prev.filter((_, i) => i !== index));
  };

  const getPopupData = () => {
    if (activePopup === "MrNo") {
      return {
        columns: ["uhid", "firstName", "lastName"],
        data: Array.isArray(mrNoData)
          ? mrNoData.map((user) => ({
              uhid: user?.patient?.patient?.uhid,
              ipNo: user?.patient?.patient?.ipNo,
              firstName: user?.patient?.patient?.firstName,
              lastName: user?.patient?.patient?.lastName,
              age: user?.patient?.patient?.age,
              sex: user?.sex,
              roomNumber: user?.patient?.roomNumber,
              ipAdmmissionId:user?.ipAdmmissionId,
              realobj: user
            }))
          : [],
      };
    }
    return { columns: [], data: [] };
  };

  const { columns, data } = getPopupData();
  const tableRef = useRef(null);

  return (
    <>
      <div className="nacotic-drug-dispensed-form-container">
        <div className="nacotic-drug-dispensed-form-section">
          <div className="nacotic-drug-dispensed-form-header">Narcotic Drugs Dispensed</div>
          <div className="nacotic-drug-dispensed-form-grid">
            <div className="nacotic-drug-dispensed-form-search-field">
              <FloatingInput 
                label="MRNO" 
                name="uhid"
                value={formData.uhid}
                readOnly
              />
              <button 
                className="nacotic-drug-dispensed-form-search-icon"
                onClick={() => setActivePopup("MrNo")}
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
                </svg>
              </button>
            </div>
            <FloatingInput 
              label="Patient Name" 
              value={`${formData.firstName} ${formData.lastName}`} 
              readOnly
            />
            <FloatingInput 
              label="Age" 
              value={formData.age}
              readOnly
            />
            <FloatingInput 
              label="Reg Date" 
              type="date" 
              value={formData.admissionDate}
              readOnly
            />
            <FloatingInput 
              label="Gender" 
              value={formData.gender}
              readOnly
            />
            <FloatingInput 
              label="Address" 
              value={formData.address}
              readOnly
            />
            <FloatingInput 
              label="Aadhar No" 
              value={formData.adharCardId}
              readOnly
            />
            <FloatingInput 
              label="Consultant" 
              value={formData.consultant}
              readOnly
            />
            <FloatingInput 
              label="Room No/ Bed No"
              value={`${formData.roomNumber} / ${formData.bedNo}`}
              readOnly
            />
            <FloatingInput 
              label="Description Of lliness"
              name="illness"
              value={formData.illness}
              onChange={handleFormChange}
            />
            <div className="nacotic-drug-dispensed-form-search-field">
              <FloatingSelect 
                label="Whether Registered With Any Other Registered Medical:"
                name="otherMedical"
                value={formData.otherMedical}
                onChange={handleFormChange}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ]}
              />
            </div>
            <div className="nacotic-drug-dispensed-form-search-field">
              <FloatingInput 
                label="Registered Remarks:"
                name="registeredRemarks"
                value={formData.registeredRemarks}
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>

        {activePopup && (
          <PopupTable
            columns={columns}
            data={data}
            onSelect={handleSelect}
            onClose={() => setActivePopup(null)}
          />
        )}
      </div>

      <table ref={tableRef} className="nacotic-drug-dispensed-form-table">
        <thead>
          <tr>
            <th>Actions</th>
            <th>SN</th>
            <th>Drug</th>
            <th>Dose</th>
            <th>Route</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <button
                  className="nacotic-drug-dispensed-form-add-btn"
                  onClick={handleAddRow}
                >
                  Add
                </button>
                <button
                  className="nacotic-drug-dispensed-form-del-btn"
                  onClick={() => handleDeleteRow(index)}
                  disabled={rows.length <= 1}
                >
                  Del
                </button>
              </td>
              <td>{row.id}</td>
              <td>
                <input
                  type="text"
                  value={row.drug}
                  onChange={(e) => handleRowChange(index, 'drug', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.doses}
                  onChange={(e) => handleRowChange(index, 'doses', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.route}
                  onChange={(e) => handleRowChange(index, 'route', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.remark}
                  onChange={(e) => handleRowChange(index, 'remark', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="nacotic-drug-dispensed-form-buttons">
        <button className="btn-blue" onClick={handleSave}>Save</button>
      </div>
    </>
  );
};

export default NarcoticDrugDispensedForm;