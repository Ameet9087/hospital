// import React, { useEffect, useState } from 'react';
// import "../DisReport/drDailySalesReport.css";

// function DrDailySalesReport() {
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
//     <div className="drDailySalesReport-report">
//       <h4><i className="fa-solid fa-star-of-life"></i> Daily Sales Summary Report</h4>
//       <div className="drDailySalesReport-filters">
//         <div className="drDailySalesReport-date-range">
//           <label>From: <input type="date" defaultValue="2024-08-16" /></label>
//           <label>To: <input type="date" defaultValue="2024-08-16" /></label>
//           <button className="drDailySalesReport-star-button">☆</button>
//         </div>
//         <div className="drDailySalesReport-select-filters">
//           <label>Select Dispensary:
//             <input type="text" defaultValue="Main Dispensary" />
//           </label>
//         </div>
//         </div>
//       <div className="drDailySalesReport-filters-second">
//         <div className="drDailySalesReport-select-filters">
//           <label>Select Item:
//             <select defaultValue="All">
//               <option>All</option>
//             </select>
//           </label>
//         </div>
//         {/* <div className="drDailySalesReport-select-filters">
//           <label>User:
//             <input type="text" defaultValue="All" />
//           </label>
//         </div> */}
//         <div className="drDailySalesReport-select-filters">
//         <button className="drDailySalesReport-show-report-button">Show Report</button>
//         </div>
//       </div>
//       {/* <div className="search-bar">
//         <input type="text" placeholder="Search" />
//         <button>🔍</button>
//       </div>
//       <div className="results-info">
//         <span>Showing {userCollections.length} / {userCollections.length} results</span>
//         <div>
//           <button className="drDailySalesReport-export-button">Export</button>
//           <button className="drDailySalesReport-print-button">Print</button>
//         </div>
//       </div> */}
//         <div className='drDailySalesReport-search-N-result'>
//         <div className="drDailySalesReport-search-bar">
//           <i className="fa-solid fa-magnifying-glass"></i>
//           <input 
//             type="text" 
//             placeholder="Search..." 
           
//           />
//         </div>
//         <div className="drDailySalesReport-results-info">
//           <span>Showing 0 / 0 results</span>
//           <button className="drDailySalesReport-export-button">Export</button>
//           <button className="drDailySalesReport-print-button" >Print</button>
//         </div>
//       </div>
//       <div className='drDailySalesReport-table-N-paginationDiv'>
//       <table>
//         <thead>
//           <tr>
//             <th>Bill No</th>
//             <th>Date</th>
//             <th>Generic Name</th>
//             <th>Medicine Name</th>
//             <th>Patient Name</th>
//             <th>Batch No</th>
//             <th>Expiry</th>
//             <th>Quantity</th>
//             <th>SP</th>
//             <th>Sales Value</th>
//             <th>Store</th>
//             <th>Counter</th>
//             <th>User</th>
            
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="13">Loading...</td>
//             </tr>
//           ) : error ? (
//             <tr>
//               <td colSpan="13" className="drDailySalesReport-no-data">{error}</td>
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
//               <td colSpan="13" className="drDailySalesReport-no-data">No Rows To Show</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <div className="drDailySalesReport-pagination">
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

// export default DrDailySalesReport;


 /* Ajhar Tamboli drDailySalesReport.jsx 19-09-24 */

import React, { useEffect, useState } from 'react';
import "../DisReport/drDailySalesReport.css";

function DrDailySalesReport() {
  // State to hold fetched daily sales reports
  const [dailySalesReports, setDailySalesReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch daily sales reports from the new API endpoint
  useEffect(() => {
    fetch("http://localhost:1415/api/daily-sales/fetch-all-daily-sales-report")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then(data => {
        setDailySalesReports(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="drDailySalesReport-report">
      <h4><i className="fa-solid fa-star-of-life"></i> Daily Sales Summary Report</h4>
      <div className="drDailySalesReport-filters">
        <div className="drDailySalesReport-date-range">
          <label>From: <input type="date" defaultValue="2024-08-16" /></label>
          <label>To: <input type="date" defaultValue="2024-08-16" /></label>
        </div>
        <div className="drDailySalesReport-select-filters">
          <label>Select Dispensary:
            <input type="text" defaultValue="Main Dispensary" />
          </label>
        </div>
      </div>
      <div className="drDailySalesReport-filters-second">
        <div className="drDailySalesReport-select-filters">
          <label>Select Item:
            <select defaultValue="All">
              <option>All</option>
            </select>
          </label>
        </div>
        <div className="drDailySalesReport-select-filters">
          <button className="drDailySalesReport-show-report-button">Show Report</button>
        </div>
      </div>
      <div className='drDailySalesReport-search-N-result'>
        <div className="drDailySalesReport-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
          />
        </div>
        <div className="drDailySalesReport-results-info">
          <span>Showing {dailySalesReports.length} / {dailySalesReports.length} results</span>
          <button className="drDailySalesReport-export-button"><i class="fa-regular fa-file-excel"></i> Export</button>
          <button className="drDailySalesReport-print-button"><i class="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <div className='drDailySalesReport-table-N-paginationDiv'>
        <table>
          <thead>
            <tr>
              <th>Bill No</th>
              <th>Date</th>
              <th>Generic Name</th>
              <th>Medicine Name</th>
              <th>Patient Name</th>
              <th>Batch No</th>
              <th>Expiry</th>
              <th>Quantity</th>
              <th>SP</th>
              <th>Sales Value</th>
              <th>Store</th>
              <th>Counter</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="13">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="13" className="drDailySalesReport-no-data">{error}</td>
              </tr>
            ) : dailySalesReports.length > 0 ? (
              dailySalesReports.map((report) => (
                <tr key={report.saleReportId}>
                  <td>{report.billNo}</td>
                  <td>{report.billDate}</td>
                  <td>{report.genericName}</td>
                  <td>{report.medicineName}</td>
                  <td>{report.patient}</td>
                  <td>{report.batchNumber}</td>
                  <td>{report.expiryDate}</td>
                  <td>{report.quantity}</td>
                  <td>{report.salePrice}</td>
                  <td>{report.saleValue}</td>
                  <td>{report.store}</td>
                  <td>{report.counter}</td>
                  <td>{report.user}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="drDailySalesReport-no-data">No Rows To Show</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <div className="drDailySalesReport-pagination">
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

export default DrDailySalesReport;
