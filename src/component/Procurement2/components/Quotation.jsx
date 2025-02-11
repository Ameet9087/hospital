
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./Quotation.css";
import RequestForQuotation from "../components/RequestForQuotation";
import RFQDetails from "../components/RFQDetails";
import CustomModal from "../../../CustomModel/CustomModal";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import * as XLSX from 'xlsx';
import { API_BASE_URL } from "../../api/api";

Modal.setAppElement("#root");

function QuotationRequest() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [rfqData, setRfqData] = useState([]);
  const [selectedRfq, setSelectedRfq] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredData, setFilteredData] = useState([]);

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/rfq/getAll`)
      .then((response) => {
        setRfqData(response.data);
        setFilteredData(response.data); // Initialize filtered data
      })
      .catch((error) => {
        console.error("Error fetching RFQ data:", error);
      });
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = rfqData.filter((rfq) =>
      Object.values({
        id: rfq?.id,
        requestDate: rfq?.requestDate,
        subject: rfq?.subject,
        description: rfq?.description,
        vendorName: rfq?.vendor?.vendorName,
        status: "Active",
      })
        .join(" ")
        .toLowerCase()
        .includes(lowerCaseQuery)
    );
    setFilteredData(filtered);
  }, [searchQuery, rfqData]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openDetailsModal = (rfq) => {
    setSelectedRfq(rfq);
    setDetailsModalIsOpen(true);
  };
  const closeDetailsModal = () => setDetailsModalIsOpen(false);

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport');
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx');
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
    <div className="QuotationRequest-container">
      <button className="QuotationRequest-request-quotation" onClick={openModal}>
        Request For Quotation
      </button>

      <CustomModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        contentLabel="Request For Quotation"
        className="QuotationRequest-modal"
        overlayClassName="QuotationRequest-overlay"
      >
        <RequestForQuotation onClose={closeModal} />
      </CustomModal>

      {/* Search bar */}
      <div className="QuotationRequest-search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Results info and Print button */}
      <div className="QuotationRequest-results-info">
        <span>Showing {filteredData.length} / {rfqData.length} results</span>
        <button className="QuotationRequest-print-button" onClick={handleExport}>Export</button>
        <button className="QuotationRequest-print-button" onClick={printList}>Print</button>
      </div>

      {/* Data table */}
      <table ref={tableRef}>
        <thead>
          <tr>
            {["RFQ No", "Requested Date", "Subject", "Description", "Status", "Vendor", "Action"].map((header, index) => (
              <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                <div className="header-content">
                  <span>{header}</span>
                  <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredData.map((rfq) => (
            <tr key={rfq.id}>
              <td>{rfq?.id}</td>
              <td>{rfq?.requestDate}</td>
              <td>{rfq?.subject}</td>
              <td>{rfq?.description}</td>
              <td>Active</td>
              <td>{rfq?.vendor?.vendorName}</td>
              <td>
                <button className="QuotationRequest-action-button" onClick={() => openDetailsModal(rfq)}>
                  RFQ Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for RFQ Details */}
      <CustomModal isOpen={detailsModalIsOpen} onClose={closeDetailsModal} contentLabel="RFQ Details">
        <RFQDetails rfq={selectedRfq} />
      </CustomModal>
    </div>
  );
}

export default QuotationRequest;
