import React, { useEffect, useState, useRef } from 'react';
import { startResizing } from '../../../../../TableHeadingResizing/ResizableColumns';
import './IpPostDiscount.css';
import PopupTable from '../../PopUpTableBedTransfer/PopupTable';
import { API_BASE_URL } from '../../../../api/api';
const FloatingInput = ({ label, type = "text", ...props }) => {
      const [isFocused, setIsFocused] = useState(false);
      const [hasValue, setHasValue] = useState(false);
      const handleChange = (e) => {
            setHasValue(e.target.value.length > 0);
            if (props.onChange) props.onChange(e);
      };
      return (
            <div className={`IpPostDiscount-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
                  <input type={type} className="IpPostDiscount-floating-input" onFocus={() => setIsFocused(true)}
                        onBlur={(e) => {
                              setIsFocused(false);
                              setHasValue(e.target.value.length > 0);
                        }}
                        onChange={handleChange}
                        {...props}
                  />
                  <label className="IpPostDiscount-floating-label">{label}</label>
            </div>
      );
};

const FloatingSelect = ({ label, options = [], ...props }) => {
      const [isFocused, setIsFocused] = useState(false);
      const [hasValue, setHasValue] = useState(false);
      return (
            <div className={`IpPostDiscount-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
                  <select
                        className="IpPostDiscount-floating-select"
                        onFocus={() => setIsFocused(true)}
                        onBlur={(e) => {
                              setIsFocused(false);
                              setHasValue(e.target.value !== '');
                        }}
                        onChange={(e) => setHasValue(e.target.value !== '')}
                        {...props}
                  >
                        <option value="">{ }</option>
                        {options.map((option, index) => (
                              <option key={index} value={option.value}>{option.label}</option>
                        ))}
                  </select>
                  <label className="IpPostDiscount-floating-label">{label}</label>
            </div>
      );
};
const IpPostDiscount = () => {
      const [selectedTab, setSelectedTab] = useState("services");
      const [columnWidths, setColumnWidths] = useState({});
      const [netAmount, setNetAmount] = useState(0);
      const [billPaid, setBillPaid] = useState(0);
      const [paidRefund, setPaidRefund] = useState(0);
      const [totalAmount, setTotalAmount] = useState(0)
      const calculateTotals = () => {
            let totalNetAmount = test.reduce((sum, row) => sum + (row.postNetAmt || 0), 0);
            setNetAmount(totalNetAmount);
            let refund = billPaid - totalNetAmount;
            setPaidRefund(refund);
      };
      const [paymentMode, setPaymentMode] = useState("select");
      // const handlePaymentModeChange = (e) => {setPaymentMode(e.target.value);};
      const [test, setTest] = useState([{ sn: 1, serviceName: "Service 1", unitOrDoctor: "Dr. John", netAmt: 500, lessDisc: 10, discAmt: 50 },]);
      const [ipbillno, setipbillno] = useState([]);
      const [selectedTestGridData, setSelectedTestGridData] = useState([])
      const [selectipbillno, setselectedipbillno] = useState([]);
      const ipbillheading = ["orderPrescid", "billingUser", "total"]
      const [activePopup, setActivePopup] = useState(null);
      const [ortherdetail, setOtherDetail] = useState([])
      const handleInputpostChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                  ...formData,
                  [name]: value,
            });
      };
      const [formData, setFormData] = useState({
            id: "",
            ipAdmmissionId: "",
            mrNo: "",
            patientName: "",
            age: "",
            gender: "",
            address: "",
            bedNo: "",
            consultantDoctor: "",
            payType: "",
            dateOfAdmission: "",
            timeOfAdmission: "",
            dateOfDischarge: "",
            timeOfDischarge: "",
            insuranceCompany: "",
            billPaid: "",
            fileCharges: "",
            paymode: "",
            chequeDate: "",
            remarks: "",

      })
      useEffect(() => {
            fetcheipbilldetails();
            fetcheautherity();
      }, []);
      const fetcheipbilldetails = async () => {
            try {
                  const response = await fetch(`${API_BASE_URL}/ipbillings`);
                  if (!response.ok) {
                        throw new Error("Failed to fetch request details");
                  }
                  const data = await response.json();
                  setipbillno(data); // Update the state with the fetched data
            } catch (error) {
                  console.error("Error fetching request details:", error);
            }
      };
      const fetcheautherity = async () => {
            try {
                  const response = await fetch(`${API_BASE_URL}/discount-authorities`);
                  if (!response.ok) {
                        throw new Error("Failed to fetch request details");
                  }
                  const data = await response.json();
                  setdiscAuthority(data); // Update the state with the fetched data
            } catch (error) {
                  console.error("Error fetching request details:", error);
            }
      };
      const [discAuthority, setdiscAuthority] = useState([]);
      const [selecteddiscAuthority, setSelecteddiscAuthority] = useState(null);
      const [discountPercentage, setDiscountPercentage] = useState(0); // Initial discount is 0
      const [discountAmount, setDiscountAmount] = useState(0); // Discount amount to be calculated
      const [oternetAmount, setOtherNetAmount] = useState(totalAmount); // Net amount (after discount)
      const [othrediscount, setotherdiscount] = useState(0);

      const handleDiscountOtherChange = (e) => {
            const discount = parseFloat(e.target.value) || 0;
            setDiscountPercentage(discount);
            const calculatedDiscountAmount = (discount / 100) * totalAmount;
            const calculatedNetAmount = totalAmount - calculatedDiscountAmount;
            setDiscountAmount(calculatedDiscountAmount);
            setOtherNetAmount(calculatedNetAmount);
      };
      const getPopupData = () => {
            if (activePopup === "ipbillno") {
                  return { columns: ipbillheading, data: ipbillno };
            }
            else if (activePopup === "discountAuthority") {
                  return {
                        columns: ["id", "authorizationName"],
                        data: discAuthority,
                  };
            }
            else {
                  return { columns: [], data: [] };
            }
      };
      const { columns, data } = getPopupData();
      const handleSelect = (selectedData) => {
            console.log(selectedData);
            if (activePopup === "ipbillno") {
                  const testGridData = Array.isArray(selectedData?.testGridIpdBill)
                        ? selectedData.testGridIpdBill.map((item) => ({
                              serviceName: item?.serviceDetailsDTO?.serviceName || "",
                              rate: item?.rate || "",
                              quantity: item?.quantity || "",
                              isEmergency: item?.isEmergency ? "Yes" : "No",
                              emergencyAmt: item?.emergencyAmt || "",
                              doctorPercentage: item?.doctorPercentage || "",
                        }))
                        : [];
                  setSelectedTestGridData(testGridData);
                  setselectedipbillno({
                        ...formData,
                        id: selectedData?.id || "",
                        ipAdmmissionId: selectedData?.ipAdmission?.ipAdmmissionId || "",
                        mrNo: selectedData?.ipAdmission?.patient?.patient?.uhid || "",
                        patientName: selectedData?.ipAdmission?.patient?.patient?.firstName || "",
                        age: selectedData?.ipAdmission?.patient?.patient?.age || "",
                        gender: selectedData?.ipAdmission?.patient?.patient?.gender || "",
                        address: selectedData?.ipAdmission?.patient?.patient?.address || "",
                        bedNo: selectedData?.ipAdmission?.roomDetails?.bedDTO?.bedNo || "",
                        consultantDoctor: selectedData?.ipAdmission?.admissionUnderDoctorDetail?.consultantDoctor?.doctorName || "",
                        payType: selectedData?.ipAdmission?.roomDetails?.payTypeDTO?.payTypeName || "",
                        dateOfAdmission: selectedData?.ipAdmission?.admissionDate || "",
                        timeOfAdmission: selectedData?.ipAdmission?.admissionTime || "",

                  });
                  setFormData((prevFormData) => ({
                        ...prevFormData,
                        dateOfDischarge: selectedData?.ipAdmission?.dischargeDate || "",
                        timeOfDischarge: selectedData?.ipAdmission?.dischargeTime || "",
                        insuranceCompany: selectedData?.ipAdmission?.insuranceDetails?.companyName || "",
                  }));
            } else if (activePopup === "discountAuthority") {
                  setSelecteddiscAuthority({
                        id: selectedData.id,
                        authorizationName: selectedData.authorizationName,
                        discountPercentage: selectedData.discountPercentage
                  });
            }
            console.log("selected discount authority", selecteddiscAuthority)
            setActivePopup(null);
      };
      const handleInputChange = (index, event) => {
            const { name, value } = event.target;
            const postDiscPer = value === "" ? "" : parseFloat(value) || 0;

            console.log(postDiscPer);

            setSelectedTestGridData((prevRows) => {
                  const updatedRows = prevRows.map((row, idx) =>
                        idx === index
                              ? {
                                    ...row,
                                    [name]: postDiscPer,
                                    discountAmount: ((postDiscPer / 100) * (row.rate || 0) * (row.quantity || 1)),
                                    netAmount: ((row.rate || 0) * (row.quantity || 1) - (postDiscPer / 100) * (row.rate || 0) * (row.quantity || 1))
                              }
                              : row
                  );
                  return updatedRows;
            });
      };

      const handleDiscountChange = (index, event) => {
            const { name, value } = event.target;
            const discountPercentage = value === "" ? "" : parseFloat(value) || 0;
            setSelectedTestGridData((prevRows) => {
                  const updatedRows = prevRows.map((row, idx) =>
                        idx === index
                              ? {
                                    ...row,
                                    [name]: discountPercentage,
                                    discountAmount: ((discountPercentage / 100) * (row.rate || 0) * (row.quantity || 1)),
                                    netAmount: ((row.rate || 0) * (row.quantity || 1) - ((discountPercentage / 100) * (row.rate || 0) * (row.quantity || 1)))
                              }
                              : row
                  );
                  return updatedRows;
            });
      };

      const handleCheckboxChange = (index) => (e) => {
            const isChecked = e.target.checked;
            setSelectedTestGridData((prevRows) => {
                  const updatedRows = [...prevRows];
                  console.log(updatedRows);

                  updatedRows[index] = { ...updatedRows[index], isChecked };

                  // Calculate total netAmount only for checked rows
                  const total = updatedRows
                        .filter(row => row.isChecked)
                        .reduce((sum, row) => sum + (parseFloat(row.netAmount) || 0), 0);

                  // Calculate total postDiscPer only for checked rows
                  const otherDisc = updatedRows
                        .filter(row => row.isChecked)
                        .reduce((sum, row) => {
                              console.log("Row postDiscPer:", row.postdiscPer); // Log each postDiscPer value
                              return sum + (parseFloat(row.postdiscPer) || 0);
                        }, 0);

                  console.log("Final Other Discount:", otherDisc); // Log the final calculated discount


                  console.log("Total Amount:", total);
                  console.log("Other Discount:", otherDisc);

                  setotherdiscount(otherDisc);
                  setTotalAmount(total);

                  return updatedRows;
            });
      };



      const handleNetAmountChange = (index) => (e) => {
            const netAmt = parseFloat(e.target.value) || 0;
            const disc = parseFloat(e.target.value) || 0;

            setipbillno((prevRows) => {
                  const updatedRows = [...prevRows];
                  updatedRows[index] = { ...updatedRows[index], netAmount: netAmt };
                  updatedRows[index] = { ...updatedRows[index], postDiscPer: disc };
                  return updatedRows;
            });
      };
      console.log(othrediscount);



      useEffect(() => {
            calculateTotals();
      }, [test, billPaid]);


      // Use the calculated values



      const calculateDiscountedTotal = (totalAmount, othrediscount, selecteddiscAuthority) => {
            // Get the correct discount percentage
            const discountPercentage = othrediscount <= (selecteddiscAuthority?.discountPercentage || 0)
                  ? othrediscount
                  : (selecteddiscAuthority?.discountPercentage || 0);

            // Calculate the discount amount
            const discountAmount = (discountPercentage / 100) * totalAmount;

            // Calculate the net amount after applying the discount
            const netAmount = totalAmount - discountAmount;

            console.log("Selected Discount Percentage:", discountPercentage);
            console.log("Total Amount Before Discount:", totalAmount);
            console.log("Discount Amount:", discountAmount);
            console.log("Net Amount After Discount:", netAmount);

            return { discountPercentage, discountAmount, netAmount };
      };

      const updateDiscount = () => {
            const { discountPercentage, discountAmount, netAmount } = calculateDiscountedTotal(
                  totalAmount,
                  othrediscount,
                  selecteddiscAuthority
            );

            // Set the calculated discount values to state
            setDiscountPercentage(discountPercentage);
            setDiscountAmount(discountAmount);
            setOtherNetAmount(netAmount);
      };
      useEffect(() => {
            updateDiscount();
      }, [totalAmount, othrediscount, selecteddiscAuthority]);
      {
            activePopup && (
                  <PopupTable
                        columns={columns}
                        data={data}
                        onSelect={handleSelect}
                        onClose={() => setActivePopup(false)} />
            )
      }
      const tableRef = useRef(null);
      const renderTable = () => {
            if (selectedTab === "testGrid") {
                  return (
                        <div className="IpDPostDiscount-services-table">
                              <table ref={tableRef}>
                                    <thead>
                                          <tr>
                                                {[
                                                      "Actions", "SN", "Post Disc Per", "Service Name", "Rate", "Quantity", "Is Emergency",
                                                      "Discount Amount", "Net Amt", "Emergency Amt", "Doctor Percentage"
                                                ].map((header, index) => (
                                                      <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                                                            <div className="header-content">
                                                                  <span>{header}</span>
                                                                  <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                                                            </div>
                                                      </th>
                                                ))}
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {selectedTestGridData.length > 0 && selectedTestGridData.map((row, index) => (
                                                <tr key={index}>
                                                      <td>
                                                            <input
                                                                  type="checkbox"
                                                                  checked={row.isChecked}
                                                                  onChange={handleCheckboxChange(index)}
                                                            />
                                                      </td>
                                                      <td>{index + 1}</td>
                                                      <td>
                                                            <input
                                                                  type="number"
                                                                  name='postdiscPer'
                                                                  value={row.postdiscPer}
                                                                  onChange={(e) => handleInputChange(index, e)}
                                                            />
                                                      </td>
                                                      <td>{row.serviceName}</td>
                                                      <td>{row.rate || ""}</td>
                                                      <td>{row.quantity || ""}</td>
                                                      <td>{row.isEmergency}</td>
                                                      {/* Discount Amount - Auto Calculated */}
                                                      <td><input type="text" name="discountAmount" value={row.discountAmount} /> </td>
                                                      <td>
                                                            <input
                                                                  type="number"
                                                                  value={row.netAmount || 0}
                                                                  onChange={handleNetAmountChange(index)}
                                                            />
                                                      </td>
                                                      <td>{row.emergencyAmt || ""}</td>
                                                      <td>{row.doctorPercentage || ""}</td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                  );
            }
            return null;
      };
      const postDiscountData = async () => {
            // Prepare the data to be sent
            const discountData = {
                  postdiscPer: selectipbillno.postDiscPer, // Assuming you have the discount percentage in state
                  discountDate: formData.dateOfDischarge, // Use the actual date as needed
                  discountTime: formData.timeOfDischarge, // Use the actual time as needed
                  billPaid: formData.billPaid, // Use the actual status
                  fileCharges: formData.fileCharges, // Use the actual value
                  paymode: formData.paymode, // Use the actual payment mode
                  chequeDate: formData.chequeDate, // Use the actual cheque date
                  remarks: formData.remarks,
                  discountAuthorityDTO: {
                        id: selecteddiscAuthority?.id
                  },
                  ipBillingDTO: {
                        id: selectipbillno?.ipAdmmissionId  // Assuming this is the ID of the IP billing
                  },
                  dateOfDischarge: formData.dateOfDischarge, // Use the actual discharge date
                  insuranceCompany: formData.insuranceCompany, // Use the actual insurance company name
            };

            console.log("final payload", discountData)
            try {
                  const response = await fetch(`${API_BASE_URL}/ipd-post-discount`, {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(discountData),
                        // body: JSON.stringify({ authorityId: selectedId }),
                  });

                  if (response.ok) {
                        console.log('Data posted successfully...');
                  } else {
                        console.error('Failed to post data:', response.status);
                  }
            } catch (error) {
                  console.error('Error posting data:', error);
            }
      };

      return (
            <>
                  <div className='IpPostDiscount-container'>
                        <div className='IpPostDiscount-section'>
                        </div>
                        <div className='IpPostDiscount-section'>
                              <div className="IpPostDiscount-header">Patients Details</div>
                              <div className="IpPostDiscount-grid">
                                    <div className="IpPostDiscount-search-field">
                                          <FloatingInput label="IP Bill NO." value={formData?.id} />
                                          <button className="IpPostDiscount-search-icon" onClick={() => setActivePopup("ipbillno")}>
                                                <svg viewBox="0 0 24 24" width="16" height="16">
                                                      <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
                                                </svg>
                                          </button>
                                    </div>
                                    <div className="IpPostDiscount-search-field">
                                          <FloatingInput label="IP No." name="" value={selectipbillno?.ipAdmmissionId || ""} />
                                          <button className="IpPostDiscount-search-icon">
                                                <svg viewBox="0 0 24 24" width="16" height="16">
                                                      <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
                                                </svg>
                                          </button>
                                    </div>
                                    <FloatingInput label="MR No" name='' value={selectipbillno?.mrNo} />
                                    <FloatingInput label="Patient Name " value={selectipbillno?.patientName} />
                                    <FloatingInput label="Age " type='number' value={selectipbillno?.age} />

                                    <FloatingSelect value={selectipbillno?.gender}
                                          label="Gender"
                                          options={[
                                                { value: 'male', label: 'Male' },
                                                { value: 'female', label: 'Female' },
                                                { value: 'other', label: 'Other' }
                                          ]}
                                    />
                                    <FloatingInput label="Address" value={selectipbillno?.address} />
                                    <FloatingInput label="Bed No " value={selectipbillno?.bedNo} />
                                    <FloatingInput label="Consultant Doctor " value={selectipbillno?.consultantDoctor} />
                                    <FloatingInput label="Pay Type " value={selectipbillno?.payType} />
                                    <FloatingInput label="Date of Admission" type='text' value={selectipbillno?.dateOfAdmission} />
                                    <FloatingInput label="Time of Admission " type='text' value={selectipbillno?.timeOfAdmission} />
                                    <FloatingInput label="Date of Discharge" name='dateOfDischarge' type='date' value={formData.dateOfDischarge} onChange={handleInputpostChange} />
                                    <FloatingInput label="Time of Discharge " name='timeOfDischarge' type='time' value={formData.timeOfDischarge} onChange={handleInputpostChange} />
                                    <FloatingInput label="Insurance Company " name='insuranceCompany' value={formData.insuranceCompany} onChange={handleInputpostChange} />
                              </div>
                        </div>
                        <div className="IPDPostDiscount-services-section">
                              <div className="IPDPostDiscount-tab-bar">
                                    <button
                                          className={`iPDPostDiscount-tab ${selectedTab === "testGrid" ? "active" : ""}`}
                                          onClick={() => setSelectedTab("testGrid")}
                                    >
                                          Test Grid
                                    </button>
                              </div>
                              {renderTable()}
                        </div>
                        <div className="IpPostDiscount-section">
                              <div className="IpPostDiscount-header">Other Details</div>
                              <div className="IpPostDiscount-grid">
                                    <FloatingInput label="Total Amount" value={totalAmount} readOnly />
                                    <FloatingInput
                                          label="Discount"
                                          value={othrediscount} // Beind to the discount percentage state
                                          // onChange={handleDiscountOtherChange} 
                                          type="number"
                                    />
                                    <FloatingInput label="Disc Amount" value={discountAmount} />
                                    <FloatingInput label="Net Amount" value={oternetAmount} readOnly />
                                    <FloatingInput
                                          label="Bill Paid"
                                          type="text"
                                          name='billPaid'
                                          value={formData.billPaid}
                                          onChange={handleInputpostChange} // Update billPaid value
                                    />
                                    <FloatingInput
                                          label="Paid/Refund"
                                          value={paidRefund.toFixed(2)} // Show calculated refund/paid amount
                                          readOnly
                                    />
                                    <div className="IpPostDiscount-search-field">
                                          <FloatingInput label="Disc Authority" value={selecteddiscAuthority?.authorizationName || ''} />
                                          <button
                                                onClick={() => setActivePopup("discountAuthority")}
                                                className="IpPostDiscount-search-icon"
                                          >
                                                <svg viewBox="0 0 24 24" width="16" height="16">
                                                      <path
                                                            fill="currentColor"
                                                            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                                                      />
                                                </svg>
                                          </button>
                                    </div>
                                    <FloatingInput label="Discount %" value={selecteddiscAuthority?.discountPercentage || ''} />
                                    <FloatingInput label="Disc Remarks" name='remarks' value={formData.remarks} onChange={handleInputpostChange} />
                                    <FloatingInput label="File Charges" name='fileCharges' value={formData.fileCharges} onChange={handleInputpostChange} />
                                    <FloatingSelect
                                          label="Payment Mode"
                                          value={formData.paymode}
                                          name='paymode'
                                          onChange={handleInputpostChange}
                                          options={[
                                                { value: "select", label: "Select" },
                                                { value: "card", label: "Card" },
                                                { value: "upi", label: "UPI" },
                                                { value: "check", label: "Checkque" },
                                          ]}
                                    // onChange={handlePaymentModeChange}
                                    />
                                    {paymentMode === "card" && (
                                          <>
                                                <FloatingInput label="Amount" />
                                                <FloatingInput label="Card Number" />
                                                <FloatingInput label="Remarks" />
                                          </>
                                    )}
                                    {paymentMode === "upi" && (
                                          <>
                                                <FloatingInput label="Amount" />
                                                <FloatingInput label="UPI" />
                                                <FloatingInput label="Id" />
                                                <FloatingInput label="Remarks" />
                                          </>
                                    )}
                                    {paymentMode === "check" && (
                                          <>
                                                <FloatingInput label="Amount" />
                                                <FloatingInput label="Check Number" />
                                                <FloatingInput label="Check Date" type="date" name="chequeDate" value={formData.chequeDate} onChange={handleInputpostChange} />
                                                <FloatingInput label="Remarks" />
                                          </>
                                    )}
                                    <FloatingInput label="Check Date" type="date" value={formData.chequeDate} onChange={handleInputpostChange} />
                              </div>
                        </div>
                        <div className="IPDPostDiscount-buttons">
                              <button className="btn-blue" onClick={postDiscountData}>Save</button>
                              <button className="btn-red">Close</button>
                        </div>
                        {activePopup && (
                              <PopupTable
                                    columns={columns}
                                    data={data}
                                    onSelect={handleSelect}
                                    onClose={() => setActivePopup(false)}
                              />
                        )}
                  </div></>
      );
};
export default IpPostDiscount