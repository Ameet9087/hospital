import React, { useState, useRef, useEffect } from "react";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import "./PatientCareReport.css";
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
const PatientCareReport = () => {
  const location = useLocation();
  const erPatient = location.state?.receipt;
  const [mrNoData, setMrNoData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({
    uhid: "",
    ipNo: "",
    patientName: "",
    age: "",
    gender: "",
    admissionDate: "",
    consultant: "",
    roomNumber: "",
    dateOfBirth: "",
    contactNumber: "",
    bedNo: "",
    ward: "",
    dateOfDate: "",
    department: "",
    incidentNumber: "",
    vehicleType: "",
    callReceived: "",
    dispatchAt: "",
    relativeName: "",
    arriveScene: "",
    departureScene: "",
    arriveDestination: "",
    returnToBase: "",
    destination: "",
    ipAdmissionDTO: {
      ipAdmmissionId: null,
    },
  });

  const [checkboxes, setCheckboxes] = useState({
    natureOfCall: {
      medical: false,
      trauma: false,
      interfacility: false,
      discharge: false,
    },
    moi: {
      rta: false,
      fail: false,
      assault: false,
      fire: false,
      electrical: false,
      biteString: false,
      other: false,
    },
    response: {
      transported: false,
      refused: false,
      treatedNoTransfer: false,
      death: false,
    },
    injuries: {
      deformities: false,
      contusions: false,
      abrasions: false,
      penetrations: false,
      burns: false,
      tenderness: false,
      lacerations: false,
      swelling: false,
    },
    circulation: {
      normal: false,
      paleCyanosed: false,
      absent: false,
      chiefComplaints: false,
    },
    breathing: {
      adequate: false,
      inadequate: false,
      ab: false,
    },
    procedure: {
      opa: false,
      npa: false,
      lma: false,
      etTube: false,
      cricothyroidotomy: false,
      suction: false,
      oMask: false,
      ambuBag: false,
      ventilator: false,
      bleedingControl: false,
      ivCentral: false,
      ivPeripheral: false,
      defibrillation: false,
      cardioversion: false,
      tcpTvp: false,
      spineImmobilization: false,
      splinting: false,
    },
    mri: {
      mriChecklist: false,
      tattoos: false,
      implants: false,
      pcaMaker: false,
      bodyPiercing: false,
    },
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (category, field) => {
    setCheckboxes((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category][field],
      },
    }));
  };

  const getSelectedItems = (category) => {
    return Object.entries(checkboxes[category])
      .filter(([_, isChecked]) => isChecked)
      .map(([key, _]) => key);
  };

  const handleSave = async () => {
    const payload = {
      dateOfDate: formData.dateOfDate,
      department: formData.department,
      incidentNumber: formData.incidentNumber,
      vehicleType: formData.vehicleType,
      callReceived: formData.callReceived,
      dispatchAt: formData.dispatchAt,
      arriveScene: formData.arriveScene,
      departureScene: formData.departureScene,
      arriveDestination: formData.arriveDestination,
      returnToBase: formData.returnToBase,
      destination: formData.destination,
      natureOfCall: getSelectedItems("natureOfCall"),
      moi: getSelectedItems("moi"),
      response: getSelectedItems("response"),
      injuries: getSelectedItems("injuries"),
      circulation: getSelectedItems("circulation"),
      breathing: getSelectedItems("breathing"),
      procedures: getSelectedItems("procedure"),
      mri: getSelectedItems("mri"),
      erInitialAssessmentDTO: {
        erInitialAssessmentId: erPatient?.erInitialAssessmentId,
      },
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/patient-care-reports`,
        payload
      );
      if (response.status === 200 || response.status === 201) {
        alert("Patient Care Report saved successfully!");
      }
    } catch (error) {
      console.error("Error saving Patient Care Report:", error);
      alert("Failed to save Patient Care Report. Please try again.");
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
        bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
        ward: data?.realobj?.roomDetails?.roomTypeDTO.wardName,
        ipAdmissionDTO: {
          ipAdmmissionId: data?.realobj?.ipAdmissionId,
        },
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
    <>
      <div className="PatientCareReport-container">
        <div className="PatientCareReport-section">
        <div className="er-initial-assessment-com-section">
        <button className="er-initial-assessment-com-section-back" onClick={handleBack}>Back</button>

        </div>

          <div className="PatientCareReport-header">Patient Care Report</div>
        </div>
        <div className="PatientCareReport-section">
          <div className="PatientCareReport-header">Report</div>
          <div className="PatientCareReport-grid">
            <FloatingInput
              label="ER Number"
              type="text"
              name="ipNo"
              value={erPatient?.erInitialAssessmentId}
            />
            <FloatingInput
              label="Patient Name"
              type="text"
              name="patientName"
              value={formData?.patientName}
            />
            <FloatingInput
              label="Relative Name"
              type="text"
              name="relativeName"
              value={formData.relativeName}
            />
            <FloatingInput
              label="Mobile No"
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
            />
            <FloatingInput
              label="Sex"
              type="text"
              name="gender"
              value={formData.gender}
            />
            <FloatingInput
              label="Date Of Admission"
              type="text"
              name="dateOfAdmission"
              value={formData.admissionDate}
            />
            <FloatingInput
              label="Date Of Birth"
              type="text"
              name="dateOfAdmission"
              value={formData.dateOfBirth}
            />

            <FloatingInput
              label="Consultant"
              type="text"
              name="consultant"
              value={formData.consultant}
            />

            {/* <FloatingInput label="Incident No"  type="text"name="IncidentNo"  />
          <FloatingInput label="Vehicle Type"  type="text"name="vehicleType"  />
          <FloatingInput label="Call Received"  type="text"name="callReceived"  />
          <FloatingInput label="Dispatch At"  type="text"name="dispatchAt"  />
          <FloatingInput label="Arrive Scence"  type="text"name="arriveScence"  />
          <FloatingInput label="Departure Scence"  type="text"name="departureScence"  />
          <FloatingInput label="Arrive Destination"  type="text"name="arriveDestination"  />
          <FloatingInput label="Reture To Base"  type="text"name="retureToBase"  />
          <FloatingInput label="Destination"  type="text"name="destination"  /> */}
            {/* Update these FloatingInput components in your render section */}
            <FloatingInput
              label="Incident No"
              type="text"
              name="incidentNumber" // Changed to match API
              value={formData.incidentNumber}
              onChange={handleChange}
            />
            <FloatingInput
              label="Vehicle Type"
              type="text"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
            />
            <FloatingInput
              label="Call Received"
              type="datetime-local" // Changed to datetime-local
              name="callReceived"
              value={formData.callReceived}
              onChange={handleChange}
            />
            <FloatingInput
              label="Dispatch At"
              type="datetime-local" // Changed to datetime-local
              name="dispatchAt"
              value={formData.dispatchAt}
              onChange={handleChange}
            />
            <FloatingInput
              label="Arrive Scene"
              type="datetime-local" // Changed to datetime-local
              name="arriveScene" // Fixed typo
              value={formData.arriveScene}
              onChange={handleChange}
            />
            <FloatingInput
              label="Departure Scene"
              type="datetime-local" // Changed to datetime-local
              name="departureScene" // Fixed typo
              value={formData.departureScene}
              onChange={handleChange}
            />
            <FloatingInput
              label="Arrive Destination"
              type="datetime-local" // Changed to datetime-local
              name="arriveDestination"
              value={formData.arriveDestination}
              onChange={handleChange}
            />
            <FloatingInput
              label="Return To Base"
              type="datetime-local" // Changed to datetime-local
              name="returnToBase" // Fixed typo
              value={formData.returnToBase}
              onChange={handleChange}
            />
            <FloatingInput
              label="Destination"
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* For each checkbox, add the onChange handler like this: */}
        {/* Example for one category: */}
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
                    onChange={() =>
                      handleCheckboxChange("natureOfCall", "medical")
                    }
                  />
                  <label className="PatientCareReport-checkbox-label">
                    Medical
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.natureOfCall.trauma}
                    onChange={() =>
                      handleCheckboxChange("natureOfCall", "trauma")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Trauma
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.natureOfCall.interfacility}
                    onChange={() =>
                      handleCheckboxChange("natureOfCall", "interfacility")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Interfacility
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.natureOfCall.discharge}
                    onChange={() =>
                      handleCheckboxChange("natureOfCall", "discharge")
                    }
                  />{" "}
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Discharge
                  </label>
                </div>
              </div>
            </div>
            <div className="PatientCareReport-checkbox-div">
              <div className="PatientCareReport-header">MOI</div>
              <div className="PatientCareReport-row-chechbox-grid">
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.moi.rta}
                    onChange={() => handleCheckboxChange("moi", "rta")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    RTA
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.moi.fail}
                    onChange={() => handleCheckboxChange("moi", "fail")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Fail
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.moi.assault}
                    onChange={() => handleCheckboxChange("moi", "assault")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Assult
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.moi.fire}
                    onChange={() => handleCheckboxChange("moi", "fire")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Fire
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.moi.electrical}
                    onChange={() => handleCheckboxChange("moi", "electrical")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Electrical
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.moi.biteString}
                    onChange={() => handleCheckboxChange("moi", "biteString")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Bite/String
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.moi.other}
                    onChange={() => handleCheckboxChange("moi", "other")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Other
                  </label>
                </div>
              </div>
            </div>
            <div className="PatientCareReport-checkbox-div">
              <div className="PatientCareReport-header">Response</div>
              <div className="PatientCareReport-row-chechbox-grid">
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.response.transported}
                    onChange={() =>
                      handleCheckboxChange("response", "transported")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Transported
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.response.refused}
                    onChange={() => handleCheckboxChange("response", "refused")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Refused
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.response.treatedNoTransfer}
                    onChange={() =>
                      handleCheckboxChange("response", "treatedNoTransfer")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Treated(No Transfer)
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.response.death}
                    onChange={() => handleCheckboxChange("response", "death")}
                  />{" "}
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Death
                  </label>
                </div>
              </div>
            </div>
            <div className="PatientCareReport-checkbox-div">
              <div className="PatientCareReport-header">Injuries</div>
              <div className="PatientCareReport-row-chechbox-grid">
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.injuries.deformities}
                    onChange={() =>
                      handleCheckboxChange("injuries", "deformities")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    D-Deformities
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.injuries.contusions}
                    onChange={() =>
                      handleCheckboxChange("injuries", "contusions")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    C-Contusions
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.injuries.abrasions}
                    onChange={() =>
                      handleCheckboxChange("injuries", "abrasions")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    A-Abrasions
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.injuries.penetrations}
                    onChange={() =>
                      handleCheckboxChange("injuries", "penetrations")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    P-Penetrations
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.injuries.burns}
                    onChange={() => handleCheckboxChange("injuries", "burns")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    B-Burns
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.injuries.tenderness}
                    onChange={() =>
                      handleCheckboxChange("injuries", "tenderness")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    T-Tenderness
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.injuries.lacerations}
                    onChange={() =>
                      handleCheckboxChange("injuries", "lacerations")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    L-Lacerations
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.injuries.swelling}
                    onChange={() =>
                      handleCheckboxChange("injuries", "swelling")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    S-Sweling
                  </label>
                </div>
              </div>
            </div>






            <div className="PatientCareReport-checkbox-div">
              <div className="PatientCareReport-header">Criculation</div>
              <div className="PatientCareReport-row-chechbox-grid">
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.circulation.normal}
                    onChange={() =>
                      handleCheckboxChange("circulation", "normal")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Normal
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.circulation.paleCyanosed}
                    onChange={() =>
                      handleCheckboxChange("circulation", "paleCyanosed")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Pale, Cyanosed
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.circulation.absent}
                    onChange={() =>
                      handleCheckboxChange("circulation", "absent")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Absent
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.circulation.chiefComplaints}
                    onChange={() =>
                      handleCheckboxChange("circulation", "chiefComplaints")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Chief Complaints
                  </label>
                </div>
              </div>
            </div>
            <div className="PatientCareReport-checkbox-div">
              <div className="PatientCareReport-header">Breathing</div>
              <div className="PatientCareReport-row-chechbox-grid">
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.breathing.adequate}
                    onChange={() =>
                      handleCheckboxChange("breathing", "adequate")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Adequate
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.breathing.inadequate}
                    onChange={() =>
                      handleCheckboxChange("breathing", "inadequate")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Inadequate
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.breathing.ab}
                    onChange={() => handleCheckboxChange("breathing", "ab")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Ab
                  </label>
                </div>
              </div>
            </div>
            <div className="PatientCareReport-checkbox-div">
              <div className="PatientCareReport-header">Procedure</div>
              <div className="PatientCareReport-row-chechbox-grid">
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.opa}
                    onChange={() => handleCheckboxChange("procedure", "opa")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    OPA
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.npa}
                    onChange={() => handleCheckboxChange("procedure", "npa")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    NPA
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.lma}
                    onChange={() => handleCheckboxChange("procedure", "lma")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    LMA
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.etTube}
                    onChange={() => handleCheckboxChange("procedure", "etTube")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    ET Tube
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.cricothyroidotomy}
                    onChange={() =>
                      handleCheckboxChange("procedure", "cricothyroidotomy")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Cricothyroidotomy
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.suction}
                    onChange={() =>
                      handleCheckboxChange("procedure", "suction")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Suction
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.oMask}
                    onChange={() => handleCheckboxChange("procedure", "oMask")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    O Mask
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.ambuBag}
                    onChange={() =>
                      handleCheckboxChange("procedure", "ambuBag")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Ambu Bag
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.ventilator}
                    onChange={() =>
                      handleCheckboxChange("procedure", "ventilator")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Ventilator
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.bleedingControl}
                    onChange={() =>
                      handleCheckboxChange("procedure", "bleedingControl")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Bleeding Control
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.ivCentral}
                    onChange={() =>
                      handleCheckboxChange("procedure", "ivCentral")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    IV Cenytral
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.ivPeripheral}
                    onChange={() =>
                      handleCheckboxChange("procedure", "ivPeripheral")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    IV Peripheral
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.defibrillation}
                    onChange={() =>
                      handleCheckboxChange("procedure", "defibrillation")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Defibrillation
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.cardioversion}
                    onChange={() =>
                      handleCheckboxChange("procedure", "cardioversion")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Cardio Version
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.cardioversion}
                    onChange={() =>
                      handleCheckboxChange("procedure", "cardioversion")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    TCP,TVP
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.spineImmobilization}
                    onChange={() =>
                      handleCheckboxChange("procedure", "spineImmobilization")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Spine Immobilization
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.procedure.splinting}
                    onChange={() =>
                      handleCheckboxChange("procedure", "splinting")
                    }
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Splinting
                  </label>
                </div>
              </div>
            </div>
            <div className="PatientCareReport-checkbox-div">
              <div className="PatientCareReport-header">MRI</div>
              <div className="PatientCareReport-row-chechbox-grid">
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.mri.mriChecklist}
                    onChange={() => handleCheckboxChange("mri", "mriChecklist")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    MRI Checklist
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.mri.tattoos}
                    onChange={() => handleCheckboxChange("mri", "tattoos")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Any Tattoos on body
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.mri.implants}
                    onChange={() => handleCheckboxChange("mri", "implants")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Any Implants
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.mri.pcaMaker}
                    onChange={() => handleCheckboxChange("mri", "pcaMaker")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Any PCA Maker
                  </label>
                </div>
                <div className="PatientCareReport-row-chechbox">
                  <input
                    type="checkbox"
                    checked={checkboxes.mri.bodyPiercing}
                    onChange={() => handleCheckboxChange("mri", "bodyPiercing")}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="PatientCareReport-checkbox-label"
                  >
                    Any Body piercing(Ear Rings Type)
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Continue with the same pattern for all checkboxes */}

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
        <button className="btn-blue" onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
};

export default PatientCareReport;
