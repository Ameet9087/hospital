import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import '../MedicalRec/MROutPatientList.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { startResizing } from '../TableHeadingResizing/resizableColumns';

function RecordMedical() {
  const [isMenuVisible, setisMenuVisible] = useState(false);
  const [addFinalDiagnosis, setaddFinalDiagnosis] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterByAppointment, setfilterByAppointment] = useState(false);
  const [outpatients, setOutpatients] = useState([]); // State to hold the fetched data
  const [selectedFilters, setSelectedFilters] = useState({
    all: false,
    diagnosisAdded: false,
    diagnosisPending: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Update this according to your data
  const navigate = useNavigate();

  const [filterOption, setFilterOption] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [department, setDepartment] = useState('');
  const [diseaseCategory, setDiseaseCategory] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [addFinalDiagnosisdata,setaddFinalDiagnosisdata]=useState('');
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // modal popup

  const [referredOutpatient, setReferredOutpatient] = useState(false);

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      diseaseCategory,
      diagnosis,
      referredOutpatient,
    });
    alert("Data Updated Successfully");
    closeModal();

  };


  // Fetch data from the API
  const fetchOutpatients = () => {
    
    axios.get(`${API_BASE_URL}/mroutpatients/getAllMRoutpatients`)
      .then(response => {
        const data = response.data;
        setOutpatients(data);

         // Ensure outpatients is always an array

      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        setOutpatients([]);
      });
  };

  useEffect(() => {
    fetchOutpatients(); // Fetch data initially
  }, [currentPage, filterByAppointment, doctorName, department, diseaseCategory, diagnosis, fromDate, toDate]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFilters((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleFilterData = () => {
    setfilterByAppointment(!filterByAppointment);
    fetchOutpatients(); // Fetch data based on filters
  };

  const toggleMenu = () => {
    setisMenuVisible(!isMenuVisible);
  };

  const EditFinalDiagnosisButton = (data) => {
    console.log(data);

    setaddFinalDiagnosisdata(data);
    setaddFinalDiagnosis(!addFinalDiagnosis);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className='MROUt-medical-record'>
      <div className="filters-medical-record">
      <div className="filter-group">
        <div classname="filter-group-inner">
          <label className="filter-label">Doctor Filter:</label>
          <select className="filter-select" style={{marginLeft:'87px'}}>
              <option>----SELECT----</option>
              <option>Dipeeka Palande</option>
              <option>Seema Mulye</option>
              <option>Amar Solase</option>
              <option >Sachin Mehta</option>
            </select>

        </div>     <br/>
        <div classname="filter-group-inner">

            <label className="filter-label">Select Disease Category:</label>
            <select className="filter-select">
              <option>All</option>
              <option>Communicable,Vector Borne</option>
              <option>Cardiovascular & Respiratory Related Problems</option>
              <option>Certain Infectious or parasitic diseases</option>
              <option >Ear,Nose and Throat Infection</option>
            </select>
          </div>
       
   
        
      </div>
      <div className="filter-group">
      <div classname="filter-group-inner">
        <label className="filter-label">Department Filter:</label>
        <select className="filter-select">
          <option>All</option>
          <option>Anesthesia</option>
          <option>Cabin/Deluxe/Suite</option>
          <option>Cardiology</option>
          <option>CT/MRI</option>
        </select>
        </div><br></br>
        <div classname="filter-group-inner">
        <label className="filter-label">Select Diagnosis:</label>
        <select className="filter-select">
          <option>ICD-10(s)</option>
          <option>1F03 | Measles</option>
          <option>1C17 | Diptheria</option>
          <option>1C12 | Neonatal Tetanus</option>
          <option>1B1Z | Tuberculosis</option>
        </select>
        </div>
      </div>
      </div>
      {/* <div className='diagnosis-filter'>
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
          Diagnosis Added
        </label>
        <label>
          <input
            type="checkbox"
            name="diagnosisPending"
            checked={selectedFilters.diagnosisPending}
            onChange={handleCheckboxChange}
          />
          Diagnosis Pending
        </label>
      </div> */}
      <div className="MROutPatient-tableContainer">
        <h5>Filter by Appointment Date:</h5>
        <div className="MROutPatient-date-filter">
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
          {
            isMenuVisible && (
              <ul style={{ marginLeft: '5px', listStyleType: 'none', padding: '5px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
                <li>Last 1 Week</li>
                <li>Last 1 Month</li>
                <li>Last 3 Months</li>
              </ul>
            )
          }
          <button onClick={handleFilterData}>OK</button>
        </div>
        <div className='MROut-Patient-Header'>
          <input type='text' placeholder='Search' className='Admitted-Patient-searchInput'/>
          <div className="MROut-Patient-actions">
            <span className="MROut-Patient-results">Showing {outpatients.length || 0} results</span>
          </div>
        </div>
        {
          filterByAppointment && (
            <>
             <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
               "Serial No",
              "Patient Name",
              "Age",
              "Gender",
              "Doctor Name",
              "Appointment Date",
              "Department",
              "ICD Code",
              "Final Diagnosis",
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
                  {
                    outpatients.length > 0 ? (
                      outpatients.map((patient) => (
                        <tr key={patient.id}>
                          <td>{patient.hospitalNo}</td>
                          <td>{patient.patientName}</td>
                          <td>{patient.age}</td>
                          <td>{patient.gender}</td>
                          <td>{patient.doctorName}</td>
                          <td>{patient.appointmentDate}</td>
                          <td>{patient.department}</td>
                          <td>{patient.icdCode}</td>
                          <td>{patient.finalDiagnosis || 'N/A'}</td>
                          <td><button onClick={()=>EditFinalDiagnosisButton(patient)}>Edit Final Diagnosis</button></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10">No data available</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
              {/* <div className="MROutPatient-pagination">
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
                <span>Page {currentPage} of {totalPages}</span>
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
              </div> */}
            </>
          )
        }
      </div>
      
      {
  isModalOpen && outpatients && (
    <div className="MROUT-container birthlist">
    <div className="MROUT-modal-overlay">
      <div className="MROUT-modal-content">
        <div className="MROUT-modal-header">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
          </div>
          <h3>Add Final Diagnosis</h3>

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h5>
                <i className="bi bi-person-circle"></i> {addFinalDiagnosisdata.patientName}
              </h5>
              <div className="form-group">
                <strong>Outpatient No:</strong> {addFinalDiagnosisdata.id}
              </div>
              <div className="form-group">
                <strong>Age:</strong> {addFinalDiagnosisdata.age}
              </div>
              <div className="form-group">
                <strong>Visit Date:</strong> {addFinalDiagnosisdata.visitDate}
              </div>
              <div className="form-group">
                <strong>Contact No:</strong> {addFinalDiagnosisdata.contactNo}
              </div>
              <div className="form-group">
                <strong>Doctor Name:</strong> {addFinalDiagnosisdata.doctorName}
              </div>
              <div className="form-group">
                <strong>Address:</strong> {addFinalDiagnosisdata.address}
              </div>
              <div className="form-group">
                <strong>Department:</strong> {addFinalDiagnosisdata.department}
              </div>

              <div className="form-group">
                <label htmlFor="diseaseCategory">Select Disease Category</label>
                <select
                  id="diseaseCategory"
                  name="diseaseCategory"
                  value={diseaseCategory}
                  onChange={e => setDiseaseCategory(e.target.value)}
                  required
                >
                  <option value="All">All</option>
                  <option>Communicable, Vector Borne</option>
                  <option>Cardiovascular & Respiratory Related Problems</option>
                  <option>Certain Infectious or parasitic diseases</option>
                  <option>Ear, Nose and Throat Infection</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="diagnosis">Select Diagnosis</label>
                <input
                  type="text"
                  id="diagnosis"
                  name="diagnosis"
                  placeholder="ICD-11"
                  value={diagnosis}
                  onChange={e => setDiagnosis(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="referredOutpatient"
                    checked={referredOutpatient}
                    onChange={e => setReferredOutpatient(e.target.checked)}
                  />
                  Referred Outpatient?
                </label>
              </div>

              <div className="footer-buttons">
                <button type="submit" className="submit-button">
                  Submit
                </button>
                <button type="button" className="cancel-button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

    </div>
   







  );
}

export default RecordMedical;
