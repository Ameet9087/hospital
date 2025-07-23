// Neha Superuser-revenue manaeh=ment 2709-24

import React, { useState,useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto'; 
import './revenuedashboard.css';

const RevenueDashboard = () => {
  const [dateRange, setDateRange] = useState('This Month');
  const [type, setType] = useState('All');
  const [doctor, setDoctor] = useState('All');
  const [selectedPatient,setSelectedPatient] = useState(null);
  const [selectedIllness, setSelectedIllness] = useState(null);
  const [showIllnessModal, setShowIllnessModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showPatientDetailsModal, setShowPatientDetailsModal] = useState(false);
  const [selectedPatientopdDetails, setSelectedPatientopdDetails] = useState(null);
  const [startDate, setStartDate] = useState('2024-01-01'); 
const [endDate, setEndDate] = useState('2024-12-31');
const [totalRevenue, setTotalRevenue] = useState(0); 
const [opdRevenue, setOpdRevenue] = useState(0);
const [icuRevenue, setIcuRevenue] = useState(0);
const [avgRevenuePerTransaction, setAvgRevenuePerTransaction] = useState(0);
const [revenuetableData, setRevenuetableData] = useState([]);
const [doctorData, setDoctorData] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

  
  // Example data for charts
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Revenue by Department',
        data: [],
        backgroundColor: ['#4caf50', '#ff5722', '#03a9f4', '#ffeb3b', '#9c27b0'],
      },
    ],
  });

  const fetchRevenueData = async () => {
    try {
      const response = await axios.get(`http://localhost:9094/api/revenue/percentage-by-department?startDate=${startDate}&endDate=${endDate}`);
      const data = response.data; 
  
      const labels = data.map(department => department.departmentName);
      const revenueValues = data.map(department => department.percentage);
      
      setRevenueData({
        labels: labels,
        datasets: [
          {
            label: 'Revenue by Department',
            data: revenueValues,
            backgroundColor: ['#4caf50', '#ff5722', '#03a9f4', '#ffeb3b', '#9c27b0', '#ffc107', '#00bcd4', '#9c27b0'],
          },          
        ],
      });
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  useEffect(() => {
    fetchRevenueData();
  }, [startDate, endDate]);
  
  const [revenueTrendData, setRevenueTrendData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [], // initially empty, data will be filled in after API call
        borderColor: '#03a9f4',
        fill: false,
      },
    ],
  });


  const fetchMonthlyRevenueData = async () => {
    try {
      const response = await axios.get('http://localhost:9094/api/revenue/monthly-graph');
      const data = response.data;

      // Log the API response to verify the structure
      console.log('API Response:', data);

      // Extract the monthly revenue values from the response
      const monthlyRevenue = data.map((month) => month.revenue); // Adjust based on API structure

      // Update the chart data
      setRevenueTrendData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: monthlyRevenue, // Set the monthly revenue values here
          },
        ],
      }));
    } catch (error) {
      console.error('Error fetching monthly revenue data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchMonthlyRevenueData();
  }, []);

  const fetchTotalRevenue = async () => {
    try {
      const response = await axios.get(`http://localhost:9094/api/revenue/total-between-dates?startDate=${startDate}&endDate=${endDate}`);
      const data = response.data;

      // Assuming the API returns an object with a totalRevenue field
      setTotalRevenue(data.totalRevenue);
    } catch (error) {
      console.error('Error fetching total revenue:', error);
    }
  };

  // Fetch data when the component mounts or when the dates change
  useEffect(() => {
    fetchTotalRevenue();
  }, [startDate, endDate]); // Re-fetch if startDate or endDate changes

  
  const fetchAllRevenueData = async () => {
    try {
      const response = await axios.get(`http://localhost:9094/api/revenue/grouped-between-dates?startDate=${startDate}&endDate=${endDate}`);
      const data = response.data;

      // Assuming API response has revenue grouped by department and a field for avg revenue per transaction
      const opdData = data.find(department => department.departmentName === 'OPD');
      const icuData = data.find(department => department.departmentName === 'ICU');

      // Update the states with the fetched data
      setOpdRevenue(opdData ? opdData.totalRevenue : 0);
      setIcuRevenue(icuData ? icuData.totalRevenue : 0);
      setAvgRevenuePerTransaction(data.avgRevenuePerTransaction); 
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  // Fetch the data when the component mounts or when dates change
  useEffect(() => {
    fetchAllRevenueData();
  }, [startDate, endDate]);
  // Example data for illnesses
  const illnessData = [
    { illness: 'Fever', patients: 25, usepatient: 2 },
    { illness: 'Eye Test', patients: 10, usepatient: 2 },
    { illness: 'Cold', patients: 15, usepatient: 2 },
    { illness: 'Diabetes Checkup', patients: 12, usepatient: 2 },
  ];

  const fetchRevenuetableData = async () => {
    try {
      const response = await axios.get('http://localhost:1499/api/revenue/summary');
      setRevenuetableData(response.data); // Assuming the data is an array of department summaries
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchRevenuetableData();
  }, []);



  const fetchDoctorData = async (doctorName) => {
    try {
      const response = await axios.get(`http://localhost:1499/api/revenue/filter-by-doctor?doctorName=${doctorName}`);
      setDoctorData(response.data); // Assuming the response contains the doctor's information
      setIsModalOpen(true); // Open the modal after fetching data
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  const handleDoctorChange = (selectedDoctor) => {
    setDoctor(selectedDoctor);
    if (selectedDoctor !== "All") {
      fetchDoctorData(selectedDoctor);
    } else {
      setDoctorData(null); // Reset doctor data if 'All' is selected
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDoctorData(null); // Clear doctor data when closing modal
  };

  // Example patient data for selected illness
  const patientData = {
    Fever: [
      { uhid: 'UHID001', name: 'John Doe', city: 'New York', mobile: '123-456-7890', gender: 'Male', age: 34 },
      { uhid: 'UHID002', name: 'Jane Smith', city: 'Los Angeles', mobile: '098-765-4321', gender: 'Female', age: 28 },
    ],
    'Eye Test': [
      { uhid: 'UHID003', name: 'Alice Brown', city: 'Chicago', mobile: '555-123-4567', gender: 'Female', age: 45 },
      { uhid: 'UHID004', name: 'Robert White', city: 'Houston', mobile: '555-987-6543', gender: 'Male', age: 54 },
    ],
    Cold: [
      { uhid: 'UHID005', name: 'Mary Adams', city: 'Phoenix', mobile: '555-555-5555', gender: 'Female', age: 32 },
      { uhid: 'UHID006', name: 'James Green', city: 'Philadelphia', mobile: '555-666-7777', gender: 'Male', age: 38 },
    ],
    'Diabetes Checkup': [
      { uhid: 'UHID007', name: 'Peter Parker', city: 'San Antonio', mobile: '555-888-9999', gender: 'Male', age: 29 },
      { uhid: 'UHID008', name: 'Lois Lane', city: 'San Diego', mobile: '555-000-1111', gender: 'Female', age: 37 },
    ],
  };

  const selectedPatientDetails = {
    opdname: 'John Doe',
    opduhid: 'UH123456',
    opdcity: 'New York',
    opdmobile: '123-456-7890',
    opdgender: 'Male',
    opdage: 45,
    opdsymptoms: 'Fever, Chest Pain',
    opdlab: 'CBC',
    opddiagnosis: 'Hypertension',
    opdmedications: [
      { name: 'AZITHRO 500MG', dose: '1-2-3', details: 'After Food - DAILY - 5 Day(s)', quantity: '30 (1MG)' },
      { name: 'DOLO 650MG', dose: '1-1-1', details: 'Before Food - DAILY - 1 Day(s)', quantity: '3' },
      { name: 'COUGHTAS DX', dose: '2-2-2', details: 'After Food - DAILY - 5 Day(s)', quantity: '1' },
    ],
    opdgeneralAdvice: 'No sugar - no sweet in diet. Avoid fasting and meal skipping. Walk 3-4 km/day...',
    opdfollowUp: 'Saturday, 28 September 2024',
    opdTotalbill:'2000 succussufully done !'
  };

  const openIllnessModal = () => {
    setShowIllnessModal(true);
  };

  const closeIllnessModal = () => {
    setShowIllnessModal(false);
  };

  const openPatientModal = (illness) => {
    setSelectedIllness(illness);
    setShowPatientModal(true);
  };

  const closePatientModal = () => {
    setShowPatientModal(false);
  };

  const openPatientDetailsModal = (patient) => {
    setSelectedPatientopdDetails(patient);
    setShowPatientDetailsModal(true);
  };

  const closePatientDetailsModal = () => {
    setShowPatientDetailsModal(false);
  };
  return (
    <div className="revenuemgnt-container">
      <h1 className='revenuemgnt-header-h1'>Revenue Dashboard</h1>
      <header className="revenuemgnt-header">
        {/* Filter Section */}
        <div className="revenuemgnt-filter">
          <div className="revenuemgnt-filter-row">
            <div className="revenuemgnt-filter-type">
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="All">All</option>
                <option value="OPD">OPD</option>
                <option value="IPD">IPD</option>
              </select>
            </div>
            <div className="revenuemgnt-filter-daterange">
            <div className="revenuemgnt-filter-daterange">
  <label>Select Date Range</label>
  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
  /> to 
  <input
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
  />
  <button onClick={fetchRevenueData}>Show</button>
</div>

            </div>
            <div className="revenuemgnt-filter-buttons">
              <button>Today</button>
              <button>1 Week</button>
              <button>2 Week</button>
              <button>1 Month</button>
              <button>3 Month</button>
              <button>6 Month</button>
              <button>1 Year</button>
            </div>
            <div className="revenuemgnt-filter-dr">
        <label>Doctor: </label>
        <select value={doctor} onChange={(e) => handleDoctorChange(e.target.value)}>
          <option value="All">All</option>
          <option value="DrKamble">Dr. Neha</option>
          <option value="DrJivan">Dr. Jivan</option> 
        </select>
      </div>
      {isModalOpen && (
        <div className="drmodalrevenue">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Doctor Information</h2>
            {doctorData ? (
              <div>
                <p><strong>Name:</strong> {doctorData.doctorName}</p>
                <p><strong>department Name:</strong> {doctorData.departmentName}</p>
                <p><strong>Revenue:</strong> ${doctorData.revenue}</p>
               
              </div>
            ) : (
              <p>No doctor data available.</p>
            )}
          </div>
        </div>
      )}
      
          </div>
        </div>
      </header>

      <div className="revenuemgnt-kpi-cards">
        <div className="revenuemgnt-kpi-card">
          <h3>Total Revenue</h3>
          <p>{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="revenuemgnt-kpi-card">
  <h3>OPD Revenue</h3>
  <p>{opdRevenue ? opdRevenue.toLocaleString() : 'N/A'}</p>
</div>
<div className="revenuemgnt-kpi-card">
  <h3>ICU Revenue</h3>
  <p>{icuRevenue ? icuRevenue.toLocaleString() : 'N/A'}</p>
</div>
<div className="revenuemgnt-kpi-card">
  <h3>Avg Revenue per Transaction</h3>
  <p>{avgRevenuePerTransaction ? avgRevenuePerTransaction.toLocaleString() : 'N/A'}</p>
</div>

      </div>

      <div className="revenuemgnt-charts">
        <div className="revenuemgnt-pie-chart">
          <h3>Revenue by Department</h3>
          <Pie data={revenueData} />
        </div>

        <div className="revenuemgnt-line-chart">
          <h3>Monthly Revenue Trend</h3>
          <Line data={revenueTrendData} />
        </div>
        <div className="revenuemgntopd-dept-charts">
        {/* Button to open illness modal */}
        <button className="revenuemgntopd-dept-view-btn" onClick={openIllnessModal}>View OPD +</button>
        <button className="revenuemgntopd-dept-view-btn" onClick={openIllnessModal}>View IPD +</button>
         <button className="revenuemgntopd-dept-view-btn" onClick={openIllnessModal}>View Pharmacy +</button>
         <button className="revenuemgntopd-dept-view-btn" onClick={openIllnessModal}>View ICU +</button>
         <button className="revenuemgntopd-dept-view-btn" onClick={openIllnessModal}>View Surgery +</button>
         <button className="revenuemgntopd-dept-view-btn" onClick={openIllnessModal}>View Lab +</button>
         <button className="revenuemgntopd-dept-view-btn" onClick={openIllnessModal}>View Radiology +</button>
         
      </div>

      </div>

      <div className="revenuemgnt-table">
      <h3>Department-Wise Breakdown</h3>
      <table>
        <thead>
          <tr>
            <th>Department</th>
            <th>Revenue</th>
            <th>Transactions</th>
            <th>Avg Revenue per Transaction</th>
            <th>Growth %</th>
          </tr>
        </thead>
        <tbody>
  {revenuetableData.length > 0 ? (
    revenuetableData.map((department, index) => (
      <tr key={index}>
        <td>{department.departmentName || 'N/A'}</td>
        <td>
          {department.totalRevenue !== undefined ? `$${department.totalRevenue.toLocaleString()}` : 'N/A'}
        </td>
        <td>
          {department.totalTransactions !== undefined ? department.totalTransactions.toLocaleString() : 'N/A'}
        </td>
        <td>
          {department.avgRevenuePerTransaction !== undefined ? `$${department.avgRevenuePerTransaction.toLocaleString()}` : 'N/A'}
        </td>
        <td>
          {department.growthPercentage !== undefined ? `${department.growthPercentage}%` : 'N/A'}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">Loading data...</td>
    </tr>
  )}
</tbody>

      </table>
    </div>

      {showIllnessModal && (
        <div className="revenuemgntopd-dept-modal-overlay">
          <div className="revenuemgntopd-dept-modal-content">
            <h2 className="revenuemgntopd-dept-modal-title">Illness List</h2>
            <table className="revenuemgntopd-dept-table">
              <thead>
                <tr>
                  <th>Illness</th>
                  <th>No. of Patients</th>
                  <th>Used Patient</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {illnessData.map((illness) => (
                  <tr key={illness.illness}>
                    <td>{illness.illness}</td>
                    <td>{illness.patients}</td>
                    <td>{illness.usepatient}</td>
                    <td>
                      <button onClick={() => openPatientModal(illness.illness)} className='revenuemgntopd-dept-view-btn'>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="revenuemgntopd-dept-close-btn" onClick={closeIllnessModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Patient Modal */}
      {showPatientModal && (
        <div className="revenuemgntopd-dept-modal-overlay">
          <div className="revenuemgntopd-dept-modal-content">
            <h2 className="revenuemgntopd-dept-modal-title">
              Patients for {selectedIllness}
            </h2>
            <table className="revenuemgntopd-dept-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {patientData[selectedIllness].map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>
                      <button onClick={() => openPatientDetailsModal(patient)} className='revenuemgntopd-dept-view-btn'>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="revenuemgntopd-dept-close-btn" onClick={closePatientModal}>
              Close
            </button>
          </div>
        </div>
      )}


{showPatientDetailsModal && selectedPatientDetails && (
        <div className="superuserview-opdpatient-modal-overlay">
          <div className="superuserview-opdpatient-modal-content">
            <div className="superuserview-opdpatient-header">
              <p className="superuserview-opdpatient-status">Walk-In / Completed</p>
              <p className="superuserview-opdpatient-time">Tuesday, 24 September 2024 06:46 PM (New Appointment)</p>
              <button className="superuserview-opdpatient-close-btn" onClick={closePatientDetailsModal}>Print</button>
            </div>
            
            <div className="superuserview-opdpatient-details">
              <p><strong>Complain/symptoms:</strong> {selectedPatientDetails.opdsymptoms}</p>
              <p><strong>Lab/pathology:</strong> {selectedPatientDetails.opdlab}</p>
              <p><strong>Diagnosis:</strong> {selectedPatientDetails.opddiagnosis}</p>
              <p><strong>Total bill</strong>{selectedPatientDetails.opdTotalbill}</p>
            </div>

            <div className="superuserview-opdpatient-prescription">
              <h3>Rx</h3>
              <table className="superuserview-opdpatient-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Dose</th>
                    <th>Details</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPatientDetails.opdmedications.map((med, index) => (
                    <tr key={index}>
                      <td>{med.name}</td>
                      <td>{med.dose}</td>
                      <td>{med.details}</td>
                      <td>{med.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="superuserview-opdpatient-general-advice">
              <h4>General advice:</h4>
              <p>{selectedPatientDetails.opdgeneralAdvice}</p>
              <p><strong>Next follow-up:</strong> {selectedPatientDetails.opdfollowUp}</p>
            </div>

            <div className="superuserview-opdpatient-footer">
              <button className="superuserview-opdpatient-close-btn" onClick={closePatientDetailsModal}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default RevenueDashboard;
