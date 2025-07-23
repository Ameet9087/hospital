import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./LedgerNavbar.css"; // Import the CSS file

const LedgerNavbar = () => {
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navRefs = useRef([]);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleNavLinkClick = (index) => {
    const navItem = navRefs.current[index];
    const left = navItem.offsetLeft;
    const width = navItem.offsetWidth;

    setUnderlineStyle({
      left: `${left}px`,
      width: `${width}px`,
      transition: "left 0.3s ease, width 0.3s ease",
    });
  };

  useEffect(() => {
    // Initialize underline position on the first render
    handleNavLinkClick(0);
  }, []);

  return (
    <main className="ledger-main">
    <nav className="ledger-navbar">
      <ul>
        <li ref={(el) => (navRefs.current[0] = el)}>
          <NavLink
            to="billing-ledgers"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => handleNavLinkClick(0)}
          >
            Billing Ledgers
          </NavLink>
        </li>
        <li ref={(el) => (navRefs.current[1] = el)}>
          <NavLink
            to="pharmacy-supplier"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => handleNavLinkClick(1)}
          >
            Pharmacy Supplier
          </NavLink>
        </li>
        <li ref={(el) => (navRefs.current[2] = el)}>
          <NavLink
            to="consultant"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => handleNavLinkClick(2)}
          >
            Consultant (Credit A/C)
          </NavLink>
        </li>
        <li ref={(el) => (navRefs.current[3] = el)}>
          <NavLink
            to="credit-organizations"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => handleNavLinkClick(3)}
          >
            Credit Organizations
          </NavLink>
        </li>
        <li ref={(el) => (navRefs.current[4] = el)}>
          <NavLink
            to="inventory-vendor"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => handleNavLinkClick(4)}
          >
            Inventory Vendor
          </NavLink>
        </li>
        <li ref={(el) => (navRefs.current[5] = el)}>
          <NavLink
            to="inventory-substore"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => handleNavLinkClick(5)}
          >
            Inventory SubStore
          </NavLink>
        </li>
        <li ref={(el) => (navRefs.current[6] = el)}>
          <NavLink
            to="payment-modes"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => handleNavLinkClick(6)}
          >
            Payment Modes
          </NavLink>
        </li>
        <li className="dropdown">
          <span onClick={toggleDropdown}>More...</span>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <span>
                <NavLink
                  to="SectionList"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Bank Reconciliation Category
                </NavLink>
              </span>
              <span>
                <NavLink
                  to="ReverseTransaction"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Medicare Types
                </NavLink>
              </span>
            </ul>
          )}
        </li>
      </ul>
      <div className="underline" style={underlineStyle}></div>
    </nav>
    </main>
  );
};

export default LedgerNavbar;
