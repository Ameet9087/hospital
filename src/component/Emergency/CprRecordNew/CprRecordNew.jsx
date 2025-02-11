import React, { useState, useRef, useEffect } from "react";
import "./CprRecordNew.css";
import PopupTable from "../popup";
import axios from "axios";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import { useLocation } from "react-router-dom";
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
      className={`CprRecordNew-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <input
        type={type}
        className="CprRecordNew-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="CprRecordNew-floating-label">{label}</label>
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
      className={`CprRecordNew-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <select
        className="CprRecordNew-floating-select"
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
      <label className="CprRecordNew-floating-label">{label}</label>
    </div>
  );
};

const CprRecordNew = () => {
  const [mrNoData, setMrNoData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [addItems, setaddItems] = useState([]);
  const [selectedaddItems, setSelectedaddItems] = useState({});

  const location = useLocation();
  const erPatient = location.state?.receipt;

  const [formData, setFormData] = useState({
    uhid: "",
    ipNo: "",
    patientName: "",
    age: "",
    gender: "",
    admissionDate: "",
    relativeName: "",
    dateOfBirth: "",
    consultant: "",
    roomNumber: "",
    contactNumber: "",
    bedNo: "",
    address: "",
    adharCardId: "",
    descriptionOfIllness: "",
    whetherRegisterdWitAnyOtherRegisterdMedical: "",
    registerRemark: "",
    patientRegistrationId: "",
    doctorId: "",
    roomId: "",
  });

  const [medications, setMedications] = useState([
    {
      sn: 1,
      drug: "",
      dose: "",
      route: "",
      remarks: "",
    },
  ]);

  useEffect(() => {
    if (erPatient) {
      setFormData((prevData) => ({
        ...prevData,
        patientName: `${erPatient.firstName || ""} ${erPatient.middleName || ""
          } ${erPatient.lastName || ""}`.trim(),
        contactNumber: erPatient.contactNumber || "",
        dateOfBirth: erPatient.dob || "",
        gender: erPatient.sex || "",
        isEmergency: "yes",
        erInitialAssessmentId: erPatient.erInitialAssessmentId || "",
        consultant: erPatient?.addDoctor[0]?.doctorName || "",
        admissionDate: erPatient?.date || "",
        relativeName: erPatient?.relativeName || "",
      }));
    }
  }, [erPatient]);

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

  const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}`,
    timeout: 10000,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.code === "ECONNABORTED") {
        alert("Request timed out. Please check your connection and try again.");
      } else if (error.code === "ERR_NETWORK") {
        alert(
          "Network error. Please check if the server is running and accessible."
        );
      }
      throw error;
    }
  );

  const retryAxios = async (fn, retries = 3, delay = 1000) => {
    try {
      return await fn();
    } catch (error) {
      if (retries === 0) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryAxios(fn, retries - 1, delay * 2);
    }
  };

  useEffect(() => {
    if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);

  const fetchMrno = async () => {
    try {
      const response = await axiosInstance.get("/api/ip-admissions");
      setMrNoData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch patient data. Please try again.");
    }
  };

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
    }

    setActivePopup(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        descriptionOfIllness: formData.descriptionOfIllness,
        whetherRegisterdWitAnyOtherRegisterdMedical:
          formData.whetherRegisterdWitAnyOtherRegisterdMedical,
        registerRemark: formData.registerRemark,
        erInitialAssessmentDTO: {
          erInitialAssessmentId: erPatient?.erInitialAssessmentId,
        },
        diabeticMedicationsDTOS: medications.map((med, index) => ({
          addItemDTO: {
            addItemId: selectedaddItems[index]?.addItemId,
          },
          dose: med.dose,
          route: med.route,
          remarks: med.remarks,
        })),
      };

      const response = await retryAxios(() =>
        axiosInstance.post("/CPRRecordsNew", payload)
      );

      if (response.status === 200 || response.status === 201) {
        alert("CPR Records saved successfully!");
      } else {
        throw new Error("Failed to save CPR Records");
      }
    } catch (error) {
      console.error("Error saving CPR Records:", error);

      if (error.response) {
        alert(
          `Server error: ${error.response.data.message || "Unknown error"}`
        );
      } else if (error.request) {
        alert(
          "No response from server. Please check if the server is running."
        );
      } else {
        alert("Error saving CPR Records. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMedicationChange = (index, field, value) => {
    setMedications((prev) =>
      prev.map((med, i) => (i === index ? { ...med, [field]: value } : med))
    );
  };

  const handleAddRow = () => {
    setMedications((prev) => [
      ...prev,
      { sn: prev.length + 1, drug: "", dose: "", route: "", remarks: "" },
    ]);
  };

  const handleDeleteRow = (index) => {
    setMedications((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((row, idx) => ({ ...row, sn: idx + 1 }))
    );
  };

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const navigate = useNavigate();

  const handleBack = () => navigate("/emergency/erinitial");
  return (
    <div className="CprRecordNew-container">
      <div className="CprRecordNew-section">
      <div className="er-initial-assessment-com-section">
      <button className="er-initial-assessment-com-section-back" onClick={handleBack}>Back</button>
        </div>

        <div className="CprRecordNew-header">CPR Records New</div>
        <div className="CprRecordNew-grid">
          <FloatingInput
            label="Patient Name"
            value={erPatient?.erInitialAssessmentId}
          />
          <FloatingInput label="Patient Name" value={formData.patientName} />
          <FloatingInput
            label="Mobile No"
            name="contactNumber"
            value={formData.contactNumber}
          />
          <FloatingInput
            label="DOB"
            name="dateOfBirth"
            value={formData.dateOfBirth}
          />

          <FloatingInput label="Gender" value={formData.gender} />
          <FloatingInput
            label="Reg Date"
            type="date"
            value={formData.admissionDate}
          />
          <FloatingInput label="Relative Name" value={formData.relativeName} />

          <FloatingInput
            label="Consultant"
            value={formData.consultant}
            readOnly
          />

          <FloatingInput
            label="Description Of Illness"
            name="descriptionOfIllness"
            value={formData.descriptionOfIllness}
            onChange={handleChange}
          />
          <FloatingSelect
            label="Whether Registered Other"
            name="whetherRegisterdWitAnyOtherRegisterdMedical"
            value={formData.whetherRegisterdWitAnyOtherRegisterdMedical}
            onChange={handleChange}
            options={[
              { value: "select", label: "select" },
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
          />
          <FloatingInput
            label="Registered Remarks"
            name="registerRemark"
            value={formData.registerRemark}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="CprRecordNew-services-table">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Actions", "SN", "Drug", "Dose", "Route", "Remarks"].map(
                (header, index) => (
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
                )
              )}
            </tr>
          </thead>
          <tbody>
            {medications.map((row, index) => (
              <tr key={index}>
                <td>
                  <div className="CprRecordNew-table-actions">
                    <button
                      className="CprRecordNew-add-btn"
                      onClick={handleAddRow}
                    >
                      Add
                    </button>
                    <button
                      className="CprRecordNew-del-btn"
                      onClick={() => handleDeleteRow(index)}
                      disabled={medications.length <= 1}
                    >
                      Del
                    </button>
                  </div>
                </td>
                <td>{row.sn}</td>
                <td>
                  <div className="CprRecordNew-search-field">
                    <input
                      className="CprRecordNew-tableinput"
                      type="text"
                      value={selectedaddItems[index]?.itemName || ""}
                      readOnly
                    />
                    <button
                      className="CprRecordNew-search-icon"
                      onClick={() => setActivePopup("AddItem")}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path
                          fill="currentColor"
                          d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* <div className="CprRecordNew-search-field">
                    <button
                      className="CprRecordNew-search-icon"
                      onClick={() => setActivePopup("AddItem")}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path
                          fill="currentColor"
                          d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      value={selectedaddItems[index]?.itemName || ""}
                      readOnly
                    />
                  </div> */}
                </td>
                <td>
                  <input
                    className="CprRecordNew-tableinput"
                    type="text"
                    value={row.dose}
                    onChange={(e) =>
                      handleMedicationChange(index, "dose", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    className="CprRecordNew-tableinput"
                    type="text"
                    value={row.route}
                    onChange={(e) =>
                      handleMedicationChange(index, "route", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    className="CprRecordNew-tableinput"
                    type="text"
                    value={row.remarks}
                    onChange={(e) =>
                      handleMedicationChange(index, "remarks", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="CprRecordNew-buttons">
        <button className="btn-blue" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={(data) => handleSelect(data, medications.length - 1)}
          onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  );
};

export default CprRecordNew;
