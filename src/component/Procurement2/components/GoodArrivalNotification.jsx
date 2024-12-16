import React, { useRef, useState, useEffect } from 'react';
import ReactToPrint from 'react-to-print';
import './GoodArrivalNotification.css';
import AddGoodsReceipt from '../components/GoodsReceipt'; 
import CustomModal from '../../../CustomModel/CustomModal';

function DonationInterface() {
  const componentRef = useRef();
  const [showReceiptForm, setShowReceiptForm] = useState(false);
  const [goodsReceipts, setGoodsReceipts] = useState([]);

  const toggleReceiptForm = () => {
    setShowReceiptForm((prev) => !prev);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      height: "80%",
      overflow: "auto",
    },
  };

  // Fetch goods receipts data on component mount
  useEffect(() => {
    // You should replace this with your actual API call
    fetch('http://localhost:8080/api/goods-receipts/getAll')
      .then(response => response.json())
      .then(data => setGoodsReceipts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="DonationInterface-container">
      <div className="DonationInterface-header">
        <button className="DonationInterface-btn-primary" onClick={toggleReceiptForm}>
          + Create Goods Receipt
        </button>
        <div className="DonationInterface-status-filter">
          <span>List by Status:</span>
          <select>
            <option>Complete</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>
      
      <div className="DonationInterface-date-range">
        <span>From:</span>
        <input type="date" value="2024-07-11" />
        <span>To:</span>
        <input type="date" value="2024-07-29" />
        <button className="DonationInterface-btn-star">★</button>
        <button className="DonationInterface-btn-reset">-</button>
        <button className="DonationInterface-btn-ok">OK</button>
      </div>
      
      <div className="DonationInterface-search-bar">
        <input type="text" placeholder="Search" />
        <button className="DonationInterface-btn-search">Q</button>
      </div>
      
      <div className="DonationInterface-results-info">
        <span>Showing {goodsReceipts.length} results</span>
        <button className="DonationInterface-btn-secondary">Export</button>
        <ReactToPrint
          trigger={() => <button className="DonationInterface-btn-secondary">Print</button>}
          content={() => componentRef.current}
        />
      </div>
      
      <div ref={componentRef}>
        <table className="DonationInterface-data-table">
          <thead>
            <tr>
              <th>GRN</th>
              <th>GR Date</th>
              <th>Vendor</th>
              <th>Vendor Bill Date</th>
              <th>Bill No</th>
              <th>Payment Mode</th>
              <th>Total Amount</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {goodsReceipts.length > 0 ? (
              goodsReceipts.map((receipt) => (
                <tr key={receipt.id}>
                  <td>{receipt.id}</td>
                  <td>{receipt.goodsReceiptDate}</td>
                  <td>{receipt.vendor.vendorName}</td>
                  <td>{receipt.vendorBillDate}</td>
                  <td>{receipt.billNo}</td>
                  <td>{receipt.paymentMode}</td>
                  <td>{receipt.totalAmount}</td>
                  <td>{receipt.remarks}</td>
                  <td>
                    <button className="DonationInterface-btn-action">View</button>
                    <button className="DonationInterface-btn-action">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="DonationInterface-no-data">No Rows To Show</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CustomModal
        isOpen={showReceiptForm}
        onClose={() => setShowReceiptForm(false)}
        style={customStyles}
        contentLabel="Add Purchase Order Draft Modal"
      >
        <AddGoodsReceipt />
      </CustomModal>
    </div>
  );
}

export default DonationInterface;
