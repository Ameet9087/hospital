import React, { useState, useRef, useEffect } from "react";
import "./EmergencyRequest.css";
import axios from "axios";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";
import { toast } from "react-toastify";

const EmergencyRequest = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    patientID: "",
    patientName: "",
    dateOfBirth: "",
    patientAge: "",
    patientGender: "",
    medicalRecordNumber: "",
    contactPersonName: "",
    contactPhoneNumber: "",
    relationshipToPatient: "",
    emergencyType: "",
    bloodType: "",
    diagnosticTestsOrdered: "",
    requestingFacility: "",
    facilityAddress: "",
    pickUpLocation: "",
    destinationLocation: "",
    patientCondition: "",
    specialEquipmentNeeded: "",
    medicationAdministered: "",
    dispatchDate: "",
    dispatchTime: "",
    priorityLevel: "",
    transportMode: "",
    additionalNotes: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      patientName: formData.patientName,
      patientAge: formData.patientAge,
      gender: formData.patientGender,
      medicalRecordNumber: formData.medicalRecordNumber,
      contactPersonName: formData.contactPersonName,
      contactPhoneNumber: formData.contactPhoneNumber,
      relationshipToPatient: formData.relationshipToPatient,
      emergencyType: formData.emergencyType,
      requestingFacility: formData.requestingFacility,
      facilityAddress: formData.facilityAddress,
      pickUpLocation: formData.pickUpLocation,
      destinationLocation: formData.destinationLocation,
      patientCondition: formData.patientCondition,
      specialEquipmentNeeded: formData.specialEquipmentNeeded,
      medicationAdministered: formData.medicationAdministered,
      priorityLevel: formData.priorityLevel,
      transportMode: formData.transportMode,
      additionalNotes: formData.additionalNotes,
      dispatchDate: formData.dispatchDate || null,
      dispatchDateTime:
        formData.dispatchDate && formData.dispatchTime
          ? `${formData.dispatchDate}T${formData.dispatchTime}:00`
          : null,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/emergency/create`,
        formattedData
      );
      console.log("Form submitted successfully:", response.data);

      setTableData((prevData) => [
        ...prevData,
        {
          // patientId: formData.patientID,
          patientName: formData.patientName,
          age: formData.patientAge,
          gender: formData.patientGender,
          contact: formData.contactPhoneNumber,
          emergencyType: formData.emergencyType,
        },
      ]);

      setFormData({
        // patientID: "",
        patientName: "",
        dateOfBirth: "",
        patientAge: "",
        patientGender: "",
        medicalRecordNumber: "",
        contactPersonName: "",
        contactPhoneNumber: "",
        relationshipToPatient: "",
        emergencyType: "",
        bloodType: "",
        diagnosticTestsOrdered: "",
        requestingFacility: "",
        facilityAddress: "",
        pickUpLocation: "",
        destinationLocation: "",
        patientCondition: "",
        specialEquipmentNeeded: "",
        medicationAdministered: "",
        dispatchDate: "",
        dispatchTime: "",
        priorityLevel: "",
        additionalNotes: "",
        transportMode: "",
      });
      setShowForm(false);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form.");
    }
  };

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`${API_BASE_URL}/emergency/all`)
      .then((response) => {
        setTableData(response.data); // Assuming API returns an array
      })
      .catch((error) => {
        console.error("Error fetching emergency data:", error);
      });
  }, []);

  return (
    <div className="emergency-request-com-module-form-container">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="emergency-request-com-module-submit-button"
        >
          Add New Emergency Request
        </button>
      )}

      {!showForm ? (
        <>
          <div className="table-container">
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    // "Patient ID",
                    "Patient Name",
                    "Gender",
                    "Emergency Type",
                  ].map((header, index) => (
                    <th
                      key={index}
                      style={{ width: columnWidths[index] }}
                      className="resizable-th"
                    >
                      <div className="header-content">
                        <span>{header}</span>
                        <div
                          className="resizer"
                          onMouseDown={startResizing(
                            tableRef,
                            setColumnWidths
                          )(index)}
                        ></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    {/* <td>{row.patientId}</td> */}
                    <td>{row.patientName}</td>
                    {/* <td>{row.age}</td> */}
                    <td>{row.gender}</td>
                    {/* <td>{row.contact}</td> */}
                    <td>{row.emergencyType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <form
          className="emergency-request-com-module-form"
          onSubmit={handleSubmit}
        >
          <div className="emergency-request-com-module-left">
            {/* <div className="emergency-request-com-module-group">
              <label>
                Patient ID <span className="mandatory">*</span>
              </label>
              <input
                type="text"
                name="patientID"
                value={formData.patientID}
                onChange={handleInputChange}
                placeholder="Patient ID"
                required
              />
            </div> */}
            <div className="emergency-request-com-module-group">
              <FloatingInput
                label={"Patient Name"}
                name="patientName"
                value={formData.patientName}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[a-zA-Z\s]*$/.test(value)) {
                    handleInputChange(e); // Only update state if the input is valid
                  }
                }}
                required
              />
            </div>
            <div className="emergency-request-com-module-group">
              <FloatingInput
                label={"Patient Age"}
                type="number"
                name="patientAge"
                value={formData.patientAge}
                onChange={handleInputChange}
                required
                min="0"
              />
            </div>
            <div className="emergency-request-com-module-group">
              <label>
                Gender <span className="mandatory">*</span>
              </label>
              <div className="emergency-request-com-module-gender-options">
                <label>
                  <input
                    type="radio"
                    name="patientGender"
                    value="Male"
                    checked={formData.patientGender === "Male"}
                    onChange={handleInputChange}
                    required
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="patientGender"
                    value="Female"
                    checked={formData.patientGender === "Female"}
                    onChange={handleInputChange}
                    required
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="patientGender"
                    value="Other"
                    checked={formData.patientGender === "Other"}
                    onChange={handleInputChange}
                    required
                  />
                  Other
                </label>
              </div>
            </div>

            <div className="emergency-request-com-module-group">
              <FloatingInput
                label={"Medical Record Number"}
                type="text"
                name="medicalRecordNumber"
                value={formData.medicalRecordNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="emergency-request-com-module-group">
              <FloatingInput
                label="Contact Person Name"
                type="text"
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[a-zA-Z\s]*$/.test(value)) {
                    handleInputChange(e); // Only update state if the input is valid
                  }
                }}
                required
              />
            </div>
            <div className="emergency-request-com-module-group">
              <FloatingInput
                label="Contact Phone Number"
                type="text" // Use "text" to prevent issues with leading zeros and better control validation
                name="contactPhoneNumber"
                value={formData.contactPhoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only numbers and restrict to 10 digits
                  if (/^\d{0,10}$/.test(value)) {
                    handleInputChange(e); // Update the state only if valid
                  }
                }}
                required
              />
            </div>
            <div className="emergency-request-com-module-group">
              <FloatingInput
                label={"Relationship to Patient"}
                type="text"
                name="relationshipToPatient"
                value={formData.relationshipToPatient}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[a-zA-Z\s]*$/.test(value)) {
                    handleInputChange(e); // Only update state if the input is valid
                  }
                }}
              />
            </div>
            <div className="emergency-request-com-module-group">
              <FloatingInput
                label={"Emergency Type"}
                type="text"
                name="emergencyType"
                value={formData.emergencyType}
                onChange={handleInputChange}
              />
            </div>
            <div className="emergency-request-com-module-group">
              <FloatingInput
                label={"Requesting Facility"}
                type="text"
                name="requestingFacility"
                value={formData.requestingFacility}
                onChange={handleInputChange}
              />
            </div>
            <div className="emergency-request-com-module-group">
              <FloatingInput
                label={"Facility Address"}
                type="text"
                name="facilityAddress"
                value={formData.facilityAddress}
                onChange={handleInputChange}
              />
            </div>
            <div className="emergency-request-com-module-group">
              <FloatingInput
                label={"Pick-Up Location"}
                type="text"
                name="pickUpLocation"
                value={formData.pickUpLocation}
                onChange={handleInputChange}
              />
            </div>
            <div className="emergency-request-com-module-group">
              <FloatingInput
                label={"Destination Location"}
                type="text"
                name="destinationLocation"
                value={formData.destinationLocation}
                onChange={handleInputChange}
              />
            </div>
            <div className="emergency-request-com-module-group">
              <FloatingInput
                label={"Patient Condition"}
                type="text"
                name="patientCondition"
                value={formData.patientCondition}
                onChange={handleInputChange}
              />
            </div>
            <div className="emergency-request-com-module-group">
              <label>Special Equipment Needed</label>
              <div className="special-equipment-options">
                {["Stretcher", "Oxygen", "IV Equipment"].map((equipment) => (
                  <label key={equipment} className="special-equipment-label">
                    <input
                      type="radio"
                      name="specialEquipmentNeeded"
                      value={equipment}
                      checked={formData.specialEquipmentNeeded === equipment}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specialEquipmentNeeded: equipment,
                        })
                      }
                    />
                    {equipment}
                  </label>
                ))}
              </div>
            </div>

            <div className="emergency-request-com-module-group">
              <FloatingInput
                label={"Medication Administered"}
                type="text"
                name="medicationAdministered"
                value={formData.medicationAdministered}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="emergency-request-com-module-right">
            <div className="emergency-request-com-module-group">
              <FloatingInput
                label={"Priority Level"}
                type="text"
                name="priorityLevel"
                value={formData.priorityLevel}
                onChange={handleInputChange}
              />
            </div>
            <div className="emergency-request-com-module-group">
              <FloatingInput
                label={"Transport Mode"}
                type="text"
                name="transportMode"
                value={formData.transportMode}
                onChange={handleInputChange}
              />
            </div>
            <div className="emergency-request-com-module-group">
              <FloatingTextarea
                label={"Additional Notes"}
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="emergency-request-com-module-group">
              <label>Dispatch Date</label>
              <input
                type="date"
                name="dispatchDate"
                value={formData.dispatchDate}
                onChange={handleInputChange}
                required
              />
            </div> */}
            <div className="emergency-request-com-module-group">
              <FloatingInput
                label="Dispatch Date"
                type="date"
                name="dispatchDate"
                value={formData.dispatchDate || ""}
                onChange={handleInputChange}
                required
              />
             
            </div>
            <div className="emergency-request-com-module-group">
            <FloatingInput
                label="Dispatch Time"
                type="time"
                name="dispatchTime"
                value={formData.dispatchTime || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="submit"
              className="emergency-request-com-module-submit-button"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EmergencyRequest;
