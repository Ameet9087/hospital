import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import "../SSPharmacy/sSPharmacyReqCreateReq.css";
import { API_BASE_URL } from '../../../api/api';
import { useParams } from 'react-router-dom';

const SSPharmacyReqCreateReq = ({ onClose }) => {
  // General Form States
  const { store } = useParams();
  const [requisitionDate, setRequisitionDate] = useState('2024-08-29');
  const [issueNo, setIssueNo] = useState('');
  const [remarks, setRemarks] = useState('');
  const [needVerification, setNeedVerification] = useState(true);
  const [checkedBy, setCheckedBy] = useState('Mr. admin admin');
  const [chooseItem, setChooseItem] = useState([]);

  // Inventory Item State (single object)
  const [item, setItem] = useState({
    itemName: '',
    unit: '',
    availableQtyInStore: '',
    requiredQuantity: '',
    remark: '',
    genericName: '',
    batchNo: '',
    expiryDate: '',
    salePrice: ''
  });

  // Fetch items on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/add-items`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChooseItem(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle item selection from dropdown
  const handleItemSelection = (e) => {
    const selectedItemName = e.target.value;

    // Find the selected item from chooseItem array
    const selectedItem = chooseItem.find(item => item.itemName === selectedItemName);

    // Update the state with the selected item details
    if (selectedItem) {
      console.log(selectedItem);
      
      setItem({
        itemName: selectedItem.itemName,
        unit: selectedItem.unitOfMeasurementPayload.name,
        availableQtyInStore: selectedItem.minStockQuantity,
        requiredQuantity: '', // You might want this to remain empty
        remark: selectedItem.remark,
        genericName: selectedItem?.genericNameDTO?.genericName,
        batchNo: selectedItem.batchNo,
        expiryDate: selectedItem.expiryDate,
        salePrice: selectedItem.salesRate
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields as needed
    if (!issueNo) {
      alert('Issue No is required.');
      return;
    }

    const requisitionData = {
      itemName: item.itemName,
      unit: item.unit,
      availableQtyInStore: Number(item.availableQtyInStore),
      requiredQuantity: Number(item.requiredQuantity),
      requestedBy: 'Dr. Smith', // This can be dynamic based on your application
      remark: item.remark,
      requestedDate: requisitionDate,
      storeName: store, 
      genericName: item.genericName,
      batchNo: item.batchNo,
      expiryDate: item.expiryDate,
      salePrice: parseFloat(item.salePrice),
      isVerify: needVerification ? 'Yes' : 'No',
      verifiedBy: 'N/A', // Update as necessary
      needsVerification: needVerification ? 'Yes' : 'No',
      status: 'Pending',
      dispatchQty: 0
    };

    try {
      console.log(requisitionData);

      const response = await fetch(`${API_BASE_URL}/pharmacyRequisitions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requisitionData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Requisition submitted successfully:', result);
        alert('Requisition submitted successfully!');
        onClose(false); // Close the form/modal
      } else {
        const errorData = await response.json();
        console.error('Failed to submit requisition:', errorData);
        alert('Failed to submit requisition. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting requisition:', error);
      alert('An error occurred while submitting the requisition.');
    }
  };
  const handleItemChange = (field, value) => {
    setItem(prevItem => ({
      ...prevItem,
      [field]: value
    }));
  };
  return (
    <div className="sSPharmacyReqCreateReq-form">
      <h2 className="sSPharmacyReqCreateReq-form-title">Add Requisition</h2>
      <form onSubmit={handleSubmit}>
        {/* General Information */}
        <div className="sSPharmacyReqCreateReq-form-row">
          <div className="sSPharmacyReqCreateReq-form-group">
            <label htmlFor="issueNo">Issue No : *</label>
            <input
              type="text"
              id="issueNo"
              placeholder="Enter Issue Number"
              value={issueNo}
              onChange={(e) => setIssueNo(e.target.value)}
              required
            />
          </div>
          <div className="sSPharmacyReqCreateReq-form-group">
            <label htmlFor="requisitionDate">Requisition Date :</label>
            <div className="sSPharmacyReqCreateReq-date-input">
              <input
                type="date"
                id="requisitionDate"
                value={requisitionDate}
                onChange={(e) => setRequisitionDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Inventory Item Fields */}
        <table className="sSPharmacyReqCreateReq-inventory-table">
          <thead>
            <tr>
              <th>Item Name *</th>
              <th>Unit *</th>
              <th>Available Qty in Store</th>
              <th>Required Quantity *</th>
              <th>Generic Name</th>
              <th>Batch No</th>
              <th>Expiry Date</th>
              <th>Sale Price</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select
                  value={item.itemName}
                  onChange={handleItemSelection}
                  className='SSPharmacy-input'
                  required
                >
                  <option value="">Select Item</option>
                  {chooseItem.map((item, index) => (
                    <option key={index} value={item.itemName}>
                      {item.itemName}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  className='SSPharmacy-input'
                  value={item.unit}
                  onChange={(e) => handleItemChange('unit', e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.availableQtyInStore}
                  className='SSPharmacy-input'
                  onChange={(e) => handleItemChange('availableQtyInStore', e.target.value)}
                  min="0"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.requiredQuantity}
                  className='SSPharmacy-input'
                  onChange={(e) => handleItemChange('requiredQuantity', e.target.value)}
                  min="1"
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.genericName}
                  className='SSPharmacy-input'
                  onChange={(e) => handleItemChange('genericName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.batchNo}
                  className='SSPharmacy-input'
                  onChange={(e) => handleItemChange('batchNo', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={item.expiryDate}
                  className='SSPharmacy-input'
                  onChange={(e) => handleItemChange('expiryDate', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  value={item.salePrice}
                  className='SSPharmacy-input'
                  onChange={(e) => handleItemChange('salePrice', e.target.value)}
                  min="0"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.remark}
                  className='SSPharmacy-input'
                  onChange={(e) => handleItemChange('remark', e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Form Actions */}
        <div className="sSPharmacyReqCreateReq-form-actions">
          <button type="submit" className="sSPharmacyReqCreateReq-submit-button">Request</button>
          <button
            type="button"
            className="sSPharmacyReqCreateReq-cancel-button"
            onClick={onClose}
          >
            Discard Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SSPharmacyReqCreateReq;
