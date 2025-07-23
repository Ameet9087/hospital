import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import axios for API calls
import "./UserCollectionReport.css";
import { API_BASE_URL } from "../api/api";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";

const Schemedetails = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showTable, setShowTable] = useState(false); // State to control table visibility
  const [fromDate, setFromDate] = useState(""); // State to store the "from" date
  const [toDate, setToDate] = useState(""); // State to store the "to" date
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [reportData, setReportData] = useState([]); // State to store fetched report data
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState({});

  useEffect(() => {
    // Fetch data from API when the component mounts
    axios
      .get(`${API_BASE_URL}/ip-admissions/scheme-detail-invoice`)
      .then((response) => {
        setReportData(response.data); // Set the fetched data into state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDateRangeSelection = (range) => {
    console.log(`Selected date range: ${range}`);
    setIsPopupOpen(false); // Close the popup after selection
  };

  const handleShowReport = () => {
    console.log("Show Report clicked");
    setShowTable(true); // Show table when button is clicked
    filterData(); // Apply the filter as soon as the table is shown
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterData(e.target.value);
  };

  const filterData = (searchTerm = searchQuery) => {
    let filtered = reportData;

    // Filter by date range
    if (fromDate && toDate) {
      filtered = filtered.filter((item) => {
        const admissionDate = new Date(item.admissionDate);
        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);
        return admissionDate >= startDate && admissionDate <= endDate;
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.cardHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.organisationName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">
          ⚛ Scheme Detail(Invoice) Report
        </h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={handleFromDateChange}
            />
            <label>To:</label>
            <input
              type="date"
              value={toDate}
              onChange={handleToDateChange}
            />
            {/* <button className="user-collection-report-fav-btn">☆</button>
            <button
              className="user-collection-report-fav-btn"
              onClick={handlePopupToggle}
            >
              {isPopupOpen ? "-" : "+"}
            </button> */}

            {isPopupOpen && (
              <div className="user-collection-popup">
                <ul className="user-collection-popup-list">
                  <li onClick={() => handleDateRangeSelection("Today")}>
                    Today
                  </li>
                  <li onClick={() => handleDateRangeSelection("Last 1 Week")}>
                    Last 1 Week
                  </li>
                  <li onClick={() => handleDateRangeSelection("Last 1 Month")}>
                    Last 1 Month
                  </li>
                  <li onClick={() => handleDateRangeSelection("Last 3 Months")}>
                    Last 3 Months
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="user-collection-report-advance-filter">
            <button
              className="user-collection-report-show-btn"
              onClick={handleShowReport}
            >
              Show Report
            </button>
          </div>
        </div>
        <br />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Conditionally Render the Table */}
      {showTable && (
        <div className="user-collection-report-table">
          <table ref={tableRef} className="patientList-table">
            <thead>
              <tr>
                {[
                  "Type", "First Name", "Last Name", "Age", "Sex", "Admission ID",
                  "Admission Date", "Card Holder", "Referred By", "Card Holder Name",
                  "Organization", "Total Billing"
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
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.type}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.age}</td>
                    <td>{item.sex}</td>
                    <td>{item.ipAdmissionId}</td>
                    <td>{item.admissionDate}</td>
                    <td>{item.cardHolder}</td>
                    <td>{item.referredBy}</td>
                    <td>{item.cardHolderName}</td>
                    <td>{item.organisationName}</td>
                    <td>{item.totalBilling}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12">No data available for the selected filters</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Schemedetails;
