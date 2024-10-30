/* Mohini_HomeHealthCareModule_HomeHealthNavbar_27/sep/24 */
import React,{useState,useEffect,useRef} from 'react';
import { Link, useLocation,useNavigate,useParams } from 'react-router-dom';
import './HomeHealthNavbar.css'; // Make sure to link your CSS file
import PatientRegistrationForm from './PatientRegistrationForm';
import MedicationManagementForm from './MedicationManagementForm';
import CarePlanForm from './CarePlanForm';
import VisitSchedulingForm from './VisitSchedulingForm';
import HealthMonitoringForm from './HealthMonitoringForm';
import BillingAndInsuranceForm from './BillingAndInsuranceForm';
const HomeHealthNavbar = () => {
  const location = useLocation(); // Get the current route location

  const navigate=useNavigate();
  const [patientIds,setPatientIds]=useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('patient-regi');

  const [formData,setFormData]=useState({
    patientdata:{},
    medicationData:{},
    carePlanData:{},
    VisitData:{},
    MonitorData:{},
    billingandInsuranceData:{}
  })

  const {id}=useParams();


  useEffect(()=>{
    const id=location?.state?.patient?.patientId;

    if(location?.state && location?.state?.patient){
      const patient=location.state.patient;
      setFormData({
        patientdata:patient.PatientDTO || {},
        medicationData:patient.MedicationManagementDTO || {},
        carePlanData:patient.CarePlanDTO || {},
        VisitData:patient.VisitScheduleDTO || {},
        MonitorData:patient.HealthMonitoringDTO || {},
        billingandInsuranceData:patient.BillingInsuranceDTO ||{},

      });
      setIsEditMode(true);
      setActiveTab('/');
    }
  },[location?.state])

const handlePatientData=(data)=>{
  setFormData(prevState=>({
    ...prevState,
    patientdata:data,
  }))
}
const handlemedicationData=(data)=>{
  setFormData(prevState=>({
    ...prevState,
    medicationData:data,
  }))
}
  const handlecarePlanData=(data)=>{
    setFormData(prevState=>({
      ...prevState,
      carePlanData:data
    }))
  }
  const handleVisitData=(data)=>{
    setFormData(prevState=>({
      ...prevState,
      VisitData:data,
    }))
  }

  const handleMonitorData=(data)=>{
    setFormData(prevState=>({
      ...prevState,
      MonitorData:data
    }))
  }
  const handleBilling=(data)=>{
    setFormData(prevState=>({
      ...prevState,
      billingandInsuranceData:data,
    }))
  }

  const handleRegisterPatient = async () => {
    const { patientdata, medicationData, carePlanData, VisitData, MonitorData, billingandInsuranceData } = formData;
    
    if (!patientdata || !medicationData || !carePlanData || !VisitData || !MonitorData || !billingandInsuranceData) {
      alert('Please complete all sections before registering');
      return;
    }
  
    const dataToSubmit = {
      PatientDTO: patientdata,
      MedicationManagementDTO: medicationData,
      CarePlanDTO: carePlanData,
      VisitScheduleDTO: VisitData,
      HealthMonitoringDTO: MonitorData,
      BillingInsuranceDTO: billingandInsuranceData
    };
  
    try {
      const url = isEditMode
        ? `http://localhost:8000/api/homeCarePatients/addPatient/${patientdata.id}`
        : `http://localhost:8000/api/homeCarePatients/addPatient`;
  
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',  // Corrected here
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      alert(isEditMode ? 'Patient Data Updated Successfully' : 'Patient Registered Successfully');
    } catch (error) {
      console.error('Error handling patient data:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <>
    <div className="register-patient">
    <div className="menu-homeHealth-care">
      <a href={patientIds ? `#patient-registeration/${patientIds}`:'#patient-registeration'}
      className={`menu-item-homeHealth-care ${activeTab==='patient-registeration' ? 'active' :''}`}
      onClick={()=>setActiveTab('patient-registeration')}
      >Patient Registration</a>

<a href={patientIds ? `#medication/${patientIds}`:'#medication'}
      className={`menu-item-homeHealth-care ${activeTab==='medication' ? 'active' :''}`}
      onClick={()=>setActiveTab('medication')}
      > Medication Management</a>


<a href={patientIds ? `#care-plan/${patientIds}`:'#care-plan'}
      className={`menu-item-homeHealth-care ${activeTab==='care-plan' ? 'active' :''}`}
      onClick={()=>setActiveTab('care-plan')}
      >Care Plan</a>


<a href={patientIds ? `#visit-scheduling/${patientIds}`:'#visit-scheduling'}
      className={`menu-item-homeHealth-care ${activeTab==='visit-scheduling' ? 'active' :''}`}
      onClick={()=>setActiveTab('visit-scheduling')}
      > Visit Scheduling</a>


<a href={patientIds ? `#health-monitor/${patientIds}`:'#health-monitor'}
      className={`menu-item-homeHealth-care ${activeTab==='health-monitor' ? 'active' :''}`}
      onClick={()=>setActiveTab('health-monitor')}
      > Health Monitoring</a>

<a href={patientIds ? `#billing/${patientIds}`:'#billing'}
      className={`menu-item-homeHealth-care ${activeTab==='billing' ? 'active' :''}`}
      onClick={()=>setActiveTab('billing')}
      >  Billing & Insurance</a>




      <a href='#' className='register-button-homeHealth-care' onClick={handleRegisterPatient}>
        {isEditMode?'Update Patient':'Register Home Visit Patient'}
      </a>
    </div>

    <div className="register-patient-content">
        {activeTab === 'patient-registeration' && <PatientRegistrationForm sendpatientdata={handlePatientData}  patientData={formData.patientdata} />}
        {activeTab === 'medication' && <MedicationManagementForm sendMedicationData={handlemedicationData} medicationData={formData.medicationData} />}
        {activeTab === 'care-plan' && <CarePlanForm sendCarePlanData={handlecarePlanData} carePlanData={formData.carePlanData} />}
        {activeTab === 'visit-scheduling' && <VisitSchedulingForm sendVisitData={handleVisitData} VisitData={formData.VisitData} />}
        {activeTab === 'health-monitor' && <HealthMonitoringForm sendMonitorData={handleMonitorData} MonitorData={formData.MonitorData} />}
        {activeTab === 'billing' && <BillingAndInsuranceForm sendBillingInsurance={handleBilling} billingandInsuranceData={formData.billingandInsuranceData} />}
      </div>


    
    </div>
    {/* <nav className="home-health-navbar">
      <ul className="home-health-navbar-list">
        <li>
          <Link 
            to="/" 
            className={`home-health-navbar-button ${location.pathname === '/' ? 'active' : ''}`}
          >
            Patient Registration
          </Link>
        </li>
        <li>
          <Link 
            to="/medication" 
            className={`home-health-navbar-button ${location.pathname === '/medication' ? 'active' : ''}`}
          >
            Medication Management
          </Link>
        </li>
        <li>
          <Link 
            to="/careplan" 
            className={`home-health-navbar-button ${location.pathname === '/careplan' ? 'active' : ''}`}
          >
            Care Plan
          </Link>
        </li>
        <li>
          <Link 
            to="/visitscheduling" 
            className={`home-health-navbar-button ${location.pathname === '/visitscheduling' ? 'active' : ''}`}
          >
            Visit Scheduling
          </Link>
        </li>
        <li>
          <Link 
            to="/healthmonitoring" 
            className={`home-health-navbar-button ${location.pathname === '/healthmonitoring' ? 'active' : ''}`}
          >
            Health Monitoring
          </Link>
        </li>
        <li>
          <Link 
            to="/billing" 
            className={`home-health-navbar-button ${location.pathname === '/billing' ? 'active' : ''}`}
          >
            Billing & Insurance
          </Link>
        </li>
      </ul>
    </nav> */}

    </>
  );
};

export default HomeHealthNavbar;
/* Mohini_HomeHealthCareModule_HomeHealthNavbar_27/sep/24 */
