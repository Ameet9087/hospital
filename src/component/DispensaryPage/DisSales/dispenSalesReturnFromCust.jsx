/* Ajhar Tamboli dispenSalesReturnFromCust.jsx 19-09-24 */

import axios from "axios"; // Import Axios
import React, { useState } from "react";
import { Calendar, Search } from "lucide-react";
import "../DisSales/dispenSalesReturnFromCust.css";
import SalesInvoice from "./SalesInvoice";
import { API_BASE_URL } from "../../api/api";
const DispenSalesReturnFromCust = () => {
  const [fiscalYear, setFiscalYear] = useState("2024");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [patientName, setPatientName] = useState("");
  const [referenceInvoiceNo, setReferenceInvoiceNo] = useState("");
  const [referenceInvoiceDate, setReferenceInvoiceDate] =useState("08/30/2024");
  const [medicines, setMedicines] = useState([]); // To hold medicine data
  const [invoiceData, setInvoiceData] = useState(); // State to hold invoice data
  const [showInvoice, setShowInvoice] = useState(false); // State to control visibility of SalesInvoice component

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!invoiceNo) {
      alert("Please enter an Invoice Number to search.");
      return;
    }

    try {
      // API call to fetch invoice details
      const response = await axios.get(
        `${API_BASE_URL}/patient-invoices/${invoiceNo}`
      );
      const invoiceData = response.data;

      console.log(invoiceData);

      if (invoiceData) {
        // Update state with response data
        setPatientName(invoiceData.person?.firstName || ""); // Assuming firstName for patient
        setReferenceInvoiceNo(invoiceData.invoiceId || "");
        setReferenceInvoiceDate(invoiceData.invoiceDate || "");
        setMedicines(invoiceData.medicines || []); // Store medicines array
        setInvoiceData(invoiceData); // Set the invoice data
        alert("Invoice found and details updated!");
      } else {
        alert("No invoice found.");
      }
    } catch (error) {
      console.error("Error fetching invoice data:", error);
      alert("Failed to fetch invoice data. Please try again.");
    }
  };
  console.log("------------>", medicines);

  const handleManualReturn = () => {
    // Handle manual return logic
  };

  const handlePrintReceipt = async () => {
    if (!invoiceNo) {
      alert("Please enter an Invoice Number.");
      return;
    }
  var subtot;
    // Filter only medicines with returned quantities greater than 0
    const returnedMedicines = medicines
    .filter((medicine) => Number(medicine.returnedQty) > 0)
    .map((medicine) => ({
      medicineId: medicine.medicineId,  // Extract medicineId
      storeMedId: medicine.storeMedId,  // Extract storeMedId
      qty: medicine.returnedQty,  
      subTotal:medicine.qty * medicine.salePrice      // Use returnedQty as qty
     }));
    
  
    if (returnedMedicines.length === 0) {
      alert("No medicines selected for return.");
      return;
    }
    console.log("return med",returnedMedicines);
  
    try {
      const response = await axios.post(
        `${API_BASE_URL}/patient-invoices/${invoiceNo}/return-medicines`,
        returnedMedicines
      );
  
      if (response.status === 200 || response.status === 201) {
        alert("Return receipt generated successfully!");
  
        setShowInvoice(true); // Show the invoice component
      } else {
        alert("Failed to generate the return receipt.");
      }
    } catch (error) {
      console.error("Error printing return receipt:", error);
      alert("An error occurred while printing the return receipt.");
    }
  };

  // const handlePrintReceipt = async () => {

  //   if (!invoiceNo) {
  //     alert("Please enter an Invoice Number.");
  //     return;
  //   }
  
  //   // Filter only medicines with returned quantities greater than 0
  //   const returnedMedicines = medicines.filter(
  //     (medicine) => Number(medicine.returnedQty) > 0
  //   ).map((medicine) => ({
  //     medicineId: medicine.medicineId,
  //     storeMedId: medicine.storeMedId,
  //     qty: medicine.returnedQty,
  //   }));
  
  //   if (returnedMedicines.length === 0) {
  //     alert("No medicines selected for return.");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:3155/api/patient-invoices/${invoiceNo}/return-medicines`,
  //       returnedMedicines
  //     );
  
  //     if (response.status === 200 || response.status === 201) {
  //       alert("Return receipt generated successfully!");
  //        //setInvoiceData(response.data);
  //       setShowInvoice(true);
  //     } else {
  //       alert("Failed to generate the return receipt.");
  //     }
  //   } catch (error) {
  //     console.error("Error printing return receipt:", error);
  //     alert("An error occurred while printing the return receipt.");
  //   }
  // };
  
  // const handlePrintReceipt = async () => {
  //   if (!invoiceNo) {
  //     alert("Please enter an Invoice Number.");
  //     return;
  //   }

  //   const returnedMedicines = medicines
  //     .filter((medicine) => medicine.returnedQty > 0)
  //     .map((medicine) => ({
  //       medicineId: medicine.medicineId,
  //       storeMedId: medicine.storeMedId, // Ensure you have this field in your medicine data
  //       qty: medicine.returnedQty,
  //     }));

  //   if (returnedMedicines.length === 0) {
  //     alert("No medicines selected for return.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       `http://localhost:3155/api/patient-invoices/${invoiceNo}/return-medicines`,
  //       returnedMedicines
  //     );

  //     if (response.status === 200 || response.status === 201) {
  //       alert("Return receipt generated successfully!");
  //       console.log("Return Receipt:", response.data);
  //       setInvoiceData(response.data); // Assuming the response returns the full invoice data
  //       setShowInvoice(true); // Show the invoice component
  //     } else {
  //       alert("Failed to generate the return receipt.");
  //     }
  //   } catch (error) {
  //     console.error("Error printing return receipt:", error);
  //     alert("An error occurred while printing the return receipt.");
  //   }
  // };
  return (
    <div className="dispenSalesReturnFromCust-form">
      <div className="dispenSalesReturnFromCust-options">
        <div className="dispenSalesReturnFromCust-checkbox-group">
          <label htmlFor="returnBy">Return By *:</label>
          {/* <input type="checkbox" id="returnBy" /> */}
        </div>
        <div className="dispenSalesReturnFromCust-checkbox-group">
          <input type="checkbox" id="billNo" />
          <label htmlFor="billNo">Bill No</label>
        </div>
        <div className="dispenSalesReturnFromCust-checkbox-group">
          <input type="checkbox" id="hospitalNo" />
          <label htmlFor="hospitalNo">Hospital No</label>
        </div>
      </div>

      <div className="dispenSalesReturnFromCust-search-section">
        <div className="dispenSalesReturnFromCust-form-group-two">
          <div className="dispenSalesReturnFromCust-form-group-fs">
            <label htmlFor="fiscalYear">Fiscal Year:</label>
            <select
              id="fiscalYear"
              value={fiscalYear}
              onChange={(e) => setFiscalYear(e.target.value)}
            >
              <option value="2024">2024</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="dispenSalesReturnFromCust-form-group-fs">
            <label htmlFor="invoiceNo">Invoice No:</label>
            <input
              type="text"
              id="invoiceNo"
              placeholder="Enter InvoiceNo."
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
            />
          </div>
          <button
            className="dispenSalesReturnFromCust-btn-search"
            onClick={handleSearch}
          >
            <Search size={16} /> Search
          </button>
        </div>
        <button
          className="dispenSalesReturnFromCust-btn-manual-return"
          onClick={handleManualReturn}
        >
          <i class="fa-solid fa-plus"></i> Manual Return
        </button>
      </div>

      {/* <h5>New Sales Return</h5> */}

      <div className="dispenSalesReturnFromCust-patient-info">
        <div className="dispenSalesReturnFromCust-form-group">
          <label htmlFor="patientName">Patient Name *:</label>
          <div className="dispenSalesReturnFromCust-search-input">
            <input
              type="text"
              id="patientName"
              placeholder="Search Patient"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
            <Search
              size={16}
              className="dispenSalesReturnFromCust-search-icon"
            />
          </div>
          {patientName === "" && (
            <div className="dispenSalesReturnFromCust-error-messages">
              <p>Patient Name is required.</p>
              <p>Patient is not registered.</p>
            </div>
          )}
        </div>
        <div className="dispenSalesReturnFromCust-form-group">
          <label htmlFor="referenceInvoiceNo">Reference Invoice No *:</label>
          <input
            type="text"
            id="referenceInvoiceNo"
            value={referenceInvoiceNo}
            onChange={(e) => setReferenceInvoiceNo(e.target.value)}
          />
        </div>
        <div className="dispenSalesReturnFromCust-form-group">
          <label htmlFor="referenceInvoiceDate">
            Reference Invoice Date *:
          </label>
          <div className="date-input">
            <input
              type="text"
              id="referenceInvoiceDate"
              value={referenceInvoiceDate}
              onChange={(e) => setReferenceInvoiceDate(e.target.value)}
            />
            <Calendar
              size={16}
              className="dispenSalesReturnFromCust-calendar-icon"
            />
          </div>
        </div>
      </div>

      <table className="dispenSalesReturnFromCust-return-table">
        <thead>
          <tr>
            <th></th>
            <th>Drug Name*</th>
            <th>Batch*</th>
            <th>Expiry*</th>
            <th>Qty*</th>
            <th>Return Qty*</th> {/* New column for returned quantity */}
            <th>Sale Price*</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={index}>
              <td>
                <button
                  className="dispenSalesReturnFromCust-btn-remove"
                  onClick={() => {
                    // Remove this medicine from the list
                    const updatedMedicines = medicines.filter(
                      (_, i) => i !== index
                    );
                    setMedicines(updatedMedicines);
                  }}
                >
                  X
                </button>
              </td>
              <td>
                <input type="text" value={medicine.medicineName} readOnly />
              </td>
              <td>
                <input type="text" value={medicine.batch} readOnly />
              </td>
              <td>
                <input type="text" value={medicine.expiry} readOnly />
              </td>
              {/* <td>
          <input
            type="text"
            value={medicine.returnedQty || medicine.qty} // Default to the quantity
            onChange={(e) => {
              const updatedMedicines = [...medicines];
              updatedMedicines[index].returnedQty = Number(e.target.value);
              setMedicines(updatedMedicines);
            }}
          />
        </td> */}
              <td>
                <input type="text" value={medicine.qty} readOnly />
              </td>
              <td>
                <input
                  type="number"
                  value={medicine.returnedQty || 0} // Ensure default is 0
                  onChange={(e) => {
                    const updatedMedicines = [...medicines];
                    updatedMedicines[index].returnedQty = Number(
                      e.target.value
                    ); // Ensure numeric update
                    setMedicines(updatedMedicines);
                    console.log("////////",updatedMedicines);
                    // setInvoiceData(updatedMedicines);
                  }}
                />
              </td>
              <td>
                <input type="number" value={medicine.salePrice} readOnly />
              </td>
              <td>{medicine.returnedQty * medicine.salePrice}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="7" className="dispenSalesReturnFromCust-text-right">
              Total Return Amount
            </td>
            <td>
              {medicines.reduce(
                (total, medicine) =>
                  total +
                  (medicine.returnedQty || medicine.qty) * medicine.salePrice,
                0
              )}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* <button className="dispenSalesReturnFromCust-btn-add">+</button> */}

      {/* <div className="dispenSalesReturnFromCust-form-group-remarks">
        <label htmlFor="remarks">Remarks *:</label>
        <textarea 
          id="remarks" 
          value={remarks} 
          onChange={(e) => setRemarks(e.target.value)} 
        ></textarea>
      </div> */}

      <div className="dispenSalesReturnFromCust-PRB">
        <button
          className="dispenSalesReturnFromCust-btn-print"
          onClick={handlePrintReceipt}
        >
          Print Return Receipt
        </button>
      </div>
      {/* SalesInvoice Component */}
      {showInvoice && (
  <SalesInvoice
    showInvoice={showInvoice}
    handleClose={() => setShowInvoice(false)}
    invoiceData={invoiceData}
    handlePrint={handlePrintReceipt}
    invoiceType="Return Invoice" // Added invoiceType prop
  />
)}
    </div>
  );
};

export default DispenSalesReturnFromCust;
