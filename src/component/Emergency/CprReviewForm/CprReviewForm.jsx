// import React, { useState, useRef, useEffect } from "react";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns";
// import './CprReviewForm.css';
// import PopupTable from "../popup";
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
//     <div className={`CprReviewForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <input
//         type={type}
//         className="CprReviewForm-floating-input"
//         value={value}
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="CprReviewForm-floating-label">{label}</label>
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
//     <div className={`CprReviewForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <select
//         className="CprReviewForm-floating-select"
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
//       <label className="CprReviewForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const CprReviewForm = () => {
//   const [rows, setRows] = useState([
//     { sn: 1, drug: "", dose: "", route: "", remarks: "" }
//   ]);
//   const tableRef = useRef(null);
//   const [mrNoData, setMrNoData] = useState([]);
//   const [activePopup, setActivePopup] = useState(null);
//   const [formData, setFormData] = useState({
//     uhid: "",
//     ipNo: "",
//     firstName: "",
//     lastName: "",
//     age: "",
//     sex: "",
//     admissionDate: "",
//     consultant: "",
//     roomNumber: "",
//     bedNo: "",
//     ward: "",
//     date: "",
//     time: "",
//     bloodSugarValuesCBG: "",
//     bloodSugarValuesVenous: "",
//     urineAcetone: "",
//     ipAdmissionDTO: {
//       ipAdmmissionId: null
//     },
//     addItemDTO: {
//       addItemId: null
//     }
//   });

//   useEffect(() => {
//     if (activePopup === "MrNo") {
//       fetchMrno();
//     }
//   }, [activePopup]);

//   const handleAddRow = () => {
//     setRows((prevRows) => [
//       ...prevRows,
//       { sn: prevRows.length + 1, drug: "", dose: "", route: "", remarks: "" }
//     ]);
//   };

//   const handleDeleteRow = (index) => {
//     setRows((prevRows) => prevRows.filter((_, i) => i !== index));
//   };

//   const handleRowChange = (index, field, value) => {
//     setRows(prevRows => {
//       const newRows = [...prevRows];
//       newRows[index] = {
//         ...newRows[index],
//         [field]: value
//       };
//       return newRows;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Prepare the submission data
//     const submissionData = {
//       date: formData.date,
//       time: formData.time,
//       bloodSugarValuesCBG: parseFloat(formData.bloodSugarValuesCBG) || 0,
//       bloodSugarValuesVenous: parseFloat(formData.bloodSugarValuesVenous) || 0,
//       urineAcetone: formData.urineAcetone,
//       drug: rows[0].drug,
//       dose: rows[0].dose,
//       route: rows[0].route,
//       remark: rows[0].remarks,
//       ipAdmissionDTO: {
//         ipAdmmissionId: 16 // You might want to get this from your form data
//       },
//       addItemDTO: {
//         addItemId: 21 // You might want to get this from your form data
//       }
//     };

//     try {
//       const response = await fetch("http://192.168.1.46:4096/api/diabeticChart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(submissionData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit form data");
//       }

//       const result = await response.json();
//       console.log("Form submission success:", result);
//       alert("Form submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting form data:", error);
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
//       const response = await axios.get("http://192.168.1.46:4096/api/ip-admissions");
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
//         sex: data?.realobj?.sex,
//         ipNo: data?.realobj?.patient?.inPatientId,
//         consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
//         roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
//         bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
//         ward: data?.realobj?.roomDetails?.roomTypeDTO.wardName,
//         ipAdmissionDTO: {
//           ipAdmmissionId: data?.realobj?.ipAdmissionId || 16
//         }
//       }));
//     }
//     setActivePopup(null);
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

//   return (
//     <>
//     <div className="CprReviewForm-container">
//       <div className="CprReviewForm-section">
//         <div className="CprReviewForm-header">CPR Review Details</div>
       
//       </div>
//       <div className="CprReviewForm-section">
//         <div className="CprReviewForm-header">CPR Reviewed </div>
//         <div className="CprReviewForm-grid">
//         <div className="diabetic-chart-form-search-field">
//               <FloatingInput
//                 label="MRNO"
//                 type="text"
//                 name="uhid"
                
//               />
//               <button className="diabetic-chart-form-search-icon" onClick={() => setActivePopup("MrNo")}>
//                 <svg viewBox="0 0 24 24" width="16" height="16">
//                   <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//                 </svg>
//               </button>
//             </div>
//           <FloatingInput label="UH ID *"  type="text"name="uhId"  />
//           <FloatingInput label="IP No "  type="text"name="ipNo"  />
//           <FloatingInput label="Patient Name"  type="text"name="patientName"  />
//           <FloatingInput label="Age"  type="text"name="age"  />
//           <FloatingInput label="Sex"  type="text"name="sex"  />
//           <FloatingInput label="DOA"  type="date"name=""  />
//           <FloatingInput label="Consultant"  type="text"name="consultant"  />
//           <FloatingInput label="Room No / Bed No"  type="text"name="roomBedNo"  />
//           <FloatingInput label="Date"  type="date"name="date"  />
//           <FloatingInput label="Time"  type="time"name="time"  />
//           <div className="CprReviewForm-form-group">
//   <label>Survival To Discharge:</label>
//   <div className="CprReviewForm-radio-button">
//     <label>
//       <input
//         type="radio"
//         name="survivalToDischarge"
//         value="yes"
//       />
//       Yes
//     </label>
//     <label>
//       <input
//         type="radio"
//         name="survivalToDischarge"
//         value="no"
//       />
//       No
//     </label>
//   </div>
// </div>  
//           <FloatingInput label="Still In ICU *"   type="text"name="stillInICU" />
//           <FloatingInput label="CPR Review *"   type="text"name="cprReview" />
//           <FloatingInput label="CPR Review By"   type="text"name="cprReviewBy" />

        
          
//         </div>
//       </div>
//       <div className="CprReviewForm-section">
//         <div className="CprReviewForm-header">CPR Reviewed By</div>
//         <div className="CprReviewForm-grid">

//         <div className="CprReviewForm-search-field">
//             <FloatingInput label="Doctor 1" />
//             <button className="CprReviewForm-search-icon">
//               <svg viewBox="0 0 24 24" width="16" height="16">
//                 <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//               </svg>
//             </button>
//           </div>
//         <div className="CprReviewForm-search-field">
//             <FloatingInput label="Doctor 2" />
//             <button className="CprReviewForm-search-icon">
//               <svg viewBox="0 0 24 24" width="16" height="16">
//                 <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//               </svg>
//             </button>
//           </div>
//         <div className="CprReviewForm-search-field">
//             <FloatingInput label="Doctor 3" />
//             <button className="CprReviewForm-search-icon">
//               <svg viewBox="0 0 24 24" width="16" height="16">
//                 <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//               </svg>
//             </button>
//           </div>
//         <div className="CprReviewForm-search-field">
//             <FloatingInput label="Doctor 4" />
//             <button className="CprReviewForm-search-icon">
//               <svg viewBox="0 0 24 24" width="16" height="16">
//                 <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//     {activePopup && (
//         <PopupTable
//           columns={columns}
//           data={data}
//           onSelect={handleSelect}
//           onClose={() => setActivePopup(null)}
//         />
//       )}
//           <div className="CprReviewForm-buttons">
//               <button className="btn-blue" >Save</button>
//               <button className="btn-red">Close</button>
//             </div>
//             </>
//   );
// };
// export default CprReviewForm;






import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import './CprReviewForm.css';
import PopupTable from "../popup";

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
    <div className={`CprReviewForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <input
        type={type}
        className="CprReviewForm-floating-input"
        value={value || ''}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="CprReviewForm-floating-label">{label}</label>
    </div>
  );
};

const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div className={`CprReviewForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <select
        className="CprReviewForm-floating-select"
        value={value || ''}
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
      <label className="CprReviewForm-floating-label">{label}</label>
    </div>
  );
};

const CprReviewForm = () => {
  const [mrNoData, setMrNoData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({
    uhid: "",
    ipNo: "",
    firstName: "",
    lastName: "",
    age: "",
    sex: "",
    admissionDate: "",
    consultant: "",
    roomNumber: "",
    bedNo: "",
    date: "",
    time: "",
    survivalToDischarge: "",
    stillInIcu: "",
    cprReview: "",
    cprReviewBy: "",
    doctor1: { doctorId: null },
    doctor2: { doctorId: null },
    doctor3: { doctorId: null },
    doctor4: { doctorId: null },
    ipAdmission: {
      ipAdmmissionId: null
    }
  });

  useEffect(() => {
    if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);

  const handleSubmit = async () => {
    try {
      const payload = {
        date: formData.date,
        time: formData.time,
        survivalToDischarge: formData.survivalToDischarge,
        stillInIcu: formData.stillInIcu,
        cprReview: formData.cprReview,
        ipAdmission: {
          ipAdmmissionId: formData.ipAdmission.ipAdmmissionId
        },
        addDoctor1: formData.doctor1,
        addDoctor2: formData.doctor2,
        addDoctor3: formData.doctor3,
        addDoctor4: formData.doctor4
      };

      const response = await axios.post('http://192.168.1.46:4096/api/cpr-reviews', payload);
      
      if (response.status === 200 || response.status === 201) {
        alert('CPR Review saved successfully!');
      } else {
        throw new Error('Failed to save CPR Review');
      }
    } catch (error) {
      console.error('Error saving CPR Review:', error);
      alert('Failed to save CPR Review. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchMrno = async () => {
    try {
      const response = await axios.get("http://192.168.1.46:4096/api/ip-admissions");
      setMrNoData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelect = (data) => {
    if (activePopup === "MrNo") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        uhid: data.uhid,
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        sex: data?.realobj?.patient?.patient?.sex,
        ipNo: data?.realobj?.patient?.inPatientId,
        admissionDate: data?.realobj?.admissionDate,
        consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
        roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
        bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
        ipAdmission: {
          ipAdmmissionId: data?.realobj?.ipAdmissionId
        }
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

  return (
    <>
      <div className="CprReviewForm-container">
        <div className="CprReviewForm-section">
          <div className="CprReviewForm-header">CPR Review Details</div>
        </div>
        
        <div className="CprReviewForm-section">
          <div className="CprReviewForm-header">CPR Reviewed </div>
          <div className="CprReviewForm-grid">
            <div className="diabetic-chart-form-search-field">
              <FloatingInput
                label="MRNO"
                type="text"
                name="uhid"
                value={formData.uhid}
                onChange={handleChange}
              />
              <button className="diabetic-chart-form-search-icon" onClick={() => setActivePopup("MrNo")}>
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
                </svg>
              </button>
            </div>
            <FloatingInput label="UH ID *" value={formData.uhid} readOnly />
            <FloatingInput label="IP No" value={formData.ipNo} readOnly />
            <FloatingInput label="Patient Name" value={`${formData.firstName} ${formData.lastName}`} readOnly />
            <FloatingInput label="Age" value={formData.age} readOnly />
            <FloatingInput label="Sex" value={formData.sex} readOnly />
            <FloatingInput label="DOA" type="date" value={formData.admissionDate} readOnly />
            <FloatingInput label="Consultant" value={formData.consultant} readOnly />
            <FloatingInput label="Room No / Bed No" value={`${formData.roomNumber} / ${formData.bedNo}`} readOnly />
            <FloatingInput
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <FloatingInput
              label="Time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
            
            <div className="CprReviewForm-form-group">
              <label>Survival To Discharge:</label>
              <div className="CprReviewForm-radio-button">
                <label>
                  <input
                    type="radio"
                    name="survivalToDischarge"
                    value="Yes"
                    checked={formData.survivalToDischarge === "Yes"}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="survivalToDischarge"
                    value="No"
                    checked={formData.survivalToDischarge === "No"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>
            
            <FloatingInput
              label="Still In ICU *"
              name="stillInIcu"
              value={formData.stillInIcu}
              onChange={handleChange}
            />
            <FloatingInput
              label="CPR Review *"
              name="cprReview"
              value={formData.cprReview}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="CprReviewForm-section">
          <div className="CprReviewForm-header">CPR Reviewed By</div>
          <div className="CprReviewForm-grid">
            <div className="CprReviewForm-search-field">
              <FloatingInput 
                label="Doctor 1" 
                name="doctor1"
                value={formData.doctor1.doctorId || ''}
                onChange={handleChange}
              />
              <button className="CprReviewForm-search-icon">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
                </svg>
              </button>
            </div>
            <div className="CprReviewForm-search-field">
              <FloatingInput 
                label="Doctor 2"
                name="doctor2"
                value={formData.doctor2.doctorId || ''}
                onChange={handleChange}
              />
              <button className="CprReviewForm-search-icon">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
                </svg>
              </button>
            </div>
            <div className="CprReviewForm-search-field">
              <FloatingInput 
                label="Doctor 3"
                name="doctor3"
                value={formData.doctor3.doctorId || ''}
                onChange={handleChange}
              />
              <button className="CprReviewForm-search-icon">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
                </svg>
              </button>
            </div>
            <div className="CprReviewForm-search-field">
              <FloatingInput 
                label="Doctor 4"
                name="doctor4"
                value={formData.doctor4.doctorId || ''}
                onChange={handleChange}
              />
              <button className="CprReviewForm-search-icon">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
                </svg>
              </button>
            </div>
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

      <div className="CprReviewForm-buttons">
        <button className="btn-blue" onClick={handleSubmit}>Save</button>
        <button className="btn-red">Close</button>
      </div>
    </>
  );
};

export default CprReviewForm;






// import React, { useState, useRef, useEffect } from "react";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns";
// import PopupTable from "../popup";
// import './CprReviewForm.css';

// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);
  
//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };

//   return (
//     <div className={`CprReviewForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <input
//         type={type}
//         className="CprReviewForm-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="CprReviewForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   return (
//     <div className={`CprReviewForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <select
//         className="CprReviewForm-floating-select"
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
//       <label className="CprReviewForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const CprReviewForm = () => {
//   const [selectedTab, setSelectedTab] = useState("services");
//   const [columnWidths, setColumnWidths] = useState({});
//   const [activePopup, setActivePopup] = useState("");
//   const [selectedPatient, setSelectedPatient] = useState();
//   const tableRef = useRef(null);
  
//   const [formData, setFormData] = useState({
//     uhId: "",
//     ipNo: "",
//     patientName: "",
//     age: "",
//     sex: "",
//     doa: "",
//     dept: "",
//     consultant: "",
//     roomBedNo: "",
//     date: "",
//     time: "",
//     survivalToDischarge: "",
//     stillInIcu: "",
//     cprReview: "",
//     cprReviewedBy: "",
//     doctor1: { doctorId: "" },
//     doctor2: { doctorId: "" },
//     doctor3: { doctorId: "" },
//     doctor4: { doctorId: "" },
//     ipAdmission: { ipAdmmissionId: "" }
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleRadioChange = (e) => {
//     setFormData(prevData => ({
//       ...prevData,
//       survivalToDischarge: e.target.value
//     }));
//   };

//   const handleDoctorSelect = (doctorNumber, doctorId) => {
//     setFormData(prevData => ({
//       ...prevData,
//       [`doctor${doctorNumber}`]: { doctorId }
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         date: formData.date,
//         time: formData.time,
//         survivalToDischarge: formData.survivalToDischarge,
//         stillInIcu: formData.stillInIcu,
//         cprReview: formData.cprReview,
//         ipAdmission: {
//           ipAdmmissionId: 1 // You might want to make this dynamic based on your needs
//         },
//         addDoctor1: {
//           doctorId: formData.doctor1.doctorId || 1
//         },
//         addDoctor2: {
//           doctorId: formData.doctor2.doctorId || 2
//         },
//         addDoctor3: {
//           doctorId: formData.doctor3.doctorId || 3
//         },
//         addDoctor4: {
//           doctorId: formData.doctor4.doctorId || 4
//         }
//       };

//       const response = await fetch('http://192.168.212.219:4069/api/cpr-reviews', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save CPR review');
//       }

//       const data = await response.json();
//       alert('CPR review saved successfully!');
//       // You might want to reset the form or redirect here
//     } catch (error) {
//       console.error('Error saving CPR review:', error);
//       alert('Failed to save CPR review. Please try again.');
//     }
//   };

//   return (
//     <>
//       <div className="CprReviewForm-container">
//         <div className="CprReviewForm-section">
//           <div className="CprReviewForm-header">CPR Review Details</div>
//         </div>
//         <div className="CprReviewForm-section">
//           <div className="CprReviewForm-header">CPR Reviewed </div>
//           <div className="CprReviewForm-grid">
//           <div className="CprReviewForm-search-field">
//             <FloatingInput label="UH ID * " type="text" value={selectedPatient?.uhid} />
//             <button className="CprReviewForm-search-icon"onClick={() => setActivePopup("patient")}>
//               <svg viewBox="0 0 24 24" width="16" height="16">
//                 <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//               </svg>
//             </button>
//           </div>
//             {/* <FloatingInput 
//               label="UH ID *" 
//               type="text" 
//               name="uhId" 
//               value={formData.uhId}
//               onChange={handleChange}
//             /> */}
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
//               value={formData.patientName}
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
//               value={formData.sex}
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="DOA" 
//               type="date" 
//               name="doa"
//               value={formData.doa}
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
//               value={formData.roomBedNo}
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="Date" 
//               type="date" 
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="Time" 
//               type="time" 
//               name="time"
//               value={formData.time}
//               onChange={handleChange}
//             />
//             <div className="CprReviewForm-form-group">
//               <label>Survival To Discharge:</label>
//               <div className="CprReviewForm-radio-button">
//                 <label>
//                   <input
//                     type="radio"
//                     name="survivalToDischarge"
//                     value="Yes"
//                     checked={formData.survivalToDischarge === "Yes"}
//                     onChange={handleRadioChange}
//                   />
//                   Yes
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="survivalToDischarge"
//                     value="No"
//                     checked={formData.survivalToDischarge === "No"}
//                     onChange={handleRadioChange}
//                   />
//                   No
//                 </label>
//               </div>
//             </div>
//             <FloatingInput 
//               label="Still In ICU *" 
//               type="text" 
//               name="stillInIcu"
//               value={formData.stillInIcu}
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="CPR Review *" 
//               type="text" 
//               name="cprReview"
//               value={formData.cprReview}
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="CPR Review By" 
//               type="text" 
//               name="cprReviewedBy"
//               value={formData.cprReviewedBy}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="CprReviewForm-section">
//           <div className="CprReviewForm-header">CPR Reviewed By</div>
//           <div className="CprReviewForm-grid">
//             {[1, 2, 3, 4].map((doctorNum) => (
//               <div key={doctorNum} className="CprReviewForm-search-field">
//                 <FloatingInput 
//                   label={`Doctor ${doctorNum}`}
//                   value={formData[`doctor${doctorNum}`].doctorId}
//                   onChange={(e) => handleDoctorSelect(doctorNum, e.target.value)}
//                 />
//                 <button className="CprReviewForm-search-icon">
//                   <svg viewBox="0 0 24 24" width="16" height="16">
//                     <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="CprReviewForm-buttons">
//         <button className="btn-blue" onClick={handleSubmit}>Save</button>
//         <button className="btn-red">Close</button>
//       </div>
//     </>
//   );
// };

// export default CprReviewForm;





// import React, { useState, useRef, useEffect } from "react";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns";
// import PopupTable from "../popup";
// import './CprReviewForm.css';

// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);
  
//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };

//   return (
//     <div className={`CprReviewForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <input
//         type={type}
//         className="CprReviewForm-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="CprReviewForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   return (
//     <div className={`CprReviewForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <select
//         className="CprReviewForm-floating-select"
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
//       <label className="CprReviewForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const CprReviewForm = () => {
//   const [selectedTab, setSelectedTab] = useState("services");
//   const [columnWidths, setColumnWidths] = useState({});
//   const [activePopup, setActivePopup] = useState("");
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [patients, setPatients] = useState([]);
//   const tableRef = useRef(null);
  
//   const [formData, setFormData] = useState({
//     uhId: "",
//     ipNo: "",
//     patientName: "",
//     age: "",
//     sex: "",
//     doa: "",
//     dept: "",
//     consultant: "",
//     roomBedNo: "",
//     date: "",
//     time: "",
//     survivalToDischarge: "",
//     stillInIcu: "",
//     cprReview: "",
//     cprReviewedBy: "",
//     doctor1: { doctorId: "" },
//     doctor2: { doctorId: "" },
//     doctor3: { doctorId: "" },
//     doctor4: { doctorId: "" },
//     ipAdmission: { ipAdmmissionId: "" }
//   });

//   // Fetch patients data
//   const fetchPatients = async () => {
//     try {
//       const response = await fetch('http://192.168.212.165:4096/api/ip-admissions/admitted');
//       if (!response.ok) {
//         throw new Error('Failed to fetch patients');
//       }
//       const data = await response.json();
//       setPatients(data);
//     } catch (error) {
//       console.error('Error fetching patients:', error);
//     }
//   };

//   // Effect to fetch patients when popup opens
//   useEffect(() => {
//     if (activePopup === "patient") {
//       fetchPatients();
//     }
//   }, [activePopup]);

//   // Handle patient selection
//   const handlePatientSelect = (patient) => {
//     setSelectedPatient(patient);
//     setFormData(prev => ({
//       ...prev,
//       uhId: patient.uhid || "",
//       ipNo: patient.ipNumber || "",
//       patientName: patient.patientName || "",
//       age: patient.age || "",
//       sex: patient.gender || "",
//       doa: patient.dateOfAdmission || "",
//       consultant: patient.consultant || "",
//       roomBedNo: patient.bedNumber || "",
//       ipAdmission: { ipAdmmissionId: patient.ipAdmissionId || "" }
//     }));
//     setActivePopup("");
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleRadioChange = (e) => {
//     setFormData(prevData => ({
//       ...prevData,
//       survivalToDischarge: e.target.value
//     }));
//   };

//   const handleDoctorSelect = (doctorNumber, doctorId) => {
//     setFormData(prevData => ({
//       ...prevData,
//       [`doctor${doctorNumber}`]: { doctorId }
//     }));
//   };

//   const patientColumns = [
//     { header: "UHID", key: "uhid" },
//     { header: "IP Number", key: "ipNumber" },
//     { header: "Patient Name", key: "patientName" },
//     { header: "Age", key: "age" },
//     { header: "Gender", key: "gender" },
//     { header: "DOA", key: "dateOfAdmission" },
//     { header: "Consultant", key: "consultant" },
//     { header: "Bed Number", key: "bedNumber" }
//   ];

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         date: formData.date,
//         time: formData.time,
//         survivalToDischarge: formData.survivalToDischarge,
//         stillInIcu: formData.stillInIcu,
//         cprReview: formData.cprReview,
//         ipAdmission: {
//           ipAdmmissionId: formData.ipAdmission.ipAdmmissionId
//         },
//         addDoctor1: {
//           doctorId: formData.doctor1.doctorId || 1
//         },
//         addDoctor2: {
//           doctorId: formData.doctor2.doctorId || 2
//         },
//         addDoctor3: {
//           doctorId: formData.doctor3.doctorId || 3
//         },
//         addDoctor4: {
//           doctorId: formData.doctor4.doctorId || 4
//         }
//       };

//       const response = await fetch('http://192.168.212.219:4069/api/cpr-reviews', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save CPR review');
//       }

//       const data = await response.json();
//       alert('CPR review saved successfully!');
//     } catch (error) {
//       console.error('Error saving CPR review:', error);
//       alert('Failed to save CPR review. Please try again.');
//     }
//   };

//   return (
//     <>
//       <div className="CprReviewForm-container">
//         <div className="CprReviewForm-section">
//           <div className="CprReviewForm-header">CPR Review Details</div>
//         </div>
//         <div className="CprReviewForm-section">
//           <div className="CprReviewForm-header">CPR Reviewed </div>
//           <div className="CprReviewForm-grid">
//             <div className="CprReviewForm-search-field">
//               <FloatingInput 
//                 label="UH ID *" 
//                 type="text" 
//                 value={selectedPatient?.uhid || formData.uhId}
//                 readOnly
//               />
//               <button 
//                 className="CprReviewForm-search-icon"
//                 onClick={() => setActivePopup("patient")}
//               >
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
//               readOnly
//             />
//             <FloatingInput 
//               label="Patient Name" 
//               type="text" 
//               name="patientName"
//               value={formData.patientName}
//               readOnly
//             />
//             <FloatingInput 
//               label="Age" 
//               type="text" 
//               name="age"
//               value={formData.age}
//               readOnly
//             />
//             <FloatingInput 
//               label="Sex" 
//               type="text" 
//               name="sex"
//               value={formData.sex}
//               readOnly
//             />
//             <FloatingInput 
//               label="DOA" 
//               type="date" 
//               name="doa"
//               value={formData.doa}
//               readOnly
//             />
//             <FloatingInput 
//               label="Consultant" 
//               type="text" 
//               name="consultant"
//               value={formData.consultant}
//               readOnly
//             />
//             <FloatingInput 
//               label="Room No / Bed No" 
//               type="text" 
//               name="roomBedNo"
//               value={formData.roomBedNo}
//               readOnly
//             />
//             <FloatingInput 
//               label="Date" 
//               type="date" 
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="Time" 
//               type="time" 
//               name="time"
//               value={formData.time}
//               onChange={handleChange}
//             />
//             <div className="CprReviewForm-form-group">
//               <label>Survival To Discharge:</label>
//               <div className="CprReviewForm-radio-button">
//                 <label>
//                   <input
//                     type="radio"
//                     name="survivalToDischarge"
//                     value="Yes"
//                     checked={formData.survivalToDischarge === "Yes"}
//                     onChange={handleRadioChange}
//                   />
//                   Yes
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="survivalToDischarge"
//                     value="No"
//                     checked={formData.survivalToDischarge === "No"}
//                     onChange={handleRadioChange}
//                   />
//                   No
//                 </label>
//               </div>
//             </div>
//             <FloatingInput 
//               label="Still In ICU *" 
//               type="text" 
//               name="stillInIcu"
//               value={formData.stillInIcu}
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="CPR Review *" 
//               type="text" 
//               name="cprReview"
//               value={formData.cprReview}
//               onChange={handleChange}
//             />
//             <FloatingInput 
//               label="CPR Review By" 
//               type="text" 
//               name="cprReviewedBy"
//               value={formData.cprReviewedBy}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="CprReviewForm-section">
//           <div className="CprReviewForm-header">CPR Reviewed By</div>
//           <div className="CprReviewForm-grid">
//             {[1, 2, 3, 4].map((doctorNum) => (
//               <div key={doctorNum} className="CprReviewForm-search-field">
//                 <FloatingInput 
//                   label={`Doctor ${doctorNum}`}
//                   value={formData[`doctor${doctorNum}`].doctorId}
//                   onChange={(e) => handleDoctorSelect(doctorNum, e.target.value)}
//                 />
//                 <button className="CprReviewForm-search-icon">
//                   <svg viewBox="0 0 24 24" width="16" height="16">
//                     <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Popup Table */}
//       {activePopup === "patient" && (
//         <PopupTable
//           isOpen={true}
//           onClose={() => setActivePopup("")}
//           title="Select Patient"
//           columns={patientColumns}
//           data={patients}
//           onSelect={handlePatientSelect}
//         />
//       )}

//       <div className="CprReviewForm-buttons">
//         <button className="btn-blue" onClick={handleSubmit}>Save</button>
//         <button className="btn-red">Close</button>
//       </div>
//     </>
//   );
// };

// export default CprReviewForm;


// import React, { useState, useEffect } from "react";
// import './CprReviewForm.css';

// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };

//   return (
//     <div className={`CprReviewForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <input
//         type={type}
//         className="CprReviewForm-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="CprReviewForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   return (
//     <div className={`CprReviewForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <select
//         className="CprReviewForm-floating-select"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value !== '');
//         }}
//         onChange={(e) => setHasValue(e.target.value !== '')}
//         {...props}
//       >
//         <option value="">Select</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>{option.label}</option>
//         ))}
//       </select>
//       <label className="CprReviewForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const CprReviewForm = () => {
//   const [uhIdOptions, setUhIdOptions] = useState([]);
//   const [formData, setFormData] = useState({
//     uhId: "",
//     ipNo: "",
//     patientName: "",
//     age: "",
//     sex: "",
//     doa: "",
//     dept: "",
//     consultant: "",
//     roomBedNo: "",
//     date: "",
//     time: "",
//     survivalToDischarge: "",
//     stillInIcu: "",
//     cprReview: "",
//     cprReviewedBy: "",
//     doctor1: { doctorId: "" },
//     doctor2: { doctorId: "" },
//     doctor3: { doctorId: "" },
//     doctor4: { doctorId: "" },
//     ipAdmission: { ipAdmmissionId: "" }
//   });

//   useEffect(() => {
//     const fetchUHIds = async () => {
//       try {
//         const response = await fetch('http://192.168.74.165:4096/api/ip-admissions/admitted');
//         if (!response.ok) {
//           throw new Error('Failed to fetch UH IDs');
//         }
//         const data = await response.json();
//         const options = data.map((item) => ({ value: item.patient.patient.uhid, label: item.patient.patient.uhid }));
//         console.log(options);
        
//         setUhIdOptions(options);
//       } catch (error) {
//         console.error('Error fetching UH IDs:', error);
//         alert('Failed to fetch UH IDs. Please try again.');
//       }
//     };

//     fetchUHIds();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleRadioChange = (e) => {
//     setFormData(prevData => ({
//       ...prevData,
//       survivalToDischarge: e.target.value
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         date: formData.date,
//         time: formData.time,
//         survivalToDischarge: formData.survivalToDischarge,
//         stillInIcu: formData.stillInIcu,
//         cprReview: formData.cprReview,
//         ipAdmission: {
//           ipAdmmissionId: formData.ipAdmission.ipAdmmissionId
//         },
//         addDoctor1: {
//           doctorId: formData.doctor1.doctorId || 1
//         },
//         addDoctor2: {
//           doctorId: formData.doctor2.doctorId || 2
//         },
//         addDoctor3: {
//           doctorId: formData.doctor3.doctorId || 3
//         },
//         addDoctor4: {
//           doctorId: formData.doctor4.doctorId || 4
//         }
//       };

//       const response = await fetch('http://192.168.212.219:4069/api/cpr-reviews', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save CPR review');
//       }

//       const data = await response.json();
//       alert('CPR review saved successfully!');
//     } catch (error) {
//       console.error('Error saving CPR review:', error);
//       alert('Failed to save CPR review. Please try again.');
//     }
//   };

//   return (
//     <>
//       <div className="CprReviewForm-container">
//         <div className="CprReviewForm-section">
//           <div className="CprReviewForm-header">CPR Review Details</div>
//         </div>
//         <div className="CprReviewForm-section">
//           <div className="CprReviewForm-header">CPR Reviewed</div>
//           <div className="CprReviewForm-grid">
//             <FloatingSelect
//               label="UH ID"
//               name="uhId"
//               value={formData.uhId}
//               options={uhIdOptions}
//               onChange={handleChange}
//             />
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
//               value={formData.patientName}
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
//               value={formData.sex}
//               onChange={handleChange}
//             />
//             <FloatingInput
//               label="DOA"
//               type="date"
//               name="doa"
//               value={formData.doa}
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
//               value={formData.roomBedNo}
//               onChange={handleChange}
//             />
//             <FloatingInput
//               label="Date"
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//             />
//             <FloatingInput
//               label="Time"
//               type="time"
//               name="time"
//               value={formData.time}
//               onChange={handleChange}
//             />
//             <div className="CprReviewForm-form-group">
//               <label>Survival To Discharge:</label>
//               <div className="CprReviewForm-radio-button">
//                 <label>
//                   <input
//                     type="radio"
//                     name="survivalToDischarge"
//                     value="Yes"
//                     checked={formData.survivalToDischarge === "Yes"}
//                     onChange={handleRadioChange}
//                   />
//                   Yes
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="survivalToDischarge"
//                     value="No"
//                     checked={formData.survivalToDischarge === "No"}
//                     onChange={handleRadioChange}
//                   />
//                   No
//                 </label>
//               </div>
//             </div>
//             <FloatingInput
//               label="CPR Review"
//               type="text"
//               name="cprReview"
//               value={formData.cprReview}
//               onChange={handleChange}
//             />
//             <FloatingInput
//               label="CPR Reviewed By"
//               type="text"
//               name="cprReviewedBy"
//               value={formData.cprReviewedBy}
//               onChange={handleChange}
//             />
//           </div>
//           <button className="CprReviewForm-submit-button" onClick={handleSubmit}>Submit</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CprReviewForm;


// import React, { useState, useEffect } from "react";
// import './CprReviewForm.css';

// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };

//   return (
//     <div className={`CprReviewForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <input
//         type={type}
//         className="CprReviewForm-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="CprReviewForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   return (
//     <div className={`CprReviewForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <select
//         className="CprReviewForm-floating-select"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value !== '');
//         }}
//         onChange={(e) => setHasValue(e.target.value !== '')}
//         {...props}
//       >
//         <option value="">Select</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>{option.label}</option>
//         ))}
//       </select>
//       <label className="CprReviewForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const CprReviewForm = () => {
//   const [uhIdOptions, setUhIdOptions] = useState([]);
//   const [formData, setFormData] = useState({
//     uhId: "",
//     ipNo: "",
//     patientName: "",
//     age: "",
//     sex: "",
//     doa: "",
//     dept: "",
//     consultant: "",
//     roomBedNo: "",
//     date: "",
//     time: "",
//     survivalToDischarge: "",
//     stillInIcu: "",
//     cprReview: "",
//     cprReviewedBy: "",
//     doctor1: { doctorId: "" },
//     doctor2: { doctorId: "" },
//     doctor3: { doctorId: "" },
//     doctor4: { doctorId: "" },
//     ipAdmission: { ipAdmmissionId: "" }
//   });

//   useEffect(() => {
//     const fetchUHIds = async () => {
//       try {
//         const response = await fetch('http://192.168.74.165:4096/api/ip-admissions/admitted');
//         if (!response.ok) {
//           throw new Error('Failed to fetch UH IDs');
//         }
//         const data = await response.json();
//         const options = data.map((item) => ({ value: item.patient.patient.uhid, label: item.patient.patient.uhid }));
//         setUhIdOptions(options);
//       } catch (error) {
//         console.error('Error fetching UH IDs:', error);
//         alert('Failed to fetch UH IDs. Please try again.');
//       }
//     };

//     fetchUHIds();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleRadioChange = (e) => {
//     setFormData(prevData => ({
//       ...prevData,
//       survivalToDischarge: e.target.value
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         date: formData.date,
//         time: formData.time,
//         survivalToDischarge: formData.survivalToDischarge,
//         stillInIcu: formData.stillInIcu,
//         cprReview: formData.cprReview,
//         ipAdmission: {
//           ipAdmmissionId: formData.ipAdmission.ipAdmmissionId
//         },
//         doctor1: {
//           doctorId: formData.doctor1.doctorId || 1
//         },
//         doctor2: {
//           doctorId: formData.doctor2.doctorId || 2
//         },
//         doctor3: {
//           doctorId: formData.doctor3.doctorId || 3
//         },
//         doctor4: {
//           doctorId: formData.doctor4.doctorId || 4
//         }
//       };

//       const response = await fetch('http://192.168.212.219:4069/api/cpr-reviews', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save CPR review');
//       }

//       const data = await response.json();
//       alert('CPR review saved successfully!');
//     } catch (error) {
//       console.error('Error saving CPR review:', error);
//       alert('Failed to save CPR review. Please try again.');
//     }
//   };

// import React, { useState, useEffect } from "react";
// import './CprReviewForm.css';

// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//     const [activePopup, setActivePopup] = useState(null);
//     const [hasValue, setHasValue] = useState(false);

//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };

//   return (
//     <div className={`CprReviewForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <input
//         type={type}
//         className="CprReviewForm-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="CprReviewForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const FloatingSelect = ({ label, options = [], onChange, ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   const handleSelectChange = (e) => {
//     setHasValue(e.target.value !== '');
//     if (onChange) onChange(e);
//   };

//   return (
//     <div className={`CprReviewForm-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <select
//         className="CprReviewForm-floating-select"
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//         onChange={handleSelectChange}
//         {...props}
//       >
//         <option value="">Select</option>
//         {options.map((option, index) => (
//           <option key={index} value={option.value}>{option.label}</option>
//         ))}
//       </select>
//       <label className="CprReviewForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const CprReviewForm = () => {
//   const [uhIdOptions, setUhIdOptions] = useState([]);
//   const [formData, setFormData] = useState({
//     uhId: "",
//     ipNo: "",
//     patientName: "",
//     age: "",
//     sex: "",
//     doa: "",
//     consultant: "",
//     roomBedNo: "",
//     date: "",
//     time: "",
//     survivalToDischarge: "",
//     stillInIcu: "",
//     cprReview: "",
//     cprReviewedBy: "",
//     doctor1: { doctorId: "" },
//     doctor2: { doctorId: "" },
//     doctor3: { doctorId: "" },
//     doctor4: { doctorId: "" },
//     ipAdmission: { ipAdmmissionId: "" }
//   });

//   useEffect(() => {
//     const fetchUHIds = async () => {
//       try {
//         const response = await fetch('http://192.168.242.127:4096/api/ip-admissions/admitted');
//         if (!response.ok) {
//           throw new Error('Failed to fetch UH IDs');
//         }
//         const data = await response.json();
//         const options = data.map((item) => ({
//           value: item.patient.patient.uhid,
//           label: item.patient.patient.uhid
//         }));
//         setUhIdOptions(options);
//       } catch (error) {
//         console.error('Error fetching UH IDs:', error);
//         alert('Failed to fetch UH IDs. Please try again.');
//       }
//     };

//     fetchUHIds();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };
//   const handleRadioChange = (e) => {
//     setFormData(prevData => ({
//       ...prevData,
//       survivalToDischarge: e.target.value
//     }));
//   };
//   const handleUHIDChange = async (e) => {
//     const uhid = e.target.value;
//     setFormData(prevData => ({ ...prevData, uhId: uhid }));

//     if (uhid) {
//       try {
//         const response = await fetch(`http://192.168.242.127:4096/api/ip-admissions/details/${uhid}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch patient details');
//         }
//         const data = await response.json();
//         setFormData(prevData => ({
//           ...prevData,
//           ipNo: data.ipNo,
//           patientName: data.patientName,
//           age: data.age,
//           sex: data.sex,
//           doa: data.doa,
//           consultant: data.consultant,
//           roomBedNo: data.roomBedNo
//         }));
//       } catch (error) {
//         console.error('Error fetching patient details:', error);
//         alert('Failed to fetch patient details. Please try again.');
//       }
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         date: formData.date,
//         time: formData.time,
//         survivalToDischarge: formData.survivalToDischarge,
//         stillInIcu: formData.stillInIcu,
//         cprReview: formData.cprReview,
//         ipAdmission: {
//           ipAdmmissionId: formData.ipAdmission.ipAdmmissionId
//         },
//         doctor1: {
//           doctorId: formData.doctor1.doctorId || 1
//         },
//         doctor2: {
//           doctorId: formData.doctor2.doctorId || 2
//         },
//         doctor3: {
//           doctorId: formData.doctor3.doctorId || 3
//         },
//         doctor4: {
//           doctorId: formData.doctor4.doctorId || 4
//         }
//       };

//       const response = await fetch('http://192.168.212.219:4069/api/cpr-reviews', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save CPR review');
//       }

//       const data = await response.json();
//       alert('CPR review saved successfully!');
//     } catch (error) {
//       console.error('Error saving CPR review:', error);
//       alert('Failed to save CPR review. Please try again.');
//     }
//   };

//   return (
//     <>
//       <div className="CprReviewForm-container">
//         <div className="CprReviewForm-section">
//           <div className="CprReviewForm-header">CPR Review Details</div>
//         </div>
//         <div className="CprReviewForm-section">
//           <div className="CprReviewForm-header">CPR Reviewed</div>
//           <div className="CprReviewForm-grid">
//           <div className="CprReviewForm-search-field">
//               <FloatingInput
//                 label="MRNO"
//                 type="text"
//                 name="uhid"
//                 value={formData.uhid}
//                 onChange={handleChange}
//               />
//               <button
//                 className="CprReviewForm-search-icon"
//                 onClick={() => setActivePopup("MrNo")}
//               >
//                 <svg viewBox="0 0 24 24" width="16" height="16">
//                   <path
//                     fill="currentColor"
//                     d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <FloatingSelect
//               label="UH ID"
//               name="uhId"
//               value={formData.uhId}
//               options={uhIdOptions}
//               onChange={handleChange}
//             />
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
//               value={formData.patientName}
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
//               value={formData.sex}
//               onChange={handleChange}
//             />
//             <FloatingInput
//               label="DOA"
//               type="date"
//               name="doa"
//               value={formData.doa}
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
//               value={formData.roomBedNo}
//               onChange={handleChange}
//             />
//             <FloatingInput
//               label="Date"
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//             />
//             <FloatingInput
//               label="Time"
//               type="time"
//               name="time"
//               value={formData.time}
//               onChange={handleChange}
//             />
//             <div className="CprReviewForm-form-group">
//               <label>Survival To Discharge:</label>
//               <div className="CprReviewForm-radio-button">
//                 <label>
//                   <input
//                     type="radio"
//                     name="survivalToDischarge"
//                     value="Yes"
//                     checked={formData.survivalToDischarge === "Yes"}
//                     onChange={handleRadioChange}
//                   />
//                   Yes
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="survivalToDischarge"
//                     value="No"
//                     checked={formData.survivalToDischarge === "No"}
//                     onChange={handleRadioChange}
//                   />
//                   No
//                 </label>
//               </div>
//             </div>
//             <FloatingInput
//               label="CPR Review"
//               type="text"
//               name="cprReview"
//               value={formData.cprReview}
//               onChange={handleChange}
//             />
//             <FloatingInput
//               label="CPR Reviewed By"
//               type="text"
//               name="cprReviewedBy"
//               value={formData.cprReviewedBy}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="CprReviewForm-section">
//           <div className="CprReviewForm-header">CPR Reviewed By</div>
//           <div className="CprReviewForm-grid">
//             {/* {[1, 2, 3, 4].map((doctorNum) => (
//               <FloatingInput
//                 key={doctorNum}
//                 label={`Doctor ${doctorNum}`}
//                 value={formData[`doctor${doctorNum}`].doctorId}
//                 onChange={(e) => handleDoctorSelect(doctorNum, e.target.value)}
//               />
//             ))} */}
//             <FloatingSelect 
//             label="Doctor1"  
//             options={[
//               { value: 'select', label: 'Select' },
//               { value: 'doctorABC', label: 'DoctorABC' },
              
//             ]}
//           />
//             <FloatingSelect 
//             label="Doctor2"  
//             options={[
//               { value: 'select', label: 'Select' },
//               { value: 'doctorABC', label: 'DoctorABC' },
              
//             ]}
//           />
//             <FloatingSelect 
//             label="Doctor3"  
//             options={[
//               { value: 'select', label: 'Select' },
//               { value: 'doctorABC', label: 'DoctorABC' },
              
//             ]}
//           />
//             <FloatingSelect 
//             label="Doctor4"  
//             options={[
//               { value: 'select', label: 'Select' },
//               { value: 'doctorABC', label: 'DoctorABC' },
              
//             ]}
//           />
//           </div>
//         </div>
//       </div>

//       <div className="CprReviewForm-buttons">
//         <button className="btn-blue" onClick={handleSubmit}>Save</button>
//         <button className="btn-red">Close</button>
//       </div>
//           {/* <button className="CprReviewForm-submit-button" onClick={handleSubmit}>Submit</button> */}
//         </div>
//       {/* </div> */}
//     </>
//   );
// };

// export default CprReviewForm;
                       