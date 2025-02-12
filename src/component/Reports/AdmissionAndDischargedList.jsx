import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../api/api';

const AdmissionAndDischargedList = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState(""); // To store the search query
  const [filteredReports, setFilteredReports] = useState(reportsData);


  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });
  const [searchedUserTotal, setSearchedUserTotal] = useState(null);

  useEffect(() => {
    setFilteredReports(reportsData);
  }, [reportsData]);



  const totalAdmittedPatients = reportsData.filter(report => report.admissionStatus === "ADMITTED").length;

  const totalDischargedPatients = reportsData.filter(report => report.admissionStatus === "BLOCKED").length;

  const grossDaysOfAdmission = reportsData.reduce((total, report) => {
    if (report.admissionStatus === "ADMITTED" || report.admissionStatus === "BLOCKED") {
      const admissionDate = new Date(report.admissionDate);
      const dischargeDate = report.admissionStatus === "BLOCKED" ? new Date(report.disAdvisedDate) : null;
      const noOfDays = dischargeDate ? Math.ceil((dischargeDate - admissionDate) / (1000 * 60 * 60 * 24)) : 0;
      return total + noOfDays;
    }
    return total;
  }, 0);



  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/room-types`)
      .then((response) => {
        setRoomTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching room types:", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/ip-admissions/admission-patients-discharged`
        );
        setReportsData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle missing dates
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
  };

  const formatDateTime = () => {
    const now = new Date();
    return now.toLocaleString("en-GB"); // Format as DD/MM/YYYY, HH:MM:SS
  };
  useEffect(() => {
    if (searchText && reportsData.length > 0) {
      const matchingReceipts = reportsData.filter(item =>
        item.firstName?.toString().toLowerCase().includes(searchText.toLowerCase())
      );

      if (matchingReceipts.length > 0) {
        const userTotal = matchingReceipts.reduce((sum, receipt) => sum + (receipt.amount || 0), 0);
        setSearchedUserTotal(userTotal);
      } else {
        setSearchedUserTotal(null);
      }
    } else {
      setSearchedUserTotal(null);
    }
  }, [searchText, reportsData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handlePrint = () => {
    const doc = new jsPDF('l', 'mm', 'a4');

    // Add heading
    doc.setFontSize(16);
    doc.text('Patient Census Report', doc.internal.pageSize.width / 2, 15, { align: 'center' });

    // Add current date/time
    doc.setFontSize(10);
    doc.text(`Generated on: ${formatDateTime()}`, 14, 25);

    // Prepare table data
    const tableData = reportsData.map(report => [
      report.ipAdmissionId,
      formatDate(report.admissionDate),
      report.firstName,
      report.doctorName,
      report.roomType,
      report.bedNumber,
      report.admissionStatus,
      report.disAdvisedDate ? formatDate(report.disAdvisedDate) : 'N/A',
      report.noOfDays || 'N/A'
    ]);

    // Define table headers
    const headers = [
      "Admission No",
      "Admission Date",
      "Patient Name",
      "Doctor Name",
      "Ward Name",
      "Bed Code",
      "Admission Status",
      "Discharge Date",
      "No of Days"
    ];

    // Add table
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 30,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [51, 122, 183],
        textColor: 255,
        fontSize: 9,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // Add summary at the bottom
    const lastY = doc.lastAutoTable.finalY;
    doc.text(`Total Admitted Patients: ${totalAdmittedPatients}`, 14, lastY + 10);
    doc.text(`Total Discharged Patients: ${totalDischargedPatients}`, 14, lastY + 15);
    doc.text(`Gross Days of Admission: ${grossDaysOfAdmission}`, 14, lastY + 20);

    // Open PDF in new tab
    const pdfOutput = doc.output('bloburl');
    window.open(pdfOutput, '_blank');
  };




  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredPatients);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Discharged Patients");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Discharged_Patients_Report.xlsx');
  };

  // Toggles the popup for date range selection
  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Handles date range selection from the popup
  const handleDateRangeSelection = (range) => {
    console.log('Selected Range:', range);
    // Implement the logic to filter data based on the selected range
    setIsPopupOpen(false); // Close the popup after selection
  };



  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredReports(reportsData); // If search is empty, show all reports
    } else {
      // Filter reports based on the query
      const filteredData = reportsData.filter((report) => {
        const fullName = `${report.firstName} ${report.lastName}`.toLowerCase();
        const admissionDate = new Date(report.admissionDate).toLocaleDateString();
        const dischargeDate = report.disAdvisedDate
          ? new Date(report.disAdvisedDate).toLocaleDateString()
          : "";

        return (
          fullName.includes(query.toLowerCase()) ||
          admissionDate.includes(query.toLowerCase()) ||
          dischargeDate.includes(query.toLowerCase()) ||
          (report.ipAdmissionId && report.ipAdmissionId.toString().includes(query)) ||
          (report.doctorName && report.doctorName.toLowerCase().includes(query.toLowerCase())) ||
          (report.roomType && report.roomType.toLowerCase().includes(query.toLowerCase())) ||
          (report.bedNumber && report.bedNumber.toLowerCase().includes(query.toLowerCase())) ||
          (report.admissionStatus && report.admissionStatus.toLowerCase().includes(query.toLowerCase()))
        );
      });
      setFilteredReports(filteredData); // Update filtered reports based on the search query
    }
  };


  // Shows the report section when the button is clicked
  const handleShowReport = () => {
    setShowReport(true);
  };

  // New data added


  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛Patient Census Report</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input
              label="From Date"
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
            />
            <label>To:</label>
            <input
              label="To Date"
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
            />

          </div>

          <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
        </div>


      </div>

      {showReport && (
        <>
          <div className="user-collection-report-controls">
            <input
              type="text"
              className="user-collection-report-search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)} // Handle search
            />
            <div className="user-collection-page-results-info">
              Showing {reportsData.length}/{reportsData.length} results
            </div>
            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>
          <div className='user-collection-report-tab'>
            <table ref={tableRef} className="patientList-table">
              <thead>
                <tr>
                  {[
                    "Admission No", "Admission Date", "Patient Name", "Doctor Name",
                    "Ward Name", "Bed Code", "Admission Status", "Discharge Date",
                    "No of Days"
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
                {filteredReports.length > 0 ? (
                  filteredReports.map((report, index) => {
                    const admissionDate = new Date(report.admissionDate);
                    const dischargeDate = report.disAdvisedDate ? new Date(report.disAdvisedDate) : null;
                    const noOfDays = dischargeDate ? Math.ceil((dischargeDate - admissionDate) / (1000 * 60 * 60 * 24)) : "N/A";

                    return (
                      <tr key={index}>
                        <td>{report.ipAdmissionId}</td>
                        <td>{report.admissionDate}</td>
                        <td>{report.firstName} {report.lastName}</td>
                        <td>{report.doctorName}</td>
                        <td>{report.roomType}</td>
                        <td>{report.bedNumber}</td>
                        <td>{report.admissionStatus}</td>
                        <td>{report.disAdvisedDate || ""}</td>
                        <td>{noOfDays}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9">No records found</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* <div className="user-collection-report-page-no">
              <Button className="user-collection-report-pagination-btn">First</Button>
              <Button className="user-collection-report-pagination-btn">Previous</Button>
              <span>Page 1 of 4</span>
              <Button className="user-collection-report-pagination-btn">Next</Button>
              <Button className="user-collection-report-pagination-btn">Last</Button>
            </div> */}
          </div>
          <div className='net-cash-collection-header'>
            <h4 className="user-collection-report-net-collection">Summary</h4>
            <div className="user-collection-report-summary">

              <table className="user-collection-report-summary-table">
                <tbody>
                  <tr>
                    <td>Total Admitted Patient Count:</td>
                    <td>{totalAdmittedPatients}</td>
                  </tr>
                  <tr>
                    <td>Total Discharged Patient Count:</td>
                    <td>{totalDischargedPatients}</td>
                  </tr>
                  <tr>
                    <td>Gross Days of Admission:</td>
                    <td>{grossDaysOfAdmission}</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default AdmissionAndDischargedList;
