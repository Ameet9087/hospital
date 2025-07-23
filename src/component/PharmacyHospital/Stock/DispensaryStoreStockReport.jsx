/* Mohini_DispensaryStoreStockReport_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import './NarcoticsStockReport.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';

const DispensaryStoreStockReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showZeroQuantity, setShowZeroQuantity] = useState(false);
  const [filterStore, setFilterStore] = useState('All');
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);

  const stockData = [
    { itemName: '.OSMOLAX', batchNo: 'bat278', stockQty: 11, salePrice: 700, dispensary: 'Accounts' },
    { itemName: '.OSMOLAX', batchNo: 'bat278', stockQty: 10037, salePrice: 700, dispensary: 'Main Dispensary' },
    { itemName: '.OSMOLAX', batchNo: 'bat278', stockQty: 9888, salePrice: 700, dispensary: 'Main store' },
    { itemName: 'ACECLOFENAC + PARACETAMOL TABS', batchNo: '123', stockQty: 881, salePrice: 300, dispensary: 'Main Dispensary' },
    { itemName: 'ACECLOFENAC + PARACETAMOL TABS', batchNo: 'bat201', stockQty: 19915, salePrice: 89, dispensary: 'Main Dispensary' },
    { itemName: 'ACECLOFENAC TABS', batchNo: 'bat481', stockQty: 10000, salePrice: 3.34, dispensary: 'Main store' },
    { itemName: 'ACECLOFENAC TABS', batchNo: 'bat481', stockQty: 10000, salePrice: 3.34, dispensary: 'Main Dispensary' },
    { itemName: 'ACETAZOLOMIDE 250MG', batchNo: 'bat297', stockQty: 10000, salePrice: 60, dispensary: 'Main store' },
    { itemName: 'ACETAZOLOMIDE 250MG', batchNo: 'bat297', stockQty: 10000, salePrice: 60, dispensary: 'Main Dispensary' },
    { itemName: 'ACETAZOLOMIDE 250MG TABS', batchNo: 'bat23', stockQty: 9900, salePrice: 39.86, dispensary: 'Main Dispensary' },
    { itemName: 'ACETAZOLOMIDE 250MG TABS', batchNo: 'bat23', stockQty: 10000, salePrice: 39.86, dispensary: 'Main store' },
    { itemName: 'ACP MR', batchNo: 'bat7', stockQty: 9940, salePrice: 32.78, dispensary: 'Main Dispensary' },
    { itemName: 'ACP MR', batchNo: 'bat7', stockQty: 10000, salePrice: 32.78, dispensary: 'Main store' },
    { itemName: 'Acta\' Tablets', batchNo: 'bat65', stockQty: 9959, salePrice: 0.48, dispensary: 'Main Dispensary' }
  ];

  const totalSalesValue = stockData.reduce((sum, item) => sum + item.totalSalesValue, 0);


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
    <div className="narcotics-stock-report-container">
      <h1>⚛Dispensary/Store  Stock  Report</h1>
      <div className="nacotics-stock-selection">
                    <label>Selection</label>
                    <select>
                        <option>--Select selection--</option>
                    </select>
                    <button className='nacotics-stock-selection-btn'>Q Show Report</button>
                </div>
                
      <div className="narcotics-stock-report-report-controls">
        <div className="narcotics-stock-report-search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <button>🔍</button> */}
        </div>
       
      </div>

      <div className="narcotics-stock-report-results-info">
        <span>Showing {stockData.length} / {stockData.length} results</span>
        <button className="narcotics-stock-report-export-btn"onClick={handleExport}>⬇ Export</button>
        <button className="narcotics-stock-report-print-btn"onClick={handlePrint}>Print</button>
      </div>
   <div className='table-container'>
   <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                "Item Name",
  "Batch No.",
  "Stock Qty",
  "Sale Price",
  "Dispensary/Store Name"
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
          {stockData.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                <td>{item.itemName}</td>
              <td>{item.batchNo}</td>
              <td>{item.stockQty}</td>
              <td>{item.salePrice}</td>
              <td>{item.dispensary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="narcotics-stock-report-pagination">
        <span>1 to 6 of 6</span>
        <button>First</button>
        <button>Previous</button>
        <span>Page 1 of 1</span>
        <button>Next</button>
        <button>Last</button>
      </div> */}
      </div>
      <div className="narcotics-stock-report-summary">
        <h2>Summary</h2>
        <div className="narcotics-stock-report-total-sales">
          <span >Total Sales Value</span>
          <span>{totalSalesValue.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default DispensaryStoreStockReport;
/* Mohini_DispensaryStoreStockReport_WholePage_14/sep/2024 */
