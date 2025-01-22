// src/Routes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBilling from "./BillingNav";
import IPBilling from "./IP_Billing/IpBilling";
import OpdBilling from "./OpdBilling/OpdBilling";
import Ipmoneyreceipt from "./IP_Billing/Transactions/IPMoneyReceipt/IpmoneyReceipt"
import OPDBillCancellation from "./OpdBilling/OPDBillCancellation";

const Billing = () => {
  return (
    <>
      <NavigationBilling />
      <Routes>
        <Route path="/IPBilling/*" element={<IPBilling/>} />
        <Route path="/opdbilling" element={<OpdBilling/>} />
        <Route path="/IpdMoneyReceipt" element={<Ipmoneyreceipt/>} />
        <Route path="/OPDBillingCancel" element={<OPDBillCancellation/>} />
      </Routes>
    </>
  );
};

export default Billing;
