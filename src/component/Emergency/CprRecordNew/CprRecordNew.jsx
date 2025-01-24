// import React, { useState, useRef,useEffect } from "react";
// import "./CprRecordNew.css";
// import PopupTable from "../popup";
// import axios from "axios";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns";
// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };
//   return (
//     <div
//       className={`CprRecordNew-floating-field ${
//         isFocused || hasValue ? "active" : ""
//       }`}
//     >
//       <input
//         type={type}
//         className="CprRecordNew-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="CprRecordNew-floating-label">{label}</label>
//     </div>
//   );
// };
// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);
//   return (
//     <div
//       className={`CprRecordNew-floating-field ${
//         isFocused || hasValue ? "active" : ""
//       }`}
//     >
//       <select
//         className="CprRecordNew-floating-select"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value !== "");
//         }}
//         onChange={(e) => setHasValue(e.target.value !== "")}
//         {...props}
//       >
//         <option value="">{}</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       <label className="CprRecordNew-floating-label">{label}</label>
//     </div>
//   );
// };
// const CprRecordNew = () => {
//   const [mrNoData, setMrNoData] = useState([]);
//       const [activePopup, setActivePopup] = useState(null);
//       const [formData, setFormData] = useState({
//     uhid: "",
//     ipNo: "",
//     patientName: "",
//     age: "",
//     sex: "",
//     admissionDate: "",
//     consultant: "",
//     roomBedNo: "",
//     eyesOpen: "",
//     eyeClosedBy: "",
//     bestVerbalResponse: "",
//     ettubeOfTrochosTubeT: "",
//     bestMotorResponse: "",
//     usuallyRecordBestArmResponse: "",
//     totalScore: "",
//     bpSystolic: "",
//     bpDiastolic: "",
//     pulse: "",
//     respiratoryRate: "",
//     rightSizeReaction: "",
//     leftSizeReaction: "",
//     arms: "",
//     legs: "",
//   });
//  useEffect(() => {
//         if (activePopup === "MrNo") {
//             fetchMrno();
//          }
//       }, [activePopup]);
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Form Submitted:", formData);
//         try {
//           const response = await fetch("http://192.168.1.36:4068/api/gcs-sheets", { 
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(formData),
//           });
//           if (!response.ok) {
//             throw new Error("Failed to submit form data");
//           }
//           const result = await response.json();
//           console.log("Form submission success:", result);
//           alert("Form submitted successfully!");
//         } catch (error) {
//           console.error("Error submitting form data:", error);
//           alert("Failed to submit form.");
//         }
//       };
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const fieldValue = type === "checkbox" ? checked : value;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: fieldValue,
//     }));
//   }
//   const fetchMrno = async () => {
//     try {
//         const response = await axios.get(`http://192.168.1.36:4068/api/ip-admissions`);
//         setMrNoData(response.data);
//         console.log(mrNoData);
//         console.log(data)
        
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// };
// const handleSelect = (data) => {
//   console.log(data ,"selected data");
//   if (activePopup === "MrNo") {
//       setFormData((prevFormData) => ({
//           ...prevFormData,
//           uhid: data.uhid,
//           firstName: data.firstName,
//           lastName: data.lastName,
//           age:data.age,
//           gender:data?.realobj?.patient?.patient?.gender,
//           address:data?.realobj?.patient?.patient?.address,
//           adharCardId:data?.realobj?.patient?.patient?.adharCardId,
//           ipNo:data?.realobj?.patient?.inPatientId,
//           admissionDate:data?.realobj?.admissionDate,
//           consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
//           roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
//           bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
//               }));
//   }
//   setActivePopup(null);
// };
// const getPopupData = () => {
//   if (activePopup === "MrNo") {
//     const popupData = {
//       columns: ["uhid", "firstName", "lastName"],
//       data: Array.isArray(mrNoData)
//         ? mrNoData.map((user) => ({
//             uhid: user?.patient?.patient?.uhid,
//             ipNo: user?.patient?.patient?.ipNo,
//             firstName: user?.patient?.patient?.firstName,
//             lastName: user?.patient?.patient?.lastName,
//             age: user?.patient?.patient?.age,
//             sex:user?.patient?.patient?.sex,
//             roomNumber:user?.patient?.roomNumber,
//             realobj:user
//           }))
//         : [],
//     };
//     console.log("Popup Data:", popupData);
//     return popupData;
//   }
//   return { columns: [], data: [] };
// };
// const { columns, data } = getPopupData();
//   const [columnWidths, setColumnWidths] = useState({});
//   const tableRef = useRef(null);
//   const [test, setTest] = useState([
//     {
//       sn: 1,
//       drug: "",
//       dose: "",
//       route: "",
//       remarks: "",
//     },
//   ]);
//   const handleAddRow = () => {
//     setTest((prevRows) => [
//       ...prevRows,
//       { sn: prevRows.length + 1, drug: "", dose: "", route: "", remarks: "" },
//     ]);
//   };
//   const handleDeleteRow = (index) => {
//     setTest((prevRows) =>
//       prevRows
//         .filter((_, i) => i !== index) // Remove the row at the given index
//         .map((row, idx) => ({ ...row, sn: idx + 1 })) // Recalculate `sn` for each row
//     );
//   };
  
//   return (
//     <>
//       <div className="CprRecordNew-container">
//         <div className="CprRecordNew-section">
//           <div className="CprRecordNew-header">CPR Records New</div>
//           <div className="CprRecordNew-grid">
//             {/* <FloatingInput label="MR No" /> */}

//             <div className="CprRecordNew-search-field">
//             <FloatingInput label="MRNO" type="text" name="mrno" value={formData.uhid}/>
//             <button className="CprRecordNew-search-icon" onClick={() => setActivePopup("MrNo")}>
//               <svg viewBox="0 0 24 24" width="16" height="16">
//                 <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//               </svg>
//             </button>
//             </div>
//             <FloatingInput label="Patient Name" value={`${formData.firstName} ${formData.lastName}`}/>
//             <FloatingInput label="Age" value={formData.age}/>
//             <FloatingInput label="Reg Date" type="date" value={formData.admissionDate}/>
//             <FloatingInput label="Gender" value={formData.gender}/>
//             <FloatingInput label="Address" value={formData.address}/>
//             <FloatingInput label="AADHAR No" value={formData.adharCardId}/>
//             <FloatingInput label="Consultant" value={formData.consultant} />
//             <FloatingInput label="Room No / Bed No" value={`${formData.roomNumber} / ${formData.bedNo}`}/>
//             <FloatingInput label="Description Of Illness"  />
//             <FloatingSelect 
//               label="Whether Registered With Other Registered Medical" 
//               options={[
//                 { value: "select", label: "select" },
//                 { value: "Yes", label: "Yes" },
//                 { value: "No", label: "No" },
//               ]}
//             />
//             <FloatingInput label="Regstered Remarks" />
//           </div>
          
//         </div>
//         <div className="CprRecordNew-buttons">
//         <button className="btn-blue">Add</button>
//         {/* <button className="btn-red">Close</button> */}
//       </div>
//         <div className="CprRecordNew-services-table">
//           <table ref={tableRef}>
//             <thead>
//               <tr>
//                 {["Actions", "SN", "Drug", "Dose", "Route", "Remarks"].map(
//                   (header, index) => (
//                     <th
//                       key={index}
//                       style={{ width: columnWidths[index] }}
//                       className="resizable-th"
//                     >
//                       <div className="header-content">
//                         <span>{header}</span>
//                         <div
//                           className="resizer"
//                           onMouseDown={startResizing(
//                             tableRef,
//                             setColumnWidths
//                           )(index)}
//                         ></div>
//                       </div>
//                     </th>
//                   )
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {test.map((row, index) => (
//                 <tr key={index}>
//                   <td>
//                     <div className="table-actions">
//                       <button
//                         className="CprRecordNew-add-btn"
//                         onClick={() => handleAddRow("package")}
//                       >
//                         Add
//                       </button>
//                       <button
//                         className="CprRecordNew-del-btn"
//                         onClick={() => handleDeleteRow(index)}
//                         disabled={test.length <= 1}
//                       >
//                         Del
//                       </button>
//                     </div>
//                   </td>
//                   <td>{row.sn}</td>
//                   <td>{row.drug}</td>
//                   <td>{row.dose}</td>
//                   <td>{row.route}</td>
//                   <td>{row.remarks}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {activePopup && (
//               <PopupTable
//               columns={columns}
//               data={data}
//               onSelect={handleSelect}
//                onClose={() => setActivePopup(null)}
//               />
//                       )}
//         </div>
//       </div>
      
//     </>
//   );
// };
// export default CprRecordNew;































// import React, { useState, useRef, useEffect } from "react";
// import "./CprRecordNew.css";
// import PopupTable from "../popup";
// import axios from "axios";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns";

// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };

//   return (
//     <div className={`CprRecordNew-floating-field ${isFocused || hasValue ? "active" : ""}`}>
//       <input
//         type={type}
//         className="CprRecordNew-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="CprRecordNew-floating-label">{label}</label>
//     </div>
//   );
// };

// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   return (
//     <div className={`CprRecordNew-floating-field ${isFocused || hasValue ? "active" : ""}`}>
//       <select
//         className="CprRecordNew-floating-select"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value !== "");
//         }}
//         onChange={(e) => {
//           setHasValue(e.target.value !== "");
//           if (props.onChange) props.onChange(e);
//         }}
//         {...props}
//       >
//         <option value="">{}</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       <label className="CprRecordNew-floating-label">{label}</label>
//     </div>
//   );
// };

// const CprRecordNew = () => {
//   const [mrNoData, setMrNoData] = useState([]);
//   const [activePopup, setActivePopup] = useState(null);
//   const [formData, setFormData] = useState({
//     uhid: "",
//     ipNo: "",
//     patientName: "",
//     age: "",
//     sex: "",
//     admissionDate: "",
//     consultant: "",
//     roomBedNo: "",
//     firstName: "",
//     lastName: "",
//     gender: "",
//     address: "",
//     adharCardId: "",
//     roomNumber: "",
//     bedNo: "",
//     descriptionOfIllness: "",
//     whetherRegisterdWitAnyOtherRegisterdMedical: "",
//     registerRemark: "",
//     patientRegistrationId: null,
//     doctorId: null,
//     roomId: null
//   });

//   const [test, setTest] = useState([
//     {
//       sn: 1,
//       drug: "",
//       dose: "",
//       route: "",
//       remarks: "",
//     },
//   ]);

//   useEffect(() => {
//     if (activePopup === "MrNo") {
//       fetchMrno();
//     }
//   }, [activePopup]);

//   const handleSave = async () => {
//     try {
//       const payload = {
//         descriptionOfIllness: formData.descriptionOfIllness,
//         whetherRegisterdWitAnyOtherRegisterdMedical: formData.whetherRegisterdWitAnyOtherRegisterdMedical,
//         registrationDate: new Date().toISOString().split('T')[0],
//         registerRemark: formData.registerRemark,
//         patientRegistrationDTO: {
//           patientRegistrationId: formData.patientRegistrationId || 1
//         },
//         addDoctorDTO: {
//           doctorId: formData.doctorId || 2
//         },
//         roomDetailsDTO: {
//           roomId: formData.roomId || 6
//         },
//         cprRecordMedicationDTO: {
//           cprrecordMedicationId: 1
//         }
//       };

//       const response = await axios.post('http://192.168.1.36:4068/api/CPRRecordsNew', payload);
      
//       if (response.status === 200 || response.status === 201) {
//         alert('Record saved successfully!');
//       } else {
//         throw new Error('Failed to save record');
//       }
//     } catch (error) {
//       console.error('Error saving record:', error);
//       alert('Failed to save record. Please try again.');
//     }
//   };

//   const fetchMrno = async () => {
//     try {
//       const response = await axios.get(`http://192.168.1.36:4068/api/ip-admissions`);
//       setMrNoData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const fieldValue = type === "checkbox" ? checked : value;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: fieldValue,
//     }));
//   };

//   const handleSelect = (data) => {
//     if (activePopup === "MrNo") {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         uhid: data.uhid,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         age: data.age,
//         gender: data?.realobj?.patient?.patient?.gender,
//         address: data?.realobj?.patient?.patient?.address,
//         adharCardId: data?.realobj?.patient?.patient?.adharCardId,
//         ipNo: data?.realobj?.patient?.inPatientId,
//         admissionDate: data?.realobj?.admissionDate,
//         consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
//         roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
//         bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
//         patientRegistrationId: data?.realobj?.patient?.patientRegistrationId,
//         doctorId: data?.realobj?.admissionUnderDoctorDetail?.doctorId,
//         roomId: data?.realobj?.roomDetails?.roomDTO?.roomId
//       }));
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
//               sex: user?.patient?.patient?.sex,
//               roomNumber: user?.patient?.roomNumber,
//               realobj: user
//             }))
//           : [],
//       };
//       return popupData;
//     }
//     return { columns: [], data: [] };
//   };

//   const { columns, data } = getPopupData();
//   const [columnWidths, setColumnWidths] = useState({});
//   const tableRef = useRef(null);

//   const handleAddRow = () => {
//     setTest((prevRows) => [
//       ...prevRows,
//       { sn: prevRows.length + 1, drug: "", dose: "", route: "", remarks: "" },
//     ]);
//   };

//   const handleDeleteRow = (index) => {
//     setTest((prevRows) =>
//       prevRows
//         .filter((_, i) => i !== index)
//         .map((row, idx) => ({ ...row, sn: idx + 1 }))
//     );
//   };

//   return (
//     <>
//       <div className="CprRecordNew-container">
//         <div className="CprRecordNew-section">
//           <div className="CprRecordNew-header">CPR Records New</div>
//           <div className="CprRecordNew-grid">
//             <div className="CprRecordNew-search-field">
//               <FloatingInput 
//                 label="MRNO" 
//                 type="text" 
//                 name="mrno" 
//                 value={formData.uhid}
//               />
//               <button 
//                 className="CprRecordNew-search-icon" 
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
//               label="AADHAR No" 
//               value={formData.adharCardId}
//               readOnly
//             />
//             <FloatingInput 
//               label="Consultant" 
//               value={formData.consultant}
//               readOnly
//             />
//             <FloatingInput 
//               label="Room No / Bed No" 
//               value={`${formData.roomNumber} / ${formData.bedNo}`}
//               readOnly
//             />
//             <FloatingInput 
//               label="Description Of Illness" 
//               name="descriptionOfIllness"
//               value={formData.descriptionOfIllness}
//               onChange={handleChange}
//             />
//             <FloatingSelect 
//               label="Whether Registered With Other Registered Medical" 
//               name="whetherRegisterdWitAnyOtherRegisterdMedical"
//               value={formData.whetherRegisterdWitAnyOtherRegisterdMedical}
//               onChange={handleChange}
//               options={[
//                 { value: "select", label: "select" },
//                 { value: "Yes", label: "Yes" },
//                 { value: "No", label: "No" },
//               ]}
//             />
//             <FloatingInput 
//               label="Registered Remarks" 
//               name="registerRemark"
//               value={formData.registerRemark}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="CprRecordNew-buttons">
//           <button className="btn-blue" onClick={handleSave}>Save</button>
//         </div>
//         <div className="CprRecordNew-services-table">
//           <table ref={tableRef}>
//             <thead>
//               <tr>
//                 {["Actions", "SN", "Drug", "Dose", "Route", "Remarks"].map(
//                   (header, index) => (
//                     <th
//                       key={index}
//                       style={{ width: columnWidths[index] }}
//                       className="resizable-th"
//                     >
//                       <div className="header-content">
//                         <span>{header}</span>
//                         <div
//                           className="resizer"
//                           onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
//                         ></div>
//                       </div>
//                     </th>
//                   )
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {test.map((row, index) => (
//                 <tr key={index}>
//                   <td>
//                     <div className="table-actions">
//                       <button
//                         className="CprRecordNew-add-btn"
//                         onClick={handleAddRow}
//                       >
//                         Add
//                       </button>
//                       <button
//                         className="CprRecordNew-del-btn"
//                         onClick={() => handleDeleteRow(index)}
//                         disabled={test.length <= 1}
//                       >
//                         Del
//                       </button>
//                     </div>
//                   </td>
//                   <td>{row.sn}</td>
//                   <td><input type="text" /></td>
//               <td><input type="text" /></td>
//               <td><input type="text" /></td>
//               <td><input type="text" /></td>
                
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {activePopup && (
//             <PopupTable
//               columns={columns}
//               data={data}
//               onSelect={handleSelect}
//               onClose={() => setActivePopup(null)}
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CprRecordNew;


// import React, { useState, useRef, useEffect } from "react";
// import "./CprRecordNew.css";
// import PopupTable from "../popup";
// import axios from "axios";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns";

// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };

//   return (
//     <div className={`CprRecordNew-floating-field ${isFocused || hasValue ? "active" : ""}`}>
//       <input
//         type={type}
//         className="CprRecordNew-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="CprRecordNew-floating-label">{label}</label>
//     </div>
//   );
// };

// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   return (
//     <div className={`CprRecordNew-floating-field ${isFocused || hasValue ? "active" : ""}`}>
//       <select
//         className="CprRecordNew-floating-select"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value !== "");
//         }}
//         onChange={(e) => {
//           setHasValue(e.target.value !== "");
//           if (props.onChange) props.onChange(e);
//         }}
//         {...props}
//       >
//         <option value="">{}</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       <label className="CprRecordNew-floating-label">{label}</label>
//     </div>
//   );
// };

// const CprRecordNew = () => {
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
//     descriptionOfIllness: "",
//     whetherRegisterdWitAnyOtherRegisterdMedical: "",
//     registerRemark: "",
//   });

//   const [medications, setMedications] = useState([
//     {
//       sn: 1,
//       drug: "",
//       dose: "",
//       route: "",
//       remarks: "",
//     },
//   ]);

//   useEffect(() => {
//     if (activePopup === "MrNo") {
//       fetchMrno();
//     }
//   }, [activePopup]);

//   const fetchMrno = async () => {
//     try {
//       const response = await axios.get('http://192.168.1.46:4096/api/ip-admissions');
//       setMrNoData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const payload = {
//         descriptionOfIllness: formData.descriptionOfIllness,
//         whetherRegisterdWitAnyOtherRegisterdMedical: formData.whetherRegisterdWitAnyOtherRegisterdMedical,
//         registrationDate: formData.admissionDate,
//         registerRemark: formData.registerRemark,
//         patientRegistrationDTO: {
//           patientRegistrationId: 1 // You might want to get this from your data
//         },
//         addDoctorDTO: {
//           doctorId: 2 // You might want to get this from your data
//         },
//         roomDetailsDTO: {
//           roomId: 6 // You might want to get this from your data
//         },
//         cprRecordMedicationDTO: {
//           cprrecordMedicationId: 1,
//           medications: medications.map(med => ({
//             drug: med.drug,
//             dose: med.dose,
//             route: med.route,
//             remarks: med.remarks
//           }))
//         }
//       };

//       const response = await axios.post('http://192.168.1.46:4096/api/CPRRecordsNew', payload);
//       if (response.status === 200 || response.status === 201) {
//         alert('CPR Record saved successfully!');
//       }
//     } catch (error) {
//       console.error('Error saving CPR Record:', error);
//       alert('Failed to save CPR Record. Please try again.');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleMedicationChange = (index, field, value) => {
//     setMedications(prev => prev.map((med, i) => 
//       i === index ? { ...med, [field]: value } : med
//     ));
//   };

//   const handleSelect = (data) => {
//     if (activePopup === "MrNo") {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         uhid: data.uhid,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         age: data.age,
//         gender: data?.realobj?.patient?.patient?.gender,
//         address: data?.realobj?.patient?.patient?.address,
//         adharCardId: data?.realobj?.patient?.patient?.adharCardId,
//         ipNo: data?.realobj?.patient?.inPatientId,
//         admissionDate: data?.realobj?.admissionDate,
//         consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
//         roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
//         bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
//       }));
//     }
//     setActivePopup(null);
//   };

//   const handleAddRow = () => {
//     setMedications(prev => [
//       ...prev,
//       { sn: prev.length + 1, drug: "", dose: "", route: "", remarks: "" }
//     ]);
//   };

//   const handleDeleteRow = (index) => {
//     setMedications(prev => 
//       prev.filter((_, i) => i !== index)
//         .map((row, idx) => ({ ...row, sn: idx + 1 }))
//     );
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
//               sex: user?.patient?.patient?.sex,
//               roomNumber: user?.patient?.roomNumber,
//               realobj: user
//             }))
//           : [],
//       };
//     }
//     return { columns: [], data: [] };
//   };

//   const { columns, data } = getPopupData();
//   const [columnWidths, setColumnWidths] = useState({});
//   const tableRef = useRef(null);

//   return (
//     <div className="CprRecordNew-container">
//       <div className="CprRecordNew-section">
//         <div className="CprRecordNew-header">CPR Records New</div>
//         <div className="CprRecordNew-grid">
//           <div className="CprRecordNew-search-field">
//             <FloatingInput 
//               label="MRNO" 
//               type="text" 
//               name="uhid" 
//               value={formData.uhid}
//               onChange={handleChange}
//             />
//             <button 
//               className="CprRecordNew-search-icon" 
//               onClick={() => setActivePopup("MrNo")}
//             >
//               <svg viewBox="0 0 24 24" width="16" height="16">
//                 <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//               </svg>
//             </button>
//           </div>
//           <FloatingInput 
//             label="Patient Name" 
//             value={`${formData.firstName} ${formData.lastName}`} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Age" 
//             value={formData.age} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Reg Date" 
//             type="date" 
//             value={formData.admissionDate} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Gender" 
//             value={formData.gender} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Address" 
//             value={formData.address} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="AADHAR No" 
//             value={formData.adharCardId} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Consultant" 
//             value={formData.consultant} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Room No / Bed No" 
//             value={`${formData.roomNumber} / ${formData.bedNo}`} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Description Of Illness" 
//             name="descriptionOfIllness"
//             value={formData.descriptionOfIllness}
//             onChange={handleChange}
//           />
//           <FloatingSelect 
//             label="Whether Registered With Other Registered Medical"
//             name="whetherRegisterdWitAnyOtherRegisterdMedical"
//             value={formData.whetherRegisterdWitAnyOtherRegisterdMedical}
//             onChange={handleChange}
//             options={[
//               { value: "select", label: "select" },
//               { value: "Yes", label: "Yes" },
//               { value: "No", label: "No" },
//             ]}
//           />
//           <FloatingInput 
//             label="Registered Remarks"
//             name="registerRemark"
//             value={formData.registerRemark}
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div className="CprRecordNew-buttons">
//         <button className="btn-blue" onClick={handleSave}>Save</button>
//       </div>

//       <div className="CprRecordNew-services-table">
//         <table ref={tableRef}>
//           <thead>
//             <tr>
//               {["Actions", "SN", "Drug", "Dose", "Route", "Remarks"].map((header, index) => (
//                 <th
//                   key={index}
//                   style={{ width: columnWidths[index] }}
//                   className="resizable-th"
//                 >
//                   <div className="header-content">
//                     <span>{header}</span>
//                     <div
//                       className="resizer"
//                       onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
//                     ></div>
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {medications.map((row, index) => (
//               <tr key={index}>
//                 <td>
//                   <div className="table-actions">
//                     <button
//                       className="CprRecordNew-add-btn"
//                       onClick={handleAddRow}
//                     >
//                       Add
//                     </button>
//                     <button
//                       className="CprRecordNew-del-btn"
//                       onClick={() => handleDeleteRow(index)}
//                       disabled={medications.length <= 1}
//                     >
//                       Del
//                     </button>
//                   </div>
//                 </td>
//                 <td>{row.sn}</td>
//                 <td>
//                   <input
//                     type="text"
//                     value={row.drug}
//                     onChange={(e) => handleMedicationChange(index, 'drug', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={row.dose}
//                     onChange={(e) => handleMedicationChange(index, 'dose', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={row.route}
//                     onChange={(e) => handleMedicationChange(index, 'route', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={row.remarks}
//                     onChange={(e) => handleMedicationChange(index, 'remarks', e.target.value)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {activePopup && (
//         <PopupTable
//           columns={columns}
//           data={data}
//           onSelect={handleSelect}
//           onClose={() => setActivePopup(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default CprRecordNew;



// import React, { useState, useRef, useEffect } from "react";
// import "./CprRecordNew.css";
// import PopupTable from "../popup";
// import axios from "axios";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns";

// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };

//   return (
//     <div className={`CprRecordNew-floating-field ${isFocused || hasValue ? "active" : ""}`}>
//       <input
//         type={type}
//         className="CprRecordNew-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="CprRecordNew-floating-label">{label}</label>
//     </div>
//   );
// };

// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   return (
//     <div className={`CprRecordNew-floating-field ${isFocused || hasValue ? "active" : ""}`}>
//       <select
//         className="CprRecordNew-floating-select"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value !== "");
//         }}
//         onChange={(e) => {
//           setHasValue(e.target.value !== "");
//           if (props.onChange) props.onChange(e);
//         }}
//         {...props}
//       >
//         <option value="">{}</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       <label className="CprRecordNew-floating-label">{label}</label>
//     </div>
//   );
// };

// const CprRecordNew = () => {
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
//     descriptionOfIllness: "",
//     whetherRegisterdWitAnyOtherRegisterdMedical: "",
//     registerRemark: "",
//     patientRegistrationId: "",
//     doctorId: "",
//     roomId: ""
//   });

//   const [medications, setMedications] = useState([
//     {
//       sn: 1,
//       drug: "",
//       dose: "",
//       route: "",
//       remarks: "",
//     },
//   ]);

//   useEffect(() => {
//     if (activePopup === "MrNo") {
//       fetchMrno();
//     }
//   }, [activePopup]);

//   const fetchMrno = async () => {
//     try {
//       const response = await axios.get('http://192.168.1.46:4096/api/ip-admissions');
//       setMrNoData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       // Create an array of medication payloads
//       const medicationPayloads = medications.map(med => ({
//         descriptionOfIllness: formData.descriptionOfIllness,
//         whetherRegisterdWitAnyOtherRegisterdMedical: formData.whetherRegisterdWitAnyOtherRegisterdMedical,
//         registrationDate: formData.admissionDate,
//         registerRemark: formData.registerRemark,
//         drug: med.drug,
//         dose: med.dose,
//         route: med.route,
//         remarks: med.remarks,
//         patientRegistrationDTO: {
//           patientRegistrationId: formData.patientRegistrationId || 1
//         },
//         addDoctorDTO: {
//           doctorId: formData.doctorId || 2
//         },
//         roomDetailsDTO: {
//           roomId: formData.roomId || 6
//         }
//       }));

//       // Save each medication record
//       for (const payload of medicationPayloads) {
//         const response = await axios.post('http://192.168.212.219:4068/api/CPRRecordsNew', payload);
//         if (!(response.status === 200 || response.status === 201)) {
//           throw new Error('Failed to save record');
//         }
//       }

//       alert('CPR Records saved successfully!');
//     } catch (error) {
//       console.error('Error saving CPR Records:', error);
//       alert('Failed to save CPR Records. Please try again.');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleMedicationChange = (index, field, value) => {
//     setMedications(prev => prev.map((med, i) => 
//       i === index ? { ...med, [field]: value } : med
//     ));
//   };

//   const handleSelect = (data) => {
//     if (activePopup === "MrNo") {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         uhid: data.uhid,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         age: data.age,
//         gender: data?.realobj?.patient?.patient?.gender,
//         address: data?.realobj?.patient?.patient?.address,
//         adharCardId: data?.realobj?.patient?.patient?.adharCardId,
//         ipNo: data?.realobj?.patient?.inPatientId,
//         admissionDate: data?.realobj?.admissionDate,
//         consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
//         roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
//         bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
//         patientRegistrationId: data?.realobj?.patient?.patient?.patientRegistrationId,
//         doctorId: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorId,
//         roomId: data?.realobj?.roomDetails?.roomDTO?.roomId
//       }));
//     }
//     setActivePopup(null);
//   };

//   const handleAddRow = () => {
//     setMedications(prev => [
//       ...prev,
//       { sn: prev.length + 1, drug: "", dose: "", route: "", remarks: "" }
//     ]);
//   };

//   const handleDeleteRow = (index) => {
//     setMedications(prev => 
//       prev.filter((_, i) => i !== index)
//         .map((row, idx) => ({ ...row, sn: idx + 1 }))
//     );
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
//               sex: user?.patient?.patient?.sex,
//               roomNumber: user?.patient?.roomNumber,
//               realobj: user
//             }))
//           : [],
//       };
//     }
//     return { columns: [], data: [] };
//   };

//   const { columns, data } = getPopupData();
//   const [columnWidths, setColumnWidths] = useState({});
//   const tableRef = useRef(null);

//   return (
//     <div className="CprRecordNew-container">
//       <div className="CprRecordNew-section">
//         <div className="CprRecordNew-header">CPR Records New</div>
//         <div className="CprRecordNew-grid">
//           <div className="CprRecordNew-search-field">
//             <FloatingInput 
//               label="MRNO" 
//               type="text" 
//               name="uhid" 
//               value={formData.uhid}
//               onChange={handleChange}
//             />
//             <button 
//               className="CprRecordNew-search-icon" 
//               onClick={() => setActivePopup("MrNo")}
//             >
//               <svg viewBox="0 0 24 24" width="16" height="16">
//                 <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//               </svg>
//             </button>
//           </div>
//           <FloatingInput 
//             label="Patient Name" 
//             value={`${formData.firstName} ${formData.lastName}`} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Age" 
//             value={formData.age} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Reg Date" 
//             type="date" 
//             value={formData.admissionDate} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Gender" 
//             value={formData.gender} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Address" 
//             value={formData.address} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="AADHAR No" 
//             value={formData.adharCardId} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Consultant" 
//             value={formData.consultant} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Room No / Bed No" 
//             value={`${formData.roomNumber} / ${formData.bedNo}`} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Description Of Illness" 
//             name="descriptionOfIllness"
//             value={formData.descriptionOfIllness}
//             onChange={handleChange}
//           />
//           <FloatingSelect 
//             label="Whether Registered With Other Registered Medical"
//             name="whetherRegisterdWitAnyOtherRegisterdMedical"
//             value={formData.whetherRegisterdWitAnyOtherRegisterdMedical}
//             onChange={handleChange}
//             options={[
//               { value: "select", label: "select" },
//               { value: "Yes", label: "Yes" },
//               { value: "No", label: "No" },
//             ]}
//           />
//           <FloatingInput 
//             label="Registered Remarks"
//             name="registerRemark"
//             value={formData.registerRemark}
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div className="CprRecordNew-buttons">
//         <button className="btn-blue" onClick={handleSave}>Save</button>
//       </div>

//       <div className="CprRecordNew-services-table">
//         <table ref={tableRef}>
//           <thead>
//             <tr>
//               {["Actions", "SN", "Drug", "Dose", "Route", "Remarks"].map((header, index) => (
//                 <th
//                   key={index}
//                   style={{ width: columnWidths[index] }}
//                   className="resizable-th"
//                 >
//                   <div className="header-content">
//                     <span>{header}</span>
//                     <div
//                       className="resizer"
//                       onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
//                     ></div>
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {medications.map((row, index) => (
//               <tr key={index}>
//                 <td>
//                   <div className="table-actions">
//                     <button
//                       className="CprRecordNew-add-btn"
//                       onClick={handleAddRow}
//                     >
//                       Add
//                     </button>
//                     <button
//                       className="CprRecordNew-del-btn"
//                       onClick={() => handleDeleteRow(index)}
//                       disabled={medications.length <= 1}
//                     >
//                       Del
//                     </button>
//                   </div>
//                 </td>
//                 <td>{row.sn}</td>
//                 <td>
//                   <input
//                     type="text"
//                     value={row.drug}
//                     onChange={(e) => handleMedicationChange(index, 'drug', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={row.dose}
//                     onChange={(e) => handleMedicationChange(index, 'dose', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={row.route}
//                     onChange={(e) => handleMedicationChange(index, 'route', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={row.remarks}
//                     onChange={(e) => handleMedicationChange(index, 'remarks', e.target.value)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {activePopup && (
//         <PopupTable
//           columns={columns}
//           data={data}
//           onSelect={handleSelect}
//           onClose={() => setActivePopup(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default CprRecordNew;


// import React, { useState, useRef, useEffect } from "react";
// import "./CprRecordNew.css";
// import PopupTable from "../popup";
// import axios from "axios";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns";

// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };

//   return (
//     <div className={`CprRecordNew-floating-field ${isFocused || hasValue ? "active" : ""}`}>
//       <input
//         type={type}
//         className="CprRecordNew-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="CprRecordNew-floating-label">{label}</label>
//     </div>
//   );
// };

// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   return (
//     <div className={`CprRecordNew-floating-field ${isFocused || hasValue ? "active" : ""}`}>
//       <select
//         className="CprRecordNew-floating-select"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value !== "");
//         }}
//         onChange={(e) => {
//           setHasValue(e.target.value !== "");
//           if (props.onChange) props.onChange(e);
//         }}
//         {...props}
//       >
//         <option value="">{}</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       <label className="CprRecordNew-floating-label">{label}</label>
//     </div>
//   );
// };

// const CprRecordNew = () => {
//   const [mrNoData, setMrNoData] = useState([]);
//   const [activePopup, setActivePopup] = useState(null);
//   const [isSaving, setIsSaving] = useState(false);
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
//     descriptionOfIllness: "",
//     whetherRegisterdWitAnyOtherRegisterdMedical: "",
//     registerRemark: "",
//     patientRegistrationId: "",
//     doctorId: "",
//     roomId: ""
//   });

//   const [medications, setMedications] = useState([
//     {
//       sn: 1,
//       drug: "",
//       dose: "",
//       route: "",
//       remarks: "",
//     },
//   ]);

//   // Create axios instance with default config
//   const axiosInstance = axios.create({
//     baseURL: 'http://192.168.1.46:4096',
//     timeout: 10000, // 10 seconds
//   });

//   // Add response interceptor
//   axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//       if (error.code === 'ECONNABORTED') {
//         alert('Request timed out. Please check your connection and try again.');
//       } else if (error.code === 'ERR_NETWORK') {
//         alert('Network error. Please check if the server is running and accessible.');
//       }
//       throw error;
//     }
//   );

//   // Retry mechanism
//   const retryAxios = async (fn, retries = 3, delay = 1000) => {
//     try {
//       return await fn();
//     } catch (error) {
//       if (retries === 0) throw error;
//       await new Promise(resolve => setTimeout(resolve, delay));
//       return retryAxios(fn, retries - 1, delay * 2);
//     }
//   };

//   useEffect(() => {
//     if (activePopup === "MrNo") {
//       fetchMrno();
//     }
//   }, [activePopup]);

//   const fetchMrno = async () => {
//     try {
//       const response = await axiosInstance.get('/api/ip-admissions');
//       setMrNoData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       alert('Failed to fetch patient data. Please try again.');
//     }
//   };

//   const handleSave = async () => {
//     if (!formData.patientRegistrationId) {
//       alert('Please select a patient first');
//       return;
//     }

//     setIsSaving(true);
//     try {
//       const medicationPayloads = medications.map(med => ({
//         descriptionOfIllness: formData.descriptionOfIllness,
//         whetherRegisterdWitAnyOtherRegisterdMedical: formData.whetherRegisterdWitAnyOtherRegisterdMedical,
//         registrationDate: formData.admissionDate,
//         registerRemark: formData.registerRemark,
//         drug: med.drug,
//         dose: med.dose,
//         route: med.route,
//         remarks: med.remarks,
//         patientRegistrationDTO: {
//           patientRegistrationId: formData.patientRegistrationId
//         },
//         addDoctorDTO: {
//           doctorId: formData.doctorId
//         },
//         // roomDetailsDTO: {
//         //   roomId: formData.roomId
//         // }
//       }));

//       const responses = await Promise.all(
//         medicationPayloads.map(payload => 
//           retryAxios(() => axiosInstance.post('/api/CPRRecordsNew', payload))
//         )
//       );

//       if (responses.every(response => response.status === 200 || response.status === 201)) {
//         alert('CPR Records saved successfully!');
//         // Optionally reset form or redirect
//       } else {
//         throw new Error('Some records failed to save');
//       }
//     } catch (error) {
//       console.error('Error saving CPR Records:', error);
      
//       if (error.response) {
//         alert(`Server error: ${error.response.data.message || 'Unknown error'}`);
//       } else if (error.request) {
//         alert('No response from server. Please check if the server is running.');
//       } else {
//         alert('Error saving CPR Records. Please try again.');
//       }
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleMedicationChange = (index, field, value) => {
//     setMedications(prev => prev.map((med, i) => 
//       i === index ? { ...med, [field]: value } : med
//     ));
//   };

//   const handleSelect = (data) => {
//     if (activePopup === "MrNo") {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         uhid: data.uhid,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         age: data.age,
//         gender: data?.realobj?.patient?.patient?.gender,
//         address: data?.realobj?.patient?.patient?.address,
//         adharCardId: data?.realobj?.patient?.patient?.adharCardId,
//         ipNo: data?.realobj?.patient?.inPatientId,
//         admissionDate: data?.realobj?.admissionDate,
//         consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
//         roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
//         bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
//         patientRegistrationId: data?.realobj?.patient?.patient?.patientRegistrationId,
//         doctorId: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorId,
//         roomId: data?.realobj?.roomDetails?.roomDTO?.roomId
//       }));
//     }
//     setActivePopup(null);
//   };

//   const handleAddRow = () => {
//     setMedications(prev => [
//       ...prev,
//       { sn: prev.length + 1, drug: "", dose: "", route: "", remarks: "" }
//     ]);
//   };

//   const handleDeleteRow = (index) => {
//     setMedications(prev => 
//       prev.filter((_, i) => i !== index)
//         .map((row, idx) => ({ ...row, sn: idx + 1 }))
//     );
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
//               sex: user?.patient?.patient?.sex,
//               roomNumber: user?.patient?.roomNumber,
//               realobj: user
//             }))
//           : [],
//       };
//     }
//     return { columns: [], data: [] };
//   };

//   const { columns, data } = getPopupData();
//   const [columnWidths, setColumnWidths] = useState({});
//   const tableRef = useRef(null);

//   return (
//     <div className="CprRecordNew-container">
//       <div className="CprRecordNew-section">
//         <div className="CprRecordNew-header">CPR Records New</div>
//         <div className="CprRecordNew-grid">
//           <div className="CprRecordNew-search-field">
//             <FloatingInput 
//               label="MRNO" 
//               type="text" 
//               name="uhid" 
//               value={formData.uhid}
//               onChange={handleChange}
//             />
//             <button 
//               className="CprRecordNew-search-icon" 
//               onClick={() => setActivePopup("MrNo")}
//             >
//               <svg viewBox="0 0 24 24" width="16" height="16">
//                 <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//               </svg>
//             </button>
//           </div>
//           <FloatingInput 
//             label="Patient Name" 
//             value={`${formData.firstName} ${formData.lastName}`} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Age" 
//             value={formData.age} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Reg Date" 
//             type="date" 
//             value={formData.admissionDate} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Gender" 
//             value={formData.gender} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Address" 
//             value={formData.address} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="AADHAR No" 
//             value={formData.adharCardId} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Consultant" 
//             value={formData.consultant} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Room No / Bed No" 
//             value={`${formData.roomNumber} / ${formData.bedNo}`} 
//             readOnly 
//           />
//           <FloatingInput 
//             label="Description Of Illness" 
//             name="descriptionOfIllness"
//             value={formData.descriptionOfIllness}
//             onChange={handleChange}
//           />
//           <FloatingSelect 
//             label="Whether Registered With Other Registered Medical"
//             name="whetherRegisterdWitAnyOtherRegisterdMedical"
//             value={formData.whetherRegisterdWitAnyOtherRegisterdMedical}
//             onChange={handleChange}
//             options={[
//               { value: "select", label: "select" },
//               { value: "Yes", label: "Yes" },
//               { value: "No", label: "No" },
//             ]}
//           />
//           <FloatingInput 
//             label="Registered Remarks"
//             name="registerRemark"
//             value={formData.registerRemark}
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div className="CprRecordNew-buttons">
//         <button 
//           className="btn-blue" 
//           onClick={handleSave}
//           disabled={isSaving}
//         >
//           {isSaving ? 'Saving...' : 'Save'}
//         </button>
//       </div>

//       <div className="CprRecordNew-services-table">
//         <table ref={tableRef}>
//           <thead>
//             <tr>
//               {["Actions", "SN", "Drug", "Dose", "Route", "Remarks"].map((header, index) => (
//                 <th
//                   key={index}
//                   style={{ width: columnWidths[index] }}
//                   className="resizable-th"
//                 >
//                   <div className="header-content">
//                     <span>{header}</span>
//                     <div
//                       className="resizer"
//                       onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
//                     ></div>
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {medications.map((row, index) => (
//               <tr key={index}>
//                 <td>
//                   <div className="table-actions">
//                     <button
//                       className="CprRecordNew-add-btn"
//                       onClick={handleAddRow}
//                     >
//                       Add
//                     </button>
//                     <button
//                       className="CprRecordNew-del-btn"
//                       onClick={() => handleDeleteRow(index)}
//                       disabled={medications.length <= 1}
//                     >
//                       Del
//                     </button>
//                   </div>
//                 </td>
//                 <td>{row.sn}</td>
//                 <td>
//                   <input
//                     type="text"
//                     value={row.drug}
//                     onChange={(e) => handleMedicationChange(index, 'drug', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={row.dose}
//                     onChange={(e) => handleMedicationChange(index, 'dose', e.target.value)}
//                   />
//                                   </td>
//                                   <td>
//                   <input
//                     type="text"
//                     value={row.route}
//                     onChange={(e) => handleMedicationChange(index, 'route', e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={row.remarks}
//                     onChange={(e) => handleMedicationChange(index, 'remarks', e.target.value)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {activePopup && (
//         <PopupTable
//           columns={columns}
//           data={data}
//           onSelect={handleSelect}
//           onClose={() => setActivePopup(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default CprRecordNew;

import React, { useState, useRef, useEffect } from "react";
import "./CprRecordNew.css";
import PopupTable from "../popup";
import axios from "axios";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";

// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };

//   return (
//     <div className={`CprRecordNew-floating-field ${isFocused || hasValue ? "active" : ""}`}>
//       <input
//         type={type}
//         className="CprRecordNew-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="CprRecordNew-floating-label">{label}</label>
//     </div>
//   );
// };

// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   return (
//     <div className={`CprRecordNew-floating-field ${isFocused || hasValue ? "active" : ""}`}>
//       <select
//         className="CprRecordNew-floating-select"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value !== "");
//         }}
//         onChange={(e) => {
//           setHasValue(e.target.value !== "");
//           if (props.onChange) props.onChange(e);
//         }}
//         {...props}
//       >
//         <option value="">{}</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       <label className="CprRecordNew-floating-label">{label}</label>
//     </div>
//   );
// };
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
    <div className={`CprRecordNew-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <input
        type={type}
        className="CprRecordNew-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="CprRecordNew-floating-label">{label}</label>
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
    <div className={`CprRecordNew-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <select
        className="CprRecordNew-floating-select"
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
      <label className="CprRecordNew-floating-label">{label}</label>
    </div>
  );
};
const CprRecordNew = () => {
  const [mrNoData, setMrNoData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
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
    descriptionOfIllness: "",
    whetherRegisterdWitAnyOtherRegisterdMedical: "",
    registerRemark: "",
    patientRegistrationId: "",
    doctorId: "",
    roomId: ""
  });

  const [medications, setMedications] = useState([
    {
      sn: 1,
      drug: "",
      dose: "",
      route: "",
      remarks: "",
    },
  ]);

  // Create axios instance with default config
  const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.46:4096',
    timeout: 10000, // 10 seconds
  });

  // Add response interceptor
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.code === 'ECONNABORTED') {
        alert('Request timed out. Please check your connection and try again.');
      } else if (error.code === 'ERR_NETWORK') {
        alert('Network error. Please check if the server is running and accessible.');
      }
      throw error;
    }
  );

  // Retry mechanism
  const retryAxios = async (fn, retries = 3, delay = 1000) => {
    try {
      return await fn();
    } catch (error) {
      if (retries === 0) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryAxios(fn, retries - 1, delay * 2);
    }
  };

  useEffect(() => {
    if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);

  const fetchMrno = async () => {
    try {
      const response = await axiosInstance.get('/api/ip-admissions');
      setMrNoData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert('Failed to fetch patient data. Please try again.');
    }
  };

  const handleSave = async () => {
    if (!formData.patientRegistrationId) {
      alert('Please select a patient first');
      return;
    }

    setIsSaving(true);
    try {
      const medicationPayloads = medications.map(med => ({
        descriptionOfIllness: formData.descriptionOfIllness,
        whetherRegisterdWitAnyOtherRegisterdMedical: formData.whetherRegisterdWitAnyOtherRegisterdMedical,
        registrationDate: formData.admissionDate,
        registerRemark: formData.registerRemark,
        drug: med.drug,
        dose: med.dose,
        route: med.route,
        remarks: med.remarks,
        patientRegistrationDTO: {
          patientRegistrationId: formData.patientRegistrationId
        },
        addDoctorDTO: {
          doctorId: formData.doctorId
        },
        roomDetailsDTO: {
          roomId: formData.roomId
        }
      }));

      console.log('Payload:', medicationPayloads);

      const responses = await Promise.all(
        medicationPayloads.map(payload => 
          retryAxios(() => axiosInstance.post('/api/CPRRecordsNew', payload))
        )
      );

      if (responses.every(response => response.status === 200 || response.status === 201)) {
        alert('CPR Records saved successfully!');
        // Optionally reset form or redirect
      } else {
        throw new Error('Some records failed to save');
      }
    } catch (error) {
      console.error('Error saving CPR Records:', error);
      
      if (error.response) {
        alert(`Server error: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        alert('No response from server. Please check if the server is running.');
      } else {
        alert('Error saving CPR Records. Please try again.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMedicationChange = (index, field, value) => {
    setMedications(prev => prev.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    ));
  };

  const handleSelect = (data) => {
    if (activePopup === "MrNo") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        uhid: data.uhid,
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        gender: data?.realobj?.patient?.patient?.gender,
        address: data?.realobj?.patient?.patient?.address,
        adharCardId: data?.realobj?.patient?.patient?.adharCardId,
        ipNo: data?.realobj?.patient?.inPatientId,
        admissionDate: data?.admissionDate,
        consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
        roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
        bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
        patientRegistrationId: data?.realobj?.patient?.patient?.patientRegistrationId,
        doctorId: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorId,
        roomId: data?.realobj?.roomDetails?.roomId

        
      }));
      console.log(formData.admissionDate+"pppppppppppp");
      
    }
    setActivePopup(null);
  };

  const handleAddRow = () => {
    setMedications(prev => [
      ...prev,
      { sn: prev.length + 1, drug: "", dose: "", route: "", remarks: "" }
    ]);
  };

  const handleDeleteRow = (index) => {
    setMedications(prev => 
      prev.filter((_, i) => i !== index)
        .map((row, idx) => ({ ...row, sn: idx + 1 }))
    );
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
              sex: user?.patient?.patient?.sex,
              roomNumber: user?.patient?.roomNumber,
              realobj: user
            }))
          : [],
      };
    }
    return { columns: [], data: [] };
  };

  const { columns, data } = getPopupData();
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  return (
    <div className="CprRecordNew-container">
      <div className="CprRecordNew-section">
        <div className="CprRecordNew-header">CPR Records New</div>
        <div className="CprRecordNew-grid">
          <div className="CprRecordNew-search-field">
            <FloatingInput 
              label="MRNO" 
              type="text" 
              name="uhid" 
              value={formData.uhid}
              onChange={handleChange}
            />
            <button 
              className="CprRecordNew-search-icon" 
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
            label="AADHAR No" 
            value={formData.adharCardId} 
            readOnly 
          />
          <FloatingInput 
            label="Consultant" 
            value={formData.consultant} 
            readOnly 
          />
          <FloatingInput 
            label="Room No / Bed No" 
            value={`${formData.roomNumber} / ${formData.bedNo}`} 
            readOnly 
          />
          <FloatingInput 
            label="Description Of Illness" 
            name="descriptionOfIllness"
            value={formData.descriptionOfIllness}
            onChange={handleChange}
          />
          <FloatingSelect 
            label="Whether Registered With Other Registered Medical"
            name="whetherRegisterdWitAnyOtherRegisterdMedical"
            value={formData.whetherRegisterdWitAnyOtherRegisterdMedical}
            onChange={handleChange}
            options={[
              { value: "select", label: "select" },
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
          />
          <FloatingInput 
            label="Registered Remarks"
            name="registerRemark"
            value={formData.registerRemark}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="CprRecordNew-buttons">
        <button 
          className="btn-blue" 
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="CprRecordNew-services-table">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Actions", "SN", "Drug", "Dose", "Route", "Remarks"].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {medications.map((row, index) => (
              <tr key={index}>
                <td>
                  <div className="table-actions">
                    <button
                      className="CprRecordNew-add-btn"
                      onClick={handleAddRow}
                    >
                      Add
                    </button>
                    <button
                      className="CprRecordNew-del-btn"
                      onClick={() => handleDeleteRow(index)}
                      disabled={medications.length <= 1}
                    >
                      Del
                    </button>
                  </div>
                </td>
                <td>{row.sn}</td>
                <td>
                  <input
                    type="text"
                    value={row.drug}
                    onChange={(e) => handleMedicationChange(index, 'drug', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.dose}
                    onChange={(e) => handleMedicationChange(index, 'dose', e.target.value)}
                  />
                                  </td>
                                  <td>
                  <input
                    type="text"
                    value={row.route}
                    onChange={(e) => handleMedicationChange(index, 'route', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.remarks}
                    onChange={(e) => handleMedicationChange(index, 'remarks', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  );
};

export default CprRecordNew;