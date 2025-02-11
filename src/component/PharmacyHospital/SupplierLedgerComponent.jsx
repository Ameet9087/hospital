import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./PurchaseOrder.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import * as XLSX from 'xlsx';

const SupplierLedgerComponent = () => {
    const [purchaseOrders, setPurchaseOrders] = useState([]); // Renamed suppliers to purchaseOrders
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // State for the search query
    const [filteredOrders, setFilteredOrders] = useState([]); // State for filtered orders
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    useEffect(() => {
        // Fetch data from the API
        const fetchPurchaseOrders = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/purchase-orders`);
                setPurchaseOrders(response.data);
                setFilteredOrders(response.data); // Initially show all orders
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch purchase orders");
                setLoading(false);
            }
        };

        fetchPurchaseOrders();
    }, []);

    // Function to update the filtered list based on search query
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query === "") {
            setFilteredOrders(purchaseOrders); // If search is cleared, show all orders
        } else {
            const filtered = purchaseOrders.filter(order => {
                // Search for the query in supplier name, subtotal, discount, VAT, and totalAmount
                return (
                    order.supplier.supplierName.toLowerCase().includes(query) ||
                    order.goodReceiptItems.some(item =>
                        item.subTotal.toString().includes(query) ||
                        item.discountAmount && item.discountAmount.toString().includes(query) ||
                        item.vatAmount && item.vatAmount.toString().includes(query) ||
                        item.totalAmount && item.totalAmount.toString().includes(query)
                    )
                );
            });
            setFilteredOrders(filtered);
        }
    };

    const handleUpdateSuccess = () => {
        setShowModal(false);
        // Refresh purchase orders list
        const fetchPurchaseOrders = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/purchase-orders`);
                setPurchaseOrders(response.data);
                setFilteredOrders(response.data); // Update filtered orders as well
            } catch (error) {
                setError("Failed to fetch purchase orders");
            }
        };
        fetchPurchaseOrders();
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/purchase-orders/${id}`);
            setPurchaseOrders(purchaseOrders.filter(order => order.orderPurchaseId !== id));
            setFilteredOrders(filteredOrders.filter(order => order.orderPurchaseId !== id)); // Remove from filtered list
        } catch (error) {
            setError("Failed to delete purchase order");
        }
    };

    // Calculate totals for each purchase order
    const calculateTotals = (order) => {
        const subtotal = order.goodReceiptItems.reduce((acc, item) => acc + item.subTotal, 0);
        const discount = order.discount;
        const taxableAmount = order.taxableAmount;
        const vatAmount = order.vatAmount;

        // Calculating Total Amount based on the provided fields
        const totalAmount = subtotal - discount + vatAmount + order.ccCharge + order.adjustment;

        return {
            subtotal: subtotal.toFixed(2),
            discountAmount: discount.toFixed(2),
            vatAmount: vatAmount.toFixed(2),
            totalAmount: totalAmount.toFixed(2)
        };
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
            <div className="purchase-order-header">
                {/* Header Content */}
            </div>
            <div className="purchase-data-order">
                <div className="purchase-order-date-range">
                    <label htmlFor="from-date">From:</label>
                    <input type="date" id="from-date" />
                    <label htmlFor="to-date">To:</label>
                    <input type="date" id="to-date" />
                </div>
            </div>
            <div className="purchase-order-search-container">
                <input
                    type="text"
                    className="purchase-order-search-box"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange} // Call the search handler on input change
                />
                <div className="purchase-order-search-right">
                    <span className="purchase-results-count-span">Showing {filteredOrders.length} results</span>
                    <button className="purchase-order-print-button" onClick={handleExport}>Export</button>
                    <button className="purchase-order-print-button" onClick={handlePrint}>Print</button>
                </div>
            </div>
            <table ref={tableRef}>
                <thead>
                    <tr>
                        {[
                            "Supplier Name",
                            "Sub Total",
                            "Discount Amount",
                            "VAT Amount",
                            "Total Amount",
                            // "Action"
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
                                        onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                                    ></div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => {
                            const { subtotal, discountAmount, vatAmount, totalAmount } = calculateTotals(order);
                            return (
                                <tr key={order.orderPurchaseId}>
                                    <td>{order.supplier.supplierName}</td>
                                    <td>{subtotal}</td>
                                    <td>{discountAmount}</td>
                                    <td>{vatAmount}</td>
                                    <td>{totalAmount}</td>
                                    {/* <td>
                                        <button className="purchase-order-print-button" onClick={() => handleUpdate(order.orderPurchaseId)}>Update</button>
                                        <button className="purchase-order-print-button" onClick={() => handleDelete(order.orderPurchaseId)}>Delete</button>
                                    </td> */}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="6" className="purchase-order-no-rows">No Rows To Show</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SupplierLedgerComponent;
