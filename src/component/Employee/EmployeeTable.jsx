import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import "./EmployeeTable.css";
import UpdateEmployeeForm from "./UpdateEmployeeForm"; // Ensure this path is correct
import AddEmployeeForm from "./AddEmployeeForm";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import CustomModal from "../../CustomModel/CustomModal";
import { useFilter } from "../ShortCuts/useFilter";
import { FloatingInput } from "../../FloatingInputs";

const Employeecomponent = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [employees, setEmployees] = useState([]); // State to hold employee data
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch employee data from the API
  const fetchEmployeeData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/employees/get-all-employee`
      );
      const data = await response.json();
      setEmployees(data); // Set the fetched data into state
      console.log(data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeData(); // Fetch data when component mounts
  }, []);

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
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredItems = useFilter(employees, searchTerm);

  return (
    <div className="employee-page-table">
      <div className="employee-table-container">
        <div className="employee-manage-section">
          <Button
            className="add-employee-role-role-btn"
            onClick={handleOpenAddModal}
          >
            + Add Employee
          </Button>
        </div>
        <div className="employee-search-input">
          <FloatingInput
            label={"Search"}
            type="text"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Name",
                  "Gender",
                  "Department",
                  "Role",
                  "Contact No",
                  "IsActive",
                  "Type",
                  "DOB",
                  "Joined On",
                  "Contact Address",
                  "Email",
                  "Room No",
                  "Extension",
                  "Speed Dial",
                  "Office Hour",
                  "Action",
                ].map((header, index) => (
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
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((employee, index) => (
                <tr key={index}>
                  <td>
                    {employee.firstName}
                    {employee.lastName}
                  </td>
                  <td>{employee.gender}</td>
                  <td>{employee?.departmentDTO?.departmentName}</td>
                  <td>{employee?.employeeRoleDTO?.role}</td>
                  <td>{employee.contactNumber}</td>

                  <td>{employee.isActive ? "true" : "false"}</td>
                  <td>{employee?.employeeTypeDTO?.employeeType}</td>
                  <td>{employee.dateOfBirth}</td>
                  <td>{employee.dateOfJoining}</td>
                  <td>{employee.contactAddress}</td>
                  <td>{employee.emailId}</td>
                  <td>{employee.roomNo}</td>
                  <td>{employee.extension}</td>
                  <td>{employee.speedDial}</td>
                  <td>{employee.officeHour}</td>
                  <td>
                    <Button
                      className="employee-edit-btn"
                      onClick={() => handleEditClick(employee)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedEmployee && (
        <CustomModal isOpen={showUpdateModal} onClose={handleCloseModal}>
          <UpdateEmployeeForm
            employee={selectedEmployee}
            onClose={handleCloseModal}
          />
        </CustomModal>
      )}
      {showAddModal && (
        <CustomModal isOpen={showAddModal} onClose={handleCloseAddModal}>
          <AddEmployeeForm onClose={handleCloseAddModal} />
        </CustomModal>
      )}
    </div>
  );
};

export default Employeecomponent;
