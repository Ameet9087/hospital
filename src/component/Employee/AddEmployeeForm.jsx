import React, { useState, useEffect } from "react";
import "./AddEmployeeForm.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../FloatingInputs";

const AddEmployeeForm = ({ onClose }) => {
  const [employeeData, setEmployeeData] = useState({
    salutation: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    emailId: "",
    signatureShort: "",
    signatureLong: "",
    dateOfJoining: "",
    contactAddress: "",
    kraPin: "",
    isIncentiveApplicable: false,
    extension: "",
    speedDial: "",
    officeHour: "",
    bloodGroup: "",
    drivingLicenseNo: "",
    isActive: false,
    displaySequence: "",
    employeeSignature: "",
  });
  const [showTable, setShowTable] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [employeeRoles, setEmployeeRoles] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployeeRole, setSelectedEmployeeRole] = useState("");
  const [selectedEmployeeType, setSelectedEmployeeType] = useState("");

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/departments/getAllDepartments`
      );
      setDepartments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // Fetch employee types
  const fetchEmployeeTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employeeTypes/getAll`);
      setEmployeeTypes(response.data);
    } catch (error) {
      console.error("Error fetching employee types:", error);
    }
  };

  // Fetch employee roles
  const fetchEmployeeRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employeeRoles/getAll`);
      setEmployeeRoles(response.data);
    } catch (error) {
      console.error("Error fetching employee roles:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchEmployeeTypes();
    fetchEmployeeRoles();
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "appointmentApplicable") {
      setShowTable(checked);
    }
  };
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedEmployeeRole(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedEmployeeType(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEmployeeData((prevData) => ({
        ...prevData,
        employeeSignature: reader.result.split(",")[1], // Base64 content without the prefix
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEmployeeData = {
      ...employeeData,
      department: {
        departmentId: selectedDepartment, // Add selected department ID
      },
      employeeRole: {
        employeeRoleId: selectedEmployeeRole, // Add selected employee role ID
      },
      employeeType: {
        employeeTypeId: selectedEmployeeType, // Add selected employee type ID
      },
    };
    console.log("post data", updatedEmployeeData);

    try {
      const formData = new FormData();

      formData.append(
        "employee",
        new Blob([JSON.stringify(updatedEmployeeData)], {
          type: "application/json",
        })
      );

      if (employeeData.employeeSignature) {
        formData.append(
          "employeeSignatureFile",
          employeeData.employeeSignature
        );
      }

      console.log(updatedEmployeeData);
      const response = await axios.post(
        `${API_BASE_URL}/employees/save-employee-detail`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Employee added successfully");
      setEmployeeData({
        salutation: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        emailId: "",
        signatureShort: "",
        signatureLong: "",
        department: "", // Reset department selection
        role: "", // Reset role selection
        type: "", // Reset type selection
        dateOfJoining: "",
        contactAddress: "",
        kraPin: "",
        isIncentiveApplicable: false,
        extension: "",
        speedDial: "",
        officeHour: "",
        bloodGroup: "",
        drivingLicenseNo: "",
        isActive: false,
        displaySequence: "",
        employeeSignature: null,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="add-employee-modal-overlay">
      <div className="add-employee-form">
        <form onSubmit={handleSubmit}>
          <div className="add-employee-form-header">
            <h2>Add Employee</h2>
          </div>

          <div className="add-employee-grid">
            <div className="add-employee-group">
              <FloatingSelect
                label={"Salutation"}
                name="salutation"
                value={employeeData.salutation}
                onChange={handleChange}
                options={[
                  { value: "Mr", label: "Mr" },
                  { value: "Ms", label: "Ms" },
                  { value: "Mrs", label: "Mrs" },
                  { value: "Dr", label: "Dr" },
                ]}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"First Name"}
                type="text"
                name="firstName"
                value={employeeData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"Middle Name"}
                type="text"
                name="middleName"
                value={employeeData.middleName}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"Last Name"}
                type="text"
                name="lastName"
                value={employeeData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"DOB"}
                type="date"
                name="dateOfBirth"
                value={employeeData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-employee-group">
              <FloatingSelect
                label={"Gender"}
                name="gender"
                value={employeeData.gender}
                onChange={handleChange}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
                required
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"Contact Number"}
                type="text"
                name="contactNumber"
                value={employeeData.contactNumber}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"Email Id"}
                type="email"
                name="emailId"
                value={employeeData.emailId}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingTextarea
                label={"Signature(Short)"}
                name="signatureShort"
                value={employeeData.signatureShort}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingTextarea
                label={"Signature(Long)"}
                name="signatureLong"
                value={employeeData.signatureLong}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingTextarea
                label={"Office Hour"}
                name="officeHour"
                value={employeeData.officeHour}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingTextarea
                label={"Contact Address"}
                name="contactAddress"
                value={employeeData.contactAddress}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"PIN Code"}
                type="text"
                name="kraPin"
                value={employeeData.kraPin}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingSelect
                label={"Employee Role"}
                id="employeeRole"
                name="employeeRole"
                value={selectedEmployeeRole}
                onChange={handleRoleChange}
                options={[
                  ...employeeRoles.map((role) => ({
                    value: role.employeeRoleId,
                    label: role.role,
                  })),
                ]}
              />
            </div>
            <div className="add-employee-group">
              <FloatingSelect
                label={"Employee Type"}
                id="employeeType"
                name="employeeType"
                value={selectedEmployeeType}
                onChange={handleTypeChange}
                options={[
                  ...employeeTypes.map((type) => ({
                    value: type.employeeTypeId,
                    label: type.employeeType,
                  })),
                ]}
              />
            </div>
            <div className="add-employee-group">
              <FloatingSelect
                label={"Department"}
                id="department"
                name="department"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                options={[
                  ...departments.map((dept) => ({
                    value: dept.departmentId,
                    label: dept.departmentName,
                  })),
                  { value: "other", label: "Other (Specify)" }, // Adding "Other" option
                ]}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"Date Of Joining"}
                type="date"
                name="dateOfJoining"
                value={employeeData.dateOfJoining}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"SpeedDial"}
                type="text"
                name="speedDial"
                value={employeeData.speedDial}
                onChange={handleChange}
              />
            </div>

            <div className="add-employee-group">
              <FloatingSelect
                label={"Blood Group"}
                name="bloodGroup"
                value={employeeData.bloodGroup}
                onChange={handleChange}
                options={[
                  { value: "A+", label: "A+" },
                  { value: "O+", label: "O+" },
                  { value: "B+", label: "B+" },
                  { value: "AB+", label: "AB+" },
                  { value: "A-", label: "A-" },
                  { value: "O-", label: "O-" },
                  { value: "B-", label: "B-" },
                  { value: "AB-", label: "AB-" },
                ]}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"Driving License No"}
                type="text"
                name="drivingLicenseNo"
                value={employeeData.drivingLicenseNo}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Is Active:</label>
              <input
                className="emp-input"
                type="checkbox"
                name="isActive"
                checked={employeeData.isActive}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"Display Sequence"}
                type="text"
                name="displaySequence"
                value={employeeData.displaySequence}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                type="file"
                name="employeeSignature"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="emp-app">
            <div className="add-employee-buttons">
              <button type="submit" className="add-employee-button">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
