import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import Modal from "react-modal";
import "./PurchaseOrder.css";
import AddPurchaseOrderDraft from "../components/AddPurchaseOrder";
import PurchaseOrderDraftList from "../components/PurchaseOrderDraftList";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";
import * as XLSX from 'xlsx';
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import GoodsReceipt from "./GoodsReceipt";
import PurchaseOrderView from "./PurchaseOrderView";
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
  const [show, setShow] = useState(false);
  const [showDraftListModal, setShowDraftListModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [data, setData] = useState([]);
  const [goodReceipt, setGoodsReceipt] = useState({});
  const componentRef = useRef();


  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);


  const handleCreatePOClick = () => {
    setShowCreatePO(true);
  };

  const handleStartDraftClick = () => {
    setShowDraftModal(true);
  };

  const handleViewDraftListClick = (item) => {
    setSelectedItem(item)
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
        const response = await axios.get(`${API_BASE_URL}/purchase-orders/getAll`);
        setData(response.data); // Store the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleExport = () => {
    if (tableRef.current) {
      // Converts table to worksheet
      const ws = XLSX.utils.table_to_sheet(tableRef.current);
      const wb = XLSX.utils.book_new(); // Creates a new workbook
      XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Adds the worksheet to the workbook
      XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
    } else {
      console.error('Table reference is missing.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleGoodsReceipt = (item) => {
    setGoodsReceipt(item);
    setShow(true);
  }


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
        </div>

        <div className="InvoiceHeaders__table-header">
          <div className="InvoiceHeaders__search-container">
            <input
              type="text"
              placeholder="Search"
              className="InvoiceHeaders__search-input"
            />
          </div>
          <div>
            <span className="PurchaseOrder-results">
              Showing {data.length} results
            </span>
            <button className="PurchaseOrder-export-button" onClick={handleExport}>Export</button>
            <ReactToPrint
              trigger={() => (
                <button className="PurchaseOrder-print-button" onClick={handlePrint}> Print</button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>

        <div ref={componentRef}>
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "PO No",
                  "PO Date",
                  "PR No",
                  "Vendor Name",
                  "Vendor Contact",
                  "Total Amount",
                  "PO Status",
                  "Verification Status",
                  "Actions"
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
              {data.length > 0 ? (
                data?.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.poDate}</td>
                    <td>PR{row.id}</td>
                    <td>{row?.vendor?.vendorName}</td>
                    <td>{row?.vendor?.contactNumber}</td>
                    <td>{row.totalAmount}</td>
                    <td>{row.status}</td>
                    <td>{row.status}</td>
                    <td>
                      <div className="PurchaseOrder-buttons">
                        <button
                          className="PurchaseOrder-view-button"
                          onClick={() => handleGoodsReceipt(row)}
                        >
                          Add To Goods Receipt
                        </button>
                        <button
                          className="PurchaseOrder-view-button"
                          onClick={() => { handleViewDraftListClick(row) }}
                        >
                          View
                        </button>
                      </div>
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
        onClose={() => setShowCreatePO(false)}
        style={customStyles}
        contentLabel="Add Purchase Order Draft Modal"
      >
        <AddPurchaseOrderDraft onClose={() => setShowCreatePO(false)} />
      </CustomModal>


      <CustomModal isOpen={show} onClose={() => setShow(false)}>
        <GoodsReceipt goodReceipt={goodReceipt} />
      </CustomModal>

      <CustomModal isOpen={showDraftListModal} onClose={closeDraftListModal}>
        <PurchaseOrderView item={selectedItem} />
      </CustomModal>
    </>
  );
}

export default PurchaseOrder;
