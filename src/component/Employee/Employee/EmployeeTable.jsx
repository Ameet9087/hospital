import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './EmployeeTable.css';
import UpdateEmployeeForm from './UpdateEmployeeForm'; // Ensure this path is correct
import AddEmployeeForm from './AddEmployeeForm';

const Employeecomponent = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateModal(true); // Show the modal when editing an employee
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedEmployee(null); // Optionally clear selected employee data
  };
  const handleOpenAddModal = () => setShowAddModal(true);

  const handleCloseAddModal = () => setShowAddModal(false);

  // Example employee data
  const employees = [
    { name: 'Mr. Account Trial', gender: 'Male', department: 'Account', role: '', contactNo: '', isActive: true, type: 'Full Time', dob: '1983-12-04', joinedOn: '2023-12-04', contactAddress: 'Juja', email: 'THIONG@gmail.com', roomNo: '', extension: '', speedDial: '', officeHour: '' },
    { name: 'Jane Doe', gender: 'Female', department: 'Marketing', role: 'Manager', contactNo: '555-1234', isActive: true, type: 'Part Time', dob: '1990-05-15', joinedOn: '2022-06-01', contactAddress: 'New York', email: 'jane.doe@example.com', roomNo: '101', extension: '202', speedDial: '3001', officeHour: '9-5' },
    { name: 'John Smith', gender: 'Male', department: 'IT', role: 'Developer', contactNo: '555-5678', isActive: true, type: 'Full Time', dob: '1985-11-23', joinedOn: '2021-04-15', contactAddress: 'San Francisco', email: 'john.smith@example.com', roomNo: '202', extension: '303', speedDial: '3002', officeHour: '10-6' },
    { name: 'Emily Johnson', gender: 'Female', department: 'HR', role: 'Recruiter', contactNo: '555-8765', isActive: false, type: 'Full Time', dob: '1992-07-19', joinedOn: '2019-08-20', contactAddress: 'Chicago', email: 'emily.johnson@example.com', roomNo: '303', extension: '404', speedDial: '3003', officeHour: '8-4' },
    { name: 'Michael Brown', gender: 'Male', department: 'Finance', role: 'Analyst', contactNo: '555-3456', isActive: true, type: 'Full Time', dob: '1988-03-10', joinedOn: '2020-09-05', contactAddress: 'Boston', email: 'michael.brown@example.com', roomNo: '404', extension: '505', speedDial: '3004', officeHour: '9-5' },
  ];

  return (
    <div className="employee-page-table">
      <div className="employee-table-container">
        <div className="employee-manage-section">
        <Button  className="add-employee-role-role-btn" onClick={handleOpenAddModal}>+ Add Employee</Button>
        <input type="text" placeholder="Search" className="employee-search-input" />
        </div>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Role</th>
              <th>Contact No</th>
              <th>Action</th>
              <th>IsActive</th>
              <th>Type</th>
              <th>DOB</th>
              <th>Joined On</th>
              <th>Contact Address</th>
              <th>Email</th>
              <th>Room No</th>
              <th>Extension</th>
              <th>Speed Dial</th>
              <th>Office Hour</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.gender}</td>
                <td>{employee.department}</td>
                <td>{employee.role}</td>
                <td>{employee.contactNo}</td>
                <td>
                  <Button
                   
                    className="employee-edit-btn"
                    onClick={() => handleEditClick(employee)}
                  >
                    Edit
                  </Button>
                </td>
                <td>{employee.isActive ? 'true' : 'false'}</td>
                <td>{employee.type}</td>
                <td>{employee.dob}</td>
                <td>{employee.joinedOn}</td>
                <td>{employee.contactAddress}</td>
                <td>{employee.email}</td>
                <td>{employee.roomNo}</td>
                <td>{employee.extension}</td>
                <td>{employee.speedDial}</td>
                <td>{employee.officeHour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEmployee && (
        <Modal
          show={showUpdateModal}
          onHide={handleCloseModal}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UpdateEmployeeForm
              employee={selectedEmployee}
              onClose={handleCloseModal}
            />
          </Modal.Body>
        </Modal>
      )}
 {showAddModal && (
        <Modal
          show={showAddModal}
          onHide={handleCloseAddModal}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddEmployeeForm onClose={handleCloseAddModal} />
          </Modal.Body>
        </Modal>
      )}

      <div className="employee-pagination">
        <Button>First</Button>
        <Button>Previous</Button>
        <span>Page 1 of 4</span>
        <Button>Next</Button>
        <Button>Last</Button>
      </div>
    </div>
  );
};

export default Employeecomponent;
