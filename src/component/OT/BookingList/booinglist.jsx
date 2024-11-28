// neha-OT-BookingList-14-9-24
import React, { useState, useEffect, useRef } from 'react';
import './bookinglist.css'
import { FaSearch, FaRedo, FaPlus } from 'react-icons/fa';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../../api/api';

function BookingList() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [otDate, setOtDate] = useState('');
  const [otTime, setOtTime] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [procedure, setProcedure] = useState('');
  const [useAnaesthesia, setUseAnaesthesia] = useState(false);
  const [machineName, setMachineName] = useState('');
  const [status, setStatus] = useState('Booked'); // Default status
  const [otPatientList, setOtPatientList] = useState([]);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);

   useEffect(() => {
    // Fetch existing bookings when the component mounts
    const fetchPatientList = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/operation/all-operation-data`);
        setOtPatientList(response.data); // Store data from the API in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPatientList();
  }, []); 

   const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine OT date and time into one field
    const otDateTime = `${otDate}T${otTime}:00`;

    // Prepare the payload for the API
    const payload = {
      otDateTime,
      diagnosis,
      otProcedure: procedure,
      useAnesthesia: useAnaesthesia,
      machineName,
      status
    };

    try {
      // Send POST request to add a new booking
      const response = await axios.post(`${API_BASE_URL}/operation/save-operation-details`, payload);
      console.log('Operation booked successfully:', response.data);

      // Reset the form after submission
      setPatientName('');
      setOtDate('');
      setOtTime('');
      setDiagnosis('');
      setProcedure('');
      setUseAnaesthesia(false);
      setMachineName('');
      setStatus('Booked');

      // Fetch updated patient list after adding a new booking
      const updatedPatientList = await axios.get(`${API_BASE_URL}/operation/fetch-all`);
      setOtPatientList(updatedPatientList.data);
    } catch (error) {
      console.error('Error booking operation:', error);
    }
  };

  // Handlers for form inputs
  const handlePatientNameChange = (e) => setPatientName(e.target.value);
  const handleOtDateChange = (e) => setOtDate(e.target.value);
  const handleOtTimeChange = (e) => setOtTime(e.target.value);
  const handleDiagnosisChange = (e) => setDiagnosis(e.target.value);
  const handleProcedureChange = (e) => setProcedure(e.target.value);
  const handleUseAnaesthesiaChange = (e) => setUseAnaesthesia(e.target.checked);
  const handleMachineNameChange = (e) => setMachineName(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

  return (
    <div className="booking-list-container">
      <div className="booking-list-booking-header">
        <button className="booking-list-btn-btn-success" onClick={() => setIsPopupOpen(true)}>
          <FaPlus /> New OT Booking
        </button>
      </div>

      <div className="booking-list-patient-search-dropdown">
         <input type="text" placeholder="Search" value={patientName} onChange={handlePatientNameChange} />
        
      </div>

      <div className='table-container'>
      <table className="booking-list-ot-patient-table" ref={tableRef}>
        <thead>
          <tr>
          {[
  "Sr.No",
  "Patient Name",
  "Age/Sex",
  "OT Date & Time",
  "Diagnosis",
  "Procedure",
  "Anesthesia",
  "Machine",
  "Status",
  "Actions"
].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="rd-resizable-th"
                >
                  <div className="rd-header-content">
                    <span>{header}</span>
                    <div
                      className="rd-resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
            <tbody>  {otPatientList.map((booking, index) => (
            <tr key={index}>
              <td>{patient.hospitalNo}</td>
              <td>{patient.patient.name}</td>
              <td>{patient.patient.ageSex}</td>
              <td>{moment(booking.otDateTime).format('YYYY-MM-DD HH:mm')}</td>
              <td>{booking.diagnosis}</td>
                <td>{booking.otProcedure}</td>
                <td>{booking.useAnesthesia ? 'Yes' : 'No'}</td>
                <td>{booking.machineName}</td>
                <td>{booking.status}</td>
              <td>
                <Button onClick={() => console.log(`Print receipt ${patient.id}`)}>
                  Print
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {isPopupOpen && (
        <div className="booking-list-modal-overlay">
          <div className="booking-list-modal-content">
            <button className="booking-list-modal-close" onClick={() => setIsPopupOpen(false)}>
              &times;
            </button>
            <form onSubmit={handleSubmit}>
              <div className="booking-list-patient-search-dropdown">
                <label>Patient Name:</label>
                  <input type="text" value={patientName} onChange={handlePatientNameChange} />
              </div>
              <div>
                <label>OT Date:</label>
                <input type="date" value={otDate} onChange={handleOtDateChange} />
              </div>
              <div>
                <label>OT Time:</label>
                  <input type="time" value={otTime} onChange={handleOtTimeChange} />
              </div>
              <div>
                <label>Diagnosis:</label>
                <input type="text" value={diagnosis} onChange={handleDiagnosisChange} />
              </div>
              <div>
                <label>Procedure:</label>
                 <input type="text" value={procedure} onChange={handleProcedureChange} />
              </div>
              <div>
                <label>Use Anaesthesia:</label>
               <input type="checkbox" checked={useAnaesthesia} onChange={handleUseAnaesthesiaChange} />
              </div>
              <div>
                <label>Machine Name:</label>
                <input type="text" value={machineName} onChange={handleMachineNameChange} />
              </div>
              <div>
                <label>Status:</label>
                <select value={status} onChange={handleStatusChange}>
                  <option value="Booked">Booked</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Concluded">Concluded</option>
                </select>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingList;
