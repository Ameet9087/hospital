 /* prachi parab user interface changed  14/9 */
 
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './RegisterPatient.css'; // Add your CSS for styling
import PatientRegistration from './PatientRegistration';
import AddressPage from './AddressPage';
import GuarantorPage from './GuarantorPage';
import InsurancePage from './InsurancePage'; // Import the new InsurancePage component
import EmergencyContactPage from './EmergencyContactPage';
import UploadPhotoPage from './UploadPhoto';
import { API_BASE_URL } from '../api/api';

function RegisterPatient() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic-info');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const[patientIds,setPatientIds]=useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
      patientData: {},
      addressData: {},
      guarantorData: {},
      insuranceData: {},
      emergencyContactData: {},
      uploadPhotoData: {}
    });

  const {id}=useParams();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const id = location?.state?.patient?.patientId;
    setPatientIds(id);
  
    if (location?.state && location?.state?.patient) {
      const patient = location.state.patient;
      setFormData({
        patientData: {
          address: patient.address || '',
          age: patient.age || '',
          bloodGroup: patient.bloodGroup || '',
          country: patient.country || '',
          dateOfBirth: patient.dateOfBirth || '',
          dialysisPatient: patient.dialysisPatient || false,
          email: patient.email || '',
          emergencyContactDTO: patient.emergencyContactDTO || {},
          employerInfo: patient.employerInfo || '',
          firstName: patient.firstName || '',
          gender: patient.gender || '',
          guarantorDTO: patient.guarantorDTO || {},
          insuranceDTO: patient.insuranceDTO || {},
          isIpd: patient.isIpd ||"Yes",
          landlineNumber: patient.landlineNumber || '',
          lastName: patient.lastName || '',
          maritalStatus: patient.maritalStatus || '',
          middleName: patient.middleName || '',
          notifications: patient.notifications || false,
          occupation: patient.occupation || '',
          adharCardId:patient.adharCardId||'',
          passportNumber: patient.passportNumber || '',
          phoneNumber: patient.phoneNumber || '',
          pinCode: patient.pinCode || '',
          previousLastName: patient.previousLastName || '',
          race: patient.race || '',
          religion: patient.religion || '',
          salutation: patient.salutation || '',
          state: patient.state || '',
        },
        addressData: patient.addressDTO || {},
        guarantorData: patient.guarantorDTO || {},
        insuranceData: patient.insuranceDTO || {},
        emergencyContactData: patient.emergencyContactDTO || {},
        uploadPhotoData:patient.uploadPhotoDTO || {},
      });
      setActiveTab('basic-info'); // Set the active tab based on the incoming data
    }
  }, [location?.state]);
  

  const openCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsCameraOpen(true);
        }
      })
      .catch(error => {
        console.error('Error accessing camera', error);
      });
  };

  const takePicture = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      setImageSrc(canvasRef.current.toDataURL('image/png'));
      setIsCameraOpen(false);
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    }
  };

  const handlePatientData = (data) => {
    setFormData(prevState => ({
      ...prevState,
      patientData: data,
    }));
  };

  const handleAddressData = (data) => {
    setFormData(prevState => ({
      ...prevState,
      addressData: data,
    }));
  };

  const handleGuarantorData = (data) => {
    setFormData(prevState => ({
      ...prevState,
      guarantorData: data,
    }));
  };

  const handleInsuranceData = (data) => {
    setFormData(prevState => ({
      ...prevState,
      insuranceData: data,
    }));
  };

  const handleEmergencyContactData = (data) => {
    setFormData(prevState => ({
      ...prevState,
      emergencyContactData: data,
    }));
  };

  const handleUploadPhotoData = (data) => {
    setFormData(prevState => ({
      ...prevState,
      uploadPhotoData: data,
    }));
   
  };


  const handleRegisterPatient = async () => {
    // Check if all tabs have data (optional validation)
    const { patientData, addressData, guarantorData, insuranceData, emergencyContactData,uploadPhotoData } = formData;
    if (!patientData || !addressData || !guarantorData || !insuranceData || !emergencyContactData || !uploadPhotoData) {
      alert('Please complete all sections before registering.');
      return;
    }

    // Combine all form data
    const dataToSubmit = {
      ...patientData,
      addresses : addressData,
      guarantor: guarantorData,
      insurance: insuranceData,
      emergencyContact: emergencyContactData,
      isIPD:"IPD"
    };

    try {
      console.log(dataToSubmit);
      
      const url = isEditMode 
        ? `${API_BASE_URL}/inpatients/update/${patientData.id}` // Adjust the endpoint for update
        : `${API_BASE_URL}/patients/inpatient/register`; // Endpoint for adding new patient

      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      alert(isEditMode ? 'Patient data updated successfully' : 'Patient registered successfully');
      console.log('Operation successful:');

      // Optionally reset form data or redirect the user
      setFormData({
        patientData: {},
        addressData: {},
        guarantorData: {},
        insuranceData: {},
        emergencyContactData: {},
        uploadPhotoData: {}
      });
      setActiveTab('basic-info'); // Optionally reset active tab to default
      navigate('/patient/searchpatient'); // Redirect to the home page or wherever appropriate

    } catch (error) {
      console.error('Error handling patient data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
 <div className="register-patient">
      <div className="register-patient-content">
        <PatientRegistration sendpatientdata={handlePatientData}  patientData={formData.patientData} />
        <AddressPage sendaddressdata={handleAddressData} addressData={formData.addressData} />
        <GuarantorPage sendguarantordata={handleGuarantorData} guarantorData={formData.guarantorData} />
        <InsurancePage sendinsurancedata={handleInsuranceData} insuranceData={formData.insuranceData} />
        <EmergencyContactPage sendemergencycontactdata={handleEmergencyContactData} emergencyData={formData.emergencyContactData} />
        {/* <UploadPhotoPage sendUploadPhotodata={handleUploadPhotoData} uploadphotodata={formData.uploadPhotoData} /> */}

        {isCameraOpen && (
          <div className="register-patient-camera-container">
            <video ref={videoRef} autoPlay></video>
            <button onClick={takePicture} className="register-patient-capture-btn">Take Photo</button>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </div>
        )}

        {!isCameraOpen && imageSrc && (
          <div className="register-patient-image-preview">
            <img src={imageSrc} alt="Captured" className="register-patient-captured-image" />
          </div>
        )}
        <button className='register-button' onClick={handleRegisterPatient}>Register Patient</button>
      </div>
    </div>
  );
}

export default RegisterPatient;
