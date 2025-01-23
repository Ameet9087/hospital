import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../NavBarSection/pendingReports.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/api";

function PendingReports() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [category, setCategory] = useState("");
  const [labResult, setLabResult] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const navigate = useNavigate();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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
    let link;

    if (dateFrom != "" && dateTo != "") {
      link = `${API_BASE_URL}/lab-result/by-verify-dateRange?startDate=${dateFrom}&endDate=${dateTo}&approvalStatus=Pending`;
    } else {
      let TodaysDate = new Date().toISOString().split("T")[0];
      link = `${API_BASE_URL}/lab-result/by-verify-dateRange?startDate=${TodaysDate}&endDate=${TodaysDate}&approvalStatus=Pending`;
    }
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setLabResult(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dateFrom, dateTo]);

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("Pending Reports", 14, 16);
    doc.text(`Reporting Date: From ${dateFrom} To ${dateTo}`, 14, 22);

    const tableColumn = [
      "Hospital No.",
      "Patient Name",
      "Age/Sex",
      "Phone Number",
      "Test Name",
      "Requesting Dept.",
      "Run No.",
      "Bar Code",
    ];
    const tableRows = [];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    // Generate the PDF and open it in a new tab
    const pdfData = doc.output("dataurlstring");
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(
        `<iframe src="${pdfData}" width="100%" height="100%" style="border:none;"></iframe>`
      );
    }
  };

  return (
    <div className="pendingReports-work-list">
      <h4>Pending Reports</h4>
      <div className="pendingReports-header">
        <div className="pendingReports-controls">
          {/* Your date range and button controls */}
          <div className="pendingReports-date-range">
            <label>
              From:
              <input
                type="date"
                id="dateFrom"
                defaultValue={dateFrom}
                onChange={handleDateFromChange}
              />
            </label>
            <label>
              To:
              <input
                type="date"
                id="dateTo"
                defaultValue={dateTo}
                onChange={handleDateToChange}
              />
            </label>
          </div>
        </div>
        <div className="pendingReports-category-select">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">--Select Lab Category--</option>
            <option value="all">
              <input type="checkbox" /> Select All
            </option>
            <option value="biochemistry">
              <input type="checkbox" /> Biochemistry
            </option>
            <option value="hematology">
              <input type="checkbox" /> Hematology
            </option>
            <option value="microbiology">
              <input type="checkbox" /> Microbiology
            </option>
            <option value="parasitology">
              <input type="checkbox" /> Parasitology
            </option>
            <option value="serology">
              <input type="checkbox" /> Serology
            </option>
            <option value="immunoassay">
              <input type="checkbox" /> Immunoassay
            </option>
            <option value="pathology">
              <input type="checkbox" /> Pathology
            </option>
            <option value="virology">
              <input type="checkbox" /> Virology
            </option>
            {/* Add more options here */}
          </select>
        </div>
      </div>
      <div className="pendingReports-searchbar-N-showing">
        <div className="pendingReports-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search"
            className="pendingReports-search-input"
          />
        </div>
        <div className="pendingReports-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="pendingReports-print-button" onClick={handlePrint}>
            <i className="fa fa-file-excel"></i> Export
          </button>
          <button className="pendingReports-print-button" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Sr No.",
                "Patient Name",
                "Age/Sex",
                "Phone Number",
                "Test Name",
                "Requesting Dept.",
                "Run No.",
                "Bar Code",
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
            {labResult != null ? (
              labResult.map((result, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {result.labResult?.outPatient?.patient?.firstName ||
                      result.labRequest?.inPatient?.patient?.firstName}{" "}
                    {result.labRequest?.outPatient?.patient?.lastName ||
                      result.labRequest?.inPatient?.patient?.lastName}
                  </td>
                  <td>
                    {result.labRequest?.outPatient?.patient?.age ||
                      result?.labRequest?.inPatient?.patient?.age}
                    {" Y / "}
                    {result.labRequest?.outPatient?.patient?.gender ||
                      result.labRequest?.inPatient?.patient?.gender}
                  </td>
                  <td>
                    {result.labRequest?.outPatient?.patient?.mobileNumber ||
                      result.labRequest?.inPatient?.patient?.mobileNumber}
                  </td>
                  <td>
                    {result?.labRequest.labTests?.map((labTest, index) => (
                      <span key={index}>
                        {index > 0 ? " , " : ""}
                        {labTest.labTestName}
                      </span>
                    ))}
                  </td>
                  <td>
                    {result.labRequest?.inPatient != null
                      ? "InPatient"
                      : "Outpatient"}
                  </td>
                  <td>
                    {result?.labRequest?.sampleCollections?.map(
                      (labTest, index) => (
                        <span key={index}>
                          {index > 0 ? " , " : ""}
                          {labTest.runNumber}
                        </span>
                      )
                    )}
                  </td>
                  <td>{result.labRequest?.barcode}</td>
                  <td>
                    <button
                      className="pendingReports-table-btn"
                      onClick={() =>
                        navigate("/laboratory/pendingreports/labResult", {
                          state: {
                            labRequestId: result.labRequest?.labRequestId,
                          },
                        })
                      }
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={"9"}>Loading</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <div className="pendingReports-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      </div>
    </div>
  );
}

export default PendingReports;
