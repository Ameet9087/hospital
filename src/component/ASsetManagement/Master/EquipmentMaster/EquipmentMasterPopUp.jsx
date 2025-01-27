import React, { useRef, useEffect, useState } from "react";
import "./EquipmentMasterPopUp.css";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Using react-icons
import { API_BASE_URL } from "../../../api/api";
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
    type: '',
    assetNo: '',

    typeOfEquipment: '',
    // ismsRequired: false, // Initialize boolean fields with default values
    equipmentOwner: '',
    equipmentName: '',
    cost: '',
    quantity: '',
    serialNo: '',
    modelNo: '',
    ytdDepreciation: '',
    accumulated: '',
    accounts: '',
    netValue: '',
    equipmentNo: '',
    remarks: '',
    oldAssetNo: '',
    locationPath: '',
    companyBrand: '',
    capacity: '',
    softwareVersion: '',
    active: '', // Initialize boolean fields with default values
    powerConsumption: '',
    lastGrnNo: '',
    lastGrnDate: '',
    lastGrnUser: '',
    installationDate: '',
    installationTime: '',
    installedBy: '',
    technicalDetails: '',
    warrantyFrom: '',
    warrantyToDate: '',
    warrantyDetails: '',
    status: '',
    financialEquipment: false, // Initialize boolean fields with default values
    equipmentStart: '',
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
    setSelectedCategory(event.target.value);
    setCategoryId(event.target.value)
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
    setLocId(event.target.value)



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

    setId(event.target.value)


  };



  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");


  useEffect(() => {
    const fetcDepartments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/departments/getAllDepartments`); // Replace with your API URL
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
    setDepartmentId(event.target.value)
  };

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/employees/get-all-employee`); // Replace with your API URL
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
    setEmployeeId(event.target.value)
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
    setSelectedEquipment(event.target.value);
  };

  const [responsibleDepartments, setResponsibleDepartments] = useState([]);
  const [selectedResponsibleDepartment, setSelectedResponsibleDepartment] = useState("");

  useEffect(() => {
    const fetcResponsibleDepartments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/departments/getAllDepartments`); // Replace with your API URL
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
    setRespDepartmentId(event.target.value)
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
        powerConsumption: parseFloat(data.powerConsumption),
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


      // Send data to API
      const response = await fetch(`${API_BASE_URL}/equipment-masters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipmentMasterData),
      });

      if (response.ok) {
        console.log('Equipment Master added successfully!');
        // Handle success (e.g., close the popup, display a success message)
      } else {
        console.error('Error adding Equipment Master:', response.status, response.statusText);
        // Handle error (e.g., display an error message to the user)
      }
    } catch (error) {
      console.error('Error adding Equipment Master:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  return (
    <div
      className="EquipmentMasterPopUp-container"
    >
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
              <label>Type:</label>
              <input type="text" placeholder="Enter Type"
                name="type"
                onChange={handleChange}
              />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Search Equipment:</label>
              <select value={selectedEquipment} onChange={handleEquipmentChange}>
                <option value="">Select Equipment</option>
                {equipments.map((equipment) => (
                  <option key={equipment.equipmentMasterId} value={equipment.equipmentMasterId}>
                    {equipment.equipmentName}
                  </option>
                ))}
              </select>                </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Asset No:</label>
              <input type="text" placeholder="Enter Assetment No."
              />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Type of Equipment:</label>
              <input type="text" placeholder="Enter Type of Equipment" name="typeOfEquipment" onChange={handleChange} />
            </div>
          </div>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <label>Equipment Owner:</label>
              <input type="text" placeholder="Enter Equipment Owner" name="equipmentOwner" onChange={handleChange} />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Equipment Name:</label>
              <input type="text" placeholder="Enter Equipment Name" />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
            </div>
            <div className="EquipmentMasterPopUp-form-group">
            </div>
          </div>
          <h4>Equipment Info</h4>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <label>Equipment Name:</label>
              <input type="text" placeholder="Enter Equipment Name" name="equipmentName" onChange={handleChange} />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Cost:</label>
              <input type="number" placeholder="Enter Cost" name="cost" onChange={handleChange} />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Quantity:</label>
              <input type="number" placeholder="Enter Quantity" name="quantity" onChange={handleChange} />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Serial No.:</label>
              <input type="text" placeholder="Enter Serial No." name="serialNo" onChange={handleChange} />
            </div>
          </div>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <label>Model No.:</label>
              <input type="text" placeholder="Enter Model No." name="modelNo" onChange={handleChange} />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Category:</label>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.assetCategory}
                  </option>
                ))}
              </select>
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Salvage:</label>
              <input type="text" placeholder="Enter Salvage" />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Depreciation:</label>
              <input type="text" placeholder="Enter Depreciation" name="ytdDepreciation" onClick={handleChange} />
            </div>
          </div>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <label>Description / Asset No.:</label>
              <textarea placeholder="Enter Description or Asset No." name="assetNo" onChange={handleChange}></textarea>
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Remarks:</label>
              <textarea placeholder="Enter Remarks" name="remarks" onChange={handleChange}></textarea>
            </div>
            <div className="EquipmentMasterPopUp-form-group">
            </div>
            <div className="EquipmentMasterPopUp-form-group">
            </div>
          </div>
          <h4>Equipment Using Dept Info</h4>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <label>Location:</label>
              <select value={selectedAssetLocation} onChange={handleLocationChange}>
                <option value="">Select Location</option>
                {assetLocations.map((location) => (
                  <option key={location.locId} value={location.locId}>
                    {location.locationType}
                  </option>
                ))}
              </select>              </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Company:</label>
              <input type="text" placeholder="Enter Company" name="companyBrand" onChange={handleChange} />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Capacity:</label>
              <input type="text" placeholder="Enter Capacity" name="capacity" onChange={handleChange} />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Software Version No:</label>
              <input type="text" placeholder="Enter Software Version No." name="softwareVersion" onChange={handleChange} />
            </div>
          </div>
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <label>Active:</label>
              <input type="text" placeholder="Enter Active Status" name="active" onChange={handleChange} />
            </div>

            <div className="EquipmentMasterPopUp-form-group">
              <label>Department:</label>
              <select value={selectedDepartment} onChange={handleDepartmentChange}>
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.departmentId} value={department.departmentId}>
                    {department.departmentName}
                  </option>
                ))}
              </select>
            </div>

            <div className="EquipmentMasterPopUp-form-group">
              <label>Responsible Person:</label>
              <select value={selectedEmployee} onChange={handleEmployeeChange}>
                <option value="">Select Person</option>
                {employees.map((employee) => (
                  <option key={employee.employeeId} value={employee.employeeId}>
                    {employee.firstName} {employee.lastName}

                  </option>
                ))}
              </select>                </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Responsible Department:</label>
              <select value={selectedResponsibleDepartment} onChange={handleResponsibleDepartmentChange}>
                <option value="">Select Department</option>
                {responsibleDepartments.map((department) => (
                  <option key={department.departmentId} value={department.departmentId}>
                    {department.departmentName}
                  </option>
                ))}
              </select>
            </div>

          </div>
          <h4>Supplier Info</h4>
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <label>Supplier Name:</label>
              <select value={selectedSupplier} onChange={handleSupplierChange}>
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.vendorName}
                  </option>
                ))}
              </select>            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Supplier Address:</label>
              <input type="text" placeholder="Enter Supplier Address" />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Supplier GST:</label>
              <input type="text" placeholder="Enter Supplier GST" />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Breakdown Service Needed:</label>
              <input type="text" placeholder="Enter Breakdown Service Needed" />
            </div>
          </div>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <label>Contact Person:</label>
              <input type="text" placeholder="Enter Contact Person" />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Mobile No:</label>
              <input type="text" placeholder="Enter Mobile No." />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Contact No 1:</label>
              <input type="text" placeholder="Enter Contact No 1" />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Fax:</label>
              <input type="text" placeholder="Enter Fax" />
            </div>
          </div>
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <label>Support Email:</label>
              <input type="email" placeholder="Enter Support Email" />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Vendor Email:</label>
              <input type="email" placeholder="Enter Vendor Email" />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Purchase Order Date:</label>
              <input type="date" placeholder="Enter Purchase Order Date" />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Purchase Order No:</label>
              <input type="text" placeholder="Enter Purchase Order No." />
            </div>

          </div>
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <label>Purchase Date:</label>
              <input type="date" placeholder="Enter Purchase Date" />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Current GRN:</label>
              <input type="text" placeholder="Enter Current GRN" />
            </div>
            <div className="EquipmentMasterPopUp-form-group">

            </div>
            <div className="EquipmentMasterPopUp-form-group">

            </div>
          </div>
          <h4>Equipment Power Consumption</h4>
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <label>Power Consumption:</label>
              <input type="text" placeholder="Enter Power Consumption" name="powerConsumption" onChange={handleChange} />
            </div>
          </div>

          <h4>Previous GRN Details</h4>
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <label>Last GRN No:</label>
              <input type="text" placeholder="Enter Last GRN No." name="lastGrnNo" onChange={handleChange} />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Last GRN Date:</label>
              <input type="date" placeholder="Enter Last GRN Date" name="lastGrnDate" onChange={handleChange} />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Last GRN User:</label>
              <input type="text" placeholder="Enter Last GRN User" name="lastGrnUser" onChange={handleChange} />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
            </div>
          </div>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <label>Installation Date:</label>
              <input type="date" placeholder="Enter Installation Date" name="installationDate" onChange={handleChange} />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Installation Time:</label>
              <input type="time" placeholder="Enter Installation Time" name="installationTime" onChange={handleChange} />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Installed By:</label>
              <input type="text" placeholder="Enter Installed By" name="installedBy" onChange={handleChange} />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Technical Details:</label>
              <textarea placeholder="Enter Technical Details" name="technicalDetails" onChange={handleChange}></textarea>
            </div>
          </div>
          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <label>Remarks:</label>
              <textarea placeholder="Enter Remarks"></textarea>
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              <label>Warranty Details:</label>
              <textarea placeholder="Enter Warranty Details" name="warrantyDetails" onChange={handleChange}></textarea>
            </div>
            <div className="EquipmentMasterPopUp-form-group">
            </div>
            <div className="EquipmentMasterPopUp-form-group">
            </div>
          </div>
          <h4>Documents</h4>

          <div className="EquipmentMasterPopUp-form-group-1row">
            <div className="EquipmentMasterPopUp-form-group">
              <label>Installed By:</label>
              <input type="file" placeholder="document" />
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              {/* <label>Rcid:</label>
              <input type="text" placeholder="rcid" /> */}
            </div>
            <div className="EquipmentMasterPopUp-form-group">
              {/* <label>Poid:</label>
              <input type="text" placeholder="" /> */}
            </div>
            <div className="EquipmentMasterPopUp-form-group">
            </div>

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
