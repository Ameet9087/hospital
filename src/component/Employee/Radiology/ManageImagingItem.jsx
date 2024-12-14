import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./ManageImagingType.css";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import { API_BASE_URL } from "../../api/api";
import CustomModal from "../../../CustomModel/CustomModal";
import { useFilter } from "../../ShortCuts/useFilter";

const ManageImagingItem = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isValidForReporting, setIsValidForReporting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [imagingTypes, setImagingTypes] = useState([]);
  const [imagingTypeList, setImagingTypeList] = useState([]);
  const [selectedImagingType, setSelectedImagingType] = useState("");
  const [procedureCode, setProcedureCode] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [columnWidths, setColumnWidths] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef = useRef(null);
  useEffect(() => {
    fetchImagingItems();
    fetchImagingTypes();
  }, []);

  const fetchImagingItems = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/imaging-items/getAll`
      );
      const data = await response.json();
      setImagingTypes(data);
    } catch (error) {
      console.error("Error fetching imaging items:", error);
    }
  };

  const fetchImagingTypes = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/imaging-type/imaging-types`
      );
      const data = await response.json();
      setImagingTypeList(data);
    } catch (error) {
      console.error("Error fetching imaging types:", error);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setRole(item.imagingItemName);
      setIsActive(item.isActive === "true");
      setIsValidForReporting(item.isValidForReporting === "true");
      setSelectedImagingType(item.imagingType.imagingTypeId); // Set selected imaging type
      setProcedureCode(item.procedureCode || "");
      setItemPrice(item.itemPrice || 0);
      setDiscount(item.discount || 0);
      setTotalPrice(item.totalPrice || 0);
      setIsEditMode(true);
    } else {
      setCurrentItem(null);
      setRole("");
      setIsActive(false);
      setIsValidForReporting(false);
      setSelectedImagingType("");
      setProcedureCode("");
      setItemPrice(0);
      setDiscount(0);
      setTotalPrice(0);
      setIsEditMode(false);
    }
    setShowEditModal(true);
  };

  const handleCloseModal = () => setShowEditModal(false);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredItems = useFilter(imagingTypes, searchTerm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const date = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newItem = {
      imagingItemName: role,
      isActive: isActive ? "true" : "false",
      isValidForReporting: isValidForReporting ? "true" : "false",
      imagingType: {
        imagingTypeId: selectedImagingType,
      },
      createdDate: date,
      createdTime: time,
      procedureCode,
      itemPrice,
      discount,
      totalPrice: itemPrice - itemPrice * (discount / 100), // Calculate total price
    };

    try {
      if (isEditMode) {
        await fetch(
          `${API_BASE_URL}/imaging-items/imaging-items/${currentItem.imagingItemId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem),
          }
        );
        console.log("Updated item:", newItem);
      } else {
        console.log(newItem);

        await fetch(`${API_BASE_URL}/imaging-items/create-imaging-items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
        console.log("New item added");
      }
      fetchImagingItems();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setShowEditModal(false);
  };

  return (
    <div className="manage-imaging-item-container">
      <div>
        <button
          className="manage-imaging-item-btn"
          onClick={() => handleOpenModal()}
        >
          + Add Item
        </button>
      </div>
      <input
        type="text"
        className="manage-imaging-item-search-bar"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="manage-item">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Type",
                "Item Name",
                "Procedure Code",
                "Price",
                "Discount",
                "Total Price",
                "Is Active",
                "Action",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={index}>
                <td>{item.imagingType?.imagingTypeName || ""}</td>
                <td>{item.imagingItemName}</td>
                <td>{item.procedureCode}</td>
                <td>{item.itemPrice}</td>
                <td>{item.discount}</td>
                <td>{item.totalPrice}</td>
                <td>{item.isActive}</td>
                <td>
                  <button
                    className="manage-imaging-item-edit-button"
                    onClick={() => handleOpenModal(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={showEditModal} onClose={handleCloseModal}>
        <div className="manage-modal-dialog-item">
          <div className="manage-modal-modal-header">
            <div className="manage-modal-modal-title">
              {isEditMode ? "Update Imaging Item" : "Add New Imaging Item"}
            </div>
          </div>
          <div className="manage-modal-modal-body-item">
            <form onSubmit={handleSubmit}>
              {/* Section 1: Imaging Type and Item Details */}
              <div className="manage-modal-section">
                <h3 className="manage-modal-section-title">Imaging Details</h3>

                <div className="manage-modal-form-group">
                  <label className="manage-modal-form-label">
                    Imaging Type{" "}
                    <span className="manage-modal-text-danger">*</span>:
                  </label>
                  <select
                    value={selectedImagingType}
                    onChange={(e) => setSelectedImagingType(e.target.value)}
                    required
                    className="manage-modal-form-control"
                  >
                    <option value="">Select Imaging Type</option>
                    {imagingTypeList.map((type) => (
                      <option
                        key={type.imagingTypeId}
                        value={type.imagingTypeId}
                      >
                        {type.imagingTypeName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="manage-modal-form-group">
                  <label className="manage-modal-form-label">
                    Imaging Item Name{" "}
                    <span className="manage-modal-text-danger">*</span>:
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Imaging Item Name"
                    required
                    className="manage-modal-form-control"
                  />
                </div>

                <div className="manage-modal-form-group">
                  <label className="manage-modal-form-label">
                    Procedure Code{" "}
                    <span className="manage-modal-text-danger">*</span>:
                  </label>
                  <input
                    type="text"
                    value={procedureCode}
                    onChange={(e) => setProcedureCode(e.target.value)}
                    placeholder="Procedure Code"
                    required
                    className="manage-modal-form-control"
                  />
                </div>
              </div>

              {/* Section 2: Pricing and Description */}
              <div className="manage-modal-section">
                <h3 className="manage-modal-section-title">
                  Pricing and Additional Details
                </h3>

                <div className="manage-modal-form-group">
                  <label className="manage-modal-form-label">
                    Item Price{" "}
                    <span className="manage-modal-text-danger">*</span>:
                  </label>
                  <input
                    type="number"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(parseFloat(e.target.value))}
                    placeholder="Item Price"
                    required
                    className="manage-modal-form-control"
                  />
                </div>

                <div className="manage-modal-form-group">
                  <label className="manage-modal-form-label">Discount:</label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value))}
                    placeholder="Discount (%)"
                    className="manage-modal-form-control"
                  />
                </div>

                <div className="manage-modal-form-group">
                  <label className="manage-modal-form-label">
                    Total Price:
                  </label>
                  <input
                    type="number"
                    value={itemPrice - itemPrice * (discount / 100)}
                    readOnly
                    className="manage-modal-form-control"
                  />
                </div>

                <div className="manage-modal-form-group">
                  <label className="manage-modal-form-label">
                    Description:
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="manage-modal-form-control"
                  />
                </div>
              </div>

              {/* Active Status */}
              <div className="manage-modal-form-group">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="manage-modal-form-check-input"
                />
                <label>Is Active</label>
              </div>

              <div className="manage-modal-form-group">
                <input
                  type="checkbox"
                  checked={isValidForReporting}
                  onChange={(e) => setIsValidForReporting(e.target.checked)}
                  className="manage-modal-form-check-input"
                />
                <label>Is Valid For Reporting</label>
              </div>

              <button type="submit" className="manage-modal-submit-btn">
                {isEditMode ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default ManageImagingItem;
