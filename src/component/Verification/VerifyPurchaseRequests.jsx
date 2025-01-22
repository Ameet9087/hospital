import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import './VerifyPurchaseRequests.css';
import VerifyPurchaseDetails from './VerifyPurchaseDetails';
import { API_BASE_URL } from '../api/api';
import CustomModal from '../../CustomModel/CustomModal';

const VerifyPurchaseRequests = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('Pending'); // State for selected status filter
  const [selectedRequest, setSelectedRequest] = useState(null); // State to hold selected purchase request

  useEffect(() => {
    fetch(`${API_BASE_URL}/purchase-requests`)
      .then((response) => response.json())
      .then((data) => {
        setPurchaseRequests(data);
        setFilteredRequests(data.filter(req => req.status.toLowerCase() === 'pending')); // Default filter to pending
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedRequest(null); // Reset selected request when form is closed
  };

  // Filter requests based on selected status
  const handleFilterClick = (status) => {
    setSelectedStatus(status);
    if (status === 'All') {
      setFilteredRequests(purchaseRequests);
    } else {
      setFilteredRequests(
        purchaseRequests.filter(
          (request) => request.status.toLowerCase() === status.toLowerCase()
        )
      );
    }
  };

  // Handle view button click
  const handleViewClick = (request) => {
    setSelectedRequest(request); // Set the selected request
    setShowForm(true); // Show the details form
  };

  return (
    <>
        <div className="verify-purchase-container">
          <div className="verify-purchase-header">
            <div className="verify-purchase-title">
              <label ><input type="checkbox" />
              Check and Verify Purchase Requests</label>
            </div>
            <div className="verify-purchase-filters">
              <button 
                className={selectedStatus === 'Pending' ? 'active' : ''} 
                onClick={() => handleFilterClick('Pending')}
              >
                Pending
              </button>
              <button 
                className={selectedStatus === 'Approved' ? 'active' : ''} 
                onClick={() => handleFilterClick('Approved')}
              >
                Approved
              </button>
              <button 
                className={selectedStatus === 'Rejected' ? 'active' : ''} 
                onClick={() => handleFilterClick('Rejected')}
              >
                Rejected
              </button>
              <button 
                className={selectedStatus === 'All' ? 'active' : ''} 
                onClick={() => handleFilterClick('All')}
              >
                All
              </button>
            </div>
          </div>

          <div className="verify-purchase-date-range">
            <div className="verify-purchase-date-input">
              <span>From:</span>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="verify-purchase-date-input">
              <span>To:</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <button className="ok-button">
              OK
            </button>
          </div>

          <div className="verify-purchase-search">
            <div className="verify-purchase-search-input">
              <input type="text" placeholder="Search" />
            </div>
            <button className="print-button">Print</button>
          </div>

          <table className="verify-purchase-table">
            <thead>
              <tr>
                <th>PR</th>
                <th>Requested On</th>
                <th>Request From</th>
                <th>RequestedBy</th>
                <th>Vendor</th>
                <th>Status</th>
                <th>Verification Status</th>
                <th>PO Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.requestDate}</td>
                  <td>{request.requestFrom}</td>
                  <td>{request.requestedBy}</td>
                  <td>{request.vendor.vendorName}</td>
                  <td>{request.status}</td>
                  <td>{request.status ==="pending"?"0 verified out of 1":"Verified"}</td>
                  <td>
                    <span className="po-status">{request.status === "pending" ? "No":"Yes"}</span>
                  </td>
                  <td>
                    <button
                      className="view-button"
                      onClick={() => handleViewClick(request)} // Pass request object to handleViewClick
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CustomModal isOpen={showForm} onClose={handleCloseForm} >
        <VerifyPurchaseDetails 
          request={selectedRequest} // Pass selected request as prop
          onClose={handleCloseForm}
          handleCloseForm={handleCloseForm} 
        />
        </CustomModal>
      
    </>
  );
};

export default VerifyPurchaseRequests;
