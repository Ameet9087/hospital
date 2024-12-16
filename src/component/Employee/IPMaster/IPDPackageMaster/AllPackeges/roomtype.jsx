import React, { useState } from "react";
import "./RoomType.css";

function RoomType() {
  const [rows, setRows] = useState([
    { id: 1, roomType: "", noOfDays: "", perDayRent: "", total: "" },
  ]);

  // Add a new row
  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      { id: prev.length + 1, roomType: "", noOfDays: "", perDayRent: "", total: "" },
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
        row.id === id
          ? {
              ...row,
              [field]: value,
              total: field === "noOfDays" || field === "perDayRent"
                ? calculateTotal(row.noOfDays, row.perDayRent, field, value)
                : row.total,
            }
          : row
      )
    );
  };

  const calculateTotal = (noOfDays, perDayRent, field, value) => {
    const updatedDays = field === "noOfDays" ? value : noOfDays;
    const updatedRent = field === "perDayRent" ? value : perDayRent;
    return updatedDays && updatedRent ? updatedDays * updatedRent : "";
  };

  return (
    <div className="ipdmroomtype-container">
      <label className="ipdmroomtype-label">ROOM TYPE</label>

      <table className="ipdmroomtype-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Room Type</th>
            <th>No of Days</th>
            <th>Per Day Rent</th>
            <th>Total</th>
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
                  className="ipdmroomtype-input"
                  value={row.roomType}
                  onChange={(e) =>
                    handleInputChange(row.id, "roomType", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className="ipdmroomtype-input"
                  value={row.noOfDays}
                  onChange={(e) =>
                    handleInputChange(row.id, "noOfDays", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className="ipdmroomtype-input"
                  value={row.perDayRent}
                  onChange={(e) =>
                    handleInputChange(row.id, "perDayRent", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="ipdmroomtype-total"
                  value={row.total}
                  readOnly
                />
              </td>
              <td>
                <button
                  className="ipdmroomtype-add"
                  onClick={handleAddRow}
                >
                  Add
                </button>
                <button
                  className="ipdmroomtype-delete"
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

export default RoomType;
