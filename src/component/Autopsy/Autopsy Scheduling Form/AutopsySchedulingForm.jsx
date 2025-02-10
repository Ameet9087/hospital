import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faDownload,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import CustomModal from "../../../CustomModel/CustomModal";
import PopupTable from "../../Admission/PopupTable";
import "./AutopsySchedulingform.css";
import { API_BASE_URL } from "../../api/api";

const FloatingInput = ({ label, type = "text", ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div
      className={`autopsy-scheduling-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <label className="autopsy-scheduling-floating-label">{label} :</label>
      <input
        type={type}
        className="autopsy-scheduling-floating-input"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};

const AutopsySchedulingForm = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [autopsyschedules, setautopsyschedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [popupData, setPopupData] = useState([]);
  const [loadingPopup, setLoadingPopup] = useState(false);

  const [autopsyRequests, setAutopsyRequests] = useState([]);
  const [selectedautopsyRequests, setselectedautopsyRequests] = useState([]);
  const [doctors, setDoctors] = useState([]);
  
  const [selecteddoctor, setselecteddoctor] = useState([]);
  const [selectedtechnitian, setselectedtechnitian] = useState([]);

  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState({
    autopsyRequests: false,
    doctors: false,
    technicians: false,
  });
  const [errors, setErrors] = useState({
    autopsyRequests: null,
    doctors: null,
    technicians: null,
  });

  const [formData, setFormData] = useState({
    autopsyRequestId: "",
    ipNo: "",
    patientId: "",
    patientName: "",
    scheduledDate: "",
    scheduledTime: "",
    pathologistAvailiblity: "",
    technicianAvailiblity: "",
    confirmNotificationSent: false,
  });
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // Fetch Autopsy Requests API
  // Fetch APIs
  const fetchAutopsyRequests = async () => {
    setLoading((prev) => ({ ...prev, autopsyRequests: true }));
    try {
      const response = await axios.get(`${API_BASE_URL}/autopsy-requests`);
      setAutopsyRequests(response.data);
      console.log(response.data);
      setLoading((prev) => ({ ...prev, autopsyRequests: false }));
    } catch (error) {
      console.error("Error fetching autopsy requests:", error);
      setErrors((prev) => ({
        ...prev,
        autopsyRequests: "Failed to fetch autopsy requests",
      }));

      setLoading((prev) => ({ ...prev, autopsyRequests: false }));
    }
  };

  const fetchDoctors = async () => {
    setLoading((prev) => ({ ...prev, doctors: true }));
    try {
      const response = await axios.get(`${API_BASE_URL}/doctors`);
      setDoctors(response.data);
      setLoading((prev) => ({ ...prev, doctors: false }));
    } catch (error) {
      console.error("Error fetching doctors:", error);

      setLoading((prev) => ({ ...prev, doctors: false }));
    }
  };

  const fetchTechnicians = async () => {
    setLoading((prev) => ({ ...prev, technicians: true }));
    try {
      const response = await axios.get(`${API_BASE_URL}/doctors`);
      setTechnicians(response.data);
      setLoading((prev) => ({ ...prev, technicians: false }));
    } catch (error) {
      console.error("Error fetching technicians:", error);

      setLoading((prev) => ({ ...prev, technicians: false }));
    }
  };

  const fetchAutopsySchedules = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/autopsy-schedule`);
      const schedules = response.data.map((item) => ({
        id: item.autopsySchedulingFormId, // Use a unique ID for each item
        autopsyRequestId: item.autopsyRequestFormDto.autopsyreqId,
        patientName: `${item.autopsyRequestFormDto.firstName} ${item.autopsyRequestFormDto.middleName} ${item.autopsyRequestFormDto.lastName}`,
        scheduledDate: item.scheduledDate,
        scheduledTime: item.scheduledTime,
        pathologist: item.pathologistDto.doctorName,
        technician: item.technicianDto.doctorName,
        confirmNotificationSent: item.confirmNotificationSent,
      }));
      setautopsyschedules(schedules);
    } catch (error) {
      console.error("Error fetching autopsy schedules:", error);
      setLoading((prev) => ({ ...prev, technicians: false }));
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAutopsySchedules();
    fetchAutopsyRequests();
    fetchDoctors();
    fetchTechnicians();
  }, []);

  // Use Effect to fetch data on component mount
  useEffect(() => {
    fetchAutopsyRequests();
  }, []);

  useEffect(() => {
    fetchAutopsyRequests();
  }, []);

  // Fetch Popup Data
  const fetchPopupData = async () => {
    setLoadingPopup(true);
    try {
      let response;
      switch (activePopup) {
        case "Uhid":
          response = await axios.get(`${API_BASE_URL}/autopsy-requests`);
          
          // Extract relevant patient details
          const formattedData = response.data.map((item) => ({
            autopsyreqId: item.autopsyreqId,
            firstName: item.outPatientDTO?.patient?.firstName || "N/A",
            lastName: item.outPatientDTO?.patient?.lastName || "N/A",
          }));

          setPopupData(formattedData);
          break;

        case "Doctor":
          response = await axios.get(`${API_BASE_URL}/doctors/specialization/1`);
          setPopupData(response.data);
          break;

        case "Technician":
          response = await axios.get(`${API_BASE_URL}/doctors/specialization/1`);
          setPopupData(response.data);
          break;

        default:
          return;
      }

      // console.log("Popup Data:", response.data);
    } catch (error) {
      console.error(`Error fetching ${activePopup} data:`, error);
    } finally {
      setLoadingPopup(false);
    }
};

  const handleFormSubmit = async (e) => {
    const payload = {
      scheduledDate: formData.scheduledDate,
      scheduledTime: formData.scheduledTime,
      pathologistDto: { doctorId: selecteddoctor.doctorId },
      pathologistAvailiblity: formData.pathologistAvailiblity,
      technicianDto: { doctorId: selectedtechnitian.doctorId },
      technicianAvailiblity: formData.technicianAvailiblity,
      confirmNotificationSent: formData.confirmNotificationSent ? "Yes" : "No", // Convert boolean to "Yes"/"No"
      autopsyRequestFormDto: {
        autopsyreqId: selectedautopsyRequests.autopsyreqId,
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/autopsy-schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save the data");
      }

      alert("Data saved successfully!");
      // Reset the form data
      setFormData({
        scheduledDate: "",
        scheduledTime: "",
        pathologistAvailiblity: "Available",
        technicianAvailiblity: "Available",
        confirmNotificationSent: false,
        autopsyRequestFormDto: { autopsyreqId: null },
      });
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Error submitting the form.");
    }
  };

  useEffect(() => {
    if (activePopup) {
      fetchPopupData();
    }
  }, [activePopup]);

  // Form Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      autopsyRequestId: "",
      ipNo: "",
      patientId: "",
      patientName: "",
      scheduledDate: "",
      scheduledTime: "",
      pathologist: "",
      technician: "",
      confirmNotificationSent: false,
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setActivePopup(null);
    setFormData({
      autopsyRequestId: "",
      ipNo: "",
      patientId: "",
      patientName: "",
      scheduledDate: "",
      scheduledTime: "",
      pathologist: "",
      technician: "",
      confirmNotificationSent: false,
    });
  };

  const printList = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;

      // Create an iframe element
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      // Append the iframe to the body
      document.body.appendChild(iframe);

      // Write the table content into the iframe's document
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
        <head>
          
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            button, .admit-actions, th:nth-child(10), td:nth-child(10) {
              display: none; /* Hide action buttons and Action column */
            }
          </style>
        </head>
        <body>
          <table>
            ${printContents}
          </table>
        </body>
        </html>
      `);
      doc.close();

      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      document.body.removeChild(iframe);
    }
  };
  const handleSelect = (selectedData) => {
    switch (activePopup) {
      case "Uhid":
        setselectedautopsyRequests(selectedData);
        setFormData((prev) => ({
          ...prev,
          ipNo: selectedData.ipNo || "",
          patientId: selectedData.patientId || "",
          patientName: selectedData.patientName || "",
        }));
        break;
      case "Doctor":
        setselecteddoctor(selectedData);
        setFormData((prev) => ({
          ...prev,
          pathologist: selectedData.name || "",
        }));
        break;
      case "Technician":
        setselectedtechnitian(selectedData);
        setFormData((prev) => ({
          ...prev,
          technician: selectedData.name || "",
        }));
        break;
      default:
        break;
    }
    setActivePopup(null);
  };

  const getPopupColumns = () => {
    switch (activePopup) {
      case "Uhid":
        return ["autopsyreqId", "firstName", "lastName"];
      case "Doctor":
        return ["doctorId", "doctorName"];
      case "Technician":
        return ["doctorId", "doctorName"];
      default:
        return [];
    }
  };

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "autopsySchedulingForm"); // Appends worksheet to workbook
    XLSX.writeFile(wb, "autopsySchedulingForm.xlsx"); // Downloads the Excel file
  };
  const safeToLowerCase = (value) => {
    return value && typeof value === "string" ? value.toLowerCase() : "";
  };

  // Filter the autopsyschedules based on search query
  const filteredSchedules = autopsyschedules.filter((item) => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    return (
      safeToLowerCase(item.patientName).includes(lowerSearchQuery) ||
      safeToLowerCase(item.autopsyRequestId).includes(lowerSearchQuery) ||
      safeToLowerCase(item.scheduledTime).includes(lowerSearchQuery) ||
      safeToLowerCase(item.scheduledDate).includes(lowerSearchQuery) ||
      safeToLowerCase(item.pathologist).includes(lowerSearchQuery) ||
      safeToLowerCase(item.technician).includes(lowerSearchQuery) ||
      safeToLowerCase(item.confirmNotificationSent).includes(lowerSearchQuery)
    );
  });
  return (
    <div className="autopsy-scheduling-container">
      <button onClick={handleAdd} className="autopsy-scheduling-add-btn">
        + Schedule Autopsy
      </button>

      <div className="autopsy-scheduling-search-N-result">
        <div className="autopsy-scheduling-search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* <FontAwesomeIcon icon={faSearch} /> */}
        </div>
        <div className="autopsy-scheduling-results-info">
          <button
            className="autopsy-scheduling-print-button"
            onClick={handleExport}
          >
            <FontAwesomeIcon icon={faDownload} /> Export
          </button>
          <button
            className="autopsy-scheduling-print-button"
            onClick={printList}
          >
            <FontAwesomeIcon icon={faPrint} /> Print
          </button>
        </div>
      </div>

      <table className="autopsy-scheduling-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "SrNo",
              "Autopsy Request ID",
              "Patient Name",
              "Scheduled Date",
              "Scheduled Time",
              "Pathologist",
              "Technician",
              "Confirm Notification Sent",
              // "Actions",
            ].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className="resizable-th"
              >
                <div className="header-content">
                  <span>{header}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading.autopsyRequests ? (
            <tr>
              <td colSpan={9} className="text-center">
                Loading...
              </td>
            </tr>
          ) : filteredSchedules.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center">
                No scheduled autopsies found.
              </td>
            </tr>
          ) : (
            filteredSchedules.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.autopsyRequestId}</td>
                <td>{item.patientName}</td>
                <td>{item.scheduledDate}</td>
                <td>{item.scheduledTime}</td>
                <td>{item.pathologist}</td>
                <td>{item.technician}</td>
                <td>{item.confirmNotificationSent === "Yes" ? "Yes" : "No"}</td>
                {/* <td className="autopsy-scheduling-action">
                  <button
                    className="autopsy-scheduling-status-btn"
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
        className="autopsy-scheduling-custom"
      >
        <div className="autopsy-scheduling-container">
          <div className="autopsy-scheduling-section">
            <div className="autopsy-scheduling-form-header">
              Autopsy Scheduling
            </div>
            <div className="autopsy-scheduling-grid">
              <div className="autopsy-scheduling-search-field">
                <FloatingInput
                  label="Autopsy Request ID"
                  name="autopsyRequestId"
                  value={selectedautopsyRequests?.autopsyreqId}
                  onChange={(e) => {
                    handleChange(e);
                    // Auto-populate patient details
                    const selectedRequest = autopsyRequests.find(
                      (request) => request.autopsyRequestId === e.target.value
                    );
                    if (selectedRequest) {
                      setFormData((prev) => ({
                        ...prev,
                        patientName: selectedRequest.patientName || "",
                        patientId: selectedRequest.patientId || "",
                      }));
                    }
                  }}
                  list="autopsy-requests-list"
                  required
                />
                <datalist id="autopsy-requests-list">
                  {autopsyRequests.map((request) => (
                    <option key={request.id} value={request.autopsyRequestId}>
                      {request.patientName}
                    </option>
                  ))}
                </datalist>
                <FontAwesomeIcon
                  className="autopsy-scheduling-search-icon"
                  icon={faSearch}
                  onClick={() => {
                    setActivePopup("Uhid");
                    setShowModal(true); // Ensure modal is opened
                  }}
                />
                {loading.autopsyRequests && <span>Loading requests...</span>}
                {errors.autopsyRequests && (
                  <span className="error">{errors.autopsyRequests}</span>
                )}
              </div>
              <FloatingInput
                label="Patient Name"
                name="patientName"
                value={`${selectedautopsyRequests.firstName || ""} ${selectedautopsyRequests.lastName || ""
                  }`}
                onChange={handleChange}
                required
              />
              <FloatingInput
                label="Scheduled Date"
                name="scheduledDate"
                type="date"
                value={formData.scheduledDate}
                onChange={handleChange}
                required
              />
              <FloatingInput
                label="Scheduled Time"
                name="scheduledTime"
                type="time"
                value={formData.scheduledTime}
                onChange={handleChange}
                required
              />
              <div className="autopsy-scheduling-search-field">
                <FloatingInput
                  label="Assigned Pathologist"
                  name="pathologist"
                  value={selecteddoctor?.doctorName}
                  onChange={(e) => {
                    handleChange(e);
                    // Optional: Add any specific logic for pathologist selection
                  }}
                  list="doctors-list"
                  required
                />
                <datalist id="doctors-list">
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.department}
                    </option>
                  ))}
                </datalist>
                <FontAwesomeIcon
                  className="autopsy-scheduling-search-icon"
                  icon={faSearch}
                  onClick={() => setActivePopup("Doctor")}
                />
                {errors.doctors && (
                  <span className="error">{errors.doctors}</span>
                )}
              </div>
              <div className="autopsy-scheduling-availability">
                <label value={formData.pathologistAvailiblity}>
                  Pathologist Availability:
                </label>
                <input
                  type="datetime-local"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pathologistAvailiblity: e.target.value, // Update pathologist availability
                    })
                  }
                />
              </div>
              <div className="autopsy-scheduling-search-field">
                <FloatingInput
                  label="Assigned Technician"
                  name="technician"
                  value={selectedtechnitian?.doctorName}
                  onChange={(e) => {
                    handleChange(e);
                    // Optional: Add any specific logic for technician selection
                  }}
                  list="technicians-list"
                  required
                />
                <datalist id="technicians-list">
                  {technicians.map((technician) => (
                    <option key={technician.id} value={technician.name}>
                      {technician.department}
                    </option>
                  ))}
                </datalist>
                <FontAwesomeIcon
                  className="autopsy-scheduling-search-icon"
                  icon={faSearch}
                  onClick={() => setActivePopup("Technician")}
                />
              </div>
              <div className="autopsy-scheduling-availability">
                <label value={formData.technicianAvailiblity}>
                  Technician Availability:
                </label>
                <input
                  type="datetime-local"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      technicianAvailiblity: e.target.value, // Update technician availability
                    })
                  }
                />
              </div>
              <div className="AccidentReportForm-form-group">
                <label
                  value={formData.confirmNotificationSent}
                  onChange={handleChange}
                >
                  Confirm Notification Send :
                </label>
                <div className="AccidentReportForm-radio-button">
                  <label>
                    <input
                      type="radio"
                      name="confirmNotificationSent"
                      value="true"
                      checked={formData.confirmNotificationSent === true}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          confirmNotificationSent: true,
                        }))
                      }
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="confirmNotificationSent"
                      value="false"
                      checked={formData.confirmNotificationSent === false}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          confirmNotificationSent: false,
                        }))
                      }
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="autopsy-scheduling-button">
            <button
              onClick={handleFormSubmit}
              className="autopsy-scheduling-submit-btn"
            >
              Submit
            </button>
          </div>
        </div>

        {activePopup && (
          <PopupTable
            columns={getPopupColumns()}
            data={popupData}
            onSelect={handleSelect}
            onClose={() => setActivePopup(null)}
            loading={loadingPopup}
          />
        )}
      </CustomModal>
    </div>
  );
};

export default AutopsySchedulingForm;
