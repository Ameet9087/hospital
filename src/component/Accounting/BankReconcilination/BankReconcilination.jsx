import React, { useEffect, useRef, useState } from "react";
import "./BankReconciliation.css";
import { NavLink, Route, Routes } from "react-router-dom";
import SuspenseReconciliationForm from "./SuspenseReconciliationForm";

const BankReconciliation = () => {
  const [activeTab, setActiveTab] = useState("bank");

  const [underlineStyle, setUnderlineStyle] = useState({});
  const navRefs = useRef([]);

  const handleNavLinkClick = (index) => {
    const navItem = navRefs.current[index];
    const left = navItem.offsetLeft;
    const width = navItem.offsetWidth;

    setUnderlineStyle({
      left: `${left}px`,
      width: `${width}px`,
      transition: "left 0.3s ease, width 0.3s ease", // Adding transition for animation
    });
  };

  useEffect(() => {
    // Initialize underline position on the first render
    handleNavLinkClick(0);
  }, []);

  return (
    <main className="bank-reconciliation-main">
      <nav className="bank-reconciliation__nav">
        <ul>
          <li ref={(el) => (navRefs.current[0] = el)}>
            <NavLink
              to="Reconcile"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(0)}
            >
              Bank Reconciliation
            </NavLink>
          </li>
          <li ref={(el) => (navRefs.current[1] = el)}>
            <NavLink
              to="SuspenseReconcile"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(1)}
            >
              Suspense A/C Reconciliation
            </NavLink>
          </li>
        </ul>
        <div className="underline" style={underlineStyle}></div>
      </nav>

      <Routes>
        <Route path="Reconcile" element={<BankReconciliationForm />} />
        <Route
          path="SuspenseReconcile"
          element={<SuspenseReconciliationForm />}
        />
        <Route path="*" element={<BankReconciliationForm />} />
      </Routes>
    </main>
  );
};

const BankReconciliationForm = () => (
  <form className="bank-reconciliation__form">
    <div className="bank-reconciliation__row">
      <label className="bank-reconciliation__field">
        Bank Name :
        <input type="text" placeholder="Ledger Name" />
      </label>

      <div className="bank-reconciliation__field bank-reconciliation__date-range">
        <label className="bank-reconciliation__field">
          Select Fiscal Year :
          <select>
            <option>2024</option>
          </select>
        </label>

        <label>From:</label>
        <input type="date" value="2024-08-12" />
        <label>To:</label>
        <input type="date" value="2024-08-12" />
        <button className="bank-reconciliation-star-btn">☆</button>
      </div>

      <div className="bank-reconciliation__field bank-reconciliation__status">
        <span>Status:</span>
        <label>
          <input type="checkbox" checked /> Open
        </label>
        <label>
          <input type="checkbox" /> Close
        </label>
      </div>
    </div>

    <div className="bank-reconciliation__row">
      <label className="bank-reconciliation__field">
        Model:
        <input type="text" placeholder="Select Mode / Voucher Type" />
      </label>

      <label className="bank-reconciliation__field">
        Bank-Opening Balance:
        <input type="number" placeholder="0" />
      </label>

      <label className="bank-reconciliation__field">
        Bank-Closing Balance:
        <input type="number" placeholder="0" />
      </label>

      <button className="bank-reconciliation__show-btn">Show Details</button>
    </div>
  </form>
);

export default BankReconciliation;
