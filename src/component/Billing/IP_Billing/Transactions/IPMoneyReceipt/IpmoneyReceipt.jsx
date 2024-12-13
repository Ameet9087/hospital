import React, { useState } from "react";
import "./IPMoneyReceipt.css";

const Ipmoneyreceipt = () => {
  const [formData, setFormData] = useState({
    receiptNo: "",
    paymentType: "Patient Pay",
    transactionType: "Non Settlement",
    type: "Advance",
    ipNo: "",
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
    amount: "",
    modeOfPayment: "Cash",
    amountInWords: "",
    status: "",
    panelPayable: "",
    remarks: "",
  });

  const [tableData, setTableData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setTableData([...tableData, formData]);
    // Reset form fields
    setFormData({
      receiptNo: "",
      paymentType: "Patient Pay",
      transactionType: "Non Settlement",
      type: "Advance",
      ipNo: "",
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
      amount: "",
      modeOfPayment: "Cash",
      amountInWords: "",
      status: "",
      panelPayable: "",
      remarks: "",
    });
  };

  return (
    <div className="ipmoneyreceiptbilll-container">
      <h2 className="ipmoneyreceiptbilll-header">IP Money Receipt</h2>
      <div className="ipmoneyreceiptbilll-form">
        {/* Top Section */}
        <div className="ipmoneyreceiptbilll-section">
          <label>Receipt No:</label>
          <input
            type="text"
            name="receiptNo"
            value={formData.receiptNo}
            onChange={handleChange}
          />
        </div>
        <div className="ipmoneyreceiptbilll-section">
          <label>Payment Type:</label>
          <select
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
          >
            <option value="Patient Pay">Patient Pay</option>
            <option value="Insurance Pay">Panel Pay</option>
          </select>
        </div>
        <div className="ipmoneyreceiptbilll-section">
          <label>Transaction Type:</label>
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
          >
            <option value="Non Settlement">Non Settlement</option>
            <option value="Settlement">Settlement</option>
          </select>
        </div>
        <div className="ipmoneyreceiptbilll-section">
          <label>Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Advance">Advance</option>
            <option value="Due">Due</option>
          </select>
        </div>

        {/* Patient Details */}
        <div className="ipmoneyreceiptbilll-section">
          <label>IP No:</label>
          <input
            type="text"
            name="ipNo"
            value={formData.ipNo}
            onChange={handleChange}
          />
        </div>
        <div className="ipmoneyreceiptbilll-section">
          <label>MR No:</label>
          <input
            type="text"
            name="mrNo"
            value={formData.mrNo}
            onChange={handleChange}
          />
        </div>
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
        <div className="ipmoneyreceiptbilll-section">
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
          />
        </div>
        <div className="ipmoneyreceiptbilll-section">
          <label>Organization:</label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
          />
        </div>
        <div className="ipmoneyreceiptbilll-section">
            <label>Disallowed Amount</label>
            <input 
            type="text" 
            name="disallowedAmount" 
            value={formData.disallowedAmount} 
            onChange={handleChange} />
        </div>
        <div className="ipmoneyreceiptbilll-section">
            <label> Bill Amount</label>
            <input type="text" name="billAmount" value={formData.billAmount} onChange={handleChange}/>
        </div>
        <div className="ipmoneyreceiptbilll-section">
            <label > Organisation Discount Amount</label>
            <input type="text" name="organizationDiscount" value={formData.organizationDiscount} onChange={handleChange} />
        </div>

        <div className="ipmoneyreceiptbilll-section">
            <label> Post Discount</label>
            <input type="text" name="postDiscount" value={formData.postDiscount} onChange={handleChange} />
        </div>
        <div className="ipmoneyreceiptbilll-section">
            <label>Retain Amount</label>
            <input type="text" name="retainAmount" value={formData.retainAmount} onChange={handleChange} />
        </div>

        <div className="ipmoneyreceiptbilll-section">
            <label>Total Amount</label>
            <input type="text" name="totalAmount" value={formData.totalAmount} onChange={handleChange} />
        </div>
        <div className="ipmoneyreceiptbilll-section">
            <label > Total Paid</label>
            <input type="text" name="totalPaid" value={formData.totalPaid} onChange={handleChange} />
        </div>

        {/* Payment Details */}
        <div className="ipmoneyreceiptbilll-section">
            <label>Total Cash Received</label>
            <input type="text" name="totalCashReceived" value={formData.totalCashReceived} onChange={handleChange}/>
        </div>
        <div className="ipmoneyreceiptbilll-section">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div className="ipmoneyreceiptbilll-section">
          <label>Mode of Payment:</label>
          <select
            name="modeOfPayment"
            value={formData.modeOfPayment}
            onChange={handleChange}
          >
            <option value="Cash">Cash</option>
            <option value="Card">Cradit</option>
          </select>
        </div>
        <div className="ipmoneyreceiptbilll-section"> 
            <label>Amount in words</label>
            <input type="text" name="amtinwords"  />
        </div>
        <div className="ipmoneyreceiptbilll-section">
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </div>
        <div className="ipmoneyreceiptbilll-section">
            <label>Panel Payable</label>
            <input type="text" name="panelpayable" value={formData.panelPayable} onChange={handleChange} />
        </div>
        <div className="ipmoneyreceiptbilll-section">
            <label>Remarks:</label>
            <input type="text" name="remarks" value={formData.remarks} onChange={handleChange}/>
        </div>
        <button className="ipmoneyreceiptbilll-save-btn" onClick={handleSave}>
          Save
        </button> 
      </div>

      {/* Table Section */}
      <table className="ipmoneyreceiptbilll-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Receipt No</th>
            <th>Receipt Date</th>
            <th>Created By</th>
            <th>Amount</th>
            <th>IP Remarks</th>
            <th>MOP</th>
            <th>Terminal</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.receiptNo}</td>
              <td>{row.ReceiptDate}</td>
              <td>{row.Createdby}</td>
              <td>{row.amount}</td>
              <td>{row.remarks}</td>
              <td>{row.modeOfPayment}</td>
              <td>{row.terminal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default Ipmoneyreceipt