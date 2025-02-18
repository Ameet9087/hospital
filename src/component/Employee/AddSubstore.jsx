import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageSubstore.css";
import { API_BASE_URL } from "../api/api";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
  PopupTable
} from "../../FloatingInputs";
import { toast } from "react-toastify";


const AddSubStore = ({ substore, onClose }) => {
  console.log("editing",substore);
  

  const [errors, setErrors] = useState({});
  const [activePopup, setActivePopup] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [location, setLocation] = useState(null);


  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/location-masters`);
        setLocation(response.data);
        console.log(response.data, "prachi");

      } catch (error) {
        console.error("Error fetching location data:", error);

      }
    };
    fetchLocationData();
  }, [])


  const [formData, setFormData] = useState({
    subStoreName: substore?.subStoreName || "",
    maxVerificationLevel: substore?.maxVerificationLevel || "",
    code: substore?.code || "",
    email: substore?.email || "",
    contactNo: substore?.contactNo || "",
    location: substore?.location || "",
    subStoreDescription: substore?.subStoreDescription || "",
    isActive: !substore?.isActive || "true",
    label: substore?.label || "",
    locationMaster: {
      id: substore?.locationMasterDTO?.id || selectedLocation?.id
    }
  });
  
  useEffect(() => {
    if (substore) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        subStoreName: substore.subStoreName || "",
        maxVerificationLevel: substore.maxVerificationLevel || "",
        code: substore.code || "",
        email: substore.email || "",
        contactNo: substore.contactNo || "",
        location: substore.location || "",
        subStoreDescription: substore.subStoreDescription || "",
        isActive: substore.isActive ?? "true",
        label: substore.label || "",
        locationMaster: {
          id: substore.locationMasterDTO?.id || ""
        }
      }));
  
      setSelectedLocation(substore.locationMasterDTO || { id: "" });
    }
  }, [substore]);

  const getPopupData = () => {
    if (activePopup === "location") {
      return {
        columns: ["id", "locationName", "locationCode"],
        data: location,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "location") {
      setSelectedLocation(data);
      console.log(data, "selectedLocation");

      // Update formData with the selected location's ID
      setFormData((prevFormData) => ({
        ...prevFormData,
        locationMaster: {
          id: data.id, // Assuming 'data' contains the location with 'id' field
        },
      }));
    }
    setActivePopup(null); // Close the popup after selection
  };




  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Perform real-time validation
    if (name === "maxVerificationLevel") {
      if (value < 0) {
        setErrors((prev) => ({
          ...prev,
          maxVerificationLevel:
            "Max Verification Level must be a positive number.",
        }));
      } else {
        setErrors((prev) => {
          const { maxVerificationLevel, ...rest } = prev;
          return rest;
        });
      }
    }

    if (name === "contactNo") {
      const phoneRegex = /^[0-9]{0,10}$/; // Only allow up to 10 digits
      if (!phoneRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          contactNo: "Contact number must be numeric and up to 10 digits.",
        }));
      } else {
        setErrors((prev) => {
          const { contactNo, ...rest } = prev;
          return rest;
        });
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    try {
      if (substore) {
        await axios.put(
          `${API_BASE_URL}/substores/update/${substore.subStoreId}`,
          formData
        );
        toast.success("SubStore updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/substores/create-substore`, formData);
        toast.success("SubStore added successfully!");
      }
      onClose();
    } catch (error) {
      console.error(
        "Error saving substore:",
        error.response?.data || error.message
      );
      toast.error("Failed to save substore. Please try again.");
    }
  };

  const handleReset = () => {
    setFormData({
      subStoreName: "",
      maxVerificationLevel: "",
      code: "",
      email: "",
      contactNo: "",
      location: "",
      subStoreDescription: "",
      isActive: "true",
      label: "",
      locationMaster: { id: "" }, // Reset locationMaster ID
    });
  
    setSelectedLocation(null); // Reset selected location
  };
  

  return (
    <div className="update-substore-conatainer">
      <div>
        <h2>{substore ? "Update SubStore" : "Add SubStore"}</h2>
        {errors.contactNo && (
          <span className="error-message">{errors.contactNo}</span>
        )}

        {errors.maxVerificationLevel && (
          <span className="error-message">{errors.maxVerificationLevel}</span>
        )}
      </div>
      <form className="update-substore-form-container" onSubmit={handleSubmit}>
        <div className="update-substore-form-grid">

          <div className="update-substore-form-group">
            <FloatingInput
              label={"Location"}
              type="search"
              value={selectedLocation?.locationName}
              onChange={handleInputChange}
              onIconClick={() => setActivePopup("location")}
            />
          </div>


          <div className="update-substore-form-group">
            <FloatingInput
              label={"SubStore Name "}
              type="text"
              name="subStoreName"
              value={formData.subStoreName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="update-substore-form-group">
            <FloatingInput
              label={"Code"}
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              readOnly={!!substore}
            />
          </div>
          <div className="update-substore-form-group">
            <FloatingInput
              label={"Email"}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="update-substore-form-grid">
          <div className="update-substore-form-group">
            <FloatingInput
              label={"Contact No"}
              type="text"
              name="contactNo"
              restrictions={{ number: true, max: 10 }}
              value={formData.contactNo}
              onChange={handleInputChange}
            />
          </div>
          <div className="update-substore-form-group">
            <FloatingInput
              label={"Location"}
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="update-substore-form-group">
            <FloatingInput
              label={"Label"}
              type="text"
              name="label"
              value={formData.label}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="update-substore-form-grid">
          <div className="update-substore-form-group">
            <FloatingInput
              label={"Max Verification Lavel"}
              type="number"
              name="maxVerificationLevel"
              value={formData.maxVerificationLevel}
              onChange={handleInputChange}
            />
          </div>
          <div className="update-substore-form-group"></div>
          <div className="update-substore-form-group"></div>
        </div>
        <div className="update-substore-form-grid">
          <div className="update-substore-form-group">
            <FloatingTextarea
              label={"SubStore Description"}
              name="subStoreDescription"
              value={formData.subStoreDescription}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="update-substore-form-button-group">
          <button type="submit" className="update-substore-update-btn">
            {substore ? "Update" : "Add"}
          </button>
          <button  onClick={handleReset} type="reset" className="update-substore-update-btn">
            reset
          </button>
        </div>
      </form>
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  );
};
export default AddSubStore;
