import React, { useState, useRef, useEffect } from "react";
import "./DiabeticChartForm.css";
import PopupTable from "../popup";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../api/api";
import { useNavigate } from "react-router-dom";

// FloatingInput component remains exactly the same
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
      className={`diabetic-chart-form-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <input
        type={type}
        className="diabetic-chart-form-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="diabetic-chart-form-floating-label">{label}</label>
    </div>
  );
};

// FloatingSelect component remains exactly the same
const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div
      className={`diabetic-chart-form-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <select
        className="diabetic-chart-form-floating-select"
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
      <label className="diabetic-chart-form-floating-label">{label}</label>
    </div>
  );
};

const DiabeticChartForm = () => {
  const [addItems, setaddItems] = useState([]);
  const [selectedaddItems, setSelectedaddItems] = useState({});
  const location = useLocation();
  const { receipt } = location.state || {};

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
    bloodSugarValuesCBG: receipt?.bloodSugarValuesCBG || "",
    urineAcetone: receipt?.urineAcetone || "",
  });
  const [rows, setRows] = useState([
    {
      sn: 1,
      drug: "",
      drugid: "", // for addItems
      dose: "",
      route: "",
      serviceName: "",
      serviceId: "", // for serviceDetailsDTO
      remarks: ""
    },
  ]);

  const tableRef = useRef(null);
  const [mrNoData, setMrNoData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); // Track the selected row index
  const navigate = useNavigate();
  const [serviceDetails, setServiceDetails] = useState([]); // Moved serviceDetails here

  useEffect(() => {
    if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { sn: prevRows.length + 1, drugid: "", drug: "", dose: "", route: "", remarks: "" },
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
    } else if (activePopup === "ServiceName") {
      return {
        columns: ["serviceDetailsId", "serviceName"],
        data: serviceDetails.map((service) => ({
          serviceDetailsId: service.serviceDetailsId,
          serviceName: service.serviceName,
        })),
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/service-details`);
        setServiceDetails(response.data);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchServiceDetails();
  }, []);

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
          drug: data.itemName,
          drugid: data.addItemId,
          // Do not clear service fields
        };
        return newRows;
      });
    } else if (activePopup === "ServiceName") {
      const selectedService = serviceDetails.find(
        (service) => service.serviceDetailsId === data.serviceDetailsId
      );
      if (selectedService) {
        setRows((prevRows) => {
          const newRows = [...prevRows];
          newRows[selectedRowIndex] = {
            ...newRows[selectedRowIndex],
            serviceName: selectedService.serviceName,
            serviceId: selectedService.serviceDetailsId,
            // Do not clear drug fields
          };
          return newRows;
        });
      }
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

    // Validate required fields
    if (!formData.erInitialAssessmentId) {
      alert("ER Initial Assessment ID is required");
      return;
    }

    // Prepare services and items arrays
    const services = rows
      .filter(row => row.serviceId) // Only include rows with serviceId
      .map(row => ({
        serviceDetailsId: parseInt(row.serviceId)
      }));

    const items = rows
      .filter(row => row.drugid) // Only include rows with drugid
      .map(row => ({
        addItemId: parseInt(row.drugid)
      }));

    // Check if at least one service or item is selected
    if (services.length === 0 && items.length === 0) {
      alert("Please select at least one service or item");
      return;
    }

    const submissionData = {
      rate: 0,
      status: "PAID",
      erInitialAssessmentDTO: {
        erInitialAssessmentId: parseInt(formData.erInitialAssessmentId)
      },
      serviceDetailsDTO: services,
      addItems: items
    };
    console.log(JSON.stringify(submissionData, null, 2));


    try {
      const response = await axios.post(
        `http://192.168.1.53:4096/api/er-payments`,
        submissionData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response) {
        console.log("Form submitted successfully:", response.data);
        alert("Form submitted successfully!");

        // Reset form after successful submission
        setRows([{
          sn: 1,
          drug: "",
          drugid: "",
          dose: "",
          route: "",
          serviceName: "",
          serviceId: "",
          remarks: ""
        }]);
      } else {
        throw new Error("Failed to submit form data");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit form");
    }
  };

  const fetchMrno = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/ip-admissions`
      );
      setMrNoData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleBack = () => navigate("/emergency/erinitial");

  return (
    <>
      <div className="diabetic-chart-form-container">
        <div className="diabetic-chart-form-section">
          <div className="er-initial-assessment-com-section">
            <button className="er-initial-assessment-com-section-back" onClick={handleBack}>Back</button>
          </div>

          <div className="diabetic-chart-form-header">
            Diabetic Chart Details


          </div>
          <div className="diabetic-chart-form-grid">
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
              label="Blood Sugar Values"
              name="bloodSugarValuesCBG"
              value={formData.bloodSugarValuesCBG}
              onChange={handleChange}
            />
            <FloatingInput
              label="Urine Acetone"
              name="urineAcetone"
              value={formData.urineAcetone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="diabetic-chart-form-header">Diabetic Chart Details</div>
      <table ref={tableRef} className="diabetic-chart-form-table">
        <thead>
          <tr>
            <th>Actions</th>
            <th>SN</th>
            <th>Drug</th>
            <th>Dose</th>
            <th>Route</th>
            <th>Service Name</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <button
                  className="diabetic-chart-form-add-btn"
                  onClick={handleAddRow}
                >
                  Add
                </button>
                <button
                  className="diabetic-chart-form-del-btn"
                  onClick={() => handleDeleteRow(index)}
                  disabled={rows.length <= 1}
                >
                  Del
                </button>
              </td>
              <td>{row.sn}</td>
              <td>
                <div className="diabetic-chart-form-search-field">
                  <input
                    className="diabetic-chart-form-tableinput"
                    type="text"
                    value={row.drug} // Display the selected drug name
                    readOnly
                  />
                  <button
                    className="diabetic-chart-form-search-icon"
                    onClick={() => {
                      setSelectedRowIndex(index); // Set the selected row index
                      setActivePopup("AddItem"); // Open the popup
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
                  className="diabetic-chart-form-tableinput"
                  type="text"
                  value={row.dose}
                  onChange={(e) =>
                    handleRowChange(index, "dose", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  className="diabetic-chart-form-tableinput"
                  type="text"
                  value={row.route}
                  onChange={(e) =>
                    handleRowChange(index, "route", e.target.value)
                  }
                />
              </td>
              <td>
                <div className="diabetic-chart-form-search-field">
                  <input
                    className="diabetic-chart-form-tableinput"
                    type="text"
                    value={row.serviceName || ""} // Display the selected service name
                    readOnly
                  />
                  <button
                    className="diabetic-chart-form-search-icon"
                    onClick={() => {
                      setSelectedRowIndex(index); // Set the selected row index
                      setActivePopup("ServiceName"); // Open the popup for service name
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
                <input className="diabetic-chart-form-tableinput"
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
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={(data) => handleSelect(data, selectedRowIndex)} // Pass the selected row index
          onClose={() => setActivePopup(null)}
        />
      )}
      <div className="diabetic-chart-form-buttons">
        <button className="btn-blue" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </>
  );
};

export default DiabeticChartForm;