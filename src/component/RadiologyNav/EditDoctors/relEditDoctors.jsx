/* Ajhar Tamboli relEditDoctors.jsx 19-09-24 */

import React, { useState, useEffect, useRef } from "react";
import "../EditDoctors/relEditDoctors.css";
import TransactionDetails from "./rdlEditDrEditBtn";
import * as XLSX from "xlsx";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingSelect } from "../../../FloatingInputs";
const getCurrentDate = () => new Date().toISOString().split("T")[0];

function RDLEditDoctors() {
  const [columnWidths, setColumnWidths] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [imagingData, setImagingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("--All--");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState(getCurrentDate());
  const [dateTo, setDateTo] = useState(getCurrentDate());
  const tableRef = useRef(null);

  // Function to fetch data from API
  useEffect(() => {
    fetch(`${API_BASE_URL}/imaging-requisitions/getAll-Performer`)
      .then((response) => response.json())
      .then((data) => {
        setImagingData(data);
        setFilteredData(data); // Initialize filteredData with full data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [showPopup]);

  // Function to handle filter change
  useEffect(() => {
    filterData();
  }, [selectedFilter, searchTerm, dateFrom, dateTo, imagingData]);

  const filterData = () => {
    let filtered = imagingData;

    // Filter by date range
    filtered = filtered.filter(
      (item) => item.imagingDate >= dateFrom && item.imagingDate <= dateTo
    );

    // Filter by imaging type
    if (selectedFilter !== "--All--") {
      filtered = filtered.filter(
        (item) =>
          item.imagingTypeDTO?.imagingTypeName.toUpperCase() === selectedFilter
      );
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((item) => {
        const patient =
          item.inPatientDTO?.patient || item.outPatientDTO?.patient; // Get patient from either type
        return (
          patient?.firstName.toLowerCase().includes(searchTerm) ||
          patient?.lastName.toLowerCase().includes(searchTerm) ||
          item.imagingItemDTO?.imagingItemName
            .toLowerCase()
            .includes(searchTerm)
        );
      });
    }

    setFilteredData(filtered);
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
          <FloatingSelect
            label={"Filter"}
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            options={[
              { value: "", label: "-ALL-" },
              { value: "CT-SCAN", label: "CT-SCAN" },
              { value: "USG", label: "USG" },
              { value: "X-RAY", label: "X-RAY" },
              { value: "ECHO", label: "ECHO" },
            ]}
          />
        </div>
      </header>
      <div className="relEditDoctors-controls">
        <div className="relEditDoctors-date-range">
          <FloatingInput
            label={"From"}
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <FloatingInput
            label={"To"}
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>
      </div>
      <div className="relEditDoctors-search-N-results">
        <div className="relEditDoctors-search-bar">
          <FloatingInput
            label={"Search"}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
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
                  {item.inPatientDTO?.patient?.firstName ||
                    item.outPatientDTO?.patient?.firstName}{" "}
                  {item.inPatientDTO?.patient?.lastName ||
                    item.outPatientDTO?.patient?.lastName}
                </td>
                <td>
                  {item.inPatientDTO?.patient?.age ||
                    item.outPatientDTO?.patient?.age}{" "}
                  {item.inPatientDTO?.patient?.ageUnit ||
                    item.outPatientDTO?.patient?.ageUnit}{" "}
                  {" / "}
                  {item.inPatientDTO?.patient?.gender ||
                    item.outPatientDTO?.patient?.gender}
                </td>
                <td>{item.imagingItemDTO?.imagingType?.imagingTypeName}</td>
                <td>{item.imagingItemDTO?.imagingItemName}</td>
                <td>
                  {item.performerDTO?.salutation} {item.performerDTO?.firstName}{" "}
                  {item.performerDTO?.firstName}
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
