// import React from "react";
// import "../IncentiveTransactions/incentiveTransationInvoice-Item.css"
// const IncentiveTransationInvoiceItem = () => {
//   return (
//     <div className="incentiveTransationInvoice-container">
//       {/* Filter Section */}
//       <div className="incentiveTransationInvoice-filters">
//                  <div className="incentiveTransationInvoice-date-range">
//                    <label>From: </label>
//                    <input type="date" />
//                    <label>To: </label>
//                    <input type="date" />
//                    <button className="incentiveTransationInvoice-icon-button incentiveTransationInvoice-star">★</button>
//                    <button className="incentiveTransationInvoice-icon-button incentiveTransationInvoice-dash">-</button>
//                  <button className="incentiveTransationInvoice-ok-button"><i class="fa-regular fa-square-check"></i> OK</button>
//                  </div>
//                </div>
//       <div className=" incentiveTransationInvoice-search-N-Infotext">
//         <input
//           type="text"
//           className="incentiveTransationInvoice-search-input"
//           placeholder="Search"
//         />
//         <div className="incentiveTransationInvoice-info-text">Showing 314 / 314 results</div>
//         </div>
//       {/* Table Section */}
//       <table className="incentiveTransationInvoice-table">
//         <thead>
//           <tr>
//             <th>Service Department</th>
//             <th>Item Name</th>
//             <th>Price Category</th>
//             <th>Prescriber</th>
//             <th>Performer</th>
//             <th>Fraction ?</th>
//             <th>Amount</th>
//             <th>Invoice No</th>
//             <th>Date</th>
//             {/* <th>Action</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>OPD</td>
//             <td>Consultation Charges</td>
//             <td>Normal</td>
//             <td></td>
//             <td>INNOCENT TENGO</td>
//             <td>
//               <button className="incentiveTransationInvoice-edit-button">✏No(0)</button>
//             </td>
//             <td>1000</td>
//             <td>2024-BL34</td>
//             <td>Cecillia Kimani</td>
//             {/* <td>Dr. Amit Shah</td> */}
//           </tr>
//           <tr>
//             <td>OPD</td>
//             <td>Consultation Charges</td>
//             <td>Normal</td>
//             <td></td>
//             <td>INNOCENT TENGO</td>
//             <td>
//               <button className="incentiveTransationInvoice-edit-button">✏ No(0)</button>
//             </td>
//             <td>1000</td>
//             <td>2024-BL34</td>
//             <td>Cecillia Kimani</td>
//             {/* <td>Dr. Amit Shah</td> */}
//           </tr>
//           <tr>
//             <td>OPD</td>
//             <td>Consultation Charges</td>
//             <td>Normal</td>
//             <td></td>
//             <td>INNOCENT TENGO</td>
//             <td>
//               <button className="incentiveTransationInvoice-edit-button">✏No(0)</button>
//             </td>
//             <td>1000</td>
//             <td>2024-BL34</td>
//             <td>Cecillia Kimani</td>
//             {/* <td>Dr. Amit Shah</td> */}
//           </tr>
//           {/* Add more rows as needed */}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default IncentiveTransationInvoiceItem;

 /* Ajhar Tamboli IncentiveTransationInvoice.jsx 18-09-2024 */

import React, { useState, useEffect } from "react";
import "../IncentiveTransactions/incentiveTransationInvoice-Item.css";

const IncentiveTransationInvoiceItem = () => {
  const [serviceDepartments, setServiceDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://192.168.1.42:7676/api/service-departments/fetch")
    // fetch("/api/service-departments/fetch")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        
        setServiceDepartments(data); // Set the fetched data to the state
        setLoading(false); // Loading is finished
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>; // Show a loading message while fetching
  // }

  // if (error) {
  //   return <div>Error: {error}</div>; // Show an error message if there's an error
  // }

  return (
    <div className="incentiveTransationInvoice-container">
      {/* Filter Section */}
      <div className="incentiveTransationInvoice-filters">
        <div className="incentiveTransationInvoice-date-range">
          <label>From: </label>
          <input type="date" />
          <label>To: </label>
          <input type="date" />
        </div>
      </div>
      <div className="incentiveTransationInvoice-search-N-Infotext">
        <input
          type="text"
          className="incentiveTransationInvoice-search-input"
          placeholder="Search"
        />
        <div className="incentiveTransationInvoice-info-text">
          Showing {serviceDepartments.length} / {serviceDepartments.length} results
          <button className="incentiveTransationInvoice-print-button" onClick={""}><i className="fa-solid fa-file-excel"></i> Export</button>
          <button className="incentiveTransationInvoice-print-button" onClick={""}><i class="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      {/* Table Section */}
      <table className="incentiveTransationInvoice-table">
        <thead>
          <tr>
            <th>Service Department</th>
            <th>Item Name</th>
            <th>Price Category</th>
            <th>Prescriber</th>
            <th>Performer</th>
            <th>Fraction ?</th>
            <th>Amount</th>
            <th>Invoice No</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {serviceDepartments.map((serviceDept) =>
            serviceDept.itemNames.map((item, index) => (
              <tr key={index}>
                <td>{serviceDept.serviceDepartment}</td>
                <td>{item.itemName}</td>
                <td>{item.priceCategory}</td>
                <td>{item.prescriber}</td>
                <td>{item.performer}</td>
                <td>
                  <button className="incentiveTransationInvoice-edit-button">✏No(0)</button>
                </td>
                <td>{item.amount}</td>
                <td>{item.invoiceNo}</td>
                <td>{item.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IncentiveTransationInvoiceItem;
