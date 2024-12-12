import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import PurchaseRequest from "../Procurement2/components/PurchaseRequest";
import PurchaseOrder from "../Procurement2/components/PurchaseOrder";
import GoodArrivalNotification from "../Procurement2/components/GoodArrivalNotification";
import Quotation from "../Procurement2/components/Quotation";
import Reports from "../Procurement2/components/Reports";
import Settings from "../Procurement2/components/Settings";
import VendorManagement from "./Vendor Management/vendorManagement";
import PurchaseOrderCreation from "./PurchaseOrderCreation/purchaseOrderCreation";
import TenderManagement from "./TenderManagement/tenderManagement";
import ContractManagement from "./ContractManagement/contractManagement";
import GoodsReceiptTracking from "./GoodsReceiptTracking/goodsReceiptTracking";
// import Reports from '../Procurement2/components/Reports';
import "./ProcurementMain.css";

const Procurementmain = () => {
  return (
    <div>
      <nav className="RoutesProcurement-nav">
      <ul className="RoutesProcurement-ul">
        <li className="RoutesProcurement-li">
          <NavLink
            to="/procurement/purchaserequest"
            className={({ isActive }) =>
              isActive ? "RoutesProcurement-link active" : "RoutesProcurement-link"
            }
          >
            Purchase Request
          </NavLink>
        </li>
        <li className="RoutesProcurement-li">
          <NavLink
            to="/procurement/purchaseorder"
            className={({ isActive }) =>
              isActive ? "RoutesProcurement-link active" : "RoutesProcurement-link"
            }
          >
            Purchase Order
          </NavLink>
        </li>
        <li className="RoutesProcurement-li">
          <NavLink
            to="/procurement/goodsarrivalnotification"
            className={({ isActive }) =>
              isActive ? "RoutesProcurement-link active" : "RoutesProcurement-link"
            }
          >
            Good Arrival Notification
          </NavLink>
        </li>
        <li className="RoutesProcurement-li">
          <NavLink
            to="/procurement/quotation"
            className={({ isActive }) =>
              isActive ? "RoutesProcurement-link active" : "RoutesProcurement-link"
            }
          >
            Quotation
          </NavLink>
        </li>
        <li className="RoutesProcurement-li">
          <NavLink
            to="/procurement/settings"
            className={({ isActive }) =>
              isActive ? "RoutesProcurement-link active" : "RoutesProcurement-link"
            }
          >
            Settings
          </NavLink>
        </li>
        <li className="RoutesProcurement-li">
          <NavLink
            to="/procurement/reports"
            className={({ isActive }) =>
              isActive ? "RoutesProcurement-link active" : "RoutesProcurement-link"
            }
          >
            Reports
          </NavLink>
        </li>
      </ul>
    </nav>
      <div>
        <Routes>
          <Route path="/purchaserequest" element={<PurchaseRequest />} />
          <Route path="/purchaseorder" element={<PurchaseOrder />} />
          <Route
            path="/goodsarrivalnotification"
            element={<GoodArrivalNotification />}
          />
          <Route path="/quotation" element={<Quotation />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/vendorManagement/" element={<VendorManagement />} />
          <Route
            path="/purchaseOrderCreation/"
            element={<PurchaseOrderCreation />}
          />
          <Route path="/tenderManagement/" element={<TenderManagement />} />
          <Route path="/contractManagement/" element={<ContractManagement />} />
          <Route
            path="/goodsReceiptTracking/"
            element={<GoodsReceiptTracking />}
          />
          <Route path="/reports/*" element={<Reports />} />
          {/* Ensure to use wildcard for nested routes */}
        </Routes>
      </div>
    </div>
  );
};

export default Procurementmain;
