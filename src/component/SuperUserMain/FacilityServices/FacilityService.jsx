// Kshitija_FacilityService_26_09_startline_2

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './FacilityService.css';
import { API_BASE_URL } from '../../api/api';
import { FloatingInput } from '../../../FloatingInputs';
Modal.setAppElement('#root');

const FacilityService = () => {
    const [requests, setRequests] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/facilityrequests/all `)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data); 
                setRequests(data);
            })
            .catch(error => {
                console.error('Error fetching facility requests:', error);
            });
    }, []);

    const openModal = (request) => {
        console.log('Opening modal for request ID:', request.request_id); 
        setSelectedRequestId(request.request_id); 
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRequestId(null);
    };

    const handleApprove = () => {
        if (selectedRequestId) {
            fetch(`${API_BASE_URL}/facilityrequests/setapproved/${selectedRequestId}`, {
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
                    setRequests((prevRequests) =>
                        prevRequests.map((request) =>
                            request.request_id === selectedRequestId ? { ...request, status: 'Approved' } : request
                        )
                    );
                    closeModal();
                })
                .catch((error) => {
                    console.error('Error approving the request:', error);
                });
        }
    };


    const handleReject = () => {
        if (selectedRequestId) {
            fetch(`${API_BASE_URL}/facilityrequests/setrejected/${selectedRequestId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to reject the request');
                    }
                    return response.json();
                })
                .then(() => {
                    setRequests((prevRequests) =>
                        prevRequests.map((request) =>
                            request.request_id === selectedRequestId ? { ...request, status: 'Rejected' } : request
                        )
                    );
                    closeModal();
                })
                .catch((error) => {
                    console.error('Error rejecting the request:', error);
                });
        }
    };


    const selectedRequest = requests.find((request) => request.request_id === selectedRequestId);

    return (
        <div className='facilityService-outerDiv'>
            <span className='facilityService-heading-text'>Facility Service Requests</span>
            <table className="facilityService-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Facility Name</th>
                        <th>Service Type</th>
                        <th>Requested By</th>
                        <th>Request Date</th>
                        <th>Priority Level</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.request_id}>
                            <td>{request.request_id}</td>
                            <td>{request.facilityName}</td>
                            <td>{request.serviceType}</td>
                            <td>{request.requestedBy}</td>
                            <td>{request.requestDate}</td>
                            <td>{request.priorityLevel}</td>
                            <td>{request.status}</td>
                            <td>
                                <button className="facilityService-button" onClick={() => openModal(request)}>View</button>
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
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                    }}
                >
                    <button className="facilityService-closeButton" onClick={closeModal}>
                        &times;
                    </button>

                    <span className='facilityService-requestDetail-title'>Request Details</span>
                    <table className="facilityService-modalTable">
                        <tbody>
                            <tr>
                                <td><strong>ID:</strong></td>
                                <td>{selectedRequest.request_id}</td>
                            </tr>
                            <tr>
                                <td><strong>Facility Name:</strong></td>
                                <td>{selectedRequest.facilityName}</td>
                            </tr>
                            <tr>
                                <td><strong>Service Type:</strong></td>
                                <td>{selectedRequest.serviceType}</td>
                            </tr>
                            <tr>
                                <td><strong>Requested By:</strong></td>
                                <td>{selectedRequest.requestedBy}</td>
                            </tr>
                            <tr>
                                <td><strong>Request Date:</strong></td>
                                <td>{selectedRequest.requestDate}</td>
                            </tr>
                            <tr>
                                <td><strong>Priority Level:</strong></td>
                                <td>{selectedRequest.priorityLevel}</td>
                            </tr>
                            <tr>
                                <td><strong>Status:</strong></td>
                                <td>{selectedRequest.status}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className='facilityService-app-rej-btn'>
                        <button className="facilityService-approve-button" onClick={handleApprove}>Approve</button>
                        <button className="facilityService-button-reject" onClick={handleReject}>Reject</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FacilityService;


// Kshitija_FacilityService_26_09_endline_150
