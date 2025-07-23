import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './TransportServiceDetails.css';
import Modal from '../Modal';
import StaffTransportForm from '../TransportServiceDetails/AddTransportServiceDetails';
import UpdateStaffForm from '../TransportServiceDetails/UpdateTransportServiceDetails';
import { API_BASE_URL } from '../../../api/api';

const VehicleTable = () => {
  const [vehicleData, setVehicleData] = useState([]); // Initialize state for vehicle data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [error, setError] = useState(null); // State for error handling

  // Fetch vehicle data on component mount
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/vehicles`); // Replace with your actual API URL
        setVehicleData(response.data);
        console.log(response.data) // Set the vehicle data from response
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
        setError('Failed to fetch vehicle data.'); // Set error state if fetching fails
      }
    };

    fetchVehicleData(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs once on mount

  const handleAdd = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (index) => {
    setCurrentVehicle(vehicleData[index]);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentVehicle(null);
  };

  const handleFormSubmit = (newData) => {
    if (isEditMode) {
      const updatedVehicleData = vehicleData.map((vehicle) =>
        vehicle.vehicleId === newData.vehicleId ? newData : vehicle
      );
      setVehicleData(updatedVehicleData);
    } else {
      setVehicleData([...vehicleData, newData]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="VehicleManagement-container">
      <h2>Vehicle Management</h2>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Add Button */}
      <button className="VehicleManagement-add-button" onClick={handleAdd}>
        Add New Vehicle
      </button>

      {/* Table to display vehicle data */}
      <table className="VehicleManagement-table">
        <thead>
          <tr>
            <th>Staff Vehicle Id</th>
            <th>Vehicle Capacity</th>
            <th>Driver Name</th>
            <th>Driver Contact</th>
            <th>License Plate Number</th>
            <th>Vehicle Type</th>

            <th>Availability Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {vehicleData.map((vehicle, index) => (
            <tr key={index}>
              <td>{vehicle.vehicleID}</td>
              <td>{vehicle.vehicleCapacity}</td>
              <td>{vehicle.driverName}</td>
              <td>{vehicle.driverContact}</td>
              <td>{vehicle.licensePlateNumber}</td>
              <td>{vehicle.vehicleType}</td>
              <td>{vehicle.availabilityStatus}</td>
              <td>
                <button
                  className="VehicleManagement-edit-button"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit Form */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        {isEditMode ? (
          <UpdateStaffForm staffData={currentVehicle} onSubmit={handleFormSubmit} />
        ) : (
          <StaffTransportForm onSubmit={handleFormSubmit} />
        )}
      </Modal>
    </div>
  );
};

export default VehicleTable;
