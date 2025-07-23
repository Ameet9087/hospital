import React, { useState, useRef, useEffect } from "react";
import "./sampleCollection.css"; // Import CSS module
import { useNavigate } from "react-router-dom";
import CollectSample from "./CollectSample";
import { API_BASE_URL } from "../api/api";
import { FloatingInput } from "../../FloatingInputs";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";

const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};

const SampleCollection = () => {
  const [labTest, setlabTest] = useState(null);
  const [filteredLabTests, setFilteredLabTests] = useState(null); // Filtered data
  const [selectedSample, setSelectedSample] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [dateFrom, setDateFrom] = useState(getCurrentDate());
  const [dateTo, setDateTo] = useState(getCurrentDate());

  const handleCollectSample = (sample) => {
    setSelectedSample(sample);
    console.log(sample);
  };

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase().trim(); // Convert query to lowercase
    setSearchQuery(query);

    if (query === "") {
      // If the query is empty, reset to the original list
      setFilteredLabTests(labTest);
      return;
    }

    // Filter logic
    const filtered = labTest?.filter((test) => {
      const patientName = (
        (test.inPatient?.patient?.firstName || "") +
        " " +
        (test.inPatient?.patient?.lastName || "") +
        (test.outPatient?.patient?.firstName || "") +
        " " +
        (test.outPatient?.patient?.lastName || "")
      ).toLowerCase();

      const phoneNumber =
        (test.inPatient?.patient?.mobileNumber || "") +
        (test.outPatient?.patient?.mobileNumber || "");

      const testNames = test?.labTests
        ?.map((labTest) => labTest.labTestName.toLowerCase())
        .join(" ");

      // Return true if the query matches any field
      return (
        patientName.includes(query) || // Match patient name
        phoneNumber.includes(query) || // Match phone number
        testNames.includes(query) // Match test names
      );
    });

    setFilteredLabTests(filtered);
  };

  useEffect(() => {
    fetch(
      `${API_BASE_URL}/lab-requests/between-date?startDate=${dateFrom}&endDate=${dateTo}&status=Pending`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setlabTest(data);
        setFilteredLabTests(data); // Initialize filtered data
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [dateFrom, dateTo]);

  // Render the CollectSample page if a sample is selected
  if (selectedSample) {
    return (
      <CollectSample
        sample={selectedSample}
        setSelectedSample={setSelectedSample}
      />
    );
  }

  return (
    <div className="sampleCollection-Container">
      <div className="sampleCollection-Header">
        <h1 className="sampleCollection-Title">Sample Data</h1>
        <button className="sampleCollection-list-btn">
          Samples Collected List
        </button>
      </div>

      <div className="sampleCollection-controls">
        <div className="sampleCollection-date-range">
          <FloatingInput
          label={"From"}
           type="date"
           name="dateFrom"
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

      <div className="sampleCollection-search-N-print">
        <div className="sampleCollection-search-bar">
          <FloatingInput
          label={"Search"}
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          />
         
        </div>
        <div className="sampleCollection-results-info">
          <span>
            Showing {filteredLabTests?.length || 0} / {labTest?.length || 0}{" "}
            results
          </span>
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
            {filteredLabTests?.length > 0 &&
              filteredLabTests?.map((test, index) => (
                <tr key={index}>
                  <td>{test.requisitionDate}</td>
                  <td>
                    {test.inPatient?.patient?.firstName ||
                      test.outPatient?.patient?.firstName}{" "}
                    {test.inPatient?.patient?.lastName ||
                      test.outPatient?.patient?.lastName}
                  </td>
                  <td>
                    {test.inPatient?.patient?.age ||
                      test.outPatient?.patient?.age}{" "}
                    Y
                  </td>
                  <td>
                    {test.inPatient?.patient?.mobileNumber ||
                      test.outPatient?.patient?.mobileNumber}
                  </td>
                  <td>
                    {test?.labTests?.map((labTest, index) => (
                      <span key={index}>
                        {index > 0 ? " , " : ""}
                        {labTest.labTestName}
                      </span>
                    ))}
                  </td>
                  <td>
                    {test.inPatient?.isIPD?.toLowerCase() === "ipd"
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
    </div>
  );
};

export default SampleCollection;
