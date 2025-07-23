/* Dhanashree_NewSales_19/09 */

import React, { useState, useRef } from 'react';
import './NewSales.css';
import DetailsSalesReport from './ShowReport'; // Adjust path as necessary
import { useReactToPrint } from 'react-to-print';

const NewSales = () => {
  const [showReport, setShowReport] = useState(false);
  const printRef = useRef();

  const handleShowReport = () => {
    setShowReport(true);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="NewSales-sales-book-container">
      <div className="NewSales-sales-book-details">
        <h2 className="NewSales-header">SALES BOOK DETAILS</h2>
        <div className="NewSales-date-range">
          <div className="NewSales-date-input">
            <label>From:</label>
            <input type="date" defaultValue="2024-08-13" />
          </div>
          <div className="NewSales-date-input">
            <label>To:</label>
            <input type="date" defaultValue="2024-08-13" />
          </div>
          <button className="NewSales-star-button">☆</button>
          <button className="NewSales-minus-button">-</button>
          <button className="NewSales-show-report-button" onClick={handleShowReport}>
            Show Report
          </button>
        </div>
      </div>

      {/* Render DetailsSalesReport and add print functionality */}
      {showReport && (
        <div>
          <DetailsSalesReport ref={printRef} />
          <button className="NewSales-print-button" onClick={() => handlePrint()}>
            Print
          </button>
        </div>
      )}
    </div>
  );
};

export default NewSales;

/* Dhanashree_NewSales_19/09 */
