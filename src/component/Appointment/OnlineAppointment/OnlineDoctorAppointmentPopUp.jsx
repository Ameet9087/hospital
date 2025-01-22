import React, { useEffect, useState } from "react";
import "./OnlineDoctorAppointmentPopUp.css";

import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import CustomModal from "../../CustomModel/CustomModal";
import OnlineAddCancel from "./OnlineAddCancel";
import AddCancel from "../AddCancel";
import AppointmentReschedule from "../AppointmentReschedule";
import AppoitmentPopupTable from "../AppoitmentPopupTable";

export default function DoctorAppointmentPopUp({
  date,
  selectedDoctor,
  updatedAppointments,
  selectedTimeSlot,
  slots,
  handleSave,
  handleUpdate,
  handleDelete,
  closeModal,
  isUpdate,
}) {
  console.log(updatedAppointments);
  
  const [formData, setFormData] = useState({
    appointmentDate: updatedAppointments?.appointmentDate || date,
    appointmentTime: updatedAppointments?.appointmentTime || selectedTimeSlot,
    typeOfAppointment: updatedAppointments?.typeOfAppointment || "",
    contactNumber: updatedAppointments?.patient?.mobileNumber || "",
    alternateMobileNo: updatedAppointments?.patient?.altMobileNumber || "",
    initial: updatedAppointments?.patient?.salutation || "",
    firstName: updatedAppointments?.patient?.firstName || "",
    middleName: updatedAppointments?.patient?.middleName || "",
    lastName: updatedAppointments?.patient?.lastName || "",
    birthOfDate: updatedAppointments?.patient?.birthOfDate || "",
    age: updatedAppointments?.patient?.age || "",
    gender: updatedAppointments?.patient?.gender || "",
    relation:updatedAppointments?.patient?.relation||"",
    relativeName: updatedAppointments?.patient?.relativeName || "",
    address: updatedAppointments?.patient?.address || "",
    remarks: updatedAppointments?.remarks || "",
    adharCardId: updatedAppointments?.patient?.adharCardId || "",
    emailId: updatedAppointments?.patient?.emailId || "",
    country: updatedAppointments?.patient?.country || "",
    state: updatedAppointments?.patient?.state || "",
    city: updatedAppointments?.patient?.cityDistrict || "",
    pinCode: updatedAppointments?.patient?.pinCode || "",
    appointmentSourceType: updatedAppointments?.appointmentSourceType || "",
    consultationType:updatedAppointments?.consultationType||"",
    status: updatedAppointments?.status || "",
    reason: updatedAppointments?.reason || "",
    addDoctor: {
      doctorId: selectedDoctor || 0,
    },
  });

  console.log(formData);
  
  const [errors, setErrors] = useState({});
  const [outPatient, setOutPatient] = useState();
  const [activePopup, setActivePopup] = useState(null);
  const [outPatientId, setOutPatientId] = useState();
  const [selectedOutPatient, setSelectedOutpatient] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const [showReschedule, setShowReschedule] = useState(false);

  const [update, setUpdate] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const currentDate = new Date();
    let updatedFormData = { ...formData, [name]: value };

    if (name === "birthOfDate" && value) {
      const birthDate = new Date(value);
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      const isBeforeBirthday =
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
          currentDate.getDate() < birthDate.getDate());
      updatedFormData.age = isBeforeBirthday ? age - 1 : age;
    }

    if (name === "age" && value) {
      // Calculate DOB when age is entered, starting from January 1st
      const years = parseInt(value, 10);
      const dobYear = currentDate.getFullYear() - years;
      const dobFromJanuary = new Date(dobYear, 0, 1); // January 1st of the calculated year
      updatedFormData.birthOfDate = dobFromJanuary.toISOString().split("T")[0]; // Format as YYYY-MM-DD
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
    const updateFormData = {
      appointmentDate: date,
      appointmentTime: selectedTimeSlot,
      typeOfAppointment: formData?.typeOfAppointment || "",
      appointmentSourceType: formData?.appointmentSourceType || "",
      consultationType: formData?.consultationType || "",
      status: "Initialized",
      reason: formData?.reason || "",
      remarks: formData?.remarks || "",
      patient: selectedOutPatient
        ? {
            uhid: selectedOutPatient?.uhid
          }
        : {
            contactNumber: formData?.mobileNo || "",
            salutation: formData?.initial || "",
            firstName: formData?.firstName || "",
            middleName: formData?.middleName || "",
            lastName: formData?.lastName || "",
            dateOfBirth: formData?.birthOfDate || "",
            age: formData?.age || "",
            ageUnit: formData?.ageUnit || "",
            gender: formData?.gender || "",
            address: formData?.address || "",
            adharCardId: formData?.adharCardId || "",
            emailId: formData?.emailId || "",
            country: formData?.country || "",
            relation: formData?.relation || "",
            state: formData?.state || "",
            cityDistrict: formData?.cityDistrict || "",
            pinCode: formData?.pinCode || "",
          },
      addDoctor: {
        doctorId: selectedDoctor?.doctorId || 0,
      },
    };
    console.log(updateFormData);
    
    
    try {
      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateFormData),
      });
      const result = await response.json();
      if (response.ok) {
        alert(`Appointment saved successfully ${result?.patient?.uhid}`);
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
  const fetchDataByPinCode = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/cities/area-details?areaPinCode=${formData.pinCode}`
    );
    setFormData((prevState) => ({
      ...prevState,
      country: response.data.countryName,
      state: response.data.stateName,
      city: response.data.cityName,
    }));
  };

  useEffect(() => {
    fetchDataByPinCode();
  }, [formData.pinCode]);

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

  const fetchPatientData = async (uhid) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/patients/outpatient?uhid=${uhid}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const patientData = await response.json();
        console.log("Hello World ", patientData);
        setOutPatientId(patientData[0]?.outPatientId);
        
        console.log(patientData);
      } else {
        const errorResult = await response.json();
        alert(errorResult.message || "Unable to fetch patient details.");
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
      alert("Error fetching patient details.");
    }
  };

  const fetchOutPatientData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/patient-register/all`);
      setOutPatient(response.data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const handleCancelClick = () => {
    setShowPopup(true);
  };
  const handleCancelClose = () => {
    setShowPopup(false);
    closeModal();
  };
  const getPopupData = () => {
    if (activePopup === "uhid") {
      return {
        columns: ["uhid", "firstName", "lastName", "adharCardId"],
        data: outPatient,
      };
    } else {
      return { columns: [], data: [] };
    }
  };
  
  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
  
    if (activePopup === "uhid") {
      setFormData((prevData) => ({
        ...prevData,
        typeOfAppointment: "oldPatient",
        mobileNo: data?.mobileNumber || "",
        adharCardId: data?.adharCardId || "",
        initial: data?.initial || "",
        firstName: data?.firstName || "",
        middleName: data?.middleName || "",
        lastName: data?.lastName || "",
        dob: data?.dateOfBirth || "",
        age: data?.age || "",
        sex: data?.gender || "",
        relativeName: data?.relativeName || "",
        relation:data?.relation||"",
        country:data?.country||"",
        state:data?.state||"",
        pinCode:data?.pinCode||"",
        city:data?.city||"",
        address: data?.address || "",
        remarks: data?.remarks || "",
        email: data?.emailId || "",
        appointmentSourceType: data?.appointmentSourceType || "",
        status: "Initialized",
        reason: data?.reason || "",
        outPatient: {
          outPatientId: data?.outPatientId,
        },
        addDoctor: {
          doctorId: selectedDoctor || 0, // Map doctorId if needed
        },
      }));
      setSelectedOutpatient(data);
      await fetchPatientData(data.patient.uhid);
    }
    setActivePopup(null);
  };

  useEffect(() => {
    fetchOutPatientData();
  }, []);

  const RescheduleAppointment = (item) => {
    setUpdate(item);
    setShowReschedule(true);
  };

  return (
    <>
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
            {formData.typeOfAppointment === "oldPatient" && (
              <div className="operationschedule-form-col">
                <div>
                  <label>MR No</label>
                  <div className="operationschedule-form-col-sub-div">
                  <input
                    type="text"
                    name="mrNo"
                    value={selectedOutPatient?.uhid}
                  />
                  <i
                    onClick={() => setActivePopup("uhid")}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                  </div>
                </div>
                {errors.mrNo && (
                  <span className="error-text">{errors.mrNo}</span>
                )}
              </div>
          )}
          </div>

          <div className="operationschedule-form-row">
            <div className="operationschedule-form-col">
              <label>Mobile No</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber || ""}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="operationschedule-form-col">
              <label>Alter Mobile No</label>
              <input
                type="text"
                name="alternateMobileNo"
                value={formData.alternateMobileNo || ""}
                onChange={handleInputChange}
              />
            </div> */}
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
              <select name="initial"
                value={formData.initial || ""}
                onChange={handleInputChange}>
                  <option value="Mrs">Mrs</option>
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Baby of">Baby of</option>
                  <option value="Miss">Miss</option>
                  <option value="Master">Master</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Baby">Baby</option>
                  <option value="Empty">Empty</option>
              </select>
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
                name="birthOfDate"
                value={formData.birthOfDate || ""}
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
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="operationschedule-form-col">
              <label>Email</label>
              <input
                type="email"
                name="emailId"
                value={formData.emailId || ""}
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

          <div className="operationschedule-form-row">
<div className="operationschedule-form-col">
              <label>Relation</label>
              <input
                type="text"
                name="relation"
                value={formData.relation || ""}
                onChange={handleInputChange}
              />
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


          {/* Row 8 */}
          <div className="operationschedule-form-row">
            <div className="operationschedule-form-col">
              <label>Pin Code</label>
              <input
                className="checkIn__input"
                type="text"
                placeholder="PinCode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="operationschedule-form-col">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city || ""}
                onChange={handleInputChange}
              />
            </div>
            
          </div>
          <div className="operationschedule-form-row">
          <div className="operationschedule-form-col">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="operationschedule-form-col">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country || ""}
                onChange={handleInputChange}
              />
            </div>

          </div>
          <div className="operationschedule-form-row">
            
            <div className="operationschedule-form-col">
              <label>Appointment Source</label>
              <select
                name="appointmentSourceType"
                value={formData.appointmentSourceType}
                onChange={handleInputChange}
              >
                <option value="">Select option</option>
                <option value="web">Web</option>
                <option value="app">App</option>
                <option value="call">Call</option>
                <option value="visit">Visit</option>
                <option value="others">others</option>
              </select>
            </div>
            <div className="operationschedule-form-col">
              <label>Consultation Type</label>
              <select
                name="consultationType"
                value={formData.consultationType}
                onChange={handleInputChange}
              >
                <option value="">Select option</option>
                <option value="in-hospital">In-Hospital</option>
                <option value="Online-Tele-Consult">Online-Tele-Consult</option>
              </select>
            </div>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="operationschedule-modal-buttons">
          <button
            onClick={handleSaveClick}
            className="operationschedule-save-btn"
          >
            Save
          </button>
          {updatedAppointments != null && (
            <>
              <button
                onClick={() => RescheduleAppointment(updatedAppointments)}
                className="operationschedule-save-btn"
              >
                Reschedule
              </button>
              <button
                onClick={handleCancelClick}
                className="operationschedule-delete-btn"
              >
                Cancel Appointment
              </button>
            </>
          )}
        </div>

        <CustomModal isOpen={showPopup} onClose={() => setShowPopup(false)}>
          <AddCancel
            formData={formData}
            updatedAppointments={updatedAppointments}
            onClose={handleCancelClose}
          />
        </CustomModal>
        <CustomModal isOpen={showReschedule} onClose={handleCancelClose}>
          <AppointmentReschedule
            slots={slots}
            update={update}
            onClose={handleCancelClose}
          />
        </CustomModal>
      </div>
      {activePopup && (
        <AppoitmentPopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
    </>
  );
}
