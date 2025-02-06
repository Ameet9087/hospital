import React, { useState, useRef, useEffect } from 'react';
import './PulmonologyImagingAndLabReport.css'; 
import axios from 'axios';

const ImagingandLabReports = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [reports, setReports] = useState([]); // For storing reports data
  const [newReport, setNewReport] = useState({
    reportId: '', patientId: '', patientName: '', imagingType: '', labType: '', reportDate: '', result: ''
  });

  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [patients, setPatients] = useState([]); // For storing patient data
  const [searchQuery, setSearchQuery] = useState(''); // For search input
  const [filteredPatients, setFilteredPatients] = useState([]); // For filtered patients based on search

  // Fetch patients from backend when component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8052/api/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  // Fetch reports from backend when component mounts
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:8052/api/imaging-lab-reports'); // API to get all reports
        setReports(response.data); // Set reports from response data
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports(); // Call the function when component mounts
  }, []);

  // Filter patients based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = patients.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients([]);
    }
  }, [searchQuery, patients]);

  // Handle adding a new report or editing an existing one
  const handleAddReport = async () => {
    try {
      if (newReport.reportId) {
        // Edit existing report
        const response = await axios.put(`http://localhost:8052/api/imaging-lab-reports/${newReport.reportId}`, newReport);
        setReports(reports.map(report => report.reportId === newReport.reportId ? response.data : report));
      } else {
        // Add new report
        const response = await axios.post('http://localhost:8052/api/imaging-lab-reports', newReport);
        setReports([...reports, response.data]);
      }

      // Reset form and close modal
      setNewReport({
        reportId: '', patientId: '', patientName: '', imagingType: '', labType: '', reportDate: '', result: ''
      });

      setShowAddReportModal(false);
    } catch (error) {
      console.error('Error saving report:', error);
    }
  };

  // Handle editing a report
  const handleEditReport = (report) => {
    setNewReport(report);
    setShowAddReportModal(true);
  };

  // Handle deleting a report
  const handleDeleteReport = async (reportId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await axios.delete(`http://localhost:8052/api/imaging-lab-reports/${reportId}`);
        setReports(reports.filter(report => report.reportId !== reportId));
      } catch (error) {
        console.error('Error deleting report:', error);
      }
    }
  };

  // Handle adding a report for a specific patient
  const handleAddReportForPatient = (patient) => {
    setNewReport({
      reportId: '',
      patientId: patient.patientId,
      patientName: `${patient.firstName} ${patient.lastName}`,
      imagingType: '',
      labType: '',
      reportDate: '',
      result: ''
    });
    setShowAddReportModal(true);
  };

  return (
    <div className="pulmonology-imaginandlabreport-container">
      <input
        type="text"
        placeholder="Search Patient by Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pulmonology-imaginandlabreport-search"
      />
      <button className='pulmonology-imaginandlabreport-btn' onClick={() => setShowAddReportModal(true)}>Add Report</button>

      {/* Display filtered patients based on search */}
      {filteredPatients.length > 0 && (
        <div className="pulmonology-imaginandlabreport-patient-table">
          <h3>Patients matching "{searchQuery}":</h3>
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.patientId}>
                  <td>{patient.patientId}</td>
                  <td>{patient.firstName}</td>
                  <td>{patient.lastName}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>
                    <button onClick={() => handleAddReportForPatient(patient)}>
                      Add Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Table to display all reports */}
      <table ref={tableRef} className="pulmonology-imaginandlabreport-table">
        <thead>
          <tr>
            {["Report ID", "Patient ID", "Patient Name", "Imaging Type", "Lab Type", "Report Date", "Result", "Actions"].map((header, index) => (
              <th key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{report.reportId}</td>
              <td>{report.patientId}</td>
              <td>{report.patientName}</td>
              <td>{report.imagingType}</td>
              <td>{report.labType}</td>
              <td>{report.reportDate}</td>
              <td>{report.result}</td>
              <td>
                <button className='pulmonology-imaginandlabreport-edit-btn' onClick={() => handleEditReport(report)}>Edit</button>
                <button className='pulmonology-imaginandlabreport-edit-btn' onClick={() => handleDeleteReport(report.reportId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to add or edit reports */}
      {showAddReportModal && (
        <div className="pulmonology-imaginandlabreport-modal" onClick={() => setShowAddReportModal(false)}>
          <div className="pulmonology-imaginandlabreport-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{newReport.reportId ? 'Edit Report' : 'Add New Report'}</h2>
            <div className="pulmonology-imaginandlabreport-modal-contentform">
              <label>Patient ID:</label>
              <input
                type="text"
                value={newReport.patientId}
                readOnly
              />
            </div>
            <div className="pulmonology-imaginandlabreport-modal-contentform">
              <label>Patient Name:</label>
              <input
                type="text"
                value={newReport.patientName}
                readOnly
              />
            </div>
            <div className="pulmonology-imaginandlabreport-modal-contentform">
              <label>Imaging Type:</label>
              <input
                type="text"
                value={newReport.imagingType}
                onChange={(e) => setNewReport({ ...newReport, imagingType: e.target.value })}
              />
            </div>
            <div className="pulmonology-imaginandlabreport-modal-contentform">
              <label>Lab Type:</label>
              <input
                type="text"
                value={newReport.labType}
                onChange={(e) => setNewReport({ ...newReport, labType: e.target.value })}
              />
            </div>
            <div className="pulmonology-imaginandlabreport-modal-contentform">
              <label>Report Date:</label>
              <input
                type="date"
                value={newReport.reportDate}
                onChange={(e) => setNewReport({ ...newReport, reportDate: e.target.value })}
              />
            </div>
            <div className="pulmonology-imaginandlabreport-modal-contentform">
              <label>Result:</label>
              <input
                type="text"
                value={newReport.result}
                onChange={(e) => setNewReport({ ...newReport, result: e.target.value })}
              />
            </div>
            <button onClick={handleAddReport}>{newReport.reportId ? 'Update Report' : 'Add Report'}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagingandLabReports;
