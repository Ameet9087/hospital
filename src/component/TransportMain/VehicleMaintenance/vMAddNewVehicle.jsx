import React, { useState, useEffect } from "react";
import "../VehicleMaintenance/vMAddNewVehicle.css";
import PopupTable from "../../Admission/PopupTable";
import { FaSearch } from "react-icons/fa";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";

const LabVenderAddNewLV = ({ onClose }) => {
  const [vehicle, setVehicle] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [formData, setFormData] = useState({
    yearOfManufacture: "",
    vehicleType: "",
    vehicleCompanyName: "",
    fuelType: "",
    driverName: "",
    driverContactNumber: "",
  });
  const [activePopup, setActivePopup] = useState(null);

  const VehicleHeading = ["vehicleId", "registrationNumber", "availability"];

  const fetchVehicles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/vehicles`);
      const data = await response.json();
      setVehicle(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const getPopupData = () => {
    if (activePopup === "vehicls") {
      return { columns: VehicleHeading, data: vehicle };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = (vehicle) => {
    setSelectedVehicle({
      vehicleId: vehicle.vehicleId,
      registrationNumber: vehicle?.registrationNumber,
    });
    setActivePopup(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      vehicleId: selectedVehicle?.vehicleId || null,
      // registrationNumber: selectedVehicle?.registrationNumber || "",
      yeareOfManufacture: formData.yearOfManufacture || "",
      vehicleType: formData.vehicleType || "",
      vehicleCompanyName: formData.vehicleCompanyName || "",
      fuelType: formData.fuelType || "",
      driverName: formData.driverName || "",
      // driverContactNumber: formData.driverContactNumber || "",
      vehicleDTO: {
        vehicleId: selectedVehicle?.vehicleId || null,
      },
    };
    console.log("dfghjkl", requestData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/vehicle-maintenance`,
        requestData
      );
      // Assuming you want to handle the response data or update any state here
      console.log("Success:", response);
      toast.success("Vehicle added successfully!");
      console.log("Success:", response);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding vehicle!");
    }
  };

  return (
    <>
      <div className="vMAddNewVehicle-header">
        <h3>Add New Vehicle</h3>
      </div>

      <div className="vMAddNewVehicle-form">
        <div className="vMAddNewVehicle-form-row">
          <div className="vMAddNewVehicle-form-group-1row">
            <div className="vMAddNewVehicle-form-group">
              <FloatingInput
                label={"Vehicle Id"}
                type="search"
                value={selectedVehicle?.vehicleId || ""}
                onIconClick={() => setActivePopup("vehicls")}
              />
            </div>

            <div className="vMAddNewVehicle-form-group">
              <FloatingSelect
                label="Vehicle Type"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "Select Vehicle Type" },
                  { value: "ambulance", label: "Ambulance" },
                  { value: "air-ambulance", label: "Air Ambulance" },
                  { value: "rapid-response", label: "Rapid Response Vehicles" },
                  { value: "critical-care", label: "Critical Care Ambulance" },
                ]}
              />
            </div>
          </div>

          <div className="vMAddNewVehicle-form-group-1row">
            <div className="vMAddNewVehicle-form-group">
              <FloatingInput
                label={"Registration Number"}
                type="text"
                name="registrationNumber"
                value={selectedVehicle?.registrationNumber || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="vMAddNewVehicle-form-group">
              <FloatingInput
                label={"Vehicle Company Name *"}
                type="text"
                name="vehicleCompanyName"
                value={formData.vehicleCompanyName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="vMAddNewVehicle-form-group-1row">
            <div className="vMAddNewVehicle-form-group">
              <FloatingInput
                label={"Year Of Manufacture"}
                type="text"
                name="yearOfManufacture"
                value={formData.yearOfManufacture}
                onChange={handleInputChange}
                min="1"

              />
            </div>
            <div className="vMAddNewVehicle-form-group">
              <FloatingSelect
                label="Fuel Type"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "Select Fuel Type" },
                  { value: "petrol", label: "Petrol" },
                  { value: "diesel", label: "Diesel" },
                  { value: "cng", label: "CNG" },
                ]}
                required
              />
            </div>
          </div>
        </div>

        <div className="vMAddNewVehicle-form-actions">
          <button className="vMAddNewVehicle-add-btn" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>

      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
    </>
  );
};

export default LabVenderAddNewLV;
