import React, { useState, useRef, useEffect } from "react";
import "./OT_Nurse_Notes.css"; // Add custom styles if needed
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";

const OT_Nurse_Notes = () => {
  const [surgeryEvents, setSurgeryEvents] = useState([]); // State to store surgery events
  const [selectedSurgeryEvent, setSelectedSurgeryEvent] = useState(""); // Selected surgery event ID
  const [patients, setPatients] = useState([]); 
  const [formData, setFormData] = useState({
    uhid: "",
    patientUHID: "",
    firstName: "",
    lastName: "",
    age: "",
    bloodGroup: "",
    gender: "",
    weight: "",
    anesthesiaType: "",
    patientReceivedAt: "",
    patientReceivedFrom: "",
    preAnaesthesiaCheckUpDoneOn: "",
    otTime: "",
    otDate: "",
    operationType: "",
    pacDone: "",
    surgeryName: "",
    surgeryType: "",
    surgeryDate: "",
    surgerySite: "",
    obtainedConsentForSurgery: "",
    obtainedConsentForAnaesthesia: "",
    obtainedConsentForHighRisk: "",
    obtainedBloodConsent: "",
    obtainedSpecialConsent: "",
    bloodSugar: "",
    remarks: "",
  });

 

  useEffect(() => {
    const fetchSurgeryEvents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/surgery-events`);
        const data = await response.json();

        setSurgeryEvents(data); // Assuming the API returns an array of surgery events
        console.log(surgeryEvents);
      } catch (error) {
        console.error("Error fetching surgery events:", error);
      }
    };

    fetchSurgeryEvents();
  }, []);

  // Handle surgery event change
  // const handleSurgeryEventChange = (e) => {
  //   const selectedEventId = e.target.value;

  //   setSelectedSurgeryEvent(selectedEventId);

  // };
  const handleSurgeryEventChange = (e) => {
    const selectedEventId = e.target.value;
    setSelectedSurgeryEvent(selectedEventId);

    // Find the selected surgery event
    const selectedEvent = surgeryEvents.find(
      (event) => event.surgeryEventId.toString() === selectedEventId
    );

    if (selectedEvent) {
      // Populate the fields with data from the selected surgery event
      const patient =
        selectedEvent.operationBookingDTO?.ipAdmissionDTO?.patient || {};
      setFormData({
        ...formData,
        uhid: patient.uhid || "",
        firstName: patient.firstName,
        lastName: patient.lastName,
        age: patient.age || "",
        gender: patient.gender || "",
        weight: patient.weight || "",
        bloodGroup: patient.bloodGroup || "",
        anesthesiaType: selectedEvent.anesthesiaType || "",
        otTime: selectedEvent?.operationBookingDTO?.otTime || "",
        surgeryName: selectedEvent?.operationMasterDTO?.operationName || "",
        operationType: selectedEvent?.operationMasterDTO?.operationType || "",
        otDate: selectedEvent?.operationBookingDTO?.otDate || "",
      });
    }
  };
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [temperature, setTemperature] = useState(98.6);
  const [pulse, setPulse] = useState(60);
  const [respiration, setRespiration] = useState(12);
  const [bloodPressure, setBloodPressure] = useState("120/80");


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [patientFirstName, setPatientFirstName] = useState("");
  const [patientLastName, setPatientLastName] = useState("");
  const [surgeryName, setSurgeryName] = useState("");
  const [surgeryDate, setSurgeryDate] = useState("");
  const [surgerySite, setSurgerySite] = useState("");
  const [consentSurgery, setConsentSurgery] = useState(false);
  const [consentAnaesthesia, setConsentAnaesthesia] = useState(false);
  const [consentHighRisk, setConsentHighRisk] = useState(false);
  const [bloodConsent, setBloodConsent] = useState(false);
  const [specialConsent, setSpecialConsent] = useState(false);
  const [bloodSugar, setBloodSugar] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSave = async (e) => {
    e.preventDefault();
  
    // Ensure dataToSave is defined and includes all necessary properties
    const dataToSave = {
      
      obtainedConsentForSurgery: formData.obtainedConsentForSurgery,
      obtainedConsentForAnaesthesia: formData.obtainedConsentForAnaesthesia,
      obtainedConsentForHighRisk: formData.obtainedConsentForHighRisk,
      obtainedBloodConsent: formData.obtainedBloodConsent,
      obtainedSpecialConsent: formData.obtainedSpecialConsent,
      bloodSugar: formData.bloodSugar,
      temperature,
      pulse,
      respiration,
      bp: `${bloodPressure.systolic}/${bloodPressure.diastolic}`,
      surgeryEventDTO: {
        surgeryEventId: selectedSurgeryEvent,
        useAnesthesia: formData.anesthesiaType ? "Yes" : "No",
        anesthesiaType: formData.anesthesiaType,
        reduce: 0.0,
        operationBookingDTO: {
          operationBookingId: 1,
          otDate: formData.otDate,
          otTime: formData.otTime,
          ipAdmissionDTO: {
            ipAdmmissionId: 1,
            patient: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              gender: formData.gender,
              age: formData.age,
              bloodGroup: formData.bloodGroup,
            },
          },
        },
        operationMasterDTO: {
          operationMasteId: 1,
          operationName: formData.surgeryName,
          operationType: formData.operationType,
        },
      },
    };
    
  
    console.log("Saving the following data:", dataToSave); // Debug log
  
    try {
      const response = await fetch(
        `${API_BASE_URL}/ot-nurse-notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSave),
        }
      );
  
      if (response.ok) {
        const savedData = await response.json();
        console.log("Data saved successfully:", savedData);
        alert("Data saved successfully!");
  
        // After successful save, update the patients list
        setPatients((prevPatients) => [
          ...prevPatients,
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            nameOfSurgery: formData.surgeryName,
            dateOfSurgery: formData.otDate,
            siteOfSurgery: formData.surgerySite,
            obtainedConsentForSurgery: formData.obtainedConsentForSurgery,
            obtainedConsentForAnaesthesia: formData.obtainedConsentForAnaesthesia,
            obtainedConsentForHighRisk: formData.obtainedConsentForHighRisk,
            obtainedBloodConsent: formData.obtainedBloodConsent,
            obtainedSpecialConsent: formData.obtainedSpecialConsent,
            bloodSugar: formData.bloodSugar,
            temperature,
            pulse,
            respiration,
            bp: `${bloodPressure.systolic}/${bloodPressure.diastolic}`,
          },
        ]);
      } else {
        console.error("Error saving data:", response.statusText);
        alert("Failed to save data!");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("An error occurred while saving the data.");
    }
  
    setIsPopupOpen(false);
  };
  
  

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = (patient) => {
    setPatientFirstName(patient.firstName || "");
    setPatientLastName(patient.lastName || "");
    setSurgeryName(patient.nameOfSurgery || "");
    setSurgeryDate(patient.dateOfSurgery || "");
    setSurgerySite(patient.siteOfSurgery || "");
    setConsentSurgery(patient.obtainedConsentForSurgery || false);
    setConsentAnaesthesia(patient.obtainedConsentForAnaesthesia || false);
    setConsentHighRisk(patient.obtainedConsentForHighRisk || false);
    setBloodConsent(patient.obtainedBloodConsent || false);
    setSpecialConsent(patient.obtainedSpecialConsent || false);
    setBloodSugar(patient.bloodSugar || "");
    setTemperature(patient.temperature || "");
    setPulse(patient.pulse || "");
    setRespiration(patient.respiration || "");
    setBloodPressure(patient.bp || "");
    setIsPopupOpen(true);
  };
  
  // const handleSave = (e) => {
  //   e.preventDefault();
  //   const updatedPatients = patients.map((p) =>
  //     p.firstName === patientFirstName ? {
  //       ...p,
  //       firstName: patientFirstName,
  //       lastName: patientLastName,
  //       nameOfSurgery: surgeryName,
  //       dateOfSurgery: surgeryDate,
  //       siteOfSurgery: surgerySite,
  //       obtainedConsentForSurgery: consentSurgery,
  //       obtainedConsentForAnaesthesia: consentAnaesthesia,
  //       obtainedConsentForHighRisk: consentHighRisk,
  //       obtainedBloodConsent: bloodConsent,
  //       obtainedSpecialConsent: specialConsent,
  //       bloodSugar: bloodSugar,
  //       temperature: temperature,
  //       pulse: pulse,
  //       respiration: respiration,
  //       bp: bloodPressure,
  //     } : p
  //   );
  
  //   setPatients(updatedPatients);
  //   setIsPopupOpen(false);
  // };
  
  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the modal
    setEditingPatient(null); // Clear the editing state
  };
  
  return (
    <div className="ot_nurse_notes-container">
      <h3 className="ot_nurse_notes-header">OT Nurse Notes</h3>
      <div className="ot_nurse_notes-row">
        {/* Dhanashree */}

        {/* Left Panel */}
        <div className="ot_nurse_notes-panel">
          <h3 className="ot_nurse_notes-title">Patient Details</h3>

          <form>
            {/* Dhanashree */}
            <div className="ot_nurse_notes-field">
              <label>Surgery Event ID</label>
              <select
                value={selectedSurgeryEvent}
                onChange={handleSurgeryEventChange}
              >
                <option value="">Select Surgery Event</option>
                {surgeryEvents.map((event) => (
                  <option
                    key={event.surgeryEventId}
                    value={event.surgeryEventId}
                  >
                    {event.surgeryEventId}
                  </option>
                ))}
              </select>
            </div>
         
            <div className="ot_nurse_notes-field">
              <label>UH ID No</label>
              <input
                type="text"
                name="patientUHID"
                value={formData.uhid}
                onChange={handleChange}
              />
            </div>
            <div className="ot_nurse_notes-field">
              <label>Patient First Name</label>
              <input
                type="text"
                name="patientName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="ot_nurse_notes-field">
              <label>Patient Last Name</label>
              <input
                type="text"
                name="patientName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="ot_nurse_notes-field">
              <label>Age</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div className="ot_nurse_notes-field">
              <label>Sex</label>
              <select
                name="sex"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Dhanashree */}

            <div className="ot_nurse_notes-field">
              <label>Blood Group</label>
              <input
                type="text"
                name="weight"
                value={formData.bloodGroup}
                onChange={handleChange}
              />
            </div>

            <div className="ot_nurse_notes-field">
              <label>Patient Received From</label>
              <input
                type="text"
                name="patientReceivedFrom"
                value={formData.patientReceivedFrom}
                onChange={handleChange}
              />
            </div>

            {/* anesthesia type will fetch at the time of surgery */}
            <div className="ot_nurse_notes-field">
              <label>Anaesthesia Type</label>
              <input
                type="text"
                name="preAnaesthesiaCheckUpDoneOn"
                value={formData.anesthesiaType}
                onChange={handleChange}
              />
            </div>

            {/* surgery time        */}
            <div className="ot_nurse_notes-field">
              <label>Time</label>
              <input
                type="text"
                name="time"
                value={formData.otTime}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>

        {/* Right Panel */}
        <div className="ot_nurse_notes-panel">
          <h3 className="ot_nurse_notes-title">Surgery Details</h3>

          <form>
            {/* Operation Name */}

            <div className="ot_nurse_notes-field">
              <label>Name Of Surgery</label>
              <input
                type="text"
                name="surgeryName"
                value={formData.surgeryName}
                onChange={handleChange}
              />
            </div>

            {/* operation type will be fetch */}

            <div className="ot_nurse_notes-field">
              <label>Type Of Surgery</label>
              <input
                name="surgeryType"
                value={formData.operationType}
                onChange={handleChange}
              />
            </div>

            {/* Surgery date */}

            <div className="ot_nurse_notes-field">
              <label>Date Of Surgery</label>
              <input
                type="date"
                name="surgeryDate"
                value={formData.otDate}
                onChange={handleChange}
              />
            </div>

            {/* rest will be add manually */}
            <div className="ot_nurse_notes-field">
              <label>Site Of Surgery</label>
              <select
                name="surgerySite"
                value={formData.surgerySite}
                onChange={handleChange}
              >
                <option value="Bilateral">Bilateral</option>
                <option value="Uni-Lateral">Uni-Lateral</option>
              </select>
            </div>
            <div className="ot_nurse_notes-field">
              <label>Obtained Consent For Surgery</label>
              <select
                name="obtainedConsentForSurgery"
                value={formData.obtainedConsentForSurgery}
                onChange={handleChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="ot_nurse_notes-field">
              <label>Obtained Consent For Anaesthesia</label>
              <select
                name="obtainedConsentForAnaesthesia"
                value={formData.obtainedConsentForAnaesthesia}
                onChange={handleChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="ot_nurse_notes-field">
              <label>Obtained Consent For High Risk</label>
              <select
                name="obtainedConsentForHighRisk"
                value={formData.obtainedConsentForHighRisk}
                onChange={handleChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="ot_nurse_notes-field">
              <label>Obtained Blood Consent</label>
              <select
                name="obtainedBloodConsent"
                value={formData.obtainedBloodConsent}
                onChange={handleChange}
              >
                <option value="Present">Present</option>
                <option value="Not Present">Not Present</option>
              </select>
            </div>
            <div className="ot_nurse_notes-field">
              <label>Obtained Special Consent</label>
              <input
                type="text"
                name="obtainedSpecialConsent"
                value={formData.obtainedSpecialConsent}
                onChange={handleChange}
              />
            </div>
            <div className="ot_nurse_notes-field">
              <label>Blood Sugar</label>
              <input
                type="text"
                name="bloodSugar"
                value={formData.bloodSugar}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      </div>






      <div className="ot_nurse_notes-row">
        {/* Left Panel */}
        <div className="ot_nurse_notes-panel">
          <form>
            <h3 className="ot_nurse_notes-title">Vitals</h3>

            {/* Temperature Range */}
            <div className="ot_nurse_notes-vital-sign">
              <span className="ot_nurse_notes-vital-name">
                Temperature (°F)
              </span>
              <input
                type="range"
                min="95"
                max="105"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="ot_nurse_notes-vital-input"
              />
              <span>{temperature}°F</span>
            </div>

            {/* Pulse Range */}
            <div className="ot_nurse_notes-vital-sign">
              <span className="ot_nurse_notes-vital-name">
                Pulse (Beats Per Minute)
              </span>
              <input
                type="range"
                min="40"
                max="200"
                value={pulse}
                onChange={(e) => setPulse(parseInt(e.target.value))}
                className="ot_nurse_notes-vital-input"
              />
              <span>{pulse} BPM</span>
            </div>

            {/* Respiration Range */}
            <div className="ot_nurse_notes-vital-sign">
              <span className="ot_nurse_notes-vital-name">
                Respiration (Breaths Per Minute)
              </span>
              <input
                type="range"
                min="10"
                max="40"
                value={respiration}
                onChange={(e) => setRespiration(parseInt(e.target.value))}
                className="ot_nurse_notes-vital-input"
              />
              <span>{respiration} BPM</span>
            </div>

            {/* Blood Pressure Range */}
            <div className="ot_nurse_notes-vital-sign">
              <span className="ot_nurse_notes-vital-name">BP (MM Hg)</span>
              <div className="ot_nurse_notes-blood-pressure">
                <input
                  type="range"
                  min="80"
                  max="200"
                  value={bloodPressure.systolic}
                  onChange={(e) =>
                    setBloodPressure({
                      ...bloodPressure,
                      systolic: parseInt(e.target.value),
                    })
                  }
                  className="ot_nurse_notes-blood-pressure-input"
                />
                <span className="ot_nurse_notes-blood-pressure-separator">
                  /
                </span>
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={bloodPressure.diastolic}
                  onChange={(e) =>
                    setBloodPressure({
                      ...bloodPressure,
                      diastolic: parseInt(e.target.value),
                    })
                  }
                  className="ot_nurse_notes-blood-pressure-input"
                />
              </div>
              <span>
                {bloodPressure.systolic}/{bloodPressure.diastolic} mm Hg
              </span>
            </div>
          </form>
        </div>
      </div>

      <div className="surgeryEvents-action-buttons">
      <button className="btn-blue" onClick={handleSave}>
  Save
</button>

        <button className="btn-red">Delete</button>
      </div>

      <div className="ot_nurse_notes-table-container">
        <h3>Patient List</h3>
        <table
          ref={tableRef}
          border="1"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              {[
                "Patient First Name",
                "Patient Last Name",
                "Name Of Surgery",
                "Date Of Surgery",
                "Site Of Surgery",
                "Obtained Consent For Surgery",
                "Obtained Consent For Anaesthesia",
                "Obtained Consent For High Risk",
                "Obtained Blood Consent",
                "Obtained Special Consent",
                "Blood Sugar",
                "Temperature",
                "Pulse",
                "Respiration",
                "BP",
                "Action",
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
  {patients.map((patient, index) => (
    <tr key={index}>
      <td>{patient.firstName}</td>
      <td>{patient.lastName}</td>
      <td>{patient.nameOfSurgery}</td>
      <td>{patient.dateOfSurgery}</td>
      <td>{patient.siteOfSurgery}</td>
      <td>{patient.obtainedConsentForSurgery}</td>
      <td>{patient.obtainedConsentForAnaesthesia}</td>
      <td>{patient.obtainedConsentForHighRisk}</td>
      <td>{patient.obtainedBloodConsent}</td>
      <td>{patient.obtainedSpecialConsent}</td>
      <td>{patient.bloodSugar}</td>
      <td>{patient.temperature}</td>
      <td>{patient.pulse}</td>
      <td>{patient.respiration}</td>
      <td>{patient.bp}</td>
      <td>
      <button
  className="EditButtonNurseNotes"
  onClick={() => handleButtonClick(patient)}
>
  Edit
</button>

      </td>
    </tr>
  ))}
</tbody>

<CustomModal isOpen={isPopupOpen} onClose={handleClosePopup}>
          <div className="OperationNotesContainer-popup-overlay">
            <div className="OperationNotesContainer-popup-content">
              <h2>Pre-Surgery Details</h2>

              <form>
                <div className="OperationNotesContainer-form-grid">
                  {/* Patient First Name */}
                  <div className="OperationNotesContainer-form-group">
  <label>Patient First Name</label>
  <input
    type="text"
    value={patientFirstName}
    onChange={(e) => setPatientFirstName(e.target.value)}
    readOnly={true} // Add this line to make the field read-only
  />
</div>

<div className="OperationNotesContainer-form-group">
  <label>Patient Last Name</label>
  <input
    type="text"
    value={patientLastName}
    onChange={(e) => setPatientLastName(e.target.value)}
    readOnly={true} // Add this line to make the field read-only
  />
</div>

<div className="OperationNotesContainer-form-group">
  <label>Name Of Surgery</label>
  <input
    type="text"
    value={surgeryName}
    onChange={(e) => setSurgeryName(e.target.value)}
    readOnly={true} // Add this line to make the field read-only
  />
</div>

<div className="OperationNotesContainer-form-group">
  <label>Date Of Surgery</label>
  <input
    type="date"
    value={surgeryDate}
    onChange={(e) => setSurgeryDate(e.target.value)}
    readOnly={true} // Add this line to make the field read-only
  />
</div>


                  {/* Site of Surgery */}
                  <div className="OperationNotesContainer-form-group">
                    <label>Site Of Surgery</label>
                    <input
                      type="text"
                      value={surgerySite}
                      onChange={(e) => setSurgerySite(e.target.value)}
                    />
                  </div>

                  {/* Obtained Consent For Surgery */}
                  <div className="OperationNotesContainer-form-group">
                    <label>Obtained Consent For Surgery</label>
                    <input
                      type="checkbox"
                      checked={consentSurgery}
                      onChange={(e) => setConsentSurgery(e.target.checked)}
                    />
                  </div>

                  {/* Obtained Consent For Anaesthesia */}
                  <div className="OperationNotesContainer-form-group">
                    <label>Obtained Consent For Anaesthesia</label>
                    <input
                      type="checkbox"
                      checked={consentAnaesthesia}
                      onChange={(e) => setConsentAnaesthesia(e.target.checked)}
                    />
                  </div>

                  {/* Obtained Consent For High Risk */}
                  <div className="OperationNotesContainer-form-group">
                    <label>Obtained Consent For High Risk</label>
                    <input
                      type="checkbox"
                      checked={consentHighRisk}
                      onChange={(e) => setConsentHighRisk(e.target.checked)}
                    />
                  </div>

                  {/* Obtained Blood Consent */}
                  <div className="OperationNotesContainer-form-group">
                    <label>Obtained Blood Consent</label>
                    <input
                      type="checkbox"
                      checked={bloodConsent}
                      onChange={(e) => setBloodConsent(e.target.checked)}
                    />
                  </div>

                  {/* Obtained Special Consent */}
                  <div className="OperationNotesContainer-form-group">
                    <label>Obtained Special Consent</label>
                    <input
                      type="checkbox"
                      checked={specialConsent}
                      onChange={(e) => setSpecialConsent(e.target.checked)}
                    />
                  </div>

                  {/* Blood Sugar */}
                  <div className="OperationNotesContainer-form-group">
                    <label>Blood Sugar</label>
                    <input
                      type="text"
                      value={bloodSugar}
                      onChange={(e) => setBloodSugar(e.target.value)}
                    />
                  </div>

                  {/* Temperature */}
                  <div className="OperationNotesContainer-form-group">
                    <label>Temperature</label>
                    <input
                      type="text"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                    />
                  </div>

                  {/* Pulse */}
                  <div className="OperationNotesContainer-form-group">
                    <label>Pulse</label>
                    <input
                      type="text"
                      value={pulse}
                      onChange={(e) => setPulse(e.target.value)}
                    />
                  </div>

                  {/* Respiration */}
                  <div className="OperationNotesContainer-form-group">
                    <label>Respiration</label>
                    <input
                      type="text"
                      value={respiration}
                      onChange={(e) => setRespiration(e.target.value)}
                    />
                  </div>

                  {/* BP */}
                  <div className="OperationNotesContainer-form-group">
  <label>BP (Systolic/Diastolic)</label>
  <input
    type="text"
    value={bloodPressure}
    onChange={(e) => setBloodPressure(e.target.value)}
    placeholder="e.g., 120/80"
  />
</div>

                </div>

                <div className="OperationNotesContainer-form-group-buttons">
                  <button
                    type="submit"
                    className="OperationNotesContainer-save-popup-btn"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </CustomModal>
        </table>

      </div>
    </div>
  );
};

export default OT_Nurse_Notes;
