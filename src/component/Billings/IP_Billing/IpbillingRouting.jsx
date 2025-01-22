// src/Routes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import Ipmoneyreceipt from "./Transactions/IPMoneyReceipt/IpmoneyReceipt";
import NavigationBilling from "./IpdBillNav";
import FinalBill from "./Transactions/FinalBill/FinalBill";
import IpBilling from "./IpBilling";
import { Provider } from "react-redux";
import { store } from "../../Nursing/NursingModule/ReduxNursing/store";
const IpbillingRouting = () => {
  return (
    <>
      <NavigationBilling />
      <Provider store={store}>
        <Routes>
          <Route path="/ipmoney-receipt" element={<Ipmoneyreceipt />} />
          <Route path="/finalbill" element={<FinalBill />} />
          <Route path="/IPBilling" element={<IpBilling />} />
        </Routes>
      </Provider>
    </>
  );
};

export default IpbillingRouting;
