// import React, { useEffect, useState } from 'react';
// import "../DisReport/drSettlementSummaryReport.css";

// function DrSettlementSummaryReport() {
//   // State to hold fetched user collections
//   const [userCollections, setUserCollections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch user collections from the API
//   useEffect(() => {
//     fetch("http://192.168.1.40:3155/api/hospital/fetch-all-collections")
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         return response.json();
//       })
//       .then(data => {
//         setUserCollections(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="drSettlementSummaryReport-report">
//       <h4><i className="fa-solid fa-star-of-life"></i> Settlement Summary Report</h4>
//       <div className="drSettlementSummaryReport-filters">
//         <div className="drSettlementSummaryReport-date-range">
//           <label>From: <input type="date" defaultValue="2024-08-16" /></label>
//           <label>To: <input type="date" defaultValue="2024-08-16" /></label>
//           <button className="drSettlementSummaryReport-star-button">☆</button>
//         </div>
//         <div className="drSettlementSummaryReport-select-filters">
//           <label>Select Dispensary:
//             <input type="text" defaultValue="Main Dispensary" />
//           </label>
//         </div>
//         <div className="drSettlementSummaryReport-select-filters">
//         <button className="drSettlementSummaryReport-show-report-button">Show Report</button>
//         </div>
//         </div>
//       <div className="drSettlementSummaryReport-filters-second">
//         {/* <div className="drSettlementSummaryReport-select-filters">
//           <label>Select Item:
//             <select defaultValue="All">
//               <option>All</option>
//             </select>
//           </label>
//         </div> */}
//         {/* <div className="drSettlementSummaryReport-select-filters">
//           <label>User:
//             <input type="text" defaultValue="All" />
//           </label>
//         </div> */}
//       </div>
//       {/* <div className="search-bar">
//         <input type="text" placeholder="Search" />
//         <button>🔍</button>
//       </div>
//       <div className="results-info">
//         <span>Showing {userCollections.length} / {userCollections.length} results</span>
//         <div>
//           <button className="drSettlementSummaryReport-export-button">Export</button>
//           <button className="drSettlementSummaryReport-print-button">Print</button>
//         </div>
//       </div> */}
//         <div className='drSettlementSummaryReport-search-N-result'>
//         <div className="drSettlementSummaryReport-search-bar">
//           <i className="fa-solid fa-magnifying-glass"></i>
//           <input 
//             type="text" 
//             placeholder="Search..." 
           
//           />
//         </div>
//         <div className="drSettlementSummaryReport-results-info">
//           <span>Showing 0 / 0 results</span>
//           <button className="drSettlementSummaryReport-export-button">Export</button>
//           <button className="drSettlementSummaryReport-print-button" >Print</button>
//         </div>
//       </div>
//       <div className='drSettlementSummaryReport-table-N-paginationDiv'>
//       <table>
//         <thead>
//           <tr>
//             <th>Hospital No</th>
//             <th>Patient Name</th>
//             <th>Age/Sex</th>
//             <th>Contact</th>
//             <th>Receivable Amount</th>
//             <th>Cash Discount</th>
//             <th>Discount Return</th>
//             <th>Settelement Date</th>
//             <th>Action</th>
            
            
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="13">Loading...</td>
//             </tr>
//           ) : error ? (
//             <tr>
//               <td colSpan="13" className="drSettlementSummaryReport-no-data">{error}</td>
//             </tr>
//           ) : userCollections.length > 0 ? (
//             userCollections.map((collection) => (
//               <tr key={collection.collectionId}>
//                 <td>{collection.date}</td>
//                 <td>{collection.collectionType}</td>
//                 <td>{collection.receiptNo}</td>
//                 <td>{collection.hospitalNumber}</td>
//                 <td>{collection.patientName}</td>
//                 <td>{collection.subTotal}</td>
//                 <td>{collection.discount}</td>
//                 <td>{collection.netTotal}</td>
//                 <td>{collection.cashCollection}</td>
//                 <td>{collection.user}</td>
//                 <td>{collection.remarks}</td>
//                 <td>{collection.counterName}</td>
//                 <td>{collection.store}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="13" className="drSettlementSummaryReport-no-data">No Rows To Show</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <div className="drSettlementSummaryReport-pagination">
//           <span>0 to 0 of 0</span>
//           <button>First</button>
//           <button>Previous</button>
//           <span>Page 0 of 0</span>
//           <button>Next</button>
//           <button>Last</button>
//         </div>
//     </div>
//     </div>
//   );
// }

// export default DrSettlementSummaryReport;

 /* Ajhar Tamboli drSettlementSummaryReport.jsx 19-09-24 */


import React, { useEffect, useState } from 'react';
import "../DisReport/drSettlementSummaryReport.css";

function DrSettlementSummaryReport() {
  // State to hold fetched settlement summaries
  const [settlementSummaries, setSettlementSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch settlement summaries from the API
  useEffect(() => {
    fetch("http://localhost:1415/api/settlement-summaries/fetch-all-settlement-summaries")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then(data => {
        setSettlementSummaries(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="drSettlementSummaryReport-report">
      <h4><i className="fa-solid fa-star-of-life"></i> Settlement Summary Report</h4>
      <div className="drSettlementSummaryReport-filters">
        <div className="drSettlementSummaryReport-date-range">
          <label>From: <input type="date" defaultValue="2024-08-16" /></label>
          <label>To: <input type="date" defaultValue="2024-08-16" /></label>
        </div>
        <div className="drSettlementSummaryReport-select-filters">
          <label>Select Dispensary:
            <input type="text" defaultValue="Main Dispensary" />
          </label>
        </div>
        <div className="drSettlementSummaryReport-select-filters">
          <button className="drSettlementSummaryReport-show-report-button">Show Report</button>
        </div>
      </div>
      <div className='drSettlementSummaryReport-search-N-result'>
        <div className="drSettlementSummaryReport-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="drSettlementSummaryReport-results-info">
          <span>Showing {settlementSummaries.length} / {settlementSummaries.length} results</span>
          <button className="drSettlementSummaryReport-export-button"><i class="fa-regular fa-file-excel"></i> Export</button>
          <button className="drSettlementSummaryReport-print-button"><i class="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <div className='drSettlementSummaryReport-table-N-paginationDiv'>
        <table>
          <thead>
            <tr>
              <th>Hospital No</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Contact</th>
              <th>Receivable Amount</th>
              <th>Cash Discount</th>
              <th>Discount Return</th>
              <th>Settlement Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="9" className="drSettlementSummaryReport-no-data">{error}</td>
              </tr>
            ) : settlementSummaries.length > 0 ? (
              settlementSummaries.map((summary) => (
                <tr key={summary.summaryId}>
                  <td>{summary.hospitalNumber}</td>
                  <td>{summary.patientName}</td>
                  <td>{summary.age}</td>
                  <td>{summary.contact}</td>
                  <td>{summary.receivableAmt}</td>
                  <td>{summary.cashDiscount}</td>
                  <td>{summary.discountReturn}</td>
                  <td>{summary.settlementDate}</td>
                  <td><button>Action</button></td> {/* Add functionality for actions if needed */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="drSettlementSummaryReport-no-data">No Rows To Show</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <div className="drSettlementSummaryReport-pagination">
          <span>0 to {settlementSummaries.length} of {settlementSummaries.length}</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      </div>
    </div>
  );
}

export default DrSettlementSummaryReport;
