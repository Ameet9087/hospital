import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./OTResourceManagement.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import useCustomAlert from "../../../alerts/useCustomAlert";
import { API_BASE_URL } from "../../api/api";

const OTResourceManagement = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [OTs, setOTs] = useState([]);
  const [otNames, setOTNames] = useState([]);
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [newOT, setNewOT] = useState({
    OTID: "",
    OTName: "",
    AvailabilityStatus: "",
    EquipmentAvailable: "",
    Capacity: "",
  });
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { success, error, CustomAlerts } = useCustomAlert();

  // Define the base URL for API requests
  // const baseURL = 'http://192.168.210.48:8080';

  // Fetch data on component mount
  useEffect(() => {
    // Fetch OT resources
    axios
      .get(`${API_BASE_URL}/ot-resources`)
      .then((response) => {
        setOTs(response.data);
      })
      .catch((err) => {
        error("Error fetching OT data");
        console.error("Error fetching OT data:", err);
      });

    // Fetch OT names
    axios
      .get(`${API_BASE_URL}/otmasters`)
      .then((response) => setOTNames(response.data))
      .catch((err) => {
        error("Error fetching OT names");
        console.error("Error fetching OT names:", err);
      });

    // Fetch equipment data
    axios
      .get(`${API_BASE_URL}/ot-machines`)
      .then((response) => {
        setEquipmentOptions(response.data);
      })
      .catch((err) => {
        error("Error fetching equipment data");
        console.error("Error fetching equipment data:", err);
        setEquipmentOptions([]);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOTs = OTs.filter((ot) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (ot.otResourceManagementId && ot.otResourceManagementId.toString().toLowerCase().includes(searchTermLower)) ||
      (ot.otMasterDTO?.otName && ot.otMasterDTO.otName.toLowerCase().includes(searchTermLower)) ||
      (ot.availableStatus && ot.availableStatus.toLowerCase().includes(searchTermLower)) ||
      (ot.otMachineDTO?.machineName && ot.otMachineDTO.machineName.toLowerCase().includes(searchTermLower)) ||
      (ot.capacity && ot.capacity.toString().toLowerCase().includes(searchTermLower))
    );
  });

  const printList = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;

      // Create an iframe element
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      // Append the iframe to the body
      document.body.appendChild(iframe);

      // Write the table content into the iframe's document
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
        <head>
          
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            button, .admit-actions, th:nth-child(10), td:nth-child(10) {
              display: none; /* Hide action buttons and Action column */
            }
          </style>
        </head>
        <body>
          <table>
            ${printContents}
          </table>
        </body>
        </html>
      `);
      doc.close();

      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      document.body.removeChild(iframe);
    }
  };

  const handleAddOT = () => {
    if (
      !newOT.OTName ||
      !newOT.AvailabilityStatus ||
      !newOT.EquipmentAvailable ||
      !newOT.Capacity
    ) {
      error("All fields are required");
      return;
    }

    // Find the corresponding OT Master and Machine from their names
    const selectedOTMaster = otNames.find(
      (otName) => otName.otName === newOT.OTName
    );
    const selectedMachine = equipmentOptions.find(
      (equipment) => equipment.machineName === newOT.EquipmentAvailable
    );

    if (!selectedOTMaster || !selectedMachine) {
      error("Invalid OT Name or Equipment");
      return;
    }

    const payload = {
      availableStatus: newOT.AvailabilityStatus,
      capacity: parseInt(newOT.Capacity),
      otMasterDTO: { otMasterId: selectedOTMaster.otMasterId },
      otMachineDTO: { otMachineId: selectedMachine.otMachineId },
    };
    console.log(JSON.stringify(payload, null, 2));

    if (newOT.OTID) {
      // Edit existing OT
      axios
        .put(`${API_BASE_URL}/ot-resources/${newOT.OTID}`, payload)
        .then((response) => {
          setOTs((prevOTs) =>
            prevOTs.map((ot) =>
              ot.otResourceManagementId === newOT.OTID ? response.data : ot
            )
          );
          success("OT updated successfully!");
          setNewOT({
            OTID: "",
            OTName: "",
            AvailabilityStatus: "",
            EquipmentAvailable: "",
            Capacity: "",
          });
          setOpenStickerPopup(false);
        })
        .catch((err) => {
          error("Error updating OT");
          console.error("Error updating OT:", err);
        });
    } else {
      // Add new OT
      axios
        .post(`${API_BASE_URL}/ot-resources`, payload)
        .then((response) => {
          setOTs([...OTs, response.data]); // Add the new OT to the state
          success("New OT added successfully!");
          setNewOT({
            OTID: "",
            OTName: "",
            AvailabilityStatus: "",
            EquipmentAvailable: "",
            Capacity: "",
          });
          setOpenStickerPopup(false);
        })
        .catch((err) => {
          error("Error adding new OT");
          console.error("Error adding new OT:", err);
        });
    }
  };

  const handleEditOT = (ot) => {
    setNewOT({
      OTID: ot.otResourceManagementId,
      OTName: ot.otMasterDTO.otName,
      AvailabilityStatus: ot.availableStatus,
      EquipmentAvailable: ot.otMachineDTO.machineName,
      Capacity: ot.capacity,
    });
    setOpenStickerPopup(true);
  };
  return (
    <div>
      <div className="otresoucefilter">
        <div className="otresource-date-utlt">
          <div className="ot-resorcefilter-patient">
            <div className="date-range">
              <label>From: </label>
              <input className="ot-otresource-input" type="date" />
              <label> To: </label>
              <input className="ot-otresource-input" type="date" />
            </div>
          </div>
        </div>

        <div className="ot-resource-patient-search">
          <input
            type="text"
            placeholder="Search"
            className="otsearch-otresource-search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            onClick={printList}
            className="otsearch-otresource-container-button"
          >
            Print
          </button>
        </div>
      </div>

      <button
        className="otresourcemgntbtn"
        onClick={() => setOpenStickerPopup(true)}
      >
        Add OT
      </button>

      <table ref={tableRef}>
        <thead>
          <tr>
            {[
              "OTID",
              "OT Name",
              "Availability Status",
              "Machine Name",
              "Capacity",
              "Actions",
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
          {filteredOTs.length > 0 ? (
            filteredOTs.map((ot, index) => (
              <tr key={index}>
                <td>{ot.otResourceManagementId}</td>
                <td>{ot.otMasterDTO?.otName}</td>
                <td>{ot.availableStatus}</td>
                <td>{ot.otMachineDTO?.machineName}</td>
                <td>{ot.capacity}</td>
                <td>
                  <button
                    className="otresourcemgntedit-btn"
                    onClick={() => handleEditOT(ot)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {openStickerPopup && (
        <div
          className="otresource-modal"
          onClick={() => setOpenStickerPopup(false)}
        >
          <div
            className="ot-resource-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{newOT.OTID ? "Edit OT" : "Add New OT"}</h2>
            <label>OT Name:</label>
            <select
              value={newOT.OTName}
              onChange={(e) => setNewOT({ ...newOT, OTName: e.target.value })}
            >
              <option value="">Select OT Name</option>
              {otNames.map((otName, index) => (
                <option key={index} value={otName.otName}>
                  {otName.otName}
                </option>
              ))}
            </select>
            <label>Availability Status:</label>
            <select
              value={newOT.AvailabilityStatus}
              onChange={(e) =>
                setNewOT({ ...newOT, AvailabilityStatus: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
            <label>Machine Name:</label>
            <select
              value={newOT.EquipmentAvailable}
              onChange={(e) =>
                setNewOT({ ...newOT, EquipmentAvailable: e.target.value })
              }
            >
              <option value="">Select Equipment</option>
              {equipmentOptions
                .filter((equipment) => equipment.isActive === "Yes")
                .map((equipment) => (
                  <option
                    key={equipment.otMachineId}
                    value={equipment.machineName}
                  >
                    {equipment.machineName}
                  </option>
                ))}
            </select>
            <label>Capacity:</label>
            <input
              type="number"
              value={newOT.Capacity}
              onChange={(e) => setNewOT({ ...newOT, Capacity: e.target.value })}
            />
            <div className="otresource-btn">
              <button onClick={handleAddOT}>Save</button>
              <button onClick={() => setOpenStickerPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <CustomAlerts />
    </div>
  );
};

export default OTResourceManagement;
