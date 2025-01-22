
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
      const response = await fetch(`${API_BASE_URL}/subpharm-requisitions/requisition-items?subStoreId=${store}`);
      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }
      const data = await response.json();
      console.log(data);
      
      setStockData(data);
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
              <table className='sSPStock-stock'>
                <thead>
                  <tr>
                    <th>Generic Name</th>
                    <th>Item Name</th>
                    <th>Available Quantity</th>
                    <th>Sale Price</th>
                  </tr>
                </thead>
                <tbody>
                  {stockData.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.items?.genericName?.genericName}</td>
                      <td>{item?.items?.itemName}</td>
                      <td>{item?.requiredQuantity}</td>
                      <td>{item?.items?.salesRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

