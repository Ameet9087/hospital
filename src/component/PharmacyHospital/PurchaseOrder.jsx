import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { API_BASE_URL } from "../api/api";
import PurchaseOrderForm from "./PurchaseOrderForm";
import CustomModel from "../../CustomModel/CustomModal";
import "./PurchaseOrder.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import GoodsReceiptForm from "./GoodsReceiptForm";
import PurchaseOrderBillPrint from "./PurchaseOrderBillPrint";
import UpdatePurchaseOrder from "./UpdatePurchaseOrder";
const PurchaseOrder = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addGoodReceipt, setAddGoodReceipt] = useState(false);
  const [viewBillModal, setViewBillModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [columnWidths, setColumnWidths] = useState({});
  const [filterDates, setFilterDates] = useState({ fromDate: "", toDate: "" });
  const [searchText, setSearchText] = useState("");
  const tableRef = useRef(null);
  const handleOpenModal = () => setShowSaveModal(true);
  const handleCloseModal = () => setShowSaveModal(false);
  useEffect(() => {
    fetchPurchaseOrders();
  }, []);
  useEffect(() => {
    applyFilters();
  }, [filterDates, searchText, purchaseOrders]);
  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/purchaseorders`);
      console.log(`${API_BASE_URL}/purchaseorders`);

      setPurchaseOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
    }
  };
  const handleDateChange = (e) => {
    const { id, value } = e.target;
    setFilterDates((prev) => ({ ...prev, [id]: value }));
  };
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const applyFilters = () => {
    let filtered = purchaseOrders;
    if (filterDates.fromDate || filterDates.toDate) {
      filtered = filtered.filter((order) => {
        const deliveryDate = new Date(order.deliveryDate);
        const fromDate = filterDates.fromDate
          ? new Date(filterDates.fromDate)
          : null;
        const toDate = filterDates.toDate ? new Date(filterDates.toDate) : null;
        if (fromDate && toDate) {
          return deliveryDate >= fromDate && deliveryDate <= toDate;
        }
        if (fromDate) {
          return deliveryDate >= fromDate;
        }
        if (toDate) {
          return deliveryDate <= toDate;
        }
        return true;
      });
    }
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter((order) =>
        order.supplierDTO?.supplierName.toLowerCase().includes(searchLower)
      );
    }
    setFilteredOrders(filtered);
  };
  const handleAddGoodReceipt = (item) => {
    setSelectedItem(item);
    setAddGoodReceipt(true);
  };
  const handleViewBill = (item) => {
    setSelectedItem(item); // Set the selected item to view
    setViewBillModal(true); // Open the modal
  };
  const handleSave = (order) => {
    setShowSaveModal(true);
  };

  const handleEdit = (order) => {
    setSelectedItem(order);
    setShowEditModal(true);
  };

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PurchaseOrderReport");
    XLSX.writeFile(wb, "PurchaseOrderReport.xlsx");
  };
  // Function to trigger print
  const handlePrint = () => {
    const printContent = tableRef.current;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
    <html>
      <head>
        <title>Print Table</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        ${printContent.outerHTML}
      </body>
    </html>
  `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };
  return (
    <div className="purchase-order-container">
      <button className="purchaseOrders-add-btn" onClick={handleOpenModal}>
        + New Purchase Order
      </button>
      <div className="purchase-order-header">
        <div className="purchase-order-status-filters">
          <label>
            <input type="checkbox" defaultChecked /> Pending
          </label>
          <label>
            <input type="checkbox" /> Completed
          </label>
          <label>
            <input type="checkbox" /> Cancelled
          </label>
          <label>
            <input type="checkbox" /> All
          </label>
        </div>
      </div>
      <div className="purchase-order-date-range">
        <label htmlFor="fromDate">From:</label>
        <input
          type="date"
          id="fromDate"
          value={filterDates.fromDate}
          onChange={handleDateChange}
        />
        <label htmlFor="toDate">To:</label>
        <input
          type="date"
          id="toDate"
          value={filterDates.toDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="purchase-order-search-container">
        <input
          type="text"
          className="purchase-order-search-box"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchChange}
        />
        <div className="purchase-order-search-right">
          <span className="purchase-results-count-span">
            Showing {filteredOrders.length} / {purchaseOrders.length} results
          </span>
          <button
            className="purchase-order-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="purchase-order-print-button" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <CustomModel isOpen={showSaveModal} onClose={handleCloseModal}>
        <PurchaseOrderForm />
      </CustomModel>
      <CustomModel
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        <UpdatePurchaseOrder purchaseOrder={selectedItem} />
      </CustomModel>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "PO ID",
                "Date",
                "Supplier",
                "Delivery Date",
                "Total Amount",
                "Status",
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
            {Array.isArray(filteredOrders) && filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.purchaseOrderId}>
                  <td>{order.poId}</td>
                  <td>{order.poDate}</td>
                  <td>{order.supplierDTO?.supplierName || "N/A"}</td>
                  <td>{order.deliveryDate}</td>
                  <td>{order.totalAmount}</td>
                  <td>{order.status}</td>
                  <td>
                    <div className="pharmacy-btn">
                      <button
                        className="pobtn-view"
                        onClick={() => handleViewBill(order)}
                      >
                        View
                      </button>
                      <button
                        className="pobtn-view"
                        onClick={() => handleAddGoodReceipt(order)}
                      >
                        Add Good Receipt
                      </button>
                      <button
                        className="pobtn-view"
                        onClick={() => handleEdit(order)}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="purchase-order-no-rows">
                  No Rows To Show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <CustomModel
        isOpen={addGoodReceipt}
        onClose={() => setAddGoodReceipt(false)}
      >
        <GoodsReceiptForm
          receivedPO={selectedItem}
          onClose={() => setAddGoodReceipt(false)}
        />
      </CustomModel>
      <CustomModel
        isOpen={viewBillModal}
        onClose={() => setViewBillModal(false)}
      >
        <PurchaseOrderBillPrint purchaseOrder={selectedItem} />
      </CustomModel>
    </div>
  );
};

export default PurchaseOrder;
