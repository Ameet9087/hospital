import React, { useState, useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../api/api';

const AppointmentDepartmentWise = () => {
  const [showReport, setShowReport] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportsData, setReportsData] = useState([]);
  const [selectedSpecialisation, setSelectedSpecialisation] = useState('');
  const [loading, setLoading] = useState(false);
  const [specialisations, setSpecialisations] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/specialisations`)
      .then(response => response.json())
      .then(data => setSpecialisations(data.map(speci => ({ id: speci.specialisationId, name: speci.specialisationName }))))
      .catch(error => console.error('Error fetching specialisations:', error));
  }, []);

  const handleShowReport = () => {
    if (selectedSpecialisation) {
      setLoading(true);
      fetch(`${API_BASE_URL}/appointments/searchBySpecialisation?specialisationId=${selectedSpecialisation}`)
        .then(response => response.json())
        .then(data => {
          setReportsData(Array.isArray(data) ? data : []);
          setShowReport(true);
        })
        .catch(error => {
          console.error('Error:', error);
          setReportsData([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExportToExcel = () => {
    const dataToExport = filteredData.map(report => ({
      'Out Patient ID': report.outPatientId,
      'Patient Name': `${report.patient?.firstName || ''} ${report.patient?.middleName || ''} ${report.patient?.lastName || ''}`,
      'Status': report.status,
      'Age': report.patient?.age,
      'Date of Birth': report.patient?.dateOfBirth,
      'Gender': report.patient?.gender,
      'Doctor Name': report.addDoctor?.doctorName,
      'Group Speciality': report.addDoctor?.specialisationId?.groupSpeciality,
      'Description': report.addDoctor?.specialisationId?.description,
      'Hospital Specialisation': report.addDoctor?.specialisationId?.hospitalSpecialisation
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Department Report");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'DepartmentWiseReport.xlsx');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Department Wise Report</title>
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
                  <td>${`${report.patient?.firstName || ''} ${report.patient?.middleName || ''} ${report.patient?.lastName || ''}`}</td>
                  <td>${report.status}</td>
                  <td>${report.patient?.age}</td>
                  <td>${report.patient?.dateOfBirth}</td>
                  <td>${report.patient?.gender}</td>
                  <td>${report.addDoctor?.doctorName}</td>
                  <td>${report.addDoctor?.specialisationId?.groupSpeciality}</td>
                  <td>${report.addDoctor?.specialisationId?.description}</td>
                  <td>${report.addDoctor?.specialisationId?.hospitalSpecialisation}</td>
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

  const filteredData = reportsData.filter(report =>
    report.patient?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.outPatientId?.toString().includes(searchTerm) ||
    report.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.patient?.age?.toString().includes(searchTerm) ||
    report.patient?.gender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.addDoctor?.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.addDoctor?.specialisationId?.specialisationName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Department Wise Report</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-doctor-filter">
            <label>Specialization:</label>
            <select
              value={selectedSpecialisation}
              onChange={(e) => setSelectedSpecialisation(e.target.value)}
            >
              <option value="">Select Department</option>
              {specialisations.map(spec => (
                <option key={spec.id} value={spec.id}>{spec.name}</option>
              ))}
            </select>
            <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
          </div>
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
              <button className="user-collection-report-export-btn" onClick={handleExportToExcel}>Export</button>
              <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            </div>
          </div>

          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Out Patient ID",
                  "First Name",
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
                        onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
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
                    <td>{`${report.patient?.firstName || ''} ${report.patient?.middleName || ''} ${report.patient?.lastName || ''}`}</td>
                    <td>{report.status}</td>
                    <td>{report.patient?.age}</td>
                    <td>{report.patient?.dateOfBirth}</td>
                    <td>{report.patient?.gender}</td>
                    <td>{report.addDoctor?.doctorName}</td>
                    <td>{report.addDoctor?.specialisationId?.groupSpeciality}</td>
                    <td>{report.addDoctor?.specialisationId?.description}</td>
                    <td>{report.addDoctor?.specialisationId?.hospitalSpecialisation}</td>
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

export default AppointmentDepartmentWise;