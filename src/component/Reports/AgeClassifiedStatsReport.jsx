import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../api/api';

const AgeClassifiedStatsReport = () => {
      const [showReport, setShowReport] = useState(false);
      const [isPopupOpen, setIsPopupOpen] = useState(false);
      const [searchTerm, setSearchTerm] = useState('');
      const [reportData, setReportData] = useState([]);
      const [selectedAge, setSelectedAge] = useState('50');
      const [fromDate, setFromDate] = useState('');
      const [toDate, setToDate] = useState('');

      const ageOptions = Array.from({ length: 100 }, (_, i) => i + 1);

      useEffect(() => {
            fetchReportData();
      }, []);

      const fetchReportData = async () => {
            try {
                  const response = await fetch(`${API_BASE_URL}/appointments/by-age/${selectedAge}`);
                  const data = await response.json();
                  setReportData(data);
                  setShowReport(true);
            } catch (error) {
                  console.error('Error fetching report data:', error);
                  setReportData([]);
            }
      };

      const handleSearchChange = (event) => {
            setSearchTerm(event.target.value);
      };

      const handleShowReport = () => {
            fetchReportData();
      };

      const handleAgeChange = (e) => {
            setSelectedAge(e.target.value);
            setShowReport(false);
      };

      const handleExportToExcel = () => {
            const dataToExport = filteredData.map(report => ({
                  'Out Patient ID': report.outPatientId,
                  'Name': `${report.patient?.firstName || ''} ${report.patient?.middleName || ''} ${report.patient?.lastName || ''}`,
                  'Appointment Date': `${report.appointmentDate} ${report.appointmentTime}`,
                  'Age': report.patient?.age,
                  'Aadhar Card': report.patient?.adharCardId,
                  'Gender': report.patient?.gender,
                  'Doctor Name': report.addDoctor?.doctorName
            }));

            const worksheet = XLSX.utils.json_to_sheet(dataToExport);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Age Classified Report");
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
            saveAs(data, `AgeClassifiedReport_${selectedAge}.xlsx`);
      };

      const handlePrint = () => {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
      <html>
        <head>
          <title>Age Classified Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 20px;
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 8px; 
              text-align: left;
            }
            th { 
              background-color: #f2f2f2; 
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                <th>OutPatient ID</th>
                <th>Name</th>
                <th>Appointment Date</th>
                <th>Age</th>
                <th>Aadhar Card</th>
                <th>Gender</th>
                <th>Doctor Name</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData.map(report => `
                <tr>
                  <td>${report.outPatientId}</td>
                  <td>${`${report.patient?.firstName || ''} ${report.patient?.middleName || ''} ${report.patient?.lastName || ''}`}</td>
                  <td>${`${report.appointmentDate} ${report.appointmentTime}`}</td>
                  <td>${report.patient?.age}</td>
                  <td>${report.patient?.adharCardId}</td>
                  <td>${report.patient?.gender}</td>
                  <td>${report.addDoctor?.doctorName}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);

            printWindow.document.close();
            printWindow.print();
      };

      const filteredData = reportData.filter(report =>
            report.outPatientId?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.patient?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.appointmentDate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.patient?.age?.toString().includes(searchTerm) ||
            report.patient?.adharCardId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.patient?.gender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.addDoctor?.doctorName?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const [columnWidths, setColumnWidths] = useState({});
      const tableRef = useRef(null);

      return (
            <div className="user-collection-report">
                  <div className="user-collection-report-header">
                        <h3 className="user-collection-report-title">⚛ Age Classified Stats Report (OP)</h3>
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

                              <select
                                    value={selectedAge}
                                    onChange={handleAgeChange}
                                    className="user-collection-report-age-select"
                              >
                                    <option value="">Select Age</option>
                                    {ageOptions.map(age => (
                                          <option key={age} value={age}>Age: {age}</option>
                                    ))}
                              </select>

                              <button
                                    className="user-collection-report-show-btn"
                                    onClick={handleShowReport}
                              >
                                    Show Report
                              </button>
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
                                          onChange={handleSearchChange}
                                    />
                                    <div className="user-collection-report-actions">
                                          <button
                                                className="user-collection-report-export-btn"
                                                onClick={handleExportToExcel}
                                          >
                                                Export
                                          </button>
                                          <button
                                                className="user-collection-report-print-btn"
                                                onClick={handlePrint}
                                          >
                                                Print
                                          </button>
                                    </div>
                              </div>

                              <table ref={tableRef}>
                                    <thead>
                                          <tr>
                                                {[
                                                      "OutPatient ID",
                                                      "Name",
                                                      "Appointment Date",
                                                      "Age",
                                                      "Aadhar Card",
                                                      "Gender",
                                                      "Doctor Name"
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
                                                                        onMouseDown={startResizing(
                                                                              tableRef,
                                                                              setColumnWidths
                                                                        )(index)}
                                                                  ></div>
                                                            </div>
                                                      </th>
                                                ))}
                                          </tr>
                                    </thead>

                                    <tbody>
                                          {filteredData.length > 0 ? (
                                                filteredData.map((report) => (
                                                      <tr key={report.outPatientId}>
                                                            <td>{report.outPatientId}</td>
                                                            <td>{`${report.patient?.firstName || ''} ${report.patient?.middleName || ''} ${report.patient?.lastName || ''}`}</td>
                                                            <td>{`${report.appointmentDate} ${report.appointmentTime}`}</td>
                                                            <td>{report.patient?.age}</td>
                                                            <td>{report.patient?.adharCardId}</td>
                                                            <td>{report.patient?.gender}</td>
                                                            <td>{report.addDoctor?.doctorName}</td>
                                                      </tr>
                                                ))
                                          ) : (
                                                <tr>
                                                      <td colSpan="7">No data available</td>
                                                </tr>
                                          )}
                                    </tbody>
                              </table>
                        </div>
                  )}
            </div>
      );
};

export default AgeClassifiedStatsReport;