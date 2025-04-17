import React, { useState, useEffect, useRef } from "react";
import "./AddEmployeeForm.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { toast } from "react-toastify";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { FaSearch } from "react-icons/fa";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
  PopupTable,
} from "../../FloatingInputs";

const AddEmployeeForm = ({ onClose }) => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [floors, setFloors] = useState([]);
  const [selectedFloors, setSelectedFloors] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const testDetailsTableRef = useRef(null);
  const [testDetailsColumnWidths, setTestDetailsColumnWidths] = useState({});

  const floorDetailsTableRef = useRef(null);
  const [floorDetailsColumnWidths, setFloorDetailsColumnWidths] = useState({});

  const locationDetailsTableRef = useRef(null);
  const [locationDetailsColumnWidths, setLocationDetailsColumnWidths] =
    useState({});

  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedFloorRowId, setSelectedFloorRowId] = useState(null);
  const [selectedLocationRowId, setSelectedLocationRowId] = useState(null);
  const [selectedRoleName, setSelectedRoleName] = useState("");
  const [testDetails, setTestDetails] = useState([
    {
      sn: 1,
      testName: "",
    },
  ]);
  const [floorDetails, setFloorDetails] = useState([
    {
      sn: 1,
      floorNumber: "",
    },
  ]);
  const [locationDetails, setLocationDetails] = useState([
    {
      sn: 1,
      locationName: "",
    },
  ]);

  const [activePopup, setActivePopup] = useState("");
  const [employeeData, setEmployeeData] = useState({
    salutation: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    emailId: "",
    signatureShort: "",
    signatureLong: "",
    dateOfJoining: "",
    contactAddress: "",
    kraPin: "",
    isIncentiveApplicable: false,
    extension: "",
    speedDial: "",
    officeHour: "",
    bloodGroup: "",
    drivingLicenseNo: "",
    isActive: false,
    displaySequence: "",
    employeeSignature: "",
  });
  const [showTable, setShowTable] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [employeeRoles, setEmployeeRoles] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployeeRole, setSelectedEmployeeRole] = useState("");
  const [selectedEmployeeType, setSelectedEmployeeType] = useState("");

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/departments/getAllDepartments`
      );
      setDepartments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // Fetch employee types
  const fetchEmployeeTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employeeTypes/getAll`);
      setEmployeeTypes(response.data);
    } catch (error) {
      console.error("Error fetching employee types:", error);
    }
  };

  // Fetch employee roles
  const fetchEmployeeRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employeeRoles/getAll`);
      setEmployeeRoles(response.data);
    } catch (error) {
      console.error("Error fetching employee roles:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchEmployeeTypes();
    fetchEmployeeRoles();
  }, []);
  useEffect(() => {
    fetch(`${API_BASE_URL}/location-masters`)
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => console.error("Error fetching Locations:", error));
  }, []);
  useEffect(() => {
    fetch(`${API_BASE_URL}/service-details`)
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => console.error("Error fetching services:", error));
  }, []);
  useEffect(() => {
    fetch(`${API_BASE_URL}/floors`)
      .then((response) => response.json())
      .then((data) => {
        setFloors(data);
      })
      .catch((error) => console.error("Error fetching floors:", error));
  }, []);

  useEffect(() => {
    if (selectedEmployeeRole && employeeRoles.length > 0) {
      const role = employeeRoles.find(
        (r) => r.employeeRoleId.toString() === selectedEmployeeRole.toString()
      );
      if (role) {
        setSelectedRoleName(role.role);
      }
    }
  }, [selectedEmployeeRole, employeeRoles]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "appointmentApplicable") {
      setShowTable(checked);
    }
  };
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedEmployeeRole(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedEmployeeType(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEmployeeData((prevData) => ({
        ...prevData,
        employeeSignature: reader.result.split(",")[1], // Base64 content without the prefix
      }));
    };
    reader.readAsDataURL(file);
  };

  const getPopupData = () => {
    if (activePopup === "services") {
      return { columns: ["serviceName"], data: services };
    } else if (activePopup === "floors") {
      return { columns: ["floorNumber"], data: floors };
    } else if (activePopup === "locations") {
      return {
        columns: ["id", "locationName"],
        data: locations,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "services") {
      setSelectedServices(data);

      setTestDetails((prevRows) =>
        prevRows.map((row, index) =>
          row.sn === selectedRowId
            ? {
                ...row,
                testName: data.serviceName,
                serviceDetailsId: data.serviceDetailsId,
                sn: index + 1,
              }
            : row
        )
      );
    }
    if (activePopup === "floors") {
      setSelectedFloors(data);

      setFloorDetails((prevRows) =>
        prevRows.map((row, index) =>
          row.sn === selectedFloorRowId
            ? {
                ...row,
                floorNumber: data.floorNumber,
                id: data.id,
                sn: index + 1,
              }
            : row
        )
      );
    } else if (activePopup === "locations") {
      setSelectedLocations(data);

      setLocationDetails((prevRows) =>
        prevRows.map((row, index) =>
          row.sn === selectedLocationRowId
            ? {
                ...row,
                locationName: data.locationName,
                id: data.id,
                sn: index + 1,
              }
            : row
        )
      );
    }

    setActivePopup(null);
  };

  const handleAddRow = (setter) => {
    setter((prev) => [
      ...prev,
      {
        sn: prev.length + 1,
        testName: "",
      },
    ]);
  };
  const handleDeleteRow = (rowId) => {
    if (testDetails.length === 1) {
      return;
    }
    setTestDetails((prevDetails) => {
      const filteredRows = prevDetails.filter((row) => row.sn !== rowId);
      return filteredRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
    });
  };

  const handleLocationAddRow = () => {
    setLocationDetails((prev) => [
      ...prev,
      {
        sn: prev.length + 1,
        locationName: "",
      },
    ]);
  };
  const handleLocationDeleteRow = (rowId) => {
    if (locationDetails.length === 1) {
      return; // Prevent deleting the last row
    }
    setLocationDetails((prevDetails) => {
      const filteredRows = prevDetails.filter((row) => row.sn !== rowId);
      return filteredRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
    });
  };

  const handleFloorAddRow = () => {
    setFloorDetails((prev) => [
      ...prev,
      {
        sn: prev.length + 1,
        floorNumber: "",
      },
    ]);
  };

  const handleFloorDeleteRow = (rowId) => {
    if (floorDetails.length === 1) {
      return; // Prevent deleting the last row
    }
    setFloorDetails((prevDetails) => {
      const filteredRows = prevDetails.filter((row) => row.sn !== rowId);
      return filteredRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty floor details
    const validFloorDetails = floorDetails.filter(
      (floor) => floor.floorNumber && String(floor.floorNumber).trim() !== ""
    );

    // Filter out empty location details
    const validLocationDetails = locationDetails.filter(
      (location) =>
        location.locationName && String(location.locationName).trim() !== ""
    );

    // Filter out empty test details (services)
    const validTestDetails = testDetails.filter(
      (test) => test.testName && String(test.testName).trim() !== ""
    );

    const updatedEmployeeData = {
      ...employeeData,
      department: {
        departmentId: selectedDepartment, // Add selected department ID
      },
      employeeRole: {
        employeeRoleId: selectedEmployeeRole, // Add selected employee role ID
      },
      employeeType: {
        employeeTypeId: selectedEmployeeType, // Add selected employee type ID
      },
      floors: validFloorDetails.map((floor) => ({
        id: floor.id,
      })),
      serviceDetails: validTestDetails.map((service) => ({
        serviceDetailsId: service.serviceDetailsId,
      })),
      locationMasters: validLocationDetails.map((location) => ({
        id: location.id,
      })),
    };
    console.log("post data", updatedEmployeeData);

    try {
      const formData = new FormData();

      formData.append(
        "employee",
        new Blob([JSON.stringify(updatedEmployeeData)], {
          type: "application/json",
        })
      );

      if (employeeData.employeeSignature) {
        formData.append(
          "employeeSignatureFile",
          employeeData.employeeSignature
        );
      }

      console.log(updatedEmployeeData);

      const response = await axios.post(
        `${API_BASE_URL}/employees/save-employee-detail`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Employee added successfully");
      setEmployeeData({
        salutation: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        emailId: "",
        signatureShort: "",
        signatureLong: "",
        department: "", // Reset department selection
        role: "", // Reset role selection
        type: "", // Reset type selection
        dateOfJoining: "",
        contactAddress: "",
        kraPin: "",
        isIncentiveApplicable: false,
        extension: "",
        speedDial: "",
        officeHour: "",
        bloodGroup: "",
        drivingLicenseNo: "",
        isActive: false,
        displaySequence: "",
        employeeSignature: null,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="add-employee-modal-overlay">
      <div className="add-employee-form">
        <form onSubmit={handleSubmit}>
          <div className="add-employee-form-header">
            <h2>Add Employee</h2>
          </div>

          <div className="add-employee-grid">
            <div className="add-employee-group">
              <FloatingSelect
                label={"Salutation"}
                name="salutation"
                value={employeeData.salutation}
                onChange={handleChange}
                options={[
                  { value: "Mr", label: "Mr" },
                  { value: "Ms", label: "Ms" },
                  { value: "Mrs", label: "Mrs" },
                  { value: "Dr", label: "Dr" },
                ]}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"First Name"}
                type="text"
                name="firstName"
                value={employeeData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"Middle Name"}
                type="text"
                name="middleName"
                value={employeeData.middleName}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"Last Name"}
                type="text"
                name="lastName"
                value={employeeData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"DOB"}
                type="date"
                name="dateOfBirth"
                value={employeeData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-employee-group">
              <FloatingSelect
                label={"Gender"}
                name="gender"
                value={employeeData.gender}
                onChange={handleChange}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
                required
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"Contact Number"}
                type="text"
                name="contactNumber"
                value={employeeData.contactNumber}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"Email Id"}
                type="email"
                name="emailId"
                value={employeeData.emailId}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingTextarea
                label={"Signature(Short)"}
                name="signatureShort"
                value={employeeData.signatureShort}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingTextarea
                label={"Signature(Long)"}
                name="signatureLong"
                value={employeeData.signatureLong}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingTextarea
                label={"Office Hour"}
                name="officeHour"
                value={employeeData.officeHour}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingTextarea
                label={"Contact Address"}
                name="contactAddress"
                value={employeeData.contactAddress}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"PIN Code"}
                type="text"
                name="kraPin"
                value={employeeData.kraPin}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingSelect
                label={"Employee Role"}
                id="employeeRole"
                name="employeeRole"
                value={selectedEmployeeRole}
                onChange={handleRoleChange}
                options={[
                  ...employeeRoles.map((role) => ({
                    value: role.employeeRoleId,
                    label: role.role,
                  })),
                ]}
              />
            </div>
            <div className="add-employee-group">
              <FloatingSelect
                label={"Employee Type"}
                id="employeeType"
                name="employeeType"
                value={selectedEmployeeType}
                onChange={handleTypeChange}
                options={[
                  ...employeeTypes.map((type) => ({
                    value: type.employeeTypeId,
                    label: type.employeeType,
                  })),
                ]}
              />
            </div>
            <div className="add-employee-group">
              <FloatingSelect
                label={"Department"}
                id="department"
                name="department"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                options={[
                  ...departments.map((dept) => ({
                    value: dept.departmentId,
                    label: dept.departmentName,
                  })),
                  { value: "other", label: "Other (Specify)" }, // Adding "Other" option
                ]}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"Date Of Joining"}
                type="date"
                name="dateOfJoining"
                value={employeeData.dateOfJoining}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"SpeedDial"}
                type="text"
                name="speedDial"
                value={employeeData.speedDial}
                onChange={handleChange}
              />
            </div>

            <div className="add-employee-group">
              <FloatingSelect
                label={"Blood Group"}
                name="bloodGroup"
                value={employeeData.bloodGroup}
                onChange={handleChange}
                options={[
                  { value: "A+", label: "A+" },
                  { value: "O+", label: "O+" },
                  { value: "B+", label: "B+" },
                  { value: "AB+", label: "AB+" },
                  { value: "A-", label: "A-" },
                  { value: "O-", label: "O-" },
                  { value: "B-", label: "B-" },
                  { value: "AB-", label: "AB-" },
                ]}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"Driving License No"}
                type="text"
                name="drivingLicenseNo"
                value={employeeData.drivingLicenseNo}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <label className="emp-input">Is Active:</label>
              <input
                className="emp-input"
                type="checkbox"
                name="isActive"
                checked={employeeData.isActive}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <FloatingInput
                label={"Display Sequence"}
                type="text"
                name="displaySequence"
                value={employeeData.displaySequence}
                onChange={handleChange}
              />
            </div>
            <div className="add-employee-group">
              <input
                type="file"
                id="employeeSignature"
                name="employeeSignature"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="employee-EditAndDelete-section">
            <div className="employee-EditAndDelete-header">Locations</div>
            <table className="employee-table" ref={locationDetailsTableRef}>
              <thead>
                <tr>
                  {["SN", "Location", "Add/Del Row"].map((header, index) => (
                    <th
                      key={index}
                      style={{ width: locationDetailsColumnWidths[index] }}
                      className="resizable-th"
                    >
                      <div className="header-content">
                        <span>{header}</span>
                        <div
                          className="resizer"
                          onMouseDown={startResizing(
                            locationDetailsTableRef,
                            locationDetailsColumnWidths
                          )(index)}
                        ></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {locationDetails.map((row) => (
                  <tr key={row.sn}>
                    <td>{row.sn}</td>
                    <td>
                      <div className="employee-input-with-icon">
                        <input
                          type="text"
                          value={row.locationName}
                          onChange={(e) =>
                            updateRowValue(
                              setLocationDetails,
                              row.sn,
                              "locationName",
                              e.target.value
                            )
                          }
                          placeholder="Location Name"
                          className="table-input-employee"
                        />
                        <FaSearch
                          className="employee-search-icon"
                          onClick={() => {
                            setSelectedLocationRowId(row.sn); // Set the selected row ID
                            setActivePopup("locations"); // Open the services popup
                          }}
                        />
                      </div>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="employee-add-btn"
                        onClick={() => handleLocationAddRow(setLocationDetails)}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        className="employee-del-btn"
                        onClick={() => handleLocationDeleteRow(row.sn)}
                      >
                        Del
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedRoleName === "Nurse" && (
            <div className="employee-EditAndDelete-section">
              <div className="employee-EditAndDelete-header">Floors</div>
              <table className="employee-table" ref={floorDetailsTableRef}>
                <thead>
                  <tr>
                    {["SN", "Floor Number", "Add/Del Row"].map(
                      (header, index) => (
                        <th
                          key={index}
                          style={{ width: floorDetailsColumnWidths[index] }}
                          className="resizable-th"
                        >
                          <div className="header-content">
                            <span>{header}</span>
                            <div
                              className="resizer"
                              onMouseDown={startResizing(
                                floorDetailsTableRef,
                                floorDetailsColumnWidths
                              )(index)}
                            ></div>
                          </div>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {floorDetails.map((row) => (
                    <tr key={row.sn}>
                      <td>{row.sn}</td>
                      <td>
                        <div className="employee-input-with-icon">
                          <input
                            type="text"
                            value={row.floorNumber}
                            onChange={(e) =>
                              updateRowValue(
                                setFloorDetails,
                                row.sn,
                                "floorNumber",
                                e.target.value
                              )
                            }
                            placeholder="Floor Number"
                            className="table-input-employee"
                          />
                          <FaSearch
                            className="employee-search-icon"
                            onClick={() => {
                              setSelectedFloorRowId(row.sn); // Set the selected row ID
                              setActivePopup("floors"); // Open the services popup
                            }}
                          />
                        </div>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="employee-add-btn"
                          onClick={() => handleFloorAddRow(setFloorDetails)}
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          className="employee-del-btn"
                          onClick={() => handleFloorDeleteRow(row.sn)}
                        >
                          Del
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {selectedRoleName === "Nurse" && (
            <div className="employee-EditAndDelete-section">
              <div className="employee-EditAndDelete-header">Services</div>
              <table className="employee-table" ref={testDetailsTableRef}>
                <thead>
                  <tr>
                    {["SN", "Service Name", "Add/Del Row"].map(
                      (header, index) => (
                        <th
                          key={index}
                          style={{ width: testDetailsColumnWidths[index] }}
                          className="resizable-th"
                        >
                          <div className="header-content">
                            <span>{header}</span>
                            <div
                              className="resizer"
                              onMouseDown={startResizing(
                                testDetailsTableRef,
                                setTestDetailsColumnWidths
                              )(index)}
                            ></div>
                          </div>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {testDetails.map((row) => (
                    <tr key={row.sn}>
                      <td>{row.sn}</td>
                      <td>
                        <div className="employee-input-with-icon">
                          <input
                            type="text"
                            value={row.testName}
                            onChange={(e) =>
                              updateRowValue(
                                setTestDetails,
                                row.sn,
                                "testName",
                                e.target.value
                              )
                            }
                            placeholder="Service Name"
                            className="table-input-employee"
                          />
                          <FaSearch
                            className="employee-search-icon"
                            onClick={() => {
                              setSelectedRowId(row.sn); // Set the selected row ID
                              setActivePopup("services"); // Open the services popup
                            }}
                          />
                        </div>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="employee-add-btn"
                          onClick={() => handleAddRow(setTestDetails)}
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          className="employee-del-btn"
                          onClick={() => handleDeleteRow(row.sn)}
                        >
                          Del
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activePopup && (
            <PopupTable
              columns={columns}
              data={data}
              onSelect={handleSelect}
              onClose={() => setActivePopup(false)}
            />
          )}
          <div className="emp-app">
            <div className="add-employee-buttons">
              <button type="submit" className="add-employee-button">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
