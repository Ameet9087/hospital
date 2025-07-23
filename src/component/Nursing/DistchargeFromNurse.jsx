import React, { useEffect, useState } from "react";
import "./DischargeSummary.css";
import { API_BASE_URL } from "../api/api";
import axios from "axios";
import { json } from "react-router-dom";
// import PatientDischargeFormPrint from "./PatientDischargeFormPrint";

const DistchargeFromNurse = ({ patient ,closeModal}) => {
  console.log(patient);

  const dischargedDate = new Date();
  const formattedDate = dischargedDate.toISOString().split("T")[0];
  const AdmissionDate = patient?.admissionDate
    ? new Date(patient.admissionDate).toISOString().split("T")[0]
    : null;

  const [doctors, setDoctors] = useState([]);
  const [allDocuments, setAllDocuments] = useState([]);
  const [selectedLabTests, setSelectedLabTests] = useState([]);
  const [selectedImagingTests, setSelectedImagingTests] = useState([]);
  const [medications, setMedications] = useState([]);
  const [showPrint,setShowPrint] =useState(false);
  const [data,setData] = useState();
  const [currentMedication, setCurrentMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
  });

  const [formData, setFormData] = useState({
    dischargeDate: formattedDate,
    dischargedType: "",
    consultant: "",
    doctorIncharge: "",
    anesthetists: "",
    residentDr: "",
    selectDiagnosis: "",
    provisonalDiagnosis: "",
    otherDiagnosis: "",
    clinicalFindings: "",
    cheifComplain: "",
    historyOfPresentingIllness: "",
    treatmentDuringHospitalStay: "",
    conditionOnDischarge: "",
    pendingReport: "",
    specialNotes: "",
    allergies: "",
    dischargeOrder: "",
    restDay: "",
    followUp: "",
    showResult: "",
    labTests:"",
    imaging:"",
    medications: "",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/employees/findAllDoctors`
        );
        const data = await response.json();
        setDoctors(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching admitting doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchAllDocuments = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/admissions/details?patientId=${patient?.patientDTO?.patientId}&startDate=${AdmissionDate}&endDate=${formattedDate}`
        );
        const data = await response.json();
        setAllDocuments(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching admitting doctors:", error);
      }
    };
    fetchAllDocuments();
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        admissionDTO: { admissionId: patient?.admissionId},
        labTests: JSON.stringify(selectedLabTests), // Attach selected lab tests
        imaging: JSON.stringify(selectedImagingTests), // Attach selected imaging tests
        medications: JSON.stringify(medications),
      };
      console.log(data);

      const response = await axios.post(
        `${API_BASE_URL}/discharge-summaries/save`,
        data
      );

      if (response.status === 200) {
        alert("Discharge summary saved successfully");
        closeModal();
      } else {
        alert("Failed to save the discharge summary");
      }
    } catch (error) {
      console.error("Error saving discharge summary:", error);
      alert("An error occurred while saving the discharge summary");
    }
  };

  const handleCheckboxChange = (e, testName, type) => {
    if (type === "lab") {
      setSelectedLabTests(
        (prev) =>
          e.target.checked
            ? [...prev, testName] // Add test
            : prev.filter((test) => test !== testName) // Remove test
      );
    } else if (type === "imaging") {
      setSelectedImagingTests(
        (prev) =>
          e.target.checked
            ? [...prev, testName] // Add test
            : prev.filter((test) => test !== testName) // Remove test
      );
    }
  };

  const handleMedicationChange = (e) => {
    const { name, value } = e.target;
    setCurrentMedication({ ...currentMedication, [name]: value });
  };

  const addMedication = () => {
    if (
      currentMedication.name &&
      currentMedication.dosage &&
      currentMedication.frequency
    ) {
      setMedications((prevMedications) => [
        ...prevMedications,
        currentMedication,
      ]);
      setCurrentMedication({ name: "", dosage: "", frequency: "" });
    } else {
      alert("Please fill in all medication fields.");
    }
  };

  const removeMedication = (index) => {
    setMedications((prevMedications) =>
      prevMedications.filter((_, medIndex) => medIndex !== index)
    );
  };
  return (
    <div className="pat-container">
      <div className="pat-header">
        <div>
          <h2>{`${patient?.firstName || patient?.patientDTO?.firstName} ${
            patient?.lastName || patient?.patientDTO?.lastName
          }`}</h2>
          <p>
            <strong>Address:</strong> {patient?.patientDTO?.address}
          </p>
          <p>
            <strong>Admitted On:</strong> {AdmissionDate}
          </p>
          <p>
            <strong>Discharged On:</strong>
            {formattedDate}
          </p>
        </div>
        <div>
          <p>
            <strong>Contact No:</strong>
            {patient?.patientDTO?.phoneNumber}
          </p>
          <p>
            <strong>InPatient No:</strong> {patient?.admissionId}
          </p>
          <p>
            <strong>Ward:</strong> {patient?.wardDepartmentDTO?.wardName}
          </p>
          <p>
            <strong>Bed Number:</strong> {patient?.wardBedFeatureDTO?.bedId}
          </p>
        </div>
      </div>

      <div className="pat-form-section">
        <div className="pat-form-group">
          <label>Discharge Type *</label>
          <select name="dischargedType" onChange={handleChange}>
            <option value="">Choose Option</option>
            <option value="DOR">DOR</option>
            <option value="Recovered">Recovered</option>
            <option value="Not Imporoved">Not Imporoved</option>
            <option value="LAMA">LAMA</option>
            <option value="Death">Death</option>
            <option value="Absconded">Absconded</option>
            <option value="Referred">Referred</option>
            <option value="Discharged On Request">Discharged On Request</option>
            <option value="Stable">Stable</option>
          </select>
        </div>

        <div className="pat-form-group">
          <label>Consultant *</label>
          <select name="consultant" onChange={handleChange}>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option
                key={doctor.employeeId}
                value={`${doctor.salutation} ${doctor.firstName} ${doctor.lastName}`}
              >
                {doctor.salutation} {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="pat-form-group">
          <label>Doctor Incharge *</label>
          <select name="doctorIncharge" onChange={handleChange}>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option
                key={doctor.employeeId}
                value={`${doctor.salutation} ${doctor.firstName} ${doctor.lastName}`}
              >
                {doctor.salutation} {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="pat-form-group">
          <label>Anaesthetists *</label>
          <select name="anesthetists" onChange={handleChange}>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option
                key={doctor.employeeId}
                value={`${doctor.salutation} ${doctor.firstName} ${doctor.lastName}`}
              >
                {doctor.salutation} {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="pat-form-group">
          <label>Resident Dr</label>
          <select name="residentDr" onChange={handleChange}>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option
                key={doctor.employeeId}
                value={`${doctor.salutation} ${doctor.firstName} ${doctor.lastName}`}
              >
                {doctor.salutation} {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="pat-form-group">
          <label>Select Diagnosis</label>
          <input
            name="selectDiagnosis"
            type="text"
            placeholder="Select ICD-11(s) for Select Diagnosis"
            onChange={handleChange}
          />
        </div>

        <div className="pat-form-group">
          <label>Provisional Diagnosis</label>
          <input
            type="text"
            name="provisonalDiagnosis"
            placeholder="Select ICD-11(s) for Provisional Diagnosis"
            onChange={handleChange}
          />
        </div>

        <div className="pat-form-group">
          <label>Other Diagnosis</label>
          <input
            type="text"
            name="otherDiagnosis"
            n
            placeholder="Enter Other Diagnosis"
            onChange={handleChange}
          />
        </div>

        <div className="pat-form-group">
          <label>Clinical Findings</label>
          <textarea
            name="clinicalFindings"
            placeholder="Clinical Findings"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="pat-form-group">
          <label>Chief Complaint</label>
          <textarea
            name="cheifComplain"
            placeholder="Chief Complaint"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="pat-form-group">
          <label>History Of Presenting Illness</label>
          <textarea
            name="historyOfPresentingIllness"
            placeholder="History Of Presenting Illness"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="pat-form-group">
          <label>Treatment During Hospital Stay</label>
          <textarea
            name="treatmentDuringHospitalStay"
            placeholder="Treatment During Hospital Stay"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="pat-form-group">
          <label>Condition On Discharge</label>
          <textarea
            name="conditionOnDischarge"
            placeholder="Condition On Discharge"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="pat-form-group">
          <label>Pending Reports</label>
          <textarea
            name="pendingReport"
            placeholder="Pending Reports"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="pat-form-group">
          <label>Special Notes</label>
          <textarea
            name="specialNotes"
            placeholder="Special Notes"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="pat-form-group">
          <label>Allergies</label>
          <textarea
            name="allergies"
            placeholder="Allergies"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="pat-form-group">
          <label>Discharge Order</label>
          <textarea
            name="dischargeOrder"
            placeholder="Discharge Order"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="pat-form-group">
          <label>Rest Days</label>
          <textarea
            name="restDay"
            placeholder="Rest Days"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="pat-form-group">
          <label>Follow UP</label>
          <textarea
            name="followUp"
            placeholder="Follow UP"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="pat-form-group pat-investigations">
          <h3>Investigations</h3>

          <div className="pat-lab-tests">
          <h3>Lab Tests</h3>
  {allDocuments?.labRecords?.map((record, recordIndex) =>
    record?.labTestNames?.map((testName, testIndex) => (
      <div key={`lab-${recordIndex}-${testIndex}`} className="pat-lab-test-subdiv">
        <label className="pat-lab-test-subdiv-label">{testName}</label>
        <input
          type="checkbox"
          id={`checkbox-lab-${recordIndex}-${testIndex}`}
          className="pat-lab-test-subdiv-label-checkBox"
          value={testName}
          onChange={(e) => handleCheckboxChange(e, testName, "lab")} // Pass "lab" as type
        />
      </div>
    ))
  )}

  <h3>Imaging</h3>
  {allDocuments?.imagingRecords?.map((image, index) => (
    <div key={`imaging-${index}`} className="pat-lab-test-subdiv">
      <label className="pat-lab-test-subdiv-label">{image.imagingItemName}</label>
      <input
        type="checkbox"
        id={`checkbox-imaging-${index}`}
        className="pat-lab-test-subdiv-label-checkBox"
        value={image.imagingItemName}
        onChange={(e) => handleCheckboxChange(e, image.imagingItemName, "imaging")} // Pass "imaging" as type
      />
    </div>
  ))}
</div>

          <div className="pat-form-group">
            <div className="pat-form-group-subdiv">
            <h3>Medications</h3>
            <button className="pat-save-add" type="button" onClick={addMedication}>
                + Add Medication
              </button>
              </div>
            <div className="medication-form">
              <div>
                <label>Medication Name:</label>
                <input
                  type="text"
                  name="name"
                  value={currentMedication.name}
                  onChange={handleMedicationChange}
                />
              </div>
              <div>
                <label>Dosage:</label>
                <input
                  type="text"
                  name="dosage"
                  value={currentMedication.dosage}
                  onChange={handleMedicationChange}
                />
              </div>
              <div>
                <label>Frequency:</label>
                <input
                  type="text"
                  name="frequency"
                  value={currentMedication.frequency}
                  onChange={handleMedicationChange}
                />
              </div>
              
            </div>

            {/* Display the list of medications */}
            <ul>
              {medications.map((medication, index) => (
                <li key={index}>
                  {medication.name} - {medication.dosage} -{" "}
                  {medication.frequency}
                  <button className="pat-close" type="button" onClick={() => removeMedication(index)}>
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button className="pat-save" onClick={handleSubmit}>
          Save
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default DistchargeFromNurse;
