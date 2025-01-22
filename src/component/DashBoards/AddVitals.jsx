import React, { useEffect, useState } from "react";
import "./AddVitals.css"; // Separate CSS file
import { API_BASE_URL } from "../api/api";
import axios from "axios";
import CustomModal from "../CustomModel/CustomModal";

const Vitals = ({
  patientId,
  outPatientId,
  isFromLeft,
  isVisible,
  setShowVitals,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [latestVitals, setLatestVitals] = useState(null);
  const [vitalData, setVitalData] = useState({
    addedOn: "",
    height: "",
    weight: "",
    bmi: "",
    temperature: "",
    pulse: "",
    bpSystolic: "",
    bpDiastolic: "",
    respiratoryRate: "",
    spO2: "",
    o2DeliveryPlan: "",
    painScale: "",
  });

  useEffect(() => {
    const fetchVitals = () => {
      let endpoint = "";
      // Determine which endpoint to use based on available IDs
      if (outPatientId) {
        endpoint = `${API_BASE_URL}/doc-vitals/get-by-opd-patient-id/${outPatientId}`;
      } else if (patientId) {
        endpoint = `${API_BASE_URL}/doc-vitals/get-by-in-patient-id/${patientId}`;
      }
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              setLatestVitals(response.data);
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching vitals:", error);
          });
      }
    };

    if (outPatientId || patientId) {
      fetchVitals();
    }
  }, [outPatientId, patientId, showForm]); // Dependencies to track ID changes

  const handleAddVitals = () => {
    setShowForm(true); // Show form when "Add Vitals" button is clicked
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form state
    setVitalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // If height or weight changes, calculate BMI
    if (name === "height" || name === "weight") {
      const newBMI = calculateBMI(
        name === "height" ? value : vitalData.height,
        name === "weight" ? value : vitalData.weight
      );

      // Set the calculated BMI value
      setVitalData((prevState) => ({
        ...prevState,
        bmi: newBMI,
      }));
    }
  };

  const calculateBMI = (height, weight) => {
    const heightInMeters = height / 100; // Convert height from cm to meters
    if (heightInMeters > 0 && weight > 0) {
      return (weight / (heightInMeters * heightInMeters)).toFixed(1); // BMI formula
    }
    return "";
  };

  const handleSave = async () => {
    const formData =
      patientId > 0
        ? { ...vitalData, patientDTO: { inPatientId: patientId } }
        : { ...vitalData, outPatientDTO: { outPatientId } };
    try {
      console.log(formData);

      const response = await fetch(`${API_BASE_URL}/doc-vitals/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Vitals saved successfully");
        setShowForm(false);
        // Clear the form after successful submission
        setVitalData({
          addedOn: "",
          height: "",
          weight: "",
          bmi: "",
          temperature: "",
          pulse: "",
          bpSystolic: "",
          bpDiastolic: "",
          respiratoryRate: "",
          spO2: "",
          o2DeliveryPlan: "",
          painScale: "",
        });
      } else {
        alert("Failed to save vitals");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={`vitals-container`}>
      <div></div>
      <div className="vitals-content">
        <div className="vitals-list">
          <div className="vital-sub-div">
            <h3>Vitals List</h3>
            <button className="add-vitals-button" onClick={handleAddVitals}>
              + New Vitals
            </button>
          </div>
          {/* <div className="vitals-tableRecord"> */}
          <table className="vitals-table">
            <thead>
              <tr>
                <th className="vitals-td">Recorded On</th>
                {Array.isArray(latestVitals) && latestVitals.length > 0 ? (
                  latestVitals
                    .sort((a, b) => new Date(b?.addedOn) - new Date(a?.addedOn))
                    .slice(0, 3)
                    .map((vital, index) => (
                      <th key={index} className="vitals-td">
                        {new Date(vital?.addedOn).toLocaleString()}
                      </th>
                    ))
                ) : (
                  <th className="vitals-td">No data available</th>
                )}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Height", key: "height", unit: "cm" },
                { label: "Weight", key: "weight", unit: "kg" },
                { label: "BMI", key: "bmi" },
                { label: "Temperature", key: "temperature", unit: "°C" },
                { label: "Pulse", key: "pulse", unit: "bpm" },
                { label: "Blood Pressure", key: "bp" },
                {
                  label: "Respiratory Rate",
                  key: "respiratoryRate",
                  unit: "breaths/min",
                },
                { label: "SpO2", key: "spO2", unit: "%" },
                { label: "O2 Delivery Method", key: "o2DeliveryPlan" },
                { label: "Pain Scale", key: "painScale" },
              ].map((row, index) => (
                <tr key={index}>
                  <td className="vitals-td">{row.label}</td>
                  {Array.isArray(latestVitals) && latestVitals.length > 0 ? (
                    latestVitals
                      .sort(
                        (a, b) => new Date(b?.addedOn) - new Date(a?.addedOn)
                      )
                      .slice(0, 3)
                      .map((vital, i) => (
                        <td key={i} className="vitals-td">
                          {row.key === "bp"
                            ? `${vital?.bpSystolic}/${vital?.bpDiastolic} mmHg`
                            : `${vital?.[row.key]} ${row.unit || ""}`}
                        </td>
                      ))
                  ) : (
                    <td className="vitals-td">No data</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="vital-action-buttons">
          {/* <button className="vital-edit-button" onClick={handleEdit(latestVitals)} >Edit</button> */}
          {/* <button className="vital-print-button">Print</button> */}
        </div>
      </div>

      <div className="add-vitals-section">
        {showForm && (
          <CustomModal isOpen={showForm} onClose={() => setShowForm(false)}>
            <div className="vitals-add-container">
              <div className="vitals-form-content">
                <div className="vitals-form">
                  <div className="vitals-form-header">
                    <h3>Add New Vitals</h3>
                  </div>
                  <form>
                    <div className="vitals-form-form-row">
                      <label>Added On:</label>
                      <input
                        className="vitals-form-form-row-input"
                        type="date"
                        name="addedOn"
                        value={vitalData.addedOn}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <label>Height (cm):</label>
                      <input
                        className="vitals-form-form-row-input"
                        type="number"
                        name="height"
                        placeholder="cm"
                        value={vitalData.height}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <label>Weight (kg):</label>
                      <input
                        className="vitals-form-form-row-input"
                        type="number"
                        name="weight"
                        placeholder="Kg"
                        value={vitalData.weight}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <label>BMI:</label>
                      <input
                        className="vitals-form-form-row-input"
                        type="number"
                        name="bmi"
                        value={vitalData.bmi}
                        readOnly
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <label>Temperature:</label>
                      <input
                        className="vitals-form-form-row-input"
                        type="number"
                        name="temperature"
                        value={vitalData.temperature}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <label>Pulse:</label>
                      <input
                        className="vitals-form-form-row-input"
                        type="number"
                        name="pulse"
                        value={vitalData.pulse}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <label>Blood Pressure:</label>
                      <div className="vitals-form-form-row-input">
                        <input
                          className="vitals-form-form-row-input"
                          type="number"
                          name="bpSystolic"
                          placeholder="BP Systolic"
                          value={vitalData.bpSystolic}
                          onChange={handleInputChange}
                        />
                        <input
                          className="vitals-form-form-row-input"
                          type="number"
                          name="bpDiastolic"
                          placeholder="BP Diastolic"
                          value={vitalData.bpDiastolic}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="vitals-form-form-row">
                      <label>Respiratory Rate:</label>
                      <input
                        className="vitals-form-form-row-input"
                        type="number"
                        name="respiratoryRate"
                        value={vitalData.respiratoryRate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <label>SpO₂:</label>
                      <input
                        className="vitals-form-form-row-input"
                        type="number"
                        name="spO2"
                        value={vitalData.spO2}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <label>O₂ Delivery Plan:</label>
                      <input
                        className="vitals-form-form-row-input"
                        type="text"
                        name="o2DeliveryPlan"
                        value={vitalData.o2DeliveryPlan}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <label>Pain Scale (/10):</label>
                      <input
                        className="vitals-form-form-row-input"
                        type="number"
                        name="painScale"
                        value={vitalData.painScale}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="vitals-form-button">
                      <button
                        type="button"
                        className="vitals-form-save-button"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </CustomModal>
        )}
      </div>
    </div>
  );
};

export default Vitals;
