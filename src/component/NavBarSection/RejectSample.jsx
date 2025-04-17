import React, { useEffect, useRef, useState } from "react";
import "./RejectSample.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import CustomModel from "../../CustomModel/CustomModal";
import { FloatingInput } from "../../FloatingInputs";
const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};

function RejectSample() {
  const tableRef = useRef(null);

  const [RejectSampleData, setRejectSampleData] = useState([]);
  const [filteredSampleData, setFilteredSampleData] = useState([]);
  const [dateFrom, setDateFrom] = useState(getCurrentDate());
  const [dateTo, setDateTo] = useState(getCurrentDate());
  const [searchQuery, setSearchQuery] = useState("");
  const [columnWidths, setColumnWidths] = useState({});
  const [confirmBox, setConfirmBox] = useState(false);
  const [reason, setReason] = useState("");
  const [sampleId, setSampleId] = useState(0);

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
      setFilteredSampleData(RejectSampleData);
      return;
    }

    // Filter logic
    const filtered = RejectSampleData?.filter((test) => {
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

  const fetchAlltheRejectSampleData = async () => {
    const response = await axios.get(`${API_BASE_URL}/samples/getAllSamples`);
    setRejectSampleData(response.data);
    setFilteredSampleData(response.data);
  };

  useEffect(() => {
    fetchAlltheRejectSampleData();
  }, []);

  const confirmationBox = (id) => {
    setConfirmBox(true);
    setSampleId(id);
  };

  const handleCollectSample = async (id) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/samples/${id}/reject?rejectionReason=${reason}`
      );
      setConfirmBox(false);
      fetchAlltheRejectSampleData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="RejectSample-container">
        <div className="RejectSample-Header">
          <h1 className="RejectSample-Title">Samples Data</h1>
        </div>

        <div className="RejectSample-controls">
          <div className="RejectSample-date-range">
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

        <div className="RejectSample-search-N-print">
          <div className="RejectSample-search-bar">
            <FloatingInput
             type="text"
             placeholder="Search"
             label={"Search"}
             value={searchQuery}
             onChange={handleSearchChange} 
            />
          </div>
          <div className="RejectSample-results-info">
            <span>
              Showing {filteredSampleData?.length || 0} /{" "}
              {RejectSampleData?.length || 0} results
            </span>
            <button className="RejectSample-print-btn">
              <i className="fa fa-file-excel"></i> Export
            </button>
            <button className="RejectSample-print-btn">
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
                      {test?.labRequest?.labTests?.map((labTest, index) => (
                        <span key={index}>
                          {index > 0 ? " , " : ""}
                          {labTest.labTestName}
                        </span>
                      ))}
                    </td>
                    <td>
                      {test.labRequest?.inPatient?.isIPD?.toLowerCase() ===
                      "ipd"
                        ? "IPD"
                        : "OPD"}
                    </td>
                    <td>normal</td>
                    <td>
                      <button
                        className="RejectSample-viewDetails"
                        onClick={() => confirmationBox(test.sampleCollectionId)} // Pass the row's data
                      >
                        Reject Sample
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {confirmBox && (
        <CustomModel isOpen={confirmBox} onClose={() => setConfirmBox(false)}>
          <div className="RejectSample-confirm">
            <label>Reason : </label>
            <input
              className=""
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <button onClick={() => handleCollectSample(sampleId)}>
              Submit
            </button>
          </div>
        </CustomModel>
      )}
    </>
  );
}

export default RejectSample;
