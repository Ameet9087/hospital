 /* Ajhar Tamboli drStockSummaryReport.jsx 19-09-24 */


import React, { useEffect, useState } from 'react';
import "../DisReport/drStockSummaryReport.css";

function DrStockSummaryReport() {
  // State to hold fetched user collections
  const [userCollections, setUserCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className='drStockSummaryReport-table-N-paginationDiv'>
      <table>
        <thead>
          <tr>
            <th>Store</th>
            <th>Generic Name</th>
            <th>Item Name</th>
            <th>Unit</th>
            <th>Batch</th>
            <th>Expiry</th>
            <th>CP</th>
            <th>SP</th>
            <th>Opening Qty</th>
            <th>Opening Value</th>
            <th>Provisional Qty</th>
            <th>Provisional Value</th>
            <th>Closing Value</th>
            <th>Closing Qty</th>
            <th>Purchase Qty</th>
            <th>Purchase Value</th>
            <th>Purchase Return Qty</th>
            <th>Purchase Return Value</th>
            <th>Sales Qty</th>
            <th>Sales Return Qty</th>
            <th>Sales Return Value</th>
            <th>Consumption Qty</th>
            <th>Consumption Value</th>
            <th>Write-off Qty </th>
            <th>Write-off Value </th>
            <th>Stock ManageIn Qty </th>
            <th>Stock ManageIn Value </th>
            <th>Stock ManageOut Qty </th>
            <th>Stock ManageOut Value </th>
            <th>TransferIn Value </th>
            <th>TransferIn Qty </th>
            <th>TransferOut Value </th>
            <th>TransferOut Qty </th>
           
            
            
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