// Dhanashree_EmergencyTransportTable_24/09_Starts

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./emergencyTransportTable.css";
import EmrTranEdit from "./emrTranEdit";
import { API_BASE_URL } from "../../api/api";

function EmergencyTransportTable() {
  const [data, setData] = useState([]); // Initialize data state
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const navigate = useNavigate();

  // Fetch data when the component mounts
  useEffect(() => {
    axios.get(`${API_BASE_URL}/EmergencyTransport`) // Replace with your actual API URL
      .then((response) => {
        console.log(response.data);
        setData(response.data); // Set the data state with the response
      })
      .catch((error) => {
        console.error("Error fetching emergency transport data:", error);
      });
  }, []); // Empty dependency array ensures this runs once on mount

  const handleAddEmergencyClick = () => {
    // navigate("/add-emergency");
    navigate("/emergencytransport/addEmergencyPageTransport");
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  return (
    <div className="emergencyTransportTable">
      <button className="emergencyTransportTable-add-btn" onClick={handleAddEmergencyClick}>
        Add Emergency Data for patient
      </button>
      <table className="emergencyTransportTable-emergency-table">
        <thead>
          <tr>
            <th>Emergency Id</th>
            <th>Patient Id</th>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Contact Number</th>
            <th>Emergency Type</th>
            <th>Pickup Location</th>
            <th>Status</th>
            <th>Emergency Cost</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.emergencyId}</td>
              <td>{row.patientId}</td>
              <td>{row.patientName}</td>
              <td>{row.age}</td>
              <td>{row.gender}</td>
              <td>{row.contactNumber}</td>
              <td>{row.emergencyType}</td>
              <td>{row.pickupLocation}</td>
              <td>{row.status}</td>
              <td>{row.emergencyCost}</td>
              <td>
                <button className="emergencyTransportTable-edit-btn" onClick={() => handleEditClick(row)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="emergencyTransportTable-modal">
          <div className="emergencyTransportTable-modal-content">
            <button className="emergencyTransportTable-close-btn" onClick={closeModal}>X</button>
            <EmrTranEdit row={selectedRow} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default EmergencyTransportTable;

// Dhanashree_EmergencyTransportTable_24/09_Ends
