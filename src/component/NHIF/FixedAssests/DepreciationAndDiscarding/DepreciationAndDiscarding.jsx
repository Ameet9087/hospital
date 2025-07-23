import React, { useState, useRef } from "react";
import "./DAD.css"; // Assuming you'll create a CSS file for styling

const DepreciationAndDiscarding = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Dummy data for the table
  const dummyData = [
    {
      itemCode: "IC001",
      barCode: "BC001",
      assetCode: "AC001",
      itemName: "Laptop",
      action: "Discard",
    },
    {
      itemCode: "IC002",
      barCode: "BC002",
      assetCode: "AC002",
      itemName: "Printer",
      action: "Depreciate",
    },
    {
      itemCode: "IC003",
      barCode: "BC003",
      assetCode: "AC003",
      itemName: "Desk Chair",
      action: "Depreciate",
    },
    {
      itemCode: "IC004",
      barCode: "BC004",
      assetCode: "AC004",
      itemName: "Projector",
      action: "Discard",
    },
    {
      itemCode: "IC005",
      barCode: "BC005",
      assetCode: "AC005",
      itemName: "Whiteboard",
      action: "Depreciate",
    },
  ];

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
    <div className="DAD">
      <section className="DAD-costCenterList">
        <div className="DAD-search-bar">
          <div className="DAD-search-container">
            <input type="text" placeholder="Search" />
            <i className="fas fa-search"></i>
          </div>
          <div>
            <span className="DAD-results-count">
              Showing {dummyData.length} / {dummyData.length} results &nbsp;&nbsp;
            </span>
            <button className="DAD-print-btn">Print</button>
          </div>
        </div>
        <table className="DAD-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Item Code",
                "Bar Code",
                "Asset Code",
                "Item Name",
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
            {dummyData.length > 0 ? (
              dummyData.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemCode}</td>
                  <td>{item.barCode}</td>
                  <td>{item.assetCode}</td>
                  <td>{item.itemName}</td>
                  <td>{item.action}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="no-show-DAD" colSpan={5}>
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

export default DepreciationAndDiscarding;
