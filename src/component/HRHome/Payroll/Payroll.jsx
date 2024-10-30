/* Ravindra_Sanap_Payroll.jsx_07_10_2024_Start */

import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import './Payroll.css';
import * as XLSX from 'xlsx';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';

import useCustomAlert from '../../../alerts/useCustomAlert';


function Payroll() {
    const [payrolls, setPayrolls] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editPayroll, setEditPayroll] = useState(null);
    const [newPayroll, setNewPayroll] = useState({
        empId: '',
        payDate: '',
        totalSalary: '',
    });

    const payrollsPerPage = 10;
    const tableRef = useRef(null);
    const [columnWidths, setColumnWidths] = useState(['150px', '150px', '200px', '150px', '150px', '100px']);


    const { success, warning, error, CustomAlerts } = useCustomAlert();


    useEffect(() => {
        fetchPayrolls();
    }, []);

    const fetchPayrolls = async () => {
        try {
            const response = await axios.get('http://localhost:8086/api/payrolls/getall');
            setPayrolls(response.data);
        } catch (error) {
            console.error('Error fetching payroll data:', error);
            warning('Failed to Fetch Employee Payrolls');

        }
    };

    const handleAddPayroll = async (e) => {
        e.preventDefault();
        try {
            const payrollData = {
                employeeId: newPayroll.empId,
                payDate: newPayroll.payDate,
                totalSalary: newPayroll.totalSalary
            };
            await axios.post('http://localhost:8086/api/payrolls/add', payrollData);
            fetchPayrolls();
            setShowAddModal(false);
            success('Employee Payroll Added Successfully');
            setNewPayroll({ empId: '', payDate: '', totalSalary: '' });
        } catch (error) {
            console.error('Error adding payroll:', error);
            warning('Failed to Add Employee Payroll');

        }
    };

    const handleEditPayroll = async (e) => {
        e.preventDefault();
        try {
            const payrollData = {
                employeeId: editPayroll.employee.empId,
                payDate: editPayroll.payDate,
                totalSalary: editPayroll.totalSalary
            };
            await axios.put(`http://localhost:8086/api/payrolls/update/${editPayroll.payroll_id}`, payrollData);
            fetchPayrolls();
            setShowEditModal(false);
            success('Employee Payroll Updated Successfully');

        } catch (error) {
            console.error('Error editing payroll:', error);
            warning('Failed to Update Employee Payroll');

        }
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(payrolls);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Payrolls');
        XLSX.writeFile(workbook, 'Payrolls.xlsx');
    };

    const filteredPayrolls = payrolls.filter((payroll) =>
        payroll.payroll_id.toString().includes(searchTerm) ||
        payroll.employee.empId.toString().includes(searchTerm) ||
        payroll.employee.empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payroll.payDate.includes(searchTerm) ||
        payroll.totalSalary.toString().includes(searchTerm)
    );

    const indexOfLastPayroll = currentPage * payrollsPerPage;
    const indexOfFirstPayroll = indexOfLastPayroll - payrollsPerPage;
    const currentPayrolls = filteredPayrolls.slice(indexOfFirstPayroll, indexOfLastPayroll);
    const totalPages = Math.ceil(filteredPayrolls.length / payrollsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
    const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

    const handleEditClick = (payroll) => {
        setEditPayroll(payroll);
        setShowEditModal(true);
    };

    const onClose = () => {
        setShowAddModal(false);
        setShowEditModal(false);
    };

    const printTable = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Payroll Print</title>
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
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h2>Payroll List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Payroll ID</th>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Pay Date</th>
                                <th>Total Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${payrolls.map(payroll => `
                                <tr>
                                    <td>${payroll.payroll_id}</td>
                                    <td>${payroll.employee.empId}</td>
                                    <td>${payroll.employee.empName}</td>
                                    <td>${payroll.payDate}</td>
                                    <td>${payroll.totalSalary}</td>
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

    return (
        <div className='payroll-container'>
            <div className="payroll-header">
                <button className="payroll-button" onClick={() => setShowAddModal(true)}>
                    Add Payroll
                </button>
                <h2>Payroll List</h2>
                <CustomAlerts />

            </div>
            <div className="payroll-search-N-results">
                <div className="payroll-search">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="payroll-searchInput"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="payroll-results-info">
                    Showing {currentPayrolls.length} / {filteredPayrolls.length} results
                    <button className="payroll-ex-pri-buttons" onClick={exportToExcel}>
                        <i className="fa-regular fa-file-excel"></i> Export
                    </button>
                    <button className="payroll-ex-pri-buttons" onClick={printTable}>
                        <i className="fa-solid fa-print"></i> Print
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className='evaluation-table' ref={tableRef}>
                    <thead>
                        <tr>
                            {["Payroll ID", "Employee ID", "Employee Name", "Pay Date", "Total Salary", "Action"].map((header, index) => (
                                <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
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
                        {currentPayrolls.length === 0 ? (
                            <tr>
                                <td className='nodatatoshow' colSpan="6" style={{ textAlign: 'center' }}>No data to show</td>
                            </tr>
                        ) : (
                            currentPayrolls.map((payroll) => (
                                <tr key={payroll.payroll_id}>
                                    <td>{payroll.payroll_id}</td>
                                    <td>{payroll.employee.empId}</td>
                                    <td>{payroll.employee.empName}</td>
                                    <td>{payroll.payDate}</td>
                                    <td>{payroll.totalSalary}</td>
                                    <td>
                                        <button className="payrolledit-btn" onClick={() => handleEditClick(payroll)}>
                                            Edit
                                        </button>
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

            {showAddModal && (
               
                <div className="payroll__overlay">
                    <div className="payroll__popup">
                        <div className="payroll__header">
                            <h2>Add Payroll</h2>

                            <button
                                onClick={onClose}
                                className="payroll__closeButton"
                            >
                                X
                            </button>
                        </div>
                        <form className="payroll__form" onSubmit={handleAddPayroll}>
                            <div className="payroll__formGroup">
                                <label>Employee ID:</label>
                                <input
                                    type="text"
                                    placeholder="Employee ID"
                                    value={newPayroll.empId}
                                    onChange={(e) => setNewPayroll({ ...newPayroll, empId: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="payroll__formGroup">
                                <label>Pay Date:</label>
                                <input
                                    type="date"
                                    value={newPayroll.payDate}
                                    onChange={(e) => setNewPayroll({ ...newPayroll, payDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="payroll__formGroup">
                                <label>Total Salary:</label>
                                <input
                                    type="number"
                                    placeholder="Total Salary"
                                    value={newPayroll.totalSalary}
                                    onChange={(e) => setNewPayroll({ ...newPayroll, totalSalary: e.target.value })}
                                    required
                                />
                            </div>


                            <div className="payroll__formActions">
                                <button type="button" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit">Register</button>
                            </div>
                        </form>

                    </div>
                </div>

            )}

            {showEditModal && editPayroll && (

                <div className="payroll__overlay">
                    <div className="payroll__popup">
                        <div className="payroll__header">
                            <h2>Edit Payroll</h2>

                            <button
                                onClick={onClose}
                                className="payroll__closeButton"
                            >
                                X
                            </button>
                        </div>
                        <form className="payroll__form" onSubmit={handleEditPayroll}>
                            <div className="payroll__formGroup">
                                <label>Employee ID:</label>
                                <input
                                    type="text"
                                    placeholder="Employee ID"
                                    value={editPayroll.employee.empId}
                                    onChange={(e) => setEditPayroll({ ...editPayroll, employee: { ...editPayroll.employee, empId: e.target.value } })}
                                    required
                                />
                            </div>
                            <div className="payroll__formGroup">
                                <label>Pay Date:</label>
                                <input
                                    type="date"
                                    value={editPayroll.payDate}
                                    onChange={(e) => setEditPayroll({ ...editPayroll, payDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="payroll__formGroup">
                                <label>Total Salary:</label>
                                <input
                                    type="number"
                                    placeholder="Total Salary"
                                    value={editPayroll.totalSalary}
                                    onChange={(e) => setEditPayroll({ ...editPayroll, totalSalary: e.target.value })}
                                    required
                                />
                            </div>


                            <div className="payroll__formActions">
                                <button type="button" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit">Update</button>
                            </div>
                        </form>

                    </div>
                </div>
            )}


        </div>
    );
}

export default Payroll;


/* Ravindra_Sanap_Payroll.jsx_07_10_2024_End */