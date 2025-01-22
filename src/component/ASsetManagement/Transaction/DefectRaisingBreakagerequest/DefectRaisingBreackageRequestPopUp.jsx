import React, { useRef, useEffect, useState } from "react";
import "./DefectRaisingBreackageRequestPopUp.css";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Using react-icons
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../../api/api";
const DefectRaisingBreackageRequestPopUp = ({ onClose }) => {


  const [insuranceDone, setInsuranceDone] = useState(false);
const [insuranceUpTo, setInsuranceUpTo] = useState("");
const [natureOfDefect, setNatureOfDefect] = useState("");
const [probableCause, setProbableCause] = useState("");
const [detailsOfDefectiveParts, setDetailsOfDefectiveParts] = useState("");
const [costOfRepair, setCostOfRepair] = useState("");
const [lastRepaired, setLastRepaired] = useState("");
const [lastRepairDate, setLastRepairDate] = useState("");
const [lastRepairCost, setLastRepairCost] = useState("");
const [prospectiveRepair, setProspectiveRepair] = useState("");
const [expectedDurationOfRepair, setExpectedDurationOfRepair] = useState("");
const [lastRepairPart, setLastRepairPart] = useState("");
const [recommendedByHOD, setRecommendedByHOD] = useState("");
const [contractType, setContractType] = useState("");
const [contractFrom, setContractFrom] = useState("");
const [contractTo, setContractTo] = useState("");
const [contractDetails, setContractDetails] = useState("");
const [hodRemarks, setHodRemarks] = useState("");


  useEffect(() => {
    const fetchedData = {
      // Simulating fetched GET data
      insuranceDone: true,
      insuranceUpTo: "2024-12-31",
      natureOfDefect: "Mechanical",
      probableCause: "Wear and Tear",
      detailsOfDefectiveParts: "Brake failure",
      costOfRepair: 5000,
      lastRepaired: "Yes",
      lastRepairDate: "2024-12-01",
      lastRepairCost: 3000,
      prospectiveRepair: "Replace brake pads",
      expectedDurationOfRepair: "2 days",
      lastRepairPart: "Brake pads",
      recommendedByHOD: "John Doe",
      contractType: "Annual Maintenance",
      contractFrom: "2023-01-01",
      contractTo: "2024-12-31",
      contractDetails: "Covers brake systems",
      hodRemarks: "Urgent repair required",
      employeeDTO: { employeeId: 1 },
      parts: [
        {
          partId: 1,
          quantity: "12",
          coveredUnder: "Na",
          contractType: "Na",
          underInsuranceCost: "Na",
          remark: "good"
        },
        {
          partId: 2,
          quantity: "Na",
          coveredUnder: "Na",
          contractType: "NA",
          underInsuranceCost: "Na",
          remark: "good"
        }
      ]
    };
  
    // Set form data from fetched JSON
    setInsuranceDone(fetchedData.insuranceDone);
    setInsuranceUpTo(fetchedData.insuranceUpTo);
    setNatureOfDefect(fetchedData.natureOfDefect);
    setProbableCause(fetchedData.probableCause);
    setDetailsOfDefectiveParts(fetchedData.detailsOfDefectiveParts);
    setCostOfRepair(fetchedData.costOfRepair);
    setLastRepaired(fetchedData.lastRepaired);
    setLastRepairDate(fetchedData.lastRepairDate);
    setLastRepairCost(fetchedData.lastRepairCost);
    setProspectiveRepair(fetchedData.prospectiveRepair);
    setExpectedDurationOfRepair(fetchedData.expectedDurationOfRepair);
    setLastRepairPart(fetchedData.lastRepairPart);
    setRecommendedByHOD(fetchedData.recommendedByHOD);
    setContractType(fetchedData.contractType);
    setContractFrom(fetchedData.contractFrom);
    setContractTo(fetchedData.contractTo);
    setContractDetails(fetchedData.contractDetails);
    setHodRemarks(fetchedData.hodRemarks);
    setSelectedEmployeeId(fetchedData.employeeDTO.employeeId);
    setParts(fetchedData.parts);
  }, []);
  

 const [selectedTab, setSelectedTab] = useState("approveDetails");
 const [selectedDoctorId, setSelectedDoctorId] = useState(""); // Declare selectedDoctorId state

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

 // State for doctors
 const [doctors, setDoctors] = useState([]);
// Add this line


 // Fetch doctors data
 useEffect(() => {
   fetch(`${API_BASE_URL}/doctors`)
     .then((response) => response.json())
     .then((data) => setDoctors(data))
     .catch((error) => {
       console.error("Error fetching doctors:", error);
     });
 }, []);








 

 const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState("");

const handlePartChange = (event) => {
    const setPartId= event.target.value;
    setSelectedPart(setPartId);

  };
  useEffect(() => {
    fetch(`${API_BASE_URL}/parts`)
      .then((response) => response.json())
      .then((data) => {
        setParts(data); // Assuming data is an array of complaint objects


      })
      .catch((error) => console.error("Error fetching Parts:", error));
  }, []);
 const [defectiveItems, setDefectiveItems] = useState([
   {
     partId: "",
  
     quantity: "",
     coveredUnder: "",
     contractType: "",
     underInsuranceCost: "",
     remark: "",
   },
 ]);
 const [selectedPartId, setSelectedPartId] = useState("");

 // Fetch parts data from API
//  useEffect(() => {
//    fetch("API_BASE_URL/parts") // Replace with your actual API URL
//      .then((response) => response.json())
//      .then((data) => setParts(data.parts || [])) // Assuming response contains { parts: [...] }
//      .catch((error) => console.error("Error fetching parts:", error));
//  }, []);

 // Add a new defective item row
 const addDefectiveItem = () => {
   setDefectiveItems((prevItems) => [
     ...prevItems,
     {
       partId: "",
 
       quantity: "",
       coveredUnder: "",
       contractType: "",
       underInsuranceCost: "",
       remark: "",
     },
   ]);
 };

 // Remove a defective item row
 const removeDefectiveItem = (index) => {
   setDefectiveItems((prevItems) => prevItems.filter((_, i) => i !== index));
 };

 // Handle change in the defective item fields
 const handleDefectiveItemChange = (index, field, value) => {
   setDefectiveItems((prevItems) =>
     prevItems.map((item, i) =>
       i === index ? { ...item, [field]: value } : item
     )
   );
 };




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

 const [selectedTabContent, setSelectedTabContent] = useState("approveDetails");





 
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [proposalMadeBy, setProposalMadeBy] = useState("");

  useEffect(() => {
    // Fetch employees from the API using fetch
    fetch(`${API_BASE_URL}/employees/get-all-employee`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const handleEmployeeChange = (event) => {
    const employeeId = event.target.value;
    setSelectedEmployeeId(employeeId);

    const selectedEmployee = employees.find(
      (employee) => employee.employeeId === parseInt(employeeId)
    );

    if (selectedEmployee) {
      setProposalMadeBy(selectedEmployee.firstName);
    } else {
      setProposalMadeBy("");
    }
  };
  
    const [complaintData, setComplaintData] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState("");
    const [formData, setFormData] = useState({
      complaintType: "", // Added this field to hold the complaint type
      complaintOn: "",
      assetNo: "",
      location: "",
      serialNo: "",
      responsibleDepartment: "",
      costOfItem: "",
      dateOfInstallation: "",
      docterDTO: {
        doctorId: "",
        doctorName: "",
        unitMaster: "",
      },
    });
  
    // Fetch complaints data on component mount
    useEffect(() => {
      fetch(`${API_BASE_URL}/equipment-complaints`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch complaints");
          }
          return response.json();
        })
        .then((data) => setComplaintData(data))
        .catch((error) => console.error("Error fetching complaints:", error));
    }, []);
  
    

  
    // Handle complaint selection and autofill fields
    // const handleComplaintChange = (event) => {
    //   const complaintId = event.target.value;
    //   setSelectedComplaint(complaintId);
  
    //   const selected = complaintData.find(
    //     (complaint) => complaint.complaintId === parseInt(complaintId)
    //   );
  
    //   if (selected) {
    //     setFormData({
    //       complaintType: selected.equipmentComplaintDTO.complaintType, // Corrected line to set complaint type
    //       complaintOn: selected.equipmentComplaintDTO.complaintSubject,
    //       assetNo: selected.equipmentComplaintDTO.equipmentMaster.assetNo,
    //       location: selected.equipmentComplaintDTO.equipmentMaster.assetLocationMaster.subLocation,
    //       serialNo: selected.equipmentComplaintDTO.equipmentMaster.serialNo,
    //       responsibleDepartment: selected.equipmentComplaintDTO.equipmentMaster.department.departmentName,
    //       costOfItem: selected.equipmentComplaintDTO.equipmentMaster.cost,
    //       dateOfInstallation: selected.equipmentComplaintDTO.equipmentMaster.installationDate,
    //     });
    //   } else {
    //     setFormData({
    //       complaintType: "", // Reset complaint type
    //       complaintOn: "",
    //       assetNo: "",
    //       location: "",
    //       serialNo: "",
    //       responsibleDepartment: "",
    //       costOfItem: "",
    //       dateOfInstallation: "",
    //     });
    //   }
    // };

    const handleComplaintChange = (event) => {
      const complaintId = event.target.value;
      setSelectedComplaint(complaintId);
    
      const selected = complaintData.find(
        (complaint) => complaint.complaintId === parseInt(complaintId)
      );
    
      // Log the selected complaint to check the data structure
      console.log("Selected Complaint: ", selected);
    
      if (selected) {
        setFormData({
          complaintType: selected.complaintType, // Directly access the complaintType
          complaintOn: selected.complaintSubject, // Directly access the complaintSubject
          assetNo: selected.equipmentMaster.assetNo,
          location: selected.equipmentMaster.assetLocationMaster?.subLocation || "", // Ensure safe access
          serialNo: selected.equipmentMaster.serialNo,
          responsibleDepartment: selected.equipmentMaster.department?.departmentName || "", 
          costOfItem: selected.equipmentMaster.cost || "", // Ensure cost exists, default to empty
          dateOfInstallation: selected.equipmentMaster.installationDate,
        });
      } else {
        setFormData({
          complaintType: "",
          complaintOn: "",
          assetNo: "",
          location: "",
          serialNo: "",
          responsibleDepartment: "",
          costOfItem: "",
          dateOfInstallation: "",
        });
      }
    };
    


    const handleSubmit = () => {
      // Prepare the payload object with all the necessary data
      const payload = {
        insuranceDone,
        insuranceUpTo,
        natureOfDefect,
        probableCause,
        detailsOfDefectiveParts,
        costOfRepair,
        lastRepaired,
        lastRepairDate,
        lastRepairCost,
        prospectiveRepair,
        expectedDurationOfRepair,
        lastRepairPart,
        recommendedByHOD,
        contractType,
        contractFrom,
        contractTo,
        contractDetails,
        hodRemarks,
        equipmentComplaintDTO: {
          complaintId: selectedComplaint, // Use the selected complaintId
        },
        employeeDTO: {
          employeeId: selectedEmployeeId, // Use the selected employeeId
        },
        approvalBy: {
          doctorId: selectedDoctorId, // Use the selected doctorId
        },
        parts: defectiveItems.map((item) => ({
          partId: item.partId,
          partName: item.partName,
          quantity: item.quantity,
          coveredUnder: item.coveredUnder,
          contractType: item.contractType,
          underInsuranceCost: item.underInsuranceCost,
          remark: item.remark,
        })),
      };
    
      // Send the data via a POST request
      fetch(`${API_BASE_URL}/defect-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Send the payload as the request body
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Request successful:', data);
          // Optionally, close the popup or reset form here
        })
        .catch((error) => {
          console.error('Error during submission:', error);
        });
    };
    
    
  
  
  return (
    <div className="DefectRaisingBreackageRequestPopUp-container">
    <div className="DefectRaisingBreackageRequestPopUp-header">
      <h4>Defect Raising/Breackage Request</h4>
    </div>
    <div className="DefectRaisingBreackageRequestPopUp-form">
    <div className="DefectRaisingBreackageRequestPopUp-panel">
      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Complaint Number:</label>
        <select value={selectedComplaint} onChange={handleComplaintChange}>
          <option value="">Select Complaint</option>
          {complaintData.map((complaint) => (
            <option key={complaint.complaintId} value={complaint.complaintId}>
              {complaint.complaintType}
            </option>
          ))}
        </select>
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Complaint On:</label>
        <input type="text" value={formData.complaintOn} readOnly />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Asset No:</label>
        <input type="text" value={formData.assetNo} readOnly />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Location:</label>
        <input type="text" value={formData.location} readOnly />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Serial No:</label>
        <input type="text" value={formData.serialNo} readOnly />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Responsible Department:</label>
        <input type="text" value={formData.responsibleDepartment} readOnly />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Cost Of Item:</label>
        <input type="text" value={formData.costOfItem} readOnly />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Date Of Installation:</label>
        <input type="text" value={formData.dateOfInstallation} readOnly />
      </div>

      {/* Insurance */}
      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Insurance Done:</label>
        <select value={insuranceDone} onChange={(e) => setInsuranceDone(e.target.value === 'true')}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Insurance Up To:</label>
        <input type="date" value={insuranceUpTo} onChange={(e) => setInsuranceUpTo(e.target.value)} />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Name Of Defect: *</label>
        <input
          type="text"
          value={natureOfDefect}
          onChange={(e) => setNatureOfDefect(e.target.value)}
        />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Probable Cause:</label>
        <input
          type="text"
          value={probableCause}
          onChange={(e) => setProbableCause(e.target.value)}
        />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Details Of Defective Parts:</label>
        <input
          type="text"
          value={detailsOfDefectiveParts}
          onChange={(e) => setDetailsOfDefectiveParts(e.target.value)}
        />
      </div>
    </div>

    <div className="DefectRaisingBreackageRequestPopUp-panel">
      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Cost Of Repair With Contact No:</label>
        <input
          type="text"
          value={costOfRepair}
          onChange={(e) => setCostOfRepair(e.target.value)}
        />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Last Repaired:</label>
        <select
          value={lastRepaired}
          onChange={(e) => setLastRepaired(e.target.value)}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Last Repaired Done Date:</label>
        <input
          type="date"
          value={lastRepairDate}
          onChange={(e) => setLastRepairDate(e.target.value)}
        />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Last Repaired Done Cost:</label>
        <input
          type="text"
          value={lastRepairCost}
          onChange={(e) => setLastRepairCost(e.target.value)}
        />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Prospective Repairer:</label>
        <input
          type="text"
          value={prospectiveRepair}
          onChange={(e) => setProspectiveRepair(e.target.value)}
        />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Expected Duration Of Repair: *</label>
        <input
          type="text"
          value={expectedDurationOfRepair}
          onChange={(e) => setExpectedDurationOfRepair(e.target.value)}
        />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Proposal Made By:</label>
        <select value={selectedEmployeeId} onChange={handleEmployeeChange}>
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee.employeeId} value={employee.employeeId}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>LAST Repair Part: *</label>
        <input
          type="text"
          value={lastRepairPart}
          onChange={(e) => setLastRepairPart(e.target.value)}
        />
      </div>



      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Contract Type:</label>
        <input
          type="text"
          value={contractType}
          onChange={(e) => setContractType(e.target.value)}
        />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Contract From:</label>
        <input
          type="date"
          value={contractFrom}
          onChange={(e) => setContractFrom(e.target.value)}
        />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Contract To:</label>
        <input
          type="date"
          value={contractTo}
          onChange={(e) => setContractTo(e.target.value)}
        />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>Contract Details:</label>
        <input
          type="text"
          value={contractDetails}
          onChange={(e) => setContractDetails(e.target.value)}
        />
      </div>

      <div className="DefectRaisingBreackageRequestPopUp-form-group">
        <label>HOD Remarks:</label>
        <input
          type="text"
          value={hodRemarks}
          onChange={(e) => setHodRemarks(e.target.value)}
        />
      </div>
    </div>
  </div>





  <div className="DefectRaisingBreackageRequestPopUp-history-section">
  <div className="DefectRaisingBreackageRequestPopUp-tab-bar">
    <button
      className={`DefectRaisingBreackageRequestPopUp-tab ${
        selectedTabContent === "approveDetails" ? "active" : ""
      }`}
      onClick={() => setSelectedTabContent("approveDetails")}
    >
      Approve Details
    </button>

    <button
      className={`DefectRaisingBreackageRequestPopUp-tab ${
        selectedTabContent === "approvalStatus" ? "active" : ""
      }`}
      onClick={() => setSelectedTabContent("approvalStatus")}
    >
      Approval Status
    </button>

    {/* Add Defective Item Tab */}
    <button
      className={`DefectRaisingBreackageRequestPopUp-tab ${
        selectedTabContent === "defectiveItems" ? "active" : ""
      }`}
      onClick={() => setSelectedTabContent("defectiveItems")}
    >
      Defective Item
    </button>
  </div>

  {/* Table for Approval Details */}
  {selectedTabContent === "approveDetails" && (
    <div className="DefectRaisingBreackageRequestPopUp-table">
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
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    handleApprovalDetailsChange(detail.id, "approvedBy", selectedId);
                    setSelectedDoctorId(selectedId); // Update selectedDoctorId when a doctor is selected
                  }}
                >
                  <option value="">Select doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.doctorId} value={doctor.doctorId}>
                      {doctor.doctorName}
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
  {selectedTabContent === "approvalStatus" && (
    <div className="DefectRaisingBreackageRequestPopUp-table">
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
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    handleApprovalDetailsChange(detail.id, "approvedBy", selectedId);
                    setSelectedDoctorId(selectedId); // Update selectedDoctorId when a doctor is selected
                  }}
                >
                  <option value="">Select doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.doctorId} value={doctor.doctorId}>
                      {doctor.doctorName}
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

  {/* Table for Defective Items */}
  {selectedTabContent === "defectiveItems" && (
    <div className="DefectRaisingBreackageRequestPopUp-table">
      <table>
        <thead>
          <tr>
            <th>Part Name</th>
            <th>Quantity</th>
            <th>Covered Under AMC/CMC</th>
            <th>Contract Type</th>
            <th>Repair Cost / Purchase Cost Covered Under Insurance</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {defectiveItems.length > 0 ? (
            defectiveItems.map((item, index) => (
              <tr key={index}>
                {/* Dropdown for part name */}
                <td>
                  <select
                    value={selectedPart}
                    onChange={handlePartChange}
                  >
                    <option value="" disabled>
                      Select Part
                    </option>
                    {parts.map((part) => (
                      <option key={part.partId} value={part.partId}>
                        {part.partName}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Other fields */}
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleDefectiveItemChange(index, "quantity", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.coveredUnder}
                    onChange={(e) =>
                      handleDefectiveItemChange(index, "coveredUnder", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.contractType}
                    onChange={(e) =>
                      handleDefectiveItemChange(index, "contractType", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.underInsuranceCost}
                    onChange={(e) =>
                      handleDefectiveItemChange(index, "underInsuranceCost", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.remark}
                    onChange={(e) =>
                      handleDefectiveItemChange(index, "remark", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button onClick={() => removeDefectiveItem(index)}>Remove</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No defective items available</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={addDefectiveItem}>Add Item</button>
    </div>
  )}
</div>


    <div className="DefectRaisingBreackageRequestPopUp-form-actions">
        <button className="DefectRaisingBreackageRequestPopUp-add-btn" onClick={handleSubmit}>
          Add
        </button>
        <button className="DefectRaisingBreackageRequestPopUp-close-btn" onClick={onClose}>
          Close
        </button>
      </div>

  </div>
);
          
  

};

export default DefectRaisingBreackageRequestPopUp;
