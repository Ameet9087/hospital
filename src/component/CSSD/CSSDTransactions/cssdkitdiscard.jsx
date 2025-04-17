import React, { useState, useRef, useEffect } from "react";
import "./CSSDKitDiscard.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../../../FloatingInputs/FloatingInput";
import FloatingSelect from "../../../FloatingInputs/FloatingSelect";
import { toast } from "react-toastify";


const CSSDKitDiscard = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { kitId: "", kitName: "", quantity: " ", remarks: "" },
  ]);

  const [discardDate, setDiscardDate] = useState("");
  const [remarks, setRemarks] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  // Kits State
  const [kits, setKits] = useState([]); // Store kits from API
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // Fetch kits from API
  useEffect(() => {
    const fetchKits = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/kit-masters`); // Replace with your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch kits");
        }
        const data = await response.json();
        setKits(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKits();
  }, []);

  const filteredKits = kits.filter((kit) =>
    kit.kitName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleClose = () => {
    navigate(-1);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { kitId: "", kitName: "", quantity: "", remarks: "" },
    ]);
  };

  const updateRow = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleItemClick = (kit, rowIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].kitId = kit.kitId; // Set kitId from selected kit
    updatedRows[rowIndex].kitName = kit.kitName; // Set kitName from selected kit
    setRows(updatedRows);
    setShowModal(false);
  };

  const handleSave = async () => {
    const payload = {
      discardDate,
      remarks,
      kitDiscardItems: rows.map((row) => ({
        kitId: row.kitId,
        batchNumber: row.batchNo,
        expiryDate: row.expiryDate,
        quantity: row.quantity,
        remarks: row.remarks,
      })),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/kit-discard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const result = await response.json();
      console.log("Save successful:", result);
      toast.success("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data!");
    }
  };

  return (
    <div className="cssdkitdiscard-container">
      <header className="cssdkitdiscard-header">



        <h3>Kit Discard</h3>
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          className="back-icon"
          onClick={handleClose}
        />
      </header>
      <div className="cssdkitdiscard-form">
        <FloatingInput
          label={"Discard Date"}
          type="date"
          value={discardDate}
          onChange={(e) => setDiscardDate(e.target.value)} />
        <FloatingInput
          label={" Remarks"}
          type="text"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)} />

      </div>

      <table className="cssdkitdiscard-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Add",
              "SN",
              "Kit Id",
              "Kit Name",
              "Quantity",
              "Remarks",
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
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <button onClick={addRow} className="cssdkitdiscard-add-button">
                  Add
                </button>
              </td>
              <td>{index + 1}</td>
              <td>
                <FloatingInput
                  label={"Kit ID"}
                  type="number"
                  value={row.kitId}
                  onChange={(e) => updateRow(index, "kitId", e.target.value)} />

              </td>
              <td>
                <div className="input-with-icon">
                  <FloatingInput
                    type="search"
                    label={"Kit Name"}
                    value={row.kitName}
                    onClick={() => {
                      setSelectedRowIndex(index);
                      setShowModal(true);
                    }}
                    readOnly />


                </div>
              </td>
              <td>
                <FloatingInput
                  label={"Quantity"}
                  type="number"
                  value={row.quantity}
                  onChange={(e) => updateRow(index, "quantity", e.target.value)}
                />

              </td>
              <td>
                <FloatingInput
                  label={"Remark"}
                  type="text"
                  value={row.remarks}
                  onChange={(e) => updateRow(index, "remarks", e.target.value)}
                />


              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay-for-items">
          <div className="modal-content-for-items">
            <h2>Select Kit</h2>
            {loading ? (
              <p>Loading kits...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Kit"
                />
                <table>
                  <thead>
                    <tr>
                      <th>Kit Id</th>
                      <th>Kit Name</th>
                      <th>Description</th>
                      <th>Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredKits.map((kit) => (
                      <tr key={kit.kitId}>
                        <td>{kit.kitId}</td>
                        <td>{kit.kitName}</td>
                        <td>{kit.description}</td>
                        <td>
                          <button
                            onClick={() =>
                              handleItemClick(kit, selectedRowIndex) // Use selected row index
                            }
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
      <br></br>
      <button onClick={handleSave} className="cssdkitdiscard-save-button">
        Save
      </button>
    </div>
  );
};

export default CSSDKitDiscard;
