import React, { useState, useRef, useEffect } from "react";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import './OPDPostDiscount.css';
import PopupTable from "./PopupTable"
import { API_BASE_URL } from "../../api/api";
import axios from "axios";

const FloatingInput = ({ label, type = "text", ...props }) => {
  const [isFocused, setIsFocused] = useState(true);
  const [hasValue, setHasValue] = useState(false);
  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };
  return (
    <div className={`OPDPostDiscount-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <input
        type={type}
        className="OPDPostDiscount-floating-input"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="OPDPostDiscount-floating-label">{label}</label>
    </div>
  );
};
const FloatingSelect = ({ label, options = [], ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  
  return (
    <div className={`OPDPostDiscount-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <select
        className="OPDPostDiscount-floating-select"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== '');
        }}
        onChange={(e) => setHasValue(e.target.value !== '')}
        {...props}
      >
        <option value="">{}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      <label className="OPDPostDiscount-floating-label">{label}</label>
    </div>
  );
};



// Dhanashree
const OPDPostDiscount = () => {
  const [selectedTab, setSelectedTab] = useState("services");
  const [columnWidths, setColumnWidths] = useState({});
  const [selectedBillNo, setSelectedBillNo] = useState({ opdBillingId: '' });
  const [selectedRow, setSelectedRow] = useState(null); 
  const [serviceDetails, setServiceDetails] = useState([]);
  const [totalPostNetAmt, setTotalPostNetAmt] = useState(0);
  const [calculatedValues, setCalculatedValues] = useState([]);
  const [test, setTest] = useState([{ netAmt: 0, lessDisc: 0, discAmt: 0, postNetAmt: 0 }]);
  const [selectedDiscAuthority, setSelectedDiscAuthority] = useState(null);
  

// Inside the OPDPostDiscount component:

const [netAmount, setNetAmount] = useState(0);
const [billPaid, setBillPaid] = useState(0);
const [paidRefund, setPaidRefund] = useState(0);


const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");

  // Add new state for remarks
  const [discRemarks, setDiscRemarks] = useState("");
  const [paymentRemarks, setPaymentRemarks] = useState("");

  // Add states for payment details
  const [paymentAmount, setPaymentAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [checkDate, setCheckDate] = useState("");
  const [fileCharges, setFileCharges] = useState(0);

// State for calculations
const [totalAmount, setTotalAmount] = useState(0);
const [discountPercentage, setDiscountPercentage] = useState(0);
const [discountAmount, setDiscountAmount] = useState(0);

const [discAuthority, setdiscAuthority] = useState([]);

const [selecteddiscAuthority, setSelecteddiscAuthority] = useState(null);








const handleInputChange = (index, field, value) => {
  const updatedRows = [...roomRentTableRows];
  updatedRows[index][field] = value;

  if (field === "rate" || field === "qty") {
    updatedRows[index].totalAmt =
      updatedRows[index].rate * updatedRows[index].qty || 0;
    updatedRows[index].discAmt =
      (updatedRows[index].totalAmt * updatedRows[index].disc) / 100 || 0;
    updatedRows[index].netAmt =
      updatedRows[index].totalAmt - updatedRows[index].discAmt;
  } else if (field === "discountAmount") {
    updatedRows[index].discAmt =
      (updatedRows[index].totalAmt * updatedRows[index].disc) / 100 || 0;
    updatedRows[index].netAmt =
      updatedRows[index].totalAmt - updatedRows[index].discAmt;
  }

  setroomRentTableRows(updatedRows);
};
const calculateTotals = () => {
  const calculatedTotalAmount = billNo.reduce((total, row) => {
    if (!row.isChecked) return total;
    
    return total + (row.testGridOpdBillDTO?.reduce((serviceTotal, item) => {
      const rate = parseFloat(item.rate || 0);
      const quantity = parseFloat(item.quantity || 0);
      const doctorShare = parseFloat(item.doctorShareAmount || 0);
      
      const serviceNetAmt = (rate * quantity) - doctorShare;
      // Cap the discount percentage at 15%
      const authorityDiscPercent = selecteddiscAuthority?.discountPercentage || 0;
      const cappedDiscPercent = Math.min(authorityDiscPercent, 15);
      const discAmount = (serviceNetAmt * cappedDiscPercent) / 100;
      const postNetAmt = serviceNetAmt - discAmount;
      
      return serviceTotal + postNetAmt;
    }, 0) || 0);
  }, 0);

  setTotalAmount(calculatedTotalAmount);
  
  // Apply the 15% cap to the discount percentage
  const rawDiscPercentage = selecteddiscAuthority?.discountPercentage || 0;
  const cappedDiscPercentage = Math.min(rawDiscPercentage, 15);
  setDiscountPercentage(cappedDiscPercentage);

  // Calculate discount amount using the capped percentage
  const calculatedDiscAmount = (calculatedTotalAmount * cappedDiscPercentage) / 100;
  setDiscountAmount(calculatedDiscAmount);

  const calculatedNetAmount = calculatedTotalAmount - calculatedDiscAmount + (parseFloat(fileCharges) || 0);
  setNetAmount(calculatedNetAmount);

  const calculatedPaidRefund = billPaid - calculatedNetAmount;
  setPaidRefund(calculatedPaidRefund);
};






  // Handle file charges change
  const handleFileChargesChange = (e) => {
    const charges = parseFloat(e.target.value) || 0;
    setFileCharges(charges);
  };

 // Handle bill paid change
 const handleBillPaidChange = (e) => {
  const paid = parseFloat(e.target.value) || 0;
  setBillPaid(paid);
};
  // Handle test grid row changes
  const handleTestGridChange = (index, field, value) => {
    setTest(prevTest => {
      const updatedTest = [...prevTest];
      updatedTest[index] = {
        ...updatedTest[index],
        [field]: parseFloat(value) || 0
      };

      // Calculate row totals
      if (field === 'netAmt' || field === 'lessDisc') {
        const netAmt = updatedTest[index].netAmt || 0;
        const lessDisc = Math.min(updatedTest[index].lessDisc || 0, 15); // Cap at 15%
        const discAmt = (netAmt * lessDisc) / 100;
        const postNetAmt = netAmt - discAmt;

        updatedTest[index] = {
          ...updatedTest[index],
          discAmt,
          postNetAmt,
          lessDisc
        };
      }

      return updatedTest;
    });
  };



  const calculateTotalAmount = () => {
    const total = billNo.reduce((sum, row) => {
      const rowTotal = row.testGridOpdBillDTO?.reduce((subSum, item) => {
        const rate = parseFloat(item.rate || 0);
        const doctorShare = parseFloat(item.doctorShareAmount || 0);
        const discountPercent = parseFloat(row.disc || 0);
        const quantity = item.quantity || 0;

        const netAmt = rate * quantity - doctorShare;
        const discAmt = netAmt * (discountPercent / 100);
        const postNetAmt = netAmt - discAmt;

        return subSum + (row.isChecked ? postNetAmt : 0);
      }, 0);

      return sum + (rowTotal || 0);
    }, 0);

    setTotalAmount(total);
  };


// Calculate totals whenever test data or discount authority changes
useEffect(() => {
  calculateTotals();
}, [test, selecteddiscAuthority, fileCharges]);


const [paymentMode, setPaymentMode] = useState("select");

const handlePaymentModeChange = (e) => {
  setPaymentMode(e.target.value);
};


  const [selectedOption, setSelectedOption] = useState("select");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };


  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // Select all rows
      const newSelectedRows = billNo.filter(
        (row) => !selectedRowIds.includes(row.opdBillingId)
      );
      const updatedSelection = [...selectedRows, ...newSelectedRows];

      setSelectedRows(updatedSelection);
      setSelectedRowIds(updatedSelection.map((row) => row.opdBillingId));

      // Calculate the total amount for the selected rows
      const calculatedTotal = updatedSelection.reduce(
        (acc, item) => acc + (item.netAmount || 0),
        0
      );
      setTotalAmount(calculatedTotal);
    } else {
      // Deselect all rows
      setSelectedRows([]);
      setSelectedRowIds([]);
      setTotalAmount(0);
    }
  };



  // const [test, setTest] = useState([
  //   { sn: 1, serviceName: "Service 1", unitOrDoctor: "Dr. John", netAmt: 500, lessDisc: 10, discAmt: 50 },
  // ]);

  
  

  const handleServiceNameChange = (e, index) => {
    const value = e.target.value;
    setTest((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index].serviceName = value;
      return updatedRows;
    });
  };
  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Function to handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${API_BASE_URL}/opdPostDiscount`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setUploadedFileUrl(data.fileUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };







  const handleSave = async () => {
    // Format the data exactly as required
    const postData = {
      postDiscountPercentage: 17.0, // Fixed value as per requirement
      discountDate: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
      discountTime: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }), // Format: HH:MM in 24-hour format
      remarks: discRemarks || "Discount applied for promotional offer",
      discountAuthorityDTO: {
        id: selecteddiscAuthority?.id
      },
      opdBillingDTO: {
        opdBillingId: selectedBillNo?.opdBillingId
      },
      billPaid: billPaid > 0 ? "Yes" : "No",
      fileCharges: (fileCharges || 50).toFixed(2), // Format: "50.00"
      paymode: paymentMode || "Cash",
      chequeDate: null
    };

    try {
      // Log the request payload for verification
      console.log('Sending data:', JSON.stringify(postData, null, 2));
  
      // Use axios to send the request
      const response = await axios.post(`${API_BASE_URL}/opdPostDiscount`, postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Check the response status
      if (response.status === 200) {
        console.log('Server response:', response.data);
  
        alert("save success");
      } else {
        throw new Error(`Failed with status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data. Please check the console for details.');
    }
};



  const [activePopup, setActivePopup] = useState("")

  const [billNo, setBillNo] = useState([]);

 


  useEffect(() => {
    fetch(`${API_BASE_URL}/opdBilling`)
      .then((response) => response.json())
      .then((data) => {
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
      if (data.length > 0) {
        setSelecteddiscAuthority(data[0]); 
      } 
    })
    .catch((error) => console.error('Error fetching data:', error));
}, []);


  useEffect(() => {
    calculateTotals();
  }, [billNo, selecteddiscAuthority, fileCharges, billPaid]);

  useEffect(() => {
    const total = test.reduce((sum, row) => sum + (row.postNetAmt || 0), 0);
    setTotalPostNetAmt(total);
  }, [test]);

useEffect(() => {
  const total = test.reduce((sum, row) => sum + (row.postNetAmt || 0), 0);
  setTotalPostNetAmt(total);
}, [test]); 

const getPopupData = () => {
  if (activePopup === "billNo") {
    return {
      columns: ["opdBillingId", "opBalanceAmount"],
      data: billNo,
    };
  } else if (activePopup === "discountAuthority") {
    return {
      columns: ["id", "authorizationName"],
      data: discAuthority,
    };
  }
  return { columns: [], data: [] };
};

// Part 1: Checkbox handling and row selection logic
const handleCheckboxChange = (isChecked, rowIndex) => {
  setBillNo(prevRows => {
    const updatedRows = [...prevRows];
    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex],
      isChecked: isChecked
    };
    return updatedRows;
  });

  // This will trigger the useEffect that calls calculateTotals
};

// Add this useEffect to handle all calculations when checkboxes change
useEffect(() => {
  calculateTotalAmounts();
}, [billNo]);

const calculateTotalAmounts = () => {
  let totalNetAmount = 0;
  let totalDiscAmount = 0;
  let weightedDiscountPercent = 0;
  let totalBaseAmount = 0;

  billNo.forEach(row => {
    if (row.isChecked && row.testGridOpdBillDTO) {
      row.testGridOpdBillDTO.forEach(item => {
        const rate = parseFloat(item.rate || 0);
        const quantity = parseFloat(item.quantity || 0);
        const doctorShare = parseFloat(item.doctorShareAmount || 0);
        
        const netAmt = (rate * quantity) - doctorShare;
        const discPercent = parseFloat(item.postDiscPercent || 0);
        const discAmt = (netAmt * discPercent) / 100;
        
        totalNetAmount += netAmt;
        totalDiscAmount += discAmt;
        totalBaseAmount += netAmt;  // For weighted average calculation
        weightedDiscountPercent += (netAmt * discPercent);
      });
    }
  });

  // Calculate weighted average discount percentage
  const avgDiscountPercent = totalBaseAmount > 0 
    ? (weightedDiscountPercent / totalBaseAmount)
    : 0;

  // Update all the related states
  setTotalAmount(totalNetAmount);
  setDiscountAmount(totalDiscAmount);
  setDiscountPercentage(avgDiscountPercent.toFixed(2));
  setNetAmount(totalNetAmount - totalDiscAmount + (parseFloat(fileCharges) || 0));
};









  const handleSelect = (row) => {
    // Update selected row state and autofill selectedBillNo data
    setSelectedRow(row);
    setSelectedBillNo(row); // Use row data to autofill the table
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



// Call this function whenever there is a change in `test` data
useEffect(() => {
  calculateTotals();
}, [test, billPaid]); // Dependencies include `test` and `billPaid`




{activePopup && (
  <PopupTable
    columns={columns}
    data={data}
    onSelect={handleSelect}
    onClose={() => setActivePopup(false)}
/>
)}

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
                      const isChecked = e.target.checked;
                      setBillNo(prevRows =>
                        prevRows.map(row => ({
                          ...row,
                          isChecked
                        }))
                      );
                    }}
                  />
                  <div
                    className="resizer"
                    onMouseDown={startResizing(tableRef, setColumnWidths)(0)}
                  ></div>
                </div>
              </th>
              {["SN", "Rate", "Quantity", "Service Name", "Doctor Share Amount", 
                "Net Amt", "Post Disc Percent", "Disc Amt", "Post Net Amt"
              ].map((header, index) => (
                <th key={index + 1} style={{ width: columnWidths[index + 1] }} className="resizable-th">
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index + 1)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {billNo.map((row, index) =>
              row.testGridOpdBillDTO?.map((item, subIndex) => {
                const rate = parseFloat(item.rate || 0);
                const doctorShare = parseFloat(item.doctorShareAmount || 0);
                const quantity = item.quantity || 0;
                const netAmt = rate * quantity - doctorShare;
                const postDiscPercent = parseFloat(item.postDiscPercent || 0);
                const discAmt = (netAmt * postDiscPercent) / 100;
                const postNetAmt = netAmt - discAmt;

                return (
                  <tr key={`${index}-${subIndex}`}>
                    <td>
                      <input
                        type="checkbox"
                        checked={row.isChecked || false}
                        onChange={(e) => handleCheckboxChange(e.target.checked, index)}
                      />
                    </td>
                    <td>{subIndex + 1}</td>
                    <td>
                      <input type="number" value={rate} readOnly />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          const newQuantity = parseFloat(e.target.value) || 0;
                          setBillNo(prevRows => {
                            const updatedRows = [...prevRows];
                            if (updatedRows[index].testGridOpdBillDTO) {
                              updatedRows[index].testGridOpdBillDTO[subIndex] = {
                                ...updatedRows[index].testGridOpdBillDTO[subIndex],
                                quantity: newQuantity,
                              };
                            }
                            return updatedRows;
                          });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.serviceDetailsDTO?.serviceName || ""}
                        readOnly
                      />
                    </td>
                    <td>{doctorShare.toFixed(2)}</td>
                    <td>{netAmt.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        value={postDiscPercent}
                        onChange={(e) => {
                          let newDiscPercent = Math.min(parseFloat(e.target.value) || 0, 15);
                          setBillNo(prevRows => {
                            const updatedRows = [...prevRows];
                            if (updatedRows[index].testGridOpdBillDTO) {
                              updatedRows[index].testGridOpdBillDTO[subIndex] = {
                                ...updatedRows[index].testGridOpdBillDTO[subIndex],
                                postDiscPercent: newDiscPercent,
                              };
                            }
                            return updatedRows;
                          });
                        }}
                      />
                    </td>
                    <td>{discAmt.toFixed(2)}</td>
                    <td>{postNetAmt.toFixed(2)}</td>
                  </tr>
                );
              })
            )}
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
            <FloatingInput label="Bill No" value={selectedBillNo?.opdBillingId || ''} />
            <button
                onClick={() => setActivePopup("billNo")}
                className="OPDPostDiscount-search-icon"
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                  />
                </svg>
              </button>
            </div>
            <FloatingInput label="MR No" value={selectedBillNo?.outPatientDTO?.patient?.uhid || ''} />
            <FloatingInput label="Mobile No" value={selectedBillNo?.outPatientDTO?.patient?.mobileNumber || ''} />
          </div>
        </div>
        {renderPopup()}
      <div className="OPDPostDiscount-section">
        <div className="OPDPostDiscount-header">Bill Details</div>
        <div className="OPDPostDiscount-grid">
          {/* <FloatingInput label="Name Initial" /> */}
          <FloatingInput label="F Name" value={selectedBillNo?.outPatientDTO?.patient?.firstName || ''}/>
          <FloatingInput label="M Name"value={selectedBillNo?.outPatientDTO?.patient?.middleName || ''} />
          <FloatingInput label="L Name" value={selectedBillNo?.outPatientDTO?.patient?.lastName || ''}/>
          <FloatingInput label="Gender" value={selectedBillNo?.outPatientDTO?.patient?.gender || ''}/>

          <FloatingInput label="Marital Status" value={selectedBillNo?.outPatientDTO?.patient?.maritalStatus || ''}/>
          
          <FloatingInput label="Contact Relation" value={selectedBillNo?.outPatientDTO?.patient?.contactRelation || ''}/>

          <FloatingInput label="Address"value={selectedBillNo?.outPatientDTO?.patient?.address || ''} />
         
                    <FloatingInput label="Birth Date" type='text' value={selectedBillNo?.outPatientDTO?.patient?.dateOfBirth || ''} />

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



        <div className="OPDPostDiscount-section">
        <div className="OPDPostDiscount-header">Attach files</div>
        <div className="OPDPostDiscount-grid">
        <div className="OPDPostDiscount-form-for-file">
        <FloatingInput 
        label="Choose File"
        type="file"
        id="fileInput"
        onChange={handleFileChange}
      />
                    <button 
                      className="OPDPostDiscount-Upload"
                    >
                      Upload
                    </button>
                  </div>
      </div>
      </div>


      <div className="OPDPostDiscount-section">
      <div className="OPDPostDiscount-header">Other Details</div>
      <div className="OPDPostDiscount-grid">
      <FloatingInput
        label="Total Amount"
        value={totalAmount.toFixed(2)}
        readOnly
      />
        
        <FloatingInput
          label="Discount Percentage"
          value={discountPercentage}
          readOnly
        />
        
                {/* <FloatingInput
  label="Disc Amount"
   value={selectedBillNo?.outPatientDTO?.testGridOpdBillDTO?.[1]?.discountAmount || ''}
   value={selectedBillNo?.testGridOpdBillDTO?.discountAmount || ""} 
/> */}

<FloatingInput
          label="Disc Amount"
          value={discountAmount.toFixed(2)}
          readOnly
        />
 <FloatingInput
          label="Net Amount"
          value={netAmount.toFixed(2)}
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
          value={paidRefund.toFixed(2)}
          readOnly
        />   
  <div className="OPDPostDiscount-search-field">
          <FloatingInput
            label="Disc Authority"
            value={selecteddiscAuthority?.authorizationName || ''}
            readOnly
          />
          <button
            onClick={() => setActivePopup("discountAuthority")}
            className="OPDPostDiscount-search-icon"
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
              />
            </svg>
          </button>
        </div>
        <FloatingInput label="Discount %" value={selecteddiscAuthority?.discountPercentage || ''}/>
        <FloatingInput 
        label="Disc Remarks" 
        value={discRemarks}
        onChange={(e) => setDiscRemarks(e.target.value)}
      />
        <FloatingInput
          label="File Charges"
          type="number"
          value={fileCharges}
          onChange={handleFileChargesChange}
        />
        <FloatingSelect
          label="Payment Mode"
          options={[
            { value: "select", label: "Select" },
            { value: "card", label: "Card" },
            { value: "upi", label: "UPI" },
            { value: "check", label: "Checkque" },
          ]}
          onChange={handlePaymentModeChange}
        />
       {paymentMode === "card" && (
        <>
          <FloatingInput 
            label="Amount" 
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
          <FloatingInput 
            label="Card Number" 
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <FloatingInput 
            label="Remarks" 
            value={paymentRemarks}
            onChange={(e) => setPaymentRemarks(e.target.value)}
          />
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
            <FloatingInput label="Check Date" type="date" />
            <FloatingInput label="Remarks" />
          </>
        )}
      
        <FloatingInput label="Check Date" type="date" />
      </div>
    </div>


    </div>

          <div className="OPDPostDiscount-buttons">
          <button className="btn-blue" onClick={handleSave}>Save</button>              <button className="btn-red">Close</button>
            </div>
            </>
  );
};
export default OPDPostDiscount;