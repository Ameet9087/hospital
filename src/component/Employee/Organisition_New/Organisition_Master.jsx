import React, { useState, useRef, useEffect } from "react";
import "./Organisition_Master.css";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import OrganisitionMasterPopup from "./OrganisitionMasterPopup";

const Organisition_Master = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [organisations, setOrganisations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/organisation-masters`)
      .then((res) => res.json())
      .then((data) => setOrganisations(data))
      .catch((err) => {
        console.error("Failed to fetch organisations:", err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const filteredOrganisations = organisations.filter((org) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      org.name?.toLowerCase().includes(searchLower) ||
      org.classification?.toLowerCase().includes(searchLower) ||
      org.city?.toLowerCase().includes(searchLower) ||
      org.phoneNumber1?.toLowerCase().includes(searchLower) ||
      org.email?.toLowerCase().includes(searchLower) ||
      org.validityForPatient?.toLowerCase().includes(searchLower) ||
      org.regiCharNotApplicable?.toLowerCase().includes(searchLower) ||
      org.accEntry?.toLowerCase().includes(searchLower) ||
      org.insurance?.toLowerCase().includes(searchLower)
    );
  });

  const handleExport = () => {
    const csvHeader = [
      "Name",
      "Classification",
      "City",
      "Phone Number",
      "Email",
      "Validity For Patient",
      "Registration Charges Not Applicable",
      "Account Entry",
      "Insurance",
    ];
    const csvData = filteredOrganisations.map((org) => [
      org.name,
      org.classification,
      org.city,
      org.phoneNumber1,
      org.email,
      org.validityForPatient,
      org.regiCharNotApplicable,
      org.accEntry,
      org.insurance,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [csvHeader.join(","), ...csvData.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "organisations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const printContent = `
      <html>
        <head>
          <title>Organisations</title>
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
          <h1>Organisations</h1>
          <table>
            <thead>
              <tr>
                ${[
        "Name",
        "Classification",
        "City",
        "Phone Number",
        "Email",
        "Validity For Patient",
        "Registration Charges Not Applicable",
        "Account Entry",
        "Insurance",
      ]
        .map((header) => `<th>${header}</th>`)
        .join("")}
              </tr>
            </thead>
            <tbody>
              ${filteredOrganisations
        .map(
          (org) => `
                    <tr>
                      <td>${org.name}</td>
                      <td>${org.classification}</td>
                      <td>${org.city}</td>
                      <td>${org.phoneNumber1}</td>
                      <td>${org.email}</td>
                      <td>${org.validityForPatient}</td>
                      <td>${org.regiCharNotApplicable}</td>
                      <td>${org.accEntry}</td>
                      <td>${org.insurance}</td>
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
    <div className="Organisition_Master-container">
      <div className="Organisition_Master-addBtn">
        <button className="Organisition_Master-add-button" onClick={openPopup}>
          + Create New Organization
        </button>
      </div>

      <div className="Organisition_Master-search-N-result">
        <div className="Organisition_Master-search-bar">
         
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="Organisition_Master-results-info">
          <span>
            Showing {filteredOrganisations.length} / {organisations.length} results
          </span>
          <button
            className="Organisition_Master-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="Organisition_Master-print-button"
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
                "Classification",
                "City",
                "Phone Number",
                "Email",
                "Validity For Patient",
                "Registration Charges Not Applicable",
                "Account Entry",
                "Insurance",
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
            {filteredOrganisations.map((org, index) => (
              <tr key={index}>
                <td>{org.name}</td>
                <td>{org.classification}</td>
                <td>{org.city}</td>
                <td>{org.phoneNumber1}</td>
                <td>{org.email}</td>
                <td>{org.validityForPatient}</td>
                <td>{org.regiCharNotApplicable}</td>
                <td>{org.accEntry}</td>
                <td>{org.insurance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <OrganisitionMasterPopup />
        </CustomModal>
      )}
    </div>
  );
};

export default Organisition_Master;