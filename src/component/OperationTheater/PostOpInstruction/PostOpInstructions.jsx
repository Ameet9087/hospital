import React, { useState, useEffect } from 'react';
import './PostOpInstructions.css';
import { API_BASE_URL } from "../../api/api"

// const baseURL = 'http://192.168.210.48:8080'; 

const fetchSurgeryEvents = async () => {
  try {
    const response = await fetch(`${ API_BASE_URL }/surgery-events`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching surgery events:', error);
    return [];
  }
};

const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true, message: 'Data submitted successfully!' };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'Error submitting data!' };
    }
  } catch (error) {
    console.error('Error during POST request:', error);
    return { success: false, message: 'An error occurred during submission.' };
  }
};

const PostOpInstructions = () => {
  const [surgeryEvents, setSurgeryEvents] = useState([]);
  const [patientData, setPatientData] = useState({
    surgeryEventId: '',
    npoFor: '',
    positionOfPatient: '',
    ivFluids: '',
    careOfWound: '',
    postOpMonitoring: '',
    oxygenAdministration: '',
    o2ByFaceMask: '',
    nasalProngs: '',
    consultantDoctor: '',
    assistantNurse: '',
  });

  // Fetch surgery events on component mount
  useEffect(() => {
    const fetchAndSetSurgeryEvents = async () => {
      const events = await fetchSurgeryEvents();
      setSurgeryEvents(events);
    };

    fetchAndSetSurgeryEvents();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Update form fields when surgery event is selected
    if (name === 'surgeryEventId' && value) {
      const selectedEvent = surgeryEvents.find((event) => event.surgeryEventId.toString() === value);

      if (selectedEvent) {
        setPatientData((prevData) => ({
          ...prevData,
          firstName: selectedEvent.operationBookingDTO?.ipAdmissionDTO?.patient?.patient?.firstName || 'N/A',
          lastName: selectedEvent.operationBookingDTO?.ipAdmissionDTO?.patient?.patient?.lastName || 'N/A',
          ipNo: selectedEvent.operationBookingDTO?.ipAdmissionDTO?.patient?.inPatientId || 'N/A',
          gender: selectedEvent.operationBookingDTO?.ipAdmissionDTO?.patient?.patient?.gender || 'N/A',
          uhidNo: selectedEvent.operationBookingDTO?.ipAdmissionDTO?.patient?.patient?.uhid || 'N/A',
          doa: selectedEvent.operationBookingDTO?.ipAdmissionDTO?.admissionDate || 'N/A',
          doctorName: selectedEvent.docterDTO?.doctorName || 'N/A',
          consultantDoctor: selectedEvent.operationBookingDTO?.ipAdmissionDTO?.admissionUnderDoctorDetail?.consultantDoctor?.doctorName || 'N/A',
        }));
      }
    }
  };

  // Validate required fields
  const validateFields = () => {
    for (const [key, value] of Object.entries(patientData)) {
      if (
        key !== 'assistantNurse' && 
        key !== 'oxygenAdministration' && 
        String(value).trim() === ''
      ) {
        alert(`Please fill in the ${key.replace(/([A-Z])/g, ' $1')} field.`);
        return false;
      }
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validateFields()) return;
  
    // Prepare the data to submit, making sure to include only the required fields
    const dataToSubmit = {
      npofor: patientData.npoFor,
      ivFluids: patientData.ivFluids,
      careOfWound: patientData.careOfWound,
      postOpMonitoring: patientData.postOpMonitoring,
      o2ByFaceMask: patientData.o2ByFaceMask,
      nasalProngs: patientData.nasalProngs,
      surgeryEventDTO: {
        surgeryEventId: patientData.surgeryEventId,
      },
    };
  
    const apiUrl = `${API_BASE_URL}/post-op-instructions`;
    const result = await postData(apiUrl, dataToSubmit);
  
    if (result.success) {
      alert(result.message);
      // Reset form after successful submission
      setPatientData({
        surgeryEventId: '',
        npoFor: '',
        positionOfPatient: '',
        ivFluids: '',
        careOfWound: '',
        postOpMonitoring: '',
        oxygenAdministration: '',
        o2ByFaceMask: '',
        nasalProngs: '',
        consultantDoctor: '',
        assistantNurse: '',
      });
    } else {
      alert(result.message);
    }
  };
  
  return (
    <div className="oppostinstruction_container">
      <form className="oppostinstruction_panel" onSubmit={handleSubmit}>
        <div className="oppostinstruction_field">
          <label htmlFor="surgeryEventId">Surgery Event ID:</label>
          <select
            id="surgeryEventId"
            name="surgeryEventId"
            value={patientData.surgeryEventId}
            onChange={handleInputChange}
          >
            <option value="">Select Surgery Event</option>
            {surgeryEvents.map((event) => (
              <option key={event.surgeryEventId} value={event.surgeryEventId}>
                {event.surgeryEventId}
              </option>
            ))}
          </select>
        </div>

        {/* Form fields for personal details */}
        {['firstName', 'lastName', 'ipNo', 'gender', 'uhidNo', 'doa', 'consultantDoctor', 'doctorName'].map((field) => (
          <div key={field} className="oppostinstruction_field">
            <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}:</label>
            <input
              type="text"
              id={field}
              name={field}
              value={patientData[field]}
              onChange={handleInputChange}
              readOnly
            />
          </div>
        ))}

        {/* Additional fields for post-op instructions */}
        {['npoFor', 'positionOfPatient', 'ivFluids', 'careOfWound', 'postOpMonitoring'].map((field) => (
          <div key={field} className="oppostinstruction_field">
            <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}:</label>
            <input
              type="text"
              id={field}
              name={field}
              value={patientData[field]}
              onChange={handleInputChange}
            />
          </div>
        ))}

        <h3 className="oppostinstruction_panel_title">Oxygen Administration</h3>
        {['o2ByFaceMask', 'nasalProngs'].map((field) => (
          <div key={field} className="oppostinstruction_field">
            <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}:</label>
            <input
              type="text"
              id={field}
              name={field}
              value={patientData[field]}
              onChange={handleInputChange}
            />
          </div>
        ))}

        <button type="submit" className='oppostinstruction-submit-button'>Submit</button>
      </form>
    </div>
  );
};

export default PostOpInstructions;
