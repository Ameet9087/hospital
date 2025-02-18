import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import './Payroll.css';
import * as XLSX from 'xlsx';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import useCustomAlert from '../../../alerts/useCustomAlert';
import { API_BASE_URL } from '../../api/api';
import { FloatingInput,FloatingSelect } from '../../../FloatingInputs';
import { toast } from 'react-toastify';

function Payroll() {
    const [payrolls, setPayrolls] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);

    const [editPayroll, setEditPayroll] = useState(null);
    const [newPayroll, setNewPayroll] = useState({
        employeeId: '',
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
            const response = await axios.get(`${API_BASE_URL}/payroll`);
            setPayrolls(response.data);
        } catch (error) {
            console.error('Error fetching payroll data:', error);
            warning('Failed to Fetch Employee Payrolls');
        }
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/employees/get-all-employee`);
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleAddPayroll = async (e) => {
        e.preventDefault();

        try {
            const payrollData = {
                payDate: newPayroll.payDate,
                totalSalary: newPayroll.totalSalary,
                employeeDTO: {
                    employeeId: Number(newPayroll.employeeId)
                }
            };
            
            const response = await axios.post(`${API_BASE_URL}/payroll`, payrollData);

            if (response) {
                fetchPayrolls();
                setShowAddModal(false);
                toast.success('Employee Payroll Added Successfully');
                setNewPayroll({ employeeId: '', payDate: '', totalSalary: '' });
            } else {
                
            }
        } catch (error) {
            toast.error('Error adding payroll:', error);
        }
    };

    
    const handleEditPayroll = async (e) => {
        e.preventDefault();
        try {
            const payrollData = {
                payDate: editPayroll.payDate,
                totalSalary: editPayroll.totalSalary,
                employeeDTO: {
                    employeeId: Number(editPayroll.employeeId)
                }
            };

            const response = await axios.put(`${API_BASE_URL}/payroll/${editPayroll.payroll_id}`, payrollData);

            if (response) {
                fetchPayrolls();
                setShowEditModal(false);
                toast.success('Employee Payroll Updated Successfully');
            } else {
                warning('Failed to Update Employee Payroll');
            }
        } catch (error) {
            console.error('Error editing payroll:', error);
            toast.error=('Failed to Update Employee Payroll');
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
        payroll.employeeDTO.employeeId.toString().includes(searchTerm) ||
        payroll.employeeDTO.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    const handleEmployeeChange = (selectedEmployeeId) => {
        setNewPayroll((prev) => ({
            ...prev,
            employeeId: selectedEmployeeId, // Store only ID, not full object
        }));
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
                                    <td>${payroll.employeeDTO.employeeId}</td>
                                    <td>${payroll.employeeDTO.firstName} ${payroll.employeeDTO.lastName}</td>
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
                    <FloatingInput
                    label={"Search"}
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}/>
                   
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
                                    <td>{payroll.employeeDTO.employeeId}</td>
                                    <td>{payroll.employeeDTO.firstName} {payroll.employeeDTO.lastName}</td>
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

          

            {showAddModal && (
                <div className="payroll__overlay">
                    <div className="payroll__popup">
                        <div className="payroll__header">
                            <h2>Add Payroll</h2>
                            <button onClick={onClose} className="payroll__closeButton">X</button>
                        </div>
                        <form className="payroll__form" onSubmit={handleAddPayroll}>
                            <div className="payroll__formGroup">
                            <FloatingSelect
    label="Employee"
    name="employeeId"
    value={newPayroll.employeeId || ""}
    onChange={(e) =>
        handleEmployeeChange(e.target.value) // Store only the ID
    }
    options={[
        { value: "", label: "Select Employee" },
        ...(Array.isArray(employees)
            ? employees.map((employee) => ({
                value: employee.employeeId, // Ensure value is ID
                label: `${employee.firstName} ${employee.lastName}`,
              }))
            : []),
    ]}
    placeholder="Select Employee"
/>


                            </div>
                            <div className="payroll__formGroup">
                                <FloatingInput
                                label={"Pay Date"}
                                type="date"
                                value={newPayroll.payDate}
                                onChange={(e) => setNewPayroll({ ...newPayroll, payDate: e.target.value })}
                                required/>
                              
                            </div>
                            <div className="payroll__formGroup">
                                <FloatingInput
                                label={"Total Salary"}
                                type="number"
                                    placeholder="Total Salary"
                                    value={newPayroll.totalSalary}
                                    onChange={(e) => setNewPayroll({ ...newPayroll, totalSalary: e.target.value })}
                                    required
                                    min={"1000"}/>
                               
                            </div>

                            <div className="payroll__formActions">
                                <button type="button" onClick={onClose}>Cancel</button>
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
                            <button onClick={onClose} className="payroll__closeButton">X</button>
                        </div>
                        <form className="payroll__form" onSubmit={handleEditPayroll}>
                            <div className="payroll__formGroup">
                                <FloatingSelect
    label="Employee"
    name="employeeId"
    value={editPayroll.employeeId || ""}
    onChange={(e) => setEditPayroll({ ...editPayroll, employeeId: e.target.value })}
    options={[
        { value: "", label: "Select Employee" },
        ...(Array.isArray(employees)
            ? employees.map((employee) => ({
                value: employee.employeeId,
                label: `${employee.firstName} ${employee.lastName}`,
              }))
            : []),
    ]}
    placeholder="Select Employee"
/>

                               
                            </div>
                            <div className="payroll__formGroup">
                                <FloatingInput
                                label={"Pay Date"}
                                type="date"
                                value={editPayroll.payDate}
                                onChange={(e) => setEditPayroll({ ...editPayroll, payDate: e.target.value })}
                                required/>
                                
                            </div>
                            <div className="payroll__formGroup">
                                <FloatingInput
                                label={"Total Salary"}
                                type="number"
                                    placeholder="Total Salary"
                                    value={editPayroll.totalSalary}
                                    onChange={(e) => setEditPayroll({ ...editPayroll, totalSalary: e.target.value })}
                                    required/>
                                
                            </div>

                            <div className="payroll__formActions">
                                <button type="button" onClick={onClose}>Cancel</button>
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
