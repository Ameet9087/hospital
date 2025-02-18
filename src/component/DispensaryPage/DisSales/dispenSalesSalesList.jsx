import React, { useState, useEffect, useRef } from "react";
import SalesInvoice from "./SalesInvoice"; // Import SalesInvoice component
import "../DisSales/dispenSalesSalesList.css";
import CustomModal from '../../../CustomModel/CustomModal';

import { API_BASE_URL } from "../../api/api";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";

function DispenSalesSalesList() {
  const [salesList, setSalesList] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const tableRef = useRef("")
const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/patient-invoices`)
      .then((response) => response.json())
      .then((data) => setSalesList(data))
      .catch((error) => console.error("Error fetching sales data:", error));
  }, []);

  const handleShowInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoice(true);
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    setSelectedInvoice(null);
  };

  const handlePrintInvoice = () => {
    console.log("Print functionality triggered for:", selectedInvoice);
    // Add your print logic here
  };
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'DispenSaleList'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'DispenSaleList.xlsx'); // Downloads the Excel file
  }
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

  return (
    <div className="dispenSalesSalesList-active-imaging-request">
      <header className="dispenSalesSalesList-header"></header>
      <div className="dispenSalesSalesList-controls">
        <div className="dispenSalesSalesList-date-range">
          <FloatingInput
            label="From"
            type="date"
            value={fromDate} // Controlled input
            onChange={(e) => setFromDate(e.target.value)} // Updates state with selected date
          />
          <FloatingInput
            label="To"
            type="date"
            value={toDate} // Controlled input
            onChange={(e) => setToDate(e.target.value)} // Updates state with selected date
          />
        </div>
        <div className="dispenSalesSalesList-buttons">
          <button onClick={printList}>Print</button>
          <button onClick={handleExport}>Export</button>
        </div>
      </div>
      <div className="dispenSalesSalesList-table-N-paginat">
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Patient Name</th>
              <th>Sub Total</th>
              <th>Dis Amt</th>
              <th>Total Amt</th>
              <th>Date</th>
              <th>Patient Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {salesList.map((sale) => (
              <tr key={sale.invoiceId}>
                <td>{sale.invoiceId}</td>
                <td>
                  {sale.inPatient?.patient?.firstName ||
                    sale.outPatient?.patient?.firstName}
                </td>
                <td>{sale.total_amt}</td>
                <td>{sale.discountAmount || "0.00"}</td>
                <td>{sale.total_amt}</td>
                <td>{sale.transactionDate}</td>
                <td>{sale.inPatient?.patientType}</td>
                <td>
                  <button
                    className="action-button"
                    onClick={() => handleShowInvoice(sale)}
                  >
                    View Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  <CustomModal isOpen={showInvoice} onClose={handleCloseInvoice}>
    <SalesInvoice
      showInvoice={showInvoice}
      handleClose={handleCloseInvoice}
      invoiceData={selectedInvoice}
      handlePrint={handlePrintInvoice}
    />
  </CustomModal>


    </div>
  );
}

export default DispenSalesSalesList;
