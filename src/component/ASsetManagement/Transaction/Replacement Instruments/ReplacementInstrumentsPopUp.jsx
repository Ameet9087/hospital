import React, { useState, useRef, useEffect } from 'react';
import './ReplacementinstrumentsPopUp.css';
import { FaSearch } from 'react-icons/fa';
import PopupTable from '../../../Admission/PopupTable';

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
        alert("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        alert("Failed to save data");
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
            <span className="ReplacementInstrumentsPopUp-label">Record No</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Replacement No	</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement?.replacementId} />
            <FaSearch onClick={() => setActivePopup("replacementid")} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Equipment Name</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement.equipmentDTO?.equipmentName} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Type</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" value={selectedReplacement.type} />

          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Model</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement.equipmentDTO?.modelNo} />
          </div>

          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Serial No	</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement.equipmentDTO?.serialNo} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Doctor's Name</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement?.docterDTO?.doctorName} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Procedure To Be Done</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement.procedureToBeDone} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Name Of Manufacturer</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement?.nameOfManufacturer} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Name Of Supplier</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" value={selectedReplacement?.equipmentDTO?.vendor?.vendorName} />
          </div>
        </div>
        <div className="ReplacementInstrumentsPopUp-form-section">
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Purchase Cost Of Equipment</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Department Name	</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" value={selectedReplacement.departmentDTO?.departmentName} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Previous AMC Details	</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Last Year AMC Charges	</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Present AMC Proposal Details	</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Proposal Charges</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" name='proposalCharges' value={formData.proposalCharges} onChange={handleInputChange} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Siginificant Terms if any	</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" name='significantTerms' value={formData.significantTerms} onChange={handleInputChange} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Quantity</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement.quantity} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Patient Load</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement?.patientLoad} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Justification For Purchase            </span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement.justification} />
          </div>
        </div>
        <div className="ReplacementInstrumentsPopUp-form-section">
          <div className="ReplacementInstrumentsPopUp-section-header">AMS / DMS / JMS</div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Remarks           </span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement?.remark} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">MS Remarks         </span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement?.msRemark} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">MD Remarks</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement.mdRemark} />
          </div>
          <div className="ReplacementInstrumentsPopUp-section-header">Purchase Departments</div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Proposal Made By</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" value={selectedReplacement.proposalMade} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Approve Remarks</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" name='approveRemarks' value={formData.approveRemarks} onChange={handleInputChange} />
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
            <span className="ReplacementInstrumentsPopUp-label">NextPriority	</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" name='nextPriority' value={formData.nextPriority} onChange={handleInputChange} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Next Approval By	</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" name='nextApprovalBy' value={formData.nextApprovalBy} onChange={handleInputChange} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">equpid</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="text" className="ReplacementInstrumentsPopUp-input-field" value={selectedReplacement?.equipmentDTO?.equipmentMasterId} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Approval Date</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="date" className="ReplacementInstrumentsPopUp-input-field" name='approvedDate' value={formData.approvedDate} onChange={handleInputChange} />
          </div>
          <div className="ReplacementInstrumentsPopUp-form-group">
            <span className="ReplacementInstrumentsPopUp-label">Approval Time</span>
            <span className="ReplacementInstrumentsPopUp-separator">:</span>
            <input type="time" className="ReplacementInstrumentsPopUp-input-field" name='approvedTime' value={formData.approvedTime} onChange={handleInputChange} />
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