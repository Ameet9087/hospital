import React, { useState, useRef, useEffect } from "react";
import "./IncidentReport.css";
import axios from "axios";
import PopupTable from "../popup";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../api/api";
import { useNavigate } from "react-router-dom";

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
    <div
      className={`IncidentReport-floating-field ${
        isFocused || hasValue ? "active" : ""
      }`}
    >
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

const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div
      className={`IncidentReport-floating-field ${
        isFocused || hasValue ? "active" : ""
      }`}
    >
      <select
        className="IncidentReport-floating-select"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== "");
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== "");
          if (props.onChange) props.onChange(e);
        }}
        {...props}
      >
        <option value="">{}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="IncidentReport-floating-label">{label}</label>
    </div>
  );
};

const IncidentReport = () => {
  const location = useLocation();
  const erPatient = location.state?.receipt;
  const [mrNoData, setMrNoData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uhid: "",
    ipNo: "",
    patientName: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    admissionDate: "",
    consultant: "",
    roomNumber: "",
    relativeName: "",
    bedNo: "",
    incidentName: "",
    incidentDate: "",
    incidentTime: "",
    reportingDate: "",
    reportingTime: "",
    incidentNumber: "",
    descriptionOfIncident: "",
    ipAdmission: {
      ipAdmmissionId: null,
    },
  });

  useEffect(() => {
    if (erPatient) {
      setFormData((prevData) => ({
        ...prevData,
        patientName: `${erPatient.firstName || ""} ${
          erPatient.middleName || ""
        } ${erPatient.lastName || ""}`.trim(),
        contactNumber: erPatient.contactNumber || "",
        dateOfBirth: erPatient.dob || "",
        gender: erPatient.sex || "",
        isEmergency: "yes",
        erNo: erPatient.erInitialAssessmentId || "",
        consultant: erPatient?.addDoctor[0]?.doctorName || "",
        admissionDate: erPatient?.date || "",
        relativeName: erPatient?.relativeName || "",
      }));
    }
  }, [erPatient]);

  useEffect(() => {
    if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);

  const handleSubmit = async () => {
    try {
      // Construct the payload in the required format
      const payload = {
        reportingDate: formData.reportingDate,
        incidentName: formData.incidentName,
        incidentDate: formData.incidentDate,
        reportingTime: formData.reportingTime,
        descriptionOfIncident: formData.descriptionOfIncident,
        incidentTime: formData.incidentTime,
        incidentNumber: formData.incidentNumber,
        erInitialAssessmentDTO: {
          erInitialAssessmentId: erPatient?.erInitialAssessmentId || null, // Use erPatient's erInitialAssessmentId
        },
      };

      // Send the payload to the API endpoint
      const response = await axios.post(
        `${API_BASE_URL}/incident-reports`,
        payload
      );

      if (response.status === 200 || response.status === 201) {
        alert("Incident report saved successfully!");
      } else {
        throw new Error("Failed to save incident report");
      }
    } catch (error) {
      console.error("Error saving incident report:", error);
      alert("Failed to save incident report. Please try again.");
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
      const response = await axios.get(
        `${API_BASE_URL}/ip-admissions`
      );
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
        consultant:
          data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
        roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
        bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
        ipAdmission: {
          ipAdmmissionId: data?.realobj?.patient?.inPatientId,
        },
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
              realobj: user,
            }))
          : [],
      };
      return popupData;
    }
    return { columns: [], data: [] };
  };

  const { columns, data } = getPopupData();
  const handleBack = () => navigate("/emergency/erinitial");

  return (
    <>
      <div className="IncidentReport-container">
        <div className="IncidentReport-section">
        <div className="er-initial-assessment-com-section">
          <button onClick={handleBack}>Back</button>
        </div>


          <div className="IncidentReport-header">Incident Report</div>
          <div className="IncidentReport-grid">
            <FloatingInput
              label="ER Number"
              value={erPatient.erInitialAssessmentId}
            />
            <FloatingInput label="Name" value={formData.patientName} />
            <FloatingInput label="Mobile No" value={formData.contactNumber} />
            <FloatingInput label="DOB" value={formData.dateOfBirth} />
            <FloatingInput label="Sex" value={formData.gender} />
            <FloatingInput
              label="Date Of Admission"
              type="date"
              value={formData.admissionDate}
            />
            <FloatingInput
              label="Relative Name"
              type="text"
              value={formData.relativeName}
            />
            <FloatingInput
              label="Consultant"
              name="consultant"
              value={formData.consultant}
              onChange={handleChange}
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
              type="Number"
              name="incidentNumber"
              value={formData.incidentNumber}
              
              onChange={handleChange}
               min="0"
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
