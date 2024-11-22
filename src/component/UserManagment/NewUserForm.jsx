import React, { useEffect, useRef, useState } from "react";
import "./NewUserForm.css";
import CustomAlert from "../../alerts/CustomAlert";
import { API_BASE_URL } from "../api/api";
import useCustomAlert from "../../alerts/useCustomAlert";


const NewUserForm = ({user,onClose}) => {
  console.log(user);
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: {
      rolesId: null,
      name: "",
      modules: [],
    },
  });

  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { success, error, CustomAlerts } = useCustomAlert();
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
      const response = await fetch(`${API_BASE_URL}/admin/role-details/${roleId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch role details");
      }
      const data = await response.json();
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
              canView:true,
            })),
          })),
        },
      }));
    } catch (error) {
      console.error("Error fetching role details:", error);
    }
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

  useEffect(() => {
    fetchRoles();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMain = (index) => {
    setFormData((prevState) => {
      const updatedModules = [...prevState.role.modules];
      updatedModules[index].isMainChecked = !updatedModules[index].isMainChecked;
      return { ...prevState, role: { ...prevState.role, modules: updatedModules } };
    });
  };

  const toggleSubComponent = (moduleIndex, subIndex) => {
    setFormData((prevState) => {
      const updatedModules = [...prevState.role.modules];
      updatedModules[moduleIndex].submodules[subIndex].isChecked =
        !updatedModules[moduleIndex].submodules[subIndex].isChecked;
      return { ...prevState, role: { ...prevState.role, modules: updatedModules } };
    });
  };

  const togglePermission = (moduleIndex, subIndex, permission) => {
    setFormData((prevState) => {
      const updatedModules = [...prevState.role.modules];
      updatedModules[moduleIndex].submodules[subIndex][permission] =
        !updatedModules[moduleIndex].submodules[subIndex][permission];
      return { ...prevState, role: { ...prevState.role, modules: updatedModules } };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      username: formData.username,
      password: formData.password,
      updatedRole: {
        rolesId: formData.role.rolesId,
        name: formData.role.name,
        modules: formData.role.modules.map((module) => ({
          moduleId: module.moduleId,
          name: module.moduleName,
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
    };
  
    try {
      const response = await fetch(`${API_BASE_URL}/admin/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Use payload here
      });
      
      if (response.ok) {
        console.log("Permission assigned to user.......");
        onClose();
        
      } else {
        // Handle server error response
        console.error('Failed to create user:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="NewUserFrom-container">
      <div className="NewUserFrom-header">
        <input
          type="text"
          placeholder="Search Employee"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
        />
      </div>
      <div className="NewUserForm-Details">
        <p className="NewUserForm-Heading">
          Employee Name :<span className="NewUserForm-span"> Swapnil Rokade</span>
        </p>
        <p className="NewUserForm-Heading">
          Employee Number :<span className="NewUserForm-span"> 0012</span>
        </p>
        <p className="NewUserForm-Heading">
          Employee Type :<span className="NewUserForm-span"> Radiologist</span>
        </p>
        <p className="NewUserForm-Heading">
          Department :<span className="NewUserForm-span"> Radiology</span>
        </p>
      </div>
      <div className="NewUserForm-SubContainer">
        <div className="NewUserFrom-header">
          <input
            type="text"
            placeholder="Enter User Name"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
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
                    option.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        </div>

        <div className="NewUserForm-SubContainer-column">
          {formData.role.modules.map((module, index) => (
            <div key={module.id} className="NewUserForm-SubContainer-Main-component">
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
                    <div key={sub.name} className="NewUserForm-subcomponent-item">
                      <label>
                        <input
                          type="checkbox"
                          checked={sub.isChecked}
                          onChange={() => toggleSubComponent(index, subIndex)}
                        />
                        {sub.submoduleName}
                      </label>
                      {sub.isChecked && (
                        <div className="dropdown">
                          <div className="dropdown-menu">
                            <label>
                              <input
                                type="checkbox"
                                checked={sub.canEdit}
                                onChange={() => togglePermission(index, subIndex, "canEdit")}
                              />
                              Edit
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                checked={sub.canAdd}
                                onChange={() => togglePermission(index, subIndex, "canAdd")}
                              />
                              Create
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                checked={sub.canDelete}
                                onChange={() => togglePermission(index, subIndex, "canDelete")}
                              />
                              Delete
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                checked={sub.canView}
                                onChange={() => togglePermission(index, subIndex, "canDelete")}
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
        <input type="submit" value="Save" className="NewUserForm-SubContainer-save" />
      </div>
      <CustomAlert/>
    </form>
  );
};

export default NewUserForm;
