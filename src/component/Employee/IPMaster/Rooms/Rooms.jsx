import React, { useEffect, useRef, useState } from "react";
import "./Rooms.css";
import axios from "axios";
import CustomModel from "../../../../CustomModel/CustomModal";
import IpMasterPopupTable from "../IpMasterPopupTable";
import { API_BASE_URL } from "../../../api/api";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

const Rooms = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const userList = ['Nursing Charges Pirangut', 'RMO Charges', 'RMO Charges Pirangut', 'nurse charge'];

  // const [services, setServices] = useState([
  //   { id: 1, name: '', rate: '' },
  //   { id: 2, name: '', rate: '' },
  // ]);

  const [formdata, setFormdata] = useState({
    roomtype: "",
    minimumAdvance: 0,
    roomrent: 0,
    status: "Available",
    advRes: "",
    wardName: "",
    displayRoom: "",
    transitBed: "",
    nursery: "",
    frequencyOfDailyAssessment: 0,
    type: "Private",
    sacCode: 0,
  });
  const [activePopup, setActivePopup] = useState("");
  const [floor, setFloor] = useState([]);
  const [payType, setPaytype] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedPayType, setSelectedPayType] = useState(null);
  const [roomType, setRoomType] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormdata((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getPopupData = () => {
    if (activePopup === "floor") {
      return {
        columns: ["id", "floorNumber", "floorName", "location"],
        data: floor,
      };
    } else if (activePopup === "paytype") {
      return { columns: ["id", "payTypeName"], data: payType };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "floor") {
      setSelectedFloor(data);
    } else if (activePopup === "paytype") {
      setSelectedPayType(data);
    }
    setActivePopup(null); // Close the popup after selection
  };

  const handleSaveServices = async () => {
    formdata.floor = {
      id: selectedFloor?.id,
    };
    formdata.payType = {
      id: selectedPayType?.id,
    };
    const response = await axios.post(`${API_BASE_URL}/room-types`, formdata);
    setIsModalOpen(false);
    alert("RoomType Added Successfully");
    fetchAllRoomTypeData();
  };

  const fetchFloor = async () => {
    const response = await axios.get(`${API_BASE_URL}/floors`);
    return response.data;
  };

  const fetchPayType = async () => {
    const response = await axios.get(`${API_BASE_URL}/pay-type`);
    return response.data;
  };

  const fetchAllRoomTypeData = async () => {
    const response = await axios.get(`${API_BASE_URL}/room-types`);
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [floorData, payTypeData, roomTypeData] = await Promise.all([
          fetchFloor(),
          fetchPayType(),
          fetchAllRoomTypeData(),
        ]);

        // Assuming these functions return data that you want to use
        setFloor(floorData);
        setPaytype(payTypeData);
        setRoomType(roomTypeData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show a user-friendly message)
      }
    };

    fetchData();
  }, []);

  // const handleServiceChange = (id, field, value) => {
  //   setServices(services.map((service) =>
  //     service.id === id ? { ...service, [field]: value } : service
  //   ));
  // };

  // const handleAddRow = () => {
  //   const newRow = {
  //     id: services.length + 1,
  //     name: `Service ${services.length + 1}`,
  //     rate: 100, // Default rate
  //   };
  //   setServices([...services, newRow]);
  // };

  // const handleSelectFromModal = (value) => {
  //   setSelectedAutoIncrementType(value); // Set the selected value
  //   closeModal(); // Close the modal after selection
  // };

  // const handleDeleteRow = (id) => {
  //   setServices(services.filter((service) => service.id !== id));
  // };

  // const handleStatusChange = (e) => {
  //   setRoomStatus(e.target.value);
  // };

  const openModal = () => {
    setIsModalOpen(true);
  };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSearchQuery('');
  //   setCurrentPage(1);
  // };

  // const handleSearch = (e) => {
  //   setSearchQuery(e.target.value);
  //   setCurrentPage(1); // Reset to the first page on new search
  // };

  // const filteredUsers = userList.filter(user =>
  //   user.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <>
      <div className="rooms">
        {/* <div className="rooms-title-bar">
        <div className="rooms-header">
          <span>Rooms Types Details</span>
        </div>
      </div> */}
        <button className="room-add-btn" onClick={openModal}>
          Add Room Type
        </button>

        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Room Type",
                "Minimum Advance",
                "Room Rent",
                "Status",
                "Ward Name",
                "Type",
                "Dialysis Room",
                "Transit Bed",
                "Nursery Room Type",
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
            {roomType?.length > 0 ? (
              roomType.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.roomtype}</td>
                  <td>{item.minimumAdvance}</td>
                  <td>{item.roomrent}</td>
                  <td>{item.status}</td>
                  <td>{item.wardName}</td>
                  <td>{item.type}</td>
                  <td>{item.displayRoom}</td>
                  <td>{item.transitBed}</td>
                  <td>{item.nursery}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-data">
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CustomModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="rooms-content-wrapper">
            <div className="rooms-main-section">
              <div className="rooms-panel rooms-details">
                <div className="rooms-panel-header">Add Room Type Details</div>
                <div className="rooms-panel-content">
                  <div className="rooms-form-row">
                    <label>Room Type: *</label>
                    <div className="rooms-input-with-search">
                      <input
                        type="text"
                        value={formdata.roomtype}
                        name="roomtype"
                        onChange={handleChange}
                        placeholder="Enter Room Type"
                      />
                    </div>
                  </div>
                  <div className="rooms-form-row">
                    <label>Minimum Advance: *</label>
                    <div className="rooms-input-with-search">
                      <input
                        type="number"
                        value={formdata.minimumAdvance}
                        name="minimumAdvance"
                        min={1}
                        onChange={handleChange}
                        placeholder="Minimum Advance"
                      />
                    </div>
                  </div>
                  <div className="rooms-form-row">
                    <label>Room Rent</label>
                    <div className="rooms-input-with-search">
                      <input
                        type="text"
                        onChange={handleChange}
                        value={formdata.roomrent}
                        name="roomrent"
                        placeholder="Enter Room Rent"
                      />
                    </div>
                  </div>
                  <div className="rooms-form-row">
                    <label>Adv Res</label>
                    <div className="rooms-input-with-search">
                      <input
                        type="text"
                        value={formdata.advRes}
                        name="advRes"
                        onChange={handleChange}
                        placeholder="Adv Res"
                      />
                    </div>
                  </div>
                  <div className="rooms-form-row">
                    <label>Floor</label>
                    <div className="rooms-input-with-search">
                      <input
                        type="text"
                        value={selectedFloor?.floorNumber}
                        onChange={handleChange}
                        placeholder="Search Floor"
                      />
                      <i
                        onClick={() => setActivePopup("floor")}
                        className="fa-solid fa-magnifying-glass"
                      ></i>
                    </div>
                  </div>
                  <div className="rooms-form-row">
                    <label>Paytype</label>
                    <div className="rooms-input-with-search">
                      <input
                        type="text"
                        value={selectedPayType?.payTypeName}
                        onChange={handleChange}
                        placeholder="Search Paytype"
                      />
                      <i
                        onClick={() => setActivePopup("paytype")}
                        className="fa-solid fa-magnifying-glass"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Room Options Panel */}
              <div className="rooms-panel rooms-details">
                <div className="rooms-panel-content">
                  <div className="rooms-form-row">
                    <input
                      type="checkbox"
                      value={"Yes"}
                      checked={formdata.displayRoom}
                      name="displayRoom"
                      onChange={handleChange}
                    />
                    <label>Dialysis Room</label>
                  </div>
                  <div className="rooms-form-row">
                    <input
                      type="checkbox"
                      value={"Yes"}
                      checked={formdata.transitBed}
                      name="transitBed"
                      onChange={handleChange}
                    />
                    <label>Transit Bed</label>
                  </div>
                  <div className="rooms-form-row">
                    <input
                      type="checkbox"
                      value={"Yes"}
                      checked={formdata.nursery}
                      name="nursery"
                      onChange={handleChange}
                    />
                    <label>Nursery Room Type</label>
                  </div>

                  <div className="rooms-form-row">
                    <label>Type:</label>
                    <select
                      onChange={handleChange}
                      value={formdata.type}
                      name="type"
                    >
                      <option>Select Type</option>
                      <option value={"Private"}>Private</option>
                      <option value={"Semi Private"}>Semi Private</option>
                      <option value={"General"}>General</option>
                    </select>
                  </div>

                  <div className="rooms-form-row">
                    <label>Frequency of Daily Assesment :</label>
                    <div className="rooms-input-with-search">
                      <input
                        type="text"
                        value={formdata.frequencyOfDailyAssessment}
                        name="frequencyOfDailyAssessment"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="rooms-form-row">
                    <label>SAC Code:</label>
                    <input
                      type="text"
                      value={formdata.sacCode}
                      name="sacCode"
                      onChange={handleChange}
                      placeholder="SAC Code"
                    />
                  </div>

                  {/* <div className="rooms-form-row">
                <label>GST Category:</label>
                <input type="text" placeholder='GST Category' />
              </div> */}
                  <div className="rooms-form-row">
                    <label>Status: *</label>
                    <div className="rooms-radio-buttons">
                      <input
                        type="radio"
                        id="active"
                        name="status"
                        value="Available"
                        checked={formdata.status === "Available"}
                      />
                      <label htmlFor="active" className="rooms-radio-label">
                        Active
                      </label>
                      <input
                        type="radio"
                        id="inactive"
                        name="status"
                        value="inactive"
                        checked={formdata.status === "Not Available"}
                      />
                      <label htmlFor="inactive" className="rooms-radio-label">
                        Inactive
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="rooms-button-section">
          <button className="rooms-btn service-charge-btn" onClick={() => setSelectedTab('services')}>
            Service Charges
          </button>
        </div> */}
            {/* {selectedTab === 'services' && (
          <div className="rooms-table-section">
            <table className="rooms-table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>SN</th>
                  <th>Service Name</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <button className='rooms-add-btn' onClick={handleAddRow}>Add Row</button>
                      <button className='rooms-delete-btn' onClick={() => handleDeleteRow(service.id)}>Delete</button>
                    </td>
                    <td>{service.id}</td>
                    <td>
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => handleServiceChange(service.id, 'name', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={service.rate}
                        onChange={(e) => handleServiceChange(service.id, 'rate', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )} */}
            <div className="roomtypeaddbtn">
              <button className="rooms-add-btn" onClick={handleSaveServices}>
                Save
              </button>
            </div>
          </div>
        </CustomModel>
      )}

      {activePopup && (
        <IpMasterPopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
    </>
  );
};

export default Rooms;
