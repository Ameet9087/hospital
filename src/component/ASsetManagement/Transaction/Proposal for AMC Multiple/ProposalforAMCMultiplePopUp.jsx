import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import './ProposalForAMCMultiplePopUp.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { FaSearch } from "react-icons/fa";
import { API_BASE_URL } from '../../../api/api';

import { toast } from 'react-toastify';
import { FloatingInput, FloatingSelect, PopupTable } from '../../../../FloatingInputs';


const ProposalforAMCMultiplePopUp = () => {

  const [activePopup, setActivePopup] = useState("")

  const [formData, setFormData] = useState({
    proposalDate: '',
    proposalTo: '',
    contractType: 'AMC',
    proposalFromDate: '',
    proposalToDate: '',
    proposalCharges: '',
    proposalDetails: '',
    previousAmcDetails: '',
    lastYearAmcCharge: '',
    significantTerms: 'Yes',
    terms: '',
    madeBy: ''
  });
  const [selectedSupplier, setSelectedSupplier] = useState([]);


  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to handle the final save
  const handleSave = async () => {

    try {
      // Prepare equipment masters data
      const equipmentMastersDTO = proposalDetails.map(row => ({
        equipmentMasterId: row.equipmentMasterId || null
      })).filter(item => item.equipmentMasterId !== null);

      // Prepare vendors data
      const vendorsDTO = selectedSupplier.map(row => ({
        id: row.id || null
      })).filter(item => item.id !== null);

      // Prepare approval data
      const approvalBy = approvedDetails.length > 0 && approvedDetails[0].doctorId
        ? { doctorId: approvedDetails[0].doctorId }
        : null;

      // Prepare the payload
      const payload = {
        proposalDate: formData.proposalDate,
        proposalTo: formData.proposalTo,
        contractType: formData.contractType,
        proposalFromDate: formData.proposalFromDate,
        proposalToDate: formData.proposalToDate,
        proposalCharges: formData.proposalCharges,
        proposalDetails: formData.proposalDetails,
        previousAmcDetails: formData.previousAmcDetails,
        lastYearAmcCharge: formData.lastYearAmcCharge,
        significantTerms: formData.significantTerms,
        terms: formData.terms,
        approvalBy,
        equipmentMastersDTO,
        vendorsDTO
      };



      // Make the API call
      const response = await fetch(`${API_BASE_URL}/proposals-amc-multiple`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to save proposal');
      }

      // Handle success (you can add your own success handling)
      toast.success('Proposal saved successfully!');

    } catch (error) {
      console.error('Error saving proposal:', error);
      toast.error('Failed to save proposal. Please try again.');
    }
  };

  const handleSelect = async (data) => {
    if (activePopup === "equipment") {
      setSelectedEquipmentMaster((prev) => [...prev, data]);

      // Update the current row with equipment ID
      const updatedProposalDetails = [...proposalDetails];
      updatedProposalDetails[proposalDetails.length - 1] = {
        ...updatedProposalDetails[proposalDetails.length - 1],
        equipmentMasterId: data.equipmentMasterId
      };
      setProposalDetails(updatedProposalDetails);
    }
    else if (activePopup === "supplier") {
      setSelectedSupplier((prev) => [...prev, data]);
      // Update the current row with vendor ID
      const updatedProposalDetails = [...proposalDetails];
      updatedProposalDetails[proposalDetails.length - 1] = {
        ...updatedProposalDetails[proposalDetails.length - 1],
        vendorId: data.id
      };
      setProposalDetails(updatedProposalDetails);
    }
    else if (activePopup === "doctor") {
      setSelectedDoctor(data);
      // Update the current row with doctor ID
      const updatedApprovedDetails = [...approvedDetails];
      updatedApprovedDetails[approvedDetails.length - 1] = {
        ...updatedApprovedDetails[approvedDetails.length - 1],
        doctorId: data.doctorId
      };
      setApprovedDetails(updatedApprovedDetails);
    }
    setActivePopup(null);
  };

  const [equipmentmasters, setEquipmentMasters] = useState([]);
  const [selectedEquipmentMaster, setSelectedEquipmentMaster] = useState([]);


  useEffect(() => {
    fetch(`${API_BASE_URL}/equipment-masters`)
      .then((response) => response.json())
      .then((data) => {
        setEquipmentMasters(data); // Assuming data is an array of complaint objects


      })
      .catch((error) => console.error("Error fetching equipment numbers:", error));
  }, []);



  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/vendors/getAllVendors`)
      .then((response) => response.json())
      .then((data) => {
        setSuppliers(data); // Assuming data is an array of complaint objects



      })
      .catch((error) => console.error("Error fetching Suppliers numbers:", error));
  }, []);


  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {

    fetch(`${API_BASE_URL}/doctors`)
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data); // Assuming data is an array of complaint objects

      })
      .catch((error) => console.error("Error fetching Doctors ", error));
  }, []);



  const getPopupData = () => {
    if (activePopup === "equipment") {
      return {
        columns: ["equipmentMasterId", "equipmentName"], data: equipmentmasters
      };
    }
    else if (activePopup == "supplier") {
      return {
        columns: ["id", "vendorName"], data: suppliers
      }
    }
    else if (activePopup == "doctor") {
      return {
        columns: ["doctorId", "doctorName"], data: doctors
      }
    }

    else {
      return { columns: [], data: [] };
    }
  };



  const { columns, data } = getPopupData();

  // const handleSelect = async (data) => {
  //   if (activePopup === "equipment") {
  //     setSelectedEquipmentMaster(data);
  //   }
  //   else if (activePopup === "supplier") {
  //     setSelectedSupplier(data);
  //   }
  //   else if (activePopup === "doctor") {
  //     setSelectedDoctor(data);
  //   }

  //   setActivePopup(null); // Close the popup after selection
  // };


  const [activeTab, setActiveTab] = useState('proposal');


  const [proposalDetails, setProposalDetails] = useState([
    { sn: 1, equipmentName: '', type: '', assetNo: '', manualCode: '', location: '', category: '' }
  ]);
  const [approvedDetails, setApprovedDetails] = useState([
    { sn: 1, approvalBy: '', priority: '' }
  ]);

  const SearchIcon = FaSearch;

  const handleAddRow = (type) => {
    if (type === 'proposal') {
      setProposalDetails([
        ...proposalDetails,
        {
          sn: proposalDetails.length + 1,
          equipmentName: '',
          type: '',
          assetNo: '',
          manualCode: '',
          location: '',
          category: '',
          supplierName: ''
        }
      ]);
      // Reset the selected values when adding a new row
      // setSelectedEquipmentMaster("");
      // setSelectedSupplier("");
    } else if (type === 'approved') {
      setApprovedDetails([
        ...approvedDetails,
        {
          sn: approvedDetails.length + 1,
          approvalBy: '',
          priority: ''
        }
      ]);
      // Reset the selected doctor when adding a new row
      setSelectedDoctor("");
    }
  };


  const handleDeleteRow = (type, index) => {
    if (type === 'proposal') {
      const updatedProposalDetails = proposalDetails.filter((_, i) => i !== index);

      // Ensure at least one row is constant
      if (updatedProposalDetails.length === 0) {
        setProposalDetails([
          {
            sn: 1,
            equipmentName: '',
            type: 'New',
            assetNo: '',
            manualCode: '',
            location: '',
            category: '',
            supplierName: ''
          }
        ]);
      } else {
        // Update serial numbers after deletion
        setProposalDetails(
          updatedProposalDetails.map((row, i) => ({
            ...row,
            sn: i + 1
          }))
        );
      }
    } else {
      const updatedApprovedDetails = approvedDetails.filter((_, i) => i !== index);

      // Ensure at least one row is constant
      if (updatedApprovedDetails.length === 0) {
        setApprovedDetails([
          {
            sn: 1,
            approvalBy: '',
            priority: ''
          }
        ]);
      } else {
        // Update serial numbers after deletion
        setApprovedDetails(
          updatedApprovedDetails.map((row, i) => ({
            ...row,
            sn: i + 1
          }))
        );
      }
    }
  };



  const [fileName, setFileName] = useState('');

  const handleChooseFileClick = () => {
    document.getElementById('fileInput').click(); // Trigger file input click
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Update the file name
    }
  };

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  return (
    <div className="ProposalforAMCMultiplePopUp-container">
      <div className="ProposalforAMCMultiplePopUp-header">
        Proposal For AMC Multiple
      </div>

      <div className="ProposalforAMCMultiplePopUp-form-container">
        <div className="ProposalforAMCMultiplePopUp-form-section">

          <div className="ProposalforAMCMultiplePopUp-form-group">
            <div className="ProposalforAMCMultiplePopUp-date-input">
              <FloatingInput
              label={"Proposal Date"}
                type="date"
                name="proposalDate"
                value={formData.proposalDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="ProposalforAMCMultiplePopUp-section-header">Proposal Details</div>
          <div className="ProposalforAMCMultiplePopUp-form-group">
            <FloatingSelect 
  name="contractType"
  onChange={handleInputChange}
  options={[
    { value: "", label: "Select Contract Type" }, // Placeholder option
    { value: "AMC", label: "AMC" },
    { value: "CMC", label: "CMC" },
    { value: "Warranty", label: "Warranty" },
    { value: "On-Call", label: "On-Call" }
  ]}
/>

          </div>
          <div className="ProposalforAMCMultiplePopUp-form-group">
            <div className="ProposalforAMCMultiplePopUp-date-input">


              <FloatingInput
              label={"Proposal From Date"}
                type="date"
                name="proposalFromDate"
                value={formData.proposalFromDate}
                onChange={handleInputChange}
                className="ProposalforAMCMultiplePopUp-input-field"
              />

            </div>
          </div>
          <div className="ProposalforAMCMultiplePopUp-form-group">
            <div className="ProposalforAMCMultiplePopUp-date-input">
              <FloatingInput
              label={"Proposal To Date"}
                type="date"
                name="proposalToDate"
                value={formData.proposalToDate}
                onChange={handleInputChange}
                className="ProposalforAMCMultiplePopUp-input-field"
              />

            </div>
          </div>
        </div>


        <div className="ProposalforAMCMultiplePopUp-form-section">
          <div className="ProposalforAMCMultiplePopUp-form-group">
        
            <FloatingInput

            label={"Proposal To"}
              type="text"
              name="proposalTo"
              value={formData.proposalTo}
              onChange={handleInputChange}
              className="ProposalforAMCMultiplePopUp-input-field"
            />
          </div>
          <div className="ProposalforAMCMultiplePopUp-form-group">
            <FloatingInput
            label={"Proposal Charges"}
              type="number"
              name="proposalCharges"
              value={formData.proposalCharges}
              onChange={handleInputChange}
              className="ProposalforAMCMultiplePopUp-input-field"
            />
          </div>


          <div className="ProposalforAMCMultiplePopUp-form-group">

            <FloatingInput
            label={"Proposal Details"}
              type="text"
              name="proposalDetails"
              value={formData.proposalDetails}
              onChange={handleInputChange}
              className="ProposalforAMCMultiplePopUp-input-field"
            />
          </div>

          <div className="ProposalforAMCMultiplePopUp-form-group">
            <FloatingInput
            label={"Previous AMC DetailsZ"}
              type="text"
              name="previousAmcDetails"
              value={formData.previousAmcDetails}
              onChange={handleInputChange}
              className="ProposalforAMCMultiplePopUp-input-field"
            />
          </div>

          <div className="ProposalforAMCMultiplePopUp-form-group">

            <FloatingInput
            label={"Last Year AMC Charges"}
              type="number"
              name="lastYearAmcCharge"
              value={formData.lastYearAmcCharge}
              onChange={handleInputChange}
              className="ProposalforAMCMultiplePopUp-input-field"
            />
          </div>

        </div>

        <div className="ProposalforAMCMultiplePopUp-form-section">

          <div className="ProposalforAMCMultiplePopUp-form-group">
            <FloatingSelect label={"Significant Terms"} name='significantTerms'onChange={handleInputChange} options={[{value:"",label:""},
              {value:"Yes",label:"Yes"},

            ]}/>
          </div>
          <div className="ProposalforAMCMultiplePopUp-form-group">
            <FloatingInput
            label={"Terms"}
              type="text"
              name="terms"
              value={formData.terms}
              onChange={handleInputChange}
              className="ProposalforAMCMultiplePopUp-input-field"
            />
          </div>


          <div className="ProposalforAMCMultiplePopUp-form-group">
            <FloatingInput label={"Made By"} type="text" className="ProposalforAMCMultiplePopUp-input-field" />
          </div>

          <div className="ProposalforAMCMultiplePopUp-format-section">
            <div className="ProposalforAMCMultiplePopUp-section-header">Format</div>
            <div className="ProposalforAMCMultiplePopUp-file-upload">
              <input
                type="text"
                className="ProposalforAMCMultiplePopUp-input-field"
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
                className="ProposalforAMCMultiplePopUp-btn-secondary"
                onClick={handleChooseFileClick}
              >
                Choose File
              </button>
              <button className="ProposalforAMCMultiplePopUp-btn-secondary">Upload</button>
            </div>
          </div>



        </div>
      </div>

      <div className="ProposalforAMCMultiplePopUp-tabs-section">
        <div className="ProposalforAMCMultiplePopUp-tab-buttons">
          <button
            className={`ProposalforAMCMultiplePopUp-tab-btn ${activeTab === 'proposal' ? 'active' : ''}`}
            onClick={() => setActiveTab('proposal')}
          >
            Proposal Details
          </button>
          <button
            className={`ProposalforAMCMultiplePopUp-tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            Approved Details
          </button>
        </div>
        {activePopup && (
          <PopupTable
            columns={columns}
            data={data}
            onSelect={handleSelect}
            onClose={() => setActivePopup(false)}
          />
        )}

        {activeTab === 'proposal' ? (
          <div className="ProposalforAMCMultiplePopUp-table-container">
            <div className="ProposalforAMCMultiplePopUp-table-actions">
              <span>Proposal Details</span>

            </div>

            <table className="ProposalforAMCMultiplePopUp-data-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Equipment Name",
                    "Type",
                    "Asset No",
                    "Location",
                    "Category",
                    "Supplier Name"
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
                  <tr key={index}>
                    {/* Actions Column */}
                    <td>
                      <button
                        className="ProposalforAMCMultiplePopUp-btn-add"
                        onClick={() => handleAddRow("proposal")}
                      >
                        Add
                      </button>
                      <button
                        className="ProposalforAMCMultiplePopUp-btn-delete"
                        onClick={() => handleDeleteRow("proposal", index)}
                      >
                        Del
                      </button>
                    </td>
                    {/* SN Column */}
                    <td>{row.sn}</td>
                    {/* Equipment Name Column */}
                    <td>
                      <div className="input-with-icon-proposal-amc">
                        <input type="text" value={selectedEquipmentMaster[index]?.equipmentName} placeholder="Search..." />
                        <SearchIcon onClick={() => setActivePopup("equipment")} className="input-icon" size={18} />
                      </div>
                    </td>
                    {/* Type */}
                    <td>
                      <input type="text" value={selectedEquipmentMaster[index]?.type} placeholder="Search..." />

                    </td>
                    {/* Asset No */}
                    <td>
                      <input type="text" value={selectedEquipmentMaster[index]?.assetNo} placeholder="Search..." />
                    </td>

                    {/* Location */}
                    <td>
                      <input type="text" value={selectedEquipmentMaster[index]?.assetLocationMaster?.subLocation} placeholder="Search..." />

                    </td>
                    {/* Category */}
                    <td>
                      <input type="text" value={selectedEquipmentMaster[index]?.assetCateMasterDTO?.underCategory} placeholder="Search..." />
                    </td>
                    {/* Supplier Name */}
                    <td>
                      <div className="input-with-icon-proposal-amc">
                        <input type="text" value={selectedSupplier[index]?.vendorName} placeholder="Search..." />
                        <SearchIcon onClick={() => setActivePopup("supplier")} className="input-icon" size={18} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


          </div>
        ) : (
          <div className="ProposalforAMCMultiplePopUp-table-container">
            <div className="ProposalforAMCMultiplePopUp-table-actions">
              <span>Approved Details</span>

            </div>
            <table className="ProposalforAMCMultiplePopUp-data-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "SN",
                    "Approval By",
                    "Priority",
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

                    <td>{row.sn}</td>
                    <td>
                      <div className="input-with-icon-proposal-amc">
                        <input type="text" value={selectedDoctor?.doctorName} />
                        <SearchIcon onClick={() => setActivePopup("doctor")} className="input-icon" size={18} />
                      </div>
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}
      </div>
      <button
        className="proposalforamcmultiple-add-btn"
        onClick={handleSave}
      >
        Save
      </button>

    </div>
  );
};

export default ProposalforAMCMultiplePopUp;