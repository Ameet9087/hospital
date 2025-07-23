/* Ajhar Tamboli dispenSalesReturnFromCust.jsx 19-09-24 */

import axios from "axios"; // Import Axios
import React, { useRef, useState } from "react";
import { Calendar, Search, X } from "lucide-react";
import "../DisSales/dispenSalesReturnFromCust.css";
import SalesInvoice from "./SalesInvoice";
import { API_BASE_URL } from "../../api/api";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";
const DispenSalesReturnFromCust = () => {
  const [fiscalYear, setFiscalYear] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [patientName, setPatientName] = useState("");
  const [referenceInvoiceNo, setReferenceInvoiceNo] = useState("");
  const [referenceInvoiceDate, setReferenceInvoiceDate] = useState("");
  const [medicines, setMedicines] = useState([]); // To hold medicine data
  const [invoiceData, setInvoiceData] = useState(); // State to hold invoice data
  const [showInvoice, setShowInvoice] = useState(false); // State to control visibility of SalesInvoice component
  const tableRef = useRef ("")
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!invoiceNo) {
      toast.error("Please enter an Invoice Number to search.");
      return;
    }

    try {
      // API call to fetch invoice details
      const response = await axios.get(
        `${API_BASE_URL}/patient-invoices/${invoiceNo}`
      );
      const invoiceData = response.data;

      console.log(invoiceData);

      if (invoiceData) {
        // Update state with response data
        setPatientName(invoiceData.person?.firstName || ""); // Assuming firstName for patient
        setReferenceInvoiceNo(invoiceData.invoiceId || "");
        setReferenceInvoiceDate(invoiceData.invoiceDate || "");
        setMedicines(invoiceData.medicines || []); // Store medicines array
        setInvoiceData(invoiceData); // Set the invoice data
        alert("Invoice found and details updated!");
      } else {
        alert("No invoice found.");
      }
    } catch (error) {
      console.error("Error fetching invoice data:", error);
      alert("Failed to fetch invoice data. Please try again.");
    }
  };
  console.log("------------>", medicines);

  const handleManualReturn = () => {
    // Handle manual return logic
  };

  const handlePrintReceipt = async () => {
    if (!invoiceNo) {
      alert("Please enter an Invoice Number.");
      return;
    }
    var subtot;
    // Filter only medicines with returned quantities greater than 0
    const returnedMedicines = medicines
      .filter((medicine) => Number(medicine.returnedQty) > 0)
      .map((medicine) => ({
        medicineId: medicine.medicineId, // Extract medicineId
        storeMedId: medicine.storeMedId, // Extract storeMedId
        qty: medicine.returnedQty,
        subTotal: medicine.qty * medicine.salePrice, // Use returnedQty as qty
      }));

    if (returnedMedicines.length === 0) {
      alert("No medicines selected for return.");
      return;
    }
    console.log("return med", returnedMedicines);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/patient-invoices/${invoiceNo}/return-medicines`,
        returnedMedicines
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Return receipt generated successfully!");

        setShowInvoice(true); // Show the invoice component
      } else {
        toast.error("Failed to generate the return receipt.");
      }
    } catch (error) {
      console.error("Error printing return receipt:", error);
      toast.error("An error occurred while printing the return receipt.");
    }
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
    XLSX.utils.book_append_sheet(wb, ws, "DispenceSalesReturnFromCust"); // Appends worksheet to workbook
    XLSX.writeFile(wb, "DispenceSalesReturnFromCust.xlsx"); // Downloads the Excel file
  };

  return (
    <div className="dispenSalesReturnFromCust-form">
      <div className="dispenSalesReturnFromCust-options">
        <div className="dispenSalesReturnFromCust-checkbox-group">
          <label htmlFor="returnBy">Return By *:</label>
          {/* <input type="checkbox" id="returnBy" /> */}
        </div>
        <div className="dispenSalesReturnFromCust-checkbox-group">
          <input type="checkbox" id="billNo" />
          <label htmlFor="billNo">Bill No</label>
        </div>
        <div className="dispenSalesReturnFromCust-checkbox-group">
          <input type="checkbox" id="hospitalNo" />
          <label htmlFor="hospitalNo">Hospital No</label>
        </div>
      </div>

      <div className="dispenSalesReturnFromCust-search-section">
        <div className="dispenSalesReturnFromCust-form-group-two">
          <div className="dispenSalesReturnFromCust-form-group-fs">
            <FloatingSelect
              label="Fiscal Year"
              name="fiscalYear"
              value={fiscalYear}
              onChange={(e) => setFiscalYear(e.target.value)}
              options={[
                { value: "2024", label: "2024" },
                { value: "2023", label: "2023" }, // Add more options as needed
                { value: "2022", label: "2022" },
              ]}
            />
             <FloatingInput
              label={"Invoice No"}
              type="text"
              id="invoiceNo"
              placeholder="Enter InvoiceNo."
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
            />
          </div>
          <button
            className="dispenSalesReturnFromCust-btn-search"
            onClick={handleSearch}
          >
            <Search size={16} /> Search
          </button>
        </div>
        <button
          className="dispenSalesReturnFromCust-btn-manual-return"
          onClick={handleManualReturn}
        >
          <i class="fa-solid fa-plus"></i> Manual Return
        </button>
      </div>

      {/* <h5>New Sales Return</h5> */}

      <div className="dispenSalesReturnFromCust-patient-info">
        <div className="dispenSalesReturnFromCust-form-group">
          <FloatingInput
            label={"Patient Name"}
            type="search"
            id="patientName"
            placeholder="Search Patient"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
          <FloatingInput
            label={"Reference Invoice No"}
            type="text"
            id="referenceInvoiceNo"
            value={referenceInvoiceNo}
            onChange={(e) => setReferenceInvoiceNo(e.target.value)}
          />

          <FloatingInput
            label={"Reference Invoice Date"}
            type="date"
            id="referenceInvoiceDate"
            value={referenceInvoiceDate}
            onChange={(e) => setReferenceInvoiceDate(e.target.value)}
          />
        </div>
        <div className="dispenSalesReturnFromCust-buttons">
          <button onClick={printList}>Print</button>
          <button onClick={handleExport}>Export</button>
        </div>
      </div>

      <table className="dispenSalesReturnFromCust-return-table" ref={tableRef}>
        <thead>
          <tr>
            <th></th>
            <th>Drug Name*</th>
            <th>Batch*</th>
            <th>Expiry*</th>
            <th>Qty*</th>
            <th>Return Qty*</th> {/* New column for returned quantity */}
            <th>Sale Price*</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={index}>
              <td>
                <button
                  className="dispenSalesReturnFromCust-btn-remove"
                  onClick={() => {
                    // Remove this medicine from the list
                    const updatedMedicines = medicines.filter(
                      (_, i) => i !== index
                    );
                    setMedicines(updatedMedicines);
                  }}
                >
                  X
                </button>
              </td>
              <td>
                <input type="text" value={medicine.medicineName} readOnly />
              </td>
              <td>
                <input type="text" value={medicine.batch} readOnly />
              </td>
              <td>
                <input type="text" value={medicine.expiry} readOnly />
              </td>

              <td>
                <input type="text" value={medicine.qty} readOnly />
              </td>
              <td>
                <input
                  type="number"
                  value={medicine.returnedQty || 0} // Ensure default is 0
                  onChange={(e) => {
                    const updatedMedicines = [...medicines];
                    updatedMedicines[index].returnedQty = Number(
                      e.target.value
                    ); // Ensure numeric update
                    setMedicines(updatedMedicines);
                    console.log("////////", updatedMedicines);
                    // setInvoiceData(updatedMedicines);
                  }}
                />
              </td>
              <td>
                <input type="number" value={medicine.salePrice} readOnly />
              </td>
              <td>{medicine.returnedQty * medicine.salePrice}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="7" className="dispenSalesReturnFromCust-text-right">
              Total Return Amount
            </td>
            <td>
              {medicines.reduce(
                (total, medicine) =>
                  total +
                  (medicine.returnedQty || medicine.qty) * medicine.salePrice,
                0
              )}
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="dispenSalesReturnFromCust-PRB">
        <button
          className="dispenSalesReturnFromCust-btn-print"
          onClick={handlePrintReceipt}
        >
          Print Return Receipt
        </button>
      </div>
      {showInvoice && (
        <SalesInvoice
          showInvoice={showInvoice}
          handleClose={() => setShowInvoice(false)}
          invoiceData={invoiceData}
          handlePrint={handlePrintReceipt}
          invoiceType="Return Invoice" 
        />
      )}
    </div>
  );
};

export default DispenSalesReturnFromCust;
