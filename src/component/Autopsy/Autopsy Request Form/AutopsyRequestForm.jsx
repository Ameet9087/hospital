import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faDownload,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import CustomModal from "../../../CustomModel/CustomModal";
import PopupTable from "../../Admission/PopupTable";
import { API_BASE_URL } from "../../api/api";
import "./Autopsyrequestform.css";

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
      className={`autopsy-request-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <input
        type={type}
        className="autopsy-request-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="autopsy-request-floating-label">{label}</label>
    </div>
  );
};

const FloatingSelect = ({ label, options = [], ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  return (
    <div
      className={`AutopsyExecution-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <select
        className="AutopsyExecution-floating-select"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== "");
        }}
        onChange={(e) => setHasValue(e.target.value !== "")}
        {...props}
      >
        <option value="">{ }</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="AutopsyExecution-floating-label">{label}</label>
    </div>
  );
};

const AutopsyRequestForm = () => {
  const [autopsyrequests, setautopsyrequests] = useState([]);
  const [uhidData, setUhidData] = useState([]);
  const [selecteduhid, setselecteduhid] = useState([]);
  const [doctorData, setDoctorData] = useState([]);
  const [selecteddoctorData, setselectedDoctorData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    type: "",
    uhid: "",
    ipNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    contactNum: "",
    dateOfDeath: "",
    timeOfDeath: "",
    causeOfDeath: "",
    suspiciousDeath: "",
    reasonForAutopsy: "",
    authorizedBy: "",
    authorizationDate: "",
    attendingPhysician: "",
    attendingPhysicianId: null,
    findings: "",
    conclusion: "",
  });

  useEffect(() => {
    const fetchUhidData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/out-patient`);
        setUhidData(response.data);
      } catch (error) {
        console.error("Error fetching UHID data:", error);
      }
    };

    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/doctors/specialization/1`
        );
        setDoctorData(response.data);
      } catch (error) {
        console.error("Error fetching Doctor data:", error);
      }
    };
    fetchUhidData();
    fetchDoctorData();
  }, []);

  const fetchAutopsyRequests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/autopsy-requests`);
      const mappedData = response.data.map((item) => ({
        uhid: item.ipAdmissionDTO?.patient?.patient?.uhid || "N/A", // Add default values if any field is missing
        firstName: item.firstName || "",
        lastName: item.lastName || "",
        contactNum: item.contactNum || "N/A",
        dateOfDeath: item.dateOfDeath || "N/A",
        timeOfDeath: item.timeOfDeath || "N/A",
        causeOfDeath: item.causeOfDeath || "N/A",
        id: item.autopsyreqId,
      }));
      setautopsyrequests(mappedData);
    } catch (error) {
      console.error("Error fetching autopsy requests:", error);
    }
  };

  useEffect(() => {
    fetchAutopsyRequests();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the payload for the autopsy request
      const autopsyRequestPayload = {
        dateOfDeath: formData.dateOfDeath,
        timeOfDeath: formData.timeOfDeath,
        causeOfDeath: formData.causeOfDeath,
        suspiciousDeath: formData.suspiciousDeath === "yes",
        reasonForAutopsy: formData.reasonForAutopsy,
        authorizedBy: formData.authorizedBy,
        authorizationDate: formData.authorizationDate,
        assignedDoctorDTO: {
          doctorId: selecteddoctorData?.doctorId,
        },
        outPatientDTO: {
          outPatientId: selecteduhid?.realobj?.outPatientId,
        },
      };

      // Convert the payload to a JSON string
      const autopsyRequestJSON = JSON.stringify(autopsyRequestPayload);

      // Create a FormData object to include JSON and optional file
      const formDataToSend = new FormData();
      formDataToSend.append("autopsyRequest", autopsyRequestJSON);

      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      // Make the POST request to the backend
      const response = await axios.post(
        `${API_BASE_URL}/autopsy-requests`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Autopsy request response:", response.data);
      alert("Autopsy request saved successfully");

      // Reset form data
      setFormData({
        type: "",
        uhid: "",
        outPatientId: null,
        ipNo: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        contactNum: "",
        dateOfDeath: "",
        timeOfDeath: "",
        causeOfDeath: "",
        suspiciousDeath: "",
        reasonForAutopsy: "",
        authorizedBy: "",
        authorizationDate: "",
        attendingPhysician: "",
        attendingPhysicianId: null,
      });

      handleClose();
    } catch (error) {
      console.error("Error submitting autopsy request:", error);

      // Detailed error handling
      if (error.response) {
        alert(
          `Failed to save autopsy request: ${error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        alert(
          "No response received from the server. Please check your network connection."
        );
      } else {
        alert("Error preparing the request: " + error.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFormData({
      type: newType,
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      contactNum: "",
      dateOfDeath: "",
      timeOfDeath: "",
    });
  };

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSelect = (data) => {
    if (activePopup === "Uhid") {
      setselecteduhid(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        uhid: data?.uhid,
        ipNo: data?.inPatientId,
        firstName: data?.firstName,
        middleName: data?.middleName || "",
        lastName: data?.lastName,
        contactNum: data?.contactNumber || "",
        dateOfBirth: data?.patient?.dateOfBirth
          ? new Date(data.patient.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: data?.gender,
        address: data?.address,
      }));
    } else if (activePopup === "AttendingPhysician") {
      setselectedDoctorData(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        attendingPhysician: data?.doctorName,
        attendingPhysicianId: data?.doctorId,
      }));
    }
    setActivePopup(null);
  };

  const getPopupData = () => {
    if (activePopup === "Uhid") {
      const popupData = {
        columns: [
          "uhid",
          "firstName",
          "middleName",
          "lastName",
          "gender",
          "contactNumber",
          "address",
          "dateOfBirth",
        ],
        data: Array.isArray(uhidData)
          ? uhidData.map((user) => ({
            uhid: user?.patient?.uhid,
            firstName: user?.patient?.firstName,
            middleName: user?.patient?.middleName,
            lastName: user?.patient?.lastName,
            gender: user?.patient?.gender,
            contactNumber: user?.patient?.contactNumber,
            address: user?.patient?.address,
            dateOfBirth: user?.patient?.dateOfBirth
              ? new Date(user.patient.dateOfBirth).toLocaleDateString()
              : "",
            realobj: user,
          }))
          : [],
      };
      return popupData;
    } else if (activePopup === "AttendingPhysician") {
      const popupData = {
        columns: ["doctorId", "doctorName"],
        data: Array.isArray(doctorData)
          ? doctorData.map((doctor) => ({
            doctorId: doctor?.doctorId,
            doctorName: doctor?.doctorName,
            specialization: doctor?.specialization,
            department: doctor?.department,
            realobj: doctor,
          }))
          : [],
      };
      return popupData;
    }
    return { columns: [], data: [] };
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Autopsy Requests");
    XLSX.writeFile(workbook, "Autopsy_Requests.xlsx");
  };

  const { columns, data: popupData } = getPopupData();

  return (
    <div className="autopsy-request-container">
      <button onClick={handleAdd} className="autopsy-request-add-btn">
        + Add Patient
      </button>
      <div className="autopsy-request-search-N-result">
        <div className="autopsy-request-search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* <FontAwesomeIcon icon={faSearch} /> */}
        </div>
        <div className="autopsy-request-results-info">
          <button
            className="autopsy-request-print-button"
            onClick={handleExport}
          >
            <FontAwesomeIcon icon={faDownload} /> Export
          </button>
          <button
            className="autopsy-request-print-button"
            onClick={() => window.print()}
          >
            <FontAwesomeIcon icon={faPrint} /> Print
          </button>
        </div>
      </div>
      <table className="autopsy-request-table">
        <thead>
          <tr>
            {[
              "UHID",
              "Patient Name",
              "Mobile No",
              "Date of Death",
              "Time of Death",
              "Cause of Death",
              // "Actions",
            ].map((header, index) => (
              <th key={index}>
                <div className="header-content">
                  <span>{header}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {autopsyrequests.length === 0 ? (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                No patients found.
              </td>
            </tr>
          ) : (
            autopsyrequests.map((item) => (
              <tr key={item.id}>
                <td>{item.uhid}</td>
                <td>{`${item.firstName} ${item.lastName}`}</td>
                <td>{item.contactNum}</td>
                <td>{item.dateOfDeath}</td>
                <td>{item.timeOfDeath}</td>
                <td>{item.causeOfDeath}</td>
                {/* <td className="autopsy-request-action">
                  <button
                    className="autopsy-request-status-btn"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <CustomModal
        isOpen={showModal}
        onClose={handleClose}
        className="autopsy-request-custom"
      >
        <div className="autopsy-request-container">
          <div className="autopsy-request-section">
            <div className="autopsy-request-form-header">Autopsy Request</div>
            <div className="autopsy-request-grid">
              <FloatingSelect
                label="Type"
                options={[
                  { value: "oldPatient", label: "Old Patient" },
                  { value: "newPatient", label: "New Patient" },
                ]}
                value={formData.type}
                onChange={handleTypeChange}
              />

              {formData.type === "oldPatient" ? (
                <>
                  <div className="autopsy-request-search-field">
                    <FloatingInput
                      label="UHID"
                      name="uhid"
                      value={formData.uhid}
                      onChange={handleChange}
                    />
                    <FontAwesomeIcon
                      className="autopsy-request-search-icon"
                      icon={faSearch}
                      onClick={() => setActivePopup("Uhid")}
                    />
                  </div>

                  <FloatingInput
                    label="First Name"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Middle Name"
                    name="middleName"
                    value={formData.middleName || ""}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="text"
                    value={formData.dateOfBirth || ""}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Gender"
                    name="gender"
                    type="text"
                    value={formData.gender || ""}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Contact Number"
                    name="contactNum"
                    value={formData.contactNum}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Date of Death"
                    name="dateOfDeath"
                    type="date"
                    value={formData.dateOfDeath}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Time of Death"
                    name="timeOfDeath"
                    type="time"
                    value={formData.timeOfDeath}
                    onChange={handleChange}
                  />
                </>
              ) : formData.type === "newPatient" ? (
                <>
                  <FloatingInput
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Middle Name"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                  <FloatingSelect
                    label="Gender"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                    ]}
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                  <FloatingInput
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Contact Number"
                    name="contactNum"
                    value={formData.contactNum}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Date of Death"
                    name="dateOfDeath"
                    type="date"
                    value={formData.dateOfDeath}
                    onChange={handleChange}
                  />
                  <FloatingInput
                    label="Time of Death"
                    name="timeOfDeath"
                    type="time"
                    value={formData.timeOfDeath}
                    onChange={handleChange}
                  />
                </>
              ) : null}

              <div className="AutopsyExecution-search-field">
                <FloatingInput
                  label="Attending Physician"
                  name="attendingPhysician"
                  value={formData.attendingPhysician}
                  onChange={handleChange}
                />
                <button
                  className="AutopsyExecution-search-icon"
                  onClick={() => setActivePopup("AttendingPhysician")}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      fill="currentColor"
                      d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                    />
                  </svg>
                </button>
              </div>

              <div className="AccidentReportForm-form-group">
                <label>Suspicious Death:</label>
                <div className="AccidentReportForm-radio-button">
                  <label>
                    <input type="radio" name="suspiciousDeath" value="yes" />
                    Yes
                  </label>
                  <label>
                    <input type="radio" name="suspiciousDeath" value="no" />
                    No
                  </label>
                </div>
              </div>

              <FloatingInput
                label="Cause of Death"
                name="causeOfDeath"
                value={formData.causeOfDeath}
                onChange={handleChange}
              />

              <FloatingSelect
                label="Reason For Autopsy"
                options={[
                  { value: "unKnown Cause", label: "Legal/Forensic Reasons" },
                  { value: "family Request", label: "Family Request" },
                  { value: "other", label: "Other" },
                ]}
              />

              <FloatingInput
                label="Authorized By"
                name="authorizedBy"
                value={formData.authorizedBy}
                onChange={handleChange}
              />

              <FloatingInput
                label="Authorization Date"
                name="authorizationDate"
                type="date"
                value={formData.authorizationDate}
                onChange={handleChange}
              />
            </div>

            <div className="final-bill-section">
              <div className="final-bill-header">Attach File</div>
              <div className="final-bill-grid">
                <div className="final-bill-shed-section">
                  <label className="finalized-label">File Name</label>
                  <input className="finalized-attach" type="text" />
                  <input className="finalized-file-input" type="file" />
                  <button className="finalized-bill-sh-save-btn">Upload</button>
                </div>
              </div>
            </div>

            <div className="autopsy-request-button">
              <button
                onClick={handleFormSubmit}
                className="autopsy-request-submit-btn"
              >
                Submit
              </button>
            </div>
          </div>

          {activePopup && (
            <PopupTable
              columns={columns}
              data={popupData}
              onSelect={handleSelect}
              onClose={() => setActivePopup(null)}
            />
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default AutopsyRequestForm;
