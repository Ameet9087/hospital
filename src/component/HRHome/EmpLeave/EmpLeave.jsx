/* Ravindra_Sanap_EmpLeave.jsx_04_10_2024_Start */

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './EmpLeave.css';
import AddLeavePopup from './AddLeavePopup';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import useCustomAlert from '../../../alerts/useCustomAlert';


function EmpLeave() {
    const [leaves, setLeaves] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const leavesPerPage = 10;
    const tableRef = useRef(null);
    const [columnWidths, setColumnWidths] = useState(['auto', 'auto', 'auto', 'auto', 'auto']);

    const { success, warning, error, CustomAlerts } = useCustomAlert();


    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:8086/api/leave/getall');
            setLeaves(response.data);
        } catch (error) {
            console.error('Error fetching leave data:', error);
            warning('Failed to Fetch Employee Leaves');

        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            const response = await fetch('http://localhost:8086/api/leave/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),

            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await response.json();
            success('Employee Leaves Added Successfully');

            handlePopupClose();
            fetchLeaves();
        } catch (error) {
            console.error('Error:', error);
            warning('Failed to Add Employee Leaves');

        }
    };

    const filteredLeaves = leaves.filter((leave) =>
        leave.employee.empId.toString().includes(searchTerm) ||
        leave.employee.empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.startDate.includes(searchTerm) ||
        leave.endDate.includes(searchTerm)
    );

    const indexOfLastLeave = currentPage * leavesPerPage;
    const indexOfFirstLeave = indexOfLastLeave - leavesPerPage;
    const currentLeaves = filteredLeaves.slice(indexOfFirstLeave, indexOfLastLeave);
    const totalPages = Math.ceil(filteredLeaves.length / leavesPerPage);

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

    const handleLeaveClick = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const printTable = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Leave Records</title>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                    </style>
                </head>
                <body>
                    <h2>Employee Leave Records</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>EMP. ID</th>
                                <th>EMP Name</th>
                                <th>Leave Type</th>
                                <th>Leave Start Date</th>
                                <th>Leave End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${currentLeaves.map((leave) => `
                                <tr>
                                    <td>${leave.employee.empId}</td>
                                    <td>${leave.employee.empName}</td>
                                    <td>${leave.leaveType}</td>
                                    <td>${leave.startDate}</td>
                                    <td>${leave.endDate}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    const exportToExcel = () => {
        const csvRows = [];
        const headers = ['EMP. ID', 'EMP Name', 'Leave Type', 'Leave Start Date', 'Leave End Date'];
        csvRows.push(headers.join(','));

        currentLeaves.forEach(leave => {
            const row = [
                leave.employee.empId,
                leave.employee.empName,
                leave.leaveType,
                leave.startDate,
                leave.endDate
            ].join(',');
            csvRows.push(row);
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'employee_leaves.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="leave-container">
            <div className="leave-header">
                <button className="leave-button" onClick={handleLeaveClick}>
                    Add Leave
                </button>
                <h2>Employee Leave Records</h2>
                <CustomAlerts />

            </div>
            <div className="leave-search-N-results">
                <div className="leave-search">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="leave-searchInput"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="leave-results-info">
                    Showing {currentLeaves.length} / {filteredLeaves.length} results
                    <button
                        className="leave-ex-pri-buttons"
                        onClick={exportToExcel}
                    >
                        <i className="fa-regular fa-file-excel"></i> Export
                    </button>
                    <button className="leave-ex-pri-buttons" onClick={printTable}>
                        <i className="fa-solid fa-print"></i> Print
                    </button>
                </div>
            </div>
            <div className="table-container">
                <table className='leave-table' ref={tableRef}>
                    <thead>
                        <tr>
                            {[
                                "EMP. ID",
                                "EMP Name",
                                "Leave Type",
                                "Leave Start Date",
                                "Leave End Date",
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
                        {currentLeaves.length > 0 ? (
                            currentLeaves.map((leave) => (
                                <tr key={leave.id}>
                                    <td>{leave.employee.empId}</td>
                                    <td>{leave.employee.empName}</td>
                                    <td>{leave.leaveType}</td>
                                    <td>{leave.startDate}</td>
                                    <td>{leave.endDate}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>No leave records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="HRpagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={index + 1 === currentPage ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
            {showPopup && (
                <AddLeavePopup onClose={handlePopupClose} onSubmit={handleFormSubmit} />
            )}
        </div>
    );
}

export default EmpLeave;

/* Ravindra_Sanap_EmpLeave.jsx_04_10_2024_End */
