import React, { useEffect, useRef, useState } from "react";
import "./User.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../CustomModel/CustomModal";
import NewUserForm from "./NewUserForm";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";

const User = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState({});
  const dropdownRef = useRef(null);
  const [filteredUserDetails, setFilteredUserDetails] = useState([]); // State for filtered data

  useEffect(() => {
    fetchRoles();
    fetchUserDetails();
  }, [showModal]);

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/get-all-roles`);
      if (!response.ok) throw new Error("Failed to fetch roles");
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/user-permissions`);
      if (!response.ok) throw new Error("Failed to fetch user details");
      const data = await response.json();
      console.log(data);

      setUserDetails(data);
      setFilteredUserDetails(data); // Set initial filtered data
    } catch (error) {
      console.error("Error fetching user permissions:", error);
    }
  };

  const handleClose = () => {
    setIsEdit(false);
    setShowModal(false);
  };

  const filterData = () => {
    const filteredData = userDetails.filter(
      (user) =>
        searchUsername === "" ||
        user.username.toLowerCase().includes(searchUsername.toLowerCase())
    );
    setFilteredUserDetails(filteredData);
  };

  useEffect(() => {
    filterData();
  }, [searchUsername, searchCode, searchEmail, searchTerm]);

  const handleEdit = (data) => {
    setUser(data);
    setIsEdit(true);
  };

  const handleDelete = async (username) => {
    await axios.delete(`${API_BASE_URL}/admin/delete?userName=${username}`);
    fetchRoles();
  };

  return (
    <div className="User-container">
      <div className="User-heading">
        <input
          className="User-Add-New-In"
          type="text"
          placeholder="Search by username"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
        />
        <div ref={dropdownRef}>
          {isOpen && (
            <ul className="search-dropdown-list-new">
              {roles
                .filter((option) =>
                  option.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((option) => (
                  <li
                    key={option.rolesId}
                    onClick={() => {
                      setSearchTerm(option.name);
                      setIsOpen(false);
                    }}
                    className="search-dropdown-item"
                  >
                    {option.name}
                  </li>
                ))}
              {roles.length === 0 && (
                <li className="search-dropdown-item">No options found</li>
              )}
            </ul>
          )}
        </div>
        <button className="User-Add-New-Btn" onClick={() => setShowModal(true)}>
          Add New
        </button>
      </div>

      <div className="User-table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Sr.No", "User Name", "Role Name", "Action"].map(
                (header, index) => (
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
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredUserDetails.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data?.username || ""}</td>
                <td>{data.role?.roleName || ""}</td>
                <td>
                  <button
                    className="User-edit-btn"
                    onClick={() => handleEdit(data)}
                  >
                    Edit
                  </button>
                  <button
                    className="User-delete-btn"
                    onClick={() => handleDelete(data.username)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={showModal} onClose={handleClose}>
        <NewUserForm onClose={handleClose} />
      </CustomModal>
      <CustomModal isOpen={isEdit} onClose={handleClose}>
        <NewUserForm user={user} onClose={handleClose} />
      </CustomModal>
    </div>
  );
};

export default User;
