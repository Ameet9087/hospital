import React, { useRef, useEffect, useState } from "react";
import "./EquipmentUserTrainingDetailsPopUp.css";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../../api/api";
// import { FaSearch } from "react-icons/fa"; // Using react-icons
import { FloatingInput,FloatingSelect,FloatingTextarea } from "../../../../../FloatingInputs";
import { toast } from "react-toastify";

const EquipmentUserTrainingDetailsPopUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    employeeType: "",
    manualTrainer: "",
    contractType: "",
    contractFromDate: "",
    contractToDate: "",
    remark: "",
  });
  const [selectedEquipment, setSelectedEquipment] = useState("");

  const [equipments, setEquipments] = useState([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState("");
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainerId, setSelectedTrainerId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [equipmentDetails, setEquipmentDetails] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const [employees, setEmployees] = useState([]);
  const [packageTableRows, setPackageTableRows] = useState([
    {
      employeeType: "",
      employeeCode: "",
      employeeName: "",
      designation: "",
      remarks: "",
    },
  ]);

  // Fetch equipment details based on selected equipment
  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      if (selectedEquipmentId) {
        try {
          const response = await fetch(`${API_BASE_URL}/equipment-masters/${selectedEquipmentId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
  
          setEquipmentData({
            equipmentNo: data.equipmentMasterId || "",
            serialNo: data.serialNo || "",
            assetNo: data.assetNo || "",
            equipmentLocation: data?.assetLocationMaster?.subLocation || "",
            category: data?.assetCateMasterDTO?.underCategory || "",
            depriciation: data?.assetCateMasterDTO?.depreciation || "",
            modelNo: data.modelNo || "",
            companyBrand: data.companyBrand || "",
            responsiblePerson: data.equipmentOwner || "",
          });
        } catch (error) {
          console.error("Error fetching equipment details:", error);
        }
      } else {
        setEquipmentData({
          equipmentNo: "",
          serialNo: "",
          assetNo: "",
          equipmentLocation: "",
          category: "",
          depriciation: "",
          modelNo: "",
          companyBrand: "",
          responsiblePerson: "",
        });
      }
    };
  
    fetchEquipmentDetails();
  }, [selectedEquipmentId]);
  

  const handleEquipmentChange = async (event) => {
    const selectedId = event.target.value;
    setSelectedEquipmentId(selectedId);

    if (selectedId) {
      try {
        const response = await fetch(`${API_BASE_URL}/equipment-masters/${selectedId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEquipmentDetails(data); // Assuming `data` is the equipment details object
      } catch (error) {
        console.error("Error fetching equipment details:", error);
      }
    } else {
      setEquipmentDetails(null); // Reset details if no equipment is selected
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/employees/get-all-employee`);
        const data = await response.json();
        setEmployees(data); // Assuming `data` contains an array of employee objects with nested employee data
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
      }
    };

    fetchEmployees();
  }, []);




  const [equipmentData, setEquipmentData] = useState({
    equipmentNo: "",
    serialNo: "",
    assetNo: "",
    equipmentLocation: "",
    category: "",
    depriciation: "",
    modelNo: "",
    companyBrand: "",
    responsiblePerson: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
  
    if (!selectedEquipmentId || !selectedTrainerId || !selectedDoctorId || !selectedEmployeeId){
      alert("Please select all before saving.");
      return;
    }


    const payload = {
      employeeType: formData.employeeType,
      manualTrainer: formData.manualTrainer,
      contractType: formData.contractType,
      contractFromDate: formData.contractFromDate,
      contractToDate: formData.contractToDate,
      remark: formData.remark,
      equipmentMasterDTO: {
        equipmentMasterId: parseInt(selectedEquipmentId)
      },
      trainer: {
        employeeId: parseInt(selectedTrainerId)
      },
      employee: {
        employeeId: parseInt(selectedEmployeeId)
      },
      doctor: {
        doctorId: parseInt(selectedDoctorId)
      }
    };

    console.log("Form Data:", JSON.stringify(payload, null, 2));
    


    try {
      const response = await fetch(`${API_BASE_URL}/trainingDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Data saved successfully!");
      } else {
        const error = await response.json();
        toast.error(`Failed to save data: ${error.message || response.statusText}`);
      }
    } catch (error) {
      toast.error("Error saving data:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };


  const handleTrainerChange = (e) => {
    const trainerId = parseInt(e.target.value, 10);
    setSelectedTrainerId(trainerId);
  }
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/employees/get-all-employee`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTrainers(data); // Assuming `data` is an array of trainer objects
      } catch (error) {
        console.error("Error fetching trainer details:", error);
      } finally {
      }
    };

    fetchTrainers();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/doctors`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setDoctors(data); // Assuming `data` is an array of trainer objects
      } catch (error) {
        console.error("Error fetching trainer details:", error);
      } finally {
      }
    };

    fetchDoctors();
  }, []);

  const handleDoctorChange = (e) => {
    const doctorId = parseInt(e.target.value, 10);
    setSelectedDoctorId(doctorId);


  };

  const handleEmployeeChange = (e) => {
    const empId = parseInt(e.target.value, 10);
    setSelectedEmployeeId(empId);

    // Find the selected trainer's data
    const selectedEmployee = employees.find((emp) => emp.employeeId === employees);


  };

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/equipment-masters`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEquipments(data); // Assuming `data` is an array of equipment objects
      } catch (error) {
        console.error("Error fetching equipment details:", error);
      } finally {
      }
    };

    fetchEquipments();
  }, []);

  // const handleEquipmentChange = (e) => {
  //   const equipmentId = parseInt(e.target.value, 10);
  //   setSelectedEquipmentId(equipmentId);

  //   // Find the selected equipment's data
  //   const selectedEquipment = equipments.find((equipment) => equipment.id === equipmentId);

  //   if (selectedEquipment) {
  //     setEquipmentData({
  //       equipmentNo: selectedEquipment.equipmentNo || "",
  //       serialNo: selectedEquipment.serialNo || "",
  //       assetNo: selectedEquipment.assetNo || "",
  //       equipmentLocation: selectedEquipment.equipmentLocation || "",
  //       category: selectedEquipment.category || "",
  //       depriciation: selectedEquipment.depriciation || "",
  //       modelNo: selectedEquipment.modelNo || "",
  //       companyBrand: selectedEquipment.companyBrand || "",
  //       responsiblePerson: selectedEquipment.admin.responsiblePerson || "",
  //     });
  //   }
  // };
  // ===================================================================

  return (
    <div
      className="EquipmentUserTrainingDetailsPopUp-container"
    >
      <div className="EquipmentUserTrainingDetailsPopUp-header">
        <h4>Equipment User Training Details</h4>
        {/* <button className="EquipmentUserTrainingDetailsPopUp-close-btn" onClick={onClose}>
          X
        </button> */}
      </div>

      <div className="EquipmentUserTrainingDetailsPopUp-form">
        <div className="EquipmentUserTrainingDetailsPopUp-form-row">
          {/* <div className="EquipmentUserTrainingDetailsPopUp-form-group-1row">
            <div className="EquipmentUserTrainingDetailsPopUp-form-group">
            <label>Training No:</label>
        
          <input type="text" name="equipmentName" />
            </div>
            <div className="EquipmentUserTrainingDetailsPopUp-form-group">
            
            </div>
            <div className="EquipmentUserTrainingDetailsPopUp-form-group">
            </div>
          </div> */}
          <h4>Equipment Info</h4>
          <div></div>
          <div></div>

          {loading ? (
            <p>Loading equipment details...</p>
          ) : (
            <>
              <div className="EquipmentUserTrainingDetailsPopUp-form-group-1row">

                <div className="EquipmentUserTrainingDetailsPopUp-form-group">
                <FloatingSelect
  label={"Equipment Name *"}
  value={selectedEquipmentId}
  onChange={handleEquipmentChange}
  options={[
    { value: "", label: "Select Equipment" }, // Default option
    ...equipments.map((equipment) => ({
      value: equipment.equipmentMasterId,
      label: equipment.equipmentName,
    })),
  ]}
/>

                  {/* <FaSearch className="equipment-transfer-search-bar" /> */}
                </div>
                <div className="EquipmentUserTrainingDetailsPopUp-form-group">
                  <FloatingInput
                  label={"Equipment No"}
                  type="text" value={equipmentData.equipmentNo} readOnly/>
                  
                </div>
                <div className="EquipmentUserTrainingDetailsPopUp-form-group">
                  <FloatingInput
                  label={"Serial No"}
                  type="text" value={equipmentData.serialNo} readOnly/>
                 
                </div>

              </div>

              <div className="EquipmentUserTrainingDetailsPopUp-form-group-1row">
                <div className="EquipmentUserTrainingDetailsPopUp-form-group">
                  <FloatingInput
                  label={"Asset No"}
                  type="text" value={equipmentData.assetNo} readOnly/>
                 
                </div>
                <div className="EquipmentUserTrainingDetailsPopUp-form-group">
                  <FloatingInput
                  label={"Equipment Location"}
                  type="text" value={equipmentData.equipmentLocation} readOnly />
                  
                </div>
                <div className="EquipmentUserTrainingDetailsPopUp-form-group">
                  <FloatingInput
                  label={"Category"}
                  type="text" value={equipmentData.category} readOnly/>
                 
                </div>
              </div>

              <div className="EquipmentUserTrainingDetailsPopUp-form-group-1row">
                <div className="EquipmentUserTrainingDetailsPopUp-form-group">
                  <FloatingInput
                  label={"Depreciation"}
                  type="text" value={equipmentData.depriciation} readOnly/>
                 
                </div>
                <div className="EquipmentUserTrainingDetailsPopUp-form-group">
                  <FloatingInput
                  label={"Model No"}
                  type="text" value={equipmentData.modelNo} readOnly/>
                  
                </div>
                <div className="EquipmentUserTrainingDetailsPopUp-form-group">
                  <FloatingInput
                  label={"Company Brand"}
                  type="text" value={equipmentData.companyBrand} readOnly/>
                  
                </div>
              </div>
              <div className="EquipmentUserTrainingDetailsPopUp-form-group-1row">
                <div className="EquipmentUserTrainingDetailsPopUp-form-group">
                  <FloatingInput
                  label={"REsponsible Person"}
                  type="text" value={equipmentData.responsiblePerson}/>
                  
                </div>
                <div className="EquipmentUserTrainingDetailsPopUp-form-group">

                </div>
                <div className="EquipmentUserTrainingDetailsPopUp-form-group">

                </div>
              </div>
            </>
          )}

          <h4>Training Details</h4>

          <div className="EquipmentUserTrainingDetailsPopUp-form-group-1row">
            <div className="EquipmentUserTrainingDetailsPopUp-form-group">
            <FloatingSelect
  label={"Trainer Name *"}
  value={selectedTrainerId}
  onChange={handleTrainerChange}
  options={[
    { value: "", label: "Select Trainer" }, // Default option
    ...trainers.map((trainer) => ({
      value: trainer.employeeId,
      label: `${trainer.firstName} ${trainer.lastName}`, // Combining first & last name
    })),
  ]}
/>
            </div>
            <div className="EquipmentUserTrainingDetailsPopUp-form-group">
            <FloatingSelect
  label={"Employee *"}
  value={selectedEmployeeId}
  onChange={handleEmployeeChange}
  options={[
    { value: "", label: "Select Employee" }, // Default option
    ...trainers.map((trainer) => ({
      value: trainer.employeeId,
      label: `${trainer.firstName} ${trainer.lastName}`, // Full name
    })),
  ]}
/>

              
            </div>

            <div className="EquipmentUserTrainingDetailsPopUp-form-group">
            <FloatingSelect
  label={"Doctor *"}
  value={selectedDoctorId}
  onChange={handleDoctorChange}
  options={[
    { value: "", label: "Select Doctor" }, // Default option
    ...doctors.map((doctor) => ({
      value: doctor.doctorId,
      label: doctor.doctorName, // Display doctor names
    })),
  ]}
/>

            </div>
          </div>
          <div className="EquipmentUserTrainingDetailsPopUp-form-group-1row">
            <div className="EquipmentUserTrainingDetailsPopUp-form-group">
              <FloatingInput
              label={"To Date *"}
              type="date"
              name="contractToDate"
              value={formData.contractToDate}
              onChange={handleInputChange}/>
              
             
            </div>
            <div className="EquipmentUserTrainingDetailsPopUp-form-group">
              <FloatingInput
              label={"Remarks"}
              type="text"
                name="remark"
                value={formData.remark}
                onChange={handleInputChange}/>
            </div>
            <div className="EquipmentUserTrainingDetailsPopUp-form-group">
              <FloatingInput
              label={"From Date * "}
              type="date"
              name="contractFromDate"
              value={formData.contractFromDate}
              onChange={handleInputChange}/>
             
            </div>
          </div>
          <div className="EquipmentUserTrainingDetailsPopUp-form-group-1row">
            <div className="EquipmentUserTrainingDetailsPopUp-form-group">
              <FloatingInput
              label={"Employee Type *"}
              type="text"
              name="employeeType"
              value={formData.employeeType}
              onChange={handleInputChange}/>
              
            </div>
            <div className="EquipmentUserTrainingDetailsPopUp-form-group">
              <FloatingInput
              label={"Manual Trainer * "}
              type="text"
              name="manualTrainer"
              value={formData.manualTrainer}
              onChange={handleInputChange}/>
             
            </div>
            <div className="EquipmentUserTrainingDetailsPopUp-form-group">
              <FloatingInput
              label={"Contract Type *"}
              type="text"
              name="contractType"
              value={formData.contractType}
              onChange={handleInputChange}/>
             
            </div>
          </div>
          <h4>Documents</h4>
          <div className="EquipmentUserTrainingDetailsPopUp-form-group-1row">
            <div className="EquipmentUserTrainingDetailsPopUp-form-group">
              <label>File Name</label>
              
              <input type="file" />
            </div>

          </div>


        </div>
      </div>




      <div className="EquipmentUserTrainingDetailsPopUp-form-actions">
        <button
          className="EquipmentUserTrainingDetailsPopUp-add-btn"
          onClick={handleSave}
        >
          Add
        </button>
        <button className="EquipmentUserTrainingDetailsPopUp-close-btn">Close</button>
      </div>

    </div>
  );
};

export default EquipmentUserTrainingDetailsPopUp;
