import React, { useState, useRef, useEffect } from "react";
import "./IpdReturnsWard.css";

import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";
import { toast } from "react-toastify";
const IpdReturnsWard = ({ ipAdmission }) => {
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
    dob: "",
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

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      returnNo: ipAdmission?.returnNo || "",
      creditNote: ipAdmission?.creditNote || "",
      ipNo: ipAdmission?.patient?.patient?.inPatientId || "",
      billNo: ipAdmission?.billNo || "",
      patientName:
        ipAdmission?.patient?.patient?.firstName +
          " " +
          ipAdmission?.patient?.patient?.lastName || "",
      doctorName:
        ipAdmission?.admissionUnderDoctorDetails?.consultant?.doctorName || "",
      uhId: ipAdmission?.patient?.patient?.uhid || "",
      sex: ipAdmission?.patient?.patient?.gender || "",
      age: ipAdmission?.patient?.patient?.age || "",
      dob: ipAdmission?.patient?.patient?.dateOfBirth || "",
    }));
  }, []);

  const [tableData, setTableData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [packageTableRows, setPackageTableRows] = useState([
    {
      sn: 1,
      issuedItemName: "",
      batchNo: "",
      totalIssQty: 0,
      issuedQty: 0,
      balQty: 0,
      returnQty: 0,
    },
  ]);

  const handleAddRow = () => {
    setPackageTableRows((prevRows) => [
      ...prevRows,
      {
        sn: prevRows.length + 1,
        issuedItemName: "",
        totalIssQty: "",
        issuedQty: "",
        balQty: "",
        returnQty: "",
        batchNo: "",
        mrp: "",
        billDisc: "",
        amount: "",
        taxUnit: "",
        collTax: "",
        expDate: "",
        taxPercent: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    setPackageTableRows((prevRows) => {
      const updatedRows = prevRows.filter((_, rowIndex) => rowIndex !== index);
      return updatedRows.map((row, idx) => ({
        ...row,
        sn: idx + 1, // Reassign serial numbers
      }));
    });
  };
  return (
    <div className="ipdreturnsward-container">
      <h5 className="ipdreturnsward-header">IPD Returns Ward</h5>

      {/* Patient Details */}
      <h6>
        <b>Patient Details</b>
      </h6>
      <div className="ipdreturnsward-form">
        {[
          { label: "Return No", name: "returnNo" },
          { label: "Credit Note", name: "creditNote" },
          { label: "IP No", name: "inPatientId" },
          { label: "Select Bill No", name: "billNo" },
          { label: "Patient Name", name: "patientName" },
          { label: "Doctor Name", name: "doctorName" },
          { label: "UH ID", name: "uhId" },
          { label: "Sex", name: "sex" },
          { label: "Age", name: "age" },
          { label: "DOB", name: "dob" },
          { label: "Bed No", name: "bedNo" },
        ].map((field, index) => (
          <div key={index} className="ipdreturnsward-section">
            <FloatingInput
              label={field.label}
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: field.name,
                    value: e.target.value,
                  },
                })
              }
            />
          </div>
        ))}
      </div>

      {/* Item Details Table */}
      <h6>
        <b>Item Details</b>
      </h6>
      <div className="ipd-return-indent-table">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Actions",
                "SN",
                "Issued Item Name",
                "Total Issued Qty",
                "Issued Qty",
                "Batch No",
                "MRP",
                "Bill Disc",
                "Amount",
                "Tax/Unit",
                "Coll Tax",
                "Exp Date",
                "Bal Qty",
                "Return Qty",
                "Tax Percent",
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
            {packageTableRows.map((row, index) => (
              <tr key={index}>
                <td>
                  <div className="table-actions">
                    <button
                      className="final-bill-add-btn"
                      onClick={handleAddRow}
                    >
                      Add
                    </button>
                    <button
                      className="final-bill-del-btn"
                      onClick={() => handleDeleteRow(index)}
                      disabled={packageTableRows.length <= 1}
                    >
                      Del
                    </button>
                  </div>
                </td>
                <td>{row.sn}</td>
                <td>
                  <FloatingInput
                    label="Issued Item Name"
                    type="text"
                    value={row.issuedItemName}
                    onChange={(e) =>
                      setPackageTableRows((prevRows) =>
                        prevRows.map((r, i) =>
                          i === index
                            ? { ...r, issuedItemName: e.target.value }
                            : r
                        )
                      )
                    }
                    placeholder="Search..."
                  />
                </td>

                <td>{row.totalIssQty}</td>
                <td>{row.issuedQty}</td>
                <td>
                  <FloatingInput
                    label="Search Country"
                    type="search"
                    id="description"
                    value={row.batchNo || ""} 
                    onChange={(e) => console.log(e.target.value)}
                  />
                </td>
                <td>{row.mrp}</td>
                <td>{row.billDisc}</td>
                <td>{row.amount}</td>
                <td>{row.taxUnit}</td>
                <td>{row.collTax}</td>
                <td>{row.expDate}</td>
                <td>{row.balQty}</td>
                <td>{row.returnQty}</td>
                <td>{row.taxPercent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <br />
      <h6>
        <b>Financial Details</b>
      </h6>
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
            <FloatingInput
              label={field.label}
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: field.name,
                    value: e.target.value,
                  },
                })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IpdReturnsWard;
