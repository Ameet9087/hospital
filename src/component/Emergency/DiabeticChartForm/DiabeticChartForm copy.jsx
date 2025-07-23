import React, { useState, useRef, useEffect } from "react";
import { startResizing } from "../../TableHeadingResizing/resizableColumns"; 
import './DiabeticChartForm.css';
import PopupTable from "../popup";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
const FloatingInput = ({ label, type = "text", ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };
  return (
    <div className={`diabetic-chart-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <input
        type={type}
        className="diabetic-chart-form-floating-input"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="diabetic-chart-form-floating-label">{label}</label>
    </div>
  );
};
const FloatingSelect = ({ label, options = [], ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  return (
    <div className={`diabetic-chart-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <select
        className="diabetic-chart-form-floating-select"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== '');
        }}
        onChange={(e) => setHasValue(e.target.value !== '')}
        {...props}
      >
        <option value="">{}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      <label className="diabetic-chart-form-floating-label">{label}</label>
    </div>
  );
};
const DiabeticChartForm = () => {
  const [rows, setRows] = useState([
    { sn: 1, drug: "", dose: "", route: "", remarks: "" }
  ]); // Added initial dummy data
    const tableRef = useRef(null);
  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { sn: prevRows.length + 1, drug: "", dose: "", route: "", remarks: "" }
    ]);
  };
  const handleDeleteRow = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };
  const [mrNoData, setMrNoData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({
uhid: "",
ipNo: "",
patientName: "",
patientLName: "",
age: "",
sex: "",
admissionDate: "",
consultant: "",
roomBedNo: "",
bedNo:"",
ward:"",
eyesOpen: "",
eyeClosedBy: "",
bestVerbalResponse: "",
ettubeOfTrochosTubeT: "",
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
});
useEffect(() => {
    if (activePopup === "MrNo") {
        fetchMrno();
     }
  }, [activePopup]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    try {
      const response = await fetch(`${API_BASE_URL}/diabeticChart`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }
      const result = await response.json();
      console.log("Form submission success:", result);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit form.");
    }
  };
const handleChange = (e) => {
const { name, value, type, checked } = e.target;
const fieldValue = type === "checkbox" ? checked : value;
setFormData((prevData) => ({
  ...prevData,
  [name]: fieldValue,
}));
}
const fetchMrno = async () => {
try {
    const response = await axios.get(`${API_BASE_URL}/ip-admissions`);
    setMrNoData(response.data);
    console.log(mrNoData);
    console.log(data)
} catch (error) {
    console.error("Error fetching data:", error);
}
};
const handleSelect = (data) => {
console.log(data ,"selected data");
if (activePopup === "MrNo") {
  setFormData((prevFormData) => ({
      ...prevFormData,
      uhid: data.uhid,
      firstName: data.firstName,
      lastName: data.lastName,
      age:data.age,
      sex:data?.realobj?.sex,
      ipNo:data?.realobj?.patient?.inPatientId,
      consultant:data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
      roomNumber:data?.realobj?.roomDetails?.roomDTO?.roomNumber,
      bedNo:data?.realobj?.roomDetails?.bedDTO?.bedNo,
      ward:data?.realobj?.roomDetails?.roomTypeDTO.wardName
  }));
}
setActivePopup(null);
};
const getPopupData = () => {
if (activePopup === "MrNo") {
const popupData = {
  columns: ["uhid", "firstName", "lastName"],
  data: Array.isArray(mrNoData)
    ? mrNoData.map((user) => ({
        uhid: user?.patient?.patient?.uhid,
        ipNo: user?.patient?.patient?.ipNo,
        firstName: user?.patient?.patient?.firstName,
        lastName: user?.patient?.patient?.lastName,
        age: user?.patient?.patient?.age,
        sex:user?.patient?.patient?.sex,
        roomNumber:user?.patient?.roomNumber,
        realobj:user
      }))
    : [],
};
console.log("Popup Data:", popupData);
return popupData;
}
return { columns: [], data: [] };
};
const { columns, data } = getPopupData();
  return (
    <>
    <div className="diabetic-chart-form-container">
      <div className="diabetic-chart-form-section">
      </div>
      <div className="diabetic-chart-form-section">
        <div className="diabetic-chart-form-header">Diabetic Chart Details</div>
        <div className="diabetic-chart-form-grid">
          <div className="diabetic-chart-form-search-field">
            <FloatingInput label="MRNO" type="text" name="mrno" value={formData.uhid}/>
            <button className="diabetic-chart-form-search-icon" onClick={() => setActivePopup("MrNo")}>
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
              </svg>
            </button>
            </div>
          <FloatingInput label="IPNo" value={formData.ipNo} />
          <FloatingInput label="Patient Name" value={`${formData.firstName} ${formData.lastName}`} />
          <FloatingInput label="Age" value={formData.age} />
          <FloatingInput label="Ward" value={formData.ward}/>
          <FloatingInput label="Room NO/ Bed No" value={`${formData.roomNumber}/ ${formData.bedNo}`}/>
          <FloatingInput label="Consultant" value={formData.consultant}/>
          <FloatingInput label="Date" type='date' />
          <FloatingInput label="Time" type='time' />
          <FloatingInput label="Blood Sugar Values" />
          <FloatingInput label="Urine Acetone" />
        </div>
      </div>
    </div>
    <div className="diabetic-chart-form-header">Diabetic Chart Details</div>
    <table ref={tableRef} className="diabetic-chart-form-table">
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
                  className="diabetic-chart-form-add-btn"
                  onClick={handleAddRow}
                >
                  Add
                </button>
                <button
                  className="diabetic-chart-form-del-btn"
                  onClick={() => handleDeleteRow(index)}
                  disabled={rows.length <= 1}
                >
                  Del
                </button>
              </td>
              <td>{row.sn}</td>
              <td><input type="text"  /></td>
              <td><input type="text" /></td>
              <td><input type="text"  /></td>
              <td><input type="text"  /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {activePopup && (
              <PopupTable
              columns={columns}
              data={data}
              onSelect={handleSelect}
               onClose={() => setActivePopup(null)}
              />
                      )}
          <div className="diabetic-chart-form-buttons">
              <button className="btn-blue" >Save</button>
            </div>
            </>
  );
};
export default DiabeticChartForm;



// import React, { useState, useRef, useEffect } from "react";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns"; 
// import './DiabeticChartForm.css';
// import PopupTable from "../popup";
// import axios from "axios";

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
//     <div className={`diabetic-chart-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <input
//         type={type}
//         className="diabetic-chart-form-floating-input"
//         value={value}
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="diabetic-chart-form-floating-label">{label}</label>
//     </div>
//   );
// };

// const FloatingSelect = ({ label, options = [], value, ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(!!value);

//   useEffect(() => {
//     setHasValue(!!value);
//   }, [value]);

//   return (
//     <div className={`diabetic-chart-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <select
//         className="diabetic-chart-form-floating-select"
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
//       <label className="diabetic-chart-form-floating-label">{label}</label>
//     </div>
//   );
// };

// const DiabeticChartForm = () => {
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://192.168.1.36:4068/api/diabeticChart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
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
//       const response = await axios.get("http://192.168.1.36:4068/api/ip-admissions");
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
//         ward: data?.realobj?.roomDetails?.roomTypeDTO.wardName
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
//       <div className="diabetic-chart-form-container">
//         <div className="diabetic-chart-form-section">
//           <div className="diabetic-chart-form-header">Diabetic Chart Details</div>
//           <div className="diabetic-chart-form-grid">
//             <div className="diabetic-chart-form-search-field">
//               <FloatingInput
//                 label="MRNO"
//                 type="text"
//                 name="uhid"
//                 value={formData.uhid}
//                 onChange={handleChange}
//               />
//               <button className="diabetic-chart-form-search-icon" onClick={() => setActivePopup("MrNo")}>
//                 <svg viewBox="0 0 24 24" width="16" height="16">
//                   <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//                 </svg>
//               </button>
//             </div>
//             <FloatingInput label="IPNo" value={formData.ipNo} name="ipNo" onChange={handleChange} />
//             <FloatingInput
//               label="Patient Name"
//               value={`${formData.firstName}${formData.lastName}`}
//               readOnly
//             />
//             <FloatingInput label="Age" value={formData.age} name="age" onChange={handleChange} />
//             <FloatingInput label="Ward" value={formData.ward} name="ward" onChange={handleChange} />
//             <FloatingInput
//               label="Room NO/ Bed No"
//               value={`${formData.roomNumber}/${formData.bedNo}`}
//               readOnly
//             />
//             <FloatingInput
//               label="Consultant"
//               value={formData.consultant}
//               name="consultant"
//               onChange={handleChange}
//             />
//             <FloatingInput label="Date" type="date" name="date" onChange={handleChange} />
//             <FloatingInput label="Time" type="time" name="time" onChange={handleChange} />
//             <FloatingInput
//               label="Blood Sugar Values"
//               name="bloodSugarValues"
//               onChange={handleChange}
//             />
//             <FloatingInput
//               label="Urine Acetone"
//               name="urineAcetone"
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="diabetic-chart-form-header">Diabetic Chart Details</div>
//       <table ref={tableRef} className="diabetic-chart-form-table">
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
//                   className="diabetic-chart-form-add-btn"
//                   onClick={handleAddRow}
//                 >
//                   Add
//                 </button>
//                 <button
//                   className="diabetic-chart-form-del-btn"
//                   onClick={() => handleDeleteRow(index)}
//                   disabled={rows.length <= 1}
//                 >
//                   Del
//                 </button>
//               </td>
//               <td>{row.sn}</td>
//               <td><input type="text" /></td>
//               <td><input type="text" /></td>
//               <td><input type="text" /></td>
//               <td><input type="text" /></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {activePopup && (
//         <PopupTable
//           columns={columns}
//           data={data}
//           onSelect={handleSelect}
//           onClose={() => setActivePopup(null)}
//         />
//       )}
//       <div className="diabetic-chart-form-buttons">
//         <button className="btn-blue" onClick={handleSubmit}>Save</button>
//       </div>
//     </>
//   );
// };

// export default DiabeticChartForm;