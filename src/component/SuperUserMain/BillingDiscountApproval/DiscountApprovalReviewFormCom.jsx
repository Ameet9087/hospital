/* Mohini_DiscountApprovalReviewForm_WholePage_27/sep/24 */
import React, { useState, useRef } from 'react';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import './DiscountApprovalReviewForm.css';

const DiscountApprovalReviewFormCom = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [approvedDiscountAmount, setApprovedDiscountAmount] = useState(''); 
  const [reasonForDenial, setReasonForDenial] = useState(''); 

  const requests = [
    {
      requestId: '',
      patientId: '',
      patientName: '',
      invoiceNumber: '',
      requestedDiscountAmount: '',
      approvalStatus: '',
      approvedDiscountAmount: '',
      approvalDate: '',
      reviewedBy: '',
      comments: '',
      reasonForDenial: '',
    },
  ];

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setActiveRequestId(request.requestId);
    setApprovedDiscountAmount(''); 
    setReasonForDenial(''); 
  };

  const handleApprove = () => {
    if (selectedRequest) {
      const updatedRequest = {
        ...selectedRequest,
        approvalStatus: 'Approved',
        approvedDiscountAmount: approvedDiscountAmount || selectedRequest.requestedDiscountAmount, 
        approvalDate: new Date().toLocaleDateString(),
      };
      setSelectedRequest(updatedRequest);
      setApprovedDiscountAmount(''); 
    }
  };

  const handleDeny = () => {
    if (selectedRequest) {
      const updatedRequest = {
        ...selectedRequest,
        approvalStatus: 'Denied',
        reasonForDenial: reasonForDenial || 'No reason provided', 
      };
      setSelectedRequest(updatedRequest);
      setReasonForDenial(''); 
    }
  };

  const handleStatusChange = (e) => {
    if (selectedRequest) {
      const newStatus = e.target.value;
      const updatedRequest = { ...selectedRequest, approvalStatus: newStatus };

      if (newStatus === 'Approved') {
        updatedRequest.approvalDate = new Date().toLocaleDateString();
        updatedRequest.approvedDiscountAmount = approvedDiscountAmount || selectedRequest.requestedDiscountAmount;
      } else if (newStatus === 'Denied') {
        updatedRequest.reasonForDenial = reasonForDenial || 'No reason provided';
      }

      setSelectedRequest(updatedRequest);
    }
  };

  const handleReasonForDenialChange = (e) => {
    setReasonForDenial(e.target.value);
  };

  return (
    <div className="discount-approval-form-module">
      <h1 className="discount-approval-form__heading">Discount Approval Requests</h1>
      <div className="discount-approval-form__buttons">
        {requests.map((request) => (
          <button
            key={request.requestId}
            className={`discount-approval-form__button ${activeRequestId === request.requestId ? 'active' : ''}`}
            onClick={() => handleRequestClick(request)}
          >
            View
            {request.patientName}
          </button>
        ))}
      </div>

      {selectedRequest && (
        <div className='discount-approval-form__details'>
          <div className="discount-approval-form__table-container">
            <table ref={tableRef}>
              <thead>
                <tr>
                  {["Request ID", "Patient ID", "Patient Name", "Invoice Number", "Requested Discount Amount", "Reviewed By", "Comments", "Approval Status", "Approved Amount", "Approval Date", "Reason for Denial", "Action"].map((header, index) => (
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
                <tr>
                  <td>{selectedRequest.requestId}</td>
                  <td>{selectedRequest.patientId}</td>
                  <td>{selectedRequest.patientName}</td>
                  <td>{selectedRequest.invoiceNumber}</td>
                  <td>{selectedRequest.requestedDiscountAmount}</td>
                  <td>{selectedRequest.reviewedBy}</td>
                  <td>{selectedRequest.comments}</td>
                  <td>{selectedRequest.approvalStatus}</td>
                  <td>
                    {selectedRequest.approvalStatus === 'Approved' ? (
                      selectedRequest.approvedDiscountAmount
                    ) : (
                      <input
                        type="text"
                        value={approvedDiscountAmount}
                        onChange={(e) => setApprovedDiscountAmount(e.target.value)}
                        placeholder="Enter approved amount"
                        className='discount-approve-review-input'
                      />
                    )}
                  </td>
                  <td>{selectedRequest.approvalStatus === 'Approved' ? selectedRequest.approvalDate : '-'}</td>
                  <td>
                    {selectedRequest.approvalStatus === 'Denied' ? (
                      selectedRequest.reasonForDenial
                    ) : (
                      <input
                        type="text"
                        value={reasonForDenial}
                        onChange={handleReasonForDenialChange}
                        placeholder="Enter reason for denial"
                        className='discount-approve-review-input'
                      />
                    )}
                  </td>
                  <td>
                    <select
                      value={selectedRequest.approvalStatus}
                      onChange={handleStatusChange}
                      className="discount-approve-status-dropdown"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approve</option>
                      <option value="Denied">Deny</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountApprovalReviewFormCom;
/* Mohini_DiscountApprovalReviewForm_WholePage_27/sep/24 */
