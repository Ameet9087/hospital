import React, { useState, useEffect } from 'react';
import './bedTranferNote.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PopupTable from '../PopUpTableBedTransfer/PopupTable';
import axios from 'axios';


const BedTransferNote = () => {
  const [formData, setFormData] = useState({
    remarks: "",
    bedDTO: { bedId: null },
    patientDTO: { patientId: null },
    ipAdmissionDTO: { ipid: null },
    roomDTO: { roomId: null },
    roomTypeDTO: { roomTypeId: null },
    payTypeDTO: { payTypeId: null },
    floorDTO: { floorId: null },
    currentRoomType: "",
    currentBedNo: "",
    unit: null
  });

  const [bedTransferNotes, setBedTransferNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [showPatientPopup, setShowPatientPopup] = useState(false);
  const [showBedPopup, setShowBedPopup] = useState(false);
  const [showRoomTypePopup, setShowRoomTypePopup] = useState(false);
  const [showRoomNoPopup, setShowRoomNoPopup] = useState(false);
  const [showFloorNoPopup, setShowFloorNoPopup] = useState(false);

  const patientColumns = ['patientId', 'patientName', 'age', 'gender'];
  const patientData = [
    { patientId: 1, patientName: 'John Doe', age: 45, gender: 'Male' },
    { patientId: 2, patientName: 'Jane Smith', age: 35, gender: 'Female' },
  ];

  const bedColumns = ['bedNo', 'roomType', 'availability'];
  const bedData = [
    { bedId: 1, bedNo: 1, roomType: 'General', availability: 'Available' },
    { bedId: 2, bedNo: 2, roomType: 'Private', availability: 'Occupied' },
  ];

  const roomTypeColumns = ['roomTypeId', 'roomType', 'description', 'rate'];
  const roomTypeData = [
    { roomTypeId: 1, roomType: 'General', description: 'Standard Room', rate: '$100/day' },
    { roomTypeId: 2, roomType: 'Private', description: 'Deluxe Room', rate: '$250/day' },
  ];

  const roomNoColumns = ['roomId', 'roomNo', 'roomType', 'floorNo'];
  const roomNoData = [
    { roomId: 1, roomNo: 1, roomType: 'General', floorNo: '1' },
    { roomId: 2, roomNo: 2, roomType: 'Private', floorNo: '2' },
  ];

  const floorNoColumns = ['floorId', 'floorNo', 'description'];
  const floorNoData = [
    { floorId: 1, floorNo: 1, description: 'Ground Floor' },
    { floorId: 2, floorNo: 2, description: 'First Floor' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      const updatedState = { ...prevState };
      
      switch(name) {
        case 'bedId':
          updatedState.bedDTO = { bedId: value ? parseInt(value) : null };
          break;
        case 'patientId':
          updatedState.patientDTO = { patientId: value ? parseInt(value) : null };
          break;
        case 'ipid':
          updatedState.ipAdmissionDTO = { ipid: value ? parseInt(value) : null };
          break;
        case 'roomId':
          updatedState.roomDTO = { roomId: value ? parseInt(value) : null };
          break;
        case 'roomTypeId':
          updatedState.roomTypeDTO = { roomTypeId: value ? parseInt(value) : null };
          break;
        case 'payTypeId':
          updatedState.payTypeDTO = { payTypeId: value ? parseInt(value) : null };
          break;
        case 'floorId':
          updatedState.floorDTO = { floorId: value ? parseInt(value) : null };
          break;
        default:
          updatedState[name] = value;
      }
      
      return updatedState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    
    try {
      const requestBody = {
        remarks: formData.remarks,
        bedDTO: formData.bedDTO,
        patientDTO: formData.patientDTO,
        ipAdmissionDTO: formData.ipAdmissionDTO,
        roomDTO: formData.roomDTO,
        roomTypeDTO: formData.roomTypeDTO,
        payTypeDTO: formData.payTypeDTO,
        floorDTO: formData.floorDTO,
        currentRoomType: formData.currentRoomType,
        currentBedNo: formData.currentBedNo,
        unit: formData.unit
      };

      console.log(requestBody);
      

      const response = await axios.post(
        "http://192.168.0.103:4069/api/bedTransferNote/bedTransfer", 
        requestBody
      );

      console.log("Form submitted successfully:", response.data);
      
      setFormData({
        remarks: "",
        bedDTO: { bedId: null },
        patientDTO: { patientId: null },
        ipAdmissionDTO: { ipid: null },
        roomDTO: { roomId: null },
        roomTypeDTO: { roomTypeId: null },
        payTypeDTO: { payTypeId: null },
        floorDTO: { floorId: null },
        currentRoomType: "",
        currentBedNo: "",
        unit: null
      });
      
      setError(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError('Failed to save bed transfer note: ' + 
        (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopupSelect = (popupType, selectedRow) => {
    switch(popupType) {
      case 'patient':
        setFormData(prev => ({
          ...prev,
          patientDTO: { patientId: selectedRow.patientId },
          patientName: selectedRow.patientName,
          age: selectedRow.age,
          gender: selectedRow.gender
        }));
        break;
      case 'bed':
        setFormData(prev => ({
          ...prev,
          bedDTO: { bedId: selectedRow.bedId },
          currentBedNo: selectedRow.bedNo
        }));
        break;
      case 'roomType':
        setFormData(prev => ({
          ...prev,
          roomTypeDTO: { roomTypeId: selectedRow.roomTypeId },
          currentRoomType: selectedRow.roomType
        }));
        break;
      case 'roomNo':
        setFormData(prev => ({
          ...prev,
          roomDTO: { roomId: selectedRow.roomId }
        }));
        break;
      case 'floorNo':
        setFormData(prev => ({
          ...prev,
          floorDTO: { floorId: selectedRow.floorId }
        }));
        break;
      default:
        break;
    }
  };

  const handleButtonClick = (action) => {
    switch(action) {
      case 'Save':
        handleSubmit(new Event('submit'));
        break;
      case 'Clear':
        setFormData({
          remarks: "",
          bedDTO: { bedId: null },
          patientDTO: { patientId: null },
          ipAdmissionDTO: { ipid: null },
          roomDTO: { roomId: null },
          roomTypeDTO: { roomTypeId: null },
          payTypeDTO: { payTypeId: null },
          floorDTO: { floorId: null },
          currentRoomType: "",
          currentBedNo: "",
          unit: null
        });
        break;
      case 'Search':
        break;
      default:
        alert(`${action} button clicked!`);
    }
  };

  return (
    <div className="BedTransferNote-container">
      <div className="BedTransferNote-header">
        <span>Bed Transfer Note</span>
      </div>

      {error && <div className="error-message">{error}</div>}
      {isLoading && <div className="loading-spinner">Loading...</div>}

      <form onSubmit={handleSubmit}>
        <div className="BedTransferNote-content">
          <div className="BedTransferNote-Section">
            <div className="BedTransferNote-Form">
              <label>Transfer No: </label>
              <input        
                type="number"
                name="transferNo"   
                value={formData.transferNo || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className='BedTransferNote-Section-header'>
              Patient Details
            </div>
            <div className="BedTransferNote-Form">
              <label>IP No: </label>
              <input
                type="number"
                name="ipid"
                value={formData.ipAdmissionDTO.ipid || ''}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon
                className='iPChangeRoom-magnifier-btn'
                icon={faSearch}
                onClick={() => setShowPatientPopup(true)}
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Patient Name: </label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Age: </label>
              <input
                type="number"
                name="age"
                value={formData.age || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Gender: </label>
              <select
                name="gender"
                value={formData.gender || ''}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="BedTransferNote-Form">
              <label>Current Room Type: </label>
              <input
                type="text"
                name="currentRoomType"
                value={formData.currentRoomType || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Current Bed No: </label>
              <input
                type="text"
                name="currentBedNo"
                value={formData.currentBedNo || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="BedTransferNote-Section">
            <div className='BedTransferNote-Section-header'>Transfer Details</div>
            <div className="BedTransferNote-Form">
              <label>Pay Type: </label>
              <select
                name="payTypeId"
                value={formData.payTypeDTO.payTypeId || ''}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="1">Cash</option>
                <option value="2">Insurance</option>
              </select>
            </div>
            <div className="BedTransferNote-Form">
              <label>Bed No: </label>
              <input
                type="number"
                name="bedId"
                value={formData.bedDTO.bedId || ''}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon
                className='iPChangeRoom-magnifier-btn'
                icon={faSearch}
                onClick={() => setShowBedPopup(true)}
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Room Type: </label>
              <input
                type="number"
                name="roomTypeId"
                value={formData.roomTypeDTO.roomTypeId || ''}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon
                className='iPChangeRoom-magnifier-btn'
                icon={faSearch}
                onClick={() => setShowRoomTypePopup(true)}
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Room No: </label>
              <input
                type="number"
                name="roomId"
                value={formData.roomDTO.roomId || ''}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon
                className='iPChangeRoom-magnifier-btn'
                icon={faSearch}
                onClick={() => setShowRoomNoPopup(true)}
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Floor No: </label>
              <input
                type="number"
                name="floorId"
                value={formData.floorDTO.floorId || ''}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon
                className='iPChangeRoom-magnifier-btn'
                icon={faSearch}
                onClick={() => setShowFloorNoPopup(true)}
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Unit: </label>
              <input
                type="number"
                name="unit"
                value={formData.unit || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="BedTransferNote-Section">
            <div className="BedTransferNote-Form">
              <label>Remark: </label>
              <textarea
                name="remarks"
                value={formData.remarks || ''}
                onChange={handleChange}
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>
      </form>

      <div className="BedTransferNote-navbar">
        <aside className="BedTransferNote-navbar-btns">
          <button onClick={() => handleButtonClick('Save')}>Save</button>
          <button onClick={() => handleButtonClick('Delete')}>Delete</button>
          <button onClick={() => handleButtonClick('Clear')}>Clear</button>
          <button onClick={() => handleButtonClick('Close')}>Close</button>
          {/* <button onClick={() => handleButtonClick('Search')}>Search</button>
          <button onClick={() => handleButtonClick('Tracking')}>Tracking</button>
          <button onClick={() => handleButtonClick('Print')}>Print</button>
          <button onClick={() => handleButtonClick('Error Logs')}>Error Logs</button>
          <button onClick={() => handleButtonClick('Export')}>Export</button>
          <button onClick={() => handleButtonClick('Import')}>Import</button>
          <button onClick={() => handleButtonClick('Health')}>Health</button>
          <button onClick={() => handleButtonClick('Version Comparsion')}>Version Comparsion</button>
          <button onClick={() => handleButtonClick('SDC')}>SDC</button>
                     <button onClick={() => handleButtonClick('Testing ')}>Testing </button>
           <button onClick={() => handleButtonClick('Info')}>Info</button> */}
       </aside>
      </div>

       {showPatientPopup && (
        <PopupTable 
         columns={patientColumns}
         data={patientData}
           onSelect={(row) => {
            handlePopupSelect('patient', row);
            setShowPatientPopup(false);
           }}
           onClose={() => setShowPatientPopup(false)}
        />
      )}

      {showBedPopup && (
        <PopupTable 
           columns={bedColumns}
           data={bedData}
           onSelect={(row) => {
             handlePopupSelect('bed', row);
             setShowBedPopup(false);
           }}
          onClose={() => setShowBedPopup(false)}
         />
       )}

      {showRoomTypePopup && (
        <PopupTable 
          columns={roomTypeColumns}
          data={roomTypeData}
          onSelect={(row) => {
            handlePopupSelect('roomType', row);
            setShowRoomTypePopup(false);
          }}
          onClose={() => setShowRoomTypePopup(false)}
       />
      )}

       {showRoomNoPopup && (
         <PopupTable 
          columns={roomNoColumns}
          data={roomNoData}
          onSelect={(row) => {
           handlePopupSelect('roomNo', row);
            setShowRoomNoPopup(false);
           }}
          onClose={() => setShowRoomNoPopup(false)}
         />
       )}

      {showFloorNoPopup && (
        <PopupTable 
          columns={floorNoColumns}
          data={floorNoData}
          onSelect={(row) => {
            handlePopupSelect('floorNo', row);
                        setShowFloorNoPopup(false);
         }}
           onClose={() => setShowFloorNoPopup(false)}
         />
       )}
     </div>
);
 };

 export default BedTransferNote;

