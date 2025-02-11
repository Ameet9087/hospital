import React, { useState, useEffect } from "react";
import "./AddEmployeeForm.css";

import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../FloatingInputs/index";
import { API_BASE_URL } from "../api/api";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateEmployeeForm = ({ employee, onClose }) => {
  const [departments, setDepartments] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [employeeRoles, setEmployeeRoles] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployeeRole, setSelectedEmployeeRole] = useState("");
  const [selectedEmployeeType, setSelectedEmployeeType] = useState("");
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

  const fetchEmployeeTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employeeTypes/getAll`);
      setEmployeeTypes(response.data);
    } catch (error) {
      console.error("Error fetching employee types:", error);
    }
  };

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
  const handleFileChange = (e) => {
    const file = e.target.files?.[0]; // Check if a file exists
    if (!file) return; // Exit if no file is selected

    const reader = new FileReader();
    reader.onloadend = () => {
      setEmployeeData((prevData) => ({
        ...prevData,
        employeeSignature: reader.result.split(",")[1], // Base64 content without the prefix
      }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (employee) {
      setEmployeeData((prevData) => ({
        ...prevData,
        ...employee, // Spread the main employee data
        isActive: employee.isActive === "true", // Ensure boolean conversion
      }));

      // Set nested fields for the dropdowns
      setSelectedDepartment(employee.departmentDTO?.departmentId || "");
      setSelectedEmployeeRole(employee.employeeRoleDTO?.employeeRoleId || "");
      setSelectedEmployeeType(employee.employeeTypeDTO?.employeeTypeId || "");
    }
  }, [employee]);

  // console.log("propes employee",JSON.stringify(employee,1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEmployeeData = {
      salutation: employeeData.salutation,
      firstName: employeeData.firstName,
      middleName: employeeData.middleName,
      lastName: employeeData.lastName,
      dateOfBirth: employeeData.dateOfBirth,
      gender: employeeData.gender,
      contactNumber: employeeData.contactNumber,
      emailId: employeeData.emailId,
      signatureShort: employeeData.signatureShort,
      signatureLong: employeeData.signatureLong,
      dateOfJoining: employeeData.dateOfJoining,
      contactAddress: employeeData.contactAddress,
      kraPin: employeeData.kraPin,
      isIncentiveApplicable: employeeData.isIncentiveApplicable,
      extension: employeeData.extension,
      speedDial: employeeData.speedDial,
      officeHour: employeeData.officeHour,
      bloodGroup: employeeData.bloodGroup,
      drivingLicenseNo: employeeData.drivingLicenseNo,
      isActive: employeeData.isActive,
      displaySequence: employeeData.displaySequence,
      department: { departmentId: selectedDepartment },
      employeeRole: { employeeRoleId: selectedEmployeeRole },
      employeeType: { employeeTypeId: selectedEmployeeType },
    };

    console.log("Updated employee data:", updatedEmployeeData);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/employees/${employee.employeeId}`,
        updatedEmployeeData, // Sending JSON directly in the request body
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            employeeSignatureFile: employeeData.employeeSignature || null, // File as a separate query parameter or form data
          },
        }
      );

      if (response.status === 200) {
        toast.success("Employee updated successfully");
        resetForm();
        onClose();
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee");
    }
  };

  // Helper to reset the form state
  const resetForm = () => {
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
      department: "",
      role: "",
      type: "",
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
  };

  return (
    <div className="add-employee-modal-overlay">
      <div className="add-employee-form">
        <form onSubmit={handleSubmit}>
          <div className="add-employee-form-header">
            <h2>Update Employee</h2>
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
              <input
                type="file"
                name="employeeSignature"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="emp-app">
            <div className="add-employee-buttons">
              <button type="submit" className="add-employee-button">
                update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployeeForm;
