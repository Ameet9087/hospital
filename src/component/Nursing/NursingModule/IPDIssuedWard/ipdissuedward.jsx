import React, { useState, useEffect } from "react";
import "./IpdIssuedWard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PopupTable from "../Services/PopupTable";
import { API_BASE_URL } from "../../../api/api";

const IPDIssuesWard = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [selectedIPNo, setSelectedIPNo] = useState(null);
  const [rows, setRows] = useState([
    {
      id: 1,
      scanCode: "",
      itemName: "",
      pack: "",
      tStock: "",
      bStock: "",
      issueQty: "",
      batchNo: "",
      expiry: "",
    },
  ]);

  const ipnoHeading = [
    "uhid",
    "inPatientId",
    "firstName",
    "lastName",
    "phoneNumber",
    "address",
  ];
  const itemcodeHeading = [
    "itemName",
    "batchNumber",
    "expiryDate",
    "mrp",
    "tstock",
    "bstock",
  ];
  const [itemCodedata, setItemCodedata] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState([]);

  const activePatient = useSelector(
    (state) => state.patient.patientData.patient
  );

  const fetchItemCode = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ipd-issue-ward`);
      console.log("Response Data:", response.data);

      const itemCode = response.data.map((code) => {
        const itemDetail = code.itemDetailsDTOs[0].itemDetailIssueWardDTO;
        const taxAmount =
          (parseFloat(itemDetail.tax || 0) *
            parseFloat(itemDetail.taxPercent || 0)) /
          100;
        const totalAmount = parseFloat(itemDetail.mrp || 0) + taxAmount;

        return {
          itemDetailIssueWardId: itemDetail.itemDetailIssueWardId, // Make sure this field is populated
          scanCode: itemDetail.scanCode,
          itemName: itemDetail.itemName,
          pack: itemDetail.pack,
          batchNumber: itemDetail.batchNumber,
          expiryDate: itemDetail.expiryDate,
          mrp: itemDetail.mrp,
          tax: itemDetail.tax,
          colTax: itemDetail.collTax,
          taxPercent: itemDetail.taxPercent,
          tstock: itemDetail.tstock,
          bstock: itemDetail.bstock,
          issueQty: code.itemDetailsDTOs[0].issueQty,
          taxAmount: taxAmount.toFixed(2),
          totalAmount: totalAmount.toFixed(2),
        };
      });

      console.log("Mapped Item Code:", itemCode); // Check if data is mapped correctly
      setItemCodedata(itemCode);
    } catch (error) {
      console.error("Error Fetching item codes:", error);
    }
  };

  // const updateIssueQty = (itemDetailIssueWardId, newQty) => {

  //     setRows((prevRows) =>
  //         prevRows.map((row) => {
  //             if (row.itemDetailIssueWardId === itemDetailIssueWardId) {
  //                 // Ensure selectedItemCode exists for each row
  //                 const itemDetail = row.selectedItemCode || {};
  //                 const mrp = parseFloat(itemDetail.mrp || 0);  // Safeguard for missing MRP
  //                 const qty = parseInt(newQty) || 0;  // Ensure quantity is a number

  //                 // Calculate total amount: issueQty * MRP
  //                 const totalAmount = mrp * qty;

  //                 return {
  //                     ...row,
  //                     issueQty: newQty,  // Update the issue quantity
  //                     totalAmount: totalAmount.toFixed(2),  // Update total amount (formatted to 2 decimal places)
  //                 };
  //             }
  //             return row;
  //         })
  //     );
  // };

  const updateIssueQty = (itemId, value) => {
    const updatedRows = rows.map((row) => {
      if (row.itemDetailIssueWardId === itemId) {
        const issueQty = parseFloat(value) || 0;
        const mrp = parseFloat(selectedItemCode.mrp || 0);
        const discount = parseFloat(selectedItemCode.discount || 0);
        const taxPercent = parseFloat(selectedItemCode.taxPercent || 0);

        // Calculate the subtotal after discount
        const subtotal = (mrp - discount) * issueQty;

        // Calculate the tax amount
        const taxAmount = (subtotal * taxPercent) / 100;

        // Calculate the total amount
        const totalAmount = subtotal + taxAmount;

        return {
          ...row,
          issueQty,
          totalAmount: totalAmount.toFixed(2), // Ensure 2 decimal places
        };
      }
      return row;
    });
    setRows(updatedRows); // Update the state with the new row data
  };

  const updateTax = (itemId, taxAmtInput) => {
    const updatedRows = rows.map((row) => {
      if (row.itemDetailIssueWardId === itemId) {
        const taxPercent = parseFloat(taxAmtInput) || 0; // Ensure tax percentage is a number
        const issueQty = parseFloat(row.issueQty) || 0; // Ensure issueQty is a number
        const mrp = parseFloat(selectedItemCode.mrp) || 0; // Ensure MRP is a number
        const discount = parseFloat(selectedItemCode.discount) || 0; // Ensure discount is a number

        // Calculate tax amount
        const taxAmount = (issueQty * mrp * taxPercent) / 100;

        // Calculate total amount: (MRP * Qty) - Discount + TaxAmount
        const totalAmount = issueQty * mrp - discount + taxAmount;

        return {
          ...row,
          tax: taxPercent,
          colTax: taxAmount.toFixed(2), // Tax Amount
          totalAmount: totalAmount.toFixed(2), // Total Amount
        };
      }
      return row;
    });

    setRows(updatedRows); // Update state with modified rows
  };

  // const updateFinancial=(itemId,totalAmount){}

  useEffect(() => {
    fetchItemCode();
  }, []);

  useEffect(() => {
    console.log("Updated itemCodedata:", itemCodedata);
  }, [itemCodedata]);

  // Handle popup data
  const handleSelect = (data) => {
    if (activePopup === "IpNo") {
      setSelectedIPNo(data);
    } else if (activePopup === "ItemCode") {
      setSelectedItemCode(data);
    }
    setActivePopup(null);
  };

  const getPopupData = () => {
    if (activePopup === "IpNo") {
      return { columns: ipnoHeading, data: activePatient };
    } else if (activePopup === "ItemCode") {
      console.log("Returning ItemCode data:", itemCodedata); // Add logging here
      return { columns: itemcodeHeading, data: itemCodedata };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  // Add new row
  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        scanCode: "",
        itemName: "",
        pack: "",
        tStock: "",
        bStock: "",
        issueQty: "",
        batchNo: "",
        expiry: "",
      },
    ]);
  };

  // Delete a row
  const deleteRow = (id) => {
    if (rows.length === 1) {
      alert("Cannot delete the last row!");
      return;
    }
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div className="ipd-issues-ward-container">
      <h6>
        <center>
          <b>IPD Issues Ward</b>
        </center>
      </h6>

      <div className="detail">
        <label>MIssue No:</label>
        <input type="text" />
      </div>

      <h6>
        <b>Patient Details</b>
      </h6>
      <div className="patient-details">
        <div className="detail">
          <label>Issue Type:</label>
          <select>
            <option>Direct</option>
          </select>
        </div>

        <div className="detail">
          <label>IP No:</label>
          <input type="text" value={selectedIPNo?.inPatientId || ""} />
          <FontAwesomeIcon
            icon={faSearch}
            onClick={() => setActivePopup("IpNo")}
          />
        </div>

        <div className="detail">
          <label>Patient Name:</label>
          <input type="text" value={selectedIPNo?.patientName || ""} />
        </div>

        <div className="detail">
          <label>Age:</label>
          <input type="text" value={selectedIPNo?.age || ""} />
        </div>

        <div className="detail">
          <label>Sex:</label>
          <input type="text" value={selectedIPNo?.gender || ""} />
        </div>

        <div className="detail">
          <label>Relative Name:</label>
          <input type="text" value={selectedIPNo?.relative || ""} />
        </div>

        <div className="detail">
          <label>Doctor Name:</label>
          <input type="text" value={selectedIPNo?.consultantDoctor || ""} />
        </div>

        <div className="detail">
          <label>Unit Name:</label>
          <input type="text" />
        </div>

        <div className="detail">
          <label>Mobile Number:</label>
          <input type="text" value={selectedIPNo?.mobileNo || ""} />
        </div>

        <div className="detail">
          <label>Type:</label>
          <select>
            <option>General</option>
          </select>
        </div>

        <div className="detail">
          <label>Bed No:</label>
          <input type="text" value={selectedIPNo?.bedNo || ""} />
        </div>

        <div className="detail">
          <label>Room No:</label>
          <input type="text" value={selectedIPNo?.roomNo || ""} />
        </div>

        <div className="detail">
          <label>Floor No:</label>
          <input type="text" />
        </div>

        <div className="detail">
          <label>Room Type:</label>
          <input type="text" />
        </div>

        <div className="detail">
          <label>Pay Type:</label>
          <input type="text" />
        </div>

        {/* <a>Previous Bills</a>

                <div className="detail">
                    <label>MR No:</label>
                    <input type="text" />
                    <i className="fa fa-search"></i>
                </div>

                <div className="detail">
                    <label>Template Name:</label>
                    <input type="text" />
                    <i className="fa fa-search"></i>
                </div> */}
      </div>

      <div className="item-details">
        <h6>
          <b>Item Details</b>
        </h6>

        <table className="item-table">
          <thead>
            <tr>
              <th>Add</th>
              <th>Del</th>
              <th>Scan Code</th>
              <th>Item Name</th>

              <th>Pack</th>
              <th>TStock</th>
              <th>BStock</th>
              <th>Issue Qty</th>
              <th>Batch No</th>
              <th>Expiry</th>
              <th>MRP</th>
              {/* <th>Discount</th> */}
              <th>Tax %</th>
              <th>Tax Amount</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td>
                  {index === rows.length - 1 && (
                    <button onClick={addRow} className="add-button">
                      Add
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => deleteRow(row.id)}
                    className="delete-button"
                  >
                    Del
                  </button>
                </td>
                <td>
                  <input type="text" value={selectedItemCode.scanCode || ""} />
                </td>
                <td>
                  <input
                    type="text"
                    value={selectedItemCode.itemName || ""}
                    style={{ width: "70%" }}
                  />
                  <FontAwesomeIcon
                    icon={faSearch}
                    onClick={() => setActivePopup("ItemCode")}
                  />
                </td>
                <td>
                  <input type="text" value={selectedItemCode?.pack || ""} />
                </td>
                <td>
                  <input type="text" value={selectedItemCode.tStock || "0"} />
                </td>
                <td>
                  <input type="text" value={selectedItemCode.bStock || "0"} />
                </td>
                <td>
                  {/* <input type="text" value={row.issueQty || ''} onChange={(e) => updateIssueQty(row.itemDetailIssueWardId, e.target.value)} /> */}

                  <input
                    type="number"
                    value={row.issueQty || ""}
                    onChange={(e) =>
                      updateIssueQty(row.itemDetailIssueWardId, e.target.value)
                    }
                  />
                </td>
                <td>
                  <input type="text" value={selectedItemCode.batchNo || ""} />
                </td>
                <td>
                  <input type="text" value={selectedItemCode.expiry || ""} />
                </td>

                <td>
                  <input type="text" value={selectedItemCode.mrp || ""} />
                </td>
                {/* <td><input type='text' value={row.tax || ''} onChange={(e)=>updateTax(row.itemDetailIssueWardId,e.target.value)} /></td> */}
                {/* <td><input type="text" value={row.discount || ''} /></td> */}
                <td>
                  <input
                    type="text"
                    value={row.tax || ""}
                    onChange={(e) =>
                      updateTax(row.itemDetailIssueWardId, e.target.value)
                    }
                  />
                </td>
                <td>
                  <input type="text" value={row.colTax || ""} readOnly />
                </td>

                {/* <td><input type="text" value={selectedItemCode.taxPercent || ''} /></td> */}
                <td>
                  <input
                    type="text"
                    value={row.totalAmount || ""}
                    onChange={(e) =>
                      updateFinancial(row.itemDetailIssueWardId, e.target.value)
                    }
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />

      {/* Financial Details */}
      <h6>
        <b>Financial Details</b>
      </h6>
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
              // name={field.name}
              // value={formData[field.name]}
              // onChange={handleChange}
              // readOnly={field.readOnly || false}
            />
          </div>
        ))}
      </div>

      {/* Popup for IP Number selection */}
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  );
};

export default IPDIssuesWard;
