/* Ajhar tamboli sSIReports.jsx 19-09-24 */


// import React from 'react';
// import { Link } from 'react-router-dom';
// import "../SSInventory/sSIReports.css"

// const SSIReports = () => {
//   const reports = [
//     { name: 'Requisition/Dispatch Report', type: 'Report' },
//     { name: 'Transfer', type: 'Report' },
//     { name: 'Cunsumption Report', type: 'Report' },
    
//   ];

//   return (
//     <div className="ssI-dis-report-list">
//       {reports.map((report, index) => (
//         <div key={index} className="ssI-dis-report-item">
//           <div className="ssI-dis-report-icon"></div>
//           <div className="ssI-dis-report-info">
//             <h3>
//               {/* {report.name} */}
//               <Link to={report.link}>{report.name}</Link>
//               </h3>
//             <p>{report.type}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SSIReports;


import React, { useState } from 'react';
import "../SSInventory/sSIReports.css";
import SSIIReportsReqTC from './sSIIReportsReqTC'; // Import the requisition component
import SSIIReportsTransfer from './sSIIReportsTransfer'; // Import the transfer component
import SSIIReportsConsumReport from './sSIIReportsConsumReport';

const SSIReports = () => {
  const [selectedReport, setSelectedReport] = useState(null); // State to track which report is selected

  const reports = [
    { name: 'Requisition/Dispatch Report', type: 'Report', id: 'requisition' },
    { name: 'Transfer', type: 'Report', id: 'transfer' },
    { name: 'Consumption Report', type: 'Report', id: 'consumption' },
  ];

  // Handler to manage click on a report card
  const handleReportClick = (id) => {
    setSelectedReport(id);
  };

  // Conditional rendering based on selectedReport state
  if (selectedReport === 'requisition') {
    return <SSIIReportsReqTC />; // Render the SSIIReportsReqTC component when "Requisition/Dispatch Report" is clicked
  } else if (selectedReport === 'transfer') {
    return <SSIIReportsTransfer />; // Render the SSIIReportsTransfer component when "Transfer" is clicked
  }
  else if (selectedReport === 'consumption') {
    return <SSIIReportsConsumReport />; 
  }

  return (
    <div className="ssI-dis-report-list">
      {reports.map((report, index) => (
        <div key={index} className="ssI-dis-report-item" onClick={() => handleReportClick(report.id)}>
          <div className="ssI-dis-report-icon"></div>
          <div className="ssI-dis-report-info">
            <h3>{report.name}</h3>
            <p>{report.type}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SSIReports;
