import React, { useRef, useEffect, useState } from "react";
import "./BreakDownDetailsPopUp.css";
// import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
// import { FaSearch } from "react-icons/fa"; // Using react-icons
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput, FloatingSelect } from '../../../../FloatingInputs';
import {toast}  from "react-toastify";

const BreakDownDetailsPopUp = ({ onClose }) => {
  const [complaintNumbers, setComplaintNumbers] = useState([]);
  const [selectedComplaintNumber, setSelectedComplaintNumber] = useState("");

  const [equipmentmasters, setEquipmentMasters] = useState([]);
  const [selectedEquipmentMaster, setSelectedEquipmentMaster] = useState("");

  const [subject, setSubject] = useState(""); // New state for the subject

  const [selectedTab, setSelectedTab] = useState("repairbleParts");
  const [columnWidths, setColumnWidths] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const tableRef = useRef(null);

  const [equipmentData, setEquipmentData] = useState({
    equipmentMasterId: "",
    assetNo: "",
    manualCode: "",
    location: "",
    category: "",
    depreciation: "",
    serialNo: "",
    modelNo: "",
    responsiblePerson: "",
    companyBrand: "",


    supplierName: "",
    supplierAddress: "",
    contactPerson: "",
    contactNumber: "",
    supplierEmail: "",


  });
  const [formData, setFormData] = useState({
    breakdownDate: "",
    breakdownTime: "",
    breakdownDetails: "",
    partsReplaced: "",
    companyName: "",
    invoiceNo: "",
    dateOfInvoice: "",
    complaintStatus: "",
    workCompletionDate: "",
    workCompletionTime: "",
    remark: "",
    complaintDTO: {
      complaintId: "",
    },
    repairableParts: [{ partName: "", consumedTime: "", repairDate: "", repairCost: "" }],
    guaranteedParts: [{ partName: "", guaranteePeriod: "", cost: "" }],
    replaceItems: [{ itemName: "", qty: "" }],
  });



  useEffect(() => {
    if (selectedComplaintNumber) {
      fetch(`${API_BASE_URL}/equipment-complaints/${selectedComplaintNumber}`)
        .then((response) => response.json())
        .then((data) => {
          setSubject(data.complaintSubject || ""); // Handle subject field gracefully
        })
        .catch((error) => {
          console.error("Error fetching subject:", error);
          setSubject(""); // Reset subject on error
        });
    } else {
      setSubject(""); // Reset subject if no complaint is selected
    }
  }, [selectedComplaintNumber]);


  useEffect(() => {
    fetch(`${API_BASE_URL}/equipment-complaints`)
      .then((response) => response.json())
      .then((data) => {
        setComplaintNumbers(data); // Assuming data is an array of complaint objects

      })
      .catch((error) => console.error("Error fetching complaint numbers:", error));
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/equipment-masters`)
      .then((response) => response.json())
      .then((data) => {
        setEquipmentMasters(data); // Assuming data is an array of complaint objects

      })
      .catch((error) => console.error("Error fetching equipment numbers:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (e, index, field, key) => {
    const updatedArray = [...formData[key]];
    updatedArray[index][field] = e.target.value;
    setFormData({ ...formData, [key]: updatedArray });
  };


  const handleEquipmentChange = (event) => {
    const selectedEquipmentId = event.target.value;
    setSelectedEquipmentMaster(selectedEquipmentId);

    // Fetch the details of the selected equipment
    fetch(`${API_BASE_URL}/equipment-masters/${selectedEquipmentId}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the equipmentData state with the fetched details
        setEquipmentData({
          equipmentNo: data.equipmentNo || "",
          assetNo: data.assetNo || "",
          manualCode: data.manualCode || "",
          location: data.assetLocationMaster?.subLocation || "",
          category: data.assetCateMasterDTO?.underCategory || "",
          depreciation: data.assetCateMasterDTO?.depreciation || "",
          serialNo: data.serialNo || "",
          modelNo: data.modelNo || "",
          responsiblePerson: data.employee?.firstName || "",
          companyBrand: data.companyBrand || "",


          supplierName: data.vendor?.vendorName || "",
          supplierAddress: data.vendor?.contactAddress || "",
          contactPerson: data.vendor?.contactPerson || "",
          contactNumber: data.vendor?.contactNumber || "",
          supplierEmail: data.vendor?.email || "",


        });
      })
      .catch((error) => console.error("Error fetching equipment details:", error));
  };


  const handleComplaintNumberChange = (event) => {
    const selectedComplaintId = event.target.value;
    setSelectedComplaintNumber(selectedComplaintId);

    // Update formData with the selected complaint ID
    setFormData((prevFormData) => ({
      ...prevFormData,
      complaintDTO: {
        ...prevFormData.complaintDTO,
        complaintId: Number(selectedComplaintId),
      },
    }));
  };




  // Function to add a row to the appropriate table
  const handleAddRow = (tableType) => {
    const updatedFormData = { ...formData };
    if (tableType === "repairbleParts") {
      updatedFormData.repairableParts.push({
        sn: updatedFormData.repairableParts.length + 1,
        repairDate: "",
        partName: "",
        consumedTime: "",
        repairCost: "",
      });
    } else if (tableType === "guaranteedParts") {
      updatedFormData.guaranteedParts.push({
        sn: updatedFormData.guaranteedParts.length + 1,
        partName: "",
        guaranteePeriod: "",
        cost: "",
      });
    } else if (tableType === "history") {
      updatedFormData.replaceItems.push({
        sn: updatedFormData.replaceItems.length + 1,
        itemName: "",
        qty: "",
      });
    }
    setFormData(updatedFormData);
  };


  const handleSubmit = async () => {
    const formDataWithoutSn = JSON.parse(JSON.stringify(formData)); 
    formDataWithoutSn.repairableParts = formDataWithoutSn.repairableParts.map(({ sn, ...rest }) => rest);
    formDataWithoutSn.guaranteedParts = formDataWithoutSn.guaranteedParts.map(({ sn, ...rest }) => rest);
    formDataWithoutSn.replaceItems = formDataWithoutSn.replaceItems.map(({ sn, ...rest }) => rest);
    try {
      const response = await fetch(`${API_BASE_URL}/breakdowns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit breakdown details");
      }
      toast.success("Breakdown details submitted successfully!");
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };
  const handleDeleteRow = (tableType, indexToRemove) => {
    const updatedFormData = { ...formData };
    if (tableType === "repairbleParts") {
      updatedFormData.repairableParts.splice(indexToRemove, 1);
      updatedFormData.repairableParts = updatedFormData.repairableParts.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
    } else if (tableType === "guaranteedParts") {
      updatedFormData.guaranteedParts.splice(indexToRemove, 1);
      updatedFormData.guaranteedParts = updatedFormData.guaranteedParts.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
    } else if (tableType === "history") {
      updatedFormData.replaceItems.splice(indexToRemove, 1);
      updatedFormData.replaceItems = updatedFormData.replaceItems.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
    }
    setFormData(updatedFormData);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadMessage("");
    }
  };


  const handleUpload = () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file before uploading.");
      return;
    }

    setTimeout(() => {
      setUploadMessage(`File "${selectedFile.name}" uploaded successfully!`);
      setSelectedFile(null); // Clear selected file after upload
    }, 1000); // Simulate upload delay
  };

  const renderTable = () => {
    switch (selectedTab) {
      case "repairbleParts":
        return (
          <div className="BreakDownDetailsPopUp-repairbleParts-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "",
                    "SN",
                    "Date",
                    "Parts Name",
                    "Consumed Time",
                    "Repaire Cost",
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
                {formData.repairableParts.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="BreakDownDetailsPopUp-add-btn"
                          onClick={() => handleAddRow("repairbleParts")}
                        >
                          Add
                        </button>
                        <button
                          className="BreakDownDetailsPopUp-del-btn"
                          onClick={() =>
                            handleDeleteRow("repairbleParts", index)
                          }
                          disabled={formData.repairableParts.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{index + 1}</td>
                    <td>
                      <FloatingInput
                      label={"Date"}
                         type="date"
                        value={row.repairDate}
                        onChange={(e) => handleNestedChange(e, index, "repairDate", "repairableParts")}
                      />
                    
                    </td>
                    <td>
                      <FloatingInput
                      label={"Part Name"}
                      type="text"
                      value={row.partName}
                      onChange={(e) => handleNestedChange(e, index, "partName", "repairableParts")}
                      />
                      
                    </td>
                    <td>
                      <FloatingInput
                      label={"Consumed Time"}
                      type="text"
                      value={row.consumedTime}
                      onChange={(e) => handleNestedChange(e, index, "consumedTime", "repairableParts")}
                    />
                     
                     
                    </td>

                    <td>
                      <FloatingInput
                      label={"Repair Cost"}
                      type="number"
                        value={row.repairCost}
                        onChange={(e) => handleNestedChange(e, index, "repairCost", "repairableParts")}/>
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "guaranteedParts":
        return (
          <div className="BreakDownDetailsPopUp-guaranteedParts-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "",
                    "SN",
                    "Parts Name",
                    "Gurantee Period",
                    "Cost",
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
                          onMouseDown={(e) =>
                            startResizing(tableRef, setColumnWidths)(index, e)
                          } // Pass event to the handler
                        ></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formData.guaranteedParts.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="BreakDownDetailsPopUp-add-btn"
                          onClick={() => handleAddRow("guaranteedParts")}
                        >
                          Add
                        </button>
                        <button
                          className="BreakDownDetailsPopUp-del-btn"
                          onClick={() =>
                            handleDeleteRow("guaranteedParts", index)
                          }
                          disabled={formData.guaranteedParts.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{index + 1}</td>
                    {/* {row.date} */}
                    <td>
                      <FloatingInput
                      label={"Part Name"}
                      type="text"
                      value={row.partName}
                      onChange={(e) => handleNestedChange(e, index, "partName", "guaranteedParts")}/>
                    </td>                   
                    <td>
                      <FloatingInput
                      label={"Guarantee Period"}
                      type="text"
                      value={row.guaranteePeriod}
                      onChange={(e) => handleNestedChange(e, index, "guaranteePeriod", "guaranteedParts")}/>
                     
                    </td>                    {/* {row.guranteedPeriod} */}
                    <td>
                      <FloatingInput
                      label={"Cost"}
                      type="number"
                        value={row.cost}
                        onChange={(e) => handleNestedChange(e, index, "cost", "guaranteedParts")}/>
                    </td>                    {/* {row.cost} */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "history":
        return (
          <div className="BreakDownDetailsPopUp-history-table">
            <table border={1} ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "",
                    "SN",
                    "Item Name",
                    "Qty"

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
                {formData.replaceItems.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="BreakDownDetailsPopUp-add-btn"
                          onClick={() => handleAddRow("history")}
                        >
                          Add
                        </button>
                        <button
                          className="BreakDownDetailsPopUp-del-btn"
                          onClick={() => handleDeleteRow("history", index)}
                          disabled={formData.replaceItems.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{index + 1}</td>
                    <td>
                      <FloatingInput
                      label={"Item Name"}
                       type="text"
                        value={row.itemName}
                        onChange={(e) => handleNestedChange(e, index, "itemName", "replaceItems")}/>
                    
                    </td>
                    <td>
                      <FloatingInput
                      label={"Quantity"}
                      type="number"
                      value={row.qty}
                      onChange={(e) => handleNestedChange(e, index, "qty", "replaceItems")}
                      />
                    
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

  return (
    <div
      className="BreakDownDetailsPopUp-container"
    >
      <div className="BreakDownDetailsPopUp-header">
        <h4>Break Down Details</h4>
        {/* <button className="BreakDownDetailsPopUp-close-btn" onClick={onClose}>
          X
        </button> */}
      </div>
      <div className="BreakDownDetailsPopUp-form">
        <div className="BreakDownDetailsPopUp-form-row">
          <div className="BreakDownDetailsPopUp-form-group-1row">

            <div className="BreakDownDetailsPopUp-form-group">
            <FloatingSelect
  label="Complaint *"
  value={selectedComplaintNumber}
  onChange={handleComplaintNumberChange}
  options={[
    { value: "", label: "Select Complaint Number", disabled: true }, // Default disabled option
    ...complaintNumbers.map((complaint) => ({
      value: complaint.complaintId,
      label: complaint.complaintId,
    }))
  ]}
/>
            </div>

            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Subject"}type="text" value={subject}/>
             
           
            </div>
          </div>
          <h4>Equipment Details</h4>
          <div className="BreakDownDetailsPopUp-form-group-1row">
            <div className="BreakDownDetailsPopUp-form-group">
             <FloatingSelect
  label="Equipment Name *"
  value={selectedEquipmentMaster}
  onChange={handleEquipmentChange}
  options={[
    { value: "", label: "Select Equipment", disabled: true }, // Default disabled option
    ...equipmentmasters.map((equipment) => ({
      value: equipment.equipmentMasterId,
      label: equipment.equipmentName,
    }))
  ]}
/>

            </div>
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Equipment Code"}
              type="text" value={equipmentData.equipmentNo}/>
              
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Asset No"}
              type="text" value={equipmentData.assetNo}/>
              
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Manual Code"} type="text"/>
              
            </div>
          </div>
          <div className="BreakDownDetailsPopUp-form-group-1row">
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Location"}
              type="text" value={equipmentData.location}/>
             
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Category"}
              type="text" value={equipmentData.category} />
             
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Depreciation"}
              type="text" value={equipmentData.depreciation}/>
            
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Serial No"}
              type="text" value={equipmentData.serialNo}/>
             
            </div>
          </div>
          <div className="BreakDownDetailsPopUp-form-group-1row">
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Model No"}
              type="text" value={equipmentData.modelNo} readOnly />
              
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Responsible Person"}
              type="text" value={equipmentData.responsiblePerson} readOnly/>
             
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Company Brand"}
              type="text" value={equipmentData.companyBrand} readOnly/>
            
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
            </div>

          </div>

          <h4>Supplier Details</h4>

          <div className="BreakDownDetailsPopUp-form-group-1row">
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Supplier Name "}
              type="text" value={equipmentData.supplierName}/>
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Supplier Address"}
              name="" id="" value={equipmentData.supplierAddress}/>
             
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Contact Person"}
              type="text" value={equipmentData.contactPerson} />
              
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Contact Number"}
              type="tel" value={equipmentData.contactNumber}/>
             
            </div>

          </div>

          <div className="BreakDownDetailsPopUp-form-group-1row">
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Supplier E-mail"}
              type="email" value={equipmentData.supplierEmail}
              />
             
            </div>
            <div className="BreakDownDetailsPopUp-form-group">

            </div>

            <div className="BreakDownDetailsPopUp-form-group">

            </div>

            <div className="BreakDownDetailsPopUp-form-group">

            </div>
          </div>
          <h4>Break Down Details</h4>
          <div className="BreakDownDetailsPopUp-form-group-1row">
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"BreakDown Details"}
              name="breakdownDetails" id="" onChange={handleChange}/>
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingSelect
              label={"Parts Replaced"}
              value={formData.partsReplaced}
              onChange={handleChange}
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
              ]}
              />
            </div>

            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Compony Name"}
              type="text" name="companyName" onChange={handleChange}/>
            </div>
          </div>
        
          <div className="BreakDownDetailsPopUp-form-group">
  <FloatingInput
    label="Date Of Invoice"
    type="date"
    name="dateOfInvoice"
    value={formData?.dateOfInvoice || ""} // Ensure it's controlled
    onChange={handleChange}
  />
</div>

<div className="BreakDownDetailsPopUp-form-group-1row">
<div className="BreakDownDetailsPopUp-form-group">
  <FloatingInput
    label={"Break Down Date"}
    type="date"
    name="breakDownDate"
    value={formData?.breakDownDate || ""} // Ensure it's controlled
    onChange={handleChange}
  />
</div>

            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Break Down Time"}
              type="time" name="breakdownTime"
                onChange={handleChange}/>
              
            </div>

            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingSelect
              label={"Complaint Status"}
               value={formData.complaintStatus}
                onChange={handleChange}
                options={[
                  { value: "Resolved", label: "Resolved" },
                  { value: "Re-solved", label: "Re-solved" }
                ]}/>
              
            </div>
          </div>
          <div className="BreakDownDetailsPopUp-form-group-1row">
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Work Completion Date"}type="date" name="workCompletionDate"
              onChange={handleChange}/>
              
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput 
              label={"Work Completion Time"}
              type="time" name="workCompletionTime"
                onChange={handleChange}/>
             
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
              <FloatingInput
              label={"Remarks"}type="text" name="remark"
              onChange={handleChange}/>
             
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
            </div>
          </div>
          <h4>Document</h4>

          <div className="BreakDownDetailsPopUp-form-group-1row">
            <div className="BreakDownDetailsPopUp-form-row">
              <input
                type="text"
                placeholder="File Name"
                // value={selectedFile ? selectedFile.name : ""}
                readOnly
              />
              <div>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label htmlFor="fileInput" className="btn-green">
                  Choose File
                </label>
                <button className="BreakDownDetailsPopUp-btn-green" onClick={handleUpload}>
                  Upload
                </button>
              </div>
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
            </div>
            <div className="BreakDownDetailsPopUp-form-group">
            </div>
          </div>

        </div>
      </div>
      <div className="BreakDownDetailsPopUp-history-section">
        <div className="BreakDownDetailsPopUp-tab-bar">
          <button
            className={`BreakDownDetailsPopUp-tab ${selectedTab === "repairbleParts" ? "active" : ""
              }`}
            onClick={() => setSelectedTab("repairbleParts")}
          >
            Repairble Parts
          </button>

          <button
            className={`BreakDownDetailsPopUp-tab ${selectedTab === "guaranteedParts" ? "active" : ""
              }`}
            onClick={() => setSelectedTab("guaranteedParts")}
          >
            Guaranteed Parts
          </button>
          <button
            className={`BreakDownDetailsPopUp-tab ${selectedTab === "history" ? "active" : ""
              }`}
            onClick={() => setSelectedTab("history")}
          >
            Break Down History
          </button>
        </div>
        {renderTable()}
      </div>
      <div className="BreakDownDetailsPopUp-form-actions">
        <button
          className="BreakDownDetailsPopUp-add-main-btn"
          onClick={handleSubmit}
        >
          Add
        </button>
        <button className="BreakDownDetailsPopUp-close-btn" onClick={onClose}>Close</button>
      </div>

    </div>
  );
};

export default BreakDownDetailsPopUp;
