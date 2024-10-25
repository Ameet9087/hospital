import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './SuperUserPatientManagement.css'; 
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';


const SuperUserPatientManagement = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ userId: '', userName: '', email: '', password: '', phone: '', isActive: '', roleId: 2 }); // Set roleId to the patient role ID
  const [showModal, setShowModal] = useState({ show: false, type: '', selectedUser: null });

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8051/api/users/role/patient');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle adding a new user
  const handleAddUser = async () => {
    try {
      const userWithRole = { ...newUser, roleId: 503 }; // Set role ID to 503
      const response = await axios.post('http://localhost:8051/api/users', userWithRole);
      setUsers([...users, response.data]);
      setNewUser({ userId: '', userName: '', email: '', password: '', phone: '', isActive: '' });
      setShowModal({ show: false, type: '', selectedUser: null });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Function to handle updating an existing user
  const handleUpdateUser = async () => {
    try {
      const updatedUser = { ...showModal.selectedUser, ...newUser };
      const response = await axios.put(`http://localhost:8051/api/users/${updatedUser.userId}`, updatedUser);
      setUsers(users.map(user => (user.userId === updatedUser.userId ? response.data : user)));
      setShowModal({ show: false, type: '', selectedUser: null });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8051/api/users/${userId}`);
      setUsers(users.filter(user => user.userId !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleOpenModal = (type, user) => {
    setShowModal({ show: true, type, selectedUser: user });
    if (user) {
      setNewUser({ userId: user.userId, userName: user.userName, email: user.email, password: user.password, phone: user.phone, isActive: user.isActive, roleId: user.roleId }); // Include roleId
    } else {
      setNewUser({ userId: '', userName: '', email: '', password: '', phone: '', isActive: '', roleId: 2 }); // Reset roleId to patient ID
    }
  };

  return (
    <div className="superuser-patientmgnt-management">
      <button className="superuser-patientmgnt-btn" onClick={() => handleOpenModal('add', null)}>Add User</button>

      <table ref={tableRef}>
        <thead>
          <tr>
            {[
              "User ID",
              "User Name",
              "Email",
              "Password",
              "Phone",
              "Active Status",
              "Actions"
            ].map((header, index) => (
              <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                <div className="header-content">
                  <span>{header}</span>
                  <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.userId}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.phone}</td>
              <td>{user.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button className="superuser-patientmgnt-action-btn" onClick={() => handleOpenModal('password', user)}>Change Password</button>
                <button className="superuser-patientmgnt-action-btn" onClick={() => handleOpenModal('email', user)}>Change Email</button>
                <button className="superuser-patientmgnt-action-btn" onClick={() => handleDeleteUser(user.userId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for changing password, email, and adding a user */}
      {showModal.show && (
        <div className="superuser-patientmgnt-modal" onClick={() => setShowModal({ show: false, type: '', selectedUser: null })}>
          <div className="superuser-patientmgnt-modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>{showModal.type === 'add' ? 'Add New User' : `Change ${showModal.type === 'password' ? 'Password' : 'Email'}`}</h4>

            {/* Form for adding new user */}
                   {/* Form for adding new user */}
                   {showModal.type === 'add' && (
              <>
                <div className='superuser-patientmgnt-form-group'>
                  <label>User Name:</label>
                  <input
                    type="text"
                    value={newUser.userName}
                    onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
                  />
                </div>
                <div className='superuser-patientmgnt-form-group'>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div className='superuser-patientmgnt-form-group'>
                  <label>Password:</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                </div>
                <div className='superuser-patientmgnt-form-group'>
                  <label>Phone:</label>
                  <input
                    type="text"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  />
                </div>
                <button className='superuser-patientmgnt-modal-btn' onClick={handleAddUser}>Save</button>
              </>
            )}


            {/* Form for changing password */}
            {showModal.type === 'password' && (
              <>
                <div>
                  <label>New Password:</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                </div>
                <button onClick={handleUpdateUser}>Update Password</button>
              </>
            )}

            {/* Form for changing email */}
            {showModal.type === 'email' && (
              <>
                <div>
                  <label>New Email:</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <button onClick={handleUpdateUser}>Update Email</button>
              </>
            )}

            <button className='superuser-patientmgnt-modal-btn' onClick={() => setShowModal({ show: false, type: '', selectedUser: null })}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperUserPatientManagement;
