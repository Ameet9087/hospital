/* prachi parab user interface changed  14/9 */

import React, { useState, useEffect, useRef } from "react";
import "./OpdTriagePage.css";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import NursingCustomModal from "./NursingCustomModal";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../CustomModel/CustomModal";

function OPDTriagePage({ onClose, data }) {
  console.log(data);

  const [isTriageModalOpen, setIsTriageModalOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [latestVitals, setLatestVitals] = useState(null);
  const [chiefComplaint, setChiefComplaint] = useState("");

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

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [showAllergyForm, setShowAllergyForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [allergies, setAllergies] = useState(null);
  const [allergy, setAllergy] = useState({});
  const [updateAllergy, setUpdateAllergy] = useState({});
  const [formData, setFormData] = useState({
    recordedDate: new Date().toLocaleDateString(),
    typeOfAllergy: "",
    severity: "",
    verified: null,
    reaction: "",
    comments: "",
  });

  useEffect(() => {
    setUpdateAllergy({
      recordedDate: new Date().toLocaleDateString(),
      typeOfAllergy: allergy.typeOfAllergy || "",
      severity: allergy.severity || "",
      verified: allergy.verified || "",
      reaction: allergy.reaction || "",
      comments: allergy.comments || "",
    });
  }, [allergy]);

  const handleAddNew = () => {
    setShowAllergyForm(true);
  };

  const handleCloseForm = () => {
    setShowAllergyForm(false);
    setShowUpdateForm(false);
  };
  // Handle radio input for type of allergy
  const handleTypeOfAllergyChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      typeOfAllergy: value,
    }));
  };

  useEffect(() => {
    const fetchAllergies = () => {
      let endpoint = "";

      // Determine if newPatientVisitId or admissionId should be used
      if (data.outPatient?.outPatientId) {
        endpoint = `${API_BASE_URL}/allergies/by-newVisitPatientId/${data.outPatient?.outPatientId}`;
      } else if (data.inPatientId) {
        endpoint = `${API_BASE_URL}/allergies/by-patientId/${data.inPatientId}`;
      }

      // Fetch data if a valid endpoint is determined
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              setAllergies(response.data);
              // console.log(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching allergies:", error);
          });
      }
    };

    if (data.outPatient?.outPatientId || data.inPatientId) {
      fetchAllergies();
    }
  }, [
    data.outPatient?.outPatientId,
    data.inPatientId,
    showAllergyForm,
    showUpdateForm,
  ]); // Dependencies to track ID changes

  // Handle radio input for severity
  const handleSeverityChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      severity: value,
    }));
  };

  // Handle verified radio buttons
  const handleVerifiedChange = (e) => {
    const value = e.target.value === "true";
    setFormData((prevData) => ({
      ...prevData,
      verified: value,
    }));
  };

  // Handle text input fields
  const handleInputAllergyChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateTypeOfAllergyChange = (e) => {
    const { value } = e.target;
    setUpdateAllergy((prevData) => ({
      ...prevData,
      typeOfAllergy: value,
    }));
  };

  const handleUpdateSeverityChange = (e) => {
    const { value } = e.target;
    setUpdateAllergy((prevData) => ({
      ...prevData,
      severity: value,
    }));
  };

  const handleUpdateVerifiedChange = (e) => {
    const value = e.target.value === "true";
    setUpdateAllergy((prevData) => ({
      ...prevData,
      verified: value,
    }));
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateAllergy((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const allergy =
      data.inPatientId > 0
        ? { ...formData, patientDTO: { inPatientId: data.inPatientId } }
        : {
          ...formData,
          outPatientDTO: { outPatientId: data.outPatient?.outPatientId },
        };
    try {
      const response = await fetch(`${API_BASE_URL}/allergies/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allergy),
      });

      if (response.ok) {
        alert("Allergy added successfully!");
        setShowAllergyForm(false);
        setFormData({
          typeOfAllergy: "",
          severity: "",
          verified: null,
          reaction: "",
          comments: "",
        });
      } else {
        alert("Failed to add allergy");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_BASE_URL}/allergies/update/${allergy.allergiesId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateAllergy),
        }
      );

      if (response.ok) {
        alert("Allergy added successfully!");
        setShowUpdateForm(false);
        setFormData({
          typeOfAllergy: "",
          severity: "",
          verified: null,
          reaction: "",
          comments: "",
        });
      } else {
        alert("Failed to add allergy");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    }
  };

  const updateAllergies = (allergies) => {
    console.log(allergies);

    setAllergy(allergies);
    setShowUpdateForm(true);
  };

  const closeTriAgeModal = () => {
    setIsTriageModalOpen(false);
    onClose();
  };

  useEffect(() => {
    const fetchVitals = () => {
      let endpoint = "";
      if (data.outPatient?.outPatientId) {
        endpoint = `${API_BASE_URL}/doc-vitals/get-by-opd-patient-id/${data.outPatient?.outPatientId}`;
      } else if (data.inPatientId) {
        endpoint = `${API_BASE_URL}/doc-vitals/get-by-in-patient-id/${data.inPatientId}`;
      }

      // If an endpoint is determined, make the API call
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              // Set the latest vitals
              setLatestVitals(response.data[response.data.length - 1]);
              console.log(response.data[response.data.length - 1]);
            }
          })
          .catch((error) => {
            console.error("Error fetching vitals:", error);
          });
      }
    };

    fetchVitals();
  }, [data.outPatient?.outPatientId, showForm]);

  const handleAddVitals = () => {
    setShowForm(true); // Show form when "Add Vitals" button is clicked
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (parseFloat(value) < 0) {
      alert(`${name} should be greater than zero.`);
      return;
    }
    // Update the form state
    setVitalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "height" || name === "weight") {
      const newBMI = calculateBMI(
        name === "height" ? value : vitalData.height,
        name === "weight" ? value : vitalData.weight
      );
      setVitalData((prevState) => ({
        ...prevState,
        bmi: newBMI,
      }));
    }
  };
  const calculateBMI = (height, weight) => {
    const heightInMeters = height / 100;
    if (heightInMeters > 0 && weight > 0) {
      return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return "";
  };
  const handleSave = async () => {
    const formData =
      data.patientId > 0
        ? { ...vitalData, patientDTO: { patientId: data.inpatientId } }
        : {
          ...vitalData,
          outPatientDTO: { outPatientId: data.outPatient?.outPatientId },
        };
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
        alert("Vitals saved successfully!"); // Success alert
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
  const vitalsData = [
    {
      addedOn: "",
      height: "",
      weight: "",
      bmi: "",
      temperature: "",
      bpSystolic: "",
      bpDiastolic: "",
      respiratoryRate: "",
      spO2: "",
      o2DeliveryPlan: "",
      painScale: "",
    }

  ];

  return (
    <>

      <CustomModal
        isOpen={isTriageModalOpen}
        onClose={closeTriAgeModal}
        title="OPD Triage"
      >
        <div className="triage-container">
          <header>
            <h2>
              OPD Triage of {data?.firstName} {data?.lastName}
            </h2>
            <p>
              Doctor Name: {data.addDoctor?.salutation}{" "}
              {data.addDoctor?.doctorName}
            </p>
          </header>
          <main className="triage-container-main">
            <section className="main-upperSeection">
              <div className="triage-vital-table">
                <div className="triage-vital-table-subDiv">
                  <h1>Vital List</h1>
                  <button
                    onClick={handleAddVitals}
                    className="triage-allergy-add-new-button"
                  >
                    Add New
                  </button>
                </div>
                {latestVitals && (
                  <div className="triage-Patient-Dashboard-tableRecord">
                    <table className="triage-Patient-Dashboard-patient-table">
                      <tr>
                        <td className="triage-Patient-Dashboard-td">
                          Recoreded On
                        </td>
                        <td className="triage-Patient-Dashboard-td">
                          {new Date(latestVitals?.addedOn).toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="triage-Patient-Dashboard-td">Height</td>
                        <td className="triage-Patient-Dashboard-td">
                          {" "}
                          {latestVitals?.height} cm
                        </td>
                      </tr>
                      <tr>
                        <td className="triage-Patient-Dashboard-td">Weight</td>
                        <td className="triage-Patient-Dashboard-td">
                          {latestVitals?.weight}kg
                        </td>
                      </tr>
                      <tr>
                        <td className="triage-Patient-Dashboard-td">BMI</td>
                        <td className="triage-Patient-Dashboard-td">
                          {latestVitals?.bmi}
                        </td>
                      </tr>
                      <tr>
                        <td className="triage-Patient-Dashboard-td">
                          Temprature
                        </td>
                        <td className="triage-Patient-Dashboard-td">
                          {latestVitals?.temperature} °C
                        </td>
                      </tr>
                      <tr>
                        <td className="triage-Patient-Dashboard-td">Pulse</td>
                        <td className="triage-Patient-Dashboard-td">
                          {latestVitals?.pulse} bpm
                        </td>
                      </tr>
                      <tr>
                        <td className="triage-Patient-Dashboard-td">
                          Blood Pressure
                        </td>
                        <td className="triage-Patient-Dashboard-td">
                          {" "}
                          {latestVitals?.bpSystolic}/{latestVitals?.bpDiastolic}{" "}
                          mmHg
                        </td>
                      </tr>
                      <tr>
                        <td className="triage-Patient-Dashboard-td">
                          Respiratory Rate
                        </td>
                        <td className="triage-Patient-Dashboard-td">
                          {latestVitals?.respiratoryRate} breaths/min
                        </td>
                      </tr>
                      <tr>
                        <td className="triage-Patient-Dashboard-td">SpO2</td>
                        <td className="triage-Patient-Dashboard-td">
                          {" "}
                          {latestVitals?.spO2} %
                        </td>
                      </tr>
                      <tr>
                        <td className="triage-Patient-Dashboard-td">
                          O2 Deliver Method
                        </td>
                        <td className="triage-Patient-Dashboard-td">
                          {" "}
                          {latestVitals?.o2DeliveryPlan}
                        </td>
                      </tr>
                      <tr>
                        <td className="triage-Patient-Dashboard-td">
                          Pain Scale
                        </td>
                        <td className="triage-Patient-Dashboard-td">
                          {latestVitals?.painScale}
                        </td>
                      </tr>
                    </table>
                  </div>
                )}
              </div>
              <div className="triage-vital-Form">
                <CustomModal isOpen={showForm} onClose={() => setShowForm(false)}>
                  <div className="triage-vitals-form">
                    <div className="triage-vitals-form-header">
                      <h3>Add New Vitals</h3>
                      {/* <button
                        className="vitals-form-header-close"
                        onClick={() => setShowForm(!showForm)}
                      >
                        X
                      </button> */}
                    </div>
                    <form>
                      <div className="vitals-form-form-row">
                        <label>Added On:</label>
                        <input
                          className="vitals-form-form-row-input"
                          type="date"
                          name="addedOn"
                          value={vitalData.addedOn}
                          min={new Date().toISOString().split("T")[0]}
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
                        className="triage-allergy-add-new-button"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </CustomModal>
              </div>
            </section>
            <div className="opd-triage-page-table">
              <table>
                <thead>
                  <tr>
                    {[
                      "Added On",
                      "Height (cm)",
                      "Weight (kg)",
                      "BMI",
                      "Temperature",
                      "Blood Pressure",
                      "Respiratory",
                      "SpO₂",
                      "O₂ Delivery Plan",
                      "Pain Scale (/10)",
                    ].map((header, index) => (
                      <th key={index} className="resizable-th">
                        <div className="header-content">
                          <span>{header}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vitalsData && vitalsData.length > 0 ? (
                    vitalsData.map((vital, index) => (
                      <tr key={index}>
                        <td>{vital.addedOn}</td>
                        <td>{vital.height} cm</td>
                        <td>{vital.weight} kg</td>
                        <td>{vital.bmi}</td>
                        <td>{vital.temperature}°C</td>
                        <td>
                          {vital.bpSystolic}/{vital.bpDiastolic} mmHg
                        </td>
                        <td>{vital.respiratoryRate} bpm</td>
                        <td>{vital.spO2}%</td>
                        <td>{vital.o2DeliveryPlan}</td>
                        <td>{vital.painScale}/10</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <section className="triage-allergy-container">
              <div className="allergy-list">
                <div className="triage-allergy-list-subdiv">
                  <h3>Allergy List</h3>
                  <button
                    className="triage-allergy-add-new-button"
                    onClick={handleAddNew}
                  >
                    + Add New
                  </button>
                </div>
                <div className="opd-triage-page-table">
                  <table ref={tableRef}>
                    <thead>
                      <tr>
                        {[
                          "Recorded On",
                          "Allergen",
                          "Severity",
                          "Reaction",
                          "Verified",
                          "Comments",
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
                      {allergies && allergies.length > 0 ? (
                        allergies.map((allergy) => (
                          <tr key={allergy.allergiesId}>
                            <td>{allergy.recordedDate}</td>
                            <td>{allergy.typeOfAllergy}</td>
                            <td>{allergy.severity}</td>
                            <td>{allergy.reaction}</td>
                            <td>{allergy.verified === "true" ? "Yes" : "No"}</td>
                            <td>{allergy.comments}</td>
                            <td>
                              {/* You can add an edit button here */}
                              <button
                                className="triage-allergy-add-new-button"
                                onClick={() => updateAllergies(allergy)}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7">No allergies found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="triage-allergy-add-new-section">
                <CustomModal isOpen={showAllergyForm} onClose={handleCloseForm}>    <div className="triage-add-allergy-form">
                  <div className="triage-allergy-form-header">
                    <h3>Add Allergy</h3>
                    {/* <button
                        className="allergy-close-button"
                        onClick={handleCloseForm}
                      >
                        ✖
                      </button> */}
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="allergy-form-row">
                      <label>Type Of Allergy*:</label>
                      <div className="allergy-form-row-subdiv">
                        <input
                          type="radio"
                          value="Medication"
                          name="typeOfAllergy"
                          onChange={handleTypeOfAllergyChange}
                        />{" "}
                        Medication
                        <input
                          type="radio"
                          value="Non Medication"
                          name="typeOfAllergy"
                          onChange={handleTypeOfAllergyChange}
                        />{" "}
                        Non Medication
                        <input
                          type="radio"
                          value="Food"
                          name="typeOfAllergy"
                          onChange={handleTypeOfAllergyChange}
                        />{" "}
                        Food
                        <input
                          type="radio"
                          value="AdvRec"
                          name="typeOfAllergy"
                          onChange={handleTypeOfAllergyChange}
                        />{" "}
                        AdvRec
                      </div>
                    </div>

                    <div className="allergy-form-row">
                      <label>Severity:</label>
                      <div className="allergy-form-row-subdiv">
                        <input
                          type="radio"
                          value="Mild"
                          name="severity"
                          onChange={handleSeverityChange}
                        />{" "}
                        Mild
                        <input
                          type="radio"
                          value="Moderate"
                          name="severity"
                          onChange={handleSeverityChange}
                        />{" "}
                        Moderate
                        <input
                          type="radio"
                          value="Severe"
                          name="severity"
                          onChange={handleSeverityChange}
                        />{" "}
                        Severe
                      </div>
                    </div>

                    <div className="allergy-form-row">
                      <label>Verified:</label>
                      <div className="allergy-form-row-subdiv">
                        <input
                          type="radio"
                          name="verified"
                          value="unknown"
                          onChange={handleVerifiedChange}
                        />{" "}
                        Unknown
                        <input
                          type="radio"
                          name="verified"
                          value="true"
                          onChange={handleVerifiedChange}
                        />{" "}
                        Yes
                        <input
                          type="radio"
                          name="verified"
                          value="false"
                          onChange={handleVerifiedChange}
                          defaultChecked
                        />{" "}
                        No
                      </div>
                    </div>

                    <div className="allergy-form-row">
                      <label>Reaction*:</label>
                      <input
                        type="text"
                        name="reaction"
                        placeholder="Reaction"
                        value={formData.reaction}
                        onChange={handleInputAllergyChange}
                      />
                    </div>

                    <div className="allergy-form-row">
                      <label>Comments:</label>
                      <textarea
                        name="comments"
                        placeholder="Comments"
                        value={formData.comments}
                        onChange={handleInputAllergyChange}
                      ></textarea>
                    </div>

                    <button type="submit" className="allergy-add-button">
                      Add
                    </button>
                  </form>
                </div>
                </CustomModal>

                {showUpdateForm && (

                  <div className="triage-add-allergy-form">
                    <div className="allergy-form-header">
                      <h3>Update Allergy</h3>
                      {/* <button
                        className="allergy-close-button"
                        onClick={handleCloseForm}
                      >
                        ✖
                      </button> */}
                    </div>
                    <form onSubmit={handleUpdateSubmit}>
                      <div className="allergy-form-row">
                        <label>Type Of Allergy*:</label>
                        <div className="allergy-form-row-subdiv">
                          <input
                            type="radio"
                            value="Medication"
                            name="typeOfAllergy"
                            onChange={handleUpdateTypeOfAllergyChange}
                          />{" "}
                          Medication
                          <input
                            type="radio"
                            value="Non Medication"
                            name="typeOfAllergy"
                            onChange={handleUpdateTypeOfAllergyChange}
                          />{" "}
                          Non Medication
                          <input
                            type="radio"
                            value="Food"
                            name="typeOfAllergy"
                            onChange={handleUpdateTypeOfAllergyChange}
                          />{" "}
                          Food
                          <input
                            type="radio"
                            value="AdvRec"
                            name="typeOfAllergy"
                            onChange={handleUpdateTypeOfAllergyChange}
                          />{" "}
                          AdvRec
                        </div>
                      </div>

                      <div className="allergy-form-row">
                        <label>Severity:</label>
                        <div className="allergy-form-row-subdiv">
                          <input
                            type="radio"
                            value="Mild"
                            name="severity"
                            onChange={handleUpdateSeverityChange}
                          />{" "}
                          Mild
                          <input
                            type="radio"
                            value="Moderate"
                            name="severity"
                            onChange={handleUpdateSeverityChange}
                          />{" "}
                          Moderate
                          <input
                            type="radio"
                            value="Severe"
                            name="severity"
                            onChange={handleUpdateSeverityChange}
                          />{" "}
                          Severe
                        </div>
                      </div>

                      <div className="allergy-form-row">
                        <label>Verified:</label>
                        <div className="allergy-form-row-subdiv">
                          <input
                            type="radio"
                            name="verified"
                            value="unknown"
                            onChange={handleUpdateVerifiedChange}
                          />{" "}
                          Unknown
                          <input
                            type="radio"
                            name="verified"
                            value="true"
                            onChange={handleUpdateVerifiedChange}
                          />{" "}
                          Yes
                          <input
                            type="radio"
                            name="verified"
                            value="false"
                            onChange={handleUpdateVerifiedChange}
                            defaultChecked
                          />{" "}
                          No
                        </div>
                      </div>

                      <div className="allergy-form-row">
                        <label>Reaction*:</label>
                        <input
                          type="text"
                          name="reaction"
                          placeholder="Reaction"
                          value={updateAllergy.reaction}
                          onChange={handleUpdateInputChange}
                        />
                      </div>

                      <div className="allergy-form-row">
                        <label>Comments:</label>
                        <textarea
                          name="comments"
                          placeholder="Comments"
                          value={updateAllergy.comments}
                          onChange={handleUpdateInputChange}
                        ></textarea>
                      </div>

                      <button type="submit" className="allergy-add-button">
                        Update
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      </CustomModal>

    </>
  );
}

export default OPDTriagePage;
