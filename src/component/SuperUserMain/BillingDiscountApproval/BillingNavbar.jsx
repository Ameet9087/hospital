/* Mohini_BillingNavbar_WholePage_27/sep/24 */
import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link
import './BillingNavbar.css';

const BillingNavbar = () => {
  return (
    <nav className="billing-discount-approval-navbar">
      <div className="billing-discount-approval-navbar-logo">
        {/* <h2>My Application</h2> */}
      </div>
      <ul className="billing-discount-approval-navbar-links">
        {/* <li>
          <NavLink to="/">Home</NavLink>
        </li> */}
        <li>
          <NavLink to="/superuser/billingdiscountapproval/discount-approval-request" className="billing-discount-approval-header-button" activeClassName="active">Discount Approval Request</NavLink>
        </li>
        <li>
          <NavLink to="/superuser/billingdiscountapproval/discount-approval-review" className="billing-discount-approval-header-button" activeClassName="active">Discount Approval Review</NavLink>
        </li>
        <li>
          <NavLink to="/superuser/billingdiscountapproval/discount-history" className="billing-discount-approval-header-button" activeClassName="active">Discount History</NavLink>
        </li>
        <li>
          <NavLink to="/superuser/billingdiscountapproval/patient-billing-summary" className="billing-discount-approval-header-button" activeClassName="active">Patient Billing Summary</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default BillingNavbar;
/* Mohini_BillingNavbar_WholePage_27/sep/24 */

