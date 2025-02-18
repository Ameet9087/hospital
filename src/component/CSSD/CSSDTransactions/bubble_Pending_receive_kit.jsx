import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Bubble_Pending_Kit_Receive.css";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../api/api";
import FloatingInput from "../../../FloatingInputs/FloatingInput";
import FloatingSelect from "../../../FloatingInputs/FloatingSelect";
import { toast } from "react-toastify";

const PendingKitReceiveRecord = () => {
  const { issueId } = useParams(); // Get the 'issueId' from the URL
  const [rows, setRows] = useState([]); // Remove hardcoded data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [kitNames, setKitNames] = useState([]);
  const [departmentName, setDepartmentName] = useState();
  const [subdepartmentName, setSubdepartmentName] = useState();
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchKitDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/kit-issues/${issueId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        setRows(data.kitDetails || []); // Map fetched data to `rows`
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (issueId) {
      fetchKitDetails();
    }
  }, [issueId]);

  const updateRow = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const addNewRow = () => {
    setRows([
      ...rows,
      {
        kitName: "",
        kitMasterId: "",
        batchNumber: "",
        expiry: "",
        receivingQty: "",
        reqQuantity: "",
        remarks: "",
      },
    ]);
  };

  const handleKitNameSearch = (e) => setSearchTerm(e.target.value);

  const handleKitNameSelect = (kitName) => {
    if (selectedRowIndex !== null) {
      updateRow(selectedRowIndex, "kitName", kitName);
    }
    setShowModal(false);
    setSearchTerm("");
  };

  const handleSave = async () => {
    const formattedData = {
      issueId: parseInt(issueId),
      departmentName,
      subdepartmentName,
      kitReceivingItems: rows.map((row) => ({
        kitMasterId: parseInt(row.kitMasterId),
        receivingQuantity: parseInt(row.receivingQty),
        quantity: parseInt(row.reqQuantity),
        remarks: row.remarks || "",
      })),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/kit-receiving`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });
      if (!response.ok) {
        throw new Error(`Failed to save: ${response.statusText}`);
      }
      toast.success("Data saved successfully!");
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  const filterRows = rows.filter((row) =>
    (row.kitName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pendingkitreceiverecord-container">
      <header className="pendingkitreceiverecord-header">
        <h3>Kit Receive</h3>
        <div className="pendingkitreceiverecord-inputs">
          <FloatingInput
          label={"Kit Issued Number"}
          type="text" value={issueId || "Issue Number Not Found"} readOnly/>
         
          
            <FloatingInput
            label={"Department Name"}
            type="text" value={departmentName} readOnly/>
           
            <FloatingInput
            label={"Sub Department Name"}
            type="text" value={subdepartmentName} readOnly/>
            
        
        </div>
      </header>

      <div className="pendingkitreceiverecord-search">
        <input
          type="text"
          placeholder="Search Kits"
          value={searchTerm}
          onChange={handleKitNameSearch}
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>

      {error && <p className="error-message">Error: {error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="pendingkitreceiverecord-table" ref={tableRef}>
          <thead>
            <tr>
              {["SN", "Kit Id", "Kit Name", "Receiving Qty", "reqQuantity", "Remarks"].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filterRows.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <FloatingInput
                  label={"Kit ID"}
                  type="number"
                    value={row.kitMasterId || ""}
                    onChange={(e) => updateRow(index, "kitMasterId", e.target.value)}/>
                  
                </td>
                <td>
                  <FloatingInput
                  label={"Kit Name"}
                  type="text"
                    value={row.kitName || ""}
                    onChange={(e) => updateRow(index, "kitName", e.target.value)}
                  onIconClick={() => {
                    setSelectedRowIndex(index);
                    setShowModal(true);
                  }}/>
                  
                </td>
                <td>
                  <FloatingInput
                  label={"Receiving Qty"}
                  type="number"
                  value={row.receivingQty || ""}
                  onChange={(e) => updateRow(index, "receivingQty", e.target.value)}
                />
                 
                </td>
                <td>
                  {row.reqQuantity}
                </td>
                <td>
                  <FloatingInput
                  label={"Remark"}
                  type="text"
                  value={row.remarks || ""}
                  onChange={(e) => updateRow(index, "remarks", e.target.value)}/>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pendingkitreceiverecord-buttons">
        <button className="pendingkitreceiverecord-buttons-button" onClick={addNewRow}>Add Row</button>
        <button className="pendingkitreceiverecord-buttons-button" onClick={handleSave}>Save</button>
      </div>

      {showModal && (
        <div className="pendingkitreceiverecord-modal">
          <div className="pendingkitreceiverecord-modal-content">
            <h4>Select a Kit</h4>
            <input
              type="text"
              value={searchTerm}
              onChange={handleKitNameSearch}
              placeholder="Search Kit Name"
            />
            <ul>
              {kitNames
                .filter((kit) => kit && kit.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((kit, index) => (
                  <li key={index} onClick={() => handleKitNameSelect(kit)}>
                    {kit}
                  </li>
                ))}
            </ul>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingKitReceiveRecord;
