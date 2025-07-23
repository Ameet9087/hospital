// Dhanashree_MaterializedSalesView_19/09

import React, { useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import './Materialized.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';

const MaterializedSalesView = () => {
  // State to control the visibility of the table
  const [showTable, setShowTable] = useState(false);


  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Reference to the table for printing
  const componentRef = useRef();

  // Dummy data for the table
  const dummyData = [
    {
      fiscalYear: '2024',
      billNo: 'B001',
      customerName: 'John Doe',
      customerPan: 'ABCDE1234F',
      billDate: '2024-08-13',
      amount: '1000',
      discount: '100',
      taxableAmount: '900',
      taxAmount: '180',
      totalAmount: '1080',
      syncWithIRD: 'Yes',
      isBillPrinted: 'No',
      isBillActive: 'Yes',
      printedTime: 'N/A',
      enteredBy: 'Admin',
      printedBy: 'N/A',
      isRealtime: 'Yes',
      paymentMethod: 'Credit Card',
      vatRefundAmount: '0',
      transactionId: 'TXN123456'
    },
    {
      fiscalYear: '2024',
      billNo: 'B002',
      customerName: 'Jane Smith',
      customerPan: 'XYZAB5678H',
      billDate: '2024-08-14',
      amount: '2000',
      discount: '200',
      taxableAmount: '1800',
      taxAmount: '360',
      totalAmount: '2160',
      syncWithIRD: 'No',
      isBillPrinted: 'Yes',
      isBillActive: 'Yes',
      printedTime: '2024-08-14 10:00',
      enteredBy: 'Admin',
      printedBy: 'John Doe',
      isRealtime: 'No',
      paymentMethod: 'Cash',
      vatRefundAmount: '0',
      transactionId: 'TXN654321'
    }
  ];

  const handleShowReport = () => {
    setShowTable(true);
  };

  return (
    <div className="MaterializedSalesView-materialized-sales-view">
      <h2 className="MaterializedSalesView-header">MATERIALIZED SALES VIEW</h2>

      <div className="MaterializedSalesView-date-range">
        <div className="MaterializedSalesView-date-input">
          <label>From:</label>
          <input type="date" value="2024-08-13" />
        </div>
        <div className="MaterializedSalesView-date-input">
          <label>To:</label>
          <input type="date" value="2024-08-13" />
        </div>
        {/* <button className="MaterializedSalesView-star-button">☆</button>
        <button className="MaterializedSalesView-minus-button">-</button>
        <button className="MaterializedSalesView-show-report-button" onClick={handleShowReport}>Show Report</button> */}
      </div>

      <div className="MaterializedSalesView-search-bar">
        <input type="text" placeholder="Search" />
        <button className="MaterializedSalesView-search-button">🔍</button>
      </div>

      <div className="MaterializedSalesView-results-info">
        <span>Showing {showTable ? dummyData.length : 0} / {showTable ? dummyData.length : 0} results</span>
        <button className="MaterializedSalesView-export-btn">Export</button>
        <ReactToPrint
          trigger={() => <button className="MaterializedSalesView-print-btn" style={{ backgroundColor: ' #00c9c0', color: 'white' }} disabled={!showTable}>Print</button>}
          content={() => componentRef.current}
        />

      </div>

      {showTable && (
        <div className="MaterializedSalesView-sales-table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Fiscal Year",
                  "Bill_No",
                  "Customer_Name",
                  "Customer_Pan",
                  "Bill_Date",
                  "Amount",
                  "Discount",
                  "Taxable_Amount",
                  "Tax_Amount",
                  "Total_Amount",
                  "Sync With IRD",
                  "IS_Bill_Printed",
                  "IS_Bill_Active",
                  "Printed_Time",
                  "Entered_By",
                  "Printed_By",
                  "Is_realtime",
                  "Payment_Method",
                  "VAT_Refund_Amount",
                  "Transaction_Id"
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
              {dummyData.map((data, index) => (
                <tr key={index}>
                  <td>{data.fiscalYear}</td>
                  <td>{data.billNo}</td>
                  <td>{data.customerName}</td>
                  <td>{data.customerPan}</td>
                  <td>{data.billDate}</td>
                  <td>{data.amount}</td>
                  <td>{data.discount}</td>
                  <td>{data.taxableAmount}</td>
                  <td>{data.taxAmount}</td>
                  <td>{data.totalAmount}</td>
                  <td>{data.syncWithIRD}</td>
                  <td>{data.isBillPrinted}</td>
                  <td>{data.isBillActive}</td>
                  <td>{data.printedTime}</td>
                  <td>{data.enteredBy}</td>
                  <td>{data.printedBy}</td>
                  <td>{data.isRealtime}</td>
                  <td>{data.paymentMethod}</td>
                  <td>{data.vatRefundAmount}</td>
                  <td>{data.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* <div className="MaterializedSalesView-pagination">
        <span>0 to {showTable ? dummyData.length : 0} of {showTable ? dummyData.length : 0}</span>
        <button className="MaterializedSalesView-page-btn" disabled={!showTable}>First</button>
        <button className="MaterializedSalesView-page-btn" disabled={!showTable}>Previous</button>
        <span>Page 1 of 1</span>
        <button className="MaterializedSalesView-page-btn" disabled={!showTable}>Next</button>
        <button className="MaterializedSalesView-page-btn" disabled={!showTable}>Last</button>
      </div> */}
    </div>
  );
};

export default MaterializedSalesView;

// Dhanashree_MaterializedSalesView_19/09
