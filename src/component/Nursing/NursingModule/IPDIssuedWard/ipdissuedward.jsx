import React, { useState,useRef } from "react";
import "./IpdIssuedWard.css";
import { startResizing } from "../../../TableHeadingResizing/resizableColumns";


const IpdIssuedWard = () => {

    const [columnWidths,setColumnWidths] = useState({});
    const tableRef=useRef(null);
  
  const [formData, setFormData] = useState({
    mIssueNo: "",
    issueType: "Direct",
    ipNo: "",
    patientName: "",
    age: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    sex: "",
    relativeName: "",
    doctorName: "",
    unitName: "",
    mobileNo: "",
    type: "General",
    bedNo: "",
    roomNo: "",
    floorNo: "",
    roomType: "",
    payType: "",
    mrNo: "",
    templateName: "",
    totalAmount: "0.00",
    lessDiscount: "0.00",
    netAmount: "0.00",
    taxAmount: "0.00",
    paidAmount: "0",
    dueAmount: "0",
    currentDue: "",
    remarks: "",
    amountInWords: "Rupees Zero Only",
  });

  const [tableData, setTableData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      {
        scanCode: "",
        itemName: "",
        pack: "",
        tStock: "",
        bStock: "",
        issueQty: "",
        batchNo: "",
        expiryDate: "",
        mrp: "",
        discount: "",
        tax: "",
        taxAmount: "",
        amount: "",
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    setTableData(tableData.filter((_, i) => i !== index));
  };

  return (
    <div className="ipdissuedward-container">
      <h2 className="ipdissuedward-header">IPD Issued Ward</h2>
      <h4>Patient Details</h4>
      <div className="ipdissuedward-form">
        
        {/* Form Fields */}
        {[
          { label: "MIssue No", name: "mIssueNo" },
          { label: "Issue Type", name: "issueType", readOnly: true },
          { label: "IP No", name: "ipNo" },
          { label: "Patient Name*", name: "patientName" },
          { label: "Age", name: "age" },
          { label: "DOB (Day)", name: "dobDay" },
          { label: "DOB (Month)", name: "dobMonth" },
          { label: "DOB (Year)", name: "dobYear" },
          { label: "Sex", name: "sex" },
          { label: "Relative Name", name: "relativeName" },
          { label: "Doctor Name", name: "doctorName" },
          { label: "Unit Name", name: "unitName" },
          { label: "Mobile No", name: "mobileNo" },
          { label: "Type", name: "type", readOnly: true },
          { label: "Bed No", name: "bedNo" },
          { label: "Room No", name: "roomNo" },
          { label: "Floor No", name: "floorNo" },
          { label: "Room Type", name: "roomType" },
          { label: "Pay Type", name: "payType" },
          { label: "MR No", name: "mrNo" },
          { label: "Template Name", name: "templateName" },
        ].map((field, index) => (
          <div key={index} className="ipdissuedward-section">
            <label>{field.label}:</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              readOnly={field.readOnly || false}
            />
          </div>
        ))}
      </div>

      {/* Table */}
      <h4>Item Details</h4>
      <table className="ipdissuedward-table" ref={tableRef}>
        <thead>
          <tr>
          {[
  "SN",
  "Scan Code",
  "Item Name",
  "Pack",
  "TStock",
  "BStock",
  "Issue Qty",
  "Batch No",
  "Expiry Date",
  "MRP",
  "Discount %",
  "Tax %",
  "Tax Amount",
  "Amount",
  "Actions",
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
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {Object.keys(row).map((key, i) => (
                <td key={i}>
                  <input
                    type="text"
                    value={row[key]}
                    onChange={(e) => {
                      const updatedRow = { ...row, [key]: e.target.value };
                      const updatedTableData = [...tableData];
                      updatedTableData[index] = updatedRow;
                      setTableData(updatedTableData);
                    }}
                  />
                </td>
              ))}
              <td>
              <button className="ipdissuedadd-btn" onClick={handleAddRow}>
        Add Row
      </button>
                <button
                  className="ipdissuedremove-btn"
                  onClick={() => handleRemoveRow(index)}
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     

      {/* Financial Details */}
      <h4>Financial Details</h4>
     <div className="ipdissuedward-form">
     {[
        { label: "Total Amount", name: "totalAmount" },
        { label: "Less Discount", name: "lessDiscount" },
        { label: "Net Amount", name: "netAmount" },
        { label: "Tax Amount", name: "taxAmount" },
        { label: "Paid Amount", name: "paidAmount" },
        { label: "Due Amount", name: "dueAmount" },
        { label: "Current Due", name: "currentDue" },
        { label: "Remarks", name: "remarks" },
        { label: "Amount in Words", name: "amountInWords", readOnly: true },
      ].map((field, index) => (
        <div key={index} className="ipdissuedward-section">
          <label>{field.label}:</label>
          <input
            type="text"
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            readOnly={field.readOnly || false}
          />
        </div>
      ))}
     </div>
    </div>
  );
};

export default IpdIssuedWard;
