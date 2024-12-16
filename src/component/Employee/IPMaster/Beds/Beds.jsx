import React, { useState, useEffect, useRef } from "react";
import "./Beds.css";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { API_BASE_URL } from "../../../api/api";
import CustomModal from "../../../../CustomModel/CustomModal";
import IpMasterPopupTable from "../IpMasterPopupTable";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns"


const Beds = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [beds, setBeds] = useState([]);
  const [formData, setFormData] = useState({
    bedNo: "",
    roomNo: "",
    displayOrder: "",
    chargeType: "free",
    bedStatus: "active",
    gender: "male",
    bedType: "standard",
    // chronologicalOrder: "",
    // sharingBed: "",
    // dummy: "",
    // adjustableBed: "",
    // bunkBed: "",
    // sofaBed: "",
  });

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rooms`);
      setRooms(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchBeds = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/beds`);
      setBeds(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchBeds();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setShowModal(false);
  };

  const handleSave = async () => {
    try {
    
      formData.roomDto = {
        id: selectedRoom?.id,
      };
  
      console.log('Saving Data:', formData);
  
      // Perform the POST request using Axios
      const response = await axios.post(`${API_BASE_URL}/beds`, formData);
  
      if (response.status === 200 || response.status === 201) {
        console.log('Data saved successfully:', response.data);
  
        // Fetch updated beds list after saving
        fetchBeds();
  
        // Close the modal after successful save
        setIsModalOpen(false);
      } else {
        console.error(`Unexpected response: ${response.status}`);
      }
    } catch (error) {
      // Handle errors gracefully
      console.error('Error during save operation:', error);
      alert('An error occurred while saving the data. Please try again.');
    }
  };
  
  
  // Helper function to get modal popup data
  const getPopupData = () => {
    if (showModal) {
      return {
        columns: ["id", "name"], // Define popup table columns
        data: rooms,            // Pass room data to the popup
      };
    } else {
      return {
        columns: [],
        data: [],
      };
    }
  };
  

  const { columns, data } = getPopupData();

  return (
    <>
      <div className="beds">
        {/* <div className="beds-title-bar">
          <div className="beds-header">
            <span>Create Beds</span>
          </div>
        </div> */}
        <div className="beds-content-wrapper">
          <div className="beds-main-section">
            {/* Bed Details Panel */}
            <button
              className="beds-btn-blue"
              onClick={() => setIsModalOpen(true)}
            >
              Add New Bed
            </button>
          </div>
        </div>

        <div className="beds-table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Bed No",
                  "Charge Type",
                  "Bed Status",
                  "Bed Type",
                  "remarks"
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
              {beds?.length > 0 ? (
                beds.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.chargeType}</td>
                    <td>{item.bedStatus}</td>
                    <td>{item.bedType}</td>
                    <td>{item.remarks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="beds-panel beds-details">
          <div className="beds-panel-header">Bed Details</div>
          <div className="beds-panel-content">
            <div className="beds-form-row">
              <label>Bed Number: *</label>
              <div className="beds-input-with-search">
                <input
                  type="text"
                  value={formData.bedNo}
                  name="bedNo"
                  onChange={handleInputChange}
                  placeholder="Enter Bed Number"
                />
              </div>
            </div>

            <div className="beds-form-row">
              <label>Room No: *</label>
              <div className="beds-input-with-search">
                <input
                  type="text"
                  value={selectedRoom?.roomNumber}
                  placeholder="Select Room Number"
                  readOnly
                />
                <i
                  className="fa-solid fa-magnifying-glass"
                  onClick={() => setShowModal(true)}
                />
              </div>
            </div>

            <div className="beds-form-row">
              <label>Display Order:</label>
              <div className="beds-input-with-search">
                <input
                  type="text"
                  value={formData.displayOrder}
                  name="displayOrder"
                  onChange={handleInputChange}
                  placeholder="Display Order"
                />
              </div>
            </div>

            <div className="beds-form-row">
              <label>Charge Type:</label>
              <select value={formData.chargeType} onChange={handleInputChange}>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
                <option value="partially_paid">Partially Paid</option>
              </select>
            </div>
            <div className="beds-form-row">
              <label>Bed Status:</label>
              <select value={formData.bedStatus} onChange={handleInputChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="beds-form-row">
              <label>Gender:</label>
              <select value={formData.gender} onChange={handleInputChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Bed Options Panel */}
        <div className="beds-panel beds-details">
          <div className="beds-panel-content">
            {/* Bed Type Dropdown */}
            <div className="beds-form-row">
              <label>Bed Type:</label>
              <select value={formData.bedType} onChange={handleInputChange}>
                <option value="standard">Parent Bed</option>
                <option value="deluxe">Child Bed</option>
              </select>
            </div>
            <div className="beds-form-row">
              <label>Chronological order:</label>
              <div className="beds-input-with-search">
                <input
                  type="text"
                  value={formData.chronologicalOrder}
                  name="chronologicalOrder"
                  onChange={handleInputChange}
                  placeholder="Enter Chronological Order"
                />
              </div>
            </div>
            {/* Checkboxes */}
            <div className="beds-form-row">
              <input
                value={"sharingBed"}
                type="checkbox"
                id="sharingBed"
                onChange={formData.sharingBed}
                name="sharingBed"
                className="beds-checkbox"
              />
              <label htmlFor="sharingBed" className="beds-checkbox-label">
                Sharing Bed
              </label>
            </div>

            <div className="beds-form-row">
              <input
                type="checkbox"
                value={"dummy"}
                onChange={handleInputChange}
                name="dummy"
                id="dummy"
                className="beds-checkbox"
              />
              <label htmlFor="dummy" className="beds-checkbox-label">
                Dummy
              </label>
            </div>

            <div className="beds-form-row">
              <input
                type="checkbox"
                id="adjustableBed"
                name="adjustableBed"
                onChange={handleInputChange}
                className="beds-checkbox"
              />
              <label htmlFor="adjustableBed" className="beds-checkbox-label">
                Adjustable Bed
              </label>
            </div>

            <div className="beds-form-row">
              <input
                type="checkbox"
                id="bunkBed"
                name="bunkBed"
                value={"bunkBed"}
                onChange={handleInputChange}
                className="beds-checkbox"
              />
              <label htmlFor="bunkBed" className="beds-checkbox-label">
                Bunk Bed
              </label>
            </div>

            <div className="beds-form-row">
              <input
                type="checkbox"
                id="sofaBed"
                value={"sofaBed"}
                name="sofaBed"
                onChange={handleInputChange}
                className="beds-checkbox"
              />
              <label htmlFor="sofaBed" className="beds-checkbox-label">
                Sofa Bed
              </label>
            </div>
          </div>
          <div className="beds-action-buttons">
            <button className="btn-blue" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </CustomModal>
      {showModal && (
        <IpMasterPopupTable
          onClose={() => setShowModal(false)}
          onSelect={handleRoomSelect}
          columns={columns}
          data={data}
        />
      )}
    </>
  );
};

export default Beds;
