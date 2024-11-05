/* Ajhar tamboli sSPStoreTransfer.jsx 19-09-24 */


import React from 'react'
import "../SSPharmacy/sSPStoreTransfer.css"
function SSPStoreTransfer() {
  return (
    <div className="ssp-Transfer-store-container">
      
      <div className="ssp-Transfer-store-transfer-form">
      <div className="ssp-Transfer-controls">
          <div className="ssp-Transfer-date-range">
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
        <label htmlFor="transfer-type">Transfer Type:</label>
        <select id="transfer-type" className="ssp-Transfer-store-transfer-type">
          <option>Normal Transfer</option>
          <option>Expiry Transfer</option>
        </select>
        <div className="ssp-Transfer-search-N-results">
          <div className="ssp-Transfer-search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
          <div className="ssp-Transfer-results-info">
        <span>Showing {} / {} results</span>
            {/* Showing 2 / 2 results */}
            <button className='ssp-Transfer-print-btn' 
            // onClick={handleExportToExcel}
            >
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button className='ssp-Transfer-print-btn' 
            // onClick={handlePrint}
            ><i class="fa-solid fa-print"></i> Print</button>
          </div>
        </div>
        <table className='ssp-Transfer-store'>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Generic Name</th>
              <th>Batch No</th>
              <th>Cost Price</th>
              <th>Available Quantity</th>
              <th>Return Quantity</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>.OSMOLAX</td>
              <td>OSMOLAX</td>
              <td>bat278</td>
              <td>350</td>
              <td>11</td>
              <td>0</td>
              <td><input type="text" /></td>
              <td>2025-09-05</td>
            </tr>
          </tbody>
        </table>
        <button className="ssp-Transfer-store-btn-transfer">Transfer</button>
      </div>
    </div>
  )
}

export default SSPStoreTransfer