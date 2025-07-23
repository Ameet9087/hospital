import React, { useState, useRef, useEffect } from "react";
import "../LabSetting/labTestComponents.css";
import LSLabTestAddNLTest from "./lSLabTestAddNLTest";
import LabTestComponentsAddNewLTC from "./labTestComponentsAddNewLTC";

import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import { FloatingInput } from "../../../FloatingInputs";

const LabTestComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [labComponentData, setLabComponentData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState();

  const fetchAllLabComponents = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/lab-components/getAllComponents`
    );
    setLabComponentData(response.data);
  };
  useEffect(() => {
    fetchAllLabComponents();
  }, [showPopup]);

  const handleAddNewLabTestClick = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
    setIsEditing(false); // Reset editing mode
    setEditData(null); // Clear edit data
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term as user types
  };

  const handleEdit = (test) => {
    setIsEditing(true);
    setEditData(test);
    setShowPopup(true); // Show the popup
  };

  const handleDelete = async (testId) => {
    try {
      await axios.delete(`${API_BASE_URL}/lab-components/remove/${testId}`);
      fetchAllLabComponents();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredLabComponents = labComponentData
    ? labComponentData.filter(
        (test) =>
          test.componentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          test.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          test.unit.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="labTestComponents-container">
      <div className="labTestComponents-firstRow">
        <div className="labTestComponents-addBtn">
          <button
            className="labTestComponents-add-button"
            onClick={handleAddNewLabTestClick}
          >
            +Add New Lab Test Component
          </button>
        </div>
      </div>
      {/* <div className="labTestComponents-controls">
        <div className="labTestComponents-date-range">
          <label>
            From:
            <input type="date" defaultValue="2024-08-09" />
          </label>
          <label>
            To:
            <input type="date" defaultValue="2024-08-16" />
          </label>
        </div>
      </div> */}
      <div className="labTestComponents-search-N-result">
        <div className="labTestComponents-search-bar">
          <FloatingInput
           type="text"
           label={"Search"}
           value={searchTerm}
           onChange={handleSearchChange}
          />
        </div>
        <div className="labTestComponents-results-info">
          <span>
            Showing {filteredLabComponents.length} / {labComponentData?.length}{" "}
            results
          </span>
          {/* <button className="labTestComponents-print-button">
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="labTestComponents-print-button">
            <i className="fa-solid fa-print"></i> Print
          </button> */}
        </div>
      </div>
      <div className="table-container" id="table-to-print">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Component Name",
                "Display Name",
                "Unit",
                "Range",
                "Range Description",
                "Method",
                "Control Type",
                "Value Type",
                "Value Lookup",
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
            {filteredLabComponents.length > 0 &&
              filteredLabComponents.map((test, index) => (
                <tr key={index}>
                  <td>{test?.componentName}</td>
                  <td>{test?.displayName}</td>
                  <td>{test?.unit}</td>
                  <td>{test?.componentRange}</td>
                  <td>{test?.rangeDescription}</td>
                  <td>{test?.method}</td>
                  <td>{test?.controlType}</td>
                  <td>{test?.valueType}</td>
                  <td>{test?.valueLookup?.lookupName}</td>
                  <td>
                    <button
                      className="labTestComponents-edit-button"
                      onClick={() => handleEdit(test)}
                    >
                      Edit
                    </button>
                    <button
                      className="labTestComponents-delete-button"
                      onClick={() => handleDelete(test.componentId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showPopup && (
        <div className="labTestComponents-modal">
          <div className="labTestComponents-modal-content">
            <LabTestComponentsAddNewLTC
              onClose={handleClosePopup}
              initialData={isEditing ? editData : null}
              isDataUpdate={isEditing}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LabTestComponent;
