import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../api/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const TestStatusDetailsReport = () => {
  const [showReport, setShowReport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [labRequests, setLabRequests] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const handlePrint = () => {
    const doc = new jsPDF('l', 'mm', 'a4');

    doc.setFontSize(16);
    doc.text('Lab Revenue Report', doc.internal.pageSize.width / 2, 15, { align: 'center' });

    if (!filteredData.length) {
      doc.setFontSize(10);
      doc.text('No records available.', 14, 25);
    } else {
      const headers = [
        "Doctor Name",
        "Patient Name",
        "Received By",
        "Age",
        "Sex",
        "Created On",
        "Lab Test Name",
        "Run Number Type",
        "Billing Status",
        "Sample Status"
      ];

      const tableData = filteredData.map(row => [
        row.doctorName || 'N/A',
        row.patientName || 'N/A',
        row.receivedBy || 'N/A',
        row.age || 'N/A',
        row.sex || 'N/A',
        row.createdOn || 'N/A',
        row.labTestName || 'N/A',
        row.runNumberType || 'N/A',
        row.billingStatus || 'N/A',
        row.sampleStatus || 'N/A'
      ]);

      doc.autoTable({
        head: [headers],
        body: tableData,
        startY: 25,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [51, 122, 183], textColor: 255, fontSize: 9, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });
    }

    window.open(doc.output('bloburl'), '_blank');
  };




  useEffect(() => {
    if (showReport) {
      fetchLabRequests();
    }
  }, [showReport]);

  const fetchLabRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/lab-requests/fetch/patient-wise-lab`);
      setLabRequests(response.data); // Assuming response.data is an array
    } catch (err) {
      setError('Failed to fetch lab requests. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleDateChange = (e) => {
    setDateFilter({ ...dateFilter, [e.target.name]: e.target.value });
  };

  const filteredData = labRequests.filter((row) => {
    const requestedDate = row.createdOn; // Date from API response
    const fromDate = dateFilter.from || '1900-01-01';
    const toDate = dateFilter.to || '2100-12-31';
    const isWithinDateRange = requestedDate >= fromDate && requestedDate <= toDate;

    const isMatchingSearch =
      searchQuery === '' ||
      Object.values(row).some((value) => String(value).toLowerCase().includes(searchQuery));

    return isWithinDateRange && isMatchingSearch;
  });

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
        <h3 className="user-collection-report-title">⚛ Patient Wise Lab Test Status</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input type="date" name="from" onChange={handleDateChange} />
            <label>To:</label>
            <input type="date" name="to" onChange={handleDateChange} />
          </div>
          <button className="user-collection-report-show-btn" onClick={() => setShowReport(true)}>
            Show Report
          </button>
        </div>
      </div>

      {showReport && (
        <>
          <div className="user-collection-report-controls">
            <input
              type="text"
              className="user-collection-report-search"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="user-collection-page-results-info">
              Showing {filteredData.length}/{labRequests.length} results
            </div>
            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>

          {isLoading ? (
            <p>Loading data...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <div className="user-collection-report-tab">
              <table className="patientList-table" ref={tableRef}>
                <thead>
                  <tr>
                    {[
                      'Doctor Name',
                      'Patient Name',
                      'Received By',
                      'Age',
                      'Sex',
                      'Created On',
                      'Lab Test Name',
                      'Run No Type',
                      'Billing Status',
                      'Sample Status',
                    ].map((header, index) => (
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
                  {filteredData.length > 0 ? (
                    filteredData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.doctorName}</td>
                        <td>{row.patientName}</td>
                        <td>{row.receivedBy}</td>
                        <td>{row.age}</td>
                        <td>{row.sex}</td>
                        <td>{row.createdOn}</td>
                        <td>{row.labTestName}</td>
                        <td>{row.runNumberType}</td>
                        <td>{row.billingStatus}</td>
                        <td>{row.sampleStatus}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" style={{ textAlign: 'center', padding: '10px' }}>
                        No matching records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TestStatusDetailsReport;
