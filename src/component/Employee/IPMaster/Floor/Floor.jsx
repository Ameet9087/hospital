import React, { useState, useRef, useEffect } from "react";
import "./Floor.css";
import CustomModal from "../../../../CustomModel/CustomModal";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

export default function Floor() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [openModel, setOpenModel] = useState(false);
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
    };

    try {
      if (isEditing) {
        // Update functionality
        const id = data[editIndex]?.id; // Get the id from the selected item
        await axios.put(`${API_BASE_URL}/floors/${id}`, payload);
        alert("Floor updated successfully!");
      } else {
        // Add functionality
        await axios.post(`${API_BASE_URL}/floors`, payload);
        alert("Floor added successfully!");
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
      alert("An error occurred while saving/updating the floor.");
    }
  };

  const handleEdit = (index) => {
    const selectedFloor = data[index];
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
      const response = await fetch(`${API_BASE_URL}/floors/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        alert("Floor deleted successfully!");
      } else {
        console.error("Failed to delete the floor");
        alert("Error occurred while deleting the floor");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("An error occurred while deleting the floor");
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
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.floorNumber}</td>
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
        <form className="floor-form" onSubmit={handleSubmit}>
          <span className="floors-Detail">Floor Details</span>
          <div className="floor-form-group">
            <label htmlFor="name">Floor Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g.,First Floor"
              required
            />
          </div>
          <div className="floor-form-group">
            <label htmlFor="floorNumber">Floor Number*</label>
            <input
              type="text"
              id="floorNumber"
              name="floorNumber"
              value={form.floorNumber}
              onChange={handleChange}
              placeholder="e.g., Floor no 1"
              required
            />
          </div>
          <div className="floor-form-group">
            <label htmlFor="orderNo">Order No*</label>
            <input
              type="number"
              id="orderNo"
              name="orderNo"
              value={form.orderNo}
              onChange={handleChange}
              placeholder="Define display order"
              required
            />
          </div>
          <div className="floor-form-group">
            <label htmlFor="location">Location*</label>
            <select
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>
          </div>
          <div className="floor-form-group">
            <label htmlFor="remarks">Remarks</label>
            <textarea
              id="remarks"
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              placeholder="Additional notes"
            ></textarea>
          </div>
          <div className="floor-form-group">
            <label htmlFor="createByName">Floor Incharge</label>
            <input
              type="text"
              id="createByName"
              name="createByName"
              value={form.createByName}
              onChange={handleChange}
              placeholder="Enter Floor Incharge"
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
      </CustomModal>
    </>
  );
}
