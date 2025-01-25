import React, { useState, useEffect } from 'react';
import "./patienttransferstatus.css";

import CustomModal from '../../../CustomModel/CustomModal';
import DispatchForm from '../../Ambulance/DispatchForm';

function PatientTransferStatus() {
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
    transportStatus: '',
    modeOfTransport: '',
    transportStaffAssigned: '',
    additionalNotes: '',
    ambulanceDTO: { ambulanceId: '', driver: '' }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState([]);

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/transport/all`);
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
      ambulanceDTO: value === 'Ambulance'
        ? prev.ambulanceDTO
        : { ambulanceId: '', driver: '' }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDispatchFormOpen = (patient) => {
    setSelectedPatient(patient);
    setFormData({
      ...formData,
      patient: {
        patientId: patient.emergencyRequest?.emergencyId || '',
        name: patient.emergencyRequest?.patientName || ''
      },
      transportDate: patient.transportDate || '',
      transportTime: patient.transportTime || '',
      fromLocation: patient.fromLocation || '',
      toLocation: patient.toLocation || '',
      reasonForTransport: patient.reasonForTransport || '',
      transportStatus: patient.transportStatus || '',
      modeOfTransport: patient.modeOfTransport || '',
      transportStaffAssigned: patient.transportStaffAssigned || '',
      additionalNotes: patient.additionalNotes || '',
      ambulanceDTO: patient.ambulanceDTO || { ambulanceId: '', driver: '' },
    });

    setModalType('dispatch');
    setIsOpen(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="tansportpatientalllist-container">
        <h2 className="tansportpatientalllist-header">Patient Transport List</h2>
        <table className="tansportpatientalllist-table">
          <thead>
            <tr>
              <th className="tansportpatientalllist-th">Patient Name</th>
              <th className="tansportpatientalllist-th">Patient Age</th>
              <th className="tansportpatientalllist-th">Transport Date</th>
              <th className="tansportpatientalllist-th">Transport Time</th>
              <th className="tansportpatientalllist-th">From Location</th>
              <th className="tansportpatientalllist-th">To Location</th>
              <th className="tansportpatientalllist-th">Mode of Transport</th>
              <th className="tansportpatientalllist-th">Transport Staff</th>
              <th className="tansportpatientalllist-th">Reason for Transport</th>
              <th className="tansportpatientalllist-th">Status</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="tansportpatientalllist-tr">
                <td className="tansportpatientalllist-td">{patient.emergencyRequest?.patientName}</td>
                <td className="tansportpatientalllist-td">{patient.emergencyRequest?.patientAge}</td>
                <td className="tansportpatientalllist-td">{patient.transportDate}</td>
                <td className="tansportpatientalllist-td">{patient.transportTime}</td>
                <td className="tansportpatientalllist-td">{patient.fromLocation}</td>
                <td className="tansportpatientalllist-td">{patient.toLocation}</td>
                <td className="tansportpatientalllist-td">{patient.modeOfTransport}</td>
                <td className="tansportpatientalllist-td">{patient.transportStaffAssigned}</td>
                <td className="tansportpatientalllist-td">{patient.reasonForTransport}</td>
                <td className="tansportpatientalllist-td">{patient.transportStatus}</td>
                <td>
                  <button
                    className="tansportpatientalllist-button"
                    onClick={() => handleDispatchFormOpen(patient)}
                  >
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
        onClose={() => setIsOpen(false)}
      >
        {modalType === 'dispatch' ? (
          <DispatchForm patientData={selectedPatient} />
        ) : null}
      </CustomModal>
    </>
  );
}

export default PatientTransferStatus;
