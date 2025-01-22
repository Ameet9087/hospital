import React, { useRef, useState, useEffect } from "react";
import "./EquipmentGatePassInPopUp.css";
import { FaSearch } from "react-icons/fa"; // Using react-icons
import { startResizing } from "../../../../TableHeadingResizing/resizableColumns";
import { API_BASE_URL } from "../../../../api/api";

const EquipmentGatePassInPopUp = ({ onClose }) => {

  const [equipmentmasters, setEquipmentMasters] = useState([]);
  const [selectedEquipmentMaster, setSelectedEquipmentMaster] = useState("");

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
  const [gatePassOuts, setGatePassOuts] = useState([]);
  const [selectedGatePassOut, setSelectedGatePassOut] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/gatePassOut`)
      .then((response) => response.json())
      .then((data) => {
        setGatePassOuts(data); // Assuming data is an array of complaint objects

      })
      .catch((error) => console.error("Error fetching Gate Pass numbers:", error));
  }, []);

  const handleGatePassOutChange = (event) => {
    const selectedGatePassOutId = event.target.value;
    setSelectedGatePassOut(selectedGatePassOutId);
  }

  const [formData, setFormData] = useState({
    gatePassType: "",
    gatePassOutDate: "",
    dcNo: "",
    gateEntryNo: "",
    gatePassInDate: "",
    gatePassInTime: "",
    timePeriod: "",
    preparedBy: "",
    receivedBy: "",
    authorisedBy: "",
    equipmentGatePassOutDTO: {
      gatePassOutId: ""
    },
    equipmentMasterDTO: {
      equipmentMasterId: ""
    },
    approvalByDTO: {
      doctorId: ""
    },
    partsDTO: [{ partId: "", outQuantity: "", pendingQuantity: "", recQuantity: "", remark: "" }],

  });



  const [itemTableWidths, setItemTableWidths] = useState({});
  const [approveTableWidths, setApproveTableWidths] = useState({});
  const itemTableRef = useRef(null);
  const approveTableRef = useRef(null);

  const [packageTableRows, setPackageTableRows] = useState([
    {
      sn: 1,
      selectedPart: "", // Initialized as empty
      outQuantity: "",
      pendingQuantity: "",
      recQuantity: "",
      remark: ""
    }
  ]);


  const handlePartTableChange = (index, field, value) => {
    setPackageTableRows(prevRows => {
      const newRows = [...prevRows];
      newRows[index] = {
        ...newRows[index],
        [field]: value
      };
      return newRows;
    });
  };

  const [approveTableRows, setApproveTableRows] = useState([
    { sn: 1, approvedBy: "", priority: "" },
  ]);


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

  const handlePartChange = (event, rowIndex) => {
    const selectedPartId = event.target.value;
    setPackageTableRows(prevRows => {
      const newRows = [...prevRows];
      newRows[rowIndex].selectedPart = selectedPartId;
      return newRows;
    });
  };




  const handleAddRow = () => {
    setPackageTableRows((prevRows) => [
      ...prevRows,
      {
        sn: prevRows.length + 1,
        itemCode: "",
        itemName: "",
        outQty: 0,
        pendingQty: 0,
        recQty: 0,
        remarks: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    setPackageTableRows((prevRows) =>
      prevRows.filter((_, rowIndex) => rowIndex !== index).map((row, idx) => ({
        ...row,
        sn: idx + 1, // Reassign serial numbers
      }))
    );
  };

  const handleSave = async () => {
    try {

      const partsData = packageTableRows.map(row => ({
        partId: Number(row.selectedPart),
        outQuantity: row.outQuantity,
        pendingQuantity: row.pendingQuantity,
        recQuantity: row.recQuantity,
        remark: row.remark
      })).filter(part => part.partId); // Only include rows with selected parts


      const payload = {
        gatePassType: formData.gatePassType,
        gatePassOutDate: formData.gatePassOutDate,
        dcNo: formData.dcNo,
        gateEntryNo: formData.gateEntryNo,
        gatePassInDate: formData.gatePassInDate,
        gatePassInTime: formData.gatePassInTime,
        timePeriod: formData.timePeriod,
        preparedBy: formData.preparedBy,
        receivedBy: formData.receivedBy,
        authorisedBy: formData.authorisedBy,

        ...(selectedGatePassOut && {
          equipmentGatePassOutDTO: {
            gatePassOutId: Number(selectedGatePassOut)
          },
        }),


        ...(selectedEquipmentMaster && {
          equipmentMasterDTO: {
            equipmentMasterId: Number(selectedEquipmentMaster),
          },
        }),

        approvalByDTO: {
          doctorId: Number(selectedApprover),
        },
        partsDTO: partsData

      };



      const response = await fetch(`${API_BASE_URL}/equipment-gate-pass-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save equipment gate pass in');
      }

      const savedData = await response.json();
      alert('Equipment Gate Pass In saved successfully!');
    } catch (error) {
      console.error('Error saving equipment gate pass in:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="EquipmentGatePassInPopUp-container">
      <div className="EquipmentGatePassInPopUp-header">
        <h4>Equipment Get Pass In</h4>
      </div>
      <div className="EquipmentGatePassInPopUp-form">
        <div className="EquipmentGatePassInPopUp-form-row">

          <h4>Equipment In Details</h4>

          <div className="EquipmentGatePassInPopUp-form-group-1row">


            <div className="EquipmentGatePassInPopUp-form-group">
              <label>Gate Pass Type:</label>
              <select
                name="gatePassType"
                value={formData.gatePassType}
                onChange={handleInputChange}
              >
                <option value="Against Gate Pass Out">Against Gate Pass Out</option>
                <option value="Demo Material">Demo Material</option>
                <option value="Equip Replacement">Equip Replacement</option>
              </select>
            </div>

            {formData.gatePassType === "Against Gate Pass Out" && (
              <>
                <div className="EquipmentGatePassOutPopUp-form-group">
                  <label>Gate Pass Out No : </label>
                  <select
                    value={selectedGatePassOut}
                    onChange={handleGatePassOutChange}
                  >
                    <option value="" disabled>
                      Select Gate Pass Out
                    </option>
                    {gatePassOuts.map((gatePassOut) => (
                      <option key={gatePassOut.gatePassOutId} value={gatePassOut.gatePassOutId}>
                        {gatePassOut.reason}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {formData.gatePassType !== "Against Gate Pass Out" && (
              <>
                <div className="EquipmentGatePassOutPopUp-form-group">
                  <label>Equipment : </label>
                  <select
                    value={selectedEquipmentMaster}
                    onChange={handleEquipmentChange}
                  >
                    <option value="" disabled>
                      Select Equipment
                    </option>
                    {equipmentmasters.map((equipment) => (
                      <option key={equipment.equipmentMasterId} value={equipment.equipmentMasterId}>
                        {equipment.equipmentName}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}



            <div className="EquipmentGatePassInPopUp-form-group">
              <label>DC NO:<span className="equipment-gate-pass-in-required">*</span></label>
              <input type="text" name="dcNo" onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="EquipmentGatePassInPopUp-form-group-1row">
            <div className="EquipmentGatePassInPopUp-form-group">
              <label>Gate Entry No:</label>
              <input type="text" name="gateEntryNo" onChange={handleInputChange}
              />
            </div>
            <div className="EquipmentGatePassInPopUp-form-group">
              <label>Gate Pass in Date:</label>
              <input type="date" name="gatePassInDate" onChange={handleInputChange}
              />

            </div>
            <div className="EquipmentGatePassInPopUp-form-group">
              <label>Gate Pass in Time:</label>
              <input type="time" name="gatePassInTime" onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="EquipmentGatePassInPopUp-form-group-1row">
            <div className="EquipmentGatePassInPopUp-form-group">
              <label>Time Period:</label>
              <input type="text" name="timePeriod" onChange={handleInputChange}
              />
            </div>
            <div className="EquipmentGatePassInPopUp-form-group">
              <label>Prepared by:</label>
              <input type="text" name="preparedBy" onChange={handleInputChange}
              />
            </div>
            <div className="EquipmentGatePassInPopUp-form-group">
              <label>Received By:</label>
              <input type="text" name="receivedBy" onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="EquipmentGatePassInPopUp-form-group-1row">

            <div className="EquipmentGatePassInPopUp-form-group">
              <label>Gate Pass Out Date:</label>
              <input type="date" name="gatePassOutDate" onChange={handleInputChange}
              />

            </div>
            <div className="EquipmentGatePassInPopUp-form-group">
              <label>Authorised by :<span className="equipment-gate-pass-in-required">*</span></label>
              <input type="text" name="authorisedBy" onChange={handleInputChange}
              />
            </div>
            <div className="EquipmentGatePassInPopUp-form-group">

            </div>

          </div>


        </div>
        {/* Item Details Table */}
        <div className="table-container">
          <h4>Item Details</h4>
          <table ref={itemTableRef}>
            <thead>
              <tr>
                {["Actions", "SN", "Item Code", "Item Name", "Out Qty", "Pending Qty", "Rec Qty", "Remarks"].map(
                  (header, index) => (
                    <th
                      key={index}
                      style={{ width: itemTableWidths[index] }}
                      className="resizable-th"
                    >
                      <div className="header-content">
                        <span>{header}</span>
                        <div
                          className="resizer"
                          onMouseDown={startResizing(itemTableRef, setItemTableWidths)(index)}
                        ></div>
                      </div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {packageTableRows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <div className="table-actions">
                      <button className="EquipmentGatePassOutPopUp-add-row-btn" onClick={handleAddRow}>
                        Add
                      </button>
                      <button
                        className="EquipmentGatePassOutPopUp-del-row-btn"
                        onClick={() => handleDeleteRow(index)}
                        disabled={packageTableRows.length <= 1}
                      >
                        Del
                      </button>
                    </div>
                  </td>
                  <td>{row.sn}</td>
                  <td>
                    <input
                      type="text"
                      value={row.itemCode || ''}
                      onChange={(e) => handlePartTableChange(index, 'itemCode', e.target.value)}
                    />
                  </td>
                  <td>
                    <select
                      value={row.selectedPart || ""}
                      onChange={(e) => handlePartChange(e, index)}
                    >
                      <option value="" disabled>Select Part</option>
                      {parts.map((part) => (
                        <option key={part.partId} value={part.partId}>
                          {part.partName}
                        </option>
                      ))}
                    </select>

                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.outQuantity || ''}
                      onChange={(e) => handlePartTableChange(index, 'outQuantity', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.pendingQuantity || ''}
                      onChange={(e) => handlePartTableChange(index, 'pendingQuantity', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.recQuantity || ''}
                      onChange={(e) => handlePartTableChange(index, 'recQuantity', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.remark || ''}
                      onChange={(e) => handlePartTableChange(index, 'remark', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Approve Details Table */}
        <div className="table-container">
          <h4>Approve Details</h4>
          <table ref={approveTableRef}>
            <thead>
              <tr>
                {["SN", "Approved By", "Priority"].map((header, index) => (
                  <th
                    key={index}
                    style={{ width: approveTableWidths[index] }}
                    className="resizable-th"
                  >
                    <div className="header-content">
                      <span>{header}</span>
                      <div
                        className="resizer"
                        onMouseDown={startResizing(approveTableRef, setApproveTableWidths)(index)}
                      ></div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {approveTableRows.map((row, index) => (
                <tr key={index}>
                  <td>{row.sn}</td>
                  <td>
                    <select
                      value={selectedApprover}
                      onChange={(e) => handleAproverChange(e, index)}
                    >
                      <option value="" disabled>Select Approver</option>
                      {approvedBy.map((approver) => (
                        <option key={approver.doctorId} value={approver.doctorId}>
                          {approver.doctorName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="EquipmentGatePassInPopUp-form-actions">
        <button className="EquipmentGatePassInPopUp-add-btn" onClick={handleSave}>
          Add
        </button>
        <button className="EquipmentGatePassInPopUp-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EquipmentGatePassInPopUp;
