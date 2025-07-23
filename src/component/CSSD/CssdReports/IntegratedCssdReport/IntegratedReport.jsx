import React, { useState, useRef, useEffect } from "react";
import "./Integratedreport.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

function IntegratedReport() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fromDate, setFromDate] = useState("2024-08-12");
  const [toDate, setToDate] = useState("2024-08-12");
  const [disinfectionMethod, setDisinfectionMethod] = useState("All");
  const [substore, setSubstore] = useState("All stores");
  const [searchResults, setSearchResults] = useState([]);

  const dummyData = [
    {
      requestDate: "2024-08-01",
      itemName: "Surgical Kit",
      code: "SK001",
      tagNumber: "T12345",
      requestFrom: "Brain Operation Store",
      requestedBy: "Dr. Smith",
      disinfectant: "AutoClave",
      disinfectedDate: "2024-08-02",
      disinfectedBy: "Technician A",
    },
    {
      requestDate: "2024-08-05",
      itemName: "IV Fluids",
      code: "IVF002",
      tagNumber: "T12346",
      requestFrom: "ICU sub store",
      requestedBy: "Nurse John",
      disinfectant: "Chemical Disinfection",
      disinfectedDate: "2024-08-06",
      disinfectedBy: "Technician B",
    },
    {
      requestDate: "2024-08-10",
      itemName: "Catheter",
      code: "CT003",
      tagNumber: "T12347",
      requestFrom: "Female ward Substore",
      requestedBy: "Dr. Jane",
      disinfectant: "Microwave",
      disinfectedDate: "2024-08-11",
      disinfectedBy: "Technician C",
    },
    {
      requestDate: "2024-08-08",
      itemName: "Syringe",
      code: "SY004",
      tagNumber: "T12348",
      requestFrom: "Accounts",
      requestedBy: "Pharmacist Doe",
      disinfectant: "AutoClave",
      disinfectedDate: "2024-08-09",
      disinfectedBy: "Technician D",
    },
  ];

  useEffect(() => {
    filterData();
  }, [disinfectionMethod, substore]);

  const filterData = () => {
    const filteredData = dummyData.filter((item) => {
      const matchesDisinfectionMethod =
        disinfectionMethod === "All" ||
        item.disinfectant === disinfectionMethod;
      const matchesSubstore =
        substore === "All stores" || item.requestFrom === substore;
      return matchesDisinfectionMethod && matchesSubstore;
    });
    setSearchResults(filteredData);
  };

  const handleDashClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    const currentDate = new Date();
    let newFromDate = new Date();

    if (option === "Last 1 Week") {
      newFromDate.setDate(currentDate.getDate() - 7);
    } else if (option === "Last 1 Month") {
      newFromDate.setMonth(currentDate.getMonth() - 1);
    } else if (option === "Last 3 Months") {
      newFromDate.setMonth(currentDate.getMonth() - 3);
    }

    setFromDate(newFromDate.toISOString().split("T")[0]);
    setToDate(currentDate.toISOString().split("T")[0]);
    setIsDropdownOpen(false);
  };

  return (
    <div className="IntegratedCssdReport-main">
      <form>
        <div className="IntegratedCssdReport-options">
          <div className="IntegratedCssdReport-option">
            <label>Disinfection Method:</label>
            <select
              value={disinfectionMethod}
              onChange={(e) => setDisinfectionMethod(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Chemical Disinfection">
                Chemical Disinfection
              </option>
              <option value="AutoClave">AutoClave</option>
              <option value="Microwave">Microwave</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="IntegratedCssdReport-option">
            <label>Substore:</label>
            <select
              value={substore}
              onChange={(e) => setSubstore(e.target.value)}
            >
              <option value="All stores">All stores</option>
              <option value="Accounts">Accounts</option>
              <option value="Brain Operation Store">
                Brain Operation Store
              </option>
              <option value="Female ward Substore">Female ward Substore</option>
              <option value="ICU sub store">ICU sub store</option>
            </select>
          </div>
        </div>
        <div className="IntegratedCssdReport-form">
          <div className="IntegratedCssdReport-form-input-group">
            <label>From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <label>To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
            <button
              type="button"
              className="IntegratedCssdReport-dash-btn"
              onClick={handleDashClick}
            >
              -
            </button>
            {isDropdownOpen && (
              <div className="IntegratedCssdReport-dropdown-options">
                <div onClick={() => handleOptionClick("Last 1 Week")}>
                  Last 1 Week
                </div>
                <div onClick={() => handleOptionClick("Last 1 Month")}>
                  Last 1 Month
                </div>
                <div onClick={() => handleOptionClick("Last 3 Months")}>
                  Last 3 Months
                </div>
              </div>
            )}
            <button className="IntegratedCssdReport-star-btn">☆</button>
            <button className="IntegratedCssdReport-ok-btn">Ok</button>
          </div>
        </div>
      </form>

      <div className="IntegratedCssdReport-search">
        <div className="IntegratedCssdReport-search-bar">
          <input type="text" placeholder="Search" />
          <i className="fas fa-search"></i>
        </div>
        <div className="IntegratedCssdReport-results">
          <span>
            Showing {searchResults.length} / {dummyData.length} results
          </span>
          <button className="IntegratedCssdReport-export-btn">Export</button>
          <button className="IntegratedCssdReport-print-btn">Print</button>
        </div>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Request Date",
                "Item Name",
                "Code",
                "Tag Number",
                "Request From",
                "Requested By",
                "Disinfectant",
                "Disinfected Date",
                "Disinfected By",
                "Action",
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
            {searchResults.length > 0 ? (
              searchResults.map((item, index) => (
                <tr key={index}>
                  <td>{item.requestDate}</td>
                  <td>{item.itemName}</td>
                  <td>{item.code}</td>
                  <td>{item.tagNumber}</td>
                  <td>{item.requestFrom}</td>
                  <td>{item.requestedBy}</td>
                  <td>{item.disinfectant}</td>
                  <td>{item.disinfectedDate}</td>
                  <td>{item.disinfectedBy}</td>
                  <td>Action</td>
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
    </div>
  );
}

export default IntegratedReport;
