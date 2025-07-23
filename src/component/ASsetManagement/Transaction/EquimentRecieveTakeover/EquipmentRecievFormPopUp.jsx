import React, { useState, useEffect } from "react";
import "./EquipmentRecievFormPopUp.css";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput,FloatingSelect,FloatingTextarea } from "../../../../FloatingInputs";
import { toast } from "react-toastify";
import { lazy } from "react";

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
        toast.success("Successfully posted:", result);
        onSubmit(result); // Pass the new entry to the parent component
      } else {
        const errorText = await response.text();
        toast.error("Failed to submit:", errorText);
      }
    } catch (error) {
      toast.error("Error submitting data:", error);
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
          <FloatingSelect
  label={"Handover No"}
  value={selectedHandover?.transferId}
  onChange={handleHandoverNoChange}
  options={[
    { value: "", label: "Select Handover", disabled: true },
    ...handoverOptions.map((handOver) => ({
      value: handOver.transferId,
      label: handOver.transferId
    }))
  ]}
/>

          </div>

          {/* Equipment Details */}
          <div>
            <FloatingInput
            label={"Equipment Name"}
            type="text" value={selectedHandover?.equipmentMasterDTO?.equipmentName} readOnly/>
           
          </div>
          <div>
            <FloatingInput
            label={"Asset No."}
            type="text" value={selectedHandover?.equipmentMasterDTO?.assetNo} readOnly />
           
          </div>
          <div>
            <FloatingInput
            label={"Equipment No"}
            type="text" value={selectedHandover?.equipmentMasterDTO?.equipmentNo} readOnly/>
           
          </div>
          <div>
            <FloatingInput
            label={"Serial No"}
            type="text" value={selectedHandover?.equipmentMasterDTO?.serialNo} readOnly/>
            
          </div>
          <div>
            <FloatingInput
            label={"Location"}
            type="text"
              value={selectedHandover?.equipmentMasterDTO?.assetLocationMaster?.subLocation || ""}
              readOnly/>
          </div>
          <div>
            <FloatingInput
            label={"Department"}
            type="text"
            value={selectedHandover?.equipmentMasterDTO?.department?.departmentName}
            readOnly/>
          </div>
          <div>
            <FloatingInput
            label={"Handed By"}
            type="text"
            value={selectedHandover?.handedByDTO?.firstName || ""}
            readOnly
          />
           
             
          </div>
          <div>
            <FloatingInput
            label={"Person in Charge"}
            type="text"
          name="personInCharge"
          value={formData.personInCharge}
          onChange={handleChange}/>
          
          </div>

          {/* Date and Time */}
          <div>
            <FloatingInput
            label={"Date Of Receive / Takeover"}
            type="date"
              value={equipmentDetails.dateOfReceive}
              onChange={(e) =>
                setEquipmentDetails({
                  ...equipmentDetails,
                  dateOfReceive: e.target.value,
                })
              }/>
            
          </div>
          <div>
            <FloatingInput
            label={"Time Of Receive / Takeover"}
            type="time"
              value={equipmentDetails.timeOfReceive}
              onChange={(e) =>
                setEquipmentDetails({
                  ...equipmentDetails,
                  timeOfReceive: e.target.value,
                })
              }/>

          </div>
          <div>
            <FloatingInput
            label={"manual Receive"}
            type="text"
          name="manualReceive"
          value={formData.manualReceive}
          onChange={handleChange}/>
          
          </div>

          {/* Remarks */}
          <div>
            <FloatingTextarea
            label={"Remarks"}
            value={formData.remarks}
              onChange={handleChange}
              name="remarks"/>
            
          </div>

          {/* Employee Type */}
          <div>
            <FloatingSelect
            label={"Employee Type"}
            name="employeeType"
              value={employeeType}
              onChange={handleEmployeeTypeChange}
              options={[{
                value:"Employee",label:"Employee"
              },{value:"Non-Employee",label:"Non-Employee"}]}/>
           
           
          </div>

          {/* Handed By Field */}
          <div>
          {employeeType === "Employee" ? (
  <FloatingSelect
    label={"Handed By"}
    name="handedBy"
    value={selectedEmployee}
    onChange={handleEmployeeChange}
    options={[
      { value: "", label: "Select Employee" },
      ...employees.map((emp) => ({
        value: emp.employeeId,
        label: emp.firstName
      }))
    ]}
  />
) : (
  <FloatingInput
  type="text"
    name="handedBy"
    value={formData.handedBy}
    onChange={handleHandedByChange}/>
  
)}

            
          </div>

          {/* Location Received */}
          <div>
          <FloatingSelect
  label={"Location Received"}
  name="locationReceived"
  value={formData.locationReceived}
  onChange={handleChange}
  options={[
    { value: "", label: "Select Location" },
    ...locations.map((location) => ({
      value: location.locId,
      label: location.subLocation
    }))
  ]}
/>

          
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
