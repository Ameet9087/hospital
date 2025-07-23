import React, { useState, useEffect } from 'react';

// import CustomModal from '../../../../CustomModel/CustomModal';
// import DispatchForm from '../../Ambulance/DispatchForm';
import CustomModal from '../../../CustomModel/CustomModal';
import DispatchForm from './DispatchForm';
import { API_BASE_URL } from '../../api/api';

function TransportList() {
  // State to hold patients data and loading/error states
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [modalType, setModalType] = useState(null);

  const [formData, setFormData] = useState({
    patient: { patientId: '', name: '' },
    transportDate: '',
    transportTime: '',
    fromLocation: '',
    toLocation: '',
    reasonForTransport: '',
    modeOfTransport: '',
    transportStaffAssigned: '',
    additionalNotes: '',
    ambulanceDTO: { ambulanceId: '', driver: '' }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPatient,setSelectedPatient]=useState([]);

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/emergency/all`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPatients(data); // Update state with fetched data
      } catch (error) {
        setError(error.message); // Handle any errors
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchPatients(); // Call the fetch function
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleModeOfTransportChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      modeOfTransport: value,
      // Reset ambulance details if mode is not ambulance
      ambulanceDTO: value === 'Ambulance' 
        ? prev.ambulanceDTO 
        : { ambulanceId: '', driver: '' }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Add your form submission logic here
      // const response = await fetch('your-api-endpoint', {...});
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTransportFormOpen=(patient)=>{
    setSelectedPatient(patient);
    setFormData({
      ...formData,
      patient:{
          patientId:patient.patientId || '',
          name:patient.patientName || ''
      },
      transportDate: '',
      transportTime: '',
      fromLocation: patient?.pickUpLocation,
      toLocation: patient?.destinationLocation,
      reasonForTransport: '',
      modeOfTransport: '',
      transportStaffAssigned: '',
      additionalNotes: '',
      ambulanceDTO: { ambulanceId: '', driver: '' },
    });

    setModalType('transport');
    setIsOpen(true); 

  }


  const handleDispatchFormOpen=(patient)=>{
    setSelectedPatient(patient);
    setFormData({
      ...formData,
      patient:{
          patientId:patient.patientId || '',
          name:patient.patientName || ''
      },
      transportDate: '',
      transportTime: '',
      fromLocation: patient?.pickUpLocation,
      toLocation: patient?.destinationLocation,
      reasonForTransport: '',
      modeOfTransport: '',
      transportStaffAssigned: '',
      additionalNotes: '',
      ambulanceDTO: { ambulanceId: '', driver: '' },
    });

    setModalType('dispatch');
    setIsOpen(true); 

  }

  return (
    <>
    <div className="tansportpatientalllist-container">
      <h2 className="tansportpatientalllist-header">Patient Request Transport List</h2>
      <table className="tansportpatientalllist-table">
        <thead>
          <tr>
          
            <th className="tansportpatientalllist-th">Patient Name</th>
            <th className="tansportpatientalllist-th">Transport Mode</th>
            {/* <th className="tansportpatientalllist-th">Ambulance Driver</th> */}
            <th className="tansportpatientalllist-th">Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patientTransport) => (
            <tr key={patientTransport.id} className="tansportpatientalllist-tr">
              
              <td className="tansportpatientalllist-td">{patientTransport.patientName}</td>
              <td className="tansportpatientalllist-td">{patientTransport.transportMode}</td>
              {/* <td className="tansportpatientalllist-td">{patientTransport.transportStaffAssigned}</td> */}
              {/* <td className="tansportpatientalllist-td">{patientTransport.modeOfTransport === 'Ambulance' ? patientTransport.transportStaffAssigned : 'N/A'}</td> */}
              <td className={`tansportpatientalllist-td ${patientTransport.transportStatus === 'Transported' ? 'transported' : 'not-transported'}`}>
                {patientTransport.status || 'N/A'}
              </td>
              <td>
                {/* <button className="tansportpatientalllist-button" onClick={()=>handleTransportFormOpen(patientTransport)}>
                  Transport Form
                </button> &nbsp;&nbsp; */}

                <button className="tansportpatientalllist-button" onClick={()=>handleDispatchFormOpen(patientTransport)}>
                Dispatch Form
                </button>


              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <CustomModal
      title="Patient Transportation Form"
      isOpen={isOpen}
      onClose={()=>setIsOpen(false)}
      >

{modalType === 'transport' ? (
      <form className="patient-transport-form" onSubmit={handleSubmit}>
        <div className='patient-transport-header-h2'>
          <h2 className="patient-transport-header">Patient Transportation Form</h2>
        </div>

        <div className='patient-transport-form-maindiv'>
          <div className='patient-transport-form-group-subdiv'>
            <div className="patient-transport-form-group">
              <label htmlFor="patientId">Patient ID:</label>
              <input 
                type="text" 
                id="patientId" 
                name="patient.patientId" 
                value={formData.patient?.patientId} 
                onChange={handleChange} 
                required 
                className="patient-transport-input"
              />
            </div>

            <div className="patient-transport-form-group">
              <label htmlFor="patientName">Patient Name:</label>
              <input 
                type="text" 
                id="patient.patientName" 
                name="patientName" 
                value={formData.patient?.name} 
                onChange={handleChange} 
                required 
                className="patient-transport-input"
              />
            </div>

            <div className="patient-transport-form-group">
              <label htmlFor="transportDate">Transport Date:</label>
              <input 
                type="date" 
                id="transportDate" 
                name="transportDate" 
                value={formData.transportDate} 
                onChange={handleChange} 
                required 
                className="patient-transport-input"
              />
            </div>

            <div className="patient-transport-form-group">
              <label htmlFor="transportTime">Transport Time:</label>
              <input 
                type="time" 
                id="transportTime" 
                name="transportTime" 
                value={formData.transportTime} 
                onChange={handleChange} 
                required 
                className="patient-transport-input"
              />
            </div>

            <div className="patient-transport-form-group">
              <label htmlFor="fromLocation">From Location:</label>
              <input 
                type="text" 
                id="fromLocation" 
                name="patient.pickUpLocation" 
                value={formData.fromLocation} 
                onChange={handleChange} 
                required 
                className="patient-transport-input"
              />
            </div>

            <div className="patient-transport-form-group">
              <label htmlFor="toLocation">To Location:</label>
              <input 
                type="text" 
                id="toLocation" 
                name="patient.destinationLocation" 
                value={formData.toLocation} 
                onChange={handleChange} 
                required 
                className="patient-transport-input"
              />
            </div>

            <div className="patient-transport-form-group">
              <label htmlFor="reasonForTransport">Reason for Transport:</label>
              <textarea 
                id="reasonForTransport" 
                name="reasonForTransport" 
                value={formData.reasonForTransport} 
                onChange={handleChange} 
                required 
                className="patient-transport-textarea"
              ></textarea>
            </div>
          </div>

          <div className='patient-transport-form-group-subdiv'>
          <div className="patient-transport-form-group">
          <label htmlFor="modeOfTransport">Mode of Transport:</label>
          <select
            id="modeOfTransport"
            name="modeOfTransport"
            value={formData.modeOfTransport}
            onChange={handleModeOfTransportChange}
            required
            className="patient-transport-select"
          >
            <option value="">Select Mode of Transport</option>
            <option value="Ambulance">Ambulance</option>
            <option value="Wheelchair">Wheelchair</option>
            <option value="Stretcher">Stretcher</option>
          </select>
        </div>

        {/* Auto-Filled Ambulance Details */}
        {formData.modeOfTransport === 'Ambulance' && (
          <div className="ambulance-details-section">
            <h6>Ambulance Details</h6>
            <div className="patient-transport-form-group">
              <label htmlFor="ambulanceNumber">Ambulance Number:</label>
              <input
                type="text"
                id="ambulanceNumber"
                name="ambulanceDTO.ambulanceNumber"
                value={formData.ambulanceDTO?.ambulanceId || ''}
                onChange={handleChange}
                className="patient-transport-input"
                readOnly
              />
            </div>

            <div className="patient-transport-form-group">
              <label htmlFor="driver">Driver's Name:</label>
              <input
                type="text"
                id="driver"
                name="ambulanceDTO.driver"
                value={formData.ambulanceDTO.driver}
                onChange={handleChange}
                required
                readOnly
                className="patient-transport-input"
              />
            </div>
          </div>
        )}

            <div className="patient-transport-form-group">
              <label htmlFor="transportStaffAssigned">Transport Staff Assigned:</label>
              <input 
                type="text" 
                id="transportStaffAssigned" 
                name="transportStaffAssigned" 
                value={formData.transportStaffAssigned} 
                onChange={handleChange} 
                required 
                className="patient-transport-input"
              />
            </div>

            <div className="patient-transport-form-group">
              <label htmlFor="additionalNotes">Additional Notes:</label>
              <textarea 
                id="additionalNotes" 
                name="additionalNotes" 
                value={formData.additionalNotes} 
                onChange={handleChange} 
                className="patient-transport-textarea"
              ></textarea>
            </div>
          </div>
        </div>
        
        <button type="submit" className="patient-transport-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

        ) : modalType === 'dispatch' ? (

        <DispatchForm patientData={selectedPatient} />
        ) : null} 
              </CustomModal>


      
    </>
  );
}

export default TransportList;
