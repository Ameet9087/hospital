// import React, { useState } from 'react'
// import "./Donate.css"
// const Donate = () => {
//     const [dateFrom, setDateFrom] = useState('2024-08-07');
//     const [dateTo, setDateTo] = useState('2024-08-07');
//   return (
//     <div className='Donate-interface'>
//       <div className="Donate-button">
//         <button className='ret-button'>
//             +Add Donation
//         </button>
//         <div className='Donate-select'>
//             <span>Select Vendor:</span>
//             <select name="selectVendor" id="">
//                 <option value="all">All</option>
//             </select>
//         </div>
//       </div>
//       <div className="Donate-date-range">
//               <label className='Donate-date-range-label'>From: <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} /></label>
//               <label className='Donate-date-range-label'>To: <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} /></label>
//               <button className="star">☆</button>
//               <button className="minus">-</button>
//               <button className="ok">✓ OK</button>
//      </div>
//       <div className="Donate-searchBar">
//         <input type="text" className='ret-input'/>
//         <div className='ret-inner-div'>
//             <p>Showing 0/0 result</p>
//             <button className='ret-button'>Print</button>
//         </div>
//       </div>
//       <div className="Donate-table">
//       <table className="receipt-table">
//               <thead>
//                 <tr>
//                   <th>S.N</th>
//                   <th>Donation No</th>
//                   <th>Donated To</th>
//                   <th>Donation Date</th>
//                   <th>Donation Ref No</th>
//                   <th>Donation Ref Date</th>
//                   <th>Total Value </th>
//                   <th>Username </th>
//                   <th>Remark</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td colSpan="10" className="Donate-no-rows">No Rows To Show</td>
//                 </tr>
//               </tbody>
//             </table>
//       </div>
//       <div className="Donate-pagination">
//               <span>0 to 0 of 0</span>
//               <button>First</button>
//               <button>Previous</button>
//               <span>Page 0 of 0</span>
//               <button>Next</button>
//               <button>Last</button>
//             </div>
      
//     </div>
//   )
// }

// export default Donate
