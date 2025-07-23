import React, { useState } from 'react';
import moment from 'moment';
import { FaSearch } from 'react-icons/fa';
import './canclebill.css'; 

const CancelBillList = () => {
  const [cancelBillList, setCancelBillList] = useState([
    { id: 1, name: 'Alice Johnson', receiptNo: 'R001', ageSex: '40/F', requestOn: '2024-08-20', item: 'Medicine A', status: 'Pending', totalAmount: '$500', billingType: 'Cash', performer: 'Dr. Smith' },
    { id: 2, name: 'Bob Brown', receiptNo: 'R002', ageSex: '35/M', requestOn: '2024-08-18', item: 'Surgery B', status: 'Completed', totalAmount: '$300', billingType: 'Credit', performer: 'Dr. Johnson' },
  ]);

  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [remark, setRemark] = useState('');

  const handleCancelClick = (item) => {
    setCurrentItem(item);
    setShowRemarkModal(true);
  };

  const handleProceedCancel = () => {
    setShowRemarkModal(false);
    setShowConfirmModal(true);
  };

  const confirmCancel = () => {
    setCancelBillList(cancelBillList.filter(item => item.id !== currentItem.id));
    setShowConfirmModal(false);
    setCurrentItem(null);
  };

  return (
    <div className="cancel_bill_list">
      <div className="cancel_bill_nav-content">
        {/* <h1 className="cancel_bill_title">Cancel Bill List</h1> */}
      </div>
      <div className="cancel_bill_date">
  <div className="cancel_bill_date_range">
    <label>From: </label>
    <input className="cancel_bill_input_date" type="date" value="2024-08-05" />
    <label>To: </label>
    <input className="cancel_bill_input_date" type="date" value="2024-08-12" />
    <button className="cancel_bill_star_btn">★</button>
    <button className="cancel_bill_plus_btn">+</button>
    <button className="cancel_bill_ok_btn">
      OK
    </button>
  </div>
</div>


      <div className="cancel_bill_search-print">
        <div className="cancel_bill_search-bar">
          <input
            type="text"
            placeholder="Search by patient name"
            className="cancel_bill_inputsearchbar"
          />
          <button className="cancel_bill_searchbar-btn">
            <FaSearch style={{ color: 'black', fontSize: '18px' }} />
          </button>
        </div>

        <div className="cancel_bill_print">
          <button className="cancel_bill_print-btn">
            Print
          </button>
        </div>
      </div>

      <table className="cancel_bill_table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Receipt No</th>
            <th>Age/Sex</th>
            <th>Request On</th>
            <th>Item</th>
            <th>Status</th>
            <th>Total Amount</th>
            <th>Billing Type</th>
            <th>Performer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cancelBillList.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.receiptNo}</td>
              <td>{item.ageSex}</td>
              <td>{moment(item.requestOn).format('YYYY-MM-DD')}</td>
              <td>{item.item}</td>
              <td>{item.status}</td>
              <td>{item.totalAmount}</td>
              <td>{item.billingType}</td>
              <td>{item.performer}</td>
              <td><button className='cancel_bill_action-btn' onClick={() => handleCancelClick(item)}>Cancel</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Remark Modal */}
      {showRemarkModal && (
        <div className="cancel_bill_modal">
          <div className="cancel_bill_modal_content">
            <h2>Enter Cancellation Remark</h2>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter your remark here..."
              className="cancel_bill_textarea"
            />
            <button onClick={handleProceedCancel}>Proceed</button>
            <button onClick={() => setShowRemarkModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="cancel_bill_modal">
          <div className="cancel_bill_modal_content">
            <h2>Are you sure you want to cancel this item for this Patient?</h2>
            <button onClick={confirmCancel}>Yes</button>
            <button onClick={() => setShowConfirmModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelBillList;
