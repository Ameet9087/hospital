/* Ravindra_Sanap_AllEmployeelist.jsx_03_10_2024_Start */

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AllEmployee.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import AddEmployeePopup from './AddEmployeePopup';
import UpdateEmployeePopup from './UpdateEmployeePopup';
import * as XLSX from 'xlsx';  // Import the XLSX library for exporting to Excel
import useCustomAlert from '../../../alerts/useCustomAlert';
import { API_BASE_URL } from '../../api/api';
import { FloatingInput } from '../../../FloatingInputs';

function AllEmployee() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]); // State for filtered employees
    const [currentPage, setCurrentPage] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [columnWidths, setColumnWidths] = useState([80, 150, 150, 200, 150, 150, 150, 100]); // Set initial widths for columns

    const tableRef = useRef(null); // Create ref for table

    const employeesPerPage = 10;

    const { success, warning, error, CustomAlerts } = useCustomAlert();

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        handleSearch(); // Update filtered employees whenever searchTerm or employees change
    }, [searchTerm, employees]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/employees/get-all-employee`);
            setEmployees(response.data);
            setFilteredEmployees(response.data); // Initialize filtered employees
        } catch (error) {
            console.error('Error fetching employee data:', error);
            warning('Failed to Fetch Employee');
        }
    };

    const handleAddEmpClick = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setShowUpdatePopup(false);
    };

    const handleFormSubmit = async (formData) => {
        try {
            await axios.post(`${API_BASE_URL}/employee/add`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.success('Employee Added Successfully');

            handlePopupClose();
            fetchEmployees();
        } catch (error) {
            console.error('Error adding employee:', error);
            toast.error('Failed to Add Employee');
        }
    };

    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setShowUpdatePopup(true);
    };

    const handleUpdateSubmit = async (formData) => {

        
        try {
            await axios.put(`${API_BASE_URL}/employees/${selectedEmployee.employeeId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            handlePopupClose();
            fetchEmployees();
            success('Employee Updated Successfully');
        } catch (error) {
            console.error('Error updating employee:', error);
            warning('Failed to Update Employee');
        }
    };

    const handleSearch = () => {
        const lowerCaseTerm = searchTerm.toLowerCase();
        const filtered = employees.filter((employee) =>
            Object.values(employee)
                .join(' ')
                .toLowerCase()
                .includes(lowerCaseTerm)
        );
        setFilteredEmployees(filtered);
        setCurrentPage(1); // Reset to the first page when searching
    };

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to export table data to Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(employees);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Employees');
        XLSX.writeFile(wb, 'employees_data.xlsx');
    };

    // Function to print the table
    const printTable = () => {
        const printContent = document.querySelector('.employeelist-table').outerHTML;
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write('<html><head><title>Print Employee List</title></head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className='employeelist-container'>
            <div className="employeelist-header">
                <h2>Employee List</h2>
                <CustomAlerts />
            </div>

            <div className="employeelist-search-N-results">
                <div className="employeelist-searchAndActions">
                    <FloatingInput
                    label={"Search"}
                    type="text"
                    placeholder="Search..."
                   
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                    
                </div>
                <div className="employeelist-results-info">
                    Showing {currentEmployees.length} / {filteredEmployees.length} results
                    <button
                        className="employeelist-ex-pri-buttons"
                        onClick={exportToExcel}
                    >
                        <i className="fa-regular fa-file-excel"></i> Export
                    </button>
                    <button className="employeelist-ex-pri-buttons" onClick={printTable}>
                        <i className="fa-solid fa-print"></i> Print
                    </button>
                </div>
            </div>

            {showPopup && (
                <AddEmployeePopup
                    onClose={handlePopupClose}
                    onSubmit={handleFormSubmit}
                />
            )}

            {showUpdatePopup && (
                <UpdateEmployeePopup
                    employee={selectedEmployee}
                    onClose={handlePopupClose}
                    onSubmit={handleUpdateSubmit}
                />
            )}

            <div className="table-container">
                <table className='employeelist-table' ref={tableRef}>
                    <thead>
                        <tr>
                            {[
                                "EMP. ID",
                                "EMP Name",
                                "Mobile No",
                                "Email",
                                "Position",
                                "Department",
                                "Date of Joining",
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
                                            onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                                        ></div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentEmployees.length === 0 ? (
                            <tr>
                                <td className='nodatatoshow' colSpan="7" style={{ textAlign: 'center', color: 'red' }}>No Rows to Show</td>
                            </tr>
                        ) : (
                            currentEmployees.map((employee) => (
                                <tr key={employee.employeeId}>
                                    <td>{employee.employeeId}</td>
                                    <td>{employee.firstName} {employee.lastName} </td>
                                    <td>{employee.contactNumber}</td>
                                    <td>{employee.emailId}</td>
                                    <td>{employee.employeeRoleDTO.role}</td>
                                    <td>{employee.departmentDTO?.departmentName}</td>
                                    <td>{employee.dateOfJoining}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            
        </div>
    );
}

export default AllEmployee;

/* Ravindra_Sanap_AllEmployeelist.jsx_03_10_2024_End */
