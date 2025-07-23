import React, { useState, useEffect } from "react";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./list.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const SchemeRefundList = () => {
  const [schemeRefundList, setSchemeRefundList] = useState([]);
  const [showSchemeReturnEntryModal, setShowSchemeReturnEntryModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptNo, setReceiptNo] = useState(null);
  const [printSchemeRefund, setPrintSchemeRefund] = useState(false);

  const [searchPatient, setSearchPatient] = useState("");
  const [ipNo, setIpNo] = useState("");
  const [refuntScheme, setRefuntScheme] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [formData, setFormData] = useState({
    inpatientNumber: "",
    refundScheme: "NHIF General",
    amount: 0,
    remarks: "",
  });

  useEffect(() => {
    // Fetch data from API
    const fetchRefundData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/Search-Patient/fetch-all-search-patient"
        );
        setSchemeRefundList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRefundData();
  }, []);

  const openSchemeReturnEntryModal = () => {
    setShowSchemeReturnEntryModal(true);
  };

  const closeSchemeReturnEntryModal = () => {
    setShowSchemeReturnEntryModal(false);
  };

  const printSchemeRefundDetails = (receiptNo) => {
    setReceiptNo(receiptNo);
    setPrintSchemeRefund(true);
    setShowReceipt(true);
  };

  const closeSchemeRefundReceiptPopUp = () => {
    setShowReceipt(false);
    setPrintSchemeRefund(false);
  };

  const handleSave = async () => {
    try {
      const payload = {
        searchPatient,
        ipNo,
        refuntScheme,
        amount,
        remark,
      };

      const response = await axios.post("http://localhost:5000/api/Search-Patient/save-search-patient", payload);

      if (response.status === 200) {
        alert("Data saved successfully!");

        // Update the state with the new data
        setSchemeRefundList((prevList) => [...prevList, payload]);

        // Clear input fields after saving
        setSearchPatient("");
        setIpNo("");
        setAmount("");
        setRemark("");
        setRefuntScheme("");

        // Close the modal after saving
        closeSchemeReturnEntryModal(); 
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };


  const previousRefunds = [
    { date: "2024-08-29", scheme: "NHIF General", amount: 6755, user: "Mr. admin", remarks: "fhgf" },
    { date: "2024-08-27", scheme: "NHIF General", amount: 1000, user: "Mr. admin", remarks: "test" }
  ];
    // Handle input change
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    // Handle submission logic here
  };
  return (
    <div className="utltlist">
      <div className="modelbtn">
        <button className="btn btn-success" onClick={openSchemeReturnEntryModal}>
          <i className="fa fa-plus"></i> New Scheme Refund Entry
        </button>
      </div>

      <div className="date-utlt">
        <div className="utltdatemiddle">
          <div className="date-range">
            <label>From: </label>
            <input type="date" value="2024-08-05" />
            <label> To: </label>
            <input type="date" value="2024-08-12" />
            <button style={{ marginLeft: "5px" }}>★</button>
            <button style={{ marginLeft: "5px" }}>+</button>
            <button
              style={{
                marginLeft: "5px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                padding: "5px 10px",
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>

      <div className="utlt-search-bar">
        <input type="text" placeholder="Search by patient name" className="inputsearchbar" />
        {/* <button className="utltlistsearchbar">
          <FaSearch style={{ color: "gray", fontSize: "18px" }} />
        </button> */}
      </div>

      <table className="utlt-table">
        <thead>
          <tr>
            {/* <th>Receipt No</th> */}
            <th>Refund Date</th>
            <th>Reception No</th>
            <th>Scheme</th>
            {/* <th>Hospital No</th> */}
            <th>Patient</th>
            {/* <th>Age/Sex</th> */}
            <th>Refund Amount</th>
            <th>Inpatient No</th>
            {/* <th>Entered By</th> */}
            <th>Remark</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schemeRefundList.map((item, index) => (
            <tr key={index}>
              {/* <td>{item.receiptNo}</td> */}
              <td>{moment(item.refundDate).format("YYYY-MM-DD")}</td>
              <td>{item.receiptNo}</td>
              <td>{item.refuntScheme}</td>
              {/* <td>{item.hosNo}</td> */}
              <td>{item.searchPatient}</td>
              {/* <td>{item.ageSex}</td> */}
              <td>{item.amount}</td>
              <td>{item.ipNo}</td>
              {/* <td>{item.enteredBy}</td> */}
              <td>{item.remark}</td>
              <td>
                <button className="btn btn-primary" onClick={() => printSchemeRefundDetails(item.receiptNo)}>
                  Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="utlt-pagination">
        <Button>First</Button>
        <Button>Previous</Button>
        <span>Page 1 of 4</span>
        <Button>Next</Button>
        <Button>Last</Button>
      </div> */}

      {/* Modal for New Scheme Refund Entry */}
      {showSchemeReturnEntryModal && (
            <div className="new-scheme-refund-modal-container">
            <div className="new-scheme-refund-modal-box">
              {/* Modal Header */}
              <div className="new-scheme-refund-modal-header">
                <h2>Scheme Refund Entry</h2>
                <button className="close" onClick={() => console.log('Close modal')}>×</button>
              </div>
      
              {/* Patient Information */}
              <div className="new-scheme-refund-modal-patient">
                <label htmlFor="selectedpatientname">Select patient</label>
                <input type="text" placeholder="Enter Patient Name "
                style={{padding:"2px"}} />
              </div>
      
              <div className="new-scheme-refund-modal-patient-info">
                <p>Hospital Number: 2408003807</p>
                <p>Age/Sex: 25Y / Male</p>
                <p>Address: India, Maharashtra, Pune, Maharashtra</p>
                <p>Name: Arbaz S Pathan</p>
                <p>Contact Number: 8382883822</p>
              </div>
      
              {/* Form */}
              <form className="new-scheme-refund-modal-form" onSubmit={handleSubmit}>
                <div className="new-scheme-refund-modal-form-data">
                  <label>Enter Inpatient No (If Applicable): </label>
                  <input
                    type="text"
                    name="inpatientNumber"
                    value={formData.inpatientNumber}
                    onChange={handleChange}
                  />
                </div>
      
                <div className="new-scheme-refund-modal-form-data">
                  <label>Select Refund Scheme: </label>
                  <select
                    name="refundScheme"
                    value={formData.refundScheme}
                    onChange={handleChange}
                  >
                    <option value="NHIF General">NHIF General</option>
                    {/* Add more options here if needed */}
                  </select>
                </div>
      
                <div className="new-scheme-refund-modal-form-data">
                  <label>Amount: </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </div>
      
                <div className="new-scheme-refund-modal-form-data">
                  <label>In Words: </label>
                  <input
                    type="text"
                    name="inWords"
                    value={formData.inWords}
                    onChange={handleChange}
                    style={{padding:"2px"}}
                  />
                </div>
      
                <div className="new-scheme-refund-modal-form-data">
                  <label>Remarks: </label>
                  <input
                    type="text"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    style={{padding:"2px"}}
                  />
                </div>
      
                <button type="submit">Save</button>
              </form>
      
              {/* Previous Scheme Refunds Table */}
              <h5>Previous Scheme Refunds</h5>
              <table className="new-scheme-refund-modal-table">
                <thead>
                  <tr>
                    <th>S.N.</th>
                    <th>Refund Date</th>
                    <th>Scheme</th>
                    <th>Amount</th>
                    <th>User</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {previousRefunds.map((refund, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{refund.date}</td>
                      <td>{refund.scheme}</td>
                      <td>{refund.amount}</td>
                      <td>{refund.user}</td>
                      <td>{refund.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      )}

      {/* Modal for Print Scheme Refund */}
      {showReceipt && (
        <div className="utlt modal show d-block" tabIndex="-1" role="dialog">
          <div className="utlt-modal-dialog" role="document">
            <div className="utlt-modal-content">
              <div className="utlt-modal-header">
                <h5 className="utlt-modal-title">Scheme Refund Receipt</h5>
              </div>
              <div className="utlt-modal-body">
                {printSchemeRefund && (
                  <div>
                    <p>Receipt No: {receiptNo}</p>
                    <p>Refund Date: {schemeRefundList.find((item) => item.receiptNo === receiptNo)?.refundDate}</p>
                    <p>Amount: {schemeRefundList.find((item) => item.receiptNo === receiptNo)?.amount}</p>
                  </div>
                )}
              </div>
              <div className="utlt-modal-footer">
                <button type="button" className="utlt-btn btn btn-secondary" onClick={closeSchemeRefundReceiptPopUp}>
                  Close
                </button>
                <button type="button" className="utlt-btn btn btn-primary">
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchemeRefundList;