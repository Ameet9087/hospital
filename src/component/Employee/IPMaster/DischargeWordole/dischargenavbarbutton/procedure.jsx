import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import './Procedure.css'; // Include the CSS file for styling

function Procedure() {
  const [rows, setRows] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    axios
      .get("http://192.168.0.115:8080/api/procedures")
      .then((response) => {
        // Set the fetched data into the rows state
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching procedures", error);
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  // Handle row changes for billDate and serviceName
  const handleChange = (e, index, field) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = e.target.value;
    setRows(updatedRows);
  };

  // Add a new row to the table
  const addRow = () => {
    const newRow = { sn: rows.length + 1, billDate: '', serviceName: '' };
    setRows([...rows, newRow]);
  };

  // Delete a row from the table
  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  // Handle keydown for Control + Enter to add new row
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      addRow();
    }
  };

  return (
    <div className="procedure-container" onKeyDown={handleKeyDown}>
      <h2>Procedures</h2>

      <table className="procedure-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Bill Date</th>
            <th>Service Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.sn}</td>
              <td>
                <input
                  type="date"
                  value={row.billDate}
                  onChange={(e) => handleChange(e, index, 'billDate')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.serviceName}
                  onChange={(e) => handleChange(e, index, 'serviceName')}
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

export default Procedure;
