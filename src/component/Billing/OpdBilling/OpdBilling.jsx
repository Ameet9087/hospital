import React, { useState, useRef, useEffect } from 'react';
import './OpdBilling.css'
import PopupTable from './PopupTable';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import { API_BASE_URL } from '../../api/api';
import axios from 'axios';

const OpdBilling = () => {
  const [opdPatients, setOpdPatients] = useState([]);
  const [selectedTab, setSelectedTab] = useState('services');
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [advancesTableRows, setAdvancesTableRows] = useState([]);
  const [activePopup, setActivePopup] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [serviceDetails, setServiceDetails] = useState([]);
const [selectedService, setSelectedService] = useState([]);
  const [fileName, setFileName] = useState("No file chosen")
  const [overallDiscPercent, setOverallDiscPercent] = useState(0);
  const [overallDiscAmt, setOverallDiscAmt] = useState(0);
  const [finalDiscountAmt, setFinalDiscountAmt] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0); // For Less Disc% on total
const [totalAmount, setTotalAmount] = useState(0); // For Total Amt
const [discountAmount, setDiscountAmount] = useState(0); // For Less Disc Amt
const [netAmount, setNetAmount] = useState(0); 
const [appointments, setAppointments] = useState([]);
  const identification = "someValue"; 
  const [formData,setFormData] = useState({
    "patientCategory": "",
    "finanacialDetails": "",
    "patientType": "",
    "totalAmount": "",
    "financialDiscAmt": "",
    "paidAmt": "",
    "creditAmt": "",
    "currBalance": "",
    "discReason": "",
    "discAuthorization": "",
    "remarks": "",
    "lastConsultDoctor": "",
    "lastConsultDate": "",
    "lastConsultFee": "",
    "opBalanceAmount": ""
  }
  )

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "No file chosen");
  };


  
  // State to manage table rows
 const [testGridTableRowsableRows, setTestGridTableRowsableRows] = useState([
  { sn:1, code: '', serviceName: '', doctorName: '', rate: '', qty: '', totalAmt: '', lessDisc: '', discAmt: '', netAmt: '', emerg: '', emergAmt: '' },
]);
const [identificationTableRows, setIdentificationTableRows] = useState([
  { sn: 1, Date: '', dCode: '' },
]);

useEffect(() => {
  // Calculate the total amount from all rows
  const total = testGridTableRowsableRows.reduce(
    (acc, row) => acc + (row.totalAmt || 0),
    0
  );
  setTotalAmount(total);

  // Calculate the discount and net amount
  const discount = (total * discountPercentage) / 100;
  setDiscountAmount(discount);
  setNetAmount(total - discount);
}, [testGridTableRowsableRows, discountPercentage]);



const handleOverallDiscountPercentChange = (e) => {
    const percent = parseFloat(e.target.value) || 0;
    setOverallDiscPercent(percent);

    setTestGridTableRowsableRows((prevRows) => {
      let totalDiscount = 0;
      const updatedRows = prevRows.map((row) => {
        const discAmt = (row.totalAmt * percent) / 100;
        totalDiscount += discAmt;
        return {
          ...row,
          lessDisc: percent,
          discAmt,
          netAmt: row.totalAmt - discAmt,
        };
      });
      setFinalDiscountAmt(totalDiscount);
      return updatedRows;
    });
  };

  const handleOverallDiscountAmountChange = (e) => {
    const amount = parseFloat(e.target.value) || 0;
    setOverallDiscAmt(amount);

    setTestGridTableRowsableRows((prevRows) => {
      const totalAmt = prevRows.reduce((sum, row) => sum + row.totalAmt, 0);
      const percent = (amount / totalAmt) * 100;

      const updatedRows = prevRows.map((row) => {
        const discAmt = (row.totalAmt * percent) / 100;
        return {
          ...row,
          lessDisc: percent,
          discAmt,
          netAmt: row.totalAmt - discAmt,
        };
      });
      setFinalDiscountAmt(amount);
      setOverallDiscPercent(percent);
      return updatedRows;
    });
  };

  
  const [paymentDetailsTableRows, setpaymentDetailsTableRows] = useState([{
    sn: 1,
    head: "",
    amount: ""
  }]);
  // Function to delete a row from the appropriate table
  const handleDeleteRow = (type, index) => {
  if (type === 'package') {
    setTestGridTableRowsableRows((prevRows) =>
      prevRows.filter((_, rowIndex) => rowIndex !== index)
    );
  } else if (type === 'identification') {
    setIdentificationTableRows((prevRows) =>
      prevRows.filter((_, rowIndex) => rowIndex !== index)
    );
  }
};


  useEffect(() => {
    fetchOpdData();
  }, []);

  const getPopupData = () => {
    if (activePopup === "patient") {
      return { columns: ["uhid", "firstName", "lastName"], data: opdPatients };
    }
    else if (activePopup === "services") {
        return { columns: ["serviceName", "rates"], data: serviceDetails };
      } 
    else if (activePopup === "mobilenumber") {
      return { columns: ["outPatientId", "phoneNumber"], data: opdPatients };
    } else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();



const handleSelect = async (data) => {
    if (activePopup === "patient" || activePopup === "mobilenumber") {
      setSelectedPatient(data);
      console.log("Selected patient:", data);
    
      try {
        // Fetch appointments based on the selected patient and use the returned data
        const fetchedAppointments = await fetchAppointmentsByOutPatientId(data.outPatientId);
        console.log("Appointments fetched:", fetchedAppointments);
    
        if (fetchedAppointments && fetchedAppointments.length > 0) {
          const doctorId = fetchedAppointments[0].addDoctor?.doctorId;
          if (doctorId) {
            console.log("Doctor ID:", doctorId);
    
            // Fetch doctor details using the doctorId
            const doctorDetails = await fetchDoctorDetails(doctorId);
            
    
            if (doctorDetails) {
              const generalOpdFee = doctorDetails.orgDoctorFees?.[0]?.generalOpdFee || "N/A";
              console.log("Fetched Doctor Details:", doctorDetails);
    
              // Prepare the new row
              const newRow = {
                sn: 0, // This will be dynamically set
                serviceType: "",
                code: "",
                serviceName: "Consultation",
                doctorName: doctorDetails.doctorName,
                rate: generalOpdFee,
                qty: 1,
                totalAmt: generalOpdFee,
                lessDisc: "",
                discAmt: "",
                netAmt: generalOpdFee,
                emerg: "",
                emergAmt: "",
              };
            
              setTestGridTableRowsableRows((prevRows) => {
                // Find an empty row to update
                const emptyRowIndex = prevRows.findIndex(
                  (row) => !row.code && !row.serviceName && !row.doctorName
                );
            
                if (emptyRowIndex !== -1) {
                  // Update the existing empty row
                  const updatedRows = [...prevRows];
                  updatedRows[emptyRowIndex] = {
                    ...updatedRows[emptyRowIndex],
                    ...newRow, // Update only the necessary fields
                    sn: updatedRows[emptyRowIndex].sn || emptyRowIndex + 1, // Preserve the serial number
                  };
                  console.log("Updated existing empty row:", updatedRows);
                  return updatedRows;
                }
            
                // If no empty row, add a new row
                const updatedRows = [
                  ...prevRows,
                  {
                    ...newRow,
                    sn: prevRows.length + 1, // Set the serial number
                  },
                ];
                console.log("Added a new row:", updatedRows);
                return updatedRows;
              });
            } else {
              console.error("Doctor details not found");
            }
          } else {
            console.error("Doctor ID not found in appointment");
          }
        } else {
          console.error("No appointments found for the patient");
        }
      } catch (error) {
        console.error("Error in handleSelect:", error);
      }
    }
     else if (activePopup === "services") {
      setSelectedService(data);
  
      setTestGridTableRowsableRows((prevRows) => {
        // Find an empty row to update
        const emptyRowIndex = prevRows.findIndex(
          (row) => !row.code && !row.serviceName
        );
  
        if (emptyRowIndex !== -1) {
          // Update the existing empty row
          const updatedRows = [...prevRows];
          updatedRows[emptyRowIndex] = {
            ...updatedRows[emptyRowIndex],
            code: data.serviceCode,
            serviceName: data.serviceName,
            doctorName: "",
            rate: data.rates[0] || "",
            qty: 1,
            totalAmt: data.rates[0] || "",
            lessDisc: "",
            discAmt: "",
            netAmt: data.rates[0] || "",
            emerg: "",
            emergAmt: "",
          };
          return updatedRows;
        }
  
        // If no empty row, add as a new row
        return [
          ...prevRows,
          {
            sn: prevRows.length + 1,
            code: data.serviceCode,
            serviceName: data.serviceName,
            doctorName: "",
            rate: data.rates[0] || "",
            qty: 1,
            totalAmt: data.rates[0] || "",
            lessDisc: "",
            discAmt: "",
            netAmt: data.rates[0] || "",
            emerg: "",
            emergAmt: "",
          },
        ];
      });
      console.log("selected service++++++++++++", selectedService);
    } else if (activePopup === "mobilenumber") {
      setSelectedPatient(data);
    }
  
    console.log("Selected Data:", data);
    setActivePopup(null); // Close the popup after selection
  };

const fetchDoctorDetails = async (doctorId) => { 
    console.log("Fetching doctor details", doctorId);
    try {
      const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch doctor details');
      }
      const doctorData = await response.json();
      setSelectedDoctor(doctorData || 'N/A');
      return doctorData; // Explicitly return the fetched data
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      return null; // Return null in case of an error
 }
 };


const fetchAppointmentsByOutPatientId = async (outPatientId) => {
    console.log('Fetching appointment id: ' + outPatientId);
    try {
      const response = await axios.get(`${API_BASE_URL}/appointments/outpatient/list/${outPatientId}`);
      console.log("Fetched Appointments:", response.data);
      setAppointments(response.data); // Update the state
      return response.data; // Explicitly return the data
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return []; // Return an empty array on error
 }
};

const handleAddRow = (type) => {
  if (type === 'package') {
    setTestGridTableRowsableRows((prevRows) => [
      ...prevRows,
      {
        sn: prevRows.length + 1,
        code: '',
        serviceName: '',
        doctorName: '',
        rate: '',
        qty: '',
        totalAmt: '',
        lessDisc: '',
        discAmt: '',
        netAmt: '',
        emerg: '',
        emergAmt: '',
      
      },
    ]);
  } else if (type === 'identification') {
    setIdentificationTableRows((prevRows) => [
      ...prevRows,
      {
        sn: prevRows.length + 1,
        Date: '',
        dCode: '',
      },
    ]);
  }
};


  const fetchAllBedsAndRoomByPaytype = async (id) => {
    const response = await axios.get(
      `${API_BASE_URL}/rooms/available-by-paytype/${id}`
    );
    return response.data;
  };
  const fetchOpdData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/out-patient`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setOpdPatients(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServiceDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/service-details/sorted-map`);
      if (!response.ok) {
        throw new Error("Failed to fetch service details");
      }
      const data = await response.json();
      setServiceDetails(data); // Store the fetched data in state
    } catch (error) {
      console.error("Error fetching service details:", error);
      setError(error.message); // Set error message in state
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/doctors`);
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        const data = await response.json();
        setDoctors(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
    fetchServiceDetails();
  }, []);

  const renderTable = () => {
    switch (selectedTab) {
      case 'testGrid':
        return (
          <div className="services-table">
            <table ref={tableRef}>
              <thead>
                <tr >
                  {[
                    "Actions",
                    "SN",
                    "Service Type",
                    "Code",
                    "Service Name",
                    "Doctor Name ",
                    "Rate",
                    "Qty",
                    "Total Amt",
                    "Less Disc(%)",
                    "Disc Amt",
                    "Net Amt",
                    "Emerg",
                    "Emerg Amt",
                  

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
  {testGridTableRowsableRows.map((row, index) => (
    <tr key={index}>
      <td>
        <div className="table-actions">
          <button
            className="billing-opd-com-add-btn"
            onClick={() => handleAddRow("package")}
          >
            Add
          </button>
          <button
            className="billing-opd-com-del-btn"
            onClick={() => handleDeleteRow("package", index)}
            disabled={testGridTableRowsableRows.length <= 1}
          >
            Del
          </button>
        </div>
      </td>
      <td>{row.sn}</td>
      <td>
        <input type="text" />
        <button
          className="billing-opd-com-magnifier-btn"
          onClick={() => setActivePopup("services")}
        >
          🔍
        </button>
      </td>
      <td>{row.code}</td>
      <td>{row.serviceName}</td>
      <td>{row.doctorName}</td>
      <td>{row.rate}</td>
      <td>
        <input
          type="number"
          value={row.qty}
          onChange={(e) => {
            const qty = parseInt(e.target.value, 10) || 0;
            setTestGridTableRowsableRows((prevRows) => {
              const updatedRows = [...prevRows];
              updatedRows[index].qty = qty;
              updatedRows[index].totalAmt = (row.rate || 0) * qty;
              updatedRows[index].netAmt =
                updatedRows[index].totalAmt -
                (updatedRows[index].discAmt || 0);
              return updatedRows;
            });
          }}
        />
      </td>
      <td>{row.totalAmt}</td>
      <td>
        <input
          type="number"
          value={row.lessDisc || 0}
          onChange={(e) => {
            const lessDisc = parseFloat(e.target.value) || 0;
            setTestGridTableRowsableRows((prevRows) => {
              const updatedRows = [...prevRows];
              updatedRows[index].lessDisc = lessDisc;
              updatedRows[index].discAmt =
                (updatedRows[index].totalAmt * lessDisc) / 100;
              updatedRows[index].netAmt =
                updatedRows[index].totalAmt -
                updatedRows[index].discAmt;
              return updatedRows;
            });
          }}
        />
      </td>
      <td>
        <input
          type="number"
          value={row.discAmt || 0}
          readOnly
        />
      </td>
      <td>{row.netAmt}</td>
      <td>{row.emerg}</td>
      <td>{row.emergAmt}</td>
    </tr>
  ))}
              </tbody>
            </table>
             
            <div className="billing-opd-com-summary-section">
              <div className="billing-opd-com-summary-row">
                <div className="billing-opd-com-summary-field">
                  <label>Less Disc% On All Services:</label>
                  <input
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(parseFloat(e.target.value) || 0)}
          />
                </div>
                <div className="billing-opd-com-summary-field">
                  <label> Less Disc Amt on All Services :</label>
                            <input type="number" value={discountAmount} readOnly />

                </div>
              </div>
            </div>
          </div>
        );
      case 'paymentDetails':
        return (
          <div className="services-table">
            <table ref={tableRef}>
              <thead>
                <tr>{[

                  "SN",
                  "Head",
                  "Amount"
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
                {paymentDetailsTableRows.map((row, index) => (
                  <tr key={index}>

                    <td>{row.sn}</td>
                    <td>{row.head}</td>
                    <td>{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'identification':
        return (
          <div className="services-table">
            <table ref={tableRef}>
              <thead>
                <tr>{[
                  "Actions",
                  "SN",
                  "Id No",
                  "Id Name"
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
                {identificationTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="billing-opd-com-add-btn"
                          onClick={() => handleAddRow('identification')}
                        >
                          Add
                        </button>
                        <button
                          className="billing-opd-com-del-btn"
                          onClick={() => handleDeleteRow('identification', index)}
                          disabled={identificationTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.Date}</td>
                    <td>{row.dCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="billing-opd-com-Events">
      <div className="billing-opd-com-title-bar">
        <div className="billing-opd-com-header">
          <span>OPD Billing </span>
        </div>
      </div>
      <div className="billing-opd-com-content-wrapper">
        <div className="billing-opd-com-main-section">
          <div className="billing-opd-com-panel dis-templates">

            <div className="billing-opd-com-panel-content">
              <div className="billing-opd-com-form-row">
                <label>Mobile No:</label>
                <div className="billing-opd-com-input-with-search">
                  <input type="text" value={selectedPatient?.phoneNumber} />
                  <button className="billing-opd-com-magnifier-btn" onClick={() => setActivePopup("mobilenumber")}>🔍</button>
                </div>
              </div>
            </div>
            <div className="billing-opd-com-panel-header">Patient Details</div>
            <div className="billing-opd-com-panel-content">
              <div className="billing-opd-com-form-row">
                <label htmlFor="patientCategory">Patient Category: </label>
                <select id="patientCategory"  className="billing-opd-com-patient-category" name='patientCategory' value={formData.patientCategory} onChange={handleChange}>
                  <option value="IPD">IPD</option>
                  <option value="OPD">OPD</option>
                </select>
              </div>

              <div className="billing-opd-com-form-row">
                <label htmlFor="patientCategory">Category Counter: </label>
                <select id="patientCategory" className="billing-opd-com-patient-category">
                  <option value="general">Private OPD</option>
                  <option value="private">General OPD</option>

                </select>
              </div>
              <div className="billing-opd-com-form-row">
                <label>Patient Type: </label>

                <select id="patientType" className="billing-opd-com-patient-category" name='patientType' value={formData.patientCategory} onChange={handleChange}>
                  <option value="Old Patient">Old Patient</option>
                  <option value="New Patient">New Patient</option>

                </select>
              </div>

              <div className="billing-opd-com-form-row">
                <label>Employee:</label>
                <input type="checkbox" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>MR No:<span className="billing-opd-required">*</span>
                </label>
                <div className="billing-opd-com-input-with-search">
                  <input type="text" value={selectedPatient?.uhid} />
                  <button className="billing-opd-com-magnifier-btn" onClick={() => setActivePopup("patient")}>🔍</button>
                </div>
              </div>

              <div className="billing-opd-com-form-row">
                <label>Name Initial:<span className="billing-opd-required">*</span>
                </label>
                <select value="" className="name-initial-select">
                  <option value="" disabled>Select</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                </select>
              </div>


              <div className="billing-opd-com-form-row">
                <label>F Name:<span className="billing-opd-required">*</span>
                </label>
                <input type="text" value={selectedPatient?.firstName} />
              </div>
              <div className="billing-opd-com-form-row">
                <label>M Name:</label>
                <input type="text" value={selectedPatient?.middleName} />

              </div>
              <div className="billing-opd-com-form-row">
                <label>L Name:</label>
                <input type="text" value={selectedPatient?.lastName} />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Gender:<span className="billing-opd-required">*</span>
                </label>
                <select value={selectedPatient?.gender} className="name-initial-select">
                  <option value="" disabled>Select</option>
                  <option value="Mr.">Male</option>
                  <option value="Mrs.">Femal.</option>
                  <option value="Ms.">Other</option>

                </select>
              </div>


              <div className="billing-opd-com-form-row">
                <label>Material Status:<span className="billing-opd-required">*</span>
                </label>
                <select value="Male" className="material-status-select">
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              <div className="billing-opd-com-form-row">
                <label>Relation:<span className="billing-opd-required">*</span>
                </label>
                <select value={selectedPatient?.relationWithPatient} className="relation-select">
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="billing-opd-com-form-row">
                <label>RelativeName:<span className="billing-opd-required">*</span>
                </label>
                <input type="text" value={selectedPatient?.careOfPerson} />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Age:</label>
                <input type="text" value={selectedPatient?.age} />

              </div>
              <div className="billing-opd-com-form-row">
                <label>Address:<span className="billing-opd-required">*</span>
                </label>
                <input type="text" value={selectedPatient?.address} />

              </div>


            </div>






          </div>

          {activePopup && (
            <PopupTable
              columns={columns}
              data={data}
              onSelect={handleSelect}
              onClose={() => setActivePopup(false)}
            />
          )}
          <div className="billing-opd-com-panel operation-details">
            <div className="billing-opd-com-panel-content">

              <div className="billing-opd-com-form-row">
                <label>City/Village: </label>
                <div className="billing-opd-com-input-with-search">

                  <input type="text" value={selectedPatient?.address} />

                  
                </div>
              </div>
              <div className="billing-opd-com-form-row">
                <label>PinCode:<span className="billing-opd-required">*</span>
                </label>
                <div className="billing-opd-com-input-with-search">

                  <input type="text"  value={selectedPatient?.zipCode} />
                  
                </div>
              </div>
              <div className="billing-opd-com-form-row">
                <label>Country: </label>
                <div className="billing-opd-com-input-with-search">


                  <input type="text" value="" />

                  
                </div>
              </div>
              <div className="billing-opd-com-form-row">
                <label>Nationality: </label>
                <div className="billing-opd-com-input-with-search">


                  <input type="text" value="" />
                
                </div>
              </div>
              <div className="billing-opd-com-form-row">
                <label>Source Of Registration:</label>
                <input type="text" value="" />
              </div>

              <div className="billing-opd-com-form-row">
                <label>Mobile No:<span className="billing-opd-required">*</span>
                </label>
                <input type="text" value={selectedPatient?.phoneNumber} />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Phone:</label>
                <input type="text" value={selectedPatient?.alternateNumber} />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Email Id:<span className="billing-opd-required">*</span>
                </label>
                <input type="text" value={selectedPatient?.email} />
              </div>
              {/* <div className="billing-opd-com-form-row">
                <label>Type:<span className="billing-opd-required">*</span>
                </label>
                <input type="text" value="" />
              </div> */}

              <div className="billing-opd-com-form-row">
                <label>Doctor Name:<span className="billing-opd-required">*</span>
                </label>
                <div className="billing-opd-com-input-with-search">
                <select
          name="admittedDoctor"
          className="create-admission-form-input"
          onChange={handleChange}
          value={selectedDoctor}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.employeeId} value={doctor.employeeId}>
              {doctor.salutation} {doctor.doctorName} {doctor.lastName}
            </option>
          ))}
        </select>
                  <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
              </div>
              <div className="billing-opd-com-form-row">
                <label>Referral Type:</label>
                <select>
                  <option value="walkin">Walk in</option>
                  <option value="website">Website</option>
                  <option value="other">other</option>

                </select>
              </div>
            </div>
          </div>
          <div className="billing-opd-com-panel operation-details">
            {/* <div className="billing-opd-com-panel-header">Surgery Details</div>  */}
            <div className="billing-opd-com-panel-content">
              <div className="billing-opd-com-form-row">
                <label>Referred Dr:<span className="billing-opd-required">*</span>
                </label>
                <div className="billing-opd-com-input-with-search">
                  <input type="text" 
                  name="referredDoctor"
                  value={formData.referredDoctor}
                  onChange={handleChange} />
                  {/* <button className="billing-opd-com-magnifier-btn">🔍</button> */}
                </div>
              </div>
              <div className="billing-opd-com-form-row">
                <label>Bill No:</label>
                <input type="text"  name="billNo"
                  value={formData.billNo}
                  onChange={handleChange} />
              </div>
              <div className="billing-opd-com-form-row">
                <label>NonRegular DoctorNM:</label>
                <input type="text" name='nonregulardctorname'
                value={formData.nonregulardctorname}
                onChange={handleChange} />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Package:</label>
                <input type="checkbox" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Pkg Type:</label>
                <select id="patientCategory" className="billing-opd-com-patient-category">
                  <option value="general"> OPD Package</option>
                  <select id="patientCategory" className="billing-opd-com-patient-category">
                    <option value="general">Private OPD</option>
                    <option value="private">Other</option>
                  </select>
                </select>
                </div>
             
              <div className="billing-opd-com-form-row">
                <label>Old Mrno:</label>
                <input type="text"name='oldmrno'
                value={formData.oldmrno}
                onChange={handleChange}/>
              </div>
              <div className="billing-opd-com-form-row">
                <label>Empdiscountpolicy:</label>
                <input type="text" name='Empdiscountpolicy'
                value={formData.Empdiscountpolicy}
                onChange={handleChange} />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Diagnosis:</label>
                <input type="text" name='diagnosis'
                value={formData.diagnosis}
                onChange={handleChange} />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Last Consulta:</label>
                <input type="text" name='lastconsult'
                value={formData.lastconsult}
                onChange={handleChange} />
              </div>
            </div>
          </div>
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
                selectedTab === "paymentDetails" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("paymentDetails")}
            >
              Payment Details
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
        <div className="billing-opd-com-main-section">
          <div className="billing-opd-com-panel dis-templates">

            <div className="billing-opd-com-panel-header">Financial Details</div>
            <div className="billing-opd-com-panel-content">
              <div className="billing-opd-com-form-row">
                <label>Total Amt:<span className="billing-opd-required">*</span>
                </label>
                <input type="text" value={totalAmount} readOnly />
              </div>
              <div className="billing-opd-com-form-row">
                <label> Final Disc Amt: </label>
                 <input type="text" value={discountAmount} readOnly />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Net Amt:</label>
                          <input type="text" value={netAmount} readOnly />

              </div>
              <div className="billing-opd-com-form-row">
                <label>Paid Amt:</label>
                <input type="text" value="" name='paidAmt' onChange={handleChange} />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Credit Amt:</label>
                <input type="text" value="0" name='creditAmt' onChange={handleChange} />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Curr Balance :</label>
                <input type="text" value="0.00" name='currBalance' onChange={handleChange} />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Disc Reason:<span className="billing-opd-required">*</span>
                </label>
                <div className="billing-opd-com-input-with-search">
                  <input type="text" name='discReason' value={handleChange} />
                </div>
              </div>
              <div className="billing-opd-com-form-row">
                <label>Disc Authorization:<span className="billing-opd-required">*</span>
                </label>
                <div className="billing-opd-com-input-with-search">
                  <input type="text" name='discAuthorization' value={handleChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="billing-opd-com-panel operation-details">
            <div className="billing-opd-com-panel-content">

              <div className="billing-opd-com-form-row">
                <label>Remarks:<span className="billing-opd-required">*</span>
                </label> 
                <input type="text" name='remarks' value={handleChange} />
              </div>
              <div className="billing-opd-com-form-row">
                <label>OP Bal Amt :</label>
                <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Appt No :</label>
                <div className="billing-opd-com-input-with-search">
                  <input type="text" value="" />
                  <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
              </div>
            </div>
          </div>
         
          <div className="billing-opd-com-panel operation-details">
            <div className="billing-opd-com-panel-header"></div>
            <div className="billing-opd-com-panel-content">

              <div className="billing-opd-com-form-row">
                <label>Appt Date:</label>
                <select>

                  <option value="Other">Other</option>
                </select>                      </div>
              <div className="billing-opd-com-form-row">
                <label>Employee Credit:</label>
                <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Employee Outstanding:</label>
                <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Current Discount Policy:</label>
                <div className="billing-opd-com-input-with-search">


                  <input type="text" value="" />
                  <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
              </div>
              <div className="billing-opd-com-form-row">
                <label>Total Doctor share Amount:</label>
                <input type="text" value="0.00" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Total To Hospital:</label>
                <input type="text" value="0.00" />
              </div>

              <div className="billing-opd-com-panel-header">Attach Mode</div>
              <div className="billing-opd-com-sh-section">
                <table ref={tableRef}>
                  <thead>
                    <tr>
                      {["SN", "Payment", "Amount", "Card Number", "ChqDt"].map((header, index) => (
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
                    {advancesTableRows.map((row, index) => (
                      <tr key={index}>
                        <td>{row.sn}</td>
                        <td>{row.payment}</td>
                        <td>{row.amount}</td>
                        <td>{row.cardNumber}</td>
                        <td>{row.chqdt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </div>
        <div className="billing-opd-com-action-buttons">
          <button className="btn-blue">Save</button>
        </div>
      </div>
    </div>
  );
};
export default OpdBilling;