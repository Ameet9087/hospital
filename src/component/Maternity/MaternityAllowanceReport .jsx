import React, { useState, useEffect, useRef } from 'react';
import './MaternityAllowanceReport .css'; // Ensure this is the correct path
import { startResizing } from '../TableHeadingResizing/resizableColumns';

const MaternityAllowanceReportComponent = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isReceiptVisible, setReceiptVisible] = useState(false);
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);
  const handleClearButtonClick = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleShowReportClick = () => {
    setShowReport(true);
  };

  const handleViewDetailsClick = () => {
    setReceiptVisible(true);
  };

  const handleCloseReceipt = () => {
    setReceiptVisible(false);
  };
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='maternity-allowance-report'>
      <div className="maternity-allowance-container">
        <div className="maternity-allowance-header">
          <h1>Maternity Allowance Report</h1>
        </div>
        <div className="maternity-allowance-filter-section">
          <div className="maternity-allowance-date-filter">
            <label htmlFor="fromDate">From:</label>
            <input type="date" id="fromDate" name="fromDate" />
            <label htmlFor="toDate">To:</label>
            <input type="date" id="toDate" name="toDate" />
           
          </div>
          <div className="maternity-allowance-user-filter">
            <label htmlFor="userSelect">Select User :</label>
            <select id="userSelect">
              <option>----- All Users -----</option>
              {/* Add options for users dynamically here */}
            </select>
          </div>
          <button className="maternity-allow-report-button" onClick={handleShowReportClick}>Show Report</button>
        </div>

        {showReport && (
          <div className="maternity-report-container">
            <div className="maternity-report-search-bar">
              <input type="text" placeholder="Search" />
              
              {/* <button>
                <i className="fa fa-search" aria-hidden="true"></i>
              </button> */}
            </div>
            <div className='maternity-allow'>
              <span>Showing 1 to 2 of 2 results</span>
              <button className="maternity-report-export-button">
                <i className="fa fa-file-excel-o" aria-hidden="true"></i> Export
              </button>
              <button className="maternity-allowance-print-button"onClick={handlePrint}>Print</button>
              </div>
            <div className='maternity-report-allowance-table'>
            {/* <div className="maternity-report-table-container"> */}
            <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                "Date",
  "Receipt",
  "Patient Name",
  "Hospital",
  "Age/Sex",
  "Type",
  "Paid Amount",
  "Return Amount",
  "User",
  "Action"
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
                  {[
                    {
                      date: '2024-08-13',
                      receipt: 3,
                      patientName: 'Philip Juma',
                      hospital: 2406003702,
                      ageSex: '34Y',
                      type: 'Maternity Allowance',
                      paidAmount: 1000,
                      returnAmount: 0,
                      user: 'Mr. admin ad...',
                      action: 'View Details',
                    },
                    {
                      date: '2024-08-13',
                      receipt: 4,
                      patientName: 'Philip Juma',
                      hospital: 2406003702,
                      ageSex: '34Y',
                      type: 'Maternity Allowance...',
                      paidAmount: 0,
                      returnAmount: 1000,
                      user: 'Mr. admin ad...',
                      action: 'View Details',
                    },
                  ].map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.receipt}</td>
                      <td>{item.patientName}</td>
                      <td>{item.hospital}</td>
                      <td>{item.ageSex}</td>
                      <td>{item.type}</td>
                      <td>{item.paidAmount}</td>
                      <td>{item.returnAmount}</td>
                      <td>{item.user}</td>
                      <td>
                        <button className="maternity-report-view-details-button" onClick={handleViewDetailsClick}>{item.action}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            {/* </div> */}
            <div className="maternity-report-pagination">
  {/* <ul className="maternity-report-page-numbers">
    <li><button disabled={true}>First</button></li>
    <li><button disabled={true}>Previous</button></li>
    <li><span>Page 1 of 1</span></li>
    <li><button disabled={true}>Next</button></li>
    <li><button disabled={true}>Last</button></li>
  </ul> */}
</div>

            </div>
            {/* <div className="maternity-report-pagination">
             
              <ul className="maternity-report-page-numbers">
                <li>
                  <button disabled={true}>First</button>
                </li>
                <li>
                  <button disabled={true}>Previous</button>
                </li>
                <li>
                  <span>Page 1 of 1</span>
                </li>
                <li>
                  <button disabled={true}>Next</button>
                </li>
                <li>
                  <button disabled={true}>Last</button>
                </li>
              </ul>
            </div> */}
            <div className="maternity-report-summary">
              <h2>Summary</h2>
              <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                 "Particulars",
                 "Patient Count",
                 "Amount"
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
                    <td>Paid to Patient</td>
                    <td>1</td>
                    <td>1000</td>
                  </tr>
                  <tr>
                    <td>Returned from Patient</td>
                    <td>1</td>
                    <td>1000</td>
                  </tr>
                  <tr>
                    <td>Net Paid Amount</td>
                    <td></td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isReceiptVisible && (
          <div className="maternity-allowance-modal-background" onClick={handleCloseReceipt}>
            <div className="maternity-allowance-modal-content" onClick={e => e.stopPropagation()}>
              <div className="maternity-allowance-receipt-container">
                <div className="maternity-allowance-receipt-header">
                  <h2>Maternity Allowance Payment Receipt</h2>
                  <button className="maternity-allowance-close-button" onClick={handleCloseReceipt}>X</button>
                </div>
                <hr />
                <div className="matternity-allowance-receipt-content">
                  <p><strong>Receipt No :</strong> 2024-3</p>
                  <p><strong>Date:</strong> 2024/8/13 (2081-04-29 BS)</p>
                  <p><strong>Hospital No :</strong> 2406003702</p>
                  <p><strong>Patient Name :</strong> Philip Juma</p>
                  <p><strong>Age/Sex :</strong> 34Y/Male</p>
                  <p><strong>Paid Amount :</strong> Kshs. 1000</p>
                  <p>(In Words : One thousand Only)</p>
                  <hr />
                  <p><strong>Kshs. 1000 paid to Philip Juma, Hospital No :</strong> 2406003702</p>
                  <p><strong>User :</strong> Mr. admin admin</p>
                  <p><strong>Time :</strong> 14:34:02</p>
                </div>
                <div className="maternity-allowance-receipt-footer">
                  <button className="maternity-allowance-print-button"onClick={handlePrint}>Print</button>
                  <p>Selected Printer: <strong>Main-Counter-Printer-1</strong> <a href="#">Change ?</a></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaternityAllowanceReportComponent;
