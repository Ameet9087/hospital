import React, { useState } from "react";
import "./Investigation.css";

function Investigation() {
  const [rows, setRows] = useState([
    { id: 1, testName: "", payType: "", limit: "" },
  ]);

  // Add a new row
  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      { id: prev.length + 1, testName: "", payType: "", limit: "" },
    ]);
  };

  // Delete a row
  const handleDeleteRow = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  // Handle input change
  const handleInputChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <div className="ipdmpkg-investigation-container">
      <label className="ipdmpkg-investigation-label">
        INVESTIGATION
      </label>
      <div className="ipdmpkg-investigation-actions">
        
       
      </div>

      <table className="ipdmpkg-investigation-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Test Name</th>
            <th>Pay Type</th>
            <th>Limit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  className="ipdmpkg-investigation-input"
                  value={row.testName}
                  onChange={(e) =>
                    handleInputChange(row.id, "testName", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="ipdmpkg-investigation-input"
                  value={row.payType}
                  onChange={(e) =>
                    handleInputChange(row.id, "payType", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className="ipdmpkg-investigation-input"
                  value={row.limit}
                  onChange={(e) =>
                    handleInputChange(row.id, "limit", e.target.value)
                  }
                />
              </td>
              <td>
              <button className="ipdmpkg-investigation-add" onClick={handleAddRow}>
          Add
        </button>
                <button
                  className="ipdmpkg-investigation-delete"
                  onClick={() => handleDeleteRow(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Investigation;
