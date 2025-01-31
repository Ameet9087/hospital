import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import "../VehicleMaintenance/vehicleMaintenance.css";
import VMAddNewVehicle from './vMAddNewVehicle';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import CustomModal from '../../../CustomModel/CustomModal';
import { API_BASE_URL } from '../../api/api';

const VehicleMaintenance = () => {
  const [addVehicle, setAddVehicle] = useState([]); // State to hold vehicle data
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null); // To store the vehicle data for editing

 // Fetch vehicle data when the component mounts
 const fetchVehicles = async () => {
  try {
    // const response = await axios.get("http://localhost:4096/api/ambulances/available");
    const response=await axios.get(`${API_BASE_URL}/ambulances/available`);
    setAddVehicle(response.data); // Set fetched vehicle data
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
  }
};

useEffect(() => {
  fetchVehicles(); // Call the function to fetch data
}, []);

  // Handle opening the popup for adding a new vehicle
  const handleAddNewLabTestClick = () => {
    setEditVehicle(null); // Reset edit state for adding a new vehicle
    setShowPopup(true); // Show the popup
  };

  // Handle closing the popup
  const handleClosePopup = (isUpdated = false) => {
    setShowPopup(false); // Hide the popup
    if (isUpdated) fetchVehicles(); // Refetch vehicles if data was added or updated
  };

  // Handle edit button click
  const handleEditClick = (vehicle) => {
    setEditVehicle(vehicle); // Set the vehicle data to be edited
    setShowPopup(true); // Open the popup
  };

  // Handle updating a vehicle
  const handleUpdateVehicle = async (updatedVehicle) => {
    try {
      // Send the updated data to the backend using a PUT request
      const response = await axios.put(
        `${API_BASE_URL}/ambulances/${updatedVehicle.vehicleId}`,
        updatedVehicle,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Log the response to ensure the update was successful
      console.log("Vehicle updated response:", response.data);

      // Update the state with the updated vehicle details
      setLabTests((prevTests) =>
        prevTests.map((test) =>
          test.vehicleId === updatedVehicle.vehicleId ? updatedVehicle : test
        )
      );

      alert("Vehicle updated successfully");
      setShowPopup(false); // Close the popup after successful update
    } catch (error) {
      console.error("Error updating vehicle:", error);
      alert("Failed to update vehicle");
    }
  };

  // Handle delete button click
  const handleDeleteClick = async (vehicleId) => {
    try {
      await axios.delete(`${API_BASE_URL}/ambulances/${vehicleId}`);
      setLabTests((prevTests) => prevTests.filter((test) => test.vehicleId !== vehicleId)); // Update the state
      alert("Vehicle deleted successfully");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      alert("Failed to delete vehicle");
    }
  };

  return (
    <div className="vehicleMaintenance-container">
      <div className="vehicleMaintenance-firstRow">
        <div className="vehicleMaintenance-addBtn">
          <button className="vehicleMaintenance-add-button" onClick={handleAddNewLabTestClick}>+ Add New Vehicle</button>
        </div>
      </div>

      <div className="vehicleMaintenance-search-N-result">
        <div className="vehicleMaintenance-search-bar">
          {/* <i className="fa-solid fa-magnifying-glass"></i> */}
          <input type="text" placeholder="Search..." />
        </div>
        <div className="vehicleMaintenance-results-info">
          <span>Showing {addVehicle.length} / {addVehicle.length} results</span>
          <button className="vehicleMaintenance-print-button"><i className="fa-solid fa-file-excel"></i> Export</button>
          <button className="vehicleMaintenance-print-button"><i className="fa-solid fa-print"></i> Print</button>
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Serial No","Vehicle Type", "Vehicle Number", "Vehicle Company Name", "Year Of Manufacture",
                "Fuel Type", "Driver Name","Driver Contact Number"
                // "Maintenance Type", "Schedule Date", "Completed Date", "Service Provider", 
                // "Repair Details", "Parts Replace", "Cost", "Actions"
              ].map((header, index) => (
                <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                  <div className="header-content">
                    <span>{header}</span>
                    <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {addVehicle.map((test, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{test.vehicleType}</td>
                <td>{test.vehicleNumber}</td>
                <td>{test.vehicleCompanyName}</td>
                <td>{test.yearOfManufacture}</td>
                <td>{test.fuelType}</td>
                <td>{test.driverName}</td>
                <td>{test.driverContactNumber}</td>
                {/* <td>{test.maintenanceType}</td>
                <td>{test.scheduleDate}</td>
                <td>{test.completedDate}</td>
                <td>{test.serviceProvider}</td>
                <td>{test.repairDetails}</td>
                <td>{test.partsReplace}</td>
                <td>{test.cost}</td> */}
                <td>
                  <button
                    className="vehicleMaintenance-edit-button"
                    onClick={() => handleEditClick(test)}
                  >
                    Edit
                  </button>
                  <button
                    className="vehicleMaintenance-delete-button"
                    onClick={() => handleDeleteClick(test.vehicleId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="vehicleMaintenance-modal">
          <CustomModal isOpen={showPopup} onClose={handleClosePopup}>
            <VMAddNewVehicle
              onClose={handleClosePopup}
              editVehicle={editVehicle} // Pass editVehicle prop here
              onSave={handleUpdateVehicle} // Pass save handler here
            />
          </CustomModal>
        </div>
      )}
    </div>
  );
};

export default VehicleMaintenance;