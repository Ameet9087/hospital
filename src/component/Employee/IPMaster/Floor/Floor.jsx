import React, { useState, useRef, useEffect } from "react";
import "./Floor.css";
import CustomModal from "../../../../CustomModel/CustomModal";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
  PopupTable
} from "../../../../FloatingInputs";
import { toast } from "react-toastify";

export default function Floor() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [fdata, setData] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [activePopup, setActivePopup] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [location, setLocation] = useState(null);

  const [form, setForm] = useState({
    name: "",
    floorNumber: "",
    orderNo: "",
    location: "",
    remarks: "",
    createByName: "",
    status: "Active",



  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);





  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/location-masters`);
        setLocation(response.data);
        console.log(response.data, "prachi");

      } catch (error) {
        console.error("Error fetching location data:", error);

      }
    };
    fetchLocationData();
  }, [])


  const getPopupData = () => {
    if (activePopup === "location") {
      return {
        columns: ["id", "locationName", "locationCode"],
        data: location,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "location") {
      setSelectedLocation(data);
      console.log(data, "selectedLocation");

      // Update formData with the selected location's ID
      setForm((prevFormData) => ({
        ...prevFormData,
        locationMaster: {
          id: data.id, // Assuming 'data' contains the location with 'id' field
        },
      }));
    }
    setActivePopup(null); // Close the popup after selection
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/floors`);
        const floors = response.data;
        setData(floors);
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, [openModel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.floorNumber || !form.orderNo || !form.location) {
      alert("Please fill all mandatory fields.");
      return;
    }

    const now = new Date();

    const createdDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

    const createdTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

    const payload = {
      name: form.name,
      createByName: form.createByName,
      floorNumber: form.floorNumber,
      orderNo: form.orderNo,
      remarks: form.remarks,
      location: form.location,
      status: form.status,
      createDate: createdDate,
      createTime: createdTime,
      locationMasterDTO: {
        id: selectedLocation?.id
      }
    };


    try {
      if (isEditing) {
        // Update functionality
        const id = fdata[editIndex]?.id; // Get the id from the selected item
        await axios.put(`${API_BASE_URL}/floors/${id}`, payload);
        toast.success("Floor updated successfully!");
      } else {
        // Add functionality
        await axios.post(`${API_BASE_URL}/floors`, payload);
        toast.success("Floor added successfully!");
      }

      setOpenModel(false);
      setForm({
        name: "",
        floorNumber: "",
        orderNo: "",
        location: "",
        remarks: "",
        createByName: "",
        status: "Active",
      });
      setIsEditing(false);
      setEditIndex(null);

      // Refresh data
      const response = await axios.get(`${API_BASE_URL}/floors`);
      setData(response.data);
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred while saving/updating the floor.");
    }
  };

  const handleEdit = (index) => {
    const selectedFloor = fdata[index];
    setForm({
      name: selectedFloor.name || "",
      floorNumber: selectedFloor.floorNumber || "",
      orderNo: selectedFloor.orderNo || "",
      location: selectedFloor.location || "",
      remarks: selectedFloor.remarks || "",
      createByName: selectedFloor.createByName || "",
      status: selectedFloor.status || "Active",
    });
    setIsEditing(true); // Enable editing mode
    setEditIndex(index); // Set the index for editing
    setOpenModel(true); // Open modal
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/floors/${id}`);
      if (response.ok) {
        const updatedData = fdata.filter((item) => item.id !== id);
        setData(updatedData);
        toast.success("Floor deleted successfully!");
      } else {
        console.error("Failed to delete the floor");
        toast.error("Error occurred while deleting the floor");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred while deleting the floor");
    }
  };

  return (
    <>
      <div className="container-fluid floor-container">
        <button
          className="add-floor-btn"
          onClick={() => {
            setForm({
              name: "",
              floorNumber: "",
              orderNo: "",
              location: "",
              remarks: "",
              createByName: "",
              status: "Active",
            });
            setIsEditing(false); // Reset editing state
            setEditIndex(null); // Reset edit index
            setOpenModel(true); // Open modal
          }}
        >
          Add Floor
        </button>

        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Floor Number",

                "Floor Name",

                "Order No",
                "Location",
                "Remarks",
                "Floor Incharge",
                "Status",
                "Actions",
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
            {fdata.length > 0 ? (
              fdata.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.floorNumber}</td>
                  <td>{item.name}</td>
                  <td>{item.orderNo}</td>
                  <td>{item.location}</td>
                  <td>{item.remarks}</td>
                  <td>{item.createByName}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className="floor-btn floor-edit-btn"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="floor-btn floor-delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <CustomModal isOpen={openModel} onClose={() => setOpenModel(false)}>
        <div className="floor-modal">
          <form className="floor-form" onSubmit={handleSubmit}>
            <span className="floors-Detail">Floor Details</span>

            <div className="floor-form-group">
              <FloatingInput
                label={"Location"}
                type="search"
                value={selectedLocation?.locationName}
                onChange={handleChange}
                onIconClick={() => setActivePopup("location")}
              />
            </div>

            <div className="floor-form-group">

              <FloatingInput
                label={"Floor Name"}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="floor-form-group">
              <FloatingInput
                label={"Floor Number"}
                type="text"
                id="floorNumber"
                name="floorNumber"
                value={form.floorNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="floor-form-group">
              <FloatingInput
                label={"Order No"}
                type="number"
                min="0"
                name="orderNo"
                value={form.orderNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="floor-form-group">
              <FloatingSelect
                label={"Location"}
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                options={[
                  { value: "North", label: "North" },
                  { value: "South", label: "South" },
                  { value: "East", label: "East" },
                  { value: "West", label: "West" },
                ]}
                required
              />
            </div>
            <div className="floor-form-group">
              <FloatingTextarea
                label={"Remarks"}
                id="remarks"
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
              />
            </div>
            <div className="floor-form-group">
              <FloatingInput
                label={"Floor Incharge"}
                type="text"
                id="createByName"
                name="createByName"
                value={form.createByName}
                onChange={handleChange}
              />
            </div>
            <div className="floor-form-group">
              <label>Status:</label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={form.status === "Active"}
                  onChange={handleChange}
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={form.status === "Inactive"}
                  onChange={handleChange}
                />
                Inactive
              </label>
            </div>
            <button type="submit" className="floor-btn">
              {isEditing ? "Update" : "Save"}
            </button>
          </form>
        </div>
      </CustomModal>
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
    </>
  );
}
