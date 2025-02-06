import React, { useEffect, useState } from "react";
import "./OnlineDoctorAppointmentPopUp.css";

import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import CustomModal from "../../../CustomModel/CustomModal";
import OnlineAddCancel from "./OnlineAddCancel";
import AddCancel from "../AddCancel";
import AppointmentReschedule from "../AppointmentReschedule";
import AppoitmentPopupTable from "../AppoitmentPopupTable";
import { FloatingInput, FloatingSelect, FloatingTextarea } from "../../../FloatingInputs";
import { toast } from "react-toastify";

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
        toast.success(`Appointment saved successfully ${result?.patient?.uhid}`);
        handleSave(result);
        closeModal();
      } else {
        toast.error(result.message || "Failed to save the appointment.");
      }
    } catch (error) {
      console.error("Error saving appointment:", error);
      toast.error("Error saving the appointment.");
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
          toast.success("Appointment updated successfully!");
          handleUpdate(result);
        } else {
          toast.error(result.message || "Failed to update the appointment.");
        }
      } catch (error) {
        console.error("Error updating appointment:", error);
        toast.error("Error updating the appointment.");
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
      } else {
        const errorResult = await response.json();
        toast.error(errorResult.message || "Unable to fetch patient details.");
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
      toast.error("Error fetching patient details.");
    }
  };

  const fetchOutPatientData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/patient-register/all`);
      setOutPatient(response.data);
    } catch (error) {
      toast.error("Error fetching patient details:", error);
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
          <div className="operationschedule-form-row">
            <div className="operationschedule-form-col">
              <FloatingSelect
                label={"Type of Appointment"}
                name="typeOfAppointment"
                value={formData.typeOfAppointment}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "" },
                  { value: "newPatient", label: "New Patient" },
                  { value: "oldPatient", label: "Old Patient" },
                ]}
              />
            </div>
            {formData.typeOfAppointment === "oldPatient" && (
              <div className="operationschedule-form-col">
                <div>
                  <FloatingInput
                    label={"Mr No"}
                    type="search"
                    value={selectedOutPatient?.uhid}
                    onIconClick={() => setActivePopup("uhid")}
                  />
                </div>
                {errors.mrNo && (
                  <span className="error-text">{errors.mrNo}</span>
                )}
              </div>
            )}
          </div>

          <div className="operationschedule-form-row">
            <div className="operationschedule-form-col">
              <FloatingInput
                label={"Mobile No"}
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                restrictions={{ number: true, max: 10 }}
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
              <FloatingInput
                label={"Aadhar Card Number"}
                type="text"
                name="adharCardId"
                restrictions={{ number: true, max: 14 }}
                value={formData.adharCardId || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="operationschedule-form-row">
            <div className="operationschedule-form-col">
              <FloatingSelect
                label={"Initial"}
                name="salutation"
                value={formData.salutation || ""}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "" },
                  { value: "Mrs", label: "Mrs" },
                  { value: "Mr", label: "Mr" },
                  { value: "Ms", label: "Ms" },
                  { value: "Baby of", label: "Baby of" },
                  { value: "Miss", label: "Miss" },
                  { value: "Master", label: "Master" },
                  { value: "Dr.", label: "Dr." },
                  { value: "Baby", label: "Baby" },
                ]}
              />
            </div>
            <div className="operationschedule-form-col">
              <FloatingInput
                label={"First Name"}
                type="text"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="operationschedule-form-row">
            <div className="operationschedule-form-col">
              <FloatingInput
                label={"Middle Name"}
                type="text"
                name="middleName"
                value={formData.middleName || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="operationschedule-form-col">
              <FloatingInput
                label={"Last Name"}
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
              <FloatingInput
                label={"DOB"}
                type="date"
                name="birthOfDate"
                value={formData.birthOfDate || ""}
                onChange={handleInputChange}
              />
              {errors.dob && <span className="error-text">{errors.dob}</span>}
            </div>
            <div className="operationschedule-form-col">
              <FloatingInput
                label={"Age"}
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
              <FloatingSelect
                label={"Gender"}
                name="gender"
                value={formData.gender || ""}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "" },
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
              />
            </div>
            <div className="operationschedule-form-col">
              <FloatingInput
                label={"Email"}
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
              <FloatingTextarea
                label={"Address"}
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="operationschedule-form-col">
              <FloatingTextarea
                label={"Remarks"}
                type="text"
                name="remarks"
                value={formData.remarks || ""}
                restrictions={{ varchar: true }}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="operationschedule-form-row">
            <div className="operationschedule-form-col">
              <FloatingSelect
                label={"Relation"}
                name="relation"
                value={formData.relation}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "-- Select Relation --" },
                  { value: "Father", label: "Father" },
                  { value: "Mother", label: "Mother" },
                  { value: "Son", label: "Son" },
                  { value: "Daughter", label: "Daughter" },
                  { value: "Guardian", label: "Guardian" },
                  { value: "Sibling", label: "Sibling" },
                  { value: "Spouse", label: "Spouse" },
                  { value: "Grandparent", label: "Grandparent" },
                  { value: "Grandchild", label: "Grandchild" },
                  { value: "Uncle", label: "Uncle" },
                  { value: "Aunt", label: "Aunt" },
                  { value: "Nephew", label: "Nephew" },
                  { value: "Niece", label: "Niece" },
                  { value: "Cousin", label: "Cousin" },
                  { value: "Friend", label: "Friend" },
                  { value: "Other", label: "Other" },
                ]}
              />
            </div>
            <div className="operationschedule-form-col">
              <FloatingInput
                label={"Relative Name"}
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
              <FloatingInput
                label={"Pin Code"}
                type="text"
                placeholder="PinCode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="operationschedule-form-col">
              <FloatingInput
                label={"City"}
                type="text"
                name="cityDistrict"
                value={formData.cityDistrict || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="operationschedule-form-row">
            <div className="operationschedule-form-col">
              <FloatingInput
                label={"State"}
                type="text"
                name="state"
                value={formData.state || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="operationschedule-form-col">
              <FloatingInput
                label={"Country"}
                type="text"
                name="country"
                value={formData.country || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="operationschedule-form-row">
            <div className="operationschedule-form-col">
              <FloatingSelect
                label="Appointment Source"
                name="appointmentSourceType"
                value={formData.appointmentSourceType}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "Select option" },
                  { value: "web", label: "Web" },
                  { value: "app", label: "App" },
                  { value: "call", label: "Call" },
                  { value: "visit", label: "Visit" },
                  { value: "others", label: "Others" },
                ]}
              />
            </div>
            <div className="operationschedule-form-col">
            <FloatingSelect
                label="Consultation Type"
                name="consultationType"
                value={formData.consultationType}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "Select option" },
                  { value: "in-hospital", label: "In-Hospital" },
                  { value: "Online-Tele-Consult", label: "Online-Tele-Consult" }
                ]}
              />
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
