import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./ManageImagingType.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import CustomModal from "../../../CustomModel/CustomModal";
import { useFilter } from "../../ShortCuts/useFilter";
import { toast } from "react-toastify";
import { FloatingInput } from "../../../FloatingInputs";

const ManageImagingType = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImagingType, setSelectedImagingType] = useState(null);
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [createdDate, setCreatedDate] = useState(""); // New state for created date
  const [createdTime, setCreatedTime] = useState(""); // New state for created time
  const [isEditMode, setIsEditMode] = useState(false);
  const [imagingTypes, setImagingTypes] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef = useRef(null);
  useEffect(() => {
    const fetchImagingTypes = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/imaging-type/imaging-types`
        );
        setImagingTypes(response.data);
      } catch (error) {
        console.error("Error fetching imaging types:", error);
      }
    };
    fetchImagingTypes();
  }, []);

  const filteredItems = useFilter(imagingTypes, searchTerm);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEditClick = (type) => {
    setSelectedImagingType(type);
    setRole(type.imagingTypeName); // Ensure the correct field name is used
    setIsActive(type.isActive === "true"); // Convert string 'true'/'false' to boolean
    setCreatedDate(type.createdDate); // Autofill created date
    setCreatedTime(type.createdTime); // Autofill created time
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setSelectedImagingType(null);
    setRole("");
    setIsActive(false);
    setCreatedDate(""); // Clear date for new entries
    setCreatedTime(""); // Clear time for new entries
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImagingType(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imagingTypeData = {
      imagingTypeName: role,
      isActive: isActive ? "true" : "false",
      createdDate,
      createdTime,
    };

    try {
      if (isEditMode && selectedImagingType) {
        await axios.put(
          `${API_BASE_URL}/imaging-type/create-imaging-items/${selectedImagingType.imagingTypeId}`,
          imagingTypeData
        );
        toast.success("Updated:", imagingTypeData);
      } else {
        await axios.post(
          `${API_BASE_URL}/imaging-type/imaging-types`,
          imagingTypeData
        );
        toast.success("Added:", imagingTypeData);
      }
      // Refresh imaging types after update/add
      const response = await axios.get(
        `${API_BASE_URL}/imaging-type/imaging-types`
      );
      setImagingTypes(response.data);
      handleCloseModal();
    } catch (error) {
      toast.error("Error submitting imaging type:", error);
    }
  };

  return (
    <div className="manage-imaging-type-container">
      <div>
        <button className="manage-imaging-type-btn" onClick={handleAddClick}>
          + Add Imaging Type
        </button>
      </div>
      <div className="manage-imaging-type-search-bar">
        <FloatingInput
          label={"Search"}
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Type Name", "IsActive", "Action"].map((header, index) => (
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
            {filteredItems.map((type, index) => (
              <tr key={index}>
                <td>{type.imagingTypeName}</td>
                <td>{type.isActive}</td>
                {/* <td>{type.createdDate}</td>
                <td>{type.createdTime}</td> */}
                <td>
                  <button
                    className="manage-imaging-type-edit-button"
                    onClick={() => handleEditClick(type)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={showModal} onClose={handleCloseModal}>
        <div className="manage-modal-dialog">
          <div className="manage-modal-modal-header">
            <div className="manage-modal-modal-title">
              {isEditMode ? "Update Imaging Type" : "Add Imaging Type"}
            </div>
          </div>
          <div className="manage-modal-modal-body">
            <form onSubmit={handleSubmit}>
              <div className="manage-modal-form-group">
                <FloatingInput
                  label={"Imaging Item Name"}
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>

              <div className="manage-modal-form-group">
                <label className="manage-modal-form-label">Is Active:</label>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="manage-modal-form-check-input"
                />
              </div>

              <div className="manage-modal-form-group">
                <FloatingInput
                  label={"Created Date"}
                  type="date"
                  value={createdDate}
                  onChange={(e) => setCreatedDate(e.target.value)}
                />
              </div>

              <div className="manage-modal-form-group">
                <FloatingInput
                  label={"Created Time"}
                  type="time"
                  value={createdTime}
                  onChange={(e) => setCreatedTime(e.target.value)}
                />
              </div>

              <button type="submit" className="manage-modal-employee-btn">
                {isEditMode ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default ManageImagingType;
