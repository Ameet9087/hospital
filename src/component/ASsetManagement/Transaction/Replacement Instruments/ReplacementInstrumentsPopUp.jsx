import React, { useState, useRef, useEffect } from 'react';
import './ReplacementinstrumentsPopUp.css';
import { FaSearch } from 'react-icons/fa';
import PopupTable from '../../../Admission/PopupTable';
import { toast } from 'react-toastify';
import { FloatingInput } from '../../../../FloatingInputs';

const ReplacementInstrumentsPopUp = () => {
  const [activePopup, setActivePopup] = useState("");
  const [replacement, setReplacement] = useState([])
  const [selectedReplacement, setSelectedReplacement] = useState([])
  const replacementHeading = ["replacementId", "capitalItem", "type", "departmentInCharge"]

  const [formData, setFormData] = useState({
    proposalCharges: "",
    significantTerms: "",
    approveRemarks: "",
    repType: "",
    nextPriority: "",
    nextApprovalBy: "",
    approvedTime: "",
    approvedDate: "",
  });
  const handleChooseFileClick = () => {
    document.getElementById('fileInput').click();
  };


  const fetchreplacement = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/replacements`)
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      const data = await response.json();
      setReplacement(data)
    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  }
  useEffect(() => {
    fetchreplacement();
  }, []);
  const getPopupData = () => {
    if (activePopup === "replacementid") {
      return { columns: replacementHeading, data: replacement };
    }
    else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();

  const handleSelect = (data) => {
    if (activePopup === "replacementid") {
      setSelectedReplacement(data)
    }
    setActivePopup(null);
  };


  const handleSave = () => {
    const payload = {
      ...formData,
      equipmentReplacementDTO: {
        replacementId: selectedReplacement?.replacementId,
      },
    };

    fetch(`${API_BASE_URL}/replacement-instruments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save data");
        }
        return response.json();
      })
      .then((result) => {
        console.log("Save successful:", result);
        toast.success("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        toast.error("Failed to save data");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="ReplacementInstrumentsPopUp-container">
      <div className="ReplacementInstrumentsPopUp-header">
        Replacement Instruments
      </div>
      <div className="ReplacementInstrumentsPopUp-form-container">
        <div className="ReplacementInstrumentsPopUp-form-section">
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput
            label={"Record No"}
            type="text"
            />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput
            label={"Replacement No"}
            type="search" value={selectedReplacement?.replacementId}
            onIconClick={()=>setActivePopup("replacementid")}
            
            />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput
            label={"Equipment Name"}
            type="text"  value={selectedReplacement.equipmentDTO?.equipmentName}
            />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput
            label={"Type"}
            type="text" value={selectedReplacement.type}
            
            />
           

          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput
            label={"Model"}
            type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement.equipmentDTO?.modelNo}
            
            />
          </div>

          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput
            label={"Serial No"}
            type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement.equipmentDTO?.serialNo} 
            />

          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Doctor's Name"} type="text"  value={selectedReplacement?.docterDTO?.doctorName} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Procedure To Be Done"} type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement.procedureToBeDone} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Name Of Manufacturer"} type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement?.nameOfManufacturer} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Name Of Supplier"} type="text" value={selectedReplacement?.equipmentDTO?.vendor?.vendorName} />
          </div>
        </div>
        <div className="ReplacementInstrumentsPopUp-form-section">
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Purchase Cost Of Equipment"} type="text" className="ReplacementInstrumentsPopUp-input-field" />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Department Name"} type="text" value={selectedReplacement.departmentDTO?.departmentName} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Previous AMC Details"} type="text" className="ReplacementInstrumentsPopUp-input-field" />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput type="text" label={"Last Year AMC Charges"} className="ReplacementInstrumentsPopUp-input-field" />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Present AMC Proposal Details"} type="text" className="ReplacementInstrumentsPopUp-input-field" />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">

            <FloatingInput label={"Proposal Charges"}  type="text" className="ReplacementInstrumentsPopUp-input-field" name='proposalCharges' value={formData.proposalCharges} onChange={handleInputChange} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">

            <FloatingInput label={"Siginificant Terms if any"} type="text" className="ReplacementInstrumentsPopUp-input-field" name='significantTerms' value={formData.significantTerms} onChange={handleInputChange} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Quantity"} type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement.quantity} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Patient Load"} type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement?.patientLoad} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Justification For Purchase "} type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement.justification} />
          </div>
        </div>
        <div className="ReplacementInstrumentsPopUp-form-section">
          <div className="ReplacementInstrumentsPopUp-section-header">AMS / DMS / JMS</div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Remarks"} type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement?.remark} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"MS Remarks"} type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement?.msRemark} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"MD Remarks"} type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement.mdRemark} />
          </div>
          <div className="ReplacementInstrumentsPopUp-section-header">Purchase Departments</div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Proposal Made By"} type="text" value={selectedReplacement.proposalMade} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Approve Remarks"} type="text" className="ReplacementInstrumentsPopUp-input-field" name='approveRemarks' value={formData.approveRemarks} onChange={handleInputChange} />
          </div>
          <div className="ReplacementInstrumentsPopUp-status">
            <label className="ReplacementInstrumentsPopUp-label">Rep Type</label>
            <div className="ReplacementInstrumentsPopUp-radio-buttons">
              <input
                type="radio"
                id="active"
                name="status"
                value={formData.repType} />
              <label htmlFor="active">Reject</label>
              <input
                type="radio"
                id="inactive"
                name="status"
                value={formData.repType} />
              <label htmlFor="inactive">Forward</label>
              <input
                type="radio"
                id="inactive"
                name="status"
                value={formData.repType} />
              <label htmlFor="inactive">Hold</label>
              <input
                type="radio"
                id="inactive"
                name="status"
                value={formData.repType}
              />
              <label htmlFor="inactive">Appprove</label>
            </div>
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"NextPriority"} type="text" className="ReplacementInstrumentsPopUp-input-field" name='nextPriority' value={formData.nextPriority} onChange={handleInputChange} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Next Approval By"} type="text" className="ReplacementInstrumentsPopUp-input-field" name='nextApprovalBy' value={formData.nextApprovalBy} onChange={handleInputChange} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"equpid"} type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement?.equipmentDTO?.equipmentMasterId} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Approval Date"} type="date" className="ReplacementInstrumentsPopUp-input-field" name='approvedDate' value={formData.approvedDate} onChange={handleInputChange} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <FloatingInput label={"Approval Time"} type="time" className="ReplacementInstrumentsPopUp-input-field" name='approvedTime' value={formData.approvedTime} onChange={handleInputChange} />
          </div>
        </div>
      </div>
      <div className="ReplacementInstrumentsPopUp-btn-container">
        <button className="ReplacementInstrumentsPopUp-btn" onClick={handleSave}>Submit</button>
        <button className="ReplacementInstrumentsPopUp-btn">Close</button>
      </div>

      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(false)}
        />
      )}

    </div>
  );
};

export default ReplacementInstrumentsPopUp;