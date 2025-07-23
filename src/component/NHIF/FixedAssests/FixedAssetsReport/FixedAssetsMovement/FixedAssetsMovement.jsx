import React, { useState, useRef } from "react";
import "./fixedAssetsMovement.css";

const FixedAssetsMovement = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef = useRef(null);

  // Dummy Data
  const [data, setData] = useState([
    { itemCode: "IC001", barCode: "BC001", assetCode: "AC001", itemName: "Chair" },
    { itemCode: "IC002", barCode: "BC002", assetCode: "AC002", itemName: "Table" },
    { itemCode: "IC003", barCode: "BC003", assetCode: "AC003", itemName: "Wheelchair" },
    { itemCode: "IC004", barCode: "BC004", assetCode: "AC004", itemName: "Stretcher" },
    { itemCode: "IC005", barCode: "BC005", assetCode: "AC005", itemName: "Towel" },
  ]);

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

  // Filter data based on search term
  const filteredData = data.filter(
    (item) =>
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assetCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixedAssetMovement-container">
      <h1>
        <i className="fas fa-money-bill-alt"></i> Fixed Assets Movement
      </h1>
      <div className="fixedAssetMovement-header">
        <select className="fixedAssetMovement-year-select">
          <option>2024</option>
        </select>
        <div className="fixedAssetMovement-date-range">
          <label>From:</label>
          <input
            type="date"
            value="2024-08-16"
            className="fixedAssetMovement-date-input"
          />
          <label>To:</label>
          <input
            type="date"
            value="2024-08-16"
            className="fixedAssetMovement-date-input"
          />
        </div>
        <button className="fixedAssetMovement-star-button">☆</button>
        <button className="fixedAssetMovement-show-report">Show Report</button>
      </div>
      <div className="fixedAssetMovement-filters">
        <div className="fixedAssetMovement-filter">
          <label>Select Employee:</label>
          <select className="fixedAssetMovement-select">
            <option>All Employees</option>
          </select>
        </div>
        <div className="fixedAssetMovement-filter">
          <label>Select Department:</label>
          <select className="fixedAssetMovement-select">
            <option>All Departments</option>
            <option>SubStore1</option>
            <option>male Ward substore</option>
            <option>Substore3</option>
            <option>Account</option>
            <option>Maternity Ward</option>
            <option>ICU SubStore</option>
            <option>Private SubStore</option>
            <option>Female Ward Substore</option>
            <option>Opration SubStore</option>
            <option>Brain Opration Store</option>
          </select>
        </div>
        <div className="fixedAssetMovement-filter">
          <label>Select Item:</label>
          <select className="fixedAssetMovement-select">
            <option>All Items</option>
            <option>Towel</option>
            <option>Chair</option>
            <option>Wheelchair</option>
          </select>
        </div>
        <div className="fixedAssetMovement-filter">
          <label>Search Via Reference No:</label>
          <input type="text" className="fixedAssetMovement-input" />
        </div>
      </div>

      <section className="fixedAssetMovement-costCenterList">
        <div className="fixedAssetMovement-search-bar">
          <div className="fixedAssetMovement-search-container">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          <div>
            <span className="fixedAssetMovement-results-count">
              Showing {filteredData.length} / {data.length} results &nbsp;&nbsp;
            </span>
            <button className="fixedAssetMovement-print-btn">Print</button>
          </div>
        </div>
        <table className="fixedAssetMovement-table" ref={tableRef}>
          <thead>
            <tr>
              {["Item Code", "Bar Code", "Asset Code", "Item Name", "Action"].map(
                (header, index) => (
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
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemCode}</td>
                  <td>{item.barCode}</td>
                  <td>{item.assetCode}</td>
                  <td>{item.itemName}</td>
                  <td>
                    <button>Action</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="no-show-fixedAssetMovement" colSpan={5}>
                  No Row To Show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default FixedAssetsMovement;
