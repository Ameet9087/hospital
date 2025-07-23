import React, { useState } from "react";
import "./clinicalBookAdmission.css";
import axios from "axios";

function ClinicalBookAdmission({ onclose, selectedapatient }) {
  const [ward, setWard] = useState("");
  const [bedFeatures, setBedFeatures] = useState([]);
  const [beds, setBeds] = useState([]);
  const [selectedBedFeature, setSelectedBedFeature] = useState("");
  const [selectedBed, setSelectedBed] = useState("");
  const [admissionNote, setAdmissionNote] = useState("");

  const hardcodedData = {
    "male ward": {
      bedFeatures: ["Basic Bed", "Advanced Bed"],
      beds: {
        "Basic Bed": ["Bed 1", "Bed 2"],
        "Advanced Bed": ["Bed 3", "Bed 4"],
      },
    },
    "female ward": {
      bedFeatures: ["Standard Bed", "Luxury Bed"],
      beds: {
        "Standard Bed": ["Bed 5", "Bed 6"],
        "Luxury Bed": ["Bed 7", "Bed 8"],
      },
    },
    "maternity ward": {
      bedFeatures: ["Maternity Bed", "VIP Bed"],
      beds: {
        "Maternity Bed": ["Bed 9", "Bed 10"],
        "VIP Bed": ["Bed 11", "Bed 12"],
      },
    },
    // Add more wards and their respective bed features and beds here
  };

  const handleWardChange = (e) => {
    const selectedWard = e.target.value;
    setWard(selectedWard);
    setBedFeatures(hardcodedData[selectedWard]?.bedFeatures || []);
    setBeds([]);
    setSelectedBedFeature("");
    setSelectedBed("");
  };

  const handleBedFeatureChange = (e) => {
    const selectedFeature = e.target.value;
    setSelectedBedFeature(selectedFeature);
    setBeds(hardcodedData[ward]?.beds[selectedFeature] || []);
    setSelectedBed("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      clinicalCase: e.target.case.value,
      requestingDepartment: "NEUROSURGERY",
      admittingDoctor: "Mrs. BEATRICE WANGAI MUKOLWE",
      ward: ward,
      bedFeatures: selectedBedFeature,
      bed: selectedBed,
      admissionNote: admissionNote,
      patientId: selectedapatient?.id, // Assuming patientId is in selectedapatient
    };

    axios
      .post("http://localhost:1415/api/clinical-book-appointments", data)
      .then((response) => {
        alert("Admission booked successfully!");
        onclose();
      })
      .catch((error) => {
        console.error("Error booking admission:", error);
      });
  };

  return (
    <div className="clinical-book-admission-container">
      <div className="clinical-book-admission-modal">
        <div className="clinical-modal-header">
          <h2>Book Admission</h2>
          <button onClick={onclose} className="clinical-close-button">
            X
          </button>
        </div>
        <form className="clinical-admission-form" onSubmit={handleSubmit}>
          <div className="clinical-form-group">
            <label htmlFor="case">Case</label>
            <select id="case" required>
              <option value="">Select a case</option>
              <option value="general">General</option>
              <option value="police case">Police Case</option>
              <option value="ocmc">OCMC</option>
              <option value="safe mother program">Safe Mother Program</option>
              <option value="safe children program">
                Safe Children Program
              </option>
            </select>
          </div>
          <div className="clinical-form-group">
            <label htmlFor="requestingDepartment">Requesting Department</label>
            <input
              type="text"
              id="requestingDepartment"
              value="NEUROSURGERY"
              readOnly
            />
          </div>
          <div className="clinical-form-group">
            <label htmlFor="admittingDoctor">Admitting Doctor</label>
            <input
              type="text"
              id="admittingDoctor"
              value="Mrs. BEATRICE WANGAI MUKOLWE"
              readOnly
            />
          </div>
          <div className="clinical-form-group">
            <label htmlFor="ward">Ward</label>
            <select id="ward" value={ward} onChange={handleWardChange} required>
              <option value="">Select a ward</option>
              <option value="male ward">Male Ward</option>
              <option value="female ward">Female Ward</option>
              <option value="maternity ward">Maternity Ward</option>
              <option value="icu">ICU</option>
              <option value="private ward">Private Ward</option>
              <option value="NICU">NICU</option>
              <option value="Brain Ward">Brain Ward</option>
            </select>
          </div>
          <div className="clinical-form-group">
            <label htmlFor="bedFeature">Bed Feature</label>
            <select
              id="bedFeature"
              value={selectedBedFeature}
              onChange={handleBedFeatureChange}
              required
              disabled={!bedFeatures.length}
            >
              <option value="">Select a bed feature</option>
              {bedFeatures.map((feature) => (
                <option key={feature} value={feature}>
                  {feature}
                </option>
              ))}
            </select>
          </div>
          <div className="clinical-form-group">
            <label htmlFor="bed">Bed</label>
            <select
              id="bed"
              value={selectedBed}
              onChange={(e) => setSelectedBed(e.target.value)}
              required
              disabled={!beds.length}
            >
              <option value="">Select a bed</option>
              {beds.map((bed) => (
                <option key={bed} value={bed}>
                  {bed}
                </option>
              ))}
            </select>
          </div>
          <div className="clinical-form-group">
            <label htmlFor="admissionNote">Admission Note</label>
            <textarea
              id="admissionNote"
              rows="3"
              value={admissionNote}
              onChange={(e) => setAdmissionNote(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="clinical-book-button">
            Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default ClinicalBookAdmission;
