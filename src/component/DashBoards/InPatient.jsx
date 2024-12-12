import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { FaStar, FaListAlt, FaSearch } from 'react-icons/fa';
import './InPatient.css';
import PatientDashboard from './PatientDashboard';
import InPatientPage from './InPatientPage';
import { API_BASE_URL } from '../api/api';
import { startResizing } from '../TableHeadingResizing/resizableColumns';

const PatientList = () => {
  const [columnWidths,setColumnWidths] = useState({});
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isPatientOPEN,setIsPatientOPEN] = useState(false)
  const [showOrders, setShowOrders] = useState(false || isPatientOPEN);
  const [selectedDept, setSelectedDept] = useState('');
  const [filterFavourite, setFilterFavourite] = useState(false);
  const [filterPending, setFilterPending] = useState(false);
  const tableRef = useRef();

  // Fetch patients from the API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/inpatients/getAllPatients`);
        const data = await response.json();
        console.log(data);
        
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatients();
  }, []);

  // Filtered patients based on selected department and filters
  const filteredPatients = patients
    .filter(patient => (selectedDept ? patient.dept === selectedDept : true))
    .filter(patient => (filterFavourite ? patient.isFavourite : true)) // Add condition for favourites
    .filter(patient => (filterPending ? patient.isPending : true)); // Add condition for pending list

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setIsPatientOPEN(!isPatientOPEN)
    setShowOrders(false);
  };

  const handleOrdersClick = (patient) => {
    setSelectedPatient(patient);
    setShowOrders(true);
  };

  // Toggle favourite filter
  const toggleFavouriteFilter = () => {
    setFilterFavourite(!filterFavourite);
    setFilterPending(false); // Reset pending filter if needed
  };

  // Toggle pending filter
  const togglePendingFilter = () => {
    setFilterPending(!filterPending);
    setFilterFavourite(false); // Reset favourite filter if needed
  };
  if (showOrders && selectedPatient) {
    return <InPatientPage patient={selectedPatient} />;
  }

  if (isPatientOPEN) {
    return <PatientDashboard patient={selectedPatient} setIsPatientOPEN={setIsPatientOPEN}/>;
  }

  return (
    <div className="InPatient-PatientList">
      <div className="InPatient-PatientContainer">
        <div className="InPatient-PatientLeftSection">
          <div className="InPatient-PatientFilterSection">
            <div className="InPatient-PatientFilterItem" onClick={toggleFavouriteFilter}>
              <FaStar className={`PatientIcon ${filterFavourite ? 'active' : ''}`} />
              <label>★ My Favourite</label>
            </div>
            <div className="PatientFilterItem" onClick={togglePendingFilter}>
              <FaListAlt className={`PatientIcon ${filterPending ? 'active' : ''}`} />
              <label>Pending List</label>
            </div>
          </div>
        </div>
        <div className="InPatient-PatientRightSection">
          <div className="InPatient-PatientSearchBar">
            <select
              className="InPatient-PatientDepartmentFilter"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="Operation Theatre">Operation Theatre</option>
              <option value="Maternity Ward">Maternity Ward</option>
              <option value="Medicine">Medicine</option>
              <option value="Pathology">Pathology</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Gynaecology">Gynaecology</option>
            </select>

            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>

   <div className='patientList-table-container'>
      <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                 "Hospital No",
                 "Name",
                 "Age/Sex",
                //  "Admission Status",
                 "Admitted On",
                 "Ward/Bed",
                 "Department",
                 "Provider Name",
                 "Actions"
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.hospitalNo}</td>
              <td>{`${patient.firstName} ${patient.lastName}`}</td>
              <td>{ patient.age}/{patient.gender}</td>
              {/* <td>{patient.admissionStatus}</td> */}
              <td>{patient.admissionDate}</td>
              <td>{patient?.manageBedDTO?.bedNumber}</td>
              <td>{patient?.wardDepartmentDTO?.wardName}</td>
              <td>{patient?.admittedDoctorDTO?.firstName}</td>
              <td>
                <button className='in-patient-button' onClick={() => handlePatientClick(patient)}>👤</button>
                <button className='in-patient-button' >🔔</button>
                <button className='in-patient-button' >🖼</button>
                <button className='in-patient-button' onClick={() => handleOrdersClick(patient)}>📄</button>
                <button className='in-patient-button' >♥</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default PatientList;
