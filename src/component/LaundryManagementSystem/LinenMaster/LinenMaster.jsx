import React, { useState, useRef, useEffect } from "react";
import "./LinenMaster.css";
import PopupTable from "../../Admission/PopupTable";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";

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

  const handleUpdate = async () => {
    try {
      const payload = {
        linenMaster: formData.linenMaster,
        description: formData.description,
        linenTypeDTO: {
          linenTypeId: addLinnenTypes?.linenTypeId, // Ensure this is populated correctly
          linenType: addLinnenTypes?.linenType,
          description: addLinnenTypes?.description,
          // Add any other fields the backend expects
        },
      };
      console.log("Payload being sent to API:", JSON.stringify(payload));
      const response = await axios.post(`${API_BASE_URL}/linenMaster`, payload);
      console.log("Data saved successfully:", response.data);
      toast.success("Linen Master data saved successfully!");
      handleClear();
    } catch (error) {
      console.error(
        "Error saving data:",
        error.response?.data || error.message
      );
      toast.error("Failed to save Linen Master data. Server error occurred.");
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
              <FloatingInput
                label="Linen Type"
                type="search"
                value={formData.linenType}
                onIconClick={() => setActivePopup("linenType")}
              />
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
          <button className="btn-orange" onClick={handleClear} type="button">
            Reseat
          </button>
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
