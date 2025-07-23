 /* Ajhar Tamboli dispenReports.jsx 19-09-24 */

import React from 'react';
import { Link } from 'react-router-dom';
import "../DisReport/dispenReports.css"


const DispenReportList = () => {
  const reports = [
    { name: 'User Collection Report', type: 'Report', link: '/user-collection-report'},
    { name: 'Narcotics Daily Sales', type: 'Report',link:'/dr-Narcotics-Daily-Sales' },
    { name: 'Daily Sales Report', type: 'Report', link:'/dr-Daily-Sales-Report' },
    { name: 'Settlement Summary Report', type: 'Report', link:'/dr-SettlementSummary-Report'},
    { name: 'PaymentMode Wise Report', type: 'Report', link:'/dr-PaymentModeWise-Report' },
    { name: 'Stock Summary', type: 'Report' , link:'/dr-StockSummary-Report'},
  ];

  return (
    <div className="dis-report-list">
      {reports.map((report, index) => (
        <div key={index} className="dis-report-item">
          <div className="dis-report-icon"></div>
          <div className="dis-report-info">
            <h3>
              {/* {report.name} */}
              <Link to={report.link}>{report.name}</Link>
              </h3>
            <p>{report.type}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DispenReportList;

