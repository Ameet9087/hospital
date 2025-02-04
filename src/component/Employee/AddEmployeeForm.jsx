import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import "./AddEmployeeForm.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";

const AddEmployeeForm = ({ onClose }) => {
  const [employeeData, setEmployeeData] = useState({
    salutation: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    kmpdcNo: "",
    knncNo: "",
    knhpcNo: "",
    contactNumber: "",
    emailId: "",
    signatureShort: "",
    signatureLong: "",
    dateOfJoining: "",
    contactAddress: "",
    kraPin: "",
    taxPercentage: "",
    isIncentiveApplicable: false,
    extension: "",
    speedDial: "",
    officeHour: "",
    roomNo: "",
    bloodGroup: "",
    drivingLicenseNo: "",
    isActive: false,
    radiologySignature: "",
    displaySequence: "",
    signatureImage: null,
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
    setEmployeeData((prevData) => ({
      ...prevData,
      signatureImage: e.target.files[0],
    }));
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

    try {
      console.log(updatedEmployeeData);
      const response = await axios.post(
        `${API_BASE_URL}/employees/save-employee-detail`,
        updatedEmployeeData,
        {}
      );

      console.log("Employee added successfully:", response.data);

      // Reset form fields
      setEmployeeData({
        salutation: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        kmpdcNo: "",
        knncNo: "",
        knhpcNo: "",
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
        taxPercentage: "",
        isIncentiveApplicable: false,
        extension: "",
        speedDial: "",
        officeHour: "",
        roomNo: "",
        bloodGroup: "",
        drivingLicenseNo: "",
        isActive: false,
        radiologySignature: "",
        displaySequence: "",
        signatureImage: null,
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
            <div className="emp-form-add">
              <div className="add-employee-group">
                <label className="emp-input">Salutation:</label>
                <select
                  className="emp-input"
                  name="salutation"
                  value={employeeData.salutation}
                  onChange={handleChange}
                >
                  <option value="">--select--</option>
                  <option>Mr</option>
                  <option>Ms</option>
                  <option>Mrs</option>
                  <option>Dr</option>
                </select>
              </div>
              <div className="add-employee-group">
                <label className="emp-input">First Name*:</label>
                <input
                  className="emp-input"
                  type="text"
                  name="firstName"
                  value={employeeData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Middle Name:</label>
                <input
                  className="emp-input"
                  type="text"
                  name="middleName"
                  value={employeeData.middleName}
                  onChange={handleChange}
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Last Name*:</label>
                <input
                  className="emp-input"
                  type="text"
                  name="lastName"
                  value={employeeData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Date Of Birth*:</label>
                <input
                  className="emp-input"
                  type="date"
                  name="dateOfBirth"
                  value={employeeData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Gender*:</label>
                <select
                  className="emp-input"
                  name="gender"
                  value={employeeData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">--select--</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Aadhar Card NO:</label>
                <input
                  className="emp-input"
                  type="text"
                  name="kmpdcNo"
                  value={employeeData.kmpdcNo}
                  onChange={handleChange}
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Pan Card NO:</label>
                <input
                  className="emp-input"
                  type="text"
                  name="knncNo"
                  value={employeeData.knncNo}
                  onChange={handleChange}
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Driving Licence NO:</label>
                <input
                  className="emp-input"
                  type="text"
                  name="knhpcNo"
                  value={employeeData.knhpcNo}
                  onChange={handleChange}
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Contact Number:</label>
                <input
                  className="emp-input"
                  type="text"
                  name="contactNumber"
                  value={employeeData.contactNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Email Id:</label>
                <input
                  className="emp-input"
                  type="email"
                  name="emailId"
                  value={employeeData.emailId}
                  onChange={handleChange}
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Signature(Short):</label>
                <textarea
                  name="signatureShort"
                  value={employeeData.signatureShort}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Signature(Long):</label>
                <textarea
                  name="signatureLong"
                  value={employeeData.signatureLong}
                  onChange={handleChange}
                ></textarea>
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
            </div>
            <div className="emp-depart">
              <div className="add-employee-group">
                <label htmlFor="department">Department:</label>
                <select
                  id="department"
                  name="department"
                  className="emp-select"
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.departmentId} value={dept.departmentId}>
                      {dept.departmentName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Employee Role:</label>
                <select
                  id="employeeRole"
                  name="employeeRole"
                  className="emp-select"
                  value={selectedEmployeeRole}
                  onChange={handleRoleChange}
                >
                  <option value="">Select Employee Role</option>
                  {employeeRoles.map((role) => (
                    <option
                      key={role.employeeRoleId}
                      value={role.employeeRoleId}
                    >
                      {role.role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Employee Type:</label>
                <select
                  id="employeeType"
                  name="employeeType"
                  className="emp-select"
                  value={selectedEmployeeType}
                  onChange={handleTypeChange}
                >
                  <option value="">Select Employee Type</option>
                  {employeeTypes.map((type) => (
                    <option
                      key={type.employeeTypeId}
                      value={type.employeeTypeId}
                    >
                      {type.employeeType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Date Of Joining:</label>
                <input
                  className="emp-input"
                  type="date"
                  name="dateOfJoining"
                  value={employeeData.dateOfJoining}
                  onChange={handleChange}
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Contact Address:</label>
                <textarea
                  name="contactAddress"
                  value={employeeData.contactAddress}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="add-employee-group">
                <label className="emp-input">PIN Code:</label>
                <input
                  className="emp-input"
                  type="text"
                  name="kraPin"
                  value={employeeData.kraPin}
                  onChange={handleChange}
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Tax percentage:</label>
                <input
                  className="emp-input"
                  type="number"
                  name="taxPercentage"
                  value={employeeData.taxPercentage}
                  onChange={handleChange}
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Is Incentive Applicable:</label>
                <input
                  className="emp-input"
                  type="checkbox"
                  name="isIncentiveApplicable"
                  checked={employeeData.isIncentiveApplicable}
                  onChange={handleChange}
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Extension:</label>
                <input
                  className="emp-input"
                  type="text"
                  name="extension"
                  value={employeeData.extension}
                  onChange={handleChange}
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">SpeedDial:</label>
                <input
                  className="emp-input"
                  type="text"
                  name="speedDial"
                  value={employeeData.speedDial}
                  onChange={handleChange}
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Office Hour:</label>
                <textarea
                  name="officeHour"
                  value={employeeData.officeHour}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Room No.:</label>
                <input
                  className="emp-input"
                  type="text"
                  name="roomNo"
                  value={employeeData.roomNo}
                  onChange={handleChange}
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Blood Group:</label>
                <select
                  className="emp-input"
                  name="bloodGroup"
                  value={employeeData.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">Select Blood Group</option>
                  <option>A+</option>
                  <option>O+</option>
                  <option>B+</option>
                  <option>AB+</option>
                  <option>A-</option>
                  <option>O-</option>
                  <option>B-</option>
                  <option>AB-</option>
                </select>
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Driving License No:</label>
                <input
                  className="emp-input"
                  type="text"
                  name="drivingLicenseNo"
                  value={employeeData.drivingLicenseNo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="emp-radio-sign">
              <div className="add-employee-group">
                <label className="emp-input">Radiology Signature:</label>
                <textarea
                  name="radiologySignature"
                  value={employeeData.radiologySignature}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Display Sequence:</label>
                <input
                  className="emp-input"
                  type="text"
                  name="displaySequence"
                  value={employeeData.displaySequence}
                  onChange={handleChange}
                />
              </div>
              <div className="add-employee-group">
                <label className="emp-input">Signature Image:</label>
                <input
                  type="file"
                  name="signatureImage"
                  onChange={handleFileChange}
                  className="emp-input"
                />
              </div>
            </div>
          </div>
          <div className="emp-app">
           
            {showTable && (
              <table className="service-table">
                <thead>
                  <tr>
                    <th>Service Name </th>
                    <th>Service Item Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label>
                        <input type="checkbox" name="serviceName1" />
                        OPD (New Patient)
                      </label>
                    </td>
                    <td>
                      <input type="text" name="serviceItem1" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>
                        <input type="checkbox" name="serviceName2" />
                        OPD (Followup Patient)
                      </label>
                    </td>
                    <td>
                      <input type="text" name="serviceItem2" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>
                        <input type="checkbox" name="serviceName3" />
                        OPD (Old Patient)
                      </label>
                    </td>
                    <td>
                      <input type="text" name="serviceItem3" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>
                        <input type="checkbox" name="serviceName4" />
                        OPD (Referral Patient)
                      </label>
                    </td>
                    <td>
                      <input type="text" name="serviceItem4" />
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
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
