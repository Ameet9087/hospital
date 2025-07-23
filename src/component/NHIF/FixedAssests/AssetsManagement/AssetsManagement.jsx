import React, { useState, useRef } from "react";
import "./Assetsmanagement.css"; // Assuming you'll create a CSS file for styling

const CostCenterItemList = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("allassets");
  const tableRef = useRef(null);

  // Dummy data for table rows
  const dummyData = [
    {
      barCode: "123456",
      itemName: "MRI Machine",
      vendorName: "Med Equip Supplies",
      specification: "High Resolution",
      modelNo: "MRX-5000",
      assetLocation: "Room 101",
      subStore: "Brain Operations Store",
      assetHolder: "Dr. Smith",
      status: "allassets",
    },
    {
      barCode: "234567",
      itemName: "X-Ray Machine",
      vendorName: "Healthcare Solutions",
      specification: "Portable",
      modelNo: "XR-2000",
      assetLocation: "Room 102",
      subStore: "Female Ward Substore",
      assetHolder: "Dr. Alice",
      status: "damagedassets",
    },
    {
      barCode: "345678",
      itemName: "Ultrasound Machine",
      vendorName: "MediTech Co.",
      specification: "3D Imaging",
      modelNo: "US-3000",
      assetLocation: "Room 103",
      subStore: "ICU Sub Store",
      assetHolder: "Dr. John",
      status: "warrantyexpiredassets",
    },
    {
      barCode: "456789",
      itemName: "CT Scanner",
      vendorName: "ScanTech Inc.",
      specification: "64-Slice",
      modelNo: "CT-6400",
      assetLocation: "Room 104",
      subStore: "Maternity Substore",
      assetHolder: "Dr. Jane",
      status: "allassets",
    },
    {
      barCode: "567890",
      itemName: "Defibrillator",
      vendorName: "LifeSaver Corp.",
      specification: "Automated",
      modelNo: "DFB-100",
      assetLocation: "Room 105",
      subStore: "Operations Substore",
      assetHolder: "Dr. Adams",
      status: "damagedassets",
    },
  ];

  // Filtered data based on selected filter
  const filteredData = dummyData.filter(
    (item) => selectedFilter === "allassets" || item.status === selectedFilter
  );

  const startResizing = (index) => (e) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = tableRef.current
      ? tableRef.current.querySelector(`th:nth-child(${index + 1})`).offsetWidth
      : 0;

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [index]: `${newWidth}px`,
      }));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="assetsManagement">
      <section className="assetsManagement-addCostCenter">
        <form className="assetsManagement-form">
          <label>
            Selected:
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value={"allassets"}>All Assets</option>
              <option value={"damagedassets"}>Damaged Assets</option>
              <option value={"warrantyexpiredassets"}>
                Warranty Expired Assets
              </option>
            </select>
          </label>
          {/* <label>
            <input type="checkbox" />
            show only cold storage item
          </label>
          <label>
            <input type="checkbox" />
            show assets maintained by me
          </label> */}
          <label>
            Substore:
            <select>
              <option value={"allstore"}>All Store</option>
              <option value={"accounts"}>Accounts</option>
              <option value={"brainoperationstore"}>
                Brain Operations Store
              </option>
              <option value={"femalewardsubstore"}>Female Ward Substore</option>
              <option value={"icusubstore"}>ICU Sub Store</option>
              <option value={"malewardsubstore"}>Male Ward Substore</option>
              <option value={"maternitysubstore"}>Maternity Substore</option>
              <option value={"operationsubstore"}>Operations Substore</option>
              <option value={"privatesubstore"}>Private Substore</option>
            </select>
          </label>
        </form>
      </section>

      <section className="assetsManagement-costCenterList">
        <div className="assetsManagement-search-bar">
          <div className="assetsManagement-search-container">
            <input type="text" placeholder="Search" />
            <i className="fas fa-search"></i>
          </div>
          <div>
            <span className="assetsManagement-results-count">
              Showing {filteredData.length} / {dummyData.length} results &nbsp;&nbsp;
            </span>
            <button className="assetsManagement-print-btn">Print</button>
          </div>
        </div>
        <table className="assetsManagement-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Bar Code",
                "Item Name",
                "Vendor Name",
                "Specification",
                "Model No",
                "Asset Location",
                "Sub Store",
                "Asset Holder",
                "Action",
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
                      onMouseDown={startResizing(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.barCode}</td>
                  <td>{item.itemName}</td>
                  <td>{item.vendorName}</td>
                  <td>{item.specification}</td>
                  <td>{item.modelNo}</td>
                  <td>{item.assetLocation}</td>
                  <td>{item.subStore}</td>
                  <td>{item.assetHolder}</td>
                  <td>
                    <button className="assetsManagement-action-btn">Action</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="no-show-assetsManagement" colSpan={9}>
                  No Row To Show
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <div className="assetsManagement-pagination">
          <button className="assetsManagement-paginationButton">First</button>
          <button className="assetsManagement-paginationButton">
            Previous
          </button>
          <span className="assetsManagement-paginationInfo">Page 1 of 1</span>
          <button className="assetsManagement-paginationButton">Next</button>
          <button className="assetsManagement-paginationButton">Last</button>
        </div> */}
      </section>
    </div>
  );
};

export default CostCenterItemList;
