import React, { useState ,useRef} from "react";
import "./ServiceMaster.css";
// import { startResizing } from '../TableHeadingResizing/resizableColumns';
import ServiceRate from "./ServiceRate";
import OperationOrProcedureRate from "./OperationOrProcedureRate";
const ServiceMaster = () => {
  const [activeComponent, setActiveComponent] = useState('defaultValue');
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);
  const data = [
  ];
  const [formData, setFormData] = useState({
    serviceName:"",
    displayName:"",
    serviceCode:"",
    serviceTypeName:"",
    companySName:"",
    companySCode:"",
    doctorRequired:"",
    package:"",
    fixedType:"",
    consultationType:"",
    typeOfService:"",
    departmentType:"",
    hourlyType:"",
    primaryType:"",
    postingType:"",
    procedureDuration:"",
    reportType:"",
    reportTime:"",
    toBeApproved:"",
    sampleCollection:"",
    sampleReceiving:"",
    reportDelay:"",
    printDelay:"",
    approvalDelay:"",
    urgentTatTime:"",
    vacutainerType:"",
    sampleType:"",
    mapLISID:"",
    NABLLOGO:"" ,
    sacCode:"",
    gstCategory:"",
    selectServiceType:"",
  });
  const [tableData, setTableData] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachments: [...formData.attachments, e.target.files[0]],
    });
  };
  const handleSave = () => {
    setTableData([...tableData, formData]);
    setFormData({
    });
  };
  return (
      <>
    <div className="ServiceMaster-sh-container">
      <h2 className="ServiceMaster-sh-header">Service Master</h2> 
      <h3>Service Details  </h3>
      <div className="ServiceMaster-sh-form">
      <div className="ServiceMaster-sh-section">
        <label>Service Name </label>
        <input type="text" placeholder="Enter MR No" />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Display Name </label>
        <input type="text" placeholder="Enter MR No" />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Service Code</label>
        <input type="text" placeholder="Enter MR No" />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Service Type Name</label>
        <input type="search" id="description" placeholder="Search item type" />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Company SName</label>
          <input type="text" placeholder="Enter MR No" />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Company SCode</label>
          <input type="text" placeholder="Enter Patient Name" />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Doctor Required</label>
        <select>
    <option value="">Select Doctor</option>
    <option value="general">General Physician</option>
    <option value="surgeon">Surgeon</option>
    <option value="pediatrician">Pediatrician</option>
    <option value="orthopedic">Orthopedic</option>
    <option value="cardiologist">Cardiologist</option>
    <option value="gynecologist">Gynecologist</option>
    <option value="dermatologist">Dermatologist</option>
  </select>
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Package Service</label>
        <input  className="ServiceMaster-sh-checkbox" type="checkbox" id="description" placeholder="Search Country " />
        </div>
    <div></div>
    
    <h3>Service Options</h3>
    <div></div>    
    <div></div>
        <div className="ServiceMaster-sh-section">
        <label>Fixed Type</label>
        <select>
    <option value="">Select Fixed Type</option>
    <option value="daily">Daily</option>
    <option value="weekly">Weekly</option>
    <option value="monthly">Monthly</option>
    <option value="yearly">Yearly</option>
  </select>
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Consutation Type</label>
        <select>
    <option value="">Select Consultation Type</option>
    <option value="in-person">In-Person</option>
    <option value="online">Online</option>
    <option value="telemedicine">Telemedicine</option>
  </select>
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Type Of Service</label>
        <select>
    <option value="">Select Service Type</option>
    <option value="consultation">Consultation</option>
    <option value="surgery">Surgery</option>
    <option value="emergency">Emergency</option>
    <option value="diagnostics">Diagnostics</option>
    <option value="follow-up">Follow-up</option>
  </select>
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Department Type</label>
        <select>
    <option value="">Select Department</option>
    <option value="cardiology">Cardiology</option>
    <option value="neurology">Neurology</option>
    <option value="orthopedics">Orthopedics</option>
    <option value="pediatrics">Pediatrics</option>
    <option value="gynecology">Gynecology</option>
    <option value="radiology">Radiology</option>
  </select>        </div>
  <div className="ServiceMaster-sh-section">
        <label>Dis OPD History</label>
        <input  className="ServiceMaster-sh-checkbox" type="checkbox" id="description" placeholder="Search Country " />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Councelling Services</label>
        <input  className="ServiceMaster-sh-checkbox" type="checkbox" id="description" placeholder="Search Country " />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Blood Bank Services</label>
        <input  className="ServiceMaster-sh-checkbox" type="checkbox" id="description" placeholder="Search Country " />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Diet Services</label>
        <input  className="ServiceMaster-sh-checkbox" type="checkbox" id="description" placeholder="Search Country " />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Hourly Type</label>
          <input type="search" id="description" placeholder="Search item type" />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Primary Type</label>
        <input 
        type="search" 
        id="description" 
        placeholder="Search item type" />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Posting Type</label>
        <input type="text" placeholder="Enter District Name" />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Procedure Duration</label>
        <input type="search" id="description" placeholder="Search item type" />
        </div>
        <div></div>  <div></div><div></div>
<h3>Inventory Options</h3>
<div></div>
<div></div>
        <div className="ServiceMaster-sh-section">
        <label>Report Type</label>
        <select>
    <option value="">Select Report Type</option>
    <option value="summary">Summary</option>
    <option value="detailed">Detailed</option>
    <option value="statistical">Statistical</option>
    <option value="diagnostic">Diagnostic</option>
    <option value="medical">Medical</option>
  </select>        </div>
        <div className="ServiceMaster-sh-section">
        <label>Report Time</label>
          <input type="text" placeholder="Enter Pincode Name" />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Out Sources Report</label>
        <input  className="ServiceMaster-sh-checkbox" type="checkbox" id="description" placeholder="Search Country " />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>To Be Approved</label>
          <input type="text" placeholder="Enter Phone No " />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Sample Collection</label>
        <input type="text" placeholder="Enter Mobile No " />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Sample Receiving</label>
        <input 
        type="text" 
        placeholder="Enter Mobile No "
         />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Report Delay</label>
          <input type="search" id="description" placeholder="Search Country " />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Print Delay</label>
          <input type="search" id="description" placeholder="Search Country " />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Approval Delay</label>
        <input type="search" id="description" placeholder="Search Country " />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Urgent Tat Time</label>
        <input type="text" placeholder="Enter Entitlement" />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Vacutainer Type</label>
        <input type="search" id="description" placeholder="Search Country " />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Sample Type</label>
          <input type="search" id="description" placeholder="Search Country " />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Map LIS ID</label>
        <input type="number" />
        </div> 
        <div className="ServiceMaster-sh-section">
        <label>NABLLOGO</label>
        <input  className="ServiceMaster-sh-checkbox" type="checkbox" id="description" placeholder="Search Country " />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>SAC CODE</label>
          <input type="search" id="description" placeholder="Search Country " />
</div>
        <div className="ServiceMaster-sh-section">
        <label>GST Category</label>
        <input type="search" id="description" placeholder="Search Country " />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>IPD Consultation Serive</label>
        <input  className="ServiceMaster-sh-checkbox" type="checkbox" id="description" placeholder="Search Country " />
        </div>
        <div className="ServiceMaster-sh-section">
        <label>Appointment Service</label>
        <input  className="ServiceMaster-sh-checkbox" type="checkbox" id="description" placeholder="Search Country " />
        </div>
      </div>
      <div  className="ServiceMaster-buttons">
      <div className="ServiceMaster-buttons">
        <button className="ServiceMaster-buttons-button" onClick={()=>setActiveComponent("serviceRate")}>Service Rate</button>
        <button className="ServiceMaster-buttons-button" onClick={()=>setActiveComponent("operationOrProcedureRate")}>Operation Or Procedure Rate</button>
       </div>
     </div>
     <div>
        {activeComponent === "serviceRate" && <ServiceRate />}
        {activeComponent === "operationOrProcedureRate" && < OperationOrProcedureRate/>}
      </div>
    </div>
    <div className="ServiceMaster-sh-btn">
     <button className="ServiceMaster-sh-sav">Save</button>
</div>
</>
  );
};
export default ServiceMaster;

