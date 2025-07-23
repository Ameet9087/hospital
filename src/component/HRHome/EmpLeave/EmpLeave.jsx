/* Ravindra_Sanap_EmpLeave.jsx_04_10_2024_Start */

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './EmpLeave.css';
import AddLeavePopup from './AddLeavePopup';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import useCustomAlert from '../../../alerts/useCustomAlert';
import { API_BASE_URL } from '../../api/api';
import { FloatingInput } from '../../../FloatingInputs';
import { toast } from 'react-toastify';
function EmpLeave() {
    const [leaves, setLeaves] = useState([]); // Initialize as an empty array
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [columnWidths, setColumnWidths] = useState(['auto', 'auto', 'auto', 'auto', 'auto']);
    const leavesPerPage = 10;

    const tableRef = useRef(null);
    const { success, warning, error, CustomAlerts } = useCustomAlert();

    // Fetch leaves on component mount
    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/leave/getall`);
            const leaveData = Array.isArray(response.data) ? response.data : []; // Ensure it's an array
            setLeaves(leaveData);
            console.log(leaves);

        } catch (err) {
            console.error('Error fetching leave data:', err);
            warning('Failed to Fetch Employee Leaves');
        }
    };

    // Handle adding a new leave
    const handleFormSubmit = async (formData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/leave/add`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200 || response.status === 201) { 
                toast.success('Employee Leave Added Successfully');
                handlePopupClose(); // Close the popup only on success
                fetchLeaves(); // Refresh the leave list
            } else {
                toast.error("Failed to add leave");
            }
        } catch (err) {
            console.error('Error:', err);
            toast.error("Something went wrong while adding leave");
        }
    };
    
    // Filter leaves based on search term
    const filteredLeaves = leaves.filter((leave) => {
        const employeeId = leave.employeeDTO?.employeeId?.toString() || '';
        const firstName = leave.employeeDTO?.firstName?.toLowerCase() || '';
        const lastName = leave.employeeDTO?.lastName?.toLowerCase() || '';
        const leaveType = leave.leaveType?.toLowerCase() || '';
        const startDate = leave.startDate || '';
        const endDate = leave.endDate || '';
        const term = searchTerm.toLowerCase();

        return (
            employeeId.includes(term) ||
            firstName.includes(term) ||
            lastName.includes(term) ||
            leaveType.includes(term) ||
            startDate.includes(term) ||
            endDate.includes(term)
        );
    });

    // Pagination logic
    const indexOfLastLeave = currentPage * leavesPerPage;
    const indexOfFirstLeave = indexOfLastLeave - leavesPerPage;
    const currentLeaves = filteredLeaves.slice(indexOfFirstLeave, indexOfLastLeave);
    const totalPages = Math.ceil(filteredLeaves.length / leavesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Open/close leave popup
    const handleLeaveClick = () => setShowPopup(true);
    const handlePopupClose = () => setShowPopup(false);

    // Print table
    const printTable = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Leave Records</title>
                    <style>
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid black; padding: 8px; text-align: left; }
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
                                <th>Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${currentLeaves.map((leave) => `
                                <tr>
                                    <td>${leave.employee.employeeId}</td>
                                    <td>${leave.employee.firstName}</td>
                                    <td>${leave.leaveType}</td>
                                    <td>${leave.startDate}</td>
                                    <td>${leave.reason}</td>
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

    // Export table to CSV
    const exportToExcel = () => {
        const csvRows = [];
        const headers = ['EMP. ID', 'EMP Name', 'Leave Type', 'Leave Start Date', 'Leave End Date', 'Reason'];
        csvRows.push(headers.join(','));

        currentLeaves.forEach((leave) => {
            const row = [
                leave.employee.empId,
                leave.employee.empName,
                leave.leaveType,
                leave.startDate,
                leave.endDate,
                leave.reason,
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
                <button className="leave-button" onClick={handleLeaveClick}>Add Leave</button>
                <h2>Employee Leave Records</h2>
                <CustomAlerts />
            </div>
            <div className="leave-search-N-results">
                <div className="leave-search">
                    <FloatingInput
                    label={"Search"}
                    type="text"
                        placeholder="Search..."
                       
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}/>
                   
                </div>
                <div className="leave-results-info">
                    Showing {currentLeaves.length} / {filteredLeaves.length} results
                    <button className="leave-ex-pri-buttons" onClick={exportToExcel}>
                        <i className="fa-regular fa-file-excel"></i> Export
                    </button>
                    <button className="leave-ex-pri-buttons" onClick={printTable}>
                        <i className="fa-solid fa-print"></i> Print
                    </button>
                </div>
            </div>
            <div className="table-container">
                <table className="leave-table" ref={tableRef}>
                    <thead>
                        <tr>
                            {["EMP. ID", "EMP Name", "Leave Type", "Leave Start Date", "Leave End Date", "Reason"].map(
                                (header, index) => (
                                    <th
                                        key={index}
                                        style={{ width: columnWidths[index] }}
                                        className="resizable-th"
                                    >
                                        <div className="header-content">
                                            <span>{header}</span>
                                            <div
                                                className="resizer"
                                                onMouseDown={(e) =>
                                                    startResizing(e, tableRef, setColumnWidths)(index)
                                                }
                                            ></div>
                                        </div>
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {currentLeaves.length > 0 ? (
                            currentLeaves.map((leave, index) => (
                                <tr key={index}>
                                    <td>{leave?.employeeDTO?.employeeId || 'N/A'}</td>
                                    <td>
                                        {`${leave?.employeeDTO?.firstName || 'N/A'} ${leave?.employeeDTO?.lastName || ''}`.trim()}
                                    </td>
                                    <td>{leave?.leaveType || 'N/A'}</td>
                                    <td>{leave?.startDate || 'N/A'}</td>
                                    <td>{leave?.endDate || 'N/A'}</td>
                                    <td>{leave?.reason || 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>
                                    No leave records found.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
            
            {showPopup && (
                <AddLeavePopup onClose={handlePopupClose} onSubmit={handleFormSubmit} />
            )}
        </div>
    );
}

export default EmpLeave;

/* Ravindra_Sanap_EmpLeave.jsx_04_10_2024_End */
