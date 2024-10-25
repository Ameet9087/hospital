/* Ravindra_Sanap_EmpLeave.jsx_04_10_2024_Start */


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmpLeave.css';
import AddLeavePopup from './AddLeavePopup';

function EmpLeave() {
    const [leaves, setLeaves] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const leavesPerPage = 10;

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:8086/api/leave/getall');
            setLeaves(response.data);
        } catch (error) {
            console.error('Error fetching leave data:', error);
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
            handlePopupClose();
            fetchLeaves();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const filteredLeaves = leaves.filter((leave) =>
        leave.employee.empName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastLeave = currentPage * leavesPerPage;
    const indexOfFirstLeave = indexOfLastLeave - leavesPerPage;
    const currentLeaves = filteredLeaves.slice(indexOfFirstLeave, indexOfLastLeave);
    const totalPages = Math.ceil(leaves.length / leavesPerPage);

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

    return (
        <div className="leave-container">
            <div className="leave-header">
                <h2>Employee Leave Records</h2>
                <button className="leave-button" onClick={handleLeaveClick}>
                    Add Leave
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


            {showPopup && (
                <AddLeavePopup
                    onClose={handlePopupClose}
                    onSubmit={handleFormSubmit}
                />
            )}

            <table className="leave-table">
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
                    {currentLeaves.length === 0 ? (
                        <tr>
                            <td className='nodatatoshow' colSpan="5" style={{ textAlign: 'center', color: 'red' }}>No Rows to Show</td>
                        </tr>
                    ) : (
                        currentLeaves.map((leave) => (
                            <tr key={leave.leaveId}>
                                <td>{leave.employee.empId}</td>
                                <td>{leave.employee.empName}</td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.startDate}</td>
                                <td>{leave.endDate}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="leave-pagination">
                <button onClick={prevPage} className={currentPage === 1 ? 'disabled' : ''} disabled={currentPage === 1}>
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={nextPage} className={currentPage === totalPages ? 'disabled' : ''} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default EmpLeave;



/* Ravindra_Sanap_EmpLeave.jsx_04_10_2024_End */
