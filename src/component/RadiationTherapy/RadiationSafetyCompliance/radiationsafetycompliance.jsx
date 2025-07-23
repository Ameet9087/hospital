import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./RadiationSafetyCompliance.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
const Radiationsafetycompliance = () => {
  const [complianceLogs, setComplianceLogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentLog, setCurrentLog] = useState(null);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const [formData, setFormData] = useState({
    complianceId:"",
    equipmentId: "",
    safetyTestDate: "",
    complianceStatus: "",
    doctorName: "",
    remarks: "",
  });

  // Fetch compliance logs from API using axios
  const fetchComplianceLogs = async () => {
    try {
      const response = await axios.get("http://localhost:8085/api/radiation-safety");
      console.log(response.data)
      setComplianceLogs(response.data);
    } catch (error) {
      console.error("Error fetching compliance logs:", error);
    }
  };

  useEffect(() => {
    // Fetch the logs when the component mounts
    fetchComplianceLogs();
  }, []);

  const handleModalOpen = (log = null) => {
    if (log) {
      setFormData(log);
      setCurrentLog(log.complianceId);
    } else {
      setFormData({
        complianceId:"",
        equipmentId: "",
        safetyTestDate: "",
        complianceStatus: "",
        doctorName: "",
        remarks: "",
      });
      setCurrentLog(null);
    }
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (currentLog) {
        // Update existing log
        await axios.put(`http://localhost:8085/api/radiation-safety/${currentLog}`, formData);
        setComplianceLogs(
          complianceLogs.map((log) =>
            log.complianceId === currentLog ? formData : log // Compare with complianceId
          )
        );
      } else {
        // Add a new log
        const response = await axios.post("http://localhost:8085/api/radiation-safety", formData);
        setComplianceLogs([...complianceLogs, response.data]);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (log) => {
    handleModalOpen(log);
  };

  return (
    <div className="radiation-safety-compliance-container">
      <h2>Radiation Safety Compliance</h2>
      <button onClick={() => handleModalOpen()} className="compliance-add-button">
        Add Compliance Log
      </button>

      <table className="compliance-table" ref={tableRef}>
        <thead>
          <tr>
            {["complianceId",
              "Equipment ID",
              "Safety Test Date",
              "Compliance Status",
              "Doctor Name",
              "Remarks",
              "Actions"
            ].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className="resizable-th"
              >
                <div className="header-content">
                  <span>{header}</span>
                  <div
                    className="resizer"
                    onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                  ></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {complianceLogs.map((log) => (
            <tr key={log.equipmentId}>
              <td>{log.complianceId}</td>
              <td>{log.equipmentId}</td>
              <td>{log.safetyTestDate}</td>
              <td>{log.complianceStatus}</td>
              <td>{log.doctorName}</td>
              <td>{log.remarks}</td>
              <td>
                <button
                  className="compliance-edit-button"
                  onClick={() => handleEdit(log)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="compliance-modal">
          <div className="compliance-modal-content">
            <span className="compliance-close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>{currentLog ? "Edit Log" : "Add Radiation Safety Compliance Log"}</h2>
            <form>
            <div className="compliance-form-group">
                <label>complianceId </label>
                <input
                  type="text"
                  name="complianceId"
                  value={formData.complianceId}
                  onChange={handleChange}
                />
              </div>
              <div className="compliance-form-group">
                <label>Equipment ID</label>
                <input
                  type="text"
                  name="equipmentId"
                  value={formData.equipmentId}
                  onChange={handleChange}
                />
              </div>
              <div className="compliance-form-group">
                <label>Safety Test Date</label>
                <input
                  type="date"
                  name="safetyTestDate"
                  value={formData.safetyTestDate}
                  onChange={handleChange}
                />
              </div>
              <div className="compliance-form-group">
                <label>Compliance Status</label>
                <input
                  type="text"
                  name="complianceStatus"
                  value={formData.complianceStatus}
                  onChange={handleChange}
                />
              </div>
              <div className="compliance-form-group">
                <label>Doctor Name</label>
                <input
                  type="text"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                />
              </div>
              <div className="compliance-form-group">
                <label>Remarks</label>
                <textarea
                  name="remarks"
                  rows="3"
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="compliance-submit-button"
                onClick={handleSubmit}
              >
                {currentLog ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Radiationsafetycompliance;
