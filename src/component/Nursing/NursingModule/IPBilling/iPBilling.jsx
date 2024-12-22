// AjharTamboli 22-11-24 iPBilling.jsx
import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { startResizing } from "../../../TableHeadingResizing/resizableColumns";
// import ServicesPopup from "../Services/services_popup";
import axios from "axios";

import "./IpBilling.css";
import { API_BASE_URL } from "../../../api/api";
const IPBilling = () => {
  const [selectedTab, setSelectedTab] = useState("services");
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate();
  const [services, setServices] = useState("");
  const ServiceHeading = ["serviceId", "serviceName", "serviceCode", "rate"];
  const [activePopup, setActivePopup] = useState("");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [previousBills, setPreviousBills] = useState([]); // State to hold API data

  const [serviceData, setServiceData] = useState([]); // Store fetched service data
  const [selectedService, setSelectedService] = useState(null); // Store the selected service
  const [serviceCode, setServiceCode] = useState(""); // Store the service code
  const [rate, setRate] = useState(0); // Store the rate

  const ServiceFetch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/totalservices`);
      console.log(response.data);
      setServiceData(response.data);
      console.log("---------", response.data); // Store the fetched service data
      // alert(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
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
        qty: 0, // Reset quantity when a new service is selected (optional)
      };

      // Update the row with the new values
      setServicesData((prevRows) =>
        prevRows.map((row, i) => (i === index ? updatedRow : row))
      );
    }
  };
  // Fetch data when component mounts
  const fetchPreviousBills = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/ipbillings/previous-bills/${patientData.ipAdmmissionId}`
      );
      setPreviousBills(response.data); // Update state with fetched data
      console.log("prevoius data", response.data);
    } catch (error) {
      console.error("Error fetching previous bills:", error);
    }
  };
  useEffect(() => {
    ServiceFetch();
    fetchPreviousBills();
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
    } else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();

  const patientData = useSelector((state) => state.patient?.patientData);

  console.log("--------Patient Data", patientData);

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
      ipAdmission: {
        ipAdmmissionId: patientData.ipAdmmissionId,
      },

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

    fetch(`${API_BASE_URL}/ipbillings`, {
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
          updatedRow.discAmount =
            (updatedRow.total * (updatedRow.disc || 0)) / 100;

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
    },
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
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Action",
                "SN",
                "Bill Date",
                "Bill Time",
                "Code",
                "Service Name",
                "Doctor Name",
                "Rate",
                "Qty",
                "Total",
                "Disc",
                "Disc Amount",
                "Net Amount",
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
            {servicesData.map((row, index) => (
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
                <td>
                  <input
                    type="date"
                    value={row.billDate || ""}
                    onChange={(e) =>
                      handleRowUpdate(row.sn, "billDate", e.target.value)
                    }
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={row.billTime || ""}
                    onChange={(e) =>
                      handleRowUpdate(row.sn, "billTime", e.target.value)
                    }
                    className="time-input"
                  />
                </td>
                <td>{row.code}</td>
                <td>
                  <select
                    onChange={(e) => handleServiceChange(e, index)}
                    value={row.serviceId || ""}
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
                    onChange={(e) =>
                      handleRowUpdate(row.sn, "rate", e.target.value)
                    }
                    style={{ width: "80px" }}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="qty"
                    value={row.qty || ""}
                    onChange={(e) =>
                      handleRowUpdate(row.sn, "qty", e.target.value)
                    }
                    style={{ width: "60px" }}
                  />
                </td>
                <td>{row.total || "0.00"}</td>
                <td>
                  <input
                    type="number"
                    name="disc"
                    value={row.disc || ""}
                    onChange={(e) =>
                      handleRowUpdate(row.sn, "disc", e.target.value)
                    }
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
  // -------------------------------------------------------------------PRevioustest detail-----------------------------------------------
  const renderTable = () => {
    switch (selectedTab) {
      case "services":
        // Existing package table rendering
        return (
          <div className="iPBilling-table">
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "SN",
                    "Bill Date",
                    "Bill Time",
                    "Code",
                    "Service Name",
                    "Doctor Name",
                    "Rate",
                    "Qty",
                    "Total",
                    "Disc",
                    "Disc Amount",
                    "Net Amount",
                    "Emerg",
                    "Vacutainer",
                    "Emer Amt",
                    "Pkg Name",
                    "Doctor %",
                    "Doc Share Amt",
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
                {previousBills.map((bill, index) => (
                  <tr key={bill.sn}>
                    <td>{index + 1}</td>
                    <td>{bill.billingDate || "N/A"}</td>
                    <td>{bill.billingTime || "N/A"}</td>
                    <td>{bill.code || "N/A"}</td>
                    <td>{bill.serviceName || "N/A"}</td>
                    <td>{bill.doctorName || "N/A"}</td>
                    <td>{bill.rate || "0.00"}</td>
                    <td>{bill.qty || "0"}</td>
                    <td>{bill.total || "0.00"}</td>
                    <td>{bill.disc || "0.00"}</td>
                    <td>{bill.discAmount || "0.00"}</td>
                    <td>{bill.netAmount || "0.00"}</td>
                    <td>{bill.emerg || "N/A"}</td>
                    <td>{bill.vacutainer || "N/A"}</td>
                    <td>{bill.emerAmt || "0.00"}</td>
                    <td>{bill.pkgName || "N/A"}</td>
                    <td>{bill.doctorPercentage || "0%"}</td>
                    <td>{bill.docShareAmt || "0.00"}</td>
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
            <table className="ipdreturnsward-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Action",
                    "SN",
                    "Bill Date",
                    "Bill Time",
                    "Code",
                    "Service Name",
                    "Doctor Name",
                    "Rate",
                    "Qty",
                    "Total",
                    "Disc",
                    "Disc Amount",
                    "Net Amount",
                    "Emerg",
                    "Vacutainer",
                    "Emer Amt",
                    "Pkg Name",
                    "Doctor %",
                    "Doc Share Amt",
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
                <tr>
                  <td>1</td>
                  <td>2024-12-15</td>
                  <td>10:30 AM</td>
                  <td>BHS001</td>
                  <td>Basic Health Service</td>
                  <td>Dr. John Doe</td>
                  <td>5000</td>
                  <td>1</td>
                  <td>5000</td>
                  <td>10%</td>
                  <td>500</td>
                  <td>4500</td>
                  <td>No</td>
                  <td>Yes</td>
                  <td>200</td>
                  <td>General Package</td>
                  <td>5%</td>
                  <td>225</td>
                  <td>0000000</td>
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
  // return (

  //   <div className="operation-master">
  //     <div className="iPBilling-title-bar">
  //       <div className="iPBilling-header">
  //         <span>IP Billing</span>
  //       </div>
  //     </div>
  //     <div className="iPBilling-content-wrapper">
  //       <div className="iPBilling-main-section">
  //         <div className="iPBilling-panel operation-details">
  //           <div className="iPBilling-panel-content">
  //             <div className="iPBilling-form-row">
  //               <label>Order Prescid:</label>
  //               <input type="text" />
  //             </div>
  //           </div>
  //           <div className="iPBilling-panel-header">Patient Details</div>
  //           <div className="iPBilling-panel-content">
  //             <div className="iPBilling-form-row">

  //             {/* <ul>
  //       {patientData.map((patient) => (
  //         <li key={patient.id}>{patient.firstName} {patient.lastName}</li>
  //       ))}
  //     </ul> */}
  //               <label>IP No: * </label>
  //               <div className="iPBilling-input-with-search">
  //                 <input type="text" value={patientData.ipAdmmissionId} />
  //                 <CiSearch />
  //               </div>
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>MR No: *</label>
  //               <div className="iPBilling-input-with-search">
  //                 <input type="text" value={patientData.ipAdmmissionId} />
  //                 <CiSearch />
  //               </div>
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Name Initial:</label>
  //               <input type="text" value={patientData.patient.salutation} />
  //               {/* <select>
  //                 <option>Mr</option>
  //               </select> */}
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Patient Name:</label>
  //               <input type="text" value={`${patientData.patient.firstName } ${patientData.patient.lastName}`}  />
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Age:</label>
  //               <input type="text" value={patientData.patient.age} />
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Gender:</label>
  //               <select value={patientData.patient.gender}>
  //                 <option value="Male">Male</option>
  //                 <option value="Female">Female</option>
  //               </select>
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Relation:</label>
  //                 <input type="text" value={patientData.patient.guarantorDTO.relationWithPatient} />
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Relative Name:</label>
  //               <input type="text" value={patientData.patient.guarantorDTO.guarantorName}/>
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Address:</label>
  //               <input type="text" value={patientData.patient.address} />
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Area/Village: *</label>
  //               <div className="iPBilling-input-with-search">
  //                 <input type="text" value={`${patientData.patient.addressDTO.street1} \ ${patientData.patient.addressDTO.street2}`} />
  //                 <CiSearch />
  //               </div>
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>City/District: *</label>
  //               <div className="iPBilling-input-with-search">
  //                 <input type="text" value={patientData.patient.addressDTO.city} />
  //                 <CiSearch />
  //               </div>
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>State: *</label>
  //               <div className="iPBilling-input-with-search">
  //                 <input type="text" value={patientData.patient.state} />
  //                 <CiSearch />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="iPBilling-panel operation-details">
  //           <div className="iPBilling-panel-content">
  //             <div className="iPBilling-form-row">
  //               <label>Mobile No:</label>
  //               <input type="text" value={patientData.patient.phoneNumber} />
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Type:</label>
  //               <select>
  //                 <option>Hospital</option>
  //               </select>
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Insurance: *</label>
  //               <div className="iPBilling-input-with-search">
  //                 <input type="text" />
  //                 <CiSearch />
  //               </div>
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Bed No: *</label>
  //               <div className="iPBilling-input-with-search">
  //                 <input type="text" value={patientData.roomDetails.bedDTO.bedNo} />
  //                 <CiSearch />
  //               </div>
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Referred By: *</label>
  //               <div className="iPBilling-input-with-search">
  //                 <input type="text" value={patientData.organisationDetail.referredBy} />
  //                 <CiSearch />
  //               </div>
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Consultant Dr:</label>
  //               <input type="text" value={patientData.admissionUnderDoctorDetail.consultantDoctor.doctorName} />
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Admission Date:</label>
  //               <input type="date" value={patientData.admissionDate} />
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Admission Time:</label>
  //               <input type="time" value={patientData.admissionTime} />
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Pay Type: *</label>
  //               <div className="iPBilling-input-with-search">
  //                 <input type="text"  value={patientData.roomDetails.payTypeDTO?.payTypeName}/>
  //                 <CiSearch />
  //               </div>
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Bill Date:</label>
  //               <input type="date" />
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Bill No:</label>
  //               <input type="text" />
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Loc Bill No:</label>
  //               <input type="text" />
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label> BillingUser:</label>
  //               <input type="text" />
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Timing:</label>
  //               <select>
  //                 <option>Mornig</option>
  //               </select>
  //             </div>
  //             <div className="iPBilling-form-row-chechbox">
  //               <input type="checkbox" id="allowMultiple" />
  //               <label
  //                 htmlFor="allowMultiple"
  //                 className="iPBilling-checkbox-label"
  //               >
  //                 Inv Package
  //               </label>
  //             </div>
  //           </div>
  //         </div>
  //         {/* <div className="iPBilling-panel dis-templates">
  //           <div className="iPBilling-panel-header">Multiple Service Entry</div>
  //           <div className="iPBilling-panel-content">
  //             <div className="iPBilling-form-row-chechbox">
  //               <input type="checkbox" id="excludeRef" />
  //               <label htmlFor="excludeRef">Multiple Doctor Visits</label>
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Transportation:</label>
  //               <select>
  //                 <option></option>
  //               </select>
  //             </div>

  //             <div className="iPBilling-form-row">
  //               <label>Remark:</label>
  //               <textarea name="" id=""></textarea>
  //             </div>
  //             <div className="iPBilling-form-row">
  //               <label>Physiotherpy:</label>
  //               <select>
  //                 <option>Evening</option>
  //               </select>
  //             </div>

  //             <div className="iPBilling-form-row">
  //               <label>Emergflg:</label>
  //               <input type="text" />
  //             </div>
  //           </div>
  //         </div> */}
  //       </div>

  //       <div className="iPBilling-services-section">
  //         <div className="iPBilling-tab-bar">
  //           <button
  //             className={`iPBilling-tab ${
  //               selectedTab === "testGrid" ? "active" : ""
  //             }`}
  //             onClick={() => setSelectedTab("testGrid")}
  //           >
  //             Test Grid
  //           </button>
  //           <button
  //             className={`iPBilling-tab ${
  //               selectedTab === "services" ? "active" : ""
  //             }`}
  //             onClick={() => setSelectedTab("services")}
  //           >
  //             Previous Test Details
  //           </button>
  //           <button
  //             className={`iPBilling-tab ${
  //               selectedTab === "bhs" ? "active" : ""
  //             }`}
  //             onClick={() => setSelectedTab("bhs")}
  //           >
  //             Previous Cancelled Test Details
  //           </button>
  //         </div>

  //         {/* Dynamically render tables based on selected tab */}
  //         {renderTable()}

  //       </div>
  //       <div className="iPBilling-action-buttons">
  //         <button className="btn-blue" onClick={handleSaveData}>Save</button>
  //         <button className="btn-red">Delete</button>
  //         <button className="btn-orange">Clear</button>
  //         <button className="btn-gray">Close</button>
  //         {/* <button className="btn-blue">Search</button>
  //         <button className="btn-gray">Tracking</button>
  //         <button className="btn-green">Print</button> */}
  //         {/* <button className="btn-blue">Export</button>
  //         <button className="btn-gray">Import</button>
  //         <button className="btn-green">Health</button>
  //         <button className="btn-gray">Version Comparison</button>
  //         <button className="btn-gray">SDC</button>
  //         <button className="btn-gray">Testing</button>
  //         <button className="btn-blue">Info</button> */}
  //       </div>
  //     </div>
  //     {/* {activePopup && (
  //       <ServicesPopup
  //       columns={columns}
  //       data={data}
  //       onSelect={handleSelect}
  //       onClose={() => setActivePopup(null)}
  //       />
  //     )} */}
  //   </div>
  // );

  return (
    <div className="operation-master">
      <div className="iPBilling-title-bar">
        {/* <div className="iPBilling-header">
          <span>IP Billing</span>
        </div> */}
        <div className="iPBilling-header">
          <span>IP Billing</span>
        </div>
      </div>
      <div className="iPBilling-content-wrapper">
        <div className="iPBilling-main-section">
          <div className="iPBilling-panel">
            <div className="iPBilling-panel-content">
              <div className="iPBilling-form-row">
                <label>Order Prescid:</label>
                <input type="text" />
              </div>
            </div>
            <div className="iPChangeRoom-panel-header">Patient Details</div>
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
                </div>
              </div>
              <div className="iPBilling-form-row">
                <label>Uhid: *</label>
                <div className="iPBilling-input-with-search">
                  <input type="text" value={patientData.patient?.uhid} />
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
                <input
                  type="text"
                  value={`${patientData.patient.firstName} ${patientData.patient.lastName}`}
                />
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
                <input
                  type="text"
                  value={patientData.patient.guarantorDTO.relationWithPatient}
                />
              </div>
              <div className="iPBilling-form-row">
                <label>Relative Name:</label>
                <input
                  type="text"
                  value={patientData.patient.guarantorDTO.guarantorName}
                />
              </div>
              <div className="iPBilling-form-row">
                <label>Address:</label>
                <input type="text" value={patientData.patient.address} />
              </div>
              <div className="iPBilling-form-row">
                <label>Area/Village: *</label>
                <div className="iPBilling-input-with-search">
                  <input
                    type="text"
                    value={`${patientData.patient.addressDTO.street1} \ ${patientData.patient.addressDTO.street2}`}
                  />
                </div>
              </div>
              <div className="iPBilling-form-row">
                <label>City/District: *</label>
                <div className="iPBilling-input-with-search">
                  <input
                    type="text"
                    value={patientData.patient.addressDTO.city}
                  />
                </div>
              </div>
              <div className="iPBilling-form-row">
                <label>State: *</label>
                <div className="iPBilling-input-with-search">
                  <input type="text" value={patientData.patient.state} />
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
                </div>
              </div>
              <div className="iPBilling-form-row">
                <label>Bed No: *</label>
                <div className="iPBilling-input-with-search">
                  <input
                    type="text"
                    value={patientData.roomDetails.bedDTO.bedNo}
                  />
                </div>
              </div>
              <div className="iPBilling-form-row">
                <label>Referred By: *</label>
                <div className="iPBilling-input-with-search">
                  <input
                    type="text"
                    value={patientData.organisationDetail.referredBy}
                  />
                </div>
              </div>
              <div className="iPBilling-form-row">
                <label>Consultant Dr:</label>
                <input
                  type="text"
                  value={
                    patientData.admissionUnderDoctorDetail.consultantDoctor
                      .doctorName
                  }
                />
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
                  <input
                    type="text"
                    value={patientData.roomDetails.payTypeDTO?.payTypeName}
                  />
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
            {/* <button
              className={`iPBilling-tab ${
                selectedTab === "bhs" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("bhs")}
            >
              Previous Cancelled Test Details
            </button> */}
          </div>

          {/* Dynamically render tables based on selected tab */}
          {renderTable()}
        </div>
        <div className="iPBilling-action-buttons">
          <button className="btn-blue" onClick={handleSaveData}>
            Save
          </button>
          <button className="btn-red">Delete</button>
          <button className="btn-orange">Clear</button>
          <button className="btn-gray">Close</button>
          {/* <button className="btn-blue">Search</button>
          <button className="btn-gray">Tracking</button>
          <button className="btn-green">Print</button> */}
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
