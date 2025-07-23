import React, { useState, useEffect } from 'react';
import './patienttransport.css';
import PopupTable from '../../../Admission/PopupTable';
import { FaSearch } from 'react-icons/fa';
import { API_BASE_URL } from '../../../api/api';


const PatientTransportForm = () => {
  const [activePopup, setActivePopup] = useState([]);
  const [patient, setPatient] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState([]);
  const [outPatient, setOutPatients] = useState([]);
  const [selectoutpatient, setSelectedOutPatient] = useState([]);
  const [ambulance, setAmbulance] = useState([]);
  const [selectedAmbulance, setSelectedAmbulance] = useState([]);
  const OutPatientHeading = ["uhid", "firstName"]
  const AmbulanceHeading = ["ambulanceId", "licencePlate", "status", "driver"]
  const patientHeading = ["uhid", "firstName"]
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    transportDate: '',
    transportTime: '',
    fromLocation: '',
    toLocation: '',
    transportReason: '',
    modeOfTransport: '',
    transportStaff: '',
    ambulanceDetails: {
      ambulanceNumber: '',
      driverName: '',
    },
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("ambulance")) {
      setFormData({
        ...formData,
        ambulanceDetails: {
          ...formData.ambulanceDetails,
          [name]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let payload = {
      transportDate: formData.transportDate,
      transportTime: formData.transportTime,
      fromLocation: formData.fromLocation,
      toLocation: formData.toLocation,
      modeOfTransport: formData.modeOfTransport,
      transportStaffAssigned: formData.transportStaff,
      additionalNotes: formData.additionalNotes,
      reasonForTransport: formData.transportReason,
      transportStatus: "In Transit",
      ambulance: selectedAmbulance ? { ambulanceId: selectedAmbulance.ambulanceId } : null,
    };

    if (formData.patientType === "inpatient") {
      payload.inPatient = { inPatientId: selectedPatient.id };
    } else if (formData.patientType === "outpatient") {
      payload.outPatient = { outPatientId: selectoutpatient.id };
    } else if (formData.patientType === "outsidepatient") {
      payload.outSidePatient = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dob: formData.dob,
        age: formData.age,
        gender: formData.gender,
        mobileNo: formData.mobileNo,
        address: formData.address,
        email: formData.email,
        emergencyContact: formData.emergencyContact,
        relationship: formData.relationship,
        insuranceDetails: formData.insuranceDetails,
        referralDoctor: formData.referralDoctor,
        medicalHistory: formData.medicalHistory,
        currentMedication: formData.currentMedication,
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/transport-info/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      alert("Transport details saved successfully!");

      // Reset form
      setFormData({
        patientType: "",
        transportDate: "",
        transportTime: "",
        fromLocation: "",
        toLocation: "",
        transportReason: "",
        modeOfTransport: "",
        transportStaff: "",
        ambulanceDetails: {},
        additionalNotes: "",
        firstName: "",
        lastName: "",
        dob: "",
        age: "",
        gender: "",
        mobileNo: "",
        address: "",
        email: "",
        emergencyContact: "",
        relationship: "",
        insuranceDetails: "",
        referralDoctor: "",
        medicalHistory: "",
        currentMedication: "",
      });

      setSelectedPatient(null);
      setSelectedOutPatient(null);
      setSelectedAmbulance(null);
    } catch (error) {
      console.error("Error while saving data:", error);
      alert("An error occurred: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePatientTypeChange = (e) => {
    const patientType = e.target.value;
    setFormData({ ...formData, patientType });
    if (patientType === 'In Patient' || patientType === 'Out Patient') {
      const patient = patientType.find(p => p.uhid === formData.uhid);
      if (patient) {
        setFormData({
          ...formData,
          uhid: patient.uhid,
          patientName: patient.name,
        });
      }
    }
  };
  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/inpatients/getAllPatients`);
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      const data = await response.json();
      const filteredData = data.map((patients) => ({
        id: patients.inPatientId,
        uhid: patients?.patient?.uhid || "N/A",
        firstName: patients?.patient?.firstName || "N/A",
        lastName: patients?.patient?.lastName || "N/A",
      }));

      setPatient(filteredData);
    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  };
  const fetchAmbulance = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/ambulances/all`);
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      const data = await response.json();
      setAmbulance(data);
      console.log("ambulance data", data);
    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  };
  const fetchOutPatients = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/out-patient`);
      if (!response.ok) {
        throw new Error("Failed to fetch outpatients");
      }
      const data = await response.json();
      setOutPatients(data);
    } catch (error) {
      console.error("Error fetching outpatients:", error);
    }
  };
  useEffect(() => {
    fetchAmbulance();

    if (formData.patientType === "inpatient") {
      fetchPatientDetails();
    } else if (formData.patientType === "outpatient") {
      fetchOutPatients();
    }
  }, [formData.patientType]);


  const getPopupData = () => {
    if (activePopup === "patientdetail") {
      return { columns: patientHeading, data: patient };
    }
    else if (activePopup === "ambulance") {
      return { columns: AmbulanceHeading, data: ambulance };
    } else if (activePopup === "outpatient") {
      return { columns: OutPatientHeading, data: outPatient }
    }
    else {
      return { columns: [], data: [] };
    }
  }
  const { columns, data } = getPopupData();

  const handleSelect = async (patient) => {
    if (activePopup === "patientdetail") {
      setSelectedPatient(patient);

    } else if (activePopup === "ambulance") {
      setSelectedAmbulance({
        ambulanceId: patient?.ambulanceId,
        licencePlate: patient?.licencePlate,
        driver: patient?.driver
      })
    } else if (activePopup === "outpatient") {
      setSelectedOutPatient({
        id: patient.outPatientId,
        uhid: patient?.patient?.uhid || "N/A",
        firstName: patient?.patient?.firstName || "N/A",
        lastName: patient?.patient?.lastName || "N/A",

      })
    }
    setActivePopup(null);
  };
  return (
    <div className="patient-transport-container">
      <form className="patient-transport-form" onSubmit={handleSubmit}>
        <div className='patient-transport-header-h2'>
          <h2 className="patient-transport-header">Patient Transportation Form</h2>
        </div>

        <div className='patient-transport-form-maindiv'>

          <div className="patient-transport-form-group">
            <label htmlFor="patientType">Patient Type:</label>
            <select
              id="patientType"
              name="patientType"
              value={formData.patientType}
              onChange={handlePatientTypeChange}
              required
              className="patient-transport-select"
            >
              <option value="">Select Patient Type</option>
              <option value="inpatient">In Patient</option>
              <option value="outpatient">Out Patient</option>
              <option value="outsidepatient">Outside Patient</option>
            </select>
          </div>
          {formData.patientType === 'inpatient' || formData.patientType === 'outpatient' ? (
            <>
              <div className="patient-transport-form-group">
                <label htmlFor="uhid">Patient UHID:</label>
                <input
                  type="text"
                  id="uhid"
                  name="uhid"
                  value={selectedPatient?.uhid || ""}
                  onChange={handleChange}
                  required
                  className="patient-transport-input"
                />
                <FaSearch className='patient-transport-search' onClick={() => setActivePopup("patientdetail")} />
              </div>

              <div className="patient-transport-form-group">
                <label htmlFor="patientName">Patient Name:</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={`${selectedPatient?.firstName || ""} ${selectedPatient?.lastName || ""}`}
                  onChange={handleChange}
                  required
                  className="patient-transport-input"
                />
              </div>
            </>
          ) : null}
          {formData.patientType === 'outsidepatient' && (
            <>
              <div className="patient-transport-form-group">
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="patient-transport-input" />
              </div>
              <div className="patient-transport-form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="patient-transport-input" />
              </div>
              <div className="patient-transport-form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required className="patient-transport-input" />
              </div>
              <div className="patient-transport-form-group">
                <label htmlFor="age">Age:</label>
                <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} required className="patient-transport-input" />
              </div>
              <div className="patient-transport-form-group">
                <label htmlFor="gender">Gender:</label>
                <input type="text" id="gender" name="gender" value={formData.gender} onChange={handleChange} required className="patient-transport-input" />
              </div>
              <div className="patient-transport-form-group">
                <label htmlFor="mobileNo">Mobile No:</label>
                <input type="text" id="mobileNo" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required className="patient-transport-input" />
              </div>
              <div className="patient-transport-form-group">
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required className="patient-transport-input" />
              </div>
              <div className="patient-transport-form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="patient-transport-input" />
              </div>
              <div className="patient-transport-form-group">
                <label htmlFor="emergencyContact">Emergency Contact:</label>
                <input type="text" id="emergencyContact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required className="patient-transport-input" />
              </div>
              <div className="patient-transport-form-group">
                <label htmlFor="relationship">Relationship:</label>
                <input type="text" id="relationship" name="relationship" value={formData.relationship} onChange={handleChange} required className="patient-transport-input" />
              </div>
              <div className="patient-transport-form-group">
                <label htmlFor="insuranceDetails">Insurance Details:</label>
                <input type="text" id="insuranceDetails" name="insuranceDetails" value={formData.insuranceDetails} onChange={handleChange} required className="patient-transport-input" />
              </div>
              <div className="patient-transport-form-group">
                <label htmlFor="referralDoctor">Referral Doctor:</label>
                <input type="text" id="referralDoctor" name="referralDoctor" value={formData.referralDoctor} onChange={handleChange} required className="patient-transport-input" />
              </div>
              <div className="patient-transport-form-group">
                <label htmlFor="medicalHistory">Medical History:</label>
                <textarea id="medicalHistory" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} required className="patient-transport-textarea"></textarea>
              </div>
              <div className="patient-transport-form-group">
                <label htmlFor="currentMedication">Current Medication:</label>
                <textarea id="currentMedication" name="currentMedication" value={formData.currentMedication} onChange={handleChange} required className="patient-transport-textarea"></textarea>
              </div>
            </>
          )}
          <div className="patient-transport-form-group">
            <label htmlFor="transportDate">Transport Date:</label>
            <input
              type="date"
              id="transportDate"
              name="transportDate"
              value={formData.transportDate}
              onChange={handleChange}
              required
              className="patient-transport-input"
            />
          </div>
          <div className="patient-transport-form-group">
            <label htmlFor="transportTime">Transport Time:</label>
            <input
              type="time"
              id="transportTime"
              name="transportTime"
              value={formData.transportTime}
              onChange={handleChange}
              required
              className="patient-transport-input"
            />
          </div>
          <div className="patient-transport-form-group">
            <label htmlFor="fromLocation">From Location:</label>
            <input
              type="text"
              id="fromLocation"
              name="fromLocation"
              value={formData.fromLocation}
              onChange={handleChange}
              required
              className="patient-transport-input"
            />
          </div>
          <div className="patient-transport-form-group">
            <label htmlFor="toLocation">To Location:</label>
            <input
              type="text"
              id="toLocation"
              name="toLocation"
              value={formData.toLocation}
              onChange={handleChange}
              required
              className="patient-transport-input"
            />
          </div>
          <div className="patient-transport-form-group">
            <label htmlFor="transportReason">Reason for Transport:</label>
            <textarea
              id="transportReason"
              name="transportReason"
              value={formData.transportReason}
              onChange={handleChange}
              required
              className="patient-transport-textarea"
            ></textarea>
          </div>
          <div className="patient-transport-form-group">
            <label htmlFor="transportStaff">Transport Staff Assigned:</label>
            <input
              type="text"
              id="transportStaff"
              name="transportStaff"
              value={formData.transportStaff}
              onChange={handleChange}
              required
              className="patient-transport-input"
            />
          </div>
          <div className="patient-transport-form-group">
            <label htmlFor="additionalNotes">Additional Notes:</label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              className="patient-transport-textarea"
            ></textarea>
          </div>

          <div className="patient-transport-form-group">
            <label htmlFor="modeOfTransport">Mode of Transport:</label>
            <select
              id="modeOfTransport"
              name="modeOfTransport"
              value={formData.modeOfTransport}
              onChange={handleChange}
              required
              className="patient-transport-select">
              <option value="">Select Mode of Transport</option>
              <option value="Ambulance">Ambulance</option>
              <option value="Wheelchair">Wheelchair</option>
              <option value="Stretcher">Stretcher</option>
            </select>
          </div>
          {formData.modeOfTransport === 'Ambulance' && (
            <div className="ambulance-details-section">
              <center><h6>Ambulance Details</h6></center>
              <div className="patient-transport-form-group">
                <label htmlFor="ambulanceNumber">Ambulance Number:</label>
                <input
                  type="text"
                  id="ambulanceNumber"
                  name="ambulanceNumber"
                  value={selectedAmbulance.licencePlate}
                  onChange={handleChange}
                  required
                  className="patient-transport-input"
                />
                <FaSearch onClick={() => setActivePopup("ambulance")} />
              </div>

              <div className="patient-transport-form-group">
                <label htmlFor="driverName">Driver's Name:</label>
                <input
                  type="text"
                  id="driverName"
                  name="driverName"
                  value={selectedAmbulance?.driver}
                  onChange={handleChange}
                  className="patient-transport-input"
                />
              </div>
            </div>
          )}


        </div>
        <div>
          <button type="submit" className="patient-transport-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

      <div>
        {activePopup && (
          <PopupTable
            columns={columns}
            data={data}
            onSelect={handleSelect}
            onClose={() => setActivePopup(false)}
          />
        )}

      </div>

    </div>

  );
};
export default PatientTransportForm;
