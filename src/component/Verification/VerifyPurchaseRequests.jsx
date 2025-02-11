import React, { useEffect, useState, useRef } from 'react';
import { Search } from 'lucide-react';
import './VerifyPurchaseRequests.css';
import VerifyPurchaseDetails from './VerifyPurchaseDetails';
import { API_BASE_URL } from '../api/api';
import CustomModal from '../../CustomModel/CustomModal';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';

const VerifyPurchaseRequests = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Fetch Purchase Requests
  useEffect(() => {
    fetch(`${API_BASE_URL}/purchase-requests`)
      .then((response) => response.json())
      .then((data) => {
        setPurchaseRequests(data);
        setFilteredRequests(data.filter(req => req.status.toLowerCase() === 'pending'));
      })
      .catch((err) => console.error(err));
  }, []);

  // Close Modal
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedRequest(null);
  };

  // Filter Purchase Requests
  const handleFilterClick = (status) => {
    setSelectedStatus(status);
    if (status === 'All') {
      setFilteredRequests(purchaseRequests);
    } else {
      setFilteredRequests(
        purchaseRequests.filter((request) => request.status.toLowerCase() === status.toLowerCase())
      );
    }
  };

  // View Purchase Request Details
  const handleViewClick = (request) => {
    setSelectedRequest(request);
    setShowForm(true);
  };

  // Print Table
  const handlePrint = () => {
    if (!tableRef.current) return;
    const printContent = tableRef.current.outerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  // Export to Excel
  const handleExport = () => {
    if (!tableRef.current) return;
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport');
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx');
  };

  return (
    <>
      <div className="verify-purchase-container">
        <div className="verify-purchase-header">
          <div className="verify-purchase-title">
            <label>
              <input type="checkbox" />
              Check and Verify Purchase Requests
            </label>
          </div>
          <div className="verify-purchase-filters">
            {["Pending", "Approved", "Rejected", "All"].map((status) => (
              <button
                key={status}
                className={selectedStatus === status ? 'active' : ''}
                onClick={() => handleFilterClick(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="verify-purchase-date-range">
          <div className="verify-purchase-date-input">
            <span>From:</span>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div className="verify-purchase-date-input">
            <span>To:</span>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
        </div>

        <div className="verify-purchase-search">
          <div className="verify-purchase-search-input">
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className="verify-purchase-actions-span">
          <span>
            Showing {filteredRequests.length} / {purchaseRequests.length} results
          </span>
          <button className="verify-purchase-export-button" onClick={handleExport}>Export</button>
          <button className="print-button" onClick={handlePrint}>Print</button>
        </div>

        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "PR",
                "Requested On",
                "Request From",
                "Requested By",
                "Vendor",
                "Status",
                "Verification Status",
                "PO Created",
                "Action"
              ].map((header, index) => (
                <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={() => startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.requestDate}</td>
                <td>{request.requestFrom}</td>
                <td>{request.requestedBy}</td>
                <td>{request.vendor?.vendorName || "N/A"}</td>
                <td>{request.status}</td>
                <td>{request.status.toLowerCase() === "pending" ? "0 verified out of 1" : "Verified"}</td>
                <td>
                  <span className="po-status">
                    {request.status.toLowerCase() === "pending" ? "No" : "Yes"}
                  </span>
                </td>
                <td>
                  <button className="view-button" onClick={() => handleViewClick(request)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={showForm} onClose={handleCloseForm}>
        <VerifyPurchaseDetails request={selectedRequest} onClose={handleCloseForm} />
      </CustomModal>
    </>
  );
};

export default VerifyPurchaseRequests;
