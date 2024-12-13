/* Mohini_GoodReceiptComponent_WholePage_14/sep/2024 */
import React, { useState, useEffect,useRef } from 'react';
import { Modal } from 'react-bootstrap'; // Ensure you have react-bootstrap installed
import axios from 'axios'; // Make sure axios is installed
import './PurchaseOrder.css'; // Ensure you have this CSS file
import GoodsReceiptForm from './GoodsReceiptForm';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import { API_BASE_URL } from '../api/api';
import * as XLSX from 'xlsx';
import CustomModal from '../../CustomModel/CustomModal';



const GoodReceiptComponent = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [goodReceipts, setGoodReceipts] = useState([]); // State to store fetched good receipts
  const [loading, setLoading] = useState(true); // State to manage loading
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);

  const handleOpenModal = () => setShowEditModal(true);
  const handleCloseModal = () => setShowEditModal(false);

  // Fetch good receipt data from API
  useEffect(() => {
    fetchGoodReceipts();
  }, []);

  const fetchGoodReceipts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/good-receipts/good-receipts`); // Adjust URL to your backend endpoint
      setGoodReceipts(response.data);
    } catch (error) {
      console.error('Error fetching good receipts:', error);
    } finally {
      setLoading(false);
    }
  };
  

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
    <div className="purchase-order-container">
      <div className="purchase-order-header">
        <button
          className="purchase-order-add-purchase-order-button"
          onClick={handleOpenModal}
        >
          Add New Good Receipt
        </button>

        <div className="purchase-order-status-filters">
          <label>List by Status:</label>
          <label>
            <input type="radio" /> Completed
          </label>
          <label>
            <input type="radio" /> Cancelled
          </label>
          <label>
            <input type="radio" /> All
          </label>
        </div>
      </div>

      <div className="purchase-data-order">
        <div className="purchase-order-date-range">
          <label htmlFor="from-date">From:</label>
          <input type="date" id="from-date" />
          <label htmlFor="to-date">To:</label>
          <input type="date" id="to-date" />
          {/* <button className="purchase-order-favorite-btn">★</button>
          <button className="purchase-order-reset-btn">-</button>
          <button className="purchase-order-date-range-button">OK</button> */}
        </div>
        <div className="purchase-order-supplier-filter">
          <label htmlFor="supplier">Supplier Name:</label>

          <select id="supplier">
            <option value="">Select Supplier</option>
          </select>

          <label htmlFor="aging-days">Aging Days:</label>
          <input type="number" id="aging-days" min="0" />
        </div>
      </div>

      <div className="purchase-order-search-container">
        <input
          type="text"
          className="purchase-order-search-box"
          placeholder="Search"
        />
               
               <div className="purchase-order-search-container">
    <div className="purchase-order-search-right">
        <span className="purchase-results-count-span">Showing 0 / 0 results</span>
        <button className="purchase-order-print-button"onClick={handleExport}>Export</button>
        <button className="purchase-order-print-button"onClick={handlePrint}>Print</button>

    </div>
</div>

      </div>

      {/* <div className="purchase-order-table-container"> */}
       
        <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                  "G.R. No",
                  "PO Date",
                  "GR Date",
                  "Supplier Bill Date",
                  "Bill No",
                  "Supplier Name",
                  "Sub Total",
                  "Discount Amount",
                  "VAT Amount",
                  "Total Amount",
                  "Remark",
                  "Aging Days",
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
            {loading ? (
              <tr>
                <td colSpan="13" className="purchase-order-no-rows">
                  Loading...
                </td>
              </tr>
            ) : goodReceipts.length > 0 ? (
              goodReceipts.map((receipt) => (
                <tr key={receipt.id}>
                  <td>{receipt.id}</td>
                  <td>{receipt.poDate}</td>
                  <td>{receipt.goodsReceiptDate}</td>
                  <td>{receipt.supplierBillDate}</td>
                  <td>{receipt.invoiceNumber}</td>
                  <td>{receipt.supplierName}</td>
                  <td>{receipt.subTotal}</td>
                  <td>{receipt.discountAmount}</td>
                  <td>{receipt.vatTotal}</td>
                  <td>{receipt.totalAmount}</td>
                  <td>{receipt.remarks}</td>
                  <td>{receipt.agingDays}</td>
                  <td>
                    <button style={{color:"black"}} onClick={() => alert('Edit functionality here')}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13 " className="purchase-order-no-rows">
                  No Rows To Show
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <div className="purchase-order-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      {/* </div> */}

      <CustomModal
        isOpen={showEditModal}
        onClose={handleCloseModal}
      >
       
          <GoodsReceiptForm />
      
      </CustomModal>
    </div>
  );
};

export default GoodReceiptComponent;
/* Mohini_GoodReceiptComponent_WholePage_14/sep/2024 */
