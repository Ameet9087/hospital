import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./Quotation.css";
import RequestForQuotation from "../components/RequestForQuotation";
import RFQDetails from "../components/RFQDetails";
import CustomModal from "../../../CustomModel/CustomModal";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import * as XLSX from 'xlsx';
import { API_BASE_URL } from "../../api/api";

Modal.setAppElement("#root");

function QuotationRequest() {
  const [modalIsOpen, setModalIsOpen] = useState(false); // For RequestForQuotation modal
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false); // For RFQDetails modal
  const [rfqData, setRfqData] = useState([]); // Store RFQ data
  const [selectedRfq, setSelectedRfq] = useState(null); // Store selected RFQ for details modal


  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);

  // Fetch RFQ data on component mount
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/rfq/getAll`)
      .then((response) => {
        setRfqData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching RFQ data:", error);
      });
  }, []);

  // Functions for RequestForQuotation modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Functions for RFQDetails modal
  const openDetailsModal = (rfq) => {
    setSelectedRfq(rfq);
    setDetailsModalIsOpen(true);
  };
  const closeDetailsModal = () => setDetailsModalIsOpen(false);
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
  };
  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
  };



  return (
    <div className="QuotationRequest-container">
      {/* Button to open the Request for Quotation modal */}
      <button className="QuotationRequest-request-quotation" onClick={openModal}>
        Request For Quotation
      </button>

      {/* Modal for Request For Quotation */}
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
        <input type="text" placeholder="Search" />
        {/* <button className="QuotationRequest-search-button">Q</button> */}
      </div>

      {/* Results info and Print button */}
      <div className="QuotationRequest-results-info">
        <span>Showing {rfqData.length} / {rfqData.length} results</span>
        <button className="QuotationRequest-print-button" onClick={handleExport}>Export</button>
        <button className="QuotationRequest-print-button" onClick={handlePrint}>Print</button>
      </div>

      {/* Data table */}
      <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                 "RFQ No",
                 "Requested Date",
                 "Subject",
                 "Description",
                 "Status",
                 "Vendor",
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
          {rfqData.map((rfq) => (
            <tr key={rfq.id}>
              <td>{rfq?.id}</td>
              <td>{rfq?.requestDate}</td>
              <td>{rfq?.subject}</td>
              <td>{rfq?.description}</td>
              <td>Active</td>
              <td>{rfq?.vendor?.vendorName}</td>
              <td>
                {/* Button to open the RFQ Details modal */}
                <button
                  className="QuotationRequest-action-button"
                  onClick={() => openDetailsModal(rfq)}
                >
                  RFQ Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for RFQ Details */}
      <CustomModal
        isOpen={detailsModalIsOpen}
        onClose={closeDetailsModal}
        contentLabel="RFQ Details"
      >
    
          <RFQDetails rfq={selectedRfq} />
      
      </CustomModal>
    </div>
  );
}

export default QuotationRequest;
