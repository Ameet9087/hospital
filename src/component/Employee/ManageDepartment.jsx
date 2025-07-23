import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import UpdateDepartmentForm from "./UpdateDepartmentForm";
import AddDepartment from "./AddDepartment";
import "./ManageDepartment.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import CustomModal from "../../CustomModel/CustomModal";
import { useFilter } from "../ShortCuts/useFilter";
import axios from "axios";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../FloatingInputs";

const ManageDepartment = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [data, setData] = useState([]); // State to hold department data
  const [loading, setLoading] = useState(true); // Loading state
  const [columnWidths, setColumnWidths] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef = useRef(null);
  const [message, setMessage] = useState("");

  // Fetch department data from the API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/departments/getAllDepartments`
        );
        const departments = await response.json();
        setData(departments); // Set the department data
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching department data:", error);
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Filter departments by department name
  const filteredItems = useFilter(data, searchTerm);

  // Handle search input changes
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowUpdateModal = (department) => {
    setSelectedDepartment(department); // Set department if editing, null if adding
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedDepartment(null); // Reset selection on close
  };

  const handleImportDepartment = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/departments/insert`);

      if (response) {
        alert("Predefined department inserted successfully!");
      } else {
        alert("Failed to insert employee roles.");
      }
    } catch (error) {
      console.error("Error inserting employee roles:", error);
      alert("An error occurred while inserting employee roles.");
    }
  };

  return (
    <div className="manage-department-page">
      <div className="manage-department-table-container">
        <div className="manage-department-manage-section">
          <h1
            className="manage-add-department-btn"
            onClick={() => handleShowUpdateModal(null)}
          >
            + Add Department
          </h1>
          <div className="manage-department-results-info">
            Showing {filteredItems.length} / {data.length} results
            <h1
              className="manage-add-department-btn"
              onClick={handleImportDepartment}
            >
              Import
            </h1>
          </div>
        </div>
        <div className="sett-search-bar">
          <FloatingInput
            label={"Search"}
            type="text"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Code",
                  "Name",
                  "Parent Department",
                  "Description",
                  "Is Active",
                  "Is Appointment",
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
              {filteredItems?.map((item, index) => (
                <tr key={index}>
                  <td>{item.departmentCode}</td>
                  <td>{item.departmentName}</td>
                  <td>{item.parentDepartmentName}</td>
                  <td>{item.description}</td>
                  <td>{item.isActive === "Yes" ? "Yes" : "No"}</td>
                  <td>
                    {item.isAppointmentApplicable === "Yes" ? "Yes" : "No"}
                  </td>
                  <td>
                    <Button
                      className="manage-department-edit-btn"
                      onClick={() => handleShowUpdateModal(item)}
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

      {/* Modal for Add or Update Department */}
      <CustomModal isOpen={showUpdateModal} onClose={handleCloseUpdateModal}>
        {selectedDepartment !== null ? (
          <UpdateDepartmentForm
            department={selectedDepartment}
            onClose={handleCloseUpdateModal}
          />
        ) : (
          <AddDepartment onClose={handleCloseUpdateModal} />
        )}
      </CustomModal>
    </div>
  );
};

export default ManageDepartment;
