import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import './ProvisinalDischargeList.css';

function ProvisionalDischargeList() {
  const [dischargeList, setDischargeList] = useState([
    {
      id: 1,
      ipNumber: 'IP001',
      name: 'Charlie Wilson',
      age: '50',
      contact: '1231231234',
      wardBed: 'Ward 1 / Bed 5',
      depositAmt: '$500',
      admittedOn: '2024-08-25',
      provDischargeOn: '2024-09-05',
      provDischargeBy: 'Dr. Smith',
      remark: 'Needs further observation',
    },
    {
      id: 2,
      ipNumber: 'IP002',
      name: 'Dana White',
      age: '45',
      contact: '5675675678',
      wardBed: 'Ward 2 / Bed 3',
      depositAmt: '$300',
      admittedOn: '2024-08-20',
      provDischargeOn: '2024-09-02',
      provDischargeBy: 'Dr. Johnson',
      remark: 'Scheduled for follow-up',
    },
  ]);

  const navigate = useNavigate();

  const handleActionClick = (patient) => {
    console.log(`Action clicked for patient: ${patient.name}`);
    navigate('/DischargeDetailView', { state: { patient } });
  };

  return (
    <div className="provisional_discharge_list">
      <div className='provisional_discharge_search_print'>
        <div className="provisional_discharge_search_bar">
          <input
            type="text"
            placeholder="Search by patient name"
            className="provisional_discharge_input_search_bar"
          />
          <button className="provisional_discharge_searchbar_btn">
            <FaSearch style={{ color: 'black', fontSize: '18px' }} />
          </button>
        </div>

        <div className='provisional_discharge_print'>
          <button className='provisional_discharge_print_btn'>
            Print
          </button>
        </div>
      </div>

      <table className="provisional_discharge_table">
        <thead>
          <tr>
            <th>IP Number</th>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Contact</th>
            <th>Ward/Bed</th>
            <th>Deposit Amt</th>
            <th>Admitted On</th>
            <th>Prov. Discharge On</th>
            <th>Prov. Discharge By</th>
            <th>Remark</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dischargeList.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.ipNumber}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.contact}</td>
              <td>{patient.wardBed}</td>
              <td>{patient.depositAmt}</td>
              <td>{moment(patient.admittedOn).format('YYYY-MM-DD')}</td>
              <td>{moment(patient.provDischargeOn).format('YYYY-MM-DD')}</td>
              <td>{patient.provDischargeBy}</td>
              <td>{patient.remark}</td>
              <td>
                <button
                  className="provisional_discharge_action_btn"
                  onClick={() => handleActionClick(patient)}
                >
                  View Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProvisionalDischargeList;
