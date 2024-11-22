import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PACRequest.css';

const PACRequest = () => {
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [consultant, setConsultant] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [anaesthesiaPlan, setAnaesthesiaPlan] = useState('');
  const [surgeryName, setSurgeryName] = useState('');
  const [pacAdviceNotes, setPacAdviceNotes] = useState('');
  const [mrNo,setMrNo]=useState("");

  const [pacRequests, setPacRequests] = useState([]);  // State to store fetched PAC requests

  const handleCancel = () => {
    setPatientId('');
    setPatientName('');
    setAge('');
    setGender('');
    setAddress('');
    setRoomNo('');
    setConsultant('');
    setDiagnosis('');
    setAnaesthesiaPlan('');
    setSurgeryName('');
    setPacAdviceNotes('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      mrNo,  // Use patientId as MR number
      patientName,
      roomNoBedNo: roomNo,
      consultant,
      diagnosis,
      anaesthesiaPlan,
      surgeryName,
      pacAdviceNotes,
      patientId: 1  // Send only the patientId (not the full patient object)
    };
  
    try {
      // Send POST request to backend
      await axios.post('http://192.168.0.110:9000/api/pac-requests', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('PAC request submitted:', formData);
      alert('PAC request submitted successfully!');
      
      // Optionally reset the form after successful submission
      handleCancel();
  
      // Fetch the updated list of PAC requests
      fetchPACRequests();
    } catch (error) {
      console.error('Error submitting PAC request:', error);
      alert('Failed to submit PAC request.');
    }
  };
  

  // Fetch all PAC requests
  const fetchPACRequests = async () => {
    try {
      const response = await axios.get('http://192.168.0.110:9000/api/pac-requests/patient/1');
      setPacRequests(response.data); // Store fetched PAC requests in state
    } catch (error) {
      console.error('Error fetching PAC requests:', error);
    }
  };

  // Fetch PAC requests when the component mounts
  useEffect(() => {
    fetchPACRequests();
  }, []);  // Empty dependency array means this runs once when the component mounts

  return (
    <div className="PACRequest-form-container">
      <h3>Post-Acute Care (PAC) Request Form</h3>

      {/* Display existing PAC requests */}
      

      {/* PAC Request Form */}
      <form onSubmit={handleSubmit}>
        <div className="PACRequest-form-group-content">
          <div className="PACRequest-form-group-left">
            <div className="PACRequest-form-group">
              <label htmlFor="patientId">Patient ID</label>
              <input
                type="text"
                id="patientId"
                value={mrNo}
                onChange={(e) => setMrNo(e.target.value)}
                required
              />
            </div>

            <div className="PACRequest-form-group">
              <label htmlFor="patientName">Patient Name</label>
              <input
                type="text"
                id="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>

            <div className="PACRequest-form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="PACRequest-form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="PACRequest-form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="PACRequest-form-group">
              <label htmlFor="roomNo">Room No./Bed No.</label>
              <input
                type="text"
                id="roomNo"
                value={roomNo}
                onChange={(e) => setRoomNo(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="PACRequest-form-group-right">
            <div className="PACRequest-form-group">
              <label htmlFor="consultant">Consultant</label>
              <input
                type="text"
                id="consultant"
                value={consultant}
                onChange={(e) => setConsultant(e.target.value)}
                required
              />
            </div>

            <div className="PACRequest-form-group">
              <label htmlFor="diagnosis">Diagnosis</label>
              <textarea
                id="diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                required
              />
            </div>

            <div className="PACRequest-form-group">
              <label htmlFor="anaesthesiaPlan">Anaesthesia Plan</label>
              <select
                id="anaesthesiaPlan"
                value={anaesthesiaPlan}
                onChange={(e) => setAnaesthesiaPlan(e.target.value)}
                required
              >
                <option value="">Select Anaesthesia Plan</option>
                <option value="General">General Anaesthesia</option>
                <option value="Local">Local Anaesthesia</option>
                <option value="Regional">Regional Anaesthesia</option>
              </select>
            </div>

            <div className="PACRequest-form-group">
              <label htmlFor="surgeryName">Surgery Name</label>
              <select
                id="surgeryName"
                value={surgeryName}
                onChange={(e) => setSurgeryName(e.target.value)}
                required
              >
                <option value="">Select Surgery</option>
                <option value="Appendectomy">Appendectomy</option>
                <option value="Cholecystectomy">Cholecystectomy</option>
                <option value="Knee Replacement">Knee Replacement</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="PACRequest-form-group">
              <label htmlFor="pacAdviceNotes">PAC Advice Notes</label>
              <textarea
                id="pacAdviceNotes"
                value={pacAdviceNotes}
                onChange={(e) => setPacAdviceNotes(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="PACRequest-form-group-buttons">
          <button type="button" onClick={handleCancel} className="PACRequest-cancel-btn">
            Cancel
          </button>
          <button type="submit" className="PACRequest-submit-btn">
            Submit
          </button>
        </div>
      </form>

      <div className="PACRequest-existing-requests">
        <h4>Existing PAC Requests:</h4>
        {pacRequests.length > 0 ? (
          <ul>
            {pacRequests.map((request) => (
              <li key={request.sn}>
                <strong>Patient Name:</strong> {request.patientName}, 
                <strong>Surgery:</strong> {request.surgeryName}, 
                <strong>Consultant:</strong> {request.consultant}, 
                <strong>Room No./Bed No.:</strong> {request.roomNoBedNo}, 
                <strong>Diagnosis:</strong> {request.diagnosis}, 
                <strong>Anaesthesia Plan:</strong> {request.anaesthesiaPlan}
              </li>
            ))}
          </ul>
        ) : (
          <p>No PAC requests found.</p>
        )}
      </div>
    </div>
  );
};

export default PACRequest;
