import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./PaytypeMaster.css";
import CustomModal from "../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../api/api";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

export default function PaytypeMaster() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  // const [rows, setRows] = useState([
  //   { id: 1, roomtype: "", minimumAdvance: 0.0, roomrent: 0.0 },
  // ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [allData, setAllData] = useState([]);
  const [formdata, setFormdata] = useState({
    payTypeName: "",
    payOrder: "",
    activeStatus: "",
    opdCategory: "",
    categoryCode: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormdata((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    handleLoadData();
  }, []);

  // const [roomTypes, setRoomTypes] = useState([]);
  // const [isTableVisible, setIsTableVisible] = useState(false);

  // Fetch Room Types from API
  // useEffect(() => {
  //   const fetchRoomTypes = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${API_BASE_URL}/room-types`
  //       );
  //         setRoomTypes(response.data);
  //     } catch (error) {
  //       console.error("Error fetching room types:", error);
  //       alert("Failed to fetch room types.");
  //     }
  //   };
  //   fetchRoomTypes();
  // }, []);

  // const handleAddRow = () => {
  //   const newRow = {
  //     id: rows.length + 1,
  //     roomtype: "",
  //     minimumAdvance: 0.0,
  //     roomrent: 0.0,
  //   };
  //   setRows([...rows, newRow]);
  // };

  // const handleDeleteRow = (id) => {
  //   if (rows.length === 1) {
  //     alert("Only one row is present. Cannot delete.");
  //     return;
  //   }
  //   const updatedRows = rows.filter((row) => row.id !== id);
  //   setRows(updatedRows);
  // };

  // Clear Fields

  const handleSubmit = async () => {
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/pay-type`, formdata);
      alert("Data saved successfully!");
      console.log(response.data);
      setIsModalOpen(false);
      handleLoadData();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  // Load Data Handler
  const handleLoadData = async () => {
    const response = await axios.get(`${API_BASE_URL}/pay-type`);
    setAllData(response.data);
  };

  return (
    <>
      <div className="paytypemaster-button-container">
        <button onClick={() => setIsModalOpen(true)}>Create Paytype</button>
      </div>
      <div className="paytypemaster-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Pay Type Name",
                "Pay Type Order",
                "Active Status",
                "categoryCode",
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
              allData.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.payTypeName}</td>
                  <td>{item.payOrder}</td>
                  <td>{item.activeStatus}</td>
                  <td>{item.categoryCode}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
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
            <label className="paytypemaster-label">
              Paytype Name :<span className="mand">*</span>
            </label>
            <input
              type="text"
              className={`paytypemaster-input ${error ? "error-border" : ""}`}
              value={formdata.payTypeName}
              name="payTypeName"
              onChange={handleChange}
            />
            {error && <span className="error-message">{error}</span>}
          </div>

          {/* Order */}
          <div className="paytypemaster-row">
            <label className="paytypemaster-label">Order :</label>
            <input
              type="text"
              className="paytypemaster-input"
              value={formdata.payOrder}
              name="payOrder"
              onChange={handleChange}
            />
          </div>
          <div className="paytypemaster-row">
            <label className="paytypemaster-label">Category Code:</label>
            <input
              type="text"
              className="paytypemaster-input"
              value={formdata.categoryCode}
              name="categoryCode"
              onChange={handleChange}
            />
          </div>

          {/* Active/Inactive */}
          <div className="paytypemaster-row">
            <label className="paytypemaster-label">Active Status</label>
            <div className="paytypemaster-radio-group">
              <label className="doctorFee">
                <input
                  type="radio"
                  value="active"
                  checked={formdata.activeStatus === "active"}
                  name={"activeStatus"}
                  onChange={handleChange}
                />
                Active
              </label>
              <label className="doctorFee">
                <input
                  type="radio"
                  name="activeStatus"
                  value="inactive"
                  checked={formdata.activeStatus === "inactive"}
                  onChange={handleChange}
                />
                Inactive
              </label>
            </div>
          </div>

          {/* OPD Category */}
          <div className="paytypemaster-row-doctorfee">
            <label className="doctorFee">
              For OPD Category wise Doctor Fee :
            </label>
            <input
              type="checkbox"
              name="opdCategory"
              value={"OPD"}
              className="paytypemaster-checkbox"
              checked={formdata.opdCategory}
              onChange={handleChange}
            />
            OPD Category
          </div>
          <button className="paytypemaster-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </CustomModal>
    </>
  );
}
