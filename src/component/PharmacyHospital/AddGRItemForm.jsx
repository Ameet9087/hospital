import React, { useEffect, useState } from "react";
import "./AddGRItemForm.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
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
      className={`GoodsReceiptForm-floating-field ${
        isFocused || hasValue ? "active" : ""
      }`}
    >
      <input
        type={type}
        className="GoodsReceiptForm-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="GoodsReceiptForm-floating-label">{label}</label>
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
      className={`GoodsReceiptForm-floating-field ${
        isFocused || hasValue ? "active" : ""
      }`}
    >
      <select
        className="GoodsReceiptForm-floating-select"
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
        <option value="">{}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="GoodsReceiptForm-floating-label">{label}</label>
    </div>
  );
};
const AddGRItemForm = ({ onClose, onSubmit }) => {
  const [genericNames, setGenericNames] = useState([]);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    genericNameId: "",
    addItemId: "",
    batchNo: "",
    rackNo: "",
    expDate: "",
    itemQty: "",
    freeQty: "",
    totalQty: "",
    rate: "",
    marginPercentage: "",
    salePrice: "",
    mrp: "",
    ccChargePercentage: "",
    ccAmount: "",
    subTotal: "",
    discountPercentage: "",
    discountAmount: "",
    vatPercentage: "",
    vatAmount: "",
    totalAmount: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsResponse, genericNamesResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/add-items`),
          axios.get(`${API_BASE_URL}/generic-names`),
        ]);

        setItems(itemsResponse.data);
        setGenericNames(genericNamesResponse.data);
      } catch (error) {
        alert("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [name]: value };
      if (name === "itemQty" || name === "freeQty") {
        newFormData.totalQty =
          parseFloat(newFormData.itemQty || 0) +
          parseFloat(newFormData.freeQty || 0);
      }
      if (
        name === "rate" ||
        name === "marginPercentage" ||
        name === "totalQty"
      ) {
        newFormData.salePrice =
          parseFloat(newFormData.rate || 0) *
          (1 + parseFloat(newFormData.marginPercentage || 0) / 100);
        newFormData.subTotal =
          parseFloat(newFormData.salePrice || 0) *
          parseFloat(newFormData.totalQty || 0);
      }
      if (name === "ccChargePercentage") {
        newFormData.ccAmount =
          parseFloat(newFormData.subTotal || 0) *
          (parseFloat(newFormData.ccChargePercentage || 0) / 100);
      }
      if (name === "discountPercentage") {
        newFormData.discountAmount =
          parseFloat(newFormData.subTotal || 0) *
          (parseFloat(newFormData.discountPercentage || 0) / 100);
      }
      if (name === "vatPercentage") {
        newFormData.vatAmount =
          (parseFloat(newFormData.subTotal || 0) -
            parseFloat(newFormData.discountAmount || 0)) *
          (parseFloat(newFormData.vatPercentage || 0) / 100);
      }
      newFormData.totalAmount =
        parseFloat(newFormData.subTotal || 0) -
        parseFloat(newFormData.discountAmount || 0) +
        parseFloat(newFormData.ccAmount || 0) +
        parseFloat(newFormData.vatAmount || 0);

      return newFormData;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData); // Send form data to parent
    onClose(); // Close the form
  };
  return (
    <div
    //  className="add-gr-item-modal-form-com"
    >
      <div className="GoodsReceiptForm-header">Add Good Receipt Item</div>

      <div className="add-gr-item-modal-content">
        <form onSubmit={handleSubmit}>
          {/* Generic Name and Item Name */}
          <div className="GoodsReceiptForm-container">
            <div className="GoodsReceiptForm-section">
              <div className="GoodsReceiptForm-grid">
                <FloatingSelect
                  label="Generic Name"
                  options={[
                    { value: "", label: "Select Generic Name" },
                    ...genericNames.map((genericName) => ({
                      value: genericName.genericNameId,
                      label: genericName.genericName,
                    })),
                  ]}
                  onChange={(e) => handleChange(e)} // Assuming handleChange is your change handler
                  value={formData.genericNameId}
                />
                <FloatingSelect
                  label="Item Name"
                  options={[
                    { value: "", label: "Select Item" }, // Default option
                    ...items.map((item) => ({
                      value: item.addItemId,
                      label: item.itemName,
                    })),
                  ]}
                  onChange={(e) => handleChange(e)} // Assuming handleChange updates formData
                  value={formData.addItemId}
                />
                <FloatingInput
                  label="Batch No"
                  type="text"
                  name="batchNo"
                  value={formData.batchNo}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Rack No"
                  type="text"
                  name="rackNo"
                  value={formData.rackNo}
                  onChange={handleChange}
                />

                <FloatingInput
                  label="Exp. Date"
                  type="date"
                  name="expDate"
                  value={formData.expDate}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Item Qty*"
                  type="number"
                  name="itemQty"
                  value={formData.itemQty}
                  onChange={handleChange}
                />

                <FloatingInput
                  label="Free Qty*"
                  type="number"
                  name="freeQty"
                  value={formData.freeQty}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Total Qty*"
                  type="number"
                  name="totalQty"
                  value={formData.totalQty}
                  readOnly
                />

                <FloatingInput
                  label="Rate*"
                  type="number"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Margin%"
                  type="number"
                  name="marginPercentage"
                  value={formData.marginPercentage}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Sale Price"
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  readOnly
                />
                <FloatingInput
                  label="Sub-Total"
                  type="number"
                  name="subTotal"
                  value={formData.subTotal}
                  readOnly
                />

                <FloatingInput
                  label="CC Charge%"
                  type="number"
                  name="ccAmount"
                  value={formData.ccAmount}
                  readOnly
                />

                <FloatingInput
                  label="CC Amount%"
                  type="number"
                  name="ccChargePercentage"
                  value={formData.ccChargePercentage}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Discount%"
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Discount Amount"
                  type="number"
                  name="discountAmount"
                  value={formData.discountAmount}
                  readOnly
                />

                <FloatingInput
                  label="VAT%"
                  type="number"
                  name="vatPercentage"
                  value={formData.vatPercentage}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="VAT Amount"
                  type="number"
                  name="vatAmount"
                  value={formData.vatAmount}
                  readOnly
                />

                <FloatingInput
                  label="Total Amount"
                  type="number"
                  name="totalAmount"
                  value={formData.totalAmount}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="add-gritem-form-actions">
            <button type="submit" className="add-gritem-submit-btn">
              Add Item
            </button>
            <button
              type="button"
              className="add-gritem-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGRItemForm;
