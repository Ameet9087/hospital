import React, { useState, useRef, useEffect } from 'react';
import './Visitinghours.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';
import useCustomAlert from '../../../alerts/useCustomAlert';
import { API_BASE_URL } from '../../api/api';


const Visitinghours = () => {
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
    const [visitingHours, setVisitingHours] = useState([]);
    const [error, setError] = useState(null);
    const [columnWidths, setColumnWidths] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10; // Set records per page
    const tableRef = useRef(null);
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
            .then((data) => setVisitingHours(data))
            .catch((error) => setError(error.message));
    }, []);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredVisitors);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Visitors');
        XLSX.writeFile(wb, 'visitors.xlsx');
    };

    const printTable = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h2>Visiting Hours Management</h2>');
        printWindow.document.write(tableRef.current.outerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const visitorData = { ...formData, meetingDetails: { ...formData.meetingDetails } };
        if (isUpdating) {
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
                    setVisitingHours((prevVisitors) =>
                        prevVisitors.map((visitor) =>
                            visitor.id === updatedVisitor.id ? updatedVisitor : visitor
                        )
                    );
                    setModalVisible(false);
                })
                .catch((error) => setError(error.message));
        } else {
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
                    setVisitingHours((prevVisitors) => [...prevVisitors, newVisitor]);
                    setModalVisible(false);
                })
                .catch((error) => setError(error.message));
        }
    };

    // Filter and paginate visitors
    const filteredVisitors = visitingHours.filter((visitor) => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            visitor.visitorName.toLowerCase().includes(searchTerm) ||
            visitor.visitorType.toLowerCase().includes(searchTerm) ||
            visitor.visitPurpose.toLowerCase().includes(searchTerm) ||
            visitor.meetingDetails.toWhom.toLowerCase().includes(searchTerm)
        );
    });

    const totalPages = Math.ceil(filteredVisitors.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedVisitors = filteredVisitors.slice(startIndex, startIndex + recordsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    return (
        <div className="visitinghoursmgt-page">
            <div className="visitor1-header">
                <h2>Visiting Hours Management</h2>
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
                    Showing {paginatedVisitors.length} / {visitingHours.length} results
                    <button className="visitor1-ex-pri-buttons" onClick={exportToExcel}>
                        <i className="fa-regular fa-file-excel"></i> Export
                    </button>
                    <button className="visitor1-ex-pri-buttons" onClick={printTable}>
                        <i className="fa-solid fa-print"></i> Print
                    </button>
                </div>
            </div>
            <table className="visitinghoursmgt-table" ref={tableRef}>
                <thead>
                    <tr>
                        {['Visitor ID', 'Visitor Name', 'Meeting With', 'Meeting Start Time', 'Meeting End Time', 'Visiting Date', 'Action'].map(
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
                    {paginatedVisitors.map((visitor) => (
                        <tr key={visitor.id}>
                            <td>{visitor.id}</td>
                            <td>{visitor.visitorName}</td>
                            <td>{visitor.meetingDetails.toWhom}</td>
                            <td>{visitor.meetingDetails.meetingStartTime}</td>
                            <td>{visitor.meetingDetails.meetingEndTime}</td>
                            <td>{visitor.meetingDetails.visitDate}</td>
                            <td>
                                <button
                                    className="visitinghoursmgt-edit-button"
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                <button type="submit">
                                    {isUpdating ? 'Update Visitor' : 'Add Visitor'}
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

export default Visitinghours;
