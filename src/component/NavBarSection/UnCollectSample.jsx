import React, { useEffect, useRef, useState } from "react";
import "./UnCollectSample.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import { FloatingInput } from "../../FloatingInputs";
const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};

function UnCollectSample() {
  const tableRef = useRef(null);

  const [unCollectSampleData, setunCollectSampleData] = useState([]);
  const [filteredSampleData, setFilteredSampleData] = useState([]);
  const [dateFrom, setDateFrom] = useState(getCurrentDate());
  const [dateTo, setDateTo] = useState(getCurrentDate());
  const [searchQuery, setSearchQuery] = useState("");
  const [columnWidths, setColumnWidths] = useState({});

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase().trim();
    setSearchQuery(query);

    if (query === "") {
      setFilteredSampleData(unCollectSampleData);
      return;
    }

    // Filter logic
    const filtered = unCollectSampleData?.filter((test) => {
      const patientName = (
        (test.labRequest?.inPatient?.patient?.firstName || "") +
        " " +
        (test.labRequest?.inPatient?.patient?.lastName || "") +
        (test.labRequest?.outPatient?.patient?.firstName || "") +
        " " +
        (test.labRequest?.outPatient?.patient?.lastName || "")
      ).toLowerCase();

      const phoneNumber =
        (test.labRequest?.inPatient?.patient?.mobileNumber || "") +
        (test.labRequest?.outPatient?.patient?.mobileNumber || "");

      const testNames = test?.labRequest?.labTests
        ?.map((labTest) => labTest.labTestName.toLowerCase())
        .join(" ");

      return (
        patientName.includes(query) ||
        phoneNumber.includes(query) ||
        testNames.includes(query)
      );
    });

    setFilteredSampleData(filtered);
  };

  const fetchAlltheunCollectSampleData = async () => {
    const response = await axios.get(`${API_BASE_URL}/samples/getAllSamples`);
    setunCollectSampleData(response.data);
    setFilteredSampleData(response.data);
  };

  useEffect(() => {
    fetchAlltheunCollectSampleData();
  }, []);

  const handleCollectSample = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/samples/${id}`);
      fetchAlltheunCollectSampleData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="unCollectSample-container">
      <div className="unCollectSample-Header">
        <h1 className="unCollectSample-Title">Samples Data</h1>
      </div>

      <div className="unCollectSample-controls">
        <div className="unCollectSample-date-range">
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

      <div className="unCollectSample-search-N-print">
        <div className="unCollectSample-search-bar">
          <FloatingInput
          type="text"
          label={"Search"}
          value={searchQuery}
          onChange={handleSearchChange}
          />
        </div>
        <div className="unCollectSample-results-info">
          <span>
            Showing {filteredSampleData?.length || 0} /{" "}
            {unCollectSampleData?.length || 0} results
          </span>
          <button className="unCollectSample-print-btn">
            <i className="fa fa-file-excel"></i> Export
          </button>
          <button className="unCollectSample-print-btn">
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
            {filteredSampleData?.length > 0 &&
              filteredSampleData?.map((test, index) => (
                <tr key={index}>
                  <td>{test.labRequest?.requisitionDate}</td>
                  <td>
                    {test.labRequest?.inPatient?.patient?.firstName ||
                      test.labRequest?.outPatient?.patient?.firstName}{" "}
                    {test.labRequest?.inPatient?.patient?.lastName ||
                      test.labRequest?.outPatient?.patient?.lastName}
                  </td>
                  <td>
                    {test.labRequest?.inPatient?.patient?.age ||
                      test.labRequest?.outPatient?.patient?.age}{" "}
                    Y
                  </td>
                  <td>
                    {test.labRequest?.inPatient?.patient?.mobileNumber ||
                      test.labRequest?.outPatient?.patient?.mobileNumber}
                  </td>
                  <td>
                    {test?.labRequest.labTests?.map((labTest, index) => (
                      <span key={index}>
                        {index > 0 ? " , " : ""}
                        {labTest.labTestName}
                      </span>
                    ))}
                  </td>
                  <td>
                    {test.labRequest?.inPatient?.isIPD?.toLowerCase() === "ipd"
                      ? "IPD"
                      : "OPD"}
                  </td>
                  <td>normal</td>
                  <td>
                    <button
                      className="unCollectSample-viewDetails"
                      onClick={() =>
                        handleCollectSample(test.sampleCollectionId)
                      } // Pass the row's data
                    >
                      UnCollect Sample
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UnCollectSample;
