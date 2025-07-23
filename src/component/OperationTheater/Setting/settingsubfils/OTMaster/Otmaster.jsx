import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OTMaster.css";
import { API_BASE_URL } from "../../../../api/api";

const OTMaster = () => {
  const [rows, setRows] = useState([
    { id: 1, medicineId: "", purchaseRate: "", sellRate: "" },
  ]); // Default row
  const [medicineOptions, setMedicineOptions] = useState([]); // For storing medicines
  const [locations, setLocations] = useState([]); // For storing location names
  const [otName, setOtName] = useState("");
  const [rentPerTake, setRentPerTake] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    fetchMedicines();
    fetchLocations();
  }, []);

  // Fetch medicines from the API
  const fetchMedicines = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/add-item`);
      const items = response.data.map((item) => ({
        id: item.addItemId,
        name: item.itemMaster?.itemName,
        purchaseRate: item.purchaseRate,
        salesRate: item.salePrice,
      }));
      setMedicineOptions(items);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  // Fetch locations from the API
  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/location-masters`);
      const locationData = response.data.map((location) => ({
        id: location.id,
        locationName: location.locationName,
      }));
      setLocations(locationData);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // Function to handle adding a new row
  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      medicineId: "",
      purchaseRate: "",
      sellRate: "",
    };
    setRows([...rows, newRow]);
  };

  // Function to handle deleting a row
  const deleteRow = (id) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
    } else {
      alert("Cannot delete the last row.");
    }
  };

  // Function to handle input changes in the table rows
  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        // If the medicine is changed, autofill purchaseRate and salesRate
        if (field === "medicineId") {
          const selectedMedicine = medicineOptions.find(
            (item) => item.id === parseInt(value)
          );
          if (selectedMedicine) {
            return {
              ...row,
              medicineId: selectedMedicine.id, // Store ID for submission
              purchaseRate: selectedMedicine.purchaseRate,
              sellRate: selectedMedicine.salesRate,
            };
          }
        }
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  // Submit the OT Master data to the API
  const handleSubmit = async () => {
    // Validate that at least one medicine is selected
    const selectedMedicines = rows.filter((row) => row.medicineId);

    if (selectedMedicines.length === 0) {
      alert("Please select at least one medicine");
      return;
    }

    // Prepare addItems with correct item IDs
    const addItems = selectedMedicines.map((row) => ({
      addItemId: row.medicineId,
    }));

    // Validate location selection
    if (!selectedLocation) {
      alert("Please select a location");
      return;
    }

    const otMasterData = {
      otName,
      rentPerTake,
      locationMasterDTO: {
        id: parseInt(selectedLocation),
      },
      addItems: addItems,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/otmasters`,
        otMasterData
      );
      alert("OT Master data saved successfully!");
    } catch (error) {
      console.error("Error saving OT Master data:", error);
      alert("Failed to save OT Master data.");
    }
  };

  return (
    <div className="otmaster-container">
      <div className="otmaster-header">
        <h3>OT Master</h3>
      </div>
      <div className="otmaster-form">
        <label>
          OT Name:{" "}
          <input
            type="text"
            className="otmaster-input"
            value={otName}
            onChange={(e) => setOtName(e.target.value)}
          />
        </label>
        <label>
          Rent Per:{" "}
          <input
            type="text"
            className="otmaster-input"
            value={rentPerTake}
            onChange={(e) => setRentPerTake(e.target.value)}
          />
        </label>
        <label>
          Select Location:
          <select
            className="otmaster-select"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Select</option>
            {locations.map((location, idx) => (
              <option key={idx} value={location.id}>
                {location.locationName}
              </option>
            ))}
          </select>
        </label>
      </div>
      <table className="otmaster-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Medicine</th>
            <th>Purchase Rate</th>
            <th>Sell Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>
                <select
                  className="
                  "
                  value={row.medicineId}
                  onChange={(e) =>
                    handleInputChange(row.id, "medicineId", e.target.value)
                  }
                >
                  <option value="">Select Medicine</option>
                  {medicineOptions.map((medicine) => (
                    <option key={medicine.id} value={medicine.id}>
                      {medicine.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  className="otmaster-rate-input"
                  value={row.purchaseRate}
                  onChange={(e) =>
                    handleInputChange(row.id, "purchaseRate", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  className="otmaster-rate-input"
                  value={row.sellRate}
                  onChange={(e) =>
                    handleInputChange(row.id, "sellRate", e.target.value)
                  }
                />
              </td>
              <td>
                <button
                  className="otmaster-delete-button"
                  onClick={() => deleteRow(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="otmaster-sidebar">
        <button onClick={addRow}>Add Row</button>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default OTMaster;
