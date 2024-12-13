
import React, { useState ,useEffect} from 'react';
import '../MedicalRec/BirthList.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
import { API_BASE_URL } from '../api/api';

function BirthList() {
  const [isMenuVisible,setisMenuVisible]=useState(false);
  const [birthListData, setBirthListData] = useState([]);
  const [addBirthDetails,setaddBirthDetails]=useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [BirthReport,setBirthReport]=useState(false);
  const [certificateData,setCertificateData]=useState(null)
  const [birthlistdata,setbirthlistdata]=useState(false);

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

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get(`${API_BASE_URL}/birth-certificates/display-birthCertificate`)
      .then(response => {
        setBirthListData(response.data); // Assuming response.data is the array of birth certificates
        console.log(response.data);
      })
     
      .catch(error => {
        console.error('Error fetching birth certificates:', error);
      });
  }, []);

  const handleBirthCertificate=(item)=>{
    setBirthReport(!BirthReport);
    setCertificateData(item)

    
  }

  
  const addBirthDetailsButton=()=>{
    setaddBirthDetails(!addBirthDetails);
    setIsModalOpen(true);
  }
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
    setbirthlistdata(!birthlistdata);
  };
  const toggleMenu=()=>{
    setisMenuVisible(!isMenuVisible);
  }
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeBirthCertificate=()=>{
    setBirthReport(false);
  }
  const [formBirthData, setFormBirthData] = useState({
    certificateNumber: '',
    conditionAtBirth: '',
    gender: '',
    weight: '',
    fatherName: '',
    motherName: '',
    birthDate: '2023-08-19',
    birthTime: '14:23',
    birthNumberType: '',
    birthType: '',
    issuedBy: '',
    certifiedBy: ''
  });

  const handleChangeBirth = (e) => {
    const { name, value } = e.target;
    setFormBirthData({
      ...formBirthData,
      [name]: value
    });
  };

  const handleSubmitBirth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/birth-certificates/save-birthCertificate`, formBirthData);
      alert('Birth Certificate Saved:', response.data);
      console.log('Birth Certificate Saved ', response.data);
      closeModal(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error saving birth certificate:', error);
    }
  };

  return (
    <div className='outer-medical-record'>

  
    
    <div className="Birth-tableContainer">
    <button onClick={addBirthDetailsButton} className='AddNewBirthCertificate'> &#43;  Add New Birth Certificate</button>
             <h5>Filter by Birth Date:</h5>
            <div className="Birth-date-filter">
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
                <button onClick={handleFilterData} style={{backgroundColor:'#32c5d2'}}>OK</button>
                

              </div>

              {
                birthlistdata && (
                    <>
                     <div className='Birth-Patient-Header'>
                  <input type='text' placeholder='Search' className='Birth-Patient-searchInput'/>
                        <div className="Birth-Patient-actions">
                            <span className="Birth-Patient-results">Showing 0/0 results</span>
                        </div>
                    </div>
                    <table className="Birth-patientsTable">
            <thead>
                <tr>
                  <th>Serial No</th>
                <th> Certificate No. </th>
                <th>Mother Name</th>
                <th>Father Name </th>
                <th>Baby Gender</th>
                <th>Birth Date</th>
                <th>Birth Time</th>
                <th>Weight(gm)</th>
                
                <th>Action</th>
                
                </tr>
            </thead>
            <tbody>

            {birthListData.map((item) => (
                  <tr className="Birth-tableRow" key={item.certificateNo}>
                    <td>{item.birthCertificateId}</td>
                    <td>{item.certificateNumber}</td>
                    <td>{item.motherName}</td>
                    <td>{item.fatherName}</td>
                    <td>{item.gender}</td>
                    <td>{item.birthDate}</td>
                    <td>{item.birthTime}</td>
                    <td>{item.weight}</td>
                    <td className="Actions-actions">
                      <button className="edit-final-diaggnosois" onClick={()=>handleBirthCertificate(item)}>Certificate</button>
                    </td>
                  </tr>
                ))}


                
       
                </tbody>
              </table>

              {/* <div className="Birth-pagination">
              <button 
                className="Birth-pagination-btn" 
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                First
              </button>
              <button 
                className="Birth-pagination-btn" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="Birth-pagination-info">
                {`Page ${currentPage} of ${totalPages}`}
              </span>
              <button 
                className="Birth-pagination-btn" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
              <button 
                className="Birth-pagination-btn" 
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

          
          <div>
      {addBirthDetails && isModalOpen &&(
        
        <div className="AddBirthDetails-container birthlist">
        <div className="AddBirthDetails-modal-overlay">
          <div className="AddBirthDetails-modal-content">
            <div className="AddBirthDetails-modal-header">
                  <button className="close-button" onClick={closeModal}>
                    &times;
                  </button>
                </div>
                <h3>Add Birth Details</h3>
              
                <div className="form-container">
                  <form onSubmit={handleSubmitBirth}>
                  <div className="form-group">
                  <label htmlFor="motherName">Mother Name </label>
                  <input type="text" id="motherName" name="motherName" onChange={handleChangeBirth} required />
                  
                </div>
                    <div className="form-group">
                      <label htmlFor="certificateNumber">Certificate Number</label>
                      <input type="text" id="certificateNumber" name="certificateNumber" onChange={handleChangeBirth} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="conditionAtBirth">Condition at Birth *</label>
                      <select id="conditionAtBirth" name="conditionAtBirth"  onChange={handleChangeBirth} required>
                        <option value="">--Please Select--</option>
                        <option value="live">Live Birth</option>
                        <option value="neonataldeath">Neonatal Death</option>
                        <option value="stillbirth">Still Birth</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Gender *</label>
                      <select id="gender" name="gender"  onChange={handleChangeBirth} required>
                        <option value="">--Select--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="weight">Weight (gram)*</label>
                      <input type="number" id="weight" name="weight"  onChange={handleChangeBirth} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="fatherName">Father Name</label>
                      <input type="text" id="fatherName" name="fatherName"  onChange={handleChangeBirth}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="birthDate">Birth Date *</label>
                      <input type="date" id="birthDate" name="birthDate"   onChange={handleChangeBirth} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="birthTime">Birth Time *</label>
                      <input type="time" id="birthTime" name="birthTime"  onChange={handleChangeBirth} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="birthNumberType">Birth Number Type</label>
                      <select id="birthNumberType" name="birthNumberType" onChange={handleChangeBirth}>
                        <option value="single">Single</option>
                        <option value="twins">Twins</option>
                        <option value="multiple">Multiple</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="birthType">Birth Type</label>
                      <select id="birthType" name="birthType" onChange={handleChangeBirth} >
                        <option value="">--Please select--</option>
                        <option>Spontaneous Vaginal Delivery</option>
                        <option>Instrumental Delivery</option>
                        <option>Cesarean Section</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="issuedBy">Issued By:</label>
                      <select id="issuedBydoctor" name="issuedBydoctor" onChange={handleChangeBirth}>
                        <option value="">--Please select--</option>
                        <option value="dr_smith">Dr. John Smith</option>
                        <option value="dr_jones">Dr. Sarah Jones</option>
                        <option value="dr_williams">Dr. Michael Williams</option>
                        <option value="dr_brown">Dr. Emily Brown</option>
                        <option value="dr_johnson">Dr. David Johnson</option>
                        <option value="dr_miller">Dr. Patricia Miller</option>
                        <option value="dr_davis">Dr. Richard Davis</option>
                        <option value="dr_garcia">Dr. Maria Garcia</option>
                        <option value="dr_martinez">Dr. James Martinez</option>
                        <option value="dr_lee">Dr. Jennifer Lee</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="certifiedBy">Certified By:</label>
                      <select id="certifiedByDR" name="certifiedByDR"  onChange={handleChangeBirth}>
                        <option value="">--Please select--</option>
                        <option value="dr_agarwal">Dr. Ramesh Agarwal</option>
                        <option value="dr_kapoor">Dr. Priya Kapoor</option>
                        <option value="dr_iyer">Dr. Suresh Iyer</option>
                        <option value="dr_gupta">Dr. Anjali Gupta</option>
                        <option value="dr_mehta">Dr. Rajesh Mehta</option>
                        <option value="dr_verma">Dr. Sunita Verma</option>
                        <option value="dr_sharma">Dr. Vinod Sharma</option>
                        <option value="dr_patel">Dr. Meera Patel</option>
                        <option value="dr_jain">Dr. Neeraj Jain</option>
                        <option value="dr_reddy">Dr. Lakshmi Reddy</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <button type="submit" className='submit-button-popup'>Add Certificate</button>
                    </div>
                  </form>
                </div>
                <div className="footer-buttons">
                  <button className="submit-button-popup">Submit</button>
                  <button className="cancel-button-popup" onClick={closeModal}>Cancel</button>
                </div>
              </div>
            </div>
          
        </div>
      )}
    </div>



        {
            BirthReport && (
                <div className="FinalDiagnosis-container birthReport">
                   
                 <div className="modal-overlay">
                 <div className="modal-content">
                   <div className="modal-header">
                     <button className="close-button" onClick={closeBirthCertificate}>
                       &times;
                     </button>
                   </div>
                   <div className="birth-certificate">
                     <header className="birth-certificate-header">
                       <h1>Birth Certificate | Baby of {certificateData.fatherName}</h1>
                     </header>
           
                     <section className="birth-certificate-report">
                       <p>
                         This is to certify that a <strong>{certificateData.gender}</strong> baby was born on <strong>{certificateData.birthDate}</strong> at <strong>{certificateData.birthTime}</strong> with baby weight <strong>{certificateData.weight} grams</strong> and the condition of the baby at birth was <strong>Live Birth</strong>. The type of birth was <strong>single {certificateData.birthNumberType}</strong> by <strong>{certificateData.birthType}</strong>.
                       </p>
                       <p>
                         The mother is Ms <strong>{certificateData.motherName}</strong>, resident of India.
                       </p>
                     </section>
           
                     <section className="birth-certificate-hospital-details">
                       <p>
                         <strong>Hospital/Health Facility</strong><br />
                         Name: Sancheti Hospital<br />
                         Address: Shivaji Nagar
                       </p>
                     </section>
           
                     <section className="birth-certificate-signature-section">
                       <div className="birth-certificate-issued-by">
                         <p>Issued By</p>
                         <p>Signature: ____________________</p>
                         <p>Name: ____________________</p>
                         <p>Designation: ____________________</p>
                       </div>
                       <div className="birth-certificate-certified-by">
                         <p>Certified By</p>
                         <p>Signature: ____________________</p>
                         <p>Name: ____________________</p>
                         <p>Designation: ____________________</p>
                       </div>
                     </section>
           
                     <section className="birth-certificate-details">
                       <p>Fiscal Year: 2024</p>
                       <p>Certificate No: 350</p>
                       <p>Certificate issued date: 2024-07-01</p>
                     </section>
           
                     <footer className="birth-certificate-footer">
                       <p>[Please register this birth at Local Registrar Office within 35 days of Birth]</p>
                     </footer>
           
                     <nav className="birth-certificate-nav-bar">
                       <button>Edit</button>
                       <button>Print</button>
                       <button>Cancel</button>
                     </nav>
                   </div>
                 </div>
               </div>
                
              </div>
            )
          }




    </div>

    
  );
};



export default BirthList;
