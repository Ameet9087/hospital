import React, { useState, useRef, useEffect, useCallback } from "react";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import "./OPCancelationApprovalAction.css";
import { FloatingInput, FloatingSelect, FloatingTextarea, PopupTable } from "../../FloatingInputs/index";
import { API_BASE_URL } from "../api/api";
import axios from "axios";
import { toast } from "react-toastify";

const OPCancelationApprovalAction = ({ approvalData, onClose, onApprovalComplete }) => {
  const [selectedTab, setSelectedTab] = useState("testDetails");
  const [columnWidths, setColumnWidths] = useState({});
  const [activePopup, setActivePopup] = useState("");
  const [opdBillingData, setOpdBillingData] = useState([]);
  const [selectedBillingData, setSelectedBillingData] = useState();
  const [testgriddata, settestgriddata] = useState([]);
  const tableRef = useRef(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState("");
  const [discAmt, setDiscAmt] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    maritalStatus: "",
    relation: "",
    relationName: "",
    dateOfBirth: "",
    billing_date: "",
    uhid: "",
    doctorName: "",
    opdBillingId: "",
  });
  useEffect(() => {
    if (approvalData) {
      console.log("approvalData:", approvalData);
      const opdBillingRefundCancellationDTO = approvalData?.opdBillingRefundCancellationDTO;
      if (!opdBillingRefundCancellationDTO) {
        console.error("opdBillingRefundCancellationDTO is undefined or null:", approvalData);
        return;
      }
      const opdBillingDTO = opdBillingRefundCancellationDTO?.opdBillingDTO;
      if (!opdBillingDTO) {
        console.error("opdBillingDTO is undefined or null:", opdBillingRefundCancellationDTO);
        return;
      }
      const outPatientDTO = opdBillingDTO?.outPatientDTO;
      if (!outPatientDTO) {
        console.error("outPatientDTO is undefined or null:", opdBillingDTO);
        return;
      }
      const patient = outPatientDTO?.patient;
      if (!patient) {
        console.error("Patient data is undefined or null:", outPatientDTO);
        return;
      }
      const addDoctor = outPatientDTO?.addDoctor;
      if (!addDoctor) {
        console.error("Patient data is undefined or null:", outPatientDTO);
        return;
      }
      const mappedTestGridData = opdBillingDTO.testGridOpdBillDTO.map((item) => ({
        id: item.id,
        serviceCode: item.serviceDetailsDTO?.serviceCode || "",
        serviceName: item.serviceDetailsDTO?.serviceName || "",
        rate: item.rate || 0,
        quantity: item.quantity || 1,
        netAmount: item.netAmount || 0,
      }));
      setFormData({
        salutation: patient.salutation || "",
        firstName: patient.firstName || "",
        middleName: patient.middleName || "",
        lastName: patient.lastName || "",
        gender: patient.gender || "",
        maritalStatus: patient.maritalStatus || "",
        relation: patient.relation || "",
        relationName: patient.relationName || "",
        dateOfBirth: patient.dateOfBirth || "",
        sourceOfRegistration: patient.sourceOfRegistration || "",
        billing_date: opdBillingDTO.billing_date || "",
        uhid: patient.uhid || "",
        mobileNumber: patient.mobileNumber || "",
        doctorName: addDoctor.doctorName || "",
        cancelType: opdBillingRefundCancellationDTO.cancelType || "",
        sourceName: opdBillingRefundCancellationDTO.sourceName || "",
        cancelNo: opdBillingRefundCancellationDTO.cancelNo || "",
        totalDue: opdBillingRefundCancellationDTO.totalDue || 0,
        hidden: opdBillingRefundCancellationDTO.hidden || "",
        refundableAmount: opdBillingRefundCancellationDTO.refundableAmount || 0,
        cashCounter: opdBillingRefundCancellationDTO.cashCounter || 0,
        fileCharges: opdBillingRefundCancellationDTO.fileCharges || 0,
        towards: opdBillingRefundCancellationDTO.towards || "",
        paymentMode: opdBillingRefundCancellationDTO.paymentMode || "",
        reason: opdBillingRefundCancellationDTO.reason || "",
        receivedby: opdBillingRefundCancellationDTO.receivedby || "",
        adjustAmount: opdBillingRefundCancellationDTO.adjustAmount || 0,
        checkdate: opdBillingRefundCancellationDTO.checkdate || "",
        opdBillingId: opdBillingDTO.opdBillingId || "",
      });
      settestgriddata(mappedTestGridData || []);
    }
  }, [approvalData]);
  const fetchOPdBillingData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/opdBilling`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Error ${response.status}: ${errorData}`);
      }
      const data = await response.json();
      console.log("Fetched OPD Billing Data:", data);
      setOpdBillingData(data);
    } catch (error) {
      console.error("Error fetching OPD Billing details:", error);
      alert(`Error: ${error.message}`);
    }
  };
  useEffect(() => {
    fetchOPdBillingData();
  }, []);
  const handleCheckboxChange = (row, isChecked) => {
    setSelectedRows((prevSelected) => {
      const updatedSelection = isChecked
        ? prevSelected.some((selectedRow) => selectedRow.id === row.id)
          ? prevSelected
          : [...prevSelected, row]
        : prevSelected.filter((selectedRow) => selectedRow.id !== row.id);
      setSelectedRowIds((prevSelectedIds) => {
        const updatedIds = isChecked
          ? [...new Set([...prevSelectedIds, row.id])]
          : prevSelectedIds.filter((id) => id !== row.id);
        return updatedIds;
      });
      const calculatedTotal = updatedSelection.reduce(
        (acc, item) => acc + (item.netAmount || 0),
        0
      );
      setTotalAmount(calculatedTotal);
      return updatedSelection;
    });
  };
  const handleRowChange = (index, field, value) => {
    settestgriddata((prevData) => {
      const updatedData = [...prevData];
      const row = updatedData[index];
      if (field === "quantity") {
        row.quantity = value === null || value === "" ? 1 : parseInt(value, 10);
      }
      row.netAmount = row.rate * row.quantity;
      return updatedData;
    });
    setTotalAmount(
      selectedRows.reduce((acc, item) => acc + (item.netAmount || 0), 0)
    );
  };
  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      testgriddata.forEach((row) => {
        if (!selectedRows.some((selectedRow) => selectedRow.id === row.id)) {
          handleCheckboxChange(row, true);
        }
      });
    } else {
      selectedRows.forEach((row) => {
        handleCheckboxChange(row, false);
      });
    }
  };
  const handleSubmit = () => {
    const opdBillingId = formData.opdBillingDTO?.opdBillingId || 0;
    console.log("-------------", testgriddata);
    const requestBody = {
      cancelType: formData.cancelType || "",
      sourceName: formData.sourceName || "",
      cancelNo: formData.cancelNo || "",
      totalDue: formData.totalDue || 0,
      hidden: formData.hidden || "",
      refundableAmount: formData.refundableAmount || 0,
      cashCounter: formData.cashCounter || 0,
      fileCharges: formData.fileCharges || 0,
      towards: formData.towards || "",
      paymentMode: formData.paymentMode || "",
      cardNo: formData.cardNo || "",
      reason: formData.reason || "",
      receivedby: formData.receivedby || "",
      adjustAmount: formData.adjustAmount || 0,
      checkdate: formData.checkdate || "",
      listofTest: selectedRowIds,
      opdBillingDTO: {
        opdBillingId: selectedBillingData.opdBillingId,
      },
    };
    axios
      .post(`${API_BASE_URL}/opdBillingRefundCancellation`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success("Successfully saved");
        console.log("Response received:", response.data);
        onApprovalComplete();
        onClose();
      })
      .catch((error) => {
        console.error("Error posting data:", error);
        if (error.response) {
          console.error("Response error:", error.response.data);
          toast.error(
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
  const renderTable = () => {
    switch (selectedTab) {
      case "testDetails":
        return (
          <div className="OPCancelationApprovalAction-services-table">
            <table ref={tableRef}>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedRows.length === testgriddata.length}
                      onChange={handleSelectAllChange}
                    />
                  </th>
                  {[
                    "ID", "Test Code", "Service Name", "Rate", "Quantity", "Net Amount",
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
                {testgriddata
                  .filter(
                    (row) => row.status !== "refund" && row.status !== "cancel"
                  )
                  .map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedRows.some(
                            (selectedRow) => selectedRow.id === row.id
                          )}
                          onChange={(e) =>
                            handleCheckboxChange(row, e.target.checked)
                          }
                        />
                      </td>
                      <td>{row.id}</td>
                      <td>{row.serviceCode}</td>
                      <td>{row.serviceName}</td>
                      <td>{row.rate}</td>
                      <td>
                        <FloatingInput
                          label={"QTY"}
                          type="number"
                          min="0"
                          value={row.quantity ?? 1}
                          onChange={(e) =>
                            handleRowChange(index, "quantity", e.target.value)
                          }
                        />
                      </td>
                      <td>{row.netAmount}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="OPCancelationApprovalAction-container">
      <div className="OPCancelationApprovalAction-section">
        <div className="OPCancelationApprovalAction-grid">
          <div className="OPCancelationApprovalAction-search-field">
            <FloatingInput
              label="Bill No"
              value={formData.opdBillingId}
            />
          </div>
          <FloatingInput label="MR No" value={formData.uhid} />
          <FloatingInput
            label="Mobile No"
            type="tel"
            value={formData.mobileNumber}
          />
        </div>
      </div>
      <div className="OPCancelationApprovalAction-section">
        <div className="OPCancelationApprovalAction-header">
          Details of the OP Cancelation Approval
        </div>
        <div className="OPCancelationApprovalAction-grid">
          <FloatingInput label="Name Initial" value={formData.salutation} />
          <FloatingInput
            name="F Name"
            label="F Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <FloatingInput
            name="M Name"
            value={formData.middleName}
            onChange={(e) =>
              setFormData({ ...formData, middleName: e.target.value })
            }
            label="M Name"
          />
          <FloatingInput
            name="L Name"
            value={formData.lastName}
            label="L Name"
          />
          <FloatingSelect
            label="Gender"
            value={formData.gender}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
          />
          <FloatingSelect
            label="Marital Status"
            value={formData.maritalStatus}
            options={[
              { value: "Single", label: "Single" },
              { value: "Married", label: "Married" },
              { value: "Unmarried", label: "Unmarried" },
            ]}
          />
          <FloatingInput
            label="Relation"
            value={formData.relation}
          // onChange={(e) =>
          //   setFormData({ ...formData, relation: e.target.value })
          // }
          // options={[{ value: "D/O", label: "D/O" }]}
          />
          <FloatingInput label="Relative Name"
            value={formData.relationName}
          />
          <FloatingInput label="DOB" type="date" value={formData.dateOfBirth} />
          <FloatingInput
            label="Bill Date"
            type="date"
            value={formData.billing_date}
          />
          <FloatingSelect
            label="CancelType"
            name="cancelType"
            value={formData.cancelType}
            onChange={(e) =>
              setFormData({ ...formData, cancelType: e.target.value })
            }
            options={[
              { value: "cancel", label: "Cancel" },
              { value: "refund", label: "Refund" },
              { value: "select", label: "Select" },
            ]}
          />
          <FloatingInput
            label="Source Name"
            name="sourceName"
            value={formData.sourceOfRegistration}
            onChange={(e) =>
              setFormData({ ...formData, sourceName: e.target.value })
            }
          />
          <FloatingInput
            label="Cancel No"
            value={formData.cancelNo}
            onChange={(e) =>
              setFormData({ ...formData, cancelNo: e.target.value })
            }
          />
          <FloatingInput label="Doctor Name" value={formData.doctorName} />
          <FloatingInput
            label="Totaldue"
            value={formData.totalDue}
            onChange={(e) =>
              setFormData({ ...formData, totalDue: e.target.value })
            }
          />
          <FloatingInput
            label="Hidden"
            value={formData.hidden}
            onChange={(e) =>
              setFormData({ ...formData, hidden: e.target.value })
            }
          />
          <FloatingInput
            label="Refundable Amount"
            value={formData.refundableAmount}
            onChange={(e) =>
              setFormData({ ...formData, refundableAmount: e.target.value })
            }
          />
          <FloatingInput
            label="Cashcounter"
            value={formData.cashCounter}
            onChange={(e) =>
              setFormData({ ...formData, cashCounter: e.target.value })
            }
          />
        </div>
      </div>
      <div className="OPCancelationApprovalAction-services-section">
        <div className="OPCancelationApprovalAction-tab-bar">
          <button
            className={`OPCancelationApprovalAction-tab ${selectedTab === "testDetails" ? "active" : ""
              }`}
            onClick={() => setSelectedTab("testDetails")}
          >
            Test Details
          </button>
        </div>
        {renderTable()}
      </div>
      <div className="OPCancelationApprovalAction-section">
        <div className="OPCancelationApprovalAction-header">Financial Details</div>
        <div className="OPCancelationApprovalAction-grid">
          <FloatingInput label="Total Amount" value={totalAmount} readOnly />
          <FloatingInput label="Refund Amount" value={totalAmount} />
          <FloatingInput label="Advance Adjusted" value={""} />
          <FloatingInput
            label="File Charges"
            value={formData.fileCharges}
            onChange={(e) =>
              setFormData({ ...formData, fileCharges: e.target.value })
            }
          />
          <FloatingInput
            label="Towards"
            value={formData.towards}
            onChange={(e) =>
              setFormData({ ...formData, towards: e.target.value })
            }
          />
          <FloatingInput
            label="Amount"
            htmlFor="amount"
            type="number"
            id="amount"
            value={paymentDetails.amount || ""}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                amount: e.target.value,
              })
            }
          />
          <FloatingSelect
            label="Select Payment Mode"
            htmlFor="paymentMode"
            id="paymentMode"
            value={formData.paymentMode}
            onChange={(e) => {
              setSelectedPaymentMode(e.target.value);
              setFormData({ ...formData, towards: e.target.value });
              setPaymentDetails({});
            }}
            options={[
              { value: "", label: "-- Select Payment Mode --" },
              { value: "cash", label: "Cash" },
              { value: "card", label: " Card" },
              { value: "upi", label: " UPI" },
              { value: "check", label: " Check" },
            ]}
          />
          {selectedPaymentMode === "card" && (
            <FloatingInput
              label="Card Number"
              htmlFor="cardNumber"
              type="text"
              id="cardNumber"
              value={paymentDetails.cardNumber || ""}
              onChange={(e) => {
                setPaymentDetails({
                  ...paymentDetails,
                  cardNumber: e.target.value,
                });
                setFormData({ ...formData, towards: e.target.value });
              }}
            />
          )}
          {selectedPaymentMode === "upi" && (
            <FloatingInput
              label="UPI ID"
              htmlFor="upiId"
              type="text"
              id="upiId"
              value={paymentDetails.upiId || ""}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  upiId: e.target.value,
                })
              }
            />
          )}
          {selectedPaymentMode === "check" && (
            <>
              <FloatingInput
                label="Check Number"
                htmlFor="checkNumber"
                type="text"
                id="checkNumber"
                focused={paymentDetails.checkNumber != null ? true : false}
                value={paymentDetails.checkNumber || ""}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    checkNumber: e.target.value,
                  })
                }
              />
              <FloatingInput
                label="Check Date"
                type="date"
                id="checkDate"
                value={paymentDetails.checkdate || ""}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    checkDate: e.target.value,
                  })
                }
              />
            </>
          )}
        </div>
      </div>
      <div className="OPCancelationApprovalAction-section">
        <div className="OPCancelationApprovalAction-header">Other Details</div>
        <div className="OPCancelationApprovalAction-grid">
          <FloatingInput
            label="Reason"
            value={formData.reason}
            onChange={(e) =>
              setFormData({ ...formData, reason: e.target.value })
            }
          />
          <FloatingInput
            label="Received By"
            value={formData.receivedby}
            onChange={(e) =>
              setFormData({ ...formData, receivedby: e.target.value })
            }
          />
          <FloatingInput
            label="Adjust Amount"
            value={formData.adjustAmount}
            onChange={(e) =>
              setFormData({ ...formData, adjustAmount: e.target.value })
            }
          />
          <div className="OPCancelationApprovalAction-search-field">
            <FloatingInput label="CC Machine Bank" type="search" />
          </div>
          <FloatingInput
            label="Check Date"
            type="date"
            value={formData.checkdate}
            onChange={(e) =>
              setFormData({ ...formData, checkdate: e.target.value })
            }
          />
        </div>
        <button
          className="OPCancelationApprovalAction-save-btn"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>    </div>
  );
};
export default OPCancelationApprovalAction;