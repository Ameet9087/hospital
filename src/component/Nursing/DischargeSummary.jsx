import React, { useState, useEffect } from "react";
import "./DischargeSummary.css";
import { FaSearch } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FloatingInput from "../FloatingInputs/FloatingInput";
import FloatingTextarea from "../FloatingInputs/FloatingTextarea";
import FloatingSelect from "../FloatingInputs/FloatingSelect";

import AppoitmentPopupTable from "../FloatingInputs/PopupTable";
import { act } from "react";
import { Import } from "lucide-react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../api/api";
const DischargeSummary = () => {
  const [templateContent, setTemplateContent] = useState("");
  const [activePopup, setActivePopup] = useState("");
  const [ipno, setIpno] = useState([]);
  const [selectedipno, setSelectedIpno] = useState([]);
  const [template, setTemplate] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState([]);
  const templateHeading = ["templateId", "templateName"];
  const ipHeading = ["ipAdmmissionId"];

  const [formData, setFormData] = useState({
    dischargeDate: "",
    dischargeTime: "",
    dischargeStatus: "",
    dischargeRemarks: "",
    reasonForDischarge: "",
    dischargeType: "",
    dischargedBy: "",
  });

  // Handle change for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchIpPatient = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/ip-admissions`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      const data = await response.json();
      setIpno(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  };
  const fetchTemplates = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/ipTemplates`);
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      const data = await response.json();
      setTemplate(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  };
  useEffect(() => {
    fetchIpPatient();
    fetchTemplates();
  }, []);
  const getPopupData = () => {
    if (activePopup === "ipNo") {
      console.log("Popup Data:", ipno);
      return { columns: ipHeading, data: ipno };
    } else if (activePopup === "template") {
      return { columns: templateHeading, data: template };
    }
    return { columns: [], data: [] };
  };

  const { columns, data } = getPopupData();
  const handleSelect = async (data) => {
    if (activePopup === "ipNo") {
      setSelectedIpno(data);
    } else if (activePopup === "template") {
      setSelectedTemplate(data);
    }
    setActivePopup(null);
  };

  // Handle discharge summary save
  const handleSave = async () => {
    console.log("xyz----");

    // if (!selectedipno || !selectedTemplate || !templateContent) {
    //   toast.error("Please ensure all required fields are filled.");
    //   return;
    // }

    const dischargeData = {
      dischargeDate: formData.dischargeDate,
      dischargeTime: formData.dischargeTime,
      dischargeStatus: "Yes",
      dischargeRemarks: formData.dischargeRemarks,
      reasonForDischarge: formData.reasonForDischarge,
      dischargeType: formData.dischargeType,

      ipAdmission: {
        ipAdmmissionId: selectedipno.ipAdmmissionId,
      },

      ipTemplateDTO: {
        templateId: selectedTemplate.templateId,
      },

      dischargedBy: {
        employeeId: 1,
      },

    };
    console.log(dischargeData);


    try {
      const response = await fetch(
        `${API_BASE_URL}/discharge-ip-patients/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dischargeData),
        }
      );

      if (response.ok) {
        toast.success("Discharge summary saved successfully!");
      } else {
        toast.error("Failed to save discharge summary.");
      }
    } catch (error) {
      toast.error("Error saving discharge summary.");
      console.error("Error:", error);
    }
  };


  return (
    <div className="dischargeSummary-container">
      <div className="dischargeSummary-header">Discharge Summary IP</div>

      <div className="dischargeSummary-content">
        <div className="dischargeSummary-section">
          <h3>PATIENT DETAILS</h3>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"IP No"}
              type="text"
              value={selectedipno?.ipAdmmissionId || ""}
            // onIconClick={()=>setActivePopup("ipNo")}
            />
            <FaSearch
              onClick={() => setActivePopup("ipNo")}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"MR No"}
              type="text"
              value={selectedipno?.patient?.patient?.uhid}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"Patient Name"}
              type="text"
              value={`${selectedipno?.patient?.patient?.firstName || ""} ${selectedipno?.patient?.patient?.middleName || ""
                } ${selectedipno?.patient?.patient?.lastName || ""}`}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"Age"}
              type="text"
              value={selectedipno?.patient?.patient?.age}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"Sex"}
              type="text"
              value={selectedipno?.patient?.patient?.gender}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"Address"}
              type="text"
              value={selectedipno?.patient?.patient?.address}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"Date Of Admission"}
              type="date"
              value={selectedipno?.admissionDate}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"Time Of Admission"}
              type="text"
              value={selectedipno?.admissionTime}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"Consultant Doctor"}
              type="text"
              value={
                selectedipno?.admissionUnderDoctorDetail?.consultantDoctor
                  ?.doctorName
              }
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"Pay Type"}
              type="text"
              value={selectedipno?.roomDetails?.payTypeDTO?.payTypeName}
            />
          </div>
        </div>

        <div className="dischargeSummary-section">
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"Bed No"}
              type="text"
              value={selectedipno?.roomDetails?.bedDTO?.bedNo}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"Room No"}
              type="text"
              value={selectedipno?.roomDetails?.roomDTO?.roomNumber}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"Date Of Discharge"}
              type="date"
              name="dischargeDate"
              value={formData.dischargeDate}
              onChange={handleChange}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"Time Of Discharge"}
              type="time"
              name="dischargeTime"
              value={formData.dischargeTime}
              onChange={handleChange}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"Source Name"}
              type="text"
              value={selectedipno?.patient?.patient?.sourceOfRegistration}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"Patient Type"}
              type="text"
              value={selectedipno?.patient?.isIPD}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingSelect
              label={"Discharge Type"}
              name="dischargeType"
              value={formData.dischargeType}
              onChange={handleChange}
              options={[
                { value: "shifted", label: "Shifted To" },
                { value: "discharged", label: "Discharged" },
                { value: "referred", label: "Referred" },
              ]}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingInput
              label={"Template Name "}
              type="search"
              value={selectedTemplate?.templateName}
            />
            <FaSearch
              onClick={() => setActivePopup("template")}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="dischargeSummary-field">
            <FloatingTextarea
              label={"Discharge Remarks"}
              type="text"
              name="dischargeRemarks"
              value={formData.dischargeRemarks}
              onChange={handleChange}
            />
          </div>
          <div className="dischargeSummary-otnotes">
            <FloatingTextarea
              label={"Reason For Discharge"}
              type="text"
              name="reasonForDischarge"
              value={formData.reasonForDischarge}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* OT Notes Section */}

      <div className="dischargeSummary-template">
        <label>Template Design</label>
        <ReactQuill
          value={templateContent}
          onChange={setTemplateContent}
          theme="snow"
          className="quill-editor"
        />
      </div>
      <div>
        <button className="dischargeSummary-save" onClick={handleSave}>
          Save
        </button>
      </div>
      {activePopup && (
        <AppoitmentPopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(false)}
        />
      )}
    </div>
  );
};

export default DischargeSummary;

