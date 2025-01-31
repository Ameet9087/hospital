/* Mohini_HospitalHeader_WholePage_14/sep/2024 */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./HospitalHeader.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const HospitalHeader = () => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(null);
  const [activeSubNav, setActiveSubNav] = useState(null);

  // Determine active tab based on the current pathname
  const getActiveTab = () => {
    if (location.pathname.includes("/pharmacy/supplierledger")) return "supplierledger";
    if (location.pathname.includes("/pharmacy/order")) return "order";
    if (location.pathname.includes("/pharmacy/supplier")) return "supplier";
    // if (location.pathname.includes("/pharmacy/report")) return "report";
    if (location.pathname.includes("/pharmacy/setting")) return "setting";
    if (location.pathname.includes("/pharmacy/store")) return "store";
    if (location.pathname.includes("/pharmacy/substorerequest")) return "substorerequest";
    return null;
  };

  useEffect(() => {
    console.log(activeNav);

    // Update active navigation tab when location changes
    const currentTab = getActiveTab();
    setActiveNav(currentTab);
    setActiveSubNav(null); // Reset sub-navigation on main navigation change
  }, [location]);

  const handleSubNavClick = (subNavItem) => setActiveSubNav(subNavItem);

  const renderSubNav = (items) => (
    <div className="pharmacy-sub-nav-module">
      <ul>
        {items.map(({ path, label, icon }) => (
          <li
            key={path}
            className={`pharmacy-sub-nav-item-module ${activeSubNav === path ? "active" : ""
              }`}
            onClick={() => handleSubNavClick(path)}
          >
            <Link to={path}>
              {label} {icon && <i className={icon}></i>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const subNavItems = {
    order: [
      { path: "/pharmacy/order/purchase-order", label: "Purchase Order" },
      { path: "/pharmacy/order/good-receipt", label: "Good Receipt" },
    ],
    // report: [
    //   { path: "/pharmacy/report/purchase", label: "Purchase" },
    //   { path: "/pharmacy/report/sales", label: "Sales" },
    //   { path: "/pharmacy/report/stock", label: "Stock" },
    //   { path: "/pharmacy/report/supplier", label: "Supplier" },
    // ],
    setting: [
      { path: "/pharmacy/setting/setting-supplier", label: "Supplier" },
      { path: "/pharmacy/setting/setting-company", label: "Company" },
      { path: "/pharmacy/setting/setting-category", label: "Category" },
      { path: "/pharmacy/setting/setting-uom", label: "UOM" },
      { path: "/pharmacy/setting/setting-item-type", label: "Item Type" },
      { path: "/pharmacy/setting/setting-item-component", label: "Item" },
      { path: "/pharmacy/setting/setting-tax", label: "TAX" },
      { path: "/pharmacy/setting/setting-generic", label: "Generic" },
      // { path: "/pharmacy/setting/setting-dispensary", label: "Dispensary" },
      // { path: "/pharmacy/setting/setting-rack", label: "Rack" },
      // { path: "/pharmacy/setting/setting-invoice-headers", label: "Invoice Headers" },
      { path: "/pharmacy/setting/setting-terms", label: "Terms" },
    ],
    store: [
      { path: "/pharmacy/store/breakage-item", label: "Breakage Item", icon: "fa-solid fa-trash-can" },
      { path: "/pharmacy/store/return-to-supplier", label: "Return To Supplier", icon: "fa-solid fa-plus" },
      { path: "/pharmacy/store/return-to-supplier-list", label: "Return To Supplier List" },
      { path: "/pharmacy/store/store-details-list", label: "Store Details List" },
    ],
    substorerequest: [
      { path: "/pharmacy/substorerequest/dispensary", label: "Dispensary", icon: "fa-solid fa-plus" },
      { path: "/pharmacy/substorerequest/substore", label: "Substore", icon: "fa-solid fa-plus" }
    ],
  };

  return (
    <div className="hospital-header-container-module">
      <header className="pharmacy-header-module">
        <nav className="hospital-nav-module">
          <ul className="hospital-nav-list-module">
            <Link to="/" className="hospital-nav-item-module">
              <i className="fa fa-home"></i>
            </Link>
            <Link
              to="/pharmacy/order"
              className={`hospital-nav-item-module ${activeNav === "order" ? "active" : ""}`}
            >
              Order
            </Link>
            <Link to="/pharmacy/supplier" className={`hospital-nav-item-module ${activeNav === "supplier" ? "active" : ""}`}>
              Supplier
            </Link>
            {/* <Link
              to="/pharmacy/report"
              className={`hospital-nav-item-module ${activeNav === "report" ? "active" : ""}`}
            >
              Report
            </Link> */}
            <Link
              to={"/pharmacy/setting"}
              className={`hospital-nav-item-module ${activeNav === "setting" ? "active" : ""}`}
            >
              Setting
            </Link>
            <Link
              to={"/pharmacy/store"}
              className={`hospital-nav-item-module ${activeNav === "store" ? "active" : ""}`}
            >
              Store
            </Link>
            {/* <Link to="/pharmacy/supplierledger" className={`hospital-nav-item-module ${activeNav === "supplierledger" ? "active" : ""}`}>
              Supplier Ledger
            </Link> */}
            <Link to="/pharmacy/substorerequest" className={`hospital-nav-item-module ${activeNav === "substorerequest" ? "active" : ""}`}>
              Substore Request/Dispatch
            </Link>
          </ul>
        </nav>
      </header>

      {/* Render sub-navigation */}
      {activeNav && subNavItems[activeNav] && renderSubNav(subNavItems[activeNav])}
    </div>
  );
};

export default HospitalHeader;
/* Mohini_HospitalHeader_WholePage_14/sep/2024 */
