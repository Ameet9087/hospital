/* Dhanashree_Department_27/09_Starts */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye } from 'react-icons/fa'; 
import './Department.css';

function Department() {
  const navigate = useNavigate();
  const [departmentData, setDepartmentData] = useState([]);

  // Fetch department data from API
  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const response = await axios.get(' http://localhost:8085/api/super/departments');
        console.log(response.data) // Replace with your API endpoint
        setDepartmentData(response.data);
      } catch (error) {
        console.error('Error fetching department data:', error);
      }
    };

    fetchDepartmentData();
  }, []);

  const handleView = (userId, departmentName, username, userMessage, uploadedDocuments, uploadedInvoice) => {
    navigate('/send-query', { state: { userId, departmentName, username, userMessage, uploadedDocuments, uploadedInvoice } });
  };

  return (
    <div>
      <h2>Department Control Page</h2>
      <table className="ControlDepartmentHIMS-department-table" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Department Id</th>
            <th>Department Name</th>
            <th>User Name</th>
            <th>User Message</th>
            <th>Uploaded Documents</th>
            <th>Uploaded Invoice (If Required)</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {departmentData.length > 0 ? (
            departmentData.map((item) => (
              <tr key={item.userId}>
                <td>{item.userId}</td>
                <td>{item.dcid}</td>
                <td>{item.departmentName}</td>
                <td>{item.username}</td>
                <td>{item.userQuery}</td>
                <td>{item.uploadedDocument}</td>
                <td>{item.uploadedInvoiceif}</td>
                <td>
                  <button className="ControlDepartmentHIMS-action-btn" onClick={() => handleView(item.dcid, item.departmentName, item.username, item.userMsg, item.uploadedDocument, item.uploadedInvoice)}>
                    <FaEye /> {/* Eye icon */}
                  </button>
                </td>
                <td>
                  <div className="ControlDepartmentHIMS-button-group">
                    <span>{item.status}</span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Department;

/* Dhanashree_Department_27/09_Ends */
