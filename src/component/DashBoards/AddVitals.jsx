import React, { useEffect, useState } from "react";
import "./AddVitals.css"; // Separate CSS file
import { API_BASE_URL } from "../api/api";
import axios from "axios";

const Vitals = ({ patientId, outPatientId }) => {
  const [showForm, setShowForm] = useState(false);
  const [vitalsData, setVitalsData] = useState([]);
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

      // Fetch data if a valid endpoint is determined
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              setLatestVitals(response.data[response.data.length - 1]);
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

  // const handleEdit=(selectedVital)=>{

  // }

  return (
    <div className="vitals-container">
      <div className="vitals-list">
        <div className="vital-sub-div">
          <h3>Vitals List</h3>
          <button className="add-vitals-button" onClick={handleAddVitals}>
            + New Vitals
          </button>
        </div>
        {latestVitals ? (
          <div className="Patient-Dashboard-tableRecord">
            <table className="Patient-Dashboard-patient-table">
              <tr>
                <td className="Patient-Dashboard-td">Recoreded On</td>
                <td className="Patient-Dashboard-td">
                  {new Date(latestVitals?.addedOn).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="Patient-Dashboard-td">Height</td>
                <td className="Patient-Dashboard-td">
                  {" "}
                  {latestVitals?.height} cm
                </td>
              </tr>
              <tr>
                <td className="Patient-Dashboard-td">Weight</td>
                <td className="Patient-Dashboard-td">
                  {latestVitals?.weight}kg
                </td>
              </tr>
              <tr>
                <td className="Patient-Dashboard-td">BMI</td>
                <td className="Patient-Dashboard-td">{latestVitals?.bmi}</td>
              </tr>
              <tr>
                <td className="Patient-Dashboard-td">Temprature</td>
                <td className="Patient-Dashboard-td">
                  {latestVitals?.temperature} °C
                </td>
              </tr>
              <tr>
                <td className="Patient-Dashboard-td">Pulse</td>
                <td className="Patient-Dashboard-td">
                  {latestVitals?.pulse} bpm
                </td>
              </tr>
              <tr>
                <td className="Patient-Dashboard-td">Blood Pressure</td>
                <td className="Patient-Dashboard-td">
                  {" "}
                  {latestVitals?.bpSystolic}/{latestVitals?.bpDiastolic} mmHg
                </td>
              </tr>
              <tr>
                <td className="Patient-Dashboard-td">Respiratory Rate</td>
                <td className="Patient-Dashboard-td">
                  {latestVitals?.respiratoryRate} breaths/min
                </td>
              </tr>
              <tr>
                <td className="Patient-Dashboard-td">SpO2</td>
                <td className="Patient-Dashboard-td">
                  {" "}
                  {latestVitals?.spO2} %
                </td>
              </tr>
              <tr>
                <td className="Patient-Dashboard-td">O2 Deliver Method</td>
                <td className="Patient-Dashboard-td">
                  {" "}
                  {latestVitals?.o2DeliveryPlan}
                </td>
              </tr>
              <tr>
                <td className="Patient-Dashboard-td">Pain Scale</td>
                <td className="Patient-Dashboard-td">
                  {latestVitals?.painScale}
                </td>
              </tr>
            </table>
          </div>
        ) : (
          <ul>{/* Empty ul to show no data */}</ul>
        )}
        <div className="vital-action-buttons">
          {/* <button className="vital-edit-button" onClick={handleEdit(latestVitals)} >Edit</button> */}
          {/* <button className="vital-print-button">Print</button> */}
        </div>
      </div>

      <div className="add-vitals-section">
        {showForm && (
          <div className="vitals-form">
            <div className="vitals-form-header">
              <h3>Add New Vitals</h3>
              <button
                className="vitals-form-header-close"
                onClick={() => setShowForm(!showForm)}
              >
                X
              </button>
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

              <button
                type="button"
                className="vitals-form-save-button"
                onClick={handleSave}
              >
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vitals;
