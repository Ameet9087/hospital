import React, { useState, useEffect, useRef } from "react";
import "./WriteOffItemList.css";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import { API_BASE_URL } from "../../api/api";

const WriteOffItemsList = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [writeOffGoods, setWriteOffGoods] = useState([]);
  const [filteredGoods, setFilteredGoods] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchWriteOffGoods = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/writeoffgoods/getAll`
        );
        if (response.ok) {
          const data = await response.json();
          setWriteOffGoods(data);
          console.log(data);

          setFilteredGoods(data); // Initialize filtered goods
        } else {
          console.error("Failed to fetch Write-Off Goods");
        }
      } catch (error) {
        console.error("Error fetching Write-Off Goods:", error);
      }
    };

    fetchWriteOffGoods();
  }, []);

  useEffect(() => {
    // Filter goods based on the search query
    const results = writeOffGoods.filter((item) =>
      item.item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGoods(results);
  }, [searchQuery, writeOffGoods]);

  const handlePrint = () => {
    console.log("Printing...");

  };

  return (
    <div className="writeOffList-inventory-content">
      <div className="writeOffList-inventory-results">
        <input
          type="text"
          placeholder="Search"
          className="writeOffList-inventory-search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>
          <span className="writeOffList-inventory-span">
            Showing {filteredGoods.length} / {writeOffGoods.length} results
          </span>
          <button
            className="writeOffList-inventory-button"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Item Name",
                "Write Off Quantity",
                "Write Off Date",
                "Rate",
                "Total Amount",
                "Remark",
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
            {filteredGoods.length > 0 ? (
              filteredGoods.map((item, index) => (
                <tr key={index}>
                  <td>{item.item.itemName}</td>
                  <td>{item.writeOffQty}</td>
                  <td>{item.writeOffDate}</td>
                  <td>{item.item.standardRate}</td>
                  <td>{item.totalAmount}</td>
                  <td>{item.remark}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Rows To Show</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <div className="writeOffList-inventory-writeOffList-pagination">
        <div className='writeOffList-inventory-writeOffList-pagination-div'>
          <span>0 to {filteredGoods.length} of {writeOffGoods.length}</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default WriteOffItemsList;
