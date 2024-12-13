import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './SettingTerm.css';
import * as XLSX from 'xlsx';
import ReturnForm from './ReturnForm';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import { API_BASE_URL } from '../api/api';

const StoreBreakageItem = () => {
  const [breakageItems, setBreakageItems] = useState([]); // State for breakage items
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get(`${API_BASE_URL}/breakage-items`)
      .then((response) => {
        if (response.data) {
          setBreakageItems(response.data); // Update state with fetched data
        }
      })
      .catch((error) => {
        console.error('Error fetching breakage items:', error);
      });
  }, []); // Empty dependency array ensures this runs only once

  const handleAddBreakageClick = () => setShowReturnForm(true);

  const handleCloseReturnForm = () => setShowReturnForm(false);

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'BreakageItemsReport');
    XLSX.writeFile(wb, 'BreakageItemsReport.xlsx');
  };

  const handlePrint = () => window.print();

  return (
    <div className="setting-terms-container">
      <button className="setting-terms-add-terms-btn" onClick={handleAddBreakageClick}>
        Add Breakage Item
      </button>
      <div className="setting-terms-search-container">
        <input type="text" placeholder="Search" className="search-input" />
      </div>
      <div className="setting-supplier-span">
        <span>Showing {breakageItems.length} results</span>
        <button className="item-wise-export-button" onClick={handleExport}>
          Export
        </button>
        <button className="item-wise-print-button" onClick={handlePrint}>
          Print
        </button>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                'Breakage Date',
                'Breakage Id',
                'Total Qty',
                'Sub total',
                'Discount Amount',
                'VAT Amount',
                'Total Amount',
                'Remark',
                'Is Active',
              ].map((header, index) => (
                <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {breakageItems.length > 0 ? (
              breakageItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.breakageDate}</td>
                  <td>{item.breakageItemId}</td>
                  <td>{item.breakageQty}</td>
                  <td>{item.subTotal}</td>
                  <td>{item.discountAmt}</td>
                  <td>{item.vatPercent}</td>
                  <td>{item.totalAmount}</td>
                  <td>{item.remark}</td>
                  <td>{item.isActive ? 'Yes' : 'No'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="setting-terms-no-rows">
                  No Rows To Show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showReturnForm && (
        <div className="return-form-overlay-model">
          <div className="return-form-container-com">
            <ReturnForm />
            <button className="return-form-com-close-btn" onClick={handleCloseReturnForm}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreBreakageItem;
