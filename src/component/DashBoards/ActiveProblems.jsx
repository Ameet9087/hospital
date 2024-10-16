import React, { useEffect, useRef, useState } from "react";
import "./Activeproblems.css"; // Import the CSS file for styling
import { Label } from "recharts";
import { startResizing } from "../TableHeadingResizing/resizableColumns";
import { API_BASE_URL } from "../api/api";

const ActiveProblems = ({ patientId, newPatientVisitId }) => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeProblems, setActiveProblems] = useState([]);
  const [newProblem, setNewProblem] = useState({});
  const [isAddPastModalOpen, setIsAddPastModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pastProblem, setPastProblem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeProblem, setActiveProblem] = useState({
    searchProblem: "",
    icdCode: "",
    isPrincipalProblem: false,
    currentStatus: "",
    onsetDate: "",
    note: "",
  });
  const [updateProblem, setUpdateProblem] = useState({});
  const [newPastProblem, setNewPastProblem] = useState({
    searchProblem: "", // Search Problem field
    isPrincipalProblem: false, // Principal Problem checkbox
    currentStatus: "", // Current Status field
    onSetDate: "", // OnSet Date field
    resolvedDate: "", // Resolved Date field
    note: "", // Note field
    isActive: true, // Active status (default to true)
    addedDate: new Date().toISOString().split("T")[0], // Current date
    addedTime: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }), // Current time
  });

  const handleOpenModal = () => {
    setIsAddModalOpen(true);
    setIsAddPastModalOpen(false);
  };

  const handleOpenPastModal = () => {
    setIsAddPastModalOpen(true);
    setIsAddModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setNewProblem({});
  };

  const handleClosePastModal = () => {
    setIsAddPastModalOpen(false);
    setNewPastProblem({}); // Clear form data
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setActiveProblem({
      ...activeProblem,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    const fetchActiveProblems = async () => {
      let endpoint = "";

      // Determine which endpoint to use based on available IDs
      if (newPatientVisitId) {
        endpoint = `${API_BASE_URL}/active-problems/by-newVisitPatientId/${newPatientVisitId}`;
      } else if (patientId) {
        endpoint = `${API_BASE_URL}/active-problems/by-patientId/${patientId}`;
      }

      // Fetch data if a valid endpoint is determined
      if (endpoint) {
        try {
          const response = await fetch(endpoint);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setActiveProblems(data);
          } else {
            console.error("Failed to fetch active problems");
          }
        } catch (error) {
          console.error("Error fetching active problems:", error);
        }
      }
    };

    // Only fetch active problems if there is a newPatientVisitId or admissionId
    if (newPatientVisitId || patientId) {
      fetchActiveProblems();
    }
  }, [newPatientVisitId, patientId, isAddModalOpen]); // Dependencies to track ID changes

  useEffect(() => {
    const fetchPastProblems = async () => {
      let endpoint = "";

      // Determine which endpoint to use based on available IDs
      if (newPatientVisitId) {
        endpoint = `${API_BASE_URL}/past-problem/by-newPatientVisitId?newPatientVisitId=${newPatientVisitId}`;
      } else if (patientId) {
        endpoint = `${API_BASE_URL}/past-problem/by-patientId?patientId=${patientId}`;
      }

      // Fetch data if a valid endpoint is determined
      if (endpoint) {
        try {
          const response = await fetch(endpoint);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setPastProblem(data);
          } else {
            console.error("Failed to fetch active problems");
          }
        } catch (error) {
          console.error("Error fetching active problems:", error);
        }
      }
    };

    if (newPatientVisitId || patientId) {
      fetchPastProblems();
    }
  }, [newPatientVisitId, patientId, isAddPastModalOpen]); // Dependencies to track ID changes

  const handleSubmit = async () => {
    const formData =
      patientId > 0
        ? { ...activeProblem, patientDTO: { patientId } }
        : { ...activeProblem, newPatientVisitDTO: { newPatientVisitId } };

    try {
      const response = await fetch(
        `${API_BASE_URL}/active-problems/save-active-problem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert(`${isEditMode ? "Updated" : "Added"} Problem successfully!`);
        setActiveProblem({
          searchProblem: "",
          icdCode: "",
          isPrincipalProblem: false,
          currentStatus: "",
          onsetDate: "",
          note: "",
        });
        handleCloseModal();
        setIsEditMode(false); // Reset edit mode
      } else {
        alert(`Failed to ${isEditMode ? "update" : "add"} Problem`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error ${isEditMode ? "updating" : "submitting"} form`);
    }
  };

  const handleAddPastProblem = async () => {
    const formData =
      patientId > 0
        ? { ...newPastProblem, patientDTO: { patientId } }
        : { ...newPastProblem, newPatientVisitDTO: { newPatientVisitId } };

    try {
      console.log(formData);

      const response = await fetch(`${API_BASE_URL}/past-problem/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add past problem");
      }

      handleClosePastModal(); // Close the modal
      setNewPastProblem({}); // Reset the form
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handlePastInputChange = (e) => {
    setNewPastProblem({
      ...newPastProblem,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleEdit = (problem) => {
    setUpdateProblem({ ...problem });
    setActiveProblem({ ...problem }); // Populate the form with the selected problem data
    setIsEditMode(true); // Set to edit mode
    setIsAddModalOpen(true); // Open the modal for editing
  };

  return (
    <div className="medical-problems-container">
      {/* Active Medical Problems Section */}
      <div className="active-problem-main">
        <div className="actproblem-table">
          <section className="activeproblems-problems-section">
            <div className="activeproblems-subdiv">
              <label className="activeproblems-sectionh5 ">
                Active Medical Problems
              </label>
              <button
                className="activeproblems-add-button"
                onClick={handleOpenModal}
              >
                ➕ Add
              </button>
            </div>
            <div className="table-container">
              <table className="patientList-table" ref={tableRef}>
                <thead>
                  <tr>
                    {[
                      "ICD-11 Description",
                      "Date",
                      "Notes",
                      "Resolved",
                      "Edit",
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
                  {activeProblems.map((problem, index) => (
                    <tr key={index}>
                      <td className="actproblem-tabledata">
                        {problem.searchProblem}
                      </td>
                      <td className="actproblem-tabledata">
                        {problem.onsetDate}
                      </td>
                      <td className="actproblem-tabledata">{problem.note}</td>
                      <td className="actproblem-tabledata">
                        <input
                          type="checkbox"
                          disabled
                          checked={problem.isPrincipalProblem}
                        />
                      </td>
                      <td className="actproblem-tabledata">
                        <button onClick={() => handleEdit(problem)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Past Medical Problems Section */}
          <section className="activeproblems-problems-section">
            <div className="activeproblems-subdiv">
              <label className="activeproblems-sectionh5 ">
                Past Medical Problems
              </label>
              <button
                className="activeproblems-add-button"
                onClick={handleOpenPastModal}
              >
                ➕ Add
              </button>
            </div>
            <div className="table-container">
              <table className="patientList-table" ref={tableRef}>
                <thead>
                  <tr>
                    {[
                      "ICD-11 Description",
                      "On Set Date",
                      "Resolved Date",
                      "Set As Active",
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
                  {pastProblem.map((problem, index) => (
                    <tr key={index}>
                      <td className="actproblem-tabledata">
                        {problem.searchProblem}
                      </td>
                      <td className="actproblem-tabledata">
                        {problem.onSetDate}
                      </td>
                      <td className="actproblem-tabledata">{problem.note}</td>
                      <td className="actproblem-tabledata">
                        <input
                          type="checkbox"
                          disabled
                          checked={problem.isPrincipalProblem}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Modal for Adding Active Problem */}
        {isAddModalOpen && (
          <div className="activeproblems-modal-overlay">
            <div className="activeproblems-modal-content">
              <h4 className="activeproblems-sectionh5">
                {isEditMode ? "Edit Active Problem" : "Add Active Problem"}
              </h4>
              <button
                className="activeproblems-close-button"
                onClick={handleCloseModal}
              >
                ❌
              </button>

              <div className="activeproblems-form-group">
                <label>Search Problem:</label>
                <input
                  type="text"
                  name="searchProblem"
                  value={activeProblem.searchProblem}
                  onChange={handleInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <label>ICD-11 Code:</label>
                <input
                  type="text"
                  name="icdCode"
                  value={activeProblem.icdCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <label>Principal Problem:</label>
                <input
                  type="checkbox"
                  name="isPrincipalProblem"
                  checked={activeProblem.isPrincipalProblem}
                  onChange={handleInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <label>Current Status:</label>
                <input
                  type="text"
                  name="currentStatus"
                  value={activeProblem.currentStatus}
                  onChange={handleInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <label>Onset Date:</label>
                <input
                  type="date"
                  name="onsetDate"
                  value={activeProblem.onsetDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <label>Note:</label>
                <textarea
                  name="note"
                  value={activeProblem.note}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button
                className="activeproblems-add-problem-button"
                onClick={handleSubmit}
              >
                {isEditMode ? "Update Problem" : "Add Problem"}
              </button>
            </div>
          </div>
        )}

        {isAddPastModalOpen && (
          <div className="activeproblems-modal-overlay">
            <div className="activeproblems-modal-content">
              <h4 className="activeproblems-sectionh5">Add Past Problem</h4>
              <button
                className="activeproblems-close-button"
                onClick={handleClosePastModal}
              >
                ❌
              </button>
              <div className="activeproblems-form-group">
                <label>Search Problem*:</label>
                <input
                  type="text"
                  name="searchProblem" // Updated name attribute
                  placeholder="ICD-11"
                  onChange={handlePastInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <label>Mark if Principal Problem:</label>
                <input
                  type="checkbox"
                  name="isPrincipalProblem" // Updated name attribute
                  onChange={handlePastInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <label>Current Status:</label>
                <input
                  type="text"
                  name="currentStatus" // Updated name attribute
                  onChange={handlePastInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <label>OnSet Date*:</label>
                <input
                  type="date"
                  name="onSetDate" // Updated name attribute
                  onChange={handlePastInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <label>Resolved Date:</label>
                <input
                  type="date"
                  name="resolvedDate" // Updated name attribute
                  onChange={handlePastInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <label>Note:</label>
                <textarea
                  name="note" // Updated name attribute
                  onChange={handlePastInputChange}
                ></textarea>
              </div>
              <button
                className="activeproblems-add-problem-button"
                onClick={handleAddPastProblem}
              >
                Add Problem
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveProblems;
