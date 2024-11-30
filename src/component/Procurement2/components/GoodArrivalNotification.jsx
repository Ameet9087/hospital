import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import './GoodArrivalNotification.css';
import AddGoodsReceipt from '../components/GoodsReceipt'; 
import CustomModal from '../../../CustomModel/CustomModal';

function DonationInterface() {
  const componentRef = useRef();
  const [showReceiptForm, setShowReceiptForm] = useState(false);

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

  return (
    <div className="DonationInterface-container">
      <div className="DonationInterface-header">
        {/* <button className="DonationInterface-btn-primary">+ Add Donation</button> */}
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
        <span>Showing 0 / 0 results</span>
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
              <th>GR D...</th>
              <th>P...</th>
              <th>Vendor Bill Date</th>
              <th>Vendor Name</th>
              <th>Vendor Cont...</th>
              <th>Bill ...</th>
              <th>Total Amount</th>
              <th>Pay. M...</th>
              <th>Remarks</th>
              <th>Verification Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="12" className="DonationInterface-no-data">No Rows To Show</td>
            </tr>
          </tbody>
        </table>
      </div>

      

       <CustomModal
        isOpen={showReceiptForm}
        onClose={()=>setShowReceiptForm(false)}
        style={customStyles}
        contentLabel="Add Purchase Order Draft Modal"
      >
       
        <AddGoodsReceipt />
      </CustomModal>
      
      {/* <div className="DonationInterface-pagination">
        <span>0 to 0 of 0</span>
        <button className="DonationInterface-btn-page">First</button>
        <button className="DonationInterface-btn-page">Previous</button>
        <span>Page 0 of 0</span>
        <button className="DonationInterface-btn-page">Next</button>
        <button className="DonationInterface-btn-page">Last</button>
      </div> */}
    </div>
  );
}

export default DonationInterface;
