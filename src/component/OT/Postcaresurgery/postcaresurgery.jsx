import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API calls
import './postsurgerycare.css'; // Importing CSS for styling
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';


const PostSurgeryCare = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [formData, setFormData] = useState({
    postCareId: '', // Include postCareId
    surgeryId: '',
    patientId: '',
    postCareNotes: '',
    followUpDate: '',
    complicationsObserved: ''
  });

  const [careRecords, setCareRecords] = useState([]); // To store post-surgery care records
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [editMode, setEditMode] = useState(false); // To differentiate between add and edit modes

  // Fetch records when component mounts
  useEffect(() => {
    const fetchCareRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8051/api/post-surgery-care'); 
        console.log(response.data); // Debugging log
        setCareRecords(response.data); // Assuming response.data is an array of records
      } catch (error) {
        console.error('Error fetching care records:', error);
      }
    };

    fetchCareRecords(); // Call the fetch function
  }, []); // Empty dependency array to run only on mount

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle adding a new record or updating an existing one
  const handleAddOrEditRecord = async (e) => {
    e.preventDefault();

    if (editMode) {
      // Edit existing record via PUT request
      try {
        const response = await axios.put(`http://localhost:8051/api/post-surgery-care/${formData.postCareId}`, formData);
        setCareRecords(careRecords.map((record) =>
          record.postCareId === formData.postCareId ? response.data : record
        ));
      } catch (error) {
        console.error('Error updating record:', error);
      }
    } else {
      // Add new record via POST request
      try {
        const response = await axios.post('http://localhost:8051/api/post-surgery-care', formData);
        setCareRecords([...careRecords, response.data]); // Append new record to the state
      } catch (error) {
        console.error('Error adding record:', error);
      }
    }

    // Reset form and close modal
    setFormData({
      postCareId: '', // Reset postCareId
      surgeryId: '',
      patientId: '',
      postCareNotes: '',
      followUpDate: '',
      complicationsObserved: ''
    });
    setShowModal(false);
  };

  // Open modal for editing
  const handleEditRecord = (record) => {
    setFormData({
      postCareId: record.postCareId, // Set postCareId for editing
      surgeryId: record.surgeryId,
      patientId: record.patientId,
      postCareNotes: record.postCareNotes,
      followUpDate: record.followUpDate,
      complicationsObserved: record.complicationsObserved
    });
    setEditMode(true);
    setShowModal(true);
  };

  // Open modal for adding
  const handleAddRecord = () => {
    setEditMode(false);
    setFormData({
      postCareId: '', // Reset postCareId
      surgeryId: '',
      patientId: '',
      postCareNotes: '',
      followUpDate: '',
      complicationsObserved: ''
    });
    setShowModal(true);
  };

  return (
    <div className="postsurgerycare-container">
      <h4>Post-Surgery Care Management</h4>
      <button className="postsurgerycare-add-btn" onClick={handleAddRecord}>
        Add Post-Surgery Care Record
      </button>

      {/* Table for displaying the added care records */}
      {careRecords.length > 0 && (
        <div className="postsurgerycare-records-table">
          <h4>Added Post-Surgery Care Records</h4>
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Post Care ID", // Add Post Care ID in header
                  "Surgery ID",
                  "Patient ID",
                  "Post-Care Notes",
                  "Follow-Up Date",
                  "Complications Observed",
                  "Actions"
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
              {careRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.postCareId}</td> {/* Display postCareId */}
                  <td>{record.surgeryId}</td>
                  <td>{record.patientId}</td>
                  <td>{record.postCareNotes}</td>
                  <td>{record.followUpDate}</td>
                  <td>{record.complicationsObserved}</td>
                  <td>
                    <button
                      className="postsurgerycare-edit-btn"
                      onClick={() => handleEditRecord(record)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for adding/editing records */}
      {showModal && (
        <div className="postsurgerycare-modal" onClick={() => setShowModal(false)}>
          <div className="postsurgerycare-modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>{editMode ? 'Edit Post-Surgery Care Record' : 'Add New Post-Surgery Care Record'}</h4>
            <form onSubmit={handleAddOrEditRecord}>
              {/* <div className="postsurgerycare-form-group">
                <label>Post Care ID</label>
                <input
                  type="number"
                  name="postCareId"
                  value={formData.postCareId}
                  onChange={handleInputChange}
                  required
                  disabled={editMode} // Disable Post Care ID during edit
                />
              </div> */}

              <div className="postsurgerycare-form-group">
                <label>Surgery ID</label>
                <input
                  type="number"
                  name="surgeryId"
                  value={formData.surgeryId}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="postsurgerycare-form-group">
                <label>Patient ID</label>
                <input
                  type="number"
                  name="patientId"
                  value={formData.patientId}
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
                <label>Complications Observed</label>
                <textarea
                  name="complicationsObserved"
                  value={formData.complicationsObserved}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>

              <div>
                <button type="submit" className='postsurgerymodalbtn'>
                  {editMode ? 'Save Changes' : 'Add Record'}
                </button>
                <button className='postsurgerymodalbtn' onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostSurgeryCare;
