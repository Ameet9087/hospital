import React, { useState, useEffect, useRef } from 'react';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
// import './BloodDonationReportModule.css'; 
// import { startResizing} from ""
import "./bBReport.css"

const BBReport = () => {
    // State for form inputs
    const [startDate, setStartDate] = useState("2024-09-17");
    const [endDate, setEndDate] = useState("2024-09-24");
    const [donationType, setDonationType] = useState("");
    const [status, setStatus] = useState("");
    const [department, setDepartment] = useState("");
    const [donorName, setDonorName] = useState("");
    const [donorContact, setDonorContact] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [isReportVisible, setIsReportVisible] = useState(false); // New state for visibility
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    // Sample data for demonstration
    const reportsData = [
        {
            donorId: '001',
            donorName: 'John Doe',
            donationDate: '2024-09-20',
            address: '123 Elm St, Cityville',
            donorContactNumber: '123-456-7890',
            donationType: 'Whole Blood',
            department: 'Blood Bank',
            status: 'Successful',
            bloodType: 'A+'
        },
        {
            donorId: '002',
            donorName: 'Jane Smith',
            donationDate: '2024-09-21',
            address: '456 Oak St, Townsville',
            donorContactNumber: '098-765-4321',
            donationType: 'Platelets',
            department: 'Emergency Department',
            status: 'Pending',
            bloodType: 'O-'
        },
        // Add more sample data as needed
    ];

    const handleShowReport = () => {
        setIsReportVisible(true); // Set visibility to true
        // Additional logic to fetch and filter report data can be added here
        console.log({
            startDate,
            endDate,
            donationType,
            status,
            department,
            donorName,
            donorContact,
            bloodType,
        });
    };

    return (
        <div className="blood-donation-report-module-container">
            <h2 className="blood-donation-report-module-title">Blood Donation Report</h2>
            <div className="blood-donation-report-module-filters">
                <div className="blood-donation-report-module-date-filter">
                    <label>From: </label>
                    <input
                        type="date"
                        className="blood-donation-report-module-input-date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <label>To: </label>
                    <input
                        type="date"
                        className="blood-donation-report-module-input-date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className="blood-donation-report-module-form-group label">
                    <label>Search Donors: </label>
                    <input
                        type="text"
                        className="blood-donation-report-module-search-input"
                        placeholder="Search by Donor Name, Contact"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                    />
                </div>
            </div>
            <div className="blood-donation-report-module-form">
                <div className="blood-donation-report-module-form-group">
                    <label>Donation Type: </label>
                    <select value={donationType} onChange={(e) => setDonationType(e.target.value)}>
                        <option value="">Select Donation Type</option>
                        <option value="Whole Blood">Whole Blood</option>
                        <option value="Platelets">Platelets</option>
                        <option value="Plasma">Plasma</option>
                    </select>
                </div>
                <div className="blood-donation-report-module-form-group">
                    <label>Status: </label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="Successful">Successful</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
                <div className="blood-donation-report-module-form-group">
                    <label>Department: </label>
                    <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                        <option value="">Select Department</option>
                        <option value="Blood Bank">Blood Bank</option>
                        <option value="Emergency Department">Emergency Department</option>
                    </select>
                </div>
                <div className="blood-donation-report-module-form-group">
                    <label>Donor Contact Number: </label>
                    <input
                        type="text"
                        value={donorContact}
                        onChange={(e) => setDonorContact(e.target.value)}
                    />
                </div>
            </div>
            <div className='blood-donation-module'>
                <div className="blood-donation-report-module-form-group">
                    <label>Blood Type: </label>
                    <select value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>

                <button className="blood-donation-report-module-show-report-button" onClick={handleShowReport}>
                    <i className="fas fa-search"></i> Show Report
                </button>
            </div>

            {isReportVisible && ( // Conditional rendering of the table
                <div className='table-container'>
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                {[
                                    "Donor ID",
                                    "Donor Name",
                                    "Donation Date",
                                    "Address",
                                    "Donor Contact Number",
                                    "Donation Type",
                                    "Department",
                                    "Status",
                                    "Blood Type"
                                ].map((header, index) => (
                                    <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                                        <div className="header-content">
                                            <span>{header}</span>
                                            <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {reportsData && reportsData.length > 0 ? (
                                reportsData.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.donorId}</td>
                                        <td>{row.donorName}</td>
                                        <td>{row.donationDate}</td>
                                        <td>{row.address}</td>
                                        <td>{row.donorContactNumber}</td>
                                        <td>{row.donationType}</td>
                                        <td>{row.department}</td>
                                        <td>{row.status}</td>
                                        <td>{row.bloodType}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="user-name-no-row">No Rows To Show</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BBReport;
