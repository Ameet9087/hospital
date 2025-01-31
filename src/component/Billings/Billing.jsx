import React from 'react'
import { Route, Routes } from 'react-router-dom'
import IPBilling from '../Billings/IP_Billing/ipbilling'
import OpdBilling from './OpdBilling/OpdBilling'
import Ipmoneyreceipt from './IP_Billing/Transactions/IPMoneyReceipt/IpmoneyReceipt'
import OPDBillCancellation from './OpdBilling/OPDBillCancellation'
import NavigationBilling from "./BillingNav"
import Finalbill from './IP_Billing/Transactions/FinalBill/FinalBill'
import OPDPostDiscount from './OpdBilling/OPDPostDiscount'
import OpdBillingPrint from "./OpdBilling/OpdBillingPrint"
import IPMoneyReceiptPrint from "./IP_Billing/Transactions/IPMoneyReceipt/IPMoneyReceiptPrint"
import IpBillingPrint from "./IP_Billing/IpBillingPrint"

const Billing = () => {
      return (
            <>
                  <NavigationBilling />
                  <Routes>
                        <Route path="/ipbilling/*" element={<IPBilling />} />
                        <Route path="/opdbilling" element={<OpdBilling />} />
                        <Route path='/opdpostdiscount' element={<OPDPostDiscount />} />

                        <Route path="/ipdmoneyrecipt" element={<Ipmoneyreceipt />} />

                        <Route path="/opdbillingcancel" element={<OPDBillCancellation />} />
                        <Route path="/finalbilling" element={< Finalbill />} />

                        <Route path='/OpdBillingPrint' element={<OpdBillingPrint />} />
                        <Route path='/IPMoneyReceiptPrint' element={<IPMoneyReceiptPrint />} />
                        <Route path='/IpBillingPrint' element={<IpBillingPrint />} />
                  </Routes>
            </>
      )
}

export default Billing