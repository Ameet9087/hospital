import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios"; // Axios for API calls
import "./AssetNewReplacementRequestPopUp.css";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput,FloatingSelect,FloatingTextarea } from "../../../../FloatingInputs";
import { toast } from "react-toastify";

const AssetNewReplacementRequestPopUp = ({ onClose }) => {
  const [selectedTab, setSelectedTab] = useState("approveDetails");
  const [approvalDetails, setApprovalDetails] = useState([ { id: 1, approvedBy: "", priority: "" },]);
  const [approvalStatus, setApprovalStatus] = useState([
    {
      id: 1,
      approvedBy: "",
      remarks: "",
      approvalTime: "",
      approvalDate: "",
    },
  ]);

  const handleApprovalDetailsChange = (id, field, value) => {
    setApprovalDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.id === id ? { ...detail, [field]: value } : detail
      )
    );
  };

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
      toast.success("Successfully data added");
      onClose(); // Close the popup after successful save
    }
  } catch (error) {
    console.error("Error saving data:", error);
    toast.error("Failed to save the data. Please try again.");
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
          <FloatingInput
          label={"Record No"}
          type="text"
  name="recordNo"
  value={equipmentData.recordNo || ""}
  readOnly/>
         
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
        <FloatingSelect
  label={"Equipment Name"}
  value={equipmentData?.equipmentDTO?.equipmentMasterId || ""}
  onChange={handleEquipmentChange}
  options={[
    { value: "", label: "Select Equipment" }, // Default option
    ...equipments.map((equipment) => ({
      value: equipment.equipmentMasterId,
      label: equipment.equipmentName, // Display equipment name
    })),
  ]}
/>

        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <FloatingInput
          label={"Asset No"}
          type="text"
            value={equipmentData.equipmentDTO.assetNo || ""}
            readOnly/>
          
        </div>
        <div className="AssetNewReplacementRequestPopUp-form-group">
          <FloatingInput
          label={"Equipment No"}
          type="text"
            value={equipmentData.equipmentDTO.equipmentNo || ""}
            readOnly/>
          
        </div>
        <div className="AssetNewReplacementRequestPopUp-form-group">
          <FloatingInput
          label={"Location Path"}
          type="text"
          value={equipmentData.equipmentDTO.locationPath}
          onChange={(e) => setEquipmentData({...equipmentData, equipmentDTO: {...equipmentData.equipmentDTO, locationPath: e.target.value}})}/>
           
</div>
        

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <FloatingInput
          label={"Entry Date"}
          type="date"
          value={equipmentData.entryDate}
          onChange={(e) => setEquipmentData({...equipmentData, entryDate: e.target.value})}/>
          
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <FloatingInput
          label={"Procedure To Be Done"}
          type="text"
          value={equipmentData.procedureToBeDone}
          onChange={(e) => setEquipmentData({...equipmentData, procedureToBeDone: e.target.value})}
          />
          
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <FloatingInput
          label={"Justification For Purchase"}
          type="text"
          value={equipmentData.justification}
          onChange={(e) => setEquipmentData({...equipmentData, justification: e.target.value})}
        />
          
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <FloatingInput
          label={"Rate Comparison"}
           type="text"
            value={equipmentData.rateComparison}
            onChange={(e) => setEquipmentData({...equipmentData, rateComparison: e.target.value})}
         />
        
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <FloatingInput
          label={"Capital Item"}
          type="text"
          value={equipmentData.capitalItem}
          onChange={(e) => setEquipmentData({...equipmentData, capitalItem: e.target.value})}
       />
         
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <FloatingInput
          label={"Sub locationPath"}
          type="text"
            value={equipmentData.equipmentDTO.assetLocationMaster?.subLocation}
            readOnly/>
        </div>
      </div>

      {/* Right Panel */}
      <div className="AssetNewReplacementRequestPopUp-right-panel">
        <div className="AssetNewReplacementRequestPopUp-form-group">
          <FloatingInput
          label={"If Existing - Damage Report"}
          type="text"
          value={equipmentData.damageReport}
          onChange={(e) => setEquipmentData({...equipmentData, damageReport: e.target.value})}/>
          
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <FloatingInput
          label={"AMS/DMS/JMS Remark"}
          type="text"
            value={equipmentData.dmsRemark}
            onChange={(e) => setEquipmentData({...equipmentData, dmsRemark: e.target.value})}/>
          
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <FloatingInput
          label={"Remarks"}
          type="text"
            value={equipmentData.remark}
            onChange={(e) => setEquipmentData({...equipmentData, remark: e.target.value})}/>
          
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
          <FloatingInput
          label={"Type"}
          type="text"
          value={equipmentData.type}
          onChange={(e) => setEquipmentData({...equipmentData, type: e.target.value})}/>
          
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
        <FloatingSelect
  label={"Proposal Made By"}
  value={equipmentData?.employeeDTO?.firstName || ""}
  onChange={(e) => {
    const selectedEmployee = employees.find(emp => emp.firstName === e.target.value);
    if (selectedEmployee) {
      setEquipmentData((prevData) => ({
        ...prevData,
        employeeDTO: {
          ...prevData.employeeDTO,
          firstName: selectedEmployee.firstName,
          employeeId: selectedEmployee.employeeId, // Optionally save employee ID if needed
        }
      }));
    }
  }}
  options={[
    { value: "", label: "Select an employee" }, // Default option
    ...employees.map((employee) => ({
      value: employee.firstName,
      label: employee.firstName,
    })),
  ]}
/>

</div>



        <div className="AssetNewReplacementRequestPopUp-form-group">
        <FloatingSelect
  label={"Doctor Name"}
  onChange={handleChange}
  options={[
    { value: "", label: "Select Doctor" }, // Default option
    ...doctors.map((doctor) => ({
      value: doctor.doctorId,
      label: doctor.doctorName,
    })),
  ]}
/>
        </div>

        <div className="AssetNewReplacementRequestPopUp-form-group">
        <FloatingSelect
  label={"Department Name"}
  value={equipmentData?.departmentDTO?.departmentId || ""}
  onChange={handleDepartmentChange}
  options={[
    { value: "", label: "Select Department" }, // Default option
    ...departments.map((department) => ({
      value: department.departmentId,
      label: department.departmentName,
    })),
  ]}
/>

        </div>
      </div>

      {/* Quantity, Patient Load, MS/MD Remarks */}
      <div className="AssetNewReplacementRequestPopUp-right-panel">

      <div className="AssetNewReplacementRequestPopUp-form-group">
        <FloatingInput
        label={"Quantity"}
        type="text"
          value={equipmentData.quantity}
          onChange={(e) => setEquipmentData({...equipmentData, quantity: e.target.value})}/>
       
      </div>

      <div className="AssetNewReplacementRequestPopUp-form-group">
        <FloatingInput
        label={"Patient Load"}
        type="text"
          value={equipmentData.patientLoad}
          onChange={(e) => setEquipmentData({...equipmentData, patientLoad: e.target.value})}/>
        
      </div>

      <div className="AssetNewReplacementRequestPopUp-form-group">
        <FloatingInput
        label={"MS Remarks"}
        type="text"
          value={equipmentData.msRemark}
          onChange={(e) => setEquipmentData({...equipmentData, msRemark: e.target.value})}/>
        
      </div>

      <div className="AssetNewReplacementRequestPopUp-form-group">
        <FloatingInput
        label={"MD Remarks"}
         type="text"
          value={equipmentData.mdRemark}
          onChange={(e) => setEquipmentData({...equipmentData, mdRemark: e.target.value})}/>
       
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
            <FloatingSelect
  value={detail.approvedBy}
  onChange={(e) => handleApprovalDetailsChange(detail.id, "approvedBy", e.target.value)}
  options={[
    { value: "", label: "Select Employee" }, // Default option
    ...employees.map((employee) => ({
      value: employee.employeeId,
      label: employee.firstName,
    })),
  ]}
/>

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
            <FloatingSelect
  label={"Approve by"}
  value={status.approvedBy}
  onChange={(e) =>
    handleApprovalStatusChange(status.id, "approvedBy", e.target.value)
  }
  options={[
    { value: "", label: "Select Employee" }, // Default option
    ...employees.map((employee) => ({
      value: employee.employeeId,
      label: employee.firstName,
    })),
  ]}
/>
           </td>
  
            <td>
              <FloatingInput
              label={"Approval Time"}
              type="time"
    value={status.approvalTime || ""}
    onChange={(e) =>
      handleApprovalStatusChange(status.id, "approvalTime", e.target.value)
    }/>
  
</td>
<td>
  <FloatingInput
  label={"Date"}
   type="date"
    value={status.approvalDate || ""}
    onChange={(e) =>
      handleApprovalStatusChange(status.id, "approvalDate", e.target.value)
    }/>
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
