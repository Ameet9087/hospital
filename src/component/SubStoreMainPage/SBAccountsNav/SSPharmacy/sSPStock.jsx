import React, { useState, useEffect, useRef } from "react";
import "../SSPharmacy/sSPStock.css";
import SSPRequisition from "./sSPRequisition";
import SSPConsumption from "./sSPConsumption";
import SSPStoreTransfer from "./sSPStoreTransfer";
import SSPIssues from "./sSPIssues";
import SSPReports from "./sSPReports"; // Import the Reports component
import SSPharmacyNInven from "./sSPharmacyNInven";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../api/api";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import * as XLSX from 'xlsx';
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";
function SSPStock() {
  const { store } = useParams();
  const [activeTab, setActiveTab] = useState("Stock");
  const [stockData, setStockData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  // Fetch data when Stock tab is active
  useEffect(() => {
    if (activeTab === "Stock") {
      fetchStockData();
    }
  }, [activeTab]);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/subpharm-requisitions/requisition-items?subStoreId=${store}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }
      const data = await response.json();
      console.log(data);

      setStockData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Function to trigger print
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
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'SSPStock'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'SSPStock.xlsx'); // Downloads the Excel file
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Stock":
        return (
          <div className="sSPStock-stock-content">
            <div className="sSPStock-stock-search-N-results">
              <div className="sSPStock-stock-search-bar">
                
                <FloatingInput
                label={"Search"}
                type="search"
              />
              </div>
              <div className="sSPStock-stock-results-info">
                <span>
                  Showing {stockData.length} / {stockData.length} results
                </span>
                {/* Showing 2 / 2 results */}
                <button
                  className="sSPStock-stock-print-btn"
                  // onClick={handleExportToExcel}
                  onClick={handleExport}
                >
                  <i className="fa-regular fa-file-excel"></i> Export
                </button>
                <button
                  className="sSPStock-stock-print-btn"
                  onClick={handlePrint}
                >
                  <i class="fa-solid fa-print"></i> Print
                </button>
              </div>
            </div>
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Generic Name",
                    "Item Name",
                    "Available Quantity",
                    "Sale Price",
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
                {stockData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item?.items?.itemMaster?.genericNames?.genericName}
                    </td>
                    <td>{item?.items?.itemMaster?.itemName}</td>
                    <td>{item?.dispatchQuantity}</td>
                    <td>{item?.items?.salePrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "Requisition":
        return <SSPRequisition />;
      case "Consumption":
        return <SSPConsumption />;
      case "Store Transfer":
        return <SSPStoreTransfer />;
      // case 'Issues':
      //   return <SSPIssues />;
      case "Reports":
        return <SSPReports />;
      default:
        return null;
    }
  };

  return (
    <div className="sSPStock-stock-container">
      <SSPharmacyNInven />
      <nav className="sSPStock-stock-nav">
        <ul className="sSPStock-stock-nav-ul">
          <li
            className={activeTab === "Stock" ? "active" : ""}
            onClick={() => setActiveTab("Stock")}
          >
            Stock
          </li>
          <li
            className={activeTab === "Requisition" ? "active" : ""}
            onClick={() => setActiveTab("Requisition")}
          >
            Requisition
          </li>
          <li
            className={activeTab === "Consumption" ? "active" : ""}
            onClick={() => setActiveTab("Consumption")}
          >
            Consumption
          </li>
          <li
            className={activeTab === "Store Transfer" ? "active" : ""}
            onClick={() => setActiveTab("Store Transfer")}
          >
            Store Transfer
          </li>
          {/* <li className={activeTab === 'Issues' ? 'active' : ''} onClick={() => setActiveTab('Issues')}>Issues</li> */}
          {/* <li className={activeTab === 'Reports' ? 'active' : ''} onClick={() => setActiveTab('Reports')}>Reports</li> */}
        </ul>
      </nav>
      {renderContent()}
    </div>
  );
}

export default SSPStock;
