/* Mohini_PurchaseOrderForm_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './PurchaseOrderForm.css';
import { API_BASE_URL } from '../api/api';
import { startResizing } from '../TableHeadingResizing/resizableColumns';

const PurchaseOrderForm = () => {
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
      suppliersId: ''
    },
    poDate: '',
    deliveryDate: '',
    referenceNo: '',
    deliveryAddress: '',
    contact: '',
    deliveryDays: '',
    invoicingAddress: '',

    goodReceiptItems: [
      {

        addItem: {
          addItemId: ''

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
        remarks
      }],

    subtotal: 0,
    discountPercentage: 0,
    discount: 0,
    taxableAmount: 0,
    nonTaxableAmount: 0,
    vatAmount: 0,
    ccCharge: 0,
    discountAmount: 0,
    totalAmount: 0,
    remarks: '',
    inWords: '',
  });

  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);  // Added to store available items
  const [availableGenerics, setAvailableGenerics] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/suppliers')

      .then(response => {
        console.log(response.data);  // Log the response to check the structure of the data
        setSuppliers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the suppliers!', error);
      });

    axios.get('http://localhost:8080/api/add-items')
      .then(response => {
        console.log(response.data);  // Log the response to check the structure of the data
        setAvailableItems(response.data);  // Store the available items
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
      });

    axios.get(`${API_BASE_URL}/generic-names`) // Replace with your API endpoint for generics
      .then(response => {
        console.log(response.data);  // Log the response to check the structure of the data
        setAvailableGenerics(response.data);  // Store the available generics
      })
      .catch(error => {
        console.error('There was an error fetching the generics!', error);
      });


  }, []);

  const handleSupplierChange = (e) => {
    const selectedSupplier = e.target.value;  // Get the selected supplier ID
    setFormData(prevState => ({
      ...prevState,
      supplier: selectedSupplier  // Update the state with the selected supplier ID
    }));
    setSelectedSupplierId(selectedSupplier);

    // Optionally, you can log or alert the selected supplier ID for debugging
    console.log("Selected Supplier ID:", selectedSupplier);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];

    // Check if the item has a valid addItemId when selecting an item
    if (name === 'itemName') {
      const selectedItem = availableItems.find(item => item.itemName === value);
      if (selectedItem) {
        updatedItems[index].addItemId = selectedItem.addItemId; // Assign addItemId here
      }
    }

    updatedItems[index] = { ...updatedItems[index], [name]: value };

    // Recalculate other fields based on the item changes
    if (name === 'quantity' || name === 'freeQty') {
      const quantity = parseFloat(updatedItems[index].quantity) || 0;
      const freeQty = parseFloat(updatedItems[index].freeQty) || 0;
      updatedItems[index].totalQty = quantity + freeQty; // Update totalQty
    }
    if (name === 'quantity' || name === 'rate') {
      const quantity = parseFloat(updatedItems[index].quantity) || 0;
      const rate = parseFloat(updatedItems[index].rate) || 0;
      updatedItems[index].subtotal = quantity * rate; // Update subtotal
    }

    if (name === 'discountPercentage' || name === 'vatPercentage' || name === 'ccChargePercentage') {
      const discountPercentage = parseFloat(updatedItems[index].discountPercentage) || 0;
      const vatPercentage = parseFloat(updatedItems[index].vatPercentage) || 0;
      const ccChargePercentage = parseFloat(updatedItems[index].ccChargePercentage) || 0;
      const subtotal = updatedItems[index].subtotal || 0;

      updatedItems[index].discountAmount = (discountPercentage / 100) * subtotal;
      updatedItems[index].vatAmount = (vatPercentage / 100) * subtotal;
      updatedItems[index].ccChargeAmount = (ccChargePercentage / 100) * subtotal;

      updatedItems[index].totalAmount = subtotal - updatedItems[index].discountAmount + updatedItems[index].vatAmount + updatedItems[index].ccChargeAmount;
    }

    setItems(updatedItems);
  };


  const addItem = () => {
    setItems([...items, {
      genericName: '',
      quantity: '0',
      freeQty: '0',
      totalQty: '0',
      rate: '0',
      subtotal: '0',
      ccChargePercentage: '0',
      ccChargeAmount: '0',
      discountPercentage: '0',
      discountAmount: '0',
      vatPercentage: '0',
      vatAmount: '0',
      totalAmount: '0',
      remarks: ''
    }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSupplierId) {
      alert("Please select a supplier.");
      return;
    }

    // Form data structured according to your format
    const data = {
      supplier: {
        suppliersId: selectedSupplierId, // Ensure selectedSupplierId is used correctly
      },
      poDate: formData.poDate,
      deliveryDate: formData.deliveryDate,
      referenceNo: formData.referenceNo,
      deliveryAddress: formData.deliveryAddress,
      contact: formData.contact,
      deliveryDays: formData.deliveryDays,
      invoicingAddress: formData.invoicingAddress,
      subtotal: items.reduce((acc, item) => acc + parseFloat(item.subtotal || 0), 0).toFixed(2),
      discountPercentage: (items.reduce((acc, item) => acc + parseFloat(item.discountPercentage || 0), 0) / items.length).toFixed(2),
      discount: (items.reduce((acc, item) => acc + parseFloat(item.discountAmount || 0), 0) / items.length).toFixed(2),
      taxableAmount: items.reduce(
        (acc, item) => acc + (parseFloat(item.subtotal || 0) - parseFloat(item.discountAmount || 0)),
        0
      ).toFixed(2),
      nonTaxableAmount: items.reduce(
        (acc, item) => acc + parseFloat(item.discountAmount || 0),
        0
      ).toFixed(2),
      vatAmount: items.reduce((acc, item) => acc + parseFloat(item.vatAmount || 0), 0).toFixed(2),
      ccCharge: items.reduce((acc, item) => acc + parseFloat(item.ccChargeAmount || 0), 0).toFixed(2),
      discountAmount: formData.discountAmount,
      totalAmount: items.reduce((acc, item) => acc + parseFloat(item.totalAmount || 0), 0).toFixed(2),
      inWords: formData.inWords,
      goodReceiptItems: items.map(item => ({
        addItem: {
          addItemId: item.addItemId // Ensure addItemId is included
        },
        genericName: item.genericName,
        batchNumber: item.batchNumber,
        rackNumber: item.rackNumber,
        expiryDate: item.expiryDate,
        itemQuantity: item.quantity,
        freeQuantity: item.freeQty,
        totalQuantity: item.totalQty,
        standardRate: item.rate,
        marginPercentage: item.marginPercentage,
        salePrice: item.salePrice,
        freeAmount: item.freeAmount,
        ccChargePercentage: item.ccChargePercentage,
        subTotal: item.subtotal,
        discountPercentage: item.discountPercentage,
        vatPercentage: item.vatPercentage,
        totalAmount: item.totalAmount,
        remarks: item.remarks
      }))
    };

    // Now, send this data in the required format to the backend
    axios.post('http://localhost:8080/api/purchase-orders', data)
      .then(response => {
        alert('Purchase order saved successfully!');
      })
      .catch(error => {
        console.error('There was an error saving the purchase order!', error);
        alert('Failed to save purchase order.');
      });
  };


  if (!formVisible) {
    return null;
  }

  return (
    <form className="purchase-order-form-component" onSubmit={handleSubmit}>

      {/* <button className="purchase-order-close-button" onClick={handleCloseForm}>
        &times;
      </button> */}
      <div className='div-add-good-purchase'>
        <h5 >Add Purchase Order</h5>
      </div>
      <div className="purchase-order-form-form-row">
        <div className="purchase-order-form-form-group">
          <label>Supplier:*</label>
          <select name="supplier" value={formData.supplier} onChange={handleSupplierChange}>
            <option value="">Select Supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier.suppliersId} value={supplier.suppliersId}>{supplier.supplierName}</option>


            ))}
          </select>
        </div>
        <div className="purchase-order-form-form-group">
          <label>PO Date:*</label>
          <input type="date" name="poDate" value={formData.poDate} onChange={handleInputChange} />
        </div>
        <div className="purchase-order-form-form-group">
          <label>Delivery Days:</label>
          <input type="number" name="deliveryDays" value={formData.deliveryDays} onChange={handleInputChange} />
        </div>
        <div className="purchase-order-form-form-group">
          <label>Delivery Address:</label>
          <textarea className="purchase-order-textare" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleInputChange}></textarea>
        </div>
      </div>

      <div className="purchase-order-form-form-row">
        <div className="purchase-order-form-form-group">
          <label>Delivery Date:</label>
          <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleInputChange} />
        </div>
        <div className="purchase-order-form-form-group">
          <label>Reference No.:</label>
          <input type="text" name="referenceNo" value={formData.referenceNo} onChange={handleInputChange} />
        </div>

        <div className="purchase-order-form-form-group">
          <label>Contact:</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} />
        </div>
        <div className="purchase-order-form-form-group">
          <label>Invoicing Address:</label>
          <textarea className="purchase-order-textare" name="invoicingAddress" value={formData.invoicingAddress} onChange={handleInputChange}></textarea>
        </div>


      </div>



      <table className="purchase-order-form-items-table" ref={tableRef}>
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
              "Action"
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
            <tr key={index}>
              <td>
                <select name="genericName" value={item.genericName} onChange={(e) => handleItemChange(index, e)}>
                  <option value="">Select Generic Name</option>
                  {availableGenerics.map((availableGeneric) => (
                    <option key={availableGeneric.genericNameId} value={availableGeneric.genericName}>
                      {availableGeneric.genericName}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select name="itemName" value={item.itemName} onChange={(e) => handleItemChange(index, e)}>
                  <option value="">Select Item</option>
                  {availableItems.map((availableItem) => (
                    <option key={availableItem.itemId} value={availableItem.itemName}>
                      {availableItem.itemName}
                    </option>
                  ))}
                </select>
              </td>              <td><input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="number" name="freeQty" value={item.freeQty} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="number" name="totalQty" value={item.totalQty} onChange={(e) => handleItemChange(index, e)} disabled /></td>
              <td><input type="number" name="rate" value={item.rate} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="number" name="subtotal" value={item.subtotal} onChange={(e) => handleItemChange(index, e)} disabled /></td>
              <td><input type="number" name="ccChargePercentage" value={item.ccChargePercentage} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="number" name="discountPercentage" value={item.discountPercentage} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="number" name="vatPercentage" value={item.vatPercentage} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="number" name="totalAmount" value={item.totalAmount} onChange={(e) => handleItemChange(index, e)} disabled /></td>
              <td><input type="text" name="remarks" value={item.remarks} onChange={(e) => handleItemChange(index, e)} /></td>
              <td>
                <button type="button" className='purchase-btn-order' onClick={() => removeItem(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="purchase-order-form-summary-buttons" style={{ textAlign: "right" }}>
        <button type="button" className='purchase-btn-order' onClick={addItem}>Add Item</button>
      </div><br></br>
      <div className='goods-receipt-totals-section'>


        <div className="purchase-order-form-summary">
          <div className="purchase-order-form-summary-item">
            <label>Sub Total:</label>
            <input type="text" name="subtotal"
              value={items.reduce((acc, item) => acc + parseFloat(item.subtotal || 0), 0).toFixed(2)}

              readOnly />
            {/* </div> */}
            {/* <div className="purchase-order-form-summary-item"> */}
            <label>Discount %:</label>
            <input type="number" name="discountPercentage"
              value={
                items.length > 0
                  ? (items.reduce((acc, item) => acc + parseFloat(item.discountPercentage || 0), 0) / items.length).toFixed(2)
                  : 0
              } onChange={handleInputChange} />
          </div>
          <div className="purchase-order-form-summary-item">
            <label>Taxable Amount:</label>
            <input type="number" name="taxableAmount"
              value={items.reduce(
                (acc, item) =>
                  acc +
                  (parseFloat(item.subtotal || 0) - parseFloat(item.discountAmount || 0)),
                0
              ).toFixed(2)} onChange={handleInputChange} />
            {/* </div>
        <div className="purchase-order-form-summary-item"> */}
            <label>Non-Taxable Amount:</label>
            <input type="number" name="nonTaxableAmount"
              value={items.reduce(
                (acc, item) => acc + parseFloat(item.discountAmount || 0),
                0
              ).toFixed(2)} onChange={handleInputChange} />
          </div>
          <div className="purchase-order-form-summary-item">
            <label>VAT Amount:</label>
            <input type="number" name="vatAmount"
              value={items.reduce((acc, item) => acc + parseFloat(item.vatAmount || 0), 0).toFixed(2)}

              onChange={handleInputChange} />
            {/* </div>
        <div className="purchase-order-form-summary-item"> */}
            <label>CC Charge:</label>
            <input type="number" name="ccCharge"
              value={items.reduce((acc, item) => acc + parseFloat(item.ccChargeAmount || 0), 0).toFixed(2)}

              onChange={handleInputChange} />
          </div>
          <div className="purchase-order-form-summary-item">
            <label>Discount Amount:</label>
            <input type="number" name="discount"
              value={items.reduce((acc, item) => acc + parseFloat(item.discountAmount || 0), 0).toFixed(2)}

              onChange={handleInputChange} />
            {/* </div>
        <div className="purchase-order-form-summary-item"> */}
            <label>Total Amount:</label>
            <input type="text" name="totalAmount"
              value={items.reduce((acc, item) => acc + parseFloat(item.totalAmount || 0), 0).toFixed(2)}

              onChange={handleInputChange} />
          </div>
          <div className="purchase-order-form-summary-item">
            <label>In Words:</label>
            <input type="text" name="inWords" value={formData.inWords} onChange={handleInputChange} />
          </div>

        </div>

        <div className="purchase-order-form-summary-buttons" style={{ textAlign: "right" }}>
          <button type="submit" className="purchase-btn-order">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default PurchaseOrderForm;
/* Mohini_PurchaseOrderForm_WholePage_14/sep/2024 */
