
/* Ajhar Tamboli dispenSalesStockDetails.jsx 19-09-24 */


import React, { useState, useEffect } from "react";
import axios from 'axios'; // Import axios
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "../DisStocks/dispenSalesStockDetails.css";
import DispenTransfer from "./dispenTransfer";
import DispenStockRequisition from "./dispenStockRequisition";
import { API_BASE_URL } from "../../api/api";

const SalesStockDetails = () => {
    const [activeTab, setActiveTab] = useState("StockDetails");
    const [salesData, setSalesData] = useState([]); // State to hold the fetched data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to manage error messages

    console.log("Helloooo");

    // Fetch data from the backend API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/hospital/fetch-medicine-details`); // API call to the backend
                setSalesData(response.data); // Update state with the fetched data
                setLoading(false); // Set loading to false
                console.log(response.data);

            } catch (err) {
                console.error("Error fetching data", err);
                setError("Failed to fetch data from the server.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleExport = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(salesData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Stock Details");
        XLSX.writeFile(workbook, "SalesStockDetails.xlsx");
    };

    const handlePrint = () => {
        const doc = new jsPDF();
        const currentDateTime = new Date().toLocaleString();

        doc.text("Dispensary Stock Report", 20, 10);
        doc.text(`Generated on: ${currentDateTime}`, 20, 20);

        doc.autoTable({
            head: [['Generic Name', 'Medicine Name', 'Unit', 'Rack No', 'Batch No', 'Expiry Date', 'Available Quantity', 'Sale Price', 'Total Value', 'Store Name']],
            body: salesData.map(item => [
                item.genericName,
                item.medicineName,
                item.unit,
                item.rackNumber,
                item.batchNumber,
                item.expiryDate,
                item.availableQty,
                item.salePrice,
                (item.availableQty * item.salePrice).toFixed(2), // Calculating total value
                item.storeName
            ]),
            startY: 30,
        });

        doc.output('dataurlnewwindow');
    };

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>{error}</p>;

    return (

        <div className="dispenSalesStockDetails-container">
            <div className="dispenSalesStockDetails-header-tabs">
                <span
                    className={activeTab === "StockDetails" ? "dispenSalesStockDetails-tab-active" : "dispenSalesStockDetails-tab"}
                    onClick={() => setActiveTab("StockDetails")}

                >
                    Stock Details List
                </span>
                {/* <span 

                    className={activeTab === "Transfer" ? "dispenSalesStockDetails-tab-active" : "dispenSalesStockDetails-tab"} 
                    onClick={() => setActiveTab("Transfer")}
                >
                    Transfer
                </span> */}
                <span
                    className={activeTab === "Requisition" ? "dispenSalesStockDetails-tab-active" : "dispenSalesStockDetails-tab"}
                    onClick={() => setActiveTab("Requisition")}
                >
                    Requisition
                </span>
            </div>

            {activeTab === "StockDetails" && (
                <>
                    {/* Stock Details Content */}
                    <div className="dispenSalesStockDetails-filter-options">
                        <span>Filter by Store:</span>
                        <select>
                            <option>All</option>
                            <option>Main Dispensary</option>
                            <option>Main Store</option>
                        </select>
                        <label>
                            <input type="checkbox" /> Show Zero Quantity
                        </label>
                    </div>
                    <div className="dispenSalesStockDetails-controls">
                        {/* Your date range and button controls */}
                        <div className="dispenSalesStockDetails-date-range">
                            <label>
                                From:
                                <input type="date" defaultValue="2024-08-09" />
                            </label>
                            <label>
                                To:
                                <input type="date" defaultValue="2024-08-16" />
                            </label>

                        </div>
                    </div>

                    <div className='dispenSalesStockDetails-search-N-result'>
                        <div className="dispenSalesStockDetails-search-bar">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="text"
                                placeholder="Search..."
                            />
                        </div>
                        <div className="dispenSalesStockDetails-results-info">
                            <span>Showing {salesData.length} results</span>
                            <button className="dispenSalesStockDetails-print-button" onClick={handleExport}>
                                <i className="fa-solid fa-file-excel"></i> Export
                            </button>
                            <button className="dispenSalesStockDetails-print-button" onClick={handlePrint}>
                                <i class="fa-solid fa-print"></i> Print
                            </button>
                        </div>
                    </div>

                    <table className="dSSD-stock-table">
                        <thead>
                            <tr>
                                <th>Generic Name</th>
                                <th>Medicine Name</th>
                                <th>Unit</th>
                                <th>Rack No</th>
                                <th>Batch No</th>
                                <th>Expiry Date</th>
                                <th>Available Quantity</th>
                                <th>Sale Price</th>
                                <th>Total Value</th>
                                <th>Store Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.genericName}</td>
                                    <td>{item.medicineName}</td>
                                    <td>{item.unit}</td>
                                    <td>{item.rackNumber}</td>
                                    <td>{item.batchNumber}</td>
                                    <td>{item.expiryDate}</td>
                                    <td>{item.availableQty}</td>
                                    <td>{item.salePrice}</td>
                                    <td>{(item.availableQty * item.salePrice).toFixed(2)}</td>
                                    <td>{item.storeName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* <div className="dSSDetails-pagination-bar">
                        <span>1 to 20 of {salesData.length}</span>
                        <button>First</button>
                        <button>Previous</button>
                        <span>Page 1 of {(salesData.length / 20).toFixed(0)}</span>
                        <button>Next</button>
                        <button>Last</button>
                    </div> */}

                    <div className="sales-stock-details-summary">
                        <h4>Summary</h4>
                        <strong>Total Stock Value: </strong>{salesData.reduce((acc, item) => acc + (item.availableQty * item.salePrice), 0).toFixed(2)}
                    </div>
                </>
            )}

            {activeTab === "Transfer" && <DispenTransfer />}
            {activeTab === "Requisition" && <DispenStockRequisition />}
        </div>
    );
};

export default SalesStockDetails;
