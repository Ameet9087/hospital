import React, { useEffect, useRef, useState } from "react";
import "./NewUserForm.css";
import CustomAlert from "../../../alerts/CustomAlert";
import { API_BASE_URL } from "../../api/api";
import useCustomAlert from "../../../alerts/useCustomAlert";
import axios from "axios";
import UserManagementPopupTable from "./UserManagementPopupTable";

const NewUserForm = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: {
      rolesId: null,
      name: "",
      modules: [],
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [activePopup, setActivePopup] = useState(null);
  const { success, error, CustomAlerts } = useCustomAlert();
  const [dropdownValue, setDropdownValue] = useState("doctor");
  const [selectedUser, setSelectedUser] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  useEffect(() => {
    fetchRoles();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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

  const fetchRoleData = async (roleId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/role-details/${roleId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch role details");
      }
      const data = await response.json();
      console.log(data);

      setFormData((prevState) => ({
        ...prevState,
        role: {
          ...prevState.role,
          ...data,
          modules: data.modules.map((module) => ({
            ...module,
            isMainChecked: true, // Set default to checked
            submodules: module.submodules.map((sub) => ({
              ...sub,
              isChecked: true, // Set default to checked
              canEdit: false, // Default values
              canDelete: false, // Default values
              canAdd: false, // Default values
              canView: true,
            })),
          })),
        },
      }));
    } catch (error) {
      console.error("Error fetching role details:", error);
    }
  };

  const fetchAllEmployee = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/employees/get-all-employee`
    );
    setAllEmployees(response.data);
  };

  const fetchAllDoctors = async () => {
    const response = await axios.get(`${API_BASE_URL}/doctors`);
    setAllDoctors(response.data);
  };

  useEffect(() => {
    fetchAllEmployee();
    fetchAllDoctors();
  }, []);

  const getPopupData = () => {
    if (activePopup === "doctor") {
      return {
        columns: ["doctorId", "salutation", "doctorName", "specialization"],
        data: allDoctors,
      };
    } else if (activePopup === "employee") {
      return {
        columns: ["employeeId", "salutation", "firstName", "lastName"],
        data: allEmployees,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "doctor") {
      setSelectedUser(data);
    } else if (activePopup === "employee") {
      setSelectedUser(data);
    }
    setActivePopup(null); // Close the popup after selection
  };

  const handleDropdownChange = (e) => {
    setSelectedUser(null);
    setDropdownValue(e.target.value);
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option.name);
    setFormData((prevState) => ({
      ...prevState,
      role: { ...prevState.role, rolesId: option.rolesId, name: option.name },
    }));
    setIsOpen(false);
    fetchRoleData(option.rolesId); // Fetch role details based on selected role
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handlePermissionChange = (e) => {
    const selectedPermission = e.target.value;
    setFormData((prevState) => {
      const updatedModules = prevState.role.modules.map((module) => ({
        ...module,
        submodules: module.submodules.map((sub) => {
          const canView =
            selectedPermission.includes("View") ||
            selectedPermission === "FullAccess";
          const canEdit =
            selectedPermission.includes("Edit") ||
            selectedPermission === "FullAccess";
          const canAdd =
            selectedPermission.includes("Create") ||
            selectedPermission === "FullAccess";

          return {
            ...sub,
            canView,
            canEdit,
            canAdd,
            canDelete:
              selectedPermission === "Delete" ||
              selectedPermission === "FullAccess",
          };
        }),
      }));

      return {
        ...prevState,
        role: {
          ...prevState.role,
          modules: updatedModules,
        },
        selectedPermission,
      };
    });
  };

 

  const toggleMain = (index) => {
    setFormData((prevState) => {
      const updatedModules = [...prevState.role.modules];
      updatedModules[index].isMainChecked =
        !updatedModules[index].isMainChecked;
      return {
        ...prevState,
        role: { ...prevState.role, modules: updatedModules },
      };
    });
  };

  const toggleSubComponent = (moduleIndex, subIndex) => {
    setFormData((prevState) => {
      const updatedModules = [...prevState.role.modules];
      updatedModules[moduleIndex].submodules[subIndex].isChecked =
        !updatedModules[moduleIndex].submodules[subIndex].isChecked;
      return {
        ...prevState,
        role: { ...prevState.role, modules: updatedModules },
      };
    });
  };

  const togglePermission = (moduleIndex, subIndex, permission) => {
    setFormData((prevState) => {
      const updatedModules = [...prevState.role.modules];
      updatedModules[moduleIndex].submodules[subIndex][permission] =
        !updatedModules[moduleIndex].submodules[subIndex][permission];
      return {
        ...prevState,
        role: { ...prevState.role, modules: updatedModules },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if `selectedUser` has a doctorId, then update formData accordingly
    const updatedFormData = { ...formData }; // Make a copy to avoid direct mutation

    if (selectedUser?.doctorId) {
      updatedFormData.doctorId = selectedUser.doctorId;
    } else {
      updatedFormData.employeeId = selectedUser?.employeeId;
    }

    const payload = {
      username: updatedFormData.username,
      password: updatedFormData.password,
      doctorId: updatedFormData.doctorId, // Add doctorId to the payload if available
      employeeId: updatedFormData.employeeId, // Add employeeId to the payload if available
      updatedRole: [
        {
          rolesId: updatedFormData.role.rolesId,
          name: updatedFormData.role.name,
          isActive: true,
          modules: updatedFormData.role.modules.map((module) => ({
            moduleId: module.moduleId,
            name: module.moduleName,
            logo: module.logo,
            submodules: module.submodules.map((sub) => ({
              subModuleId: sub.submoduleId,
              name: sub.submoduleName,
              canEdit: sub.canEdit,
              canDelete: sub.canDelete,
              canAdd: sub.canAdd,
              canView: sub.canView,
            })),
          })),
        },
      ],
    };

    console.log(payload);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/create-user`,
        payload
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Permission assigned to user.......");
        onClose();
      } else {
        console.error("Failed to create user:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="NewUserFrom-container">
        <div className="NewUserFrom-header">
          <div className="NewUserForm-Search">
            <select
              className="newUser-dropdown"
              value={dropdownValue}
              onChange={handleDropdownChange}
            >
              <option value="doctor">Doctor</option>
              <option value="employee">Employee</option>
            </select>
            <input
              type="text"
              value={
                selectedUser
                  ? `${selectedUser.salutation || ""} ${
                      selectedUser.doctorName || selectedUser.firstName || ""
                    } ${selectedUser.lastName || ""}`.trim()
                  : ""
              }
              readOnly
              placeholder="Search Employee"
            />
          </div>
          <i
            onClick={() => setActivePopup(dropdownValue)}
            className="fa-solid fa-magnifying-glass"
          ></i>
        </div>
        <div className="NewUserForm-Details">
          <p className="NewUserForm-Heading">
            Employee Name :
            <span className="NewUserForm-span">
              {selectedUser
                ? selectedUser?.doctorName || selectedUser?.employeeName
                : ""}
            </span>
          </p>
          <p className="NewUserForm-Heading">
            Employee Number :
            <span className="NewUserForm-span">
              {selectedUser
                ? selectedUser?.doctorId || selectedUser?.employeeId
                : ""}
            </span>
          </p>
          <p className="NewUserForm-Heading">
            Employee Type :
            <span className="NewUserForm-span">
              {selectedUser
                ? selectedUser.employeeType ||
                  selectedUser.employeeTypeDTO?.employeeType
                : ""}
            </span>
          </p>
          <p className="NewUserForm-Heading">
            Department :
            <span className="NewUserForm-span">
              {selectedUser
                ? selectedUser.specialisationId?.specialisationName ||
                  selectedUser.departmentDTO?.departmentName
                : ""}
            </span>
          </p>
        </div>

        <div className="NewUserForm-SubContainer">
          <div className="NewUserFrom-header-inputs">
            <input
              type="text"
              placeholder="Enter User Name"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <i
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                aria-hidden="true"
                id="showHidePassword"
                style={{
                  position: "absolute",
                  fontSize: "20px",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <div ref={dropdownRef}>
              <input
                type="text"
                className="search-search-input"
                placeholder="Select option..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setIsOpen(true)}
              />

              {isOpen && (
                <ul className="search-dropdown-list-new">
                  {roles
                    .filter((option) =>
                      option.name
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((option) => (
                      <li
                        key={option.rolesId}
                        onClick={() => handleOptionClick(option)}
                        className="search-dropdown-item"
                      >
                        {option.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div className="">
              <label>Permission:</label>
              <select
                value={formData.selectedPermission}
                onChange={handlePermissionChange}
              >
                <option value="View">View only</option>
                <option value="Edit">Edit only</option>
                <option value="Create">Create only</option>
                <option value="Delete">Delete only</option>
                <option value="CreateView">Create + View</option>
                <option value="EditView">Edit + View</option>
                <option value="CreateEditView">Create + Edit + View</option>
                <option value="FullAccess">Full Access</option>
              </select>
            </div>
          </div>

          <div className="NewUserForm-SubContainer-column">
            {formData.role.modules.map((module, index) => (
              <div
                key={module.id}
                className="NewUserForm-SubContainer-Main-component"
              >
                <label>
                  <input
                    type="checkbox"
                    checked={module.isMainChecked}
                    onChange={() => toggleMain(index)}
                  />
                  {module.moduleName}
                </label>
                {module.isMainChecked && (
                  <div className="NewUserForm-subcomponent-list three-column">
                    {module.submodules.map((sub, subIndex) => (
                      <div
                        key={sub.submoduleName}
                        className="NewUserForm-subcomponent-item"
                      >
                        <label>
                          <input
                            type="checkbox"
                            checked={sub.isChecked}
                            onChange={() => toggleSubComponent(index, subIndex)}
                          />
                          {sub.submoduleName}
                        </label>
                        {sub.isChecked && (
                          <div className="NewUserForm-dropdown">
                            <div className="NewUserForm-dropdown-menu">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={sub.canEdit}
                                  onChange={() =>
                                    togglePermission(
                                      index,
                                      moduleIndex,
                                      subIndex,
                                      "canEdit"
                                    )
                                  }
                                />
                                Edit
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={sub.canAdd}
                                  onChange={() =>
                                    togglePermission(
                                      index,
                                      moduleIndex,
                                      subIndex,
                                      "canAdd"
                                    )
                                  }
                                />
                                Create
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={sub.canDelete}
                                  onChange={() =>
                                    togglePermission(
                                      index,
                                      moduleIndex,
                                      subIndex,
                                      "canDelete"
                                    )
                                  }
                                />
                                Delete
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={sub.canView}
                                  onChange={() =>
                                    togglePermission(
                                      index,
                                      moduleIndex,
                                      subIndex,
                                      "canView"
                                    )
                                  }
                                />
                                View
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="NewUserForm-SubContainer-button">
          <input type="reset" className="NewUserForm-SubContainer-reset" />
          <input
            type="submit"
            value="Save"
            className="NewUserForm-SubContainer-save"
          />
        </div>
        <CustomAlert />
      </form>
      {activePopup && (
        <UserManagementPopupTable
          columns={columns}
          data={data}
          onClose={() => setActivePopup(null)}
          onSelect={handleSelect}
        />
      )}
    </>
  );
};

export default NewUserForm;
