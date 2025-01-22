import React, { useEffect, useState } from "react";
import "./EquipmentPartspopup.css";
import { API_BASE_URL } from "../../../api/api";

const EquipmentPartsPopUp = () => {
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");

  const [formData, setFormData] = useState({
    partName: "",
    modelNo: "",
    serialNo: "",
    action: "",
    standBy: "",
    quantity: "",
    outQuantity: "",
    pendingQuantity: "",
    recQuantity: "",
    coveredUnder: "",
    contractType: "",
    underInsuranceCost: "",
    remark: "",
  });

  // Fetch equipment data
  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/equipment-masters`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEquipments(data);
      } catch (error) {
        console.error("Error fetching equipment details:", error);
      }
    };

    fetchEquipments();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle equipment selection
  const handleEquipmentChange = (event) => {
    setSelectedEquipment(event.target.value);
  };

  // Handle save action
  const handleSave = async () => {
    if (!selectedEquipment) {
      alert("Please select an equipment.");
      return;
    }

    const payload = {
      ...formData,
      equipmentMasterDTO: {
        equipmentMasterId: parseInt(selectedEquipment, 10),
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/parts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Data saved successfully!");
        setFormData({
          partName: "",
          modelNo: "",
          serialNo: "",
          action: "",
          standBy: "",
          quantity: "",
          outQuantity: "",
          pendingQuantity: "",
          recQuantity: "",
          coveredUnder: "",
          contractType: "",
          underInsuranceCost: "",
          remark: "",
        });
        setSelectedEquipment("");
      } else {
        const errorData = await response.json();
        console.error("Error saving data:", errorData);
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("An error occurred while saving data.");
    }
  };

  return (
    <div className="EquipmentPartsPopUp-surgery-Events">
      <div className="EquipmentPartsPopUp-surgeryEvents-title-bar">
        <div className="EquipmentPartsPopUp-surgeryEvents-header">
          <span>Equipment Parts</span>
        </div>
      </div>
      <div className="EquipmentPartsPopUp-surgeryEvents-content-wrapper">
        <div className="EquipmentPartsPopUp-surgeryEvents-main-section">
          <div className="EquipmentPartsPopUp-surgeryEvents-panel dis-templates">
            <div className="EquipmentPartsPopUp-surgeryEvents-panel-content">
              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <label>Part Name:</label>
                <input
                  name="partName"
                  value={formData.partName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <label>Equipment Name:</label>
                <select value={selectedEquipment} onChange={handleEquipmentChange}>
                  <option value="">Select Equipment</option>
                  {equipments.map((equipment) => (
                    <option
                      key={equipment.equipmentMasterId}
                      value={equipment.equipmentMasterId}
                    >
                      {equipment.equipmentName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="EquipmentPartsPopUp-surgeryEvents-panel operation-details">
            <div className="EquipmentPartsPopUp-surgeryEvents-panel-content">
              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <label>Model No:</label>
                <input
                  name="modelNo"
                  value={formData.modelNo}
                  onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <label>Serial No:</label>
                <input
                  name="serialNo"
                  value={formData.serialNo}
                  onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <label>Stand By:</label>
                <input
                  name="standBy"
                  value={formData.standBy}
                  onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="EquipmentPartsPopUp-surgeryEvents-panel operation-details">
            <div className="EquipmentPartsPopUp-surgeryEvents-panel-content">
              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <label>Contract Type:</label>
                <input
                  name="contractType"
                  value={formData.contractType}
                  onChange={handleInputChange}
                />
              </div>
              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <label>Covered Under:</label>
                <input
                  name="coveredUnder"
                  value={formData.coveredUnder}
                  onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <label>Remark:</label>
                <input
                  name="remark"
                  value={formData.remark}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="EquipmentPartsPopUp-surgeryEvents-panel operation-details">
            <div className="EquipmentPartsPopUp-surgeryEvents-panel-content">
              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <label>Under Insurance Cost:</label>
                <input
                  name="underInsuranceCost"
                  value={formData.underInsuranceCost}
                  onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <label>Pending Quantity:</label>
                <input
                  type="number"
                  name="pendingQuantity"
                  value={formData.pendingQuantity}
                  onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <label>Rec Quantity:</label>
                <input
                  type="number"
                  name="recQuantity"
                  value={formData.recQuantity}
                  onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <label>Out Quantity:</label>
                <input
                  type="number"
                  name="outQuantity"
                  value={formData.outQuantity}
                  onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <label>Action:</label>
                <input
                  name="action"
                  value={formData.action}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="EquipmentPartsPopUp-surgeryEvents-action-buttons">
          <button className="EquipmentPartsPopUp-btn-blue" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentPartsPopUp;