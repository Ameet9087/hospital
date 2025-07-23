/* Mohini_DiscountHistoryFormCom_WholePage_27/sep/24 */
import React, { useState, useRef } from 'react';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import './DiscountApprovalReviewForm.css';
const DiscountHistory= () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [activeRequestId, setActiveRequestId] = useState(null);

  const requests = [
    {
      requestId: '',
      patientId: '',
      patientName: '',
      invoiceNumber: '',
      requestedDiscountAmount: '',
      approvedDiscountAmount: '',
      approvalStatus: '',
      requestDate: '',
      approvalDate: '',
      reviewedBy: '',
      toyalPayAmount: '',
      // Removed fields like 'discountType', 'originalInvoiceAmount', 'finalInvoiceAmount', and 'notes'
      // Add more request objects as needed
    },
  ];

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setActiveRequestId(request.requestId);
  };

  return (
    <div className="discount-approval-form-module">
      <h1 className="discount-approval-form__heading">Discount History Form</h1>
      <div className="discount-approval-form__buttons">
        {requests.map((request) => (
          <button
            key={request.requestId}
            className={`discount-approval-form__button ${activeRequestId === request.requestId ? 'active' : ''}`}
            onClick={() => handleRequestClick(request)}
          >
            View {request.patientName}
          </button>
        ))}
      </div>

      {selectedRequest && (
        <div className="discount-approval-form__details">
          <div className="discount-approval-form__table-container">
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    'Request ID',
                    'Patient ID',
                    'Patient Name',
                    'Invoice Number',
                    'Requested Discount Amount',
                    'Approved Discount Amount',
                    'Approval Status',
                    'Request Date',
                    'Approval Date',
                    'Reviewed By',
                    'Total Pay Amount',
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
                <tr>
                  <td>{selectedRequest.requestId}</td>
                  <td>{selectedRequest.patientId}</td>
                  <td>{selectedRequest.patientName}</td>
                  <td>{selectedRequest.invoiceNumber}</td>
                  <td>{selectedRequest.requestedDiscountAmount}</td>
                  <td>{selectedRequest.approvedDiscountAmount}</td>
                  <td>{selectedRequest.approvalStatus}</td>
                  <td>{selectedRequest.requestDate}</td>
                  <td>{selectedRequest.approvalDate}</td>
                  <td>{selectedRequest.reviewedBy}</td>
                  <td>{selectedRequest.toyalPayAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountHistory;
/* Mohini_DiscountHistoryFormCom_WholePage_27/sep/24 */
