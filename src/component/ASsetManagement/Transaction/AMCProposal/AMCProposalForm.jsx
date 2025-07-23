// AMCRenewalForm.jsx
import React, { useEffect, useState } from 'react';
import './AMCProposalForm.css';
import { API_BASE_URL } from '../../../api/api';
// AMCRenewalForm.jsx
// [Previous imports remain the same]

const AMCProposalForm = () => {
  const [formData, setFormData] = useState({
    proposalNumber: '',
    proposalTo: '',
    proposalDate: '',
    nameOfEquipment: '',
    equipmentNo: '',
    assetNo: '',
    manufacturer: '',
    supplier: '',
    dateOfPurchase: '',
    purchaseCostOfEquipment: '',
    installationDate: '',
    previousAMCType: 'AMC',
    previousAMCFromDate: '',
    previousAMCToDate: '',
    previousAMCDetails: '',
    lastYearAMCCharges: '',
    presentAMCType: 'AMC',
    presentAMCFromDate: '',
    presentAMCToDate: '',
    presentAMCDetails: '',
    proposalCharges: '',
    significantTerms: 'No',
    proposalMadeBy: '',
    equipmentFile: null
  });


   const [equipmentData, setEquipmentData] = useState({
      equipmentNo: "",
      serialNo: "",
      assetNo: "",
      equipmentLocation: "",
      category: "",
      depriciation: "",
      modelNo: "",
      companyBrand: "",
      responsiblePerson: "",
      supplierName: "",
      cost: ""
    });

    
  const [equipmentmasters, setEquipmentMasters] = useState([]);
  const [selectedEquipmentMaster, setSelectedEquipmentMaster] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/equipment-masters`)
      .then((response) => response.json())
      .then((data) => {
        setEquipmentMasters(data); // Assuming data is an array of complaint objects

      })
      .catch((error) => console.error("Error fetching equipment numbers:", error));
  }, []);

  const handleEquipmentChange = (event) => {
    const selectedEquipmentId = event.target.value;
    setSelectedEquipmentMaster(selectedEquipmentId);
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

   // Fetch equipment details based on selected equipment
   
    

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      equipmentFile: e.target.files[0]
    }));
  };

  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      if (selectedEquipmentMaster) {
        try {
          const response = await fetch(`${API_BASE_URL}/equipment-masters/${selectedEquipmentMaster}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
  
          setEquipmentData({
            equipmentNo: data.equipmentMasterId || "",
            serialNo: data.serialNo || "",
            assetNo: data.assetNo || "",
            equipmentLocation: data?.assetLocationMaster?.subLocation || "",
            category: data?.assetCateMasterDTO?.underCategory || "",
            depriciation: data?.assetCateMasterDTO?.depreciation || "",
            modelNo: data.modelNo || "",
            companyBrand: data.companyBrand || "",
            responsiblePerson: data.equipmentOwner || "",
            supplierName: data.vendor?.vendorName || "",
            cost: data.cost || "",
          });
        } catch (error) {
          console.error("Error fetching equipment details:", error);
        }
      } else {
        setEquipmentData({
          equipmentNo: "",
          serialNo: "",
          assetNo: "",
          equipmentLocation: "",
          category: "",
          depriciation: "",
          modelNo: "",
          companyBrand: "",
          responsiblePerson: "",
        });
      }
    };
  
    fetchEquipmentDetails();
  }, [selectedEquipmentMaster]);


  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/employees/get-all-employee`);
        const data = await response.json();
        setEmployees(data); // Assuming `data` contains an array of employee objects with nested employee data
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeChange = (e) => {
    const empId = (e.target.value);
    setSelectedEmployee(empId);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare the data in the required format
      const submitData = {
        proposalTo: formData.proposalTo,
        proposalDate: formData.proposalDate,
        previousAmcType: formData.previousAMCType,
        previousAmcFromDate: formData.previousAMCFromDate,
        previousAmcToDate: formData.previousAMCToDate,
        previousAmcDetails: formData.previousAMCDetails,
        lastYearAmcCharges: parseFloat(formData.lastYearAMCCharges),
        presentAmcType: formData.presentAMCType,
        presentAmcFromDate: formData.presentAMCFromDate,
        presentAmcToDate: formData.presentAMCToDate,
        presentAmcDetails: formData.presentAMCDetails,
        proposalCharges: parseFloat(formData.proposalCharges),
        significantTerms: formData.significantTerms,
        equipmentMasterDTO: {
          equipmentMasterId: parseInt(selectedEquipmentMaster)
        },
        praposalMadeByDTO: {
          employeeId: parseInt(selectedEmployee)
        }
      };

      const response = await fetch(`${API_BASE_URL}/proposalForAmcRenewal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      console.log(JSON.stringify(submitData, null, 2));
      

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Proposal submitted successfully:', result);
      alert("Proposal submitted successfully")
      // Reset form or show success message
      // You might want to reset the form here or show a success message
    } catch (error) {
      console.error('Error submitting proposal:', error);
    }
  };


  return (
    <div className="amc-form-container">
      <div className="amc-form-header">
        <h2>Proposal For AMC Renewal</h2>
      </div>

      <form className="amc-form">
        <div className="amc-form-content">
          <div className="amc-form-column">


            <div className="amc-form-field">
              <label>Name Of Equipment<span className="required">*</span></label>
              <div className="amc-input-container">
              <select
                    value={selectedEquipmentMaster}
                    onChange={handleEquipmentChange}
                  >
                    <option value="" disabled>
                      Select Equipment
                    </option>
                    {equipmentmasters.map((equipment) => (
                      <option key={equipment.equipmentMasterId} value={equipment.equipmentMasterId}>
                        {equipment.equipmentName}
                      </option>
                    ))}
                  </select>
              </div>
            </div>

            <div className="amc-form-field">
              <label>Asset No<span className="required">*</span></label>
              <div className="amc-input-container">
                <input
                  type="text"
                  name="assetNo"
                  value={equipmentData.assetNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="amc-form-field">
              <label>Supplier<span className="required">*</span></label>
              <div className="amc-input-container">
                <input
                  type="text"
                  name="supplier"
                  value={equipmentData.supplierName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="amc-form-field">
              <label>Cost Of Equipment<span className="required">*</span></label>
              <div className="amc-input-container">
                <input
                  type="text"
                  name="purchaseCostOfEquipment"
                  value={equipmentData.cost}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="amc-form-field">
              <label>Previous AMC Type<span className="required">*</span></label>
              <div className="amc-input-container">
                <select
                  name="previousAMCType"
                  value={formData.previousAMCType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="AMC">AMC</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="amc-form-field">
              <label>Last Year AMC Charges</label>
              <div className="amc-input-container">
                <input
                  type="text"
                  name="lastYearAMCCharges"
                  value={formData.lastYearAMCCharges}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="amc-form-field">
              <label>Proposal Made By</label>
              <div className="amc-input-container">
              <select
                value={selectedEmployee}
                onChange={handleEmployeeChange}
                className="equipment-user-training-select"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.employeeId} value={emp.employeeId}>
                    {emp.firstName} {emp.lastName}

                  </option>
                ))}
              </select>
              </div>
            </div>
          </div>

          <div className="amc-form-column">
            <div className="amc-form-field">
              <label>Proposal To<span className="required">*</span></label>
              <div className="amc-input-container">
                <input
                  type="text"
                  name="proposalTo"
                  value={formData.proposalTo}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="amc-form-field">
              <label>Equipment No</label>
              <div className="amc-input-container">
                <input
                  type="text"
                  name="equipmentNo"
                  value={equipmentData.equipmentNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="amc-form-field">
              <label>Proposal Charges<span className="required">*</span></label>
              <div className="amc-input-container">
                <input
                  type="text"
                  name="proposalCharges"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="amc-form-field">
              <label>Date Of Purchase<span className="required">*</span></label>
              <div className="amc-input-container">
                <input
                  type="date"
                  name="dateOfPurchase"
                  value={formData.dateOfPurchase}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="amc-form-field">
              <label>Installation Date<span className="required">*</span></label>
              <div className="amc-input-container">
                <input
                  type="date"
                  name="installationDate"
                  value={formData.installationDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="amc-form-field">
              <label>Previous AMC Details<span className="required">*</span></label>
              <div className="amc-input-container">
                <input
                  type="text"
                  name="previousAMCDetails"
                  value={formData.previousAMCDetails}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="amc-form-field">
              <label>Present AMC Type</label>
              <div className="amc-input-container">
                <select
                  name="presentAMCType"
                  value={formData.presentAMCType}
                  onChange={handleInputChange}
                >
                  <option value="AMC">AMC</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="amc-form-column">
            <div className="amc-form-field">
              <label>Proposal Date<span className="required">*</span></label>
              <div className="amc-input-container">
                <input
                  type="date"
                  name="proposalDate"
                  value={formData.proposalDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="amc-form-field">
              <label>Previous AMC From Date</label>
              <div className="amc-input-container">
                <input
                  type="date"
                  name="previousAMCFromDate"
                  value={formData.previousAMCFromDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="amc-form-field">
              <label>Previous AMC To Date</label>
              <div className="amc-input-container">
                <input
                  type="date"
                  name="previousAMCToDate"
                  value={formData.previousAMCToDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="amc-form-field">
              <label>Present AMC From Date</label>
              <div className="amc-input-container">
                <input
                  type="date"
                  name="presentAMCFromDate"
                  value={formData.presentAMCFromDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="amc-form-field">
              <label>Present AMC To Date</label>
              <div className="amc-input-container">
                <input
                  type="date"
                  name="presentAMCToDate"
                  value={formData.presentAMCToDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="amc-form-field">
              <label>Present AMC Details</label>
              <div className="amc-input-container">
                <input
                  type="text"
                  name="presentAMCDetails"
                  value={formData.presentAMCDetails}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="equipment-details">
              <h3>Equipment Details</h3>
              <div className="file-upload-container">
                <input
                  type="text"
                  className="file-name-input"
                  placeholder="File Name"
                  readOnly
                />
                <input
                  type="file"
                  id="fileUpload"
                  className="amc-file-input"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileUpload" className="amc-choose-file-btn">Choose File</label>
                <button type="button" className="amc-upload-btn">Upload</button>
              </div>
            </div>


          </div>

        </div>

        <button className='amc-proposal-add' onClick={handleSubmit}>Add</button>

      </form>
    </div>
  );
};

export default AMCProposalForm;