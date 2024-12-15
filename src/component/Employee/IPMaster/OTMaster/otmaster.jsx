import React from "react";
import "./OTMaster.css";
import{ useEffect, useState } from "react";

const OTMaster = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [otName, setOtName] = useState("");
  const [rentPerTake, setRentPerTake] = useState("");

  useEffect(() => {
    // Fetch location data from the API
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://192.168.43.4:8080/api/location-masters");
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("http://192.168.43.4:8080/api/add-items");
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };
    fetchMedicines();
  }, []);


  const handleSave = async () => {
    const payload = {
      otName,
      rentPerTake: parseFloat(rentPerTake),
      locations: selectedLocation ? [{ id: parseInt(selectedLocation) }] : [],
      addItems: selectedMedicines.map((id) => ({ addItemId: id })),
    };

    try {
      const response = await fetch("http://192.168.43.4:8080/api/otmasters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data saved successfully:", data);
        alert("OT Master saved successfully!");
      } else {
        console.error("Error saving OT Master:", response.statusText);
        alert("Failed to save OT Master!");
      }
    } catch (error) {
      console.error("Error saving OT Master:", error);
      alert("An error occurred while saving OT Master!");
    }
  };

  // Handle medicine selection
  const handleMedicineSelection = (id) => {
    setSelectedMedicines((prev) =>
      prev.includes(id) ? prev.filter((medId) => medId !== id) : [...prev, id]
    );
  };
  return (
    <div className="otmaster-container">
      <div className="otmaster-header">
        <h3>OT Master</h3>
      </div>
      <div className="otmaster-form">
        <label>
          OT Name: <input type="text" className="otmaster-input" 
           value={otName}
           onChange={(e) => setOtName(e.target.value)}/>
        </label>
        <label>
          Rent Per: <input type="text" className="otmaster-input" 
          value={rentPerTake}
          onChange={(e) => setRentPerTake(e.target.value)}/>
        </label>
        <label>
          Select Location:
          <select
            className="otmaster-select"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Select</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.locationName}
              </option>
            ))}
          </select>
        </label>
        <label>
          <input type="checkbox" className="otmaster-checkbox" /> Medicine Required
        </label>
      </div>
      <table className="otmaster-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Medicine</th>
            <th>Rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {medicines.map((medicine, index) => (
            <tr key={medicine.addItemId}>
              <td>{index + 1}</td>
              <td>{medicine.itemName || "N/A"}</td>
              <td>{medicine.salesRate || "N/A"}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedMedicines.includes(medicine.addItemId)}
                  onChange={() => handleMedicineSelection(medicine.addItemId)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="otmaster-sidebar">
      <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default OTMaster;