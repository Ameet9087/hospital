import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./PurchaseOrderForm.css";
import { API_BASE_URL } from "../api/api";
import { toast } from "react-toastify";
import { FloatingInput, FloatingSelect } from "../../FloatingInputs";

const PurchaseOrderForm = ({onClose}) => {
  const [formVisible, setFormVisible] = useState(true);
  const [selectedSupplierId, setSelectedSupplierId] = useState();
  const [genericName, setGenericName] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [rackNumber, setRackNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [freeQuantity, setFreeQuantity] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [standardRate, setStandardRate] = useState("");
  const [marginPercentage, setMarginPercentage] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [freeAmount, setFreeAmount] = useState("");
  const [ccChargePercentage, setCcChargePercentage] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [vatPercentage, setVatPercentage] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [formData, setFormData] = useState({
    supplier: {
      suppliersId: "",
    },
    poDate: "",
    deliveryDate: "",
    referenceNo: "",
    deliveryAddress: "",
    contact: "",
    deliveryDays: "",
    invoicingAddress: "",

    goodReceiptItems: [
      {
        addItem: {
          addItemId: "",
        },

        genericName,
        batchNumber,
        rackNumber,
        expiryDate,
        itemQuantity,
        freeQuantity,
        totalQuantity,
        standardRate,
        marginPercentage,
        salePrice,
        freeAmount,
        ccChargePercentage,
        subTotal,
        discountPercentage,
        vatPercentage,
        totalAmount,
        remarks,
      },
    ],

    subtotal: 0,
    discountPercentage: 0,
    taxableAmount: 0,
    nonTaxableAmount: 0,
    vatAmount: 0,
    ccCharge: 0,
    discountAmount: 0,
    totalAmount: 0,
    remarks: "",
    inWords: "",
  });

  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [availableGenerics, setAvailableGenerics] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/suppliers`)
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the suppliers!", error);
      });

    axios
      .get(`${API_BASE_URL}/pharmacy-item-master`)
      .then((response) => {
        setAvailableItems(response.data);
        console.log(response.data);
        console.log(availableItems?.dependentStocks?.pharmacyDependentStockId);
      })
      .catch((error) => {
        console.error("There was an error fetching the items!", error);
      });
    axios
      .get(`${API_BASE_URL}/generic-names`)
      .then((response) => {
        setAvailableGenerics(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the generics!", error);
      });
  }, []);

  const handleSupplierChange = (e) => {
    const selectedSupplier = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      supplier: selectedSupplier,
      supplierid: selectedSupplier.suppliersId,
    }));
    setSelectedSupplierId(selectedSupplier);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Update the formData directly with the name and value
    }));
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;

    setItems((prevItems) =>
      prevItems.map((item, idx) => {
        if (idx === index) {
          const updatedItem = { ...item, [name]: value };

          if (name === "itemName") {
            const selectedItem = availableItems.find(
              (i) => i.itemName === value
            );
            if (selectedItem) {
              updatedItem.standardRate = parseFloat(selectedItem.mrpItem || 0);
              updatedItem.pharmacyItemMasterDTO = {
                pharmacyItemMasterId: selectedItem.pharmacyItemMasterId, // Assign item master ID
              };
            }
          }

          // Perform calculations only when relevant fields are updated
          const itemQuantity = parseInt(updatedItem.itemQuantity || 0, 10);
          const freeQuantity = parseInt(updatedItem.freeQuantity || 0, 10);
          const standardRate = parseFloat(updatedItem.standardRate || 0);
          const ccChargePercentage = parseFloat(
            updatedItem.ccChargePercentage || 0
          );
          const discountPercentage = parseFloat(
            updatedItem.discountPercentage || 0
          );
          const vatPercentage = parseFloat(updatedItem.vatPercentage || 0);

          // Calculate totals
          updatedItem.totalQuantity = itemQuantity + freeQuantity;
          updatedItem.subtotal = updatedItem.totalQuantity * standardRate;

          // CC charge calculation
          const ccCharge = (updatedItem.subtotal * ccChargePercentage) / 100;
          const subtotalAfterCC = updatedItem.subtotal + ccCharge;

          // Discount calculation
          const discountAmount = (subtotalAfterCC * discountPercentage) / 100;
          const subtotalAfterDiscount = subtotalAfterCC - discountAmount;

          // VAT calculation
          const vatAmount = (subtotalAfterDiscount * vatPercentage) / 100;

          // Total amount calculation
          const totalAmount = subtotalAfterDiscount + vatAmount;

          // Set calculated values
          updatedItem.ccChargeAmount = ccCharge.toFixed(2);
          updatedItem.discountAmount = discountAmount.toFixed(2);
          updatedItem.vatAmount = vatAmount.toFixed(2);
          updatedItem.totalAmount = totalAmount.toFixed(2);

          return updatedItem;
        }
        return item;
      })
    );
  };

  useEffect(() => {
    calculateFormDataTotals();
  }, [items]);

  const calculateFormDataTotals = () => {
    let overallVatAmount = 0;
    let overallCcCharge = 0;
    let overallTaxableAmount = 0;
    let overallNonTaxableAmount = 0;
    let overallTotalAmount = 0;
    let overallDiscountAmount = 0;
    let overallSubTotal = 0;

    setItems((prevItems) => {
      // Check if prevItems is an array
      if (!Array.isArray(prevItems)) {
        toast.error("prevItems is not an array:", prevItems);
        return prevItems; // Return the original data without modification
      }

      const updatedItems = prevItems.map((item) => {
        // Convert values to numbers
        const subtotal = parseFloat(item.subtotal || 0);
        const discountAmount = parseFloat(item.discountAmount || 0);
        const vatAmount = parseFloat(item.vatAmount || 0);
        const ccChargeAmount = parseFloat(item.ccChargeAmount || 0);

        overallVatAmount += vatAmount;
        overallCcCharge += ccChargeAmount;
        overallDiscountAmount += discountAmount;
        overallSubTotal += subtotal;

        // Assuming non-taxable amount is simply the discount
        overallNonTaxableAmount += discountAmount;
        overallTotalAmount += subtotal;

        // Taxable amount = subtotal - non-taxable amount
        overallTaxableAmount += subtotal - discountAmount;

        return {
          ...item,
          subtotal: subtotal.toFixed(2),
          discountAmount: discountAmount.toFixed(2),
          vatAmount: vatAmount.toFixed(2),
          ccChargeAmount: ccChargeAmount.toFixed(2),
        };
      });
      return updatedItems; // Return the updated items
    });

    setFormData((prevData) => ({
      ...prevData,
      subtotal: overallSubTotal.toFixed(2),
      vatAmount: overallVatAmount.toFixed(2),
      ccCharge: overallCcCharge.toFixed(2),
      taxableAmount: overallTaxableAmount.toFixed(2),
      nonTaxableAmount: overallNonTaxableAmount.toFixed(2),
      totalAmount: overallTotalAmount.toFixed(2),
      discountAmount: overallDiscountAmount.toFixed(2),
    }));
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        genericName: "",
        quantity: 0,
        freeQty: 0,
        totalQty: 0,
        standardRate: 0,
        subtotal: 0,
        ccChargePercentage: 0,
        ccChargeAmount: 0,
        discountPercentage: 0,
        discountAmount: 0,
        vatPercentage: 0,
        vatAmount: 0,
        totalAmount: 0,
        remarks: "",
      },
    ]);
  };

  console.log("added row item ", items);
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSupplierId) {
      toast.error("Please select a supplier.");
      return;
    }
    console.log("selected ", selectedSupplierId);
    const data = {
      poDate: formData.poDate,
      deliveryDays: parseInt(formData.deliveryDays) || 0, // Make sure it's an integer
      deliveryAddress: formData.deliveryAddress,
      deliveryDate: formData.deliveryDate,
      referenceNumber: formData.referenceNo,
      contact: formData.contact,
      invoicingAddress: formData.invoicingAddress,

      subTotal: parseInt(formData.subtotal) || 0, // Convert to int
      taxableAmount: parseInt(formData.taxableAmount) || 0, // Convert to int
      vatAmount: parseInt(formData.vatAmount) || 0, // Convert to int
      discountAmount: parseInt(formData.discountAmount) || 0, // Convert to int
      inWords: formData.inWords,
      discountPercent: parseInt(formData.discountPercentage) || 0, // Convert to int
      nonTaxableAmount: parseInt(formData.nonTaxableAmount) || 0, // Convert to int
      ccCharge: parseInt(formData.ccCharge) || 0, // Convert to int
      totalAmount: parseInt(formData.totalAmount) || 0, // Convert to int
      supplierDTO: {
        suppliersId: selectedSupplierId,
      },
      purchaseOrderItemDTOs: items.map((item) => ({
        quantity: parseInt(item.itemQuantity) || 0, // Convert to int
        freeQuantity: parseInt(item.freeQuantity) || 0, // Convert to int
        totalQuantity: parseInt(item.totalQuantity) || 0, // Convert to int
        vatPercentage: parseInt(item.vatPercentage) || 0, // Convert to int
        standardRate: parseInt(item.standardRate) || 0,
        subTotal: parseInt(item.subtotal) || 0, // Convert to int
        ccCharge: parseInt(item.ccCharge) || 0, // Convert to int
        discountPercent: parseInt(item.discountPercentage) || 0, // Convert to int
        totalAmount: parseInt(item.totalAmount) || 0, // Convert to int
        remarks: item.remarks,
        pharmacyItemMasterDTO: {
          pharmacyItemMasterId:
            item.pharmacyItemMasterDTO?.pharmacyItemMasterId || 0, // Ensure it's an int or 0 if undefined
        },
      })),
    };

    console.log(data);

    axios
      .post(`${API_BASE_URL}/purchaseorders/add`, data)
      .then((response) => {
        toast.success("Purchase order saved successfully!");
        onClose();
      })
      .catch((error) => {
        console.error("There was an error saving the purchase order!", error);
        toast.error("Failed to save purchase order.");
        onClose();
      });
  };

  if (!formVisible) {
    return null;
  }

  return (
    <form className="purchase-order-form" onSubmit={handleSubmit}>
      <div className="div-add-good-purchase">
        <h5>Add Purchase Order</h5>
      </div>
      <div className="purchase-order-form-summary">
        <div className="purchase-order-form-item">
          <FloatingSelect
            label={"Supplier"}
            name="supplier"
            value={formData.supplier}
            onChange={handleSupplierChange}
            options={[
              { value: "", label: "" },
              ...(Array.isArray(suppliers)
                ? suppliers.map((supplier) => ({
                    value: supplier.suppliersId,
                    label: supplier.supplierName,
                  }))
                : []),
            ]}
          />
        </div>
        <div className="purchase-order-form-item">
          <FloatingInput
            label={"PO Date"}
            type="date"
            name="poDate"
            value={formData.poDate}
            onChange={handleChangeInput}
          />
        </div>
        <div className="purchase-order-form-item">
          <FloatingInput
            label={"Delivery Days"}
            type="number"
            name="deliveryDays"
            value={formData.deliveryDays}
            onChange={handleChangeInput}
          />
        </div>
        <div className="purchase-order-form-item">
          <FloatingInput
            label={"Delivery Address"}
            type="text"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChangeInput}
          />
        </div>

        <div className="purchase-order-form-item">
          <FloatingInput
            label={"Delivery Date"}
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChangeInput}
          />
        </div>
        <div className="purchase-order-form-item">
          <FloatingInput
            label={"Reference No"}
            type="text"
            name="referenceNo"
            value={formData.referenceNo}
            onChange={handleChangeInput}
          />
        </div>

        <div className="purchase-order-form-item">
          <FloatingInput
            label={"Contact"}
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChangeInput}
          />
        </div>
        <div className="purchase-order-form-item">
          <FloatingInput
            label={"Invoicing Address"}
            name="invoicingAddress"
            value={formData.invoicingAddress}
            onChange={handleChangeInput}
          />
        </div>
        <div className="purchase-order-form-item"></div>
      </div>

      <div className="purchase-order-com-tab">
        <table className="order-purchase-table">
          <thead>
            <tr>
              {[
                "Generic Name",
                "Item Name",
                "Quantity",
                "Free Qty",
                "Total Qty",
                "Standard Rate",
                "SubTotal",
                "CCCharge %",
                "Dis %",
                "VAT %",
                "Total Amt",
                "Remarks",
                "Action",
              ].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items?.map((item, index) => (
              <tr key={index}>
                <td>
                  <select
                    className="purchse-order-in"
                    name="genericName"
                    value={item.genericNameId}
                    onChange={(e) => handleInputChange(index, e)} // Use correct function
                  >
                    <option value="">Select Generic Name</option>
                    {availableGenerics.map((availableGeneric) => (
                      <option
                        key={availableGeneric.genericNameId}
                        value={availableGeneric.genericName}
                      >
                        {availableGeneric.genericName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    className="purchse-order-in"
                    name="itemName"
                    value={item.itemName}
                    onChange={(e) => handleInputChange(index, e)}
                  >
                    <option value="">Select Item</option>
                    {availableItems.map((availableItem) => (
                      <option
                        key={availableItem.itemId}
                        value={availableItem.itemName}
                      >
                        {availableItem.itemName}
                      </option>
                    ))}
                  </select>
                </td>{" "}
                <td>
                  <input
                    type="number"
                    name="itemQuantity"
                    value={item.itemQuantity}
                    onChange={(e) => handleInputChange(index, e)}
                    className="purchse-order-in"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="freeQuantity"
                    value={item.freeQuantity}
                    onChange={(e) => handleInputChange(index, e)}
                    className="purchse-order-in"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="totalQuantity"
                    value={item.totalQuantity}
                    onChange={(e) => handleInputChange(index, e)}
                    className="purchse-order-in"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="standardRate"
                    value={item.standardRate || "0"} // Use updated standardRate
                    onChange={(e) => handleInputChange(index, e)}
                    className="purchse-order-in"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="subtotal"
                    value={item.subtotal}
                    onChange={(e) => handleInputChange(index, e)}
                    className="purchse-order-in"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="ccChargePercentage"
                    value={item.ccChargePercentage}
                    onChange={(e) => handleInputChange(index, e)}
                    className="purchse-order-in"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={item.discountPercentage}
                    onChange={(e) => handleInputChange(index, e)}
                    className="purchse-order-in"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="vatPercentage"
                    value={item.vatPercentage}
                    onChange={(e) => handleInputChange(index, e)}
                    className="purchse-order-in"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="totalAmount"
                    value={item.totalAmount}
                    onChange={(e) => handleInputChange(index, e)}
                    disabled
                    className="purchse-order-in"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="remarks"
                    value={item.remarks}
                    onChange={(e) => handleInputChange(index, e)}
                    className="purchse-order-in"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="purchase-btn-order"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="purchase-order-form-summary-buttons">
        <button type="button" className="purchase-btn-order" onClick={addItem}>
          Add Item
        </button>
      </div>
      <br></br>
      <div className="goods-receipt-totals-section">
        <div className="purchase-order-form-summary">
          <div className="purchase-order-form-item">
            <FloatingInput
              label={"Sub Total"}
              type="text"
              name="subtotal"
              value={formData.subtotal}
              readOnly
            />
          </div>
          <div className="purchase-order-form-item">
            <FloatingInput
              label={"Discount %"}
              type="number"
              name="discountPercentage"
              onChange={handleInputChange}
            />
          </div>
          <div className="purchase-order-form-item">
            <FloatingInput
              label={"Taxable Amount"}
              type="number"
              name="taxableAmount"
              value={formData.taxableAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="purchase-order-form-item">
            <FloatingInput
              label={"Non-Taxable Amount"}
              type="number"
              name="nonTaxableAmount"
              value={formData.nonTaxableAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="purchase-order-form-item">
            <FloatingInput
              label={"VAT Amount"}
              type="number"
              name="vatAmount"
              value={formData.vatAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="purchase-order-form-item">
            <FloatingInput
              label={"CC Charge"}
              type="number"
              name="ccCharge"
              value={formData.ccCharge}
              onChange={handleInputChange}
            />
          </div>
          <div className="purchase-order-form-item">
            <FloatingInput
              label={"Discount Amount"}
              type="number"
              name="discount"
              value={items.discountAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="purchase-order-form-item">
            <FloatingInput
              label={"Total Amount"}
              type="number" // Changed to "number" for better validation
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleInputChange}
              restrictions={{ number: true }} // Keeping this if FloatingInput uses it internally
            />
          </div>
          <div className="purchase-order-form-item">
            <FloatingInput
              label={"In Words"}
              type="text"
              name="inWords"
              value={formData.inWords}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="purchase-order-form-summary-buttons">
          <button type="submit" className="purchase-btn-order">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default PurchaseOrderForm;
