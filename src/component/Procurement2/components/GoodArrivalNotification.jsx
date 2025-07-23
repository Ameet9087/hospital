import React, { useRef, useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import "./GoodArrivalNotification.css";
import AddGoodsReceipt from "../components/GoodsReceipt";
import CustomModal from "../../../CustomModel/CustomModal";
import * as XLSX from "xlsx";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import GoodsReceiptView from "./GoodsReceiptView";
function DonationInterface() {
  const componentRef = useRef();
  const [showReceiptForm, setShowReceiptForm] = useState(false);
  const [goodsReceipts, setGoodsReceipts] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const [selectedItem, setShowSelectedItem] = useState();
  const [showView, setShowView] = useState(false);
  const tableRef = useRef(null);

  const toggleReceiptForm = () => {
    setShowReceiptForm((prev) => !prev);
  };

  const handleView = (item) => {
    setShowSelectedItem(item);
    setShowView(true);
  };

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

  // Fetch goods receipts data on component mount
  useEffect(() => {
    // You should replace this with your actual API call
    fetch(`${API_BASE_URL}/goods-receipts/getAll`)
      .then((response) => response.json())
      .then((data) => setGoodsReceipts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "PurchaseOrderReport"); // Appends worksheet to workbook
    XLSX.writeFile(wb, "PurchaseOrderReport.xlsx"); // Downloads the Excel file
  };

  // Function to trigger print
  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
  };

  return (
    <div className="DonationInterface-container">
      <div className="DonationInterface-header">
        <button
          className="DonationInterface-btn-primary"
          onClick={toggleReceiptForm}
        >
          Create Goods Receipt
        </button>
        <div className="DonationInterface-status-filter">
          <span>List by Status:</span>
          <select>
            <option>Complete</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>
      <div className="DonationInterface-search-bar">
        <input type="text" placeholder="Search" />
      </div>

      <div className="DonationInterface-results-info">
        <span>Showing {goodsReceipts.length} results</span>
        <button
          className="DonationInterface-btn-secondary"
          onClick={handleExport}
        >
          Export
        </button>
        <ReactToPrint
          trigger={() => (
            <button
              className="DonationInterface-btn-secondary"
              onClick={handlePrint}
            >
              Print
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>

      <div ref={componentRef}>
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "GRN",
                "GR Date",
                "Vendor",
                "Vendor Bill Date",
                "Bill No",
                "Payment Mode",
                "Total Amount",
                "Remarks",
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
            {goodsReceipts.length > 0 ? (
              goodsReceipts.map((receipt) => (
                <tr key={receipt?.id}>
                  <td>{receipt?.id}</td>
                  <td>{receipt?.goodsReceiptDate}</td>
                  <td>{receipt?.vendor?.vendorName}</td>
                  <td>{receipt?.vendorBillDate}</td>
                  <td>{receipt?.billNo}</td>
                  <td>{receipt?.paymentMode}</td>
                  <td>{receipt?.totalAmount}</td>
                  <td>{receipt?.remarks}</td>
                  <td>
                    <button
                      className="DonationInterface-btn-action"
                      onClick={() => handleView(receipt)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="DonationInterface-no-data">
                  No Rows To Show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <CustomModal isOpen={showView} onClose={() => setShowView(false)}>
        <GoodsReceiptView selectedItem={selectedItem} />
      </CustomModal>

      <CustomModal
        isOpen={showReceiptForm}
        onClose={() => setShowReceiptForm(false)}
        style={customStyles}
        contentLabel="Add Purchase Order Draft Modal"
      >
        <AddGoodsReceipt onClose={() => setShowReceiptForm(false)} />
      </CustomModal>
    </div>
  );
}

export default DonationInterface;
