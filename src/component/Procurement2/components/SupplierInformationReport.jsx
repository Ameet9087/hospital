// SupplierInformationReport.js
import React, { useState } from 'react';
import './SupplierInformationReport.css';

const SupplierInformationReport = () => {
  const [selectedInventory, setSelectedInventory] = useState('-select-');
  const [searchText, setSearchText] = useState('');

  const handleInventoryChange = (event) => {
    setSelectedInventory(event.target.value);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const supplierData = [
    // Your supplier data
  ];

  const filteredData = supplierData.filter((supplier) =>
    supplier.VendorName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="infor-supplier-info-report">
      <h2>Supplier Information Report</h2>
      <div className="infor-controls">
        <select
          value={selectedInventory}
          onChange={handleInventoryChange}
          className="infor-inventory-select"
        >
          <option value="-select-">-select-</option>
          {/* Add more options as needed */}
        </select>
        <div className="infor-search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchTextChange}
            className="infor-search-input"
          />
          <div className="infor-export-print">
            <button className="infor-export-button">Export</button>
            <button className="infor-print-button">Print</button>
          </div>
        </div>
      </div>
      <table className="infor-supplier-table">
        <thead>
          <tr>
            <th>VendorName</th>
            <th>Contact No</th>
            <th>Pan No.</th>
            <th>ContactAddress</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((supplier, index) => (
            <tr key={index}>
              <td>{supplier.VendorName}</td>
              <td>{supplier.ContactNo}</td>
              <td>{supplier.PanNo}</td>
              <td>{supplier.ContactAddress}</td>
              <td>{supplier.Email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="infor-pagination-controls">
        <button className="infor-first-button">First</button>
        <button className="infor-previous-button">Previous</button>
        <span className="infor-page-info">1 to 5 of 5</span>
        <button className="infor-next-button">Next</button>
        <button className="infor-last-button">Last</button>
      </div>
    </div>
  );
};

export default SupplierInformationReport;
