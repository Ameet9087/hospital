// src/components/Navigation.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./BillingNav.css";

function BillingNav() {
  return (
    <nav className="billing-actions-container">
      <NavLink
        to="/billing/IPBilling"
        className={({ isActive }) =>
          `billing-action-button ${isActive ? "selected" : ""}`
        }
      >
        IP Billing
      </NavLink>
      <NavLink
        to="/billing/opdbilling"
        className={({ isActive }) =>
          `billing-action-button ${isActive ? "selected" : ""}`
        }
      >
      OPD Billing
      </NavLink>

      <NavLink
        to="/billing/IpdMoneyReceipt"
        className={({ isActive }) =>
          `billing-action-button ${isActive ? "selected" : ""}`
      }
      >
        IPd Money  receipt
      </NavLink>

      <NavLink
        to="/billing/OPDBillingCancel"
        className={({ isActive }) =>
          `billing-action-button ${isActive ? "selected" : ""}`
      }
      >
        OPD Bill cancel/refund 
      </NavLink>
    </nav>
  );
}

export default BillingNav;
