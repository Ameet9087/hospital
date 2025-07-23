import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './EmergencyLateNightArrangements.css';
import Modal from '../Modal'; // Assuming you have a reusable Modal component
import AddSpecialTransportRequest from '../EmergencyLateNightArrangements/AddEmergencyLateNightArrangements'; // Import the form component for adding
import UpdateSpecialTransportRequest from '../EmergencyLateNightArrangements/UpdateEmergencyLateNightArrangements'; // Import the form component for updating
import { API_BASE_URL } from '../../../api/api';

const EmergencyLateNightArrangements = () => {
  const [arrangementData, setArrangementData] = useState([]); // Initialize state for arrangement data
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isEditMode, setIsEditMode] = useState(false); // State to determine whether in "Add" or "Edit" mode
  const [editData, setEditData] = useState(null); // Store the data to edit
  const [error, setError] = useState(null); // State for error handling

  // Fetch arrangement data on component mount
  useEffect(() => {
    const fetchArrangementData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/emergency-arrangements`); 
        console.log(response.data)// Replace with your actual API URL
        setArrangementData(response.data); // Set the arrangement data from response
      } catch (error) {
        console.error('Error fetching arrangement data:', error);
        setError('Failed to fetch arrangement data.'); // Set error state if fetching fails
      }
    };

    fetchArrangementData(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs once on mount

  const handleAdd = () => {
    setIsEditMode(false); // Set to add mode
    setEditData(null); // Clear any edit data
    setIsModalOpen(true); // Open modal when "Add New Request" is clicked
  };

  const handleEdit = (index) => {
    setIsEditMode(true); // Set to edit mode
    setEditData(arrangementData[index]); // Set the selected data for editing
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleAddFormSubmit = (newRequest) => {
    // Add new request to arrangementData and close modal
    setArrangementData([...arrangementData, newRequest]);
    setIsModalOpen(false); // Close modal after submission
  };

  const handleUpdateFormSubmit = (updatedRequest) => {
    // Update the selected request in arrangementData and close modal
    const updatedData = arrangementData.map((item) =>
      item.requestId === updatedRequest.requestId ? updatedRequest : item
    );
    setArrangementData(updatedData);
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div className="EMVStaffTransportManagement-container">
      <h2>Emergency/Late-Night Arrangements</h2>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Add Button */}
      <button className="EMVStaffTransportManagement-add-button" onClick={handleAdd}>
        Add New Request
      </button>

      {/* Table to display emergency arrangements data */}
      <table className="EMVStaffTransportManagement-table">
        <thead>
          <tr>
            <th>Emergency Request ID</th>
            <th>Late-Night Pickup Eligibility</th>
            <th>Driver Allocation for Emergency Shifts</th>
            <th>Special Transport Requests</th>
            <th>No. of Vehicles</th>
            <th>Costing per Request</th>
            <th>No. of Drivers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {arrangementData.map((request, index) => (
            <tr key={index}>
              <td>{request.emergencyRequestID}</td>
              <td>{request.lateNightPickupEligibility}</td>
              <td>{request.driverLocation}</td>
              <td>{request.specialTransportRequest}</td>
              <td>{request.noOfVehicle}</td>
              <td>{request.costPerRequest}</td>
              <td>{request.noOfDriver}</td>
              <td>
                <button className="EMVStaffTransportManagement-edit-button" onClick={() => handleEdit(index)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding or editing special transport request */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {!isEditMode ? (
            <AddSpecialTransportRequest onSubmit={handleAddFormSubmit} />
          ) : (
            <UpdateSpecialTransportRequest initialData={editData} onSubmit={handleUpdateFormSubmit} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default EmergencyLateNightArrangements;
