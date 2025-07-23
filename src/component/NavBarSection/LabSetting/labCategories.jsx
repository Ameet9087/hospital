import React, { useState, useRef, useEffect } from "react";
import "../LabSetting/labCategories.css";
import LabCategoryAddNewLC from "./labCategoryAddNewLC";

import LabCategoryUpdateNewLC from "./LabCategoryUpdateNewLC";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { FloatingInput } from "../../../FloatingInputs";

const LabCategories = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [labCategories, setLabCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [labCategory, setLabCategory] = useState({});
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const fetchAllCategories = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/lab-test-categories/getAll-testCategory`
    );
    setLabCategories(response.data);
  };

  useEffect(() => {
    fetchAllCategories();
  }, [showPopup, showUpdatePopup]);

  const handleAddNewLabTestClick = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowUpdatePopup(false);
  };

  const handleUpdateNewLabTestClick = (category) => {
    setLabCategory(category);
    setShowUpdatePopup(true); // Show the popup
    setShowPopup(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/lab-test-categories/remove/${id}`
      );
      fetchAllCategories();
    } catch (error) {
      console.log(error);
    }
  };

  // Filtering logic for the search
  const filteredCategories = labCategories.filter((category) =>
    category.labTestCategoryName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="labCategories-container">
      <div className="labCategories-firstRow">
        <div className="labCategories-addBtn">
          <button
            className="labCategories-add-button"
            onClick={handleAddNewLabTestClick}
          >
            + Add New Lab Categories
          </button>
        </div>
      </div>

      <div className="labCategories-search-N-result">
        <div className="labCategories-search-bar">
          <FloatingInput
          type="text"
          label={"Search"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          
          />
        </div>
        <div className="labCategories-results-info">
          <span>
            Showing {filteredCategories.length} / {labCategories.length} results
          </span>
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Category", "Action"].map((header, index) => (
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
            {filteredCategories.map((category, index) => (
              <tr key={index}>
                <td>{category.labTestCategoryName}</td>

                <td>
                  <button
                    className="labCategories-edit-button"
                    onClick={() => handleUpdateNewLabTestClick(category)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.labTestCategoryId)}
                    className="labCategories-delete-button"
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
        <div className="labCategories-modal">
          <div className="labCategories-modal-content">
            <LabCategoryAddNewLC onClose={handleClosePopup} />
          </div>
        </div>
      )}
      {showUpdatePopup && (
        <div className="labCategories-modal">
          <div className="labCategories-modal-content">
            <LabCategoryUpdateNewLC
              labCategory={labCategory}
              onClose={handleClosePopup}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LabCategories;
