import React, { useState, useEffect, useRef } from 'react';
import './Visitor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import VisitorIdModal from './VisitorIdModal'; // Import the new ID modal component
import * as XLSX from 'xlsx'; // Import xlsx library
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import useCustomAlert from '../../../alerts/useCustomAlert';
import { API_BASE_URL } from '../../api/api';

const Visitor = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [idModalVisible, setIdModalVisible] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        visitorName: '',
        visitorType: '',
        visitPurpose: '',
        badgeId: '',
        meetingDetails: {
            toWhom: '',
            meetingStartTime: '',
            meetingEndTime: '',
            visitDate: '',
        },
    });

    const [visitors, setVisitors] = useState([]); // Updated initial state to empty array
    const [error, setError] = useState(null);
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);

    const recordsPerPage = 10; // Show 1 record per page

    const { success, warning, CustomAlerts } = useCustomAlert();


    // Fetch visitors from API when component mounts
    useEffect(() => {
        fetch(`${API_BASE_URL}/visitors`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setVisitors(data))
            .catch((error) => setError(error.message));
    }, []); // Empty dependency array ensures the effect runs only once

    const handleAddClick = () => {
        setIsUpdating(false);
        setFormData({
            id: '',
            visitorName: '',
            visitorType: '',
            visitPurpose: '',
            badgeId: '',
            meetingDetails: {
                toWhom: '',
                meetingStartTime: '',
                meetingEndTime: '',
                visitDate: '',
            },
        });
        setModalVisible(true);
    };

    const handleEditClick = (record) => {
        setIsUpdating(true);
        setFormData({
            id: record.id, // Set the ID of the visitor to update
            visitorName: record.visitorName,
            visitorType: record.visitorType,
            visitPurpose: record.visitPurpose,
            badgeId: record.badgeId,
            meetingDetails: record.meetingDetails, // Assuming this is structured correctly
        });
        setModalVisible(true);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(visitors); // Convert JSON data to worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Visitors');

        // Generate and download Excel file
        XLSX.writeFile(workbook, 'VisitorData.xlsx');
    };
    // Print Table without Action Column
    const printTable = () => {
        const printableContent = `
            <html>
                <head>
                    <title>Visitor List</title>
                    <style>
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid black; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <h2>Visitor List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Visitor ID</th>
                                <th>Visitor Name</th>
                                <th>Visitor Type</th>
                                <th>Visit Purpose</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${visitors.map(visitor => `
                                <tr>
                                    <td>${visitor.id}</td>
                                    <td>${visitor.visitorName}</td>
                                    <td>${visitor.visitorType}</td>
                                    <td>${visitor.visitPurpose}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(printableContent);
        printWindow.document.close();
        printWindow.print();
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Generate a unique badge ID for new visitors (when not updating)
        const generatedBadgeId = isUpdating ? formData.badgeId : `BADGE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Prepare the visitor data to be sent to the API
        const visitorData = {
            ...formData,
            badgeId: generatedBadgeId, // Use the generated badge ID
            meetingDetails: { ...formData.meetingDetails }
        };

        if (isUpdating) {
            // Update existing visitor
            fetch(`${API_BASE_URL}/visitors/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(visitorData),

            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    success('Successfully Visitor Updated');

                    return response.json();

                })
                .then((updatedVisitor) => {
                    setVisitors((prevVisitors) =>
                        prevVisitors.map((visitor) =>
                            visitor.id === updatedVisitor.id ? updatedVisitor : visitor
                        )
                    );
                    setModalVisible(false);
                })
                .catch((error) => setError(error.message));

        } else {
            // Add new visitor
            fetch(`${API_BASE_URL}/visitors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(visitorData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    success('Successfully Visitor Added');

                    return response.json();
                })
                .then((newVisitor) => {
                    setVisitors((prevVisitors) => [...prevVisitors, newVisitor]);
                    setModalVisible(false);
                })
                .catch((error) => setError(error.message));
        }
    };

    const handleGenerateIdClick = (visitor) => {
        setFormData(visitor);
        setIdModalVisible(true);
    };


    const filteredVisitors = visitors.filter((visitor) => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            (visitor.id && visitor.id.toString().includes(searchTerm)) ||
            (visitor.visitorName && visitor.visitorName.toLowerCase().includes(searchTerm)) ||
            (visitor.visitorType && visitor.visitorType.toLowerCase().includes(searchTerm)) ||
            (visitor.visitPurpose && visitor.visitPurpose.toLowerCase().includes(searchTerm))
        );
    });
    // Pagination controls
    const totalPages = Math.ceil(visitors.length / recordsPerPage);
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Calculate the current record to display
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredVisitors.slice(indexOfFirstRecord, indexOfLastRecord);


    return (
        <div className="visitor1-page">
            <div className="visitor1-header">

                <button className="addvisitor-button" onClick={handleAddClick}>
                    Add
                </button>
                <h2>Visitor Management</h2>
                <CustomAlerts />

            </div>


            <div className="visitor1-search-N-results">
                <div className="visitor1-searchAndActions">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="visitor1-searchInput"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="visitor1-results-info">
                    Showing {currentRecords.length} / {visitors.length} results
                    <button
                        className="visitor1-ex-pri-buttons"
                        onClick={exportToExcel}
                    >
                        <i className="fa-regular fa-file-excel"></i> Export
                    </button>
                    <button className="visitor1-ex-pri-buttons" onClick={printTable}>
                        <i className="fa-solid fa-print"></i> Print
                    </button>
                </div>
            </div>



            <table className="visitor1-table" ref={tableRef}>
                <thead>
                    <tr>
                        {['Visitor ID', 'Visitor Name', 'Visitor Type', 'Visit Purpose', 'Action'].map(
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
                                            onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                                        ></div>
                                    </div>
                                </th>


                            )
                        )}
                    </tr>
                </thead>

                <tbody>
                    {currentRecords.map((visitor) => (
                        <tr key={visitor.id}>
                            <td>{visitor.id}</td>
                            <td>{visitor.visitorName}</td>
                            <td>{visitor.visitorType}</td>
                            <td>{visitor.visitPurpose}</td>
                            <td>
                                <button
                                    className="visitor1-edit-button"
                                    onClick={() => handleEditClick(visitor)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="visitor1-edit-button"
                                    onClick={() => handleGenerateIdClick(visitor)} // Open ID popup
                                >
                                    <FontAwesomeIcon icon={faIdBadge} /> Generate ID
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalVisible && (

                <div className="visitor1__overlay">
                    <div className="visitor1__popup">
                        <div className="visitor1__header">
                            <h2>{isUpdating ? 'Update Visitor' : 'Add Visitor'}</h2>
                            <button
                                onClick={() => setModalVisible(false)}
                                className="visitor1__closeButton"
                            >
                                X
                            </button>
                        </div>
                        <form className="visitor1__form" onSubmit={handleFormSubmit}>
                            <div className="visitor1__formGroup">
                                <label>Visitor Name:</label>
                                <input
                                    type="text"
                                    value={formData.visitorName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, visitorName: e.target.value })
                                    }
                                    placeholder="Visitor Name"
                                    required
                                />
                            </div>
                            <div className="visitor1__formGroup">
                                <label>Visitor Type:</label>
                                <input
                                    type="text"
                                    value={formData.visitorType}
                                    onChange={(e) =>
                                        setFormData({ ...formData, visitorType: e.target.value })
                                    }
                                    placeholder="Visitor Type"
                                    required
                                />
                            </div>
                            <div className="visitor1__formGroup">
                                <label>Visit Purpose:</label>
                                <input
                                    type="text"
                                    value={formData.visitPurpose}
                                    onChange={(e) =>
                                        setFormData({ ...formData, visitPurpose: e.target.value })
                                    }
                                    placeholder="Visit Purpose"
                                    required
                                />
                            </div>

                            <div className="visitor1__formGroup">
                                <label>Meeting with:</label>
                                <input
                                    type="text"
                                    value={formData.meetingDetails.toWhom}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            meetingDetails: {
                                                ...formData.meetingDetails,
                                                toWhom: e.target.value
                                            }
                                        })
                                    }
                                    placeholder="Meeting with"
                                    required
                                />
                            </div>

                            <div className="visitor1__formGroup">
                                <label>Meeting Start Time:</label>
                                <input
                                    type="datetime-local"
                                    value={formData.meetingDetails.meetingStartTime}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            meetingDetails: {
                                                ...formData.meetingDetails,
                                                meetingStartTime: e.target.value
                                            }
                                        })
                                    }
                                    placeholder="Meeting Start Time"
                                    required
                                />
                            </div>

                            <div className="visitor1__formGroup">
                                <label>Meeting End Time:</label>
                                <input
                                    type="datetime-local"
                                    value={formData.meetingDetails.meetingEndTime}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            meetingDetails: {
                                                ...formData.meetingDetails,
                                                meetingEndTime: e.target.value
                                            }
                                        })
                                    }
                                    placeholder="Meeting End Time"
                                    required
                                />
                            </div>
                            <div className="visitor1__formGroup">
                                <label>Visit Date:</label>

                                <input
                                    type="date"
                                    value={formData.meetingDetails.visitDate}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            meetingDetails: {
                                                ...formData.meetingDetails,
                                                visitDate: e.target.value
                                            }
                                        })
                                    }
                                    placeholder="Visit Date"
                                    required
                                />
                            </div>



                            <div className="visitor1__formActions">
                                <button type="button" onClick={() => setModalVisible(false)}>
                                    Cancel
                                </button>
                                <button type="submit">{isUpdating ? 'Update Visitor' : 'Add Visitor'}</button>
                            </div>
                        </form>

                    </div>
                </div>
            )}

            {idModalVisible && (
                <VisitorIdModal
                    visitor={formData}
                    onClose={() => setIdModalVisible(false)}
                />
            )}
            <div className="visitor1-pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    « Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next »
                </button>
            </div>
        </div>
    );
};

export default Visitor;
