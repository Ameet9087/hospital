import React, { useState, useRef, useEffect } from "react";
import "./IPMoneyReceipt.css";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import {
  PopupTable,
  FloatingInput,
  FloatingSelect,
} from "../../../../../FloatingInputs";
import { API_BASE_URL } from "../../../../api/api";
import { text } from "@fortawesome/fontawesome-svg-core";
import { toast } from "react-toastify";
import CustomModal from "../../../../../CustomModel/CustomModal";
import { useNavigate } from "react-router-dom";
const IpMoneyReceiptAdvance = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const [patients, setPatients] = useState(
    [
      {
        uhid:"",
        patientName:"",
        IpNo: "",
        paymentType:""
        
      },
      
    ]
  );
  const tableRef = useRef(null);
  const [selectedIPNo, setSelectedIPNo] = useState(null);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const ipnoHeading = ["IpNo", "patientName"];
  const [ipNos, setIpNos] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({});
  const [isPrintEnabled, setIsPrintEnabled] = useState(false);
  const [moneyReceiptData, setMoneyReceiptData] = useState(false);
  const navigate = useNavigate();

  const handlePrintBilling = () => {
    console.log("Navigating with state:", {
      selectedIPNo,
      formData,
      moneyReceiptData,
    });
    navigate("/billing/ipmoneyreceiptprint", {
      state: { selectedIPNo, formData, moneyReceiptData },
    });
  };

  const handlePopupClose = () => {
    setActivePopup(null);
  };
  const handleChange = (e) => { };

  const fetchIpNos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ip-admissions`);
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
        ipAdmmissionId: item.ipAdmmissionId,
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

    if (selectedPaymentMode === "upi") {
      paymentModes.push({
        modeName: "UPI",
        amount: paymentDetails.amount || 0,
        transactionId: paymentDetails.transactionId || "",
      });
    }

    if (selectedPaymentMode === "check") {
      paymentModes.push({
        modeName: "Check",
        amount: paymentDetails.amount || 0,
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
      paymentModes,
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
        toast.success("Successfully saved");
        setIsPrintEnabled(true);
        console.log("Response received:", response.data);
      })
      .catch((error) => {
        console.error("Error posting data:", error);

        if (error.response) {
          console.error("Response error:", error.response.data);
          toast.error(
            `Error posting data: ${error.response.status} - ${error.response.data}`
          );
          setIsPrintEnabled(false);
        } else if (error.request) {
          console.error("Request error:", error.request);
          toast.error("No response received from the server.");
        } else {
          console.error("Error:", error.message);
          toast.error(`Error posting data: ${error.message}`);
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
     <div>
      <table >
        <thead>
          <tr>
            <th>UHID</th>
            <th>Patient Name</th>
            <th>IP No</th>
            <th>Payment Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.uhid}</td>
                <td>{patient.name}</td>
                <td>{patient.ipNo}</td>
                <td>{patient.paymentType}</td>
                <td>
                  <button className="IpMoneyReceiptAdvance-Edit-button">Edit</button>
                  <button className="IpMoneyReceiptAdvance-del-button">Del</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" align="center">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  <CustomModal>
    
  </CustomModal>
      <div className="IpMoneyReceiptAdvance-event">
        <div className="IpMoneyReceiptAdvance-event-bar">
          <div className="IpMoneyReceiptAdvance-event-header">
            <span>IP Money Receipt Advance</span>
          </div>
        </div>
        <div className="IpMoneyReceiptAdvance-content-wrapper">
          <div className="IpMoneyReceiptAdvance-main-section">
            <div className="IpMoneyReceiptAdvance-panel dis-templates">
              <div className="IpMoneyReceiptAdvance-panel-header">
                <h3>Patient Details</h3>
              </div>
              <div className="IpMoneyReceiptAdvance-panel-content">
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput label={"Receipt No"} />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingSelect
                    label={"Payment Type"}
                    value={formData.modeOfAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, modeOfAmount: e.target.value })
                    }
                    options={[
                      { value: "", label: "" },
                      { value: "Patient Pay", label: "Patient Pay" },
                      { value: "Insurance Pay", label: "Insurance Pay" },
                    ]}
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingSelect
                    label={"Transaction Type"}
                    value={formData.transactionType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        transactionType: e.target.value,
                      })
                    }
                    options={[
                      { value: "", label: "" },
                      { value: "Non Settlement", label: "Non Settlement" },
                      { value: "Settlement", label: "Settlement" },
                    ]}
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingSelect
                    label={"Type"}
                    name="type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    options={[
                      { value: "", label: "" },
                      { value: "Advance", label: "Advance" },
                      { value: "Refund", label: "Refund" },
                    ]}
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"Ip No"}
                    type="search"
                    value={formData.id}
                    onChange={handleChange}
                    onIconClick={() => setActivePopup("IpNo")}
                  />
                </div>

                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"UHID"}
                    type="text"
                    value={formData.uhid}
                    onChange={handleChange}
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"Patient Name"}
                    type="text"
                    value={formData.patientName}
                    onChange={handleChange}
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"Bed No"}
                    type="text"
                    name="bedNo"
                    value={formData.bedNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"Address"}
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"Mobile No"}
                    type="text"
                    name="mobileNo"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"Organisation"}
                    type="text"
                    name="organization"
                    value={formData.organisation}
                    onChange={handleChange}
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"Disallowed Amount"}
                    type="text"
                    name="disallowedAmount"
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"Bill Amount"}
                    type="text"
                    name="billAmount"
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"Organisation Discount Amount"}
                    type="text"
                    name="organisationDiscountAmount"
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"Post Discount"}
                    type="text"
                    name="postDiscount"
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"Retain Amount"}
                    type="text"
                    name="retainAmount"
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"Total Amount"}
                    type="text"
                    name="tcs"
                    value={formData.tcs}
                    readOnly
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"Total Amount"}
                    type="text"
                    name="tcs"
                    value={formData.tcs}
                    readOnly
                  />
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
                  <FloatingInput
                    label={"Receipt Date"}
                    type="date"
                    name="receiptDate"
                    value={formData.receiptDate}
                    onChange={(e) =>
                      setFormData({ ...formData, receiptDate: e.target.value })
                    }
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"Created By"}
                    type="text"
                    name="createdBy"
                    value={formData.createdBy}
                    onChange={(e) =>
                      setFormData({ ...formData, createdBy: e.target.value })
                    }
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingInput
                    label={"Amount"}
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
                <div className="IpMoneyReceiptAdvance-form-row">
                  <FloatingSelect
                    label={"Mode Of Payment"}
                    name="paymentMode"
                    value={formData.paymentModes}
                    onChange={(e) => {
                      setSelectedPaymentMode(e.target.value);
                      setPaymentDetails({});
                    }}
                    options={[
                      { value: "", label: "" },
                      {
                        value: "cash",
                        label: "cash",
                      },
                      {
                        value: "card",
                        label: "card",
                      },
                      {
                        value: "upi",
                        label: "upi",
                      },
                      {
                        value: "check",
                        label: "check",
                      },
                    ]}
                  />
                </div>
                {selectedPaymentMode === "cash" && (
                  <div className="IpMoneyReceiptAdvance-form-row">
                    <FloatingInput
                      label={"Amount"}
                      type="text"
                      name="amount"
                      restrictions={{ number: true }}
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
                      <FloatingInput
                        label={"Card Number"}
                        type="text"
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
                      <FloatingInput
                        label={"Amount"}
                        type="text"
                        name="cardNumber"
                        restrictions={{ number: true }}
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
                      <FloatingInput
                        label={"UPI ID"}
                        type="text"
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
                      <FloatingInput
                        label={"Amount"}
                        type="text"
                        name="amount"
                        restrictions={{ number: true }}
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
                      <FloatingInput
                        label={"Check Date"}
                        type="date"
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
                      <FloatingInput
                        label={"Amount"}
                        type="text"
                        name="amount"
                        restrictions={{ number: true }}
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
                  <FloatingInput
                    label={"Amount In Words"}
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
                  <FloatingInput
                    label={"Status"}
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
                  <FloatingInput
                    label={"Remarks"}
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
      <button
        className="ipmoneyreceiptadvance-save-btn"
        onClick={() => handlePrintBilling()}
      // disabled={!isPrintEnabled}
      >
        Print
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
