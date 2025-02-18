/* Ajhar Tamboli sSIStock.jsx 19-09-24 */

import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx"; // Import the xlsx library
import "../SSInventory/sSIStock.css";

import SSIInventoryRequisition from "./sSIInventoryRequisition";
import SSIConsumption from "./sSIConsumption";
import SSIReports from "./sSIReports";
import SSIPatientConsumption from "./sSIPatientConsumption";
import SSIReturn from "./sSIReturn";
import SSPharmacyNInven from "../SSPharmacy/sSPharmacyNInven";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../api/api";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";
import { useFilter } from "../../../ShortCuts/useFilter";
function SSIStock() {
  const { store } = useParams();
  const [activeTab, setActiveTab] = useState("Stock");
  const [requisitions, setRequisitions] = useState([]);
  const [filteredRequisitions, setFilteredRequisitions] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc'); // Added sort direction state
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [searchTerm, setSearchTerm] = useState("");

  const [columnWidths, setColumnWidths] = useState({});

  const tableRef = useRef(null);
  // Function to export the table to Excel
  const exportTableToExcel = () => {
    const table = document.querySelector("table"); // Get the table element
    const workbook = XLSX.utils.table_to_book(table); // Convert the table to a workbook
    XLSX.writeFile(workbook, "SSIStockData.xlsx"); // Export the workbook as an Excel file
  };

  // Function to print specific elements: table, FromDate, ToDate, and current date and time
  // Function to trigger print
  const printList = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;

      // Create an iframe element
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      // Append the iframe to the body
      document.body.appendChild(iframe);

      // Write the table content into the iframe's document
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
        <head>
          <title>Print Table</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            button, .admit-actions, th:nth-child(10), td:nth-child(10) {
              display: none;
            }
            
          </style>
        </head>
        <body>
          <table>
            ${printContents}
          </table>
        </body>
        </html>
      `);
      doc.close();

      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      document.body.removeChild(iframe);
    }
  };

  useEffect(() => {
    // Fetch data from API
    fetch(`${API_BASE_URL}/inventory-requisitions/received?subStoreId=${store}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRequisitions(data);
        // Filter requisitions with status 'Approved'
        // setFilteredRequisitions(data.filter(req => req.status === 'Approved'));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [store, sortDirection]); // Sort direction as a dependency

  // Function to handle sorting
  const toggleSortDirection = () => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  // Function to handle search
  // const handleSearch = (event) => {
  //   const query = event.target.value;
  //   setSearchQuery(query);
  //   const filtered = requisitions.filter(req =>
  //     req.itemName.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setFilteredRequisitions(filtered);
  // };
  const handleSearch = (event) => {

    const query = event.target.value;
    setSearchQuery(query);
    const filtered = requisitions.filter((req) =>
      req.itemName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRequisitions(filtered);
  };
  const requisitionsData = useFilter(requisitions, searchTerm);



  const renderContent = () => {
    switch (activeTab) {
      case "Stock":
        return (
          <div className="sSIStock-content">
            {/* Stock content goes here */}
            <div className="sSIStock-filters">
              {/* <div className="sSIStock-filter">
                <label><i className="fa-solid fa-filter"></i> Filter by Store:</label>
                <select>
                  <option value="">ALL</option>
                  <option value="GENERAL-INVENTORY">GENERAL-INVENTORY</option>
                </select>
              </div> */}
              {/* <div className="sSIStock-filter">
                <label><i className="fa-solid fa-filter"></i> Filter by SubCategory:</label>
                <select>
                  <option value="">All</option>
                  <option value="tissue">tissue</option>
                  <option value="cotton">cotton</option>
                  <option value="soap">soap</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Labs">Labs</option>
                  <option value="Pharmacy">Pharmacy</option>
                </select>
              </div> */}
              {/* <div className="sSIStock-legend">
                <div><span className="sSIStock-dot sSIStock-red"></span> Zero Quantity</div>
                <div><span className="sSIStock-dot sSIStock-gray"></span> Below MinStockQuantity</div>
              </div> */}
            </div>
            <div className="sSIStock-search-N-result">
              <div className="sSIStock-search-bar">


                <FloatingInput
                  label={"Search"}
                  type="search"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="sSIStock-results-header">
                <span>
                  Showing {requisitions.length} / {requisitions.length} results
                </span>
                <div>
                  <button
                    className="sSIStock-btn-blue"
                    onClick={exportTableToExcel}
                  >
                    <i className="fa-solid fa-file-excel"></i> Export
                  </button>
                  <button className="sSIStock-btn-blue" onClick={printList}>
                    <i className="fa-solid fa-print"></i> Print
                  </button>
                  {/* <button className="sSIStock-btn-blue" onClick={toggleSortDirection}>
                    Sort by Store ({sortDirection === 'asc' ? 'Asc' : 'Desc'})
                  </button> */}
                </div>
              </div>
            </div>
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Item Code",
                    "SubCategory",
                    "Item Name",
                    "Unit",
                    "Available Qty",
                    "Item Type",
                    "Store",
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
                {requisitionsData.length > 0 ? (
                  requisitionsData.map((req, index) => (
                    <tr key={index}>
                      <td>{req?.item?.itemCode}</td>
                      <td>{req?.item?.subCategory?.subCategoryName}</td>
                      <td>{req?.item?.itemName}</td>
                      <td>{req?.item?.unitOfMeasurement?.name}</td>
                      <td>{req?.dispatchQuantity}</td>
                      <td>{req?.item?.subCategory?.subCategoryName}</td>
                      <td>{store}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="sSIStock-no-data">
                      No Rows To Show
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* <div className="sSIStock-pagination">
              <span>0 to {filteredRequisitions.length} of {filteredRequisitions.length}</span>
              <button>First</button>
              <button>Previous</button>
              <span>Page 1 of 1</span>
              <button>Next</button>
              <button>Last</button>
            </div> */}
          </div>
        );
      case "Inventory Requisition":
        return <SSIInventoryRequisition />;
      case "Consumption":
        return <SSIConsumption />;
      case "Reports":
        return <SSIReports />;
      case "Patient Consumption":
        return <SSIPatientConsumption />;
      case "Return":
        return <SSIReturn />;
      default:
        return null;
    }
  };

  return (
    <div className="sSIStock-container">
      <SSPharmacyNInven />
      <nav>
        <ul>
          <li
            className={activeTab === "Stock" ? "sSIStock-container-active" : ""}
            onClick={() => setActiveTab("Stock")}
          >
            Stock
          </li>
          <li
            className={
              activeTab === "Inventory Requisition"
                ? "sSIStock-container-active"
                : ""
            }
            onClick={() => setActiveTab("Inventory Requisition")}
          >
            Inventory Requisition
          </li>
          <li
            className={
              activeTab === "Consumption" ? "sSIStock-container-active" : ""
            }
            onClick={() => setActiveTab("Consumption")}
          >
            Consumption
          </li>
          <li
            className={
              activeTab === "Reports" ? "sSIStock-container-active" : ""
            }
            onClick={() => setActiveTab("Reports")}
          >
            Reports
          </li>
          <li
            className={
              activeTab === "Patient Consumption"
                ? "sSIStock-container-active"
                : ""
            }
            onClick={() => setActiveTab("Patient Consumption")}
          >
            Patient Consumption
          </li>
          <li
            className={
              activeTab === "Return" ? "sSIStock-container-active" : ""
            }
            onClick={() => setActiveTab("Return")}
          >
            Return
          </li>
        </ul>
      </nav>
      {renderContent()}
    </div>
  );
}

export default SSIStock;
