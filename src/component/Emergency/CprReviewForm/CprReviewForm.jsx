import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./CprReviewForm.css";
import { useLocation } from "react-router-dom";
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
      className={`CprReviewForm-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <input
        type={type}
        className="CprReviewForm-floating-input"
        value={value || ""}
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
    <div
      className={`CprReviewForm-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <select
        className="CprReviewForm-floating-select"
        value={value || ""}
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
      <label className="CprReviewForm-floating-label">{label}</label>
    </div>
  );
};

const CprReviewForm = () => {
  const location = useLocation();
  const { receipt } = location.state || {};

  const [formData, setFormData] = useState({
    uhid: receipt?.uhid || "",
    ipNumber: receipt?.ipNumber || "",
    erInitialAssessmentId: receipt?.erInitialAssessmentId || "",
    patientName: `${receipt?.firstName || ""} ${receipt?.lastName || ""
      }`.trim(),
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
    doctor1: null,
    doctor2: null,
    doctor3: null,
    doctor4: null,
    date: "",
    survivalToDischarge: "",
    stillInIcu: "",
    cprReview: "",
  });

  const tableRef = useRef(null);
  const [mrNoData, setMrNoData] = useState([]);
  const [doctorData, setDoctorData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [selectedDoctorField, setSelectedDoctorField] = useState(null);

  useEffect(() => {
    if (activePopup === "doctor") {
      fetchDoctorDetails();
    } else if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDoctorSearch = (doctorField) => {
    setSelectedDoctorField(doctorField);
    setActivePopup("doctor");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      date: formData.date,
      time: formData.time,
      survivalToDischarge: formData.survivalToDischarge,
      stillInIcu: formData.stillInIcu,
      cprReview: formData.cprReview,
      department: formData.department,
      erInitialAssessmentDTO: {
        erInitialAssessmentId: formData.erInitialAssessmentId,
      },
    };

    if (formData.doctor1) {
      payload.addDoctor1 = { doctorId: formData.doctor1.doctorId };
    }
    if (formData.doctor2) {
      payload.addDoctor2 = { doctorId: formData.doctor2.doctorId };
    }
    if (formData.doctor3) {
      payload.addDoctor3 = { doctorId: formData.doctor3.doctorId };
    }
    if (formData.doctor4) {
      payload.addDoctor4 = { doctorId: formData.doctor4.doctorId };
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/cpr-reviews`,
        payload,
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

  const handleSelect = (data) => {
    if (activePopup === "MrNo") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ipNumber: data.ipAdmmissionId || "",
        uhid: data.patient?.patient?.uhid || "",
        patientName: `${data.patient?.patient?.firstName || ""} ${data.patient?.patient?.lastName || ""
          }`.trim(),
        fatherHusbandName: data.patient?.patient?.motherName || "",
        age: `${data.patient?.patient?.age || ""} ${data.patient?.patient?.ageUnit || ""
          }`.trim(),
        sex: data.patient?.patient?.gender || "",
        admissionDate: data.date || "",
        department:
          data.admissionUnderDoctorDetail?.consultantDoctor?.specialisationId
            ?.specialisationName || "",
        ward: data.roomDetails?.roomTypeDTO?.wardName || "",
        roomBedNo: `${data.roomDetails?.roomDTO?.roomNumber || ""} / ${data.roomDetails?.bedDTO?.bedNo || ""
          }`.trim(),
        location: data.roomDetails?.floorDTO?.location || "",
        finalDiagnosis: data.admissionUnderDoctorDetail?.diagnosis || "",
        consultant:
          data.admissionUnderDoctorDetail?.consultantDoctor?.doctorName || "",
      }));
    } else if (activePopup === "doctor" && selectedDoctorField) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [selectedDoctorField]: {
          doctorId: data.doctorId,
          doctorName: data.doctorName,
        },
      }));
    }
    setActivePopup(null);
    setSelectedDoctorField(null);
  };

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/doctors`);
      setDoctorData(response.data);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
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
    } else if (activePopup === "doctor") {
      return {
        columns: ["doctorId", "doctorName", "specialization"],
        data: Array.isArray(doctorData)
          ? doctorData.map((doctor) => ({
            doctorId: doctor.doctorId,
            doctorName: doctor.doctorName,
            specialization: doctor.specialization,
          }))
          : [],
      };
    }
    return { columns: [], data: [] };
  };
  const navigate = useNavigate();
  const handleBack = () => navigate("/emergency/erinitial");

  const { columns, data } = getPopupData();

  return (
    <>
      <div className="CprReviewForm-container">
        <div className="CprReviewForm-section">
        <div className="er-initial-assessment-com-section">
        <button className="er-initial-assessment-com-section-back" onClick={handleBack}>Back</button>
        </div>

          <div className="CprReviewForm-header">CPR Review Details</div>
        </div>

        <div className="CprReviewForm-section">
          <div className="CprReviewForm-header">CPR Reviewed </div>
          <div className="CprReviewForm-grid">
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
            <div className="CprReviewForm-form-group">
              <label>SurvivalToDischarge:</label>
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
          </div>
        </div>

        <div className="CprReviewForm-section">
          <div className="CprReviewForm-header">CPR Reviewed By</div>
          <div className="CprReviewForm-grid">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="CprReviewForm-search-field">
                <FloatingInput
                  label={`Doctor ${num}`}
                  name={`doctor${num}`}
                  value={formData[`doctor${num}`]?.doctorName || ""}
                  readOnly
                />
                <button
                  className="CprReviewForm-search-icon"
                  onClick={() => handleDoctorSearch(`doctor${num}`)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      fill="currentColor"
                      d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                    />
                  </svg>
                </button>
              </div>
            ))}
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
        <button className="btn-blue" onClick={handleSubmit}>
          Save
        </button>
        {/* <button className="btn-red">Close</button> */}
      </div>
    </>
  );
};

export default CprReviewForm;
