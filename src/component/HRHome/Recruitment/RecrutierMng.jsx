/* Ajhar Tamboli recrutierMng.jsx 07-10-24 */


import React, { useState, useEffect } from 'react';
import "./RecrutierMng.css";
import axios from 'axios'; // Import axios for making API calls
import AddNewrecrutier from './AddNewrecrutier';

const RecrutierMng = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [recruiters, setRecruiters] = useState([]); // State to hold recruiter data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to hold any error messages
    const [searchQuery, setSearchQuery] = useState(""); // State to track search input

    const handleAddNewRecrutier = () => {
        setShowPopup(true); // Show the popup
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Hide the popup
    };

    const handleSubmitButton = async (formData) => {
        try {
            const response = await axios.post('http://localhost:8086/api/recruitments/add', formData);
            console.log('Recruiter added:', response.data); // Handle success (you might want to show a success message)
        } catch (error) {
            console.error('Error adding recruiter:', error); // Handle errors (you might want to show an error message)
        }

        setShowPopup(false); // Hide the popup
    };

    useEffect(() => {
        const fetchRecruiters = async () => {
            try {
                const response = await axios.get('http://localhost:8086/api/recruitments/getall');
                setRecruiters(response.data); // Set the fetched data to state
            } catch (err) {
                setError('Error fetching recruiters'); // Handle errors
                console.error(err);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchRecruiters(); // Fetch recruiters on component mount
    }, []); // Empty dependency array to run once on mount


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update the search query state
    };

    // Filter the recruiters by name based on the search query
    const filteredRecruiters = recruiters.filter(recruiter =>
        recruiter.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>{error}</div>; // Show error message
    }

    return (
        <div className="recrutierMng-container">
            <div className="recrutierMng-firstRow">
                <div className="recrutierMng-addBtn">
                    <button className="recrutierMng-add-button" onClick={handleAddNewRecrutier}>+Add New Recruiter</button>
                </div>
            </div>
            <div className='recrutierMng-search-N-result'>
                <div className="recrutierMng-search-bar">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={handleSearchChange} // Update search query on input change
                    />
                </div>
                <div className="recrutierMng-results-info">
                    <span>Showing {filteredRecruiters.length} results</span>
                    <button className="recrutierMng-print-button"><i className="fa-solid fa-print"></i> Print</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Recruiter ID</th>
                        <th>Recruiter Name</th>
                        <th>Email Address</th>
                        <th>Contact Number</th>
                        <th>Date of Joining</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Employee Type</th>
                        <th>Assigned Hiring Managers</th>
                        <th>Previous Role</th>
                        <th>Status</th>
                        <th>Remarks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecruiters.map((recruiter) => (
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
                                <button className="recrutierMng-edit-button" onClick={handleAddNewRecrutier}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal Popup */}
            {showPopup && (
                <div className="recrutierMng-modal">
                    <div className="recrutierMng-modal-content">
                        <AddNewrecrutier onClose={handleClosePopup} onSubmit={handleSubmitButton} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecrutierMng;
