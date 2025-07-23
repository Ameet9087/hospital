
import React, { useEffect, useRef, useState } from "react";
import "./SurgicalHistory.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import axios from "axios";
import { toast } from "react-toastify";
import { FloatingInput, FloatingTextarea } from "../../FloatingInputs";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SurgicalHistory = ({ patientId, outPatientId }) => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [surgicalHistories, setSurgicalHistories] = useState([]);
  const [newSurgicalHistory, setNewSurgicalHistory] = useState({});
  const [updateSurgicalHistory, setUpdateSurgicalHistory] = useState({});
  const [formData, setFormData] = useState({
    surgeryType: "",
    searchProblem: "",
    surgeryDate: "",
    note: "",
  });

  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsUpdateModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setUpdateSurgicalHistory({
      surgeryType: newSurgicalHistory.surgeryType || "",
      searchProblem: newSurgicalHistory.searchProblem || "",
      surgeryDate: newSurgicalHistory.surgeryDate || "",
      note: newSurgicalHistory.note || "",
    });
  }, [newSurgicalHistory]);

  useEffect(() => {
    const fetchSurgicalHistories = () => {
      let endpoint = "";

      if (outPatientId) {
        endpoint = `${API_BASE_URL}/surgical-histories/by-newVisitPatientId/${outPatientId}`;
      } else if (patientId) {
        endpoint = `${API_BASE_URL}/surgical-histories/by-patientId/${patientId}`;
      }

      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              setSurgicalHistories(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching surgical histories:", error);
          });
      }
    };

    fetchSurgicalHistories();
  }, [patientId, outPatientId, isUpdateModalOpen, isAddModalOpen]);

  const handleAddSurgicalHistory = async () => {
    const Surgical =
      patientId > 0
        ? { ...formData, inPatientDTO: { inPatientId: patientId } }
        : { ...formData, outPatientDTO: { outPatientId } };
    try {
      const response = await fetch(
        `${API_BASE_URL}/surgical-histories/save-surgical-history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Surgical),
        }
      );

      if (response.ok) {
        toast.success("Surgical History added successfully!");
        setFormData({
          surgeryType: "",
          searchProblem: "",
          surgeryDate: "",
          note: "",
        });
        handleCloseModal();
      } else {
        toast.error("Failed to add Surgical History");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting form");
    }
  };

  const handleUpdateSurgicalHistory = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/surgical-histories/update/${newSurgicalHistory.surgicalHistoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateSurgicalHistory),
        }
      );

      if (response.ok) {
        toast.success("Surgical History updated successfully!");
        handleCloseModal();
      } else {
        toast.error("Failed to update Surgical History");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting form");
    }
  };

  const handleUpdate = (item) => {
    setNewSurgicalHistory(item);
    setIsUpdateModalOpen(true);
    setIsAddModalOpen(false);
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateSurgicalHistory({ ...updateSurgicalHistory, [name]: value });
  };

  const handlePrint = () => {
    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(16);
    doc.text("Surgical History Report", doc.internal.pageSize.width / 2, 15, {
      align: "center",
    });
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 219, 25);

    const tableData = surgicalHistories.map((history) => [
      history.surgeryType,
      history.searchProblem,
      history.surgeryDate,
      history.note,
    ]);

    const headers = ["Surgery Type", "ICD-11 Description", "Surgery Date", "Note"];

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
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });
    const fileName = "Surgical_History_Report.pdf";
    doc.save(fileName);
    const pdfOutput = doc.output("bloburl");
    window.open(pdfOutput, "_blank");
  };

  return (
    <div className="surgical-history-container">
      <div className="surgical-history-main">
        <div className="surgicalhist">
          <section className="surgical-history-section">
            <div className="surgical-history-subdiv">
              <label>Surgical History List</label>
              <div className="surgical-historyadd-print-btn">
                <button
                  className="surgical-history-add-button"
                  onClick={handlePrint}
                >
                  Print
                </button>
                <button
                  className="surgical-history-add-button"
                  onClick={handleOpenModal}
                >
                  Add
                </button>
              </div>
            </div>
            <table className="patientList-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Surgery Type",
                    "ICD-11 Description",
                    "Surgery Date",
                    "Note",
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
                          onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                        ></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {surgicalHistories.map((history, index) => (
                  <tr key={index}>
                    <td className="surgical-history-table-data">
                      {history.surgeryType}
                    </td>
                    <td>{history.searchProblem}</td>
                    <td>{history.surgeryDate}</td>
                    <td>{history.note}</td>
                    <td>
                      <button
                        className="surgical-history-add-button"
                        onClick={() => handleUpdate(history)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {isAddModalOpen && (
            <div className="surgical-history-modal-overlay">
              <div className="surgical-history-modal-content">
                <h6>Add Surgical History</h6>
                <button
                  className="surgical-history-close-button"
                  onClick={handleCloseModal}
                >
                  ❌
                </button>
                <div className="surgical-history-form-group">
                  <FloatingInput
                    label={"Surgery Type"}
                    type="text"
                    name="surgeryType"
                    placeholder="Surgery Type"
                    value={formData.surgeryType}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="surgical-history-form-group">
                  <FloatingInput
                    label={"ICD-11 Description"}
                    type="text"
                    name="searchProblem"
                    placeholder="ICD-11 Description"
                    value={formData.searchProblem}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="surgical-history-form-group">
                  <FloatingInput
                    label={"Surgery Date"}
                    type="date"
                    name="surgeryDate"
                    value={formData.surgeryDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="surgical-history-form-group">
                  <FloatingTextarea
                    label={"Note"}
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  className="surgical-history-add-button"
                  onClick={handleAddSurgicalHistory}
                >
                  Add Surgical History
                </button>
              </div>
            </div>
          )}

          {isUpdateModalOpen && (
            <div className="surgical-history-modal-overlay">
              <div className="surgical-history-modal-content">
                <h6>Update Surgical History</h6>
                <button
                  className="surgical-history-close-button"
                  onClick={handleCloseModal}
                >
                  ❌
                </button>
                <div className="surgical-history-form-group">
                  <FloatingInput
                    label={"Surgery Type"}
                    type="text"
                    name="surgeryType"
                    placeholder="Surgery Type"
                    value={updateSurgicalHistory.surgeryType}
                    onChange={handleUpdateInputChange}
                  />
                </div>
                <div className="surgical-history-form-group">
                  <FloatingInput
                    label={"ICD-11 Description"}
                    type="text"
                    name="searchProblem"
                    placeholder="ICD-11 Description"
                    value={updateSurgicalHistory.searchProblem}
                    onChange={handleUpdateInputChange}
                  />
                </div>
                <div className="surgical-history-form-group">
                  <FloatingInput
                    label={"Surgery Date"}
                    type="date"
                    name="surgeryDate"
                    value={updateSurgicalHistory.surgeryDate}
                    onChange={handleUpdateInputChange}
                  />
                </div>
                <div className="surgical-history-form-group">
                  <FloatingTextarea
                    label={"Note"}
                    name="note"
                    value={updateSurgicalHistory.note}
                    onChange={handleUpdateInputChange}
                  />
                </div>
                <button
                  className="surgical-history-add-button"
                  onClick={handleUpdateSurgicalHistory}
                >
                  Update Surgical History
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurgicalHistory;