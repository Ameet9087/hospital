/* Mohini_PharmacyCom_WholePage_14/sep/2024 */
import React from 'react';
import { Link } from 'react-router-dom';
import './PharmacyCom.css';

const PharmacyComponent = () => {
  return (
    <div className="pharmacy-home-page-container">
     
      <div className="pharmacy-home-page-content">
      <div className='pharmacy-home-page-com'>
        <div className="pharmacy-home-page-date-filter">
          <label htmlFor="from-date">From:</label>
          <input type="date" id="from-date" />
          
          <label htmlFor="to-date">To:</label>
          <input type="date" id="to-date" />
          
          <button className="pharmacy-home-page-ok-button">OK</button>
        </div>
        
        <div className="pharmacy-home-page-summary-cards">
          <div className="pharmacy-home-page-card">
            <div className="pharmacy-home-page-card-icon sales-icon"></div>
            <div className="pharmacy-home-page-card-details">
              <h3>Sales</h3>
              <p>Total: Rs. 1,960.4</p>
              <p>Previous Day: Rs.0</p>
              <p>Cash: Rs.1,960.4</p>
              <p>Credit: Rs.0</p>
            </div>
          </div>
          
          <div className="pharmacy-home-page-card">
            <div className="pharmacy-home-page-card-icon goods-receipt-icon"></div>
            <div className="pharmacy-home-page-card-details">
              <h3>Goods Receipt</h3>
              <p>Total: Rs.0</p>
              <p>Previous Day: 0</p>
              <p>Cash: Rs.0</p>
              <p>Credit: Rs.0</p>
            </div>
          </div>
          
          <div className="pharmacy-home-page-card">
            <div className="pharmacy-home-page-card-icon dispatch-icon"></div>
            <div className="pharmacy-home-page-card-details">
              <h3>Dispatch</h3>
              <p>Total: 0</p>
              <p>Previous Day: 0</p>
              <p>Pending: 0</p>
              <p>Not Received: 0</p>
            </div>
          </div>
          
          <div className="pharmacy-home-page-card">
            <div className="pharmacy-home-page-card-icon stock-icon"></div>
            <div className="pharmacy-home-page-card-details">
              <h3>Stock</h3>
              <p>Total: Rs.271,687.4</p>
              <p>Narcotics: 0 Units</p>
              <p>Near Expiry: 0 Units</p>
              <p>Expired: 0 Units</p>
            </div>
          </div>
        </div>
        </div>
        <div className="pharmacy-home-page-substore-dispatch">
  
    <div className="pharmacy-home-page-chart">
    <h2>SubStore Wise Dispatch Value</h2>
        <ul>
            <li>1.0</li>
            <li>0.9</li>
            <li>0.8</li>
            <li>0.7</li>
            <li>0.6</li>
            <li>0.5</li>
            <li>0.4</li>
            <li>0.3</li>
            <li>0.2</li>
            <li>0.1</li>
            <li>0</li>
        </ul>
    </div>
</div>
<div className="pharmacy-home-page-chart-pharmacy">
<section className="pharmacy-home-page-membership-sales">
    <h2>Membership Wise Medicine Sales</h2>
    <div className="pharmacy-home-page-membership-details">
        <p>Membership</p>
        <p>Quantity Sold</p>
        <p>Total Sales</p>
    </div>

</section>
      <div className='pharmacy-home-page-pharmacy-chart-div'>
      <section className="pharmacy-home-page-top-medicines">
        <h2>Top 10 Most Sold Medicines</h2>
        <table>
            <thead>
                <tr>
                    <th>Medicine Name</th>
                    <th>Quantity Sold</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Ferrous Sulphate Tab</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>PARACETAMOL 500MG</td>
                    <td>10</td>
                </tr>
            </tbody>
        </table>
    </section>
      </div>

</div>

      </div>
    </div>
  );
};

export default PharmacyComponent;
/* Mohini_PharmacyCom_WholePage_14/sep/2024 */
