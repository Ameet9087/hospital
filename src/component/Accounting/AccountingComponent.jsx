import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "./AccountingComponent.css";
import TransactionComponent from "./Transactions/TransactionComponent";
import VoucherVerification from "./VoucherVerification/VoucherVerification";
import MedicarePatientList from "./MedicareRegistration/MedicarePatientList";
import Reports from "./Reports/Reports";
import BankReconciliation from "./BankReconcilination/BankReconcilination";
import Settings from "./Settings/Settings";

function AccountComponent() {
  return (
    <div className="accounting-component">
      <header className="accounting-component-header">
        <nav className="accounting-component-header-nav">
          <ul>
            <li>
              <NavLink
                to="/accounting/transactions/*"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Transactions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accounting/settings/*"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accounting/reports"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accounting/voucher-verification"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Voucher Verification
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accounting/medicareregistration"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Medicare Registration
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accounting/bankreconciliation"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Bank Reconciliation
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="accounting-component-content">
        <Routes>
          <Route path="/transactions/*" element={<TransactionComponent />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="reports" element={<Reports />} />
          <Route
            path="voucher-verification"
            element={<VoucherVerification />}
          />
          <Route
            path="medicareregistration"
            element={<MedicarePatientList />}
          />
          <Route
            path="bankreconciliation/*"
            element={<BankReconciliation />}
          />
          <Route path="transactions/*" element={<TransactionComponent />} />
        </Routes>
      </div>
    </div>
  );
}

export default AccountComponent;
