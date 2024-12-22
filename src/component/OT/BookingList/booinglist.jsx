import React, { useState, useEffect, useRef } from 'react';
import './bookinglist.css';
import { FaSearch, FaRedo, FaPlus } from 'react-icons/fa';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import CustomModal from '../../../CustomModel/CustomModal';
import useCustomAlert from '../../../alerts/useCustomAlert';

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
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [duration, setDuration] = useState('');
  const [department,setDepartment] = useState('');
  const [doctorList, setDoctorList] = useState([]); 
  const [employeeList, setEmployeeList] = useState([]); 


  const { success, error, CustomAlerts } = useCustomAlert();

  useEffect(() => {
    // Fetch existing bookings when the component mounts
    const fetchPatientList = async () => {
      try {
        const response = await axios.get('http://localhost:4069/api/operation-bookings');
        setOtPatientList(response.data); 
      } catch (err) {
        error('Error fetching data');
        console.error('Error fetching data:', err);
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
      status,
      doctors: selectedDoctors,
      employees: selectedEmployees,
      duration,
      department
    };

    try {
      // Send POST request to add a new booking
      const response = await axios.post('http://localhost:4069/api/operation-bookings', payload);
      
      // Show success message if the request is successful
      success('Operation booked successfully');

      // Reset the form after submission
      setPatientName('');
      setOtDate('');
      setOtTime('');
      setDiagnosis('');
      setProcedure('');
      setUseAnaesthesia(false);
      setMachineName('');
      setStatus('Booked');
      setSelectedDoctors([]);
      setSelectedEmployees([]);
      setDuration('');
      setDepartment('');

      // Fetch updated patient list after adding a new booking
      const updatedPatientList = await axios.get('http://localhost:4069/api/operation-bookings');
      setOtPatientList(updatedPatientList.data);
    } catch (err) {
      // Show error message if there's an issue with the request
      error('Error booking operation');
      console.error('Error booking operation:', err);
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
  const handleDurationChange = (e) => setDuration(e.target.value);
  const handleDepartment = (e) => setDepartment(e.target.value);

  return (
    <div className="booking-list-container">
      {/* Custom Alerts */}
      <CustomAlerts />

      <div className="booking-list-booking-header">
        <button className="booking-list-btn-btn-success" onClick={() => setOpenStickerPopup(true)}>
          <FaPlus /> New OT Booking
        </button>
      </div>

      <div className="ot-filtersection">
        <div className="ot-datefilter">
          <div className="ot-daterange">
            <label>From: </label>
            <input className="ot-input" type="date" value="2024-08-05" />
            <label> To: </label>
            <input className="ot-input" type="date" value="2024-08-12" />
          </div>
        </div>
      </div>

      <div className="ot-bookinglist-searchsection">
        <input
          type="text"
          placeholder="Search by Patient Name/ID"
          className="ot-bookinglist-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="ot-bookinglist-print-button">Print</button>
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
                "Actions",
                "Employees",
                "Duration",
                "Department",
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
          <tbody>
            {otPatientList.map((booking, index) => (
              <tr key={index}>
                <td>{booking.hospitalNo}</td>
                <td>{booking.patient.name}</td>
                <td>{booking.patient.ageSex}</td>
                <td>{moment(booking.otDateTime).format('YYYY-MM-DD HH:mm')}</td>
                <td>{booking.diagnosis}</td>
                <td>{booking.otProcedure}</td>
                <td>{booking.useAnesthesia ? 'Yes' : 'No'}</td>
                <td>{booking.machineName}</td>
                <td>{booking.status}</td>
                <td>{booking.department}</td>
                <td>{booking.doctors?.join(', ')}</td>
                <td>{booking.employees?.join(', ')}</td>
                <td>{booking.duration}</td>
                <td>
                  <Button onClick={() => console.log(`Print receipt ${booking.id}`)}>
                    Print
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openStickerPopup && (
        <CustomModal isOpen={openStickerPopup} onClose={() => setOpenStickerPopup(false)}>
          <form onSubmit={handleSubmit} className='booking-list-modal-content'>
            <div className="booking-list-patient-search-dropdown">
              <label>Patient Name:</label>
              <input type="text" value={patientName} onChange={handlePatientNameChange} />
            </div>
            <div className="booking-list-patient-search-dropdown">
              <label>OT Date:</label>
              <input type="date" value={otDate} onChange={handleOtDateChange} />
            </div>
            <div className="booking-list-patient-search-dropdown">
              <label>OT Time:</label>
              <input type="time" value={otTime} onChange={handleOtTimeChange} />
            </div>
             <div className="booking-list-patient-search-dropdown">
              <label>Duration:</label>
              <input type="text" value={duration} onChange={handleDurationChange} />
            </div>
            <div className="booking-list-patient-search-dropdown">
              <label>Department:</label>
              <select >
                <option>aaa</option>
                <option>surgen</option>
              </select>
            </div>
            <div className="booking-list-patient-search-dropdown">
              <label>Doctors:</label>
              {/* <select multiple value={selectedDoctors} onChange={(e) => setSelectedDoctors([...e.target.selectedOptions].map(o => o.value))}>
                {doctorList.map((doctor) => (
                  <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
                ))}
              </select> */}
              <select name="" id="">
                <option value="">Dr.Neha</option>
                <option value="">Dr.Prachi</option>
                <option value="">Dr.Mohini</option>
              </select>
            
              <label>Employees:</label>
              {/* <select multiple value={selectedEmployees} onChange={(e) => setSelectedEmployees([...e.target.selectedOptions].map(o => o.value))}>
                {employeeList.map((employee) => (
                  <option key={employee.id} value={employee.name}>{employee.name}</option>
                ))}
              </select> */}
              <select name="" id="">
                <option value="">Nurse</option>
                <option value="">Doctor</option>
                <option value="">aaaa</option>
              </select>
            </div>
            <div className="booking-list-patient-search-dropdown">
              <label>Diagnosis:</label>
              <input type="text" value={diagnosis} onChange={handleDiagnosisChange} />
            </div>
            <div className="booking-list-patient-search-dropdown">
              <label>Procedure:</label>
              <input type="text" value={procedure} onChange={handleProcedureChange} />
            </div>
            <div className="booking-list-patient-search-dropdown">
              <label>Use Anaesthesia:</label>
              <input type="checkbox" checked={useAnaesthesia} onChange={handleUseAnaesthesiaChange} />
            </div>
            <div className="booking-list-patient-search-dropdown">
              <label>Machine Name:</label>
              <input type="text" value={machineName} onChange={handleMachineNameChange} />
            </div>
            <div className="booking-list-patient-search-dropdown">
              <label>Status:</label>
              <select value={status} onChange={handleStatusChange}>
                <option value="Booked">Booked</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Concluded">Concluded</option>
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        </CustomModal>
      )}
    </div>
  );
}

export default BookingList;
