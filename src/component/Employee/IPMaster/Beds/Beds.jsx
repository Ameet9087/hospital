import React, { useState, useEffect, useRef } from "react";
import "./Beds.css";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { API_BASE_URL } from "../../../api/api";
import CustomModal from "../../../../CustomModel/CustomModal";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  PopupTable,
} from "../../../../FloatingInputs";

const Beds = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [beds, setBeds] = useState([]);
  const [editingBed, setEditingBed] = useState(null);

  const [formData, setFormData] = useState({
    bedNo: "",
    roomNo: "",
    displayOrder: "",
    chargeType: "free",
    bedStatus: "active",
    gender: "male",
    bedType: "standard",
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
      formData.roomDto = { id: selectedRoom?.id };
      let response;
      if (editingBed) {
        response = await axios.put(
          `${API_BASE_URL}/beds/${editingBed.id}`,
          formData
        );
        toast.success("Bed Updated Successfully");
      } else {
        response = await axios.post(`${API_BASE_URL}/beds`, formData);
        toast.success("Bed Added Successfully");
      }

      if (response.status === 200 || response.status === 201) {
        fetchBeds();
        setIsModalOpen(false);
        setEditingBed(null);
      }
    } catch (error) {
      console.error("Error saving bed:", error);
      toast.error("An error occurred while saving. Please try again.");
    }
  };

  const getPopupData = () => {
    if (showModal) {
      return {
        columns: ["id", "name"], // Define popup table columns
        data: rooms, // Pass room data to the popup
      };
    } else {
      return {
        columns: [],
        data: [],
      };
    }
  };

  const { columns, data } = getPopupData();

  const handleEdit = (bed) => {
    setEditingBed(bed);
    setSelectedRoom(rooms.find((item) => item.id === bed.roomDto?.id));
    setFormData({ ...bed });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/beds/${id}`);
      toast.success("Bed Deleted Successfully");
      fetchBeds();
    } catch (error) {
      console.error("Error deleting bed:", error);
      toast.error("Failed to delete bed.");
    }
  };
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
                  "remarks",
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
              {beds?.length > 0 ? (
                beds.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.chargeType}</td>
                    <td>{item.bedStatus}</td>
                    <td>{item.bedType}</td>
                    <td>{item.remarks}</td>
                    <td>
                      <button
                        className="beds-edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="beds-delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="beds-panel">
          <div className=" beds-details">
            <div className="beds-panel-header">Bed Details</div>
            <div className="beds-panel-content">
              <div className="beds-form-row">
                <FloatingInput
                  label={"Bed Number"}
                  type="text"
                  value={formData.bedNo}
                  name="bedNo"
                  onChange={handleInputChange}
                />
              </div>

              <div className="beds-form-row">
                <FloatingInput
                  label={"Room No"}
                  type="search"
                  value={selectedRoom?.roomNumber}
                  placeholder="Select Room Number"
                  onIconClick={() => setShowModal(true)}
                />
              </div>

              <div className="beds-form-row">
                <FloatingInput
                  label={"Display Order"}
                  type="text"
                  value={formData.displayOrder}
                  name="displayOrder"
                  onChange={handleInputChange}
                />
              </div>

              <div className="beds-form-row">
                <FloatingSelect
                  label={"Charge Type"}
                  value={formData.chargeType}
                  name="chargeType"
                  onChange={handleInputChange}
                  options={[
                    { value: "free", label: "free" },
                    { value: "paid", label: "paid" },
                    { value: "Partially Paid", label: "Partially Paid" },
                  ]}
                />
              </div>
              <div className="beds-form-row">
                <FloatingSelect
                  label={"Bed Status"}
                  name={"bedStatus"}
                  value={formData.bedStatus}
                  onChange={handleInputChange}
                  options={[
                    { value: "active", label: "active" },
                    { value: "inactive", label: "inactive" },
                  ]}
                />
              </div>

              <div className="beds-form-row">
                <FloatingSelect
                  label={"Gender"}
                  name={"gender"}
                  value={formData.gender}
                  onChange={handleInputChange}
                  options={[
                    { value: "active", label: "active" },
                    { value: "inactive", label: "inactive" },
                  ]}
                />
              </div>
              <div className="beds-form-row">
                <FloatingSelect
                  label={"Bed Type"}
                  value={formData.bedType}
                  name="bedType"
                  onChange={handleInputChange}
                  options={[
                    { value: "standard", label: "standard" },
                    { value: "deluxe", label: "deluxe" },
                    {
                      value: "chronologicalOrder",
                      label: "chronologicalOrder",
                    },
                    {
                      value: "sharingBed",
                      label: "sharingBed",
                    },
                    {
                      value: "Dummy",
                      label: "Dummy",
                    },
                    {
                      value: "adjustableBed",
                      label: "adjustableBed",
                    },
                    {
                      value: "bunkBed",
                      label: "bunkBed",
                    },
                    {
                      value: "sofaBed",
                      label: "sofaBed",
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Additional Bed Options Panel */}
          {/* <div className="beds-panel beds-details">
            <div className="beds-panel-content">
              <div className="beds-form-row">
                <label>Bed Type:</label>
                <select>
                  <option value="">Parent Bed</option>
                  <option value="">Child Bed</option>
                  <option value="">Chronological Order</option>
                  <option value="">Sharing Bed</option>
                  <option value="">Dummy</option>
                  <option value="">Adjustable Bed</option>
                  <option value="">Bunk Bed</option>
                  <option value="">Sofa Bed</option>
                </select>
              </div> */}
          {/* <div className="beds-form-row">

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
            </div> */}
          {/* Checkboxes */}
          {/* <div className="beds-form-row">

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
            </div> */}

          {/* <div className="beds-form-row">

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
            </div> */}

          {/* <div className="beds-form-row">

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
            </div> */}

          {/* <div className="beds-form-row">

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
            </div> */}

          {/* <div className="beds-form-row">

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
            </div> */}
        </div>
        <div className="beds-action-buttons">
          <button className="btn-blue" onClick={handleSave}>
            {editingBed ? "Update" : "Save"}
          </button>
        </div>
        {/* </div>
        </div> */}
      </CustomModal>
      {showModal && (
        <PopupTable
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
