/* Ajhar Tamboli patientQueueDisplay.jsx 11-10-24 */


import React, { useState, useEffect } from 'react';
import "./purchaseOrderCreation.css";
import AddPurchaseOrderCreation from './addPurchaseOrderCreation';
import CustomModal from '../../../CustomModel/CustomModal';

const PurchaseOrderCreation = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [purchaseorder, setPurchaseOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('2024-08-09'); // Default From date
  const [toDate, setToDate] = useState('2026-08-16'); // Default To date

  const handleAddPurchaseOrderCreation = () => {
    setSelectedOrder(null);
    setShowPopup(true);
  };

  const handleEditPurchaseOrderCreation = (order) => {
    setSelectedOrder(order);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const fetchPurchaseOrders = async () => {
    try {
      const response = await fetch('http://localhost:8086/api/purchaseorders/getall');
      const data = await response.json();
      setPurchaseOrder(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
    }
  };

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const handleAddUpdate = async (purchaseOrder) => {
    const method = selectedOrder ? 'PUT' : 'POST';
    const url = selectedOrder
      ? `http://localhost:8086/api/purchaseorders/update/${purchaseOrder.order_id}`
      : 'http://localhost:8086/api/purchaseorders/add';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseOrder),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      console.log('PurchaseOrder added/updated successfully:', result);
      fetchPurchaseOrders();
    } catch (error) {
      console.error('Error adding/updating purchase order:', error);
    }
  };

  // Filter orders based on search query and date range
  const filteredOrders = purchaseorder.filter(order => {
    const orderDate = new Date(order.orderDate);
    const from = new Date(fromDate);
    const to = new Date(toDate);

    return (
      order.itemName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      orderDate >= from && orderDate <= to
    );
  });

  const indexOfLastTest = currentPage * itemsPerPage;
  const indexOfFirstTest = indexOfLastTest - itemsPerPage;
  const currentTests = filteredOrders.slice(indexOfFirstTest, indexOfLastTest);

  return (
    <div className="purchaseOrderCreation-container">
      <div className="purchaseOrderCreation-firstRow">
        <div className="purchaseOrderCreation-addBtn">
          <button className="purchaseOrderCreation-add-button" onClick={handleAddPurchaseOrderCreation}>+Add Purchase Order Creation</button>
        </div>
      </div>
      <div className="purchaseOrderCreation-controls">
      <div className="tenderManagement-date-range">
          <label>
            From:
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </label>
          <label>
            To:
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </label>
          <button className="tenderManagement-star-button">☆</button>
          <button className="tenderManagement-ok-button">OK</button>
        </div>
      </div>
      <div className='purchaseOrderCreation-search-N-result'>
        <div className="purchaseOrderCreation-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by Item Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="purchaseOrderCreation-results-info">
          <span>Showing {currentTests.length} / {filteredOrders.length} results</span>
          <button className="purchaseOrderCreation-print-button"><i className="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Purchase Order ID</th>
            <th>Vendor ID</th>
            <th>Purchase Order Date</th>
            <th>Purchase Order Status</th>
            <th>Item Name/Description</th>
            <th>Item Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
            <th>Delivery Date</th>
            <th>Payment Terms</th>
            <th>Approver Name</th>
            <th>Remarks</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTests.map((test, index) => (
            <tr key={index}>
              <td>{test.order_id}</td>
              <td>{test.vendormanagement.vendor_id}</td>
              <td>{test.orderDate}</td>
              <td>{test.status}</td>
              <td>{test.itemName}</td>
              <td>{test.itemQuantity}</td>
              <td>{test.unitPrice}</td>
              <td>{test.totalPrice}</td>
              <td>{test.deliveryDate}</td>
              <td>{test.paymentTerms}</td>
              <td>{test.approverName}</td>
              <td>{test.remarks}</td>
              <td>{test.status}</td>
              <td>
                <button className="purchaseOrderCreation-edit-button" onClick={() => handleEditPurchaseOrderCreation(test)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <CustomModal>
          
            <AddPurchaseOrderCreation onClose={handleClosePopup} order={selectedOrder} onSubmit={handleAddUpdate} />
        
        </CustomModal>
      )}
      <div className="nGOpatientRegistration-pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          « Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next »
        </button>
      </div>
    </div>
  );
};

export default PurchaseOrderCreation;
