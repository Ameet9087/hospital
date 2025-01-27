import React, { useState, useEffect } from "react";
import "./ProposalForAMCCMCPopUp.css";
import { API_BASE_URL } from "../../../api/api";

const ProposalForAMCCMCPopUp = () => {
  const [activeTab, setActiveTab] = useState("approve-details");
  const [equipmentOptions, setEquipmentOptions] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [priority, setPriority] = useState({});
  const [approvalTime, setApprovalTime] = useState({});
  const [approvalDate, setApprovalDate] = useState({});
  const [selectedDoctor, setSelectedDoctor] = useState(""); // Single doctor
  const [proposalTo, setProposalTo] = useState("");
  const [proposalDate, setProposalDate] = useState("");
  const [proposalManualCode, setProposalManualCode] = useState("");
  const [contractType, setContractType] = useState("AMC");
  const [proposalFromDate, setProposalFromDate] = useState("");
  const [proposalToDate, setProposalToDate] = useState("");
  const [proposalDetail, setProposalDetail] = useState("");
  const [lastYearAmcCharges, setLastYearAmcCharges] = useState("");
  const [proposalCharges, setProposalCharges] = useState("");
  const [significantTerms, setSignificantTerms] = useState("");
  const [terms, setTerms] = useState("");
  const [madeBy, setMadeBy] = useState("");

  const handleProposalToChange = (e) => setProposalTo(e.target.value);
  const handleProposalDateChange = (e) => setProposalDate(e.target.value);
  const handleProposalManualCodeChange = (e) => setProposalManualCode(e.target.value);
  const handleContractTypeChange = (e) => setContractType(e.target.value);
  const handleProposalFromDateChange = (e) => setProposalFromDate(e.target.value);
  const handleProposalToDateChange = (e) => setProposalToDate(e.target.value);
  const handleProposalDetailChange = (e) => setProposalDetail(e.target.value);
  const handleLastYearAmcChargesChange = (e) => setLastYearAmcCharges(e.target.value);
  const handleProposalChargesChange = (e) => setProposalCharges(e.target.value);
  const handleSignificantTermsChange = (e) => setSignificantTerms(e.target.value);
  const handleTermsChange = (e) => setTerms(e.target.value);
  const handleMadeByChange = (e) => setMadeBy(e.target.value);

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value); // Update single doctor
  };

  const handlePriorityChange = (event, rowIndex) => {
    setPriority((prevPriority) => ({
      ...prevPriority,
      [rowIndex]: event.target.value,
    }));
  };

  const handleApprovalTimeChange = (event, rowIndex) => {
    setApprovalTime((prevApprovalTime) => ({
      ...prevApprovalTime,
      [rowIndex]: event.target.value,
    }));
  };

  const handleApprovalDateChange = (event, rowIndex) => {
    setApprovalDate((prevApprovalDate) => ({
      ...prevApprovalDate,
      [rowIndex]: event.target.value,
    }));
  };

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleEquipmentChange = (event) => {
    const selectedEquipmentName = event.target.value;
    const equipment = equipmentOptions.find(
      (item) => item.equipmentName === selectedEquipmentName
    );
    setSelectedEquipment(equipment || {});
  };

  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/equipment-masters`);
        const data = await response.json();
        setEquipmentOptions(data);
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      }
    };

    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/doctors`);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchEquipmentData();
    fetchDoctorData();
  }, []);

  const handleSave = async () => {
    const requestData = {
      proposalTo,
      proposalDate,
      type: contractType,
      proposalFromDate,
      proposalToDate,
      proposalDetail,
      lastYearAmcCharges,
      proposalCharges,
      significantTerms,
      terms,
      madeBy, // Now this contains the doctor's name
      equipmentMasterDTO: { equipmentMasterId: selectedEquipment.equipmentMasterId },
      approvalByDTO: { doctorId: selectedDoctor }, // Send single doctor

    };

    const response = await fetch(`${API_BASE_URL}/amc-cms-proposals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    if (response.ok) {
      alert("Date Save Successfully")
    }

    const result = await response.json();
  };

  return (
    <div className="ProposalForAMCCMC-form">
      <div className="ProposalForAMCCMC-header">PROPOSAL FOR AMC CMC</div>
      <div className="ProposalForAMCCMC-body">
        <div className="ProposalForAMCCMC-grid">
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Proposal To</label>
            <input
              className="ProposalForAMCCMC-input"
              type="text"
              value={proposalTo}
              onChange={handleProposalToChange}
            />

          </div>

          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Proposal Date</label>
            <input className="ProposalForAMCCMC-input" type="date"
              value={proposalDate}
              onChange={handleProposalDateChange} />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Manual Code</label>
            <input className="ProposalForAMCCMC-input" type="text"
              value={proposalManualCode}
              onChange={handleProposalManualCodeChange} />
          </div>
        </div>

        <div className="ProposalForAMCCMC-section-header">Equipment Info</div>
        <div className="ProposalForAMCCMC-equipment-grid">
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">
              Equipment Name<span className="required">*</span>
            </label>
            {/* Equipment Name Dropdown */}
            <select className="ProposalForAMCCMC-input" onChange={handleEquipmentChange}>
              <option value="">Select Equipment</option>
              {equipmentOptions.map((equipment) => (
                <option key={equipment.id} value={equipment.equipmentName}>
                  {equipment.equipmentName}
                </option>
              ))}

            </select>
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Type</label>
            <input className="ProposalForAMCCMC-input" type="text" value={selectedEquipment.type || ''} readOnly />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Category</label>
            <input className="ProposalForAMCCMC-input" type="text" value={selectedEquipment.assetCateMasterDTO?.underCategory || ''} readOnly />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">salvage</label>
            <input
              className="ProposalForAMCCMC-input"
              type="text"
              value={selectedEquipment.assetCateMasterDTO?.salvage || ''}
              readOnly
            />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Equipment No</label>
            <input className="ProposalForAMCCMC-input" type="text" value={selectedEquipment.equipmentNo || ''} readOnly />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Serial No</label>
            <input className="ProposalForAMCCMC-input" type="text" value={selectedEquipment.serialNo || ''} readOnly />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Model No</label>
            <input className="ProposalForAMCCMC-input" type="text" value={selectedEquipment.modelNo || ''} readOnly />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Company Brand</label>
            <input className="ProposalForAMCCMC-input" type="text" value={selectedEquipment.companyBrand || ''} readOnly />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Responsibility Person</label>
            <input className="ProposalForAMCCMC-input" type="text" value={selectedEquipment.employee?.firstName || ''} readOnly />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Responsible Department</label>
            <input className="ProposalForAMCCMC-input" type="text" value={selectedEquipment.responsibleDepartment?.departmentName || ''} readOnly />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Location</label>
            <input className="ProposalForAMCCMC-input" type="text" value={selectedEquipment.assetLocationMaster?.subLocation || ''} readOnly />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Location Path</label>
            <input className="ProposalForAMCCMC-input" type="text" value={selectedEquipment.locationPath || ''} readOnly />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">
              Supplier Name<span className="required">*</span>
            </label>
            <input className="ProposalForAMCCMC-input" type="text" value={selectedEquipment.vendor?.vendorName || ''} readOnly />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Date Of Purchase</label>
            <input className="ProposalForAMCCMC-input" type="date" value={selectedEquipment.installationDate || ''} readOnly />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Cost Of Equipment</label>
            <input className="ProposalForAMCCMC-input" type="text" value={selectedEquipment.cost || ''} readOnly />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Asset No</label>
            <input className="ProposalForAMCCMC-input" type="text" value={selectedEquipment.assetNo || ''} readOnly />
          </div>
        </div>


        <div className="ProposalForAMCCMC-section-header">Proposal Details</div>
        <div className="ProposalForAMCCMC-proposal-details-grid">
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Contract Type</label>
            <select
              className="ProposalForAMCCMC-input"
              value={contractType}
              onChange={handleContractTypeChange}
            >
              <option>AMC</option>
              <option>CMC</option>
            </select>
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Proposal From Date</label>
            <input
              className="ProposalForAMCCMC-input"
              type="date"
              value={proposalFromDate}
              onChange={handleProposalFromDateChange}
            />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Proposal To Date</label>
            <input
              className="ProposalForAMCCMC-input"
              type="date"
              value={proposalToDate}
              onChange={handleProposalToDateChange}
            />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">
              Proposal Detail<span className="required">*</span>
            </label>
            <input
              className="ProposalForAMCCMC-input"
              type="text"
              value={proposalDetail}
              onChange={handleProposalDetailChange}
            />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Last Year AMC Charges</label>
            <input
              className="ProposalForAMCCMC-input"
              type="text"
              value={lastYearAmcCharges}
              onChange={handleLastYearAmcChargesChange}
            />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">
              Proposal Charges<span className="required">*</span>
            </label>
            <input
              className="ProposalForAMCCMC-input"
              type="text"
              value={proposalCharges}
              onChange={handleProposalChargesChange}
            />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Significant Terms (If Any)</label>
            <select
              className="ProposalForAMCCMC-input"
              value={significantTerms}
              onChange={handleSignificantTermsChange}
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">Terms</label>
            <input
              className="ProposalForAMCCMC-input"
              type="text"
              value={terms}
              onChange={handleTermsChange}
            />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <label className="ProposalForAMCCMC-label">
              Made By<span className="required">*</span>
            </label>
            <input
              className="ProposalForAMCCMC-input"
              type="text"
              value={madeBy}
              onChange={handleMadeByChange} // Update value manually
            />
          </div>


        </div>



        {/* Tab Content */}
        {/* Table Content */}
        <div className="ProposalForAMCCMC-approve-table">
          <table>
            <thead>
              <tr>
                <th>SN</th>
                <th>Approval By</th>
              </tr>
            </thead>
            <tbody>
              {/* Display only one row for the first doctor */}
              <tr>
                <td>1</td>
                <td>
                  {/* Select Dropdown for "Approval By" */}
                  <select
                    className="ProposalForAMCCMC-input"
                    value={selectedDoctor}
                    onChange={handleDoctorChange}
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc.doctorId} value={doc.doctorId}>
                        {doc.doctorName}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>




        <div className="ProposalForAMCCMC-save-section">
          <button className="ProposalForAMCCMC-save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalForAMCCMCPopUp;
