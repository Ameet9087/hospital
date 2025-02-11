import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./postsurgerycare.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../CustomModel/CustomModal";
import useCustomAlert from "../../../alerts/useCustomAlert";

import { API_BASE_URL } from "../../api/api";

const PostSurgeryCare = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [formData, setFormData] = useState({
    postSurgeryCareId: "",
    surgeryEventId: "",
    operationName: "",
    firstName: "",
    lastName: "",
    postCareNotes: "",
    followUpDate: "",
    complicationsObserved: "",
  });
  const [careRecords, setCareRecords] = useState([]);
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { success, error, CustomAlerts } = useCustomAlert();
  const [surgeryEvents, setSurgeryEvents] = useState([]);

  // Fetch Surgery Events
  useEffect(() => {
    const fetchSurgeryEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/surgery-events`);
        setSurgeryEvents(response.data);
      } catch (err) {
        console.error("Error fetching surgery events:", err);
        error("Failed to fetch surgery events.");
      }
    };
    fetchSurgeryEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "surgeryEventId") {
      const selectedEvent = surgeryEvents.find(
        (event) => event.surgeryEventId.toString() === value
      );
      if (selectedEvent) {
        setFormData((prevData) => ({
          ...prevData,
          surgeryEventId: value,
          operationName: selectedEvent.operationMasterDTO?.operationName || "",
          firstName:
            selectedEvent.operationBookingDTO?.ipAdmissionDTO?.patient?.patient
              ?.firstName || "",
          lastName:
            selectedEvent.operationBookingDTO?.ipAdmissionDTO?.patient?.patient
              ?.lastName || "",
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddOrEditRecord = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editMode) {
        response = await axios.put(
          `${API_BASE_URL}/post-surgery-care/${formData.postSurgeryCareId}`,
          {
            postCareNotes: formData.postCareNotes,
            followUpDate: formData.followUpDate,
            complicationsObserved: formData.complicationsObserved,
            surgeryEventDTO: {
              surgeryEventId: parseInt(formData.surgeryEventId, 10),
            },
          }
        );
        if (response) {
          setCareRecords((prevRecords) =>
            prevRecords.map((record) =>
              record.postSurgeryCareId === formData.postSurgeryCareId
                ? { ...record, ...response.data }
                : record
            )
          );
          success("Record updated successfully!");
        }
      } else {
        response = await axios.post(`${API_BASE_URL}/post-surgery-care`, {
          postCareNotes: formData.postCareNotes,
          followUpDate: formData.followUpDate,
          complicationsObserved: formData.complicationsObserved,
          surgeryEventDTO: {
            surgeryEventId: parseInt(formData.surgeryEventId),
          },
        });

        if (response) {
          setCareRecords((prevRecords) => [...prevRecords, response.data]);
          success("Record added successfully!");
        }
      }
      resetForm();
      setOpenStickerPopup(false);
    } catch (err) {
      console.error(`Error ${editMode ? "updating" : "adding"} record:`, err);
      error(`Failed to ${editMode ? "update" : "add"} the record.`);
    }
  };

  // Fetch Post-Surgery Care Records
  useEffect(() => {
    const fetchPostSurgeryCareRecords = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/post-surgery-care`);
        setCareRecords(response.data);
      } catch (err) {
        console.error("Error fetching post-surgery care records:", err);
        error("Failed to fetch post-surgery care records.");
      }
    };
    fetchPostSurgeryCareRecords();
  }, []);

  const handleEditRecord = (record) => {
    setFormData({
      postSurgeryCareId: record.postSurgeryCareId,
      surgeryEventId: record.surgeryEventDTO?.surgeryEventId || "",
      operationName:
        record.surgeryEventDTO?.operationMasterDTO?.operationName || "N/A",
      firstName:
        record.surgeryEventDTO?.operationBookingDTO?.ipAdmissionDTO?.patient
          ?.patient?.firstName || "N/A",
      lastName:
        record.surgeryEventDTO?.operationBookingDTO?.ipAdmissionDTO?.patient
          ?.patient?.lastName || "N/A",
      postCareNotes: record.postCareNotes || "",
      followUpDate: record.followUpDate || "",
      complicationsObserved: record.complicationsObserved || "",
    });
    setEditMode(true);
    setOpenStickerPopup(true);
  };

  const resetForm = () => {
    setFormData({
      postSurgeryCareId: "",
      surgeryEventId: "",
      operationName: "",
      firstName: "",
      lastName: "",
      postCareNotes: "",
      followUpDate: "",
      complicationsObserved: "",
    });
    setEditMode(false);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
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
  return (
    <div className="postsurgerycare-container">
      <div className="postsurgerycare-filter-container">
        <input
          type="text"
          placeholder="Search by Patient Name/Patient ID"
          className="postsurgerycare-filter-search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
       
      </div>
      
      <button
        className="postsurgerycare-add-btn"
        onClick={() => {
          resetForm();
          setOpenStickerPopup(true);
        }}
      >
        Add Post-Surgery Care Record
      </button>
      <button
          onClick={printList}
          className="postsurgerycare-filter-button"
        >
          Print
        </button>
      <div className="postsurgerycare-records-table">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Surgery ID",
                "Operation Name",
                "First Name",
                "Last Name",
                "Post-Care Notes",
                "Follow-Up Date",
                "Complications Observed",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {careRecords.map((record, index) => {
              return (
                <tr key={index}>
                  <td>{record.surgeryEventDTO?.surgeryEventId || "N/A"}</td>
                  <td>
                    {record.surgeryEventDTO?.operationMasterDTO
                      ?.operationName || "N/A"}
                  </td>
                  <td>
                    {record.surgeryEventDTO?.operationBookingDTO?.ipAdmissionDTO
                      ?.patient?.patient?.firstName || "N/A"}
                  </td>
                  <td>
                    {record.surgeryEventDTO?.operationBookingDTO?.ipAdmissionDTO
                      ?.patient?.patient?.lastName || "N/A"}
                  </td>
                  <td>{record.postCareNotes || "N/A"}</td>
                  <td>{record.followUpDate || "N/A"}</td>
                  <td>{record.complicationsObserved || "N/A"}</td>
                  <td>
                    <button
                      className="postsurgerycare-edit-btn"
                      onClick={() => handleEditRecord(record)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {openStickerPopup && (
        <CustomModal
          isOpen={openStickerPopup}
          onClose={() => setOpenStickerPopup(false)}
        >
          <div
            className="postsurgerycare-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>
              {editMode
                ? "Edit Post-Surgery Care Record"
                : "Add New Post-Surgery Care Record"}
            </h4>
            <form onSubmit={handleAddOrEditRecord}>
              <div className="postsurgerycare-form-group">
                <label>Surgery ID</label>
                <select
                  name="surgeryEventId"
                  value={formData.surgeryEventId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Surgery ID</option>
                  {surgeryEvents.map((event) => (
                    <option
                      key={event.surgeryEventId}
                      value={event.surgeryEventId}
                    >
                      {event.surgeryEventId}
                    </option>
                  ))}
                </select>
              </div>

              <div className="postsurgerycare-form-group">
                <label>Operation Name</label>
                <input
                  type="text"
                  name="operationName"
                  value={formData.operationName}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>

              <div className="postsurgerycare-form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>

              <div className="postsurgerycare-form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>

              <div className="postsurgerycare-form-group">
                <label>Follow-Up Date</label>
                <input
                  type="date"
                  name="followUpDate"
                  value={formData.followUpDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="postsurgerycare-form-group">
                <label>Post-Care Notes</label>
                <textarea
                  name="postCareNotes"
                  value={formData.postCareNotes}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </div>

              <div className="postsurgerycare-form-group">
                <label>Complications Observed</label>
                <textarea
                  name="complicationsObserved"
                  value={formData.complicationsObserved}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>

              <div>
                <button type="submit" className="postsurgerymodalbtn">
                  {editMode ? "Save Changes" : "Add Record"}
                </button>
                <button
                  type="button"
                  className="postsurgerymodalbtn"
                  onClick={() => setOpenStickerPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </CustomModal>
      )}
      <CustomAlerts />
    </div>
  );
};

export default PostSurgeryCare;
