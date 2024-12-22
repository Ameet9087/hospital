// import React from 'react';
// import "../DisReport/userCollectionReport.css"
// function UserCollectionReport() {
//   return (
//     <div className="userCollectionReport-report">
//       <h4><i class="fa-solid fa-star-of-life"></i> User Collection Report (Detailed)</h4>
//       <div className="userCollectionReport-filters">
//         <div className="userCollectionReport-date-range">
//           <label>From: <input type="date" defaultValue="2024-08-16" /></label>
//           <label>To: <input type="date" defaultValue="2024-08-16" /></label>
//           <button className="userCollectionReport-star-button">☆</button>
//         </div>
//         <div className="userCollectionReport-select-filters">
//           <label>Select Dispensary:
//             <input type="text" defaultValue="Main Dispensary" />
//           </label>
//         </div>
//         <div className="userCollectionReport-select-filters">
//           <label>Counter:
//             <select defaultValue="All">
//               <option>All</option>
//             </select>
//           </label>
//           <label>User:
//             <input type="text" defaultValue="All" />
//           </label>
//         </div>
//         <button className="userCollectionReport-show-report-button">Show Report</button>
//       </div>
//       <div className="search-bar">
//         <input type="text" placeholder="Search" />
//         <button>🔍</button>
//       </div>
//       <div className="results-info">
//         <span>Showing 0 / 0 results</span>
//         <div>
//           <button className="userCollectionReport-export-button">Export</button>
//           <button className="userCollectionReport-print-button">Print</button>
//         </div>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Type</th>
//             <th>ReceiptNo</th>
//             <th>Hospital Number</th>
//             <th>PatientName</th>
//             <th>SubTotal</th>
//             <th>Discount</th>
//             <th>Net Total</th>
//             <th>Cash Collection</th>
//             <th>User</th>
//             <th>Remarks</th>
//             <th>Counter</th>
//             <th>Store</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td colSpan="13" className="no-data">No Rows To Show</td>
//           </tr>
//         </tbody>
//       </table>
//       <div className="userCollectionReport-report-pagination">
//         <span>0 to 0 of 0</span>
//         <button disabled>First</button>
//         <button disabled>Previous</button>
//         <span>Page 0 of 0</span>
//         <button disabled>Next</button>
//         <button disabled>Last</button>
//       </div>
//     </div>
//   );
// }

// export default UserCollectionReport;

// import React, { useEffect, useState } from 'react';
// import "../DisReport/userCollectionReport.css";

// function UserCollectionReport() {
//   // State to manage fetched data, loading, and errors
//   const [userCollections, setUserCollections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data from API when component mounts
//   useEffect(() => {
//     const fetchUserCollections = async () => {
//       try {
//         const response = await fetch("http://192.168.1.40:3155/api/hospital/fetch-all-collections");
//         if (!response.ok) {
//           throw new Error("Failed to fetch user collections.");
//         }
//         const data = await response.json();
//         setUserCollections(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserCollections();
//   }, []);

//   return (
//     <div className="userCollectionReport-report">
//       <h4><i className="fa-solid fa-star-of-life"></i> User Collection Report (Detailed)</h4>
//       <div className="userCollectionReport-filters">
//         <div className="userCollectionReport-date-range">
//           <label>From: <input type="date" defaultValue="2024-08-16" /></label>
//           <label>To: <input type="date" defaultValue="2024-08-16" /></label>
//           <button className="userCollectionReport-star-button">☆</button>
//         </div>
//         <div className="userCollectionReport-select-filters">
//           <label>Select Dispensary:
//             <input type="text" defaultValue="Main Dispensary" />
//           </label>
//         </div>
//         <div className="userCollectionReport-select-filters">
//           <label>Counter:
//             <select defaultValue="All">
//               <option>All</option>
//             </select>
//           </label>
//           <label>User:
//             <input type="text" defaultValue="All" />
//           </label>
//         </div>
//         <button className="userCollectionReport-show-report-button">Show Report</button>
//       </div>
//       <div className="search-bar">
//         <input type="text" placeholder="Search" />
//         <button>🔍</button>
//       </div>
//       <div className="results-info">
//         <span>Showing {userCollections.length} results</span>
//         <div>
//           <button className="userCollectionReport-export-button">Export</button>
//           <button className="userCollectionReport-print-button">Print</button>
//         </div>
//       </div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Type</th>
//               <th>ReceiptNo</th>
//               <th>Hospital Number</th>
//               <th>Patient Name</th>
//               <th>SubTotal</th>
//               <th>Discount</th>
//               <th>Net Total</th>
//               <th>Cash Collection</th>
//               <th>User</th>
//               <th>Remarks</th>
//               <th>Counter</th>
//               <th>Store</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userCollections.length > 0 ? (
//               userCollections.map((collection, index) => (
//                 <tr key={index}>
//                   <td>{collection.date}</td>
//                   <td>{collection.type}</td>
//                   <td>{collection.receiptNo}</td>
//                   <td>{collection.hospitalNumber}</td>
//                   <td>{collection.patientName}</td>
//                   <td>{collection.subTotal}</td>
//                   <td>{collection.discount}</td>
//                   <td>{collection.netTotal}</td>
//                   <td>{collection.cashCollection}</td>
//                   <td>{collection.user}</td>
//                   <td>{collection.remarks}</td>
//                   <td>{collection.counter}</td>
//                   <td>{collection.store}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="13" className="no-data">No Rows To Show</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//       <div className="userCollectionReport-report-pagination">
//         <span>0 to 0 of 0</span>
//         <button disabled>First</button>
//         <button disabled>Previous</button>
//         <span>Page 0 of 0</span>
//         <button disabled>Next</button>
//         <button disabled>Last</button>
//       </div>
//     </div>
//   );
// }

// export default UserCollectionReport;


// import React, { useEffect, useState } from 'react';
// import "../DisReport/userCollectionReport.css";

// function UserCollectionReport() {
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
//     <div className="userCollectionReport-report">
//       <h4><i className="fa-solid fa-star-of-life"></i> User Collection Report (Detailed)</h4>
//       <div className="userCollectionReport-filters">
//         <div className="userCollectionReport-date-range">
//           <label>From: <input type="date" defaultValue="2024-08-16" /></label>
//           <label>To: <input type="date" defaultValue="2024-08-16" /></label>
//           <button className="userCollectionReport-star-button">☆</button>
//         </div>
//         <div className="userCollectionReport-select-filters">
//           <label>Select Dispensary:
//             <input type="text" defaultValue="Main Dispensary" />
//           </label>
//         </div>
//         </div>
//       <div className="userCollectionReport-filters-second">
//         <div className="userCollectionReport-select-filters">
//           <label>Counter:
//             <select defaultValue="All">
//               <option>All</option>
//             </select>
//           </label>
//         </div>
//         <div className="userCollectionReport-select-filters">
//           <label>User:
//             <input type="text" defaultValue="All" />
//           </label>
//         </div>
//         <div className="userCollectionReport-select-filters">
//         <button className="userCollectionReport-show-report-button">Show Report</button>
//         </div>
//       </div>
//       {/* <div className="search-bar">
//         <input type="text" placeholder="Search" />
//         <button>🔍</button>
//       </div>
//       <div className="results-info">
//         <span>Showing {userCollections.length} / {userCollections.length} results</span>
//         <div>
//           <button className="userCollectionReport-export-button">Export</button>
//           <button className="userCollectionReport-print-button">Print</button>
//         </div>
//       </div> */}
//         <div className='userCollectionReport-search-N-result'>
//         <div className="userCollectionReport-search-bar">
//           <i className="fa-solid fa-magnifying-glass"></i>
//           <input 
//             type="text" 
//             placeholder="Search..." 
           
//           />
//         </div>
//         <div className="userCollectionReport-results-info">
//           <span>Showing 0 / 0 results</span>
//           <button className="userCollectionReport-export-button">Export</button>
//           <button className="userCollectionReport-print-button" >Print</button>
//         </div>
//       </div>
//       <div className='userCollectionReport-table-N-paginationDiv'>
//       <table>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Type</th>
//             <th>Receipt No</th>
//             <th>Hospital Number</th>
//             <th>Patient Name</th>
//             <th>Sub Total</th>
//             <th>Discount</th>
//             <th>Net Total</th>
//             <th>Cash Collection</th>
//             <th>User</th>
//             <th>Remarks</th>
//             <th>Counter</th>
//             <th>Store</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="13" >Loading...</td>
//             </tr>
//           ) : error ? (
//             <tr>
//               <td colSpan="13" className="userCollectionReport-no-data">{error}</td>
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
//               <td colSpan="13" className="userCollectionReport-no-data">No Rows To Show</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <div className="userCollectionReport-pagination">
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

// export default UserCollectionReport;

 /* Ajhar Tamboli userCollectionReport.jsx 19-09-24 */


import React, { useEffect, useState } from 'react';
import "../DisReport/userCollectionReport.css";

function UserCollectionReport() {
  // State to hold fetched user collections
  const [userCollections, setUserCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user collections from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:1415/api/hospital/fetch-all-collections", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setUserCollections(data);
        console.log(data);
        
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="userCollectionReport-report">
      <h4><i className="fa-solid fa-star-of-life"></i> User Collection Report (Detailed)</h4>
      <div className="userCollectionReport-filters">
        <div className="userCollectionReport-date-range">
          <label>
            From:
             <input type="date" defaultValue="2024-08-16" />
             </label>
          <label>
            To: 
            <input type="date" defaultValue="2024-08-16" />
            </label>
        </div>
        <div className="userCollectionReport-select-filters">
          <label>Select Dispensary:
            <input type="text" defaultValue="Main Dispensary" />
          </label>
        </div>
      </div>
      <div className="userCollectionReport-filters-second">
        <div className="userCollectionReport-select-filters">
          <label>Counter:
            <select defaultValue="All">
              <option>All</option>
            </select>
          </label>
        </div>
        <div className="userCollectionReport-select-filters">
          <label>User:
            <input type="text" defaultValue="All" />
          </label>
        </div>
        <div className="userCollectionReport-select-filters">
          <button className="userCollectionReport-show-report-button">Show Report</button>
        </div>
      </div>
      <div className='userCollectionReport-search-N-result'>
        <div className="userCollectionReport-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
          />
        </div>
        <div className="userCollectionReport-results-info">
          <span>Showing {userCollections.length} / {userCollections.length} results</span>
          <button className="userCollectionReport-export-button"><i class="fa-regular fa-file-excel"></i> Export</button>
          <button className="userCollectionReport-print-button" ><i class="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <div className='userCollectionReport-table-N-paginationDiv'>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Receipt No</th>
              <th>Hospital Number</th>
              <th>Patient Name</th>
              <th>Sub Total</th>
              <th>Discount</th>
              <th>Net Total</th>
              <th>Cash Collection</th>
              <th>User</th>
              <th>Remarks</th>
              <th>Counter</th>
              <th>Store</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="13">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="13" className="userCollectionReport-no-data">{error}</td>
              </tr>
            ) : userCollections.length > 0 ? (
              userCollections.map((collection) => (
                <tr key={collection.collectionId}>
                  <td>{collection.date}</td>
                  <td>{collection.collectionType}</td>
                  <td>{collection.receiptNo}</td>
                  <td>{collection.hospitalNumber}</td>
                  <td>{collection.patientName}</td>
                  <td>{collection.subTotal}</td>
                  <td>{collection.discount}</td>
                  <td>{collection.netTotal}</td>
                  <td>{collection.cashCollection}</td>
                  <td>{collection.user}</td>
                  <td>{collection.remarks}</td>
                  <td>{collection.counterName}</td>
                  <td>{collection.store}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="userCollectionReport-no-data">No Rows To Show</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <div className="userCollectionReport-pagination">
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

export default UserCollectionReport;
