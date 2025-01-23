// src/Routes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import Ipmoneyreceipt from "./Transactions/IPMoneyReceipt/IpmoneyReceipt";
import NavigationBilling from "./IpdBillNav";
import FinalBill from "./Transactions/FinalBill/FinalBill";
import IpBilling from "./IpBil";
const IpbillingRouting = () => {
  return (
    <>
      <NavigationBilling />
        <Routes>
          <Route path="/ipmoney-receipt" element={<Ipmoneyreceipt />} />
          <Route path="/finalbill" element={<FinalBill />} />
          <Route path="/IPBilling" element={<IpBilling />} />
        </Routes>
    </>
  );
};

export default IpbillingRouting;
