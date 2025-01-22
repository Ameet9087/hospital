import React, { useEffect, useState,useRef } from "react";
import "./InvoiceHeaders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import InvoiceHeaderForm from "../components/AddInvoiceHeader";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import * as XLSX from 'xlsx';

const InvoiceHeaders = () => {
  const [invoiceHeaders, setInvoiceHeaders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);


  const fetchInvoiceHeaders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/invoice-headers/getAll`);
      const data = await response.json();
      setInvoiceHeaders(data);
    } catch (error) {
      console.error("Error fetching invoice headers:", error);
    }
  };

  useEffect(() => {
    fetchInvoiceHeaders();
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
  };

  // Function to trigger print
  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
  };




  return (
    <div className="InvoiceHeaders">
      {/* Add Header Button */}
      <button className="InvoiceHeaders__add-button" onClick={openModal}>
        Add New Invoice Header
      </button>

      {/* Search Section */}
      

      {/* Header Section */}
      <div className="InvoiceHeaders__table-header">
      <div className="InvoiceHeaders__search-container">
        <input
          type="text"
          placeholder="Search"
          className="InvoiceHeaders__search-input"
        />
      </div>
      <div>
        <span>Showing 0 / 0 results</span>
        <button className="InvoiceHeaders__print-button" onClick={handleExport}>Export</button>
        <button className="InvoiceHeaders__print-button"onClick={handlePrint}>Print</button>
        </div>
      </div>

      {/* Table Section */}
      <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                 "Hospital Name",
                 "Address",
                 "Telephone",
                 "Email",
                 "Pin",
                 "DDA",
                 "Header Description",
                 "Created Date",
                 "Is Active",
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
          {invoiceHeaders.length > 0 ? (
            invoiceHeaders.map((header) => (
              <tr key={header.id}>
                <td>{header.hospitalName}</td>
                <td>{header.address}</td>
                <td>{header.telephone}</td>
                <td>{header.email}</td>
                <td>{header.kraPin}</td>
                <td>{header.dda}</td>
                <td>{header.headerDescription}</td>
                <td>{header.createdDate}</td>
                <td>{header.isActive ? "Yes" : "No"}</td>
                <td>
                  <button className="invoiceHeader-edit">Edit</button>
                  <button className="invoiceHeader-delete">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="InvoiceHeaders__no-data">
                No Rows To Show
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Invoice Header Modal */}
      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        <InvoiceHeaderForm closeModal={closeModal}/>
      </CustomModal>
    </div>
  );
};

export default InvoiceHeaders;
