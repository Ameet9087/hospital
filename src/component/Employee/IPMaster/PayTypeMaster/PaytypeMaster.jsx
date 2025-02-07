import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./PaytypeMaster.css";
import CustomModal from "../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../api/api";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { toast } from "react-toastify";
import { FloatingInput } from "../../../../FloatingInputs";

export default function PaytypeMaster() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [allData, setAllData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formdata, setFormdata] = useState({
    payTypeName: "",
    payOrder: "",
    activeStatus: "",
    opdCategory: "",
    categoryCode: "",
  });

  useEffect(() => {
    handleLoadData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setError("");
    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/pay-type/${editId}`, formdata);
        toast.success("Data updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/pay-type`, formdata);
        toast.success("Data saved successfully!");
      }
      setIsModalOpen(false);
      setIsEditing(false);
      setEditId(null);
      handleLoadData();
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data. Please try again.");
    }
  };

  const handleLoadData = async () => {
    const response = await axios.get(`${API_BASE_URL}/pay-type`);
    setAllData(response.data);
  };

  const handleEdit = (item) => {
    setFormdata(item);
    setIsEditing(true);
    setEditId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`${API_BASE_URL}/pay-type/${id}`);
        toast.success("Record deleted successfully!");
        handleLoadData();
      } catch (error) {
        console.error("Error deleting record:", error);
        toast.error("Failed to delete record. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="paytypemaster-button-container">
        <button
          onClick={() => {
            setIsEditing(false);
            setFormdata({
              payTypeName: "",
              payOrder: "",
              activeStatus: "",
              opdCategory: "",
              categoryCode: "",
            });
            setIsModalOpen(true);
          }}
        >
          Create Paytype
        </button>
      </div>
      <div className="paytypemaster-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Pay Type Name",
                "Pay Type Order",
                "Active Status",
                "Category Code",
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
            {allData.length > 0 ? (
              allData.map((item) => (
                <tr key={item.id}>
                  <td>{item.payTypeName}</td>
                  <td>{item.payOrder}</td>
                  <td>{item.activeStatus}</td>
                  <td>{item.categoryCode}</td>
                  <td>
                    <button
                      className="paytypemaster-table-button"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="paytypemaster-table-button-del"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
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
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="paytypemaster-modal-container">
          <div className="paytypemaster-row">
            <FloatingInput
              label={"Paytype Name"}
              type="text"
              value={formdata.payTypeName}
              name="payTypeName"
              onChange={handleChange}
            />
          </div>
          <div className="paytypemaster-row">
            <FloatingInput
              label={"Order"}
              type="text"
              value={formdata.payOrder}
              name="payOrder"
              restrictions={{ number: true }}
              onChange={handleChange}
            />
          </div>
          <div className="paytypemaster-row">
            <FloatingInput
              label={"Category Code"}
              type="text"
              value={formdata.categoryCode}
              name="categoryCode"
              onChange={handleChange}
            />
          </div>
          <div className="paytypemaster-row">
            <label className="paytypemaster-label">Active Status:</label>
            <div className="paytypemaster-radio-group">
              <label>
                <input
                  type="radio"
                  value="active"
                  checked={formdata.activeStatus === "active"}
                  name="activeStatus"
                  onChange={handleChange}
                />{" "}
                Active
              </label>{" "}
              <label>
                <input
                  type="radio"
                  name="activeStatus"
                  value="inactive"
                  checked={formdata.activeStatus === "inactive"}
                  onChange={handleChange}
                />{" "}
                Inactive
              </label>
            </div>
          </div>
          <div className="paytypemaster-row-doctorfee">
            <label>For OPD Category wise Doctor Fee:</label>
            <input
              type="checkbox"
              name="opdCategory"
              value="OPD"
              className="paytypemaster-checkbox"
              checked={formdata.opdCategory}
              onChange={handleChange}
            />{" "}
            OPD Category
          </div>
          <button className="paytypemaster-button" onClick={handleSubmit}>
            {isEditing ? "Update" : "Submit"}
          </button>
        </div>
      </CustomModal>
    </>
  );
}
