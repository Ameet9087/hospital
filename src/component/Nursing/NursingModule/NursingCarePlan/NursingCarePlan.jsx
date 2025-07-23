import React, { useState, useEffect } from "react";
import "./NursingCarePlan.css";
// import PopupTable from "../PopupTable/PopupTable";
import PopupTable from "../PopUpTableBedTransfer/PopupTable";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";
import { toast } from "react-toastify";
const NursingCarePlan = ({ patientId, ipAdmission }) => {
  // const [selectedIPNo, setSelectedIPNo] = useState(null);
  // const ipNoHeading = ["IpNo", "Patient Name  ", " Age"];
  // const [activePopup, setActivePopup] = useState(null);
  // const [ipNoData, setIpNoData] = useState([]);

  const patientData = useSelector((state) => state.patient?.patientData);

  if (!patientData && !ipAdmission) {
    return <div>Loading patient data...</div>;
  }

  const [formData, setFormData] = useState({
    activityIntolence: "",
    knowledgeDeficit: "",
    hyperthermia: "",
    alterOxygenSaturation: "",
    painAcute: "",
    anxiety: "",
    painChronic: "",
    constipation: "",
    diarrhoea: "",
    fluidVolumeDeficit: "",
    excessFluidVolume: "",
    impairedOralMucousMembrane: "",
    impairedPhysicalMobility: "",
    impairedSkinIntegrity: "",
    impairedUrinaryEliminationRetension: "",
    infectionSurgicalSite: "",
    infectionVentilatorAssociate: "",
    unstableBloodGlucoseHyperglycemia: "",
    unstableBloodGlucoseHypoglycemia: "",
    fall: "",
    selfCareDificitFeeding: "",
    selfCareDificiteDressingAndGrooming: "",
    selfCareDificitAmbulance: "",
    selfCareDificiteToileting: "",
    acuteConfusionPsychosis: "",
    impairedUrinaryElimination: "",
    impairedVerbalCommunication: "",
    ineffectiveAirwayClearance: "",
    aspiration: "",
    bleeding: "",
    pressureUlcer: "",
    infectionUrinaryTract: "",
    disturbToughtProces: "",
    fatigue: "",
    imbalanceNutritionMoreThanBodyRequirement: "",
    imbalanceNutritionLessThanBodyRequirement: "",
    impairedSwallowing: "",
    ineffectiveBreathingPattern: "",
    ineffectiveCoping: "",
    alteredSleepPattern: "",
    impairedParenting: "",
    parentAnxiety: "",
    hyperbilirubinemia: "",
    disturbanceInBodyImage: "",
    seizures: "",
    nursingPlanForTheShift: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nursingDiagnosesList = Object.keys(formData).filter(
    (key) => key !== "ipAdmissionDTO" && key !== "nursingPlanForTheShift"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      ipAdmissionDTO: { ipAdmmissionId: ipAdmission?.ipAdmmissionId },
    };

    console.log(payload);

    const url = `${API_BASE_URL}/nursing-care`;
    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFormData({
        activityIntolence: "",
        knowledgeDeficit: "",
        hyperthermia: "",
        alterOxygenSaturation: "",
        painAcute: "",
        anxiety: "",
        painChronic: "",
        constipation: "",
        diarrhoea: "",
        fluidVolumeDeficit: "",
        excessFluidVolume: "",
        impairedOralMucousMembrane: "",
        impairedPhysicalMobility: "",
        impairedSkinIntegrity: "",
        impairedUrinaryEliminationRetension: "",
        infectionSurgicalSite: "",
        infectionVentilatorAssociate: "",
        unstableBloodGlucoseHyperglycemia: "",
        unstableBloodGlucoseHypoglycemia: "",
        fall: "",
        selfCareDificitFeeding: "",
        selfCareDificiteDressingAndGrooming: "",
        selfCareDificitAmbulance: "",
        selfCareDificiteToileting: "",
        acuteConfusionPsychosis: "",
        impairedUrinaryElimination: "",
        impairedVerbalCommunication: "",
        ineffectiveAirwayClearance: "",
        aspiration: "",
        bleeding: "",
        pressureUlcer: "",
        infectionUrinaryTract: "",
        disturbToughtProces: "",
        fatigue: "",
        imbalanceNutritionMoreThanBodyRequirement: "",
        imbalanceNutritionLessThanBodyRequirement: "",
        impairedSwallowing: "",
        ineffectiveBreathingPattern: "",
        ineffectiveCoping: "",
        alteredSleepPattern: "",
        impairedParenting: "",
        parentAnxiety: "",
        hyperbilirubinemia: "",
        disturbanceInBodyImage: "",
        seizures: "",
        nursingPlanForTheShift: "",
      });
      console.log("Response:", response.data);
      toast.success("Data submitted successfully!");
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("An error occurred while submitting data.");
    }
  };

  const handleDiagnosisChange = (e, diagnosis) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [diagnosis]: value,
    }));
  };

  // useEffect(() => {
  //   const fetchIpNoData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `${API_BASE_URL}/api/patients/get-all-ipNos`
  //       );
  //       console.log(response.data);
  //       setIpNoData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching IP No data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchIpNoData();
  // }, []);

  // const handleSelect = (data) => {
  //   console.log("Selected Data:", data);
  //   if (activePopup === "IPNO") {
  //     setSelectedIPNo(data);
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       uhid: data.uhid,
  //       ipAdmissionId: data.inPatientId,
  //       patientName: `${data.firstName} ${data.lastName}`,
  //       age: data.age,
  //     }));
  //   }
  //   setActivePopup(null);
  // };

  // const getPopupData = () => {
  //   if (activePopup === "IPNO") {
  //     return {
  //       columns: ipNoHeading,
  //       data: ipNoData,
  //     };
  //   }
  //   return { columns: [], data: [] };
  // };
  // const { columns, data } = getPopupData();

  return (
    <div className="NursingCarePlan-container">
      <div className="NursingCarePlan-header">
        <span>Nursing Care Plan STD</span>
      </div>

      <form>
        <div className="NursingCarePlan-content">
          {/* <div className="NursingCarePlan-form-section">
            <div className="NursingCarePlan-Section-header">
              Patient Details
            </div>

            <div className="NursingCarePlan-data">
              <label>UHID</label>
              <input
                name="uhid"
                type="text"
                value={
                  patientData?.patient?.uhid ||
                  ipAdmission?.patient?.patient.uhid
                }
                onChange={handleInputChange}
              />
            </div>
            <div className="NursingCarePlan-data">
              <label>IP No:</label>
              <input
                type="text"
                name="ipNo"
                value={patientData?.ipAdmissionId || ipAdmission?.ipAdmissionId}
                onChange={handleInputChange}
                placeholder="IP No"
              />
            </div>
            <div className="NursingCarePlan-data">
              <label>Patient Name:</label>
              <input
                type="text"
                name="patientName"
                value={`${
                  patientData?.patient?.firstName ||
                  ipAdmission?.patient?.patient?.firstName
                } ${
                  patientData?.patient?.lastName ||
                  ipAdmission?.patient?.patient?.lastName
                }`}
                onChange={handleInputChange}
                placeholder="Patient Name"
              />
            </div>
            <div className="NursingCarePlan-data">
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={
                  patientData?.patient?.age ||
                  ipAdmission?.patient?.patient?.age
                }
                onChange={handleInputChange}
                placeholder="Age"
              />
            </div>
            <div className="NursingCarePlan-data">
              <label>Sex:</label>
              <input
                type="text"
                name="sex"
                value={
                  patientData?.patient?.gender ||
                  ipAdmission?.patient?.patient?.gender
                }
                onChange={handleInputChange}
                placeholder="Sex"
              />
            </div>
            <div className="NursingCarePlan-data">
              <label>Date of Admission:</label>
              <input
                type="date"
                name="doa"
                value={patientData?.admissionDate || ipAdmission?.admissionDate}
                onChange={handleInputChange}
                placeholder="Date of Admission"
              />
            </div>
            <div className="NursingCarePlan-data">
              <label>Room No:</label>
              <input
                type="text"
                name="roomNo"
                value={
                  patientData?.roomDetails?.bedDTO?.bedNo ||
                  ipAdmission?.roomDetails.bedDTO.bedNo
                }
                onChange={handleInputChange}
                placeholder="Room No"
              />
            </div>
            <div className="NursingCarePlan-data">
              <label>Department:</label>
              <input
                type="text"
                name="dept"
                value={formData.dept}
                onChange={handleInputChange}
                placeholder="Department"
              />
            </div>
            <div className="NursingCarePlan-data">
              <label>Consultant:</label>
              <input
                type="text"
                name="consultant"
                value={
                  patientData?.admissionUnderDoctorDetail?.consultantDoctor
                    ?.doctorName ||
                  ipAdmission?.admissionUnderDoctorDetail?.consultantDoctor
                    ?.doctorName
                }
                onChange={handleInputChange}
                placeholder="Consultant"
              />
            </div>
          </div> */}
          <div className="NursingCarePlan-form-section">
            {/* <div className="NursingCarePlan-Section-header">
              Nursing Diagnoses
            </div> */}
            {nursingDiagnosesList.map((diagnosis) => {
              const formattedDiagnosis = diagnosis
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase());

              return (
                <div key={diagnosis} className="NursingCarePlan-diagnosis">
                  <label className="NursingCarePlan-diagnosis-label">
                    {formattedDiagnosis}:
                  </label>
                  <div className="NursingCarePlan-radio">
                    <label>
                      <input
                        type="radio"
                        name={diagnosis}
                        value="Select"
                        checked={formData[diagnosis] === "Select"}
                        onChange={(e) => handleDiagnosisChange(e, diagnosis)}
                      />
                      Select
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={diagnosis}
                        value="Actual"
                        checked={formData[diagnosis] === "Actual"}
                        onChange={(e) => handleDiagnosisChange(e, diagnosis)}
                      />
                      Actual
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={diagnosis}
                        value="Risk"
                        checked={formData[diagnosis] === "Risk"}
                        onChange={(e) => handleDiagnosisChange(e, diagnosis)}
                      />
                      Risk
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
          {/* {activePopup && (
            <PopupTable
              columns={columns}
              data={data}
              onSelect={handleSelect}
              onClose={() => setActivePopup(null)}
            />
          )} */}
        </div>

        <div className="NursingCarePlan-navbar">
          <aside className="NursingCarePlan-navbar-btns">
            <button onClick={handleSubmit}>Save</button>
          </aside>
        </div>
      </form>
    </div>
  );
};

export default NursingCarePlan;
