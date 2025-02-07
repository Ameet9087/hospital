import React, { useEffect, useRef, useState } from "react";
import "./ClinicalMedication.css"; // Separate CSS file for uniqueness
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { toast } from "react-toastify";
import { FloatingInput, FloatingSelect, FloatingTextarea } from "../../FloatingInputs";

const ClinicalMedication = ({ patientId, outPatientId }) => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [medicationType, setMedicationType] = useState([]);
  const [medications, setMedications] = useState([]);
  const [medicationList, setMedicationList] = useState([
    {
      type: "", // Initially empty; populate based on form selection
      medicationName: "",
      dose: "",
      route: "mouth",
      frequency: 0,
      lastTaken: "",
      comments: "",
      status: "pending",
      medicationDate: new Date().toLocaleDateString(),
      ...(patientId
        ? { inPatientDTO: { inPatientId: patientId } }
        : { outPatientDTO: { outPatientId } }),
    },
  ]);

  const handleAddClick = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    clearForm();
  };

  // Clear form after submission or cancel
  const clearForm = () => {
    setMedicationList([
      {
        type: "",
        medicationName: "",
        dose: "",
        route: "mouth",
        frequency: 0,
        lastTaken: "",
        comments: "",
        status: "pending",
        medicationDate: new Date().toLocaleDateString(),
        ...(patientId
          ? { patientDTO: { inPatientId: patientId } }
          : { outPatientDTO: { outPatientId } }),
      },
    ]);
  };

  // Handle input change for the form fields
  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setMedicationList((prevList) => {
      const updatedList = [...prevList];
      updatedList[0][field] = value; // Update first medication for simplicity
      return updatedList;
    });
  };

  useEffect(() => {
    const fetchMedications = async () => {
      let endpoint = "";
      if (outPatientId) {
        endpoint = `${API_BASE_URL}/medications/by-opd-id?opdPatientId=${outPatientId}`;
      } else if (patientId) {
        endpoint = `${API_BASE_URL}/medications/by-ipd-id?ipdPatientId= ${patientId}`;
      }
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setMedications(data);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/add-items`)
      .then((response) => {
        setMedicationType(response.data);
      })
      .catch((error) =>
        console.error("Error fetching medication types:", error)
      );
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(medicationList);

      const response = await axios.post(
        `${API_BASE_URL}/medications/save-medication-details`,
        medicationList // Sending the entire formData array as the payload
      );
      toast.success("Success:", response.data);
    } catch (error) {
      toast.error("Error submitting medication list:", error);
    }
  };

  return (
    <div className="clinical-medication-container">
      <div className="clinical-medication-list">
        <div className="clinical-medication-list-header">
          <h3>Medication List</h3>
          <button
            className="clinical-medication-add-new-button"
            onClick={handleAddClick}
          >
            + Add New
          </button>
        </div>
        <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Medication Name",
                "Type",
                "Dose",
                "Route",
                "Last Taken",
                "Frequency",
                "Comments",
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
            {medications.map((medication, index) => (
              <tr key={index}>
                <td>{medication.medicationName}</td>
                <td>{medication.type}</td>
                <td>{medication.dose}</td>
                <td>{medication.route}</td>
                <td>{medication.lastTaken}</td>
                <td>{medication.frequency}</td>
                <td>{medication.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="clinical-medication-add-new-section">
        {showForm && (
          <div className="clinical-add-medication-form">
            <div className="clinical-medication-form-header">
              <h3>Add Medication</h3>
              <button
                className="clinical-medication-close-button"
                onClick={handleCloseForm}
              >
                ✖
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="clinical-medication-form-row">
                <label>Type*:</label>
                <div className="clinical-medication-form-row-subdiv">
                  <input
                    type="checkbox"
                    name="type"
                    onChange={(e) => handleInputChange(e, "type")}
                    value="current"
                  />
                  Current
                  <input
                    type="checkbox"
                    name="type"
                    onChange={(e) => handleInputChange(e, "type")}
                    value="home"
                  />
                  Home
                </div>
              </div>
              <div className="clinical-medication-form-row">
                <FloatingSelect
                  label={"Name"}
                  name="medicationName"
                  onChange={(e) => handleInputChange(e, "medicationName")}
                  required
                  options={[
                    { value: "", label: "" },
                    ...(Array.isArray(medicationType)
                      ? medicationType.map((medication) => ({
                        value: medication.itemName,
                        label: medication.itemName,
                      }))
                      : []),
                  ]}
                />
              </div>
              <div className="clinical-medication-form-row">
                <FloatingInput
                  label={"Dose"}
                  type="text"
                  placeholder="Dose"
                  name="dose"
                  required
                  onChange={(e) => handleInputChange(e, "dose")}
                />
              </div>
              <div className="clinical-medication-form-row">
                <FloatingSelect
                  label={"Route"}
                  required
                  name="route"
                  onChange={(e) => handleInputChange(e, "route")}
                  options={[{ value: "", label: "" },
                  { value: "Oral", label: "Oral" },
                  { value: "Iv", label: "Iv" },
                  { value: "Injection", label: "Injection" }
                  ]}
                />
              </div>
              <div className="clinical-medication-form-row">
                <FloatingInput
                  label={"Frequency"}
                  type="text"
                  placeholder="Frequency"
                  name="frequency"
                  required
                  onChange={(e) => handleInputChange(e, "frequency")}

                />
              </div>
              <div className="clinical-medication-form-row">
                <FloatingInput
                  label={"Last Taken"}
                  type="date"
                  name="lastTaken"
                  required
                  onChange={(e) => handleInputChange(e, "lastTaken")}

                />
              </div>
              <div className="clinical-medication-form-row">
                <FloatingTextarea
                  label={"Comments"}
                  name="comments"
                  onChange={(e) => handleInputChange(e, "comments")}
                />
              </div>
              <button type="submit" className="clinical-medication-add-button">
                Add
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicalMedication;
