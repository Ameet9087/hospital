import React, { useState, useRef, useEffect } from "react";
import "./AccidentReportForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopupTable from "../Services/PopupTable";
import { API_BASE_URL } from "../api/api";
const FloatingInput = ({ label, type = "text", ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };
  return (
    <div
      className={`AccidentReportForm-floating-field ${
        isFocused || hasValue ? "active" : ""
      }`}
    >
      <input
        type={type}
        className="AccidentReportForm-floating-input"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="AccidentReportForm-floating-label">{label}</label>
    </div>
  );
};
// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);
//   return (
//     <div
//       className={`AccidentReportForm-floating-field ${
//         isFocused || hasValue ? "active" : ""
//       }`}
//     >
//       <select
//         className="AccidentReportForm-floating-select"
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
//       <label className="AccidentReportForm-floating-label">{label}</label>
//     </div>
//   );
// };
const AccidentReportForm = ({ onClose }) => {
    const [mrNoData, setMrNoData] = useState([]);
    const [activePopup, setActivePopup] = useState(null);
    const [formData, setFormData] = useState({
    // mrno: "",
    // ipno: "",
    // patientName: "",
    // age: "",
    // sex: "",
    // dateOfAdmission: "",
    // dateOfDischarge: "",
    // departmentName: "",
    // ward: "",
    // doctorName: "",
   
    // arrivalDate: "",
    // arrivalTime: "",
    // fatherHusbandName: "",

    // occupation: "",
    // address: "",
    // identificationMarks: "",
    // broughtBy: "",
    // relationship: "",
    // phoneNo: "",
    hospitalNo: "",
    informedToPolice: "",
    nameOfPolice: "",
    policeStation: "",
    diagnosis: "",
    mechanismOfInjury: "",
    siteOfIncident: "",
    otherDetails: "",
    landmark: "",
    incidentDate: "",
    incidentTime: "",
    injuriesSustained: "",
    natureOfInjury: "",
    medicalOfficerSignature: "",
    preferredFromOtherHospital: "",
    hospitalName: "",
    registrationNumber: "",
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
          const response = await fetch(`${API_BASE_URL}/accident-report-details`, { 
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
  };


  const fetchMrno = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/ip-admissions`);
        setMrNoData(response.data);
        console.log(mrNoData);
        
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
            firstName: data.employeeId,
            age:data.age,
            sex:data.sex,
            ipNo:data?.ipAdmmissionId

           

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
              firstName: user?.patient?.patient?.firstName,
              lastName: user?.patient?.patient?.lastName,
              age: user?.patient?.patient?.age,
              sex:user?.patient?.patient?.sex,
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
  const navigate = useNavigate();
  const handleBack = () => navigate("/emergency/erinitial");

  return (
    <>
      <div className="AccidentReportForm-container">
        <div className="AccidentReportForm-section">
        <div className="er-initial-assessment-com-section">
        <button className="er-initial-assessment-com-section-back" onClick={handleBack}>Back</button>

        </div>

          <div className="AccidentReportForm-header">
            Accident Report Details
          </div>
        </div>
        <div className="AccidentReportForm-section">
          <div className="AccidentReportForm-header">CPR Reviewed </div>
          <div className="AccidentReportForm-grid">
          <div className="OPDPostDiscount-search-field">
            <FloatingInput label="MRNO" type="text" name="mrno" value={formData.uhid}/>
            <button className="OPDPostDiscount-search-icon" onClick={() => setActivePopup("MrNo")}>
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
              </svg>
            </button>
            </div>
            <FloatingInput label="IP No " type="text" name="ipNo" value={formData.ipNo} />
            <FloatingInput
              label="Patient Name"
              type="text"
              name="patientName"
            />
            <FloatingInput label="Age" type="text" name="age" value={formData.age} onchange={handleChange}/>
            <FloatingInput label="Sex" type="text" name="sex" value={formData.sex} />
            <FloatingInput
              label="Date Of Admission"
              type="date"
              name="dateOfAdmission"
            />
            <FloatingInput
              label="Date Of Discharge"
              type="date"
              name="dateOfDischarge"
            />
            <FloatingInput
              label="Department Name"
              type="text"
              name="departmentName"
            />
            <FloatingInput label="Ward" type="text" name="ward" />
            <FloatingInput label="Doctor Name" type="text" name="doctorName" />
            <FloatingInput label="Hospital No" type="text" name="hospitalNo" />
            <FloatingInput
              label="Arrival Date"
              type="date"
              name="arrivalDate"
            />
            <FloatingInput
              label="Arrival Time"
              type="time"
              name="arrivalTime"
            />
            <FloatingInput
              label="Father/Husband Name"
              type="text"
              name="fatherHusbandName"
            />
            <FloatingInput label="Occupation" type="text" name="occupation" />
            <FloatingInput label="Address" type="text" name="Address" />
            <FloatingInput
              label="Identification Marks"
              type="text"
              name="identificationMarks"
            />
            <FloatingInput label="Brought By" type="text" name="broughtBy" />
            <FloatingInput
              label="Relationship"
              type="text"
              name="relationship"
            />
            <FloatingInput label="Phone No" type="tel" name="phoneNo" />
            <div className="AccidentReportForm-form-group">
              <label>Informed To Police:</label>
              <div className="AccidentReportForm-radio-button">
                <label>
                  <input type="radio" name="survivalToDischarge" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" name="survivalToDischarge" value="no" />
                  No
                </label>
              </div>
            </div>
            <FloatingInput
              label="Name Of Police"
              type="text"
              name="nameOfPolice"
            />
            <FloatingInput
              label="Police Station"
              type="text"
              name="policeStation"
            />
            <FloatingInput label="Diagnosis" type="text" name="diagnosis" />
            <FloatingInput
              label="Mechanism Of Injury"
              type="text"
              name="mechanismOfInjury"
            />
            <div className="AccidentReportForm-form-group">
              <label>Site Of Incident:</label>
              <div className="AccidentReportForm-radio-button">
                <label>
                  <input type="radio" name="siteofincident" value="home" />
                  Home
                </label>
                <label>
                  <input type="radio" name="siteOfIncident" value="road" />
                  Road
                </label>
                <label>
                  <input type="radio" name="siteOfIncident" value="work" />
                  Work
                </label>
                <label>
                  <input type="radio" name="siteOfIncident" value="others" />
                  Others
                </label>
              </div>
            </div>
            <FloatingInput
              label="If Others, Specify"
              type="text"
              name="otherDetails"
            />
            <FloatingInput label="Landmark" type="text" name="landmark" />
            <FloatingInput
              label="Incident Date"
              type="date"
              name="incidentDate"
            />
            <FloatingInput
              label="Incident Time"
              type="time"
              name="incidentDate"
            />
            <div className="AccidentReportForm-form-group">
              <label>Injuries Sustained:</label>
              <div className="AccidentReportForm-radio-button">
                <label>
                  <input type="radio" name="incidentLocation" value="simple" />
                  Simple
                </label>
                <label>
                  <input
                    type="radio"
                    name="incidentLocation"
                    value="grevious"
                  />
                  Grevious
                </label>
                <label>
                  <input
                    type="radio"
                    name="incidentLocation"
                    value="opinionReserved"
                  />
                  OpinionReserved
                </label>
              </div>
            </div>
            <FloatingInput
              label="Nature Of Injury"
              type="text"
              name="natureOfInjury"
            />
            <FloatingInput
              label="Medical Officer Signature"
              type="text"
              name="medicalOfficerSignature"
            />
            <div className="AccidentReportForm-form-group">
              <label>Preferred From Other Hospital:</label>
              <div className="AccidentReportForm-radio-button">
                <label>
                  <input type="radio" name="preferredFromOtherHospital" value="yes" />
                  Yes
                </label>
                <label>
                  <input type="radio" name="preferredFromOtherHospital" value="no" />
                  No
                </label>
              </div>
            </div>
            <FloatingInput
              label="Hospital Name"
              type="text"
              name="hospitalName"
            />
            <FloatingInput label="Regn. Number" type="text" name="registrationNumber" />
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
      <div className="AccidentReportForm-buttons">
        <button className="btn-blue" onClick={handleSubmit}>Save</button>
        <button className="btn-red">Close</button>
      </div>
    </>
  );
};
export default AccidentReportForm;






// import React, { useState, useEffect } from "react";
// import "./AccidentReportForm.css";
// import axios from "axios";

// import PopupTable from "../Services/PopupTable";

// const FloatingInput = ({ label, type = "text", value, name, onChange }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const hasValue = value?.length > 0;

//   return (
//     <div
//       className={`AccidentReportForm-floating-field ${
//         isFocused || hasValue ? "active" : ""
//       }`}
//     >
//       <input
//         type={type}
//         className="AccidentReportForm-floating-input"
//         value={value}
//         name={name}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//         onChange={onChange}
//       />
//       <label className="AccidentReportForm-floating-label">{label}</label>
//     </div>
//   );
// };

// const AccidentReportForm = ({ onClose }) => {
//   const [mrNoData, setMrNoData] = useState([]);
//   const [activePopup, setActivePopup] = useState(null);
//   const [formData, setFormData] = useState({
//     uhid: "",
//     firstName: "",
//     lastName: "",
//     age: "",
//     sex: "",
//     ipNo: "",
//     dateOfAdmission: "",
//     dateOfDischarge: "",
//     departmentName: "",
//     ward: "",
//     doctorName: "",
//     hospitalNo: "",
//     arrivalDate: "",
//     arrivalTime: "",
//     fatherHusbandName: "",
//     occupation: "",
//     address: "",
//     identificationMarks: "",
//     broughtBy: "",
//     relationship: "",
//     phoneNo: "",
//     informedToPolice: "",
//     nameOfPolice: "",
//     policeStation: "",
//     diagnosis: "",
//     mechanismOfInjury: "",
//     siteOfIncident: "",
//     otherDetails: "",
//     landmark: "",
//     incidentDate: "",
//     incidentTime: "",
//     injuriesSustained: "",
//     natureOfInjury: "",
//     medicalOfficerSignature: "",
//     preferredFromOtherHospital: "",
//     hospitalName: "",
//     registrationNumber: "",
//   });

//   useEffect(() => {
//     if (activePopup === "MrNo") {
//       fetchMrno();
//     }
//   }, [activePopup]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting form data:", formData);

//     try {
//       const response = await axios.post(
//         "http://192.168.1.34:4069/api/accident-report-details",
//         formData
//       );

//       if (response.status === 200) {
//         alert("Form submitted successfully!");
//       } else {
//         throw new Error("Failed to submit form data");
//       }
//     } catch (error) {
//       console.error("Error submitting form data:", error);
//       alert("Failed to submit form.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const fetchMrno = async () => {
//     try {
//       const response = await axios.get("http://192.168.1.34:4069/api/ip-admissions");
//       setMrNoData(response.data);
//     } catch (error) {
//       console.error("Error fetching MRNO data:", error);
//     }
//   };

//   const handleSelect = (data) => {
//     if (activePopup === "MrNo") {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         uhid: data?.uhid || "",
//         firstName: data?.firstName || "",
//         lastName: data?.lastName || "",
//         age: data?.age || "",
//         sex: data?.sex || "",
//         ipNo: data?.ipAdmmissionId || "",
//         dateOfAdmission: data?.admissionDate || "",
//         dateOfDischarge: data?.dischargeDate || "",
//         departmentName: data?.department?.name || "",
//         hospitalNo: data?.hospital?.hospitalNumber || "",
//         arrivalDate: data?.arrivalDate || "",
//         arrivalTime: data?.arrivalTime || "",
//         fatherHusbandName: data?.fatherHusbandName || "",
//         occupation: data?.occupation || "",
//         address: data?.address || "",
//         identificationMarks: data?.identificationMarks || "",
//         broughtBy: data?.broughtBy || "",
//         relationship: data?.relationship || "",
//         phoneNo: data?.phoneNumber || "",
//       }));
//     }
//     setActivePopup(null);
//   };

//   const getPopupData = () => {
//     if (activePopup === "MrNo") {
//       const popupData = {
//         columns: ["uhid", "firstName", "lastName"],
//         data: mrNoData.map((item) => ({
//           uhid: item?.patient?.patient?.uhid,
//           firstName: item?.patient?.patient?.firstName,
//           lastName: item?.patient?.patient?.lastName,
//           age: item?.patient?.patient?.age,
//           sex: item?.patient?.patient?.sex,
//           realobj: item,
//         })),
//       };
//       return popupData;
//     }
//     return { columns: [], data: [] };
//   };

//   const { columns, data } = getPopupData();

//   return (
//     <>
//       <div className="AccidentReportForm-container">
//         <div className="AccidentReportForm-header">Accident Report Details</div>
//         <div className="AccidentReportForm-grid">
//           <FloatingInput
//             label="UHID"
//             name="uhid"
//             value={formData.uhid}
//             onChange={handleChange}
//           />
//           <button
//             className="AccidentReportForm-search-button"
//             onClick={() => setActivePopup("MrNo")}
//           >
//             Search
//           </button>
//           <FloatingInput
//             label="First Name"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//           />
//           <FloatingInput
//             label="Last Name"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//           />
//           <FloatingInput
//             label="Age"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//           />
//           <FloatingInput
//             label="Sex"
//             name="sex"
//             value={formData.sex}
//             onChange={handleChange}
//           />
//         </div>

//         {activePopup && (
//           <PopupTable
//             columns={columns}
//             data={data}
//             onSelect={handleSelect}
//             onClose={() => setActivePopup(null)}
//           />
//         )}

//         <div className="AccidentReportForm-buttons">
//           <button className="btn-submit" onClick={handleSubmit}>
//             Submit
//           </button>
//           <button className="btn-cancel" onClick={onClose}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AccidentReportForm;


