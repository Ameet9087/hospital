import React, { useState, useEffect, useRef } from 'react';
import './AMCDetailsMulti.css';
import { API_BASE_URL } from '../../../api/api';
import PopupTable from '../../../Admission/PopupTable';
import { FloatingInput, FloatingSelect } from '../../../../FloatingInputs';
import {toast}  from "react-toastify";

const AMCDetailsmulti = ({ bookingId }) => {
  const [id, setId] = useState(bookingId || "");
  const [selectedTab, setSelectedTab] = useState('package');
  const [activePopup, setActivePopup] = useState("");

  const [proposalForAmcMulti, setProposalForAmcMulti] = useState([]);
  const [selectedProposalForAmcMulti, setSelectedProposalForAmcMulti] = useState([]);
  const [equipmentMasterList, setEquipmentMasterList] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/proposals-amc-multiple`)
      .then((response) => response.json())
      .then((data) => {
        setProposalForAmcMulti(data);
      })
      .catch((error) => console.error("Error fetching equipment data:", error));
  }, []);

  useEffect(() => {
    if (selectedProposalForAmcMulti) {
      setEquipmentMasterList(selectedProposalForAmcMulti.equipmentMastersDTO || []);
    }
  }, [selectedProposalForAmcMulti]);

  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/vendors/getAllVendors`);
        if (!response.ok) {
          throw new Error("Failed to fetch vendors");
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  const getPopupData = () => {
    if (activePopup === "proposalamc") {
      return {
        columns: ["proposalId", "proposalDetails"], data: proposalForAmcMulti
      };
    } else if (activePopup === "supplier") {
      return {
        columns: ["id", "vendorName"], data: vendors
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "proposalamc") {
      setSelectedProposalForAmcMulti(data);
    } else if (activePopup === "supplier") {
      setSelectedVendor(data);
    }
    setActivePopup(null); // Close the popup after selection
  };

  const [formData, setFormData] = useState({
    manualContractNo: "",
    contractFrom: "",
    contractTo: "",
    costOfContract: "",
    contractOfAmc: "",
    warrantyDetails: "",
    insurance: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const payload = {
      manualContractNo: formData.manualContractNo,
      contractFrom: formData.contractFrom,
      contractTo: formData.contractTo,
      costOfContract: parseFloat(formData.costOfContract),
      contractOfAmc: formData.contractOfAmc,
      warrantyDetails: formData.warrantyDetails,
      insurance: formData.insurance,
      vendorDTO: {
        id: selectedVendor.id
      },
      proposalForAmcMultipleDTO: {
        proposalId: selectedProposalForAmcMulti.proposalId
      }
    };

    try {
      const response = await fetch(`${API_BASE_URL}/amc-details-multi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Data saved successfully!");
        console.log("Saved data:", responseData);
      } else {
        toast.error("Failed to save data:", response.statusText);
        alert("Failed to save data. Please try again.");
      }
    } catch (error) {
      toast.error("Error saving data:", error);
      toast.error("Error occurred while saving data.");
    }
  };

  const renderTable = () => {
    if (selectedTab === 'package') {
      return (
        <div className="services-table">
          <div className="surgeryEvents-title-bar">
            <div className="surgeryEvents-header">
              <span>Equipment Info</span>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                {["SN", "Equipment Name", "Equipment No", "Installation Date", "Asset No", "Serial No", "Company Brand", "Cost"].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {equipmentMasterList.map((equipment, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{equipment.equipmentName}</td>
                  <td>{equipment.equipmentNo}</td>
                  <td>{equipment.installationDate}</td>
                  <td>{equipment.assetNo}</td>
                  <td>{equipment.serialNo}</td>
                  <td>{equipment.companyBrand}</td>
                  <td>{equipment.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="surgery-Events">
      <div className="surgeryEvents-title-bar">
        <div className="surgeryEvents-header">
          <span>AMC Details Multi</span>
        </div>
      </div>
      <div className="surgeryEvents-content-wrapper">
        <div className="surgeryEvents-main-section">
          <div className="surgeryEvents-panel dis-templates">
            <div className="surgeryEvents-panel-content">
              <div className="surgeryEvents-form-row">
                <FloatingInput
                label={"Proposal No"}
                type="search" value={selectedProposalForAmcMulti?.proposalId || ""}
                onIconClick={() => setActivePopup("proposalamc")}
                />
                
              </div>
              <div className="surgeryEvents-form-row">
                <FloatingInput
                label={"Proposal To"}
                type="text" value={selectedProposalForAmcMulti?.proposalTo || ""} readOnly/>
                
              </div>
              <div className="surgeryEvents-form-row">
                <FloatingInput
                label={"Proposal Date"}
                type="text" value={selectedProposalForAmcMulti?.proposalDate || ""} readOnly/>
                
              </div>
              <div className="surgeryEvents-form-row">
                <FloatingInput
                label={"Proposal Charges"}
                type="text" value={selectedProposalForAmcMulti?.proposalCharges || ""} readOnly/>
              </div>
            </div>
            {activePopup && (
              <PopupTable
                columns={columns}
                data={data}
                onSelect={handleSelect}
                onClose={() => setActivePopup(null)}
              />
            )}
          </div>

          <div className="surgeryEvents-panel operation-details">
            <div className="surgeryEvents-panel-header">Contract Details</div>
            <div className="surgeryEvents-panel-content">
              <div className="surgeryEvents-form-row">
                <FloatingInput
                label={"Manual Contract No"}
                type="text"
                  name="manualContractNo"
                  value={formData.manualContractNo}
                  onChange={handleInputChange}
                />
               
              </div>
              <div className="surgeryEvents-form-row">
                <FloatingInput
                label={"Contract From"}
                type="date"
                  name="contractFrom"
                  value={formData.contractFrom}
                  onChange={handleInputChange}/>
              </div>
              <div className="surgeryEvents-form-row">
                <FloatingInput
                label={"Contract To"}
                type="date"
                name="contractTo"
                value={formData.contractTo}
                onChange={handleInputChange}/>
              </div>
              <div className="surgeryEvents-form-row">
                <FloatingInput
                label={"Cost Of Contract"}
                type="text"
                name="costOfContract"
                value={formData.costOfContract}
                onChange={handleInputChange}/>
              </div>
              <div className="surgeryEvents-form-row">
                <FloatingInput
                label={"Contract Of AMC"}
                type="text"
                  name="contractOfAmc"
                  value={formData.contractOfAmc}
                  onChange={handleInputChange}
                />
              </div>
              <div className="surgeryEvents-form-row">
                <FloatingInput
                label={"Warranty Details"}
                type="text"
                  name="warrantyDetails"
                  value={formData.warrantyDetails}
                  onChange={handleInputChange}/>
              </div>
              <div className="surgeryEvents-form-row">
                <FloatingInput
                label={"Insurance"}
                type="text"
                name="insurance"
                value={formData.insurance}
                onChange={handleInputChange}/>
              </div>
            </div>
          </div>

          <div className="surgeryEvents-panel operation-details">
            <div className="surgeryEvents-panel-header">Company Details</div>
            <div className="surgeryEvents-panel-content">
            
              
                <div className="surgeryEvents-input-with-search">
                  <FloatingInput
                  label={"Supplier"}
                  type="search" value={selectedVendor?.vendorName || ""} readOnly 
                  onIconClick={() => setActivePopup("supplier")}
                  
                  />
                  
               
              </div>
              <div className="surgeryEvents-form-row">
                <FloatingInput
                label={"Address"}
                type="text" value={selectedVendor?.contactAddress || ""} readOnly/>
               
              </div>
              <div className="surgeryEvents-form-row">
                <FloatingInput
                label={"Mobile No"}
                type="text" value={selectedVendor?.contactNumber || ""} readOnly
                />
              </div>
              <div className="surgeryEvents-form-row">
                <FloatingInput
                label={"Email"}
                type="text" value={selectedVendor?.email || ""} readOnly/>
                
              </div>
              <div className="surgeryEvents-form-row">
                <FloatingInput
                label={"Contact Person"}
                type="text" value={selectedVendor?.contactPerson || ""} readOnly 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="surgeryEvents-services-section">
          <div className="surgeryEvents-tab-bars">
            <button
              className={`surgeryEvents-tab ${selectedTab === 'package' ? 'active' : ''}`}
              onClick={() => setSelectedTab('package')}>
              Equipment Info
            </button>
          </div>
          {renderTable()}
        </div>

        <div className="surgeryEvents-action-buttons">
          <button className="btn-blue" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AMCDetailsmulti;
