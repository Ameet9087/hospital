import React, { useState, useEffect } from "react";
import "./OperationNotes.css";
import { API_BASE_URL } from "../../api/api";

const OperationNotes = () => {
  // State management
  const [rows, setRows] = useState([]); // Table rows state
  const [roomStatus, setRoomStatus] = useState("active"); // Initial value
  const [surgeryEvents, setSurgeryEvents] = useState([]); // State to store surgery events
  const [selectedSurgeryEvent, setSelectedSurgeryEvent] = useState(""); // Selected surgery event ID
  const [formData, setFormData] = useState({
    uhid: "", // MRNO
    inPatientId: "", // IP No
    firstName: "", // First Name
    lastName: "", // Last Name
    age: "", // Age
    gender: "", // Gender
    doctorName: "", // Doctor Name
    roomNo: "", // Room No
    bloodGroup: "", // Blood Group
    doa: "", // DOA (Date of Admission)
    dateTimeOfSurgery: "", // Date & Time Of Surgery
    preOperativeDiagnosis: "", // Pre Operative Diagnosis
    postOperativeDiagnosis: "", // Post Operative Diagnosis
    patientInTime: "", // Patient In Time
    patientOutTime: "", // Patient Out Time
    surgeonDoctor: "", // Surgeon Doctor
    anaesthetist: "", // Anaesthetist
    assistantNurse: "", // Assistant Nurse
    antiBioticProphylaxis: "", // Anti Biotic Prophylaxis
    anesthesiaType: "", // Type Of Anaesthesia
    testsNames: "", // Tests Names
    medicinesNames: "", // Medicines Names
    incision: "", // Incision
    findings: "", // Findings
    operationScheduleTime: "", // Operation Schedule Time
    operationStartTime: "", // Operation Start Time
    operationFinishTime: "", // Operation Finish Time
    operativeNotes: "", // Operative Notes
    intraOperativeComplications: "", // Intra Operative Complications
    intraOperativeNotes: "", // Intra Operative Notes
    bloodLossAmount: "", // Amount of Blood loss
    transfusedBloodAmount: "", // Amount of transfused blood if any
    histopathologySpecimenDetails: "", // Specimen sent for histopathology If Yes Then Details
    implantableDeviceRegistry: "", // Registry number of all Implantable devices If Any
    npoStatus: "", // NPO Status
    patientMonitoring: "", // Monitoring of patient
    nutritionalRequirements: "", // Nutritional Requirements
    woundManagement: "", // Wound Management (Details of drains, Dressings, Packs, Catheter care, etc.)
    specificRequirements: "", // Any specific Requirements
    caseType: "Emergency", // Case type
    painRatingScaleNumeric: "0 No Pain", // Numeric Pain Rating Scale
    painRatingScaleFace: "0-1 No Hurts", // Wong-Baker FACE Pain Rating Scale
    remarks: "", // Remarks
    dischargeSummaryNotes: "", // Notes for Discharge Summary
  });

  useEffect(() => {
    const fetchSurgeryEvents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/surgery-events`);
        const data = await response.json();
        setSurgeryEvents(data); // Assuming the API returns an array of surgery events
      } catch (error) {
        console.error("Error fetching surgery events:", error);
      }
    };

    fetchSurgeryEvents();
  }, []);

  const handleSurgeryEventChange = (e) => {
    const selectedEventId = e.target.value;
    setSelectedSurgeryEvent(selectedEventId);

    const selectedEvent = surgeryEvents.find(
      (event) => event.surgeryEventId.toString() === selectedEventId
    );

    if (selectedEvent) {
      const patient =
        selectedEvent.operationBookingDTO?.ipAdmissionDTO?.patient || {};
      const operationDetails =
        selectedEvent.operationBookingDTO?.operationDetails || {};
      const bedDTO =
        selectedEvent.operationBookingDTO?.ipAdmissionDTO?.roomDetails
          ?.bedDTO || {};
      const consultantDoctor =
        selectedEvent.operationBookingDTO?.ipAdmissionDTO
          ?.admissionUnderDoctorDetail?.consultantDoctor || {};

      setFormData({
        ...formData,
        uhid: patient.patient?.uhid || "",
        inPatientId: patient.inPatientId || "",
        firstName: patient.patient?.firstName || "",
        lastName: patient.patient?.lastName || "",
        age: patient.patient?.age || "",
        gender: patient.patient?.gender || "",
        doctorName: consultantDoctor.doctorName || "",
        roomNo: bedDTO.roomNo || "",
        bloodGroup: patient.bloodGroup || "",
        doa:
          selectedEvent.operationBookingDTO?.ipAdmissionDTO?.admissionDate ||
          "",
        dateTimeOfSurgery: selectedEvent.operationBookingDTO?.otDate || "",
        patientInTime: selectedEvent.operationBookingDTO?.otTime || "",
        patientOutTime: "",
        surgeonDoctor: selectedEvent.docterDTO?.doctorName || "",
        anaesthetist: selectedEvent.useAnesthesia || "",
        typeOfAnaesthesia: operationDetails.typeOfAnaesthesia || "",
        assistantNurse: selectedEvent.employeeDTO?.firstName || "",
        anesthesiaType: selectedEvent.anesthesiaType || "",
        operationScheduleTime: selectedEvent.operationBookingDTO?.otTime || "",
        operationStartTime: "",
        operationFinishTime: "",
        antiBioticProphylaxis: "",
        testsNames: "",
        medicinesNames: "",
        incision: "",
        findings: "",
        preOperativeDiagnosis: "",
        postOperativeDiagnosis: "",
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the post data based on provided JSON structure
    const postData = {
      preOperativeDiagnosis: formData.preOperativeDiagnosis,
      postOperativeDiagnosis: formData.postOperativeDiagnosis,
      antiBioticProphylaxis: formData.antiBioticProphylaxis,
      testsNames: formData.testsNames,
      medicinesNames: formData.medicinesNames,
      incision: formData.incision,
      findings: formData.findings,
      operativeNotes: "Surgery completed without complications",
      intraOperativeComplications: "None",
      intraOperativeNotes: "Stable vitals throughout the procedure",
      amountOfBloodLoss: "500ml",
      amountOfTransfusedBlood: "200ml",
      specimenSent: "Tissue sample sent for biopsy",
      details: "Patient maintained in stable condition post-op",
      registryNumberOfImplants: "REG123456",
      npoStatus: "NPO for 6 hours before surgery",
      monitoringOfPatient: "Vitals monitored continuously",
      nutritionalRequirements:
        "Nil by mouth post-surgery, IV fluids administered",
      woundManagement: "Sterile dressing applied, no signs of infection",
      specificRequirements: "Patient needs close monitoring for 24 hours",
      numericPainRatingScale: 4,
      wongBakerFacePainRatingScale: "Mild discomfort",
      remarks: "Follow-up advised in 7 days",
      notesForDischargeSummary:
        "Patient recovering well, discharge planned tomorrow",
      surgeryEventDTO: {
        surgeryEventId: parseInt(selectedSurgeryEvent),
      },
    };


    try {
      const response = await fetch(`${API_BASE_URL}/operation-notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const responseJson = await response.json();

      if (response.ok) {
        alert("Operation notes submitted successfully!");
      } else {
        console.error("Response Error:", responseJson);
        alert("Failed to submit operation notes. Check logs for details.");
      }
    } catch (error) {
      console.error("Error submitting operation notes:", error);
    }
  };

  return (
    <div className="operationnotes">
      <div className="operationnotes-title-bar">
        <div className="operationnotes-header">
          <span>Operation Notes</span>
        </div>
      </div>
      <div className="operationnotes-content-wrapper">
        <div className="operationnotes-main-section">
          <div className="operationnotes-panel operationnotes-details">
            <div className="operationnotes-panel-content">
              <div className="operationnotes-form-row">
                <label>Surgery Event Id: </label>
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

              {/* Additional form fields */}
              <div className="operationnotes-form-row">
                <label>MRNO: </label>
                <input type="text" value={formData.uhid} readOnly />
              </div>

              <div className="operationnotes-form-row">
                <label>IP No: </label>
                <input type="text" value={formData.inPatientId} readOnly />
              </div>

              <div className="operationnotes-form-row">
                <label>First Name: </label>
                <input type="text" value={formData.firstName} readOnly />
              </div>

              <div className="operationnotes-form-row">
                <label>Last Name: </label>
                <input type="text" value={formData.lastName} readOnly />
              </div>

              <div className="operationnotes-form-row">
                <label>Age: </label>
                <input type="number" value={formData.age} readOnly />
              </div>

              <div className="operationnotes-form-row">
                <label>Gender: </label>
                <input type="text" value={formData.gender} readOnly />
              </div>

              <div className="operationnotes-form-row">
                <label>Doctor Name: </label>
                <input type="text" value={formData.doctorName} readOnly />
              </div>

              <div className="operationnotes-form-row">
                <label>Room No: </label>
                <input type="text" value={formData.roomNo} readOnly />
              </div>

              <div className="operationnotes-form-row">
                <label>Blood Group: </label>
                <input type="text" value={formData.bloodGroup} readOnly />
              </div>

              <div className="operationnotes-form-row">
                <label>DOA: </label>
                <input type="date" value={formData.doa} readOnly />
              </div>
            </div>
          </div>

          {/* Additional Room Options Panel */}
          <div className="operationnotes-panel operationnotes-details">
            <div className="operationnotes-panel-content">
              <div className="operationnotes-form-row">
                <label>Date & Time Of Surgery: </label>
                <input type="date" value={formData.dateTimeOfSurgery} />
              </div>
              <div className="operationnotes-form-row">
                <label>Pre Operative Diagnosis: </label>
                <textarea
                  rows="2"
                  value={formData.preOperativeDiagnosis}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preOperativeDiagnosis: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="operationnotes-form-row">
                <label>Patient In Time: </label>
                <input type="time" Value={formData.patientInTime} />
              </div>
              <div className="operationnotes-form-row">
                <label>Patient Out Time: </label>
                <input
                  type="time"
                  value={formData.patientOutTime}
                  onChange={(e) =>
                    setFormData({ ...formData, patientOutTime: e.target.value })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Post Operative Diagnosis: </label>
                <textarea
                  rows="2"
                  value={formData.postOperativeDiagnosis}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      postOperativeDiagnosis: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="operationnotes-form-row">
                <label>Surgeon Doctor: </label>
                <input type="text" value={formData.surgeonDoctor} />
              </div>
              <div className="operationnotes-form-row">
                <label>use Anaesthetist: </label>
                <input type="text" value={formData.anaesthetist} />
              </div>

              <div className="operationnotes-form-row">
                <label> Assitant Nurse: </label>
                <input type="text" value={formData.assistantNurse} />
              </div>
            </div>
          </div>

          <div className="operationnotes-panel operationnotes-details">
            <div className="operationnotes-panel-content">
              <div className="operationnotes-form-row">
                <label>Anti Biotic Prophylaxis: </label>
                <input
                  type="text"
                  value={formData.antiBioticProphylaxis}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      antiBioticProphylaxis: e.target.value,
                    })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Type Of Anaesthesia: </label>
                <input type="text" value={formData.anesthesiaType} />
              </div>

              <div className="operationnotes-form-row">
                <label>Tests Names: </label>
                <input
                  type="text"
                  value={formData.testsNames}
                  onChange={(e) =>
                    setFormData({ ...formData, testsNames: e.target.value })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Medicines Names: </label>
                <input
                  type="text"
                  value={formData.medicinesNames}
                  onChange={(e) =>
                    setFormData({ ...formData, medicinesNames: e.target.value })
                  }
                />
              </div>

              <div className="operationnotes-form-row">
                <label>Incision: </label>
                <input
                  type="text"
                  value={formData.incision}
                  onChange={(e) =>
                    setFormData({ ...formData, incision: e.target.value })
                  }
                />
              </div>

              <div className="operationnotes-form-row">
                <label>Findings: </label>
                <input
                  type="text"
                  value={formData.findings}
                  onChange={(e) =>
                    setFormData({ ...formData, findings: e.target.value })
                  }
                />
              </div>

              <div className="operationnotes-form-row">
                <label>Operation Schedule Time: </label>
                <input type="text" value={formData.operationScheduleTime} />
              </div>

              <div className="operationnotes-form-row">
                <label>Operation Start Time: </label>
                <input
                  type="time"
                  value={formData.operationStartTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      operationStartTime: e.target.value,
                    })
                  }
                />
              </div>

              <div className="operationnotes-form-row">
                <label>Operation Finish Time: </label>
                <input
                  type="time"
                  value={formData.operationFinishTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      operationFinishTime: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="operationnotes-panel operationnotes-details">
            <div className="operationnotes-panel-content">
              <div className="operationnotes-form-row">
                <label>Operative Notes: </label>
                <input
                  type="text"
                  value={formData.operativeNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, operativeNotes: e.target.value })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Intra Operative Complications: </label>
                <input
                  type="text"
                  value={formData.intraOperativeComplications}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      intraOperativeComplications: e.target.value,
                    })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Intra Operative Notes: </label>
                <input
                  type="text"
                  value={formData.intraOperativeNotes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      intraOperativeNotes: e.target.value,
                    })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Amount of Blood Loss: </label>
                <input
                  type="text"
                  value={formData.bloodLossAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bloodLossAmount: e.target.value,
                    })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Amount of Transfused Blood (if any): </label>
                <input
                  type="text"
                  value={formData.transfusedBloodAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      transfusedBloodAmount: e.target.value,
                    })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>
                  Specimen Sent for Histopathology (If Yes, Details):{" "}
                </label>
                <input
                  type="text"
                  value={formData.histopathologySpecimenDetails}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      histopathologySpecimenDetails: e.target.value,
                    })
                  }
                />
              </div>

              <div className="operationnotes-form-row">
                <label>
                  Registry Number of All Implantable Devices (If Any):{" "}
                </label>
                <input
                  type="text"
                  value={formData.implantableDeviceRegistry}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      implantableDeviceRegistry: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="operationnotes-panel operationnotes-templates">
            <div className="operationnotes-panel-content">
              <div className="operationnotes-form-row">
                <label>NPO Status: </label>
                <input
                  type="text"
                  value={formData.npoStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, npoStatus: e.target.value })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Monitoring of Patient: </label>
                <input
                  type="text"
                  value={formData.patientMonitoring}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      patientMonitoring: e.target.value,
                    })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Nutritional Requirements: </label>
                <input
                  type="text"
                  value={formData.nutritionalRequirements}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nutritionalRequirements: e.target.value,
                    })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Wound Management (Details): </label>
                <input
                  type="text"
                  value={formData.woundManagement}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      woundManagement: e.target.value,
                    })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Any Specific Requirements: </label>
                <input
                  type="text"
                  value={formData.specificRequirements}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specificRequirements: e.target.value,
                    })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Case Type: </label>
                <input
                  type="text"
                  value={formData.caseType}
                  onChange={(e) =>
                    setFormData({ ...formData, caseType: e.target.value })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Numeric Pain Rating Scale: </label>
                <input
                  type="text"
                  value={formData.painRatingScaleNumeric}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      painRatingScaleNumeric: e.target.value,
                    })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Wong-Baker FACE Pain Rating Scale: </label>
                <input
                  type="text"
                  value={formData.painRatingScaleFace}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      painRatingScaleFace: e.target.value,
                    })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Remarks: </label>
                <input
                  type="text"
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
                />
              </div>
              <div className="operationnotes-form-row">
                <label>Notes for Discharge Summary: </label>
                <input
                  type="text"
                  value={formData.dischargeSummaryNotes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dischargeSummaryNotes: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="operationnotes-form-row">
          <button onClick={handleFormSubmit} className="submit-button">
            Submit
          </button>
        </div>

        {/* Room Status Section */}
      </div>
    </div>
  );
};
export default OperationNotes;
