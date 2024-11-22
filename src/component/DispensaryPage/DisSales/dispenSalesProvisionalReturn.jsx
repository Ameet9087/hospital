

import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import "../DisSales/dispenSalesProvisionalReturn.css";
import { startResizing } from '../../TableHeadingResizing/resizableColumns';

function DispenSalesProvisionalReturn() {
  const [provisionalReturns, setProvisionalReturns] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for API call
  const printRef = useRef();
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Fetching data from the API when the component mounts
  useEffect(() => {
    fetch("http://localhost:1415/api/provisional-returns/fetch-all-provisional-returns")
      .then(response => response.json())
      .then(data => {
        setProvisionalReturns(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

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
    <div className="dispenSalesProvisionalReturn-active-imaging-request">
      <header className='dispenSalesProvisionalReturn-header'>
        {/* Header content */}
      </header>

      <div className="dispenSalesProvisionalReturn-controls">
        <div className="dispenSalesProvisionalReturn-date-range">
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

      <div className="dispenSalesProvisionalReturn-search-N-results">
        <div className="dispenSalesProvisionalReturn-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div className="dispenSalesProvisionalReturn-results-info">
          Showing {provisionalReturns.length} / {provisionalReturns.length} results
          <button className='dispenSalesProvisionalReturn-print-btn' onClick={""}> <i className="fa-solid fa-file-excel"></i> Export</button>
          <button className='dispenSalesProvisionalReturn-print-btn' onClick={handlePrint}><i class="fa-solid fa-print"></i> Print</button>
        </div>
      </div>

      {/* Print content */}
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
                "Age/Sex",
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
              {provisionalReturns.map((item) => (
                <tr key={item.returnId}>
                  <td>{item.hospitalNumber}</td>
                  <td>{item.returnRecepNumber}</td>
                  <td>{item.patientName}</td>
                  <td>{item.contact}</td>
                  <td>{item.age}</td>
                  <td>{item.subTotal}</td>
                  <td>{item.discount}</td>
                  <td>{item.total}</td>
                  <td>{item.refNumber}</td>
                  <td>{item.lastReturnDate}</td>
                  <td>{item.visitType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="dispenSalesProvisionalReturn-table-N-paginat"> */}
      <div className="table-container">
        {/* {loading ? (
          <p>Loading...</p>
        ) : ( */}
          <table ref={tableRef}>
            <thead>
              <tr>{[
                "Hospital Number",
                "Ret Receipt No",
                "Patient Name",
                "Contact No.",
                "Age/Sex",
                "SubTotal",
                "Discount",
                "Total",
                "Ref No",
                "LastReturnDate",
                "VisitType",
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
              {provisionalReturns.map((item) => (
                <tr key={item.returnId}>
                  <td>{item.hospitalNumber}</td>
                  <td>{item.returnRecepNumber}</td>
                  <td>{item.patientName}</td>
                  <td>{item.contact}</td>
                  <td>{item.age}</td>
                  <td>{item.subTotal}</td>
                  <td>{item.discount}</td>
                  <td>{item.total}</td>
                  <td>{item.refNumber}</td>
                  <td>{item.lastReturnDate}</td>
                  <td>{item.visitType}</td>
                  <td>
                    <button>Action</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        {/* )} */}
        {/* <div className="dispenSalesProvisionalReturn-pagination">
          <span>0 to {provisionalReturns.length} of {provisionalReturns.length}</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 1 of 1</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      </div>
    </div>
  );
}

export default DispenSalesProvisionalReturn;
