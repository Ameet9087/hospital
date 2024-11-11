import React, { useState, useRef, useEffect } from "react";
import "../LabSetting/labTest.css";
import LSLabTestAddNLTest from "./lSLabTestAddNLTest";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";

const LabTestSetting = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [labTest, setLabTest] = useState(null);
  useEffect(() => {
    fetch(`${API_BASE_URL}/labTestSetting/getAll`)
      .then((res) => res.json())
      .then((data) => setLabTest(data))
      .catch((err) => {
        console.log(err);
      });
  }, [showPopup]);

  const handleAddNewLabTestClick = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div className="labTestLS-container">
        <div className="labTestLS-addBtn">
          <button
            className="labTestLS-add-button"
            onClick={handleAddNewLabTestClick}
          >
            +Add New Lab Test
          </button>
        </div>
      <div className="labTestLS-firstRow">
        <div className="labTestLS-controls">
          <div className="labTestLS-date-range">
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
        <div className="labTestLS-filters">
          <span>Search Filters: </span>
          <label>
            <input type="checkbox" /> Active
          </label>
          <label>
            <input type="checkbox" /> Inactive
          </label>
          <label>
            <input type="checkbox" /> ALL
          </label>
        </div>
        <div className="labTestLS-category-filter">
          <label>Category: </label>
          <select>
            <option>--All--</option>
            <option>Biochemistry</option>
            <option>Hematology</option>
            <option>Parasitology</option>
            <option>Serology</option>
            <option>Immunoassay</option>
            <option>DEFAULT</option>
            <option>HISTOCYTOLOGY</option>
            <option>OUT SOURCE</option>
            <option>MOLECULAR BIOCHEMISTRY</option>
            <option>PATHOLOGY</option>
            <option>TUMOR MARKER</option>
            <option>VIROLOGY</option>
            <option>SPECIAL CHEMISTRY</option>
            <option>Blood Transfusion</option>

            {/* Add more categories as needed */}
          </select>
        </div>
      </div>
      
      <div className="labTestLS-search-N-result">
        <div className="labTestLS-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="labTestLS-results-info">
          <span>
            Showing {labTest?.length} / {labTest?.length} results
          </span>
          <button className="labTestLS-print-button">
          <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="labTestLS-print-button">
            <i class="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Lab Test Name",
                "Reporting Name",
                "Category",
                "Is Active",
                "Display Sequence",
                // "Action",
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
                  <td>{test?.labTestName}</td>
                  <td>{test?.reportingName}</td>
                  <td>{test?.category}</td>
                  <td>{test?.isActive ? "True" : "False"}</td>
                  <td>{test?.displaySequence}</td>
                  {/* <td>
                  <button
                    className="labTestLS-edit-button"
                    onClick={handleAddNewLabTestClick}
                  >
                    Edit
                  </button>
                  <button className="labTestLS-deactivate-button">
                    Deactivate
                  </button>
                </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* <div className="labTestLS-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      {/* Modal Popup */}
      {showPopup && (
        <div className="labTestLS-modal">
          <div className="labTestLS-modal-content">
            <LSLabTestAddNLTest onClose={handleClosePopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LabTestSetting;
