import React, { useState, useRef } from "react";
import './TotalSaleDisplay.css'; // Import CSS file
import { Link } from 'react-router-dom';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';


const TotalSaleDisplay = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const salesData = [
    { item: "Medication A", amount: 150, date: "2024-09-01" },
    { item: "Surgical Gloves", amount: 75, date: "2024-09-05" },
    { item: "X-Ray Service", amount: 200, date: "2024-09-10" },
    { item: "Private Room", amount: 500, date: "2024-09-15" },
  ];

  const totalSales = salesData.reduce((total, sale) => total + sale.amount, 0);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Total Sales Overview</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Total Sales Overview</h1>
          <table>
            <thead>
              <tr>
                <th>Item/Service</th>
                <th>Amount (USD)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${salesData
        .map(sale => `
                  <tr>
                    <td>${sale.item}</td>
                    <td>${sale.amount.toFixed(2)}</td>
                    <td>${sale.date}</td>
                  </tr>
                `)
        .join('')}
            </tbody>
          </table>
          <h2>Total Sale: ${totalSales.toFixed(2)}</h2>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="marginsale-total-display-container">
      <h1 className="marginsale-title">Total Sales Overview</h1>
      <h2 className="marginsale-total-amount">Total Sale: {totalSales.toFixed(2)}</h2>
      <table className="marginsale-table">
        <thead>
          <tr>
            {["Item/Service",
              "Amount",
              "Date"].map((header, index) => (
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
          {salesData.map((sale, index) => (
            <tr key={index} className="marginsale-table-row">
              <td className="marginsale-table-data">{sale.item}</td>
              <td className="marginsale-table-data">{sale.amount.toFixed(2)}</td>
              <td className="marginsale-table-data">{sale.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/superuser/tower" className="totalsaleover-back-button">Back to SCM Control Tower</Link>
      <button className="totalsaleover-print-btn" onClick={handlePrint} style={{ marginLeft: "20px", border: "none" }}>Print</button>
    </div>
  );
};

export default TotalSaleDisplay;
