import React, { useRef, useEffect, useState } from "react";
import "./EquipmentGatePassOutPopUp.css";
import { Link } from "react-router-dom";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput,FloatingSelect } from "../../../../FloatingInputs";
import {toast}  from "react-toastify";


const EquipmentGatePassOutPopUp = ({ onClose }) => {

  const [partsData, setPartsData] = useState({
    modelNo: "",
    serialNo: "",
    standBy: "",

  });

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


  const [approvedBy, setApprovedBy] = useState([]);
  const [selectedApprover, setSelectedApprover] = useState("");

  useEffect(() => {
    const fetchApprovers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/doctors`); // Replace with your API URL
        const data = await response.json();
        setApprovedBy(data); // Assuming the API returns an array of category objects


      } catch (error) {
        console.error("Error fetching Approvers:", error);
      }
    };

    fetchApprovers();
  }, []);
  const handleAproverChange = (event) => {
    setSelectedApprover(event.target.value);
  };



  const [equipmentmasters, setEquipmentMasters] = useState([]);
  const [selectedEquipmentMaster, setSelectedEquipmentMaster] = useState("");

  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/parts`)
      .then((response) => response.json())
      .then((data) => {
        setParts(data); // Assuming data is an array of complaint objects


      })
      .catch((error) => console.error("Error fetching Parts:", error));
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/equipment-masters`)
      .then((response) => response.json())
      .then((data) => {
        setEquipmentMasters(data); // Assuming data is an array of complaint objects

      })
      .catch((error) => console.error("Error fetching equipment numbers:", error));
  }, []);

  const handleEquipmentChange = (event) => {
    const selectedEquipmentId = event.target.value;
    setSelectedEquipmentMaster(selectedEquipmentId);
  }

  const handlePartChange = async (event, rowIndex) => {
    const selectedPartId = event.target.value;
    const updatedRows = [...itemDetailsTableRows];

    // Update the selected part for this row
    updatedRows[rowIndex].selectedPart = selectedPartId;
    setItemDetailsTableRows(updatedRows);

    try {
      const response = await fetch(`${API_BASE_URL}/parts/${selectedPartId}`); // Replace with your API endpoint
      const partData = await response.json();

      if (response.ok) {
        // Update this row's data with fetched part information
        updatedRows[rowIndex].serialNo = partData.serialNo;
        updatedRows[rowIndex].modelNo = partData.modelNo;
        updatedRows[rowIndex].standBy = partData.standBy;

        // Set the updated rows
        setItemDetailsTableRows(updatedRows);
      } else {
        console.error("Error fetching part data:", partData.message);
      }
    } catch (error) {
      console.error("Error in fetching part data:", error);
    }
  };




  const [fromLocations, setFromLocations] = useState([]);
  const [selectedFromLocation, setSelectedFromLocation] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/location-masters`)
      .then((response) => response.json())
      .then((data) => {
        setFromLocations(data); // Assuming data is an array of complaint objects


      })
      .catch((error) => console.error("Error fetching Locations :", error));
  }, []);






  const [toLocations, setToLocations] = useState([]);
  const [selectedToLocation, setSelectedToLocation] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/location-masters`)
      .then((response) => response.json())
      .then((data) => {
        setToLocations(data); // Assuming data is an array of complaint objects


      })
      .catch((error) => console.error("Error fetching Locations :", error));
  }, []);

  const handleToLocationChange = (event) => {
    const selectedToLocationId = event.target.value;
    setSelectedToLocation(selectedToLocationId);

  };


  const [fromDepartments, setFromDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/departments/getAllDepartments`)
      .then((response) => response.json())
      .then((data) => {
        setFromDepartments(data); // Assuming data is an array of complaint objects


      })
      .catch((error) => console.error("Error fetching Parts:", error));
  }, []);
  const handleDepartmentChange = (event) => {
    const selectedDepartmentId = event.target.value;
    setSelectedDepartment(selectedDepartmentId);

  };


  const [toDepartments, setToDepartments] = useState([]);
  const [selectedToDepartment, setSelectedToDepartment] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/departments/getAllDepartments`)
      .then((response) => response.json())
      .then((data) => {
        setToDepartments(data); // Assuming data is an array of complaint objects



      })
      .catch((error) => console.error("Error fetching Parts:", error));
  }, []);

  const handleToDepartmentChange = (event) => {
    const selectedToDepartmentId = event.target.value;
    setSelectedToDepartment(selectedToDepartmentId); // Update selected value
  };

  const handleFromLocationChange = (event) => {
    const selectedFromLocationId = event.target.value;
    setSelectedFromLocation(selectedFromLocationId);

  };


  const [formData, setFormData] = useState({
    assetNo: "",
    recommendedBy: "",
    reason: "",
    modeOfTransport: "",
    type: "Returnable",
    remark: "",
    gatePassOutDate: "",
    gatePassOutTime: "",
    typeOfEquipment: "Parts",
    equipmentName: "",
    timePeriod: "",
    preparedBy: "",
    receivedBy: "",
    vendorDTO: {
      id: ""
    },

    fromLocationDTO: {
      id: ""
    },

    toLocationDTO: {
      id: ""
    },

    fromDepartmentDTO: {
      departmentId: ""
    },

    toDepartmentDTO: {
      departmentId: ""
    },

    equipmentMasterDTO: {
      equipmentMasterId: ""
    },

    approvalByDTO: {
      doctorId: ""
    },
    partsDTO: [
      {
        partId: ""
      }
    ]
  }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPart = () => {
    setFormData({
      ...formData,
      partsDTO: [...formData.partsDTO, { partId: "" }],
    });
  };

  // const handlePartAdd = (index, event) => {
  //   const newPartsDTO = [...formData.partsDTO];
  //   newPartsDTO[index].partId = event.target.value;
  //   setFormData({
  //     ...formData,
  //     partsDTO: newPartsDTO,
  //   });
  // };
 


  const [selectedTab, setSelectedTab] = useState("itemDetails");
  const [columnWidths, setColumnWidths] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const tableRef = useRef(null);



  // State for table rows (similar to previous implementation)
  const [itemDetailsTableRows, setItemDetailsTableRows] = useState([
    {
      sn: 1,
      partsName: "",
      serialNo: "",
      modelNo: "",
      standBy: "",
      selectedPart: ""  // Add this to track selected part for each row

    },
  ]);

  const [nonRegisterItemsTableRows, setNonRegisterItemsTableRows] = useState([
    {
      sn: 1,
      itemDetails: "",
      qty: "",
      description: "",
    },
  ]);

  const [approveDetailsTableRows, setApproveDetailsTableRows] = useState([
    {
      sn: 1,
      approvalBy: "",
      priority: "",
    },
  ]);


  const handleSave = async () => {

    const payload = {
      assetNo: formData.assetNo,
      recommendedBy: formData.recommendedBy,
      reason: formData.reason,
      modeOfTransport: formData.modeOfTransport,
      type: formData.type,
      remark: formData.remark,
      gatePassOutDate: formData.gatePassOutDate,
      gatePassOutTime: formData.gatePassOutTime,
      typeOfEquipment: formData.typeOfEquipment,
      timePeriod: formData.timePeriod,
      preparedBy: formData.preparedBy,
      receivedBy: formData.receivedBy,
      vendorDTO: {
        id: Number(selectedSupplier),
      },
      ...(selectedFromLocation && {
        fromLocationDTO: {
          id: Number(selectedFromLocation),
        },
      }),

      toLocationDTO: {
        id: Number(selectedToLocation),
      },
      ...(selectedDepartment && {
        fromDepartmentDTO: {
          departmentId: Number(selectedDepartment),
        },
      }),

      toDepartmentDTO: {
        departmentId: Number(selectedToDepartment),
      },
      ...(selectedEquipmentMaster && {
        equipmentMasterDTO: {
          equipmentMasterId: Number(selectedEquipmentMaster),
        },
      }),

      approvalByDTO: {
        doctorId: Number(selectedApprover),
      },
      partsDTO: itemDetailsTableRows.map((row) => ({
        partId: row.selectedPart, // Only the partId is included
      })),
    };



    try {
      const response = await fetch(`${API_BASE_URL}/gatePassOut`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Data submitted successfully!");
      } else {
        console.error("Error:", response.statusText);
        toast.error("Failed to submit data!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting data.");
    }
  };




  const handleAddRow = (tableType) => {
    switch (tableType) {
      case "itemDetails":
        setItemDetailsTableRows(prevRows => [
          ...prevRows,
          {
            sn: prevRows.length + 1,
            partName: "",
            serialNo: "",
            modelNo: "",
            standBy: "",
            selectedPart: "" // Initially empty
          }
        ]);
        break;

      // Handle other cases similarly
    }
  };



  const handleDeleteRow = (tableType, rowIndex) => {
    if (tableType === "itemDetails") {
      setItemDetailsTableRows((prevRows) =>
        prevRows.filter((_, index) => index !== rowIndex)
      );
    } else if (tableType === "nonRegisterItems") {
      setNonRegisterItemsTableRows((prevRows) =>
        prevRows.filter((_, index) => index !== rowIndex)
      );
    } else if (tableType === "approveDetails") {
      setApproveDetailsTableRows((prevRows) =>
        prevRows.filter((_, index) => index !== rowIndex)
      );
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadMessage("");
    }
  };
  // Rest of the methods remain the same as in the previous implementation
  // (handleAddRow, handleDeleteRow, renderTable, etc.)
  // ... (keep all the previous implementation methods)
  const handleUpload = () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file before uploading.");
      return;
    }
    setTimeout(() => {
      setUploadMessage(`File "${selectedFile.name}" uploaded successfully!`);
      setSelectedFile(null);
    }, 1000);
  };
  const renderTable = () => {
    switch (selectedTab) {
      case "itemDetails":
        return (
          <div className="table-container">
            {/* <div className="EquipmentGetPassOut-itemDetails-table"> */}
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "",
                    "SN",
                    "Parts Name",
                    "Serial No",
                    "Model No",
                    "StandBy",
                  ].map((header, index) => (
                    <th
                      key={index}
                      style={{ width: columnWidths[index] }}
                      className="resizable-th"
                    >
                      <div className="header-content">
                        <span>{header}</span>
                        <div
                          className="resizer"
                          onMouseDown={startResizing(
                            tableRef,
                            setColumnWidths
                          )(index)}
                        ></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {itemDetailsTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="EquipmentGatePassOutPopUp-add-row-btn"
                          onClick={() => handleAddRow("itemDetails")}
                        >
                          Add
                        </button>
                        <button
                          className="EquipmentGatePassOutPopUp-del-row-btn"
                          onClick={() => handleDeleteRow("itemDetails", index)}
                          disabled={itemDetailsTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>
                    <FloatingSelect
  label={"Select Part"}
  value={row.selectedPart}
  onChange={(e) => handlePartChange(e, index)}
  options={[
    { value: "", label: "Select Part", disabled: true },
    ...parts.map((part) => ({
      value: part.partId,
      label: part.partName
    }))
  ]}
/>
                    </td>
                    <td>
                      <FloatingInput
                      label={"Serial No"}
                      type="text"
                        value={row.serialNo || ""}
                        readOnly/>
                     
                    </td>
                    <td>
                      <FloatingInput
                      label={"Model No"}
                      type="text"
                        value={row.modelNo || ""}
                        readOnly/>
                    </td>
                    <td>
                      <FloatingInput
                      label={"Stand By"}
                      type="text"
                        value={row.standBy || ""}
                        readOnly/>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        );
      case "nonRegisterItems":
        return (
          <div className="EquipmentGetPassOut-nonRegisterItems-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {["SN", "Item Details", "Qty", "Description"].map(
                    (header, index) => (
                      <th
                        key={index}
                        style={{ width: columnWidths[index] }}
                        className="resizable-th"
                      >
                        <div className="header-content">
                          <span>{header}</span>
                          <div
                            className="resizer"
                            onMouseDown={(e) =>
                              startResizing(tableRef, setColumnWidths)(index, e)
                            } // Pass event to the handler
                          ></div>
                        </div>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {nonRegisterItemsTableRows.map((row, index) => (
                  <tr key={index}>
                    {/* <td>
                      <div className="table-actions">
                        <button
                          className="EquipmentGatePassOutPopUp-add-row-btn"
                          onClick={() => handleAddRow("nonRegisterItems")}
                        >
                          Add
                        </button>
                        <button
                          className="EquipmentGatePassOutPopUp-del-row-btn"
                          onClick={() =>
                            handleDeleteRow("nonRegisterItems", index)
                          }
                          disabled={nonRegisterItemsTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td> */}
                    <td>{row.sn}</td>
                    <td>{row.itemDetails}
                    <FloatingInput type="text" value=""/>
                    </td>
                    <td>{row.qty}
                      <div className="EquipmentGetPassOut-input-with-search">
                        <FloatingInput type="text" value=""/>
                        
                      </div>
                    </td>
                    <td>{row.description}
                    <FloatingInput type="text" value=""/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "approveDetails":
        return (
          <div className="EquipmentGetPassOut-approveDetails-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {["SN", "Approval By", "Priority"].map(
                    (header, index) => (
                      <th
                        key={index}
                        style={{ width: columnWidths[index] }}
                        className="resizable-th"
                      >
                        <div className="header-content">
                          <span>{header}</span>
                          <div
                            className="resizer"
                            onMouseDown={startResizing(
                              tableRef,
                              setColumnWidths
                            )(index)}
                          ></div>
                        </div>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {approveDetailsTableRows.map((row, index) => (
                  <tr key={index}>
                    {/* <td>
                      <div className="table-actions">
                        <button
                          className="EquipmentGatePassOutPopUp-add-row-btn"
                          onClick={() => handleAddRow("approveDetails")}
                        >
                          Add
                        </button>
                        <button
                          className="EquipmentGatePassOutPopUp-del-row-btn"
                          onClick={() =>
                            handleDeleteRow("approveDetails", index)
                          }
                          disabled={approveDetailsTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td> */}
                    <td>{row.sn}</td>
                    <td>
                    <FloatingSelect
  label={"Approve By"}
  value={selectedApprover}
  onChange={(e) => handleAproverChange(e, index)}
  options={[
    { value: "", label: "Select Approver", disabled: true },
    ...approvedBy.map((approver) => ({
      value: approver.doctorId,
      label: approver.doctorName
    }))
  ]}
/>

                    </td>
                    <td>{row.priority}
                      <div className="EquipmentGetPassOut-input-with-search">
                      <FloatingInput type="text" value=""/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };
  // ===================================================================
  const [aformData, asetFormData] = useState({
    transferNo: "",
    equipmentName: "",
    assetNo: "",
    serialNo: "",
    location: "",
    personInCharge: "",
    transferDate: "",
    transferTime: "",
    handedBy: "",
    receivedBy: "",
    locationReceived: "",
    remarks: "",
    fileName: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };


  return (
    <div
      className="EquipmentGatePassOutPopUp-container"
    >
      <div className="EquipmentGatePassOutPopUp-header">
        <h4>Equipment Get Pass Out</h4>
        {/* <button className="EquipmentGatePassOutPopUp-close-btn" onClick={onClose}>
          X
        </button> */}
      </div>
      <div className="EquipmentGatePassOutPopUp-form">
        <div className="EquipmentGatePassOutPopUp-form-row">

          <h4>Equipment Out Details</h4>

          <div className="EquipmentGatePassOutPopUp-form-group-1row">
            <div className="EquipmentGatePassOutPopUp-form-group">
            <FloatingSelect
  label={"Supplier Name"}
  value={selectedSupplier}
  onChange={handleSupplierChange}
  options={[
    { value: "", label: "Select Supplier" },
    ...suppliers.map((supplier) => ({
      value: supplier.id,
      label: supplier.vendorName
    }))
  ]}
/>

            </div>
            <div className="EquipmentGatePassOutPopUp-form-group">
              <FloatingInput
              label={"Asset No"}
              type="text"
                name="assetNo"
                onChange={handleInputChange}
              />
              
            </div>
            <div className="EquipmentGatePassOutPopUp-form-group">
              <FloatingInput
              label={"Recommended By"}
              type="text"
                name="recommendedBy"
                onChange={handleInputChange}/>
            </div>
          </div>
          <div className="EquipmentGatePassOutPopUp-form-group-1row">
            <div className="EquipmentGatePassOutPopUp-form-group">
              <FloatingInput
              label={"Reason"}
              type="text"
                name="reason"
                onChange={handleInputChange}/>
              
            </div>
            <div className="EquipmentGatePassOutPopUp-form-group">
              <FloatingInput
              label={"Mode Of Transport"}
              type="text"
                name="modeOfTransport"
                onChange={handleInputChange}/>
              
            </div>
            <div className="EquipmentGatePassOutPopUp-form-group">
              <FloatingSelect
              label={"Type"}
              name="type"
                onChange={handleInputChange}
                options={[
                  {value:"Returnable",label:"Returnable"},
                  {value:"Not-Returnable",label:"Not-Returnable"},
                  {value:"Internal",label:"Internal"},
                  {value:"Home Care",label:"Home Care"},
                ]}/>
              
            </div>
          </div>

          <div className="EquipmentGatePassOutPopUp-form-group-1row">
            {formData.type === "Internal" && (
              <>
                <div className="EquipmentGatePassOutPopUp-form-group">
                <FloatingSelect
  label={"Location Name"}
  value={selectedFromLocation}
  onChange={handleFromLocationChange}
  options={[
    { value: "", label: "Select Location", disabled: true },
    ...fromLocations.map((fromLocation) => ({
      value: fromLocation.id,
      label: fromLocation.locationName
    }))
  ]}
/>

                </div>
                <div className="EquipmentGatePassOutPopUp-form-group">
                <FloatingSelect
  label={"From Department"}
  value={selectedDepartment}
  onChange={handleDepartmentChange}
  options={[
    { value: "", label: "Select Department", disabled: true },
    ...fromDepartments.map((department) => ({
      value: department.departmentId,
      label: department.departmentName
    }))
  ]}
/>

                </div>
              </>
            )}
            <div className="EquipmentGatePassOutPopUp-form-group">
              <FloatingSelect
              label={"Type Of Equipment"}
              name="typeOfEquipment"
                value={formData.typeOfEquipment}
                onChange={handleInputChange}
                options={[
                  {value:"Parts",label:"Parts"},
                  {value:"Equipments",label:"Equipments"},
                  {value:"Stock Item",label:"Stock Item"},
                ]}/>
              

            </div>
          </div>

          <div className="EquipmentGatePassOutPopUp-form-group-1row">
            <div className="EquipmentGatePassOutPopUp-form-group">
              <FloatingInput
              label={"Gate Pass out Date "}
              type="date"
                name="gatePassOutDate"
                onChange={handleInputChange}/>
            </div>
            <div className="EquipmentGatePassOutPopUp-form-group">
              <FloatingInput
              label={"Gate pass out Time"}
               type="time"
                name="gatePassOutTime"
                value={formData.gatePassOutTime}
                onChange={handleInputChange}/>
              
            </div>
            {formData.typeOfEquipment === "Parts" && (
              <>
                <div className="EquipmentGatePassOutPopUp-form-group">
                <FloatingSelect
  label={"Equipment"}
  value={selectedEquipmentMaster}
  onChange={handleEquipmentChange}
  options={[
    { value: "", label: "Select Equipment", disabled: true },
    ...equipmentmasters.map((equipment) => ({
      value: equipment.equipmentMasterId,
      label: equipment.equipmentName
    }))
  ]}
/>

                </div>
              </>
            )}
            {formData.typeOfEquipment !== "Parts" && (
              <>
                <div className="EquipmentGatePassOutPopUp-form-group">

                </div>
              </>
            )}
          </div>
          <div className="EquipmentGatePassOutPopUp-form-group-1row">
            <div className="EquipmentGatePassOutPopUp-form-group">
              <FloatingInput
              label={"Location"}
              type="text"
                name="location"
                onChange={handleInputChange}/>
             
            </div>


            <div className="EquipmentGatePassOutPopUp-form-group">
            <FloatingSelect
  label={"To Location"}
  value={selectedToLocation}
  onChange={handleToLocationChange}
  options={[
    { value: "", label: "Select To Location", disabled: true },
    ...toLocations.map((location) => ({
      value: location.id,
      label: location.locationName
    }))
  ]}
/>

            </div>
            {formData.typeOfEquipment === "Parts" && (
              <>
                <div className="EquipmentGatePassOutPopUp-form-group">
                  <FloatingInput
                  label={"Resp. Department"}
                  type="text"
                    name="respDepartment"
                    onChange={handleInputChange}/>
                </div>
              </>
            )}

            {formData.typeOfEquipment !== "Parts" && (
              <>
                <div className="EquipmentGatePassOutPopUp-form-group">

                </div>
              </>
            )}
          </div>
          <div className="EquipmentGatePassOutPopUp-form-group-1row">
            <div className="EquipmentGatePassOutPopUp-form-group">
            <FloatingSelect
  label={"To Department"}
  value={selectedToDepartment}
  onChange={handleToDepartmentChange}
  options={[
    { value: "", label: "Select To Department", disabled: true },
    ...toDepartments.map((department) => ({
      value: department.departmentId,
      label: department.departmentName
    }))
  ]}
/>
 
            </div>

            <div className="EquipmentGatePassOutPopUp-form-group">
              <FloatingInput
              label={"Time Period"}
               type="text"
                name="timePeriod"
                value={formData.timePeriod}
                onChange={handleInputChange}/>
             
            </div>
            <div className="EquipmentGatePassOutPopUp-form-group">
              <FloatingInput
              label={"Prepared By"}
              type="text"
                name="preparedBy"
                value={formData.preparedBy}
                onChange={handleInputChange}/>

            </div>
          </div>
          <div className="EquipmentGatePassOutPopUp-form-group-1row">
            <div className="EquipmentGatePassOutPopUp-form-group">
              <FloatingInput
              label={"Received By"}
              type="text"
              name="receivedBy"
              value={formData.receivedBy}
              onChange={handleInputChange}/>
            
            </div>
            <div className="EquipmentGatePassOutPopUp-form-group">
              <FloatingInput
              label={"Authorised By"}
              type="text"
                name="authorisedBy"
                value={formData.authorisedBy}
                onChange={handleInputChange}/>
            </div>
            <div className="EquipmentGatePassOutPopUp-form-group">
              <FloatingInput
              label={"Remark"}
              type="text"
                name="remark"
                value={formData.remark}
                onChange={handleInputChange}/>
              
            </div>
          </div>
          <div className="EquipmentGetPassOut-approveDetails-section">
            <div className="EquipmentGetPassOut-tab-bar">
              <button
                className={`EquipmentGetPassOut-tab ${selectedTab === "itemDetails" ? "active" : ""
                  }`}
                onClick={() => setSelectedTab("itemDetails")}
              >
                Item Details
              </button>
              <button
                className={`EquipmentGetPassOut-tab ${selectedTab === "nonRegisterItems" ? "active" : ""
                  }`}
                onClick={() => setSelectedTab("nonRegisterItems")}
              >
                Non Register Items
              </button>
              <button
                className={`EquipmentGetPassOut-tab ${selectedTab === "approveDetails" ? "active" : ""
                  }`}
                onClick={() => setSelectedTab("approveDetails")}
              >
                Approve Details
              </button>
            </div>
            <div className="EquipmentGetPassOut-tablesize">

              {renderTable()}
            </div>
          </div>
        </div>
      </div>




      <div className="EquipmentGatePassOutPopUp-form-actions">
        <button
          className="EquipmentGatePassOutPopUp-add-btn"
          onClick={handleSave}
        >
          Add
        </button>
        <button className="EquipmentGatePassOutPopUp-close-btn" onClick={onClose}>Close</button>
      </div>

    </div>
  );
};

export default EquipmentGatePassOutPopUp;


