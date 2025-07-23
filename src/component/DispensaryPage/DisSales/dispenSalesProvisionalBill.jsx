   /* Ajhar Tamboli dispenSalesProvisionalBill.jsx 19-09-24 */

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { useReactToPrint } from 'react-to-print';
import "../DisSales/dispenSalesProvisionalBill.css";

function DispenSalesProvisionalBill() {
  const [bills, setBills] = useState([]); // State for storing fetched bills data
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const printRef = useRef();

  // Fetch data from API when component mounts
  useEffect(() => {
    axios.get('http://localhost:1415/api/provisional-bills/fetch-all-provisional-bills')
      .then(response => {
        setBills(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching provisional bills:', error);
        setIsLoading(false);
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
    <div className="dispenSalesProvisionalBill-active-imaging-request">
      <header className='dispenSalesProvisionalBill-header'>
        {/* Your header content */}
      </header>
      <div className="dispenSalesProvisionalBill-controls">
        {/* Your date range and button controls */}
          <div className="dispenSalesProvisionalBill-date-range">
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
      <div className="dispenSalesProvisionalBill-search-N-results">
        {/* Your search bar and results info */}
        <div className="dispenSalesProvisionalBill-search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
        <div className="dispenSalesProvisionalBill-results-info">
          Showing {bills.length} / {bills.length} results
          <button className='dispenSalesProvisionalBill-print-btn' onClick={handlePrint}> <i className="fa-solid fa-file-excel"></i> Export</button>
          <button className='dispenSalesProvisionalBill-print-btn' onClick={handlePrint}><i class="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <h2>Provisional Bill Report</h2>
          <p>Date and Time: {new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Schema</th>
                <th>Hospital Number</th>
                <th>Patient Name</th>
                <th>Age/Sex</th>
                <th>Contact No.</th>
                <th>Last Bill Date</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(bill => (
                <tr key={bill.provisionalBillId}>
                  <td>{bill.schemeName}</td>
                  <td>{bill.hospitalNumber}</td>
                  <td>{bill.patientName}</td>
                  <td>{bill.age}</td>
                  <td>{bill.contactNumber}</td>
                  <td>{bill.lastBillDate}</td>
                  <td>{bill.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="dispenSalesProvisionalBill-table-N-paginat">
        <table>
          <thead>
            <tr>
              <th>Schema</th>
              <th>Hospital Number</th>
              <th>Patient Name</th>
              <th>Age/Sex</th>
              <th>Contact No.</th>
              <th>Last Bill Date</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8">Loading...</td>
              </tr>
            ) : bills.length > 0 ? (
              bills.map(bill => (
                <tr key={bill.provisionalBillId}>
                  <td>{bill.schemeName}</td>
                  <td>{bill.hospitalNumber}</td>
                  <td>{bill.patientName}</td>
                  <td>{bill.age}</td>
                  <td>{bill.contactNumber}</td>
                  <td>{bill.lastBillDate}</td>
                  <td>{bill.total}</td>
                  <td>
                    {/* Add your action buttons or links here */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="dispenSalesProvisionalBill-pagination">
          {/* Your pagination controls */}
        </div>
      </div>
    </div>
  );
}

export default DispenSalesProvisionalBill;
