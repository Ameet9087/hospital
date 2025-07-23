import React, { useState, useRef } from "react";
import "./AssetsMaintain.css"; // Assuming you'll create a CSS file for styling

const AssetsMaintainence = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Dummy data for the table
  const dummyData = [
    {
      barCode: "123456",
      assetCode: "A001",
      itemName: "Air Conditioner",
      totalLife: 10,
      yearOfUse: 3,
      remainingLife: 7,
      manufactureDate: "2019-01-15",
      warranty: "2 Years",
      remainingServiceDays: 180,
      status: "underrepair",
    },
    {
      barCode: "789012",
      assetCode: "A002",
      itemName: "Generator",
      totalLife: 15,
      yearOfUse: 5,
      remainingLife: 10,
      manufactureDate: "2017-06-10",
      warranty: "3 Years",
      remainingServiceDays: 365,
      status: "service",
    },
    {
      barCode: "345678",
      assetCode: "A003",
      itemName: "X-Ray Machine",
      totalLife: 8,
      yearOfUse: 6,
      remainingLife: 2,
      manufactureDate: "2015-03-25",
      warranty: "5 Years",
      remainingServiceDays: 90,
      status: "faulty",
    },
    {
      barCode: "901234",
      assetCode: "A004",
      itemName: "MRI Scanner",
      totalLife: 20,
      yearOfUse: 7,
      remainingLife: 13,
      manufactureDate: "2014-11-30",
      warranty: "4 Years",
      remainingServiceDays: 250,
      status: "service",
    },
    {
      barCode: "567890",
      assetCode: "A005",
      itemName: "Ultrasound Machine",
      totalLife: 12,
      yearOfUse: 9,
      remainingLife: 3,
      manufactureDate: "2012-07-20",
      warranty: "2 Years",
      remainingServiceDays: 120,
      status: "underrepair",
    },
  ];

  // State for managing the filtered data
  const [filteredData, setFilteredData] = useState(dummyData);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleStatusChange = (event) => {
    const status = event.target.id;
    setSelectedStatus(status);
    if (status === "all") {
      setFilteredData(dummyData); // Show all data
    } else {
      setFilteredData(dummyData.filter((item) => item.status === status)); // Filter by status
    }
  };

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
    <div className="assetsMaintainance">
      <section className="assetsMaintainance-addCostCenter">
        <form className="assetsMaintainance-form">
          <div>
            <label>
              <input type="checkbox" />
              Show assets maintained by me
            </label>
          </div>
          <div>
            <label>
              <strong>List by Status:</strong>
            </label>
            <label htmlFor="all">
              <input
                name="status"
                id="all"
                type="radio"
                checked={selectedStatus === "all"}
                onChange={handleStatusChange}
              />{" "}
              All
            </label>
            <label htmlFor="underrepair">
              <input
                name="status"
                id="underrepair"
                type="radio"
                checked={selectedStatus === "underrepair"}
                onChange={handleStatusChange}
              />{" "}
              Under Repair
            </label>
            <label htmlFor="faulty">
              <input
                name="status"
                id="faulty"
                type="radio"
                checked={selectedStatus === "faulty"}
                onChange={handleStatusChange}
              />{" "}
              Faulty
            </label>
            <label htmlFor="service">
              <input
                name="status"
                id="service"
                type="radio"
                checked={selectedStatus === "service"}
                onChange={handleStatusChange}
              />{" "}
              Service
            </label>
          </div>
        </form>
      </section>

      <section className="assetsMaintainance-costCenterList">
        <div className="assetsMaintainance-search-bar">
          <div className="assetsMaintainance-search-container">
            <input type="text" placeholder="Search" />
            <i className="fas fa-search"></i>
          </div>
          <div>
            <span className="assetsMaintainance-results-count">
              Showing {filteredData.length} / {dummyData.length} results &nbsp;&nbsp;
            </span>
            <button className="assetsMaintainance-print-btn">Print</button>
          </div>
        </div>
        <table className="assetsMaintainance-table" ref={tableRef}>
          <thead>
            <tr >
              {[
                "Bar Code",
                "Asset Code",
                "Item Name",
                "Total life In Year",
                "Year Of Use",
                "Remaining Life",
                "Manufacture Date",
                "Warranty",
                "Remaining Days For Service",
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
                  <td>{item.assetCode}</td>
                  <td>{item.itemName}</td>
                  <td>{item.totalLife}</td>
                  <td>{item.yearOfUse}</td>
                  <td>{item.remainingLife}</td>
                  <td>{item.manufactureDate}</td>
                  <td>{item.warranty}</td>
                  <td>{item.remainingServiceDays}</td>
                  <td>
                    <button className="assetsMaintainance-action-btn">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="no-show-assetsMaintainance" colSpan={10}>
                  No Row To Show
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <div className="assetsMaintainance-pagination">
          <button className="assetsMaintainance-paginationButton">First</button>
          <button className="assetsMaintainance-paginationButton">
            Previous
          </button>
          <span className="assetsMaintainance-paginationInfo">Page 1 of 1</span>
          <button className="assetsMaintainance-paginationButton">Next</button>
          <button className="assetsMaintainance-paginationButton">Last</button>
        </div> */}
      </section>
    </div>
  );
};

export default AssetsMaintainence;
