import React, { useState, useRef, useEffect, lazy } from "react";
import axios from "axios"; // Make sure to install axios: npm install axios
import "./ServiceMaster.css";
import ServiceRate from "./ServiceRate";
import OperationOrProcedureRate from "./OperationOrProcedureRate";
import { API_BASE_URL } from "../../api/api";
import { PopupTable } from "../../../FloatingInputs";
import {FloatingInput,FloatingSelect,FloatingTextarea} from "../../../FloatingInputs";
import { toast } from "react-toastify";



const ServiceMaster = ({ refreshTable, onClose }) => {

  const [activePopup, setActivePopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeComponent, setActiveComponent] = useState("defaultValue");
  const [payType, setPayType] = useState([]);

  const [servicetypedata,setServicetypeData]= useState();
  const[selectedServicetype,setSelectedservicetype]=useState();
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
      procedureDuration: null,
    },
    procedureRates: [],
    serviceRates: [],
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
        console.error("Error fetching pay types:", error);
      }
    };

    fetchPayType();
    fetchservicetype();
  }, []);


  const fetchservicetype = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/servicetypes`);
     
      console.log(response.data);
      setServicetypeData(response.data);
    } catch (error) {
      console.error("Error fetching pay types:", error);
    }
  };

  const [serviceRates, setServiceRates] = useState([]);

  const [procedureRates, setProcedureRates] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle nested form data
    const updateNestedState = (stateSetter, currentState, path, value) => {
      const keys = path.split(".");
      const newState = { ...currentState };
      let current = newState;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      stateSetter(newState);
    };

    // Determine how to update based on input type and name
    if (name.startsWith("serviceOptions.")) {
      const updatedServiceOptions = formData.serviceOptions || {}; // Default to an empty object if undefined

      updatedServiceOptions[name.split(".")[1]] =
        type === "checkbox" ? checked : value;

      setFormData({
        ...formData,
        serviceOptions: updatedServiceOptions,
      });
    } else if (name.startsWith("inventoryOptions.")) {
      const updatedInventoryOptions = [...formData.inventoryOptions];
      const index = 0; // Assuming single inventory option for now
      updatedInventoryOptions[index][name.split(".")[1]] =
        type === "checkbox" ? checked : value;

      setFormData({
        ...formData,
        inventoryOptions: updatedInventoryOptions,
      });
    } else {
      // Handle top-level form data
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleServiceRateChange = (index, field, value) => {
    const updatedRates = [...serviceRates];
    updatedRates[index][field] = value;
    setServiceRates(updatedRates);
    console.log("-------Service_rate", updatedRates);
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

  
  const handleSave = async () => {
    if (!formData.serviceName || !formData.serviceCode) {
      alert("Please fill in required fields");
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
            id: rate.payTypeid, // Use payTypeid from rate or default to 1
            payTypeName: rate.payType,
          },
        })),
        serviceType:{serviceTypeId:selectedServicetype?.serviceTypeId},

        procedureRates: procedureRates.map((rate, index) => ({
          operationOrProcedureRateId: index + 1,
          description: rate.description,
          percentage: rate.percentage,
          drRef: rate.drRef || "",
        })),
      };
      console.log(payload);

      const response = await axios.post(
        `${API_BASE_URL}/service-details`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Save successful:", response.data);
      toast.success("Service details saved successfully!");

      onClose();
      refreshTable();
    } catch (error) {
      console.error(
        "Error saving service details:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to save service details: ${
          error.response?.data?.message || "Unknown error"
        }`
      );
    }
  };

  const handleReset = () => {
    setFormData({
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
        procedureDuration: null,
      },
      procedureRates: [],
      serviceRates: [], // Reset serviceRates
    });
  
    setSelectedservicetype(null); // Reset selected service type
    
    // Ensure payType is available before resetting serviceRates
    if (payType.length > 0) {
      setServiceRates(
        payType.map((type) => ({
          payTypeid: type.id,
          payType: type.payTypeName,
          rate: null,
          doctorSharePercentage: null,
          doctorShareAmount: null,
        }))
      );
    } else {
      setServiceRates([]);
    }
  
    setProcedureRates([]); // Reset procedure rates
    toast.info("Form has been reset.");
  };
  

  const getPopupData = () => {
   
    if (activePopup) {
      return {
        columns: ["serviceTypeId", "serviceTypeName","serviceTypeCode","description"],
        data:servicetypedata,
      };
    } else {
      return { columns: [], data: [] };
    }
  };


  const handleSelect = (data) => {
    if (activePopup) {
      setSelectedservicetype(data);
    }
  };

  const { columns, data } = getPopupData();

  return (
    <>
      <div className="ServiceMaster-sh-container">
        <h2 className="ServiceMaster-sh-header">Service Master</h2>
        <h3 className="ServiceMaster-sub-header">Service Details</h3>
        <div className="ServiceMaster-sh-form">
          <div className="ServiceMaster-sh-section">
            <FloatingInput
            label={"Service Name"}
            type="text"
              name="serviceName"
              placeholder="Enter Service Name"
              value={formData.serviceName}
              onChange={handleChange}/>
            
          </div>
          <div className="ServiceMaster-sh-section">
            <FloatingInput
            label={"Display Name"}
            type="text"
              name="displayName"
              placeholder="Enter Display Name"
              value={formData.displayName}
              onChange={handleChange}/>
            
          </div>
          <div className="ServiceMaster-sh-section">
            <FloatingInput
            label={"Service Code"}
            type="text"
            name="serviceCode"
            placeholder="Enter Service Code"
            value={formData.serviceCode}
            onChange={handleChange}/>
            
          </div>
          <div className="ServiceMaster-sh-section">
            <FloatingInput
            label={"Service Type Name"}
            type="search"
              name="serviceTypeName"
              placeholder="Enter Service Type"
              value={selectedServicetype?.serviceTypeName}
              onChange={handleChange}
              onIconClick={() => setActivePopup(true)}/>
           
            
          </div>
          <div className="ServiceMaster-sh-section">
            <FloatingInput
            label={"Company Name"}
            type="text"
              name="companyName"
              placeholder="Enter Company Name"
              value={formData.companyName}
              onChange={handleChange}/>
           
          </div>
          <div className="ServiceMaster-sh-section">
            <FloatingInput
            label={"Company Code"}
            type="text"
            name="companyCode"
            placeholder="Enter Company Code"
            value={formData.companyCode}
            onChange={handleChange}/>
           
          </div>
          <div className="ServiceMaster-sh-section">
            <FloatingSelect
            label={"Doctor Required"}
            name="doctorRequireType"
              value={formData.doctorRequireType}
              onChange={handleChange}
              options={[{value:"",label:"Select Doctor Requirement"},
                {value:"Required",label:"Doctor Required"},
                {value:"Not Required",label:"Doctor Not Required"}
              ]}/>
            
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
            <FloatingSelect
            label={"Fixed Type"}
            name="serviceOptions.fixedType"
              value={formData.serviceOptions.fixedType}
              onChange={handleChange}
              options={[{value:"Fixed",label:"Fixed"}
                ,{value:"variable",label:"variable"}
              ]}/>
           
          </div>
          <div className="ServiceMaster-sh-section">
            <FloatingSelect
            label={"Consultation Type"}
            name="serviceOptions.consultationType"
              value={formData.serviceOptions.consultationType}
              onChange={handleChange}
              options={[{value:"",label:"Select Consultation Type"},
                {value:"Consultation",label:"Consultation"},
                {value:"Procedure",label:"Procedure"},
                {value:"Investigation",label:"Investigation"},
                {value:"Miscellaneous",label:"Miscellaneous"}
              ]}/>
            
          </div>
          <div className="ServiceMaster-sh-section">
            <FloatingSelect
            label={"Type of Service"}
            name="serviceOptions.typeOfService"
              value={formData.serviceOptions.typeOfService}
              onChange={handleChange}
              options={[{value:"",label:"Select Service Type"},
                {value:"OPD",label:"OPD"},
                {value:"IPD",label:"IPD"}
              ]}/>
            
          </div>
          <div className="ServiceMaster-sh-section">
            <FloatingSelect
            label={"Department Type"}
            name="serviceOptions.departmentType"
              value={formData.serviceOptions.departmentType}
              onChange={handleChange}
              options={[{value:"",label:"Select Department"},
                {value:"general",label:"General"},
                {value:"cardiology",label:"Cardiology"},
                {value:"neurology",label:"Neurology"},
                {value:"orthopedics",label:"Orthopedics"},
                {value:"pediatrics",label:"Pediatrics"},
                {value:"gynecology",label:"gynecology"},
                {value:"radiology",label:"Radiology"}
              ]}/>
            
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
            <FloatingSelect
            label={"Hourly Type"}
            name="serviceOptions.hourlyType"
              id=""
              value={formData.hourlyType}
              onChange={handleChange}
              options={[{value:"",label:"Select Option"},
                {value:"Daily",label:"Daily"},
                {value:"Hourly",label:"Hourly"}
              ]}/>
            
          </div>
          <div className="ServiceMaster-sh-section">
            <FloatingSelect
            label={"Primary Type"}
            name="serviceOptions.primaryType"
              id=""
              value={formData.primaryType}
              onChange={handleChange}
              options={[{value:"Primary Service",label:"Primary Service"},
                {value:"Non-Primary Service",label:"Non-Primary Service"},
              ]}/>
            
          </div>
          <div className="ServiceMaster-sh-section">
            <FloatingSelect
            label={"Posting Type"}
            name="serviceOptions.postingType"
            id=""
            value={formData.postingType}
            onChange={handleChange}
            options={[{value:"Auto Posting",label:"Auto Posting"},
              {value:"Non Auto Posting",label:"Non Auto Posting"}
            ]}/>
           
          </div>
          <div className="ServiceMaster-sh-section">
            <FloatingSelect
            label={"Procedure Duration"}
            name="serviceOptions.procedureDuration"
              id=""
              value={formData.procedureDuration}
              onChange={handleChange}
              options={[{value:"15",label:"15"},
                {value:"30",label:"30"},
                {value:"40",label:"40"},
                {value:"60",label:"60"},
              ]}/>
            
          </div>
          <div></div> <div></div>
          <div></div>
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
        <button className="ServiceMaster-sh-sav" onClick={handleSave}>
          Save
        </button>
        <button className="ServiceMaster-sh-sav"  onClick={handleReset}>
          Reset
        </button>
      </div>

      {activePopup && (
              <PopupTable
                columns={columns}
                data={data}
                onClose={() => setActivePopup(false)}
                onSelect={handleSelect}
              />
            )}
    </>
  );
};

export default ServiceMaster;
