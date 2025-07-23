import React, { useState, useRef, useEffect } from "react";
import "../LabSetting/looksUps.css";
import LabLookUpAddNewLUp from "./labLookUpAddNewLUp";
import LabLookUpUpdateNewLUp from "./LabLookUpUpdateNewLUp";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../../TableHeadingResizing/resizableColumns";
import { FloatingInput } from "../../../FloatingInputs";

const LookUps = () => {
  const [labTests, setLabTests] = useState([]); // State to store fetched lab lookups
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [lookup, setLookUp] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const fetchLabLookups = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lab-lookups/getAll-lookup`
      );
      setLabTests(response.data); // Assuming API response is an array of lab lookups
    } catch (err) {
      setError("Failed to fetch lab lookups. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabLookups();
  }, [showPopup, showUpdatePopup]);

  const handleAddNewLabTestClick = () => {
    setShowPopup(true);
  };

  const handleUpdateNewLabTestClick = (item) => {
    setLookUp(item);
    setShowUpdatePopup(true);
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowUpdatePopup(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/lab-lookups/remove/${id}`);
      fetchLabLookups();
    } catch (error) {
      console.log(error);
    }
  };

  // Filter the lab lookups based on search term
  const filteredLabTests = labTests.filter(
    (test) =>
      test.lookupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.moduleName.toLowerCase().includes(searchTerm.toLowerCase()) // Additional field search
  );

  return (
    <div className="looksUps-container">
      <div className="looksUps-firstRow">
        <div className="looksUps-addBtn">
          <button
            className="looksUps-add-button"
            onClick={handleAddNewLabTestClick}
          >
            + Add New Look-Up
          </button>
        </div>
      </div>

      <div className="looksUps-search-N-result">
       
        <div className="looksUps-search-bar">
        <FloatingInput
          type="text"
          label={"Search"}
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        </div>
        <div className="looksUps-results-info">
          <span>
            Showing {filteredLabTests.length} / {labTests.length} results
          </span>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="looksUps-error">{error}</p>}

      <div className="table-container" id="table-to-print">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Module Name",
                "Look-up Name",
                "Look-up Data",
                "Description",
                "Actions",
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
            {filteredLabTests.length > 0
              ? filteredLabTests.map((test, index) => (
                  <tr key={index}>
                    <td>{test.moduleName}</td>
                    <td>{test.lookupName}</td>
                    <td>{JSON.stringify(test.lookupdata)}</td>{" "}
                    {/* Convert array to string */}
                    <td>{test.description}</td>
                    <td>
                      <button
                        className="looksUps-edit-button"
                        onClick={() => handleUpdateNewLabTestClick(test)}
                      >
                        Edit
                      </button>
                      {/* <button
                        className="looksUps-delete-button"
                        onClick={() => handleDelete(test.labLookupId)}
                      >
                        Delete
                      </button> */}
                    </td>
                  </tr>
                ))
              : !loading && (
                  <tr>
                    <td colSpan="5">No lab lookups available</td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>

      {/* Modal Popup */}
      {showPopup && (
        <div className="looksUps-modal">
          <div className="looksUps-modal-content">
            <LabLookUpAddNewLUp onClose={handleClosePopup} />
          </div>
        </div>
      )}
      {showUpdatePopup && (
        <div className="looksUps-modal">
          <div className="looksUps-modal-content">
            <LabLookUpUpdateNewLUp lookup={lookup} onClose={handleClosePopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LookUps;
