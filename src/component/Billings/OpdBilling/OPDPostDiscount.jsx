import React, { useState, useRef, useEffect } from "react";
import { startResizing } from "../../../TableHeadingResizing/resizableColumns";
import "./OPDPostDiscount.css";
import {
  PopupTable,
  FloatingInput,
  FloatingSelect,
} from "../../../FloatingInputs/index";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import { toast } from "react-toastify";
import CustomModal from "../../../CustomModel/CustomModal";
import OpdPostDiscountPrint from "./OpdPostDiscountPrint";

// Dhanashree
const OPDPostDiscount = () => {
  const [selectedTab, setSelectedTab] = useState("testGrid");
  const [columnWidths, setColumnWidths] = useState({});
  const [selectedBillNo, setSelectedBillNo] = useState({ opdBillingId: "" });
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedDiscAuthority, setSelectedDiscAuthority] = useState(null);
  const [netAmount, setNetAmount] = useState(0);
  const [billPaid, setBillPaid] = useState(0);
  const [paidRefund, setPaidRefund] = useState(0);
  const [discRemarks, setDiscRemarks] = useState("");
  const [fileCharges, setFileCharges] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discAuthority, setdiscAuthority] = useState([]);
  const [paymentDetails, setPaymentDetails] = React.useState({
    mode: "",
    amount: 0,
    cardNumber: "",
    upiId: "",
    checkNumber: "",
    checkDate: "",
  });
  const [activePopup, setActivePopup] = useState("");
  const [billNo, setBillNo] = useState([]);
  const [addedData, setAddedData] = useState(null);

  const calculateTotals = () => {
    if (!selectedBillNo || !Array.isArray(selectedBillNo.testGridOpdBillDTO))
      return;

    let totalNetAmount = 0;
    let totalDiscAmount = 0;
    let totalBaseAmount = 0;
    let totalWeightedDiscount = 0;

    selectedBillNo.testGridOpdBillDTO.forEach((item) => {
      if (item.isChecked) {
        const rate = parseFloat(item.rate || 0);
        const quantity = parseFloat(item.quantity || 0);
        const doctorShare = parseFloat(item.doctorShareAmount || 0);

        const serviceNetAmt = rate * quantity - doctorShare;

        // Use the latest postDiscPercent value set in FloatingInput
        const itemDiscPercent = parseFloat(item.postDiscPercent || 0);
        const authorityDiscPercent =
          selectedDiscAuthority?.discountPercentage || 0;
        const cappedDiscPercent = Math.min(
          itemDiscPercent,
          authorityDiscPercent
        );

        const discAmount = (serviceNetAmt * cappedDiscPercent) / 100;

        totalNetAmount += serviceNetAmt;
        totalDiscAmount += discAmount;
        totalBaseAmount += serviceNetAmt;

        totalWeightedDiscount += (discAmount / serviceNetAmt) * 100; // Percentage per item
      }
    });

    const avgDiscountPercent =
      selectedBillNo.testGridOpdBillDTO.length > 0
        ? totalWeightedDiscount / selectedBillNo.testGridOpdBillDTO.length
        : 0;

    const finalNetAmount =
      totalNetAmount - totalDiscAmount + (parseFloat(fileCharges) || 0);

    setTotalAmount(totalNetAmount);
    setDiscountAmount(totalDiscAmount);
    setDiscountPercentage(avgDiscountPercent.toFixed(2)); // Corrected
    setNetAmount(finalNetAmount);
    setBillPaid(totalNetAmount);
    setPaidRefund(billPaid - finalNetAmount);
  };

  const calculateTotalAmount = () => {
    if (!selectedBillNo || !Array.isArray(selectedBillNo.testGridOpdBillDTO))
      return;

    let totalNetAmount = 0;
    let totalDiscAmount = 0;
    let totalBaseAmount = 0;

    selectedBillNo.testGridOpdBillDTO.forEach((item) => {
      if (item.isChecked) {
        const rate = parseFloat(item.rate || 0);
        const quantity = parseFloat(item.quantity || 0);
        const doctorShare = parseFloat(item.doctorShareAmount || 0);

        const serviceNetAmt = rate * quantity - doctorShare;

        const itemDiscPercent = parseFloat(item.postDiscPercent || 0);
        const discAmount = (serviceNetAmt * itemDiscPercent) / 100;

        totalNetAmount += serviceNetAmt;
        totalDiscAmount += discAmount;
        totalBaseAmount += serviceNetAmt;
      }
    });

    // Apply discountPercentage to the final total
    const discountPercentageAmount =
      (totalNetAmount * discountPercentage) / 100;
    const finalNetAmount =
      totalNetAmount -
      totalDiscAmount +
      (parseFloat(fileCharges) || 0) -
      discountPercentageAmount;

    setTotalAmount(totalNetAmount);
    setDiscountAmount(discountPercentageAmount);
    setNetAmount(finalNetAmount);
    setBillPaid(totalNetAmount);
    setPaidRefund(billPaid - finalNetAmount);
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [discountPercentage]);

  // const handleFileChange = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };
  const resetForm = () => {
    setPaymentDetails({
      mode: "",
      amount: 0,
      cardNumber: "",
      upiId: "",
      checkNumber: "",
      checkDate: "",
    });
    setSelectedBillNo(null);
    setSelectedDiscAuthority(null);
    setSelectedRow(null);
    setDiscRemarks(null);
    setBillPaid(null);
    setDiscountAmount(null);
    setDiscountPercentage(null);
    setNetAmount(null);
    setPaidRefund(null);
    setTotalAmount(null);
  };

  const handleSave = async () => {
    const postData = {
      discountPercentage: discountPercentage ? parseInt(discountPercentage) : 0,
      totalAmount: totalAmount ? parseInt(totalAmount) : 0,
      discountAmount: discountAmount ? parseInt(discountAmount) : 0,
      refundedAmount: paidRefund ? parseInt(paidRefund) : 0,
      afterDiscountTotalAmount: netAmount ? parseInt(netAmount) : 0,
      discountDate: String(new Date().toISOString().split("T")[0]),
      discountTime: String(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      ),
      remarks: discRemarks || "",
      discountAuthorityDTO: selectedDiscAuthority?.id
        ? { id: selectedDiscAuthority.id }
        : null,
      opdBillingDTO: selectedBillNo?.opdBillingId
        ? { opdBillingId: selectedBillNo.opdBillingId }
        : null,
      testGridPostDiscountbillDTO: selectedBillNo?.testGridOpdBillDTO
        ? selectedBillNo.testGridOpdBillDTO.map((bill) => ({
            serviceName: bill.serviceDetailsDTO?.serviceName,
            rate: parseInt(bill.rate) || 0,
            quantity: bill.quantity || 0,
            status: bill.status || "",
            discountAmount: parseInt(bill.discountAmount) || 0,
            netAmount: parseInt(bill.netAmount) || 0,
            emergencyAmt: parseInt(bill.emergencyAmt) || 0,
            doctorPercentage: parseInt(bill.doctorPercentage) || 0,
            doctorShareAmount: parseInt(bill.doctorShareAmount) || 0,
            postDiscountPercent: parseInt(bill.postDiscountPercent) || 0,
            postNetAmount: parseInt(bill.postNetAmount) || 0,
          }))
        : [],
      billPaid: billPaid > 0 ? "Yes" : "No",
      opdBillingPaymentModeDTO: paymentDetails || "",
    };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/opdPostDiscount`,
        postData
      );
      if (response) {
        toast.success("save success");
        setAddedData(response.data);
        resetForm();
      } else {
        throw new Error(`Failed with status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data. Please check the console for details.");
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/opdBilling`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.testGridOPDBillDTO) {
          data.testGridOPDBillDTO = data.testGridOPDBillDTO.map((item) => ({
            ...item,
            isChecked: true,
          }));
        }

        setBillNo(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/discount-authorities`)
      .then((response) => response.json())
      .then((data) => {
        setdiscAuthority(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [selectedBillNo, fileCharges, billPaid]);

  // useEffect(() => {
  //   const total = test.reduce((sum, row) => sum + (row.postNetAmt || 0), 0);
  //   setTotalPostNetAmt(total);
  // }, [test]);

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
        data: billNo.map((item) => ({
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
    } else if (activePopup === "discountAuthority") {
      return {
        columns: ["id", "authorizationName"],
        data: discAuthority,
      };
    }
    return { columns: [], data: [] };
  };

  const handleCheckboxChange = (isChecked, index) => {
    setSelectedBillNo((prev) => {
      const updatedRows = [...prev.testGridOpdBillDTO];
      updatedRows[index] = { ...updatedRows[index], isChecked };
      return { ...prev, testGridOpdBillDTO: updatedRows };
    });

    setTimeout(() => {
      calculateTotals();
    }, 0);
  };

  // // Add this useEffect to handle all calculations when checkboxes change
  // useEffect(() => {
  //   calculateTotalAmounts();
  // }, [selectedBillNo]);

  // const calculateTotalAmounts = (billState = selectedBillNo) => {
  //   let totalNetAmount = 0;
  //   let totalDiscAmount = 0;
  //   let weightedDiscountPercent = 0;
  //   let totalBaseAmount = 0;

  //   if (billState?.testGridOpdBillDTO) {
  //     billState.testGridOpdBillDTO.forEach((item) => {
  //       if (item.isChecked) {
  //         const rate = parseFloat(item.rate || 0);
  //         const quantity = parseFloat(item.quantity || 0);
  //         const doctorShare = parseFloat(item.doctorShareAmount || 0);
  //         const netAmt = rate * quantity - doctorShare;
  //         const discPercent = parseFloat(item.postDiscPercent || 0);
  //         const discAmt = (netAmt * discPercent) / 100;
  //         totalNetAmount += netAmt;
  //         totalDiscAmount += discAmt;
  //         totalBaseAmount += netAmt;
  //         weightedDiscountPercent += netAmt * discPercent;
  //       }
  //     });
  //   }
  //   const avgDiscountPercent =
  //     totalBaseAmount > 0 ? weightedDiscountPercent / totalBaseAmount : 0;
  //   setTotalAmount(totalNetAmount);
  //   setDiscountAmount(totalDiscAmount);
  //   setDiscountPercentage(avgDiscountPercent.toFixed(2));
  //   setNetAmount(
  //     totalNetAmount - totalDiscAmount + (parseFloat(fileCharges) || 0)
  //   );
  // };

  const handleSelect = (row) => {
    if (activePopup === "billNo") {
      setSelectedBillNo(row.originalobj);
    } else if (activePopup === "discountAuthority") {
      setSelectedDiscAuthority(row);
    } else {
      setSelectedRow(row);
    }
  };

  const { columns, data } = getPopupData();

  const renderPopup = () => {
    if (activePopup) {
      return (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      );
    }
    return null;
  };

  {
    activePopup && (
      <PopupTable
        columns={columns}
        data={data}
        onSelect={handleSelect}
        onClose={() => setActivePopup(false)}
      />
    );
  }

  const tableRef = useRef(null);

  const renderTable = () => {
    if (selectedTab !== "testGrid") return null;

    return (
      <div className="OPDPostDiscount-services-table">
        <table ref={tableRef}>
          <thead>
            <tr>
              <th style={{ width: columnWidths[0] }} className="resizable-th">
                <div className="header-content">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      calculateTotals();
                      const isChecked = e.target.checked;
                      setSelectedBillNo((prev) => ({
                        ...prev,
                        testGridOpdBillDTO: prev.testGridOpdBillDTO.map(
                          (row) => ({
                            ...row,
                            isChecked,
                          })
                        ),
                      }));
                    }}
                  />
                  <div
                    className="resizer"
                    onMouseDown={startResizing(tableRef, setColumnWidths)(0)}
                  ></div>
                </div>
              </th>
              {[
                "SN",
                "Rate",
                "Quantity",
                "Service Name",
                "Doctor Share Amount",
                "Net Amt",
                "Post Disc Percent",
                "Disc Amt",
                "Post Net Amt",
              ].map((header, index) => (
                <th
                  key={index + 1}
                  style={{ width: columnWidths[index + 1] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index + 1)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedBillNo?.testGridOpdBillDTO?.map((item, subIndex) => {
              const rate = parseFloat(item.rate || 0);
              const doctorShare = parseFloat(item.doctorShareAmount || 0);
              const quantity = item.quantity || 0;
              const netAmt = rate * quantity - doctorShare;
              const postDiscPercent = parseFloat(item.postDiscPercent || 0);
              const discAmt = (netAmt * postDiscPercent) / 100;
              const postNetAmt = netAmt - discAmt;

              return (
                <tr key={subIndex}>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.isChecked || false}
                      onChange={(e) =>
                        handleCheckboxChange(e.target.checked, subIndex)
                      }
                    />
                  </td>
                  <td>{subIndex + 1}</td>
                  <td>
                    <FloatingInput type="number" value={rate} readOnly />
                  </td>
                  <td>
                    <FloatingInput
                      type="number"
                      readOnly
                      value={quantity}
                      onChange={(e) => {
                        const newQuantity = parseFloat(e.target.value) || 0;
                        setSelectedBillNo((prev) => {
                          const updatedRows = [...prev.testGridOpdBillDTO];
                          updatedRows[subIndex] = {
                            ...updatedRows[subIndex],
                            quantity: newQuantity,
                          };
                          return { ...prev, testGridOpdBillDTO: updatedRows };
                        });
                      }}
                    />
                  </td>
                  <td>
                    <FloatingInput
                      type="text"
                      value={item.serviceDetailsDTO?.serviceName || ""}
                      readOnly
                    />
                  </td>
                  <td>{doctorShare.toFixed(2)}</td>
                  <td>{netAmt.toFixed(2)}</td>
                  <td>
                    <FloatingInput
                      type="text"
                      value={postDiscPercent}
                      onChange={(e) => {
                        const inputValue = parseFloat(e.target.value) || 0;
                        const maxDiscount =
                          selectedDiscAuthority?.discountPercentage || 0;
                        const newDiscPercent = Math.min(
                          inputValue,
                          maxDiscount
                        );
                        console.log(inputValue);

                        setSelectedBillNo((prev) => {
                          const updatedRows = prev.testGridOpdBillDTO.map(
                            (row, index) =>
                              index === subIndex
                                ? {
                                    ...row,
                                    postDiscPercent: newDiscPercent,
                                    discAmt: discAmt,
                                    postNetAmt: postNetAmt,
                                  }
                                : row
                          );
                          return { ...prev, testGridOpdBillDTO: updatedRows };
                        });
                        calculateTotals();
                      }}
                    />
                  </td>
                  <td>{discAmt?.toFixed(2)}</td>
                  <td>{postNetAmt?.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <div className="OPDPostDiscount-container">
        <div className="OPDPostDiscount-section">
          <div className="OPDPostDiscount-grid">
            <div className="OPDPostDiscount-search-field">
              <FloatingInput
                label="Bill No"
                type="search"
                value={selectedBillNo?.opdBillingId || ""}
                onIconClick={() => setActivePopup("billNo")}
              />
            </div>
            <FloatingInput
              label="MR No"
              value={selectedBillNo?.outPatientDTO?.patient?.uhid || ""}
            />
            <FloatingInput
              label="Mobile No"
              value={selectedBillNo?.outPatientDTO?.patient?.mobileNumber || ""}
            />
          </div>
        </div>
        {renderPopup()}
        <div className="OPDPostDiscount-section">
          <div className="OPDPostDiscount-header">Bill Details</div>
          <div className="OPDPostDiscount-grid">
            {/* <FloatingInput label="Name Initial" /> */}
            <FloatingInput
              label="F Name"
              value={selectedBillNo?.outPatientDTO?.patient?.firstName || ""}
            />
            <FloatingInput
              label="M Name"
              value={selectedBillNo?.outPatientDTO?.patient?.middleName || ""}
            />
            <FloatingInput
              label="L Name"
              value={selectedBillNo?.outPatientDTO?.patient?.lastName || ""}
            />
            <FloatingInput
              label="Gender"
              value={selectedBillNo?.outPatientDTO?.patient?.gender || ""}
            />

            <FloatingInput
              label="Marital Status"
              value={
                selectedBillNo?.outPatientDTO?.patient?.maritalStatus || ""
              }
            />

            <FloatingInput
              label="Contact Relation"
              value={
                selectedBillNo?.outPatientDTO?.patient?.contactRelation || ""
              }
            />

            <FloatingInput
              label="Address"
              value={selectedBillNo?.outPatientDTO?.patient?.address || ""}
            />

            <FloatingInput
              label="Birth Date"
              type="text"
              value={selectedBillNo?.outPatientDTO?.patient?.dateOfBirth || ""}
            />
          </div>
        </div>

        <div className="OPDPostDiscount-services-section">
          <div className="OPDPostDiscount-tab-bar">
            <button
              className={`OPDPostDiscount-tab ${
                selectedTab === "testGrid" ? "active" : ""
              }`}
              onClick={() => setSelectedTab("testGrid")}
            >
              Test Grid
            </button>
          </div>
          {renderTable()}
        </div>

        {/* <div className="OPDPostDiscount-section">
          <div className="OPDPostDiscount-header">Attach files</div>
          <div className="OPDPostDiscount-grid">
            <div className="OPDPostDiscount-form-for-file">
              <FloatingInput
                type="file"
                id="fileInput"
                onChange={handleFileChange}
              />
              <button className="OPDPostDiscount-Upload">Upload</button>
            </div>
          </div>
        </div> */}

        <div className="OPDPostDiscount-section">
          <div className="OPDPostDiscount-header">Other Details</div>
          <div className="OPDPostDiscount-grid">
            <FloatingInput
              label="Total Amount"
              value={totalAmount?.toFixed(2)}
              readOnly
            />

            <FloatingInput
              label={
                selectedBillNo?.testGridOpdBillDTO?.some(
                  (item) =>
                    item.postDiscPercent !== undefined &&
                    item.postDiscPercent !== null
                )
                  ? "Average Discount Percentage"
                  : "Discount Percentage"
              }
              type="text"
              value={discountPercentage}
              onChange={(e) => {
                let inputValue = e.target.value.trim(); // Trim spaces

                if (inputValue === "") {
                  setDiscountPercentage(""); // Allow empty value
                  return; // Avoid unnecessary calculations
                }

                const numericValue = parseFloat(inputValue);
                if (!isNaN(numericValue)) {
                  const maxDiscount =
                    selectedDiscAuthority?.discountPercentage || 0;
                  const newDiscount = Math.min(numericValue, maxDiscount);
                  setDiscountPercentage(newDiscount);
                }
              }}
            />

            {/* <FloatingInput
  label="Disc Amount"
   value={selectedBillNo?.outPatientDTO?.testGridOpdBillDTO?.[1]?.discountAmount || ''}
   value={selectedBillNo?.testGridOpdBillDTO?.discountAmount || ""} 
/> */}

            <FloatingInput
              label="Disc Amount"
              value={discountAmount?.toFixed(2)}
              readOnly
            />
            <FloatingInput
              label="Net Amount"
              value={netAmount?.toFixed(2)}
              readOnly
            />

            <FloatingInput
              label="Bill Paid"
              type="number"
              value={billPaid}
              onChange={(e) => setBillPaid(parseFloat(e.target.value) || 0)}
            />
            <FloatingInput
              label="Paid/Refund"
              value={paidRefund?.toFixed(2)}
              readOnly
            />
            <FloatingInput
              type="search"
              onIconClick={() => setActivePopup("discountAuthority")}
              label="Disc Authority"
              value={selectedDiscAuthority?.authorizationName || ""}
              readOnly
            />
            <FloatingInput
              label="Discount %"
              value={selectedDiscAuthority?.discountPercentage || ""}
            />
            <FloatingInput
              label="Disc Remarks"
              value={discRemarks}
              onChange={(e) => setDiscRemarks(e.target.value)}
            />

            <FloatingSelect
              label="Payment Mode"
              onChange={(e) => {
                setPaymentDetails((prev) => ({
                  ...prev,
                  mode: e.target.value,
                  amount: prev.amount || paidRefund,
                }));
              }}
              options={[
                { value: "", label: "-- Select Payment Mode --" },
                { value: "cash", label: "Cash" },
                { value: "card", label: "Card" },
                { value: "upi", label: "UPI" },
                { value: "check", label: "Check" },
              ]}
            />
            {paymentDetails.mode && (
              <>
                <FloatingInput
                  label="Amount"
                  type="text"
                  value={paymentDetails.amount}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      amount: e.target.value,
                    })
                  }
                />
                {paymentDetails.mode === "card" && (
                  <>
                    <FloatingInput
                      label="Card Number"
                      type="text"
                      value={paymentDetails.cardNumber}
                      restrictions={{ number: true, max: 12 }}
                      onChange={(e) =>
                        setPaymentDetails({
                          ...paymentDetails,
                          cardNumber: e.target.value,
                        })
                      }
                    />
                  </>
                )}
                {paymentDetails.mode === "upi" && (
                  <>
                    <FloatingInput
                      label="UPI ID"
                      type="text"
                      value={paymentDetails.upiId}
                      onChange={(e) =>
                        setPaymentDetails({
                          ...paymentDetails,
                          upiId: e.target.value,
                        })
                      }
                    />
                  </>
                )}
                {paymentDetails.mode === "check" && (
                  <>
                    <FloatingInput
                      label="Check Number"
                      type="text"
                      restrictions={{ number: true }}
                      value={paymentDetails.checkNumber}
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
                      value={paymentDetails.checkDate}
                      onChange={(e) =>
                        setPaymentDetails({
                          ...paymentDetails,
                          checkDate: e.target.value,
                        })
                      }
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="OPDPostDiscount-buttons">
        <button className="btn-blue" onClick={handleSave}>
          Save
        </button>
        <button onClick={() => resetForm()} className="btn-red">
          clear
        </button>
      </div>
      {addedData && (
        <CustomModal
          isOpen={addedData ? true : false}
          onClose={() => setAddedData(null)}
        >
          <OpdPostDiscountPrint formData={addedData} />
        </CustomModal>
      )}
    </>
  );
};
export default OPDPostDiscount;
