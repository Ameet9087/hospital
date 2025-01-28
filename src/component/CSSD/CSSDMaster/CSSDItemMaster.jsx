import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import './CSSDItemMaster.css';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../../api/api';
import PopupTable from "../../Admission/PopupTable";


const CSSDItemMaster = () => {
  const [status, setStatus] = useState("Active");
  const [sterileType, setSterileType] = useState("Autoclave");
  const [itemName, setItemName] = useState("");
  const [quantity,setQuantity]=useState("");
  const [description, setDescription] = useState("");
  const [instruments, setInstruments] = useState(false);
  const [mapItemFromInventory, setMapItemFromInventory] = useState("");
  const [kitId, setKitId] = useState("");
    const [inventoryData, setInventoryData] = useState([]);
    const [activePopup,setActivePopup]=useState([]);
    const [selectedInventoryItem,setSelectedInventoryItem]=useState([]);
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if an itemName was passed in state
    if (location.state?.itemName) {
      setMapItemFromInventory(location.state.itemName);
    }
  }, [location.state]);

  useEffect(() => {
    // Fetch inventory data on component mount
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/inventory`);
        setInventoryData(response.data); // Assuming response.data is an array
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/itemmaster`);
      setItems(response.data); // Assuming the response contains the items array
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  const handleEdit = (item) => {
    setEditingItem(item); // Set the item to be edited
    setItemName(item.itemName);
    setQuantity(item.quantity);
    setDescription(item.description);
    setSterileType(item.sterileType);
    setStatus(item.status);
    setInstruments(item.instruments);
  };

  const resetForm = () => {
    setEditingItem(null);
    setItemName('');
    setQuantity('');
    setDescription('');
    setSterileType('Autoclave');
    setStatus('Active');
    setInstruments(false);
  };

  



  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${API_BASE_URL}/itemmaster/${itemId}`);
        alert('Item deleted successfully!');
        fetchItems(); // Refresh the items list
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item.');
      }
    }
  };

    const handleSelect = async (data) => {
    if (activePopup === "inventoryItem") {
        setSelectedInventoryItem(data);
    }
    setActivePopup(null); // Close the popup after selection
  };
  

  const handleSave = () => {
    const payload = {
      itemId: Math.floor(Math.random() * 1000),
      itemName,
      quantity,
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


const getPopupData = () => {
    if (activePopup === "inventoryItem") {
      return { columns: ["inventoryId","itemName"], data: inventoryData };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

 


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
            <label>Item Quantity:</label>
            <input
              type="text"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
          {/* <div className="CSSDItemMaster-formGroup">
            <label>Map Item From Inventory:</label>
            <div className="search-input-container">
              <input
                type="text"
                 value={selectedInventoryItem?.itemName}
                onChange={(e) => setMapItemFromInventory(e.target.value)}
                className="CSSDItemMaster-input"
                placeholder="Search Item"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="search-icon-inventory"
                 onClick={() => setActivePopup("inventoryItem")}
              />
            </div>
          </div> */}
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
          <div className="CSSDItemMaster-buttonContainer" >
          <button onClick={handleSave}>Save</button>
          </div>
        </div>
        
        {/* <div className="CSSDItemMaster-buttonContainer">
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
        </div> */}
      </div>

      <div className="CSSDItemMaster-tableContainer">
          <table className="CSSDItemMaster-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Sterile Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.itemId}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.description}</td>
                  <td>{item.sterileType}</td>
                  <td>{item.status}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}  >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button> &nbsp;
                    <button onClick={() => handleDelete(item.itemId)}>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {/* {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )} */}
    </div>

    
  );
};

export default CSSDItemMaster;
