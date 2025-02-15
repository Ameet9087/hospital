import React, { useEffect, useRef, useState } from "react";
import "./RequisitionPage.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";

function PurchaseOrder() {
  const [columnWidths, setColumnWidths] = useState({});
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const tableRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/purchaseorders`)
      .then((response) => response.json())
      .then((data) => setPurchaseOrders(data))
      .catch((error) =>
        console.error("Error fetching purchase orders:", error)
      );
  }, []);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateStatus = (orderId, action) => {
    const endpoint = action === "Approved" ? "approve" : "deny";
    fetch(`${API_BASE_URL}/purchaseorders/${orderId}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((updatedOrder) => {
        setPurchaseOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.purchaseOrderId === orderId
              ? { ...order, status: action }
              : order
          )
        );
      })
      .catch((error) => console.error("Error updating order status:", error));
  };

  const handleDateFilter = () => {
    // Filter logic for date range
    const filteredOrders = purchaseOrders.filter((order) => {
      const orderDate = new Date(order.poDate);
      const from = new Date(fromDate);
      const to = new Date(toDate);

      if (fromDate && toDate) {
        return orderDate >= from && orderDate <= to;
      } else if (fromDate) {
        return orderDate >= from;
      } else if (toDate) {
        return orderDate <= to;
      }
      return true;
    });

    return filteredOrders;
  };

  const filteredOrders = handleDateFilter().filter((order) => {
    if (selectedStatus === "All") {
      return true;
    } else if (selectedStatus === "Rejected") {
      return order.status === "Denied";
    } else {
      return order.status === selectedStatus;
    }
  });

  return (
    <div className="requisitionPageContainer">
      <div className="requisitionFilterSection">
      
        <div className="requisitionDatePickerContainer">
          <label>From:</label>
          <input
            type="date"
            className="requisitionDateInput"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label>To:</label>

          <input
            type="date"
            className="requisitionDateInput"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button className="requisitionOkButton">OK</button>
        </div>
        {/* <label className="requisitionCheckboxLabel">
          <input type="checkbox" />
          Check and Verify Purchase Order
        </label> */}
      </div>

      <div className="requisitionStatusSection">
        <div className="requisitionRadioButtons">
          <label>
            <input
              type="radio"
              name="verificationStatus"
              value="Pending"
              checked={selectedStatus === "Pending"}
              onChange={handleStatusChange}
            />{" "}
            Pending
          </label>
          <label>
            <input
              type="radio"
              name="verificationStatus"
              value="Approved"
              checked={selectedStatus === "Approved"}
              onChange={handleStatusChange}
            />{" "}
            Approved
          </label>
          <label>
            <input
              type="radio"
              name="verificationStatus"
              value="Rejected"
              checked={selectedStatus === "Rejected"}
              onChange={handleStatusChange}
            />{" "}
            Rejected
          </label>
          <label>
            <input
              type="radio"
              name="verificationStatus"
              value="All"
              checked={selectedStatus === "All"}
              onChange={handleStatusChange}
            />{" "}
            All
          </label>
        </div>
        {/* <div className="requisitionDropdownContainer">
          <label>Requisition Status:</label>
          <select className="requisitionDropdown">
            <option value="all">--ALL--</option>
          </select>
        </div> */}
      </div>

      <div className="requisitionTableContainer">
        <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "PO No",
                "Req No",
                "PO From",
                "Vendor",
                "PO Date",
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
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.purchaseOrderId}>
                  <td>{order.poId}</td>
                  <td>{order.referenceNumber}</td>
                  <td>{order.deliveryAddress}</td>
                  <td>{order.supplierDTO.supplierName}</td>
                  <td>{order.poDate}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      className="actionButton"
                      onClick={() =>
                        handleUpdateStatus(order.purchaseOrderId, "Approved")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="actionButton"
                      onClick={() =>
                        handleUpdateStatus(order.purchaseOrderId, "Denied")
                      }
                    >
                      Deny
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="requisitionNoRows">
                  No Rows To Show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PurchaseOrder;