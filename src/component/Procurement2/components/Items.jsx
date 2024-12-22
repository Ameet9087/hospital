import React, { useState, useEffect } from "react";
import axios from "axios"; // For API call
import "./Items.css";
import AddItem from "../components/AddItem";
import UpdateItem from "../components/UpdateItem";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";

const ItemList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]); // State to store fetched items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items from API on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/items/getAllItem`);
        setItems(response.data); // Set fetched data to state
        console.log(response.data);
        
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to load items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="ItemList-item-list-container">
      <div className="ItemList-header">
        <button className="ItemList-add-button" onClick={openAddModal}>
          Add Item
        </button>
        <div className="ItemList-sub-div">
        <div className="ItemList-search-bar">
          <input type="text" placeholder="Search" />
        </div>
        <div className="ItemList-results-info">
          <button className="ItemList-export-button">Export</button>
          <button className="ItemList-Emergencyprint-button">Print</button>
        </div>
        </div>
      </div>
        <table className="ItemList-item-table">
          <thead>
            <tr>
              <th>Item Type</th>
              <th>Subcategory Name</th>
              <th>Item Name</th>
              <th>Item Code</th>
              <th>Unit</th>
              <th>Description</th>
              <th>Min Stock</th>
              <th>Standard Rate</th>
              <th>Is VAT Applicable</th>
              <th>Is Active</th>
              <th>Inventory Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.subCategory?.category || "N/A"}</td>
                <td>{item.subCategory?.subCategoryName || "N/A"}</td>
                <td>{item.itemName}</td>
                <td>{item.itemCode}</td>
                <td>{item.unitOfMeasurement?.unitOfMeasurementName || "N/A"}</td>
                <td>{item.description || "N/A"}</td>
                <td>{item.minStockQuantity}</td>
                <td>{item.standardRate}</td>
                <td>{item.isVatApplicable ? "true" : "false"}</td>
                <td>{item.isActive ? "true" : "false"}</td>
                <td>{item.inventory}</td>
                <td>
                  <button
                    className="ItemList-Emergencyedit-button"
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      {/* Add Item Modal */}
      <CustomModal isOpen={isAddModalOpen} onClose={closeAddModal}>
        <AddItem isOpen={isAddModalOpen} onClose={closeAddModal} />
      </CustomModal>

      {/* Edit Item Modal */}
      <CustomModal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <UpdateItem item={selectedItem} onClose={closeEditModal} />
      </CustomModal>
    </div>
  );
};

export default ItemList;
