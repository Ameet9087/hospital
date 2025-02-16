import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import './CondemnationAndDisposalPopUp.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { FaSearch } from 'react-icons/fa';
import PopupTable from '../../../Admission/PopupTable';
import { API_BASE_URL } from '../../../api/api';
import { FloatingInput, FloatingSelect } from '../../../../FloatingInputs';
import {toast}  from "react-toastify";

const CondemnationAndDisposalPopUp = () => {
  const [activeTab, setActiveTab] = useState('proposal');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activePopup, setActivePopup] = useState("");
  const [proposalDetails, setProposalDetails] = useState([{ sn: 1, equipmentName: '', type: 'New', assetNo: '', manualCode: '', location: '', category: '' }]);
  const [approvedDetails, setApprovedDetails] = useState([{ sn: 1, approvalBy: '', priority: '' }]);
  const RequesteHeading = ["requestId", "type", "condemnationMaterial", "nameOfProposer"];
  const doctorheading = ["doctorId", "doctorName", "specialization",]
  const [remark, setremark] = useState('');
  const [requestdetail, setRequestdetail] = useState([])
  const [requestId, setRequestid] = useState('');
  const [capitalItem, setCapitalItem] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [assetNo, setAssetNo] = useState("");
  const [oldAssetNo, setOldAssetNo] = useState("");
  const [equipmentNo, setEquipmentNo] = useState("");
  const [location, setLocation] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [makeModel, setMakeModel] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [costOfPurchase, setCostOfPurchase] = useState("");
  const [lifeRecommended, setLifeRecommended] = useState("");
  const [expenditureRepairs, setExpenditureRepairs] = useState("");
  const [totalDowntime, setTotalDowntime] = useState("");
  const [repairCost, setRepairCost] = useState("");
  const [proposer, setProposer] = useState("");
  const [operator, setOperator] = useState("");
  const [condemnationReason, setCondemnationReason] = useState("");
  const [recommender, setRecommender] = useState("");
  const [condemnationChecked, setCondemnationChecked] = useState(false);
  const [disposalChecked, setDisposalChecked] = useState(false);
  const [doctor, setDoctor] = useState([])
  const [condemnationdate, setCondmnationdate] = useState('')
  const [selecteddoctor, setSelectedDoctor] = useState([])
  const [formFields, setFormFields] = useState({
    requestId: "",
    condemnationChecked: "",
    disposalChecked: "",
    requestNo: "",
    equipmentName: "",
    assetNo: "",
    oldAssetNo: "",
    equipmentNo: "",
    location: "",
    serialNo: "",
    makeAndModel: "",
    dateOfPurchase: "",
    costOfPurchase: "",
    lifeRecommended: "",
    repairExpenditure: "",
    downtimeMonths: "",
    presentRepairCost: "",
    proposerName: "",
    operatorName: "",
    reasonForCondemnation: "",
    remark: "",
    condemnationdate: "",
  });
  console.log("doctor", doctor)
  const handleAddRow = (type) => {
    if (type === 'proposal') {
      setProposalDetails([
        ...proposalDetails,
        { sn: proposalDetails.length + 1, equipmentName: '', type: 'New', assetNo: '', manualCode: '', location: '', category: '' }
      ]);
    } else {
      setApprovedDetails([
        ...approvedDetails,
        { sn: approvedDetails.length + 1, approvalBy: '', priority: '' }
      ]);
    }
  };

  const handleDeleteRow = (type, index) => {
    if (type === 'proposal') {
      setProposalDetails(proposalDetails.filter((_, i) => i !== index));
    } else {
      setApprovedDetails(approvedDetails.filter((_, i) => i !== index));
    }
  };

  const [fileName, setFileName] = useState('');

  const handleChooseFileClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const fetchRequestDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/condemnationRequest`);
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      const data = await response.json();
      setRequestdetail(data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  };
  const fetchDoctor = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctors`)
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      const data = await response.json();
      setDoctor(data)
    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  }


  useEffect(() => {
    fetchRequestDetails();
    fetchDoctor();
  }, []);
  const getPopupData = () => {
    if (activePopup === "request") {
      return { columns: RequesteHeading, data: requestdetail };
    } else if (activePopup === "approvedr") {
      return { columns: doctorheading, data: doctor };
    }
    else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();
  const handleSelect = (data) => {
    if (activePopup === "request") {
      setSelectedRequest(data);
      setFormFields({
        requestNo: data.requestId || "",
        capitalItem: data.capitalItem || "",
        equipmentName: data.equipmentMasterDTO?.equipmentName || "",
        assetNo: data.equipmentMasterDTO?.equipmentNo || "",
        oldAssetNo: data.equipmentMasterDTO?.oldAssetNo || "",
        equipmentNo: data.equipmentMasterDTO?.equipmentNo || "",
        location: data.equipmentMasterDTO?.assetLocationMaster?.subLocation || "",
        serialNo: data.equipmentMasterDTO?.serialNo || "",
        makeAndModel: data.makeAndModel || "",
        costOfPurchase: data.equipmentMasterDTO?.cost || "", // Assuming cost is the purchase cost
        lifeRecommended: data.lifeRecommended || "",
        repairExpenditure: data.expenditureIncurred || "", // Assuming repairExpenditure is the same as expenditureIncurred
        downtimeMonths: data.totalDowntime || "",
        presentRepairCost: "", // This field isn't present in the response
        proposerName: data.nameOfProposer || "",
        operatorName: data.nameOfOperator || "",
        reasonForCondemnation: data.reasonMasterDTO?.condemnationReasons || "",
        recommender: data.recommended || '',
      });
    } else if (activePopup === "approvedr") {
      setSelectedDoctor(data)
    }
    setActivePopup(null); // Close the popup
  };
  const handleSaveCondemnationData = () => {
    const payload = {
      condemnation: formFields.condemnationChecked,
      disposal: formFields.disposalChecked,
      remark: formFields.remark,
      recommended: formFields.recommender,
      condemDate: formFields.condemnationdate,
      condemnationDisposalRequestDTO: {
        requestId: selectedRequest.requestId,
      },
      approvalBy: {
        doctorId: selecteddoctor.doctorId,
      }

    };
    console.log(JSON.stringify(payload, null, 2));


    fetch(`${API_BASE_URL}/condemnation-disposals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Data saved successfully!');
          // Reset form or additional logic
        } else {
          toast.error('Failed to save data!');
        }
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        
      });
  };
 

  return (
    <div className="CondemnationAndDisposalPopUp-container">
      <div className="CondemnationAndDisposalPopUp-header">
        Condemnation and Disposal
      </div>
      <div className="CondemnationAndDisposalPopUp-form-container">
        <div className="CondemnationAndDisposalPopUp-form-section">
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Disposal No"}type="text"/>
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Request No *"}
            type="search" value={formFields.requestId} onChange={() => setRequestid()}
            onIconClick={() => setActivePopup("request")}/>
           
          
          </div>
          <div className="CondemnationAndDisposalPopUp-section-header">Equipment Information</div>
          <div className="CondemnationAndDisposalPopUp-status">
            <label className="CondemnationAndDisposalPopUp-label"> Capital Item:</label>
            <div className="CondemnationAndDisposalPopUp-radio-buttons">
              <input
                />
              <label htmlFor="yes">Yes</label>
              <input
                type="radio"
                id="no"
                name="status"
                value={formFields.capitalItem} onChange={() => setCapitalItem('no')} />
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Name Of Equipment "}type="text" value={formFields.equipmentName}
            onChange={(e) => setEquipmentName(e.target.value)}/>
            
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Asset No"}
            type="text" className="CondemnationAndDisposalPopUp-input-field" value={formFields.assetNo}
              onChange={(e) => setAssetNo(e.target.value)}/>
            
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Old Asset No"}
            type="text" className="CondemnationAndDisposalPopUp-input-field" value={formFields.oldAssetNo}
              onChange={(e) => setOldAssetNo(e.target.value)}/>
          
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Equipment No"}type="text" className="CondemnationAndDisposalPopUp-input-field" value={formFields.equipmentNo}
            onChange={(e) => setEquipmentNo(e.target.value)}/>
            
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Location"}type="text" className="CondemnationAndDisposalPopUp-input-field" value={formFields.location}
            onChange={(e) => setLocation(e.target.value)}/>
            
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Serial No"}
            type="text" className="CondemnationAndDisposalPopUp-input-field" value={formFields.serialNo}
              onChange={(e) => setSerialNo(e.target.value)}/>
          </div>
        </div>
        <div className="CondemnationAndDisposalPopUp-form-section">
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Make And Model"} type="text" className="CondemnationAndDisposalPopUp-input-field" value={formFields.makeAndModel}
            onChange={(e) => setMakeModel(e.target.value)}/>
            
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Cost Of Purchase"}type="text" className="CondemnationAndDisposalPopUp-input-field" value={formFields.costOfPurchase}
            onChange={(e) => setCostOfPurchase(e.target.value)}/>
          </div>
          <div className="CondemnationAndDisposalPopUp-section-header">Condemnation and Disposal Details</div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Life Recommended by Manufacturer"}
            type="text" className="CondemnationAndDisposalPopUp-input-field" value={formFields.lifeRecommended}
              onChange={(e) => setLifeRecommended(e.target.value)}/>
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Expenditure incurred on repairs"}
            type="text" className="CondemnationAndDisposalPopUp-input-field" value={formFields.repairExpenditure}
              onChange={(e) => setExpenditureRepairs(e.target.value)}/>
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Total downtime in months"}type="text" className="CondemnationAndDisposalPopUp-input-field" value={formFields.downtimeMonths}
            onChange={(e) => setTotalDowntime(e.target.value)}/>
           
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Name Of Proposer"}type="text" className="CondemnationAndDisposalPopUp-input-field" value={formFields.proposerName}
            onChange={(e) => setProposer(e.target.value)}/>
           
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Name Of Operator"}type="text" className="CondemnationAndDisposalPopUp-input-field" value={formFields.operatorName}
            onChange={(e) => setOperator(e.target.value)}/>
          
          </div>
        </div>
        <div className="CondemnationAndDisposalPopUp-form-section">
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Reason For Condemnation *"}type="text" value={formFields.reasonForCondemnation}
            onChange={() => setCondemnationReason(e.target.value)} />
           
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"condemnation date"}type="text" value={condemnationdate}
            onChange={() => setCondmnationdate(e.target.value)}/>
            
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Name For Recommending"}
            type="text" className="CondemnationAndDisposalPopUp-input-field" value={formFields.recommender}
              onChange={(e) => setRecommender(e.target.value)} />
           
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            
            <div className="CondemnationAndDisposalPopUp-input-container">
              <div className="CondemnationAndDisposalPopUp-checkbox-group">
                <label className="CondemnationAndDisposalPopUp-checkbox-label">
                  <input type="checkbox" className="CondemnationAndDisposalPopUp-checkbox" checked={formFields.condemnationChecked}
                    onChange={() => setCondemnationChecked(!condemnationChecked)} />
                  Condemnation
                </label>
                <label className="CondemnationAndDisposalPopUp-checkbox-label">
                  <input type="checkbox" className="CondemnationAndDisposalPopUp-checkbox" checked={formFields.disposalChecked}
                    onChange={() => setDisposalChecked(!disposalChecked)} />
                  Disposal
                </label>
              </div>
            </div>
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Remarks"}
            type="text" className="CondemnationAndDisposalPopUp-input-field" onChange={() => setremark(e.target.value)}/>
           
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Recommended By"} type="text" className="CondemnationAndDisposalPopUp-input-field"/>
            
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingInput
            label={"Approval By"}
            type="text" className="CondemnationAndDisposalPopUp-input-field" value={selecteddoctor?.doctorName}
            onIconClick={() => setActivePopup("approvedr")}/>
            
          </div>
          <div className="CondemnationAndDisposalPopUp-section-header">Attachment</div>
          <div className="CondemnationAndDisposalPopUp-file-upload">
            <input
              type="text"
              className="CondemnationAndDisposalPopUp-input-field"
              placeholder="File Name"
              value={fileName}
              readOnly
            />
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button
              className="CondemnationAndDisposalPopUp-btn-secondary"
              onClick={handleChooseFileClick}>
              Choose File
            </button>
            <button className="CondemnationAndDisposalPopUp-btn-secondary">Upload</button>
          </div>
          <div className="CondemnationAndDisposalPopUp-form-group">
            <FloatingSelect
            label={"Patient data erased or Transferred (if applicable)"}
            options={[
            {value:"Yes" ,label:"Yes"},{value:"No",label:"No"}]}
            />
            
          </div>
        </div>
      </div>
      <div className="CondemnationAndDisposalPopUp-tabs-section">
        <div className="CondemnationAndDisposalPopUp-tab-buttons">
          <button
            className={`CondemnationAndDisposalPopUp-tab-btn ${activeTab === 'proposal' ? 'active' : ''}`}
            onClick={() => setActiveTab('proposal')}>
            Approve Details
          </button>
        </div>
        {activeTab === 'proposal' ? (
          <div className="CondemnationAndDisposalPopUp-table-container">
            <table className="CondemnationAndDisposalPopUp-data-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions", // Move the "Actions" column to the front
                    "SN",
                    "Approval By",
                  ].map((header, index) => (
                    <th
                      key={index}
                      style={{ width: columnWidths[index] }}
                      className="resizable-th">
                      <div className="header-content">
                        <span>{header}</span>
                        <div
                          className="resizer"
                          onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                        ></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {proposalDetails.map((row, index) => (
                  <tr key={row.sn}>
                    <td>
                      <button
                        className="CondemnationAndDisposalPopUp-btn-add"
                        onClick={() => handleAddRow('proposal')}>
                        Add
                      </button>
                      <button
                        className="CondemnationAndDisposalPopUp-btn-delete"
                        onClick={() => handleDeleteRow('proposal', index)}>
                        Del
                      </button>
                    </td>
                    <td>{row.sn}</td>
                    <td>
                      <FloatingInput
                      label={"Doctor Name"}
                      type="text" value={selecteddoctor.doctorName}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="CondemnationAndDisposalPopUp-table-container">
            <div className="CondemnationAndDisposalPopUp-table-actions">
              <span>Existing Schedules</span>
            </div>
            <table className="CondemnationAndDisposalPopUp-data-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Schedule Date",
                    "EMaintenance Type",
                    "ERemarks",
                    "To Do",
                  ].map((header, index) => (
                    <th
                      key={index}
                      style={{ width: columnWidths[index] }}
                      className="resizable-th"
                    >
                      <div className="header-content">
                        <span>{header}</span>
                        <div
                          className="resizer"
                          onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                        ></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {approvedDetails.map((row, index) => (
                  <tr key={row.sn}>
                    <td>
                      <button
                        className="CondemnationAndDisposalPopUp-btn-add"
                        onClick={() => handleAddRow('approved')}
                      >
                        Add
                      </button>
                      <button
                        className="CondemnationAndDisposalPopUp-btn-delete"
                        onClick={() => handleDeleteRow('approved', index)}
                      >
                        Del
                      </button>
                    </td>
                    <td>{row.sn}</td>
                    <td><input type="text" /></td> {/* Schedule Date */}
                    <td><input type="text" /></td> {/* EMaintenance Type */}
                    <td><input type="text" /></td> {/* ERemarks */}
                    <td><input type="text" /></td> {/* To Do */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <button className='CondemnationAndDisposalRequest-save-button' onClick={handleSaveCondemnationData}>Save</button>

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
export default CondemnationAndDisposalPopUp;