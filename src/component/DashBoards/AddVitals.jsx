import React, { useEffect, useState } from "react";
import "./AddVitals.css"; 
import { API_BASE_URL } from "../api/api";
import axios from "axios";
import CustomModal from "../../CustomModel/CustomModal";
import { toast } from "react-toastify";
import { FloatingInput } from "../../FloatingInputs";

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
  }, [outPatientId, patientId, showForm]); 

  const handleAddVitals = () => {
    setShowForm(true); 
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (parseFloat(value) < 0) {
      toast.error(`${name} should be greater than zero.`);
      return;
    }
  
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
        toast.success("Vitals saved successfully");
        setShowForm(false);
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
        toast.error("Failed to save vitals");
      }
    } catch (error) {
      toast.error("Error:", error);
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
                      <FloatingInput
                      label={"Added On"}
                       type="date"
                       name="addedOn"
                       value={vitalData.addedOn}
                       onChange={handleInputChange}
                      
                      />

                    </div>

                    <div className="vitals-form-form-row">
                      <FloatingInput
                      label={"Height (cm)"}
                      type="number"
                      name="height"
                      placeholder="cm"
                      value={vitalData.height}
                      onChange={handleInputChange}
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <FloatingInput
                      label={"Weight (kg)"}
                       type="number"
                       name="weight"
                       placeholder="Kg"
                       value={vitalData.weight}
                       onChange={handleInputChange}
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <FloatingInput
                      label={"BMI"}
                        type="number"
                        name="bmi"
                        value={vitalData.bmi}
                        readOnly
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <FloatingInput
                      label={"Temperature"}
                      type="number"
                      name="temperature"
                      placeholder="	°F"
                      value={vitalData.temperature}
                      onChange={handleInputChange}
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <FloatingInput
                      label={"Pulse"}
                       type="number"
                       name="pulse"
                       placeholder="bpm"
                       value={vitalData.pulse}
                       onChange={handleInputChange}
                      />
                    </div>

                    <div className="vitals-form-form-row">
                        <FloatingInput
                        label={"BP Systolic"}
                        type="number"
                        name="bpSystolic"
                        placeholder="mmHg"
                        value={vitalData.bpSystolic}
                        onChange={handleInputChange}
                        />
                        <FloatingInput
                        label={"BP Diastolic"}
                        type="number"
                        name="bpDiastolic"
                        placeholder="mmHg"
                        value={vitalData.bpDiastolic}
                        onChange={handleInputChange}
                        />
                     
                    </div>

                    <div className="vitals-form-form-row">
                      <FloatingInput
                      label={"Respiratory Rate"}
                      type="number"
                      name="respiratoryRate"
                      placeholder="breaths/min"
                      value={vitalData.respiratoryRate}
                      onChange={handleInputChange}
                      
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <FloatingInput
                      label={"SpO₂"}
                       type="number"
                       name="spO2"
                       placeholder="%"
                       value={vitalData.spO2}
                       onChange={handleInputChange}
                      
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <FloatingInput
                      label={"O₂ Delivery Plan"}
                      type="text"
                      name="o2DeliveryPlan"
                      placeholder="L/min"
                      value={vitalData.o2DeliveryPlan}
                      onChange={handleInputChange}
                      
                      />
                    </div>

                    <div className="vitals-form-form-row">
                      <FloatingInput
                      label={"Pain Scale (/10)"}
                      type="number"
                      name="painScale"
                      placeholder="Scale 0-10"
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
              </div>
            </div>
          </CustomModal>
        )}
      </div>
    </div>
  );
};

export default Vitals;
