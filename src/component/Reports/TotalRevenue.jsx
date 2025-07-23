import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { API_BASE_URL } from '../api/api';

const TotalRevenueCom = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reportsData, setReportsData] = useState([]);
  const tableRef = useRef(null);

  const API_URL = `${API_BASE_URL}/lab-requests/fetch/paid-lab-revenue`;

  useEffect(() => {
    fetchLabRevenue();
  }, []);

  const fetchLabRevenue = async () => {
    try {
      const response = await axios.get(API_URL);
      setReportsData(response.data);
    } catch (error) {
      console.error('Error fetching lab revenue:', error);
    }
  };

  const handleShowReport = () => {
    setShowReport(true);
    fetchLabRevenue();
  };

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDateRangeSelection = (range) => {
    const today = new Date();
    let startDate = new Date();

    if (range === 'Today') {
      startDate = today;
    } else if (range === 'Last 1 Week') {
      startDate.setDate(today.getDate() - 7);
    } else if (range === 'Last 1 Month') {
      startDate.setMonth(today.getMonth() - 1);
    } else if (range === 'Last 3 Months') {
      startDate.setMonth(today.getMonth() - 3);
    }

    setFromDate(startDate.toISOString().split('T')[0]);
    setToDate(today.toISOString().split('T')[0]);
    setIsPopupOpen(false);
  };

  const filteredReports = reportsData.filter((report) => {
    if (!fromDate || !toDate) return true;
    return report.createdOn >= fromDate && report.createdOn <= toDate;
  });

  const handlePrint = () => {
    const doc = new jsPDF('l', 'mm', 'a4');

    // Add heading
    doc.setFontSize(16);
    doc.text('Lab Revenue Report', doc.internal.pageSize.width / 2, 15, { align: 'center' });

    // Add date range and current date/time
    doc.setFontSize(10);
    doc.text(`From Date: ${fromDate}`, 14, 25);
    doc.text(`To Date: ${toDate}`, 14, 30);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 35);

    // Prepare table data
    const tableData = filteredReports.map(report => [
      report.labTestName,
      report.createdOn,
      `₹${report.labTestPrice?.toFixed(2)}`,
      `₹${report.totalTestPrice?.toFixed(2)}`,
      `₹${report.discount?.toFixed(2)}`,
      `₹${report.totalRevenue?.toFixed(2)}`
    ]);

    // Define table headers
    const headers = [
      "Lab Test Name",
      "Created On",
      "Lab Test Price",
      "Total Test Price",
      "Discount",
      "Total Revenue"
    ];

    // Add table
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 40,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [51, 122, 183],
        textColor: 255,
        fontSize: 9,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // Add total revenue at the bottom
    const lastY = doc.lastAutoTable.finalY;
    const totalRevenueSum = filteredReports.reduce((sum, report) => sum + report.totalRevenue, 0);
    doc.text(`Total Revenue: ₹${totalRevenueSum.toFixed(2)}`, 14, lastY + 10);

    // Open PDF in new tab
    const pdfOutput = doc.output('bloburl');
    window.open(pdfOutput, '_blank');
  };
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredPatients);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Discharged Patients");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Discharged_Patients_Report.xlsx');
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Total Revenue From Lab Report</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <label>To:</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            <button className="user-collection-report-fav-btn" onClick={handlePopupToggle}>-</button>

            {isPopupOpen && (
              <div className="user-collection-popup">
                <ul className="user-collection-popup-list">
                  <li onClick={() => handleDateRangeSelection('Today')}>Today</li>
                  <li onClick={() => handleDateRangeSelection('Last 1 Week')}>Last 1 Week</li>
                  <li onClick={() => handleDateRangeSelection('Last 1 Month')}>Last 1 Month</li>
                  <li onClick={() => handleDateRangeSelection('Last 3 Months')}>Last 3 Months</li>
                </ul>
              </div>
            )}
          </div>
          <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
        </div>
      </div>

      {showReport && (
        <>
          <div className="user-collection-report-controls">
            <div className="user-collection-page-results-info">
              Showing {filteredReports.length}/{reportsData.length} results
            </div>
            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>
          <div className="user-collection-report-tab">
            <table className="patientList-table" ref={tableRef}>
              <thead>
                <tr>
                  {["Date", "Lab Test Name", "Lab Test Price", "Total Test Price", "Total Revenue", "Discount"].map((header, index) => (
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
                {filteredReports.map((row, index) => (
                  <tr key={index}>
                    <td>{row.createdOn}</td>
                    <td>{row.labTestName}</td>
                    <td>{row.labTestPrice.toFixed(2)}</td>
                    <td>{row.totalTestPrice.toFixed(2)}</td>
                    <td>{row.totalRevenue.toFixed(2)}</td>
                    <td>{row.discount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="user-collection-report-page-no">
              <Button className="user-collection-report-pagination-btn">First</Button>
              <Button className="user-collection-report-pagination-btn">Previous</Button>
              <span>Page 1 of 4</span>
              <Button className="user-collection-report-pagination-btn">Next</Button>
              <Button className="user-collection-report-pagination-btn">Last</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TotalRevenueCom;
