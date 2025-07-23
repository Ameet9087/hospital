import React, { useRef, useState } from "react";
import "./MaternityRegisterPopUp.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingSelect } from "../../../FloatingInputs";
import { toast } from 'react-toastify';
const MaternityRegisterPopUp = ({ patientData, onClose }) => {
  const [columnWidths, setColumnWidths] = useState({});
  const [formData, setFormData] = useState({
    placeOfDelivery: "",
    deliveryDateAndTime: "",
    typeOfDelivery: "",
    presentation: "",
    obstreticComplications: "",
    newBornBabies: [
      {
        babyGender: "",
        babyWeight: "",
        outComeBaby: "",
        outComeMother: "",
      },
    ],
  });

  const tableRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleBabyDetailsChange = (index, field, value) => {
    const updatedBabies = [...formData.newBornBabies];
    updatedBabies[index][field] = value;
    setFormData({ ...formData, newBornBabies: updatedBabies });
  };

  const addNewBaby = () => {
    setFormData({
      ...formData,
      newBornBabies: [
        ...formData.newBornBabies,
        { babyGender: "", babyWeight: "", outComeBaby: "", outComeMother: "" },
      ],
    });
  };

  const saveData = async () => {
    // Check if all form fields are filled
    if (
      !formData.placeOfDelivery ||
      !formData.deliveryDateAndTime ||
      !formData.typeOfDelivery ||
      !formData.presentation ||
      !formData.obstreticComplications ||
      formData.newBornBabies.some(
        (baby) =>
          !baby.babyGender || !baby.babyWeight || !baby.outComeBaby || !baby.outComeMother
      )
    ) {
      toast.error("All fields are mandatory. Please fill in all details.");
      return;
    }
  
    try {
      const response = await fetch(
        `${API_BASE_URL}/maternity-register/save/${patientData?.inPatientDTO?.inPatientId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (response.ok) {
        toast.success("Proposal saved successfully!");
      } else {
        toast.error("Failed to save proposal. Please try again.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save proposal. Please try again.");
    }
  };
  

  return (
    <div className="MaternityRegisterPopUp-container">
      <div className="MaternityRegisterPopUp-header">
        <h4>Maternity Register</h4>
      </div>
      <div className="MaternityRegisterPopUp-form">
        <div className="MaternityRegisterPopUp-form-row">
          <div className="MaternityRegisterPopUp-form-group-1row">
            <div className="MaternityRegisterPopUp-form-group">
              <FloatingInput
                label={"Place of Delivery"}
                type="text"
                name="placeOfDelivery"
                placeholder="Place of Delivery"
                value={formData.placeOfDelivery}
                onChange={(e) =>
                  handleInputChange("placeOfDelivery", e.target.value)
                }
              />
            </div>
            <div className="MaternityRegisterPopUp-form-group">
              <FloatingSelect
                label={"Presentation"}
                name="presentation"
                value={formData.presentation}
                onChange={(e) =>
                  handleInputChange("presentation", e.target.value)
                }
                options={[
                  { value: "", label: "Select" },
                  { value: "Cephalic", label: "Cephalic" },
                  { value: "Breech", label: "Breech" },
                ]}
              />
            </div>
            <div className="MaternityRegisterPopUp-form-group">
              <FloatingSelect
                label={"Obstetric Complication"}
                name="obstreticComplications"
                value={formData.obstreticComplications}
                onChange={(e) =>
                  handleInputChange("obstreticComplications", e.target.value)
                }
                options={[
                  { value: "", label: "Select" },
                  { value: "None", label: "None" },
                  { value: "Pre-eclampsia", label: "Pre-eclampsia" },
                ]}
              />
            </div>
          </div>
          <div className="MaternityRegisterPopUp-form-group-1row">
            <div className="MaternityRegisterPopUp-form-group">
              <FloatingInput
                label={"Delivery Date"}
                type="date"
                name="deliveryDateAndTime"
                placeholder="Delivery Date"
                value={formData.deliveryDateAndTime?.split("T")[0] || ""}
                onChange={(e) =>
                  handleInputChange(
                    "deliveryDateAndTime",
                    `${e.target.value}T${
                      formData.deliveryDateAndTime?.split("T")[1] || "00:00"
                    }`
                  )
                }
              />
            </div>
            <div className="MaternityRegisterPopUp-form-group">
              <FloatingInput
                label={"Delivery Time"}
                type="time"
                name="deliveryDateAndTime"
                placeholder="Delivery Time"
                value={formData.deliveryDateAndTime?.split("T")[1] || ""}
                onChange={(e) =>
                  handleInputChange(
                    "deliveryDateAndTime",
                    `${
                      formData.deliveryDateAndTime?.split("T")[0] ||
                      new Date().toISOString().split("T")[0]
                    }T${e.target.value}`
                  )
                }
              />
            </div>
            <div className="MaternityRegisterPopUp-form-group">
              <FloatingSelect
                label={"Type of Delivery"}
                name="typeOfDelivery"
                value={formData.typeOfDelivery}
                onChange={(e) =>
                  handleInputChange("typeOfDelivery", e.target.value)
                }
                options={[
                  { value: "", label: "Select" },
                  { value: "Normal", label: "Normal" },
                  { value: "C-Section", label: "C-Section" },
                ]}
              />
            </div>
          </div>
          <div className="MaternityRegisterPopUp-form-row-section-1">
            <h4 className="MaternityRegisterPopUp-noANCListh4">
              New Born Baby Details
            </h4>
            <div className="MaternityRegisterPopUp-form-group-1row">
              <div className="MaternityRegisterPopUp-form-group">
                <FloatingSelect
                  label={"Number of Babies"}
                  name="numberOfBabies"
                  value={formData.numberOfBabies}
                  onChange={(e) =>
                    handleInputChange("numberOfBabies", e.target.value)
                  }
                  options={[
                    { value: "", label: "Select" },
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                    { value: "5", label: "5" },
                    { value: "6", label: "6" },
                    { value: "7", label: "7" },
                  ]}
                />
                {/* <label htmlFor="quantity">Number of Babies:</label>
                <select name="" id="">
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                  <option value="">4</option>
                  <option value="">5</option>
                  <option value="">6</option>
                </select> */}
              </div>
            </div>
          </div>
          <div className="table-container">
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Gender",
                    "Weight (grams)",
                    "Outcome of Baby",
                    "Outcome of Mother",
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
                {formData.newBornBabies.map((baby, index) => (
                  <tr key={index}>
                    <td>
                      <FloatingSelect
                        name="babyGender"
                        value={baby.babyGender}
                        onChange={(e) =>
                          handleBabyDetailsChange(
                            index,
                            "babyGender",
                            e.target.value
                          )
                        }
                        options={[
                          { value: "", label: "Select" },
                          { value: "Male", label: "Male" },
                          { value: "Female", label: "Female" },
                        ]}
                      />
                    </td>
                    <td>
                      <FloatingInput
                        type="number"
                        name="babyWeight"
                        value={baby.babyWeight}
                        min="0"
                        onChange={(e) =>
                          handleBabyDetailsChange(
                            index,
                            "babyWeight",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <FloatingInput
                        type="text"
                        name="outComeBaby"
                        value={baby.outComeBaby}
                        onChange={(e) =>
                          handleBabyDetailsChange(
                            index,
                            "outComeBaby",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                    <FloatingInput
                        type="text"
                        name="outComeMother"
                        value={baby.outComeMother}
                        onChange={(e) =>
                          handleBabyDetailsChange(
                            index,
                            "outComeMother",
                            e.target.value
                          )
                        }
                      />
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="MaternityRegisterPopUp-add-btn"
              onClick={addNewBaby}
            >
              Add Baby
            </button>
          </div>
          <div className="MaternityRegisterPopUp-form-row-section-1">
            <h4 className="MaternityRegisterPopUp-NoChildDetailsinListh4">
              Child Details
            </h4>
            <div className="table-container">
              <table ref={tableRef}>
                <thead>
                  <tr>
                    {[
                      "Delivery Date",
                      "Gender",
                      "Weight (grams)",
                      "Outcome of Baby",
                      "Outcome of Mother",
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
                  {formData.newBornBabies.map((baby, index) => (
                    <tr key={index}>
                      <td>{formData.deliveryDateAndTime.split("T")[0]}</td>
                      <td>{baby.babyGender}</td>
                      <td>{baby.babyWeight}</td>
                      <td>{baby.outComeBaby}</td>
                      <td>{baby.outComeMother}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="MaternityRegisterPopUp-form-actions">
        <button className="MaternityRegisterPopUp-add-btn" onClick={saveData}>
          Save
        </button>
        {/* <button className="MaternityRegisterPopUp-add-btn" onClick={""}>
          Print
        </button>
        <button className="MaternityRegisterPopUp-close-btn" onClick={onClose}>
          Close
        </button> */}
      </div>
    </div>
  );
};

export default MaternityRegisterPopUp;
