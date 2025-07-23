import React, { useState } from "react";
import "./SupplierWiseStock.css";

const SupplierWiseStock = () => {
  const [vendorName, setVendorName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [itemName, setItemName] = useState("");

  const handleShowReport = () => {
    alert("Show Report Clicked!");
  };

  return (
    <div className="WiseeSupplierContainer">
      <h2 className="WiseeSupplierHeading">Supplier Wise Stock</h2>

      <div className="WiseeSupplierFilters">
        <div className="WiseeSupplierFilterRow">
          <div>
            <label>Year</label>
            <select>
              <option value="2024">2024</option>
            </select>
          </div>
          <div>
            <label>From</label>
            <input type="date" value="2024-08-21" />
          </div>
          <div>
            <label>To</label>
            <input type="date" value="2024-08-21" />
          </div>
          <div className="WiseeStarIcon">⭐</div>
        </div>

        <div className="WiseeSupplierFilterRow">
          <div>
            <label>Select Vendor</label>
            <input
              type="text"
              placeholder="Enter Vendor Name"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            />
          </div>
          <div>
            <label>Select Store</label>
            <input
              type="text"
              placeholder="Enter Store Name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
        </div>

        <div className="WiseeSupplierFilterRow">
          <div>
            <label>Select Item</label>
            <input
              type="text"
              placeholder="Enter Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <button className="WiseeShowReportButton" onClick={handleShowReport}>
            Show Report
          </button>
        </div>
      </div>

      <div className="WiseeSupplierTable">
        <div className="WiseeSupplierTableHeader">
          <input className="WiseeSupplierSearch" placeholder="Search" />
          <button className="WiseeExportButton">Export</button>
          <button className="WiseePrintButton">Print</button>
        </div>

        <table className="WiseeTable">
          <thead className="WiseeThead">
            <tr>
              <th className="WiseeTh">Opening Stock</th>
              <th className="WiseeTh">Vendor</th>
              <th className="WiseeTh">Category</th>
              <th className="WiseeTh">Sub-Cat</th>
              <th className="WiseeTh">Item Code</th>
              <th className="WiseeTh">Item Name</th>
              <th className="WiseeTh">Store Name</th>
              <th className="WiseeTh">Purchase Date</th>
              <th className="WiseeTh">Batch Number</th>
              <th className="WiseeTh">Expiry Date</th>
              <th className="WiseeTh">Consumed</th>
              <th className="WiseeTh">Other Txns</th>
              <th className="WiseeTh">Closing Stock</th>
            </tr>
          </thead>
          <tbody className="WiseeTbody">
            <tr>
              <td colSpan="13" className="WiseeNoData">
                No Rows To Show
              </td>
            </tr>
          </tbody>
        </table>

        <div className="WiseePagination">
          <span>0 to 0 of 0</span>
          <div className="WiseePaginationButtons">
            <button>First</button>
            <button>Previous</button>
            <button>Next</button>
            <button>Last</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierWiseStock;
