 /* Ajhar Tamboli dispenSalesSalesList.jsx 19-09-24 */


import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import "../DisSales/dispenSalesSalesList.css"

function DispenSalesSalesList() {
  const [salesList, setSalesList] = useState([]); // State to store fetched sales data
  const [showAddReport, setShowAddReport] = useState(false);
  const [showScanDone, setShowScanDone] = useState(false);
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const printRef = useRef();

  // Fetch sales data from the API
  useEffect(() => {
    fetch("http://localhost:1415/api/hospital/fetch-all-saleList")
      .then(response => response.json())
      .then(data => setSalesList(data))
      .catch(error => console.error("Error fetching sales data:", error));
  }, []);

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
    documentTitle: 'Requisition_Report',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  return (
    <div className="dispenSalesSalesList-active-imaging-request">
      <header className='dispenSalesSalesList-header'></header>
      <div className="dispenSalesSalesList-controls">
        <div className="dispenSalesSalesList-date-range">
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
      <div className="dispenSalesSalesList-search-N-results">
        <div className="dispenSalesSalesList-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div className="dispenSalesSalesList-results-info">
          Showing {salesList.length} results
        <button className="dispenSalesSalesList-print-button" onClick={""}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="dispenSalesSalesList-print-button" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <h2>Requisition Report</h2>
          <p>Date and Time: {new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Req.No</th>
                <th>Requested By</th>
                <th>Requested From</th>
                <th>Date</th>
                <th>Status</th>
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
      <div className="dispenSalesSalesList-table-N-paginat">
        <table>
          <thead>
            <tr>
              <th>Hospital Number</th>
              <th>Invoice No</th>
              <th>Patient Name</th>
              <th>Sub Total</th>
              <th>Dis Amt</th>
              <th>Total Amt</th>
              <th>Date</th>
              <th>Patient Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {salesList.map((sale) => (
              <tr key={sale.saleId}>
                <td>{sale.hospitalNumber}</td>
                <td>{sale.invoiceNumber}</td>
                <td>{sale.patientName}</td>
                <td>{sale.subTotal}</td>
                <td>{sale.discountAmount}</td>
                <td>{sale.totalAmount}</td>
                <td>{sale.billDate}</td>
                <td>{sale.patientType}</td>
                <td>
                  {/* Add action buttons here if needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="dispenSalesSalesList-pagination">
          <span>0 to {salesList.length} of {salesList.length}</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      </div>
    </div>
  );
}

export default DispenSalesSalesList;
