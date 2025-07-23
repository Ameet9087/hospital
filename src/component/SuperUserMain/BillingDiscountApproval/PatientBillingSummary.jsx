/* Mohini_PatientBillingSummaryForm_WholePage_27/sep/24 */
import React, { useState, useRef } from 'react';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import './DiscountApprovalReviewForm.css';
const PatientBillingSummary = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [activeRequestId, setActiveRequestId] = useState(null);

  const requests = [
    {
      patientId: '',
      patientName: '',
      invoiceNumber: '',
      totalAmount: '',
      totalApprovedDiscounts: '',
      finalAmountDue: '',
      paymentStatus: '',
      paymentMethod: '',
      insuranceProvider: '',
      insurancePolicyNumber: '',
      dateOfService: '',
      notes: '',
    },
    // Add more request objects as needed
  ];

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setActiveRequestId(request.patientId);
  };

  return (
    <div className="discount-approval-form-module">
      <h1 className="discount-approval-form__heading">Patient Billing Summary</h1>
      <div className="discount-approval-form__buttons">
        {requests.map((request) => (
          <button
            key={request.patientId}
            className={`discount-approval-form__button ${activeRequestId === request.patientId ? 'active' : ''}`}
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
                    'Patient ID',
                    'Patient Name',
                    'Invoice Number',
                    'Total Amount',
                    'Total Approved Discounts',
                    'Final Amount Due',
                    'Payment Status',
                    'Payment Method',
                    'Insurance Provider',
                    'Insurance Policy Number',
                    'Date of Service',
                    'Notes',
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
                  <td>{selectedRequest.patientId}</td>
                  <td>{selectedRequest.patientName}</td>
                  <td>{selectedRequest.invoiceNumber}</td>
                  <td>{selectedRequest.totalAmount}</td>
                  <td>{selectedRequest.totalApprovedDiscounts}</td>
                  <td>{selectedRequest.finalAmountDue}</td>
                  <td>{selectedRequest.paymentStatus}</td>
                  <td>{selectedRequest.paymentMethod}</td>
                  <td>{selectedRequest.insuranceProvider}</td>
                  <td>{selectedRequest.insurancePolicyNumber}</td>
                  <td>{selectedRequest.dateOfService}</td>
                  <td>{selectedRequest.notes}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientBillingSummary;
/* Mohini_PatientBillingSummaryForm_WholePage_27/sep/24 */
