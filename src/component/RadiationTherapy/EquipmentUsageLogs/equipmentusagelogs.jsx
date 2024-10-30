import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './EquipmentUsageLogs.css';

const EquipmentUsageLogs = () => {
  const [usageLogs, setUsageLogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentLog, setCurrentLog] = useState(null);
  const [formData, setFormData] = useState({
    logId: '',
    equipmentId: '',
    usageStartTime: '',
    usageEndTime: '',
    operatorId: '',
    operatorName: '',
    patientId: '',
    remarks: '',
  });
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState([]);

  // Fetch all logs on component mount
  useEffect(() => {
    axios.get('http://localhost:8085/api/equipment-usage-log')
      .then(response => {
        setUsageLogs(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching logs:', error);
      });
  }, []);

  // Handle modal open (for both adding and editing logs)
  const handleModalOpen = (log = null) => {
    if (log) {
      setFormData(log);
      setCurrentLog(log.logId);
    } else {
      setFormData({
        logId: '',
        equipmentId: '',
        usageStartTime: '',
        usageEndTime: '',
        operatorId: '',
        doctorName: '',
        patientId: '',
        remarks: '',
      });
      setCurrentLog(null);
    }
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form (add or update log)
  const handleSubmit = () => {
    if (currentLog) {
      // Update log
      axios.put(`http://localhost:8085/api/equipment-usage-log/${currentLog}`, formData)
        .then(response => {
          setUsageLogs(usageLogs.map(log => (log.logId === currentLog ? response.data : log)));
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error updating log:', error);
        });
    } else {
      // Create new log
      axios.post('http://localhost:8085/api/equipment-usage-log', formData)
        .then(response => {
          setUsageLogs([...usageLogs, response.data]);
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error creating log:', error);
        });
    }
  };

  // Delete a log
  const handleDelete = (logId) => {
    axios.delete(`http://localhost:8085/api/equipment-usage-log/${logId}`)
      .then(() => {
        setUsageLogs(usageLogs.filter(log => log.logId !== logId));
      })
      .catch(error => {
        console.error('Error deleting log:', error);
      });
  };

  // Handle log edit (open modal with log data)
  const handleEdit = (log) => {
    handleModalOpen(log);
  };

  return (
    <div className="equipment-usage-logs-container">
      <h2>Equipment Usage Logs</h2>
      <button onClick={() => handleModalOpen()} className="equipment-usage-logs-add-button">
        Add Usage Log
      </button>

      <table className="equipment-usage-logs-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Log ID",
              "Equipment ID",
              "Usage Start Time",
              "Usage End Time",
              "Operator ID",
              "doctor Name",
              "Patient ID",
              "Remarks",
              "Actions",
            ].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className="resizable-th"
              >
                <div className="header-content">
                  <span>{header}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {usageLogs.map((log) => (
            <tr key={log.logId}>
              <td>{log.logId}</td>
              <td>{log.equipmentId}</td>
              <td>{log.usageStartTime}</td>
              <td>{log.usageEndTime}</td>
              <td>{log.operatorId}</td>
              <td>{log.doctorName}</td>
              <td>{log.patientId}</td>
              <td>{log.remarks}</td>
              <td>
                <button
                  className="equipment-usage-logs-edit-button"
                  onClick={() => handleEdit(log)}
                >
                  Edit
                </button>
                <button
                  className="equipment-usage-logs-edit-button"
                  onClick={() => handleDelete(log.logId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="equipment-usage-logs-modal">
          <div className="equipment-usage-logs-modal-content">
            <span className="equipment-usage-logs-close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>{currentLog ? "Edit Log" : "Add Equipment Usage Log"}</h2>
            <form>
              <div className="equipment-usage-logs-form-group">
                <label>Equipment ID</label>
                <input
                  type="text"
                  name="equipmentId"
                  value={formData.equipmentId}
                  onChange={handleChange}
                />
              </div>
              <div className="equipment-usage-logs-form-group">
                <label>Usage Start Time</label>
                <input
                  type="datetime-local"
                  name="usageStartTime"
                  value={formData.usageStartTime}
                  onChange={handleChange}
                />
              </div>
              <div className="equipment-usage-logs-form-group">
                <label>Usage End Time</label>
                <input
                  type="datetime-local"
                  name="usageEndTime"
                  value={formData.usageEndTime}
                  onChange={handleChange}
                />
              </div>
              <div className="equipment-usage-logs-form-group">
                <label>Operator ID</label>
                <input
                  type="text"
                  name="operatorId"
                  value={formData.operatorId}
                  onChange={handleChange}
                />
              </div>
              <div className="equipment-usage-logs-form-group">
                <label>Operator Name</label>
                <input
                  type="text"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                />
              </div>
              <div className="equipment-usage-logs-form-group">
                <label>Patient ID</label>
                <input
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                />
              </div>
              <div className="equipment-usage-logs-form-group">
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
                className="equipment-usage-logs-submit-button"
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

export default EquipmentUsageLogs;
