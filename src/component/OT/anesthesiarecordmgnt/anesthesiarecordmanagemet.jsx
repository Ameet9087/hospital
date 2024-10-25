import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './anesthesiarecordmgnt.css'; // Ensure you have this file for styling
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';


const AnesthesiaRecordManagement = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  
  const [records, setRecords] = useState([]); // To store anesthesia records
  const [newRecord, setNewRecord] = useState({
    surgeryId: '',
    surgenId: '',
    anesthesiaType: '',
    anesthesiaStartTime: '',
    anesthesiaEndTime: '',
    notes: ''
  });
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [isEditing, setIsEditing] = useState(false); // Flag to check if editing
  const [editRecordId, setEditRecordId] = useState(null); // ID of the record being edited

  // Fetch records when component mounts
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8051/api/anesthesia-records'); // Update this URL as needed
        setRecords(response.data); // Assuming response.data is an array of records
      } catch (error) {
        console.error('Error fetching anesthesia records:', error);
      }
    };

    fetchRecords(); // Call the fetch function
  }, []); // Empty dependency array to run only on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({
      ...newRecord,
      [name]: value
    });
  };

  const handleAddRecord = async () => {
    try {
      // Add new record via POST request
      const response = await axios.post('http://localhost:8051/api/anesthesia-records', newRecord);
      setRecords([...records, response.data]); // Append new record to the state
    } catch (error) {
      console.error('Error adding record:', error);
    }

    // Reset form fields
    resetForm();
  };

  const handleEditRecord = (record) => {
    setNewRecord(record); // Set the newRecord state to the record being edited
    setIsEditing(true); // Set editing flag to true
    setEditRecordId(record.anesthesiaRecordId); // Set the ID of the record being edited
    setShowModal(true); // Show the modal
  };

  const handleUpdateRecord = async () => {
    try {
      // Update the existing record via PUT request
      const response = await axios.put(`http://localhost:8051/api/anesthesia-records/${editRecordId}`, newRecord);
      setRecords(records.map(record => (record.anesthesiaRecordId === editRecordId ? response.data : record))); // Update the record in the state
    } catch (error) {
      console.error('Error updating record:', error);
    }

    // Reset form fields
    resetForm();
  };

  const resetForm = () => {
    setNewRecord({
      surgeryId: '',
      surgenId: '',
      anesthesiaType: '',
      anesthesiaStartTime: '',
      anesthesiaEndTime: '',
      notes: ''
    });
    setShowModal(false); // Close the modal after saving
    setIsEditing(false); // Reset editing flag
    setEditRecordId(null); // Reset editing record ID
  };

  return (
    <div className="anesthesia-record-container">
      {/* Add Record Button */}
      <button onClick={() => { resetForm(); setShowModal(true); }} className="add-record-btnathensia">
        Add Anesthesia Record
      </button>

      {/* Modal for Adding/Editing Anesthesia Records */}
      {showModal && (
        <div className="anestesiaredmgnt-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="anesthesia-record-modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>{isEditing ? 'Edit Anesthesia Record' : 'Add Anesthesia Record'}</h4>
            <div className='athensiarecordmodalform'>
              <label>Surgery ID</label>
              <input
                type="number"
                name="surgeryId"
                value={newRecord.surgeryId}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='athensiarecordmodalform'>
              <label>Surgeon ID</label>
              <input
                type="number"
                name="surgenId"
                value={newRecord.surgenId}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='athensiarecordmodalform'>
              <label>Anesthesia Type</label>
              <input
                type="text"
                name="anesthesiaType"
                value={newRecord.anesthesiaType}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='athensiarecordmodalform'>
              <label>Anesthesia Start Time</label>
              <input
                type="time"
                name="anesthesiaStartTime"
                value={newRecord.anesthesiaStartTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='athensiarecordmodalform'>
              <label>Anesthesia End Time</label>
              <input
                type="time"
                name="anesthesiaEndTime"
                value={newRecord.anesthesiaEndTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='athensiarecordmodalform'>
              <label>Notes</label>
              <textarea
                name="notes"
                value={newRecord.notes}
                onChange={handleInputChange}
                rows="4"
              />
            </div>

            <div>
              <button onClick={isEditing ? handleUpdateRecord : handleAddRecord} className="athensiarecordmodalform-save-btn">
                {isEditing ? 'Update Record' : 'Save Record'}
              </button>
              <button onClick={resetForm} className="athensiarecordmodalform-cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table for displaying the added anesthesia records */}
      {records.length > 0 && (
        <div className="records-table">
          <h3>Added Anesthesia Records</h3>
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Surgery ID",
                  "Surgeon ID",
                  "Anesthesia Type",
                  "Anesthesia Start Time",
                  "Anesthesia End Time",
                  "Notes",
                  "Actions" // New Actions column
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
              {records.map((record) => (
                <tr key={record.anesthesiaRecordId}>
                  <td>{record.surgeryId}</td>
                  <td>{record.surgenId}</td>
                  <td>{record.anesthesiaType}</td>
                  <td>{record.anesthesiaStartTime}</td>
                  <td>{record.anesthesiaEndTime}</td>
                  <td>{record.notes}</td>
                  <td>
                    <button onClick={() => handleEditRecord(record)} className="edit-btn">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AnesthesiaRecordManagement;
