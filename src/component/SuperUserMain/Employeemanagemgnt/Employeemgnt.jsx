import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './superuserempmgnt.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';


const EmployeeManagement = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]); // State for roles
  const [departments, setDepartments] = useState([]); // State for departments
  const [newEmployee, setNewEmployee] = useState({
    userId: '',
    userName: '',
    emailID: '',
    password: '',
    phoneNo: '',
    roleId: '',
    departmentId: '',
    isActive: false,
  });

  const [showModal, setShowModal] = useState({ show: false, type: '', selectedEmployee: null });

  // Fetch employees, roles, and departments on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:8051/api/users`);
        const fetchedEmployees = response.data.map(emp => ({
          userId: emp.userId,
          userName: emp.userName,
          email: emp.email,
          password: emp.password, // Masked password
          phone: emp.phone,
          roleName: emp.roleName ? emp.roleName : '',
          department: emp.departmentName ? emp.departmentName : '',
          isActive: emp.isActive === "yes",
        }));
        setEmployees(fetchedEmployees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get(`http://localhost:8051/api/roles`);
        setRoles(response.data); // Assume the response is an array of role objects
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`http://localhost:8051/api/departments`); // Adjust URL as necessary
        setDepartments(response.data); // Assume the response is an array of department objects
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchEmployees();
    fetchRoles();
    fetchDepartments();
  }, []);

  // Add or update employee
  const handleAddOrUpdateEmployee = () => {
    const employeeData = {
      userId: newEmployee.userId,
      userName: newEmployee.userName,
      password: newEmployee.password,
      email: newEmployee.emailID,
      phone: newEmployee.phoneNo,
      isActive: newEmployee.isActive ? 'true' : 'false',
      roleId: newEmployee.roleId,
      departmentId: newEmployee.departmentId,
    };

    const apiCall = newEmployee.userId
      ? axios.put(`http://localhost:8051/api/users/${newEmployee.userId}`, employeeData) // Update employee
      : axios.post('http://localhost:8051/api/users', employeeData); // Add new employee

    apiCall
      .then(response => {
        if (newEmployee.userId) {
          // Update employee in the list
          setEmployees(employees.map(emp => emp.userId === newEmployee.userId ? { ...emp, ...employeeData } : emp));
        } else {
          // Add new employee to the list
          setEmployees([...employees, { ...employeeData, userId: response.data.userId }]);
        }

        setNewEmployee({
          userId: '',
          userName: '',
          emailID: '',
          password: '',
          phoneNo: '',
          roleId: '',
          departmentId: '',
          isActive: false,
        });
        setShowModal({ show: false, type: '', selectedEmployee: null });
      })
      .catch(error => {
        console.error('Error saving employee:', error);
      });
  };

  // Delete employee
  const handleDeleteEmployee = (userId) => {
    axios.delete(`http://localhost:8051/api/users/${userId}`)
      .then(() => {
        setEmployees(employees.filter(emp => emp.userId !== userId));
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };

  // Open modal for add/update actions
  const handleOpenModal = (type, employee) => {
    if (employee) {
      setNewEmployee({
        userId: employee.userId,
        userName: employee.userName,
        emailID: employee.email,
        password: employee.password,
        phoneNo: employee.phone,
        roleId: employee.roleId || '',  // Ensure you set the correct role ID
        departmentId: employee.departmentId || '',  // Ensure you set the correct department ID
        isActive: employee.isActive,
      });
    } else {
      setNewEmployee({
        userId: '',
        userName: '',
        emailID: '',
        password: '',
        phoneNo: '',
        roleId: '',
        departmentId: '',
        isActive: false,
      });
    }
    setShowModal({ show: true, type, selectedEmployee: employee });
  };

  // Toggle active/inactive status
  const handleToggleActiveStatus = (userId) => {
    const updatedEmployees = employees.map(emp =>
      emp.userId === userId ? { ...emp, isActive: !emp.isActive } : emp
    );
    setEmployees(updatedEmployees);
  };

  return (
    <div className="superuserempmgnt-management">
      <button className="superuserempmgnt-btn" onClick={() => handleOpenModal('add')}>Add Employee</button>

      <table ref={tableRef}>
        <thead>
          <tr>
            {["User ID", "User Name", "Email ID", "Password", "Phone No", "Role Name", "Department", "Is Active", "Actions"].map((header, index) => (
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
          {employees
            .filter(employee => employee.roleName !== 'patient') // Filter out employees with role 'patient'
            .map((employee, index) => (
              <tr key={index}>
                <td>{employee.userId}</td>
                <td>{employee.userName}</td>
                <td>{employee.email}</td>
                <td>{employee.password}</td>
                <td>{employee.phone}</td>
                <td>{employee.roleName}</td>
                <td>{employee.department}</td>
                <td>{employee.isActive ? 'Active' : 'Inactive'}</td>
                <td>
                  <button className="superuserempmgnt-action-btn" onClick={() => handleOpenModal('email', employee)}>Update Email</button>
                  <button className="superuserempmgnt-action-btn" onClick={() => handleOpenModal('password', employee)}>Change Password</button>
                  <button className="superuserempmgnt-action-btn" onClick={() => handleOpenModal('role', employee)}>Update Role</button>
                  <button className="superuserempmgnt-action-btn" onClick={() => handleDeleteEmployee(employee.userId)}>Delete</button>
                  <button className="superuserempmgnt-action-btn" onClick={() => handleToggleActiveStatus(employee.userId)}>
                    {employee.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal for adding, changing email, password, role */} 
      {showModal.show && (
        <div className="superuserempmgnt-modal" onClick={() => setShowModal({ show: false, type: '', selectedEmployee: null })}>
          <div className="superuserempmgnt-modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>{showModal.type === 'add' ? 'Add New Employee' : `Change ${showModal.type}`}</h4>

            {showModal.type === 'add' && (
              <>
                <div className='superuserempmgnt-form-group'>
                  <label>User Name:</label>
                  <input
                    type="text"
                    value={newEmployee.userName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, userName: e.target.value })}
                  />
                </div>
                <div className='superuserempmgnt-form-group'>
                  <label>Email ID:</label>
                  <input
                    type="email"
                    value={newEmployee.emailID}
                    onChange={(e) => setNewEmployee({ ...newEmployee, emailID: e.target.value })}
                  />
                </div>
                <div className='superuserempmgnt-form-group'>
                  <label>Password:</label>
                  <input
                    type="password"
                    value={newEmployee.password}
                    onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                  />
                </div>
                <div className='superuserempmgnt-form-group'>
                  <label>Phone No:</label>
                  <input
                    type="tel"
                    value={newEmployee.phoneNo}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phoneNo: e.target.value })}
                  />
                </div>
                <div className='superuserempmgnt-form-group'>
                  <label>Role:</label>
                  <select
                    value={newEmployee.roleId}
                    onChange={(e) => setNewEmployee({ ...newEmployee, roleId: e.target.value })}
                  >
                    <option value="">Select Role</option>
                    {roles.map(role => (
                      <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
                    ))}
                  </select>
                </div>
                <div className='superuserempmgnt-form-group'>
                  <label>Department:</label>
                  <select
                    value={newEmployee.departmentId}
                    onChange={(e) => setNewEmployee({ ...newEmployee, departmentId: e.target.value })}
                  >
                    <option value="">Select Department</option>
                    {departments.map(department => (
                      <option key={department.departmentId} value={department.departmentId}>{department.departmentName}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {showModal.type === 'email' && (
              <div className='superuserempmgnt-form-group'>
                <label>Email ID:</label>
                <input
                  type="email"
                  value={newEmployee.emailID}
                  onChange={(e) => setNewEmployee({ ...newEmployee, emailID: e.target.value })}
                />
              </div>
            )}

            {showModal.type === 'password' && (
              <div className='superuserempmgnt-form-group'>
                <label>New Password:</label>
                <input
                  type="password"
                  value={newEmployee.password}
                  onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                />
              </div>
            )}

            {showModal.type === 'role' && (
              <div className='superuserempmgnt-form-group'>
                <label>Role:</label>
                <select
                  value={newEmployee.roleId}
                  onChange={(e) => setNewEmployee({ ...newEmployee, roleId: e.target.value })}
                >
                  <option value="">Select Role</option>
                  {roles.map(role => (
                    <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
                  ))}
                </select>
              </div>
            )}

            <button className='superuserempmgnt-btn' onClick={handleAddOrUpdateEmployee}>
              {showModal.type === 'add' ? 'Add Employee' : 'Update'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
