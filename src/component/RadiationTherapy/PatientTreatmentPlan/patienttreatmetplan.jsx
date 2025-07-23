import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./RadiationTherapyPlan.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
const Patienttreatmentplan = () => {
  const [therapyPlans, setTherapyPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const [formData, setFormData] = useState({
    planId: "",
    patientId: "",
    patientName: "",
    treatmentDescription: "",
    startDate: "",
    endDate: "",
    doctorId: "",
    status: "",
  });

  // Fetch all therapy plans when the component loads
  useEffect(() => {
    fetchTherapyPlans();
  }, []);

  const fetchTherapyPlans = async () => {
    try {
      const response = await axios.get("http://localhost:8085/api/treatment-plan");
      console.log(response.data) // Change URL as per your API
      setTherapyPlans(response.data);
    } catch (error) {
      console.error("Error fetching therapy plans:", error);
    }
  };

  const handleModalOpen = (plan = null) => {
    if (plan) {
      setFormData(plan);
      setCurrentPlan(plan.planId);
    } else {
      setFormData({
        planId: "",
        patientId: "",
        patientName: "",
        treatmentDescription: "",
        startDate: "",
        endDate: "",
        doctorId: "",
        status: "",
      });
      setCurrentPlan(null);
    }
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (currentPlan) {
      // Update an existing plan
      try {
        await axios.put(`http://localhost:8085/api/treatment-plan/${currentPlan}`, formData);
        setTherapyPlans(
          therapyPlans.map((plan) =>
            plan.planId === currentPlan ? formData : plan
          )
        );
      } catch (error) {
        console.error("Error updating plan:", error);
      }
    } else {
      // Create a new plan
      try {
        const response = await axios.post("http://localhost:8085/api/treatment-plan", formData);
        setTherapyPlans([...therapyPlans, response.data]);
      } catch (error) {
        console.error("Error creating plan:", error);
      }
    }
    setShowModal(false);
  };

  const handleEdit = (plan) => {
    handleModalOpen(plan);
  };

  const handleDelete = async (planId) => {
    try {
      await axios.delete(`http://localhost:8085/api/treatment-plan/${planId}`);
      setTherapyPlans(therapyPlans.filter((plan) => plan.planId !== planId));
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  return (
    <div className="radiation-therapyplan-container">
      <h2>Radiation Therapy Plans</h2>
      <button onClick={() => handleModalOpen()} className="radiation-therapyplan-add-button">
        Add Plan
      </button>

      <table className="radiation-therapyplan-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Plan ID",
              "Patient ID",
              "Patient Name",
              "Treatment Description",
              "Start Date",
              "End Date",
              "Doctor ID",
              "Status",
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
                    onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                  ></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {therapyPlans.map((plan) => (
            <tr key={plan.planId}>
              <td>{plan.planId}</td>
              <td>{plan.patientId}</td>
              <td>{plan.patientName}</td>
              <td>{plan.treatmentDescription}</td>
              <td>{plan.startDate}</td>
              <td>{plan.endDate}</td>
              <td>{plan.doctorId}</td>
              <td>{plan.status}</td>
              <td>
                <button
                  className="radiation-therapyplan-edit-button"
                  onClick={() => handleEdit(plan)}
                >
                  Edit
                </button>
                <button
                  className="radiation-therapyplan-edit-button"
                  onClick={() => handleDelete(plan.planId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Custom Modal */}
      {showModal && (
        <div className="radiation-therapyplan-modal">
          <div className="radiation-therapyplan-modal-content">
            <span className="radiation-therapyplan-close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>{currentPlan ? "Edit Plan" : "Add Treatment Plan"}</h2>
            <form>
              <div className="radiation-therapyplan-form-group">
                <label>Patient ID</label>
                <input
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                />
              </div>
              <div className="radiation-therapyplan-form-group">
                <label>Patient Name</label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                />
              </div>
              <div className="radiation-therapyplan-form-group">
                <label>Treatment Description</label>
                <textarea
                  name="treatmentDescription"
                  rows="3"
                  value={formData.treatmentDescription}
                  onChange={handleChange}
                />
              </div>
              <div className="radiation-therapyplan-form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
              <div className="radiation-therapyplan-form-group">
                <label>Doctor ID</label>
                <input
                  type="text"
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                />
              </div>
              <div className="radiation-therapyplan-form-group">
                <label>Status</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="radiation-therapyplan-submit-button"
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

export default Patienttreatmentplan;
