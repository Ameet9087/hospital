/* Ravindra_Sanap_Payroll.jsx_07_10_2024_Start */


import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Payroll.css';

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

    useEffect(() => {
        fetchPayrolls();
    }, []);

    const fetchPayrolls = async () => {
        try {
            const response = await axios.get('http://localhost:8086/api/payrolls/getall');
            setPayrolls(response.data);
        } catch (error) {
            console.error('Error fetching payroll data:', error);
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
            setNewPayroll({ empId: '', payDate: '', totalSalary: '' });
        } catch (error) {
            console.error('Error adding payroll:', error);
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
        } catch (error) {
            console.error('Error editing payroll:', error);
        }
    };

    const handleDelete = async (payrollId) => {
        try {
            await axios.delete(`http://localhost:8086/api/payrolls/delete/${payrollId}`);
            fetchPayrolls();
        } catch (error) {
            console.error('Error deleting payroll:', error);
        }
    };

    const filteredPayrolls = payrolls.filter((payroll) =>
        payroll.employee.empName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastPayroll = currentPage * payrollsPerPage;
    const indexOfFirstPayroll = indexOfLastPayroll - payrollsPerPage;
    const currentPayrolls = filteredPayrolls.slice(indexOfFirstPayroll, indexOfLastPayroll);

    const totalPages = Math.ceil(filteredPayrolls.length / payrollsPerPage);

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

    const handleEditClick = (payroll) => {
        setEditPayroll(payroll);
        setShowEditModal(true);
    };

    const onClose = () => {
        setShowAddModal(false);
        setShowEditModal(false);
    };

    return (
        <div className='payroll-container'>
            <div className="addpayroll-header">
                <h2>Payroll List</h2>
                <button className="addpayroll-button" onClick={() => setShowAddModal(true)}>
                    Add Payroll
                </button>
            </div>
            <div className="employee-searchAndActions">
                <input
                    type="text"
                    placeholder="Search By Employee Name"
                    className="employee-searchInput"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <table className='payroll-table'>
                <thead>
                    <tr>
                        <th>Payroll ID</th>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Pay Date</th>
                        <th>Total Salary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPayrolls.length === 0 ? (
                        <tr>
                            <td className='nodatatoshow' colSpan="8" style={{ textAlign: 'center', color: 'red' }}>No Rows to Show</td>
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
                                    <button
                                        className="payrolledit-btn"
                                        onClick={() => handleEditClick(payroll)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="payrolldelete-btn"
                                        onClick={() => handleDelete(payroll.payroll_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className='pagination'>
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
                <div className="modal">
                    <div className="modal-content">
                        <button className="addpayrollclose-popup" onClick={onClose}>X</button>

                        <h2>Add Payroll</h2>
                        <form onSubmit={handleAddPayroll}>
                            <label>Employee ID:</label>
                            <input
                                type="number"
                                value={newPayroll.empId}
                                onChange={(e) => setNewPayroll({ ...newPayroll, empId: e.target.value })}
                                required
                            />

                            <label>Pay Date:</label>
                            <input
                                type="date"
                                value={newPayroll.payDate}
                                onChange={(e) => setNewPayroll({ ...newPayroll, payDate: e.target.value })}
                                required
                            />

                            <label>Total Salary:</label>
                            <input
                                type="number"
                                value={newPayroll.totalSalary}
                                onChange={(e) => setNewPayroll({ ...newPayroll, totalSalary: e.target.value })}
                                required
                            />

                            <button className='actionbtns' type="submit">Submit</button>
                            <button className='actionbtns' type="button" onClick={onClose}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="addpayrollclose-popup" onClick={onClose}>X</button>

                        <h2>Edit Payroll</h2>
                        <form onSubmit={handleEditPayroll}>
                            <label>Employee ID:</label>
                            <input
                                type="number"
                                value={editPayroll?.employee.empId || ''}
                                onChange={(e) => setEditPayroll({ ...editPayroll, employee: { ...editPayroll.employee, empId: e.target.value } })}
                                required
                            />

                            <label>Pay Date:</label>
                            <input
                                type="date"
                                value={editPayroll?.payDate || ''}
                                onChange={(e) => setEditPayroll({ ...editPayroll, payDate: e.target.value })}
                                required
                            />

                            <label>Total Salary:</label>
                            <input
                                type="number"
                                value={editPayroll?.totalSalary || ''}
                                onChange={(e) => setEditPayroll({ ...editPayroll, totalSalary: e.target.value })}
                                required
                            />

                            <button className='actionbtns' type="submit">Save</button>
                            <button className='actionbtns' type="button" onClick={onClose}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Payroll;


/* Ravindra_Sanap_Payroll.jsx_07_10_2024_End */
