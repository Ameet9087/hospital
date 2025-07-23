import React, { useEffect, useState } from "react";
import "./ReturnForm.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { PopupTable } from "../../FloatingInputs";

const ReturnForm = ({ selectedItem, onClose }) => {
  const [returnsuppliers, setReturnsuppliers] = useState([]);
  const [selectedReturnsupplier, setSelectedReturnsupplier] =
    useState(selectedItem);

  const [activePopup, setActivePopup] = useState("");

  console.log(selectedItem);

  const [items, setItems] = useState([
    {
      itemid: "",
      itemName: "",
      batchNo: "",
      receivedInvoicedQty: 0,
      receivedFreeQty: 0,
      currentAvlStk: 0,
      purchaseRate: 0,
      returnQty: 0,
      returnRate: 0,
      subtotal: 0,
      returnDisAmt: 0,
      returnVATAmt: 0,
      returnCCAmt: 0,
      totalAmount: 0,
    },
  ]);

  const [formDetails, setFormDetails] = useState({
    returnDate: "",
    remarks: "",
    returnStatus: "",
    subtotal: 0,
    discountAmount: 0,
    vatAmount: 0,
    ccAmount: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/suppliers`)
      .then((response) => response.json())
      .then((data) => {
        setReturnsuppliers(data);
      })
      .catch((error) => console.error("Error fetching Suppliers:", error));
  }, []);

  const getPopupData = () => {
    if (activePopup === "Returnsupplier") {
      return {
        columns: ["suppliersId", "supplierName", "contactNumber"],
        data: returnsuppliers,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "Returnsupplier") {
      // Update the selectedItem with the new supplier details
      setSelectedReturnsupplier((prev) => ({
        ...prev,
        supplier: {
          suppliersId: data.suppliersId,
          supplierName: data.supplierName,
        },
      }));
    }

    setActivePopup(null); // Close the popup after selection
  };

  useEffect(() => {
    if (selectedReturnsupplier) {
      const mappedItems = selectedReturnsupplier.addItem.map(
        (selectedItems) => ({
          itemid: selectedItems.addItemId || "",
          itemName: selectedItems.itemMaster?.itemName || "",
          batchNo: selectedItems.batchNo || "",
          receivedInvoicedQty: selectedItems.itemQty || 0,
          receivedFreeQty: selectedItems.freeQty || 0,
          currentAvlStk: selectedItems.itemMaster?.quantity || 0,
          purchaseRate: selectedItems.salePrice || 0,
          returnQty: 0,
          returnRate: 0,
          subtotal: 0,
          returnDisAmt: 0,
          returnVATAmt: 0,
          returnCCAmt: 0,
          totalAmount: 0,
        })
      );
      setItems(mappedItems);
    }
  }, [selectedReturnsupplier]);

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    // Recalculate the subtotal for the item
    updatedItems[index].subtotal =
      updatedItems[index].returnQty * updatedItems[index].returnRate;

    // Recalculate the total amount for the item
    updatedItems[index].totalAmount =
      updatedItems[index].subtotal -
      updatedItems[index].returnDisAmt +
      updatedItems[index].returnVATAmt +
      updatedItems[index].returnCCAmt;

    // Recalculate the totals for the form
    let totalSubtotal = 0;
    let totalDiscountAmount = 0;
    let totalVatAmount = 0;
    let totalCcAmount = 0;
    let totalAmount = 0;

    updatedItems.forEach((item) => {
      totalSubtotal += item.subtotal;
      totalDiscountAmount += item.returnDisAmt;
      totalVatAmount += item.returnVATAmt;
      totalCcAmount += item.returnCCAmt;
      totalAmount += item.totalAmount;
    });

    // Update form details with the recalculated totals
    setFormDetails({
      ...formDetails,
      subtotal: totalSubtotal,
      discountAmount: totalDiscountAmount,
      vatAmount: totalVatAmount,
      ccAmount: totalCcAmount,
      totalAmount: totalAmount,
    });

    setItems(updatedItems); // Update items state
  };

  const handleFormChange = (field, value) => {
    setFormDetails({ ...formDetails, [field]: value });
  };

  const handleSubmit = () => {
    const payload = {
      creditNoteNumber: `CN${Date.now()}`, // Generate a dynamic credit note number based on the current time
      returnDate: formDetails.returnDate,
      remarks: formDetails.remarks,
      returnStatus: formDetails.returnStatus,
      subtotal: formDetails.subtotal,
      discountAmount: formDetails.discountAmount,
      vatAmount: formDetails.vatAmount,
      ccAmount: formDetails.ccAmount,
      totalAmount: formDetails.totalAmount,
      supplierDTO: {
        suppliersId: selectedReturnsupplier?.supplier?.suppliersId,
      },
      goodReceiptDTO: {
        goodReceiptId: selectedItem.goodReceiptId,
      },
      returnItemsDTO: items.map((item) => ({
        returnQty: item.returnQty,
        returnRate: item.returnRate,
        returnDisAmt: item.returnDisAmt,
        returnVatAmt: item.returnVATAmt,
        returnCcAmt: item.returnCCAmt,
        addItem: {
          addItemId: item.itemid, // Use itemid as the AddItem ID
        },
      })),
    };

    console.log("Submitting Form with Payload:", payload);
    console.log(JSON.stringify(payload, null, 2));

    axios
      .post(`${API_BASE_URL}/returnsupplier`, payload)
      .then((response) => {
        alert(response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div className="return-form-component">
      <h2 className="return-form-title">Return To Supplier</h2>

      <div className="return-form-header">
        <label>
          Select Return Date:
          <input
            type="date"
            value={formDetails.returnDate}
            className="return-form-date"
            onChange={(e) => handleFormChange("returnDate", e.target.value)}
          />
        </label>
        <div className="return-form-supplierInfo">
          <p>
            <strong>GR NO:</strong>
            {selectedItem.goodReceiptId}
          </p>
          <p>
            <div className="return-form-Supplier-div">
              <strong>Supplier Name: </strong>
              <div className="return-form-search-field">
                <input
                  className="return-form-tableinput"
                  type="text"
                  value={selectedReturnsupplier?.supplier?.supplierName || ""}
                />
                <button
                  className="return-form-search-icon"
                  onClick={() => setActivePopup("Returnsupplier")}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      fill="currentColor"
                      d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </p>
        </div>
        <div className="return-form-details-container">
          <label>Return Status:</label>
          <select
            className="return-form-details-select"
            value={formDetails.returnStatus}
            onChange={(e) => handleFormChange("returnStatus", e.target.value)}
          >
            <option value="">Select</option>
            <option value="Breakage">Breakage</option>
            <option value="Expired">Expired </option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Batch No</th>
              <th>Received Invoiced Qty</th>
              <th>Received Free Qty</th>
              <th>Current Avl Stk</th>
              <th>Purchase Rate</th>
              <th>Return Qty</th>
              <th>Return Rate</th>
              <th>Subtotal</th>
              <th>Return Dis Amt</th>
              <th>Return VAT Amt</th>
              <th>Return CC Amt</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.itemName}</td>
                <td>{item.batchNo}</td>
                <td>{item.receivedInvoicedQty}</td>
                <td>{item.receivedFreeQty}</td>
                <td>{item.currentAvlStk}</td>
                <td>{item.purchaseRate}</td>
                <td>
                  <input
                    type="number"
                    value={item.returnQty}
                    onChange={(e) =>
                      handleInputChange(index, "returnQty", +e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.returnRate}
                    onChange={(e) =>
                      handleInputChange(index, "returnRate", +e.target.value)
                    }
                  />
                </td>
                <td>{item.subtotal}</td>
                <td>
                  <input
                    type="number"
                    value={item.returnDisAmt}
                    onChange={(e) =>
                      handleInputChange(index, "returnDisAmt", +e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.returnVATAmt}
                    onChange={(e) =>
                      handleInputChange(index, "returnVATAmt", +e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.returnCCAmt}
                    onChange={(e) =>
                      handleInputChange(index, "returnCCAmt", +e.target.value)
                    }
                  />
                </td>
                <td>{item.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="return-form-details-textarea">
        <label>Remarks:</label>
        <textarea
          className="return-form-textarea"
          value={formDetails.remarks}
          onChange={(e) => handleFormChange("remarks", e.target.value)}
        ></textarea>
      </div>
      <div className="return-form-details">
        <label>
          Sub Total:
          <input
            type="number"
            value={formDetails.subtotal}
            onChange={(e) => handleFormChange("subtotal", +e.target.value)} // Update subtotal
          />
        </label>

        <label>
          Discount Amount:
          <input
            type="number"
            value={formDetails.discountAmount}
            onChange={(e) =>
              handleFormChange("discountAmount", +e.target.value)
            } // Update discountAmount
          />
        </label>

        <label>
          VAT Amount:
          <input
            type="number"
            value={formDetails.vatAmount}
            onChange={(e) => handleFormChange("vatAmount", +e.target.value)} // Update vatAmount
          />
        </label>

        <label>
          CC Amount:
          <input
            type="number"
            value={formDetails.ccAmount}
            onChange={(e) => handleFormChange("ccAmount", +e.target.value)} // Update ccAmount
          />
        </label>

        <label>
          Total Amount:
          <input
            type="number"
            value={formDetails.totalAmount}
            disabled // Disable to prevent manual editing of the total amount
          />
        </label>
      </div>

      <div className="return-form-buttons">
        <button
          className="return-form-details-btn-return"
          onClick={handleSubmit}
        >
          Return
        </button>
        {/* <button className="return-form-details-btn-return"  onClick={() => console.log("Cancelled")}>
          Cancel
        </button> */}
        {activePopup && (
          <PopupTable
            columns={columns}
            data={data}
            onSelect={handleSelect}
            onClose={() => setActivePopup(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ReturnForm;
