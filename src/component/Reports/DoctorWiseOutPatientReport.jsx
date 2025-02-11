import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import './UserCollectionReport.css';
import { API_BASE_URL } from '../api/api';

const DoctorwiseOutPatientReport = () => {
      const [showReport, setShowReport] = useState(false);
      const [searchTerm, setSearchTerm] = useState("");
      const [patientData, setPatientData] = useState([]);
      const [selectedDoctor, setSelectedDoctor] = useState("");
      const [doctorList, setDoctorList] = useState([]);
      const [columnWidths, setColumnWidths] = useState({});
      const tableRef = useRef(null);

      useEffect(() => {
            fetch(`${API_BASE_URL}/doctors`)
                  .then(response => response.json())
                  .then(data => setDoctorList(data.map(doc => ({ id: doc.doctorId, name: doc.doctorName }))))
                  .catch(error => console.error('Error fetching doctors:', error));
      }, []);

      const handleShowReport = () => {
            if (selectedDoctor) {
                  fetch(`${API_BASE_URL}/appointments/searchByDoctor?doctorId=${selectedDoctor}`)
                        .then(response => response.json())
                        .then(data => {
                              if (Array.isArray(data)) {
                                    setPatientData(data);
                                    setShowReport(true);
                              }
                        })
                        .catch(error => console.error('Error fetching data:', error));
            }
      };

      const handleExportToExcel = () => {
            const exportData = filteredData.map(report => ({
                  'Doctor ID': report.addDoctor?.doctorId,
                  'Doctor Name': report.addDoctor?.doctorName,
                  'OutPatient ID': report.outPatientId,
                  'Patient Name': report.patient?.firstName,
                  'Status': report.status,
                  'Age': report.patient?.age,
                  'Date of Birth': report.patient?.dateOfBirth,
                  'Gender': report.patient?.gender
            }));

            const worksheet = XLSX.utils.json_to_sheet(exportData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "OutPatients");

            const columnWidths = [
                  { wch: 10 },
                  { wch: 20 },
                  { wch: 15 },
                  { wch: 20 },
                  { wch: 10 },
                  { wch: 8 },
                  { wch: 15 },
                  { wch: 10 }
            ];
            worksheet['!cols'] = columnWidths;

            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
            saveAs(data, 'DoctorWiseOutPatientReport.xlsx');
      };

      const handlePrint = () => {
            const printWindow = window.open('', '_blank');
            const tableHtml = tableRef.current.outerHTML;

            printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Doctor-wise OutPatient Report</title>
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
          <h2>Doctor-wise OutPatient Report</h2>
          ${tableHtml}
        </body>
      </html>
    `);

            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
      };

      const filteredData = patientData.filter(report =>
            report.patient?.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const tableHeaders = [
            "doctorId",
            "doctorName",
            "outPatientId",
            "firstName",
            "status",
            "age",
            "dateOfBirth",
            "gender"
      ];

      return (
            <div className="user-collection-report">
                  <div className="user-collection-report-header">
                        <h3 className="user-collection-report-title">⚛ Doctorwise OutPatient Report</h3>
                        <div className="user-collection-report-filters">
                              <select
                                    value={selectedDoctor}
                                    onChange={(e) => setSelectedDoctor(e.target.value)}
                                    className="DoctorWisePatientReport-doctor-select"
                              >
                                    <option value="">Select Doctor</option>
                                    {doctorList.map((doctor, index) => (
                                          <option key={index} value={doctor.id}>{doctor.name}</option>
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
                                          onChange={(e) => setSearchTerm(e.target.value)}
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
                                                {tableHeaders.map((header, index) => (
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
                                          {filteredData.length > 0 ? (
                                                filteredData.map((report, index) => (
                                                      <tr key={report.outPatientId || index}>
                                                            <td>{report.addDoctor?.doctorId}</td>
                                                            <td>{report.addDoctor?.doctorName}</td>
                                                            <td>{report.outPatientId}</td>
                                                            <td>{report.patient?.firstName}</td>
                                                            <td>{report.status}</td>
                                                            <td>{report.patient?.age}</td>
                                                            <td>{report.patient?.dateOfBirth}</td>
                                                            <td>{report.patient?.gender}</td>
                                                      </tr>
                                                ))
                                          ) : (
                                                <tr>
                                                      <td colSpan="8">No data available</td>
                                                </tr>
                                          )}
                                    </tbody>
                              </table>
                        </div>
                  )}
            </div>
      );
};

export default DoctorwiseOutPatientReport;