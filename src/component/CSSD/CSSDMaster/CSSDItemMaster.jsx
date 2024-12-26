import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import './CSSDItemMaster.css';
import { API_BASE_URL } from '../../api/api';

const CSSDItemMaster = () => {
  const [status, setStatus] = useState("Active");
  const [sterileType, setSterileType] = useState("Autoclave");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [instruments, setInstruments] = useState(false);
  const [mapItemFromInventory, setMapItemFromInventory] = useState("");
  const [kitId, setKitId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if an itemName was passed in state
    if (location.state?.itemName) {
      setMapItemFromInventory(location.state.itemName);
    }
  }, [location.state]);

  const handleSearchClick = () => {
    navigate('/display-CSSD-ItemMaster');
  };

  const handleSave = () => {
    const payload = {
      itemId: Math.floor(Math.random() * 1000),
      itemName,
      quantity: 50,
      description,
      instruments,
      sterlleType: sterileType,
      mapItemFromInventory,
      status,
    };

    axios
      .post(`${API_BASE_URL}/itemmaster`, payload)
      .then((response) => {
        console.log("Item saved successfully:", response.data);
        alert("Item saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving item:", error);
        alert("Error saving item.");
      });
  };

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="CSSDItemMaster-container">
      <div className="CSSDItemMaster-header">
        <div className="CSSDItemMaster-heading">
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="back-icon"
            onClick={handleClose}
          />
          <h2>CSSD Item Master</h2>
        </div>
      </div>
      <div className="CSSDItemMaster-content">
        <div className="CSSDItemMaster-formContainer">
          <div className="CSSDItemMaster-formGroup">
            <label>Item Name:</label>
            <input
              type="text"
              placeholder="Enter item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="CSSDItemMaster-formGroup">
            <label>Description:</label>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="CSSDItemMaster-formGroup">
            <label></label>
            <label>
              <input
                type="checkbox"
                checked={instruments}
                onChange={(e) => setInstruments(e.target.checked)}
              />{" "}
              Instruments
            </label>
          </div>
          <div className="CSSDItemMaster-formGroup">
            <label>Sterile Type:</label>
            <select
              value={sterileType}
              onChange={(e) => setSterileType(e.target.value)}
              className="CSSDItemMaster-select"
            >
              <option value="Dry Heat">Dry Heat</option>
              <option value="Steam High Pressure -Autoclave">
                Steam High Pressure -Autoclave
              </option>
              <option value="Ethylene Oxide">Ethylene Oxide</option>
              <option value="Chemical">Chemical</option>
              <option value="Radiation">Radiation</option>
              <option value="Infra Red Radiation">Infra Red Radiation</option>
              <option value="Ultra Violet Radiation">Ultra Violet Radiation</option>
              <option value="Ionizing/Gamma Radiation">Ionizing/Gamma Radiation</option>
              <option value="ETO">ETO</option>
            </select>
          </div>
          <div className="CSSDItemMaster-formGroup">
            <label>Map Item From Inventory:</label>
            <div className="search-input-container">
              <input
                type="text"
                value={mapItemFromInventory}
                onChange={(e) => setMapItemFromInventory(e.target.value)}
                className="CSSDItemMaster-input"
                placeholder="Search Item"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="search-icon-inventory"
                onClick={handleSearchClick}
              />
            </div>
          </div>
          <div className="CSSDItemMaster-formGroup">
            <label>Status:</label>
            <div className="CSSDItemMaster-statusOptions">
              <input
                type="radio"
                value="Active"
                checked={status === "Active"}
                onChange={() => setStatus("Active")}
              />
              Active
              <input
                type="radio"
                value="Inactive"
                checked={status === "Inactive"}
                onChange={() => setStatus("Inactive")}
              />
              Inactive
            </div>
          </div>

        </div>
        <div className="CSSDItemMaster-buttonContainer">
          <button onClick={handleSave}>Save</button>
          <button>Delete</button>
          <button>Clear</button>
          <button onClick={handleClose}>Close</button>
          <button>Search</button>
          <button>Tracking</button>
          <button>Print</button>
          <button>Version Comparison</button>
          <button>SDC</button>
          <button>Testing</button>
          <button>Info</button>
        </div>
      </div>
    </div>
  );
};

export default CSSDItemMaster;
