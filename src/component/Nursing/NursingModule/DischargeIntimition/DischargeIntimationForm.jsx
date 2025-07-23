import React, { useState, useEffect } from "react";
// import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import "./DischargeIntimationForm.css";
import PopupTable from "../Services/PopupTable";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";
import { toast } from "react-toastify";


const DischargeIntimationForm = ({ ipAdmission }) => {
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({
    dischargeAdviceDate: "",
    dischargeAdviceTime: "",
    remark: "",
    pharmacyReturns: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      ipAdmissionDto: {
        ipAdmmissionId: ipAdmission?.ipAdmmissionId,
      },
      disAdvisedDate: formData.dischargeAdviceDate,
      disAdvisedTime: formData.dischargeAdviceTime,
      remarks: formData.remark,
      pharmacyReturns: formData.pharmacyReturns,
      flag: "Pending",
    };

    try {
      console.log(requestData);

      const response = await axios.post(
        `${API_BASE_URL}/discharge-intimations`,
        requestData
      );
      toast.success("Form submitted successfully!");
      setFormData({
        dischargeAdviceDate: "",
        dischargeAdviceTime: "",
        remark: "",
        pharmacyReturns: "",
      });
    } catch (error) {
      console.error("Error submitting form data:", error);
      toast.error("Failed to submit form. Please check your data and try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  return (
    <div className="DischargeIntimationForm-container">
      <div className="DischargeIntimationForm-section">
        <div className="DischargeIntimationForm-header">
          Discharge Intimation Form
        </div>
        <div className="DischargeIntimationForm-section">
          <div className="DischargeIntimationForm-grid">
            {/* IPNo Field with Popup */}
            <div className="DischargeIntimationForm-search-field">
              <FloatingInput
                label="IPNo"
                type="text"
                value={ipAdmission?.patient?.inPatientId}
              />
            </div>
            {/* Auto-filled Fields */}
            <FloatingInput
              label="Patient Name"
              type="text"
              name="patientName"
              value={
                ipAdmission?.patient?.patient?.firstName +
                  " " +
                  ipAdmission?.patient?.patient?.lastName || ""
              }
              readOnly
            />
            <FloatingInput
              label="Age"
              type="text"
              name="age"
              value={ipAdmission?.patient?.patient?.age}
              readOnly
            />
            <FloatingInput
              label="Consultant Doctor"
              type="text"
              name="consultantDoctor"
              value={
                ipAdmission?.admissionUnderDoctorDetail?.consultantDoctor
                  ?.doctorName
              }
              readOnly
            />
            <FloatingInput
              label="Room No"
              type="text"
              name="roomNo"
              value={ipAdmission?.roomDetails?.roomDTO?.roomNumber}
              readOnly
            />

            <FloatingInput
              label="Floor No"
              type="text"
              name="floorNo"
              value={ipAdmission?.roomDetails?.floorDTO?.floorNumber}
              readOnly
            />

            <FloatingInput
              label="Bed No"
              type="text"
              name="bedNo"
              value={ipAdmission?.roomDetails?.bedDTO?.bedNo}
              readOnly
            />

            <FloatingInput
              label="Discharge advice date"
              type="date"
              name="dischargeAdviceDate"
              value={formData.dischargeAdviceDate}
              onChange={handleChange}
            />

            <FloatingInput
              label="Discharge advice time"
              type="time"
              name="dischargeAdviceTime"
              value={formData.dischargeAdviceTime}
              onChange={handleChange}
            />

            <FloatingInput
              label="Remarks"
              type="text"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
            />

            <FloatingInput
              label="Pharmacy return"
              type="text"
              name="pharmacyReturns"
              value={formData.pharmacyReturns}
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
      <div className="DischargeIntimationForm-buttons">
        <button className="btn-blue" onClick={handleSubmit}>
          Save
        </button>
       
      </div>
    </div>
  );
};

export default DischargeIntimationForm;
