import React, { useState, useEffect, useRef } from "react";
import "./WriteOffItemList.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import { useFilter } from "../../ShortCuts/useFilter";
import * as XLSX from 'xlsx';
const WriteOffItemsList = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [writeOffGoods, setWriteOffGoods] = useState([]);
  const [filteredGoods, setFilteredGoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data from the API
    const fetchWriteOffGoods = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/write-off-goods`
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
  const writeOffInGoods = useFilter(writeOffGoods, searchTerm);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport');
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx');
  };


  return (
    <div className="writeOffList-inventory-content">
      <div className="writeOffList-inventory-results">
        <input
          type="text"
          placeholder="Search"
          className="writeOffList-inventory-search-bar"
          value={searchTerm}
          onChange={handleSearch}
        />

        <div>
          <span className="writeOffList-inventory-span">
            Showing {writeOffGoods.length} / {writeOffGoods.length} results
          </span>
          <button
            className="writeOffList-inventory-button"
           onClick={handleExport}
          >
            Export
          </button>
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
            {writeOffInGoods.length > 0 ? (
              writeOffInGoods.map((item, index) => (
                <tr key={index}>
                  <td>{item?.items.itemName}</td>
                  <td>{item?.writeOffQty}</td>
                  <td>{item?.writeOffDate}</td>
                  <td>{item?.items?.standardRate}</td>
                  <td>{item?.totalAmount}</td>
                  <td>{item?.remark}</td>
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
