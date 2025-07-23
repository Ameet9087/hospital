import React, { useState, useRef, useEffect } from "react";
import "./ipdReturnIndent.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import axios from "axios";

const IpdReturnIndent = () => {

  const [issueWards, setIssueWards] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  const [formData, setFormData] = useState({
    ipNo: "1",
    doctorName: "",
    age: "",
    indentToDept: "",
    returnNo: "",
    locIpNo: "",
    uhId: "",
    patientName: "",
    sex: "",
    bedNo: "",
    totalAmount:"0.00",
    discountAmount:"0.00",
    taxAmount:"0.00",
    netAmount:"0.00",
    dueAmount:"0.00",
    paidAmount:"0.00",
    remark:""
  });

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [packageTableRows, setPackageTableRows] = useState([
    { sn: 1, issuedItemName: "", batchNo: "", totalIssQty: 0, issuedQty: 0, balQty: 0, returnQty: 0 },
  ]);


  useEffect(()=>{
    axios.get('http://localhost:4069/api/ip-issue-ward')
    .then(response=>{
      setIssueWards(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the issue wards!", error);
    });
  },[])

  const handleChangeSelect = (event) => {
    setSelectedId(event.target.value);
  };

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
        batchNo:"",
        mrp:"",
        billDisc:"",
        amount:"",
        taxUnit:"",
        collTax:"",
        expDate:"",
        taxPercent:""
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Form Data: ", formData);
    // Add any save logic here (e.g., API call or state update)
  };

  return (
    <div className="ipd-return-indent-container">
      <h2 className="ipd-return-indent-header">IPD Returns Indent</h2>
      <h4>Patient Details</h4>
      <div className="ipd-return-indent-form">
      <div className="ipd-return-indent-section">
          <label>Return No:</label>
          {/* <input
            type="text"
            name="returnNo"
            value={formData.returnNo}
            onChange={handleChange}
            
          /> */}

          <select
          id="issueWardSelect"
          value={selectedId}
          onChange={handleChangeSelect}
          >
            <option value="">-----Select----- </option>
            {
              issueWards.map(ward=>(
                <option key={ward.id} value={ward.id}>{ward.id}</option>
              ))
            }
          
          </select>
        </div>        
        <div className="ipd-return-indent-section">
          <label>IP  No:</label>
          <input
            type="text"
            name="ipNo"
            value={formData.ipNo}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="ipd-return-indent-section">
          <label>Doctor Name:</label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="ipd-return-indent-section">
          <label>Age:</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="ipd-return-indent-section">
          <label>Indent To Dept:</label>
          <input
            type="text"
            name="indentToDept"
            value={formData.indentToDept}
            onChange={handleChange}
            readOnly
          />
        </div>
       
        <div className="ipd-return-indent-section">
          <label>Loc IP No:</label>
          <input
            type="text"
            name="locIpNo"
            value={formData.locIpNo}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="ipd-return-indent-section">
          <label>UH ID:</label>
          <input
            type="text"
            name="uhId"
            value={formData.uhId}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="ipd-return-indent-section">
          <label>Patient Name:</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="ipd-return-indent-section">
          <label>Sex:</label>
          <input
            type="text"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="ipd-return-indent-section">
          <label>Bed No:</label>
          <input
            type="text"
            name="bedNo"
            value={formData.bedNo}
            onChange={handleChange}
            readOnly
          />
        </div>
      </div>
      <button className="ipd-return-indent-save-btn" onClick={handleSave}>
        Save
      </button>
      <table ref={tableRef} className="ipd-return-indent-table">
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
              "Tax Percent"
            ].map((header, index) => (
              <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
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
          {packageTableRows.map((row, index) => (
            <tr key={index}>
              <td>
                <div className="table-actions">
                  <button className="final-bill-add-btn" onClick={handleAddRow}>
                    Add
                  </button>
                  <button
                    className="final-bill-del-btn"
                    onClick={() => handleDeleteRow(index)}
                    disabled={packageTableRows.length <= 1} // This condition ensures delete is disabled if there's only one row
                  >
                    Del
                  </button>
                </div>
              </td>
              <td>{row.sn}</td>
              <td>
                <input
                  type="text"
                  value={row.issuedItemName}
                  onChange={(e) =>
                    setPackageTableRows((prevRows) =>
                      prevRows.map((r, i) =>
                        i === index ? { ...r, issuedItemName: e.target.value } : r
                      )
                    )
                  }
                  placeholder="Search..."
                />
              </td>
             
<td>{row.totalIssQty}</td>
        <td>{row.issuedQty}</td>
        <td>
          <input type="search" id="description" placeholder="Search Country " />

 {row.batchNo}</td>
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


      <h4>Financial Details</h4>
      <div className="ipd-return-indent-form">
      <div className="ipd-return-indent-section">
          <label>Total Amount:</label>
          <input
            type="totalAmount"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            
          />
        </div>        <div className="ipd-return-indent-section">
          <label>Discount Amount:</label>
          <input
            type="discountAmount"
            name="discountAmount"
            value={formData.discountAmount}
            onChange={handleChange}
          />
        </div>
        <div className="ipd-return-indent-section">
          <label>Tax Amount:</label>
          <input
            type="taxAmount"
            name="taxAmount"
            value={formData.taxAmount}
            onChange={handleChange}
          />
        </div>
        <div className="ipd-return-indent-section">
          <label>NetAmount:</label>
          <input
            type="netAmount"
            name="netAmount"
            value={formData.netAmount}
            onChange={handleChange}
          />
        </div>
        <div className="ipd-return-indent-section">
          <label>Paid Amount:</label>
          <input
            type="paidAmount"
            name="paidAmount"
            value={formData.paidAmount}
            onChange={handleChange}
          />
        </div>
       
      
      
        <div className="ipd-return-indent-section">
          <label>Due Amount:</label>
          <input
            type="dueAmount"
            name="dueAmount"
            value={formData.dueAmount}
            onChange={handleChange}
          />
        </div>
        
        <div className="ipd-return-indent-section">
          <label>Remarks:</label>
          <input
            type="remark"
            name="remark"
            value={formData.remark}
            onChange={handleChange}
            
          />
        </div>
      
      
</div>
    </div>
  );
};

export default IpdReturnIndent;
