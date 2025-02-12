  /* Mohini_NarcoticsStockReport_WholePage_14/sep/2024 */
  import React, { useState, useEffect, useRef } from 'react';
  import './NarcoticsStockReport.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

const NarcoticsStockReport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showZeroQuantity, setShowZeroQuantity] = useState(false);
  const [filterStore, setFilterStore] = useState('All');
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);

  const stockData = [
    { genericName: 'Diazepam Tablets', medicineName: 'Diazepam Tablets', batch: 'bat158', expiryDate: '2025-09-05', stockQty: 10000, salePrice: 1.32, totalSalesValue: 13200, dispensary: 'Main Dispensary' },
    { genericName: 'Diazepam Tablets', medicineName: 'Diazepam Tablets', batch: 'bat158', expiryDate: '2025-09-05', stockQty: 10000, salePrice: 1.32, totalSalesValue: 13200, dispensary: 'Main store' },
    { genericName: 'Morphine Injection 10mg/ml', medicineName: 'Morphine Injection 10mg/ml', batch: 'bat425', expiryDate: '2025-09-05', stockQty: 10000, salePrice: 196.2, totalSalesValue: 1962000, dispensary: 'Main Dispensary' },
    { genericName: 'Morphine Injection 10mg/ml', medicineName: 'Morphine Injection 10mg/ml', batch: 'bat425', expiryDate: '2025-09-05', stockQty: 10000, salePrice: 196.2, totalSalesValue: 1962000, dispensary: 'Main store' },
    { genericName: 'Morphine Sulphate Injection', medicineName: 'Morphine Sulphate Injection', batch: 'bat424', expiryDate: '2025-09-05', stockQty: 10000, salePrice: 2546, totalSalesValue: 25460000, dispensary: 'Main Dispensary' },
    { genericName: 'Morphine Sulphate Injection', medicineName: 'Morphine Sulphate Injection', batch: 'bat424', expiryDate: '2025-09-05', stockQty: 10000, salePrice: 2546, totalSalesValue: 25460000, dispensary: 'Main store' },
  ];

  const totalSalesValue = stockData.reduce((sum, item) => sum + item.totalSalesValue, 0);

  return (
    <div className="narcotics-stock-report-container">
      <h1>⚛ Narcotics Stock Report</h1>
      
      <div className="narcotics-stock-report-report-controls">
        <div className="narcotics-stock-report-search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>🔍</button>
        </div>
        <div className="narcotics-stock-report-filters">
          <label>
            <input
              type="checkbox"
              checked={showZeroQuantity}
              onChange={(e) => setShowZeroQuantity(e.target.checked)}
            />
            Show Zero Quantity
          </label>
          <label>
            Filter by Store:
            <select value={filterStore} onChange={(e) => setFilterStore(e.target.value)}>
              <option value="All">All</option>
              {/* Add other store options here */}
            </select>
          </label>
        </div>
      </div>

      <div className="narcotics-stock-report-results-info">
        <span>Showing {stockData.length} / {stockData.length} results</span>
        <button className="narcotics-stock-report-export-btn">⬇ Export</button>
        <button className="narcotics-stock-report-print-btn">Print</button>
      </div>
   <div className='table-container'>
   <table  ref={tableRef}>
          <thead>
            <tr>
              {[
               "Generic Name",
  "Medicine Name",
  "Batch ...",
  "Expiry Date",
  "Stock Qty",
  "SalePri...",
  "TotalSalesValue",
  "Dispensar..."
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
              <td>{item.genericName}</td>
              <td>{item.medicineName}</td>
              <td>{item.batch}</td>
              <td>{item.expiryDate}</td>
              <td>{item.stockQty}</td>
              <td>{item.salePrice}</td>
              <td>{item.totalSalesValue}</td>
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

export default NarcoticsStockReport;
  /* Mohini_NarcoticsStockReport_WholePage_14/sep/2024 */
