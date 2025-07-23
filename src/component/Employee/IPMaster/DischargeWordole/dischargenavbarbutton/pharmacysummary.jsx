import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API requests
import './PharmacySummary.css'; // Include the CSS file for styling

function PharmacySummary() {
  // State to store the pharmacy summary data
  const [tableData, setTableData] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    axios
      .get("http://192.168.0.115:8080/api/pharmacysummaries")
      .then((response) => {
        // Set the fetched data into the state
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pharmacy summary data", error);
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  // Handle the select checkbox change
  const handleSelectChange = (index) => {
    const updatedData = [...tableData];
    updatedData[index].selected = !updatedData[index].selected;
    setTableData(updatedData);
  };

  return (
    <div className="pharmacysummary-container">
      <h2>Pharmacy Summary</h2>

      <table className="pharmacysummary-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Select</th>
            <th>Medicine Name</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.sn}</td>
              <td>
                <input
                  type="checkbox"
                  checked={item.selected || false}
                  onChange={() => handleSelectChange(index)}
                />
              </td>
              <td>{item.medicineName}</td>
              <td>{item.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PharmacySummary;
