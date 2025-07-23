import React, { useState,useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./DischargeWordole.css";
import { useNavigate } from "react-router-dom";
import Investigation from "./dischargenavbarbutton/investigation";
import Pharmacy from "./dischargenavbarbutton/pharmacy";
import PharmacySummary from "./dischargenavbarbutton/pharmacysummary";
import OperationDetails from "./dischargenavbarbutton/oprationdetails";
import IcdCodes from "./dischargenavbarbutton/icdcodes";
import RadiologyReport from "./dischargenavbarbutton/radiologyreport";
import Procedure from "./dischargenavbarbutton/procedure";
import MedicationAdviced from "./dischargenavbarbutton/medicationadviced";

const DischargeWordole = () => {
  const [dischargeData, setDischargeData] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [chiefComplaints, setChiefComplaints] = useState("");
  const [clinicalHistory, setClinicalHistory] = useState("");
  const [pastHistory, setPastHistory] = useState("");
  const [examination, setExamination] = useState("");
  const [operationNotes, setOperationNotes] = useState("");
  const [hospitalCourse, setHospitalCourse] = useState("");
  const [medication, setMedication] = useState("");
  const [dischargeCondition, setDischargeCondition] = useState("");
  const [medicationAdvice, setMedicationAdvice] = useState("");
  const [investigation, setInvestigation] = useState("");
  const [preventiveAdvice, setPreventiveAdvice] = useState("");
  const [diet, setDiet] = useState("");
  const [activeComponent, setActiveComponent] = useState(null);


  const navigate = useNavigate();

  


  useEffect(() => {
    // Fetch all patients data
    axios
      .get("http://192.168.0.115:8080/api/discharges")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  const handleIpNoChange = (event) => {
    const dischargeId = event.target.value;
    const patient = patients.find((p) => {p.dischargeId === dischargeId; return p});
    console.log(patient);
    
    setSelectedPatient(patient || null);
    if (patient) {
      setDiagnosis(patient.diagnosis || "");
      setChiefComplaints(patient.chiefComplaintsAdmission || "");
      setMedicationAdvice(patient.medicationAdvice || "");
    }
  };

  const saveData = async () => {
    const data = {
      diagnosis,
      chiefComplaints,
      clinicalHistory,
      pastHistory,
      examination,
      operationNotes,
      hospitalCourse,
      medication,
      dischargeCondition,
      medicationAdvice,
      investigation,
      preventiveAdvice,
      diet,
    };

    try {
      const response = await fetch("http://192.168.0.115:8080/api/discharges", {
        method: "POST", // or 'PUT' if you're updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send data as a JSON string
      });

      if (response.ok) {
        const result = await response.json();
        alert("Data saved successfully!");
      } else {
        alert("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("An error occurred while saving data");
    }
  };
  
  return (
    <div className="dischargewordoletemplate-container">
      <div className="dischargewordoletemplate-header">
        <h3>Discharge Summary wordol</h3>
      </div>

      <div className="dischargewordoletemplate-patient-details">
      <div className="dischargewordoletemplate-row">
        <div className="dischargwordoleformcontent">
          <label>IP No *</label>
          <select onChange={handleIpNoChange}>
          <option value="">Select IP No</option>
          {patients.map((patient) => (
            <option key={patient.ipNo} value={patient.dischargeId}>
              {patient.ipNo}
            </option>
          ))}
        </select>
        </div>
        <div className="dischargwordoleformcontent">
                <label>MR No</label>
                <input type="text" value={selectedPatient ? selectedPatient.mrNo : ""} readOnly />
              </div>
              <div className="dischargwordoleformcontent">
                <label>Patient Name</label>
                <input type="text" value={selectedPatient?selectedPatient.patientName:""} readOnly />
              </div>
       
       
            <div className="dischargewordoletemplate-row">
              <div className="dischargwordoleformcontent">
                <label>Age</label>
                <input type="text" value={selectedPatient?selectedPatient.age:""} readOnly />
              </div>
              <div className="dischargwordoleformcontent">
                <label>Sex</label>
                <input type="text" value={selectedPatient ?selectedPatient.sex:""} readOnly />
              </div>
              <div className="dischargwordoleformcontent">
                <label>Address</label>
                <input type="text" value={selectedPatient ?selectedPatient.address:""} readOnly />
              </div>
            </div>
          <br />
    
        <div className="dischargwordoleformcontent">
          <label>Address</label>
          <input type="text" value={selectedPatient ?selectedPatient.address:""} />
        </div>
       
      </div>

      <div className="dischargewordoletemplate-row">
        <div className="dischargwordoleformcontent">
          <label>Date of Admission</label>
          <input type="text"  value={selectedPatient ? selectedPatient.dateOfAdmission : ""} />
        </div>
        <div className="dischargwordoleformcontent">
          <label>Time of Admission</label>
          <input type="text" value={selectedPatient ?selectedPatient.timeOfAdmission:""} />
        </div>
        <div className="dischargwordoleformcontent">
          <label>Consultant Doctor</label>
          <input type="text" value={selectedPatient ?selectedPatient.consultantDoctor:""} />
        </div>
      </div>

      <div className="dischargewordoletemplate-row">
        <div className="dischargwordoleformcontent">
          <label>Pay Type</label>
          <input type="text" value={selectedPatient ?selectedPatient.payType:""} />
        </div>
        <div className="dischargwordoleformcontent">
          <label>Bed No</label>
          <input type="text" value={selectedPatient?selectedPatient.bedNo:""}  />
        </div>
        <div className="dischargwordoleformcontent">
          <label>Room No</label>
          <input type="text" value={selectedPatient?selectedPatient.roomNo:""} />
        </div>
      </div>

      <div className="dischargewordoletemplate-row">
        <div className="dischargwordoleformcontent">
          <label>Date of Discharge</label>
          <input type="text" value={selectedPatient?selectedPatient.dateOfAdmission:""} />
        </div>
        <div className="dischargwordoleformcontent">
          <label>Time of Discharge</label>
          <input type="text" value={selectedPatient?selectedPatient.timeOfDischarge:""} />
        </div>
        <div className="dischargwordoleformcontent">
          <label>Source Name</label>
          <input type="text" value={selectedPatient?selectedPatient.sourceName:""} />
        </div>
      </div>

      <div className="dischargewordoletemplate-row">
        <div className="dischargwordoleformcontent">
          <label>Patient Type</label>
          <input type="text" value={selectedPatient?selectedPatient.patientType:""} />
        </div>
        <div className="dischargwordoleformcontent">
          <label>Discharge Type</label>
          <input type="text" value={selectedPatient?selectedPatient.dischargeType:""} />
        </div>
        <div className="dischargwordoleformcontent">
          <label>Shifted To</label>
          <input type="text"value={selectedPatient?selectedPatient.shiftedTo:""} />
        </div>
      </div>

      <div className="dischargewordoletemplate-row">
        <div className="dischargwordoleformcontent">
          <label>Template Name *</label>
          <input type="text" value={selectedPatient?selectedPatient.templateName:""}  />
        </div>
        <div className="dischargwordoleformcontent">
          <label>FollowUp</label>
          <input type="text" value={selectedPatient?selectedPatient.followUp:""} />
        </div>
        <div className="dischargwordoleformcontent">
          <label>Symptoms</label>
          <input type="text" value={selectedPatient?selectedPatient.symptoms:""}  />
        </div>
      </div>

      <div className="dischargewordoletemplate-row">
        <div className="dischargwordoleformcontent">
          <label>Emergency Contact</label>
          <input type="text" value={selectedPatient?selectedPatient.emergencyContact:""} />
        </div>
        <div></div><div></div>
      </div>
    
    </div>
  
      
    

      

      <div className="dischargewordoletemplate-section">
        <label>Diagnosis</label>
        <ReactQuill
          theme="snow"
          value={diagnosis}
          onChange={setDiagnosis}
          className="dischargewordoletemplate-editor"
        />
      </div>

      <div className="dischargewordoletemplate-section">
        <label>Chief Complaints & Reason for Admission</label>
        <ReactQuill
          theme="snow"
          value={chiefComplaints}
          onChange={setChiefComplaints}
          className="dischargewordoletemplate-editor"
        />
      </div>

      <div className="dischargewordoletemplate-section">
        <label>Clinical History / Procedure</label>
        <ReactQuill
          theme="snow"
          value={clinicalHistory}
          onChange={setClinicalHistory}
          className="dischargewordoletemplate-editor"
        />
      </div>

      <div className="dischargewordoletemplate-section">
        <label>Past and Personal History</label>
        <ReactQuill
          theme="snow"
          value={pastHistory}
          onChange={setPastHistory}
          className="dischargewordoletemplate-editor"
        />
      </div>

      <div className="dischargewordoletemplate-section">
        <label>Examination at Admission</label>
        <ReactQuill
          theme="snow"
          value={examination}
          onChange={setExamination}
          className="dischargewordoletemplate-editor"
        />
      </div>

      <div className="dischargewordoletemplate-section">
        <label>Operation Notes</label>
        <ReactQuill
          theme="snow"
          value={operationNotes}
          onChange={setOperationNotes}
          className="dischargewordoletemplate-editor"
        />
      </div>

      <div className="dischargewordoletemplate-section">
        <label>Hospital Course & Treatment</label>
        <ReactQuill
          theme="snow"
          value={hospitalCourse}
          onChange={setHospitalCourse}
          className="dischargewordoletemplate-editor"
        />
      </div>

      <div className="dischargewordoletemplate-section">
        <label>Medication During Hospital Stay</label>
        <ReactQuill
          theme="snow"
          value={medication}
          onChange={setMedication}
          className="dischargewordoletemplate-editor"
        />
      </div>

      <div className="dischargewordoletemplate-section">
        <label>Condition at Discharge</label>
        <ReactQuill
          theme="snow"
          value={dischargeCondition}
          onChange={setDischargeCondition}
          className="dischargewordoletemplate-editor"
        />
      </div>

      <div className="dischargewordoletemplate-section">
        <label>Medication Advice</label>
        <ReactQuill
          theme="snow"
          value={medicationAdvice}
          onChange={setMedicationAdvice}
          className="dischargewordoletemplate-editor"
        />
      </div>

      <div className="dischargewordoletemplate-section">
        <label>Other Investigations</label>
        <ReactQuill
          theme="snow"
          value={investigation}
          onChange={setInvestigation}
          className="dischargewordoletemplate-editor"
        />
      </div>

      <div className="dischargewordoletemplate-section">
        <label>Preventive Advice</label>
        <ReactQuill
          theme="snow"
          value={preventiveAdvice}
          onChange={setPreventiveAdvice}
          className="dischargewordoletemplate-editor"
        />
      </div>

      <div className="dischargewordoletemplate-section">
        <label>Diet</label>
        <ReactQuill
          theme="snow"
          value={diet}
          onChange={setDiet}
          className="dischargewordoletemplate-editor"
        />
      </div>
      <div className="dischargewordoletemplate-section">
        <button onClick={saveData} className="dischargewardrol-save-button">
          Save
        </button>
      </div>
      <div  className="discargewordolenavbuttons">
      <div className="discargewordolenavbuttons">
        <button
          className="discargewordolenavbuttons-button"
          onClick={() => setActiveComponent("investigation")}
        >
          Investigation
        </button>
        <button className="discargewordolenavbuttons-button" onClick={()=>setActiveComponent("pharmacy")}>Pharmacy detail</button>
        <button className="discargewordolenavbuttons-button" onClick={()=>setActiveComponent("pharmacysummury")}>Pharmacy Summury</button>
        <button className="discargewordolenavbuttons-button" onClick={()=>setActiveComponent("oprationdetails")}>Opration Details</button>
        <button className="discargewordolenavbuttons-button" onClick={()=>setActiveComponent("icdcode")}>ICD Codes</button>
        <button className="discargewordolenavbuttons-button" onClick={()=>setActiveComponent("radiologyrepo")}>Radiology Reports</button>
        <button className="discargewordolenavbuttons-button" onClick={()=>setActiveComponent("procedure")}>Procedures</button>
        <button className="discargewordolenavbuttons-button" onClick={()=>setActiveComponent("medicationadvice")}>Medications Adviced</button>
      </div>

     </div>
     <div>
        {activeComponent === "investigation" && <Investigation />}
        {activeComponent === "pharmacy" && <Pharmacy />}
        {activeComponent === "pharmacysummury" && <PharmacySummary/>}
        {activeComponent === "oprationdetails" && <OperationDetails/>}
        {activeComponent === "icdcode" && <IcdCodes/>}
        {activeComponent === "radiologyrepo" && <RadiologyReport/>}
        {activeComponent === "procedure" && <Procedure/>}
        {activeComponent === "medicationadvice" && <MedicationAdviced/>}
      </div>
      
    
    </div>
  );
};

export default DischargeWordole;
