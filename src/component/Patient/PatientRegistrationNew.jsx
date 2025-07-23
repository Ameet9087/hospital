import React, { useEffect, useState } from "react";
import "./PatientRegistrationNew.css";
import { API_BASE_URL } from "../api/api";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  PopupTable,
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../FloatingInputs/index";
import { toast } from "react-toastify";
import { usePopup } from "../../FidgetSpinner/PopupContext";
import jsPDF from "jspdf";


const qualificationOptions = [
  { value: "High School", label: "High School" },
  { value: "Diploma", label: "Diploma" },
  { value: "Bachelor's Degree", label: "Bachelor's Degree" },
  { value: "Master's Degree", label: "Master's Degree" },
  { value: "PhD", label: "PhD" },
  { value: "MBBS", label: "MBBS" },
  { value: "B.Tech", label: "B.Tech" },
  { value: "M.Tech", label: "M.Tech" },
  { value: "CA", label: "Chartered Accountant (CA)" },
  { value: "Other", label: "Other" },
];

const occupations = [
  { value: "Doctor", label: "Doctor" },
  { value: "Engineer", label: "Engineer" },
  { value: "Teacher", label: "Teacher" },
  { value: "Gov Employee", label: "Gov Employee" },
  { value: "Nurse", label: "Nurse" },
  { value: "Police Officer", label: "Police Officer" },
  { value: "Artist", label: "Artist" },
  { value: "Entrepreneur", label: "Entrepreneur" },
  { value: "Chef", label: "Chef" },
];

const cast = [
  { value: "Brahmin", label: "Brahmin" },
  { value: "Kshatriya", label: "Kshatriya" },
  { value: "Vaishya", label: "Vaishya" },
  { value: "Shudra", label: "Shudra" },
  { value: "Scheduled Caste (SC)", label: "Scheduled Caste (SC)" },
  { value: "Scheduled Tribe (ST)", label: "Scheduled Tribe (ST)" },
  { value: "Other Backward Class (OBC)", label: "Other Backward Class (OBC)" },
  { value: "General", label: "General" },
  { value: "Muslim", label: "Muslim" },
  { value: "Christian", label: "Christian" },
  { value: "Sikh", label: "Sikh" },
  { value: "Jain", label: "Jain" },
  { value: "Buddhist", label: "Buddhist" },
];

const contactRelations = [
  { value: "Father", label: "Father" },
  { value: "Mother", label: "Mother" },
  { value: "Brother", label: "Brother" },
  { value: "Sister", label: "Sister" },
  { value: "Spouse", label: "Spouse" },
  { value: "Son", label: "Son" },
  { value: "Daughter", label: "Daughter" },
  { value: "Grandparent", label: "Grandparent" },
  { value: "Uncle", label: "Uncle" },
  { value: "Aunt", label: "Aunt" },
  { value: "Guardian", label: "Guardian" },
  { value: "Friend", label: "Friend" },
  { value: "Other", label: "Other" },
];

const PatientRegistrationNew = ({ onClose }) => {
  const { showPopup } = usePopup();
  const location = useLocation();
  const patient = location.state?.patient;
  const erPatient = location.state?.receipt;
  const [formData, setFormData] = useState({
    salutation: patient?.salutation || "",
    firstName: patient?.firstName || "", // updated from fName
    middleName: patient?.middleName || "", // updated from mName
    lastName: patient?.lastName || "", // updated from lName
    age: patient?.age || "",
    ageUnit: patient?.ageUnit || "Years",
    gender: patient?.gender || "",
    dateOfBirth: patient?.dateOfBirth || "",
    maritalStatus: patient?.maritalStatus || "",
    relation: patient?.relation || "",
    relationName: patient?.relationName || "", // updated from relativeName
    religion: patient?.religion || "",
    cast: patient?.cast || "", // updated from caste
    occupation: patient?.occupation || "",
    qualification: patient?.qualification || "",
    motherName: patient?.motherName || "",
    address: patient?.address || "",
    areaVillage: patient?.areaVillage || "",
    cityDistrict: patient?.cityDistrict || "",
    state: patient?.state || "",
    country: patient?.country || "",
    pinCode: patient?.pinCode || "",
    mobileNumber: patient?.mobileNumber || "", // updated from mobileNo
    telNumberOff: patient?.telNumberOff || "", // updated from telNo
    telNumberRes: patient?.telNumberRes || "", // updated to align with DTO
    emailId: patient?.emailId || "",
    height: patient?.height || "",
    weight: patient?.weight || "",
    sourceOfRegistration: patient?.sourceOfRegistration || "", // updated from sourceOfregistration
    registrationDate: new Date().toISOString().split("T")[0],
    remarks: patient?.remarks || "",
    previousHospital: patient?.previousHospital || "",
    referredContactNumber: patient?.referredContactNumber || "", // updated from referredContactNo
    nationality: patient?.nationality || "",
    incomeRange: patient?.incomeRange || "",
    contactNameInitial: patient?.contactNameInitial || "", // updated from conatctNameInitial
    contactRelation: patient?.contactRelation || "", // updated from contactrelation
    contactName: patient?.contactName || "", // updated from conatctName
    telNumberRes1: patient?.telNumberRes1 || "",
    telNumberOff1: patient?.telNumberOff1 || "",
    contactNumber: patient?.contactNumber || "",
    gstin: patient?.gstin || "",
    pan: patient?.pan || "",
    adharCardId: patient?.adharCardId || "",
    sponserType: patient?.sponserType || "", // updated from sponsorType
    eligibility: patient?.eligibility || "",
    policyNumber: patient?.policyNumber || "",
    policyStartDate: patient?.policyStartDate || "",
    policyEndDate: patient?.policyEndDate || "",
    isEmergency: patient?.isEmergency || "no",
    erNo: patient?.erNo || "",
  });
  const [file, setFile] = useState();
  const [activePopup, setActivePopup] = useState(null);
  const [result, setResult] = useState();
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [organisation, setOrganisation] = useState([]);
  const [organisationId, setOrganisationId] = useState();
  const [selectedDoctors, setSelectedDoctors] = useState([
    {
      doctorId: "",
      doctorName: "",
      mobileNumber: "",
      residenceAddress: "",
      emailId: "",
    },
  ]);

  useEffect(() => {
    if (erPatient) {
      setFormData((prevData) => ({
        ...prevData,
        // erInitialAssessmentId: erPatient.erInitialAssessmentId || "",
        salutation: erPatient.nameInitial || "",
        firstName: erPatient.firstName || "",
        middleName: erPatient.middleName || "",
        lastName: erPatient.lastName || "",
        contactNumber: erPatient.contactNumber || "",
        dateOfBirth: erPatient.dob || "",
        gender: erPatient.sex || "",
        relationName: erPatient.relativeName || "",
        isEmergency: "yes",
        erNo: erPatient.erInitialAssessmentId || "",
      }));
    }
  }, [erPatient]);

  const handleDoctorSelect = (selectedDoctorData) => {
    console.log(selectedDoctorData);
    setSelectedDoctors((prevState) => {
      const allFieldsFilled =
        selectedDoctorData.doctorName &&
        selectedDoctorData.residenceAddress &&
        selectedDoctorData.mobileNumber &&
        selectedDoctorData.emailId;

      if (!allFieldsFilled) {
        return prevState;
      }
      const doctorIndex = prevState.findIndex(
        (doctor) => doctor.doctorId === selectedDoctorData.doctorId
      );
      if (doctorIndex !== -1) {
        const updatedDoctors = [...prevState];
        updatedDoctors[doctorIndex] = {
          ...updatedDoctors[doctorIndex],
          ...selectedDoctorData,
        };
        return updatedDoctors;
      }
      return [selectedDoctorData];
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => {
      const updatedFormData = {
        ...prevData,
        [name]: fieldValue,
      };

      const currentDate = new Date();

      if (name === "dateOfBirth" && value) {
        // Calculate age based on dateOfBirth
        const birthDate = new Date(value);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        const isBeforeBirthday =
          currentDate.getMonth() < birthDate.getMonth() ||
          (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate());
        updatedFormData.age = isBeforeBirthday ? age - 1 : age;
      }

      if (name === "age" && value) {
        // Calculate dateOfBirth based on age
        const years = parseInt(value, 10);
        if (!isNaN(years)) {
          const dobYear = currentDate.getFullYear() - years;
          const dobFromToday = new Date(
            dobYear,
            currentDate.getMonth(),
            currentDate.getDate()
          );
          updatedFormData.dateOfBirth = dobFromToday
            .toISOString()
            .split("T")[0]; // Format as YYYY-MM-DD
        }
      }

      return updatedFormData;
    });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const fetchDataByPinCode = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/cities/area-details?areaPinCode=${formData.pinCode}`
    );
    console.log(response.data);

    setFormData((prevState) => ({
      ...prevState,
      country: response.data.countryName,
      state: response.data.stateName,
      cityDistrict: response.data.cityName,
    }));
  };
  useEffect(() => {
    fetchDataByPinCode();
  }, [formData.pinCode]);



  useEffect(() => {
    fetchDataByPinCode();
  }, [formData.pinCode]);
  const generatePDF = () => {
    const doc = new jsPDF();
    const patientName = `${formData.firstName} ${formData.lastName}`;
    const pdfName = `Patient_${patientName}_Registration.pdf`;
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Patient Registration Form", 68, 10);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Patient Details", 10, 20);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    let y = 30;
    const patientDetails = [
      `Name: ${formData.salutation} ${formData.firstName} ${formData.middleName} ${formData.lastName}`,
      `Age: ${formData.age} ${formData.ageUnit}`,
      `Gender: ${formData.gender}`,
      `Date of Birth: ${formData.dateOfBirth}`,
      `Marital Status: ${formData.maritalStatus}`,
      `Relation: ${formData.relation}`,
      `Relation Name: ${formData.relationName}`,
      `Religion: ${formData.religion}`,
      `Caste: ${formData.cast}`,
      `Occupation: ${formData.occupation}`,
      `Qualification: ${formData.qualification}`,
      `Mother's Name: ${formData.motherName}`,
      `Address: ${formData.address}`,
      `Area/Village: ${formData.areaVillage}`,
      `City/District: ${formData.cityDistrict}`,
      `State: ${formData.state}`,
      `Country: ${formData.country}`,
      `Pin Code: ${formData.pinCode}`,
      `Mobile Number: ${formData.mobileNumber}`,
      `Tel Number (Off): ${formData.telNumberOff}`,
      `Tel Number (Res): ${formData.telNumberRes}`,
      `Email ID: ${formData.emailId}`,
      `Height: ${formData.height}`,
      `Weight: ${formData.weight}`,
      `Source of Registration: ${formData.sourceOfRegistration}`,
      `Remarks: ${formData.remarks}`,
      `Previous Hospital: ${formData.previousHospital}`,
      `Referred Contact Number: ${formData.referredContactNumber}`,
      `Nationality: ${formData.nationality}`,
      `Income Range: ${formData.incomeRange}`,
      `Contact Name Initial: ${formData.contactNameInitial}`,
      `Contact Relation: ${formData.contactRelation}`,
      `Contact Name: ${formData.contactName}`,
      `Tel Number (Res 1): ${formData.telNumberRes1}`,
      `Tel Number (Off 1): ${formData.telNumberOff1}`,
      `Contact Number: ${formData.contactNumber}`,
      `GSTIN: ${formData.gstin}`,
      `PAN: ${formData.pan}`,
      `Aadhar Card ID: ${formData.adharCardId}`,
      `Sponsor Type: ${formData.sponserType}`,
      `Eligibility: ${formData.eligibility}`,
      `Policy Number: ${formData.policyNumber}`,
      `Policy Start Date: ${formData.policyStartDate}`,
      `Policy End Date: ${formData.policyEndDate}`,
      `Is Emergency: ${formData.isEmergency}`,
      `ER No: ${formData.erNo}`,
    ];

    patientDetails.forEach((detail) => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(detail, 10, y);
      y += 10;
    });
    if (selectedDoctors.length > 0) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Referred Doctors", 10, y);
      y += 10;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      selectedDoctors.forEach((doctor, index) => {
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
        doc.text(`Doctor ${index + 1}: ${doctor.doctorName}`, 15, y);
        y += 10;
        doc.text(`Address: ${doctor.residenceAddress}`, 15, y);
        y += 10;
        doc.text(`Mobile: ${doctor.mobileNumber}`, 15, y);
        y += 10;
        doc.text(`Email: ${doctor.emailId}`, 15, y);
        y += 10;
      });
    }
    doc.save(pdfName);
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      const doctorData = selectedDoctors.map((doctor) => ({
        doctorId: doctor.doctorId,
      }));
      console.log("Doctor Data:", doctorData);
      const submissionData = {
        ...formData,
        ...(organisationId > 0 && {
          organisationMaster: {
            masterId: organisationId,
          },
        }),
      };
      console.log("Submission Data:", submissionData);
      dataToSend.append("patientData", JSON.stringify(submissionData));
      if (file != null) {
        dataToSend.append("file", file);
      }
      if (selectedDoctors > 0) {
        dataToSend.append("doctorList", JSON.stringify(doctorData));
      }
      for (let pair of dataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }
      const url = patient?.patientRegistrationId
        ? `${API_BASE_URL}/patient-register/${patient?.patientRegistrationId}`
        : `${API_BASE_URL}/patient-register/add`;
      const method = patient?.patientRegistrationId ? "PUT" : "POST";
      const response = await fetch(url, {
        method: method,
        body: dataToSend,
      });
      if (response.ok) {
        showPopup([
          { url: "/appointment/doctorappointment", text: "Appointment" },
          { url: "/adt/ipadmission", text: "Ip Admission" },
        ]);
        const result = await response.json();
        toast.success(
          patient?.patientRegistrationId
            ? `Patient updated successfully with ID: ${result.uhid}`
            : `Patient registered successfully with ID: ${result.uhid}`
        );
        setResult(result);
        generatePDF();
      } else {
        toast.error(
          "Error submitting form:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const fetchAllData = async () => {
    try {
      const [
        statesResponse,
        citiesResponse,
        countryResponse,
        doctorResponse,
        organisationResponse,
      ] = await Promise.all([
        axios.get(`${API_BASE_URL}/states`),
        axios.get(`${API_BASE_URL}/cities`),
        axios.get(`${API_BASE_URL}/country`),
        axios.get(`${API_BASE_URL}/doctors/doctors/non-employees`),
        axios.get(`${API_BASE_URL}/organisation-masters`),
      ]);

      setStates(statesResponse.data);
      setCities(citiesResponse.data);
      setCountry(countryResponse.data);
      setDoctors(doctorResponse.data);
      setOrganisation(organisationResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleSelect = (data) => {
    if (activePopup === "cityDistrict") {
      setFormData((prevState) => ({
        ...prevState,
        cityDistrict: data.cityName,
      }));
    } else if (activePopup === "state") {
      setFormData((prevState) => ({
        ...prevState,
        state: data.stateName,
      }));
    } else if (activePopup === "country") {
      setFormData((prevState) => ({
        ...prevState,
        country: data.countryName,
      }));
    } else if (activePopup === "nationality") {
      setFormData((prevState) => ({
        ...prevState,
        nationality: data.countryName,
      }));
    } else if (activePopup === "doctor") {
      handleDoctorSelect(data);
    }
    setActivePopup(null);
  };

  const getPopupData = () => {
    if (activePopup === "cityDistrict") {
      return { columns: ["cityId", "cityName"], data: cities };
    } else if (activePopup === "state") {
      return { columns: ["statesId", "stateName"], data: states };
    } else if (activePopup === "country") {
      return { columns: ["countryId", "countryName"], data: country };
    } else if (activePopup === "pinCode") {
      return { columns: [""], data: departmentDetails };
    } else if (activePopup === "nationality") {
      return { columns: ["countryId", "countryName"], data: country };
    } else if (activePopup === "doctor") {
      return { columns: ["doctorName"], data: doctors };
    } else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();
  const addRow = () => {
    setSelectedDoctors((prevState) => [
      ...prevState, // Keep the previous data intact
      { doctorName: "", address: "", mobileNo: "", emailId: "" }, // Add a new row
    ]);
  };

  const deleteRow = (index) => {
    const newDoc = doctors.filter((_, i) => i !== index);
    setSelectedDoctors(newDoc);
  };

  const handleQualificationChange = (selectedOption) => {
    setFormData({ ...formData, qualification: selectedOption.value });
  };
  const handleOccupationChange = (selectedOptions) => {
    setFormData({ ...formData, occupation: selectedOptions.value });
  };
  const handleCasteChange = (selectedOption) => {
    setFormData({ ...formData, cast: selectedOption.value });
  };

  const handleContactRelationChange = (selectedOption) => {
    setFormData({ ...formData, contactRelation: selectedOption.value });
  };

  return (
    <div className="patient-registration-component-container">
      <div className="patient-registration-component-form">
        <h4 className="patient-registration-h4">Patient Details</h4>
        <div className="patient-registration-component-form-row">
          <div className="patient-registration-component-form-group-1row">
            <div className="patient-registration-component-form-group">
              <FloatingInput
                label={"ER No"}
                type="text"
                name="erNo"
                value={formData.erNo}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingInput
                label={"MR NO"}
                type="text"
                name="uhid"
                value={result?.uhid || patient?.uhid}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingSelect
                label="Name Initial"
                name="salutation"
                value={formData.salutation}
                onChange={handleChange}
                options={[
                  { value: "", label: "" },
                  { value: "Mr.", label: "Mr." },
                  { value: "Ms.", label: "Ms." },
                  { value: "Dr.", label: "Dr." },
                  { value: "Prof.", label: "Prof." },
                ]}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingInput
                label={"F Name"}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingInput
                label={"M Name"}
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="patient-registration-component-form-group-1row">
            <div className="patient-registration-component-form-group">
              <FloatingInput
                label={"L Name"}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingInput
                label={"Birth Date"}
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingInput
                label={"Age"}
                type="text"
                restrictions={{ number: true, max: 3 }}
                name="age"
                value={formData.age}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ""); // Allow only numbers
                  value = Math.min(110, value); // Ensure max value is 110
                  handleChange({ target: { name: "age", value } });
                }}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingSelect
                label="Age Unit"
                name="ageUnit"
                value={formData.ageUnit}
                onChange={handleChange}
                options={[{ value: "Years", label: "Years" }]}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingSelect
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
              />
            </div>
          </div>

          <div className="patient-registration-component-form-group-1row">
            <div className="patient-registration-component-form-group">
              <FloatingSelect
                label="Marital Status"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                options={[
                  { value: "Single", label: "Single" },
                  { value: "Married", label: "Married" },
                  { value: "Divorced", label: "Divorced" },
                ]}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingSelect
                label="Relation"
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                options={[
                  { value: "Father", label: "Father" },
                  { value: "Mother", label: "Mother" },
                  { value: "Spouse", label: "Spouse" },
                  { value: "Sibling", label: "Sibling" },
                ]}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingInput
                label="Relation Name"
                type="text"
                name="relationName"
                value={formData.relationName}
                onChange={handleChange}
                restrictions={{ varchar: true }}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingSelect
                label="Religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                options={[
                  { value: "Christianity", label: "Christianity" },
                  { value: "Islam", label: "Islam" },
                  { value: "Hinduism", label: "Hinduism" },
                  { value: "Buddhism", label: "Buddhism" },
                  { value: "Judaism", label: "Judaism" },
                  { value: "Other", label: "Other" },
                ]}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingSelect
                label="Caste"
                value={cast.find((c) => c.value === formData.cast)}
                onChange={handleCasteChange}
                options={cast}
              />
            </div>
          </div>

          <div className="patient-registration-component-form-group-1row">
            <div className="patient-registration-component-form-group">
              <FloatingSelect
                label={"Occupation"}
                options={occupations}
                value={occupations.find((o) => o.value === formData.occupation)}
                onChange={handleOccupationChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingSelect
                label={"Qualification"}
                options={qualificationOptions}
                value={qualificationOptions.find(
                  (q) => q.value === formData.qualification
                )}
                onChange={handleQualificationChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingInput
                label={"Mother Name"}
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingInput
                label={"Address"}
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <FloatingInput
                label={"Area/Village"}
                name="areaVillage"
                value={formData.areaVillage}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="patient-registration-component-form-row">
        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"District"}
              type="search"
              name="cityDistrict"
              value={formData.cityDistrict}
              onChange={handleChange}
              onIconClick={() => setActivePopup("cityDistrict")}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"State"}
              type="search"
              name="state"
              value={formData.state}
              onChange={handleChange}
              onIconClick={() => setActivePopup("state")}
            />
          </div>

          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Country"}
              type="search"
              name="country"
              value={formData.country}
              onChange={handleChange}
              onIconClick={() => setActivePopup("country")}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Pincode"}
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Mobile No"}
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              restrictions={{ number: true, max: 10 }}
              required
            />
          </div>
        </div>
      </div>

      <div className="patient-registration-component-form-row">
        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Tel No(Off)"}
              type="text"
              name="telNumberOff"
              value={formData.telNumberOff}
              onChange={handleChange}
              restrictions={{ number: true, max: 10 }}
              required
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Email Id"}
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Height(in KG)"}
              type="text"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Weight(in KG)"}
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingSelect
              label="Source Of Registration"
              name="sourceOfRegistration"
              value={formData.sourceOfRegistration}
              onChange={handleChange}
              options={[
                { value: "Walk-in", label: "Walk-in" },
                { value: "Online", label: "Online" },
                { value: "Referral", label: "Referral" },
                { value: "Campaign", label: "Campaign" },
                { value: "Other", label: "Other" },
              ]}
            />
          </div>
        </div>

        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Remarks"}
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Previous Hospital"}
              type="text"
              name="previousHospital"
              value={formData.previousHospital}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Referred Contact No"}
              type="text"
              name="referredContactNumber"
              value={formData.referredContactNumber}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Nationality"}
              type="search"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              onIconClick={() => setActivePopup("nationality")}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingSelect
              label="Income Range"
              name="incomeRange"
              value={formData.incomeRange}
              onChange={handleChange}
              options={[
                { value: "Below 10,000", label: "Below 10,000" },
                { value: "10,000 - 50,000", label: "10,000 - 50,000" },
                { value: "50,001 - 1,00,000", label: "50,001 - 1,00,000" },
                { value: "Above 1,00,000", label: "Above 1,00,000" },
              ]}
            />
          </div>
        </div>

        <h4 className="patient-registration-h4">
          Local Contact Person In Emergency
        </h4>
        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <FloatingSelect
              label="Contact Name Initial"
              name="contactNameInitial"
              value={formData.contactNameInitial}
              onChange={handleChange}
              options={[
                { value: "Mrs", label: "Mrs" },
                { value: "Mr", label: "Mr" },
                { value: "Ms", label: "Ms" },
                { value: "Miss", label: "Miss" },
                { value: "Master", label: "Master" },
                { value: "Dr.", label: "Dr." },
                { value: "Baby", label: "Baby" },
              ]}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Contact Name"}
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingSelect
              label="Contact Relation"
              value={contactRelations.find(
                (c) => c.value === formData.contactRelation
              )}
              onChange={handleContactRelationChange}
              options={contactRelations}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Tel No(Res)"}
              type="text"
              name="telNumberRes1"
              value={formData.telNumberRes1}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Tel No(Off)"}
              type="text"
              name="telNumberOff1"
              value={formData.telNumberOff1}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Contact Mobile No"}
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group"></div>
          <div className="patient-registration-component-form-group"></div>
          <div className="patient-registration-component-form-group"></div>
          <div className="patient-registration-component-form-group"></div>
        </div>
        <h4 className="patient-registration-h4">Payment Details</h4>
        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"GSTIN"}
              type="text"
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"PAN"}
              type="text"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              restrictions={{ varchar: true, max: 10 }}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Aadhar Card Number"}
              type="text"
              name="adharCardId"
              value={formData.adharCardId}
              onChange={handleChange}
              restrictions={{ number: true, max: 12 }}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingSelect
              label={"Sponsor Type"}
              name="sponserType"
              value={formData.sponserType}
              onChange={handleChange}
              options={[
                { value: "Company", label: "Company" },
                { value: "Individual", label: "Individual" },
                { value: "Government", label: "Government" },
                { value: "NGO", label: "NGO" },
                { value: "Other", label: "Other" },
              ]}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingSelect
              label={"Eligibility"}
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              options={[
                { value: "Eligible", label: "Eligible" },
                { value: "Not Eligible", label: "Not Eligible" },
                { value: "Pending", label: "Pending" },
                { value: "Exempted", label: "Exempted" },
              ]}
            />
          </div>
        </div>

        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <FloatingSelect
              label="Organisation Name"
              name="organisationMaster"
              value={organisationId}
              onChange={(e) => setOrganisationId(e.target.value)}
              options={[
                { value: "", label: "Select Organisation" },
                ...(Array.isArray(organisation)
                  ? organisation.map((org) => ({
                    value: org.masterId,
                    label: org.name,
                  }))
                  : []),
              ]}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Policy Number"}
              type="text"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Policy Start Date"}
              type="date"
              name="policyStartDate"
              value={formData.policyStartDate}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              label={"Policy End Date"}
              type="date"
              name="policyEndDate"
              value={formData.policyEndDate}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <FloatingInput
              type="file"
              name="policyEndDate"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <h4 className="patient-registration-h4">Referred Doctors</h4>
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>SN</th>
              <th>Doctor Name</th>
              <th>Address</th>
              <th>Mobile No</th>
              <th>Email ID</th>
            </tr>
          </thead>
          <tbody>
            {selectedDoctors.length > 0 &&
              selectedDoctors.map((doctor, index) => (
                <tr key={index}>
                  <td>
                    <button className="patient-re-add" onClick={addRow}>
                      Add
                    </button>
                    <button
                      className="patient-re-delete"
                      onClick={() => deleteRow(index)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>{index + 1}</td>
                  <td>
                    <FloatingInput
                      label={"Doctor Name"}
                      type="search"
                      value={doctor.doctorName}
                      name="doctorName"
                      onIconClick={() => setActivePopup("doctor")}
                    />
                  </td>
                  <td>
                    <FloatingInput
                      label={"Residence Address"}
                      type="text"
                      value={doctor.residenceAddress}
                    />
                  </td>
                  <td>
                    <FloatingInput
                      label={"Mobile No"}
                      type="text"
                      value={doctor.mobileNumber}
                    />
                  </td>
                  <td>
                    <FloatingInput
                      label={"Email Id"}
                      type="text"
                      value={doctor.emailId}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="patient-registration-component-form-actions">
        {patient ? (
          <button
            className="patient-registration-component-add-btn"
            onClick={handleSubmit}
          >
            Update
          </button>
        ) : (
          <button
            className="patient-registration-component-add-btn"
            onClick={handleSubmit}
          >
            Add
          </button>
        )}
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
  );
};

export default PatientRegistrationNew;
