import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './TotalStockValueTable.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';


const TotalStockValueTable = () => {

  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  // Dummy data for total stock value
  const stockData = [
    { category: 'Medications', quantity: 100, unitPrice: 10, totalValue: 1000 },
    { category: 'Medical Supplies', quantity: 500, unitPrice: 0.5, totalValue: 250 },
    { category: 'Surgical Instruments', quantity: 50, unitPrice: 200, totalValue: 10000 },
    { category: 'Medical Equipment', quantity: 10, unitPrice: 20000, totalValue: 200000 },
    { category: 'Laboratory Equipment', quantity: 20, unitPrice: 5000, totalValue: 100000 },
    { category: 'PPE (Masks, Gloves, etc.)', quantity: 1000, unitPrice: 2, totalValue: 2000 },
    { category: 'Oxygen Tanks', quantity: 50, unitPrice: 300, totalValue: 15000 },
  ];
  const handlePrint = () => {
    // Create a new window
    const printWindow = window.open('', '', 'height=600,width=800');

    // Add content to the print window
    printWindow.document.write(`
      <html>
        <head>
          <title>Total Stock Value</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Total Stock Value</h1>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Quantity (units)</th>
                <th>Unit Price ($)</th>
                <th>Total Value ($)</th>
              </tr>
            </thead>
            <tbody>
              ${stockData.map(item => `
                <tr>
                  <td>${item.category}</td>
                  <td>${item.quantity}</td>
                  <td>${item.unitPrice.toFixed(2)}</td>
                  <td>${item.totalValue.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);

    // Close the document to trigger the rendering
    printWindow.document.close();
    printWindow.focus();

    // Call the print function
    printWindow.print();

    // Close the print window after printing
    printWindow.close();
  };


  return (
    <div className="scmtower-container">
      <h1 className="scmtower-title">Total Stock Value</h1>
      <p className="scmtower-description">
        Below is the total stock value of various categories used within the hospital. This information helps in tracking and managing the inventory efficiently.
      </p>

      <table className="scmtower-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Category",
              "Quantity (units)",
              "Unit Price",
              "Total Value"
            ].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className="rd-resizable-th"
              >
                <div className="header-content">
                  <span>{header}</span>
                  <div
                    className="resizer"
                    onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                  ></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stockData.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{item.unitPrice.toFixed(2)}</td>
              <td>{item.totalValue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="scmtower-note">
        * The values shown above are for demonstration purposes and can be updated based on real-time inventory data.
      </p>
      <Link to="/superuser/tower" className="scmtower-back-btn">Back to SCM Control Tower</Link>
      <button className='scm-tower-printdata' onClick={handlePrint} style={{ marginLeft: "20px" }}>Print</button>
    </div>
  );
};

export default TotalStockValueTable;
