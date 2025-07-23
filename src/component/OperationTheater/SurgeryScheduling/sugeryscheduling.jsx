import React, { useState, useEffect } from "react";

import CustomModal from "../../../CustomModel/CustomModal";
import './Sugeryscheduling.css';
import { API_BASE_URL } from "../../api/api";

const SurgeryScheduling = () => {
  const [rows, setRows] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch surgery event data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/surgery-events`);
        const data = await response.json();
        setRows(data); // Save the response data to rows state
      } catch (error) {
        console.error("Error fetching surgery events:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (row) => {
    setPopupData(row);
    setShowPopup(true);
  };

  const handlePopupChange = (field, value) => {
    setPopupData({ ...popupData, [field]: value });
  };

  const handleSave = () => {
    const updatedRows = rows.map((row) =>
      row.surgeryEventId === popupData.surgeryEventId ? popupData : row
    );
    setRows(updatedRows);
    setShowPopup(false);
  };

  const handleAddRow = () => {
    const newRow = {
      surgeryEventId: rows.length + 1,
      firstName: "",
      lastName: "",
      operationName: "",
      operationType: "",
      surgeon: "",
      assistantNurse: "",
      remark: "",
    };
    setRows([...rows, newRow]);
  };

  return (
    <div className="surgerySchedulings-container">
      <button
        onClick={handleAddRow}
        className="surgerySchedulings-add-row-button"
      >
        Add Row
      </button>
      <table className="surgerySchedulings-table">
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Patient First Name</th>
            <th>Patient Last Name</th>
            <th>Operation Name</th>
            <th>Operation Type</th>
            <th>Surgeon</th>
            <th>Assistant Nurse</th>
            <th>Remark</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.surgeryEventId}</td>
              <td>
                {
                  row.operationBookingDTO?.ipAdmissionDTO?.patient?.patient
                    ?.firstName
                }
              </td>
              <td>
                {
                  row.operationBookingDTO?.ipAdmissionDTO?.patient?.patient
                    ?.lastName
                }
              </td>
              <td>{row.operationMasterDTO?.operationName}</td>
              <td>{row.operationMasterDTO?.operationType}</td>
              <td>{row.docterDTO?.doctorName}</td>
              <td>{row.employeeDTO?.firstName}</td>
              <td>{row.remark || "Scheduled"}</td>
              <td>
                <button
                  onClick={() => handleEditClick(row)}
                  className="surgerySchedulings-edit-button"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomModal isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <div className="surgerySchedulings-popup">
          <div className="surgerySchedulings-popup-content">
            <h2>Edit Surgery Details</h2>
            <div>
              <label>Patient First Name</label>
              <input
                type="text"
                value={
                  popupData?.operationBookingDTO?.ipAdmissionDTO?.patient
                    ?.patient?.firstName || ""
                }
                onChange={(e) => handlePopupChange("firstName", e.target.value)}
              />
            </div>
            <div>
              <label>Patient Last Name</label>
              <input
                type="text"
                value={
                  popupData?.operationBookingDTO?.ipAdmissionDTO?.patient
                    ?.patient?.lastName || ""
                }
                onChange={(e) => handlePopupChange("lastName", e.target.value)}
              />
            </div>
            <div>
              <label>Operation Name</label>
              <input
                type="text"
                value={popupData?.operationMasterDTO?.operationName || ""}
                onChange={(e) =>
                  handlePopupChange("operationName", e.target.value)
                }
              />
            </div>
            <div>
              <label>Operation Type</label>
              <input
                type="text"
                value={popupData?.operationMasterDTO?.operationType || ""}
                onChange={(e) =>
                  handlePopupChange("operationType", e.target.value)
                }
              />
            </div>
            <div>
              <label>Surgeon</label>
              <input
                type="text"
                value={popupData?.docterDTO?.doctorName || ""}
                onChange={(e) => handlePopupChange("surgeon", e.target.value)}
              />
            </div>
            <div>
              <label>Assistant Nurse</label>
              <input
                type="text"
                value={popupData?.employeeDTO?.firstName || ""}
                onChange={(e) =>
                  handlePopupChange("assistantNurse", e.target.value)
                }
              />
            </div>
            <div>
              <label>Remark</label>
              <input
                type="text"
                value={popupData?.remark || ""}
                onChange={(e) => handlePopupChange("remark", e.target.value)}
              />
            </div>
            <button
              onClick={handleSave}
              className="surgerySchedulings-save-button"
            >
              Save
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="surgerySchedulings-cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default SurgeryScheduling;
