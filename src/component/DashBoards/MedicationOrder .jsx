import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./MedicationOrder.css";
import { API_BASE_URL } from "../api/api";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { FloatingInput, FloatingSelect } from "../../FloatingInputs";
import { toast } from "react-toastify";

const MedicationOrder = ({ inPatientId, outPatientId, setActiveSection, onClose }) => {
  console.log(inPatientId);

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [medicationList, setMedicationList] = useState([
    {
      type: "",
      medicationName: "",
      dose: "",
      route: "mouth",
      frequency: 0,
      lastTaken: "",
      comments: "",
      status: "pending",
      medicationDate: new Date().toISOString().slice(0, 10),
      ...(inPatientId
        ? { patientDTO: { inPatientId } }
        : { newPatientVisitDTO: { outPatientId } }),
    },
  ]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/add-item`);
        if (response.status === 200) {
          setOrderData(response.data || []);
        } else {
          console.error("Failed to fetch order data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMedications = medicationList.map((medication, i) =>
      i === index ? { ...medication, [name]: value } : medication
    );
    setMedicationList(updatedMedications);
  };

  const handleAddRow = () => {
    const newMedication = {
      type: "",
      medicationName: "",
      dose: "",
      route: "mouth",
      frequency: 0,
      lastTaken: "",
      comments: "",
      status: "pending",
      medicationDate: new Date().toISOString().slice(0, 10),
      ...(inPatientId
        ? { patientDTO: { inPatientId } }
        : { newPatientVisitDTO: { outPatientId } }),
    };
    setMedicationList([...medicationList, newMedication]);
  };

  const handleRemoveRow = (index) => {
    const updatedMedications = medicationList.filter((_, i) => i !== index);
    setMedicationList(updatedMedications);
  };

  const handleSubmit = async () => {
    console.log(medicationList);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/medications/save-medication-details`,
        medicationList
      );

      // Check if response status is OK (200) or Created (201)
      if (response.status) {
        toast.success("Prescription Added Successfully");
        onClose();
      }
    } catch (error) {
      toast.error("Error submitting medication list");
    }
  };



  return (
    <div className="MedicationOrder-form">
      <h3>Medication Order</h3>
      <table className="patientList-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "",
              "Order Item",
              "Generic",
              "Brand Name",
              "Dose",
              "Route",
              "Frequency",
              "Duration (days)",
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
          {medicationList.map((medication, index) => (
            <tr key={index}>
              <td>
                <button
                  className="MedicationOrder-deleteBtn"
                  onClick={() => handleRemoveRow(index)}
                >
                  X
                </button>
              </td>
              <td>
                <FloatingSelect
                  label={"Medication Name"}
                  name="medicationName"
                  value={medication.medicationName}
                  onChange={(e) => handleInputChange(index, e)}
                  options={[
                    { value: "", label: "" },
                    ...(Array.isArray(orderData)
                      ? orderData.map((order) => ({
                        value: order.itemMaster?.itemName,
                        label: order.itemMaster?.itemName,
                      }))
                      : []),
                  ]}
                />
              </td>
              <td>
                <FloatingInput
                  label={"Generic Name"}
                  type="text"
                  value={medication.genericName || ""}
                  readOnly

                />
              </td>
              <td>
                <FloatingInput
                  label={"Brand Name"}
                  type="text"
                  value={medication.medicationName || ""}
                  placeholder="Brand Name"
                  readOnly

                />
              </td>
              <td>
                <FloatingInput
                  label={"Dose"}
                  type="number"
                  name="dose"
                  min="0"
                  value={medication.dose || ""}
                  placeholder="Dose"
                  onChange={(e) => handleInputChange(index, e)}

                />
              </td>
              <td>
                <FloatingSelect
                  name="route"
                  value={medication.route}
                  onChange={(e) => handleInputChange(index, e)}
                  options={[{ value: "", label: "" },
                  { value: "mouth", label: "Mouth" },
                  { value: "IV", label: "Iv" },
                  { value: "injection", label: "Injection" },

                  ]}
                />

              </td>
              <td>
                <FloatingInput
                  label={"Frequency"}
                  type="text"
                  name="frequency"
                  value={medication.frequency || ""}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <FloatingInput
                  label={"Last Taken"}
                  type="text"
                  name="lastTaken"
                  value={medication.lastTaken || ""}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <FloatingInput
                  label={"Remarks"}
                  type="text"
                  name="comments"
                  value={medication.comments || ""}
                  placeholder="Remarks"
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <button
                  className="MedicationOrder-submitBtn"
                  onClick={handleAddRow}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="MedicationOrder-submitBtn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default MedicationOrder;