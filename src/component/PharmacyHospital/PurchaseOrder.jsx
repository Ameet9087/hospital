import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { API_BASE_URL } from '../api/api';
import PurchaseOrderForm from './PurchaseOrderForm';
import CustomModel from "../../CustomModel/CustomModal";
import './PurchaseOrder.css';
import { startResizing } from '../TableHeadingResizing/resizableColumns';

const PurchaseOrder = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]); // State for filtered orders
  const [showEditModal, setShowEditModal] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const [filterDates, setFilterDates] = useState({ fromDate: '', toDate: '' }); // State for date filters
  const [searchText, setSearchText] = useState(''); // State for search text
  const tableRef = useRef(null);

  const handleOpenModal = () => setShowEditModal(true);
  const handleCloseModal = () => setShowEditModal(false);

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  useEffect(() => {
    applyFilters(); // Apply filters when dates, search text, or purchase orders change
  }, [filterDates, searchText, purchaseOrders]);

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/purchase-orders`);
      setPurchaseOrders(response.data);
      setFilteredOrders(response.data); // Initialize filtered orders with all data
    } catch (error) {
      console.error('Error fetching purchase orders:', error);
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

    // Filter by date
    if (filterDates.fromDate || filterDates.toDate) {
      filtered = filtered.filter((order) => {
        const deliveryDate = new Date(order.deliveryDate);
        const fromDate = filterDates.fromDate ? new Date(filterDates.fromDate) : null;
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

    // Filter by search text
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter((order) =>
        order.goodReceiptItems.some((item) => {
          const genericName = item.genericName ? item.genericName.toLowerCase() : '';
          const itemName = item.addItem?.itemName ? item.addItem.itemName.toLowerCase() : '';
          const status = order.status ? order.status.toLowerCase() : '';
          return (
            genericName.includes(searchLower) ||
            itemName.includes(searchLower) ||
            status.includes(searchLower)
          );
        })
      );
    }
    
    setFilteredOrders(filtered);
  };

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport');
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="purchase-order-container">
      <button className='purchaseOrders-add-btn' onClick={handleOpenModal}>+ New Purchase Order</button>

      <div className="purchase-order-header">
        <div className="purchase-order-status-filters">
          <label><input type="checkbox" defaultChecked /> Pending</label>
          <label><input type="checkbox" /> Completed</label>
          <label><input type="checkbox" /> Cancelled</label>
          <label><input type="checkbox" /> All</label>
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
          <span className="purchase-results-count-span">Showing {filteredOrders.length} / {purchaseOrders.length} results</span>
          <button className="purchase-order-print-button" onClick={handleExport}>Export</button>
          <button className="purchase-order-print-button" onClick={handlePrint}>Print</button>
        </div>
      </div>

      <CustomModel isOpen={showEditModal} onClose={handleCloseModal}>
        <PurchaseOrderForm />
      </CustomModel>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Date", "GenericName", "ItemName", "POStatus", "Quantity", "StandardRate", "SubTotal", "TotalAmount"].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredOrders) && filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                order.goodReceiptItems.map((item, index) => (
                  <tr key={`${order.orderPurchaseId}-${index}`}>
                    <td>{order.deliveryDate}</td>
                    <td>{item.genericName}</td>
                    <td>{item.addItem.itemName || 'N/A'}</td>
                    <td>{order.status || 'Pending'}</td>
                    <td>{item.itemQuantity}</td>
                    <td>{item.standardRate}</td>
                    <td>{item.subTotal}</td>
                    <td>{item.totalAmount}</td>
                  </tr>
                ))
              ))
            ) : (
              <tr>
                <td colSpan="10" className="purchase-order-no-rows">No Rows To Show</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseOrder;
