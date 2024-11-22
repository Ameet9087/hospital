/* Mohini_Endoscopy_PatientReportsResults_18-10-24 */
import React, { useState, useRef, useEffect } from 'react';  // Add missing imports
import axios from 'axios';
import './PatientReportsResults.css';
import { startResizing } from '../TableHeadingResizing/resizableColumns';

const PatientReportsResults = () => {
  const [reports, setReports] = useState([]); // State to hold report data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State to handle errors
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Fetch reports from the API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/post-procedure-notes/all');
        setReports(response.data); // Set fetched reports to state
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Failed to fetch reports.');
      } finally {
        setLoading(false); // Loading complete
      }
    };

    fetchReports();
  }, []);

  const handleViewDetails = (report) => {
    console.log('Viewing Details for:', report);
  };

  const handleDownloadReport = (report) => {
    console.log('Downloading Report for:', report);
  };

  const handleDownloadImaging = (report) => {
    if (report.postProcedureImaging) {
      console.log('Downloading Imaging for:', report);
    } else {
      alert('Imaging not available.');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error handling
  }

  return (
    <div className="patient-report-results">
      <h2 className="patient-report-results-title">Patient Reports</h2>
      <div className='table-container'>
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Patient Name", "Patient ID", "Procedure Type", "Procedure Date", "Endoscopist", "Report Summary", "Imaging Available", "Post-Procedure Notes", "Actions"].map((header, index) => (
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
            {reports.length > 0 ? (
              reports.map((report, index) => (
                <tr key={index} className="patient-report-row">
                  <td className="patient-report-cell">{report.patientName}</td>
                  <td className="patient-report-cell">{report.id}</td> {/* Use appropriate field for Patient ID */}
                  <td className="patient-report-cell">{report.procedureType}</td>
                  <td className="patient-report-cell">{new Date(report.procedureDateTime).toLocaleString()}</td>
                  <td className="patient-report-cell">{report.endoscopistName}</td>
                  <td className="patient-report-cell">{report.findings}</td>
                  <td className="patient-report-cell">
                    {report.postProcedureImaging ? 'Yes' : 'No'}
                  </td>
                  <td className="patient-report-cell">{report.postProcedureNotes}</td>
                  <td className="patient-report-actions">
                    <button
                      className="patient-report-button view-details"
                      onClick={() => handleViewDetails(report)}
                    >
                      View Details
                    </button>
                    <button
                      className="patient-report-button download-report"
                      onClick={() => handleDownloadReport(report)}
                    >
                      Download Report
                    </button>
                    <button
                      className="patient-report-button download-imaging"
                      onClick={() => handleDownloadImaging(report)}
                    >
                      Download Imaging
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="patient-report-empty-row">
                <td colSpan="9" className="patient-report-empty-cell">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientReportsResults;
/* Mohini_Endoscopy_PatientReportsResults_18-10-24 */
