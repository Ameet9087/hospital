import React, { useState, useRef, useEffect } from 'react';
import './MaintenanceCheckListPopUp.css';
import { FaSearch } from 'react-icons/fa';
import { API_BASE_URL } from '../../../api/api';
import PopupTable from '../../../Admission/PopupTable';
import { FloatingInput,FloatingSelect,FloatingTextarea } from '../../../../FloatingInputs';
import { toast } from 'react-toastify';

const MaintenanceChecklistPopUp = ({ bookingId }) => {
  const [id, setId] = useState(bookingId || "");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [equipmentList, setEquipmentList] = useState([]);
  const [activePopup, setActivePopup] = useState("")
  const equipmntheading = ["equipmentMasterId", "typeOfEquipment", "equipmentName"];
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [selectCheckList, setSelectedCheckList] = useState([]);
  const checklistHeading = ["typeMasterId", "typeName", "code"]
  const [formData, setFormData] = useState({
    remarks: "",
    status: "",
  });

  const [packageTableRows, setPackageTableRows] = useState([
    {
      sn: 1,
      serviceName: '',
      performDoctor: '',
      promptPercentage: '',
      total: '',
      discAmt: '',
      hours: '',
      extraP: '',
      fromTime: '',
      toTime: '',
      hourly: '',
      emergency: '',
      emerg: '',
      netAmt: '',
      doctor: ''
    }
  ]);

  const handleAddRow = () => {
    const newRow = {
      sn: packageTableRows.length + 1,
      serviceName: '',
      performDoctor: '',
      promptPercentage: '',
      total: '',
      discAmt: '',
      hours: '',
      extraP: '',
      fromTime: '',
      toTime: '',
      hourly: '',
      emergency: '',
      emerg: '',
      netAmt: '',
      doctor: ''
    };
    setPackageTableRows([...packageTableRows, newRow]);
  };

  const handleDeleteRow = (indexToRemove) => {
    const updatedRows = packageTableRows.filter((_, index) => index !== indexToRemove);
    const renumberedRows = updatedRows.map((row, index) => ({
      ...row,
      sn: index + 1
    }));
    setPackageTableRows(renumberedRows);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const fetchCheckListType = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/maintenance-type`);
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      const data = await response.json();
      setCheckList(data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  };
  useEffect(() => {
    fetchequipmentdetail();
    fetchCheckListType();

  }, []);

  const getPopupData = () => {
    if (activePopup === "euipment") {
      return { columns: equipmntheading, data: equipmentList };
    } else if (activePopup === "checklist") {
      return { columns: checklistHeading, data: checkList }
    }
    else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();
  const handleSelect = (data) => {
    if (activePopup === "euipment") {
      setSelectedEquipment(data);
    } else if (activePopup === "checklist") {
      setSelectedCheckList(data);
    }
    setActivePopup(null); // Close the popup
  };

  const handleSubmit = async () => {
    const payload = {

      maintenanceCheckListId: selectCheckList?.typeMasterId,
      checkListType: selectCheckList.typeName,
      remarks: formData.remarks,
      checkListStatus: formData.status,
      checkListRemarks: selectCheckList.description,
      equipmentMasterDTO: {
        equipmentMasterId: selectedEquipment.equipmentMasterId
      },
      maintenanceChecklistTypeMaster: {
        maintenanceChecklistId: selectCheckList?.typeMasterId
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/maintenance-checklist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Data saved successfully!');
      } else {
        toast.error('Failed to save data.');
      }
    } catch (error) {
      toast.error('Error saving data:', error);
      toast.error('An error occurred while saving the data.');
    }
  };
  return (
    <div className="MaintenanceChecklistPopUp-surgery-Events">
      <div className="MaintenanceChecklistPopUp-surgeryEvents-title-bar">
        <div className="MaintenanceChecklistPopUp-surgeryEvents-header">
          <span>Maintenance Check list</span>
        </div>
      </div>
      <div className="MaintenanceChecklistPopUp-surgeryEvents-content-wrapper">
        <div className="MaintenanceChecklistPopUp-surgeryEvents-main-section">
          <div className="MaintenanceChecklistPopUp-surgeryEvents-panel dis-templates">
            <div className="MaintenanceChecklistPopUp-surgeryEvents-panel-content">
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Equipment Name"}
                type="search" value={selectedEquipment?.equipmentName}
                onIconClick={() => setActivePopup("euipment")}/>
               
              </div>
            </div>
          </div>
          <div className="MaintenanceChecklistPopUp-surgeryEvents-panel operation-details">
            <div className="MaintenanceChecklistPopUp-surgeryEvents-panel-content">
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Asset No"}
                type="text" value={selectedEquipment.assetNo} readOnly/>
                
              </div>
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Eqp No"}
                type="text" value={selectedEquipment.equipmentNo} readOnly/>
               
              </div>
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Remarks"}
                type="text" name='remarks' value={formData.remarks} onChange={handleInputChange}/>
               
              </div>
            </div>
          </div>
          <div className="MaintenanceChecklistPopUp-surgeryEvents-panel operation-details">
            <div className="MaintenanceChecklistPopUp-surgeryEvents-panel-content">
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Check List Type"}
                type="search" value={selectCheckList.typeName}
                onIconClick={() => setActivePopup("checklist")}/>
               
              </div>
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"CheckList Remarks"}
                type="text" name='remarks' value={selectCheckList.description} onChange={handleInputChange}/>
               
              </div>

              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Status"}
                type="text" name='status' value={formData.status} onChange={handleInputChange}/>
               
              </div>
            </div>

          </div>
          <div className="MaintenanceChecklistPopUp-surgeryEvents-panel operation-details">
            <div className="MaintenanceChecklistPopUp-surgeryEvents-panel-header">Attachments</div>
            <div className="MaintenanceChecklistPopUp-surgeryEvents-panel-content">
              <div className="MaintenanceChecklistPopUp-file-upload">
                <FloatingInput
                label={"File name"}
                value={fileName}
                type="text"
                readOnly/>
               
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <button
                  className="MaintenanceChecklistPopUp-btn-secondary"
                  onClick={handleChooseFileClick}
                >
                  Choose File
                </button>
                <button className="MaintenanceChecklistPopUp-btn-secondary">Upload</button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="MaintenanceChecklistPopUp-surgeryEvents-services-section">
          <div className="MaintenanceChecklistPopUp-services-table">
            <div className="MaintenanceChecklistPopUp-surgeryEvents-title-bar">
              <div className="MaintenanceChecklistPopUp-surgeryEvents-header">
                <span>Checklist Grid</span>
              </div>
            </div>
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Type Of Checklist",
                    "Checklist Name",
                    "Checklist Status",
                    "Remarks",

                   
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
                          onMouseDown={startResizing(
                            tableRef,
                            setColumnWidths
                          )(index)}
                        ></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {packageTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="MaintenanceChecklistPopUp-table-actions">
                        <button
                          className="MaintenanceChecklistPopUp-surgeryEvents-add-btn"
                          onClick={() => handleAddRow()}
                        >
                          Add
                        </button>
                        <button
                          className="MaintenanceChecklistPopUp-surgeryEvents-del-btn"
                          onClick={() => handleDeleteRow(index)}
                          disabled={packageTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.typeOfCheckList}</td>
                    <td>{row.checklistName}</td>
                    <td>{row.checklistStatus}</td>
                    <td>{row.remarks}</td>

                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}

        <div className="MaintenanceChecklistPopUp-surgeryEvents-action-buttons">
          <button className="MaintenanceChecklistPopUp-btn-blue" onClick={handleSubmit}>Save</button>

        </div>
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

export default MaintenanceChecklistPopUp;
