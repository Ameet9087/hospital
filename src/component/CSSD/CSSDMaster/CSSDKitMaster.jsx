import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSSDKitMaster.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import FloatingInput from "../../../FloatingInputs/FloatingInput";
import FloatingSelect from "../../../FloatingInputs/FloatingSelect";
import FloatingTextarea from "../../../FloatingInputs/FloatingTextarea";
import { toast } from "react-toastify";

const KitMaster = () => {
  const [kitName, setKitName] = useState("");
  const [kitCategoryId, setKitCategoryId] = useState("");
  const [expiryDays, setExpiryDays] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("In Stock");
  const [items, setItems] = useState([{ id: 1, name: "", quantity: "", itemId: "" }]);
  const [showModal, setShowModal] = useState(false);
  const [modalItems, setModalItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [kitCategories, setKitCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch items for the modal
  useEffect(() => {
    if (showModal) {
      axios
        .get(`${API_BASE_URL}/itemmaster`)
        .then((response) => {
          setModalItems(response.data);
        })
        .catch((error) => console.error("Error fetching items:", error));
    }
  }, [showModal]);

  // Handle selected item from the modal
  useEffect(() => {
    if (selectedItem) {
      setItems((prevItems) => {
        const newItems = [...prevItems];
        const lastItemIndex = newItems.length - 1;
        newItems[lastItemIndex] = {
          ...newItems[lastItemIndex],
          name: selectedItem.itemName,
          itemId: selectedItem.itemId,
        };
        return newItems;
      });
    }
  }, [selectedItem]);

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const addItem = () => {
    const incompleteRow = items.find((item) => !item.name || !item.quantity);
    if (incompleteRow) {
      alert("Please complete all fields in the current row before adding a new one.");
      return;
    }
    setItems([...items, { id: items.length + 1, name: "", quantity: "", itemId: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSubmit = async () => {
    if (!kitName || !kitCategoryId) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const incompleteRow = items.find((item) => !item.name || !item.quantity || !item.itemId);
    if (incompleteRow) {
      toast.error("Please complete all item details before submitting.");
      return;
    }

    const payload = {
      kitName,
      kitCategoryId: parseInt(kitCategoryId, 10),
      expiryDays: parseInt(expiryDays, 10) || 0,
      description,
      status,
      kitItems: items.map(item => ({
        itemId: item.itemId,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/kit-masters`, payload);
      if (response.status === 201) {
        toast.success("Kit Master added successfully!");
        setKitName("");
        setKitCategoryId("");
        setExpiryDays("");
        setDescription("");
        setStatus("In Stock");
        setItems([{ id: 1, name: "", quantity: "", itemId: "" }]);
      }
    } catch (error) {
      toast.error("Error creating Kit Master:", error);
      toast.error("Failed to add Kit Master.");
    }
  };

  // Filter modalItems based on search query
  const filteredItems = modalItems.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Select item and close modal
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(false); // Close the modal after selecting the item
  };
  useEffect(() => {
    // Fetch kit categories from the API
    axios.get(`${API_BASE_URL}/kit-categories`)
      .then(response => {
        setKitCategories(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the kit categories!", error);
      });
  }, []);


  return (
    <div className="kit-master">
      <div className="CSSDItemMaster-header">
        <div className="CSSDItemMaster-heading">
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="back-icon"
            onClick={handleClose}
          />
          <h2>CSSD Kit Master</h2>
        </div>
      </div>

      <div className="kit-master-form-group">
        <FloatingInput
        label={" Kit Name *"}
        type="text"
          value={kitName}
          onChange={(e) => setKitName(e.target.value)}
          placeholder="Enter Kit Name"
          required
          restrictions={{char:true}}/>
       
      </div>

      <div className="kit-master-form-group">
      <FloatingSelect
  label={"Kit Category *"}
  value={kitCategoryId}
  onChange={(e) => setKitCategoryId(e.target.value)}
  options={[
    { value: "", label: "Select Kit Category" }, // Default option
    ...kitCategories.map((kit) => ({
      value: kit.kitCategoryId,
      label: kit.description
    }))
  ]}
  required
/>

      
         
       
      </div>

      <div className="kit-master-form-group">
        <FloatingInput
        label={"Expiry Days"}
         type="number"
          value={expiryDays}
          onChange={(e) => setExpiryDays(e.target.value)}
          min={"1"}/>
        
      </div>

      <div className="kit-master-form-group">
        <FloatingInput
        label={"Description"}
        type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"/>
        
      </div>

      <div className="kit-master-form-group kit-master-status-group">
        <label>Status:</label>
        <label>
          <input
            type="radio"
            name="status"
            value="In Stock"
            checked={status === "In Stock"}
            onChange={() => setStatus("In Stock")}
          />
          In Stock
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="Out of Stock"
            checked={status === "Out of Stock"}
            onChange={() => setStatus("Out of Stock")}
          />
          Out of Stock
        </label>
      </div>

      <div className="kit-master-item-details">
        <h3>Item Details</h3>
        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th>Item Name</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>

                <td>
                  <div className="input-with-icon">
                    <FloatingInput
                    label={"Select Item"}
                    type="search"
                      value={item.name}
                      onChange={(e) => handleInputChange(index, "name", e.target.value)}
                      onIconClick={() => setShowModal(true)}
                    />
                    
                   
                  </div>
                </td>

                <td>
                  <FloatingInput
                  label={"Quantity"}
                  type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleInputChange(index, "quantity", e.target.value)
                    }
                    min={"0"}/>
                 
                </td>
                <td>
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="4">
                <button onClick={addItem}>Add New Row</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay-for-items">
          <div className="modal-content-for-items">
            <h2>Select Item</h2>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Item"
            />
            <table>
              <thead>
                <tr>
                  <th>Item Id</th>
                  <th>Item Name</th>
                  <th>Description</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.itemId}>
                    <td>{item.itemId}</td>
                    <td>{item.itemName}</td>
                    <td>{item.description}</td>
                    <td>
                      <button onClick={() => handleItemClick(item)}>Select</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setShowModal(false)} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitMaster;


