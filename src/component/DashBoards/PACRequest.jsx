import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PACRequest.css";
import { API_BASE_URL } from "../api/api";
import { toast } from "react-toastify";
import { FloatingInput, FloatingSelect, FloatingTextarea } from "../../FloatingInputs";

const PACRequest = ({ inPatientId, outPatientId }) => {
  const [mrNo, setMrNo] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [consultant, setConsultant] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [anaesthesiaPlan, setAnaesthesiaPlan] = useState("");
  const [surgeryName, setSurgeryName] = useState("");
  const [pacAdviceNotes, setPacAdviceNotes] = useState("");
  const [pacRequests, setPacRequests] = useState([]);

  const handleCancel = () => {
    setMrNo("");
    setPatientName("");
    setAge("");
    setGender("");
    setAddress("");
    setRoomNo("");
    setConsultant("");
    setDiagnosis("");
    setAnaesthesiaPlan("");
    setSurgeryName("");
    setPacAdviceNotes("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      mrNo,
      patientName,
      roomNoBedNo: roomNo,
      consultant,
      diagnosis,
      anaesthesiaPlan,
      surgeryName,
      pacAdviceNotes,
      ...(inPatientId
        ? { inPatient: { inPatientId } }
        : { outPatient: { outPatientId } }),
    };

    try {
      await axios.post(`${API_BASE_URL}/pac-requests`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("PAC request submitted:", formData);
      toast.success("PAC request submitted successfully!");
      handleCancel();
      fetchPACRequests();
    } catch (error) {
      console.error("Error submitting PAC request:", error);
      toast.error("Failed to submit PAC request.");
    }
  };

  const fetchPACRequests = async () => {
    try {
      let endpoint = "";

      if (inPatientId) {
        endpoint = `${API_BASE_URL}/pac-requests/in-patient/${inPatientId}`;
      } else if (outPatientId) {
        endpoint = `${API_BASE_URL}/pac-requests/out-patient/${outPatientId}`;
      } else {
        console.error("No valid patient ID provided for PAC requests.");
        return;
      }

      const response = await axios.get(endpoint);
      setPacRequests(response.data);
    } catch (error) {
      console.error("Error fetching PAC requests:", error);
    }
  };

  useEffect(() => {
    fetchPACRequests();
  }, []);

  return (
    <div className="PACRequest-form-container">
      <h3>Post-Acute Care (PAC) Request Form</h3>

      <form onSubmit={handleSubmit}>
        <div className="PACRequest-form-group-content">
          <div className="PACRequest-form-group-left">
            <div className="PACRequest-form-group">
              <FloatingInput
              label={"MR Number"}
              type="text"
              id="mrNo"
              value={mrNo}
              onChange={(e) => setMrNo(e.target.value)}
              required
              />
            </div>

            <div className="PACRequest-form-group">
              <FloatingInput
              label={"Patient Name"}
               type="text"
               id="patientName"
               value={patientName}
               onChange={(e) => setPatientName(e.target.value)}
               required
              
              
              />
            </div>

            <div className="PACRequest-form-group">
              <FloatingInput
              label={"Age"}
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              
              />

            </div>

            <div className="PACRequest-form-group">
              <FloatingSelect
              label={"Gender"}
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              options={[{value:"",label:""},
                {value:"Male" ,label:"Male"},
                {value:"Female",label:"Female"},
                {value:"Other",label:"Other"}
              ]}
              required
              />
            </div>

            <div className="PACRequest-form-group">
              <FloatingInput
              label={"Address"}
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              
              />
            </div>

            <div className="PACRequest-form-group">
              <FloatingInput
              label={"Room No./Bed No"}
              type="text"
              id="roomNo"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              required
              
              />
            </div>
          </div>

          <div className="PACRequest-form-group-right">
            <div className="PACRequest-form-group">
              <FloatingInput
              label={"Consultant"}
               type="text"
               id="consultant"
               value={consultant}
               onChange={(e) => setConsultant(e.target.value)}
               required
              
              />
            </div>

            <div className="PACRequest-form-group">
              <FloatingTextarea
              label={"Diagnosis"}
               id="diagnosis"
               value={diagnosis}
               onChange={(e) => setDiagnosis(e.target.value)}
               required
              
              />
            </div>

            <div className="PACRequest-form-group">
              <FloatingSelect
              label={"Anaesthesia Plan"}
              id="anaesthesiaPlan"
              value={anaesthesiaPlan}
              onChange={(e) => setAnaesthesiaPlan(e.target.value)}
              required
              options={[{value:"",label:""},
                {value:"General",label:"General"},
                {value:"Local",label:"Local"},
                {value:"Regional",label:"Regional"}
              ]}
              />
            </div>

            <div className="PACRequest-form-group">
              <FloatingInput
              label={"Surgery Name"}
                id="surgeryName"
                value={surgeryName}
                onChange={(e) => setSurgeryName(e.target.value)}
                required
                options={[{value:"",label:""},
                  {value:"Appendectomy",label:"Appendectomy"},
                  {value:"Cholecystectomy",label:"Cholecystectomy"},
                  {value:"Knee Replacement",label:"Knee Replacement"},
                  {value:"other",label:"Other"}
                ]}
              />
            </div>

            <div className="PACRequest-form-group">
              <FloatingTextarea
              label={"PAC Advice Notes"}
              id="pacAdviceNotes"
              value={pacAdviceNotes}
              onChange={(e) => setPacAdviceNotes(e.target.value)}
              required
              
              />
            </div>
          </div>
        </div>

        <div className="PACRequest-form-group-buttons">
          <button
            type="button"
            onClick={handleCancel}
            className="PACRequest-cancel-btn"
          >
            Cancel
          </button>
          <button type="submit" className="PACRequest-submit-btn">
            Submit
          </button>
        </div>
      </form>

      {/* <div className="PACRequest-existing-requests">
        <h4>Existing PAC Requests:</h4>
        {pacRequests.length > 0 ? (
          <ul>
            {pacRequests.map((request) => (
              <li key={request.sn}>
                <strong>Patient Name:</strong> {request.patientName},{" "}
                <strong>Surgery:</strong> {request.surgeryName},{" "}
                <strong>Consultant:</strong> {request.consultant},{" "}
                <strong>Room No./Bed No.:</strong> {request.roomNoBedNo},{" "}
                <strong>Diagnosis:</strong> {request.diagnosis},{" "}
                <strong>Anaesthesia Plan:</strong> {request.anaesthesiaPlan}
              </li>
            ))}
          </ul>
        ) : (
          <p>No PAC requests found.</p>
        )}
      </div> */}

      <div className="ReferralConsultation-existing-referrals">
        <h4>Existing PAC Requests:</h4>
        {pacRequests.length > 0 ? (
          <table className="ReferralConsultation-table">
            <thead>
              <tr>
                <th>SN </th>
                <th>Patient Name </th>
                <th>Surgery </th>
                <th>Consultant </th>
                <th>Room No./Bed No.</th>
                <th>Diagnosis</th>
                <th>Anaesthesia Plan</th>
              </tr>
            </thead>
            <tbody>
              {pacRequests.map((pacRequest, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{pacRequest.patientName || "N/A"}</td>
                  <td>{pacRequest.surgeryName}</td>
                  <td>{pacRequest.consultant}</td>
                  <td>{pacRequest.roomNoBedNo}</td>
                  <td>{pacRequest.diagnosis}</td>
                  <td>{pacRequest.anaesthesiaPlan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No existing referrals found.</p>
        )}
      </div>
    </div>
  );
};

export default PACRequest;
