import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./Quotation.css";
import RequestForQuotation from "../components/RequestForQuotation";
import RFQDetails from "../components/RFQDetails";
import CustomModal from "../../../CustomModel/CustomModal";

Modal.setAppElement("#root");

function QuotationRequest() {
  const [modalIsOpen, setModalIsOpen] = useState(false); // For RequestForQuotation modal
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false); // For RFQDetails modal
  const [rfqData, setRfqData] = useState([]); // Store RFQ data
  const [selectedRfq, setSelectedRfq] = useState(null); // Store selected RFQ for details modal

  const API_BASE_URL = "http://localhost:8080/api";

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
        <RequestForQuotation />
      </CustomModal>

      {/* Search bar */}
      <div className="QuotationRequest-search-bar">
        <input type="text" placeholder="Search" />
        <button className="QuotationRequest-search-button">Q</button>
      </div>

      {/* Results info and Print button */}
      <div className="QuotationRequest-results-info">
        <span>Showing {rfqData.length} / {rfqData.length} results</span>
        <button className="QuotationRequest-print-button">Print</button>
      </div>

      {/* Data table */}
      <table className="QuotationRequest-data-table">
        <thead>
          <tr>
            <th>RFQ No</th>
            <th>Requested Date</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Status</th>
            <th>Vendor</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rfqData.map((rfq) => (
            <tr key={rfq.id}>
              <td>{rfq.id}</td>
              <td>{rfq.requestDate}</td>
              <td>{rfq.subject}</td>
              <td>{rfq.description}</td>
              <td>Active</td>
              <td>{rfq.vendor.vendorName}</td>
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
