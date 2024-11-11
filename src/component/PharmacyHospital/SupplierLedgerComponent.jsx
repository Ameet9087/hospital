/* Mohini_SupplierLedgerCom_WholePage_14/sep/2024 */
import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import "./PurchaseOrder.css";
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import { API_BASE_URL } from "../api/api";
import * as XLSX from 'xlsx';


const SupplierLedgerComponent = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);

    useEffect(() => {
        // Fetch data from the API
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/suppliers`);
                setSuppliers(response.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch suppliers");
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

     const handleUpdateSuccess = () => {
        setShowModal(false);
        // Refresh suppliers list
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/suppliers`);
                setSuppliers(response.data);
            } catch (error) {
                setError("Failed to fetch suppliers");
            }
        };
        fetchSuppliers();
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/suppliers/${id}`);
            setSuppliers(suppliers.filter(supplier => supplier.id !== id));
        } catch (error) {
            setError("Failed to delete supplier");
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
                {/* Header Content */}
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
            </div>
            <div className="purchase-order-search-container">
    <input type="text" className="purchase-order-search-box" placeholder="Search" />
    <div className="purchase-order-search-right">
        <span className="purchase-results-count-span">Showing 0 / 0 results</span>
        <button className="purchase-order-print-button" onClick={handleExport}>Export</button>

        <button className="purchase-order-print-button"onClick={handlePrint}>Print</button>
    </div>
</div>
            {/* <div className="purchase-order-table-container"> */}
            <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                 "Supplier Name",
    "Sub Total",
    "Discount Amount",
    "VAT Amount",
    "Total Amount",
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
                        {suppliers.length > 0 ? (
                            suppliers.map((supplier) => (
                                <tr key={supplier.id}>
                                    <td>{supplier.supplierName}</td>
                                    <td>{supplier.goodReceiptDate}</td>
                                    <td>{supplier.discountAmount}</td>
                                    <td>{supplier.vatAmount}</td>
                                    <td>{supplier.totalAmount}</td>
                                    <td>
                                        <button style={{color:"black"}} onClick={() => handleUpdate(supplier.id)}>Update</button>
                                        <button style={{color:"black"}} onClick={() => handleDelete(supplier.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="purchase-order-no-rows">No Rows To Show</td>
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
        </div>
    );
};

export default SupplierLedgerComponent;
/* Mohini_SupplierLedgerCom_WholePage_14/sep/2024 */
