import React, { useState, useEffect, useRef } from "react";
import "./CreateReturnToVendor.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import PopupTable from "../../Admission/PopupTable";
import axios from "axios";

const FloatingInput = ({ label, type = "text", value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div
      className={`CreateReturnToVendor-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <input
        type={type}
        className="CreateReturnToVendor-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="CreateReturnToVendor-floating-label">{label}</label>
    </div>
  );
};

const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div
      className={`CreateReturnToVendor-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <select
        className="CreateReturnToVendor-floating-select"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== "");
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== "");
          if (props.onChange) props.onChange(e);
        }}
        {...props}
      >
        <option value="">{ }</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="CreateReturnToVendor-floating-label">{label}</label>
    </div>
  );
};

const CreateReturnToVendor = ({ onCancel }) => {
  const [vendorData, setVendorData] = useState([]);
  const [grData, setGRData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState({});
  const [items, setItems] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalCC, setTotalCC] = useState(0);

  const [selectedItem, setSelectedItem] = useState({
    invItemId: "",
    itemId: "",
    itemName: "",
    batchNo: "",
    goodReceiptNo: "",
    availableQty: 0,
    itemRate: 0,
    returnRate: 0,
    quantity: 0,
    subtotal: 0,
    returnDiscountAmt: 0,
    returnVATAmt: 0,
    returnCCAmt: 0,
    totalAmount: 0,
    remark: "",
  });
  const [formData, setFormData] = useState({
    fiscalYear: "2024",
    vendor: "",
    id: "",
    vendorName: "",
    contactAddress: "",
    contactNumber: "",
    currencyCode: "",
    vendorCode: "",
    vendorCountry: "",
    kraPin: "",
    bankDetails: "",
    contactPerson: "",
    email: "",
    creditPeriod: "",
    govtRegDate: "",
    isActive: true,
    receiveDonation: false,
    grNo: "",
    creditNoteNo: "",
    returnOn: new Date().toISOString().split("T")[0],
    items: [selectedItem],
  });

  const [totalSubTotal, setTotalSubTotal] = useState(0);
  const [totalVat, setTotalVat] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (activePopup === "Vendor") {
      fetchVendor();
    } else if (activePopup === "GRno") {
      fetchGRData();
    }
  }, [activePopup]);

  const fetchGRData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/goods-receipts/getAll`);
      setGRData(response.data);
    } catch (error) {
      console.error("Error fetching GR data:", error);
    }
  };

  const fetchVendor = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vendors/getAllVendors`);
      setVendorData(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const fetchItemsByVendorAndGR = async (id, grNo) => {
    console.log(`Fetching items for Vendor ID: ${id}, GR No: ${grNo}`);

    try {
      const response = await axios.get(
        `${API_BASE_URL}/goods-receipts/${id}/${grNo}`
      );

      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);

        const mappedItems = response.data.items.map((items) => ({
          invItemId: items.item?.invItemId,
          rate: items?.rate,
          id: items.id,
          itemName: items.item?.itemName || "N/A",
          itemQuantity: items.quantity || 0,
        }));
        console.log(mappedItems);
        setItems(mappedItems);
      }
    } catch (error) {
      console.error("Error fetching items:", error);

      if (error.response) {
        console.error("Server Response Error:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "Failed to fetch items."}`
        );
      } else if (error.request) {
        console.error("Network Error:", error.request);
        alert("No response from the server. Please check your connection.");
      } else {
        console.error("Unexpected Error:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };
  // Update the useEffect for totals
  useEffect(() => {
    const calculateTotals = () => {
      const subTotal = formData.items.reduce(
        (acc, item) => acc + parseFloat(item.subtotal || 0),
        0
      );
      const discount = formData.items.reduce(
        (acc, item) => acc + parseFloat(item.returnDiscountAmt || 0),
        0
      );
      const vat = formData.items.reduce(
        (acc, item) => acc + parseFloat(item.returnVATAmt || 0),
        0
      );
      const cc = formData.items.reduce(
        (acc, item) => acc + parseFloat(item.returnCCAmt || 0),
        0
      );
      const amount = formData.items.reduce(
        (acc, item) => acc + parseFloat(item.totalAmount || 0),
        0
      );

      setTotalSubTotal(subTotal.toFixed(2));
      setTotalDiscount(discount.toFixed(2));
      setTotalVat(vat.toFixed(2));
      setTotalCC(cc.toFixed(2));
      setTotalAmount(amount.toFixed(2));
    };
    calculateTotals();
  }, [formData.items]);

  const handleSelect = (data) => {
    if (activePopup === "GRno") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        grNo: data.id
      }));
      fetchItemsByVendorAndGR(data.vendor.id, data.id);
    } else if (activePopup === "Vendor") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: data.id
      }));
    } else if (activePopup === "item") {
      const updatedItem = {
        invItemId: data.invItemId,
        itemId: data.id,
        itemName: data.itemName,
        batchNo: "",
        goodReceiptNo: data.id,
        availableQty: data.itemQuantity,
        itemRate: data.rate,
        returnRate: 0,
        quantity: 0,
        subtotal: 0,
        returnDiscountAmt: 0,
        returnVATAmt: 0,
        returnCCAmt: 0,
        totalAmount: 0,
        remark: "",
      };

      // Update the selected item in the formData.items array
      const updatedItems = formData.items.map((item, index) =>
        index === formData.items.length - 1 ? updatedItem : item
      );

      setFormData((prevFormData) => ({
        ...prevFormData,
        items: updatedItems,
      }));
    }
    setActivePopup(null);
  };

  const getPopupData = () => {
    if (activePopup === "GRno") {
      return {
        columns: ["id", "goodsReceiptDate", "vendorBillDate", "totalAmount"],
        data: Array.isArray(grData)
          ? grData.map((gr) => ({
            id: gr.id,
            goodsReceiptDate: new Date(
              gr.goodsReceiptDate
            ).toLocaleDateString(),
            vendorBillDate: new Date(gr.vendorBillDate).toLocaleDateString(),
            totalAmount: gr.totalAmount,
            ...gr,
          }))
          : [],
      };
    } else if (activePopup === "Vendor") {
      return {
        columns: [
          "id",
          "vendorName",
          "contactNumber",
          "contactAddress",
          "email",
          "creditPeriod",
        ],
        data: Array.isArray(vendorData)
          ? vendorData.map((vendor) => ({
            id: vendor.id,
            vendorName: vendor.vendorName,
            contactNumber: vendor.contactNumber,
            contactAddress: vendor.contactAddress,
            email: vendor.email,
            creditPeriod: vendor.creditPeriod,
            ...vendor,
          }))
          : [],
      };
    } else if (activePopup === "item") {
      return {
        columns: ["id", "itemName", "itemQuantity"],
        data: items,
      };
    }
    return { columns: [], data: [] };
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const items = [...formData.items];

    // Update the changed value
    items[index][name] = value;

    // Auto-calculate when quantity or returnRate changes
    if (name === "quantity" || name === "returnRate") {
      const quantity = parseFloat(items[index].quantity) || 0;
      const returnRate = parseFloat(items[index].returnRate) || 0;

      // Basic calculations (modify percentages as needed)
      const subtotal = quantity * returnRate;
      const returnDiscountAmt = subtotal * 0.1; // 10% discount
      const returnVATAmt = subtotal * 0.15; // 15% VAT
      const returnCCAmt = subtotal * 0.05; // 5% CC charge
      const totalAmount =
        subtotal - returnDiscountAmt + returnVATAmt + returnCCAmt;

      // Update calculated fields
      items[index].subtotal = subtotal.toFixed(1);
      items[index].returnDiscountAmt = returnDiscountAmt.toFixed(1);
      items[index].returnVATAmt = returnVATAmt.toFixed(1);
      items[index].returnCCAmt = returnCCAmt.toFixed(1);
      items[index].totalAmount = totalAmount.toFixed(1);
    }

    setFormData({ ...formData, items });
  };
  const handleAddRow = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { ...selectedItem }],
    });
  };

  const handleRemoveRow = (index) => {
    if (formData.items.length > 1) {
      const items = [...formData.items];
      items.splice(index, 1);
      setFormData({
        ...formData,
        items,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      subtotal: parseFloat(totalSubTotal),
      discountAmount: 0, // You can calculate this if needed
      vatAmount: parseFloat(totalVat),
      ccAmount: 0, // You can calculate this if needed
      vendor: {
        id: formData.id,
      },
      procurmentGoodsReceipt: {
        id: formData.grNo,
      },
      returnItemsDTO: formData.items.map((item) => ({
        itemId: item.itemId,
        itemName: item.itemName,
        returnQty: item.quantity,
        returnRate: item.returnRate,
        returnDisAmt: parseFloat(item.returnDiscountAmt),
        returnVatAmt: parseFloat(item.returnVATAmt),
        returnCcAmt: parseFloat(item.returnCCAmt),
        remarks: item.remark,
        totalAmount: parseFloat(item.totalAmount),
        item: {
          invItemId: item.invItemId,
        },
      })),
    };
    console.log(payload);

    try {
      const response = await fetch(`${API_BASE_URL}/return-to-vendor-procurment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Data submitted successfully");
        onCancel();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data");
    }
  };

  const { columns, data } = getPopupData();

  return (
    <>
      <div className="CreateReturnToVendor-container">
        <div className="CreateReturnToVendor-header">Return To Vendor</div>
        <form onSubmit={handleSubmit}>
          <div className="CreateReturnToVendor-section">
            <div className="CreateReturnToVendor-grid">
              <FloatingSelect
                label="Fiscal Year"
                name="fiscalYear"
                value={formData.fiscalYear}
                onChange={(e) =>
                  setFormData({ ...formData, fiscalYear: e.target.value })
                }
                options={[
                  { value: "", label: "Select" },
                  { value: "2024", label: "2024" },
                  { value: "2025", label: "2025" },
                  { value: "2026", label: "2026" },
                  { value: "2027", label: "2027" },
                  { value: "2028", label: "2028" },
                  { value: "2029", label: "2029" },
                  { value: "2030", label: "2030" },
                ]}
              />
              <div className="CreateReturnToVendor-search-field">
                <FloatingInput
                  label="Vendor"
                  type="text"
                  name="vendor"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="CreateReturnToVendor-search-icon"
                  onClick={() => setActivePopup("Vendor")}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      fill="currentColor"
                      d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                    />
                  </svg>
                </button>
              </div>
              <div className="CreateReturnToVendor-search-field">
                <FloatingInput
                  label="GR No"
                  type="text"
                  name="grNo"
                  value={formData.grNo}
                  onChange={(e) =>
                    setFormData({ ...formData, grNo: e.target.value })
                  }
                  readOnly
                />
                <button
                  type="button"
                  className="CreateReturnToVendor-search-icon"
                  onClick={() => setActivePopup("GRno")}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      fill="currentColor"
                      d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                    />
                  </svg>
                </button>
              </div>
              <FloatingInput
                label="Credit Note No."
                type="text"
                name="creditNoteNo"
                value={formData.creditNoteNo}
                onChange={(e) =>
                  setFormData({ ...formData, creditNoteNo: e.target.value })
                }
                required
              />
              <FloatingInput
                label="Return On"
                type="date"
                name="returnOn"
                value={formData.returnOn}
                onChange={(e) =>
                  setFormData({ ...formData, returnOn: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="create-return-to-vendor-table-container">
            <table className="patientList-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "",
                    "Item Name",
                    "Batch No",
                    "Good Receipt No",
                    "Available Qty",
                    "Item Rate",
                    "Return Rate",
                    "Quantity",
                    "Subtotal",
                    "Return Discount Amt",
                    "Return VAT Amt",
                    "Return CC Amt",
                    "Total Amount",
                    "Remark",
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
                {formData.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="CreateReturnToVendor-btn-div">
                        <button
                          type="button"
                          className="create-render-to-remove"
                          onClick={() => handleRemoveRow(index)}
                          disabled={formData.items.length === 1}
                        >
                          x
                        </button>
                        <button
                          type="button"
                          className="create-render-to-add"
                          onClick={handleAddRow}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="CreateReturnToVendor-search-field">
                        <FloatingInput
                          label="Item Name"
                          type="text"
                          name="itemName"
                          value={item.itemName}
                          onChange={(e) => handleChange(e, index)}
                          readOnly
                        />
                        <button
                          type="button"
                          className="CreateReturnToVendor-search-icon"
                          onClick={() => setActivePopup("item")}
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16">
                            <path
                              fill="currentColor"
                              d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td>
                      <input
                        className="CreateReturnToVendor-Inv-Return-Input"
                        type="text"
                        name="batchNo"
                        value={item.batchNo}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        className="CreateReturnToVendor-Inv-Return-Input"
                        type="text"
                        name="goodReceiptNo"
                        value={item.goodReceiptNo}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        className="CreateReturnToVendor-Inv-Return-Input"
                        type="number"
                        name="availableQty"
                        value={item.availableQty}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        className="CreateReturnToVendor-Inv-Return-Input"
                        type="number"
                        name="itemRate"
                        value={item.itemRate}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        className="CreateReturnToVendor-Inv-Return-Input"
                        type="number"
                        name="returnRate"
                        min="0"
                        value={item.returnRate}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        className="CreateReturnToVendor-Inv-Return-Input"
                        type="number"
                        name="quantity"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        className="CreateReturnToVendor-Inv-Return-Input"
                        type="number"
                        name="subtotal"
                        value={item.subtotal}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        className="CreateReturnToVendor-Inv-Return-Input"
                        type="number"
                        name="returnDiscountAmt"
                        value={item.returnDiscountAmt}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        className="CreateReturnToVendor-Inv-Return-Input"
                        type="number"
                        name="returnVATAmt"
                        value={item.returnVATAmt}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        className="CreateReturnToVendor-Inv-Return-Input"
                        type="number"
                        name="returnCCAmt"
                        value={item.returnCCAmt}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        className="CreateReturnToVendor-Inv-Return-Input"
                        type="number"
                        name="totalAmount"
                        value={item.totalAmount}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        className="CreateReturnToVendor-Inv-Return-Input"
                        type="text"
                        name="remark"
                        value={item.remark}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="CreateReturnToVendor-section">
            <div className="CreateReturnToVendor-grid">
              <FloatingInput
                label="SubTotal"
                type="text"
                value={totalSubTotal}
                readOnly
              />
              <FloatingInput
                label="Discount"
                type="text"
                value={totalDiscount}
                readOnly
              />
              <FloatingInput
                label="CC Amount"
                type="text"
                value={totalCC}
                readOnly
              />
              <FloatingInput
                label="VAT Amount"
                type="text"
                value={totalVat}
                readOnly
              />
              <FloatingInput
                label="Total Amount"
                type="text"
                value={totalAmount}
                readOnly
              />
              <label className="CreateReturnToVendor-Words">In Words:</label>
            </div>
          </div>
          {activePopup && (
            <PopupTable
              columns={columns}
              data={data}
              onSelect={handleSelect}
              onClose={() => setActivePopup(null)}
            />
          )}
          <div className="create-return-to-vendor-form-row">
            <button
              className="create-return-to-vendor-form-row-submit-btn"
              type="submit"
            >
              Submit
            </button>
            <button
              className="create-return-to-vendor-form-row-cancel"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateReturnToVendor;
