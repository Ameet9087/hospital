import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Import Axios
import "./SurgicalInstrumentTracking.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";

// const baseURL = 'http://192.168.210.48:8080';

const SurgicalInstrumentTracking = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [instruments, setInstruments] = useState([]);
  const [newInstrument, setNewInstrument] = useState({
    surgicalInstrumentId: "", // Use 'surgicalInstrumentId' instead of 'instrumentId'
    instrumentName: "",
    availableQuantity: "",
    conditionStatus: "New", // Default to "New" for new instruments
  });
  const [showAddInstrumentModal, setShowAddInstrumentModal] = useState(false);

  // Fetch instrument data when component mounts
  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/surgical-instruments`
        );
        setInstruments(response.data); // Set the instruments state with the fetched data
      } catch (error) {
        console.error("Error fetching instrument data:", error);
        alert("Failed to load instruments. Please try again later.");
      }
    };

    fetchInstruments();
  }, []);

  // Handle adding or updating an instrument
  const handleAddInstrument = async () => {
    // Validate instrument data before sending
    if (
      !newInstrument.instrumentName ||
      !newInstrument.availableQuantity ||
      !newInstrument.conditionStatus
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      let response;
      if (newInstrument.surgicalInstrumentId) {
        // If surgicalInstrumentId exists, update the existing instrument via PUT request
        response = await axios.put(
          `${API_BASE_URL}/surgical-instruments/${newInstrument.surgicalInstrumentId}`,
          {
            instrumentName: newInstrument.instrumentName,
            availableQuantity: newInstrument.availableQuantity,
            conditionStatus: newInstrument.conditionStatus,
          }
        );
        setInstruments(
          instruments.map((instrument) =>
            instrument.surgicalInstrumentId ===
            newInstrument.surgicalInstrumentId
              ? response.data
              : instrument
          )
        );
      } else {
        // If no surgicalInstrumentId, treat it as a new instrument and send a POST request
        response = await axios.post(`${API_BASE_URL}/surgical-instruments`, {
          instrumentName: newInstrument.instrumentName,
          availableQuantity: newInstrument.availableQuantity,
          conditionStatus: newInstrument.conditionStatus,
        });
        setInstruments([...instruments, response.data]);
      }

      // Reset the form and close the modal
      setNewInstrument({
        surgicalInstrumentId: "",
        instrumentName: "",
        availableQuantity: "",
        conditionStatus: "New",
      });
      setShowAddInstrumentModal(false);
    } catch (error) {
      console.error("Error saving instrument:", error);
      if (error.response) {
        console.error("Error response:", error.response.data); // Log the error response from the server
      } else {
        console.error("Error message:", error.message);
      }
      alert("Failed to save the instrument. Please try again later.");
    }
  };

  // Open modal to edit an existing instrument
  const handleEditInstrument = (instrument) => {
    setNewInstrument({
      surgicalInstrumentId: instrument.surgicalInstrumentId, // Use surgicalInstrumentId for editing
      instrumentName: instrument.instrumentName,
      availableQuantity: instrument.availableQuantity,
      conditionStatus: instrument.conditionStatus,
    });
    setShowAddInstrumentModal(true); // Show the modal
  };

  return (
    <div className="surgical-instrument-tracking">
      <button
        className="surgicalinstrumenttrackingbtn"
        onClick={() => setShowAddInstrumentModal(true)}
      >
        Add Instrument
      </button>

      <table ref={tableRef}>
        <thead>
          <tr>
            {[
              "Instrument ID",
              "Instrument Name",
              "Available Quantity",
              "Condition Status",
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
          {instruments.map((instrument, index) => (
            <tr key={index}>
              <td>{instrument.surgicalInstrumentId}</td>{" "}
              {/* Use surgicalInstrumentId */}
              <td>{instrument.instrumentName}</td>
              <td>{instrument.availableQuantity}</td>
              <td>{instrument.conditionStatus}</td>
              <td>
                <button
                  className="surgicalinstrumenttrackingedit-btn"
                  onClick={() => handleEditInstrument(instrument)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddInstrumentModal && (
        <div
          className="surgicaltrack-modal"
          onClick={() => setShowAddInstrumentModal(false)}
        >
          <div
            className="surgicaltrack-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>
              {newInstrument.surgicalInstrumentId
                ? "Edit Instrument"
                : "Add New Instrument"}
            </h2>
            <label>Instrument Name:</label>
            <input
              type="text"
              value={newInstrument.instrumentName}
              onChange={(e) =>
                setNewInstrument({
                  ...newInstrument,
                  instrumentName: e.target.value,
                })
              }
            />
            <label>Available Quantity:</label>
            <input
              type="number"
              value={newInstrument.availableQuantity}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 || value === "") {
                  setNewInstrument({
                    ...newInstrument,
                    availableQuantity: value,
                  });
                }
              }}
            />

            <label>Condition Status:</label>
            <select
              value={newInstrument.conditionStatus}
              onChange={(e) =>
                setNewInstrument({
                  ...newInstrument,
                  conditionStatus: e.target.value,
                })
              }
            >
              <option value="Good">Good</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Out of Service">Out of Service</option>
              <option value="New">New</option>
            </select>
            <div>
              <button
                className="surgicalinstrumenttrackingedit-btn"
                onClick={handleAddInstrument}
              >
                Save
              </button>
              <button
                className="surgicalinstrumenttrackingedit-btn"
                onClick={() => setShowAddInstrumentModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurgicalInstrumentTracking;
