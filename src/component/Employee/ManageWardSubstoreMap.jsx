import React, { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import "./ManageWardSubstoreMap.css"; // Custom styles for this component
import { startResizing } from "../../TableHeadingResizing/ResizableColumns"; // Assuming this is defined
import CustomModal from "../../CustomModel/CustomModal";
import AddWardSubstoreMap from "./AddWardSubstoreMap";

const ManageWardSubstoreMap = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedWard, setSelectedWard] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const data = [
    { wardName: "Male Ward", store: "Operations Store, male ward SubStore" },
    { wardName: "Female Ward", store: "ICU Sub store, Female Ward Substore" },
    { wardName: "Private Ward", store: "Private Sub Store" },
    { wardName: "ICU", store: "ICU Sub store" },
    { wardName: "Maternity Ward", store: "Maternity Substore" },
  ];

  const handleEditClick = (ward) => {
    setSelectedWard(ward);
    setShowEditModal(true);
  };

  const handleAddClick = () => {
    setSelectedWard(null); // No ward is selected when adding a new ward
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedWard(null);
  };

  return (
    <div className="manage-ward-substore-page">
      <div className="manage-ward-substore-table-container">
        <div className="manage-ward-substore-manage-section">
          <h1 className="ward-manage-add-substore-btn" onClick={handleAddClick}>
            + Add Ward Substore Map
          </h1>
        </div>

        <input
          type="text"
          placeholder="Search"
          className="ward-manage-substore-search-input"
        />
        <div className="ward-manage-substore-results-info">
          Showing 5 / 5 results
        </div>

        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {["Ward Name", "Store", "Action"].map((header, index) => (
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
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.wardName}</td>
                  <td>{item.store}</td>
                  <td>
                    <Button
                      className="manage-ward-store-edit-btn"
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
      <CustomModal isOpen={showEditModal} onClose={handleCloseModal}>
        {/* <WardSubstoreMap
          selectedWard={selectedWard}
          onClose={handleCloseModal}
        /> */}
        <AddWardSubstoreMap />
      </CustomModal>
    </div>
  );
};

const WardSubstoreMap = ({ selectedWard, onClose }) => {
  const [substores, setSubstores] = useState([
    { id: 1, name: "Male Ward SubStore", isDefault: true, isActive: true },
    { id: 2, name: "Operations Store", isDefault: false, isActive: true },
  ]);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const handleChange = (index, key) => {
    const updatedSubstores = [...substores];
    updatedSubstores[index][key] = !updatedSubstores[index][key];
    setSubstores(updatedSubstores);
  };

  return (
    <div className="manage-ward-modal-container">
      <div className="manage-ward-modal-header">
        <h2>
          {selectedWard ? "Edit Ward Substore Map" : "Add Ward Substore Map"}
        </h2>
        <h3>{selectedWard ? selectedWard.wardName : "New Ward"}</h3>
        <button className="manage-ward-close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="manage-ward-modal-body">
        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {["S.No", "Substore Name", "Is Default", "Is Active"].map(
                  (header, index) => (
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
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {substores.map((store, index) => (
                <tr key={store.id}>
                  <td>{index + 1}</td>
                  <td>{store.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={store.isDefault}
                      onChange={() => handleChange(index, "isDefault")}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={store.isActive}
                      onChange={() => handleChange(index, "isActive")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="manage-ward-modal-footer">
        <button className="manage-ward-update-button" onClick={onClose}>
          {selectedWard ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default ManageWardSubstoreMap;
