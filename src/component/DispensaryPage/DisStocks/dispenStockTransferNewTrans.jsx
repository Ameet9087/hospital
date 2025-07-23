// import React from 'react';
// import "../DisStocks/dispenStockTransferNewTrans.css";

// const DispenStockTransferNewTrans = () => {
//   return (
//     <div className="dispenStockTransferNewTrans-container">
//       <div className="dispenStockTransferNewTrans-header">
//         <h2>Stock Transfer</h2>
//         <div className="dispenStockTransferNewTrans-date">
//           Transfer Date : <span>2024-08-26</span>
//         </div>
//       </div>
      
//       <div className="dispenStockTransferNewTrans-details">
//         <label htmlFor="store">Transfer To (Store) <span className="required">*</span>:</label>
//         <input type="text" id="store"  placeholder='select store name' className="dispenStockTransferNewTrans-input-store" />
//       </div>
      
//       <div className="dispenStockTransferNewTrans-item-entry">
//         <table>
//           <thead>
//             <tr>
//               <th></th>
//               <th>Item Name</th>
//               <th>From Rack</th>
//               <th>To Rack</th>
//               <th>Code</th>
//               <th>UOM</th>
//               <th>Batch No</th>
//               <th>Expiry Date</th>
//               <th>Available Qty</th>
//               <th>Transferred Qty</th>
//               <th>Remark</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>
//                 <button className="dispenStockTransferNewTrans-delete-btn">✖</button>
//               </td>
//               <td>
//                 <input type="text" placeholder="Enter Item Name" />
//               </td>
//               <td>
//                 {/* <input type="text" /> */}
//               </td>
//               <td>
//                 {/* <input type="text" /> */}
//               </td>
//               <td>
//                 {/* <input type="text" /> */}
//               </td>
//               <td>
//                 {/* <input type="text" /> */}
//               </td>
//               <td>
//                 {/* <input type="text" /> */}
//               </td>
//               <td>
//                 <input type="date" />
//               </td>
//               <td>
//                 <input type="number" value="0" />
//               </td>
//               <td>
//                 <input type="number" value="1" />
//               </td>
//               <td>
//                 <input type="text" />
//               </td>
//               <td>
//               <button className="dispenStockTransferNewTrans-add-item-btn">+</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
        
//       </div>

//       <div className="dispenStockTransferNewTrans-remarks-section">
//         <label htmlFor="remarks">Remarks <span className="required">*</span>:</label>
//         <textarea id="remarks"></textarea>
//       </div>

//       <div className="dispenStockTransferNewTrans-action-buttons">
//         <button className="dispenStockTransferNewTrans-save-btn">Save Changes</button>
//         <button className="dispenStockTransferNewTrans-discard-btn">Discard Changes</button>
//       </div>
//     </div>
//   );
// };

// export default DispenStockTransferNewTrans;

 /* Ajhar Tamboli dispenStockTransferNewTrans.jsx 19-09-24 */


import React from 'react';
import "../DisStocks/dispenStockTransferNewTrans.css";

const DispenStockTransferNewTrans = ({ onDiscard }) => {  // Receive the callback function as a prop
  return (
    <div className="dispenStockTransferNewTrans-container">
      <div className="dispenStockTransferNewTrans-header">
        <h2>Stock Transfer</h2>
        <div className="dispenStockTransferNewTrans-date">
          Transfer Date : <span>2024-08-26</span>
        </div>
      </div>
      
      <div className="dispenStockTransferNewTrans-details">
        <label htmlFor="store">Transfer To (Store) <span className="required">*</span>:</label>
        <input type="text" id="store"  placeholder='select store name' className="dispenStockTransferNewTrans-input-store" />
      </div>
      
      <div className="dispenStockTransferNewTrans-item-entry">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Item Name</th>
              <th>From Rack</th>
              <th>To Rack</th>
              <th>Code</th>
              <th>UOM</th>
              <th>Batch No</th>
              <th>Expiry Date</th>
              <th>Available Qty</th>
              <th>Transferred Qty</th>
              <th>Remark</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <button className="dispenStockTransferNewTrans-delete-btn">✖</button>
              </td>
              <td>
                <input type="text" placeholder="Enter Item Name" />
              </td>
              <td>
                {/* <input type="text" /> */}
              </td>
              <td>
                {/* <input type="text" /> */}
              </td>
              <td>
                {/* <input type="text" /> */}
              </td>
              <td>
                {/* <input type="text" /> */}
              </td>
              <td>
                {/* <input type="text" /> */}
              </td>
              <td>
                <input type="date" />
              </td>
              <td>
                <input type="number" value="0" />
              </td>
              <td>
                <input type="number" value="1" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
              <button className="dispenStockTransferNewTrans-add-item-btn">+</button>
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>

      <div className="dispenStockTransferNewTrans-remarks-section">
        <label htmlFor="remarks">Remarks <span className="required">*</span>:</label>
        <textarea id="remarks"></textarea>
      </div>

      <div className="dispenStockTransferNewTrans-action-buttons">
        <button className="dispenStockTransferNewTrans-save-btn">Save Changes</button>
        <button 
          className="dispenStockTransferNewTrans-discard-btn"
          onClick={onDiscard}  // Use the callback function here
        >
          Discard Changes
        </button>
      </div>
    </div>
  );
};

export default DispenStockTransferNewTrans;
