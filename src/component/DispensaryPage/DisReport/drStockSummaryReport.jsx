 /* Ajhar Tamboli drStockSummaryReport.jsx 19-09-24 */


import React, { useEffect, useState, useRef } from 'react';
import "../DisReport/drStockSummaryReport.css";
import { startResizing } from '../../TableHeadingResizing/resizableColumns';

function DrStockSummaryReport() {
  // State to hold fetched user collections
  const [userCollections, setUserCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Fetch user collections from the API
  useEffect(() => {
    fetch("http://localhost:1415/api/hospital/fetch-all-collections")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then(data => {
        setUserCollections(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="drStockSummaryReport-report">
      <h4><i className="fa-solid fa-star-of-life"></i> Stock Summary Report</h4>
      <div className="drStockSummaryReport-filters">
        <div className="drStockSummaryReport-date-range">
          <label>From: <input type="date" defaultValue="2024-08-16" /></label>
          <label>To: <input type="date" defaultValue="2024-08-16" /></label>
        </div>
        <div className="drStockSummaryReport-select-filters">
          <label>Select Dispensary:
            <input type="text" defaultValue="Main Dispensary" />
          </label>
        </div>
        </div>
      <div className="drStockSummaryReport-filters-second">
        <div className="drStockSummaryReport-select-filters">
          <label>Select Item:
            <select defaultValue="All">
              <option>All</option>
            </select>
          </label>
        </div>
        <div className="drStockSummaryReport-select-filters">
          <label>Select Generic:
            <input type="text" defaultValue="All" />
          </label>
        </div>
        <div className="drStockSummaryReport-select-filters">
        <button className="drStockSummaryReport-show-report-button"><i class="fa-solid fa-magnifying-glass"></i> Show Report</button>
        </div>
      </div>
      {/* <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button>🔍</button>
      </div>
      <div className="results-info">
        <span>Showing {userCollections.length} / {userCollections.length} results</span>
        <div>
          <button className="drStockSummaryReport-export-button">Export</button>
          <button className="drStockSummaryReport-print-button">Print</button>
        </div>
      </div> */}
        <div className='drStockSummaryReport-search-N-result'>
        <div className="drStockSummaryReport-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
           
          />
        </div>
        <div className="drStockSummaryReport-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="drStockSummaryReport-export-button"><i class="fa-regular fa-file-excel"></i> Export</button>
          <button className="drStockSummaryReport-print-button" ><i class="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      {/* <div className='drStockSummaryReport-table-N-paginationDiv'> */}
      <div className="table-container">
      <table ref={tableRef}>
        <thead>
          <tr>{[
            "Store",
            "Generic Name",
            "Item Name",
            "Unit",
            "Batch",
            "Expiry",
            "CP",
            "SP",
            "Opening Qty",
            "Opening Value",
            "Provisional Qty",
            "Provisional Value",
            "Closing Value",
            "Closing Qty",
            "Purchase Qty",
            "Purchase Value",
            "Purchase Return Qty",
            "Purchase Return Value",
            "Sales Qty",
            "Sales Return Qty",
            "Sales Return Value",
            "Consumption Qty",
            "Consumption Value",
            "Write-off Qty ",
            "Write-off Value ",
            "Stock ManageIn Qty ",
            "Stock ManageIn Value ",
            "Stock ManageOut Qty ",
            "Stock ManageOut Value ",
            "TransferIn Value ",
            "TransferIn Qty ",
            "TransferOut Value ",
            "TransferOut Qty ",
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
          {loading ? (
            <tr>
              <td colSpan="13">Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="13" className="drStockSummaryReport-no-data">{error}</td>
            </tr>
          ) : userCollections.length > 0 ? (
            userCollections.map((collection) => (
              <tr key={collection.collectionId}>
                <td>{collection.date}</td>
                <td>{collection.collectionType}</td>
                <td>{collection.receiptNo}</td>
                <td>{collection.hospitalNumber}</td>
                <td>{collection.patientName}</td>
                <td>{collection.subTotal}</td>
                <td>{collection.discount}</td>
                <td>{collection.netTotal}</td>
                <td>{collection.cashCollection}</td>
                <td>{collection.user}</td>
                <td>{collection.remarks}</td>
                <td>{collection.counterName}</td>
                <td>{collection.store}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13" className="drStockSummaryReport-no-data">No Rows To Show</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <div className="drStockSummaryReport-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
    </div>

      <div className="drStockSummaryReport-Summary">
        <h3>Summary</h3>
        <table>
          <thead>

          </thead>
          <tbody>
            <tr>
              <td>Opening Value</td>
              <td>Opening Quantity</td>
            </tr>
            <tr>
              <td>Purchase Value</td>
              <td>Purchase Quantity</td>
            </tr>
            <tr>
              <td>Purchase Return Value </td>
              <td>Purchase Return Quantity </td>
            </tr>
            <tr>
              <td>Sale 	 </td>
              <td>Sale Quantity	 </td>
            </tr>
            <tr>
              <td>Sale Return </td>
              <td>Sale Return Quantity</td>
            </tr>
            <tr>
              <td>Provisional  Return </td>
              <td>	Sale Return Quantity</td>
            </tr>
            <tr>
              <td>Write-off </td>
              <td>Write-off Quantity</td>
            </tr>
            <tr>
              <td>StockManage In-Value</td>
              <td>StockManage In-Quantity</td>
            </tr>
          </tbody>
        </table>
    </div>

    </div>
  );
}

export default DrStockSummaryReport;