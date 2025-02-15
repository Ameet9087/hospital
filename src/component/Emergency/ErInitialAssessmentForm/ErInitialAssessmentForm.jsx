import React, { useState, useRef, useEffect } from "react";
import "./ErInitialAssessmentForm.css";
import axios from "axios";

import AppoitmentPopupTable from "../../Admission/PopupTable";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/api";
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
      className={`er-initial-assessment-com-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <input
        type={type}
        className="er-initial-assessment-com-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="er-initial-assessment-com-floating-label">
        {label}
      </label>
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
    <div
      className={`er-initial-assessment-com-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <select
        className="er-initial-assessment-com-floating-select"
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
      <label className="er-initial-assessment-com-floating-label">
        {label}
      </label>
    </div>
  );
};

const ErInitialAssessmentForm = () => {
  const navigate = useNavigate();

  const [patientType, setPatientType] = useState("old");
  const [hr, setHr] = useState(60);
  const [spo2, setSpo2] = useState(82);
  const [rr, setRr] = useState(12);
  const [cbg, setCbg] = useState(0);
  const [bpSystolic, setBpSystolic] = useState(0);
  const [bpDiastolic, setBpDiastolic] = useState(0);
  const [temp, setTemp] = useState(92);
  const [consciousness, setConsciousness] = useState("");
  const [triagePriority, setTriagePriority] = useState({
    red: false,
    orange: false,
    yellow: false,
    green: false,
    black: false,
  });

  const [activePopup, setActivePopup] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [mrno, setmorno] = useState([]);
  const mrHeading = [
    "uhid",
    "firstName",
    "middleName",
    "lastName",
    "contactNumber",
    "adharCardId",
  ];
  const [doctor, setDoctor] = useState([]);

  const doctorHeading = ["doctorName"];
  const [selectedDoctor, setSelecteDoctor] = useState([]);

  const [selectedMrno, setSelectedMrno] = useState([]);
  const [totalScore, setTotalScore] = useState();

  const handleBack = () => navigate("/emergency/erinitial");

  const [formData, setFormData] = useState({
    erNumber: "",
    patientType: "",
    nameInitial: "",
    firstName: "",
    middleName: "",
    lastName: "",
    contactNumber: "",
    dob: "",
    sex: "",
    relativeName: "",
    date: "",
    mrNumber: "",
    ipNumber: "",
    mlc: "",
    arNumber: "",
    timeOfArrival: "",
    modeOfArrival: "",
    allergies: "",
    ifYes: "",
    weight: "",
    attendingErphysician: "",
    patientComplaints: "",
    vitalSigns: [
      {
        hrScoreValue: hr || "",
        rrvalue: rr || "",
        bpSystolicScoreValue: bpSystolic || "",
        bpDiastolic: "",
        temperatureScoreValue: temp || "",
        spo2ScoreValue: spo2 | "",
        cbg: cbg || "",
        gcs: "",
        scoreTotalValue: totalScore || "",
        triagePriority: "",
      },
    ],
    addDoctor: [
      {
        doctorId: "",
      },
    ],
  });

  React.useEffect(() => {
    const calculatedTotal =
      (hr / 3) * 3 +
      (rr / 3) * 3 +
      (bpSystolic / 3) * 3 +
      (bpDiastolic / 3) * 3 +
      (temp / 3) * 3 +
      (spo2 / 3) * 3 +
      (cbg / 3) * 3;
    setTotalScore(calculatedTotal);
    determineTriagePriority(calculatedTotal);
  }, [hr, rr, bpSystolic, bpDiastolic, temp, spo2, cbg]);

  const determineTriagePriority = (score) => {
    const updatedPriority = {
      red: score >= 18,
      orange: score >= 15 && score < 18,
      yellow: score >= 10 && score < 15,
      green: score >= 0 && score < 10,
    };
    setTriagePriority(updatedPriority);
  };

  const handlePainScaleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleTriagePriorityChange = (event) => {
    setTriagePriority(event.target.value);
  };

  // useEffect(() => {
  //   handleTriagePriority();
  // }, [hr, spo2, rr, bpSystolic, bpDiastolic, temp]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handlePatientTypeChange = (event) => {
    setPatientType(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      patientType: event.target.value,
    }));

    if (event.target.value === "new") {
      fetchPatientDetails(formData.mrNo);
    }
  };

  const fetchPatientDetails = async (mrNo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/patient-register/get-all`);

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      setmorno(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
      alert("Error fetching patient details. Please try again later.");
    }
  };
  const fetchDoctorDetails = async (doctor) => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctors/specialization/1`);

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      setDoctor(data);
      console.log(doctor, "doctor");
    } catch (error) {
      console.error("Error fetching patient details:", error);
      alert("Error fetching patient details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPatientDetails();
    fetchDoctorDetails();
  }, []);
  const getPopupData = () => {
    console.log("selected mrno", mrno);
    if (activePopup === "mrno" && mrno) {
      return {
        columns: mrHeading,
        data: mrno.map((item) => ({
          firstName: item?.patient?.firstName || "",
          middleName: item?.patient?.middleName || "",
          lastName: item?.patient?.lastName || "",
          uhid: item?.patient?.uhid || "",
          adharCardId: item?.patient?.adharCardId || "",
          dateOfBirth: item?.patient?.dateOfBirth || "",
          gender: item?.patient?.gender || "",
          salutation: item?.patient?.salutation || "",
          contactNumber: item?.patient?.contactNumber || "",
          contactName: item?.patient?.contactName || "",
          originalObject: item,
        })),
      };
    } else if (activePopup === "doctor") {
      return {
        columns: doctorHeading,
        data: doctor,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();
  const handleSelect = (patient) => {
    if (activePopup === "mrno") {
      setSelectedMrno({
        // salutation:patient.salutation || "",
      });
      setFormData((prevFormData) => ({
        ...prevFormData, // Spread previous formData to keep existing values
        mrNumber: patient.uhid,
        firstName: patient.firstName,
        middleName: patient.middleName,
        lastName: patient.lastName,
        dob: patient.dob,
        sex: patient.gender,
        nameInitial: patient.nameInitial,
        mobileNumber: patient.mobileNumber,
        salutation: patient.salutation,
        ipNumber: patient.inPatientId,
        relativeName: patient.relativeName,
        gender: patient.gender,
        contactNumber: patient.contactNumber,
        dateOfBirth: patient.dateOfBirth,
        contactName: patient.contactName,
      }));
    } else if (activePopup === "doctor") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        addDoctor: [{ doctorId: patient.doctorId }],
        doctorName: patient.doctorName,
      }));
    }
    setActivePopup(null);
  };

  const prepareFormData = (formData) => {
    const updatedFormData = { ...formData };

    // Iterate through the keys and set empty strings to null
    Object.keys(updatedFormData).forEach((key) => {
      if (updatedFormData[key] === "") {
        updatedFormData[key] = null;
      }
    });

    return updatedFormData;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure dataToSubmit has the correct format
    const dataToSubmit = {
      erNumber: formData.erNumber,
      patientType: formData.patientType,
      nameInitial: formData.nameInitial,
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      contactNumber: formData.contactNumber,
      dob: formData.dob,
      sex: formData.sex,
      relativeName: formData.relativeName,
      date: formData.date,
      mrNumber: formData.mrNumber,
      ipNumber: formData.ipNumber,
      mlc: formData.mlc,
      arNumber: formData.arNumber,
      timeOfArrival: formData.timeOfArrival,
      modeOfArrival: formData.modeOfArrival,
      allergies: formData.allergies,
      ifYes: formData.ifYes,
      weight: formData.weight,
      attendingErphysician: formData.attendingErphysician,
      patientComplaints: formData.patientComplaints,
      vitalSigns: formData.vitalSigns, // Only include the fields you want to submit
      addDoctor: formData.addDoctor, // Only include the relevant doctor data
    };

    console.log("Data to submit:", dataToSubmit); // Log the data to ensure it's correct

    try {
      const response = await fetch(
        `${API_BASE_URL}/emergency/er-initial-assessment/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        }
      );

      const responseText = await response.text(); // Get response as text first

      if (response.ok) {
        let data;
        try {
          data = JSON.parse(responseText); // Try parsing the response as JSON
        } catch (e) {
          data = { success: true, message: responseText }; // If not JSON, handle as plain text
        }

        if (data.success) {
          alert("Form submitted successfully!");
        } else {
          alert(
            "Error submitting form: " + (data.message || "Please try again.")
          );
        }
      } else {
        throw new Error(`Server error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again later.");
    }
  };

  // const handleSelect = (patient) => {
  //   console.log(patient);

  //   setFormData({
  //     ...formData,
  //     mrNo: patient.uhid,
  //     patientName: patient.firstName + " " + patient.lastName,
  //     dob: patient.dateOfBirth,
  //     sex: patient.gender,
  //     mobileNumber: patient.phoneNumber,
  //     nameInitial: patient.salutation,
  //     ipNo: patient.inPatientId,
  //   });
  // };
  const gcsValues = { key1: "value1", key2: "value2" };

  return (
    <>
      <div className="er-initial-assessment-com-container">
        <div className="er-initial-assessment-com-section">

          <button className="er-initial-assessment-com-button" onClick={handleBack}>Back</button>
        </div>

        <div className="er-initial-assessment-com-section">
          <div className="er-initial-assessment-com-header">
            ER Initial Assessment
          </div>
          <div className="er-initial-assessment-com-grid">
            <FloatingInput label="ERNo" name="erNo" value={formData.erNo} />

            <FloatingSelect
              label="Patient Type"
              onChange={handlePatientTypeChange}
              options={[
                { value: "old", label: "OLD Patient" },
                { value: "new", label: "New  Patient" },
              ]}
              value={formData.erNo}
            />
            <FloatingInput
              label=" Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <FloatingInput
              label="Mobile Number"
              name="contactNumber"
              onChange={handleChange}
              value={formData.contactNumber}
            />
          </div>
          {formData.patientType != "new" && (
            <div className="er-initial-assessment-com-grid">
              <div className="er-initial-assessment-com-search-field">
                <FloatingInput
                  label="MRNo"
                  name="mrNo"
                  onChange={handleChange}
                  value={formData.mrNumber}
                />
                <button
                  className="er-initial-assessment-com-search-icon"
                  onClick={() => setActivePopup("mrno")}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      fill="currentColor"
                      d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                    />
                  </svg>
                </button>
              </div>
              <div className="er-initial-assessment-com-search-field">
                <FloatingInput
                  label="IPNO"
                  name="ipNo"
                  onChange={handleChange}
                  value={formData.ipNumber}
                />
              </div>
            </div>
          )}
          <div className="er-initial-assessment-com-grid">
            <FloatingSelect
              label="Name Initial"
              name="nameInitial"
              value={formData.nameInitial}
              onChange={handleChange}
              options={[
                { value: "Mr", label: "Mr" },
                { value: "Ms", label: "Ms" },
              ]}
            />
            <FloatingInput
              label="First Name"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
            />
            <FloatingInput
              label="Middle Name"
              name="middleName"
              onChange={handleChange}
              value={formData.middleName}
            />
            <FloatingInput
              label="Last Name"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
            />
            <FloatingInput
              label="DOB"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
            />
            <FloatingSelect
              label="Gender"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
            />
            <FloatingInput
              label="Relative Name"
              name="relativeName"
              value={formData.relativeName}
              onChange={handleChange}
            />

            <div className="er-initial-assessment-com-search-field">
              <FloatingInput
                label="Attending ER Physician"
                name="attendingERPhysician"
                value={formData.doctorName}
                onChange={handleChange}
              />
              <button
                className="er-initial-assessment-com-search-icon"
                onClick={() => setActivePopup("doctor")}
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* 
        <div className="er-initial-assessment-com-section">
          <div className="er-initial-assessment-com-header">Bed Allocation</div>
          <div className="er-initial-assessment-com-grid">
            <div className="er-initial-assessment-com-search-field">
              <FloatingInput
                label="Bed No"
                name="bedNo"
                value={formData.bedNo}
                onChange={handleChange}
              />
              <button className="er-initial-assessment-com-search-icon">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                  />
                </svg>
              </button>
            </div>
            <div className="er-initial-assessment-com-search-field">
              <FloatingInput
                label="Room No"
                name="roomNo"
                value={formData.roomNo}
                onChange={handleChange}
              />
              <button className="er-initial-assessment-com-search-icon">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                  />
                </svg>
              </button>
            </div>
            <FloatingInput
              label="Floor No"
              value={formData.floorNo}
              onChange={handleChange}
            />

            <div className="er-initial-assessment-com-form-group">
              <label>MLC:</label>
              <div className="er-initial-group">
                <label>
                  <input
                    type="radio"
                    name="mlc"
                    value={formData.mlc}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="mlc"
                    value={formData.mlc}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>
            <FloatingInput
              label="Time Of Arrival"
              type="time"
              name="timeOfArrival"
              value={formData.timeOfArrival}
              onChange={handleChange}
            />

            <div className="er-initial-assessment-com-form-group">
              <label>Mode Of Arrival :</label>
              <div className="er-initial-group">
                <label>
                  <input type="radio" name="survivalToDischarge" value="self" />
                  Self
                </label>
                <label>
                  <input type="radio" name="survivalToDischarge" value="ems" />
                  EMS
                </label>
              </div>
            </div>

            <div className="er-initial-assessment-com-form-group">
              <label>Allergies :</label>
              <div className="er-initial-group">
                <label>
                  <input
                    type="radio"
                    name="survivalToDischarge"
                    value="notKnown"
                  />
                  Not Known
                </label>

                <label>
                  <input type="radio" name="survivalToDischarge" value="yes" />
                  Yes
                </label>
              </div>
            </div>

            <FloatingInput
              label="Weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
            <div className="er-initial-assessment-com-search-field">
              <FloatingInput
                label="Attending ER Physician"
                name="attendingERPhysician"
                value={formData.attendingERPhysician}
                onChange={handleChange}
              />
              <button className="er-initial-assessment-com-search-icon">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                  />
                </svg>
              </button>
            </div>
            <FloatingInput
              label="Patient Complaints"
              name="patientComplaints"
              value={formData.patientComplaints}
              onChange={handleChange}
            />
          </div>
        </div> */}

        <div className="er-initial-assessment-com-section">
          <div className="er-initial-assessment-com-header">Vital Signs</div>
          <div className="er-initial-assessment-com-grid">
            <div>
              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>HR:</label>
                  60
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={hr}
                    onChange={(e) => setHr(Number(e.target.value))}
                  />
                  120
                </div>
                <div className="er-initial-assessment-com-vital">
                  <label>HR Score Value:</label>
                  <input type="text" value={(hr / 3) * 3} readOnly />
                </div>
              </div>
              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>RR:</label>
                  12
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={rr}
                    onChange={(e) => setRr(Number(e.target.value))}
                  />
                  60
                </div>
                <div className="er-initial-assessment-com-vital">
                  <label>RR Score Value:</label>
                  <input type="text" value={(rr / 3) * 3} readOnly />
                </div>
              </div>
              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>BP Systolic :</label>
                  0
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={bpSystolic}
                    onChange={(e) => setBpSystolic(e.target.value)}
                  />
                  180
                </div>
                <div className="er-initial-assessment-com-vital">
                  <label>BP Systolic Score Value:</label>
                  <input type="text" value={(bpSystolic / 3) * 3} readOnly />
                </div>
              </div>
              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>BP Diastolic:</label>
                  0
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={bpDiastolic}
                    onChange={(e) => setBpDiastolic(e.target.value)}
                  />
                  160
                </div>
              </div>
            </div>
            <div>
              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>Temp:</label>
                  92
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                  />
                  108
                </div>
                <div className="er-initial-assessment-com-vital">
                  <label>Temperture Score :</label>
                  <input type="text" value={(temp / 3) * 3} readOnly />
                </div>
              </div>
              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>Spo2:</label>
                  82
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                  />
                  140
                </div>
                <div className="er-initial-assessment-com-vital">
                  <label>Spo2 Score Value:</label>
                  <input type="text" value={(spo2 / 3) * 3} readOnly />
                </div>
              </div>
              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>CBG:</label>
                  60
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={cbg}
                    onChange={(e) => setCbg(e.target.value)}
                  />
                  120
                </div>
              </div>
            </div>
            <div>
              <div className="er-initial-assessment-com-vital-sign">
                <div className="er-initial-assessment-com-vital">
                  <label>CGS :</label>
                  <FloatingSelect
                    label="E"
                    id="e"
                    name="e"
                    value={gcsValues.e}
                    options={[
                      { value: "E1", label: "E1" },
                      { value: "E2", label: "E2" },
                      { value: "E3", label: "E3" },
                      { value: "E4", label: "E4" },
                      { value: "E5(tv)", label: "E5(tv)" },
                    ]}
                  />

                  <div className="er-initial-assessment-com-vital">
                    <FloatingSelect
                      label="V"
                      id="v"
                      name="v"
                      value={gcsValues.e}
                      options={[
                        { value: "V1", label: "V1" },
                        { value: "V2", label: "V2" },
                        { value: "V3", label: "V3" },
                        { value: "V4", label: "V4" },
                        { value: "V5(G)", label: "V5(G)" },
                      ]}
                    />
                  </div>
                  <div className="er-initial-assessment-com-vital">
                    <FloatingSelect
                      label="M"
                      id="m"
                      name="m"
                      value={gcsValues.e}
                      options={[
                        { value: "M1", label: "M1" },
                        { value: "M2", label: "M2" },
                        { value: "M3", label: "M3" },
                        { value: "M4", label: "M4" },
                        { value: "M5(G)", label: "M5(G)" },
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div className="er-initial-assessment-com-form-group">
                <label>Level Of Consciousness:</label>
                <div className="er-initial-assessment-com-radio-button">
                  <label>
                    <input
                      type="radio"
                      name="levelOfConsciousness"
                      value="alert"
                    />
                    Alert
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="levelOfConsciousness"
                      value="responseToVerbalCommands"
                    />
                    Response To Verbal Commands
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="levelOfConsciousness"
                      value="responseToPainOnly"
                    />
                    Response To Pain Only
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="levelOfConsciousness"
                      value="unresponsive"
                    />
                    Unresponsive
                  </label>
                </div>
              </div>
              <div className="er-initial-assessment-com-section">
                <div className="er-initial-assessment-com-grid">
                  <div className="er-initial-assessment">
                    <FloatingInput
                      label="Score Total "
                      value={totalScore}
                      readOnly
                    />
                  </div>
                  <div className="er-initial-group">
                    <label>
                      <input type="radio" name="action" value="reference" />
                      Reference
                    </label>
                    <label>
                      <input type="radio" name="action" value="close" />
                      Close
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="er-initial-assessment-com-section">
        <div className="er-initial-assessment-com-header">Pain Scale</div>
        <div className="er-initial-assessment-com-grid">
          <div className="er-initial-assessment-com-form-group">
            <label>Pain Scale:</label>
            <div className="er-initial-group">
              <label>
                <input
                  type="radio"
                  name="painScale"
                  value="alert"
                  checked={selectedValue === "alert"}
                  onChange={handlePainScaleChange}
                />
                Wrong Bakers
              </label>
              <label>
                <input
                  type="radio"
                  name="painScale"
                  value="painScale"
                  checked={selectedValue === "painScale"}
                  onChange={handlePainScaleChange}
                />
                Numeric Pain Rating
              </label>
            </div>
          </div>
          <div className="er-initial-assessment-com-radio-button">
            {selectedValue === "alert" && (
              <div className="wrong-bakers-images">
                <img src="wrong-bakers-image1.jpg" alt="Wrong Bakers 1" />
                <img src="wrong-bakers-image2.jpg" alt="Wrong Bakers 2" />
                <img src="wrong-bakers-image2.jpg" alt="Wrong Bakers 2" />
                <img src="wrong-bakers-image2.jpg" alt="Wrong Bakers 2" />
              </div>
            )}

            {selectedValue === "painScale" && (
              <div className="numeric-pain-rating">
                <FloatingInput label=" Wong Baker Rating" />
              </div>
            )}
          </div>

          <div className="er-initial-assessment-com-form-group">
            <FloatingInput label="Pain Score" />
          </div>
          <div className="er-initial-assessment-com-grid">
            <div className="er-initial-assessment-com-form-group">
              <label>Triage Priority:</label>
              <div className="er-initial-group">
                <label>
                  <input
                    type="radio"
                    name="red"
                    checked={triagePriority.red}
                    readOnly
                  />
                  Red (≥ 18)
                </label>
                <label>
                  <input
                    type="radio"
                    name="orange"
                    checked={triagePriority.orange}
                    readOnly
                  />
                  Orange (15 - 17)
                </label>
                <label>
                  <input
                    type="radio"
                    name="yellow"
                    checked={triagePriority.yellow}
                    readOnly
                  />
                  Yellow (10 - 14)
                </label>
                <label>
                  <input
                    type="radio"
                    name="green"
                    checked={triagePriority.green}
                    readOnly
                  />
                  Green (5 - 9)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="er-initial-assement-pop-up-com-form-actions">
        <button

          className="er-initial-assessment-com-button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {activePopup && (
        <AppoitmentPopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
    </>
  );
};
export default ErInitialAssessmentForm;
