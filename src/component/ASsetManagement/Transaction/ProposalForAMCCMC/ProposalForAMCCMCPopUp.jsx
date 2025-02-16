import React, { useState, useEffect } from "react";
import "./ProposalForAMCCMCPopUp.css";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput,FloatingSelect,FloatingTextarea } from "../../../../FloatingInputs";
import { toast } from "react-toastify";

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
      toast.success("Date Save Successfully")
    }else{
      toast.error("Data not Saved")
    }

    const result = await response.json();
  };

  return (
    <div className="ProposalForAMCCMC-form">
      <div className="ProposalForAMCCMC-header">PROPOSAL FOR AMC CMC</div>
      <div className="ProposalForAMCCMC-body">
        <div className="ProposalForAMCCMC-grid">
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Proposal To"}
            type="text"
            value={proposalTo}
            onChange={handleProposalToChange}/>
            

          </div>

          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Proposal Date"}
            type="date"
              value={proposalDate}
              onChange={handleProposalDateChange}/>
            
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Manual Code"}
            type="text"
              value={proposalManualCode}
              onChange={handleProposalManualCodeChange}
            />
           
          </div>
        </div>

        <div className="ProposalForAMCCMC-section-header">Equipment Info</div>
        <div className="ProposalForAMCCMC-equipment-grid">
          <div className="ProposalForAMCCMC-label-container">
          <FloatingSelect
  label={"Equipment Name *"}
  onChange={handleEquipmentChange}
  options={[
    { value: "", label: "Select Equipment" }, // Default option
    ...equipmentOptions.map((equipment) => ({
      value: equipment.equipmentName,
      label: equipment.equipmentName,
    })),
  ]}
/>

          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Type"}
            type="text" value={selectedEquipment.type || ''} readOnly/>
            
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Category"}
            type="text" value={selectedEquipment.assetCateMasterDTO?.underCategory || ''} readOnly/>
            
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"salvage"}
             type="text"
              value={selectedEquipment.assetCateMasterDTO?.salvage || ''}
              readOnly/>
           
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Equipment No"}
            type="text" value={selectedEquipment.equipmentNo || ''} readOnly/>
            
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Serial No"}
            type="text" value={selectedEquipment.serialNo || ''} readOnly/>
            
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Model No"}
            type="text" value={selectedEquipment.modelNo || ''} readOnly/>
            
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Company Brand"}
            type="text" value={selectedEquipment.companyBrand || ''} readOnly/>
           
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Responsibility Person"}
            type="text" value={selectedEquipment.employee?.firstName || ''} readOnly/>
            
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Responsible Department"}
            type="text" value={selectedEquipment.responsibleDepartment?.departmentName || ''} readOnly />
            
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Location"}
            type="text" value={selectedEquipment.assetLocationMaster?.subLocation || ''} readOnly/>
           
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Location Path"}/>
            <label className="ProposalForAMCCMC-label"></label>
            <input className="ProposalForAMCCMC-input" type="text" value={selectedEquipment.locationPath || ''} readOnly />
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Supplier Name *"}
            type="text" value={selectedEquipment.vendor?.vendorName || ''} readOnly />
           
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Date Of Purchase"}
            type="date" value={selectedEquipment.installationDate || ''} readOnly/>
           
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Cost Of Equipment"}
            type="text" value={selectedEquipment.cost || ''} readOnly/>
            
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Asset No"}
            type="text" value={selectedEquipment.assetNo || ''} readOnly/>
            
          </div>
        </div>


        <div className="ProposalForAMCCMC-section-header">Proposal Details</div>
        <div className="ProposalForAMCCMC-proposal-details-grid">
          <div className="ProposalForAMCCMC-label-container">
            <FloatingSelect
            label={"Contract Type"}
            value={contractType}
            onChange={handleContractTypeChange}
            options={[{value:"AMC",label:"AMC"},
              {value:"CMC",label:"CMC"}
            ]}/>
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Proposal From Date"}
            type="date"
              value={proposalFromDate}
              onChange={handleProposalFromDateChange}/>
           
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Proposal To Date"}
            type="date"
            value={proposalToDate}
            onChange={handleProposalToDateChange}/>
            
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={" Proposal Detail *"}
            type="text"
              value={proposalDetail}
              onChange={handleProposalDetailChange}/>
            
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Last Year AMC Charges"}
            type="text"
              value={lastYearAmcCharges}
              onChange={handleLastYearAmcChargesChange}/>
            
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Proposal Charges * "}
            type="text"
              value={proposalCharges}
              onChange={handleProposalChargesChange}/>
            
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingSelect
            label={"Significant Terms (If Any)"}
            value={significantTerms}
              onChange={handleSignificantTermsChange}
              options={[{value:"Yes",label:"Yes"},{value:"No",label:"No"}]}/>
           
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Terms"}
            type="text"
            value={terms}
            onChange={handleTermsChange}/>
           
          </div>
          <div className="ProposalForAMCCMC-label-container">
            <FloatingInput
            label={"Made By *"}
            type="text"
              value={madeBy}
              onChange={handleMadeByChange} />
           
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
                <FloatingSelect
  label={"Doctor Name"}
  value={selectedDoctor}
  onChange={handleDoctorChange}
  options={[
    { value: "", label: "Select Doctor" }, // Default option
    ...doctors.map((doc) => ({
      value: doc.doctorId,
      label: doc.doctorName,
    })),
  ]}
/>

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
