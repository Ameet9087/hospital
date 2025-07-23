import React, { useRef, useEffect, useState } from "react";
import "./EquipmentMasterPopUp.css";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Using react-icons
import { API_BASE_URL } from "../../../api/api";
import { toast } from 'react-toastify';
import {FloatingInput,FloatingSelect,FloatingTextarea} from "../../../../FloatingInputs"
const EquipmentMasterPopUp = ({ onClose }) => {
  // ===================================================================
  const [roomStatus, setRoomStatus] = useState("active"); // State to manage room status
  const [selectedTab, setSelectedTab] = useState("personal");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [assetLocations, setAssetLocations] = useState([]);
  const [selectedAssetLocation, setSelectedAssetLocation] = useState("");
  const [locId, setLocId] = useState();
  const [id, setId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [departmentId, setDepartmentId] = useState();
  const [respDepartmentId, setRespDepartmentId] = useState();
  const [employeeId, setEmployeeId] = useState();

  const [data, setData] = useState({
    type: "",
    assetNo: "",

    typeOfEquipment: "",
    // ismsRequired: false, // Initialize boolean fields with default values
    equipmentOwner: "",
    equipmentName: "",
    cost: "",
    quantity: "",
    serialNo: "",
    modelNo: "",
    ytdDepreciation: "",
    accumulated: "",
    accounts: "",
    netValue: "",
    equipmentNo: "",
    remarks: "",
    oldAssetNo: "",
    locationPath: "",
    companyBrand: "",
    capacity: "",
    softwareVersion: "",
    active: "", // Initialize boolean fields with default values
    powerConsumption: "",
    lastGrnNo: "",
    lastGrnDate: "",
    lastGrnUser: "",
    installationDate: "",
    installationTime: "",
    installedBy: "",
    technicalDetails: "",
    warrantyFrom: "",
    warrantyToDate: "",
    warrantyDetails: "",
    status: "",
    financialEquipment: false, // Initialize boolean fields with default values
    equipmentStart: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/asset-categories`); // Replace with your API URL
        const data = await response.json();
        setCategories(data); // Assuming the API returns an array of category objects
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);

    // Find the selected category object from the categories array
    const selectedCategoryObj = categories.find(
      (category) => category.categoryId === Number(selectedCategoryId)
    );

    // Set the categoryId, depreciation, and salvage values
    setCategoryId(selectedCategoryId);
    setData((prevData) => ({
      ...prevData,
      ytdDepreciation: selectedCategoryObj?.depreciation || "",
      salvage: selectedCategoryObj?.salvage || "",
    }));
  };

  useEffect(() => {
    const fetchAssetLocations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/asset-location`); // Replace with your API URL
        const data = await response.json();
        setAssetLocations(data); // Assuming the API returns an array of category objects
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchAssetLocations();
  }, []);
  const handleLocationChange = (event) => {
    setSelectedAssetLocation(event.target.value);
    setLocId(event.target.value);
  };

  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  useEffect(() => {
    const fetcSuppliers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/vendors/getAllVendors`); // Replace with your API URL
        const data = await response.json();
        setSuppliers(data); // Assuming the API returns an array of category objects
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetcSuppliers();
  }, []);
  const handleSupplierChange = (event) => {
    setSelectedSupplier(event.target.value);

    setId(event.target.value);
  };

  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    const fetcDepartments = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/departments/getAllDepartments`
        ); // Replace with your API URL
        const data = await response.json();
        setDepartments(data); // Assuming the API returns an array of category objects
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetcDepartments();
  }, []);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setDepartmentId(event.target.value);
  };

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/employees/get-all-employee`
        ); // Replace with your API URL
        const data = await response.json();
        setEmployees(data); // Assuming the API returns an array of category objects
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
    setEmployeeId(event.target.value);
  };

  const [equipments, setEquipments] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/equipment-masters`); // Replace with your API URL
        const data = await response.json();
        setEquipments(data); // Assuming the API returns an array of category objects
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchEquipment();
  }, []);

  const handleEquipmentChange = (event) => {
    const selectedEquipmentId = event.target.value;
    setSelectedEquipment(selectedEquipmentId);

    // Find the selected equipment object from the equipments array
    const selectedEquipmentObj = equipments.find(
      (equipment) => equipment.equipmentMasterId === Number(selectedEquipmentId)
    );

    // Set the oldAssetNo in the data state
    setData((prevData) => ({
      ...prevData,
      oldAssetNo: selectedEquipmentObj?.assetNo || "",
    }));
  };

  const [responsibleDepartments, setResponsibleDepartments] = useState([]);
  const [selectedResponsibleDepartment, setSelectedResponsibleDepartment] =
    useState("");

  useEffect(() => {
    const fetcResponsibleDepartments = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/departments/getAllDepartments`
        ); // Replace with your API URL
        const data = await response.json();
        setResponsibleDepartments(data); // Assuming the API returns an array of category objects
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetcResponsibleDepartments();
  }, []);

  const handleResponsibleDepartmentChange = (event) => {
    setSelectedResponsibleDepartment(event.target.value);
    setRespDepartmentId(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleAddRow = () => {
    setData((prevData) => ({
      ...prevData,
      [selectedTab]: [
        ...prevData[selectedTab],
        { id: prevData[selectedTab].length + 1, name: "" },
      ],
    }));
  };

  const handleDeleteRow = (index) => {
    setData((prevData) => {
      const updatedRows = prevData[selectedTab].filter((_, i) => i !== index);
      return {
        ...prevData,
        [selectedTab]: updatedRows,
      };
    });
  };

  const handleInputChange = (index, value) => {
    setData((prevData) => {
      const updatedRows = [...prevData[selectedTab]];
      updatedRows[index].name = value;
      return {
        ...prevData,
        [selectedTab]: updatedRows,
      };
    });
  };

  const handleStatusChange = (e) => {
    setRoomStatus(e.target.value);
  };

  const handleAddEquipmentMaster = async () => {
    try {
      // Prepare equipment master data
      const equipmentMasterData = {
        type: data.type,
        assetNo: data.assetNo,
        typeOfEquipment: data.typeOfEquipment,
        // ismsRequired: data.ismsRequired,
        equipmentOwner: data.equipmentOwner,
        equipmentName: data.equipmentName,
        cost: parseFloat(data.cost),
        quantity: parseInt(data.quantity),
        serialNo: data.serialNo,
        modelNo: data.modelNo,
        ytdDepreciation: data.ytdDepreciation,
        accumulated: data.accumulated,
        accounts: data.accounts,
        netValue: data.netValue,
        equipmentNo: data.equipmentNo,
        remarks: data.remarks,
        oldAssetNo: data.oldAssetNo,
        locationPath: data.locationPath,
        companyBrand: data.companyBrand,
        softwareVersion: data.softwareVersion,
        capacity: data.capacity,
        active: data.active,
        powerConsumption: data.powerConsumption,
        lastGrnNo: data.lastGrnNo,
        lastGrnDate: data.lastGrnDate,
        lastGrnUser: data.lastGrnUser,
        installationDate: data.installationDate,
        installationTime: data.installationTime,
        installedBy: data.installedBy,
        technicalDetails: data.technicalDetails,
        warrantyFrom: data.warrantyFrom,
        warrantyToDate: data.warrantyToDate,
        warrantyDetails: data.warrantyDetails,
        status: data.status,
        financialEquipment: data.financialEquipment,
        equipmentStart: data.equipmentStart,

        // Include related entities using IDs (assuming you have them)
        assetLocationMaster: {
          locId: Number(locId),
        },
        assetCateMasterDTO: {
          categoryId: Number(categoryId),
        },
        responsibleDepartment: {
          departmentId: Number(departmentId),
        },
        department: {
          departmentId: Number(respDepartmentId),
        },
        employee: {
          employeeId: Number(employeeId),
        },
        vendor: {
          id: Number(id),
        },
      };

      console.log(JSON.stringify(equipmentMasterData, null, 2));

      // Send data to API
      const response = await fetch(`${API_BASE_URL}/equipment-masters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipmentMasterData),
      });

      if (response) {
        alert("Equipment Master added successfully!");
        toast.success("Equipment Master added successfully!");
        // Handle success (e.g., close the popup, display a success message)
      } else {
        console.error(
          "Error adding Equipment Master:",
          response.status,
          response.statusText
        );
     
      }
    } catch (error) {
      console.error("Error adding Equipment Master:", error);
      toast.error("Error adding Equipment Master")
    
    }
  };

  return (
    <div className="EquipmentMasterPopUp-container">
      <div className="EquipmentMasterPopUp-header">
        <h4>Equipment Master</h4>
        {/* <button className="EquipmentMasterPopUp-close-btn" onClick={onClose}>
          X
        </button> */}
      </div>
      <div className="EquipmentMasterPopUp-form">
        <div className="EquipmentMasterPopUp-form-row">
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
            <FloatingInput
            label={"Type"}
            type="text"
                placeholder="Enter Type"
                name="type"
                onChange={handleChange}/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
            <FloatingSelect
  label={"Search Equipment"}
  value={selectedEquipment}
  onChange={handleEquipmentChange}
  options={[
    { value: "", label: "Select Equipment" },
    ...equipments.map((equipment) => ({
      value: equipment.equipmentMasterId,
      label: equipment.equipmentName,
    })),
  ]}
/>

            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Old Asset No"}
              type="text"
              value={data.oldAssetNo}
              placeholder="Enter Old Asset No."/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Type of Equipment"}
              type="text"
              placeholder="Enter Type of Equipment"
              name="typeOfEquipment"
              onChange={handleChange}/>
             
            </div>
          </div>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Equipment Owner"}
              type="text"
              placeholder="Enter Equipment Owner"
              name="equipmentOwner"
              onChange={handleChange}/>
            </div>
            <div className="EquipmentMasterPopUp-form-group"></div>
            <div className="EquipmentMasterPopUp-form-group"></div>
            <div className="EquipmentMasterPopUp-form-group"></div>
          </div>
          <h4>Equipment Info</h4>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Equipment Name"}
              type="text"
              placeholder="Enter Equipment Name"
              name="equipmentName"
              onChange={handleChange}/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Cost"}
              type="number"
              placeholder="Enter Cost"
              name="cost"
              onChange={handleChange}
              min={'0'}/>
             
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Quantity"}
              type="number"
                placeholder="Enter Quantity"
                name="quantity"
                onChange={handleChange}
                min={'0'}/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Serial No"}
              type="text"
                placeholder="Enter Serial No."
                name="serialNo"
                onChange={handleChange}/>
              
            </div>
          </div>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Model No"}
              type="text"
                placeholder="Enter Model No."
                name="modelNo"
                onChange={handleChange}/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
            <FloatingSelect
  label={"Category"}
  value={selectedCategory}
  onChange={handleCategoryChange}
  options={[
    { value: "", label: "Select Category" },
    ...categories.map((category) => ({
      value: category.categoryId,
      label: category.assetCategory,
    })),
  ]}
/>

              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Salvage"}
              type="text"
                placeholder="Enter Salvage"
                name="salvage"
                value={data.salvage}/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Depreciation"}
              type="number"
                placeholder="Enter Depreciation"
                name="ytdDepreciation"
                value={data.ytdDepreciation}/>
             
            </div>
          </div>
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Accumulated"}
              type="text"
              placeholder="Enter Accumulated"
              name="accumulated"
              onChange={handleChange}/>
             
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Accounts"}
              type="text"
              placeholder="Enter Account"
              name="accounts"
              onChange={handleChange}/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"NetValue"}
              type="text"
                placeholder="Enter NetValue"
                name="netValue"
                onChange={handleChange}/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Equipment No"}
              type="text"
                placeholder="Enter Equipment No."
                name="equipmentNo"
                onChange={handleChange}/>
              
            </div>
          </div>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Asset No"}
              placeholder="Enter Asset No."
                name="assetNo"
                onChange={handleChange}/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Remarks"}
              placeholder="Enter Remarks"
                name="remarks"
                onChange={handleChange}/>

            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Location Path"}
              placeholder="Enter Location Path"
              name="locationPath"
              onChange={handleChange}/>
             
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Equipment Start"}
              placeholder="Enter Equipment Start"
                name="equipmentStart"
                onChange={handleChange}/>
            </div>
          </div>
          <h4>Equipment Using Dept Info</h4>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
            <FloatingSelect
  label={"Location"}
  value={selectedAssetLocation}
  onChange={handleLocationChange}
  options={[
    { value: "", label: "Select Location" },
    ...assetLocations.map((location) => ({
      value: location.locId,
      label: location.locationType,
    })),
  ]}
/>

            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Company"}
              type="text"
                placeholder="Enter Company"
                name="companyBrand"
                onChange={handleChange}/>
             
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Capacity"}
              type="text"
                placeholder="Enter Capacity"
                name="capacity"
                onChange={handleChange}/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Software Version No"}
              type="text"
                placeholder="Enter Software Version No."
                name="softwareVersion"
                onChange={handleChange}/>
              
            </div>
          </div>
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Active"}
              type="text"
                placeholder="Enter Active Status"
                name="active"
                onChange={handleChange}/>
              
            </div>

            <div className="EquipmentMasterPopUp-form-group">
            <FloatingSelect
  label={"Department"}
  value={selectedDepartment}
  onChange={handleDepartmentChange}
  options={[
    { value: "", label: "Select Department" },
    ...departments.map((department) => ({
      value: department.departmentId,
      label: department.departmentName,
    })),
  ]}
/>

              
            </div>

            <div className="EquipmentMasterPopUp-form-group">
            <FloatingSelect
  label={"Responsible Person"}
  value={selectedEmployee}
  onChange={handleEmployeeChange}
  options={[
    { value: "", label: "Select Person" },
    ...employees.map((employee) => ({
      value: employee.employeeId,
      label: `${employee.firstName} ${employee.lastName}`,
    })),
  ]}
/>

            </div>
            <div className="EquipmentMasterPopUp-form-group">
            <FloatingSelect
  label={"Responsible Department"}
  value={selectedResponsibleDepartment}
  onChange={handleResponsibleDepartmentChange}
  options={[
    { value: "", label: "Select Department" },
    ...responsibleDepartments.map((department) => ({
      value: department.departmentId,
      label: department.departmentName,
    })),
  ]}
/>

              
            </div>
          </div>
          <h4>Supplier Info</h4>
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
            <FloatingSelect
  label={"Supplier Name"}
  value={selectedSupplier}
  onChange={handleSupplierChange}
  options={[
    { value: "", label: "Select Supplier" },
    ...suppliers.map((supplier) => ({
      value: supplier.id,
      label: supplier.vendorName,
    })),
  ]}
/>

            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Supplier Address"}
              type="text" placeholder="Enter Supplier Address"/>
             
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Supplier GST"}
              type="text" placeholder="Enter Supplier GST"/>
             
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Breakdown Service Needed"}
              type="text" 
              placeholder="Enter Breakdown Service Needed" />
              
            </div>
          </div>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Contact Person"}
              type="text" placeholder="Enter Contact Person"/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Mobile No"}
              type="text" placeholder="Enter Mobile No."/>
             
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Contact No 1"}
              type="text" placeholder="Enter Contact No 1"/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Fax"}
              type="text" placeholder="Enter Fax"/>
              
            </div>
          </div>
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Support Email"}
              type="email" placeholder="Enter Support Email"/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Vendor Email"}
              type="email" placeholder="Enter Vendor Email" />
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Purchase Order Date"}
              type="date" placeholder="Enter Purchase Order Date"/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Purchase Order No"}
              type="text" placeholder="Enter Purchase Order No."/>
             
            </div>
          </div>
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Purchase Date"}
              type="date" placeholder="Enter Purchase Date"/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Current GRN"}
              type="text" placeholder="Enter Current GRN"/>
             
            </div>
            <div className="EquipmentMasterPopUp-form-group"></div>
            <div className="EquipmentMasterPopUp-form-group"></div>
          </div>
          <h4>Equipment Power Consumption</h4>
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Power Consumption"}
              type="text"
                placeholder="Enter Power Consumption"
                name="powerConsumption"
                onChange={handleChange}/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group"></div>
            <div className="EquipmentMasterPopUp-form-group"></div>
            <div className="EquipmentMasterPopUp-form-group"></div>
          </div>

          <h4>Previous GRN Details</h4>
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Last GRN No"}
              type="text"
                placeholder="Enter Last GRN No."
                name="lastGrnNo"
                onChange={handleChange}/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Last GRN Date"}
              type="date"
              placeholder="Enter Last GRN Date"
              name="lastGrnDate"
              onChange={handleChange}/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Last GRN User"}
              type="text"
                placeholder="Enter Last GRN User"
                name="lastGrnUser"
                onChange={handleChange}/>
             
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Financial Equipment"}
              type="text"
              placeholder="Enter Financial Equipment"
              name="financialEquipment"
              onChange={handleChange}/>
              
            </div>
          </div>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Installation Date"}
              type="date"
                placeholder="Enter Installation Date"
                name="installationDate"
                onChange={handleChange}/>
             
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Installation Time"}
              type="time"
                placeholder="Enter Installation Time"
                name="installationTime"
                onChange={handleChange}/>
             
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Installed By"}
              type="text"
                placeholder="Enter Installed By"
                name="installedBy"
                onChange={handleChange}/>
              
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Technical Details"}
              placeholder="Enter Technical Details"
                name="technicalDetails"
                onChange={handleChange}/>
              
            </div>
          </div>
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Status"}
              name="status"
                placeholder="Enter Status"
                onChange={handleChange}/>
             
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Warranty Details"}
              placeholder="Enter Warranty Details"
              name="warrantyDetails"
              onChange={handleChange}/>
             
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Warranty From"}
              type="date"
              placeholder="Enter Warranty From"
              name="warrantyFrom"
              onChange={handleChange}/>
             
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Warranty To"}
              type="date"
                placeholder="Enter Warranty TO"
                name="warrantyToDate"
                onChange={handleChange}/>
              
            </div>
          </div>
          <h4>Documents</h4>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <FloatingInput
              label={"Installed By"}
              type="file" placeholder="document"/>
             
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              {/* <label>Rcid:</label>
              <input type="text" placeholder="rcid" /> */}
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              {/* <label>Poid:</label>
              <input type="text" placeholder="" /> */}
            </div>
            <div className="EquipmentMasterPopUp-form-group"></div>
          </div>
        </div>
      </div>

      <div className="EquipmentMasterPopUp-form-actions">
        <button
          className="EquipmentMasterPopUp-add-btn"
          onClick={handleAddEquipmentMaster}
        >
          Add
        </button>
        {/* <button className="EquipmentMasterPopUp-close-btn" onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
};

export default EquipmentMasterPopUp;
