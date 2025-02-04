import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import CountUp from "react-countup";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

function Dashboard() {
  // State for dynamic data
  const [newPatients, setNewPatients] = useState(0);
  const [opdPatients, setOpdPatients] = useState(0);
  const [todayOps, setTodayOps] = useState(0);
  const [hospitalEarnings, setHospitalEarnings] = useState(0);

  // Simulate dynamic data generation
  useEffect(() => {
    // Generate random data on page load
    setNewPatients(Math.floor(Math.random() * 500) + 100); // Random between 100 and 600
    setOpdPatients(Math.floor(Math.random() * 500) + 100); // Random between 100 and 600
    setTodayOps(Math.floor(Math.random() * 20) + 5); // Random between 5 and 25
    setHospitalEarnings(Math.floor(Math.random() * 50000) + 20000); // Random between 20000 and 70000
  }, []);

  // Data for Hospital Earnings Over Time (Line Chart)
  const earningsData = [
    { month: 'Jan', earnings: 30000 },
    { month: 'Feb', earnings: 32000 },
    { month: 'Mar', earnings: 34000 },
    { month: 'Apr', earnings: 34650 },
    { month: 'May', earnings: 36000 },
    { month: 'Jun', earnings: 38000 },
  ];

  // Data for Patient Distribution (Pie Chart)
  const patientData = [
    { name: 'OPD', value: newPatients },
    { name: 'IPD', value: opdPatients },
  ];

  // Colors for Pie Chart
  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="admin-dash-container">
      <div className="admin-dash-header">
        <h1>Dashboard</h1>
      </div>
      <div className="admin-dash-stats">
        <div className="admin-dash-stat">
          <h2>
            <CountUp end={newPatients} duration={2} />
          </h2>
          <p>New Patient</p>
        </div>
        <div className="admin-dash-stat">
          <h2>
            <CountUp end={opdPatients} duration={2} />
          </h2>
          <p>OPD Patient</p>
        </div>
        <div className="admin-dash-stat">
          <h2>
            <CountUp end={todayOps} duration={2} />
          </h2>
          <p>Today's Opd.</p>
        </div>
        <div className="admin-dash-stat">
          <h2>
            ₹<CountUp end={hospitalEarnings} duration={2} />
          </h2>
          <p>Hospital Earning</p>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="admin-dash-graphs">
        <div className="admin-dash-graph">
          <h3>Hospital Earnings Over Time</h3>
          <LineChart
            width={600}
            height={300}
            data={earningsData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="earnings" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
        <div className="admin-dash-graph">
          <h3>Patient Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={patientData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {patientData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;