import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx"; // Import the xlsx library
import "../BloodIssue/bloodIssue.css";
import { useReactToPrint } from "react-to-print";
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";

function BloodIssue() {
  const printRef = useRef();
  const [stockData, setStockData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    fetchStockData();
  }, []);

  useEffect(() => {
    filterData();
  }, [stockData, searchTerm, dateRange]);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/bloodIssue/getAllIssue`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const mappedData = data.map((item) => ({
        issueId: item.issueId,
        bloodGroup: item.bloodGroup,
        unitsIssued: item.unitsIssued,
        issueDate: item.issueDate,
        issuedBy: item.issuedBy,
        status: item.status,
        requestId: item.bloodRequestDTO?.requestId,
        firstName: item.bloodRequestDTO?.patientDTO?.firstName || "N/A",
        inPatientId: item.bloodRequestDTO?.patientDTO?.inPatientId || "N/A",
        contactInfo: item.bloodRequestDTO?.contactInformation || "N/A",
      }));

      setStockData(mappedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const filterData = () => {
    let filtered = [...stockData];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range
    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter((item) => {
        const issueDate = new Date(item.issueDate);
        const fromDate = new Date(dateRange.from);
        const toDate = new Date(dateRange.to);

        return issueDate >= fromDate && issueDate <= toDate;
      });
    }

    setFilteredData(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Blood Issue Report",
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  const handleExportToExcel = () => {
    const tableData = [
      [
        "Issue ID",
        "Patient ID",
        "Patient Name",
        "Contact Info",
        "Request ID",
        "Blood Group",
        "Units Issued",
        "Issue Date",
        "Issued By",
        "Status",
      ],
      ...filteredData.map((item) => [
        item.issueId,
        item.inPatientId,
        item.firstName,
        item.contactInfo,
        item.requestId,
        item.bloodGroup,
        item.unitsIssued,
        item.issueDate,
        item.issuedBy,
        item.status,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "BloodIssue_Report.xlsx");
  };

  return (
    <div className="bloodIssue-container">
      <header className="bloodIssue-header">
        <div className="bloodIssue-status-filters">
          <h4>
            <i className="fa-solid fa-star-of-life"></i>Blood Issue:
          </h4>
        </div>
      </header>

      <div className="bloodIssue-controls">
        <div className="bloodIssue-date-range">
          <label>
            From:
            <input
              type="date"
              name="from"
              value={dateRange.from}
              onChange={handleDateChange}
            />
          </label>
          <label>
            To:
            <input
              type="date"
              name="to"
              value={dateRange.to}
              onChange={handleDateChange}
            />
          </label>
        </div>

        <div className="bloodIssue-filter">
          <button
            className="bloodIssue-print-btn"
            onClick={() => {
              fetchStockData();
            }}
          >
            Show Report
          </button>
        </div>
      </div>

      <div className="bloodIssue-search-N-results">
        <div className="bloodIssue-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="bloodIssue-results-info">
          Showing {filteredData.length} results
          <button
            className="bloodIssue-print-btn"
            onClick={handleExportToExcel}
          >
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button className="bloodIssue-print-btn" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div style={{ display: "none" }}>
        <div ref={printRef}>
          <h2>Blood Issue Report</h2>
          <p>Printed On: {new Date().toLocaleString()}</p>
          {/* <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Issue ID",
                  "Patient ID",
                  "Patient Name",
                  "Contact Info",
                  "Request ID",
                  "Blood Group",
                  "Units Issued",
                  "Issue Date",
                  "Issued By",
                  "Status",
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
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.issueId}</td>
                  <td>{item.inPatientId}</td>
                  <td>{item.firstName}</td>
                  <td>{item.contactInfo}</td>
                  <td>{item.requestId}</td>
                  <td>{item.bloodGroup}</td>
                  <td>{item.unitsIssued}</td>
                  <td>{item.issueDate}</td>
                  <td>{item.issuedBy}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>

      <div className="bloodIssue-table">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Issue ID",
                "Patient ID",
                // "Patient Name",
                "Contact Info",
                "Request ID",
                "Blood Group",
                "Units Issued",
                "Issue Date",
                "Issued By",
                "Status",

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
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.issueId}</td>
                <td>{item.inPatientId}</td>
                {/* <td>{item.firstName}</td> */}
                <td>{item.contactInfo}</td>
                <td>{item.requestId}</td>
                <td>{item.bloodGroup}</td>
                <td>{item.unitsIssued}</td>
                <td>{item.issueDate}</td>
                <td>{item.issuedBy}</td>
                <td>{item.status}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BloodIssue;
