import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import './IcdCodes.css'; // Include the CSS file for styling

function IcdCodes() {
  const [rows, setRows] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    axios
      .get("http://192.168.0.115:8080/api/icd-codes")
      .then((response) => {
        // Set the fetched data into the rows state
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ICD codes", error);
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  // Handle row changes for code and description
  const handleChange = (e, index, field) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = e.target.value;
    setRows(updatedRows);
  };

  // Add a new row to the table
  const addRow = () => {
    const newRow = { sn: rows.length + 1, code: '', description: '' };
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
    <div className="icdcodes-container" onKeyDown={handleKeyDown}>
      <h2>ICD Codes</h2>

      <table className="icdcodes-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Code</th>
            <th>Description</th>
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
                  value={row.code}
                  onChange={(e) => handleChange(e, index, 'code')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.description}
                  onChange={(e) => handleChange(e, index, 'description')}
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

export default IcdCodes;
