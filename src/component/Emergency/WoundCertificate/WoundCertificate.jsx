import React, { useState, useRef, useEffect } from "react";
import "./WoundCertificate.css";
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
    <div className={`WoundCertificate-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <input
        type={type}
        className="WoundCertificate-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="WoundCertificate-floating-label">{label}</label>
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
    <div className={`WoundCertificate-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <select
        className="WoundCertificate-floating-select"
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
      <label className="WoundCertificate-floating-label">{label}</label>
    </div>
  );
};
const WoundCertificate = () => {
  const [rows, setRows] = useState([
    { sn: 1, drug: "", dose: "", route: "", remarks: "" }
  ]);
  const tableRef = useRef(null);
  const [mrNoData, setMrNoData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({
    uhid: "",
    ipNumber: "",
    patientName: "",
    fatherHusbandName: "",
    age: "",
    sex: "",
    dateOfAdmission: "",
    dateOfDischarge: "",
    department: "",
    ward: "",
    roomBedNo: "",
    arNumber: "",
    mechanismOfInjury: "",
    incidentDate: "",
    time: "",
    location: "",
    finalDiagnosis: "",
    natureOfInjury: "",
    consultant: "",
    regNumber: "",
    ipAdmissionDTO: {
      ipAdmmissionId: "",
    }
  });

  useEffect(() => {
    if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { sn: prevRows.length + 1, drug: "", dose: "", route: "", remarks: "" }
    ]);
  };

  const handleDeleteRow = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    setRows(prevRows => {
      const newRows = [...prevRows];
      newRows[index] = {
        ...newRows[index],
        [field]: value
      };
      return newRows;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the submission data
    const submissionData = {
      department: formData.department,
      arNumber: formData.arNumber,
      mechanismOfInjury: formData.mechanismOfInjury,
      incidentDate: formData.incidentDate,
      time: formData.time,
      location: formData.location,
      finalDiagnosis: formData.finalDiagnosis,
      natureOfInjury: formData.natureOfInjury,
      regNumber: formData.regNumber,
      dateOfDischarge: formData.dateOfDischarge,
    };

    try {
      const response = await fetch("http://192.168.1.46:4096/api/diabeticChart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
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
      const response = await axios.get("http://192.168.1.46:4096/api/ip-admissions");
      setMrNoData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelect = (data) => {
    if (activePopup === "MrNo") {
      setFormData((prevFormData) => ({
        ...prevData,
        ipNumber: item.ipAdmmissionId || "",
        uhid:item.patient?.patient?.uhid,
        patientName: `${item.patient?.patient?.firstName || ""} ${item.patient?.patient?.lastName || ""}`.trim(),
        fatherHusbandName: item.patient?.patient?.motherName || "",
        age: `${item.patient?.patient?.age || ""} ${item?.patient?.patient?.ageUnit || ""}`.trim(),
        sex: item.patient?.patient?.gender || "",
        dateOfAdmission: item.admissionDate || "",
        department: item.admissionUnderDoctorDetail?.consultantDoctor?.specialisationId?.specialisationName || "",
        ward: item.roomDetails?.roomTypeDTO?.wardName || "",
        roomBedNo: `${item.roomDetails?.roomDTO?.roomNumber || ""} / ${item.roomDetails?.bedDTO?.bedNo || ""}`.trim(),
        location: item.roomDetails?.floorDTO?.location || "",
        finalDiagnosis: item.admissionUnderDoctorDetail?.diagnosis || "",
        consultant: item.admissionUnderDoctorDetail?.consultantDoctor?.doctorName || "",
        // ipAdmissionDTO: {
        //   ipAdmmissionId: data?.realobj?.ipAdmissionId || 16
        // }
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
      <div className="WoundCertificate-container">
        <div className="WoundCertificate-section">
          <div className="WoundCertificate-header">Wound Certificate</div>
          <div className="WoundCertificate-grid">
          <div className="WoundCertificate-search-field">
              <FloatingInput
                label="MRNO"
                type="text"
                name="uhid"
                
              />
              <button className="WoundCertificate-search-icon" onClick={() => setActivePopup("MrNo")}>
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
                </svg>
              </button>
            </div>           
            <FloatingInput label="IPNo" value={formData.ipNo} name="ipNo" onChange={handleChange} />
            <FloatingInput
              label="Patient Name"
              value={`${formData.firstName} ${formData.lastName}`}
              readOnly
            />
            <FloatingInput label="Father/Husband Name"/>
            <FloatingInput label="Age" value={formData.age} name="age" onChange={handleChange} />
            <FloatingInput label="Sex" />
            <FloatingInput
              label="Date Of Admission"
              type="date"
              name="dateOfAdmission"
              value={formData.dateOfAdmission}
            />
            <FloatingInput label="Date Of Discharge" type="date" />
            <FloatingInput label="Department" />
            <FloatingInput label="Ward" value={formData.ward} name="ward" onChange={handleChange} />
            <FloatingInput
              label="Room NO/ Bed No"
              value={`${formData.roomNumber} / ${formData.bedNo}`}
              readOnly
            />            <FloatingInput label="AR No" />
          </div>
        </div>
        <div className="WoundCertificate-section">
          <div className="WoundCertificate-header">Mechanism Of Injury</div>
          <div className="WoundCertificate-grid">
          <FloatingInput
label="Mechanism Of Injury"
name="mechanismOfInjury"
value={formData.mechanismOfInjury}
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
label="Time"
type="time"
name="time"
value={formData.time}
onChange={handleChange}
/>
<FloatingInput
label="Location"
name="location"
value={formData.location}
onChange={handleChange}
/>
<FloatingInput
label="Final Diagnosis"
name="finalDiagnosis"
value={formData.finalDiagnosis}
onChange={handleChange}
/>
<FloatingInput
label="Nature Of Injury"
name="natureOfInjury"
value={formData.natureOfInjury}
onChange={handleChange}
/>
<FloatingInput
label="Consultant"
name="consultant"
value={formData.consultant}
onChange={handleChange}
/>
            <FloatingInput
label="Reg No"
name="regNumber"
value={formData.regNumber}
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
                <div className="WoundCertificate-buttons">
          <button className="btn-blue" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
export default WoundCertificate;







// import React, { useState, useEffect } from "react";
// import "./WoundCertificate.css";
// import PopupTable from "../popup";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";

// // FloatingInput Component
// const FloatingInput = ({ label, type = "text", ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);
 

//   const handleChange = (e) => {
//     setHasValue(e.target.value.length > 0);
//     if (props.onChange) props.onChange(e);
//   };

//   return (
//     <div
//       className={`WoundCertificate-floating-field ${
//         isFocused || hasValue ? "active" : ""
//       }`}
//     >
//       <input
//         type={type}
//         className="WoundCertificate-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="WoundCertificate-floating-label">{label}</label>
//     </div>
//   );
// };

// // Main WoundCertificate Component
// const WoundCertificate = () => {
//   const [selectedIPNo, setSelectedIPNo] = useState(null);
//   const [ipInfo,setIpInfo] = useState(null);
//   const ipNoHeading = [
    
//     "uhid",
//     "firstName",
//     "lastName",
//   ];
//   const [activePopup, setActivePopup] = useState(null);
//   const [ipNoData, setIpNoData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [responseMessage, setResponseMessage] = useState("");

//   const [formData, setFormData] = useState({
//     uhid: "",
//     ipNumber: "",
//     patientName: "",
//     fatherHusbandName: "",
//     age: "",
//     sex: "",
//     dateOfAdmission: "",
//     dateOfDischarge: "",
//     department: "",
//     ward: "",
//     roomBedNo: "",
//     arNumber: "",
//     mechanismOfInjury: "",
//     incidentDate: "",
//     time: "",
//     location: "",
//     finalDiagnosis: "",
//     natureOfInjury: "",
//     consultant: "",
//     regNumber: "",
//     ipAdmissionDTO: {
//       ipAdmmissionId: "",
//     }
//   });






//   useEffect(() => {
//     const fetchIpNoData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `http://192.168.1.46:4096/api/ip-admissions`
//         );
//         console.log(response.data);
//         setIpNoData(response.data);
//       } catch (error) {
//         console.error("Error fetching IP No data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchIpNoData();
//   }, []);

//  const handleSubmit = async (e) => {
// e.preventDefault();

// // Creating the formData object
// const payload = {
//   department: formData.department,
//   arNumber: formData.arNumber,
//   mechanismOfInjury: formData.mechanismOfInjury,
//   incidentDate: formData.incidentDate,
//   time: formData.time,
//   location: formData.location,
//   finalDiagnosis: formData.finalDiagnosis,
//   natureOfInjury: formData.natureOfInjury,
//   regNumber: formData.regNumber,
//   dateOfDischarge: formData.dateOfDischarge,
//   ipAdmissionDTO: {
//     ipAdmmissionId: ipInfo.ipAdmissionId
//   }
// };

// console.log(formData);

// try {
//   // Making the POST request with formData
//   const response = await axios.post(
//     "http://192.168.1.46:4096/api/wound-certificates",
//     payload
//   );
//   setResponseMessage("Data posted successfully!");
//   console.log("Response:", response.data);
// } catch (error) {
//   setResponseMessage("Error posting data!");
//   console.error("Error:", error);
// }
// };


//   const handleSelect = (data) => {
//     setIpInfo(data)
//     if (activePopup === "IpNo") {
//       setSelectedIPNo(data);
//       const item=data.item;
//       console.log(item);
      
//       setFormData((prevData) => ({
//         ...prevData,
//         ipNumber: item.ipAdmmissionId || "",
//         uhid:item.patient?.patient?.uhid,
//         patientName: `${item.patient?.patient?.firstName || ""} ${item.patient?.patient?.lastName || ""}`.trim(),
//         fatherHusbandName: item.patient?.patient?.motherName || "",
//         age: `${item.patient?.patient?.age || ""} ${item?.patient?.patient?.ageUnit || ""}`.trim(),
//         sex: item.patient?.patient?.gender || "",
//         dateOfAdmission: item.admissionDate || "",
//         department: item.admissionUnderDoctorDetail?.consultantDoctor?.specialisationId?.specialisationName || "",
//         ward: item.roomDetails?.roomTypeDTO?.wardName || "",
//         roomBedNo: `${item.roomDetails?.roomDTO?.roomNumber || ""} / ${item.roomDetails?.bedDTO?.bedNo || ""}`.trim(),
//         location: item.roomDetails?.floorDTO?.location || "",
//         finalDiagnosis: item.admissionUnderDoctorDetail?.diagnosis || "",
//         consultant: item.admissionUnderDoctorDetail?.consultantDoctor?.doctorName || "",
//       }));
//     }
//     setActivePopup(null);
//   };

//   const getPopupData = () => {
//     if (activePopup === "IpNo") {
//       return { 
//         columns: ipNoHeading, 
//         data: ipNoData.map((item) => {
//           return {
//             ipAdmissionId: item.ipAdmmissionId,
//             uhid: item.patient.patient.uhid,
//             firstName: item?.patient?.patient?.firstName || "",
//             lastName: item?.patient?.patient?.lastName || "",
//             item, // Including the full item in the returned object
//           };
//         })
//       };
      
//     } else {
//       return { columns: [], data: [] };
//     }
//   };

//   const { columns, data } = getPopupData();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "ipAdmissionId") {
//       setFormData((prevState) => ({
//         ...prevState,
//         ipAdmissionDTO: { ...prevState.ipAdmissionDTO, ipAdmissionId: value },
//       }));
//     } else {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };


//   return (
//     <>
//       <div className="WoundCertificate-container">
//         <div className="WoundCertificate-section">
//           <div className="WoundCertificate-header">Wound Certificate</div>
//           <div className="WoundCertificate-grid">
//             {/* <FloatingInput
//               label="MR No"
//               name="uhid"
//               value={formData.uhid}
//               onChange={handleChange}
//             /> */}
//             <div className="WoundCertificate-search-field">
//             <FloatingInput label="MRNO" type="text" name="mrno" value={formData.uhid}/>
//             <button className="WoundCertificate-search-icon" onClick={() => setActivePopup("MrNo")}>
//               <svg viewBox="0 0 24 24" width="16" height="16">
//                 <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//               </svg>
//             </button>
//             </div>
//             <FloatingInput
//               label="IP No"
//               name="ipNumber"
//               value={formData.ipNumber}
//               onChange={handleChange}

//             />
//             {/* <FontAwesomeIcon
//               icon={faSearch}
//               onClick={() => setActivePopup("IpNo")}
//             /> */}

// <FloatingInput
//   label="Patient Name"
//   name="patientName"
//   value={formData.patientName}
//   onChange={handleChange}
// />
// <FloatingInput
//   label="Relative Name"
//   name="fatherHusbandName"
//   value={formData.fatherHusbandName}
//   onChange={handleChange}
// />
// <FloatingInput
//   label="Age"
//   name="age"
//   value={formData.age}
//   onChange={handleChange}
// />
// <FloatingInput
//   label="Sex"
//   name="sex"
//   value={formData.sex}
//   onChange={handleChange}
// />
// <FloatingInput
//   label="Date Of Admission"
//   type="date"
//   name="dateOfAdmission"
//   value={formData.dateOfAdmission}
//   onChange={handleChange}
// />
// <FloatingInput
//   label="Date Of Discharge"
//   type="date"
//   name="dateOfDischarge"
//   value={formData.dateOfDischarge}
//   onChange={handleChange}
// />
// <FloatingInput
//   label="Department"
//   name="department"
//   value={formData.department}
//   onChange={handleChange}
// />
// <FloatingInput
//   label="Ward"
//   name="ward"
//   value={formData.ward}
//   onChange={handleChange}
// />
// <FloatingInput
//   label="Room No/Bed No"
//   name="roomBedNo"
//   value={formData.roomBedNo}
//   onChange={handleChange}
// />
// <FloatingInput
//   label="AR No"
//   name="arNumber"
//   value={formData.arNumber}
//   onChange={handleChange}
// />
//           </div>
//         </div>
//         <div className="WoundCertificate-section">
//           <div className="WoundCertificate-header">Mechanism Of Injury</div>
//           <div className="WoundCertificate-grid">
//           <FloatingInput
// label="Mechanism Of Injury"
// name="mechanismOfInjury"
// value={formData.mechanismOfInjury}
// onChange={handleChange}
// />
// <FloatingInput
// label="Incident Date"
// type="date"
// name="incidentDate"
// value={formData.incidentDate}
// onChange={handleChange}
// />
// <FloatingInput
// label="Time"
// type="time"
// name="time"
// value={formData.time}
// onChange={handleChange}
// />
// <FloatingInput
// label="Location"
// name="location"
// value={formData.location}
// onChange={handleChange}
// />
// <FloatingInput
// label="Final Diagnosis"
// name="finalDiagnosis"
// value={formData.finalDiagnosis}
// onChange={handleChange}
// />
// <FloatingInput
// label="Nature Of Injury"
// name="natureOfInjury"
// value={formData.natureOfInjury}
// onChange={handleChange}
// />
// <FloatingInput
// label="Consultant"
// name="consultant"
// value={formData.consultant}
// onChange={handleChange}
// />
// <FloatingInput
// label="Reg No"
// name="regNumber"
// value={formData.regNumber}
// onChange={handleChange}
// />

//           </div>
//         </div>
//         <div className="WoundCertificate-buttons">
//           <button className="btn-blue" onClick={handleSubmit}>
//             Submit
//           </button>
//         </div>
//       </div>

//       {activePopup && (
//         <PopupTable
//           columns={columns}
//           data={data}
//           onSelect={handleSelect}
//           onClose={() => setActivePopup(null)}
//         />
//       )}
//     </>
//   );
// };

// export default WoundCertificate;
