// src/components/Navigation.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./IpdBillNav.css";

function NavigationBilling() {
  return (
    <nav className="ipdBillNav-actions-container">
      <NavLink
        to="/billing/ipbilling/ipmoney-receipt"
        className={({ isActive }) =>
          `ipdBillNav-action-button ${isActive ? "selected" : ""}`
        }
      >
        IP Money Receipt
      </NavLink>

      <NavLink
        to="/billing/ipbilling/finalbill"
        className={({ isActive }) =>
          `ipdBillNav-action-button ${isActive ? "selected" : ""}`
        }
      >
        Final Bill
      </NavLink>

      <NavLink
        to="/billing/ipbilling/IPBilling"
        className={({ isActive }) =>
          `ipdBillNav-action-button ${isActive ? "selected" : ""}`
        }
      >
        IP Billing
      </NavLink>
    </nav>
  );
}

export default NavigationBilling;
