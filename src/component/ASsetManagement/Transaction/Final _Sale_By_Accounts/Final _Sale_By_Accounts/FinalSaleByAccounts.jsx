import React, { useState, useRef, useEffect } from "react";
import "./FinalSaleByAccounts.css";
import FinalSaleByAccountsPopUp from "./FinalSaleByAccountsPopUp";
import { startResizing } from "../../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../../api/api";
import * as XLSX from "xlsx"; // Importing the xlsx library

const FinalSaleByAccounts = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [finalSales, setFinalSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSales, setFilteredSales] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/final-sales`)
      .then((res) => res.json())
      .then((data) => {
        setFinalSales(data);
        setFilteredSales(data); // Initialize filtered data
        
      })
      .catch((err) => {
        console.error("Error fetching final sales:", err);
      });
  }, []);

  // Filter data based on the search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredSales(
      finalSales.filter((sale) =>
        JSON.stringify(sale).toLowerCase().includes(term)
      )
    );
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleExport = () => {
    // Prepare data for export
    const exportData = filteredSales.map((sale) => ({
      FinalSaleID: sale.finalSaleId,
      ManualSaleNo: sale.manualSaleNo,
      SalePrice: sale.salePrice,
      GSTAmount: sale.gstAmount,
      NetSalePrice: sale.netSalePrice,
      AssetNo:
        sale.provisionalSaleDTO?.condemnationDisposalDTO
          ?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.assetNo,
      EquipmentName:
        sale.provisionalSaleDTO?.condemnationDisposalDTO
          ?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.equipmentName,
    }));

    // Create a worksheet and workbook using xlsx
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Final Sales");

    // Export the workbook to an Excel file
    XLSX.writeFile(wb, "final_sales.xlsx");
  };

  // Print the table
  const handlePrint = () => {
    const printableContent = document.getElementById("printable-table").outerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Final Sales</title>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h2>Final Sales</h2>
          ${printableContent}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  return (
    <div className="FinalSaleByAccounts-container">
      <div className="FinalSaleByAccounts-addBtn">
        <button className="FinalSaleByAccounts-add-button" onClick={openPopup}>
          + Add New Final Sale By Accounts
        </button>
      </div>

      <div className="FinalSaleByAccounts-search-N-result">
        <div className="FinalSaleByAccounts-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="FinalSaleByAccounts-results-info">
          <span>
            Showing {filteredSales.length} / {finalSales.length} results
          </span>
          <button
            className="FinalSaleByAccounts-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="FinalSaleByAccounts-print-button"
            onClick={handlePrint}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="table-container">
        <table id="printable-table">
          <thead>
            <tr>
              {[
                "Final Sale ID",
                "Manual Sale No",
                "Sale Price",
                "GST Amount",
                "Net Sale Price",
                "Asset No",
                "Equipment Name",
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
                      onMouseDown={startResizing(tableRef, setColumnWidths)(
                        index
                      )}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale, index) => (
              <tr key={index}>
                <td>{sale.finalSaleId}</td>
                <td>{sale.manualSaleNo}</td>
                <td>{sale.salePrice}</td>
                <td>{sale.gstAmount}</td>
                <td>{sale.netSalePrice}</td>
                <td>
                  {
                    sale.provisionalSaleDTO?.condemnationDisposalDTO
                      ?.condemnationDisposalRequestDTO?.equipmentMasterDTO
                      ?.assetNo
                  }
                </td>
                <td>
                  {
                    sale.provisionalSaleDTO?.condemnationDisposalDTO
                      ?.condemnationDisposalRequestDTO?.equipmentMasterDTO
                      ?.equipmentName
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <FinalSaleByAccountsPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default FinalSaleByAccounts;
