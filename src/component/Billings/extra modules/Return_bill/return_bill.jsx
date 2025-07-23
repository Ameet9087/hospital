import React, { useState } from 'react';
import './ReturnBill.css'; 

const ReturnBill = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [number, setNumber] = useState('');

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSearch = () => {
   
    console.log('Selected Year:', selectedYear);
    console.log('Number:', number);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i); 

  const [returnQty, setReturnQty] = useState(0);
  const [remarks, setRemarks] = useState('');

  const handleReturnQtyChange = (event) => {
    setReturnQty(event.target.value);
  };

  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
  };

  
  return (
    <div className='return_bill-container'>
        
    <div className="return_bill-container_middle">
          
          <div>
        
        
           <div className="return_bill-form-group">
            <div className='returnbill_searchcontent'>
            <label htmlFor="year" className="return_bill-label">Fiscal year:</label>
             <select id="year" className="return_bill-select" value={selectedYear} onChange={handleYearChange}>
               <option value="">--Select Year--</option>
               {years.map((year) => (
                 <option key={year} value={year}>
                   {year}
                 </option>
               ))}
             </select>
           </div>
           <div className="return_bill-form-group">
             <label htmlFor="number" className="return_bill-label">Search Number:</label>
             <input
               id="number"
               type="number"
               className="return_bill-input"
               value={number}
               onChange={handleNumberChange}
             />
           </div>
           <button className="return_bill-button" onClick={handleSearch}>Search</button>
            </div>
           </div>
         </div>


         <div className='returnbill_pinfo'>
            <label htmlFor="">patient:Mohini Pathan</label>
            <label htmlFor="">Scheme :General</label>
            <label htmlFor="">Price Category:Normal</label>
            <label htmlFor="">Invoice No:123522</label>
            <label htmlFor="">Invoce date:09/09/24 Time :17:30</label>
            <label htmlFor="">Status:Paid</label>
         </div>
         <div className='returnbill-tablediv'>
         <div className='retable'>
         <table className="returnbill-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Discount</th>
            <th>Total Amt.</th>
            <th>Return Qty.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Dispensing Fee</td>
            <td>500</td>
            <td>1</td>
            <td>500</td>
            <td>0</td>
            <td>500</td>
            <td>
              <input
                type="number"
                min="0"
                max="1"
                value={returnQty}
                onChange={handleReturnQtyChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
         </div>
      <div className='returnbill-amtstatus'>
      <div className="returnbill-total">
        <span>Total Return Amount : 0</span>
        
      </div>
      <div className="returnbill-remarks">
        <label htmlFor="remarks">Remarks *:</label>
        <input
          type="text"
          id="remarks"
          value={remarks}
          onChange={handleRemarksChange}
        />
      
      <button type="submit" className="returnbill-submit-btn" onClick={handleSubmit}>
        Submit
      </button>
      </div>
      </div>
         </div>
    </div>
  );
};

export default ReturnBill;
