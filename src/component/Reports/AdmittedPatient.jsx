import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./UserCollectionReport.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const AdmittedPatient = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [admittedPatients, setAdmittedPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const [selectedDateRange, setSelectedDateRange] = useState(""); // For selected date range
  const tableRef = useRef(null);



  const handlePrint = () => {
    const doc = new jsPDF("l", "mm", "a4");

    // Title
    doc.setFontSize(16);
    doc.text("Patient Census Report", doc.internal.pageSize.width / 2, 15, { align: "center" });

    // Current date/time
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 25);

    // Prepare table data
    const tableData = filteredPatients.map((patient) => [
      patient.ipAdmissionId || "N/A",
      patient.admissionDate || "N/A",
      `${patient.patient?.patient?.firstName || ""} ${patient.patient?.patient?.lastName || ""}`,
      patient.admissionUnderDoctorDetail?.consultantDoctor?.doctorName || "N/A",
      patient.roomDetails?.bedDTO?.roomNo || "N/A",
      patient.roomDetails?.bedDTO?.bedNo || "N/A",
      patient.admissionStatus || "N/A",
      patient.disAdvisedDate || "N/A",
      patient.noOfDays || "N/A",
    ]);

    // Table headers
    const headers = [
      "Admission No",
      "Admission Date",
      "Patient Name",
      "Doctor Name",
      "Ward Name",
      "Bed Code",
      "Admission Status",
      "Discharge Date",
      "No of Days",
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
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // Summary at the bottom
    const lastY = doc.lastAutoTable.finalY + 10;
    doc.text(`Total Admitted Patients: ${filteredPatients.length}`, 14, lastY);

    // Save or Print
    doc.save("Admitted_Patients_Report.pdf");
  };


  const handleExport = () => {
    console.log("Export function not yet implemented");
  };

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDateRangeSelection = (range) => {
    console.log("Selected Range:", range);
    setSelectedDateRange(range); // Set the selected date range
    setIsPopupOpen(false);
    filterPatientsByDate(range); // Call the filter function
  };

  const fetchAdmittedPatients = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ip-admissions/admitted`);
      if (response.data) {
        setAdmittedPatients(response.data);
        setFilteredPatients(response.data); // Initially, all patients are shown
      }
    } catch (error) {
      console.error("Error fetching admitted patients:", error);
    }
  };

  const filterPatientsByDate = (range) => {
    const filtered = admittedPatients.filter((patient) => {
      const admissionDate = new Date(patient.admissionDate);
      const today = new Date();
      let startDate = new Date(today);
      let endDate = new Date(today);

      switch (range) {
        case "Today":
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(23, 59, 59, 999);
          break;
        case "Last 1 Week":
          startDate.setDate(today.getDate() - 7);
          break;
        case "Last 1 Month":
          startDate.setMonth(today.getMonth() - 1);
          break;
        case "Last 3 Months":
          startDate.setMonth(today.getMonth() - 3);
          break;
        default:
          return true;
      }

      return admissionDate >= startDate && admissionDate <= endDate;
    });

    setFilteredPatients(filtered);
  };

  const handleShowReport = () => {
    setShowReport(true);
    fetchAdmittedPatients();
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = admittedPatients.filter(patient =>
      `${patient.patient?.patient?.firstName || ""} ${patient.patient?.patient?.lastName || ""}`.toLowerCase().includes(query)
    );
    setFilteredPatients(filtered);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Total Admitted Patients Report</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input type="date" />
            <label>To:</label>
            <input type="date" />
            {/* <button className="user-collection-report-fav-btn">☆</button> */}
            {/* <button className="user-collection-report-fav-btn" onClick={handlePopupToggle}>-</button> */}

            {/* {isPopupOpen && (
              <div className="user-collection-popup">
                <ul className="user-collection-popup-list">
                  <li onClick={() => handleDateRangeSelection("Today")}>Today</li>
                  <li onClick={() => handleDateRangeSelection("Last 1 Week")}>Last 1 Week</li>
                  <li onClick={() => handleDateRangeSelection("Last 1 Month")}>Last 1 Month</li>
                  <li onClick={() => handleDateRangeSelection("Last 3 Months")}>Last 3 Months</li>
                </ul>
              </div>
            )} */}
          </div>
          <button className="user-collection-report-show-btn" onClick={handleShowReport}>
            Show Report
          </button>
        </div>
      </div>

      {showReport && (
        <>
          <div className="user-collection-report-controls">
            <input
              type="text"
              className="user-collection-report-search"
              placeholder="Search..."
              onChange={handleSearch} // Using handleSearch to filter patients
            />
            <div className="user-collection-page-results-info">
              Showing {filteredPatients.length} results
            </div>
            <button className="user-collection-report-print-btn" onClick={handlePrint}>
              Print
            </button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>
              Export
            </button>
          </div>

          <div className="user-collection-report-tab">
            <table className="patientList-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Admitted Date",
                    "IP Number",
                    "Patient Name",
                    "Age/Sex",
                    "Admitting Doc",
                    "Room Code",
                    "Bed Code",
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
                {filteredPatients.map((row, index) => (
                  <tr key={index}>
                    <td>{row.admissionDate || "N/A"}</td>
                    <td>{row.patient?.patient?.uhid || "N/A"}</td>
                    <td>{`${row.patient?.patient?.firstName || ""} ${row.patient?.patient?.lastName || ""}`}</td>
                    <td>{`${row.patient?.patient?.age || ""}Y`}</td>
                    <td>{row.admissionUnderDoctorDetail?.consultantDoctor?.doctorName || "N/A"}</td>
                    <td>{row.roomDetails?.bedDTO?.roomNo || "N/A"}</td>
                    <td>{row.roomDetails?.bedDTO?.bedNo || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div className="user-collection-report-page-no">
              <Button className="user-collection-report-pagination-btn">First</Button>
              <Button className="user-collection-report-pagination-btn">Previous</Button>
              <span>Page 1 of 1</span>
              <Button className="user-collection-report-pagination-btn">Next</Button>
              <Button className="user-collection-report-pagination-btn">Last</Button>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default AdmittedPatient;
