
// import React, { useState } from 'react';
// import "../SSPharmacy/sSPStock.css";
// import SSPRequisition from './sSPRequisition';
// import SSPConsumption from './sSPConsumption';
// import SSPStoreTransfer from './sSPStoreTransfer';
// import SSPIssues from './sSPIssues'; // Import the Issues component

// function SSPStock() {
//   const [activeTab, setActiveTab] = useState('Stock');

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'Stock':
//         return (
//           <div className="content">
//             {/* Stock content goes here */}
//             <div className="search-bar">
//               <input type="text" placeholder="Search" />
//               <button type="button">🔍</button>
//             </div>
//             <div className="results-header">
//               <span>Showing 1 / 1 results</span>
//               <div>
//                 <button className="btn-blue">Export</button>
//                 <button className="btn-blue">Print</button>
//               </div>
//             </div>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Generic Name</th>
//                   <th>Item Name</th>
//                   <th>Batch No</th>
//                   <th>Expiry Date</th>
//                   <th>Available Quantity</th>
//                   <th>SalePrice</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>OSMOLAX</td>
//                   <td>OSMOLAX</td>
//                   <td>bat278</td>
//                   <td>August 21, 2024</td>
//                   <td>11</td>
//                   <td>700</td>
//                 </tr>
//               </tbody>
//             </table>
//             <div className="pagination">
//               <span>1 to 1 of 1</span>
//               <button disabled>First</button>
//               <button disabled>Previous</button>
//               <button className="active">Page 1 of 1</button>
//               <button disabled>Next</button>
//               <button disabled>Last</button>
//             </div>
//           </div>
//         );
//       case 'Requisition':
//         return <SSPRequisition />;
//       case 'Consumption':
//         return <SSPConsumption />;
//       case 'Store Transfer':
//         return <SSPStoreTransfer />;
//       case 'Issues':
//         return <SSPIssues />; // Return the Issues component
//       // Add other cases for other components if needed
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="container">
//       <nav>
//         <ul>
//           <li className={activeTab === 'Stock' ? 'active' : ''} onClick={() => setActiveTab('Stock')}>Stock</li>
//           <li className={activeTab === 'Requisition' ? 'active' : ''} onClick={() => setActiveTab('Requisition')}>Requisition</li>
//           <li className={activeTab === 'Consumption' ? 'active' : ''} onClick={() => setActiveTab('Consumption')}>Consumption</li>
//           <li className={activeTab === 'Store Transfer' ? 'active' : ''} onClick={() => setActiveTab('Store Transfer')}>Store Transfer</li>
//           <li className={activeTab === 'Issues' ? 'active' : ''} onClick={() => setActiveTab('Issues')}>Issues</li>
//           <li>Reports</li>
//         </ul>
//       </nav>
//       {renderContent()}
//     </div>
//   );
// }

// export default SSPStock;

/* Ajhar tamboli sSPStock.jsx 19-09-24 */


import React, { useState, useEffect } from 'react';
import "../SSPharmacy/sSPStock.css";
import SSPRequisition from './sSPRequisition';
import SSPConsumption from './sSPConsumption';
import SSPStoreTransfer from './sSPStoreTransfer';
import SSPIssues from './sSPIssues';
import SSPReports from './sSPReports'; // Import the Reports component
import SSPharmacyNInven from './sSPharmacyNInven';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../../api/api';

function SSPStock() { 
  const {store} = useParams();
  const [activeTab, setActiveTab] = useState('Stock');
  const [stockData, setStockData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch data when Stock tab is active
  useEffect(() => {
    if (activeTab === 'Stock') {
      fetchStockData();
    }
  }, [activeTab]);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/pharmacyRequisitions/getAll`);
      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }
      const data = await response.json();
      const filteredData = data.filter(item => item.storeName === store) 
      console.log(filteredData);
          
      setStockData(filteredData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Stock':
        return (
          <div className="sSPStock-stock-content">
           
            <div className="sSPStock-stock-search-N-results">
          <div className="sSPStock-stock-search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
          <div className="sSPStock-stock-results-info">
              <span>Showing {stockData.length} / {stockData.length} results</span>
            {/* Showing 2 / 2 results */}
            <button className='sSPStock-stock-print-btn' 
            // onClick={handleExportToExcel}
            >
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button className='sSPStock-stock-print-btn' 
            // onClick={handlePrint}
            ><i class="fa-solid fa-print"></i> Print</button>
          </div>
        </div>
            {loading ? (
              <p>Loading data...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <table className='sSPStock-stock'>
                <thead>
                  <tr>
                    <th>Generic Name</th>
                    <th>Item Name</th>
                    <th>Batch No</th>
                    <th>Expiry Date</th>
                    <th>Available Quantity</th>
                    <th>Sale Price</th>
                  </tr>
                </thead>
                <tbody>
                  {stockData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.genericName}</td>
                      <td>{item.itemName}</td>
                      <td>bat{item.id}</td>
                      <td>{item.expiryDate}</td>
                      <td>{item.requiredQuantity}</td>
                      <td>{item.salePrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {/* <div className="pagination">
              <span>1 to {stockData.length} of {stockData.length}</span>
              <button disabled>First</button>
              <button disabled>Previous</button>
              <button className="active">Page 1 of 1</button>
              <button disabled>Next</button>
              <button disabled>Last</button>
            </div> */}
          </div>
        );
      case 'Requisition':
        return <SSPRequisition />;
      case 'Consumption':
        return <SSPConsumption />;
      case 'Store Transfer':
        return <SSPStoreTransfer />;
      // case 'Issues':
      //   return <SSPIssues />;
      case 'Reports':
        return <SSPReports />; // Return the Reports component
      default:
        return null;
    }
  };

  return (
    <div className="sSPStock-stock-container">
    <SSPharmacyNInven/>
    <nav className='sSPStock-stock-nav'>
      <ul className='sSPStock-stock-nav-ul'>
        <li className={activeTab === 'Stock' ? 'active' : ''} onClick={() => setActiveTab('Stock')}>Stock</li>
        <li className={activeTab === 'Requisition' ? 'active' : ''} onClick={() => setActiveTab('Requisition')}>Requisition</li>
        <li className={activeTab === 'Consumption' ? 'active' : ''} onClick={() => setActiveTab('Consumption')}>Consumption</li>
        <li className={activeTab === 'Store Transfer' ? 'active' : ''} onClick={() => setActiveTab('Store Transfer')}>Store Transfer</li>
        {/* <li className={activeTab === 'Issues' ? 'active' : ''} onClick={() => setActiveTab('Issues')}>Issues</li> */}
        <li className={activeTab === 'Reports' ? 'active' : ''} onClick={() => setActiveTab('Reports')}>Reports</li>
      </ul>
    </nav>
    {renderContent()}
  </div>
  );
}

export default SSPStock;

