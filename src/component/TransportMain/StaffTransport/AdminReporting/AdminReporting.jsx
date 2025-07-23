import React, { useState } from 'react';
import './AdminReporting.css'; // Importing CSS for styling

const AdminReporting = () => {
  const [reportData, setReportData] = useState([
    {
      reportId: 'R001',
      transportUtilization: '80% (Staff-to-Vehicle Ratio)',
      routeEfficiency: 'High (Optimized)',
      costAnalysis: '$1500 (Fuel, Maintenance, Transport Costs)',
    },
    {
      reportId: 'R002',
      transportUtilization: '60% (Staff-to-Vehicle Ratio)',
      routeEfficiency: 'Medium',
      costAnalysis: '$1200 (Fuel, Maintenance, Transport Costs)',
    },
    {
      reportId: 'R003',
      transportUtilization: '90% (Staff-to-Vehicle Ratio)',
      routeEfficiency: 'Low (Needs Optimization)',
      costAnalysis: '$2000 (Fuel, Maintenance, Transport Costs)',
    },
  ]);

  const handleAdd = () => {
    // Logic for adding a new row (e.g., opening a modal or a form)
    alert('Add button clicked');
  };

  const handleEdit = (index) => {
    // Logic for editing the row (e.g., opening a form with pre-filled data)
    alert(`Editing row ${index + 1}`);
  };

  return (
    <div className="StaffTransportManagement-container">
      <h2>Admin & Reporting</h2>

      {/* Add Button */}
      <button className="StaffTransportManagement-add-button" onClick={handleAdd}>
        Add New Report
      </button>

      {/* Table to display reports */}
      <table className="StaffTransportManagement-table">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Transport Utilization Report</th>
            <th>Route Efficiency Report</th>
            <th>Cost Analysis</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((report, index) => (
            <tr key={index}>
              <td>{report.reportId}</td>
              <td>{report.transportUtilization}</td>
              <td>{report.routeEfficiency}</td>
              <td>{report.costAnalysis}</td>
              <td>
                <button className="StaffTransportManagement-edit-button" onClick={() => handleEdit(index)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReporting;
