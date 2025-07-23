
import React, { useState } from 'react';
import '../MedicalRec/EmergencyPatientList.css';
import { useNavigate } from 'react-router-dom';

function RecordMedical() {
  const [isMenuVisible,setisMenuVisible]=useState(false);
  const [addFinalDiagnosis,setaddFinalDiagnosis]=useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emergencyplist,setemergencyplist]=useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    all: false,
    diagnosisAdded: false,
    diagnosisPending: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1; // Update this according to your data

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFilters((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const [filterOption, setFilterOption] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const handleFilterData = () => {
    // Implement filter logic here
    console.log(`Filtering data from ${fromDate} to ${toDate} with option ${filterOption}`);
    setemergencyplist(!emergencyplist);
  };
  const toggleMenu=()=>{
    setisMenuVisible(!isMenuVisible);
  }
  const EditFinalDiagnosisButton=()=>{
    setaddFinalDiagnosis(!addFinalDiagnosis);
    setIsModalOpen(true);
  }

 



  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='MROUt-medical-record'>

  
    <div className="filters-medical-record">
      <div className="filter-group">
        <div classname="filter-group-inner">
          <label className="filter-label">Doctor Filter:</label>
          <input type="text" className="filter-input" placeholder="Doctor Name" style={{marginLeft:'87px'}} />

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


      <div className='diagnosis-filter' >
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
      
    
    </div>
    <div className="MROutPatient-tableContainer">
             <h3>Filter by Appointment Date:</h3>
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


              {
            
                emergencyplist && (
                    <>
                    <div className='MROut-Patient-Header'>
                  <input type='text' placeholder='Search' className='Admitted-Patient-searchInput'/>
                  <div className="MROut-Patient-actions">
                      <span className="MROut-Patient-results">Showing 0/0 results</span>
                  </div>
            </div>
            <table className="MROut-patientsTable">
      <thead>
        <tr>
          <th> Hospital No</th>
          <th>Patient Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Doctor Name</th>
          <th>Appointment Date</th>
         
          <th>Department</th>
          <th>ICD Code</th>
         
          <th>Final Diagnosis</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr className="MROut-tableRow">
          <td>2311000001</td>
          <td>Suresh S</td>
          <td>25Y</td>
          <td>Female</td>
          <td>Dr. pooja Mishra</td>
          <td>2023-12-02</td>
          <td>Cardiology</td>
          <td>1F03</td>
          <td>High BP</td>
          <div className="Actions-actions">
                      <button className="edit-final-diaggnosois"  onClick={EditFinalDiagnosisButton}>Edit Final Diagnosis</button>
          </div>
        </tr>
        <tr className="MROut-tableRow">
          <td>2311000001</td>
          <td>Sagar Sangare</td>
          <td>25Y</td>
          <td>Female</td>
          <td>Dr. pooja Mishra</td>
          <td>2023-12-02</td>
          <td>Cardiology</td>
          <td>1F03</td>
          <td>High BP, High Sugar</td>
          <div className="Actions-actions">
                      <button className="edit-final-diaggnosois"  onClick={EditFinalDiagnosisButton}>Edit Final Diagnosis</button>
          </div>
        </tr>
        <tr className="MROut-tableRow">
          <td>2311000001</td>
          <td>Seema Muley</td>
          <td>25Y</td>
          <td>Female</td>
          <td>Dr. pooja Mishra</td>
          <td>2023-12-02</td>
          <td>Cardiology</td>
          <td>1F03</td>
          <td>High BP</td>
          <div className="Actions-actions">
                      <button className="edit-final-diaggnosois" onClick={EditFinalDiagnosisButton}>Edit Final Diagnosis</button>
          </div>
        </tr>
       
                </tbody>
              </table>

              {/* <div className="MROut-pagination">
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
            </div> */}

            

                    </>
                )

              }

              

  </div>
  {
    addFinalDiagnosis && isModalOpen && (

      <div className="FinalDiagnosis-containers emergencyPatient">
   
      
     
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="header">
              <h3>Add Final Diagnosis</h3>
              <div className="patient-name">
                <i className="fa fa-user"></i> S Suresh (2408003819)
              </div>
            </div>
            <div className="patient-details">
              <div>
                <span>Outpatient No</span> : V2400199
              </div>
              <div>
                <span>Visit Date</span> : 2023-12-02
              </div>
              <div>
                <span>Doctor Name</span> : Dr.Pooja Mishra
              </div>
              <div>
                <span>Age</span> : 45Y/Male
              </div>
              <div>
                <span>Contact No</span> : 1234567899
              </div>
              <div>
                <span>Department</span> : Cardiology
              </div>
              <div>
                <span>Address</span> : 
              </div>
            </div>
            <div className="diagnosis-form">
              <div className="form-group">
                <label>Select Disease Category :</label>
                <select>
                  <option>All</option>
                </select>
              </div>
              <div className="form-group">
                <label>Select Diagnosis :</label>
                <input type="text" placeholder="ICD-10" />
              </div>
              <div className="form-group">
                <label>Referred Outpatient?</label>
                <input type="checkbox" />
              </div>
              <div className="form-group">
                <label>Referred By:</label>
                <input type="text" />
              </div>
            </div>
            <div className="footer-buttons">
              <button className="submit-button">Submit</button>
              <button className="cancel-button" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      
    </div>
           )
          }

    </div>

    
  );
};



export default RecordMedical;
