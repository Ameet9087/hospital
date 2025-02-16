import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import './CondemnationanddisposalRequestPopUp.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { FaSearch } from 'react-icons/fa';
import PopupTable from '../../../Admission/PopupTable';
import { FloatingInput, FloatingSelect } from '../../../../FloatingInputs';
import {toast}  from "react-toastify";
import { API_BASE_URL } from '../../../api/api';
const CondemnationAndDisposalRequestPopUp = () => {
  const [activeTab, setActiveTab] = useState('proposal');
  const [selectedEquipment, setSelectedEquipment] = useState({
    assetNo: "",
    oldAssetNo: "",
    location: "",
    equipmentNo: "",
    serialNo: "",
    responsibleDepartment: "",
    costOfPurchase: "",
  });
  const [equipmentList, setEquipmentList] = useState([]);
  const [proposalDetails, setProposalDetails] = useState([{ sn: 1, equipmentName: '', type: 'New', assetNo: '', manualCode: '', location: '', category: '' }]);
  const [approvedDetails, setApprovedDetails] = useState([{ sn: 1, approvalBy: '', priority: '' }]);
  const [formData, setFormData] = useState({
    capitalItem: '',
    type: '',
    condemnationMaterial: '',
    makeAndModel: '',
    lifeRecommended: '',
    expenditureIncurred: '',
    totalDowntime: '',
    nameOfProposer: '',
    nameOfOperator: '',
    remarks: '',
    recommended: false,
    condemnation: false,
    equipmentMasterId: '',
    doctorId: '',
    condId: '',
    partId: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
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
  const [activePopup, setActivePopup] = useState("")
  const [euppart, seteuipPart] = useState("");
  const [selectedeuipart, setSelectedEupart] = useState("");
  const [selecteddoctor, setSelectedDoctor] = useState([])
  const [doctor, setDoctor] = useState([])
  const [reson, setReasons] = useState([]);
  const [selectedReason, setSelectedReason] = useState([]);
  const doctorheading = ["doctorId", "doctorName", "specialization",]
  const equipmntheading = ["equipmentMasterId", "typeOfEquipment", "equipmentName"];
  const equipmentpartheading = ["partId", "partName", "action"]
  const reasonHeading = ["condId", "condemnationReasons", "description", "status"]

  const fetchequipmentdetail = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/equipment-masters`);
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      const data = await response.json();
      setEquipmentList(data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  };
  const fetchequipmentPart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/parts`);
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      const data = await response.json();
      seteuipPart(data); // Update the state with the fetched data
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
  const fetchCondemnationReasons = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/condemnation-reasons`);
      if (!response.ok) {
        throw new Error("Failed to fetch condemnation reasons");
      }
      const data = await response.json();
      // Assuming you have a state to store the reasons
      setReasons(data);
    } catch (error) {
      console.error("Error fetching condemnation reasons:", error);
    }
  };

  useEffect(() => {
    fetchequipmentdetail();
    fetchequipmentPart();
    fetchDoctor();
    fetchCondemnationReasons();
  }, []);
  console.log("selectd doctor", selecteddoctor)
  const getPopupData = () => {
    if (activePopup === "euipment") {
      return { columns: equipmntheading, data: equipmentList };
    } else if (activePopup === "euipPart") {
      return { columns: equipmentpartheading, data: euppart };
    } else if (activePopup === "approvedr") {
      return { columns: doctorheading, data: doctor };
    } else if (activePopup === "reason") {
      return { columns: reasonHeading, data: reson };
    }
    else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();
  const handleSelect = (selectedData) => {
    if (activePopup === "euipment") {
      setSelectedEquipment({
        equipmentMasterId: selectedData.equipmentMasterId,
        assetNo: selectedData.assetNo || "",
        oldAssetNo: selectedData.oldAssetNo || "",
        location: selectedData?.assetLocationMaster?.subLocation || "",
        equipmentNo: selectedData.equipmentNo || "",
        name: selectedData.equipmentName || "",
        serialNo: selectedData.serialNo || "",
        responsibleDepartment: selectedData.responsibleDepartment || "",
        costOfPurchase: selectedData.cost || "",
        responsibleperson: selectedData?.employee.firstName || "",
      });
    } else if (activePopup === "euipPart") {
      setSelectedEupart({
        partId: selectedData.partId,
        partname: selectedData.partName || "", // Update the part name
      });
    } else if (activePopup === "approvedr") {
      setSelectedDoctor(selectedData)
    } else if (activePopup === "reason") {
      setSelectedReason(selectedData)
    }
    setActivePopup(null); // Close the popup
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const jsonToSend = {

      capitalItem: formData.capitalItem,
      type: formData.type,
      condemnationMaterial: formData.condemnationMaterial,
      makeAndModel: formData.makeAndModel,
      lifeRecommended: formData.lifeRecommended,
      expenditureIncurred: formData.expenditureIncurred,
      totalDowntime: formData.totalDowntime,
      nameOfProposer: formData.nameOfProposer,
      nameOfOperator: formData.nameOfProposer,
      remarks: formData.remarks,
      recommended: formData.recommended,
      condemnation: formData.condemnation,
      equipmentMasterDTO:
      {
        equipmentMasterId: selectedEquipment?.equipmentMasterId

      },
      addDoctorDTO:
        { doctorId: selecteddoctor.doctorId },
      reasonMasterDTO: { condId: selectedReason.condId },
      partsDTO: { partId: selectedeuipart.partId },
    };

    console.log(JSON.stringify(jsonToSend, null, 2));


    try {
      const response = await fetch(`${API_BASE_URL}/condemnationRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonToSend),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      const result = await response.json();
      toast.success('Form submitted successfully:', result);
    } catch (error) {
      toast.error('Error submitting form:', error);
    }
  };

  return (
    <div className="CondemnationAndDisposalRequestPopUp-container">
      <div className="CondemnationAndDisposalRequestPopUp-header">
        Condemnation and Disposal Request
      </div>
      <div className="CondemnationAndDisposalRequestPopUp-form-container">
        <div className="CondemnationAndDisposalRequestPopUp-form-section">
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Request No"}
            type="text"
            />
          </div>
          
          <div className="CondemnationAndDisposalRequestPopUp-section-header">Equipment Information</div>
          <div className="CondemnationAndDisposalRequestPopUp-status">
            
            <label className="CondemnationAndDisposalRequestPopUp-label">Capital Item :</label>
            <div className="CondemnationAndDisposalRequestPopUp-radio-buttons">
              <input
                type="radio"
                id="yes"
                name="status"
                value="yes"
                onChange={handleInputChange}
              />
              <label htmlFor="yes">Yes</label>
              <input
                type="radio"
                id="no"
                name="status"
                value="no"
                onChange={handleInputChange}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingSelect
            label={"Type"}
            value={formData.type} onChange={handleInputChange}
            options={[{
              value:"New",label:"New"
            },
          {value:"Existing",label:"Existing"}]}
            />
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingSelect
            label={"Condemnation Material"} 
            value={formData.condemnationMaterial}
            onChange={handleInputChange}
            options={[
              {value:"Equipment",label:"Equipment"},
              {value:"Equipment-Parts" , label:"Equipment Parts"}
            ]}
            />
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Name Of The Equipment"}
            type="search" value={selectedEquipment.name}
            onIconClick={() => setActivePopup("euipment")}
            />
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Asset No"}type="text"  value={selectedEquipment.assetNo}/>
            
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Old Asset No"}
            type="text"  value={selectedEquipment.oldAssetNo}/>
           
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Location"}
            type="text" value={selectedEquipment.location}/>
            
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Equipment No"}
            type="text"  value={selectedEquipment.equipmentNo}/>
           

          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Serial No"}
            type="text"value={selectedEquipment.serialNo}/>
          </div>
        </div>
        <div className="CondemnationAndDisposalRequestPopUp-form-section">
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Make And Model"}
            type="text" name='makeAndModel' value={formData.makeAndModel}
              onChange={handleInputChange}/>
          </div>

          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Responsible Department"}
            type="text"  value={selectedEquipment.responsibleperson}/>
            
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Cost Of Purchase"}
            type="text"  value={selectedEquipment.costOfPurchase}/>
           
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Equipment Part Name *"}
             type="search" value={selectedeuipart?.partname} readOnly
             onIconClick={() => setActivePopup("euipPart")}/>
           
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-section-header">Condemnation and Disposal Details</div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Life Recommended by Manufacturer"}
            type="text" name='lifeRecommended' value={formData.lifeRecommended}
              onChange={handleInputChange}/>
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Expenditure incurred on repairs"}
            type="text"  name='expenditureIncurred' value={formData.expenditureIncurred}
              onChange={handleInputChange}/>
           
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Total downtime in months"}
            type="text" name='totalDowntime' value={formData.totalDowntime}
              onChange={handleInputChange}/>
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Expected cost of present repair"}
            type="text"/>
            
          </div>
        </div>
        <div className="CondemnationAndDisposalRequestPopUp-form-section">
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Name Of Propose"}
            type="text"  name='nameOfProposer' value={formData.nameOfProposer}
              onChange={handleInputChange}/>
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Name Of Operator"}
            type="text" name='nameOfOperator' value={formData.nameOfOperator}
              onChange={handleInputChange}/>
            
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Reason For Condemnation *"}
            type="text" value={selectedReason?.condemnationReasons}
              onChange={handleInputChange}
              onIconClick={() => setActivePopup("reason")}/>
           
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
           
            <div className="CondemnationAndDisposalRequestPopUp-input-container">
              <div className="CondemnationAndDisposalRequestPopUp-checkbox-group">
                <label className="CondemnationAndDisposalRequestPopUp-checkbox-label">
                  <input type="checkbox" className="CondemnationAndDisposalRequestPopUp-checkbox" value={formData.condemnation}
                    onChange={handleInputChange} />
                  Condemnation
                </label>
              </div>
            </div>
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Remarks"}
            type="text" name='remarks' value={formData.remarks}
              onChange={handleInputChange} />
          </div>
          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Recommended By"}
            type="text" name='recommended' value={formData.recommended}
              onChange={handleInputChange} />
           
          </div>

          <div className="CondemnationAndDisposalRequestPopUp-form-group">
            <FloatingInput
            label={"Approval By"}
            type="text" value={selecteddoctor?.doctorName}
            onIconClick={() => setActivePopup("approvedr")}/>
           
          </div>

          <div className="CondemnationAndDisposalRequestPopUp-section-header">Attachment</div>
          <div className="CondemnationAndDisposalRequestPopUp-file-upload">
            <input
              type="text"
              className="CondemnationAndDisposalRequestPopUp-input-field"
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
              className="CondemnationAndDisposalRequestPopUp-btn-secondary"
              onClick={handleChooseFileClick}
            >
              Choose File
            </button>
            <button className="CondemnationAndDisposalRequestPopUp-btn-secondary">Upload</button>
          </div>
        </div>
      </div>
      <div className="CondemnationAndDisposalRequestPopUp-tabs-section">
        <div className="CondemnationAndDisposalRequestPopUp-tab-buttons">
          <button
            className={`CondemnationAndDisposalRequestPopUp-tab-btn ${activeTab === 'proposal' ? 'active' : ''}`}
            onClick={() => setActiveTab('proposal')}
          >
            Approve Details
          </button>

        </div>

        {activeTab === 'proposal' ? (
          <div className="CondemnationAndDisposalRequestPopUp-table-container">

            <table className="CondemnationAndDisposalRequestPopUp-data-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions", // Move the "Actions" column to the front
                    "SN",
                    "Approval By",
                    "Priority"

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
                {proposalDetails.map((row, index) => (
                  <tr key={row.sn}>
                    <td>
                      <button
                        className="CondemnationAndDisposalRequestPopUp-btn-add"
                        onClick={() => handleAddRow('proposal')}
                      >
                        Add
                      </button>
                      <button
                        className="CondemnationAndDisposalRequestPopUp-btn-delete"
                        onClick={() => handleDeleteRow('proposal', index)}
                      >
                        Del
                      </button>
                    </td>
                    <td>{row.sn}</td>
                    <td><FloatingInput
                    type="date"/>
                    </td>
                    <td>
                      <FloatingInput type="text"/></td>
                  </tr>
                ))}
              </tbody>
              <button onClick={handleSubmit} className="CondemnationAndDisposalRequestPopUp-save-button">
                Save
              </button>
            </table>
          </div>
        ) : (
          <div className="CondemnationAndDisposalRequestPopUp-table-container">
            <div className="CondemnationAndDisposalRequestPopUp-table-actions">
              <span>Existing Schedules</span>
            </div>
            <table className="CondemnationAndDisposalRequestPopUp-data-table" ref={tableRef}>
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
                        className="CondemnationAndDisposalRequestPopUp-btn-add"
                        onClick={() => handleAddRow('approved')} >
                        Add
                      </button>
                      <button
                        className="CondemnationAndDisposalRequestPopUp-btn-delete"
                        onClick={() => handleDeleteRow('approved', index)}>
                        Del
                      </button>
                    </td>
                    <td>{row.sn}</td>
                    <td><FloatingInput type="text"/></td> 
                    <td><FloatingInput type="text"/></td> 
                    <td><FloatingInput type="text"/></td> 
                    <td><FloatingInput type="text"/></td> 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
export default CondemnationAndDisposalRequestPopUp;