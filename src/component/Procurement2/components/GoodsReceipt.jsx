import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemRow from "../components/ItemRow";
import FormInput from "../components/FormInput";
import "./GoodsReceipt.css";
import { API_BASE_URL } from "../../api/api";

const GoodsReceipt = ({goodReceipt}) => {
  console.log(goodReceipt);
  
  const [vendorBillDate, setVendorBillDate] = useState("");
  const [goodsReceiptDate, setGoodsReceiptDate] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [billNo, setBillNo] = useState("");
  const [paymentMode, setPaymentMode] = useState("Credit");
  const [creditPeriod, setCreditPeriod] = useState(0);
  const [checkedBy, setCheckedBy] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [ccCharge, setCcCharge] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [vat, setVat] = useState(0);
  const [otherCharges, setOtherCharges] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [itemlist, setLists] = useState([]);
  const [vendor,setVendor]=useState([]);
  const [items, setItems] = useState([
    {
      itemId:"",
      batchNo: "",
      expiryDate: "",
      quantity: 0,
      freeQuantity: 0,
      rate: 0,
      discountPercentage: 0,
      vatPercentage: 0,
      ccChargePercentage: 0,
      otherCharge: 0,
      totalAmount: 0,
      remarks: "",
    },
  ]);

  useEffect(() => {
    // Set vendor name from goodReceipt
    setVendorName(goodReceipt?.vendor?.id || "");

    // Map items from the request object
    const updatedItems = goodReceipt?.items?.map((item) => ({
      itemId: item?.item?.invItemId || 0,
      batchNo: "", // Default value
      expiryDate: "", // Default value
      quantity: item?.quantity || 0,
      freeQuantity: 0, // Default value
      rate: item?.item?.standardRate || 0,
      discountPercentage: 0, // Default value
      vatPercentage: item?.item?.isVatApplicable ? 0 : 0, // Default value
      ccChargePercentage: 0, // Default value
      otherCharge: 0, // Default value
      totalAmount: 0,
      remarks: item?.itemRemark || "",
    }));

    // Update the items state
    setItems(updatedItems || []);
  }, [goodReceipt]);

  useEffect(() => {
    const calcSubTotal = items.reduce(
      (acc, item) => acc + item.rate * item.quantity,
      0
    );
    setSubTotal(calcSubTotal);
  }, [items]);

  useEffect(() => {
    const total = subTotal + ccCharge + vat + otherCharges - discountAmount;
    setTotalAmount(total);
  }, [subTotal, ccCharge, discountAmount, vat, otherCharges]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        itemId:"",
        category: "",
        itemName: "",
        batchNo: "",
        expiryDate: "",
        quantity: 0,
        freeQuantity: 0,
        rate: 0,
        discountPercentage: 0,
        vatPercentage: 0,
        ccChargePercentage: 0,
        otherCharge: 0,
        totalAmount: 0,
        remarks: "",
      },
    ]);
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/vendors/getAllVendors`)
      .then((response) => setVendor(response.data))
      .catch((error) => console.error("Error fetching vendors:", error));

    axios
      .get(`${API_BASE_URL}/items/getAllItem`)
      .then((response) => setLists(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    // Recalculate totalAmount for the updated item
    const subTotal = newItems[index].quantity * newItems[index].rate;
    const discount = (subTotal * newItems[index].discountPercentage) / 100;
    const vat = (subTotal * newItems[index].vatPercentage) / 100;
    const ccCharge = (subTotal * newItems[index].ccChargePercentage) / 100;

    newItems[index].totalAmount =
      subTotal + vat + ccCharge + newItems[index].otherCharge - discount;

    setItems(newItems);
  };
  const handleVendorChange = (e) => {
    setVendorName(e.target.value); 
  };

  const handleItemSelect = (e, index) => {
    const selectedItem = itemlist.find(
      (item) => item.itemName === e.target.value
    );

    if (selectedItem) {
      handleItemChange(index, "itemId", selectedItem.invItemId);
      handleItemChange(index, "rate", selectedItem.standardRate);
      handleItemChange(index, "vatPercentage", selectedItem.isVatApplicable ? 12 : 0); // Example VAT logic
      handleItemChange(index, "remarks", selectedItem.remarks || "");
      handleItemChange(index, "itemName", selectedItem.itemName);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vendorName || !billNo || !items.length) {
      alert("Please fill out all required fields.");
      return;
    }

    const data = {
      vendorBillDate,
      goodsReceiptDate,
      vendorId:vendorName,
      billNo,
      paymentMode,
      creditPeriod,
      checkedBy,
      subTotal,
      ccCharge,
      discountAmount,
      vat,
      otherCharges,
      totalAmount,
      remarks,
      items,
    };
    console.log(data);
    try {
      await axios.post(`${API_BASE_URL}/goods-receipts/create`, data);
      alert("Goods Receipt saved successfully!");
    } catch (error) {
      console.error("Error saving goods receipt:", error);
      alert("Failed to save goods receipt.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="GoodsReceiptSettings-container">
      <h2>Add Goods Receipt</h2>

      <div className="GoodsReceiptSettings-form-row-date">
        <FormInput
          label="Vendor Bill Date:"
          type="date"
          value={vendorBillDate}
          setValue={setVendorBillDate}
        />
        <FormInput
          label="Goods Receipt Date:"
          type="date"
          value={goodsReceiptDate}
          setValue={setGoodsReceiptDate}
        />
      </div>

      <div className="GoodsReceiptSettings-form-row">
        <div className="goods-receipts-form-group">
      <label htmlFor="vendorSelect">Vendor Name:</label>
      <select
          id="vendorSelect"
          value={vendorName}
          onChange={handleVendorChange}
          required
        >
          <option value="">Select Vendor</option>
          {vendor.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor?.vendorName} 
            </option>
          ))}
        </select>
        </div>
        <FormInput
          label="Bill No:"
          type="text"
          value={billNo}
          setValue={setBillNo}
          required
        />
        <FormInput
          label="Payment Mode:"
          type="select"
          value={paymentMode}
          setValue={setPaymentMode}
          options={["Credit", "Cash"]}
        />
        <FormInput
          label="Credit Period:"
          type="number"
          value={creditPeriod}
          setValue={setCreditPeriod}
        />
      </div>

      <div className="GoodsReceiptSettings-items-container">
        <h3>Items</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Item Name</th>
              <th>Batch No</th>
              <th>Expiry Date</th>
              <th>Quantity</th>
              <th>Free Quantity</th>
              <th>Rate</th>
              <th>Discount (%)</th>
              <th>VAT (%)</th>
              <th>CC Charge (%)</th>
              <th>Other Charge</th>
              <th>Total Amount</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="item-row">
                <td>
                  <select
                    value={item.category}
                    onChange={(e) => handleItemChange(index, "category", e.target.value)}
                  >
                    <option value="Consumables">Consumables</option>
                    <option value="Non-Consumables">Non-Consumables</option>
                  </select>
                </td>
                <td>
                  <select value={item.itemName} onChange={(e) => handleItemSelect(e, index)}>
                    <option value="">Select Item</option>
                    {itemlist.map((availableItem) => (
                      <option key={availableItem.itemName} value={availableItem.itemName}>
                        {availableItem.itemName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Batch No"
                    value={item.batchNo}
                    onChange={(e) => handleItemChange(index, "batchNo", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={item.expiryDate}
                    onChange={(e) => handleItemChange(index, "expiryDate", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Free Quantity"
                    value={item.freeQuantity}
                    onChange={(e) => handleItemChange(index, "freeQuantity", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Discount (%)"
                    value={item.discountPercentage}
                    onChange={(e) => handleItemChange(index, "discountPercentage", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="VAT (%)"
                    value={item.vatPercentage}
                    onChange={(e) => handleItemChange(index, "vatPercentage", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="CC Charge (%)"
                    value={item.ccChargePercentage}
                    onChange={(e) => handleItemChange(index, "ccChargePercentage", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Other Charge"
                    value={item.otherCharge}
                    onChange={(e) => handleItemChange(index, "otherCharge", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Total Amount"
                    value={item.totalAmount}
                    onChange={(e) => handleItemChange(index, "totalAmount", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Remarks"
                    value={item.remarks}
                    onChange={(e) => handleItemChange(index, "remarks", e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={handleAddItem}
          className="GoodsReceiptSettings-add-item-button"
        >
          Add New Row
        </button>
      </div>

      <div className="GoodsReceiptSettings-total-section">
        <div className="GoodsReceiptSettings-form-row">
          <FormInput
            label="Checked By:"
            type="text"
            value={checkedBy}
            setValue={setCheckedBy}
          />
        </div>
        <div className="GoodsReceiptSettings-form-row-total-section">
          <FormInput
            label="SubTotal:"
            type="number"
            value={subTotal}
            setValue={setSubTotal}
            readOnly
          />
          <FormInput
            label="CC Charge:"
            type="number"
            value={ccCharge}
            setValue={setCcCharge}
          />
          <FormInput
            label="Discount Amount:"
            type="number"
            value={discountAmount}
            setValue={setDiscountAmount}
          />
          <FormInput label="VAT:" type="number" value={vat} setValue={setVat} />
          <FormInput
            label="Other Charges:"
            type="number"
            value={otherCharges}
            setValue={setOtherCharges}
          />
          <FormInput
            label="Total Amount:"
            type="number"
            value={totalAmount}
            setValue={setTotalAmount}
            readOnly
          />
           <FormInput
            label="Remarks:"
            type="text"
            value={remarks}
            setValue={setRemarks}
          />
        </div>
        
      </div>
      <div className="GoodsReceiptSettings-form-submit">
          <button type="submit" className="GoodsReceiptSettings-add-item-button">
            Submit
          </button>
        </div>
    </form>
  );
};

export default GoodsReceipt;
