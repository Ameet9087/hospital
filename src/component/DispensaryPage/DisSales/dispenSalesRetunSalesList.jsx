 /* Ajhar Tamboli dispenSalesReturnFromCust.jsx 19-09-24 */

import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import "../DisSales/dispenSalesRetunSalesList.css";
import { startResizing } from '../../TableHeadingResizing/resizableColumns';

function DispenSalesRetunSalesList() {
  const [returnLists, setReturnLists] = useState([]); // State to store return list data
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const printRef = useRef();
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:1415/api/hospital/return-lists/fetch-all-returnList')
      .then(response => response.json())
      .then(data => setReturnLists(data))
      .catch(error => console.error('Error fetching return list data:', error));
  }, []);

  const handleCreateRequisitionClick = () => {
    setShowCreateRequisition(true);
  };

  const closePopups = () => {
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
    <div className="dispenSalesRetunSalesList-active-imaging-request">
      {/* Header and Controls */}
      <header className='dispenSalesRetunSalesList-header'>
        {/* Your header and controls code */}
      </header>
      <div className="dispenSalesRetunSalesList-controls">
        <div className="dispenSalesRetunSalesList-date-range">
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

      {/* Search and Results Info */}
      <div className="dispenSalesRetunSalesList-search-N-results">
        <div className="dispenSalesRetunSalesList-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div className="dispenSalesRetunSalesList-results-info">
          Showing {returnLists.length} / {returnLists.length} results
          <button className="dispenSalesRetunSalesList-print-button" onClick={""}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="dispenSalesRetunSalesList-print-button" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      {/* Hidden Print Section */}
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <h2>Requisition Report</h2>
          <p>Date and Time: {new Date().toLocaleString()}</p>
          <table ref={tableRef}>
          <thead>
              <tr>{[
                "Req.No",
                "Requested By",
                "Requested From",
                "Date",
                "Status",
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
              {returnLists.map((item) => (
                <tr key={item.returnListId}>
                  <td>{item.returnListId}</td>
                  <td>{item.patientName}</td>
                  <td>{item.refInvoiceNumber}</td>
                  <td>{item.returnDate}</td>
                  <td>{item.patientType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table and Pagination */}
      {/* <div className="dispenSalesRetunSalesList-table-N-paginat"> */}
      <div className="table-container">

      <table ref={tableRef}>
      <thead>
            <tr>{[
              "Hospital Number",
              "Ref.Invoice No",
              "Patient Name",
              "Sub Total",
              "Dis Amt ",
              "Total Amt",
              "Return Date",
              "Credit Note No.",
              "Patient Type",
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
            {returnLists.map((item) => (
              <tr key={item.returnListId}>
                <td>{item.returnListId}</td>
                <td>{item.refInvoiceNumber}</td>
                <td>{item.patientName}</td>
                <td>{item.subTotal}</td>
                <td>{item.discountAmount}</td>
                <td>{item.totalAmount}</td>
                <td>{item.returnDate}</td>
                <td>{item.creditNoteNumber}</td>
                <td>{item.patientType}</td>
                <td>
                  <button onClick={() => alert(`Action for ${item.returnListId}`)}>Action</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="dispenSalesRetunSalesList-pagination">
          <span>0 to {returnLists.length} of {returnLists.length}</span>
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

export default DispenSalesRetunSalesList;
