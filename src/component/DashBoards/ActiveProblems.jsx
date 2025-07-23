import React, { useEffect, useRef, useState } from "react";
import "./Activeproblems.css";
import { Label } from "recharts";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import { FloatingInput, FloatingTextarea } from "../../FloatingInputs";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
const ActiveProblems = ({ patientId, outPatientId }) => {
  const printRef = useRef();
  const formatDateTime = () => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handlePrint = () => {
    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(16);
    doc.text("Medical Problems Report", doc.internal.pageSize.width / 2, 15, {
      align: "center",
    });
    doc.setFontSize(10);
    doc.text(`Generated on: ${formatDateTime()}`, 219, 25);
    const activeProblemsData = activeProblems.map((problem) => [
      problem.searchProblem || "",
      problem.onsetDate || "",
      problem.note || "",
      problem.currentStatus || "",
      problem.isPrincipalProblem ? "✓" : "",
    ]);
    const activeHeaders = [
      "ICD-11 Description",
      "Onset Date",
      "Notes",
      "Current Status",
      "Principal Problem",
    ];
    doc.setFontSize(12);
    doc.text("Active Medical Problems", 14, 35);
    doc.autoTable({
      head: [activeHeaders],
      body: activeProblemsData,
      startY: 40,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [51, 122, 183],
        textColor: 255,
        fontSize: 9,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { left: 14 },
    });
    const firstTableHeight = doc.lastAutoTable.finalY;
    const pastProblemsData = pastProblem.map((problem) => [
      problem.searchProblem || "",
      problem.onSetDate || "",
      problem.resolvedDate || "",
      problem.note || "",
      problem.isPrincipalProblem ? "✓" : "",
    ]);
    const pastHeaders = [
      "ICD-11 Description",
      "Onset Date",
      "Resolved Date",
      "Notes",
      "Principal Problem",
    ];
    doc.setFontSize(12);
    doc.text("Past Medical Problems", 14, firstTableHeight + 15);
    doc.autoTable({
      head: [pastHeaders],
      body: pastProblemsData,
      startY: firstTableHeight + 20,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [51, 122, 183],
        textColor: 255,
        fontSize: 9,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { left: 14 },
    });
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );
    }
    const fileName = "Medical_Problems_Report.pdf";
    doc.save(fileName);
    const pdfOutput = doc.output("bloburl");
    window.open(pdfOutput, "_blank");
  };
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
    searchProblem: "",
    isPrincipalProblem: false,
    currentStatus: "",
    onSetDate: "",
    resolvedDate: "",
    note: "",
    isActive: true,
    addedDate: new Date().toISOString().split("T")[0],
    addedTime: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
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
    setNewPastProblem({});
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
      if (outPatientId) {
        endpoint = `${API_BASE_URL}/active-problems/by-newVisitPatientId/${outPatientId}`;
      } else if (patientId) {
        endpoint = `${API_BASE_URL}/active-problems/by-patientId/${patientId}`;
      }
      if (endpoint) {
        try {
          const response = await fetch(endpoint);
          if (response.ok) {
            const data = await response.json();
            console.log(data,"active");
            setActiveProblems(data);
          } else {
            console.error("Failed to fetch active problems");
          }
        } catch (error) {
          console.error("Error fetching active problems:", error);
        }
      }
    };
    if (outPatientId || patientId) {
      fetchActiveProblems();
    }
  }, [outPatientId, patientId, isAddModalOpen]);
  useEffect(() => {
    const fetchPastProblems = async () => {
      let endpoint = "";
      if (outPatientId) {
        endpoint = `${API_BASE_URL}/past-problem/by-newPatientVisitId?newPatientVisitId=${outPatientId}`;
      } else if (patientId) {
        endpoint = `${API_BASE_URL}/past-problem/by-patientId?patientId=${patientId}`;
      }
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
    if (outPatientId || patientId) {
      fetchPastProblems();
    }
  }, [outPatientId, patientId, isAddPastModalOpen]);
  const handleSubmit = async () => {
    const formData =
      patientId > 0
        ? { ...activeProblem, inPatientDTO: { inPatientId: patientId } }
        : { ...activeProblem, outPatientDTO: { outPatientId } };
    try {
      console.log(formData);
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
        toast.success(
          `${isEditMode ? "Updated" : "Added"} Problem successfully!`
        );
        setActiveProblem({
          searchProblem: "",
          icdCode: "",
          isPrincipalProblem: false,
          currentStatus: "",
          onsetDate: "",
          note: "",
        });
        handleCloseModal();
        setIsEditMode(false);
      } else {
        toast.error(`Failed to ${isEditMode ? "update" : "add"} Problem`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Error ${isEditMode ? "updating" : "submitting"} form`);
    }
  };
  const handleAddPastProblem = async () => {
    const formData =
      patientId > 0
        ? { ...newPastProblem, patientDTO: { inPatientId: patientId } }
        : { ...newPastProblem, outPatientDTO: { outPatientId } };
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
      toast.success("Past Problem Added Successfully");
      handleClosePastModal();
      setNewPastProblem({});
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
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
    setActiveProblem({ ...problem });
    setIsEditMode(true);
    setIsAddModalOpen(true);
  };
  
  

  return (
    <div className="medical-problems-container">
      <div className="active-problem-main">
        <div className="actproblem-table">
          <section className="activeproblems-problems-section">
            <div className="activeproblems-subdiv">
              <label className="activeproblems-sectionh5 ">
                Active Medical Problems
              </label>
              <div className="activeproblems-add-print-btn">
                <button
                  className="activeproblems-add-button"
                  onClick={handlePrint}
                >
                  Print
                </button>
                <button
                  className="activeproblems-add-button"
                  onClick={handleOpenModal}
                >
                  Add
                </button>
              </div>
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
                        <button
                          className="activeproblems-add-button"
                          onClick={() => handleEdit(problem)}
                        >
                          Edit
                        </button>
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="activeproblems-problems-section">
            <div className="activeproblems-subdiv">
              <label className="activeproblems-sectionh5 ">
                Past Medical Problems
              </label>
              <button
                className="activeproblems-add-button"
                onClick={handleOpenPastModal}
              >
                Add
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
                <FloatingInput
                  label={"Search Problem"}
                  type="text"
                  name="searchProblem"
                  value={activeProblem.searchProblem}
                  onChange={handleInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <FloatingInput
                  label={"ICD-11 Code"}
                  type="text"
                  name="icdCode"
                  value={activeProblem.icdCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="activeproblems-form-group-checkBox">
                <label htmlFor="">Principal Problem</label>
                <input
                  type="checkbox"
                  name="isPrincipalProblem"
                  checked={activeProblem.isPrincipalProblem}
                  onChange={handleInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <FloatingInput
                  label={"Current Status"}
                  type="text"
                  name="currentStatus"
                  value={activeProblem.currentStatus}
                  onChange={handleInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <FloatingInput
                  label={"Onset Date"}
                  type="date"
                  name="onsetDate"
                  value={activeProblem.onsetDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <FloatingTextarea
                  label={"Note"}
                  name="note"
                  value={activeProblem.note}
                  onChange={handleInputChange}
                />
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
                <FloatingInput
                  label={"Search Problem"}
                  type="text"
                  name="searchProblem"
                  placeholder="ICD-11"
                  value={newPastProblem.searchProblem}
                  onChange={handlePastInputChange}
                />
              </div>
              <div className="activeproblems-form-group-checkBox">
                <label>Mark if Principal Problem:</label>
                <input
                  type="checkbox"
                  name="isPrincipalProblem"
                  value={newPastProblem.isPrincipalProblem}
                  onChange={handlePastInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <FloatingInput
                  label={"Current Status"}
                  type="text"
                  name="currentStatus"
                  value={newPastProblem.currentStatus}
                  onChange={handlePastInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <FloatingInput
                  label={"OnSet Date"}
                  type="date"
                  name="onSetDate"
                  value={newPastProblem.onSetDate}
                  onChange={handlePastInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <FloatingInput
                  label={"Resolved Date"}
                  type="date"
                  name="resolvedDate"
                  value={newPastProblem.resolvedDate}
                  onChange={handlePastInputChange}
                />
              </div>
              <div className="activeproblems-form-group">
                <FloatingTextarea
                  label={"Note"}
                  name="note"
                  value={newPastProblem.note}
                  onChange={handlePastInputChange}
                />
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
