import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import "./ManageSubstore.css";

import { API_BASE_URL } from "../api/api";
import AddSubStore from "./AddSubstore";
import CustomModal from "../../CustomModel/CustomModal";
import { useFilter } from "../ShortCuts/useFilter";
import { FloatingInput } from "../../FloatingInputs";

const ManageSubstore = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSubstore, setSelectedSubstore] = useState(null);
  const [substores, setSubstores] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch substores on component mount
  useEffect(() => {
    const fetchSubstores = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/substores/get-all-substores`
        );
        console.log(response.data);
        setSubstores(response.data);
      } catch (error) {
        console.error("Error fetching substores:", error);
      }
    };
    fetchSubstores();
  }, [showModal]);

  // Filter substores by subStoreName
  const filteredItems = useFilter(substores, searchTerm);

  // Handle search input changes
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle "Add Substore" button click
  const handleAddClick = () => {
    setSelectedSubstore(null); // Reset selected substore for "Add" mode
    setShowModal(true);
  };

  // Handle "Edit" button click
  const handleEditClick = (substore) => {
    setSelectedSubstore(substore); // Set selected substore for "Edit" mode
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSubstore(null);
  };

  // Handle "Deactivate/Activate" button click
  const handleDeactiveClick = async (substore) => {
    const newIsActive = !substore.isActive;

    try {
      const response = await axios.put(
        `${API_BASE_URL}/substores/${substore.subStoreId}/active?isActive=${newIsActive}`
      );
      console.log("Substore status updated successfully:", response.data);
      setSubstores((prevSubstores) =>
        prevSubstores.map((s) =>
          s.subStoreId === substore.subStoreId
            ? { ...s, isActive: newIsActive }
            : s
        )
      );
    } catch (error) {
      console.error("Error updating substore status:", error);
    }
  };

  return (
    <div className="manage-substore-page">
      <div className="manage-substore-table-container">
        <div className="manage-substore-manage-section">
          <h1 className="manage-add-substore-btn" onClick={handleAddClick}>
            + Add Substore
          </h1>
          <div className="manage-substore-results-info">
            Showing {filteredItems.length} results
          </div>
        </div>
        <div className="manage-substore-search-input">
          <FloatingInput
            label={"search"}
            type="text"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Name",
                "Code",
                "Email",
                "Contact No",
                "Location",
                "Description",
                "Label",
                "isActive",
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
            {filteredItems?.map((substore, index) => (
              <tr key={index}>
                <td>{substore.subStoreName}</td>
                <td>{substore.code}</td>
                <td>{substore.email}</td>
                <td>{substore.contactNo}</td>
                <td>{substore.locationMasterDTO?.locationName}</td>
                <td>{substore.subStoreDescription}</td>
                <td>{substore.label}</td>
                <td>{substore.isActive ? "Active" : "Inactive"}</td>
                <td>
                  {substore.isActive ? (
                    <div className="manage-store-btn-conatainer">
                      <Button
                        className="manage-store-edit-btn"
                        onClick={() => handleEditClick(substore)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="manage-store-edit-btn"
                        onClick={() => handleDeactiveClick(substore)}
                      >
                        Deactivate
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="manage-store-edit-btn"
                      onClick={() => handleEditClick(substore)}
                    >
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CustomModal isOpen={showModal} onClose={handleCloseModal}>
        <AddSubStore substore={selectedSubstore} onClose={handleCloseModal} />
      </CustomModal>
    </div>
  );
};

export default ManageSubstore;
