import React, { useEffect, useRef, useState } from "react";
import "./ReferralSource.css";
import { startResizing } from "../TableHeadingResizing/resizableColumns";
import { API_BASE_URL } from "../api/api";
import OutPatient from "./OutPatient";

const ReferralSource = ({ patientId, outPatientId }) => {
  const [columnWidths, setColumnWidths] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Manage modal visibility
  const [referralData, setReferralData] = useState([]); // Store fetched referral data
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

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        let endpoint = "";

        // Check if newPatientVisitId or admissionId is present
        if (outPatientId) {
          endpoint = `${API_BASE_URL}/referral-sources/by-newVisitPatientId/${outPatientId}`;
        } else if (patientId) {
          endpoint = `${API_BASE_URL}/referral-sources/by-patientId/${patientId}`;
        }

        // If an endpoint is determined, fetch data
        if (endpoint) {
          const response = await fetch(endpoint);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setReferralData(data); // Store fetched data in state
          } else {
            console.error("Failed to fetch referral data.");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Fetch referral data if newPatientVisitId or admissionId exists
    if (outPatientId || patientId) {
      fetchReferralData();
    }
  }, [patientId, outPatientId, isAddModalOpen]); // Dependencies to re-fetch when IDs change

  const handleOpenModal = () => {
    setIsAddModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false); // Close modal
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit form data to backend
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
        setIsAddModalOpen(false); // Close modal after success
        // Refetch data to update table
        const updatedData = await response.json();
        setReferralData([...referralData, updatedData]); // Add new referral to the data list
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
              <button className="hist-add-button" onClick={handleOpenModal}>
                Add New
              </button>
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

          {/* Modal for adding referral source */}
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
                <div className="hist-form-group">
                  <label>Others:</label>
                  <input
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
