/* Mohini_StoreBreakageItem_WholePage_14/sep/2024 */
import React, { useState ,useRef} from 'react';
import './SettingTerm.css';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import ReturnForm from './ReturnForm';
import * as XLSX from 'xlsx';


const StoreBreakageItem = () => {
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);


  const handleAddBreakageClick = () => {
    setShowReturnForm(true); // Show the ReturnForm component when the button is clicked
  };

  const handleCloseReturnForm = () => {
    setShowReturnForm(false); // Hide the ReturnForm component
  };
  




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
    <div className="setting-terms-container">
 <button className="setting-terms-add-terms-btn" onClick={handleAddBreakageClick}>
        Add Breakage Item
      </button>      
      <div className="setting-terms-search-container">
        <input type="text" placeholder="Search" className="search-input" />
        {/* <span className="search-icon">🔍</span> */}
      </div>
      
    
      
      <div className='setting-supplier-span'>
      <span>Showing 0 / 0 results</span>
      <button className='item-wise-export-button'onClick={handleExport}>Export</button>
  <button className='item-wise-print-button'onClick={handlePrint}>Print</button>
</div>
      
      <div className='table-container'>
      <table ref={tableRef}>
                        <thead>
                            <tr>
                                {["Breakage Date",
  "Breakage Id",
  "Total Qty",
  "Sub total",
  "Discount Amount",
  "VAT Amount",
  "Total Amount",
  "Remark",
  "Is Active"].map((header, index) => (
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
          <tr>
            <td colSpan="9" className="setting-terms-no-rows">No Rows To Show</td>
          </tr>
        </tbody>
      </table>
      
      {/* <div className="setting-terms-pagination">
        <span>0 to 0 of 0</span>
        <button className="setting-terms-page-btn">First</button>
        <button className="setting-terms-page-btn">Previous</button>
        <span>Page 0 of 0</span>
        <button className="setting-terms-page-btn">Next</button>
        <button className="setting-terms-page-btn">Last</button>
      </div> */}
      </div>
      {showReturnForm && (
        <div className="return-form-overlay-model">
          <div className="return-form-container-com">
            <ReturnForm />
            <button className="return-form-com-close-btn" onClick={handleCloseReturnForm}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

  
export default StoreBreakageItem;
/* Mohini_StoreBreakageItem_WholePage_14/sep/2024 */
