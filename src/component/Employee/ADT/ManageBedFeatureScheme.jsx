import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios"; // For making API requests
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import "./ManageWard.css";
import { API_BASE_URL } from "../../api/api";
import CustomModal from "../../../CustomModel/CustomModal";
import { useFilter } from "../../ShortCuts/useFilter";

// Replace with your actual base URL

const ManageBedFeatureScheme = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // Track whether adding or editing
  const [selectedBedFeature, setSelectedBedFeature] = useState(null);
  const [bedFeatureCode, setBedFeatureCode] = useState(""); // Updated field
  const [featureName, setFeatureName] = useState(""); // Updated field
  const [featureFullName, setFeatureFullName] = useState(""); // Updated field
  const [isActive, setIsActive] = useState(false); // Updated field
  const [bedFeatures, setBedFeatures] = useState([]); // State to hold fetched bed features
  const [columnWidths, setColumnWidths] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef = useRef(null);

  // Fetch bed features when the component mounts
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/ward-bedFeature/getAllWardBed`)
      .then((response) => {
        setBedFeatures(response.data); // Assuming response.data is an array of bed features
      })
      .catch((error) => {
        console.error("Error fetching bed features", error);
      });
  }, []);

  // Handle opening the modal for editing a bed feature
  const handleEditClick = (feature) => {
    setSelectedBedFeature(feature);
    setBedFeatureCode(feature.bedFeatureCode); // Set bed feature code
    setFeatureName(feature.featureName); // Set feature name
    setFeatureFullName(feature.featureFullName); // Set feature full name
    setIsActive(feature.isActive === "true"); // Set isActive, assuming it's a string like "true" or "false"
    setModalType("edit"); // Set mode to edit
    setShowModal(true);
  };

  // Handle opening the modal for adding a new bed feature
  const handleAddClick = () => {
    setSelectedBedFeature(null);
    setBedFeatureCode(""); // Reset bed feature code
    setFeatureName(""); // Reset feature name
    setFeatureFullName(""); // Reset feature full name
    setIsActive(false); // Reset isActive
    setModalType("add"); // Set mode to add
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBedFeature(null);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const newFeature = {
      bedFeatureCode,
      featureName,
      featureFullName,
      isActive: isActive.toString(), // Convert boolean to string
    };

    if (modalType === "edit") {
      console.log(newFeature);

      axios
        .put(
          `${API_BASE_URL}/ward-bedFeature/update/${selectedBedFeature.wardBedFeatureId}`,
          newFeature
        )
        .then((response) => {
          console.log("Updated:", response.data);
          // Update the state with the edited feature
          const updatedFeatures = bedFeatures.map((feature) =>
            feature.id === selectedBedFeature.wardBedFeatureId
              ? response.data
              : feature
          );
          setBedFeatures(updatedFeatures); // Update state
        })
        .catch((error) => console.error("Error updating bed feature", error));
    } else {
      console.log(newFeature);

      axios
        .post(`${API_BASE_URL}/ward-bedFeature/add-ward-bed-data`, newFeature)
        .then((response) => {
          console.log("Added:", response.data);
          setBedFeatures([...bedFeatures, response.data]); // Add the new feature to the state
        })
        .catch((error) => console.error("Error adding bed feature", error));
    }
    handleCloseModal();
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredItems = useFilter(bedFeatures, searchTerm);

  return (
    <div className="manage-add-ward-page">
      <div className="manage-add-ward-table-container">
        <div className="manage-add-ward-manage-section">
          <Button onClick={handleAddClick} className="manage-add-ward-btn">
            + Add Bed Feature
          </Button>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="manage-add-ward-search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="manage-add-ward-results-info">
          Showing {bedFeatures.length}/{bedFeatures.length} results
        </div>

        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Code",
                  "Feature Name",
                  "Full Name",
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
                  <td>{item.bedFeatureCode}</td>
                  <td>{item.featureName}</td>
                  <td>{item.featureFullName}</td>
                  <td>{item.isActive}</td>
                  <td>
                    <Button
                      className="manage-add-ward-edit-btn"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for both Add and Edit */}
      <CustomModal isOpen={showModal} onClose={handleCloseModal}>
        <div className="manage-modal-dialog-bed-feature">
          <div className="manage-modal-modal-header">
            <div className="manage-modal-modal-title">
              {modalType === "edit" ? "Update Bed Feature" : "Add Bed Feature"}
            </div>
          </div>
          <div className="manage-modal-modal-body">
            <form onSubmit={handleSubmit}>
              <div className="manage-modal-form-group">
                <label className="manage-modal-form-label">
                  Bed Feature Code{" "}
                  <span className="manage-modal-text-danger">*</span>:
                </label>
                <input
                  type="text"
                  value={bedFeatureCode}
                  onChange={(e) => setBedFeatureCode(e.target.value)}
                  placeholder="Bed Feature Code"
                  required
                  className="manage-modal-form-control"
                />
              </div>

              <div className="manage-modal-form-group">
                <label className="manage-modal-form-label">Feature Name:</label>
                <input
                  type="text"
                  value={featureName}
                  onChange={(e) => setFeatureName(e.target.value)}
                  placeholder="Feature Name"
                  className="manage-modal-form-control"
                />
              </div>

              <div className="manage-modal-form-group">
                <label className="manage-modal-form-label">Full Name:</label>
                <input
                  type="text"
                  value={featureFullName}
                  onChange={(e) => setFeatureFullName(e.target.value)}
                  placeholder="Full Name"
                  className="manage-modal-form-control"
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

              <button type="submit" className="manage-modal-employee-btn">
                {modalType === "edit" ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default ManageBedFeatureScheme;
