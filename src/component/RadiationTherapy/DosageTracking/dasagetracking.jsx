import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import './DosageTracking.css';
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";

const DosageTracking = () => {
  const [dosagePlans, setDosagePlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const [formData, setFormData] = useState({
    treatmentPlanId: "",
    medicationName: "",
    dosageAmount: "",
    frequency: "",
  });

  // Fetch data from the API when the component loads
  useEffect(() => {
    const fetchDosagePlans = async () => {
      try {
        const response = await axios.get("http://localhost:8085/api/dosage-tracking");
        setDosagePlans(response.data);
      } catch (error) {
        console.error("Error fetching dosage plans:", error);
      }
    };

    fetchDosagePlans();
  }, []);

  const handleModalOpen = (plan = null) => {
    if (plan) {
      setFormData(plan);
      setCurrentPlan(plan.dosageId);
    } else {
      setFormData({
        treatmentPlanId: "",
        medicationName: "",
        dosageAmount: "",
        frequency: "",
      });
      setCurrentPlan(null);
    }
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle adding or updating a dosage plan
  const handleSubmit = async () => {
    try {
      if (currentPlan) {
        // Update existing dosage plan
        await axios.put(`http://localhost:8085/api/dosage-tracking/${currentPlan}`, formData);
        setDosagePlans(
          dosagePlans.map((plan) =>
            plan.dosageId === currentPlan ? formData : plan
          )
        );
      } else {
        // Add new dosage plan
        const response = await axios.post("http://localhost:8085/api/dosage-tracking", formData);
        setDosagePlans([...dosagePlans, response.data]);
      }
    } catch (error) {
      console.error("Error submitting dosage plan:", error);
    }
    setShowModal(false);
  };

  const handleEdit = (plan) => {
    handleModalOpen(plan);
  };

  return (
    <div className="dosage-tracking-container">
      <h2>Dosage Tracking</h2>
      <button onClick={() => handleModalOpen()} className="dosage-tracking-add-button">
        Add Dosage
      </button>

      <table className="dosage-tracking-table" ref={tableRef}>
        <thead>
          <tr>
            {["DosageID", "Treatment Plan ID", "Medication Name", "Dosage Amount", "Frequency", "Actions"].map(
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
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {dosagePlans.map((plan) => (
            <tr key={plan.dosageId}>
              <td>{plan.dosageId}</td>
              <td>{plan.treatmentPlanId}</td>
              <td>{plan.medicationName}</td>
              <td>{plan.dosageAmount}</td>
              <td>{plan.frequency}</td>
              <td>
                <button
                  className="dosage-tracking-edit-button"
                  onClick={() => handleEdit(plan)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Custom Modal */}
      {showModal && (
        <div className="dosage-tracking-modal">
          <div className="dosage-tracking-modal-content">
            <span className="dosage-tracking-close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>{currentPlan ? "Edit Dosage Plan" : "Add Dosage Plan"}</h2>
            <form>
              <div className="dosage-tracking-form-group">
                <label>Treatment Plan ID</label>
                <input
                  type="text"
                  name="treatmentPlanId"
                  value={formData.treatmentPlanId}
                  onChange={handleChange}
                />
              </div>
              <div className="dosage-tracking-form-group">
                <label>Medication Name</label>
                <input
                  type="text"
                  name="medicationName"
                  value={formData.medicationName}
                  onChange={handleChange}
                />
              </div>
              <div className="dosage-tracking-form-group">
                <label>Dosage Amount</label>
                <input
                  type="number"
                  name="dosageAmount"
                  value={formData.dosageAmount}
                  onChange={handleChange}
                />
              </div>
              <div className="dosage-tracking-form-group">
                <label>Frequency</label>
                <input
                  type="text"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="dosage-tracking-submit-button"
                onClick={handleSubmit}
              >
                {currentPlan ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DosageTracking;
