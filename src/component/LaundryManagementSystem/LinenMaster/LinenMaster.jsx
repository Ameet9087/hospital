import React, { useState, useRef, useEffect } from "react";
import "./LinenMaster.css";
import PopupTable from "../../Admission/PopupTable";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";

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
      className={`LinenMaster-form-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <input
        type={type}
        className="LinenMaster-form-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="LinenMaster-form-floating-label">{label}</label>
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
      className={`LinenMaster-form-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <select
        className="LinenMaster-form-floating-select"
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
      <label className="LinenMaster-form-floating-label">{label}</label>
    </div>
  );
};
const LinenMaster = () => {
  const [activePopup, setActivePopup] = useState("");
  const [addLinnenTypes, setAddLinnenTypes] = useState([]);
  const [formData, setFormData] = useState({
    linenMaster: "",
    linenTypeDTO: {
      linenId: "",
      linenType: "",
    },
    description: "",
  });
  const [linenTypes, setLinenTypes] = useState([]);

  const ipnoHeading = ["linenTypeId", "linenType"];
  const [showDropdown, setShowDropdown] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "linenType") {
      setFormData((prevData) => ({
        ...prevData,
        linenTypeDTO: {
          ...prevData.linenTypeDTO,
          linenType: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleClear = () => {
    setFormData({
      linenMaster: "",
      linenTypeDTO: {
        linenId: "",
        linenType: "",
      },
      description: "",
    });
    setMessage("");
  };
  const fetchLinenTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/linenTypes`);

      setLinenTypes(response.data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching linen types:", error);
      setMessage("Failed to fetch linen types. Please try again.");
    }
  };
  useEffect(() => {
    fetchLinenTypes();
  }, []);
  // const handleSelectLinenType = (linen) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     linenTypeDTO: {
  //       linenId: linen.linenId,
  //       linenType: linen.linenType,
  //     },
  //   }));
  //   setShowDropdown(false);
  // };
  const handleUpdate = async () => {
    try {
      const payload = {
        linenMaster: formData.linenMaster,
        description: formData.description,
        linenTypeDTO: {
          linenTypeId: addLinnenTypes?.linenTypeId, // Ensure this is populated correctly
          linenType: addLinnenTypes?.linenType,
          description: addLinnenTypes?.description
          // Add any other fields the backend expects
        },
      };
      console.log("Payload being sent to API:", JSON.stringify(payload));
      const response = await axios.post(`${API_BASE_URL}/linenMaster`, payload);
      console.log("Data saved successfully:", response.data);
      setMessage("Linen Master data saved successfully!");
      handleClear();
    } catch (error) {
      console.error("Error saving data:", error.response?.data || error.message);
      setMessage("Failed to save Linen Master data. Server error occurred.");
    }
  };


  const handleSelect = (data) => {
    if (!data) return;

    if (activePopup === "linenType") {
      setAddLinnenTypes(data);
      setFormData((prev) => ({
        linenType: data.linenType,
      }));
    }
    setActivePopup(null);
  };
  const getPopupData = () => {
    if (activePopup === "linenType") {
      return { columns: ipnoHeading, data: linenTypes };
    }
    return { columns: [], data: [] };
  };
  const { columns, data } = getPopupData();
  return (
    <>
      <div className="LinenMaster-container">
        <div className="LinenMaster-section">
          <div className="LinenMaster-grid">
            <div className="LinenMaster-search-field">
              <FloatingInput label="Linen Type" value={formData.linenType} />
              <button
                className="LinenMaster-search-icon"
                onClick={() => setActivePopup("linenType")}
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                  />
                </svg>
              </button>
            </div>
            <FloatingInput
              label="Linen Master"
              name="linenMaster"
              value={formData.linenMaster}
              onChange={handleInputChange}
            />
            <FloatingInput
              label="Description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* <div className="LinenMaster-header">
          Details of the Bill to be Cancelled
        </div> */}

        <div className="LinenMaster-action-buttons">
          <button className="btn-blue" onClick={handleUpdate}>
            Save
          </button>
          <button className="btn-red">Delete</button>
          <button className="btn-orange" onClick={handleClear} type="button">
            Clear
          </button>
          <button className="btn-gray">Close</button>
          <button className="btn-blue">Search</button>
          <button className="btn-gray">Tracking</button>
          <button className="btn-green">Print</button>
          <button className="btn-gray">Version Comparison</button>
          <button className="btn-gray">SDC</button>
          <button className="btn-gray">Testing</button>
          <button className="btn-blue">Info</button>
        </div>
        {message && <p className="message">{message}</p>}
        {activePopup && (
          <PopupTable
            columns={columns}
            data={data}
            onSelect={handleSelect}
            onClose={() => setActivePopup(false)}
          />
        )}
      </div>
    </>
  );
};

export default LinenMaster;
