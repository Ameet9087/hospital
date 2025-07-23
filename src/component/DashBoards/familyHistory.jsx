import React, { useEffect, useRef, useState } from "react";
import "./familyhistory.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import axios from "axios";
import { toast } from "react-toastify";
import { FloatingInput, FloatingTextarea } from "../../FloatingInputs";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const FamilyHistory = ({ patientId, outPatientId }) => {
  const formatDateTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handlePrint = () => {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(16);
    doc.text('Family History Report', doc.internal.pageSize.width / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Generated on: ${formatDateTime()}`, 219, 25);
    const tableData = familyHistories.map(history => [
      history.searchProblem || '',
      history.relationship || '',
      history.note || ''
    ]);
    const headers = [
      "Problem",
      "Relationship",
      "Note"
    ];
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 30,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [51, 122, 183],
        textColor: 255,
        fontSize: 9,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { left: 10 }
    });
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
    }
    const fileName = "Family_History_Report.pdf";
    doc.save(fileName);
    const pdfOutput = doc.output('bloburl');
    window.open(pdfOutput, '_blank');
  };
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
      if (outPatientId) {
        endpoint = `${API_BASE_URL}/family-histories/by-newVisitPatientId/${outPatientId}`;
      } else if (patientId) {
        endpoint = `${API_BASE_URL}/family-histories/by-patientId/${patientId}`;
      }
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
        toast.success("Family History added successfully!");
        setFamilyhistory({
          searchProblem: "",
          relationship: "",
          note: "",
        });
        handleCloseModal();
      } else {
        toast.error("Failed to add Family History");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting form");
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
        toast.success("Family History Updated successfully!");
        setFamilyhistory({
          searchProblem: "",
          relationship: "",
          note: "",
        });
        handleCloseModal();
      } else {
        toast.error("Failed to add Family History");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting form");
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
              <div className="family-historyadd-print-btn">
                <button
                  className="family-historyadd-button"
                  onClick={handlePrint}
                >
                  Print
                </button>
                <button
                  className="family-historyadd-button"
                  onClick={handleOpenModal}
                >
                  Add
                </button>
              </div>
            </div>
            <table className="patientList-table" ref={tableRef}>
              <thead>
                <tr>
                  {["search problem", "Relationship", "Note", "Action"].map(
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
                      <button className="family-history-add-button" onClick={() => handleUpdate(history)}>
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
                  <FloatingInput
                    label={"Search Problem"}
                    type="text"
                    name="searchProblem"
                    placeholder="ICD-11"
                    value={familyhistory.searchProblem}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="family-history-form-group">
                  <FloatingInput
                    label={"Relationship"}
                    type="text"
                    name="relationship"
                    value={familyhistory.relationship}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="family-history-form-group">
                  <FloatingTextarea
                    label={"Note"}
                    name="note"
                    value={familyhistory.note}
                    onChange={handleInputChange}
                  />
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
                  <FloatingInput
                    label={"Search Problem"}
                    type="text"
                    name="searchProblem"
                    placeholder="ICD-11"
                    value={updatefamilyhistory.searchProblem}
                    onChange={handleUpdateInputChange}
                  />
                </div>
                <div className="family-history-form-group">
                  <FloatingInput
                    label={"Relationship"}
                    type="text"
                    name="relationship"
                    value={updatefamilyhistory.relationship}
                    onChange={handleUpdateInputChange}
                  />
                </div>
                <div className="family-history-form-group">
                  <FloatingTextarea
                    label={"Note"}
                    name="note"
                    value={updatefamilyhistory.note}
                    onChange={handleUpdateInputChange}
                  />
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
