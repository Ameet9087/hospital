import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios"; // Axios for API calls
import "./AssetNewReplacementRequestPopUp.css";
import { API_BASE_URL } from "../../../api/api";

const AssetNewReplacementRequestPopUp = ({ onClose }) => {


  const [selectedTab, setSelectedTab] = useState("approveDetails");

  // State for approval details
  const [approvalDetails, setApprovalDetails] = useState([
    { id: 1, approvedBy: "", priority: "" },
  ]);

  // State for approval status
  const [approvalStatus, setApprovalStatus] = useState([
    {
      id: 1,
      approvedBy: "",
      remarks: "",
      approvalTime: "",
      approvalDate: "",
    },
  ]);

  // Handle input changes for Approval Details
  const handleApprovalDetailsChange = (id, field, value) => {
    setApprovalDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.id === id ? { ...detail, [field]: value } : detail
      )
    );
  };

  // Handle input changes for Approval Status
  const handleApprovalStatusChange = (id, field, value) => {
    setApprovalStatus((prevStatus) =>
      prevStatus.map((status) =>
        status.id === id ? { ...status, [field]: value } : status
      )
    );
  };

  

  const [equipmentData, setEquipmentData] = useState(
    
    
    
    {
      entryDate: "",
      capitalItem: "",
      type: "",
  
      procedureToBeDone: "",
      damageReport: "",
      nameOfManufacturer: "",
      quantity: "",
      patientLoad: "",
      justification: "",
      dmsRemark: "",
      msRemark: "",
      mdRemark: "",
      rateComparison: "",
      remark: "",
      approvalDate : "",
      approvalTime : "",
      equipmentDTO: {
        equipmentMasterId: "",
        assetNo: "",
        equipmentName: "",
        cost: "",
        equipmentNo: "",
        locationPath: "",
        assetLocationMaster: {
          locId: "",
          subLocation: "",
          areaSq: "",
        },
      },
      docterDTO: {
        doctorId: "",
        doctorName: "",
        unitMaster: "",
      },
      departmentDTO: {
        departmentId: "",
        departmentName: "",
      },
      employeeDTO: {
        employeeId: "",
        firstName: "",
      },
    }
    



);

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/departments/getAllDepartments`);
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/doctors`);
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchEquipments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/equipment-masters`);
        setEquipments(response.data);
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      }
    };

    fetchDepartments();
    fetchDoctors();
    fetchEquipments();
  }, []);

  const handleChange = (e) => {
    const selectedDoctorId = parseInt(e.target.value, 10); // Ensure it's an integer
    
    setEquipmentData({
      ...equipmentData,
      docterDTO: {
        ...equipmentData.docterDTO,
        doctorId: selectedDoctorId,  // Store the doctorId (integer)
      },
    });
  };
  
  
  const handleDepartmentChange = (e) => {
    // If you need to get the departmentId as integer, make sure it's passed correctly
    const selectedDepartmentId = parseInt(e.target.value, 10);  // Convert to integer
    
    setEquipmentData({
      ...equipmentData,
      departmentDTO: {
        ...equipmentData.departmentDTO,
        departmentId: selectedDepartmentId, // Ensure it's an integer
      },
    });
  };
  

  const handleEquipmentChange = async (e) => {
    const selectedEquipmentId = parseInt(e.target.value, 10); // Ensure it's an integer
    
    setEquipmentData((prevData) => ({
      ...prevData,
      equipmentDTO: {
        ...prevData.equipmentDTO,
        equipmentMasterId: selectedEquipmentId,
      },
    }));
  
    if (selectedEquipmentId) {
      try {
        // Fetch equipment details based on the selected equipment ID
        const response = await axios.get(`${API_BASE_URL}/equipment-masters/${selectedEquipmentId}`);
        const equipmentDetails = response.data;
  
        // Merge the fetched locationPath, subLocation, and other details
        setEquipmentData((prevData) => ({
          ...prevData,
          equipmentDTO: {
            ...prevData.equipmentDTO,
            assetNo: equipmentDetails.assetNo || "",
            equipmentNo: equipmentDetails.typeOfEquipment || "",
            equipmentName: equipmentDetails.equipmentName || "",
            cost: equipmentDetails.cost || "",
            locationPath: equipmentDetails.locationPath || "",  // Added locationPath
            assetLocationMaster: {
              ...prevData.equipmentDTO.assetLocationMaster,
              subLocation: equipmentDetails.assetLocationMaster?.subLocation || "",  // Added subLocation
            },
          },
          employeeDTO: {
            ...prevData.employeeDTO,
            employeeId: equipmentDetails.employee?.employeeId || "", // Fetch and store employeeId
            firstName: equipmentDetails.employee?.firstName || "",
          },
        }));
      } catch (error) {
        console.error("Error fetching equipment details:", error);
      }
    }
  };
  
  
  
  useEffect(() => {
    console.log("Selected Equipment Master ID:", equipmentData.equipmentDTO.equipmentMasterId);
  }, [equipmentData.equipmentDTO.equipmentMasterId]);
 // Assuming you already have the `equipmentData` state defined.
 const handleSave = async () => {
  const requestData = {
    entryDate: equipmentData.entryDate,
    capitalItem: equipmentData.capitalItem,
    type: equipmentData.type,
    procedureToBeDone: equipmentData.procedureToBeDone,
    damageReport: equipmentData.damageReport,
    nameOfManufacturer: equipmentData.nameOfManufacturer,
    quantity: equipmentData.quantity || 1, // Default to 1 if not provided
    patientLoad: equipmentData.patientLoad || "Unknown", // Provide a default value
    justification: equipmentData.justification,
    dmsRemark: equipmentData.dmsRemark,
    msRemark: equipmentData.msRemark,
    mdRemark: equipmentData.mdRemark,
    rateComparison: equipmentData.rateComparison,
    remark: equipmentData.remark,
    proposalMade: equipmentData.proposalMade,
    approvalDate: approvalStatus[0].approvalDate, // Add approvalDate
    approvalTime: approvalStatus[0].approvalTime, // Add approvalTime
    equipmentDTO: {
      equipmentMasterId: equipmentData.equipmentDTO.equipmentMasterId,
    },
    docterDTO: {
      doctorId: equipmentData.docterDTO.doctorId,
    },
    departmentDTO: {
      departmentId: equipmentData.departmentDTO.departmentId,
    },
    employeeDTO: {
      employeeId: equipmentData.employeeDTO.employeeId,
    },
  };

  console.log("Request Data:", JSON.stringify(requestData, null, 2));

  try {
    const response = await axios.post(`${API_BASE_URL}/replacements`, requestData);
    if (response.status === 200) {
      alert("Success");
      onClose(); // Close the popup after successful save
    }
  } catch (error) {
    console.error("Error saving data:", error);
    alert("Failed to save the data. Please try again.");
  }
};




const [employees, setEmployees] = useState([]);

useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees/get-all-employee`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  fetchEmployees();
}, []);

  


  useEffect(() => {
    // Generate unique record number (e.g., timestamp-based)
    const generateRecordNo = () => {
      return `REQ-${Date.now()}`;
    };
  
    setEquipmentData((prevData) => ({
      ...prevData,
      recordNo: generateRecordNo(), // Set the generated record number
    }));
  
    // Fetch other data
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/departments/getAllDepartments`);
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
  
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/doctors`);
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
  
    const fetchEquipments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/equipment-masters`);
        setEquipments(response.data);
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      }
    };
  
    fetchDepartments();
    fetchDoctors();
    fetchEquipments();
  }, []); // Only run once on component mount

  return (
<div className="AssetNewReplacementRequestPopUp-container">
  <div className="AssetNewReplacementRequestPopUp-header">
    <h4>Asset New/Replacement Request</h4>
  </div>

  <div className="AssetNewReplacementRequestPopUp-form">
    <div className="AssetNewReplacementRequestPopUp-form-panels">
      {/* Left Panel */}
      <div className="AssetNewReplacementRequestPopUp-left-panel">
        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Record No:</label>
          <input
  type="text"
  name="recordNo"
  value={equipmentData.recordNo || ""}
  readOnly // Prevent user from editing the auto-generated record number
/>
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Equipment Name:</label>
          <select
            value={equipmentData.equipmentDTO.equipmentMasterId || ""}
            onChange={handleEquipmentChange}
          >
            <option value="">Select Equipment</option>
            {equipments.map((equipment) => (
              <option key={equipment.equipmentMasterId} value={equipment.equipmentMasterId}>
                {equipment.equipmentName}
              </option>
            ))}
          </select>
          <FaSearch />
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Asset No:</label>
          <input
            type="text"
            value={equipmentData.equipmentDTO.assetNo || ""}
            readOnly
          />
        </div>
        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Equipment No:</label>
          <input
            type="text"
            value={equipmentData.equipmentDTO.equipmentNo || ""}
            readOnly
          />
        </div>
        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Location Path:</label>
          <input
            type="text"
            value={equipmentData.equipmentDTO.locationPath}
            onChange={(e) => setEquipmentData({...equipmentData, equipmentDTO: {...equipmentData.equipmentDTO, locationPath: e.target.value}})}
          /> 
</div>
        

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Entry Date:</label>
          <input
            type="date"
            value={equipmentData.entryDate}
            onChange={(e) => setEquipmentData({...equipmentData, entryDate: e.target.value})}
          />
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Procedure To Be Done:</label>
          <input
            type="text"
            value={equipmentData.procedureToBeDone}
            onChange={(e) => setEquipmentData({...equipmentData, procedureToBeDone: e.target.value})}
          />
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Justification For Purchase:</label>
          <input
            type="text"
            value={equipmentData.justification}
            onChange={(e) => setEquipmentData({...equipmentData, justification: e.target.value})}
          />
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Rate Comparison:</label>
          <input
            type="text"
            value={equipmentData.rateComparison}
            onChange={(e) => setEquipmentData({...equipmentData, rateComparison: e.target.value})}
          />
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Capital Item:</label>
          <input
            type="text"
            value={equipmentData.capitalItem}
            onChange={(e) => setEquipmentData({...equipmentData, capitalItem: e.target.value})}
          />
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Sub locationPath:</label>
          <input
            type="text"
            value={equipmentData.equipmentDTO.assetLocationMaster?.subLocation}
            readOnly
          />


        </div>
      </div>

      {/* Right Panel */}
      <div className="AssetNewReplacementRequestPopUp-right-panel">
        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>If Existing - Damage Report</label>
          <input
            type="text"
            value={equipmentData.damageReport}
            onChange={(e) => setEquipmentData({...equipmentData, damageReport: e.target.value})}
          />
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>AMS/DMS/JMS Remark:</label>
          <input
            type="text"
            value={equipmentData.dmsRemark}
            onChange={(e) => setEquipmentData({...equipmentData, dmsRemark: e.target.value})}
          />
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Remarks:</label>
          <input
            type="text"
            value={equipmentData.remark}
            onChange={(e) => setEquipmentData({...equipmentData, remark: e.target.value})}
          />
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Type:</label>
          <input
            type="text"
            value={equipmentData.type}
            onChange={(e) => setEquipmentData({...equipmentData, type: e.target.value})}
          />
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Name Of Manufacturer:</label>
          <input
            type="text"
            value={equipmentData.nameOfManufacturer}
            onChange={(e) => setEquipmentData({...equipmentData, nameOfManufacturer: e.target.value})}
          />
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
  <label>Proposal Made By:</label>

  <select
    value={equipmentData.employeeDTO.firstName}
    onChange={(e) => {
      const selectedEmployee = employees.find(emp => emp.firstName === e.target.value);
      if (selectedEmployee) {
        setEquipmentData({
          ...equipmentData,
          employeeDTO: {
            ...equipmentData.employeeDTO,
            firstName: selectedEmployee.firstName,
            employeeId: selectedEmployee.employeeId,  // Optionally save employee ID if needed
          }
        });
      }
    }}
  >
    <option value="">Select an employee</option>
    {employees.map((employee) => (
      <option key={employee.employeeId} value={employee.firstName}>
        {employee.firstName}
      </option>
    ))}
  </select>
</div>



        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Doctor Name:</label>
          <select onChange={handleChange}>
  {doctors.map((doctor) => (
    <option key={doctor.doctorId} value={doctor.doctorId}>
      {doctor.doctorName}
    </option>
  ))}
</select>

        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <label>Department Name:</label> 
          <select
            value={equipmentData.departmentDTO.departmentId}
            onChange={handleDepartmentChange}
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department.departmentId} value={department.departmentId}>
                {department.departmentName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quantity, Patient Load, MS/MD Remarks */}
      <div className="AssetNewReplacementRequestPopUp-right-panel">

      <div className="AssetNewReplacementRequestPopUp-form-group">
        <label>Quantity:</label>
        <input
          type="text"
          value={equipmentData.quantity}
          onChange={(e) => setEquipmentData({...equipmentData, quantity: e.target.value})}
        />
      </div>

      <div className="AssetNewReplacementRequestPopUp-form-group">
        <label>Patient Load:</label>
        <input
          type="text"
          value={equipmentData.patientLoad}
          onChange={(e) => setEquipmentData({...equipmentData, patientLoad: e.target.value})}
        />
      </div>

      <div className="AssetNewReplacementRequestPopUp-form-group">
        <label>MS Remarks:</label>
        <input
          type="text"
          value={equipmentData.msRemark}
          onChange={(e) => setEquipmentData({...equipmentData, msRemark: e.target.value})}
        />
      </div>

      <div className="AssetNewReplacementRequestPopUp-form-group">
        <label>MD Remarks:</label>
        <input
          type="text"
          value={equipmentData.mdRemark}
          onChange={(e) => setEquipmentData({...equipmentData, mdRemark: e.target.value})}
        />
      </div>
    </div>
</div>

<div className="AssetNewReplacementRequestPopUp-history-section">
      <div className="AssetNewReplacementRequestPopUp-tab-bar">
        <button
          className={`AssetNewReplacementRequestPopUp-tab ${
            selectedTab === "approveDetails" ? "active" : ""
          }`}
          onClick={() => setSelectedTab("approveDetails")}
        >
          Approve Details
        </button>

        <button
          className={`AssetNewReplacementRequestPopUp-tab ${
            selectedTab === "approvalStatus" ? "active" : ""
          }`}
          onClick={() => setSelectedTab("approvalStatus")}
        >
          Approval Status
        </button>
      </div>
{/* Table for Approval Details */}
{selectedTab === "approveDetails" && (
  <div className="AssetNewReplacementRequestPopUp-table">
    <table>
      <thead>
        <tr>
          <th>SN</th>
          <th>Approval By</th>
       
        </tr>
      </thead>
      <tbody>
        {approvalDetails.map((detail) => (
          <tr key={detail.id}>
            <td>{detail.id}</td>
            <td>
              <select
                value={detail.approvedBy}
                onChange={(e) =>
                  handleApprovalDetailsChange(detail.id, "approvedBy", e.target.value)
                }
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.employeeId} value={employee.employeeId}>
                    {employee.firstName}
                  </option>
                ))}
              </select>
            </td>
      
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

{/* Table for Approval Status */}
{selectedTab === "approvalStatus" && (
  <div className="AssetNewReplacementRequestPopUp-table">
    <table>
      <thead>
        <tr>
          <th>SN</th>
          <th>Approval By</th>
     
          <th>Approval Time</th>
          <th>Approval Date</th>
        </tr>
      </thead>
      <tbody>
        {approvalStatus.map((status) => (
          <tr key={status.id}>
            <td>{status.id}</td>
            <td>
              <select
                value={status.approvedBy}
                onChange={(e) =>
                  handleApprovalStatusChange(status.id, "approvedBy", e.target.value)
                }
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.employeeId} value={employee.employeeId}>
                    {employee.firstName}
                  </option>
                ))}
              </select>
            </td>
  
            <td>
  <input
    type="time"
    value={status.approvalTime || ""}
    onChange={(e) =>
      handleApprovalStatusChange(status.id, "approvalTime", e.target.value)
    }
    placeholder="Enter time"
  />
</td>
<td>
  <input
    type="date"
    value={status.approvalDate || ""}
    onChange={(e) =>
      handleApprovalStatusChange(status.id, "approvalDate", e.target.value)
    }
    placeholder="Enter date"
  />
</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>


    <div className="AssetNewReplacementRequestPopUp-form-actions">
      <button className="AssetNewReplacementRequestPopUp-add-btn" onClick={handleSave}>
        Add
      </button>
      <button className="AssetNewReplacementRequestPopUp-close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  </div>
</div>


  );
};

export default AssetNewReplacementRequestPopUp;
