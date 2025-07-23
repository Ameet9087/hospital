import React, { useState, useRef } from "react";
import "./pendingItem.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

function PendingItemList() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fromDate, setFromDate] = useState("2024-08-12");
  const [toDate, setToDate] = useState("2024-08-12");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for Modal visibility
  const [selectedItem, setSelectedItem] = useState(null);

  // Dummy data for the hospital table
  const dummyData = [
    {
      requestDate: "2024-08-10",
      itemName: "Syringes Pack",
      code: "SP123",
      tagNumber: "TAG001",
      requestFrom: "Emergency Department",
      requestedBy: "Dr. John Smith",
    },
    {
      requestDate: "2024-08-11",
      itemName: "MRI Machine",
      code: "MRI456",
      tagNumber: "TAG002",
      requestFrom: "Radiology",
      requestedBy: "Sarah Connor",
    },
    {
      requestDate: "2024-08-12",
      itemName: "IV Fluids",
      code: "IV789",
      tagNumber: "TAG003",
      requestFrom: "ICU",
      requestedBy: "Dr. Emma Williams",
    },
    {
      requestDate: "2024-08-13",
      itemName: "Blood Pressure Monitors",
      code: "BP101",
      tagNumber: "TAG004",
      requestFrom: "Cardiology",
      requestedBy: "Nurse James Doe",
    },
    {
      requestDate: "2024-08-14",
      itemName: "Surgical Gloves",
      code: "SG202",
      tagNumber: "TAG005",
      requestFrom: "Surgery Department",
      requestedBy: "Dr. Emily Johnson",
    },
    {
      requestDate: "2024-08-14",
      itemName: "Surgical Gloves",
      code: "SG202",
      tagNumber: "TAG005",
      requestFrom: "Surgery Department",
      requestedBy: "Dr. Emily Johnson",
    },
    {
      requestDate: "2024-08-14",
      itemName: "Surgical Gloves",
      code: "SG202",
      tagNumber: "TAG005",
      requestFrom: "Surgery Department",
      requestedBy: "Dr. Emily Johnson",
    },
    {
      requestDate: "2024-08-14",
      itemName: "Surgical Gloves",
      code: "SG202",
      tagNumber: "TAG005",
      requestFrom: "Surgery Department",
      requestedBy: "Dr. Emily Johnson",
    },
    {
      requestDate: "2024-08-14",
      itemName: "Surgical Gloves",
      code: "SG202",
      tagNumber: "TAG005",
      requestFrom: "Surgery Department",
      requestedBy: "Dr. Emily Johnson",
    },
    {
      requestDate: "2024-08-14",
      itemName: "Surgical Gloves",
      code: "SG202",
      tagNumber: "TAG005",
      requestFrom: "Surgery Department",
      requestedBy: "Dr. Emily Johnson",
    },
    {
      requestDate: "2024-08-14",
      itemName: "Surgical Gloves",
      code: "SG202",
      tagNumber: "TAG005",
      requestFrom: "Surgery Department",
      requestedBy: "Dr. Emily Johnson",
    },
    {
      requestDate: "2024-08-14",
      itemName: "Surgical Gloves",
      code: "SG202",
      tagNumber: "TAG005",
      requestFrom: "Surgery Department",
      requestedBy: "Dr. Emily Johnson",
    },
    {
      requestDate: "2024-08-14",
      itemName: "Surgical Gloves",
      code: "SG202",
      tagNumber: "TAG005",
      requestFrom: "Surgery Department",
      requestedBy: "Dr. Emily Johnson",
    },
    {
      requestDate: "2024-08-14",
      itemName: "Surgical Gloves",
      code: "SG202",
      tagNumber: "TAG005",
      requestFrom: "Surgery Department",
      requestedBy: "Dr. Emily Johnson",
    },
    {
      requestDate: "2024-08-14",
      itemName: "Surgical Gloves",
      code: "SG202",
      tagNumber: "TAG005",
      requestFrom: "Surgery Department",
      requestedBy: "Dr. Emily Johnson",
    },
    {
      requestDate: "2024-08-14",
      itemName: "Surgical Gloves",
      code: "SG202",
      tagNumber: "TAG005",
      requestFrom: "Surgery Department",
      requestedBy: "Dr. Emily Johnson",
    },
    {
      requestDate: "2024-08-14",
      itemName: "Surgical Gloves",
      code: "SG202",
      tagNumber: "TAG005",
      requestFrom: "Surgery Department",
      requestedBy: "Dr. Emily Johnson",
    },
  ];

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

  const handleViewClick = (item) => {
    setSelectedItem(item); // Set the selected item details
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null); // Clear selected item on close
  };

  return (
    <div className="pendingItem-main">
      <form className="pendingItem-form">
        <div className="pendingItem-form-input-group">
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
            className="pendingItem-dash-btn"
            onClick={handleDashClick}
          >
            -
          </button>
          {isDropdownOpen && (
            <div className="pendingItem-dropdown">
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
          <button className="pendingItem-star-btn">☆</button>
          <button className="pendingItem-ok-btn">Ok</button>
        </div>
      </form>

      <div className="pendingItem-search">
        <div className="pendingItem-search-bar">
          <input type="text" placeholder="Search" />
          <i className="fas fa-search"></i>
        </div>
        <div className="pendingItem-results">
          <span>
            Showing {dummyData.length} / {dummyData.length} results
          </span>
          <button className="pendingItem-export-btn">Export</button>
          <button className="pendingItem-print-btn">Print</button>
        </div>
      </div>

      <div className="table-container">
        <table className="pendingItem-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Request Date",
                "Item Name",
                "Code",
                "Tag Number",
                "Request From",
                "Requested By",
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
            {dummyData.map((item, index) => (
              <tr key={index}>
                <td>{item.requestDate}</td>
                <td>{item.itemName}</td>
                <td>{item.code}</td>
                <td>{item.tagNumber}</td>
                <td>{item.requestFrom}</td>
                <td>{item.requestedBy}</td>
                <td>
                  <button
                    className="pendingItem-action-btn"
                    onClick={() => handleViewClick(item)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-content">
            <h3>Item Details</h3>
            {selectedItem && (
              <>
                <p>
                  <strong>Item Name:</strong> {selectedItem.itemName}
                </p>
                <p>
                  <strong>Requested By:</strong> {selectedItem.requestedBy}
                </p>
                {/* Add more details as needed */}
              </>
            )}
            <div className="custom-modal-buttons">
              <button
                onClick={handleCloseModal}
                className="custom-modal-close-btn"
              >
                Close
              </button>
              <button
                onClick={handleCloseModal}
                className="custom-modal-confirm-btn"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingItemList;
