// import React, { useState, useRef,useEffect } from "react";
// import "./IncidentReport.css";
// import axios from "axios";
// import PopupTable from "../popup";
// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);

//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };
//   return (
//     <div
//       className={`IncidentReport-floating-field ${
//         isFocused || hasValue ? "active" : ""
//       }`}
//     >
//       <input
//         type={type}
//         className="IncidentReport-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="IncidentReport-floating-label">{label}</label>
//     </div>
//   );
// };
// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);
//   return (
//     <div
//       className={`IncidentReport-floating-field ${
//         isFocused || hasValue ? "active" : ""
//       }`}
//     >
//       <select
//         className="IncidentReport-floating-select"
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
//       <label className="IncidentReport-floating-label">{label}</label>
//     </div>
//   );
// };
// const IncidentReport = () => {
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
//   });
//   useEffect(() => {
//     if (activePopup === "MrNo") {
//         fetchMrno();
//      }
//   }, [activePopup]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//     try {
//       const response = await fetch("http://192.168.1.34:4069/api/gcs-sheets", { 
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
// const handleChange = (e) => {
// const { name, value, type, checked } = e.target;
// const fieldValue = type === "checkbox" ? checked : value;
// setFormData((prevData) => ({
//   ...prevData,
//   [name]: fieldValue,
// }));
// }
// const fetchMrno = async () => {
// try {
//     const response = await axios.get(`http://192.168.1.36:4068/api/ip-admissions`);
//     setMrNoData(response.data);
//     console.log(mrNoData);
//     console.log(data)
// } catch (error) {
//     console.error("Error fetching data:", error);
// }
// };
// const handleSelect = (data) => {
// console.log(data ,"selected data");
// if (activePopup === "MrNo") {
//   setFormData((prevFormData) => ({
//       ...prevFormData,
//       uhid: data.uhid,
//       firstName: data.firstName,
//       lastName: data.lastName,
//       age:data?.age,
//       gender: data?.realobj?.patient?.patient?.gender,
//       address: data?.realobj?.patient?.patient?.address,
//       adharCardId: data?.realobj?.patient?.patient?.adharCardId,
//       ipNo: data?.realobj?.patient?.inPatientId,
//       admissionDate: data?.realobj?.admissionDate,
//       consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
//       roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
//       bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
//   }));
// }
// setActivePopup(null);
// };
// const getPopupData = () => {
// if (activePopup === "MrNo") {
// const popupData = {
//   columns: ["uhid", "firstName", "lastName"],
//   data: Array.isArray(mrNoData)
//     ? mrNoData.map((user) => ({
//         uhid: user?.patient?.patient?.uhid,
//         ipNo: user?.patient?.patient?.ipNo,
//         firstName: user?.patient?.patient?.firstName,
//         lastName: user?.patient?.patient?.lastName,
//         age: user?.patient?.patient?.age,
//         sex:user?.sex,
//         roomNumber:user?.patient?.roomNumber,
//         realobj:user
//       }))
//     : [],
// };
// console.log("Popup Data:", popupData);
// return popupData;
// }
// return { columns: [], data: [] };
// };
// const { columns, data } = getPopupData();
// const [rows, setRows] = useState([
// { sn: 1, drug: "", dose: "", route: "", remarks: "" }
// ]); // Added initial dummy data
// const tableRef = useRef(null);
// const handleAddRow = () => {
// setRows((prevRows) => [
// ...prevRows,
// { sn: prevRows.length + 1, drug: "", dose: "", route: "", remarks: "" }
// ]);
// };
// const handleDeleteRow = (index) => {
// setRows((prevRows) => prevRows.filter((_, i) => i !== index));
// };
//   return (
//     <>
//       <div className="IncidentReport-container">
//         <div className="IncidentReport-section">
//           <div className="IncidentReport-header">Incident Report</div>
//           <div className="IncidentReport-grid">
//             <FloatingInput label="Type" />
//             <div className="IncidentReport-form-search-field">
//             <FloatingInput label="MRNO" type="text" name="mrno" 
//             value={formData.uhid}
//             />
//             <button className="IncidentReport-form-search-icon" 
//             onClick={() => setActivePopup("MrNo")}
//             >
//               <svg viewBox="0 0 24 24" width="16" height="16">
//                 <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//               </svg>
//             </button>
//             </div>
//             <FloatingInput label="IP NO" value={formData.ipNo}/>
//             <FloatingInput label="Name"  value={`${formData.firstName} ${formData.lastName}`}/>
//             <FloatingInput label="Age" value={formData.age}/>
//             <FloatingInput label="Sex" value={formData.gender} />
//             <FloatingInput label="Date Of Admission" type="date" value={formData.admissionDate}/>
//             <FloatingInput label="Date Of Discharge" type="date" value={formData.admissionDate}/>
//             <FloatingInput label="Consultant"  value={formData.consultant} />
//             <FloatingInput label="Room No / Bed No" value={`${formData.roomNumber} / ${formData.bedNo}`} />
//             <FloatingInput label="Incident Name" />
//             <FloatingInput label="Incident Date" type="date" />
//             <FloatingInput label="Incident Time" type="time" />
//             <FloatingInput label="Reporting Date" type="date" />
//             <FloatingInput label="Reporting Time" type="time" />
//             <FloatingInput label="Incident Number(Given By QM-NABH)" />
//             <FloatingInput label="Discription Of Incident" />
//           </div>
//         </div>

//         {activePopup && (
//               <PopupTable
//               columns={columns}
//               data={data}
//               onSelect={handleSelect}
//                onClose={() => setActivePopup(null)}
//               />
//                       )}
//         <div className="IncidentReport-buttons">
//         <button className="btn-blue">Add</button>
//       </div>
//       </div>
//     </>
//   );
// };
// export default IncidentReport;




import React, { useState, useRef, useEffect } from "react";
import "./IncidentReport.css";
import axios from "axios";
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
    <div className={`IncidentReport-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <input
        type={type}
        className="IncidentReport-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="IncidentReport-floating-label">{label}</label>
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
    <div className={`IncidentReport-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <select
        className="IncidentReport-floating-select"
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
      <label className="IncidentReport-floating-label">{label}</label>
    </div>
  );
};

const IncidentReport = () => {
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
    incidentName: "",
    incidentDate: "",
    incidentTime: "",
    reportingDate: "",
    reportingTime: "",
    incidentNumber: "",
    descriptionOfIncident: "",
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
        reportingDate: formData.reportingDate,
        incidentName: formData.incidentName,
        incidentDate: formData.incidentDate,
        reportingTime: formData.reportingTime,
        descriptionOfIncident: formData.descriptionOfIncident,
        incidentTime: formData.incidentTime,
        incidentNumber: formData.incidentNumber,
        ipAdmission: {
          ipAdmmissionId: formData.ipAdmission.ipAdmmissionId
        }
      };

      const response = await axios.post('http://192.168.1.46:4096/api/incident-reports', payload);
      
      if (response.status === 200 || response.status === 201) {
        alert('Incident report saved successfully!');
      } else {
        throw new Error('Failed to save incident report');
      }
    } catch (error) {
      console.error('Error saving incident report:', error);
      alert('Failed to save incident report. Please try again.');
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
      setFormData((prevFormData) => ({
        ...prevFormData,
        uhid: data.uhid,
        firstName: data.firstName,
        lastName: data.lastName,
        age: data?.age,
        gender: data?.realobj?.patient?.patient?.gender,
        ipNo: data?.realobj?.patient?.inPatientId,
        admissionDate: data?.realobj?.admissionDate,
        consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
        roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
        bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
        ipAdmission: {
          ipAdmmissionId: data?.realobj?.patient?.inPatientId
        }
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
              sex: user?.sex,
              roomNumber: user?.patient?.roomNumber,
              realobj: user
            }))
          : [],
      };
      return popupData;
    }
    return { columns: [], data: [] };
  };

  const { columns, data } = getPopupData();

  return (
    <>
      <div className="IncidentReport-container">
        <div className="IncidentReport-section">
          <div className="IncidentReport-header">Incident Report</div>
          <div className="IncidentReport-grid">
            <FloatingInput label="Type" />
            <div className="IncidentReport-form-search-field">
              <FloatingInput
                label="MRNO"
                type="text"
                name="uhid"
                value={formData.uhid}
                onChange={handleChange}
              />
              <button
                className="IncidentReport-form-search-icon"
                onClick={() => setActivePopup("MrNo")}
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                  />
                </svg>
              </button>
            </div>
            <FloatingInput label="IP NO" value={formData.ipNo} readOnly />
            <FloatingInput
              label="Name"
              value={`${formData.firstName} ${formData.lastName}`}
              readOnly
            />
            <FloatingInput label="Age" value={formData.age} readOnly />
            <FloatingInput label="Sex" value={formData.gender} readOnly />
            <FloatingInput
              label="Date Of Admission"
              type="date"
              value={formData.admissionDate}
              readOnly
            />
            <FloatingInput label="Date Of Discharge" type="date" />
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
              label="Incident Name"
              name="incidentName"
              value={formData.incidentName}
              onChange={handleChange}
            />
            <FloatingInput
              label="Incident Date"
              type="date"
              name="incidentDate"
              value={formData.incidentDate}
              onChange={handleChange}
            />
            <FloatingInput
              label="Incident Time"
              type="time"
              name="incidentTime"
              value={formData.incidentTime}
              onChange={handleChange}
            />
            <FloatingInput
              label="Reporting Date"
              type="date"
              name="reportingDate"
              value={formData.reportingDate}
              onChange={handleChange}
            />
            <FloatingInput
              label="Reporting Time"
              type="time"
              name="reportingTime"
              value={formData.reportingTime}
              onChange={handleChange}
            />
            <FloatingInput
              label="Incident Number(Given By QM-NABH)"
              name="incidentNumber"
              value={formData.incidentNumber}
              onChange={handleChange}
            />
            <FloatingInput
              label="Description Of Incident"
              name="descriptionOfIncident"
              value={formData.descriptionOfIncident}
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
        
        <div className="IncidentReport-buttons">
          <button className="btn-blue" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default IncidentReport;