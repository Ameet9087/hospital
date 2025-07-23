import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./PendingKitReceive.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../api/api";

const PendingKitReceive = () => {
  const [kitNames, setKitNames] = useState([]); // State for storing fetched kit names
  const [selectedKitName, setSelectedKitName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const { issueId } = useParams(); // Get the 'id' from the URL

  // You can now use this ID to perform actions like fetching data based on the ID
  useEffect(() => {
    const fetchKitDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/kit-issues/${issueId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        // setKitDetails(data);
        setRows(
          (data.kitRequestItems || []).map((item, index) => ({
            id: index + 1,
            ...item,
          }))
        );
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchKitDetails();
    }
  }, [id]);

  const [rows, setRows] = useState([
    {
      kitName: "KIT44",
      batchNo: "1112341",
      expiry: "2028-10-25",
      receivingQty: 5,
      quantity: 5,
      remarks: "",
    },
    {
      kitName: "KIT11",
      batchNo: "231234",
      expiry: "2034-10-18",
      receivingQty: 4,
      quantity: 4,
      remarks: "",
    },
  ]);

  const addNewRow = () => {
    setRows([
      ...rows,
      {
        kitName: "",
        batchNo: "",
        expiry: "",
        receivingQty: "",
        quantity: "",
        remarks: "",
      },
    ]);
  };

  const updateRow = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };


  const handleKitNameSearch = (e) => {
    setSelectedKitName(e.target.value);
  };

  const handleKitNameSelect = (kitName) => {
    setSelectedKitName(kitName); // Set the selected kit name
    setShowModal(false); // Close the modal after selection
  };

  return (
    <div className="pendingkitreceive-container">
      <header className="pendingkitreceive-header">
        <h3>Kit Receiving</h3>
        <div className="pendingkitreceive-inputs">
          <label>
            Receive Number: <input type="text" />
          </label>
          <label>
            Kit Issued Number: <input type="text" value="13" readOnly />
          </label>
          <label>
            Department Name: <input type="text" value="CENTRAL PHARMACY" readOnly />
          </label>
          <label>
            Sub Department Name: <input type="text" value="CENTRAL PHARMACY" readOnly />
          </label>
        </div>
      </header>

      <table className="pendingkitreceive-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Add",
              "SN",
              "Kit Name",
              "Batch No",
              "Expiry",
              "Receiving Qty",
              "Quantity",
              "Remarks"
            ]
              .map((header, index) => (
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
                <button onClick={addNewRow}>Add</button>
              </td>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={row.kitName}
                  onChange={(e) => updateRow(index, "kitName", e.target.value)}
                  placeholder="Search Kit Name"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="pendingkitreceivesearch-icon"
                  onClick={() => setShowModal(true)} // Open search modal on icon click
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.batchNo}
                  onChange={(e) => updateRow(index, "batchNo", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={row.expiry}
                  onChange={(e) => updateRow(index, "expiry", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.receivingQty}
                  onChange={(e) => updateRow(index, "receivingQty", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.quantity}
                  onChange={(e) => updateRow(index, "quantity", e.target.value)}
                />
              </td>
              <td>
                <input
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
        <div className="modal">
          <div className="modal-content">
            <h4>Select a Kit</h4>
            <input
              type="text"
              value={selectedKitName}
              onChange={handleKitNameSearch}
              placeholder="Search Kit Name"
            />
            <ul>
              {kitNames
                .filter((kit) =>
                  kit.name.toLowerCase().includes(selectedKitName.toLowerCase())
                )
                .map((kit, index) => (
                  <li key={index} onClick={() => handleKitNameSelect(kit.name)}>
                    {kit.name}
                  </li>
                ))}
            </ul>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
      <div>
        <button>Save </button>
      </div>
    </div>
  );
};

export default PendingKitReceive;
