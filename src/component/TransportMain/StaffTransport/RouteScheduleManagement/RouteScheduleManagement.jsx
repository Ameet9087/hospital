import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './RouteScheduleManagement.css';
import Modal from '../Modal'; // Import the modal component
import AddForm from '../RouteScheduleManagement/AddRouteScheduleManagement'; // Import the AddForm component
import UpdateForm from '../RouteScheduleManagement/UpdateRouteScheduleManagement'; // Import the UpdateForm component
import { API_BASE_URL } from '../../../api/api';

const RouteScheduleManagement = () => {
  const [scheduleData, setScheduleData] = useState([]); // Initialize state for schedule data
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state for Add Form
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Manage modal state for Update Form
  const [currentEditData, setCurrentEditData] = useState(null); // Data of the route to edit
  const [error, setError] = useState(null); // State for error handling

  // Fetch schedule data on component mount
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/routes`);
        console.log(response.data)// Replace with your actual API URL
        setScheduleData(response.data); // Set the schedule data from response
      } catch (error) {
        console.error('Error fetching schedule data:', error);
        setError('Failed to fetch schedule data.'); // Set error state if fetching fails
      }
    };

    fetchScheduleData(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs once on mount

  // Open modal for adding new route
  const handleAddButtonClick = () => {
    setIsModalOpen(true);
  };

  // Close the add modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Add a new route to the schedule
  const handleAddFormSubmit = (newData) => {
    setScheduleData([...scheduleData, newData]);
    setIsModalOpen(false);
  };

  // Open modal for editing a route
  const handleEditButtonClick = (routeData) => {
    setCurrentEditData(routeData);
    setIsEditModalOpen(true);
  };

  // Close the edit modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Update route data after submitting the edit form
  const handleUpdateFormSubmit = (updatedData) => {
    const updatedScheduleData = scheduleData.map((schedule) =>
      schedule.id === updatedData.id ? updatedData : schedule
    );
    setScheduleData(updatedScheduleData);
    setIsEditModalOpen(false);
  };

  return (
    <div className="RRStaffTransportManagement-table-container">
      <h2 className="RRStaffTransportManagement-table-title">Route and Schedule Management</h2>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      <div className="RRStaffTransportManagement-button-container">
        <button className="RRStaffTransportManagement-add-button" onClick={handleAddButtonClick}>
          Add
        </button>
      </div>

      <table className="RRStaffTransportManagement-table">
        <thead>
          <tr>
            <th>Route ID</th> {/* New Route ID column */}
            <th>Route</th>
            <th>Pickup Time</th>
            <th>Drop-off Time</th>
            {/* <th>Actual Pickup/Drop-off Time</th> */}
            <th>Traffic Condition</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.routeID}</td> {/* Render Route ID */}
              <td>{schedule.routeName}</td> {/* Render Route */}
              <td>{schedule.pickupTime}</td>
              <td>{schedule.dropOffTime}</td>
              {/* <td>{schedule.actualPickupTime}</td> */}
              <td>{schedule.trafficCondition}</td>
              <td>
                <button
                  className="RRStaffTransportManagement-edit-button"
                  onClick={() => handleEditButtonClick(schedule)} // Open edit modal
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding a new route */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddForm onSubmit={handleAddFormSubmit} />
      </Modal>

      {/* Modal for editing an existing route */}
      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        {currentEditData && (
          <UpdateForm initialData={currentEditData} onSubmit={handleUpdateFormSubmit} />
        )}
      </Modal>
    </div>
  );
};

export default RouteScheduleManagement;
