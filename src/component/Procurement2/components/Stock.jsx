import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import InventorySummaryReport from "../components/InventorySummary";
import SubstoreDispatchAndConsumptionReport from "../components/SubstoreDispatchAndConsumption";
import DetailStockLeadger from "../components/DetailStockLeadger";
import ExpiryItem from "../components/ExpiryItem";
import ConsumableStockLedger from "../components/ConsumableStockLedger";
import CapitalStockLedger from "../components/CapitalStockLedger";
import IssuedItemListReport from "../components/IssuedItemList";
import ExpirableStock from "../components/ExpirableStock";
import OpeningStockValuation from "../components/OpeningStockEvaluation";
import SubstoreWiseSummary from "../components/SubStoreWiseSummary";
import "../components/Stock.css";

const ReportsBoxes = () => {
  return (
    <div className="STOCKB-reports-boxes">
      <div className="STOCKB-report-box">
        <Link to="inventory-summary" className="STOCKB-report-link">
          <i className="STOCKB-report-icon fas fa-folder"></i>
          <div className="STOCKB-report-content">
            <h3 className="STOCKB-report-title">Inventory Summary</h3>
            <p className="STOCKB-report-subtitle">Report</p>
          </div>
        </Link>
      </div>

      <div className="STOCKB-report-box">
        <Link to="substore-dispatch-consumption" className="STOCKB-report-link">
          <i className="STOCKB-report-icon fas fa-shopping-cart"></i>
          <div className="STOCKB-report-content">
            <h3 className="STOCKB-report-title">
              Substore Dispatch And Consumption
            </h3>
            <p className="STOCKB-report-subtitle">Report</p>
          </div>
        </Link>
      </div>

      <div className="STOCKB-report-box">
        <Link to="detail-stock-ledger" className="STOCKB-report-link">
          <i className="STOCKB-report-icon fas fa-circle"></i>
          <div className="STOCKB-report-content">
            <h3 className="STOCKB-report-title">Detail Stock Ledger</h3>
            <p className="STOCKB-report-subtitle">Report</p>
          </div>
        </Link>
      </div>

      <div className="STOCKB-report-box">
        <Link to="expiry-item" className="STOCKB-report-link">
          <i className="STOCKB-report-icon fas fa-circle"></i>
          <div className="STOCKB-report-content">
            <h3 className="STOCKB-report-title">Expiry Item</h3>
            <p className="STOCKB-report-subtitle">Report</p>
          </div>
        </Link>
      </div>

      <div className="STOCKB-report-box">
        <Link to="consumable-stock-ledger" className="STOCKB-report-link">
          <i className="STOCKB-report-icon fas fa-circle"></i>
          <div className="STOCKB-report-content">
            <h3 className="STOCKB-report-title">Consumable Stock Ledger</h3>
            <p className="STOCKB-report-subtitle">Report</p>
          </div>
        </Link>
      </div>

      <div className="STOCKB-report-box">
        <Link to="capital-stock-ledger" className="STOCKB-report-link">
          <i className="STOCKB-report-icon fas fa-circle"></i>
          <div className="STOCKB-report-content">
            <h3 className="STOCKB-report-title">Capital Stock Ledger</h3>
            <p className="STOCKB-report-subtitle">Report</p>
          </div>
        </Link>
      </div>

      <div className="STOCKB-report-box">
        <Link to="issued-item-list" className="STOCKB-report-link">
          <i className="STOCKB-report-icon fas fa-circle"></i>
          <div className="STOCKB-report-content">
            <h3 className="STOCKB-report-title">Issued Item List</h3>
            <p className="STOCKB-report-subtitle">Report</p>
          </div>
        </Link>
      </div>

      <div className="STOCKB-report-box">
        <Link to="expirable-stock" className="STOCKB-report-link">
          <i className="STOCKB-report-icon fas fa-circle"></i>
          <div className="STOCKB-report-content">
            <h3 className="STOCKB-report-title">Expirable Stock</h3>
            <p className="STOCKB-report-subtitle">Report</p>
          </div>
        </Link>
      </div>

      <div className="STOCKB-report-box">
        <Link to="opening-stock-valuation" className="STOCKB-report-link">
          <i className="STOCKB-report-icon fas fa-circle"></i>
          <div className="STOCKB-report-content">
            <h3 className="STOCKB-report-title">Opening Stock Valuation</h3>
            <p className="STOCKB-report-subtitle">Report</p>
          </div>
        </Link>
      </div>

      <div className="STOCKB-report-box">
        <Link to="substore-wise-summary" className="STOCKB-report-link">
          <i className="STOCKB-report-icon fas fa-chart-line"></i>
          <div className="STOCKB-report-content">
            <h3 className="STOCKB-report-title">Substore Wise Summary</h3>
            <p className="STOCKB-report-subtitle">Report</p>
          </div>
        </Link>
      </div>

      <Routes>
        <Route path="/inventory-summary" element={<InventorySummaryReport />} />
        <Route
          path="/substore-dispatch-consumption"
          element={<SubstoreDispatchAndConsumptionReport />}
        />
        <Route path="/detail-stock-ledger" element={<DetailStockLeadger />} />
        <Route path="/expiry-item" element={<ExpiryItem />} />
        <Route
          path="/consumable-stock-ledger"
          element={<ConsumableStockLedger />}
        />
        <Route path="/capital-stock-ledger" element={<CapitalStockLedger />} />
        <Route path="/issued-item-list" element={<IssuedItemListReport />} />
        <Route path="/expirable-stock" element={<ExpirableStock />} />
        <Route
          path="/opening-stock-valuation"
          element={<OpeningStockValuation />}
        />
        <Route
          path="/substore-wise-summary"
          element={<SubstoreWiseSummary />}
        />
      </Routes>
    </div>
  );
};

export default ReportsBoxes;
