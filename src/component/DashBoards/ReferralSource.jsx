import React, { useEffect, useRef, useState } from "react";
import "./ReferralSource.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import OutPatient from "./OutPatient";
import { FloatingInput } from "../../FloatingInputs";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const ReferralSource = ({ patientId, outPatientId }) => {
  const [columnWidths, setColumnWidths] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [referralData, setReferralData] = useState([]);
  const [formData, setFormData] = useState({
    newsPaper: false,
    doctor: false,
    radio: false,
    webPage: false,
    staff: false,
    friendsFamily: false,
    tv: false,
    magazine: false,
    unknown: false,
    note: "",
  });

  const tableRef = useRef(null);
  const formatDateTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };
  const handlePrint = () => {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(16);
    doc.text('Referral Source Report', doc.internal.pageSize.width / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Generated on: ${formatDateTime()}`, 219, 25);
    const tableData = referralData.map(referral => [
      referral.newsPaper === "true" ? "Yes" : "No",
      referral.doctor === "true" ? "Yes" : "No",
      referral.radio === "true" ? "Yes" : "No",
      referral.webPage === "true" ? "Yes" : "No",
      referral.staff === "true" ? "Yes" : "No",
      referral.friendsFamily === "true" ? "Yes" : "No",
      referral.tv === "true" ? "Yes" : "No",
      referral.magazine === "true" ? "Yes" : "No",
      referral.unknown === "true" ? "Yes" : "No",
      referral.note || "N/A"
    ]);
    const headers = [
      "Newspaper",
      "Doctor",
      "Radio",
      "Web Page",
      "Staff",
      "Friends & Family",
      "TV",
      "Magazine",
      "Unknown",
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
      columnStyles: {
        9: { cellWidth: 40 }
      },
      didDrawPage: function (data) {
        doc.setFontSize(8);
        doc.text(
          `Page ${doc.internal.getCurrentPageInfo().pageNumber}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
      }
    });
    const fileName = "Referral_Source_Report.pdf";
    doc.save(fileName);
    const pdfOutput = doc.output('bloburl');
    window.open(pdfOutput, '_blank');
  };
  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        let endpoint = "";
        if (outPatientId) {
          endpoint = `${API_BASE_URL}/referral-sources/by-newVisitPatientId/${outPatientId}`;
        } else if (patientId) {
          endpoint = `${API_BASE_URL}/referral-sources/by-patientId/${patientId}`;
        }
        if (endpoint) {
          const response = await fetch(endpoint);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setReferralData(data);
          } else {
            console.error("Failed to fetch referral data.");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (outPatientId || patientId) {
      fetchReferralData();
    }
  }, [patientId, outPatientId, isAddModalOpen]);
  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async () => {
    const referrals =
      patientId > 0
        ? { ...formData, inPatientDTO: { inPatientId: patientId } }
        : { ...formData, outPatientDTO: { outPatientId } };

    try {
      const response = await fetch(
        `${API_BASE_URL}/referral-sources/save-referral-source`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(referrals),
        }
      );

      if (response.ok) {
        console.log("Referral source added successfully!");
        setIsAddModalOpen(false);
        const updatedData = await response.json();
        setReferralData([...referralData, updatedData]);
      } else {
        console.error("Failed to add referral source.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="hist-container">
      <div className="hist-main">
        <div className="hist">
          <div className="hist-section">
            <div className="hist-subdiv">
              <span className="hist-title">Referral Source List</span>

              <div className="referral-source-add-print-btn">
                <button
                  className="referral-source-add-button"
                  onClick={handlePrint}
                >
                  Print
                </button>
                <button
                  className="referral-source-add-button"
                  onClick={handleOpenModal}
                >
                  Add New
                </button>
              </div>
            </div>
            <div className="table-container">
              <table className="patientList-table" ref={tableRef}>
                <thead>
                  <tr>
                    {[
                      "Newspaper",
                      "Doctor",
                      "Radio",
                      "Web Page",
                      "Staff",
                      "Friends and Family",
                      "TV",
                      "Magazine",
                      "Unknown",
                      "Note",
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
                  {referralData.map((referral, index) => (
                    <tr key={index}>
                      <td>{referral.newsPaper === "true" ? "Yes" : "No"}</td>
                      <td>{referral.doctor === "true" ? "Yes" : "No"}</td>
                      <td>{referral.radio === "true" ? "Yes" : "No"}</td>
                      <td>{referral.webPage === "true" ? "Yes" : "No"}</td>
                      <td>{referral.staff === "true" ? "Yes" : "No"}</td>
                      <td>
                        {referral.friendsFamily === "true" ? "Yes" : "No"}
                      </td>
                      <td>{referral.tv === "true" ? "Yes" : "No"}</td>
                      <td>{referral.magazine === "true" ? "Yes" : "No"}</td>
                      <td>{referral.unknown === "true" ? "Yes" : "No"}</td>
                      <td>{referral.note || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {isAddModalOpen && (
            <div className="hist-modal-overlay">
              <div className="hist-modal-content">
                <h6>Add Referral Source</h6>
                <button
                  className="hist-close-button"
                  onClick={handleCloseModal}
                >
                  ❌
                </button>
                <div className="hist-form-group">
                  <label>Newspaper:</label>
                  <input
                    type="checkbox"
                    name="newsPaper"
                    checked={formData.newsPaper}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="hist-form-group">
                  <label>Doctor:</label>
                  <input
                    type="checkbox"
                    name="doctor"
                    checked={formData.doctor}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="hist-form-group">
                  <label>Radio:</label>
                  <input
                    type="checkbox"
                    name="radio"
                    checked={formData.radio}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="hist-form-group">
                  <label>Web Page:</label>
                  <input
                    type="checkbox"
                    name="webPage"
                    checked={formData.webPage}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="hist-form-group">
                  <label>Staff:</label>
                  <input
                    type="checkbox"
                    name="staff"
                    checked={formData.staff}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="hist-form-group">
                  <label>TV:</label>
                  <input
                    type="checkbox"
                    name="tv"
                    checked={formData.tv}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="hist-form-group">
                  <label>Magazine:</label>
                  <input
                    type="checkbox"
                    name="magazine"
                    checked={formData.magazine}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="hist-form-group">
                  <label>unknown:</label>
                  <input
                    type="checkbox"
                    name="unknown"
                    checked={formData.unknown}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="hist-form-group">
                  <label>Friends and Family:</label>
                  <input
                    type="checkbox"
                    name="friendsFamily"
                    checked={formData.friendsFamily}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="hist-form-group-input">
                  <FloatingInput
                    label={"Others"}
                    type="text"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                  />
                </div>

                <button className="hist-add-button" onClick={handleSubmit}>
                  Add Referral Source
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralSource;
