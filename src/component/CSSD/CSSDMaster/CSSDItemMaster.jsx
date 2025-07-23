import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import "./CSSDItemMaster.css";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../api/api";
import PopupTable from "../../Admission/PopupTable";
import FloatingInput from "../../../FloatingInputs/FloatingInput";
import FloatingSelect from "../../../FloatingInputs/FloatingSelect";
import FloatingTextarea from "../../../FloatingInputs/FloatingTextarea";
import { toast } from "react-toastify";

const CSSDItemMaster = () => {
  const [status, setStatus] = useState("Active");
  const [sterileType, setSterileType] = useState("Autoclave");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [instruments, setInstruments] = useState(false);
  const [mapItemFromInventory, setMapItemFromInventory] = useState("");
  const [kitId, setKitId] = useState("");
  const [inventoryData, setInventoryData] = useState([]);
  const [activePopup, setActivePopup] = useState([]);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState([]);
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.itemName) {
      setMapItemFromInventory(location.state.itemName);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/inventory`);
        setInventoryData(response.data);
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
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  const handleEdit = (item) => {
    setEditingItem(item);
    setItemName(item.itemName);
    setQuantity(item.quantity);
    setDescription(item.description);
    setSterileType(item.sterileType);
    setStatus(item.status);
    setInstruments(item.instruments);
  };

  const resetForm = () => {
    setEditingItem(null);
    setItemName("");
    setQuantity("");
    setDescription("");
    setSterileType("Autoclave");
    setStatus("Active");
    setInstruments(false);
  };

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${API_BASE_URL}/itemmaster/${itemId}`);
        toast.success("Item deleted successfully!");
        fetchItems(); // Refresh the items list
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Error deleting item.");
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
        toast.success("Item saved successfully:", response.data);
        toast.success("Item saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving item:", error);
        toast.error("Error saving item.");
      });
  };

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const getPopupData = () => {
    if (activePopup === "inventoryItem") {
      return { columns: ["inventoryId", "itemName"], data: inventoryData };
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
            <FloatingInput
            label={"Item Name"}
            type="text"
              placeholder="Enter item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}/>
           
          </div>
          <div className="CSSDItemMaster-formGroup">
            <FloatingInput
            label={"Item Quantity"}
            type="number"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="0"/>
           
          </div>

          <div className="CSSDItemMaster-formGroup">
            <FloatingInput
            label={"Description"}
            type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}/>
            
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
            <FloatingSelect
            label={"Sterile Type"}
            value={sterileType}
              onChange={(e) => setSterileType(e.target.value)}
              options={[ { value: "Dry Heat", label: "Dry Heat" },
                { value: "Steam High Pressure -Autoclave", label: "Steam High Pressure -Autoclave" },
                { value: "Ethylene Oxide", label: "Ethylene Oxide" },
                { value: "Chemical", label: "Chemical" },
                { value: "Radiation", label: "Radiation" },
                { value: "Infra Red Radiation", label: "Infra Red Radiation" },
                { value: "Ultra Violet Radiation", label: "Ultra Violet Radiation" },
                { value: "Ionizing/Gamma Radiation", label: "Ionizing/Gamma Radiation" },
                { value: "ETO", label: "ETO" }]}/>
           
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
          <div className="CSSDItemMaster-buttonContainer">
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
                  <button className="CSSDItemMaster-edit-btn" onClick={() => handleEdit(item)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>{" "}
                  &nbsp;
                  <button className="CSSDItemMaster-edit-btn" onClick={() => handleDelete(item.itemId)}>
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
