/* Mohini_PurchaseOrder_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import PurchaseOrderForm from './PurchaseOrderForm';
import './PurchaseOrder.css';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import { API_BASE_URL } from '../api/api';
import CustomModel from "../../CustomModel/CustomModal"
import * as XLSX from 'xlsx';

const PurchaseOrder = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const handleOpenModal = () => setShowEditModal(true);
  const handleCloseModal = () => setShowEditModal(false);
  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  useEffect(() => {
    console.log('Purchase Orders after state update:', purchaseOrders); // Log state after update
  }, [purchaseOrders]);

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/order-purchase-orders`);
      console.log('API Response:', response.data); // Log the API response
      setPurchaseOrders(response.data); // Set the data in state
      console.log('Purchase Orders State:', purchaseOrders); // Log the state to ensure it's updated
    } catch (error) {
      console.error('There was an error fetching the purchase orders!', error);
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
      <button className='purchaseOrders-add-btn' onClick={handleOpenModal}> + New Purchase Order</button>
      <div className="purchase-order-header">

        <div className="purchase-order-status-filters">
          <label><input type="checkbox" defaultChecked /> Pending</label>
          <label><input type="checkbox" /> Completed</label>
          <label><input type="checkbox" /> Cancelled</label>
          <label><input type="checkbox" /> All</label>
        </div>
      </div>

      <div className="purchase-order-date-range">
        <label htmlFor="from-date">From:</label>
        <input type="date" id="from-date" />
        <label htmlFor="to-date">To:</label>
        <input type="date" id="to-date" />
        {/* <button className="purchase-order-favorite-btn">★</button>
         <button className="purchase-order-reset-btn">-</button>
                <button className="purchase-order-date-range-button">OK</button> */}
      </div>

      <div className="purchase-order-search-container">
        <input type="text" className="purchase-order-search-box" placeholder="Search" />
        <div className="purchase-order-search-right">
          <span className="purchase-results-count-span">Showing 0 / 0 results</span>
          <button className="purchase-order-print-button" onClick={handleExport}>Export</button>

          <button className="purchase-order-print-button" onClick={handlePrint}>Print</button>
        </div>
      </div>

      <CustomModel
        isOpen={showEditModal}
        onClose={handleCloseModal}


      >

        <PurchaseOrderForm />

      </CustomModel>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Date",
                "GenericName",
                "ItemName",
                "POStatus",
                "Quantity",
                "ReceivedQuantity",
                "StandardRate",
                "SubTotal",
                "VATAmount",
                "TotalAmount"
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
            {Array.isArray(purchaseOrders) && purchaseOrders.length > 0 ? (
              purchaseOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.referenceNo}</td>
                  <td>{order.poDate}</td>
                  <td>{order.deliveryDate}</td>
                  <td>{order.supplier}</td>
                  <td>{order.contact}</td>
                  <td>{order.subtotal}</td>
                  <td>{order.discount}</td>
                  <td>{order.vatAmount}</td>
                  <td>{order.ccCharge}</td>
                  <td>{order.totalAmount}</td>
                  <td>{order.status}</td>
                  <td>{order.verificationStatus}</td>
                  <td>
                    <button onClick={() => handleOpenModal(order.id)}>Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10 " className="purchase-order-no-rows">No Rows To Show</td>
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
      </div>



      {/* <Modal
        show={showEditModal}
        onHide={handleCloseModal}
        className="purchase-order-modal"
        size="lg"
        centered
      >
        <Modal.Body>
          <PurchaseOrderForm />
        </Modal.Body>
      </Modal> */}
    </div>
  );

};

export default PurchaseOrder;
/* Mohini_PurchaseOrder_WholePage_14/sep/2024 */
