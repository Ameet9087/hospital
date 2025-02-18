import React, { useState, useRef, useEffect } from "react";
import "./AccidentReportForm.css";
import axios from "axios";
import PopupTable from "../popup";
import { useLocation } from "react-router-dom";
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
      className={`AccidentReportForm-floating-field ${
        isFocused || hasValue ? "active" : ""
      }`}
    >
      <input
        type={type}
        className="AccidentReportForm-floating-input"
        value={value}
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

// FloatingSelect component remains exactly the same
const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div
      className={`AccidentReportForm-floating-field ${
        isFocused || hasValue ? "active" : ""
      }`}
    >
      <select
        className="AccidentReportForm-floating-select"
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
      <label className="AccidentReportForm-floating-label">{label}</label>
    </div>
  );
};
const AccidentReportForm = ({ onClose }) => {
  const location = useLocation();
  const erPatient = location.state?.receipt;

  const [mrNoData, setMrNoData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({
    nameOfPolice: "",
    patientName: "",
    mechanismOfInjury: "",
    admissionDate: "",
    doctorName: "",
    relativeName: "",
    contactNumber: "",
    landmark: "",
    injuriesSustained: "",
    policeStation: "",
    informedToPolice: "",
    diagnosis: "",
    dateOfBirth: "",
    siteOfIncident: "",
    otherDetails: "",
    incidentDate: "",
    gender: "",
    incidentTime: "",
    natureOfInjury: "",
    medicalOfficerSignature: "",
    preferredFromOtherHospital: "",
    hospitalName: "",
    identificationMarks: "",
    registrationNumber: "",
    ipAdmissiondto: {
      ipAdmmissionId: "",
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
        erNo: erPatient.erInitialAssessmentId || "",
        doctorName: erPatient?.addDoctor[0]?.doctorName || "",
        admissionDate: erPatient?.date || "",
        relativeName: erPatient?.relativeName || "",
      }));
    }
  }, [erPatient]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build the payload dynamically
    const payload = {
      nameOfPolice: formData.nameOfPolice || "",
      mechanismOfInjury: formData.mechanismOfInjury || "",
      landmark: formData.landmark || "",
      injuriesSustained: formData.injuriesSustained || "",
      policeStation: formData.policeStation || "",
      informedToPolice: formData.informedToPolice || "",
      diagnosis: formData.diagnosis || "",
      siteOfIncident: formData.siteOfIncident || "",
      otherDetails: formData.otherDetails || "",
      incidentDate: formData.incidentDate || "",
      incidentTime: formData.incidentTime || "",
      natureOfInjury: formData.natureOfInjury || "",
      medicalOfficerSignature: formData.medicalOfficerSignature || "",
      preferredFromOtherHospital: formData.preferredFromOtherHospital || "",
      hospitalName: formData.hospitalName || "",
      registrationNumber: formData.registrationNumber || "",
      erInitialAssessmentDTO: {
        erInitialAssessmentId: erPatient?.erInitialAssessmentId,
      },
    };

    // // Add ipAdmissiondto only if ipAdmmissionId exists
    // if (formData.ipAdmissiondto?.ipAdmmissionId) {
    //   payload.ipAdmissiondto = {
    //     ipAdmmissionId: formData.ipAdmissiondto.ipAdmmissionId,
    //   };
    // }

    console.log("Payload to be submitted:", payload);

    try {
      const response = await fetch(`${API_BASE_URL}/accident-report-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // Update the corresponding key in formData
    }));
  };
  const fetchMrno = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/ip-admissions`
      );
      setMrNoData(response.data);
      console.log(data);
      console.log(mrNoData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);
  const handleSelect = (data) => {
    console.log(data, "selected data");
    if (activePopup === "MrNo") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        uhid: data.uhid,
        ipAdmmissionId: data?.realobj?.patient?.inPatientId,
        patientName: data.firstName,
        lastName: data.lastName,
        age: data?.realobj?.patient?.patient?.age || "N/A",
        sex: data?.realobj?.patient?.patient?.gender || "N/A",
        dateOfAdmission: data?.realobj?.admissionDate || "N/A",
        departmentName:
          data?.realobj?.admissionUnderDoctorDetail?.consultantDoctor
            ?.specialisationId?.specialisationName || "N/A",
        ward: data?.realobj?.roomDetails?.roomTypeDTO?.wardName || "N/A",
        arrivalDate: data?.realobj?.admissionDate || "N/A",
        arrivalTime: data?.realobj?.admissionTime || "N/A",
        fatherHusbandName:
          data?.realobj?.patient?.patient?.contactName || "N/A",
        occupation: data?.realobj?.patient?.patient?.occupation || "N/A",
        address: data?.realobj?.patient?.patient?.address || "N/A",
        // identificationMarks:data?.realobj?.identification || "N/A",
        doctorName:
          data?.realobj?.admissionUnderDoctorDetail?.consultantDoctor
            ?.doctorName || "N/A",
        consultant:
          data?.realobj?.admissionUnderDoctorDetail?.coConsultant?.doctorName,
        roomNumber: data?.realobj?.roomDetails?.roomDTO?.roomNumber,
        bedNo: data?.realobj?.roomDetails?.bedDTO?.bedNo,
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
              realobj: user,
            }))
          : [],
      };
      console.log("Popup Data:", popupData);
      return popupData;
    }
    return { columns: [], data: [] };
  };
  const { columns, data } = getPopupData();
  return (
    <>
      <div className="AccidentReportForm-container">
        <div className="AccidentReportForm-section">
          <div className="AccidentReportForm-header">
            Accident Report Details
          </div>
        </div>
        <div className="AccidentReportForm-section">
          <div className="AccidentReportForm-grid">
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
              value={formData.patientName}
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
            {/* <FloatingInput label="Date Of Discharge" type="date" name="dateOfDischarge" /> */}
            <FloatingInput
              label="Relative  Name"
              type="text"
              name="relativeName"
              value={formData.relativeName}
            />

            <FloatingInput
              label="Doctor Name"
              type="text"
              name="doctorName"
              value={formData.doctorName}
            />
            {/* <FloatingInput label="Hospital No" type="text" name="hospitalNo" /> */}
            <FloatingInput
              label="Arrival Date"
              type="date"
              name="arrivalDate"
              value={formData.admissionDate}
            />
            <FloatingInput
              label="Arrival Time"
              type="text"
              name="arrivalTime"
              value={formData.arrivalTime}
            />
            <FloatingInput
              label="Father/Husband Name"
              type="text"
              name="fatherHusbandName"
              value={formData.fatherHusbandName}
            />
            <FloatingInput
              label="Occupation"
              type="text"
              name="occupation"
              value={formData.occupation}
            />
            <FloatingInput
              label="Address"
              type="text"
              name="Address"
              value={formData.address}
            />
            <FloatingInput
              label="Identification Marks"
              type="text"
              name="identificationMarks"
              value={formData.identificationMarks}
            />
            <FloatingInput label="Brought By" type="text" name="broughtBy" />
            <FloatingInput
              label="Relationship"
              type="text"
              name="relationship"
            />
            <FloatingInput label="Phone No" type="tel" name="phoneNo" />
            <div className="AccidentReportForm-form-group">
              <label value={formData.informedToPolice} onchange={handleChange}>
                Informed To Police:
              </label>
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
              onChange={handleChange}
              value={formData.nameOfPolice}
            />
            <FloatingInput
              label="Police Station"
              type="text"
              onChange={handleChange}
              name="policeStation"
              value={formData.policeStation}
            />
            <FloatingInput
              label="Diagnosis"
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
            />
            <FloatingInput
              label="Mechanism Of Injury"
              type="text"
              onChange={handleChange}
              name="mechanismOfInjury"
              value={formData.mechanismOfInjury}
            />
            <div className="AccidentReportForm-form-group">
              <label value={formData.siteOfIncident} onChange={handleChange}>
                Site Of Incident:
              </label>
              <div className="AccidentReportForm-radio-button">
                <label>
                  <input type="radio" name="siteOfIncident" value="home" />
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
              onChange={handleChange}
              name="otherDetails"
              value={formData.otherDetails}
            />
            <FloatingInput
              label="Landmark"
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
            />
            <FloatingInput
              label="Incident Date"
              type="date"
              onChange={handleChange}
              name="incidentDate"
              value={formData.incidentDate}
            />
            <FloatingInput
              label="Incident Time"
              type="time"
              onChange={handleChange}
              name="incidentTime"
              value={formData.incidentTime}
            />
            <div className="AccidentReportForm-form-group">
              <label value={formData.injuriesSustained} onChange={handleChange}>
                Injuries Sustained:
              </label>
              <div className="AccidentReportForm-radio-button">
                <label>
                  <input type="radio" name="injuriesSustained" value="simple" />
                  Simple
                </label>
                <label>
                  <input
                    type="radio"
                    name="injuriesSustained"
                    value="grevious"
                  />
                  Grevious
                </label>
                <label>
                  <input
                    type="radio"
                    name="injuriesSustained"
                    value="opinionReserved"
                  />
                  OpinionReserved
                </label>
              </div>
            </div>
            <FloatingInput
              label="Nature Of Injury"
              type="text"
              onChange={handleChange}
              name="natureOfInjury"
              value={formData.natureOfInjury}
            />
            <FloatingInput
              label="Medical Officer Signature"
              type="text"
              onChange={handleChange}
              name="medicalOfficerSignature"
              value={formData.medicalOfficerSignature}
            />
            <div className="AccidentReportForm-form-group">
              <label
                value={formData.preferredFromOtherHospital}
                onChange={handleChange}
              >
                Preferred From Other Hospital:
              </label>
              <div className="AccidentReportForm-radio-button">
                <label>
                  <input
                    type="radio"
                    name="preferredFromOtherHospital"
                    value="yes"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="preferredFromOtherHospital"
                    value="no"
                  />
                  No
                </label>
              </div>
            </div>
            <FloatingInput
              label="Hospital Name"
              type="text"
              onChange={handleChange}
              name="hospitalName"
            />
            <FloatingInput
              label="Regn. Number"
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
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
      </div>
      <div className="AccidentReportForm-buttons">
        <button className="btn-blue" onClick={handleSubmit}>
          Save
        </button>
        <button className="btn-red">Close</button>
      </div>
    </>
  );
};
export default AccidentReportForm;
