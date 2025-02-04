import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import './LinensIssue.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { startResizing } from '../../../TableHeadingResizing/resizableColumns';
const LinensIssue = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [data, setData] = useState([]);

  const handleAdd = (index) => {
    const newSN = data.length > 0 ? data[data.length - 1].sn + 1 : 1;
    const newData = [...data];
    newData.splice(index + 1, 0, { sn: newSN, service: `Service ${newSN}` });
    setData(newData);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };
  const [issueDetails, setIssueDetails] = useState({
    issueNumber: '',
    issueDate: '',
    issueTime: '',
    issueType: '',
    nursingStation: '',
    currentOccupancy: ''
  });

  const [rows, setRows] = useState([
    { id: 1, linensName: '', inStock: '', prevBalance: '', issuedQty: '', lnm: '' }
  ]);

  const [issues, setIssues] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIssueDetails({ ...issueDetails, [name]: value });
  };

  const addRow = () => {
    setRows([
      ...rows,
      { id: rows.length + 1, linensName: '', inStock: '', prevBalance: '', issuedQty: '', lnm: '' }
    ]);
  };

  const deleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const fetchIssues = async () => {
    try {
      const response = await axios.get('http://192.168.0.123:8080/api/linens-issues');
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
      alert('Failed to fetch issues. Please try again later.');
    }
  };

  const addIssue = async () => {
    const linenMasterIds = rows.map(row => parseInt(row.lnm, 10)).filter(id => !isNaN(id));

    if (!issueDetails.issueDate || !issueDetails.issueTime || !issueDetails.issueType) {
      alert('Please fill in all required fields.');
      return;
    }

    const newIssue = {
      issueDate: issueDetails.issueDate,
      issueTime: issueDetails.issueTime,
      issueType: issueDetails.issueType,
      nursingType: issueDetails.nursingStation,
      currentOccupancy: parseInt(issueDetails.currentOccupancy, 10),
      linenMasterIds,
    };

    console.log("Payload being sent:", newIssue);

    try {
      const response = await axios.post('http://192.168.0.123:8080/api/linens-issues', newIssue);
      console.log("Server response:", response.data);

      // Check if response indicates success (e.g., status 200 or a success property)
      if (response.status === 200 || response.data.success) {
        alert('Issue added successfully!');

        // Reset form state after successful submission
        setIssueDetails({
          issueNumber: '',
          issueDate: '',
          issueTime: '',
          issueType: '',
          nursingStation: '',
          currentOccupancy: '',
        });

        setRows([{ id: 1, linensName: '', inStock: '', prevBalance: '', issuedQty: '', lnm: '' }]);

        // Fetch updated issues
        fetchIssues();
      } else {
        alert('Failed to add issue. Please check your input and try again.');
      }
    } catch (error) {
      console.error('Error adding issue:', error.response || error.message);
      alert('Failed to add issue. Please check your input and try again.');
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="linens-issue">
      <div className="form-section">
        <h1 className='linens-head'>Linens Issue</h1>
        <div className="form-group">
          <label>Issue Number:</label>
          <input
            type="text"
            name="issueNumber"
            value={issueDetails.issueNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Issue Date:</label>
          <input
            type="date"
            name="issueDate"
            value={issueDetails.issueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Issue Time:</label>
          <input
            type="time"
            name="issueTime"
            value={issueDetails.issueTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Linens Issue Type:</label>
          <div>
            <input
              type="radio"
              name="issueType"
              value="Nursing Station"
              onChange={handleInputChange}
            />
            Nursing Station
            <input
              type="radio"
              name="issueType"
              value="Department"
              onChange={handleInputChange}
            />
            Department
            <input
              type="radio"
              name="issueType"
              value="Staff"
              onChange={handleInputChange}
            />
            Staff
          </div>
        </div>
        <div className="form-group">
          <label>Nursing Station:</label>
          <div className="input-with-icon">
            <input
              type="text"
              name="nursingStation"
              value={issueDetails.nursingStation}
              onChange={handleInputChange}
            />
            <AiOutlineSearch className="search-icon" />
          </div>
        </div>
        <div className="form-group">
          <label>Current Occupancy:</label>
          <input
            type="number"
            name="currentOccupancy"
            value={issueDetails.currentOccupancy}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="table-section">
        <h2>Linens Details</h2>
        <table ref={tableRef} className="resizable-table">
          <thead>
            <tr>
              {["SN", "Linens Name", "In Stock", "Previous Balance", "Issued Quantity", "LNM", "Actions"].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] || "auto" }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    {index < 6 && (
                      <div
                        className="resize-handle"
                        onMouseDown={(e) => startResizing(e, index, tableRef, setColumnWidths)}
                      ></div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <input
                    type="text"
                    value={row.linensName}
                    onChange={(e) => {
                      const updatedRows = [...rows];
                      updatedRows[index].linensName = e.target.value;
                      setRows(updatedRows);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.inStock}
                    onChange={(e) => {
                      const updatedRows = [...rows];
                      updatedRows[index].inStock = e.target.value;
                      setRows(updatedRows);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.prevBalance}
                    onChange={(e) => {
                      const updatedRows = [...rows];
                      updatedRows[index].prevBalance = e.target.value;
                      setRows(updatedRows);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.issuedQty}
                    onChange={(e) => {
                      const updatedRows = [...rows];
                      updatedRows[index].issuedQty = e.target.value;
                      setRows(updatedRows);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.lnm}
                    onChange={(e) => {
                      const updatedRows = [...rows];
                      updatedRows[index].lnm = e.target.value;
                      setRows(updatedRows);
                    }}
                  />
                </td>
                <td>
                  <button onClick={addRow}>Add</button>
                  <button onClick={() => deleteRow(row.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      <div className="linenissue-buttons-section">
      <button className="linenissue-save-button" onClick={addIssue}>Save</button>
  <button className="linenissue-fetch-button" onClick={fetchIssues}>Fetch Issues</button>
  <button className="linenissue-delete-button">Delete</button>
  <button className="linenissue-clear-button">Clear</button>
  <button className="linenissue-close-button">Close</button>
  <button className="linenissue-search-button">Search</button>
      </div>
    </div>
  );
};

export default LinensIssue;
