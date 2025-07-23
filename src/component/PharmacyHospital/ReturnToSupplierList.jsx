import React, { useState, useEffect, useRef } from "react";
import "./ReturnToSupplier.css";
import * as XLSX from "xlsx";
import { API_BASE_URL } from "../api/api";

const ReturnToSupplierList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Filtered data state
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [fromDate, setFromDate] = useState("2024-08-15"); // From date
  const [toDate, setToDate] = useState("2024-08-22"); // To date
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const supplierResponse = await fetch(`${API_BASE_URL}/returnsupplier`);
        const suppliers = await supplierResponse.json();

        const transformedData = suppliers.map((item) => ({
          creditNoteNumber: item.creditNoteNumber || "N/A",
          supplierName: item.goodReceiptDTO?.supplier?.supplierName || "N/A",
          returnDate: item?.returnDate || "N/A",
          totalQty: item?.totalQuantity || 0,
          subTotal: (item?.subtotal || 0).toFixed(2),
          discountAmount: (item?.discountAmount || 0).toFixed(2),
          vatAmount: (item?.vatAmount || 0).toFixed(2),
          ccAmount: (item?.ccAmount || 0).toFixed(2),
          totalAmount: item?.totalAmount
            ? item?.totalAmount.toFixed(2)
            : "0.00",
        }));

        setData(transformedData);
        setFilteredData(transformedData); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterData(term, fromDate, toDate);
  };

  // Handle Date Filter Change
  const handleDateChange = (e, type) => {
    const date = e.target.value;
    if (type === "from") setFromDate(date);
    if (type === "to") setToDate(date);
    filterData(searchTerm, type === "from" ? date : fromDate, type === "to" ? date : toDate);
  };

  // Filtering Logic
  const filterData = (term, from, to) => {
    const filtered = data.filter((item) => {
      const matchSearch = item.supplierName.toLowerCase().includes(term) ||
        item.creditNoteNumber.toLowerCase().includes(term);

      const itemDate = new Date(item.returnDate);
      const fromDateObj = new Date(from);
      const toDateObj = new Date(to);

      const matchDate = itemDate >= fromDateObj && itemDate <= toDateObj;

      return matchSearch && matchDate;
    });

    setFilteredData(filtered);
  };

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ReturnToSupplierReport");
    XLSX.writeFile(wb, "ReturnToSupplierReport.xlsx");
  };

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
  
  return (
    <div className="return-to-supplier-container">
      {/* Date Filters */}
      <div className="return-to-supplier-date-filter-container">
        <div className="return-to-supplier-date-filter">
          <label>From:</label>
          <input
            type="date"
            className="return-to-supplier-input-date"
            value={fromDate}
            onChange={(e) => handleDateChange(e, "from")}
          />
        </div>

        <div className="return-to-supplier-date-filter">
          <label>To:</label>
          <input
            type="date"
            className="return-to-supplier-input-date"
            value={toDate}
            onChange={(e) => handleDateChange(e, "to")}
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="return-to-supplier-search-bar">
        <input
          type="text"
          placeholder="Search"
          className="return-to-supplier-search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* <button className="return-to-supplier-search-icon-button">
          <i className="fa fa-search"></i>
        </button> */}
      </div>

      <div className="setting-supplier-span">
        <span>Showing {filteredData.length} results</span>
        <button className="item-wise-export-button" onClick={handleExport}>
          Export
        </button>
        <button className="item-wise-print-button" onClick={handlePrint}>
          Print
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>Credit Note No</th>
              <th>Supplier Name</th>
              <th>Return Date</th>
              <th>Sub Total</th>
              <th>Discount Amount</th>
              <th>VAT Amount</th>
              <th>CC Amount</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="loading">Loading...</td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="8" className="return-to-supplier-no-rows">No Rows To Show</td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.creditNoteNumber}</td>
                  <td>{item.supplierName}</td>
                  <td>{item.returnDate}</td>
                  <td>{item.subTotal}</td>
                  <td>{item.discountAmount}</td>
                  <td>{item.vatAmount}</td>
                  <td>{item.ccAmount}</td>
                  <td>{item.totalAmount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnToSupplierList;
