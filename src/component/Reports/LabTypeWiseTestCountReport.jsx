import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { API_BASE_URL } from '../api/api';

const LabTypeWiseTestCountReport = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showReport, setShowReport] = useState(true);
  const [columnWidths, setColumnWidths] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const tableRef = useRef(null);

  const [reportsData, setReportsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/lab-requests/fetch/lab-total-test-count-report`);
        setReportsData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching lab test count data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchQuery, fromDate, toDate]);

  const filterData = () => {
    let filtered = reportsData;

    if (fromDate && toDate) {
      filtered = filtered.filter((item) => {
        return item.createdOn >= fromDate && item.createdOn <= toDate;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((val) => val.toString().toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredData(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);  // Use filteredData instead of undefined filteredPatients
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Lab Test Report");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'LabTestReport.xlsx');
  };



  const handlePrint = () => {
    const doc = new jsPDF('l', 'mm', 'a4');

    doc.setFontSize(16);
    doc.text('Lab Revenue Report', doc.internal.pageSize.width / 2, 15, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`From Date: ${fromDate}`, 14, 25);
    doc.text(`To Date: ${toDate}`, 14, 30);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 35);

    if (filteredData.length === 0) {
      doc.text('No records available.', 14, 45);
    } else {
      const headers = [
        "Lab Test Name",
        "Created On",
        "In Patient Count",
        "Out Patient Count",
      ];

      const tableData = filteredData.map(report => [
        report.labTestName || 'N/A',
        report.createdOn || 'N/A',
        `₹${report.inPatientCount || '0'}`,
        `₹${report.outPatientCount || '0'}`,
      ]);

      // Generate the table and get the final Y position
      const { lastAutoTable } = doc.autoTable({
        head: [headers],
        body: tableData,
        startY: 45,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [51, 122, 183], textColor: 255, fontSize: 9, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });

      // Get the last Y position of the table
      const lastY = lastAutoTable.finalY;

      // Calculate totals
      const totalInpatient = filteredData.reduce((sum, row) => sum + row.inPatientCount, 0);
      const totalOutPatient = filteredData.reduce((sum, row) => sum + row.outPatientCount, 0);
      const grandTotal = totalInpatient + totalOutPatient;

      doc.setFontSize(10);
      doc.text(`Total In-Patient Count: ${totalInpatient}`, 14, lastY + 10);
      doc.text(`Total Out-Patient Count: ${totalOutPatient}`, 14, lastY + 15);
      doc.text(`Grand Total: ${grandTotal}`, 14, lastY + 20);
    }

    window.open(doc.output('bloburl'), '_blank');
  };


  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ LabTypeWise Total Test Count Report</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <label>To:</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            <button className="user-collection-report-fav-btn" onClick={() => setIsPopupOpen(!isPopupOpen)}>▼</button>

            {isPopupOpen && (
              <div className="user-collection-popup">
                <ul className="user-collection-popup-list">
                  <li onClick={() => { setFromDate('2024-02-01'); setToDate('2024-02-21'); setIsPopupOpen(false); }}>Last 1 Month</li>
                  <li onClick={() => { setFromDate('2023-11-01'); setToDate('2024-02-21'); setIsPopupOpen(false); }}>Last 3 Months</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="order-status-filter">
          <button className="user-collection-report-show-btn" onClick={() => setShowReport(true)}>Show Report</button>
        </div>
      </div>

      {showReport && (
        <>
          <div className="user-collection-report-controls">
            <input type="text" className="user-collection-report-search" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
            <div className="user-collection-page-results-info">
              Showing {filteredData.length}/{reportsData.length} results
            </div>
            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>
          <div className="user-collection-report-tab">
            <table className="patientList-table" ref={tableRef}>
              <thead>
                <tr>
                  {['Date', 'Lab Test Name', 'In-Patient Count', 'Out-Patient Count'].map((header, index) => (
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
                {filteredData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.createdOn}</td>
                    <td>{row.labTestName}</td>
                    <td>{row.inPatientCount}</td>
                    <td>{row.outPatientCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className='net-cash-collection-header'>
        <h4 className="user-collection-report-net-collection">Summary</h4>
        <div className="user-collection-report-summary">
          <table className="user-collection-report-summary-table">
            <tbody>
              <tr><td>Total In-Patient Count:</td><td>{filteredData.reduce((sum, row) => sum + row.inPatientCount, 0)}</td></tr>
              <tr><td>Total Out-Patient Count:</td><td>{filteredData.reduce((sum, row) => sum + row.outPatientCount, 0)}</td></tr>
              <tr><td>Grand Total:</td><td>{filteredData.reduce((sum, row) => sum + row.inPatientCount + row.outPatientCount, 0)}</td></tr>
            </tbody>
          </table>


        </div>
      </div>
    </div>
  );
};

export default LabTypeWiseTestCountReport;
