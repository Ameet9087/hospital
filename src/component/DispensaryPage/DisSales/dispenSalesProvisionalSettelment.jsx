 /* Ajhar Tamboli dispenSalesProvisionalSettelment.jsx 19-09-24 */

import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import "../DisSales/dispenSalesProvisionalSettelment.css"
import { startResizing } from '../../TableHeadingResizing/resizableColumns';

DispenSalesProvisionalSettelment
function DispenSalesProvisionalSettelment() {
  const [showAddReport, setShowAddReport] = useState(false);
  const [showScanDone, setShowScanDone] = useState(false);
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // useEffect(() => {
  //   axios.get('http://localhost:1415/api/provisional-bills/fetch-all-provisional-bills')
  //     .then(response => {
  //       setBills(response.data);
  //       setIsLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching provisional bills:', error);
  //       setIsLoading(false);
  //     });
  // }, [])

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
    <div className="dispenSalesProvisionalSettelment-active-imaging-request">
       
        <>
      {/* Rest of your code */}
      <header className='dispenSalesProvisionalSettelment-header'>
       
       </header>

       <div className="dispenSalesProvisionalSettelment-controls">
        {/* Your date range and button controls */}
          <div className="dispenSalesProvisionalSettelment-date-range">
            <label>
              From:
              <input type="date" defaultValue="2024-08-09" />
            </label>
            <label>
              To:
              <input type="date" defaultValue="2024-08-16" />
            </label>
           
          </div>
       <div className="dispenSalesProvisionalSettelment-select-filters">
          <label>Credit Organizations:
            <select defaultValue="All">
              <option>General</option>
            </select>
          </label>
        </div>
      </div>

       
       <div className="dispenSalesProvisionalSettelment-search-N-results">
         <div className="dispenSalesProvisionalSettelment-search-bar">
           <i className="fa-solid fa-magnifying-glass"></i>
           <input type="text" placeholder="Search" />
         </div>
         <div className="dispenSalesProvisionalSettelment-results-info">
           Showing 2 / 2 results
           <button className='dispenSalesProvisionalSettelment-print-btn'
           onClick={""}
           > <i className="fa-solid fa-file-excel"></i> Export</button>
           <button className='dispenSalesProvisionalSettelment-print-btn'
           onClick={handlePrint}
           ><i class="fa-solid fa-print"></i> Print</button>
         </div>
       </div>
       <div style={{ display: 'none' }}>
            <div ref={printRef}>
              <h2>Provisional Bill Report</h2>
              <p>Date and Time: {new Date().toLocaleString()}</p>
              <table ref={tableRef}>
                <thead>
                  <tr>{[
                  "Hospital Number",
              "Ret Receipt No",
              "Patient Name",
              "Contact No.",
              "Age/Sex ",
              "SubTotal",
              "Discount",
              "Total",
              "Ref No",
              "LastReturnDate",
              "VisitType",
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
                  <tr>
                    {/* Add your table data here */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      {/* <div className="dispenSalesProvisionalSettelment-table-N-paginat"> */}
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
              "Hospital Number",
              "Patient Name",
              "Age/Sex ",
              "Deposit Amt  ",
              "Credit Amt  ",
              "Provisional Amt  ",
              "Blance Amt  ",
              "Last Credit",
              "Last Deposit",
              
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
            <tr>
              
            </tr>
            <tr>
              
            </tr>
          </tbody>
        </table>
        {/* <div className="dispenSalesProvisionalSettelment-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      </div>

      </>
      

    </div>
  );
}

export default DispenSalesProvisionalSettelment;
