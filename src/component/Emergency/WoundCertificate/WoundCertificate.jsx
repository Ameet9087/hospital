

import React, { useState, useRef, useEffect } from "react";
import "./WoundCertificate.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PopupTable from "../popup";
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
      className={`WoundCertificate-floating-field ${
        isFocused || hasValue ? "active" : ""
      }`}
    >
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

const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div
      className={`WoundCertificate-floating-field ${
        isFocused || hasValue ? "active" : ""
      }`}
    >
      <select
        className="WoundCertificate-floating-select"
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
      <label className="WoundCertificate-floating-label">{label}</label>
    </div>
  );
};

const WoundCertificate = () => {
  const location = useLocation();
  const { receipt } = location.state || {};

  const [formData, setFormData] = useState({
    uhid: receipt?.uhid || "",
    ipNumber: receipt?.ipNumber || "",
    erInitialAssessmentId: receipt?.erInitialAssessmentId || "",
    patientName: `${receipt?.firstName || ""} ${receipt?.lastName || ""}`.trim(),
    fatherHusbandName: receipt?.relativeName || "",
    age: receipt?.age || "",
    sex: receipt?.sex || "",
    relativeName: receipt?.relativeName || "",
    contactNumber: receipt?.contactNumber || "",
    admissionDate: receipt?.date || "",
    dateOfBirth: receipt?.dob || "",
    department: receipt?.department || "",
    ward: receipt?.ward || "",
    roomBedNo: `${receipt?.roomNumber || ""} / ${receipt?.bedNo || ""}`.trim(),
    arNumber: receipt?.arNumber || "",
    mechanismOfInjury: receipt?.mechanismOfInjury || "",
    incidentDate: receipt?.incidentDate || "",
    time: receipt?.time || "",
    location: receipt?.location || "",
    finalDiagnosis: receipt?.finalDiagnosis || "",
    natureOfInjury: receipt?.natureOfInjury || "",
    consultant: receipt?.consultant || "",
    regNumber: receipt?.regNumber || "",
  });

  const [rows, setRows] = useState([
    { sn: 1, drug: "", dose: "", route: "", remarks: "" },
  ]);
  const tableRef = useRef(null);
  const [mrNoData, setMrNoData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { sn: prevRows.length + 1, drug: "", dose: "", route: "", remarks: "" },
    ]);
  };

  const handleDeleteRow = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index] = {
        ...newRows[index],
        [field]: value,
      };
      return newRows;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      erInitialAssessmentDTO: {
        erInitialAssessmentId: formData.erInitialAssessmentId,
      },
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/wound-certificates`,
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Form submitted successfully:", response.data);
        alert("Form submitted successfully!");
      } else {
        throw new Error("Failed to submit form data");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit form.");
    }
  };

  const fetchMrno = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/ip-admissions`
      );
      setMrNoData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelect = (data) => {
    if (activePopup === "MrNo") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ipNumber: data.ipAdmmissionId || "",
        uhid: data.patient?.patient?.uhid || "",
        patientName: `${data.patient?.patient?.firstName || ""} ${
          data.patient?.patient?.lastName || ""
        }`.trim(),
        fatherHusbandName: data.patient?.patient?.motherName || "",
        age: `${data.patient?.patient?.age || ""} ${
          data.patient?.patient?.ageUnit || ""
        }`.trim(),
        sex: data.patient?.patient?.gender || "",
        admissionDate: data.date || "",
        department:
          data.admissionUnderDoctorDetail?.consultantDoctor?.specialisationId
            ?.specialisationName || "",
        ward: data.roomDetails?.roomTypeDTO?.wardName || "",
        roomBedNo: `${data.roomDetails?.roomDTO?.roomNumber || ""} / ${
          data.roomDetails?.bedDTO?.bedNo || ""
        }`.trim(),
        location: data.roomDetails?.floorDTO?.location || "",
        finalDiagnosis: data.admissionUnderDoctorDetail?.diagnosis || "",
        consultant:
          data.admissionUnderDoctorDetail?.consultantDoctor?.doctorName || "",
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
              realobj: user,
            }))
          : [],
      };
    }
    return { columns: [], data: [] };
  };

  const { columns, data } = getPopupData();
  const navigate = useNavigate();
  const handleBack = () => navigate("/emergency/erinitial");

  return (
    <div className="WoundCertificate-container">
      <div className="WoundCertificate-section">
      <div className="er-initial-assessment-com-section">
      <button className="er-initial-assessment-com-section-back" onClick={handleBack}>Back</button>

        </div>
        <div className="WoundCertificate-header">Wound Certificate</div>
        <div className="WoundCertificate-grid">
          <FloatingInput
            label="ER No"
            value={formData.erInitialAssessmentId}
            name="erInitialAssessmentId"
            onChange={handleChange}
          />
          <FloatingInput
            label="Patient Name"
            value={formData.patientName}
            readOnly
          />
         
          <FloatingInput
            label="Mobile Number"
            name="contactNumber"
            onChange={handleChange}
            value={formData.contactNumber}
          />
          <FloatingInput
            label="DOB"
            value={formData.dateOfBirth}
            name="dateOfBirth"
            onChange={handleChange}
          />
          <FloatingInput
            label="Sex"
            value={formData.sex}
            name="sex"
            onChange={handleChange}
          />
          <FloatingInput
            label="Date Of Admission"
            type="date"
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleChange}
          />
           <FloatingInput
            label="Relative Name"
            name="relativeName"
            value={formData.relativeName}
            onChange={handleChange}
          />
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
  );
};

export default WoundCertificate;
