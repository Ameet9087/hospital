import React, { useEffect, useRef, useState } from "react";
import "./familyhistory.css";
import { startResizing } from "../TableHeadingResizing/resizableColumns";
import { API_BASE_URL } from "../api/api";
import axios from "axios";

const FamilyHistory = ({ patientId, outPatientId }) => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [familyHistories, setFamilyHistories] = useState([]);
  const [newFamilyHistory, setNewFamilyHistory] = useState({});
  const [familyhistory, setFamilyhistory] = useState({
    searchProblem: "",
    relationship: "",
    note: "",
  });

  console.log(newFamilyHistory);

  const [updatefamilyhistory, setUpdateFamilyhistory] = useState({});

  useEffect(() => {
    // Sync the update form values with the selected family history
    if (newFamilyHistory) {
      setUpdateFamilyhistory({
        searchProblem: newFamilyHistory.searchProblem || "",
        relationship: newFamilyHistory.relationship || "",
        note: newFamilyHistory.note || "",
      });
    }
  }, [newFamilyHistory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFamilyhistory({ ...familyhistory, [name]: value });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFamilyhistory({ ...updatefamilyhistory, [name]: value });
  };

  useEffect(() => {
    const fetchFamilyHistories = () => {
      let endpoint = "";

      // Determine if newPatientVisitId or admissionId should be used
      if (outPatientId) {
        endpoint = `${API_BASE_URL}/family-histories/by-newVisitPatientId/${outPatientId}`;
      } else if (patientId) {
        endpoint = `${API_BASE_URL}/family-histories/by-patientId/${patientId}`;
      }

      // Fetch data if a valid endpoint is determined
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              setFamilyHistories(response.data);
              // console.log(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching family histories:", error);
          });
      }
    };

    // Fetch family histories if patient.newPatientVisitId or patient.admissionId exists
    if (outPatientId || patientId) {
      fetchFamilyHistories();
    }
  }, [outPatientId, patientId, isAddModalOpen, isUpdateModalOpen]); // Dependencies to track ID changes

  const handleAddFamilyHistory = async () => {
    const formData =
      patientId > 0
        ? { ...familyhistory, inPatientDTO: { inPatientId: patientId } }
        : { ...familyhistory, outPatientDTO: { outPatientId } };
    console.log(formData);

    try {
      const response = await fetch(
        `${API_BASE_URL}/family-histories/save-family-history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Family History added successfully!");
        setFamilyhistory({
          searchProblem: "",
          relationship: "",
          note: "",
        });
        handleCloseModal();
      } else {
        alert("Failed to add Family History");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    }
  };

  const handleUpdateFamilyHistory = async () => {
    console.log(updatefamilyhistory);
    try {
      const response = await fetch(
        `${API_BASE_URL}/family-histories/update/${newFamilyHistory.familyHistoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatefamilyhistory),
        }
      );

      if (response.ok) {
        alert("Family History added successfully!");
        setFamilyhistory({
          searchProblem: "",
          relationship: "",
          note: "",
        });
        handleCloseModal();
      } else {
        alert("Failed to add Family History");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    }
  };

  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const handleUpdate = (item) => {
    console.log(item);

    setNewFamilyHistory(item);
    setIsUpdateModalOpen(true);
    setIsAddModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="family-history-container">
      {/* Family History Section */}
      <div className="family-history-main">
        <div className="family">
          <section className="family-history-section">
            <div className="family-history-subdiv">
              <label>Family History Problem List</label>
              <button
                className="family-history-add-button"
                onClick={handleOpenModal}
              >
                ➕ Add
              </button>
            </div>
            <table className="patientList-table" ref={tableRef}>
              <thead>
                <tr>
                  {["search problem", "Relationship", "Note", "Edit"].map(
                    (header, index) => (
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
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {familyHistories?.map((history, index) => (
                  <tr key={index}>
                    <td className="family-history-table-data">
                      {history.searchProblem}
                    </td>
                    <td className="family-history-table-data">
                      {history.relationship}
                    </td>
                    <td className="family-history-table-data">
                      {history.note}
                    </td>
                    <td className="family-history-table-data">
                      <button onClick={() => handleUpdate(history)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Modal for Adding Family History */}
          {isAddModalOpen && (
            <div className="family-history-modal-overlay">
              <div className="family-history-modal-content">
                <h6>Add Family History</h6>
                <button
                  className="family-history-close-button"
                  onClick={handleCloseModal}
                >
                  ❌
                </button>
                <div className="family-history-form-group">
                  <label>Search Problem*:</label>
                  <input
                    className="family-history-form-group-input"
                    type="text"
                    name="searchProblem"
                    placeholder="ICD-11"
                    value={familyhistory.searchProblem}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="family-history-form-group">
                  <label>Relationship*:</label>
                  <input
                    className="family-history-form-group-input"
                    type="text"
                    name="relationship"
                    value={familyhistory.relationship}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="family-history-form-group">
                  <label>Note:</label>
                  <textarea
                    className="family-history-form-group-input"
                    name="note"
                    value={familyhistory.note}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button
                  className="family-history-add-button"
                  onClick={handleAddFamilyHistory}
                >
                  Add Family History
                </button>
              </div>
            </div>
          )}

          {isUpdateModalOpen && (
            <div className="family-history-modal-overlay">
              <div className="family-history-modal-content">
                <h6>Update Family History</h6>
                <button
                  className="family-history-close-button"
                  onClick={handleCloseModal}
                >
                  ❌
                </button>
                <div className="family-history-form-group">
                  <label>Search Problem*:</label>
                  <input
                    className="family-history-form-group-input"
                    type="text"
                    name="searchProblem"
                    placeholder="ICD-11"
                    value={updatefamilyhistory.searchProblem}
                    onChange={handleUpdateInputChange}
                  />
                </div>
                <div className="family-history-form-group">
                  <label>Relationship*:</label>
                  <input
                    className="family-history-form-group-input"
                    type="text"
                    name="relationship"
                    value={updatefamilyhistory.relationship}
                    onChange={handleUpdateInputChange}
                  />
                </div>
                <div className="family-history-form-group">
                  <label>Note:</label>
                  <textarea
                    className="family-history-form-group-input"
                    name="note"
                    value={updatefamilyhistory.note}
                    onChange={handleUpdateInputChange}
                  ></textarea>
                </div>
                <button
                  className="family-history-add-button"
                  onClick={handleUpdateFamilyHistory}
                >
                  Update Family History
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyHistory;
