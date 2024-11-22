import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import UpdateDepartmentForm from './UpdateDepartmentForm';
import AddDepartment from './AddDepartment';
import './ManageDepartment.css';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import { API_BASE_URL } from '../api/api';
import CustomModal from "../../CustomModel/CustomModal";

const ManageDepartment = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [data, setData] = useState([]); // State to hold department data
  const [loading, setLoading] = useState(true); // Loading state
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Fetch department data from the API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/departments/getAllDepartments`);
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

  const handleShowUpdateModal = (department) => {
    setSelectedDepartment(department); // Set department if editing, null if adding
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedDepartment(null); // Reset selection on close
  };

  return (
    <div className="manage-department-page">
      <div className="manage-department-table-container">
        <div className="manage-department-manage-section">
          <h1 className="manage-add-department-btn" onClick={() => handleShowUpdateModal(null)}>
            + Add Department
          </h1>
          <div className="manage-department-results-info">Showing {data.length} / {data.length} results</div>
        </div>
        <div className="sett-search-bar">
          <input type="text" placeholder="Search" className="manage-department-search-input" />
        </div>
        
        {/* Show loader if data is loading */}
        {loading ? (
          <p>Loading departments...</p>
        ) : (
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
                    "Action"
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
                          onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                        ></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.departmentCode}</td>
                    <td>{item.departmentName}</td>
                    <td>{item.parentDepartmentName}</td>
                    <td>{item.description}</td>
                    <td>{item.isActive === "Yes" ? "Yes" : "No"}</td>
                    <td>{item.isAppointmentApplicable === "Yes" ? "Yes" : "No"}</td>
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
        )}
      </div>

      {/* Modal for Add or Update Department */}
      <CustomModal 
       isOpen={showUpdateModal}
        onClose={handleCloseUpdateModal}
>
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
