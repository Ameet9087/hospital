import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FloatingInput } from "../../../FloatingInputs";
import "./GoodsReceipt.css";
import { API_BASE_URL } from "../../api/api";
import FloatingSelect from "../../../FloatingInputs/FloatingSelect";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { toast } from "react-toastify";
const GoodsReceipt = ({ goodReceipt, onClose }) => {
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
  const [status, setStatus] = useState("Pending");
  const [itemlist, setLists] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [isItemAdding, setItemAdding] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [items, setItems] = useState([
    {
      itemId: "",
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
    if (items.length > 0) {
      const updatedItems = items.map((item) => {
        const {
          rate,
          quantity,
          discountPercentage,
          vatPercentage,
          ccChargePercentage,
          otherCharge,
        } = item;

        // Ensure the values are numbers
        const validRate = parseFloat(rate) || 0;
        const validQuantity = parseFloat(quantity) || 0;
        const validDiscountPercentage = parseFloat(discountPercentage) || 0;
        const validVatPercentage = parseFloat(vatPercentage) || 0;
        const validCcChargePercentage = parseFloat(ccChargePercentage) || 0;
        const validOtherCharge = parseFloat(otherCharge) || 0;

        // Calculate the total amount for each item
        const discount =
          (validRate * validQuantity * validDiscountPercentage) / 100;
        const vat = (validRate * validQuantity * validVatPercentage) / 100;
        const ccCharge =
          (validRate * validQuantity * validCcChargePercentage) / 100;
        const itemTotal =
          validRate * validQuantity -
          discount +
          vat +
          ccCharge +
          validOtherCharge;

        return { ...item, totalAmount: parseFloat(itemTotal.toFixed(2)) }; // Ensure float precision
      });

      setItems(updatedItems); // Update items with calculated totalAmount

      const calcSubTotal = updatedItems.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      setSubTotal(parseFloat(calcSubTotal.toFixed(2))); // Calculate subtotal and update state
    }
    setItemAdding(false);
  }, [isItemAdding]);

  useEffect(() => {
    // Ensure all values are numbers
    const validSubTotal = parseFloat(subTotal) || 0;
    const validCcCharge = parseFloat(ccCharge) || 0;
    const validDiscountAmount = parseFloat(discountAmount) || 0;
    const validVat = parseFloat(vat) || 0;
    const validOtherCharges = parseFloat(otherCharges) || 0;

    const total =
      validSubTotal +
      validCcCharge +
      validVat +
      validOtherCharges -
      validDiscountAmount;
    setTotalAmount(total);
  }, [subTotal, ccCharge, discountAmount, vat, otherCharges]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        itemId: "",
        category: "",
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
    setItemAdding(true);
    const newItems = [...items];

    // Prevent negative values
    if (
      ["quantity", "freeQuantity", "rate", "otherCharge"].includes(field) &&
      value < 0
    ) {
      return;
    }

    if (
      ["discountPercentage", "vatPercentage", "ccChargePercentage"].includes(
        field
      ) &&
      (value < 0 || value > 100)
    ) {
      return;
    }

    newItems[index][field] = value;

    // Ensure values are numbers
    const validRate = parseFloat(newItems[index].rate) || 0;
    const validQuantity = parseFloat(newItems[index].quantity) || 0;
    const validDiscountPercentage =
      parseFloat(newItems[index].discountPercentage) || 0;
    const validVatPercentage = parseFloat(newItems[index].vatPercentage) || 0;
    const validCcChargePercentage =
      parseFloat(newItems[index].ccChargePercentage) || 0;
    const validOtherCharge = parseFloat(newItems[index].otherCharge) || 0;

    // Calculate subtotal
    const subTotal = validRate * validQuantity;
    const discount = (subTotal * validDiscountPercentage) / 100;
    const vat = (subTotal * validVatPercentage) / 100;
    const ccCharge = (subTotal * validCcChargePercentage) / 100;

    let totalAmount = subTotal + vat + ccCharge + validOtherCharge - discount;

    // Prevent negative total amount
    if (totalAmount < 0) {
      alert("Total Amount cannot be negative.");
      totalAmount = 0;
    }

    newItems[index].totalAmount = totalAmount.toFixed(2); // Ensure two decimal places
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
      handleItemChange(
        index,
        "vatPercentage",
        selectedItem.isVatApplicable ? 12 : 0
      ); // Example VAT logic
      handleItemChange(index, "remarks", selectedItem.remarks || "");
      // handleItemChange(index, "itemName", selectedItem.itemName);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vendorName || !billNo || !items.length) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const data = {
      vendorBillDate,
      goodsReceiptDate,
      vendorId: vendorName,
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
      status,
      remarks,
      items,
    };
    console.log(data);

    try {
      await axios.post(`${API_BASE_URL}/goods-receipts/create`, data);
      toast.success("Goods Receipt saved successfully!");
    } catch (error) {
      console.error("Error saving goods receipt:", error);
      toast.error("Failed to save goods receipt.");
    }
      

  };

  return (
    <div className="good-receipt-com">
      <form onSubmit={handleSubmit} className="GoodsReceiptSettings-container">
        <h2>Add Goods Receipt</h2>

        <div className="GoodsReceiptSettings-form-row-date">
          <FloatingInput
            label="Vendor Bill Date:"
            type="date"
            value={vendorBillDate}
            onChange={(e) => setVendorBillDate(e.target.value)}
          />

          <FloatingInput
            label="Goods Receipt Date:"
            type="date"
            value={goodsReceiptDate}
            onChange={(e) => setGoodsReceiptDate(e.target.value)}
          />
          <FloatingSelect
            label="Vendor Name"
            id="vendorSelect"
            value={vendorName}
            onChange={handleVendorChange}
            required
            options={[
              { value: "", label: "Select Vendor" },
              ...(Array.isArray(vendor)
                ? vendor.map((vendor) => ({
                    value: vendor.id,
                    label: vendor.vendorName,
                  }))
                : []),
            ]}
          />
        </div>

        <div className="GoodsReceiptSettings-form-row-date">
          <FloatingInput
            label="Bill No:"
            type="text"
            value={billNo}
            onChange={(e) => setBillNo(e.target.value)}
            required
          />

          <FloatingInput
            label="Payment Mode:"
            type="select"
            value={paymentMode}
            setValue={setPaymentMode}
            options={["Credit", "Cash"]}
          />
          <FloatingInput
            label="Credit Period:"
            type="number"
            value={creditPeriod}
            onChange={(e) => setCreditPeriod(e.target.value)}
            min="0"
          />
        </div>
       
          <div className="good-receipt-tab">
            <h3>Items</h3>
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Category",
                    "Item Name",
                    "Batch No",
                    "Expiry Date",
                    "Quantity",
                    "Free Quantity",
                    "Rate",
                    "Discount (%)",
                    "VAT (%)",
                    "CC Charge (%)",
                    "Other Charge",
                    "Total Amount",
                    "Remarks",
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
                {items.map((item, index) => (
                  <tr key={index} className="item-row">
                    <td>
                      <FloatingSelect
                        label="Category"
                        id="categorySelect"
                        value={item.category}
                        onChange={(e) =>
                          handleItemChange(index, "category", e.target.value)
                        }
                        required
                        options={[
                          { value: "Consumables", label: "Consumables" },
                          {
                            value: "Non-Consumables",
                            label: "Non-Consumables",
                          },
                        ]}
                      />
                    </td>

                    <td>
                      <FloatingSelect
                        value={item.itemName}
                        onChange={(e) => handleItemSelect(e, index)}
                        required
                        options={[
                          { value: "", label: "Select Item" },
                          ...(Array.isArray(itemlist)
                            ? itemlist.map((availableItem) => ({
                                value: availableItem.itemName,
                                label: availableItem.itemName,
                              }))
                            : []),
                        ]}
                      />

                      {/* <select
                        value={item.itemName}
                        onChange={(e) => handleItemSelect(e, index)}
                      >
                        <option value="">Select Item</option>
                        {itemlist.map((availableItem) => (
                          <option
                            key={availableItem.itemName}
                            value={availableItem.itemName}
                          >
                            {availableItem.itemName}
                          </option>
                        ))}
                      </select> */}
                    </td>
                    <td>
                      <FloatingInput
                        type="text"
                        placeholder="Batch No"
                        value={item.batchNo}
                        onChange={(e) =>
                          handleItemChange(index, "batchNo", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <FloatingInput
                        type="date"
                        value={item.expiryDate}
                        onChange={(e) =>
                          handleItemChange(index, "expiryDate", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <FloatingInput
                        type="number"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <FloatingInput
                        type="number"
                        placeholder="Free Quantity"
                        value={item.freeQuantity}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "freeQuantity",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <FloatingInput
                        type="number"
                        placeholder="Rate"
                        value={item.rate}
                        onChange={(e) =>
                          handleItemChange(index, "rate", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <FloatingInput
                        type="number"
                        placeholder="Discount (%)"
                        value={item.discountPercentage}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "discountPercentage",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <FloatingInput
                        type="number"
                        placeholder="VAT (%)"
                        value={item.vatPercentage}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "vatPercentage",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <FloatingInput
                        type="number"
                        placeholder="CC Charge (%)"
                        value={item.ccChargePercentage}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "ccChargePercentage",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <FloatingInput
                        type="number"
                        placeholder="Other Charge"
                        value={item.otherCharge}
                        onChange={(e) =>
                          handleItemChange(index, "otherCharge", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <FloatingInput
                        type="number"
                        placeholder="Total Amount"
                        value={item.totalAmount}
                        onChange={(e) =>
                          handleItemChange(index, "totalAmount", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <FloatingInput
                        type="text"
                        placeholder="Remarks"
                        value={item.remarks}
                        onChange={(e) =>
                          handleItemChange(index, "remarks", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
     
        <button
          type="button"
          onClick={handleAddItem}
          className="GoodsReceiptSettings-add-item-button"
        >
          Add New Row
        </button>

        <div className="GoodsReceiptSettings-total-section">
          <div className="GoodsReceiptSettings-form-row-date">
            <FloatingInput
              label="Checked By:"
              type="text"
              value={checkedBy}
              onChange={(e) => setCheckedBy(e.target.value)}
            />

            <FloatingInput
              label="SubTotal:"
              type="number"
              value={subTotal}
              setValue={setSubTotal}
              readOnly
            />
            <FloatingInput
              label="CC Charge:"
              type="number"
              value={ccCharge}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 0 && val <= subTotal) {
                  setCcCharge(val);
                }
              }}
            />

            <FloatingInput
              label="Discount Amount:"
              type="number"
              value={discountAmount}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 0 && val <= subTotal) {
                  setDiscountAmount(val);
                }
              }}
            />
          </div>
        </div>
        <div className="GoodsReceiptSettings-form-calculation">
          <div className="GoodsReceiptSettings-form-row-date">
            <FloatingInput
              label="VAT:"
              type="number"
              value={vat}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 0 && val <= subTotal) {
                  setVat(val);
                }
              }}
            />

            <FloatingInput
              label="Other Charges:"
              type="number"
              value={otherCharges}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 0) {
                  setOtherCharges(val);
                }
              }}
            />

            <FloatingInput
              label="Total Amount:"
              type="number"
              value={totalAmount}
              setValue={setTotalAmount}
              readOnly
            />

            <FloatingInput
              label="Remarks:"
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        </div>

        <div className="GoodsReceiptSettings-form-submit">
          <button
            type="submit"
            className="GoodsReceiptSettings-add-item-button"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoodsReceipt;
