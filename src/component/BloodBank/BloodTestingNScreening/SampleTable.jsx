/* Dhanashree_HIMSSampleDataTable_24/09_Start */

import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "./SampleTable.css";
import SampleTestCard from "./SampleTableEdit"; 
import { API_BASE_URL } from "../../api/api";

const HIMSSampleDataTable = () => {
  const [data, setData] = useState([]); 
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  // Sufiyan_HIMSSampleDataTable_24/09_Start
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(`${API_BASE_URL}/blood-testing/get-all-tests`); 
        console.log(response.data)
        setData(response.data); 
        setLoading(false); 
      } catch (err) {
        setError("Failed to fetch data. Please try again."); 
        setLoading(false); 
      }
    };

      // Sufiyan_HIMSSampleDataTable_24/09_End

    fetchData(); 
  }, []);

  
  const handleEditClick = (test) => {
    setSelectedTest(test);
    setModalOpen(true);
  };

  
  const closeModal = () => {
    setModalOpen(false);
    setSelectedTest(null);
  };

  


  return (
    <div className="HIMSSampleDataTable-container">
      <h2 className="HIMSSampleDataTable-title">Sample Data</h2>
      <div className="HIMSSampleDataTable-table-wrapper">
        <table className="HIMSSampleDataTable-table">
          <thead>
            <tr>
              <th>test_id</th>
              {/* <th>collection_id</th> */}
              {/* <th>test_date</th> */}
              <th>test_type</th>
              <th>result</th>
              <th>remarks</th>
              <th>tested_by</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.test_id}>
                {/* <td>{item.test_id}</td> */}
                 <td>{item.testId}</td> 
                {/* <td>{item.test_date}</td> */}
                <td>{item.testType}</td>
                <td>{item.result}</td>
                <td>{item.remarks}</td>
                <td>{item.testedBy}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <SampleTestCard testData={selectedTest} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HIMSSampleDataTable;

/* Dhanashree_HIMSSampleDataTable_24/09_End */

