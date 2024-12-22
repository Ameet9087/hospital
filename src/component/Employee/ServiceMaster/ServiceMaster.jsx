import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Make sure to install axios: npm install axios
import "./ServiceMaster.css";
import ServiceRate from "./ServiceRate";
import OperationOrProcedureRate from "./OperationOrProcedureRate";
import { API_BASE_URL } from "../../api/api";

const ServiceMaster = () => {
  const [activeComponent, setActiveComponent] = useState('defaultValue');
  const [payType,setPayType] = useState([]);
  const [formData, setFormData] = useState({
    serviceName: "",
    displayName: "",
    serviceCode: "",
    serviceTypeName: "",
    companyName: "",
    companyCode: "",
    doctorRequireType: "",
    packageServices: false,
    status: "Active",
    serviceOptions: {
      fixedType: "",
      consultationType: "",
      typeOfService: "",
      departmentType: "",
      disOpdHistory: false,
      counsellingServices: false,
      bloodBankService: false,
      dietService: false,
      hourlyType: "",
      primaryType: "",
      postingType: "",
      procedureDuration: null
    },
    procedureRates: [],
    serviceRates: []
  });


  useEffect(() => {
    const fetchPayType = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/pay-type`);
        const payTypeData = response.data;

        setPayType(payTypeData);

        // Map payType data to serviceRates format
        const initialServiceRates = payTypeData.map((type) => ({
          payTypeid: type.id,
          payType: type.payTypeName,
          rate: null,
          doctorSharePercentage: null,
          doctorShareAmount: null,
        }));
        setServiceRates(initialServiceRates);
      } catch (error) {
        console.error('Error fetching pay types:', error);
      }
    };

    fetchPayType();
  }, []);

  
  const [serviceRates, setServiceRates] = useState([]);

  const [procedureRates, setProcedureRates] = useState([]);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested form data
    const updateNestedState = (stateSetter, currentState, path, value) => {
      const keys = path.split('.');
      const newState = { ...currentState };
      let current = newState;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      stateSetter(newState);
    };

    // Determine how to update based on input type and name
    if (name.startsWith('serviceOptions.')) {
      const updatedServiceOptions = formData.serviceOptions || {}; // Default to an empty object if undefined
  
      updatedServiceOptions[name.split('.')[1]] = type === 'checkbox' ? checked : value;
  
      setFormData({
          ...formData,
          serviceOptions: updatedServiceOptions
      });
  }else if (name.startsWith('inventoryOptions.')) {
      const updatedInventoryOptions = [...formData.inventoryOptions];
      const index = 0; // Assuming single inventory option for now
      updatedInventoryOptions[index][name.split('.')[1]] = 
        type === 'checkbox' ? checked : value;
      
      setFormData({
        ...formData,
        inventoryOptions: updatedInventoryOptions
      });
    } else {
      // Handle top-level form data
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleServiceRateChange = (index, field, value) => {
    const updatedRates = [...serviceRates];
    updatedRates[index][field] = value;
    setServiceRates(updatedRates);
    console.log("-------Service_rate",updatedRates);
  };

  const handleProcedureRateChange = (index, field, value) => {
    const updatedRates = [...procedureRates];
    if (index >= updatedRates.length) {
      updatedRates.push({ [field]: value });
    } else {
      updatedRates[index][field] = value;
    }
    setProcedureRates(updatedRates);
  };

  // const handleSave = async () => {
  //   try {
  //     // Prepare the complete payload
  //     const payload = {
  //       serviceDetailsId: 1, // You might want to generate or receive this dynamically
  //       ...formData,
  //       serviceRates: serviceRates.map((rate, index) => ({
  //         serviceRateid: index + 1,
  //         rate: rate.rate,
  //         doctorSharePercentage: rate.doctorSharePercentage,
  //         doctorShareAmount: rate.doctorShareAmount,
  //         payType: {
  //           payTypeId: index + 1,
  //           payTypeName: rate.payType,
  //           payOrder: (index + 1).toString(),
  //           activeStatus: "Active",
  //           opdCategory: "General",
  //           categoryCode: CAT${index + 1}
  //         }
  //       })),
  //       procedureRates: procedureRates.map((rate, index) => ({
  //         operationOrProcedureRateId: index + 1,
  //         description: rate.description,
  //         percentage: rate.percentage,
  //         drRef: rate.drRef || ''
  //       }))
  //     };

  //     const response = await axios.post(
  //       'http://192.168.0.114:4200/api/service-details', 
  //       payload
  //     );

  //     console.log('Save successful:', response.data);
  //     alert('Service details saved successfully!');
  //   } catch (error) {
  //     console.error('Error saving service details:', error);
  //     alert('Failed to save service details. Please try again.');
  //   }
  // };
  const handleSave = async () => {
    if (!formData.serviceName || !formData.serviceCode) {
      alert('Please fill in required fields');
      return;
    }
  
    try {
      const payload = {
  
        ...formData,
        serviceRates: serviceRates.map((rate, index) => ({
          rate: rate.rate,
          doctorSharePercentage: rate.doctorSharePercentage,
          doctorShareAmount: rate.doctorShareAmount,
          payType: {
            id: rate.payTypeid , // Use payTypeid from rate or default to 1
            payTypeName: rate.payType
        }
        })),
        procedureRates: procedureRates.map((rate, index) => ({
          operationOrProcedureRateId: index + 1,
          description: rate.description,
          percentage: rate.percentage,
          drRef: rate.drRef || ''
        }))
      };
      console.log(payload)
  
      const response = await axios.post(
        `${API_BASE_URL}/service-details`, 
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      console.log('Save successful:', response.data);
      alert('Service details saved successfully!');
    } catch (error) {
      console.error('Error saving service details:', error.response?.data || error.message);
      alert(`Failed to save service details: ${error.response?.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <>
    <div className="ServiceMaster-sh-container">
      <h2 className="ServiceMaster-sh-header">Service Master</h2>
      <h3 className="ServiceMaster-sub-header">Service Details</h3>
      <div className="ServiceMaster-sh-form">
        <div className="ServiceMaster-sh-section">
          <label>Service Name</label>
          <input 
            type="text" 
            name="serviceName"
            placeholder="Enter Service Name"
            value={formData.serviceName}
            onChange={handleChange}
          />
        </div>
        <div className="ServiceMaster-sh-section">
          <label>Display Name</label>
          <input 
            type="text" 
            name="displayName"
            placeholder="Enter Display Name"
            value={formData.displayName}
            onChange={handleChange}
          />
        </div>
        <div className="ServiceMaster-sh-section">
          <label>Service Code</label>
          <input 
            type="text" 
            name="serviceCode"
            placeholder="Enter Service Code"
            value={formData.serviceCode}
            onChange={handleChange}
          />
        </div>
        <div className="ServiceMaster-sh-section">
          <label>Service Type Name</label>
          <input 
            type="text" 
            name="serviceTypeName"
            placeholder="Enter Service Type"
            value={formData.serviceTypeName}
            onChange={handleChange}
          />
        </div>
        <div className="ServiceMaster-sh-section">
          <label>Company Name</label>
          <input 
            type="text" 
            name="companyName"
            placeholder="Enter Company Name"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
        <div className="ServiceMaster-sh-section">
          <label>Company Code</label>
          <input 
            type="text" 
            name="companyCode"
            placeholder="Enter Company Code"
            value={formData.companyCode}
            onChange={handleChange}
          />
        </div>
        <div className="ServiceMaster-sh-section">
          <label>Doctor Required</label>
          <select
            name="doctorRequireType"
            value={formData.doctorRequireType}
            onChange={handleChange}
          >
            <option value="">Select Doctor Requirement</option>
            <option value="Required">Doctor Required</option>
            <option value="Not Required">Doctor Not Required</option>
          </select>
        </div>
        <div className="ServiceMaster-sh-section">
          <label>Package Service</label>
          <input 
        className="ServiceMaster-sh-checkbox" 
            type="checkbox"
            name="packageServices"
            checked={formData.packageServices}
            onChange={handleChange}
          />
        </div>
        <div></div>

        <h3 className="ServiceMaster-sub-header">Service Options</h3>
        <div></div>    
        <div></div>
        {/* Service Options Section */}
        <div className="ServiceMaster-sh-section">
          <label>Fixed Type</label>
          <select
            name="serviceOptions.fixedType"
            value={formData.serviceOptions.fixedType}
            onChange={handleChange}
          >
              <option value=""> Fixed </option>
              <option value="variable">Variable</option>
          </select>
        </div>

        <div className="ServiceMaster-sh-section">
          <label>Consultation Type</label>
          <select
            name="serviceOptions.consultationType"
            value={formData.serviceOptions.consultationType}
            onChange={handleChange}
          >
            <option value="">Select Consultation Type</option>
            <option value="Consultation">Consultation</option>
            <option value="Procedure">Procedure</option>
            <option value="Investigation">Investigation</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>

        <div className="ServiceMaster-sh-section">
          <label>Type of Service</label>
          <select
            name="serviceOptions.typeOfService"
            value={formData.serviceOptions.typeOfService}
            onChange={handleChange}
          >
            <option value="">Select Service Type</option>
            <option value="OPD">OPD</option>
            <option value="IPD">IPD</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div className="ServiceMaster-sh-section">
          <label>Department Type</label>
          <select
            name="serviceOptions.departmentType"
            value={formData.serviceOptions.departmentType}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="general">General</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="gynecology">Gynecology</option>
            <option value="radiology">Radiology</option>
          </select>
        </div>
        <div className="ServiceMaster-sh-section">
          <label>Dis OPD History</label>
          <input 
        className="ServiceMaster-sh-checkbox" 
            type="checkbox"
            name="serviceOptions.disOpdHistory"
            checked={formData.serviceOptions.disOpdHistory}
            onChange={handleChange}
          />
        </div>

        <div className="ServiceMaster-sh-section">
          <label>Counselling Services</label>
          <input 
        className="ServiceMaster-sh-checkbox" 
            type="checkbox"
            name="serviceOptions.counsellingServices"
            checked={formData.serviceOptions.counsellingServices}
            onChange={handleChange}
            />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Blood Bank Services</label>
        <input  
        className="ServiceMaster-sh-checkbox" 
        type="checkbox" 
        name="serviceOptions.bloodBankService"
        checked={formData.serviceOptions.bloodBankService}
        onChange={handleChange}
        />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Diet Services</label>
        <input  
        className="ServiceMaster-sh-checkbox" 
        type="checkbox" 
        
        name="serviceOptions.dietService"
        placeholder="Diet Services " 
        checked={formData.serviceOptions.dietService}
        onChange={handleChange}
        />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Hourly Type</label>
          <select name="serviceOptions.hourlyType" id=""  value={formData.hourlyType}
            onChange={handleChange}>
              <option value="">Select Option</option>
              <option value="Daily">Daily</option>
              <option value="Hourly">Hourly</option>

          </select>
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Primary Type</label>
        <select name="serviceOptions.primaryType" id="" value={formData.primaryType}
         onChange={handleChange}>
          <option value="Primary Service">Primary Service</option>
          <option value="Non-Primary Service">Non-Primary Service</option>
        </select>
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Posting Type</label>
        <select name="serviceOptions.postingType" id=""  value={formData.postingType}
         onChange={handleChange}>
          <option value="Auto Posting">Auto Posting</option>
          <option value="Non-auto posting">Non-auto posting</option>
        </select>
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Procedure Duration</label>
        <select name="serviceOptions.procedureDuration" id="" value={formData.procedureDuration}
         onChange={handleChange}>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="60">60</option>

        </select>
        </div>
        <div></div>  <div></div><div></div>
{/* 
        <h3>Inventory Options</h3>
        <div></div>
<div></div> */}
        {/* <div className="ServiceMaster-sh-section">
          <label>Report Type</label>
          <select
            name="inventoryOptions.reportType"
            value={formData.inventoryOptions[0].reportType}
            onChange={handleChange}
          >
            <option value="">Select Report Type</option>
            <option value="summary">Summary</option>
            <option value="detailed">Detailed</option>
            <option value="statistical">Statistical</option>
            <option value="diagnostic">Diagnostic</option>
            <option value="medical">Medical</option>
          </select>
        </div> */}

        {/* <div className="ServiceMaster-sh-section">
          <label>Report Time (Hours)</label>
          <input 
            type="number"
            name="inventoryOptions.reportTimeInHours"
            value={formData.inventoryOptions[0].reportTimeInHours || ''}
            onChange={handleChange}
            />
        </div> */}
        {/* <div className="ServiceMaster-sh-section">
        <label>Out Sources Report</label>
        <input  
        className="ServiceMaster-sh-checkbox" 
        type="checkbox"  
        value={formData.inventoryOptions[0].outSourceReport}
        onChange={handleChange}
        />
        </div> */}
        {/* <div className="ServiceMaster-sh-section">
        <label>To Be Approved</label>
          <input 
          type="text" 
          placeholder="To Be Approved " 
        value={formData.toBeApproved}
         onChange={handleChange}
         />
        </div> */}
        {/* <div className="ServiceMaster-sh-section">
        <label>Sample Collection</label>
        <input 
        type="text" 
        placeholder="Enter Sample Collection " 
        value={formData.sampleCollection}
         onChange={handleChange}
        />
        </div> */}
        {/* <div className="ServiceMaster-sh-section">
        <label>Sample Receiving</label>
        <input type="text" 
        placeholder="Enter Sample Receiving "
        value={formData.sampleReceiving}
         onChange={handleChange} 
        />
        </div> */}
        {/* <div className="ServiceMaster-sh-section">
        <label>Report Delay</label>
          <input 
          type="search"  
          placeholder="Search Report Delay " 
          value={formData.reportDelayInHour}
          onChange={handleChange} 
          />
        </div> */}
        {/* <div className="ServiceMaster-sh-section">
        <label>Print Delay</label>
          <input 
          type="search"  
          placeholder="Search Print Delay " 
          value={formData.printDelayInHours}
          onChange={handleChange} 
          />
        </div> */}
        {/* <div className="ServiceMaster-sh-section">
        <label>Approval Delay</label>
        <input 
        type="search"  
        placeholder="Search Approval Delay " 
        value={formData.approvalDelayInHours}
        onChange={handleChange} 
        />
        </div> */}
        {/* <div className="ServiceMaster-sh-section">
        <label>Urgent Tat Time</label>
        <input 
        type="text" 
        placeholder="Enter Urgent Tat Time" 
        value={formData.urgentTatTime}
        onChange={handleChange} 
        />
        </div> */}
        {/* <div className="ServiceMaster-sh-section">
        <label>Vacutainer Type</label>
        <input 
        type="search"  
        placeholder="Search Vacutainer Type "
        value={formData.vacutainerType}
        onChange={handleChange} 
        />
        </div> */}
        {/* <div className="ServiceMaster-sh-section">
        <label>Sample Type</label>
          <input 
          type="search"  
          placeholder="Sample Type " 
          value={formData.sampleType}
          onChange={handleChange} 
          />
        </div> */}
        {/* <div className="ServiceMaster-sh-section">
        <label>Map LIS ID</label>
        <input 
        type="number" 
        value={formData.mapLisId}
        onChange={handleChange} 
        />
        </div>  */}
        {/* <div className="ServiceMaster-sh-section">
        <label>NABLLOGO</label>
        <input  
        className="ServiceMaster-sh-checkbox" 
        type="checkbox"  
        placeholder="NABLLOGO " 
        value={formData.inventoryOptions[0].nabllogo}
        onChange={handleChange}
        />
        </div> */}
        {/* <div className="ServiceMaster-sh-section">
        <label>SAC CODE</label>
          <input 
          type="search"  
          placeholder="SAC CODE "
          value={formData.sacCode}
          onChange={handleChange} 
          />
</div> */}
        {/* <div className="ServiceMaster-sh-section">
        <label>GST Category</label>
        <input 
        type="search"  
        placeholder="GST Category "
        value={formData.gstCategory}
        onChange={handleChange} 
        />
        </div> */}
        {/* <div className="ServiceMaster-sh-section">
        <label>IPD Consultation Serive</label>
        <input  
        className="ServiceMaster-sh-checkbox" 
        type="checkbox"  
        value={formData.inventoryOptions[0].ipdConsultationServices}
        onChange={handleChange}
        />
        </div> */}
        {/* <div className="ServiceMaster-sh-section">
        <label>Appointment Service</label>
        <input  
        className="ServiceMaster-sh-checkbox" 
        type="checkbox"  
        value={formData.inventoryOptions[0].appointmentService}
        onChange={handleChange}
        />
        </div> */}
      </div>

      <div className="ServiceMaster-buttons">
        <button 
          className="ServiceMaster-buttons-button" 
          onClick={() => setActiveComponent("serviceRate")}
        >
          Service Rate
        </button>
        <button 
          className="ServiceMaster-buttons-button" 
          onClick={() => setActiveComponent("operationOrProcedureRate")}
        >
          Operation Or Procedure Rate
        </button>
      </div>

      <div>
        {activeComponent === "serviceRate" && (
          <ServiceRate 
            rates={serviceRates} 
            onRateChange={handleServiceRateChange}
          />
        )}
        {activeComponent === "operationOrProcedureRate" && (
          <OperationOrProcedureRate 
            rates={procedureRates} 
            onRateChange={handleProcedureRateChange}
          />
        )}
      </div>
    </div>

    <div className="ServiceMaster-sh-btn">
      <button 
        className="ServiceMaster-sh-sav" 
        onClick={handleSave}
      >
        Save
      </button>
    </div>
    </>
  );
};

export default ServiceMaster;