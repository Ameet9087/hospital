import React, { useState } from 'react';
import { FaUser, FaSearch } from 'react-icons/fa';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import './out_patient_under.css';

function Outpatientander() {
  const [outPatientList, setOutPatientList] = useState([
    { id: 1, scheme: 'Scheme A', name: 'Alice Johnson', ageSex: '40/F', contact: '1234567890', lastBillDate: '2024-08-20', total: '$200' },
    { id: 2, scheme: 'Scheme B', name: 'Bob Brown', ageSex: '35/M', contact: '0987654321', lastBillDate: '2024-08-18', total: '$350' },
  ]);

  const navigate = useNavigate();

  const handleActionClick = (patient) => {
    console.log(`Action clicked for patient: ${patient.name}`);
    navigate('/Outpatientview', { state: { patient } });
  };

  return (
    <div className="out_patient_under-list">
      <div className="out_patient_under-nav-content">
        {/* <div className="out_patient_under-checkbox-container">
          <div>
            <FaUser style={{ color: '#007bff', fontSize: '20px' }} />
            <label htmlFor="out_patient_underDateFilter" className="out_patient_under-label">
              Outpatient and ER Patient List
            </label>
          </div>
        </div> */}
      </div>

      <div className='out_patient_under-search-print' style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="out_patient_under-search-bar">
          <input
            type="text"
            placeholder="Search by patient name"
            className="out_patient_under-inputsearchbar"
          />
          <button className="out_patient_under-searchbar-btn">
            <FaSearch style={{ color: 'black', fontSize: '18px' }} />
          </button>
        </div>

        <div className='out_patient_under-print'>
          <button className='out_patient_under-print-btn'>
            Print
          </button>
        </div>
      </div>

      <table className="out_patient_under-table">
        <thead>
          <tr>
            <th>Scheme</th>
            <th>Patient Name</th>
            <th>Age/Sex</th>
            <th>Contact</th>
            <th>Last Bill Date</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {outPatientList.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.scheme}</td>
              <td>{patient.name}</td>
              <td>{patient.ageSex}</td>
              <td>{patient.contact}</td>
              <td>{moment(patient.lastBillDate).format('YYYY-MM-DD')}</td>
              <td>{patient.total}</td>
              <td>
                <button
                  className="out_patient_under-action-btn"
                  onClick={() => handleActionClick(patient)}
                >
                  View Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="out_patient_under-pagination">
        <button className="out_patient_under-pagination-btn">First</button>
        <button className="out_patient_under-pagination-btn">Previous</button>
        <span>Page 1 of 4</span>
        <button className="out_patient_under-pagination-btn">Next</button>
        <button className="out_patient_under-pagination-btn">Last</button>
      </div> */}
    </div>
  );
}

export default Outpatientander;
