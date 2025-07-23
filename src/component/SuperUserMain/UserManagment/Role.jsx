import React, { useEffect, useState } from "react";
import "./Role.css";
import CreateRole from "./CreateRole";
import CustomModal from "../../../CustomModel/CustomModal";

import AssignFunctionalityTable from "./AssignFunctionalityTable";
import useCustomAlert from "../../../alerts/useCustomAlert";
import { API_BASE_URL } from "../../api/api";

const Role = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [roles, setRoles] = useState([]); // State to store roles
  const [selectedRole, setSelectedRole] = useState(null); // Track role to edit
  const { success, error, CustomAlerts } = useCustomAlert();
  const [showView, setShowView] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/get-all-roles`);
      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [showModal, showUpdate]);

  const handleEditClick = (role) => {
    setSelectedRole(role);
    setShowUpdate(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowView(false);
    setShowUpdate(false);
    setSelectedRole(null); // Reset selected role after closing
  };

  const handleDelete = async (id) => {
    console.log(id);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/remove-role/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        error("Failed to fetch roles");
      }
      success("Role Deleted Successfully");
      fetchRoles();
    } catch (e) {
      error("Error fetching roles:", error);
    }
  };

  const handleView = (id) => {
    setSelectedId(id);
    setShowView(true);
  };

  return (
    <>
      <div className="Role-container">
        <div className="Role-heading">
          <button className="Role-btn" onClick={() => setShowModal(true)}>
            Add New Role
          </button>
        </div>
        <div className="Role-table">
          <table>
            <thead>
              <tr>
                <th>Role Name</th>
                <th>Role Description</th>
                <th>Active Or Not</th>
                <th>Assigned Functionality</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.rolesId}>
                  <td>{role.name}</td>
                  <td>{role.roleDescription}</td>
                  <td>
                    {role.isActive ? (
                      <button className="role-active">Active</button>
                    ) : (
                      <button className="role-Inactive">Inactive</button>
                    )}
                  </td>
                  <td>
                    <button
                      className="role-edit-btn"
                      onClick={() => handleView(role.rolesId)}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className="role-edit-btn"
                      onClick={() => handleEditClick(role)}
                    >
                      Edit
                    </button>
                    <button
                      className="role-delete-btn"
                      onClick={() => handleDelete(role.rolesId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CustomModal isOpen={showModal || showUpdate} onClose={handleCloseModal}>
        <CreateRole
          onClose={handleCloseModal}
          initialRole={selectedRole} // Pass selected role for editing
          isEditMode={showUpdate} // Indicate if it's in edit mode
        />
      </CustomModal>
      <CustomAlerts />
      <CustomModal isOpen={showView} onClose={handleCloseModal}>
        <AssignFunctionalityTable id={selectedId} />
      </CustomModal>
    </>
  );
};

export default Role;
