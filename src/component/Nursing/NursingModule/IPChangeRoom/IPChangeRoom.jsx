import React, { useState, useEffect } from "react";
import "./iPChangeRoom.css";
import PopupTable from "../PopUpTableBedTransfer/PopupTable";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";
import { useSelector } from "react-redux";

const IPChangeRoom = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [beds, setBeds] = useState([]);
  const [selectedBedId, setSelectedBedId] = useState(null);
  const [selectedBedDetails, setSelectedBedDetails] = useState(null);

  const activePatient = useSelector((state) => state.patient.patientData);

  const getPopupData = () => {
    if (activePopup === "bed") {
      return { columns: ["id", "bedNo", "bedStatus"], data: beds };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "bed") {
      setSelectedBedDetails(data);
      set;
    }
    setActivePopup(null);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/beds`)
      .then((response) => response.json())
      .then((data) => setBeds(data))
      .catch((error) => console.error("Error fetching beds:", error));
  }, []);

  const handleSave = async () => {
    if (!selectedBedDetails || !patient) {
      alert("Please fill in all required fields");
      return;
    }

    const { roomDto, id: newBedId } = selectedBedDetails; // New bed details
    const newRoomId = roomDto.id; // New room ID
    const newFloorId = roomDto.floorNumber;
    const oldRoomId = activePatient.roomDetails?.roomDTO.id;
    const oldBedId = activePatient.roomDetails?.bedDTO.id;
    const ipAdmissionId = activePatient.patient.inPatientId; // IP Admission ID

    const apiUrl = `${API_BASE_URL}/roomdetails/change?oldRoomId=${oldRoomId}&newRoomId=${newRoomId}&newBedId=${newBedId}&newFloorId=${newFloorId}&ipAdmissionId=${ipAdmissionId}&oldBedId=${oldBedId}`;
    console.log("API URL:", apiUrl);
    console.log("Old Room ID:", oldRoomId);
    console.log("Old Bed ID:", oldBedId);

    try {
      const response = await axios.put(apiUrl);

      // Check for success response
      if (response.status === 200) {
        setSelectedBedId(null);
        setSelectedBedDetails(null);
        console.log("Response:", response.data);
        onclose();
      } else {
        alert(`Failed to save changes: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error saving room change:", error);
      alert("An error occurred while saving changes.");
    }
  };

  return (
    <>
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
                      value={activePatient.patient?.inPatientId || ""}
                      placeholder="Ip No"
                      readOnly
                    />
                  </div>
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Admission Date:</label>
                  <input type="date" value={activePatient?.admissionDate} />
                </div>

                <div className="iPChangeRoom-form-row">
                  <label>Admission Time:</label>
                  <input type="text" value={activePatient?.admissionTime} />
                </div>

                <div className="iPChangeRoom-form-row">
                  <label>Patient Name:</label>
                  <input
                    type="text"
                    value={`${activePatient.patient?.firstName || ""} ${
                      activePatient.patient?.middleName || ""
                    } ${activePatient.patient?.lastName || ""}`}
                    readOnly
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Age:</label>
                  <input
                    type="text"
                    value={activePatient.patient?.age || ""}
                    readOnly
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Gender:</label>
                  <select value={activePatient.patient?.gender}>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                  </select>
                </div>
                {/* <div className="iPChangeRoom-form-row">
                  <label>Change Date:</label>
                  <input
                    type="date"
                    value={changeDate}
                    onChange={(e) => setChangeDate(e.target.value)}
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Change Time:</label>
                  <input
                    type="time"
                    value={changeTime}
                    onChange={(e) => setChangeTime(e.target.value)}
                  />
                </div> */}
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
                    value={activePatient.roomDetails?.payTypeDTO?.payTypeName}
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Current Room Type:</label>
                  <input
                    type="text"
                    value={activePatient.roomDetails?.roomTypeDTO?.type}
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Current Room No:</label>
                  <input
                    type="text"
                    value={activePatient.roomDetails?.roomDTO?.roomNumber}
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Current Bed No:</label>
                  <input
                    type="text"
                    value={activePatient.roomDetails?.bedDTO?.bedNo}
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Current Floor No:</label>
                  <input
                    type="text"
                    value={activePatient.roomDetails?.floorDTO?.location}
                  />
                </div>
              </div>
            </div>

            <div className="iPChangeRoom-panel dis-templates">
              <div className="iPChangeRoom-panel-header">
                Change Room Details
              </div>
              <div className="iPChangeRoom-panel-content">
                <div className="iPChangeRoom-form-row">
                  <label>Select Bed:</label>
                  <input type="text" value={selectedBedDetails?.bedNo} />
                  <i
                    onClick={() => setActivePopup("bed")}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                </div>
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
                      <textarea />
                    </div>
                  </>
                )}

                {/* <div className="iPChangeRoom-form-row">
                  <label>Change Entitlement:</label>
                  <div className="iPChangeRoom-input-with-search">
                    <input type="text" />
                    <FaSearch
                      onClick={handleSearchClick}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div> */}
                {/* <div className="iPChangeRoom-form-row">
                <label>Remarks:</label>
                <textarea name="" id=""></textarea>
              </div> */}
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
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onClose={() => setActivePopup(null)}
          onSelect={handleSelect}
        />
      )}
    </>
  );
};

export default IPChangeRoom;
