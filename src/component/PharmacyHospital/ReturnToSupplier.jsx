/* Mohini_ReturnToSupplier_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import './ReturnToSupplier.css';
import * as XLSX from 'xlsx';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import ReturnForm from './ReturnForm';
import CustomModal from '../../CustomModel/CustomModal';
import { API_BASE_URL } from '../api/api';

const ReturnToSupplier = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showReturnForm, setShowReturnForm] = useState(false); 
  const [selectedItem, setSelectedItem] = useState(null); 
  // const [fromDate, setFromDate] = useState();
  // const [toDate, setToDate] = useState();
 const [fromDate, setFromDate] = useState("2025-01-15"); // From date
  const [toDate, setToDate] = useState("2025-01-31"); // To date
  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'ReturnToSupplierReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'ReturnToSupplierReport.xlsx'); // Downloads the Excel file
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
  

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/good-receipts`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Filter data based on search term and date range
const filteredData = Array.isArray(data)
? data.filter((item) => {
    const supplierMatch = item.supplier?.supplierName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const itemDate = new Date(item.goodsReceiptDate); // Convert item date to Date object
    const from = new Date(fromDate);
    const to = new Date(toDate);

    // Check if the item's date falls within the selected range
    const dateMatch = itemDate >= from && itemDate <= to;

    return supplierMatch && dateMatch;
  })
: [];
  const handleReturnClick = (item) => {    
    setSelectedItem(item); 
    setShowReturnForm(true); 
  };

  const closeModal = () => {
    setShowReturnForm(false); 
    setSelectedItem(null); 
  };

  


  return (
    <div className="return-to-supplier-container">
      <h2 className="return-to-supplier-header-title">Return To Supplier Report</h2>

      <div className="return-to-supplier-date-filter-container">
        <div className="return-to-supplier-date-filter">
          <label>From:</label>
          <input
            type="date"
            className="return-to-supplier-input-date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />       
           </div>

        <div className="return-to-supplier-date-filter">
          <label>To:</label>
          <input
            type="date"
            className="return-to-supplier-input-date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />        </div>
      </div>

      <div className="return-to-supplier-search-bar">
        <input
          type="text"
          placeholder="Search by Supplier Name"
          className="return-to-supplier-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <button className="return-to-supplier-search-icon-button">
          <i className="fa fa-search"></i>
        </button> */}
        <div className="return-to-supplier-print-container">
          <span>
            Showing {filteredData.length} / {data.length} results
          </span>
          <button className="return-to-supplier-print-button" onClick={handleExport}>
            Export
          </button>
          <button className="return-to-supplier-print-button" onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>

      <div className="return-to-supplier-retuurn-store-supplier">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "S.N.",
                "Date",
                "Supplier Name",
                "Invoice Number",
                "Payment Mode",
                "Credit Period",
                "Taxable Sub Total",
                "Non-Taxable Sub Total",
                "Sub Total",
                "Discount Percent",
                "VAT Percent",
                "Total Amount",
                "Remarks",
                "Action"
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
                <tr key={item.goodReceiptId}>
                  <td>{index + 1}</td>
                  <td>{item.goodsReceiptDate || "N/A"}</td>
                  <td>{item.supplier?.supplierName || "N/A"}</td>
                  <td>{item.invoiceNumber || "N/A"}</td>
                  <td>{item.paymentMode || "N/A"}</td>
                  <td>{item.creditPeriod || "N/A"}</td>
                  <td>{item.taxableSubTotal || "N/A"}</td>
                  <td>{item.nonTaxableSubTotal || "N/A"}</td>
                  <td>{item.subTotal || "N/A"}</td>
                  <td>{item.discountPercent || "N/A"}</td>
                  <td>{item.vatPercent || "N/A"}</td>
                  <td>{item.totalAmount || "N/A"}</td>
                  <td>{item.remarks || "N/A"}</td>
                  <td><button className='returnpageshowbtn' onClick={() => handleReturnClick(item)}>Return</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="return-to-supplier-no-rows">
                  No Rows To Show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={showReturnForm } onClose={closeModal}>
         <ReturnForm selectedItem={selectedItem} onClose={closeModal} /> {/* Pass the selected item */}
      </CustomModal>
    </div>
  );
};

export default ReturnToSupplier;
/* Mohini_ReturnToSupplier_WholePage_14/sep/2024 */
