import React, { useState, useRef, useEffect } from "react";
import "./GCSSheetForm.css";
import PopupTable from "../popup";
import axios from "axios";
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
      className={`CprRecordNew-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <input
        type={type}
        className="CprRecordNew-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="CprRecordNew-floating-label">{label}</label>
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
      className={`CprRecordNew-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <select
        className="CprRecordNew-floating-select"
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
        <option value="">{ }</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="CprRecordNew-floating-label">{label}</label>
    </div>
  );
};
const GCSSheetForm = () => {
  const [mrNoData, setMrNoData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const location = useLocation();
  const erPatient = location.state?.receipt;

  const [formData, setFormData] = useState({
    uhid: "",
    ipNo: "",
    patientName: "",
    age: "",
    gender: "",
    admissionDate: "",
    consultant: "",
    dateOfBirth: "",
    roomNumber: "",
    bedNo: "",
    eyeOpen: "",
    contactNumber: "",
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
    relativeName: "",
    rightSizeReaction: "",
    leftSizeReaction: "",
    arms: "",
    legs: "",
    erInitialAssessmentId: null,
  });

  useEffect(() => {
    if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);

  useEffect(() => {
    if (erPatient) {
      setFormData((prevData) => ({
        ...prevData,
        patientName: `${erPatient.firstName || ""} ${erPatient.middleName || ""
          } ${erPatient.lastName || ""}`.trim(),
        contactNumber: erPatient.contactNumber || "",
        dateOfBirth: erPatient.dob || "",
        gender: erPatient.sex || "",
        isEmergency: "yes",
        erInitialAssessmentId: erPatient.erInitialAssessmentId || "",
        relativeName: erPatient?.relativeName || "",
        consultant: erPatient?.addDoctor[0]?.doctorName || "",
        admissionDate: erPatient?.date || "",
      }));
    }
  }, [erPatient]);

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
        erInitialAssessmentDTO: {
          erInitialAssessmentId: erPatient.erInitialAssessmentId,
        },
      };

      const response = await axios.post(`${API_BASE_URL}/gcs-sheets`, payload);

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
        age: data.age,
        gender: data?.realobj?.patient?.patient?.gender,
        ipNo: data?.realobj?.patient?.inPatientId,
        admissionDate: data?.realobj?.admissionDate,
        consultant:
          data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
        roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
        bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
        erInitialAssessmentId: data?.realobj?.erInitialAssessmentId,
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
    <>
      <div className="CprRecordNew-container">
        <div className="CprRecordNew-section">
        <div className="er-initial-assessment-com-section">
        <button className="er-initial-assessment-com-section-back" onClick={handleBack}>Back</button>

        </div>

          <div className="CprRecordNew-header">GCS Sheet Form</div>
          <div className="gcs-sheet-form"></div>
        </div>
        <div className="CprRecordNew-section">
          <div className="CprRecordNew-header">GCS Sheet </div>
          <div className="CprRecordNew-grid">
            <FloatingInput
              label="Patient Name"
              type="text"
              name="patientName"
              value={formData.patientName}
              readOnly
            />
            <FloatingInput
              label="Mobile No"
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
            <FloatingInput
              label="Sex"
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />

            <FloatingInput
              label="DOA"
              type="date"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleChange}
            />
            <FloatingInput
              label="DOB"
              type="date"
              name="admissionDate"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            <FloatingInput
              label="Consultant"
              type="text"
              name="consultant"
              value={formData.consultant}
              onChange={handleChange}
            />
            <FloatingInput
              label="Relative Name"
              type="text"
              name="relationName"
              value={formData.relativeName}
              onChange={handleChange}
            />
            <FloatingInput
              label="Eye Open *"
              type="text"
              name="eyeOpen"
              value={formData.eyeOpen}
              onChange={handleChange}
            />
            <FloatingSelect
              label="Eye Closed By Swelling-C"
              name="eyeClosedBySweelingC"
              value={formData.eyeClosedBySweelingC}
              onChange={handleChange}
              options={[
                { value: "", label: "Select" },
                { value: "spontaneously", label: "Spontaneously" },
                { value: "toSpeech", label: "To Speech" },
                { value: "toPain", label: "To Pain" },
                { value: "none", label: "None" },
              ]}
            />
            <FloatingSelect
              label="Best Verbal Response *"
              name="bestVerbalResponse"
              value={formData.bestVerbalResponse}
              onChange={handleChange}
              options={[
                { value: "", label: "Select" },
                { value: "oriented", label: "Oriented" },
                { value: "confused", label: "Confused" },
                { value: "inappropriateWords", label: "Inappropriate words" },
                {
                  value: "incomprehensionSound",
                  label: "Incomprehension sound",
                },
                { value: "none", label: "None" },
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
                { value: "", label: "Select" },
                { value: "obeyscommands", label: "Obeys commands" },
                { value: "localisesPain", label: "Localises pain" },
                { value: "withdrawsToPain", label: "Withdraws to pain" },
                { value: "flexionToPain", label: "Flexion to pain" },
                { value: "extensionToPain", label: "Extension to pain" },
                { value: "none", label: "None" },
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
        <div className="CprRecordNew-section">
          <div className="CprRecordNew-header">PUPILS</div>
          <div className="CprRecordNew-grid">
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
                { value: "", label: "Select" },
                { value: "reacts", label: "Reacts" },
                { value: "noReaction", label: "No Reaction" },
                { value: "eyesClosed", label: "Eyes Closed" },
              ]}
            />
            <FloatingSelect
              label="Left Size Reaction *"
              name="leftSizeReaction"
              value={formData.leftSizeReaction}
              onChange={handleChange}
              options={[
                { value: "", label: "Select" },
                { value: "reacts", label: "Reacts" },
                { value: "noReaction", label: "No Reaction" },
                { value: "eyesClosed", label: "Eyes Closed" },
              ]}
            />
          </div>
        </div>
        <div className="CprRecordNew-section">
          <div className="CprRecordNew-header">LIMB MOVEMENT</div>
          <div className="CprRecordNew-grid">
            <FloatingSelect
              label="Arms *"
              name="arms"
              value={formData.arms}
              onChange={handleChange}
              options={[
                { value: "", label: "Select" },
                { value: "normalPower", label: "Normal Power" },
                { value: "mildWeakness", label: "Mild Weakness" },
                { value: "severeWeakness", label: "Severe Weakness" },
                { value: "extension", label: "Extension" },
                { value: "noResponse", label: "No Response" },
              ]}
            />
            <FloatingSelect
              label="Legs *"
              name="legs"
              value={formData.legs}
              onChange={handleChange}
              options={[
                { value: "", label: "Select" },
                { value: "normalPower", label: "Normal Power" },
                { value: "mildWeakness", label: "Mild Weakness" },
                { value: "severeWeakness", label: "Severe Weakness" },
                { value: "extension", label: "Extension" },
                { value: "noResponse", label: "No Response" },
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
      <div className="CprRecordNew-buttons">
        <button className="btn-blue" onClick={handleSubmit}>
          Save
        </button>
       
      </div>
    </>
  );
};

export default GCSSheetForm;
