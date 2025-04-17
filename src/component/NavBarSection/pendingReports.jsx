import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../NavBarSection/pendingReports.css";

import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/api";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { FloatingInput } from "../../FloatingInputs";

function PendingReports() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [category, setCategory] = useState("");
  const [labResult, setLabResult] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query state on input change
  };

  useEffect(() => {
    const currentDate = getCurrentDate();
    setDateFrom(currentDate);
    setDateTo(currentDate);
    let link;

    if (dateFrom !== "" && dateTo !== "") {
      link = `${API_BASE_URL}/lab-result/by-verify-dateRange?startDate=${dateFrom}&endDate=${dateTo}&approvalStatus=Pending`;
    } else {
      let TodaysDate = new Date().toISOString().split("T")[0];
      link = `${API_BASE_URL}/lab-result/by-verify-dateRange?startDate=${TodaysDate}&endDate=${TodaysDate}&approvalStatus=Pending`;
    }

    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        setLabResult(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dateFrom, dateTo]);

  // Filter lab results based on the search query
  const filteredLabResults = labResult?.filter((result) => {
    const patientName =
      result.labResult?.outPatient?.patient?.firstName ||
      result.labRequest?.inPatient?.patient?.firstName;

    const patientLastName =
      result.labRequest?.outPatient?.patient?.lastName ||
      result.labRequest?.inPatient?.patient?.lastName;

    const patientFullName = `${patientName} ${patientLastName}`.toLowerCase();

    const searchLowerCase = searchQuery.toLowerCase();

    return patientFullName.includes(searchLowerCase); // Match search query with patient name
  });

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
          <div className="pendingReports-date-range">
            <FloatingInput
            label={"From"}
             type="date"
             id="dateFrom"
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
        {/* <div className="pendingReports-category-select">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">--Select Lab Category--</option>
          </select>
        </div> */}
      </div>
      <div className="pendingReports-searchbar-N-showing">
        <div className="pendingReports-search-bar">

          <FloatingInput
           type="text"
           label={"Search"}
           value={searchQuery} // Bind search query value
           onChange={handleSearchChange}
          
          />
        </div>
        <div className="pendingReports-results-info">
          <span>Showing {filteredLabResults?.length || 0} results</span>
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
            {filteredLabResults?.length > 0 ? (
              filteredLabResults.map((result, index) => (
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
                    {result?.labRequest?.labTests?.map((labTest, index) => (
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
                    {result?.labRequest.sampleCollections &&
                      result?.labRequest.sampleCollections.length > 0 &&
                      result?.labRequest.sampleCollections.map(
                        (collection, index) => (
                          <span key={index}>
                            {index > 0 ? " , " : ""}
                            {collection.runNumber}
                          </span>
                        )
                      )}
                  </td>
                  <td>
                    {result?.labRequest.sampleCollections &&
                      result?.labRequest.sampleCollections.length > 0 &&
                      result?.labRequest.sampleCollections.map(
                        (collection, index) => (
                          <span key={index}>
                            {index > 0 ? " , " : ""}
                            {collection.barcode}
                          </span>
                        )
                      )}
                  </td>
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
                <td colSpan={"9"}>No matching results</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PendingReports;
