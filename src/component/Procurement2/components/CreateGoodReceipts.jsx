import React, { useState } from "react";
import "./CreateGoodReceipts.css";

const AddGoodsReceipt = () => {
  const [formData, setFormData] = useState({
    vendorBillDate: "2024-08-25",
    goodsReceiptDate: "2024-08-25",
    vendorName: "",
    billNo: "",
    paymentMode: "Credit",
    creditPeriod: "0",
    addQualityInspection: false,
    checkedBy: "Mr. admin admin",
    items: [
      {
        category: "Consumables",
        itemName: "",
        batchNo: "",
        expiryDate: "",
        quantity: "0",
        freeQty: "0",
        rate: "0",
        dis: "0",
        vat: "0",
        ccCharge: "0",
        otherCharge: "0",
        totalAmount: "0",
        remarks: "",
      },
    ],
    subTotal: "0",
    ccCharge: "0",
    discountAmount: "0",
    vat: "0",
    otherCharges: "0",
    totalAmount: "0",
    remarks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const addNewRow = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          category: "Consumables",
          itemName: "",
          batchNo: "",
          expiryDate: "",
          quantity: "0",
          freeQty: "0",
          rate: "0",
          dis: "0",
          vat: "0",
          ccCharge: "0",
          otherCharge: "0",
          totalAmount: "0",
          remarks: "",
        },
      ],
    });
  };

  const removeRow = (index, e) => {
    e.preventDefault();
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  return (
    <div className="CreateGoodReceipts-add-goods-receipt">
      <h2 className="CreateGoodReceipts-heading">Add Goods Receipt</h2>

      <div className="CreateGoodReceipts-date-fields">
        <div className="CreateGoodReceipts-form-group">
          <label className="CreateGoodReceipts-label" htmlFor="vendorBillDate">
            Vendor Bill Date:
          </label>
          <input
            type="date"
            name="vendorBillDate"
            id="vendorBillDate"
            value={formData.vendorBillDate}
            onChange={handleInputChange}
            className="CreateGoodReceipts-input-date"
          />
        </div>
        <div className="CreateGoodReceipts-form-group">
          <label
            className="CreateGoodReceipts-label"
            htmlFor="goodsReceiptDate"
          >
            Goods Receipt Date:
          </label>
          <input
            type="date"
            name="goodsReceiptDate"
            id="goodsReceiptDate"
            value={formData.goodsReceiptDate}
            onChange={handleInputChange}
            className="CreateGoodReceipts-input-date"
          />
        </div>
      </div>

      <div className="CreateGoodReceipts-vendor-details">
        <div className="CreateGoodReceipts-form-group">
          <label className="CreateGoodReceipts-label" htmlFor="vendorName">
            Vendor Name<span className="CreateGoodReceipts-required">*</span>:
          </label>
          <input
            type="text"
            name="vendorName"
            id="vendorName"
            value={formData.vendorName}
            onChange={handleInputChange}
            placeholder="Search Vendor Name"
            className="CreateGoodReceipts-input-text"
            required
          />
          <button
            className="CreateGoodReceipts-info-button"
            title="Vendor Information"
          >
            ?
          </button>
        </div>
        <div className="CreateGoodReceipts-form-group">
          <label className="CreateGoodReceipts-label" htmlFor="billNo">
            Bill No<span className="CreateGoodReceipts-required">*</span>:
          </label>
          <input
            type="text"
            name="billNo"
            id="billNo"
            value={formData.billNo}
            onChange={handleInputChange}
            className="CreateGoodReceipts-input-text"
            required
          />
        </div>
        <div className="CreateGoodReceipts-form-group">
          <label className="CreateGoodReceipts-label" htmlFor="paymentMode">
            Payment Mode<span className="CreateGoodReceipts-required">*</span>:
          </label>
          <select
            name="paymentMode"
            id="paymentMode"
            value={formData.paymentMode}
            onChange={handleInputChange}
            className="CreateGoodReceipts-select"
            required
          >
            <option value="Credit">Credit</option>
            <option value="Cash">Cash</option>
            <option value="Online">Online</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="CreateGoodReceipts-form-group">
          <label className="CreateGoodReceipts-label" htmlFor="creditPeriod">
            Credit Period (days):
          </label>
          <input
            type="number"
            name="creditPeriod"
            id="creditPeriod"
            value={formData.creditPeriod}
            onChange={handleInputChange}
            className="CreateGoodReceipts-input-number"
            min="0"
          />
        </div>
      </div>

      <table className="CreateGoodReceipts-items-table">
        <thead>
          <tr>
            <th className="CreateGoodReceipts-table-header">Category</th>
            <th className="CreateGoodReceipts-table-header">Item Name</th>
            <th className="CreateGoodReceipts-table-header">Batch No</th>
            <th className="CreateGoodReceipts-table-header">Expiry Date</th>
            <th className="CreateGoodReceipts-table-header">Quantity</th>
            <th className="CreateGoodReceipts-table-header">Free Qty</th>
            <th className="CreateGoodReceipts-table-header">Rate</th>
            <th className="CreateGoodReceipts-table-header">Dis (%)</th>
            <th className="CreateGoodReceipts-table-header">VAT (%)</th>
            <th className="CreateGoodReceipts-table-header">Cc Charge (%)</th>
            <th className="CreateGoodReceipts-table-header">Other Charge</th>
            <th className="CreateGoodReceipts-table-header">Total Amount</th>
            <th className="CreateGoodReceipts-table-header">Remarks</th>
            <th className="CreateGoodReceipts-table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.items.map((item, index) => (
            <tr key={index} className="CreateGoodReceipts-table-row">
              <td>
                <select
                  value={item.category}
                  onChange={(e) =>
                    handleItemChange(index, "category", e.target.value)
                  }
                  className="CreateGoodReceipts-select"
                >
                  <option value="Consumables">Consumables</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Medicines">Medicines</option>
                  {/* Add more options as needed */}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={item.itemName}
                  onChange={(e) =>
                    handleItemChange(index, "itemName", e.target.value)
                  }
                  className="CreateGoodReceipts-input-text"
                  placeholder="Item Name"
                />
                <button
                  className="CreateGoodReceipts-info-button"
                  title="Item Information"
                >
                  ?
                </button>
              </td>
              <td>
                <input
                  type="text"
                  value={item.batchNo}
                  onChange={(e) =>
                    handleItemChange(index, "batchNo", e.target.value)
                  }
                  className="CreateGoodReceipts-input-text"
                  placeholder="Batch No"
                />
              </td>
              <td>
                <input
                  type="date"
                  value={item.expiryDate}
                  onChange={(e) =>
                    handleItemChange(index, "expiryDate", e.target.value)
                  }
                  className="CreateGoodReceipts-input-date"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  className="CreateGoodReceipts-input-number"
                  min="0"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.freeQty}
                  onChange={(e) =>
                    handleItemChange(index, "freeQty", e.target.value)
                  }
                  className="CreateGoodReceipts-input-number"
                  min="0"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) =>
                    handleItemChange(index, "rate", e.target.value)
                  }
                  className="CreateGoodReceipts-input-number"
                  min="0"
                  step="0.01"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.dis}
                  onChange={(e) =>
                    handleItemChange(index, "dis", e.target.value)
                  }
                  className="CreateGoodReceipts-input-number"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.vat}
                  onChange={(e) =>
                    handleItemChange(index, "vat", e.target.value)
                  }
                  className="CreateGoodReceipts-input-number"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.ccCharge}
                  onChange={(e) =>
                    handleItemChange(index, "ccCharge", e.target.value)
                  }
                  className="CreateGoodReceipts-input-number"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.otherCharge}
                  onChange={(e) =>
                    handleItemChange(index, "otherCharge", e.target.value)
                  }
                  className="CreateGoodReceipts-input-number"
                  min="0"
                  step="0.01"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.totalAmount}
                  onChange={(e) =>
                    handleItemChange(index, "totalAmount", e.target.value)
                  }
                  className="CreateGoodReceipts-input-number"
                  readOnly
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.remarks}
                  onChange={(e) =>
                    handleItemChange(index, "remarks", e.target.value)
                  }
                  className="CreateGoodReceipts-input-text"
                  placeholder="Remarks"
                />
              </td>
              <td>
                <button
                  className="CreateGoodReceipts-remove-button"
                  onClick={(e) => removeRow(index, e)}
                  title="Remove Item"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="CreateGoodReceipts-add-row-button" onClick={addNewRow}>
        + Add New Row
      </button>
      <div className="CreateGoodReceipts-items-count">
        Items Count: {formData.items.length}
      </div>

      <div className="CreateGoodReceipts-quality-inspection">
        <label className="CreateGoodReceipts-checkbox-label">
          <input
            type="checkbox"
            checked={formData.addQualityInspection}
            onChange={(e) =>
              setFormData({
                ...formData,
                addQualityInspection: e.target.checked,
              })
            }
            className="CreateGoodReceipts-input-checkbox"
          />
          Add Quality Inspection
        </label>
      </div>

      <div className="CreateGoodReceipts-checked-by">
        <button
          className="CreateGoodReceipts-remove-button"
          title="Remove Checked By"
        >
          -
        </button>
        <span className="CreateGoodReceipts-checked-label">Checked By:</span>
        <input
          type="text"
          value={formData.checkedBy}
          onChange={(e) =>
            setFormData({ ...formData, checkedBy: e.target.value })
          }
          className="CreateGoodReceipts-input-text"
        />
        <button
          className="CreateGoodReceipts-add-button"
          title="Add Checked By"
        >
          +
        </button>
      </div>

      <div className="CreateGoodReceipts-totals">
        <div className="CreateGoodReceipts-form-group">
          <label className="CreateGoodReceipts-label" htmlFor="subTotal">
            SubTotal:
          </label>
          <input
            type="number"
            name="subTotal"
            id="subTotal"
            value={formData.subTotal}
            readOnly
            className="CreateGoodReceipts-input-number"
          />
        </div>
        <div className="CreateGoodReceipts-form-group">
          <label className="CreateGoodReceipts-label" htmlFor="ccCharge">
            Cc Charge:
          </label>
          <input
            type="number"
            name="ccCharge"
            id="ccCharge"
            value={formData.ccCharge}
            readOnly
            className="CreateGoodReceipts-input-number"
          />
        </div>
        <div className="CreateGoodReceipts-form-group">
          <label className="CreateGoodReceipts-label" htmlFor="discountAmount">
            Discount Amount:
          </label>
          <input
            type="number"
            name="discountAmount"
            id="discountAmount"
            value={formData.discountAmount}
            readOnly
            className="CreateGoodReceipts-input-number"
          />
        </div>
        <div className="CreateGoodReceipts-form-group">
          <label className="CreateGoodReceipts-label" htmlFor="vat">
            VAT:
          </label>
          <input
            type="number"
            name="vat"
            id="vat"
            value={formData.vat}
            readOnly
            className="CreateGoodReceipts-input-number"
          />
        </div>
        <div className="CreateGoodReceipts-form-group">
          <label className="CreateGoodReceipts-label" htmlFor="otherCharges">
            Other Charges:
          </label>
          <input
            type="number"
            name="otherCharges"
            id="otherCharges"
            value={formData.otherCharges}
            readOnly
            className="CreateGoodReceipts-input-number"
          />
        </div>
        <div className="CreateGoodReceipts-form-group">
          <label className="CreateGoodReceipts-label" htmlFor="totalAmount">
            Total Amount:
          </label>
          <input
            type="number"
            name="totalAmount"
            id="totalAmount"
            value={formData.totalAmount}
            readOnly
            className="CreateGoodReceipts-input-number"
          />
        </div>
      </div>

      <div className="CreateGoodReceipts-remarks">
        <label className="CreateGoodReceipts-label" htmlFor="remarks">
          Remarks:
        </label>
        <textarea
          name="remarks"
          id="remarks"
          value={formData.remarks}
          onChange={handleInputChange}
          className="CreateGoodReceipts-textarea"
          placeholder="Enter remarks here..."
        ></textarea>
        <div className="CreateGoodReceipts-in-words">In Words: Only.</div>
      </div>

      <div className="CreateGoodReceipts-action-buttons">
        <button className="CreateGoodReceipts-receipt-button">Receipt</button>
        <button className="CreateGoodReceipts-discard-button">
          Discard Changes
        </button>
      </div>
    </div>
  );
};

export default AddGoodsReceipt;
