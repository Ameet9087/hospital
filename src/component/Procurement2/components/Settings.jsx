import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./Settings.css";
import CurrencyTable from "../components/Currency";
import CompanyTable from "../components/Company";
import PackagingType from "../components/PackagingType";
import UnitOfMeasurementComponent from "../components/UnitOfMeasurement";
import AccountHead from "../components/AccountHead";
import ItemList from '../components/Items';
import Vendors from "../components/Vendors";
import Terms from "../components/Terms";
import SubCategoryList from "../components/SubCategory";
import InvoiceHeaders from "../components/InvoiceHeaders";

const Settings = () => {
  return (
    <div className="Settings-container">
    <nav className="Settings-nav">
      <NavLink
        to="currency"
        className={({ isActive }) =>
          isActive ? "Settings-tab-item active" : "Settings-tab-item"
        }
      >
        Currency
      </NavLink>
      <NavLink
        to="company"
        className={({ isActive }) =>
          isActive ? "Settings-tab-item active" : "Settings-tab-item"
        }
      >
        Company
      </NavLink>
      <NavLink
        to="packaging-type"
        className={({ isActive }) =>
          isActive ? "Settings-tab-item active" : "Settings-tab-item"
        }
      >
        Packaging Type
      </NavLink>
      <NavLink
        to="unit-of-measurement"
        className={({ isActive }) =>
          isActive ? "Settings-tab-item active" : "Settings-tab-item"
        }
      >
        Unit of Measurement
      </NavLink>
      <NavLink
        to="account-head"
        className={({ isActive }) =>
          isActive ? "Settings-tab-item active" : "Settings-tab-item"
        }
      >
        Account Head
      </NavLink>
      <NavLink
        to="vendors"
        className={({ isActive }) =>
          isActive ? "Settings-tab-item active" : "Settings-tab-item"
        }
      >
        Vendors
      </NavLink>
      <NavLink
        to="terms"
        className={({ isActive }) =>
          isActive ? "Settings-tab-item active" : "Settings-tab-item"
        }
      >
        Terms
      </NavLink>
      <NavLink
        to="sub-category"
        className={({ isActive }) =>
          isActive ? "Settings-tab-item active" : "Settings-tab-item"
        }
      >
        Sub Category
      </NavLink>
      <NavLink
        to="invoice-headers"
        className={({ isActive }) =>
          isActive ? "Settings-tab-item active" : "Settings-tab-item"
        }
      >
        Invoice Headers
      </NavLink>
      <NavLink
        to="items"
        className={({ isActive }) =>
          isActive ? "Settings-tab-item active" : "Settings-tab-item"
        }
      >
        Item
      </NavLink>
    </nav>

      <div className="Settings-content">
        <Routes>
          <Route path="/currency" element={<CurrencyTable />} />
          <Route path="/company" element={<CompanyTable />} />
          <Route path="/packaging-type" element={<PackagingType />} />
          <Route
            path="/unit-of-measurement"
            element={<UnitOfMeasurementComponent />}
          />
          <Route path="/account-head" element={<AccountHead />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sub-category" element={<SubCategoryList />} />
          <Route path="/invoice-headers" element={<InvoiceHeaders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Settings;
