import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import "./EmployeeRoleTable.css";
import { startResizing } from "../TableHeadingResizing/resizableColumns";
import AddEmployeeRoleForm from "./AddEmployeeRole";
import { API_BASE_URL } from "../api/api";
import { useFilter } from "../ShortCuts/useFilter";
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
        </div>
        <input
          type="text"
          placeholder="Search"
          className="emp-search-input"
          value={searchTerm}
          onChange={handleSearch}
        />

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
