import React, { useState } from "react";
import "./Service.css";

function Service() {
  const [rows, setRows] = useState([
    {
      id: 1,
      serviceName: "",
      common: "",
      opd: "",
      dayCare: "",
      commonNonAC: "",
      commonAC: "",
      twinSharing: "",
      deluxe: "",
      suite: "",
    },
  ]);

  // Add a new row
  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        serviceName: "",
        common: "",
        opd: "",
        dayCare: "",
        commonNonAC: "",
        commonAC: "",
        twinSharing: "",
        deluxe: "",
        suite: "",
      },
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
    <div className="ipdmservice-container">
      <label className="ipdmservice-label">
        SERVICE
      </label>

      <table className="ipdmservice-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Service Name</th>
            <th>Common</th>
            <th>OPD</th>
            <th>Day Care</th>
            <th>Common Non AC</th>
            <th>Common AC</th>
            <th>Twin Sharing</th>
            <th>Deluxe</th>
            <th>Suite</th>
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
                  className="ipdmservice-input"
                  value={row.serviceName}
                  onChange={(e) =>
                    handleInputChange(row.id, "serviceName", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="ipdmservice-input"
                  value={row.common}
                  onChange={(e) =>
                    handleInputChange(row.id, "common", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="ipdmservice-input"
                  value={row.opd}
                  onChange={(e) =>
                    handleInputChange(row.id, "opd", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="ipdmservice-input"
                  value={row.dayCare}
                  onChange={(e) =>
                    handleInputChange(row.id, "dayCare", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="ipdmservice-input"
                  value={row.commonNonAC}
                  onChange={(e) =>
                    handleInputChange(row.id, "commonNonAC", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="ipdmservice-input"
                  value={row.commonAC}
                  onChange={(e) =>
                    handleInputChange(row.id, "commonAC", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="ipdmservice-input"
                  value={row.twinSharing}
                  onChange={(e) =>
                    handleInputChange(row.id, "twinSharing", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="ipdmservice-input"
                  value={row.deluxe}
                  onChange={(e) =>
                    handleInputChange(row.id, "deluxe", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="ipdmservice-input"
                  value={row.suite}
                  onChange={(e) =>
                    handleInputChange(row.id, "suite", e.target.value)
                  }
                />
              </td>
              <td>
                <button
                  className="ipdmservice-add"
                  onClick={handleAddRow}
                >
                  Add
                </button>
                <button
                  className="ipdmservice-delete"
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

export default Service;
