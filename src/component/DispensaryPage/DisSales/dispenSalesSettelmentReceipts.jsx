 /* Ajhar Tamboli dispenSalesSettelmentReceipts.jsx 19-09-24 */


import React, { useState, useRef } from 'react';
// import "../DisStocks/dispenSalesProvisionalBill.css"
import { useReactToPrint } from 'react-to-print';
import "../DisSales/dispenSalesSettelmentReceipts.css"

DispenSalesSettelmentReceipts
function DispenSalesSettelmentReceipts() {
  const [showAddReport, setShowAddReport] = useState(false);
  const [showScanDone, setShowScanDone] = useState(false);
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);

  const printRef = useRef();

  const handleCreateRequisitionClick = () => {
    setShowCreateRequisition(true);
  };
  const closePopups = () => {
    setShowAddReport(false);
    setShowScanDone(false);
    setShowCreateRequisition(false);

  };
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'ProvisionalBill_Report',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  return (
    <div className="dispenSalesSettelmentReceipts-active-imaging-request">
       
        <>
      {/* Rest of your code */}
      <header className='dispenSalesSettelmentReceipts-header'>
         {/* <h4>* ACTIVE IMAGING R EQUEST</h4> */}
         {/* <div className="dispenSalesSettelmentReceipts-checkBox">
           <label>
            <input type="checkbox" />
             All
           </label>
           
            <input type="checkbox" />
            <label >Completed</label>
            <input type="checkbox" />
            <label >Pending</label>
           

             
         </div> */}
       </header>
       <div className="dispenSalesSettelmentReceipts-controls">

       {/* <div className="dispenSalesSettelmentReceipts-select-filters">
          <label>Credit Organizations:
            <select defaultValue="All">
              <option>General</option>
            </select>
          </label>
        </div> */}
         <div className="dispenSalesSettelmentReceipts-date-range">
           <label>
             From:
             <input type="date" defaultValue="2024-08-09" />
           </label>
           <label>
             To:
             <input type="date" defaultValue="2024-08-16" />
           </label>
</div>
         {/* <button className='dispenSalesSettelmentReceipts-CreateRequisition'>Load Data</button> */}
       </div>
       <div className="dispenSalesSettelmentReceipts-search-N-results">
         <div className="dispenSalesSettelmentReceipts-search-bar">
           <i className="fa-solid fa-magnifying-glass"></i>
           <input type="text" placeholder="Search" />
         </div>
         <div className="dispenSalesSettelmentReceipts-results-info">
           Showing 2 / 2 results
           <button className='dispenSalesSettelmentReceipts-print-btn'
           onClick={handlePrint}
           >Print</button>
         </div>
       </div>
       <div style={{ display: 'none' }}>
            <div ref={printRef}>
              <h2>Provisional Bill Report</h2>
              <p>Date and Time: {new Date().toLocaleString()}</p>
              <table>
                <thead>
                  <tr>
                  <th>Hospital No</th>
              <th>Patient Name</th>
              <th>Age/Sex </th>
              <th>Contact No.</th>
              <th> Receipt No</th>
              <th>Settlement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* Add your table data here */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      <div className="dispenSalesSettelmentReceipts-table-N-paginat">
        
        <table>
          <thead>
            <tr>
            <th>Hospital No</th>
              <th>Patient Name</th>
              <th>Age/Sex </th>
              <th>Contact No.</th>
              <th> Receipt No</th>
              <th>Settlement</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              
            </tr>
            <tr>
              
            </tr>
          </tbody>
        </table>
        <div className="dispenSalesSettelmentReceipts-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div>
      </div>

      </>
      

    </div>
  );
}

export default DispenSalesSettelmentReceipts;
