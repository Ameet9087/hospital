import React, { useEffect, useRef, useState } from "react";
import "./SocialHistory.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import axios from "axios";
import { toast } from "react-toastify";
import { FloatingInput } from "../../FloatingInputs";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SocialHistory = ({ patientId, outPatientId }) => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [socialHistories, setSocialHistories] = useState([]);
  const [socialHistory, setSocialHistory] = useState({});
  const [updateSocialHistory, setUpdateSocialHistory] = useState({});
  const [newSocialHistory, setNewSocialHistory] = useState({
    smokingHistory: "",
    alcoholHistory: "",
    drugHistory: "",
    occupation: "",
    familySupport: "",
    hobby: "",
  });
  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsUpdateModalOpen(false);
  };
  useEffect(() => {
    setUpdateSocialHistory({
      smokingHistory: socialHistory.smokingHistory || "",
      alcoholHistory: socialHistory.alcoholHistory || "",
      drugHistory: socialHistory.drugHistory || "",
      occupation: socialHistory.occupation || "",
      familySupport: socialHistory.familySupport || "",
      hobby: socialHistory.hobby || "",
    });
  }, [socialHistory]);
  useEffect(() => {
    const fetchSocialHistories = () => {
      let endpoint = "";

      if (outPatientId) {
        endpoint = `${API_BASE_URL}/social-histories/by-newVisitPatientId/${outPatientId}`;
      } else if (patientId) {
        endpoint = `${API_BASE_URL}/social-histories/by-patientId/${patientId}`;
      }
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              setSocialHistories(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching social histories:", error);
          });
      }
    };
    fetchSocialHistories();
  }, [patientId, outPatientId, isAddModalOpen, isUpdateModalOpen]);
  const handleAddSocialHistory = async () => {
    const formData =
      patientId > 0
        ? { ...newSocialHistory, inPatientDTO: { inPatientId: patientId } }
        : { ...newSocialHistory, outPatientDTO: { outPatientId } };
    try {
      const response = await fetch(
        `${API_BASE_URL}/social-histories/save-social-history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Social History added successfully!");
        setNewSocialHistory({
          smokingHistory: "",
          alcoholHistory: "",
          drugHistory: "",
          occupation: "",
          familySupport: "",
          hobby: "",
        });
        handleCloseModal();
      } else {
        toast.error("Failed to add Social History");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting form");
    }
  };

  const handleUpdate = (item) => {
    setSocialHistory(item);
    setIsUpdateModalOpen(true);
    setIsAddModalOpen(false);
  };

  const handleUpdateSocialHistory = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/social-histories/update/${socialHistory.socialHistoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateSocialHistory),
        }
      );

      if (response.ok) {
        toast.success("Social History updated successfully!");
        handleCloseModal();
      } else {
        toast.error("Failed to update Social History");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting form");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSocialHistory({ ...newSocialHistory, [name]: value });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateSocialHistory({ ...updateSocialHistory, [name]: value });
  };

  const handlePrint = () => {
    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(16);
    doc.text("Social History Report", doc.internal.pageSize.width / 2, 15, {
      align: "center",
    });
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 219, 25);

    const tableData = socialHistories.map((history) => [
      history.smokingHistory,
      history.alcoholHistory,
      history.drugHistory,
      history.occupation,
      history.familySupport,
      history.hobby,
    ]);

    const headers = [
      "Smoking History",
      "Alcohol History",
      "Drug History",
      "Occupation",
      "Family Support",
      "Hobby",
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
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    const fileName = `Social_History_Report_${patientId || outPatientId}_${new Date()
      .toISOString()
      .split("T")[0]}.pdf`;

    doc.save(fileName);
    const pdfOutput = doc.output("bloburl");
    window.open(pdfOutput, "_blank");
  };

  return (
    <div className="social-history-container">
      <div className="social-history-main">
        <div className="socialhist">
          <section className="social-history-section">
            <div className="social-history-subdiv">
              <label>Social History Problem List</label>
              <div className="social-history-add-print-btn">
                <button
                  className="social-history-add-button"
                  onClick={handlePrint}
                >
                  Print
                </button>
                <button
                  className="social-history-add-button"
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
                    "Smoking History",
                    "Alcohol History",
                    "Drug History",
                    "Occupation",
                    "Family Support",
                    "Hobby",
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
                {socialHistories.map((history, index) => (
                  <tr key={index}>
                    <td>{history.smokingHistory}</td>
                    <td>{history.alcoholHistory}</td>
                    <td>{history.drugHistory}</td>
                    <td>{history.occupation}</td>
                    <td>{history.familySupport}</td>
                    <td>{history.hobby}</td>
                    <td>
                      <button
                        className="social-history-add-button"
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
            <div className="social-history-modal-overlay">
              <div className="social-history-modal-content">
                <h6>Add Social History</h6>
                <button
                  className="social-history-close-button"
                  onClick={handleCloseModal}
                >
                  ❌
                </button>
                <div className="social-history-form-group">
                  <FloatingInput
                    label={"Smoking History"}
                    type="text"
                    name="smokingHistory"
                    value={newSocialHistory.smokingHistory}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="social-history-form-group">
                  <FloatingInput
                    label={"Alcohol History"}
                    type="text"
                    name="alcoholHistory"
                    value={newSocialHistory.alcoholHistory}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="social-history-form-group">
                  <FloatingInput
                    label={"Drug History"}
                    type="text"
                    name="drugHistory"
                    value={newSocialHistory.drugHistory}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="social-history-form-group">
                  <FloatingInput
                    label={"Occupation"}
                    type="text"
                    name="occupation"
                    value={newSocialHistory.occupation}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="social-history-form-group">
                  <FloatingInput
                    label={"Family Support"}
                    type="text"
                    name="familySupport"
                    value={newSocialHistory.familySupport}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="social-history-form-group">
                  <FloatingInput
                    label={"Hobby"}
                    type="text"
                    name="hobby"
                    value={newSocialHistory.hobby}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  className="social-history-add-button"
                  onClick={handleAddSocialHistory}
                >
                  Add Social History
                </button>
              </div>
            </div>
          )}

          {isUpdateModalOpen && (
            <div className="social-history-modal-overlay">
              <div className="social-history-modal-content">
                <h6>Update Social History</h6>
                <button
                  className="social-history-close-button"
                  onClick={handleCloseModal}
                >
                  ❌
                </button>
                <div className="social-history-form-group">
                  <FloatingInput
                    label={"Smoking History"}
                    type="text"
                    name="smokingHistory"
                    value={updateSocialHistory.smokingHistory}
                    onChange={handleUpdateInputChange}
                  />
                </div>
                <div className="social-history-form-group">
                  <FloatingInput
                    label={"Alcohol History"}
                    type="text"
                    name="alcoholHistory"
                    value={updateSocialHistory.alcoholHistory}
                    onChange={handleUpdateInputChange}
                  />
                </div>
                <div className="social-history-form-group">
                  <FloatingInput
                    label={"Drug History"}
                    type="text"
                    name="drugHistory"
                    value={updateSocialHistory.drugHistory}
                    onChange={handleUpdateInputChange}
                  />
                </div>
                <div className="social-history-form-group">
                  <FloatingInput
                    label={"Occupation"}
                    type="text"
                    name="occupation"
                    value={updateSocialHistory.occupation}
                    onChange={handleUpdateInputChange}
                  />
                </div>
                <div className="social-history-form-group">
                  <FloatingInput
                    label={"Family Support"}
                    type="text"
                    name="familySupport"
                    value={updateSocialHistory.familySupport}
                    onChange={handleUpdateInputChange}
                  />
                </div>
                <div className="social-history-form-group">
                  <FloatingInput
                    label={"Hobby"}
                    type="text"
                    name="hobby"
                    value={updateSocialHistory.hobby}
                    onChange={handleUpdateInputChange}
                  />
                </div>
                <button
                  className="social-history-add-button"
                  onClick={handleUpdateSocialHistory}
                >
                  Update Social History
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialHistory;