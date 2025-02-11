/* Ajhar Tamboli rdlListReports.jsx 19-09-24 */

import React, { useState, useEffect, useRef } from "react";
import "../ListReports/rdlListReports.css";
import * as XLSX from "xlsx"; // Import xlsx library
import RadiologyApprovalReport from "./RadiologyApprovalReport";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingSelect } from "../../../FloatingInputs";

const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};

function RadiologyApproval() {
  const [dateFrom, setDateFrom] = useState(getCurrentDate());
  const [dateTo, setDateTo] = useState(getCurrentDate());
  const [columnWidths, setColumnWidths] = useState({});
  const [showAddReport, setShowAddReport] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [reportsData, setReportsData] = useState([]);
  const [filteredReportsData, setFilteredReportsData] = useState([]);
  const [filter, setFilter] = useState("--All--");
  const [searchQuery, setSearchQuery] = useState("");
  const tableRef = useRef(null);

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  useEffect(() => {
    const currentDate = getCurrentDate();
    setDateFrom(currentDate);
    setDateTo(currentDate);
  }, []);

  const fetchImagingRequest = () => {
    let link;

    if (dateFrom && dateTo) {
      link = `${API_BASE_URL}/imaging-requisitions/by-status-date?status=PendingForApproval&startDate=${dateFrom}&endDate=${dateTo}`;
    } else {
      const todayDate = getCurrentDate();
      console.log(todayDate);

      link = `${API_BASE_URL}/imaging-requisitions/by-status-date?status=PendingForApproval&startDate=${todayDate}&endDate=${todayDate}`;
    }

    // Fetch the data
    fetch(link)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data: ", data);
        setReportsData(data);
      })
      .catch((err) => {
        console.log("Fetch error: ", err);
      });
  };

  useEffect(() => {
    fetchImagingRequest();
  }, [dateFrom, dateTo]);

  useEffect(() => {
    // Apply the filter whenever the filter state changes
    if (filter === "--All--") {
      setFilteredReportsData(reportsData);
    } else {
      const filteredData = reportsData.filter(
        (report) =>
          report.imagingTypeDTO?.imagingTypeName.toUpperCase() === filter
      );
      setFilteredReportsData(filteredData);
    }
  }, [filter, reportsData]);

  useEffect(() => {
    applySearchFilter();
  }, [searchQuery, reportsData, filter]);

  const handleViewClick = (report) => {
    setSelectedRequest(report);
    setShowAddReport(true);
  };

  const closePopups = () => {
    setShowAddReport(false);
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
    const tableData = [
      [
        "Sr No",
        "Date",
        "Patient Name",
        "Age/Sex",
        "Phone No",
        "Reporting Doctor",
        "Imaging Type",
        "Imaging Item",
      ],
      ...filteredReportsData.map((report, index) => [
        index + 1,
        report.imagingDate,
        report.patientId,
        report.patientDTO?.firstName + " " + report.patientDTO?.lastName ||
          report.newPatientVisitDTO?.firstName +
            " " +
            report.newPatientVisitDTO?.lastName ||
          "N/A",
        `${report.patientDTO?.age || "N/A"}Y / ${
          report.patientDTO?.gender || "N/A"
        }`,
        report.patientDTO?.phoneNumber || "N/A",
        report.prescriberDTO?.employeeName,
        report.imagingTypeDTO?.imagingTypeName,
        report.imagingItemDTO?.imagingItemName,
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ImagingReports");

    ws["!cols"] = [
      { wpx: 50 },
      { wpx: 100 },
      { wpx: 150 },
      { wpx: 150 },
      { wpx: 100 },
      { wpx: 120 },
      { wpx: 150 },
      { wpx: 120 },
      { wpx: 120 },
      { wpx: 80 },
    ];

    XLSX.writeFile(wb, "ImagingReports.xlsx");
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const applySearchFilter = () => {
    const lowerQuery = searchQuery.toLowerCase();
    const filteredData = reportsData.filter((report) => {
      const fullName = `${report.patientDTO?.firstName || ""} ${
        report.patientDTO?.lastName || ""
      }`;
      return (
        fullName.toLowerCase().includes(lowerQuery) ||
        (report.patientDTO?.phoneNumber || "").includes(lowerQuery) ||
        (report.imagingTypeDTO?.imagingTypeName || "")
          .toLowerCase()
          .includes(lowerQuery) ||
        (report.imagingItemDTO?.imagingItemName || "")
          .toLowerCase()
          .includes(lowerQuery) ||
        (
          report.inPatientDTO?.patient?.uhid ||
          report.outPatientDTO?.patient?.uhid ||
          ""
        ).includes(lowerQuery)
      );
    });
    setFilteredReportsData(filteredData);
  };

  return (
    <div className="rDLListReport-active-imaging-request">
      <header className="rDLListReport-header">
        <h4>* Imaging Reports of All Patients</h4>
        <div className="rDLListReport-filter">
          <FloatingSelect
            label={"Filter"}
            value={filter}
            onChange={handleFilterChange}
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
      <div className="rDLListReport-controls">
        <div className="rDLListReport-date-range">
          <FloatingInput
            label={"From"}
            type="date"
            value={dateFrom}
            onChange={handleDateFromChange}
          />

          <FloatingInput
            label={"To"}
            type="date"
            id="dateTo"
            value={dateTo}
            onChange={handleDateToChange}
          />
        </div>
      </div>
      <div className="rDLListReport-search-N-results">
        <div className="rDLListReport-search-bar">
          <FloatingInput
            label={"Search"}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="rDLListReport-results-info">
          Showing {filteredReportsData.length} / {reportsData.length} results
          <button
            className="rDLListReport-ex-pri-buttons"
            onClick={exportToExcel}
          >
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button className="rDLListReport-ex-pri-buttons" onClick={printTable}>
            <i class="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <div className="table-container" id="table-to-print">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Sr No",
                "Date",
                "uhid",
                "Patient Name",
                "Age/Sex",
                "Phone No",
                "Reporting Doctor",
                "Imaging Type",
                "Imaging Item",
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
            {filteredReportsData.map((report, index) => (
              <tr key={report.imagingId}>
                <td>{index + 1}</td>
                <td>{report.imagingDate}</td>
                <td>
                  {report.inPatientDTO?.patient?.uhid ||
                    report.outPatientDTO?.patient?.uhid}
                </td>
                <td>
                  {report.inPatientDTO?.patient?.firstName ||
                    report.outPatientDTO?.patient?.firstName}{" "}
                  {report.inPatientDTO?.patient?.lastName ||
                    report.outPatientDTO?.patient?.lastName}
                </td>
                <td>
                  {report.inPatientDTO?.patient?.age ||
                    report.outPatientDTO?.patient?.age}{" "}
                  {report.inPatientDTO?.patient?.ageUnit ||
                    report.outPatientDTO?.patient?.ageUnit}{" "}
                  {" / "}{" "}
                  {report.inPatientDTO?.patient?.gender ||
                    report.outPatientDTO?.patient?.gender}
                </td>
                <td>
                  {report.inPatientDTO?.patient?.mobileNumber ||
                    report.outPatientDTO?.patient?.mobileNumber ||
                    "N/A"}
                </td>
                <td>{report.prescriberDTO?.doctorName || "Self"}</td>
                <td>{report.imagingItemDTO?.imagingType?.imagingTypeName}</td>
                <td>{report.imagingItemDTO?.imagingItemName}</td>
                <td>
                  <button
                    className="rDLListReport-action-button-add-reports"
                    onClick={() => handleViewClick(report)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddReport && (
        <RadiologyApprovalReport
          onClose={closePopups}
          selectedRequest={selectedRequest}
        />
      )}
    </div>
  );
}

export default RadiologyApproval;
