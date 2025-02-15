import React, { useState, useEffect } from "react";
import "../DisSales/dispenSalesSales.css";
import AddExternalReferral from "./dispenSalesSales1AER";
import AddNewPatient from "./dispenSalesSalesAddNewPatient";
import DispenSalessalesStockDetails from "./dispenSalessalesStockDetails";
import DispenSalesSalesList from "./dispenSalesSalesList";
import DispenSalesReturnFromCust from "./dispenSalesReturnFromCust";
import DispenSalesRetunSalesList from "./dispenSalesRetunSalesList";
import DispenSalesProvisionalBill from "./dispenSalesProvisionalBill";
import DispenSalesProvisionalSettelment from "./dispenSalesProvisionalSettelment";
import DispenSalesProvisionalReturn from "./dispenSalesProvisionalReturn";
import axios from "axios";
import "./DropdownWithSearch.css";
import { API_BASE_URL } from "../../api/api";
import SalesInvoice from "./SalesInvoice";
import CustomModal from "../../../CustomModel/CustomModal";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";

const SalesSales = () => {
  const [showExternalPopup, setShowExternalPopup] = useState(false);
  const [showPatientPopup, setShowPatientPopup] = useState(false);
  const [showStockDetailsPopup, setShowStockDetailsPopup] = useState(false); // State for stock details popup
  const [activeTab, setActiveTab] = useState("Sale");
  const [patients, setPatients] = useState([]); // State to store patients data
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedPatientInfo, setSelectedPatientInfo] = useState(null); // State to store selected patient info

  const [searchTerm, setSearchTerm] = useState("");
  const [options] = useState([patients.firstName]);

  const [quantity, setQuantity] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalSubTotal, setTotalSubTotal] = useState(0);

  const [totalAmount, setTotalAmount] = useState("");
  const [tender, setTender] = useState("");
  const [change, setChange] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentOption, setPaymentOption] = useState("Cash");

  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const handleClose = () => setShowInvoice(false);

  const [medicines, setMedicines] = useState([{}]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  const fetchInvoiceData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/patient-invoices`);
      console.log("API Response:", response.data);
      setInvoiceData(response.data);
      // Ensure API response matches expected structure
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  };

  useEffect(() => {
    fetchInvoiceData();
    fetchMedicineDetails();
  }, []);

  const handlePrint = () => {
    console.log("Printing Invoice...");
    // Add print logic here
  };

  const handleShowInvoice = () => setShowInvoice(true);

  const handleMedicineSelect = (selectedMedicine) => {
    // Update formData with the selected medicine details
    setFormData({
      ...formData,
      medicineId: selectedMedicine.medicineId,
      medicineName: selectedMedicine.medicineName,
      genericName: selectedMedicine.genericName,
      expiry: selectedMedicine.expiryDate,
      batch: selectedMedicine.batchNumber,
      availableQty: selectedMedicine.availableQty,
      salePrice: selectedMedicine.salePrice,
      qty: "", // Clear quantity for new selection
      subTotal: "", // Clear subtotal for new selection
    });

    // Clear the suggestions after selection
    setFilteredMedicines([]);
  };
  const fetchMedicineDetails = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/hospital/fetch-medicine-details`
      );
      // Store the entire API response in `medicines`
      setMedicines(response.data || []);
    } catch (error) {
      console.error("Error fetching medicine details:", error);
      alert("Failed to fetch medicine details. Please try again.");
    }
  };

  // console.log(medicines)
  const handlePrintInvoice = async () => {
    const invoiceData = tableData.map((item) => ({
      storeMedId: item.medicineId,
      genericName: item.genericName,
      medicineName: item.medicineName,
      expiry: item.expiry,
      batch: item.batch,
      availableQty: parseInt(item.availableQty, 10),
      qty: parseInt(item.qty, 10),
      salePrice: parseFloat(item.salePrice),
      subTotal: parseFloat(item.subTotal),
    }));
    console.log(invoiceData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/persons/${selectedPatientId}/medicines`,
        invoiceData
      );

      if (response.status === 200 || response.status === 201) {
        alert("Invoice Printed Successfully!");
        setInvoiceData(response.data);
        console.log(response.data); // Corrected from response.body to response.data
        // setShowInvoice(true);
        console.log("Response Data:", response.data);
      } else {
        alert("Failed to print the invoice. Please try again.");
      }
    } catch (error) {
      console.error("Error posting invoice:", error);
      alert("Error occurred while printing invoice.");
    }
  };

  const [formData, setFormData] = useState({
    medicineId: "", // Add this line for medicineId
    genericName: "",
    medicineName: "",
    expiry: "",
    batch: "",
    availableQty: "",
    qty: "",
    salePrice: "",
    subTotal: "",
  });

  const [tableData, setTableData] = useState([]);

  // Add row to table
  const addRowToTable = () => {
    setTableData([...tableData, formData]);
    // Clear the input fields after adding
    setFormData({
      medicineId: "",
      genericName: "",
      medicineName: "",
      expiry: "",
      batch: "",
      availableQty: "",
      qty: "",
      salePrice: "",
      subTotal: "",
    });
  };

  const [ccCharge, setCcCharge] = useState(50);

  const [items, setItems] = useState([
    {
      medicineId: "",
      genericName: "",
      genericItemName: "",
      genericCode: "",
      genericQty: "",
      availableQty: "",
      requestingQuantity: "",
      genericRemark: "",
    },
  ]);

  const calculateSubTotal = () => {
    return tableData.reduce(
      (total, row) => total + parseFloat(row.subTotal || 0),
      0
    );
  };

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;

    // Update formData
    let updatedFormData = { ...formData, [name]: value };

    if (name === "medicineName") {
      // Filter medicines based on the typed value for autocomplete
      const filtered = medicines.filter((medicine) =>
        medicine.medicineName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMedicines(filtered);
    } else if (name === "qty" || name === "salePrice") {
      // Calculate subtotal dynamically
      const qty = parseFloat(updatedFormData.qty) || 0;
      const salePrice = parseFloat(updatedFormData.salePrice) || 0;
      updatedFormData.subTotal = (qty * salePrice).toFixed(2);
    }

    // Update the formData state
    setFormData(updatedFormData);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;

    setFormData({ ...formData, [name]: value });
    setItems(newItems);
  };

  const handleRemoveRow = (indexToRemove) => {
    const updatedTableData = tableData.filter(
      (_, index) => index !== indexToRemove
    );
    setTableData(updatedTableData);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        medicineId: "",
        genericName: "",
        genericItemName: "",
        genericCode: "",
        genericQty: "",
        availableQty: "",
        requestingQuantity: "",
        genericRemark: "",
      },
    ]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/patient-register/get-all`)
      .then((response) => {
        const patientData = response.data.map((patient) => ({
          uhid: patient?.patient?.uhid,
          firstName: patient?.patient?.firstName,
          middleName: patient?.patient?.middleName,
          lastName: patient?.patient?.lastName,
          gender: patient?.patient?.gender,
          age: patient?.patient?.age,
          phoneNumber: patient?.patient?.phoneNumber,
          address: patient?.patient?.address,
          country: patient?.patient?.country,
          pinCode: patient?.patient?.pinCode,
          department: patient?.patient?.department,
        }));
        setPatients(patientData);
        console.log("patient data", patientData);
      })
      .catch((error) => {
        console.error("Error fetching patients data:", error);
      });

    setTotalSubTotal(calculateSubTotal());
  }, [tableData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/add-items`);
        const items = response.data;

        const generics = items.map((item) => item.genericNameDTO.genericName);
        const medicines = items.map((item) => item.itemName);

        setGenericNames([...new Set(generics)]); // Avoid duplicates
        setMedicineNames([...new Set(medicines)]);
        setCcCharge(items[0]?.ccCharge || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedPatientId) {
      const patient = patients.find(
        (p) => p.outPatientId === parseInt(selectedPatientId)
      );
      setSelectedPatientInfo(patient);
    }
  }, [selectedPatientId, patients]);

  useEffect(() => {
    setSubtotal(ccCharge * quantity);
  }, [ccCharge, quantity]);

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.firstName} ${patient.middleName || ""} ${
      patient.lastName
    }`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      (patient.uhid && patient.uhid.toString().includes(searchTerm))
    );
  });

  console.log(options);

  const handleExternalPopupOpen = () => {
    setShowExternalPopup(true);
  };

  const handleExternalPopupClose = () => {
    setShowExternalPopup(false);
  };

  const handlePatientPopupOpen = () => {
    setShowPatientPopup(true);
  };

  const handlePatientPopupClose = () => {
    setShowPatientPopup(false);
  };
  const handleStockDetailsPopupOpen = () => {
    setShowStockDetailsPopup(true);
  };

  const handleStockDetailsPopupClose = () => {
    setShowStockDetailsPopup(false);
  };
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="dispenSalesSales-sales-container">
      <div className="dispenSalesSales-header">
        <div className="dispenSalesSales-tabs">
          <div
            className={`dispenSalesSales-tab ${
              activeTab === "Sale" ? "dispenSalesSales-tab-active" : ""
            }`}
            onClick={() => handleTabClick("Sale")}
          >
            Sale
          </div>
          <div
            className={`dispenSalesSales-tab ${
              activeTab === "Sale List" ? "dispenSalesSales-tab-active" : ""
            }`}
            onClick={() => handleTabClick("Sale List")}
          >
            Sale List
          </div>
          <div
            className={`dispenSalesSales-tab ${
              activeTab === "Return From Customer"
                ? "dispenSalesSales-tab-active"
                : ""
            }`}
            onClick={() => handleTabClick("Return From Customer")}
          >
            Return From Customer
          </div>
          <div
            className={`dispenSalesSales-tab ${
              activeTab === "Return Sale List"
                ? "dispenSalesSales-tab-active"
                : ""
            }`}
            onClick={() => handleTabClick("Return Sale List")}
          >
            Return Sale List
          </div>
        </div>
      </div>
      {activeTab === "Sale" ? (
        <>
          <div className="dispenSalesSales-patient-info">
            <div className="dispenSalesSales-patient-search">
              <FloatingInput
                label={"Search Patient"}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="dispenSalesSales-patient-input"
              />
              {filteredPatients.length > 0 && searchTerm && (
                <div className="dispenSalesSales-dropdown">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.uhid}
                      onClick={() => {
                        setSelectedPatientId(patient.uhid);
                        setSelectedPatientInfo(patient); // Set selected patient info directly
                        setSearchTerm(
                          `${patient?.firstName} ${patient?.lastName}`
                        ); // Set search term to patient's name
                      }}
                      className="dispenSalesSales-dropdown-option"
                    >
                      {`${patient?.firstName} ${patient?.lastName} - UHID: ${patient?.uhid}`}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="dispenSalesSales-doctor-info"></div>
            {showPatientPopup && (
              <div className="salesAddNewPatient-popup-overlay">
                <AddNewPatient onClose={handlePatientPopupClose} />
              </div>
            )}
            {/* Conditionally render the DispenSalessalesStockDetails popup */}
            {showStockDetailsPopup && (
              <div className="salesStockDetails-popup-overlay">
                <DispenSalessalesStockDetails />
                <button
                  onClick={handleStockDetailsPopupClose}
                  className="dispenSalessalesStockDetails-close-popup-btn"
                >
                  X
                </button>
              </div>
            )}
          </div>

          <div className="dispenSalesSales-hospital-info">
            {selectedPatientInfo && (
              <div className="dispenSalesSales-hospital-info">
                <div className="dispenSalesSales-hospital-info-subDiv">
                  <div>UHID: {selectedPatientInfo.uhid}</div>
                  <div>
                    Name:{" "}
                    {`${selectedPatientInfo.firstName} ${selectedPatientInfo.lastName}`}
                  </div>
                  <div>
                    Age/Sex: {selectedPatientInfo.age} /{" "}
                    {selectedPatientInfo.gender}
                  </div>
                  <div>Address: {selectedPatientInfo.address}</div>
                  <div>Contact No: {selectedPatientInfo.phoneNumber}</div>
                </div>
              </div>
            )}
            <div className="dispenSalesSales-hospital-info-subDiv">
              <div>
                <FloatingSelect
                  label={"Visit Type"}
                  name="visitType"
                  options={[
                    { value: "", label: "Select Type" },
                    { value: "Out Patient", label: "Out Patient" },
                    { value: "BRITAM", label: "In Patient" },
                  ]}
                />
                <FloatingSelect
                  label={"Membership"}
                  name="membership"
                  options={[
                    { value: "", label: "Select Membership" },
                    { value: "Astra", label: "Astra" },
                    { value: "BRITAM", label: "BRITAM" },
                    { value: "General", label: "General" },
                    { value: "ABC", label: "ABC" },
                    { value: "XYZ", label: "XYZ" },
                    { value: "PQR", label: "PQR" },
                    { value: "SVT", label: "SVT" },
                  ]}
                />
                <FloatingSelect
                  label={"Price Category"}
                  name="priceCategory"
                  options={[
                    { value: "", label: "Select Category" },
                    { value: "Normal", label: "Normal" },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="dispenSalesSales-medicineInfo-N-paymentSection">
            <div className="dispenSalesSales-medicineInfo-N-invoiceSummary">
              <div className="dispenSalesSales-medicine-info">
                <div className="dispenSalesSales-medicine-info">
                  <FloatingInput
                    label={"Drug/Medicine Name"}
                    type="text"
                    name="medicineName"
                    value={formData.medicineName}
                    onChange={handleInputChange1}
                    placeholder="--Select Medicine--"
                    required
                  />

                  {/* Suggestions Dropdown */}
                  {filteredMedicines.length > 0 && (
                    <ul className="suggestions-dropdown">
                      {filteredMedicines.map((medicine, index) => (
                        <li
                          key={index}
                          onClick={() => handleMedicineSelect(medicine)}
                          className="suggestion-item"
                        >
                          {medicine.medicineName}
                        </li>
                      ))}
                    </ul>
                  )}
                  <FloatingInput
                    label={"Generic Name"}
                    type="text"
                    name="genericName"
                    value={formData.genericName}
                    readOnly
                  />
                  <FloatingInput
                    label={"Expiry"}
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    readOnly
                  />
                  <FloatingInput
                    label="Batch"
                    type="text"
                    name="batch"
                    value={formData.batch}
                    readOnly
                  />
                  <FloatingInput
                    label="Available Quantity"
                    type="text"
                    name="availableQty"
                    value={formData.availableQty}
                    readOnly
                  />
                  <FloatingInput
                    label="Quantity"
                    type="number"
                    name="qty"
                    value={formData.qty}
                    onChange={handleInputChange1}
                    min="0"

                  />
                  <FloatingInput
                    label="Sale Price"
                    type="text"
                    name="salePrice"
                    value={formData.salePrice}
                    readOnly
                  />
                  <FloatingInput
                    label="SubTotal"
                    type="text"
                    name="subTotal"
                    value={formData.subTotal}
                    readOnly
                  />
                  <button
                    className="dispenSalesSales-add-button"
                    onClick={() => addRowToTable()}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Invoice Summary Table */}
              <div className="dispenSalesSales-invoice-summary">
                <table>
                  <thead>
                    <tr>
                      <th>Medicine ID</th>
                      <th>Generic Name</th>
                      <th>Medicine Name</th>
                      <th>Expiry</th>
                      <th>Batch</th>
                      <th>Available Qty</th>
                      <th>Qty</th>
                      <th>Sale Price</th>
                      <th>SubTotal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.medicineId}</td>
                        <td>{row.genericName}</td>
                        <td>{row.medicineName}</td>
                        <td>{row.expiry}</td>
                        <td>{row.batch}</td>
                        <td>{row.availableQty}</td>
                        <td>{row.qty}</td>
                        <td>{row.salePrice}</td>
                        <td>{row.subTotal}</td>
                        <td>
                          <button className="dispenSalesSales-print-button">
                            Edit
                          </button>
                          <button
                            onClick={() => handleRemoveRow(index)}
                            className="dispenSalesSales-remove-button"
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="dispenSalesSales-payment-section">
              <div className="dispenSalesSales-payment-summary">
                <div className="dispenSalesSales-payment-summary-subDiv">
                  <FloatingInput
                    label={"Sub Total"}
                    type="text"
                    value={totalSubTotal.toFixed(2)}
                    readOnly
                  />
                  <FloatingInput
                    label={"Total Amount"}
                    type="text"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    placeholder="0"
                  />
                  <FloatingInput
                    label={"In Words"}
                    type="text"
                    value="Only."
                    readOnly
                  />
                  <FloatingSelect
                    label="Payment Options"
                    value={paymentOption}
                    onChange={(e) => setPaymentOption(e.target.value)}
                    options={[
                      { value: "Cash", label: "Cash" },
                      { value: "Credit", label: "Credit" },
                      { value: "Other", label: "Other" },
                    ]}
                  />
                  <FloatingInput
                    label="Tender"
                    type="text"
                    value={tender}
                    onChange={(e) => {
                      setTender(e.target.value);
                      setChange(
                        Math.max(
                          Number(e.target.value) - Number(totalAmount),
                          0
                        )
                      );
                    }}
                    placeholder="0"
                  />
                  <FloatingInput
                    label="Change"
                    type="text"
                    value={`Kshs. ${change.toFixed(2)}`}
                    readOnly
                  />
                  <FloatingInput
                    label="Remarks"
                    type="text"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                  <FloatingInput
                    label="Paid Amount"
                    type="text"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="dispenSalesSales-payment-actions">
                <button onClick={setShowInvoice} className="dispenSalesSales-print-button">Show Invoice</button>

                <button
                  className="dispenSalesSales-print-button"
                  onClick={handlePrintInvoice}
                >
                  Print Invoice
                </button>
                <button className="dispenSalesSales-discard-button">
                  Discard
                </button>
              </div>
            </div>
          </div>

          {showInvoice && (
            <SalesInvoice
              showInvoice={showInvoice}
              handleClose={() => setShowInvoice(false)}
              invoiceData={invoiceData}
              handlePrint={handlePrint}
            />
          )}

          <div className="dispenSalesSales-history-section">
            <div className="dispenSalesSales-invoice-history">
              <h4>Invoice History</h4>
              <div>Deposit Balance: 0</div>
              <div>Credit: 0</div>
              <div>Provisional Amount: 0</div>
              <div>Total Due</div>
              <div>Balance Amount: 0</div>
            </div>
            <div className="dispenSalesSales-credit-limits">
              <h4>Credit Limits and Balances</h4>
              <div>General Credit Limit: 0</div>
              <div>IP Credit Limit: 0</div>
              <div>OP Credit Limit: 0</div>
              <div>IP Balance: 0</div>
              <div>OP Balance: 0</div>
            </div>
          </div>
        </>
      ) : activeTab === "Sale List" ? (
        <DispenSalesSalesList />
      ) : activeTab === "Return From Customer" ? (
        <DispenSalesReturnFromCust />
      ) : activeTab === "Return Sale List" ? (
        <DispenSalesRetunSalesList />
      ) : activeTab === "Provisional Bills" ? (
        <DispenSalesProvisionalBill />
      ) : activeTab === "Settlement" ? (
        <DispenSalesProvisionalSettelment />
      ) : activeTab === "Provisional Return" ? (
        <DispenSalesProvisionalReturn />
      ) : null}
    </div>
  );
};

export default SalesSales;
