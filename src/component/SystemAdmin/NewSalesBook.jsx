/* Dhanashree_NewSalesBook_19/09 */

import React, { useState, useRef } from 'react';
import './NewSalesBook.css';
import DetailsSalesReport from '../SystemAdmin/ShowReport'; // Adjust path as necessary
import { useReactToPrint } from 'react-to-print';

const NewSalesBookDetails = () => {
  const [showReport, setShowReport] = useState(false);
  const printRef = useRef();

  const handleShowReport = () => {
    setShowReport(true);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="NewSalesBookDetails-sales-book-container">
      <div className="NewSalesBookDetails-sales-book-details">
        <h2 className="NewSalesBookDetails-header">SALES BOOK DETAILS</h2>
        <div className="NewSalesBookDetails-date-range">
          <div className="NewSalesBookDetails-date-input">
            <label>From:</label>
            <input type="date" defaultValue="2024-08-13" />
          </div>
          <div className="NewSalesBookDetails-date-input">
            <label>To:</label>
            <input type="date" defaultValue="2024-08-13" />
          </div>
          <button className="NewSalesBookDetails-star-button">☆</button>
          <button className="NewSalesBookDetails-minus-button">-</button>
          <button className="NewSalesBookDetails-show-report-button" onClick={handleShowReport}>
            Show Reportfghjkl
          </button>
        </div>
      </div>

      {/* Render DetailsSalesReport and add print functionality */}
      {showReport && (
        <div>
          <DetailsSalesReport ref={printRef} />
          <button className="NewSalesBookDetails-print-button" onClick={handlePrint}>
            Print
          </button>
        </div>
      )}
    </div>
  );
};

export default NewSalesBookDetails;

/* Dhanashree_NewSalesBook_19/09 */
