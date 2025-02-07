import React, { useState, useEffect } from "react";
import axios from "axios";
import "./anesthesiarecordmgnt.css";
import CustomModal from "../../../CustomModel/CustomModal";
import useCustomAlert from "../../../alerts/useCustomAlert";
import { API_BASE_URL } from "../../api/api";

const AnesthesiaRecordManagement = () => {
  const [records, setRecords] = useState([]);
  const [surgeryEvents, setSurgeryEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newRecord, setNewRecord] = useState({
    surgeryEventId: "",
    startTime: "",
    endTime: "",
    notes: "",
    operationName: "",
    firstName: "",
    lastName: "",
    anesthesiaType: "",
    doctorName: "",
  });

  const { success, error, CustomAlerts } = useCustomAlert();
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editRecordId, setEditRecordId] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/anesthesia-records`);
        setRecords(response.data);
        success("Records fetched successfully!");
      } catch (err) {
        console.error("Error fetching anesthesia records:", err);
        error("Error fetching anesthesia records");
      }
    };

    const fetchSurgeryEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/surgery-events`);
        setSurgeryEvents(response.data);
      } catch (err) {
        console.error("Error fetching surgery events:", err);
        error("Error fetching surgery events");
      }
    };

    fetchRecords();
    fetchSurgeryEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));

    if (name === "surgeryEventId" && value) {
      const selectedEvent = surgeryEvents.find(
        (event) => event.surgeryEventId.toString() === value
      );

      if (selectedEvent) {
        setNewRecord((prevRecord) => ({
          ...prevRecord,
          operationName:
            selectedEvent.operationMasterDTO?.operationName || "N/A",
          firstName:
            selectedEvent.operationBookingDTO?.ipAdmissionDTO?.patient?.patient
              ?.firstName || "N/A",
          lastName:
            selectedEvent.operationBookingDTO?.ipAdmissionDTO?.patient?.patient
              ?.lastName || "N/A",
          doctorName: selectedEvent.docterDTO?.doctorName || "N/A",
          anesthesiaType: selectedEvent.anesthesiaType || "N/A",
        }));
      } else {
        setNewRecord((prevRecord) => ({
          ...prevRecord,
          operationName: "",
          firstName: "",
          lastName: "",
          anesthesiaType: "",
          doctorName: "",
        }));
      }
    }
  };

  const handleAddRecord = async () => {
    try {
      const payload = {
        startTime: newRecord.startTime,
        endTime: newRecord.endTime,
        notes: newRecord.notes,
        surgeryEventDTO: {
          surgeryEventId: parseInt(newRecord.surgeryEventId, 10),
        },
      };

      const response = await axios.post(
        `${API_BASE_URL}/anesthesia-records`,
        payload
      );
      setRecords((prevRecords) => [...prevRecords, response.data]);
      success("Record added successfully!");
    } catch (err) {
      console.error("Error adding record:", err);
      error("Failed to add record");
    }

    resetForm();
  };

  const handleEditRecord = (record) => {
    setNewRecord({
      surgeryEventId: record.surgeryEventDTO?.surgeryEventId || "",
      startTime: record.startTime || "",
      endTime: record.endTime || "",
      notes: record.notes || "",
      operationName:
        record.surgeryEventDTO?.operationMasterDTO?.operationName || "N/A",
      firstName:
        record.surgeryEventDTO?.operationBookingDTO?.ipAdmissionDTO?.patient
          ?.patient?.firstName || "N/A",
      lastName:
        record.surgeryEventDTO?.operationBookingDTO?.ipAdmissionDTO?.patient
          ?.patient?.lastName || "N/A",
      anesthesiaType: record.surgeryEventDTO?.anesthesiaType || "N/A",
      doctorName: record.surgeryEventDTO?.docterDTO?.doctorName || "N/A",
    });
    setIsEditing(true);
    setEditRecordId(record.anesthesiaRecordId);
    setOpenStickerPopup(true);
  };

  const handleUpdateRecord = async () => {
    try {
      const payload = {
        startTime: newRecord.startTime,
        endTime: newRecord.endTime,
        notes: newRecord.notes,
        surgeryEventDTO: {
          surgeryEventId: parseInt(newRecord.surgeryEventId, 10),
        },
      };

      const response = await axios.put(
        `${API_BASE_URL}/anesthesia-records/${editRecordId}`,
        payload
      );

      setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.anesthesiaRecordId === editRecordId
            ? { ...record, ...response.data }
            : record
        )
      );

      success("Record updated successfully!");
    } catch (err) {
      console.error("Error updating record:", err);
      error("Failed to update record");
    }

    resetForm();
  };

  const resetForm = () => {
    setNewRecord({
      surgeryEventId: "",
      startTime: "",
      endTime: "",
      notes: "",
      operationName: "",
      firstName: "",
      lastName: "",
      anesthesiaType: "",
      doctorName: "",
    });
    setOpenStickerPopup(false);
    setIsEditing(false);
    setEditRecordId(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecords = records.filter((record) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      record.surgeryEventDTO?.surgeryEventId?.toString().includes(searchTerm) ||
      record.notes.toLowerCase().includes(searchValue) ||
      record.surgeryEventDTO?.operationMasterDTO?.operationName
        ?.toLowerCase()
        .includes(searchValue) ||
      record.surgeryEventDTO?.operationBookingDTO?.ipAdmissionDTO?.patient?.patient?.firstName
        ?.toLowerCase()
        .includes(searchValue) ||
      record.surgeryEventDTO?.operationBookingDTO?.ipAdmissionDTO?.patient?.patient?.lastName
        ?.toLowerCase()
        .includes(searchValue) ||
      record.surgeryEventDTO?.docterDTO?.doctorName
        ?.toLowerCase()
        .includes(searchValue) ||
      record.surgeryEventDTO?.anesthesiaType?.toLowerCase().includes(searchValue)
    );
  });
  


  return (
    <div className="anesthesia-record-container">
      <button
        onClick={() => {
          resetForm();
          setOpenStickerPopup(true);
        }}
        className="add-record-btn"
      >
        Add Anesthesia Record
      </button>

      <div className="ot-searchsection">
        <input
          type="text"
          placeholder="Search by Surgery ID or Notes"
          className="ot-search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="records-table">
        <table>
          <thead>
            <tr>
              <th>Surgery ID</th>
              <th>Operation Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Anesthesia Type</th>
              <th>Doctor Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.anesthesiaRecordId}>
                <td>{record.surgeryEventDTO?.surgeryEventId ?? "N/A"}</td>
                <td>
                  {record.surgeryEventDTO?.operationMasterDTO?.operationName ??
                    "N/A"}
                </td>
                <td>
                  {record.surgeryEventDTO?.operationBookingDTO?.ipAdmissionDTO
                    ?.patient?.patient?.firstName ?? "N/A"}
                </td>
                <td>
                  {record.surgeryEventDTO?.operationBookingDTO?.ipAdmissionDTO
                    ?.patient?.patient?.lastName ?? "N/A"}
                </td>
                <td>{record.surgeryEventDTO?.anesthesiaType ?? "N/A"}</td>
                <td>
                  {record.surgeryEventDTO?.docterDTO?.doctorName ?? "N/A"}
                </td>
                <td>{record.startTime ?? "N/A"}</td>
                <td>{record.endTime ?? "N/A"}</td>
                <td>{record.notes}</td>
                <td>
                  <button
                    onClick={() => handleEditRecord(record)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>{" "}
        </table>
      </div>

      {openStickerPopup && (
        <CustomModal
          isOpen={openStickerPopup}
          onClose={() => setOpenStickerPopup(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>
              {isEditing ? "Edit Anesthesia Record" : "Add Anesthesia Record"}
            </h4>

            <div className="form-group">
              <label>Surgery ID</label>
              <select
                name="surgeryEventId"
                value={newRecord.surgeryEventId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Surgery ID</option>
                {surgeryEvents.map((event) => (
                  <option
                    key={event.surgeryEventId}
                    value={event.surgeryEventId}
                  >
                    {event.surgeryEventId} - {event.bookingType || "N/A"}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Operation Name</label>
              <input
                type="text"
                name="operationName"
                value={newRecord.operationName}
                onChange={handleInputChange}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={newRecord.firstName}
                onChange={handleInputChange}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={newRecord.lastName}
                onChange={handleInputChange}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Anesthesia Type</label>
              <input
                type="text"
                name="anesthesiaType"
                value={newRecord.anesthesiaType}
                onChange={handleInputChange}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Doctor Name</label>
              <input
                type="text"
                name="doctorName"
                value={newRecord.doctorName}
                onChange={handleInputChange}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                name="startTime"
                value={newRecord.startTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                name="endTime"
                value={newRecord.endTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={newRecord.notes}
                onChange={handleInputChange}
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button
                onClick={isEditing ? handleUpdateRecord : handleAddRecord}
                className="athensiarecordmodalform-save-btn"
              >
                {isEditing ? "Update Record" : "Save Record"}
              </button>

              <button onClick={resetForm} className="athensiarecordmodalform-cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </CustomModal>
      )}

      {/* <CustomAlerts /> */}
    </div>
  );
};

export default AnesthesiaRecordManagement;
