import React, { useState, useRef, useEffect } from "react";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import './PatientCareReport.css';
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
    <div className={`diabetic-chart-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <input
        type={type}
        className="diabetic-chart-form-floating-input"
        value={value}
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

// FloatingSelect component remains exactly the same
const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div className={`diabetic-chart-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <select
        className="diabetic-chart-form-floating-select"
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
      <label className="diabetic-chart-form-floating-label">{label}</label>
    </div>
  );
};

const PatientCareReport = () => {
  const [rows, setRows] = useState([
    { sn: 1, drug: "", dose: "", route: "", remarks: "" }
  ]);
  const tableRef = useRef(null);
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
    date: "",
    time: "",
    bloodSugarValuesCBG: "",
    bloodSugarValuesVenous: "",
    urineAcetone: "",
    ipAdmissionDTO: {
      ipAdmmissionId: null
    },
    addItemDTO: {
      addItemId: null
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
    const submissionData = {
      date: formData.date,
      time: formData.time,
      bloodSugarValuesCBG: parseFloat(formData.bloodSugarValuesCBG) || 0,
      bloodSugarValuesVenous: parseFloat(formData.bloodSugarValuesVenous) || 0,
      urineAcetone: formData.urineAcetone,
      drug: rows[0].drug,
      dose: rows[0].dose,
      route: rows[0].route,
      remark: rows[0].remarks,
      ipAdmissionDTO: {
        ipAdmmissionId: 16 // You might want to get this from your form data
      },
      addItemDTO: {
        addItemId: 21 // You might want to get this from your form data
      }
    };
    try {
      const response = await fetch("http://192.168.1.36:4068/api/diabeticChart", {
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
        dateOfAdmission:data?.realobj?.admissionDate|| "N/A",
        departmentName:data?.realobj?.admissionUnderDoctorDetail?.consultantDoctor?.specialisationId?.specialisationName || "N/A",
        consultant: data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
        roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
        bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
        ward: data?.realobj?.roomDetails?.roomTypeDTO.wardName,
        ipAdmissionDTO: {
          ipAdmmissionId: data?.realobj?.ipAdmissionId || 16
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
    <div className="PatientCareReport-container">
      <div className="PatientCareReport-section">
        <div className="PatientCareReport-header">Patient Care Report</div>
      </div>
      <div className="PatientCareReport-section">
        <div className="PatientCareReport-header">Report</div>
        <div className="PatientCareReport-grid">
        <div className="PatientCareReport-search-field">
              <FloatingInput
                label="MRNO"
                type="text"
                name="uhid"
                value={formData.uhid}
              />
              <button className="PatientCareReport-search-icon" onClick={() => setActivePopup("MrNo")}>
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
                </svg>
              </button>
            </div>          <FloatingInput label="IP No "  type="text"name="ipNo" value={formData.ipNo} />
          <FloatingInput label="Patient Name"  type="text"name="patientName"  value={`${formData.firstName} ${formData.lastName}`}/>
          <FloatingInput label="Father/Husband Name"  type="text"name="father/HusbandName"  />
          <FloatingInput label="Age"  type="text"name="age"  value={formData.age}/>
          <FloatingInput label="Sex"  type="text"name="sex"  value={formData.gender}/>
          <FloatingInput
              label="Date Of Admission"
              type="text"
              name="dateOfAdmission"
              value={formData.dateOfAdmission}
            />          <FloatingInput label="Date Of Date"  type="date"name="dateOfDate"  value={formData.doa} />
<FloatingInput
              label="Department Name"
              type="text"
              name="departmentName"
              value={formData.departmentName}
            />          <FloatingInput label="Ward"  type="text"name="ward"  value={formData.ward}/>
          <FloatingInput label="Consultant"  type="text"name="consultant"  value={formData.consultant}/>
          <FloatingInput label="Room No / Bed No"  type="text"name="roomBedNo"   value={`${formData.roomNumber} / ${formData.bedNo}`}/>
          <FloatingInput label="Incident No"  type="text"name="IncidentNo"  />
          <FloatingInput label="Vehicle Type"  type="text"name="vehicleType"  />
          <FloatingInput label="Call Received"  type="text"name="callReceived"  />
          <FloatingInput label="Dispatch At"  type="text"name="dispatchAt"  />
          <FloatingInput label="Arrive Scence"  type="text"name="arriveScence"  />
          <FloatingInput label="Departure Scence"  type="text"name="departureScence"  />
          <FloatingInput label="Arrive Destination"  type="text"name="arriveDestination"  />
          <FloatingInput label="Reture To Base"  type="text"name="retureToBase"  />
          <FloatingInput label="Destination"  type="text"name="destination"  />
        </div>
      </div>
      <div className="PatientCareReport-section">
        <div className="PatientCareReport-header">LIMB MOVEMENT</div>
        <div className="PatientCareReport-grid">
          <div className="PatientCareReport-checkbox-div">
            <div className="PatientCareReport-header"> Nature of Call</div>
            <div className="PatientCareReport-row-chechbox-grid">
            <div className="PatientCareReport-row-chechbox">
          <input 
            type="checkbox" 
            checked={checkboxes.natureOfCall.medical}
            onChange={() => handleCheckboxChange('natureOfCall', 'medical')}
          />
          <label className="PatientCareReport-checkbox-label">
            Medical
          </label>
        </div>
            <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Trauma
            </label>
  </div>
            <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Interfacility
            </label>
  </div>
            <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Discharge
            </label>
  </div>
  </div>
          </div>
          <div className="PatientCareReport-checkbox-div">
            <div className="PatientCareReport-header">MOI</div>
            <div className="PatientCareReport-row-chechbox-grid">
            <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              RTA
            </label>
  </div>
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Fail
            </label>
  </div>
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Assult
            </label>
  </div>
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Fire
            </label>
  </div>
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Electrical
            </label>
  </div>
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Bite/String
            </label>
  </div>
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Other
            </label>
  </div>
            </div>
            </div>
          <div className="PatientCareReport-checkbox-div">
            <div className="PatientCareReport-header">Response</div>
            <div className="PatientCareReport-row-chechbox-grid">
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Transported
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Refused
            </label>
  </div>
   <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Treated(No Transfer)
            </label>
  </div>
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Death
            </label>
  </div> 
            </div>
            </div>
            <div className="PatientCareReport-checkbox-div">
            <div className="PatientCareReport-header">Injuries</div>
            <div className="PatientCareReport-row-chechbox-grid">
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              D-Deformities
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              C-Contusions
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              A-Abrasions
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              P-Penetrations
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              B-Burns
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              T-Tenderness
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              L-Lacerations
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              S-Sweling
            </label>
  </div> 
            </div>
            </div>
            <div className="PatientCareReport-checkbox-div">
            <div className="PatientCareReport-header">Criculation</div>
            <div className="PatientCareReport-row-chechbox-grid">
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Normal
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Pale, Cyanosed
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Absent
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Chief Complaints
            </label>
  </div> 
            </div>
            </div>
            <div className="PatientCareReport-checkbox-div">
            <div className="PatientCareReport-header">Breathing</div>
            <div className="PatientCareReport-row-chechbox-grid">
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Adequate
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Inadequate
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Ab
            </label>
  </div> 
            </div>
            </div>
            <div className="PatientCareReport-checkbox-div">
            <div className="PatientCareReport-header">Procedure</div>
            <div className="PatientCareReport-row-chechbox-grid">
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              OPA
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              NPA
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              LMA
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              ET Tube
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Cricothyroidotomy
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Suction
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              O Mask
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Ambu Bag
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Ventilator
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Bleeding Control
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              IV Cenytral
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              IV Peripheral
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Defibrillation
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Cardio Version
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              TCP,TVP
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Spine Immobilization
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Splinting
            </label>
  </div> 
            </div>
            </div>
            <div className="PatientCareReport-checkbox-div">
            <div className="PatientCareReport-header">Response</div>
            <div className="PatientCareReport-row-chechbox-grid">
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              MRI Checklist
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Any Tattoos on body
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Any Implants
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Any PCA Maker
            </label>
  </div> 
  <div className="PatientCareReport-row-chechbox">
            <input type="checkbox" id="allowMultiple" />
            <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
              Any Body piercing(Ear Rings Type)
            </label>
  </div> 
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
    </div>
          <div className="PatientCareReport-buttons">
              <button className="btn-blue" >Save</button>
              <button className="btn-red">Close</button>
            </div>
            </>
  );
};
export default PatientCareReport;

// import React, { useState, useRef, useEffect } from "react";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns";
// import './PatientCareReport.css';
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
//     <div className={`PatientCareReport-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <input
//         type={type}
//         className="PatientCareReport-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="PatientCareReport-floating-label">{label}</label>
//     </div>
//   );
// };

// const PatientCareReport = () => {
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
//     dateOfDate: "",
//     department: "",
//     incidentNumber: "",
//     vehicleType: "",
//     callReceived: "",
//     dispatchAt: "",
//     arriveScene: "",
//     departureScene: "",
//     arriveDestination: "",
//     returnToBase: "",
//     destination: "",
//     ipAdmissionDTO: {
//       ipAdmmissionId: null
//     }
//   });

//   const [checkboxes, setCheckboxes] = useState({
//     natureOfCall: {
//       medical: false,
//       trauma: false,
//       interfacility: false,
//       discharge: false
//     },
//     moi: {
//       rta: false,
//       fail: false,
//       assault: false,
//       fire: false,
//       electrical: false,
//       biteString: false,
//       other: false
//     },
//     response: {
//       transported: false,
//       refused: false,
//       treatedNoTransfer: false,
//       death: false
//     },
//     injuries: {
//       deformities: false,
//       contusions: false,
//       abrasions: false,
//       penetrations: false,
//       burns: false,
//       tenderness: false,
//       lacerations: false,
//       swelling: false
//     },
//     circulation: {
//       normal: false,
//       paleCyanosed: false,
//       absent: false,
//       chiefComplaints: false
//     },
//     breathing: {
//       adequate: false,
//       inadequate: false,
//       ab: false
//     },
//     procedure: {
//       opa: false,
//       npa: false,
//       lma: false,
//       etTube: false,
//       cricothyroidotomy: false,
//       suction: false,
//       oMask: false,
//       ambuBag: false,
//       ventilator: false,
//       bleedingControl: false,
//       ivCentral: false,
//       ivPeripheral: false,
//       defibrillation: false,
//       cardioversion: false,
//       tcpTvp: false,
//       spineImmobilization: false,
//       splinting: false
//     },
//     mri: {
//       mriChecklist: false,
//       tattoos: false,
//       implants: false,
//       pcaMaker: false,
//       bodyPiercing: false
//     }
//   });

//   useEffect(() => {
//     if (activePopup === "MrNo") {
//       fetchMrno();
//     }
//   }, [activePopup]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleCheckboxChange = (category, field) => {
//     setCheckboxes(prev => ({
//       ...prev,
//       [category]: {
//         ...prev[category],
//         [field]: !prev[category][field]
//       }
//     }));
//   };

//   const getSelectedItems = (category) => {
//     return Object.entries(checkboxes[category])
//       .filter(([_, isChecked]) => isChecked)
//       .map(([key, _]) => key);
//   };

//   const handleSave = async () => {
//     const payload = {
//       dateOfDate: formData.dateOfDate,
//       department: formData.department,
//       incidentNumber: formData.incidentNumber,
//       vehicleType: formData.vehicleType,
//       callReceived: formData.callReceived,
//       dispatchAt: formData.dispatchAt,
//       arriveScene: formData.arriveScene,
//       departureScene: formData.departureScene,
//       arriveDestination: formData.arriveDestination,
//       returnToBase: formData.returnToBase,
//       destination: formData.destination,
//       natureOfCall: getSelectedItems('natureOfCall'),
//       moi: getSelectedItems('moi'),
//       response: getSelectedItems('response'),
//       injuries: getSelectedItems('injuries'),
//       circulation: getSelectedItems('circulation'),
//       breathing: getSelectedItems('breathing'),
//       procedures: getSelectedItems('procedure'),
//       mri: getSelectedItems('mri'),
//       // ipAdmissionDTO: {
//       //   ipAdmmissionId: formData.ipAdmissionDTO.ipAdmmissionId
//       // }
//     };

//     try {
//       const response = await axios.post('http://192.168.1.46:4096/api/patient-care-reports', payload);
//       if (response.status === 200 || response.status === 201) {
//         alert('Patient Care Report saved successfully!');
//       }
//     } catch (error) {
//       console.error('Error saving Patient Care Report:', error);
//       alert('Failed to save Patient Care Report. Please try again.');
//     }
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
//           ipAdmmissionId: data?.realobj?.ipAdmissionId
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

//   // Rest of your JSX remains exactly the same, just update the checkbox inputs to include onChange handlers
//   return (
//     <>
//       <div className="PatientCareReport-container">
//         {/* Your existing JSX structure remains the same */}
//         {/* For each checkbox, add the onChange handler like this: */}
//         {/* Example for one category: */}
//         <div className="PatientCareReport-row-chechbox">
//           <input 
//             type="checkbox" 
//             checked={checkboxes.natureOfCall.medical}
//             onChange={() => handleCheckboxChange('natureOfCall', 'medical')}
//           />
//           <label className="PatientCareReport-checkbox-label">
//             Medical
//           </label>
//         </div>
//         {/* Continue with the same pattern for all checkboxes */}
        
//         {activePopup && (
//           <PopupTable
//             columns={columns}
//             data={data}
//             onSelect={handleSelect}
//             onClose={() => setActivePopup(null)}
//           />
//         )}
//       </div>
//       <div className="PatientCareReport-buttons">
//         <button className="btn-blue" onClick={handleSave}>Save</button>
//         <button className="btn-red">Close</button>
//       </div>
//     </>
//   );
// };

// export default PatientCareReport;



// import React, { useState, useRef, useEffect } from "react";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns";
// import './PatientCareReport.css';
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
//     <div className={`PatientCareReport-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <input
//         type={type}
//         className="PatientCareReport-floating-input"
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => {
//           setIsFocused(false);
//           setHasValue(e.target.value.length > 0);
//         }}
//         onChange={handleChange}
//         {...props}
//       />
//       <label className="PatientCareReport-floating-label">{label}</label>
//     </div>
//   );
// };
// const FloatingSelect = ({ label, options = [], ...props }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [hasValue, setHasValue] = useState(false);
//   return (
//     <div className={`PatientCareReport-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
//       <select
//         className="PatientCareReport-floating-select"
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
//       <label className="PatientCareReport-floating-label">{label}</label>
//     </div>
//   );
// };
// const PatientCareReport = () => {
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
//     <div className="PatientCareReport-container">
//       <div className="PatientCareReport-section">
//         <div className="PatientCareReport-header">Patient Care Report</div>
//       </div>
//       <div className="PatientCareReport-section">
//         <div className="PatientCareReport-header">Report</div>
//         <div className="PatientCareReport-grid">
//         <div className="PatientCareReport-search-field">
//               <FloatingInput
//                 label="MRNO"
//                 type="text"
//                 name="uhid"
//                 value={formData.uhid}
//               />
//               <button className="PatientCareReport-search-icon" onClick={() => setActivePopup("MrNo")}>
//                 <svg viewBox="0 0 24 24" width="16" height="16">
//                   <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/>
//                 </svg>
//               </button>
//             </div>          <FloatingInput label="IP No "  type="text"name="ipNo" value={formData.ipNo} />
//           <FloatingInput label="Patient Name"  type="text"name="patientName"  value={`${formData.firstName} ${formData.lastName}`}/>
//           <FloatingInput label="Father/Husband Name"  type="text"name="father/HusbandName"  />
//           <FloatingInput label="Age"  type="text"name="age"  value={formData.age}/>
//           <FloatingInput label="Sex"  type="text"name="sex"  value={formData.gender}/>
//           <FloatingInput label="Date Of Admission"  type="date"name="dateOfAdmission" value={formData.doa}  />
//           <FloatingInput label="Date Of Date"  type="date"name="dateOfDate"  value={formData.doa} />
//           <FloatingInput label="Department"  type="text"name="department"  value={""}/>
//           <FloatingInput label="Ward"  type="date"name="ward"  value={formData.ward}/>
//           <FloatingInput label="Consultant"  type="text"name="consultant"  value={formData.consultant}/>
//           <FloatingInput label="Room No / Bed No"  type="text"name="roomBedNo"   value={`${formData.roomNumber} / ${formData.bedNo}`}/>
//           <FloatingInput label="Incident No"  type="text"name="IncidentNo"  />
//           <FloatingInput label="Vehicle Type"  type="text"name="vehicleType"  />
//           <FloatingInput label="Call Received"  type="text"name="callReceived"  />
//           <FloatingInput label="Dispatch At"  type="text"name="dispatchAt"  />
//           <FloatingInput label="Arrive Scence"  type="text"name="arriveScence"  />
//           <FloatingInput label="Departure Scence"  type="text"name="departureScence"  />
//           <FloatingInput label="Arrive Destination"  type="text"name="arriveDestination"  />
//           <FloatingInput label="Reture To Base"  type="text"name="retureToBase"  />
//           <FloatingInput label="Destination"  type="text"name="destination"  />
//         </div>
//       </div>
//       <div className="PatientCareReport-section">
//         <div className="PatientCareReport-header">LIMB MOVEMENT</div>
//         <div className="PatientCareReport-grid">
//           <div className="PatientCareReport-checkbox-div">
//             <div className="PatientCareReport-header"> Nature of Call</div>
//             <div className="PatientCareReport-row-chechbox-grid">
//             <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Medical 
//             </label>
//   </div>
//             <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Trauma
//             </label>
//   </div>
//             <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Interfacility
//             </label>
//   </div>
//             <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Discharge
//             </label>
//   </div>
//   </div>
//           </div>
//           <div className="PatientCareReport-checkbox-div">
//             <div className="PatientCareReport-header">MOI</div>
//             <div className="PatientCareReport-row-chechbox-grid">
//             <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               RTA
//             </label>
//   </div>
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Fail
//             </label>
//   </div>
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Assult
//             </label>
//   </div>
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Fire
//             </label>
//   </div>
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Electrical
//             </label>
//   </div>
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Bite/String
//             </label>
//   </div>
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Other
//             </label>
//   </div>
//             </div>
//             </div>
//           <div className="PatientCareReport-checkbox-div">
//             <div className="PatientCareReport-header">Response</div>
//             <div className="PatientCareReport-row-chechbox-grid">
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Transported
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Refused
//             </label>
//   </div>
//    <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Treated(No Transfer)
//             </label>
//   </div>
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Death
//             </label>
//   </div> 
//             </div>
//             </div>
//             <div className="PatientCareReport-checkbox-div">
//             <div className="PatientCareReport-header">Injuries</div>
//             <div className="PatientCareReport-row-chechbox-grid">
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               D-Deformities
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               C-Contusions
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               A-Abrasions
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               P-Penetrations
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               B-Burns
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               T-Tenderness
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               L-Lacerations
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               S-Sweling
//             </label>
//   </div> 
//             </div>
//             </div>
//             <div className="PatientCareReport-checkbox-div">
//             <div className="PatientCareReport-header">Criculation</div>
//             <div className="PatientCareReport-row-chechbox-grid">
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Normal
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Pale, Cyanosed
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Absent
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Chief Complaints
//             </label>
//   </div> 
//             </div>
//             </div>
//             <div className="PatientCareReport-checkbox-div">
//             <div className="PatientCareReport-header">Breathing</div>
//             <div className="PatientCareReport-row-chechbox-grid">
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Adequate
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Inadequate
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Ab
//             </label>
//   </div> 
//             </div>
//             </div>
//             <div className="PatientCareReport-checkbox-div">
//             <div className="PatientCareReport-header">Procedure</div>
//             <div className="PatientCareReport-row-chechbox-grid">
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               OPA
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               NPA
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               LMA
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               ET Tube
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Cricothyroidotomy
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Suction
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               O Mask
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Ambu Bag
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Ventilator
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Bleeding Control
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               IV Cenytral
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               IV Peripheral
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Defibrillation
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Cardio Version
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               TCP,TVP
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Spine Immobilization
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Splinting
//             </label>
//   </div> 
//             </div>
//             </div>
//             <div className="PatientCareReport-checkbox-div">
//             <div className="PatientCareReport-header">Response</div>
//             <div className="PatientCareReport-row-chechbox-grid">
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               MRI Checklist
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Any Tattoos on body
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Any Implants
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Any PCA Maker
//             </label>
//   </div> 
//   <div className="PatientCareReport-row-chechbox">
//             <input type="checkbox" id="allowMultiple" />
//             <label htmlFor="allowMultiple" className="PatientCareReport-checkbox-label">
//               Any Body piercing(Ear Rings Type)
//             </label>
//   </div> 
//             </div>
//             </div>
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
//     </div>
//           <div className="PatientCareReport-buttons">
//               <button className="btn-blue" >Save</button>
//               <button className="btn-red">Close</button>
//             </div>
//             </>
//   );
// };
// export default PatientCareReport;
// This is Frontend .

// http://localhost:4096/api/patient-care-reports
// This is a API to save the below mentioned in json body
// {
//   "dateOfDate": "2025-01-14",
//   "department": "Emergency",
//   "incidentNumber": "INC123456",
//   "vehicleType": "Ambulance",
//   "callReceived": "2025-01-14T08:00:00",
//   "dispatchAt": "2025-01-14T08:10:00",
//   "arriveScene": "2025-01-14T08:25:00",
//   "departureScene": "2025-01-14T08:45:00",
//   "arriveDestination": "2025-01-14T09:00:00",
//   "returnToBase": "2025-01-14T09:30:00",
//   "destination": "General Hospital",
//   "natureOfCall": [
//     "Chest Pain",
//     "Shortness of Breath"
//   ],
//   "moi": [
//     "Fall from height",
//     "Motor Vehicle Accident"
//   ],
//   "response": [
//     "Code Blue",
//     "Immediate Response"
//   ],
//   "injuries": [
//     "Fractured Arm",
//     "Head Trauma"
//   ],
//   "circulation": [
//     "Pulse Detected",
//     "Normal Blood Pressure"
//   ],
//   "breathing": [
//     "Shallow Breathing",
//     "Oxygen Administered"
//   ],
//   "procedures": [
//     "CPR",
//     "IV Line Inserted"
//   ],
//   "mri": [
//     "Head MRI",
//     "Spinal MRI"
//   ],
//   "ipAdmissionDTO": {
//     "ipAdmmissionId": 1
//   }
// }
// This is a JSON body

// After clicking on the save button, the complete code must be saved succesfully  i want the complete Ui without any change in the UI.
// GIve Me whole UPdated code