import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';  // Import axios
import { useReactToPrint } from 'react-to-print';
import SalesInvoice from './SalesInvoice'; // Import SalesInvoice component
import "../DisSales/dispenSalesRetunSalesList.css";
import { API_BASE_URL } from '../../api/api';
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";

function DispenSalesRetunSalesList() {
  const [returnLists, setReturnLists] = useState([]); // State to store return list data
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [selectedInvoiceData, setSelectedInvoiceData] = useState(null); // Store selected invoice data
  const [showInvoice, setShowInvoice] = useState(false); // Flag to show invoice
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const tableRef = useRef();

  useEffect(() => {
    // Fetch data from the backend API using axios
    axios.get(`${API_BASE_URL}/hospital/return-lists/fetch-all-returnList`)
      .then(response => {
        setReturnLists(response.data); // Set return lists data
      })
      .catch(error => console.error('Error fetching return list data:', error));
  }, []);

  const handleCreateRequisitionClick = () => {
    setShowCreateRequisition(true);
  };

  const closePopups = () => {
    setShowCreateRequisition(false);
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
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "ReturnSaleList"); // Appends worksheet to workbook
    XLSX.writeFile(wb, "ReturnSaleList.xlsx"); // Downloads the Excel file
  };

  // Fetch invoice data based on returnListId using axios
  const handleViewInvoiceClick = (id) => {
    console.log(id)
    // Fetch the invoice data for the selected returnListId
    axios.get(`${API_BASE_URL}/hospital/return-lists/fetch-specific-data/${id}`)
      .then(response => {
        setSelectedInvoiceData(response.data); // Set selected invoice data
        setShowInvoice(true);  // Show the SalesInvoice component
        console.log("-------->", selectedInvoiceData); // Log for debugging
      })
      .catch(error => console.error('Error fetching invoice data:', error));
  };

  return (
    <div className="dispenSalesRetunSalesList-active-imaging-request">
      {/* Header and Controls */}
      <header className='dispenSalesRetunSalesList-header'>
        {/* Your header and controls code */}
      </header>
      <div className="dispenSalesRetunSalesList-controls">
        <div className="dispenSalesRetunSalesList-date-range">
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

      {/* Search and Results Info */}
      <div className="dispenSalesRetunSalesList-search-N-results">
        <div className="dispenSalesRetunSalesList-search-bar">
          
          <FloatingInput 
          label={"search"}
          type='text'

          />
        </div>
        <div className="dispenSalesRetunSalesList-results-info">
          Showing {returnLists.length} / {returnLists.length} results
          <button className="dispenSalesRetunSalesList-print-button" onClick={handleExport}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="dispenSalesRetunSalesList-print-button" onClick={printList}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      {/* Table and Pagination */}
      <div className="dispenSalesRetunSalesList-table-N-paginat">
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>Hospital Number</th>
              <th>Ref.Invoice No</th>
              <th>Patient Name</th>
              <th>Sub Total</th>
              <th>Dis Amt </th>
              <th>Total Amt</th>
              <th>Return Date</th>
              <th>Credit Note No.</th>
              <th>Patient Type</th>
              <th>View Invoice</th>
            </tr>
          </thead>
          <tbody>
            {returnLists.map((item) => (
              <tr key={item.returnListId}>
                <td>{item.returnListId}</td>
                <td>{item.refInvoiceNumber}</td>
                <td>{item.patientName}</td>
                <td>{item.subTotal}</td>
                <td>{item.discountAmount}</td>
                <td>{item.totalAmount}</td>
                <td>{item.returnDate}</td>
                <td>{item.creditNoteNumber}</td>
                <td>{item.patientType}</td>
                <td>
                  <button className='dispenSalesRetunSalesList-table-button' onClick={() => handleViewInvoiceClick(item.returnListId)}>View Invoice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Modal */}
      <SalesInvoice
        showInvoice={showInvoice}
        handleClose={() => setShowInvoice(false)}
        invoiceData={selectedInvoiceData}
        
        invoiceType="Return Invoice"
      />
    </div>
  );
}

export default DispenSalesRetunSalesList;
