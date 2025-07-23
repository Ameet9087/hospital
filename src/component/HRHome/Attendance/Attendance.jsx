import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import the xlsx library
import './Attendance.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import useCustomAlert from '../../../alerts/useCustomAlert';
import { API_BASE_URL } from '../../api/api';
import { FloatingInput } from '../../../FloatingInputs';
function Attendance() {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 10;
    const [attendanceStatus, setAttendanceStatus] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [columnWidths, setColumnWidths] = useState([80, 150, 100, 150, 150, 150, 150, 200]);
    const { success, warning, error, CustomAlerts } = useCustomAlert();

    const tableRef = useRef();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/employees/get-all-employee`);
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
                warning('Failed to Fetch Employee');
            }
        };

        fetchEmployees();

        const storedAttendance = JSON.parse(localStorage.getItem('attendanceStatus')) || {};
        setAttendanceStatus(storedAttendance);
    }, []);

    useEffect(() => {
        const storedAttendance = JSON.parse(localStorage.getItem('attendanceStatus')) || {};
        const now = new Date().getTime();

        Object.keys(storedAttendance).forEach(empId => {
            const markedTime = storedAttendance[empId]?.markedTime;
            if (markedTime) {
                const hoursPassed = (now - markedTime) / (1000 * 60 * 60);
                if (hoursPassed >= 15) {
                    delete storedAttendance[empId];
                }
            }
        });

        localStorage.setItem('attendanceStatus', JSON.stringify(storedAttendance));
        setAttendanceStatus(storedAttendance);
    }, []);

    // Filter employees based on search term
    const filteredEmployees = employees.filter(employee => {
        const searchLower = searchTerm.toLowerCase();
        return (
            employee.employeeId.toString().toLowerCase().includes(searchLower) ||
            (employee.firstName && employee.firstName.toLowerCase().includes(searchLower)) ||
            (employee.lastName && employee.lastName.toLowerCase().includes(searchLower)) ||
            (employee.contactNumber && employee.contactNumber.toLowerCase().includes(searchLower)) ||
            (employee.emailId && employee.emailId.toLowerCase().includes(searchLower)) ||
            (employee.employeeRoleDTO?.role && employee.employeeRoleDTO.role.toLowerCase().includes(searchLower)) ||
            (employee.departmentDTO?.departmentName && employee.departmentDTO.departmentName.toLowerCase().includes(searchLower)) ||
            (employee.dateOfJoining && employee.dateOfJoining.toLowerCase().includes(searchLower))
        );
    });

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

    async function markAttendance(employeeId, isPresent) {
        try {
            await axios.post(`${API_BASE_URL}/attendance/add/${employeeId}`, {
                isPresent: isPresent
            });

            const updatedAttendanceStatus = {
                ...attendanceStatus,
                [employeeId]: { markedTime: new Date().getTime() }
            };
            setAttendanceStatus(updatedAttendanceStatus);

            localStorage.setItem('attendanceStatus', JSON.stringify(updatedAttendanceStatus));
        } catch (error) {
            console.error('Error marking attendance:', error);
        }
    }

    const printTable = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print Table</title>');
        printWindow.document.write('<link rel="stylesheet" href="path_to_your_css/Attendance.css">'); // Include your CSS file
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h2>Employee Attendance</h2>');
        printWindow.document.write('<table class="attendance-table" style="width: 100%; border-collapse: collapse;">');
        printWindow.document.write('<thead><tr><th>EMP. ID</th><th>EMP Name</th><th>Mobile No</th><th>Email</th><th>Position</th><th>Department</th><th>Date of Joining</th><th>Action</th></tr></thead><tbody>');

        currentEmployees.forEach(employee => {
            printWindow.document.write(`<tr>
                <td>${employee.employeeId}</td>
                <td>${employee.firstName}</td>
                <td>${employee.contactNumber}</td>
                <td>${employee.emailId}</td>
                <td>${employee.employeeRoleDTO.role}</td>
                <td>${employee.departmentDTO.departmentName}</td>
                <td>${employee.dateOfJoining}</td>
                <td>
                    <button>Present</button>
                    <button>Absent</button>
                </td>
            </tr>`);
        });

        printWindow.document.write('</tbody></table>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(employees);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
        XLSX.writeFile(workbook, "Attendance_Data.xlsx");
    };

    return (
        <div className="attendance-container">
            <h2>Employee Attendance</h2>
            <div className="attendance-search-N-results">
                <div className="attendance-searchAndActions">
                    <FloatingInput
                    label={"Search"}
                    type="text"
                    placeholder="Search..."
                   
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                   
                </div>
                <div className="attendance-results-info">
                    Showing {currentEmployees.length} / {filteredEmployees.length} results
                    <button
                        className="attendance-ex-pri-buttons"
                        onClick={exportToExcel}
                    >
                        <i className="fa-regular fa-file-excel"></i> Export
                    </button>
                    <button className="attendance-ex-pri-buttons" onClick={printTable}>
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
                                            onMouseDown={(e) => startResizing(e, index, setColumnWidths)}
                                        />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentEmployees.length === 0 ? (
                            <tr>
                                <td className='nodatatoshow' colSpan="8" style={{ textAlign: 'center', color: 'red', padding: '10px' }}>No Rows to Show</td>
                            </tr>
                        ) : (
                            currentEmployees.map((employee) => (
                                <tr key={employee.employeeId}>
                                    <td>{employee.employeeId}</td>
                                    <td>{employee.firstName} {employee.lastName} </td>
                                    <td>{employee.contactNumber}</td>
                                    <td>{employee.emailId}</td>
                                    <td>{employee.employeeRoleDTO.role}</td>
                                    <td>{employee.departmentDTO.departmentName}</td>
                                    <td>{employee.dateOfJoining}</td>
                                    <td>
                                        <button
                                            className="attendance-btn"
                                            onClick={() => markAttendance(employee.employeeId, true)}
                                            disabled={attendanceStatus[employee.employeeId]}
                                        >
                                            Present
                                        </button>
                                        <button
                                            className="attendance-btn"
                                            onClick={() => markAttendance(employee.employeeId, false)}
                                            disabled={attendanceStatus[employee.employeeId]}
                                        >
                                            Absent
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            
        </div>
    );
}

export default Attendance;
