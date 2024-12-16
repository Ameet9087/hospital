import React, { useState } from "react";

const GeolocationPopupTable = ({ columns, data, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered data based on the search term
  const filteredData = data.filter((row) =>
    columns.some((col) =>
      String(row[col]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleRowClick = (row) => {
    onSelect(row); // Send selected row data to the parent
    onClose(); // Close the popup after selection
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <div style={styles.header}>
          <h2 style={styles.heading}>Select a Value</h2>
          <button onClick={onClose} style={styles.closeButton}>
            x
          </button>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <div style={styles.popupTableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr key={index} onClick={() => handleRowClick(row)}>
                    {columns.map((col) => (
                      <td key={col}>{row[col]}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} style={styles.noData}>
                    No matching data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5000,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  heading: {
    fontSize: "15px",
  },
  popup: {
    position: "relative",
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "50%",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  searchInput: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  popupTableContainer: {
    width: "100%",
    height: "500px",
    overflow: "scroll",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  row: {
    cursor: "pointer",
    borderBottom: "1px solid #ccc",
  },
  noData: {
    textAlign: "center",
    padding: "10px",
    fontStyle: "italic",
  },
  closeButton: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    top: "-10px",
    right: "-10px",
    backgroundColor: "#f44336",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default GeolocationPopupTable;
