// import React, { useState } from 'react';
// import "../DisStocks/dispenStockRequisitionCreateReq.css"

// function DispenStockRequisitionCreateReq({ onClose }) {
//   const [requisitionDate, setRequisitionDate] = useState('');
//   const [items, setItems] = useState([{ genericName: '', itemName: '', code: '', uom: '', availableQty: 0, requestingQty: 1, remark: '' }]);

//   const addItem = () => {
//     setItems([...items, { genericName: '', itemName: '', code: '', uom: '', availableQty: 0, requestingQty: 1, remark: '' }]);
//   };

//   const removeItem = (index) => {
//     const newItems = items.filter((_, i) => i !== index);
//     setItems(newItems);
//   };

//   const handleInputChange = (index, event) => {
//     const { name, value } = event.target;
//     const newItems = [...items];
//     newItems[index][name] = value;
//     setItems(newItems);
//   };

//   return (
//     <div className="dispenStockRequisitionCreateReq-form">
//       <h3>* Add Requisition</h3>
//       <div className="dispenStockRequisitionCreateReq-date-input">
//         <label>Requisition Date:</label>
//         <input
//           type="date"
//           value={requisitionDate}
//           onChange={(e) => setRequisitionDate(e.target.value)}
//         />
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th></th>
//             <th>GenericName</th>
//             <th>ItemName</th>
//             <th>Code</th>
//             <th>UOM</th>
//             <th>Available Qty in Store</th>
//             <th>Requesting Quantity</th>
//             <th>Remark</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item, index) => (
//             <tr key={index}>
//               <td>
//                 <button className="dispenStockRequisitionCreateReq-remove-btn" onClick={() => removeItem(index)}>X</button>
//                  </td>
//               <td>
//                 <select
//                   name="genericName"
//                   value={item.genericName}
//                   onChange={(e) => handleInputChange(index, e)}
//                 >
//                   <option value="">--Select Generic Name--</option>
//                   {/* Add more options here */}
//                 </select>
//               </td>
//               <td>
//                 <input type="text" name="itemName" value={item.itemName} onChange={(e) => handleInputChange(index, e)} />
//                 </td>
//               <td>
//                 {/* <input type="text" name="code" value={item.code} onChange={(e) => handleInputChange(index, e)} /> */}
//                 </td>
//               <td>
//                 {/* <input type="text" name="uom" value={item.uom} onChange={(e) => handleInputChange(index, e)} /> */}
//                 </td>
//               <td><input type="number" name="availableQty" value={item.availableQty} onChange={(e) => handleInputChange(index, e)} /></td>
//               <td><input type="number" name="requestingQty" value={item.requestingQty} onChange={(e) => handleInputChange(index, e)} /></td>
//               <td><input type="text" name="remark" value={item.remark} onChange={(e) => handleInputChange(index, e)} /></td>
//               <td>
//                 {index === items.length - 1 && <button className="dispenStockRequisitionCreateReq-add-btn" onClick={addItem}>+</button>}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="dispenStockRequisitionCreateReq-button-group">
//         <button className="dispenStockRequisitionCreateReq-request-btn">Request</button>
//         <button className="dispenStockRequisitionCreateReq-cancel-btn"onClick={onClose}>Cancel</button>
//       </div>
//     </div>
//   );
// }

// export default DispenStockRequisitionCreateReq;

 /* Ajhar Tamboli dispenStockRequisitionCreateReq.jsx 19-09-24 */
 import React, { useState } from 'react';
import "../DisStocks/dispenStockRequisitionCreateReq.css";

// Sample list for generic names; you could replace this with an API call
const availableGenericNames = [
  "IBUGESIC SYRUP 100ML",
  "PARACETAMOL 500MG",
  "AMOXICILLIN CAPSULE 500MG",
  // Add more generic names here
];


function DispenStockRequisitionCreateReq({ onClose }) {
  const [requesterInfo] = useState({
    requestedBy: 'Admin',  // Static value for Requested By
    requestedFrom: 'Main Store'  // Static value for Requested From
  });
  const [requisitionDate, setRequisitionDate] = useState('');
  const [items, setItems] = useState([{
    genericName: '',
    genericItemName: '',
    genericCode: '',
    genericQty: '',
    availableQty: 0,
    requestingQuantity: 1,
    genericRemark: ''
  }]);

  // Add item
  const addItem = () => {
    setItems([
      ...items,
      { genericName: '', genericItemName: '', genericCode: '', genericQty: '', availableQty: 0, requestingQuantity: 1, genericRemark: '' }
    ]);
  };

  // Remove item
  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Handle input changes
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  // Validate form inputs
  const validateForm = () => {
    // Ensure that all fields are filled for each item
    return items.every(item => item.genericName && item.genericItemName && item.genericCode && item.genericQty && item.requestingQuantity);
  };

  // Handle form submission to post data
  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields for each item.");
      return;
    }

    try {
      const payload = { 
        requestBy: requesterInfo.requestedBy, // Add Requested By to payload
        requestFrom: requesterInfo.requestedFrom,
        date:requisitionDate,
        // Include requisition date
        pharmacyRequisitions: items.map((item) => ({
          genericName: item.genericName,
          genericItemName: item.genericItemName,
          genericCode: item.genericCode,
          genericQty: item.genericQty,
          requestingQuantity: item.requestingQuantity,
          remark: item.genericRemark,
        }))
      }; 

      console.log(payload);

      const response = await fetch('http://localhost:3155/api/requisitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Requisition created successfully:', result);
        alert('Requisition created successfully!');
        onClose(); // Close the form on successful submission
      } else {
        console.error('Error creating requisition:', response.statusText);
        alert('Failed to create requisition.');
      }
    } catch (error) {
      console.error('Error creating requisition:', error);
      alert('Error creating requisition. Please try again.');
    }
  };

  return (
    <div className="dispenStockRequisitionCreateReq-form">
      <h3>* Add Requisition</h3>
      <div className="dispenStockRequisitionCreateReq-date-input">
        <label>Requisition Date:</label>
        <input
          type="date"
          value={requisitionDate}
          onChange={(e) => setRequisitionDate(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>GenericName</th>
            <th>ItemName</th>
            <th>Code</th>
            <th>UOM</th>
            <th>Available Qty in Store</th>
            <th>Requesting Quantity</th>
            <th>Remark</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <button className="dispenStockRequisitionCreateReq-remove-btn" onClick={() => removeItem(index)}>X</button>
              </td>
              <td>
                <select
                  className='dispenStockRequisitionCreateReq-select'
                  name="genericName"
                  value={item.genericName}
                  onChange={(e) => handleInputChange(index, e)}
                >
                  <option value="">--Select Generic Name--</option>
                  {availableGenericNames.map((name, i) => (
                    <option key={i} value={name}>{name}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  className='dispenStockRequisitionCreateReq-input'
                  type="text"
                  name="genericItemName"
                  value={item.genericItemName}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  className='dispenStockRequisitionCreateReq-input'
                  type="text"
                  name="genericCode"
                  value={item.genericCode}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  className='dispenStockRequisitionCreateReq-input'
                  type="text"
                  name="genericQty"
                  value={item.genericQty}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  className='dispenStockRequisitionCreateReq-input'
                  type="number"
                  name="availableQty"
                  value={item.availableQty}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  className='dispenStockRequisitionCreateReq-input'
                  type="number"
                  name="requestingQuantity"
                  value={item.requestingQuantity}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  className='dispenStockRequisitionCreateReq-input'
                  type="text"
                  name="genericRemark"
                  value={item.genericRemark}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                {index === items.length - 1 && (
                  <button className="dispenStockRequisitionCreateReq-add-btn" onClick={addItem}>+</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="dispenStockRequisitionCreateReq-button-group">
        <button className="dispenStockRequisitionCreateReq-request-btn" onClick={handleSubmit}>Request</button>
        <button className="dispenStockRequisitionCreateReq-cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default DispenStockRequisitionCreateReq;
