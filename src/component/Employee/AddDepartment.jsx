import React, { useState } from "react";
import "./UpdateDepartmentForm.css"; // Ensure this CSS file styles your form appropriately
import { API_BASE_URL } from "../api/api";
// Replace with your actual API base URL

const AddDepartment = ({ onClose }) => {
  const [departmentCode, setDepartmentCode] = useState("ACC"); // Assuming 'ACC' is a default or auto-generated code
  const [departmentName, setDepartmentName] = useState("Account");
  const [parentDepartment, setParentDepartment] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const [departmentNoticeText, setDepartmentNoticeText] = useState("");
  const [departmentHead, setDepartmentHead] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [isActive, setIsActive] = useState("Yes");
  const [isAppointmentApplicable, setIsAppointmentApplicable] = useState("No");

  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(null); // To manage error messages
  const [success, setSuccess] = useState(null); // To manage success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Construct the payload
    const payload = {
      departmentCode,
      departmentName,
      parentDepartmentName: parentDepartment || null, // Assuming optional
      description: departmentDescription || null,
      noticeText: departmentNoticeText || null,
      departmentHead: departmentHead || null,
      roomNumber: roomNumber || null,
      isActive: isActive? "Yes" :"No", // Convert to boolean if API expects
      isAppointmentApplicable: isAppointmentApplicable ? "Yes" :"No", // Convert to boolean if API expects
    };

    try {
      console.log(payload);
      
      const response = await fetch(
        `${API_BASE_URL}/departments/add-department`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include authentication headers if required
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setSuccess("Department added successfully!");
        // Optionally, you can reset the form or perform other actions
        // Resetting form fields
        setDepartmentCode(""); // Or set to default if necessary
        setDepartmentName("");
        setParentDepartment("");
        setDepartmentDescription("");
        setDepartmentNoticeText("");
        setDepartmentHead("");
        setRoomNumber("");
        setIsActive("Yes");
        setIsAppointmentApplicable("No");
        // Close the form after a short delay
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add department.");
      }
    } catch (err) {
      setError(
        "An error occurred while adding the department. Please try again."
      );
      console.error("Error adding department:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-setting-department-form-container">
      <form className="update-setting-department-form" onSubmit={handleSubmit}>
        <h2>Add Department</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="update-setting-form-group">
          <label>
            Department Code :</label>
          <input
            type="text"
            value={departmentCode}
            onChange={(e) => setDepartmentCode(e.target.value)}
            required
          />
        </div>

        <div className="update-setting-form-group">
          <label>
            Department Name :
          </label>
  
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </div>

        <div className="update-setting-form-group">
          <label>Parent Department Name :</label>
          <select
            name="parentDepartment"
            value={parentDepartment}
            onChange={(e) => setParentDepartment(e.target.value)}
          >
            <option value="">--select--</option>
            <option value="Administration">Administration</option>
            <option value="Account">Account</option>
            <option value="Anesthesia">Anesthesia</option>
            <option value="Billing">Billing</option>
            <option value="BrainOperations">Brain operations</option>
            <option value="CSSD">CSSD</option>
            <option value="CTMRI">CT/MRI</option>
            <option value="CTVS">CTVS</option>
            <option value="CabinSuite">Cabin/Deluxe/Suite</option>
            <option value="Cardiology">Cardiology</option>
            <option value="CathLab">Cath lab</option>
            <option value="CleaningDepartment">Cleaning Department</option>
            <option value="Dental">Dental</option>
            <option value="Dermatology">Dermatology & Cosmatology</option>
            <option value="Dialysis">Dialysis</option>
            <option value="Dietary">Dietary</option>
            <option value="Dispensary">Dispensary</option>
            <option value="EmergencyCasualty">Emergency/Casualty</option>
            <option value="ENT">Ear-Nose-Throat</option>
            <option value="Gynecology">Gynecology</option>
            <option value="MaternityWard">Maternity Ward</option>
            <option value="MedicalRecords">Medical Record Department</option>
            <option value="Medicine">Medicine</option>
            <option value="Neurosurgery">Neurosurgery</option>
            <option value="NST">NST</option>
            <option value="NursingStation">Nursing Station</option>
            <option value="NICU">Neonatal Intensive Care Unit</option>
            <option value="Nephrology">Nephrology</option>
            <option value="Nursing">Nursing</option>
            <option value="ObstetricGynaecology">
              Obstetric & Gynaecology
            </option>
            <option value="Oncologist">Oncologist</option>
            <option value="OperationTheatre">Operation Theatre</option>
            <option value="OperationsDepartment">Operations Department</option>
            <option value="Ophthalmology">Ophthalmology</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="OrthopedicSpine">Orthopedic/Spine</option>
            <option value="OutPatientDepartment">Out Patient Department</option>
            <option value="PediatricNeonatology">Pediatric Neonatology</option>
            <option value="PlasticSurgeon">Plastic Surgeon</option>
            <option value="PostOp">Post-Op</option>
            <option value="Pathology">Pathology</option>
            <option value="Pediatric">Pediatric</option>
            <option value="PediatricSurgeon">Pediatric Surgeon</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Physiotherapy">Physiotherapy</option>
            <option value="Psychiatry">Psychiatry</option>
            <option value="Pulmonary">Pulmonary</option>
            <option value="Radiology">Radiology</option>
            <option value="Reception">Reception</option>
            <option value="RheumatoidArthritis">Rheumatoid Arthritis</option>
            <option value="Security">Security</option>
            <option value="SSF">Social Security Fund</option>
            <option value="Surgery">Surgery</option>
            <option value="TravelMedicine">Travel Medicine</option>
            <option value="Urology">Urology</option>
            <option value="XRayDepartment">X-Ray Department</option>
          </select>
        </div>

        <div className="update-setting-form-group">
          <label>Department Description :</label>
         
          <textarea
            value={departmentDescription}
            onChange={(e) => setDepartmentDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="update-setting-form-group">
          <label>Department Notice Text :</label>
         
          <textarea
            value={departmentNoticeText}
            onChange={(e) => setDepartmentNoticeText(e.target.value)}
          ></textarea>
        </div>

        <div className="update-setting-form-group">
          <label>Department Head :</label>
        
          <input
            type="text"
            value={departmentHead}
            onChange={(e) => setDepartmentHead(e.target.value)}
          />
        </div>

        <div className="update-setting-form-group">
          <label>Room Number :</label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </div>

        <div className="update-setting-form-group">
          <label>Is Active :</label>
          
          <select
            value={isActive}
            onChange={(e) => setIsActive(e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="update-setting-form-group">
          <label>Is Appointment Applicable :</label>
          
          <select
            value={isAppointmentApplicable}
            onChange={(e) => setIsAppointmentApplicable(e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="update-setting-form-group submit-btn">
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartment;
