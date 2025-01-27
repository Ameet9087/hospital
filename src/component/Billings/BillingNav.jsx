import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./BillingNav.css";

function BillingNav() {
  return (
    <nav className="billing-actions-container">
      <NavLink
        to="/billing/ipbilling"
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
        to="/billing/opdpostdiscount"
        className={({ isActive }) =>
          `billing-action-button ${isActive ? "selected" : ""}`
        }
      >
        OPD Post discount
      </NavLink>

      <NavLink
        to="/billing/ipdmoneyrecipt"
        className={({ isActive }) =>
          `billing-action-button ${isActive ? "selected" : ""}`
        }
      >
        IPd Money  receipt
      </NavLink>

      <NavLink
        to="/billing/opdbillingcancel"
        className={({ isActive }) =>
          `billing-action-button ${isActive ? "selected" : ""}`
        }
      >
        OPD Bill cancel/refund
      </NavLink>

      <NavLink
        to="/billing/finalbilling"
        className={({ isActive }) =>
          `billing-action-button ${isActive ? "selected" : ""}`
        }
      >
        final bill
      </NavLink>
    </nav>
  );
}

export default BillingNav;
