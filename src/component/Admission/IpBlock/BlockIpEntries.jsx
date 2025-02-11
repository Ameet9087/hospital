import React, { useState, useEffect } from "react";
import "./BlockIpEntries.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../api/api";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
  PopupTable,
} from "../../../FloatingInputs/index";

const BlockIPEntries = ({ patient }) => {
  const [activePopup, setActivePopup] = useState(null);
  const [ipNoData, setIpNoData] = useState([]);
  const [formData, setFormData] = useState({
    dischargeType: "",
    type: "",
    date: "",
    remark: "",
    dischargeIntimationDTO: {
      disId: "",
    },
    file: null, // To store the uploaded file
    fileName: "", // To store the name of the uploaded file
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        file: file,
        fileName: file.name,
      });
    }
  };

  const handleUpload = () => {
    if (!formData.file) {
      alert("Please select a file to upload.");
      return;
    }
    alert(`File "${formData.fileName}" uploaded successfully!`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let base64File = null;

    if (formData.file) {
      const reader = new FileReader();
      reader.onload = async () => {
        base64File = reader.result.split(",")[1];

        const payload = {
          dischargeType: formData.dischargeType || "Not Specified",
          type: formData.type || "Not Specified",
          date: formData.date || "N/A",
          remark: formData.remark || "No remarks provided",
          isBlocked: "Yes",
          doc: base64File, // Adding Base64 encoded file data
          dischargeIntimationDTO: {
            disId: patient?.disId || null,
          },
        };

        console.log("Payload:", payload);

        try {
          const response = await axios.post(
            `${API_BASE_URL}/block-ip-entries`,
            null, // No body directly in the post request
            {
              params: {
                blockIpEntriesDTO: JSON.stringify(payload), // Send payload as request parameter
              },
            }
          );
          console.log("Response:", response.data);
          alert("Data saved successfully!");
        } catch (error) {
          console.error("Error saving data:", error.response || error.message);
          alert("Failed to save data. Please try again.");
        }
      };

      reader.onerror = () => {
        alert("Error reading file. Please try again.");
      };

      reader.readAsDataURL(formData.file);
    } else {
      const payload = {
        dischargeType: formData.dischargeType || "Not Specified",
        type: formData.type || "Not Specified",
        date: formData.date || "N/A", // Added missing date field
        remark: formData.remark || "No remarks provided",
        isBlocked: "Yes",
        doc: null,
        dischargeIntimationDTO: {
          disId: patient?.disId || null,
        },
      };

      console.log("Payload:", payload);

      try {
        const response = await axios.post(
          `${API_BASE_URL}/block-ip-entries`,
          null, // No body directly in the post request
          {
            params: {
              blockIpEntriesDTO: JSON.stringify(payload), // Send payload as request parameter
            },
          }
        );
        console.log("Response:", response.data);
        alert("Data saved successfully!");
      } catch (error) {
        console.error("Error saving data:", error.response || error.message);
        alert("Failed to save data. Please try again.");
      }
    }
  };

  return (
    <div className="BlockIPEntries-container">
      <div className="BlockIPEntries-header">
        <span>Block IP Entries</span>
      </div>
      <div className="BlockIPEntries-content">
        <div className="BlockIPEntries-section">
          <div className="BlockIPEntries-section-header">Patient Details</div>

          <div className="BlockIPEntries-data">
            <FloatingInput
              label={"Ip No"}
              type="text"
              name={"ipAdmmissionId"}
              value={patient?.ipAdmissionDto?.patient?.patient?.uhid}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingInput
              label={"Patient Name"}
              type="text"
              name="firstName"
              value={`${patient?.ipAdmissionDto?.patient?.patient?.firstName} ${patient?.ipAdmissionDto?.patient?.patient?.lastName}`}
              onChange={handleInputChange}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingInput
              label={"Discharge Date"}
              type="date"
              name="disAdvisedDate"
              value={patient?.disAdvisedDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingInput
              label={"Discharge Time"}
              type="text"
              name="disAdvisedTime"
              value={patient?.disAdvisedTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingTextarea
              label={"Address"}
              name="address"
              value={patient?.ipAdmissionDto?.patient?.patient?.address}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingInput
              label={"DOB"}
              type="date"
              name="dateOfBirth"
              value={patient?.ipAdmissionDto?.patient?.patient?.dateOfBirth}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingSelect
              label="Gender"
              name={"gender"}
              value={patient?.ipAdmissionDto?.patient?.patient?.gender}
              options={[
                { value: "", label: "" },
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingInput
              label={"Admission Date"}
              type="date"
              name="admissionDate"
              value={patient?.ipAdmissionDto?.admissionDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingInput
              label={"Admission Time"}
              type="text"
              name="admissionDate"
              value={patient?.ipAdmissionDto?.admissionTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingInput
              label={"Phone No"}
              type="text"
              name="mobileNumber"
              value={patient?.ipAdmissionDto?.patient?.patient?.mobileNumber}
              restrictions={{ number: true, max: 10 }}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="BlockIPEntries-section">
          <div className="BlockIPEntries-data">
            <FloatingSelect
              label="Discharge Type"
              name="dischargeType"
              value={formData.dischargeType}
              onChange={handleInputChange}
              options={[
                { value: "Recovered", label: "Recovered" },
                { value: "Transferred", label: "Transferred" },
                { value: "Deceased", label: "Deceased" },
                {
                  value: "DAMA",
                  label: "Discharged Against Medical Advice (DAMA)",
                },
              ]}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingInput
              label={"Type"}
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingInput
              label={"Date"}
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingInput
              label={"Consultant Doctor"}
              type="text"
              name="doctorName"
              restrictions={{ char: true }}
              value={formData.doctorName}
              onChange={handleInputChange}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingInput
              label={"Consultant Doctor 2"}
              type="text"
              name="consultantDoctor2"
              restrictions={{ char: true }}
              value={formData.consultantDoctor2}
              onChange={handleInputChange}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingInput
              label={"MLC No"}
              type="text"
              name="mlcNo"
              value={formData.mlcNo}
              onChange={handleInputChange}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingInput
              label={"Bed No"}
              type="text"
              name="bedNo"
              value={formData.bedNo}
              onChange={handleInputChange}
            />
          </div>
          <div className="BlockIPEntries-data">
            <FloatingTextarea
              label={"Remarks"}
              name="remark"
              value={formData.remark}
              onChange={handleInputChange}
            />
          </div>
          <div className="BlockIPEntries-section-header">Add Attachments</div>
          <div className="BlockIPEntries-upload">
            <FloatingInput
              label={"File Name"}
              type="text"
              value={formData.fileName}
              readOnly
            />
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput">Choose File</label>
            <button onClick={handleUpload}>Upload</button>
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

      <div className="BlockIPEntries-navbar">
        <aside className="BlockIPEntries-navbar-btns">
          <button onClick={handleSubmit}>Save</button>
        </aside>
      </div>
    </div>
  );
};

export default BlockIPEntries;
