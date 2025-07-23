import React, { useState, useEffect } from "react";
import "./IPChangeRoom.css";
import PopupTable from "../../../../FloatingInputs/PopupTable";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";
import { useSelector } from "react-redux";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";
import { toast } from "react-toastify";
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
    const response = await axios.get(`${API_BASE_URL}/beds/1`);
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
      `${API_BASE_URL}/room-types`
    );
    setRoomType(response.data);
  };

  const fetchRoom = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/rooms/available/${id}`);
    setRoom(response.data);
  };



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
      toast.success("data save Successfull");
      setSelectedBedDetails(null); // Or {} if your initial state is an object
      setSelectedFloor(null); // Or {} if applicable
      setSelectedPytype(null);
      setSelectedRoom(null);
      setSelectedRoomType(null);
    } catch (error) {
      console.log(error);
      toast.error("data save failed");
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
                  <FloatingInput
                    label={"IP No"}
                    type="text"
                    value={
                      activePatient?.patient?.inPatientId ||
                      ipAdmission?.patient?.inPatientId
                    }
                    readOnly
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <FloatingInput
                    label={"Admission Date"}
                    type="date"
                    value={
                      activePatient?.admissionDate || ipAdmission?.admissionDate
                    }
                    readOnly
                  />
                </div>

                <div className="iPChangeRoom-form-row">
                  <FloatingInput
                    label={"Admission Time"}
                    type="text"
                    value={
                      activePatient?.admissionTime || ipAdmission?.admissionTime
                    }
                    readOnly
                  />
                </div>

                <div className="iPChangeRoom-form-row">
                  <FloatingInput
                    label={"Patient Name"}
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
                  <FloatingInput
                    label={"Age"}
                    type="text"
                    value={
                      activePatient?.patient?.age ||
                      ipAdmission?.patient?.patient?.age
                    }
                    readOnly
                  />
                </div>

                <div className="iPChangeRoom-form-row">
                  <FloatingSelect
                    label="Gender"
                    name="gender"
                    value={
                      activePatient?.patient?.gender ||
                      ipAdmission?.patient?.patient?.gender
                    }
                    onChange={(e) => {
                      const selectedGender = e.target.value;
                      // Handle your change logic here, like directly setting the value if needed
                      ipAdmission.patient.patient.gender = selectedGender;
                    }}
                    options={[
                      { value: "", label: "Select Gender" }, // Default option
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="iPChangeRoom-panel operation-details">
              <div className="iPChangeRoom-panel-header">
                Current Room Details
              </div>
              <div className="iPChangeRoom-panel-content">
                <div className="iPChangeRoom-form-row">
                  <FloatingInput
                    label={"Current Pay Type"}
                    type="text"
                    value={
                      activePatient?.roomDetails?.payTypeDTO?.payTypeName ||
                      ipAdmission?.roomDetails?.payTypeDTO?.payTypeName
                    }
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <FloatingInput
                    label={"Current Room Type"}
                    type="text"
                    value={
                      activePatient?.roomDetails?.roomTypeDTO?.roomtype ||
                      ipAdmission?.roomDetails?.roomTypeDTO?.roomtype
                    }
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <FloatingInput
                    label={"Current Room No"}
                    type="text"
                    value={
                      activePatient?.roomDetails?.roomDTO?.roomNumber ||
                      ipAdmission?.roomDetails?.roomDTO?.roomNumber
                    }
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <FloatingInput
                    label={"Current Bed No"}
                    type="text"
                    value={
                      activePatient?.roomDetails?.bedDTO?.bedNo ||
                      ipAdmission?.roomDetails?.bedDTO?.bedNo
                    }
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <FloatingInput
                    label={"Current Floor No"}
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
                  <FloatingInput
                    label={"Select Pay Type"}
                    type="search"
                    value={selectedPaytype?.payTypeName}
                    onIconClick={() => setActivePopup("paytype")}
                  />
                </div>

                <div className="iPChangeRoom-form-row">
                  <FloatingInput
                    label={"Floor"}
                    type="search"
                    value={selectedFloor?.floorNumber}
                    onIconClick={() => setActivePopup("floor")}
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <FloatingInput
                    label={"Room Type"}
                    type="search"
                    value={selectedRoomType?.roomtype}
                    onIconClick={() => setActivePopup("roomType")}
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <FloatingInput
                    label={"Room No"}
                    type="search"
                    value={selectedRoom?.roomNumber}
                    onIconClick={() => setActivePopup("room")}
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <FloatingInput
                    label={"Bed No"}
                    type="search"
                    value={selectedBedDetails?.bedNo}
                    onIconClick={() => setActivePopup("bed")}
                  />
                </div>
                <div className="iPChangeRoom-form-row">
                  <FloatingInput
                    label={"Charge Type"}
                    type="text"
                    value={selectedBedDetails?.chargeType}
                    readOnly
                  />
                </div>
                <div className="iPChangeRoom-form-row">

                  <FloatingTextarea
                    label={"Remarks"}

                  />
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
