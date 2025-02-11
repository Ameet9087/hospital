import React, { useEffect, useState, useRef } from "react";
import "./InvoiceHeaders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import InvoiceHeaderForm from "../components/AddInvoiceHeader";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import * as XLSX from 'xlsx';


const InvoiceHeaders = () => {
  const [invoiceHeaders, setInvoiceHeaders] = useState([]);
  const [filteredInvoiceHeaders, setFilteredInvoiceHeaders] = useState([]); // State for filtered data
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [columnWidths, setColumnWidths] = useState({});
  const [selectedInvoiceHeader, setSelectedInvoiceHeader] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const tableRef = useRef(null);

  const fetchInvoiceHeaders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/invoice-headers/getAll`);
      const data = await response.json();
      setInvoiceHeaders(data);
      setFilteredInvoiceHeaders(data); // Set filtered data initially to all fetched headers
    } catch (error) {
      console.error("Error fetching invoice headers:", error);
    }
  };

  useEffect(() => {
    fetchInvoiceHeaders();
  }, [isModalOpen]);

  // Function to handle search query change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter invoice headers based on the search query
    if (query) {
      const filtered = invoiceHeaders.filter((header) =>
        Object.values(header).some(value =>
          value && value.toString().toLowerCase().includes(query.toLowerCase())
        )
      );
      setFilteredInvoiceHeaders(filtered);
    } else {
      setFilteredInvoiceHeaders(invoiceHeaders); // Reset to all headers if search is cleared
    }
  };

  const openAddModal = () => {
    setSelectedInvoiceHeader(null); // Reset selection for a new invoice
    setIsModalOpen(true);
  };

  // Open modal for editing an existing invoice header
  const openEditModal = (header) => {
    setSelectedInvoiceHeader(header); // Set the selected invoice header
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "InvoiceHeaders"); // Appends worksheet to workbook
    XLSX.writeFile(wb, "InvoiceHeaders.xlsx"); // Downloads the Excel file
  };

  // Function to trigger print
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
    <div className="InvoiceHeaders">
      {/* Add Header Button */}
      <button className="InvoiceHeaders__add-button" onClick={openAddModal}>
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

            value={searchQuery}
            onChange={handleSearch} // Trigger search on input change
          />
        </div>
        <div>
          <span>Showing {filteredInvoiceHeaders.length} / {invoiceHeaders.length} results</span>
          <button
            className="InvoiceHeaders__print-button"
            onClick={handleExport}
          >
            Export
          </button>
          <button
            className="InvoiceHeaders__print-button"
            onClick={printList}
          >
            Print
          </button>
        </div>
      </div>

      {/* Table Section */}
      <table ref={tableRef}>
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
              "Action",
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
          {filteredInvoiceHeaders.length > 0 ? (
            filteredInvoiceHeaders.map((header) => (
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
                <button className="invoiceHeader-edit" onClick={() => openEditModal(header)}>Edit</button>
                  {/* <button className="invoiceHeader-delete">Delete</button> */}

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
      </table >

      {/* Add Invoice Header Modal */}
      < CustomModal isOpen={isModalOpen} onClose={closeModal} >
        <InvoiceHeaderForm closeModal={closeModal} />

      </CustomModal>

      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        <InvoiceHeaderForm invoiceHeader={selectedInvoiceHeader} closeModal={closeModal} />
      </CustomModal >
    </div >
  );
};

export default InvoiceHeaders;
