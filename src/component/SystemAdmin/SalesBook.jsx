/* Dhanashree_SalesBook_19/09 */

import React, { useState, useRef } from 'react';
import './SalesBook.css';
import DetailsSalesReport from './ShowReport'; // Adjust path as necessary
import { useReactToPrint } from 'react-to-print';

const SalesBookDetails = () => {
  const [showReport, setShowReport] = useState(false);
  const printRef = useRef();

  const handleShowReport = () => {
    setShowReport(true);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="SalesBookDetails-sales-book-container">
      <div className="SalesBookDetails-sales-book-details">
        <h2 className="SalesBookDetails-header">SALES BOOK DETAILS</h2>
        <div className="SalesBookDetails-date-range">
          <div className="SalesBookDetails-date-input">
            <label>From:</label>
            <input type="date" defaultValue="2024-08-13" />
          </div>
          <div className="SalesBookDetails-date-input">
            <label>To:</label>
            <input type="date" defaultValue="2024-08-13" />
          </div>
          <button className="SalesBookDetails-star-button">☆</button>
          <button className="SalesBookDetails-minus-button">-</button>
          <button className="SalesBookDetails-show-report-button" onClick={handleShowReport}>
            Show Report
          </button>
        </div>
      </div>

      {/* Render DetailsSalesReport and add print functionality */}
      {showReport && (
        <div>
          <DetailsSalesReport ref={printRef} />
          <button className="SalesBookDetails-print-button" onClick={() => handlePrint()}>
            Print
          </button>
        </div>
      )}
    </div>
  );
};

export default SalesBookDetails;
/* Dhanashree_SalesBook_19/09 */
