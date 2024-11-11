import React, { useState, useRef, useEffect } from "react";
import "./sampleCollection.css"; // Import CSS module
import { useNavigate } from "react-router-dom";
import CollectSample from "./CollectSample";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";

const SampleCollection = () => {
  const [labTest, setlabTest] = useState(null);
  const [selectedSample, setSelectedSample] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Handle collecting the sample
  const handleCollectSample = (sample) => {
    setSelectedSample(sample); // Store the selected row's data
  };

  useEffect(() => {
    const requisitionDate = new Date().toISOString().split("T")[0];
    fetch(
      `http://localhost:1415/api/lab-requests/by-requisition-date?requisitionDate=${requisitionDate}&status=Pending`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setlabTest(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error); // Handle any errors
      });
  }, []);

  // Render the CollectSample page if a sample is selected
  if (selectedSample) {
    return <CollectSample sample={selectedSample} />;
  }
  return (
    <div className="sampleCollection-Container">
      <div className="sampleCollection-Header">
        <h1 className="sampleCollection-Title">List Requisition</h1>
        <button className="sampleCollection-list-btn">
          Samples Collected List
        </button>
      </div>

      <div className="sampleCollection-controls">
        {/* Your date range and button controls */}
        <div className="sampleCollection-date-range">
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

      <div className="sampleCollection-search-N-print">
        <div className="sampleCollection-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search"
            className="sampleCollection-search-input"
          />
        </div>
        <div className="sampleCollection-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="sampleCollection-print-btn">
          <i className="fa fa-file-excel"></i> Export
          </button>
          <button className="sampleCollection-print-btn">
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Requisition Date",
                "Patient Name",
                "Age/Sex",
                "Phone Number",
                "Test Name",
                "Requesting Dept.",
                "Run Number Type",
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
            {labTest != null &&
              labTest.map((test, index) => (
                <tr key={index}>
                  <td>{test.requisitionDate}</td>
                  <td>
                    {test.patientDTO?.firstName ||
                      test.newPatientVisitDTO?.firstName}{" "}
                    {test.patientDTO?.lastName ||
                      test.newPatientVisitDTO?.lastName}
                  </td>
                  <td>
                    {test.patientDTO?.age || test.newPatientVisitDTO?.age} Y
                  </td>
                  <td>
                    {test.patientDTO?.phoneNumber ||
                      test.newPatientVisitDTO?.phoneNumber}
                  </td>
                  <td>{test.labTestName}</td>
                  <td>
                    {test.patientDTO?.isIPD?.toLowerCase() === "yes"
                      ? "IPD"
                      : "OPD"}
                  </td>
                  <td>normal</td>
                  <td>
                    <button
                      className="sampleCollection-viewDetails"
                      onClick={() => handleCollectSample(test)} // Pass the row's data
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* <div className="labPagination">
        <span>Showing 12 / 12 results</span>
        <div className="labPaginationControls">
          <button className="labButton labPaginationButton">First</button>
          <button className="labButton labPaginationButton">Previous</button>
          <span>1 to 12 of 12</span>
          <button className="labButton labPaginationButton">Next</button>
          <button className="labButton labPaginationButton">Last</button>
        </div>
      </div> */}
    </div>
  );
};

export default SampleCollection;
