import React, { useState } from "react";
import "./DoctorAppointmentPopUp.css";
import CustomModal from "../CustomModel/CustomModal";
import AddCancel from "./AddCancel";
import { API_BASE_URL } from "../api/api";

export default function DoctorAppointmentPopUp({
  date,
  selectedDoctor,
  updatedAppointments,
  selectedTimeSlot,
  handleSave,
  handleUpdate,
  handleDelete,
  closeModal
}) {
  const [formData, setFormData] = useState({
    appointmentDate:updatedAppointments?.appointmentDate||date,
    appointmentTime:updatedAppointments?.appointmentTime||selectedTimeSlot,
    typeOfAppointment:updatedAppointments?.typeOfAppointment||"",
    mobileNo: updatedAppointments?.mobileNo||"",
    alternateMobileNo:updatedAppointments?.altMobileNo|| "",
    initial:updatedAppointments?.initial|| "",
    firstName:updatedAppointments?.firstName|| "",
    middleName:updatedAppointments?.middleName||"",
    lastName:updatedAppointments?.lastName||"",
    dob:updatedAppointments?.dob|| "",
    age:updatedAppointments?.age|| "",
    sex:updatedAppointments?.sex|| "",
    relativeName:updatedAppointments?.relativeName|| "",
    address:updatedAppointments?.address|| "",
    remarks:updatedAppointments?.remarks|| "",
    adharCardId:updatedAppointments?.adharCardId||"",
    email:updatedAppointments?.email|| "",
    appointmentSourceType:updatedAppointments?.appointmentSourceType|| "",
    status: updatedAppointments?.status || "",
    reason: updatedAppointments?.reason || "",
    addDoctor: {
      doctorId: selectedDoctor || 0,
    },
  });

  const [errors, setErrors] = useState({});
  const [outPatientId,setOutPatientId]=useState()
  
  const [showPopup,setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const currentDate = new Date();
    let updatedFormData = { ...formData, [name]: value };
  
    if (name === "dob" && value) {
      // Calculate age when DOB is entered
      const birthDate = new Date(value);
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      const isBeforeBirthday =
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate());
      updatedFormData.age = isBeforeBirthday ? age - 1 : age;
    }
  
    if (name === "age" && value) {
      // Calculate DOB when age is entered, starting from January 1st
      const years = parseInt(value, 10);
      const dobYear = currentDate.getFullYear() - years;
      const dobFromJanuary = new Date(dobYear, 0, 1); // January 1st of the calculated year
      updatedFormData.dob = dobFromJanuary.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    }
  
    setFormData(updatedFormData);
  };
  

  const validate = () => {
    let validationErrors = {};
    if (!formData.patientName || formData.patientName.trim() === "") {
      validationErrors.patientName = "Patient Name is required.";
    }

    if (!formData.dob || formData.dob.trim() === "") {
      validationErrors.dob = "Date of Birth is required.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSaveClick = async () => {
    const updateFormData= {
      appointmentDate:date,
    appointmentTime:selectedTimeSlot,
    typeOfAppointment:formData?.typeOfAppointment||"",
    mobileNo: formData?.mobileNo||"",
    alternateMobileNo:formData?.altMobileNo|| "",
    initial:formData?.initial|| "",
    firstName:formData?.firstName|| "",
    middleName:formData?.middleName||"",
    lastName:formData?.lastName||"",
    dob:formData?.dob|| "",
    age:formData?.age|| "",
    sex:formData?.sex|| "",
    relativeName:formData?.relativeName|| "",
    address:formData?.address|| "",
    remarks:formData?.remarks|| "",
    adharCardId:formData?.adharCardId||"",
    email:formData?.email|| "",
    appointmentSourceType:formData?.appointmentSourceType|| "",
    status: "Initialized",
    reason: formData?.reason || "",
    addDoctor: {
      doctorId: selectedDoctor || 0,
    }
    }
    if(formData.typeOfAppointment){
      updateFormData.outPatient={
        outPatientId:outPatientId
      }
    }
      try {
        const response = await fetch(`${API_BASE_URL}/appointments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateFormData),
        });
        const result = await response.json();
        if (response.ok) {
          alert("Appointment saved successfully!");
          handleSave(result);
          closeModal();
        } else {
          alert(result.message || "Failed to save the appointment.");
        }
      } catch (error) {
        console.error("Error saving appointment:", error);
        alert("Error saving the appointment.");
      }
  };

  const handleUpdateClick = async () => {
    if (validate()) {
      try {
        const response = await fetch(`${API_BASE_URL}/appointments`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (response.ok) {
          alert("Appointment updated successfully!");
          handleUpdate(result);
        } else {
          alert(result.message || "Failed to update the appointment.");
        }
      } catch (error) {
        console.error("Error updating appointment:", error);
        alert("Error updating the appointment.");
      }
    }
  };

  const fetchPatientData = async () => {
    if (!formData.mrNo) {
      alert("Please enter MR No.");
      return;
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/patients/outpatient?uhid=${formData.mrNo}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        const patientData = await response.json();
        console.log("Hello World ",patientData);
        setOutPatientId(patientData[0]?.outPatientId)
        setFormData((prevData) => ({
          ...prevData,
          typeOfAppointment: "oldPatient",
          mobileNo: patientData[0]?.phoneNumber || "",
          adharCardId:patientData[0]?.adharCardId||"",
          alternateMobileNo: patientData[0]?.alternateMobileNo || "",
          initial: patientData[0]?.initial || "",
          firstName: patientData[0]?.firstName || "",
          middleName: patientData[0]?.middleName || "",
          lastName: patientData[0]?.lastName || "",
          dob: patientData[0]?.dateOfBirth|| "",
          age: patientData[0]?.age || "",
          sex: patientData[0]?.gender || "",
          relativeName: patientData[0]?.relativeName || "",
          address: patientData[0]?.address || "",
          remarks: patientData[0]?.remarks || "",
          email: patientData[0]?.email || "",
          appointmentSourceType: patientData[0]?.appointmentSourceType || "",
          status: "Initialized",
          reason: patientData?.reason || "",
          outPatient:{
            outPatientId:patientData[0].outPatientId
          },
          addDoctor: {
            doctorId: selectedDoctor || 0, // Map doctorId if needed
          },
        }));
      } else {
        const errorResult = await response.json();
        alert(errorResult.message || "Unable to fetch patient details.");
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
      alert("Error fetching patient details.");
    }
  };
  

  const handleCancelClick =() => {
    setShowPopup(true);
  };
  const handleCancelClose = ()=>{
    setShowPopup(false)
    closeModal();
  }
  return (
    <div className="operationschedule-modal">
      <h2 className="operationschedule-modal-title">
        Schedule Appointment for {selectedTimeSlot}
      </h2>
      <form className="operationschedule-modal-form">
        {/* Row 1 */}
        <div className="operationschedule-form-row">
          <div className="operationschedule-form-col">
            <label>Type of Appointment</label>
            <select
              name="typeOfAppointment"
              value={formData.typeOfAppointment}
              onChange={handleInputChange}
            >
              <option value="">Select visit</option>
              <option value="newPatient">New Patient</option>
              <option value="oldPatient">Old Patient</option>
            </select>
          </div>
        </div>

        {formData.typeOfAppointment === "oldPatient" && (
  <div className="operationschedule-form-row">
    <div className="operationschedule-form-col">
      <label>MR No</label>
      <input
        type="text"
        name="mrNo"
        value={formData.mrNo || ""}
        onChange={handleInputChange}
        onBlur={fetchPatientData}
      />
      {errors.mrNo && <span className="error-text">{errors.mrNo}</span>}
    </div>
  </div>
)}


        {/* Row 3 */}
        <div className="operationschedule-form-row">
          <div className="operationschedule-form-col">
            <label>Mobile No</label>
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="operationschedule-form-col">
            <label>Alter Mobile No</label>
            <input
              type="text"
              name="alternateMobileNo"
              value={formData.alternateMobileNo || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="operationschedule-form-col">
            <label>Aadhar Card Number:</label>
            <input
              type="text"
              name="adharCardId"
              value={formData.adharCardId || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="operationschedule-form-row">
          <div className="operationschedule-form-col">
            <label>Initial</label>
            <input
              type="text"
              name="initial"
              value={formData.initial || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="operationschedule-form-col">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleInputChange}
            />
          </div>
          </div>
          <div className="operationschedule-form-row">
          <div className="operationschedule-form-col">
            <label>Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="operationschedule-form-col">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Row 5 */}
        <div className="operationschedule-form-row">
          <div className="operationschedule-form-col">
            <label>DOB</label>
            <input
              type="date"
              name="dob"
              value={formData.dob || ""}
              onChange={handleInputChange}
            />
            {errors.dob && <span className="error-text">{errors.dob}</span>}
          </div>
          <div className="operationschedule-form-col">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Row 6 */}
        <div className="operationschedule-form-row">
          <div className="operationschedule-form-col">
            <label>Sex</label>
            <select
              name="sex"
              value={formData.sex || ""}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="operationschedule-form-col">
            <label>Relative Name</label>
            <input
              type="text"
              name="relativeName"
              value={formData.relativeName || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Row 7 */}
        <div className="operationschedule-form-row">
          <div className="operationschedule-form-col">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="operationschedule-form-col">
            <label>Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Row 8 */}
        {/* <div className="operationschedule-form-row">
          <div className="operationschedule-form-col">
            <label>User Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName || ""}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="operationschedule-form-col">
            <label>Doctor Name</label>
            <input
              type="text"
              name="doctorName"
              value={formData.doctorName || ""}
              onChange={handleInputChange}
            />
          </div>
        </div> */}

        {/* Row 9 */}
        <div className="operationschedule-form-row">
          <div className="operationschedule-form-col">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="operationschedule-form-col">
            <label>Appointment Source</label>
            <select
              name="appointmentSourceType"
              value={formData.appointmentSourceType}
              onChange={handleInputChange}
            >
              <option value="">Select option</option>
              <option value="website">Website</option>
              <option value="app">App</option>
            </select>
          </div>
        </div>
      </form>

      {/* Action Buttons */}
      <div className="operationschedule-modal-buttons">
        <button onClick={handleSaveClick} className="operationschedule-save-btn">
          Save
        </button>
        <button onClick={handleCancelClick} className="operationschedule-delete-btn">
          Delete
        </button>
      </div>

      <CustomModal isOpen={showPopup} onClose={()=>setShowPopup(false)}>
        <AddCancel formData={formData} updatedAppointments={updatedAppointments}  onClose={handleCancelClose}/>
      </CustomModal>
    </div>
  );
}
