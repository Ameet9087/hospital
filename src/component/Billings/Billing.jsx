import React from "react";
import { Route, Routes } from "react-router-dom";
import IPBilling from "./IP_Billing/ipbilling";
import OpdBilling from "./OpdBilling/OpdBilling";
import Ipmoneyreceipt from "./IP_Billing/Transactions/IPMoneyReceipt/IpmoneyReceipt";
import OPDBillCancellation from "./OpdBilling/OPDBillCancellation";
import NavigationBilling from "./BillingNav";
import Finalbill from "./IP_Billing/Transactions/FinalBill/FinalBill";
import OPDPostDiscount from "./OpdBilling/OPDPostDiscount";
import OpdBillingPrint from "./OpdBilling/OpdBillingPrint";
import IPMoneyReceiptPrint from "./IP_Billing/Transactions/IPMoneyReceipt/IPMoneyReceiptPrint";
import IpBillingPrint from "./IP_Billing/IpBillingPrint";
import FinalBillPrint from "./IP_Billing/Transactions/FinalBill/FinalBillPrint"
// import OPDPostDiscountTable from "./OpdBilling/OPDPostDiscountTable";

const Billing = () => {
  return (
    <>
      <NavigationBilling />
      <Routes>
        <Route path="/ipbilling/*" element={<IPBilling />} />
        <Route path="/opdbilling" element={<OpdBilling />} />
        <Route path="/opdpostdiscount" element={<OPDPostDiscount />} />

        <Route path="/ipdmoneyrecipt" element={<Ipmoneyreceipt />} />

        <Route path="/opdbillingcancel" element={<OPDBillCancellation />} />
        <Route path="/finalbilling" element={<Finalbill />} />

        <Route path="/opdbillingprint" element={<OpdBillingPrint />} />
        <Route path="/ipmoneyreceiptprint" element={<IPMoneyReceiptPrint />} />
        <Route path="/IpBillingPrint" element={<IpBillingPrint />} />
        <Route path="/finalbillingprint" element={<FinalBillPrint />} />
      </Routes>
    </>
  );
};

export default Billing;
