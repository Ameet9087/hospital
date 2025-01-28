/* Kshitija_Purvat_TransportRequest_24_09_starting_line_2 */


import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import './TransportRequest.css';
import CreateRequestModal from './CreateRequest';  // Modal component

const TransportRequest = () => {
  const [showCreateRequestModal, setShowCreateRequestModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(10);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/transportrequest/getall');
        setRequests(response.data); // Assuming the response data is an array of requests
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleSubmit = async (requestData) => {
    try {
      const response = await axios.post('http://localhost:8081/api/transportrequest/add', requestData);
      console.log('Request created:', response.data);

      // Update the list of requests after successful creation
      setRequests([...requests, response.data]);

    } catch (error) {
      console.error("Error creating request:", error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/transportrequest/delete/${id}`);
      // Update the requests state by filtering out the deleted request
      setRequests(requests.filter(request => request.request_id !== id));
      console.log(`Request with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  // Calculate displayed requests for pagination
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Next page
  const nextPage = () => {
    if (currentPage < Math.ceil(requests.length / requestsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openCreateRequestModal = () => setShowCreateRequestModal(true);
  const closeCreateRequestModal = () => setShowCreateRequestModal(false);

  return (
    <div className="dashboard-container">
      <header>
        <span className="dashboard-heading-text">Transport Request System</span>
        <button
          className="new-request-button"
          onClick={openCreateRequestModal}
        >
          Create New Request
        </button>
      </header>

      <div className="search-filter-section">
        <input
          type="text"
          placeholder="Search by Patient Name/ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </div>

      <table className="requests-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Patient /ID</th>
            <th>Transport Type</th>
            <th>Pickup Location</th>
            <th>Drop-off Location</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Requested By</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((request) => (
            <tr key={request.request_id}>
              <td>{request.request_id}</td>
              <td>{request.patient_id}</td>
              <td>{request.transportType}</td>
              <td>{request.pickupLocation}</td>
              <td>{request.dropLocation}</td>
              <td>{request.priority}</td>
              <td>{request.status}</td>
              <td>{request.requestedby}</td>
              <td>{request.assignedto}</td>
              <td>
                <button onClick={() => handleDelete(request.request_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalPages={Math.ceil(requests.length / requestsPerPage)}
        paginate={paginate}
        nextPage={nextPage}
        prevPage={prevPage}
        currentPage={currentPage}
      />

      {showCreateRequestModal && (
        <CreateRequestModal onClose={closeCreateRequestModal} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

const Pagination = ({ totalPages, paginate, nextPage, prevPage, currentPage }) => {
  return (
    <div className="pagination">
      <button
        onClick={prevPage}
        className="page-link"
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span className="page-numbers">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={nextPage}
        className="page-link"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default TransportRequest;


/* Kshitija_Purvat_TransportRequest_24_09_starting_line_2 */
