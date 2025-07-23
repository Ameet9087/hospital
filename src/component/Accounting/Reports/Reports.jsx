import React from "react";
import { Link } from "react-router-dom";
import "./Reports.css";

const Reports = () => {
  const reports = [
    { name: "Daily Transaction", path: "/daily-transaction" },
    { name: "Ledger", path: "/ledger" },
    { name: "Voucher", path: "/voucher" },
    { name: "Trial Balance", path: "/trial-balance" },
    { name: "Profit Loss", path: "/profit-loss" },
    { name: "Balance Sheet", path: "/balance-sheet" },
    { name: "Cash Flow", path: "/cash-flow" },
    { name: "System Audit", path: "/system-audit" },
    { name: "Group Statement", path: "/group-statement" },
    { name: "Cash/Bank Book", path: "/cash-bank-book" },
    { name: "Day Book", path: "/day-book" },
    { name: "SubLedger", path: "/subledger" },
    { name: "Account Head Detail", path: "/account-head-detail" },
  ];

  return (
    <div className="reports">
      {reports.map((report, index) => (
        <Link to={report.path} key={index} className="reports__item">
          <div className="reports__icon">📄</div>
          <div className="reports__text">
            <div className="reports__title">{report.name}</div>
            <div className="reports__subtitle">Report</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Reports;
