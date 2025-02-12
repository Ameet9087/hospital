import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const RegistrationReport = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [reportsData, setReportsData] = useState([]); // Store original data
  const [filteredReportsData, setFilteredReportsData] = useState([]); // Store filtered data
  const [columnWidths, setColumnWidths] = useState({});
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedGender, setSelectedGender] = useState('All'); // State for gender filter
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const tableRef = useRef(null);

  useEffect(() => {
    fetch("http://192.168.233.114:8080/api/patient-register/all")
      .then(response => response.json())
      .then(data => {
        setReportsData(data);
        setFilteredReportsData(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handlePrint = () => {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(16);
    doc.text('Patient Registration Report', doc.internal.pageSize.width / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`From Date: ${fromDate}`, 14, 25);
    doc.text(`To Date: ${toDate}`, 14, 30);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 35);

    // Prepare the table data
    const tableData = filteredReportsData.map(patient => [
      patient.registrationDate,
      `${patient.firstName} ${patient.lastName}`,
      patient.dateOfBirth,
      patient.age,
      patient.gender,
      patient.mobileNumber,
      patient.country,
      patient.address,
      patient.emailId,
      patient.policyNumber
    ]);

    const headers = [
      "Registration Date",
      "Patient Name",
      "Date of Birth",
      "Age",
      "Gender",
      "Phone Number",
      "Country",
      "Address",
      "Email",
      "Policy No"
    ];

    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 40,
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

    // Add total collection or any other summary you need
    const lastY = doc.lastAutoTable.finalY;
    doc.text(`Total Patients: ${filteredReportsData.length}`, 14, lastY + 10);

    const pdfOutput = doc.output('bloburl');
    window.open(pdfOutput, '_blank');
  };

  const handleExport = () => {
    if (filteredReportsData.length === 0) {
      alert("No data available to export!");
      return;
    }

    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'PatientRegistrationReport');
    XLSX.writeFile(wb, 'Patient_Registration_Report.xlsx');
  };


  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDateRangeSelection = (range) => {
    setIsPopupOpen(false);
    const today = new Date();
    let fromDateValue = new Date();

    switch (range) {
      case 'Today':
        setFromDate(today.toISOString().split('T')[0]);
        setToDate(today.toISOString().split('T')[0]);
        break;
      case 'Last 1 Week':
        fromDateValue.setDate(today.getDate() - 7);
        setFromDate(fromDateValue.toISOString().split('T')[0]);
        setToDate(today.toISOString().split('T')[0]);
        break;
      case 'Last 1 Month':
        fromDateValue.setMonth(today.getMonth() - 1);
        setFromDate(fromDateValue.toISOString().split('T')[0]);
        setToDate(today.toISOString().split('T')[0]);
        break;
      case 'Last 3 Months':
        fromDateValue.setMonth(today.getMonth() - 3);
        setFromDate(fromDateValue.toISOString().split('T')[0]);
        setToDate(today.toISOString().split('T')[0]);
        break;
      default:
        break;
    }
  };

  const filterData = (gender, query) => {
    let filteredData = reportsData;

    if (gender !== 'All') {
      filteredData = filteredData.filter(patient => patient.gender === gender);
    }

    if (query) {
      filteredData = filteredData.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredReportsData(filteredData);
  };

  const handleGenderChange = (event) => {
    const gender = event.target.value;
    setSelectedGender(gender);
    filterData(gender, searchQuery);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterData(selectedGender, query);
  };
  const handleShowReport = () => {
    if (!fromDate && !toDate) {
      // If both dates are empty, show all data
      setFilteredReportsData(reportsData);
      setShowReport(true);
      return;
    }

    if (!fromDate || !toDate) {
      alert("Please select both From and To date.");
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);
    to.setHours(23, 59, 59, 999); // Include the full day

    // Check if both dates are valid
    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      alert("Invalid date range!");
      return;
    }

    // Filter data based on date range
    const filteredData = reportsData.filter((patient) => {
      const registrationDate = new Date(patient.registrationDate);
      return registrationDate >= from && registrationDate <= to;
    });

    if (filteredData.length === 0) {
      alert("No data found for the selected date range!");
    }

    setFilteredReportsData(filteredData);
    setShowReport(true);
  };



  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛Patient Registration Report</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <label>To:</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            <button className="user-collection-report-fav-btn">☆</button>
            <button className="user-collection-report-fav-btn" onClick={handlePopupToggle}>-</button>

            {isPopupOpen && (
              <div className="user-collection-popup">
                <ul className="user-collection-popup-list">
                  <li onClick={() => handleDateRangeSelection('Today')}>Today</li>
                  <li onClick={() => handleDateRangeSelection('Last 1 Week')}>Last 1 Week</li>
                  <li onClick={() => handleDateRangeSelection('Last 1 Month')}>Last 1 Month</li>
                  <li onClick={() => handleDateRangeSelection('Last 3 Months')}>Last 3 Months</li>
                </ul>
              </div>
            )}
          </div>
          <div className="user-collection-report-gender-filter">
            <label>Gender:</label>
            <div className="gender-options">
              <label>
                <input type="radio" name="gender" value="Male" checked={selectedGender === 'Male'} onChange={handleGenderChange} />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="Female" checked={selectedGender === 'Female'} onChange={handleGenderChange} />
                Female
              </label>
              <label>
                <input type="radio" name="gender" value="All" checked={selectedGender === 'All'} onChange={handleGenderChange} />
                All
              </label>
            </div>
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
              placeholder="Search by Patient Name..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="user-collection-page-results-info">
              Showing {filteredReportsData.length}/{reportsData.length} results
            </div>

            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>

          <div className="user-collection-report-tab">
            <div className="table-scroll-container">
              <table className="patientList-table" ref={tableRef}>
                <thead>
                  <tr>
                    {["Registration Date ", "Patient Name", "Date of Birth", "Age", "Gender", "Phone Number", "Country", "Address", "Email", "Policy No"].map((header, index) => (
                      <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                        <div className="header-content">
                          <span>{header}</span>
                          <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredReportsData.length > 0 ? (
                    filteredReportsData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.registrationDate}</td>
                        <td>{`${row.firstName} ${row.lastName}`}</td>
                        <td>{row.dateOfBirth}</td>
                        <td>{row.age}</td>
                        <td>{row.gender}</td>
                        <td>{row.mobileNumber}</td>
                        <td>{row.country}</td>
                        <td>{row.address}</td>
                        <td>{row.emailId}</td>
                        <td>{row.policyNumber}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" style={{ textAlign: "center", fontWeight: "bold" }}>
                        No Patients Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegistrationReport;