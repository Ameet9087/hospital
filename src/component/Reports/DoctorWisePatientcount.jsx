import React, { useState, useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import './DoctorReportsPage.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../api/api';

const DoctorWisePatientReport = () => {
  const [startDate, setStartDate] = useState('2000-01-29');
  const [endDate, setEndDate] = useState('2025-02-05');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/doctors`)
      .then(response => response.json())
      .then(data => setDoctors(data.map(doc => ({ id: doc.doctorId, name: doc.doctorName }))))
      .catch(error => console.error('Error fetching doctors:', error));
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      fetch(`${API_BASE_URL}/appointments/by-doctor?doctorId=${selectedDoctor}`)
        .then(response => response.json())
        .then(data => {
          const filteredAppointments = data.outPatients.filter(appointment => {
            const appointmentDate = new Date(appointment.appointmentDate);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return appointmentDate >= start && appointmentDate <= end;
          });
          setAppointments(filteredAppointments);
        })
        .catch(error => console.error('Error fetching appointments:', error));
    }
  }, [selectedDoctor, startDate, endDate]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleExportToExcel = () => {
    const dataToExport = filteredAppointments.map(appointment => ({
      'Appointment Date': appointment.appointmentDate,
      'Out Patient ID': appointment.outPatientId,
      'Doctor Name': appointment.addDoctor.doctorName,
      'First Name': appointment.patient.firstName
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Doctor Wise Report");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'DoctorWiseReport.xlsx');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Doctor Wise Patient Report</title>
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
                <th>Appointment Date</th>
                <th>Out Patient ID</th>
                <th>Doctor Name</th>
                <th>First Name</th>
              </tr>
            </thead>
            <tbody>
              ${filteredAppointments.map(appointment => `
                <tr>
                  <td>${appointment.appointmentDate}</td>
                  <td>${appointment.outPatientId}</td>
                  <td>${appointment.addDoctor.doctorName}</td>
                  <td>${appointment.patient.firstName}</td>
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

  const filteredAppointments = appointments.filter(appointment =>
    appointment.appointmentDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.outPatientId.toString().includes(searchTerm) ||
    appointment.addDoctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.patient.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="DoctorWisePatientReport-container">
      <div className="DoctorWisePatientReport-header">
        <h3 className="DoctorWisePatientReport-title">⚛ Doctor Wise Report</h3>

        <div className="DoctorWisePatientReport-controls">
          <div className="DoctorWisePatientReport-date-range">
            <div className="DoctorWisePatientReport-date-field">
              <label>From:</label>
              <input
                className='DoctorWisePatientReport-input'
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="DoctorWisePatientReport-date-field">
              <label>To:</label>
              <input
                className='DoctorWisePatientReport-input'
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="DoctorWisePatientReport-doctor-search">
            <label>Doctor Name:</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="DoctorWisePatientReport-doctor-select"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor, index) => (
                <option key={index} value={doctor.id}>{doctor.name}</option>
              ))}
            </select>
            <button className="DoctorWisePatientReport-show-report">Show Report</button>
          </div>
        </div>

        <div className="DoctorWisePatientReport-toolbar">
          <div className="DoctorWisePatientReport-search">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="DoctorWisePatientReport-actions">
            <button
              className="DoctorWisePatientReport-export"
              onClick={handleExportToExcel}
            >
              Export
            </button>
            <button
              className="DoctorWisePatientReport-print"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
        </div>
      </div>

      <div className="DoctorWisePatientReport-table-container">
        <table className="DoctorWisePatientReport-table" ref={tableRef}>
          <thead>
            <tr>
              {["Appointment Date", "Out Patient ID", "Doctor Name", "First Name"].map((header, index) => (
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
            {filteredAppointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.outPatientId}</td>
                <td>{appointment.addDoctor.doctorName}</td>
                <td>{appointment.patient.firstName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorWisePatientReport;