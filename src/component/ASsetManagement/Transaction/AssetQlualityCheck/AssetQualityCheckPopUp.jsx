import React, { useRef, useEffect, useState } from "react";
import "./AssetQualityCheckPopUp.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Using react-icons
import { API_BASE_URL } from "../../../api/api";

const AssetQualityCheckPopUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    recordNo: "",
    qualityCheckDate: "",
    nameOfEquipment: "",
    equipmentNo: "",
    assetNo: "",
    location: "",
    makeSerialNo: "",
    category: "",
    companyBrand: "",
    depreciation: "",
    modelNo: "",
    responsibilityPerson: "",
    poNo: "",
    poDate: "",
    invoiceNo: "",
    invoiceDate: "",
    amcFromDate: "",
    amcToDate: "",
    serviceCompany: "",
  });

  const [equipmentData, setEquipmentData] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(0);

  // Fetch equipment data from API
  useEffect(() => {
    fetch(`${API_BASE_URL}/equipmentMaster/all`)
      .then((response) => response.json())
      .then((data) => {
        setEquipmentData(data);
      })
      .catch((error) => console.error("Error fetching equipment data:", error));
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle equipment selection
  const handleEquipmentChange = (e) => {
    const equipmentId = e.target.value;
    setSelectedEquipment(equipmentId);

    const selected = equipmentData.find((item) => item.equId.toString() === equipmentId);
    if (selected) {
      setFormData({
        ...formData,
        nameOfEquipment: selected.equipmentDTO.name,
        equipmentNo: selected.eqpNumber,
        assetNo: selected.equipmentDTO.assetCode,
        location: selected.equipmentDTO.location,
        makeSerialNo: selected.equipmentDTO.serialNumber,
        category: selected.equipmentDTO.categoryName,
        companyBrand: selected.equiUsingDeptInfoDTO?.company || "",
        depreciation: selected.equiUsingDeptInfoDTO?.assetCateMasterDTO?.depreciation || "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedEquipment);
    const newFormData = {
      date: formData.qualityCheckDate,
      poNo: formData.poNo,
      poDate: formData.poDate,
      invoiceNo: formData.invoiceNo,
      invoiceDate: formData.invoiceDate,
      amcFromDate: formData.amcFromDate,
      amcToDate: formData.amcToDate,
      serviceFromCompany: formData.serviceCompany,
      equipmentId: selectedEquipment
    }
    console.log(newFormData);
    fetch(`${API_BASE_URL}/quality-checks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFormData),
    })
      .then((data) => {
        console.log("Data saved successfully:", data);
        alert("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        alert("An error occurred while saving data.");
      });
  };
  // ===================================================================

  return (
    <div
      className="AssetQualityCheckPopUp-container"
    >
      <div className="AssetQualityCheckPopUp-header">
        <h4>Asset Quality Check</h4>
        {/* <button className="AssetQualityCheckPopUp-close-btn" onClick={onClose}>
          X
        </button> */}
      </div>
      <div className="AssetQualityCheckPopUp-form">
        <div className="AssetQualityCheckPopUp-form-row">
          <div className="AssetQualityCheckPopUp-form-group-1row">
            <div className="AssetQualityCheckPopUp-form-group">
              <label>Record No:</label>
              <input type="text" name="recordNo" value={formData.recordNo} onChange={handleInputChange} />
            </div>
            <div className="AssetQualityCheckPopUp-form-group">
              <label>Quality Check Date:</label>
              <input type="date" name="qualityCheckDate" value={formData.qualityCheckDate} onChange={handleInputChange} />
            </div>
            <div className="AssetQualityCheckPopUp-form-group">
              <label>Select Equipment:</label>
              <select value={selectedEquipment} onChange={handleEquipmentChange}>
                <option value="">-- Select Equipment --</option>
                {equipmentData.map((item) => (
                  <option key={item.equId} value={item.equId}>
                    {item.equipmentDTO.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="AssetQualityCheckPopUp-form-group-1row">
            <div className="AssetQualityCheckPopUp-form-group">
              <label>Name of Equipment:</label>
              <input type="text" name="nameOfEquipment" value={formData.nameOfEquipment} onChange={handleInputChange} />
            </div>
            <div className="AssetQualityCheckPopUp-form-group">
              <label>Equipment No:</label>
              <input type="text" name="equipmentNo" value={formData.equipmentNo} onChange={handleInputChange} />
            </div>
            <div className="AssetQualityCheckPopUp-form-group">
              <label>Asset No:</label>
              <input type="text" name="assetNo" value={formData.assetNo} onChange={handleInputChange} />
            </div>
          </div>
          <div className="AssetQualityCheckPopUp-form-group-1row">
            <div className="AssetQualityCheckPopUp-form-group">
              <label>Location:</label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
            </div>
            <div className="AssetQualityCheckPopUp-form-group">
              <label>Make & Serial No:</label>
              <input type="text" name="makeSerialNo" value={formData.makeSerialNo} onChange={handleInputChange} />
            </div>
            <div className="AssetQualityCheckPopUp-form-group">
              <label>Category:</label>
              <input type="text" name="category" value={formData.category} onChange={handleInputChange} />
            </div>
          </div>

          <div className="AssetQualityCheckPopUp-form-group-1row">
            <div className="AssetQualityCheckPopUp-form-group">
              <label>Company Brand:</label>
              <input type="text" name="companyBrand" value={formData.companyBrand} onChange={handleInputChange} />
            </div>
            <div className="AssetQualityCheckPopUp-form-group">
              <label>Depreciation:</label>
              <input type="text" name="depreciation" value={formData.depreciation} onChange={handleInputChange} />
            </div>
            <div className="AssetQualityCheckPopUp-form-group">
              <label>Model No:</label>
              <input type="text" name="modelNo" value={formData.modelNo} onChange={handleInputChange} />
            </div>
          </div>
          <div className="AssetQualityCheckPopUp-form-group-1row">
            <div className="AssetQualityCheckPopUp-form-group">
              <label>Responsibility Person:</label>
              <input type="text" name="responsibilityPerson" value={formData.responsibilityPerson} onChange={handleInputChange} />
            </div>
            <div className="AssetQualityCheckPopUp-form-group">
              <label>PO No:</label>
              <input type="text" name="poNo" value={formData.poNo} onChange={handleInputChange} />
            </div>
            <div className="AssetQualityCheckPopUp-form-group">
              <label>PO Date:</label>
              <input type="date" name="poDate" value={formData.poDate} onChange={handleInputChange} />
            </div>
          </div>
          <div className="AssetQualityCheckPopUp-form-group-1row">
            <div className="AssetQualityCheckPopUp-form-group">
              <label>Invoice No:</label>
              <input type="text" name="invoiceNo" value={formData.invoiceNo} onChange={handleInputChange} />
            </div>
            <div className="AssetQualityCheckPopUp-form-group">
              <label>Invoice Date:</label>
              <input type="date" name="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange} />
            </div>
            <div className="AssetQualityCheckPopUp-form-group">
              <label>AMC From Date:</label>
              <input type="date" name="amcFromDate" value={formData.amcFromDate} onChange={handleInputChange} />
            </div>
          </div>
          <div className="AssetQualityCheckPopUp-form-group-1row">
            <div className="AssetQualityCheckPopUp-form-group">
              <label>AMC To Date:</label>
              <input type="date" name="amcToDate" value={formData.amcToDate} onChange={handleInputChange} />
            </div>
            <div className="AssetQualityCheckPopUp-form-group">
              <label>AMC/CMC Service From Company:</label>
              <input type="text" name="serviceCompany" value={formData.serviceCompany} onChange={handleInputChange} />
            </div>
            <div className="AssetQualityCheckPopUp-form-group">
            </div>
          </div>
        </div>
      </div>




      <div className="AssetQualityCheckPopUp-form-actions">
        <button
          className="AssetQualityCheckPopUp-add-btn"
          onClick={handleSubmit}
        >
          Add
        </button>
        <button className="AssetQualityCheckPopUp-close-btn">Close</button>
      </div>

    </div>
  );
};

export default AssetQualityCheckPopUp;
