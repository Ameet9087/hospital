import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './TransportRequest.css';
import CreateRequest from './CreateRequest';
import CustomModal from '../../../CustomModel/CustomModal';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../../api/api';
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";
import { toast } from "react-toastify";
const TransportRequest = () => {
  const [showCreateRequestModal, setShowCreateRequestModal] = useState(false);
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(10);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/vehicle-requests`);
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleSubmit = async (requestData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/vehicle-requests`, requestData);
      setRequests([...requests, response.data]);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error creating request:", error);
      toast.error("Failed to submit form.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/vehicle-requests/${id}`);
      setRequests(requests.filter(request => request.vehicleRequestId !== id));
      
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < Math.ceil(requests.length / requestsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openCreateRequestModal = () => setShowCreateRequestModal(true);
  const closeCreateRequestModal = () => setShowCreateRequestModal(false);

  return (
    <div className="dashboard-container">
      <header className='request-transport-header'>
        <span className="dashboard-heading-text-transport-requeste">Transport Request System</span>
      </header>
      <button className="new-request-button" onClick={openCreateRequestModal}>Create New Request</button>
      <table className="requests-table" ref={tableRef}>
        <thead>
          <tr>
            {["Request ID", "Request Type", "Status", "Pickup Location", "Drop-off Location", "Request Time", "Vehicle ID", "Registration Number", "Model", "Driver ID", "Driver Name", "Driver Contact",].map((header, index) => (
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
          {currentRequests.map((request) => (
            <tr key={request.vehicleRequestId}>
              <td>{request.vehicleRequestId}</td>
              <td>{request.requestType}</td>
              <td>{request.status}</td>
              <td>{request.pickupLocation}</td>
              <td>{request.dropoffLocation}</td>
              <td>{request.requestTime}</td>
              <td>{request.vehicleDTO?.vehicleId || 'N/A'}</td>
              <td>{request.vehicleDTO?.registrationNumber || 'N/A'}</td>
              <td>{request.vehicleDTO?.model || 'N/A'}</td>
              <td>{request.driverDTO?.driverId || 'N/A'}</td>
              <td>{request.driverDTO?.name || 'N/A'}</td>
              <td>{request.driverDTO?.contactNumber || 'N/A'}</td>

            </tr>
          ))}
        </tbody>
      </table>
      {showCreateRequestModal && (
        <CustomModal isOpen={showCreateRequestModal} onClose={closeCreateRequestModal}>
          <CreateRequest onClose={closeCreateRequestModal} onSubmit={handleSubmit} />
        </CustomModal>
      )}
    </div>
  );
};

export default TransportRequest;
