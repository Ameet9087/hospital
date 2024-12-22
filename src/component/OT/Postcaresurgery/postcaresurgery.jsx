import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './postsurgerycare.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import CustomModal from '../../../CustomModel/CustomModal';
import useCustomAlert from '../../../alerts/useCustomAlert';

const PostSurgeryCare = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [formData, setFormData] = useState({
    postCareId: '',
    surgeryId: '',
    patientId: '',
    postCareNotes: '',
    followUpDate: '',
    complicationsObserved: ''
  });
  const [careRecords, setCareRecords] = useState([]);
  const [openStickerPopup, setOpenStickerPopup] = useState(false); 
  const [editMode, setEditMode] = useState(false);
  const { success, error, CustomAlerts } = useCustomAlert();

  useEffect(() => {
    const fetchCareRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8051/api/post-surgery-care');
        const data = response.data;
        
        // Check if data exists in the response
        if (data && data.length > 0) {
          setCareRecords(data);
          success('Records fetched successfully!');
        } else {
          error('No post-surgery care records found.');
        }
      } catch (err) {
        console.error('Error fetching care records:', err);
        error('Error fetching post-surgery care records');
      }
    };
    fetchCareRecords();
  }, [success, error]);
  

  const handleAddOrEditRecord = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editMode) {
        response = await axios.put(
          `http://localhost:8051/api/post-surgery-care/${formData.postCareId}`,
          formData
        );
  
        if (response.status === 200 && response.data) {
          setCareRecords((prevRecords) =>
            prevRecords.map((record) =>
              record.postCareId === formData.postCareId ? response.data : record
            )
          );
          success('Record updated successfully!');
        } else {
          error('Failed to update the record.');
        }
      } else {
        response = await axios.post('http://localhost:8051/api/post-surgery-care', formData);
  
        if (response.status === 201 && response.data) {
          setCareRecords((prevRecords) => [...prevRecords, response.data]);
          success('Record added successfully!');
        } else {
          error('Failed to add the record.');
        }
      }
      resetForm();
      setOpenStickerPopup(false);
    } catch (err) {
      console.error(`Error ${editMode ? 'updating' : 'adding'} record:`, err);
      error(`Error ${editMode ? 'updating' : 'adding'} post-surgery care record`);
    }
  };
  

  const handleEditRecord = (record) => {
    setFormData(record);
    setEditMode(true);
    setOpenStickerPopup(true);
  };

  const handleAddRecord = () => {
    resetForm();
    setEditMode(false);
    setOpenStickerPopup(true);
  };

  const resetForm = () => {
    setFormData({
      postCareId: '',
      surgeryId: '',
      patientId: '',
      postCareNotes: '',
      followUpDate: '',
      complicationsObserved: ''
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    const filterData = () => {
      let updatedRecords = careRecords;
      if (fromDate && toDate) {
        updatedRecords = updatedRecords.filter((record) =>
          record.followUpDate >= fromDate && record.followUpDate <= toDate
        );
      }
      if (searchTerm) {
        updatedRecords = updatedRecords.filter((record) =>
          record.patientId.toString().includes(searchTerm) ||
          record.patientName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setFilteredRecords(updatedRecords);
    };
    filterData();
  }, [searchTerm, fromDate, toDate, careRecords]);


  const handleSearch = (e) => setSearchTerm(e.target.value);

  return (
    <div className="postsurgerycare-container">
       <div className="postsurgerycare-filter-container">
        <div className="postsurgerycare-filter-date-range">
          <label>From: </label>
          <input
            className="postsurgerycare-filter-input"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label> To: </label>
          <input
            className="postsurgerycare-filter-input"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <input
          type="text"
          placeholder="Search by Patient Name/Patient ID"
          className="postsurgerycare-filter-search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => window.print()} className="postsurgerycare-filter-button">
          Print
        </button>
      </div>
      <button className="postsurgerycare-add-btn" onClick={handleAddRecord}>
        Add Post-Surgery Care Record
      </button>

      <div className="postsurgerycare-records-table">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Post Care ID",
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
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {careRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.postCareId}</td>
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

      {openStickerPopup && (
        <CustomModal isOpen={openStickerPopup} onClose={() => setOpenStickerPopup(false)}>
          <div className="postsurgerycare-modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>{editMode ? 'Edit Post-Surgery Care Record' : 'Add New Post-Surgery Care Record'}</h4>
            <form onSubmit={handleAddOrEditRecord}>
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
                <button type="submit" className="postsurgerymodalbtn">
                  {editMode ? 'Save Changes' : 'Add Record'}
                </button>
                <button
                  type="button"
                  className="postsurgerymodalbtn"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenStickerPopup(false);
                  }}
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
