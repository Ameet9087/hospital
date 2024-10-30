/* Ravindra_Sanap_AllEmployeelist.jsx_03_10_2024_Start */

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AllEmployee.css';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import AddEmployeePopup from './AddEmployeePopup';
import UpdateEmployeePopup from './UpdateEmployeePopup';
import * as XLSX from 'xlsx';  // Import the XLSX library for exporting to Excel
import useCustomAlert from '../../../alerts/useCustomAlert';


function AllEmployee() {
    const [employees, setEmployees] = useState([]);
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

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8086/api/employee/getall');
            setEmployees(response.data);
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
            await axios.post('http://localhost:8086/api/employee/add', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            success('Employee Added Successfully');


            handlePopupClose();
            fetchEmployees();
        } catch (error) {
            console.error('Error adding employee:', error);
            warning('Failed to Add Employee');

        }
    };

    // const handleDelete = async (empId) => {
    //     try {
    //         await axios.delete(`http://localhost:8086/api/employee/delete/${empId}`);
    //         fetchEmployees();
    //     } catch (error) {
    //         console.error('Error deleting employee:', error);
    //     }
    // };

    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setShowUpdatePopup(true);
    };

    const handleUpdateSubmit = async (formData) => {
        try {
            await axios.put(`http://localhost:8086/api/employee/update/${selectedEmployee.empId}`, formData, {
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

    const filteredEmployees = employees.filter((employee) =>
        employee.empId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.dateOfJoining.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <button className="addemp-button" onClick={handleAddEmpClick}>
                    Add Employee
                </button>
                <h2>Employee List</h2>
                <CustomAlerts />


            </div>

            <div className="employeelist-search-N-results">
                <div className="employeelist-searchAndActions">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="employeelist-searchInput"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                                <td className='nodatatoshow' colSpan="8" style={{ textAlign: 'center', color: 'red' }}>No Rows to Show</td>
                            </tr>
                        ) : (
                            currentEmployees.map((employee) => (
                                <tr key={employee.empId}>
                                    <td>{employee.empId}</td>
                                    <td>{employee.empName}</td>
                                    <td>{employee.mobile}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.dateOfJoining}</td>
                                    <td>
                                        <button
                                            className="allemp-editanddeletebtn"
                                            onClick={() => handleEditClick(employee)}
                                        >
                                            Edit
                                        </button>
                                        {/* <button
                                            className="allemp-editanddeletebtn"
                                            onClick={() => handleDelete(employee.empId)}
                                        >
                                            Delete
                                        </button> */}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className='HRpagination'>
                <button onClick={prevPage} disabled={currentPage === 1} className={currentPage === 1 ? 'disabled' : ''}>
                    Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}>
                        {index + 1}
                    </button>
                ))}

                <button onClick={nextPage} disabled={currentPage === totalPages} className={currentPage === totalPages ? 'disabled' : ''}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default AllEmployee;


/* Ravindra_Sanap_AllEmployeelist.jsx_03_10_2024_End */
