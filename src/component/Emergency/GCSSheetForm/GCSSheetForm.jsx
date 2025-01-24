// import React, { useState, useRef, useEffect } from "react";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns";
// import './GCSSheetForm.css';
// import PopupTable from "../popup";
// import axios from "axios";
// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);
//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };
//   return (
//     <div className={`GCSSheetForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <input
//         type={type}
//         className="GCSSheetForm-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="GCSSheetForm-floating-label">{label}</label>
//     </div>
//   );
// };
// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);
//   return (
//     <div className={`GCSSheetForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <select
//         className="GCSSheetForm-floating-select"
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
//       <label className="GCSSheetForm-floating-label">{label}</label>
//     </div>
//   );
// };
// const GCSSheetForm = () => {
//       const [mrNoData, setMrNoData] = useState([]);
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
//           const response = await fetch("http://192.168.1.34:4069/api/gcs-sheets", { 
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
//         const response = await axios.get(`http://192.168.1.46:4096/api/ip-admissions`);
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
//       age:data.age,
//       gender: data?.realobj?.patient?.patient?.gender,
//       ipNo: data?.realobj?.patient?.inPatientId,
//       admissionDate: data?.realobj?.admissionDate,
//       consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
//       roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
//       bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
//           }));
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
//             ipNo: data?.realobj?.patient?.inPatientId,
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
//   return (
//     <>
//     <div className="GCSSheetForm-container">
//       <div className="GCSSheetForm-section">
//         <div className="GCSSheetForm-header">GCS Sheet Form</div>
//       </div>
//       <div className="GCSSheetForm-section">
//         <div className="GCSSheetForm-header">GCS Sheet </div>
//         <div className="GCSSheetForm-grid">
//           {/* <FloatingInput label="UH ID *"  type="text"name="uhId"  /> */}
//           <div className="GCSSheetForm-search-field">
//             <FloatingInput label="MRNO" type="text" name="mrno" value={formData.uhid}/>
//             <button className="GCSSheetForm-search-icon" onClick={() => setActivePopup("MrNo")}>
//               <svg viewBox="0 0 24 24" width="16" height="16">
//                 <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//               </svg>
//             </button>
//             </div>
//           <FloatingInput label="IP No "  type="text"name="ipNo"  value={formData.ipNo}/>
//           <FloatingInput label="Patient Name"  type="text"name="patientName" value={`${formData.firstName} ${formData.lastName}`}  />
//           <FloatingInput label="Age"  type="text"name="age" value={formData.age}  />
//           <FloatingInput label="Sex"  type="text"name="sex" value={formData.gender}  />
//           <FloatingInput label="DOA"  type="date"name="" value={formData.admissionDate} />
//           <FloatingInput label="Consultant"  type="text"name="consultant" value={formData.consultant}  />
//           <FloatingInput label="Room No / Bed No"  type="text"name="roomBedNo" value={`${formData.roomNumber} / ${formData.bedNo}`} />
//           <FloatingInput label="Eye Open *"  type="text"name="eyeOpen"  />
//           <FloatingSelect label="Eye Closed By Swelling-C"
//           options={[
//             { value: '', label: 'Select' },
//             { value: 'spontaneously', label: 'Spontaneously' },
//             { value: 'toSpeech', label: 'To Speech' },
//             { value: 'toPain', label: 'To Pain' },
//             { value: 'none', label: 'None' },
//           ]} />
//           <FloatingSelect label="Best Verbal Response *"
//           options={[
//             { value: '', label: 'Select' },
//             { value: 'oriented', label: 'Oriented' },
//             { value: 'confused', label: 'Confused' },
//             { value: 'inappropriateWords', label: 'Inappropriate words' },
//             { value: 'incomprehensionSound', label: 'Incomprehension sound' },
//             { value: 'none', label: 'None' },
//           ]} />
//           <FloatingInput label="Ettube Of Trochos Tube-T"  type="text"name="ettubeOfTrochosTubeT"  />
//           <FloatingSelect label="Best Motor Response *"
//           options={[
//             { value: '', label: 'Select' },
//             { value: 'obeyscommands', label: 'Obeys commands' },
//             { value: 'localisesPain', label: 'Localises pain' },
//             { value: 'withdrawsToPain', label: 'Withdraws to pain' },
//             { value: 'flexionToPain', label: 'Flexion to pain' },
//             { value: 'extensionToPain', label: 'Extension to pain' },
//             { value: 'none', label: 'None' },
//           ]} />
//           <FloatingInput label="Usually Record Best Arm Response"  type="text"name="usuallyRecordBestArmResponse"  />
//           <FloatingInput label="Total Score"  type="text"name="totalScore"  />
//         </div>
//       </div>
//       <div className="GCSSheetForm-section">
//         <div className="GCSSheetForm-header">PUPILS</div>
//         <div className="GCSSheetForm-grid">
//           <FloatingInput label="Bp Systolic *"  type="text"name="bpSystolic"  />
//           <FloatingInput label="Bp Diastolic *"  type="text"name="bpDiastolic"  />
//           <FloatingInput label="Pulse *"  type="text"name="pulse"  />
//           <FloatingInput label="Respiratory Rate *"  type="text"name="respiratoryRate"  />
//         <FloatingSelect label="Right Size Reaction *"
//           options={[
//             { value: '', label: 'Select' },
//             { value: 'reacts', label: 'Reacts' },
//             { value: 'noReaction', label: 'No Reaction' },
//             { value: 'eyesClosed', label: 'Eyes Closed' },
//           ]} />
//         <FloatingSelect label="Left Size Reaction *"
//           options={[
//             { value: '', label: 'Select' },
//             { value: 'reacts', label: 'Reacts' },
//             { value: 'noReaction', label: 'No Reaction' },
//             { value: 'eyesClosed', label: 'Eyes Closed' },
//           ]} />
//         </div>
//       </div>
//       <div className="GCSSheetForm-section">
//         <div className="GCSSheetForm-header">LIMB MOVEMENT</div>
//         <div className="GCSSheetForm-grid">
//         <FloatingSelect label="Arms *"
//           options={[
//             { value: '', label: 'Select' },
//             { value: 'normalPower', label: 'Normal Power' },
//             { value: 'mildWeakness', label: 'Mild Weakness' },
//             { value: 'severeWeakness', label: 'Severe Weakness' },
//             { value: 'extension', label: 'Extension' },
//             { value: 'noResponse', label: 'No Response' },
//           ]} />
//         <FloatingSelect label="Legs *"
//           options={[
//             { value: '', label: 'Select' },
//             { value: 'normalPower', label: 'Normal Power' },
//             { value: 'mildWeakness', label: 'Mild Weakness' },
//             { value: 'severeWeakness', label: 'Severe Weakness' },
//             { value: 'extension', label: 'Extension' },
//             { value: 'noResponse', label: 'No Response' },
//           ]} />
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
//           <div className="GCSSheetForm-buttons">
//               <button className="btn-blue" >Save</button>
//               <button className="btn-red">Close</button>
//             </div>
//             </>
//   );
// };
// export default GCSSheetForm;





// import React, { useState, useEffect } from "react";
// import './GCSSheetForm.css';
// import PopupTable from "../popup";
// import axios from "axios";

// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);
//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };
//   return (
//     <div className={`GCSSheetForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <input
//         type={type}
//         className="GCSSheetForm-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="GCSSheetForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);
//   return (
//     <div className={`GCSSheetForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <select
//         className="GCSSheetForm-floating-select"
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
//       <label className="GCSSheetForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const GCSSheetForm = () => {
//   const [mrNoData, setMrNoData] = useState([]);
//   const [activePopup, setActivePopup] = useState(null);
//   const [formData, setFormData] = useState({
//     reportingDate: "",
//     incidentName: "",
//     incidentDate: "",
//     reportingTime: "",
//     descriptionOfIncident: "",
//     incidentTime: "",
//     incidentNumber: "",
//     ipAdmission: {
//       ipAdmmissionId: 1
//     }
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.post("http://192.168.1.46:4096/api/incident-reports", formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 200) {
//         alert("Form submitted successfully!");
//         console.log("Response:", response.data);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to submit form.");
//     }
//   };

//   return (
//     <>
//       <div className="GCSSheetForm-container">
//         <div className="GCSSheetForm-section">
//           <div className="GCSSheetForm-header">Incident Report Form</div>
//         </div>

//         <div className="GCSSheetForm-section">
//           <div className="GCSSheetForm-grid">
//             <FloatingInput label="Reporting Date *" type="date" name="reportingDate" value={formData.reportingDate} onChange={handleChange} />
//             <FloatingInput label="Incident Name *" type="text" name="incidentName" value={formData.incidentName} onChange={handleChange} />
//             <FloatingInput label="Incident Date *" type="date" name="incidentDate" value={formData.incidentDate} onChange={handleChange} />
//             <FloatingInput label="Reporting Time *" type="text" name="reportingTime" value={formData.reportingTime} onChange={handleChange} />
//             <FloatingInput label="Description of Incident *" type="text" name="descriptionOfIncident" value={formData.descriptionOfIncident} onChange={handleChange} />
//             <FloatingInput label="Incident Time *" type="text" name="incidentTime" value={formData.incidentTime} onChange={handleChange} />
//             <FloatingInput label="Incident Number *" type="text" name="incidentNumber" value={formData.incidentNumber} onChange={handleChange} />
//           </div>
//         </div>

//         {activePopup && (
//           <PopupTable
//             columns={[]}
//             data={[]}
//             onSelect={() => {}}
//             onClose={() => setActivePopup(null)}
//           />
//         )}
//       </div>

//       <div className="GCSSheetForm-buttons">
//         <button className="btn-blue" onClick={handleSave}>Save</button>
//         <button className="btn-red">Close</button>
//       </div>
//     </>
//   );
// };

// export default GCSSheetForm;










// import React, { useState, useRef, useEffect } from "react";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns";
// import './GCSSheetForm.css';
// import PopupTable from "../popup";
// import axios from "axios";

// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };

//   return (
//     <div className={`GCSSheetForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <input
//         type={type}
//         className="GCSSheetForm-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="GCSSheetForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   return (
//     <div className={`GCSSheetForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <select
//         className="GCSSheetForm-floating-select"
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
//       <label className="GCSSheetForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const GCSSheetForm = () => {
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
//     // New fields for incident report
//     reportingDate: new Date().toISOString().split('T')[0],
//     incidentName: "",
//     incidentDate: "",
//     reportingTime: "",
//     descriptionOfIncident: "",
//     incidentTime: "",
//     incidentNumber: "",
//     ipAdmissionId: null
//   });

//   useEffect(() => {
//     if (activePopup === "MrNo") {
//       fetchMrno();
//     }
//   }, [activePopup]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       // First save GCS sheet data
//       const gcsResponse = await fetch("http://192.168.1.34:4069/api/gcs-sheets", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!gcsResponse.ok) {
//         throw new Error("Failed to submit GCS form data");
//       }

//       // Then save incident report
//       const incidentReportData = {
//         reportingDate: formData.reportingDate,
//         incidentName: "GCS Sheet Entry",
//         incidentDate: new Date().toISOString().split('T')[0],
//         reportingTime: new Date().toLocaleTimeString(),
//         descriptionOfIncident: `GCS Sheet created for patient ${formData.patientName}`,
//         incidentTime: new Date().toLocaleTimeString(),
//         incidentNumber: `INC-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
//         ipAdmission: {
//           ipAdmmissionId: formData.ipAdmissionId || 1
//         }
//       };

//       const incidentResponse = await fetch("http://192.168.1.46:4096/api/incident-reports", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(incidentReportData),
//       });

//       if (!incidentResponse.ok) {
//         throw new Error("Failed to submit incident report");
//       }

//       const gcsResult = await gcsResponse.json();
//       const incidentResult = await incidentResponse.json();
      
//       console.log("Form submission success:", { gcs: gcsResult, incident: incidentResult });
//       alert("Form and incident report submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       alert("Failed to submit form.");
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

//   const fetchMrno = async () => {
//     try {
//       const response = await axios.get(`http://192.168.1.34:4069/api/ip-admissions`);
//       setMrNoData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
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
//         ipNo: data?.realobj?.patient?.inPatientId,
//         admissionDate: data?.realobj?.admissionDate,
//         consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
//         roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
//         bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
//         ipAdmissionId: data?.realobj?.patient?.ipAdmissionId
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
//               ipNo: user?.realobj?.patient?.inPatientId,
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

//   return (
//     <>
//       <div className="GCSSheetForm-container">
//         <div className="GCSSheetForm-section">
//           <div className="GCSSheetForm-header">GCS Sheet Form</div>
//         </div>
//         <div className="GCSSheetForm-section">
//           <div className="GCSSheetForm-header">GCS Sheet </div>
//           <div className="GCSSheetForm-grid">
//             <div className="GCSSheetForm-search-field">
//               <FloatingInput 
//                 label="MRNO" 
//                 type="text" 
//                 name="mrno" 
//                 value={formData.uhid}
//                 onChange={handleChange}
//               />
//               <button className="GCSSheetForm-search-icon" onClick={() => setActivePopup("MrNo")}>
//                 <svg viewBox="0 0 24 24" width="16" height="16">
//                   <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//                 </svg>
//               </button>
//             </div>
//             <FloatingInput 
//               label="IP No" 
//               type="text" 
//               name="ipNo" 
//               value={formData.ipNo}
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="Patient Name" 
//               type="text" 
//               name="patientName" 
//               value={`${formData.firstName || ''} ${formData.lastName || ''}`}
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="Age" 
//               type="text" 
//               name="age" 
//               value={formData.age}
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="Sex" 
//               type="text" 
//               name="sex" 
//               value={formData.gender}
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="DOA" 
//               type="date" 
//               name="admissionDate" 
//               value={formData.admissionDate}
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="Consultant" 
//               type="text" 
//               name="consultant" 
//               value={formData.consultant}
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="Room No / Bed No" 
//               type="text" 
//               name="roomBedNo" 
//               value={`${formData.roomNumber || ''} / ${formData.bedNo || ''}`}
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="Eye Open *" 
//               type="text" 
//               name="eyeOpen"
//               onChange={handleChange}
//             />
//             <FloatingSelect 
//               label="Eye Closed By Swelling-C"
//               name="eyeClosedBy"
//               onChange={handleChange}
//               options={[
//                 { value: '', label: 'Select' },
//                 { value: 'spontaneously', label: 'Spontaneously' },
//                 { value: 'toSpeech', label: 'To Speech' },
//                 { value: 'toPain', label: 'To Pain' },
//                 { value: 'none', label: 'None' },
//               ]} 
//             />
//             <FloatingSelect 
//               label="Best Verbal Response *"
//               name="bestVerbalResponse"
//               onChange={handleChange}
//               options={[
//                 { value: '', label: 'Select' },
//                 { value: 'oriented', label: 'Oriented' },
//                 { value: 'confused', label: 'Confused' },
//                 { value: 'inappropriateWords', label: 'Inappropriate words' },
//                 { value: 'incomprehensionSound', label: 'Incomprehension sound' },
//                 { value: 'none', label: 'None' },
//               ]} 
//             />
//             <FloatingInput 
//               label="Ettube Of Trochos Tube-T" 
//               type="text" 
//               name="ettubeOfTrochosTubeT"
//               onChange={handleChange}
//             />
//             <FloatingSelect 
//               label="Best Motor Response *"
//               name="bestMotorResponse"
//               onChange={handleChange}
//               options={[
//                 { value: '', label: 'Select' },
//                 { value: 'obeyscommands', label: 'Obeys commands' },
//                 { value: 'localisesPain', label: 'Localises pain' },
//                 { value: 'withdrawsToPain', label: 'Withdraws to pain' },
//                 { value: 'flexionToPain', label: 'Flexion to pain' },
//                 { value: 'extensionToPain', label: 'Extension to pain' },
//                 { value: 'none', label: 'None' },
//               ]} 
//             />
//             <FloatingInput 
//               label="Usually Record Best Arm Response" 
//               type="text" 
//               name="usuallyRecordBestArmResponse"
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="Total Score" 
//               type="text" 
//               name="totalScore"
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="GCSSheetForm-section">
//           <div className="GCSSheetForm-header">PUPILS</div>
//           <div className="GCSSheetForm-grid">
//             <FloatingInput 
//               label="Bp Systolic *" 
//               type="text" 
//               name="bpSystolic"
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="Bp Diastolic *" 
//               type="text" 
//               name="bpDiastolic"
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="Pulse *" 
//               type="text" 
//               name="pulse"
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="Respiratory Rate *" 
//               type="text" 
//               name="respiratoryRate"
//               onChange={handleChange}
//             />
//             <FloatingSelect 
//               label="Right Size Reaction *"
//               name="rightSizeReaction"
//               onChange={handleChange}
//               options={[
//                 { value: '', label: 'Select' },
//                 { value: 'reacts', label: 'Reacts' },
//                 { value: 'noReaction', label: 'No Reaction' },
//                 { value: 'eyesClosed', label: 'Eyes Closed' },
//               ]} 
//             />
//             <FloatingSelect 
//               label="Left Size Reaction *"
//               name="leftSizeReaction"
//               onChange={handleChange}
//               options={[
//                 { value: '', label: 'Select' },
//                 { value: 'reacts', label: 'Reacts' },
//                 { value: 'noRe


import React, { useState, useRef, useEffect } from "react";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import './GCSSheetForm.css';
import PopupTable from "../popup";
import axios from "axios";

const FloatingInput = ({ label, type = "text", ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className={`GCSSheetForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <input
        type={type}
        className="GCSSheetForm-floating-input"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="GCSSheetForm-floating-label">{label}</label>
    </div>
  );
};

const FloatingSelect = ({ label, options = [], ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className={`GCSSheetForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <select
        className="GCSSheetForm-floating-select"
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
      <label className="GCSSheetForm-floating-label">{label}</label>
    </div>
  );
};

const GCSSheetForm = () => {
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
    eyeOpen: "",
    eyeClosedBySweelingC: "",
    bestVerbalResponse: "",
    etitudeOfTrochosTubeT: "",
    bestMotorResponse: "",
    usuallyRecordBestArmResponse: "",
    totalScore: "",
    bpSystolic: "",
    bpDiastolic: "",
    pulse: "",
    respiratoryRate: "",
    rightSizeReaction: "",
    leftSizeReaction: "",
    arms: "",
    legs: "",
    ipAdmissionId: null
  });

  useEffect(() => {
    if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);

  const handleSubmit = async () => {
    try {
      const payload = {
        eyeOpen: formData.eyeOpen,
        eyeClosedBySweelingC: formData.eyeClosedBySweelingC,
        bestVerbalResponse: formData.bestVerbalResponse,
        etitudeOfTrochosTubeT: formData.etitudeOfTrochosTubeT,
        bestMotorResponse: formData.bestMotorResponse,
        usuallyRecordBestArmResponse: formData.usuallyRecordBestArmResponse,
        totalScore: formData.totalScore,
        bpSystolic: formData.bpSystolic,
        bpDiastolic: formData.bpDiastolic,
        pulse: formData.pulse,
        rightSizeReaction: formData.rightSizeReaction,
        leftSizeReaction: formData.leftSizeReaction,
        arms: formData.arms,
        legs: formData.legs,
        ipAdmission: {
          ipAdmissionId: formData.ipAdmissionId
        }
      };

      const response = await axios.post("http://192.168.1.46:4096/api/gcs-sheets", payload);
      
      if (response.status === 200 || response.status === 201) {
        alert("GCS Sheet saved successfully!");
      } else {
        throw new Error("Failed to save GCS Sheet");
      }
    } catch (error) {
      console.error("Error saving GCS Sheet:", error);
      alert("Failed to save GCS Sheet. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const fetchMrno = async () => {
    try {
      const response = await axios.get(`http://192.168.1.46:4096/api/ip-admissions`);
      setMrNoData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelect = (data) => {
    if (activePopup === "MrNo") {
      setFormData(prevFormData => ({
        ...prevFormData,
        uhid: data.uhid,
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        gender: data?.realobj?.patient?.patient?.gender,
        ipNo: data?.realobj?.patient?.inPatientId,
        admissionDate: data?.realobj?.admissionDate,
        consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
        roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
        bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
        ipAdmissionId: data?.realobj?.ipAdmissionId
      }));
    }
    setActivePopup(null);
  };

  const getPopupData = () => {
    if (activePopup === "MrNo") {
      return {
        columns: ["uhid", "firstName", "lastName"],
        data: Array.isArray(mrNoData)
          ? mrNoData.map((user) => ({
              uhid: user?.patient?.patient?.uhid,
              ipNo: user?.realobj?.patient?.inPatientId,
              firstName: user?.patient?.patient?.firstName,
              lastName: user?.patient?.patient?.lastName,
              age: user?.patient?.patient?.age,
              gender: user?.patient?.patient?.gender,
              roomNumber: user?.patient?.roomNumber,
              realobj: user
            }))
          : [],
      };
    }
    return { columns: [], data: [] };
  };

  const { columns, data } = getPopupData();

  return (
    <>
      <div className="GCSSheetForm-container">
        <div className="GCSSheetForm-section">
          <div className="GCSSheetForm-header">GCS Sheet Form</div>
        </div>
        <div className="GCSSheetForm-section">
          <div className="GCSSheetForm-header">GCS Sheet </div>
          <div className="GCSSheetForm-grid">
            <div className="GCSSheetForm-search-field">
              <FloatingInput 
                label="MRNO" 
                type="text" 
                name="uhid" 
                value={formData.uhid}
                onChange={handleChange}
              />
              <button className="GCSSheetForm-search-icon" onClick={() => setActivePopup("MrNo")}>
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
                </svg>
              </button>
            </div>
            <FloatingInput label="IP No" type="text" name="ipNo" value={formData.ipNo} onChange={handleChange} />
            <FloatingInput label="Patient Name" type="text" name="patientName" value={`${formData.firstName} ${formData.lastName}`} readOnly />
            <FloatingInput label="Age" type="text" name="age" value={formData.age} onChange={handleChange} />
            <FloatingInput label="Sex" type="text" name="gender" value={formData.gender} onChange={handleChange} />
            <FloatingInput label="DOA" type="date" name="admissionDate" value={formData.admissionDate} onChange={handleChange} />
            <FloatingInput label="Consultant" type="text" name="consultant" value={formData.consultant} onChange={handleChange} />
            <FloatingInput label="Room No / Bed No" type="text" name="roomBedNo" value={`${formData.roomNumber} / ${formData.bedNo}`} readOnly />
            <FloatingInput label="Eye Open *" type="text" name="eyeOpen" value={formData.eyeOpen} onChange={handleChange} />
            <FloatingSelect 
              label="Eye Closed By Swelling-C"
              name="eyeClosedBySweelingC"
              value={formData.eyeClosedBySweelingC}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select' },
                { value: 'spontaneously', label: 'Spontaneously' },
                { value: 'toSpeech', label: 'To Speech' },
                { value: 'toPain', label: 'To Pain' },
                { value: 'none', label: 'None' },
              ]} 
            />
            <FloatingSelect 
              label="Best Verbal Response *"
              name="bestVerbalResponse"
              value={formData.bestVerbalResponse}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select' },
                { value: 'oriented', label: 'Oriented' },
                { value: 'confused', label: 'Confused' },
                { value: 'inappropriateWords', label: 'Inappropriate words' },
                { value: 'incomprehensionSound', label: 'Incomprehension sound' },
                { value: 'none', label: 'None' },
              ]} 
            />
            <FloatingInput 
              label="Ettube Of Trochos Tube-T" 
              type="text" 
              name="etitudeOfTrochosTubeT" 
              value={formData.etitudeOfTrochosTubeT}
              onChange={handleChange}
            />
            <FloatingSelect 
              label="Best Motor Response *"
              name="bestMotorResponse"
              value={formData.bestMotorResponse}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select' },
                { value: 'obeyscommands', label: 'Obeys commands' },
                { value: 'localisesPain', label: 'Localises pain' },
                { value: 'withdrawsToPain', label: 'Withdraws to pain' },
                { value: 'flexionToPain', label: 'Flexion to pain' },
                { value: 'extensionToPain', label: 'Extension to pain' },
                { value: 'none', label: 'None' },
              ]} 
            />
            <FloatingInput 
              label="Usually Record Best Arm Response" 
              type="text" 
              name="usuallyRecordBestArmResponse"
              value={formData.usuallyRecordBestArmResponse}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Total Score" 
              type="text" 
              name="totalScore"
              value={formData.totalScore}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="GCSSheetForm-section">
          <div className="GCSSheetForm-header">PUPILS</div>
          <div className="GCSSheetForm-grid">
            <FloatingInput 
              label="Bp Systolic *" 
              type="text" 
              name="bpSystolic"
              value={formData.bpSystolic}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Bp Diastolic *" 
              type="text" 
              name="bpDiastolic"
              value={formData.bpDiastolic}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Pulse *" 
              type="text" 
              name="pulse"
              value={formData.pulse}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Respiratory Rate *" 
              type="text" 
              name="respiratoryRate"
              value={formData.respiratoryRate}
              onChange={handleChange}
            />
            <FloatingSelect 
              label="Right Size Reaction *"
              name="rightSizeReaction"
              value={formData.rightSizeReaction}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select' },
                { value: 'reacts', label: 'Reacts' },
                { value: 'noReaction', label: 'No Reaction' },
                { value: 'eyesClosed', label: 'Eyes Closed' },
              ]} 
            />
            <FloatingSelect 
              label="Left Size Reaction *"
              name="leftSizeReaction"
              value={formData.leftSizeReaction}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select' },
                { value: 'reacts', label: 'Reacts' },
                { value: 'noReaction', label: 'No Reaction' },
                { value: 'eyesClosed', label: 'Eyes Closed' },
              ]} 
            />
          </div>
        </div>
        <div className="GCSSheetForm-section">
          <div className="GCSSheetForm-header">LIMB MOVEMENT</div>
          <div className="GCSSheetForm-grid">
            <FloatingSelect 
              label="Arms *"
              name="arms"
              value={formData.arms}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select' },
                { value: 'normalPower', label: 'Normal Power' },
                { value: 'mildWeakness', label: 'Mild Weakness' },
                { value: 'severeWeakness', label: 'Severe Weakness' },
                { value: 'extension', label: 'Extension' },
                { value: 'noResponse', label: 'No Response' },
              ]} 
            />
            <FloatingSelect 
              label="Legs *"
              name="legs"
              value={formData.legs}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select' },
                { value: 'normalPower', label: 'Normal Power' },
                { value: 'mildWeakness', label: 'Mild Weakness' },
                { value: 'severeWeakness', label: 'Severe Weakness' },
                { value: 'extension', label: 'Extension' },
                { value: 'noResponse', label: 'No Response' },
              ]} 
            />
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
      <div className="GCSSheetForm-buttons">
        <button className="btn-blue" onClick={handleSubmit}>Save</button>
        <button className="btn-red" onClick={() => window.close()}>Close</button>
      </div>
    </>
  );
};

export default GCSSheetForm;