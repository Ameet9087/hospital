import React, { useState, useRef, useEffect } from "react";
import Barcode from "react-barcode"; // Import the barcode generator
import "../NavBarSection/addResults.css";
import LabAddResultWorkList from "./labAddresultWorkList";
import { useNavigate } from "react-router-dom";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";

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
      const content = document.getElementById("sticker-content").innerHTML;
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
      link = `${API_BASE_URL}/lab-requests/by-requisition-date-range?startDate=${dateFrom}&endDate=${dateTo}&status=Active`;
    } else {
      const todayDate = getCurrentDate();
      console.log(todayDate);

      link = `${API_BASE_URL}/lab-requests/by-requisition-date-range?startDate=${todayDate}&endDate=${todayDate}&status=Active`;
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
  };
  const handleAddResult = (test) => {
    navigate("/laboratory/addresults/addResultForm", { state: { test } });
  };

  return (
    <div className="addResults-work-list">
      <div className="addResults-header">
        <div className="addResults-controls">
          {/* Your date range and button controls */}
          <div className="addResults-date-range">
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
        <div className="addResults-category-select">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">--Select Lab Category--</option>
            <option value="">
              <input type="checkbox" />
              Select All
            </option>
            <option value="">
              <input type="checkbox" />
              Search
            </option>
            <option value="">
              <input type="checkbox" />
              Biochemistry
            </option>
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
            {/* Add more options here */}
          </select>
        </div>
        
        <div className="addResults-worklist">
          <a href="#" onClick={toggleWorkList}>
            WorkList
          </a>
        </div>
      </div>
      <div className="addResults-searchbar-N-showing">
        <div className="addResults-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search"
            className="addResults-search-input"
          />
        </div>
        <div className="addResults-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="addResults-print-button">
          <i className="fa fa-file-excel"></i> Export
          </button>
          <button className="addResults-print-button">
            <i class="fa-solid fa-print"></i> Print
          </button>
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
            {labTest != null &&
              labTest.map((test, index) => (
                <tr key={test.labRequestId}>
                  <td>{index + 1}</td>
                  <td>
                    {test.inPatientDTO?.firstName ||
                      test.outPatientDTO?.firstName}{" "}
                    {test.inPatientDTO?.lastName ||
                      test.outPatientDTO?.lastName}
                  </td>
                  <td>
                    {test.inPatientDTO?.age || test.outPatientDTO?.age} Y /
                    {test.inPatientDTO?.gender || test.outPatientDTO?.gender}
                  </td>
                  <td>
                    {test.inPatientDTO?.phoneNumber ||
                      test.outPatientDTO?.phoneNumber}
                  </td>
                  <td>{test.labTestName}</td>
                  <td>{test.labTestCategory}</td>
                  <td>
                    {test.inPatientDTO != null ? "InPatient" : "OutPatient"}
                  </td>
                  <td>{test.runNumber}</td>
                  <td>{test.barcode}</td>
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
        {/* <div className="addResults-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
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
                  {stickerData.patientDTO?.firstName ||
                    stickerData.newPatientVisitDTO?.firstName}{" "}
                  {stickerData.patientDTO?.lastName ||
                    stickerData.newPatientVisitDTO?.lastName}
                </p>
                <table>
                  <thead>
                    <th>Test Name</th>
                    <th>Requested On</th>
                    <th>Prescriber Name</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{stickerData.labTestName}</td>
                      <td>{stickerData.requisitionDate}</td>
                      <td>
                        {stickerData.prescriber != null
                          ? stickerData.prescriber?.salutation +
                            stickerData.prescriber?.firstName +
                            " " +
                            stickerData.prescriber?.lastName
                          : "SELF"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="sticker-popup-stickerCreation">
                <div
                  className="sticker-popup-container-sticker"
                  id="sticker-content"
                >
                  <span>
                    {stickerData.patientDTO?.firstName ||
                      stickerData.newPatientVisitDTO?.firstName}{" "}
                    {stickerData.patientDTO?.lastName ||
                      stickerData.newPatientVisitDTO?.lastName}{" "}
                    {stickerData.patientDTO?.age ||
                      stickerData.newPatientVisitDTO?.age}{" "}
                    Y{" / "}
                    {stickerData.patientDTO?.gender ||
                      stickerData.newPatientVisitDTO?.gender}
                  </span>
                  <span>
                    <Barcode
                      height={20}
                      width={2}
                      value={stickerData.barcode}
                    />
                  </span>
                  <span>
                    R/N: {stickerData.runNumber} |{" "}
                    {stickerData.sampleCollectedDate}
                  </span>
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
