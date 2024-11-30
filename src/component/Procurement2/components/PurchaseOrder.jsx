import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import Modal from "react-modal";
import "./PurchaseOrder.css";
import AddPurchaseOrderDraft from "../components/AddPurchaseOrder";
import PurchaseOrderDraftList from "../components/PurchaseOrderDraftList";
import CustomModal from "../../../CustomModel/CustomModal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    overflow: "auto",
  },
};

function PurchaseOrder() {
  const [showCreatePO, setShowCreatePO] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [showDraftListModal, setShowDraftListModal] = useState(false);
  const [data, setData] = useState([]);
  const componentRef = useRef();

  const handleCreatePOClick = () => {
    setShowCreatePO(true);
  };

  const handleStartDraftClick = () => {
    setShowDraftModal(true);
  };

  const handleViewDraftListClick = () => {
    setShowDraftListModal(true); // Open draft list modal
  };
  const closeDraftModal = () => {
    setShowDraftModal(false);
  };

  const closeDraftListModal = () => {
    setShowDraftListModal(false); // Close draft list modal
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/purchase-orders"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="PurchaseOrder-container">
        <div className="PurchaseOrder-top-actions">
          <button
            className="PurchaseOrder-create-po-button"
            onClick={handleCreatePOClick}
          >
            Create Purchase Order
          </button>
          <button
            className="PurchaseOrder-start-draft-button"
            onClick={handleStartDraftClick}
          >
            + Start New Draft
          </button>
          <button
            className="PurchaseOrder-view-draft-button"
            onClick={handleViewDraftListClick}
          >
            ⇱ View Draft List
          </button>
        </div>

        <div className="PurchaseOrder-date-range">
          <label>
            From: <input type="date" defaultValue="2024-07-11" />
          </label>
          <label>
            To: <input type="date" defaultValue="2024-07-29" />
          </label>
          <button className="PurchaseOrder-star-button">★</button>
          <button className="PurchaseOrder-dash-button">-</button>
          <button className="PurchaseOrder-ok-button">✓ OK</button>
        </div>

        <div className="PurchaseOrder-search-bar">
          <input
            className="PurchaseOrder-search-input"
            type="text"
            placeholder="Search"
          />
          <button className="PurchaseOrder-search-button">🔍</button>
          <span className="PurchaseOrder-results">
            Showing {data.length} results
          </span>
          <button className="PurchaseOrder-export-button">Export</button>
          <ReactToPrint
            trigger={() => (
              <button className="PurchaseOrder-print-button">Print</button>
            )}
            content={() => componentRef.current}
          />
        </div>

        <div ref={componentRef}>
          <table className="PurchaseOrder-po-table">
            <thead>
              <tr>
                <th>PO No</th>
                <th>PO Date</th>
                <th>PR No</th>
                <th>Vendor Name</th>
                <th>Vendor C...</th>
                <th>Total Amount</th>
                <th>PO Status</th>
                <th>Verification Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.poDate}</td>
                    <td>PR{row.id}</td>
                    <td>{row.vendorName}</td>
                    <td>{row.contactPerson}</td>
                    <td>{row.totalAmount}</td>
                    <td>{row.status}</td>
                    <td>{row.status}</td>
                    <td>
                      <button
                        className="PurchaseOrder-view-button"
                        onClick={() => {
                          /* View logic here */
                        }}
                      >
                        View
                      </button>
                      <button
                        className="PurchaseOrder-edit-button"
                        onClick={() => {
                          /* Edit logic here */
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="PurchaseOrder-no-data">
                    No Rows To Show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for AddPurchaseOrderDraft */}
      <CustomModal
        isOpen={showCreatePO}
        onClose={()=>setShowCreatePO(false)}
        style={customStyles}
        contentLabel="Add Purchase Order Draft Modal"
      >
        {/* <button
          onClick={closeModal}
          className="PurchaseOrder-close-modal-button"
        >
          Close
        </button> */}
        <AddPurchaseOrderDraft />
      </CustomModal>

      {/* Modal for starting a new draft */}
      <CustomModal
        isOpen={showDraftModal}
        onRequestClose={closeDraftModal}
        style={customStyles}
        contentLabel="Start New Draft Modal"
      >
        <button
          onClick={closeDraftModal}
          className="PurchaseOrder-close-modal-button"
        >
          Close
        </button>
        <AddPurchaseOrderDraft />
      </CustomModal>

      {/* Modal for View Draft List */}
      <CustomModal
        isOpen={showDraftListModal}
        onRequestClose={closeDraftListModal}
        style={customStyles}
        contentLabel="View Draft List Modal"
      >
        <button
          onClick={closeDraftListModal}
          className="PurchaseOrder-close-modal-button"
        >
          Close
        </button>
        <PurchaseOrderDraftList />
      </CustomModal>
    </>
  );
}

export default PurchaseOrder;
