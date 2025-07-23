import React, { useState, useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import './UserCollectionReport.css';
import { API_BASE_URL } from '../api/api';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';

const PhoneBookAppointmentReport = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  const [appointmentSourceTypes] = useState(['app', 'call', 'web']);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedSourceType, setSelectedSourceType] = useState("");
  const [loading, setLoading] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const fetchAppointmentData = async (sourceType) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/searchBySourceType?appointmentSourceType=${sourceType}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setAppointmentData(data);
      }
    } catch (error) {
      console.error('Error fetching appointment data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedSourceType) {
      fetchAppointmentData(selectedSourceType);
    }
  }, [selectedSourceType]);

  const handleDateRangeSelection = (range) => {
    const today = new Date();
    const dateRanges = {
      'Today': [today, today],
      'Last 1 Week': [new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), today],
      'Last 1 Month': [new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()), today],
      'Last 3 Months': [new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()), today]
    };

    const [fromDate, toDate] = dateRanges[range] || [null, null];
    if (fromDate && toDate) {
      setFromDate(fromDate.toISOString().split('T')[0]);
      setToDate(toDate.toISOString().split('T')[0]);
    }
    setIsPopupOpen(false);
  };

  const filteredData = appointmentData.filter(report => {
    const appointmentDate = new Date(report.appointmentDate);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    return (
      report.patient?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!from || appointmentDate >= from) &&
      (!to || appointmentDate <= to)
    );
  });

  const handleExportToExcel = () => {
    const exportData = filteredData.map(report => ({
      'OutPatient ID': report.outPatientId,
      'Patient Name': report.patient?.firstName,
      'Status': report.status,
      'Age': report.patient?.age,
      'Date of Birth': report.patient?.dateOfBirth,
      'Gender': report.patient?.gender,
      'Doctor Name': report.addDoctor?.doctorName,
      'Appointment Date': report.appointmentDate,
      'Appointment Time': report.appointmentTime,
      'Source Type': report.appointmentSourceType
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");

    worksheet['!cols'] = [
      { wch: 12 }, // OutPatient ID
      { wch: 20 }, // Patient Name
      { wch: 10 }, // Status
      { wch: 8 },  // Age
      { wch: 12 }, // Date of Birth
      { wch: 10 }, // Gender
      { wch: 20 }, // Doctor Name
      { wch: 15 }, // Appointment Date
      { wch: 15 }, // Appointment Time
      { wch: 12 }  // Source Type
    ];

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'PhoneBookAppointmentReport.xlsx');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const tableHtml = tableRef.current.outerHTML;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Phone Book Appointment Report</title>
          <style>
            table { 
              border-collapse: collapse; 
              width: 100%; 
              margin: 20px 0;
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 8px; 
              text-align: left; 
            }
            th { 
              background-color: #f4f4f4; 
            }
            @media print {
              table { page-break-inside: auto; }
              tr { page-break-inside: avoid; page-break-after: auto; }
              thead { display: table-header-group; }
            }
          </style>
        </head>
        <body>
          <h2>Phone Book Appointment Report</h2>
          ${tableHtml}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Phone Book Appointment Report</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <label>To:</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            {/* <button className="user-collection-report-fav-btn">☆</button>
            <button className="user-collection-report-fav-btn" onClick={() => setIsPopupOpen(!isPopupOpen)}>-</button>
            {isPopupOpen && (
              <div className="user-collection-popup">
                <ul className="user-collection-popup-list">
                  {['Today', 'Last 1 Week', 'Last 1 Month', 'Last 3 Months'].map(range => (
                    <li key={range} onClick={() => handleDateRangeSelection(range)}>{range}</li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>
        </div>
        <div className="user-collection-report-doctor-filter">
          <label>Appointment Status:</label>
          <select value={selectedSourceType} onChange={(e) => setSelectedSourceType(e.target.value)}>
            <option value="">Appointment Source</option>
            {appointmentSourceTypes.map((sourceType, index) => (
              <option key={index} value={sourceType}>{sourceType}</option>
            ))}
          </select>
          <button className="user-collection-report-show-btn" onClick={() => setShowReport(true)}>Show Report</button>
        </div>
      </div>
      {showReport && (
        <div className="user-collection-report-table">
          <div className="user-collection-report-table-header">
            <input
              type="text"
              placeholder="Search..."
              className="user-collection-report-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="user-collection-report-actions">
              <button className="user-collection-report-export-btn" onClick={handleExportToExcel}>Export</button>
              <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            </div>
          </div>

          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "outPatientId", "firstName", "status", "age", "dateOfBirth",
                  "gender", "doctorName", "appointmentDate", "appointmentTime",
                  "appointmentSourceType"
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
              {loading ? (
                <tr><td colSpan="10">Loading...</td></tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((report, index) => (
                  <tr key={report.outPatientId || index}>
                    <td>{report.outPatientId}</td>
                    <td>{report.patient?.firstName}</td>
                    <td>{report.status}</td>
                    <td>{report.patient?.age}</td>
                    <td>{report.patient?.dateOfBirth}</td>
                    <td>{report.patient?.gender}</td>
                    <td>{report.addDoctor?.doctorName}</td>
                    <td>{report.appointmentDate}</td>
                    <td>{report.appointmentTime}</td>
                    <td>{report.appointmentSourceType}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="10">No data available</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PhoneBookAppointmentReport;