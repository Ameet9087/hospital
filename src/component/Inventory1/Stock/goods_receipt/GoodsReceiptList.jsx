import React, { useRef, useState } from 'react';
import "./GoodsReceiptList.css"
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import FloatingInput from '../../../../FloatingInputs/FloatingInput';
import FloatingSelect from '../../../../FloatingInputs/FloatingSelect';
import { toast } from 'react-toastify';
const GoodsReceiptList = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [dateFrom, setDateFrom] = useState('2024-08-01');
  const [dateTo, setDateTo] = useState('2024-08-08');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]); // Assuming items is the data to display in the table
  const [filteredItems, setFilteredItems] = useState([]);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleDateFromChange = (e) => setDateFrom(e.target.value);
  const handleDateToChange = (e) => setDateTo(e.target.value);

  return (
    <div className="goods-receipt-list">
      <div className="goods-receipt-filters">
        <FloatingInput
        label={"From"}
         type="date"
            value={dateFrom}
            onChange={handleDateFromChange}/>
       <FloatingInput
       label={"To"}
       type="date"
            value={dateTo}
            onChange={handleDateToChange}/>
        
        {/* <button className="goods-receipt-ok-button">OK</button> */}
      </div>
      <div className="goods-receipt-search-export">
        <div>
          <FloatingInput
          label={"Search"}
          type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}/>
          

        </div>

        <div>
          <span>{`Showing ${filteredItems.length} of ${items.length} results`}</span>          <button className="goods-receipt-export-btn" aria-label="Export Data">Export</button>
          <button className="goods-receipt-print" aria-label="Print Data">Print</button>
        </div>
      </div>
      <div className='good-receipt-ta'>
        <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "GR No.",
                "GR Date",
                "PO...",
                "Vendor ...",
                "Vendor Name",
                "Vendor ...",
                "Bill No.",
                "Total Amount",
                "Pay. Mode",
                "Remarks",
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
            <tr>
              <td colSpan="11" className="goods-receipt-no-rows">No Rows To Show</td>
            </tr>
          </tbody>
        </table>
        {/* <div className="goods-receipt-pagination">
        <span>0 to 0 of 0</span>
        <button disabled>First</button>
        <button disabled>Previous</button>
        <span>Page 0 of 0</span>
        <button disabled>Next</button>
        <button disabled>Last</button>
      </div> */}
      </div>
    </div>
  );
};

export default GoodsReceiptList;
