import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Investigations.css";

const Investigations = () => {
  // State to store the investigation data
  const [investigationsData, setInvestigationsData] = useState([]);

  // Fetch the data from the API on component mount
  useEffect(() => {
    axios
      .get("http://192.168.0.115:8080/api/investigations")
      .then((response) => {
        // Set the fetched data into state
        setInvestigationsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching investigations data", error);
      });
  }, []); // Empty dependency array to fetch data only on mount

  return (
    <div className="investigations-container">
      <h2>Investigations</h2>
      <table className="investigations-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Select</th>
            <th>Req Date</th>
            <th>Req Time</th>
            <th>Req No</th>
            <th>Department Name</th>
            <th>Test Name</th>
            <th>Test Component</th>
            <th>Result Value</th>
          </tr>
        </thead>
        <tbody>
          {investigationsData.map((item, index) => (
            <tr key={index}>
              <td>{item.sn}</td>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.reqDate}</td>
              <td>{item.reqTime}</td>
              <td>{item.reqNo}</td>
              <td>{item.department}</td>
              <td>{item.testName}</td>
              <td>{item.testComponent}</td>
              <td>{item.resultValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Investigations;
