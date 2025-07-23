import React, { useState, useEffect, useRef } from "react";
import { Route, Routes, NavLink, Navigate } from "react-router-dom";
import "./TransactionComponent.css";
import VoucherEntry from "./VoucherEntry/VoucherEntry";
import PostAccounting from "./PostAccounting/PostAccounting";
import MakePayment from "./MakePayment/MakePayment";
import AccountClosure from "./AccountClosure/AccountClosure";

function TransactionComponent() {
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
    <main className="transaction-main">
      <nav className="transaction-sub-nav">
        <ul>
          <li ref={(el) => (navRefs.current[0] = el)}>
            <NavLink
              to="voucherentry"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(0)}
            >
              Voucher Entry
            </NavLink>
          </li>
          <li ref={(el) => (navRefs.current[1] = el)}>
            <NavLink
              to="posttoaccounting"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(1)}
            >
              Post to Accounting
            </NavLink>
          </li>
          <li ref={(el) => (navRefs.current[2] = el)}>
            <NavLink
              to="accountclosure"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(2)}
            >
              Account Closure
            </NavLink>
          </li>
          <li ref={(el) => (navRefs.current[3] = el)}>
            <NavLink
              to="makepayment"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(3)}
            >
              Make Payment
            </NavLink>
          </li>
        </ul>
        <div className="underline" style={underlineStyle}></div>
      </nav>

      <Routes>
        <Route path="voucherentry" element={<VoucherEntry />} />
        <Route path="posttoaccounting" element={<PostAccounting />} />
        <Route path="accountclosure" element={<AccountClosure />} />
        <Route path="makepayment" element={<MakePayment />} />
        <Route path="*" element={<Navigate to="voucherentry" />} />
      </Routes>
    </main>
  );
}

export default TransactionComponent;
