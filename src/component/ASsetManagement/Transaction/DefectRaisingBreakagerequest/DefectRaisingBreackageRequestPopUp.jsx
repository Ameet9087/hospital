import React, { useRef, useEffect, useState } from "react";
import "./DefectRaisingBreackageRequestPopUp.css";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Using react-icons
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput, FloatingSelect } from '../../../../FloatingInputs';
import {toast}  from "react-toastify";
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
      insuranceDone: "",
      insuranceUpTo: "",
      natureOfDefect: "",
      probableCause: "",
      detailsOfDefectiveParts: "",
      costOfRepair,
      lastRepaired: "",
      lastRepairDate,
      lastRepairCost,
      prospectiveRepair: "",
      expectedDurationOfRepair: "",
      lastRepairPart: "",
      recommendedByHOD: "",
      contractType: "",
      contractFrom,
      contractTo,
      contractDetails: "",
      hodRemarks: "",
      employeeDTO: { employeeId:1},
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
    const setPartId = event.target.value;
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
        toast.success('Request successful:', data);
        // Optionally, close the popup or reset form here
      })
      .catch((error) => {
        toast.error('Error during submission:', error);
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
          <FloatingSelect
  label={"Complaint Number"}
  value={selectedComplaint} 
  onChange={handleComplaintChange}
  options={[
    { value: "", label: "Select Complaint" },
    ...complaintData.map((complaint) => ({
      value: complaint.complaintId,
      label: complaint.complaintType
    }))
  ]}
/>           
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Complaint On"}
            type="text" value={formData.complaintOn} readOnly/>
           
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Asset No"}
            type="text" value={formData.assetNo} readOnly/>
           
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Location"}
            type="text" value={formData.location} readOnly/>
            
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Serial No"}
            type="text" value={formData.serialNo} readOnly/>
           
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Responsible Department"}
            type="text" value={formData.responsibleDepartment} readOnly/>
            
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Cost Of Item"}
            type="text" value={formData.costOfItem} readOnly/>
            
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Date Of Installation"}
            type="text" value={formData.dateOfInstallation} readOnly/>
           
          </div>

          {/* Insurance */}
          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingSelect
            label={"Insurance Done"}
            value={insuranceDone} onChange={(e) => setInsuranceDone(e.target.value === 'Yes')}
            options={[
              {value:"Yes" ,label:"Yes"},
              {value:"No" , label:"No"}
            ]}/>
           
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Insurance Up To"}
            type="date" 
            value={insuranceUpTo} 
            onChange={(e) => setInsuranceUpTo(e.target.value)}/>
           
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Name Of Defect *"}
            type="text"
              value={natureOfDefect}
              onChange={(e) => setNatureOfDefect(e.target.value)}/>
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Probable Cause"}
             type="text"
              value={probableCause}
              onChange={(e) => setProbableCause(e.target.value)}/>
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Details Of Defective Parts"}
            type="text"
              value={detailsOfDefectiveParts}
              onChange={(e) => setDetailsOfDefectiveParts(e.target.value)}/>
          </div>
        </div>

        <div className="DefectRaisingBreackageRequestPopUp-panel">
          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Cost Of Repair With Contact No"}
            type="text"
              value={costOfRepair}
              onChange={(e) => setCostOfRepair(e.target.value)}/>
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingSelect
            label={"Last Repaired"}
            value={lastRepaired}
              onChange={(e) => setLastRepaired(e.target.value)}
              options={[{value:"Yes" , label:"Yes"},{value:"No",label:"No"}]}/>
           
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Last Repaired Done Date"}
            type="date"
              value={lastRepairDate}
              onChange={(e) => setLastRepairDate(e.target.value)}
            />
           
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Last Repaired Done Cost"}
             type="text"
              value={lastRepairCost}
              onChange={(e) => setLastRepairCost(e.target.value)}/>
            
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Prospective Repairer"}
            type="text"
              value={prospectiveRepair}
              onChange={(e) => setProspectiveRepair(e.target.value)}
            />
           
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Expected Duration Of Repair * "}
            type="text"
              value={expectedDurationOfRepair}
              onChange={(e) => setExpectedDurationOfRepair(e.target.value)}/>
            
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
          <FloatingSelect
  label={"Proposal Made By"}
  value={selectedEmployeeId} 
  onChange={handleEmployeeChange}
  options={[
    { value: "", label: "Select Employee" },
    ...employees.map((employee) => ({
      value: employee.employeeId,
      label: `${employee.firstName} ${employee.lastName}`
    }))
  ]}
/>
          </div>
          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"LAST Repair Part *"}
            type="text"
            value={lastRepairPart}
            onChange={(e) => setLastRepairPart(e.target.value)}/>
          </div>
          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Contract Type"}
            type="text"
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}/>
          </div>
          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Contract From"}
            type="date"
              value={contractFrom}
              onChange={(e) => setContractFrom(e.target.value)}/>
          </div>
          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Contract To"}
            type="date"
              value={contractTo}
              onChange={(e) => setContractTo(e.target.value)}/>
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"Contract Details"}
            type="text"
              value={contractDetails}
              onChange={(e) => setContractDetails(e.target.value)}/>
            
          </div>

          <div className="DefectRaisingBreackageRequestPopUp-form-group">
            <FloatingInput
            label={"HOD Remarks"}
            type="text"
            value={hodRemarks}
            onChange={(e) => setHodRemarks(e.target.value)}/>
          </div>
        </div>
      </div>
      <div className="DefectRaisingBreackageRequestPopUp-history-section">
        <div className="DefectRaisingBreackageRequestPopUp-tab-bar">
          <button
            className={`DefectRaisingBreackageRequestPopUp-tab-btn ${selectedTabContent === "approveDetails" ? "active" : ""
              }`}
            onClick={() => setSelectedTabContent("approveDetails")}
          >
            Approve Details
          </button>

          <button
            className={`DefectRaisingBreackageRequestPopUp-tab-btn ${selectedTabContent === "approvalStatus" ? "active" : ""
              }`}
            onClick={() => setSelectedTabContent("approvalStatus")}
          >
            Approval Status
          </button>

          {/* Add Defective Item Tab */}
          <button
            className={`DefectRaisingBreackageRequestPopUp-tab-btn ${selectedTabContent === "defectiveItems" ? "active" : ""
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
                    <FloatingSelect
  label={"Approved By"}
  value={detail.approvedBy}
  onChange={(e) => {
    const selectedId = e.target.value;
    handleApprovalDetailsChange(detail.id, "approvedBy", selectedId);
    setSelectedDoctorId(selectedId); 
  }}
  options={[
    { value: "", label: "Select Doctor" },
    ...doctors.map((doctor) => ({
      value: doctor.doctorId,
      label: doctor.doctorName
    }))
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
                    <FloatingSelect
  value={status.approvedBy}
  onChange={(e) => {
    const selectedId = e.target.value;
    handleApprovalDetailsChange(detail.id, "approvedBy", selectedId);
    setSelectedDoctorId(selectedId); // Update selectedDoctorId when a doctor is selected
  }}
  options={[
    { value: "", label: "Select Doctor" },
    ...doctors.map((doctor) => ({
      value: doctor.doctorId,
      label: doctor.doctorName
    }))
  ]}
/>   
                    </td>

                    <td>
                      <FloatingInput
                      label={"Time"}
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
                        }
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
                      <FloatingSelect
  label={"Part Name"}
  value={selectedPart}
  onChange={handlePartChange}
  options={[
    { value: "", label: "Select Part", disabled: true },
    ...parts.map((part) => ({
      value: part.partId,
      label: part.partName
    }))
  ]}
/>

                      </td>

                      {/* Other fields */}
                      <td>
                        <FloatingInput
                        label={"Quantity"}
                        type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleDefectiveItemChange(index, "quantity", e.target.value)}
                        />
                        
                      </td>
                      <td>
                        <FloatingInput
                        label={"Covered Under"}
                        type="text"
                          value={item.coveredUnder}
                          onChange={(e) =>
                            handleDefectiveItemChange(index, "coveredUnder", e.target.value)
                          }/>
                      </td>
                      <td>
                        <FloatingInput
                        label={"Contract Type"}
                        type="text"
                          value={item.contractType}
                          onChange={(e) =>
                            handleDefectiveItemChange(index, "contractType", e.target.value)
                          }
                        />
                       
                      </td>
                      <td>
                        <FloatingInput
                        label={"Unser Insurance Cost"}
                        type="number"
                          value={item.underInsuranceCost}
                          onChange={(e) =>
                            handleDefectiveItemChange(index, "underInsuranceCost", e.target.value)
                          }/>
                      </td>
                      <td>
                        <FloatingInput
                        label={"Remark"}
                        type="text"
                          value={item.remark}
                          onChange={(e) =>
                            handleDefectiveItemChange(index, "remark", e.target.value)
                          }/>
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
