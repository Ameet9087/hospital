import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import './MedicationAdviced.css'; // Include the CSS file for styling

function MedicationAdviced() {
  const [rows, setRows] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    axios
      .get("http://192.168.0.115:8080/api/medication-adviceds")
      .then((response) => {
        // Set the fetched data into the rows state
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medication advice", error);
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  // Handle row changes for each field
  const handleChange = (e, index, field) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = e.target.value;
    setRows(updatedRows);
  };

  // Add a new row to the table
  const addRow = () => {
    const newRow = { sn: rows.length + 1, itemName: '', genericName: '', timemed: '', days: '', route: '', remarks: '' };
    setRows([...rows, newRow]);
  };

  // Delete a row from the table
  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <div className="medication-container">
      <h2>Medication Adviced</h2>

      <table className="medication-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Item Name</th>
            <th>Generic Name</th>
            <th>Timemed</th>
            <th>Days</th>
            <th>Route</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.sn}</td>
              <td>
                <input
                  type="text"
                  value={row.itemName}
                  onChange={(e) => handleChange(e, index, 'itemName')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.genericName}
                  onChange={(e) => handleChange(e, index, 'genericName')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.timemed}
                  onChange={(e) => handleChange(e, index, 'timemed')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.days}
                  onChange={(e) => handleChange(e, index, 'days')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.route}
                  onChange={(e) => handleChange(e, index, 'route')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.remarks}
                  onChange={(e) => handleChange(e, index, 'remarks')}
                />
              </td>
              <td>
                <button onClick={() => deleteRow(index)}>Del</button>
                <button onClick={addRow}>Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicationAdviced;
