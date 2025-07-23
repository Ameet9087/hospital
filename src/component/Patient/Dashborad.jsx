import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import '../Patient/Dashboard.css';

const Dashboard = () => {
  const dummyData = [
    { date: '07-08-24', patients: 2 },
    { date: '08-08-24', patients: 3 },
    { date: '10-08-24', patients: 5 },
    { date: '11-08-24', patients: 4 },
    { date: '12-08-24', patients: 7 },
  ];

  const ageGroupData = [
    { ageGroup: '0-14 Years', cost: 3 },
    { ageGroup: '14-25 Years', cost: 2.5 },
    { ageGroup: '25-35 Years', cost: 2 },
    { ageGroup: '35-45 Years', cost: 1.5 },
    { ageGroup: '45-55 Years', cost: 2.8 },
  ];

  const departmentData = [
    { name: 'Cardiology', value: 400 },
    { name: 'Dental', value: 300 },
    { name: 'Dermatology & Cosmetology', value: 300 },
    { name: 'Radiology', value: 200 },
    { name: 'Orthopedic', value: 278 },
    { name: 'Pathology', value: 189 },
  ];

  return (
    <div className="patient-dashboard-container">
      {/* <div className="navbar">
        <button className="nav-button">Search Patient</button>
        <button className="nav-button">Register Patient</button>
      </div> */}

      <div className="patient-date-range-picker">
        <label>From:</label>
        <input type="date" />
        <label>To:</label>
        <input type="date" />
        <button className="patient-date-picker-button">OK</button>
      </div>

      <div className="patient-stats">
        <div className="patient-stat-card">
          <div className="patient-stat-icon">🧑‍⚕️</div>
          <div className="patient-stat-info">
            <p>Registered Patient</p>
            <h2>2</h2>
            <p>Today: 0 | Yesterday: 0</p>
          </div>
        </div>
        <div className="patient-stat-card">
          <div className="patient-stat-icon">👨‍⚕️</div>
          <div className="patient-stat-info">
            <p>Doctors</p>
            <h2>8</h2>
            <p>Consultants: 8 | Anaesthetists: 0</p>
          </div>
        </div>
        <div className="patient-stat-card">
          <div className="patient-stat-icon">📅</div>
          <div className="patient-stat-info">
            <p>Appointments</p>
            <h2>16</h2>
            <p>Today: 0 | Yesterday: 0</p>
          </div>
        </div>
        <div className="patient-stat-card">
          <div className="patient-stat-icon">🔄</div>
          <div className="patient-stat-info">
            <p>Readmission</p>
            <h2>0</h2>
            <p>Today: 0 | Yesterday: 0</p>
          </div>
        </div>
      </div>

      <div className="patient-charts-container">
        <div className="patient-chart">
          <h3>Patient Count by Day</h3>
          <BarChart width={400} height={300} data={dummyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="patients" fill="var( --button-bg-color)" />
          </BarChart>
        </div>
        <div className="patient-chart">
          <h3>Average Treatment Cost by Age Group</h3>
          <BarChart width={400} height={300} data={ageGroupData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ageGroup" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cost" fill="var( --button-bg-color)" />
          </BarChart>
        </div>
        <div className="patient-chart">
          <h3>Department Wise Appointment Count</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={departmentData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="var( --button-bg-color)"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
