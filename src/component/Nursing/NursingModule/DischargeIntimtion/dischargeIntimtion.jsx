import React, { useState } from "react";
import axios from "axios";
import "./dischargeIntimtion.css";

const DischargeIntimation = () => {
  const [formData, setFormData] = useState({
    ipNo: "",
    patientName: "",
    dob: "",
    sex: "",
    admissionUnderDoctorDetail:{
      drId:""
    },
    bedNo: "",
    roomNo: "",
    floorNumber: "",
    discharegeAdviceDate: "",
    discharegeAdvicedTime: "",
    remarks: "",
    pharmacyReturn: "",
  });

  const [ipSearchResults, setIpSearchResults] = useState(null);
  const [bedDetails, setBedDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIpSearch = async () => {
    try {
      const response = await axios.get(`http://192.168.0.111:8080/api/ip-admissions?ipNo=${formData.ipNo}`);
      if (response.data) {
        const { patient, admissionUnderDoctorDetail } = response.data;
        setIpSearchResults(response.data);
        setFormData((prevData) => ({
          ...prevData,
          patientName: patient.patientName,
          age: new Date().getFullYear() - new Date(patient.dob).getFullYear(),
          gender: patient.sex,
          consultantDoctor: admissionUnderDoctorDetail.addDoctorDTO.doctorName,
        }));
      }
    } catch (error) {
      console.error("Error fetching IP data:", error);
    }
  };

  const handleBedSearch = async () => {
    try {
      const response = await axios.get(`http://192.168.0.122:8080/api/discharge-intimation?bedNo=${formData.bedNo}`);
      if (response.data) {
        const { roomDetails, floorNo } = response.data;
        setBedDetails(response.data);
        setFormData((prevData) => ({
          ...prevData,
          roomNo: roomDetails.roomId,
          floorNo,
        }));
      }
    } catch (error) {
      console.error("Error fetching Bed data:", error);
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        ipAdmissionsDTO: { ipId: ipSearchResults?.ipId },
        disAdvisedDate: formData.discharegeAdviceDate,
        disAdvisedTime: formData.discharegeAdvicedTime,
        remarks: formData.remarks,
        pharmacyReturns: formData.pharmacyReturn,
      };

      const response = await axios.post("http://192.168.0.122:8080/api/discharge-intimation", payload);
      console.log("Saved successfully:", response.data);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data!");
    }
  };

  const fetchPatientDetails = async () => {
    if (!formData.ipNo) {
      alert("Please enter an IP number");
      return;
    }
  
    try {
      setIsLoading(true);
      setError(null);
  
      const response = await fetch(`http://192.168.0.122:8080/api/ip-admissions/${formData.ipNo}`);
      if (!response.ok) {
        throw new Error("Failed to fetch patient details. Please check the IP number.");
      }
  
      const data = await response.json();
    console.log(data+"sssssssssss")
      // Update formData with patient details
      setFormData((prevData) => ({
        ...prevData,
        patientName: data.patient?.patientName || "N/A",
        dob: data.patient?.dob || "N/A",
        sex: data.patient?.sex || "N/A",
        admissionUnderDoctorDetail: data.admissionUnderDoctorDetail?.addDoctorDTO?.doctorName || "N/A",
        bedNo:data.roomDetails?.bedDTO?.bedNumber || "N/A",
        roomNo:data.roomDetails?.bedDTO?.roomNo || "N/A",
        floorNumber:data.roomDetails?.floorDTO?.floorNumber || "N/A"


      }));
    } catch (err) {
      setError("Unable to fetch patient details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="discharge-information-container">
      <h2 className="discharge-information-header">Discharge Patient</h2>

      {/* IP Search Section */}
      <h4>Patient Details</h4>
      <div className="discharge-information-form">
        <div className="discharge-information-section">
          <label>IP No:</label>
          <input
            type="search"
            name="ipNo"
            value={formData.ipNo}
            onChange={handleChange}
            onBlur={fetchPatientDetails} 
            placeholder="Search IP"
          />
        </div>
        <div className="discharge-information-section">
          <label>Patient Name:</label>
          <input type="text" name="patientName" value={formData.patientName} readOnly />
        </div>
        <div className="discharge-information-section">
          <label>Age:</label>
          <input type="text" name="age" value={formData.dob} readOnly />
        </div>
        <div className="discharge-information-section">
          <label>Gender:</label>
          <input type="text" name="gender" value={formData.sex} readOnly />
        </div>
        <div className="discharge-information-section">
          <label>Consultant Doctor:</label>
          <input type="text" name="consultantDoctor" value={formData.admissionUnderDoctorDetail} readOnly />
        </div>
      </div>

      {/* Ward Details Section */}
      <h4>Ward Details</h4>
      <div className="discharge-information-form">
        <div className="discharge-information-section">
          <label>Bed No:</label>
          <input
            type="search"
            name="bedNo"
            value={formData.bedNo}
            onChange={handleChange}
            placeholder="Search Bed"
          />
        </div>
        <div className="discharge-information-section">
          <label>Room No:</label>
          <input type="text" name="roomNo" value={formData.roomNo} readOnly />
        </div>
        <div className="discharge-information-section">
          <label>Floor No:</label>
          <input type="text" name="floorNo" value={formData.floorNumber} readOnly />
        </div>
      </div>

      {/* Other Details */}
      <div className="discharge-information-form">
        <div className="discharge-information-section">
          <label>Discharge Adviced Date:</label>
          <input
            type="date"
            name="discharegeAdviceDate"
            value={formData.discharegeAdviceDate}
            onChange={handleChange}
          />
        </div>
        <div className="discharge-information-section">
          <label>Discharge Adviced Time:</label>
          <input
            type="time"
            name="discharegeAdvicedTime"
            value={formData.discharegeAdvicedTime}
            onChange={handleChange}
          />
        </div>
        <div className="discharge-information-section">
          <label>Remarks:</label>
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
          />
        </div>
        <div className="discharge-information-section">
  <label>Pharmacy Return:</label>
  <div>
    <label>
      <input
        type="radio"
        name="pharmacyReturn"
        value="yes"
        checked={formData.pharmacyReturn === "yes"}
        onChange={handleChange}
      />
      Yes
    </label>
    <label>
      <input
        type="radio"
        name="pharmacyReturn"
        value="no"
        checked={formData.pharmacyReturn === "no"}
        onChange={handleChange}
      />
      No
    </label>
  </div>
</div>

      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}


      <button className="discharge-information-save-btn" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default DischargeIntimtion;
