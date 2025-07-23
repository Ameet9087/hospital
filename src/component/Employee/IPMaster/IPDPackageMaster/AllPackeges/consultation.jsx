import React, { useState } from "react";

function Consultation() {
  // State to manage table data
  const [tableData, setTableData] = useState([
    { id: 1, unitName: "Doctor 1", limit: 100 },
    { id: 2, unitName: "Doctor 2", limit: 200 },
    { id: 3, unitName: "Doctor 3", limit: 150 },
  ]);

  // State for new row inputs
  const [newRow, setNewRow] = useState({ unitName: "", limit: "" });

  // Handle input changes for new row
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };

  // Add new row to the table
  const handleAddRow = () => {
    if (newRow.unitName && newRow.limit) {
      setTableData((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          unitName: newRow.unitName,
          limit: Number(newRow.limit),
        },
      ]);
      setNewRow({ unitName: "", limit: "" }); // Clear input fields
    } else {
      alert("Please fill in all fields before adding.");
    }
  };

  // Delete a row from the table
  const handleDeleteRow = (id) => {
    setTableData((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
      <label>Consultation</label>

      {/* Input fields for adding a new row */}
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <input
          type="text"
          name="unitName"
          placeholder="Unit Name"
          value={newRow.unitName}
          onChange={handleInputChange}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="number"
          name="limit"
          placeholder="Limit"
          value={newRow.limit}
          onChange={handleInputChange}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={handleAddRow} style={{ padding: "5px 10px", cursor: "pointer" }}>
          Add
        </button>
      </div>

      {/* Table structure */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Sr. No</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Unit Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Limit</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>{index + 1}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}>{item.unitName}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "right" }}>{item.limit}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
                <button
                  onClick={() => handleDeleteRow(item.id)}
                  style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
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

export default Consultation;
