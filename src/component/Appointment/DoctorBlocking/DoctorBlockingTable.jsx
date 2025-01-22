import React, { useEffect, useState } from "react";
import "./DoctorBlockingTable.css";
import CustomModal from "../../CustomModel/CustomModal";
import DoctorBlocking from "./DoctorBlocking";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";

const DoctorBlockingTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [doctorBlockingData, setDoctorBlockingData] = useState([]);
  const [editingData, setEditingData] = useState(null);

  // Fetch doctor blocking data
  useEffect(() => {
    const fetchDoctorBlockingData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/doctor-blocking`);
        setDoctorBlockingData(response.data);
      } catch (error) {
        console.error("Error fetching doctor blocking data:", error);
      }
    };
    fetchDoctorBlockingData();
  }, []);

  // Handle Edit
  const handleEdit = (data) => {
    setEditingData(data); // Set the data for editing
    setShowModal(true); // Open modal
  };
  const closeModal = (updatedData) => {
    setShowModal(false);
    setEditingData(null);

    if (updatedData) {
      // Update the table data
      const updatedList = editingData
        ? doctorBlockingData.map((item) =>
            item.id === updatedData.id ? updatedData : item
          )
        : [...doctorBlockingData, updatedData];
      setDoctorBlockingData(updatedList);
    }
  };

  return (
    <div className="DoctorBlockingTable-container">
      <div className="DoctorBlockingTable-addButton">
        <button
          className="DoctorBlockingTable-btn"
          onClick={() => setShowModal(true)}
          aria-label="Add Doctor Blocking"
        >
          Add
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="DoctorBlockingTable-searchInput"
          aria-label="Search"
        />
      </div>

      <div className="DoctorBlockingTable-table">
        <table>
          <thead>
            <tr>
              <th>Blocking From Date</th>
              <th>Blocking To Date</th>
              <th>Blocking From Time</th>
              <th>Blocking To Time</th>
              <th>Doctor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctorBlockingData.length > 0 ? (
              doctorBlockingData.map((block) => (
                <tr key={block.id}>
                  <td>{block.fromDate}</td>
                  <td>{block.toDate}</td>
                  <td>{block.fromTime}</td>
                  <td>{block.toTime}</td>
                  <td>{block.addDoctorDTO?.doctorName}</td>
                  <td>
                    <button onClick={() => handleEdit(block)}>Edit</button>
                    {/* <button onClick={() => handleDelete(block.doctorBlockingId)}>
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No doctor blocking data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <CustomModal isOpen={showModal} onClose={() => closeModal(null)}>
          <DoctorBlocking
            selectedDoctorBlocking={editingData}
            onClose={closeModal}
          />
        </CustomModal>
      )}
    </div>
  );
};

export default DoctorBlockingTable;
