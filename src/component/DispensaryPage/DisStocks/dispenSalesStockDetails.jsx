import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import axios
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../DisStocks/dispenSalesStockDetails.css";
import DispenTransfer from "./dispenTransfer";
import DispenStockRequisition from "./dispenStockRequisition";
import { API_BASE_URL } from "../../api/api";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";

const SalesStockDetails = () => {
  const [activeTab, setActiveTab] = useState("StockDetails");
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  // Fetch data from the backend API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/hospital/fetch-medicine-details`
        ); // API call to the backend
        setSalesData(response.data); // Update state with the fetched data
        setLoading(false); // Set loading to false
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching data", err);
        setError("Failed to fetch data from the server.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "DispenceSalesStockDetails"); // Appends worksheet to workbook
    XLSX.writeFile(wb, "DispenceSalesStockDetails.xlsx"); // Downloads the Excel file
  };

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
              display: none; /* Hide action buttons and Action column */
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

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <div className="dispenSalesStockDetails-container">
      <div className="dispenSalesStockDetails-header-tabs">
        <span
          className={
            activeTab === "StockDetails"
              ? "dispenSalesStockDetails-tab-active"
              : "dispenSalesStockDetails-tab"
          }
          onClick={() => setActiveTab("StockDetails")}
        >
          Stock Details List
        </span>
        {/* <span 

                    className={activeTab === "Transfer" ? "dispenSalesStockDetails-tab-active" : "dispenSalesStockDetails-tab"} 
                    onClick={() => setActiveTab("Transfer")}
                >
                    Transfer
                </span> */}
        <span
          className={
            activeTab === "Requisition"
              ? "dispenSalesStockDetails-tab-active"
              : "dispenSalesStockDetails-tab"
          }
          onClick={() => setActiveTab("Requisition")}
        >
          Requisition
        </span>
      </div>

      {activeTab === "StockDetails" && (
        <>
          {/* Stock Details Content */}
          <div className="dispenSalesStockDetails-filter-options">
            <div>
              <FloatingSelect
                label="Filter by Store"
                name="storeFilter"
                options={[
                  { value: "all", label: "All" },
                  { value: "main-dispensary", label: "Main Dispensary" },
                  { value: "main-store", label: "Main Store" },
                ]}
              />
            </div>
            <label>
              <input type="checkbox" /> Show Zero Quantity
            </label>
          </div>
          <div className="dispenSalesStockDetails-controls">
            {/* Your date range and button controls */}
            <div className="dispenSalesStockDetails-date-range">
              <FloatingInput
                label="From"
                type="date"
                name="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <FloatingInput
                label="To"
                type="date"
                name="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>

          <div className="dispenSalesStockDetails-search-N-result">
            <div className="dispenSalesStockDetails-search-bar">

              <FloatingInput
                label={"Search"}
                type="search"

              />
            </div>
            <div className="dispenSalesStockDetails-results-info">
              <span>Showing {salesData.length} results</span>
              <button
                className="dispenSalesStockDetails-print-button"
                onClick={handleExport}
              >
                <i className="fa-solid fa-file-excel"></i> Export
              </button>
              <button
                className="dispenSalesStockDetails-print-button"
                onClick={printList}
              >
                <i class="fa-solid fa-print"></i> Print
              </button>
            </div>
          </div>

          <table className="dSSD-stock-table" ref={tableRef}>
            <thead>
              <tr>
                <th>Generic Name</th>
                <th>Medicine Name</th>
                <th>Unit</th>
                <th>Rack No</th>
                <th>Batch No</th>
                <th>Expiry Date</th>
                <th>Available Quantity</th>
                <th>Sale Price</th>
                <th>Total Value</th>
                <th>Store Name</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.genericName}</td>
                  <td>{item.medicineName}</td>
                  <td>{item.unit}</td>
                  <td>{item.rackNumber}</td>
                  <td>{item.batchNumber}</td>
                  <td>{item.expiryDate}</td>
                  <td>{item.availableQty}</td>
                  <td>{item.salePrice}</td>
                  <td>{(item.availableQty * item.salePrice).toFixed(2)}</td>
                  <td>{item.storeName}</td>
                </tr>
              ))}
            </tbody>
          </table>



          {/* <div className="dSSDetails-pagination-bar">
          {/* <div className="dSSDetails-pagination-bar">
                        <span>1 to 20 of {salesData.length}</span>
                        <button>First</button>
                        <button>Previous</button>
                        <span>Page 1 of {(salesData.length / 20).toFixed(0)}</span>
                        <button>Next</button>
                        <button>Last</button>
                    </div> */}

          <div className="sales-stock-details-summary">
            <h4>Summary</h4>
            <strong>Total Stock Value: </strong>
            {salesData
              .reduce(
                (acc, item) => acc + item.availableQty * item.salePrice,
                0
              )
              .toFixed(2)}
          </div>
        </>
      )}

      {activeTab === "Transfer" && <DispenTransfer />}
      {activeTab === "Requisition" && <DispenStockRequisition />}
    </div>
  );
};

export default SalesStockDetails;
