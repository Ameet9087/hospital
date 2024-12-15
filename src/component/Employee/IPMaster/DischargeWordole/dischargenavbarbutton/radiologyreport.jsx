import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import './RadiologyReport.css'; // Include the CSS file for styling

function RadiologyReport() {
  const [rows, setRows] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    axios
      .get("http://192.168.0.115:8080/api/radiologyreports")
      .then((response) => {
        // Set the fetched data into the rows state
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching radiology reports", error);
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  // Handle row changes for reqNo, deptName, testName, and impression
  const handleChange = (e, index, field) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = e.target.value;
    setRows(updatedRows);
  };

  // Add a new row to the table
  const addRow = () => {
    const newRow = { sn: rows.length + 1, reqNo: '', deptName: '', testName: '', impression: '' };
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
    <div className="radiologyreport-container" onKeyDown={handleKeyDown}>
      <h2>Radiology Reports</h2>

      <table className="radiologyreport-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Req No</th>
            <th>Dept Name</th>
            <th>Test Name</th>
            <th>Impression</th>
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
                  value={row.reqNo}
                  onChange={(e) => handleChange(e, index, 'reqNo')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.deptName}
                  onChange={(e) => handleChange(e, index, 'deptName')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.testName}
                  onChange={(e) => handleChange(e, index, 'testName')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.impression}
                  onChange={(e) => handleChange(e, index, 'impression')}
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

export default RadiologyReport;
