import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../NavBarSection/finalReports.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import FinalizedReportLabResult from "./FinalizedReportLabResult";
import { API_BASE_URL } from "../api/api";
import { useNavigate } from "react-router-dom";

const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};
function FinalReports() {
  const [dateFrom, setDateFrom] = useState(getCurrentDate()); // Set initial state to today's date
  const [dateTo, setDateTo] = useState(getCurrentDate());
  const [category, setCategory] = useState("");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [labResult, setLabResult] = useState(null);
  const navigate = useNavigate();

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("Final Reports", 14, 16);
    doc.text(`Reporting Date: From ${dateFrom} To ${dateTo}`, 14, 22);
    // Generate the PDF and open in a new tab
    const pdfData = doc.output("dataurlstring");
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(
        `<iframe src="${pdfData}" width="100%" height="100%" style="border:none;"></iframe>`
      );
    }
  };

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  const fetchLabResults = () => {
    let link;

    if (dateFrom && dateTo) {
      link = `${API_BASE_URL}/lab-result/by-verify-dateRange?startDate=${dateFrom}&endDate=${dateTo}&approvalStatus=Rejected`;
    } else {
      const todayDate = getCurrentDate();
      console.log(todayDate);

      link = `${API_BASE_URL}/lab-result/by-verify-dateRange?startDate=${todayDate}&endDate=${todayDate}&approvalStatus=Rejected`;
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
        console.log("Fetched data: ", data); // Debugging log
        setLabResult(data);
      })
      .catch((err) => {
        console.log("Fetch error: ", err);
      });
  };

  useEffect(() => {
    fetchLabResults(); // Call to fetch lab results when the component mounts or dates change
  }, [dateFrom, dateTo]);

  return (
    <div className="finalReports-work-list">
      <h4>Final Reports</h4>
      <div className="finalReports-header">
        <div className="finalReports-controls">
          {/* Your date range and button controls */}
          <div className="finalReports-date-range">
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
        <div className="finalReports-category-select">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">--Select Lab Category--</option>
            <option value="">Sellect All</option>
            <option value="">Search</option>
            <option value="">Biochemistry</option>
            <option value="">Hematology</option>
            <option value="">Microbiology</option>
            <option value="">Parasitology</option>
            <option value="">Serology</option>
            <option value="">Immunoassay</option>
            <option value="">DEFAULT</option>
            <option value="">HISTOCYTOLOGY</option>
            <option value="">OUT SOURCE</option>
            <option value="">MOLECULAR BIOCHEMISTRY</option>
            <option value="">PATHOLOGY</option>
            <option value="">TUMOR MARKER</option>
            <option value="">VIROLOGY</option>
            <option value="">Blood Transfusion</option>
          </select>
        </div>
      </div>

      <div className="finalReports-searchbar-N-showing">
        <div className="finalReports-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search"
            className="finalReports-search-input"
          />
        </div>
        <div className="finalReports-results-info">
          <span>
            Showing {labResult?.length} / {labResult?.length} results
          </span>
          <button className="finalReports-print-button" onClick={handlePrint}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="finalReports-print-button" onClick={handlePrint}>
            <i class="fa-solid fa-print"></i> Print
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
                "Report Generated By",
                "Requesting Dept.",
                "Run No.",
                "Bar Code",
                "Is Printed",
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
                    {result.labRequest?.outPatient?.patient?.firstName ||
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
                    {result.labRequest?.inPatient?.patient?.mobileNumber ||
                      result.labRequest?.outPatient?.patient?.mobileNumber}
                  </td>
                  <td>
                    {result?.labRequest.labTests?.map((labTest, index) => (
                      <span key={index}>
                        {index > 0 ? " , " : ""}
                        {labTest.labTestName}
                      </span>
                    ))}
                  </td>
                  <td>{result.verifyBy}</td>
                  <td>
                    {result.labRequest?.inPatient?.inPatient != null
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
                  <td>{result.isPrinted ? "YES" : "NO"}</td>
                  <td>
                    <button
                      className="pendingReports-table-btn"
                      onClick={() =>
                        navigate(
                          "/laboratory/rejectedreports/rejected-labResult",
                          {
                            state: {
                              labRequestId: result.labRequest?.labRequestId,
                            },
                          }
                        )
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
      </div>
    </div>
  );
}

export default FinalReports;
