import React, { useState, useEffect, useRef } from 'react';
import "./RecrutierMng.css";
import axios from 'axios';
import { utils, writeFile } from 'xlsx';
import AddNewrecrutier from './AddNewrecrutier';
import Updaterecruiter from './Updaterecruiter'
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import useCustomAlert from '../../../alerts/useCustomAlert';


const RecrutierMng = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showupdatePopup, setShowupdatePopup] = useState(false);
    const [recruiters, setRecruiters] = useState([]);
    const [selectedRecruiter, setSelectedRecruiter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [columnWidths, setColumnWidths] = useState([100, 150, 150, 120, 150, 120, 150, 120, 150, 150, 120, 150, 100]); // Example initial widths
    const tableRef = useRef(null);

    const { success, warning, CustomAlerts } = useCustomAlert();


    const handleAddNewRecrutier = () => {
        setShowPopup(true);
    };

   

    const handleClosePopup = () => {
        setShowPopup(false);
        setShowupdatePopup(false);

    };

    const handleSubmitButton = async (formData) => {
        try {
            const response = await axios.post('http://localhost:8086/api/recruitments/add', formData);
            console.log('Recruiter added:', response.data);
            fetchRecruiters();
            success('Recruitment Added Successfully');

        } catch (error) {
            console.error('Error adding recruiter:', error);
            warning('Failed to Add Recruitment');

        }
        setShowPopup(false);
    };

    const handleUpdateSubmitButton = async (formData) => {
        try {
            const response = await axios.put(`http://localhost:8086/api/recruitments/update/${formData.recruitement_id}`, formData);
            console.log('Recruiter added:', response.data);
            fetchRecruiters();
            
            success('Recruitment Updated Successfully');
            

        } catch (error) {
            console.error('Error adding recruiter:', error);
            warning('Failed to Update Recruitment');

        }
        setShowupdatePopup(false);
    };

    const fetchRecruiters = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8086/api/recruitments/getall');
            setRecruiters(response.data);
        } catch (err) {
            setError('Error fetching recruiters');
            console.error(err);
            warning('Failed to Fetch Recruitment');

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecruiters();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleEditRecrutier = (recruiter) => {
        setSelectedRecruiter(recruiter); // Set the selected recruiter in state
        setShowupdatePopup(true);
    };
    
    

    const filteredRecruiters = recruiters.filter(recruiter =>
        recruiter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recruiter.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recruiter.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRecruiters.length / itemsPerPage);
    const indexOfLastRecruiter = currentPage * itemsPerPage;
    const indexOfFirstRecruiter = indexOfLastRecruiter - itemsPerPage;
    const currentRecruiters = filteredRecruiters.slice(indexOfFirstRecruiter, indexOfLastRecruiter);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const exportToExcel = () => {
        const ws = utils.json_to_sheet(recruiters);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, 'Recruiters');
        writeFile(wb, 'recruiters.xlsx');
    };

    const printTable = () => {
        const printContents = document.querySelector('table').outerHTML;
        const newWindow = window.open();
        newWindow.document.write(`
            <html>
            <head>
                <title>Print Recruiter Table</title>
                <style>
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid black; padding: 8px; text-align: left; }
                </style>
            </head>
            <body>
                ${printContents}
                <script>
                    window.onload = function() { window.print(); window.close(); };
                </script>
            </body>
            </html>
        `);
        newWindow.document.close();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="recrutierMng-container">
            <div className="recrutierMng-header">
                <button className="recrutierMng-button" onClick={handleAddNewRecrutier}>
                    New Recruitment
                </button>
                <h2>Recruitment Management</h2>
                <CustomAlerts />

            </div>
            <div className="recrutierMng-search-N-results">
                <div className="recrutierMng-search">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="recrutierMng-searchInput"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="recrutierMng-results-info">
                    <span>Showing {currentRecruiters.length} / {filteredRecruiters.length} results</span>
                    <button
                        className="recrutierMng-ex-pri-buttons"
                        onClick={exportToExcel}
                    >
                        <i className="fa-regular fa-file-excel"></i> Export
                    </button>
                    <button className="recrutierMng-print-button" onClick={printTable}><i className="fa-solid fa-print"></i> Print</button>
                </div>
            </div>
            <div className="table-container">
                <table className='recrutierMng-table' ref={tableRef}>
                    <thead>
                        <tr>
                            {[
                                "Recruiter ID",
                                "Recruiter Name",
                                "Email Address",
                                "Contact Number",
                                "Date of Joining",
                                "Department",
                                "Designation",
                                "Employee Type",
                                "Assigned Hiring Managers",
                                "Previous Role",
                                "Status",
                                "Remarks",
                                "Actions"
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
                        {currentRecruiters.length === 0 ? (
                            <tr>
                                <td colSpan="13" style={{ textAlign: 'center' }}>No data to show</td>
                            </tr>
                        ) : (
                            currentRecruiters.map((recruiter) => (
                                <tr key={recruiter.recruitement_id}>
                                    <td>{recruiter.recruitement_id}</td>
                                    <td>{recruiter.name}</td>
                                    <td>{recruiter.email}</td>
                                    <td>{recruiter.mobile}</td>
                                    <td>{recruiter.dateofjoining}</td>
                                    <td>{recruiter.department}</td>
                                    <td>{recruiter.designation}</td>
                                    <td>{recruiter.typeofemployee}</td>
                                    <td>{recruiter.hiredBy}</td>
                                    <td>{recruiter.previousRole}</td>
                                    <td>{recruiter.status}</td>
                                    <td>{recruiter.remark}</td>
                                    <td>
                                        <button className="recrutierMng-edit-button" onClick={() => handleEditRecrutier(recruiter)}>Edit</button>
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
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={nextPage} className={currentPage === totalPages ? 'disabled' : ''} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
            {showPopup && (
                <div className="recrutierMng-modal">
                    <div className="recrutierMng-modal-content">
                        <AddNewrecrutier onClose={handleClosePopup} onSubmit={handleSubmitButton} />
                    </div>
                </div>
            )}

            {showupdatePopup && (
                <div className="recrutierMng-modal">
                    <div className="recrutierMng-modal-content">
                        <Updaterecruiter
                            onClose={handleClosePopup}
                            onSubmit={handleUpdateSubmitButton}
                            recruiter={selectedRecruiter} 
                        />
                    </div>
                </div>
            )}

        </div>
    );
};

export default RecrutierMng;
