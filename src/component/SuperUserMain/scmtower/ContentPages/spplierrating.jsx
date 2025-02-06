import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './SupplierRatingTable.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';

const SupplierRatingTable = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const suppliers = [
    { supplier: 'MedSupply Co.', timeliness: 4.8, quality: 4.9, price: 4.5, customerService: 4.7 },
    { supplier: 'SafeHealth', timeliness: 4.5, quality: 4.7, price: 4.2, customerService: 4.6 },
    { supplier: 'TechMed Inc.', timeliness: 4.9, quality: 4.8, price: 4.6, customerService: 4.8 },
    { supplier: 'PureHands', timeliness: 4.4, quality: 4.5, price: 4.3, customerService: 4.4 },
  ];
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="supplierratingscm-container">
      <h1 className="supplierratingscm-title">Supplier Rating</h1>
      <table className="supplierratingscm-table">
        <thead>
          <tr>
            {["Supplier",

              "Timeliness",
              "Quality",
              "Price",
              "Customer Service"].map((header, index) => (
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
          {suppliers.map((supplier, index) => (
            <tr key={index} className="supplierratingscm-row">
              <td className="supplierratingscm-data">{supplier.supplier}</td>
              <td className="supplierratingscm-data">{supplier.timeliness} / 5</td>
              <td className="supplierratingscm-data">{supplier.quality} / 5</td>
              <td className="supplierratingscm-data">{supplier.price} / 5</td>
              <td className="supplierratingscm-data">{supplier.customerService} / 5</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/superuser/tower" className="suppyrating-back-button">Back to SCM Control Tower</Link>
      <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>

    </div>
  );
};

export default SupplierRatingTable;
