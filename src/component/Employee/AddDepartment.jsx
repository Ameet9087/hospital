import React, { useState } from "react";
import "./UpdateDepartmentForm.css"; // Ensure this CSS file styles your form appropriately
import { API_BASE_URL } from "../api/api";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../FloatingInputs";

const departments = [
  { value: "general_medicine", label: "General Medicine" },
  { value: "cardiology", label: "Cardiology" },
  { value: "neurology", label: "Neurology" },
  { value: "neurosurgery", label: "Neurosurgery" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "gastroenterology", label: "Gastroenterology" },
  { value: "hepatology", label: "Hepatology" },
  { value: "nephrology", label: "Nephrology" },
  { value: "urology", label: "Urology" },
  { value: "pulmonology", label: "Pulmonology" },
  { value: "endocrinology", label: "Endocrinology" },
  { value: "rheumatology", label: "Rheumatology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "hematology", label: "Hematology" },
  { value: "oncology", label: "Oncology" },
  { value: "radiology", label: "Radiology & Imaging" },
  { value: "ophthalmology", label: "Ophthalmology" },
  { value: "ent", label: "Otorhinolaryngology (ENT)" },
  { value: "dentistry", label: "Dentistry & Oral Surgery" },
  {
    value: "obstetrics_gynecology",
    label: "Obstetrics & Gynecology (OB/GYN)",
  },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "neonatology", label: "Neonatology" },
  { value: "psychiatry", label: "Psychiatry" },
  {
    value: "psychology",
    label: "Psychology & Behavioral Sciences",
  },
  { value: "geriatrics", label: "Geriatrics" },
  {
    value: "pain_management",
    label: "Pain Management & Palliative Care",
  },
  {
    value: "rehabilitation",
    label: "Rehabilitation & Physiotherapy",
  },
  { value: "emergency_medicine", label: "Emergency Medicine" },
  { value: "general_surgery", label: "General Surgery" },
  {
    value: "cardiothoracic_surgery",
    label: "Cardiothoracic Surgery",
  },
  { value: "vascular_surgery", label: "Vascular Surgery" },
  {
    value: "gastrointestinal_surgery",
    label: "Gastrointestinal Surgery",
  },
  { value: "bariatric_surgery", label: "Bariatric Surgery" },
  { value: "urological_surgery", label: "Urological Surgery" },
  { value: "ophthalmic_surgery", label: "Ophthalmic Surgery" },
  { value: "ent_surgery", label: "ENT Surgery" },
  { value: "oncosurgery", label: "Oncosurgery (Cancer Surgery)" },
  { value: "pathology", label: "Pathology & Laboratory Medicine" },
  {
    value: "microbiology",
    label: "Microbiology & Infection Control",
  },
  {
    value: "blood_bank",
    label: "Blood Bank & Transfusion Services",
  },
  { value: "nutrition", label: "Nutrition & Dietetics" },
  {
    value: "anesthesiology",
    label: "Anesthesiology & Pain Management",
  },
  { value: "nuclear_medicine", label: "Nuclear Medicine" },
  { value: "critical_care", label: "Critical Care (ICU & CCU)" },
  { value: "other", label: "other" },
];

const AddDepartment = ({ onClose }) => {
  const [departmentCode, setDepartmentCode] = useState(""); //Assuming 'ACC' is a default or auto-generated code
  const [departmentName, setDepartmentName] = useState("");
  const [parentDepartment, setParentDepartment] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const [departmentNoticeText, setDepartmentNoticeText] = useState("");
  const [departmentHead, setDepartmentHead] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [isActive, setIsActive] = useState("Yes");
  const [isAppointmentApplicable, setIsAppointmentApplicable] = useState("No");
  const [customParentDepartment, setCustomParentDepartment] = useState(""); // For "Other"

  const [loading, setLoading] = useState(false); // To manage loading state

  const generateDepartmentCode = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .substring(0, 4); // Max 4 letters
  };

  const handleDepartmentNameChange = (e) => {
    const name = e.target.value;
    setDepartmentName(name);
    setDepartmentCode(generateDepartmentCode(name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      departmentCode,
      departmentName,
      parentDepartmentName:
        parentDepartment === "other"
          ? customParentDepartment
          : parentDepartment,
      description: departmentDescription || null,
      noticeText: departmentNoticeText || null,
      departmentHead: departmentHead || null,
      roomNumber: roomNumber || null,
      isActive,
      isAppointmentApplicable,
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/departments/add-department`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success("Department added successfully!");

       
        onClose();
      } else {
        let errorMessage = "Failed to add department.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Keep default message
        }
        toast.error(errorMessage);
      }
    } catch (err) {
      toast.error(
        "An error occurred while adding the department. Please try again."
      );
      console.error("Error adding department:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleReset = (e) => {
    e.preventDefault();  // Prevent form submission on reset
    setDepartmentCode("");
    setDepartmentName("");
    setParentDepartment("");
    setDepartmentDescription("");
    setDepartmentNoticeText("");
    setDepartmentHead("");
    setRoomNumber("");
    setIsActive("Yes");
    setIsAppointmentApplicable("No");
  };
  

  return (
    <div className="update-setting-department-form-container">
      <form className="update-setting-department-form" onSubmit={handleSubmit}>
        <h2>Add Department</h2>
        <div className="update-setting-form-group">
          <FloatingInput
            label={"Department Name"}
            type="text"
            value={departmentName}
            onChange={handleDepartmentNameChange}
            required
          />
          <FloatingInput
            label={"Department Code"}
            type="text"
            value={departmentCode}
            readOnly
          />
        </div>
        <div className="update-setting-form-group">
          {parentDepartment != "other" ? (
            <FloatingSelect
              label={"Parent Department Name"}
              name="parentDepartment"
              value={parentDepartment}
              onChange={(e) => setParentDepartment(e.target.value)}
              options={departments}
            />
          ) : (
            <FloatingInput
              label={"Specify Parent Department"}
              type="text"
              value={customParentDepartment}
              onChange={(e) => setCustomParentDepartment(e.target.value)}
              required
            />
          )}

          <FloatingInput
            label={"Department Head"}
            type="text"
            value={departmentHead}
            onChange={(e) => setDepartmentHead(e.target.value)}
          />
        </div>

        <div className="update-setting-form-group">
          <FloatingTextarea
            label={"Department Description"}
            value={departmentDescription}
            onChange={(e) => setDepartmentDescription(e.target.value)}
          />
          <FloatingTextarea
            label={"Department Notice Text"}
            value={departmentNoticeText}
            onChange={(e) => setDepartmentNoticeText(e.target.value)}
          />
        </div>
        <div className="update-setting-form-group">
          <FloatingSelect
            label={"Is Active"}
            value={isActive}
            onChange={(e) => setIsActive(e.target.value)}
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
          />
          <FloatingSelect
            label={"Is Appointment Applicable"}
            value={isAppointmentApplicable}
            onChange={(e) => setIsAppointmentApplicable(e.target.value)}
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
          />
        </div>
        <div className="update-setting-form-group">
          <FloatingInput
            label={"Room Number"}
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </div>
        <div >
          <button className="manage-add-department-btn" type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
          <button className="manage-add-department-btn" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartment;
