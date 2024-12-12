import React, { useState } from 'react';
import Modal from 'react-modal';
import './Quotation.css';
import RequestForQuotation from '../components/RequestForQuotation';
import RFQDetails from '../components/RFQDetails';
import CustomModal from '../../../CustomModel/CustomModal';

Modal.setAppElement('#root'); 

function QuotationRequest() {
  const [modalIsOpen, setModalIsOpen] = useState(false); // For RequestForQuotation modal
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false); // For RFQDetails modal

  // Functions for RequestForQuotation modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Functions for RFQDetails modal
  const openDetailsModal = () => setDetailsModalIsOpen(true);
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
        <span>Showing 1 / 1 results</span>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2023-11-29</td>
            <td>napkins</td>
            <td>test</td>
            <td>active</td>
            <td>
              {/* Button to open the RFQ Details modal */}
              <button className="QuotationRequest-action-button" onClick={openDetailsModal}>
                RFQ Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Modal for RFQ Details */}
      <CustomModal
        isOpen={detailsModalIsOpen}
     onClose={()=>setDetailsModalIsOpen(false)}
         contentLabel="RFQ Details"
      >
        <RFQDetails /> {/* Pass the close function to the RFQDetails component */}
      </CustomModal>


       
    </div>
  );
}

export default QuotationRequest;
