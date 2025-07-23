import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./SettingTerm.css";
import * as XLSX from "xlsx";
// import ReturnForm from './ReturnForm';
import AddBreakageItem from "./AddBreakeageItem";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";

const StoreBreakageItem = () => {
  const [breakageItems, setBreakageItems] = useState([]); // State for breakage items
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered breakage items
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const [fromDate, setFromDate] = useState("2024-08-15"); // State for "From" date
  const [toDate, setToDate] = useState("2024-08-22"); // State for "To" date
  const tableRef = useRef(null);

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get(`${API_BASE_URL}/breakage-items`)
      .then((response) => {
        if (response.data) {
          console.log(response.data);

          setBreakageItems(response.data); // Update state with fetched data
          setFilteredItems(response.data); // Initially show all items
        }
      })
      .catch((error) => {
        console.error("Error fetching breakage items:", error);
      });
  }, []); // Empty dependency array ensures this runs only once

  // Function to handle adding breakage item
  const handleAddBreakageClick = () => setShowReturnForm(true);

  // Function to handle closing the return form
  const handleCloseReturnForm = () => setShowReturnForm(false);

  // Function to handle export to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BreakageItemsReport");
    XLSX.writeFile(wb, "BreakageItemsReport.xlsx");
  };

  // Function to handle printing
  const handlePrint = () => {
    const printContent = tableRef.current;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };
  
  // Function to filter breakage items based on selected date range
  const filterByDate = () => {
    const filtered = breakageItems.filter((item) => {
      const itemDate = new Date(item.breakageDate);
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return itemDate >= from && itemDate <= to;
    });
    setFilteredItems(filtered); // Update filtered items state
  };

  // Handle change in "From" date
  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
    filterByDate(); // Filter when "From" date is changed
  };

  // Handle change in "To" date
  const handleToDateChange = (e) => {
    setToDate(e.target.value);
    filterByDate(); // Filter when "To" date is changed
  };

  return (
    <div className="setting-terms-container">
      <button
        className="setting-terms-add-terms-btn"
        onClick={handleAddBreakageClick}
      >
        Add Breakage Item
      </button>
      <div className="return-to-supplier-date-filter-container">
        <div className="return-to-supplier-date-filter">
          <label>From:</label>
          <input
            type="date"
            className="return-to-supplier-input-date"
            value={fromDate}
            onChange={handleFromDateChange} // Set the "From" date
          />
        </div>

        <div className="return-to-supplier-date-filter">
          <label>To:</label>
          <input
            type="date"
            className="return-to-supplier-input-date"
            value={toDate}
            onChange={handleToDateChange} // Set the "To" date
          />
        </div>
      </div>
      <div className="setting-terms-search-container">
        <input type="text" placeholder="Search" className="setting-terms-search-container-search-input" />
      </div>
      <div className="setting-supplier-span">
        <span>Showing {filteredItems.length} results</span>
        <button className="item-wise-export-button" onClick={handleExport}>
          Export
        </button>
        <button className="item-wise-print-button" onClick={handlePrint}>
          Print
        </button>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Breakage Date",
                "Breakage Id",
                "Total Qty",
                "Sub total",
                "Discount Amount",
                "VAT Amount",
                "Total Amount",
                "Remark"
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
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <tr key={index}>
                  <td>{item?.breakageDate}</td>
                  <td>{item?.breakageItemId}</td>
                  <td>{item?.breakageItemLists[0]?.qty}</td>
                  <td>{item?.subTotal}</td>
                  <td>{item?.discountAmt}</td>
                  <td>{item?.vatPercent}</td>
                  <td>{item?.totalAmount}</td>
                  <td>{item?.remark}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="setting-terms-no-rows">
                  No Rows To Show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showReturnForm && (
        <div className="return-form-overlay-model">
          <div className="return-form-container-com">
            <AddBreakageItem />
            <button
              className="return-form-com-close-btn"
              onClick={handleCloseReturnForm}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreBreakageItem;
