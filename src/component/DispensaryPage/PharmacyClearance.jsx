import React, { useState, useEffect, useRef } from 'react';
import './pharmacyClearance.css'; // Ensure you have this CSS file
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';
import { API_BASE_URL } from '../api/api';
import axios from 'axios';
import CustomModal from '../../CustomModel/CustomModal';
import PharmacyClearancePopup from "./PharmacyClearancePopup/PharmacyClearancePopup"
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../FloatingInputs";
export default function PharmacyClearance() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [requestdata, setRequestData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequisition, setSelectedRequisition] = useState(null);
  const [patient, setPatient] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    // Fetch requisition data
    fetch(`${API_BASE_URL}/discharge-intimations`)
      .then((response) => response.json())
      .then((data) => {
        setRequestData(data);
        console.log(data);
      })
      .catch((error) => console.error('Error fetching requisitions:', error));
  }, []);

  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "PharmacyClearence"); // Appends worksheet to workbook
    XLSX.writeFile(wb, "PharmacyClearence.xlsx"); // Downloads the Excel file
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


  // Function to open modal with requisition details
  const openModal = (requisition) => {
    setSelectedRequisition(requisition);
    setShowModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedRequisition(null);
  };

  return (
    <div className="pharmacy-clearance-container">
      <div className="pharmacy-clearance-header"></div>

      {/* Date range filter */}
      <div className="purchase-data-order">
        <div className="pharmacy-clearance-date-range">
        <FloatingInput
        label="From Date"
        type="date"
        name="fromDate"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
      <FloatingInput
        label="To Date"
        type="date"
        name="toDate"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />
        </div>
      </div>

      {/* Search and action buttons */}
      <div className="pharmacy-clearance-search-container">
        <div className='pharmacy-clearance-search'>
        <FloatingInput 
         label={"Search"}
        />
        </div>
        
        <div className="pharmacy-clearance-search-right">
          <span className="purchase-results-count-span"> Showing {requestdata.length} / {requestdata.length} results</span>

          <button className="pharmacy-clearance-print-button" onClick={handleExport}>
            Export
          </button>
          <button className="pharmacy-clearance-print-button" onClick={printList}>
            Print
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {['UHID', 'Patient Name', 'Add.Date/Time', 'Dis.Req Date/Time', 'Pharmacy Clearance', 'Actions'].map((header, index) => (
                <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
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
            {requestdata.length > 0 ? (
              requestdata.map((item, index) => (
                <tr key={index}>
                  <td>{item?.ipAdmissionDto?.patient?.patient?.uhid}</td>
                  <td>{`${item?.ipAdmissionDto?.patient?.patient?.firstName} ${item?.ipAdmissionDto?.patient?.patient?.lastName}`}</td>
                  <td>{item?.ipAdmissionDto?.admissionDate}</td>
                  <td>{item?.disAdvisedDate || 'N/A'}</td>
                  <td>{item?.pharmacyClearance != null ? "Done" : "Not Done"}</td>
                  <td>
                    <button className="doctor-blocking-table-btn" onClick={() => {
                      setShowModal(true)
                      setPatient(item)
                    }}>Clearance</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center' }}>
                  Loading or no items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for requisition details */}
      {showModal && (
        <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
          <PharmacyClearancePopup patient={patient} />
        </CustomModal>
      )}
    </div>
  );
}
