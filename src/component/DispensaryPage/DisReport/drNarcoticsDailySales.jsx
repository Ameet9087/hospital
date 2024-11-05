// import React, { useEffect, useState } from 'react';
// import "../DisReport/drNarcoticsDailySales.css";

// function DrNarcoticsDailySales() {
//   // State to hold fetched user collections
//   const [userCollections, setUserCollections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch user collections from the API
//   useEffect(() => {
//     fetch("http://192.168.1.40:3155/api/hospital/fetch-all-narcotics-summary")
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
//     <div className="drNarcoticsDailySales-report">
//       <h4><i className="fa-solid fa-star-of-life"></i> Narcotics Daily Sales Summary Report</h4>
//       <div className="drNarcoticsDailySales-filters">
//         <div className="drNarcoticsDailySales-date-range">
//           <label>From: <input type="date" defaultValue="2024-08-16" /></label>
//           <label>To: <input type="date" defaultValue="2024-08-16" /></label>
//           <button className="drNarcoticsDailySales-star-button">☆</button>
//         </div>
//         <div className="drNarcoticsDailySales-select-filters">
//           <label>Select Dispensary:
//             <input type="text" defaultValue="Main Dispensary" />
//           </label>
//         </div>
//         </div>
//       <div className="drNarcoticsDailySales-filters-second">
//         <div className="drNarcoticsDailySales-select-filters">
//           <label>Select Item:
//             <select defaultValue="All">
//               <option>All</option>
//             </select>
//           </label>
//         </div>
//         {/* <div className="drNarcoticsDailySales-select-filters">
//           <label>User:
//             <input type="text" defaultValue="All" />
//           </label>
//         </div> */}
//         <div className="drNarcoticsDailySales-select-filters">
//         <button className="drNarcoticsDailySales-show-report-button">Show Report</button>
//         </div>
//       </div>
//       {/* <div className="search-bar">
//         <input type="text" placeholder="Search" />
//         <button>🔍</button>
//       </div>
//       <div className="results-info">
//         <span>Showing {userCollections.length} / {userCollections.length} results</span>
//         <div>
//           <button className="drNarcoticsDailySales-export-button">Export</button>
//           <button className="drNarcoticsDailySales-print-button">Print</button>
//         </div>
//       </div> */}
//         <div className='drNarcoticsDailySales-search-N-result'>
//         <div className="drNarcoticsDailySales-search-bar">
//           <i className="fa-solid fa-magnifying-glass"></i>
//           <input 
//             type="text" 
//             placeholder="Search..." 
           
//           />
//         </div>
//         <div className="drNarcoticsDailySales-results-info">
//           <span>Showing 0 / 0 results</span>
//           <button className="drNarcoticsDailySales-export-button">Export</button>
//           <button className="drNarcoticsDailySales-print-button" >Print</button>
//         </div>
//       </div>
//       <div className='drNarcoticsDailySales-table-N-paginationDiv'>
//       <table>
//         <thead>
//           <tr>
//             <th>InvoiceNo</th>
//             <th>Date</th>
//             <th>Generic Name</th>
//             <th>Medicine Name</th>
//             <th>Patient Name</th>
//             <th>Doctor</th>
//             <th>KMPDC No</th>
//             <th>Batch No</th>
//             <th>Net Total</th>
//             <th>Quantity</th>
//             <th>Sales Price</th>
//             <th>Total Amount</th>
            
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="13">Loading...</td>
//             </tr>
//           ) : error ? (
//             <tr>
//               <td colSpan="13" className="drNarcoticsDailySales-no-data">{error}</td>
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
//               <td colSpan="13" className="drNarcoticsDailySales-no-data">No Rows To Show</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <div className="drNarcoticsDailySales-pagination">
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

// export default DrNarcoticsDailySales;

 /* Ajhar Tamboli drNarcoticsDailySales.jsx 19-09-24 */

import React, { useEffect, useState } from 'react';
import "../DisReport/drNarcoticsDailySales.css";

function DrNarcoticsDailySales() {
  // State to hold fetched narcotics summaries
  const [narcoticsSummaries, setNarcoticsSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch narcotics summaries from the API
  useEffect(() => {
    fetch("http://localhost:1415/api/hospital/fetch-all-narcotics-summary")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then(data => {
        setNarcoticsSummaries(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="drNarcoticsDailySales-report">
      <h4><i className="fa-solid fa-star-of-life"></i> Narcotics Daily Sales Summary Report</h4>
      <div className="drNarcoticsDailySales-filters">
        <div className="drNarcoticsDailySales-date-range">
          <label>From: <input type="date" defaultValue="2024-08-16" /></label>
          <label>To: <input type="date" defaultValue="2024-08-16" /></label>
        </div>
        <div className="drNarcoticsDailySales-select-filters">
          <label>Select Dispensary:
            <input type="text" defaultValue="Main Dispensary" />
          </label>
        </div>
      </div>
      <div className="drNarcoticsDailySales-filters-second">
        <div className="drNarcoticsDailySales-select-filters">
          <label>Select Item:
            <select defaultValue="All">
              <option>All</option>
            </select>
          </label>
        </div>
        <div className="drNarcoticsDailySales-select-filters">
          <button className="drNarcoticsDailySales-show-report-button">Show Report</button>
        </div>
      </div>
      <div className='drNarcoticsDailySales-search-N-result'>
        <div className="drNarcoticsDailySales-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
          />
        </div>
        <div className="drNarcoticsDailySales-results-info">
          <span>Showing {narcoticsSummaries.length} / {narcoticsSummaries.length} results</span>
          <button className="drNarcoticsDailySales-export-button"><i class="fa-regular fa-file-excel"></i> Export</button>
          <button className="drNarcoticsDailySales-print-button"><i class="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <div className='drNarcoticsDailySales-table-N-paginationDiv'>
        <table>
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Generic Name</th>
              <th>Medicine Name</th>
              <th>Patient Name</th>
              <th>Doctor</th>
              <th>KMPDC No</th>
              <th>Batch No</th>
              <th>Quantity</th>
              <th>Sale Price</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="11" className="drNarcoticsDailySales-no-data">{error}</td>
              </tr>
            ) : narcoticsSummaries.length > 0 ? (
              narcoticsSummaries.map((summary) => (
                <tr key={summary.narcoticsId}>
                  <td>{summary.invoiceNumber}</td>
                  <td>{summary.date}</td>
                  <td>{summary.genericName}</td>
                  <td>{summary.medicineName}</td>
                  <td>{summary.patientName}</td>
                  <td>{summary.doctor}</td>
                  <td>{summary.kmpdcNumber}</td>
                  <td>{summary.batchNumber}</td>
                  <td>{summary.quantity}</td>
                  <td>{summary.salePrice}</td>
                  <td>{summary.totalAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="drNarcoticsDailySales-no-data">No Rows To Show</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <div className="drNarcoticsDailySales-pagination">
          <span>0 to 0 of 0</span>
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

export default DrNarcoticsDailySales;
