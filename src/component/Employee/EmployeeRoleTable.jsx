import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import "./EmployeeRoleTable.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import AddEmployeeRoleForm from "./AddEmployeeRole";
import { API_BASE_URL } from "../api/api";
import { useFilter } from "../ShortCuts/useFilter";
import axios from "axios";
import { toast } from "react-toastify";
import { FloatingInput } from "../../FloatingInputs";
const EmployeeRoleComponent = () => {
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [roleData, setRoleData] = useState({ role: "", description: "" });
  const [columnWidths, setColumnWidths] = useState({});
  const [roles, setRoles] = useState([]); // State to store roles
  const tableRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch employee roles from the API
  const fetchRoles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/employeeRoles/getAll`);
      if (response.ok) {
        const data = await response.json();
        setRoles(data); // Update roles state with fetched data
      } else {
        console.error("Failed to fetch roles:", response.statusText);
      }
    } catch (error) {
      console.error("Error while fetching roles:", error);
    }
  };

  // Fetch roles when the component mounts
  useEffect(() => {
    fetchRoles();
  }, []);

  const handleImportDepartment = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/employeeRoles/insert`);

      if (response) {
        toast.success("Predefined employee roles inserted successfully!");
      } else {
        toast.error("Failed to insert employee roles.");
      }
    } catch (error) {
      console.error("Error inserting employee roles:", error);
      toast.error("An error occurred while inserting employee roles.");
    }
  };

  const handleOpenAddRoleModal = (role = "", description = "") => {
    setRoleData({ role, description });
    setShowAddRoleModal(true);
  };

  const handleCloseAddRoleModal = () => setShowAddRoleModal(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredItems = useFilter(roles, searchTerm);

  return (
    <div className="employee-role-role-page">
      <div className="employee-role-role-table-container">
        <div className="employee-role-role-manage-section">
          <Button
            variant="primary"
            className="add-employee-role-role-btn"
            onClick={() => handleOpenAddRoleModal()}
          >
            +Add Role
          </Button>
          <div>
            <h1
              className="manage-add-department-btn"
              onClick={handleImportDepartment}
            >
              Import
            </h1>
          </div>
        </div>
        <div className="emp-search-input">
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
                {["Role", "Description", "Action"].map((header, index) => (
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
              {filteredItems.map((role, index) => (
                <tr key={index}>
                  <td>{role.role}</td>
                  <td>{role.description}</td>
                  <td>
                    <Button
                      className="emp-role-btn"
                      variant="secondary"
                      onClick={() => handleOpenAddRoleModal(role)}
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

      {/* AddEmployeeRoleForm Modal */}
      <AddEmployeeRoleForm
        show={showAddRoleModal}
        handleClose={handleCloseAddRoleModal}
        roleData={roleData} // Passing the role data to the modal
      />
    </div>
  );
};

export default EmployeeRoleComponent;
