import React, { useEffect, useState } from "react";
import "./DoctorBlocking.css";
import AppoitmentPopupTable from "../AppoitmentPopupTable";
import { API_BASE_URL } from "../../api/api";
import IpMasterPopupTable from "../../Employee/IPMaster/IpMasterPopupTable";
import axios from "axios";
import { FloatingInput, FloatingTextarea } from "../../../FloatingInputs";
import { toast } from "react-toastify";

const DoctorBlocking = ({ selectedDoctorBlocking, onClose }) => {
  console.log(selectedDoctorBlocking);

  const [selectedDoctor, setSelectedDoctor] = useState(
    selectedDoctorBlocking?.addDoctorDTO?.doctorId || null
  );
  const [activePopup, setActivePopup] = useState(false);
  const [doctorList, setDoctorList] = useState(null);
  const [formData, setFormData] = useState({
    formDate: selectedDoctorBlocking?.fromDate || "",
    toDate: selectedDoctorBlocking?.toDate || "",
    doctor: selectedDoctorBlocking?.addDoctorDTO?.doctorName || "",
    message: selectedDoctorBlocking?.message || "",
    timeWise: selectedDoctorBlocking?.timeWise || false,
    formTime: selectedDoctorBlocking?.fromTime || "",
    toTime: selectedDoctorBlocking?.toTime || "",
  });

  const isEditMode = !!selectedDoctorBlocking; // Check if in edit mode

  const getPopupData = () => {
    if (activePopup) {
      return { columns: ["doctorName"], data: doctorList };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = (data) => {
    setSelectedDoctor(data); // Save the selected doctor object
    setFormData((prev) => ({
      ...prev,
      doctor: data.doctorName, // Assuming the doctor object contains a "doctorName" field
    }));
    setActivePopup(false); // Close the popup
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/doctors`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((items) => {
        setDoctorList(items);
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const today = new Date().toISOString().split("T")[0];

    // Validate required fields
    if (!formData.formDate || !formData.toDate || !selectedDoctor?.doctorId) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Validate that 'From Date' is not in the past
    if (formData.formDate < today) {
      toast.error("From Date cannot be in the past.");
      return;
    }

    // Validate that 'To Date' is not before 'From Date'
    if (formData.toDate < formData.formDate) {
      toast.error("To Date cannot be earlier than From Date.");
      return;
    }
    // Prepare the payload
    const payload = {
      fromDate: formData.formDate,
      toDate: formData.toDate,
      message: formData.message,
      timeWise: formData.timeWise,
      ...(formData.timeWise && {
        fromTime: formData.formTime,
        toTime: formData.toTime,
      }),
      addDoctorDTO: {
        doctorId: selectedDoctor?.doctorId || null, // Use selected doctor's ID
      },
    };

    // Validate required fields
    if (
      !payload.fromDate ||
      !payload.toDate ||
      !payload.addDoctorDTO.doctorId
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      let response;
      if (isEditMode) {
        // Update existing entry
        response = await axios.put(
          `${API_BASE_URL}/doctor-blocking/${selectedDoctorBlocking.doctorBlockingId}`,
          payload
        );
        toast.success("Doctor blocking details updated successfully!");
      } else {
        // Create new entry
        response = await axios.post(`${API_BASE_URL}/doctor-blocking`, payload);
        toast.success("Doctor blocking details submitted successfully!");
      }

      console.log("Form submitted successfully:", response.data);
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="doctor-blocking-container">
      <div className="doctor-blocking-field">
        <FloatingInput
          label={"From Date"}
          type="date"
          name="formDate"
          value={formData.formDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div className="doctor-blocking-field">
        <FloatingInput
          label={"To Date"}
          type="date"
          name="toDate"
          value={formData.toDate}
          onChange={handleChange}
          min={formData.formDate || new Date().toISOString().split("T")[0]}
        />
      </div>
      <div className="doctor-blocking-field">
        <FloatingInput
          type="search"
          label={"Doctor"}
          name="doctor"
          placeholder="Search Doctor"
          value={formData.doctor || ""}
          onIconClick={() => setActivePopup("doctor")}
        />
      </div>
      <div className="doctor-blocking-field">
        <FloatingTextarea
          label={"Message"}
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <div className="doctor-blocking-field">
        <label>Time Wise:</label>
        <input
          type="checkbox"
          name="timeWise"
          checked={formData.timeWise}
          onChange={handleChange}
        />
      </div>
      {formData.timeWise && (
        <>
          <div className="doctor-blocking-field">
            <FloatingInput
              label={"From Time"}
              type="time"
              name="formTime"
              value={formData.formTime}
              onChange={handleChange}
            />
          </div>
          <div className="doctor-blocking-field">
            <FloatingInput
              label={"To Time"}
              type="time"
              name="toTime"
              value={formData.toTime}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      <div className="doctor-blocking-submit">
        <button className="doctor-blocking-submit-btn" onClick={handleSubmit}>
          {isEditMode ? "Update" : "Submit"}
        </button>
      </div>
      {activePopup && (
        <IpMasterPopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(false)}
        />
      )}
    </div>
  );
};

export default DoctorBlocking;
