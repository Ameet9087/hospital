import React, { useState, useRef, useEffect } from "react";
import "./IpMoneyReceipt.css";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import PopupTable from "../../../../Admission/PopupTable";

const IpMoneyReceiptAdvance = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [selectedIPNo, setSelectedIPNo] = useState(null);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const ipnoHeading = ["IpNo", "patientName"];
  const [ipNos, setIpNos] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const API_BASE_URL = "http://192.168.242.48:8080/api";
  const [formData, setFormData] = useState({});

  const handlePopupClose = () => {
    setActivePopup(null);
  };
  const handleChange = (e) => { };

  const fetchIpNos = async () => {
    try {
      const response = await axios
        .get
        ("http://192.168.242.48:8080/api/ip-admissions");
      console.log("API Response:", response.data);

      // Map through the response data to extract inPatientId and patientName
      const inPatient = response.data.map((item) => ({
        IpNo: item.patient?.inPatientId || "N/A",
        patientName:
          `${item.patient?.patient?.firstName || ""} ${item.patient?.patient?.middleName || ""
            } ${item.patient?.patient?.lastName || ""}`.trim() || "N/A",
        uhid: item.patient?.patient?.uhid || "N/A",
        bedNo: item.roomDetails?.bedDTO?.bedNo,
        address: item.patient?.patient?.address,
        mobileNumber: item.patient?.patient?.mobileNumber,
        contactNumber: item.patient?.patient?.contactNumber,
        organisation: item.organisationDetail?.type,
        ipAdmmissionId: item.ipAdmmissionId
      }));

      // Filter out entries where Ip is "N/A"
      setIpNos(inPatient.filter((patient) => patient.Ip !== "N/A"));
    } catch (error) {
      console.error("Error fetching IP numbers:", error);
      setIpNos([]);
    }
  };

  useEffect(() => {
    fetchIpNos();
  }, []);
  const handleSubmit = () => {
    // Initialize paymentModes array
    const paymentModes = [];

    // Add cash payment mode
    if (selectedPaymentMode === "cash") {
      paymentModes.push({
        modeName: "Cash",
        amount: paymentDetails.amount || 0,
      });
    }

    // Add card payment mode
    if (selectedPaymentMode === "card") {
      paymentModes.push({
        modeName: "Card payment",
        amount: paymentDetails.amount || 0,
        cardNumber: paymentDetails.cardNumber || "",
      });
    }

    // Add UPI payment mode
    if (selectedPaymentMode === "upi") {
      paymentModes.push({
        modeName: "UPI",
        amount: paymentDetails.amount || 0,
        transactionId: paymentDetails.transactionId || "",
      });
    }

    // Add check payment mode
    if (selectedPaymentMode === "check") {
      paymentModes.push({
        modeName: "Check",
        amount: paymentDetails.amount || 0, // Ensure an amount is provided
        chequeDate: paymentDetails.chequeDate || "",
      });
    }

    // Construct the request body
    const requestBody = {
      receiptDate: formData.receiptDate,
      createdBy: formData.createdBy,
      amount: formData.amount,
      ipRemarks: formData.ipRemarks,
      modeOfAmount: formData.modeOfAmount,
      amountInWords: formData.amountInWords,
      status: formData.status,
      paymentType: formData.paymentType,
      transactionType: formData.transactionType,
      type: formData.type,
      ipAdmissionDTO: {
        ipAdmmissionId: selectedIPNo?.ipAdmmissionId || null, // Ensure it's safely initialized
      },
      paymentModes, // Add the paymentModes array
    };

    // Log the request body data to the console
    console.log("Data being posted to the server:", requestBody);

    // Post the data using axios
    axios
      .post(`${API_BASE_URL}/ipd-money-receipt`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Successfully saved");
        console.log("Response received:", response.data);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
        if (error.response) {
          console.error("Response error:", error.response.data);
          alert(
            `Error posting data: ${error.response.status} - ${error.response.data}`
          );
        } else if (error.request) {
          console.error("Request error:", error.request);
          alert("No response received from the server.");
        } else {
          console.error("Error:", error.message);
          alert(`Error posting data: ${error.message}`);
        }
      });
  };

  const handleSelect = (data) => {
    if (!data) return;
    if (activePopup === "IpNo") {
      setSelectedIPNo(data);
      setFormData((prev) => ({
        id: data.IpNo,
        patientName: data.patientName,
        uhid: data.uhid,
        bedNo: data.bedNo,
        address: data.address,
        mobileNumber: data.mobileNumber,
        contactNumber: data.contactNumber,
        organisation: data.organisation,

      }));
    }
    setActivePopup(null);
  };

  const getPopupData = () => {
    if (activePopup === "IpNo") {
      return { columns: ipnoHeading, data: ipNos };
    }
    return { columns: [], data: [] };
  };
  const { columns, data } = getPopupData();
  return (
    <>
      <div className="IpMoneyReceiptAdvance-event">
        <div className="IpMoneyReceiptAdvance-event-bar">
          <div className="IpMoneyReceiptAdvance-event-header">
            <span>IP Money Receipt Advance</span>
          </div>
        </div>
        <div className="IpMoneyReceiptAdvance-content-wrapper">
          <div className="IpMoneyReceiptAdvance-main-section">
            <div className="IpMoneyReceiptAdvance-panel dis-templates">
              <div className="IpMoneyReceiptAdvance-panel-header"></div>
              <div className="IpMoneyReceiptAdvance-panel-content">
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Receipt No: </label>
                  <input type="text" value="" />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Payment Type:</label>
                  <select
                    value={formData.modeOfAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, modeOfAmount: e.target.value })
                    }
                  >
                    <option value="Patient Pay">select</option>
                    <option value="Patient Pay">Patient Pay</option>
                    <option value="Insurance Pay">Insurance Pay</option>
                  </select>
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Transaction Type:</label>
                  <select
                    value={formData.transactionType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        transactionType: e.target.value,
                      })
                    }
                  >
                    <option value="Patient Pay">select</option>
                    <option value="Non Settlement">Non Settlement</option>
                    <option value="Settlement">Settlement</option>
                  </select>
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Type:</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option value="Patient Pay">select</option>
                    <option value="Advance">Advance</option>
                    <option value="Refund">Refund</option>
                  </select>
                </div>
                <div className="IpMoneyReceiptAdvance-header-contact">
                  <h3>Patient Details</h3>
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>IP No : </label>
                  <div className="IpMoneyReceiptAdvance-input-with-search">
                    <input
                      type="text"
                      name="ipNo"
                      value={formData.id}
                      onChange={handleChange}
                    />
                    <CiSearch
                      className="IpMoneyReceiptAdvance-magnifier-btn"
                      onClick={() => setActivePopup("IpNo")}
                    />
                  </div>
                </div>

                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>MR No:</label>
                  <input
                    type="text"
                    name="mrNo"
                    value={formData.uhid}
                    onChange={handleChange}
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Patient Name:</label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Bed No:</label>
                  <input
                    type="text"
                    name="bedNo"
                    value={formData.bedNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="IpMoneyReceiptAdvance-panel operation-details">
              <div className="IpMoneyReceiptAdvance-panel-header"></div>
              <div className="IpMoneyReceiptAdvance-panel-content">
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Phone No:</label>
                  <input
                    type="text"
                    name="phoneNo"
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Mobile No:</label>
                  <input
                    type="text"
                    name="mobileNo"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Organisation:</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organisation}
                    onChange={handleChange}
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Disallowed Amount:</label>
                  <input type="text" name="disallowedAmount" />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Bill Amount:</label>
                  <input type="text" name="billAmount" />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Organisation Discount Amount:</label>
                  <input type="text" name="organisationDiscountAmount" />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Post Discount:</label>
                  <input type="text" name="postDiscount" />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Retain Amount:</label>
                  <input type="text" name="retainAmount" />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Total Amount:</label>
                  <input type="text" name="tcs" value={formData.tcs} readOnly />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Total Paid:</label>
                  <input type="text" name="tcs" value={formData.tcs} readOnly />
                </div>
              </div>
            </div>
            <div className="IpMoneyReceiptAdvance-panel operation-details">
              {/* <div className="IpMoneyReceiptAdvance-panel-header"></div> */}
              <div className="IpMoneyReceiptAdvance-header-contact">
                <h3>Payment Details</h3>
              </div>
              <div className="IpMoneyReceiptAdvance-panel-content">
                {/* <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Total Cash Recieved:</label>
                  <input type="text" name="tcs" />
                </div> */}
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Receipt Date:</label>
                  <input
                    type="date"
                    name="receiptDate"
                    value={formData.receiptDate}
                    onChange={(e) =>
                      setFormData({ ...formData, receiptDate: e.target.value })
                    }
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Created By:</label>
                  <input
                    type="text"
                    name="createdBy"
                    value={formData.createdBy}
                    onChange={(e) =>
                      setFormData({ ...formData, createdBy: e.target.value })
                    }
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Amount:</label>
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Mode Of Payment:</label>
                  <select
                    id="paymentMode"
                    name="paymentMode"
                    value={formData.paymentModes}
                    onChange={(e) => {
                      setSelectedPaymentMode(e.target.value);
                      setPaymentDetails({});
                    }}
                  >
                    <option value="">Select Payment Mode --</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                    <option value="check">Check</option>
                  </select>
                </div>
                {selectedPaymentMode === "cash" && (
                  <div className="IpMoneyReceiptAdvance-form-row">
                    <label htmlFor="cardNumber">Amount</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentDetails.amount || ""}
                      onChange={(e) => {
                        setPaymentDetails({
                          ...paymentDetails,
                          amount: e.target.value,
                        });
                      }}
                    />
                  </div>
                )}
                {selectedPaymentMode === "card" && (
                  <>
                    <div className="IpMoneyReceiptAdvance-form-row">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentDetails.cardNumber || ""}
                        onChange={(e) => {
                          setPaymentDetails({
                            ...paymentDetails,
                            cardNumber: e.target.value,
                          });
                        }}
                      />

                    </div>
                    <div className="IpMoneyReceiptAdvance-form-row">
                      <label htmlFor="cardNumber">Amount</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentDetails.amount || ""}
                        onChange={(e) => {
                          setPaymentDetails({
                            ...paymentDetails,
                            amount: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </>


                )}

                {selectedPaymentMode === "upi" && (
                  <>
                    <div className="IpMoneyReceiptAdvance-form-row">
                      <label htmlFor="upiId">UPI ID</label>
                      <input
                        type="text"
                        id="upiId"
                        name="upiId"
                        value={paymentDetails.transactionId || ""}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            transactionId: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="IpMoneyReceiptAdvance-form-row">
                      <label htmlFor="cardNumber">Amount</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentDetails.amount || ""}
                        onChange={(e) => {
                          setPaymentDetails({
                            ...paymentDetails,
                            amount: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </>
                )}

                {selectedPaymentMode === "check" && (
                  <>
                    <div className="IpMoneyReceiptAdvance-form-row">
                      <label htmlFor="checkDate">Check Date</label>
                      <input
                        type="date"
                        id="checkDate"
                        name="checkDate"
                        value={paymentDetails.chequeDate || ""}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            chequeDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="IpMoneyReceiptAdvance-form-row">
                      <label htmlFor="cardNumber">Amount</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentDetails.amount || ""}
                        onChange={(e) => {
                          setPaymentDetails({
                            ...paymentDetails,
                            amount: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </>
                )}
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Amount In Words:</label>
                  <input
                    type="text"
                    name="amountInWords"
                    value={formData.amountInWords}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amountInWords: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Status:</label>
                  <input
                    type="text"
                    name="serviceTax"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  />
                </div>
                {/* <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Panel Payable:</label>
                  <input type="text" name="panelPayable" />
                </div> */}
                <div className="IpMoneyReceiptAdvance-form-row">
                  <label>Remark:</label>
                  <input
                    type="text"
                    name="remark"
                    value={formData.ipRemarks}
                    onChange={(e) =>
                      setFormData({ ...formData, ipRemarks: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="ipmoneyreceiptadvance-save-btn" onClick={handleSubmit}>
        Save
      </button>

      {/* Table Section */}
      {/* <h3>Previous Receipt Details</h3>
      <table className="ipmoneyreceiptadvance-table" ref={tableRef} border={1}>
        <thead>
          <tr>
            {[
              "SN",
              "Receipt No",
              "Receipt Date",
              "Created By",
              "Amount (Rs)",
              "IP Remarks",
              "MOP",
              "Terminal",
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
              <td>{row.receiptNo}</td>
              <td>{row.receiptDate}</td>
              <td>{row.createdBy}</td>
              <td>{row.amount}</td>
              <td>{row.remark}</td>
              <td>{row.modeOfPayment}</td>
              <td>{row.terminal}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => handlePopupClose(null)}
        />
      )}
    </>
  );
};

export default IpMoneyReceiptAdvance;
