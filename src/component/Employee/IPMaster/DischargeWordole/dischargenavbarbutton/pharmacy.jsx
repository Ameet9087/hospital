import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API requests
import './Pharmacy.css'; // Include the CSS file for styling

function Pharmacy() {
  // State to store the pharmacy data
  const [pharmacyData, setPharmacyData] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    axios
      .get("http://192.168.0.115:8080/api/pharmacy-details")
      .then((response) => {
        // Set the fetched data into the state
        setPharmacyData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pharmacy data", error);
      });
  }, []); // Empty dependency array to fetch data only once, when the component mounts

  return (
    <div className="pharmacy-container">
      <h2>Pharmacy</h2>
      <table className="pharmacy-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Issue Date</th>
            <th>Issue No</th>
            <th>Medicine Name</th>
          </tr>
        </thead>
        <tbody>
          {pharmacyData.map((item, index) => (
            <tr key={index}>
              <td>{item.sn}</td>
              <td>{item.issueDate}</td>
              <td>{item.issueNo}</td>
              <td>{item.medicationName}</td> {/* Ensure the property is correct */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Pharmacy;
