import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../api/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ItemWiseLab = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [columnWidths, setColumnWidths] = useState({});
  const [reportsData, setReportsData] = useState([]);
  const tableRef = useRef(null);

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredPatients);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Discharged Patients");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Discharged_Patients_Report.xlsx');
  };


  const handlePrint = () => {
    const doc = new jsPDF('l', 'mm', 'a4');

    doc.setFontSize(16);
    doc.text('Lab Revenue Report', doc.internal.pageSize.width / 2, 15, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`From Date: ${fromDate}`, 14, 25);
    doc.text(`To Date: ${toDate}`, 14, 30);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 35);

    if (filteredData.length === 0) { // Changed from filteredReports to filteredData
      doc.text('No records available.', 14, 45);
    } else {
      const headers = [
        "Lab Test Name",
        "Created On",
        "Lab Test Price (₹)",
        "Total Test Price (₹)",
        "Discount (₹)",
        "Total Revenue (₹)"
      ];

      const tableData = filteredData.map(report => [ // Changed from filteredReports to filteredData
        report.labTestName || 'N/A',
        report.createdOn || 'N/A',
        `₹${report.labTestPrice?.toFixed(2) || '0.00'}`,
        `₹${report.totalTestPrice?.toFixed(2) || '0.00'}`,
        `₹${report.discount?.toFixed(2) || '0.00'}`,
        `₹${report.totalRevenue?.toFixed(2) || '0.00'}`
      ]);

      doc.autoTable({
        head: [headers],
        body: tableData,
        startY: 45,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [51, 122, 183], textColor: 255, fontSize: 9, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });

      const lastY = doc.lastAutoTable.finalY || 50;
      const totalRevenueSum = filteredData.reduce((sum, report) => sum + (report.totalRevenue || 0), 0);

      doc.setFontSize(10);
      doc.text(`Total Revenue: ₹${totalRevenueSum.toFixed(2)}`, 14, lastY + 10);
    }

    window.open(doc.output('bloburl'), '_blank');
  };



  // Fetch data from API
  const fetchLabTestReports = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lab-requests/fetch/lab-test-report`);
      setReportsData(response.data);
    } catch (error) {
      console.error('Error fetching lab test reports:', error);
    }
  };

  useEffect(() => {
    fetchLabTestReports();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDateChange = (e, type) => {
    if (type === 'from') setFromDate(e.target.value);
    if (type === 'to') setToDate(e.target.value);
  };

  const filteredData = reportsData.filter((row) => {
    const testNameMatch = row.labTestName.toLowerCase().includes(searchTerm.toLowerCase());

    const createdOnDate = new Date(row.createdOn);
    const fromDateFilter = fromDate ? new Date(fromDate) <= createdOnDate : true;
    const toDateFilter = toDate ? new Date(toDate) >= createdOnDate : true;

    return testNameMatch && fromDateFilter && toDateFilter;
  });

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Total Item Wise Lab Report</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input type="date" value={fromDate} onChange={(e) => handleDateChange(e, 'from')} />
            <label>To:</label>
            <input type="date" value={toDate} onChange={(e) => handleDateChange(e, 'to')} />
            <button className="user-collection-report-show-btn" onClick={() => setShowReport(true)}>Show Report</button>
          </div>
        </div>
      </div>

      {showReport && (
        <>
          <div className="user-collection-report-controls">
            <input
              type="text"
              className="user-collection-report-search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="user-collection-page-results-info">
              Showing {filteredData.length}/{reportsData.length} results
            </div>
            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>
          <div className='user-collection-report-tab'>
            <table className="patientList-table" ref={tableRef}>
              <thead>
                <tr>
                  {["Created On", "Service Department", "Test Name", "Unit", "Total Amount"].map((header, index) => (
                    <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
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
                {filteredData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.createdOn}</td>
                    <td>{row.labTestCategoryName}</td>
                    <td>{row.labTestName}</td>
                    <td>{row.unit}</td>
                    <td>{row.totalAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemWiseLab;
