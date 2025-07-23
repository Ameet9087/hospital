import React, { useState, useRef, useEffect } from "react";
import "./GoodsReceiptForm.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import PopupTable from "../../FloatingInputs/PopupTable";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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
      className={`GoodsReceiptForm-floating-field ${isFocused || hasValue ? "active" : ""
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
      className={`GoodsReceiptForm-floating-field ${isFocused || hasValue ? "active" : ""
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
        <option value="">{ }</option>
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
const GoodsReceiptForm = ({ receivedPO, onClose }) => {
  console.log(receivedPO);

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [suppliers, setSuppliers] = useState([]);
  const [totals, setTotals] = useState({
    taxableSubTotal: 0,
    nonTaxableSubTotal: 0,
    subTotal: 0,
    discountAmount: 0,
    vatTotal: 0,
    ccCharge: 0,
    totalAmount: 0,
  });
  const [selectedSupplierId, setSelectedSupplierId] = useState("");
  const [activePopup, setActivePopup] = useState(null);
  const [supplierBillDate, setSupplierBillDate] = useState("");
  const [goodsReceiptDate, setGoodsReceiptDate] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [creditPeriod, setCreditPeriod] = useState("");
  const [remarks, setRemarks] = useState("");
  const [availableItems, setAvailableItems] = useState([]);
  const [availableGenerics, setAvailableGenerics] = useState([]);
  const [items, setItems] = useState([
    {

      genericName: "",
      itemName: "",
      batchNo: "",
      rackNo: "", // Added field for Rack No
      expiryDate: "",
      quantity: "",
      freeQuantity: "",
      totalQuantity: "", // Added field for Total Qty
      rate: "",
      marginPercentage: "", // Added field for Margin%
      ccChargePercentage: "",
      ccAmount: "", // Added field for CC Amt
      subTotal: "", // Added field for Sub Total
      discountPercentage: "",
      discountAmount: "", // Added field for Discount Amt
      vatPercentage: "",
      vatAmount: "", // Added field for VAT Amt
      totalAmount: "",
    },
  ]);

  useEffect(() => {
    if (receivedPO) {
      setSelectedSupplierId(receivedPO.supplierDTO.suppliersId);
      setSupplierName(receivedPO.supplierDTO.supplierName || "");
      setInvoiceNumber(receivedPO.poId || "");
      setPaymentMode(""); // Add logic to set paymentMode if necessary
      setCreditPeriod(receivedPO.supplierDTO.creditPeriod || "");
      setRemarks(""); // Set remarks based on receivedPo if needed

      // You can set the items state as well based on the receivedPo's purchaseOrderItemDTOs
      if (
        receivedPO.purchaseOrderItemDTOs &&
        receivedPO.purchaseOrderItemDTOs.length > 0
      ) {
        const itemsData = receivedPO.purchaseOrderItemDTOs.map((item) => ({
          addItemId: item.pharmacyItemMasterDTO.pharmacyItemMasterId,
          itemName: item.pharmacyItemMasterDTO.itemName,
          batchNo: "",
          rackNo: "", // Set rackNo if available in receivedPo
          expiryDate: "", // Set expiryDate if available in receivedPo
          quantity: item.quantity,
          freeQuantity: item.freeQuantity,
          totalQuantity: item.totalQuantity,
          rate: item.standardRate, // Set rate if necessary
          marginPercentage: item.pharmacyItemMasterDTO.margin,
          ccChargePercentage: item.ccCharge,
          ccAmount: item.ccCharge,
          subTotal: item.subTotal,
          discountPercentage: item.discountPercent,
          discountAmount: item.discountAmount,
          vatPercentage: item.vatPercentage,
          vatAmount: item.vatAmount,
          totalAmount: item.totalAmount,
        }));
        setItems(itemsData);
      }
      setSupplierBillDate(receivedPO.poDate || "");
      setGoodsReceiptDate(receivedPO.deliveryDate || "");
    }
  }, [receivedPO]);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/suppliers`)
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => console.error("Error fetching suppliers:", error));
    axios
      .get(`${API_BASE_URL}/pharmacy-item-master`)
      .then((response) => {
        setAvailableItems(response.data);
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

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];

    // Update the specific field value
    updatedItems[index][field] = value;

    // Perform calculations for dependent fields
    const quantity = parseFloat(updatedItems[index].quantity || 0);
    const freeQuantity = parseFloat(updatedItems[index].freeQuantity || 0);
    const rate = parseFloat(updatedItems[index].rate || 0);
    const margin = parseFloat(updatedItems[index].margin || 0);
    const discountPercentage = parseFloat(
      updatedItems[index].discountPercentage || 0
    );
    const vatPercentage = parseFloat(updatedItems[index].vatPercentage || 0);
    const ccChargePercentage = parseFloat(
      updatedItems[index].ccChargePercentage || 0
    );

    // Calculate totalQuantity
    updatedItems[index].totalQuantity = quantity + freeQuantity;

    // Calculate subTotal (rate * totalQuantity)
    const subTotal = rate * updatedItems[index].totalQuantity;
    updatedItems[index].subTotal = subTotal.toFixed(2);

    // Calculate discountAmount
    const discountAmount = (subTotal * discountPercentage) / 100;
    updatedItems[index].discountAmount = discountAmount.toFixed(2);

    // Calculate vatAmount
    const vatAmount = ((subTotal - discountAmount) * vatPercentage) / 100;
    updatedItems[index].vatAmount = vatAmount.toFixed(2);

    // Calculate ccAmount
    const ccAmount = ((subTotal - discountAmount) * ccChargePercentage) / 100;
    updatedItems[index].ccAmount = ccAmount.toFixed(2);

    // Calculate totalAmount
    const totalAmount = subTotal - discountAmount + vatAmount + ccAmount;
    updatedItems[index].totalAmount = totalAmount.toFixed(2);

    // Update the state
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        genericName: "",
        itemName: "",
        batchNo: "",
        rackNo: "", // Added field for Rack No
        expiryDate: "",
        quantity: "",
        freeQuantity: "",
        totalQuantity: "", // Added field for Total Qty
        rate: "",
        marginPercentage: "", // Added field for Margin%
        ccChargePercentage: "",
        ccAmount: "", // Added field for CC Amt
        subTotal: "", // Added field for Sub Total
        discountPercentage: "",
        discountAmount: "", // Added field for Discount Amt
        vatPercentage: "",
        vatAmount: "", // Added field for VAT Amt
        totalAmount: "",
      },
    ]);
  };
  const handleCancelRow = () => {
    if (items.length > 1) {
      setItems(items.slice(0, -1));
    }
  };

  useEffect(() => {
    recalculateTotals(); // Recalculate totals whenever items change
  }, [items]);
  const recalculateTotals = () => {
    let taxableSubTotal = 0;
    let nonTaxableSubTotal = 0;
    let subTotal = 0;
    let discountAmount = 0;
    let vatTotal = 0;
    let ccCharge = 0;
    let totalAmount = 0;
    console.log(items);

    items.forEach((item) => {
      const rate = parseFloat(item.rate || 0);
      console.log(rate);

      const itemQty = parseFloat(item.totalQuantity || 0);
      const discountPercentage = parseFloat(item.discountPercentage || 0);
      const vatPercentage = parseFloat(item.vatPercentage || 0);
      const ccChargePercentage = parseFloat(item.ccChargePercentage || 0);

      const itemTotal = rate * itemQty;
      const itemDiscount = (discountPercentage / 100) * itemTotal;
      const itemVat = (vatPercentage / 100) * itemTotal;
      const itemCCCharge = (ccChargePercentage / 100) * itemTotal;

      console.log(itemTotal);
      console.log(itemDiscount);

      subTotal += itemTotal;
      discountAmount += itemDiscount;
      vatTotal += itemVat;
      ccCharge += itemCCCharge;

      totalAmount += itemTotal - itemDiscount + itemVat + itemCCCharge;
      taxableSubTotal += itemTotal - itemDiscount + itemVat;
      nonTaxableSubTotal += itemTotal - itemDiscount;
    });

    setTotals({
      taxableSubTotal,
      nonTaxableSubTotal,
      subTotal,
      discountAmount,
      vatTotal,
      ccCharge,
      totalAmount,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Construct the payload
    const data = {
      supplierBillDate: supplierBillDate || "0001-11-11",
      goodsReceiptDate: goodsReceiptDate || "0001-11-11",
      invoiceNumber: event.target.invoiceNumber.value || "",
      totalAmount: Number(totals.totalAmount) || 0,
      taxableSubTotal: Number(totals.taxableSubTotal) || 0,
      nonTaxableSubTotal: Number(totals.nonTaxableSubTotal) || 0,
      subTotal: Number(totals.subTotal) || 0,
      discountPercent: Number(event.target.discountPercent.value) || 0,
      discountAmount: Number(totals.discountAmount) || 0,
      vatPercent: Number(event.target.vatPercent.value) || 0,
      vatTotal: Number(totals.vatTotal) || 0,
      ccCharge: Number(totals.ccCharge) || 0,
      adjustment: 0, // Assuming adjustment is zero for now
      paymentMode: event.target.paymentMode.value || "Credit",
      creditPeriod: Number(event.target.creditPeriod.value) || 0,
      remarks: remarks || "Order for medical supplies",
      supplier: {
        suppliersId: Number(selectedSupplierId),
      },
      addItem: items.map((item) => ({
        expiryDate: item.expiryDate || "",
        batchNo: item.batchNo || "",
        itemQty: Number(item.quantity) || 0,
        totalQty: Number(item.totalQuantity) || 0,
        margin: Number(item.marginPercentage) || 0,
        salePrice: Number(item.rate) || 0,
        totalAmount: Number(item.totalAmount) || 0,
        itemMaster: {
          pharmacyItemMasterId: Number(item.addItemId),
        },
      })),

    };

    console.log(data);

    axios
      .post(`${API_BASE_URL}/good-receipts`, data)
      .then((response) => {
        alert("Good receipt added successfully");
        onClose();
      })
      .catch((error) => {
        console.error(
          "Error adding good receipt:",
          error.response ? error.response.data : error
        );
      });

  };





  const handlePrint = () => {
    const doc = new jsPDF('l', 'mm', 'a4');

    // Set the title and other header information
    doc.setFontSize(16);
    doc.text('Goods Receipt Report', doc.internal.pageSize.width / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Supplier Bill Date: ${supplierBillDate}`, 14, 25);
    doc.text(`Goods Receipt Date: ${goodsReceiptDate}`, 14, 30);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 219, 25);

    // Prepare the table data
    const tableData = items.map((item, index) => [
      index + 1,
      item.itemName,
      item.batchNo,
      item.expiryDate,
      item.quantity,
      item.freeQuantity,
      item.totalQuantity,
      item.rate,
      item.marginPercentage,
      item.ccChargePercentage,
      item.ccAmount,
      item.subTotal,
      item.discountPercentage,
      item.discountAmount,
      item.vatPercentage,
      item.vatAmount,
      item.totalAmount,
    ]);

    // Define the table headers
    const headers = [
      "S.No",
      "Item Name",
      "Batch No",
      "Expiry Date",
      "Quantity",
      "Free Quantity",
      "Total Quantity",
      "Rate",
      "Margin %",
      "CC Charge %",
      "CC Amt",
      "Sub Total",
      "Discount %",
      "Discount Amt",
      "VAT %",
      "VAT Amt",
      "Total Amount"
    ];

    // Add the table to the PDF
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 40,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [51, 122, 183],
        textColor: 255,
        fontSize: 9,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // Add the total amount at the end of the PDF
    const lastY = doc.lastAutoTable.finalY;
    doc.text(`Total Amount: ₹${totals.totalAmount.toFixed(2)}`, 14, lastY + 10);

    // Open the PDF in a new tab
    const pdfOutput = doc.output('bloburl');
    window.open(pdfOutput, '_blank');
  };


  const handleSelect = (data) => {
    if (activePopup === "supplier") {
      setSelectedSupplierId(data.suppliersId);
      setSupplierName(data.supplierName);
    }
  };

  const getPopupData = () => {
    if (activePopup === "supplier") {
      return { columns: ["supplierName"], data: suppliers };
    }
    // Return an empty object or default data if activePopup is not "supplier"
    return { columns: [], data: [] };
  };

  const { columns, data } = getPopupData();

  const handleItemSelect = (e, index) => {
    const selectedItemName = e.target.value;

    // Find the selected item in the availableItems list
    const selectedItem = availableItems.find(
      (item) => item.itemName === selectedItemName
    );

    // Update the corresponding item in the items array
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      addItemId: selectedItem?.pharmacyItemMasterId,
      itemName: selectedItem?.itemName || "",
    };

    // Update the state
    setItems(updatedItems);
  };

  return (
    <div className="GoodsReceiptForm-container">
      <div className="GoodsReceiptForm-header">Add Good Receipt</div>

      <form onSubmit={handleSubmit}>
        {/* <div > */}
        <div className="GoodsReceiptForm-section">
          <div className="GoodsReceiptForm-grid">
            <FloatingInput
              label="Supplier Bill Date"
              type="date"
              name="supplierBillDate"
              value={supplierBillDate}
              onChange={(e) => setSupplierBillDate(e.target.value)}
            />
            <FloatingInput
              label="Goods Receipt Date"
              type="date"
              name="goodsReceiptDate"
              value={goodsReceiptDate}
              onChange={(e) => setGoodsReceiptDate(e.target.value)}
            />

            <div className="GoodsReceiptForm-search-field">
              <FloatingInput
                label="Supplier Name*"
                type="text"
                name="supplierName"
                value={supplierName}
              />
              <button
                className="GoodsReceiptForm-search-icon"
                onClick={() => setActivePopup("supplier")}
              >
                ?
              </button>
            </div>

            <FloatingInput
              label="Invoice*"
              type="text"
              name="invoiceNumber"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
            <FloatingSelect
              label="Payment Mode*"
              name="paymentMode"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              options={[
                { value: "", label: "Select" },
                { value: "Credit", label: "Credit" },
                { value: "Cash", label: "Cash" },
              ]}
            />
            <FloatingInput
              label="Credit Period*"
              type="number"
              name="creditPeriod"
              value={creditPeriod}
              onChange={(e) => setCreditPeriod(e.target.value)}
              defaultValue="0"
            />
          </div>
        </div>

        <table ref={tableRef} className="goodReceipt-table">
          <thead>
            <tr>
              {[
                "",
                "Generic Name",
                "Item Name",
                "Batch No",
                "Rack No",
                "Exp Date",
                "Item Qty",
                "Free Qty",
                "Total Qty",
                "Rate",
                "Margin%",
                "CC Charge%",
                "CC Amt",
                "Sub Total",
                "Discount%",
                "Discount Amt",
                "VAT%",
                "VAT Amt",
                "Total Amount",
              ].map((header, index) => (
                <th key={index} className="resizable-th">
                  <div className="header-content">
                    <span>{header}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="item-row">
                <td><div className="GoodsReceiptForm-btn">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="GoodsReceiptForm-add-item-button"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelRow}
                    className="GoodsReceiptForm-del-item-button"
                  >
                    x
                  </button>
                </div></td>
                <td>
                  <select
                    value={item.category}
                    onChange={(e) =>
                      handleItemChange(index, "category", e.target.value)
                    }
                  >
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
                    value={item.itemName}
                    onChange={(e) => handleItemSelect(e, index)}
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
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Batch No"
                    value={item.batchNo}
                    onChange={(e) =>
                      handleItemChange(index, "batchNo", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Rack No"
                    value={item.rackNo}
                    onChange={(e) =>
                      handleItemChange(index, "rackNo", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={item.expiryDate}
                    onChange={(e) =>
                      handleItemChange(index, "expiryDate", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Free Quantity"
                    value={item.freeQuantity}
                    onChange={(e) =>
                      handleItemChange(index, "freeQuantity", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Total Quantity"
                    value={item.totalQuantity}
                    onChange={(e) =>
                      handleItemChange(index, "totalQuantity", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) =>
                      handleItemChange(index, "rate", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.margin}
                    onChange={(e) =>
                      handleItemChange(index, "margin", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
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
                  <input
                    type="number"
                    value={item.ccAmount}
                    onChange={(e) =>
                      handleItemChange(index, "ccAmount", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.subTotal}
                    onChange={(e) =>
                      handleItemChange(index, "subTotal", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
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
                  <input
                    type="number"
                    value={item.discountAmount}
                    onChange={(e) =>
                      handleItemChange(index, "discountAmount", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.vatPercentage}
                    onChange={(e) =>
                      handleItemChange(index, "vatPercentage", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.vatAmount}
                    onChange={(e) =>
                      handleItemChange(index, "vatAmount", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.totalAmount}
                    onChange={(e) =>
                      handleItemChange(index, "totalAmount", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="GoodsReceiptForm-section">
          <div className="GoodsReceiptForm-grid">
            <FloatingInput
              label="Taxable Sub Total:"
              type="number"
              name="taxableSubTotal"
              value={totals.taxableSubTotal.toFixed(2)}
              readOnly
            />
            <FloatingInput
              label="Non Taxable Sub Total:"
              type="number"
              name="nonTaxableSubTotal"
              value={totals.nonTaxableSubTotal.toFixed(2)}
              readOnly
            />
            <FloatingInput
              label="Sub Total:"
              type="number"
              name="subTotal"
              value={totals.subTotal.toFixed(2)}
              readOnly
            />
            <FloatingInput
              label="Discount Percent"
              type="number"
              name="discountPercent"
              value={totals.discountAmount.toFixed(2)}
              readOnly
            />
            <FloatingInput
              label="Discount Amount"
              type="number"
              name="discountAmount"
              value={totals.discountAmount.toFixed(2)}
              readOnly
            />
            <FloatingInput
              label="VAT Percent"
              type="number"
              name="vatPercent"
              value={totals.vatTotal.toFixed(2)}
              readOnly
            />
            <FloatingInput
              label="VAT Total"
              type="number"
              name="vatTotal"
              value={totals.vatTotal.toFixed(2)}
              readOnly
            />
            <FloatingInput
              label="CC Charge*"
              type="number"
              name="ccCharge"
              value={totals.ccCharge.toFixed(2)}
              readOnly
            />
            <FloatingInput
              label="Total Amount"
              type="number"
              name="totalAmount"
              value={totals.totalAmount.toFixed(2)}
              readOnly
            />
          </div>
        </div>
        <div className="goods-receipt-form-actions">
          <button type="submit" className="goods-receipt-add-item-btn">
            Submit
          </button>
        </div>
        {/* </div> */}
        <button
          type="button"
          className="purchase-order-print-button"
          onClick={handlePrint}
        >
          <i className="fa-solid fa-print"></i> Print
        </button>
      </form >






      {
        activePopup && (
          <PopupTable
            columns={columns}
            data={data}
            onSelect={handleSelect}
            onClose={() => setActivePopup(null)}
          />
        )
      }
    </div >
  );
};
export default GoodsReceiptForm;
