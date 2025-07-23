




import React, { useState, useEffect } from 'react';
import './AddBreakageItem.css';
import { API_BASE_URL } from '../api/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AddBreakeageItem = () => {
  const [items, setItems] = useState([
    {
      itemName: '',
      avlQty: 0,
      batch: '',
      expDate: '',
      qty: 0,
      salePrice: 0,
      subTotal: 0,
      discount: 0,
      vat: 0,
      totalAmount: 0,
    },
  ]);
  const [totalAmountWords, setTotalAmountWords] = useState('Only.');
  const [breakageDate, setBreakageDate] = useState('');
  const [remark, setRemark] = useState('');
  const [itemList, setItemList] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/add-item`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          const extractedItems = data.map((item) => ({
            id: item?.addItemId,
            name: item?.itemMaster?.itemName,
            quantity: item.itemQty,
            batchNo: item.batchNo,
            expDate: item.expiryDate,
            salePrice: item.salePrice,
          }));
          setItemList(extractedItems);
        } else {
          console.error('API response is not an array');
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const numberToWords = (num) => {
    const belowTwenty = [
      'Zero',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const thousands = ['', 'Thousand', 'Million', 'Billion'];

    if (num === 0) return 'Zero';

    const convert = (n) => {
      if (n < 20) return belowTwenty[n];
      if (n < 100)
        return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + belowTwenty[n % 10] : '');
      if (n < 1000)
        return (
          belowTwenty[Math.floor(n / 100)] +
          ' Hundred' +
          (n % 100 !== 0 ? ' ' + convert(n % 100) : '')
        );
      for (let i = 0, unit = 1; i < thousands.length; i++, unit *= 1000) {
        if (n < unit * 1000) {
          return (
            convert(Math.floor(n / unit)) +
            ' ' +
            thousands[i] +
            (n % unit !== 0 ? ' ' + convert(n % unit) : '')
          );
        }
      }
    };

    return convert(num);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        itemName: '',
        avlQty: 0,
        batch: '',
        expDate: '',
        qty: 0,
        salePrice: 0,
        subTotal: 0,
        discount: 0,
        vat: 0,
        totalAmount: 0,
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    updateTotalAmountWords(updatedItems);
  };

  const updateTotalAmountWords = (updatedItems) => {
    const grandTotal = updatedItems.reduce((sum, item) => sum + item.totalAmount, 0);
    setTotalAmountWords(numberToWords(grandTotal) + ' Only.');
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === 'qty' || field === 'salePrice') {
      const qty = updatedItems[index].qty || 0;
      const salePrice = updatedItems[index].salePrice || 0;
      const subTotal = qty * salePrice;
      updatedItems[index].subTotal = subTotal;

      const discount = updatedItems[index].discount || 0;
      const vat = updatedItems[index].vat || 0;
      const amountAfterDiscount = subTotal - discount;
      const totalAmount = amountAfterDiscount + (amountAfterDiscount * vat) / 100;
      updatedItems[index].totalAmount = totalAmount;
    }

    if (field === 'itemName') {
      const selectedItem = itemList.find((item) => item.id === parseInt(value));
      if (selectedItem) {
        updatedItems[index] = {
          ...updatedItems[index],
          avlQty: selectedItem.quantity,
          batch: selectedItem.batchNo,
          expDate: selectedItem.expDate,
          salePrice: selectedItem.salePrice,
        };
      }
    }

    setItems(updatedItems);
    updateTotalAmountWords(updatedItems);
  };

  const handleRequest = () => {
    const postData = {
      subTotal: items.reduce((sum, item) => sum + item.subTotal, 0),
      discountAmt: items.reduce((sum, item) => sum + item.discount, 0),
      vatPercent: items.reduce((sum, item) => sum + item.vat, 0) / items.length,
      totalAmount: items.reduce((sum, item) => sum + item.totalAmount, 0),
      breakageDate,
      remark,
      breakageItemLists: items.map((item) => ({
        qty: item.qty,
        total: item.subTotal,
        addItemDTO: {
          addItemId: parseInt(item.itemName),
        },
      })),
    };

    fetch(`${API_BASE_URL}/breakage-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data posted:', data);
        alert('Data successfully posted');
      })
      .catch((error) => console.error('Error posting data:', error));
  };

  const handlePrint = () => {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(16);
    doc.text('Breakage Item Report', doc.internal.pageSize.width / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Breakage Date: ${breakageDate}`, 14, 25);
    doc.text(`Total Amount: ${items.reduce((sum, item) => sum + item.totalAmount, 0)}`, 14, 35);

    const tableData = items.map((item) => [
      item.itemName,
      item.avlQty,
      item.batch,
      item.expDate,
      item.qty,
      item.salePrice,
      item.subTotal,
      item.discount,
      item.vat,
      item.totalAmount,
    ]);

    const headers = [
      'Item Name',
      'Avl Qty',
      'Batch',
      'Exp Date',
      'Qty',
      'Sale Price',
      'Sub Total',
      'Discount Amt',
      'VAT %',
      'Total Amount',
    ];

    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 45,
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

    const pdfOutput = doc.output('bloburl');
    window.open(pdfOutput, '_blank');
  };

  return (
    <div className="breakage-container">
      <div className="breakage-header">
        <span>Breakage Item(s)</span>
      </div>
      <table className="breakage-table">
        <thead>
          <tr>
            <th>Action</th>
            <th>Item Name</th>
            <th>Avl Qty</th>
            <th>Batch</th>
            <th>Exp Date</th>
            <th>Qty</th>
            <th>Sale Price</th>
            <th>Sub Total</th>
            <th>Discount Amt</th>
            <th>VAT %</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <button className="remove-button" onClick={() => handleRemoveItem(index)}>
                  Delete
                </button>
              </td>
              <td>
                <select
                  value={item.itemName}
                  onChange={(e) => handleChange(index, 'itemName', e.target.value)}
                >
                  <option value="">Select Item</option>
                  {itemList.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input type="number" value={item.avlQty} readOnly />
              </td>
              <td>
                <input
                  type="text"
                  value={item.batch}
                  onChange={(e) => handleChange(index, 'batch', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={item.expDate}
                  onChange={(e) => handleChange(index, 'expDate', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => handleChange(index, 'qty', parseFloat(e.target.value) || 0)}
                />
              </td>
              <td>
                <input type="number" value={item.salePrice} readOnly />
              </td>
              <td>
                <input type="number" value={item.subTotal} readOnly />
              </td>
              <td>
                <input
                  type="number"
                  value={item.discount}
                  onChange={(e) => handleChange(index, 'discount', parseFloat(e.target.value) || 0)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.vat}
                  onChange={(e) => handleChange(index, 'vat', parseFloat(e.target.value) || 0)}
                />
              </td>
              <td>
                <input type="number" value={item.totalAmount} readOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="action-row">
        <button className="add-item-button" onClick={handleAddItem}>
          Add Item
        </button>
      </div>

      <div className="breakage-details">
        <div className="left-panel">
          <div className="input-container">
            <label>Select Breakage Date:</label>
            <input
              type="date"
              value={breakageDate}
              onChange={(e) => setBreakageDate(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Remark:</label>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="right-panel">
          <div className="input-container">
            <label>Total Amount:</label>
            <input type="number" value={items.reduce((sum, item) => sum + item.totalAmount, 0)} readOnly />
          </div>
          <div className="input-container">
            <label>In Words:</label>
            <input type="text" value={totalAmountWords} readOnly />
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="request-button" onClick={handleRequest}>
          Request
        </button>
        <button className="cancel-button">Cancel</button>
        <button className="cancel-button" onClick={handlePrint}>
          Print
        </button>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default AddBreakeageItem;