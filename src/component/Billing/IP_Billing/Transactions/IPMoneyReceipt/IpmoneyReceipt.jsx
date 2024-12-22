import React, { useState, useEffect } from "react";
import "./IPMoneyReceipt.css";
import ReceiptDisplay from './ReceiptDisplay';
import { API_BASE_URL } from "../../../../api/api";

const Ipmoneyreceipt = () => {
  const [formData, setFormData] = useState({
    receiptDate: "",
    createdBy: "admin",
    amount: "",
    ipRemarks: "",
    modeOfAmount: "Cash",
    amountInWords: "",
    status: "Pending",
    paymentModes: [],
    ipNo: "",
    receiptNo: "",
    paymentType: "Patient Pay",
    transactionType: "Non Settlement",
    type: "Advance",
    mrNo: "",
    patientName: "",
    bedNo: "",
    address: "",
    phoneNo: "",
    mobileNo: "",
    organization: "",
    disallowedAmount: "",
    billAmount: "",
    organizationDiscount: "",
    postDiscount: "",
    retainAmount: "",
    totalAmount: "",
    totalPaid: "",
    totalCashReceived: "",
  });

  const [paymentMode, setPaymentMode] = useState({
    modeName: "Cash",
    amount: "",
    cardNumber: "",
    chequeDate: "",
    status: "Cleared",
    panelName: "",
    remarks: "",
  });

  const [ipAdmissions, setIpAdmissions] = useState([]);
  const [selectedIp, setSelectedIp] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false); 
  // Fetch IP admissions data
  useEffect(() => {
    fetch(`${API_BASE_URL}/ip-admissions`)
      .then((response) => response.json())
      .then((data) => {
        setIpAdmissions(data);
        console.log("------------",ipAdmissions)
      })
      .catch((error) => console.error("Error fetching IP admissions:", error));
  }, []);

  const handleIpChange = (e) => {
    const ipId = e.target.value;
    const ipData = ipAdmissions.find((item) => item.ipAdmmissionId === parseInt(ipId));
    setSelectedIp(ipData);

    // Update the form fields with selected IP data
    if (ipData) {
      const patient = ipData.patient || {};
      const bed = ipData.roomDetails?.bedDTO || {};
      setFormData({
        ...formData,
        ipNo: ipData.ipAdmmissionId,
        patientName:` ${patient.firstName} ${patient.middleName || ""} ${patient.lastName}`,
        bedNo: bed.roomNo || "",
        address: patient.address || "",
        phoneNo: patient.phoneNumber || "",
        mobileNo: patient.alternateNumber || "",
        organization: ipData.organisationDetail?.type || "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentMode({ ...paymentMode, [name]: value });
  };

  const addPaymentMode = () => {
    setFormData({
      ...formData,
      paymentModes: [...formData.paymentModes, paymentMode],
    });
    setPaymentMode({
      modeName: "Cash",
      amount: "",
      cardNumber: "",
      chequeDate: "",
      status: "Cleared",
      panelName: "",
      remarks: "",
    });
  };

  const handleSave = () => {
    // Ensure required fields are filled
    if (!formData.receiptDate || !formData.amount || formData.paymentModes.length === 0) {
      alert("Please fill all required fields and add at least one payment mode.");
      return;
    }

    // Convert amount to words (for example purposes, you can implement a helper for this)
    const amountInWords = convertAmountToWords(formData.amount); // You'll need a function for this

    // Construct data to post, ensuring the format matches the given example
    const postData = {
      receiptDate: formData.receiptDate,
      createdBy: formData.createdBy,
      amount: parseFloat(formData.amount),
      ipRemarks: formData.ipRemarks || "",
      modeOfAmount: formData.modeOfAmount,
      amountInWords: amountInWords,
      status: formData.status,
      paymentModes: formData.paymentModes.map((mode) => ({
        modeName: mode.modeName,
        amount: parseFloat(mode.amount),
        cardNumber: mode.cardNumber || null,
        chequeDate: mode.chequeDate || null,
        status: mode.status,
        panelName: mode.panelName || "",
        remarks: mode.remarks || "",
      })),
      ipadmissionDTO: {
        ipAdmmissionId: formData.ipNo,
      },
    };
console.log("-----------------",postData)
    // Send POST request to the backend
    fetch(`${API_BASE_URL}/IPD-bills/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Data saved successfully!");
        } else {
          throw new Error("Failed to save data.");
        }
      })
      .catch((error) => alert(error.message));
  };

  // Convert amount to words function (you can implement this as per your requirements)
  const convertAmountToWords = (amount) => {
    // Simple implementation or use a library to convert number to words
    const words = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"]; // Example
    return words[Math.floor(amount) - 1] || "Amount in Words"; // Simplified for this example
  };
  const toggleReceiptDisplay = () => {
    setShowReceipt(!showReceipt);
  };
  return (
    <div className="ipmoneyreceiptbilll-container">
        <button className="ipmoneyreceiptbilll-save-btn" onClick={toggleReceiptDisplay}>
          {showReceipt ? "Show Receipt " : "Show Receipt"}
        </button>
      <h2 className="ipmoneyreceiptbilll-header">IP Money Receipt</h2>
      <div className="ipmoneyreceiptbilll-form">
        {/* IP Number Dropdown */}
      
        <div className="ipmoneyreceiptbilll-section">
          <label>IP Number:</label>
          <select name="ipNo" value={formData.ipNo} onChange={handleIpChange}>
            <option value="">Select IP</option>
            {ipAdmissions.map((item) => (
              <option key={item.ipAdmmissionId} value={item.ipAdmmissionId}>
                {item.ipAdmmissionId} - {item.patient?.firstName} {item.patient?.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Display selected IP details */}
        {selectedIp && (
          <div className="ip-details">
            <p><strong>Admission Date:</strong> {selectedIp.admissionDate}</p>
            <p><strong>Patient Name:</strong> {formData.patientName}</p>
            <p><strong>Bed Number:</strong> {formData.bedNo}</p>
            <p><strong>Phone Number:</strong> {formData.phoneNo}</p>

            {/* Financial Details */}
            <div className="financial-details">
              <p><b>Financial Details</b></p>
              <p><strong>Total Amount:</strong> {selectedIp.financialDetails?.totalAmount || 0}</p>
              <p><strong>Less Discount:</strong> {selectedIp.financialDetails?.lessDiscount || 0}</p>
              <p><strong>Net Amount:</strong> {selectedIp.financialDetails?.netAmount || 0}</p>
              <p><strong>Paid Amount:</strong> {selectedIp.financialDetails?.paidAmount || 0}</p>
              <p><strong>Due Amount:</strong> {selectedIp.financialDetails?.dueAmount || 0}</p>
              <p><strong>Total Doctor Share Amount:</strong> {selectedIp.financialDetails?.totalDoctorShareAmount || 0}</p>
              <p><strong>Total Hospital Amount:</strong> {selectedIp.financialDetails?.totalHospitalAmount || 0}</p>
            </div>
          </div>
        )}

        {/* Other form fields */}
        <div className="ipmoneyreceiptbilll-section">
          <label>Patient Name:</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
          />
        </div>
        <div className="ipmoneyreceiptbilll-section">
          <label>Bed No:</label>
          <input
            type="text"
            name="bedNo"
            value={formData.bedNo}
            onChange={handleChange}
          />
        </div>
        <div className="ipmoneyreceiptbilll-section">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="ipmoneyreceiptbilll-section">
          <label>Phone No:</label>
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
          />
        </div>

        {/* Receipt Date and Amount */}
        <div className="ipmoneyreceiptbilll-section">
          <label>Receipt Date:</label>
          <input
            type="date"
            name="receiptDate"
            value={formData.receiptDate}
            onChange={handleChange}
          />
        </div>

        <div className="ipmoneyreceiptbilll-section">
          <label>Total Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>

        {/* Payment Mode Details */}
        <h3>Add Payment Mode</h3>
        <div className="ipmoneyreceiptbilll-section">
          <label>Mode Name:</label>
          <select name="modeName" value={paymentMode.modeName} onChange={handlePaymentChange}>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>
        <div className="ipmoneyreceiptbilll-section">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={paymentMode.amount}
            onChange={handlePaymentChange}
          />
        </div>
        {paymentMode.modeName === "Credit Card" && (
          <div className="ipmoneyreceiptbilll-section">
            <label>Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentMode.cardNumber}
              onChange={handlePaymentChange}
            />
          </div>
        )}
        {paymentMode.modeName === "Cheque" && (
          <div className="ipmoneyreceiptbilll-section">
            <label>Cheque Date:</label>
            <input
              type="date"
              name="chequeDate"
              value={paymentMode.chequeDate}
              onChange={handlePaymentChange}
            />
          </div>
        )}
        <div className="ipmoneyreceiptbilll-section">
          <label>Remarks:</label>
          <input
            type="text"
            name="remarks"
            value={paymentMode.remarks}
            onChange={handlePaymentChange}
          />
        </div>
        <button onClick={addPaymentMode} className="ipmoneyreceiptbilll-save-btn">Add Payment Mode</button>

        {/* Display Added Payment Modes */}
        {formData.paymentModes.length > 0 && (
          <div className="payment-modes-list">
            <h4>Added Payment Modes:</h4>
            <ul>
              {formData.paymentModes.map((mode, index) => (
                <li key={index}>{`${mode.modeName}: ${mode.amount} (${mode.remarks})`}</li>
              ))}
            </ul>
          </div>
        )}

        <button className="ipmoneyreceiptbilll-save-btn" onClick={handleSave}>
          Save
        </button>
      </div>

      {showReceipt && (
        <div className="modalmoneyReceipt">
          <div className="modal-contentReceipt">
            <button className="close-btnReceipt" onClick={toggleReceiptDisplay}>
              X
            </button>
            <ReceiptDisplay value={selectedIp.ipAdmmissionId}/>
          </div>
        </div>
      )}


    </div>
  );
};

export default Ipmoneyreceipt;