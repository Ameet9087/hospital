/* Ajhar Tamboli sSIReturn.jsx 19-09-24 */

import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx"; // Import the xlsx library
import "../SSInventory/sSIReturn.css";
import { useReactToPrint } from "react-to-print";
import SSIRetunReturnItemBtn from "./sSIRetunReturnItemBtn";
import SSIPatientConsumNewPCbtn from "./sSIPatientConsumNewPCbtn";
import { API_BASE_URL } from "../../../api/api";
import CustomModal from "../../../../CustomModel/CustomModal";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

function SSIReturn() {
  const printRef = useRef();
  const tableRef = useRef(null);
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [showViewRequisition, setShowViewRequisition] = useState(false);
  const [returns, setReturns] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPatientConsumption, setShowNewPatientConsumption] = useState(false);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/substore-return-items`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setReturns(data); // Adjust based on your API response structure
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchReturns();
  }, []);

  // Filter data by date range
  const filterByDate = (data) => {
    if (!dateFrom || !dateTo) return data;
    return data.filter((item) => {
      const returnDate = new Date(item.returnDate);
      const startDate = new Date(dateFrom);
      const endDate = new Date(dateTo);
      return returnDate >= startDate && returnDate <= endDate;
    });
  };

  // Filter data by search term
  const filterBySearch = (data) => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  // Apply filters
  const filteredReturns = filterBySearch(filterByDate(returns));

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
  //   documentTitle: "Return Item Report",
  //   pageStyle: `
  //     @page {
  //       size: A4;
  //       margin: 20mm;
  //     }
  //   `,
  // });

  const handleExportToExcel = () => {
    // Get the table data
    const tableData = [["Store Name", "Date", "Returned By", "Remarks"]];


    // Create a new workbook and a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    // Convert the workbook to an Excel file and trigger the download
    XLSX.writeFile(workbook, "Return_Item_Report.xlsx");
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

  return (
    <div className="sSIReturn-active-imaging-request">

      <>
        <header className="sSIReturn-header">
          <div className="sSIReturn-status-filters">

            <button className="sSIReturn-new-patient-button" onClick={() => setShowNewPatientConsumption(true)}>
              Returns Item
            </button>
          </div>
          <div className="sSIReturn-filterBySubCategory">
            <label>Select Inventory:</label>
            <select>
              <option value="">GENERAL-INVENTORY</option>

            </select>
          </div>
        </header>


        <div className="sSIReturn-controls">
          <div className="sSIReturn-date-range">
            <label>
              From:
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </label>
            <label>
              To:
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </label>
          </div>
        </div>


        <div className="sSIReturn-search-N-results">
          <div className="sSIReturn-search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
          </div>
          <div className="sSIReturn-results-info">
            Showing {filteredReturns.length} / {returns.length} results
            <button className="sSIReturn-print-btn" onClick={handleExportToExcel}>
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button className="sSIReturn-print-btn" onClick={handlePrint}>
              <i className="fa-solid fa-print"></i> Print
            </button>
          </div>
        </div>

        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {["Store Name", "Date", "Returned By", "Remarks"].map((header, index) => (
                  <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                    <div className="header-content">
                      <span>{header}</span>
                      <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredReturns.length > 0 ? (
                filteredReturns.map((item, index) => (
                  <tr key={index}>
                    <td>{item.storeName}</td>
                    <td>{item.returnDate}</td>
                    <td>{item.returnedBy}</td>
                    <td>{item.remarks}</td>
                    {/* <td>
                      <button className="action-button">Action</button>
                    </td> */}

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-rows-message">
                    No Rows To Show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>

      <CustomModal isOpen={showNewPatientConsumption} onClose={() => setShowNewPatientConsumption(false)}>

        <SSIRetunReturnItemBtn />
      </CustomModal>
    </div>
  );
}

export default SSIReturn;
