/* Ravindra_Sanap_EmpSchedule.jsx_04_10_2024_Start */

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './EmpSchedule.css';
import UpdateEmployeepopup from '../AllEmployee/UpdateEmployeePopup';
import * as XLSX from 'xlsx';
import useCustomAlert from '../../../alerts/useCustomAlert';


function EmpSchedule() {
    const [employees, setEmployees] = useState([]); // Renamed schedules to employees
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [columnWidths, setColumnWidths] = useState(["10%", "20%", "15%", "15%", "15%", "15%", "15%", "10%"]); // Adjust widths as needed
    const employeesPerPage = 10;
    const tableRef = useRef(null);

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
            warning('Failed to Fetch Employee Schedule');

        }
    };

    const filteredEmployees = employees.filter((employee) =>
        (employee.empId && employee.empId.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        (employee.empName && employee.empName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (employee.mobile && employee.mobile.toString().includes(searchTerm)) ||
        (employee.email && employee.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (employee.position && employee.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (employee.department && employee.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (employee.dateOfJoining && employee.dateOfJoining.toLowerCase().includes(searchTerm.toLowerCase()))
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

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(currentEmployees.map(employee => ({
            "EMP. ID": employee.empId,
            "EMP Name": employee.empName,
            "Mobile No": employee.mobile,
            "Email": employee.email,
            "Position": employee.position,
            "Department": employee.department,
            "Date of Joining": employee.dateOfJoining,
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Employee Schedule");
        XLSX.writeFile(wb, 'EmployeeSchedule.xlsx');
    };

    const handlePopupClose = () => {
        setShowUpdatePopup(false);
    };

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
            success('Employee Schedule Updated Successfully');

        } catch (error) {
            console.error('Error updating employee:', error);
            warning('Failed to Update Employee Schedule');

        }
    };

    const printTable = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Employee Schedule</title>
                    <link rel="stylesheet" href="path/to/your/styles.css" />
                </head>
                <body>
                    <h2>Employee Schedule</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>EMP. ID</th>
                                <th>EMP Name</th>
                                <th>Mobile No</th>
                                <th>Email</th>
                                <th>Position</th>
                                <th>Department</th>
                                <th>Date of Joining</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${currentEmployees.length === 0 
                                ? `<tr><td colspan="7" style="text-align: center; color: red;">No Rows to Show</td></tr>`
                                : currentEmployees.map(employee => `
                                    <tr>
                                        <td>${employee.empId}</td>
                                        <td>${employee.empName}</td>
                                        <td>${employee.mobile}</td>
                                        <td>${employee.email}</td>
                                        <td>${employee.position}</td>
                                        <td>${employee.department}</td>
                                        <td>${employee.dateOfJoining}</td>
                                    </tr>`).join('')
                            }
                        </tbody>
                    </table>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="schedule-container">
            <h2>Employee Schedule</h2>
            <CustomAlerts />

            <div className="schedule-search-N-results">
                <div className="schedule-searchAndActions">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="schedule-searchInput"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="schedule-results-info">
                    Showing {currentEmployees.length} / {filteredEmployees.length} results
                    <button
                        className="schedule-ex-pri-buttons"
                        onClick={exportToExcel}
                    >
                        <i className="fa-regular fa-file-excel"></i> Export
                    </button>
                    <button
                        className="schedule-ex-pri-buttons"
                        onClick={printTable}
                    >
                        <i className="fa-solid fa-print"></i> Print
                    </button>
                </div>
            </div>

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
                                            onMouseDown={(e) => startResizing(e, tableRef, setColumnWidths)(index)}
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
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="HRpagination">
                <button onClick={prevPage} className={currentPage === 1 ? 'disabled' : ''} disabled={currentPage === 1}>
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={nextPage} className={currentPage === totalPages ? 'disabled' : ''} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

            {showUpdatePopup && (
                <UpdateEmployeepopup
                    onClose={handlePopupClose}
                    onSubmit={handleUpdateSubmit}
                    employee={selectedEmployee}
                />
            )}
        </div>
    );
}

export default EmpSchedule;

/* Ravindra_Sanap_EmpSchedule.jsx_04_10_2024_End */
