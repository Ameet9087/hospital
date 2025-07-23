import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./linensType.css";
import { FaArrowCircleRight } from "react-icons/fa";
import LinenMaster from "../LinenMaster/LinenMaster";
import LinenRequirement from "../LinenRequirement/linenRequirement";
import LaundryStaffMapping from "../LaundryStaffMapping/LaundryStaffMapping";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";
import { API_BASE_URL } from '../../api/api'


function NavNotification() {
  const [selectedTab, setSelectedTab] = useState("LinensType"); // State to keep track of the selected tab
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [formData, setFormData] = useState({
    linenType: "",
    laundryServices: "",
    description: "",
  });

  const [laundryServiceOptions, setLaundryServiceOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const apiUrl = "http://192.168.4.209:8080/api/linenTypes";

  // Fetch laundry service options from backend
  useEffect(() => {
    const fetchLaundryServices = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        if (response.status === 200) {
          const services = response.data.map((item) => item.laundryServices);
          setLaundryServiceOptions([...new Set(services)]); // Remove duplicates
        }
      } catch (error) {
        console.error("Error fetching laundry services:", error);
        setMessage("Failed to load laundry services.");
      }
    };

    fetchLaundryServices();
  }, []);

  // Handler to update state when input changes


  const handleClear = () => {
    setFormData({
      linenType: "",
      laundryServices: "",
      description: "",
    });
    setMessage("");
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.linenType || !formData.laundryServices) {
      setMessage("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);
    setMessage("Submitting...");

    const payload = {
      linenType: formData.linenType,
      laundryServices: formData.laundryServices, // Include multiple selected services as a comma-separated string
      description: formData.description,
    };
    console.log("hhhhhhhhhh", payload);
    try {
      const response = await axios.post(`${API_BASE_URL}/linenTypes`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201 || response.status === 200) {
        console.log("Data submitted successfully!", payload);
        toast.success("Data submitted successfully!")
        handleClear(); // Clear the form after successful submission
      } else {
        setMessage(`Failed to submit data. Status code: ${response.status}`);
        toast.error("Failed to submit data!")
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error submitting data. Please try again.");
      toast.error("Failed to submit data!")
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="linensTypeMain-page">
      <div className="linensTypeMain-N-imu-btn">
        <div className="linensTypeMain-tabs">
          <button
            className={`linensTypeMain-tab ${selectedTab === "LinensType" ? "linensTypeMain-active" : ""
              }`}
            onClick={() => setSelectedTab("LinensType")}
          >
            Linen Type
          </button>
          {/* </div> */}
          {/* <div className="linensTypeMain-tabs">  */}
          <button
            className={`linensTypeMain-tab ${selectedTab === "LinenMaster" ? "linensTypeMain-active" : ""
              }`}
            onClick={() => setSelectedTab("LinenMaster")}
          >
            Linen Master
          </button>
          <button
            className={`linensTypeMain-tab ${selectedTab === "LinenRequirement" ? "linensTypeMain-active" : ""
              }`}
            onClick={() => setSelectedTab("LinenRequirement")}
          >
            Linen Requirement
          </button>
          <button
            className={`linensTypeMain-tab ${selectedTab === "LaundryStaffMapping"
              ? "linensTypeMain-active"
              : ""
              }`}
            onClick={() => setSelectedTab("LaundryStaffMapping")}
          >
            LaundryStaffMapping
          </button>
        </div>
      </div>

      {selectedTab === "LinensType" && (
        <div className="linensType-section">
          <div className="linensType-grid">
            <FloatingInput
              label="Linen Type"
              value={formData.linenType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  linenType: e.target.value, // Correctly updating linenType
                })
              }
            />
            <FloatingSelect
              label="Laundry Services"
              name="laundryServices"
              value={formData.laundryServices}
              options={[
                { label: "Washing", value: "washing" },
                { label: "Dry Cleaning", value: "dry_cleaning" },
                { label: "Ironing", value: "ironing" },
                { label: "Folding", value: "folding" },
                ...laundryServiceOptions.map((service) => ({
                  value: service,
                  label: service,
                })),
              ]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  laundryServices: e.target.value,
                })
              }
              required
            />

            <FloatingInput
              label="Description"
              type="tel"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value, // Correctly updating linenType
                })
              }
            />
            
          </div>
          <div className="LinenType-action-buttons">
              <button
                type="button"
                className="btn-blue"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button onClick={handleClear}>Reseat</button>
              
            </div>
        </div>
      )}
      {selectedTab === "LinenMaster" && <LinenMaster />}
      {selectedTab === "LinenRequirement" && <LinenRequirement />}
      {selectedTab === "LaundryStaffMapping" && <LaundryStaffMapping />}
    </div>
  );
}

export default NavNotification;
