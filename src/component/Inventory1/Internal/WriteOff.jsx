import React, { useEffect, useRef, useState } from 'react';
import "./WriteOff.css";
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import { API_BASE_URL } from '../../api/api';

const WriteOff = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [rows, setRows] = useState([
    {
      itemName: '',
      code: '0',
      availableQty: '0',
      writeOffQty: '0',
      writeOffDate: '',
      remark: '',
      itemRate: '0',
      subTotal: '0',
      vat: '0',
      totalAmount: '0',
    },
  ]);
  const [items, setItems] = useState([]);

  // Fetch items data from API when component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/items/all`);
        if (response.ok) {
         
          const data = await response.json();
          setItems(data); // Assuming the data is an array of items
        } else {
          console.error('Failed to fetch items');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleAddRow = () => {
    setRows([...rows, {
      itemName: '',
      code: '0',
      availableQty: '0',
      writeOffQty: '0',
      writeOffDate: '',
      remark: '',
      itemRate: '0',
      subTotal: '0',
      vat: '0',
      totalAmount: '0',
    }]);
  };

  const handleRemoveRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleItemSelect = (index, selectedItemName) => {
    const selectedItem = items.find(item => item.itemName === selectedItemName);
    console.log(selectedItem);
    
    if (selectedItem) {
      const updatedRows = rows.map((row, i) => {
        if (i === index) {
          return {
            ...row,
            itemName: selectedItem.itemName,
            code: selectedItem.itemCode,
            availableQty: selectedItem.minStockQuantity,
            itemRate: selectedItem.standardRate,
            writeOffQty: '0',
            subTotal: '0',
            vat: '0',
            totalAmount: '0',
          };
        }
        return row;
      });
      setRows(updatedRows);
    }
  };
  

  const handleChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        const newRow = { ...row, [field]: value };

        // Recalculate fields when writeOffQty or itemRate changes
        if (field === 'writeOffQty' || field === 'itemRate') {
          const subTotal = parseFloat(newRow.itemRate) * parseFloat(newRow.writeOffQty);
          const vat = subTotal * 0.05; // Assuming 5% VAT
          const totalAmount = subTotal + vat;

          newRow.subTotal = subTotal.toFixed(2);
          newRow.vat = vat.toFixed(2);
          newRow.totalAmount = totalAmount.toFixed(2);
        }

        return newRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/writeoffgoods/createWriteOffGoods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rows), // Send all rows as an array
      });

      if (response.ok) {
        alert('Write Off Request Added Successfully ')
        console.log('Write-Off Goods submitted successfully');
        // Handle success response
      } else {
        console.error('Failed to submit Write-Off Goods');
        // Handle error response
      }
    } catch (error) {
      console.error('Error submitting Write-Off Goods:', error);
      // Handle network error
    }
  };

  const totalSubTotal = rows.reduce((sum, row) => sum + parseFloat(row.subTotal), 0).toFixed(2);
  const totalVat = rows.reduce((sum, row) => sum + parseFloat(row.vat), 0).toFixed(2);
  const totalAmount = rows.reduce((sum, row) => sum + parseFloat(row.totalAmount), 0).toFixed(2);

  return (
    <div className='writeOff-content'>
      <div className="table-container">
        <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "",
                "Item Name *",
                "Code",
                "Available Qty",
                "Write-Off Qty *",
                "Write-Off Date *",
                "Remark *",
                "Item Rate",
                "Sub Total",
                "VAT %",
                "Total Amount"
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
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <button className="writeOff-remove-row" onClick={() => handleRemoveRow(index)}>✖</button>
                  <button className='writeOff-add-row' onClick={handleAddRow}>+</button>
                </td>
                <td>
                  <select className='writeOff-input' value={row.itemName} onChange={(e) => handleItemSelect(index, e.target.value)}>
                    <option value="">Select Item</option>
                    {items.map((item, idx) => (
                      <option key={idx} value={item.itemName}>
                        {item.itemName}
                      </option>
                    ))}
                  </select>
                </td>
                <td><input className='writeOff-input' type="text" value={row.code} readOnly /></td>
                <td><input className='writeOff-input' type="text" value={row.availableQty} readOnly /></td>
                <td><input className='writeOff-input' type="text" value={row.writeOffQty} onChange={(e) => handleChange(index, 'writeOffQty', e.target.value)} /></td>
                <td><input className='writeOff-input' type="date" value={row.writeOffDate} onChange={(e) => handleChange(index, 'writeOffDate', e.target.value)} /></td>
                <td><input className='writeOff-input' type="text" value={row.remark} onChange={(e) => handleChange(index, 'remark', e.target.value)} /></td>
                <td><input className='writeOff-input' type="text" value={row.itemRate} onChange={(e) => handleChange(index, 'itemRate', e.target.value)} /></td>
                <td><input className='writeOff-input' type="text" value={row.subTotal} readOnly /></td>
                <td><input className='writeOff-input' type="text" value={row.vat} readOnly /></td>
                <td><input className='writeOff-input' type="text" value={row.totalAmount} readOnly /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='writeOff-totals-container'>
          <div className="writeOff-totals">
            <div className="writeOff-total-field">
              <label>SubTotal:</label>
              <input type="text" value={totalSubTotal} readOnly />
            </div>
            <div className="writeOff-total-field">
              <label>VAT:</label>
              <input type="text" value={totalVat} readOnly />
            </div>
            <div className="writeOff-total-field">
              <label>Total Amount:</label>
              <input type="text" value={totalAmount} readOnly />
            </div>
          </div>
          <div className="writeOff-buttons">
            <button className="writeOff-write-off-request" onClick={handleSubmit}>Write-Off Request</button>
            <button className="writeOff-cancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteOff;
