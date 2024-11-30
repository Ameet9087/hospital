import React, { useState } from "react";
import Modal from "react-modal";
import "./Items.css";
import AddItem from "../components/AddItem";
import UpdateItem from "../components/UpdateItem";

const ItemList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const dummyItemData = {
    itemCategory: "Capital Goods",
    itemSubCategory: "Some Subcategory",
    itemName: "Towel",
    itemCode: "0001001",
    unitOfMeasurement: "Piece",
    description: "",
    minStockQuantity: 100,
    standardRate: 0,
    isVatApplicable: false,
    isActive: true,
    inventory: "Common",
  };

  return (
    <div className="ItemList-item-list-container">
      <div className="ItemList-header">
        <button className="ItemList-add-button" onClick={openAddModal}>
          Add Item
        </button>
        <div className="ItemList-search-bar">
          <input type="text" placeholder="Search" />
          <button className="ItemList-search-button">🔍</button>
        </div>
        <div className="ItemList-results-info">
          <button className="ItemList-export-button">Export</button>
          <button className="ItemList-Emergencyprint-button">Print</button>
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
          <tr>
            <td>{dummyItemData.itemCategory}</td>
            <td>{dummyItemData.itemSubCategory}</td>
            <td>{dummyItemData.itemName}</td>
            <td>{dummyItemData.itemCode}</td>
            <td>{dummyItemData.unitOfMeasurement}</td>
            <td>{dummyItemData.description}</td>
            <td>{dummyItemData.minStockQuantity}</td>
            <td>{dummyItemData.standardRate}</td>
            <td>{dummyItemData.isVatApplicable ? "true" : "false"}</td>
            <td>{dummyItemData.isActive ? "true" : "false"}</td>
            <td>{dummyItemData.inventory}</td>
            <td>
              <button
                className="ItemList-Emergencyedit-button"
                onClick={() => openEditModal(dummyItemData)}
              >
                Edit
              </button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>

      {/* Add Item Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        contentLabel="Add Item Modal"
        className="ItemList-Modal"
        overlayClassName="ItemList-Overlay"
      >
        <AddItem isOpen={isAddModalOpen} onClose={closeAddModal} />
        <button className="ItemList-close-modal-button" onClick={closeAddModal}>
          Close
        </button>
      </Modal>

      {/* Edit Item Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Item Modal"
        className="ItemList-Modal"
        overlayClassName="ItemList-Overlay"
      >
        <UpdateItem item={selectedItem} onClose={closeEditModal} />
        <button
          className="ItemList-close-modal-button"
          onClick={closeEditModal}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ItemList;
