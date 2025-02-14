import React, { useState, useRef, useEffect, useCallback } from "react";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import "./OPDBillCancellation.css";
import {
  PopupTable,
  FloatingInput,
  FloatingSelect,
} from "../../../FloatingInputs/index";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import { toast } from "react-toastify";
import CustomModal from "../../../CustomModel/CustomModal";
import OpdBillingCancellationPrint from "./OPDBillCancellationPrint";

const OPDBillCancellation = () => {
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
  const [selectedCancel, setSelectedCancel] = useState();
  const [showPrint, setShowPrint] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    maritalStatus: "",
    relation: "",
    billing_date: "",
    uhid: "",
  });

  const fetchOPdBillingData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/opdBilling`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.text(); // Get error details from the response
        throw new Error(`Error ${response.status}: ${errorData}`);
      }

      const data = await response.json();
      console.log("Fetched OPD Billing Data:", data); // Log the data for verification
      setOpdBillingData(data); // Store the fetched data in state
    } catch (error) {
      console.error("Error fetching OPD Billing details:", error);
      alert(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchOPdBillingData();
  }, []);

  useEffect(() => {
    if (selectedBillingData) {
      setFormData((prevState) => ({
        ...prevState,
        firstName: selectedBillingData.firstName || "",
        middleName: selectedBillingData.middleName || "",
        lastName: selectedBillingData.lastName || "",
        gender: selectedBillingData.gender || "",
        billing_date: selectedBillingData.billing_date,
        maritalStatus: selectedBillingData.maritalStatus || "",
        salutation: selectedBillingData.salutation || "",
        dateOfBirth: selectedBillingData.dateOfBirth || "",
        relation: selectedBillingData.relation || "",

        // Map other fields here
      }));
    }
  }, [selectedBillingData]);

  // const setFieldValue = (fieldName, value) => {
  //   const field = document.querySelector([(name = "${fieldName}")]);
  //   if (field) {
  //     field.value = value;
  //   }
  // };

  const getPopupData = () => {
    if (activePopup === "billNo") {
      return {
        columns: [
          "opdBillingId",
          "uhid",
          "firstName",
          "lastName",
          "mobileNumber",
        ],
        data: opdBillingData.map((item) => ({
          opdBillingId: item.opdBillingId,
          uhid: item.outPatientDTO.patient?.uhid,
          billing_date: item.billing_date,
          firstName: item.outPatientDTO.patient?.firstName,
          middleName: item.outPatientDTO.patient?.middleName,
          lastName: item.outPatientDTO.patient?.lastName,
          salutation: item.outPatientDTO.patient?.salutation,
          age: item.outPatientDTO.patient?.age,
          dateOfBirth: item.outPatientDTO.patient?.dateOfBirth,
          gender: item.outPatientDTO.patient?.gender,
          paymentMode: item.paymentModeDTO.paymentMode,
          mobileNumber: item.outPatientDTO.patient?.mobileNumber,
          sourceOfRegistration:
            item.outPatientDTO.patient?.sourceOfRegistration,
          relation: item.outPatientDTO.patient?.relation,
          originalobj: item,
        })),
      };
    } else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "billNo") {
      setSelectedBillingData(data);
      const filteredData = data.originalobj.testGridOpdBillDTO.filter(
        (item) => item.status !== "refund" || item.status !== "cancel"
      );

      console.log("filted data", filteredData);

      settestgriddata(filteredData);
      console.log("Selected Billing Data:", data);

      // Simulate filling all inputs to activate them
      setFormData({
        opdBillingId: data.opdBillingId || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        middleName: data.middleName || "",
        gender: data.gender || "",
        maritalStatus: data.maritalStatus || "",
        relation: data.relation || "",
        relativeName: data.relativeName || "",
        dob: data.dob || "",
        billing_date: data.billing_date || "",
        cancelType: data.cancelType || "",
        sourceOfRegistration: data.sourceOfRegistration || "",
        cancelNo: data.cancelNo || "",
        doctorName: data.doctorName || "",
        totalDue: data.totalDue || "",
        hidden: data.hidden || "",
        refundableAmount: data.refundableAmount || "",
        cashCounter: data.cashCounter || "",
        uhid: data.uhid,
        mobileNumber: data.mobileNumber,
      });
    }
  };
  const handleCheckboxChange = (row, isChecked) => {
    setSelectedRows((prevSelected) => {
      // If the row is already in the selected list and the checkbox is unchecked, remove it
      const updatedSelection = isChecked
        ? prevSelected.some((selectedRow) => selectedRow.id === row.id)
          ? prevSelected // Prevent duplicate entries
          : [...prevSelected, row] // Only add if not already present
        : prevSelected.filter((selectedRow) => selectedRow.id !== row.id);

      // Update selectedRowIds to store only the selected row IDs
      setSelectedRowIds((prevSelectedIds) => {
        const updatedIds = isChecked
          ? [...new Set([...prevSelectedIds, row.id])] // Use Set to ensure uniqueness
          : prevSelectedIds.filter((id) => id !== row.id);
        return updatedIds;
      });

      // Calculate the total amount from selected rows
      const calculatedTotal = updatedSelection.reduce(
        (acc, item) => acc + (item.totalAmt || 0),
        0
      );
      setTotalAmount(calculatedTotal);

      // Calculate the net amount from selected rows
      const calculatedNetAmount = updatedSelection.reduce(
        (acc, item) => acc + (item.netAmt || 0),
        0
      );
      setNetAmount(calculatedNetAmount);

      // Calculate the discount amount from selected rows
      const calculatedDisc = updatedSelection.reduce((acc, item) => {
        const discountAmount =
          item.rate * item.quantity * (item.lessDisc / 100) || 0;
        return acc + discountAmount;
      }, 0);
      setDiscAmt(calculatedDisc);
      return updatedSelection;
    });
  };

  const handleRowChange = (index, field, value) => {
    settestgriddata((prevData) => {
      const updatedData = [...prevData];
      const row = updatedData[index];

      if (field === "quantity") {
        row.quantity = value === null || value === "" ? 1 : parseInt(value, 10); // Default to 1 if null or empty
      }

      // Calculate Total Amount
      row.totalAmt = row.rate * row.quantity;

      return updatedData; // Return the updated array
    });

    // Update the total amount for all selected rows
    setTotalAmount(
      selectedRows.reduce((acc, item) => acc + (item.totalAmt || 0), 0) // Use totalAmt instead of netAmt
    );
  };

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // Select all rows by calling handleCheckboxChange only for those that are not already selected
      testgriddata.forEach((row) => {
        if (!selectedRows.some((selectedRow) => selectedRow.id === row.id)) {
          handleCheckboxChange(row, true);
        }
      });
    } else {
      // Deselect all rows
      selectedRows.forEach((row) => {
        handleCheckboxChange(row, false);
      });
    }
  };

  const handleSubmit = () => {
    // Ensure opdBillingDTO is always an object before accessing its properties
    const opdBillingId = formData.opdBillingDTO?.opdBillingId || 0; // Default to 0 if undefined

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
      paymentMode: selectedPaymentMode || "",
      cardNo: formData.cardNo || "",
      reason: formData.reason || "",
      receivedby: formData.receivedby || "",
      adjustAmount: formData.adjustAmount || 0,
      checkdate: formData.checkdate || "",
      listofTest: selectedRowIds,
      opdBillingDTO: {
        opdBillingId: selectedBillingData.opdBillingId, // Ensure it's safely initialized
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
        setSelectedCancel(response.data);
        setShowPrint(true);
        console.log("Response received:", response.data);

        // Reset formData after successful submission
        setFormData({
          cancelType: "",
          sourceName: "",
          cancelNo: "",
          totalDue: 0,
          hidden: "",
          refundableAmount: 0,
          cashCounter: 0,
          fileCharges: 0,
          towards: "",
          paymentMode: "",
          cardNo: "",
          reason: "",
          receivedby: "",
          adjustAmount: 0,
          checkdate: "",
          listofTest: [],
          opdBillingDTO: {
            opdBillingId: 0,
          },
        });
        setPaymentDetails({});
        settestgriddata([]);
        // Optionally reset selectedRowIds if needed
        setSelectedRowIds([]);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(
            `Error posting data: ${error.response.status} - ${error.response.data}`
          );
        } else if (error.request) {
          console.error("Request error:", error.request);
          toast.error("No response received from the server.");
        } else {
          console.error("Error:", error.message);
          toast.error(`Error posting data: ${error.message}`);
        }
      });
  };

  // Function to update testgriddata without triggering infinite loop
  const processTestGridData = useCallback(() => {
    settestgriddata((prevData) => {
      if (prevData.length === 0) return prevData; // Prevent unnecessary updates

      const updatedData = prevData.map((row) => ({
        ...row,
        quantity: row.quantity ?? 1, // Default to 1 if null/undefined
        totalAmt: (row.rate ?? 0) * (row.quantity ?? 1), // Calculate total amount
      }));

      return JSON.stringify(prevData) === JSON.stringify(updatedData)
        ? prevData
        : updatedData;
    });
  }, []);

  // Function to calculate total amount based on selected rows
  const updateTotalAmount = useCallback(() => {
    setTotalAmount((prevTotal) => {
      if (testgriddata.length === 0) return 0; // Prevent unnecessary updates

      const totalAmount = testgriddata
        .filter((row) =>
          selectedRows.some((selectedRow) => selectedRow.id === row.id)
        )
        .reduce((acc, item) => acc + (item.totalAmt || 0), 0);

      return prevTotal === totalAmount ? prevTotal : totalAmount;
    });
  }, [testgriddata, selectedRows]);

  // Run these functions only when dependencies change
  useEffect(() => {
    processTestGridData();
  }, [testgriddata]); // ✅ No direct modification inside useEffect

  useEffect(() => {
    updateTotalAmount();
  }, [testgriddata, selectedRows]); // ✅ Handles total amount separately

  const renderTable = () => {
    switch (selectedTab) {
      case "testDetails":
        return (
          <div className="OPDBillCancellation-services-table">
            <table ref={tableRef}>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedRows.length === testgriddata.length} // Check if all checkboxes are selected
                      onChange={handleSelectAllChange}
                    />
                  </th>
                  {[
                    "ID",
                    "Test Code",
                    "Test Name",
                    "Test Rate",
                    "quantity",
                    "Total",
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
                  ) // Filter rows with status not "refund" or "cancel"
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
                      <td>{row?.serviceDetailsDTO?.serviceCode}</td>
                      <td>{row?.serviceDetailsDTO?.serviceName}</td>
                      <td>{row.rate}</td>
                      <td>
                        <FloatingInput
                          label={"QTY"}
                          type="number"
                          min="0"
                          value={row.quantity ?? 1} // Default to 1 if null
                          onChange={(e) =>
                            handleRowChange(index, "quantity", e.target.value)
                          }
                        />
                      </td>
                      <td>{row.totalAmt}</td>
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
    <div className="OPDBillCancellation-container">
      <div className="OPDBillCancellation-section">
        <div className="OPDBillCancellation-grid">
          <div className="OPDBillCancellation-search-field">
            <FloatingInput
              label="Bill No"
              type="search"
              value={formData.opdBillingId}
              onIconClick={() => setActivePopup("billNo")}
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
      <div className="OPDBillCancellation-section">
        <div className="OPDBillCancellation-header">
          Details of the Bill to be Cancelled
        </div>
        <div className="OPDBillCancellation-grid">
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
          <FloatingSelect
            label="Relation"
            value={formData.relation}
            onChange={(e) =>
              setFormData({ ...formData, relation: e.target.value })
            }
            options={[{ value: "D/O", label: "D/O" }]}
          />
          <FloatingInput label="Relative Name" />
          <FloatingInput label="DOB" type="date" value={formData.dateOfBirth} />
          <FloatingInput
            label="Bill Date"
            type="date"
            value={formData.billing_date}
          />
          <FloatingSelect
            label="CancelType"
            name="cancelType"
            required={true}
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
            value={formData.sourceName}
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
          <FloatingInput label="Doctor Name" />
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
      <div className="OPDBillCancellation-services-section">
        <div className="OPDBillCancellation-tab-bar">
          <button
            className={`OPDBillCancellation-tab ${
              selectedTab === "testDetails" ? "active" : ""
            }`}
            onClick={() => setSelectedTab("testDetails")}
          >
            Test Deatils
          </button>
        </div>
        {renderTable()}
      </div>
      <div className="OPDBillCancellation-section">
        <div className="OPDBillCancellation-header">Other Details</div>
        <div className="OPDBillCancellation-grid">
          <FloatingInput
            label="Reason"
            value={formData.reason}
            onChange={(e) =>
              setFormData({ ...formData, reason: e.target.value })
            }
          />
          <FloatingInput
            label="Received By	"
            value={formData.receivedby}
            onChange={(e) =>
              setFormData({ ...formData, receivedby: e.target.value })
            }
          />
          {/* <FloatingInput
            label="Adjust Amount"
            value={formData.adjustAmount}
            onChange={(e) =>
              setFormData({ ...formData, adjustAmount: e.target.value })
            }
          />
          <div className="OPDBillCancellation-search-field">
            <FloatingInput label="CC Machine Bank" type="search" />
          </div>
          <FloatingInput
            label="Check Date"
            type="date"
            value={formData.checkdate}
            onChange={(e) =>
              setFormData({ ...formData, checkdate: e.target.value })
            }
          /> */}
        </div>
      </div>
      <div className="OPDBillCancellation-section">
        <div className="OPDBillCancellation-header">Financial Details</div>
        <div className="OPDBillCancellation-grid">
          <FloatingInput label="Total Amount" value={totalAmount} readOnly />
          {/* <FloatingInput label="Disc Amount" value={discAmt} readOnly /> */}
          {/* <FloatingInput label="Net Amount" value={netAmount} readOnly /> */}
          <FloatingInput label="Refund Amount" value={totalAmount} />
          {/* <FloatingInput label="Advance Adjusted" />
          <FloatingInput
            label="File Charges"
            value={formData.fileCharges}
            onChange={(e) =>
              setFormData({ ...formData, fileCharges: e.target.value })
            }
          /> */}
          {/* <FloatingInput
            label="Towards"
            value={formData.towards}
            onChange={(e) =>
              setFormData({ ...formData, towards: e.target.value })
            }
          /> */}

          {/* <div className="OpdBilling-grid-sec"> */}

          <FloatingInput
            label="Amount"
            htmlFor="amount"
            type="number"
            id="amount"
            // placeholder="Enter Amount"
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

          {/* </div> */}
          {/* <FloatingInput label="Card No" />
          <div className="OPDBillCancellation-search-field">
            <FloatingInput label="Bankname" />
            <button className="OPDBillCancellation-search-icon">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                />
              </svg>
            </button>
          </div>
          <FloatingInput label="Post Discount" /> */}
        </div>
        <button className="OPDBillCancellation-save-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(false)}
        />
      )}
      {selectedCancel && (
        <CustomModal isOpen={showPrint} onClose={() => setShowPrint(false)}>
          <OpdBillingCancellationPrint formData={selectedCancel} />
        </CustomModal>
      )}
    </div>
  );
};

export default OPDBillCancellation;
