import React, { useState, useEffect } from "react";
import "./DailyNursingAssessment.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../../api/api";
import CustomModal from "../../../../CustomModel/CustomModal";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";
import { toast } from "react-toastify";
const DailyNursingAssessment = ({ ipAdmission }) => {
  const patientData = useSelector((state) => state?.patient?.patientData);
  const [dailyNursingAssessment, setDailyNursingAssessment] = useState([]);
  const [isView, setIsView] = useState(false);
  if (!patientData && !ipAdmission) {
    return <div>Loading patient data...</div>;
  }

  const [formData, setFormData] = useState({
    ipAdmissionDto: {
      ipAdmmissionId: ipAdmission?.ipAdmmissionId,
    },
    admissionDiagnosis:
      patientData?.admissionUnderDoctorDetail?.diagnosis ||
      ipAdmission?.admissionUnderDoctorDetail?.diagnosis,
    currentDiagnosis: "",
    chronicDiseaseHistory: "",
    presentingComplaint: "",
    levelOfConsciousness: "",
    orientation: "",
    emotionalStatus: "Stable",
    potentialToPressureSore: "",
    pulse: "",
    bloodPressure: "",
    temperature: "",
    respiration: "",
    cough: "",
    arterialLine: "",
    traction: "",
    abdomen: "",
    oxygen: "",
    oxygenRate: "",
    dressing: "",
    vulnerable: "",
    potentialToFall: "",
    painAssessment: "",
    restraint: "",
    pressureSore: "",
    incidenceOfFall: "",
    nearMiss: "",
    bloodBodyFluidExposures: "",
    needleStickInjuries: "",
    nursingPlanDiagnosis: "",
    nursingPlanIntervention: "",
    nursingPlanOutcome: "",
    needleStickDetails: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchAllDailyAssessment = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/daily-nursing-assessments/admitted/${ipAdmission?.ipAdmmissionId}`
    );
    setDailyNursingAssessment(response.data);
  };

  useEffect(() => {
    fetchAllDailyAssessment();
  }, []);

  const submitAssessment = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/daily-nursing-assessments`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchAllDailyAssessment();
      toast.success("Data submitted successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting nursing assignment");
    }
  };

  return (
    <>
      <div className="DailyNursingAssessment-container">
        <div className="DailyNursingAssessment-header">
          <span>Daily Nursing Assessment</span>
          <button
            className="DailyNursingAssessment-viewBtn"
            onClick={() => setIsView(true)}
          >
            View
          </button>
        </div>
        <form>
          <div className="DailyNursingAssessment-content">
            <div className="DailyNursingAssessment-section">
              <div className="DailyNursingAssessment-Section-header">
                Patients Details
              </div>
              <div className="DailyNursingAssessment-data">
                <FloatingTextarea
                  label={"Admission Diagnosis"}
                  name="admissionDiagnosis"
                  type="text"
                  value={formData.admissionDiagnosis}
                  onChange={handleInputChange}
                />
              </div>
              <div className="DailyNursingAssessment-data">
                <FloatingTextarea
                  label={"Current Diagnosis"}
                  name="currentDiagnosis"
                  type="text"
                  value={formData.currentDiagnosis}
                  onChange={handleInputChange}
                />
              </div>
              <div className="DailyNursingAssessment-data">
                <FloatingTextarea
                  label={"Chronic Disease History"}
                  name="chronicDiseaseHistory"
                  type="text"
                  value={formData.chronicDiseaseHistory}
                  onChange={handleInputChange}
                />
              </div>

              <div className="DailyNursingAssessment-radio">
                <label>Presenting Complaint :</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="presentingComplaint"
                    value="Present"
                    checked={formData.presentingComplaint === "Present"}
                    onChange={handleInputChange}
                  />
                  Present
                  <input
                    type="radio"
                    name="presentingComplaint"
                    value="Not Present"
                    checked={formData.presentingComplaint === "Not Present"}
                    onChange={handleInputChange}
                  />
                  Not Present
                </div>
              </div>

              <div className="DailyNursingAssessment-radio">
                <label>Level of consciousness :</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="levelOfConsciousness"
                    value="Alert"
                    checked={formData.levelOfConsciousness === "Alert"}
                    onChange={handleInputChange}
                  />
                  Alert
                  <input
                    type="radio"
                    name="levelOfConsciousness"
                    value="Lethargic"
                    checked={formData.levelOfConsciousness === "Lethargic"}
                    onChange={handleInputChange}
                  />
                  Lethargic
                  <input
                    type="radio"
                    name="levelOfConsciousness"
                    value="Sleepy"
                    checked={formData.levelOfConsciousness === "Sleepy"}
                    onChange={handleInputChange}
                  />
                  Sleepy
                  <input
                    type="radio"
                    name="levelOfConsciousness"
                    value="Stuporous"
                    checked={formData.levelOfConsciousness === "Stuporous"}
                    onChange={handleInputChange}
                  />
                  Stuporous
                  <input
                    type="radio"
                    name="levelOfConsciousness"
                    value="Comatose"
                    checked={formData.levelOfConsciousness === "Comatose"}
                    onChange={handleInputChange}
                  />
                  Comatose
                </div>
              </div>
            </div>
            <div className="DailyNursingAssessment-section">
              <div className="DailyNursingAssessment-radio">
                <label>Orientation :</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="orientation"
                    value="Oriented to person,place,time & situation"
                    checked={
                      formData.orientation ===
                      "Oriented to person,place,time & situation"
                    }
                    onChange={handleInputChange}
                  />
                  Oriented to person,place,time & situation
                  <input
                    type="radio"
                    name="orientation"
                    value="Oriented to person,place &time"
                    checked={
                      formData.orientation === "Oriented to person,place &time"
                    }
                    onChange={handleInputChange}
                  />
                  Oriented to person,place &time
                  <input
                    type="radio"
                    name="orientation"
                    value="Oriented to person&place"
                    checked={
                      formData.orientation === "Oriented to person&place"
                    }
                    onChange={handleInputChange}
                  />
                  Oriented to person & place
                  <input
                    type="radio"
                    name="orientation"
                    value="Not oriented"
                    checked={formData.orientation === "Not oriented"}
                    onChange={handleInputChange}
                  />
                  Not oriented
                </div>
              </div>

              <div className="DailyNursingAssessment-radio">
                <label>Potential To Pressure Sore:</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="potentialToPressureSore"
                    value="Present"
                    checked={formData.potentialToPressureSore === "Present"}
                    onChange={handleInputChange}
                  />
                  Present
                  <input
                    type="radio"
                    name="potentialToPressureSore"
                    value="Not Present"
                    checked={formData.potentialToPressureSore === "Not Present"}
                    onChange={handleInputChange}
                  />
                  Not Present
                </div>
              </div>

              <div className="DailyNursingAssessment-radio">
                <label>Pulse :</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="pulse"
                    value="Absent"
                    checked={formData.pulse === "Absent"}
                    onChange={handleInputChange}
                  />
                  Absent
                  <input
                    type="radio"
                    name="pulse"
                    value="Feeble"
                    checked
                    onChange={handleInputChange}
                  />
                  Feeble
                  <input
                    type="radio"
                    name="pulse"
                    value="Normal"
                    checked={formData.pulse === "Normal"}
                    onChange={handleInputChange}
                  />
                  Normal
                  <input
                    type="radio"
                    name="pulse"
                    value=" Strong"
                    checked={formData.pulse === "Strong"}
                    onChange={handleInputChange}
                  />
                  Strong
                  <input
                    type="radio"
                    name="pulse"
                    value="Irregular"
                    checked={formData.pulse === "Irregular"}
                    onChange={handleInputChange}
                  />
                  Irregular
                </div>
              </div>

              <div className="DailyNursingAssessment-data">
                <FloatingInput
                  label={"BP(Systolic/Diastolic)"}
                  name="bloodPressure"
                  type="text"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                />
              </div>

              <div className="DailyNursingAssessment-radio">
                <label>Temperature :</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="temperature"
                    value="Febrile"
                    checked={formData.temperature === "Febrile"}
                    onChange={handleInputChange}
                  />
                  Febrile
                  <input
                    type="radio"
                    name="temperature"
                    value="Afebrile"
                    checked={formData.temperature === "Afebrile"}
                    onChange={handleInputChange}
                  />
                  Afebrile
                </div>
              </div>

              <div className="DailyNursingAssessment-radio">
                <label>Respiration :</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="respiration"
                    value="Regular"
                    checked={formData.respiration === "Regular"}
                    onChange={handleInputChange}
                  />
                  Regular
                  <input
                    type="radio"
                    name="respiration"
                    value="Irreguler"
                    checked={formData.respiration === "Irreguler"}
                    onChange={handleInputChange}
                  />
                  Irreguler
                  <input
                    type="radio"
                    name="respiration"
                    value="Dyspnic"
                    checked={formData.respiration === "Dyspnic"}
                    onChange={handleInputChange}
                  />
                  Dyspnic
                </div>
              </div>
              <div className="DailyNursingAssessment-radio">
                <label>Cough :</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="cough"
                    value="None"
                    checked={formData.cough === "None"}
                    onChange={handleInputChange}
                  />
                  None
                  <input
                    type="radio"
                    name="cough"
                    value="Productive"
                    checked={formData.cough === "Productive"}
                    onChange={handleInputChange}
                  />
                  Productive
                  <input
                    type="radio"
                    name="cough"
                    value="Non-Productive"
                    checked={formData.cough === "Non-Productive"}
                    onChange={handleInputChange}
                  />
                  Non-Productive
                </div>
              </div>
              <div className="DailyNursingAssessment-radio">
                <label>Arterial line :</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="arterialLine"
                    value="Yes"
                    checked={formData.arterialLine === "Yes"}
                    onChange={handleInputChange}
                  />
                  Yes
                  <input
                    type="radio"
                    name="arterialLine"
                    value="No"
                    checked={formData.arterialLine === "No"}
                    onChange={handleInputChange}
                  />
                  No
                </div>
              </div>
              <div className="DailyNursingAssessment-radio">
                <label>Traction :</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="traction"
                    value="Yes"
                    checked={formData.traction === "Yes"}
                    onChange={handleInputChange}
                  />
                  Yes
                  <input
                    type="radio"
                    name="traction"
                    value="No"
                    checked={formData.traction === "No"}
                    onChange={handleInputChange}
                  />
                  No
                </div>
              </div>
              <div className="DailyNursingAssessment-radio">
                <label>Abdomen :</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="abdomen"
                    value="Soft"
                    checked={formData.abdomen === "Soft"}
                    onChange={handleInputChange}
                  />
                  Soft
                  <input
                    type="radio"
                    name="abdomen"
                    value="Distended"
                    checked={formData.abdomen === "Distended"}
                    onChange={handleInputChange}
                  />
                  Distended
                </div>
              </div>
              <div className="DailyNursingAssessment-radio">
                <label>Oxygen :</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="oxygen"
                    value=" Not applicable"
                    checked={formData.oxygen === "Not applicable"}
                    onChange={handleInputChange}
                  />
                  Not applicable
                  <input
                    type="radio"
                    name="oxygen"
                    value="Nasal Cannula"
                    checked={formData.oxygen === "Nasal Cannula"}
                    onChange={handleInputChange}
                  />
                  Nasal Cannula
                  <input
                    type="radio"
                    name="oxygen"
                    value="Mask"
                    checked={formData.oxygen === "Mask"}
                    onChange={handleInputChange}
                  />
                  Mask
                  <input
                    type="radio"
                    name="oxygen"
                    value="Venturi mask"
                    checked={formData.oxygen === "Venturi mask"}
                    onChange={handleInputChange}
                  />
                  Venturi mask
                  <input
                    type="radio"
                    name="oxygen"
                    value="Bi-pap"
                    checked={formData.oxygen === "Bi-pap"}
                    onChange={handleInputChange}
                  />
                  Bi-pap
                  <input
                    type="radio"
                    name="oxygen"
                    value="Ventilator support"
                    checked={formData.oxygen === "Ventilator support"}
                    onChange={handleInputChange}
                  />
                  Ventilator support
                </div>
              </div>

              <div className="DailyNursingAssessment-data">
                <FloatingInput
                  label={"Oxygen(rate/min)"}
                  name="oxygenRate"
                  type="text"
                  value={formData.oxygenRate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="DailyNursingAssessment-radio">
                <label>Dressing :</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="dressing"
                    value="Applicable"
                    checked={formData.dressing === "Applicable"}
                    onChange={handleInputChange}
                  />
                  Applicable
                  <input
                    type="radio"
                    name="dressing"
                    value="Dry"
                    checked={formData.dressing === "Dry"}
                    onChange={handleInputChange}
                  />
                  Dry
                  <input
                    type="radio"
                    name="dressing"
                    value="Soakage"
                    checked={formData.dressing === "Soakage"}
                    onChange={handleInputChange}
                  />
                  Soakage
                </div>
              </div>
              <div className="DailyNursingAssessment-radio">
                <label>Vulnerable :</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="vulnerable"
                    value="Yes"
                    checked={formData.vulnerable === "Yes"}
                    onChange={handleInputChange}
                  />
                  Yes
                  <input
                    type="radio"
                    name="vulnerable"
                    value="No"
                    checked={formData.vulnerable === "No"}
                    onChange={handleInputChange}
                  />
                  No
                </div>
              </div>

              <div className="DailyNursingAssessment-radio">
                <label>Potential to fall :</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="potentialToFall"
                    value="Present"
                    checked={formData.potentialToFall === "Present"}
                    onChange={handleInputChange}
                  />
                  Present
                  <input
                    type="radio"
                    name="potentialToFall"
                    value="Not Present"
                    checked={formData.potentialToFall === "Not Present"}
                    onChange={handleInputChange}
                  />
                  Not Present
                </div>
              </div>
              <div className="DailyNursingAssessment-radio">
                <label>Pain assessment :</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="painAssessment"
                    value="Present"
                    onChange={handleInputChange}
                    checked={formData.painAssessment === "Present"}
                  />
                  Present
                  <input
                    type="radio"
                    name="painAssessment"
                    value="Not Present"
                    checked={formData.painAssessment === "Not Present"}
                    onChange={handleInputChange}
                  />
                  Not Present
                </div>
              </div>
              <div className="DailyNursingAssessment-radio">
                <label>Restraint:</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="restraint"
                    value="Yes"
                    checked={formData.restraint === "Yes"}
                    onChange={handleInputChange}
                  />
                  Yes
                  <input
                    type="radio"
                    name="restraint"
                    value="No"
                    checked={formData.restraint === "No"}
                    onChange={handleInputChange}
                  />
                  No
                </div>
              </div>
            </div>
            <div className="DailyNursingAssessment-section">
              <div className="DailyNursingAssessment-radio">
                <label>Pressure Sore:</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="pressureSore"
                    value="Yes"
                    checked={formData.pressureSore === "Yes"}
                    onChange={handleInputChange}
                  />
                  Yes
                  <input
                    type="radio"
                    name="pressureSore"
                    value="No"
                    checked={formData.pressureSore === "No"}
                    onChange={handleInputChange}
                  />
                  No
                </div>
              </div>

              {formData.pressureSore === "Yes" && (
                <>
                  <div className="DailyNursingAssessment-radio">
                    <div className="DailyNursingAssessment-radio-input">
                      <label>Stage:</label>
                      <input
                        type="radio"
                        name="pressureSoreStage"
                        value="I"
                        onChange={handleInputChange}
                      />
                      I
                      <input
                        type="radio"
                        name="pressureSoreStage"
                        value="II"
                        onChange={handleInputChange}
                      />
                      II
                      <input
                        type="radio"
                        name="pressureSoreStage"
                        value="III"
                        onChange={handleInputChange}
                      />
                      III
                      <input
                        type="radio"
                        name="pressureSoreStage"
                        value="IV"
                        onChange={handleInputChange}
                      />
                      IV
                    </div>
                  </div>

                  <div className="DailyNursingAssessment-radio">
                    <label>Skin Status:</label>
                    <div className="DailyNursingAssessment-radio-input">
                      <input
                        type="radio"
                        name="skinStatus"
                        value="Intact"
                        onChange={handleInputChange}
                      />
                      Intact
                      <input
                        type="radio"
                        name="skinStatus"
                        value="Non Intact"
                        onChange={handleInputChange}
                      />
                      Non Intact
                    </div>
                  </div>

                  <div className="DailyNursingAssessment-radio">
                    <label>Care of Pressure Sore:</label>
                    <div className="DailyNursingAssessment-radio-input">
                      <input
                        type="radio"
                        name="careOfPressureSore"
                        value="Kept Open"
                        onChange={handleInputChange}
                      />
                      Kept Open
                      <input
                        type="radio"
                        name="careOfPressureSore"
                        value="Dressing"
                        onChange={handleInputChange}
                      />
                      Dressing
                    </div>
                  </div>

                  <div className="DailyNursingAssessment-data">
                    <FloatingTextarea
                      label={"Cleaned With"}
                      name="cleanedWith"
                      value={formData.cleanedWith}
                      onChange={handleInputChange}
                      restrictions={{ varchar: true }}
                    />
                  </div>

                  <div className="DailyNursingAssessment-radio">
                    <label>Position:</label>
                    <div className="DailyNursingAssessment-radio-input">
                      <input
                        type="radio"
                        name="position"
                        value="Left Lateral"
                        onChange={handleInputChange}
                      />
                      Left Lateral
                      <input
                        type="radio"
                        name="position"
                        value="Right Lateral"
                        onChange={handleInputChange}
                      />
                      Right Lateral
                      <input
                        type="radio"
                        name="position"
                        value="Prone"
                        onChange={handleInputChange}
                      />
                      Prone
                      <input
                        type="radio"
                        name="position"
                        value="Supine"
                        onChange={handleInputChange}
                      />
                      Supine
                    </div>
                  </div>

                  <div className="DailyNursingAssessment-radio">
                    <label>Pressure Relieving Aids:</label>
                    <div className="DailyNursingAssessment-radio-input">
                      <input
                        type="radio"
                        name="pressureRelievingAids"
                        value="Alpha Mattress"
                        onChange={handleInputChange}
                      />
                      Alpha Mattress
                      <input
                        type="radio"
                        name="pressureRelievingAids"
                        value="Water Gloves"
                        onChange={handleInputChange}
                      />
                      Water Gloves
                      <input
                        type="radio"
                        name="pressureRelievingAids"
                        value="Extra Pillows"
                        onChange={handleInputChange}
                      />
                      Extra Pillows
                      <input
                        type="radio"
                        name="pressureRelievingAids"
                        value="Air Ring"
                        onChange={handleInputChange}
                      />
                      Air Ring
                      <input
                        type="radio"
                        name="pressureRelievingAids"
                        value="Not Applicable"
                        onChange={handleInputChange}
                      />
                      Not Applicable
                    </div>
                  </div>
                </>
              )}

              <div className="DailyNursingAssessment-radio">
                <label>Incidence of Fall:</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="incidenceOfFall"
                    value="Yes"
                    onChange={handleInputChange}
                    checked={formData.incidenceOfFall === "Yes"}
                  />
                  Yes
                  <input
                    type="radio"
                    name="incidenceOfFall"
                    value="No"
                    onChange={handleInputChange}
                    checked={formData.incidenceOfFall === "No"}
                  />
                  No
                </div>
              </div>

              <div className="DailyNursingAssessment-Section-header">
                Hospital Internal Use
              </div>

              <div className="DailyNursingAssessment-radio">
                <label>Near Miss:</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="nearMiss"
                    value="Yes"
                    onChange={handleInputChange}
                    checked={formData.nearMiss === "Yes"}
                  />
                  Yes
                  <input
                    type="radio"
                    name="nearMiss"
                    value="No"
                    onChange={handleInputChange}
                    checked={formData.nearMiss === "No"}
                  />
                  No
                </div>
              </div>

              <div className="DailyNursingAssessment-radio">
                <label>Blood Body Fluid Exposure:</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="bloodBodyFluidExposures"
                    value="Yes"
                    onChange={handleInputChange}
                    checked={formData.bloodBodyFluidExposures === "Yes"}
                  />
                  Yes
                  <input
                    type="radio"
                    name="bloodBodyFluidExposures"
                    value="No"
                    onChange={handleInputChange}
                    checked={formData.bloodBodyFluidExposures === "No"}
                  />
                  No
                </div>
              </div>

              <div className="DailyNursingAssessment-radio">
                <label>Needle Stick Injuries:</label>
                <div className="DailyNursingAssessment-radio-input">
                  <input
                    type="radio"
                    name="needleStickInjuries"
                    value="Yes"
                    onChange={handleInputChange}
                    checked={formData.needleStickInjuries === "Yes"}
                  />
                  Yes
                  <input
                    type="radio"
                    name="needleStickInjuries"
                    value="No"
                    onChange={handleInputChange}
                    checked={formData.needleStickInjuries === "No"}
                  />
                  No
                </div>
              </div>

              <div className="DailyNursingAssessment-Section-header">
                Care Plan
              </div>

              <div className="DailyNursingAssessment-data">
               
                <FloatingTextarea
                  label={"Nursing Plan Diagnosis"}
                  name="nursingPlanOutcome"
                  value={formData.nursingPlanOutcome}
                  onChange={handleInputChange}
                  restrictions={{varchar:true}}
                />
              </div>

              <div className="DailyNursingAssessment-data">
                
                <FloatingTextarea
                  label={"Nursing Plan Intervention"}
                  name="nursingPlanIntervention"
                  value={formData.nursingPlanIntervention}
                  onChange={handleInputChange}
                  restrictions={{varchar:true}}
                />
              </div>

              <div className="DailyNursingAssessment-data">
                
                 <FloatingTextarea
                  label={"Needle Stick Injuries Details"}
                  name="needleStickInjuries"
                  value={formData.needleStickInjuries}
                  onChange={handleInputChange}
                  restrictions={{varchar:true}}
                />
              </div>
            </div>
          </div>
          <input
            type="button"
            className="nursingAssessmentbtn"
            value="Submit"
            onClick={submitAssessment}
          />
        </form>
      </div>
      {isView && (
        <CustomModal isOpen={isView} onClose={() => setIsView(false)}>
          <div className="DailyNursingAssessment-viewCon">
            <div className="DailyNursingAssessment-ViewHeader">
              <h3>Daily Nursing Assessment</h3>
            </div>
            <div className="DailyNursingAssessment-table-container">
              <table>
                <thead>
                  <tr>
                    {[
                      "Admission Diagnosis",
                      "Current Diagnosis",
                      "Chronic Disease History",
                      "Presenting Complaint",
                      "Level of Consciousness",
                      "Orientation",
                      "Emotional Status",
                      "Potential to Pressure Sore",
                      "Pulse",
                      "Blood Pressure",
                      "Temperature",
                      "Respiration",
                      "Cough",
                      "Arterial Line",
                      "Traction",
                      "Abdomen",
                      "Oxygen",
                      "Oxygen Rate",
                      "Dressing",
                      "Vulnerable",
                      "Potential to Fall",
                      "Pain Assessment",
                      "Restraint",
                      "Pressure Sore",
                      "Pressure Sore Stage",
                      "Incidence of Fall",
                      "Skin Status",
                      "Care of Pressure Sore",
                      "Position",
                      "Pressure Relieving Aids",
                      "Near Miss",
                      "Blood Body Fluid Exposures",
                      "Needle Stick Injuries",
                      "Nursing Plan Diagnosis",
                      "Nursing Plan Intervention",
                      "Nursing Plan Outcome",
                      "Needle Stick Details",
                    ].map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dailyNursingAssessment.length > 0 ? (
                    dailyNursingAssessment.map((assessment, index) => (
                      <tr key={index}>
                        {[
                          assessment.admissionDiagnosis,
                          assessment.currentDiagnosis,
                          assessment.chronicDiseaseHistory,
                          assessment.presentingComplaint,
                          assessment.levelOfConsciousness,
                          assessment.orientation,
                          assessment.emotionalStatus,
                          assessment.potentialToPressureSore,
                          assessment.pulse,
                          assessment.bloodPressure,
                          assessment.temperature,
                          assessment.respiration,
                          assessment.cough,
                          assessment.arterialLine,
                          assessment.traction,
                          assessment.abdomen,
                          assessment.oxygen,
                          assessment.oxygenRate,
                          assessment.dressing,
                          assessment.vulnerable,
                          assessment.potentialToFall,
                          assessment.painAssessment,
                          assessment.restraint,
                          assessment.pressureSore,
                          assessment.pressureSoreStage,
                          assessment.incidenceOfFall,
                          assessment.skinStatus,
                          assessment.careOfPressureSore,
                          assessment.position,
                          assessment.pressureRelievingAids,
                          assessment.nearMiss,
                          assessment.bloodBodyFluidExposures,
                          assessment.needleStickInjuries,
                          assessment.nursingPlanDiagnosis,
                          assessment.nursingPlanIntervention,
                          assessment.nursingPlanOutcome,
                          assessment.needleStickDetails,
                        ].map((value, idx) => (
                          <td key={idx}>{value}</td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={37} style={{ textAlign: "center" }}>
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default DailyNursingAssessment;
