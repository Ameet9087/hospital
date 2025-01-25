import React, { useState, useEffect } from 'react';
import './patienttransport.css';
import CustomModal from '../../../../CustomModel/CustomModal';
import { API_BASE_URL } from '../../../api/api';

const PatientTransportForm = () => {
  const [formData, setFormData] = useState({

    patient: {
      patientId: '',
      name: ''
    },

    transportDate: '',
    transportTime: '',
    fromLocation: '',
    toLocation: '',
    reasonForTransport: '',
    modeOfTransport: '',
    transportStaffAssigned: '',
    ambulanceDTO: {
      ambulanceId: '',
      driver: '',
    },
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ambulanceData, setAmbulanceData] = useState([]);



  useEffect(() => {
    const fetchAmbulanceData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/ambulances/available`);
        const data = await response.json();
        setAmbulanceData(data);
      } catch (error) {
        console.error('Error fetching ambulance data:', error);
      }
    };

    fetchAmbulanceData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('ambulanceDTO')) {
      const key = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        ambulanceDTO: {
          ...prevData.ambulanceDTO,
          [key]: value,
        },
      }));
    } else if (name === 'patientId' || name === 'patientName') {
      setFormData((prevData) => ({
        ...prevData,
        patient: {
          ...prevData.patient,
          [name === 'patientId' ? 'patientId' : 'name']: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleModeOfTransportChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      modeOfTransport: value,
      ambulanceDTO: {
        ambulanceId: '',
        driver: ''
      }
    }));

    if (value === 'Ambulance') {
      const firstAvailableAmbulance = ambulanceData.find(
        (ambulance) => ambulance.status === 'Available'
      );

      if (firstAvailableAmbulance) {
        setFormData((prevData) => ({
          ...prevData,
          ambulanceDTO: {
            ambulanceId: firstAvailableAmbulance.ambulanceId.toString(),
            driver: firstAvailableAmbulance.driver
          }
        }));
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Transform formData to match backend requirements
    const payload = {
      transportDate: formData.transportDate,
      transportTime: formData.transportTime,
      fromLocation: formData.fromLocation,
      toLocation: formData.toLocation,
      reasonForTransport: formData.reasonForTransport,
      modeOfTransport: formData.modeOfTransport,
      transportStaffAssigned: formData.transportStaffAssigned,
      additionalNotes: formData.additionalNotes,
      patientDTO: {
        id: formData.patient.patientId, // Map patientId to patientDTO.id
      },
      ambulanceDTO: {
        ambulanceId: formData.ambulanceDTO.ambulanceId, // Update this if you have the ambulance ID available
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/transport/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Use transformed payload
      });

      let result;
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        result = await response.text(); // Handle non-JSON responses
      }

      if (!response.ok) {
        throw new Error(result || `Error ${response.status}: ${response.statusText}`);
      }

      console.log(result);
      alert('Transport details saved successfully!');
      setFormData({
        patient: {
          patientId: '',
          name: '',
        },
        transportDate: '',
        transportTime: '',
        fromLocation: '',
        toLocation: '',
        reasonForTransport: '',
        modeOfTransport: '',
        transportStaffAssigned: '',
        ambulanceDTO: {
          ambulanceId: '',
          driver: '',
        },
        additionalNotes: '',
      });
    } catch (error) {
      console.error('Error while saving data:', error);
      alert('An error occurred: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };




  return (
    <div className="patient-transport-container">

    </div>
  );
};

export default PatientTransportForm;
