// AjharTamboli 20-11-24 iPChangeRoom.jsx
import React, { useState, useEffect } from "react";
import "./iPChangeRoom.css";
import PopupTable from "./PopupTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../api/api";

const IPChangeRoom = ({ patient }) => {
  const [selectedTab, setSelectedTab] = useState("services");
  const [activePopup, setActivePopup] = useState(null);
  const [beds, setBeds] = useState([]); // Store fetched beds
  const [selectedBedId, setSelectedBedId] = useState(null); // Selected bed ID
  const [selectedBedDetails, setSelectedBedDetails] = useState(null); // Selected bed details

  console.log(patient);

  useEffect(() => {
    // Fetch bed data on component load
    fetch(`${API_BASE_URL}/beds`)
      .then((response) => response.json())
      .then((data) => setBeds(data))
      .catch((error) => console.error("Error fetching beds:", error));
  }, []);

  const handleDeleteRow = (snToDelete) => {
    const updatedData = servicesData
      .filter((row) => row.sn !== snToDelete)
      .map((row, index) => ({ ...row, sn: index + 1 }));
    setServicesData(updatedData);
  };

  // Handle bed selection
  const handleBedSelection = (e) => {
    const bedId = parseInt(e.target.value, 10);
    setSelectedBedId(bedId);

    // Find and set the selected bed details
    const bedDetails = beds.find((bed) => bed.id === bedId);
    setSelectedBedDetails(bedDetails || null);
  };

  // New: Save function for API call
  const handleSave = async () => {
    if (!selectedBedDetails) {
      alert("Please select a bed before saving.");
      return;
    }

    const { roomDto, id: newBedId } = selectedBedDetails;
    const newRoomId = roomDto.id;
    const newFloorId = roomDto.floorNumber;
    const oldRoomId = patient.roomDetails.roomDTO.id;
    const oldBedId = patient.roomDetails.bedDTO.id;
    const ipAdmissionId = patient.patient.inPatientId;

    const apiUrl = `${API_BASE_URL}/roomdetails/change?oldRoomId=${oldRoomId}&newRoomId=${newRoomId}&newBedId=${newBedId}&newFloorId=${newFloorId}&ipAdmissionId=${ipAdmissionId}&oldBedId=${oldBedId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
      });

      if (response.ok) {
        alert("Room change was successful!");
      } else {
        const errorData = await response.json();
        alert(`Failed to save changes:" ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving room change:", error);
      alert("An error occurred while saving changes.");
    }
  };

  return (
    <div className="iPChangeRoom-master">
      <div className="iPChangeRoom-title-bar">
        <div className="iPChangeRoom-header">
          <span>IP Change Room</span>
        </div>
      </div>
      <div className="iPChangeRoom-content-wrapper">
        <div className="iPChangeRoom-main-section">
          <div className="iPChangeRoom-panel operation-details">
            <div className="iPChangeRoom-panel-header">Patient Details</div>
            <div className="iPChangeRoom-panel-content">
              <div className="iPChangeRoom-form-row">
                <label>IP No: *</label>
                <div className="iPChangeRoom-input-with-search">
                  <input
                    type="text"
                    value={patient.patient?.inPatientId}
                    placeholder="Ip No"
                  />
                </div>
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Admission Date:</label>
                <input type="date" value={patient?.admissionDate} />
              </div>

              <div className="iPChangeRoom-form-row">
                <label>Admission Time:</label>
                <input type="text" value={patient?.admissionTime} />
              </div>

              <div className="iPChangeRoom-form-row">
                <label>Patient Name:</label>
                <input
                  type="text"
                  value={`${patient?.patient?.firstName} ${patient?.patient?.middleName} ${patient?.patient?.lastName}`}
                />
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Age:</label>
                <input type="text" value={patient?.patient?.age} />
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Gender:</label>
                <select value={patient?.patient?.gender}>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                </select>
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Change Date:</label>
                <input type="date" value="" />
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Change Time:</label>
                <input type="time" value="" />
              </div>
            </div>
          </div>
          <div className="iPChangeRoom-panel operation-details">
            <div className="iPChangeRoom-panel-header">
              Current Room Details
            </div>
            <div className="iPChangeRoom-panel-content">
              <div className="iPChangeRoom-form-row">
                <label>Current Pay Type:</label>
                <input
                  type="text"
                  value={patient?.roomDetails?.payTypeDTO?.payTypeName}
                />
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Current Room Type:</label>
                <input
                  type="text"
                  value={patient?.roomDetails?.roomTypeDTO?.roomtype}
                />
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Current Room No:</label>
                <input
                  type="text"
                  value={patient?.roomDetails?.roomDTO?.roomNumber}
                />
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Current Bed No:</label>
                <input
                  type="text"
                  value={patient?.roomDetails?.bedDTO?.bedNo}
                />
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Current Floor No:</label>
                <input
                  type="text"
                  value={patient?.roomDetails?.floorDTO?.location}
                />
              </div>
            </div>
          </div>

          <div className="iPChangeRoom-panel dis-templates">
            <div className="iPChangeRoom-panel-header">Change Room Details</div>
            <div className="iPChangeRoom-panel-content">
              {/* Bed Selection */}
              <div className="iPChangeRoom-form-row">
                <label>Select Bed:</label>
                <select onChange={handleBedSelection} value={selectedBedId || ""}>
                  <option value="" disabled>
                    Select a bed
                  </option>
                  {beds.map((bed) => (
                    <option key={bed.id} value={bed.id}>
                      {bed.bedNo || `Bed ${bed.id}`} - {bed.roomDto.roomNumber}
                    </option>
                  ))}
                </select>
              </div>

              {/* Auto-filled Fields */}
              {selectedBedDetails && (
                <>
                  <div className="iPChangeRoom-form-row">
                    <label>Room Type:</label>
                    <input
                      type="text"
                      value={selectedBedDetails.roomDto.name}
                      readOnly
                    />
                  </div>
                  <div className="iPChangeRoom-form-row">
                    <label>Room No:</label>
                    <input
                      type="text"
                      value={selectedBedDetails.roomDto.roomNumber}
                      readOnly
                    />
                  </div>
                  <div className="iPChangeRoom-form-row">
                    <label>Floor No:</label>
                    <input
                      type="text"
                      value={selectedBedDetails.roomDto.floorNumber}
                      readOnly
                    />
                  </div>
                  <div className="iPChangeRoom-form-row">
                    <label>Charge Type:</label>
                    <input
                      type="text"
                      value={selectedBedDetails.chargeType}
                      readOnly
                    />
                  </div>
                  <div className="iPChangeRoom-form-row">
                    <label>Remarks:</label>
                    <textarea value={selectedBedDetails.remarks} readOnly />
                  </div>
                </>
              )}

              {/* Previous Fields */}
              <div className="iPChangeRoom-form-row">
                <label>Change Entitlement:</label>
                <div className="iPChangeRoom-input-with-search">
                  <input type="text" />
                  <FontAwesomeIcon
                    className="iPChangeRoom-magnifier-btn"
                    icon={faSearch}
                  />
                </div>
              </div>
              <div className="iPChangeRoom-form-row">
                <label>Remarks:</label>
                <textarea name="" id=""></textarea>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="ipchangeroom-btn-blue" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default IPChangeRoom;