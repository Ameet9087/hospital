/* Ajhar Tamboli relEditDoctors.jsx 19-09-24 */

import React, { useState, useEffect, useRef } from "react";
import "../EditDoctors/relEditDoctors.css";
import TransactionDetails from "./rdlEditDrEditBtn";
import * as XLSX from "xlsx";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";

function RDLEditDoctors() {
  const [columnWidths, setColumnWidths] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [imagingData, setImagingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("--All--"); // State for filter
  const tableRef = useRef(null);

  // Function to fetch data from API
  useEffect(() => {
    fetch(`${API_BASE_URL}/imaging-requisitions/getAll-Prescriber`)
      .then((response) => response.json())
      .then((data) => {
        setImagingData(data);
        setFilteredData(data); // Initialize filteredData with full data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to handle filter change
  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setSelectedFilter(filterValue);
    if (filterValue === "--All--") {
      setFilteredData(imagingData);
    } else {
      const filtered = imagingData.filter(
        (item) =>
          item.imagingTypeDTO?.imagingTypeName.toUpperCase() === filterValue
      );
      setFilteredData(filtered);
    }
  };

  const handleEditDoctorClick = (item) => {
    setShowPopup(true);
    setSelectedRequest(item);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedRequest(null);
  };

  const printTable = () => {
    const printContents = document.getElementById("table-to-print").outerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = `<html><head><title>Print</title></head><body>${printContents}</body></html>`;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload the page to reset the state
  };

  const exportToExcel = () => {
    const table = document.getElementById("table-to-print");
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Edit Doctors");
    XLSX.writeFile(wb, "Edit_Doctors_Report.xlsx");
  };

  return (
    <div className="relEditDoctors-active-imaging-request">
      <header>
        <h4>* Edit Doctors</h4>
        <div className="relEditDoctors-filter">
          <label>
            Filter
            <select value={selectedFilter} onChange={handleFilterChange}>
              <option>--All--</option>
              <option>CT-SCAN</option>
              <option>USG</option>
              <option>X-RAYS</option>
              <option>ECHO</option>
            </select>
          </label>
        </div>
      </header>
      <div className="relEditDoctors-controls">
        <div className="relEditDoctors-date-range">
          <label>
            From:
            <input type="date" defaultValue="2024-08-09" />
          </label>
          <label>
            To:
            <input type="date" defaultValue="2024-08-16" />
          </label>
 </div>
      </div>
      <div className="relEditDoctors-search-N-results">
        <div className="relEditDoctors-search-bar">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              setFilteredData(
                imagingData.filter(
                  (item) =>
                    item.patientDTO.firstName
                      .toLowerCase()
                      .includes(searchTerm) ||
                    item.imagingItemDTO.imagingItemName
                      .toLowerCase()
                      .includes(searchTerm)
                )
              );
            }}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="relEditDoctors-results-info">
          Showing {filteredData.length} / {imagingData.length} results
          <button
            className="relEditDoctors-ex-pri-buttons"
            onClick={exportToExcel}
          >
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button
            className="relEditDoctors-ex-pri-buttons"
            onClick={printTable}
          >
            <i class="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <div className="table-container" id="table-to-print">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Date",
                "Patient Name",
                "Age/Sex",
                "Type",
                "Imaging Name",
                "Prescriber Name",
                // "Radiologist/Reporting Doctor",
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
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.imagingDate}</td>
                {/* <td>{item.invoiceNumber}</td> */}
                <td>
                  {item.patientDTO?.firstName ||
                    item.newPatientVisitDTO?.firstName}{" "}
                  {item.patientDTO?.lastName ||
                    item.newPatientVisitDTO?.lastName}
                </td>
                <td>
                  {item.patientDTO?.age || item.newPatientVisitDTO?.age} Y
                </td>
                <td>{item.imagingTypeDTO?.imagingTypeName}</td>
                <td>{item.imagingItemDTO?.imagingItemName}</td>
                <td>
                  {item.prescriberDTO?.salutation}{" "}
                  {item.prescriberDTO?.firstName} {item.prescriberDTO?.lastName}
                </td>
                {/* <td>{item.performerDTO?.firstName}</td> */}
                <td>
                  <button
                    className="relEditDoctors-action-button-add-report"
                    onClick={() => handleEditDoctorClick(item)}
                  >
                    Edit Doctor(s)
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <TransactionDetails
          onClose={closePopup}
          selectedRequest={selectedRequest}
        />
      )}
    </div>
  );
}

export default RDLEditDoctors;
