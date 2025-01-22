import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSSDKitRequestIndent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../api/api";

const KitRequestIndent = () => {
  const [indentTo, setIndentTo] = useState("");
  const [kitType, setKitType] = useState("Sterile");
  const [priority, setPriority] = useState("Normal");
  const [kitRequiredDate, setKitRequiredDate] = useState("");
  const [kitRequestItems, setKitRequestItems] = useState([
    { kitId: "", kitName: "", quantity: 0, remarks: "" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [kits, setKits] = useState([]);
  const [filteredKits, setFilteredKits] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); // Track selected row index

  // Fetch kits from API
  useEffect(() => {
    const fetchKits = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/kit-masters`);
        setKits(response.data); // Store all kits
        setFilteredKits(response.data); // Set filtered kits initially to all kits
      } catch (error) {
        console.error("Error fetching kits:", error);
      }
    };
    fetchKits();
  }, []);

  // Filter kits based on search query
  useEffect(() => {
    setFilteredKits(
      kits.filter((kit) =>
        kit.kitName && kit.kitName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, kits]);

  const handleSave = async () => {
    if (!indentTo || !kitRequiredDate) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      indentTo,
      kitType,
      priority,
      kitRequiredDate,
      checkcssdDept: 1,
      kitRequestItems: kitRequestItems.map((item, index) => ({
        itemNumber: index + 1,
        kitId: parseInt(item.kitId, 10),
        quantity: parseInt(item.quantity, 10),
        remarks: item.remarks,
      })),
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/kit-request-indent`,
        payload
      );
      alert("Kit request successfully saved!");
    } catch (error) {
      console.error("Error saving kit request:", error.response?.data || error.message);
      alert("Failed to save kit request. Please try again.");
    }
  };

  const handleClear = () => {
    setIndentTo("");
    setKitType("Sterile");
    setPriority("Normal");
    setKitRequiredDate("");
    setKitRequestItems([{ kitId: "", quantity: 0, remarks: "" }]);
  };

  const handleAddItem = () => {
    setKitRequestItems([
      ...kitRequestItems,
      { kitId: "", kitName: "", quantity: 0, remarks: "" },
    ]);
  };

  const handleDeleteItem = (index) => {
    setKitRequestItems(kitRequestItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = kitRequestItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setKitRequestItems(updatedItems);
  };

  const handleItemClick = (kit, index) => {
    const updatedItems = [...kitRequestItems];
    updatedItems[index].kitId = kit.kitId; // Update kitId
    updatedItems[index].kitName = kit.kitName; // Update kitName
    setKitRequestItems(updatedItems);
    setShowModal(false); // Close the modal after selecting a kit
  };

  return (
    <div className="KitRequestIndent-container">
      <header className="KitRequestIndent-header">
        <h3>Kit Request Indent</h3>
      </header>
      <div className="KitRequestIndent-content">
        <div className="KitRequestIndent-form">
          <div className="KitRequestIndent-form-group">
            <label>Indent To:</label>
            <input
              type="text"
              value={indentTo}
              onChange={(e) => setIndentTo(e.target.value)}
            />
          </div>
          <div className="KitRequestIndent-form-group">
            <label>Kit Type:</label>
            <select
              value={kitType}
              onChange={(e) => setKitType(e.target.value)}
            >
              <option value="Sterile">Sterile</option>
              <option value="Non-Sterile">Non-Sterile</option>
            </select>
          </div>
          <div className="KitRequestIndent-form-group">
            <label>Priority:</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="KitRequestIndent-form-group">
            <label>Kit Required Date:</label>
            <input
              type="date"
              value={kitRequiredDate}
              onChange={(e) => setKitRequiredDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <main>
        <table className="KitRequestIndent-items-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Kit Name</th>
              <th>Quantity</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {kitRequestItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      value={item.kitName}
                      placeholder="Select Kit"
                      readOnly
                    />
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="search-icon"
                      onClick={() => {
                        setSelectedRowIndex(index); // Set the selected row index
                        setShowModal(true); // Open the modal to select the kit
                      }}
                    />
                  </div>
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.remarks}
                    onChange={(e) =>
                      handleItemChange(index, "remarks", e.target.value)
                    }
                  />
                </td>
                <td className="kit-details-buttons">
                  <button onClick={handleAddItem}>Add</button>
                  <button onClick={() => handleDeleteItem(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="kit-details-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </main>

      {showModal && (
        <div className="modal-overlay-for-items">
          <div className="modal-content-for-items">
            <h2>Select Kit</h2>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Kit"
            />
            <table>
              <thead>
                <tr>
                  <th>Kit Id</th>
                  <th>Kit Name</th>
                  <th>Description</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {filteredKits.map((kit) => (
                  <tr key={kit.kitId}>
                    <td>{kit.kitId}</td>
                    <td>{kit.kitName}</td>
                    <td>{kit.description}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleItemClick(kit, selectedRowIndex) // Use the selected row index
                        }
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitRequestIndent;
