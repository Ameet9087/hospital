import React, { useState, useEffect, useRef } from "react";
import "./FinancialYear.css";

const dummyData = [
  {
    FinancialYearName: "2022-2023",
    StartDate: "01/04/2022",
    EndDate: "31/03/2023",
    description: "Fiscal year for 2022-2023",
    isClosed: true,
    action: "Re-open",
  },
  {
    FinancialYearName: "2021-2022",
    StartDate: "01/04/2021",
    EndDate: "31/03/2022",
    description: "Fiscal year for 2021-2022",
    isClosed: true,
    action: "Re-open",
  },
  {
    FinancialYearName: "2020-2021",
    StartDate: "01/04/2020",
    EndDate: "31/03/2021",
    description: "Fiscal year for 2020-2021",
    isClosed: true,
    action: "Re-open",
  },
  {
    FinancialYearName: "2019-2020",
    StartDate: "01/04/2019",
    EndDate: "31/03/2020",
    description: "Fiscal year for 2019-2020",
    isClosed: false,
    action: "Edit",
  },
];

function FinancialYear() {
  const [data, setData] = useState(dummyData);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [openReopenPopup, setReopenPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);

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

  const handleReopen = (index, item) => {
    setPopupData(item);
    setReopenPopup(true);
  };

  const handleReopenPopupForm = (index) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, isClosed: false } : item
      )
    );
  };

  return (
    <div className="FinancialYear">
      <div className="FinancialYear-create">
        <button className="" type="button" disabled>
          + Create FinancialYear
        </button>
      </div>
      <div className="FinancialYear-search-bar">
        <div className="FinancialYear-search-container">
          <input type="text" placeholder="Search" />
          <i className="fas fa-search"></i>
        </div>
        <div>
          <span className="FinancialYear-results-count">
            Showing {data.length} / {data.length}
          </span>
          <button className="FinancialYear-print-btn">Print</button>
        </div>
      </div>
      <table className="FinancialYear-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Financial Year Name",
              "Start Date",
              "End Date",
              "Description",
              "Closed Status",
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
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{item.FinancialYearName}</td>
              <td>{item.StartDate}</td>
              <td>{item.EndDate}</td>
              <td>{item.description}</td>
              <td>{item.isClosed ? "Closed" : "Open"}</td>
              <td>
                <button
                  className="FinancialYear-table-btn"
                  type="button"
                  disabled={!item.isClosed}
                  onClick={() => handleReopen(index, item)}
                >
                  {item.action}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openReopenPopup && (
        <>
          <div className="financialYear-popup-overlay">
            <div className="financialYear-popup-container">
              <form>
                <div className="financialYear-popup-data">
                  <label>Financial Year</label>
                  <span>: {popupData.FinancialYearName}</span>
                </div>
                <div className="financialYear-popup-data">
                  <label>Start Date</label>
                  <span>: AD {popupData.StartDate}</span>
                </div>
                <div className="financialYear-popup-data">
                  <label>End Date</label>
                  <span>: AD {popupData.EndDate}</span>
                </div>
                <div className="financialYear-popup-data">
                  <label>Closed Status</label>
                  <span>: {popupData.isClosed ? "Closed" : "Open"}</span>
                </div>
                <div className="financialYear-popup-remark">
                  <p>Remark :</p>
                  <textarea name="remark" placeholder="Remark" rows={3} />
                </div>
                <button
                  onClick={() => handleReopenPopupForm(index)}
                  className="financialYear-popup-savebtn"
                >
                  Save
                </button>
                {/* <button className="">Cancel</button> */}
              </form>
              <button
                className="financialYear-popup-close"
                onClick={() => setReopenPopup(false)}
              >
                X
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FinancialYear;
