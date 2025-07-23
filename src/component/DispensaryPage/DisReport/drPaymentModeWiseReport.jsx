import React, { useEffect, useState } from 'react';
import "../DisReport/drPaymentModeWiseReport.css";

function DrPaymentModeWiseReport() {
  // State to hold fetched user collections
  const [userCollections, setUserCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user collections from the API
  useEffect(() => {
    fetch("http://localhost:1415/api/hospital/fetch-all-collections")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then(data => {
        setUserCollections(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="drPaymentModeWiseReport-report">
      <h4><i className="fa-solid fa-star-of-life"></i> PaymentMode Wise Report</h4>
      <div className="drPaymentModeWiseReport-filters">
        <div className="drPaymentModeWiseReport-date-range">
          <label>From: <input type="date" defaultValue="2024-08-16" /></label>
          <label>To: <input type="date" defaultValue="2024-08-16" /></label>
        </div>
        <div className="drPaymentModeWiseReport-select-filters">
        <button className="drPaymentModeWiseReport-show-report-button"><i class="fa-solid fa-magnifying-glass"></i> Show Report</button>
        </div>
        </div>
      <div className="drPaymentModeWiseReport-filters-second">
        <div className="drPaymentModeWiseReport-select-filters">
          <label>PaymentMode:
            <input type="text" defaultValue="All" />
          </label>
        </div>
        <div className="drPaymentModeWiseReport-select-filters">
          <label>Type:
            <select defaultValue="All">
              <option>All</option>
            </select>
          </label>
        </div>
        <div className="drPaymentModeWiseReport-select-filters">
          <label>User:
            <input type="text" placeholder='Enter User name' />
          </label>
        </div>
      </div>
      {/* <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button>🔍</button>
      </div>
      <div className="results-info">
        <span>Showing {userCollections.length} / {userCollections.length} results</span>
        <div>
          <button className="drPaymentModeWiseReport-export-button">Export</button>
          <button className="drPaymentModeWiseReport-print-button">Print</button>
        </div>
      </div> */}
        {/* <div className='drPaymentModeWiseReport-search-N-result'>
        <div className="drPaymentModeWiseReport-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
           
          />
        </div>
        <div className="drPaymentModeWiseReport-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="drPaymentModeWiseReport-export-button">Export</button>
          <button className="drPaymentModeWiseReport-print-button" >Print</button>
        </div>
      </div> */}
      <div className='drPaymentModeWiseReport-table-N-paginationDiv'>
      {/* <table>
        <thead>
          <tr>
            <th>Store</th>
            <th>Generic Name</th>
            <th>Item Name</th>
            <th>Unit</th>
            <th>Batch</th>
            <th>Expiry</th>
            <th>CP</th>
           
            
            
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="13">Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="13" className="drPaymentModeWiseReport-no-data">{error}</td>
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
              <td colSpan="13" className="drPaymentModeWiseReport-no-data">No Rows To Show</td>
            </tr>
          )}
        </tbody>
      </table> */}
      {/* <div className="drPaymentModeWiseReport-pagination">
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

export default DrPaymentModeWiseReport;