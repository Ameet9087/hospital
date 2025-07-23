import React, { useState, useRef, useEffect } from "react";
import "./assetCategoryMaster.css";
import AssetCategoryMasterPopUp from "./assetCategoryMasterPopUp";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput } from "../../../../FloatingInputs";

const NewAssetCategoryMaster = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [assetCategories, setAssetCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data from API
  useEffect(() => {
    const fetchAssetCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/asset-categories`);
        if (response.ok) {
          const data = await response.json();
          setAssetCategories(data);
        } else {
          console.error("Failed to fetch asset categories.");
        }
      } catch (error) {
        console.error("Error fetching asset categories:", error);
      }
    };

    fetchAssetCategories();
  }, [showPopup]);

  // Function to open the popup
  const openPopup = () => {
    setShowPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Filter asset categories based on the search query
  const filteredAssetCategories = assetCategories.filter((category) => {
    return (
      category.assetCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.underCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.depreciation.toString().includes(searchQuery.toLowerCase()) ||
      category.salvage.toString().includes(searchQuery.toLowerCase()) ||
      category.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Function to export table data to CSV
  const exportToCSV = () => {
    const csvContent = [
      ["Asset Category", "Under Category", "Depreciation (%)", "Salvage", "Status"],
      ...filteredAssetCategories.map((category) => [
        category.assetCategory,
        category.underCategory,
        category.depreciation,
        category.salvage,
        category.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "AssetCategories.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Function to print the table
  const printTable = () => {
    const printContent = document.querySelector(".table-container").innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Asset Categories</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="newAssetCategoryMaster-container">
      <div className="newAssetCategoryMaster-addBtn">
        <button
          className="newAssetCategoryMaster-add-button"
          onClick={openPopup}
        >
          + Add New Asset Category
        </button>
      </div>

      <div className="newAssetCategoryMaster-search-N-result">
        <div className="newAssetCategoryMaster-search-bar">
          <FloatingInput
            label={"Search"}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}

          />
        </div>
        <div className="newAssetCategoryMaster-results-info">
          <span>
            Showing {filteredAssetCategories.length} / {assetCategories.length} results
          </span>
          <button
            className="newAssetCategoryMaster-print-button"
            onClick={exportToCSV}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="newAssetCategoryMaster-print-button"
            onClick={printTable}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Asset Category",
                "Under Category",
                "Depreciation (%)",
                "Salvage",
                "Status",
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
            {filteredAssetCategories.map((category, index) => (
              <tr key={index}>
                <td>{category.assetCategory}</td>
                <td>{category.underCategory}</td>
                <td>{category.depreciation}</td>
                <td>{category.salvage}</td>
                <td>{category.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <AssetCategoryMasterPopUp onClose={closePopup} />
        </CustomModal>
      )}
    </div>
  );
};

export default NewAssetCategoryMaster;
