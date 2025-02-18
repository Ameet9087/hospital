import React, { useState, useRef, useEffect } from "react";
import "./Dgmaster.css";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import DgMasterPopup from "./DgMasterPopup";
import { toast } from "react-toastify";

const Dgmaster = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/dg-packages`)
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => {
        console.error("Failed to fetch packages:", err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const filteredPackages = packages.filter((pkg) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      pkg.packageName?.toLowerCase().includes(searchLower) ||
      pkg.packageCode?.toLowerCase().includes(searchLower) ||
      pkg.companyPackageName?.toLowerCase().includes(searchLower) ||
      pkg.companyPackageCode?.toLowerCase().includes(searchLower) ||
      pkg.duration?.toString().includes(searchLower) ||
      pkg.forallorganisations?.toLowerCase().includes(searchLower) ||
      pkg.selectedOrganisationOnly?.toLowerCase().includes(searchLower) ||
      pkg.packageType?.toLowerCase().includes(searchLower) ||
      pkg.status?.toLowerCase().includes(searchLower) ||
      pkg.total_cost?.toString().includes(searchLower)
    );
  });

  const handleExport = () => {
    const csvHeader = [
      "Package Name",
      "Package Code",
      "Company Package Name",
      "Company Package Code",
      "Duration",
      "For All Organisations",
      "For Selected Organisation Only",
      "Package Type",
      "Status",
      "Total Cost",
    ];
    const csvData = filteredPackages.map((pkg) => [
      pkg.packageName,
      pkg.packageCode,
      pkg.companyPackageName,
      pkg.companyPackageCode,
      pkg.duration,
      pkg.forallorganisations,
      pkg.selectedOrganisationOnly,
      pkg.packageType,
      pkg.status,
      pkg.total_cost,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [csvHeader.join(","), ...csvData.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "packages.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const printContent = `
      <html>
        <head>
          <title>Packages</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Packages</h1>
          <table>
            <thead>
              <tr>
                ${[
        "Package Name",
        "Package Code",
        "Company Package Name",
        "Company Package Code",
        "Duration",
        "For All Organisations",
        "Selected Organisation Only",
        "Package Type",
        "Status",
        "Total Cost",
      ]
        .map((header) => `<th>${header}</th>`)
        .join("")}
              </tr>
            </thead>
            <tbody>
              ${filteredPackages
        .map(
          (pkg) => `
                    <tr>
                      <td>${pkg.packageName}</td>
                      <td>${pkg.packageCode}</td>
                      <td>${pkg.companyPackageName}</td>
                      <td>${pkg.companyPackageCode}</td>
                      <td>${pkg.duration}</td>
                      <td>${pkg.forallorganisations}</td>
                      <td>${pkg.selectedOrganisationOnly}</td>
                      <td>${pkg.packageType}</td>
                      <td>${pkg.status}</td>
                      <td>${pkg.total_cost}</td>
                    </tr>
                  `
        )
        .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="dgmaster-container">
      <div className="dgmaster-addBtn">
        <button className="dgmaster-add-button" onClick={openPopup}>
          + Create New Dg Package
        </button>
      </div>

      <div className="dgmaster-search-N-result">
        <div className="dgmaster-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="dgmaster-results-info">
          <span>
            Showing {filteredPackages.length} / {packages.length} results
          </span>
          <button
            className="dgmaster-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="dgmaster-print-button"
            onClick={handlePrint}
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
                "Name",
                "Code",
                "Company Name",
                "Company Code",
                "Duration",
                "For All Organisations",
                "Selected Organisation Only",
                "Type",
                "Status",
                "Total Cost",
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
            {filteredPackages.map((pkg, index) => (
              <tr key={index}>
                <td>{pkg.packageName}</td>
                <td>{pkg.packageCode}</td>
                <td>{pkg.companyPackageName}</td>
                <td>{pkg.companyPackageCode}</td>
                <td>{pkg.duration}</td>
                <td>{pkg.forallorganisations}</td>
                <td>{pkg.selectedOrganisationOnly}</td>
                <td>{pkg.packageType}</td>
                <td>{pkg.status}</td>
                <td>{pkg.total_cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <DgMasterPopup />
        </CustomModal>
      )}
    </div>
  );
};

export default Dgmaster;