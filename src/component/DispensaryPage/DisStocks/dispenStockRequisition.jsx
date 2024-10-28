
// import React, { useState, useRef } from 'react';
// import "../DisStocks/dispenStockRequisition.css"
// import DispenStockRequisitionCreateReq from './dispenStockRequisitionCreateReq';
// import { useReactToPrint } from 'react-to-print';


// function DispenStockRequisition() {
//   const [showAddReport, setShowAddReport] = useState(false);
//   const [showScanDone, setShowScanDone] = useState(false);
//   const [showCreateRequisition, setShowCreateRequisition] = useState(false);

//   const printRef = useRef();

//   const handleCreateRequisitionClick = () => {
//     setShowCreateRequisition(true);
//   };
//   const closePopups = () => {
//     setShowAddReport(false);
//     setShowScanDone(false);
//     setShowCreateRequisition(false);

//   };
//   const handlePrint = useReactToPrint({
//     content: () => printRef.current,
//     documentTitle: 'Requisition_Report',
//     pageStyle: `
//       @page {
//         size: A4;
//         margin: 20mm;
//       }
//     `,
//   });

//   return (
//     <div className="dispenStockRequisition-active-imaging-request">
//         {showCreateRequisition ? (
//         <DispenStockRequisitionCreateReq onClose={() => setShowCreateRequisition(false)} />
//       ) :(
//         <>
//       {/* Rest of your code */}
//       <header className='dispenStockRequisition-header'>
//          {/* <h4>* ACTIVE IMAGING R EQUEST</h4> */}
//          <button className='dispenStockRequisition-CreateRequisition'onClick={handleCreateRequisitionClick}>Create Requisition</button>
//          <div className="dispenStockRequisition-checkBox">
//            <label>
//             <input type="checkbox" />
//              All
//            </label>
           
//             <input type="checkbox" />
//             <label >Completed</label>
//             <input type="checkbox" />
//             <label >Pending</label>
           

             
//          </div>
//        </header>
//        <div className="dispenStockRequisition-controls">
//          <div className="dispenStockRequisition-date-range">
//            <label>
//              From:
//              <input type="date" defaultValue="2024-08-09" />
//            </label>
//            <label>
//              To:
//              <input type="date" defaultValue="2024-08-16" />
//            </label>
//            <button className="dispenStockRequisition-star-button">☆</button>
//            <button className="dispenStockRequisition-ok-button">OK</button>
//          </div>
//        </div>
//        <div className="dispenStockRequisition-search-N-results">
//          <div className="dispenStockRequisition-search-bar">
//            <i className="fa-solid fa-magnifying-glass"></i>
//            <input type="text" placeholder="Search" />
//          </div>
//          <div className="dispenStockRequisition-results-info">
//            Showing 2 / 2 results
//            <button className='dispenStockRequisition-print-btn'onClick={handlePrint}>Print</button>
//          </div>
//        </div>
//        <div style={{ display: 'none' }}>
//             <div ref={printRef}>
//               <h2>Requisition Report</h2>
//               <p>Date and Time: {new Date().toLocaleString()}</p>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Req.No</th>
//                     <th>Requested By</th>
//                     <th>Requested From</th>
//                     <th>Date</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     {/* Add your table data here */}
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//       <div className="dispenStockRequisition-table-N-paginat">
        
//         <table>
//           <thead>
//             <tr>
//               <th>Req.No</th>
//               <th>Requested By</th>
//               <th>Requested From</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
              
//             </tr>
//             <tr>
              
//             </tr>
//           </tbody>
//         </table>
//         <div className="dispenStockRequisition-pagination">
//           <span>0 to 0 of 0</span>
//           <button>First</button>
//           <button>Previous</button>
//           <span>Page 0 of 0</span>
//           <button>Next</button>
//           <button>Last</button>
//         </div>
//       </div>

//       </>
//       )}

//     </div>
//   );
// }

// export default DispenStockRequisition;

 /* Ajhar Tamboli dispenStockRequisition.jsx 19-09-24 */

import React, { useState, useEffect, useRef } from 'react';
import "../DisStocks/dispenStockRequisition.css";
import DispenStockRequisitionCreateReq from './dispenStockRequisitionCreateReq';
import { useReactToPrint } from 'react-to-print';

function DispenStockRequisition() {
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [requisitions, setRequisitions] = useState([]);
  const printRef = useRef();

  // Fetch requisitions from the backend API
  useEffect(() => {
    fetch('http://localhost:1415/api/requisitions/fetch-all-requisitions')
      .then((response) => response.json())
      .then((data) => setRequisitions(data))
      .catch((error) => console.error('Error fetching requisitions:', error));
  }, []);

  const handleCreateRequisitionClick = () => {
    setShowCreateRequisition(true);
  };

  const closePopups = () => {
    setShowCreateRequisition(false);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Requisition_Report',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  return (
    <div className="dispenStockRequisition-active-imaging-request">
      {showCreateRequisition ? (
        <DispenStockRequisitionCreateReq onClose={closePopups} />
      ) : (
        <>
          <header className='dispenStockRequisition-header'>
            <button className='dispenStockRequisition-CreateRequisition' onClick={handleCreateRequisitionClick}>
              Create Requisition
            </button>
            <div className="dispenStockRequisition-checkBox">
              <label>
                <input type="checkbox" />
                All
              </label>
              <input type="checkbox" />
              <label>Completed</label>
              <input type="checkbox" />
              <label>Pending</label>
            </div>
          </header>
          <div className="dispenStockRequisition-controls">
          <div className="dispenStockRequisition-date-range">
      <label>
        From:
        <input type="date" defaultValue="2024-08-09" />
      </label>
      <label>
        To:
        <input type="date" defaultValue="2024-08-16" />
      </label>

    </div>

          </div>
          <div className="dispenStockRequisition-search-N-results">
            <div className="dispenStockRequisition-search-bar">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search" />
            </div>
            <div className="dispenStockRequisition-results-info">
              Showing {requisitions.length} / {requisitions.length} results
              <button className='dispenStockRequisition-print-btn' onClick={handlePrint}><i className="fa-solid fa-file-excel"></i> Export</button>
              <button className='dispenStockRequisition-print-btn' onClick={handlePrint}><i class="fa-solid fa-print"></i> Print</button>
            </div>
          </div>
          <div style={{ display: 'none' }}>
            <div ref={printRef}>
              <h2>Requisition Report</h2>
              <p>Date and Time: {new Date().toLocaleString()}</p>
              <table>
                <thead>
                  <tr>
                    <th>Req.No</th>
                    <th>Requested By</th>
                    <th>Requested From</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requisitions.map((req, index) => (
                    <tr key={index}>
                      <td>{req.requisitionId}</td>
                      <td>{req.requestedBy}</td>
                      <td>{req.requestedFrom}</td>
                      <td>{req.date}</td>
                      <td>{req.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="dispenStockRequisition-table-N-paginat">
            <table>
              <thead>
                <tr>
                  <th>Req.No</th>
                  <th>Requested By</th>
                  <th>Requested From</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requisitions.map((req, index) => (
                  <tr key={index}>
                    <td>{req.requisitionId}</td>
                    <td>{req.requestedBy}</td>
                    <td>{req.requestedFrom}</td>
                    <td>{req.date}</td>
                    <td>{req.status}</td>
                    <td>
                      {/* Add actions here if needed */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div className="dispenStockRequisition-pagination">
              <span>0 to {requisitions.length} of {requisitions.length}</span>
              <button>First</button>
              <button>Previous</button>
              <span>Page 0 of 0</span>
              <button>Next</button>
              <button>Last</button>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
}

export default DispenStockRequisition;
