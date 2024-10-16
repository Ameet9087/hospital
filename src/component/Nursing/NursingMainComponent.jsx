 /* prachi parab user interface changed  14/9 */

import React, { useState, useEffect,useRef } from 'react';
import './NursingMainComponent.css';
import OpdTriagePage from './OpdTriagePage';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import { API_BASE_URL } from '../api/api';
import PatientDashboard from '../DashBoards/PatientDashboard';
import VitalsPage from '../DashBoards/ClinicalVitals';

const OutPatientComponent = () => {
  const [isTriageModalOpen, setIsTriageModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Discharged Patients');
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1; // Update this according to your data
  const [filterOption, setFilterOption] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [modalData, setModalData] = useState({}); 
  const [isPatientOPEN,setIsPatientOPEN] = useState(false);
  const [selectedPatient,setSelectedPatient] = useState(null)
  const [isNursing,setIsNursing] = useState(false);
  const [selectedPatientId,setSelectedPatientId] = useState();
  const [showClinic,setShowClinic] = useState(false);
  
const [columnWidths, setColumnWidths] = useState({});
const tableRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/new-patient-visits`)
      .then(response => response.json())
      .then(data => {
        setPatients(data);
        filterTodayData(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching patient data:', error));
  }, []);


  useEffect(() => {
    handleFilterData();
  }, [fromDate, toDate]);
  

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'Today') {
      filterTodayData(patients);
    }
  };

  const openTriAgeModal = (data) => {
    setModalData(data); // Set the data to be passed to the modal
    setIsTriageModalOpen(true);
  };

  // Function to close the modal
  const closeTriAgeModal = () => {
    setIsTriageModalOpen(false)
    setShowClinic(false);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };
  const handleFilterData = () => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
  
    // Filter patients based on the date range
    const filtered = patients.filter(patient => {
      const visitDate = patient.visitTime ? new Date(patient.visitTime.split('T')[0]) : null;
      // Check if the visitDate is within the selected range
      return visitDate && visitDate >= from && visitDate <= to;
    });
  
    setFilteredPatients(filtered);
  };

  const filterTodayData = (patientData) => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const filtered = patientData.filter(patient => {
      const visitDate = patient.visitTime ? patient.visitTime.split('T')[0] : '';
      return visitDate === today;
    });
    setFilteredPatients(filtered);
  };

  const handlePatientClick = (patient) => {    
    setSelectedPatient(patient); 
    setIsNursing(true)
    setIsPatientOPEN(!isPatientOPEN)
  };
  const handleClinic=(id)=>{
    setShowClinic(true);
    setSelectedPatientId(id);
  }

  
  return (
    <>
    {!isPatientOPEN ? (
    <>
    {!showClinic ?(
      <div className="out-patient-container">
      <div className="opd-tabs">
      <a
        href="#today"
        className={`opd-tab-item ${activeTab === 'today' ? 'active' : ''}`}
        onClick={() => handleTabClick('Today')}
      >
        Today
      </a>
      <a
        href="#past-days"
        className={`opd-tab-item ${activeTab === 'past-days' ? 'active' : ''}`}
        onClick={() => handleTabClick('Past Days')}
      >
        Past Days
      </a>
    </div>
        {activeTab === 'Today' && (
          <>            
            <div className="search-and-filter">
              <input
                type="text"
                className="nursing-search-input"
                placeholder="Search by Hospital No/Patient Name/Department Name"
              />
              
              <input type="text" className="department-input" placeholder="Search by Department Name" style={{marginRight:'3%'}}/>
              {/* <button className="Actions-btn Actions-consumption" onClick={openTriAgeModal}> Add Triage</button> */}
            </div>
            <div className="nurse-action-buttons">
           
              {/* <button className="nurse-action-button">Check In</button>
              <button className="nurse-action-button">Refer</button>
              <button className="nurse-action-button">Exchange Doc/Dept</button>
              <button className="nurse-action-button">Conclude</button> */}
            </div>
            <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "SN",
                "Date",
                "Time",
                "Patient Name",
                "Age/Sex",
                "Phone",
                "Department",
                "Doctor",
                "Visit Status",
                "Action"
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
                {filteredPatients.map((patient, index) => (
                  <tr key={index}>
                    <td>
                      {/* <input type="checkbox" id="triageCheckbox" /> */}
                      {patient.newPatientVisitId}
                    </td>
                    <td>{patient.patientQueue?.date}</td>
                    <td>{patient.visitTime}</td>
                    <td>{`${patient.firstName} ${patient.middleName || ''} ${patient.lastName}`}</td>
                    <td>{`${patient.age} / ${patient.gender}`}</td>
                    <td>{patient.phoneNumber}</td>
                    <td>{patient.patientQueue?.department || 'N/A'}</td>
                    <td>{`${patient.employeeDTO?.salutation || ''} ${patient.employeeDTO?.firstName || ''} ${patient.employeeDTO?.lastName || ''}`}</td>
                    {/* <td>{patient.scheme}</td> */}
                    <td>{patient.visitType}</td>
                    <td>
                        <div className="Actions-actions">
                          <button className="Actions-btn Actions-consumption" onClick={openTriAgeModal}>Add Triage</button>
                          <button className="Actions-btn Actions-wardRequest">&#x1F5A5;</button>
                          <button className="Actions-btn Actions-transfer">Clinical</button>
                          {/* <button className="Actions-btn Actions-vitals">&#x21E7;</button> */}
                        </div>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === 'Past Days' && (
          <>
            <div className="OutPatient_PastDays-tableContainer">
              <div className="nursing-filter-options">
                <label>
                  <input
                    type="radio"
                    value="All"
                    checked={filterOption === 'All'}
                    onChange={handleFilterChange}
                  />
                 <b >All</b>
                </label>
                <label>
                  <input
                    type="radio"
                    value="Triage Done"
                    checked={filterOption === 'Triage Done'}
                    onChange={handleFilterChange}
                  />
                 <b>Triage Done</b> 
                </label>
                <label>
                  <input
                    type="radio"
                    value="Triage Pending"
                    checked={filterOption === 'Triage Pending'}
                    onChange={handleFilterChange}
                  />
                  <b>Triage Pending</b>
                </label>
              </div>

              <div className="date-filter">
                <label>
                  From:
                  <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                </label>
                <label>
                  To:
                  <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </label>
                <button onClick={handleFilterData} className='datefilter-from-to'>OK</button>

                {/* <input type='text' placeholder='Search' className='OutPatient_PastDays-searchInput'/> */}
              </div>
              <div className='OutPatient_PastDays-Header'>
                <input type='text' placeholder='Search' className='OutPatient_PastDays-searchInput'/>

                
                <div className="OutPatient_PastDays-actions">
                  <span className="OutPatient_PastDays-results">Showing {patients.length}/{patients.length} results</span>
                  <button className="OutPatient_PastDays-button">Export</button>
                  <button className="OutPatient_PastDays-button">Print</button>
                </div>
              </div>
              <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
               "SN",
              "Date ↓",
              "Time",
              "Patient Name",
              "Age/Sex",
              "Phone Number",
              "Department",
              "Doctor Name",
              "Appointment Type",
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
                {patients.map((patient, index) => (
                  <tr key={index}>
                    <td>
                      {/* <input type="checkbox" id="triageCheckbox" /> */}
                      {patient.newPatientVisitId}
                    </td>
                    <td>{patient.patientQueue?.date}</td>
                    <td>{patient.visitTime}</td>
                    <td>{`${patient.firstName} ${patient.middleName || ''} ${patient.lastName}`}</td>
                    <td>{`${patient.age} / ${patient.gender}`}</td>
                    <td>{patient.phoneNumber}</td>
                    <td>{patient.patientQueue?.department || 'N/A'}</td>
                    <td>{`${patient.employeeDTO?.salutation || ''} ${patient.employeeDTO?.firstName || ''} ${patient.employeeDTO?.lastName || ''}`}</td>
                    {/* <td>{patient.scheme}</td> */}
                    <td>{patient.visitType}</td>
                    <td>
                        <div className="Actions-actions">
                          <button className="Actions-btn Actions-consumption" onClick={()=>openTriAgeModal(patient)}>Add Triage</button>
                          <button className="Actions-btn Actions-wardRequest" onClick={()=>handlePatientClick(patient)}>&#x1F5A5;</button>
                          <button className="Actions-btn Actions-transfer" onClick={()=>handleClinic(patient.newPatientVisitId)}>Clinical</button>
                          {/* <button className="Actions-btn Actions-vitals">&#x21E7;</button> */}
                        </div>
                      </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
            {/* <div className="OutPatient_PastDays-pagination">
              <button 
                className="OutPatient_PastDays-pagination-btn" 
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                First
              </button>
              <button 
                className="OutPatient_PastDays-pagination-btn" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="OutPatient_PastDays-pagination-info">
                {`Page ${currentPage} of ${totalPages}`}
              </span>
              <button 
                className="OutPatient_PastDays-pagination-btn" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
              <button 
                className="OutPatient_PastDays-pagination-btn" 
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </div> */}
          </>
        )}
        {showPopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2>Triage Options</h2>
              <button className="close-btn" onClick={() => setShowPopup(false)}>X</button>
              <div className="action-buttons">
                <button className="popup-button">Vitals</button>
                <button className="popup-button">Doctor Handover</button>
                <button className="popup-button">Clinical Notes</button>
                <button className="popup-button">Conclude</button>
              </div>
            </div>
          </div>
        )}
        {isTriageModalOpen && (
                <OpdTriagePage
                  onClose={closeTriAgeModal}
                  data={modalData} 
                />
              )}
      </div>):(
      <VitalsPage newPatientVisitId={selectedPatientId} Type={true} onClose={closeTriAgeModal}/>)}
    </>):(<><PatientDashboard  isPatientOPEN={isPatientOPEN} setIsPatientOPEN={setIsPatientOPEN} patient={selectedPatient} type={isNursing} /></>)}
    </>
  );
};

export default OutPatientComponent;
