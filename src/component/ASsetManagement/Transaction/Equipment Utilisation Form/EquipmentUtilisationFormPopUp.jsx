import React, { useState, useRef, useEffect } from 'react';
import './EquipmentutilisationformPopUp.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import PopupTable from '../../../Admission/PopupTable';
import { SearchIcon } from 'lucide-react';
import { API_BASE_URL } from '../../../api/api';
import { FloatingInput,FloatingSelect,FloatingTextarea } from "../../../../FloatingInputs";
import { toast } from "react-toastify";

const EquipmentUtilisationFormPopUp = ({ bookingId }) => {
  const [id, setId] = useState(bookingId || "");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [activePopup, setActivePopup] = useState("");
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [ipAdmissions, setIpAdmissions] = useState([]);
  const [selectedIPNo, setSelectedIPNo] = useState([]);
  const [Ipservices, setIPServices] = useState([]);
  const [selectedIpServices, setSelectedIpServices] = useState([]);

  const [formData, setFormData] = useState({
    utilisationDate: "",
    remarks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchIpAdmissions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/ip-admissions`);
        if (!response.ok) {
          throw new Error("Failed to fetch IP Admissions");
        }
        const data = await response.json();
        setIpAdmissions(data);
      } catch (error) {
        console.error("Error fetching IP Admissions:", error);
      }
    };
    fetchIpAdmissions();
  }, []);

  useEffect(() => {
    const fetchIpServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/service-details`);
        if (!response.ok) {
          throw new Error("Failed to fetch IP Service Name");
        }
        const data = await response.json();
        setIPServices(data);
      } catch (error) {
        console.error("Error fetching IP Services:", error);
      }
    };
    fetchIpServices();
  }, []);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/equipment-masters`);
        if (!response.ok) {
          throw new Error("Failed to fetch equipments");
        }
        const data = await response.json();
        setEquipments(data);
      } catch (error) {
        console.error("Error fetching equipments:", error);
      }
    };
    fetchEquipments();
  }, []);

  const [packageTableRows, setPackageTableRows] = useState([
    {
      serialno: 1,
      pattype: '',
      ipAdmmissionId: '',
      patientName: '',
      serviceName: '',
      code: '',
      sn: ''
    }
  ]);

  const getPopupData = () => {
    if (activePopup === "equipment") {
      return {
        columns: ["equipmentMasterId", "equipmentName"],
        data: equipments,
      };
    } else if (activePopup === "ipAdmission") {
      const processedData = ipAdmissions.map((admission) => ({
        ipAdmissionId: admission.ipAdmmissionId,
        patientName: `${admission.patient?.firstName || ""} ${admission.patient?.lastName || ""}`.trim(),
      }));
      return {
        columns: ["ipAdmissionId", "patientName"],
        data: processedData,
      };
    } else if (activePopup === "ipService") {
      return {
        columns: ["sn", "serviceName", "serviceCode"],
        data: Ipservices,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const handleSelect = (data, index) => {
    if (activePopup === "equipment") {
      setSelectedEquipment(data);
    } else if (activePopup === "ipAdmission") {
      const newSelectedIPNo = [...selectedIPNo];
      newSelectedIPNo[index] = data;
      setSelectedIPNo(newSelectedIPNo);

      const updatedRows = [...packageTableRows];
      updatedRows[index] = {
        ...updatedRows[index],
        ipAdmmissionId: data.ipAdmissionId,
        patientName: data.patientName
      };
      setPackageTableRows(updatedRows);
    } else if (activePopup === "ipService") {
      const newSelectedIpServices = [...selectedIpServices];
      newSelectedIpServices[index] = data;
      setSelectedIpServices(newSelectedIpServices);

      const updatedRows = [...packageTableRows];
      updatedRows[index] = {
        ...updatedRows[index],
        sn: data.sn,
        serviceName: data.serviceName,
        code: data.serviceCode
      };
      setPackageTableRows(updatedRows);
    }
    setActivePopup("");
  };

  const handleAddRow = () => {
    const newRow = {
      serialno: packageTableRows.length + 1,
      pattype: '',
      ipAdmmissionId: '',
      patientName: '',
      serviceName: '',
      code: '',
      sn: ''
    };
    setPackageTableRows([...packageTableRows, newRow]);
    setSelectedIPNo([...selectedIPNo, null]);
    setSelectedIpServices([...selectedIpServices, null]);
  };

  const handleDeleteRow = (indexToRemove) => {
    if (packageTableRows.length > 1) {
      const updatedRows = packageTableRows.filter((_, index) => index !== indexToRemove);
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        serialno: index + 1
      }));
      setPackageTableRows(renumberedRows);

      const newSelectedIPNo = selectedIPNo.filter((_, index) => index !== indexToRemove);
      const newSelectedIpServices = selectedIpServices.filter((_, index) => index !== indexToRemove);
      setSelectedIPNo(newSelectedIPNo);
      setSelectedIpServices(newSelectedIpServices);
    }
  };

  const handleSave = async () => {
    try {
      if (!selectedEquipment?.equipmentMasterId) {
        toast.error("Please select an equipment");
        return;
      }

      if (!formData.utilisationDate) {
        toast.error("Please select utilisation date");
        return;
      }

      // Filter out rows with missing required data
      const validRows = packageTableRows.filter(row => row.ipAdmmissionId && row.sn);

      if (validRows.length === 0) {
        toast.error("Please add at least one valid row with IP admission and service details");
        return;
      }

      const payload = {
        utilisationDate: formData.utilisationDate,
        remarks: formData.remarks,
        equipmentMasterDTO: {
          equipmentMasterId: selectedEquipment.equipmentMasterId
        },
        ipAdmissionsDTO: validRows.map(row => ({
          ipAdmmissionId: row.ipAdmmissionId
        })),
        serviceDetailsDTO: validRows.map(row => ({
          sn: row.sn
        }))
      };


      const response = await fetch(`${API_BASE_URL}/equipment-utilisation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save equipment utilisation");
      }

      toast.success("Equipment utilisation saved successfully!");

      // Reset form
      setFormData({
        utilisationDate: "",
        remarks: "",
      });
      setSelectedEquipment("");
      setSelectedIPNo([]);
      setSelectedIpServices([]);
      setPackageTableRows([{
        serialno: 1,
        pattype: '',
        ipAdmmissionId: '',
        patientName: '',
        serviceName: '',
        code: '',
        sn: ''
      }]);
    } catch (error) {
      toast.error("Error saving equipment utilisation:", error);
      toast.error("Failed to save equipment utilisation. Please try again.");
    }
  };

  return (
    <div className="MaintenanceChecklistPopUp-surgery-Events">
      <div className="MaintenanceChecklistPopUp-surgeryEvents-title-bar">
        <div className="MaintenanceChecklistPopUp-surgeryEvents-header">
          <span>Equipment Utilisation Form</span>
        </div>
      </div>
      <div className="MaintenanceChecklistPopUp-surgeryEvents-content-wrapper">
        <div className="MaintenanceChecklistPopUp-surgeryEvents-main-section">
          <div className="MaintenanceChecklistPopUp-surgeryEvents-panel dis-templates">
            <div className="MaintenanceChecklistPopUp-surgeryEvents-panel-content">
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Equipment Selection *"}
                type="search" value={selectedEquipment?.equipmentName || ''} readOnly
                onIconClick={() => setActivePopup("equipment")}/>
                
              </div>
            </div>
          </div>
          <div className="MaintenanceChecklistPopUp-surgeryEvents-panel operation-details">
            <div className="MaintenanceChecklistPopUp-surgeryEvents-panel-content">
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Asset No"}
                type="text" value={selectedEquipment?.assetNo || ''} readOnly />
                
              </div>
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Equipment No"}
                type="text" value={selectedEquipment?.equipmentNo || ''} readOnly/>
               
              </div>
            </div>
          </div>
          <div className="MaintenanceChecklistPopUp-surgeryEvents-panel operation-details">
            <div className="MaintenanceChecklistPopUp-surgeryEvents-panel-content">
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Serial No"}
                type="text" value={selectedEquipment?.serialNo || ''} readOnly/>
               
              </div>
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Utilisation Date *"}
                type="date"
                name="utilisationDate"
                value={formData.utilisationDate}
                onChange={handleInputChange}/>
                
              </div>
            </div>
          </div>
          <div className="MaintenanceChecklistPopUp-surgeryEvents-panel operation-details">
            <div className="MaintenanceChecklistPopUp-surgeryEvents-panel-content">
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Model No"}
                type="text" value={selectedEquipment?.modelNo || ''} readOnly/>
               
              </div>
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Remarks"}
                type="text"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}/>
                
              </div>
            </div>
          </div>
        </div>

        <div className="MaintenanceChecklistPopUp-surgeryEvents-services-section">
          <div className="MaintenanceChecklistPopUp-services-table">
            <div className="MaintenanceChecklistPopUp-surgeryEvents-title-bar">
              <div className="MaintenanceChecklistPopUp-surgeryEvents-header">
                <span>Details</span>
              </div>
            </div>
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Pat type",
                    "MRNO / IPNO",
                    "Patient Name",
                    "Service Name",
                    "Code",
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

              {activePopup && (
                <PopupTable
                  columns={getPopupData().columns}
                  data={getPopupData().data}
                  onSelect={(data) => handleSelect(data, packageTableRows.length - 1)}
                  onClose={() => setActivePopup(false)}
                />
              )}

              <tbody>
                {packageTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="MaintenanceChecklistPopUp-table-actions">
                        <button
                          className="MaintenanceChecklistPopUp-surgeryEvents-add-btn"
                          onClick={handleAddRow}
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
                    <td>{row.serialno}</td>
                    <td>
                      <FloatingSelect
                      label={"Select MRno/IPno"}
                      value={row.pattype}
                        onChange={(e) => {
                          const updatedRows = [...packageTableRows];
                          updatedRows[index].pattype = e.target.value;
                          setPackageTableRows(updatedRows);
                        }}
                        options={[{value:"MRNO",label:"MRNO"},{value:"IPNO",label:"IPNO"}]}/>
                      
                    </td>
                    <td>
                      <div className="input-with-icon">
                        <FloatingInput
                        label={"Select IPNO"}
                         type="search"
                          value={selectedIPNo[index]?.ipAdmissionId || ''}
                          readOnly
                          onIconClick={() => setActivePopup("ipAdmission")}
                        />
                        

                      </div>
                    </td>
                    <td>
                      <FloatingInput
                      label={"Selected IP NO"}
                      type="text"
                      value={selectedIPNo[index]?.patientName || ''}
                      readOnly/>
                     
                    </td>
                    <td>
                      <div className="input-with-icon">
                        <FloatingInput
                        label={"Selected IP Service"}
                        type="search"
                          value={selectedIpServices[index]?.serviceName || ''}
                          readOnly
                          onIconClick={() => setActivePopup("ipService")}/>
                       
                      </div>
                    </td>
                    <td>
                      <FloatingInput
                      label={"selected Ip Service"}
                      type="text"
                      value={selectedIpServices[index]?.serviceCode || ''}
                      readOnly/>
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="MaintenanceChecklistPopUp-surgeryEvents-action-buttons">
          <button
            className="MaintenanceChecklistPopUp-btn-blue"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentUtilisationFormPopUp;