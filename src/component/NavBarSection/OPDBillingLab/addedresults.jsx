import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomModal from "../../../CustomModel/CustomModal"; // Ensure this component exists
import { API_BASE_URL } from "../../api/api";
import './addedresult.css'
import { FloatingInput } from "../../../FloatingInputs";

function AddedResults() {
  const [labResults, setLabResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState("2025-02-10");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLabResultId, setSelectedLabResultId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    fetchData();
    fetchEmployees();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lab-result/by-verify-dateRange?approvalStatus=Active&startDate=${startDate}&endDate=${endDate}`
      );
      setLabResults(response.data);
      setFilteredResults(response.data);
    } catch (error) {
      console.error("Error fetching lab results:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://192.168.1.64:4096/api/employees/get-all-employee");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
    
  };

  const handleFilter = () => {
    const filtered = labResults.filter((result) => {
      return result.verifiedDate >= startDate && result.verifiedDate <= endDate;
    });
    setFilteredResults(filtered);
  };

  const openModal = (labResultId) => {
    setSelectedLabResultId(labResultId);
    setIsPopupOpen(true);
  };

  const handleSubmit = async () => {
    

    try {
      const response = await axios.post(
        `http://192.168.1.64:4096/api/lab-result/${selectedLabResultId}/approve/${selectedEmployee}`,
        { reason }
      );
      alert("Lab result approved successfully!");
      setIsPopupOpen(false);
      fetchData(); // Refresh the table
    } catch (error) {
      console.error("Error approving lab result:", error);
    }
  };

  return (
    <div>
      <h2>Lab Results</h2>

      <div className="addedresults-header">
        <FloatingInput
        label={"Start Date"}
        type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
        
        <FloatingInput
        label={"End Date"}
        type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>

      

        <button className="addedresult-lab-button" onClick={handleFilter}>Filter</button>
      </div>

      <table border="1" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Lab Result ID</th>
            <th>Lab Request ID</th>
            <th>Urgency</th>
            <th>Status</th>
            <th>Requisition Date</th>
            <th>Verified Date</th>
            <th>Verified By</th>
            <th>Approval Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <tr key={result.labResultId}>
                <td>{result.labResultId}</td>
                <td>{result.labRequest.labRequestId}</td>
                <td>{result.labRequest.urgency}</td>
                <td>{result.labRequest.status}</td>
                <td>{result.labRequest.requisitionDate}</td>
                <td>{result.verifiedDate}</td>
                <td>{result.verifyBy}</td>
                <td>{result.approvalStatus}</td>
                <td>
                  <button className="addedresult-lab-button" onClick={() => openModal(result.labResultId)}>Approve By</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>No records found</td>
            </tr>
          )}
        </tbody>
      </table>

      <CustomModal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
      

        <h5>Select Employee</h5>
        <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.employeeId} value={emp.employeeId}>{emp.firstName}</option>
          ))}
        </select>

        <button className="addedresult-lab-button" onClick={handleSubmit}>Submit</button>
      </CustomModal>
    </div>
  );
}

export default AddedResults;
