import React, { useState } from "react";
import "./DynamicReport.css"; // Import the CSS file
import { API_BASE_URL } from "../api/api";
import axios from "axios";

const DynamicReport = () => {
  const [query, setQuery] = useState(""); // For storing the SQL query
  const [data, setData] = useState([]); // For storing query results
  const [error, setError] = useState(""); // For error messages

  const executeQuery = async () => {
    if (!query.trim()) {
      setError("Query cannot be empty");
      return;
    }

    try {
      setError("");
      setData([]);
      console.log(query);

      // Send query to the backend
      const response = await axios.post(`${API_BASE_URL}/sql/execute`, query, {
        headers: { "Content-Type": "text/plain" },
      });

      const rawData = response.data;
      if (rawData.length > 0) {
        // Get all unique keys from the data
        const allKeys = new Set();
        rawData.forEach((row) => {
          Object.keys(row).forEach((key) => allKeys.add(key));
        });

        // Normalize the data to include all keys with null values for missing keys
        const normalizedData = rawData.map((row) => {
          const normalizedRow = {};
          allKeys.forEach((key) => {
            normalizedRow[key] = row[key] ?? null; // Add null for missing values
          });
          return normalizedRow;
        });

        setData(normalizedData);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data || "An error occurred while executing the query"
      );
    }
  };

  return (
    <div className="DynamicReport-container">
      <h2>Dynamic Report</h2>
      <div className="Dynamic-Load-Report-Outer">
        <textarea
          rows="5"
          placeholder="Write SQL Query Here"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={executeQuery}>Load Report</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data.length > 0 && (
        <div className="dynamic-report-table">
          <table>
            <thead>
              <tr>
                {/* Render table headers dynamically */}
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Render table rows dynamically */}
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx}>{value !== null ? value : "NULL"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DynamicReport;
