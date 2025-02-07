import React, { useState, useEffect } from "react";
import "./AdmissionSlip.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import DoctorPopupTable from "./DoctorPopUpTable";
import { toast } from "react-toastify";
import { FloatingInput, FloatingSelect, FloatingTextarea } from "../../FloatingInputs";

const AdmissionSlip = ({
  patient,
  inPatientId,
  outPatientId,
  setActiveSection,
}) => {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [mrNo, setMrNo] = useState("");
  const [department, setDepartment] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [admissionTime, setAdmissionTime] = useState("");
  const [admittingDoctor, setAdmittingDoctor] = useState({ doctorName: "" });
  const [consultant, setConsultant] = useState([]);
  const [selectedConsultantDoctor, setSelectedConsultantDoctor] =
    useState(null);
  const [caseType, setCaseType] = useState("");
  const [surgeryDate, setSurgeryDate] = useState("");
  const [surgeon, setSurgeon] = useState("");
  const [surgericalProcedure, setSurgicalProcedure] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [reasonForAdmission, setReasonForAdmission] = useState("");
  const [patientType, setPatientType] = useState("");
  const [emergencyAdmission, setEmergencyAdmission] = useState(false);
  const [addmissionSlip, setaddmissionSlip] = useState([]);
  const [activePopup, setActivePopup] = useState("");

  const handleCancel = () => {
    setPatientName("");
    setAge("");
    setPatientType("");
    setDepartment("");
    setAdmissionDate("");
    setAdmissionTime("");
    setAdmittingDoctor("");
    setConsultant("");
    setCaseType("");
    setSurgeryDate("");
    setSurgeon("");
    setSurgicalProcedure("");
    setPhoneNo("");
    setReasonForAdmission("");
    setEmergencyAdmission(false);
  };

  useEffect(() => {
    fetchConsultantDoctor();
    if (patient.addDoctor) {
      console.log(patient.addDoctor);

      setAdmittingDoctor(patient.addDoctor);
      setDepartment(patient.addDoctor?.specialisationId?.specialisationName);
    }
  }, [patient]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      mrNo,
      department,
      admissionDate,
      admissionTime,
      admittingDoctor: {
        doctorId: patient?.addDoctor?.doctorId,
      },
      consultant: {
        doctorId: selectedConsultantDoctor?.doctorId,
      },
      reasonForAdmission,
      emergencyAdmission: emergencyAdmission ? "YES" : "NO",
      surgeon,
      surgericalProcedure,
      patientType,
      outPatient: { outPatientId },
    };

    // Send data to the backend
    axios
      .post(`${API_BASE_URL}/admissionsSlip`, formData)
      .then((response) => {
        console.log("Admission Slip submitted successfully:", response.data);
        toast.success("Admission Slip submitted successfully");
        fetchAddmissionSlip();
      })
      .catch((error) => {
        toast.error("Error submitting Admission Slip:", error);
        console.log(formData);
      });
  };

  useEffect(() => {
    fetchAddmissionSlip();
  }, []);

  const fetchAddmissionSlip = async () => {
    try {
      let endpoint = "";

      if (inPatientId) {
        endpoint = `${API_BASE_URL}/admissionsSlip/in-patient/${inPatientId}`;
      } else if (outPatientId) {
        endpoint = `${API_BASE_URL}/admissionsSlip/out-patient/${outPatientId}`;
      } else {
        console.error("No valid patient ID provided for Addmission Slip.");
        return;
      }

      const response = await axios.get(endpoint);
      setaddmissionSlip(response.data);
    } catch (error) {
      console.error("Error fetching Addmission Slip:", error);
    }
  };

  const fetchConsultantDoctor = async () => {
    const response = await axios.get(`${API_BASE_URL}/doctors`);
    setConsultant(response.data);
  };

  const getPopupData = () => {
    if (activePopup === "consultantDoctor") {
      const mappedConsultantData = consultant.map((doctor) => ({
        doctorId: doctor.doctorId,
        doctorName: doctor.doctorName,
        specialisationName:
          doctor.specialisationId?.specialisationName || "N/A", // Fallback if specialisationId is null/undefined
      }));

      return {
        columns: ["doctorId", "doctorName", "specialisationName"],
        data: mappedConsultantData,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = (data) => {
    if (activePopup === "consultantDoctor") {
      setSelectedConsultantDoctor(data);
    }
  };
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  return (
    <>
      <div className="AdmissionSlip-container">
        <h3>Admission Slip</h3>
        <form onSubmit={handleSubmit}>
          <div className="AdmissionSlip-content">
            <div className="AdmissionSlip-left">
              {/* <div className="AdmissionSlip-group">
              <label htmlFor="patientId">Select Patient :</label>
              <select
                id="patientId"
                value={patientId}
                onChange={handlePatientChange}
                required
              >
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                  <option key={patient.inPatientId} value={patient.inPatientId}>
                    {patient.firstName} {patient.lastName}
                  </option>
                ))}
              </select>
            </div> */}

              <div className="AdmissionSlip-group">
                <FloatingInput
                label={"Patient Name"}
                 type="text"
                 id="patientName"
                 value={
                   patient?.patient?.firstName +
                   " " +
                   patient?.patient?.lastName
                 }
                 onChange={(e) => setPatientName(e.target.value)}
                />
              </div>
              <div className="AdmissionSlip-group">
                <FloatingInput
                label={"Age"}
                 type="number"
                 id="age"
                 value={patient?.patient?.age}
                 onChange={(e) => setAge(e.target.value)}
                
                />
              </div>

              <div className="AdmissionSlip-group">
                <FloatingInput
                label={"Department"}
                type="text"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                />
              </div>

              <div className="AdmissionSlip-group">
                <FloatingInput
                label={"Admission Request Date"}
                type="date"
                id="admissionDate"
                value={admissionDate}
                onChange={(e) => setAdmissionDate(e.target.value)}
                required
                min={today}
                />
              </div>

              <div className="AdmissionSlip-group">
                <FloatingInput
                label={"Admission Request Time"}
                type="time"
                id="admissionTime"
                value={admissionTime}
                onChange={(e) => setAdmissionTime(e.target.value)}
                required
                />
              </div>
              <div className="AdmissionSlip-group">
                <FloatingInput
                label={"Admitting Doctor"}
                type="text"
                id="admittingDoctor"
                value={admittingDoctor?.doctorName || ""}
                onChange={(e) =>
                  setAdmittingDoctor({
                    ...admittingDoctor,
                    doctorName: e.target.value,
                  })
                }
                required
                
                />
              </div>
              <div className="AdmissionSlip-group">
              <FloatingInput
              label={"Consultant"}
               type="search"
               id="consultant"
               value={selectedConsultantDoctor?.doctorName}
               onIconClick={() => setActivePopup("consultantDoctor")}
               required
              />
              </div>
            </div>

            <div className="AdmissionSlip-group-right">
              <div className="AdmissionSlip-group">
                <FloatingSelect
                label={"Case Type"}
                 id="caseType"
                 value={caseType}
                 onChange={(e) => setCaseType(e.target.value)}
                 required
                 options={[{value:"",label:""},
                  {value:"Surgical",label:"Surgical"},
                  {value:"Medical",label:"Medical"}
                 ]}
                
                />
              </div>

              {caseType === "Surgical" && (
                <>
                  <div className="AdmissionSlip-group">
                    <FloatingInput
                    label={"Surgery Date"}
                    type="date"
                    id="surgeryDate"
                    value={surgeryDate}
                    onChange={(e) => setSurgeryDate(e.target.value)}
                    required
                    
                    />
                  </div>

                  <div className="AdmissionSlip-group">
                  <FloatingInput
                  label={"Surgeon"}
                   type="text"
                   id="surgeon"
                   value={surgeon}
                   onChange={(e) => setSurgeon(e.target.value)}
                   required
                  />
                  </div>

                  <div className="AdmissionSlip-group">
                    <FloatingInput
                    label={"Surgical Procedure"}
                     type="text"
                     id="surgericalProcedure"
                     value={surgericalProcedure}
                     onChange={(e) => setSurgicalProcedure(e.target.value)}
                     required
                    />
                  </div>
                </>
              )}

              <div className="AdmissionSlip-group">
                <FloatingInput
                label={"Phone No"}
                type="number"
                name="phoneNo"
                value={patient?.patient?.mobileNumber}
                onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>

              <div className="AdmissionSlip-group">
                <FloatingTextarea
                label={"Reason for Admission"}
                  id="reasonForAdmission"
                  value={reasonForAdmission}
                  onChange={(e) => setReasonForAdmission(e.target.value)}
                  required
                />
              </div>

              <div className="AdmissionSlip-group">
                <label htmlFor="emergencyAdmission">
                  Is It an Emergency Admission? :
                </label>
                <input
                  type="checkbox"
                  id="emergencyAdmission"
                  className="AdmissionSlip-group-checkbox"
                  checked={emergencyAdmission}
                  onChange={() => setEmergencyAdmission(!emergencyAdmission)}
                />
              </div>
            </div>
          </div>

          <div className="AdmissionSlip-group-buttons">
            {/* <button
              type="button"
              onClick={handleCancel}
              className="AdmissionSlip-cancel-btn"
            >
              Cancel
            </button> */}
            <button type="submit" className="AdmissionSlip-submit-btn">
              Submit
            </button>
          </div>
        </form>

        <div className="ReferralConsultation-existing-referrals">
          <h4>Existing Addmission Slip:</h4>
          {addmissionSlip.length > 0 ? (
            <table className="ReferralConsultation-table">
              <thead>
                <tr>
                  <th>SN </th>
                  <th>Department</th>
                  <th>Addmission Request Date</th>
                  <th>Reason for Addmission</th>
                  <th>Consultant</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {addmissionSlip.map((addSlip, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{addSlip.department}</td>
                    <td>{addSlip.admissionDate}</td>
                    <td>{addSlip.reasonForAdmission}</td>
                    <td>{addSlip.consultant?.doctorName}</td>
                    <td>{addSlip.requestStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No existing referrals found.</p>
          )}
        </div>
      </div>
      {activePopup && (
        <DoctorPopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup("")}
        />
      )}
    </>
  );
};

export default AdmissionSlip;
