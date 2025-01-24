// import React, { useState, useRef, useEffect } from "react";
// import "./EstimationSeverityBurnWoundDetails.css";
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
//     <div
//       className={`EstimationSeverityBurnWoundDetails-floating-field ${
//         isFocused || hasValue ? "active" : ""
//       }`}
//     >
//       <input
//         type={type}
//         className="EstimationSeverityBurnWoundDetails-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="EstimationSeverityBurnWoundDetails-floating-label">{label}</label>
//     </div>
//   );
// };
// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);
//   return (
//     <div
//       className={`EstimationSeverityBurnWoundDetails-floating-field ${
//         isFocused || hasValue ? "active" : ""
//       }`}
//     >
//       <select
//         className="EstimationSeverityBurnWoundDetails-floating-select"
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
//       <label className="EstimationSeverityBurnWoundDetails-floating-label">{label}</label>
//     </div>
//   );
// };
// const EstimationSeverityBurnWoundDetails = () => {
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
//       const response = await fetch("http://192.168.1.36:4068/api/diabeticChart", {
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
//       <div className="EstimationSeverityBurnWoundDetails-container">
//         <div className="EstimationSeverityBurnWoundDetails-section">
//           <div className="EstimationSeverityBurnWoundDetails-header">Estimation Severity Burn Wound Details</div>
//           <div className="EstimationSeverityBurnWoundDetails-grid">
//           <div className="EstimationSeverityBurnWoundDetails-search-field">
//               <FloatingInput
//                 label="MRNO"
//                 type="text"
//                 name="uhid"
//                 value={formData.uhid}
//                 onChange={handleChange}
//               />
//               <button className="EstimationSeverityBurnWoundDetails-search-icon" onClick={() => setActivePopup("MrNo")}>
//                 <svg viewBox="0 0 24 24" width="16" height="16">
//                   <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//                 </svg>
//               </button>
//             </div>
//             <FloatingInput label="IP No" value={formData.ipNo}/>
//             <FloatingInput label="Name" value={`${formData.firstName} ${formData.lastName}`} />
//             <FloatingInput label="Age" value={formData.age}/>
//             <FloatingInput label="Sex" value={formData.gender} />
//             <FloatingInput label="Date Of Admission" type="date" value={formData.doa} />
//             <FloatingInput label="Consultant" value={formData.consultant}/>
//             <FloatingInput label="Room No / Bed No" value={`${formData.roomNumber} / ${formData.bedNo}`}/>
//             <FloatingInput label="Admission Weight" />
//             <FloatingInput label="Region" />
//             <FloatingInput label="Left Arm" />
//             <FloatingInput label="Right Arm" />
//             <FloatingInput label="Head" />
//             <FloatingInput label="Neck" />
//             <FloatingInput label="Anterior Trunk" />
//             <FloatingInput label="Posterior Trunk" />
//             <FloatingInput label="Buttocks" />
//             <FloatingInput label="Genitalia" />
//             <FloatingInput label="Right Leg" />
//             <FloatingInput label="Left Leg" />
//             <FloatingInput label="Total Burn" />
//             <FloatingInput label="Chart" />
//           </div>
//         </div>
//         {activePopup && (
//         <PopupTable
//           columns={columns}
//           data={data}
//           onSelect={handleSelect}
//           onClose={() => setActivePopup(null)}
//         />
//       )}
//         <div className="EstimationSeverityBurnWoundDetails-buttons">
//         <button className="btn-blue">Add</button>
//       </div>
//       </div>
//     </>
//   );
// };
// export default EstimationSeverityBurnWoundDetails;

import React, { useState, useRef, useEffect } from "react";
import "./EstimationSeverityBurnWoundDetails.css";
import PopupTable from "../popup";
import axios from "axios";

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
    <div className={`EstimationSeverityBurnWoundDetails-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <input
        type={type}
        className="EstimationSeverityBurnWoundDetails-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="EstimationSeverityBurnWoundDetails-floating-label">{label}</label>
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
    <div className={`EstimationSeverityBurnWoundDetails-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <select
        className="EstimationSeverityBurnWoundDetails-floating-select"
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
      <label className="EstimationSeverityBurnWoundDetails-floating-label">{label}</label>
    </div>
  );
};

const EstimationSeverityBurnWoundDetails = () => {
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
    ward: "",
    admissionWeight: "",
    region: "Upper Body",
    leftArm: "",
    rightArm: "",
    head: "",
    neck: "",
    anteriorTrunk: "",
    posteriorTrunk: "",
    buttocks: "",
    genitalia: "",
    rightLeg: "",
    leftLeg: "",
    totalBurn: "",
    chart: "",
    ipAdmissionDTO: {
      ipAdmmissionId: null
    }
  });

  useEffect(() => {
    if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);

  const calculateTotalBurn = () => {
    const burnAreas = [
      'leftArm', 'rightArm', 'head', 'neck', 'anteriorTrunk',
      'posteriorTrunk', 'buttocks', 'genitalia', 'rightLeg', 'leftLeg'
    ];
    
    const total = burnAreas.reduce((sum, area) => {
      const value = parseFloat(formData[area]) || 0;
      return sum + value;
    }, 0);

    setFormData(prev => ({
      ...prev,
      totalBurn: total.toFixed(1)
    }));
  };

  useEffect(() => {
    calculateTotalBurn();
  }, [
    formData.leftArm, formData.rightArm, formData.head, formData.neck,
    formData.anteriorTrunk, formData.posteriorTrunk, formData.buttocks,
    formData.genitalia, formData.rightLeg, formData.leftLeg
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        sex: data?.realobj?.sex,
        ipNo: data?.realobj?.patient?.inPatientId,
        consultant:data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
        roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
        dateOfAdmission:data?.realobj?.admissionDate|| "N/A",
                bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
        ward: data?.realobj?.roomDetails?.roomTypeDTO.wardName,
        // ipAdmissionDTO: {
        //   ipAdmmissionId: data?.realobj?.ipAdmissionId
        // }
      }));
    }
    setActivePopup(null);
  };

  const handleSave = async () => {
    const payload = {
      region: formData.region,
      neck: parseFloat(formData.neck) || 0,
      rightArm: parseFloat(formData.rightArm) || 0,
      rightLeg: parseFloat(formData.rightLeg) || 0,
      chart: formData.chart,
      leftArm: parseFloat(formData.leftArm) || 0,
      anteriorTrunk: parseFloat(formData.anteriorTrunk) || 0,
      buttocks: parseFloat(formData.buttocks) || 0,
      leftLeg: parseFloat(formData.leftLeg) || 0,
      head: parseFloat(formData.head) || 0,
      posteriorTrunk: parseFloat(formData.posteriorTrunk) || 0,
      genitalia: parseFloat(formData.genitalia) || 0,
      totalBurn: parseFloat(formData.totalBurn) || 0,
      // ipAdmission: {
      //   ipAdmmissionId: formData.ipAdmissionDTO.ipAdmmissionId
      // }
    };

    try {
      const response = await axios.post(
        "http://192.168.1.46:4096/api/v1/estimation-burn-wound-details",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        alert("Data saved successfully!");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
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
      <div className="EstimationSeverityBurnWoundDetails-container">
        <div className="EstimationSeverityBurnWoundDetails-section">
          <div className="EstimationSeverityBurnWoundDetails-header">
            Estimation Severity Burn Wound Details
          </div>
          <div className="EstimationSeverityBurnWoundDetails-grid">
            <div className="EstimationSeverityBurnWoundDetails-search-field">
              <FloatingInput
                label="MRNO"
                type="text"
                name="uhid"
                value={formData.uhid}
                onChange={handleChange}
              />
              <button 
                className="EstimationSeverityBurnWoundDetails-search-icon" 
                onClick={() => setActivePopup("MrNo")}
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
                </svg>
              </button>
            </div>
            <FloatingInput label="IP No" value={formData.ipNo} readOnly />
            <FloatingInput 
              label="Name" 
              value={`${formData.firstName} ${formData.lastName}`} 
              readOnly 
            />
            <FloatingInput label="Age" value={formData.age} readOnly />
            <FloatingInput label="Sex" value={formData.sex} readOnly />
            <FloatingInput 
              label="Date Of Admission" 
              type="date" 
              name="admissionDate"
              value={formData.dateOfAdmission}
              onChange={handleChange}
            />
            <FloatingInput label="Consultant" value={formData.consultant} readOnly />
            <FloatingInput 
              label="Room No / Bed No" 
              value={`${formData.roomNumber} / ${formData.bedNo}`} 
              readOnly 
            />
            <FloatingInput 
              label="Admission Weight"
              name="admissionWeight"
              value={formData.admissionWeight}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Region" 
              name="region"
              value={formData.region}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Left Arm" 
              name="leftArm"
              type="number"
              value={formData.leftArm}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Right Arm"
              name="rightArm"
              type="number"
              value={formData.rightArm}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Head"
              name="head"
              type="number"
              value={formData.head}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Neck"
              name="neck"
              type="number"
              value={formData.neck}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Anterior Trunk"
              name="anteriorTrunk"
              type="number"
              value={formData.anteriorTrunk}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Posterior Trunk"
              name="posteriorTrunk"
              type="number"
              value={formData.posteriorTrunk}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Buttocks"
              name="buttocks"
              type="number"
              value={formData.buttocks}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Genitalia"
              name="genitalia"
              type="number"
              value={formData.genitalia}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Right Leg"
              name="rightLeg"
              type="number"
              value={formData.rightLeg}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Left Leg"
              name="leftLeg"
              type="number"
              value={formData.leftLeg}
              onChange={handleChange}
            />
            <FloatingInput 
              label="Total Burn"
              name="totalBurn"
              value={formData.totalBurn}
              readOnly
            />
            <FloatingInput 
              label="Chart"
              name="chart"
              value={formData.chart}
              onChange={handleChange}
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
        <div className="EstimationSeverityBurnWoundDetails-buttons">
          <button className="btn-blue" onClick={handleSave}>Save</button>
        </div>
      </div>
    </>
  );
};

export default EstimationSeverityBurnWoundDetails;