import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../VehicleMaintenance/vMAddNewVehicle.css";

const VMAddNewVehicle = ({ onClose, editVehicle }) => {
  const [formData, setFormData] = useState({
    // vehicleId: '',
    vehicleType: '',
    vehicleNumber: '',
    vehicleCompanyName: '',
    yearOfManufacture: '',
    fuelType: '',
    driverName: '',
    driverContactNumber: '',
    licencePlate: '',
  });


  useEffect(() => {
    if (editVehicle) {
      setFormData({
        // vehicleId: editVehicle.vehicleId || '',
        vehicleType: editVehicle.vehicleType || '',
        vehicleNumber: editVehicle.vehicleNumber || '',
        vehicleCompanyName: editVehicle.vehicleCompanyName || '',
        yearOfManufacture: editVehicle.yearOfManufacture || '',
        fuelType: editVehicle.fuelType || '',
        driverName: editVehicle.driverName || '',
        driverContactNumber: editVehicle.driverContactNumber || '',
        licencePlate: editVehicle.licencePlate || '',
      });
    }
  }, [editVehicle]);



  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (for both Add and Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editVehicle) {
        // If editing, send PUT request
        const response = await axios.put(
          `${API_BASE_URL}/ambulances/${editVehicle.ambulanceId}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Vehicle updated response:", response.data);
        alert("Vehicle updated successfully!");
      } else {
        // If adding, send POST request
        const response = await axios.post(
          `${API_BASE_URL}/ambulances/add-vehicle`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Vehicle added response:", response.data);
        alert("Vehicle added successfully!");
      }

      onClose(true); // Close the popup after submission
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit vehicle.");
    }
  };

  return (
    <div className="vMAddNewVehicle-container">
      <div className="vMAddNewVehicle-header">
        <h3>{editVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
      </div>
      <form className="vMAddNewVehicle-form" onSubmit={handleSubmit}>
        <div className="vMAddNewVehicle-form-row">
          <div className="vMAddNewVehicle-form-group-1row">
            {/* <div className="vMAddNewVehicle-form-group">
              <label>Vehicle Id<span>*</span></label>
              <input
                type="number"
                name="vehicleId"
                placeholder="Vehicle Id"
                value={formData.vehicleId}
                onChange={handleChange}
                required
                disabled={!!editVehicle} // Disable input if editing
              />
            </div> */}
            <div className="vMAddNewVehicle-form-group">
              <label>Vehicle Type<span>*</span></label>
              <input
                type="text"
                name="vehicleType"
                placeholder="Vehicle Type"
                value={formData.vehicleType}
                onChange={handleChange}
                required
              />
            </div>

            <div className="vMAddNewVehicle-form-group">
              <label>License Plate :</label>
              <input
                type="text"
                name="licencePlate"
                placeholder="License Plate"
                value={formData.licencePlate}
                onChange={handleChange}
              />
            </div>

          </div>
          <div className="vMAddNewVehicle-form-group-1row">
            <div className="vMAddNewVehicle-form-group">
              <label>Vehicle Number</label>
              <input
                type="text"
                name="vehicleNumber"
                placeholder="Vehicle Number"
                value={formData.vehicleNumber}
                onChange={handleChange}
              />
            </div>
            <div className="vMAddNewVehicle-form-group">
              <label>Vehicle Company Name<span>*</span></label>
              <input
                type="text"
                name="vehicleCompanyName"
                placeholder="Vehicle Company Name"
                value={formData.vehicleCompanyName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="vMAddNewVehicle-form-group-1row">
            <div className="vMAddNewVehicle-form-group">
              <label>Year of Manufacture</label>
              <input
                type="number"
                name="yearOfManufacture"
                placeholder="Year of Manufacture"
                value={formData.yearOfManufacture}
                onChange={handleChange}
              />
            </div>
            <div className="vMAddNewVehicle-form-group">
              <label>Fuel Type<span>*</span></label>
              <input
                type="text"
                name="fuelType"
                placeholder="Fuel Type"
                value={formData.fuelType}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="vMAddNewVehicle-form-group-1row">
            <div className="vMAddNewVehicle-form-group">
              <label>Driver Name</label>
              <input
                type="text"
                name="driverName"
                placeholder="Driver Name"
                value={formData.driverName}
                onChange={handleChange}
              />
            </div>
            <div className="vMAddNewVehicle-form-group">
              <label>Driver Contact No.</label>
              <input
                type="text"
                name="driverContactNumber"
                placeholder="Driver Contact No."
                value={formData.driverContactNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="vMAddNewVehicle-form-group-1row">

          </div>
        </div>
        <div className="vMAddNewVehicle-form-actions">
          <button type="submit" className="vMAddNewVehicle-add-btn">
            {editVehicle ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VMAddNewVehicle;