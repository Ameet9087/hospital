import React, { useEffect, useState } from "react";
import "./DoctorBlockingTable.css";
import CustomModal from "../../../CustomModel/CustomModal";
import DoctorBlocking from "./DoctorBlocking";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import { useFilter } from "../../ShortCuts/useFilter";

const DoctorBlockingTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [doctorBlockingData, setDoctorBlockingData] = useState([]);
  const [editingData, setEditingData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
  

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
  }, [showModal]);

  const filteredItems = useFilter(doctorBlockingData, searchTerm);


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  // Handle Edit
  const handleEdit = (data) => {
    setEditingData(data); // Set the data for editing
    setShowModal(true); // Open modal
  };



  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/doctor-blocking/doctor-blocking/${id}`);

      if (response.status === 200) {
        alert("Doctor Blocking Deleted Successfully.");
        // Optionally, you can update the UI, like removing the deleted item from the list
        // Example: remove the item from the state or refresh the list
      } else {
        alert("Failed to delete doctor blocking.");
      }
    } catch (error) {
      console.error("Error deleting doctor blocking data:", error);
      alert("An error occurred while deleting the doctor blocking. Please try again later.");
    }
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
       
      </div>
      <div className="doctor-blocking-bar-search">
      <input
            type="text"
            placeholder="Search by break remark"
            className="manage-department-search-input"
            value={searchTerm}
            onChange={handleSearch}
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
            {filteredItems.length > 0 ? (
              filteredItems.map((block) => (
                <tr key={block.id}>
                  <td>{block.fromDate}</td>
                  <td>{block.toDate}</td>
                  <td>{block.fromTime}</td>
                  <td>{block.toTime}</td>
                  <td>{block.addDoctorDTO?.doctorName}</td>
                  <td>
                    <button className="doctor-blocking-table-btn" onClick={() => handleEdit(block)}>Edit</button>
                    <button className="doctor-blocking-table-btn" onClick={() => handleDelete(block.doctorBlockingId)}>
                      Delete
                    </button>
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
