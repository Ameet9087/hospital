import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './SuperUserRoleManagement.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';


const SuperUserRoleManagement = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ roleName: '', description: '', permissions: '', rolePriority: '' });
  const [showModal, setShowModal] = useState({ show: false, type: '', selectedRole: null });

  // Fetch roles from the API when the component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8051/api/roles');
        setRoles(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  // Handle adding/updating role
  const handleAddOrUpdateRole = async () => {
    if (newRole.roleName && newRole.description && newRole.permissions && newRole.rolePriority) {
      try {
        let response;
        if (showModal.type === 'editRole') {
          const roleId = roles[showModal.selectedRole].roleId; // Get roleId from selected role
          response = await axios.put(`http://localhost:8051/api/roles/${roleId}`, newRole);
          const updatedRoles = roles.map((role, index) => (index === showModal.selectedRole ? response.data : role));
          setRoles(updatedRoles);
        } else {
          console.log("before",newRole)
          response = await axios.post('http://localhost:8051/api/roles', newRole);
          setRoles([...roles, response.data]);
        }
        // Reset form and close modal
        setNewRole({ roleName: '', description: '', permissions: '', rolePriority: '' });
        setShowModal({ show: false, type: '', selectedRole: null });
      } catch (error) {
        console.error('Error saving role:', error);
      }
    } else {
      alert('Please fill all fields before saving the role.');
    }
  };

  // Handle opening the modal for adding/editing role
  const handleOpenModal = (type, selectedRole = null) => {
    if (type === 'editRole') {
      const roleToEdit = roles[selectedRole];
      setNewRole({
        roleName: roleToEdit.roleName,
        description: roleToEdit.description,
        permissions: roleToEdit.permissions,
        rolePriority: roleToEdit.rolePriority,
      });
    } else {
      setNewRole({ roleName: '', description: '', permissions: '', rolePriority: '' });
    }
    setShowModal({ show: true, type, selectedRole });
  };

  return (
    <div className="sup-rolemgnt-management">
      <button className="sup-rolemgnt-btn" onClick={() => handleOpenModal('addRole')}>Add Role</button>
      <table ref={tableRef}>
        <thead>
          <tr>
            {['Role Name', 'Description', 'Permissions', 'Role Priority', 'Actions'].map((header, index) => (
              <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                <div className="header-content">
                  <span>{header}</span>
                  {index < 4 && (
                    <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((role, index) => (
              <tr key={index}>
                <td>{role.roleName}</td>
                <td>{role.description}</td>
                <td>{role.permissions}</td>
                <td>{role.rolePriority}</td>
                <td>
                  <button className="sup-rolemgnt-edit-btn" onClick={() => handleOpenModal('editRole', index)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No roles found</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal.show && (
        <div className="sup-rolemgnt-modal" onClick={() => setShowModal({ show: false, type: '', selectedRole: null })}>
          <div className="sup-rolemgnt-modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>{showModal.type === 'editRole' ? 'Edit Role' : 'Add New Role'}</h4>
            <div className='sup-rolemgnt-form-group'>
              <label>Role Name:</label>
              <input
                type="text"
                value={newRole.roleName}
                onChange={(e) => setNewRole({ ...newRole, roleName: e.target.value })}
              />
            </div>
            <div className='sup-rolemgnt-form-group'>
              <label>Description:</label>
              <input
                type="text"
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
              />
            </div>
            <div className='sup-rolemgnt-form-group'>
              <label>Permissions:</label>
              <input
                type="text"
                value={newRole.permissions}
                onChange={(e) => setNewRole({ ...newRole, permissions: e.target.value })}
              />
            </div>
            <div className='sup-rolemgnt-form-group'>
              <label>Role Priority:</label>
              <input
                type="number"
                value={newRole.rolePriority}
                onChange={(e) => setNewRole({ ...newRole, rolePriority: e.target.value })}
              />
            </div>
            <button className='sup-rolemgnt-modal-btn' onClick={handleAddOrUpdateRole}>
              {showModal.type === 'editRole' ? 'Update Role' : 'Save Role'}
            </button>
            <button className='sup-rolemgnt-modal-btn' onClick={() => setShowModal({ show: false, type: '', selectedRole: null })}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperUserRoleManagement;
