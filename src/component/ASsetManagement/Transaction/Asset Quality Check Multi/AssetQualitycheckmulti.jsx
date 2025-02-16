import React, { useState, useEffect, useRef } from 'react';
import './AssetQualityCheckMulti.css';
import { API_BASE_URL } from '../../../api/api';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { FloatingInput, FloatingSelect } from '../../../../FloatingInputs';
import {toast}  from "react-toastify";

const AssetQualityCheckMulti = () => {
  const [id, setId] = useState('');
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [hodList, setHodList] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedHod, setSelectedHod] = useState('');
  const [qualityCheckDate, setQualityCheckDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [signatureBME, setSignatureBME] = useState('');
  const [packageTableRows, setPackageTableRows] = useState([
    {
      sn: 1,
      equipmentMasterId: '',
      assetNo: '',
      equipmentNo: '',
      subLocation: '',
      makeSerialNo: '',
      underCategory: '',
      companyBrand: '',
      depreciation: '',
      modelNo: '',
      firstName: '',
    },
  ]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/departments/getAllDepartments`)
      .then((response) => response.json())
      .then((data) => {
        setHodList(data);
      })
      .catch((error) => {
        console.error('Error fetching HOD list:', error);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/equipment-masters`)
      .then((response) => response.json())
      .then((data) => {
        setEquipmentList(data);
        if (response.ok) {
          toast.success("Data Save Successfully..")
        }
      })

      .catch((error) => {
        console.error('Error fetching equipment list:', error);
      });

  }, []);

  const handleEquipmentChange = (index, selectedEquipmentId) => {
    const selectedEquipment = equipmentList.find(
      (equipment) => equipment.equipmentMasterId.toString() === selectedEquipmentId
    );

    if (selectedEquipment) {
      const updatedRows = [...packageTableRows];
      updatedRows[index] = {
        ...updatedRows[index],
        equipmentMasterId: selectedEquipment.equipmentMasterId || '',
        assetNo: selectedEquipment.assetNo || '',
        equipmentNo: selectedEquipment.equipmentNo || '',
        subLocation: selectedEquipment.assetLocationMaster?.subLocation || '',
        makeSerialNo: selectedEquipment.serialNo || '',
        underCategory: selectedEquipment.assetCateMasterDTO?.underCategory || '',
        companyBrand: selectedEquipment.companyBrand || '',
        depreciation: selectedEquipment.ytdDepreciation || '',
        modelNo: selectedEquipment.modelNo || '',
        firstName: selectedEquipment.responsibleDepartment?.departmentName || '',
      };
      setPackageTableRows(updatedRows);
    }
  };


  const handleAddRow = () => {
    const newRow = {
      sn: packageTableRows.length + 1,
      equipmentMasterId: id,
      assetNo: '',
      equipmentNo: '',
      subLocation: '',
      makeSerialNo: '',
      underCategory: '',
      companyBrand: '',
      depreciation: '',
      modelNo: '',
      firstName: '',
    };
    setPackageTableRows([...packageTableRows, newRow]);
  };

  const handleDeleteRow = (indexToRemove) => {
    const updatedRows = packageTableRows.filter((_, index) => index !== indexToRemove);
    const renumberedRows = updatedRows.map((row, index) => ({
      ...row,
      sn: index + 1,
    }));
    setPackageTableRows(renumberedRows);
  };
  const handleSave = () => {
    const payload = {
      checkDate: qualityCheckDate,
      comments: remarks,
      department: {
        departmentId: selectedHod,
        departmentHead: hodList.find((hod) => hod.departmentId === selectedHod)?.departmentHead || '', // Find and include the department head's name
      },
      signOfBME: signatureBME,
      equipmentList: packageTableRows.map((row) => ({
        equipmentMasterId: row.equipmentMasterId,
      })),
    };

    fetch(`${API_BASE_URL}/asset-quality-checks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Data saved successfully!');
          // Reset form if needed
        } else {
          toast.error('Failed to save data!');
        }
      })
      .catch((error) => {
        toast.error('Error saving data:', error);
        
      });
  };

  return (
    <div className="AssetQualityCheckMulti-surgery-Events">
      <div className="AssetQualityCheckMulti-surgeryEvents-title-bar">
        <div className="AssetQualityCheckMulti-surgeryEvents-header">
          <span>Assets Quality Check Multi</span>
        </div>
      </div>
      <div className="AssetQualityCheckMulti-surgeryEvents-content-wrapper">
        <div className="AssetQualityCheckMulti-surgeryEvents-main-section">
          <div className="AssetQualityCheckMulti-surgeryEvents-panel dis-templates">
            <div className="AssetQualityCheckMulti-surgeryEvents-panel-content">
              <div className="AssetQualityCheckMulti-surgeryEvents-form-row">
                <FloatingInput
                label={"Record No"}
                type="text" value={id} readOnly
                />
              </div>

              <div className="AssetQualityCheckMulti-surgeryEvents-form-row">
                <FloatingInput
                label={"Quality Check Date *"}
                type="date" value={qualityCheckDate}
                  onChange={(e) => setQualityCheckDate(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="AssetQualityCheckMulti-surgeryEvents-panel operation-details">
            <div className="AssetQualityCheckMulti-surgeryEvents-panel-header">Quality Parameters</div>

            <div className="AssetQualityCheckMulti-surgeryEvents-panel-content">
              <div className="AssetQualityCheckMulti-surgeryEvents-form-row">
                <FloatingInput
                label={"Comments/Remarks"}
                type="text" value={remarks}
                  onChange={(e) => setRemarks(e.target.value)} />
                
              </div>

              <div className="AssetQualityCheckMulti-surgeryEvents-form-row">
              <FloatingSelect
                label="Signature of Department HOD"
                value={selectedHod}
                onChange={(e) => setSelectedHod(e.target.value)}
                options={[
                { value: "", label: "Select HOD" }, // Default option
                ...hodList.map((hod) => ({
                value: hod.departmentId,
                label: hod.departmentHead,
              }))
            ]}
          />   
            </div>

              <div className="AssetQualityCheckMulti-surgeryEvents-form-row">
                <FloatingInput
                label={"Signature Of BME"}
                type="text" value={signatureBME} onChange={(e) => setSignatureBME(e.target.value)}
                />
               
              </div>
            </div>
          </div>
        </div>

        <div className="AssetQualityCheckMulti-surgeryEvents-services-section">
          <div className="services-table">
            <div className="AssetQualityCheckMulti-surgeryEvents-title-bar">
              <div className="AssetQualityCheckMulti-surgeryEvents-header">
                <span>Equipment Details</span>
              </div>
            </div>
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    'Actions',
                    'SN',
                    'Name Of The Equipment',
                    'Asset No',
                    'Equipment No',
                    'Location',
                    // 'Make & Serial No',
                    // 'Category',
                    'Company Brand',
                    // 'Depreciation',
                    'Model No',
                    // 'Responsibility Person',
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
                {packageTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="AssetQualityCheckMulti-surgeryEvents-add-btn"
                          onClick={handleAddRow}
                        >
                          Add
                        </button>
                        <button
                          className="AssetQualityCheckMulti-surgeryEvents-del-btn"
                          onClick={() => handleDeleteRow(index)}
                          disabled={packageTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>
                    <FloatingSelect
  label="Select Equipment"
  value={row.equipmentMasterId}
  onChange={(e) => handleEquipmentChange(index, e.target.value)}
  options={[
    { value: "", label: "Select Equipment" }, // Default option
    ...equipmentList.map((equipment) => ({
      value: equipment.equipmentMasterId,
      label: equipment.equipmentName,
    }))
  ]}
/>

                    </td>
                    <td>{row.assetNo}</td>
                    <td>{row.equipmentNo}</td>
                    <td>{row.subLocation}</td>
                    {/* <td>{row.makeSerialNo}</td> */}
                    {/* <td>{row.underCategory}</td> */}
                    <td>{row.companyBrand}</td>
                    {/* <td>{row.depreciation}</td> */}
                    <td>{row.modelNo}</td>
                    {/* <td>{row.firstName}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="AssetQualityCheckMulti-surgeryEvents-action-buttons">
          <button className="btn-blue" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AssetQualityCheckMulti;