import React, { useState, useEffect, useRef } from 'react';
import './Roominfo.css';
import { API_BASE_URL } from '../../../api/api';
import CustomModal from '../../../../CustomModel/CustomModal';
import IpMasterPopupTable from '../IpMasterPopupTable';
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns"
import axios from 'axios';


const Roominfo = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [formdata, setFormdata] = useState({
    roomNumber: "",
    floorNumber: "",
    orderNumber: "",
    facilities: "",
    inventoryDepartment: "",
    defaultID: ""
  });
  const [floor, setFloor] = useState([])
  const [selectedFloor, setSelectedFloor] = useState(null)
  const [roomType, setRoomType] = useState([])
  const [selectedRoomType, setSelectedRoomType] = useState(null)
  const [activePopup, setActivePopup] = useState("");
  const [roomData, setRoomData] = useState([]);
  const [roomName,setRoomName] = useState("");
  const [floorTypes,setFloorTypes]=useState([]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormdata((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === "roomNumber") {
      setFormdata((prevData) => ({
        ...prevData, defaultID: `Room_${value}`,name:`Room_${value}`
      }))
    }
  };

  const getPopupData = () => {
    if (activePopup === "floor") {
      return { columns: ["id", "floorNumber", "floorName", "location"], data: floor };
    } else if (activePopup === "roomType") {
      return { columns: ["id", "roomtype", "type"], data: roomType };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "floor") {
      setSelectedFloor(data)
      console.log(data);
      
    } else if (activePopup === "roomType") {
      setSelectedRoomType(data)
    }
    setActivePopup(null); // Close the popup after selection
  };


  useEffect(() => {
    const fetchAllRooms = async () => {
      const response = await axios.get(`${API_BASE_URL}/rooms`)
      setRoomData(response.data)
    }
    fetchAllRooms()
  }, [])


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
        console.error('Error fetching room types:', error);
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
        console.error('Error fetching floor types:', error);
      }
    };
    fetchFloors();
  }, []);

  const handleSave = async () => {
    // Update the formdata object with nested properties
    formdata.roomType = {
      id: selectedRoomType?.id
    };
  
    formdata.floor = {
      id: selectedFloor?.id
    };
  
    // Create the updated form data object
    const updateFormData = { ...formdata, name: roomName };
  
    console.log('Request Payload:', updateFormData);
  
    try {
      const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Convert the object to a JSON string
        body: JSON.stringify(updateFormData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log('Room created successfully');
    } catch (error) {
      console.error('Error saving room:', error);
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
        <button className='room-add-btn' onClick={() => setShowModal(true)}>Add Room</button>

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
                "Room Status"
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
            {/* Room Details Panel */}
            <div className="room-info-panel room-info-details">
              <div className="room-info-panel-header">Room Details</div>
              <div className="room-info-panel-content">
                <div className="room-info-form-row">
                  <label>Room Number: *</label>
                  <div className="room-info-input-with-search">
                    <input
                      type="text"
                      value={formdata.roomNumber}
                      name='roomNumber'
                      onChange={handleChange}
                      placeholder="Enter Room Number"
                    />
                  </div>
                </div>
                <div className="room-info-form-row">
                  <label>DEFAULT ID:</label>
                  <div className="room-info-input-with-search">
                    <input
                      type="text"
                      value={formdata.defaultID}
                      name='defaultID'
                      placeholder="Enter Default ID"
                      readOnly
                    />
                  </div>
                </div>
                <div className="room-info-form-row">
                  <label>Name:</label>
                  <div className="room-info-input-with-search">
                    <input
                      type="text"
                      onChange={(e)=>setRoomName(e.target.value)}
                      name='name'
                      placeholder="Enter Name"
                    />
                  </div>
                </div>
                <div className="room-info-form-row">
                  <label>Room Type : *</label>
                  <div className="room-info-input-with-search">
                    <input
                      type="text"
                      value={selectedRoomType?.roomtype}
                      placeholder="Search Room Type"
                      readOnly
                    />
                    <i onClick={() => setActivePopup("roomType")} className='fa-solid fa-magnifying-glass'></i>
                  </div>
                </div>

                <div className="room-info-form-row">
                  <label>Floor Number:*</label>
                  <div className="room-info-input-with-search">
                    <input
                      type="number"
                      value={selectedFloor?.floorNumber}
                      placeholder="Search Floor"
                      readOnly
                    />
                    <i onClick={() => setActivePopup("floor")} className='fa-solid fa-magnifying-glass'></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Room Options Panel */}
            <div className="room-info-panel room-info-details">
              <div className="room-info-panel-content">
                <div className="room-info-form-row">
                  <label>Order Number</label>
                  <div className="room-info-input-with-search">
                    <input
                      type="text"
                      name='orderNumber'
                      value={formdata.orderNumber}
                      onChange={handleChange}
                      placeholder="Enter Order Number"
                    />
                  </div>
                </div>

                <div className="room-info-form-row">
                  <label>Facilities:</label>
                  <textarea
                    value={formdata.facilities}
                    name='facilities'
                    onChange={handleChange}
                    placeholder="Enter Facilities"
                  />
                </div>

                <div className="room-info-form-row">
                  <label>Inventory Department : </label>
                  <div className="room-info-input-with-search">
                    <input
                      type="text"
                      name='inventoryDepartment'
                      value={formdata.inventoryDepartment}
                      onChange={handleChange}
                      placeholder="Enter Department"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='roomtypeaddbtn'>
            <button className="rooms-add-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </CustomModal>
      {activePopup && (
        <IpMasterPopupTable
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
