import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./Reports.css";
import PurchaseReport from "./PurchaseReport";
import Stock from "../components/Stock";
import Supplier from "../components/Supplier";

const HorizontalList = () => {
  return (
    <div className="horizontalList-container">
      <div className="horizontalList-horizontal-container">
        <nav className="Settings-nav">
          <Link to="purchase" className="horizontalList-item">
            Purchase
          </Link>
          <Link to="stock" className="horizontalList-item">
            Stock
          </Link>
          <Link to="supplier" className="horizontalList-item">
            Supplier
          </Link>
        </nav>
      </div>

      <div className="horizontalList-settings-content">
        <Routes>
          <Route path="/purchase/*" element={<PurchaseReport />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/supplier" element={<Supplier />} />
        </Routes>
      </div>
    </div>
  );
};

export default HorizontalList;
