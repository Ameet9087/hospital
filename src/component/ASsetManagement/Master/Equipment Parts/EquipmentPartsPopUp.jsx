import React, { useEffect, useState } from "react";
import "./EquipmentPartspopup.css";
import { API_BASE_URL } from "../../../api/api";
import { toast } from "react-toastify";
import { FloatingInput, FloatingSelect } from "../../../../FloatingInputs";

const EquipmentPartsPopUp = ({onClose}) => {
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
      toast.error("Please select an equipment.");
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
        toast.success("Data saved successfully!");
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
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Error saving data:", errorData);
        toast.error("Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("An error occurred while saving data.");
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
                <FloatingInput
                label={"Part Name"}
                name="partName"
                value={formData.partName}
                onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <FloatingSelect
                label={"Equipment Name"}
                value={selectedEquipment}
                onChange={handleEquipmentChange}
                options={[
                  { value: "", label: "" },
                  ...(Array.isArray(equipments)
                    ? equipments.map((equipment) => ({
                        value: equipment.equipmentMasterId,
                        label: equipment.equipmentName,
                      }))
                    : []),
                ]}
                />
              </div>
              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Model No"}
                name="modelNo"
                value={formData.modelNo}
                onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Serial No"}
                name="serialNo"
                value={formData.serialNo}
                onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Stand By"}
                  name="standBy"
                  value={formData.standBy}
                  onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Quantity"}
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
                <FloatingInput
                label={"Contract Type"}
                 name="contractType"
                 value={formData.contractType}
                 onChange={handleInputChange}
                />
              </div>
              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Covered Under"}
                name="coveredUnder"
                value={formData.coveredUnder}
                onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Remark"}
                name="remark"
                value={formData.remark}
                onChange={handleInputChange}
                />
              </div>
              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Under Insurance Cost"}
                  name="underInsuranceCost"
                  value={formData.underInsuranceCost}
                  onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Pending Quantity"}
                type="number"
                name="pendingQuantity"
                value={formData.pendingQuantity}
                onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Rec Quantity"}
                type="number"
                name="recQuantity"
                value={formData.recQuantity}
                onChange={handleInputChange}
                />
              </div>

              
            </div>
          </div>

          <div className="EquipmentPartsPopUp-surgeryEvents-panel operation-details">
            <div className="EquipmentPartsPopUp-surgeryEvents-panel-content">
            <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Out Quantity"}
                type="number"
                name="outQuantity"
                value={formData.outQuantity}
                onChange={handleInputChange}
                />
              </div>

              <div className="EquipmentPartsPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Action"}
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