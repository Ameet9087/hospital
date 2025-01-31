import React, { useEffect, useState } from "react";
import "./PatientRegistrationNew.css";
import { IoSearch } from "react-icons/io5";
import { API_BASE_URL } from "../api/api";
import axios from "axios";
import PopupTable from "../Nursing/NursingModule/Services/PopupTable";
import { useLocation, useParams } from "react-router-dom";
import { usePopup } from "../../FidgetSpinner/PopupContext";

const PatientRegistrationNew = ({ onClose }) => {
  const location = useLocation();
  const patient = location.state?.patient;
  const { showPopup } = usePopup();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();

      // Transform selectedDoctors into the required format
      const doctorData = selectedDoctors.map((doctor) => ({
        doctorId: doctor.doctorId, // Include other fields if necessary
      }));

      // Log the transformed doctorData for debugging
      console.log("Doctor Data:", doctorData);

      // Prepare submission data
      const submissionData = {
        ...formData,
        ...(organisationId > 0 && {
          organisationMaster: {
            masterId: organisationId,
          },
        }),
      };

      // Log submission data for debugging
      console.log("Submission Data:", submissionData);

      // Append data to FormData
      dataToSend.append("patientData", JSON.stringify(submissionData)); // Serialize to JSON
      if (file != null) {
        dataToSend.append("file", file);
      }
      if (selectedDoctors > 0) {
        dataToSend.append("doctorList", JSON.stringify(doctorData)); // Serialize doctorData to JSON
      }

      // Log FormData for debugging (use a utility since FormData cannot be directly logged)
      for (let pair of dataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }
      // Check if patientId exists
      const url = patient?.patientRegistrationId
        ? `${API_BASE_URL}/patient-register/${patient?.patientRegistrationId}` // Update endpoint
        : `${API_BASE_URL}/patient-register/add`; // Save endpoint
      const method = patient?.patientRegistrationId ? "PUT" : "POST"; // Use PUT for updates, POST for save

      // Send the request
      const response = await fetch(url, {
        method: method,
        headers: patient?.patientRegistrationId
          ? { "Content-Type": "application/json" } // Set for JSON
          : {},
        body: patient?.patientRegistrationId
          ? formData // Send as JSON if patientRegistrationId is present
          : dataToSend, // Send as FormData otherwise
      });

      if (response.ok) {
        const result = await response.json();
        alert(
          patient?.patientRegistrationId
            ? `Patient updated successfully with ID: ${result.uhid}`
            : `Patient registered successfully with ID: ${result.uhid}`
        );
        setResult(result);
        showPopup([
          { url: "/adt/ipadmission", text: "Ip Admission" },
          { url: "/appointment/doctorappointment", text: "Appointment" },
        ]);
      } else {
        console.error(
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
  return (
    <div className="patient-registration-component-container">
      <div className="patient-registration-component-form">
        <h4 className="patient-registration-h4">Patient Details</h4>
        <div className="patient-registration-component-form-row">
          <div className="patient-registration-component-form-group-1row">
            <div className="patient-registration-component-form-group">
              <label>ER NO:</label>

              <input
                type="text"
                name="erNo"
                value={formData.erNo}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <label>MR NO:</label>
              <input
                type="text"
                name="mrNo"
                value={result?.uhid || patient?.uhid}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <label>
                Name Initial:
                <span className="patient-registration-component-span">*</span>
              </label>
              <select
                name="salutation"
                className="patient-registration-component-form-group"
                defaultValue=""
                value={formData.salutation}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Initial
                </option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
              </select>
            </div>
          </div>

          <div className="patient-registration-component-form-group-1row">
            <div className="patient-registration-component-form-group">
              <label>
                F Name:
                <span className="patient-registration-component-span">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <label>M Name:</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <label>L Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="patient-registration-component-form-group-1row">
            <div className="patient-registration-component-form-group">
              <label>
                Birth Date:
                <span className="patient-registration-component-span">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <label>
                Age:
                <span className="patient-registration-component-span">*</span>
              </label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <label>
                Age Unit:
                <span className="patient-registration-component-span">*</span>
              </label>
              <select
                name="ageUnit"
                value={formData.ageUnit}
                onChange={handleChange}
              >
                <option value="Years">Years</option>
              </select>
            </div>
          </div>
          <div className="patient-registration-component-form-group-1row">
            <div className="patient-registration-component-form-group">
              <label>
                Gender:
                <span className="patient-registration-component-span">*</span>
              </label>
              <select
                name="gender"
                className="patient-registration-component-form-group"
                defaultValue=""
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="patient-registration-component-form-group">
              <label>
                Marital Status:
                <span className="patient-registration-component-span">*</span>
              </label>
              <select
                name="maritalStatus"
                className="patient-registration-component-select"
                defaultValue=""
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Marital Status
                </option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>
            <div className="patient-registration-component-form-group"></div>
          </div>

          <div className="patient-registration-component-form-group-1row">
            <div className="patient-registration-component-form-group">
              <label>
                Relation:
                <span className="patient-registration-component-span">*</span>
              </label>
              <select
                name="relation"
                className="patient-registration-component-form-group"
                defaultValue=""
                value={formData.relation}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Relation
                </option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Spouse">Spouse</option>
                <option value="Sibling">Sibling</option>
              </select>
            </div>
            <div className="patient-registration-component-form-group">
              <label>
                Relative Name:
                <span className="patient-registration-component-span">*</span>
              </label>
              <input
                type="text"
                name="relationName"
                value={formData.relationName}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <label>Religion:</label>
              <select
                name="religion"
                className="patient-registration-component-form-group"
                defaultValue=""
                value={formData.religion}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Religion
                </option>
                <option value="Christianity">Christianity</option>
                <option value="Islam">Islam</option>
                <option value="Hinduism">Hinduism</option>
                <option value="Buddhism">Buddhism</option>
                <option value="Judaism">Judaism</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="patient-registration-component-form-group-1row">
            <div className="patient-registration-component-form-group">
              <label>Caste:</label>
              <input
                type="text"
                name="cast"
                value={formData.cast}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <label>Occupation:</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
              />
            </div>
            <div className="patient-registration-component-form-group">
              <label>Qualification:</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="patient-registration-component-form-row">
        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <label>Mother Name:</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
            ></input>
          </div>
          <div className="patient-registration-component-form-group">
            <label>
              Address:
              <span className="patient-registration-component-span">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            ></input>
          </div>
          <div className="patient-registration-component-form-group">
            <label>
              Area
              <span className="patient-registration-component-span">*</span>
            </label>
            <input
              type="text"
              name="areaVillage"
              value={formData.areaVillage}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <label>
              District:
              <span className="patient-registration-component-span">*</span>
            </label>
            <div className="patient-registration-sub-input">
              <input
                type="text"
                name="cityDistrict"
                value={formData.cityDistrict}
                onChange={handleChange}
              />
              <IoSearch
                style={{ fontSize: "18px", cursor: "pointer" }}
                onClick={() => setActivePopup("cityDistrict")}
              />
            </div>
          </div>
          <div className="patient-registration-component-form-group">
            <label>
              State:
              <span className="patient-registration-component-span">*</span>
            </label>
            <div className="patient-registration-sub-input">
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              <IoSearch
                style={{ fontSize: "18px", cursor: "pointer" }}
                onClick={() => setActivePopup("state")}
              />
            </div>
          </div>

          <div className="patient-registration-component-form-group">
            <label>
              Country:
              <span className="patient-registration-component-span">*</span>
            </label>
            <div className="patient-registration-sub-input">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
              <IoSearch
                style={{ fontSize: "18px", cursor: "pointer" }}
                onClick={() => setActivePopup("country")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="patient-registration-component-form-row">
        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <label>
              Pin Code:
              <span className="patient-registration-component-span">*</span>
            </label>
            <div className="patient-registration-sub-input">
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="patient-registration-component-form-group">
            <label>
              Mobile No:
              <span className="patient-registration-component-span">*</span>
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <label>Tel No(Off):</label>
            <input
              type="tel"
              name="telNumberOff"
              value={formData.telNumberOff}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <label>
              Email Id:
              <span className="patient-registration-component-span">*</span>
            </label>
            <input
              type="text"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <label>Height:</label>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <label>Weight:</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <label>
              Source Of Registration:
              <span className="patient-registration-component-span">*</span>
            </label>
            <select
              name="sourceOfRegistration"
              className="patient-registration-component-form-group"
              defaultValue=""
              value={formData.sourceOfRegistration}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Source
              </option>
              <option value="Walk-in">Walk-in</option>
              <option value="Online">Online</option>
              <option value="Referral">Referral</option>
              <option value="Campaign">Campaign</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="patient-registration-component-form-group">
            <label>Remarks:</label>
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <label>Previous Hospital:</label>
            <input
              type="text"
              name="previousHospital"
              value={formData.previousHospital}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <label>Referred Contact No:</label>
            <input
              type="text"
              name="referredContactNumber"
              value={formData.referredContactNumber}
              onChange={handleChange}
            ></input>
          </div>
          <div className="patient-registration-component-form-group">
            <label>Nationality:</label>
            <div className="patient-registration-sub-input">
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              ></input>
              <IoSearch
                style={{
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setActivePopup("nationality")}
              />
            </div>
          </div>

          <div className="patient-registration-component-form-group">
            <label>Income Range:</label>
            <select
              name="incomeRange"
              className="patient-registration-component-form-group"
              defaultValue=""
              value={formData.incomeRange}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Income Range
              </option>
              <option value="Below 10,000">Below 10,000</option>
              <option value="10,000 - 50,000">10,000 - 50,000</option>
              <option value="50,001 - 1,00,000">50,001 - 1,00,000</option>
              <option value="Above 1,00,000">Above 1,00,000</option>
            </select>
          </div>
        </div>
        <h4 className="patient-registration-h4">
          Local Contact Person In Emergency
        </h4>
        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <label>Contact Name Initial:</label>
            <select
              name="contactNameInitial"
              className="patient-registration-component-form-group"
              defaultValue=""
              value={formData.contactNameInitial}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Initial
              </option>
              <option value="Mrs">Mrs</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Baby of">Baby of</option>
              <option value="Miss">Miss</option>
              <option value="Master">Master</option>
              <option value="Dr.">Dr.</option>
              <option value="Baby">Baby</option>
              <option value="Empty">Empty</option>
            </select>
          </div>
          <div className="patient-registration-component-form-group">
            <label>Contact Name:</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <label>Contact Relation:</label>
            <input
              type="text"
              name="contactRelation"
              value={formData.contactRelation}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <label>Tel No(Res):</label>
            <input
              type="text"
              name="telNumberRes1"
              value={formData.telNumberRes1}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <label>Tel No(Off):</label>
            <input
              type="text"
              name="telNumberOff1"
              value={formData.telNumberOff1}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <label>Contact Mobile No:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <h4 className="patient-registration-h4">Payment Details</h4>
        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <label>GSTIN:</label>
            <input
              type="text"
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <label>PAN:</label>
            <input
              type="text"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <label>
              Adhar Card Number:
              <span className="patient-registration-component-span">*</span>
            </label>
            <input
              type="text"
              name="adharCardId"
              value={formData.adharCardId}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <label>
              Sponsor Type:
              <span className="patient-registration-component-span">*</span>
            </label>
            <select
              name="sponserType"
              className="patient-registration-component-form-group"
              value={formData.sponserType}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Sponsor Type
              </option>
              <option value="Company">Company</option>
              <option value="Individual">Individual</option>
              <option value="Government">Government</option>
              <option value="NGO">NGO</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="patient-registration-component-form-group">
            <label>Eligibility:</label>
            <select
              name="eligibility"
              className="patient-registration-component-form-group"
              value={formData.eligibility}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Eligibility
              </option>
              <option value="Eligible">Eligible</option>
              <option value="Not Eligible">Not Eligible</option>
              <option value="Pending">Pending</option>
              <option value="Exempted">Exempted</option>
            </select>
          </div>
          <div className="patient-registration-component-form-group">
            <label>Organisation Name:</label>
            <select
              name="organisationMaster"
              className="patient-registration-component-form-group"
              value={organisationId}
              onChange={(e) => setOrganisationId(e.target.value)}
            >
              <option value="">Select Organisation Name</option>
              {organisation.length &&
                organisation.map((item, index) => (
                  <option value={item.masterId}>{item.name}</option>
                ))}
            </select>
          </div>
        </div>
        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <label>Policy Number:</label>
            <input
              type="text"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <label>Policy Start Date:</label>
            <input
              type="date"
              name="policyStartDate"
              value={formData.policyStartDate}
              onChange={handleChange}
            />
          </div>
          <div className="patient-registration-component-form-group">
            <label>Policy End Date:</label>
            <input
              type="date"
              name="policyEndDate"
              value={formData.policyEndDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="patient-registration-component-form-group-1row">
          <div className="patient-registration-component-form-group">
            <label htmlFor="fileUpload">File Attachment</label>
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileChange}
              className="patient-registration-component-file-input"
            />
          </div>
          <div className="patient-registration-component-form-group"></div>
          <div className="patient-registration-component-form-group"></div>
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
                    <input
                      type="text"
                      value={doctor.doctorName}
                      name="doctorName"
                      placeholder="Doctor Name"
                      className="patient-registration-component"
                    />
                    <IoSearch
                      style={{
                        fontSize: "18px",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => setActivePopup("doctor")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={doctor.residenceAddress}
                      placeholder="Address"
                      className="patient-registration-component"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={doctor.mobileNumber}
                      className="patient-registration-component"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={doctor.emailId}
                      className="patient-registration-component"
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
