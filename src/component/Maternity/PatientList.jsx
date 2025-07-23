import React, { useState, useEffect, useRef } from 'react';
import "./PatientList.css";
import PaymentComponent from "./PaymentComponent";
import { startResizing } from '../TableHeadingResizing/resizableColumns';

// import PaymentComponent from "./PaymentComponent";

const PatientComponent = () => {
  const [showAllPatients, setShowAllPatients] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);
  const handleCheckboxChange = () => {
    setShowAllPatients(!showAllPatients);
    setShowPayment(false); // Hide the PaymentComponent when checkbox is toggled
  };

  const handleClosePayment = () => {
    setShowPayment(false); // Hide the PaymentComponent when closing
  };

   const handlePaymentClick = (patient) => {
    setSelectedPatient(patient);
    setShowPayment(true); // Show the PaymentComponent when a patient is selected
  };
  const handlePrint = () => {
    window.print();
  };


  const patientsData = [
    { hospitalNo: "2406003702", name: "Philip Juma", ageSex: "34Y/M", contact: "986757669", address: "", ipNumber: "H2400008", dischargeDate: "2024-08-12" },
    { hospitalNo: "2408003807", name: "Arbaz S Pathan", ageSex: "25Y/M", contact: "838283822", address: "Pune", ipNumber: "H2400025", dischargeDate: "2024-08-09" },
    { hospitalNo: "2406003784", name: "Julia Kim", ageSex: "20Y/F", contact: "0976989898", address: "", ipNumber: "H2400018", dischargeDate: "2024-07-30" },
    { hospitalNo: "2406003783", name: "Monicah Juma", ageSex: "34Y/F", contact: "0764565656", address: "", ipNumber: "H2400019", dischargeDate: "2024-07-30" },
    { hospitalNo: "2407003791", name: "Sajid Passa Shafin", ageSex: "22Y/M", contact: "22222", address: "", ipNumber: "H2400021", dischargeDate: "2024-07-10" },
    { hospitalNo: "2406003789", name: "Test Patient", ageSex: "25Y/M", contact: "123456789", address: "dfsdf fgfgd", ipNumber: "H2400020", dischargeDate: "2024-06-27" },
    { hospitalNo: "2406003697", name: "Kelvin Mwanki", ageSex: "24Y/M", contact: "0789382891", address: "", ipNumber: "H2400007", dischargeDate: "2024-06-10" },
    { hospitalNo: "2311000008", name: "John Kibet", ageSex: "20Y/M", contact: "123478", address: "", ipNumber: "H2300004", dischargeDate: "2024-05-12" },
    { hospitalNo: "2310000016", name: "William Chebor", ageSex: "0Y/F", contact: "123654789", address: "", ipNumber: "H2300004", dischargeDate: "2024-05-12" },
    { hospitalNo: "2312000012", name: "Fredrick Marva", ageSex: "30Y/M", contact: "1234567890", address: "", ipNumber: "H2300001", dischargeDate: "2024-05-12" },
    { hospitalNo: "2312000011", name: "Mary Wambui", ageSex: "33Y/F", contact: "0765432345", address: "", ipNumber: "H2300011", dischargeDate: "2024-05-12" },
    { hospitalNo: "2402000021", name: "Jane Mercy", ageSex: "8Y/F", contact: "0720000125", address: "", ipNumber: "H2400001", dischargeDate: "2024-05-12" },
    { hospitalNo: "2402000027", name: "Jesse Mutahi", ageSex: "34Y/M", contact: "0714999887", address: "", ipNumber: "H2400005", dischargeDate: "2024-05-12" },
    { hospitalNo: "2402000022", name: "James Ngugi Thiongo", ageSex: "30Y/M", contact: "0765454565", address: "", ipNumber: "H2400004", dischargeDate: "2024-05-12" },
    { hospitalNo: "2402000023", name: "Joseph Waitara", ageSex: "30Y/M", contact: "0767656589", address: "", ipNumber: "H2400002", dischargeDate: "2024-02-10" },
    { hospitalNo: "2312000019", name: "James Njogu", ageSex: "30Y/M", contact: "8547996", address: "", ipNumber: "H2300009", dischargeDate: "2023-12-21" },
    { hospitalNo: "2312000016", name: "Jane Rotich", ageSex: "40Y/M", contact: "1245398", address: "", ipNumber: "H2300006", dischargeDate: "2023-12-21" },
    { hospitalNo: "2310000012", name: "Sonia Chebii", ageSex: "0Y/F", contact: "987456321", address: "", ipNumber: "H2300003", dischargeDate: "2023-12-11" },
    { hospitalNo: "2311000006", name: "William Chebor", ageSex: "0Y/F", contact: "123654789", address: "", ipNumber: "H2300003", dischargeDate: "2023-11-30" }
  ];

  return (
    <div className="patient-component"
    >
    {!showPayment ? (
      <div className="patient-list-container">
        <div className="patient-list-title">
          <h3>Patient List</h3>
        </div>
        <div className="patient-edit-info">
          <input type="text" placeholder="Search (Minimum 3 Characters)" />
          <label className="patient-view-all">
            <input className="patient-edit-check" type="checkbox" onChange={handleCheckboxChange} />
            Search From All Patients
          </label>
        </div>
        <div className="patient-results">
          <span className='patient-span'>Showing {showAllPatients ? patientsData.length : 0} / {patientsData.length} results</span>
          <button className="patient-print-btn"onClick={handlePrint}>Print</button>
        </div>
        {/* <div className='patient-table'> */}
        <table  ref={tableRef}>
          <thead>
            <tr>
              {[
               "Hospital No.",
  "Patient Name",
  "Age/Sex",
  "Contact No.",
  "Address",
  "IP Number",
  "Discharge Date",
  "Actions"
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
              {showAllPatients ? (
                patientsData.map((patient, index) => (
                  <tr key={index}>
                    <td>{patient.hospitalNo}</td>
                    <td>{patient.name}</td>
                    <td>{patient.ageSex}</td>
                    <td>{patient.address || 'N/A'}</td>
                    <td>{patient.contact}</td>
                    <td>{patient.ipNumber}</td>
                    <td>{patient.dischargeDate}</td>
                    <td>
                      <button className="patient-payment-btn" onClick={() => handlePaymentClick(patient)}>Payment</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="patient-no-rows">No Rows To Show</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* <div className="patient-pagination">
            <span>0 to 0 of 0</span>
            <button>First</button>
            <button>Previous</button>
            <span>Page 0 of 0</span>
            <button>Next</button>
            <button>Last</button>
          </div> */}
        {/* </div> */}
      </div>
    ) : (
      <div className="payment-container">
        <PaymentComponent patient={selectedPatient} />
      </div>
    )}
  </div>
);
};


export default PatientComponent;
