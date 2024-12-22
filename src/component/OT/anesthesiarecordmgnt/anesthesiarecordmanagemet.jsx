import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './anesthesiarecordmgnt.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import CustomModal from '../../../CustomModel/CustomModal';
import useCustomAlert from '../../../alerts/useCustomAlert';

const AnesthesiaRecordManagement = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const { success, warning, error, CustomAlerts } = useCustomAlert();
  const [records, setRecords] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [newRecord, setNewRecord] = useState({
    surgeryId: '',
    surgenId: '',
    anesthesiaType: '',
    anesthesiaStartTime: '',
    anesthesiaEndTime: '',
    notes: ''
  });
  
  // Declare openStickerPopup state
  const [openStickerPopup, setOpenStickerPopup] = useState(false); 
  const [isEditing, setIsEditing] = useState(false);
  const [editRecordId, setEditRecordId] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8051/api/anesthesia-records');
        setRecords(response.data);
        success('Records fetched successfully!');
      } catch (error) {
        console.error('Error fetching anesthesia records:', error);
        error('Error fetching anesthesia records');
      }
    };
    fetchRecords();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({
      ...newRecord,
      [name]: value
    });
  };

  const handleAddRecord = async () => {
    try {
      const response = await axios.post('http://localhost:8051/api/anesthesia-records', newRecord);
      setRecords([...records, response.data]);
    } catch (error) {
      console.error('Error adding record:', error);
    }
    resetForm();
  };

  const handleEditRecord = (record) => {
    setNewRecord(record);
    setIsEditing(true);
    setEditRecordId(record.anesthesiaRecordId);
    setOpenStickerPopup(true); // Show modal when editing
  };

  const handleUpdateRecord = async () => {
    try {
      const response = await axios.put(`http://localhost:8051/api/anesthesia-records/${editRecordId}`, newRecord);
      setRecords(records.map(record => (record.anesthesiaRecordId === editRecordId ? response.data : record)));
    } catch (error) {
      console.error('Error updating record:', error);
    }
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
    setOpenStickerPopup(false); // Close the modal after saving
    setIsEditing(false);
    setEditRecordId(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handlePrint = () => {
    window.print();  // Trigger the print dialog
};
  return (
    <div className="anesthesia-record-container">
      <button onClick={() => { resetForm(); setOpenStickerPopup(true); }} className="add-record-btnathensia">
        Add Anesthesia Record
      </button>
      

      <div className="ot-filtersection">
  <div className="ot-datefilter">
    <div className="ot-daterange">
      <label>From: </label>
      <input
        className="ot-input"
        type="date"
        value="2024-08-05"
      />
      <label> To: </label>
      <input
        className="ot-input"
        type="date"
        value="2024-08-12"
      />
    </div>
  </div>

  
</div>
<div className="ot-searchsection">
    <input
      type="text"
      placeholder="Search by Patient Name/ID"
      className="ot-search-input"
      value={searchTerm}
      onChange={handleSearch}
    />
    <button className="ot-print-button" onClick={handlePrint}>
      Print
    </button>
  </div>


      <div className="records-table">
          
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
                  "Actions"
                ].map((header, index) => (
                  <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                    <div className="header-content">
                      <span>{header}</span>
                      <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
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

      {openStickerPopup && (
        <CustomModal
          isOpen={openStickerPopup} 
          onClose={() => setOpenStickerPopup(false)} 
        >
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
        </CustomModal>
      )}

    
      <CustomAlerts />
    </div>
  );
};

export default AnesthesiaRecordManagement;
