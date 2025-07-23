/* Mohini_HospitalHeader_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import './SupplierInformation.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';

const SupplierInformationCom = () => {
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);
  const suppliers = [
    { name: 'Naynesh', contact: '123456', city: '', pan: '', address: 'kenya', email: '' },
    { name: 'Vishal', contact: '785623', city: '', pan: '', address: 'Dubai', email: '' },
    { name: 'MEDS', contact: '0788989876', city: '', pan: '', address: 'NAIROBI', email: '' },
    { name: 'Temporibus voluptatum', contact: '551681257', city: 'Non cumque culpa minus ut', pan: '', address: 'Sit itaque quo ea ad eligendi temp...', email: 'sa@a.com' },
  ];


  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
  };

  // Function to trigger print
  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
  };




  return (
    <div className="supplier-info-list-container">
      <div className="supplier-info-search-container">
        <input type="text" placeholder="Search" className="supplier-infosearch-input" />
        {/* <button className="supplier-info-search-button"><i className="fa fa-search"></i></button> */}
      </div>
      <div className='supplier-info-sale'>
      <div>Showing 4 / 4 results</div>

          <button className="supplier-info-export-button" onClick={handleExport}>Export</button>
          <button className="supplier-info-print-button"onClick={handlePrint}>Print</button>
        </div>
        <div className='table-container'>
        <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                 "SupplierName",
                 "Contact No",
                 "City",
                 "Pan No.",
                 "ContactAddress",
                 "Email"
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={index}>
              <td>{supplier.name}</td>
              <td>{supplier.contact}</td>
              <td>{supplier.city}</td>
              <td>{supplier.pan}</td>
              <td>{supplier.address}</td>
              <td>{supplier.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="supplier-info-pagination-container">
       
          <button className="supplier-info-pagination-button">First</button>
          <button className="supplier-info-pagination-button">Previous</button>
          <span>Page 1 of 1</span>
          <button className="supplier-info-pagination-button">Next</button>
          <button className="supplier-info-pagination-button">Last</button>
       
        
      </div> */}
      </div>
    </div>
  );
};

export default SupplierInformationCom;
/* Mohini_HospitalHeader_WholePage_14/sep/2024 */
