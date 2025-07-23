import React, { useState } from "react";
import "./Pharmacy.css";

function Pharmacy() {
  const [rows, setRows] = useState([
    { id: 1, itemName: "", maxQty: "", limit: "" },
  ]);

  // Add a new row
  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      { id: prev.length + 1, itemName: "", maxQty: "", limit: "" },
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
    <div className="ipdmpharmacy-container">
      <label className="ipdmpharmacy-label">
        PHARMACY
      </label>

      <table className="ipdmpharmacy-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Item Name</th>
            <th>Max Qty</th>
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
                  className="ipdmpharmacy-input"
                  value={row.itemName}
                  onChange={(e) =>
                    handleInputChange(row.id, "itemName", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className="ipdmpharmacy-input"
                  value={row.maxQty}
                  onChange={(e) =>
                    handleInputChange(row.id, "maxQty", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className="ipdmpharmacy-input"
                  value={row.limit}
                  onChange={(e) =>
                    handleInputChange(row.id, "limit", e.target.value)
                  }
                />
              </td>
              <td>
                <button
                  className="ipdmpharmacy-add"
                  onClick={handleAddRow}
                >
                  Add
                </button>
                <button
                  className="ipdmpharmacy-delete"
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

export default Pharmacy;
