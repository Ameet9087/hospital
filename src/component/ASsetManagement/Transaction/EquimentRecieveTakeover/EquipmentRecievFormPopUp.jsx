import React, { useState, useEffect } from "react";
import "./EquipmentRecievFormPopUp.css";
import { API_BASE_URL } from "../../../api/api";

const EquipmentReceiveForm = ({ onSubmit, onClose }) => {
  const [equipmentDetails, setEquipmentDetails] = useState({
    equipmentName: "",
    assetNo: "",
    equipmentNo: "",
    serialNo: "",
    location: "",
    department: "",
    employeeType: "",
    manualHandedBy: "",
    remarks: "",
    parts: [],
    personInCharge:"",
    dateOfReceive: "",
    timeOfReceive: "",
    handedBy: "",
    handedUserId: "",
    receivedBy: "",
    locationReceived: "",
  });

  const [formData, setFormData] = useState({
    receivedby: "",
    locationReceived: "",
    remarks: "",
    file: null,
    personInCharge: "",
    manualReceive:""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const [handoverOptions, setHandoverOptions] = useState([]);
  const [selectedHandover, setSelectedHandover] = useState("");

  const [employeeType, setEmployeeType] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);

  const handleEmployeeChange = async (e) => {
    const empId = e.target.value;
    setSelectedEmployee(empId);

    try {
      const response = await fetch(`${API_BASE_URL}/employees/get-all-employee`);
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.error("Error fetching employees:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleEmployeeTypeChange = async (e) => {
    const type = e.target.value;
    setEmployeeType(type);

    if (type === "Employee") {
      try {
        const response = await fetch(`${API_BASE_URL}/employees/get-all-employee`);
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        } else {
          console.error("Error fetching employees:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    } else {
      setEmployees([]);
    }
  };

  const handleHandedByChange = (e) => {
    setFormData({
      ...formData,
      handedBy: e.target.value,
    });
  };

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/asset-location`);
        if (response.ok) {
          const data = await response.json();
          setLocations(data);
        } else {
          console.error("Error fetching locations:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchHandovers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/equipment-transfer-handover`);
        if (response.ok) {
          const data = await response.json();
          setHandoverOptions(data);
        } else {
          console.error("Error fetching handover options:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching handover options:", error);
      }
    };
    fetchHandovers();
  }, []);

  const handleHandoverNoChange = (event) => {
    const handoverId = event.target.value;
    const selectedHandoverObj = handoverOptions.find(
      (h) => h.transferId === parseInt(handoverId)
    );
    setSelectedHandover(selectedHandoverObj);
  };
  const handleSubmit = async () => {
    const dataToPost = {
      takeoverId: 1, // Static ID for the example
      personInCharge: formData.personInCharge || "John Doe", // Default to "John Doe"
      dateOfReceive: equipmentDetails.dateOfReceive || "2024-12-31", // Default to "2024-12-31"
      timeOfReceive: equipmentDetails.timeOfReceive || "15:30:00", // Default to "15:30:00"
      employeeType: equipmentDetails.employeeType || employeeType || "Technician", // Default to "Technician"
      manualReceive: formData.manualReceive || "Manual Receive No 123", // Default to "Manual Receive No 123"
      equipmentTransferHandoverDTO: {
        transferId: selectedHandover?.transferId || 2, // Default to 2 if not selected
      },
      employeeDTO: {
        employeeId: selectedEmployee || 1, // Default to employeeId 1 if not selected
      },
      recievedLocationDTO: {
        id: formData.locationReceived || 1, // Default to location ID 1 if not selected
      },
    };
  
    console.log("Posting data:", JSON.stringify(dataToPost, null, 2));
  
    try {
      const response = await fetch(`${API_BASE_URL}/equipment-receive-takeovers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToPost),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Successfully posted:", result);
        onSubmit(result); // Pass the new entry to the parent component
      } else {
        const errorText = await response.text();
        console.error("Failed to submit:", errorText);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  
  

  return (
    <div className="equipment-receive-form-container">
      <div className="equipment-receive-form-header">
        Equipment Receive Takeover Form
      </div>
      <div className="equipment-receive-form-section">
        <div className="equipment-receive-form-grid">
          <div>
            <label>Handover No.</label>
            <select value={selectedHandover?.transferId} onChange={handleHandoverNoChange}>
              <option value="" disabled>
                Select Handover
              </option>
              {handoverOptions.map((handOver) => (
                <option key={handOver.transferId} value={handOver.transferId}>
                  {handOver.transferId}
                </option>
              ))}
            </select>
          </div>

          {/* Equipment Details */}
          <div>
            <label>Equipment Name</label>
            <input type="text" value={selectedHandover?.equipmentMasterDTO?.equipmentName} readOnly />
          </div>
          <div>
            <label>Asset No.</label>
            <input type="text" value={selectedHandover?.equipmentMasterDTO?.assetNo} readOnly />
          </div>
          <div>
            <label>Equipment No.</label>
            <input type="text" value={selectedHandover?.equipmentMasterDTO?.equipmentNo} readOnly />
          </div>
          <div>
            <label>Serial No.</label>
            <input type="text" value={selectedHandover?.equipmentMasterDTO?.serialNo} readOnly />
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              value={selectedHandover?.equipmentMasterDTO?.assetLocationMaster?.subLocation || ""}
              readOnly
            />
          </div>
          <div>
            <label>Department</label>
            <input
              type="text"
              value={selectedHandover?.equipmentMasterDTO?.department?.departmentName}
              readOnly
            />
          </div>
          <div>
            <label>Handed By</label>
            <input
              type="text"
              value={selectedHandover?.handedByDTO?.firstName || ""}
              readOnly
            />
          </div>
          <div>
          <label>Person in Charge:</label>
        <input
          type="text"
          name="personInCharge"
          value={formData.personInCharge}
          onChange={handleChange}
          placeholder="Enter name of person in charge"
        />
          </div>

          {/* Date and Time */}
          <div>
            <label>Date Of Receive / Takeover</label>
            <input
              type="date"
              value={equipmentDetails.dateOfReceive}
              onChange={(e) =>
                setEquipmentDetails({
                  ...equipmentDetails,
                  dateOfReceive: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Time Of Receive / Takeover</label>
            <input
              type="time"
              value={equipmentDetails.timeOfReceive}
              onChange={(e) =>
                setEquipmentDetails({
                  ...equipmentDetails,
                  timeOfReceive: e.target.value,
                })
              }
            />
          </div>
          <div>
          <label>manual Receive:</label>
        <input
          type="text"
          name="manualReceive"
          value={formData.manualReceive}
          onChange={handleChange}
          
        />
          </div>

          {/* Remarks */}
          <div>
            <label>Remarks</label>
            <textarea
              value={formData.remarks}
              onChange={handleChange}
              name="remarks"
            />
          </div>

          {/* Employee Type */}
          <div>
            <label>Employee Type:</label>
            <select
              name="employeeType"
              value={employeeType}
              onChange={handleEmployeeTypeChange}
            >
              <option value="">Select Employee Type</option>
              <option value="Employee">Employee</option>
              <option value="Non-Employee">Non-Employee</option>
            </select>
          </div>

          {/* Handed By Field */}
          <div>
            <label>Handed By:</label>
            {employeeType === "Employee" ? (
              <select
                name="handedBy"
                value={selectedEmployee}
                onChange={handleEmployeeChange}
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.employeeId} value={emp.employeeId}>
                    {emp.firstName} 
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="handedBy"
                value={formData.handedBy}
                onChange={handleHandedByChange}
              />
            )}
          </div>

          {/* Location Received */}
          <div>
            <label>Location Received:</label>
            <select
              name="locationReceived"
              value={formData.locationReceived}
              onChange={handleChange}
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location.locId} value={location.locId}>
                  {location.subLocation}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Parts Table */}
        <div className="equipment-receive-form-table-container">
          <table className="equipment-receive-form-table">
            <thead>
              <tr>
                <th>Part Name</th>
                <th>Stand By</th>
                <th>Model No</th>
                <th>Serial No</th>
              </tr>
            </thead>
            <tbody>
              {selectedHandover?.partsDTO?.map((part, index) => (
                <tr key={index}>
                  <td>{part.partName || ""}</td>
                  <td>{part.standBy || ""}</td>
                  <td>{part.modelNo || ""}</td>
                  <td>{part.serialNo || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="equipment-receive-form-buttons">
          <button className="equipment-receive-form-submit-btn" onClick={handleSubmit}>
            Submit
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default EquipmentReceiveForm;
