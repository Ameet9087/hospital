import React, { useState, useRef } from 'react';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import './RouteOptimization.css';
import { Link } from 'react-router-dom';

const RouteOptimization = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  // Example route optimization data
  const routeData = [
    {
      id: 'RO001',
      routeName: 'Ambulance Dispatch',
      optimizedDistance: '12 km',
      savedTime: '15 minutes',
      costSavings: '$20',
      date: '2024-09-28'
    },
    {
      id: 'RO002',
      routeName: 'Supply Delivery',
      optimizedDistance: '35 km',
      savedTime: '30 minutes',
      costSavings: '$50',
      date: '2024-09-29'
    },
    {
      id: 'RO003',
      routeName: 'Waste Disposal',
      optimizedDistance: '20 km',
      savedTime: '10 minutes',
      costSavings: '$10',
      date: '2024-09-30'
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="route-optimization-container">
      <h2 className="route-optimization-title">Route Optimization</h2>
      <table className="route-optimization-table">
        <thead>
          <tr>
            {[
              "ID",
              "Route Name",
              "Optimized Distance",
              "Saved Time",
              "Cost Savings",
              "Date"
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
          {routeData.map((route, index) => (
            <tr key={index}>
              <td>{route.id}</td>
              <td>{route.routeName}</td>
              <td>{route.optimizedDistance}</td>
              <td>{route.savedTime}</td>
              <td>{route.costSavings}</td>
              <td>{route.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/superuser/tower" className="routeoptimized-back-button">Back to SCM Control Tower</Link>
      <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>

    </div>
  );
};

export default RouteOptimization;
