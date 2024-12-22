import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReligionMaster.css";

const ReligionMaster = () => {
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    relId: null,
    religionName: "",
    description: "",
    status: "",
  });

  const API_URL = "http://192.168.0.117:8080/api/religion";

  // Fetch data from the API on component mount
  useEffect(() => {
    fetchReligionData();
  }, []);

  const fetchReligionData = async () => {
    try {
      const response = await axios.get(API_URL);
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching religion data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (row) => {
    setFormData(row); // Populate the form with the row data
  };

  const handleSave = async () => {
    if (!formData.religionName || !formData.description || !formData.status) {
      alert("Please fill in all fields before saving.");
      return;
    }

    try {
      if (formData.relId) {
        // Update existing record
        await axios.put(`${API_URL}/${formData.relId}`, formData);
      } else {
        // Add a new record
        await axios.post(API_URL, formData);
      }
      alert("Data saved successfully!");
      fetchReligionData(); // Refresh the table data
      setFormData({ relId: null, religionName: "", description: "", status: "" });
    } catch (error) {
      console.error("Error saving religion data:", error);
    }
  };

  const handleDelete = async () => {
    if (!formData.relId) {
      alert("Please select a row to delete.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/${formData.relId}`);
      alert("Data deleted successfully!");
      fetchReligionData(); // Refresh the table data
      setFormData({ relId: null, religionName: "", description: "", status: "" });
    } catch (error) {
      console.error("Error deleting religion data:", error);
    }
  };

  const handleStatusToggle = async (id) => {
    const row = tableData.find((item) => item.relId === id);
    const updatedStatus = row.status === "active" ? "inactive" : "active";
    try {
      await axios.put(`${API_URL}/${id}`, { ...row, status: updatedStatus });
      fetchReligionData(); // Refresh the table data
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  return (
    <div className="religion-master-container">
      <div className="religion-master-header">
        <h3>Religion Master</h3>
      </div>

      <div className="religion-master-form">
        <label>
          Religion Name :
          <input
            type="text"
            name="religionName"
            value={formData.religionName}
            onChange={handleInputChange}
            className="religion-master-input"
          />
        </label>
        <label>
          Description :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="religion-master-input"
          />
        </label>
        <label>
          Status:
          <input
            type="radio"
            value="active"
            checked={formData.status === "active"}
            onChange={handleInputChange}
            name="status"
          />
          Active
          <input
            type="radio"
            value="inactive"
            checked={formData.status === "inactive"}
            onChange={handleInputChange}
            name="status"
          />
          Inactive
        </label>

        <button onClick={handleSave} className="religion-master-btn">
        Save
      </button>
     
      </div>

      <table className="religion-master-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Religion Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={row.relId}>
              <td>{index + 1}</td>
              <td>{row.religionName}</td>
              <td>{row.description}</td>
              <td>{row.status}
          
              </td>
              <td>
                <button
                  onClick={() => handleEdit(row)}
                  className="religion-master-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleStatusToggle(row.relId)}
                  className="religion-master-edit"
                >
                  {row.status === "active" ? "Deactivate" : "Activate"}
                </button>

                {/* <button onClick={handleDelete} className="religion-master-edit" >
                Delete
              </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  
    </div>
  );
};

export default ReligionMaster;
