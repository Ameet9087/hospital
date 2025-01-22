
import React, { useState, useEffect, useRef } from 'react';
import './ReturnForm.css';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import { API_BASE_URL } from '../api/api';

const ReturnForm = ({ selectedItem }) => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [addItems, setAddItems] = useState([]);

  const [rowData, setRowData] = useState([]);
  // const [loading, setLoading] = useState(false);


console.log(selectedItem);


  const [formData, setFormData] = useState({
    addItemId: selectedItem?.addItem?.addItemId || "",
    breakageQty: "",
    avlQty: (selectedItem?.itemQuantity || 0) + (selectedItem?.freeQuantity || 0), // Calculating Current Available Stock
    batchNumber: selectedItem?.batchNumber || "",
    expiryDate: selectedItem?.expiryDate || "",
    salePrice: selectedItem?.salePrice || "",
    subTotal: selectedItem?.subTotal || "",
    discountAmt: selectedItem?.discountAmount || "",
    vatPercent: selectedItem?.vatPercentage || "",
    totalAmount: selectedItem?.totalAmount || "",
    purchaserate: selectedItem?.purchaseRate || "",
    goodsReceiptItemDTO:{
      goodReceiptItemId:selectedItem?.grItems?.[0]?.goodReceiptItemId || "",
    } ,
    goodReceiptDTO:{
      goodReceiptId: selectedItem?.goodReceiptId || "",
    },
    breakageDate: "",
    remark: "",
    isActive: true,
  });

  console.log(formData.goodReceiptDTO.goodReceiptId);
  

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
   setLoading(true);

   if (!formData.breakageQty || !formData.returnRate) {
      alert("Please fill in all required fields!");
      setLoading(false);
      return;
   }

   
   const returnItemsDTO = [
      {
         returnQty: parseFloat(formData.breakageQty) || 0,
         returnRate: parseFloat(formData.returnRate) || 0,
         returnDisAmt: parseFloat(formData.discountAmt) || 0,
         returnVatAmt: parseFloat(formData.vatPercent) || 0,
         returnCcAmt: parseFloat(formData.ccAmount) || 0,
      },
   ];

   const payload = {
      creditNoteNumber: "CN1234654654",
      returnDate: new Date().toISOString().split("T")[0],
      remarks: formData.remark || "No remarks",
      returnStatus: "done",
      goodReceiptDTO: {
         goodReceiptId: formData.goodReceiptDTO.goodReceiptId,
      },
      goodsReceiptItemDTO: {
         goodReceiptItemId: formData.goodsReceiptItemDTO.goodReceiptItemId,
      },
      returnItemsDTO,
   };

   console.log("Payload:", payload);

   try {
      const response = await fetch(`${API_BASE_URL}/returnsupplier`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(payload),
      });

      if (response.ok) {
         alert("Data submitted successfully!");
         setRowData([]);
         setFormData({
            ...formData,
            breakageQty: "",
            returnRate: "",
            remark: "",
         });
      } else {
         const errorResponse = await response.json();
         console.error("Error response:", errorResponse);
         alert(`Failed to submit data. Status: ${response.status}`);
      }
   } catch (error) {
      console.error("Error submitting data:", error);
   } finally {
      setLoading(false);
   }
};


    
  useEffect(() => {
    const { breakageQty, returnRate } = formData;
    const subtotal = (parseFloat(breakageQty || 0) * parseFloat(returnRate || 0)).toFixed(2);
    setFormData((prevData) => ({ ...prevData, subTotal: subtotal }));
  }, [formData.breakageQty, formData.returnRate]);

  // Populate `addItems` with the grItems data
  useEffect(() => {
    if (selectedItem?.grItems) {
      setAddItems(selectedItem.grItems);
    }
  }, [selectedItem]);


  
  return (
    <div className="return-form-component">
      <div className='suppilerdetailsdiv'>
          <label htmlFor="">Suppiler:{selectedItem.supplier?.supplierName || "N/A"}</label>
          <label htmlFor="">GRNO. {selectedItem?.grItems?.[0]?.goodReceiptItemId || "N/A"}</label>
          <label htmlFor="">Invoice No: {selectedItem.invoiceNumber || "N/A"}</label>
      </div>
      <table className="return-form-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Item Name",
              "Batch No",
              "Received Invoiced Qty",
              "Received Free Qty",
              "Current Avl Stk",
              "Purchase Rate",
              "Return Qty",
              "Return Rate",
              "Subtotal",
              "Return Dis Amt",
              "Return VAT Amt",
              "Return CC Amount",
              "Total Amount",
            ].map((header, index) => (
              <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                <div className="header-content">
                  <span>{header}</span>
                  <div
                    className="resizer"
                    onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                  ></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {addItems.map((item, index) => (
            <tr key={index}>
              <td>{item.addItem?.itemName}</td>
              <td>{item.batchNumber}</td>
              <td>{item.itemQuantity || 0}</td>
              <td>{item.freeQuantity || 0}</td>
              <td>{formData.avlQty}</td>
              <td>{item.purchaseRate || "N/A"}</td>
              <td>
                <input
                  type="number"
                  value={formData.breakageQty}
                  onChange={(e) => setFormData({ ...formData, breakageQty: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={formData.returnRate}
                  onChange={(e) => setFormData({ ...formData, returnRate: e.target.value })}
                />
              </td>
              <td>{formData.subTotal}</td>
              <td>
                <input
                  type="number"
                  value={formData.discountAmt}
                  onChange={(e) => setFormData({ ...formData, discountAmt: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={formData.vatPercent}
                  onChange={(e) => setFormData({ ...formData, vatPercent: e.target.value })}
                />
              </td>
              <td>{item.ccAmount || "N/A"}</td>
              <td>{formData.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="return-summary">
        <div className="summary-item-com">
          <label>SubTotal:</label>
          <input type="text" value={formData.subTotal || "0"} readOnly />
        </div>
        <div className="summary-item-com">
          <label>Discount:</label>
          <input type="text" value={formData.discountAmt || "0"} readOnly />
        </div>
        <div className="summary-item-com">
          <label>VAT Amount:</label>
          <input type="text" value={formData.vatPercent || "0"} readOnly />
        </div>
        
        <div className="summary-item-com">
          <label>CC Amount:</label>
          <input type="text" value={formData.ccAmount || "0"} readOnly />
        </div>
        <div className="summary-item-com">
          <label>Total Amount:</label>
          <input type="text" value={formData.totalAmount || "0"} readOnly />
        </div>
      <div className="summary-item-com">
          <label>Remark:</label>
          <input type="text" value="" />
        </div>

        <div className="summary-item-com">
          <label>Return Status:</label>
         <select name="" id="">
          <option value="">Breakage</option>
          <option value="">Expiry</option>
          <option value="">Breakage and Expiry </option>
         </select>
        </div>
        </div>
      
        
      <div className="summary-item-com-buttons">
      <button className="summary-item-com-return-btn" onClick={handleSubmit} disabled={loading}>{loading ? "Submitting..." : "Return"}</button>
      <button className="summary-item-com-return-btn" onClick={() => setRowData(rowData.map(() => ({})))}>Cancel</button>
      </div>
    </div>
  );
};

export default ReturnForm;
