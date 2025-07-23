import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./AddEmployeeRole.css";
import { API_BASE_URL } from "../api/api";
import CustomModal from "../../CustomModel/CustomModal";
import { FloatingInput } from "../../FloatingInputs";

const AddEmployeeRoleForm = ({ show, handleClose, roleData }) => {
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Effect to populate form fields when roleData changes
  useEffect(() => {
    if (roleData && roleData.role) {
      console.log(roleData.employeeRoleId);

      setRole(roleData.role.role);
      setDescription(roleData.role.description);
      setIsActive(
        roleData.role.isActive !== undefined ? roleData.role.isActive : true
      ); // Default to true if isActive is not provided
    } else {
      // Reset form when not editing
      setRole("");
      setDescription("");
      setIsActive(true);
    }
  }, [roleData, show]); // Run effect when roleData or show changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object to send
    const employeeRole = {
      role,
      description,
      isActive,
    };

    try {
      let response;
      if (roleData.role.employeeRoleId) {
        response = await fetch(
          `${API_BASE_URL}/employeeRoles/${roleData.role.employeeRoleId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeRole),
          }
        );
      } else {
        // Create new role
        response = await fetch(`${API_BASE_URL}/employeeRoles/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeRole),
        });
      }

      if (response.ok) {
        const newEmployeeRole = await response.json();
        console.log(
          roleData ? "Employee Role updated:" : "New Employee Role added:",
          newEmployeeRole
        );
        handleClose(); // Close the modal after successful submission
      } else {
        console.error(
          "Failed to add/update Employee Role:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error while adding/updating Employee Role:", error);
    }
  };

  return (
    <CustomModal isOpen={show} onClose={handleClose}>
      <div className="emp-modal-dialog">
        <div className="emp-modal-header">
          <div className="emp-modal-title">
            {roleData && roleData.id
              ? "Edit Employee Role"
              : "Add Employee Role"}
          </div>
        </div>
        <div className="emp-modal-body">
          <form onSubmit={handleSubmit}>
            <div className="emp-form-group">
              <FloatingInput
                label={"Role"}
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Role"
                required
              />
            </div>

            <div className="emp-form-group">
              <FloatingInput
                label={"Description"}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>

            <div className="emp-form-group">
              <label className="emp-form-label">Is Active:</label>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="emp-form-check-input"
              />
            </div>

            <button type="submit" className="add-employee-btn">
              {roleData && roleData.id ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </CustomModal>
  );
};

export default AddEmployeeRoleForm;
