import React, { useState, useRef, useEffect } from 'react';
import './Visitorbadges.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';
import useCustomAlert from '../../../alerts/useCustomAlert';
import { API_BASE_URL } from '../../api/api';

const Visitorbadges = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
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

    const [visitingbadges, setVisitingbadges] = useState([]); // Fixed variable name
    const [error, setError] = useState(null);
    const [columnWidths, setColumnWidths] = useState({});
    const [currentPage, setCurrentPage] = useState(1); // Declare currentPage state
    const recordsPerPage = 10; // Set records per page
    const tableRef = useRef(null);
    const { success, warning, CustomAlerts } = useCustomAlert();


    // Fetch visitors data from API
    useEffect(() => {
        fetch(`${API_BASE_URL}/visitors`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setVisitingbadges(data)) // Updated the state setting
            .catch((error) => setError(error.message));
    }, []);

    // Function to calculate paginated visitors
    const paginatedVisitors = visitingbadges.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );
    // Handle add visitor button click
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

    // Handle edit visitor button click
    const handleEditClick = (record) => {
        setIsUpdating(true);
        setFormData({
            id: record.id,
            visitorName: record.visitorName,
            visitorType: record.visitorType,
            visitPurpose: record.visitPurpose,
            badgeId: record.badgeId,
            meetingDetails: record.meetingDetails,
        });
        setModalVisible(true);
    };

    // Handle form submission for adding or updating visitors
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Prepare the visitor data to be sent to the API
        const visitorData = { ...formData, meetingDetails: { ...formData.meetingDetails } };

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
                    setVisitingbadges((prevVisitors) =>
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
                    setVisitingbadges((prevVisitors) => [...prevVisitors, newVisitor]);
                    setModalVisible(false);
                })
                .catch((error) => setError(error.message));
        }
    };

    // Filter visitors by search query
    const filteredVisitors = visitingbadges.filter((visitor) => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            visitor.id.toString().includes(searchTerm) ||
            visitor.badgeId.toString().includes(searchTerm) ||
            visitor.visitorName.toLowerCase().includes(searchTerm) ||
            visitor.visitorType.toLowerCase().includes(searchTerm) ||
            visitor.visitPurpose.toLowerCase().includes(searchTerm)
        );
    });

    const totalPages = Math.ceil(filteredVisitors.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedBadges = filteredVisitors.slice(startIndex, startIndex + recordsPerPage);


    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
    };

    // Function to print the table
    const printTable = () => {
        const printWindow = window.open('', '_blank');
        const tableHTML = tableRef.current.outerHTML;

        printWindow.document.write(`
        <html>
            <head>
                <title>Print Table</title>
                <style>
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid black; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h2>Visitor Badges</h2>
                ${tableHTML}
            </body>
        </html>
    `);
        printWindow.document.close();
        printWindow.print();
    };

    // Function to export table data to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(visitingbadges);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Visitors');

        XLSX.writeFile(workbook, 'VisitorBadges.xlsx');
    };

    return (
        <div className="visitorbadges-page">
            <div className="visitor1-header">
                <h2>Visitors Badges</h2>
                <CustomAlerts />

            </div>

            <div className="visitorbadges-search-N-results">
                <div className="visitorbadges-searchAndActions">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="visitorbadges-searchInput"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="visitorbadges-results-info">
                    Showing {paginatedBadges.length} / {visitingbadges.length} results
                    <button className="visitorbadges-ex-pri-buttons" onClick={exportToExcel}>
                        <i className="fa-regular fa-file-excel"></i> Export
                    </button>
                    <button className="visitorbadges-ex-pri-buttons" onClick={printTable}>
                        <i className="fa-solid fa-print"></i> Print
                    </button>
                </div>
            </div>

            <table className="visitorbadges-table" ref={tableRef}>
                <thead>
                    <tr>
                        {['Visitor ID', 'Badge ID', 'Visitor Name', 'Action'].map((header, index) => (
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
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {paginatedBadges.map((visitor) => (
                        <tr key={visitor.id}>
                            <td>{visitor.id}</td>
                            <td>{visitor.badgeId}</td>
                            <td>{visitor.visitorName}</td>
                            <td>
                                <button
                                    className="visitorbadges-edit-button"
                                    onClick={() => handleEditClick(visitor)}
                                >
                                    Edit
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
                                <label>Visitor Badge:</label>
                                <input
                                    type="text"
                                    value={formData.badgeId}
                                    onChange={(e) =>
                                        setFormData({ ...formData, badgeId: e.target.value })
                                    }
                                    placeholder="Badge ID "
                                    required
                                />
                            </div>


                            <div className="visitor1__formActions">
                                <button type="button" onClick={() => setModalVisible(false)}>
                                    Cancel
                                </button>
                                <button type="submit">
                                    {isUpdating ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
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

export default Visitorbadges
