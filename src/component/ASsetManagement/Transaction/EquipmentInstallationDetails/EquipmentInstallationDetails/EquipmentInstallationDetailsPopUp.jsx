import React, { useState, useEffect } from "react";
import "./EquipmentInstallationDetailsPopUp.css";
import axios from "axios";
import { API_BASE_URL } from "../../../../api/api";

const EquipmentInstallationDetailsPopUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    installationDate: "",
    installationTime: "",
    installedBy: "",
    technicalDetails: "",
    remark: "",
    warrantyDetails: "",
    contractType: "Annual Maintenance Contract",
    equipmentDTO: {
      equipmentMasterId: "",
      assetNo: "",
      equipmentName: "",
      serialNo: "",
      locationPath: "",
      softwareVersion: "",
      warrantyFrom: "",
      warrantyToDate: "",
      warrantyDetails: "",
      assetLocationMaster: { subLocation: "" },
      department: { departmentId: "", departmentName: "" },
    },
    departmentDTO: { departmentId: "" },
  });

  const [equipmentList, setEquipmentList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);

  // Fetch Equipment List and Department List
  useEffect(() => {
    const fetchEquipmentList = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/equipment-masters`);
        setEquipmentList(response.data);
      } catch (error) {
        console.error("Error fetching equipment list", error.message);
        alert(`Error fetching equipment list: ${error.message}`);
      }
    };

    const fetchDepartmentList = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/departments/getAllDepartments`);
        setDepartmentList(response.data);
      } catch (error) {
        console.error("Error fetching department list", error.message);
        alert(`Error fetching department list: ${error.message}`);
      }
    };

    fetchEquipmentList();
    fetchDepartmentList();
  }, []);

  // Fetch Equipment Details based on equipmentMasterId
  const fetchEquipmentDetails = async (equipmentMasterId) => {
    if (!equipmentMasterId) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/equipment-masters/${equipmentMasterId}`);
      const equipmentData = response.data;

      if (equipmentData) {
        setFormData((prevData) => ({
          ...prevData,
          equipmentDTO: {
            ...prevData.equipmentDTO,
            equipmentMasterId: equipmentData.equipmentMasterId || "",
            assetNo: equipmentData.assetNo || "",
            equipmentName: equipmentData.equipmentName || "",
            serialNo: equipmentData.serialNo || "",
            locationPath: equipmentData.locationPath || "",
            softwareVersion: equipmentData.softwareVersion || "",
            warrantyFrom: equipmentData.warrantyFrom || "",
            warrantyToDate: equipmentData.warrantyToDate || "",
            warrantyDetails: equipmentData.warrantyDetails || "",
            assetLocationMaster: {
              subLocation: equipmentData.assetLocationMaster?.subLocation || "",
            },
            department: {
              departmentId: equipmentData.department?.departmentId || "",
              departmentName: equipmentData.department?.departmentName || "",
            },
          },
        }));
      }
    } catch (error) {
      console.error("Error fetching equipment details", error.message);
      alert(`Error fetching equipment details: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "equipmentMasterId") {
      setFormData((prevData) => ({
        ...prevData,
        equipmentDTO: { ...prevData.equipmentDTO, equipmentMasterId: value },
      }));
      fetchEquipmentDetails(value);
    } else if (name === "departmentId") {
      setFormData((prevData) => ({
        ...prevData,
        departmentDTO: { ...prevData.departmentDTO, departmentId: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    if (!formData.installationDate || !formData.installationTime || !formData.installedBy || !formData.equipmentDTO.equipmentMasterId || !formData.departmentDTO.departmentId) {
      alert("Please fill in all required fields.");
      return;
    }

    const installationData = {
      installationDate: formData.installationDate,
      installationTime: formData.installationTime,
      installedBy: formData.installedBy,
      technicalDetails: formData.technicalDetails,
      remark: formData.remark,
      warrantyDetails: formData.warrantyDetails,
      contractType: formData.contractType,
      departmentDTO: {
        departmentId: formData.departmentDTO.departmentId || 0,
      },
      equipmentDTO: {
        equipmentMasterId: formData.equipmentDTO.equipmentMasterId || null,
      },
    };

    try {
      console.log("Sending installation data:", installationData);

      const response = await axios.post(`${API_BASE_URL}/installations`, installationData);
      if (response.status === 200) {
        alert("Installation details saved successfully!");
        onClose();
          }
    } catch (error) {
      console.error("Error saving installation details", error.response || error.message);
      alert(`Error saving installation details: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="EquipmentInstallationDetailsPopUp-container">
      <div className="EquipmentInstallationDetailsPopUp-header">
        <h4>Equipment Installation Details</h4>
      </div>

      <div className="EquipmentInstallationDetailsPopUp-form">
        <div className="EquipmentInstallationDetailsPopUp-form-panel">
          <div className="EquipmentInstallationDetailsPopUp-form-group">
            <label>Equipment Name*:</label>
            <select
              name="equipmentMasterId"
              value={formData.equipmentDTO.equipmentMasterId}
              onChange={handleChange}
            >
              <option value="">Select Equipment</option>
              {equipmentList.map((equipment) => (
                <option key={equipment.equipmentMasterId} value={equipment.equipmentMasterId}>
                  {equipment.equipmentName}
                </option>
              ))}
            </select>
          </div>

          <div className="EquipmentInstallationDetailsPopUp-form-group">
            <label>Asset No:</label>
            <input type="text" name="assetNo" value={formData.equipmentDTO.assetNo} readOnly />
          </div>

          <div className="EquipmentInstallationDetailsPopUp-form-group">
            <label>Serial No:</label>
            <input type="text" name="serialNo" value={formData.equipmentDTO.serialNo} readOnly />
          </div>

          <div className="EquipmentInstallationDetailsPopUp-form-group">
            <label>Location Path:</label>
            <input type="text" name="locationPath" value={formData.equipmentDTO.locationPath} readOnly />
          </div>

          <div className="EquipmentInstallationDetailsPopUp-form-group">
            <label>Software Version No:</label>
            <input type="text" name="softwareVersion" value={formData.equipmentDTO.softwareVersion} readOnly />
          </div>

          <div className="EquipmentInstallationDetailsPopUp-form-group">
            <label>Sub Department:</label>
            <select name="departmentId" value={formData.departmentDTO.departmentId} onChange={handleChange}>
              <option value="">Select Sub Department</option>
              {departmentList.map((department) => (
                <option key={department.departmentId} value={department.departmentId}>
                  {department.departmentName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="EquipmentInstallationDetailsPopUp-form-panel">
          <div className="EquipmentInstallationDetailsPopUp-form-group">
            <label>Installation Date:</label>
            <input
              type="date"
              name="installationDate"
              value={formData.installationDate}
              onChange={handleChange}
            />
          </div>

          <div className="EquipmentInstallationDetailsPopUp-form-group">
            <label>Installation Time*:</label>
            <input
              type="time"
              name="installationTime"
              value={formData.installationTime}
              onChange={handleChange}
            />
          </div>

          <div className="EquipmentInstallationDetailsPopUp-form-group">
            <label>Installed By:</label>
            <input
              type="text"
              name="installedBy"
              value={formData.installedBy}
              onChange={handleChange}
            />
          </div>

          <div className="EquipmentInstallationDetailsPopUp-form-group">
            <label>Technical Details:</label>
            <textarea
              name="technicalDetails"
              value={formData.technicalDetails}
              onChange={handleChange}
            />
          </div>

          <div className="EquipmentInstallationDetailsPopUp-form-group">
            <label>Remarks:</label>
            <textarea name="remark" value={formData.remark} onChange={handleChange} />
          </div>
        </div>

        <div className="EquipmentInstallationDetailsPopUp-form-panel">
          <div className="EquipmentInstallationDetailsPopUp-form-group">
            <label>Contract Type:</label>
            <select name="contractType" value={formData.contractType} onChange={handleChange}>
              <option value="Annual Maintenance Contract">AMC</option>
              <option value="Oncall">Oncall</option>
              <option value="CMS">CMS</option>
            </select>
          </div>

          <div className="EquipmentInstallationDetailsPopUp-form-group">
            <label>Warranty From:</label>
            <input
              type="date"
              name="warrantyFrom"
              value={formData.equipmentDTO.warrantyFrom}
              readOnly
            />
          </div>

          <div className="EquipmentInstallationDetailsPopUp-form-group">
            <label>Warranty To:</label>
            <input
              type="date"
              name="warrantyToDate"
              value={formData.equipmentDTO.warrantyToDate}
              readOnly
            />
          </div>

          <div className="EquipmentInstallationDetailsPopUp-form-group">
            <label>Warranty Details:</label>
            <textarea
              name="warrantyDetails"
              value={formData.equipmentDTO.warrantyDetails}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="EquipmentInstallationDetailsPopUp-form-actions">
        <button className="EquipmentInstallationDetailsPopUp-add-btn" onClick={handleSave}>
          Save
        </button>
        <button className="EquipmentInstallationDetailsPopUp-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EquipmentInstallationDetailsPopUp;
