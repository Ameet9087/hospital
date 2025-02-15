import React, { useState, useRef, useEffect } from "react";
import "./EstimationSeverityBurnWoundDetails.css";
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
      className={`EstimationSeverityBurnWoundDetails-floating-field ${
        isFocused || hasValue ? "active" : ""
      }`}
    >
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
      <label className="EstimationSeverityBurnWoundDetails-floating-label">
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
      className={`EstimationSeverityBurnWoundDetails-floating-field ${
        isFocused || hasValue ? "active" : ""
      }`}
    >
      <select
        className="EstimationSeverityBurnWoundDetails-floating-select"
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
      <label className="EstimationSeverityBurnWoundDetails-floating-label">
        {label}
      </label>
    </div>
  );
};

const EstimationSeverityBurnWoundDetails = () => {
  const location = useLocation();
  const erPatient = location.state?.receipt;
  const [mrNoData, setMrNoData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({
    uhid: "",
    ipNo: "",
    patientName: "",
    age: "",
    sex: "",
    admissionDate: "",
    consultant: "",
    roomNumber: "",
    bedNo: "",
    ward: "",
    contactNumber: "",
    admissionWeight: "",
    region: "",
    leftArm: "",
    dateOfBirth: "",
    rightArm: "",
    head: "",
    neck: "",
    anteriorTrunk: "",
    posteriorTrunk: "",
    buttocks: "",
    genitalia: "",
    rightLeg: "",
    leftLeg: "",
    relativeName: "",
    totalBurn: "",
    chart: "",
    ipAdmissionDTO: {
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
        erInitialAssessmentId: erPatient.erInitialAssessmentId || "",
        consultant: erPatient?.addDoctor[0]?.doctorName || "",
        admissionDate: erPatient?.date || "",
        admissionWeight: erPatient?.weight || "",
        relativeName: erPatient?.relativeName || "",
      }));
    }
  }, [erPatient]);

  useEffect(() => {
    if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);

  const calculateTotalBurn = () => {
    const burnAreas = [
      "leftArm",
      "rightArm",
      "head",
      "neck",
      "anteriorTrunk",
      "posteriorTrunk",
      "buttocks",
      "genitalia",
      "rightLeg",
      "leftLeg",
    ];

    const total = burnAreas.reduce((sum, area) => {
      const value = parseFloat(formData[area]) || 0;
      return sum + value;
    }, 0);

    setFormData((prev) => ({
      ...prev,
      totalBurn: total.toFixed(1),
    }));
  };

  useEffect(() => {
    calculateTotalBurn();
  }, [
    formData.leftArm,
    formData.rightArm,
    formData.head,
    formData.neck,
    formData.anteriorTrunk,
    formData.posteriorTrunk,
    formData.buttocks,
    formData.genitalia,
    formData.rightLeg,
    formData.leftLeg,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
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
        sex: data?.realobj?.sex,
        ipNo: data?.realobj?.patient?.inPatientId,
        consultant:
          data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
        roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
        dateOfAdmission: data?.realobj?.admissionDate || "N/A",
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
      erInitialAssessmentDTO: {
        erInitialAssessmentId: erPatient?.erInitialAssessmentId,
      },
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/v1/estimation-burn-wound-details`,
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
              realobj: user,
            }))
          : [],
      };
    }
    return { columns: [], data: [] };
  };

  const { columns, data } = getPopupData();
  const handleBack = () => navigate("/emergency/erinitial");
  const navigate = useNavigate();

  return (
    <>
      <div className="EstimationSeverityBurnWoundDetails-container">
        <div className="EstimationSeverityBurnWoundDetails-section">
        <div className="er-initial-assessment-com-section">
        <button className="er-initial-assessment-com-section-back" onClick={handleBack}>Back</button>
        </div>
          <div className="EstimationSeverityBurnWoundDetails-header">
            Estimation Severity Burn Wound Details
          </div>
          <div className="EstimationSeverityBurnWoundDetails-grid">
            <FloatingInput
              label="ER Number"
              value={erPatient?.erInitialAssessmentId}
              readOnly
            />
            <FloatingInput
              label="Name"
              value={formData?.patientName}
              readOnly
            />
            <FloatingInput
              label="Mobile No"
              value={formData.contactNumber}
              readOnly
            />
            <FloatingInput label="Sex" value={formData.gender} readOnly />
            <FloatingInput
              label="Date Of Admission"
              type="date"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleChange}
            />
            <FloatingInput
              label="Date Of Birth"
              type="date"
              name="admissionDate"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            <FloatingInput
              label="Consultant"
              value={formData.consultant}
              readOnly
            />
            {/* <FloatingInput 
              label="Room No / Bed No" 
              value={`${formData.roomNumber} / ${formData.bedNo}`} 
              readOnly 
            /> */}

            <FloatingInput
              label="Relative Name"
              name="relativeName"
              value={formData.relativeName}
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
          <button className="btn-blue" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EstimationSeverityBurnWoundDetails;
