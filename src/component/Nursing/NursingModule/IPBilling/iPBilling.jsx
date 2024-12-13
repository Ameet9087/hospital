// AjharTamboli 22-11-24 iPBilling.jsx
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// import ServicesPopup from "../Services/services_popup";
import axios from "axios";


import "./IpBilling.css";
const IPBilling = () => {
  const [selectedTab, setSelectedTab] = useState("services");
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate();
  const [services,setServices]=useState("");
  const ServiceHeading=["serviceId","serviceName","serviceCode","rate"];
  const [activePopup,setActivePopup]=useState("");



const [serviceData, setServiceData] = useState([]); // Store fetched service data
const [selectedService, setSelectedService] = useState(null); // Store the selected service
const [serviceCode, setServiceCode] = useState(''); // Store the service code
const [rate, setRate] = useState(0); // Store the rate



const ServiceFetch = async () => {
  try {
    const response = await axios.get('http://192.168.0.105:8080/api/totalservices');
    console.log(response.data);
    setServiceData(response.data); // Store the fetched service data
    alert(response.data);
  } catch (error) {
    console.error('Error fetching services:', error);
  }
};

// Handle change event when a service is selected
const handleServiceChange = (event, index) => {
  const selectedId = event.target.value;
  const selectedService = serviceData.find(
    (service) => service.serviceId.toString() === selectedId
  );

  if (selectedService) {
    const updatedRow = {
      ...servicesData[index],
      serviceName: selectedService.serviceName,
      code: selectedService.serviceCode,
      rate: selectedService.rate,
      qty: 0,  // Reset quantity when a new service is selected (optional)
    };

    // Update the row with the new values
    setServicesData((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? updatedRow : row
      )
    );
  }
};
// Fetch data when component mounts
useEffect(() => {
  ServiceFetch();
}, []);



  const handleSelect = async (data) => {
    if (activePopup === "Service") {
      setSelectedService(data);
     
    }
     
    console.log("Selected Data:", data);
    setActivePopup(null); // Close the popup after selection
  };

  

  const getPopupData = () => {
    if (activePopup === "services") {
      return { columns: ServiceHeading, data: services };
    }  else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();


  const patientData = useSelector((state) => state.patient?.patientData);


  console.log(patientData);

  if (!patientData) {
    return <div>Loading patient data...</div>;
  }
  const [currentDate, setCurrentDate] = useState("");

  // Set the current date in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setCurrentDate(formattedDate);


    const formattedTime = today.toTimeString().slice(0, 5); // Extract HH:MM
    setCurrentTime(formattedTime);


  }, []);

  const handleSaveData = () => {
    const dataToPost = {
      ipAdmissionId: 1,
      billingDate: new Date().toISOString(),
      billingTime: new Date().toISOString(),
      qnt: 0,
      billingUser: "John Doe",
      timing: "2024-12-09T15:30:00",
      emergency: null,
      total: 0.0,
      disc: 0,
      netAmt: 0.0,
      services: servicesData.map((service) => ({
        serviceId: service.serviceId, // Assuming the serviceId exists in servicesData
        serviceName: service.serviceName,
        serviceType: service.serviceType,
        serviceCode: service.serviceCode,
        rate: service.rate,
        qnt: service.qty,
        total: service.total,
      })),
    };
  
    fetch("http://192.168.0.105:8080/api/ipbillings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToPost),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data successfully saved:", data);
        // Optionally, reset the servicesData or handle post-save actions
      })
      .catch((error) => console.error("Error saving data:", error));
  };
  

  const handleRowUpdate = (id, field, value) => {
    setServicesData((prevRows) =>
      prevRows.map((row) => {
        if (row.sn === id) {
          const updatedRow = { ...row, [field]: parseFloat(value) || 0 };
  
          // Calculate total amount
          updatedRow.total = (updatedRow.rate || 0) * (updatedRow.qty || 0);
  
          // Calculate discount amount
          updatedRow.discAmount = (updatedRow.total * (updatedRow.disc || 0)) / 100;
  
          // Calculate net amount
          updatedRow.netAmount = updatedRow.total - updatedRow.discAmount;
  
          return updatedRow;
        }
        return row;
      })
    );
  };
  
  
  const [servicesData, setServicesData] = useState([
    {
      sn: 1,
      billDate: "New Service",
      billTime: 0,
      code: 0,
      serviceName: 0,
      doctorName: 0,
      rate: 0,
      qty: 0,
      total: "",
      disc: "",
      discAmount: "",
      netAmount: "",
      emerg: "",
      vacutainer: "",
      emerAmt: "",
      pkgName: "",
      doctorPercentage: "",
      docshareAmt: "",
      toHospital: "",
    }
    
  ]);
  // useEffect(() => {
  //   // Fetch data from the backend API on component mount
  //   fetch("http://192.168.0.105:8080/api/ipbillings")
  //     .then((response) => response.json())
  //     .then((data) => setServicesData(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);
  const handleAddRow = () => {
    const newRow = {
      sn: servicesData.length + 1,
      billDate: "New Service",
      billTime: 0,
      code: 0,
      serviceName: 0,
      doctorName: 0,
      rate: 0,
      qty: 0,
      total: "",
      disc: "",
      discAmount: "",
      netAmount: "",
      emerg: "",
      vacutainer: "",
      emerAmt: "",
      pkgName: "",
      doctorPercentage: "",
      docshareAmt: "",
      toHospital: "",
    };
    setServicesData([...servicesData, newRow]);
  };

  const handleDeleteRow = (snToDelete) => {
    const updatedData = servicesData
      .filter((row) => row.sn !== snToDelete)
      .map((row, index) => ({ ...row, sn: index + 1 }));
    setServicesData(updatedData);
  };


  const renderServicesTable = () => {
    return (
      <div className="iPBilling-table">
       
       <table>
    <thead>
      <tr>
        <th style={{ width: "10%" }}></th>
        <th style={{ width: "3%" }}>SN</th>
        <th style={{ width: "12%" }}>Bill Date</th>
        <th style={{ width: "8%" }}>Bill Time</th>
        <th style={{ width: "10%" }}>Code</th>
        <th style={{ width: "10%" }}>Service Name</th>
        <th>Doctor Name</th>
        <th>Rate</th>
        <th>Qty</th>
        <th>Total</th>
        <th>Disc</th>
        <th>Disc Amount</th>
        <th>Net Amount</th>
      </tr>
    </thead>
    <tbody>
      {servicesData.map((row) => (
        <tr key={row.sn}>
          <td>
            <div className="table-actions">
              <button className="iPBilling-add-btn" onClick={handleAddRow}>
                Add
              </button>
              <button
                className="iPBilling-del-btn"
                onClick={() => handleDeleteRow(row.sn)}
                disabled={servicesData.length <= 1}
              >
                Del
              </button>
            </div>
          </td>
          <td>{row.sn}</td>
          <td>
            <input
              type="date"
              value={row.billDate || ""}
              onChange={(e) => handleRowUpdate(row.sn, "billDate", e.target.value)}
              style={{ cursor: "pointer" }}
            />
          </td>
          <td>
            <input
              type="time"
              value={row.billTime || ""}
              onChange={(e) => handleRowUpdate(row.sn, "billTime", e.target.value)}
              className="time-input"
            />
          </td>
          <td>{row.code}</td>
          <td>
          <select
              onChange={(e) => handleServiceChange(e, index)}
              value={row.serviceId || ""} // Use serviceId as the value for selection
              style={{ width: "100px" }}
            >
              <option value="">Select A Service</option>
              {serviceData.map((service) => (
                <option key={service.serviceId} value={service.serviceId}>
                  {service.serviceName}
                </option>
              ))}
            </select>
          </td>
          <td>DR Amit</td>
          <td>
            <input
              type="number"
              value={row.rate || ""}
              onChange={(e) => handleRowUpdate(row.sn, "rate", e.target.value)}
              style={{ width: "80px" }}
            />
          </td>
          <td>
            <input
              type="number"
              name="qty"
              value={row.qty || ""}
              onChange={(e) => handleRowUpdate(row.sn, "qty", e.target.value)}
              style={{ width: "60px" }}
            />
          </td>
          <td>{row.total || "0.00"}</td>
          <td>
            <input
              type="number"
              name="disc"
              value={row.disc || ""}
              onChange={(e) => handleRowUpdate(row.sn, "disc", e.target.value)}
              style={{ width: "60px" }}
            />
          </td>
          <td>{row.discAmount || "0.00"}</td>
          <td>{row.netAmount || "0.00"}</td>
        </tr>
      ))}
    </tbody>
  </table>
      </div>
    );
  };

  const renderTable = () => {
    switch (selectedTab) {
      case "services":
        // Existing package table rendering
        return (
          <div className="iPBilling-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>SN</th>
                  <th>Bill Date</th>
                  <th>Bill Time</th>
                  <th>Code</th>
                  <th>Service Name</th>
                  <th>Doctor Name</th>
                  <th>rate</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Disc</th>
                  <th>Disc Amount</th>
                  <th>Net Amount</th>
                  <th>Emerg</th>
                  <th>Vacutainer</th>
                  <th>Emer Amt</th>
                  <th>Pkg Name</th>
                  <th>Doctor %</th>
                  <th>Doc share Amt</th>
                  {/* <th>To Hospital</th> */}
                </tr>
              </thead>
              <tbody>
                {servicesData.map((row) => (
                  <tr key={row.sn}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="iPBilling-add-btn"
                          onClick={handleAddRow}
                        >
                          Add
                        </button>
                        <button
                          className="iPBilling-del-btn"
                          onClick={() => handleDeleteRow(row.sn)}
                          disabled={servicesData.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.billDate}</td>
                    <td>{row.billTime}</td>
                    <td>{row.billNo}</td>
                    <td>{row.code}</td>
                    <td>{row.serviceName}</td>
                    <td>{row.doctorName}</td>
                    <td>{row.rate}</td>
                    <td>{row.qty}</td>
                    <td>{row.total}</td>
                    <td>{row.disc}</td>
                    <td>{row.discAmount}</td>
                    <td>{row.netAmount}</td>
                    <td>{row.emerg}</td>
                    <td>{row.emerAmt}</td>
                    <td>{row.userName}</td>
                    <td>{row.doctorPercentage}</td>
                    <td>{row.docshareAmt}</td>
                    {/* <td>{row.toHospital}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "testGrid":
        return renderServicesTable();
      case "bhs":
        // Existing BHS table rendering
        return (
          <div className="iPBilling-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>SN</th>
                  <th>Bill Date</th>
                  <th>Bill Time</th>
                  <th>Code</th>
                  <th>Service Name</th>
                  <th>Doctor Name</th>
                  <th>rate</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Disc</th>
                  <th>Disc Amount</th>
                  <th>Net Amount</th>
                  <th>Emerg</th>
                  <th>Vacutainer</th>
                  <th>Emer Amt</th>
                  <th>Pkg Name</th>
                  <th>Doctor %</th>
                  <th>Doc share Amt</th>
                  {/* <th>To Hospital</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>BHS001</td>
                  <td>Basic Health Service</td>
                  <td>5000</td>
                </tr>
                <tr>
                  <td>BHS002</td>
                  <td>Advanced Health Service</td>
                  <td>8000</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "tariff":
        // Existing tariff table rendering
        return (
          <div className="services-table">
            <table>
              <thead>
                <tr>
                  <th>Service Type</th>
                  <th>Pay Type</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Consultation</td>
                  <td>Flat Rate</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>Procedure</td>
                  <td>Per Hour</td>
                  <td>5000</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="operation-master">
      <div className="iPBilling-title-bar">
        <div className="iPBilling-header">
          <span>IP Billing</span>
        </div>
      </div>
      <div className="iPBilling-content-wrapper">
        <div className="iPBilling-main-section">
          <div className="iPBilling-panel operation-details">
            <div className="iPBilling-panel-content">
              <div className="iPBilling-form-row">
                <label>Order Prescid:</label>
                <input type="text" />
              </div>
            </div>
            <div className="iPBilling-panel-header">Patient Details</div>
            <div className="iPBilling-panel-content">
              <div className="iPBilling-form-row">

              {/* <ul>
        {patientData.map((patient) => (
          <li key={patient.id}>{patient.firstName} {patient.lastName}</li>
        ))}
      </ul> */}
                <label>IP No: * </label>
                <div className="iPBilling-input-with-search">
                  <input type="text" value={patientData.ipAdmmissionId} />
                  <CiSearch />
                </div>
              </div>
              <div className="iPBilling-form-row">
                <label>MR No: *</label>
                <div className="iPBilling-input-with-search">
                  <input type="text" value={patientData.patient.inPatientId} />
                  <CiSearch />
                </div>
              </div>
              <div className="iPBilling-form-row">
                <label>Name Initial:</label>
                <input type="text" value={patientData.patient.salutation} />
                {/* <select>
                  <option>Mr</option>
                </select> */}
              </div>
              <div className="iPBilling-form-row">
                <label>Patient Name:</label>
                <input type="text" value={`${patientData.patient.firstName } ${patientData.patient.lastName}`}  />
              </div>
              <div className="iPBilling-form-row">
                <label>Age:</label>
                <input type="text" value={patientData.patient.age} />
              </div>
              <div className="iPBilling-form-row">
                <label>Gender:</label>
                <select value={patientData.patient.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div> 
              <div className="iPBilling-form-row">
                <label>Relation:</label>
                  <input type="text" value={patientData.patient.guarantorDTO.relationWithPatient} />
              </div>
              <div className="iPBilling-form-row">
                <label>Relative Name:</label>
                <input type="text" value={patientData.patient.guarantorDTO.guarantorName}/>
              </div>
              <div className="iPBilling-form-row">
                <label>Address:</label>
                <input type="text" value={patientData.patient.address} />
              </div>
              <div className="iPBilling-form-row">
                <label>Area/Village: *</label>
                <div className="iPBilling-input-with-search">
                  <input type="text" value={`${patientData.patient.addressDTO.street1} \ ${patientData.patient.addressDTO.street2}`} />
                  <CiSearch />
                </div>
              </div>
              <div className="iPBilling-form-row">
                <label>City/District: *</label>
                <div className="iPBilling-input-with-search">
                  <input type="text" value={patientData.patient.addressDTO.city} />
                  <CiSearch />
                </div>
              </div>
              <div className="iPBilling-form-row">
                <label>State: *</label>
                <div className="iPBilling-input-with-search">
                  <input type="text" value={patientData.patient.state} />
                  <CiSearch />
                </div>
              </div>
            </div>
          </div>
          <div className="iPBilling-panel operation-details">
            <div className="iPBilling-panel-content">
              <div className="iPBilling-form-row">
                <label>Mobile No:</label>
                <input type="text" value={patientData.patient.phoneNumber} />
              </div>
              <div className="iPBilling-form-row">
                <label>Type:</label>
                <select>
                  <option>Hospital</option>
                </select>
              </div>
              <div className="iPBilling-form-row">
                <label>Insurance: *</label>
                <div className="iPBilling-input-with-search">
                  <input type="text" />
                  <CiSearch />
                </div>
              </div>
              <div className="iPBilling-form-row">
                <label>Bed No: *</label>
                <div className="iPBilling-input-with-search">
                  <input type="text" value={patientData.roomDetails.bedDTO.bedNo} />
                  <CiSearch />
                </div>
              </div>
              <div className="iPBilling-form-row">
                <label>Referred By: *</label>
                <div className="iPBilling-input-with-search">
                  <input type="text" value={patientData.organisationDetail.referredBy} />
                  <CiSearch />
                </div>
              </div>
              <div className="iPBilling-form-row">
                <label>Consultant Dr:</label>
                <input type="text" value={patientData.admissionUnderDoctorDetail.consultantDoctor.doctorName} />
              </div>
              <div className="iPBilling-form-row">
                <label>Admission Date:</label>
                <input type="date" value={patientData.admissionDate} />
              </div>
              <div className="iPBilling-form-row">
                <label>Admission Time:</label>
                <input type="time" value={patientData.admissionTime} />
              </div>
              <div className="iPBilling-form-row">
                <label>Pay Type: *</label>
                <div className="iPBilling-input-with-search">
                  <input type="text"  value={patientData.roomDetails.payTypeDTO.payTypeName}/>
                  <CiSearch />
                </div>
              </div>
              <div className="iPBilling-form-row">
                <label>Bill Date:</label>
                <input type="date" />
              </div>
              <div className="iPBilling-form-row">
                <label>Bill No:</label>
                <input type="text" />
              </div>
              <div className="iPBilling-form-row">
                <label>Loc Bill No:</label>
                <input type="text" />
              </div>
              <div className="iPBilling-form-row">
                <label> BillingUser:</label>
                <input type="text" />
              </div>
              <div className="iPBilling-form-row">
                <label>Timing:</label>
                <select>
                  <option>Mornig</option>
                </select>
              </div>
              <div className="iPBilling-form-row-chechbox">
                <input type="checkbox" id="allowMultiple" />
                <label
                  htmlFor="allowMultiple"
                  className="iPBilling-checkbox-label"
                >
                  Inv Package
                </label>
              </div>
            </div>
          </div>
          {/* <div className="iPBilling-panel dis-templates">
            <div className="iPBilling-panel-header">Multiple Service Entry</div>
            <div className="iPBilling-panel-content">
              <div className="iPBilling-form-row-chechbox">
                <input type="checkbox" id="excludeRef" />
                <label htmlFor="excludeRef">Multiple Doctor Visits</label>
              </div>
              <div className="iPBilling-form-row">
                <label>Transportation:</label>
                <select>
                  <option></option>
                </select>
              </div>

              <div className="iPBilling-form-row">
                <label>Remark:</label>
                <textarea name="" id=""></textarea>
              </div>
              <div className="iPBilling-form-row">
                <label>Physiotherpy:</label>
                <select>
                  <option>Evening</option>
                </select>
              </div>

              <div className="iPBilling-form-row">
                <label>Emergflg:</label>
                <input type="text" />
              </div>
            </div>
          </div> */}
        </div>

        <div className="iPBilling-services-section">
          <div className="iPBilling-tab-bar">
            <button
              className={`iPBilling-tab ${
                selectedTab === "testGrid" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("testGrid")}
            >
              Test Grid
            </button>
            <button
              className={`iPBilling-tab ${
                selectedTab === "services" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("services")}
            >
              Previous Test Details
            </button>
            <button
              className={`iPBilling-tab ${
                selectedTab === "bhs" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("bhs")}
            >
              Previous Cancelled Test Details
            </button>
          </div>

          {/* Dynamically render tables based on selected tab */}
          {renderTable()}
        </div>
        <div className="iPBilling-action-buttons">
          <button className="btn-blue" onClick={handleSaveData}>Save</button>
          <button className="btn-red">Delete</button>
          <button className="btn-orange">Clear</button>
          <button className="btn-gray">Close</button>
          <button className="btn-blue">Search</button>
          <button className="btn-gray">Tracking</button>
          <button className="btn-green">Print</button>
          {/* <button className="btn-blue">Export</button>
          <button className="btn-gray">Import</button>
          <button className="btn-green">Health</button>
          <button className="btn-gray">Version Comparison</button>
          <button className="btn-gray">SDC</button>
          <button className="btn-gray">Testing</button>
          <button className="btn-blue">Info</button> */}
        </div>
      </div>
      {/* {activePopup && (
        <ServicesPopup
        columns={columns}
        data={data}
        onSelect={handleSelect}
        onClose={() => setActivePopup(null)}
        />
      )} */}
    </div>
  );
};

export default IPBilling;

// AjharTamboli 20-11-24 iPBilling.jsx
