import React, { useState, useEffect } from "react";
import "./CreateRole.css";
import useCustomAlert from "../../../alerts/useCustomAlert";
import { API_BASE_URL } from "../../api/api";
import { usePopup } from "../../../FidgetSpinner/PopupContext";

const CreateRole = ({ onClose, initialRole, isEditMode }) => {
  console.log(initialRole);

  const { showPopup } = usePopup();

  const [name, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { success, error, CustomAlerts } = useCustomAlert();

  useEffect(() => {
    if (isEditMode && initialRole) {
      setRoleName(initialRole.name);
      setRoleDescription(initialRole.roleDescription);
      setIsActive(initialRole.isActive);
    } else {
      setRoleName("");
      setRoleDescription("");
      setIsActive(false);
    }
  }, [initialRole, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roleData = {
      name,
      roleDescription,
      isActive,
    };

    try {
      const url = isEditMode
        ? `${API_BASE_URL}/admin/update-role/${initialRole.rolesId}`
        : `${API_BASE_URL}/admin/create-role`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roleData),
      });

      if (response.ok) {
        success(`Role ${isEditMode ? "updated" : "created"} successfully`);
        setRoleName("");
        showPopup([
          {
            url: "/superuser/usermanagement/assign-functionality",
            text: "Assign Functionality Role",
          },
        ]);
        setRoleDescription("");
        setIsActive(false);
        onClose();
      } else {
        error(`Failed to ${isEditMode ? "update" : "create"} role`);
      }
    } catch (err) {
      console.error("Error:", err);
      error("An error occurred");
    }
  };

  return (
    <div className="Create-role-modal-Container">
      <div className="Create-role-main">
        <form className="Create-role-form" onSubmit={handleSubmit}>
          <label>Role Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setRoleName(e.target.value)}
            required
          />
          <label>Role Description:</label>
          <input
            type="text"
            value={roleDescription}
            onChange={(e) => setRoleDescription(e.target.value)}
            required
          />
          <div className="Create-role-two">
            <label>
              Is Active:
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </label>
          </div>
          <button type="submit" className="create-role-submit">
            {isEditMode ? "Update Role" : "Create Role"}
          </button>
        </form>
      </div>
      <CustomAlerts />
    </div>
  );
};

export default CreateRole;
