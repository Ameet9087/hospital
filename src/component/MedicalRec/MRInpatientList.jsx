import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import '../MedicalRec/MRInpatientList.css';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-modal';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../api/api';


function RecordMedical() {
  const [isMenuVisible, setisMenuVisible] = useState(false);
  const [loadPatient, setloadPatient] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalMROpen, setModalMROpen] = useState(false);

  const [patientModal,setPatientModal]=useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    all: true,
    diagnosisAdded: false,
    diagnosisPending: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const navigate = useNavigate();
  const [filterOption, setFilterOption] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Fetch patients data from API
  useEffect(() => {
    axios.get(`${API_BASE_URL}/discharge-ip-patients`)
      .then(response => {
        setPatients(response.data);
        setSelectedPatient(response.data);
        setFilteredPatients(response.data);
        setTotalPages(Math.ceil(response.data.length / 10)); // Adjust pagination as needed
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);



  useEffect(() => {
    console.log("Selected Patient updated:", selectedPatient); // Debug
  }, [selectedPatient]);

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFilters((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // const openMRModal = (patient) => {
  //   setSelectedPatient(patient);
  //   setModalMROpen(true);
    
    
  // };

  const openMRModal = async (ipAdmmissionId) => {
    try {
      // Fetch patient details using the provided API
      const response = await fetch(`http://192.168.0.125:4069/api/ip-admissions/${ipAdmmissionId}`);
      if (response.ok) {
        const patientData = await response.json();
        setPatientModal(patientData); // Set the fetched patient details
        setModalMROpen(true); // Open the modal
      } else {
        console.error('Failed to fetch patient details');
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };
  

  


  const closeMRModal = () => {
    setModalMROpen(false);
  };

  // Filter data based on date and MR status
  const handleFilterData = () => {
    let filtered = patients;

    if (fromDate && toDate) {
      filtered = filtered.filter(patient =>
        new Date(patient.dischargeDate) >= new Date(fromDate) &&
        new Date(patient.dischargeDate) <= new Date(toDate)
      );
    }

    if (selectedFilters.diagnosisAdded) {
      filtered = filtered.filter(patient => patient.mrStatus === 'Added');
    }

    if (selectedFilters.diagnosisPending) {
      filtered = filtered.filter(patient => patient.mrStatus === 'Pending');
    }

    if (selectedFilters.all) {
      filtered = patients;
    }

    setFilteredPatients(filtered);
    setloadPatient(true);
  };

  const toggleMenu = () => {
    setisMenuVisible(!isMenuVisible);
  };

  // Pagination
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const updatePatientRecord = () => {
    if (!selectedPatient) return;

    axios.put(`${API_BASE_URL}/mrinpatients/${selectedPatient.id}`, {
      icdCode: document.querySelector('.WardTransferModal__input').value,
      isOperationConducted: document.querySelector('#operationConducted').checked ? 'Yes' : 'No',
      // Include other updated patient details here
    })
    .then(response => {
      console.log('Record updated successfully:', response.data);
      closeMRModal();
      // Optionally, refresh patient data or update state here
    })
    .catch(error => console.error('Error updating record:', error));
  };

  return (
    <div className='outer-medical-record'>
      <div className="MRInPatient-tableContainer">
        <h5>Filter by Discharged Date:</h5>
        <div className="MROInPatient-date-filter">
          <label>
            From:
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </label>
          <label>
            To:
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </label>

          <button style={{ marginLeft: '5px' }}>★</button>
          <button style={{ marginLeft: '5px' }} onClick={toggleMenu}> - </button>
          {isMenuVisible && (
            <ul style={{ marginLeft: '5px', listStyleType: 'none', padding: '5px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
              <li>Last 1 Week</li>
              <li>Last 1 Month</li>
              <li>Last 3 Months</li>
            </ul>
          )}
          <button onClick={handleFilterData} >Load Patients</button>
          {/* <div className='MRIN-diagnosis-filter'>
            <label>
              <input
                type="checkbox"
                name="all"
                checked={selectedFilters.all}
                onChange={handleCheckboxChange}
              />
              All
            </label>
            <label>
              <input
                type="checkbox"
                name="diagnosisAdded"
                checked={selectedFilters.diagnosisAdded}
                onChange={handleCheckboxChange}
              />
              MR Added
            </label>
            <label>
              <input
                type="checkbox"
                name="diagnosisPending"
                checked={selectedFilters.diagnosisPending}
                onChange={handleCheckboxChange}
              />
              MR Pending
            </label>
          </div> */}
        </div>

        {loadPatient && (
          <>
            <div className='MRIn-Patient-Header'>
              <input type='text' placeholder='Search' className='MRIn-Patient-searchInput' />
              <div className="MRIn-Patient-actions">
                <span className="MRIn-Patient-results">{`Showing ${filteredPatients.length} results`}</span>
              </div>
            </div>
            <div className='table-container'>
            <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Serial No",
                "Adm. Date",
                "Dis. Date",
                "Patient No.",
                "InPatient No.",
                "Patient Name",
                "Age/Gender",
                // "Ward",
                // "Department",
                // "ICD Code",
                // "Doctor",
                // "MR",
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
    <tr key={index} className="MROut-tableRow">
      <td>{patient?.ipAdmission?.ipAdmmissionId}</td>
      <td>{patient?.ipAdmission?.admissionDate}</td>
      <td>{patient?.dischargeDate}</td>
      <td>{patient?.ipAdmission?.patient?.uhid}</td>
      <td>{patient?.ipAdmission?.ipAdmmissionId}</td>
      <td>{patient?.ipAdmission?.patient?.firstName} {patient?.ipAdmission?.patient?.lastName}</td>
      <td>{`${patient?.ipAdmission?.patient?.age} Y/${patient?.ipAdmission?.patient?.gender}`}</td>
      <td>
        <button 
          className="edit-final-diagnosis" 
          onClick={() => openMRModal(patient.ipAdmission.ipAdmmissionId)}>
          Add MR
        </button>
      </td>
    </tr>
  ))}
</tbody>

            </table>
          </div>
            <div className="MROut-pagination">
              <button 
                className="MROut-pagination-btn" 
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                First
              </button>
              <button 
                className="MROut-pagination-btn" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="MROut-pagination-info">
                {`Page ${currentPage} of ${totalPages}`}
              </span>
              <button 
                className="MROut-pagination-btn" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
              <button 
                className="MROut-pagination-btn" 
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal for updating medical records */}
      {modalMROpen && patientModal && (
  <Modal
    isOpen={modalMROpen}
    onRequestClose={closeMRModal}
    contentLabel="Update Medical Records"
    className="WardTransferModal__content"
    overlayClassName="WardTransferModal__overlay"
  >
    <div className="WardTransferModal__header">
      <h2>Update Medical Records</h2>
      <button className="WardTransferModal__closeButton" onClick={closeMRModal}>
        X
      </button>
    </div>

    <div className="WardTransferModal__body">
      <form>
        <div className="WardTransferModal__info">
          <div className="WardTransferModal__infoItem">
            <strong>Name:</strong> {patientModal?.patient?.firstName} {patientModal?.patient?.lastName}
          </div>
          <div className="WardTransferModal__infoItem">
            <strong>Age/Sex:</strong> {patientModal?.patient?.age} Y/{patientModal?.patient?.gender}
          </div>
          <div className="WardTransferModal__infoItem">
            <strong>InPatient No.:</strong> {patientModal?.ipAdmmissionId}
          </div>
          <div className="WardTransferModal__infoItem">
            <strong>Department:</strong> {patientModal?.admissionUnderDoctorDetail?.consultantDoctor?.specialisationId?.specialisationName || 'N/A'}
          </div>
          <div className="WardTransferModal__infoItem">
            <strong>Doctor Name:</strong> {patientModal?.admissionUnderDoctorDetail?.consultantDoctor?.doctorName || 'N/A'}
          </div>
          <div className="WardTransferModal__infoItem">
            <strong>Ward:</strong> {patientModal?.roomDetails?.floorDTO?.location || 'N/A'}
          </div>
          <div className="WardTransferModal__infoItem">
            <strong>Room Type:</strong> {patientModal?.roomDetails?.bedDTO?.bedType || 'N/A'}
          </div>

          <div className="WardTransferModal__infoItem">
            <strong>Is Discharge:</strong> {patientModal?.isDischarge ? 'Yes' : 'No'}
          </div>
        </div>

        <div className="WardTransferModal__form">
          <div className="WardTransferModal__formGroup">
            <label>Diagnosis (ICD-11):</label>
            <input
              type="text"
              className="WardTransferModal__input"
              placeholder="ICD-11 Codes"
              defaultValue={patientModal?.admissionUnderDoctorDetail?.diagnosis}
            />
          </div>
          <div className="WardTransferModal__formGroup">
            <input
              type="checkbox"
              style={{ width: 'auto' }}
              id="operationConducted"
              defaultChecked={patientModal?.isOperationConducted === 'Yes'}
            />
            <label htmlFor="operationConducted">Is Operation Conducted</label>
          </div>
        </div>
      </form>
    </div>

    <div className="WardTransferModal__footer">
      <button className="WardTransferModal__cancelButton" onClick={closeMRModal}>
        Cancel
      </button>
      <button
        className="WardTransferModal__updateButton"
        onClick={updatePatientRecord}
        type="button"
      >
        Update Record
      </button>
    </div>
  </Modal>
)}


    </div>
  );
}

export default RecordMedical;
