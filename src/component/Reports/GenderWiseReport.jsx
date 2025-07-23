import React, { useState, useEffect, useRef } from 'react';
import './UserCollectionReport.css';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import { API_BASE_URL } from '../api/api';
import * as XLSX from 'xlsx';

const GenderWiseReport = () => {
      const [showReport, setShowReport] = useState(false);
      const [isPopupOpen, setIsPopupOpen] = useState(false);
      const [searchTerm, setSearchTerm] = useState('');
      const [loading, setLoading] = useState(false);
      const [filteredData, setFilteredData] = useState([]);
      const [selectedGender, setSelectedGender] = useState('');
      const [reportData, setReportData] = useState([]);

      useEffect(() => {
            if (showReport && selectedGender) {
                  fetchReportData();
            }
      }, [showReport, selectedGender]);

      const fetchReportData = async () => {
            setLoading(true);
            try {
                  const response = await fetch(`${API_BASE_URL}/appointments/by-gender/${selectedGender}`);
                  const data = await response.json();
                  setReportData(data);
                  setFilteredData(data);

            } catch (error) {
                  console.error('Error fetching data:', error);
            } finally {
                  setLoading(false);
            }
      };

      const handleSearchChange = (e) => {
            setSearchTerm(e.target.value);
            if (e.target.value === '') {
                  setFilteredData(reportData);
            } else {
                  const filtered = reportData.filter((report) =>
                        report.patient.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        report.patient.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        report.addDoctor.doctorName.toLowerCase().includes(e.target.value.toLowerCase())
                  );
                  setFilteredData(filtered);
            }
      };

      const handleShowReport = () => {
            if (selectedGender) {
                  setShowReport(true);
            } else {
                  alert('Please select a gender first');
            }
      };

      const handleGenderChange = (e) => {
            setSelectedGender(e.target.value);
            setShowReport(false);
      };

      // Excel Export Function
      const exportToExcel = () => {
            // Prepare data for export
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

            // Create worksheet
            const worksheet = XLSX.utils.json_to_sheet(exportData);

            // Create workbook and add worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Gender Wise Report');

            // Export to Excel file
            XLSX.writeFile(workbook, `Gender_Wise_Report_${selectedGender}_${new Date().toISOString().split('T')[0]}.xlsx`);
      };

      // Print Function
      const handlePrint = () => {
            // Create a new window for printing
            const printWindow = window.open('', '_blank');

            // Construct HTML for print
            printWindow.document.write(`
      <html>
        <head>
          <title>Gender Wise Report</title>
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
            .report-header {
              text-align: center;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="report-header">
            <h2>Gender Wise Report (${selectedGender})</h2>
            <p>Generated on: ${new Date().toLocaleString()}</p>
          </div>
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

            // Trigger print
            printWindow.document.close();
            printWindow.print();
      };

      const [columnWidths, setColumnWidths] = useState({});
      const tableRef = useRef(null);

      return (
            <div className="user-collection-report">
                  <div className="user-collection-report-header">
                        <h3 className="user-collection-report-title">⚛ Gender Wise Report</h3>

                        <div className="user-collection-report-filters">
                              {/* <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input type="date" />
            <label>To:</label>
            <input type="date" />
          </div> */}

                              <select
                                    className="userCollectionReport-select"
                                    value={selectedGender}
                                    onChange={handleGenderChange}
                              >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                              </select>
                              <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
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
      );
};

export default GenderWiseReport;