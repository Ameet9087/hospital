import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import './PaediatricOutPatientNavbar.css';

import VitalSignsInpatientForm from './VitalSignsInpatientForm';
import ExaminationDiagnosisOutpatientForm from './ExaminationDiagnosisOutpatientForm';
import ChiefComplaintOutpatientForm from './ChiefComplaintOutpatientForm';
import PatientOutPatientRegistrationForm from './PatientOutPatientRegistrationForm';
import TreatmentPrescriptionOutpatientForm from './TreatmentPrescriptionOutpatientForm';
import ImmunizationOutpatientForm from './ImmunizationOutpatientForm';
import FollowUpReviewOutpatientForm from './FollowUpReviewOutpatientForm';



const PaediatricOutPatientNavbar = () => {
  const location = useLocation(); // Get the current route location
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic-info');
 
  const[patientIds,setPatientIds]=useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
      patientData: {},
      VitalSigns: {},
      chiefComplaint: {},
      examination: {},
      treatmentdata:{},
      immunization:{},
      followup:{}
    });


  const {id}=useParams();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const id = location?.state?.patient?.patientId;
    setPatientIds(id);
  
    if (location?.state && location?.state?.patient) {
      const patient = location.state.patient;
      console.log(patient);
      setFormData({
       patientData:patient.patientDTO || {},
       VitalSigns: patient.VitalSignsDTO || {},
       chiefComplaint: patient.ChiefComplaintDTO || {},
       examination: patient.ExaminationDTO || {},
       treatmentdata:patient.TreatmentDTO || {},
       immunization:patient.ImmunizationDTO || {},
       followup:patient.FollowUpDTO || {}
      });
      setIsEditMode(true);
      setActiveTab('basic-info'); // Set the active tab based on the incoming data
    }
  }, [location?.state]);

  
  const handlePatientData = (data) => {
    setFormData(prevState => ({
      ...prevState,
      patientData: data,
    }));
    console.log(data+"aaaaaaaaaaaa");
  };

  const handleVitalSigns = (data) => {
    setFormData(prevState => ({
      ...prevState,
      VitalSigns: data,
    }));

    
  };

  const handleChiefComplaint = (data) => {
    setFormData(prevState => ({
      ...prevState,
      chiefComplaint: data,
    }));

    console.log(data+"Chief");
  };

  const handleExamination = (data) => {
    setFormData(prevState => ({
      ...prevState,
      examination: data,
    }));

    
  };

  
  const handleTreatment = (data) => {
    setFormData(prevState => ({
      ...prevState,
      treatmentdata: data,
    }));

    
  };

  const handleimmuni = (data) => {
    setFormData(prevState => ({
      ...prevState,
      immunization: data,
    }));

    
  };

  const handleFollowup = (data) => {
    setFormData(prevState => ({
      ...prevState,
      followup: data,
    }));

    
  };


 
  const handleRegisterPatient = async () => {
    // Check if all tabs have data (optional validation)
    const { patientData, VitalSigns, chiefComplaint, examination,treatmentdata,immunization,followup } = formData;
    if (!patientData || !VitalSigns || !chiefComplaint || !examination || !treatmentdata || !immunization || !followup) {
      alert('Please complete all sections before registering.');
      return;
    }

    // Combine all form data
    const dataToSubmit = {
      ...patientData,
      vitalSigns: VitalSigns,
      chiefComplaint: chiefComplaint,
      examination: examination,
      treatmentdata:treatmentdata,
      immunization:immunization,
      followup:followup
    
    };

   
    try {
      const url = isEditMode 
        ? `http://localhost:9000/api/patients/${patientData.id}` // Adjust the endpoint for update
        : 'http://localhost:9000/api/patients/add'; // Endpoint for adding new patient

      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      alert(isEditMode ? 'Patient data updated successfully' : 'Patient registered successfully');
      console.log('Operation successful:', result);

      // Optionally reset form data or redirect the user
      setFormData({
        patientData: {},
        VitalSigns: {},
        chiefComplaint: {},
        examination: {},
        treatmentdata:{},
        immunization:{},
        followup:{}

      });
      setActiveTab('basic-info'); // Optionally reset active tab to default
      navigate('/'); // Redirect to the home page or wherever appropriate

    } catch (error) {
      console.error('Error handling patient data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
          <>

<div className="register-patient">
      <div className="menu">
      <a 
    href={patientIds ? `#basic-info/${patientIds}` : '#basic-info'} 
    className={`menu-item ${activeTab === 'basic-info' ? 'active' : ''}`} 
    onClick={() => setActiveTab('basic-info')}
  >
    Basic Information
  </a>
  <a 
    href={patientIds ? `#VitalSigns/${patientIds}` : '#VitalSigns'} 
    className={`menu-item ${activeTab === 'VitalSigns' ? 'active' : ''}`} 
    onClick={() => setActiveTab('VitalSigns')}
  >
    Vital Signs
  </a>
  <a 
    href={patientIds ? `#chiefComplaint/${patientIds}` : '#chiefComplaint'} 
    className={`menu-item ${activeTab === 'chiefComplaint' ? 'active' : ''}`} 
    onClick={() => setActiveTab('chiefComplaint')}
  >
    Chief Complaint
  </a>
  <a 
    href={patientIds ? `#examination/${patientIds}` : '#examination'} 
    className={`menu-item ${activeTab === 'examination' ? 'active' : ''}`} 
    onClick={() => setActiveTab('examination')}
  >
    Examination
  </a>
  <a 
    href={patientIds ? `#treatment/${patientIds}` : '#treatment'} 
    className={`menu-item ${activeTab === 'treatment' ? 'active' : ''}`} 
    onClick={() => setActiveTab('treatment')}
  >
    Treatment
  </a>
  <a 
    href={patientIds ? `#immunization/${patientIds}` : '#immunization'} 
    className={`menu-item ${activeTab === 'immunization' ? 'active' : ''}`} 
    onClick={() => setActiveTab('immunization')}
  >
    Immunization
  </a>

  <a 
    href={patientIds ? `#Followup/${patientIds}` : '#Followup'} 
    className={`menu-item ${activeTab === 'Followup' ? 'active' : ''}`} 
    onClick={() => setActiveTab('Followup')}
  >
    FollowUp
  </a>
        <a href="#" className="register-button" onClick={handleRegisterPatient}>
          {isEditMode ? 'Update Patient' : 'Register Patient'}
        </a>
      </div>

      <div className="register-patient-content">
        {activeTab === 'basic-info' && <PatientOutPatientRegistrationForm sendpatientdata={handlePatientData}  patientData={formData.patientData} />}
        {activeTab === 'VitalSigns' && <VitalSignsInpatientForm sendVitalSigns={handleVitalSigns} VitalSigns={formData.VitalSigns} />}
        {activeTab === 'chiefComplaint' && <ChiefComplaintOutpatientForm sendChiefComplaint={handleChiefComplaint} chiefComplaint={formData.chiefComplaint} />}
        {activeTab === 'examination' && <ExaminationDiagnosisOutpatientForm sendExamination={handleExamination} examination={formData.examination} />}
        {activeTab === 'treatment' && <TreatmentPrescriptionOutpatientForm sendtreatmentdata={handleTreatment} treatmentdata={formData.treatmentdata}/>}
        {activeTab === 'immunization' && <ImmunizationOutpatientForm sendImmuniZation={handleimmuni} immunization={formData.immunization} />}
        {activeTab === 'Followup' && <FollowUpReviewOutpatientForm sendFollowupdata={handleFollowup} followup={formData.followup} />}

       
      </div>
    </div>



     {/* <nav className="pediatric-inpatient-navbar">
     
      <ul>
        <li>
        <Link 
            to={patientIds ? `/RegisterPatient/${patientIds}#basic-info` : '/RegisterPatient#basic-info'} 
            className={`menu-item ${activeTab === 'basic-info' ? 'active' : ''}`} 
            onClick={() => setActiveTab('basic-info')}
          >
            Basic Information
          </Link>
        </li>
        
        <li>
          <Link
            to="/vital-signs-inpatient"
            className={`pediatric-inpatient-nav-button ${location.pathname === '/vital-signs-inpatient' ? 'active' : ''}`}
          >
           VitalSigns Outpatient Form
          </Link>
        </li>
        <li>
          <Link
            to="/chief-complaint-outpatient"
            className={`pediatric-inpatient-nav-button ${location.pathname === '/chief-complaint-outpatient' ? 'active' : ''}`}
          >
         ChiefComplaint Outpatient Form
          </Link>
        </li>
        <li>
          <Link
            to="/examination-diagnosis-outpatient"
            className={`pediatric-inpatient-nav-button ${location.pathname === '/examination-diagnosis-outpatient' ? 'active' : ''}`}
          >
         ExaminationDiagnosis OutpatientForm
          </Link>
        </li>

        <li>
          <Link
            to="/treatment-prescription-Outpatient"
            className={`pediatric-inpatient-nav-button ${location.pathname === '/treatment-prescription-Outpatient' ? 'active' : ''}`}
          >
       TreatmentPrescription Outpatient Form
          </Link>
        </li>

        <li>
          <Link
            to="/immunization-outpatient-form"
            className={`pediatric-inpatient-nav-button ${location.pathname === '/immunization-outpatient-form' ? 'active' : ''}`}
          >
           Immunization Outpatient Record
          </Link>
        </li>
       

        <li>
          <Link
            to="/follow-up-review-Outpatient"
            className={`pediatric-inpatient-nav-button ${location.pathname === '/follow-up-review-Outpatient' ? 'active' : ''}`}
          >
         Register
          </Link>
        </li> 



         <li>
          <Link
            to="/follow-up-review-Outpatient"
            className={`pediatric-inpatient-nav-button ${location.pathname === '/follow-up-review-Outpatient' ? 'active' : ''}`}
          >
          FollowUpReview Outpatient Form
          </Link>
        </li>
 

       
        <li>
          <Link
            to="/consentlegal-outpatient"
            className={`pediatric-inpatient-nav-button ${location.pathname === '/consentlegal-outpatient' ? 'active' : ''}`}
          >
          ConsentLegal Outpatient Forms
          </Link>
        </li>

        <li>
          <Link
            to="/discharge-Outpatient"
            className={`pediatric-inpatient-nav-button ${location.pathname === '/discharge-Outpatient' ? 'active' : ''}`}
          >
           DischargeSummary  Outpatient Form
          </Link>
        </li>
        
       
       </ul>
    </nav>  */}
    </>
  );
};

export default PaediatricOutPatientNavbar;
