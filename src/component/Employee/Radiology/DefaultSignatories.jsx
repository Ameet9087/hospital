import React, { useEffect, useState } from "react";
import "./DefaultSignatories.css";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";

const DefaultSignatories = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedSignatories, setSelectedSignatories] = useState(new Set());

  const fetchAllEmployees = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/employees/department?departmentName=Radiology`
    );
    setEmployees(response.data);
  };

  const fetchDefaultSignatories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/radiology-signatories`);
      const signatoriesData = Array.isArray(response.data) ? response.data : [];
      const defaultSignatoriesIds = signatoriesData.map(
        (signatory) => signatory.employeeDTO.employeeId
      );

      setSelectedSignatories(new Set(defaultSignatoriesIds));
    } catch (error) {
      console.error("Error fetching default signatories:", error);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
    fetchDefaultSignatories();
  }, []);

  const handleCheckboxChange = (employeeId) => {
    setSelectedSignatories((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(employeeId)) {
        newSelected.delete(employeeId);
      } else {
        newSelected.add(employeeId);
      }
      return newSelected;
    });
  };

  const updateDefaultSignatories = async () => {
    console.log(selectedSignatories);

    await axios.put(
      `${API_BASE_URL}/radiology-signatories/batch`,
      Array.from(selectedSignatories)
    );
    alert("Default Signatories updated successfully!");
  };

  return (
    <div className="default-signatories-container">
      <div className="default-signatories-header">
        <h3>Default Signatories for Radiology:</h3>
      </div>
      <div className="default-signatories-list">
        {employees.map((emp) => (
          <label key={emp.employeeId} className="default-signatories-item">
            <input
              type="checkbox"
              checked={selectedSignatories.has(emp.employeeId)}
              onChange={() => handleCheckboxChange(emp.employeeId)}
            />
            {emp.salutation} {emp.firstName} {emp.middleName} {emp.lastName}
          </label>
        ))}
      </div>
      <div className="default-signatories-button-container">
        <button
          className="default-signatories-update-button"
          onClick={updateDefaultSignatories}
        >
          Update Default Signatories
        </button>
      </div>
    </div>
  );
};

export default DefaultSignatories;
