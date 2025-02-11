import React, { useState, useEffect, useRef } from "react";
import "./Roominfo.css";
import { API_BASE_URL } from "../../../api/api";
import CustomModal from "../../../../CustomModel/CustomModal";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import axios from "axios";
import {
  PopupTable,
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";
import { toast } from "react-toastify";

const Roominfo = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formdata, setFormdata] = useState({
    roomNumber: "",
    floorNumber: "",
    orderNumber: "",
    facilities: "",
    inventoryDepartment: "",
    defaultID: "",
  });
  const [floor, setFloor] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [roomType, setRoomType] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [activePopup, setActivePopup] = useState("");
  const [roomData, setRoomData] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [floorTypes, setFloorTypes] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormdata((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "roomNumber") {
      setFormdata((prevData) => ({
        ...prevData,
        defaultID: `Room_${value}`,
        name: `Room_${value}`,
      }));
    }
  };

  const getPopupData = () => {
    if (activePopup === "floor") {
      return {
        columns: ["id", "floorNumber", "floorName", "location"],
        data: floor,
      };
    } else if (activePopup === "roomType") {
      return { columns: ["id", "roomtype", "type"], data: roomType };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "floor") {
      setSelectedFloor(data);
      console.log(data);
    } else if (activePopup === "roomType") {
      setSelectedRoomType(data);
    }
    setActivePopup(null); // Close the popup after selection
  };

  const fetchAllRooms = async () => {
    const response = await axios.get(`${API_BASE_URL}/rooms`);
    setRoomData(response.data);
  };
  useEffect(() => {
    fetchAllRooms();
  }, []);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/room-types`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRoomType(data);
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };
    fetchRoomTypes();
  }, []);

  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/floors`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFloor(data);
      } catch (error) {
        console.error("Error fetching floor types:", error);
      }
    };
    fetchFloors();
  }, []);

  const handleSave = async () => {
    const updateFormData = {
      ...formdata,
      name: roomName,
      roomType: { id: selectedRoomType?.id },
      floor: { id: selectedFloor?.id },
    };

    try {
      if (editingRoom) {
        await axios.put(
          `${API_BASE_URL}/rooms/${editingRoom.id}`,
          updateFormData
        );
        toast.success("Room Updated Successfully");
      } else {
        await axios.post(`${API_BASE_URL}/rooms`, updateFormData);
        toast.success("Room Created Successfully");
      }
      fetchAllRooms();
      setShowModal(false);
    } catch (error) {
      toast.error("Error saving room");
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormdata(room);
    setSelectedFloor(room.floor);
    setSelectedRoomType(room.roomType);
    setRoomName(room.name);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/rooms/${id}`);
      setRoomData(roomData.filter((room) => room.id !== id));
      toast.success("Room Deleted Successfully");
      fetchAllRooms();
    } catch (error) {
      toast.error("Error deleting room");
    }
  };

  return (
    <>
      <div className="room-info">
        {/* <div className="room-info-title-bar">
          <div className="room-info-header">
            <span>Create Rooms</span>
          </div>
        </div> */}
        <button className="room-add-btn" onClick={() => setShowModal(true)}>
          Add Room
        </button>

        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Room Name",
                "Room Number",
                "DefaultID",
                "Floor Number",
                "Order Number",
                "Facilities",
                "Inventory Department",
                "Room Status",
                "Action",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] || "auto" }}
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
            {roomData?.length > 0 ? (
              roomData.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.roomNumber}</td>
                  <td>{item.defaultID}</td>
                  <td>{item.floorNumber}</td>
                  <td>{item.orderNumber}</td>
                  <td>{item.facilities}</td>
                  <td>{item.inventoryDepartment}</td>
                  <td>{item.roomStatus}</td>
                  <td>
                    <button
                      className="room-add-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="room-del-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="room-info-content-wrapper">
          <div className="room-info-main-section">
            <div className="room-info-panel room-info-details">
              <div className="room-info-panel-header">Room Details</div>
              <div className="room-info-panel-content">
                <div className="room-info-form-row">
                  <FloatingInput
                    label={"Room Number"}
                    type="text"
                    value={formdata.roomNumber}
                    name="roomNumber"
                    onChange={handleChange}
                  />
                </div>
                <div className="room-info-form-row">
                  <FloatingInput
                    label={"DEFAULT ID"}
                    type="text"
                    value={formdata.defaultID}
                    name="defaultID"
                    readOnly
                  />
                </div>
                <div className="room-info-form-row">
                  <FloatingInput
                    label={"Name"}
                    type="text"
                    onChange={(e) => setRoomName(e.target.value)}
                    name="name"
                  />
                </div>
                <div className="room-info-form-row">
                  <FloatingInput
                    label={"Order Number"}
                    type="text"
                    name="orderNumber"
                    value={formdata.orderNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="room-info-form-row">
                  <FloatingInput
                    label={"Room Type"}
                    type="search"
                    value={selectedRoomType?.roomtype}
                    onIconClick={() => setActivePopup("roomType")}
                  />
                </div>

                <div className="room-info-form-row">
                  <FloatingInput
                    label={"Floor Number"}
                    type="search"
                    value={selectedFloor?.floorNumber}
                    onIconClick={() => setActivePopup("floor")}
                  />
                </div>

                <div className="room-info-form-row">
                  <FloatingTextarea
                    label={"Facilities"}
                    value={formdata.facilities}
                    name="facilities"
                    onChange={handleChange}
                  />
                </div>

                <div className="room-info-form-row">
                  <FloatingInput
                    label="Inventory Department"
                    type="text"
                    name="inventoryDepartment"
                    value={formdata.inventoryDepartment}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="roomtypeaddbtn">
            <button className="rooms-add-btn" onClick={handleSave}>
              {editingRoom ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </CustomModal>
      {activePopup && (
        <PopupTable
          onClose={() => setActivePopup(null)}
          onSelect={handleSelect}
          columns={columns}
          data={data}
        />
      )}
    </>
  );
};

export default Roominfo;
