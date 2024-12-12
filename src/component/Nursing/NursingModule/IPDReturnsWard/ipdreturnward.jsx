import React, { useState, useRef } from "react";
import "./IpdReturnsWard.css";

import { startResizing } from "../../../TableHeadingResizing/resizableColumns";

const IpdReturnsWard = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [formData, setFormData] = useState({
    returnNo: "",
    creditNote: "",
    ipNo: "",
    billNo: "",
    patientName: "",
    doctorName: "",
    uhId: "",
    sex: "",
    age: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    bedNo: "",
    mrNo: "",
    totalAmount: "0.00",
    discountAmount: "0.00",
    taxAmount: "0.00",
    netAmount: "0",
    paidAmount: "0",
    dueAmount: "0",
    remarks: "",
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
        issuedItemName: "",
        totalIssQty: "",
        issuedQty: "",
        returnQty: "",
        batchNo: "",
        mrp: "",
        billDisc: "",
        amount: "",
        taxPerUnit: "",
        collTax: "",
        expDate: "",
        taxPercent: "",
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    setTableData(tableData.filter((_, i) => i !== index));
  };

  return (
    <div className="ipdreturnsward-container">
      <h2 className="ipdreturnsward-header">IPD Returns Ward</h2>

      {/* Patient Details */}
      <h4>Patient Details</h4>
      <div className="ipdreturnsward-form">
        {[
          { label: "Return No", name: "returnNo" },
          { label: "Credit Note", name: "creditNote" },
          { label: "IP No", name: "ipNo" },
          { label: "Select Bill No", name: "billNo" },
          { label: "Patient Name", name: "patientName" },
          { label: "Doctor Name", name: "doctorName" },
          { label: "UH ID", name: "uhId" },
          { label: "Sex", name: "sex" },
          { label: "Age", name: "age" },
          { label: "DOB (DD)", name: "dobDay" },
          { label: "DOB (MM)", name: "dobMonth" },
          { label: "DOB (YYYY)", name: "dobYear" },
          { label: "Bed No", name: "bedNo" },
          { label: "MR No", name: "mrNo" },
        ].map((field, index) => (
          <div key={index} className="ipdreturnsward-section">
            <label>{field.label}:</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      {/* Item Details Table */}
      <h4>Item Details</h4>
      <table className="ipdreturnsward-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "SN",
              "Issued Item Name",
              "Total Iss Qty",
              "Issued Qty",
              "Return Qty",
              "Batch No",
              "MRP",
              "Bill Disc",
              "Amount",
              "Tax/Unit",
              "Coll Tax",
              "Exp Date",
              "Tax Percent",
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
                    onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
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
                <button className="ipdreturnwardadd-btn" onClick={handleAddRow}>
                  Add
                </button>
                <button
                  className="ipdreturnwardremove-btn"
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
      <div className="ipdreturnsward-form">
        {[
          { label: "Total Amount", name: "totalAmount" },
          { label: "Discount Amount", name: "discountAmount" },
          { label: "Tax Amount", name: "taxAmount" },
          { label: "Net Amount", name: "netAmount" },
          { label: "Paid Amount", name: "paidAmount" },
          { label: "Due Amount", name: "dueAmount" },
          { label: "Remarks", name: "remarks" },
        ].map((field, index) => (
          <div key={index} className="ipdreturnsward-section">
            <label>{field.label}:</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IpdReturnsWard;
