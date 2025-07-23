import React, { useRef } from 'react';
// import './RequisitionDetailsPrint.css';
import "../SSInventory/sSSIInvenReqView.css"

const SSSIInvenReqView = ({ onClose, requisition }) => {
  console.log(requisition);

  const printRef = useRef();


  const handlePrint = () => {
    // Get the content to print, but exclude the print button

    let printContent = printRef.current.innerHTML;

    printContent = printContent.replace(
      /<button[^>]*class="subStore-print-button"[^>]*>.*?<\/button>/g,
      ""
    );

    printContent = printContent.replace(
      /<div[^>]*class="subStore-step subStore-completed"[^>]*>.*?<\/div>/g,
      ""
    );


    printContent = printContent.replace(
      /<div[^>]*class="subStore-step subStore-active"[^>]*>.*?<\/div>/g,
      ""
    );
    printContent = printContent.replace(
      /<div[^>]*class="subStore-step"[^>]*>.*?<\/div>/g,
      ""
    );
    // Remove the status steps section


    const printWindow = window.open("", "_blank"); // Open a new blank window

    // Write HTML with styles and print content
    printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              /* Add the same styles as in the component */
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
              }
              th, td {
                border: 1px solid #000;
                padding: 8px;
                text-align: center;
                font-size: 12px;
              }
              th {
                background-color: #f4f4f4;
                font-weight: bold;
              }
              .subStore-requested-by,
              .subStore-verified-by {
                margin: 10px 0;
              }
              .subStore-requisition-info {
                margin-top: 20px;
              }
              h1 {
                text-align: center;
                font-size: 24px;
              }
              .subStore-status-steps {
                margin-top: 20px;
                display: flex;
                justify-content: space-around;
              }
              .subStore-step {
                padding: 5px 15px;
                border: 1px solid #ccc;
                border-radius: 3px;
                font-size: 14px;
              }
              .subStore-completed {
                background-color: #d4edda;
                color: #155724;
              }
              .subStore-active {
                background-color: #fff3cd;
                color: #856404;
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);

    printWindow.document.close(); // Close document stream
    printWindow.print(); // Trigger print
    printWindow.close(); // Close print window after printing
  };

  return (
    <div className="subStore-requisition-details-container" ref={printRef}>
      {/* <div className="header">  
          <div className="logo-title">
            <div className="logo">+</div>
            <div className="title">Sasa Health</div>
          </div>
          <div className="header-info">
            <div>Requisition No: 17</div>
            <div className="contact-info">
              <div>KRA PIN: ;</div>
              <div>Phone No:</div>
              <div>Inventory Unit</div>
            </div>
            <div>Requisition Date: 2024-08-24T19:22:15.657</div>
          </div> 
        </div>*/}

      <div className="subStore-requisition-table" >
        <div className="subStore-table-header"><h1>REQUISITION DETAILS PRINT</h1> </div>
        <table>
          <thead>
            <tr>
              <th>Item Category</th>
              <th>Item Name</th>
              <th>Code</th>
              <th>Quantity</th>
              <th>Dispatched Qty.</th>
              <th>Pending Qty.</th>
              <th>Received Qty.</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {requisition?.requisitionItems?.map((item, index) => (
              <tr key={index}>
                <td>{item?.item?.subCategory?.category}</td>
                <td>{item?.item?.itemName}</td>
                <td>{item?.item?.itemCode}</td>
                <td>{item.requiredQuantity}</td>
                <td>{item.dispatchQuantity}</td>
                <td>{item.pendingQty}</td>
                <td>{item.requiredQuantity}</td>
                <td>{item.status}</td>
                <td>{item.remark || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="subStore-requisition-info">
        {/* <div className="subStore-requested-by">
          <strong>Requested By:</strong>
          <div>Mr. admin admin</div>
          <div>Aug 27, 2024, 7:22:15 PM</div>
        </div> */}
        {/* <div className="subStore-verified-by">
          <strong>Verified By:</strong>
          <div>1 Mr. admin admin (Aug 27, 2024, 7:23:00 PM)</div>
        </div> */}
      </div>

      <div className="subStore-status-steps">
        <div className={"subStore-step subStore-completed"}>Requested</div>
        <div className={`subStore-step subStore-active`}>Verified(1)</div>
        <div className="subStore-step subStore-dispatch">Dispatched</div>
        <div className="subStore-step subStore-receive">Received</div>
      </div>

      <div className="subStore-buttons">
        {/* <button className="subStore-edit-button">Edit</button>
          <button className="subStore-withdraw-button">Withdraw Request</button> */}
        <button className="subStore-print-button" onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default SSSIInvenReqView;
