import React from "react";
import { Route, Routes } from "react-router-dom";
import LedgerNavbar from "./LedgerNavbar/LedgerNavbar";
import BillingLedger from "./BillingLedger/BillingLedger";
import PharmacySupplier from "./PharmacySupplier/PharmacySupplier";
import Consultant from "./Consultant/Consultant";
import CreditOrganization from "./CreditOrganization/CreditOrganization";
import InventoryVendor from "./InventoryVendor/InventoryVendor";
import InventorySubstore from "./InventorySubstore/InventorySubstore";
import PaymentModes from "./PaymentModes/PaymentModes";

function LedgerMapping() {
  return (
    <>
      <LedgerNavbar />
      <div className="content">
        <Routes>
          <Route path="billing-ledgers" element={<BillingLedger />} />
          <Route path="pharmacy-supplier" element={<PharmacySupplier />} />
          <Route path="consultant" element={<Consultant />} />
          <Route path="credit-organizations" element={<CreditOrganization />} />
          <Route path="inventory-vendor" element={<InventoryVendor />} />
          <Route path="inventory-substore" element={<InventorySubstore />} />
          <Route path="payment-modes" element={<PaymentModes />} />
          {/* <Route path="/more" element={<More />} /> */}
          <Route exact path="/" element={<PharmacySupplier />} />
        </Routes>
      </div>
    </>
  );
}

export default LedgerMapping;
