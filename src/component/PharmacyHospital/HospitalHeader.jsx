import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./HospitalHeader.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const HospitalHeader = () => {
  const [activeNav, setActiveNav] = useState(null);
  const [activeSubNav, setActiveSubNav] = useState(null);

  const handleNavClick = (navItem) => {
    if (activeNav === navItem) {
      setActiveNav(null); // Collapse if clicking the already active main item
      setActiveSubNav(null); // Reset sub-navigation
    } else {
      setActiveNav(navItem);
      setActiveSubNav(null); // Reset sub-navigation
    }
  };

  const handleSubNavClick = (subNavItem) => {
    setActiveSubNav(subNavItem);
  };

  return (
    <div className="hospital-header-container-module">
      {/* <header className="pharmacy-header-module"> */}
        <nav className="hospital-nav-module">
          {/* <ul className="hospital-nav-list-module"> */}
            <NavLink to="/" className="hospital-nav-item-module">
              <i className="fa fa-home"></i>
            </NavLink>
            <NavLink 
              to="order"
              className={`hospital-nav-item-module ${activeNav === "order" ? "active" : ""}`}
              onClick={() => handleNavClick("order")}
            >
              Order
            </NavLink>
            <NavLink 
              to='/SupplierLedgerComponent'
              className={`hospital-nav-item-module ${activeNav === "supplier" ? "active" : ""}`}
            >
              Supplier
            </NavLink>
            <NavLink 
              to="report"
              className={`hospital-nav-item-module ${activeNav === "report" ? "active" : ""}`}
              onClick={() => handleNavClick("report")}
            >
              Report
            </NavLink>
            <li 
              className={`hospital-nav-item-module ${activeNav === "setting" ? "active" : ""}`}
              onClick={() => handleNavClick("setting")}
            >
              Setting
            </li>
            <li 
              className={`hospital-nav-item-module ${activeNav === "store" ? "active" : ""}`}
              onClick={() => handleNavClick("store")}
            >
              Store
            </li>
            <NavLink to="/SupplierHeaderCom" className="hospital-nav-item-module">
              Supplier Ledger
            </NavLink>
            <NavLink to="/SubstoreDispatchCom" className="hospital-nav-item-module">
              Substore Request/Dispatch
            </NavLink>
          {/* </ul> */}
        </nav>
      {/* </header>  */}

      {activeNav === "order" && (
        <div className="pharmacy-sub-nav-module">
          <ul>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/purchase-order" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/purchase-order")}
            >
              <NavLink to="/purchase-order">Purchase Order</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/good-receipt" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/good-receipt")}
            >
              <NavLink to="/good-receipt">Good Receipt</NavLink>
            </li>
          </ul>
        </div>
      )}

      {activeNav === "report" && (
        <div className="pharmacy-sub-nav-module">
          <ul>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/purchase" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/purchase")}
            >
              <NavLink to="/purchase">Purchase</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/sales" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/sales")}
            >
              <NavLink to="/sales">Sales</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/stock" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/stock")}
            >
              <NavLink to="/stock">Stock</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/supplier" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/supplier")}
            >
              <NavLink to="/supplier">Supplier</NavLink>
            </li>
          </ul>
        </div>
      )}

      {activeNav === "setting" && (
        <div className="pharmacy-sub-nav-module">
          <ul>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/setting-supplier" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/setting-supplier")}
            >
              <NavLink to="/setting-supplier">Supplier</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/setting-company" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/setting-company")}
            >
              <NavLink to="/setting-company">Company</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/setting-category" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/setting-category")}
            >
              <NavLink to="/setting-category">Category</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/setting-uom" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/setting-uom")}
            >
              <NavLink to="/setting-uom">UOM</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/setting-item-type" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/setting-item-type")}
            >
              <NavLink to="/setting-item-type">Item Type</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/setting-item-component" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/setting-item-component")}
            >
              <NavLink to="/setting-item-component">Item</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/setting-tax" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/setting-tax")}
            >
              <NavLink to="/setting-tax">TAX</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/setting-generic" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/setting-generic")}
            >
              <NavLink to="/setting-generic">Generic</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/setting-dispensary" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/setting-dispensary")}
            >
              <NavLink to="/setting-dispensary">Dispensary</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/setting-rack" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/setting-rack")}
            >
              <NavLink to="/setting-rack">Rack</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/setting-invoice-headers" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/setting-invoice-headers")}
            >
              <NavLink to="/setting-invoice-headers">Invoice Headers</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/setting-terms" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/setting-terms")}
            >
              <NavLink to="/setting-terms">Terms</NavLink>
            </li>
          </ul>
        </div>
      )}

      {activeNav === "store" && (
        <div className="pharmacy-sub-nav-module">
          <ul>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/breakage-item" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/breakage-item")}
            >
              <NavLink to="/breakage-item">
                Breakage Item
                <i className="fa-solid fa-trash-can"></i>
              </NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/return-to-supplier" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/return-to-supplier")}
            >
              <NavLink to="/return-to-supplier">
                Return To Supplier 
                <i className="fa-solid fa-plus"></i>
              </NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/return-to-supplier-list" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/return-to-supplier-list")}
            >
              <NavLink to="/return-to-supplier-list">Return To Supplier List</NavLink>
            </li>
            <li
              className={`pharmacy-sub-nav-item-module ${activeSubNav === "/store-details-list" ? "active" : ""}`}
              onClick={() => handleSubNavClick("/store-details-list")}
            >
              <NavLink to="/store-details-list">Store Details List</NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HospitalHeader;
