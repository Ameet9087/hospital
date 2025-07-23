import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API requests
import './OperationDetails.css'; // Include the CSS file for styling

function OperationDetails() {
  // State to store the operation details data
  const [tableData, setTableData] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    axios
      .get("http://192.168.0.115:8080/api/operation-details")
      .then((response) => {
        // Set the fetched data into the state
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching operation details", error);
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  return (
    <div className="operationdetails-container">
      <h2>Operation Details</h2>

      <table className="operationdetails-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Operation Date</th>
            <th>Operation Time</th>
            <th>Operation Name</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.sn}</td>
              <td>{item.operationDate}</td>
              <td>{item.operationTime}</td>
              <td>{item.operationName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OperationDetails;
