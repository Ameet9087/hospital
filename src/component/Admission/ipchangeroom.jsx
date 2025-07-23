import React, { useState, useEffect } from "react";
import "../Nursing/NursingModule/IPChangeRoom/IPChangeRoom.css";
import PopupTable from "../Admission/PopupTable";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { useSelector } from "react-redux";

const IPChangeRoom = ({ ipAdmission }) => {
  const [activePopup, setActivePopup] = useState(null);
  const [beds, setBeds] = useState([]);
  const [selectedBedDetails, setSelectedBedDetails] = useState(null);
  const [payType, setPaytype] = useState([]);
  const [selectedPaytype, setSelectedPytype] = useState(null);
  const [roomType, setRoomType] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState([]);
  const [room, setRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [floor, setFloor] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);

  const activePatient = useSelector((state) => state?.patient?.patientData);

  const getPopupData = () => {
    if (activePopup === "bed") {
      return { columns: ["id", "bedNo", "bedStatus"], data: beds };
    } else if (activePopup === "paytype") {
      return { columns: ["id", "payTypeName"], data: payType };
    } else if (activePopup === "roomType") {
      return { columns: ["id", "roomtype"], data: roomType };
    } else if (activePopup === "room") {
      return { columns: ["id", "name"], data: room };
    } else if (activePopup === "floor") {
      return { columns: ["id", "floorNumber"], data: floor };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "bed") {
      setSelectedBedDetails(data);
    } else if (activePopup === "paytype") {
      setSelectedPytype(data);
    } else if (activePopup === "roomType") {
      setSelectedRoomType(data);
      await fetchRoom(data.id);
    } else if (activePopup === "room") {
      setSelectedRoom(data);
      await fetchAllAvailableBeds(data.id);
    } else if (activePopup === "floor") {
      setSelectedFloor(data);
      await fetchRoomTypeByPaytypeId(data.id);
    }
    setActivePopup(null);
  };

  const fetchAllAvailableBeds = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/beds/available/${id}`);
    setBeds(response.data);
  };

  const fetchAllPaytype = async () => {
    const response = await axios.get(`${API_BASE_URL}/pay-type`);
    setPaytype(response.data);
  };
  const fetchAllFloor = async () => {
    const response = await axios.get(`${API_BASE_URL}/floors`);
    setFloor(response.data);
  };

  const fetchRoomTypeByPaytypeId = async (id) => {
    const response = await axios.get(
      `${API_BASE_URL}/room-types/available/${id}`
    );
    setRoomType(response.data);
  };

  const fetchRoom = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/rooms/available/${id}`);
    setRoom(response.data);
  };

  useEffect(() => {
    fetchAllPaytype();
    fetchAllFloor();
  }, []);

  const handleSave = async () => {
    const previousWardData = {
      payType: {
        id: ipAdmission.roomDetails?.payTypeDTO?.id,
        payTypeName: ipAdmission.roomDetails?.payTypeDTO?.payTypeName,
      },
      room: {
        id: ipAdmission.roomDetails?.roomDTO?.id,
        roomNumber: ipAdmission.roomDetails?.roomDTO?.roomNumber,
      },
      roomType: {
        id: ipAdmission?.roomDetails.roomTypeDTO?.id,
        roomType: ipAdmission?.roomDetails.roomTypeDTO?.roomType,
      },
      bed: {
        id: ipAdmission?.roomDetails?.bedDTO?.id,
        bedNo: ipAdmission?.roomDetails?.bedDTO?.bedNo,
      },
      floor: {
        id: ipAdmission?.roomDetails?.floorDTO?.id,
        floorNumber: ipAdmission?.roomDetails?.floorDTO?.floorNumber,
      },
    };
    const requestedWardData = {
      payType: {
        id: selectedPaytype?.id,
        payTypeName: selectedPaytype?.payTypeName,
      },
      room: {
        id: selectedRoom?.id,
        roomNumber: selectedRoom?.roomNumber,
      },
      roomType: {
        id: selectedRoomType?.id,
        roomType: selectedRoomType?.roomtype,
      },
      bed: {
        id: selectedBedDetails?.id,
        bedNo: selectedBedDetails?.bedNo,
      },
      floor: {
        id: selectedFloor?.id,
        floorNumber: selectedFloor?.floorNumber,
      },
    };

    const payload = {
      previousWardRequestData: JSON.stringify(previousWardData),
      updateWardRequestData: JSON.stringify(requestedWardData),
      ipAdmission: {
        ipAdmmissionId: ipAdmission.ipAdmmissionId,
      },
    };
    console.log(payload);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/ward-request-change/save`,
        payload
      );
      alert("request Success");
      setSelectedBedDetails(null); // Or {} if your initial state is an object
      setSelectedFloor(null); // Or {} if applicable
      setSelectedPytype(null);
      setSelectedRoom(null);
      setSelectedRoomType(null);
    } catch (error) {
      console.log(error);
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
                      value={
                        activePatient?.patient?.inPatientId ||
                        ipAdmission?.patient?.inPatientId
                      }
                      placeholder="Ip No"
                      readOnly
                    />
                  </div>
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Admission Date:</label>
                  <input
                    type="date"
                    value={
                      activePatient?.admissionDate || ipAdmission?.admissionDate
                    }
                  />
                </div>

                <div className="iPChangeRoom-form-row">
                  <label>Admission Time:</label>
                  <input
                    type="text"
                    value={
                      activePatient?.admissionTime || ipAdmission?.admissionTime
                    }
                  />
                </div>

                <div className="iPChangeRoom-form-row">
                  <label>Patient Name:</label>
                  <input
                    type="text"
                    value={`${activePatient?.patient?.firstName ||
                      ipAdmission?.patient?.patient?.firstName
                      } ${activePatient?.patient?.middleName ||
                      ipAdmission?.patient?.patient?.middleName
                      } ${activePatient?.patient?.lastName ||
                      ipAdmission?.patient?.patient?.lastName
                      }`}
                    readOnly
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Age:</label>
                  <input
                    type="text"
                    value={
                      activePatient?.patient?.age ||
                      ipAdmission?.patient?.patient?.age
                    }
                    readOnly
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Gender:</label>
                  <select
                    value={
                      activePatient?.patient?.gender ||
                      ipAdmission?.patient?.patient?.gender
                    }
                  >
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
                    value={
                      activePatient?.roomDetails?.payTypeDTO?.payTypeName ||
                      ipAdmission?.roomDetails?.payTypeDTO?.payTypeName
                    }
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Current Room Type:</label>
                  <input
                    type="text"
                    value={
                      activePatient?.roomDetails?.roomTypeDTO?.roomtype ||
                      ipAdmission?.roomDetails?.roomTypeDTO?.roomtype
                    }
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Current Room No:</label>
                  <input
                    type="text"
                    value={
                      activePatient?.roomDetails?.roomDTO?.roomNumber ||
                      ipAdmission?.roomDetails?.roomDTO?.roomNumber
                    }
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Current Bed No:</label>
                  <input
                    type="text"
                    value={
                      activePatient?.roomDetails?.bedDTO?.bedNo ||
                      ipAdmission?.roomDetails?.bedDTO?.bedNo
                    }
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Current Floor No:</label>
                  <input
                    type="text"
                    value={
                      activePatient?.roomDetails?.floorDTO?.location ||
                      ipAdmission?.roomDetails?.floorDTO?.location
                    }
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
                  <label>Select Paytype:</label>
                  <input
                    type="text"
                    value={selectedPaytype?.payTypeName || ""}
                  />
                  <i
                    onClick={() => setActivePopup("paytype")}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                </div>

                <div className="iPChangeRoom-form-row">
                  <label>Floor:</label>
                  <input type="text" value={selectedFloor?.floorNumber || ""} />
                  <i
                    onClick={() => setActivePopup("floor")}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Room Type:</label>
                  <input type="text" value={selectedRoomType?.roomtype || ""} />
                  <i
                    onClick={() => setActivePopup("roomType")}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Room No:</label>
                  <input type="text" value={selectedRoom?.roomNumber || ""} />
                  <i
                    onClick={() => setActivePopup("room")}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Bed No:</label>
                  <input type="text" value={selectedBedDetails?.bedNo || ""} />
                  <i
                    onClick={() => setActivePopup("bed")}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Charge Type:</label>
                  <input
                    type="text"
                    value={selectedBedDetails?.chargeType || ""}
                    readOnly
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <label>Remarks:</label>
                  <textarea />
                </div>

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
