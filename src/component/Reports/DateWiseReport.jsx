import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../api/api';
import * as XLSX from 'xlsx';

const DateWiseReport = () => {
      const [showReport, setShowReport] = useState(false);
      const [isPopupOpen, setIsPopupOpen] = useState(false);
      const [searchTerm, setSearchTerm] = useState('');
      const [loading, setLoading] = useState(false);
      const [filteredData, setFilteredData] = useState([]);
      const [reportsData, setReportsData] = useState([]);
      const [fromDate, setFromDate] = useState('');
      const [toDate, setToDate] = useState('');

      useEffect(() => {
            if (showReport && fromDate && toDate) {
                  setLoading(true);
                  fetch(`${API_BASE_URL}/appointments/by-date-range?startDate=${fromDate}&endDate=${toDate}`)
                        .then(response => response.json())
                        .then(data => {
                              setReportsData(data);
                              setFilteredData(data);
                              setLoading(false);
                        })
                        .catch(error => {
                              console.error('Error fetching data:', error);
                              setLoading(false);
                        });
            }
      }, [showReport, fromDate, toDate]);

      const handleSearchChange = (e) => {
            setSearchTerm(e.target.value);
            if (e.target.value === '') {
                  setFilteredData(reportsData);
            } else {
                  const filtered = reportsData.filter((report) =>
                        report.patient.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        report.patient.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        report.addDoctor.doctorName.toLowerCase().includes(e.target.value.toLowerCase())
                  );
                  setFilteredData(filtered);
            }
      };

      const handleShowReport = () => {
            if (fromDate && toDate) {
                  setShowReport(true);
            } else {
                  alert('Please select both "From" and "To" dates.');
            }
      };

      // Export to Excel Function
      const exportToExcel = () => {
            const exportData = filteredData.map((report) => ({
                  'Out Patient ID': report.outPatientId,
                  'Patient Name': `${report.patient.firstName} ${report.patient.middleName || ''} ${report.patient.lastName || ''}`,
                  'Status': report.status,
                  'Age': report.patient.age,
                  'Date of Birth': report.patient.dateOfBirth,
                  'Gender': report.patient.gender,
                  'Doctor Name': report.addDoctor.doctorName,
                  'Group Speciality': report.addDoctor.specialisationId.groupSpeciality,
                  'Description': report.addDoctor.specialisationId.description,
                  'Hospital Specialisation': report.addDoctor.specialisationId.hospitalSpecialisation
            }));

            const worksheet = XLSX.utils.json_to_sheet(exportData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Daily Appointment Report');
            XLSX.writeFile(workbook, `Daily_Appointment_Report_${fromDate}_to_${toDate}.xlsx`);
      };

      // Print Function
      const handlePrint = () => {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
      <html>
        <head>
          <title>Daily Appointment Report</title>
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
                <th>Out Patient ID</th>
                <th>Patient Name</th>
                <th>Status</th>
                <th>Age</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Doctor Name</th>
                <th>Group Speciality</th>
                <th>Description</th>
                <th>Hospital Specialisation</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData.map(report => `
                <tr>
                  <td>${report.outPatientId}</td>
                  <td>${`${report.patient.firstName} ${report.patient.middleName || ''} ${report.patient.lastName || ''}`}</td>
                  <td>${report.status}</td>
                  <td>${report.patient.age}</td>
                  <td>${report.patient.dateOfBirth}</td>
                  <td>${report.patient.gender}</td>
                  <td>${report.addDoctor.doctorName}</td>
                  <td>${report.addDoctor.specialisationId.groupSpeciality}</td>
                  <td>${report.addDoctor.specialisationId.description}</td>
                  <td>${report.addDoctor.specialisationId.hospitalSpecialisation}</td>
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

      const [columnWidths, setColumnWidths] = useState({});
      const tableRef = useRef(null);

      return (
            <div className="user-collection-report">
                  <div className="user-collection-report-header">
                        <h3 className="user-collection-report-title">⚛ Date Wise Report</h3>
                        <div className="user-collection-report-filters">
                              <div className="user-collection-report-date-filter">
                                    <label>From:</label>
                                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                                    <label>To:</label>
                                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

                              </div>
                              <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>

                        </div>

                        <div className="user-collection-report-doctor-filter">

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
                                                            onClick={exportToExcel}
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
                                                                  "Out Patient ID",
                                                                  "Patient Name",
                                                                  "Status",
                                                                  "Age",
                                                                  "Date of Birth",
                                                                  "Gender",
                                                                  "Doctor Name",
                                                                  "Group Speciality",
                                                                  "Description",
                                                                  "Hospital Specialisation"
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
                                                      {loading ? (
                                                            <tr>
                                                                  <td colSpan="10">Loading...</td>
                                                            </tr>
                                                      ) : filteredData.length > 0 ? (
                                                            filteredData.map((report) => (
                                                                  <tr key={report.outPatientId}>
                                                                        <td>{report.outPatientId}</td>
                                                                        <td>{`${report.patient.firstName} ${report.patient.middleName || ''} ${report.patient.lastName || ''}`}</td>
                                                                        <td>{report.status}</td>
                                                                        <td>{report.patient.age}</td>
                                                                        <td>{report.patient.dateOfBirth}</td>
                                                                        <td>{report.patient.gender}</td>
                                                                        <td>{report.addDoctor.doctorName}</td>
                                                                        <td>{report.addDoctor.specialisationId.groupSpeciality}</td>
                                                                        <td>{report.addDoctor.specialisationId.description}</td>
                                                                        <td>{report.addDoctor.specialisationId.hospitalSpecialisation}</td>
                                                                  </tr>
                                                            ))
                                                      ) : (
                                                            <tr>
                                                                  <td colSpan="10">No data available</td>
                                                            </tr>
                                                      )}
                                                </tbody>
                                          </table>
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default DateWiseReport;