import React, { useState, useRef } from "react";
import "./FinalizedItem.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

function FinalizedItemList() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fromDate, setFromDate] = useState("2024-08-12");
  const [toDate, setToDate] = useState("2024-08-12");

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

  // Dummy data for finalized items
  const finalizedItems = [
    {
      requestDate: "2024-08-01",
      itemName: "Syringe",
      code: "MED001",
      tagNumber: "TG1234",
      requestFrom: "Emergency Department",
      requestedBy: "Dr. Smith",
      disinfectant: "Alcohol",
      disinfectedDate: "2024-08-02",
      disinfectedBy: "Nurse Nancy",
      action: "Approved",
    },
    {
      requestDate: "2024-08-03",
      itemName: "Gloves",
      code: "MED002",
      tagNumber: "TG1235",
      requestFrom: "Surgery Department",
      requestedBy: "Dr. Brown",
      disinfectant: "UV Sterilization",
      disinfectedDate: "2024-08-04",
      disinfectedBy: "Nurse Karen",
      action: "Approved",
    },
    {
      requestDate: "2024-08-05",
      itemName: "Scalpel",
      code: "MED003",
      tagNumber: "TG1236",
      requestFrom: "ICU",
      requestedBy: "Dr. Wilson",
      disinfectant: "Chemical Solution",
      disinfectedDate: "2024-08-06",
      disinfectedBy: "Nurse Lisa",
      action: "Pending",
    },
    {
      requestDate: "2024-08-07",
      itemName: "Stethoscope",
      code: "MED004",
      tagNumber: "TG1237",
      requestFrom: "Pediatrics",
      requestedBy: "Dr. Adams",
      disinfectant: "Alcohol",
      disinfectedDate: "2024-08-08",
      disinfectedBy: "Nurse Ben",
      action: "Approved",
    },
  ];

  return (
    <div className="FinalizedItem-main">
      <form className="FinalizedItem-form">
        <div className="FinalizedItem-form-input-group">
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
            className="FinalizedItem-dash-btn"
            onClick={handleDashClick}
          >
            -
          </button>
          {isDropdownOpen && (
            <div className="FinalizedItem-dropdown">
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
          <button className="FinalizedItem-star-btn">☆</button>
          <button className="FinalizedItem-ok-btn">Ok</button>
        </div>
      </form>

      <div className="FinalizedItem-search">
        <div className="FinalizedItem-search-bar">
          <input type="text" placeholder="Search" />
          <i className="fas fa-search"></i>
        </div>
        <div className="FinalizedItem-results">
          <span>
            Showing {finalizedItems.length} / {finalizedItems.length} results
          </span>
          <button className="FinalizedItem-export-btn">Export</button>
          <button className="FinalizedItem-print-btn">Print</button>
        </div>
      </div>

      <div className="table-container">
        <table className="FinalizedItem-table" ref={tableRef}>
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
            {finalizedItems.map((item, index) => (
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
                <td>{item.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FinalizedItemList;
