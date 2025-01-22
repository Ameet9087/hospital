import React, { useState, useEffect } from "react";
import "./AMCTrackerPopUp.css";
import { FaSearch } from "react-icons/fa";
import PopupTable from '../../../Admission/PopupTable';
import { API_BASE_URL } from "../../../api/api";

const AMCTrackerPopUp = ({ bookingId }) => {
  const [id, setId] = useState(bookingId || "");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState([]);

  const [equipments, setEquipments] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  const [activePopup, setActivePopup] = useState("")


  const SearchIcon = FaSearch;



  const [formData, setFormData] = useState({
    contractType: "",
    datePeriod: "",
    fromDate: "",
    toDate: "",
    categoryId: "",
    vendorId: "",
    equipmentMasterId: "",
  });


  // Fetch data for categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/asset-categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);

      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);



  // Fetch data for vendors
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/vendors/getAllVendors`);
        if (!response.ok) {
          throw new Error("Failed to fetch vendors");
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);



  // Fetch data for equipment
  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/equipment-masters`);
        if (!response.ok) {
          throw new Error("Failed to fetch equipments");
        }
        const data = await response.json();
        setEquipments(data);
      } catch (error) {
        console.error("Error fetching equipments:", error);
      }
    };

    fetchEquipments();
  }, []);



  const getPopupData = () => {
    if (activePopup === "category") {
      return {
        columns: ["categoryId", "assetCategory"], data: categories
      };
    }
    else if (activePopup === "supplier") {
      return {
        columns: ["id", "vendorName"], data: vendors
      };
    }
    else if (activePopup === "equipment") {
      return {
        columns: ["equipmentMasterId", "equipmentName"], data: equipments
      };
    }
    else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "category") {
      setSelectedCategory(data)
    }
    else if (activePopup === "supplier") {
      setSelectedVendor(data)
    }
    else if (activePopup === "equipment") {
      setSelectedEquipment(data)
    }

    setActivePopup(null); // Close the popup after selection
  };



  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Save data to API
  const handleSave = async () => {
    const payload = {
      contractType: formData.contractType,
      datePeriod: formData.datePeriod,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      assetCateMasterDTO: {
        categoryId: selectedCategory?.categoryId
      },
      vendorDTO: {
        id: selectedVendor?.id
      },
      equipmentMasterDTO: {
        equipmentMasterId: selectedEquipment?.equipmentMasterId
      },
    };


    try {
      const response = await fetch(`${API_BASE_URL}/amc-tracker`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),

      });


      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const result = await response.json();
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  return (
    <div className="AMCTrackerPopUp-surgery-Events">
      <div className="AMCTrackerPopUp-surgeryEvents-title-bar">
        <div className="AMCTrackerPopUp-surgeryEvents-header">
          <span>AMC Tracker</span>
        </div>
      </div>
      <div className="AMCTrackerPopUp-surgeryEvents-content-wrapper">
        <div className="AMCTrackerPopUp-surgeryEvents-main-section">
          <div className="AMCTrackerPopUp-surgeryEvents-panel dis-templates">
            <div className="AMCTrackerPopUp-surgeryEvents-panel-content">
              <div className="AMCTrackerPopUp-surgeryEvents-form-row">
                <label>Contract Type:</label>
                <select name="contractType" value={formData.contractType} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="Warranty">Warranty</option>
                  <option value="AMC">AMC</option>
                  <option value="CMC">CMC</option>
                  <option value="On Call">On Call</option>
                  <option value="All">All</option>
                </select>
              </div>
            </div>
          </div>
          {activePopup && (
            <PopupTable
              columns={columns}
              data={data}
              onSelect={handleSelect}
              onClose={() => setActivePopup(false)}
            />
          )}
          <div className="AMCTrackerPopUp-surgeryEvents-panel operation-details">
            <div className="AMCTrackerPopUp-surgeryEvents-panel-content">
              <div className="AMCTrackerPopUp-surgeryEvents-form-row">
                <label>Date Period:</label>
                <input
                  type="date"
                  name="datePeriod"
                  value={formData.datePeriod}
                  onChange={handleInputChange}
                  placeholder="e.g., 2024-2025"
                />
              </div>

              <div className="AMCTrackerPopUp-surgeryEvents-form-row">
                <label>Category:</label>
                <input type="text" value={selectedCategory?.assetCategory} placeholder="Search..." />
                <SearchIcon onClick={() => setActivePopup("category")} className="input-icon" size={18} />
              </div>
            </div>
          </div>
          <div className="AMCTrackerPopUp-surgeryEvents-panel operation-details">
            <div className="AMCTrackerPopUp-surgeryEvents-panel-content">
              <div className="AMCTrackerPopUp-surgeryEvents-form-row">
                <label>Supplier:</label>
                <input type="text" value={selectedVendor?.vendorName} placeholder="Search..." />
                <SearchIcon onClick={() => setActivePopup("supplier")} className="input-icon" size={18} />
              </div>
              <div className="AMCTrackerPopUp-surgeryEvents-form-row">
                <label>Equipment Name:</label>
                <input type="text" value={selectedEquipment?.equipmentName} placeholder="Search..." />
                <SearchIcon onClick={() => setActivePopup("equipment")} className="input-icon" size={18} />
              </div>
            </div>
          </div>
          <div className="AMCTrackerPopUp-surgeryEvents-panel operation-details">
            <div className="AMCTrackerPopUp-surgeryEvents-panel-content">
              <div className="AMCTrackerPopUp-surgeryEvents-form-row">
                <label>From Date:</label>
                <input type="date" name="fromDate" value={formData.fromDate} onChange={handleInputChange} />
              </div>
              <div className="AMCTrackerPopUp-surgeryEvents-form-row">
                <label>To Date:</label>
                <input type="date" name="toDate" value={formData.toDate} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        </div>

        <div className="AMCTrackerPopUp-surgeryEvents-action-buttons">
          <button className="AMCTrackerPopUp-btn-blue" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AMCTrackerPopUp;
