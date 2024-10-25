// SwapnilRokade_MedicationOrder_Adding_New_MedicationOrder_13/09
import React, { useRef, useState } from "react";
import axios from "axios";
import "./MedicationOrder.css";
import { API_BASE_URL } from "../api/api";
import { startResizing } from "../TableHeadingResizing/resizableColumns";

const MedicationOrder = ({
  selectedOrders,
  patientId,
  newPatientVisitId,
  setActiveSection,
}) => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  console.log(patientId + "" + newPatientVisitId);

  const [medicationList, setMedicationList] = useState(
    selectedOrders.map((order) => ({
      type: order?.genericNameDTO?.genericName || "",
      medicationName: order?.itemName || "",
      dose: "",
      route: "mouth",
      frequency: 0,
      lastTaken: "",
      comments: "",
      status: "pending",
      medicationDate: new Date().toISOString().slice(0, 10),
      ...(patientId
        ? { patientDTO: { patientId } }
        : { newPatientVisitDTO: { newPatientVisitId } }),
    }))
  );

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMedications = medicationList.map((medication, i) =>
      i === index ? { ...medication, [name]: value } : medication
    );
    setMedicationList(updatedMedications);
  };

  const handleSubmit = async () => {
    console.log(medicationList);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/medications/save-medication-details`,
        medicationList // Sending the entire formData array as the payload
      );
      setActiveSection("dashboard");
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error submitting medication list:", error);
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
              "Generic",
              "Brand Name",
              "Dose",
              "Route",
              "Frequency",
              "Duration (days)",
              "Remarks",
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
          {medicationList.map((medication, index) => (
            <tr key={index}>
              <td>
                <button
                  className="MedicationOrder-deleteBtn"
                  onClick={() => console.log("Delete Row", index)}
                >
                  X
                </button>
              </td>
              <td>
                <input
                  type="text"
                  name="type"
                  value={medication.type}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Generic Name"
                  className="MedicationOrder-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="medicationName"
                  value={medication.medicationName}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Brand Name"
                  className="MedicationOrder-input"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="dose"
                  value={medication.dose}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Dose"
                  className="MedicationOrder-input"
                />
              </td>
              <td>
                <select
                  name="route"
                  value={medication.route}
                  onChange={(e) => handleInputChange(index, e)}
                  className="MedicationOrder-select"
                >
                  <option value="mouth">Mouth</option>
                  <option value="iv">IV</option>
                  <option value="injection">Injection</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name="frequency"
                  value={medication.frequency}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Frequency"
                  className="MedicationOrder-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="lastTaken"
                  value={medication.lastTaken}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Duration"
                  className="MedicationOrder-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="comments"
                  value={medication.comments}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Remarks"
                  className="MedicationOrder-input"
                />
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
