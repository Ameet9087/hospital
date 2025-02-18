import React, { useState, useRef, useEffect } from "react";
import PopupTable from "../popup";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./NacoticDrugdispensed.css";
import { API_BASE_URL } from "../../api/api";
import { useNavigate } from "react-router-dom";

const FloatingInput = ({ label, type = "text", value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div
      className={`nacotic-drug-dispensed-form-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <input
        type={type}
        className="nacotic-drug-dispensed-form-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="nacotic-drug-dispensed-form-floating-label">
        {label}
      </label>
    </div>
  );
};

const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div
      className={`nacotic-drug-dispensed-form-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <select
        className="nacotic-drug-dispensed-form-floating-select"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== "");
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== "");
          if (props.onChange) props.onChange(e);
        }}
        {...props}
      >
        <option value="">{ }</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="nacotic-drug-dispensed-form-floating-label">
        {label}
      </label>
    </div>
  );
};

const NarcoticDrugDispensedForm = () => {
  const [addItems, setaddItems] = useState([]);
  const [selectedaddItems, setSelectedaddItems] = useState({});
  const location = useLocation();
  const { receipt } = location.state || {};
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [formData, setFormData] = useState({
    uhid: receipt?.uhid || "",
    ipNumber: receipt?.ipNumber || "",
    erInitialAssessmentId: receipt?.erInitialAssessmentId || "",
    patientName: `${receipt?.firstName || ""} ${receipt?.lastName || ""
      }`.trim(),
    fatherHusbandName: receipt?.relativeName || "",
    age: receipt?.age || "",
    sex: receipt?.sex || "",
    relativeName: receipt?.relativeName || "",
    contactNumber: receipt?.contactNumber || "",
    admissionDate: receipt?.date || "",
    dateOfBirth: receipt?.dob || "",
    department: receipt?.department || "",
    ward: receipt?.ward || "",
    roomBedNo: `${receipt?.roomNumber || ""} / ${receipt?.bedNo || ""}`.trim(),
    arNumber: receipt?.arNumber || "",
    mechanismOfInjury: receipt?.mechanismOfInjury || "",
    incidentDate: receipt?.incidentDate || "",
    time: receipt?.time || "",
    location: receipt?.location || "",
    finalDiagnosis: receipt?.finalDiagnosis || "",
    natureOfInjury: receipt?.natureOfInjury || "",
    consultant: receipt?.consultant || "",
    regNumber: receipt?.regNumber || "",
    otherMedical: "",
    illness: "",
    remark: "",
  });

  const [rows, setRows] = useState([
    { addItemId: null, addItemName: "", dose: "", route: "", remarks: "" },
  ]);

  const tableRef = useRef(null);
  const [mrNoData, setMrNoData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { addItemId: null, addItemName: "", dose: "", route: "", remarks: "" },
    ]);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/add-item`)
      .then((response) => response.json())
      .then((data) => {
        setaddItems(data);
      })
      .catch((error) =>
        console.error("Error fetching Gate Pass In data:", error)
      );
  }, []);

  const getPopupData = () => {
    if (activePopup === "AddItem") {
      return {
        columns: ["addItemId", "itemName"],
        data: addItems.map((item) => ({
          addItemId: item.addItemId,
          itemName: item.itemMaster?.itemName || "N/A",
        })),
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data, index) => {
    if (activePopup === "AddItem") {
      setSelectedaddItems((prev) => ({
        ...prev,
        [index]: data,
      }));
      setRows((prevRows) => {
        const newRows = [...prevRows];
        newRows[selectedRowIndex] = {
          ...newRows[selectedRowIndex],
          addItemId: data.addItemId,
          addItemName: data.itemName,
        };
        return newRows;
      });
    }
    setActivePopup(null);
  };

  const handleDeleteRow = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index] = {
        ...newRows[index],
        [field]: value,
      };
      return newRows;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      otherMedical: formData.otherMedical,
      remark: formData.remark,
      illness: formData.illness,
      erInitialAssessmentDTO: {
        erInitialAssessmentId: parseInt(formData.erInitialAssessmentId),
      },
      diabeticMedicationsDTOS: rows.map((row) => ({
        addItemDTO: {
          addItemId: row.addItemId,
        },
        dose: row.dose,
        route: row.route,
        remarks: row.remarks,
      })),
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/narcotic-drug-dispensed`,
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Form submitted successfully!");
      } else {
        throw new Error("Failed to submit form data");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit form.");
    }
  };

  const fetchMrno = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/ip-admissions`
      );
      setMrNoData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleBack = () => navigate("/emergency/erinitial");
  const navigate = useNavigate();
  return (
    <>
      <div className="nacotic-drug-dispensed-form-container">
        <div className="nacotic-drug-dispensed-form-section">
        <div className="er-initial-assessment-com-section">
        <button className="er-initial-assessment-com-section-back" onClick={handleBack}>Back</button>
        </div>

          <div className="nacotic-drug-dispensed-form-header">
            Narcotic Drugs Dispensed
          </div>
          <div className="nacotic-drug-dispensed-form-grid">
            <FloatingInput
              label="ER No"
              value={formData.erInitialAssessmentId}
              name="erInitialAssessmentId"
              onChange={handleChange}
            />
            <FloatingInput
              label="Patient Name"
              value={formData.patientName}
              readOnly
            />

            <FloatingInput
              label="Mobile Number"
              name="contactNumber"
              onChange={handleChange}
              value={formData.contactNumber}
            />
            <FloatingInput
              label="DOB"
              value={formData.dateOfBirth}
              name="dateOfBirth"
              onChange={handleChange}
            />
            <FloatingInput
              label="Sex"
              value={formData.sex}
              name="sex"
              onChange={handleChange}
            />
            <FloatingInput
              label="Date Of Admission"
              type="date"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleChange}
            />
            <FloatingInput
              label="Relative Name"
              name="relativeName"
              value={formData.relativeName}
              onChange={handleChange}
            />
            <FloatingInput
              label="Other Medical"
              name="otherMedical"
              value={formData.otherMedical}
              onChange={handleChange}
            />
            <div className="nacotic-drug-dispensed-form-search-field">
              <FloatingInput
                label="Illness"
                name="illness"
                value={formData.illness}
                onChange={handleChange}
              />
            </div>
            <div className="nacotic-drug-dispensed-form-search-field">
              <FloatingInput
                label="Remark"
                name="remark"
                value={formData.remark}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {activePopup && (
          <PopupTable
            columns={columns}
            data={data}
            onSelect={handleSelect}
            onClose={() => setActivePopup(null)}
          />
        )}
      </div>

      <table ref={tableRef} className="nacotic-drug-dispensed-form-table">
        <thead>
          <tr>
            <th>Actions</th>
            <th>SN</th>
            <th>Drug</th>
            <th>Dose</th>
            <th>Route</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <button
                  className="nacotic-drug-dispensed-form-add-btn"
                  onClick={handleAddRow}
                >
                  Add
                </button>
                <button
                  className="nacotic-drug-dispensed-form-del-btn"
                  onClick={() => handleDeleteRow(index)}
                  disabled={rows.length <= 1}
                >
                  Del
                </button>
              </td>
              <td>{index + 1}</td>
              <td>
                <div className="nacotic-drug-dispensed-form-search-field">
                  <input
                    type="text"
                    className="nacotic-drug-dispensed-form-tableinput"
                    value={row.addItemName}
                    readOnly
                  />
                  <button
                    className="nacotic-drug-dispensed-form-search-icon"
                    onClick={() => {
                      setSelectedRowIndex(index);
                      setActivePopup("AddItem");
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path
                        fill="currentColor"
                        d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td>
                <input
                  className="nacotic-drug-dispensed-form-tableinput"
                  type="text"
                  value={row.dose}
                  onChange={(e) =>
                    handleRowChange(index, "dose", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  className="nacotic-drug-dispensed-form-tableinput"
                  type="text"
                  value={row.route}
                  onChange={(e) =>
                    handleRowChange(index, "route", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  className="nacotic-drug-dispensed-form-tableinput"
                  type="text"
                  value={row.remarks}
                  onChange={(e) =>
                    handleRowChange(index, "remarks", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="nacotic-drug-dispensed-form-buttons">
        <button className="btn-blue" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </>
  );
};

export default NarcoticDrugDispensedForm;
