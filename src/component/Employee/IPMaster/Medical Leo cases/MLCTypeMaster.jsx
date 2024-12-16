import React, { useState, useEffect } from "react";
import "./MLCTypeMaster.css";
import axios from "axios";

const MLCTypeMaster = () => {
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    type: "",
    description: "",
  });

  const apiUrl = "http://192.168.0.117:8080/api/mlc";

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => setTableData(response.data))

      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log(tableData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (row) => {
    setFormData({
      id: row.id,
      type: row.mlcType,
      description: row.description,
    });
  };

  const handleSave = () => {
    if (!formData.type || !formData.description) {
      alert("Please fill in all fields!");
      return;
    }

    const payload = {
      mlcType: formData.type,
      description: formData.description,
    };

    if (formData.id) {
      axios
        .put(`${apiUrl}/${formData.id}`, payload)
        .then(() => {
          alert("MLC updated successfully!");
          setFormData({ id: null, type: "", description: "" });
          fetchData();
        })
        .catch((error) => console.error("Error updating data:", error));
    } else {
      axios
        .post(apiUrl, payload)
        .then(() => {
          alert("MLC saved successfully!");
          setFormData({ id: null, type: "", description: "" });
          fetchData();
        })
        .catch((error) => console.error("Error saving data:", error));
    }
  };

  const fetchData = () => {
    axios
      .get(apiUrl)
      .then((response) => setTableData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDelete = () => {
    if (!formData.id) {
      alert("Please select a row to delete!");
      return;
    }

    axios
      .delete(`${apiUrl}/${formData.id}`)
      .then(() => {
        alert("MLC deleted successfully!");
        setFormData({ id: null, type: "", description: "" });
        fetchData();
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  const handleClear = () => {
    setFormData({ id: null, type: "", description: "" });
  };

  return (
    <div className="mlc-type-master-container">
      <div className="mlc-type-master-header">
        <h3>MLC Type Master</h3>
      </div>

      <div className="mlc-type-master-form">
        <label>
          MLC Type:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="mlc-type-master-input"
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mlc-type-master-input"
          />
        </label>

        <div className="mlcType-buttons">
          <button onClick={handleSave}>Save</button>
          <button>Clear</button>
          <button>Close</button>
        </div>
      </div>

      <table className="mlc-type-master-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>MLC Type</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.mlcId}</td>
              <td>{row.mlcType}</td>
              <td>{row.description}</td>
              <td>
                <button
                  onClick={() => handleEdit(row)}
                  className="mlc-type-master-btn"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="mlc-type-master-sidebar">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleClear}>Clear</button>
      </div> */}
      {/* <div className="mlc-type-master-sidebar">
         <button onClick={handleSave} className="mlc-type-master-edit">
           Save
         </button>
         <button onClick={handleDelete} className="mlc-type-master-edit">
           Delete
         </button>
         <button onClick={handleClear} className="mlc-type-master-edit">
           Clear
         </button>
         <button onClick={""} className="mlc-type-master-edit">
           Close
         </button>
         <button onClick={() => handleOtherActions("Search")} className="mlc-type-master-edit">
           Search
         </button>
         <button onClick={() => handleOtherActions("Tracking")} className="mlc-type-master-edit">
           Tracking
         </button>
         <button onClick={() => handleOtherActions("Print")} className="mlc-type-master-edit">
           Print
         </button>
         <button onClick={() => handleOtherActions("Error Logs")} className="mlc-type-master-edit">
           Error Logs
         </button>
         <button onClick={() => handleOtherActions("Export")} className="mlc-type-master-edit">
           Export
         </button>
         <button onClick={() => handleOtherActions("Import")} className="mlc-type-master-edit">
           Import
         </button>
         <button onClick={() => handleOtherActions("Health")} className="mlc-type-master-edit">
           Health
         </button>
         <button onClick={() => handleOtherActions("Version Comparison")} className="mlc-type-master-edit">
           Version Comparison
         </button>
         <button onClick={() => handleOtherActions("SDC")} className="mlc-type-master-edit">
           SDC
         </button>
         <button onClick={() => handleOtherActions("Testing")} className="mlc-type-master-edit">
           Testing
         </button>
         <button onClick={() => handleOtherActions("Info")} className="mlc-type-master-edit">
           Info
         </button>
       </div> */}
    </div>
  );
};

export default MLCTypeMaster;
