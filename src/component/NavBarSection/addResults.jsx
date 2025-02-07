import React, { useState, useRef, useEffect } from "react";
import Barcode from "react-barcode"; // Import the barcode generator
import "../NavBarSection/addResults.css";
import LabAddResultWorkList from "./labAddresultWorkList";
import { useNavigate } from "react-router-dom";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import { API_BASE_URL } from "../api/api";
import { FloatingInput } from "../../FloatingInputs";

const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};
function AddResults() {
  const [dateFrom, setDateFrom] = useState(getCurrentDate()); // Set initial state to today's date
  const [dateTo, setDateTo] = useState(getCurrentDate());
  const [labTest, setLabTest] = useState(null);
  const [category, setCategory] = useState("");
  const [showWorkList, setShowWorkList] = useState(false);
  const [stickerData, setStickerData] = useState(null); // State to hold sticker data
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [printCount, setPrintCount] = useState(1); // Default to 1 print
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const currentDate = getCurrentDate();
    setDateFrom(currentDate);
    setDateTo(currentDate);
  }, []); // Empty dependency array so it runs only once

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  const handlePrint = () => {
    let stickersContent = "";
    for (let i = 0; i < printCount; i++) {
      const content = document.getElementById("sticker-data").innerHTML;
      stickersContent += `<div style='display:flex; flex-direction:column; align-items:center; border:1px dashed black; margin-bottom: 10px;'>${content}</div>`;
    }

    const printWindow = window.open("", "", "height=600,width=800");

    printWindow.document.write(
      "<html><head><title>Print Sticker</title></head><body>"
    );
    printWindow.document.write(
      "<div style='display:flex; gap:5px; flex-wrap:wrap;'>"
    );
    printWindow.document.write(stickersContent);
    printWindow.document.write("</div>");
    printWindow.document.write("</body></html>");

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const fetchLabResults = () => {
    let link;

    if (dateFrom && dateTo) {
      link = `${API_BASE_URL}/lab-requests/between-date?startDate=${dateFrom}&endDate=${dateTo}&status=Active`;
    } else {
      const todayDate = getCurrentDate();
      console.log(todayDate);

      link = `${API_BASE_URL}/lab-requests/between-date?startDate=${todayDate}&endDate=${todayDate}&status=Active`;
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
        setLabTest(data);
      })
      .catch((err) => {
        console.log("Fetch error: ", err);
      });
  };

  useEffect(() => {
    fetchLabResults(); // Call to fetch lab results when the component mounts or dates change
  }, [dateFrom, dateTo]);

  const navigate = useNavigate();

  const toggleWorkList = () => {
    setShowWorkList(!showWorkList);
  };

  const handleStickerClick = (patientDetails) => {
    // Set sticker data to display in a modal/popup
    setStickerData(patientDetails);
    console.log(patientDetails);
  };
  const handleAddResult = (test) => {
    navigate("/laboratory/addresults/addResultForm", { state: { test } });
  };

  const filteredLabTests = labTest?.filter((test) => {
    const searchLowerCase = searchQuery.toLowerCase();
    return (
      test.inPatient?.patient?.firstName
        .toLowerCase()
        .includes(searchLowerCase) ||
      test.outPatient?.patient?.firstName
        .toLowerCase()
        .includes(searchLowerCase) ||
      test.inPatient?.patient?.lastName
        .toLowerCase()
        .includes(searchLowerCase) ||
      test.outPatient?.patient?.lastName
        .toLowerCase()
        .includes(searchLowerCase) ||
      (test.runNumber && test.runNumber.includes(searchQuery)) ||
      (test.barcode && test.barcode.includes(searchQuery))
    );
  });

  return (
    <div className="addResults-work-list">
      <h6>Add Result</h6>
      <div className="addResults-header">
        <div className="addResults-controls">
          {/* Your date range and button controls */}
          <div className="addResults-date-range">
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
      </div>
      <div className="addResults-searchbar-N-showing">
        <div className="addResults-search-bar">
          <FloatingInput
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          label={"Search"}
          value={searchQuery}
          />
        </div>
        <div className="addResults-results-info">
          <span>
            Showing {filteredLabTests?.length} / {labTest?.length} results
          </span>
        </div>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Sr No",
                "Patient Name",
                "Age/Sex",
                "Phone No",
                "Test Name",
                "Category",
                "Requesting Department",
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
            {filteredLabTests != null &&
              filteredLabTests.map((test, index) => (
                <tr key={test.labRequestId}>
                  <td>{index + 1}</td>
                  <td>
                    {test.inPatient?.patient?.firstName ||
                      test.outPatient?.patient?.firstName}{" "}
                    {test.inPatient?.patient?.lastName ||
                      test.outPatient?.patient?.lastName}
                  </td>
                  <td>
                    {test.inPatient?.patient?.age ||
                      test.outPatient?.patient?.age}{" "}
                    {test.inPatient?.patient?.ageUnit ||
                      test.outPatient?.patient?.ageUnit}{" "}
                    /
                    {test.inPatient?.patient?.gender ||
                      test.outPatient?.patient?.gender}
                  </td>
                  <td>
                    {test.inPatient?.patient?.mobileNumber ||
                      test.outPatient?.patient?.phoneNumber}
                  </td>
                  <td>
                    {test?.labTests?.map((labTest, index) => (
                      <span key={index}>
                        {index > 0 ? " , " : ""}
                        {labTest.labTestName}
                      </span>
                    ))}
                  </td>
                  <td>{test.labTestCategory}</td>
                  <td>{test.inPatient != null ? "InPatient" : "OutPatient"}</td>
                  <td>
                    {test.sampleCollections &&
                      test.sampleCollections.length > 0 &&
                      test.sampleCollections.map((collection, index) => (
                        <span key={index}>
                          {index > 0 ? " , " : ""}
                          {collection.runNumber}
                        </span>
                      ))}
                  </td>
                  <td>
                    {test.sampleCollections &&
                      test.sampleCollections.length > 0 &&
                      test.sampleCollections.map((collection, index) => (
                        <span key={index}>
                          {index > 0 ? " , " : ""}
                          {collection.barcode}
                        </span>
                      ))}
                  </td>

                  <td className="add-result-lab-tableBtn">
                    <button onClick={() => handleAddResult(test)}>
                      Add Result
                    </button>
                    <button onClick={() => handleStickerClick(test)}>
                      Sticker
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showWorkList && (
        <div className="addResults-popup-overlay">
          <div className="addResults-popup-content">
            <LabAddResultWorkList onClose={toggleWorkList} />
          </div>
        </div>
      )}
      {stickerData && (
        <div className="sticker-popup-overlay">
          <div className="sticker-popup-content">
            <h3>Sticker Details</h3>
            <div className="sticker-popup-container">
              <div>
                <p>
                  Patient Name :{" "}
                  {stickerData.outPatient?.patient?.firstName ||
                    stickerData.inPatient?.patient?.firstName}{" "}
                  {stickerData.outPatient?.patient?.lastName ||
                    stickerData.inPatient?.patient?.lastName}
                </p>
                <table>
                  <thead>
                    <th>Test Name</th>
                    <th>Requested On</th>
                    <th>Prescriber Name</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {stickerData?.labTests?.map((labTest, index) => (
                          <span key={index}>
                            {index > 0 ? " , " : ""}
                            {labTest.labTestName}
                          </span>
                        ))}
                      </td>
                      <td>{stickerData.requisitionDate}</td>
                      <td>
                        {stickerData.prescriber != null
                          ? stickerData.prescriber?.salutation +
                          stickerData.prescriber?.doctorName +
                          " " +
                          stickerData.prescriber?.lastName
                          : "SELF"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="sticker-popup-stickerCreation">
                <div id="sticker-data">
                  {stickerData.sampleCollections &&
                    stickerData.sampleCollections.length > 0 &&
                    // We only want to show the first 2 sample collections, if available
                    stickerData.sampleCollections
                      .slice(0, 2)
                      .map((collection, index) => (
                        <div
                          key={index}
                          className="sticker-popup-container-sticker"
                          id={`sticker-content-${index}`}
                        >
                          <span>
                            {stickerData.inPatient?.patient?.firstName ||
                              stickerData.outPatient?.patient?.firstName}{" "}
                            {stickerData.inPatient?.patient?.lastName ||
                              stickerData.outPatient?.patient?.lastName}{" "}
                            {stickerData.inPatient?.patient?.age ||
                              stickerData.outPatient?.patient?.age}{" "}
                            Y /{" "}
                            {stickerData.inPatient?.patient?.gender ||
                              stickerData.outPatient?.patient?.gender}
                          </span>

                          {/* Each sample collection will have its own sticker */}
                          <div className="sticker-content">
                            {/* Display the Barcode for each sample collection */}
                            <span>
                              <Barcode
                                height={20}
                                width={2}
                                value={
                                  collection.barcode || stickerData.barcode
                                }
                              />
                            </span>
                            <span>
                              <center>
                                {collection.runNumber || stickerData.runNumber}{" "}
                                | R/N:{" "}
                                {collection.collectionDate ||
                                  stickerData.collectionDate}
                              </center>
                            </span>
                          </div>
                        </div>
                      ))}
                </div>

                <div className="sticker-print-controls">
                  <label htmlFor="sticker-printCount">Number of Prints: </label>
                  <input
                    type="number"
                    id="printCount"
                    value={printCount}
                    min="1"
                    onChange={(e) => setPrintCount(Number(e.target.value))}
                  />
                  <button className="print-sticker-btn" onClick={handlePrint}>
                    Print
                  </button>
                </div>
              </div>
              {/* Barcode display */}
              <button
                className="close-sticker-btn"
                onClick={() => setStickerData(null)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddResults;
