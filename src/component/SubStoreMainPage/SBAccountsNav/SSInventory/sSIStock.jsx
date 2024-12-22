/* Ajhar Tamboli sSIStock.jsx 19-09-24 */


import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import "../SSInventory/sSIStock.css";
import SSIInventoryRequisition from './sSIInventoryRequisition';
import SSIConsumption from './sSIConsumption';
import SSIReports from './sSIReports';
import SSIPatientConsumption from './sSIPatientConsumption';
import SSIReturn from './sSIReturn';
import SSPharmacyNInven from '../SSPharmacy/sSPharmacyNInven';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../../api/api';

function SSIStock() {
  const { store } = useParams();
  const [activeTab, setActiveTab] = useState('Stock');
  const [requisitions, setRequisitions] = useState([]);
  const [filteredRequisitions, setFilteredRequisitions] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc'); // Added sort direction state
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Function to export the table to Excel
  const exportTableToExcel = () => {
    const table = document.querySelector('table'); // Get the table element
    const workbook = XLSX.utils.table_to_book(table); // Convert the table to a workbook
    XLSX.writeFile(workbook, 'SSIStockData.xlsx'); // Export the workbook as an Excel file
  };

  // Function to print specific elements: table, FromDate, ToDate, and current date and time
  const printTable = () => {
    const table = document.querySelector('table').outerHTML; // Get the table HTML
    const fromDate = '<p>From Date: <input type="date" /></p>'; // From Date field
    const toDate = '<p>To Date: <input type="date" /></p>'; // To Date field
    const currentDateTime = `<p>Current Date and Time: ${new Date().toLocaleString()}</p>`; // Current Date and Time

    const printWindow = window.open('', '', 'height=600,width=800'); // Open a new window
    printWindow.document.write('<html><head><title>Print Table</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(fromDate); // Add From Date
    printWindow.document.write(toDate); // Add To Date
    printWindow.document.write(currentDateTime); // Add Current Date and Time
    printWindow.document.write(table); // Add Table
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print(); // Trigger print
  };

  useEffect(() => {
    // Fetch data from API
    fetch(`${API_BASE_URL}/inventory-requisitions/received?subStoreId=${store}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
         // Filter based on store
        // const sortedData = data.sort((a, b) => {
        //   return sortDirection === 'asc'
        //     ? a.storeName.localeCompare(b.storeName)
        //     : b.storeName.localeCompare(a.storeName);
        // });

        setRequisitions(data);
        // Filter requisitions with status 'Approved'
        setFilteredRequisitions(data.filter(req => req.status === 'Approved'));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [store, sortDirection]); // Sort direction as a dependency

  // Function to handle sorting
  const toggleSortDirection = () => {
    setSortDirection(prevDirection => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  // Function to handle search
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = requisitions.filter(req =>
      req.itemName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRequisitions(filtered);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Stock':
        return (
          <div className="sSIStock-content">
            {/* Stock content goes here */}
            <div className="sSIStock-filters">
              <div className="sSIStock-filter">
                <label><i className="fa-solid fa-filter"></i> Filter by Store:</label>
                <select>
                  <option value="">ALL</option>
                  <option value="GENERAL-INVENTORY">GENERAL-INVENTORY</option>
                </select>
              </div>
              <div className="sSIStock-filter">
                <label><i className="fa-solid fa-filter"></i> Filter by SubCategory:</label>
                <select>
                  <option value="">All</option>
                  <option value="tissue">tissue</option>
                  <option value="cotton">cotton</option>
                  <option value="soap">soap</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Labs">Labs</option>
                  <option value="Pharmacy">Pharmacy</option>
                </select>
              </div>
              <div className="sSIStock-legend">
                <div><span className="sSIStock-dot sSIStock-red"></span> Zero Quantity</div>
                <div><span className="sSIStock-dot sSIStock-gray"></span> Below MinStockQuantity</div>
              </div>
            </div>
            <div className="sSIStock-search-N-result">
              <div className="sSIStock-search-bar">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} />
              </div>
              <div className="sSIStock-results-header">
                <span>Showing {filteredRequisitions.length} / {filteredRequisitions.length} results</span>
                <div>
                  <button className="sSIStock-btn-blue" onClick={exportTableToExcel}>
                    <i className="fa-solid fa-file-excel"></i> Export
                  </button>
                  <button className="sSIStock-btn-blue" onClick={printTable}>
                    <i className="fa-solid fa-print"></i> Print
                  </button>
                  <button className="sSIStock-btn-blue" onClick={toggleSortDirection}>
                    Sort by Store ({sortDirection === 'asc' ? 'Asc' : 'Desc'})
                  </button>
                </div>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Item Code</th>
                  <th>SubCategory</th>
                  <th>Item Name</th>
                  <th>Unit</th>
                  <th>Available Qty</th>
                  <th>Item Type</th>
                  <th>Store</th>
                </tr>
              </thead>
              <tbody>
                {requisitions.length > 0 ? (
                  requisitions.map((req, index) => (
                    <tr key={index}>
                      <td>{req?.item?.itemCode}</td>
                      <td>{req?.item?.subCategory?.subCategoryName}</td>
                      <td>{req?.item?.itemName}</td>
                      <td>{req?.item?.unitOfMeasurement?.unitOfMeasurementName}</td>
                      <td>{req?.dispatchQuantity}</td>
                      <td>{req?.item?.subCategory?.subCategoryName}</td>
                      <td>{store}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="sSIStock-no-data">No Rows To Show</td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* <div className="sSIStock-pagination">
              <span>0 to {filteredRequisitions.length} of {filteredRequisitions.length}</span>
              <button>First</button>
              <button>Previous</button>
              <span>Page 1 of 1</span>
              <button>Next</button>
              <button>Last</button>
            </div> */}
          </div>
        );
      case 'Inventory Requisition':
        return <SSIInventoryRequisition />;
      case 'Consumption':
        return <SSIConsumption />;
      case 'Reports':
        return <SSIReports />;
      case 'Patient Consumption':
        return <SSIPatientConsumption />;
      case 'Return':
        return <SSIReturn />;
      default:
        return null;
    }
  };

  return (
    <div className="sSIStock-container">
      <SSPharmacyNInven />
      <nav>
        <ul>
          <li
            className={activeTab === 'Stock' ? 'sSIStock-container-active' : ''}
            onClick={() => setActiveTab('Stock')}
          >
            Stock
          </li>
          <li
            className={activeTab === 'Inventory Requisition' ? 'sSIStock-container-active' : ''}
            onClick={() => setActiveTab('Inventory Requisition')}
          >
            Inventory Requisition
          </li>
          <li
            className={activeTab === 'Consumption' ? 'sSIStock-container-active' : ''}
            onClick={() => setActiveTab('Consumption')}
          >
            Consumption
          </li>
          <li
            className={activeTab === 'Reports' ? 'sSIStock-container-active' : ''}
            onClick={() => setActiveTab('Reports')}
          >
            Reports
          </li>
          <li
            className={activeTab === 'Patient Consumption' ? 'sSIStock-container-active' : ''}
            onClick={() => setActiveTab('Patient Consumption')}
          >
            Patient Consumption
          </li>
          <li
            className={activeTab === 'Return' ? 'sSIStock-container-active' : ''}
            onClick={() => setActiveTab('Return')}
          >
            Return
          </li>
        </ul>
      </nav>
      {renderContent()}
    </div>
  );
}

export default SSIStock;
