import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import './UserCollectionReport.css';
import { API_BASE_URL } from '../api/api';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';

const PaymentModewiseReport = () => {
  const [showReport, setShowReport] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchText, setSearchText] = useState('');
  const [reportsData, setReportsData] = useState([]);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState({});

  useEffect(() => {
    if (showReport) {
      fetchReportsData();
    }
  }, [showReport, fromDate, toDate]);

  const fetchReportsData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ip-admissions/fetch/payment-mode-report`, {
        params: {
          fromDate,
          toDate,
        },
      });
      if (response.data) {
        setReportsData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };



  const handlePrint = () => {
    const doc = new jsPDF("l", "mm", "a4");

    // Title
    doc.setFontSize(16);
    doc.text("Payment Mode Wise Report", doc.internal.pageSize.width / 2, 15, { align: "center" });

    // Current date/time
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 25);

    // Prepare table data
    const tableData = filteredReportsData.map((row) => [
      row.billingDate || "N/A",
      row.modeName || "N/A",
      row.cardNumber || "N/A",
      row.ipAdmissionId || "N/A",
      row.cardNumber || "N/A",
      `${row.firstName} ${row.lastName}` || "N/A",
      row.amount || "N/A",
      row.billingUser || "N/A",
      row.chequeDate || "N/A",
    ]);

    // Table headers
    const headers = [
      "Date",
      "Type",
      "Payment Mode",
      "Receipt No",
      "Hospital No",
      "Patient Name",
      "Net Total",
      "User",

    ];

    // Add table
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 30,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [51, 122, 183],
        textColor: 255,
        fontSize: 9,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // Summary at the bottom
    const lastY = doc.lastAutoTable.finalY + 10;
    const netCashCollection = filteredReportsData.reduce((acc, row) => acc + parseFloat(row.amount || 0), 0).toFixed(2);
    doc.text(`Net Cash Collection: ${netCashCollection}`, 14, lastY);

    // Save or Print
    doc.save("Payment_Mode_Wise_Report.pdf");
  };


  const handleExport = () => {
    console.log('Export function not yet implemented');
    // Implement your export logic here
  };

  const handleShowReport = () => {
    setShowReport(true);
  };

  const handleDateRangeSelection = () => {
    let filteredReports = reportsData;
    if (fromDate) {
      filteredReports = filteredReports.filter((row) => new Date(row.billingDate) >= new Date(fromDate));
    }
    if (toDate) {
      filteredReports = filteredReports.filter((row) => new Date(row.billingDate) <= new Date(toDate));
    }
    return filteredReports;
  };

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  const filteredReportsData = handleDateRangeSelection().filter((row) => {
    return (
      row.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      row.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      row.cardNumber.toLowerCase().includes(searchText.toLowerCase())
    );
  });




  // Calculate the net cash collection
  const calculateNetCashCollection = () => {
    return filteredReportsData.reduce((total, row) => total + parseFloat(row.amount || 0), 0).toFixed(2);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title"> ⚛ PaymentMode Wise Report</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <label>To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
        </div>
      </div>

      {showReport && (
        <>
          <div className="user-collection-report-controls">
            <input
              type="text"
              className="user-collection-report-search"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
            />

            <div className="user-collection-page-results-info">
              Showing {filteredReportsData.length}/{reportsData.length} results
            </div>

            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>

          <div className="user-collection-report-tab">
            <table ref={tableRef} className="user-collection-report-table">
              <thead>
                <tr>
                  {[
                    "Date", "Payment Mode Name", "Payment Mode", "Card Details",
                    "Patient Name", "Net Total", "User", "Counter"
                  ].map((header, index) => (
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
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredReportsData.length > 0 ? (
                  filteredReportsData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.billingDate}</td>
                      <td>{row.modeName}</td>
                      <td>{row.cardNumber}</td>
                      <td>{row.cardNumber}</td>
                      <td>{`${row.firstName} ${row.lastName}`}</td>
                      <td>{row.amount}</td>
                      <td>{row.billingUser}</td>
                      <td>{row.chequeDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No records found</td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>

          <div className="net-cash-collection-header">
            <h4 className="user-collection-report-net-collection">
              Net Cash Collection: {calculateNetCashCollection()}
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentModewiseReport;
