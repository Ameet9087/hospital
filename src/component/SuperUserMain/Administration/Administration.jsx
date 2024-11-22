// Kshitija_FacilityService_26_09_startline_2
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Administration.css'; // Importing the CSS file

Modal.setAppElement('#root'); // Set the app element for accessibility

const Administration = () => {
    const [requests, setRequests] = useState([]); // Initialize requests state as an empty array
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        fetchRequests();
    }, []); // Empty dependency array to run once on mount

    const fetchRequests = () => {
        fetch('http://localhost:8080/api/administration/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);
                setRequests(data);
            })
            .catch(error => {
                console.error('Error fetching facility requests:', error);
            });
    };

    const openModal = (request) => {
        setSelectedRequestId(request.issuesrequest_id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRequestId(null);
    };

    const handleApprove = () => {
        if (selectedRequestId) {
            fetch(`http://localhost:8080/api/administration/resolve/${selectedRequestId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to approve the request');
                    }
                    return response.json();
                })
                .then(() => {
                    fetchRequests(); // Refresh the requests after approval
                    closeModal();
                })
                .catch((error) => {
                    console.error('Error approving the request:', error);
                });
        }
    };

    const handleReject = () => {
        if (selectedRequestId) {

            fetch(`http://localhost:8080/api/administration/delete/${selectedRequestId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to reject the request: ' + response.statusText);
                    }
                    return response.text().then(text => {
                        try {
                            return JSON.parse(text);
                        } catch {
                            return text;
                        }
                    });
                })
                .then((data) => {
                    console.log("Response data:", data);
                    fetchRequests();
                    closeModal();
                })
                .catch((error) => {
                    console.error('Error rejecting the request:', error.message);
                    alert('Error rejecting the request: ' + error.message); // Alert the user
                });
        } else {
            console.warn("No selected request ID.");
        }
    };



    const selectedRequest = requests.find((request) => request.issuesrequest_id === selectedRequestId); // Get selected request

    return (
        <div className='superuser-administration-outerDiv'>
            <span className='superuser-administration-heading-text'>Administration</span>
            <table className="superuser-administration-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Department Name</th>
                        <th>Issue Type</th>
                        <th>Requested By</th>
                        <th>Request Date</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.issuesrequest_id}>
                            <td>{request.issuesrequest_id}</td>
                            <td>{request.departmentBy}</td>
                            <td>{request.issueType}</td>
                            <td>{request.requestedBy}</td>
                            <td>{request.createdDate}</td>
                            <td>{request.description}</td>
                            <td>{request.status}</td>
                            <td>
                                <button className="superuser-administration-button" onClick={() => openModal(request)}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedRequest && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Request Details"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Apply overlay style
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            transform: 'translate(-50%, -50%)',
                        },
                    }}
                >
                    <button className="superuser-administration-closeButton" onClick={closeModal}>
                        &times; {/* Cross icon */}
                    </button>

                    <span className='superuser-administration-requestDetail-title'>Request Details</span>
                    <table className="superuser-administration-modalTable">
                        <tbody>
                            <tr>
                                <td><strong>ID:</strong></td>
                                <td>{selectedRequest.issuesrequest_id}</td>
                            </tr>
                            <tr>
                                <td><strong>Department Name:</strong></td>
                                <td>{selectedRequest.departmentBy}</td>
                            </tr>
                            <tr>
                                <td><strong>Issue Type:</strong></td>
                                <td>{selectedRequest.issueType}</td>
                            </tr>
                            <tr>
                                <td><strong>Requested By:</strong></td>
                                <td>{selectedRequest.requestedBy}</td>
                            </tr>
                            <tr>
                                <td><strong>Request Date:</strong></td>
                                <td>{selectedRequest.createdDate}</td>
                            </tr>
                            <tr>
                                <td><strong>Description:</strong></td>
                                <td>{selectedRequest.description}</td>
                            </tr>
                            <tr>
                                <td><strong>Status:</strong></td>
                                <td>{selectedRequest.status}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className='superuser-administration-app-rej-btn'>
                        <button className="superuser-administration-approve-button" onClick={handleApprove}>Approve</button>
                        <button className="superuser-administration-button-reject" onClick={handleReject}>Reject</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Administration;
// Kshitija_FacilityService_26_09_endline_15
