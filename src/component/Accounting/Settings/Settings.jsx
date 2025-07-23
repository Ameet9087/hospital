import React, { useState, useEffect, useRef } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import "./Settings.css";
import COAList from "./COAList/COAList";
import LedgerList from "./LedgerList/LedgerList";
import SubLedgerList from "./SubLedger/SubLedger";
import LedgerGroupList from "./LedgerGroupList/LedgerGroupList";
import LedgerMapping from "./LedgerMapping/LedgerMapping";
import VoucherList from "./VoucherList/VoucherList";
import CostCenterItemList from "./CostCenterItemList/CostCenterItemList";
import FinancialYearList from "./FinancialYear/FinancialYear";
import TransferRules from "./TransferRules/TransferRules";
import SectionList from "./SectionList/SectionList";
import ReverseTransaction from "./ReverseTransaction/ReverseTransaction";

function Settings() {
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
      transition: "left 0.3s ease, width 0.3s ease", // Adding transition for animation
    });
  };

  useEffect(() => {
    // Initialize underline position on the first render
    handleNavLinkClick(0);
  }, []);

  return (
    <main className="setting-main">
      <nav className="setting-sub-nav">
        <ul>
          <li ref={(el) => (navRefs.current[0] = el)}>
            <NavLink
              to="COAList"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(0)}
            >
              COA
            </NavLink>
          </li>
          <li ref={(el) => (navRefs.current[1] = el)}>
            <NavLink
              to="LedgerList"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(1)}
            >
              Ledgers
            </NavLink>
          </li>
          <li ref={(el) => (navRefs.current[2] = el)}>
            <NavLink
              to="SubLedger"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(2)}
            >
              Sub Ledger
            </NavLink>
          </li>
          <li ref={(el) => (navRefs.current[3] = el)}>
            <NavLink
              to="LedgerGroupList"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(3)}
            >
              Ledger Groups
            </NavLink>
          </li>
          <li ref={(el) => (navRefs.current[4] = el)}>
            <NavLink
              to="LedgerMapping"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(4)}
            >
              Ledger Mapping
            </NavLink>
          </li>
          <li ref={(el) => (navRefs.current[5] = el)}>
            <NavLink
              to="VoucherList"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(5)}
            >
              Vouchers
            </NavLink>
          </li>
          <li ref={(el) => (navRefs.current[6] = el)}>
            <NavLink
              to="CostCenterItemList"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(6)}
            >
              Cost Center
            </NavLink>
          </li>
          <li ref={(el) => (navRefs.current[7] = el)}>
            <NavLink
              to="FinancialYearList"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(7)}
            >
              Financial List
            </NavLink>
          </li>
          <li ref={(el) => (navRefs.current[8] = el)}>
            <NavLink
              to="TransferRules"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(8)}
            >
              Transfer Rules
            </NavLink>
          </li>
          <li className="" style={{}}>
            <div className="dropdown">
              <span onClick={toggleDropdown}>More...</span>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <span>
                    <NavLink
                      to="SectionList"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Section List
                    </NavLink>
                  </span>
                  <span>
                    <NavLink
                      to="ReverseTransaction"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Reverse Transaction
                    </NavLink>
                  </span>
                </ul>
              )}
            </div>
          </li>
        </ul>
        <div className="underline" style={underlineStyle}></div>
      </nav>

      <Routes>
        <Route path="COAList" element={<COAList />} />
        <Route path="LedgerList" element={<LedgerList />} />
        <Route path="SubLedger" element={<SubLedgerList />} />
        <Route path="LedgerGroupList" element={<LedgerGroupList />} />
        <Route path="LedgerMapping/*" element={<LedgerMapping />} />
        <Route path="VoucherList" element={<VoucherList />} />
        <Route path="CostCenterItemList" element={<CostCenterItemList />} />
        <Route path="FinancialYearList" element={<FinancialYearList />} />
        <Route path="TransferRules" element={<TransferRules />} />
        <Route path="SectionList" element={<SectionList />} />
        <Route path="ReverseTransaction" element={<ReverseTransaction />} />
        <Route path="*" element={<COAList />} />
      </Routes>
    </main>
  );
}

export default Settings;
