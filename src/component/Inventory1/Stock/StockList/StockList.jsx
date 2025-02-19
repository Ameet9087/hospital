import React, { useState, useEffect, useRef } from 'react';
import "./StockList.css";
import StockManage from './StockManage'; // Import StockManage component
import { API_BASE_URL } from '../../../api/api';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';
import FloatingInput from '../../../../FloatingInputs/FloatingInput';
import FloatingSelect from '../../../../FloatingInputs/FloatingSelect';

const StockList = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [subcategory, setSubcategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item for StockManage

  useEffect(() => {
    fetch(`${API_BASE_URL}/items/getAllItem`)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSubcategoryChange = (e) => setSubcategory(e.target.value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!subcategory || item.subCategory.itemSubCategoryName === subcategory)
  );

  const handleManageStockClick = (item) => {
    setSelectedItem(item); // Set the selected item to manage
  };

  const handleBackToList = () => {
    setSelectedItem(null); // Clear selected item to go back to the list
  };

  const handlePrint = () => {
    const printContent = tableRef.current;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport');
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx');
  };

  return (
    <div className="stock-stock-list">
      {selectedItem ? (
        <StockManage item={selectedItem} onBack={handleBackToList} />
      ) : (
        <>
          <div className="stock-filters">
            {/* <FloatingSelect
  label={"SubCategory"}
  value={subcategory}
  onChange={handleSubcategoryChange}
  options={[
    { value: "", label: "Select Option" },
    ...filteredItems.map((item) => ({
      value: item?.subCategory?.itemSubCategoryName,
      label: item?.subCategory?.itemSubCategoryName,
    }))
  ]}
/> */}

            {/* <label>
              <input type="checkbox" />
              Show Fixed Assets Applicable Item
            </label> */}
            {/* <label>
              <input type="checkbox" />
              Show only cold storage item
            </label> */}
            {/* <label>
              <input type="checkbox" />
              Show Zero Quantity
            </label> */}
          </div>
          <div className="stock-search-export">
            <div className='Stock-search-input-container'>
              <FloatingInput
                label={"Search"}
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange} />

            </div>
            <div className='stock-button-list'>
              <span>{`Showing ${filteredItems.length} of ${items.length} results`}</span>
              <button className="stock-export" aria-label="Export Data" onClick={handleExport}>Export</button>
              <button className="stock-print" aria-label="Print Data" onClick={handlePrint}>Print</button>
            </div>
          </div>
          <div className='stock-ta'>
            <table className="patientList-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Item Type",
                    "Sub Category",
                    "Item Name",
                    "Item Code",
                    "Unit",
                    "Available Quantity",
                    "Action"
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
                {filteredItems.map(item => (
                  <tr key={item.id}>
                    <td>{item?.inventory}</td>
                    <td>{item?.subCategory?.itemSubCategoryName}</td>
                    <td>{item?.itemName}</td>
                    <td>{item?.itemCode}</td>
                    <td>{item?.unitOfMeasurement?.name}</td>
                    <td>{item?.availableQty}</td>
                    <td>
                      <button className="stock-view-button">View</button>
                      <button
                        className="stock-manage-button"
                        onClick={() => handleManageStockClick(item)}
                      >
                        Manage Stock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div className="stock-pagination">
            <span>{`1 to ${filteredItems.length} of ${items.length}`}</span>
            <button disabled>First</button>
            <button disabled>Previous</button>
            <span>Page 1 of 1</span>
            <button disabled>Next</button>
            <button disabled>Last</button>
          </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default StockList;

