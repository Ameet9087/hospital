import React, { useState, useEffect, useRef } from 'react';
import './pharmacyClearance.css'; // Ensure you have this CSS file
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';
import { API_BASE_URL } from '../api/api';
import axios from 'axios';
import CustomModal from '../../CustomModel/CustomModal';
import PharmacyClearancePopup from "./PharmacyClearancePopup/PharmacyClearancePopup"
export default function PharmacyClearance() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [requestdata, setRequestData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequisition, setSelectedRequisition] = useState(null);
  const [patient, setPatient] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
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
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Convert table to worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Add sheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Download the file
  };

  // Function to trigger print
  const handlePrint = () => {
    const printContent = tableRef.current;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <h4>Pharmacy Clearance</h4>
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
          <label htmlFor="from-date">From:</label>
          <input type="date" id="from-date" />
          <label htmlFor="to-date">To:</label>
          <input type="date" id="to-date" />
        </div>
      </div>

      {/* Search and action buttons */}
      <div className="pharmacy-clearance-search-container">
        <input type="text" className="pharmacy-clearance-search-box" placeholder="Search" />
        <div className="pharmacy-clearance-search-right">
          <span className="purchase-results-count-span"> Showing {requestdata.length} / {requestdata.length} results</span>
          <button className="pharmacy-clearance-print-button" onClick={handleExport}>
            Export
          </button>
          <button className="pharmacy-clearance-print-button" onClick={handlePrint}>
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
