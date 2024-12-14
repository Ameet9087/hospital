import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './wardNurseDashboard.css';
import { useDispatch } from 'react-redux';
import { setPatientData } from '../ReduxNursing/patientSlice';
import { API_BASE_URL } from '../../../api/api';

const WardNurseDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('admitted');
  const [admittedPatients, setAdmittedPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const panels = [
    { id: 'admitted', title: 'Admitted Patients', count: admittedPatients.length },
    { id: 'receiving', title: 'Ward Receiving', count: 4 },
    { id: 'nursing', title: 'Initial Nursing Assessment', count: 0 },
    { id: 'daily', title: 'Daily Assessment', count: 0 },
    { id: 'reassessment', title: 'Re Assessment After 5 Days', count: 0 },
    { id: 'devices', title: 'Devices Expired', count: 0 },
    { id: 'pharmacy', title: 'Pending Pharmacy Indent', count: 0 },
    { id: 'orders', title: 'Pending Orders', count: 0 },
    { id: 'referrals', title: 'Pending Referrals', count: 0 },
    { id: 'pain', title: 'Pain Score > 2', count: 0 }
  ];

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get(`${API_BASE_URL}/ip-admissions`)
      .then(response => {
        setAdmittedPatients(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const handlePatientClick = (patient) => {
    dispatch(setPatientData(patient));
    navigate('/nursing/patient-dashboard', {
      state: {
        patientName: patient.patient.firstName,
        patientAge: patient.patient.age,
        patientGender: patient.patient.gender,
        mrNo: patient.patient.uhid
      }
    });
  };
  

  const renderPatientCard = (patient) => (
    <div
      key={patient.ipAdmmissionId}
      className={`wardNurseDashboard-patient-card ${activeTab === 'admitted' ? 'clickable' : ''}`}
      onClick={() => handlePatientClick(patient)}
    >
      <div className={`wardNurseDashboard-patient-marker ${patient.financials.typeAdmission === 'General' ? 'wardNurseDashboard-marker-red' : 'wardNurseDashboard-marker-blue'}`}>
        {patient.patient.uhid}
      </div>
      <div className="wardNurseDashboard-patient-info">
        <div className="wardNurseDashboard-patient-primary">
          <div className="wardNurseDashboard-patient-name">
            {`${patient.patient.firstName} ${patient.patient.lastName}`}
          </div>
          <div className="wardNurseDashboard-patient-identifiers">
            <span>UHID - {patient.patient.uhid}</span>
            <span>Age: {patient.patient.age} Years</span>
            <span>{patient.patient.gender}</span>
          </div>
        </div>
        <div className="wardNurseDashboard-patient-secondary">
          <div className="wardNurseDashboard-info-row">
            <label>Admission Date:</label>
            <span>{patient.financials.issued}</span>
          </div>
          <div className="wardNurseDashboard-info-row">
            <label>Room:</label>
            <span>{patient.roomDetails.roomDTO.roomNumber}</span>
          </div>
          <div className="wardNurseDashboard-info-row">
            <label>Doctor:</label>
            <span>{patient.admissionUnderDoctorDetail.consultantDoctor.doctorName}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPanelContent = (panelId) => {
    if (panelId === 'admitted') {
      if (loading) {
        return <div>Loading...</div>;
      }
      if (error) {
        return <div>{error}</div>;
      }
      return (
        <div className="wardNurseDashboard-panel-content">
          {admittedPatients.map(renderPatientCard)}
        </div>
      );
    }
    return <div className="wardNurseDashboard-panel-content empty"></div>;
  };

  return (
    <div className="wardNurseDashboard-container">
      <header className="wardNurseDashboard-header">
        <div className="wardNurseDashboard-header-left">
          <div className="wardNurseDashboard-hospital-logo"></div>
          <div className="wardNurseDashboard-hospital-info">
            <h1>Lopmudra Hospital</h1>
            <h2>Wards Nurse Working Dashboard</h2>
          </div>
        </div>
        {/* <div className="wardNurseDashboard-header-icons">
          <button className="wardNurseDashboard-icon-btn patient">Patient</button>
          <button className="wardNurseDashboard-icon-btn bed">Bed Tr.</button>
          <button className="wardNurseDashboard-icon-btn wards">Wards</button>
          <button className="wardNurseDashboard-icon-btn food">Food M.</button>
          <button className="wardNurseDashboard-icon-btn nursing">Nursing</button>
          <button className="wardNurseDashboard-icon-btn daily">Daily P.</button>
          <button className="wardNurseDashboard-icon-btn discharge">Discharge</button>
          <button className="wardNurseDashboard-icon-btn reports">Reports</button>
          <button className="wardNurseDashboard-icon-btn settings">Settings</button>
        </div> */}
      </header>

      <main className="wardNurseDashboard-dashboard-content">
        <div className="wardNurseDashboard-panels-grid">
          {panels.map(panel => (
            <div key={panel.id} className={`wardNurseDashboard-panel ${activeTab === panel.id ? 'active' : ''}`}>
              <div className="wardNurseDashboard-panel-header" onClick={() => setActiveTab(panel.id)}>
                <span className="wardNurseDashboard-panel-count">{panel.count}</span>
                <span className="wardNurseDashboard-panel-title">{panel.title}</span>
                <button className="wardNurseDashboard-info-icon">?</button>
              </div>
              {renderPanelContent(panel.id)}
            </div>
          ))}
        </div>
      </main>

      <footer className="wardNurseDashboard-footer">
        <div className="wardNurseDashboard-footer-left">
          <span>Screen Search</span>
          <button className="wardNurseDashboard-btn-adv-search">Adv Search</button>
          <div className="wardNurseDashboard-search-box">
            <input type="text" placeholder="Enter MR No" />
            <button className="wardNurseDashboard-btn-go">Go</button>
            <button className="wardNurseDashboard-btn-home">🏠</button>
          </div>
        </div>
        <div className="wardNurseDashboard-footer-center">
          <span className="wardNurseDashboard-current-date">13/11/2024</span>
          <button className="wardNurseDashboard-btn-refresh">Refresh</button>
        </div>
        <div className="wardNurseDashboard-footer-right">
          <select className="wardNurseDashboard-cubicle-select">
            <option>Cubicle: -Select-</option>
          </select>
          <button className="wardNurseDashboard-btn-exit">Exit</button>
        </div>
      </footer>
    </div>
  );
};

export default WardNurseDashboard;