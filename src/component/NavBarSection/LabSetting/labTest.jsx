import React, { useState, useRef, useEffect } from "react";
import "../LabSetting/labTest.css";
import LSLabTestAddNLTest from "./lSLabTestAddNLTest";

import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import { startResizing } from "../../../TableHeadingResizing/resizableColumns";
import { FloatingInput } from "../../../FloatingInputs";

const LabTestSetting = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [labTest, setLabTest] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState();

  // Function to fetch all lab tests
  const fetchAllLabTest = async () => {
    const response = await axios.get(`${API_BASE_URL}/labTestSetting/getAll`);
    setLabTest(response.data);
  };

  // Fetch lab tests on component mount or when popup visibility changes
  useEffect(() => {
    fetchAllLabTest();
  }, [showPopup]);

  // Handle adding new lab test (opens the popup)
  const handleAddNewLabTestClick = () => {
    setShowPopup(true);
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Handle deleting a lab test
  const handleDeleteLabTestClick = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/labTestSetting/${id}`);
      fetchAllLabTest(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting lab test:", error);
    }
  };

  // Filter lab tests based on the search query
  const filteredLabTests = labTest?.filter((test) => {
    return (
      test?.labTestName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test?.reportingName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test?.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleEdit = (data) => {
    setIsEditing(true);
    setShowPopup(true);
    setEditData(data);
    console.log(data);
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
      <div className="labTestLS-search-N-result">
        <div className="labTestLS-search-bar">

          <FloatingInput
          type="text"
          label={"Search"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
          
        </div>
        <div className="labTestLS-results-info">
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
                "Lab Test Name",
                "Reporting Name",
                // "Category",
                "Is Active",
                "Display Sequence",
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
                <tr key={index}>
                  <td>{test?.labTestName}</td>
                  <td>{test?.reportingName}</td>
                  {/* <td>{test?.labTestCategory?.labTestCategoryName}</td> */}
                  <td>{test?.isActive ? "True" : "False"}</td>
                  <td>{test?.displaySequence}</td>
                  <td>
                    <button
                      className="labTestLS-edit-button"
                      onClick={() => handleEdit(test)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteLabTestClick(test?.labTestId)}
                      className="labTestLS-delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Modal Popup */}
      {showPopup && (
        <div className="labTestLS-modal">
          <div className="labTestLS-modal-content">
            <LSLabTestAddNLTest
              onClose={handleClosePopup}
              intialData={editData}
              isDataUpdate={isEditing}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LabTestSetting;
